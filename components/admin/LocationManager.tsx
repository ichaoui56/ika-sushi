"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteLocation } from "../../features/locations/actions";
import type { AdminLocationRecord, LocationType } from "./location-types";
import "./LocationManagement.css";

type LocationView = "list" | "cards";

function locationsHref(page: number, view: LocationView, search: string) {
  const params = new URLSearchParams({ page: String(page), view });
  if (search) params.set("q", search);
  return `/admin/locations?${params.toString()}`;
}

function locationEditHref(locationId: string) {
  return `/admin/locations/new?edit=${encodeURIComponent(locationId)}`;
}

const typeLabels: Record<LocationType, string> = {
  CITY: "City",
  NEIGHBORHOOD: "Neighborhood",
  STREET: "Street",
};

function LocationActions({ location, pending, onDelete }: { location: AdminLocationRecord; pending: boolean; onDelete: () => void }) {
  return (
    <div className="Ika-location-actions">
      <Link href={locationEditHref(location.id)} title="Edit location" aria-label={`Edit ${location.name}`}><i className="fas fa-pen" aria-hidden="true" /></Link>
      <button type="button" title="Delete location" aria-label={`Delete ${location.name}`} disabled={pending} onClick={onDelete}><i className="far fa-trash-alt" aria-hidden="true" /></button>
    </div>
  );
}

function Pagination({ page, pageCount, view, search }: { page: number; pageCount: number; view: LocationView; search: string }) {
  const firstPage = Math.max(1, Math.min(page - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => firstPage + index);
  return (
    <nav className="Ika-location-pagination" aria-label="Location pages">
      <Link aria-label="Previous page" aria-disabled={page <= 1} className={page <= 1 ? "is-disabled" : ""} href={locationsHref(Math.max(1, page - 1), view, search)}><i className="fas fa-chevron-left" aria-hidden="true" /></Link>
      {pages.map((number) => <Link key={number} href={locationsHref(number, view, search)} aria-current={page === number ? "page" : undefined} className={page === number ? "is-current" : ""}>{number}</Link>)}
      <Link aria-label="Next page" aria-disabled={page >= pageCount} className={page >= pageCount ? "is-disabled" : ""} href={locationsHref(Math.min(pageCount, page + 1), view, search)}><i className="fas fa-chevron-right" aria-hidden="true" /></Link>
    </nav>
  );
}

function formatFee(minor: number) {
  return `MAD ${new Intl.NumberFormat("fr-MA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(minor / 100)}`;
}

function usedBy(location: AdminLocationRecord) {
  return location._count.children + location._count.addresses + location._count.orders;
}

export default function LocationManager({
  locations,
  page,
  pageCount,
  total,
  search,
  canManage,
  view,
}: {
  locations: AdminLocationRecord[];
  page: number;
  pageCount: number;
  total: number;
  search: string;
  canManage: boolean;
  view: LocationView;
}) {
  const router = useRouter();
  const [isSearching, startSearch] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const removeLocation = async (location: AdminLocationRecord) => {
    if (!window.confirm(`Delete “${location.name}”? This cannot be undone.`)) return;
    setPendingId(location.id);
    setError("");
    try {
      const result = await deleteLocation(location.id);
      if (!result.success) setError(result.message);
      else router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the location.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section className="Ika-location-manager">
      <header className="Ika-location-page-heading">
        <div><span>DELIVERY ZONES</span><h1>Delivery locations</h1><p>Manage delivery areas, fees, and storefront status.</p></div>
        {canManage && <Link href="/admin/locations/new" className="Ika-location-add-button"><i className="fas fa-plus" aria-hidden="true" />Add location</Link>}
      </header>

      <div className="Ika-location-toolbar">
        <form className="Ika-location-search" role="search" onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const query = String(formData.get("q") ?? "").trim();
          startSearch(() => router.replace(locationsHref(1, view, query)));
        }}>
          <i className="fas fa-search" aria-hidden="true" />
          <input type="search" name="q" defaultValue={search} placeholder="Search locations" aria-label="Search locations" />
          <button type="submit" disabled={isSearching}>{isSearching ? "Searching…" : "Search"}</button>
        </form>
        <div className="Ika-location-toolbar-meta">
          <span>{total} {total === 1 ? "location" : "locations"}</span>
          <div className="Ika-location-view-toggle" role="group" aria-label="Location layout">
            <Link href={locationsHref(page, "list", search)} aria-label="List view" aria-current={view === "list" ? "page" : undefined} className={view === "list" ? "is-active" : ""}><i className="fas fa-list" aria-hidden="true" /></Link>
            <Link href={locationsHref(page, "cards", search)} aria-label="Card view" aria-current={view === "cards" ? "page" : undefined} className={view === "cards" ? "is-active" : ""}><i className="fas fa-th-large" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      {error && <p className="Ika-location-error" role="alert">{error}</p>}
      {locations.length === 0 ? (
        <div className="Ika-location-empty">
          <span><i className="fas fa-map-marker-alt" aria-hidden="true" /></span>
          <h2>{search ? "No matching locations" : "No delivery locations yet"}</h2>
          <p>{search ? "Try a different location name or slug." : "Add a location to configure your delivery zones."}</p>
          {!search && canManage && <Link href="/admin/locations/new" className="Ika-location-add-button"><i className="fas fa-plus" aria-hidden="true" />Add location</Link>}
        </div>
      ) : view === "list" ? (
        <div className="Ika-location-list-scroll">
          <table className="Ika-location-list">
            <thead><tr><th>Location</th><th>Type</th><th>Delivery fee</th><th>Used by</th><th>Status</th>{canManage && <th aria-label="Actions" />}</tr></thead>
            <tbody>{locations.map((location) => (
              <tr key={location.id}>
                <td><div className="Ika-location-list-identity"><strong>{location.name}</strong><small>/{location.slug}</small></div></td>
                <td>{typeLabels[location.type]}</td>
                <td className="Ika-location-fee">{formatFee(location.deliveryFeeMinor)}</td>
                <td>{usedBy(location)}</td>
                <td><span className={`Ika-location-status${location.isActive ? " is-active" : ""}`}>{location.isActive ? "Active" : "Inactive"}</span></td>
                {canManage && <td><LocationActions location={location} pending={pendingId === location.id} onDelete={() => void removeLocation(location)} /></td>}
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : (
        <div className="Ika-location-card-grid">
          {locations.map((location) => (
            <article className="Ika-location-card" key={location.id}>
              <div className="Ika-location-card-top"><span className={`Ika-location-type is-${location.type.toLowerCase()}`}>{typeLabels[location.type]}</span><span className={`Ika-location-status${location.isActive ? " is-active" : ""}`}>{location.isActive ? "Active" : "Inactive"}</span></div>
              <h2>{location.name}</h2>
              <small>/{location.slug}</small>
              <div className="Ika-location-card-facts"><div><span>Delivery fee</span><strong>{formatFee(location.deliveryFeeMinor)}</strong></div><div><span>Used by</span><strong>{usedBy(location)}</strong></div></div>
              <footer className="Ika-location-card-footer"><span>Order {location.sortOrder}</span>{canManage && <LocationActions location={location} pending={pendingId === location.id} onDelete={() => void removeLocation(location)} />}</footer>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} view={view} search={search} />}
    </section>
  );
}
