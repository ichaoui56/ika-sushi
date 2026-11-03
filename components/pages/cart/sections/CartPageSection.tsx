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
          <div className="foodu-empty-state">
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <h2>Your cart is waiting for something delicious</h2>
            <p>Explore the menu and add your favorites here.</p>
            <Link className="btn btn-theme" href="/shop">Explore the shop</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page default-padding overflow-hidden foodu-cart-page">
      <div className="container">
        <div className="shop-cart-info">
          <div className="table-responsive">
            <table className="shop-cart-table">
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Thumbnail</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="product-remove">
                      <button
                        className="foodu-cart-remove"
                        type="button"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => void removeFromCart(item.id).catch(() => undefined)}
                      >
                        <i className="fas fa-times" aria-hidden="true" />
                      </button>
                    </td>
                    <td className="product-thumbnail">
                      <img className="foodu-cart-row-image" src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td className="product-price">{formatPrice(item.price)}</td>
                    <td className="product-quantity">
                      <input
                        className="foodu-cart-quantity"
                        type="number"
                        min="1"
                        step="1"
                        value={item.quantity}
                        aria-label={`Quantity for ${item.name}`}
                        onChange={(event) =>
                          void setCartQuantity(
                            item.id,
                            Number.parseInt(event.target.value, 10) || 1,
                          ).catch(() => undefined)
                        }
                      />
                    </td>
                    <td className="product-subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="shop-cart-totals mt-50">
          <h2>Cart totals</h2>
          <div className="table-responsive table-bordered">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Subtotal</th>
                  <td>{formatPrice(subtotal)}</td>
                </tr>
                <tr>
                  <th scope="row">Shipping</th>
                  <td>Calculated at checkout</td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td>{formatPrice(subtotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link className="btn btn-theme mt-20" href="/checkout">Continue to checkout</Link>
        </div>
      </div>
    </div>
  );
}
