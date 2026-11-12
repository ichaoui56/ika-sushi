import { AdminPageHeading } from "../AdminShell";
import HeroManager from "../HeroManager";
import { getAdminHeroSlides } from "../../../features/hero/queries";

export default async function AdminHeroPage() {
  const slides = await getAdminHeroSlides();
  return <><AdminPageHeading title="Hero slides" description="Homepage carousel content, visibility, and destination settings." /><HeroManager slides={slides.map((slide) => ({ ...slide, visibleFrom: slide.visibleFrom?.toISOString() ?? null, visibleUntil: slide.visibleUntil?.toISOString() ?? null }))} /></>;
}