import "server-only";
import { notFound, redirect } from "next/navigation";
import { Permission, UserRole } from "@prisma/client";
import { getCurrentUser } from "./session";

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
  if (user.role !== UserRole.ADMIN && !user.permissions.includes(permission)) notFound();
  return user;
}