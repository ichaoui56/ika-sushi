"use client";

import { useRef, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import "./HomeBlogSection.css";

const posts = [
  {
    image: "/assets/img/shop/Shushi.png",
    imageAlt: "A selection of handcrafted sushi",
    category: "Sushi craft",
    date: "18 March, 2024",
    dateTime: "2024-03-18",
    title: "How our chefs craft the perfect sushi roll",
    readTime: "4 min read",
  },
  {
    image: "/assets/img/shop/Salmon-Fry.png",
    imageAlt: "Freshly prepared salmon",
    category: "Fresh catch",
    date: "25 April, 2024",
    dateTime: "2024-04-25",
    title: "Choosing the freshest seafood for every plate",
    readTime: "5 min read",
  },
  {
    image: "/assets/img/shop/Prawns-Fry.png",
    imageAlt: "Golden prawns prepared by the IKA kitchen",
    category: "From the kitchen",
    date: "15 June, 2024",
    dateTime: "2024-06-15",
    title: "The art of pairing sushi with seasonal seafood",
    readTime: "3 min read",
  },
];

export function HomeBlogSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const scrollPosts = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".Ika-blog-card");
    const distance = card ? card.offsetWidth + 18 : track.clientWidth * 0.8;
    track.scrollBy({
      left: distance * direction,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) event.currentTarget.setPointerCapture(event.pointerId);
    drag.moved = true;
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
    event.preventDefault();
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (drag.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  return (
    <section className="Ika-home-blog" aria-labelledby="Ika-home-blog-title">
      <div className="Ika-home-blog-inner">
        <header className="Ika-home-blog-heading">
          <div>
            <span className="Ika-home-blog-kicker">NEWS &amp; BLOG</span>
            <h2 id="Ika-home-blog-title">Stories from our kitchen</h2>
            <p>Meet the craft, ingredients, and people behind every plate.</p>
          </div>
        </header>

        <div
          className="Ika-home-blog-track"
          ref={trackRef}
          role="region"
          aria-label="Latest stories"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishPointer}
          onPointerCancel={finishPointer}
          onClickCapture={handleClickCapture}
        >
          {posts.map((post) => (
            <article className="Ika-blog-card" key={post.title}>
              <Link className="Ika-blog-card-image" href="/blog-single-with-sidebar" aria-label={`Read: ${post.title}`}>
                <img src={post.image} alt={post.imageAlt} draggable={false} />
                <span>{post.category}</span>
              </Link>
              <div className="Ika-blog-card-content">
                <div className="Ika-blog-card-meta">
                  <time dateTime={post.dateTime}>{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
                <h3>
                  <Link href="/blog-single-with-sidebar">{post.title}</Link>
                </h3>
                <Link className="Ika-blog-read-more" href="/blog-single-with-sidebar">
                  Read story <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="Ika-home-blog-controls" aria-label="Blog carousel controls">
          <button type="button" aria-label="Previous stories" title="Previous stories" onClick={() => scrollPosts(-1)}>
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next stories" title="Next stories" onClick={() => scrollPosts(1)}>
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
