// Service Worker para CharuAutos PWA Versión 2.0
const CACHE_NAME = 'charuautos-pwa-v2-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './ebook_v2_completo.md',
  './assets/favicon-16x16.png',
  './assets/favicon-32x32.png',
  './assets/favicon.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/charuautos_logo_icon.svg',
  './assets/charuautos_logo_horizontal.svg',
  './assets/charu_avatar.png',
  './assets/charuautos_emblema_mascota.png',
  './assets/tablero_testigos_espanol.jpg',
  './assets/vano_motor_real_espanol.jpg',
  './assets/turbo_mantenimiento_espanol.jpg',
  './assets/frenos_suspension_espanol.jpg',
  './assets/tire_guide_and_dot_code.jpg',
  './assets/cabin_filter_replacement.jpg',
  './assets/repuestos_calidad_espanol.jpg',
  './assets/taller_mecanico_espanol.jpg',
  './assets/car_emergency_kit.jpg',
  './assets/workshop_smart_checklist.jpg'
];

self.addEventListener('install', (event) => {
  console.log('[CharuAutos V2 SW] Instalando versión ' + CACHE_NAME);
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[CharuAutos V2 SW] Pre-cacheando recursos para offline...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[CharuAutos V2 SW] Activando versión ' + CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache.startsWith('charuautos-pwa-v2')) {
            console.log('[CharuAutos V2 SW] Purgando caché obsoleta:', cache);
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
            return cached || caches.match('./index.html');
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
