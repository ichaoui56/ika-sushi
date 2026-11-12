import type { Metadata } from "next";
import RoutePage from "../../components/pages/food-menu/Page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ika Sushi & Seafood",
};

export default function Page() {
  return <RoutePage />;
}
