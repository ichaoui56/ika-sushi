import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { FunFactsSection } from "../components/shared/FunFactsSection";
import { HomeBlogSection } from "../components/shared/HomeBlogSection";
import { Preloader } from "../components/shared/Preloader";
import { SiteHeader } from "../components/shared/SiteHeader";
import { ThemeToggle } from "../components/shared/ThemeToggle";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage dark>
      <ThemeToggle dark />
      <Preloader />
      <SiteHeader />
      <div
        className="banner-style-five-area text-center bg-gray"
        style={{
          backgroundImage: "url(/assets/img/shape/20.png)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1">
              <div className="content">
                <h2 className="wow fadeInUp" data-wow-delay="300ms">
                  {"The "}
                  <strong>Great</strong>
                  {" Restaurant"}
                </h2>

                <div className="curve-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 150 150"
                    version="1.1"
                  >
                    <path id="textPath" d="M 0,75 a 75,75 0 1,1 0,1 z" />

                    <text>
                      <textPath href="#textPath">
                        Best Food Since - 1865
                      </textPath>
                    </text>
                  </svg>

                  <a
                    href="https://www.youtube.com/watch?v=-4ahrKWt05I"
                    className="popup-youtube"
                  >
                    <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="banner-style-five-thumb bg-cover video-bg-live">
          <img src="/assets/img/banner/6.jpg" alt="Image Not Found" />

          <div
            className="player"
            data-property="&#123;videoURL:'uMAbWsMnKYk',containment:'.video-bg-live', showControls:false, autoPlay:true, zoom:0, loop:true, mute:true, startAt:103, opacity:1, quality:'default'&#125;"
          />
        </div>
      </div>
      <div className="about-style-three-area default-padding-bottom">
        <div className="container container-stage">
          <div className="about-style-three-items bg-gray-secondary">
            <div className="row">
              <div className="col-xl-4">
                <div className="about-style-three-content text-center">
                  <img src="/assets/img/shape/7.png" alt="Image Not Found" />

                  <h2 className="split-text">
                    Welcome To Our Luxury Restaurant
                  </h2>

                  <p className="wow fadeInUp" data-wow-delay="150ms">
                    {
                      " The first restaurant proprietor is believed to have been one A. Boulanger, a soup vendor, who opened his business in Paris in 1765. The sign above his door advertised restoratives, or restaurants, referring to the soups and broths available within. "
                    }
                  </p>

                  <div className="contact-card-one">
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

              <div className="col-xl-4 col-lg-6">
                <div className="about-style-one-thumb">
                  <img src="/assets/img/thumb/5.jpg" alt="Image Not Found" />
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div
                  className="opening-hours-style-one bg-theme text-light bg-cover"
                  style={{
                    backgroundImage: "url(/assets/img/shape/8.png)",
                  }}
                >
                  <h2 className="split-text">Opening Hours</h2>

                  <ul className="wow fadeInUp">
                    <li>
                      <span>{" Saturday : "}</span>

                      <div className="text-right">{" 6.00 am - 12.00 pm "}</div>
                    </li>

                    <li>
                      <span>{" Sunday : "}</span>

                      <div className="text-right">{" 8.30 am - 11.00 pm "}</div>
                    </li>

                    <li>
                      <span>{" Monday : "}</span>

                      <div className="text-right">{" 9.00 am - 10.30 pm "}</div>
                    </li>

                    <li>
                      <span>{" Tuesday : "}</span>

                      <div className="text-right">{" 8.00 am - 12.00 pm "}</div>
                    </li>

                    <li>
                      <span>{" Wednesday : "}</span>

                      <div className="text-right">{" 9.45 am - 10.00 pm "}</div>
                    </li>

                    <li>
                      <span>{" Thursday : "}</span>

                      <div className="pull-right">{" 8.15 am - 12.00 pm "}</div>
                    </li>

                    <li>
                      <span>{" Friday : "}</span>

                      <div className="pull-right closed">{" Closed "}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-type-area overflow-hidden default-padding bottom-less bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Food Menu</h4>

                <h2 className="title split-text">Discover Our Menu</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-md-6 menu-type-single mb-30">
              <div className="menu-type-item active wow fadeInUp">
                <div className="thumb">
                  <img
                    src="/assets/img/illustration/2.png"
                    alt="Image Not Found"
                  />

                  <img src="/assets/img/shape/9.png" alt="Image Not Found" />
                </div>

                <div className="info">
                  <h3>Breakfast</h3>

                  <ul className="menu-type-list">
                    <li>
                      <h6>Breakfast casserole</h6>

                      <div className="line-seperator" />

                      <h6>$20</h6>
                    </li>

                    <li>
                      <h6>Reek yogurt</h6>

                      <div className="line-seperator" />

                      <h6>$15</h6>
                    </li>

                    <li>
                      <h6>Cottage cheese</h6>

                      <div className="line-seperator" />

                      <h6>$18</h6>
                    </li>
                  </ul>

                  <a
                    href="/shop"
                    className="btn mt-40 circle btn-sm btn-theme effect"
                  >
                    Make Order
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 menu-type-single mb-30">
              <div
                className="menu-type-item wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="thumb">
                  <img
                    src="/assets/img/illustration/13.png"
                    alt="Image Not Found"
                  />

                  <img src="/assets/img/shape/9.png" alt="Image Not Found" />
                </div>

                <div className="info">
                  <h3>Lunch</h3>

                  <ul className="menu-type-list">
                    <li>
                      <h6>Buffalo Chicken Grain</h6>

                      <div className="line-seperator" />

                      <h6>$20</h6>
                    </li>

                    <li>
                      <h6>Creamy Rotisserie</h6>

                      <div className="line-seperator" />

                      <h6>$15</h6>
                    </li>

                    <li>
                      <h6>Ve ggie Mason</h6>

                      <div className="line-seperator" />

                      <h6>$18</h6>
                    </li>
                  </ul>

                  <a
                    href="/shop"
                    className="btn mt-40 circle btn-sm btn-theme effect"
                  >
                    Make Order
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6 menu-type-single mb-30">
              <div
                className="menu-type-item wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div className="thumb">
                  <img
                    src="/assets/img/illustration/14.png"
                    alt="Image Not Found"
                  />

                  <img src="/assets/img/shape/9.png" alt="Image Not Found" />
                </div>

                <div className="info">
                  <h3>Dinner</h3>

                  <ul className="menu-type-list">
                    <li>
                      <h6>Fried chicken</h6>

                      <div className="line-seperator" />

                      <h6>$20</h6>
                    </li>

                    <li>
                      <h6>Pizza</h6>

                      <div className="line-seperator" />

                      <h6>$15</h6>
                    </li>

                    <li>
                      <h6>Tossed salad</h6>

                      <div className="line-seperator" />

                      <h6>$18</h6>
                    </li>
                  </ul>

                  <a
                    href="/shop"
                    className="btn mt-40 circle btn-sm btn-theme effect"
                  >
                    Make Order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FunFactsSection />
      <div
        className="special-product-area default-padding bottom-less bg-gray text-center bg-cover"
        style={{
          backgroundImage: "url(/assets/img/shape/4.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Top Special</h4>

                <h2 className="title split-text">Our Specials Menu</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
              <div className="special-menu-style-one wow fadeInUp">
                <div className="thumb">
                  <img src="/assets/img/menu/1.jpg" alt="Image Not Found" />

                  <h4>$38</h4>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Pizza</a>
                  </h4>

                  <ul>
                    <li>Mutton, Olive Oil, Salt</li>
                  </ul>

                  <p>
                    {
                      " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
              <div
                className="special-menu-style-one wow fadeInUp"
                data-wow-delay="200ms"
              >
                <div className="thumb">
                  <img src="/assets/img/menu/2.jpg" alt="Image Not Found" />

                  <h4>$22</h4>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Burger</a>
                  </h4>

                  <ul>
                    <li>Atlantic, chips, tartare</li>
                  </ul>

                  <p>
                    {
                      " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
              <div
                className="special-menu-style-one wow fadeInUp"
                data-wow-delay="400ms"
              >
                <div className="thumb">
                  <img src="/assets/img/menu/3.jpg" alt="Image Not Found" />

                  <h4>$16</h4>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Lemonade</a>
                  </h4>

                  <ul>
                    <li>Ricotta, goat cheese, beetroot</li>
                  </ul>

                  <p>
                    {
                      " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
              <div
                className="special-menu-style-one wow fadeInUp"
                data-wow-delay="600ms"
              >
                <div className="thumb">
                  <img src="/assets/img/menu/4.jpg" alt="Image Not Found" />

                  <h4>$25</h4>
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Chicken Popeyes</a>
                  </h4>

                  <ul>
                    <li>Ricotta, goat cheese, beetroot</li>
                  </ul>

                  <p>
                    {
                      " Considered introduced themselves mr to discretion at. Means among saw hopes. "
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reservation-style-two-area">
        <div className="reservation-banner">
          <img src="/assets/img/banner/1.jpg" alt="Image Not Found" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-6">
              <div className="reservation-tabs">
                <ul
                  className="nav nav-tabs wow fadeInLeft"
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
                      <img src="/assets/img/icon/3.png" alt="Image Not Found" />
                      {" Buffet "}
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
                      <img src="/assets/img/icon/4.png" alt="Image Not Found" />
                      {" Party "}
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
                      <img src="/assets/img/icon/5.png" alt="Image Not Found" />
                      {" Event "}
                    </button>
                  </li>
                </ul>

                <div
                  className="tab-content wow fadeInUp"
                  data-wow-delay="300ms"
                  id="myTabContent"
                >
                  <h4 className="sub-heading">Reservation</h4>

                  <h2 className="title">Book A Table</h2>

                  <div
                    className="tab-pane fade show active"
                    id="tabs_1"
                    role="tabpanel"
                    aria-labelledby="tab_1"
                  >
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

                  <div
                    className="tab-pane fade"
                    id="tabs_2"
                    role="tabpanel"
                    aria-labelledby="tab_2"
                  >
                    <form className="reservation-form" action="#">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="phone2">Phone</label>

                            <input
                              className="form-control"
                              id="phone2"
                              name="phone2"
                              placeholder="+4733378901"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="subject2">Person</label>

                            <select id="subject2">
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
                            <label htmlFor="date2">Date</label>

                            <input
                              type="text"
                              className="form-control"
                              id="date2"
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
                            <label htmlFor="time2">Time</label>

                            <select id="time2">
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
                          <button type="submit" name="submit2" id="submit2">
                            {" Book A Table "}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="tabs_3"
                    role="tabpanel"
                    aria-labelledby="tab_3"
                  >
                    <form className="reservation-form" action="#">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="phone3">Phone</label>

                            <input
                              className="form-control"
                              id="phone3"
                              name="phone3"
                              placeholder="+4733378901"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="subject3">Person</label>

                            <select id="subject3">
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
                            <label htmlFor="date3">Date</label>

                            <input
                              type="text"
                              className="form-control"
                              id="date3"
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
                            <label htmlFor="time3">Time</label>

                            <select id="time3">
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
                          <button type="submit" name="submit3" id="submit3">
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
        </div>
      </div>
      <div className="testimonial-style-one-area default-padding text-center bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="testimonial-style-one-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-style-one">
                      <div className="item">
                        <div className="content">
                          <div className="tm-review">
                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />
                          </div>

                          <div className="provider">
                            <h4>Best Chicken Fry</h4>
                          </div>

                          <p>
                            {
                              ' "Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness." '
                            }
                          </p>

                          <div className="tm-proivder-thumb">
                            <img
                              src="/assets/img/food/1.jpg"
                              alt="Image Not Found"
                            />

                            <img
                              src="/assets/img/team/10.jpg"
                              alt="Image Not Found"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="testimonial-style-one">
                      <div className="item">
                        <div className="content">
                          <div className="tm-review">
                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />

                            <i className="fas fa-star" />
                          </div>

                          <div className="provider">
                            <h4>This pizza is so good</h4>
                          </div>

                          <p>
                            {
                              ' "Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness." '
                            }
                          </p>

                          <div className="tm-proivder-thumb">
                            <img
                              src="/assets/img/food/6.jpg"
                              alt="Image Not Found"
                            />

                            <img
                              src="/assets/img/team/11.jpg"
                              alt="Image Not Found"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="testimonial-pagination">
                <div className="swiper-pagination" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature-style-one-area default-padding-top overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 feature-one-single">
              <div className="feature-style-one-item wow fadeInUp">
                <img src="/assets/img/icon/6.png" alt="Image Not Found" />

                <h4>Best Quality Food</h4>

                <p>
                  {
                    " Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. "
                  }
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 feature-one-single">
              <div className="feature-style-one-item wow fadeInDown">
                <img src="/assets/img/icon/7.png" alt="Image Not Found" />

                <h4>Home delivery</h4>

                <p>
                  {
                    " Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. "
                  }
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 feature-one-single">
              <div className="feature-style-one-item wow fadeInUp">
                <img src="/assets/img/icon/8.png" alt="Image Not Found" />

                <h4>Real Taste</h4>

                <p>
                  {
                    " Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. "
                  }
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 feature-one-single">
              <div className="feature-style-one-item wow fadeInDown">
                <img src="/assets/img/icon/9.png" alt="Image Not Found" />

                <h4>Traditional food</h4>

                <p>
                  {
                    " Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. "
                  }
                </p>
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
