/**
 * CharuAutos Service Worker (PWA Offline First)
 * Cache-first para recursos estáticos y fallback offline para navegación.
 */

const CACHE_NAME = 'charuautos-pwa-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/certificado_charupro_muestra.html',
  '/icon.png',
  '/favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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
          // Fallback a raíz si es navegación
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
