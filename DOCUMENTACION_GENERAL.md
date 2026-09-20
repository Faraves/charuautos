# DOCUMENTACIÓN INTEGRAL DEL PROYECTO: CHARUAUTOS
## Ecosistema Editorial, Identidad de Marca & Plataforma Automotriz PWA
*Edición Oficial 2026 — Compilado Maestro*  
*Autor / Marca: CharuAutos (`@charuautopics`) • "Pasión Automotriz al Alcance de tus Manos"*

---

## 1. Resumen Ejecutivo y Visión Estratégica

**CharuAutos** es una iniciativa automotriz integral diseñada para empoderar al propietario de vehículos en el mercado hispanohablante (con foco en Latinoamérica: México, Venezuela, Colombia, Chile, Argentina, entre otros). El proyecto aborda la histórica asimetría de información, el lenguaje excesivamente técnico y la desconfianza generalizada existente entre conductores y talleres mecánicos, combinando **educación técnica rigurosa**, **diseño visual de alta gama (*Dark Showroom*)** y **herramientas digitales interactivas offline**.

### 1.1. Pilares Fundamentales del Proyecto
1. **Dualidad Editorial (Versión 1.0 y Versión 2.0):**
   - **Versión 2.0 (Producto Insignia):** *"Manual Práctico del Conductor Inteligente: Edición Cero Conocimientos"*, estructurado en 14 módulos ilustrados con 16 infografías HD en español, herramientas interactivas y lenguaje 100% pedagógico sin jerga técnica.
   - **Versión 1.0 (Edición Clásica):** Documento técnico original de 10 módulos con datos auditados de la industria automotriz y formato PDF comercial *Full Bleed* de 33 páginas listo para su venta.
2. **Identidad Visual Corporativa:** Marca registrada *CharuAutos* y handle `@charuautopics`, compuesta por un sistema dual de logotipos vectoriales, avatar de tacómetro de altas RPM, la mascota institucional **Charu** y un manual de identidad web interactivo.
3. **Plataforma Web PWA (Progressive Web App):** Aplicaciones web estáticas de alto rendimiento (`dist_pwa_v2/` y `dist_pwa/`) con drawer táctil móvil, buscador de contenido en tiempo real, widgets diagnósticos interactivos y Service Worker offline resiliente para emergencias en carretera sin cobertura celular.
4. **Infraestructura Comercial y Embudo de Ventas:** Copywriting persuasivo para landing pages, carruseles educativos para redes sociales y prompts de generación para herramientas de Inteligencia Artificial.

---

## 2. Mapa Integral de la Arquitectura del Repositorio

El repositorio mantiene una organización modular estricta, separando el código fuente de los artefactos de distribución listos para producción:

