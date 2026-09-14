# DOCUMENTACIÓN INTEGRAL DEL PROYECTO: CHARUAUTOS
## Ecosistema Editorial, Identidad de Marca & Plataforma Automotriz
*Versión 1.0 — Compilado Oficial 2026*  
*Autor / Marca: CharuAutos (`@charuautopics`)*

---

## 1. Resumen Ejecutivo y Visión Estratégica

**CharuAutos** es una iniciativa automotriz integral diseñada para empoderar al propietario de vehículos en el mercado hispanohablante (con foco en Latinoamérica: Venezuela, México, Chile, Colombia, entre otros). El proyecto aborda la histórica asimetría de información y desconfianza existente entre conductores y talleres mecánicos, combinando **educación técnica rigurosa**, un **diseño visual de alta gama (*Dark Showroom*)** y herramientas digitales interactivas.

### 1.1. Objetivos del Proyecto
1. **Producto Digital (Ebook Comercial):** Publicación del *"Manual Práctico del Conductor Inteligente: Mantenimiento, Ahorro y Cuidado de tu Auto"*, con lenguaje accesible, analogías claras, protocolos preventivos, descargo legal y sustento estadístico empírico de la industria automotriz.
2. **Identidad Visual Corporativa:** Creación de la marca *CharuAutos* y su handle `@charuautopics`, incluyendo manual de identidad interactivo, activos vectoriales nativos (SVG) y directrices de aplicación.
3. **Plataforma Web Editorial & Exportación PDF de Alta Fidelidad:** Desarrollo de una aplicación web interactiva (`ebook_interactivo.html`) con navegación bidireccional, barra de lectura, buscador en vivo y un motor de impresión a PDF que replica al 100% la estética de showroom (*Full Bleed*, fondo obsidiana sin bordes blancos).
4. **Infraestructura de Marketing y Ventas:** Embudo de conversión con copy de landing page, guiones para TikTok/Reels, carruseles educativos para Instagram y prompts de generación para herramientas de Inteligencia Artificial.
5. **Fase Futura (Roadmap):** Desarrollo de un Dashboard / Comparador interactivo de fichas técnicas vehiculares en PDF (modelos GWM Haval/Poer, Jetour Dashing/X70, Chery Tiggo, etc.) con motor de recomendación para compradores.

---

## 2. Estructura y Mapa General de Archivos

```text
CharuAutos/
├── README.md                                       # Visión general y guía rápida del repositorio
├── DOCUMENTACION_GENERAL.md                        # Documento maestro técnico y estratégico (este archivo)
│
├── branding/                                       # IDENTIDAD VISUAL Y DIRECTRICES DE MARCA
│   ├── MANUAL_DE_MARCA.md                          # Manual de identidad en formato Markdown
│   ├── manual_identidad.html                       # Showroom web interactivo con probador y copiado HEX
│   └── assets/                                     # Activos vectoriales nativos (SVG)
│       ├── charuautos_logo_horizontal.svg          # Imagotipo principal (Isotipo + Wordmark + @charuautopics)
│       ├── charuautos_logo_icon.svg                # Isotipo monograma CA (Escudo aerodinámico)
│       ├── charuautos_avatar_instagram.svg         # Avatar circular para redes con tacómetro / RPM
│       └── charuautos_watermark.svg                # Marca de agua translúcida para vídeo y posts
│
├── ebook/                                          # CONTENIDO EDITORIAL Y PRODUCTO DIGITAL
│   ├── 00_introduccion_y_tablero.md                # Mod 0: Glosario latino, semáforo y Car Care Council
│   ├── 01_motor_y_fluidos.md                       # Mod 1: Lubricación, SAE J300 y refrigerante ASTM D3306
│   ├── 02_turbo_mantenimiento_y_cuidados.md        # Mod 2: Cuidado del turbo, hábito 60s y datos Garrett
│   ├── 02_transmision_frenos_suspension.md         # Mod 3: Transmisiones ATRA, frenos Brembo y suspensión
│   ├── 03_carroceria_luces_neumaticos.md           # Mod 4: Neumáticos NHTSA, DOT y detallado exterior
│   ├── 04_interior_y_climatizacion.md              # Mod 5: Filtro de cabina y prevención de hongos A/C
│   ├── 05_guia_compra_repuestos.md                 # Mod 6: OEM vs Tier 1, código VIN y combate a piratería
│   ├── 06_manual_conductor_en_taller.md            # Mod 7: Protocolo de defensa, encuesta AAA y checklist
│   ├── 07_bitacora_y_checklists.md                 # Mod 8: Bitácora de guantera y cronograma 10k-100k km
│   ├── 08_bibliografia_y_fuentes_oficiales.md      # Mod 9: Referencias oficiales SAE, API, ISO, OEM, NHTSA
│   ├── ebook_completo.md                           # Manuscrito unificado en Markdown con enlaces
│   ├── ebook_interactivo.html                      # Web App interactiva con estilos de lectura y exportación
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # Archivo comercial final en PDF (33 páginas, Full Bleed)
│   └── assets/                                     # 14 infografías en español + SVGs integrados
│
└── marketing/                                      # ESTRATEGIA COMERCIAL Y MONETIZACIÓN
    ├── landing_page_copy.md                        # Copywriting persuasivo para Hotmart / Gumroad
    └── prompts_diseno_y_portada.md                 # Prompts de IA, guiones de video y carruseles
```

