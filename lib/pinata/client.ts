import "server-only";
import { pinata } from "../utils/pinata";

const MAX_IMAGE_BYTES = 100_000;

export interface PinnedImage {
  cid: string;
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

function isWebp(bytes: Uint8Array): boolean {
  return bytes.length >= 12 &&
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP";
}

export function parsePinataImageUrl(value: string) {
  const localMatch = value.match(/^\/api\/images\/([A-Za-z0-9]{20,128})$/);
  if (localMatch) return { cid: localMatch[1], url: value };

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const gatewayValue = process.env.NEXT_PUBLIC_GATEWAY_URL || process.env.PINATA_GATEWAY_URL;
  let configuredHostname: string | null = null;
  if (gatewayValue) {
    try {
      configuredHostname = new URL(gatewayValue.includes("://") ? gatewayValue : `https://${gatewayValue}`).hostname;
    } catch {
      configuredHostname = null;
    }
  }

  const matchesGateway =
    url.hostname.endsWith(".mypinata.cloud") ||
    url.hostname === "gateway.pinata.cloud" ||
    url.hostname === configuredHostname;
  const match = url.pathname.match(/^\/ipfs\/([A-Za-z0-9]{20,})(?:\/|$)/);
  if (url.protocol !== "https:" || !matchesGateway || !match) return null;
  return { cid: match[1], url: url.toString() };
}

export async function uploadImage(file: File): Promise<PinnedImage> {
  if (file.type !== "image/webp") {
    throw new Error("Choose a compressed WebP image.");
  }
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image files must be 100 KB or smaller.");
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!isWebp(bytes)) throw new Error("The uploaded file is not a valid WebP image.");
  if (!process.env.PINATA_JWT || !(process.env.NEXT_PUBLIC_GATEWAY_URL || process.env.PINATA_GATEWAY_URL)) {
    throw new Error("Pinata is not configured on the server.");
  }

  const uploadFile = new File([bytes], file.name, { type: "image/webp" });
  const { cid } = await pinata.upload.public.file(uploadFile);
  const url = await pinata.gateways.public.convert(cid);

  return {
    cid,
    url,
    name: file.name,
    size: file.size,
    mimeType: file.type,
  };
}

export async function deleteImage(cid: string): Promise<void> {
  if (!/^[a-zA-Z0-9]+$/.test(cid)) throw new Error("Invalid image reference.");
  const jwt = process.env.PINATA_JWT;
  if (!jwt) throw new Error("Pinata is not configured on the server.");
  const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${encodeURIComponent(cid)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
    cache: "no-store",
  });
  if (!response.ok && response.status !== 404) throw new Error("Pinata image deletion failed.");
}