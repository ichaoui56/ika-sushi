import { getAvailableDeliveryAreas } from "../../../../features/locations/queries";
import CheckoutAreaSection from "./CheckoutAreaSection";

export default async function CheckoutServerSection() {
  try {
    const areas = await getAvailableDeliveryAreas();
    return (
      <CheckoutAreaSection
        areas={areas.map((area) => ({
          id: area.id,
          name: area.name,
          feeMinor: area.deliveryFeeMinor,
          minimumOrderMinor: area.minimumOrderMinor,
          estimatedMinutes: area.estimatedMinutes,
        }))}
      />
    );
  } catch {
    return <CheckoutAreaSection areas={[]} loadError="Delivery areas are temporarily unavailable." />;
  }
}