import type { Metadata } from "next";
import ClosedNotice from "../../components/layout/ClosedNotice";
import { getPublicOpeningHours } from "../../lib/store-hours";
import "../../components/layout/ClosedNotice.css";

export const metadata: Metadata = {
  title: "Temporarily closed | IKA Sushi",
  robots: { index: false, follow: false },
};

export default async function ClosedPage() {
  const openingHours = await getPublicOpeningHours();
  return <ClosedNotice openingHours={openingHours} />;
}