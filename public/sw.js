self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || request.destination !== "image") return;

  const requestUrl = new URL(request.url);
  let imageUrl = request.url;
  if (requestUrl.origin === self.location.origin && requestUrl.pathname === "/_next/image") {
    imageUrl = requestUrl.searchParams.get("url") || "";
  }

  let sourceUrl;
  try {
    sourceUrl = new URL(imageUrl);
  } catch {
    return;
  }

  let configuredGateway = "";
  try {
    const gatewayValue = new URL(self.location.href).searchParams.get("pinataGateway");
    configuredGateway = gatewayValue
      ? new URL(gatewayValue.includes("://") ? gatewayValue : `https://${gatewayValue}`).hostname
      : "";
  } catch {
    configuredGateway = "";
  }

  const isPinataGateway =
    sourceUrl.hostname.endsWith(".mypinata.cloud") ||
    sourceUrl.hostname === "gateway.pinata.cloud" ||
    sourceUrl.hostname === configuredGateway;
  if (sourceUrl.protocol !== "https:" || !isPinataGateway || !/^\/ipfs\/[^/]+(?:\/|$)/.test(sourceUrl.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open("pinata-cid-images-v1");
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      event.waitUntil((async () => {
        await cache.delete(request);
        await cache.put(request, cachedResponse.clone());
      })());
      return cachedResponse;
    }

    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      const cachedRequests = await cache.keys();
      const oldestRequests = cachedRequests.slice(0, Math.max(0, cachedRequests.length - 300));
      await Promise.all(oldestRequests.map((cachedRequest) => cache.delete(cachedRequest)));
    }
    return response;
  })());
});

self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data?.text() ?? "" };
  }

  const title = payload.title || "IKA Sushi";
  const options = {
    body: payload.body || "Your order has been updated.",
    icon: "/logo.png",
    badge: "/logo.png",
    tag: payload.tag || "ika-sushi-order",
    data: { url: payload.url || "/" },
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/", self.location.origin);
  if (targetUrl.origin !== self.location.origin) return;

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of windows) {
      if ("navigate" in client) await client.navigate(targetUrl.href);
      if ("focus" in client) return client.focus();
    }
    return self.clients.openWindow(targetUrl.href);
  })());
});