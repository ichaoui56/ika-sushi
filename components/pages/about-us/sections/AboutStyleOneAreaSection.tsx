export default function AboutStyleOneAreaSection() {
  return (
    <div className="about-style-one-area default-padding">
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-6">
            <div className="thumb-style-one">
              <img
                className="wow fadeInUp"
                src="/assets/img/shop/Crustaceans-such-as-lobsters.png"
                alt="Freshly prepared seafood"
              />

              <div
                className="contact-card-one wow fadeInLeft"
                data-wow-delay="200ms"
              >
                <a href="tel:+4733378901">
                  <div className="icon">
                    <i className="fa fa-phone" />
                  </div>

                  <div className="info">
                    <span>HOTLINE 24/7</span>

                    <h4>+473337890</h4>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-1">
            <div className="about-style-one-info">
              <h4 className="sub-heading">Our Story</h4>

              <h2 className="title split-text">
                A fresh taste of Japan and the sea
              </h2>

              <div className="content mt-50">
                <p className="split-text">
                  {"We bring together the art of Japanese sushi and the best of the ocean. Our chefs prepare every roll, sashimi plate, and seafood favorite fresh to order."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
