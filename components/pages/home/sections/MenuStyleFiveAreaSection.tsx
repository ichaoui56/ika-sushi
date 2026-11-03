import Link from "next/link";
import { catalogProducts } from "../../../store/products";

export default function MenuStyleFiveAreaSection() {
  return (
    <section className="menu-style-five-area default-padding bg-cover">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <h4 className="sub-heading">Made fresh every day</h4>
            <h2 className="title split-text">A Taste of Japan &amp; the Sea</h2>
            <p>
              From delicate sashimi to hand-rolled sushi and fresh-caught
              seafood, every plate is made to bring you closer to the coast.
            </p>
            <Link className="btn btn-theme btn-md animation mt-20" href="/food-menu">
              Explore the menu
            </Link>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="food-menu-style-five-items mt-40">
              <ul className="menu-list">
                {catalogProducts.slice(0, 4).map((product) => (
                  <li
                    key={product.id}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <Link
                      className="d-flex align-items-center"
                      href="/shop-single"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        width="72"
                        height="72"
                        style={{ objectFit: "contain", marginRight: "18px" }}
                      />
                      <span>
                        <strong>{product.name}</strong>
                        <small className="d-block">{product.description}</small>
                      </span>
                    </Link>
                    <strong>${product.price.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