---

## 3. Identidad de Marca: CharuAutos (`@charuautopics`)

Inspirada en el lenguaje de diseño automotriz contemporáneo (líneas angulares y aerodinámicas de marcas como Jetour, GWM Haval y Chery), la identidad visual proyecta tecnología, precisión de telemetría y fiabilidad.

### 3.1. Arquitectura de Logotipos
1. **Isotipo Monograma CA (`charuautos_logo_icon.svg`):**
   - Escudo hexagonal biselado inspirado en una toma de aire de carreras.
   - La letra **C** (Charu) en titanio espacial se entrelaza con la letra **A** (Autos) en cuña reflectiva de neón cian.
   - Atravesado por una aleta deflectora en rojo de competición (*Racing Crimson*) y un punto de calibración de telemetría en el vértice superior.
2. **Imagotipo Horizontal (`charuautos_logo_horizontal.svg`):**
   - Diseñado para cabeceras, portadas y banners.
   - Tipografía principal *CHARU* (titanio) y *AUTOS* (cian con resplandor neón difuso).
   - En la segunda fila: el lema institucional *"DOMINIO MECÁNICO & CULTURA AUTOMOTRIZ"* con tipografía amplia y sin colisiones de texto.
   - En la tercera fila: cápsula tecnológica con el handle `@CHARUAUTOPICS` y la etiqueta *"COMUNIDAD & ASESORÍA AUTOMOTRIZ"*.
3. **Avatar Circular para Redes (`charuautos_avatar_instagram.svg`):**
   - Optimizado para fotos de perfil en Instagram, TikTok y WhatsApp.
   - Anillo exterior con escala de tacómetro graduado, zona de corte en rojo (*Redline*) a altas RPM, textura radial de fibra de carbono y monograma central.
4. **Marca de Agua (`charuautos_watermark.svg`):**
   - Versión translúcida (70-85% de opacidad) para superponer en material audiovisual y esquinas de documentos.

### 3.2. Sistema Cromático (*Dark Showroom*)
- **Obsidian Black (`#070a0f` / `#080b11`):** Fondo de absorción lumínica profunda que genera la atmósfera de un salón de exhibición privado.
- **Hyper Neon Cyan (`#00f2fe` / `#00f0ff`):** Acento primario que simboliza tecnología, diagnóstico digital y energía eléctrica.
- **Electric Deep Blue (`#0066ff` / `#0088ff`):** Gradientes de profundidad y sombras de contraste.
- **Racing Crimson (`#ff2a5f` / `#ff1e56`):** Rendimiento, temperatura crítica y alertas de seguridad.
- **Telemetry Amber (`#ffb300` / `#f59e0b`):** Testigos de advertencia en tablero y certificaciones.
- **Brushed Titanium (`#94a3b8` / `#e2e8f0`):** Tipografía secundaria, líneas de retícula y detalles metálicos.
- **Pure White (`#ffffff` / `#f8fafc`):** Máxima legibilidad en titulares y textos clave.

