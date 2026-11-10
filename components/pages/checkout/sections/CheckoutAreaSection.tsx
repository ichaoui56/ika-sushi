"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useStore } from "../../../store/StoreProvider";

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CheckoutAreaSection() {
  const { cart, ready } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [notice, setNotice] = useState("");
  const [locating, setLocating] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateMapLink = (coordinates: string) => {
    const match = coordinates.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (!match) {
      setLocationUrl("");
      return;
    }

    const latitude = Number(match[1]);
    const longitude = Number(match[2]);
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      setLocationUrl("");
      return;
    }

    const query = new URLSearchParams({ api: "1", query: `${latitude},${longitude}` });
    setLocationUrl(`https://www.google.com/maps/search/?${query.toString()}`);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not available in this browser. Enter coordinates manually.");
      return;
    }

    setLocating(true);
    setLocationStatus("Waiting for location permission…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
        setLocation(coordinates);
        updateMapLink(coordinates);
        setLocationStatus("Coordinates added. Open the map to confirm the exact pin.");
        setLocating(false);
      },
      (error) => {
        setLocationStatus(
          error.code === error.PERMISSION_DENIED
            ? "Location access was declined. Enter coordinates manually."
            : "Could not get your location. Please enter coordinates manually.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOrderReference(`IKA-${Date.now().toString(36).toUpperCase()}`);
  };

  if (!ready) {
    return (
      <main className="foodu-checkout-page">
        <div className="container" aria-live="polite">Loading your order…</div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="foodu-checkout-page">
        <div className="container">
          <div className="foodu-checkout-empty">
            <span className="foodu-checkout-eyebrow">CHECKOUT</span>
            <h2>Your cart is empty</h2>
            <p>Add a few favorites before continuing to checkout.</p>
            <Link className="foodu-checkout-submit" href="/shop">
              Explore the menu <i className="fas fa-arrow-right" aria-hidden="true" />
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
          <section className="foodu-order-success" aria-labelledby="foodu-order-success-title">
            <div className="foodu-order-success-main">
              <span className="foodu-order-success-icon">
                <i className="fas fa-check" aria-hidden="true" />
              </span>
              <span className="foodu-checkout-eyebrow">DEMO CHECKOUT</span>
              <h2 id="foodu-order-success-title">Thanks, {name}.</h2>
              <p className="foodu-order-success-lead">Your order details are confirmed.</p>
              <p className="foodu-order-reference">Reference <strong>{orderReference}</strong></p>
              <div className="foodu-order-success-contact">
                <span>PHONE</span>
                <strong>{phone}</strong>
                <span>DELIVERY COORDINATES</span>
                <strong>{location}</strong>
                {locationUrl && (
                  <a href={locationUrl} target="_blank" rel="noreferrer">
                    Open location in Google Maps <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
                  </a>
                )}
              </div>
              <p className="foodu-order-demo-note">
                Demo confirmation only. No order was sent to the restaurant because online ordering is not connected yet.
              </p>
            </div>

            <div className="foodu-order-success-summary">
              <h3>Your order</h3>
              {cart.map((item) => (
                <div className="foodu-order-success-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              ))}
              <div className="foodu-order-success-total">
                <span>Total</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <Link className="foodu-checkout-submit" href="/shop">
                Continue shopping <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
              <button className="foodu-order-edit" type="button" onClick={() => setOrderReference("")}>
                Return to checkout
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
          <span className="foodu-checkout-eyebrow">CHECKOUT</span>
          <h2>Delivery details</h2>
          <p>Tell us who’s receiving the order and where to deliver it.</p>
        </header>

        <form className="foodu-checkout-layout" onSubmit={handleSubmit}>
          <section className="foodu-checkout-form-panel" aria-labelledby="foodu-delivery-title">
            <div className="foodu-checkout-panel-heading">
              <span className="foodu-checkout-step">01</span>
              <div>
                <h3 id="foodu-delivery-title">Your information</h3>
                <p>Only your name, phone, and delivery location are needed.</p>
              </div>
            </div>

            <div className="foodu-checkout-fields">
              <div className="foodu-checkout-field">
                <label htmlFor="checkout-name">Full name</label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name for the order"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="foodu-checkout-field">
                <label htmlFor="checkout-phone">Phone number</label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your contact number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
              <div className="foodu-checkout-field foodu-checkout-location-field">
                {/* <div className="foodu-checkout-location-heading">
                  <label htmlFor="checkout-location">Delivery coordinates</label>
                  <button
                    className="foodu-use-location"
                    type="button"
                    onClick={useCurrentLocation}
                    disabled={locating}
                  >
                    <i className={`fas ${locating ? "fa-spinner fa-spin" : "fa-location-crosshairs"}`} aria-hidden="true" />
                    {locating ? "Locating…" : "Use my location"}
                  </button>
                </div> */}
                <input
                  id="checkout-location"
                  name="location"
                  type="text"
                  inputMode="decimal"
                  // pattern="-?[0-9]+(\\.[0-9]+)?\\s*,\\s*-?[0-9]+(\\.[0-9]+)?"
                  autoComplete="off"
                  placeholder="Your location"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                    updateMapLink(event.target.value);
                    setLocationStatus("");
                  }}
                  required
                />
                {locationStatus && (
                  <p className="foodu-checkout-location-status" role="status">{locationStatus}</p>
                )}
                {locationUrl && (
                  <a className="foodu-checkout-map-link" href={locationUrl} target="_blank" rel="noreferrer">
                    <i className="fas fa-map-marker-alt" aria-hidden="true" /> Open exact coordinates in Google Maps
                  </a>
                )}
              </div>
            </div>

            <button className="foodu-checkout-submit" type="submit">
              Confirm details <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            {notice && <p className="foodu-checkout-notice" role="status">{notice}</p>}
            <p className="foodu-checkout-privacy">
              <i className="fas fa-lock" aria-hidden="true" /> Your coordinates are requested only when you tap the location button and remain editable.
            </p>
          </section>

          <aside className="foodu-checkout-summary" aria-labelledby="foodu-order-summary-title">
            <div className="foodu-checkout-summary-heading">
              <div>
                <span className="foodu-checkout-eyebrow">02 / YOUR ORDER</span>
                <h3 id="foodu-order-summary-title">Order summary</h3>
              </div>
              <span>{cart.reduce((count, item) => count + item.quantity, 0)} items</span>
            </div>

            <div className="foodu-checkout-order-items">
              {cart.map((item) => (
                <article className="foodu-checkout-order-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <span>Qty {item.quantity} · {formatPrice(item.price)} each</span>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </article>
              ))}
            </div>

            <div className="foodu-checkout-totals">
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Delivery</span><span>Confirmed with location</span></div>
              <div className="foodu-checkout-total"><strong>Total</strong><strong>{formatPrice(subtotal)}</strong></div>
            </div>
            <Link className="foodu-checkout-edit-cart" href="/cart">
              <i className="fas fa-arrow-left" aria-hidden="true" /> Edit cart
            </Link>
          </aside>
        </form>
      </div>
    </main>
  );
}
