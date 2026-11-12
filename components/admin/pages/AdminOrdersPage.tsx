import { AdminPageHeading } from "../AdminShell";
import OrderManager from "../OrderManager";
import { getAdminOrders } from "../../../features/orders/queries";
import { getCurrentUser } from "../../../lib/auth/session";

export default async function AdminOrdersPage() {
  const [orders, currentUser] = await Promise.all([getAdminOrders(), getCurrentUser()]);
  const canManage = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_ORDERS"));
  return <><AdminPageHeading title="Orders" description="Recent customer orders and their delivery status." /><OrderManager orders={orders.map((order) => ({ ...order, createdAt: order.createdAt.toISOString() }))} canManage={canManage} /></>;
}