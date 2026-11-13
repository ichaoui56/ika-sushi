import type { Prisma } from "@prisma/client";

export type LocationLocale = "fr" | "en" | "ar";

export interface LocationTranslations {
  name?: Partial<Record<LocationLocale, string>>;
}

export function normalizeLocationTranslations(value: unknown): LocationTranslations {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const rawName = (value as Record<string, unknown>).name;
  if (!rawName || typeof rawName !== "object" || Array.isArray(rawName)) return {};

  const name: Partial<Record<LocationLocale, string>> = {};
  for (const locale of ["fr", "en", "ar"] as const) {
    const translated = (rawName as Record<string, unknown>)[locale];
    if (typeof translated === "string" && translated.trim()) name[locale] = translated.trim();
  }
  return Object.keys(name).length ? { name } : {};
}

export function makeLocationTranslations(nameFr: string, nameEn: string, nameAr: string): Prisma.InputJsonObject {
  return { name: { fr: nameFr.trim(), en: nameEn.trim(), ar: nameAr.trim() } };
}

export function localizeLocationName(location: { name: string; translations?: unknown }, locale: LocationLocale) {
  const translations = normalizeLocationTranslations(location.translations);
  return translations.name?.[locale] || translations.name?.fr || location.name;
}