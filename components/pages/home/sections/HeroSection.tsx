import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    id: "platter",
    eyebrow: "TOUT DROIT VENU DE LA MER",
    badgeLine: "CHAQUE JOUR",
    titleLineOne: "SUSHI FAÇONNÉ",
    titleLineTwo: "À LA MAIN",
    description: "Des gestes précis, des produits frais, une histoire de goût.",
    image: "/assets/img/ika-sushi-platter.jpg",
    imageAlt: "Assortiment de sushi frais présenté sur un plateau sombre",
    imagePosition: "center 57%",
  },
  {
    id: "rolls",
    eyebrow: "ROULÉ AVEC SOIN",
    badgeLine: "SERVI BIEN FRAIS",
    titleLineOne: "LA MER",
    titleLineTwo: "EN MAKI",
    description: "Des rouleaux généreux, préparés à la commande avec soin.",
    image: "/assets/img/ika-sushi-rolls.jpg",
    imageAlt: "Rouleaux de sushi au saumon sur une assiette sombre",
    imagePosition: "center 54%",
  },
  {
    id: "board",
    eyebrow: "SÉLECTION DU CHEF",
    badgeLine: "FRAÎCHEUR GARANTIE",
    titleLineOne: "UN GOÛT",
    titleLineTwo: "DU JAPON",
    description: "Une sélection de sushi et de fruits de mer à partager.",
    image: "/assets/img/ika-sushi-board.jpg",
    imageAlt: "Sushi au saumon servi avec sauce soja",
    imagePosition: "center 58%",
  },
];

export default function HeroSection() {
  return (
    <section className="ika-hero" aria-label="IKA Sushi">
      <div className="ika-hero-decoration" aria-hidden="true">
        <span className="ika-hero-branch ika-hero-branch-left" />
        <span className="ika-hero-branch ika-hero-branch-right" />
        <span className="ika-hero-petal ika-hero-petal-one" />
        <span className="ika-hero-petal ika-hero-petal-two" />
        <span className="ika-hero-petal ika-hero-petal-three" />
        <span className="ika-hero-petal ika-hero-petal-four" />
      </div>

      <div className="banner-fade ika-hero-carousel">
        <div className="swiper-wrapper">
          {heroSlides.map((slide, index) => (
            <div className={`swiper-slide ika-hero-slide ika-hero-slide-${slide.id}`} key={slide.id}>
              <div className="container ika-hero-layout">
                <div className="ika-hero-copy">
                  <div className="ika-hero-badge">
                    <img
                      src="/assets/img/shop/Shushi.png"
                      alt=""
                      width="36"
                      height="36"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>
                      <span>{slide.eyebrow}</span>
                      <strong>{slide.badgeLine}</strong>
                    </span>
                  </div>

                  <h1 className="ika-hero-title">
                    <span>{slide.titleLineOne}</span>
                    <span className="ika-hero-title-accent">{slide.titleLineTwo}</span>
                  </h1>

                  <p className="ika-hero-description">{slide.description}</p>

                  <Link className="ika-hero-cta" href="/shop">
                    <span>COMMANDER</span>
                    <span className="ika-hero-cta-arrow" aria-hidden="true">
                      <i className="fas fa-arrow-right" />
                    </span>
                  </Link>
                </div>

                <div className="ika-hero-visual">
                  <span className="ika-hero-plate-glow" aria-hidden="true" />
                  <div className="ika-hero-photo-frame">
                    <Image
                      className="ika-hero-photo"
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 767px) 48vw, (max-width: 1199px) 50vw, 55vw"
                      style={{ objectPosition: slide.imagePosition }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="swiper-pagination ika-hero-pagination" />
        <div className="swiper-nav-left ika-hero-controls">
          <button
            className="swiper-button-prev"
            type="button"
            aria-label="Previous hero slide"
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            className="swiper-button-next"
            type="button"
            aria-label="Next hero slide"
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}