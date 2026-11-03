"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import "./HangingFeatureCards.css";

const features = [
  {
    image: "/assets/img/shop/Shushi.png",
    eyebrow: "Sushi selection",
    title: "Handcrafted Sushi",
    description:
      "Fresh sushi made with carefully seasoned rice and premium seafood.",
  },
  {
    image: "/assets/img/shop/Prawns-Fry.png",
    eyebrow: "Fresh from the sea",
    title: "Seafood Favorites",
    description:
      "Enjoy succulent prawns and ocean-fresh favorites prepared to order.",
  },
  {
    image: "/assets/img/shop/Salmon-Fry.png",
    eyebrow: "Chef's craft",
    title: "Made by Our Chefs",
    description:
      "Every plate is prepared with care for a delicious balance of flavor.",
  },
  {
    image: "/assets/img/shop/Crustaceans-such-as-lobsters.png",
    eyebrow: "Quality first",
    title: "Premium Seafood",
    description:
      "We select quality seafood and prepare it fresh to bring out its natural flavor.",
  },
];

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

function HangingFeatureCard({
  image,
  eyebrow,
  title,
  description,
  index,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  index: number;
}) {
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGSVGElement>(null);
  const cardWidth = useRef(1);
  const lastPointer = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const activePointer = useRef<number | null>(null);

  const renderCardPosition = (nextPosition: { x: number; y: number }) => {
    positionRef.current = nextPosition;
    const card = cardRef.current;
    const rope = ropeRef.current;
    if (!card || !rope) return;

    const tiltX = clamp(-nextPosition.y / 8, -12, 12);
    const tiltY = clamp(-nextPosition.x / cardWidth.current / 2, -14, 14);
    const swing = clamp((nextPosition.x / cardWidth.current) * 24, -22, 22);
    card.style.transform = `translate3d(${nextPosition.x}px, ${nextPosition.y}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${swing}deg)`;

    const slot = card.parentElement;
    if (!slot) return;
    const slotBounds = slot.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const ropeBounds = rope.getBoundingClientRect();
    const viewBoxHeight = Number(rope.viewBox.baseVal.height) || 400;
    const endX = clamp(
      ((cardBounds.left + cardBounds.width / 2 - slotBounds.left) /
        slotBounds.width) *
        100,
      5,
      95,
    );
    const endY = clamp(
      ((cardBounds.top - ropeBounds.top) / ropeBounds.height) * viewBoxHeight,
      1,
      viewBoxHeight - 1,
    );
    const ropePath = `M 50 0 C ${50 + (endX - 50) * 0.15} ${endY * 0.45}, ${50 + (endX - 50) * 0.9} ${endY * 0.72}, ${endX} ${endY}`;
    rope.querySelectorAll("path").forEach((path) => {
      path.setAttribute("d", ropePath);
    });
  };

  const returnToRest = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      velocityRef.current = { x: 0, y: 0 };
      renderCardPosition({ x: 0, y: 0 });
      return;
    }

    let previousTime = performance.now();
    const animate = (time: number) => {
      const frameScale = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;

      const current = positionRef.current;
      const velocity = velocityRef.current;
      velocity.x =
        (velocity.x - current.x * 0.085 * frameScale) *
        Math.pow(0.84, frameScale);
      velocity.y =
        (velocity.y - current.y * 0.11 * frameScale) *
        Math.pow(0.82, frameScale);

      const next = {
        x: current.x + velocity.x * frameScale,
        y: current.y + velocity.y * frameScale,
      };

      if (
        Math.abs(next.x) < 0.2 &&
        Math.abs(next.y) < 0.2 &&
        Math.abs(velocity.x) < 0.12 &&
        Math.abs(velocity.y) < 0.12
      ) {
        velocityRef.current = { x: 0, y: 0 };
        animationFrame.current = null;
        renderCardPosition({ x: 0, y: 0 });
        return;
      }

      renderCardPosition(next);
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const updateRopeLayout = () => {
      const rope = ropeRef.current;
      if (!rope) return;

      const mobile = window.matchMedia("(max-width: 767px)").matches;
      rope.setAttribute("viewBox", mobile ? "0 0 100 100" : "0 0 100 400");
      renderCardPosition(positionRef.current);
    };

    updateRopeLayout();
    window.addEventListener("resize", updateRopeLayout);
    const resizeObserver = new ResizeObserver(updateRopeLayout);
    if (cardRef.current?.parentElement) {
      resizeObserver.observe(cardRef.current.parentElement);
    }

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerId !== activePointer.current) return;

      const deltaX = clamp(event.clientX - lastPointer.current.x, -40, 40);
      const deltaY = clamp(event.clientY - lastPointer.current.y, -40, 40);
      lastPointer.current = { x: event.clientX, y: event.clientY };
      velocityRef.current = { x: deltaX, y: deltaY };

      renderCardPosition({
        x: clamp(
          positionRef.current.x + deltaX,
          -cardWidth.current * 0.7,
          cardWidth.current * 0.7,
        ),
        y: clamp(positionRef.current.y + deltaY, -100, 140),
      });
    };

    const handlePointerUp = (event: globalThis.PointerEvent) => {
      if (event.pointerId !== activePointer.current) return;

      activePointer.current = null;
      setDragging(false);
      returnToRest();
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", updateRopeLayout);
      resizeObserver.disconnect();
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || activePointer.current !== null) return;

    event.preventDefault();
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }
    velocityRef.current = { x: 0, y: 0 };
    activePointer.current = event.pointerId;
    cardWidth.current = event.currentTarget.getBoundingClientRect().width;
    lastPointer.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const movements: Record<string, { x: number; y: number }> = {
      ArrowLeft: { x: -12, y: 0 },
      ArrowRight: { x: 12, y: 0 },
      ArrowUp: { x: 0, y: -12 },
      ArrowDown: { x: 0, y: 12 },
    };
    const movement = movements[event.key];
    if (!movement) return;

    event.preventDefault();
    const bounds = event.currentTarget.getBoundingClientRect();
    cardWidth.current = bounds.width;
    renderCardPosition({
      x: clamp(
        positionRef.current.x + movement.x,
        -bounds.width * 0.7,
        bounds.width * 0.7,
      ),
      y: clamp(positionRef.current.y + movement.y, -100, 140),
    });
    velocityRef.current = { x: movement.x * 0.2, y: movement.y * 0.2 };
    window.setTimeout(returnToRest, 120);
  };

  const initialEndY = 180 + (index % 2 === 0 ? 60 : 0);
  const initialRopePath = `M 50 0 C 50 ${initialEndY * 0.45}, 50 ${initialEndY * 0.72}, 50 ${initialEndY}`;

  return (
    <div className="col-lg-3 col-md-6 feature-one-single hanging-feature-slot">
      <svg
        ref={ropeRef}
        className="hanging-feature-string"
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="hanging-feature-rope-shadow" d={initialRopePath} />
        <path className="hanging-feature-rope-core" d={initialRopePath} />
        <path className="hanging-feature-rope-twist" d={initialRopePath} />
        <circle className="hanging-feature-rope-anchor" cx="50" cy="0" r="3" />
      </svg>

      <div
        ref={cardRef}
        className={`feature-style-one-item hanging-feature-card${dragging ? " is-dragging" : ""}`}
        role="group"
        tabIndex={0}
        aria-label={title}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
      >
        <img src={image} alt={title} draggable={false} />
        <span className="hanging-feature-eyebrow">{eyebrow}</span>
        <h4>{title}</h4>
        <p>{description}</p>
        <span className="hanging-feature-hint" aria-hidden="true">
          Drag to move
        </span>
      </div>
    </div>
  );
}

export default function HangingFeatureCards({
  padding = "default-padding-top",
}: {
  padding?: "default-padding" | "default-padding-top";
}) {
  return (
    <section
      className={`feature-style-one-area ${padding} feature-hanging-area`}
    >
      <div className="container">
        <div className="row">
          {features.map((feature, index) => (
            <HangingFeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
