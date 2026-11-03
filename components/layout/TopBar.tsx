export function TopBar() {
  return (
    <div className="top-bar-area top-bar-style-one bg-theme text-light">
      <div className="container">
        <div className="row align-center">
          <div className="col-lg-7">
            <ul className="item-flex">
              <li>
                <a href="tel:+4733378901">
                  <img src="/assets/img/icon/10.png" alt="Icon" />
                  {" Phone: +4733378901 "}
                </a>
              </li>

              <li>
                <a href="mailto:name@email.com">
                  <img src="/assets/img/icon/11.png" alt="Icon" />
                  {" Email: food@restan.com "}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-5 text-end">
            <div className="item-flex">
              <div className="social">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <i className="fab fa-youtube" />
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
      </div>
    </div>
  );
}
