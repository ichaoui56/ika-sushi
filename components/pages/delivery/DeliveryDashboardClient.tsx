"use client";

import { useState } from "react";
import { logoutAction } from "../../../features/auth/actions";
import { updateOrderStatus } from "../../../features/orders/actions";
import "./DeliveryDashboard.css";

interface DeliveryOrder {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  addressSnapshot: string;
  deliveryNotes: string | null;
  status: string;
  totalMinor: number;
  currency: string;
  location: { name: string };
  items: Array<{ id: string; productName: string; quantity: number }>;
}

export default function DeliveryDashboardClient({ orders }: { orders: DeliveryOrder[] }) {
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const update = async (order: DeliveryOrder, status: "OUT_FOR_DELIVERY" | "DELIVERED" | "DELIVERY_FAILED") => {
    setPendingId(order.id);
    setError("");
    try {
      const result = await updateOrderStatus(order.id, status);
      if (!result.success) setError(result.message);
      else window.location.reload();
    } finally { setPendingId(null); }
  };

  return <main className="Ika-delivery-dashboard"><div className="container">
    <header className="Ika-delivery-heading"><div><span>IKA SUSHI / DELIVERY</span><h1>My deliveries</h1><p>Only orders assigned to your account are shown here.</p></div><button type="button" onClick={() => void logoutAction()}>Sign out</button></header>
    {error && <p role="alert" className="Ika-delivery-error">{error}</p>}
    {orders.length === 0 ? <p className="Ika-delivery-empty">No deliveries are assigned to you yet.</p> : <div className="Ika-delivery-list">{orders.map((order) => <article className="Ika-delivery-order" key={order.id}>
      <header><div><span>{order.reference}</span><strong>{order.status.replaceAll("_", " ")}</strong></div><b>{order.currency} {(order.totalMinor / 100).toFixed(2)}</b></header>
      <div className="Ika-delivery-customer"><strong>{order.customerName}</strong><a href={`tel:${order.customerPhone}`}>{order.customerPhone}</a><span>{order.location.name}</span><p>{order.addressSnapshot}</p>{order.deliveryNotes && <p>{order.deliveryNotes}</p>}</div>
      <ul>{order.items.map((item) => <li key={item.id}>{item.quantity} × {item.productName}</li>)}</ul>
      <footer>{order.status === "ASSIGNED" && <button disabled={pendingId === order.id} onClick={() => void update(order, "OUT_FOR_DELIVERY")}>Start delivery</button>}{order.status === "OUT_FOR_DELIVERY" && <><button disabled={pendingId === order.id} onClick={() => void update(order, "DELIVERED")}>Mark delivered</button><button className="is-secondary" disabled={pendingId === order.id} onClick={() => void update(order, "DELIVERY_FAILED")}>Report failed delivery</button></>}</footer>
    </article>)}</div>}
  </div></main>;
}
