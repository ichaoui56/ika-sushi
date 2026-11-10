"use client";

import Link from "next/link";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { ProductCarouselControls } from "../../../store/ProductCarouselControls";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function MenuStyleFiveAreaSection() {
  const { locale } = useLocale();
  const promotions = catalogProducts.filter((product) => product.originalPrice !== undefined);
  const renderCards = (isDuplicate = false) => (
    <ul
      className="foodu-picks-group"
    >
      {promotions.map((product) => (
        <li className="foodu-pick-item" key={`${isDuplicate ? "loop" : "featured"}-${product.id}`}>
          <ProductCard product={product} className="foodu-pick-card" cartLabel={translate("Order now", locale)} />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="menu-style-five-area default-padding bg-cover foodu-top-picks">
      <div className="container">
        <div className="foodu-picks-heading">
          <h4 className="foodu-picks-eyebrow">{translate("LIMITED-TIME OFFERS", locale)}</h4>
          <h2 className="foodu-picks-title">{translate("Fresh finds for less", locale)}</h2>
          <p>{translate("Enjoy these special prices on a few of our kitchen favorites.", locale)}</p>
          <Link className="ika-menu-cta" href="/food-menu">
            <span>{translate("EXPLORE THE MENU", locale)}</span>
            <span className="ika-menu-cta-arrow" aria-hidden="true">
              <i className="fas fa-arrow-right" />
            </span>
          </Link>
        </div>
        <ProductCarouselControls label="Promotional products">
          <div className="foodu-picks-track">
            {renderCards()}
            {renderCards(true)}
          </div>
        </ProductCarouselControls>
      </div>
    </section>
  );
}
