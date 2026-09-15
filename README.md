# CharuAutos — Ecosistema Digital Automotriz
### Manual del Conductor Inteligente • Identidad de Marca • Plataforma Comercial
*Marca Oficial: CharuAutos (`@charuautopics`)*

---

## ⚡ Visión del Proyecto

**CharuAutos** es una plataforma y comunidad automotriz enfocada en democratizar el conocimiento mecánico, la cultura del motor y la toma de decisiones inteligentes para propietarios y entusiastas de vehículos en el mercado hispanohablante y latinoamericano.

Este repositorio contiene todos los activos editoriales, gráficos, interactivos y comerciales desarrollados para el proyecto.

> 📖 **Para una revisión técnica y estratégica profunda, consulta la [DOCUMENTACIÓN GENERAL MAESTRA](DOCUMENTACION_GENERAL.md).**

---

## 📱 Aplicación Web Progresiva (PWA) Oficial

Accede a la experiencia interactiva completa del **Manual del Conductor Inteligente** directamente desde cualquier dispositivo:

👉 **[Abrir CharuAutos PWA Online](https://faraves.github.io/charuautos/dist_pwa/)**  
*(URL directa: [https://faraves.github.io/charuautos/dist_pwa/](https://faraves.github.io/charuautos/dist_pwa/))*

### ✨ Características Principales de la Web App:
- 📲 **Instalable como App:** Totalmente compatible como PWA en Android (vía Chrome) e iOS (Safari > "Agregar a pantalla de inicio").
- ⚡ **Modo Offline Completo:** Mediante su Service Worker (`charuautos-pwa-v4`), todo el contenido, guías y tablas técnicas quedan almacenadas en el dispositivo para consulta en carretera sin internet ni cobertura telefónica.
- 🔍 **Buscador Dinámico:** Filtro en tiempo real para encontrar rápidamente diagnósticos, fallas, testigos y procedimientos.
- 📊 **Infografías Técnicas en Alta Resolución:** Ilustraciones 100% en español con vano motor real (aceite vs. fluido ATF), regla de 60 segundos para turbos, despiece de frenos y suspensión, código DOT de neumáticos y kit de cajuela.
- 🖨️ **Exportación Directa a PDF:** Incluye función de impresión adaptada con sangrado completo (*bleed*) sin elementos de navegación.

---

## 📁 Mapa del Proyecto

```text
CharuAutos/
├── index.html                                      # Redirección automática raíz hacia dist_pwa/
├── .nojekyll                                       # Configuración de despliegue para GitHub Pages
├── README.md                                       # Este archivo (Guía de inicio y accesos)
├── DOCUMENTACION_GENERAL.md                        # Documento maestro técnico y de negocio
├── CharuAutos_WebApp_PWA.zip                       # Archivo descargable comprimido con la PWA lista
│
├── dist_pwa/                                       # APLICACIÓN WEB PWA DESPLEGADA (PRODUCCIÓN)
│   ├── index.html                                  # Web App interactiva Dark Showroom
│   ├── manifest.json                               # Manifiesto para instalación en móviles
│   ├── service-worker.js                           # Service Worker v4 (offline y network-first)
│   └── assets/                                     # Infografías HD e iconografía oficial
│
├── branding/                                       # IDENTIDAD VISUAL Y DIRECTRICES DE MARCA
│   ├── BRANDBOOK.md                                # Brandbook Maestro Oficial (Estrategia, Sistema Dual y Activos)
│   ├── MANUAL_DE_MARCA.md                          # Manual de lineamientos en Markdown
│   ├── manual_identidad.html                       # Showroom web interactivo con probador y copiado HEX
│   └── assets/                                     # Vectores SVG nativos, PNGs HD y Favicons
│
├── ebook/                                          # PRODUCTO DIGITAL (EBOOK COMERCIAL)
│   ├── 00_introduccion_y_tablero.md                # Capítulos individuales en Markdown
│   ├── ...                                         # (Módulos 0 al 9 con datos oficiales auditados)
│   ├── ebook_completo.md                           # Manuscrito unificado en Markdown
│   ├── ebook_interactivo.html                      # Web App interactiva local
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # Documento PDF final listo para venta (33 págs)
│   └── assets/                                     # Infografías en español y vectores de marca
│
└── marketing/                                      # EMBUDO DE COMERCIALIZACIÓN
    ├── landing_page_copy.md                        # Copy persuasivo para Hotmart / Gumroad ($4.99 USD)
    └── prompts_diseno_y_portada.md                 # Prompts de IA para portadas, guiones de video y carruseles
```

---

## 🚀 Accesos Rápidos Principales

1. **📱 Web App PWA en Línea (Producción):**  
   Ingresa a [https://faraves.github.io/charuautos/dist_pwa/](https://faraves.github.io/charuautos/dist_pwa/) para utilizar la versión interactiva instalable en smartphones y ordenadores.
2. **Ebook en Versión Web Interactiva Local:**  
   Abre [ebook/ebook_interactivo.html](ebook/ebook_interactivo.html) o [dist_pwa/index.html](dist_pwa/index.html) en tu navegador para interactuar con la barra de progreso, buscador en tiempo real, widgets de telemetría y navegación por capítulos.
3. **Ebook en PDF de Alta Resolución (Listo para Venta):**  
   Descarga o visualiza directamente [ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf](ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf) (formato *Full Bleed* sin bordes blancos, 33 páginas).
4. **Manual de Identidad Visual Interactivo:**  
   Abre [branding/manual_identidad.html](branding/manual_identidad.html) para probar el logo sobre fondos *Dark/Light/Wireframe*, copiar los colores HEX oficiales con un clic o descargar los archivos SVG.
5. **Página de Ventas y Copywriting:**  
   Revisa [marketing/landing_page_copy.md](marketing/landing_page_copy.md) para configurar tu pasarela en Hotmart, Gumroad o Lemon Squeezy.

---

## 🛠️ Tecnologías y Estándares Utilizados

- **Diseño Gráfico & Marca:** Gráficos vectoriales nativos en SVG escalables a resolución infinita, paleta *Dark Showroom* (Obsidiana, Neón Cian, Carmesí, Ámbar).
- **Desarrollo Web Editorial & PWA:** HTML5 semántico, CSS3 moderno con variables dinámicas, `@media print` con sangrado completo (*bleed*), Service Worker con estrategia Network-First para navegación y Cache-First para estáticos, Web App Manifest (PWA).
- **Fuentes Técnicas y Estadísticas Verificadas:** SAE International (J300), API SP, ASTM D3306, NHTSA (DOT HS 811 617), Car Care Council, Garrett Motion, BorgWarner, ATRA y AAA.

---

© 2026 **CharuAutos** (`@charuautopics`). Todos los derechos reservados.

