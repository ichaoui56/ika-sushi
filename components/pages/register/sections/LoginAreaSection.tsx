import Link from "next/link";

export default function LoginAreaSection() {
  return (
    <div className="login-area">
      <div className="container">
        <div className="login-items">
          <div className="row">
            <div className="col-lg-6">
              <div className="login-thumb">
                <img src="/assets/img/shop/Crustaceans-such-as-lobsters.png" alt="Fresh seafood platter" />

                <div className="logo">
                  <Link href="/">
                    <img
                      src="/assets/img/logo-light-2.png"
                      alt="Image Not Found"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="login-forms">
                <h2>Create an account</h2>

                <p>{" Enter your details ato create a new account "}</p>

                <form action="#">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Email*"
                          type="email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password*"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Password*"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <button type="submit">{" Register "}</button>
                    </div>
                  </div>
                </form>

                <div className="login-alternative">
                  <h4>Or Register With</h4>

                  <ul>
                    <li>
                      <a href="#">
                        <i className="fab fa-google" />
                        {" Google"}
                      </a>
                    </li>

                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                        {" Facebook"}
                      </a>
                    </li>
                  </ul>

                  <p>
                    {" Already have an account? "}
                    <Link href="/login">Login Now</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
