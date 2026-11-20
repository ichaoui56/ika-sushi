"use client";

import { useState, type FormEvent } from "react";
import { updateStoreSettings } from "../../features/settings/actions";
import { defaultOpeningHours, openingHoursSchema, type OpeningHours } from "../../features/settings/schemas";
import "./BusinessHours.css";

interface SettingsRecord { key: string; value: unknown }
interface SettingsValues {
  restaurantName: string;
  contactPhone: string;
  whatsappNumber: string;
  currency: "MAD";
  socialLinks: { instagram: string; facebook: string };
  openingHours: OpeningHours;
}
const defaults: SettingsValues = {
  restaurantName: "",
  contactPhone: "",
  whatsappNumber: "",
  currency: "MAD",
  socialLinks: { instagram: "", facebook: "" },
  openingHours: defaultOpeningHours,
};

const weekDays: Array<{ key: keyof OpeningHours["days"]; label: string }> = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export default function SettingsManager({ settings }: { settings: SettingsRecord[] }) {
  const [values, setValues] = useState<SettingsValues>(() => {
    const stored = Object.fromEntries(settings.map(({ key, value }) => [key, value]));
    const socialLinks = stored.socialLinks && typeof stored.socialLinks === "object"
      ? stored.socialLinks as SettingsValues["socialLinks"]
      : defaults.socialLinks;
    const openingHours = openingHoursSchema.safeParse(stored.openingHours);
    return {
      restaurantName: typeof stored.restaurantName === "string" ? stored.restaurantName : defaults.restaurantName,
      contactPhone: typeof stored.contactPhone === "string" ? stored.contactPhone : defaults.contactPhone,
      whatsappNumber: typeof stored.whatsappNumber === "string" ? stored.whatsappNumber : defaults.whatsappNumber,
      currency: "MAD",
      socialLinks,
      openingHours: openingHours.success ? openingHours.data : defaults.openingHours,
    };
  });
  const [bulkStart, setBulkStart] = useState(() => Object.values(values.openingHours.days).find((day) => day.open)?.start ?? "11:00");
  const [bulkEnd, setBulkEnd] = useState(() => Object.values(values.openingHours.days).find((day) => day.open)?.end ?? "23:00");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const updateDay = (day: keyof OpeningHours["days"], value: Partial<OpeningHours["days"][typeof day]>) => {
    setValues((current) => ({
      ...current,
      openingHours: {
        ...current.openingHours,
        days: { ...current.openingHours.days, [day]: { ...current.openingHours.days[day], ...value } },
      },
    }));
  };

  const applyHoursToAllDays = () => {
    setValues((current) => ({
      ...current,
      openingHours: {
        ...current.openingHours,
        days: Object.fromEntries(weekDays.map(({ key }) => [key, {
          ...current.openingHours.days[key],
          open: true,
          start: bulkStart,
          end: bulkEnd,
        }])) as OpeningHours["days"],
      },
    }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.openingHours.enabled && !Object.values(values.openingHours.days).some((day) => day.open)) {
      setError("Enable at least one open day, or turn off opening-hours enforcement.");
      return;
    }
    if (Object.values(values.openingHours.days).some((day) => day.open && day.start === day.end)) {
      setError("For each open day, the start and end times must be different.");
      return;
    }
    setPending(true);
    setFeedback("");
    setError("");
    try {
      const result = await updateStoreSettings(values);
      if (!result.success) setError(result.message);
      else setFeedback(result.message);
    } finally { setPending(false); }
  };

  return <form className="Ika-admin-form" onSubmit={submit}>
    <div className="Ika-admin-form-heading"><div><span>STOREFRONT</span><h2>Restaurant details</h2></div></div>
    <div className="Ika-admin-form-grid">
      <label>Restaurant name<input value={values.restaurantName} onChange={(event) => setValues({ ...values, restaurantName: event.target.value })} required /></label>
      <label>Calling phone number<input type="tel" value={values.contactPhone} onChange={(event) => setValues({ ...values, contactPhone: event.target.value })} required /></label>
      <label>WhatsApp number<input type="tel" value={values.whatsappNumber} onChange={(event) => setValues({ ...values, whatsappNumber: event.target.value })} required /></label>
      <label>Currency<select value="MAD" disabled><option value="MAD">MAD</option></select></label>
      <label>Instagram URL<input type="url" value={values.socialLinks.instagram} onChange={(event) => setValues({ ...values, socialLinks: { ...values.socialLinks, instagram: event.target.value } })} /></label>
      <label>Facebook URL<input type="url" value={values.socialLinks.facebook} onChange={(event) => setValues({ ...values, socialLinks: { ...values.socialLinks, facebook: event.target.value } })} /></label>
    </div>
    <section className="Ika-business-hours">
      <div className="Ika-admin-form-heading"><div><span>OPERATING HOURS</span><h2>Weekly shifts</h2></div></div>
      <label className="Ika-business-hours-toggle"><input type="checkbox" checked={values.openingHours.enabled} onChange={(event) => setValues({ ...values, openingHours: { ...values.openingHours, enabled: event.target.checked } })} /><span>Enforce opening hours on the storefront</span></label>
      <p className="Ika-business-hours-hint">When enabled, visitors outside these shifts will see the closed page. Time zone: Casablanca. End times earlier than start times continue into the next day.</p>
      <div className="Ika-business-hours-bulk">
        <label>From<input type="time" value={bulkStart} onChange={(event) => setBulkStart(event.target.value)} /></label>
        <label>To<input type="time" value={bulkEnd} onChange={(event) => setBulkEnd(event.target.value)} /></label>
        <button type="button" className="Ika-business-hours-apply" onClick={applyHoursToAllDays}><i className="fas fa-copy" aria-hidden="true" /><span>Apply to all days</span></button>
      </div>
      <div className="Ika-business-hours-days">
        {weekDays.map(({ key, label }) => {
          const hours = values.openingHours.days[key];
          return <fieldset className="Ika-business-hours-day" key={key}>
            <legend>{label}</legend>
            <label className="Ika-business-hours-open"><input type="checkbox" checked={hours.open} onChange={(event) => updateDay(key, { open: event.target.checked })} /><span>{hours.open ? "Open" : "Closed"}</span></label>
            <div className="Ika-business-hours-times">
              <label>Start<input type="time" value={hours.start} disabled={!hours.open} onChange={(event) => updateDay(key, { start: event.target.value })} /></label>
              <label>End<input type="time" value={hours.end} disabled={!hours.open} onChange={(event) => updateDay(key, { end: event.target.value })} /></label>
            </div>
          </fieldset>;
        })}
      </div>
    </section>
    {(error || feedback) && <p className={error ? "Ika-admin-feedback is-error" : "Ika-admin-feedback"} role={error ? "alert" : "status"}>{error || feedback}</p>}
    <button className="Ika-admin-button" disabled={pending}>{pending ? "Saving…" : "Save settings"}</button>
  </form>;
}
