export default function FeatureStyleTwoAreaSection() {
  return (
    <div
      className="feature-style-two-area default-padding bg-dark text-light"
      style={{
        backgroundImage: "url(/assets/img/shape/11.png)",
      }}
    >
      <div
        className="light-banner-active bg-dark"
        style={{
          backgroundImage: "url(/assets/img/shape/11-dark.png)",
        }}
      />

      <div className="shape">
        <img src="/assets/img/shape/10.png" alt="Image Not Found" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-5 feature-product-item">
            <a
              className="wow fadeInUp"
              href="#"
              style={{
                backgroundImage: "url(/assets/img/shape/7.jpg)",
              }}
            >
              <div className="info">
                <h2>Fresh Sushi Rolls</h2>

                <span className="btn circle btn-md btn-light animation">
                  Make an order
                </span>
              </div>

              <div className="thumb">
                <img
                  src="/assets/img/shop/Shushi.png"
                  alt="Fresh sushi rolls"
                />

                <div
                  className="offer"
                  style={{
                    backgroundImage: "url(/assets/img/shape/12.png)",
                  }}
                >
                  {"50% Off "}
                </div>
              </div>
            </a>
          </div>

          <div className="col-lg-7 feature-product-item">
            <a
              className="wow fadeInUp"
              data-wow-delay="200ms"
              href="#"
              style={{
                backgroundImage: "url(/assets/img/shape/9.jpg)",
              }}
            >
              <div className="info">
                <h2>Salmon Sashimi</h2>

                <span className="btn circle btn-md btn-theme animation">
                  Make an order
                </span>
              </div>

              <div className="thumb">
                <img
                  src="/assets/img/shop/Salmon-Fry.png"
                  alt="Fresh salmon"
                />

                <div
                  className="offer"
                  style={{
                    backgroundImage: "url(/assets/img/shape/12.png)",
                  }}
                >
                  Best Deal
                </div>
              </div>
            </a>

            <a
              className="wow fadeInUp"
              data-wow-delay="400ms"
              href="#"
              style={{
                backgroundImage: "url(/assets/img/shape/8.jpg)",
              }}
            >
              <div className="info">
                <h2>Golden Prawns</h2>

                <span className="btn circle btn-md btn-dark animation">
                  Make an order
                </span>
              </div>

              <div className="thumb">
                <img
                  src="/assets/img/shop/Prawns-Fry.png"
                  alt="Golden fried prawns"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
