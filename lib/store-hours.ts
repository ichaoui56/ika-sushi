import "server-only";

import { prisma } from "./prisma";
import { defaultOpeningHours, openingHoursSchema, type OpeningHours } from "../features/settings/schemas";

const timezone = "Africa/Casablanca";
const weekdayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

export async function getPublicOpeningHours(): Promise<OpeningHours> {
  try {
    const setting = await prisma.storeSetting.findUnique({ where: { key: "openingHours" }, select: { value: true } });
    const parsed = openingHoursSchema.safeParse(setting?.value);
    return parsed.success ? parsed.data : defaultOpeningHours;
  } catch {
    return defaultOpeningHours;
  }
}

export async function isStoreOpenNow(now = new Date()) {
  const schedule = await getPublicOpeningHours();
  if (!schedule.enabled) return true;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const weekday = values.weekday?.toLowerCase() as typeof weekdayKeys[number] | undefined;
  if (!weekday) return true;

  const dayIndex = weekdayKeys.indexOf(weekday);
  const today = schedule.days[weekday];
  const currentMinute = Number(values.hour) * 60 + Number(values.minute);
  const startMinute = Number(today.start.slice(0, 2)) * 60 + Number(today.start.slice(3));
  const endMinute = Number(today.end.slice(0, 2)) * 60 + Number(today.end.slice(3));

  if (today.open && (startMinute < endMinute
    ? currentMinute >= startMinute && currentMinute < endMinute
    : currentMinute >= startMinute)) return true;

  const previousDay = schedule.days[weekdayKeys[(dayIndex + 6) % 7]];
  const previousStart = Number(previousDay.start.slice(0, 2)) * 60 + Number(previousDay.start.slice(3));
  const previousEnd = Number(previousDay.end.slice(0, 2)) * 60 + Number(previousDay.end.slice(3));
  return previousDay.open && previousStart > previousEnd && currentMinute < previousEnd;
}