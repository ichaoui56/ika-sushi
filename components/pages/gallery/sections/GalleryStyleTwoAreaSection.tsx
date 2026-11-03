const galleryItems = [
  {
    image: "/assets/img/shop/Shushi.png",
    category: "Handcrafted",
    name: "Sushi Selection",
  },
  {
    image: "/assets/img/shop/Salmon-Fry.png",
    category: "Fresh Catch",
    name: "Salmon Special",
  },
  {
    image: "/assets/img/shop/Prawns-Fry.png",
    category: "From the Sea",
    name: "Golden Prawns",
  },
  {
    image: "/assets/img/shop/Crustaceans-such-as-lobsters.png",
    category: "Chef's Choice",
    name: "Lobster Feast",
  },
  {
    image: "/assets/img/shop/Pangasius-or-Basa.png",
    category: "Fresh Catch",
    name: "White Fish",
  },
];

export default function GalleryStyleTwoAreaSection() {
  return (
    <section className="gallery-style-two-area default-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading text-center">
              <h4 className="sub-title">From our kitchen</h4>
              <h2 className="title split-text">Sushi &amp; Seafood Gallery</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="gallery-content-items">
            <div id="gallery-masonary" className="gallery-items gallery-style-two colums-3">
              {galleryItems.map((item) => (
                <div className="gallery-item" key={item.name}>
                  <div className="gallery-style-one">
                    <div className="item">
                      <a href={item.image} className="popup-gallery">
                        <img src={item.image} alt={item.name} />
                        <div className="overlay">
                          <span>{item.category}</span>
                          <h4>{item.name}</h4>
                        </div>
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
