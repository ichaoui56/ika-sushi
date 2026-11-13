import type { Metadata } from "next";
import LegacyPage from "../../components/legacy-page";
import { Footer } from "../../components/layout/Footer";
import { Preloader } from "../../components/layout/Preloader";
import { SiteHeader } from "../../components/layout/SiteHeader";
import TrackOrderClient from "../../components/pages/track-order/TrackOrderClient";

export const metadata: Metadata = {
  title: "Track your order - Ika",
};

export default function TrackOrderPage() {
  return (
    <LegacyPage>
      <Preloader />
      <SiteHeader />
      <TrackOrderClient />
      <Footer />
    </LegacyPage>
  );
}