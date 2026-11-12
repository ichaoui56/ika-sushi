import { z } from "zod";

export const staffCreateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(8).max(24),
  email: z.union([z.literal(""), z.string().trim().email().max(254)]).optional(),
  password: z.string().min(8).max(128),
  role: z.enum(["EMPLOYEE", "DELIVERY"]),
  permissions: z.array(z.enum([
    "VIEW_ORDERS", "MANAGE_ORDERS", "VIEW_PRODUCTS", "MANAGE_PRODUCTS",
    "VIEW_CUSTOMERS", "MANAGE_CUSTOMERS", "VIEW_DELIVERY", "MANAGE_DELIVERY",
    "VIEW_CATEGORIES", "MANAGE_CATEGORIES", "VIEW_REPORTS", "MANAGE_HERO",
    "MANAGE_SETTINGS", "MANAGE_EMPLOYEES",
  ])).max(14).default([]),
});

export const staffUpdateSchema = z.object({
  userId: z.string().min(1),
  isActive: z.boolean(),
  permissions: z.array(z.enum([
    "VIEW_ORDERS", "MANAGE_ORDERS", "VIEW_PRODUCTS", "MANAGE_PRODUCTS",
    "VIEW_CUSTOMERS", "MANAGE_CUSTOMERS", "VIEW_DELIVERY", "MANAGE_DELIVERY",
    "VIEW_CATEGORIES", "MANAGE_CATEGORIES", "VIEW_REPORTS", "MANAGE_HERO",
    "MANAGE_SETTINGS", "MANAGE_EMPLOYEES",
  ])).max(14),
});