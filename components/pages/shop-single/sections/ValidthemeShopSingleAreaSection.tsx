import ShopProductDetailContent from "./ShopProductDetailContent";
import type { CatalogProduct } from "../../../store/products";

export default function ValidthemeShopSingleAreaSection({ products, productId }: { products: CatalogProduct[]; productId?: string }) {
  return <ShopProductDetailContent products={products} productId={productId} />;
}
