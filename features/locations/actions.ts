"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { locationSchema, locationUpdateSchema } from "./schemas";

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function defaultParentId(type: "CITY" | "NEIGHBORHOOD" | "STREET") {
  if (type === "CITY") return null;
  if (type === "NEIGHBORHOOD") {
    const defaultCity = await prisma.location.findUnique({ where: { slug: "casablanca" }, select: { id: true } });
    const city = defaultCity ?? await prisma.location.findFirst({ where: { type: "CITY" }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true } });
    return city?.id ?? null;
  }
  const neighborhood = await prisma.location.findFirst({ where: { type: "NEIGHBORHOOD" }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true } });
  return neighborhood?.id ?? null;
}

export async function createLocation(input: unknown) {
  await requirePermission("MANAGE_DELIVERY");
  const parsed = locationSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the delivery area details." };
  const data = parsed.data;
  await prisma.location.create({
    data: {
      ...data,
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
      parentId: data.parentId ?? await defaultParentId(data.type),
      deliveryAvailable: data.type === "NEIGHBORHOOD" && data.isActive,
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
  await prisma.location.update({
    where: { id },
    data: {
      ...data,
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
      deliveryAvailable: data.type === "NEIGHBORHOOD" && data.isActive,
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
      _count: { select: { children: true, addresses: true, orders: true } },
    },
  });
  if (!location) return { success: false, message: "Delivery area not found." };
  if (location._count.children + location._count.addresses + location._count.orders > 0) {
    return { success: false, message: "This area is in use. Disable it instead of deleting it." };
  }
  await prisma.location.delete({ where: { id: locationId } });
  revalidatePath("/admin/locations");
  revalidatePath("/checkout");
  return { success: true, message: "Delivery area deleted." };
}