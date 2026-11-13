"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { OrderStatus, UserRole } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { sendDeliveryPush } from "../../lib/delivery-push";
import { signIn } from "../../auth";
import { getCurrentUser } from "../../lib/auth/session";
import { requirePermission } from "../../lib/auth/permissions";
import { consumeLoginAttempt, clearLoginAttempts } from "../../lib/auth/rate-limit";
import { hashPassword } from "../../lib/auth/password";
import { normalizePhoneNumber } from "../auth/schemas";
import { checkoutOrderSchema } from "./schemas";

export interface CheckoutResult {
  success: boolean;
  message: string;
  hasAccount?: boolean;
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
  if (!parsed.success) {
    const fieldIssue = parsed.error.issues.find(({ path }) => ["confirmPassword", "password", "phone"].includes(String(path[0])));
    return {
      success: false,
      message: fieldIssue?.message ?? "Check your delivery details and try again.",
    };
  }

  const data = parsed.data;
  const normalizedPhone = normalizePhoneNumber(data.phone);
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
    return { success: false, message: "Enter a valid phone number." };
  }
  const currentUser = await getCurrentUser();
  if (currentUser && currentUser.role !== UserRole.CUSTOMER) {
    return { success: false, message: "Sign out of the admin account before placing a customer order." };
  }
  if (currentUser && normalizePhoneNumber(currentUser.phone) !== normalizedPhone) {
    return { success: false, message: "Use the phone number linked to your customer account." };
  }
  try {
    const guestPasswordHash = !currentUser && data.password ? await hashPassword(data.password) : null;
    const result = await prisma.$transaction(async (transaction) => {
      const location = await transaction.location.findFirst({
        where: {
          id: data.locationId,
          isActive: true,
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

      let customer = currentUser
        ? await transaction.user.findUnique({ where: { id: currentUser.id } })
        : null;
      if (currentUser && !customer) {
        throw new CheckoutError("Your customer account could not be found. Sign in again and retry.");
      }
      if (customer && customer.status !== "ACTIVE") {
        throw new CheckoutError("This customer account is not available for orders.");
      }
      if (customer && customer.role !== UserRole.CUSTOMER) {
        throw new CheckoutError("An account already uses this phone. Sign in before placing your order.");
      }
      if (!customer && data.password) {
        const existingAccount = await transaction.user.findUnique({
          where: { normalizedPhone },
          select: { id: true },
        });
        if (existingAccount) {
          throw new CheckoutError("An account already uses this phone. Sign in or continue as a guest.");
        }
        customer = await transaction.user.create({
          data: {
            name: data.name,
            phone: data.phone,
            normalizedPhone,
            role: UserRole.CUSTOMER,
            passwordHash: guestPasswordHash,
          },
        });
      } else if (customer) {
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
      let addressId: string | null = null;
      if (customer) {
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
        addressId = address.id;
      }

      let reference: string | undefined;
      for (let attempt = 0; attempt < 50; attempt += 1) {
        const candidate = `IKA-${randomBytes(6).toString("hex").toUpperCase()}`;
        const existingOrder = await transaction.order.findUnique({ where: { reference: candidate }, select: { id: true } });
        if (!existingOrder) {
          reference = candidate;
          break;
        }
      }
      if (!reference) throw new CheckoutError("Unable to create a unique order reference. Please try again.");
      const totalMinor = subtotalMinor - discountMinor + deliveryFeeMinor;
      const order = await transaction.order.create({
        data: {
          reference,
          userId: customer?.id ?? null,
          addressId,
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
    if (!currentUser && data.password) {
      try {
        await signIn("credentials", {
          email: normalizedPhone,
          password: data.password,
          redirect: false,
        });
      } catch (signInError) {
        console.error("Automatic customer sign-in failed.", signInError);
      }
    }
    return {
      success: true,
      message: "Order received.",
      hasAccount: Boolean(currentUser || data.password),
      order: result,
    };
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
    if (nextStatus === OrderStatus.DELIVERY_FAILED && !parsed.data.note?.trim()) {
      return { success: false, message: "Add a short delivery note before reporting a failed delivery." };
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

export async function getAdminOrderDetailAction(orderId: string) {
  await requirePermission("VIEW_ORDERS");
  if (!orderId.trim()) return null;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      statusHistory: {
        orderBy: { createdAt: "desc" },
        include: { changedBy: { select: { name: true, role: true } } },
      },
      assignment: { include: { deliveryPerson: { select: { id: true, name: true, phone: true } } } },
    },
  });
  if (!order) return null;
  return {
    id: order.id,
    reference: order.reference,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    status: order.status,
    totalMinor: order.totalMinor,
    subtotalMinor: order.subtotalMinor,
    discountMinor: order.discountMinor,
    deliveryFeeMinor: order.deliveryFeeMinor,
    currency: order.currency,
    createdAt: order.createdAt.toISOString(),
    locationName: order.locationNameSnapshot,
    address: order.addressSnapshot,
    deliveryNotes: order.deliveryNotes,
    cancellationReason: order.cancellationReason,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    items: order.items.map((item) => ({
      name: item.productName,
      quantity: item.quantity,
      unitPriceMinor: item.unitPriceMinor,
      lineTotalMinor: item.lineTotalMinor,
    })),
    history: order.statusHistory.map((entry) => ({
      status: entry.next,
      previous: entry.previous,
      note: entry.note,
      createdAt: entry.createdAt.toISOString(),
      changedBy: entry.changedBy?.name ?? null,
    })),
    deliveryPerson: order.assignment?.deliveryPerson ?? null,
  };
}

export async function lookupTrackedOrder(input: unknown) {
  const parsed = z.object({
    reference: z.string().trim().regex(/^IKA-[A-F0-9]{24}$/i).transform((value) => value.toUpperCase()),
  }).safeParse(input);
  if (!parsed.success) return { success: false as const, message: "Enter a valid order reference." };

  const rateKey = `track:${parsed.data.reference}`;
  if (!(await consumeLoginAttempt(rateKey))) {
    return { success: false as const, message: "Too many attempts. Please try again later." };
  }

  const order = await prisma.order.findFirst({
    where: {
      reference: parsed.data.reference,
    },
    select: {
      reference: true,
      status: true,
      createdAt: true,
      locationNameSnapshot: true,
      addressSnapshot: true,
      totalMinor: true,
      currency: true,
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
      locationName: order.locationNameSnapshot,
      address: order.addressSnapshot,
      totalMinor: order.totalMinor,
      currency: order.currency,
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

  const newlyAssignedOrders: Array<{ id: string; reference: string }> = [];
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
        newlyAssignedOrders.push({ id: order.id, reference: order.reference });

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

  await Promise.all(newlyAssignedOrders.map(async (order) => {
    try {
      await sendDeliveryPush(parsed.data.deliveryPersonId, {
        title: "New delivery assigned",
        body: `Order ${order.reference} is ready for delivery.`,
        url: "/delivery",
        tag: `delivery-assignment-${order.id}`,
      });
    } catch (error) {
      console.error("[orders] Could not notify the assigned delivery account.", error);
    }
  }));

  revalidatePath("/admin/delivery");
  revalidatePath("/delivery");
  revalidatePath("/admin/orders");
  return { success: true, message: "Delivery assignments updated." };
}