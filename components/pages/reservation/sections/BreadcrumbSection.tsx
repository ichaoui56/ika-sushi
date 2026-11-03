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
            <h1>Online Reservation</h1>

            <ul className="breadcrumb">
              <li>
                <a href="#">
                  <i className="fas fa-home" />
                  {" Home"}
                </a>
              </li>

              <li>Reservation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
