import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import ValidthemeShopAreaSection from "./sections/ValidthemeShopAreaSection";
import { getStorefrontCatalog } from "../../store/storefront-data";
import type { CatalogProduct } from "../../store/products";

export default async function Page() {
  let products: CatalogProduct[];
  try {
    ({ products } = await getStorefrontCatalog());
  } catch (error) {
    console.error("Unable to load shop catalog.", error);
    products = [];
  }

  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <ValidthemeShopAreaSection products={products} />
      <Footer />
    </LegacyPage>
  );
}
