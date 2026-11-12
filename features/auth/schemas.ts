import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(128),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(8).max(24),
    email: z.union([z.literal(""), z.string().trim().email().max(254)]).optional(),
    password: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((value) => value.password === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export function normalizePhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("212") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `212${digits.slice(1)}`;
  if (digits.length === 9) return `212${digits}`;
  return digits;
}