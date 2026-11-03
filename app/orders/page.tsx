import type { Metadata } from "next";
import OrdersPage from "../../components/pages/orders/Page";

export const metadata: Metadata = {
  title: "Your Orders - Foodu",
  description: "View your Foodu order history.",
};

export default function Page() {
  return <OrdersPage />;
}
