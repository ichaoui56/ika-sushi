export default function CommentsSection() {
  return (
    <div className="blog-comments">
      <div className="comments-area">
        <div className="comments-title">
          <h3>
            3 Comments On “Providing Top Quality Cleaning Related Services
            Charms.”
          </h3>

          <div className="comments-list">
            <div className="comment-item">
              <div className="avatar">
                <img src="/assets/img/team/10.jpg" alt="Author" />
              </div>

              <div className="content">
                <div className="title">
                  <h5>
                    {"Bubhan Prova "}
                    <span className="reply">
                      <a href="#">
                        <i className="fas fa-reply" />
                        {" Reply"}
                      </a>
                    </span>
                  </h5>

                  <span>28 Feb, 2023</span>
                </div>

                <p>
                  {
                    " Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off. sportsmen zealously arranging to the main pint. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. "
                  }
                </p>
              </div>
            </div>

            <div className="comment-item reply">
              <div className="avatar">
                <img src="/assets/img/team/11.jpg" alt="Author" />
              </div>

              <div className="content">
                <div className="title">
                  <h5>
                    {"Mickel Jones "}
                    <span className="reply">
                      <a href="#">
                        <i className="fas fa-reply" />
                        {" Reply"}
                      </a>
                    </span>
                  </h5>

                  <span>15 Mar, 2023</span>
                </div>

                <p>
                  {
                    " Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off. sportsmen zealously arranging to the main pint at the last. "
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="comments-form">
          <div className="title">
            <h3>Leave a comments</h3>
          </div>

          <form action="#" className="contact-comments">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    name="name"
                    className="form-control"
                    placeholder="Name *"
                    type="text"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    name="email"
                    className="form-control"
                    placeholder="Email *"
                    type="email"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group comments">
                  <textarea className="form-control" placeholder="Comment" />
                </div>

                <div className="form-group full-width submit">
                  <button className="btn btn-theme effect" type="submit">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
