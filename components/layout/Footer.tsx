import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-dark footer-style-one text-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 footer-item mt-50">
            <div className="f-item about">
              <img src="/white-logo.png" alt="IKA SUSHI" />

              <p>
                {
                  " Discover culinary delights recipes and inspiration in our food haven. "
                }
              </p>

              <ul className="opening-list">
                <li>
                  {" Mon - Fri "}
                  <span className="text-end">8:00 AM - 6:00 PM</span>
                </li>

                <li>
                  {" Saturday "}
                  <span className="text-end">9:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 mt-50 footer-item pl-50 pl-md-15 pl-xs-15">
            <div className="f-item link">
              <h4 className="widget-title">Explore</h4>

              <ul>
                <li>
                  <Link href="/about-us">Compnay Profile</Link>
                </li>

                <li>
                  <Link href="/about-us">About</Link>
                </li>

                <li>
                  <Link href="/contact">Help Center</Link>
                </li>

                <li>
                  <Link href="/contact">Career</Link>
                </li>

                <li>
                  <Link href="/about-us">Features</Link>
                </li>

                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 footer-item  mt-50">
            <div className="f-item contact">
              <h4 className="widget-title">Contact Info</h4>

              <ul className="contact-widget">
                <li>
                  <div className="icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>

                  <div className="content">
                    {" 175 10h Street, Office 375 Berlin, De 21562 "}
                  </div>
                </li>

                <li>
                  <div className="icon">
                    <i className="fas fa-phone" />
                  </div>

                  <div className="content">
                    <a href="tel:+212632933941">0632933941</a>
                  </div>
                </li>

                <li>
                  <div className="icon">
                    <i className="fas fa-envelope" />
                  </div>

                  <div className="content">
                    <a href="mailto:name@email.com">food@restan.com</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 footer-item mt-50">
            <div className="f-item newsletter">
              <h4 className="widget-title">Newsletter</h4>

              <p>
                {
                  " Join our subscribers list to get the latest news and special offers. "
                }
              </p>

              <form action="#">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control"
                  name="email"
                />

                <button type="submit">
                  {" Subscribe "}
                  <i className="fas fa-long-arrow-right" />
                </button>
              </form>

              <div className="footer-socila-items mt-30">
                <h4>{"Social Meida: "}</h4>

                <ul className="footer-social">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row align-center">
            <div className="col-lg-6">
              <p>{" © Copyright 2025 Foodu. All Rights Reserved "}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
