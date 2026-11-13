import { z } from "zod";

export const customerProfileSchema = z.object({
  name: z.string().trim().min(1).max(120),
});

export const customerPasswordSchema = z
  .object({
    currentPassword: z.string().max(128).optional(),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const customerAddressSchema = z.object({
  locationId: z.string().min(1),
  label: z.string().trim().max(80).optional(),
  street: z.string().trim().max(180).optional(),
  building: z.string().trim().max(80).optional(),
  apartment: z.string().trim().max(80).optional(),
  floor: z.string().trim().max(40).optional(),
  instructions: z.string().trim().max(1000).optional(),
});

export const customerAddressUpdateSchema = customerAddressSchema.extend({
  addressId: z.string().min(1),
});