```text
CharuAutos/
├── index.html                                      # Redirección inmediata y directa a la Versión 2.0 (dist_pwa_v2/)
├── .nojekyll                                       # Habilitador de archivos estáticos puros para GitHub Pages
├── .gitignore                                      # Exclusiones de temporales de Python y del sistema operativo
├── README.md                                       # Guía general de inicio, accesos rápidos y tabla de módulos
├── DOCUMENTACION_GENERAL.md                        # Documento maestro técnico y estratégico (este archivo)
├── CharuAutos_Historieta_WebApp_PWA.zip           # Paquete PWA de la Historieta Ilustrada lista para distribución
├── CharuAutos_V2_WebApp_PWA.zip                    # Paquete ZIP comprimido con la PWA V2 lista para desplegar
├── CharuAutos_WebApp_PWA.zip                       # Paquete ZIP comprimido con la PWA V1 clásica
├── favicon.ico                                     # Favicon corporativo raíz
│
├── dist_pwa_historieta/                            # APLICACIÓN WEB PWA HISTORIETA EN PRODUCCIÓN (CÓMIC V3)
│   ├── index.html                                  # Lector web de cómic interactivo con efectos sonoros y modo dual
│   ├── manifest.json                               # Manifiesto PWA de la historieta
│   ├── service-worker.js                           # Service Worker v3 offline del cómic
│   ├── ebook_historieta_completo.md                # Guion maestro consolidado (14 episodios + prólogo)
│   └── assets/                                     # 31 activos gráficos (portada, 14 viñetas HD, avatares, infografía)
│
├── ebook_historieta/                               # CÓDIGO FUENTE EDITORIAL DE LA HISTORIETA ILUSTRADA
│   ├── 00_portada_y_personajes.md                  # Prólogo y elenco de personajes
│   ├── ...                                         # 14 episodios modulares en Markdown
│   ├── ebook_historieta_completo.md                # Guion maestro unificado
│   ├── historieta_interactiva.html                 # Lector web de cómic local
│   ├── index.html                                  # Entrada local sincronizada
│   ├── README.md                                   # Documentación interna del cómic
│   └── assets/                                     # Ilustraciones maestras y avatares del cómic
│
├── dist_pwa_v2/                                    # APLICACIÓN WEB PWA V2 EN PRODUCCIÓN (PRODUCTO INSIGNIA)
│   ├── index.html                                  # Web App interactiva responsiva con drawer móvil y buscador
│   ├── manifest.json                               # Manifiesto W3C PWA instalable en Android, iOS y Escritorio
│   ├── service-worker.js                           # Service Worker v10 con estrategia offline resiliente
│   ├── ebook_v2_completo.md                        # Manuscrito unificado descargable (14 módulos)
│   ├── favicon.ico                                 # Icono de pestaña
│   └── assets/                                     # 61 archivos (16 infografías HD, vectores SVG, favicons)
│
├── ebook_v2/                                       # CÓDIGO FUENTE EDITORIAL DE LA VERSIÓN 2.0
│   ├── 01_introduccion_seguridad_legal.md          # 14 módulos modulares en formato Markdown
│   ├── ...                                         # (Módulos 02 al 13 completos)
│   ├── 14_apendices_checklists_y_bitacora.md       # Módulo 14 con bitácora imprimible y glosario A-Z
│   ├── ebook_v2_completo.md                        # Manuscrito unificado consolidado (>1.000 líneas)
│   ├── ebook_v2_interactivo.html                   # Web App de desarrollo local
│   ├── index.html                                  # Punto de entrada local
│   ├── manifest.json                               # Manifiesto PWA local sincronizado
│   ├── service-worker.js                           # Service Worker local sincronizado
│   ├── README.md                                   # Documentación interna de la V2 y guía de impresión PDF
│   └── assets/                                     # Activos maestros de diseño de la V2
│
├── dist_pwa/                                       # APLICACIÓN WEB PWA V1 CLÁSICA EN PRODUCCIÓN
│   ├── index.html                                  # Web App interactiva Dark Showroom V1
│   ├── manifest.json                               # Manifiesto PWA V1
│   ├── service-worker.js                           # Service Worker V1 (v4)
│   └── assets/                                     # Infografías HD e iconografía original
│
├── ebook/                                          # CÓDIGO FUENTE EDITORIAL DE LA VERSIÓN 1.0
│   ├── 00_introduccion_y_tablero.md                # 10 módulos en formato Markdown
│   ├── ...                                         # Capítulos individuales clásicos
│   ├── ebook_completo.md                           # Manuscrito unificado V1
│   ├── ebook_interactivo.html                      # Web App interactiva clásica local
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # Documento comercial final listo para venta (33 págs)
│   └── assets/                                     # Gráficos y vectores originales V1
│
├── branding/                                       # IDENTIDAD VISUAL Y DIRECTRICES DE MARCA
│   ├── BRANDBOOK.md                                # Brandbook Maestro Oficial
│   ├── MANUAL_DE_MARCA.md                          # Manual de lineamientos en Markdown
│   ├── manual_identidad.html                       # Showroom web interactivo con probador y copiado HEX
│   └── assets/                                     # Activos vectoriales nativos (SVG) y avatares de redes
│
├── marketing/                                      # ESTRATEGIA COMERCIAL Y CONVERSIÓN
│   ├── landing_page_copy.md                        # Copywriting persuasivo para Hotmart / Gumroad ($4.99 USD)
│   └── prompts_diseno_y_portada.md                 # Prompts de IA para portadas, guiones de video y carruseles
│
└── Ajustes/                                        # BANCO DE REFERENCIAS FOTOGRÁFICAS
    ├── README.md                                   # Documentación y correspondencia de las fotos base
    └── *.jpg                                       # Fotografías originales de varillas, turbo, frenos y cauchos
```

