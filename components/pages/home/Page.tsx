import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
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

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <SiteHeader />
      <HeroSection />
      <MenuStyleFiveAreaSection />
      <FeatureStyleTwoAreaSection />
      <ValidthemeShopAreaSection />
      <DiscountAreaSection />
      <FeatureStyleOneAreaSection />
      <ChefStyleOneAreaSection />
      <TestimonialsSection />
      <GalleryStyleTwoAreaSection />
      <BrandAreaSection />
      <HomeBlogSection />
      <Footer />
    </LegacyPage>
  );
}
