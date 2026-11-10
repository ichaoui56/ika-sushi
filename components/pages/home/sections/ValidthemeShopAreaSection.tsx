"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts, menuCategories } from "../../../store/products";

export default function ValidthemeShopAreaSection() {
  const { locale } = useLocale();
  const categories = menuCategories;
  const activeCategoryRef = useRef<string>(categories[0].id);
  const categoryNavRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    let frame: number | null = null;

    const updateActiveCategory = () => {
      frame = null;
      const marker = (categoryNavRef.current?.getBoundingClientRect().bottom ?? 120) + 20;
      let nextCategory: string = categories[0].id;

      for (const category of categories) {
        const section = document.getElementById(`foodu-menu-${category.id}`);
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

  return (
    <section className="validtheme-shop-area default-padding text-center foodu-full-menu">
      <div className="shape-seperate">
        <img src="/assets/img/shape/14.png" alt="" />
        <img src="/assets/img/shape/15.png" alt="" />
      </div>
      <div className="container">
        <div className="foodu-full-menu-heading">
          <span className="foodu-full-menu-kicker">{translate("THE COMPLETE SELECTION", locale)}</span>
          <h2 id="foodu-full-menu-title">{translate("Explore the full menu", locale)}</h2>
          <p>{translate("Every dish on our menu, organized by category. Choose a section to browse.", locale)}</p>
        </div>
        <p className="foodu-menu-category-hint" aria-label={translate("Drag left or right to see more categories", locale)}>
          <i className="fas fa-chevron-left foodu-menu-hint-left" aria-hidden="true" />
          <span>{translate("Drag left or right to see more categories", locale)}</span>
          <i className="fas fa-chevron-right foodu-menu-hint-right" aria-hidden="true" />
        </p>
        <nav
          ref={categoryNavRef}
          className="foodu-menu-category-nav"
          aria-label="Jump to menu category"
        >
          {categories.map((category, index) => {
            const translatedCategoryName = translate(category.name, locale);

            return (
              <a
                key={category.id}
                className={index === 0 ? "is-active" : undefined}
                aria-current={index === 0 ? "location" : undefined}
                data-category-id={category.id}
                href={`#foodu-menu-${category.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  const target = document.getElementById(`foodu-menu-${category.id}`);
                  if (!target) return;
                  setActiveCategory(category.id);
                  window.history.pushState(null, "", `#foodu-menu-${category.id}`);
                  target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                    block: "start",
                  });
                }}
              >
                <span className="foodu-menu-tab-index">{String(index + 1).padStart(2, "0")}</span>
                {translatedCategoryName}
              </a>
            );
          })}
        </nav>
        <div className="foodu-menu-category-list">
          {categories.map((category, index) => {
            const products = catalogProducts.filter((product) => product.categories.includes(category.id));
            const titleId = `foodu-menu-title-${category.id}`;
            const translatedCategoryName = translate(category.name, locale);

            return (
              <section
                className="foodu-menu-category"
                id={`foodu-menu-${category.id}`}
                key={category.id}
                aria-labelledby={titleId}
              >
                <header className="foodu-menu-category-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3 id={titleId}>{translatedCategoryName}</h3>
                  <p>
                    {String(products.length).padStart(2, "0")} {translate("dishes", locale)}
                  </p>
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
