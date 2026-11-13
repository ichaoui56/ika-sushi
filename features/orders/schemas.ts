import { z } from "zod";
import { isValidPhoneNumber, normalizePhoneNumber } from "../auth/schemas";

export const checkoutOrderSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(8).max(24).refine(isValidPhoneNumber, {
    message: "Enter a valid phone number.",
  }),
  locationId: z.string().min(1),
  password: z.string().min(8).max(128).optional(),
  confirmPassword: z.string().min(8).max(128).optional(),
  street: z.string().trim().max(180).optional(),
  building: z.string().trim().max(80).optional(),
  apartment: z.string().trim().max(80).optional(),
  floor: z.string().trim().max(40).optional(),
  instructions: z.string().trim().max(1000).optional(),
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().min(1).max(50),
  })).min(1).max(60),
}).superRefine((value, context) => {
  if (value.password !== value.confirmPassword) {
    context.addIssue({ code: "custom", path: ["confirmPassword"], message: "Passwords do not match." });
  }
  if (value.password && normalizePhoneNumber(value.password) === normalizePhoneNumber(value.phone)) {
    context.addIssue({ code: "custom", path: ["password"], message: "Choose a password different from your phone number." });
  }
  const productIds = value.items.map(({ productId }) => productId);
  if (new Set(productIds).size !== productIds.length) {
    context.addIssue({ code: "custom", path: ["items"], message: "Cart contains duplicate items." });
  }
});

export type CheckoutOrderInput = z.infer<typeof checkoutOrderSchema>;