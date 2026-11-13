import { getDashboardSummary } from "../../../features/dashboard/queries";
import { getCurrentUser } from "../../../lib/auth/session";

const formatMoney = (minor: number) => new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(minor / 100);
const formatNumber = (value: number) => new Intl.NumberFormat("fr-MA").format(value);

export default async function AdminDashboardPage() {
  const [stats, user] = await Promise.all([getDashboardSummary(), getCurrentUser()]);
  const firstName = user?.name.split(/\s+/)[0] ?? "équipe";
  const canManageProducts = user?.role === "ADMIN" || Boolean(user?.permissions.includes("MANAGE_PRODUCTS"));
  const canViewOrders = user?.role === "ADMIN" || Boolean(user?.permissions.includes("VIEW_ORDERS"));
  const todayLabel = new Intl.DateTimeFormat("fr-MA", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  const comparison = stats.previousWeekRevenueMinor > 0
    ? Math.round(((stats.weeklyRevenueMinor - stats.previousWeekRevenueMinor) / stats.previousWeekRevenueMinor) * 100)
    : null;
  const maxRevenue = Math.max(...stats.dailyRevenue.map((day) => day.totalMinor), 1);
  const points = stats.dailyRevenue.map((day, index) => ({
    x: stats.dailyRevenue.length === 1 ? 350 : 30 + index * (640 / (stats.dailyRevenue.length - 1)),
    y: 166 - (day.totalMinor / maxRevenue) * 126,
  }));
  const chartLine = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
  const statusLabels: Record<string, string> = {
    PENDING: "En attente", CONFIRMED: "Confirmée", PREPARING: "En préparation",
    READY_FOR_DELIVERY: "Prête", ASSIGNED: "Assignée", OUT_FOR_DELIVERY: "En livraison",
    DELIVERED: "Livrée", DELIVERY_FAILED: "Échec", CANCELLED: "Annulée",
  };
  const iconForActivity = { order: "fa-shopping-cart", customer: "fa-user", product: "fa-box" };
  const formatRelativeTime = (date: Date) => {
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return `Il y a ${Math.floor(hours / 24)} j`;
  };
  const cards = [
    { label: "Chiffre d'affaires", value: formatMoney(stats.todayRevenueMinor), detail: "Aujourd'hui", icon: "fa-chart-line", tone: "revenue" },
    { label: "Commandes au total", value: formatNumber(stats.totalOrders), detail: `${formatNumber(stats.todayOrders)} aujourd'hui`, icon: "fa-cube", tone: "orders" },
    { label: "Clients", value: formatNumber(stats.customers), detail: "Comptes clients", icon: "fa-users", tone: "customers" },
    { label: "Produits en ligne", value: formatNumber(stats.products), detail: "Disponibles à la vente", icon: "fa-box-open", tone: "products" },
    { label: "Zones actives", value: formatNumber(stats.activeLocations), detail: "Livraison disponible", icon: "fa-store", tone: "locations" },
    { label: "Commandes en attente", value: formatNumber(stats.pendingOrders), detail: "À traiter", icon: "fa-clock", tone: "pending" },
    { label: "Commandes livrées", value: formatNumber(stats.completedOrders), detail: "Depuis l'ouverture", icon: "fa-circle-check", tone: "delivered" },
    { label: "Commandes annulées", value: formatNumber(stats.cancelledOrders), detail: "Depuis l'ouverture", icon: "fa-ban", tone: "cancelled" },
    { label: "Produits en promotion", value: formatNumber(stats.promotionalProducts), detail: "Actifs en boutique", icon: "fa-bolt", tone: "promotions" },
    { label: "Coups de cœur", value: formatNumber(stats.bestSellers), detail: "Mis en avant", icon: "fa-star", tone: "featured" },
  ];

  return (
    <div className="Ika-dashboard">
      <section className="Ika-dashboard-heading">
        <div className="Ika-dashboard-welcome">
          <span className="Ika-dashboard-date"><i className="far fa-calendar-alt" aria-hidden="true" />{todayLabel}</span>
          <h1>Bonjour, {firstName}</h1>
          <p>Voici l'activité de votre boutique aujourd'hui.</p>
        </div>
        {canManageProducts && <a className="Ika-dashboard-add" href="/admin/products"><i className="fas fa-plus" aria-hidden="true" />Ajouter un produit</a>}
      </section>

      <section className="Ika-dashboard-kpis" aria-label="Indicateurs de la boutique">
        {cards.map((card) => (
          <article className={`Ika-dashboard-kpi is-${card.tone}`} key={card.label}>
            <div className="Ika-dashboard-kpi-heading"><span className="Ika-dashboard-kpi-icon"><i className={`fas ${card.icon}`} aria-hidden="true" /></span><span>{card.label}</span></div>
            <strong>{card.value}</strong>
            <small>{card.detail}</small>
            <span className="Ika-dashboard-spark" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </article>
        ))}
      </section>

      <div className="Ika-dashboard-lower">
        <section className="Ika-dashboard-panel Ika-dashboard-sales" aria-labelledby="dashboard-sales-title">
          <div className="Ika-dashboard-panel-heading">
            <div><span className="Ika-dashboard-panel-icon"><i className="fas fa-chart-bar" aria-hidden="true" /></span><div><h2 id="dashboard-sales-title">Aperçu des ventes</h2><p>Chiffre d'affaires des 7 derniers jours</p></div></div>
            <span className="Ika-dashboard-period">7 derniers jours <i className="fas fa-chevron-down" aria-hidden="true" /></span>
          </div>
          <div className="Ika-dashboard-total">{formatMoney(stats.weeklyRevenueMinor)}
            {comparison !== null && <span className={comparison >= 0 ? "is-positive" : "is-negative"}>{comparison >= 0 ? "+" : ""}{comparison}% <small>vs. semaine précédente</small></span>}
          </div>
          <div className="Ika-dashboard-chart" role="img" aria-label={`Chiffre d'affaires par jour : ${stats.dailyRevenue.map((day) => `${day.date.toLocaleDateString("fr-MA", { weekday: "long" })}, ${formatMoney(day.totalMinor)}`).join(" ; ")}`}>
            <div className="Ika-dashboard-y-labels" aria-hidden="true"><span>{formatMoney(maxRevenue)}</span><span>{formatMoney(maxRevenue * 0.66)}</span><span>{formatMoney(maxRevenue * 0.33)}</span><span>0 MAD</span></div>
            <div className="Ika-dashboard-plot">
              <div className="Ika-dashboard-grid-lines" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="Ika-dashboard-bars" aria-hidden="true">
                {stats.dailyRevenue.map((day) => <span key={day.date.toISOString()}><i style={{ height: `${Math.max((day.totalMinor / maxRevenue) * 88, 2)}%` }} /></span>)}
              </div>
              <svg className="Ika-dashboard-line" viewBox="0 0 700 180" preserveAspectRatio="none" aria-hidden="true">
                <path className="Ika-dashboard-line-fill" d={`${chartLine} L670 180 L30 180 Z`} />
                <path className="Ika-dashboard-line-stroke" d={chartLine} />
                {points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="3" />)}
              </svg>
              <div className="Ika-dashboard-x-labels" aria-hidden="true">{stats.dailyRevenue.map((day) => <span key={day.date.toISOString()}>{day.date.toLocaleDateString("fr-MA", { weekday: "short" }).replace(".", "")}</span>)}</div>
            </div>
          </div>
          <div className="Ika-dashboard-legend"><span><i className="is-bar" />Chiffre d'affaires</span><span><i className="is-line" />Évolution journalière</span>{canViewOrders && <a href="/admin/orders">Voir les commandes <i className="fas fa-arrow-right" aria-hidden="true" /></a>}</div>
        </section>

        <section className="Ika-dashboard-panel Ika-dashboard-activity" aria-labelledby="dashboard-activity-title">
          <div className="Ika-dashboard-panel-heading">
            <div><span className="Ika-dashboard-panel-icon is-lightning"><i className="fas fa-bolt" aria-hidden="true" /></span><div><h2 id="dashboard-activity-title">Activités récentes</h2><p>Les dernières nouvelles de la boutique</p></div></div>
            {canViewOrders && <a href="/admin/orders">Tout voir <i className="fas fa-arrow-right" aria-hidden="true" /></a>}
          </div>
          {stats.activity.length ? (
            <ul className="Ika-dashboard-activity-list">
              {stats.activity.map((item) => (
                <li key={item.id}>
                  <span className={`Ika-dashboard-activity-icon is-${item.kind}`}><i className={`fas ${iconForActivity[item.kind]}`} aria-hidden="true" /></span>
                  <div className="Ika-dashboard-activity-copy"><strong>{item.title}</strong><span>{item.kind === "order" && item.status ? `${statusLabels[item.status] ?? item.status} · ` : ""}{item.detail}</span><time dateTime={item.createdAt.toISOString()}>{formatRelativeTime(item.createdAt)}</time></div>
                  {item.kind === "order" && item.status && <span className={`Ika-dashboard-status is-${item.status.toLowerCase().replaceAll("_", "-")}`}>{statusLabels[item.status] ?? item.status}</span>}
                </li>
              ))}
            </ul>
          ) : <p className="Ika-dashboard-empty">Aucune activité récente pour le moment.</p>}
        </section>
      </div>

      <section className="Ika-dashboard-panel Ika-dashboard-delivery-zones" aria-labelledby="dashboard-delivery-zones-title">
        <div className="Ika-dashboard-panel-heading">
          <div><span className="Ika-dashboard-panel-icon"><i className="fas fa-map-marker-alt" aria-hidden="true" /></span><div><h2 id="dashboard-delivery-zones-title">Zones de livraison actives</h2><p>{stats.activeDeliveryZones.length} quartiers disponibles à Casablanca</p></div></div>
          <a href="/admin/locations">Gérer les zones <i className="fas fa-arrow-right" aria-hidden="true" /></a>
        </div>
        {stats.activeDeliveryZones.length ? (
          <div className="Ika-admin-table-scroll">
            <table className="Ika-admin-table">
              <thead><tr><th>Quartier</th><th>Frais de livraison</th><th>Temps estimé</th><th>Disponibilité</th></tr></thead>
              <tbody>{stats.activeDeliveryZones.map((zone) => (
                <tr key={zone.id}>
                  <td>{zone.name}</td>
                  <td>{formatMoney(zone.deliveryFeeMinor)}</td>
                  <td>{zone.estimatedMinutes ? `${zone.estimatedMinutes} min` : "Non défini"}</td>
                  <td><span className="Ika-dashboard-zone-active">Active</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : <p className="Ika-dashboard-empty">Aucune zone de livraison active.</p>}
      </section>
    </div>
  );
}