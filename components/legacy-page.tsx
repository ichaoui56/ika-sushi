"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

const scripts = [
  "jquery-3.6.0.min.js",
  "bootstrap.bundle.min.js",
  "jquery.appear.js",
  "swiper-bundle.min.js",
  "progress-bar.min.js",
  "wow.min.js",
  "isotope.pkgd.min.js",
  "imagesloaded.pkgd.min.js",
  "magnific-popup.min.js",
  "count-to.js",
  "jquery.nice-select.min.js",
  "YTPlayer.min.js",
  "loopcounter.js",
  "validnavs.js",
  "bootstrap-datepicker.js",
  "main.js",
];

let scriptsPromise: Promise<void> | undefined;

function loadScripts() {
  scriptsPromise ??= (async () => {
    for (const filename of scripts) {
      const script = document.createElement("script");
      script.src = `/assets/js/${filename}`;
      script.async = false;
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Unable to load /assets/js/${filename}`));
        document.body.appendChild(script);
      });
    }
  })().catch((error: unknown) => {
    scriptsPromise = undefined;
    throw error;
  });

  return scriptsPromise;
}

export default function LegacyPage({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    let savedMode: string | null = null;
    try {
      savedMode = window.localStorage.getItem("foodu-color-mode");
    } catch (error) {
      console.error("Could not read the saved color mode.", error);
    }
    document.body.classList.toggle(
      "bg-dark-secondary",
      savedMode ? savedMode === "dark" : dark,
    );

    void loadScripts().catch((error: unknown) => {
      console.error("Failed to initialize the legacy page scripts.", error);
    });

    return () => {
      if (dark) document.body.classList.remove("bg-dark-secondary");
    };
  }, [dark]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    void loadScripts()
      .then(() => {
        document.dispatchEvent(new Event("foodu:route-change"));
      })
      .catch((error: unknown) => {
        console.error("Failed to reinitialize the page after navigation.", error);
      });
  }, [pathname]);

  return <div className="legacy-page">{children}</div>;
}
