import "server-only";
import sharp from "sharp";

export const MAX_COMPRESSED_IMAGE_BYTES = 49_000;

const MAX_INPUT_PIXELS = 40_000_000;
const MAX_DIMENSIONS = [1600, 1280, 1024, 896, 768, 640, 512, 384, 256, 192, 128];
const WEBP_QUALITIES = [72, 60, 48, 36, 24];

export async function compressImageToWebp(input: Buffer): Promise<Buffer> {
  const metadata = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  if (!metadata.width || !metadata.height) throw new Error("The uploaded file is not a supported image.");

  for (const dimension of MAX_DIMENSIONS) {
    for (const quality of WEBP_QUALITIES) {
      const output = await sharp(input, { limitInputPixels: MAX_INPUT_PIXELS })
        .rotate()
        .resize({ width: dimension, height: dimension, fit: "inside", withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toBuffer();
      if (output.length < MAX_COMPRESSED_IMAGE_BYTES) return output;
    }
  }

  throw new Error("This image could not be compressed below 50 KB. Choose a simpler or smaller image.");
}
