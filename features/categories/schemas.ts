import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1).max(120),
  nameEn: z.string().trim().min(1).max(120),
  nameAr: z.string().trim().min(1).max(120),
  slug: z.string().trim().max(140).optional(),
  description: z.string().trim().max(2000).optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const categoryUpdateSchema = categorySchema.extend({
  id: z.string().min(1),
});