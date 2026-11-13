import LegacyPage from "../../legacy-page";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { HomeBlogSection } from "../../sections/HomeBlogSection";
import { Footer } from "../../layout/Footer";
import HeroSection from "./sections/HeroSection";
import MenuStyleFiveAreaSection from "./sections/MenuStyleFiveAreaSection";
import ValidthemeShopAreaSection from "./sections/ValidthemeShopAreaSection";
import DiscountAreaSection from "./sections/DiscountAreaSection";
import MostSelledProducts from "./sections/MostSelledProducts";
import { getHomeStorefrontData } from "../../store/storefront-data";

export default async function Page() {
  let storefront;
  try {
    storefront = await getHomeStorefrontData();
  } catch (error) {
    console.error("Unable to load homepage storefront data.", error);
    storefront = { categories: [], products: [], heroSlides: [], bestSellers: [], promotions: [] };
  }

  return (
    <LegacyPage>
      <Preloader />
      <TopBar />
      <SiteHeader />
      <HeroSection slides={storefront.heroSlides} />
      <MenuStyleFiveAreaSection products={storefront.promotions} />
      <MostSelledProducts products={storefront.bestSellers} />
      <ValidthemeShopAreaSection products={storefront.products} categories={storefront.categories} />
      <DiscountAreaSection products={storefront.promotions} />
      <HomeBlogSection />
      <Footer />
    </LegacyPage>
  );
}
