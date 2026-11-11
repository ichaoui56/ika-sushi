"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useStore } from "../../../store/StoreProvider";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const casablancaAreas = [
  { id: "maarif", name: { en: "Maarif", fr: "Maârif", ar: "المعاريف" }, fee: 3 },
  { id: "gauthier", name: { en: "Gauthier", fr: "Gauthier", ar: "غوتييه" }, fee: 3 },
  { id: "racine", name: { en: "Racine", fr: "Racine", ar: "راسين" }, fee: 3 },
  { id: "bourgogne", name: { en: "Bourgogne", fr: "Bourgogne", ar: "بورغون" }, fee: 3.5 },
  { id: "palmier", name: { en: "Palmier", fr: "Palmier", ar: "بالمير" }, fee: 3 },
  { id: "anfa", name: { en: "Anfa", fr: "Anfa", ar: "أنفا" }, fee: 3.5 },
  { id: "oasis", name: { en: "Oasis", fr: "Oasis", ar: "الواحة" }, fee: 3.5 },
  { id: "cil", name: { en: "CIL", fr: "CIL", ar: "حي سي آي إل" }, fee: 4 },
  { id: "ain-diab", name: { en: "Ain Diab", fr: "Aïn Diab", ar: "عين الذئاب" }, fee: 4.5 },
  { id: "hay-hassani", name: { en: "Hay Hassani", fr: "Hay Hassani", ar: "الحي الحسني" }, fee: 4 },
  { id: "sidi-maarouf", name: { en: "Sidi Maarouf", fr: "Sidi Maârouf", ar: "سيدي معروف" }, fee: 4.5 },
  { id: "californie", name: { en: "Californie", fr: "Californie", ar: "كاليفورنيا" }, fee: 4.5 },
  { id: "ain-sebaa", name: { en: "Ain Sebaa", fr: "Aïn Sebaâ", ar: "عين السبع" }, fee: 4.5 },
  { id: "hay-mohammadi", name: { en: "Hay Mohammadi", fr: "Hay Mohammadi", ar: "الحي المحمدي" }, fee: 4 },
  { id: "sidi-bernoussi", name: { en: "Sidi Bernoussi", fr: "Sidi Bernoussi", ar: "سيدي البرنوصي" }, fee: 5 },
  { id: "bouskoura", name: { en: "Bouskoura", fr: "Bouskoura", ar: "بوسكورة" }, fee: 5.5 },
  { id: "dar-bouazza", name: { en: "Dar Bouazza", fr: "Dar Bouazza", ar: "دار بوعزة" }, fee: 6 },
] as const;

