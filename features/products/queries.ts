import "server-only";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getActiveCatalog() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { product: { isAvailable: true } },
        orderBy: { product: { sortOrder: "asc" } },
        include: {
          product: {
            include: {
              images: { orderBy: { sortOrder: "asc" } },
              categories: { include: { category: true } },
            },
          },
        },
      },
    },
  });
}

export async function getAdminProducts({
  page = 1,
  pageSize = 12,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  await requirePermission("VIEW_PRODUCTS");
  const searchTerm = search.trim();
  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" as const } },
          { slug: { contains: searchTerm, mode: "insensitive" as const } },
          { description: { contains: searchTerm, mode: "insensitive" as const } },
        ],
      }
    : undefined;
  const total = await prisma.product.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), pageCount);
  const products = await prisma.product.findMany({
    where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      categories: { include: { category: true } },
      images: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });

  return { products, page: currentPage, pageCount, total, pageSize, search: searchTerm };
}

export async function getBestSellerProducts() {
  return prisma.product.findMany({
    where: { isAvailable: true, isFeaturedBestSeller: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  });
}

export async function getPromotionalProducts() {
  return prisma.product.findMany({
    where: { isAvailable: true, isOnPromotion: true },
    orderBy: { sortOrder: "asc" },
    include: { images: { where: { isPrimary: true }, take: 1 } },
  });
}