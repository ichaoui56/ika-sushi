import "server-only";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getAdminCategories() {
  await requirePermission("VIEW_CATEGORIES");
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });
}

export async function getProductCategoryOptions() {
  await requirePermission("VIEW_PRODUCTS");
  return prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true },
  });
}
export async function getAdminCategoryPage({
  page = 1,
  pageSize = 12,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  await requirePermission("VIEW_CATEGORIES");
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
  const total = await prisma.category.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), pageCount);
  const categories = await prisma.category.findMany({
    where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { products: true } } },
  });

  return { categories, page: currentPage, pageCount, total, pageSize, search: searchTerm };
}

export async function getAdminCategory(categoryId: string) {
  await requirePermission("VIEW_CATEGORIES");
  return prisma.category.findUnique({
    where: { id: categoryId },
    include: { _count: { select: { products: true } } },
  });
}