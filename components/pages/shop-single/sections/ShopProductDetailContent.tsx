"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../../../store/StoreProvider";
import { ProductCard } from "../../../store/ProductCard";
import type { CatalogProduct } from "../../../store/products";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { formatProductPrice, getProductDescription, getProductName } from "../../../store/product-locale";
import { localizeCategoryName } from "../../../../features/categories/translations";
import { toLocalImageUrl } from "../../../../lib/image-url";

export default function ShopProductDetailContent({ products, productId }: { products: CatalogProduct[]; productId?: string }) {
  const { locale } = useLocale();
  const featuredProduct = productId
    ? products.find((product) => product.id === productId || product.slug === productId)
    : products[0];
  const productName = featuredProduct ? getProductName(featuredProduct, locale) : "";
  const productDescription = featuredProduct ? getProductDescription(featuredProduct, locale) : "";
  const { addToCart, ready } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(featuredProduct?.image ?? "");
  const relatedProductsRef = useRef<HTMLDivElement>(null);
  const relatedProducts = useMemo(() => {
    if (!featuredProduct) return [];
    const categoryIds = new Set(featuredProduct.categories);
    const related = products.filter((product) => product.id !== featuredProduct.id && product.categories.some((id) => categoryIds.has(id)));
    return [...related, ...products.filter((product) => product.id !== featuredProduct.id && !related.includes(product))].slice(0, 4);
  }, [featuredProduct, products]);
  const images = featuredProduct?.images?.length ? featuredProduct.images : featuredProduct?.image ? [featuredProduct.image] : [];
  const categoryNames = featuredProduct?.categoryDetails?.map((category) => localizeCategoryName(category, locale)) ?? [];

  useEffect(() => {
    setSelectedImage(featuredProduct?.image ?? "");
  }, [featuredProduct?.id, featuredProduct?.image]);

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
    if (!featuredProduct || !ready || isAdding || featuredProduct.isAvailable === false) return;
    setIsAdding(true);
    try {
      await addToCart({ ...featuredProduct, quantity });
      window.dispatchEvent(
        new CustomEvent("Ika:store-feedback", {
          detail: {
            action: "cart",
            message: translate(`${productName} added to cart`, locale),
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

  if (!featuredProduct) {
    return <section className="validtheme-shop-single-area default-padding"><div className="container"><p>{translate("No products are currently available.", locale)}</p></div></section>;
  }

  return (
    <section className="validtheme-shop-single-area default-padding">
      <div className="container">
        <div className="Ika-product-detail">
          <div className="Ika-detail-gallery">
            <div className="Ika-detail-image">
              {featuredProduct.isBestSeller && <span className="Ika-detail-badge">{translate("Bestseller", locale)}</span>}
              {selectedImage
                ? <img src={toLocalImageUrl(selectedImage)} alt={productName} />
                : <div className="Ika-product-image-placeholder"><i className="fas fa-utensils" aria-hidden="true" />{translate("Image unavailable", locale)}</div>}
              <span className="Ika-detail-image-caption">{translate("Prepared fresh to order", locale)}</span>
            </div>
            {images.length > 1 && <div className="Ika-detail-thumbnails" aria-label={translate("Product images", locale)}>{images.map((image) => <button type="button" key={image} aria-label={translate("Show product image", locale)} aria-pressed={selectedImage === image} onClick={() => setSelectedImage(image)}><img src={toLocalImageUrl(image)} alt="" /></button>)}</div>}
            <div className="Ika-detail-gallery-note">
              <i className="fas fa-leaf" aria-hidden="true" />
              <span>{translate("Fresh ingredients, thoughtfully prepared", locale)}</span>
            </div>
          </div>
          <div className="Ika-detail-info">
            <span className="Ika-detail-eyebrow">{translate("Fresh from our kitchen", locale)}</span>
            <h1>{productName}</h1>
            {categoryNames.length > 0 && <p className="Ika-product-category">{categoryNames.join(" · ")}</p>}
            <p className="Ika-detail-description">{productDescription}</p>
            <strong className="Ika-detail-price">{formatProductPrice(featuredProduct.price, featuredProduct.currency, locale)}</strong>
            {featuredProduct.originalPrice !== undefined && <del className="Ika-product-old-price">{formatProductPrice(featuredProduct.originalPrice, featuredProduct.currency, locale)}</del>}
            <div className="Ika-detail-tags">
              {featuredProduct.tags.map((tag) => <span key={tag}>{translate(tag, locale)}</span>)}
            </div>
            {featuredProduct.isAvailable === false && <p className="Ika-product-unavailable-copy">{translate("Unavailable", locale)}</p>}
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
                disabled={!ready || isAdding || featuredProduct.isAvailable === false}
                onClick={(event) => void handleAddToCart(event.currentTarget)}
              >
                <i className="fas fa-shopping-bag" aria-hidden="true" />
                <span>{isAdding ? translate("Adding...", locale) : translate("Add to cart", locale)}</span>
                <strong>{formatProductPrice(featuredProduct.price * quantity, featuredProduct.currency, locale)}</strong>
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
              {relatedProducts.map((product) => (
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
