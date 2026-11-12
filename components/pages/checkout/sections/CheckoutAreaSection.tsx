"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createCheckoutOrder, type CheckoutResult } from "../../../../features/orders/actions";
import { useStore } from "../../../store/StoreProvider";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { getProductName } from "../../../store/product-locale";
import { toLocalImageUrl } from "../../../../lib/image-url";

interface DeliveryArea {
  id: string;
  name: string;
  feeMinor: number;
  minimumOrderMinor: number;
  estimatedMinutes: number | null;
}

interface CheckoutAreaSectionProps {
  areas: DeliveryArea[];
  loadError?: string;
}

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CheckoutAreaSection({ areas, loadError }: CheckoutAreaSectionProps) {
  const { locale } = useLocale();
  const { cart, ready, removeFromCart } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<CheckoutResult["order"]>(undefined);
  const [submitError, setSubmitError] = useState("");
  const [pending, setPending] = useState(false);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const selectedArea = areas.find((area) => area.id === selectedAreaId);
  const deliveryFee = selectedArea ? selectedArea.feeMinor / 100 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setPending(true);
    try {
      const result = await createCheckoutOrder({
        name,
        phone,
        locationId: selectedAreaId,
        street: address,
        items: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
      });
      if (!result.success || !result.order) {
        setSubmitError(result.message);
        return;
      }
      setSubmittedOrder(result.order);
      setOrderReference(result.order.reference);
      await Promise.all(cart.map((item) => removeFromCart(item.id)));
    } catch {
      setSubmitError("We could not place your order. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (!ready) {
    return (
      <main className="Ika-checkout-page">
        <div className="container" aria-live="polite">{translate("Loading your order...", locale)}</div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="Ika-checkout-page">
        <div className="container">
          <div className="Ika-checkout-empty">
            <span className="Ika-checkout-eyebrow">{translate("Checkout", locale)}</span>
            <h2>{translate("Your cart is empty", locale)}</h2>
            <p>{translate("Add a few favorites before continuing to checkout.", locale)}</p>
            <Link className="Ika-checkout-submit" href="/shop">
              {translate("Explore the menu", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (orderReference) {
    return (
      <main className="Ika-checkout-page">
        <div className="container">
          <section className="Ika-order-success" aria-labelledby="Ika-order-success-title" aria-live="polite">
            <div className="Ika-order-success-main">
              <span className="Ika-order-success-icon">
                <i className="fas fa-check" aria-hidden="true" />
              </span>
              <span className="Ika-checkout-eyebrow">{translate("ORDER CONFIRMED", locale)}</span>
              <h2 id="Ika-order-success-title">{translate("Thank you,", locale)} {name}!</h2>
              <p className="Ika-order-success-lead">{translate("Your order details are confirmed.", locale)}</p>
              <p className="Ika-order-reference">
                <span>{translate("Order reference", locale)}</span>
                <strong>{orderReference}</strong>
              </p>
              <div className="Ika-order-success-contact">
                <span>{translate("Phone number", locale)}</span>
                <strong>{phone}</strong>
                <span>{translate("Delivery area", locale)}</span>
                <strong>{selectedArea ? translate(selectedArea.name, locale) : ""}</strong>
                <span>{translate("Delivery address", locale)}</span>
                <strong>{address}</strong>
              </div>
            </div>

            <div className="Ika-order-success-summary">
              <h3>{translate("Your order", locale)}</h3>
              {submittedOrder?.items.map((item) => (
                <div className="Ika-order-success-item" key={item.id}>
                  <img src={toLocalImageUrl(item.image)} alt="" />
                  <div>
                    <strong>{getProductName(item, locale)}</strong>
                    <span>{translate("Qty", locale)} {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(item.lineTotalMinor / 100)}</strong>
                </div>
              ))}
              <div className="Ika-order-success-total is-subtotal">
                <span>{translate("Subtotal", locale)}</span>
                <strong>{formatPrice((submittedOrder?.subtotalMinor ?? 0) / 100)}</strong>
              </div>
              {(submittedOrder?.discountMinor ?? 0) > 0 && <div className="Ika-order-success-total"><span>{translate("Discount", locale)}</span><strong>-{formatPrice((submittedOrder?.discountMinor ?? 0) / 100)}</strong></div>}
              <div className="Ika-order-success-total">
                <span>{translate("Delivery", locale)}</span>
                <strong>{formatPrice((submittedOrder?.deliveryFeeMinor ?? 0) / 100)}</strong>
              </div>
              <div className="Ika-order-success-total">
                <span>{translate("Total", locale)}</span>
                <strong>{formatPrice((submittedOrder?.totalMinor ?? 0) / 100)}</strong>
              </div>
              <Link className="Ika-checkout-submit" href="/shop">
                {translate("Continue shopping", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
              <button className="Ika-order-edit" type="button" onClick={() => setOrderReference("")}>
                {translate("Return to checkout", locale)}
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="Ika-checkout-page">
      <div className="container">
        <header className="Ika-checkout-heading">
          <span className="Ika-checkout-eyebrow">{translate("Checkout", locale)}</span>
          <h2>{translate("Delivery details", locale)}</h2>
          <p>{translate("Add your contact details and choose your Casablanca delivery area.", locale)}</p>
        </header>

        <form className="Ika-checkout-layout" onSubmit={handleSubmit}>
          <section className="Ika-checkout-form-panel" aria-labelledby="Ika-delivery-title">
            <div className="Ika-checkout-panel-heading">
              <span className="Ika-checkout-step">01</span>
              <div>
                <h3 id="Ika-delivery-title">{translate("Your information", locale)}</h3>
                <p>{translate("Enter your name, phone number, and delivery address.", locale)}</p>
              </div>
            </div>

            <div className="Ika-checkout-fields">
              <div className="Ika-checkout-field">
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
              <div className="Ika-checkout-field">
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
              <div className="Ika-checkout-field">
                <label htmlFor="checkout-area">{translate("Casablanca area", locale)}</label>
                <select
                  id="checkout-area"
                  name="area"
                  value={selectedAreaId}
                  onChange={(event) => setSelectedAreaId(event.target.value)}
                  required
                >
                  <option value="" disabled>{translate("Choose your area", locale)}</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {translate(area.name, locale)} · {formatPrice(area.feeMinor / 100)}
                    </option>
                  ))}
                </select>
                <p className="Ika-checkout-field-hint">
                  {loadError ?? (areas.length === 0
                    ? translate("Delivery is not available in your area yet.", locale)
                    : translate("Delivery fee is calculated from your selected area.", locale))}
                </p>
              </div>
              <div className="Ika-checkout-field Ika-checkout-location-field">
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

            {submitError && <p role="alert" aria-live="polite">{submitError}</p>}
            <button className="Ika-checkout-submit" type="submit" disabled={pending || areas.length === 0}>
              {pending ? translate("Please wait...", locale) : translate("Place order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            <p className="Ika-checkout-privacy">
              <i className="fas fa-lock" aria-hidden="true" /> {translate("Your details are used only to prepare this demo order.", locale)}
            </p>
          </section>

          <aside className="Ika-checkout-summary" aria-labelledby="Ika-order-summary-title">
            <div className="Ika-checkout-summary-heading">
              <div>
                <span className="Ika-checkout-eyebrow">{translate("02 / YOUR ORDER", locale)}</span>
                <h3 id="Ika-order-summary-title">{translate("Order summary", locale)}</h3>
              </div>
              <span>{cart.reduce((count, item) => count + item.quantity, 0)} {translate("items", locale)}</span>
            </div>

            <div className="Ika-checkout-order-items">
              {cart.map((item) => (
                <article className="Ika-checkout-order-item" key={item.id}>
                    <img src={toLocalImageUrl(item.image)} alt={getProductName(item, locale)} />
                  <div>
                    <h4>{getProductName(item, locale)}</h4>
                    <span>{translate("Qty", locale)} {item.quantity} · {formatPrice(item.price)} {translate("each", locale)}</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="Ika-checkout-totals">
              <div><span>{translate("Subtotal", locale)}</span><strong>{formatPrice(subtotal)}</strong></div>
              <div>
                <span>{translate("Delivery", locale)}</span>
                <strong>{selectedArea ? formatPrice(deliveryFee) : translate("Choose an area", locale)}</strong>
              </div>
              <div className="Ika-checkout-total"><strong>{translate("Total", locale)}</strong><strong>{formatPrice(total)}</strong></div>
            </div>
            <Link className="Ika-checkout-edit-cart" href="/cart">
              <i className="fas fa-arrow-left" aria-hidden="true" /> {translate("Edit cart", locale)}
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
