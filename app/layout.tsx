import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "../style.css";
import { StoreProvider } from "../components/store/StoreProvider";
import { StorefrontInteractionBridge } from "../components/store/StorefrontInteractionBridge";
import { StoreFeedback } from "../components/store/StoreFeedback";
import { CartDrawer } from "../components/store/CartDrawer";
import { LocaleProvider } from "../components/i18n/LocaleProvider";
import { ServiceWorkerRegistration } from "../components/layout/ServiceWorkerRegistration";
import { isStoreOpenNow } from "../lib/store-hours";

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
  title: "Ika Sushi & Seafood",
  description: "Fresh sushi and seafood, prepared with care at Ika.",
  icons: { icon: "/adventure-bay.webp" },
};

const openAccessPrefixes = ["/admin", "/api", "/closed", "/login", "/register", "/forgot-password", "/delivery"];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-ika-pathname");
  const bypassOpeningHours = !pathname || openAccessPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  if (!bypassOpeningHours && !(await isStoreOpenNow())) redirect("/closed");

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap"
        />
        {stylesheets.map((stylesheet) => (
          <link
            key={stylesheet}
            rel="stylesheet"
            href={`/assets/css/${stylesheet}`}
          />
        ))}
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <LocaleProvider>
          <StoreProvider>
            {children}
            <StorefrontInteractionBridge />
            <ServiceWorkerRegistration />
            <StoreFeedback />
            <CartDrawer />
          </StoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
