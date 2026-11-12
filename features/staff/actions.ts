"use server";

import argon2 from "argon2";
import { revalidatePath } from "next/cache";
import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { requireRole } from "../../lib/auth/permissions";
import { normalizePhoneNumber } from "../auth/schemas";
import { staffCreateSchema, staffUpdateSchema } from "./schemas";

export async function createStaffUser(input: unknown) {
  await requireRole("ADMIN");
  const parsed = staffCreateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the staff details." };
  const data = parsed.data;
  const normalizedPhone = normalizePhoneNumber(data.phone);
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) return { success: false, message: "Enter a valid phone number." };

  const passwordHash = await argon2.hash(data.password, { type: argon2.argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 });
  try {
    await prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        normalizedPhone,
        email: data.email || null,
        passwordHash,
        role: data.role === "EMPLOYEE" ? UserRole.EMPLOYEE : UserRole.DELIVERY,
        permissions: data.role === "EMPLOYEE" ? { create: data.permissions.map((permission) => ({ permission })) } : undefined,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, message: "An account already uses that phone or email." };
    }
    throw error;
  }
  revalidatePath("/admin/employees");
  revalidatePath("/admin/delivery");
  return { success: true, message: "Staff account created." };
}

export async function updateStaffUser(input: unknown) {
  await requireRole("ADMIN");
  const parsed = staffUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the staff permissions." };
  const data = parsed.data;
  const user = await prisma.user.findFirst({
    where: { id: data.userId, role: { in: [UserRole.EMPLOYEE, UserRole.DELIVERY] } },
    select: { id: true, role: true },
  });
  if (!user) return { success: false, message: "Staff account not found." };

  await prisma.$transaction(async (transaction) => {
    await transaction.user.update({ where: { id: user.id }, data: { status: data.isActive ? UserStatus.ACTIVE : UserStatus.DISABLED } });
    if (user.role === UserRole.EMPLOYEE) {
      await transaction.employeePermission.deleteMany({ where: { userId: user.id } });
      if (data.permissions.length) {
        await transaction.employeePermission.createMany({
          data: data.permissions.map((permission) => ({ userId: user.id, permission })),
          skipDuplicates: true,
        });
      }
    }
    if (!data.isActive) await transaction.session.deleteMany({ where: { userId: user.id } });
  });
  revalidatePath("/admin/employees");
  revalidatePath("/admin/delivery");
  return { success: true, message: "Staff account updated." };
}