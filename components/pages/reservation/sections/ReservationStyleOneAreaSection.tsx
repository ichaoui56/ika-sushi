export default function ReservationStyleOneAreaSection() {
  return (
    <div className="reservation-style-one-area default-padding">
      <div className="container">
        <div className="reservation-style-one-items bg-dark text-light wow fadeInUp">
          <div className="row">
            <div className="col-xl-6 col-lg-5 reservation-thumb">
              <img src="/assets/img/shop/Salmon-Fry.png" alt="Freshly prepared salmon" />

              <div className="icon">
                <img src="/assets/img/icon/1.png" alt="Image Not Found" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-7 reservation-info">
              <h4 className="sub-heading">Reserve For</h4>

              <h2 className="title">Amazing Dining</h2>

              <form className="reservation-form" action="#">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>

                      <input
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="0632933941"
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
          </div>
        </div>
      </div>
    </div>
  );
}
