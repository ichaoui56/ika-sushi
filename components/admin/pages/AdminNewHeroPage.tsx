import HeroSlideForm from "../HeroSlideForm";
import { getAdminHeroSlides, getHeroProductOptions } from "../../../features/hero/queries";

export default async function AdminNewHeroPage({ searchParams }: { searchParams?: Promise<{ edit?: string } | undefined> }) {
  const params = (await Promise.resolve(searchParams ?? {})) as { edit?: string };
  const [slides, products] = await Promise.all([getAdminHeroSlides(), getHeroProductOptions()]);
  const slide = params.edit ? slides.find((item) => item.id === params.edit) : undefined;

  return <HeroSlideForm
    slide={slide ? {
      ...slide,
      visibleFrom: slide.visibleFrom ? slide.visibleFrom.toISOString() : null,
      visibleUntil: slide.visibleUntil ? slide.visibleUntil.toISOString() : null,
    } : undefined}
    productOptions={products.map(({ id, name }) => ({ id, name }))}
  />;
}
