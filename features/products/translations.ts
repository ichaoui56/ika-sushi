import type { Prisma } from "@prisma/client";

export type ProductLocale = "fr" | "en" | "ar";
export type ProductTranslationField = "name" | "description" | "shortDescription";

export type LocalizedProductText = Partial<Record<ProductLocale, string>>;

export interface ProductTranslations {
  name?: LocalizedProductText;
  description?: LocalizedProductText;
  shortDescription?: LocalizedProductText;
}

export function normalizeProductTranslations(value: unknown): ProductTranslations {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const source = value as Record<string, unknown>;
  const result: ProductTranslations = {};
  for (const field of ["name", "description", "shortDescription"] as const) {
    const localized = source[field];
    if (!localized || typeof localized !== "object" || Array.isArray(localized)) continue;

    const sourceValues = localized as Record<string, unknown>;
    const values: LocalizedProductText = {};
    for (const locale of ["fr", "en", "ar"] as const) {
      const text = sourceValues[locale];
      if (typeof text === "string" && text.trim()) values[locale] = text.trim();
    }
    if (Object.keys(values).length) result[field] = values;
  }
  return result;
}

export function withFrenchProductFallback(
  value: unknown,
  fallback: { name: string; description: string; shortDescription?: string | null },
): Prisma.InputJsonObject {
  const translations = normalizeProductTranslations(value);
  const shortDescription: Record<string, string> = { ...translations.shortDescription };
  if (fallback.shortDescription?.trim()) shortDescription.fr = translations.shortDescription?.fr || fallback.shortDescription.trim();
  return {
    name: { fr: translations.name?.fr || fallback.name, ...translations.name },
    description: { fr: translations.description?.fr || fallback.description, ...translations.description },
    ...(Object.keys(shortDescription).length ? { shortDescription } : {}),
  } satisfies Prisma.InputJsonObject;
}

export function localizeProductText(
  baseText: string,
  translations: ProductTranslations | null | undefined,
  field: ProductTranslationField,
  locale: ProductLocale,
): string {
  return translations?.[field]?.[locale]?.trim() || translations?.[field]?.fr?.trim() || baseText;
}