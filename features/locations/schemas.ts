import { z } from "zod";

export const locationSchema = z.object({
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().max(140).optional(),
  type: z.enum(["CITY", "NEIGHBORHOOD", "STREET"]),
  parentId: z.string().min(1).nullable().optional(),
  deliveryAvailable: z.boolean().optional(),
  deliveryFeeMinor: z.number().int().nonnegative().default(0),
  minimumOrderMinor: z.number().int().nonnegative().optional(),
  estimatedMinutes: z.number().int().positive().max(600).nullable().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const locationUpdateSchema = locationSchema.extend({ id: z.string().min(1) });