export default function CheckoutAreaSection() {
  const { locale } = useLocale();
  const { cart, ready } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const selectedArea = casablancaAreas.find((area) => area.id === selectedAreaId);
  const deliveryFee = selectedArea?.fee ?? 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderReference(`IKA-${Date.now().toString(36).toUpperCase()}`);
  };

  if (!ready) {
    return (
      <main className="foodu-checkout-page">
        <div className="container" aria-live="polite">{translate("Loading your order...", locale)}</div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="foodu-checkout-page">
        <div className="container">
          <div className="foodu-checkout-empty">
            <span className="foodu-checkout-eyebrow">{translate("Checkout", locale)}</span>
            <h2>{translate("Your cart is empty", locale)}</h2>
            <p>{translate("Add a few favorites before continuing to checkout.", locale)}</p>
            <Link className="foodu-checkout-submit" href="/shop">
              {translate("Explore the menu", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderReference) {
    return (
      <main className="foodu-checkout-page">
        <div className="container">
          <section className="foodu-order-success" aria-labelledby="foodu-order-success-title" aria-live="polite">
            <div className="foodu-order-success-main">
              <span className="foodu-order-success-icon">
                <i className="fas fa-check" aria-hidden="true" />
              </span>
              <span className="foodu-checkout-eyebrow">{translate("ORDER CONFIRMED", locale)}</span>
              <h2 id="foodu-order-success-title">{translate("Thank you,", locale)} {name}!</h2>
              <p className="foodu-order-success-lead">{translate("Your order details are confirmed.", locale)}</p>
              <p className="foodu-order-reference">
                <span>{translate("Order reference", locale)}</span>
                <strong>{orderReference}</strong>
              </p>
              <div className="foodu-order-success-contact">
                <span>{translate("Phone number", locale)}</span>
                <strong>{phone}</strong>
                <span>{translate("Delivery area", locale)}</span>
                <strong>{selectedArea ? selectedArea.name[locale] : ""}</strong>
                <span>{translate("Delivery address", locale)}</span>
                <strong>{address}</strong>
              </div>
              <p className="foodu-order-demo-note">
                {translate("Demo confirmation only. This order has not been sent to the restaurant.", locale)}
              </p>
            </div>

            <div className="foodu-order-success-summary">
              <h3>{translate("Your order", locale)}</h3>
              {cart.map((item) => (
                <div className="foodu-order-success-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{translate(item.name, locale)}</strong>
                    <span>{translate("Qty", locale)} {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
              <div className="foodu-order-success-total is-subtotal">
                <span>{translate("Subtotal", locale)}</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="foodu-order-success-total">
                <span>{translate("Delivery", locale)}</span>
                <strong>{formatPrice(deliveryFee)}</strong>
              </div>
              <div className="foodu-order-success-total">
                <span>{translate("Total", locale)}</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <Link className="foodu-checkout-submit" href="/shop">
                {translate("Continue shopping", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
              <button className="foodu-order-edit" type="button" onClick={() => setOrderReference("")}>
                {translate("Return to checkout", locale)}
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="foodu-checkout-page">
      <div className="container">
        <header className="foodu-checkout-heading">
          <span className="foodu-checkout-eyebrow">{translate("Checkout", locale)}</span>
          <h2>{translate("Delivery details", locale)}</h2>
          <p>{translate("Add your contact details and choose your Casablanca delivery area.", locale)}</p>
        </header>

        <form className="foodu-checkout-layout" onSubmit={handleSubmit}>
          <section className="foodu-checkout-form-panel" aria-labelledby="foodu-delivery-title">
            <div className="foodu-checkout-panel-heading">
              <span className="foodu-checkout-step">01</span>
              <div>
                <h3 id="foodu-delivery-title">{translate("Your information", locale)}</h3>
                <p>{translate("Enter your name, phone number, and delivery address.", locale)}</p>
              </div>
            </div>

            <div className="foodu-checkout-fields">
              <div className="foodu-checkout-field">
                <label htmlFor="checkout-name">{translate("Full name", locale)}</label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder={translate("Name for the order", locale)}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="foodu-checkout-field">
                <label htmlFor="checkout-phone">{translate("Phone number", locale)}</label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={translate("Your contact number", locale)}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
              <div className="foodu-checkout-field">
                <label htmlFor="checkout-area">{translate("Casablanca area", locale)}</label>
                <select
                  id="checkout-area"
                  name="area"
                  value={selectedAreaId}
                  onChange={(event) => setSelectedAreaId(event.target.value)}
                  required
                >
                  <option value="" disabled>{translate("Choose your area", locale)}</option>
                  {casablancaAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name[locale]} · {formatPrice(area.fee)}
                    </option>
                  ))}
                </select>
                <p className="foodu-checkout-field-hint">
                  {translate("Delivery fee is calculated from your selected area.", locale)}
                </p>
              </div>
              <div className="foodu-checkout-field foodu-checkout-location-field">
                <label htmlFor="checkout-address">{translate("Delivery address", locale)}</label>
                <textarea
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  placeholder={translate("Street, building, apartment, or landmark", locale)}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                  rows={3}
                />
              </div>
            </div>

            <button className="foodu-checkout-submit" type="submit">
              {translate("Place order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            <p className="foodu-checkout-privacy">
              <i className="fas fa-lock" aria-hidden="true" /> {translate("Your details are used only to prepare this demo order.", locale)}
            </p>
          </section>

          <aside className="foodu-checkout-summary" aria-labelledby="foodu-order-summary-title">
            <div className="foodu-checkout-summary-heading">
              <div>
                <span className="foodu-checkout-eyebrow">{translate("02 / YOUR ORDER", locale)}</span>
                <h3 id="foodu-order-summary-title">{translate("Order summary", locale)}</h3>
              </div>
              <span>{cart.reduce((count, item) => count + item.quantity, 0)} {translate("items", locale)}</span>
            </div>

            <div className="foodu-checkout-order-items">
              {cart.map((item) => (
                <article className="foodu-checkout-order-item" key={item.id}>
                    <img src={item.image} alt={translate(item.name, locale)} />
                  <div>
                    <h4>{translate(item.name, locale)}</h4>
                    <span>{translate("Qty", locale)} {item.quantity} · {formatPrice(item.price)} {translate("each", locale)}</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="foodu-checkout-totals">
              <div><span>{translate("Subtotal", locale)}</span><strong>{formatPrice(subtotal)}</strong></div>
              <div>
                <span>{translate("Delivery", locale)}</span>
                <strong>{selectedArea ? formatPrice(deliveryFee) : translate("Choose an area", locale)}</strong>
              </div>
              <div className="foodu-checkout-total"><strong>{translate("Total", locale)}</strong><strong>{formatPrice(total)}</strong></div>
            </div>
            <Link className="foodu-checkout-edit-cart" href="/cart">
              <i className="fas fa-arrow-left" aria-hidden="true" /> {translate("Edit cart", locale)}
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
