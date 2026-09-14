// Service Worker para CharuAutos PWA
const CACHE_NAME = 'charuautos-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './ebook_interactivo.html',
  './manifest.json',
  './assets/charuautos_logo_horizontal.svg',
  './assets/charuautos_logo_icon.svg',
  './assets/charuautos_avatar_instagram.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/tablero_testigos_espanol.jpg',
  './assets/vano_motor_real_espanol.jpg',
  './assets/turbo_mantenimiento_espanol.jpg',
  './assets/frenos_suspension_espanol.jpg',
  './assets/tire_guide_and_dot_code.jpg',
  './assets/cabin_filter_replacement.jpg',
  './assets/repuestos_calidad_espanol.jpg',
  './assets/taller_mecanico_espanol.jpg',
  './assets/car_emergency_kit.jpg'
];

// Instalación y pre-cacheados de recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[CharuAutos Service Worker] Pre-cacheando recursos para uso offline...');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[CharuAutos Service Worker] Eliminando cache obsoleto:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepción de solicitudes: Estrategia Stale-While-Revalidate / Cache First
self.addEventListener('fetch', (event) => {
  // Ignorar esquemas no HTTP/HTTPS (extensiones, etc.)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Devolver recurso en cache inmediatamente y actualizar en segundo plano
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {
          // Si no hay red, la respuesta en cache ya fue enviada
        });
        return cachedResponse;
      }

      // Si no está en cache, solicitar a la red
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback offline si el recurso no está disponible
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html') || caches.match('./ebook_interactivo.html');
        }
      });
    })
  );
});
