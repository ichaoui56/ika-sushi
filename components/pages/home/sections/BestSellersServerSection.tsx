import { getBestSellerProducts } from "../../../../features/products/queries";
import type { CatalogProduct } from "../../../store/products";
import MostSelledProducts from "./MostSelledProducts";
import { normalizeProductTranslations } from "../../../../features/products/translations";

export default async function BestSellersServerSection() {
  try {
    const records = await getBestSellerProducts();
    const products: CatalogProduct[] = records.map((product) => ({
      id: product.id,
      name: product.name,
      translations: normalizeProductTranslations(product.translations),
      price: product.priceMinor / 100,
      image: product.images[0]?.url ?? "",
      quantity: 1,
      description: product.shortDescription ?? product.description,
      shortDescription: product.shortDescription ?? undefined,
      tags: product.tags,
      categories: [],
      isBestSeller: true,
      originalPrice: product.originalPriceMinor ? product.originalPriceMinor / 100 : undefined,
    }));
    return <MostSelledProducts products={products} />;
  } catch {
    return <MostSelledProducts />;
  }
}