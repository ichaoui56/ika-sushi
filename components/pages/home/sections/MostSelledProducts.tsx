"use client";

import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { ProductCard } from "../../../store/ProductCard";
import { ProductCarouselControls } from "../../../store/ProductCarouselControls";
import { catalogProducts, type CatalogProduct } from "../../../store/products";

export default function MostSelledProducts({ products }: { products?: CatalogProduct[] }) {
  const { locale } = useLocale();
  const bestSellers = products ?? catalogProducts.filter((product) => product.isBestSeller);
  const renderCards = (isDuplicate = false) => (
    <ul
      className="Ika-picks-group"
    >
      {bestSellers.map((product, index) => (
        <li className="Ika-pick-item" key={`${isDuplicate ? "loop" : "bestseller"}-${product.id}`}>
          
          <ProductCard product={product} className="Ika-pick-card" cartLabel={translate("Order now", locale)} />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="feature-style-two-area default-padding bg-dark text-light Ika-best-sellers"
      aria-labelledby="Ika-best-sellers-title"
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
        <div className="Ika-picks-heading">
          <h4 className="Ika-picks-eyebrow">{translate("LOVED BY OUR GUESTS", locale)}</h4>
          <h2 className="Ika-picks-title" id="Ika-best-sellers-title">{translate("The best sellers", locale)}</h2>
          <p>{translate("Our most-ordered sushi and seafood, made fresh for every order.", locale)}</p>
        </div>
        <ProductCarouselControls label={translate("Best-selling sushi and seafood", locale)}>
          <div className="Ika-picks-track">
            {renderCards()}
            {renderCards(true)}
          </div>
        </ProductCarouselControls>
      </div>
    </div>
  );
}
