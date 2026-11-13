import "server-only";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth/session";
import { requirePermission } from "../../lib/auth/permissions";

export async function getMyOrders() {
  const user = await getCurrentUser();
  if (!user || user.role !== "CUSTOMER") return null;

  return prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      reference: true,
      status: true,
      createdAt: true,
      totalMinor: true,
      currency: true,
      locationNameSnapshot: true,
      items: { select: { productName: true, productImageUrl: true, quantity: true, lineTotalMinor: true } },
    },
  });
}

export async function getAdminOrders(filters: { status?: OrderStatus; query?: string; from?: string; to?: string } = {}) {
  await requirePermission("VIEW_ORDERS");
  const query = filters.query?.trim();
  const createdAt: { gte?: Date; lt?: Date } = {};
  if (filters.from && /^\d{4}-\d{2}-\d{2}$/.test(filters.from)) {
    const from = new Date(`${filters.from}T00:00:00.000Z`);
    if (!Number.isNaN(from.getTime())) createdAt.gte = from;
  }
  if (filters.to && /^\d{4}-\d{2}-\d{2}$/.test(filters.to)) {
    const to = new Date(`${filters.to}T00:00:00.000Z`);
    if (!Number.isNaN(to.getTime())) {
      to.setUTCDate(to.getUTCDate() + 1);
      createdAt.lt = to;
    }
  }
  return prisma.order.findMany({
    where: {
      ...(filters.status ? { status: filters.status } : {}),
      ...(Object.keys(createdAt).length ? { createdAt } : {}),
      ...(query ? {
        OR: [
          { reference: { contains: query, mode: "insensitive" } },
          { customerName: { contains: query, mode: "insensitive" } },
          { customerPhone: { contains: query } },
        ],
      } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      reference: true,
      customerName: true,
      customerPhone: true,
      status: true,
      totalMinor: true,
      currency: true,
      createdAt: true,
      locationNameSnapshot: true,
      assignment: { select: { deliveryPerson: { select: { id: true, name: true } } } },
    },
  });
}

export async function getAdminOrderDetail(orderId: string) {
  await requirePermission("VIEW_ORDERS");
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: "asc" }, include: { changedBy: { select: { name: true, role: true } } } },
      assignment: { include: { deliveryPerson: { select: { id: true, name: true, phone: true } } } },
    },
  });
}

export async function getAssignableDeliveryPeople() {
  await requirePermission("MANAGE_DELIVERY");
  return prisma.user.findMany({
    where: { role: "DELIVERY", status: "ACTIVE" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, phone: true },
  });
}

export async function getMyDeliveryOrders() {
  const user = await getCurrentUser();
  if (!user || user.role !== "DELIVERY") return null;

  return prisma.deliveryAssignment.findMany({
    where: { deliveryPersonId: user.id },
    orderBy: { assignedAt: "desc" },
    take: 100,
    include: {
      order: {
        include: {
          items: true,
          location: { select: { name: true } },
          statusHistory: {
            where: { next: "DELIVERY_FAILED" },
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { note: true },
          },
        },
      },
    },
  });
}

export async function getDeliveryOverview() {
  await requirePermission("VIEW_DELIVERY");
  const [deliveryPeople, unassignedOrders] = await Promise.all([
    prisma.user.findMany({
      where: { role: "DELIVERY" },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        phone: true,
        status: true,
        _count: { select: { deliveryAssignments: true } },
      },
    }),
    prisma.order.findMany({
      where: {
        status: { in: [OrderStatus.READY_FOR_DELIVERY, OrderStatus.DELIVERY_FAILED] },
        assignment: null,
      },
      orderBy: { createdAt: "asc" },
      take: 100,
      select: { id: true, reference: true, customerName: true, locationNameSnapshot: true, status: true, createdAt: true },
    }),
  ]);
  return { deliveryPeople, unassignedOrders };
}