"use client";

import { useRef, useState } from "react";
import { useStore } from "../../../store/StoreProvider";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function ShopProductDetailContent() {
  const featuredProduct = catalogProducts[0];
  const { addToCart, ready } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const relatedProductsRef = useRef<HTMLDivElement>(null);

  const scrollRelatedProducts = (direction: -1 | 1) => {
    const viewport = relatedProductsRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>(".foodu-related-card");
    if (!viewport || !firstCard) return;
    const gap = Number.parseFloat(getComputedStyle(firstCard.parentElement!).columnGap) || 0;
    viewport.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  const handleAddToCart = async () => {
    if (!ready || isAdding) return;
    setIsAdding(true);
    try {
      await addToCart({ ...featuredProduct, quantity });
      window.dispatchEvent(
        new CustomEvent("foodu:store-feedback", {
          detail: {
            action: "cart",
            message: `${featuredProduct.name} added to cart`,
          },
        }),
      );
    } catch (error) {
      window.dispatchEvent(
        new CustomEvent("foodu:store-feedback", {
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
        <div className="foodu-product-detail">
          <div className="foodu-detail-gallery">
            <div className="foodu-detail-image">
              <span className="foodu-detail-badge">Guest favorite</span>
              <img src={featuredProduct.image} alt={featuredProduct.name} />
              <span className="foodu-detail-image-caption">Prepared fresh to order</span>
            </div>
            <div className="foodu-detail-gallery-note">
              <i className="fas fa-leaf" aria-hidden="true" />
              <span>Fresh ingredients, thoughtfully prepared</span>
            </div>
          </div>
          <div className="foodu-detail-info">
            <span className="foodu-detail-eyebrow">Fresh from our kitchen</span>
            <h1>{featuredProduct.name}</h1>
            <div className="foodu-detail-rating" aria-label="A customer favorite">
              <span aria-hidden="true">★★★★★</span>
              <small>Customer favorite</small>
            </div>
            <p className="foodu-detail-description">{featuredProduct.description}</p>
            <strong className="foodu-detail-price">${featuredProduct.price.toFixed(2)}</strong>
            <div className="foodu-detail-tags">
              {featuredProduct.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="foodu-detail-order-row">
              <div className="foodu-detail-quantity" role="group" aria-label="Quantity">
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
                className="foodu-detail-add"
                disabled={!ready || isAdding}
                onClick={() => void handleAddToCart()}
              >
                <i className="fas fa-shopping-bag" aria-hidden="true" />
                <span>{isAdding ? "Adding..." : "Add to cart"}</span>
                <strong>${(featuredProduct.price * quantity).toFixed(2)}</strong>
              </button>
            </div>
            <p className="foodu-detail-service">
              <i className="fas fa-check" aria-hidden="true" /> Made fresh when you order
            </p>
          </div>
        </div>
        <section className="foodu-related-section" aria-labelledby="foodu-related-title">
          <div className="foodu-related-heading">
            <h2 id="foodu-related-title">More from our sushi &amp; seafood menu</h2>
            <div className="foodu-related-controls" role="group" aria-label="Related products carousel controls">
              <button
                type="button"
                aria-label="Show previous products"
                onClick={() => scrollRelatedProducts(-1)}
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Show next products"
                onClick={() => scrollRelatedProducts(1)}
              >
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="foodu-related-viewport"
            ref={relatedProductsRef}
            aria-label="Related sushi and seafood products"
            tabIndex={0}
          >
            <div className="foodu-related-track">
              {catalogProducts.slice(1, 5).map((product) => (
                <div className="foodu-related-card" key={product.id}>
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
