import assert from "node:assert/strict";
import test from "node:test";
import { heroSlideSchema } from "./schemas";

const slideInput = {
  title: "Seasonal menu",
  imageUrl: "/api/images/bafybeigdyrzt5sfp7udm7hu76uhvqqwrzbe6q5f3i",
};

test("hero slides accept cached local image paths", () => {
  assert.equal(heroSlideSchema.safeParse(slideInput).success, true);
});

test("hero slides reject malformed local image paths", () => {
  assert.equal(heroSlideSchema.safeParse({ ...slideInput, imageUrl: "/api/images/not-a-cid" }).success, false);
});
