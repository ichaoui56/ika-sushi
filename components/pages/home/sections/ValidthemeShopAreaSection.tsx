"use client";

import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

const categoryNames: Record<string, string> = {
  sushi: "Sushi",
  nigiri: "Nigiri",
  rolls: "Rolls",
  seafood: "Seafood",
  sashimi: "Sashimi",
  grilled: "Grilled",
};

export default function ValidthemeShopAreaSection() {
  const categories = Array.from(new Set(catalogProducts.flatMap((product) => product.categories)));

  return (
    <section className="validtheme-shop-area default-padding text-center foodu-full-menu">
      <div className="shape-seperate">
        <img src="/assets/img/shape/14.png" alt="" />
        <img src="/assets/img/shape/15.png" alt="" />
      </div>
      <div className="container">
        <div className="foodu-full-menu-heading">
          <span className="foodu-full-menu-kicker">THE COMPLETE SELECTION</span>
          <h2 id="foodu-full-menu-title">Explore the full menu</h2>
          <p>Every dish on our menu, organized by category. Choose a section to browse.</p>
        </div>
        <p className="foodu-menu-category-hint" aria-label="Drag left or right to see more categories">
          <i className="fas fa-chevron-left foodu-menu-hint-left" aria-hidden="true" />
          <span>Drag left or right to see more categories</span>
          <i className="fas fa-chevron-right foodu-menu-hint-right" aria-hidden="true" />
        </p>
        <nav
          className="foodu-menu-category-nav"
          aria-label="Jump to menu category"
        >
          {categories.map((category, index) => (
            <a
              key={category}
              href={`#foodu-menu-${category}`}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(`foodu-menu-${category}`);
                if (!target) return;
                window.history.pushState(null, "", `#foodu-menu-${category}`);
                target.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                  block: "start",
                });
              }}
            >
              <span className="foodu-menu-tab-index">{String(index + 1).padStart(2, "0")}</span>
              {categoryNames[category] ?? category}
            </a>
          ))}
        </nav>
        <div className="foodu-menu-category-list">
          {categories.map((category, index) => {
            const products = catalogProducts.filter((product) => product.categories.includes(category));
            const titleId = `foodu-menu-title-${category}`;

            return (
              <section
                className="foodu-menu-category"
                id={`foodu-menu-${category}`}
                key={category}
                aria-labelledby={titleId}
              >
                <header className="foodu-menu-category-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3 id={titleId}>{categoryNames[category] ?? category}</h3>
                  <p>{String(products.length).padStart(2, "0")} dishes</p>
                </header>
                <div className="foodu-product-grid foodu-home-product-grid foodu-category-product-grid">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className="foodu-home-product-card foodu-menu-product-card"
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
