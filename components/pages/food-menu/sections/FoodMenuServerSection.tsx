import { getActiveCatalog } from "../../../../features/products/queries";
import { catalogProducts, menuCategories, type CatalogProduct } from "../../../store/products";
import FoodMenuAreaSection from "./FoodMenuAreaSection";
import { normalizeProductTranslations } from "../../../../features/products/translations";

export default async function FoodMenuServerSection() {
  try {
    const catalog = await getActiveCatalog();
    const categories = catalog.map(({ id, name }) => ({ id, name }));
    const activeCategoryIds = new Set(categories.map(({ id }) => id));
    const productsById = new Map<string, CatalogProduct>();

    for (const category of catalog) {
      for (const relation of category.products) {
        const product = relation.product;
        if (productsById.has(product.id)) continue;
        const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];
        productsById.set(product.id, {
          id: product.id,
          name: product.name,
          translations: normalizeProductTranslations(product.translations),
          price: product.priceMinor / 100,
          image: primaryImage?.url ?? "",
          quantity: 1,
          description: product.shortDescription ?? product.description,
          shortDescription: product.shortDescription ?? undefined,
          tags: product.tags,
          categories: product.categories
            .filter(({ category: linkedCategory }) => activeCategoryIds.has(linkedCategory.id))
            .map(({ category: linkedCategory }) => linkedCategory.id),
          isBestSeller: product.isFeaturedBestSeller,
          originalPrice: product.originalPriceMinor ? product.originalPriceMinor / 100 : undefined,
        });
      }
    }

    return <FoodMenuAreaSection products={[...productsById.values()]} categories={categories} />;
  } catch {
    return <FoodMenuAreaSection products={catalogProducts} categories={menuCategories} />;
  }
}