import LegacyPage from "../../legacy-page";
import { Footer } from "../../layout/Footer";
import { Preloader } from "../../layout/Preloader";
import { SiteHeader } from "../../layout/SiteHeader";
import { TopBar } from "../../layout/TopBar";
import Link from "next/link";
import OrdersContent from "./OrdersContent";

export default function Page() {
  return (
    <LegacyPage>
      
      <Preloader />
      <TopBar />
      <SiteHeader />
      <main className="Ika-orders-page">
        <div className="container">
          <header className="Ika-orders-hero">
            <div>
              <span className="Ika-orders-eyebrow">Your Ika activity</span>
              <h1>My Orders</h1>
              <p>Track every order and revisit what you love.</p>
            </div>
            <Link href="/food-menu" className="Ika-orders-shop-link"><i className="fas fa-utensils" aria-hidden="true" />Browse menu</Link>
          </header>
          <OrdersContent />
        </div>
      </main>
      <Footer />
    </LegacyPage>
  );
}
