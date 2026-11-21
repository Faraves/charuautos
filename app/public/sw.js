/**
 * BAJOKAPOT Service Worker (PWA Offline First)
 * Cache-first para recursos estáticos y fallback offline para navegación.
 */

const CACHE_NAME = 'bajokapot-pwa-v14';
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js?v=20261121_bajokapot_v14',
  './auth.js?v=20261121_bajokapot_v14',
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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          fetch(url, { cache: 'no-store' }).then((res) => {
            if (res && res.ok) return cache.put(url, res);
          })
        )
      );
    })
  );
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
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const reqUrl = new URL(event.request.url);
  // Nunca interceptar peticiones externas (Firebase Auth/Firestore, CDN, APIs)
  if (reqUrl.origin !== self.location.origin) return;

  const isCoreCode =
    event.request.mode === 'navigate' ||
    reqUrl.pathname.endsWith('/') ||
    reqUrl.pathname.endsWith('/index.html') ||
    reqUrl.pathname.endsWith('/app.js') ||
    reqUrl.pathname.endsWith('/auth.js');

  const networkPromise = isCoreCode
    ? fetch(reqUrl.origin + reqUrl.pathname, { cache: 'no-store' })
    : fetch(event.request);

  // Estrategia Network-first (no-store para código principal) con fallback a cache local
  event.respondWith(
    networkPromise
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
