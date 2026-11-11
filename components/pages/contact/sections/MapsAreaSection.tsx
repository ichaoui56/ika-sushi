export default function MapsAreaSection() {
  return (
    <div className="maps-area overflow-hidden">
      <div className="google-maps">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48388.929990966964!2d-74.00332!3d40.711233!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1653598669477!5m2!1sen!2sus" />
      </div>

      <div className="contact-style-one-items">
        <div className="container">
          <div className="contact-style-one-box">
            <div className="row">
              <div className="col-lg-6">
                <div className="contact-style-one-info">
                  <h2>Find Food Lounge</h2>

                  <p>
                    {
                      " Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. "
                    }
                  </p>

                  <ul>
                    <li className="wow fadeInUp">
                      <div className="icon">
                        <i className="fas fa-phone-alt" />
                      </div>

                      <div className="content">
                        <h5 className="title">Hotline</h5>

                        <a href="tel:+212521472481">05 21 47 24 81</a>
                      </div>
                    </li>

                    <li className="wow fadeInUp" data-wow-delay="100ms">
                      <div className="icon">
                        <i className="fas fa-map-marker-alt" />
                      </div>

                      <div className="info">
                        <h5 className="title">Our Location</h5>

                        <p>
                          {" 55 Main Street, The Grand Avenue 2nd Block, "}
                          <br />
                          {" New York City "}
                        </p>
                      </div>
                    </li>

                    <li className="wow fadeInUp" data-wow-delay="200ms">
                      <div className="icon">
                        <i className="fas fa-envelope-open-text" />
                      </div>

                      <div className="info">
                        <h5 className="title">Official Email</h5>

                        <a href="mailto:info@agrul.com.com">info@gixus.com</a>
                      </div>
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
