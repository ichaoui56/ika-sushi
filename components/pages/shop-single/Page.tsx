import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import ValidthemeShopSingleAreaSection from "./sections/ValidthemeShopSingleAreaSection";
import { getStorefrontCatalog } from "../../store/storefront-data";
import type { CatalogProduct } from "../../store/products";

export default async function Page({ productId }: { productId?: string }) {
  let products: CatalogProduct[];
  try {
    ({ products } = await getStorefrontCatalog());
  } catch (error) {
    console.error("Unable to load product detail catalog.", error);
    products = [];
  }

  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <ValidthemeShopSingleAreaSection products={products} productId={productId} />
      <Footer />
    </LegacyPage>
  );
}
