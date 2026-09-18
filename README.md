# CharuAutos — Ecosistema Digital Automotriz
### Manual del Conductor Inteligente • Edición Ilustrada V2.0 • Identidad de Marca • Plataforma PWA
*Marca Oficial: CharuAutos (`@charuautopics`) • "Pasión Automotriz al Alcance de tus Manos"*

---

## ⚡ 1. Acceso Directo y Despliegue en Vivo

El proyecto cuenta con despliegue continuo en **GitHub Pages** con acceso directo a ambas ediciones de lectura:

- 🎨 **Lector Web Interactivo de la Historieta (Cómic PWA Oficial):**  
  👉 **[https://faraves.github.io/charuautos/dist_pwa_historieta/](https://faraves.github.io/charuautos/dist_pwa_historieta/)**  
  *(o mediante el atajo directo: [https://faraves.github.io/charuautos/?historieta](https://faraves.github.io/charuautos/?historieta))*

- 🚀 **Manual Técnico Ilustrado (Ebook V2 Técnico):**  
  👉 **[https://faraves.github.io/charuautos/dist_pwa_v2/](https://faraves.github.io/charuautos/dist_pwa_v2/)** *(o [https://faraves.github.io/charuautos/](https://faraves.github.io/charuautos/))*

- 🚗 **URL Directa PWA Versión 1.0 (Clásica):**  
  👉 **[https://faraves.github.io/charuautos/dist_pwa/](https://faraves.github.io/charuautos/dist_pwa/)**

> 📖 **Para una auditoría técnica profunda de estándares, fuentes SAE/ISO y arquitectura de software, consulta la [DOCUMENTACIÓN GENERAL MAESTRA](DOCUMENTACION_GENERAL.md).**

---

## 🌟 2. Visión del Proyecto y Dualidad de Versiones

**CharuAutos** es una plataforma editorial y educativa concebida para cerrar la brecha de asimetría de información entre los talleres mecánicos y los propietarios de vehículos en Latinoamérica y el mundo hispanohablante.

El repositorio conserva dos productos editoriales completos e independientes:

### 🎨 Versión Historieta Ilustrada — Las Aventuras de Charu (Cómic PWA)
Una adaptación en **novela gráfica y libro de historietas educativas** basada en el Ebook V2:
- **14 Episodios con Storytelling y Actuación:** Protagonizada por **Charu** (el perro piloto y mentor automotriz), **Carmen** (la joven conductora principiante que aprende a dominar su auto y defender su bolsillo), **Don Carlos** (el maestro honesto de taller) y **Don Chanchullo** (el gato esmoquin mecánico tramposo con gafas agrietadas y manómetro manipulado de 'El Tornillo Loco').
- **15 Escenas de Cómic en Alta Resolución (16:9 HD):** Ilustraciones panorámicas de estilo novela gráfica con personajes en acción física, rostros expresivos, esquemas mecánicos integrados y acotaciones escénicas con insignias emocionales (`😱 ¡Pánico!`, `💡 ¡Momento Eureka!`, `🛑 ¡Alerta!`, `🛡️ ¡Escudo Activado!`).
- **Lector Web Interactivo Dual ("Comic Reader"):** Soporte para lectura en tira vertical continua (*webtoon*) ideal para celulares y modo diapositiva horizontal viñeta a viñeta para computadoras (con atajos de teclado `←` / `→` y gestos *swipe* táctiles), efectos de sonido sintetizados con Web Audio API, botón de exportación/impresión a PDF de colección (`@media print`) y funcionamiento offline total (PWA).
- **Paquete Desplegable:** [`CharuAutos_Historieta_WebApp_PWA.zip`](CharuAutos_Historieta_WebApp_PWA.zip).

### 🏆 Versión 2.0 — Edición Conductor con Cero Conocimientos (Producto Insignia)
Desarrollada para quienes manejan a diario pero no tienen formación técnica previa:
- **14 Módulos Prácticos:** Desde las reglas de oro de seguridad y el funcionamiento del auto sin jerga, hasta protocolos de emergencia en carretera y el escudo anti-estafas del taller.
- **16 Ilustraciones e Infografías HD Técnicas:** Vano motor real, turbocompresor con la Regla de los 60 Segundos, inspección 360°, varilla de nivel, cambio de llanta en 8 pasos, selector de fusibles, desmontaje de filtro antipolen y la nueva ilustración de mentalidad preventiva y conducción feliz.
- **Herramientas Interactivas en Vivo:**
  - 💧 *Detector interactivo de fugas por color de mancha o charco* (aceite, refrigerante, líquido de frenos, ATF).
  - 🔌 *Buscador de códigos de diagnóstico OBD-II (Check Engine)* con explicación en lenguaje accesible.
  - ✅ *Checklists interactivos con persistencia en LocalStorage* (los datos se conservan al cerrar o recargar).
  - 📱 *Drawer táctil para navegación móvil* con barra de progreso reactiva.
  - 📶 *PWA Offline Autónoma:* Service Worker v10 para consulta total sin conexión en autopistas o zonas remotas.
- **Paquete Desplegable:** [`CharuAutos_V2_WebApp_PWA.zip`](CharuAutos_V2_WebApp_PWA.zip) listo para subir a cualquier hosting estático.

### 🚗 Versión 1.0 — Edición Clásica Original
- 10 módulos técnicos originales con datos auditados SAE J300, ASTM D3306 y ATRA.
- Manuscrito consolidado y documento comercial final listo para venta en formato PDF Full Bleed de 33 páginas: [`ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf`](ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf).
- PWA original en [`dist_pwa/`](dist_pwa/) y paquete [`CharuAutos_WebApp_PWA.zip`](CharuAutos_WebApp_PWA.zip).

---

## 📁 3. Mapa del Repositorio Organizado

```text
CharuAutos/
├── index.html                                      # Redirección directa e instantánea a dist_pwa_v2/
├── .nojekyll                                       # Habilita soporte estático puro en GitHub Pages
├── .gitignore                                      # Exclusión de archivos de desarrollo y temporales
├── README.md                                       # Este archivo (Guía de inicio, accesos y mapa)
├── DOCUMENTACION_GENERAL.md                        # Documentación maestra técnica, de arquitectura y negocio
├── CharuAutos_Historieta_WebApp_PWA.zip           # Paquete PWA de la Historieta Ilustrada lista
├── CharuAutos_V2_WebApp_PWA.zip                    # Paquete PWA V2 técnico listo para distribución
├── CharuAutos_WebApp_PWA.zip                       # Paquete PWA V1 clásico
├── favicon.ico                                     # Icono global de pestaña
│
├── dist_pwa_historieta/                            # APLICACIÓN WEB PWA HISTORIETA (PRODUCCIÓN CÓMIC)
│   ├── index.html                                  # Lector web de cómic interactivo con efectos sonoros
│   ├── manifest.json                               # Manifiesto PWA de la historieta
│   ├── service-worker.js                           # Service Worker offline del cómic
│   ├── ebook_historieta_completo.md                # Guion maestro consolidado
│   └── assets/                                     # 31 activos gráficos (portada, 14 viñetas HD, avatares)
│
├── ebook_historieta/                               # CÓDIGO FUENTE DE LA HISTORIETA ILUSTRADA
│   ├── 00_portada_y_personajes.md                  # Prólogo y elenco de personajes
│   ├── ...                                         # 14 episodios modulares en Markdown
│   ├── ebook_historieta_completo.md                # Guion maestro unificado
│   ├── historieta_interactiva.html                 # Lector web de cómic local
│   ├── index.html                                  # Entrada local
│   ├── README.md                                   # Documentación interna del cómic
│   └── assets/                                     # Ilustraciones maestras del cómic
│
├── dist_pwa_v2/                                    # APLICACIÓN WEB PWA V2 (PRODUCCIÓN EN VIVO)
│   ├── index.html                                  # Web App interactiva Dark Showroom con drawer táctil
│   ├── manifest.json                               # Manifiesto PWA V2 (instalable en Android/iOS/PC)
│   ├── service-worker.js                           # Service Worker v10 con caché offline resiliente
│   ├── ebook_v2_completo.md                        # Manuscrito unificado descargable (14 módulos)
│   ├── favicon.ico                                 # Icono de pestaña
│   └── assets/                                     # 61 activos gráficos (ilustraciones HD, SVGs, iconos)
│
├── ebook_v2/                                       # CÓDIGO FUENTE EDITORIAL V2
│   ├── 01_introduccion_seguridad_legal.md          # Módulo 01 en Markdown
│   ├── ...                                         # Módulos 02 al 13 modulares
│   ├── 14_apendices_checklists_y_bitacora.md       # Módulo 14 (Checklists, glosario y bitácora)
│   ├── ebook_v2_completo.md                        # Manuscrito completo unificado
│   ├── ebook_v2_interactivo.html                   # Web Showroom V2 local
│   ├── index.html                                  # Punto de entrada local idéntico
│   ├── manifest.json                               # Manifiesto PWA V2
│   ├── service-worker.js                           # Service Worker local
│   ├── README.md                                   # Guía de módulos y exportación PDF V2
│   └── assets/                                     # Activos maestros originales de la V2
│
├── dist_pwa/                                       # APLICACIÓN WEB PWA V1 (PRODUCCIÓN CLÁSICA)
│   ├── index.html                                  # Web App interactiva V1
│   ├── manifest.json                               # Manifiesto PWA V1
│   ├── service-worker.js                           # Service Worker V1 (v4)
│   └── assets/                                     # Infografías HD y marca V1
│
├── ebook/                                          # CÓDIGO FUENTE EDITORIAL V1
│   ├── 00_introduccion_y_tablero.md                # Módulos 0 a 9 en Markdown
│   ├── ...                                         # Capítulos individuales clásicos
│   ├── ebook_completo.md                           # Manuscrito unificado V1
│   ├── ebook_interactivo.html                      # Web App interactiva clásica
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # PDF comercial Full Bleed (33 páginas)
│   └── assets/                                     # Gráficos e infografías V1
│
├── branding/                                       # IDENTIDAD VISUAL CORPORATIVA
│   ├── BRANDBOOK.md                                # Brandbook Maestro Oficial
│   ├── MANUAL_DE_MARCA.md                          # Manual de lineamientos en Markdown
│   ├── manual_identidad.html                       # Showroom web interactivo con probador y copiado HEX
│   └── assets/                                     # Vectores SVG nativos, PNGs y avatares
│
├── marketing/                                      # ESTRATEGIA COMERCIAL Y CONVERSIÓN
│   ├── landing_page_copy.md                        # Copywriting persuasivo para pasarelas de venta
│   └── prompts_diseno_y_portada.md                 # Prompts de IA, guiones de video y carruseles
│
└── Ajustes/                                        # BANCO DE REFERENCIAS FOTOGRÁFICAS
    ├── README.md                                   # Índice y correspondencia de fotos de referencia
    └── *.jpg                                       # Fotografías base de varillas, turbo, frenos, cauchos
```

---

## 📚 4. Estructura de Módulos de la Versión 2.0

| # | Módulo | Foco Pedagógico Práctico | Ilustración Principal |
| :-: | :--- | :--- | :--- |
| **01** | **Introducción, Seguridad y Marco Legal** | 5 reglas de oro de seguridad física y equipo de protección (EPP). | Emblema oficial de **Charu** |
| **02** | **Cómo Funciona un Auto sin Jerga** | El ciclo de 4 tiempos y la anatomía del motor explicada de forma intuitiva. | `vano_motor_real_espanol.jpg`<br>`ilustracion_cuerpo_humano_auto.svg` |
| **03** | **Herramientas Básicas y Kit de Emergencia** | Elementos obligatorios para la cajuela y herramientas caseras útiles. | `car_emergency_kit.jpg`<br>`ilustracion_herramientas_esenciales.svg` |
| **04** | **Rutinas de Inspección Preventiva** | Hábitos de revisión diaria (30s), semanal (3m) y mensual (15m). | `infografia_inspeccion_360_auto.jpg`<br>`ilustracion_inspeccion_360.svg` |
| **05** | **Fluidos Vitales: Guía Paso a Paso** | Lectura de varilla de aceite, refrigerante OAT, líquido de frenos y detector de fugas. | `ilustracion_varilla_aceite.svg`<br>`ilustracion_guia_colores_fluidos.svg` |
| **06** | **Neumáticos, Frenos y Seguridad** | Desgaste con la prueba de la moneda, código DOT, presión en pilar B y frenos. | `tire_guide_and_dot_code.jpg`<br>`frenos_suspension_espanol.jpg` |
| **07** | **Batería, Fusibles y Sistema Eléctrico** | Conexión segura de cables pasa corriente (rojo/negro) e inspección de fusibles. | `ilustracion_paso_corriente_bateria.svg`<br>`ilustracion_fusible_bueno_quemado.svg` |
| **08** | **Filtros, Bujías, Correas y Escobillas** | Cambio del filtro antipolen de cabina en 5 min y diagnóstico de bujías. | `cabin_filter_replacement.jpg`<br>`ilustracion_correa_accesorios_vs_distribucion.svg` |
| **09** | **El Turbocompresor: Cuidados Críticos** | Eje a 200.000 RPM, lubricación crítica y la Regla de los 60 Segundos. | `turbo_mantenimiento_espanol.jpg`<br>`ilustracion_turbo_ciclo_60segundos.svg` |
| **10** | **Testigos del Tablero y Escáner OBD-II** | Semáforo ISO de advertencias, conector de 16 pines y códigos de falla frecuentes. | `dashboard_warning_lights.jpg`<br>`ilustracion_conector_obd2.svg` |
| **11** | **Mantenimiento por Kilometraje y Costos** | Plan integral de servicios desde los 10.000 hasta los 100.000 kilómetros. | `ilustracion_cronograma_kilometraje.jpg` |
| **12** | **Emergencias en Ruta y Cambio de Llanta** | Secuencia de 8 pasos seguros para cambiar una llanta ponchada y protocolo PAS. | `ilustracion_cambio_llanta_secuencia.jpg`<br>`ilustracion_cambio_llanta_pasos.svg` |
| **13** | **Guía para ir al Taller sin Ser Estafado** | Protocolo de 5 pasos para blindarte, tipos de repuestos y presupuesto previo. | `taller_mecanico_espanol.jpg`<br>`repuestos_calidad_espanol.jpg` |
| **14** | **Apéndices, Checklists y Bitácora** | Mentalidad preventiva del conductor feliz, bitácora de guantera y glosario. | `workshop_smart_checklist.jpg`<br>`ilustracion_bitacora_mantenimiento.svg` |

---

## 🛠️ 5. Tecnologías y Estándares de Desarrollo

- **Frontend & Editorial:** HTML5 semántico, CSS3 con variables nativas de diseño, Flexbox/Grid responsivo, drawer táctil móvil, barras de lectura dinámicas.
- **Gráficos & Arte Digital:** SVG vectorial puro para diagramas e infografías JPG de alta resolución (1376x768 / 1920x1080) calibradas bajo la paleta institucional *Dark Showroom* (Obsidiana `#070a0f`, Neón Cian `#00f2fe`, Carmesí `#ff2a5f`, Ámbar `#ffb703`).
- **Arquitectura PWA (Offline-First):** Service Worker moderno con estrategia mixta (Network-First para navegación HTML y Cache-First con actualización de fondo para recursos estáticos), Web App Manifest W3C para instalación nativa en Android, iOS y escritorio.
- **Persistencia de Usuario:** LocalStorage para almacenamiento seguro en cliente de los estados de checklist y tareas de mantenimiento.
- **Bases Técnicas Auditadas:** SAE International (J300), API SP, ASTM D3306, NHTSA (DOT HS 811 617), Car Care Council, Garrett Motion, BorgWarner y AAA.

---

## 🚀 6. Instalación y Uso Local

Para consultar o editar localmente la plataforma:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Faraves/charuautos.git
   cd charuautos
   ```
2. Ejecuta un servidor local ligero:
   ```bash
   python -m http.server 8080
   ```
3. Abre en tu navegador:
   - Versión 2.0 (Insignia): `http://localhost:8080/dist_pwa_v2/` (o directamente `http://localhost:8080/`)
   - Versión 1.0 (Clásica): `http://localhost:8080/dist_pwa/`
   - Manual de Marca Interactivo: `http://localhost:8080/branding/manual_identidad.html`

---

© 2026 **CharuAutos** (`@charuautopics`). Todos los derechos reservados.  
`🐾 PASIÓN AUTOMOTRIZ AL ALCANCE DE TUS MANOS`
