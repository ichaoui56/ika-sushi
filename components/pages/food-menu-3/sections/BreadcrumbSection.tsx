export default function BreadcrumbSection() {
  return (
    <div
      className="breadcrumb-area bg-cover text-center text-light"
      style={{
        backgroundImage: "url(/assets/img/shape/11.jpg)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <h1>Sushi &amp; Seafood Menu</h1>

            <ul className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fas fa-home" />
                  {" Home"}
                </a>
              </li>

              <li>Menu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
