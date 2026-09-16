# CharuAutos — Ecosistema Digital Automotriz
### Manual del Conductor Inteligente • Identidad de Marca • Plataforma Comercial
*Marca Oficial: CharuAutos (`@charuautopics`)*

---

## ⚡ Visión del Proyecto

**CharuAutos** es una plataforma y comunidad automotriz enfocada en democratizar el conocimiento mecánico, la cultura del motor y la toma de decisiones inteligentes para propietarios y entusiastas de vehículos en el mercado hispanohablante y latinoamericano.

Este repositorio contiene todos los activos editoriales, gráficos, interactivos y comerciales desarrollados para el proyecto.

> 📖 **Para una revisión técnica y estratégica profunda, consulta la [DOCUMENTACIÓN GENERAL MAESTRA](DOCUMENTACION_GENERAL.md).**

---

## 📱 Aplicaciones Web Progresivas (PWA) Oficiales

Accede a las aplicaciones interactivas completas directamente desde cualquier dispositivo:

### ⚡ 1. Versión 2.0 — Edición Conductor con Cero Conocimientos (14 Módulos Ilustrados)
👉 **[Abrir CharuAutos PWA V2 Online](https://faraves.github.io/charuautos/dist_pwa_v2/)**  
*(URL directa: [https://faraves.github.io/charuautos/dist_pwa_v2/](https://faraves.github.io/charuautos/dist_pwa_v2/))*  
- 📲 **Instalable como App PWA:** Compatible con Android, iOS y Escritorio.
- ⚡ **Modo Offline Autónomo:** Service Worker V2 con caché total de los 14 módulos, herramientas, infografías y diagramas para emergencias en ruta sin cobertura celular.
- 🌪️ **Nuevo Módulo de Turbocompresor:** Cuidados críticos, eje flotante a 200.000 RPM y la Regla de Oro de los 60 Segundos.
- 🎨 **11 Infografías Técnicas en Español:** Ilustraciones del vano motor, turbocompresor, cuadro de testigos, neumáticos y código DOT, filtros de cabina, frenos y repuestos de calidad.
- 🧰 **Herramientas Interactivas Exclusivas V2:** Detector interactivo de fugas por color de charco, consultor rápido de códigos OBD-II (Check Engine) y checklists con guardado automático en LocalStorage.
- 📂 **Paquete Descargable:** Incluye [`CharuAutos_V2_WebApp_PWA.zip`](CharuAutos_V2_WebApp_PWA.zip) listo para desplegar o distribuir.

### 🚗 2. Versión 1 — Edición Original (Clásica)
👉 **[Abrir CharuAutos PWA V1 Online](https://faraves.github.io/charuautos/dist_pwa/)**  
*(URL directa: [https://faraves.github.io/charuautos/dist_pwa/](https://faraves.github.io/charuautos/dist_pwa/))*  
- La versión original completa con 10 módulos, infografías en vano motor real y PWA v4.

---

## 📁 Mapa del Proyecto

```text
CharuAutos/
├── index.html                                      # Redirección automática raíz hacia dist_pwa/
├── .nojekyll                                       # Configuración de despliegue para GitHub Pages
├── README.md                                       # Este archivo (Guía de inicio y accesos)
├── DOCUMENTACION_GENERAL.md                        # Documento maestro técnico y de negocio
├── CharuAutos_WebApp_PWA.zip                       # Archivo descargable comprimido con PWA V1 lista
├── CharuAutos_V2_WebApp_PWA.zip                    # Archivo descargable comprimido con PWA V2 lista
│
├── dist_pwa/                                       # APLICACIÓN WEB PWA V1 (PRODUCCIÓN CLÁSICA)
│   ├── index.html                                  # Web App interactiva Dark Showroom V1
│   ├── manifest.json                               # Manifiesto PWA V1
│   ├── service-worker.js                           # Service Worker v4 (offline y network-first)
│   └── assets/                                     # Infografías HD e iconografía oficial
│
├── dist_pwa_v2/                                    # APLICACIÓN WEB PWA V2 INDEPENDIENTE (PRODUCCIÓN V2)
│   ├── index.html                                  # Web App interactiva V2 totalmente responsiva con drawer móvil
│   ├── manifest.json                               # Manifiesto PWA V2 (Edición Cero Conocimientos)
│   ├── service-worker.js                           # Service Worker V2 para consulta offline en ruta
│   ├── ebook_v2_completo.md                        # Manuscrito unificado descargable (14 módulos)
│   └── assets/                                     # Favicons, logo horizontal y 28 activos gráficos
│
├── branding/                                       # IDENTIDAD VISUAL Y DIRECTRICES DE MARCA
│   ├── BRANDBOOK.md                                # Brandbook Maestro Oficial (Estrategia, Sistema Dual y Activos)
│   ├── MANUAL_DE_MARCA.md                          # Manual de lineamientos en Markdown
│   ├── manual_identidad.html                       # Showroom web interactivo con probador y copiado HEX
│   └── assets/                                     # Vectores SVG nativos, PNGs HD y Favicons
│
├── ebook/                                          # PRODUCTO DIGITAL V1 (EBOOK ORIGINAL)
│   ├── 00_introduccion_y_tablero.md                # Capítulos individuales en Markdown
│   ├── ...                                         # (Módulos 0 al 9 con datos oficiales auditados)
│   ├── ebook_completo.md                           # Manuscrito unificado en Markdown
│   ├── ebook_interactivo.html                      # Web App interactiva local
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # Documento PDF final listo para venta (33 págs)
│   └── assets/                                     # Infografías en español y vectores de marca
│
├── ebook_v2/                                       # PRODUCTO DIGITAL V2 (EDICIÓN CERO CONOCIMIENTOS)
│   ├── 01_introduccion_seguridad_legal.md          # 14 Módulos modulares en Markdown
│   ├── ...                                         # (Módulos 01 al 14 completos con infografías y Turbo)
│   ├── ebook_v2_completo.md                        # Manuscrito unificado V2.0 (>1.200 líneas)
│   ├── ebook_v2_interactivo.html                   # Web Showroom V2 interactivo responsivo
│   ├── index.html                                  # Entrada web local idéntica para V2
│   ├── README.md                                   # Documentación y guía de exportación PDF de la V2
│   └── assets/                                     # Favicons, logo horizontal y 28 activos gráficos
│
└── marketing/                                      # EMBUDO DE COMERCIALIZACIÓN
    ├── landing_page_copy.md                        # Copy persuasivo para Hotmart / Gumroad ($4.99 USD)
    └── prompts_diseno_y_portada.md                 # Prompts de IA para portadas, guiones de video y carruseles
```

---

## 🚀 Accesos Rápidos Principales

1. **⚡ Web App PWA Versión 2.0 Online:**  
   Ingresa a [https://faraves.github.io/charuautos/dist_pwa_v2/](https://faraves.github.io/charuautos/dist_pwa_v2/) para usar la aplicación independiente de la V2 con menú para móviles, detector de fugas y checklists.
2. **📱 Web App PWA Versión 1 Online:**  
   Ingresa a [https://faraves.github.io/charuautos/dist_pwa/](https://faraves.github.io/charuautos/dist_pwa/) para consultar la edición clásica original.
3. **⚡ Ebook V2 en Manuscrito Unificado:**  
   Descarga o visualiza [ebook_v2/ebook_v2_completo.md](ebook_v2/ebook_v2_completo.md) con más de 1.000 líneas y tabla de navegación lista para ePub/Kindle.
4. **Ebook V1 en PDF de Alta Resolución (Listo para Venta):**  
   Descarga o visualiza directamente [ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf](ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf) (formato *Full Bleed* sin bordes blancos, 33 páginas).
5. **Manual de Identidad Visual Interactivo:**  
   Abre [branding/manual_identidad.html](branding/manual_identidad.html) para probar el logo sobre fondos *Dark/Light/Wireframe*, copiar los colores HEX oficiales con un clic o descargar los archivos SVG.
6. **Página de Ventas y Copywriting:**  
   Revisa [marketing/landing_page_copy.md](marketing/landing_page_copy.md) para configurar tu pasarela en Hotmart, Gumroad o Lemon Squeezy.

---

## 🛠️ Tecnologías y Estándares Utilizados

- **Diseño Gráfico & Marca:** Gráficos vectoriales nativos en SVG escalables a resolución infinita, paleta *Dark Showroom* (Obsidiana, Neón Cian, Carmesí, Ámbar).
- **Desarrollo Web Editorial & PWA:** HTML5 semántico, CSS3 moderno con variables dinámicas, `@media print` con sangrado completo (*bleed*), Service Worker con estrategia Network-First para navegación y Cache-First para estáticos, Web App Manifest (PWA).
- **Fuentes Técnicas y Estadísticas Verificadas:** SAE International (J300), API SP, ASTM D3306, NHTSA (DOT HS 811 617), Car Care Council, Garrett Motion, BorgWarner, ATRA y AAA.

---

© 2026 **CharuAutos** (`@charuautopics`). Todos los derechos reservados.

