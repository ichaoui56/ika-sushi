"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteHeroSlide } from "../../features/hero/actions";
import { toLocalImageUrl } from "../../lib/image-url";

interface HeroSlideRecord {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaDestination: string | null;
  product: { id: string; name: string } | null;
  sortOrder: number;
  isActive: boolean;
  visibleFrom: string | null;
  visibleUntil: string | null;
}

export default function HeroManager({ slides }: { slides: HeroSlideRecord[] }) {
  const [pending, setPending] = useState(false);

  const remove = async (id: string, title: string) => {
    if (!window.confirm(`Delete “${title}”?`)) return;
    setPending(true);
    try {
      const result = await deleteHeroSlide(id);
      if (!result.success) {
        window.alert(result.message);
        return;
      }
      window.location.reload();
    } finally {
      setPending(false);
    }
  };

  return <section className="Ika-hero-manager">
    <header className="Ika-hero-page-heading">
      <div>
        <span>HOMEPAGE</span>
        <h1>Hero slides</h1>
        <p>Preview each slide exactly as it will appear in the homepage carousel.</p>
      </div>
      <Link href="/admin/hero/new" className="Ika-hero-add-button"><i className="fas fa-plus" aria-hidden="true" />Add slide</Link>
    </header>

    {slides.length === 0 ? (
      <div className="Ika-hero-empty-state">
        <span><i className="fas fa-images" aria-hidden="true" /></span>
        <h2>No hero slides yet</h2>
        <p>Add your first banner to start building the homepage experience.</p>
        <Link href="/admin/hero/new" className="Ika-hero-add-button"><i className="fas fa-plus" aria-hidden="true" />Add slide</Link>
      </div>
    ) : (
      <div className="Ika-hero-card-grid">
        {slides.map((slide) => (
          <article className="Ika-hero-slide-card" key={slide.id}>
            <div className="Ika-hero-slide-image">
              <img src={toLocalImageUrl(slide.imageUrl)} alt={slide.title} />
              <div className="Ika-hero-slide-overlay">
                <span className={slide.isActive ? "is-active" : "is-inactive"}>{slide.isActive ? "Active" : "Inactive"}</span>
                <strong>{slide.title}</strong>
                {slide.ctaText && <em>{slide.ctaText}</em>}
              </div>
            </div>
            <div className="Ika-hero-slide-content">
              <div className="Ika-hero-slide-meta">
                <span>{slide.sortOrder}</span>
                <small>{slide.visibleFrom ? new Date(slide.visibleFrom).toLocaleDateString() : "Always"}</small>
              </div>
              <h3>{slide.title}</h3>
              {slide.subtitle && <p className="Ika-hero-slide-subtitle">{slide.subtitle}</p>}
              {slide.description && <p className="Ika-hero-slide-description">{slide.description}</p>}
              {slide.product && <p className="Ika-hero-slide-subtitle">Featured product: {slide.product.name}</p>}
              <div className="Ika-hero-slide-footer">
                <span>{slide.ctaDestination || "No destination"}</span>
                <div className="Ika-admin-row-actions">
                  <Link href={`/admin/hero/new?edit=${slide.id}`} className="Ika-hero-inline-button">Edit</Link>
                  <button type="button" disabled={pending} onClick={() => void remove(slide.id, slide.title)}>Delete</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>;
}
