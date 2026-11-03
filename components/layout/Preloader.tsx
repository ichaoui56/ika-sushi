"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const loader = document.getElementById("restan-preloader");

    if (!loader) return;

    loader.classList.add("loaded");

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader">
      <div id="restan-preloader" className="restan-preloader">
        <div className="animation-preloader">
          <div className="spinner" />
        </div>

        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left">
              <div className="bg" />
            </div>

            <div className="col-3 loader-section section-left">
              <div className="bg" />
            </div>

            <div className="col-3 loader-section section-right">
              <div className="bg" />
            </div>

            <div className="col-3 loader-section section-right">
              <div className="bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
