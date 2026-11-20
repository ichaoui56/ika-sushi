import { z } from "zod";

const dailyHoursSchema = z.object({
  open: z.boolean(),
  start: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  end: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
}).refine((hours) => !hours.open || hours.start !== hours.end, { message: "Start and end times must be different for open days." });

export const openingHoursSchema = z.object({
  enabled: z.boolean(),
  days: z.object({
    monday: dailyHoursSchema,
    tuesday: dailyHoursSchema,
    wednesday: dailyHoursSchema,
    thursday: dailyHoursSchema,
    friday: dailyHoursSchema,
    saturday: dailyHoursSchema,
    sunday: dailyHoursSchema,
  }),
}).refine((hours) => !hours.enabled || Object.values(hours.days).some((day) => day.open), { message: "Enable at least one open day." });

export type OpeningHours = z.infer<typeof openingHoursSchema>;

export const defaultOpeningHours: OpeningHours = {
  enabled: false,
  days: {
    monday: { open: false, start: "11:00", end: "23:00" },
    tuesday: { open: false, start: "11:00", end: "23:00" },
    wednesday: { open: false, start: "11:00", end: "23:00" },
    thursday: { open: false, start: "11:00", end: "23:00" },
    friday: { open: false, start: "11:00", end: "23:00" },
    saturday: { open: false, start: "11:00", end: "23:00" },
    sunday: { open: false, start: "11:00", end: "23:00" },
  },
};

export const storeSettingsSchema = z.object({
  restaurantName: z.string().trim().min(1).max(120),
  contactPhone: z.string().trim().min(8).max(24),
  whatsappNumber: z.string().trim().min(8).max(24),
  currency: z.literal("MAD"),
  socialLinks: z.object({
    instagram: z.string().url().or(z.literal("")),
    facebook: z.string().url().or(z.literal("")),
  }),
  openingHours: openingHoursSchema,
});