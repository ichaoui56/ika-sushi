import { AdminPageHeading } from "../AdminShell";
import SettingsManager from "../SettingsManager";
import { getStoreSettings } from "../../../features/settings/queries";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();
  return <><AdminPageHeading title="General website settings" description="Storefront identity, contact details, and business configuration." /><SettingsManager settings={settings} /></>;
}