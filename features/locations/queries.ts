import "server-only";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getAdminLocations() {
  await requirePermission("VIEW_DELIVERY");
  return prisma.location.findMany({
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: {
      parent: { select: { name: true } },
      _count: { select: { children: true, addresses: true, orders: true } },
    },
  });
}

export async function getAdminLocationPage({
  page = 1,
  pageSize = 12,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  await requirePermission("VIEW_DELIVERY");
  const searchTerm = search.trim();
  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { slug: { contains: searchTerm, mode: "insensitive" as const } },
        ],
      }
    : undefined;
  const total = await prisma.location.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), pageCount);
  const locations = await prisma.location.findMany({
    where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: [{ type: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { children: true, addresses: true, orders: true } } },
  });

  return { locations, page: currentPage, pageCount, total, pageSize, search: searchTerm };
}

export async function getAdminLocation(locationId: string) {
  await requirePermission("MANAGE_DELIVERY");
  return prisma.location.findUnique({
    where: { id: locationId },
    include: { _count: { select: { children: true, addresses: true, orders: true } } },
  });
}

export function getAvailableDeliveryAreas() {
  return prisma.location.findMany({
    where: {
      type: "NEIGHBORHOOD",
      isActive: true,
      deliveryAvailable: true,
      parent: { is: { slug: "casablanca", isActive: true } },
    },
    select: {
      id: true,
      name: true,
      deliveryFeeMinor: true,
      minimumOrderMinor: true,
      estimatedMinutes: true,
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}