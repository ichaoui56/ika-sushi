"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "../../../i18n/LocaleProvider";
import { translate } from "../../../i18n/translations";
import { getHeroSlideText, type HeroSlideTranslations } from "../../../../features/hero/translations";
import type { ProductTranslations } from "../../../../features/products/translations";
import { toLocalImageUrl } from "../../../../lib/image-url";
import { formatProductPrice, getProductName } from "../../../store/product-locale";

export interface HeroSlideContent {
  id: string;
  translations?: HeroSlideTranslations;
  eyebrow: string;
  badgeLine: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  ctaText: string;
  ctaDestination: string;
  associatedProduct?: {
    id: string;
    name: string;
    translations?: ProductTranslations;
    price: number;
    currency: string;
  };
}

export default function HeroSection({ slides = [] }: { slides?: HeroSlideContent[] }) {
  const { locale } = useLocale();
  if (!slides.length) return null;

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
          {slides.map((slide, index) => {
            const translatedTitle = getHeroSlideText(slide.translations, locale, "title");
            const translatedSubtitle = getHeroSlideText(slide.translations, locale, "subtitle");
            const subtitleParts = translatedSubtitle?.split("·");
            const eyebrow = subtitleParts?.[0]?.trim() || translate(slide.eyebrow, locale);
            const badgeLine = subtitleParts?.[1]?.trim() || translate(slide.badgeLine, locale);
            const title = translatedTitle || translate(slide.titleLineOne, locale);
            const description = getHeroSlideText(slide.translations, locale, "description") || translate(slide.description, locale);
            const ctaText = getHeroSlideText(slide.translations, locale, "ctaText") || translate(slide.ctaText, locale);

            return (
              <div className={`swiper-slide ika-hero-slide ika-hero-slide-${slide.id}`} key={slide.id}>
                <div className="container ika-hero-layout">
                  <div className="ika-hero-copy">
                    <div className="ika-hero-badge">
                      <span>
                        <span>{eyebrow}</span>
                        <strong>{badgeLine}</strong>
                      </span>
                    </div>

                    <h1 className="ika-hero-title">
                      <span>{title}</span>
                      <span className="ika-hero-title-accent">{translate(slide.titleLineTwo, locale)}</span>
                    </h1>

                    <p className="ika-hero-description">{description}</p>
                    {slide.associatedProduct && <p className="ika-hero-associated-product"><span>{translate("Featured product", locale)}</span><strong>{getProductName(slide.associatedProduct, locale)}</strong><span>{formatProductPrice(slide.associatedProduct.price, slide.associatedProduct.currency, locale)}</span></p>}

                    <Link className="ika-hero-cta" href={slide.ctaDestination}>
                      <span>{ctaText}</span>
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
                        src={toLocalImageUrl(slide.image)}
                        alt={translatedTitle || slide.imageAlt}
                        fill
                        priority={index === 0}
                        unoptimized={toLocalImageUrl(slide.image).startsWith("/api/images/")}
                        sizes="(max-width: 767px) 48vw, (max-width: 1199px) 50vw, 55vw"
                        style={{ objectPosition: slide.imagePosition }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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