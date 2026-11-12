"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createCategory, updateCategory } from "../../features/categories/actions";
import type { AdminCategoryPage } from "./category-types";
import "./CategoryManagement.css";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoryEditor({ category }: { category?: AdminCategoryPage }) {
  const router = useRouter();
  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(category));
  const [description, setDescription] = useState(category?.description ?? "");
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const [sortOrder, setSortOrder] = useState(String(category?.sortOrder ?? 0));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const input = {
        name,
        slug: slug || undefined,
        description: description || undefined,
        isActive,
        sortOrder: Number(sortOrder),
      };
      const result = category
        ? await updateCategory({ ...input, id: category.id })
        : await createCategory(input);
      if (!result.success) {
        setError(result.message);
        return;
      }
      router.push("/admin/categories");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save the category.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="Ika-category-new-page">
      <header className="Ika-category-new-head">
        <div><span>MENU ORGANIZATION</span><h1>{category ? "Edit category" : "New category"}</h1><p>{category ? "Update the category details and storefront visibility." : "Create a category for your storefront menu."}</p></div>
        <Link href="/admin/categories"><i className="fas fa-arrow-left" aria-hidden="true" />Back to categories</Link>
      </header>

      <form className="Ika-category-editor" onSubmit={submit}>
        <section className="Ika-category-editor-section">
          <div className="Ika-category-editor-section-heading"><span>CATEGORY CONTENT</span><strong>Details</strong></div>
          <div className="Ika-category-editor-fields">
            <label className="is-wide">Category name<input value={name} onChange={(event) => { const nextName = event.target.value; setName(nextName); if (!slugEdited) setSlug(slugify(nextName)); }} maxLength={120} required placeholder="e.g. Sushi rolls" /></label>
            <label className="is-wide">URL slug<div className="Ika-category-slug-field"><input value={slug} onChange={(event) => { setSlugEdited(true); setSlug(event.target.value); }} maxLength={140} placeholder="Generated from category name" /><button type="button" onClick={() => { setSlugEdited(false); setSlug(slugify(name)); }}>Auto</button></div></label>
            <label className="is-wide">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} maxLength={2000} placeholder="Describe the products in this category" /></label>
            <label>Display order<input type="number" step="1" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} /></label>
            <label className="Ika-category-active-toggle"><input type="checkbox" checked={isActive} onChange={(event) => setIsActive(event.target.checked)} /><span><strong>Active on storefront</strong><small>Show this category in the menu.</small></span></label>
          </div>
        </section>

        {error && <p className="Ika-category-form-error" role="alert">{error}</p>}
        <footer className="Ika-category-editor-footer">
          <button type="submit" disabled={pending}><i className={`fas ${pending ? "fa-spinner fa-spin" : "fa-check"}`} aria-hidden="true" />{pending ? "Saving…" : category ? "Save changes" : "Create category"}</button>
          <Link href="/admin/categories">Cancel</Link>
        </footer>
      </form>
    </div>
  );
}
