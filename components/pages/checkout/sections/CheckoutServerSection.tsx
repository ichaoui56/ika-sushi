import { getAvailableDeliveryAreas } from "../../../../features/locations/queries";
import { normalizeLocationTranslations } from "../../../../features/locations/translations";
import { getCustomerCheckoutDetails } from "../../../../features/customers/queries";
import CheckoutAreaSection from "./CheckoutAreaSection";

export default async function CheckoutServerSection() {
  try {
    const [areas, customer] = await Promise.all([getAvailableDeliveryAreas(), getCustomerCheckoutDetails()]);
    return (
      <CheckoutAreaSection
        areas={areas.map((area) => ({
          id: area.id,
          name: area.name,
          translations: normalizeLocationTranslations(area.translations),
          feeMinor: area.deliveryFeeMinor,
          minimumOrderMinor: area.minimumOrderMinor,
          estimatedMinutes: area.estimatedMinutes,
        }))}
        customer={customer}
      />
    );
  } catch {
    return <CheckoutAreaSection areas={[]} loadError="Delivery areas are temporarily unavailable." />;
  }
}