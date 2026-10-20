import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { SiteHeader } from "../components/shared/SiteHeader";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { TopBar } from "../components/shared/TopBar";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <TopBar />
      <SiteHeader />
      <div
        className="breadcrumb-area bg-cover text-center text-light"
        style={{
          backgroundImage: "url(/assets/img/shape/11.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h1>Contact Us</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">
                    <i className="fas fa-home" />
                    {" Home"}
                  </a>
                </li>

                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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

                          <a href="">+4733378901</a>
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
      <Footer />
    </LegacyPage>
  );
}
