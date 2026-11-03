export default function DiscountAreaSection() {
  return (
    <div
      className="discount-area default-padding bg-theme bg-cover text-light overflow-hidden"
      style={{
        backgroundImage: "url(/assets/img/shape/15.jpg)",
      }}
    >
      <div className="wavesshape">
        <img
          className="regular-img"
          src="/assets/img/shape/16.png"
          alt="Shape"
        />

        <img
          className="dark-img"
          src="/assets/img/shape/16-dark-secondary.png"
          alt="Shape"
        />
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="discount-content">
              <h4>Limited Offer</h4>

              <h2
                style={{
                  backgroundImage: "url(/assets/img/shape/27.png)",
                }}
              >
                Sushi &amp; Seafood Feast
              </h2>

              <p>
                {"A beautiful selection of fresh sushi and seafood, made for sharing."}
              </p>

              <div className="counter-class" data-date="2025-8-24 23:59:59">
                <div className="item-list">
                  <div className="counter-item">
                    <div className="item">
                      <h5>
                        <span className="counter-days" />
                        {" Days"}
                      </h5>
                    </div>
                  </div>

                  <div className="counter-item">
                    <div className="item">
                      <h5>
                        <span className="counter-hours" />
                        {" Hours"}
                      </h5>
                    </div>
                  </div>

                  <div className="counter-item">
                    <div className="item">
                      <h5>
                        <span className="counter-minutes" />
                        {" Minutes"}
                      </h5>
                    </div>
                  </div>

                  <div className="counter-item">
                    <div className="item">
                      <h5>
                        <span className="counter-seconds" />
                        {" Seconds"}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className="offer-item-thumb">
              <img
                src="/assets/img/shop/Crustaceans-such-as-lobsters.png"
                alt="Fresh lobster and seafood"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
