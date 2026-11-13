import type { Metadata } from "next";
import RoutePage from "../../components/pages/shop-single/Page";

export const metadata: Metadata = {
  title: "Ika Sushi & Seafood",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const params = await searchParams;
  const productId = Array.isArray(params.product) ? params.product[0] : params.product;
  return <RoutePage productId={productId} />;
}