### 3.3. Manual Interactivo (`branding/manual_identidad.html`)
- **Probador de Logotipo:** Permite alternar en tiempo real entre fondos oscuros (*Dark Showroom*), claros (*Luz Diurna*) y retículas de ingeniería (*Telemetría*).
- **Copiado de Paleta en 1 Clic:** Al hacer clic sobre cualquier muestra de color, el código HEX se copia al portapapeles con notificación emergente (*Toast*).
- **Simulador de Instagram:** Visualización interactiva del perfil de `@charuautopics`, sus estadísticas, biografía e historias destacadas.
- **Descargas Directas:** Enlaces de descarga inmediata para todos los activos SVG.

---

## 4. El Ebook: "Manual del Conductor Inteligente"

### 4.1. Marco Técnico y Descargo de Responsabilidad (Disclaimer)
El manual incluye un riguroso descargo legal y técnico en su portada que certifica:
- Todo el contenido es una recopilación, síntesis pedagógica y contraste sustentado en **manuales oficiales de fabricantes (OEM)**, normativas internacionales (**SAE, API, ILSAC, ISO, NHTSA**), autopartistas certificados Tier 1 (**Bosch, Garrett Motion, Brembo, ZF, BorgWarner**), estudios de campo (**Car Care Council, AAA, ATRA**) y criterios de mecánicos certificados **ASE**.
- Empodera al usuario para supervisar y prevenir, aclarando que no deroga el manual de fábrica de cada modelo y que las tareas que comprometan la seguridad activa deben ejecutarse por personal calificado.

### 4.2. Glosario Maestro Latinoamericano
Tabla comparativa neutral para evitar confusiones en el vocabulario automotriz:
- Equivalencias exactas entre términos de **México**, **Venezuela**, **Chile** y el término neutro internacional (ej.: *Cajuela / Maleta / Maletero*, *Cofre / Capó / Capot*, *Balatas / Pastillas*, *Clutch / Croche / Embrague*, *Anticongelante / Refrigerante / Coolant*, *Llanta / Caucho / Neumático*, etc.).

### 4.3. Datos Empíricos Verificados Incorporados por Módulo
No se utilizaron cifras inventadas; cada argumento técnico está respaldado por investigaciones auditadas:

| Módulo | Tema Central | Fuente Oficial Verificada | Evidencia Estadística / Gráfica Incorporada |
| :--- | :--- | :--- | :--- |
| **Módulo 0** | Fundamentos y Tablero | **Car Care Council (Auto Care Association)** | **80% de vehículos inspeccionados presentan fallas latentes:** 29% aceite bajo/sucio, 24% refrigerante bajo, 22% llantas desinfladas, 19% filtro de aire tapado, 17% ATF degradado, 15% humedad en frenos. |
| **Módulo 1** | Motor y Fluidos | **SAE International (J300) & ASTM D3306** | **75% del desgaste del motor ocurre en los primeros 90 segundos** (arranque en frío). El agua de grifo hierve a 100°C y oxida; el refrigerante 50/50 OAT resiste hasta 128°C y no corroe. |
| **Módulo 2** | Turbocompresor | **Garrett Motion & BorgWarner Aftermarket** | **92% de las fallas de turbos son por problemas de lubricación** (falta de aceite, suciedad o apagado brusco sin enfriar). Menos del 1% se debe a defectos de fábrica. |
| **Módulo 3** | Transmisión y Frenos | **ATRA (Automatic Transmission Rebuilders Association)** | **Curva térmica del ATF:** A 79°C dura 160.000 km; cada incremento de 11°C reduce su vida útil al 50%. El "aceite de por vida" es una causa directa de fallas a los 100.000 km. Tolerancias Brembo para discos (DTV < 0.015 mm). |
| **Módulo 4** | Neumáticos y Carrocería | **NHTSA (U.S. DOT HS 811 617)** | Neumáticos desinflados en 25% o más **triplican el riesgo de siniestro vial**. El 26% de choques relacionados con cauchos involucran surcos desgastados (< 1.6 mm). Interpretación del código DOT. |
| **Módulo 5** | Interior y Climatización | **Fabricantes OEM / HVAC** | Procedimiento de 3 pasos para cambiar el filtro de cabina en guantera en 5 minutos. El hábito de apagar el A/C 2 minutos antes del destino para prevenir hongos y bacterias. |
| **Módulo 6** | Repuestos y Calidad | **OCDE & EUIPO (Reportes Antipiratería)** | Matriz de riesgo para piezas críticas vs accesorias. Métodos de verificación de sellos de seguridad en envases de aceite y decodificación del código VIN (dígito 10 = año de modelo). |
| **Módulo 7** | Manual en Taller Mecánico | **American Automobile Association (AAA)** | **77% de desconfianza en talleres mecánicos:** 76% por servicios innecesarios y 73% por sobreprecios. Protocolo de 4 pasos (foto al odómetro, presupuesto firmado, exigir piezas viejas en caja). |
| **Módulo 8** | Bitácora y Checklists | **Ingeniería Preventiva** | Hoja imprimible de guantera, cronograma de servicio de 10.000 a 100.000 km, checklist para viajes en carretera y kit de emergencia obligatorio. |
| **Módulo 9** | Bibliografía Oficial | **Organismos Internacionales** | Compendio exhaustivo de normas SAE, API SP, ILSAC GF-6, ISO 9001/IATF 16949, manuales Bosch, ZF, Aisin, Brembo y Gates. |

