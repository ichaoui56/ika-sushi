import type { Metadata } from "next";
import { redirect } from "next/navigation";
import RoutePage from "../../components/pages/login/Page";
import { getAuthenticatedLandingPath } from "../../features/auth/landing";
import { getCurrentUser } from "../../lib/auth/session";

export const metadata: Metadata = {
  title: "Ika Sushi & Seafood",
};

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect(getAuthenticatedLandingPath(user));

  return <RoutePage />;
}
