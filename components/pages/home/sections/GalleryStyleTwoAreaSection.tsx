const galleryItems = [
  { image: "/assets/img/shop/Shushi.png", name: "Fresh sushi rolls" },
  { image: "/assets/img/shop/Salmon-Fry.png", name: "Salmon, prepared fresh" },
  { image: "/assets/img/shop/Prawns-Fry.png", name: "Golden prawns" },
  {
    image: "/assets/img/shop/Crustaceans-such-as-lobsters.png",
    name: "Lobster and crab",
  },
  { image: "/assets/img/shop/Pangasius-or-Basa.png", name: "Fresh white fish" },
];

export default function GalleryStyleTwoAreaSection() {
  return (
    <section className="gallery-style-two-area default-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">Made fresh for you</h4>
              <h2 className="title split-text">A Taste of the Ocean</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="gallery-content-items">
            <div id="portfolio-grid" className="gallery-items colums-3">
              {galleryItems.map((item) => (
                <div className="pf-item wow fadeInUp" key={item.name}>
                  <div className="gallery-style-one">
                    <div className="item">
                      <a href={item.image} className="popup-gallery">
                        <img src={item.image} alt={item.name} />
                        <i className="fas fa-eye" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
