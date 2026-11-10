import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { TestimonialsSection } from "../../sections/TestimonialsSection";
import { HomeBlogSection } from "../../sections/HomeBlogSection";
import { Footer } from "../../layout/Footer";
import HeroSection from "./sections/HeroSection";
import MenuStyleFiveAreaSection from "./sections/MenuStyleFiveAreaSection";
import FeatureStyleTwoAreaSection from "./sections/FeatureStyleTwoAreaSection";
import ValidthemeShopAreaSection from "./sections/ValidthemeShopAreaSection";
import DiscountAreaSection from "./sections/DiscountAreaSection";
import ChefStyleOneAreaSection from "./sections/ChefStyleOneAreaSection";
import GalleryStyleTwoAreaSection from "./sections/GalleryStyleTwoAreaSection";
import BrandAreaSection from "./sections/BrandAreaSection";
import FeatureStyleOneAreaSection from "./sections/FeatureStyleOneAreaSection";
import MostSelledProducts from "./sections/MostSelledProducts";

export default function Page() {
  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <HeroSection />
      <MenuStyleFiveAreaSection />
      {/* <FeatureStyleTwoAreaSection /> */}
      <MostSelledProducts />
      <ValidthemeShopAreaSection />
      <DiscountAreaSection />
      <FeatureStyleOneAreaSection />
      {/* <ChefStyleOneAreaSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <GalleryStyleTwoAreaSection /> */}
      {/* <BrandAreaSection /> */}
      <HomeBlogSection />
      <Footer />
    </LegacyPage>
  );
}
