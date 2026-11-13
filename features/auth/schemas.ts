import { z } from "zod";

export function isValidPhoneNumber(phone: string): boolean {
  const value = phone.trim();
  if (value.startsWith("+")) {
    if (!/^\+[1-9\d\s().-]+$/.test(value)) return false;
    const digits = value.slice(1).replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }
  if (!/^[\d\s().-]+$/.test(value)) return false;
  return value.replace(/\D/g, "").length === 10;
}

export const loginSchema = z.object({
  identifier: z.string().trim().min(1).max(254).refine(
    (identifier) => identifier.includes("@") || isValidPhoneNumber(identifier),
    { message: "Email, phone number, or password is incorrect." },
  ),
  password: z.string().min(1).max(128),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(8).max(24).refine(isValidPhoneNumber, {
      message: "Enter a valid phone number.",
    }),
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