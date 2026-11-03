import Link from "next/link";

export default function BlogSidebarSection() {
  return (
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
                  How our chefs craft the perfect sushi roll
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
                  Choosing the freshest salmon for sashimi
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
                  The secret to crisp tempura prawns
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
                  {"Sushi "}
                  <span>69</span>
                </Link>
              </li>

              <li>
                <Link href="/blog-with-sidebar">
                  {"Seafood "}
                  <span>25</span>
                </Link>
              </li>

              <li>
                <Link href="/blog-with-sidebar">
                  {"Sashimi "}
                  <span>18</span>
                </Link>
              </li>

              <li>
                <Link href="/blog-with-sidebar">
                  {"Recipes "}
                  <span>37</span>
                </Link>
              </li>

              <li>
                <Link href="/blog-with-sidebar">
                  {"Fresh Catch "}
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
  );
}
