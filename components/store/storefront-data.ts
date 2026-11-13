import "server-only";
import { getVisibleHeroSlides } from "../../features/hero/queries";
import { normalizeHeroTranslations } from "../../features/hero/translations";
import { getActiveCatalog } from "../../features/products/queries";
import { normalizeProductTranslations } from "../../features/products/translations";
import { normalizeCategoryTranslations } from "../../features/categories/translations";
import type { HeroSlideContent } from "../pages/home/sections/HeroSection";
import type { CatalogCategory, CatalogProduct } from "./products";

export async function getStorefrontCatalog() {
  const records = await getActiveCatalog();
  const categories: CatalogCategory[] = records.map(({ id, name, translations }) => ({
    id,
    name,
    translations: normalizeCategoryTranslations(translations),
  }));
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const productsById = new Map<string, CatalogProduct>();

  for (const categoryRecord of records) {
    for (const { product } of categoryRecord.products) {
      if (productsById.has(product.id)) continue;

      const productCategories = product.categories
        .map(({ category: linkedCategory }) => categoryById.get(linkedCategory.id))
        .filter((linkedCategory): linkedCategory is CatalogCategory => linkedCategory !== undefined);
      const images = product.images.map(({ url }) => url);
      const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];
      const originalPrice = product.originalPriceMinor === null ? undefined : product.originalPriceMinor / 100;

      productsById.set(product.id, {
        id: product.id,
        slug: product.slug,
        name: product.name,
        translations: normalizeProductTranslations(product.translations),
        price: product.priceMinor / 100,
        currency: product.currency,
        image: primaryImage?.url ?? "",
        images,
        quantity: 1,
        description: product.description,
        shortDescription: product.shortDescription ?? undefined,
        tags: product.tags,
        categories: productCategories.map(({ id }) => id),
        categoryDetails: productCategories,
        isBestSeller: product.isFeaturedBestSeller,
        isOnPromotion: product.isOnPromotion || (originalPrice !== undefined && originalPrice > product.priceMinor / 100),
        isAvailable: product.isAvailable,
        originalPrice,
        discountPercent: product.discountPercent === null ? undefined : Number(product.discountPercent),
      });
    }
  }

  const products = [...productsById.values()];
  return { categories, products };
}

export async function getHomeStorefrontData() {
  const [catalog, slides] = await Promise.all([getStorefrontCatalog(), getVisibleHeroSlides()]);
  const heroSlides: HeroSlideContent[] = slides.map((slide) => ({
    id: slide.id,
    translations: normalizeHeroTranslations(slide.translations),
    eyebrow: slide.subtitle?.split("·")[0]?.trim() ?? "IKA SUSHI",
    badgeLine: slide.subtitle?.split("·")[1]?.trim() ?? "FRESH DAILY",
    titleLineOne: slide.title,
    titleLineTwo: "",
    description: slide.description ?? "Freshly prepared with care.",
    image: slide.imageUrl,
    imageAlt: slide.title,
    imagePosition: "center",
    ctaText: slide.ctaText ?? "COMMANDER",
    ctaDestination: slide.ctaDestination ?? (slide.product ? `/shop-single?product=${encodeURIComponent(slide.product.id)}` : "/food-menu"),
    associatedProduct: slide.product ? {
      id: slide.product.id,
      name: slide.product.name,
      translations: normalizeProductTranslations(slide.product.translations),
      price: slide.product.priceMinor / 100,
      currency: slide.product.currency,
    } : undefined,
  }));
  const bestSellers = catalog.products.filter((product) => product.isAvailable && product.isBestSeller);
  const promotions = catalog.products.filter((product) => product.isAvailable && product.isOnPromotion);

  return { ...catalog, heroSlides, bestSellers, promotions };
}