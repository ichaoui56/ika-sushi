export default function ReservationStyleTwoAreaSection() {
  return (
    <div className="reservation-style-two-area">
      <div className="reservation-banner">
        <img src="/assets/img/shop/Salmon-Fry.png" alt="Fresh seafood selection" />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-6">
            <div className="reservation-tabs">
              <ul
                className="nav nav-tabs wow fadeInDown"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="tab_1"
                    data-bs-toggle="tab"
                    data-bs-target="#tabs_1"
                    type="button"
                    role="tab"
                    aria-controls="tabs_1"
                    aria-selected="true"
                  >
                    <img src="/assets/img/icon/3.png" alt="Image Not Found" />
                    {" Buffet "}
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tab_2"
                    data-bs-toggle="tab"
                    data-bs-target="#tabs_2"
                    type="button"
                    role="tab"
                    aria-controls="tabs_2"
                    aria-selected="false"
                  >
                    <img src="/assets/img/icon/4.png" alt="Image Not Found" />
                    {" Party "}
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tab_3"
                    data-bs-toggle="tab"
                    data-bs-target="#tabs_3"
                    type="button"
                    role="tab"
                    aria-controls="tabs_3"
                    aria-selected="false"
                  >
                    <img src="/assets/img/icon/5.png" alt="Image Not Found" />
                    {" Event "}
                  </button>
                </li>
              </ul>

              <div className="tab-content wow fadeInUp" id="myTabContent">
                <h4 className="sub-heading">Reservation</h4>

                <h2 className="title">Book A Table</h2>

                <div
                  className="tab-pane fade show active"
                  id="tabs_1"
                  role="tabpanel"
                  aria-labelledby="tab_1"
                >
                  <form className="reservation-form" action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>

                          <input
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="+4733378901"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="subject">Person</label>

                          <select id="subject">
                            <option value="1">1 Person</option>

                            <option value="2">2 Person</option>

                            <option value="4">3 Person</option>

                            <option value="5">4 Person</option>

                            <option value="6">5 Person</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input-group date date-picker-one">
                          <label htmlFor="date">Date</label>

                          <input
                            type="text"
                            className="form-control"
                            id="date"
                            placeholder="Date"
                          />

                          <span className="input-group-addon">
                            <i className="fas fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="time">Time</label>

                          <select id="time">
                            <option value="1">10:00 AM</option>

                            <option value="1">11:00 AM</option>

                            <option value="1">12:00 AM</option>

                            <option value="1">1:00 AM</option>

                            <option value="1">2:00 AM</option>

                            <option value="1">3:00 AM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button type="submit" name="submit" id="submit">
                          {" Book A Table "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="tab-pane fade"
                  id="tabs_2"
                  role="tabpanel"
                  aria-labelledby="tab_2"
                >
                  <form className="reservation-form" action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="phone2">Phone</label>

                          <input
                            className="form-control"
                            id="phone2"
                            name="phone2"
                            placeholder="+4733378901"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="subject2">Person</label>

                          <select id="subject2">
                            <option value="1">1 Person</option>

                            <option value="2">2 Person</option>

                            <option value="4">3 Person</option>

                            <option value="5">4 Person</option>

                            <option value="6">5 Person</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input-group date date-picker-one">
                          <label htmlFor="date2">Date</label>

                          <input
                            type="text"
                            className="form-control"
                            id="date2"
                            placeholder="Date"
                          />

                          <span className="input-group-addon">
                            <i className="fas fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="time2">Time</label>

                          <select id="time2">
                            <option value="1">10:00 AM</option>

                            <option value="1">11:00 AM</option>

                            <option value="1">12:00 AM</option>

                            <option value="1">1:00 AM</option>

                            <option value="1">2:00 AM</option>

                            <option value="1">3:00 AM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button type="submit" name="submit2" id="submit2">
                          {" Book A Table "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="tab-pane fade"
                  id="tabs_3"
                  role="tabpanel"
                  aria-labelledby="tab_3"
                >
                  <form className="reservation-form" action="#">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="phone3">Phone</label>

                          <input
                            className="form-control"
                            id="phone3"
                            name="phone3"
                            placeholder="+4733378901"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="subject3">Person</label>

                          <select id="subject3">
                            <option value="1">1 Person</option>

                            <option value="2">2 Person</option>

                            <option value="4">3 Person</option>

                            <option value="5">4 Person</option>

                            <option value="6">5 Person</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input-group date date-picker-one">
                          <label htmlFor="date3">Date</label>

                          <input
                            type="text"
                            className="form-control"
                            id="date3"
                            placeholder="Date"
                          />

                          <span className="input-group-addon">
                            <i className="fas fa-calendar-alt" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label htmlFor="time3">Time</label>

                          <select id="time3">
                            <option value="1">10:00 AM</option>

                            <option value="1">11:00 AM</option>

                            <option value="1">12:00 AM</option>

                            <option value="1">1:00 AM</option>

                            <option value="1">2:00 AM</option>

                            <option value="1">3:00 AM</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <button type="submit" name="submit3" id="submit3">
                          {" Book A Table "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
