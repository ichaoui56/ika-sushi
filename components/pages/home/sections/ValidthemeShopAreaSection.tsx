import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function ValidthemeShopAreaSection() {
  return (
    <section className="validtheme-shop-area default-padding text-center">
      <div className="shape-seperate">
        <img src="/assets/img/shape/14.png" alt="" />
        <img src="/assets/img/shape/15.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">Best Deal</h4>
              <h2 className="title">Our Popular Dishes</h2>
            </div>
          </div>
        </div>
        <div className="foodu-product-grid foodu-home-product-grid">
          {catalogProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="foodu-home-product-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
