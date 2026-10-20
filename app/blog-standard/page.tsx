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
              <h1>Blog Standard</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Blog</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-area full-blog blog-standard default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-content col-xl-10 offset-xl-1 col-md-12">
              <div className="blog-item-box">
                <div className="item">
                  <div className="thumb">
                    <a href="/blog-single-with-sidebar">
                      <img src="/assets/img/blog/v1.jpg" alt="Thumb" />
                    </a>
                  </div>

                  <div className="info">
                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-calendar-alt" />
                            {" 12 Auguest, 2023"}
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" />
                            {" Admin"}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <h2>
                      <a href="/blog-single-with-sidebar">
                        Announcing if attachment resolution sentiments.
                      </a>
                    </h2>

                    <p>
                      {
                        " Bndulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now "
                      }
                    </p>

                    <a
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="item">
                  <div className="thumb">
                    <a href="/blog-single-with-sidebar">
                      <img src="/assets/img/blog/v2.jpg" alt="Thumb" />
                    </a>
                  </div>

                  <div className="info">
                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-calendar-alt" />
                            {" 12 July, 2023"}
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" />
                            {" Admin"}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <h2>
                      <a href="/blog-single-with-sidebar">
                        Minuter him own clothes but observe country.
                      </a>
                    </h2>

                    <p>
                      {
                        " Bndulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now "
                      }
                    </p>

                    <a
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="item">
                  <div className="thumb">
                    <a href="/blog-single-with-sidebar">
                      <img src="/assets/img/blog/v3.jpg" alt="Thumb" />
                    </a>
                  </div>

                  <div className="info">
                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-calendar-alt" />
                            {" 12 Auguest, 2023"}
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" />
                            {" Admin"}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <h2>
                      <a href="/blog-single-with-sidebar">
                        Overcame breeding point concerns has terminate
                      </a>
                    </h2>

                    <p>
                      {
                        " Bndulgence diminution so discovered mr apartments. Are off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now "
                      }
                    </p>

                    <a
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 pagi-area text-center">
                  <nav aria-label="navigation">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="fas fa-angle-left" />
                        </a>
                      </li>

                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>

                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>

                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>

                      <li className="page-item">
                        <a className="page-link" href="#">
                          <i className="fas fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
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
