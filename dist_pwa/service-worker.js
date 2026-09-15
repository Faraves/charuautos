// Service Worker para CharuAutos PWA
const CACHE_NAME = 'charuautos-pwa-v7';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ebook_interactivo.html',
  './manifest.json',
  './favicon.ico?v=7',
  './assets/favicon-16x16.png?v=7',
  './assets/favicon-32x32.png?v=7',
  './assets/favicon.png?v=7',
  './assets/apple-touch-icon.png?v=7',
  './assets/icon-192.png?v=7',
  './assets/icon-512.png?v=7',
  './assets/charuautos_logo_icon.svg?v=7',
  './assets/charuautos_logo_horizontal.svg',
  './assets/charu_avatar.png?v=5',
  './assets/charuautos_emblema_mascota.png?v=5',
  './assets/tablero_testigos_espanol.jpg?v=4',
  './assets/vano_motor_real_espanol.jpg?v=4',
  './assets/turbo_mantenimiento_espanol.jpg?v=4',
  './assets/frenos_suspension_espanol.jpg?v=4',
  './assets/tire_guide_and_dot_code.jpg?v=4',
  './assets/cabin_filter_replacement.jpg?v=4',
  './assets/repuestos_calidad_espanol.jpg?v=4',
  './assets/taller_mecanico_espanol.jpg?v=4',
  './assets/car_emergency_kit.jpg?v=4'
];

self.addEventListener('install', (event) => {
  console.log('[CharuAutos SW] Instalando versión ' + CACHE_NAME);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[CharuAutos SW] Pre-cacheando recursos para offline...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[CharuAutos SW] Activando versión ' + CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[CharuAutos SW] Purgando caché obsoleta:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  const requestUrl = new URL(event.request.url);
  const isHtml = event.request.mode === 'navigate' || 
                 event.request.headers.get('accept')?.includes('text/html') ||
                 requestUrl.pathname.endsWith('.html') || 
                 requestUrl.pathname.endsWith('/');

  if (isHtml) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('./index.html') || caches.match('./ebook_interactivo.html');
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
