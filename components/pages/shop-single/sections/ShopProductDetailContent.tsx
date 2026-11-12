"use client";

import { useRef, useState } from "react";
import { useStore } from "../../../store/StoreProvider";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { toLocalImageUrl } from "../../../../lib/image-url";

export default function ShopProductDetailContent() {
  const { locale } = useLocale();
  const featuredProduct = catalogProducts[0];
  const productName = translate(featuredProduct.name, locale);
  const productDescription = translate(featuredProduct.description, locale);
  const { addToCart, ready } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const relatedProductsRef = useRef<HTMLDivElement>(null);

  const scrollRelatedProducts = (direction: -1 | 1) => {
    const viewport = relatedProductsRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>(".Ika-related-card");
    if (!viewport || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(firstCard.parentElement!).columnGap) || 0;
    viewport.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  const handleAddToCart = async (sourceElement?: HTMLElement) => {
    if (!ready || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart({ ...featuredProduct, quantity });
      window.dispatchEvent(
        new CustomEvent("Ika:store-feedback", {
          detail: {
            action: "cart",
            message: translate(`${featuredProduct.name} added to cart`, locale),
            sourceElement,
            productImage: featuredProduct.image,
          },
        }),
      );
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("Ika:store-feedback", {
          detail: {
            action: "error",
            message:
              error instanceof Error
                ? error.message
                : "Could not add this item to your cart.",
          },
        }),
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className="validtheme-shop-single-area default-padding">
      <div className="container">
        <div className="Ika-product-detail">
          <div className="Ika-detail-gallery">
            <div className="Ika-detail-image">
              <span className="Ika-detail-badge">{translate("Guest favorite", locale)}</span>
              <img src={toLocalImageUrl(featuredProduct.image)} alt={productName} />
              <span className="Ika-detail-image-caption">{translate("Prepared fresh to order", locale)}</span>
            </div>
            <div className="Ika-detail-gallery-note">
              <i className="fas fa-leaf" aria-hidden="true" />
              <span>{translate("Fresh ingredients, thoughtfully prepared", locale)}</span>
            </div>
          </div>
          <div className="Ika-detail-info">
            <span className="Ika-detail-eyebrow">{translate("Fresh from our kitchen", locale)}</span>
            <h1>{productName}</h1>
            <div className="Ika-detail-rating" aria-label={translate("A customer favorite", locale)}>
              <span aria-hidden="true">★★★★★</span>
              <small>{translate("Customer favorite", locale)}</small>
            </div>
            <p className="Ika-detail-description">{productDescription}</p>
            <strong className="Ika-detail-price">${featuredProduct.price.toFixed(2)}</strong>
            <div className="Ika-detail-tags">
              {featuredProduct.tags.map((tag) => <span key={tag}>{translate(tag, locale)}</span>)}
            </div>
            <div className="Ika-detail-order-row">
              <div className="Ika-detail-quantity" role="group" aria-label={translate("Quantity", locale)}>
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                >
                  <i className="fas fa-minus" aria-hidden="true" />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((current) => current + 1)}
                >
                  <i className="fas fa-plus" aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                className="Ika-detail-add"
                disabled={!ready || isAdding}
                onClick={(event) => void handleAddToCart(event.currentTarget)}
              >
                <i className="fas fa-shopping-bag" aria-hidden="true" />
                <span>{isAdding ? translate("Adding...", locale) : translate("Add to cart", locale)}</span>
                <strong>${(featuredProduct.price * quantity).toFixed(2)}</strong>
              </button>
            </div>
            <p className="Ika-detail-service">
              <i className="fas fa-check" aria-hidden="true" /> {translate("Made fresh when you order", locale)}
            </p>
          </div>
        </div>
        <section className="Ika-related-section" aria-labelledby="Ika-related-title">
          <div className="Ika-related-heading">
            <h2 id="Ika-related-title">{translate("More from our sushi & seafood menu", locale)}</h2>
            <div className="Ika-related-controls" role="group" aria-label={translate("Related products carousel controls", locale)}>
              <button
                type="button"
                aria-label={translate("Show previous products", locale)}
                onClick={() => scrollRelatedProducts(-1)}
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={translate("Show next products", locale)}
                onClick={() => scrollRelatedProducts(1)}
              >
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="Ika-related-viewport"
            ref={relatedProductsRef}
            aria-label={translate("Related sushi and seafood products", locale)}
            tabIndex={0}
          >
            <div className="Ika-related-track">
              {catalogProducts.slice(1, 5).map((product) => (
                <div className="Ika-related-card" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
