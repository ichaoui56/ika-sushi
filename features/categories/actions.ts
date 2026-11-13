"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { deleteImage, parsePinataImageUrl } from "../../lib/pinata/client";
import { localImageUrlForCid } from "../../lib/image-url";
import { categorySchema, categoryUpdateSchema } from "./schemas";
import { makeCategoryTranslations } from "./translations";

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createCategory(input: unknown) {
  await requirePermission("MANAGE_CATEGORIES");
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the category details." };
  const { nameEn, nameAr, ...data } = parsed.data;

  await prisma.category.create({
    data: {
      ...data,
      translations: makeCategoryTranslations(data.name, nameEn, nameAr),
      slug: data.slug ? slugify(data.slug) : slugify(data.name),
      description: data.description || null,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/food-menu");
  revalidatePath("/");
  return { success: true, message: "Category created." };
}

export async function updateCategory(input: unknown) {
  await requirePermission("MANAGE_CATEGORIES");
  const parsed = categoryUpdateSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the category details." };
  const { id, ...data } = parsed.data;
  const { nameEn, nameAr, ...categoryData } = data;

  await prisma.category.update({
    where: { id },
    data: {
      ...categoryData,
      translations: makeCategoryTranslations(categoryData.name, nameEn, nameAr),
      slug: categoryData.slug ? slugify(categoryData.slug) : slugify(categoryData.name),
      description: categoryData.description || null,
    },
  });
  revalidatePath("/admin/categories");
  revalidatePath("/food-menu");
  revalidatePath("/");
  return { success: true, message: "Category updated." };
}

export async function deleteCategory(categoryId: string) {
  await requirePermission("MANAGE_CATEGORIES");
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, imageCid: true, _count: { select: { products: true } } },
  });
  if (!category) return { success: false, message: "Category not found." };
  if (category._count.products > 0) {
    return { success: false, message: "Remove this category from its products before deleting it." };
  }

  if (category.imageCid) await deleteImage(category.imageCid);
  await prisma.category.delete({ where: { id: categoryId } });
  revalidatePath("/admin/categories");
  revalidatePath("/food-menu");
  revalidatePath("/");
  return { success: true, message: "Category deleted." };
}

export async function attachCategoryImage(categoryId: string, imageUrl: string) {
  await requirePermission("MANAGE_CATEGORIES");
  const pinned = parsePinataImageUrl(imageUrl);
  if (!pinned) return { success: false, message: "The upload did not return a valid Pinata image URL." };
  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) return { success: false, message: "Category not found." };

  await prisma.category.update({
    where: { id: categoryId },
    data: { imageUrl: localImageUrlForCid(pinned.cid), imageCid: pinned.cid },
  });
  if (category.imageCid) await deleteImage(category.imageCid).catch(() => undefined);

  revalidatePath("/admin/categories");
  revalidatePath("/food-menu");
  return { success: true, message: "Category image uploaded." };
}