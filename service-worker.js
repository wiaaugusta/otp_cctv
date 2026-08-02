const CACHE_NAME = "otp-cctv-v1";
const STATIC_FILES = [
  "/otp_cctv/",
  "/otp_cctv/index.html",
  "/otp_cctv/manifest.json",
  "/otp_cctv/icon-192.png",
  "/otp_cctv/icon-512.png"
];

self.addEventListener("install", event => {
  console.log("OTP CCTV Installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("OTP CCTV Activated");
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});
