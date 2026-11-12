import assert from "node:assert/strict";
import test from "node:test";
import { productInputSchema } from "./schemas";
import { localizeProductText, withFrenchProductFallback } from "./translations";

const productBase = {
  name: "Salmon roll",
  description: "Fresh salmon and seasoned rice.",
  categoryIds: ["maki"],
};

test("selling and original prices calculate the discount percentage", () => {
  const product = productInputSchema.parse({
    ...productBase,
    pricingMode: "SELLING_AND_ORIGINAL",
    priceMinor: 1499,
    originalPriceMinor: 1999,
  });

  assert.equal(product.priceMinor, 1499);
  assert.equal(product.originalPriceMinor, 1999);
  assert.equal(product.discountPercent, 25.01);
});

test("original price and discount calculate the selling price", () => {
  const product = productInputSchema.parse({
    ...productBase,
    pricingMode: "ORIGINAL_AND_DISCOUNT",
    originalPriceMinor: 2000,
    discountPercent: 12.5,
  });

  assert.equal(product.priceMinor, 1750);
  assert.equal(product.originalPriceMinor, 2000);
  assert.equal(product.discountPercent, 12.5);
});

test("selling-only mode does not retain an original price", () => {
  const product = productInputSchema.parse({
    ...productBase,
    pricingMode: "SELLING_ONLY",
    priceMinor: 1525,
    originalPriceMinor: 2000,
  });

  assert.equal(product.priceMinor, 1525);
  assert.equal(product.originalPriceMinor, null);
  assert.equal(product.discountPercent, null);
});

test("product creation retains uploaded image URLs", () => {
  const imageUrls = ["https://gateway.pinata.cloud/ipfs/exampleCid"];
  const product = productInputSchema.parse({
    ...productBase,
    pricingMode: "SELLING_ONLY",
    priceMinor: 1525,
    imageUrls,
  });

  assert.deepEqual(product.imageUrls, imageUrls);
});

test("rejects a selling price above the original price", () => {
  const result = productInputSchema.safeParse({
    ...productBase,
    pricingMode: "SELLING_AND_ORIGINAL",
    priceMinor: 2100,
    originalPriceMinor: 2000,
  });

  assert.equal(result.success, false);
});

test("rejects discounts outside the supported range", () => {
  const result = productInputSchema.safeParse({
    ...productBase,
    pricingMode: "ORIGINAL_AND_DISCOUNT",
    originalPriceMinor: 2000,
    discountPercent: 101,
  });

  assert.equal(result.success, false);
});

test("product text uses French when the active language is missing", () => {
  assert.equal(
    localizeProductText("Nom français", { name: { fr: "Rouleau maison", en: "House roll" } }, "name", "ar"),
    "Rouleau maison",
  );
});

test("French product fields are retained as fallbacks for older storefront fields", () => {
  const translations = withFrenchProductFallback(
    { name: { en: "Salmon roll" }, description: { en: "Fresh salmon." } },
    { name: "Rouleau au saumon", description: "Riz assaisonné et saumon frais." },
  );
  assert.equal((translations.name as { fr: string }).fr, "Rouleau au saumon");
  assert.equal((translations.description as { fr: string }).fr, "Riz assaisonné et saumon frais.");
});