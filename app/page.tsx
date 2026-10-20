import type { Metadata } from "next";
import LegacyPage from "./components/legacy-page";
import { Footer } from "./components/shared/Footer";
import { HomeBlogSection } from "./components/shared/HomeBlogSection";
import { Preloader } from "./components/shared/Preloader";
import { SiteHeader } from "./components/shared/SiteHeader";
import { TestimonialsSection } from "./components/shared/TestimonialsSection";
import { ThemeToggle } from "./components/shared/ThemeToggle";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <SiteHeader />
      <div
        className="banner-area banner-style-four navigation-circle overflow-hidden bg-theme text-light bg-cover"
        style={{
          backgroundImage: "url(/assets/img/shape/1.jpg)",
        }}
      >
        <div className="banner-fade">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container">
                <div className="content">
                  <div className="shape">
                    <img src="/assets/img/shape/23.png" alt="Image Not Found" />

                    <img src="/assets/img/shape/24.png" alt="Image Not Found" />
                  </div>

                  <div className="row align-center">
                    <div className="col-lg-6">
                      <h4>
                        {"Purchase today. just "}
                        <strong>$65</strong>
                      </h4>

                      <h2>Special Offer Cheese Burger</h2>

                      <p>
                        {
                          " Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing know. "
                        }
                      </p>

                      <div className="button mt-40">
                        <a
                          className="btn btn-theme btn-md animation"
                          href="/shop"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="thumb">
                        <img
                          src="/assets/img/illustration/3.png"
                          alt="Image Not Found"
                        />

                        <img
                          src="/assets/img/shape/22.png"
                          alt="Image Not Found"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="container">
                <div className="content">
                  <div className="shape">
                    <img src="/assets/img/shape/23.png" alt="Image Not Found" />

                    <img src="/assets/img/shape/24.png" alt="Image Not Found" />
                  </div>

                  <div className="row align-center">
                    <div className="col-lg-6">
                      <h4>
                        {"Purchase today. just "}
                        <strong>$58</strong>
                      </h4>

                      <h2>French Break Cheesy Pizza</h2>

                      <p>
                        {
                          " Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing know. "
                        }
                      </p>

                      <div className="button mt-40">
                        <a
                          className="btn btn-theme btn-md animation"
                          href="/shop"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="thumb">
                        <img
                          src="/assets/img/illustration/pizza.png"
                          alt="Image Not Found"
                        />

                        <img
                          src="/assets/img/shape/22.png"
                          alt="Image Not Found"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-nav-left">
            <div className="swiper-button-prev" />

            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
      <div
        className="menu-style-five-area default-padding bg-cover"
        style={{
          backgroundImage: "url(/assets/img/shape/3.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="thumb-style-two">
                <div className="fun-fact-style-two mb-40">
                  <div className="icon">
                    <img src="/assets/img/icon/2.png" alt="Image Not Found" />
                  </div>

                  <div className="fun-fact">
                    <div className="counter">
                      <div className="timer" data-to="500" data-speed="2000">
                        500
                      </div>

                      <div className="operator">+</div>
                    </div>

                    <span className="medium">Menu and Dishes</span>
                  </div>
                </div>

                <img
                  className="wow fadeInLeft"
                  src="/assets/img/thumb/6.jpg"
                  alt="Image Not Found"
                />
              </div>
            </div>

            <div className="col-xl-6 offset-xl-1 col-lg-6">
              <h4 className="sub-heading">Food Items</h4>

              <h2 className="title split-text">Starters &amp; Main Dishes</h2>

              <div className="food-menu-style-five-items mt-65 wow fadeInUp">
                <ul
                  className="nav nav-tabs food-menu-five-navs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="tab_1"
                      data-bs-toggle="tab"
                      data-bs-target="#tabs_1"
                      type="button"
                      role="tab"
                      aria-controls="tabs_1"
                      aria-selected="true"
                    >
                      {" Main Dishes "}
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tab_2"
                      data-bs-toggle="tab"
                      data-bs-target="#tabs_2"
                      type="button"
                      role="tab"
                      aria-controls="tabs_2"
                      aria-selected="false"
                    >
                      {" Desserts "}
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tab_3"
                      data-bs-toggle="tab"
                      data-bs-target="#tabs_3"
                      type="button"
                      role="tab"
                      aria-controls="tabs_3"
                      aria-selected="false"
                    >
                      {" Sea Food "}
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tab_4"
                      data-bs-toggle="tab"
                      data-bs-target="#tabs_4"
                      type="button"
                      role="tab"
                      aria-controls="tabs_4"
                      aria-selected="false"
                    >
                      {" Beverage "}
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="tabs_1"
                    role="tabpanel"
                    aria-labelledby="tab_1"
                  >
                    <ul className="meal-type">
                      <li>Half</li>

                      <li>Full</li>
                    </ul>

                    <ul className="meal-items style-two">
                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Chicken Alfredo</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$20</span>

                              <span>$30</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Fish &amp; Chips</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$36</span>

                              <span>$55</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Atlantic / chips / salad /tartare "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Ebony Fillet Steak</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$44</span>

                              <span>$88</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Truffle mash / pepper sauce. "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Chicken Alfredo</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$20</span>

                              <span>$30</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="tabs_2"
                    role="tabpanel"
                    aria-labelledby="tab_2"
                  >
                    <ul className="meal-type">
                      <li>Half</li>

                      <li>Full</li>
                    </ul>

                    <ul className="meal-items style-two">
                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Cupcakes</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$10</span>

                              <span>$20</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Brownies</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$16</span>

                              <span>$34</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Atlantic / chips / salad /tartare "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Muffins</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$22</span>

                              <span>$36</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Truffle mash / pepper sauce. "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Cheesecakes</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$34</span>

                              <span>$66</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="tabs_3"
                    role="tabpanel"
                    aria-labelledby="tab_3"
                  >
                    <ul className="meal-type">
                      <li>Half</li>

                      <li>Full</li>
                    </ul>

                    <ul className="meal-items style-two">
                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Salmon Fry</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$40</span>

                              <span>$70</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Pangasius or Basa</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$15</span>

                              <span>$55</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Atlantic / chips / salad /tartare "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Clams</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$45</span>

                              <span>$78</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Truffle mash / pepper sauce. "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Red Crab</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$20</span>

                              <span>$30</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="tabs_4"
                    role="tabpanel"
                    aria-labelledby="tab_4"
                  >
                    <ul className="meal-type">
                      <li>Half</li>

                      <li>Full</li>
                    </ul>

                    <ul className="meal-items style-two">
                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Wine</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$34</span>

                              <span>$66</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Coffee</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$45</span>

                              <span>$80</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Atlantic / chips / salad /tartare "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">Hot chocolate</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$22</span>

                              <span>$45</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Truffle mash / pepper sauce. "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="content">
                          <div className="top">
                            <div className="title">
                              <h4>
                                <a href="/shop-single">CMilk Shake</a>
                              </h4>
                            </div>

                            <div className="price">
                              <span>$20</span>

                              <span>$30</span>
                            </div>
                          </div>

                          <div className="bottom">
                            <div className="left">
                              <p>{" Ricotta / goat cheese / beetroot "}</p>
                            </div>

                            <div className="right">
                              <p>{" Extra Free Juice. "}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="feature-style-two-area default-padding bg-dark text-light"
        style={{
          backgroundImage: "url(/assets/img/shape/11.png)",
        }}
      >
        <div
          className="light-banner-active bg-dark"
          style={{
            backgroundImage: "url(/assets/img/shape/11-dark.png)",
          }}
        />

        <div className="shape">
          <img src="/assets/img/shape/10.png" alt="Image Not Found" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-5 feature-product-item">
              <a
                className="wow fadeInUp"
                href="#"
                style={{
                  backgroundImage: "url(/assets/img/shape/7.jpg)",
                }}
              >
                <div className="info">
                  <h2>Maxican Pizza</h2>

                  <span className="btn circle btn-md btn-light animation">
                    Make an order
                  </span>
                </div>

                <div className="thumb">
                  <img
                    src="/assets/img/illustration/7.png"
                    alt="Image Not Found"
                  />

                  <div
                    className="offer"
                    style={{
                      backgroundImage: "url(/assets/img/shape/12.png)",
                    }}
                  >
                    {"50% Off "}
                  </div>
                </div>
              </a>
            </div>

            <div className="col-lg-7 feature-product-item">
              <a
                className="wow fadeInUp"
                data-wow-delay="200ms"
                href="#"
                style={{
                  backgroundImage: "url(/assets/img/shape/9.jpg)",
                }}
              >
                <div className="info">
                  <h2>Luger Burger</h2>

                  <span className="btn circle btn-md btn-theme animation">
                    Make an order
                  </span>
                </div>

                <div className="thumb">
                  <img
                    src="/assets/img/illustration/6.png"
                    alt="Image Not Found"
                  />

                  <div
                    className="offer"
                    style={{
                      backgroundImage: "url(/assets/img/shape/12.png)",
                    }}
                  >
                    Best Deal
                  </div>
                </div>
              </a>

              <a
                className="wow fadeInUp"
                data-wow-delay="400ms"
                href="#"
                style={{
                  backgroundImage: "url(/assets/img/shape/8.jpg)",
                }}
              >
                <div className="info">
                  <h2>Delicious crab</h2>

                  <span className="btn circle btn-md btn-dark animation">
                    Make an order
                  </span>
                </div>

                <div className="thumb">
                  <img
                    src="/assets/img/illustration/9.png"
                    alt="Image Not Found"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="validtheme-shop-area default-padding text-center">
        <div className="shape-seperate">
          <img src="/assets/img/shape/14.png" alt="Image Not Found" />

          <img src="/assets/img/shape/15.png" alt="Image Not Found" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Best Deal</h4>

                <h2 className="title split-text">Our Popular Dishes</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="vt-products columns-4">
                <li className="product wow fadeInUp">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/1.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="200ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <span className="onsale">Sale!</span>

                      <a href="/shop-single">
                        <img src="/assets/img/shop/2.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="400ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/3.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="600ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/5.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/8.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="200ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/6.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="400ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/7.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>

                <li className="product wow fadeInUp" data-wow-delay="600ms">
                  <div className="product-contents">
                    <div className="product-image">
                      <a href="/shop-single">
                        <img src="/assets/img/shop/4.png" alt="Product" />
                      </a>

                      <div className="shop-action">
                        <ul>
                          <li className="cart">
                            <a href="#">
                              <span>Add to Cart</span>
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
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
                  Delicious Burger
                </h2>

                <p>
                  {
                    " It is a long established fact that a reader will be distracted lorem the readable content of a page when looking "
                  }
                </p>

                <div className="counter-class" data-date="2025-8-24 23:59:59">
                  <div className="item-list">
                    <div className="counter-item">
                      <div className="item">
                        <h5>
                          <span className="counter-days" />
                          {" Days"}
                        </h5>
                      </div>
                    </div>

                    <div className="counter-item">
                      <div className="item">
                        <h5>
                          <span className="counter-hours" />
                          {" Hours"}
                        </h5>
                      </div>
                    </div>

                    <div className="counter-item">
                      <div className="item">
                        <h5>
                          <span className="counter-minutes" />
                          {" Minutes"}
                        </h5>
                      </div>
                    </div>

                    <div className="counter-item">
                      <div className="item">
                        <h5>
                          <span className="counter-seconds" />
                          {" Seconds"}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 offset-lg-1">
              <div className="offer-item-thumb">
                <img
                  src="/assets/img/illustration/18.png"
                  alt="Image Not Found"
                />

                <img
                  src="/assets/img/illustration/19.png"
                  alt="Image Not Found"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chef-style-one-area default-padding bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Professional Chef</h4>

                <h2 className="title split-text">Meet Our Kitchen Kings</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 chef-one-single mb-30">
              <div className="chef-style-one-item wow fadeInUp">
                <div className="thumb">
                  <img src="/assets/img/team/1.jpg" alt="Image Not Found" />

                  <ul className="chef-one-social">
                    <li className="facebook">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-dribbble" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Alexander Petllo</a>
                  </h4>

                  <span>Assistant Chef</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 chef-one-single mb-30">
              <div
                className="chef-style-one-item wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div className="thumb">
                  <img src="/assets/img/team/2.jpg" alt="Image Not Found" />

                  <ul className="chef-one-social">
                    <li className="facebook">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-dribbble" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Mendia Juxef</a>
                  </h4>

                  <span>Burger King</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 chef-one-single mb-30">
              <div
                className="chef-style-one-item wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="thumb">
                  <img src="/assets/img/team/3.jpg" alt="Image Not Found" />

                  <ul className="chef-one-social">
                    <li className="facebook">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-dribbble" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Petro William</a>
                  </h4>

                  <span>Main Chef</span>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 chef-one-single mb-30">
              <div
                className="chef-style-one-item wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="thumb">
                  <img src="/assets/img/team/4.jpg" alt="Image Not Found" />

                  <ul className="chef-one-social">
                    <li className="facebook">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-dribbble" />
                      </a>
                    </li>

                    <li className="twitter">
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Kunnel Jexos</a>
                  </h4>

                  <span>Pizza Master</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialsSection />
      <div className="gallery-style-two-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Food Item</h4>

                <h2 className="title split-text">Our Restaurant Gallery</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="gallery-content-items">
              <div id="portfolio-grid" className="gallery-items colums-3">
                <div className="pf-item wow fadeInUp">
                  <div className="gallery-style-one">
                    <div className="item">
                      <a
                        href="/assets/img/portfolio/2.jpg"
                        className="popup-gallery"
                      >
                        <img
                          src="/assets/img/portfolio/2.jpg"
                          alt="Image Not Found"
                        />

                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pf-item wow fadeInUp">
                  <div className="gallery-style-one">
                    <div className="item">
                      <a
                        href="/assets/img/portfolio/1.jpg"
                        className="popup-gallery"
                      >
                        <img
                          src="/assets/img/portfolio/1.jpg"
                          alt="Image Not Found"
                        />

                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pf-item wow fadeInUp">
                  <div className="gallery-style-one">
                    <div className="item">
                      <a
                        href="/assets/img/portfolio/5.jpg"
                        className="popup-gallery"
                      >
                        <img
                          src="/assets/img/portfolio/5.jpg"
                          alt="Image Not Found"
                        />

                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pf-item wow fadeInUp">
                  <div className="gallery-style-one">
                    <div className="item">
                      <a
                        href="/assets/img/portfolio/6.jpg"
                        className="popup-gallery"
                      >
                        <img
                          src="/assets/img/portfolio/6.jpg"
                          alt="Image Not Found"
                        />

                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pf-item wow fadeInUp">
                  <div className="gallery-style-one">
                    <div className="item">
                      <a
                        href="/assets/img/portfolio/3.jpg"
                        className="popup-gallery"
                      >
                        <img
                          src="/assets/img/portfolio/3.jpg"
                          alt="Image Not Found"
                        />

                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="brand-area overflow-hidden default-padding bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="brand-heaidng text-center mb-50">
                <h3>{"GLOBAL 5K+ HAPPY SPONSORS WITH US "}</h3>
              </div>

              <div className="brand-style-one-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src="/assets/img/brand/1.png" alt="Thumb" />
                  </div>

                  <div className="swiper-slide">
                    <img src="/assets/img/brand/2.png" alt="Thumb" />
                  </div>

                  <div className="swiper-slide">
                    <img src="/assets/img/brand/3.png" alt="Thumb" />
                  </div>

                  <div className="swiper-slide">
                    <img src="/assets/img/brand/4.png" alt="Thumb" />
                  </div>

                  <div className="swiper-slide">
                    <img src="/assets/img/brand/5.png" alt="Thumb" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeBlogSection />
      <Footer />
    </LegacyPage>
  );
}
