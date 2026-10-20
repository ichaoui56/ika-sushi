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
              <h1>Food Menu</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Menu</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        className="special-product-area default-padding bottom-less bg-gray text-center bg-cover"
        style={{
          backgroundImage: "url(/assets/img/shape/4.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 mb-30">
              <div className="special-menu-style-one">
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
              <div className="special-menu-style-one">
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
              <div className="special-menu-style-one">
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
              <div className="special-menu-style-one">
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
                  className="nav nav-tabs wow fadeInDown"
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

                <div className="tab-content wow fadeInUp" id="myTabContent">
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
                              src="/assets/img/team/5.jpg"
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
      <div className="feature-style-one-area default-padding overflow-hidden">
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
      <Footer />
    </LegacyPage>
  );
}