---

## 3. Identidad de Marca: CharuAutos (`@charuautopics`)

Inspirada en el lenguaje de diseño automotriz contemporáneo (líneas angulares y aerodinámicas de alta tecnología), la identidad visual proyecta tecnología, precisión de telemetría y fiabilidad.

### 3.1. Arquitectura de Logotipos y Símbolos
1. **Isotipo Monograma CA (`charuautos_logo_icon.svg`):**
   - Escudo hexagonal biselado inspirado en una toma de aire de competición.
   - La letra **C** (titanio espacial) entrelazada con la **A** (neón cian reflectivo), cruzada por una aleta deflectora en rojo de competición (*Racing Crimson*).
2. **Imagotipo Horizontal Principal (`charuautos_logo_horizontal.svg`):**
   - Diseñado para cabeceras y portadas: *CHARU* (titanio) + *AUTOS* (neón cian con resplandor difuso).
   - Lema secundario: *"DOMINIO MECÁNICO & CULTURA AUTOMOTRIZ"*.
   - Cápsula tecnológica inferior: `@CHARUAUTOPICS • COMUNIDAD & ASESORÍA AUTOMOTRIZ`.
3. **Avatar Circular para Redes Sociales (`charuautos_avatar_instagram.svg`):**
   - Anillo exterior con escala graduada de tacómetro a altas RPM (*Redline*), textura de fibra de carbono radial y monograma central para Instagram, TikTok y WhatsApp.
4. **Emblema de la Mascota Oficial (`charuautos_emblema_mascota.png` / `.jpg`):**
   - Representación heráldica de **Charu**, la mascota canina piloto de carreras con casco y gafas aerodinámicas, simbolizando lealtad, entusiasmo y accesibilidad.
5. **Marca de Agua Oficial (`charuautos_watermark.svg`):**
   - Vector translúcido al 75% de opacidad para superposición en material audiovisual y cabeceras de documentos.

### 3.2. Sistema Cromático (*Dark Showroom*)
- **Obsidian Black (`#070a0f` / `#080b11`):** Fondo de absorción lumínica profunda que genera la atmósfera de un salón de exhibición privado.
- **Hyper Neon Cyan (`#00f2fe` / `#00f0ff`):** Acento primario que simboliza tecnología, diagnóstico digital y energía eléctrica.
- **Electric Deep Blue (`#0066ff` / `#0088ff`):** Gradientes de profundidad y sombras de contraste.
- **Racing Crimson (`#ff2a5f` / `#ff1e56`):** Rendimiento, temperatura crítica y alertas de seguridad.
- **Telemetry Amber (`#ffb300` / `#f59e0b`):** Testigos de advertencia en tablero y certificaciones.
- **Brushed Titanium (`#94a3b8` / `#e2e8f0`):** Tipografía secundaria, líneas de retícula y detalles metálicos.
- **Pure White (`#ffffff` / `#f8fafc`):** Máxima legibilidad en titulares y textos clave.

---

## 4. Versión 2.0: Manual del Conductor con Cero Conocimientos (Producto Insignia)

La **Versión 2.0** constituye el eje central del ecosistema actual. Fue concebida como una guía integral para personas que conducen a diario pero carecen de formación mecánica, con un enfoque 100% pedagógico, analogías claras y cero tecnicismos innecesarios.

### 4.1. Desglose Pedagógico de los 14 Módulos

