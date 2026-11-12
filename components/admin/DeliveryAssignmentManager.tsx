"use client";

import { useState } from "react";
import { assignDeliveryOrders } from "../../features/orders/actions";

interface DeliveryPerson { id: string; name: string; phone: string; status: string; assignedCount: number }
interface UnassignedOrder { id: string; reference: string; customerName: string; locationNameSnapshot: string; status: string; createdAt: string }

export default function DeliveryAssignmentManager({
  deliveryPeople,
  unassignedOrders,
  canManage,
}: {
  deliveryPeople: DeliveryPerson[];
  unassignedOrders: UnassignedOrder[];
  canManage: boolean;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deliveryPersonId, setDeliveryPersonId] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const assign = async () => {
    setPending(true);
    setError("");
    setMessage("");
    try {
      const result = await assignDeliveryOrders({ orderIds: selectedIds, deliveryPersonId, note });
      if (!result.success) setError(result.message);
      else {
        setMessage(result.message);
        window.location.reload();
      }
    } finally { setPending(false); }
  };

  return <>
    <h2>Delivery personnel</h2>
    <div className="Ika-admin-table-scroll"><table className="Ika-admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Status</th><th>Assigned orders</th></tr></thead><tbody>
      {deliveryPeople.map((person) => <tr key={person.id}><td>{person.name}</td><td>{person.phone}</td><td>{person.status}</td><td>{person.assignedCount}</td></tr>)}
      {!deliveryPeople.length && <tr><td colSpan={4}>No delivery accounts have been created.</td></tr>}
    </tbody></table></div>
    <h2>Ready to assign</h2>
    {canManage && <section className="Ika-admin-form" aria-label="Bulk assign orders">
      <div className="Ika-admin-form-grid">
        <label>Delivery person<select value={deliveryPersonId} onChange={(event) => setDeliveryPersonId(event.target.value)}><option value="">Choose a delivery person</option>{deliveryPeople.filter((person) => person.status === "ACTIVE").map((person) => <option value={person.id} key={person.id}>{person.name} ({person.assignedCount} assigned)</option>)}</select></label>
        <label>Assignment note<input value={note} onChange={(event) => setNote(event.target.value)} maxLength={1000} placeholder="Optional" /></label>
      </div>
      {(error || message) && <p className={error ? "Ika-admin-feedback is-error" : "Ika-admin-feedback"} role={error ? "alert" : "status"}>{error || message}</p>}
      <button className="Ika-admin-button" type="button" disabled={pending || !deliveryPersonId || !selectedIds.length} onClick={() => void assign()}>{pending ? "Assigning…" : `Assign ${selectedIds.length || "selected"} orders`}</button>
    </section>}
    <div className="Ika-admin-table-scroll"><table className="Ika-admin-table"><thead><tr>{canManage && <th>Select</th>}<th>Reference</th><th>Customer</th><th>Area</th><th>Status</th><th>Received</th></tr></thead><tbody>
      {unassignedOrders.map((order) => <tr key={order.id}>{canManage && <td><input type="checkbox" aria-label={`Select ${order.reference}`} checked={selectedIds.includes(order.id)} onChange={(event) => setSelectedIds(event.target.checked ? [...selectedIds, order.id] : selectedIds.filter((id) => id !== order.id))} /></td>}<td>{order.reference}</td><td>{order.customerName}</td><td>{order.locationNameSnapshot}</td><td>{order.status.replaceAll("_", " ")}</td><td>{new Date(order.createdAt).toLocaleString()}</td></tr>)}
      {!unassignedOrders.length && <tr><td colSpan={canManage ? 6 : 5}>No orders are awaiting delivery assignment.</td></tr>}
    </tbody></table></div>
  </>;
}
