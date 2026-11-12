"use client";

import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { updateOrderStatus } from "../../features/orders/actions";

interface OrderRow {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  totalMinor: number;
  currency: string;
  createdAt: string;
  locationNameSnapshot: string;
  assignment: { deliveryPerson: { id: string; name: string } } | null;
}
const statuses: OrderStatus[] = [
  "PENDING", "CONFIRMED", "PREPARING", "READY_FOR_DELIVERY", "ASSIGNED",
  "OUT_FOR_DELIVERY", "DELIVERED", "DELIVERY_FAILED", "CANCELLED",
];

export default function OrderManager({ orders, canManage }: { orders: OrderRow[]; canManage: boolean }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const changeStatus = async (order: OrderRow, value: string) => {
    const nextStatus = value as OrderStatus;
    if (nextStatus === order.status) return;
    const note = nextStatus === "CANCELLED" ? window.prompt("Reason for cancellation:")?.trim() : undefined;
    if (nextStatus === "CANCELLED" && !note) return;
    setPendingId(order.id);
    setError("");
    try {
      const result = await updateOrderStatus(order.id, nextStatus, note);
      if (!result.success) setError(result.message);
      else window.location.reload();
    } finally { setPendingId(null); }
  };

  return <>
    {error && <p className="Ika-admin-feedback is-error" role="alert">{error}</p>}
    <div className="Ika-admin-table-scroll"><table className="Ika-admin-table"><thead><tr><th>Reference</th><th>Customer</th><th>Phone</th><th>Area</th><th>Total</th><th>Delivery</th><th>Status</th></tr></thead><tbody>
      {orders.map((order) => <tr key={order.id}><td>{order.reference}</td><td>{order.customerName}</td><td>{order.customerPhone}</td><td>{order.locationNameSnapshot}</td><td>{order.currency} {(order.totalMinor / 100).toFixed(2)}</td><td>{order.assignment?.deliveryPerson.name ?? "Unassigned"}</td><td>{canManage ? <select aria-label={`Status for ${order.reference}`} disabled={pendingId === order.id} value={order.status} onChange={(event) => void changeStatus(order, event.target.value)}>{statuses.map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}</select> : order.status.replaceAll("_", " ")}</td></tr>)}
      {orders.length === 0 && <tr><td colSpan={7}>No orders have been placed yet.</td></tr>}
    </tbody></table></div>
  </>;
}
