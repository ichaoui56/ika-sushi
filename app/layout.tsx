import type { Metadata } from "next";

const stylesheets = [
  "bootstrap.min.css",
  "font-awesome.min.css",
  "flaticon-set.css",
  "magnific-popup.css",
  "swiper-bundle.min.css",
  "animate.min.css",
  "bootstrap-datepicker3.css",
  "validnavs.css",
  "helper.css",
  "unit-test.css",
  "shop.css",
  "style.css",
];

export const metadata: Metadata = {
  title: "Foodu - Food & Restaurant",
  description: "Foodu restaurant website",
  icons: { icon: "/assets/img/favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {stylesheets.map((stylesheet) => (
          <link
            key={stylesheet}
            rel="stylesheet"
            href={`/assets/css/${stylesheet}`}
          />
        ))}
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
