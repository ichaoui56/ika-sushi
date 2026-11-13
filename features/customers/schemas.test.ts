import assert from "node:assert/strict";
import test from "node:test";
import { customerPasswordSchema } from "./schemas";

test("customer password changes require a matching password of at least 8 characters", () => {
  assert.equal(customerPasswordSchema.safeParse({
    currentPassword: "current-password",
    newPassword: "new-password",
    confirmPassword: "new-password",
  }).success, true);

  assert.equal(customerPasswordSchema.safeParse({
    newPassword: "short",
    confirmPassword: "short",
  }).success, false);

  assert.equal(customerPasswordSchema.safeParse({
    newPassword: "new-password",
    confirmPassword: "different-password",
  }).success, false);
});