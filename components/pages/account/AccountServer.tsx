import { getCustomerAccount } from "../../../features/customers/queries";
import { getAvailableDeliveryAreas } from "../../../features/locations/queries";
import AccountClient from "./AccountClient";

export default async function AccountServer() {
  const [account, areas] = await Promise.all([getCustomerAccount(), getAvailableDeliveryAreas()]);
  return <AccountClient account={account} areas={areas.map(({ id, name }) => ({ id, name }))} />;
}