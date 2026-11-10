"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

interface ProductCarouselControlsProps {
  label: string;
  children: ReactNode;
}

export function ProductCarouselControls({ label, children }: ProductCarouselControlsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => () => cleanupRef.current?.(), []);

  const getCarouselMetrics = () => {
    const track = marqueeRef.current?.querySelector<HTMLElement>(".foodu-picks-track");
    const animation = track?.getAnimations()[0];
    const duration = Number(animation?.effect?.getTiming().duration);
    const distance = (track?.scrollWidth ?? 0) / 2;
    if (!track || !animation || !Number.isFinite(duration) || duration <= 0 || distance <= 0) {
      return null;
    }

    return { animation, duration, distance };
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;

    const metrics = getCarouselMetrics();
    if (!metrics || !marqueeRef.current) return;

    cleanupRef.current?.();
    const drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTime: Number(metrics.animation.currentTime ?? 0),
      distance: metrics.distance,
      duration: metrics.duration,
      animation: metrics.animation,
      moved: false,
    };
    marqueeRef.current.classList.add("is-pointer-down");

    const cleanup = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishPointer);
      window.removeEventListener("pointercancel", finishPointer);
      marqueeRef.current?.classList.remove("is-pointer-down", "is-dragging");
      cleanupRef.current = null;
    };

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (moveEvent.pointerId !== drag.pointerId) return;

      const deltaX = moveEvent.clientX - drag.startX;
      const deltaY = moveEvent.clientY - drag.startY;
      if (!drag.moved && Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 5) return;
      if (!drag.moved && Math.abs(deltaY) > Math.abs(deltaX)) {
        cleanup();
        return;
      }

      drag.moved = true;
      marqueeRef.current?.classList.add("is-dragging");
      moveEvent.preventDefault();
      const direction = document.documentElement.dir === "rtl" ? -1 : 1;
      const nextTime = drag.startTime + (deltaX / drag.distance) * drag.duration * direction;
      drag.animation.currentTime = ((nextTime % drag.duration) + drag.duration) % drag.duration;
    };

    const finishPointer = (upEvent: PointerEvent) => {
      if (upEvent.pointerId !== drag.pointerId) return;
      if (drag.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
      cleanup();
    };

    cleanupRef.current = cleanup;
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", finishPointer);
    window.addEventListener("pointercancel", finishPointer);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <div
      ref={marqueeRef}
      className="foodu-picks-marquee"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerDown={handlePointerDown}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      {children}
    </div>
  );
}