| Módulo | Título | Contenido Pedagógico & Procedimientos Clave | Fuentes / Estándares |
| :---: | :--- | :--- | :--- |
| **01** | **Introducción, Seguridad Primero & Advertencia Legal** | Las 5 reglas de oro de seguridad física; prohibición de abrir radiador caliente; uso obligatorio de soportes con el gato; equipo de protección personal (EPP) básico. | Criterios de Seguridad ASE & Protocolos de Taller |
| **02** | **Cómo Funciona un Auto (Explicado sin Jerga)** | Analogía del cuerpo humano (motor = corazón, aceite = sangre, combustible = comida, escape = respiración); ciclo de 4 tiempos (Admisión, Compresión, Explosión, Escape); componentes del vano motor. | Principios de Termodinámica Básica Automotriz |
| **03** | **Herramientas Básicas y Kit de Emergencia** | Herramientas caseras que salvan el día; equipamiento obligatorio de cajuela (triángulos reflectantes, chaleco de alta visibilidad, compresor portátil, linterna, kit de mechas). | Normativa Vial Latinoamericana e Internacional |
| **04** | **Rutinas de Inspección Preventiva** | Rutina de inspección 360° en 3 tiempos: Diaria (caminar alrededor, 30 segundos), Semanal (fluidos y presión, 3 minutos) y Mensual (revisión a fondo, 15 minutos). | Protocolos de Mantenimiento Preventivo Flotas |
| **05** | **Fluidos Vitales: La Sangre y el Sudor de tu Vehículo** | Medición exacta con varilla de aceite (frío/caliente, marcas MIN/MAX); consecuencias del sobrellenado; refrigerante orgánico (OAT) vs agua de grifo; líquido de frenos higroscópico; ATF. | SAE J300, API SP, ASTM D3306, DOT 3/4 |
| **06** | **Neumáticos, Frenos y Seguridad Activa** | Desgaste con la prueba de la moneda; descifrado del código DOT (semana y año de fabricación); presión según etiqueta del pilar B de la puerta; inspección visual de pastillas y discos de freno. | NHTSA (DOT HS 811 617) & Brembo Technical Manuals |
| **07** | **Batería, Sistema Eléctrico, Fusibles y Luces** | Lectura de voltaje (12.6V apagado, 14.2V encendido); procedimiento seguro de puente con cables (Positivo con Positivo, Negativo a masa lejana); comprobación de fusibles quemados. | Normas BCI & Manuales Eléctricos Bosch |
| **08** | **Filtros, Bujías, Correas y Escobillas** | Procedimiento de 5 minutos para cambiar el filtro de cabina en guantera; inspección de bujías (color café con leche vs carbonizadas); correa de accesorios vs correa de distribución crítica. | Manuales de Servicio OEM & Mann-Filter |
| **09** | **El Turbocompresor: Cuidados Críticos** | Eje flotante a más de 200.000 RPM sostenido por película de aceite; la **Regla de los 60 Segundos** (enfriamiento al ralentí tras alta exigencia para evitar carbonización del aceite); mitos del turbo. | Garrett Motion & BorgWarner Turbo Systems |
| **10** | **Testigos del Tablero y Escáner OBD-II** | Semáforo ISO: Rojo (detención inmediata), Ámbar/Amarillo (precaución, acudir a revisión), Verde/Azul (informativo); conector de diagnóstico OBD-II de 16 pines; lectura de códigos DTC estándar. | ISO 2575 & SAE J1979 (OBD-II Diagnostic) |
| **11** | **Mantenimiento Preventivo por Kilometraje y Costos** | Matriz cronológica de servicios a los 10k, 20k, 50k y 100k kilómetros; desglose de costo de repuestos vs costo de mano de obra; el peligro del mito "aceite de transmisión sellado de por vida". | ATRA & Tablas de Mantenimiento OEM |
| **12** | **Protocolo de Emergencias en Ruta y Cambio de Llanta** | Secuencia PAS (Proteger, Avisar, Socorrer); procedimiento de 8 pasos seguros para cambiar una llanta ponchada; qué hacer ante calentón de motor o pérdida súbita de frenos. | AAA Road Safety Guidelines & FIA |
| **13** | **Guía para ir al Taller sin Ser Estafado** | Protocolo de 5 pasos para blindarse: fotografía al odómetro, presupuesto por escrito, exigir devolución de piezas viejas en su caja, inspección previa; diferencias entre repuestos OEM, Tier 1 y Aftermarket. | Reportes de Defensa al Consumidor & AAA |
| **14** | **Apéndices, Checklists y Bitácora de Guantera** | Mentalidad preventiva del conductor inteligente; bitácora imprimible de mantenimiento para duplicar el valor de reventa; glosario neutral latinoamericano (México, Venezuela, Chile, etc.). | Manual de Buenas Prácticas CharuAutos |

---

### 4.2. Catálogo Maestro de Ilustraciones e Infografías Técnicas en Español