---

## 5. Ingeniería de la Web App Editorial (`ebook_interactivo.html`)

El documento web fue concebido como una plataforma editorial reactiva que une interactividad digital y fidelidad de impresión profesional:

1. **Barra Superior HUD Sticky:**
   - Barra fija con desenfoque de fondo (*backdrop-filter: blur*), isotipo de CharuAutos, botón de acceso rápido al índice general, botón de instalación PWA `📲 INSTALAR APP` y botón de exportación instantánea `🖨️ EXPORTAR PDF`.
2. **Barra de Progreso de Lectura:**
   - Línea superior reactiva con gradiente cian/carmesí que calcula dinámicamente el porcentaje de desplazamiento del lector (`window.onscroll`).
3. **Buscador Dinámico en Tiempo Real:**
   - Campo de filtrado instantáneo que busca términos mecánicos, códigos de falla o componentes y resalta u oculta los módulos en pantalla.
4. **Widgets Gráficos de Telemetría (`.data-graph-box`):**
   - Barras de progreso horizontales con diseño Dark Tech que visualizan gráficamente las estadísticas de fallas y estudios de campo.
5. **Navegación Bidireccional:**
   - Cada tarjeta del índice salta al módulo correspondiente mediante anclajes semánticos (`#mod0`, `#mod1`, etc.).
   - Cada módulo y elemento flotante cuenta con el botón interactivo **`↑ Volver al Índice General`** enlazado a `#indice`.
6. **Arquitectura Progressive Web App (PWA) & Modo Offline:**
   - **`manifest.json`:** Define la identidad de la aplicación para smartphones (`standalone`, orientación `portrait-primary`, color de barra `#080b11`, iconos de alta resolución de 192x192 y 512x512 px).
   - **`service-worker.js`:** Implementa una estrategia de cache avanzada (*Stale-While-Revalidate*) que pre-almacena el HTML, ilustraciones y hojas de estilo, permitiendo que la aplicación funcione al 100% en zonas remotas o autopistas sin cobertura celular.
   - **Instalador Inteligente:** Detecta el navegador del usuario y ejecuta el prompt nativo de Android/Chrome o despliega un modal estilizado con instrucciones específicas para Safari en iOS (*Compartir -> Agregar a la pantalla de inicio*).
   - **Punto de Entrada Universal (`index.html`):** Permite el despliegue automático e instantáneo en cualquier proveedor de hosting estático (Vercel, Netlify, Cloudflare Pages o GitHub Pages).

---

## 6. Motor de Exportación a PDF de Alta Fidelidad

Para garantizar que el PDF generado sea idéntico a la experiencia web y no sufra los problemas típicos de impresión de los navegadores, se implementó una arquitectura CSS `@media print` especializada:

