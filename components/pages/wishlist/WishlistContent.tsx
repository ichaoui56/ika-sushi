"use client";

import { useStore } from "../../store/StoreProvider";
import Link from "next/link";
import { ProductCard } from "../../store/ProductCard";

export default function WishlistContent() {
  const { wishlist, ready } = useStore();

  if (!ready) return <p aria-live="polite">Loading your wishlist…</p>;

  if (wishlist.length === 0) {
    return (
      <div className="foodu-empty-state">
        <i className="far fa-heart" aria-hidden="true" />
        <h2>No favorites just yet</h2>
        <p>Tap the heart on a dish to save it here.</p>
        <Link className="btn btn-theme" href="/shop">Discover the shop</Link>
      </div>
    );
  }

  return (
    <div className="foodu-product-grid foodu-wishlist-grid">
      {wishlist.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          className="foodu-wishlist-product-card"
          cartLabel="Ajouter au panier"
          removable
        />
      ))}
    </div>
  );
}
