"use client";

import { useState } from "react";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

const filters = [
  { label: "All", value: null },
  { label: "Sushi & Rolls", value: ["sushi", "rolls"] },
  { label: "Sashimi", value: ["sashimi"] },
  { label: "Seafood", value: ["seafood"] },
  { label: "Nigiri", value: ["nigiri"] },
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
