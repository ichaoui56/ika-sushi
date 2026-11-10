"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useStore, type StoreProduct } from "./StoreProvider";
import type { CatalogProduct } from "./products";

interface ProductCardProps {
  product: StoreProduct | CatalogProduct;
  removable?: boolean;
  className?: string;
  cartLabel?: string;
}

function notify(action: "cart" | "wishlist" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("foodu:store-feedback", { detail: { action, message } }),
  );
}

const formatPrice = (price: number) =>
  `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function ProductCard({
  product,
  removable = false,
  className = "",
  cartLabel = "Add to cart",
}: ProductCardProps) {
  const { wishlist, ready, addToCart, toggleWishlist, removeFromWishlist } = useStore();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [busy, setBusy] = useState<"cart" | "wishlist" | null>(null);
  const detailsRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const liked = wishlist.some((item) => item.id === product.id);
  const description =
    "description" in product
      ? product.description
      : "Freshly prepared with quality ingredients and served with care.";
  const tags = "tags" in product ? product.tags : [];
  const originalPrice = "originalPrice" in product ? product.originalPrice : undefined;

  useEffect(() => {
    const dialog = detailsRef.current;
    if (!dialog) return;
    if (detailsOpen && !dialog.open) dialog.showModal();
    if (!detailsOpen && dialog.open) dialog.close();
  }, [detailsOpen]);

  const handleWishlist = async () => {
    if (!ready || busy) return;
    setBusy("wishlist");
    try {
      if (removable) await removeFromWishlist(product.id);
      else await toggleWishlist(product);
      notify("wishlist", removable || liked ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "Could not update your wishlist.");
    } finally {
      setBusy(null);
    }
  };

  const handleAddToCart = async () => {
    if (!ready || busy) return;
    setBusy("cart");
    try {
      await addToCart({ ...product, quantity: 1 });
      notify("cart", `${product.name} added to cart`);
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "Could not add this item to your cart.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className={`foodu-product-card ${className}`.trim()}>
      <div className="foodu-product-image">
        <Link href="/shop-single" aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {originalPrice !== undefined && (
          <span className="foodu-product-promo-badge">
            -{Math.round((1 - product.price / originalPrice) * 100)}%
          </span>
        )}
        <div className="foodu-product-tools">
          <button
            type="button"
            className="foodu-product-tool"
            aria-label={`View details for ${product.name}`}
            onClick={() => setDetailsOpen(true)}
          >
            <i className="far fa-eye" aria-hidden="true" />
            <span className="foodu-product-tooltip">Quick view</span>
          </button>
          <button
            type="button"
            className={`foodu-product-tool${busy === "cart" ? " is-busy" : ""}`}
            aria-label={`Add ${product.name} to cart`}
            disabled={!ready || busy !== null}
            onClick={() => void handleAddToCart()}
          >
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <span className="foodu-product-tooltip">Add to cart</span>
          </button>
          <button
            type="button"
            className={`foodu-product-tool foodu-product-like${liked ? " is-liked" : ""}${busy === "wishlist" ? " is-busy" : ""}`}
            aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={liked}
            disabled={!ready || busy !== null}
            onClick={() => void handleWishlist()}
          >
            <i className={`${liked ? "fas" : "far"} fa-heart`} aria-hidden="true" />
            <span className="foodu-product-tooltip">{liked ? "Remove from wishlist" : "Add to wishlist"}</span>
          </button>
        </div>
      </div>
      <div className="foodu-product-content">
        <div className="foodu-product-tags">
          {tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <h3><Link href="/shop-single">{product.name}</Link></h3>
        <p className="foodu-product-description">{description}</p>
        <div className="foodu-product-footer">
          <strong>{formatPrice(product.price)}</strong>
          {originalPrice !== undefined && (
            <del className="foodu-product-old-price">{formatPrice(originalPrice)}</del>
          )}
          {removable && (
            <button type="button" className="foodu-product-remove" onClick={() => void handleWishlist()}>
              Remove
            </button>
          )}
          <button
            type="button"
            className={`foodu-product-cart${busy === "cart" ? " is-busy" : ""}`}
            disabled={!ready || busy !== null}
            onClick={() => void handleAddToCart()}
          >
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <span>{busy === "cart" ? "Adding..." : cartLabel}</span>
          </button>
        </div>
      </div>
      <dialog
        ref={detailsRef}
        className="foodu-product-dialog"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        onClose={() => setDetailsOpen(false)}
        onClick={(event) => {
          if (event.target === detailsRef.current) setDetailsOpen(false);
        }}
      >
        <button type="button" className="foodu-dialog-close" aria-label="Close product details" onClick={() => setDetailsOpen(false)}>
          <i className="fas fa-times" aria-hidden="true" />
        </button>
        <img src={product.image} alt={product.name} />
        <div className="foodu-dialog-content">
          <span className="foodu-dialog-eyebrow">Fresh from our kitchen</span>
          <h2 id={dialogTitleId}>{product.name}</h2>
          <p id={dialogDescriptionId}>{description}</p>
          <strong>{formatPrice(product.price)}</strong>
          <button type="button" className="foodu-product-cart" disabled={!ready || busy !== null} onClick={() => void handleAddToCart()}>
            <i className="fas fa-shopping-bag" aria-hidden="true" /> Add to cart
          </button>
          <Link
            className="foodu-dialog-details"
            href="/shop-single"
            onClick={() => setDetailsOpen(false)}
          >
            View full product details
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </article>
  );
}
