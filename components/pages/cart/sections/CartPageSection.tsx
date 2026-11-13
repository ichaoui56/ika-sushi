"use client";

import { useStore } from "../../../store/StoreProvider";
import { useLocale } from "../../../i18n/LocaleProvider";
import { formatProductPrice, getProductName } from "../../../store/product-locale";
import { toLocalImageUrl } from "../../../../lib/image-url";
import Link from "next/link";

export default function CartPageSection() {
  const { cart, ready, removeFromCart, setCartQuantity } = useStore();
  const { locale } = useLocale();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const currency = cart[0]?.currency ?? "MAD";

  if (!ready) {
    return (
      <div className="cart-page default-padding Ika-cart-page">
        <div className="container" aria-live="polite">Loading your cart…</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page default-padding Ika-cart-page">
        <div className="container">
          <div className="Ika-empty-state Ika-cart-empty">
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <h2>Your cart is waiting for something delicious</h2>
            <p>Explore the menu and add your favorites here.</p>
            <Link className="Ika-cart-checkout" href="/food-menu">
              Explore the shop <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page default-padding Ika-cart-page">
      <div className="container">
        <div className="Ika-cart-heading">
          <div>
            <span className="Ika-cart-eyebrow">YOUR ORDER</span>
            <h2>Items in your basket</h2>
          </div>
          <span className="Ika-cart-count">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="Ika-cart-layout">
          <section className="Ika-cart-items" aria-label="Cart items">
            {cart.map((item) => {
              const productName = getProductName(item, locale);
              return <article className="Ika-cart-item" key={item.id}>
                <Link className="Ika-cart-item-image" href={`/shop-single?product=${encodeURIComponent(item.id)}`} aria-label={`View ${productName}`}>
                  <img src={toLocalImageUrl(item.image)} alt={productName} />
                </Link>
                <div className="Ika-cart-item-info">
                  <span>IKA SUSHI</span>
                  <h3><Link href={`/shop-single?product=${encodeURIComponent(item.id)}`}>{productName}</Link></h3>
                  <p>{formatProductPrice(item.price, item.currency, locale)} each</p>
                </div>
                <div className="Ika-cart-quantity-block">
                  <span>Quantity</span>
                  <div
                    className="Ika-cart-quantity-stepper"
                    role="group"
                    aria-label={`Quantity for ${productName}`}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${productName}`}
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
                      aria-label={`Increase quantity for ${productName}`}
                      onClick={() =>
                        void setCartQuantity(item.id, item.quantity + 1).catch(() => undefined)
                      }
                    >
                      <i className="fas fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="Ika-cart-item-total">
                  <span>Item total</span>
                  <strong>{formatProductPrice(item.price * item.quantity, item.currency, locale)}</strong>
                  <button
                    className="Ika-cart-remove"
                    type="button"
                    aria-label={`Remove ${productName} from cart`}
                    title={`Remove ${productName} from cart`}
                    onClick={() => void removeFromCart(item.id).catch(() => undefined)}
                  >
                    <i className="fas fa-trash-alt" aria-hidden="true" />
                    <span>Remove</span>
                  </button>
                </div>
              </article>;
            })}
            <Link className="Ika-cart-continue" href="/food-menu">
              <i className="fas fa-arrow-left" aria-hidden="true" />
              Continue shopping
            </Link>
          </section>

          <aside className="Ika-cart-summary" aria-labelledby="Ika-cart-summary-title">
            <span className="Ika-cart-eyebrow">ORDER SUMMARY</span>
            <h2 id="Ika-cart-summary-title">Cart totals</h2>
            <div className="Ika-cart-summary-row">
              <span>Subtotal</span>
              <strong>{formatProductPrice(subtotal, currency, locale)}</strong>
            </div>
            <div className="Ika-cart-summary-row Ika-cart-shipping">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="Ika-cart-summary-row Ika-cart-grand-total">
              <strong>Total</strong>
              <strong>{formatProductPrice(subtotal, currency, locale)}</strong>
            </div>
            <p className="Ika-cart-summary-note">Taxes and delivery are confirmed at checkout.</p>
            <Link className="Ika-cart-checkout" href="/checkout">
              Continue to checkout <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
            <span className="Ika-cart-secure-note">
              <i className="fas fa-lock" aria-hidden="true" /> Secure checkout
            </span>
          </aside>
        </div>
      </div>
    </div>
  );
}
