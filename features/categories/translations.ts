import type { Prisma } from "@prisma/client";

export type CategoryLocale = "fr" | "en" | "ar";

export interface CategoryTranslations {
  name?: Partial<Record<CategoryLocale, string>>;
}

export function normalizeCategoryTranslations(value: unknown): CategoryTranslations {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const rawName = (value as Record<string, unknown>).name;
  if (!rawName || typeof rawName !== "object" || Array.isArray(rawName)) return {};

  const name: Partial<Record<CategoryLocale, string>> = {};
  for (const locale of ["fr", "en", "ar"] as const) {
    const translated = (rawName as Record<string, unknown>)[locale];
    if (typeof translated === "string" && translated.trim()) name[locale] = translated.trim();
  }
  return Object.keys(name).length ? { name } : {};
}

export function makeCategoryTranslations(nameFr: string, nameEn: string, nameAr: string): Prisma.InputJsonObject {
  return { name: { fr: nameFr.trim(), en: nameEn.trim(), ar: nameAr.trim() } };
}

export function localizeCategoryName(
  category: { name: string; translations?: unknown },
  locale: CategoryLocale,
): string {
  const translations = normalizeCategoryTranslations(category.translations);
  return translations.name?.[locale] || translations.name?.fr || category.name;
}