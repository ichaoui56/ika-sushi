"use client";

import { useStore } from "../../../store/StoreProvider";
import Link from "next/link";

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CartPageSection() {
  const { cart, ready, removeFromCart, setCartQuantity } = useStore();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!ready) {
    return (
      <div className="cart-page default-padding foodu-cart-page">
        <div className="container" aria-live="polite">Loading your cart…</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page default-padding foodu-cart-page">
        <div className="container">
          <div className="foodu-empty-state foodu-cart-empty">
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <h2>Your cart is waiting for something delicious</h2>
            <p>Explore the menu and add your favorites here.</p>
            <Link className="foodu-cart-checkout" href="/shop">
              Explore the shop <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page default-padding foodu-cart-page">
      <div className="container">
        <div className="foodu-cart-heading">
          <div>
            <span className="foodu-cart-eyebrow">YOUR ORDER</span>
            <h2>Items in your basket</h2>
          </div>
          <span className="foodu-cart-count">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="foodu-cart-layout">
          <section className="foodu-cart-items" aria-label="Cart items">
            {cart.map((item) => (
              <article className="foodu-cart-item" key={item.id}>
                <Link className="foodu-cart-item-image" href="/shop-single" aria-label={`View ${item.name}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <div className="foodu-cart-item-info">
                  <span>IKA SUSHI</span>
                  <h3><Link href="/shop-single">{item.name}</Link></h3>
                  <p>{formatPrice(item.price)} each</p>
                </div>
                <div className="foodu-cart-quantity-block">
                  <span>Quantity</span>
                  <div
                    className="foodu-cart-quantity-stepper"
                    role="group"
                    aria-label={`Quantity for ${item.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        void setCartQuantity(item.id, item.quantity - 1).catch(() => undefined)
                      }
                    >
                      <i className="fas fa-minus" aria-hidden="true" />
                    </button>
                    <output aria-live="polite">{item.quantity}</output>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.name}`}
                      onClick={() =>
                        void setCartQuantity(item.id, item.quantity + 1).catch(() => undefined)
                      }
                    >
                      <i className="fas fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="foodu-cart-item-total">
                  <span>Item total</span>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                  <button
                    className="foodu-cart-remove"
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    title={`Remove ${item.name} from cart`}
                    onClick={() => void removeFromCart(item.id).catch(() => undefined)}
                  >
                    <i className="fas fa-trash-alt" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                </div>
              </article>
            ))}
            <Link className="foodu-cart-continue" href="/shop">
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Continue shopping
            </Link>
          </section>

          <aside className="foodu-cart-summary" aria-labelledby="foodu-cart-summary-title">
            <span className="foodu-cart-eyebrow">ORDER SUMMARY</span>
            <h2 id="foodu-cart-summary-title">Cart totals</h2>
            <div className="foodu-cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="foodu-cart-summary-row foodu-cart-shipping">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="foodu-cart-summary-row foodu-cart-grand-total">
              <strong>Total</strong>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="foodu-cart-summary-note">Taxes and delivery are confirmed at checkout.</p>
            <Link className="foodu-cart-checkout" href="/checkout">
              Continue to checkout <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
            <span className="foodu-cart-secure-note">
              <i className="fas fa-lock" aria-hidden="true" /> Secure checkout
            </span>
          </aside>
        </div>
      </div>
    </div>
  );
}
