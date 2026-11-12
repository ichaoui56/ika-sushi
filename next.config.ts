import type { NextConfig } from "next";

const pageSlugs = [
  "about-us",
  "blog-2-colum",
  "blog-3-colum",
  "blog-single-with-sidebar",
  "blog-single",
  "blog-standard",
  "blog-with-sidebar",
  "cart",
  "checkout",
  "chef-details",
  "chef",
  "contact",
  "food-menu-2",
  "food-menu-3",
  "food-menu",
  "gallery",
  "login",
  "register",
  "reservation",
  "shop-single-thumb-only",
  "shop-single",
  "shop",
  "404",
];

const configuredGateway = process.env.NEXT_PUBLIC_GATEWAY_URL || process.env.PINATA_GATEWAY_URL;
let configuredGatewayHostname: string | undefined;
if (configuredGateway) {
  try {
    configuredGatewayHostname = new URL(
      configuredGateway.includes("://") ? configuredGateway : `https://${configuredGateway}`,
    ).hostname;
  } catch {
    configuredGatewayHostname = undefined;
  }
}

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_GATEWAY_URL: configuredGateway ?? "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.mypinata.cloud", pathname: "/ipfs/**" },
      { protocol: "https", hostname: "gateway.pinata.cloud", pathname: "/ipfs/**" },
      ...(configuredGatewayHostname
        ? [{ protocol: "https" as const, hostname: configuredGatewayHostname, pathname: "/ipfs/**" }]
        : []),
    ],
    minimumCacheTTL: 31_536_000,
    formats: ["image/webp"],
    qualities: [75, 95],
    deviceSizes: [360, 640, 960, 1280, 1600],
    imageSizes: [32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...pageSlugs.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
