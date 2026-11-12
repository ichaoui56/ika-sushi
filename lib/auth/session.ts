import "server-only";
import { auth } from "../../auth";
import { prisma } from "../prisma";

export async function getCurrentUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { permissions: { select: { permission: true } } },
  });
  if (!user || user.status !== "ACTIVE") return null;

  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
    permissions: user.permissions.map(({ permission }) => permission),
  };
}