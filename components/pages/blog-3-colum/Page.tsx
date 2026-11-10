import LegacyPage from "../../legacy-page";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { Preloader } from "../../layout/Preloader";
import { TopBar } from "../../layout/TopBar";
import { SiteHeader } from "../../layout/SiteHeader";
import { Footer } from "../../layout/Footer";
import BreadcrumbSection from "./sections/BreadcrumbSection";
import BlogContentSection from "./sections/BlogContentSection";

export default function Page() {
  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <BreadcrumbSection />
      <BlogContentSection />
      <Footer />
    </LegacyPage>
  );
}
