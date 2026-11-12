"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const gateway = process.env.NEXT_PUBLIC_GATEWAY_URL;
    const workerUrl = gateway ? `/sw.js?pinataGateway=${encodeURIComponent(gateway)}` : "/sw.js";
    void navigator.serviceWorker.register(workerUrl).catch((error: unknown) => {
      console.error("Could not register the image cache service worker.", error);
    });
  }, []);

  return null;
}