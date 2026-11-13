"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { deleteImage, parsePinataImageUrl } from "../../lib/pinata/client";
import { localImageUrlForCid } from "../../lib/image-url";
import { heroSlideSchema, heroSlideUpdateSchema } from "./schemas";
import { getHeroSlideCopies, toPrismaHeroTranslations } from "./translations";

export async function createHeroSlide(input: unknown) {
  await requirePermission("MANAGE_HERO");
  const parsed = heroSlideSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the slide details." };
  if (!parsed.data.imageUrl) {
    return { success: false, message: "Upload an image or provide an HTTPS image URL." };
  }
  const fallbackCopy = {
    title: parsed.data.title,
    subtitle: parsed.data.subtitle ?? "",
    description: parsed.data.description ?? "",
    ctaText: parsed.data.ctaText ?? "",
  };
  const copies = getHeroSlideCopies(parsed.data.translations, fallbackCopy);
  const { translations: _translations, ...slideData } = parsed.data;

  const pinned = parsePinataImageUrl(parsed.data.imageUrl);
  await prisma.heroSlide.create({
    data: {
      ...slideData,
      title: copies.fr.title,
      translations: toPrismaHeroTranslations(parsed.data.translations, fallbackCopy),
      subtitle: copies.fr.subtitle || null,
      description: copies.fr.description || null,
      imageUrl: pinned ? localImageUrlForCid(pinned.cid) : parsed.data.imageUrl,
      imageCid: pinned?.cid,
      ctaText: copies.fr.ctaText || null,
      ctaDestination: parsed.data.ctaDestination || null,
    },
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, message: "Hero slide created." };
}

export async function updateHeroSlide(input: unknown) {
  await requirePermission("MANAGE_HERO");
  const parsed = heroSlideUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the slide details." };

  const { id, ...data } = parsed.data;
  const existing = await prisma.heroSlide.findUnique({ where: { id } });
  if (!existing) return { success: false, message: "Hero slide not found." };
  const fallbackCopy = {
    title: data.title,
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "",
  };
  const copies = getHeroSlideCopies(data.translations, fallbackCopy);
  const { translations: _translations, ...slideData } = data;

  const requestedImageUrl = data.imageUrl ?? existing.imageUrl;
  const pinned = parsePinataImageUrl(requestedImageUrl);
  const imageUrl = pinned ? localImageUrlForCid(pinned.cid) : requestedImageUrl;
  const imageChanged = imageUrl !== existing.imageUrl;
  await prisma.heroSlide.update({
    where: { id },
    data: {
      ...slideData,
      title: copies.fr.title,
      translations: toPrismaHeroTranslations(data.translations, fallbackCopy),
      subtitle: copies.fr.subtitle || null,
      description: copies.fr.description || null,
      imageUrl,
      imageCid: pinned?.cid ?? (imageChanged ? null : existing.imageCid),
      ctaText: copies.fr.ctaText || null,
      ctaDestination: data.ctaDestination || null,
    },
  });

  if (imageChanged && existing.imageCid) await deleteImage(existing.imageCid).catch(() => undefined);
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, message: "Hero slide updated." };
}

export async function deleteHeroSlide(slideId: string) {
  await requirePermission("MANAGE_HERO");
  const slide = await prisma.heroSlide.findUnique({ where: { id: slideId } });
  if (!slide) return { success: false, message: "Hero slide not found." };
  await prisma.heroSlide.delete({ where: { id: slideId } });
  if (slide.imageCid) await deleteImage(slide.imageCid).catch(() => undefined);
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true, message: "Hero slide deleted." };
}