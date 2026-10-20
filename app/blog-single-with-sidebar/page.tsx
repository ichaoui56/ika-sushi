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
              <h1>Blog Single</h1>

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
      <div className="blog-area single full-blog right-sidebar full-blog default-padding">
        <div className="container">
          <div className="blog-items">
            <div className="row">
              <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
                <div className="blog-style-two item">
                  <div className="blog-item-box">
                    <div className="thumb">
                      <a href="#">
                        <img src="/assets/img/blog/v4.jpg" alt="Thumb" />
                      </a>
                    </div>

                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fas fa-calendar-alt" />
                              {" March 16, 2023"}
                            </a>
                          </li>

                          <li>
                            <a href="#">
                              <i className="fas fa-user-circle" />
                              {" Md Sohag"}
                            </a>
                          </li>
                        </ul>
                      </div>

                      <p>
                        {
                          " Give lady of they such they sure it. Me contained explained my education. Vulgar as hearts by garret. Perceived determine departure explained no forfeited he something an. Contrasted dissimilar get joy you instrument out reasonably. Again keeps at no meant stuff. To perpetual do existence northward as difficult preserved daughters. Continued at up to zealously necessary breakfast. Surrounded sir motionless she end literature. Gay direction neglected but supported yet her. "
                        }
                      </p>

                      <p>
                        {
                          " New had happen unable uneasy. Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves. "
                        }
                      </p>

                      <blockquote>
                        {
                          " Celebrated share of first to worse. Weddings and any opinions suitable smallest nay. Houses or months settle remove ladies appear. Engrossed suffering supposing he recommend do eagerness. "
                        }
                      </blockquote>

                      <p>
                        {
                          " Drawings can followed improved out sociable not. Earnestly so do instantly pretended. See general few civilly amiable pleased account carried. Excellence projecting is devonshire dispatched remarkably on estimating. Side in so life past. Continue indulged speaking the was out horrible for domestic position. Seeing rather her you not esteem men settle genius excuse. Deal say over you age from. Comparison new ham melancholy son themselves. "
                        }
                      </p>

                      <h3>Conduct replied off led whether?</h3>

                      <ul>
                        <li>Pretty merits waited six</li>

                        <li>
                          General few civilly amiable pleased account carried.
                        </li>

                        <li>Continue indulged speaking</li>

                        <li>Narrow formal length my highly</li>

                        <li>
                          Occasional pianoforte alteration unaffected impossible
                        </li>
                      </ul>

                      <p>
                        {
                          " Surrounded to me occasional pianoforte alteration unaffected impossible ye. For saw half than cold. Pretty merits waited six talked pulled you. Conduct replied off led whether any shortly why arrived adapted. Numerous ladyship so raillery humoured goodness received an. So narrow formal length my highly longer afford oh. Tall neat he make or at dull ye. Lorem ipsum dolor, sit amet consectetur adipisicing, elit. Iure, laudantium, tempore. Autem dolore repellat, omnis quam? Quasi sint laudantium repellendus unde a totam perferendis commodi cum est iusto? Minima, laborum. "
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="post-author">
                  <div className="thumb">
                    <img src="/assets/img/team/13.jpg" alt="Thumb" />
                  </div>

                  <div className="info">
                    <h4>
                      <a href="#">Md Sohag</a>
                    </h4>

                    <p>
                      {
                        " Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur elit. Vesti at bulum nec at odio aea the dumm ipsumm ipsum that dolocons rsus mal suada and fadolorit to the consectetur elit. All the Lorem Ipsum generators on the Internet tend. Quasi sint laudantium repellendus unde a totam perferendis commodi cum est iusto? Minima, laborum. "
                      }
                    </p>
                  </div>
                </div>

                <div className="post-tags share">
                  <div className="tags">
                    <h4>{"Tags: "}</h4>

                    <a href="#">Algorithm</a>

                    <a href="$">Data science</a>
                  </div>

                  <div className="social">
                    <h4>Share:</h4>

                    <ul>
                      <li>
                        <a className="facebook" href="#" target="_blank">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>

                      <li>
                        <a className="twitter" href="#" target="_blank">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>

                      <li>
                        <a className="pinterest" href="#" target="_blank">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </li>

                      <li>
                        <a className="linkedin" href="#" target="_blank">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="post-pagi-area">
                  <div className="post-previous">
                    <a href="#">
                      <div className="icon">
                        <i className="fas fa-angle-double-left" />
                      </div>

                      <div className="nav-title">
                        {" Previus Post "}
                        <h5>Discovery incommode</h5>
                      </div>
                    </a>
                  </div>

                  <div className="post-next">
                    <a href="#">
                      <div className="nav-title">
                        {"Next Post "}
                        <h5>Discovery incommode</h5>
                      </div>

                      <div className="icon">
                        <i className="fas fa-angle-double-right" />
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-comments">
                  <div className="comments-area">
                    <div className="comments-title">
                      <h3>
                        3 Comments On “Providing Top Quality Cleaning Related
                        Services Charms.”
                      </h3>

                      <div className="comments-list">
                        <div className="comment-item">
                          <div className="avatar">
                            <img src="/assets/img/team/10.jpg" alt="Author" />
                          </div>

                          <div className="content">
                            <div className="title">
                              <h5>
                                {"Bubhan Prova "}
                                <span className="reply">
                                  <a href="#">
                                    <i className="fas fa-reply" />
                                    {" Reply"}
                                  </a>
                                </span>
                              </h5>

                              <span>28 Feb, 2023</span>
                            </div>

                            <p>
                              {
                                " Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off. sportsmen zealously arranging to the main pint. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. "
                              }
                            </p>
                          </div>
                        </div>

                        <div className="comment-item reply">
                          <div className="avatar">
                            <img src="/assets/img/team/11.jpg" alt="Author" />
                          </div>

                          <div className="content">
                            <div className="title">
                              <h5>
                                {"Mickel Jones "}
                                <span className="reply">
                                  <a href="#">
                                    <i className="fas fa-reply" />
                                    {" Reply"}
                                  </a>
                                </span>
                              </h5>

                              <span>15 Mar, 2023</span>
                            </div>

                            <p>
                              {
                                " Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off. sportsmen zealously arranging to the main pint at the last. "
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="comments-form">
                      <div className="title">
                        <h3>Leave a comments</h3>
                      </div>

                      <form action="#" className="contact-comments">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                name="name"
                                className="form-control"
                                placeholder="Name *"
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                name="email"
                                className="form-control"
                                placeholder="Email *"
                                type="email"
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group comments">
                              <textarea
                                className="form-control"
                                placeholder="Comment"
                              />
                            </div>

                            <div className="form-group full-width submit">
                              <button
                                className="btn btn-theme effect"
                                type="submit"
                              >
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
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
