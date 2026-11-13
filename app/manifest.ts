import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IKA Sushi Delivery",
    short_name: "IKA Delivery",
    description: "Order assignments and delivery updates for IKA couriers.",
    start_url: "/delivery",
    scope: "/",
    display: "standalone",
    background_color: "#f5f7f4",
    theme_color: "#06363d",
    icons: [
      { src: "/adventure-bay.webp", sizes: "512x512", type: "image/webp", purpose: "any" },
    ],
  };
}