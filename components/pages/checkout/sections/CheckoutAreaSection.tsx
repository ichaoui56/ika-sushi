"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { createCheckoutOrder, type CheckoutResult } from "../../../../features/orders/actions";
import { useStore } from "../../../store/StoreProvider";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { formatProductPrice, getProductName } from "../../../store/product-locale";
import { localizeLocationName, type LocationTranslations } from "../../../../features/locations/translations";
import { toLocalImageUrl } from "../../../../lib/image-url";

interface DeliveryArea {
  id: string;
  name: string;
  translations: LocationTranslations;
  feeMinor: number;
  minimumOrderMinor: number;
  estimatedMinutes: number | null;
}

interface CheckoutAreaSectionProps {
  areas: DeliveryArea[];
  loadError?: string;
  customer?: {
    name: string;
    phone: string;
    locationId: string;
    address: string;
  } | null;
}

type CheckoutField = "name" | "phone" | "locationId";
type CheckoutFieldErrors = Partial<Record<CheckoutField, string>>;

const PHONE_INPUT_PATTERN = /^(?:\d(?:[\s().-]*\d){9}|\+[1-9](?:[\s().-]*\d){7,14})$/;

export default function CheckoutAreaSection({ areas, loadError, customer = null }: CheckoutAreaSectionProps) {
  const { locale } = useLocale();
  const { cart, ready, removeFromCart } = useStore();
  const [name, setName] = useState(customer?.name ?? "");
  const [phone, setPhone] = useState(customer?.phone ?? "");
  const [address, setAddress] = useState(customer?.address ?? "");
  const [selectedAreaId, setSelectedAreaId] = useState(customer?.locationId ?? "");
  const [areaSearch, setAreaSearch] = useState("");
  const [areaPickerOpen, setAreaPickerOpen] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<CheckoutResult["order"]>(undefined);
  const [orderHasAccount, setOrderHasAccount] = useState(Boolean(customer));
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<CheckoutFieldErrors>({});
  const [pending, setPending] = useState(false);
  const successDialogRef = useRef<HTMLDialogElement>(null);
  const passwordDialogRef = useRef<HTMLDialogElement>(null);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const currency = cart[0]?.currency ?? "MAD";
  const formatPrice = (price: number) => formatProductPrice(price, currency, locale);
  const selectedArea = areas.find((area) => area.id === selectedAreaId);
  const deliveryFee = selectedArea ? selectedArea.feeMinor / 100 : 0;
  const total = subtotal + deliveryFee;
  const normalizedAreaSearch = areaSearch.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase(locale).trim();
  const matchingAreas = areas.filter((area) => [
    area.name,
    area.translations.name?.fr,
    area.translations.name?.en,
    area.translations.name?.ar,
  ].some((name) => name?.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase(locale).includes(normalizedAreaSearch)));

  const clearFieldError = (field: CheckoutField) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  useEffect(() => {
    if (orderReference && successDialogRef.current && !successDialogRef.current.open) {
      successDialogRef.current.showModal();
    }
  }, [orderReference]);

  useEffect(() => {
    const dialog = passwordDialogRef.current;
    if (!dialog) return;
    if (passwordDialogOpen && !dialog.open) dialog.showModal();
    else if (!passwordDialogOpen && dialog.open) dialog.close();
  }, [passwordDialogOpen]);

  const submitOrder = async (password?: string, confirmPassword?: string) => {
    setSubmitError("");
    setPending(true);
    try {
      const result = await createCheckoutOrder({
        name,
        phone,
        locationId: selectedAreaId,
        password,
        confirmPassword,
        street: address,
        items: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
      });
      if (!result.success || !result.order) {
        const message = translate(result.message, locale);
        if (result.message === "Enter a valid phone number.") {
          setFieldErrors((current) => ({ ...current, phone: message }));
        } else setSubmitError(message);
        return;
      }
      setSubmittedOrder(result.order);
      setOrderHasAccount(result.hasAccount ?? Boolean(customer));
      setOrderReference(result.order.reference);
      setPasswordDialogOpen(false);
      await Promise.all(cart.map((item) => removeFromCart(item.id)));
    } catch {
      setSubmitError("We could not place your order. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    const errors: CheckoutFieldErrors = {};
    if (!name.trim()) errors.name = "This field is required.";
    if (!phone.trim()) errors.phone = "This field is required.";
    else if (!PHONE_INPUT_PATTERN.test(phone.trim())) errors.phone = "Enter a valid phone number.";
    if (!selectedAreaId) errors.locationId = "Choose a delivery area before placing your order.";
    setFieldErrors(errors);

    const firstInvalidField: CheckoutField | undefined = ["name", "phone", "locationId"].find(
      (field): field is CheckoutField => Boolean(errors[field as CheckoutField]),
    );
    if (firstInvalidField) {
      if (firstInvalidField === "locationId") setAreaPickerOpen(true);
      const fieldId = firstInvalidField === "locationId" ? "checkout-area-trigger" : `checkout-${firstInvalidField}`;
      document.getElementById(fieldId)?.focus();
      return;
    }
    if (!selectedAreaId) {
      setAreaPickerOpen(true);
      return;
    }
    if (!customer) {
      setPasswordDialogOpen(true);
      return;
    }
    void submitOrder();
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    void submitOrder(
      String(formData.get("password") ?? ""),
      String(formData.get("confirmPassword") ?? ""),
    );
  };

  if (!ready) {
    return (
      <main className="Ika-checkout-page">
        <div className="container" aria-live="polite">{translate("Loading your order...", locale)}</div>
      </main>
    );
  }

  if (orderReference) {
    return (
      <main className="Ika-checkout-page">
        <dialog ref={successDialogRef} className="Ika-order-success-dialog" aria-labelledby="Ika-order-success-title" onCancel={(event) => event.preventDefault()}>
          <section className="Ika-order-success" aria-live="polite">
            <div className="Ika-order-success-main">
              <span className="Ika-order-success-icon"><i className="fas fa-check" aria-hidden="true" /></span>
              <span className="Ika-checkout-eyebrow">{translate("ORDER CONFIRMED", locale)}</span>
              <h2 id="Ika-order-success-title">{translate("Thank you,", locale)} {name}!</h2>
              <p className="Ika-order-success-lead">{translate("Your order details are confirmed.", locale)}</p>
              <p className="Ika-order-reference"><span>{translate("Order reference", locale)}</span><strong>{orderReference}</strong></p>
              <div className="Ika-order-success-contact">
                <span>{translate("Phone number", locale)}</span><strong>{phone}</strong>
                <span>{translate("Delivery area", locale)}</span><strong>{selectedArea ? localizeLocationName(selectedArea, locale) : ""}</strong>
                <span>{translate("Delivery address", locale)}</span><strong>{address}</strong>
              </div>
            </div>

            <div className="Ika-order-success-summary">
              <h3>{translate("Your order", locale)}</h3>
              {submittedOrder?.items.map((item) => (
                <div className="Ika-order-success-item" key={item.id}>
                  <img src={toLocalImageUrl(item.image)} alt="" />
                  <div><strong>{getProductName(item, locale)}</strong><span>{translate("Qty", locale)} {item.quantity}</span></div>
                  <strong>{formatPrice(item.lineTotalMinor / 100)}</strong>
                </div>
              ))}
              <div className="Ika-order-success-total is-subtotal"><span>{translate("Subtotal", locale)}</span><strong>{formatPrice((submittedOrder?.subtotalMinor ?? 0) / 100)}</strong></div>
              {(submittedOrder?.discountMinor ?? 0) > 0 && <div className="Ika-order-success-total"><span>{translate("Discount", locale)}</span><strong>-{formatPrice((submittedOrder?.discountMinor ?? 0) / 100)}</strong></div>}
              <div className="Ika-order-success-total"><span>{translate("Delivery", locale)}</span><strong>{formatPrice((submittedOrder?.deliveryFeeMinor ?? 0) / 100)}</strong></div>
              <div className="Ika-order-success-total"><span>{translate("Total", locale)}</span><strong>{formatPrice((submittedOrder?.totalMinor ?? 0) / 100)}</strong></div>
              {orderHasAccount
                ? <Link className="Ika-checkout-submit" href="/orders">{translate("View my orders", locale)} <i className="fas fa-arrow-right" aria-hidden="true" /></Link>
                : <Link className="Ika-checkout-submit" href="/track-order">{translate("Track this order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" /></Link>}
              <Link className="Ika-order-edit" href="/food-menu">{translate("Continue shopping", locale)}</Link>
            </div>
          </section>
        </dialog>
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
            <Link className="Ika-checkout-submit" href="/food-menu">
              {translate("Explore the menu", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="Ika-checkout-page">
      <dialog ref={passwordDialogRef} className="Ika-checkout-password-dialog" onCancel={(event) => { event.preventDefault(); setPasswordDialogOpen(false); }}>
        <section className="Ika-checkout-password-panel" aria-labelledby="Ika-checkout-password-title">
          <button className="Ika-checkout-password-close" type="button" aria-label={translate("Close", locale)} onClick={() => setPasswordDialogOpen(false)}>
            <i className="fas fa-times" aria-hidden="true" />
          </button>
          <span className="Ika-checkout-eyebrow">{translate("CUSTOMER ACCOUNT", locale)}</span>
          <h2 id="Ika-checkout-password-title">{translate("Create your account password", locale)}</h2>
          <p>{translate("Create an account with a password, or continue as a guest.", locale)}</p>
          <form className="Ika-checkout-password-form" onSubmit={handlePasswordSubmit}>
            <label htmlFor="checkout-password">{translate("Password", locale)}
                <span className="Ika-checkout-password-input-wrap">
                  <input id="checkout-password" name="password" type={passwordVisible ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={128} required />
                  <button className="Ika-checkout-password-toggle" type="button" aria-label={translate(passwordVisible ? "Hide password" : "Show password", locale)} aria-pressed={passwordVisible} onClick={() => setPasswordVisible((visible) => !visible)}>
                    <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </span>
            </label>
            <label htmlFor="checkout-confirm-password">{translate("Confirm password", locale)}
                <span className="Ika-checkout-password-input-wrap">
                  <input id="checkout-confirm-password" name="confirmPassword" type={confirmPasswordVisible ? "text" : "password"} autoComplete="new-password" minLength={8} maxLength={128} required />
                  <button className="Ika-checkout-password-toggle" type="button" aria-label={translate(confirmPasswordVisible ? "Hide confirmation password" : "Show confirmation password", locale)} aria-pressed={confirmPasswordVisible} onClick={() => setConfirmPasswordVisible((visible) => !visible)}>
                    <i className={`fas ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                  </button>
                </span>
            </label>
            {submitError && <p role="alert" aria-live="polite">{submitError}</p>}
            <button className="Ika-checkout-submit" type="submit" disabled={pending}>
              {pending ? translate("Please wait...", locale) : translate("Create account and place order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            <button className="Ika-checkout-password-guest" type="button" disabled={pending} onClick={() => {
              setPasswordDialogOpen(false);
              void submitOrder();
            }}>
              {translate("Continue without an account", locale)}
            </button>
          </form>
        </section>
      </dialog>
      <div className="container">
        <header className="Ika-checkout-heading">
          <span className="Ika-checkout-eyebrow">{translate("Checkout", locale)}</span>
          <h2>{translate("Delivery details", locale)}</h2>
          <p>{translate("Add your contact details and choose a delivery area.", locale)}</p>
        </header>

        <form className="Ika-checkout-layout" onSubmit={handleSubmit} noValidate>
          <section className="Ika-checkout-form-panel" aria-labelledby="Ika-delivery-title">
            <div className="Ika-checkout-panel-heading">
              <span className="Ika-checkout-step">01</span>
              <div>
                <h3 id="Ika-delivery-title">{translate("Your information", locale)}</h3>
                <p>{translate("Enter your name and phone number. Delivery address is optional.", locale)}</p>
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
                  onChange={(event) => { setName(event.target.value); clearFieldError("name"); }}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "checkout-name-error" : undefined}
                  required
                />
                {fieldErrors.name && <p className="Ika-checkout-field-error" id="checkout-name-error" role="alert">{translate(fieldErrors.name, locale)}</p>}
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
                  onChange={(event) => { setPhone(event.target.value); clearFieldError("phone"); }}
                  readOnly={Boolean(customer)}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? "checkout-phone-error" : undefined}
                  required
                />
                {fieldErrors.phone && <p className="Ika-checkout-field-error" id="checkout-phone-error" role="alert">{translate(fieldErrors.phone, locale)}</p>}
              </div>
              <fieldset className="Ika-checkout-field Ika-checkout-zones" aria-invalid={Boolean(fieldErrors.locationId)} aria-describedby={fieldErrors.locationId ? "checkout-area-error" : undefined}>
                <legend>{translate("Delivery area", locale)}</legend>
                {selectedArea && <div className="Ika-checkout-area-selected">
                  <span className="Ika-checkout-area-pin"><i className="fas fa-map-marker-alt" aria-hidden="true" /></span>
                  <span><strong>{localizeLocationName(selectedArea, locale)}</strong><small>{formatPrice(selectedArea.feeMinor / 100)} · {translate("Minimum", locale)} {formatPrice(selectedArea.minimumOrderMinor / 100)}</small></span>
                  <button type="button" onClick={() => { setAreaPickerOpen((open) => !open); setAreaSearch(""); }}>{translate(areaPickerOpen ? "Close" : "Change area", locale)}</button>
                </div>}
                {!selectedArea && areas.length > 0 && <button id="checkout-area-trigger" className="Ika-checkout-area-trigger" type="button" onClick={() => setAreaPickerOpen(true)}>
                  <i className="fas fa-search" aria-hidden="true" /><span>{translate("Choose a delivery area", locale)}</span><i className="fas fa-chevron-down" aria-hidden="true" />
                </button>}
                {fieldErrors.locationId && <p className="Ika-checkout-field-error" id="checkout-area-error" role="alert">{translate(fieldErrors.locationId, locale)}</p>}
                {areaPickerOpen && <div className="Ika-checkout-area-picker">
                  <label htmlFor="checkout-area-search">{translate("Search delivery areas", locale)}</label>
                  <input id="checkout-area-search" type="search" value={areaSearch} onChange={(event) => setAreaSearch(event.target.value)} placeholder={translate("Search delivery areas", locale)} autoComplete="off" />
                  <div className="Ika-checkout-area-options" role="listbox" aria-label={translate("Search delivery areas", locale)}>
                    {matchingAreas.length ? matchingAreas.map((area) => (
                      <button key={area.id} type="button" role="option" aria-selected={selectedAreaId === area.id} className={`Ika-checkout-area-option${selectedAreaId === area.id ? " is-selected" : ""}`} onClick={() => {
                        setSelectedAreaId(area.id);
                        setAreaPickerOpen(false);
                        setAreaSearch("");
                      }}>
                        <span className="Ika-checkout-area-option-copy"><strong>{localizeLocationName(area, locale)}</strong><small>{translate("Minimum", locale)} {formatPrice(area.minimumOrderMinor / 100)}{area.estimatedMinutes !== null ? ` · ${area.estimatedMinutes} ${translate("minutes", locale)}` : ""}</small></span>
                        <strong className="Ika-checkout-zone-fee">{formatPrice(area.feeMinor / 100)}</strong>
                      </button>
                    )) : <p className="Ika-checkout-field-hint">{translate("No delivery areas match your search.", locale)}</p>}
                  </div>
                </div>}
                <p className="Ika-checkout-field-hint" role={loadError || areas.length === 0 ? "status" : undefined}>
                  {loadError ? translate(loadError, locale) : areas.length === 0 ? translate("Delivery is not available in your area yet.", locale) : null}
                </p>
              </fieldset>
              <div className="Ika-checkout-field Ika-checkout-location-field">
                <label htmlFor="checkout-address">{translate("Delivery address (optional)", locale)}</label>
                <textarea
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  placeholder={translate("Street, building, apartment, or landmark", locale)}
                  value={address}
                      onChange={(event) => setAddress(event.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {submitError && <p role="alert" aria-live="polite">{submitError}</p>}
            <button className="Ika-checkout-submit" type="submit" disabled={pending || areas.length === 0}>
              {pending ? translate("Please wait...", locale) : translate("Place order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            <p className="Ika-checkout-privacy">
              <i className="fas fa-lock" aria-hidden="true" /> {translate("Your details are used to process and track this order.", locale)}
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
                    <span>{translate("Qty", locale)} {item.quantity} · {formatProductPrice(item.price, item.currency, locale)} {translate("each", locale)}</span>
                  </div>
                  <strong>{formatProductPrice(item.price * item.quantity, item.currency, locale)}</strong>
                </article>
              ))}
            </div>

            <div className="Ika-checkout-totals">
              <div><span>{translate("Subtotal", locale)}</span><strong>{formatProductPrice(subtotal, currency, locale)}</strong></div>
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
