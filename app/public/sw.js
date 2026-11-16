/**
 * BAJOKAPOT Service Worker (PWA Offline First)
 * Cache-first para recursos estáticos y fallback offline para navegación.
 */

const CACHE_NAME = 'bajokapot-pwa-v9';
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js?v=20261115_bajokapot_v9',
  './auth.js?v=20261115_bajokapot_v9',
  './manifest.json?v=7',
  './certificado_charupro_muestra.html',
  './bajokapot-logo-dark.png',
  './bajokapot-logo-light.png',
  './bajokapot-wordmark-dark.png',
  './bajokapot-wordmark-light.png',
  './bajokapot-icon.png',
  './assets/icons/bajokapot-icon-192.png?v=7',
  './assets/icons/bajokapot-icon-512.png?v=7',
  './assets/icons/bajokapot-apple-touch-icon.png?v=7',
  './icon.png',
  './favicon.png?v=7'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(STATIC_ASSETS.map((url) => cache.add(url)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Estrategia Network-first con fallback a cache local
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback relativo para GitHub Pages y Vercel
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html').then((idx) => idx || caches.match('./'));
          }
        });
      })
  );
});
