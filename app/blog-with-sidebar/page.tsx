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
              <h1>Blog Sidebar</h1>

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
      <div className="blog-area full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                <div className="blog-item-box">
                  <div className="item">
                    <div className="thumb">
                      <a href="/blog-single-with-sidebar">
                        <img src="/assets/img/blog/v4.jpg" alt="Thumb" />
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
                          Announcing if attachment resolution sentiments to
                          constructions.
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
                          Minuter him own clothes but observe country at the
                          maintaining.
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
                          Overcame breeding point concerns has terminate the
                          hole family.
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

              <div className="sidebar col-xl-4 col-lg-5 col-md-12 mt-md-50 mt-xs-50">
                <aside>
                  <div className="sidebar-item search">
                    <div className="sidebar-info">
                      <form>
                        <input
                          type="text"
                          placeholder="Enter Keyword"
                          name="text"
                          className="form-control"
                        />

                        <button type="submit">
                          <i className="fas fa-search" />
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="sidebar-item recent-post">
                    <h4 className="title">Recent Post</h4>

                    <ul>
                      <li>
                        <div className="thumb">
                          <a href="/blog-single-with-sidebar">
                            <img src="/assets/img/menu/1.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <div className="meta-title">
                            <span className="post-date">12 Feb, 2020</span>
                          </div>

                          <a href="#blog-single-with-sidebar.html">
                            Commanded household smallness delivered.
                          </a>
                        </div>
                      </li>

                      <li>
                        <div className="thumb">
                          <a href="/blog-single-with-sidebar">
                            <img src="/assets/img/menu/2.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <div className="meta-title">
                            <span className="post-date">05 Jul, 2023</span>
                          </div>

                          <a href="/blog-single-with-sidebar">
                            {"Future Plan & Strategy for Consutruction "}
                          </a>
                        </div>
                      </li>

                      <li>
                        <div className="thumb">
                          <a href="/blog-single-with-sidebar">
                            <img src="/assets/img/menu/3.jpg" alt="Thumb" />
                          </a>
                        </div>

                        <div className="info">
                          <div className="meta-title">
                            <span className="post-date">29 Aug, 2020</span>
                          </div>

                          <a href="/blog-single-with-sidebar">
                            Melancholy particular devonshire alteration
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="sidebar-item category">
                    <h4 className="title">category list</h4>

                    <div className="sidebar-info">
                      <ul>
                        <li>
                          <a href="/blog-with-sidebar">
                            {"Business "}
                            <span>69</span>
                          </a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">
                            {"national "}
                            <span>25</span>
                          </a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">
                            {"sports "}
                            <span>18</span>
                          </a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">
                            {"megazine "}
                            <span>37</span>
                          </a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">
                            {"health "}
                            <span>12</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-item gallery">
                    <h4 className="title">Gallery</h4>

                    <div className="sidebar-info">
                      <ul>
                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/1.jpg" alt="thumb" />
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/2.jpg" alt="thumb" />
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/3.jpg" alt="thumb" />
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/4.jpg" alt="thumb" />
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/5.jpg" alt="thumb" />
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <img src="/assets/img/menu/6.jpg" alt="thumb" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-item archives">
                    <h4 className="title">Archives</h4>

                    <div className="sidebar-info">
                      <ul>
                        <li>
                          <a href="/blog-with-sidebar">Aug 2020</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">Sept 2020</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">Nov 2020</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">Dec 2020</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-item social-sidebar">
                    <h4 className="title">follow us</h4>

                    <div className="sidebar-info">
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

                        <li className="pinterest">
                          <a href="#">
                            <i className="fab fa-pinterest" />
                          </a>
                        </li>

                        <li className="linkedin">
                          <a href="#">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-item tags">
                    <h4 className="title">tags</h4>

                    <div className="sidebar-info">
                      <ul>
                        <li>
                          <a href="/blog-with-sidebar">Fashion</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">Education</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">nation</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">study</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">health</a>
                        </li>

                        <li>
                          <a href="/blog-with-sidebar">travel</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
