"use client";

import { useState } from "react";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

const filters: { label: string; value: string[] | null }[] = [
  { label: "All", value: null },
  { label: "Lunch & Bentos", value: ["lunch-boxes", "bentos"] },
  { label: "Starters", value: ["starters", "soupes", "salades"] },
  {
    label: "Sushi & Rolls",
    value: [
      "cirashi-bowl",
      "crispy-rice",
      "rouleux",
      "gunkan",
      "temari",
      "temaki",
      "nigiri",
      "futomaki",
      "maki",
      "fresh-rolls",
      "blossom",
      "aromaki",
      "spring-rolls",
      "california-rolls",
      "ika-rolls",
      "crunchy",
    ],
  },
  { label: "Sashimi & Tartare", value: ["tartare", "tataki", "carpaccios", "sashimi"] },
  { label: "Plats & Dessert", value: ["bao-buns", "tacos", "plats", "jus", "dessert"] },
];

export default function FoodMenuAreaSection() {
  const [activeFilter, setActiveFilter] = useState<string[] | null>(null);
  const visibleProducts = catalogProducts.filter(
    (product) =>
      activeFilter === null ||
      activeFilter.some((category) => product.categories.includes(category)),
  );

  return (
    <section className="food-menu-area bg-gray default-padding">
      <div className="container">
        <div
          className="mix-item-menu foodu-menu-filters"
          role="group"
          aria-label="Filter menu by category"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            const productCount =
              filter.value === null
                ? catalogProducts.length
                : catalogProducts.filter((product) =>
                    filter.value?.some((category) =>
                      product.categories.includes(category),
                    ),
                  ).length;
            return (
              <button
                key={filter.label}
                className={isActive ? "active" : ""}
                aria-pressed={isActive}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                <span className="foodu-menu-filter-count" aria-hidden="true">
                  {productCount}
                </span>
              </button>
            );
          })}
        </div>
        <div className="foodu-menu-product-grid" aria-live="polite">
          {visibleProducts.map((product) => (
            <div
              key={`${activeFilter?.join("-") ?? "all"}-${product.id}`}
              className="foodu-menu-product-item"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
