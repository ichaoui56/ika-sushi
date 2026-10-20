"use client";

import { useEffect, type ReactNode } from "react";

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
  "gsap.js",
  "ScrollTrigger.min.js",
  "SplitText.min.js",
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
  useEffect(() => {
    if (dark) document.body.classList.add("bg-dark-secondary");
    else document.body.classList.remove("bg-dark-secondary");

    void loadScripts().catch((error: unknown) => {
      console.error("Failed to initialize the legacy page scripts.", error);
    });

    return () => {
      if (dark) document.body.classList.remove("bg-dark-secondary");
    };
  }, [dark]);

  return <div className="legacy-page">{children}</div>;
}
