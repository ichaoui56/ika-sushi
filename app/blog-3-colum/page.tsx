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
              <h1>Blog Grid</h1>

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
      <div className="blog-area blog-grid default-padding">
        <div className="container">
          <div className="blog-item-box">
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/1.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Burger</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          Announcing if attachment resolution sentiments at the
                          projection.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>18 March, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/2.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Food</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          This prefabricated passive are comfortable highly
                          sustainable.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>25 April, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/4.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Pizza</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          Minuter him own clothes but observe country at the
                          maintaining.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>15 June, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/5.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Restaurant</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          Bndulgence diminution so discovered mr apartments
                          sentiments.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>18 March, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/3.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Restaurant</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          Diminution so discovered mr apartments sentiments
                          projection.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>18 March, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-50">
                <div className="home-blog-style-one-item">
                  <div className="thumb">
                    <img src="/assets/img/blog/6.jpg" alt="Image not Found" />

                    <ul className="blog-meta">
                      <li>
                        <a href="#">Restaurant</a>
                      </li>
                    </ul>
                  </div>

                  <div className="content">
                    <div className="info">
                      <h4 className="post-title">
                        <a href="/blog-single-with-sidebar">
                          Discovered mr apartments sentiments at the projection.
                        </a>
                      </h4>

                      <ul className="meta-tags">
                        <li>18 March, 2024</li>

                        <li>
                          <a href="#">Md Sohag</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 pagi-area text-center">
              <nav aria-label="navigation">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="fas fa-angle-double-left" />
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
                      <i className="fas fa-angle-double-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
