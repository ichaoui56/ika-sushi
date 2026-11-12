"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProduct } from "../../features/products/actions";
import { toLocalImageUrl } from "../../lib/image-url";
import ProductEditor from "./ProductEditor";
import type { AdminCategoryOption, AdminProductRecord } from "./product-types";
import "./ProductManagement.css";

type ProductView = "list" | "cards";
type DrawerState = { product: AdminProductRecord; mode: "details" | "edit" } | null;

function productsHref(page: number, view: ProductView, search: string) {
  const params = new URLSearchParams({ page: String(page), view });
  if (search) params.set("q", search);
  return `/admin/products?${params.toString()}`;
}

function formatMoney(minor: number) {
  return `${new Intl.NumberFormat("fr-MA", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(minor / 100)} MAD`;
}

function ProductBadges({ product }: { product: AdminProductRecord }) {
  return (
    <div className="Ika-product-badges">
      <span className={product.isAvailable ? "is-available" : "is-unavailable"}>{product.isAvailable ? "En ligne" : "Masqué"}</span>
      {product.isOnPromotion && <span className="is-promotion">Promotion</span>}
      {product.isFeaturedBestSeller && <span className="is-featured">Best seller</span>}
    </div>
  );
}

function ProductImage({ product, className = "" }: { product: AdminProductRecord; className?: string }) {
  const image = product.images.find((item) => item.isPrimary) ?? product.images[0];
  return (
    <div className={`Ika-product-admin-image ${className}`.trim()}>
      {image ? <img src={toLocalImageUrl(image.url)} alt="" /> : <span aria-hidden="true"><i className="fas fa-fish" /></span>}
    </div>
  );
}

function ProductActions({
  product,
  pending,
  onDetails,
  onEdit,
  onDelete,
}: {
  product: AdminProductRecord;
  pending: boolean;
  onDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="Ika-product-actions">
      <button type="button" title="Voir les détails" aria-label={`Voir les détails de ${product.name}`} onClick={onDetails}>
        <i className="far fa-eye" aria-hidden="true" />
      </button>
      <button type="button" title="Modifier" aria-label={`Modifier ${product.name}`} onClick={onEdit}>
        <i className="fas fa-pen" aria-hidden="true" />
      </button>
      <button type="button" title="Supprimer définitivement" aria-label={`Supprimer définitivement ${product.name}`} disabled={pending} onClick={onDelete}>
        <i className="far fa-trash-alt" aria-hidden="true" />
      </button>
    </div>
  );
}

