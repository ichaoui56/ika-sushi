import { localizeProductText } from "../../features/products/translations";
import type { Locale } from "../i18n/translations";
import { translate } from "../i18n/translations";
import type { CatalogProduct } from "./products";
import type { StoreProduct } from "./StoreProvider";

type LocalizableProduct = Pick<StoreProduct, "name" | "translations"> & Partial<Pick<CatalogProduct, "description" | "shortDescription">>;

export function getProductName(product: LocalizableProduct, locale: Locale) {
  return product.translations
    ? localizeProductText(product.name, product.translations, "name", locale)
    : translate(product.name, locale);
}

export function getProductDescription(product: LocalizableProduct, locale: Locale) {
  if (!product.translations) return translate(product.shortDescription || product.description || "", locale);

  const shortDescription = product.translations.shortDescription;
  const localizedShortDescription = shortDescription?.[locale]?.trim() || shortDescription?.fr?.trim();
  if (localizedShortDescription) return localizedShortDescription;
  if (product.shortDescription) return product.shortDescription;
  return localizeProductText(product.description || "", product.translations, "description", locale);
}