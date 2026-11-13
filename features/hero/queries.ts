import "server-only";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getAdminHeroSlides() {
  await requirePermission("MANAGE_HERO");
  return prisma.heroSlide.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { product: { select: { id: true, name: true } } },
  });
}

export async function getHeroProductOptions() {
  await requirePermission("MANAGE_HERO");
  return prisma.product.findMany({
    where: { isAvailable: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: { id: true, name: true, priceMinor: true, currency: true },
  });
}

export function getVisibleHeroSlides(now = new Date()) {
  return prisma.heroSlide.findMany({
    where: {
      isActive: true,
      AND: [
        { OR: [{ visibleFrom: null }, { visibleFrom: { lte: now } }] },
        { OR: [{ visibleUntil: null }, { visibleUntil: { gt: now } }] },
      ],
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      product: { select: { id: true, name: true, translations: true, priceMinor: true, currency: true } },
    },
  });
}