La versión 2.0 sustituyó la totalidad de diagramas técnicos abstractos por ilustraciones e infografías HD especialmente elaboradas, con tipografía uniforme, cero texto en inglés y alineadas al fondo oscuro *Dark Showroom*:

1. **`assets/charuautos_emblema_mascota.png`:** Emblema heráldico oficial de Charu, la mascota piloto.
2. **`assets/ilustracion_cuerpo_humano_auto.svg`:** Analogía pedagógica visual entre la anatomía humana y los componentes del vehículo (corazón = motor, sangre = aceite, venas = mangueras, pulmones = admisión/filtro).
3. **`assets/vano_motor_real_espanol.jpg`:** Render 3D fotorrealista del compartimento del motor con señaladores claros en español (depósito de refrigerante, varilla de aceite, tapón de llenado, líquido de frenos, batería y filtro de aire).
4. **`assets/ilustracion_herramientas_esenciales.svg`:** Kit de herramientas caseras esenciales para emergencias mecánicas.
5. **`assets/car_emergency_kit.jpg`:** Fotografía de alta resolución y despiece del kit de seguridad obligatorio para la cajuela.
6. **`assets/infografia_inspeccion_360_auto.jpg` / `assets/ilustracion_inspeccion_360.svg`:** Protocolo visual de caminata perimetral alrededor del auto para detectar luces quemadas, llantas bajas o impactos.
7. **`assets/ilustracion_varilla_aceite.svg` / `assets/ilustracion_lectura_varilla_aceite.jpg`:** Guía gráfica paso a paso para medir el nivel de aceite con exactitud en la varilla (marcas MIN y MAX).
8. **`assets/ilustracion_guia_colores_fluidos.svg`:** Tabla visual de colores de manchas en el piso para identificar fugas al instante.
9. **`assets/tire_guide_and_dot_code.jpg` / `assets/ilustracion_profundidad_neumatico_seguridad.jpg`:** Infografía de lectura del código DOT (fecha de fabricación), surcos de rodamiento y presión de inflado.
10. **`assets/frenos_suspension_espanol.jpg` / `assets/brake_and_suspension_guide.jpg`:** Esquema técnico en español del conjunto de freno de disco ventilado, cáliper, pastillas y amortiguador.
11. **`assets/ilustracion_paso_corriente_bateria.svg` / `assets/ilustracion_fusible_bueno_quemado.svg`:** Diagrama seguro para conectar cables pasa-corriente y comprobación visual de filamento de fusible intacto vs fundido.
12. **`assets/cabin_filter_replacement.jpg`:** Guía fotográfica secuencial en 4 pasos para sustituir el filtro de cabina antipolen ubicado tras la guantera.
13. **`assets/turbo_mantenimiento_espanol.jpg` / `assets/ilustracion_turbo_ciclo_60segundos.svg`:** Despiece del turbocompresor (caracola de escape, caracola de admisión, eje de titanio a 200.000 RPM) y el protocolo de los 60 segundos de enfriamiento al ralentí.
14. **`assets/dashboard_warning_lights.jpg` / `assets/ilustracion_conector_obd2.svg`:** Tablero de instrumentos con el código semafórico de colores ISO y ubicación del puerto OBD-II de 16 pines.
15. **`assets/ilustracion_cambio_llanta_secuencia.jpg` / `assets/ilustracion_cambio_llanta_pasos.svg`:** Infografía secuencial en 8 pasos seguros para cambiar un neumático desinflado en carretera.
16. **`assets/taller_mecanico_espanol.jpg` / `assets/repuestos_calidad_espanol.jpg`:** Infografías de interacción en taller y comparativa visual entre repuestos OEM, Tier 1 y Aftermarket.
17. **`assets/workshop_smart_checklist.jpg`:** Nueva ilustración exclusiva: El conductor pensando en los componentes de mantenimiento preventivo (fluidos, bujías, frenos, neumáticos) y disfrutando de una conducción feliz y segura en carretera panorámica.
18. **`assets/ilustracion_bitacora_mantenimiento.svg`:** Modelo visual de la bitácora de servicio de guantera con insignias doradas legibles y sin colisiones de texto.

---

### 4.3. Herramientas Interactivas Exclusivas de la Web App V2

