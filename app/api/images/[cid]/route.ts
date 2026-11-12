import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { compressImageToWebp, MAX_COMPRESSED_IMAGE_BYTES } from "../../../../lib/image-processing";
import { pinata } from "../../../../lib/utils/pinata";

export const runtime = "nodejs";

const MAX_ORIGINAL_IMAGE_BYTES = 20 * 1024 * 1024;
const IMAGE_CACHE_SECONDS = 31_536_000;

async function readImage(response: Response): Promise<Buffer> {
  const contentLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_ORIGINAL_IMAGE_BYTES) {
    throw new Error("The source image is too large to optimize.");
  }
  if (!response.body) throw new Error("The image gateway returned an empty response.");

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_ORIGINAL_IMAGE_BYTES) {
      await reader.cancel();
      throw new Error("The source image is too large to optimize.");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

const getCachedWebp = unstable_cache(
  async (cid: string) => {
    const sourceUrl = await pinata.gateways.public.convert(cid);
    const response = await fetch(sourceUrl, {
      cache: "force-cache",
      next: { revalidate: IMAGE_CACHE_SECONDS },
    });
    if (!response.ok) throw new Error(`Image gateway request failed (${response.status}).`);

    const input = await readImage(response);
    const compressed = await compressImageToWebp(input);
    if (compressed.length >= MAX_COMPRESSED_IMAGE_BYTES) throw new Error("Compressed image exceeds the size limit.");
    return compressed.toString("base64");
  },
  ["pinata-image-webp-v1"],
  { revalidate: IMAGE_CACHE_SECONDS },
);

export async function GET(_request: Request, { params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  if (!/^[A-Za-z0-9]{20,128}$/.test(cid)) {
    return NextResponse.json({ error: "Invalid image reference." }, { status: 400 });
  }

  try {
    const image = Buffer.from(await getCachedWebp(cid), "base64");
    return new Response(image, {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(image.length),
        "Cache-Control": `public, max-age=${IMAGE_CACHE_SECONDS}, s-maxage=${IMAGE_CACHE_SECONDS}, immutable`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[api/images] Image conversion failed:", error);
    return NextResponse.json({ error: "Image could not be optimized." }, { status: 502 });
  }
}
