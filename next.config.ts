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

const nextConfig: NextConfig = {
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
