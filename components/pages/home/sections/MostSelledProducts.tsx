"use client";

import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { ProductCard } from "../../../store/ProductCard";
import { ProductCarouselControls } from "../../../store/ProductCarouselControls";
import { catalogProducts } from "../../../store/products";

export default function MostSelledProducts() {
  const { locale } = useLocale();
  const bestSellers = catalogProducts.filter((product) => product.isBestSeller);
  const renderCards = (isDuplicate = false) => (
    <ul
      className="foodu-picks-group"
    >
      {bestSellers.map((product, index) => (
        <li className="foodu-pick-item" key={`${isDuplicate ? "loop" : "bestseller"}-${product.id}`}>
          
          <ProductCard product={product} className="foodu-pick-card" cartLabel={translate("Order now", locale)} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="feature-style-two-area default-padding bg-dark text-light foodu-best-sellers"
      aria-labelledby="foodu-best-sellers-title"
      style={{
        backgroundImage: "url(/assets/img/shape/11.png)",
        backgroundPosition: "bottom center",
      }}
    >    
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          backgroundImage: "url(/assets/img/shape/11.png)",
          backgroundSize: "contain",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom center",
          transform: "scaleY(-1)",
          pointerEvents: "none",
        }}
      />

      <div className="shape">
        <img src="/assets/img/shape/10.png" alt="Image Not Found" />
      </div>

      <div className="container">
        <div className="foodu-picks-heading">
          <h4 className="foodu-picks-eyebrow">{translate("LOVED BY OUR GUESTS", locale)}</h4>
          <h2 className="foodu-picks-title" id="foodu-best-sellers-title">{translate("The best sellers", locale)}</h2>
          <p>{translate("Our most-ordered sushi and seafood, made fresh for every order.", locale)}</p>
        </div>
        <ProductCarouselControls label={translate("Best-selling sushi and seafood", locale)}>
          <div className="foodu-picks-track">
            {renderCards()}
            {renderCards(true)}
          </div>
        </ProductCarouselControls>
      </div>
    </div>
  );
}
