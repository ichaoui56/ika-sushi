import type { Metadata } from "next";
import DeliveryServer from "../../components/pages/delivery/DeliveryServer";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "My deliveries - Ika" };

export default function DeliveryPage() {
  return <DeliveryServer />;
}