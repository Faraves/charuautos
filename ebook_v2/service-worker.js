// Service Worker para CharuAutos PWA Versión 2.0 (Build 2026-09-15-v9)
const CACHE_NAME = 'charuautos-pwa-v2-20260915-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './ebook_v2_completo.md',
  './assets/apple-touch-icon.png',
  './assets/brake_and_suspension_guide.jpg',
  './assets/cabin_filter_replacement.jpg',
  './assets/car_emergency_kit.jpg',
  './assets/charu_avatar.png',
  './assets/charuautos_avatar_instagram.svg',
  './assets/charuautos_emblema_mascota.jpg',
  './assets/charuautos_emblema_mascota.png',
  './assets/charuautos_logo_horizontal.svg',
  './assets/charuautos_logo_icon.svg',
  './assets/charuautos_watermark.svg',
  './assets/dashboard_warning_lights.jpg',
  './assets/engine_bay_inspection.jpg',
  './assets/favicon-16x16.png',
  './assets/favicon-32x32.png',
  './assets/favicon.ico',
  './assets/favicon.png',
  './assets/frenos_suspension_espanol.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/ilustracion_bitacora_mantenimiento.svg',
  './assets/ilustracion_cambio_llanta_pasos.svg',
  './assets/ilustracion_cambio_llanta_secuencia.jpg',
  './assets/ilustracion_ciclo_motor_4_tiempos.jpg',
  './assets/ilustracion_conector_obd2.svg',
  './assets/ilustracion_correa_accesorios_vs_distribucion.svg',
  './assets/ilustracion_correas_motor_distribucion.jpg',
  './assets/ilustracion_cronograma_kilometraje.jpg',
  './assets/ilustracion_cuerpo_humano_auto.svg',
  './assets/ilustracion_etiqueta_presion_pilar.svg',
  './assets/ilustracion_fusible_bueno_quemado.svg',
  './assets/ilustracion_guia_colores_fluidos.svg',
  './assets/ilustracion_guia_taller_comunicacion.svg',
  './assets/ilustracion_herramientas_esenciales.svg',
  './assets/ilustracion_inspeccion_360.svg',
  './assets/ilustracion_inspeccion_360_auto.jpg',
  './assets/ilustracion_kit_herramientas_emergencia.jpg',
  './assets/ilustracion_lectura_varilla_aceite.jpg',
  './assets/ilustracion_neumatico_desgaste_profundidad.svg',
  './assets/ilustracion_paso_corriente_bateria.svg',
  './assets/ilustracion_profundidad_neumatico_seguridad.jpg',
  './assets/ilustracion_puente_bateria_fusibles.jpg',
  './assets/ilustracion_repuestos_oem_aftermarket.svg',
  './assets/ilustracion_semaforo_testigos.svg',
  './assets/ilustracion_turbo_ciclo_60segundos.svg',
  './assets/ilustracion_varilla_aceite.svg',
  './assets/infografia_bateria_fusibles_protocolo.jpg',
  './assets/infografia_bujias_comparativa_hd.jpg',
  './assets/infografia_despiece_motor_hd.jpg',
  './assets/infografia_deteccion_fugas_hd.jpg',
  './assets/infografia_fluidos_motor_hd.jpg',
  './assets/infografia_herramientas_esenciales_hd.jpg',
  './assets/infografia_inspeccion_360_auto.jpg',
  './assets/repuestos_calidad_espanol.jpg',
  './assets/spare_parts_quality_guide.jpg',
  './assets/tablero_testigos_espanol.jpg',
  './assets/taller_mecanico_espanol.jpg',
  './assets/tire_guide_and_dot_code.jpg',
  './assets/turbo_mantenimiento_espanol.jpg',
  './assets/vano_motor_real_espanol.jpg',
  './assets/workshop_smart_checklist.jpg',
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

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
          if (cache !== CACHE_NAME) {
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
    // Network-First for HTML navigation to ensure latest version is always loaded
    event.respondWith(
      fetch(event.request, { cache: 'no-cache' })
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

  // Cache-First with Network Fallback & Background Update for static assets
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
