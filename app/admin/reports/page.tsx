import { AdminPageHeading } from "../../../components/admin/AdminShell";
import DailyOrdersPrintButton from "../../../components/admin/DailyOrdersPrintButton";
import { getOrderReportSummary } from "../../../features/orders/queries";
import "../../../components/admin/AdminReports.css";

const formatMoney = (minor: number) => new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(minor / 100);
const formatNumber = (value: number) => new Intl.NumberFormat("fr-MA").format(value);

const statusLabels = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  PREPARING: "En préparation",
  READY_FOR_DELIVERY: "Prête à livrer",
  ASSIGNED: "Livreur assigné",
  OUT_FOR_DELIVERY: "En livraison",
  DELIVERED: "Livrée",
  DELIVERY_FAILED: "Livraison à vérifier",
  CANCELLED: "Annulée",
} as const;

export default async function AdminReportsPage() {
  const stats = await getOrderReportSummary();
  const maxDailyOrders = Math.max(...stats.days.map((day) => day.orderCount), 1);
  const todayLabel = new Intl.DateTimeFormat("fr-MA", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  const statusCounts = new Map(stats.statusCounts.map(({ status, count }) => [status, count]));

  return (
    <div className="Ika-reports">
      <AdminPageHeading title="Statistiques" description="Suivez les commandes, les livraisons, le chiffre d'affaires et l'activité de la boutique." />
      <div className="Ika-reports-date"><i className="far fa-calendar-alt" aria-hidden="true" />{todayLabel}</div>

      <section className="Ika-reports-section" aria-labelledby="Ika-reports-orders-title">
        <div className="Ika-reports-section-heading">
          <div><span>ACTIVITÉ PRIORITAIRE</span><h2 id="Ika-reports-orders-title">Commandes</h2></div>
          <a href="/admin/orders">Ouvrir les commandes <i className="fas fa-arrow-right" aria-hidden="true" /></a>
        </div>
        <div className="Ika-reports-kpis">
          <article className="Ika-reports-kpi is-accent"><span>Commandes aujourd'hui</span><strong>{formatNumber(stats.todayOrders)}</strong><small>{formatNumber(stats.totalOrders)} au total</small></article>
          <article className="Ika-reports-kpi"><span>Envoyées aujourd'hui</span><strong>{formatNumber(stats.todaySentOrders)}</strong><small>Passées en livraison</small></article>
          <article className="Ika-reports-kpi"><span>À traiter</span><strong>{formatNumber(stats.pendingOrders)}</strong><small>En attente de confirmation</small></article>
          <article className="Ika-reports-kpi"><span>En livraison</span><strong>{formatNumber(stats.deliveringOrders)}</strong><small>Assignées ou en cours</small></article>
          <article className="Ika-reports-kpi is-revenue"><span>Ventes livrées</span><strong>{formatMoney(stats.deliveredRevenueMinor)}</strong><small>{formatNumber(stats.deliveredOrders)} commandes livrées</small></article>
        </div>
      </section>

      <section className="Ika-reports-section" aria-labelledby="Ika-reports-daily-title">
        <div className="Ika-reports-section-heading">
          <div><span>RAPPORT JOURNALIER</span><h2 id="Ika-reports-daily-title">Les 14 derniers jours</h2></div>
          <p>Valeurs calculées à partir des commandes enregistrées.</p>
        </div>
        <div className="Ika-reports-daily-chart" aria-label="Commandes créées sur les 14 derniers jours">
          {stats.days.map((day) => <div className="Ika-reports-day-bar" key={day.date.toISOString()} title={`${day.date.toLocaleDateString("fr-MA")}: ${formatNumber(day.orderCount)} commandes`}><span>{day.orderCount > 0 ? day.orderCount : ""}</span><i style={{ height: `${Math.max((day.orderCount / maxDailyOrders) * 100, day.orderCount ? 7 : 2)}%` }} /><small>{day.date.toLocaleDateString("fr-MA", { day: "2-digit", month: "short" })}</small></div>)}
        </div>
        <div className="Ika-admin-table-scroll Ika-reports-table-scroll">
          <table className="Ika-admin-table Ika-reports-table">
            <thead><tr><th>Jour</th><th>Commandes créées</th><th>Envoyées</th><th>Livrées</th><th>Valeur commandée</th><th>Valeur envoyée</th><th>Ventes livrées</th><th>Rapport</th></tr></thead>
            <tbody>{[...stats.days].reverse().map((day) => <tr key={day.date.toISOString()}>
              <td><strong>{day.date.toLocaleDateString("fr-MA", { weekday: "short", day: "numeric", month: "short" })}</strong></td>
              <td>{formatNumber(day.orderCount)}</td><td>{formatNumber(day.sentOrders)}</td><td>{formatNumber(day.deliveredOrders)}</td>
              <td>{formatMoney(day.orderValueMinor)}</td><td>{formatMoney(day.sentValueMinor)}</td><td>{formatMoney(day.deliveredValueMinor)}</td>
              <td><DailyOrdersPrintButton date={day.date} report={day} /></td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="Ika-reports-note">« Envoyées » compte les commandes passées au statut « En livraison ». La valeur commandée suit la date de création ; les ventes livrées suivent la date de livraison.</p>
      </section>

      <div className="Ika-reports-lower">
        <section className="Ika-reports-section" aria-labelledby="Ika-reports-status-title">
          <div className="Ika-reports-section-heading"><div><span>SUIVI</span><h2 id="Ika-reports-status-title">État des commandes</h2></div></div>
          <ul className="Ika-reports-status-list">
            {(Object.entries(statusLabels) as [keyof typeof statusLabels, string][]).map(([status, label]) => <li key={status}><span><i className={`is-${status.toLowerCase().replaceAll("_", "-")}`} />{label}</span><strong>{formatNumber(statusCounts.get(status) ?? 0)}</strong></li>)}
          </ul>
        </section>
        <section className="Ika-reports-section" aria-labelledby="Ika-reports-site-title">
          <div className="Ika-reports-section-heading"><div><span>VUE D'ENSEMBLE</span><h2 id="Ika-reports-site-title">Activité du site</h2></div></div>
          <dl className="Ika-reports-site-stats">
            <div><dt>Clients inscrits</dt><dd>{formatNumber(stats.customers)}</dd></div>
            <div><dt>Produits disponibles</dt><dd>{formatNumber(stats.products)}</dd></div>
            <div><dt>Catégories actives</dt><dd>{formatNumber(stats.categories)}</dd></div>
            <div><dt>Zones de livraison actives</dt><dd>{formatNumber(stats.locations)}</dd></div>
          </dl>
        </section>
      </div>
    </div>
  );
}