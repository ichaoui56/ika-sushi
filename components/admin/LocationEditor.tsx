"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createLocation, updateLocation } from "../../features/locations/actions";
import type { AdminLocationRecord, LocationType } from "./location-types";
import "./LocationManagement.css";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const typeLabels: Record<LocationType, string> = {
  CITY: "City",
  NEIGHBORHOOD: "Neighborhood",
  STREET: "Street",
};

export default function LocationEditor({ location }: { location?: AdminLocationRecord }) {
  const router = useRouter();
  const [name, setName] = useState(location?.name ?? "");
  const [slug, setSlug] = useState(location?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(location));
  const [type, setType] = useState<LocationType>(location?.type ?? "NEIGHBORHOOD");
  const [deliveryFee, setDeliveryFee] = useState(String((location?.deliveryFeeMinor ?? 0) / 100));
  const [sortOrder, setSortOrder] = useState(String(location?.sortOrder ?? 0));
  const [isActive, setIsActive] = useState(location?.isActive ?? true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    const input = {
      name,
      slug: slug || undefined,
      type,
      deliveryFeeMinor: Math.round(Number(deliveryFee) * 100),
      isActive,
      sortOrder: Number(sortOrder),
    };
    try {
      const result = location
        ? await updateLocation({ ...input, id: location.id })
        : await createLocation(input);
      if (!result.success) {
        setError(result.message);
        return;
      }
      router.push("/admin/locations");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save the delivery area.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="Ika-location-new-page">
      <header className="Ika-location-new-head">
        <div><span>DELIVERY ZONES</span><h1>{location ? "Edit location" : "Add location"}</h1><p>{location ? "Update the location name, type, and service fee." : "Add a city, neighborhood, or street to your delivery areas."}</p></div>
        <Link href="/admin/locations"><i className="fas fa-arrow-left" aria-hidden="true" />Back to locations</Link>
      </header>

      <form className="Ika-location-editor" onSubmit={submit}>
        <section className="Ika-location-editor-section">
          <div className="Ika-location-editor-section-heading"><span>LOCATION DETAILS</span><strong>Information</strong></div>
          <div className="Ika-location-editor-fields">
            <label className="is-wide">Location name<input value={name} onChange={(event) => { const nextName = event.target.value; setName(nextName); if (!slugEdited) setSlug(slugify(nextName)); }} maxLength={120} required placeholder="e.g. Casablanca" /></label>
            <label className="is-wide">URL slug<div className="Ika-location-slug-field"><input value={slug} onChange={(event) => { setSlugEdited(true); setSlug(event.target.value); }} maxLength={140} placeholder="Generated from location name" /><button type="button" onClick={() => { setSlugEdited(false); setSlug(slugify(name)); }}>Auto</button></div></label>
            <label>Location type<select value={type} onChange={(event) => setType(event.target.value as LocationType)} disabled={Boolean(location)}>{Object.entries(typeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
            <label>Delivery fee (MAD)<input type="number" min="0" step="0.01" value={deliveryFee} onChange={(event) => setDeliveryFee(event.target.value)} required /></label>
            <label>Display order<input type="number" step="1" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} /></label>
            <label className="Ika-location-active-toggle"><input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} /><span><strong>Active on storefront</strong><small>Active neighborhoods can accept delivery.</small></span></label>
          </div>
        </section>

        {error && <p className="Ika-location-form-error" role="alert">{error}</p>}
        <footer className="Ika-location-editor-footer">
          <button type="submit" disabled={pending}><i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-check"}`} aria-hidden="true" />{pending ? "Saving…" : location ? "Save changes" : "Add location"}</button>
          <Link href="/admin/locations">Cancel</Link>
        </footer>
      </form>
    </div>
  );
}
