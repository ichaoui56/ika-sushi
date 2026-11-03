"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { translate } from "../i18n/translations";
import { useStore } from "./StoreProvider";

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
    const handleCartAddition = (event: Event) => {
      const detail = (event as CustomEvent<{ action?: string }>).detail;
      if (detail?.action === "cart") setIsOpen(true);
    };
    window.addEventListener("foodu:open-cart-drawer", openDrawer);
    window.addEventListener("foodu:store-feedback", handleCartAddition);
    return () => {
      window.removeEventListener("foodu:open-cart-drawer", openDrawer);
      window.removeEventListener("foodu:store-feedback", handleCartAddition);
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
    <div className="foodu-cart-drawer-layer">
      <button
        className="foodu-cart-drawer-scrim"
        type="button"
        aria-label={translate("Close cart panel", locale)}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className="foodu-cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="foodu-cart-drawer-title"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="foodu-cart-drawer-header">
          <div>
            <span className="foodu-cart-drawer-eyebrow">
              {translate("Your selection", locale)}
            </span>
            <h2 id="foodu-cart-drawer-title">{translate("Your Cart", locale)}</h2>
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
            className="foodu-cart-drawer-close"
            type="button"
            aria-label={translate("Close cart panel", locale)}
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        </div>

        <div className="foodu-cart-drawer-items">
          {cart.length === 0 ? (
            <p className="foodu-cart-drawer-empty">
              {translate("Your cart is empty", locale)}
            </p>
          ) : cart.map((item) => (
            <article className="foodu-cart-drawer-item" key={item.id}>
              <img src={item.image} alt={translate(item.name, locale)} />
              <div className="foodu-cart-drawer-item-info">
                <h3>{translate(item.name, locale)}</h3>
                <div className="foodu-cart-drawer-item-meta">
                  <div
                    className="foodu-cart-quantity-control"
                    role="group"
                    aria-label={`${translate("Quantity", locale)}: ${item.quantity}`}
                  >
                    <button
                      type="button"
                      aria-label={`${translate("Decrease quantity", locale)} ${translate(item.name, locale)}`}
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
                      aria-label={`${translate("Increase quantity", locale)} ${translate(item.name, locale)}`}
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
                className="foodu-cart-drawer-remove"
                type="button"
                aria-label={`${translate("Remove", locale)} ${translate(item.name, locale)}`}
                onClick={() => {
                  void removeFromCart(item.id).catch((error: unknown) => {
                    console.error("Could not remove the item from the cart.", error);
                  });
                }}
              >
                <i className="far fa-trash-alt" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        <div className="foodu-cart-drawer-footer">
          <div className="foodu-cart-drawer-subtotal">
            <span>{translate("Subtotal", locale)}</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <Link
            className="foodu-cart-drawer-action foodu-cart-drawer-view"
            href="/cart"
            onClick={() => setIsOpen(false)}
          >
            {translate("View cart", locale)}
          </Link>
          <Link
            className="foodu-cart-drawer-action foodu-cart-drawer-checkout"
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
