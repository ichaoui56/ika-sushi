import { UserRole, type Permission } from "@prisma/client";

const employeeLandingPages: Array<{ permissions: Permission[]; href: string }> = [
  { permissions: ["VIEW_ORDERS", "MANAGE_ORDERS"], href: "/admin/orders" },
  { permissions: ["VIEW_PRODUCTS", "MANAGE_PRODUCTS"], href: "/admin/products" },
  { permissions: ["VIEW_CATEGORIES", "MANAGE_CATEGORIES"], href: "/admin/categories" },
  { permissions: ["VIEW_DELIVERY", "MANAGE_DELIVERY"], href: "/admin/delivery" },
  { permissions: ["VIEW_EMPLOYEES", "MANAGE_EMPLOYEES"], href: "/admin/employees" },
  { permissions: ["VIEW_REPORTS"], href: "/admin/dashboard" },
  { permissions: ["MANAGE_SETTINGS"], href: "/admin/settings" },
  { permissions: ["MANAGE_HERO"], href: "/admin/hero" },
];

export function getAuthenticatedLandingPath(user: { role: UserRole; permissions: Permission[] }) {
  if (user.role === UserRole.ADMIN) return "/admin/dashboard";
  if (user.role === UserRole.DELIVERY) return "/delivery";
  if (user.role === UserRole.EMPLOYEE) {
    return employeeLandingPages.find((page) => page.permissions.some((permission) => user.permissions.includes(permission)))?.href ?? "/admin/dashboard";
  }
  return "/orders";
}