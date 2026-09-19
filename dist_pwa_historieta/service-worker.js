const CACHE_NAME = 'charuautos-comic-pwa-v14';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/charu_avatar.png',
  './assets/carmen_avatar.png',
  './assets/carlos_avatar.png',
  './assets/chanchullo_avatar.png',
  './assets/comic_cover_historieta_v2.jpg',
  './assets/comic_panel_01_seguridad_v2.jpg',
  './assets/comic_panel_02_cuerpo_humano_v2.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  // Network-First for everything to ensure freshness
  event.respondWith(
    fetch(event.request).then((res) => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
      }
      return res;
    }).catch(() => caches.match(event.request))
  );
});
