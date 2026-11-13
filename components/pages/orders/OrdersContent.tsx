import Link from "next/link";
import { getMyOrders } from "../../../features/orders/queries";

const formatPrice = (minor: number, currency: string) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(minor / 100);

export default async function OrdersContent() {
  const orders = await getMyOrders();

  return (
    <section className="Ika-orders-content" aria-labelledby="Ika-orders-heading">
      <header className="Ika-orders-content-heading">
        <div>
          <span>ORDER HISTORY</span>
          <h2 id="Ika-orders-heading">Recent orders</h2>
        </div>
        {orders !== null && <p><strong>{orders.length}</strong><span>{orders.length === 1 ? "order" : "orders"}</span></p>}
      </header>

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
              <header className="Ika-order-history-head">
                <div><strong>{order.reference}</strong><time dateTime={order.createdAt.toISOString()}>{order.createdAt.toLocaleDateString()}</time></div>
                <span className={`Ika-order-status is-${order.status.toLowerCase().replaceAll("_", "-")}`}>{order.status.replaceAll("_", " ")}</span>
              </header>
              <p className="Ika-order-history-location"><i className="fas fa-map-marker-alt" aria-hidden="true" /><span>Delivery area</span><strong>{order.locationNameSnapshot}</strong></p>
              <ul>{order.items.map((item, index) => <li key={`${order.reference}-${index}`}><span>{item.quantity} × {item.productName}</span><strong>{formatPrice(item.lineTotalMinor, order.currency)}</strong></li>)}</ul>
              <footer><span>{order.items.length} {order.items.length === 1 ? "item" : "items"}</span><span>Order total</span><strong>{formatPrice(order.totalMinor, order.currency)}</strong></footer>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
