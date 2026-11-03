import type { Metadata } from "next";
import RoutePage from "../../components/pages/wishlist/Page";

export const metadata: Metadata = {
  title: "Wishlist - Foodu",
};

export default function Page() {
  return <RoutePage />;
}