En la aplicación interactiva (`dist_pwa_v2/index.html`):
1. **Detector Interactivo de Fugas por Color de Mancha:**  
   Al seleccionar el color observado debajo del auto, el sistema entrega diagnóstico inmediato:
   - *Dorado / Ámbar traslúcido:* Aceite de motor nuevo o en buen estado.
   - *Marrón oscuro o negro espeso:* Aceite de motor degradado con carbón.
   - *Verde o rosa fosforescente:* Fuga de refrigerante / anticongelante (¡riesgo de sobrecalentamiento!).
   - *Rojo transparente:* Fuga de aceite de transmisión automática (ATF) o líquido de dirección asistida.
   - *Agua clara inodora:* Condensación normal del aire acondicionado (no es avería).
2. **Buscador Rápido de Códigos de Falla OBD-II (Check Engine):**  
   Permite al usuario ingresar códigos de diagnóstico estándar (ej. `P0300`, `P0301`, `P0420`, `P0171`, `P0172`, `P0442`, `P0115`) y obtener la causa raíz y solución en lenguaje comprensible sin términos oscuros.
3. **Checklists de Mantenimiento con Persistencia LocalStorage:**  
   Listas de verificación interactiva para inspecciones semanales, mensuales y previajes. Los estados marcados se guardan automáticamente en la memoria del navegador del usuario sin requerir bases de datos remotas ni cuentas de usuario.
4. **Navegación Móvil Avanzada (Drawer Táctil):**  
   Menú deslizante optimizado para pulgares en pantallas móviles, buscador de módulos en tiempo real y barra horizontal superior de progreso de lectura.

---

## 5. Versión 1.0: Edición Clásica Original

La **Versión 1.0** se mantiene intacta en el repositorio en las carpetas `ebook/` y `dist_pwa/`:
- **10 Capítulos Técnicos:** Módulo 0 (Glosario y tablero), Módulo 1 (Motor y lubricación), Módulo 2 (Turbo), Módulo 3 (Transmisión y frenos), Módulo 4 (Neumáticos y carrocería), Módulo 5 (A/C e interior), Módulo 6 (Repuestos), Módulo 7 (Taller), Módulo 8 (Bitácora) y Módulo 9 (Bibliografía oficial).
- **Evidencia Estadística Auditada:** Respaldada por investigaciones de campo del *Car Care Council* (80% de vehículos inspeccionados tienen fallas latentes), *SAE International*, *ASTM D3306*, *ATRA* (curva térmica de degradación del ATF), *NHTSA* y *AAA*.
- **Documento PDF Comercial de Alta Resolución:** Archivo compilado de 33 páginas *Full Bleed* sin bordes blancos: `ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf`, listo para ser comercializado y entregado a compradores.

---

## 6. Arquitectura de Software, Despliegue y PWA

### 6.1. Configuración en GitHub Pages y Redirección Raíz
- **URL Base:** `https://faraves.github.io/charuautos/`
- **Acceso Directo a la Historieta (Cómic PWA):** `https://faraves.github.io/charuautos/dist_pwa_historieta/` (o con el atajo `https://faraves.github.io/charuautos/?historieta`).
- **Acceso Directo al Ebook V2 (Manual Técnico):** `https://faraves.github.io/charuautos/dist_pwa_v2/`
- **Acceso Directo V1:** `https://faraves.github.io/charuautos/dist_pwa/`
- **Comportamiento Raíz (`index.html`):**  
  El archivo raíz implementa una redirección inteligente: si detecta parámetros como `?historieta` o `?comic`, envía al visitante de inmediato al lector del cómic PWA; por defecto redirige al Ebook V2 (`dist_pwa_v2/?v=10`), ofreciendo en pantalla botones de acceso rápido a ambas ediciones.
- **Archivo `.nojekyll`:** Presente en la raíz para evitar que el motor Jekyll de GitHub omita carpetas con guiones bajos o archivos estáticos.

