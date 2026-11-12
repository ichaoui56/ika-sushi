"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";
import { storeSettingsSchema } from "./schemas";

export async function updateStoreSettings(input: unknown) {
  await requirePermission("MANAGE_SETTINGS");
  const parsed = storeSettingsSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: "Check the website settings." };

  const entries = Object.entries(parsed.data);
  await prisma.$transaction(entries.map(([key, value]) => prisma.storeSetting.upsert({
    where: { key },
    create: { key, value },
    update: { value },
  })));
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true, message: "Website settings updated." };
}