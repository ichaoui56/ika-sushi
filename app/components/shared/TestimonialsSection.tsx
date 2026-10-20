export function TestimonialsSection() {
  return (
    <div
      className="testimonial-style-one-area default-padding bg-gray bg-cover text-center"
      style={{
        backgroundImage: "url(/assets/img/shape/4.jpg)",
      }}
    >
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
                          <h4>Best Chicken Fry</h4>
                        </div>

                        <p>
                          {
                            ' "Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness." '
                          }
                        </p>

                        <div className="tm-proivder-thumb">
                          <img
                            src="/assets/img/food/1.jpg"
                            alt="Image Not Found"
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
                          <h4>This pizza is so good</h4>
                        </div>

                        <p>
                          {
                            ' "Thanks to your web agency team for their professional work. The website they created for my business exceeded my expectations, and my clients have given positive feedback about its design and user-friendliness." '
                          }
                        </p>

                        <div className="tm-proivder-thumb">
                          <img
                            src="/assets/img/food/6.jpg"
                            alt="Image Not Found"
                          />

                          <img
                            src="/assets/img/team/11.jpg"
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
