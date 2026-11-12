import "server-only";
import { prisma } from "../../lib/prisma";
import { requirePermission } from "../../lib/auth/permissions";

export async function getStoreSettings() {
  await requirePermission("MANAGE_SETTINGS");
  return prisma.storeSetting.findMany({ orderBy: { key: "asc" } });
}