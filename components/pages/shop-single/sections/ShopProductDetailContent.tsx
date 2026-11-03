import { ProductCard } from "../../../store/ProductCard";
import { catalogProducts } from "../../../store/products";

export default function ShopProductDetailContent() {
  const featuredProduct = catalogProducts[0];

  return (
    <section className="validtheme-shop-single-area default-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2">
            <span className="sub-title">Fresh from our kitchen</span>
            <h2 className="text-center">Today&apos;s Sushi Feature</h2>
            <ProductCard product={featuredProduct} />
          </div>
        </div>
        <div className="row mt-60">
          <div className="col-12 text-center">
            <h2>More from our sushi &amp; seafood menu</h2>
          </div>
          {catalogProducts.slice(1, 5).map((product) => (
            <div className="col-lg-3 col-md-6 mt-30" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
