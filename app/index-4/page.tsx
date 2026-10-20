import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { HomeBlogSection } from "../components/shared/HomeBlogSection";
import { Preloader } from "../components/shared/Preloader";
import { SiteHeader } from "../components/shared/SiteHeader";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ThemeToggle } from "../components/shared/ThemeToggle";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <div className="top-bar-area top-bar-style-one bg-theme text-light bg-transparent">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-7">
              <ul className="item-flex">
                <li>
                  <a href="tel:+4733378901">
                    <img src="/assets/img/icon/10.png" alt="Icon" />
                    {" Phone: +4733378901 "}
                  </a>
                </li>

                <li>
                  <a href="mailto:name@email.com">
                    <img src="/assets/img/icon/11.png" alt="Icon" />
                    {" Email: food@restan.com "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-5 text-end">
              <p>
                <i className="fas fa-map-marker-alt" />
                {" 175 10h Street, Office 375 Berlin, De 21562 "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <SiteHeader />
      <div className="banner-area banner-style-one navigation-circle overflow-hidden text-light">
        <div className="banner-fade">
          <div className="swiper-wrapper">
            <div
              className="swiper-slide bg-cover shadow dark"
              style={{
                background: "url(/assets/img/banner/5.jpg)",
              }}
            >
              <div className="container">
                <div className="content">
                  <div className="row align-center">
                    <div className="col-xl-7 col-lg-9">
                      <h4>Buffet</h4>

                      <h2>Family Packages</h2>

                      <ul>
                        <li>
                          <i className="flaticon-hamburger" />
                          {" 40 Food "}
                        </li>

                        <li>
                          <i className="flaticon-champagne-glass" />
                          {" 19 Drinks "}
                        </li>

                        <li>
                          <i className="flaticon-coffee-cup" />
                          {" 28 Soup "}
                        </li>
                      </ul>

                      <div className="button mt-40">
                        <a
                          className="btn btn-theme btn-md animation"
                          href="/shop"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="swiper-slide bg-cover shadow dark"
              style={{
                background: "url(/assets/img/banner/4.jpg)",
              }}
            >
              <div className="container">
                <div className="content">
                  <div className="row align-center">
                    <div className="col-xl-7 col-lg-9">
                      <h4>Buffet</h4>

                      <h2>Official Packages</h2>

                      <ul>
                        <li>
                          <i className="flaticon-hamburger" />
                          {" 40 Food "}
                        </li>

                        <li>
                          <i className="flaticon-champagne-glass" />
                          {" 19 Drinks "}
                        </li>

                        <li>
                          <i className="flaticon-coffee-cup" />
                          {" 28 Soup "}
                        </li>
                      </ul>

                      <div className="button mt-40">
                        <a
                          className="btn btn-theme btn-md animation"
                          href="/shop"
                        >
                          Order Now
                        </a>
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
      <div className="about-style-one-area default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6">
              <div className="thumb-style-one">
                <img
                  className="wow fadeInUp"
                  src="/assets/img/about/1.jpg"
                  alt="Image Not Found"
                />

                <div
                  className="contact-card-one wow fadeInLeft"
                  data-wow-delay="200ms"
                >
                  <a href="tel:+4733378901">
                    <div className="icon">
                      <i className="fa fa-phone" />
                    </div>

                    <div className="info">
                      <span>HOTLINE 24/7</span>

                      <h4>+473337890</h4>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-5 offset-lg-1">
              <div className="about-style-one-info">
                <h4 className="sub-heading">Our Story</h4>

                <h2 className="title split-text">
                  Until I discovered cooking I was never really interested in
                  anything
                </h2>

                <div className="content mt-50">
                  <p className="split-text">
                    {
                      " The first restaurant proprietor is believed to have been one A. Boulanger, a soup vendor, who opened his business in Paris in 1765. The sign above his door advertised restoratives, or restaurants, referring to the soups and broths available within. "
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="services-style-one-area default-padding-top text-light">
        <div className="container">
          <div className="heading-left text-light">
            <div className="row">
              <div className="col-xl-6 col-lg-7">
                <h4 className="sub-heading">Food Bundles</h4>

                <h2 className="title split-text">
                  Convenient bundles of delicious food items
                </h2>
              </div>

              <div className="col-xl-5 offset-xl-1 col-lg-4 offset-lg-1">
                <div className="services-swiper-nav">
                  <div className="services-pagination" />

                  <div className="services-button-prev" />

                  <div className="services-button-next" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container container-stage">
          <div className="row">
            <div className="col-lg-12">
              <div className="service-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div
                      className="services-style-one bg-cover"
                      style={{
                        backgroundImage: "url(/assets/img/service/1.jpg)",
                      }}
                    >
                      <div className="icon">
                        <img
                          src="/assets/img/icon/1.png"
                          alt="Image Not Found"
                        />
                      </div>

                      <h4>
                        <a href="#">Fine Dining</a>
                      </h4>

                      <p>
                        {
                          " Belonging sir curiosity discovery extremity yet forfeited prevailed own off. Travelling by introduced of mr terminated. "
                        }
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div
                      className="services-style-one bg-cover"
                      style={{
                        backgroundImage: "url(/assets/img/service/2.jpg)",
                      }}
                    >
                      <div className="icon">
                        <i className="flaticon-champagne-glass" />
                      </div>

                      <h4>
                        <a href="#">Party and Event</a>
                      </h4>

                      <p>
                        {
                          " Belonging sir curiosity discovery extremity yet forfeited prevailed own off. Travelling by introduced of mr terminated. "
                        }
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div
                      className="services-style-one bg-cover"
                      style={{
                        backgroundImage: "url(/assets/img/service/3.jpg)",
                      }}
                    >
                      <div className="icon">
                        <i className="flaticon-buffet" />
                      </div>

                      <h4>
                        <a href="#">Buffet</a>
                      </h4>

                      <p>
                        {
                          " Belonging sir curiosity discovery extremity yet forfeited prevailed own off. Travelling by introduced of mr terminated. "
                        }
                      </p>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div
                      className="services-style-one bg-cover"
                      style={{
                        backgroundImage: "url(/assets/img/service/4.jpg)",
                      }}
                    >
                      <div className="icon">
                        <i className="flaticon-moving-truck" />
                      </div>

                      <h4>
                        <a href="#">Home Delivery</a>
                      </h4>

                      <p>
                        {
                          " Belonging sir curiosity discovery extremity yet forfeited prevailed own off. Travelling by introduced of mr terminated. "
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Food Menu</h4>

                <h2 className="title">Discover Our Menu</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="food-menu-area">
            <div className="row">
              <div className="col-md-12 food-menu-content text-center">
                <div className="mix-item-menu">
                  <button className="active" data-filter="*">
                    All
                  </button>

                  <button data-filter=".pancakes">Pancakes</button>

                  <button data-filter=".sandwiches">Sandwiches</button>

                  <button data-filter=".brunch">Brunch</button>

                  <button data-filter=".vegetarian">Vegetarian</button>

                  <button data-filter=".meat">Meat</button>
                </div>

                <div className="masonary">
                  <div id="portfolio-grid" className="food-menu-lists colums-3">
                    <div className="food-menu-style-one pf-item pancakes meat">
                      <div className="item wow fadeInUp">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/1.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Crispy Crust Pizzeria</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Mutton / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$5.90</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="food-menu-style-one pf-item sandwiches vegetarian">
                      <div className="item wow fadeInUp" data-wow-delay="200ms">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/2.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Luger Burger</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Beef / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$12.18</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="food-menu-style-one pf-item sandwiches brunch">
                      <div className="item wow fadeInUp" data-wow-delay="400ms">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/3.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Fries McDonald's</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Chicken / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$16.00</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="food-menu-style-one pf-item brunch">
                      <div className="item wow fadeInUp">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/4.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Chicken Popeyes</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Mutton / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$12.10</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="food-menu-style-one pf-item meat pancakes">
                      <div className="item wow fadeInUp" data-wow-delay="200ms">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/5.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Chicken Sandwich</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Chicken / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$11.50</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="food-menu-style-one pf-item sandwiches vegetarian">
                      <div className="item wow fadeInUp" data-wow-delay="400ms">
                        <div className="thumb">
                          <a href="#">
                            <img src="/assets/img/menu/6.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <h4>
                            <a href="#">Salmon Steak</a>
                          </h4>

                          <p>
                            {
                              " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                            }
                          </p>

                          <div className="food-cats">
                            {" Beef / Olive Oil / Salt "}
                          </div>

                          <div className="item-price">
                            <div className="left">
                              <span>Price</span>

                              <h5>$5.90</h5>
                            </div>

                            <div className="right">
                              <a href="#">
                                <i className="fa fa-heart" />
                              </a>
                            </div>
                          </div>

                          <div className="button">
                            <a href="#">Order Now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="food-offera-rea default-padding bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="offser-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="offer-style-one">
                      <div className="shape">
                        <img
                          src="/assets/img/illustration/4.png"
                          alt="Image Not Found"
                        />
                      </div>

                      <div className="row align-center">
                        <div className="col-xl-6 col-lg-5">
                          <div className="thumb">
                            <img
                              src="/assets/img/thumb/1.jpg"
                              alt="Image Not Found"
                            />

                            <div className="discount-badge">
                              <strong>15%</strong>
                              {" Discount "}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-5 offset-xl-1 col-lg-6 offset-lg-1">
                          <div className="info">
                            <h2>Birthday Party</h2>

                            <p>
                              {
                                " use only the utensils provided for each food item. not use their fingers to touch any food items (“Please use the tongs provided.”) use clean plates, cutlery and napkins when they revisit the buffet for refills. supervise children who are serving themselves at the buffet. "
                              }
                            </p>

                            <ul>
                              <li>
                                <h5>Guest allowed</h5>

                                <div className="line-seperator" />

                                <h5>30 Person</h5>
                              </li>

                              <li>
                                <h5>{"Food Items "}</h5>

                                <div className="line-seperator" />

                                <h5>120+ Item</h5>
                              </li>

                              <li>
                                <h5>Time Timit</h5>

                                <div className="line-seperator" />

                                <h5>5 Hours</h5>
                              </li>
                            </ul>

                            <a
                              className="btn circle btn-md btn-light animation mt-10"
                              href="/about-us"
                            >
                              Book A Table
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="offer-style-one">
                      <div className="shape">
                        <img
                          src="/assets/img/illustration/4.png"
                          alt="Image Not Found"
                        />
                      </div>

                      <div className="row align-center">
                        <div className="col-xl-6 col-lg-5">
                          <div className="thumb">
                            <img
                              src="/assets/img/thumb/2.jpg"
                              alt="Image Not Found"
                            />

                            <div className="discount-badge">
                              <strong>15%</strong>
                              {" Discount "}
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-5 offset-xl-1 col-lg-6 offset-lg-1">
                          <div className="info">
                            <h2>Wedding Cremony</h2>

                            <p>
                              {
                                " use only the utensils provided for each food item. not use their fingers to touch any food items (“Please use the tongs provided.”) use clean plates, cutlery and napkins when they revisit the buffet for refills. supervise children who are serving themselves at the buffet. "
                              }
                            </p>

                            <ul>
                              <li>
                                <h5>Guest allowed</h5>

                                <div className="line-seperator" />

                                <h5>500 Person</h5>
                              </li>

                              <li>
                                <h5>{"Food Items "}</h5>

                                <div className="line-seperator" />

                                <h5>120+ Item</h5>
                              </li>

                              <li>
                                <h5>Time Timit</h5>

                                <div className="line-seperator" />

                                <h5>5 Hours</h5>
                              </li>
                            </ul>

                            <a
                              className="btn circle btn-md btn-light animation mt-10"
                              href="/about-us"
                            >
                              Book A Table
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
      <div className="reservation-style-one-area default-padding-top">
        <div className="container">
          <div className="reservation-style-one-items bg-dark text-light wow fadeInUp">
            <div className="row">
              <div className="col-xl-6 col-lg-5 reservation-thumb">
                <img src="/assets/img/thumb/3.jpg" alt="Image Not Found" />

                <div className="icon">
                  <img src="/assets/img/icon/1.png" alt="Image Not Found" />
                </div>
              </div>

              <div className="col-xl-6 col-lg-7 reservation-info">
                <h4 className="sub-heading">Reserve For</h4>

                <h2 className="title">Amazing Dining</h2>

                <form className="reservation-form" action="#">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>

                        <input
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="+4733378901"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="subject">Person</label>

                        <select id="subject">
                          <option value="1">1 Person</option>

                          <option value="2">2 Person</option>

                          <option value="4">3 Person</option>

                          <option value="5">4 Person</option>

                          <option value="6">5 Person</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-group date date-picker-one">
                        <label htmlFor="date">Date</label>

                        <input
                          type="text"
                          className="form-control"
                          id="date"
                          placeholder="Date"
                        />

                        <span className="input-group-addon">
                          <i className="fas fa-calendar-alt" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="time">Time</label>

                        <select id="time">
                          <option value="1">10:00 AM</option>

                          <option value="1">11:00 AM</option>

                          <option value="1">12:00 AM</option>

                          <option value="1">1:00 AM</option>

                          <option value="1">2:00 AM</option>

                          <option value="1">3:00 AM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button type="submit" name="submit" id="submit">
                        {" Book A Table "}
                      </button>
                    </div>
                  </div>
                </form>
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
