import type { Metadata } from "next";
import TrackOrderClient from "../../components/pages/track-order/TrackOrderClient";

export const metadata: Metadata = {
  title: "Track your order - Ika",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}