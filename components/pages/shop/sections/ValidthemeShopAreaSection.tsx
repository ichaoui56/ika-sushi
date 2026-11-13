import { ProductCard } from "../../../store/ProductCard";
import type { CatalogProduct } from "../../../store/products";

export default function ValidthemeShopAreaSection({ products }: { products: CatalogProduct[] }) {
  return (
    <section className="validtheme-shop-area default-padding text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">Fresh from our kitchen</h4>
              <h2 className="title">Sushi &amp; Seafood Menu</h2>
              <p>
                Explore our chef-prepared rolls, sashimi, and ocean-fresh
                favorites.
              </p>
            </div>
          </div>
        </div>
        <div className="Ika-product-grid">
          {products.length ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : <p>No products are currently available.</p>}
        </div>
      </div>
    </section>
  );
}
