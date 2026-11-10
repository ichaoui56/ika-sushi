import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import ChefSingleAreaSection from "./sections/ChefSingleAreaSection";

export default function Page() {
  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <ChefSingleAreaSection />
      <Footer />
    </LegacyPage>
  );
}
