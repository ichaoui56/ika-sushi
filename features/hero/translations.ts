import type { Prisma } from "@prisma/client";
import { heroSlideTranslationsSchema } from "./schemas";

export type HeroLocale = "fr" | "en" | "ar";
export type HeroCopyField = "title" | "subtitle" | "description" | "ctaText";

export interface HeroSlideCopy {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

export type HeroSlideTranslations = Partial<Record<HeroLocale, Partial<HeroSlideCopy>>>;

export function normalizeHeroTranslations(value: unknown): HeroSlideTranslations {
  const parsed = heroSlideTranslationsSchema.partial().safeParse(value);
  if (!parsed.success) return {};
  return parsed.data;
}

export function getHeroSlideCopies(
  value: unknown,
  fallback: HeroSlideCopy,
): Record<HeroLocale, HeroSlideCopy> {
  const translations = normalizeHeroTranslations(value);
  const french = { ...fallback, ...translations.fr };
  return {
    fr: french,
    en: { ...french, ...translations.en },
    ar: { ...french, ...translations.ar },
  };
}

export function toPrismaHeroTranslations(
  value: unknown,
  fallback: HeroSlideCopy,
): Prisma.InputJsonObject {
  const copies = getHeroSlideCopies(value, fallback);
  return {
    fr: { ...copies.fr },
    en: { ...copies.en },
    ar: { ...copies.ar },
  };
}

export function getHeroSlideText(
  translations: HeroSlideTranslations | null | undefined,
  locale: HeroLocale,
  field: HeroCopyField,
): string | undefined {
  return translations?.[locale]?.[field]?.trim() || translations?.fr?.[field]?.trim();
}