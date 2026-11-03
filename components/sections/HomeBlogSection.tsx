import Link from "next/link";

export function HomeBlogSection() {
  return (
    <div className="blog-area home-blog default-padding bottom-less">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">News &amp; Blog</h4>

              <h2 className="title split-text">Our Latest News &amp; Blog</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 col-md-6 mb-30">
            <div className="home-blog-style-one-item wow fadeInUp">
              <div className="thumb">
                <img src="/assets/img/shop/Shushi.png" alt="Fresh sushi rolls" />

                <ul className="blog-meta">
                  <li>
                    <a href="#">Sushi craft</a>
                  </li>
                </ul>
              </div>

              <div className="content">
                <div className="info">
                  <h4 className="post-title">
                    <Link href="/blog-single-with-sidebar">
                      How our chefs craft the perfect sushi roll
                    </Link>
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

          <div className="col-xl-4 col-md-6 mb-30">
            <div
              className="home-blog-style-one-item wow fadeInUp"
              data-wow-delay="200ms"
            >
              <div className="thumb">
                <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh salmon" />

                <ul className="blog-meta">
                  <li>
                    <a href="#">Fresh catch</a>
                  </li>
                </ul>
              </div>

              <div className="content">
                <div className="info">
                  <h4 className="post-title">
                    <Link href="/blog-single-with-sidebar">
                      Choosing the freshest seafood for every plate
                    </Link>
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

          <div className="col-xl-4 col-md-6 mb-30">
            <div
              className="home-blog-style-one-item wow fadeInUp"
              data-wow-delay="400ms"
            >
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
                  <h4 className="post-title">
                    <Link href="/blog-single-with-sidebar">
                      The art of pairing sushi with seasonal seafood
                    </Link>
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
        </div>
      </div>
    </div>
  );
}
