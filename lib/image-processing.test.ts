import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { compressImageToWebp, MAX_COMPRESSED_IMAGE_BYTES } from "./image-processing";
import { toLocalImageUrl } from "./image-url";

test("image compression produces WebP under the 50 KB limit", async () => {
  const source = await sharp({
    create: {
      width: 1400,
      height: 900,
      channels: 3,
      background: { r: 214, g: 96, b: 61 },
    },
  }).png().toBuffer();
  const compressed = await compressImageToWebp(source);
  const metadata = await sharp(compressed).metadata();

  assert.equal(metadata.format, "webp");
  assert.ok(compressed.byteLength < MAX_COMPRESSED_IMAGE_BYTES);
});

test("invalid image bytes are rejected", async () => {
  await assert.rejects(compressImageToWebp(Buffer.from("not an image")));
});

test("Pinata gateway images are mapped to the local image cache", () => {
  assert.equal(
    toLocalImageUrl("https://gateway.pinata.cloud/ipfs/bafybeigdyrzt5sfp7udm7hu76uhvqqwrzbe6q5f3i/item.png"),
    "/api/images/bafybeigdyrzt5sfp7udm7hu76uhvqqwrzbe6q5f3i",
  );
  assert.equal(toLocalImageUrl("/assets/img/food/sushi.png"), "/assets/img/food/sushi.png");
});
