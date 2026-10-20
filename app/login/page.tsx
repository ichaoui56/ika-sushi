import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Preloader } from "../components/shared/Preloader";
import { ThemeToggle } from "../components/shared/ThemeToggle";

export const metadata: Metadata = {
  title: "Agrica - Organic Farm Agriculture Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <div className="login-area">
        <div className="container">
          <div className="login-items">
            <div className="row">
              <div className="col-lg-6">
                <div className="login-thumb">
                  <img src="/assets/img/banner/7.jpg" alt="Image Not Found" />

                  <div className="logo">
                    <a href="/">
                      <img
                        src="/assets/img/logo-light-2.png"
                        alt="Image Not Found"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="login-forms">
                  <h2>Welcome back</h2>

                  <p>{" Enter your email and password to continue "}</p>

                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Email*"
                            type="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <input
                            className="form-control"
                            placeholder="Password*"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button type="submit">{" Login "}</button>
                      </div>
                    </div>
                  </form>

                  <div className="login-alternative">
                    <h4>Or Login With</h4>

                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-google" />
                          {" Google"}
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                          {" Facebook"}
                        </a>
                      </li>
                    </ul>

                    <p>
                      {" Don't have any account? "}
                      <a href="/register">Register Now</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LegacyPage>
  );
}
