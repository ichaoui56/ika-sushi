import "server-only";
import { getCurrentUser } from "../../lib/auth/session";
import { prisma } from "../../lib/prisma";

export async function getCustomerAccount() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser || sessionUser.role !== "CUSTOMER") return null;
  return prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      addresses: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        include: { location: { select: { id: true, name: true } } },
      },
    },
  });
}