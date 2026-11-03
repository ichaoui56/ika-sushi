import LegacyPage from "../../legacy-page";
import { Footer } from "../../layout/Footer";
import { Preloader } from "../../layout/Preloader";
import { SiteHeader } from "../../layout/SiteHeader";
import { ThemeToggle } from "../../layout/ThemeToggle";
import { TopBar } from "../../layout/TopBar";
import OrdersContent from "./OrdersContent";

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <main className="default-padding foodu-orders-page">
        <div className="container">
          <div className="site-heading text-center">
            <h4 className="sub-title">Your Foodu activity</h4>
            <h2 className="title">My Orders</h2>
          </div>
          <OrdersContent />
        </div>
      </main>
      <Footer />
    </LegacyPage>
  );
}
