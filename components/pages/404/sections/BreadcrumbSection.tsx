export default function BreadcrumbSection() {
  return (
    <div
      className="breadcrumb-area bg-cover shadow dark text-center text-light"
      style={{
        backgroundImage: "url(/assets/img/shape/11.jpg)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h1>Error Page</h1>

            <ul className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fas fa-home" />
                  {" Home"}
                </a>
              </li>

              <li>404</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
