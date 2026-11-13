"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { deleteImage, parsePinataImageUrl } from "../../lib/pinata/client";
import { localImageUrlForCid } from "../../lib/image-url";
import { productInputSchema, productUpdateSchema } from "./schemas";
import { withFrenchProductFallback } from "./translations";

export interface MutationResult {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoriesFor(categoryIds: string[]) {
  return categoryIds.map((categoryId) => ({
    category: { connect: { id: categoryId } },
  }));
}

export async function createProduct(input: unknown): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  const parsed = productInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the product details and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { imageUrls = [], ...data } = parsed.data;
  const uploadedImages: Array<{ url: string; cid: string; alt: string; sortOrder: number; isPrimary: boolean }> = [];
  for (const [index, imageUrl] of imageUrls.entries()) {
    const pinned = parsePinataImageUrl(imageUrl);
    if (!pinned) return { success: false, message: "An uploaded product image is invalid. Please try again." };
    uploadedImages.push({
      url: localImageUrlForCid(pinned.cid),
      cid: pinned.cid,
      alt: data.name,
      sortOrder: index,
      isPrimary: index === 0,
    });
  }
  const frenchName = data.translations?.name?.fr || data.name;
  const frenchDescription = data.translations?.description?.fr || data.description;
  const frenchShortDescription = data.translations?.shortDescription?.fr || data.shortDescription;
  const translations = withFrenchProductFallback(data.translations, {
    name: frenchName,
    description: frenchDescription,
    shortDescription: frenchShortDescription,
  });
  await prisma.product.create({
    data: {
      name: frenchName,
      slug: data.slug ? slugify(data.slug) : slugify(frenchName),
      description: frenchDescription,
      shortDescription: frenchShortDescription || null,
      translations,
      tags: data.tags,
      priceMinor: data.priceMinor,
      originalPriceMinor: data.originalPriceMinor,
      discountPercent: data.discountPercent,
      isOnPromotion: data.isOnPromotion,
      isFeaturedBestSeller: data.isFeaturedBestSeller,
      isAvailable: data.isAvailable,
      sortOrder: data.sortOrder,
      categories: { create: categoriesFor(data.categoryIds) },
      images: { create: uploadedImages.map((image) => ({ ...image, alt: frenchName })) },
    },
  });

  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true, message: "Product created." };
}

export async function updateProduct(input: unknown): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  const parsed = productUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: "Check the product details and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { id, ...data } = parsed.data;
  const frenchName = data.translations?.name?.fr || data.name;
  const frenchDescription = data.translations?.description?.fr || data.description;
  const frenchShortDescription = data.translations?.shortDescription?.fr || data.shortDescription;
  const translations = withFrenchProductFallback(data.translations, {
    name: frenchName,
    description: frenchDescription,
    shortDescription: frenchShortDescription,
  });
  await prisma.product.update({
    where: { id },
    data: {
      name: frenchName,
      slug: data.slug ? slugify(data.slug) : slugify(frenchName),
      description: frenchDescription,
      shortDescription: frenchShortDescription || null,
      translations,
      tags: data.tags,
      priceMinor: data.priceMinor,
      originalPriceMinor: data.originalPriceMinor,
      discountPercent: data.discountPercent,
      isOnPromotion: data.isOnPromotion,
      isFeaturedBestSeller: data.isFeaturedBestSeller,
      isAvailable: data.isAvailable,
      sortOrder: data.sortOrder,
      categories: {
        deleteMany: {},
        create: categoriesFor(data.categoryIds),
      },
    },
  });

  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true, message: "Product updated." };
}

export async function deleteProduct(productId: string): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  if (!productId) return { success: false, message: "Product not found." };

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { images: { select: { cid: true } } },
  });
  if (!product) return { success: false, message: "Product not found." };
  await prisma.product.delete({ where: { id: productId } });
  await Promise.allSettled(product.images.flatMap(({ cid }) => cid ? [deleteImage(cid)] : []));
  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true, message: "Product deleted." };
}

export async function attachProductImage(productId: string, imageUrl: string): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  const pinned = parsePinataImageUrl(imageUrl);
  if (!pinned) return { success: false, message: "The upload did not return a valid Pinata image URL." };

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true, images: { select: { id: true } } },
  });
  if (!product) return { success: false, message: "Product not found." };

  await prisma.productImage.create({
    data: {
      productId,
      url: localImageUrlForCid(pinned.cid),
      cid: pinned.cid,
      alt: product.name,
      sortOrder: product.images.length,
      isPrimary: product.images.length === 0,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  return { success: true, message: "Image uploaded." };
}

export async function setPrimaryProductImage(imageId: string): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  const image = await prisma.productImage.findUnique({
    where: { id: imageId },
    select: { id: true, productId: true },
  });

  if (!image) return { success: false, message: "Image not found." };

  await prisma.$transaction([
    prisma.productImage.updateMany({
      where: { productId: image.productId },
      data: { isPrimary: false },
    }),
    prisma.productImage.update({
      where: { id: image.id },
      data: { isPrimary: true },
    }),
  ]);

  revalidatePath("/admin/products");
  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  return { success: true, message: "Cover image updated." };
}

export async function deleteProductImage(imageId: string): Promise<MutationResult> {
  await requirePermission("MANAGE_PRODUCTS");
  const image = await prisma.productImage.findUnique({ where: { id: imageId } });
  if (!image) return { success: false, message: "Image not found." };

  if (image.cid) await deleteImage(image.cid);
  await prisma.productImage.delete({ where: { id: image.id } });
  const nextPrimary = await prisma.productImage.findFirst({
    where: { productId: image.productId },
    orderBy: { sortOrder: "asc" },
  });
  if (nextPrimary) {
    await prisma.$transaction([
      prisma.productImage.updateMany({
        where: { productId: image.productId, id: { not: nextPrimary.id } },
        data: { isPrimary: false },
      }),
      prisma.productImage.update({ where: { id: nextPrimary.id }, data: { isPrimary: true } }),
    ]);
  }

  revalidatePath("/admin/products");
  revalidatePath("/food-menu");
  revalidatePath("/food-menu");
  return { success: true, message: "Image deleted." };
}