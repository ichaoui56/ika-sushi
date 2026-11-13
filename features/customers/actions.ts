"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth/session";
import { hashPassword, verifyPassword } from "../../lib/auth/password";
import { customerAddressSchema, customerAddressUpdateSchema, customerPasswordSchema, customerProfileSchema } from "./schemas";

async function requireCustomer() {
  const user = await getCurrentUser();
  if (!user || user.role !== "CUSTOMER") throw new Error("Sign in to manage your customer account.");
  return user;
}

export async function updateCustomerProfile(input: unknown) {
  const user = await requireCustomer();
  const parsed = customerProfileSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Enter a valid name." };
  await prisma.user.update({ where: { id: user.id }, data: { name: parsed.data.name } });
  revalidatePath("/account");
  return { success: true, message: "Profile updated." };
}

export async function updateCustomerPassword(input: unknown) {
  const user = await requireCustomer();
  const parsed = customerPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Use a password of at least 8 characters and confirm it." };

  const account = await prisma.user.findUnique({ where: { id: user.id }, select: { passwordHash: true } });
  if (!account) return { success: false, message: "Account not found." };
  if (account.passwordHash && !(await verifyPassword(account.passwordHash, parsed.data.currentPassword ?? ""))) {
    return { success: false, message: "Current password is incorrect." };
  }
  if (account.passwordHash && parsed.data.currentPassword === parsed.data.newPassword) {
    return { success: false, message: "Choose a password different from your current one." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: await hashPassword(parsed.data.newPassword) },
  });
  revalidatePath("/account");
  return { success: true, message: "Password updated." };
}

export async function addCustomerAddress(input: unknown) {
  const user = await requireCustomer();
  const parsed = customerAddressSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the address details." };

  const location = await prisma.location.findFirst({
    where: { id: parsed.data.locationId, isActive: true },
    select: { id: true },
  });
  if (!location) return { success: false, message: "That delivery area is not available." };

  const addressCount = await prisma.address.count({ where: { userId: user.id } });
  const address = await prisma.address.create({
    data: {
      ...parsed.data,
      userId: user.id,
      label: parsed.data.label || null,
      street: parsed.data.street || null,
      building: parsed.data.building || null,
      apartment: parsed.data.apartment || null,
      floor: parsed.data.floor || null,
      instructions: parsed.data.instructions || null,
      isDefault: addressCount === 0,
    },
    include: { location: { select: { id: true, name: true } } },
  });
  return { success: true, message: "Address saved.", address };
}

export async function updateCustomerAddress(input: unknown) {
  const user = await requireCustomer();
  const parsed = customerAddressUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the address details." };
  const { addressId, ...data } = parsed.data;
  const location = await prisma.location.findFirst({
    where: { id: data.locationId, isActive: true },
    select: { id: true },
  });
  if (!location) return { success: false, message: "That delivery area is not available." };
  const result = await prisma.address.updateMany({
    where: { id: addressId, userId: user.id },
    data: {
      ...data,
      label: data.label || null,
      street: data.street || null,
      building: data.building || null,
      apartment: data.apartment || null,
      floor: data.floor || null,
      instructions: data.instructions || null,
    },
  });
  if (!result.count) return { success: false, message: "Address not found." };
  revalidatePath("/account");
  return { success: true, message: "Address updated." };
}

export async function setDefaultCustomerAddress(addressId: string) {
  const user = await requireCustomer();
  const address = await prisma.address.findFirst({ where: { id: addressId, userId: user.id }, select: { id: true } });
  if (!address) return { success: false, message: "Address not found." };
  await prisma.$transaction([
    prisma.address.updateMany({ where: { userId: user.id }, data: { isDefault: false } }),
    prisma.address.update({ where: { id: address.id }, data: { isDefault: true } }),
  ]);
  revalidatePath("/account");
  return { success: true, message: "Default address updated." };
}

export async function deleteCustomerAddress(addressId: string) {
  const user = await requireCustomer();
  const address = await prisma.address.findFirst({ where: { id: addressId, userId: user.id } });
  if (!address) return { success: false, message: "Address not found." };
  if (address.isDefault) {
    const replacement = await prisma.address.findFirst({ where: { userId: user.id, id: { not: addressId } }, orderBy: { createdAt: "desc" } });
    await prisma.$transaction(async (transaction) => {
      await transaction.address.delete({ where: { id: addressId } });
      if (replacement) await transaction.address.update({ where: { id: replacement.id }, data: { isDefault: true } });
    });
  } else {
    await prisma.address.delete({ where: { id: addressId } });
  }
  return { success: true, message: "Address deleted." };
}