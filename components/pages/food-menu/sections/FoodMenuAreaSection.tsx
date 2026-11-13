"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ProductCard } from "../../../store/ProductCard";
import type { CatalogCategory, CatalogProduct } from "../../../store/products";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { formatProductPrice, getProductDescription, getProductName } from "../../../store/product-locale";
import { toLocalImageUrl } from "../../../../lib/image-url";
import { localizeCategoryName, normalizeCategoryTranslations } from "../../../../features/categories/translations";

const matchesMenuQuery = (
  product: CatalogProduct,
  categories: readonly CatalogCategory[],
  query: string,
  locale: "fr" | "en" | "ar",
) => {
  if (!query) return true;

  const categoryNames = product.categories
    .map((categoryId) => categories.find((category) => category.id === categoryId))
    .filter((category): category is CatalogCategory => category !== undefined)
    .flatMap((category) => [
      category.name,
      localizeCategoryName(category, locale),
      ...Object.values(normalizeCategoryTranslations(category.translations).name ?? {}),
    ]);
  const searchableText = [
    product.name,
    getProductName(product, locale),
    product.description,
    getProductDescription(product, locale),
    product.tags.join(" "),
    ...categoryNames,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
};

export default function FoodMenuAreaSection({
  products,
  categories,
}: {
  products: CatalogProduct[];
  categories: readonly CatalogCategory[];
}) {
  const { locale } = useLocale();
  const filters = [
    { label: "All", value: null as string[] | null },
    ...categories.map((category) => ({ label: localizeCategoryName(category, locale), value: [category.id] })),
  ];
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const activeCategoryRef = useRef<string | null>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterRailRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase(locale);

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return products
      .filter((product) => matchesMenuQuery(product, categories, normalizedQuery, locale))
      .slice(0, 6);
  }, [categories, locale, normalizedQuery, products]);

  const categorySections = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          products: products.filter(
            (product) =>
              product.categories.includes(category.id) &&
              matchesMenuQuery(product, categories, normalizedQuery, locale),
          ),
        }))
        .filter(({ products }) => products.length > 0),
    [categories, locale, normalizedQuery, products],
  );

  useEffect(() => {
    const marker = Math.min(200, window.innerHeight - 1);
    const bottomInset = Math.max(0, window.innerHeight - marker - 1);
    const updateActiveCategory = () => {
      let nextCategory: string | null = null;
      for (const { category } of categorySections) {
        const heading = document.getElementById(`Ika-menu-category-title-${category.id}`);
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
      const heading = document.getElementById(`Ika-menu-category-title-${category.id}`);
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
      ? `Ika-menu-category-${categoryId}`
      : "Ika-menu-categories";
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleSearchSelection = (productId: string) => {
    const selectedProduct = products.find((product) => product.id === productId);
    if (!selectedProduct) return;

    setSearchQuery("");
    setSearchOpen(false);
    const categoryId = selectedProduct.categories[0];
    activeCategoryRef.current = categoryId ?? null;
    setActiveCategoryId(categoryId ?? null);

    const productElement = categoryId
      ? document.getElementById(`Ika-product-${categoryId}-${productId}`)
      : null;
    productElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="food-menu-area bg-gray default-padding">
      <div className="container">
        <div className="Ika-menu-page-tools">
          <form
            ref={searchFormRef}
            className="Ika-menu-page-search"
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
            <label className="Ika-menu-page-search-field">
              <i className="fas fa-search" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                placeholder="Search dishes, ingredients, or categories"
                aria-label="Search menu products"
                aria-expanded={Boolean(searchOpen && normalizedQuery.length > 0)}
                aria-controls="Ika-menu-page-search-results"
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
            <button type="submit" className="Ika-menu-page-search-submit" aria-label="Search menu">
              Search
            </button>
            {searchOpen && normalizedQuery.length > 0 && (
              <div className="Ika-menu-page-search-results" id="Ika-menu-page-search-results">
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <button type="button" onClick={() => handleSearchSelection(product.id)}>
                          <img src={toLocalImageUrl(product.image)} alt="" className="Ika-menu-page-search-result-image" />
                          <span className="Ika-menu-page-search-result-copy">
                            <span className="Ika-menu-page-search-result-name">{getProductName(product, locale)}</span>
                            <span className="Ika-menu-page-search-result-category">
                              {product.categories
                                .map((categoryId) => {
                                  const category = categories.find((item) => item.id === categoryId);
                                  return category ? localizeCategoryName(category, locale) : undefined;
                                })
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </span>
                          <strong className="Ika-menu-page-search-result-price">{formatProductPrice(product.price, product.currency, locale)}</strong>
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
          className="Ika-menu-filters-hint"
          aria-label={translate("Drag left or right", locale)}
        >
          <i className="fas fa-arrows-alt-h" aria-hidden="true" />
          <span>{translate("Drag left or right", locale)}</span>
        </p>
        <div className="Ika-menu-filters-wrap">
          <div
            ref={filterRailRef}
            className="mix-item-menu Ika-menu-filters"
            role="group"
            aria-label="Filter menu by category"
          >
            <div className="Ika-menu-filters-track">
              {filters.map((filter) => {
                const categoryId = filter.value?.[0] ?? null;
                const isActive = activeCategoryId === categoryId;
                const productCount =
                  filter.value === null
                    ? products.length
                    : products.filter((product) =>
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
                    <span className="Ika-menu-filter-count" aria-hidden="true">
                      {productCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="Ika-menu-categories" id="Ika-menu-categories" aria-live="polite">
          {categorySections.length > 0 ? (
            categorySections.map(({ category, products }, index) => (
              <section
                key={category.id}
                id={`Ika-menu-category-${category.id}`}
                className="Ika-menu-category-section"
                aria-labelledby={`Ika-menu-category-title-${category.id}`}
              >
                <header className="Ika-menu-category-header">
                  <div className="Ika-menu-category-title-row">
                    <span className="Ika-menu-category-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 id={`Ika-menu-category-title-${category.id}`}>{localizeCategoryName(category, locale)}</h2>
                  </div>
                  <span className="Ika-menu-category-rule" aria-hidden="true" />
                  <span className="Ika-menu-category-count">
                    {products.length} {products.length === 1 ? "dish" : "dishes"}
                  </span>
                </header>
                <div className="Ika-menu-product-grid">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      id={`Ika-product-${category.id}-${product.id}`}
                      className="Ika-menu-product-item"
                      data-product-id={product.id}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="Ika-menu-empty-state">
              {translate("No dishes match your filters yet.", locale)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
