---
name: charu-brand-identity
description: >-
  Sistema de Identidad Visual Canónica, Brand Guidelines y UI/UX Design System de Charu motorhub (Urban Vitality & The Mechanical Hub). Úsalo obligatoriamente al diseñar interfaces web/móviles, maquetar componentes, redactar copys, generar imágenes o desarrollar cualquier funcionalidad relacionada con Charu, CharuAutos o Charu motorhub.
---

# 🐾 Skill: Identidad Visual y Sistema de Marca — Charu motorhub
## Concepto Rector: **Urban Vitality & The Mechanical Hub (Accessible Advisory)**
*Versión Canónica Oficial 2.0 • Ecosistema Digital Automotriz*

Esta habilidad codifica las directrices inquebrantables de diseño, arquitectura visual, tono de voz y especificaciones técnicas de frontend para cualquier tarea relacionada con **Charu**, **CharuAutos** y su evolución oficial: **Charu motorhub**.

---

## 🎯 1. Plataforma y ADN de Marca

### 1.1. Denominación Oficial y Evolución
- **Nombre Corporativo:** **Charu motorhub** *(Evolución estratégica desde CharuAutos)*.
- **Tagline / Descriptor Oficial:** *Asesoría Automotriz Inteligente* | *Vitalidad Urbana & The Mechanical Hub*.
- **Posicionamiento:** No somos un concesionario frío de compraventa ni un comparador abstracto; somos el **amigo experto y copiloto leal** que acompaña con dinamismo, honestidad, empatía y rigor técnico al conductor en cada decisión vehicular.

### 1.2. El Alma de la Marca: El Homenaje a Charulo (El Copiloto Leal)
Inspirado en **Charulo**, la mascota familiar (el perro mecánico explorador con gafas de aviador y arnés de diagnóstico automotriz):
1. **🛡️ Protección Activa:** Cuidar las espaldas del conductor; evitar estafas, vicios ocultos y sobreprecios de taller.
2. **🤝 Lealtad Incondicional:** La asesoría es 100% independiente del interés de venta de los concesionarios.
3. **🔧 Pasión por los Fierros:** Curiosidad e ingeniería para meterse bajo el capó y traducir la mecánica a lenguaje humano.

### 1.3. Tono de Comunicación (Voz de Marca)
- **El Amigo Experto:** Cercano, directo, pedagógico y empático. Tratamos de "tú".
- **Sin Jerga Innecesaria:** Traducimos códigos de falla (DTC / OBD-II) y telemetría compleja a explicaciones cotidianas.
- **Optimista y Empoderador:** El mantenimiento o adquisición de un vehículo debe ser una experiencia estimulante, no una fuente de ansiedad.

---

## 📐 2. El Sistema de Identificadores Visuales (El Logotipo)

El imagotipo oficial combina **La Huella Mecánica (The Mechanical Paw)** con un lockup tipográfico en dos niveles:

```text
       [P1]       [P2]       [P3]       [P4]        <-- 4 Pistones Radiales (Dedos de la Huella)
         \          |          |          /
          \         |          |         /
       =========================================   <-- Espacio de Separación (Aire)
                      / -------- \
                     |   (GEAR)   |                <-- Corona Dentada Central (The Hub)
                      \ ________ /
               (   BASE DE LA ALMOHADILLA   )      <-- Contorno Anatómico Huella

               C H A R U   m o t o r h u b         <-- Lockup Tipográfico Principal
               A S E S O R Í A   A U T O M O T R I Z <-- Descriptor Institucional
```

### 2.1. Anatomía y Simbolismo del Isotipo
1. **Los 4 Pistones Radiales (Dedos):**
   - Configuran los cojinetes de una pata canina en apertura activa.
   - Representan los **4 cilindros en línea** de un motor y la compresión balanceada.
   - Remates en Verde Neón (`#00E676`) evocando válvulas y combustión limpia.
   - **Mapeo Funcional a los 4 Módulos de la Plataforma:**
     - **Pistón 1:** Recomendador Predictivo de Compra.
     - **Pistón 2:** Diagnóstico OBD-II Amigable (Cero Estrés).
     - **Pistón 3:** Comparador Técnico & Extractor PDF.
     - **Pistón 4:** Bitácora Urbana de Rendimiento y Ahorro en Dinero Real.
2. **La Corona Dentada Central (The Hub):**
   - La almohadilla central integra un engranaje hipoide en ángulo, simbolizando el diferencial mecánico, la transmisión y el centro neurálgico (*Hub*) de encuentro para la comunidad.
