import Link from "next/link";

export default function HeroSection() {
  return (
    <div
      className="banner-area banner-style-four navigation-circle overflow-hidden bg-theme text-light bg-cover"
      style={{
        backgroundImage: "url(/assets/img/shape/1.jpg)",
      }}
    >
      <div className="banner-fade">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="container">
              <div className="content">
                <div className="shape">
                  <img src="/assets/img/shape/23.png" alt="Image Not Found" />

                  <img src="/assets/img/shape/24.png" alt="Image Not Found" />
                </div>

                <div className="row align-center">
                  <div className="col-lg-6">
                    <h4>
                      {"Fresh from the sea "}
                      <strong>Daily</strong>
                    </h4>

                    <h2>Handcrafted Sushi</h2>

                    <p>
                      {"Discover expertly rolled sushi and fresh seafood, prepared to order with care."}
                    </p>

                    <div className="button mt-40">
                      <Link
                        className="btn btn-theme btn-md animation"
                        href="/shop"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="thumb">
                      <img
                        src="/assets/img/shop/Shushi.png"
                        alt="Fresh sushi assortment"
                      />

                      <img
                        src="/assets/img/shape/22.png"
                        alt="Image Not Found"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-slide">
            <div className="container">
              <div className="content">
                <div className="shape">
                  <img src="/assets/img/shape/23.png" alt="Image Not Found" />

                  <img src="/assets/img/shape/24.png" alt="Image Not Found" />
                </div>

                <div className="row align-center">
                  <div className="col-lg-6">
                    <h4>
                      {"A taste of the coast "}
                      <strong>Daily</strong>
                    </h4>

                    <h2>Seafood, Simply Fresh</h2>

                    <p>
                      {"From silky salmon sashimi to golden tempura prawns, enjoy the best of the ocean."}
                    </p>

                    <div className="button mt-40">
                      <Link
                        className="btn btn-theme btn-md animation"
                        href="/shop"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="thumb">
                      <img
                        src="/assets/img/shop/Prawns-Fry.png"
                        alt="Freshly prepared prawns"
                      />

                      <img
                        src="/assets/img/shape/22.png"
                        alt="Image Not Found"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper-nav-left">
          <div className="swiper-button-prev" />

          <div className="swiper-button-next" />
        </div>
      </div>
    </div>
  );
}
