const PINATA_CID_PATH = /^\/ipfs\/([A-Za-z0-9]{20,})(?:\/|$)/;

function isPinataHost(hostname: string) {
  const configuredGateway = process.env.NEXT_PUBLIC_GATEWAY_URL;
  let configuredHostname: string | null = null;
  if (configuredGateway) {
    try {
      configuredHostname = new URL(configuredGateway.includes("://") ? configuredGateway : `https://${configuredGateway}`).hostname;
    } catch {
      configuredHostname = null;
    }
  }
  return hostname === "gateway.pinata.cloud" || hostname.endsWith(".mypinata.cloud") || hostname === configuredHostname;
}

export function localImageUrlForCid(cid: string) {
  return `/api/images/${encodeURIComponent(cid)}`;
}

export function toLocalImageUrl(source: string | null | undefined): string {
  if (!source) return "";
  if (source.startsWith("/api/images/")) return source;

  try {
    const url = new URL(source);
    if (url.protocol !== "https:" || !isPinataHost(url.hostname)) return source;
    const match = url.pathname.match(PINATA_CID_PATH);
    return match ? localImageUrlForCid(match[1]) : source;
  } catch {
    return source;
  }
}
