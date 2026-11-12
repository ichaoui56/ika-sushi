import { z } from "zod";

export const storeSettingsSchema = z.object({
  restaurantName: z.string().trim().min(1).max(120),
  contactPhone: z.string().trim().min(8).max(24),
  whatsappNumber: z.string().trim().min(8).max(24),
  currency: z.literal("MAD"),
  socialLinks: z.object({
    instagram: z.string().url().or(z.literal("")),
    facebook: z.string().url().or(z.literal("")),
  }),
});