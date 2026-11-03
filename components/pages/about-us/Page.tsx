import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { FunFactsSection } from "../../sections/FunFactsSection";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import AboutStyleOneAreaSection from "./sections/AboutStyleOneAreaSection";
import BrandAreaSection from "./sections/BrandAreaSection";
import ChefStyleOneAreaSection from "./sections/ChefStyleOneAreaSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <AboutStyleOneAreaSection />
      <BrandAreaSection />
      <FunFactsSection />
      <ChefStyleOneAreaSection />
      <TestimonialsSection />
      <Footer />
    </LegacyPage>
  );
}
