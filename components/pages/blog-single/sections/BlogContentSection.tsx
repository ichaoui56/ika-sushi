import Link from "next/link";

export default function BlogContentSection() {
  return (
    <div className="blog-area single full-blog full-blog default-padding">
      <div className="container">
        <div className="blog-items">
          <div className="row">
            <div className="blog-content wow fadeInUp col-lg-10 offset-lg-1 col-md-12">
              <div className="blog-style-two item">
                <div className="blog-item-box">
                  <div className="thumb">
                    <a href="#">
                      <img src="/assets/img/shop/Shushi.png" alt="Fresh sushi rolls" />
                    </a>
                  </div>

                  <div className="info">
                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-calendar-alt" />
                            {" March 16, 2023"}
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            <i className="fas fa-user-circle" />
                            {" Md Sohag"}
                          </a>
                        </li>
                      </ul>
                    </div>

                    <p>
                      {
                        "Great sushi starts with patience and carefully selected ingredients. We season warm rice with a balanced blend of rice vinegar, sugar, and salt, then let it cool before shaping each piece by hand. "
                      }
                    </p>

                    <p>
                      {
                        "For nigiri, the fish is sliced against the grain to preserve its delicate texture. For maki, crisp vegetables and fresh seafood are rolled tightly in seasoned rice and nori. "
                      }
                    </p>

                    <blockquote>
                      {
                        "The best sushi is simple: fresh fish, perfectly seasoned rice, and a careful hand."
                      }
                    </blockquote>

                    <p>
                      {
                        "We prepare each order just before serving, pairing sushi with pickled ginger and wasabi so the flavor of every ingredient comes through. "
                      }
                    </p>

                    <h3>What makes a memorable sushi plate?</h3>

                    <ul>
                      <li>Fresh, responsibly sourced seafood</li>

                      <li>
                        Carefully seasoned short-grain rice
                      </li>

                      <li>Precise knife work and thoughtful preparation</li>

                      <li>Balanced flavor, color, and texture</li>

                      <li>
                        Served fresh with traditional accompaniments
                      </li>
                    </ul>

                    <p>
                      {
                        "Whether you choose salmon nigiri, a signature maki roll, or delicate sashimi, our kitchen prepares every plate with care. Come by and enjoy a fresh taste of Japan and the sea. "
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="post-author">
                <div className="thumb">
                  <img src="/assets/img/team/13.jpg" alt="Thumb" />
                </div>

                <div className="info">
                  <h4>
                    <a href="#">Md Sohag</a>
                  </h4>

                  <p>
                    {
                      " Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur elit. Vesti at bulum nec at odio aea the dumm ipsumm ipsum that dolocons rsus mal suada and fadolorit to the consectetur elit. All the Lorem Ipsum generators on the Internet tend. Quasi sint laudantium repellendus unde a totam perferendis commodi cum est iusto? Minima, laborum. "
                    }
                  </p>
                </div>
              </div>

              <div className="post-tags share">
                <div className="tags">
                  <h4>{"Tags: "}</h4>

                  <a href="#">Algorithm</a>

                  <a href="$">Data science</a>
                </div>

                <div className="social">
                  <h4>Share:</h4>

                  <ul>
                    <li>
                      <a className="facebook" href="#" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>

                    <li>
                      <a className="twitter" href="#" target="_blank">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>

                    <li>
                      <a className="pinterest" href="#" target="_blank">
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </li>

                    <li>
                      <a className="linkedin" href="#" target="_blank">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="post-pagi-area">
                <div className="post-previous">
                  <Link href="/blog-single-with-sidebar">
                    <div className="icon">
                      <i className="fas fa-angle-double-left" />
                    </div>

                    <div className="nav-title">
                      {" Previus Post "}
                      <h5>Discovery incommode</h5>
                    </div>
                  </Link>
                </div>

                <div className="post-next">
                  <Link href="/blog-single-with-sidebar">
                    <div className="nav-title">
                      {"Next Post "}
                      <h5>Discovery incommode</h5>
                    </div>

                    <div className="icon">
                      <i className="fas fa-angle-double-right" />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="blog-comments">
                <div className="comments-area">
                  <div className="comments-title">
                    <h3>
                      3 Comments On “Providing Top Quality Cleaning Related
                      Services Charms.”
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
                              " Delivered ye sportsmen zealously arranging frankness estimable as. Nay any article enabled musical shyness yet sixteen yet blushes. Entire its the did figure wonder off. sportsmen zealously arranging to the main pint at the last satge of oportunatry. "
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
                            <textarea
                              className="form-control"
                              placeholder="Comment"
                            />
                          </div>

                          <div className="form-group full-width submit">
                            <button
                              className="btn btn-theme effect"
                              type="submit"
                            >
                              Post Comment
                            </button>
                          </div>
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
    </div>
  );
}
