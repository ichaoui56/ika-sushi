import Link from "next/link";
import { getMyOrders } from "../../../features/orders/queries";

const formatPrice = (minor: number, currency: string) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(minor / 100);

export default async function OrdersContent() {
  const orders = await getMyOrders();

  return (
    <section className="Ika-orders-content" aria-labelledby="Ika-orders-heading">
      <div className="Ika-orders-intro">
        <div>
          <span className="Ika-orders-eyebrow">Order history</span>
          <h3 id="Ika-orders-heading">Everything you’ve ordered, in one place</h3>
          <p>Check back here to follow your Ika orders and revisit your favorites.</p>
        </div>
        <i className="fas fa-receipt" aria-hidden="true" />
      </div>

      {orders === null ? (
        <div className="Ika-empty-state Ika-orders-empty">
          <span className="Ika-orders-empty-icon"><i className="fas fa-user-lock" aria-hidden="true" /></span>
          <h2>Sign in to view your orders</h2>
          <p>Customer order history is only visible to the signed-in account.</p>
          <Link className="btn btn-theme" href="/login">Sign in</Link>
        </div>
      ) : orders.length === 0 ? (
        <div className="Ika-empty-state Ika-orders-empty">
          <span className="Ika-orders-empty-icon"><i className="fas fa-box-open" aria-hidden="true" /></span>
          <h2>No orders yet</h2>
          <p>Your orders will appear here after you place one.</p>
          <Link className="btn btn-theme" href="/food-menu">Explore the menu</Link>
        </div>
      ) : (
        <div className="Ika-order-history-list">
          {orders.map((order) => (
            <article className="Ika-order-history-item" key={order.reference}>
              <header><div><span>{order.reference}</span><time dateTime={order.createdAt.toISOString()}>{order.createdAt.toLocaleDateString()}</time></div><strong>{order.status.replaceAll("_", " ")}</strong></header>
              <p>{order.locationNameSnapshot}</p>
              <ul>{order.items.map((item, index) => <li key={`${order.reference}-${index}`}>{item.quantity} × {item.productName} <span>{formatPrice(item.lineTotalMinor, order.currency)}</span></li>)}</ul>
              <footer><span>{order.items.length} products</span><strong>{formatPrice(order.totalMinor, order.currency)}</strong></footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
