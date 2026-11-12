"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts, menuCategories, type CatalogProduct } from "../../../store/products";
import { getProductDescription, getProductName } from "../../../store/product-locale";
import { toLocalImageUrl } from "../../../../lib/image-url";

type MenuCategory = { id: string; name: string };

export default function ValidthemeShopAreaSection({
  products = catalogProducts,
  categories = menuCategories,
}: {
  products?: CatalogProduct[];
  categories?: readonly MenuCategory[];
}) {
  const { locale } = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const activeCategoryRef = useRef<string>(categories[0].id);
  const categoryNavRef = useRef<HTMLElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase(locale);
  const searchResults = normalizedQuery
    ? products
        .filter((product) => {
          const productName = getProductName(product, locale);
          const productDescription = getProductDescription(product, locale);
          const categoryNames = product.categories
            .map((categoryId) => categories.find((category) => category.id === categoryId))
            .filter((category) => category !== undefined)
            .flatMap((category) => [category.name, translate(category.name, locale)]);
          const searchableText = [
            product.name,
            productName,
            product.description,
            productDescription,
            ...categoryNames,
          ]
            .join(" ")
            .toLocaleLowerCase(locale);
          return searchableText.includes(normalizedQuery);
        })
        .slice(0, 8)
    : [];

  const setActiveCategory = (categoryId: string) => {
    if (activeCategoryRef.current === categoryId) return;
    activeCategoryRef.current = categoryId;

    const nav = categoryNavRef.current;
    if (!nav) return;

    const tabs = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-category-id]"));
    const activeTab = tabs.find((tab) => tab.dataset.categoryId === categoryId);
    tabs.forEach((tab) => {
      const isActive = tab.dataset.categoryId === categoryId;
      tab.classList.toggle("is-active", isActive);
      if (isActive) {
        tab.setAttribute("aria-current", "location");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    if (!activeTab) return;
    const left = activeTab.offsetLeft - (nav.clientWidth - activeTab.offsetWidth) / 2;
    nav.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const navigateToProduct = (product: CatalogProduct) => {
    const category = categories.find((item) => product.categories.includes(item.id));
    if (!category) return;

    const targetId = `Ika-menu-product-${category.id}-${product.id}`;
    const target = document.getElementById(targetId);
    if (!target) return;

    setSearchOpen(false);
    setSearchQuery("");
    setActiveCategory(category.id);
    window.history.pushState(null, "", `#${targetId}`);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    let frame: number | null = null;

    const updateActiveCategory = () => {
      frame = null;
      const marker = (categoryNavRef.current?.getBoundingClientRect().bottom ?? 120) + 20;
      let nextCategory: string = categories[0].id;

      for (const category of categories) {
        const section = document.getElementById(`Ika-menu-${category.id}`);
        if (!section) continue;
        if (section.getBoundingClientRect().top > marker) break;
        nextCategory = category.id;
      }

      setActiveCategory(nextCategory);
    };

    const scheduleUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateActiveCategory);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [categories]);

  useEffect(() => {
    if (!searchOpen || !window.matchMedia("(max-width: 767px)").matches) return;

    const viewport = window.visualViewport;
    if (!viewport) return;

    const isKeyboardVisible = () => window.innerHeight - viewport.height > 120;
    let keyboardWasVisible = isKeyboardVisible();
    const handleViewportResize = () => {
      const keyboardIsVisible = isKeyboardVisible();
      if (keyboardWasVisible && !keyboardIsVisible) setSearchOpen(false);
      keyboardWasVisible = keyboardIsVisible;
    };

    const handleFocusOut = () => {
      const activeElement = document.activeElement;
      if (
        !searchFormRef.current ||
        !searchInputRef.current ||
        activeElement === searchInputRef.current ||
        searchFormRef.current.contains(activeElement)
      ) {
        return;
      }

      setSearchOpen(false);
    };

    viewport.addEventListener("resize", handleViewportResize);
    window.addEventListener("resize", handleViewportResize);
    document.addEventListener("focusin", handleFocusOut);

    return () => {
      viewport.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("resize", handleViewportResize);
      document.removeEventListener("focusin", handleFocusOut);
    };
  }, [searchOpen]);

  return (
    <section className="validtheme-shop-area default-padding text-center Ika-full-menu">
      <div className="shape-seperate">
        <img src="/assets/img/shape/14.png" alt="" />
        <img src="/assets/img/shape/15.png" alt="" />
      </div>
      <div className="container">
        <div className="Ika-full-menu-heading">
          <span className="Ika-full-menu-kicker">{translate("THE COMPLETE SELECTION", locale)}</span>
          <h2 id="Ika-full-menu-title">{translate("Explore the full menu", locale)}</h2>
          <p>{translate("Every dish on our menu, organized by category. Choose a section to browse.", locale)}</p>
        </div>
        <p dir="ltr" className="Ika-menu-category-hint" aria-label={translate("Drag left or right to see more categories", locale)}>
          <i className="fas fa-chevron-left Ika-menu-hint-left" aria-hidden="true" />
          <span>{translate("Drag left or right to see more categories", locale)}</span>
          <i className="fas fa-chevron-right Ika-menu-hint-right" aria-hidden="true" />
        </p>
        <div className="Ika-menu-controls">
          <form
            ref={searchFormRef}
            className="Ika-menu-search"
            role="search"
            aria-label={translate("Search menu products", locale)}
            onSubmit={(event) => {
              event.preventDefault();
              if (searchResults[0]) navigateToProduct(searchResults[0]);
              else setSearchOpen(true);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setSearchOpen(false);
              }
            }}
          >
            <label className="Ika-menu-search-field">
              <i className="fas fa-search" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                placeholder={translate("Search by dish or ingredient...", locale)}
                aria-label={translate("Search menu products", locale)}
                aria-expanded={searchOpen && normalizedQuery.length > 0}
                aria-controls="Ika-menu-search-results"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => {
                  if (document.activeElement && searchFormRef.current && !searchFormRef.current.contains(document.activeElement)) {
                    setSearchOpen(false);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearchOpen(false);
                }}
              />
            </label>
            <button
              type="submit"
              className="Ika-menu-search-submit"
              aria-label={translate("Search", locale)}
            >
              <i className="fas fa-search" aria-hidden="true" />
            </button>
            {searchOpen && normalizedQuery.length > 0 && (
              <div
                className="Ika-menu-search-results"
                id="Ika-menu-search-results"
                aria-live="polite"
              >
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((product) => {
                      const category = categories.find((item) => product.categories.includes(item.id));
                      return (
                        <li key={product.id}>
                          <button type="button" onClick={() => navigateToProduct(product)}>
                            <img className="Ika-menu-search-result-image" src={toLocalImageUrl(product.image)} alt="" />
                            <span className="Ika-menu-search-result-copy">
                              <span className="Ika-menu-search-result-name">{getProductName(product, locale)}</span>
                              <span className="Ika-menu-search-result-category">
                                {category ? translate(category.name, locale) : ""}
                              </span>
                            </span>
                            <strong className="Ika-menu-search-result-price">${product.price.toFixed(2)}</strong>
                            <i className="fas fa-arrow-left Ika-menu-search-result-arrow" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>{translate("No products found", locale)}</p>
                )}
              </div>
            )}
          </form>
        </div>
          <nav
            ref={categoryNavRef}
            className="Ika-menu-category-nav"
            aria-label={translate("Jump to menu category", locale)}
          >
            {categories.map((category, index) => {
              const translatedCategoryName = translate(category.name, locale);

              return (
                <a
                  key={category.id}
                  className={index === 0 ? "is-active" : undefined}
                  aria-current={index === 0 ? "location" : undefined}
                  data-category-id={category.id}
                  href={`#Ika-menu-${category.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    const target = document.getElementById(`Ika-menu-${category.id}`);
                    if (!target) return;
                    setActiveCategory(category.id);
                    window.history.pushState(null, "", `#Ika-menu-${category.id}`);
                    target.scrollIntoView({
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                      block: "start",
                    });
                  }}
                >
                  <span className="Ika-menu-tab-index">{String(index + 1).padStart(2, "0")}</span>
                  {translatedCategoryName}
                </a>
              );
            })}
          </nav>
        <div className="Ika-menu-category-list">
          {categories.map((category, index) => {
            const categoryProducts = products.filter((product) => product.categories.includes(category.id));
            const titleId = `Ika-menu-title-${category.id}`;
            const translatedCategoryName = translate(category.name, locale);

            return (
              <section
                className="Ika-menu-category"
                id={`Ika-menu-${category.id}`}
                key={category.id}
                aria-labelledby={titleId}
              >
                <header className="Ika-menu-category-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3 id={titleId}>{translatedCategoryName}</h3>
                  <p>
                    {String(categoryProducts.length).padStart(2, "0")} {translate("dishes", locale)}
                  </p>
                </header>
                <div className="Ika-product-grid Ika-home-product-grid Ika-category-product-grid">
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="Ika-menu-product-anchor"
                      id={`Ika-menu-product-${category.id}-${product.id}`}
                    >
                      <ProductCard
                        product={product}
                        className="Ika-home-product-card Ika-menu-product-card"
                      />
                    </div>
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
