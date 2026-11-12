import "server-only";
import { createHash } from "node:crypto";
import { prisma } from "../prisma";

const WINDOW_MILLISECONDS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const LOCK_MILLISECONDS = 15 * 60 * 1000;

function rateLimitKey(identifier: string): string {
  return createHash("sha256").update(identifier).digest("hex");
}

export async function consumeLoginAttempt(identifier: string): Promise<boolean> {
  const now = new Date();
  const key = rateLimitKey(identifier);
  const record = await prisma.authRateLimit.upsert({
    where: { key },
    create: { key, attempts: 1, windowStartedAt: now },
    update: { attempts: { increment: 1 } },
  });

  if (record.lockedUntil && record.lockedUntil > now) return false;

  if (record.windowStartedAt.getTime() < now.getTime() - WINDOW_MILLISECONDS) {
    await prisma.authRateLimit.update({
      where: { key },
      data: { attempts: 1, windowStartedAt: now, lockedUntil: null },
    });
    return true;
  }

  if (record.attempts > MAX_ATTEMPTS) {
    await prisma.authRateLimit.update({
      where: { key },
      data: { lockedUntil: new Date(now.getTime() + LOCK_MILLISECONDS) },
    });
    return false;
  }

  return true;
}

export async function clearLoginAttempts(identifier: string): Promise<void> {
  await prisma.authRateLimit.deleteMany({ where: { key: rateLimitKey(identifier) } });
}