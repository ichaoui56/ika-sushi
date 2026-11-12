"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { deleteImage, parsePinataImageUrl } from "../../lib/pinata/client";
import { localImageUrlForCid } from "../../lib/image-url";
import { heroSlideSchema, heroSlideUpdateSchema } from "./schemas";

export async function createHeroSlide(input: unknown) {
  await requirePermission("MANAGE_HERO");
  const parsed = heroSlideSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the slide details." };
  if (!parsed.data.imageUrl) {
    return { success: false, message: "Upload an image or provide an HTTPS image URL." };
  }

  const pinned = parsePinataImageUrl(parsed.data.imageUrl);
  await prisma.heroSlide.create({
    data: {
      ...parsed.data,
      subtitle: parsed.data.subtitle || null,
      description: parsed.data.description || null,
      imageUrl: pinned ? localImageUrlForCid(pinned.cid) : parsed.data.imageUrl,
      imageCid: pinned?.cid,
      ctaText: parsed.data.ctaText || null,
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

  const requestedImageUrl = data.imageUrl ?? existing.imageUrl;
  const pinned = parsePinataImageUrl(requestedImageUrl);
  const imageUrl = pinned ? localImageUrlForCid(pinned.cid) : requestedImageUrl;
  const imageChanged = imageUrl !== existing.imageUrl;
  await prisma.heroSlide.update({
    where: { id },
    data: {
      ...data,
      subtitle: data.subtitle || null,
      description: data.description || null,
      imageUrl,
      imageCid: pinned?.cid ?? (imageChanged ? null : existing.imageCid),
      ctaText: data.ctaText || null,
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