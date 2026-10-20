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
              <h1>Restaurant Chef</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Chef</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="chef-style-one-area default-padding bottom-less">
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

            <div className="col-lg-3 col-md-6 chef-one-single mb-30">
              <div className="chef-style-one-item wow fadeInUp">
                <div className="thumb">
                  <img src="/assets/img/team/5.jpg" alt="Image Not Found" />

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
                  <img src="/assets/img/team/6.jpg" alt="Image Not Found" />

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
                  <img src="/assets/img/team/7.jpg" alt="Image Not Found" />

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
                  <img src="/assets/img/team/8.jpg" alt="Image Not Found" />

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
      <Footer />
    </LegacyPage>
  );
}
