"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { translate } from "../i18n/translations";
import { useStore } from "./StoreProvider";
import { getProductName } from "./product-locale";
import { toLocalImageUrl } from "../../lib/image-url";

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export function CartDrawer() {
  const { cart, removeFromCart, setCartQuantity, cartCount } = useStore();
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const openDrawer = () => setIsOpen(true);
    window.addEventListener("Ika:open-cart-drawer", openDrawer);
    return () => {
      window.removeEventListener("Ika:open-cart-drawer", openDrawer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="Ika-cart-drawer-layer">
      <button
        className="Ika-cart-drawer-scrim"
        type="button"
        aria-label={translate("Close cart panel", locale)}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className="Ika-cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="Ika-cart-drawer-title"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="Ika-cart-drawer-header">
          <div>
            <span className="Ika-cart-drawer-eyebrow">
              {translate("Your selection", locale)}
            </span>
            <h2 id="Ika-cart-drawer-title">{translate("Your Cart", locale)}</h2>
            <p>
              {cartCount}{" "}
              {translate(cartCount === 1 ? "item in your bag" : "items in your bag", locale).replace(
                "{count}",
                String(cartCount),
              )}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            className="Ika-cart-drawer-close"
            type="button"
            aria-label={translate("Close cart panel", locale)}
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="Ika-cart-drawer-items">
          {cart.length === 0 ? (
            <p className="Ika-cart-drawer-empty">
              {translate("Your cart is empty", locale)}
            </p>
          ) : cart.map((item) => {
            const productName = getProductName(item, locale);
            return <article className="Ika-cart-drawer-item" key={item.id}>
              <img src={toLocalImageUrl(item.image)} alt={productName} />
              <div className="Ika-cart-drawer-item-info">
                <h3>{productName}</h3>
                <div className="Ika-cart-drawer-item-meta">
                  <div
                    className="Ika-cart-quantity-control"
                    role="group"
                    aria-label={`${translate("Quantity", locale)}: ${item.quantity}`}
                  >
                    <button
                      type="button"
                      aria-label={`${translate("Decrease quantity", locale)} ${productName}`}
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        void setCartQuantity(item.id, item.quantity - 1).catch(
                          (error: unknown) => {
                            console.error("Could not reduce the cart item quantity.", error);
                          },
                        );
                      }}
                    >
                      <i className="fas fa-minus" aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`${translate("Increase quantity", locale)} ${productName}`}
                      onClick={() => {
                        void setCartQuantity(item.id, item.quantity + 1).catch(
                          (error: unknown) => {
                            console.error("Could not increase the cart item quantity.", error);
                          },
                        );
                      }}
                    >
                      <i className="fas fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              </div>
              <button
                className="Ika-cart-drawer-remove"
                type="button"
                aria-label={`${translate("Remove", locale)} ${productName}`}
                onClick={() => {
                  void removeFromCart(item.id).catch((error: unknown) => {
                    console.error("Could not remove the item from the cart.", error);
                  });
                }}
              >
                <i className="far fa-trash-alt" aria-hidden="true" />
              </button>
            </article>;
          })}
        </div>

        <div className="Ika-cart-drawer-footer">
          <div className="Ika-cart-drawer-subtotal">
            <span>{translate("Subtotal", locale)}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          {/* <Link
            className="Ika-cart-drawer-action Ika-cart-drawer-view"
            href="/cart"
            onClick={() => setIsOpen(false)}
          >
            {translate("View cart", locale)}
          </Link> */}
          <Link
            className="Ika-cart-drawer-action Ika-cart-drawer-checkout"
            href="/checkout"
            onClick={() => setIsOpen(false)}
          >
            {translate("Proceed to Checkout", locale)}
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
