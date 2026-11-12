import DeliveryDashboardClient from "./DeliveryDashboardClient";
import { getMyDeliveryOrders } from "../../../features/orders/queries";
import { requireRole } from "../../../lib/auth/permissions";

export default async function DeliveryServer() {
  await requireRole("DELIVERY");
  const assignments = await getMyDeliveryOrders();
  const orders = (assignments ?? []).map(({ order }) => ({
    ...order,
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
    })),
  }));

  return <DeliveryDashboardClient orders={orders} />;
}