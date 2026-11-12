"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { createHeroSlide, updateHeroSlide } from "../../features/hero/actions";
import { toLocalImageUrl } from "../../lib/image-url";
import { uploadAdminImage } from "./uploadImage";

interface HeroSlideDraft {
  id?: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaDestination: string | null;
  sortOrder: number;
  isActive: boolean;
  visibleFrom: string | null;
  visibleUntil: string | null;
}

const defaultValues = {
  title: "",
  subtitle: "",
  description: "",
  imageUrl: "",
  ctaText: "ORDER NOW",
  ctaDestination: "/shop",
  sortOrder: 0,
  isActive: true,
  visibleFrom: null,
  visibleUntil: null,
} as const;

function toFormValues(slide?: HeroSlideDraft) {
  return {
    title: slide?.title ?? "",
    subtitle: slide?.subtitle ?? "",
    description: slide?.description ?? "",
    imageUrl: slide?.imageUrl ?? "",
    ctaText: slide?.ctaText ?? "ORDER NOW",
    ctaDestination: slide?.ctaDestination ?? "/shop",
    sortOrder: slide?.sortOrder ?? 0,
    isActive: slide?.isActive ?? true,
    visibleFrom: slide?.visibleFrom ? new Date(slide.visibleFrom).toISOString().slice(0, 16) : "",
    visibleUntil: slide?.visibleUntil ? new Date(slide.visibleUntil).toISOString().slice(0, 16) : "",
  };
}

export default function HeroSlideForm({ slide }: { slide?: HeroSlideDraft }) {
  const router = useRouter();
  const isEditing = Boolean(slide?.id);
  const [values, setValues] = useState(() => ({ ...defaultValues, ...toFormValues(slide), imageUrl: slide?.imageUrl ?? "" }));
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const previewImage = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    return values.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80";
  }, [file, values.imageUrl]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setFile(nextFile);
    if (nextFile) {
      setValues((current) => ({ ...current, imageUrl: "" }));
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const imageUrl = file ? await uploadAdminImage(file) : values.imageUrl;
      const payload = {
        ...values,
        id: slide?.id,
        imageUrl,
        sortOrder: Number(values.sortOrder),
        visibleFrom: values.visibleFrom ? new Date(values.visibleFrom) : null,
        visibleUntil: values.visibleUntil ? new Date(values.visibleUntil) : null,
      };

      const result = isEditing
        ? await updateHeroSlide(payload)
        : await createHeroSlide(payload);

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.push("/admin/hero");
      router.refresh();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="Ika-hero-form-shell">
      <header className="Ika-hero-form-header">
        <div>
          <span>HOMEPAGE</span>
          <h1>{isEditing ? "Edit hero slide" : "Create hero slide"}</h1>
        </div>
        <Link href="/admin/hero" className="Ika-hero-back-link"><i className="fas fa-arrow-left" aria-hidden="true" />Back to slides</Link>
      </header>

      <div className="Ika-hero-form-layout">
        <form className="Ika-hero-form-card" onSubmit={submit}>
          <div className="Ika-hero-form-grid">
            <label className="is-wide">
              <span>Slide title</span>
              <input value={values.title} onChange={(event) => setValues({ ...values, title: event.target.value })} placeholder="Spring menu" required />
            </label>

            <label>
              <span>Subtitle</span>
              <input value={values.subtitle} onChange={(event) => setValues({ ...values, subtitle: event.target.value })} placeholder="Fresh seafood & sushi" />
            </label>

            <label>
              <span>Button label</span>
              <input value={values.ctaText} onChange={(event) => setValues({ ...values, ctaText: event.target.value })} placeholder="Order now" />
            </label>

            <label className="is-wide">
              <span>Description</span>
              <textarea value={values.description} onChange={(event) => setValues({ ...values, description: event.target.value })} rows={4} placeholder="Short text shown on the hero banner" />
            </label>

            <label>
              <span>Button destination</span>
              <input value={values.ctaDestination} onChange={(event) => setValues({ ...values, ctaDestination: event.target.value })} placeholder="/shop or https://..." />
            </label>

            <label>
              <span>Display order</span>
              <input type="number" value={values.sortOrder} onChange={(event) => setValues({ ...values, sortOrder: Number(event.target.value) })} />
            </label>

            <label>
              <span>Visible from</span>
              <input type="datetime-local" value={values.visibleFrom} onChange={(event) => setValues({ ...values, visibleFrom: event.target.value })} />
            </label>

            <label>
              <span>Visible until</span>
              <input type="datetime-local" value={values.visibleUntil} onChange={(event) => setValues({ ...values, visibleUntil: event.target.value })} />
            </label>

            <label className="Ika-hero-image-upload">
              <span>Hero image</span>
              <div className="Ika-hero-upload-box">
                <input type="file" accept="image/*" onChange={onFileChange} />
                <div>
                  <i className="fas fa-cloud-upload-alt" aria-hidden="true" />
                  <strong>{file ? file.name : "Upload any image type"}</strong>
                  <small>PNG, JPG, WEBP, GIF, SVG, and more</small>
                </div>
              </div>
            </label>           

            <label className="Ika-hero-check-inline">
              <input type="checkbox" checked={values.isActive} onChange={(event) => setValues({ ...values, isActive: event.target.checked })} />
              Active on homepage
            </label>
          </div>

          {error && <p className="Ika-admin-feedback is-error" role="alert">{error}</p>}

          <div className="Ika-hero-form-actions">
            <button type="button" className="Ika-hero-form-secondary" onClick={() => router.push("/admin/hero")}>Cancel</button>
            <button className="Ika-hero-form-primary" disabled={pending}>{pending ? (isEditing ? "Updating slide…" : "Creating slide…") : (isEditing ? "Save changes" : "Create hero slide")}</button>
          </div>
        </form>

        <aside className="Ika-hero-preview-card">
          <div className="Ika-hero-preview-image">
            <img src={toLocalImageUrl(previewImage)} alt={values.title || "Slide preview"} />
            <div className="Ika-hero-preview-overlay">
              <span>{values.isActive ? "Active" : "Draft"}</span>
              <strong>{values.title || "Your hero title"}</strong>
              <em>{values.ctaText || "ORDER NOW"}</em>
            </div>
          </div>
          <div className="Ika-hero-preview-body">
            <p className="Ika-hero-preview-kicker">Preview</p>
            <h2>{values.title || "Slide title"}</h2>
            {values.subtitle && <p>{values.subtitle}</p>}
            {values.description && <p>{values.description}</p>}
            <div className="Ika-hero-preview-meta">
              <small>{values.ctaDestination || "/shop"}</small>
              <small>{String(values.sortOrder || 0)}</small>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