### 6.2. Estrategia del Service Worker (v10) y Modo Offline
El Service Worker (`service-worker.js`) implementa una política agresiva y moderna de dos niveles:
1. **Navegación HTML (Network-First):** Las solicitudes de documentos HTML intentan obtener siempre la versión más reciente del servidor (`cache: 'no-cache'`). Si el usuario se encuentra en carretera sin cobertura celular, el Service Worker recurre de inmediato al archivo almacenado en caché (`caches.match`).
2. **Recursos Estáticos (Cache-First con Revalidación de Fondo):** Las ilustraciones, hojas de estilo y fuentes se sirven al instante desde la memoria caché del dispositivo para velocidad extrema, mientras se desencadena una consulta en segundo plano para almacenar actualizaciones automáticas.
3. **Invalidación de Caché:** El identificador `CACHE_NAME = 'charuautos-pwa-v2-20260915-v10'` garantiza que cada actualización del repositorio invalide y limpie las cachés anteriores, evitando que el usuario visualice gráficos desactualizados.

### 6.3. Paquetes ZIP para Distribución
- **`CharuAutos_V2_WebApp_PWA.zip`:** Archivo comprimido con la versión completa e independiente de la PWA V2, listo para subir a Netlify, Vercel, Firebase Hosting o distribuir en pendrives/descargas directas.
- **`CharuAutos_WebApp_PWA.zip`:** Archivo comprimido con la versión PWA V1 clásica.

---

## 7. Estrategia Comercial y Embudo de Ventas

### 7.1. Embudo de Comercialización
- **Canal de Adquisición:** Redes sociales oficiales `@charuautopics` (Instagram, TikTok, YouTube Shorts).
- **Contenido Gancho (Lead Magnets):** Videos cortos y carruseles desmintiendo mitos mecánicos caros (el agua en el radiador, apagar el turbo de golpe, mitos del aceite de transmisión sellado).
- **Página de Ventas (Landing Page):** Documentada en `marketing/landing_page_copy.md`, estructurada para pasarelas como Hotmart, Gumroad o Lemon Squeezy a un precio de oferta de **$4.99 USD**.
- **Prompts Publicitarios de Inteligencia Artificial:** Almacenados en `marketing/prompts_diseno_y_portada.md` para generar portadas fotorrealistas y mockups sobre iPads y smartphones en talleres modernos.

---


---

## 9. La Trilogía Editorial: La Versión en Historieta Ilustrada ("Las Aventuras de Charu")

Como evolución natural del proyecto y para maximizar el alcance pedagógico entre conductores de todas las edades, se desarrolló la versión en **novela gráfica y libro de historietas educativas (*comic book*)**:

### 9.1. Filosofía Pedagógica y Dinámica de Personajes
1. **Charu (El Piloto y Mentor - Mech-Dog):** Diseñado fielmente bajo la estética canónica de la mascota oficial: perro pequeño mestizo de pelaje caramelo claro con marcas blancas en hocico, mentón, pecho y patas, casco de aviador retro con gafas, y arnés táctico color caqui con bolsillos utilitarios, parche lateral 'CHARULO - MECH-DOG' y placa identificatoria de hueso.
2. **Carmen (La Conductora Inteligente):** Joven profesional de 26 años, dueña de su primer automóvil hatchback rojo. Representa las dudas, inseguridades y miedos del conductor principiante frente a fallas y talleres. A lo largo de los 14 episodios pasa de la incertidumbre al empoderamiento técnico y la autonomía total.
3. **Don Carlos (El Mecánico Sabio y Honesto):** Dueño del taller *AutoSolución*, enseña a Carmen el valor de la transparencia, presupuestos por escrito y repuestos certificados.
4. **Don Chanchullo (El Taller Sospechoso):** Antagonista caricaturesco diseñado como un gato doméstico bicolor (blanco y negro con máscara de esmoquin), arnés de trabajo de cuero manchado de grasa, gafas de aviador agrietadas, medidor de calibración manipulado con diales alterados y manchas de grasa en su pelaje, que inventa averías astronómicas hasta que Carmen despliega el Escudo Anti-Estafas de CharuAutos.

