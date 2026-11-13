"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { assignDeliveryOrders, getAdminOrderDetailAction, updateOrderStatus } from "../../features/orders/actions";
import "./OrderManagement.css";

type OrderView = "cards" | "list";

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

type OrderDetail = NonNullable<Awaited<ReturnType<typeof getAdminOrderDetailAction>>>;
type DeliveryPersonOption = { id: string; name: string; phone: string };

const nextStatuses: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY_FOR_DELIVERY", "CANCELLED"],
  READY_FOR_DELIVERY: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["OUT_FOR_DELIVERY", "DELIVERY_FAILED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "DELIVERY_FAILED"],
  DELIVERED: [],
  DELIVERY_FAILED: ["ASSIGNED", "CANCELLED"],
  CANCELLED: [],
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  PREPARING: "En préparation",
  READY_FOR_DELIVERY: "Prête à livrer",
  ASSIGNED: "Livreur assigné",
  OUT_FOR_DELIVERY: "En livraison",
  DELIVERED: "Livrée",
  DELIVERY_FAILED: "Livraison à vérifier",
  CANCELLED: "Annulée",
};

function statusClass(status: OrderStatus) {
  return `is-${status.toLowerCase().replaceAll("_", "-")}`;
}

function canAssignOrder(status: OrderStatus) {
  return status === "READY_FOR_DELIVERY" || status === "ASSIGNED" || status === "DELIVERY_FAILED";
}

function formatMoney(minor: number, currency: string) {
  return new Intl.NumberFormat("fr-MA", { style: "currency", currency }).format(minor / 100);
}

function groupByDay(orders: OrderRow[]) {
  const grouped = new Map<string, { date: Date; orders: OrderRow[] }>();
  for (const order of orders) {
    const date = new Date(order.createdAt);
    const key = date.toLocaleDateString("sv-SE");
    const group = grouped.get(key) ?? { date, orders: [] };
    group.orders.push(order);
    grouped.set(key, group);
  }
  return [...grouped.entries()].sort(([first], [second]) => second.localeCompare(first)).map(([key, group]) => ({ key, ...group }));
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const international = digits.startsWith("0") && digits.length === 10 ? `212${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
}

function StatusPicker({
  orderId,
  status,
  pending,
  onChange,
}: {
  orderId: string;
  status: OrderStatus;
  pending: boolean;
  onChange: (orderId: string, status: OrderStatus, nextStatus: string) => void;
}) {
  const options = [status, ...nextStatuses[status]];
  return (
    <label className="Ika-orders-status-control">
      <select aria-label={`Statut de la commande ${orderId}`} disabled={pending || options.length === 1} value={status} onChange={(event) => onChange(orderId, status, event.target.value)}>
        {options.map((option) => <option value={option} key={option}>{statusLabels[option]}</option>)}
      </select>
    </label>
  );
}

function OrderActions({ order, onDetails }: { order: OrderRow; onDetails: () => void }) {
  return (
    <div className="Ika-orders-actions">
      <a href={`tel:${order.customerPhone}`} aria-label={`Appeler ${order.customerName}`} title="Appeler le client"><i className="fas fa-phone" aria-hidden="true" /></a>
      <a href={whatsappHref(order.customerPhone)} aria-label={`Écrire à ${order.customerName} sur WhatsApp`} title="Écrire sur WhatsApp" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp" aria-hidden="true" /></a>
      <button type="button" onClick={onDetails}><i className="far fa-eye" aria-hidden="true" /><span>Détails</span></button>
    </div>
  );
}

function InlineAssignmentControl({ order, deliveryPeople, onAssign }: {
  order: OrderRow;
  deliveryPeople: DeliveryPersonOption[];
  onAssign: (orderId: string, deliveryPersonId: string) => Promise<{ success: boolean; message: string }>;
}) {
  const assignedPersonId = order.assignment?.deliveryPerson.id ?? "";
  const [deliveryPersonId, setDeliveryPersonId] = useState(assignedPersonId);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const assignable = canAssignOrder(order.status);

  useEffect(() => setDeliveryPersonId(assignedPersonId), [assignedPersonId]);

  const assign = async () => {
    if (!assignable || !deliveryPersonId || deliveryPersonId === assignedPersonId) return;
    setPending(true);
    setError("");
    try {
      const result = await onAssign(order.id, deliveryPersonId);
      if (!result.success) setError(result.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="Ika-orders-inline-assignment">
      <label>
        <select aria-label={`Livreur pour ${order.reference}`} value={deliveryPersonId} disabled={pending || !deliveryPeople.length} onChange={(event) => setDeliveryPersonId(event.target.value)}>
          <option value="">Choisir un livreur</option>
          {deliveryPeople.map((person) => <option value={person.id} key={person.id}>{person.name}</option>)}
        </select>
      </label>
      <button type="button" disabled={!assignable || !deliveryPersonId || deliveryPersonId === assignedPersonId || pending} onClick={() => void assign()}>
        <i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-user-plus"}`} aria-hidden="true" />
        <span>{pending ? "Attribution…" : assignedPersonId ? "Réassigner" : "Assigner"}</span>
      </button>
      {!deliveryPeople.length && <p>Aucun livreur actif.</p>}
      {error && <p className="Ika-orders-error" role="alert">{error}</p>}
    </div>
  );
}

