"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { lookupTrackedOrder } from "../../../features/orders/actions";
import { useLocale } from "../../i18n/LocaleProvider";
import { translate } from "../../i18n/translations";
import "./TrackOrder.css";

const workflow = [
  { status: "PENDING", title: "Order received", detail: "Your order has reached our kitchen." },
  { status: "CONFIRMED", title: "Order confirmed", detail: "The restaurant has confirmed your order." },
  { status: "PREPARING", title: "Preparing your sushi", detail: "Our kitchen is preparing your dishes." },
  { status: "READY_FOR_DELIVERY", title: "Ready for delivery", detail: "Your order is packed and ready to go." },
  { status: "ASSIGNED", title: "Delivery person assigned", detail: "A delivery person is on the way to collect it." },
  { status: "OUT_FOR_DELIVERY", title: "On the way", detail: "Your order is heading to your door." },
  { status: "DELIVERED", title: "Delivered", detail: "Your order has arrived. Enjoy your meal!" },
];

const statusLabels: Record<string, string> = Object.fromEntries(
  workflow.map(({ status, title }) => [status, title]),
);
statusLabels.DELIVERY_FAILED = "Delivery needs attention";
statusLabels.CANCELLED = "Cancelled";

export default function TrackOrderClient() {
  const { locale } = useLocale();
  const [reference, setReference] = useState("");
  const [order, setOrder] = useState<Awaited<ReturnType<typeof lookupTrackedOrder>>["order"]>();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    setOrder(undefined);
    try {
      const result = await lookupTrackedOrder({ reference });
      if (!result.success) setError(translate(result.message, locale));
      else setOrder(result.order);
    } catch {
      setError(translate("We couldn’t check your order right now. Please try again.", locale));
    } finally {
      setPending(false);
    }
  };

  const dateLocale = locale === "fr" ? "fr-FR" : locale === "ar" ? "ar-MA" : "en-US";
  const orderDate = order ? new Date(order.createdAt) : null;
  const lastCompletedStatus = order?.history.toReversed().find((entry) => entry.status !== "CANCELLED")?.status;
  const progressStatus = order?.status === "DELIVERY_FAILED" ? "OUT_FOR_DELIVERY" : order?.status === "CANCELLED" ? lastCompletedStatus : order?.status;
  const progressIndex = workflow.findIndex(({ status }) => status === progressStatus);
  const isCancelled = order?.status === "CANCELLED";
  const isDeliveryFailed = order?.status === "DELIVERY_FAILED";
  const currentStatusLabel = order ? translate(statusLabels[order.status] ?? order.status, locale) : "";

  return (
    <main className="Ika-track-page">
      <div className="Ika-track-shell container">
        <header className="Ika-track-intro">
          <span className="Ika-track-eyebrow">{translate("ORDER JOURNEY", locale)}</span>
          <h1>{translate("Track your order", locale)}</h1>
          <p>{translate("From our kitchen to your door, follow every step.", locale)}</p>
        </header>

        <section className="Ika-track-lookup" aria-labelledby="Ika-track-form-title">
          <div className="Ika-track-lookup-heading">
            <span className="Ika-track-lookup-icon"><i className="fas fa-receipt" aria-hidden="true" /></span>
            <div>
              <h2 id="Ika-track-form-title">{translate("Find your order", locale)}</h2>
              <p>{translate("Enter the secure order number from your confirmation.", locale)}</p>
            </div>
          </div>
          <form className="Ika-track-form" onSubmit={submit}>
            <label htmlFor="track-reference">{translate("Order reference", locale)}
              <input
                id="track-reference"
                value={reference}
                onChange={(event) => setReference(event.target.value.toUpperCase().replace(/\s/g, ""))}
                placeholder="IKA-4F8A2"
                autoComplete="off"
                pattern="IKA-[A-Fa-f0-9]{24}"
                minLength={28}
                maxLength={28}
                required
              />
            </label>
            {error && <p className="Ika-track-error" role="alert">{error}</p>}
            <button className="Ika-track-submit" type="submit" disabled={pending}>
              <span>{pending ? translate("Checking...", locale) : translate("Track order", locale)}</span>
              <i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-arrow-right"}`} aria-hidden="true" />
            </button>
          </form>
        </section>

        {order && (
          <section className="Ika-track-result" aria-live="polite" aria-labelledby="Ika-track-result-title">
            <header className="Ika-track-result-heading">
              <div>
                <span className="Ika-track-eyebrow">{translate("ORDER STATUS", locale)}</span>
                <h2 id="Ika-track-result-title">{order.reference}</h2>
                <p>{orderDate?.toLocaleString(dateLocale, { dateStyle: "medium", timeStyle: "short" })} <span aria-hidden="true">·</span> {order.locationName}</p>
              </div>
              <span className={`Ika-track-status${isCancelled ? " is-cancelled" : isDeliveryFailed ? " is-attention" : ""}`}>
                <i className={`fas ${isCancelled ? "fa-ban" : isDeliveryFailed ? "fa-exclamation-circle" : order.status === "DELIVERED" ? "fa-check-circle" : "fa-circle"}`} aria-hidden="true" />
                {currentStatusLabel}
              </span>
            </header>

            {isCancelled && <div className="Ika-track-notice is-cancelled"><i className="fas fa-ban" aria-hidden="true" /><p>{translate("This order was cancelled.", locale)}</p></div>}
            {isDeliveryFailed && <div className="Ika-track-notice is-attention"><i className="fas fa-exclamation-circle" aria-hidden="true" /><p>{translate("The delivery needs attention. Please contact us for help.", locale)}</p></div>}

            <div className="Ika-track-content">
              <section className="Ika-track-progress" aria-labelledby="Ika-track-progress-title">
                <div className="Ika-track-section-heading">
                  <span>{translate("01 / PROGRESS", locale)}</span>
                  <h3 id="Ika-track-progress-title">{translate("Your order journey", locale)}</h3>
                </div>
                <ol className="Ika-track-timeline">
                  {workflow.map((step, index) => {
                    const event = [...order.history].reverse().find((entry) => entry.status === step.status);
                    const isComplete = order.status === "DELIVERED" || index < progressIndex || (isCancelled && index === progressIndex);
                    const isCurrent = !isCancelled && order.status !== "DELIVERED" && index === progressIndex;
                    return (
                      <li key={step.status} className={`Ika-track-timeline-item${isComplete ? " is-complete" : ""}${isCurrent ? " is-current" : ""}`}>
                        <span className="Ika-track-timeline-marker" aria-hidden="true">
                          <i className={`fas ${isComplete ? "fa-check" : isCurrent ? "fa-circle" : "fa-circle"}`} />
                        </span>
                        <div className="Ika-track-timeline-copy">
                          <div className="Ika-track-timeline-title">
                            <strong>{translate(step.title, locale)}</strong>
                            {isCurrent && <span>{translate("CURRENT STEP", locale)}</span>}
                          </div>
                          <p>{translate(step.detail, locale)}</p>
                          {event && <time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleString(dateLocale, { dateStyle: "medium", timeStyle: "short" })}</time>}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>

              <aside className="Ika-track-order-details" aria-labelledby="Ika-track-details-title">
                <div className="Ika-track-section-heading">
                  <span>{translate("02 / ORDER", locale)}</span>
                  <h3 id="Ika-track-details-title">{translate("Order details", locale)}</h3>
                </div>
                <dl className="Ika-track-delivery-details">
                  <div><dt>{translate("Delivery area", locale)}</dt><dd>{order.locationName}</dd></div>
                  <div><dt>{translate("Delivery address", locale)}</dt><dd>{order.address}</dd></div>
                  {order.estimatedMinutes && !isCancelled && order.status !== "DELIVERED" && <div><dt>{translate("Estimated delivery", locale)}</dt><dd>{translate("Approximately", locale)} {order.estimatedMinutes} {translate("minutes", locale)}</dd></div>}
                </dl>
                <div className="Ika-track-items-heading"><strong>{translate("Items", locale)}</strong><span>{order.items.reduce((quantity, item) => quantity + item.quantity, 0)}</span></div>
                <ul className="Ika-track-items">
                  {order.items.map((item, index) => <li key={`${item.productName}-${index}`}><span>{item.quantity} ×</span><strong>{item.productName}</strong></li>)}
                </ul>
                <div className="Ika-track-order-total"><span>{translate("Order total", locale)}</span><strong>{new Intl.NumberFormat(dateLocale, { style: "currency", currency: order.currency }).format(order.totalMinor / 100)}</strong></div>
                <button className="Ika-track-another" type="button" onClick={() => { setOrder(undefined); setError(""); }}>
                  {translate("Track another order", locale)} <i className="fas fa-arrow-right" aria-hidden="true" />
                </button>
              </aside>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}