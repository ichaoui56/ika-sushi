import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import MapsAreaSection from "./sections/MapsAreaSection";
import ContactStyleOneAreaSection from "./sections/ContactStyleOneAreaSection";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <MapsAreaSection />
      <ContactStyleOneAreaSection />
      <Footer />
    </LegacyPage>
  );
}
