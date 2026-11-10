import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import FoodMenuStyleTwoAreaSection from "./sections/FoodMenuStyleTwoAreaSection";
import ReservationStyleTwoAreaSection from "./sections/ReservationStyleTwoAreaSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FeatureStyleOneAreaSection from "./sections/FeatureStyleOneAreaSection";

export default function Page() {
  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <FoodMenuStyleTwoAreaSection />
      <ReservationStyleTwoAreaSection />
      <TestimonialsSection />
      <FeatureStyleOneAreaSection />
      <Footer />
    </LegacyPage>
  );
}
