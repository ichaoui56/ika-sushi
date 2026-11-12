"use client";

import { useEffect } from "react";
import { useStore, type StoreProduct } from "./StoreProvider";

function getProduct(card: Element, quantity = 1): StoreProduct | null {
  const title = card.querySelector(
    ".product-title a, .product-title, .info h4 a, .info h4",
  )?.textContent?.trim();
  if (!title) return null;

  const priceText =
    card.querySelector(
      ".product-caption .price span:last-child, .single-product-contents .price span:last-child, .price span:last-child, .item-price h5",
    )?.textContent ?? "";
  const priceMatch = priceText.replace(/,/g, "").match(/\d+(?:\.\d{1,2})?/);
  const image =
    card
      .querySelector(
        ".product-image img, .thumb img, .single-product-contents img, img",
      )
      ?.getAttribute("src") ?? "/assets/img/shop/1.png";

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name: title,
    price: priceMatch ? Number(priceMatch[0]) : 0,
    image,
    quantity,
  };
}

function findProductCard(action: Element): Element | null {
  return action.closest(
    ".product, .food-menu-style-one, .single-product-contents",
  );
}

export function StorefrontInteractionBridge() {
  const {
    wishlist,
    ready,
    addToCart,
    toggleWishlist,
  } = useStore();

  useEffect(() => {
    const syncWishlistButtons = () => {
      document
        .querySelectorAll(
          ".product .shop-action .wishlist a, .food-menu-style-one .item-price .right a, .single-product-contents .wishlist a, .Ika-card-like",
        )
        .forEach((button) => {
          const card = findProductCard(button);
          const product = card && getProduct(card);
          if (!product) return;
          const liked = wishlist.some((item) => item.id === product.id);
          const listItem = button.closest("li.wishlist") ?? button;
          listItem?.classList.toggle("Ika-is-wishlisted", liked);
          button.setAttribute("aria-label", liked ? "Remove from wishlist" : "Add to wishlist");
          button.setAttribute("aria-pressed", String(liked));
          button.setAttribute("title", liked ? "Remove from wishlist" : "Add to wishlist");
          if (button.matches(".Ika-card-like")) {
            const icon = button.querySelector("i");
            icon?.classList.toggle("far", !liked);
            icon?.classList.toggle("fas", liked);
          }
        });
    };
    syncWishlistButtons();

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const action = event.target.closest("a, button");
      if (!action) return;
      if (action.closest(".Ika-product-card")) return;

      const isWishlist = action.matches(
        ".shop-action li.wishlist a, .food-menu-style-one .item-price .right a, .single-product-contents .wishlist a, .Ika-card-like",
      );
      const isCart = action.matches(
        ".cart-btn, .shop-action li.cart a, .food-menu-style-one .button a, .single-product-contents .product-purchase-list > a",
      );
      if (!isWishlist && !isCart) return;

      event.preventDefault();
      const card = findProductCard(action);
      if (!card) return;

      const quantityInput = card.querySelector<HTMLInputElement>(
        ".product-purchase-list input[type='number']",
      );
      const quantity = Math.max(1, Number.parseInt(quantityInput?.value ?? "1", 10) || 1);
      const product = getProduct(card, quantity);
      if (!product) return;
      const sourceImage = card.querySelector<HTMLImageElement>(
        ".product-image img, .thumb img, .single-product-contents img, img",
      );
      const sourceImageRect = sourceImage?.getBoundingClientRect();
      const sourceFallbackRect = sourceImageRect?.width && sourceImageRect.height
        ? sourceImageRect
        : card.getBoundingClientRect();
      const sourceRect = {
        left: sourceFallbackRect.left,
        top: sourceFallbackRect.top,
        width: sourceFallbackRect.width,
        height: sourceFallbackRect.height,
      };

      if (isWishlist) {
        void toggleWishlist(product).catch(() => undefined);
      } else if (ready) {
        void addToCart(product)
          .then(() => {
            window.dispatchEvent(
              new CustomEvent("Ika:store-feedback", {
                detail: {
                  action: "cart",
                  message: `${product.name} added to cart`,
                  sourceElement: sourceImage ?? card,
                  sourceRect,
                  productImage: product.image,
                },
              }),
            );
          })
          .catch((error: unknown) => {
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
          });
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [addToCart, ready, toggleWishlist, wishlist]);

  return null;
}
