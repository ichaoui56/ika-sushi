import { redirect } from "next/navigation";
import LegacyPage from "../../legacy-page";
import { Footer } from "../../layout/Footer";
import { Preloader } from "../../layout/Preloader";
import { SiteHeader } from "../../layout/SiteHeader";
import { TopBar } from "../../layout/TopBar";
import { getCustomerAccount } from "../../../features/customers/queries";
import { getAvailableDeliveryAreas } from "../../../features/locations/queries";
import AccountClient from "./AccountClient";

export default async function AccountServer() {
  const account = await getCustomerAccount();
  if (!account) redirect("/login");
  const areas = await getAvailableDeliveryAreas();
  return (
    <LegacyPage>
      <Preloader />
      <TopBar />
      <SiteHeader />
      <AccountClient account={account} areas={areas.map(({ id, name }) => ({ id, name }))} />
      <Footer />
    </LegacyPage>
  );
}