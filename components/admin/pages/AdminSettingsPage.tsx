import { AdminPageHeading } from "../AdminShell";
import SettingsManager from "../SettingsManager";
import { getStoreSettings } from "../../../features/settings/queries";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();
  return <><AdminPageHeading title="Website settings" description="Storefront contact and business configuration." /><SettingsManager settings={settings} /></>;
}