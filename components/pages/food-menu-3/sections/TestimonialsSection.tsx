export default function TestimonialsSection() {
  return (
    <div className="testimonial-style-one-area default-padding text-center bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="testimonial-style-one-carousel swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-style-one">
                    <div className="item">
                      <div className="content">
                        <div className="tm-review">
                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />
                        </div>

                        <div className="provider">
                          <h4>Beautifully Fresh Sushi</h4>
                        </div>

                        <p>
                          {
                            ' "The sushi was incredibly fresh, beautifully prepared, and full of flavor. Every bite tasted like a little piece of Japan." '
                          }
                        </p>

                        <div className="tm-proivder-thumb">
                          <img
                            src="/assets/img/shop/Shushi.png"
                            alt="Fresh sushi"
                          />

                          <img
                            src="/assets/img/team/10.jpg"
                            alt="Image Not Found"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-style-one">
                    <div className="item">
                      <div className="content">
                        <div className="tm-review">
                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />

                          <i className="fas fa-star" />
                        </div>

                        <div className="provider">
                          <h4>Our New Favorite Seafood Spot</h4>
                        </div>

                        <p>
                          {
                            ' "The salmon and prawns were so fresh, and the team made us feel welcome. We will definitely be back for another seafood feast." '
                          }
                        </p>

                        <div className="tm-proivder-thumb">
                          <img
                            src="/assets/img/shop/Prawns-Fry.png"
                            alt="Freshly cooked prawns"
                          />

                          <img
                            src="/assets/img/team/5.jpg"
                            alt="Image Not Found"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-pagination">
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
