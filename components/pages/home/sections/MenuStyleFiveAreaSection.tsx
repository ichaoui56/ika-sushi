import Link from "next/link";
import { ProductCarouselControls } from "../../../store/ProductCarouselControls";
import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function MenuStyleFiveAreaSection() {
  const promotions = catalogProducts.filter((product) => product.originalPrice !== undefined);
  const renderCards = (isDuplicate = false) => (
    <ul
      className="foodu-picks-group"
    >
      {promotions.map((product) => (
        <li className="foodu-pick-item" key={`${isDuplicate ? "loop" : "featured"}-${product.id}`}>
          <ProductCard product={product} className="foodu-pick-card" cartLabel="Order now" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="menu-style-five-area default-padding bg-cover foodu-top-picks">
      <div className="container">
        <div className="foodu-picks-heading">
          <h4 className="foodu-picks-eyebrow">LIMITED-TIME OFFERS</h4>
          <h2 className="foodu-picks-title">Fresh finds for less</h2>
          <p>Enjoy these special prices on a few of our kitchen favorites.</p>
          <Link className="ika-menu-cta" href="/food-menu">
            <span>EXPLORE THE MENU</span>
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
