import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { HomeBlogSection } from "../components/shared/HomeBlogSection";
import { Preloader } from "../components/shared/Preloader";
import { SiteHeader } from "../components/shared/SiteHeader";
import { TestimonialsSection } from "../components/shared/TestimonialsSection";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { TopBar } from "../components/shared/TopBar";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage dark>
      <ThemeToggle dark />
      <Preloader />
      <TopBar />
      <SiteHeader />
      <div className="banner-area banner-style-two navigation-circle navigation-dark overflow-hidden">
        <div className="banner-fade swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="container">
                <div className="content">
                  <div className="row align-center">
                    <div className="col-lg-6">
                      <h2>Super deal Special lunch</h2>

                      <h4>
                        {"Purchase today. just "}
                        <strong>$65</strong>
                      </h4>

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
                          src="/assets/img/illustration/8.png"
                          alt="Image Not Found"
                        />

                        <img
                          src="/assets/img/shape/1.png"
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
                  <div className="row align-center">
                    <div className="col-lg-6">
                      <h2>Super deal Special lunch</h2>

                      <h4>
                        {"Purchase today. just "}
                        <strong>$65</strong>
                      </h4>

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
                          src="/assets/img/illustration/15.png"
                          alt="Image Not Found"
                        />

                        <img
                          src="/assets/img/shape/1.png"
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
        className="food-menu-style-two-area secondary default-padding bg-cover"
        style={{
          backgroundImage: "url(/assets/img/shape/3.jpg)",
        }}
      >
        <div className="container">
          <div className="food-menu-style-two">
            <div className="row align-center">
              <div className="col-lg-5">
                <div className="food-menu-style-two-thumb">
                  <img
                    className="wow fadeInDown"
                    src="/assets/img/menu/7.jpg"
                    alt="Image Not Found"
                  />
                </div>
              </div>

              <div className="col-lg-7">
                <div className="food-menu-style-two-content wow fadeInUp">
                  <h4 className="sub-heading">Fast Food Items</h4>

                  <ul className="meal-type">
                    <li>Half</li>

                    <li>Full</li>
                  </ul>

                  <ul className="meal-items">
                    <li>
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/1.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/2.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/3.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/4.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
              </div>
            </div>
          </div>

          <div className="food-menu-style-two">
            <div className="row align-center">
              <div className="col-lg-5">
                <div className="food-menu-style-two-thumb">
                  <img
                    className="wow fadeInUp"
                    src="/assets/img/menu/8.jpg"
                    alt="Image Not Found"
                  />
                </div>
              </div>

              <div className="col-lg-7">
                <div className="food-menu-style-two-content wow fadeInDown">
                  <h4 className="sub-heading">Dessert Items</h4>

                  <ul className="meal-type">
                    <li>Half</li>

                    <li>Full</li>
                  </ul>

                  <ul className="meal-items">
                    <li>
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/5.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/6.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/7.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
                      <div className="thumbnail">
                        <img
                          src="/assets/img/food/8.jpg"
                          alt="Image Not Found"
                        />
                      </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-style-two-area default-padding">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6">
              <div className="thumb-style-two wow fadeInUp">
                <img src="/assets/img/about/2.jpg" alt="Image Not Found" />
              </div>
            </div>

            <div className="col-lg-5 offset-lg-1">
              <div className="about-style-two-info">
                <h4 className="sub-heading">Welcome At</h4>

                <h2 className="title split-text">Restan Restaurant</h2>

                <p className="split-text">
                  {
                    " Codulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now "
                  }
                </p>

                <a className="btn btn-theme btn-md animation" href="/food-menu">
                  Explore menu
                </a>

                <ul className="launch-time">
                  <li className="wow fadeInUp">
                    <h4>Lunch</h4>

                    <ul>
                      <li>Saturday and Sunday</li>

                      <li>Reservations from 12pm to 1.30pm</li>
                    </ul>
                  </li>

                  <li className="wow fadeInUp">
                    <h4>Dinner</h4>

                    <ul>
                      <li>Thursday to Sunday</li>

                      <li>Reservations from 6pm to 8.45pm</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="food-cat-area default-padding bg-gray"
        style={{
          backgroundImage: "url(/assets/img/shape/3.png)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">Food Category</h4>

                <h2 className="title split-text">Top category of our menus</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="food-cat-carousel text-light swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="food-cat-item">
                      <a
                        href="#"
                        style={{
                          backgroundImage: "url(/assets/img/category/1.jpg)",
                        }}
                      >
                        <h4>Fast food</h4>

                        <span>80+ Items</span>
                      </a>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="food-cat-item">
                      <a
                        href="#"
                        style={{
                          backgroundImage: "url(/assets/img/category/2.jpg)",
                        }}
                      >
                        <h4>Sea food</h4>

                        <span>48+ Items</span>
                      </a>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="food-cat-item">
                      <a
                        href="#"
                        style={{
                          backgroundImage: "url(/assets/img/category/3.jpg)",
                        }}
                      >
                        <h4>Dessert</h4>

                        <span>45 Items</span>
                      </a>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="food-cat-item">
                      <a
                        href="#"
                        style={{
                          backgroundImage: "url(/assets/img/category/4.jpg)",
                        }}
                      >
                        <h4>Beverage</h4>

                        <span>18 Items</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="choose-us-style-one-area default-padding-bottom bg-gray">
        <div className="container">
          <div className="choose-us-style-one-items">
            <div className="row align-center">
              <div className="col-xl-6 choose-us-style-one-info">
                <h2 className="title split-text">
                  Enjoy your favorite food to the fullest
                </h2>

                <p className="split-text">
                  {
                    " The first restaurant proprietor is believed to have been one A. Boulanger, a soup vendor, who opened his business in Paris in 1765. The sign above his door advertised restoratives, or restaurants, referring to the soups and broths available within. "
                  }
                </p>

                <ul className="list-style-one">
                  <li>The food is amazing</li>

                  <li>The atmosphere is perfect</li>

                  <li>We offer something unique</li>
                </ul>

                <a
                  className="btn btn-theme btn-md animation mt-30"
                  href="/food-menu"
                >
                  Book A Table
                </a>
              </div>

              <div className="col-xl-6 text-light choose-us-style-one-content">
                <div
                  className="choose-us-style-one-item bg-cover bg-theme"
                  style={{
                    backgroundImage: "url(/assets/img/shape/7.jpg)",
                  }}
                >
                  <div className="fun-fact-style-one text-center">
                    <div className="icon">
                      <img
                        src="/assets/img/icon/12.png"
                        alt="Image Not Found"
                      />
                    </div>

                    <div className="counter">
                      <div className="timer" data-to="500" data-speed="2000">
                        500
                      </div>

                      <div className="operator">+</div>
                    </div>

                    <span className="medium">Menu and Dishes</span>
                  </div>
                </div>

                <div className="choose-us-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/thumb/4.jpg" alt="Image Not Found" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="shape">
              <img src="/assets/img/shape/24.png" alt="Image Not Found" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="video-bg-area text-center text-light video-bg-live bg-fixed"
        style={{
          backgroundImage: "url(/assets/img/banner/3.jpg)",
        }}
      >
        <div
          className="player"
          data-property="&#123;videoURL:'https://www.youtube.com/watch?v=hoiGV-N-2Gs',containment:'.video-bg-live', showControls:false, autoPlay:true, zoom:0, loop:true, mute:true, startAt:5, opacity:1, quality:'default'&#125;"
        />

        <div className="video-bg-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h2 className="title split-text">
                  We Always serve the vaping hot and delicious foods
                </h2>

                <a className="btn btn-theme btn-md animation mt-30" href="#">
                  Book a table
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="wavesshape">
          <img src="/assets/img/shape/6.png" alt="Shape" />
        </div>
      </div>
      <TestimonialsSection />
      <HomeBlogSection />
      <Footer />
    </LegacyPage>
  );
}
