import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import ValidthemeShopAreaSection from "./sections/ValidthemeShopAreaSection";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <ValidthemeShopAreaSection />
      <Footer />
    </LegacyPage>
  );
}