3. **Lockup Tipográfico:**
   - `CHARU`: Oswald Bold en mayúsculas (solidez, presencia y tradición).
   - `motorhub`: Poppins/Albert Sans en minúsculas técnicas (modernidad digital).
   - `ASESORÍA AUTOMOTRIZ`: Tracking extendido (`letter-spacing: 3px`) en mayúsculas institucionales.

---

## 🎨 3. Sistema Cromático Canónico (Tokens de Color)

Arquitectura de color de alto contraste con soporte nativo para **Modo Claro (Urban Light)** y **Modo Oscuro (Cockpit OLED)**:

| Token CSS | Nombre Técnico | HEX | RGB | Rol Funcional & Contexto |
| :--- | :--- | :--- | :--- | :--- |
| `--color-ground-navy` | **Deep Navy** | `#13334C` | `19, 51, 76` | Color primario de marca; barras de navegación, encabezados diurnos y autoridad. |
| `--color-ground-navy-dark` | **Cockpit Navy Dark** | `#071520` | `7, 21, 32` | Canvas del Modo Oscuro OLED; elimina deslumbramientos en cabina nocturna. |
| `--color-accent-lime` | **Neon Lime Green** | `#00E676` | `0, 230, 118` | Acento vital disruptivo; botones principales (CTAs), estados óptimos y halos *Glow*. |
| `--color-accent-lime-hover` | **Neon Lime Glow** | `#00FF83` | `0, 255, 131` | Estado hover y foco de elementos interactivos. |
| `--color-pop-white` | **Bright White** | `#FFFFFF` | `255, 255, 255` | Tarjetas diurnas de alto contraste, modales y textos principales nocturnos. |
| `--color-surface-card` | **Mid Navy Card** | `#0F2A3F` | `15, 42, 63` | Superficie de elevación Nivel 1 en Dark Mode (tarjetas, paneles). |
| `--color-surface-light` | **Urban Mist** | `#F4F6F9` | `244, 246, 249` | Fondo general diurno; previene encandilamiento en pantallas móviles. |
| `--color-text-dark` | **Slate Charcoal** | `#1E293B` | `30, 41, 59` | Tipografía de lectura prolongada sin fatiga ocular en modo claro. |
| `--color-text-muted` | **Cool Steel** | `#64748B` | `100, 116, 139` | Textos secundarios, metadatos y etiquetas técnicas inactivas. |

### 3.1. Ratios de Contraste y Accesibilidad (WCAG 2.1)
- **Modo Diurno:** `#00E676` sobre `#13334C` ofrece **7.4:1** (Certificación **AAA**).
- **Modo Oscuro OLED:** `#00E676` sobre `#071520` alcanza **12.1:1**, permitiendo lectura instantánea con el teléfono montado en el tablero del auto sin encandilar al chofer.

---

## 🔤 4. Sistema Tipográfico

Tres familias tipográficas con roles claramente asignados:

1. **Titulares & Señalética de Alto Impacto:**
   - **Fuente:** `'Oswald', sans-serif`
   - **Pesos:** `Bold 700`, `SemiBold 600`.
   - **Uso:** H1, H2, H3, nombres de modelos vehiculares, precios principales y porcentajes de compatibilidad (*Match Score*).
2. **Lectura, UI & Componentes:**
   - **Fuente:** `'Poppins', sans-serif` *(o 'Inter'/'Albert Sans')*
   - **Pesos:** `Regular 400`, `Medium 500`, `SemiBold 600`.
   - **Uso:** Párrafos de asesoría, menús de navegación, labels de formulario, botones y descripciones.
3. **Telemetría, Datos Técnicos & OBD-II:**
   - **Fuente:** `'JetBrains Mono', monospace`
   - **Pesos:** `Regular 400`, `Bold 700`.
   - **Uso:** Códigos de falla DTC (ej. `P0420`), lecturas de sensores CAN-bus, VIN, consumos L/100km y especificaciones de motor.

---

## 🕹️ 5. UI Kit y Patrones de Interacción

### 5.1. Botones y Llamadas a la Acción (CTAs)
- **Botón Primario (Vitality Action):**
  ```css
  background: #00E676;
  color: #13334C; /* O #071520 en Dark Theme */
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 230, 118, 0.35);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  ```
- **Hover:**
  ```css
  background: #00FF83;
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 230, 118, 0.55);
  ```
- **Botón Secundario (Ghost):**
  ```css
  background: transparent;
  border: 1.5px solid #E2E8F0; /* rgba(255,255,255,0.2) en Dark Theme */
  color: var(--color-text-dark);
  border-radius: 12px;
  ```

### 5.2. Radios de Geometría Táctil
- `12px`: Botones e inputs.
- `16px`: Tarjetas de asesoría, fichas vehiculares y cajas de diagnóstico.
- `24px`: Paneles modales, marcos de maquetas y contenedores maestros.
- `999px` (Pill): Badges de estado, chips de peritaje y filtros de categoría.

