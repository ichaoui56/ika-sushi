export function SiteHeader() {
  return (
    <header>
      <nav className="navbar mobile-sidenav navbar-sticky navbar-default validnavs dark">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
            >
              <i className="fa fa-bars" />
            </button>

            <a className="navbar-brand" href="/">
              <img src="/assets/img/logo.png" className="logo" alt="Logo" />
            </a>
          </div>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <img src="/assets/img/logo.png" alt="Logo" />

            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navbar-menu"
            >
              <i className="fa fa-times" />
            </button>

            <ul
              className="nav navbar-nav navbar-right"
              data-in="fadeInDown"
              data-out="fadeOutUp"
            >
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle active"
                  data-toggle="dropdown"
                >
                  Home
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a href="/">Home Version One</a>
                  </li>

                  <li>
                    <a href="/index-2">Home Version Two</a>
                  </li>

                  <li>
                    <a href="/index-3">Home Version Three</a>
                  </li>

                  <li>
                    <a href="/index-4">Home Version Four</a>
                  </li>

                  <li>
                    <a href="/index-5">Home Version Five</a>
                  </li>

                  <li>
                    <a href="/index-6">Home Version Six</a>
                  </li>

                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle dark"
                      data-toggle="dropdown"
                    >
                      Dark Version
                    </a>

                    <ul className="dropdown-menu">
                      <li>
                        <a href="/index-dark">Home Version One</a>
                      </li>

                      <li>
                        <a href="/index-dark-2">Home Version Two</a>
                      </li>

                      <li>
                        <a href="/index-dark-3">Home Version Three</a>
                      </li>

                      <li>
                        <a href="/index-dark-4">Home Version Four</a>
                      </li>

                      <li>
                        <a href="/index-dark-5">Home Version Five</a>
                      </li>

                      <li>
                        <a href="/index-dark-6">Home Version Six</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Pages
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a href="/about-us">About Us</a>
                  </li>

                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Our Chef
                    </a>

                    <ul className="dropdown-menu">
                      <li>
                        <a href="/chef">Chef Style One</a>
                      </li>

                      <li>
                        <a href="/chef-details">Chef Details</a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href="/reservation">Reservation</a>
                  </li>

                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>

                  <li>
                    <a href="/404">Error Page</a>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Menu
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a href="/food-menu">Menu Style One</a>
                  </li>

                  <li>
                    <a href="/food-menu-2">Menu Style Two</a>
                  </li>

                  <li>
                    <a href="/food-menu-3">Menu Style Three</a>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Blog
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a href="/blog-standard">Blog Standard</a>
                  </li>

                  <li>
                    <a href="/blog-with-sidebar">Blog With Sidebar</a>
                  </li>

                  <li>
                    <a href="/blog-2-colum">Blog Grid Two Colum</a>
                  </li>

                  <li>
                    <a href="/blog-3-colum">Blog Grid Three Colum</a>
                  </li>

                  <li>
                    <a href="/blog-single">Blog Single</a>
                  </li>

                  <li>
                    <a href="/blog-single-with-sidebar">
                      Blog Single With Sidebar
                    </a>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  Shop
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <a href="/shop">Shop</a>
                  </li>

                  <li>
                    <a href="/shop-single">Shop Single</a>
                  </li>

                  <li>
                    <a href="/shop-single-thumb-only">Shop Single Two</a>
                  </li>

                  <li>
                    <a href="/cart">Cart</a>
                  </li>

                  <li>
                    <a href="/checkout">Checkout</a>
                  </li>

                  <li>
                    <a href="/login">Login</a>
                  </li>

                  <li>
                    <a href="/register">Register</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="attr-right">
            <div className="attr-nav">
              <ul>
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="far fa-shopping-cart" />

                    <span className="badge">3</span>
                  </a>

                  <ul className="dropdown-menu cart-list">
                    <li>
                      <div className="thumb">
                        <a href="#" className="photo">
                          <img src="/assets/img/shop/1.png" alt="Thumb" />
                        </a>

                        <a href="#" className="remove-product">
                          <i className="fas fa-times" />
                        </a>
                      </div>

                      <div className="info">
                        <h6>
                          <a href="#">{"Delica omtantur "}</a>
                        </h6>

                        <p>
                          {"2x - "}
                          <span className="price">$99.99</span>
                        </p>
                      </div>
                    </li>

                    <li>
                      <div className="thumb">
                        <a href="#" className="photo">
                          <img src="/assets/img/shop/2.png" alt="Thumb" />
                        </a>

                        <a href="#" className="remove-product">
                          <i className="fas fa-times" />
                        </a>
                      </div>

                      <div className="info">
                        <h6>
                          <a href="#">Omnes ocurreret</a>
                        </h6>

                        <p>
                          {"1x - "}
                          <span className="price">$33.33</span>
                        </p>
                      </div>
                    </li>

                    <li className="total">
                      <span className="pull-right">
                        <strong>Total</strong>: $0.00
                      </span>

                      <a href="#" className="btn btn-default btn-cart">
                        Cart
                      </a>

                      <a href="#" className="btn btn-default btn-cart">
                        Checkout
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="button">
                  <a href="/contact">Reservation</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="overlay-screen" />
      </nav>
    </header>
  );
}