- **Sangrado Completo Oscuro (*Full Bleed*):**
  - Configuración `@page { size: A4 portrait; margin: 0; }` que elimina los márgenes blancos perimetrales.
  - El fondo obsidiana (`#080b11`) y la cuadrícula cubren el 100% de la hoja de papel de borde a borde.
  - Se eliminan automáticamente las cabeceras/pies de página predeterminados del navegador (fechas, URLs y numeración huérfana).
- **Portada Editorial en Página 1:**
  - El banner principal (*Hero Showroom*) y el cuadro legal (*Disclaimer*) fueron calibrados para coexistir perfectamente en la primera página, formando una portada ejecutiva sin divisiones de texto.
  - Salto de página controlado posterior (`page-break-after: always;`) para que el Índice comience limpio en la Página 2.
- **Flujo Continuo sin Huecos Vacíos:**
  - Se removieron los cortes forzados entre módulos, logrando que el texto fluya de forma continua tal como en la versión web.
  - Las tablas admiten división fila por fila (`table { break-inside: auto; } tr { break-inside: avoid; }`), repitiendo los encabezados (`thead { display: table-header-group; }`).
  - La compresión y balance editorial redujo el documento de **39 páginas rotas** a **33 páginas continuas y densas**.
- **Documento Maestro Generado:**
  - Archivo compilado: **`ebook/CharuAutos_Manual_del_Conductor_Inteligente.pdf`**, listo para ser comercializado y distribuido a los clientes.

---

## 7. Estrategia de Marketing, Venta y Redes Sociales

### 7.1. Embudo de Comercialización
- **Canal de Adquisición:** Cuenta de Instagram **`@charuautopics`**, TikTok y YouTube Shorts.
- **Lead Magnet / Gancho:** Videos cortos mostrando errores comunes (ej.: agua en radiador, apagar turbo de golpe, mitos del aceite).
- **Página de Venta (Landing Page):** Documentada en `marketing/landing_page_copy.md`, estructurada bajo la fórmula de persuasión:
  - *Atención:* Gancho sobre los costos ocultos de los talleres mecánicos.
  - *Problema / Agitación:* La sensación de vulnerabilidad al dejar el auto con un mecánico desconocido.
  - *Solución:* Presentación del "Manual del Conductor Inteligente".
  - *Autoridad:* Mención de las fuentes oficiales (SAE, Garrett, Bosch, AAA).
  - *Oferta Irresistible:* Precio de lanzamiento de **$4.99 USD** (con bonus de bitácora y checklist de viaje).
  - *Garantía:* 7 días de satisfacción incondicional.

### 7.2. Contenidos y Prompts Publicitarios (`marketing/prompts_diseno_y_portada.md`)
- Prompts listos para copiar y pegar en herramientas de IA (Midjourney, Ideogram, DALL-E) para generar portadas planas y mockups 3D sobre iPads/teléfonos en talleres modernos.
- Guiones de video de 30 segundos con fórmulas de alto impacto visual y retención.
- Esquema de carruseles de 5 diapositivas para Instagram centrados en preguntas clave para desarmar presupuestos inflados en talleres.

---

## 8. Hoja de Ruta (Próximos Pasos Disponibles)

Con el Ebook y la Identidad Visual de CharuAutos totalmente finalizados, los siguientes pasos del ecosistema son:

1. **Configuración de Plataforma de Pago:** Subir el PDF compilado a Hotmart, Gumroad o Lemon Squeezy con el copy de `marketing/landing_page_copy.md`.
2. **Lanzamiento de Contenido en `@charuautopics`:** Publicar los primeros carruseles y reels utilizando la marca de agua y avatar oficiales.
3. **Desarrollo de la Idea 2 (Dashboard / Comparador de Fichas Técnicas PDF):**
   - Creación de una aplicación web/interfaz que procese archivos PDF de fichas técnicas oficiales (GWM Haval/Poer, Jetour Dashing/X70, Chery Tiggo, etc.).
   - Extracción automatizada de parámetros: motorización, potencia (HP/kW), torque (Nm), tipo de transmisión (CVT, DCT, AT), consumo mixto y equipamiento de seguridad activa (ADAS).
   - Sistema de recomendación interactivo con preguntas al usuario (presupuesto, uso urbano/offroad, tamaño familiar) para orientar la compra óptima.
