"use client";

import { useEffect, useState } from "react";
import { toLocalImageUrl } from "../../lib/image-url";

interface FeedbackMessage {
  id: number;
  action: "cart" | "wishlist" | "error";
  message: string;
}

interface StoreFeedbackDetail extends Omit<FeedbackMessage, "id"> {
  sourceElement?: Element;
  sourceRect?: { left: number; top: number; width: number; height: number };
  productImage?: string;
  suppressToast?: boolean;
}

const receivingTimers = new WeakMap<HTMLElement, number>();

function pulseCart(target: HTMLElement) {
  const previousTimer = receivingTimers.get(target);
  if (previousTimer !== undefined) window.clearTimeout(previousTimer);
  target.classList.remove("is-receiving");
  target.querySelector(".Ika-count-badge")?.classList.remove("is-popping");
  void target.offsetWidth;
  target.classList.add("is-receiving");
  target.querySelector(".Ika-count-badge")?.classList.add("is-popping");
  receivingTimers.set(target, window.setTimeout(() => {
    target.classList.remove("is-receiving");
    target.querySelector(".Ika-count-badge")?.classList.remove("is-popping");
    receivingTimers.delete(target);
  }, 650));
}

function animateCartFlight(
  source: Element,
  imageUrl?: string,
  sourceRectSnapshot?: StoreFeedbackDetail["sourceRect"],
) {
  const bottomCart = document.querySelector<HTMLElement>(".Ika-bottom-nav .Ika-bottom-cart");
  const desktopCart = document.querySelector<HTMLElement>(".Ika-desktop-cart");
  const bottomCartRect = bottomCart?.getBoundingClientRect();
  const bottomCartIsVisible = bottomCart
    && bottomCartRect
    && bottomCartRect.width > 0
    && bottomCartRect.height > 0
    && getComputedStyle(bottomCart).visibility !== "hidden";
  const target = bottomCartIsVisible
    ? bottomCart
    : desktopCart;
  if (!target || (!source.isConnected && !sourceRectSnapshot)) return;

  const sourceRect = sourceRectSnapshot ?? source.getBoundingClientRect();
  const targetIcon = target.querySelector<HTMLElement>("i") ?? target;
  const targetRect = targetIcon.getBoundingClientRect();
  if (sourceRect.width === 0 || targetRect.width === 0) return;

  const sourceX = sourceRect.left + sourceRect.width / 2;
  const sourceY = sourceRect.top + sourceRect.height / 2;
  const targetX = targetRect.left + targetRect.width / 2;
  const targetY = targetRect.top + targetRect.height / 2;
  const deltaX = targetX - sourceX;
  const deltaY = targetY - sourceY;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pulseCart(target);
    return;
  }

  const flight = document.createElement("div");
  flight.className = "Ika-cart-flight";
  flight.setAttribute("aria-hidden", "true");
  flight.style.left = `${sourceX}px`;
  flight.style.top = `${sourceY}px`;
  if (imageUrl) {
    const image = document.createElement("img");
    image.src = toLocalImageUrl(imageUrl);
    image.alt = "";
    flight.append(image);
  } else {
    const icon = document.createElement("i");
    icon.className = "fas fa-shopping-bag";
    flight.append(icon);
  }
  document.body.append(flight);

  const curveLift = Math.min(120, Math.max(36, Math.abs(deltaY) * 0.18));
  const controlX = sourceX + deltaX * 0.5;
  const controlY = sourceY + deltaY * 0.5 - curveLift;
  const flightKeyframes = [0, 0.25, 0.5, 0.75, 1].map((progress) => {
    const inverse = 1 - progress;
    const x = inverse * inverse * sourceX + 2 * inverse * progress * controlX + progress * progress * targetX;
    const y = inverse * inverse * sourceY + 2 * inverse * progress * controlY + progress * progress * targetY;

    return {
      left: `${x}px`,
      top: `${y}px`,
      opacity: progress < 0.72 ? 1 : (1 - progress) / 0.28,
      transform: `translate(-50%, -50%) scale(${1 - progress * 0.76})`,
      offset: progress,
    };
  });
  const animation = flight.animate(
    flightKeyframes,
    { duration: 1200, easing: "cubic-bezier(0.22, 0.72, 0.18, 1)", fill: "forwards" },
  );
  const finishFlight = () => {
    flight.remove();
    if (target.isConnected) pulseCart(target);
  };
  void animation.finished.then(finishFlight, () => flight.remove());
}

export function StoreFeedback() {
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  useEffect(() => {
    const handleFeedback = (event: Event) => {
      const { action, message: text, sourceElement, sourceRect, productImage, suppressToast } =
        (event as CustomEvent<StoreFeedbackDetail>).detail;
      if (action === "cart" && sourceElement) {
        animateCartFlight(sourceElement, productImage, sourceRect);
      }
      if (suppressToast) return;
      setMessage({ action, message: text, id: Date.now() });
    };
    window.addEventListener("Ika:store-feedback", handleFeedback);
    return () => window.removeEventListener("Ika:store-feedback", handleFeedback);
  }, []);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  const isError = message.action === "error";
  return (
    <div
      key={message.id}
      className={`Ika-toast${isError ? " is-error" : ""}`}
      role={isError ? "alert" : "status"}
      aria-live="polite"
    >
      <span className="Ika-toast-icon" aria-hidden="true">
        <i className={isError ? "fas fa-exclamation" : message.action === "cart" ? "fas fa-shopping-bag" : "fas fa-heart"} />
      </span>
      <span>{message.message}</span>
    </div>
  );
}
