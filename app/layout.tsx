import type { Metadata } from "next";
import "../style.css";
import { StoreProvider } from "../components/store/StoreProvider";
import { StorefrontInteractionBridge } from "../components/store/StorefrontInteractionBridge";
import { StoreFeedback } from "../components/store/StoreFeedback";
import { CartDrawer } from "../components/store/CartDrawer";
import { LocaleProvider } from "../components/i18n/LocaleProvider";

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
  title: "Foodu Sushi & Seafood",
  description: "Fresh sushi and seafood, prepared with care at Foodu.",
  icons: { icon: "/adventure-bay.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
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
      <body>
        <LocaleProvider>
          <StoreProvider>
            {children}
            <StorefrontInteractionBridge />
            <StoreFeedback />
            <CartDrawer />
          </StoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
