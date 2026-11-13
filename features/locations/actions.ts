"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { locationSchema, locationUpdateSchema } from "./schemas";
import { makeLocationTranslations } from "./translations";

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function createLocation(input: unknown) {
  await requirePermission("MANAGE_DELIVERY");
  const parsed = locationSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the delivery area details." };
  const data = parsed.data;
  const { nameEn, nameAr, ...locationData } = data;
  await prisma.location.create({
    data: {
      ...locationData,
      translations: makeLocationTranslations(data.name, nameEn, nameAr),
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
      deliveryAvailable: data.deliveryAvailable ?? data.isActive,
    },
  });
  revalidatePath("/admin/locations");
  revalidatePath("/checkout");
  return { success: true, message: "Delivery area created." };
}

export async function updateLocation(input: unknown) {
  await requirePermission("MANAGE_DELIVERY");
  const parsed = locationUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the delivery area details." };
  const { id, ...data } = parsed.data;
  const existing = await prisma.location.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return { success: false, message: "Delivery area not found." };
  const { nameEn, nameAr, ...locationData } = data;
  await prisma.location.update({
    where: { id },
    data: {
      ...locationData,
      translations: makeLocationTranslations(data.name, nameEn, nameAr),
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
      deliveryAvailable: data.deliveryAvailable ?? data.isActive,
    },
  });
  revalidatePath("/admin/locations");
  revalidatePath("/checkout");
  return { success: true, message: "Delivery area updated." };
}

export async function deleteLocation(locationId: string) {
  await requirePermission("MANAGE_DELIVERY");
  const location = await prisma.location.findUnique({
    where: { id: locationId },
    select: {
      id: true,
      _count: { select: { addresses: true, orders: true } },
    },
  });
  if (!location) return { success: false, message: "Delivery area not found." };
  if (location._count.addresses + location._count.orders > 0) {
    return { success: false, message: "This area is in use. Disable it instead of deleting it." };
  }
  await prisma.location.delete({ where: { id: locationId } });
  revalidatePath("/admin/locations");
  revalidatePath("/checkout");
  return { success: true, message: "Delivery area deleted." };
}