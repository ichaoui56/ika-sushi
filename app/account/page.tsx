import type { Metadata } from "next";
import AccountServer from "../../components/pages/account/AccountServer";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Your account - Ika" };

export default function AccountPage() {
  return <AccountServer />;
}