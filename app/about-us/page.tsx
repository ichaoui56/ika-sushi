import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { FunFactsSection } from "../components/shared/FunFactsSection";
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
              <h1>About Us</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>About</li>
              </ul>
            </div>
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
      <div className="brand-area overflow-hidden default-padding bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="brand-heaidng mb-50">
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
      <FunFactsSection />
      <div className="chef-style-one-area default-padding bottom-less bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Professional Chef</h4>

                <h2 className="title">Meet Our Kitchen Kings</h2>
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
      <div
        className="testimonial-style-one-area default-padding text-center"
        style={{
          backgroundImage: "url(/assets/img/shape/4.png)",
        }}
      >
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
      <Footer />
    </LegacyPage>
  );
}
