const CACHE_NAME = "moyes-treats-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );

  // Wait until the user chooses "Update"
  // before taking control.
});

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>
      Promise.all(

        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))

      )
    )

  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {

  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)
      .then(cachedResponse => {

        return cachedResponse || fetch(event.request);

      })

  );

});

// Receive the "Update" command from the website
self.addEventListener("message", event => {

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

});