import { AdminPageHeading } from "../AdminShell";
import OrderManager from "../OrderManager";
import { getAdminOrders, getAssignableDeliveryPeople } from "../../../features/orders/queries";
import { getCurrentUser } from "../../../lib/auth/session";
import { OrderStatus } from "@prisma/client";

type SearchParams = { view?: string | string[]; status?: string | string[]; from?: string | string[]; to?: string | string[]; q?: string | string[] };

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const statusValue = firstValue(params.status);
  const status = Object.values(OrderStatus).includes(statusValue as OrderStatus) ? statusValue as OrderStatus : undefined;
  const filters = { status, from: firstValue(params.from), to: firstValue(params.to), query: firstValue(params.q) };
  const [orders, currentUser] = await Promise.all([getAdminOrders(filters), getCurrentUser()]);
  const canManage = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_ORDERS"));
  const canAssign = currentUser?.role === "ADMIN" || Boolean(currentUser?.permissions.includes("MANAGE_DELIVERY"));
  const deliveryPeople = canAssign ? await getAssignableDeliveryPeople() : [];
  return <><AdminPageHeading title="Orders" description="Review daily orders, contact customers, and update delivery status." /><OrderManager orders={orders.map((order) => ({ ...order, createdAt: order.createdAt.toISOString() }))} canManage={canManage} canAssign={canAssign} deliveryPeople={deliveryPeople} view={firstValue(params.view) === "list" ? "list" : "cards"} status={status ?? ""} from={filters.from ?? ""} to={filters.to ?? ""} query={filters.query ?? ""} /></>;
}