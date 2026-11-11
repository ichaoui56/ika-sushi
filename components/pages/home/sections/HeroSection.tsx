"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";

const heroSlides = [
  {
    id: "platter",
    eyebrow: "TOUT DROIT VENU DE LA MER",
    badgeLine: "CHAQUE JOUR",
    titleLineOne: "SUSHI FAÇONNÉ",
    titleLineTwo: "À LA MAIN",
    description: "Des gestes précis, des produits frais, une histoire de goût.",
    image: "/assets/img/food/sushi1.PNG",
    imageAlt: "Assortiment de sushi frais détouré sur fond transparent",
    imagePosition: "center",
  },
  {
    id: "rolls",
    eyebrow: "ROULÉ AVEC SOIN",
    badgeLine: "SERVI BIEN FRAIS",
    titleLineOne: "LA MER",
    titleLineTwo: "EN MAKI",
    description: "Des rouleaux généreux, préparés à la commande avec soin.",
    image: "/assets/img/food/sushi-platter.png",
    imageAlt: "Saumon grillé accompagné de légumes sur fond transparent",
    imagePosition: "center",
  },
  {
    id: "board",
    eyebrow: "SÉLECTION DU CHEF",
    badgeLine: "FRAÎCHEUR GARANTIE",
    titleLineOne: "UN GOÛT",
    titleLineTwo: "DU JAPON",
    description: "Une sélection de sushi et de fruits de mer à partager.",
    image: "/assets/img/food/sushi-boat.PNG",
    imageAlt: "Plat de crevettes préparé avec des légumes sur fond transparent",
    imagePosition: "center",
  },
];

export default function HeroSection() {
  const { locale } = useLocale();

  return (
    <section className="ika-hero" aria-label={translate("IKA Sushi", locale)}>
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
                    <span>
                      <span>{translate(slide.eyebrow, locale)}</span>
                      <strong>{translate(slide.badgeLine, locale)}</strong>
                    </span>
                  </div>

                  <h1 className="ika-hero-title">
                    <span>{translate(slide.titleLineOne, locale)}</span>
                    <span className="ika-hero-title-accent">{translate(slide.titleLineTwo, locale)}</span>
                  </h1>

                  <p className="ika-hero-description">{translate(slide.description, locale)}</p>

                  <Link className="ika-hero-cta" href="/shop">
                    <span>{translate("COMMANDER", locale)}</span>
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
        <div dir="ltr" className="swiper-nav-left ika-hero-controls">
          <button
            className="swiper-button-prev"
            type="button"
            aria-label={translate("Previous hero slide", locale)}
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>
          <button
            className="swiper-button-next"
            type="button"
            aria-label={translate("Next hero slide", locale)}
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}