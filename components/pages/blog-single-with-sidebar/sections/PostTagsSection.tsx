export default function PostTagsSection() {
  return (
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
  );
}
