import { z } from "zod";

const destinationSchema = z.string().trim().max(500).refine((value) => {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}, "Use a site-relative path or an HTTPS URL.");

const imageUrlSchema = z.union([
  z.string().trim().url(),
  z.string().trim().regex(/^\/api\/images\/[A-Za-z0-9]{20,128}$/),
]);

export const heroSlideSchema = z.object({
  title: z.string().trim().min(1).max(180),
  subtitle: z.string().trim().max(180).optional(),
  description: z.string().trim().max(2000).optional(),
  imageUrl: imageUrlSchema.optional(),
  ctaText: z.string().trim().max(80).optional(),
  ctaDestination: destinationSchema.optional(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  visibleFrom: z.coerce.date().nullable().optional(),
  visibleUntil: z.coerce.date().nullable().optional(),
});

export const heroSlideUpdateSchema = heroSlideSchema.extend({
  id: z.string().min(1),
});