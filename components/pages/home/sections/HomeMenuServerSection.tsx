import { getActiveCatalog } from "../../../../features/products/queries";
import { catalogProducts, menuCategories, type CatalogProduct } from "../../../store/products";
import ValidthemeShopAreaSection from "./ValidthemeShopAreaSection";
import { normalizeProductTranslations } from "../../../../features/products/translations";

export default async function HomeMenuServerSection() {
  try {
    const catalog = await getActiveCatalog();
    const categories = catalog.map(({ id, name }) => ({ id, name }));
    const activeCategoryIds = new Set(categories.map(({ id }) => id));
    const productMap = new Map<string, CatalogProduct>();

    for (const category of catalog) {
      for (const { product } of category.products) {
        if (productMap.has(product.id)) continue;
        const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0];
        productMap.set(product.id, {
          id: product.id,
          name: product.name,
          translations: normalizeProductTranslations(product.translations),
          price: product.priceMinor / 100,
          image: primaryImage?.url ?? "",
          quantity: 1,
          description: product.shortDescription ?? product.description,
          shortDescription: product.shortDescription ?? undefined,
          tags: product.tags,
          categories: product.categories.filter(({ category: linked }) => activeCategoryIds.has(linked.id)).map(({ category: linked }) => linked.id),
          isBestSeller: product.isFeaturedBestSeller,
          originalPrice: product.originalPriceMinor ? product.originalPriceMinor / 100 : undefined,
        });
      }
    }
    return <ValidthemeShopAreaSection products={[...productMap.values()]} categories={categories} />;
  } catch {
    return <ValidthemeShopAreaSection products={catalogProducts} categories={menuCategories} />;
  }
}