function OrderDrawer({ order, loading, error, assignmentError, canManage, canAssign, deliveryPeople, selectedDeliveryPersonId, assignmentPending, pending, onClose, onSelectedDeliveryPersonChange, onAssign, onStatusChange }: {
  order: OrderDetail | null;
  loading: boolean;
  error: string;
  assignmentError: string;
  canManage: boolean;
  canAssign: boolean;
  deliveryPeople: DeliveryPersonOption[];
  selectedDeliveryPersonId: string;
  assignmentPending: boolean;
  pending: boolean;
  onClose: () => void;
  onSelectedDeliveryPersonChange: (deliveryPersonId: string) => void;
  onAssign: () => void;
  onStatusChange: (orderId: string, status: OrderStatus, nextStatus: string) => void;
}) {
  return (
    <div className="Ika-orders-drawer-layer">
      <button type="button" className="Ika-orders-drawer-scrim" aria-label="Fermer les détails de la commande" onClick={onClose} />
      <aside className="Ika-orders-drawer" role="dialog" aria-modal="true" aria-labelledby="Ika-orders-drawer-title">
        <header className="Ika-orders-drawer-header">
          <div><span>DÉTAILS DE LA COMMANDE</span><h2 id="Ika-orders-drawer-title">{order?.reference ?? "Commande"}</h2></div>
          <button type="button" aria-label="Fermer" onClick={onClose}><i className="fas fa-times" aria-hidden="true" /></button>
        </header>
        {loading ? <div className="Ika-orders-drawer-state" aria-live="polite">Chargement des détails…</div>
          : error ? <p className="Ika-orders-error" role="alert">{error}</p>
            : order && <>
              <div className="Ika-orders-drawer-content">
                <section className="Ika-orders-detail-status">
                  <span className={`Ika-orders-status-pill ${statusClass(order.status)}`}>{statusLabels[order.status]}</span>
                  <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleString("fr-MA", { dateStyle: "full", timeStyle: "short" })}</time>
                </section>
                <section className="Ika-orders-detail-section">
                  <h3>Client</h3>
                  <strong className="Ika-orders-customer-name">{order.customerName}</strong>
                  <span className="Ika-orders-customer-phone">{order.customerPhone}</span>
                  <div className="Ika-orders-contact-actions">
                    <a href={`tel:${order.customerPhone}`}><i className="fas fa-phone" aria-hidden="true" /> Appeler</a>
                    <a href={whatsappHref(order.customerPhone)} target="_blank" rel="noreferrer"><i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp</a>
                  </div>
                </section>
                <section className="Ika-orders-detail-section">
                  <h3>Livraison</h3>
                  <dl className="Ika-orders-detail-list">
                    <div><dt>Zone</dt><dd>{order.locationName}</dd></div>
                    <div><dt>Adresse</dt><dd>{order.address || "—"}</dd></div>
                    <div><dt>Livreur</dt><dd>{order.deliveryPerson?.name ?? "Non assigné"}</dd></div>
                    {order.deliveryNotes && <div><dt>Instructions</dt><dd>{order.deliveryNotes}</dd></div>}
                    {order.cancellationReason && <div><dt>Motif d'annulation</dt><dd>{order.cancellationReason}</dd></div>}
                  </dl>
                </section>
                {canAssign && <section className="Ika-orders-detail-section Ika-orders-assignment-section">
                  <h3>Attribution du livreur</h3>
                  {assignmentError && <p className="Ika-orders-error" role="alert">{assignmentError}</p>}
                  {deliveryPeople.length ? <>
                    <label htmlFor="Ika-orders-delivery-person">Livreur disponible</label>
                    <select id="Ika-orders-delivery-person" value={selectedDeliveryPersonId} disabled={assignmentPending} onChange={(event) => onSelectedDeliveryPersonChange(event.target.value)}>
                      <option value="">Choisir un livreur</option>
                      {deliveryPeople.map((person) => <option value={person.id} key={person.id}>{person.name} · {person.phone}</option>)}
                    </select>
                    <button className="Ika-orders-assign-button" type="button" disabled={!canAssignOrder(order.status) || !selectedDeliveryPersonId || selectedDeliveryPersonId === order.deliveryPerson?.id || assignmentPending} onClick={onAssign}>
                      <i className={`fas ${assignmentPending ? "fa-spinner fa-spin" : "fa-user-plus"}`} aria-hidden="true" />
                      {assignmentPending ? "Attribution…" : order.deliveryPerson ? "Réassigner la commande" : "Assigner la commande"}
                    </button>
                    {!canAssignOrder(order.status) && <p className="Ika-orders-assignment-hint">Passez la commande à « Prête à livrer » avant de l’attribuer.</p>}
                  </> : <p>Aucun livreur actif n'est disponible.</p>}
                </section>}
                <section className="Ika-orders-detail-section">
                  <h3>Articles</h3>
                  <ul className="Ika-orders-detail-items">
                    {order.items.map((item, index) => <li key={`${item.name}-${index}`}><div><strong>{item.name}</strong><span>{item.quantity} × {formatMoney(item.unitPriceMinor, order.currency)}</span></div><b>{formatMoney(item.lineTotalMinor, order.currency)}</b></li>)}
                  </ul>
                  <dl className="Ika-orders-detail-totals">
                    <div><dt>Sous-total</dt><dd>{formatMoney(order.subtotalMinor, order.currency)}</dd></div>
                    {order.discountMinor > 0 && <div><dt>Remise</dt><dd>−{formatMoney(order.discountMinor, order.currency)}</dd></div>}
                    <div><dt>Livraison</dt><dd>{formatMoney(order.deliveryFeeMinor, order.currency)}</dd></div>
                    <div className="is-total"><dt>Total</dt><dd>{formatMoney(order.totalMinor, order.currency)}</dd></div>
                  </dl>
                </section>
                <section className="Ika-orders-detail-section">
                  <h3>Historique</h3>
                  <ol className="Ika-orders-history">
                    {order.history.map((entry, index) => <li key={`${entry.status}-${entry.createdAt}`}>
                      <span className="Ika-orders-history-dot" />
                      <div><strong>{statusLabels[entry.status]}</strong><time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString("fr-MA", { dateStyle: "medium", timeStyle: "short" })}</time>{entry.note && <p>{entry.note}</p>}</div>
                    </li>)}
                  </ol>
                </section>
              </div>
              {canManage && <footer className="Ika-orders-drawer-footer"><StatusPicker orderId={order.id} status={order.status} pending={pending} onChange={onStatusChange} /></footer>}
            </>}
      </aside>
    </div>
  );
}

