import "server-only";
import { OrderStatus, UserRole } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getDashboardSummary() {
  await requirePermission("VIEW_REPORTS");
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const chartStart = new Date(startOfDay);
  chartStart.setDate(chartStart.getDate() - 13);

  const [totalOrders, todayOrders, pendingOrders, completedOrders, cancelledOrders, revenue, todayRevenue, customers, products, promotionalProducts, bestSellers, activeDeliveryZones, revenueByDay, recentOrders, recentCustomers, recentProducts] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.count({ where: { status: OrderStatus.PENDING } }),
    prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
    prisma.order.count({ where: { status: OrderStatus.CANCELLED } }),
    prisma.order.aggregate({ where: { status: OrderStatus.DELIVERED }, _sum: { totalMinor: true } }),
    prisma.order.aggregate({ where: { status: OrderStatus.DELIVERED, createdAt: { gte: startOfDay } }, _sum: { totalMinor: true } }),
    prisma.user.count({ where: { role: UserRole.CUSTOMER } }),
    prisma.product.count({ where: { isAvailable: true } }),
    prisma.product.count({ where: { isOnPromotion: true, isAvailable: true } }),
    prisma.product.count({ where: { isFeaturedBestSeller: true, isAvailable: true } }),
    prisma.location.findMany({
      where: {
        isActive: true,
      },
      select: { id: true, name: true, deliveryFeeMinor: true, estimatedMinutes: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
    prisma.$queryRaw<Array<{ day: Date; totalMinor: number | bigint }>>`
      SELECT date_trunc('day', "createdAt") AS day,
        COALESCE(SUM("totalMinor"), 0)::bigint AS "totalMinor"
      FROM "Order"
      WHERE "status" = 'DELIVERED' AND "createdAt" >= ${chartStart}
      GROUP BY date_trunc('day', "createdAt")
      ORDER BY day ASC
    `,
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, reference: true, customerName: true, status: true, totalMinor: true, createdAt: true },
    }),
    prisma.user.findMany({
      where: { role: UserRole.CUSTOMER },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, name: true, createdAt: true },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, name: true, isOnPromotion: true, createdAt: true },
    }),
  ]);

  const dailyRevenue = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(chartStart);
    date.setDate(chartStart.getDate() + index);
    return { date, totalMinor: 0 };
  });
  for (const row of revenueByDay) {
    const rowDate = new Date(row.day);
    const index = Math.round((new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate()).getTime() - chartStart.getTime()) / 86_400_000);
    if (index >= 0 && index < dailyRevenue.length) dailyRevenue[index].totalMinor = Number(row.totalMinor);
  }

  const activity = [
    ...recentOrders.map((order) => ({
      id: `order-${order.id}`,
      kind: "order" as const,
      title: `Nouvelle commande ${order.reference}`,
      detail: `${order.customerName} · ${order.totalMinor.toLocaleString("fr-MA")} MAD`,
      status: order.status,
      createdAt: order.createdAt,
    })),
    ...recentCustomers.map((customer) => ({
      id: `customer-${customer.id}`,
      kind: "customer" as const,
      title: "Nouveau client inscrit",
      detail: customer.name,
      status: null,
      createdAt: customer.createdAt,
    })),
    ...recentProducts.map((product) => ({
      id: `product-${product.id}`,
      kind: "product" as const,
      title: product.isOnPromotion ? "Produit en promotion" : "Produit ajouté",
      detail: product.name,
      status: null,
      createdAt: product.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

  return {
    totalOrders,
    todayOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    revenueMinor: revenue._sum.totalMinor ?? 0,
    todayRevenueMinor: todayRevenue._sum.totalMinor ?? 0,
    customers,
    products,
    promotionalProducts,
    bestSellers,
    activeLocations: activeDeliveryZones.length,
    activeDeliveryZones,
    dailyRevenue: dailyRevenue.slice(7),
    weeklyRevenueMinor: dailyRevenue.slice(7).reduce((sum, day) => sum + day.totalMinor, 0),
    previousWeekRevenueMinor: dailyRevenue.slice(0, 7).reduce((sum, day) => sum + day.totalMinor, 0),
    activity,
  };
}