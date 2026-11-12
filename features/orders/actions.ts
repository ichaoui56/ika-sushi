"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { OrderStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth/session";
import { requirePermission } from "../../lib/auth/permissions";
import { consumeLoginAttempt, clearLoginAttempts } from "../../lib/auth/rate-limit";
import { normalizePhoneNumber } from "../auth/schemas";
import { checkoutOrderSchema } from "./schemas";

export interface CheckoutResult {
  success: boolean;
  message: string;
  order?: {
    reference: string;
    customerName: string;
    customerPhone: string;
    locationName: string;
    address: string;
    subtotalMinor: number;
    discountMinor: number;
    deliveryFeeMinor: number;
    totalMinor: number;
    items: Array<{
      id: string;
      name: string;
      image: string;
      quantity: number;
      unitPriceMinor: number;
      lineTotalMinor: number;
    }>;
  };
}

class CheckoutError extends Error {}

export async function createCheckoutOrder(input: unknown): Promise<CheckoutResult> {
  const parsed = checkoutOrderSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check your delivery details and try again." };

  const data = parsed.data;
  const normalizedPhone = normalizePhoneNumber(data.phone);
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
    return { success: false, message: "Enter a valid phone number." };
  }

  try {
    const result = await prisma.$transaction(async (transaction) => {
      const location = await transaction.location.findFirst({
        where: {
          id: data.locationId,
          type: "NEIGHBORHOOD",
          isActive: true,
          deliveryAvailable: true,
          parent: { is: { slug: "casablanca", isActive: true } },
        },
      });
      if (!location) throw new CheckoutError("Delivery is not available in that area.");

      const productIds = data.items.map(({ productId }) => productId);
      const products = await transaction.product.findMany({
        where: { id: { in: productIds }, isAvailable: true },
        include: { images: { where: { isPrimary: true }, take: 1 } },
      });
      if (products.length !== productIds.length) {
        throw new CheckoutError("One or more selected dishes are no longer available.");
      }

      const productById = new Map(products.map((product) => [product.id, product]));
      const itemSnapshots = data.items.map((item) => {
        const product = productById.get(item.productId);
        if (!product) throw new CheckoutError("One or more selected dishes are no longer available.");
        const originalUnitPriceMinor = product.isOnPromotion && product.originalPriceMinor && product.originalPriceMinor > product.priceMinor
          ? product.originalPriceMinor
          : product.priceMinor;
        const lineDiscountMinor = product.isOnPromotion
          ? (originalUnitPriceMinor - product.priceMinor) * item.quantity
          : 0;
        return {
          product,
          quantity: item.quantity,
          originalUnitPriceMinor,
          lineDiscountMinor,
          lineTotalMinor: product.priceMinor * item.quantity,
        };
      });

      const subtotalMinor = itemSnapshots.reduce(
        (total, item) => total + item.originalUnitPriceMinor * item.quantity,
        0,
      );
      const discountMinor = itemSnapshots.reduce((total, item) => total + item.lineDiscountMinor, 0);
      const deliveryFeeMinor = location.deliveryFeeMinor;
      if (subtotalMinor - discountMinor < location.minimumOrderMinor) {
        throw new CheckoutError("Your order does not meet the minimum for this delivery area.");
      }

      let customer = await transaction.user.findUnique({ where: { normalizedPhone } });
      if (customer && customer.status !== "ACTIVE") {
        throw new CheckoutError("This customer account is not available for orders.");
      }
      if (!customer) {
        customer = await transaction.user.create({
          data: {
            name: data.name,
            phone: data.phone,
            normalizedPhone,
            role: UserRole.CUSTOMER,
          },
        });
      } else {
        customer = await transaction.user.update({
          where: { id: customer.id },
          data: { name: data.name, phone: data.phone },
        });
      }

      const addressParts = [
        location.name,
        data.street,
        data.building && `Building ${data.building}`,
        data.apartment && `Apartment ${data.apartment}`,
        data.floor && `Floor ${data.floor}`,
      ].filter(Boolean);
      const addressSnapshot = addressParts.join(", ");
      const existingAddressCount = await transaction.address.count({ where: { userId: customer.id } });
      const address = await transaction.address.create({
        data: {
          userId: customer.id,
          locationId: location.id,
          street: data.street || null,
          building: data.building || null,
          apartment: data.apartment || null,
          floor: data.floor || null,
          instructions: data.instructions || null,
          isDefault: existingAddressCount === 0,
        },
      });

      const reference = `IKA-${randomBytes(12).toString("hex").toUpperCase()}`;
      const totalMinor = subtotalMinor - discountMinor + deliveryFeeMinor;
      const order = await transaction.order.create({
        data: {
          reference,
          userId: customer.id,
          addressId: address.id,
          locationId: location.id,
          customerName: data.name,
          customerPhone: data.phone,
          locationNameSnapshot: location.name,
          addressSnapshot,
          deliveryNotes: data.instructions || null,
          status: OrderStatus.PENDING,
          subtotalMinor,
          discountMinor,
          deliveryFeeMinor,
          totalMinor,
          items: {
            create: itemSnapshots.map(({ product, quantity, originalUnitPriceMinor, lineDiscountMinor, lineTotalMinor }) => ({
              productId: product.id,
              productName: product.name,
              productImageUrl: product.images[0]?.url ?? null,
              quantity,
              unitPriceMinor: product.priceMinor,
              originalUnitPriceMinor,
              discountMinor: lineDiscountMinor,
              lineTotalMinor,
            })),
          },
          statusHistory: {
            create: { next: OrderStatus.PENDING, note: "Order received." },
          },
        },
      });

      return {
        reference: order.reference,
        customerName: data.name,
        customerPhone: data.phone,
        locationName: location.name,
        address: addressSnapshot,
        subtotalMinor,
        discountMinor,
        deliveryFeeMinor,
        totalMinor,
        items: itemSnapshots.map(({ product, quantity, lineTotalMinor }) => ({
          id: product.id,
          name: product.name,
          image: product.images[0]?.url ?? "",
          quantity,
          unitPriceMinor: product.priceMinor,
          lineTotalMinor,
        })),
      };
    }, { isolationLevel: "Serializable" });

    revalidatePath("/admin/orders");
    revalidatePath("/orders");
    return { success: true, message: "Order received.", order: result };
  } catch (error) {
    if (error instanceof CheckoutError) return { success: false, message: error.message };
    console.error("Order creation failed.", error);
    return { success: false, message: "We could not place your order. Please try again." };
  }
}

