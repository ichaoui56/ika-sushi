import assert from "node:assert/strict";
import test from "node:test";
import { heroSlideSchema } from "./schemas";
import { getHeroSlideCopies, getHeroSlideText } from "./translations";

const slideInput = {
  title: "Seasonal menu",
  imageUrl: "/api/images/bafybeigdyrzt5sfp7udm7hu76uhvqqwrzbe6q5f3i",
};

test("hero slides accept cached local image paths", () => {
  assert.equal(heroSlideSchema.safeParse(slideInput).success, true);
});

test("hero slides reject malformed local image paths", () => {
  assert.equal(heroSlideSchema.safeParse({ ...slideInput, imageUrl: "/api/images/not-a-cid" }).success, false);
});

test("hero slides may link an existing product or remain unlinked", () => {
  assert.equal(heroSlideSchema.safeParse({ ...slideInput, productId: "product-id" }).success, true);
  assert.equal(heroSlideSchema.safeParse({ ...slideInput, productId: null }).success, true);
});

test("hero slide translations accept French, English, and Arabic copy", () => {
  const translations = {
    fr: { title: "Menu de printemps", subtitle: "Frais · Chaque jour", description: "Poisson frais.", ctaText: "Commander" },
    en: { title: "Spring menu", subtitle: "Fresh · Every day", description: "Fresh fish.", ctaText: "Order now" },
    ar: { title: "قائمة الربيع", subtitle: "طازج · كل يوم", description: "سمك طازج.", ctaText: "اطلب الآن" },
  };

  assert.equal(heroSlideSchema.safeParse({ ...slideInput, translations }).success, true);
  assert.equal(heroSlideSchema.safeParse({ ...slideInput, translations: { ...translations, ar: undefined } }).success, false);

  const copies = getHeroSlideCopies(translations, { title: "Base", subtitle: "", description: "", ctaText: "Order" });
  assert.equal(getHeroSlideText(copies, "fr", "title"), "Menu de printemps");
  assert.equal(getHeroSlideText(copies, "en", "title"), "Spring menu");
  assert.equal(getHeroSlideText(copies, "ar", "title"), "قائمة الربيع");
});