function ordersHref(view: OrderView, status: string, from: string, to: string, query: string) {
  const params = new URLSearchParams({ view });
  if (status) params.set("status", status);
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (query) params.set("q", query);
  return `/admin/orders?${params.toString()}`;
}

export default function OrderManager({ orders, canManage, canAssign, deliveryPeople, view, status, from, to, query }: {
  orders: OrderRow[];
  canManage: boolean;
  canAssign: boolean;
  deliveryPeople: DeliveryPersonOption[];
  view: OrderView;
  status: string;
  from: string;
  to: string;
  query: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [rows, setRows] = useState(orders);
  const [searchValue, setSearchValue] = useState(query);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [selectedDeliveryPersonId, setSelectedDeliveryPersonId] = useState("");
  const [assignmentPending, setAssignmentPending] = useState(false);
  const [assignmentError, setAssignmentError] = useState("");
  const [error, setError] = useState("");
  const groupedOrders = groupByDay(rows);

  useEffect(() => setRows(orders), [orders]);
  useEffect(() => setSearchValue(query), [query]);
  useEffect(() => {
    if (!selectedOrderId) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedOrderId(null);
        setSelectedOrder(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedOrderId]);

  const openDetails = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setSelectedOrder(null);
    setSelectedDeliveryPersonId("");
    setAssignmentError("");
    setDetailError("");
    setDetailLoading(true);
    try {
      const details = await getAdminOrderDetailAction(orderId);
      if (!details) setDetailError("La commande est introuvable.");
      else {
        setSelectedOrder(details);
        setSelectedDeliveryPersonId(details.deliveryPerson?.id ?? "");
      }
    } catch (loadError) {
      setDetailError(loadError instanceof Error ? loadError.message : "Impossible de charger la commande.");
    } finally {
      setDetailLoading(false);
    }
  };

  const assignSelectedOrder = async () => {
    if (!selectedOrder || !selectedDeliveryPersonId) return;
    setAssignmentPending(true);
    setAssignmentError("");
    try {
      const result = await performAssignment(selectedOrder.id, selectedDeliveryPersonId);
      if (!result.success) {
        setAssignmentError(result.message);
      }
    } finally {
      setAssignmentPending(false);
    }
  };

  const performAssignment = async (orderId: string, deliveryPersonId: string) => {
    const deliveryPerson = deliveryPeople.find((person) => person.id === deliveryPersonId);
    if (!deliveryPerson) return { success: false, message: "Choisissez un livreur actif." };
    const result = await assignDeliveryOrders({ orderIds: [orderId], deliveryPersonId });
    if (!result.success) return result;

    const assignedAt = new Date().toISOString();
    setRows((current) => current.map((order) => order.id === orderId
      ? { ...order, status: "ASSIGNED", assignment: { deliveryPerson: { id: deliveryPerson.id, name: deliveryPerson.name } } }
      : order));
    setSelectedOrder((current) => current?.id === orderId ? {
      ...current,
      status: "ASSIGNED",
      deliveryPerson: { id: deliveryPerson.id, name: deliveryPerson.name, phone: deliveryPerson.phone },
      history: [{ status: "ASSIGNED", previous: current.status, note: null, createdAt: assignedAt, changedBy: "Vous" }, ...current.history],
    } : current);
    router.refresh();
    return result;
  };

  const changeStatus = async (orderId: string, currentStatus: OrderStatus, value: string) => {
    const nextStatus = value as OrderStatus;
    if (nextStatus === currentStatus) return;
    const note = nextStatus === "CANCELLED" ? window.prompt("Reason for cancellation:")?.trim() : undefined;
    if (nextStatus === "CANCELLED" && !note) return;
    setPendingId(orderId);
    setError("");
    try {
      const result = await updateOrderStatus(orderId, nextStatus, note);
      if (!result.success) setError(result.message);
      else {
        setRows((current) => current.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order));
        setSelectedOrder((current) => current?.id === orderId ? {
          ...current,
          status: nextStatus,
          history: [{ status: nextStatus, previous: current.status, note: note ?? null, createdAt: new Date().toISOString(), changedBy: "Vous" }, ...current.history],
        } : current);
        router.refresh();
      }
    } finally { setPendingId(null); }
  };

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams({ view });
    const nextStatus = String(formData.get("status") ?? "");
    const nextFrom = String(formData.get("from") ?? "");
    const nextTo = String(formData.get("to") ?? "");
    const nextQuery = String(formData.get("q") ?? "").trim();
    if (nextStatus) params.set("status", nextStatus);
    if (nextFrom) params.set("from", nextFrom);
    if (nextTo) params.set("to", nextTo);
    if (nextQuery) params.set("q", nextQuery);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="Ika-orders-manager">
      <header className="Ika-orders-toolbar">
        <form className="Ika-orders-filters" onSubmit={applyFilters}>
          <label className="Ika-orders-search"><span>Rechercher</span><div><i className="fas fa-search" aria-hidden="true" /><input name="q" type="search" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} placeholder="Référence, client, téléphone" /></div></label>
          <label><span>Statut</span><select name="status" defaultValue={status}><option value="">Tous les statuts</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label><span>Du</span><input type="date" name="from" defaultValue={from} /></label>
          <label><span>Au</span><input type="date" name="to" defaultValue={to} /></label>
          <button type="submit" className="Ika-orders-filter-submit"><i className="fas fa-filter" aria-hidden="true" /><span>Filtrer</span></button>
          {(status || from || to || query) && <button type="button" className="Ika-orders-filter-clear" onClick={() => router.push(ordersHref(view, "", "", "", ""))}>Effacer</button>}
        </form>
        <div className="Ika-orders-view-switch" role="group" aria-label="Disposition des commandes">
          <button type="button" aria-pressed={view === "cards"} className={view === "cards" ? "is-active" : ""} onClick={() => router.push(ordersHref("cards", status, from, to, query))} title="Cartes"><i className="fas fa-th-large" aria-hidden="true" /><span>Cartes</span></button>
          <button type="button" aria-pressed={view === "list"} className={view === "list" ? "is-active" : ""} onClick={() => router.push(ordersHref("list", status, from, to, query))} title="Liste"><i className="fas fa-list" aria-hidden="true" /><span>Liste</span></button>
        </div>
      </header>
      <div className="Ika-orders-results-bar"><strong>{rows.length}</strong><span>{rows.length === 1 ? "commande" : "commandes"}</span>{(from || to) && <span className="Ika-orders-range-label">Période sélectionnée</span>}</div>
      {error && <p className="Ika-orders-error" role="alert">{error}</p>}
      {rows.length === 0 ? <div className="Ika-orders-empty"><i className="fas fa-inbox" aria-hidden="true" /><h2>Aucune commande trouvée</h2><p>Modifiez la période ou les filtres pour afficher des commandes.</p></div> : groupedOrders.map((group) => (
        <section className="Ika-orders-day-group" key={group.key}>
          <header className="Ika-orders-day-heading"><div><span>{group.date.toLocaleDateString("fr-MA", { weekday: "long" })}</span><h2>{group.date.toLocaleDateString("fr-MA", { day: "numeric", month: "long", year: "numeric" })}</h2></div><span className="Ika-orders-day-count">{group.orders.length} {group.orders.length === 1 ? "commande" : "commandes"}</span></header>
          {view === "cards" ? <div className="Ika-orders-card-grid">{group.orders.map((order) => (
            <article className="Ika-order-card" key={order.id}>
              <header><span>{order.reference}</span><time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" })}</time></header>
              <button type="button" className="Ika-order-card-customer" onClick={() => void openDetails(order.id)}><strong>{order.customerName}</strong><span>{order.customerPhone}</span></button>
              <div className="Ika-order-card-meta"><span><i className="fas fa-map-marker-alt" aria-hidden="true" />{order.locationNameSnapshot}</span><strong>{formatMoney(order.totalMinor, order.currency)}</strong></div>
              <div className="Ika-order-card-footer"><span className={`Ika-orders-status-pill ${statusClass(order.status)}`}>{statusLabels[order.status]}</span>{order.assignment && <span className="Ika-order-assignee"><i className="fas fa-motorcycle" aria-hidden="true" />{order.assignment.deliveryPerson.name}</span>}</div>
              {canManage && <StatusPicker orderId={order.id} status={order.status} pending={pendingId === order.id} onChange={(id, current, next) => void changeStatus(id, current, next)} />}
              {canAssign && <InlineAssignmentControl order={order} deliveryPeople={deliveryPeople} onAssign={performAssignment} />}
              <OrderActions order={order} onDetails={() => void openDetails(order.id)} />
            </article>
          ))}</div> : (
            <div className="Ika-admin-table-scroll Ika-orders-list-scroll"><table className="Ika-admin-table Ika-orders-list"><thead><tr><th>Commande</th><th>Client</th><th>Zone</th><th>Total</th><th>Livreur</th><th>Statut</th><th aria-label="Actions" /></tr></thead><tbody>
              {group.orders.map((order) => <tr key={order.id}>
                <td><button className="Ika-orders-reference-button" type="button" onClick={() => void openDetails(order.id)}>{order.reference}<time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" })}</time></button></td>
                <td><strong>{order.customerName}</strong><a className="Ika-orders-phone-link" href={`tel:${order.customerPhone}`}>{order.customerPhone}</a></td>
                <td>{order.locationNameSnapshot}</td><td><strong>{formatMoney(order.totalMinor, order.currency)}</strong></td><td>{canAssign ? <InlineAssignmentControl order={order} deliveryPeople={deliveryPeople} onAssign={performAssignment} /> : order.assignment?.deliveryPerson.name ?? "Non assigné"}</td>
                <td>{canManage ? <StatusPicker orderId={order.id} status={order.status} pending={pendingId === order.id} onChange={(id, current, next) => void changeStatus(id, current, next)} /> : <span className={`Ika-orders-status-pill ${statusClass(order.status)}`}>{statusLabels[order.status]}</span>}</td>
                <td><OrderActions order={order} onDetails={() => void openDetails(order.id)} /></td>
              </tr>)}
            </tbody></table></div>
          )}
        </section>
      ))}
      {selectedOrderId && <OrderDrawer order={selectedOrder} loading={detailLoading} error={detailError} assignmentError={assignmentError} canManage={canManage} canAssign={canAssign} deliveryPeople={deliveryPeople} selectedDeliveryPersonId={selectedDeliveryPersonId} assignmentPending={assignmentPending} pending={pendingId === selectedOrderId} onClose={() => { setSelectedOrderId(null); setSelectedOrder(null); }} onSelectedDeliveryPersonChange={setSelectedDeliveryPersonId} onAssign={() => void assignSelectedOrder()} onStatusChange={(id, current, next) => void changeStatus(id, current, next)} />}
    </section>
  );
}
