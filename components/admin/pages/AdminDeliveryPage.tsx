import { AdminPageHeading } from "../AdminShell";
import DeliveryAssignmentManager from "../DeliveryAssignmentManager";
import { getDeliveryOverview } from "../../../features/orders/queries";
import { getCurrentUser } from "../../../lib/auth/session";

export default async function AdminDeliveryPage() {
  const [{ deliveryPeople, unassignedOrders }, user] = await Promise.all([
    getDeliveryOverview(),
    getCurrentUser(),
  ]);
  const canManage = user?.role === "ADMIN" || Boolean(user?.permissions.includes("MANAGE_DELIVERY"));

  return (
    <>
      <AdminPageHeading title="Delivery operations" description="Delivery workload and orders awaiting assignment." />
      <DeliveryAssignmentManager
        deliveryPeople={deliveryPeople.map((person) => ({
          id: person.id,
          name: person.name,
          phone: person.phone,
          status: person.status,
          assignedCount: person._count.deliveryAssignments,
        }))}
        unassignedOrders={unassignedOrders.map((order) => ({ ...order, createdAt: order.createdAt.toISOString() }))}
        canManage={canManage}
      />
    </>
  );
}