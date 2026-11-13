"use client";

import { useEffect, useState } from "react";
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
  assignedAt: string;
  lastFailureNote: string | null;
  status: string;
  totalMinor: number;
  currency: string;
  location: { name: string };
  items: Array<{ id: string; productName: string; quantity: number }>;
}

type DeliveryTab = "active" | "history";
type NotificationState = "checking" | "ready" | "enabled" | "busy" | "denied" | "unsupported";

const completedStatuses = new Set(["DELIVERED", "CANCELLED"]);
const statusLabels: Record<string, string> = {
  ASSIGNED: "Assigned",
  OUT_FOR_DELIVERY: "On the way",
  DELIVERY_FAILED: "Needs follow-up",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

function formatMoney(minor: number, currency: string) {
  return new Intl.NumberFormat("fr-MA", { style: "currency", currency }).format(minor / 100);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const international = digits.startsWith("0") && digits.length === 10 ? `212${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
}

function decodeVapidPublicKey(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const decoded = atob(padded);
  return Uint8Array.from(decoded, (character) => character.charCodeAt(0));
}

export default function DeliveryDashboardClient({ orders }: { orders: DeliveryOrder[] }) {
  const [tab, setTab] = useState<DeliveryTab>("active");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [failedOrderId, setFailedOrderId] = useState<string | null>(null);
  const [failureNote, setFailureNote] = useState("Customer could not be reached.");
  const [notificationState, setNotificationState] = useState<NotificationState>("checking");
  const [notificationMessage, setNotificationMessage] = useState("");
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";
  const activeOrders = orders.filter((order) => !completedStatuses.has(order.status));
  const historyOrders = orders.filter((order) => completedStatuses.has(order.status));
  const visibleOrders = tab === "active" ? activeOrders : historyOrders;
  const enRouteCount = activeOrders.filter((order) => order.status === "OUT_FOR_DELIVERY").length;

  useEffect(() => {
    let active = true;
    if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
      setNotificationState("unsupported");
      return;
    }
    void navigator.serviceWorker.ready.then(async (registration) => {
      const subscription = await registration.pushManager.getSubscription();
      if (!active) return;
      setNotificationState(subscription ? "enabled" : Notification.permission === "denied" ? "denied" : "ready");
    }).catch(() => {
      if (active) setNotificationState("unsupported");
    });
    return () => { active = false; };
  }, []);

  const toggleNotifications = async () => {
    if (!vapidPublicKey || notificationState === "unsupported" || notificationState === "denied") return;
    setNotificationState("busy");
    setNotificationMessage("");
    try {
      const registration = await navigator.serviceWorker.ready;
      const existing = await registration.pushManager.getSubscription();
      if (existing) {
        const response = await fetch("/api/delivery/push-subscription", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: existing.endpoint }),
        });
        if (!response.ok) throw new Error("Could not turn notifications off.");
        await existing.unsubscribe();
        setNotificationState("ready");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setNotificationState(permission === "denied" ? "denied" : "ready");
        setNotificationMessage(permission === "denied" ? "Allow notifications in your browser settings to receive new assignments." : "Notification permission was not granted.");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: decodeVapidPublicKey(vapidPublicKey),
      });
      const response = await fetch("/api/delivery/push-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });
      if (!response.ok) throw new Error("Could not save this device for notifications.");
      setNotificationState("enabled");
    } catch (subscriptionError) {
      setNotificationState("ready");
      setNotificationMessage(subscriptionError instanceof Error ? subscriptionError.message : "Could not update notification settings.");
    }
  };

  const update = async (order: DeliveryOrder, status: "OUT_FOR_DELIVERY" | "DELIVERED" | "DELIVERY_FAILED", note?: string) => {
    setPendingId(order.id);
    setError("");
    try {
      const result = await updateOrderStatus(order.id, status, note);
      if (!result.success) setError(result.message);
      else {
        setFailedOrderId(null);
        window.location.reload();
      }
    } finally { setPendingId(null); }
  };

  return (
    <main className="Ika-delivery-dashboard">
      <header className="Ika-delivery-topbar">
        <div className="Ika-delivery-topbar-inner">
          <a className="Ika-delivery-brand" href="/delivery" aria-label="IKA delivery home"><img src="/white-logo.png" alt="IKA Sushi" /><span>COURIER DESK</span></a>
          <div className="Ika-delivery-top-actions">
            <button className={`Ika-delivery-notification${notificationState === "enabled" ? " is-enabled" : ""}`} type="button" disabled={notificationState === "checking" || notificationState === "busy" || notificationState === "unsupported" || notificationState === "denied" || !vapidPublicKey} onClick={() => void toggleNotifications()}>
              <i className={`fas ${notificationState === "enabled" ? "fa-bell" : "fa-bell-slash"}`} aria-hidden="true" />
              <span>{notificationState === "busy" ? "Updating…" : notificationState === "enabled" ? "Notifications on" : "Enable notifications"}</span>
            </button>
            <button className="Ika-delivery-signout" type="button" onClick={() => void logoutAction()}><i className="fas fa-sign-out-alt" aria-hidden="true" /><span>Sign out</span></button>
          </div>
        </div>
      </header>
      <div className="Ika-delivery-content">
        <section className="Ika-delivery-welcome">
          <div><span className="Ika-delivery-eyebrow">IKA SUSHI / DELIVERY</span><h1>Today’s route</h1><p>Your assigned orders, in delivery order.</p></div>
          <div className="Ika-delivery-stats" aria-label="Delivery summary">
            <div><strong>{activeOrders.length}</strong><span>Open orders</span></div>
            <div><strong>{enRouteCount}</strong><span>On the way</span></div>
            <div><strong>{historyOrders.filter((order) => order.status === "DELIVERED").length}</strong><span>Delivered</span></div>
          </div>
        </section>
        {notificationMessage && <p className="Ika-delivery-notice" role="status">{notificationMessage}</p>}
        {!vapidPublicKey && <p className="Ika-delivery-notice">Push notifications are not configured on this server.</p>}
        {notificationState === "denied" && !notificationMessage && <p className="Ika-delivery-notice">Notifications are blocked in this browser. Allow them in browser settings to receive assignments.</p>}
        {notificationState === "unsupported" && <p className="Ika-delivery-notice">This browser does not support push notifications.</p>}
        {error && <p role="alert" className="Ika-delivery-error">{error}</p>}
        <nav className="Ika-delivery-tabs" role="tablist" aria-label="Delivery orders">
          <button type="button" role="tab" aria-selected={tab === "active"} className={tab === "active" ? "is-active" : ""} onClick={() => setTab("active")}>Active <span>{activeOrders.length}</span></button>
          <button type="button" role="tab" aria-selected={tab === "history"} className={tab === "history" ? "is-active" : ""} onClick={() => setTab("history")}>History <span>{historyOrders.length}</span></button>
        </nav>
        {visibleOrders.length === 0 ? <section className="Ika-delivery-empty"><span><i className={`fas ${tab === "active" ? "fa-route" : "fa-clipboard-check"}`} aria-hidden="true" /></span><h2>{tab === "active" ? "You’re all caught up" : "No completed deliveries yet"}</h2><p>{tab === "active" ? "New assignments will appear here." : "Completed deliveries will be kept here."}</p></section> : <div className="Ika-delivery-list">{visibleOrders.map((order, index) => (
          <article className={`Ika-delivery-order${order.status === "DELIVERY_FAILED" ? " is-attention" : ""}`} key={order.id}>
            <header className="Ika-delivery-order-header">
              <div className="Ika-delivery-order-title"><span className="Ika-delivery-sequence">{String(index + 1).padStart(2, "0")}</span><div><span className="Ika-delivery-reference">{order.reference}</span><time dateTime={order.assignedAt}>Assigned {formatDate(order.assignedAt)}</time></div></div>
              <span className={`Ika-delivery-status is-${order.status.toLowerCase().replaceAll("_", "-")}`}>{statusLabels[order.status] ?? order.status.replaceAll("_", " ")}</span>
            </header>
            <div className="Ika-delivery-order-body">
              <section className="Ika-delivery-destination">
                <span className="Ika-delivery-section-label">DELIVERY DETAILS</span>
                <strong className="Ika-delivery-customer-name">{order.customerName}</strong>
                <span className="Ika-delivery-location"><i className="fas fa-map-marker-alt" aria-hidden="true" />{order.location.name}</span>
                <p className="Ika-delivery-address">{order.addressSnapshot}</p>
                {order.deliveryNotes && <p className="Ika-delivery-instructions"><i className="fas fa-info-circle" aria-hidden="true" />{order.deliveryNotes}</p>}
                {order.status === "DELIVERY_FAILED" && order.lastFailureNote && <p className="Ika-delivery-failure-note"><i className="fas fa-exclamation-circle" aria-hidden="true" />{order.lastFailureNote}</p>}
                <div className="Ika-delivery-contact-actions">
                  <a className="is-call" href={`tel:${order.customerPhone}`}><i className="fas fa-phone" aria-hidden="true" /><span>Call client</span></a>
                  <a className="is-whatsapp" href={whatsappHref(order.customerPhone)} target="_blank" rel="noreferrer"><i className="fab fa-whatsapp" aria-hidden="true" /><span>WhatsApp</span></a>
                </div>
              </section>
              <section className="Ika-delivery-order-items">
                <span className="Ika-delivery-section-label">ORDER ITEMS</span>
                <ul>{order.items.map((item) => <li key={item.id}><span>{item.quantity}<b>×</b></span><strong>{item.productName}</strong></li>)}</ul>
                <div className="Ika-delivery-total"><span>Order total</span><strong>{formatMoney(order.totalMinor, order.currency)}</strong></div>
              </section>
            </div>
            {order.status === "OUT_FOR_DELIVERY" && failedOrderId === order.id && <form className="Ika-delivery-failure-form" onSubmit={(event) => { event.preventDefault(); if (failureNote.trim()) void update(order, "DELIVERY_FAILED", failureNote.trim()); }}>
              <label htmlFor={`Ika-delivery-failure-${order.id}`}>Why couldn’t you deliver?</label>
              <textarea id={`Ika-delivery-failure-${order.id}`} value={failureNote} maxLength={1000} required onChange={(event) => setFailureNote(event.target.value)} />
              <div><button className="is-secondary" type="button" onClick={() => setFailedOrderId(null)}>Cancel</button><button className="is-danger" type="submit" disabled={pendingId === order.id || !failureNote.trim()}>{pendingId === order.id ? "Saving…" : "Record failed delivery"}</button></div>
            </form>}
            <footer className="Ika-delivery-order-actions">
              {order.status === "ASSIGNED" && <button className="is-primary" disabled={pendingId === order.id} onClick={() => void update(order, "OUT_FOR_DELIVERY")}><i className="fas fa-route" aria-hidden="true" />Start delivery</button>}
              {order.status === "OUT_FOR_DELIVERY" && <><button className="is-primary" disabled={pendingId === order.id} onClick={() => void update(order, "DELIVERED")}><i className="fas fa-check" aria-hidden="true" />Mark delivered</button>{failedOrderId !== order.id && <button className="is-secondary" disabled={pendingId === order.id} onClick={() => { setFailureNote("Customer could not be reached."); setFailedOrderId(order.id); }}><i className="fas fa-phone-slash" aria-hidden="true" />Customer unreachable</button>}</>}
              {order.status === "DELIVERY_FAILED" && <span className="Ika-delivery-attention-copy"><i className="fas fa-user-clock" aria-hidden="true" />Waiting for reassignment</span>}
              {completedStatuses.has(order.status) && <span className="Ika-delivery-complete-copy"><i className="fas fa-check-circle" aria-hidden="true" />Delivery closed</span>}
            </footer>
          </article>
        ))}</div>}
      </div>
    </main>
  );
}
