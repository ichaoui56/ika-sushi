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
              <h1>Food Gallery</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Gallery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery-style-two-area default-padding">
        <div className="container">
          <div className="row">
            <div className="gallery-content-items">
              <div
                id="gallery-masonary"
                className="gallery-items gallery-style-two colums-3"
              >
                <div className="gallery-item">
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

                        <div className="overlay">
                          <span>Minion Drinks</span>

                          <h4>Cold Lemon Juice</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="gallery-item">
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

                        <div className="overlay">
                          <span>Grill Chicken</span>

                          <h4>Chicken Sandwich</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="gallery-item">
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

                        <div className="overlay">
                          <span>Cheesy Favourite</span>

                          <h4>Salmon Steak</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="gallery-item">
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

                        <div className="overlay">
                          <span>Cheesy Favourite</span>

                          <h4>Crispy Crust Pizzeria</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="gallery-item">
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

                        <div className="overlay">
                          <span>Grill Chicken</span>

                          <h4>Chicken Sandwich</h4>
                        </div>
                      </a>
                    </div>
                  </div>
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