function ProductDrawer({
  drawer,
  categories,
  pending,
  onClose,
  onEdit,
  onDelete,
  onSaved,
}: {
  drawer: Exclude<DrawerState, null>;
  categories: AdminCategoryOption[];
  pending: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSaved: () => void;
}) {
  const { product, mode } = drawer;
  return (
    <div className="Ika-product-drawer-layer">
      <button className="Ika-product-drawer-scrim" type="button" aria-label="Close product panel" onClick={onClose} />
      <aside className="Ika-product-drawer" role="dialog" aria-modal="true" aria-labelledby="Ika-product-drawer-title">
        <header className="Ika-product-drawer-header">
          <div><span>{mode === "edit" ? "PRODUCT EDITOR" : "PRODUCT DETAILS"}</span><h2 id="Ika-product-drawer-title">{product.name}</h2></div>
          <button type="button" aria-label="Close product panel" onClick={onClose}><i className="fas fa-times" aria-hidden="true" /></button>
        </header>
        {mode === "edit" ? (
          <div className="Ika-product-drawer-content">
            <ProductEditor key={product.id} product={product} categories={categories} onSaved={onSaved} />
          </div>
        ) : (
          <>
            <div className="Ika-product-drawer-content">
              <ProductImage product={product} className="is-detail" />
              <ProductBadges product={product} />
              <div className="Ika-product-detail-prices">
                <strong>{formatMoney(product.priceMinor)}</strong>
                {product.originalPriceMinor && <del>{formatMoney(product.originalPriceMinor)}</del>}
                {product.discountPercent && <span>-{product.discountPercent}%</span>}
              </div>
              <dl className="Ika-product-detail-list">
                <div><dt>Slug</dt><dd>{product.slug}</dd></div>
                <div><dt>Categories</dt><dd>{product.categories.map(({ category }) => category.name).join(", ") || "—"}</dd></div>
                <div><dt>Short description</dt><dd>{product.shortDescription || "—"}</dd></div>
                <div><dt>Description</dt><dd>{product.description}</dd></div>
                <div><dt>Tags</dt><dd>{product.tags.join(", ") || "—"}</dd></div>
                <div><dt>Images</dt><dd>{product.images.length}</dd></div>
              </dl>
            </div>
            <footer className="Ika-product-drawer-footer">
              <button type="button" className="Ika-product-delete" disabled={pending} onClick={onDelete}><i className="far fa-trash-alt" aria-hidden="true" />Delete permanently</button>
              <button type="button" className="Ika-product-edit" onClick={onEdit}><i className="fas fa-pen" aria-hidden="true" />Edit product</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Pagination({ page, pageCount, view, search }: { page: number; pageCount: number; view: ProductView; search: string }) {
  if (view === "cards") {
    const firstPage = Math.max(1, Math.min(page - 2, pageCount - 4));
    const pages = Array.from({ length: Math.min(5, pageCount) }, (_, index) => firstPage + index);
    return (
      <nav className="Ika-product-pagination is-cards" aria-label="Product pages">
        <Link aria-label="Previous page" aria-disabled={page <= 1} className={page <= 1 ? "is-disabled" : ""} href={productsHref(Math.max(1, page - 1), view, search)}><i className="fas fa-chevron-left" /></Link>
        {pages.map((number) => <Link key={number} href={productsHref(number, view, search)} aria-current={page === number ? "page" : undefined} className={page === number ? "is-current" : ""}>{number}</Link>)}
        <Link aria-label="Next page" aria-disabled={page >= pageCount} className={page >= pageCount ? "is-disabled" : ""} href={productsHref(Math.min(pageCount, page + 1), view, search)}><i className="fas fa-chevron-right" /></Link>
      </nav>
    );
  }

  return (
    <nav className="Ika-product-pagination is-list" aria-label="Product pages">
      <span>Page <strong>{page}</strong> of {pageCount}</span>
      <div>
        <Link aria-label="Previous page" aria-disabled={page <= 1} className={page <= 1 ? "is-disabled" : ""} href={productsHref(Math.max(1, page - 1), view, search)}><i className="fas fa-arrow-left" />Previous</Link>
        <Link aria-label="Next page" aria-disabled={page >= pageCount} className={page >= pageCount ? "is-disabled" : ""} href={productsHref(Math.min(pageCount, page + 1), view, search)}>Next<i className="fas fa-arrow-right" /></Link>
      </div>
    </nav>
  );
}

export default function ProductManager({
  products,
  categories,
  page,
  pageCount,
  total,
  search,
  view,
}: {
  products: AdminProductRecord[];
  categories: AdminCategoryOption[];
  page: number;
  pageCount: number;
  total: number;
  search: string;
  view: ProductView;
}) {
  const router = useRouter();
  const [isSearching, startSearch] = useTransition();
  const [drawer, setDrawer] = useState<DrawerState>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const permanentlyDelete = async (product: AdminProductRecord) => {
    if (!window.confirm(`Delete “${product.name}” permanently? This cannot be undone.`)) return;
    setPendingId(product.id);
    setError("");
    try {
      const result = await deleteProduct(product.id);
      if (!result.success) setError(result.message);
      else {
        setDrawer(null);
        router.refresh();
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete the product.");
    } finally {
      setPendingId(null);
    }
  };

  return (
    <section className="Ika-product-manager">
      <header className="Ika-product-page-heading">
        <div><span>CATALOG MANAGEMENT</span><h1>Products</h1><p>Manage your menu, prices, and storefront visibility.</p></div>
        <Link href="/admin/products/new" className="Ika-product-add-button"><i className="fas fa-plus" aria-hidden="true" />Add product</Link>
      </header>

      <div className="Ika-product-toolbar">
        <form
          className="Ika-product-search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const query = String(formData.get("q") ?? "").trim();
            const params = new URLSearchParams({ page: "1", view });
            if (query) params.set("q", query);
            startSearch(() => router.replace(`/admin/products?${params.toString()}`));
          }}
        >
          <i className="fas fa-search" aria-hidden="true" />
          <input type="search" name="q" defaultValue={search} placeholder="Search products" aria-label="Search products" />
          <button type="submit" disabled={isSearching}>{isSearching ? "Searching…" : "Search"}</button>
        </form>
        <div className="Ika-product-toolbar-meta"><span>{total} {total === 1 ? "product" : "products"}</span>
          <div className="Ika-product-view-toggle" role="group" aria-label="Product layout">
            <Link href={productsHref(page, "list", search)} aria-label="List view" aria-current={view === "list" ? "page" : undefined} className={view === "list" ? "is-active" : ""}><i className="fas fa-list" aria-hidden="true" /></Link>
            <Link href={productsHref(page, "cards", search)} aria-label="Card view" aria-current={view === "cards" ? "page" : undefined} className={view === "cards" ? "is-active" : ""}><i className="fas fa-th-large" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      {error && <p className="Ika-product-page-error" role="alert">{error}</p>}
      {products.length === 0 ? (
        <div className="Ika-product-empty"><span><i className="fas fa-box-open" aria-hidden="true" /></span><h2>{search ? "No matching products" : "Your catalog is empty"}</h2><p>{search ? "Try a different product name or slug." : "Add your first product to start building the menu."}</p>{!search && <Link href="/admin/products/new" className="Ika-product-add-button"><i className="fas fa-plus" aria-hidden="true" />Add product</Link>}</div>
      ) : view === "list" ? (
        <div className="Ika-product-list-scroll">
          <table className="Ika-product-list">
            <thead><tr><th>Product</th><th>Categories</th><th>Price</th><th>Visibility</th><th aria-label="Actions" /></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product.id}>
                <td><button className="Ika-product-list-identity" type="button" onClick={() => setDrawer({ product, mode: "details" })}><ProductImage product={product} /><span><strong>{product.name}</strong><small>/{product.slug}</small></span></button></td>
                <td><span className="Ika-product-category-text">{product.categories.map(({ category }) => category.name).join(", ") || "—"}</span></td>
                <td><span className="Ika-product-list-price">{formatMoney(product.priceMinor)}</span>{product.originalPriceMinor && <del>{formatMoney(product.originalPriceMinor)}</del>}</td>
                <td><ProductBadges product={product} /></td>
                <td><ProductActions product={product} pending={pendingId === product.id} onDetails={() => setDrawer({ product, mode: "details" })} onEdit={() => setDrawer({ product, mode: "edit" })} onDelete={() => void permanentlyDelete(product)} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : (
        <div className="Ika-product-card-grid">
          {products.map((product) => (
            <article className="Ika-product-admin-card" key={product.id}>
              <button className="Ika-product-card-open" type="button" onClick={() => setDrawer({ product, mode: "details" })} aria-label={`View details for ${product.name}`}>
                <ProductImage product={product} className="is-card" />
                <span className="Ika-product-card-badge"><ProductBadges product={product} /></span>
              </button>
              <div className="Ika-product-card-content">
                <div><span className="Ika-product-card-categories">{product.categories.map(({ category }) => category.name).join(" · ") || "Uncategorized"}</span><h2>{product.name}</h2><small>/{product.slug}</small></div>
                <div className="Ika-product-card-price"><strong>{formatMoney(product.priceMinor)}</strong>{product.originalPriceMinor && <del>{formatMoney(product.originalPriceMinor)}</del>}{product.discountPercent && <span>-{product.discountPercent}%</span>}</div>
                <div className="Ika-product-card-footer"><span>{product.images.length} {product.images.length === 1 ? "image" : "images"}</span><ProductActions product={product} pending={pendingId === product.id} onDetails={() => setDrawer({ product, mode: "details" })} onEdit={() => setDrawer({ product, mode: "edit" })} onDelete={() => void permanentlyDelete(product)} /></div>
              </div>
            </article>
          ))}
        </div>
      )}

      {pageCount > 1 && <Pagination page={page} pageCount={pageCount} view={view} search={search} />}
      {drawer && <ProductDrawer drawer={drawer} categories={categories} pending={pendingId === drawer.product.id} onClose={() => setDrawer(null)} onEdit={() => setDrawer({ ...drawer, mode: "edit" })} onDelete={() => void permanentlyDelete(drawer.product)} onSaved={() => { setDrawer(null); router.refresh(); }} />}
    </section>
  );
}
