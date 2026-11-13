import DeliveryDashboardClient from "./DeliveryDashboardClient";
import { getMyDeliveryOrders } from "../../../features/orders/queries";
import { requireRole } from "../../../lib/auth/permissions";

export default async function DeliveryServer() {
  await requireRole("DELIVERY");
  const assignments = await getMyDeliveryOrders();
  const statusPriority: Record<string, number> = {
    DELIVERY_FAILED: 0,
    ASSIGNED: 1,
    OUT_FOR_DELIVERY: 2,
    DELIVERED: 3,
    CANCELLED: 4,
  };
  const orderedAssignments = [...(assignments ?? [])].sort((first, second) => {
    const priorityDifference = (statusPriority[first.order.status] ?? 5) - (statusPriority[second.order.status] ?? 5);
    return priorityDifference || first.assignedAt.getTime() - second.assignedAt.getTime();
  });
  const orders = orderedAssignments.map(({ order, assignedAt }) => ({
    ...order,
    assignedAt: assignedAt.toISOString(),
    lastFailureNote: order.statusHistory[0]?.note ?? null,
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
    })),
  }));

  return <DeliveryDashboardClient orders={orders} />;
}