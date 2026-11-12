import { getVisibleHeroSlides } from "../../../../features/hero/queries";
import HeroSection, { type HeroSlideContent } from "./HeroSection";

export default async function HeroServerSection() {
  try {
    const slides = await getVisibleHeroSlides();
    const mappedSlides: HeroSlideContent[] = slides.map((slide) => ({
      id: slide.id,
      eyebrow: slide.subtitle?.split("·")[0]?.trim() ?? "IKA SUSHI",
      badgeLine: slide.subtitle?.split("·")[1]?.trim() ?? "FRESH DAILY",
      titleLineOne: slide.title,
      titleLineTwo: "",
      description: slide.description ?? "Freshly prepared with care.",
      image: slide.imageUrl,
      imageAlt: slide.title,
      imagePosition: "center",
      ctaText: slide.ctaText ?? "COMMANDER",
      ctaDestination: slide.ctaDestination ?? "/shop",
    }));
    return <HeroSection slides={mappedSlides} />;
  } catch {
    return <HeroSection />;
  }
}