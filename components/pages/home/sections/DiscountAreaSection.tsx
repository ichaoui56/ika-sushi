import { ProductCard } from "../../../store/ProductCard";
import type { CatalogProduct } from "../../../store/products";
import styles from "./DiscountArea.module.css";

export default function DiscountAreaSection({ products }: { products: CatalogProduct[] }) {
  if (!products.length) return null;

  return (
    <div
      className="discount-area default-padding bg-theme bg-cover text-light overflow-hidden"
      style={{
        backgroundImage: "url(/assets/img/shape/15.jpg)",
      }}
    >
      <div className="wavesshape">
        <img
          className="regular-img"
          src="/assets/img/shape/16.png"
          alt="Shape"
        />

        <img
          className="dark-img"
          src="/assets/img/shape/16-dark-secondary.png"
          alt="Shape"
        />
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="discount-content">
              <h4>Limited Offer</h4>

              <h2
                style={{
                  backgroundImage: "url(/assets/img/shape/27.png)",
                }}
              >
                Sushi &amp; Seafood Feast
              </h2>

              <p>
                A beautiful selection of fresh sushi and seafood, made for sharing.
              </p>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className={styles.products}>
              {products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
