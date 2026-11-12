import { AdminPageHeading } from "../AdminShell";
import OrderManager from "../OrderManager";
import { getAdminOrders } from "../../../features/orders/queries";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();
  return <><AdminPageHeading title="Orders" description="Recent customer orders and their delivery status." /><OrderManager orders={orders.map((order) => ({ ...order, createdAt: order.createdAt.toISOString() }))} /></>;
}