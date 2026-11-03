import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function FoodMenuStyleTwoAreaSection() {
  return (
    <section className="food-menu-style-two-area default-padding bg-cover">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-heading">Fresh from the sea</h4>
              <h2 className="title">Our Sushi &amp; Seafood Menu</h2>
              <p>
                Thoughtfully prepared sushi, sashimi, and seafood made fresh
                throughout the day.
              </p>
            </div>
          </div>
        </div>
        <div className="foodu-product-grid">
          {catalogProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
