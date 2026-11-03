import Link from "next/link";

export default function BlogContentSection() {
  return (
    <div className="blog-area full-blog default-padding">
      <div className="container">
        <div className="blog-items">
          <div className="row">
            <div className="blog-content col-xl-8 col-lg-7 col-md-12 pr-35 pr-md-15 pl-md-15 pr-xs-15 pl-xs-15">
              <div className="blog-item-box">
                <div className="item">
                  <div className="thumb">
                    <Link href="/blog-single-with-sidebar">
                      <img src="/assets/img/shop/Shushi.png" alt="Fresh sushi rolls" />
                    </Link>
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
                      <Link href="/blog-single-with-sidebar">
                        How our chefs craft the perfect sushi roll
                      </Link>
                    </h2>

                    <p>
                      {
                        "Every roll begins with carefully seasoned rice and the freshest seafood. Our chefs balance texture, flavor, and color in every hand-crafted piece."
                      }
                    </p>

                    <Link
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                <div className="item">
                  <div className="thumb">
                    <Link href="/blog-single-with-sidebar">
                      <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh salmon" />
                    </Link>
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
                      <Link href="/blog-single-with-sidebar">
                        Choosing the freshest salmon for sashimi
                      </Link>
                    </h2>

                    <p>
                      {
                        "Quality begins at the source. We select salmon for its clean flavor and silky texture, then serve it simply to let the fish shine."
                      }
                    </p>

                    <Link
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                <div className="item">
                  <div className="thumb">
                    <Link href="/blog-single-with-sidebar">
                      <img src="/assets/img/shop/Prawns-Fry.png" alt="Freshly prepared prawns" />
                    </Link>
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
                      <Link href="/blog-single-with-sidebar">
                        The secret to crisp, golden tempura prawns
                      </Link>
                    </h2>

                    <p>
                      {
                        "A light batter and a quick fry keep each prawn delicate inside with a delicate crunch outside. We finish with sea salt and a house-made dipping sauce."
                      }
                    </p>

                    <Link
                      className="btn mt-10 btn-md circle btn-theme animation"
                      href="/blog-single-with-sidebar"
                    >
                      Learn More
                    </Link>
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
                        <Link href="/blog-single-with-sidebar">
                          <img src="/assets/img/shop/Shushi.png" alt="Sushi platter" />
                        </Link>
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
                        <Link href="/blog-single-with-sidebar">
                          <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh salmon" />
                        </Link>
                      </div>

                      <div className="info">
                        <div className="meta-title">
                          <span className="post-date">05 Jul, 2023</span>
                        </div>

                        <Link href="/blog-single-with-sidebar">
                          {"Future Plan & Strategy for Consutruction "}
                        </Link>
                      </div>
                    </li>

                    <li>
                      <div className="thumb">
                        <Link href="/blog-single-with-sidebar">
                          <img src="/assets/img/shop/Prawns-Fry.png" alt="Fresh prawns" />
                        </Link>
                      </div>

                      <div className="info">
                        <div className="meta-title">
                          <span className="post-date">29 Aug, 2020</span>
                        </div>

                        <Link href="/blog-single-with-sidebar">
                          Melancholy particular devonshire alteration
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="sidebar-item category">
                  <h4 className="title">category list</h4>

                  <div className="sidebar-info">
                    <ul>
                      <li>
                        <Link href="/blog-with-sidebar">
                          {"Business "}
                          <span>69</span>
                        </Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">
                          {"national "}
                          <span>25</span>
                        </Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">
                          {"sports "}
                          <span>18</span>
                        </Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">
                          {"megazine "}
                          <span>37</span>
                        </Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">
                          {"health "}
                          <span>12</span>
                        </Link>
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
                          <img src="/assets/img/shop/Shushi.png" alt="Sushi platter" />
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh salmon" />
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <img src="/assets/img/shop/Prawns-Fry.png" alt="Fresh prawns" />
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <img src="/assets/img/shop/Crustaceans-such-as-lobsters.png" alt="Fresh lobster" />
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <img src="/assets/img/shop/Pangasius-or-Basa.png" alt="Fresh white fish" />
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <img src="/assets/img/shop/Shushi.png" alt="Sushi rolls" />
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
                        <Link href="/blog-with-sidebar">Aug 2020</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">Sept 2020</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">Nov 2020</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">Dec 2020</Link>
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
                        <Link href="/blog-with-sidebar">Fashion</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">Education</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">nation</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">study</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">health</Link>
                      </li>

                      <li>
                        <Link href="/blog-with-sidebar">travel</Link>
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
  );
}
