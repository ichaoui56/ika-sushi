import type { Metadata } from "next";
import LegacyPage from "../components/legacy-page";
import { Footer } from "../components/shared/Footer";
import { Preloader } from "../components/shared/Preloader";
import { SiteHeader } from "../components/shared/SiteHeader";
import { ThemeToggle } from "../components/shared/ThemeToggle";
import { TopBar } from "../components/shared/TopBar";

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant HTML Template",
};

export default function Page() {
  return (
    <LegacyPage>
      <ThemeToggle />
      <Preloader />
      <TopBar />
      <SiteHeader />
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
      <div className="reservation-style-one-area default-padding">
        <div className="container">
          <div className="reservation-style-one-items bg-dark text-light wow fadeInUp">
            <div className="row">
              <div className="col-xl-6 col-lg-5 reservation-thumb">
                <img src="/assets/img/thumb/3.jpg" alt="Image Not Found" />

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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LegacyPage>
  );
}
