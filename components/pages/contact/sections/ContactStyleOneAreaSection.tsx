export default function ContactStyleOneAreaSection() {
  return (
    <div className="contact-style-one-area default-padding overflow-hidden">
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-12">
            <div className="contact-form-style-one">
              <div className="heading text-center">
                <h5 className="sub-title">Keep in touch</h5>

                <h2 className="heading">Send us a Massage</h2>
              </div>

              <form
                action="/assets/mail/contact.php"
                method="POST"
                className="contact-form contact-form"
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Name"
                        type="text"
                      />

                      <span className="alert-error" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email*"
                        type="email"
                      />

                      <span className="alert-error" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Phone"
                        type="text"
                      />

                      <span className="alert-error" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group comments">
                      <textarea
                        className="form-control"
                        id="comments"
                        name="comments"
                        placeholder="Your Message *"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <button type="submit" name="submit" id="submit">
                      <i className="fa fa-paper-plane" />
                      {" Get in Touch "}
                    </button>
                  </div>
                </div>

                <div className="col-lg-12 alert-notification">
                  <div id="message" className="alert-msg" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
