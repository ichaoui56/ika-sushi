import Link from "next/link";

export default function BlogContentSection() {
  return (
    <div className="blog-area blog-grid default-padding">
      <div className="container">
        <div className="blog-item-box">
          <div className="row">
            <div className="col-md-6 mb-50">
              <div className="home-blog-style-one-item">
                <div className="thumb">
                  <img src="/assets/img/shop/Shushi.png" alt="Fresh sushi rolls" />

                  <ul className="blog-meta">
                    <li>
                      <a href="#">Sushi</a>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <div className="info">
                    <h3 className="post-title">
                      <Link href="/blog-single-with-sidebar">
                        How our chefs craft the perfect sushi roll
                      </Link>
                    </h3>

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

            <div className="col-md-6 mb-50">
              <div className="home-blog-style-one-item">
                <div className="thumb">
                  <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh salmon" />

                  <ul className="blog-meta">
                    <li>
                      <a href="#">Food</a>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <div className="info">
                    <h3 className="post-title">
                      <Link href="/blog-single-with-sidebar">
                        Choosing fresh salmon for sashimi and sushi
                      </Link>
                    </h3>

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

            <div className="col-md-6 mb-50">
              <div className="home-blog-style-one-item">
                <div className="thumb">
                  <img src="/assets/img/shop/Prawns-Fry.png" alt="Golden prawns" />

                  <ul className="blog-meta">
                    <li>
                      <a href="#">Seafood</a>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <div className="info">
                    <h3 className="post-title">
                      <Link href="/blog-single-with-sidebar">
                        The secrets behind perfectly crisp tempura prawns
                      </Link>
                    </h3>

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

            <div className="col-md-6 mb-50">
              <div className="home-blog-style-one-item">
                <div className="thumb">
                  <img src="/assets/img/shop/Crustaceans-such-as-lobsters.png" alt="Fresh lobster" />

                  <ul className="blog-meta">
                    <li>
                      <a href="#">Restaurant</a>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <div className="info">
                    <h3 className="post-title">
                      <Link href="/blog-single-with-sidebar">
                        Bndulgence diminution so discovered mr apartments
                        sentiments at the projection.
                      </Link>
                    </h3>

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
  );
}
