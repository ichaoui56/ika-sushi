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
        className="breadcrumb-area bg-cover shadow dark text-center text-light"
        style={{
          backgroundImage: "url(/assets/img/shape/11.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1>Error Page</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>404</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="error-page-area default-padding text-center bg-cover">
        <div
          className="shape-left"
          style={{
            background: "url(/assets/img/shape/44-left.png)",
          }}
        />

        <div
          className="shape-right"
          style={{
            background: "url(/assets/img/shape/44-right.png)",
          }}
        />

        <div className="container">
          <div className="error-box">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h1>404</h1>

                <h2>Sorry Page Was Not Found!</h2>

                <p>
                  {
                    " Household shameless incommode at no objection behaviour. Especially do at he possession insensible sympathize boisterous it. Songs he on an widen me event truth. "
                  }
                </p>

                <a className="btn mt-20 btn-md btn-theme" href="/">
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
