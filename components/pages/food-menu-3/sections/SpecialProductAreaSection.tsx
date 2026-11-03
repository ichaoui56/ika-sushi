const specialProducts = [
  {
    image: "/assets/img/shop/Shushi.png",
    price: "$16",
    name: "Signature Sushi Roll",
    ingredients: "Fresh salmon, avocado, seasoned rice",
  },
  {
    image: "/assets/img/shop/Salmon-Fry.png",
    price: "$18",
    name: "Salmon Sashimi",
    ingredients: "Sashimi-grade salmon, citrus, herbs",
  },
  {
    image: "/assets/img/shop/Prawns-Fry.png",
    price: "$15",
    name: "Tempura Prawns",
    ingredients: "Crisp prawns, sea salt, house dip",
  },
  {
    image: "/assets/img/shop/Crustaceans-such-as-lobsters.png",
    price: "$25",
    name: "Lobster Platter",
    ingredients: "Sweet lobster, chef-selected seafood",
  },
];

export default function SpecialProductAreaSection() {
  return (
    <section className="special-product-area default-padding bottom-less bg-gray text-center bg-cover">
      <div className="container">
        <div className="row">
          {specialProducts.map((product) => (
            <div className="col-xl-3 col-lg-6 col-md-6 mb-30" key={product.name}>
              <article className="special-menu-style-one">
                <div className="thumb">
                  <img src={product.image} alt={product.name} />
                  <h4>{product.price}</h4>
                </div>
                <div className="info">
                  <h4>{product.name}</h4>
                  <ul>
                    <li>{product.ingredients}</li>
                  </ul>
                  <p>Freshly prepared by our sushi and seafood chefs.</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
