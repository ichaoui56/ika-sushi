import Link from "next/link";

export default function BlogContentSection() {
  return (
    <div className="blog-area full-blog blog-standard default-padding">
      <div className="container">
        <div className="row">
          <div className="blog-content col-xl-10 offset-xl-1 col-md-12">
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
  );
}