const allowedTransitions: Partial<Record<OrderStatus, OrderStatus[]>> = {
  PENDING: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  CONFIRMED: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
  PREPARING: [OrderStatus.READY_FOR_DELIVERY, OrderStatus.CANCELLED],
  READY_FOR_DELIVERY: [OrderStatus.ASSIGNED, OrderStatus.CANCELLED],
  ASSIGNED: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERY_FAILED],
  OUT_FOR_DELIVERY: [OrderStatus.DELIVERED, OrderStatus.DELIVERY_FAILED],
  DELIVERY_FAILED: [OrderStatus.ASSIGNED, OrderStatus.CANCELLED],
};

export async function updateOrderStatus(orderId: string, nextStatus: OrderStatus, note?: string) {
  const parsed = z.object({
    orderId: z.string().min(1),
    nextStatus: z.nativeEnum(OrderStatus),
    note: z.string().trim().max(1000).optional(),
  }).safeParse({ orderId, nextStatus, note });
  if (!parsed.success) return { success: false, message: "Check the order status update." };
  const actor = await getCurrentUser();
  if (!actor) return { success: false, message: "Sign in to continue." };

  if (actor.role === UserRole.DELIVERY) {
    const deliveryStatuses: OrderStatus[] = [
      OrderStatus.OUT_FOR_DELIVERY,
      OrderStatus.DELIVERED,
      OrderStatus.DELIVERY_FAILED,
    ];
    if (!deliveryStatuses.includes(nextStatus)) {
      return { success: false, message: "That status is not available to delivery personnel." };
    }
    const assignment = await prisma.deliveryAssignment.findFirst({
      where: { orderId: parsed.data.orderId, deliveryPersonId: actor.id },
      select: { order: { select: { status: true } } },
    });
    if (!assignment) return { success: false, message: "Order not assigned to this delivery account." };
  } else {
    await requirePermission("MANAGE_ORDERS");
  }

  if (parsed.data.nextStatus === OrderStatus.CANCELLED && !parsed.data.note?.trim()) {
    return { success: false, message: "Provide a cancellation reason." };
  }

  try {
    await prisma.$transaction(async (transaction) => {
      const order = await transaction.order.findUnique({ where: { id: parsed.data.orderId }, select: { status: true } });
      if (!order || !allowedTransitions[order.status]?.includes(parsed.data.nextStatus)) {
        throw new Error("This order status transition is not allowed.");
      }
      const updated = await transaction.order.updateMany({
        where: { id: parsed.data.orderId, status: order.status },
        data: {
          status: parsed.data.nextStatus,
          cancellationReason: parsed.data.nextStatus === OrderStatus.CANCELLED ? parsed.data.note : undefined,
        },
      });
      if (updated.count !== 1) throw new Error("The order status changed; refresh and try again.");
      await transaction.orderStatusHistory.create({
        data: {
          orderId: parsed.data.orderId,
          previous: order.status,
          next: parsed.data.nextStatus,
          changedById: actor.id,
          note: parsed.data.note,
        },
      });
    }, { isolationLevel: "Serializable" });
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Unable to update order status." };
  }
  revalidatePath("/admin/orders");
  revalidatePath("/orders");
  return { success: true, message: "Order status updated." };
}

