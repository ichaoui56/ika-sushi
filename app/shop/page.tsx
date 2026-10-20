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
              <h1>Special Food</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Food</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="validtheme-shop-area default-padding">
        <div className="container">
          <div className="shop-listing-contentes">
            <div className="row item-flex center">
              <div className="col-lg-7">
                <div className="content">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className="nav-link active"
                        id="grid-tab-control"
                        data-bs-toggle="tab"
                        data-bs-target="#grid-tab"
                        type="button"
                        role="tab"
                        aria-controls="grid-tab"
                        aria-selected="true"
                      >
                        <i className="fas fa-th-large" />
                      </button>

                      <button
                        className="nav-link"
                        id="list-tab-control"
                        data-bs-toggle="tab"
                        data-bs-target="#list-tab"
                        type="button"
                        role="tab"
                        aria-controls="list-tab"
                        aria-selected="false"
                      >
                        <i className="fas fa-th-list" />
                      </button>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="col-lg-5 text-right">
                <p>{" Showing 1–10 of 47 results "}</p>

                <select name="cars" id="cars">
                  <option value="volvo">Short by latest</option>

                  <option value="saab">Short by Recent</option>

                  <option value="mercedes">Short by Popular</option>

                  <option value="audi">Short by Relevant</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div
                className="tab-content tab-content-info text-center"
                id="shop-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="grid-tab"
                  role="tabpanel"
                  aria-labelledby="grid-tab-control"
                >
                  <ul className="vt-products columns-4">
                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/1.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Cheese</a>

                            <a href="#">Pizza</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Margherita Pizza</a>
                          </h4>

                          <div className="price">
                            <span>$12.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <span className="onsale">Sale!</span>

                          <a href="/shop-single">
                            <img src="/assets/img/shop/2.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Creamy</a>

                            <a href="#">Burger</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Beef Burger</a>
                          </h4>

                          <div className="price">
                            <span>
                              <del>$8.00</del>
                            </span>

                            <span>$5.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/3.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Beef</a>

                            <a href="#">Steak</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Grilled Flank Steak</a>
                          </h4>

                          <div className="price">
                            <span>$14.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/5.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">BBQ</a>

                            <a href="#">Meat</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Barbecue Chicken</a>
                          </h4>

                          <div className="price">
                            <span>$8.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/8.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Food</a>

                            <a href="#">Roll</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Vegetable Roll</a>
                          </h4>

                          <div className="price">
                            <span>$25.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/6.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Pasta</a>

                            <a href="#">Spicy</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Creamy Pasta</a>
                          </h4>

                          <div className="price">
                            <span>
                              <del>$18.00</del>
                            </span>

                            <span>$13.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/7.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Meat</a>

                            <a href="#">Shawarma</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Chicken Shawarma</a>
                          </h4>

                          <div className="price">
                            <span>$3.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="product-image">
                          <a href="/shop-single">
                            <img src="/assets/img/shop/4.png" alt="Product" />
                          </a>

                          <div className="shop-action">
                            <ul>
                              <li className="wishlist">
                                <a href="#">
                                  <span>Add to wishlist</span>
                                </a>
                              </li>

                              <li className="quick-view">
                                <a href="#">
                                  <span>Quick view</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="product-caption">
                          <div className="product-tags">
                            <a href="#">Sandwich</a>

                            <a href="#">Chicken</a>
                          </div>

                          <h4 className="product-title">
                            <a href="/shop-single">Submarine Sandwich</a>
                          </h4>

                          <div className="price">
                            <span>$6.00</span>
                          </div>

                          <a href="#" className="cart-btn">
                            <i className="fas fa-shopping-bag" />
                            {" Add to cart"}
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div
                  className="tab-pane fade"
                  id="list-tab"
                  role="tabpanel"
                  aria-labelledby="list-tab-control"
                >
                  <ul className="vt-products colums-2">
                    <li className="product">
                      <div className="product-contents">
                        <div className="row align-center">
                          <div className="col-lg-5 col-md-5">
                            <div className="product-image">
                              <a href="/shop-single">
                                <img
                                  src="/assets/img/shop/6.png"
                                  alt="Product"
                                />
                              </a>

                              <div className="shop-action">
                                <ul>
                                  <li className="cart">
                                    <a href="#">
                                      <span>Add to cart</span>
                                    </a>
                                  </li>

                                  <li className="wishlist">
                                    <a href="#">
                                      <span>Add to wishlist</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-7 col-md-7">
                            <div className="product-caption">
                              <div className="product-tags">
                                <a href="#">Pasta</a>

                                <a href="#">Spicy</a>
                              </div>

                              <h4 className="product-title">
                                <a href="/shop-single">Creamy Pasta</a>
                              </h4>

                              <div className="price">
                                <span>$26.00</span>
                              </div>

                              <a href="#" className="cart-btn">
                                <i className="fas fa-shopping-bag" />
                                {" Add to cart"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="product">
                      <div className="product-contents">
                        <div className="row align-center">
                          <div className="col-lg-5 col-md-5">
                            <div className="product-image">
                              <a href="/shop-single">
                                <img
                                  src="/assets/img/shop/1.png"
                                  alt="Product"
                                />
                              </a>

                              <div className="shop-action">
                                <ul>
                                  <li className="cart">
                                    <a href="#">
                                      <span>Add to cart</span>
                                    </a>
                                  </li>

                                  <li className="wishlist">
                                    <a href="#">
                                      <span>Add to wishlist</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-7 col-md-7">
                            <div className="product-caption">
                              <div className="product-tags">
                                <a href="#">Cheese</a>

                                <a href="#">Pizza</a>
                              </div>

                              <h4 className="product-title">
                                <a href="/shop-single">Margherita Pizza</a>
                              </h4>

                              <div className="price">
                                <span>
                                  <del>$28.00</del>
                                </span>

                                <span>$17.00</span>
                              </div>

                              <a href="#" className="cart-btn">
                                <i className="fas fa-shopping-bag" />
                                {" Add to cart"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <nav className="woocommerce-pagination mt-60">
                <ul className="page-numbers">
                  <li>
                    <a className="previous page-numbers" href="#">
                      <i className="fas fa-angle-left" />
                    </a>
                  </li>

                  <li>
                    <span aria-current="page" className="page-numbers current">
                      1
                    </span>
                  </li>

                  <li>
                    <a className="page-numbers" href="#">
                      2
                    </a>
                  </li>

                  <li>
                    <a className="next page-numbers" href="#">
                      <i className="fas fa-angle-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
