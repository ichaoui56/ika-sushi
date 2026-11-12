import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { requireAnyPermission, requirePermission } from "../../lib/auth/permissions";

export async function getStaffUsers(role?: "EMPLOYEE" | "DELIVERY") {
  await requireAnyPermission("VIEW_EMPLOYEES", "MANAGE_EMPLOYEES");
  return prisma.user.findMany({
    where: role ? { role } : { role: { in: ["EMPLOYEE", "DELIVERY"] } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      permissions: { select: { permission: true } },
      deliveryAssignments: { select: { id: true } },
    },
  });
}

export async function getStaffUser(userId: string) {
  await requirePermission("MANAGE_EMPLOYEES");
  return prisma.user.findFirst({
    where: { id: userId, role: { in: ["EMPLOYEE", "DELIVERY"] } },
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
    },
  });
}

export async function getStaffUserPage({
  page = 1,
  pageSize = 12,
  search = "",
}: {
  page?: number;
  pageSize?: number;
  search?: string;
} = {}) {
  await requireAnyPermission("VIEW_EMPLOYEES", "MANAGE_EMPLOYEES");
  const searchTerm = search.trim();
  const where: Prisma.UserWhereInput = {
    role: { in: ["EMPLOYEE", "DELIVERY"] },
    ...(searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" as const } },
            { phone: { contains: searchTerm } },
            { email: { contains: searchTerm, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const total = await prisma.user.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, Math.floor(page)), pageCount);
  const users = await prisma.user.findMany({
    where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
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
    },
  });

  return { users, page: currentPage, pageCount, total, pageSize, search: searchTerm };
}