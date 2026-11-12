"use client";

import { useState, type FormEvent } from "react";
import { lookupTrackedOrder } from "../../../features/orders/actions";

const statusLabels: Record<string, string> = {
  PENDING: "Order received",
  CONFIRMED: "Order confirmed",
  PREPARING: "Preparing your sushi",
  READY_FOR_DELIVERY: "Ready for delivery",
  ASSIGNED: "Delivery person assigned",
  OUT_FOR_DELIVERY: "On the way",
  DELIVERED: "Delivered",
  DELIVERY_FAILED: "Delivery needs attention",
  CANCELLED: "Cancelled",
};

export default function TrackOrderClient() {
  const [reference, setReference] = useState("");
  const [phoneLastFour, setPhoneLastFour] = useState("");
  const [order, setOrder] = useState<Awaited<ReturnType<typeof lookupTrackedOrder>>["order"]>();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    setOrder(undefined);
    try {
      const result = await lookupTrackedOrder({ reference, phoneLastFour });
      if (!result.success) setError(result.message);
      else setOrder(result.order);
    } finally {
      setPending(false);
    }
  };

  return (
    <main className="Ika-track-page">
      <div className="container">
        <header className="Ika-checkout-heading"><span className="Ika-checkout-eyebrow">ORDER TRACKING</span><h1>Track your order</h1><p>Enter your order reference and the last four digits of its contact number.</p></header>
        <form className="Ika-track-form" onSubmit={submit}>
          <label>Order reference<input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="IKA-..." autoComplete="off" required /></label>
          <label>Phone ending<input inputMode="numeric" pattern="[0-9]{4}" maxLength={4} value={phoneLastFour} onChange={(event) => setPhoneLastFour(event.target.value.replace(/\D/g, ""))} placeholder="0000" required /></label>
          {error && <p role="alert">{error}</p>}
          <button className="Ika-checkout-submit" disabled={pending}>{pending ? "Checking..." : "Track order"}</button>
        </form>
        {order && (
          <section className="Ika-track-result" aria-live="polite">
            <header><div><span>Order reference</span><h2>{order.reference}</h2></div><strong>{statusLabels[order.status] ?? order.status}</strong></header>
            <ol>{order.history.map((entry, index) => <li key={`${entry.status}-${entry.createdAt}`} className={entry.status === order.status ? "is-current" : "is-complete"}><span className="Ika-track-step" aria-hidden="true">{index + 1}</span><div><strong>{statusLabels[entry.status] ?? entry.status}</strong><time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString()}</time></div></li>)}</ol>
            {order.estimatedMinutes && <p>Estimated delivery: about {order.estimatedMinutes} minutes.</p>}
            <ul>{order.items.map((item, index) => <li key={`${item.productName}-${index}`}>{item.quantity} × {item.productName}</li>)}</ul>
          </section>
        )}
      </div>
    </main>
  );
}