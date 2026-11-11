"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts, menuCategories } from "../../../store/products";

const filters: { label: string; value: string[] | null }[] = [
  { label: "All", value: null },
  ...menuCategories.map((category) => ({
    label: category.name,
    value: [category.id],
  })),
];

const matchesMenuQuery = (
  product: (typeof catalogProducts)[number],
  query: string,
) => {
  if (!query) return true;

  const categoryNames = product.categories
    .map((categoryId) => menuCategories.find((category) => category.id === categoryId))
    .filter((category): category is (typeof menuCategories)[number] => category !== undefined)
    .map((category) => category.name);
  const searchableText = [
    product.name,
    product.description,
    product.tags.join(" "),
    ...categoryNames,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
};

import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
export default function FoodMenuAreaSection() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const activeCategoryRef = useRef<string | null>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterRailRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return catalogProducts
      .filter((product) => matchesMenuQuery(product, normalizedQuery))
      .slice(0, 6);
  }, [normalizedQuery]);

  const categorySections = useMemo(
    () =>
      menuCategories
        .map((category) => ({
          category,
          products: catalogProducts.filter(
            (product) =>
              product.categories.includes(category.id) &&
              matchesMenuQuery(product, normalizedQuery),
          ),
        }))
        .filter(({ products }) => products.length > 0),
    [normalizedQuery],
  );

  useEffect(() => {
    const marker = Math.min(200, window.innerHeight - 1);
    const bottomInset = Math.max(0, window.innerHeight - marker - 1);
    const updateActiveCategory = () => {
      let nextCategory: string | null = null;
      for (const { category } of categorySections) {
        const heading = document.getElementById(`foodu-menu-category-title-${category.id}`);
        if (!heading) continue;
        if (heading.getBoundingClientRect().top > marker) break;
        nextCategory = category.id;
      }
      if (activeCategoryRef.current === nextCategory) return;
      activeCategoryRef.current = nextCategory;
      setActiveCategoryId(nextCategory);
    };

    const observer = new IntersectionObserver(updateActiveCategory, {
      rootMargin: `-${marker}px 0px -${bottomInset}px 0px`,
      threshold: 0,
    });
    categorySections.forEach(({ category }) => {
      const heading = document.getElementById(`foodu-menu-category-title-${category.id}`);
      if (heading) observer.observe(heading);
    });
    updateActiveCategory();

    return () => observer.disconnect();
  }, [categorySections]);

  useEffect(() => {
    const rail = filterRailRef.current;
    if (!rail) return;

    if (!activeCategoryId) {
      rail.scrollTo({
        left: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
      return;
    }

    const tab = rail.querySelector<HTMLButtonElement>(`[data-category-id="${activeCategoryId}"]`);
    if (!tab) return;

    const tabLeft = tab.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    rail.scrollTo({
      left: tabLeft - (rail.clientWidth - tab.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [activeCategoryId]);

  const handleCategorySelection = (categoryId: string | null) => {
    activeCategoryRef.current = categoryId;
    setActiveCategoryId(categoryId);
    setSearchQuery("");
    setSearchOpen(false);

    const targetId = categoryId
      ? `foodu-menu-category-${categoryId}`
      : "foodu-menu-categories";
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleSearchSelection = (productId: string) => {
    const selectedProduct = catalogProducts.find((product) => product.id === productId);
    if (!selectedProduct) return;

    setSearchQuery("");
    setSearchOpen(false);
    const categoryId = selectedProduct.categories[0];
    activeCategoryRef.current = categoryId ?? null;
    setActiveCategoryId(categoryId ?? null);

    const productElement = categoryId
      ? document.getElementById(`foodu-product-${categoryId}-${productId}`)
      : null;
    productElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const { locale } = useLocale();
  return (
    <section className="food-menu-area bg-gray default-padding">
      <div className="container">
        <div className="foodu-menu-page-tools">
          <form
            ref={searchFormRef}
            className="foodu-menu-page-search"
            role="search"
            aria-label="Search menu products"
            onSubmit={(event) => {
              event.preventDefault();
              if (searchResults[0]) {
                handleSearchSelection(searchResults[0].id);
              } else {
                setSearchOpen(true);
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setSearchOpen(false);
              }
            }}
          >
            <label className="foodu-menu-page-search-field">
              <i className="fas fa-search" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                placeholder="Search dishes, ingredients, or categories"
                aria-label="Search menu products"
                aria-expanded={Boolean(searchOpen && normalizedQuery.length > 0)}
                aria-controls="foodu-menu-page-search-results"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(Boolean(event.target.value.trim()));
                }}
                onFocus={() => setSearchOpen(Boolean(normalizedQuery.length > 0))}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearchOpen(false);
                }}
              />
            </label>
            <button type="submit" className="foodu-menu-page-search-submit" aria-label="Search menu">
              Search
            </button>
            {searchOpen && normalizedQuery.length > 0 && (
              <div className="foodu-menu-page-search-results" id="foodu-menu-page-search-results">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <button type="button" onClick={() => handleSearchSelection(product.id)}>
                          <img src={product.image} alt="" className="foodu-menu-page-search-result-image" />
                          <span className="foodu-menu-page-search-result-copy">
                            <span className="foodu-menu-page-search-result-name">{product.name}</span>
                            <span className="foodu-menu-page-search-result-category">
                              {product.categories
                                .map((categoryId) => menuCategories.find((category) => category.id === categoryId)?.name)
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </span>
                          <strong className="foodu-menu-page-search-result-price">${product.price.toFixed(2)}</strong>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products found</p>
                )}
              </div>
            )}
          </form>
        </div>

        <p
          className="foodu-menu-filters-hint"
          aria-label={translate("Drag left or right", locale)}
        >
          <i className="fas fa-arrows-alt-h" aria-hidden="true" />
          <span>{translate("Drag left or right", locale)}</span>
        </p>
        <div className="foodu-menu-filters-wrap">
          <div
            ref={filterRailRef}
            className="mix-item-menu foodu-menu-filters"
            role="group"
            aria-label="Filter menu by category"
          >
            <div className="foodu-menu-filters-track">
              {filters.map((filter) => {
                const categoryId = filter.value?.[0] ?? null;
                const isActive = activeCategoryId === categoryId;
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
                    aria-current={isActive ? "location" : undefined}
                    data-category-id={categoryId ?? undefined}
                    type="button"
                    onClick={() => handleCategorySelection(filter.value?.[0] ?? null)}
                  >
                    {filter.label}
                    <span className="foodu-menu-filter-count" aria-hidden="true">
                      {productCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="foodu-menu-categories" id="foodu-menu-categories" aria-live="polite">
          {categorySections.length > 0 ? (
            categorySections.map(({ category, products }, index) => (
              <section
                key={category.id}
                id={`foodu-menu-category-${category.id}`}
                className="foodu-menu-category-section"
                aria-labelledby={`foodu-menu-category-title-${category.id}`}
              >
                <header className="foodu-menu-category-header">
                  <div className="foodu-menu-category-title-row">
                    <span className="foodu-menu-category-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`foodu-menu-category-title-${category.id}`}>{category.name}</h2>
                  </div>
                  <span className="foodu-menu-category-rule" aria-hidden="true" />
                  <span className="foodu-menu-category-count">
                    {products.length} {products.length === 1 ? "dish" : "dishes"}
                  </span>
                </header>
                <div className="foodu-menu-product-grid">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      id={`foodu-product-${category.id}-${product.id}`}
                      className="foodu-menu-product-item"
                      data-product-id={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="foodu-menu-empty-state">
              {translate("No dishes match your filters yet.", locale)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
