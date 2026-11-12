"use client";

import { useState, type FormEvent } from "react";
import { updateStoreSettings } from "../../features/settings/actions";

interface SettingsRecord { key: string; value: unknown }
interface SettingsValues {
  restaurantName: string;
  contactPhone: string;
  whatsappNumber: string;
  currency: "MAD";
  socialLinks: { instagram: string; facebook: string };
}
const defaults: SettingsValues = {
  restaurantName: "",
  contactPhone: "",
  whatsappNumber: "",
  currency: "MAD",
  socialLinks: { instagram: "", facebook: "" },
};

export default function SettingsManager({ settings }: { settings: SettingsRecord[] }) {
  const [values, setValues] = useState<SettingsValues>(() => {
    const stored = Object.fromEntries(settings.map(({ key, value }) => [key, value]));
    const socialLinks = stored.socialLinks && typeof stored.socialLinks === "object"
      ? stored.socialLinks as SettingsValues["socialLinks"]
      : defaults.socialLinks;
    return {
      restaurantName: typeof stored.restaurantName === "string" ? stored.restaurantName : defaults.restaurantName,
      contactPhone: typeof stored.contactPhone === "string" ? stored.contactPhone : defaults.contactPhone,
      whatsappNumber: typeof stored.whatsappNumber === "string" ? stored.whatsappNumber : defaults.whatsappNumber,
      currency: "MAD",
      socialLinks,
    };
  });
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    {(error || feedback) && <p className={error ? "Ika-admin-feedback is-error" : "Ika-admin-feedback"} role={error ? "alert" : "status"}>{error || feedback}</p>}
    <button className="Ika-admin-button" disabled={pending}>{pending ? "Saving…" : "Save settings"}</button>
  </form>;
}
