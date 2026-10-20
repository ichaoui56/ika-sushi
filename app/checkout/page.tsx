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
              <h1>Checkout</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <form action="#" className="checkout-form">
                <div className="row">
                  <div className="col-lg-6">
                    <h3>Billing details</h3>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="name">First name *</label>

                          <input
                            className="form-control"
                            id="f-name"
                            name="f-name"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="phone">Last name *</label>

                          <input
                            className="form-control"
                            id="l-name"
                            name="l-name"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="select">Country / Region *</label>

                          <select id="select">
                            <option value="1">Australia</option>

                            <option value="2">Canada</option>

                            <option value="4">China</option>

                            <option value="5">Japan</option>

                            <option value="6">Bangladesh</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="name">Street address *</label>

                          <input
                            className="form-control"
                            id="st-address"
                            name="st-address"
                            type="text"
                            placeholder="House number and street name"
                          />

                          <input
                            className="form-control"
                            id="st-address2"
                            name="st-address2"
                            type="text"
                            placeholder="Apartment, suite, unit, etc. (optional)"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="t-city">Town / City *</label>

                          <input
                            className="form-control"
                            id="t-city"
                            name="t-city"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="st-country">State / County *</label>

                          <input
                            className="form-control"
                            id="st-country"
                            name="st-country"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="postcode">Postcode / ZIP *</label>

                          <input
                            className="form-control"
                            id="postcode"
                            name="postcode"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone (optional)</label>

                          <input
                            className="form-control"
                            id="phone"
                            name="phone"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="email">Email address *</label>

                          <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <h3>Order notes (optional)</h3>

                    <div className="form-group comments">
                      <label htmlFor="comments">Order Notes (Option)</label>

                      <textarea
                        className="form-control"
                        id="comments"
                        name="comments"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="shop-cart-totals mt-50 mt-md-30 mt-xs-10">
                      <h2>Your order</h2>

                      <div className="table-responsive table-bordered">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>

                              <th scope="col">Subtotal</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <th>Currency Counting Machine × 1</th>

                              <td>$108</td>
                            </tr>

                            <tr>
                              <th scope="row">Subtotal</th>

                              <td>$108</td>
                            </tr>

                            <tr>
                              <th scope="row">Shipping</th>

                              <td>Free Shipping</td>
                            </tr>

                            <tr>
                              <th scope="row">Total</th>

                              <td>$108</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <p className="woocommerce-info">
                      {
                        " Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements. "
                      }
                    </p>

                    <button type="submit" name="submit" id="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
