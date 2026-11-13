import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "../../../../lib/auth/session";
import { prisma } from "../../../../lib/prisma";

const subscriptionSchema = z.object({
  endpoint: z.string().url().max(2048).refine((value) => new URL(value).protocol === "https:"),
  keys: z.object({
    p256dh: z.string().min(1).max(256),
    auth: z.string().min(1).max(256),
  }),
});

const endpointSchema = z.object({
  endpoint: z.string().url().max(2048).refine((value) => new URL(value).protocol === "https:"),
});

async function getDeliveryUser() {
  const user = await getCurrentUser();
  return user?.role === "DELIVERY" ? user : null;
}

export async function POST(request: Request) {
  const user = await getDeliveryUser();
  if (!user) return NextResponse.json({ error: "Delivery account required." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid subscription data." }, { status: 400 });
  }

  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid subscription data." }, { status: 400 });

  await prisma.pushSubscription.upsert({
    where: { endpoint: parsed.data.endpoint },
    create: {
      userId: user.id,
      endpoint: parsed.data.endpoint,
      p256dh: parsed.data.keys.p256dh,
      auth: parsed.data.keys.auth,
    },
    update: {
      userId: user.id,
      p256dh: parsed.data.keys.p256dh,
      auth: parsed.data.keys.auth,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const user = await getDeliveryUser();
  if (!user) return NextResponse.json({ error: "Delivery account required." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid subscription data." }, { status: 400 });
  }

  const parsed = endpointSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid subscription data." }, { status: 400 });

  await prisma.pushSubscription.deleteMany({ where: { userId: user.id, endpoint: parsed.data.endpoint } });
  return NextResponse.json({ success: true });
}