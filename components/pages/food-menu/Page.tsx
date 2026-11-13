import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import FoodMenuAreaSection from "./sections/FoodMenuAreaSection";
import ReservationStyleTwoAreaSection from "./sections/ReservationStyleTwoAreaSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FeatureStyleOneAreaSection from "./sections/FeatureStyleOneAreaSection";
import { getStorefrontCatalog } from "../../store/storefront-data";

export default async function Page() {
  let catalog;
  try {
    catalog = await getStorefrontCatalog();
  } catch (error) {
    console.error("Unable to load food menu catalog.", error);
    catalog = { categories: [], products: [] };
  }

  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <FoodMenuAreaSection products={catalog.products} categories={catalog.categories} />
      {/* <ReservationStyleTwoAreaSection /> */}
      {/* <TestimonialsSection /> */}
      <FeatureStyleOneAreaSection />
      <Footer />
    </LegacyPage>
  );
}
