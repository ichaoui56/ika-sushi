import Link from "next/link";

export default function LoginAreaSection() {
  return (
    <div className="login-area">
      <div className="container">
        <div className="login-items">
          <div className="row">
            <div className="col-lg-6">
              <div className="login-thumb">
                <img src="/assets/img/shop/Shushi.png" alt="Fresh sushi platter" />

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
                <h2>Welcome back</h2>

                <p>{" Enter your email and password to continue "}</p>

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
                      <button type="submit">{" Login "}</button>
                    </div>
                  </div>
                </form>

                <div className="login-alternative">
                  <h4>Or Login With</h4>

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
                    {" Don't have any account? "}
                    <Link href="/register">Register Now</Link>
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
