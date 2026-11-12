import { z } from "zod";

const productTranslationsSchema = z.object({
  name: z.object({
    fr: z.string().trim().max(160).optional(),
    en: z.string().trim().max(160).optional(),
    ar: z.string().trim().max(160).optional(),
  }).optional(),
  description: z.object({
    fr: z.string().trim().max(5000).optional(),
    en: z.string().trim().max(5000).optional(),
    ar: z.string().trim().max(5000).optional(),
  }).optional(),
  shortDescription: z.object({
    fr: z.string().trim().max(500).optional(),
    en: z.string().trim().max(500).optional(),
    ar: z.string().trim().max(500).optional(),
  }).optional(),
}).optional();

const productBaseSchema = z.object({
  name: z.string().trim().min(1).max(160),
  slug: z.string().trim().max(180).optional(),
  description: z.string().trim().min(1).max(5000),
  shortDescription: z.string().trim().max(500).optional(),
  translations: productTranslationsSchema,
  tags: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  pricingMode: z.enum(["SELLING_AND_ORIGINAL", "ORIGINAL_AND_DISCOUNT", "SELLING_ONLY"]),
  priceMinor: z.number().int().nonnegative().optional(),
  originalPriceMinor: z.number().int().nonnegative().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  isOnPromotion: z.boolean().default(false),
  isFeaturedBestSeller: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  categoryIds: z.array(z.string().min(1)).length(1),
});

type ProductBaseInput = z.infer<typeof productBaseSchema>;

function validatePricing(value: ProductBaseInput, context: z.RefinementCtx) {
  if (value.pricingMode === "SELLING_AND_ORIGINAL") {
    if (value.priceMinor === undefined || value.originalPriceMinor === undefined) {
      context.addIssue({ code: "custom", message: "Enter both selling and original prices." });
    } else if (value.priceMinor > value.originalPriceMinor) {
      context.addIssue({ code: "custom", message: "Selling price cannot exceed original price." });
    }
  }
  if (value.pricingMode === "ORIGINAL_AND_DISCOUNT") {
    if (value.originalPriceMinor === undefined || value.discountPercent === undefined) {
      context.addIssue({ code: "custom", message: "Enter an original price and discount." });
    }
  }
  if (value.pricingMode === "SELLING_ONLY" && value.priceMinor === undefined) {
    context.addIssue({ code: "custom", message: "Enter a selling price." });
  }
}

function calculatePricing<T extends ProductBaseInput>(value: T) {
  let priceMinor = value.priceMinor ?? 0;
  let originalPriceMinor: number | null = null;
  let discountPercent: number | null = null;

  if (value.pricingMode === "SELLING_AND_ORIGINAL") {
    const enteredOriginal = value.originalPriceMinor ?? 0;
    if (enteredOriginal > priceMinor) {
      originalPriceMinor = enteredOriginal;
      discountPercent = Math.round(((enteredOriginal - priceMinor) / enteredOriginal) * 10000) / 100;
    }
  } else if (value.pricingMode === "ORIGINAL_AND_DISCOUNT") {
    const enteredOriginal = value.originalPriceMinor ?? 0;
    discountPercent = value.discountPercent ?? 0;
    const basisPoints = Math.round(discountPercent * 100);
    priceMinor = Math.round(enteredOriginal * (10000 - basisPoints) / 10000);
    originalPriceMinor = discountPercent > 0 ? enteredOriginal : null;
  }

  const { pricingMode: _pricingMode, ...product } = value;
  return { ...product, priceMinor, originalPriceMinor, discountPercent };
}

export const productInputSchema = productBaseSchema
  .extend({ imageUrls: z.array(z.string().url()).max(12).optional() })
  .superRefine(validatePricing)
  .transform(calculatePricing);

export const productUpdateSchema = productBaseSchema
  .extend({ id: z.string().min(1) })
  .superRefine(validatePricing)
  .transform(calculatePricing);

export type ProductInput = z.output<typeof productInputSchema>;