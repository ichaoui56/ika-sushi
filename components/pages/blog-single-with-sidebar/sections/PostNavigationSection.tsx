export default function PostNavigationSection() {
  return (
    <div className="post-pagi-area">
      <div className="post-previous">
        <a href="#">
          <div className="icon">
            <i className="fas fa-angle-double-left" />
          </div>

          <div className="nav-title">
            {" Previus Post "}
            <h5>Discovery incommode</h5>
          </div>
        </a>
      </div>

      <div className="post-next">
        <a href="#">
          <div className="nav-title">
            {"Next Post "}
            <h5>Discovery incommode</h5>
          </div>

          <div className="icon">
            <i className="fas fa-angle-double-right" />
          </div>
        </a>
      </div>
    </div>
  );
}
