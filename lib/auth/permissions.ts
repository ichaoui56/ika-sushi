import "server-only";
import { notFound, redirect } from "next/navigation";
import { Permission, UserRole } from "@prisma/client";
import { getCurrentUser } from "./session";

const managePermissionForView: Partial<Record<Permission, Permission>> = {
  VIEW_ORDERS: "MANAGE_ORDERS",
  VIEW_PRODUCTS: "MANAGE_PRODUCTS",
  VIEW_CUSTOMERS: "MANAGE_CUSTOMERS",
  VIEW_DELIVERY: "MANAGE_DELIVERY",
  VIEW_CATEGORIES: "MANAGE_CATEGORIES",
  VIEW_EMPLOYEES: "MANAGE_EMPLOYEES",
};

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(...roles: UserRole[]) {
  const user = await requireAuth();
  if (!roles.includes(user.role)) notFound();
  return user;
}

export async function requirePermission(permission: Permission) {
  const user = await requireAuth();
  const canView = user.permissions.includes(permission)
    || Boolean(managePermissionForView[permission] && user.permissions.includes(managePermissionForView[permission]!));
  if (user.role !== UserRole.ADMIN && !canView) notFound();
  return user;
}

export async function requireAnyPermission(...permissions: Permission[]) {
  const user = await requireAuth();
  if (user.role !== UserRole.ADMIN && !permissions.some((permission) => user.permissions.includes(permission))) notFound();
  return user;
}