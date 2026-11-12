import NextImage, { type ImageProps } from "next/image";
import { toLocalImageUrl } from "../../lib/image-url";

function isPinataCidImage(src: ImageProps["src"]): boolean {
  if (typeof src !== "string") return false;

  try {
    const url = new URL(src);
    const gatewayValue = process.env.NEXT_PUBLIC_GATEWAY_URL;
    const configuredHostname = gatewayValue
      ? new URL(gatewayValue.includes("://") ? gatewayValue : `https://${gatewayValue}`).hostname
      : null;
    const isPinataGateway =
      url.hostname.endsWith(".mypinata.cloud") ||
      url.hostname === "gateway.pinata.cloud" ||
      url.hostname === configuredHostname;
    return url.protocol === "https:" && isPinataGateway && /^\/ipfs\/[^/]+(?:\/|$)/.test(url.pathname);
  } catch {
    return false;
  }
}

export default function OptimizedImage(props: ImageProps) {
  const isPinataImage = isPinataCidImage(props.src);
  const src = typeof props.src === "string" ? toLocalImageUrl(props.src) : props.src;
  return <NextImage {...props} src={src} unoptimized={isPinataImage || (typeof src === "string" && src.startsWith("/api/images/")) ? true : props.unoptimized ?? true} />;
}