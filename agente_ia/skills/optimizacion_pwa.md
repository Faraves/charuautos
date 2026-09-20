# Skill: Optimización Frontend y Desarrollo PWA

Esta habilidad guía al Agente IA en el mantenimiento y desarrollo de las Progressive Web Apps (PWA) de CharuAutos.

---

## 🎨 Paleta y Estética Dark Showroom

- **Fondo Base:** `#070a0f` (Negro Profundo Nocturno)
- **Superficie de Tarjetas:** `#0c121d` (Azul Noche Premium)
- **Bordes y Delimitadores:** `rgba(0, 242, 254, 0.15)`
- **Acento Primario (Tecnológico):** `#00f2fe` (Cyan Neón)
- **Acento Secundario (Cómic / Alertas):** `#ffb703` (Ámbar Dorado)
- **Texto Principal:** `#f8fafc` / Secundario: `#94a3b8`

---

## 🚀 Requisitos de Arquitectura PWA

1. **Cero Dependencias Pesadas:**
   - No utilizar frameworks de JS de 500KB (React/Vue) para lectores estáticos. Mantener Vanilla JS nativo para garantizar rendimiento de 60fps en celulares de gama de entrada.

2. **Estrategias de Service Worker:**
   - **Cache First (Assets estáticos e imágenes):** Servir imágenes WebP/JPG e íconos directamente de la caché para permitir lectura instantánea offline en túneles y autopistas.
   - **Network Falling Back to Cache (Navegación):** Comprobar si hay una versión más nueva en GitHub Pages y, si no hay red, entregar el archivo offline en caché.
   - **Versionado Limpio:** Incrementar la clave de versión de caché (`CACHE_NAME = 'charuautos-pwa-vX'`) en cada despliegue relevante para invalidar cachés viejas automáticamente.

3. **Interactividad Ligera:**
   - **Web Audio API:** Sintetizar sonidos de interfaz directamente mediante osciladores (`AudioContext`), evitando cargar archivos `.mp3` pesados por la red.
   - **LocalStorage:** Guardar el progreso de lectura, módulo activo y estado de checklists localmente para que el usuario retome donde lo dejó sin necesidad de base de datos ni inicio de sesión.
