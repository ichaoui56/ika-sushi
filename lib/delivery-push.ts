import "server-only";
import webPush from "web-push";
import { prisma } from "./prisma";

export interface DeliveryPushPayload {
  title: string;
  body: string;
  url: string;
  tag: string;
}

export async function sendDeliveryPush(userId: string, payload: DeliveryPushPayload) {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return;

  const subscriptions = await prisma.pushSubscription.findMany({ where: { userId } });
  if (!subscriptions.length) return;

  try {
    webPush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:notifications@ikasushi.ma", publicKey, privateKey);
  } catch (error) {
    console.error("[delivery-push] VAPID configuration is invalid.", error);
    return;
  }

  await Promise.all(subscriptions.map(async (subscription) => {
    try {
      await webPush.sendNotification({
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      }, JSON.stringify(payload));
    } catch (error) {
      const statusCode = typeof error === "object" && error !== null && "statusCode" in error
        ? error.statusCode
        : undefined;
      if (statusCode === 404 || statusCode === 410) {
        await prisma.pushSubscription.deleteMany({ where: { id: subscription.id } });
      } else {
        console.error("[delivery-push] Could not deliver a push notification.", error);
      }
    }
  }));
}