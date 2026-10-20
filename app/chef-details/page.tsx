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
              <h1>Chef Details</h1>

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
      <div className="chef-single-area bg-gray default-padding-top">
        <div className="container">
          <div className="chef-content-top">
            <div className="row align-center">
              <div className="col-lg-5 left-info">
                <div className="thumb wow fadeInUp">
                  <img src="/assets/img/team/2.jpg" alt="Thumb" />
                </div>
              </div>

              <div className="col-lg-7 right-info pl-80 pl-md-15 pl-xs-15 wow fadeInDown">
                <h2>Lucas Ethan</h2>

                <p>
                  {
                    " Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from. "
                  }
                </p>

                <ul>
                  <li>
                    <i className="fas fa-map-marker-alt" />

                    <p>{" 175 10h Street, Office 375 Berlin, De 21562 "}</p>
                  </li>

                  <li>
                    <i className="fas fa-envelope" />

                    <a href="mailto:support@digital.com">support@digital.com</a>
                  </li>

                  <li>
                    <i className="fas fa-phone-alt" />

                    <a href="tel:123-456-7890">+44-20-7328-4499</a>
                  </li>
                </ul>

                <div className="social">
                  <a className="btn circle btn-sm btn-theme animation" href="#">
                    Contact Me
                  </a>

                  <div className="share-link">
                    <i className="fas fa-share-alt" />

                    <ul>
                      <li className="facebook">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>

                      <li className="twitter">
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>

                      <li className="youtube">
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-info bg-light default-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="chef-single-list">
                  <div className="chef-list-item wow fadeInUp">
                    <h4>Education</h4>

                    <ul>
                      <li>
                        <h5>Residential College</h5>

                        <span>BA Honours - Biology</span>

                        <p>{" 2004 - 2008 "}</p>
                      </li>

                      <li>
                        <h5>University of Iowa</h5>

                        <span>Master's degree - Macroeconomics</span>

                        <p>{" 2009 - 2012 "}</p>
                      </li>
                    </ul>
                  </div>

                  <div className="chef-list-item wow fadeInUp">
                    <h4>Experience</h4>

                    <ul>
                      <li>
                        <h5>Senior Chef</h5>

                        <span>Dubia Arab Hotel</span>

                        <p>{" 31 Aug, 2013 "}</p>
                      </li>

                      <li>
                        <h5>Master of Restaurant</h5>

                        <span>Muskan Food Factory</span>

                        <p>{" 12 Dec 2018 "}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="skill-items">
                  <h3>Personal Skills</h3>

                  <div className="progress-box">
                    <h5>Fast Food</h5>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        data-width="88"
                      >
                        <span>88%</span>
                      </div>
                    </div>
                  </div>

                  <div className="progress-box">
                    <h5>Sea Food</h5>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        data-width="95"
                      >
                        <span>95%</span>
                      </div>
                    </div>
                  </div>

                  <div className="progress-box">
                    <h5>Drinks &amp; Juice</h5>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        data-width="80"
                      >
                        <span>80%</span>
                      </div>
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