### 9.2. Los 14 Episodios de la Historieta
- **Episodio 00:** Prólogo y presentación del elenco.
- **Episodio 01:** El Misterio del Capó y las 5 Reglas de Oro (peligros del radiador caliente a 125°C).
- **Episodio 02:** El Auto es un Cuerpo Humano (motor = corazón, aceite = sangre, 4 tiempos).
- **Episodio 03:** La Caja Mágica de la Cajuela (armado del kit táctico de rescate).
- **Episodio 04:** La Caminata del Detective (rutina 360° en 3 tiempos y detección de tornillo).
- **Episodio 05:** El Misterio del Charco de Colores (diagnóstico de fugas por color y varilla de aceite).
- **Episodio 06:** Las Runas Secretas del Neumático (código DOT de caducidad y prueba de la moneda).
- **Episodio 07:** Chispa y Rescate a Medianoche (puente seguro de cables y fusibles de colores).
- **Episodio 08:** Respirando Aire Puro en la Guantera (filtro de cabina en 5 minutos y ahorro de $140 USD).
- **Episodio 09:** El Caracol de las 200.000 RPM (el turbo al rojo vivo y la Regla de los 60 Segundos).
- **Episodio 10:** El Árbol de Navidad en el Tablero (Check Engine, escáner OBD-II y la tapa de gasolina).
- **Episodio 11:** La Factura Fantasma y los 100k km (plan de mantenimiento real y mito del ATF sellado).
- **Episodio 12:** Llanta Ponchada en la Autopista (protocolo PAS y cambio seguro de llanta en 8 pasos).
- **Episodio 13:** El Duelo en el Taller Mecánico (el Escudo Anti-Estafas de 5 pasos en acción).
- **Episodio 14:** El Pasaporte a la Tranquilidad (la Bitácora sellada de Don Carlos y conducción feliz).

### 9.3. Tecnología del Lector Web ("Comic Reader")
- **Visualización Dual:** Modo tira continua vertical (*webtoon*) optimizado para celulares y modo diapositiva horizontal viñeta a viñeta para computadoras (con atajos de teclado `←` / `→`, botones flotantes y gestos *swipe* táctiles).
- **Exportación e Impresión a PDF:** Hoja de estilos `@media print` optimizada para exportar el cómic completo a PDF de colección, con saltos de página limpios por episodio y contraste de alta legibilidad.
- **Web Audio API:** Efectos sonoros interactivos al hacer clic sobre onomatopeyas visuales (*¡ZAS! ¡BUM! ¡CLIC!*).
- **PWA Offline V3:** Service Worker independiente v3 (`charuautos-comic-pwa-v3`) con recarga forzada `reg.update()`, invalidación de cachés anteriores y manifiesto para lectura sin conexión en carretera.
- **Paquete de Distribución:** [`CharuAutos_Historieta_WebApp_PWA.zip`](CharuAutos_Historieta_WebApp_PWA.zip).

---

## 8. Hoja de Ruta y Plataforma SaaS Cloud-Native (`app/docs/`)

El ecosistema evoluciona desde la base editorial hacia una **Plataforma SaaS Cloud-Native Comercial** de gran escala, detallada exhaustivamente en el directorio [`app/docs/`](app/docs/):
1. **Pilar 1 — Matchmaker & Comparador RAG:** Asesor conversacional guiado e ingesta de fichas técnicas en PDF mediante embeddings vectoriales sin alucinaciones.
2. **Pilar 2 — Diagnóstico OBD2 & Escudo Anti-Estafas:** Catálogo SAE J2012 / ISO con semáforo de severidad y causas 80/20.
3. **Pilar 3 — Cuaderno de Mantenimiento & Dashboard Cloud:** Sincronización en la nube, métricas de $/km bimonetario, predicción de desgaste y pasaporte criptográfico SHA-256.
4. **Modelo de Negocio SaaS & Marketplace:** Suscripción recurrente CharuPro, afiliados de repuestos, comisiones de talleres verificados y leads para concesionarios.
5. **Suite Documental Especializada:**
   - [`00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md`](app/docs/00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md)
   - [`01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md`](app/docs/01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md)
   - [`02_GESTION_Y_GOBERNANZA_DE_DATOS.md`](app/docs/02_GESTION_Y_GOBERNANZA_DE_DATOS.md)
   - [`03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md`](app/docs/03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md)
   - [`04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md`](app/docs/04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md)
   - [`05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md`](app/docs/05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md)
   - [`06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md`](app/docs/06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md)
   - [`07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md`](app/docs/07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md)

---

© 2026 **CharuAutos** (`@charuautopics`). Todos los derechos reservados.  
`🐾 PASIÓN AUTOMOTRIZ AL ALCANCE DE TUS MANOS`
