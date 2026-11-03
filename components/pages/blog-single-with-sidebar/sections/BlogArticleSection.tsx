export default function BlogArticleSection() {
  return (
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

            <li>Carefully seasoned short-grain rice</li>

            <li>Precise knife work and thoughtful preparation</li>

            <li>Balanced flavor, color, and texture</li>

            <li>Served fresh with traditional accompaniments</li>
          </ul>

          <p>
            {
              "Whether you choose salmon nigiri, a signature maki roll, or delicate sashimi, our kitchen prepares every plate with care. Come by and enjoy a fresh taste of Japan and the sea. "
            }
          </p>
        </div>
      </div>
    </div>
  );
}
