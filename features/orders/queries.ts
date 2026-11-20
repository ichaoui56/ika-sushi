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
      subtotalMinor: true,
      discountMinor: true,
      deliveryFeeMinor: true,
      totalMinor: true,
      currency: true,
      createdAt: true,
      locationNameSnapshot: true,
      items: { select: { productName: true, quantity: true, unitPriceMinor: true, lineTotalMinor: true } },
      assignment: { select: { deliveryPerson: { select: { id: true, name: true } } } },
    },
  });
}

export async function getOrderReportSummary() {
  await requirePermission("VIEW_REPORTS");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reportStart = new Date(today);
  reportStart.setDate(reportStart.getDate() - 13);
  const reportEnd = new Date(today);
  reportEnd.setDate(reportEnd.getDate() + 1);

  const [totalOrders, todayOrders, pendingOrders, deliveringOrders, deliveredOrders, deliveredRevenue, customers, products, categories, locations, statusGroups, createdByDay, sentByDay, deliveredByDay] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: OrderStatus.PENDING } }),
    prisma.order.count({ where: { status: { in: [OrderStatus.ASSIGNED, OrderStatus.OUT_FOR_DELIVERY] } } }),
    prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
    prisma.order.aggregate({ where: { status: OrderStatus.DELIVERED }, _sum: { totalMinor: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.product.count({ where: { isAvailable: true } }),
    prisma.category.count({ where: { isActive: true } }),
    prisma.location.count({ where: { isActive: true } }),
    prisma.order.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.$queryRaw<Array<{ day: Date; orders: number; totalMinor: number | bigint }>>`
      SELECT date_trunc('day', "createdAt") AS day,
        COUNT(*)::int AS orders,
        COALESCE(SUM("totalMinor"), 0)::bigint AS "totalMinor"
      FROM "Order"
      WHERE "createdAt" >= ${reportStart} AND "createdAt" < ${reportEnd}
      GROUP BY date_trunc('day', "createdAt")
      ORDER BY day ASC
    `,
    prisma.$queryRaw<Array<{ day: Date; orders: number; totalMinor: number | bigint }>>`
      SELECT sent.day, COUNT(*)::int AS orders,
        COALESCE(SUM(sent."totalMinor"), 0)::bigint AS "totalMinor"
      FROM (
        SELECT DISTINCT ON (history."orderId")
          date_trunc('day', history."createdAt") AS day,
          history."orderId",
          orders."totalMinor"
        FROM "OrderStatusHistory" AS history
        INNER JOIN "Order" AS orders ON orders.id = history."orderId"
        WHERE history."next" = 'OUT_FOR_DELIVERY' AND history."createdAt" >= ${reportStart} AND history."createdAt" < ${reportEnd}
        ORDER BY history."orderId", history."createdAt" ASC
      ) AS sent
      GROUP BY sent.day
      ORDER BY sent.day ASC
    `,
    prisma.$queryRaw<Array<{ day: Date; orders: number; totalMinor: number | bigint }>>`
      SELECT delivered.day, COUNT(*)::int AS orders,
        COALESCE(SUM(delivered."totalMinor"), 0)::bigint AS "totalMinor"
      FROM (
        SELECT DISTINCT ON (history."orderId")
          date_trunc('day', history."createdAt") AS day,
          history."orderId",
          orders."totalMinor"
        FROM "OrderStatusHistory" AS history
        INNER JOIN "Order" AS orders ON orders.id = history."orderId"
        WHERE history."next" = 'DELIVERED' AND history."createdAt" >= ${reportStart} AND history."createdAt" < ${reportEnd}
        ORDER BY history."orderId", history."createdAt" ASC
      ) AS delivered
      GROUP BY delivered.day
      ORDER BY delivered.day ASC
    `,
  ]);

  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(reportStart);
    date.setDate(date.getDate() + index);
    return { date, orderCount: 0, orderValueMinor: 0, sentOrders: 0, sentValueMinor: 0, deliveredOrders: 0, deliveredValueMinor: 0 };
  });
  const dayIndexes = new Map(days.map((day, index) => [day.date.toLocaleDateString("sv-SE"), index]));
  for (const row of createdByDay) {
    const index = dayIndexes.get(row.day.toLocaleDateString("sv-SE"));
    if (index !== undefined) {
      days[index].orderCount = row.orders;
      days[index].orderValueMinor = Number(row.totalMinor);
    }
  }
  for (const row of sentByDay) {
    const index = dayIndexes.get(row.day.toLocaleDateString("sv-SE"));
    if (index !== undefined) {
      days[index].sentOrders = row.orders;
      days[index].sentValueMinor = Number(row.totalMinor);
    }
  }
  for (const row of deliveredByDay) {
    const index = dayIndexes.get(row.day.toLocaleDateString("sv-SE"));
    if (index !== undefined) {
      days[index].deliveredOrders = row.orders;
      days[index].deliveredValueMinor = Number(row.totalMinor);
    }
  }
  const todayKey = today.toLocaleDateString("sv-SE");
  const todayReport = days.find((day) => day.date.toLocaleDateString("sv-SE") === todayKey);
  return {
    totalOrders,
    todayOrders,
    pendingOrders,
    deliveringOrders,
    deliveredOrders,
    deliveredRevenueMinor: deliveredRevenue._sum.totalMinor ?? 0,
    customers,
    products,
    categories,
    locations,
    statusCounts: statusGroups.map((group) => ({ status: group.status, count: group._count._all })),
    todaySentOrders: todayReport?.sentOrders ?? 0,
    todayDeliveredRevenueMinor: todayReport?.deliveredValueMinor ?? 0,
    days,
  };
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