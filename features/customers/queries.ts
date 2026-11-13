import "server-only";
import { getCurrentUser } from "../../lib/auth/session";
import { prisma } from "../../lib/prisma";

export async function getCustomerAccount() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser || sessionUser.role !== "CUSTOMER") return null;
  const account = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      passwordHash: true,
      addresses: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        include: { location: { select: { id: true, name: true } } },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          reference: true,
          status: true,
          createdAt: true,
          totalMinor: true,
          currency: true,
          locationNameSnapshot: true,
        },
      },
    },
  });
  if (!account) return null;
  const { passwordHash, ...profile } = account;
  return { ...profile, hasPassword: Boolean(passwordHash) };
}

export async function getCustomerCheckoutDetails() {
  const sessionUser = await getCurrentUser();
  if (!sessionUser || sessionUser.role !== "CUSTOMER") return null;
  const customer = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      name: true,
      phone: true,
      addresses: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
        take: 1,
        select: {
          locationId: true,
          street: true,
          building: true,
          apartment: true,
          floor: true,
        },
      },
    },
  });
  if (!customer) return null;
  const address = customer.addresses[0];
  return {
    name: customer.name,
    phone: customer.phone,
    locationId: address?.locationId ?? "",
    address: [address?.street, address?.building, address?.apartment, address?.floor].filter(Boolean).join(", "),
  };
}