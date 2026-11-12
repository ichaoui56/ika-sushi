"use server";

import argon2 from "argon2";
import { revalidatePath } from "next/cache";
import { OrderStatus, Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { requireAnyPermission, requirePermission } from "../../lib/auth/permissions";
import { normalizePhoneNumber } from "../auth/schemas";
import { staffCreateSchema, staffUpdateSchema } from "./schemas";

export async function createStaffUser(input: unknown) {
  await requirePermission("MANAGE_EMPLOYEES");
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
  await requirePermission("MANAGE_EMPLOYEES");
  const parsed = staffUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the staff permissions." };
  const data = parsed.data;
  const user = await prisma.user.findFirst({
    where: { id: data.userId, role: { in: [UserRole.EMPLOYEE, UserRole.DELIVERY] } },
    select: { id: true, role: true },
  });
  if (!user) return { success: false, message: "Staff account not found." };
  if (user.role === UserRole.DELIVERY && data.role === "EMPLOYEE") {
    const assignedCount = await prisma.deliveryAssignment.count({ where: { deliveryPersonId: user.id } });
    if (assignedCount > 0) return { success: false, message: "Reassign or remove this person's deliveries before changing their role." };
  }

  const nextRole = data.role === "EMPLOYEE" ? UserRole.EMPLOYEE : data.role === "DELIVERY" ? UserRole.DELIVERY : user.role;
  const profile: Prisma.UserUpdateInput = {};
  if (data.name !== undefined) profile.name = data.name;
  if (data.phone !== undefined) {
    const normalizedPhone = normalizePhoneNumber(data.phone);
    if (normalizedPhone.length < 8 || normalizedPhone.length > 15) return { success: false, message: "Enter a valid phone number." };
    profile.phone = data.phone;
    profile.normalizedPhone = normalizedPhone;
  }
  if (data.email !== undefined) profile.email = data.email || null;
  if (data.password) profile.passwordHash = await argon2.hash(data.password, { type: argon2.argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 });

  try {
    await prisma.$transaction(async (transaction) => {
      await transaction.user.update({
        where: { id: user.id },
        data: { ...profile, role: nextRole, status: data.isActive ? UserStatus.ACTIVE : UserStatus.DISABLED },
      });
      await transaction.employeePermission.deleteMany({ where: { userId: user.id } });
      if (nextRole === UserRole.EMPLOYEE && data.permissions.length) {
        await transaction.employeePermission.createMany({
          data: data.permissions.map((permission) => ({ userId: user.id, permission })),
          skipDuplicates: true,
        });
      }
      if (!data.isActive) await transaction.session.deleteMany({ where: { userId: user.id } });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, message: "Another account already uses that phone or email." };
    }
    throw error;
  }

  revalidatePath("/admin/employees");
  revalidatePath("/admin/delivery");
  return { success: true, message: "Staff account updated." };
}

export async function deleteStaffUser(userId: string) {
  await requirePermission("MANAGE_EMPLOYEES");
  if (!userId) return { success: false, message: "Staff account not found." };
  const user = await prisma.user.findFirst({
    where: { id: userId, role: { in: [UserRole.EMPLOYEE, UserRole.DELIVERY] } },
    select: {
      id: true,
      _count: { select: { orders: true, deliveryAssignments: true } },
    },
  });
  if (!user) return { success: false, message: "Staff account not found." };
  if (user._count.orders > 0) return { success: false, message: "This account is linked to orders and cannot be permanently deleted." };
  const activeAssignments = await prisma.deliveryAssignment.count({
    where: {
      deliveryPersonId: user.id,
      order: { status: { notIn: [OrderStatus.DELIVERED, OrderStatus.CANCELLED] } },
    },
  });
  if (activeAssignments > 0) return { success: false, message: "Reassign or finish this person's active deliveries before deleting the account." };

  await prisma.$transaction(async (transaction) => {
    await transaction.deliveryAssignment.deleteMany({
      where: {
        deliveryPersonId: user.id,
        order: { status: { in: [OrderStatus.DELIVERED, OrderStatus.CANCELLED] } },
      },
    });
    await transaction.user.delete({ where: { id: user.id } });
  });
  revalidatePath("/admin/employees");
  revalidatePath("/admin/delivery");
  return { success: true, message: "Staff account permanently deleted." };
}

export async function getStaffUserDetails(userId: string) {
  await requireAnyPermission("VIEW_EMPLOYEES", "MANAGE_EMPLOYEES");
  const user = await prisma.user.findFirst({
    where: { id: userId, role: { in: [UserRole.EMPLOYEE, UserRole.DELIVERY] } },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      permissions: { select: { permission: true } },
      _count: { select: { deliveryAssignments: true } },
      deliveryAssignments: {
        orderBy: { assignedAt: "desc" },
        take: 100,
        select: {
          id: true,
          assignedAt: true,
          order: { select: { reference: true, customerName: true, customerPhone: true, locationNameSnapshot: true, status: true, totalMinor: true, currency: true } },
        },
      },
    },
  });
  if (!user) return null;

  const assignmentHistoryWhere = {
    OR: [
      { changedById: userId },
      { previousPersonId: userId },
      { nextPersonId: userId },
    ],
  };
  const [statusChanges, assignmentHistory, assignmentHistoryCount, statusCounts, currentStatusCounts] = await Promise.all([
    prisma.orderStatusHistory.findMany({
      where: { changedById: userId },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        previous: true,
        next: true,
        note: true,
        createdAt: true,
        order: { select: { reference: true, customerName: true, locationNameSnapshot: true } },
      },
    }),
    prisma.deliveryAssignmentHistory.findMany({
      where: assignmentHistoryWhere,
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        note: true,
        createdAt: true,
        changedById: true,
        changedBy: { select: { name: true } },
        previousPerson: { select: { name: true } },
        nextPerson: { select: { name: true } },
        order: { select: { reference: true, customerName: true, locationNameSnapshot: true } },
      },
    }),
    prisma.deliveryAssignmentHistory.count({ where: { nextPersonId: userId } }),
    prisma.orderStatusHistory.groupBy({ by: ["next"], where: { changedById: userId }, _count: { _all: true } }),
    user.role === UserRole.DELIVERY
      ? prisma.order.groupBy({ by: ["status"], where: { assignment: { is: { deliveryPersonId: userId } } }, _count: { _all: true } })
      : Promise.resolve([]),
  ]);

  const activity = [
    ...statusChanges.map((item) => ({
      id: item.id,
      kind: "status" as const,
      createdAt: item.createdAt.toISOString(),
      reference: item.order.reference,
      customerName: item.order.customerName,
      locationName: item.order.locationNameSnapshot,
      note: item.note,
      previousStatus: item.previous,
      nextStatus: item.next,
    })),
    ...assignmentHistory.map((item) => ({
      id: item.id,
      kind: "assignment" as const,
      createdAt: item.createdAt.toISOString(),
      reference: item.order.reference,
      customerName: item.order.customerName,
      locationName: item.order.locationNameSnapshot,
      note: item.note,
      previousPerson: item.previousPerson?.name ?? null,
      nextPerson: item.nextPerson?.name ?? null,
      changedBy: item.changedBy?.name ?? null,
    })),
  ].sort((first, second) => second.createdAt.localeCompare(first.createdAt));

  const statusCountsByName = Object.fromEntries(statusCounts.map(({ next, _count }) => [next, _count._all]));
  const currentByStatus = currentStatusCounts.map(({ status, _count }) => ({ status, count: _count._all }));
  const totalStatusUpdates = statusCounts.reduce((total, item) => total + item._count._all, 0);

  return {
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
      permissions: user.permissions,
      deliveryAssignmentCount: user._count.deliveryAssignments,
    },
    activity,
    ...(user.role === UserRole.DELIVERY ? {
      deliveryStatistics: {
        lifetimeAssignments: assignmentHistoryCount,
        currentAssignments: user._count.deliveryAssignments,
        currentByStatus,
        deliveredByUser: statusCountsByName.DELIVERED ?? 0,
        failedByUser: statusCountsByName.DELIVERY_FAILED ?? 0,
        statusUpdatesByUser: totalStatusUpdates,
      },
      currentDeliveries: user.deliveryAssignments.map((assignment) => ({
        id: assignment.id,
        reference: assignment.order.reference,
        customerName: assignment.order.customerName,
        customerPhone: assignment.order.customerPhone,
        locationName: assignment.order.locationNameSnapshot,
        status: assignment.order.status,
        totalMinor: assignment.order.totalMinor,
        currency: assignment.order.currency,
        assignedAt: assignment.assignedAt.toISOString(),
      })),
    } : {}),
  };
}