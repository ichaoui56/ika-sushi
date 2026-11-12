import { ProductCard } from "../../../store/ProductCard";
import type { CatalogProduct } from "../../../store/products";
import styles from "./DiscountArea.module.css";

export default function DiscountAreaSection({ products = [] }: { products?: CatalogProduct[] }) {
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
              <h4>{products.length ? "Limited Offer" : "Fresh selection"}</h4>

              <h2
                style={{
                  backgroundImage: "url(/assets/img/shape/27.png)",
                }}
              >
                {products.length ? "Sushi & Seafood Feast" : "Prepared fresh, every day"}
              </h2>

              <p>
                {products.length
                  ? "A beautiful selection of fresh sushi and seafood, made for sharing."
                  : "Explore our full menu and discover what is ready to order today."}
              </p>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            {products.length ? (
              <div className={styles.products}>
                {products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="offer-item-thumb">
                <img src="/assets/img/shop/Crustaceans-such-as-lobsters.png" alt="Fresh lobster and seafood" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
