import { NextResponse, type NextRequest } from "next/server";
import { AuthenticationError } from "pinata";
import { getActiveAdmin } from "../../../features/admin/auth";
import { compressImageToWebp, MAX_COMPRESSED_IMAGE_BYTES } from "../../../lib/image-processing";
import { pinata } from "../../../lib/utils/pinata";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_REQUEST_BYTES = 6 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
]);

export async function POST(request: NextRequest) {
  if (!(await getActiveAdmin())) {
    return NextResponse.json({ error: "You are not authorized to upload images." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: "The image must be 5 MB or smaller." }, { status: 413 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "The image upload form is invalid." }, { status: 400 });
  }

  if (!(file instanceof File) || !file.type.startsWith("image/") || !ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Upload a valid image file: JPG, PNG, WEBP, GIF, SVG, or BMP." }, { status: 400 });
  }

  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "The image must be 5 MB or smaller." }, { status: 413 });
  }

  if (!process.env.PINATA_JWT || !(process.env.NEXT_PUBLIC_GATEWAY_URL || process.env.PINATA_GATEWAY_URL)) {
    console.error("[api/files] Pinata credentials or gateway are not configured.");
    return NextResponse.json({ error: "Image storage is not configured." }, { status: 503 });
  }

  let compressed: Buffer;
  try {
    compressed = await compressImageToWebp(Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    const message = error instanceof Error ? error.message : "The image could not be optimized.";
    return NextResponse.json({ error: message }, { status: 422 });
  }

  try {
    const filename = `${file.name.replace(/\.[^.]+$/, "") || "image"}.webp`;
    const compressedBytes = new Uint8Array(compressed.byteLength);
    compressed.copy(compressedBytes);
    const uploadFile = new File([compressedBytes], filename, { type: "image/webp" });
    const { cid } = await pinata.upload.public.file(uploadFile);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error("[api/files] Pinata rejected the configured upload credentials.");
      return NextResponse.json({ error: "Pinata rejected the configured upload credentials." }, { status: 503 });
    }
    console.error("[api/files] Upload error:", error);
    return NextResponse.json({ error: "Image upload failed. Check your connection and try again." }, { status: 502 });
  }
}