### 5.3. Semáforos Amigables de Peritaje (Cero Ansiedad)
- 🟢 **Verde Óptimo (`#00E676`):** *Sistema Nominal // Cero Códigos de Falla // Compra 100% Segura*.
- 🟡 **Ámbar Preventivo (`#F59E0B`):** *Mantenimiento Preventivo Sugerido // Revisión Leve*.
- 🔴 **Rojo Prioritario (`#DC2626`):** *Revisión Prioritaria en Taller Aliado // Alerta Estructural*.

---

## 💻 6. Tokens CSS Listos para Implementar

Siempre que construyas o modifiques código CSS/HTML en la app, usa este bloque de variables:

```css
/* Tokens Base & Modo Claro (Urban Light) */
:root {
  --color-ground-navy: #13334C;
  --color-ground-navy-dark: #071520;
  --color-ground-navy-mid: #0F2A3F;
  --color-accent-lime: #00E676;
  --color-accent-lime-hover: #00FF83;
  --color-pop-white: #FFFFFF;
  --color-text-primary: #1E293B;
  --color-text-muted: #64748B;
  --color-surface-light: #F4F6F9;
  --color-surface-card: #FFFFFF;

  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-card: 16px;
  --radius-panel: 24px;
  --radius-btn: 12px;
  --radius-pill: 999px;

  --shadow-diffuse: 0 10px 30px rgba(19, 51, 76, 0.08);
  --shadow-neon-glow: 0 8px 25px rgba(0, 230, 118, 0.35);
}

/* Tokens Modo Oscuro (Cockpit OLED) */
[data-theme="dark"], body.dark-theme {
  --color-surface-light: #071520;
  --color-surface-card: #0F2A3F;
  --color-surface-elevated: #13334C;
  --color-text-primary: #F8FAFC;
  --color-text-muted: #94A3B8;
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-accent: rgba(0, 230, 118, 0.4);
  --shadow-diffuse: 0 15px 45px rgba(0, 0, 0, 0.6);
  --shadow-neon-glow: 0 0 25px rgba(0, 230, 118, 0.5);
}
```

---

## 📁 7. Ubicación Canónica de Archivos y Recursos

Todos los recursos gráficos y la documentación oficial de marca se encuentran centralizados en:

```text
marketing/branding/
├── BRANDBOOK.md                                    # Brandbook maestro oficial
├── MANUAL_DE_MARCA.md                              # Guía oficial de identidad
├── MANUAL_DE_IDENTIDAD_OFICIAL_CHARU_MOTORHUB.md  # Especificación exhaustiva (392 líneas)
├── manual_identidad_urban_vitality.html            # Visor interactivo web completo
├── manual_identidad.html                           # Visor interactivo web principal
├── generate_brand_manual_html.py                   # Compilador de los visores HTML
└── assets/                                         # PACK MAESTRO DE ACTIVOS
    ├── Charu_motorhub_logo.jpg                     # Tablero oficial HD (2752×1536 px)
    ├── charu_logo_lockup.jpg                       # Imagotipo oficial renderizado
    ├── charu_paw_symbol.jpg                        # Isotipo La Huella Mecánica
    ├── charu_paw_icon.png                          # PNG transparente para apps / favicons
    ├── app_urban_vitality_light.jpg                # Maqueta oficial Modo Claro (1920×1080)
    ├── app_urban_vitality_dark.jpg                 # Maqueta oficial Modo Oscuro (1920×1080)
    ├── app_urban_vitality.jpg                      # Maqueta general
    └── charulo_personaje_animado_comic.jpg         # Retrato oficial de Charulo Mech-Dog
```

---

## ⚡ 8. Reglas Críticas de Desarrollo y Flujo

1. **Protocolo de Servidor Local (`app-server-lifecycle`):**
   - Antes de tocar archivos de la app en `app/`, detener el servidor activo (`kill` en `manage_task` o liberar puerto 8080).
   - Aplicar modificaciones y verificar paridad de etiquetas HTML y coherencia técnica.
   - Levantar nuevamente `python serve_local_app.py` en modo daemon (`IsDaemon: true`) y verificar HTTP 200 en `http://localhost:8080`.
2. **Política Estricta de GitHub:**
   - **NUNCA** hacer commits ni pushes automáticos. Solo sincronizar con Git cuando el usuario lo ordene de forma expresa.
3. **Consistencia Gráfica:**
   - Mantener siempre la dualidad de colores `#13334C` y `#00E676` en cualquier elemento interactivo.
   - Enriquecer vistas vacías (*Empty States*) o asistentes interactivos con la presencia de **Charulo**, el copiloto leal.
