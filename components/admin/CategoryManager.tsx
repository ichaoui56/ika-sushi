"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteCategory } from "../../features/categories/actions";
import type { AdminCategoryPage } from "./category-types";
import "./CategoryManagement.css";

type CategoryView = "list" | "cards";

function categoriesHref(page: number, view: CategoryView, search: string) {
  const params = new URLSearchParams({ page: String(page), view });
  if (search) params.set("q", search);
  return `/admin/categories?${params.toString()}`;
}

function categoryEditHref(categoryId: string) {
  return `/admin/categories/new?edit=${encodeURIComponent(categoryId)}`;
}

function CategoryActions({ category, pending, onDelete }: { category: AdminCategoryPage; pending: boolean; onDelete: () => void }) {
  return (
    <div className="Ika-category-actions">
      <Link href={categoryEditHref(category.id)} title="Edit category" aria-label={`Edit ${category.name}`}>
        <i className="fas fa-pen" aria-hidden="true" />
      </Link>
      <button type="button" title="Delete category" aria-label={`Delete ${category.name}`} disabled={pending} onClick={onDelete}>
        <i className="far fa-trash-alt" aria-hidden="true" />
      </button>
    </div>
  );
}

function Pagination({ page, pageCount, view, search }: { page: number; pageCount: number; view: CategoryView; search: string }) {
  const firstPage = Math.max(1, Math.min(page - 2, pageCount - 4));
  const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => firstPage + index);
  return (
    <nav className="Ika-category-pagination" aria-label="Category pages">
      <Link aria-label="Previous page" aria-disabled={page <= 1} className={page <= 1 ? "is-disabled" : ""} href={categoriesHref(Math.max(1, page - 1), view, search)}>
        <i className="fas fa-chevron-left" aria-hidden="true" />
      </Link>
      {pages.map((number) => (
        <Link key={number} href={categoriesHref(number, view, search)} aria-current={page === number ? "page" : undefined} className={page === number ? "is-current" : ""}>
          {number}
        </Link>
      ))}
      <Link aria-label="Next page" aria-disabled={page >= pageCount} className={page >= pageCount ? "is-disabled" : ""} href={categoriesHref(Math.min(pageCount, page + 1), view, search)}>
        <i className="fas fa-chevron-right" aria-hidden="true" />
      </Link>
    </nav>
  );
}

export default function CategoryManager({
  categories,
  page,
  pageCount,
  total,
  search,
  canManage,
  view,
}: {
  categories: AdminCategoryPage[];
  page: number;
  pageCount: number;
  total: number;
  search: string;
  canManage: boolean;
  view: CategoryView;
}) {
  const router = useRouter();
  const [isSearching, startSearch] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const removeCategory = async (category: AdminCategoryPage) => {
    if (!window.confirm(`Delete “${category.name}”? This cannot be undone.`)) return;
    setPendingId(category.id);
    setError("");
    try {
      const result = await deleteCategory(category.id);
      if (!result.success) setError(result.message);
      else router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the category.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section className="Ika-category-manager">
      <header className="Ika-category-page-heading">
        <div><span>MENU ORGANIZATION</span><h1>Categories</h1><p>Organize your menu and control storefront visibility.</p></div>
        {canManage && <Link href="/admin/categories/new" className="Ika-category-add-button"><i className="fas fa-plus" aria-hidden="true" />Add category</Link>}
      </header>

      <div className="Ika-category-toolbar">
        <form
          className="Ika-category-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const query = String(formData.get("q") ?? "").trim();
            startSearch(() => router.replace(categoriesHref(1, view, query)));
          }}
        >
          <i className="fas fa-search" aria-hidden="true" />
          <input type="search" name="q" defaultValue={search} placeholder="Search categories" aria-label="Search categories" />
          <button type="submit" disabled={isSearching}>{isSearching ? "Searching…" : "Search"}</button>
        </form>
        <div className="Ika-category-toolbar-meta">
          <span>{total} {total === 1 ? "category" : "categories"}</span>
          <div className="Ika-category-view-toggle" role="group" aria-label="Category layout">
            <Link href={categoriesHref(page, "list", search)} aria-label="List view" aria-current={view === "list" ? "page" : undefined} className={view === "list" ? "is-active" : ""}><i className="fas fa-list" aria-hidden="true" /></Link>
            <Link href={categoriesHref(page, "cards", search)} aria-label="Card view" aria-current={view === "cards" ? "page" : undefined} className={view === "cards" ? "is-active" : ""}><i className="fas fa-th-large" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      {error && <p className="Ika-category-error" role="alert">{error}</p>}
      {categories.length === 0 ? (
        <div className="Ika-category-empty">
          <span><i className="fas fa-tags" aria-hidden="true" /></span>
          <h2>{search ? "No matching categories" : "Your categories are empty"}</h2>
          <p>{search ? "Try a different category name or slug." : "Add a category to start organizing your menu."}</p>
          {!search && canManage && <Link href="/admin/categories/new" className="Ika-category-add-button"><i className="fas fa-plus" aria-hidden="true" />Add category</Link>}
        </div>
      ) : view === "list" ? (
        <div className="Ika-category-list-scroll">
          <table className="Ika-category-list">
            <thead><tr><th>Category</th><th>Products</th><th>Order</th><th>Status</th>{canManage && <th aria-label="Actions" />}</tr></thead>
            <tbody>{categories.map((category) => (
              <tr key={category.id}>
                <td><div className="Ika-category-list-identity"><span><strong>{category.name}</strong><small>/{category.slug}</small></span></div></td>
                <td>{category._count.products}</td>
                <td>{category.sortOrder}</td>
                <td><span className={`Ika-category-status${category.isActive ? " is-active" : ""}`}>{category.isActive ? "Active" : "Hidden"}</span></td>
                {canManage && <td><CategoryActions category={category} pending={pendingId === category.id} onDelete={() => void removeCategory(category)} /></td>}
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : (
        <div className="Ika-category-card-grid">
          {categories.map((category) => (
            <article className="Ika-category-card" key={category.id}>
              <div className="Ika-category-card-content">
                <div className="Ika-category-card-title">
                  <div><h2>{category.name}</h2><small>/{category.slug}</small></div>
                  <span className={`Ika-category-status${category.isActive ? " is-active" : ""}`}>{category.isActive ? "Active" : "Hidden"}</span>
                </div>
                <p>{category.description || "No description"}</p>
                <div className="Ika-category-card-footer">
                  <span>{category._count.products} {category._count.products === 1 ? "product" : "products"} · Order {category.sortOrder}</span>
                  {canManage && <CategoryActions category={category} pending={pendingId === category.id} onDelete={() => void removeCategory(category)} />}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} view={view} search={search} />}
    </section>
  );
}
