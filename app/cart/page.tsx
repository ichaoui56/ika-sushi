import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { Preloader } from "../components/shared/Preloader";
import { SiteHeader } from "../components/shared/SiteHeader";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { TopBar } from "../components/shared/TopBar";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <div
        className="breadcrumb-area bg-cover text-center text-light"
        style={{
          backgroundImage: "url(/assets/img/shape/11.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1>Cart Page</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-page default-padding overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop-cart-info">
                <form className="woocommerce-cart-form" action="#">
                  <table className="shop-cart-table">
                    <thead>
                      <tr>
                        <th>Remove</th>

                        <th>Thumbnail</th>

                        <th>Product</th>

                        <th>Price</th>

                        <th>Quantity</th>

                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="woocommerce-cart-form">
                        <td className="product-remove">
                          <a href="#" className="remove">
                            <i className="fas fa-times" />
                          </a>
                        </td>

                        <td className="product-thumbnail">
                          <a href="#">
                            <img
                              src="/assets/img/shop/1.png"
                              alt="Image Not Found"
                            />
                          </a>
                        </td>

                        <td>
                          <a href="#">Currency Counting Machine</a>
                        </td>

                        <td className="product-price">$56</td>

                        <td className="product-quantity">
                          <input
                            type="number"
                            value="1"
                            title="Qty"
                            min="0"
                            step="1"
                            placeholder=""
                          />
                        </td>

                        <td className="product-subtotal">48.00</td>
                      </tr>

                      <tr>
                        <td colSpan={6} className="actions">
                          <div className="coupon">
                            <input type="text" placeholder="Coupon code" />

                            <button type="submit">Apply coupon</button>
                          </div>

                          <button type="submit">Update cart</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>

              <div className="shop-cart-totals mt-50">
                <h2>Cart totals</h2>

                <div className="table-responsive table-bordered">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Subtotal</th>

                        <th scope="col">$56</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <th scope="row">Shipping</th>

                        <td>
                          <p>{" Free shipping "}</p>

                          <p>{" Shipping to Australia. "}</p>

                          <a href="#">Change address</a>
                        </td>
                      </tr>

                      <tr>
                        <th scope="row">Total</th>

                        <td>$56</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
