"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useStore, type StoreProduct } from "./StoreProvider";
import OptimizedImage from "../ui/OptimizedImage";
import type { CatalogProduct } from "./products";
import { useLocale } from "../i18n/LocaleProvider";
import { translate } from "../i18n/translations";
import { getProductDescription, getProductName } from "./product-locale";

interface ProductCardProps {
  product: StoreProduct | CatalogProduct;
  removable?: boolean;
  className?: string;
  cartLabel?: string;
}

function notify(action: "cart" | "wishlist" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("Ika:store-feedback", { detail: { action, message } }),
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
  const { locale } = useLocale();
  const { cart, wishlist, ready, addToCart, toggleWishlist, removeFromWishlist } = useStore();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [busy, setBusy] = useState<"cart" | "wishlist" | null>(null);
  const detailsRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const liked = wishlist.some((item) => item.id === product.id);
  const description =
    "description" in product
      ? getProductDescription(product, locale)
      : translate("Freshly prepared with quality ingredients and served with care.", locale);
  const tags = "tags" in product ? product.tags.map((tag) => translate(tag, locale)) : [];
  const originalPrice = "originalPrice" in product ? product.originalPrice : undefined;
  const productName = getProductName(product, locale);
  const isInCart = cart.some((item) => item.id === product.id);

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
      notify("wishlist", translate(removable || liked ? `${productName} removed from wishlist` : `${productName} added to wishlist`, locale));
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "Could not update your wishlist.");
    } finally {
      setBusy(null);
    }
  };

  const handleAddToCart = async (sourceElement?: HTMLElement) => {
    if (!ready || busy) return;
    const sourceCard = sourceElement?.closest<HTMLElement>(".Ika-product-card") ?? sourceElement;
    const sourceImage = sourceCard?.querySelector<HTMLImageElement>(".Ika-product-image img") ?? sourceElement;
    const sourceImageRect = sourceImage?.getBoundingClientRect();
    const sourceRect = sourceImageRect
      ? {
          left: sourceImageRect.left,
          top: sourceImageRect.top,
          width: sourceImageRect.width,
          height: sourceImageRect.height,
        }
      : undefined;

    setBusy("cart");
    try {
      await addToCart({ ...product, quantity: 1 });
      window.dispatchEvent(
        new CustomEvent("Ika:store-feedback", {
          detail: {
            action: "cart",
            message: translate(`${productName} added to cart`, locale),
            sourceElement: sourceImage ?? sourceCard,
            sourceRect,
            productImage: product.image,
            suppressToast: true,
          },
        }),
      );
    } catch (error) {
      notify("error", error instanceof Error ? error.message : "Could not add this item to your cart.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className={`Ika-product-card${isInCart ? " is-in-cart" : ""} ${className}`.trim()}>
      <div className="Ika-product-image">
        <Link href="/shop-single" aria-label={`View ${productName}`}>
          <OptimizedImage src={product.image} alt={productName} width={720} height={720} sizes="(max-width: 575px) 50vw, (max-width: 991px) 50vw, 25vw" />
        </Link>
        {originalPrice !== undefined && (
          <span className="Ika-product-promo-badge">
            -{Math.round((1 - product.price / originalPrice) * 100)}%
          </span>
        )}
        <div className="Ika-product-tools">
          <button
            type="button"
            className="Ika-product-tool"
            aria-label={`View details for ${productName}`}
            onClick={() => setDetailsOpen(true)}
          >
            <i className="far fa-eye" aria-hidden="true" />
            <span className="Ika-product-tooltip">{translate("Quick view", locale)}</span>
          </button>
          {!isInCart && (
            <button
              type="button"
              className={`Ika-product-tool${busy === "cart" ? " is-busy" : ""}`}
              aria-label={`Add ${productName} to cart`}
              disabled={!ready || busy !== null}
              onClick={(event) => void handleAddToCart(event.currentTarget)}
            >
              <i className="fas fa-shopping-bag" aria-hidden="true" />
              <span className="Ika-product-tooltip">{translate("Add to cart", locale)}</span>
            </button>
          )}
          <button
            type="button"
            className={`Ika-product-tool Ika-product-like${liked ? " is-liked" : ""}${busy === "wishlist" ? " is-busy" : ""}`}
            aria-label={liked ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
            aria-pressed={liked}
            disabled={!ready || busy !== null}
            onClick={() => void handleWishlist()}
          >
            <i className={`${liked ? "fas" : "far"} fa-heart`} aria-hidden="true" />
            <span className="Ika-product-tooltip">{translate(liked ? "Remove from wishlist" : "Add to wishlist", locale)}</span>
          </button>
        </div>
      </div>
      <div className="Ika-product-content">
        <div className="Ika-product-tags">
          {tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <h3><Link href="/shop-single">{productName}</Link></h3>
        <p className="Ika-product-description">{description}</p>
        <div className="Ika-product-footer">
          <div className="Ika-product-price">
            <strong>{formatPrice(product.price)}</strong>
            {originalPrice !== undefined && (
              <del className="Ika-product-old-price">{formatPrice(originalPrice)}</del>
            )}
          </div>
          {removable && (
            <button
              type="button"
              className="Ika-product-remove"
              aria-label={`Remove ${productName} from wishlist`}
              title={`Remove ${productName} from wishlist`}
              onClick={() => void handleWishlist()}
            >
              <i className="fas fa-trash-alt" aria-hidden="true" />
              <span>{translate("Remove", locale)}</span>
            </button>
          )}
          {!isInCart && (
            <button
              type="button"
              className={`Ika-product-cart${busy === "cart" ? " is-busy" : ""}`}
              disabled={!ready || busy !== null}
              onClick={(event) => void handleAddToCart(event.currentTarget)}
            >
              <i className="fas fa-shopping-bag" aria-hidden="true" />
              <span>{busy === "cart" ? translate("Adding...", locale) : translate(cartLabel, locale)}</span>
            </button>
          )}
        </div>
      </div>
      {isInCart && (
        <div className="Ika-product-selected-actions">
          <button className="Ika-product-selected-state" type="button" disabled>
            <i className="fas fa-check" aria-hidden="true" />
            {translate("Selected", locale)}
          </button>
          <button
            className={`Ika-product-add-one-more${busy === "cart" ? " is-busy" : ""}`}
            type="button"
            disabled={!ready || busy !== null}
            onClick={(event) => void handleAddToCart(event.currentTarget)}
          >
            <i className="fas fa-plus" aria-hidden="true" />
            {busy === "cart" ? translate("Adding...", locale) : translate("Add one more", locale)}
          </button>
        </div>
      )}
      <dialog
        ref={detailsRef}
        className="Ika-product-dialog"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        onClose={() => setDetailsOpen(false)}
        onClick={(event) => {
          if (event.target === detailsRef.current) setDetailsOpen(false);
        }}
      >
        <button type="button" className="Ika-dialog-close" aria-label={translate("Close product details", locale)} onClick={() => setDetailsOpen(false)}>
          <i className="fas fa-times" aria-hidden="true" />
        </button>
        <OptimizedImage src={product.image} alt={productName} width={900} height={900} sizes="(max-width: 767px) 92vw, 48vw" />
        <div className="Ika-dialog-content">
          <span className="Ika-dialog-eyebrow">{translate("Fresh from our kitchen", locale)}</span>
          <h2 id={dialogTitleId}>{productName}</h2>
          <p id={dialogDescriptionId}>{description}</p>
          <strong>{formatPrice(product.price)}</strong>
          <button type="button" className="Ika-product-cart" disabled={!ready || busy !== null} onClick={(event) => void handleAddToCart(event.currentTarget)}>
            <i className="fas fa-shopping-bag" aria-hidden="true" /> {translate("Add to cart", locale)}
          </button>
          <Link
            className="Ika-dialog-details"
            href="/shop-single"
            onClick={() => setDetailsOpen(false)}
          >
            {translate("View full product details", locale)}
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </dialog>
    </article>
  );
}
