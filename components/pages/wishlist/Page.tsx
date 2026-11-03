import LegacyPage from "../../legacy-page";
import { Footer } from "../../layout/Footer";
import { Preloader } from "../../layout/Preloader";
import { SiteHeader } from "../../layout/SiteHeader";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { TopBar } from "../../layout/TopBar";
import WishlistContent from "./WishlistContent";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <main className="default-padding foodu-wishlist-page">
        <div className="container">
          <div className="site-heading text-center">
            <h4 className="sub-title">Your favorites</h4>
            <h2 className="title">Wishlist</h2>
          </div>
          <WishlistContent />
        </div>
      </main>
      <Footer />
    </LegacyPage>
  );
}
