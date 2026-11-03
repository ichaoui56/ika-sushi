import Link from "next/link";

export default function OrdersContent() {
  return (
    <section className="foodu-orders-content" aria-labelledby="foodu-orders-heading">
      <div className="foodu-orders-intro">
        <div>
          <span className="foodu-orders-eyebrow">Order history</span>
          <h3 id="foodu-orders-heading">Everything you’ve ordered, in one place</h3>
          <p>Check back here to follow your Foodu orders and revisit your favorites.</p>
        </div>
        <i className="fas fa-receipt" aria-hidden="true" />
      </div>

      <div className="foodu-empty-state foodu-orders-empty">
        <span className="foodu-orders-empty-icon">
          <i className="fas fa-box-open" aria-hidden="true" />
        </span>
        <h2>No orders yet</h2>
        <p>Your completed orders will show up here. Ready to find something delicious?</p>
        <Link className="btn btn-theme" href="/food-menu">
          Explore the menu
        </Link>
      </div>
    </section>
  );
}
