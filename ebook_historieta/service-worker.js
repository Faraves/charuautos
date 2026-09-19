const CACHE_NAME = 'charuautos-comic-pwa-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/charu_avatar.png?v=10',
  './assets/carmen_avatar.png?v=10',
  './assets/carlos_avatar.png?v=10',
  './assets/chanchullo_avatar.png?v=10',
  './assets/chanchullo_avatar_nervioso.png?v=10',
  './assets/don_chanchullo_personaje_animado.jpg?v=10',
  './assets/charuautos_emblema_mascota.png?v=10',
  './assets/comic_cover_historieta.jpg?v=10'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((k) => k !== CACHE_NAME ? caches.delete(k) : null)
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;
  const isImage = event.request.destination === 'image' || event.request.url.match(/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i);
  
  if (isImage) {
    event.respondWith(
      fetch(event.request).then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return res;
      }).catch(() => caches.match(event.request))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          }
          return res;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    );
  }
});