export async function lookupTrackedOrder(input: unknown) {
  const parsed = z.object({
    reference: z.string().trim().min(12).max(40).transform((value) => value.toUpperCase()),
    phoneLastFour: z.string().trim().regex(/^\d{4}$/),
  }).safeParse(input);
  if (!parsed.success) return { success: false as const, message: "Enter a valid order reference and phone suffix." };

  const rateKey = `track:${parsed.data.reference}`;
  if (!(await consumeLoginAttempt(rateKey))) {
    return { success: false as const, message: "Too many attempts. Please try again later." };
  }

  const order = await prisma.order.findFirst({
    where: {
      reference: parsed.data.reference,
      customerPhone: { endsWith: parsed.data.phoneLastFour },
    },
    select: {
      reference: true,
      status: true,
      createdAt: true,
      location: { select: { estimatedMinutes: true } },
      items: { select: { productName: true, quantity: true } },
      statusHistory: {
        orderBy: { createdAt: "asc" },
        select: { next: true, createdAt: true },
      },
    },
  });
  if (!order) return { success: false as const, message: "We couldn’t find an order with those details." };

  await clearLoginAttempts(rateKey);
  return {
    success: true as const,
    order: {
      reference: order.reference,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      estimatedMinutes: order.location.estimatedMinutes,
      items: order.items,
      history: order.statusHistory.map((entry) => ({
        status: entry.next,
        createdAt: entry.createdAt.toISOString(),
      })),
    },
  };
}

export async function assignDeliveryOrders(input: unknown) {
  await requirePermission("MANAGE_DELIVERY");
  const parsed = z.object({
    orderIds: z.array(z.string().min(1)).min(1).max(100),
    deliveryPersonId: z.string().min(1),
    note: z.string().trim().max(1000).optional(),
  }).safeParse(input);
  if (!parsed.success || new Set(parsed.data?.orderIds ?? []).size !== parsed.data?.orderIds.length) {
    return { success: false, message: "Choose valid orders and a delivery person." };
  }

  const actor = await getCurrentUser();
  if (!actor) return { success: false, message: "Sign in to continue." };

  try {
    await prisma.$transaction(async (transaction) => {
      const deliveryPerson = await transaction.user.findFirst({
        where: { id: parsed.data.deliveryPersonId, role: UserRole.DELIVERY, status: "ACTIVE" },
        select: { id: true },
      });
      if (!deliveryPerson) throw new Error("Choose an active delivery account.");

      const orders = await transaction.order.findMany({
        where: { id: { in: parsed.data.orderIds } },
        include: { assignment: true },
      });
      const assignableStatuses: OrderStatus[] = [
        OrderStatus.READY_FOR_DELIVERY,
        OrderStatus.ASSIGNED,
        OrderStatus.DELIVERY_FAILED,
      ];
      if (
        orders.length !== parsed.data.orderIds.length ||
        orders.some((order) => !assignableStatuses.includes(order.status))
      ) {
        throw new Error("Only ready or failed orders can be assigned.");
      }

      for (const order of orders) {
        const previousPersonId = order.assignment?.deliveryPersonId ?? null;
        if (previousPersonId === deliveryPerson.id) continue;

        await transaction.deliveryAssignment.upsert({
          where: { orderId: order.id },
          create: {
            orderId: order.id,
            deliveryPersonId: deliveryPerson.id,
            assignedById: actor.id,
          },
          update: {
            deliveryPersonId: deliveryPerson.id,
            assignedById: actor.id,
          },
        });
        await transaction.deliveryAssignmentHistory.create({
          data: {
            orderId: order.id,
            previousPersonId,
            nextPersonId: deliveryPerson.id,
            changedById: actor.id,
            note: parsed.data.note,
          },
        });
        if (order.status !== OrderStatus.ASSIGNED) {
          await transaction.order.update({ where: { id: order.id }, data: { status: OrderStatus.ASSIGNED } });
          await transaction.orderStatusHistory.create({
            data: {
              orderId: order.id,
              previous: order.status,
              next: OrderStatus.ASSIGNED,
              changedById: actor.id,
            },
          });
        }
      }
    }, { isolationLevel: "Serializable" });
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unable to assign the selected orders.",
    };
  }

  revalidatePath("/admin/delivery");
  revalidatePath("/delivery");
  revalidatePath("/admin/orders");
  return { success: true, message: "Delivery assignments updated." };
}