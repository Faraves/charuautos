---
name: charu-arquitectura
description: Manual de arquitectura, UX/UI, componentes y decisiones de diseño del proyecto Charu motorhub (Venezuela).
---

# 📖 Charu motorhub: Contexto y Arquitectura Core

Bienvenido, Agente. Si estás leyendo esto, estás a punto de modificar el código de **Charu motorhub**. Este documento contiene todo el conocimiento acumulado sobre el funcionamiento de la app, su identidad visual, y los estándares de código que DEBES respetar para no romper nada.

## 🎯 1. Visión del Producto
Charu motorhub es una PWA (Progressive Web App) diseñada específicamente para el mercado venezolano. Su objetivo es democratizar la información técnica automotriz, haciéndola accesible y amigable para usuarios "novatos" que temen ser estafados en talleres mecánicos.
- **Tono de Voz:** "Mecánico de Confianza". Empático, honesto, explica los términos técnicos sin jerga intimidante.
- **Público Objetivo:** Compradores de autos sin experiencia, usuarios que buscan entender qué significa la luz de "Check Engine" sin tecnicismos robóticos.

## 🎨 2. Identidad Visual y UX/UI (Modo Claro Premium)
La aplicación fue migrada exitosamente de un modo oscuro pesado a un **Modo Claro** limpio, profesional y corporativo.

**Reglas de Diseño (¡No las rompas!):**
1. **Modo Dual:** El CSS base (`:root`) está en modo oscuro (Cockpit OLED) para respaldar navegadores antiguos, pero mediante JS (`[data-theme="light"]`) se inyecta la paleta Urban Light.
2. **Cero colores quemados (Hardcoded):** NUNCA inyectes colores hexadecimales estáticos (como `#090e18`, `#fff`, `#cbd5e1` o `rgba` oscuros) directamente en el HTML o JS. TODO debe usar variables dinámicas:
   - Fondos: `var(--bg-card)`, `var(--bg-card-alt)`, `var(--bg-glass)`.
   - Textos: `var(--text-main)`, `var(--text-secondary)`, `var(--text-muted)`.
   - Bordes: `var(--border-subtle)`, `var(--border-medium)`.
3. **El Logo:** "CHARU" usa `var(--text-main)` (Azul marino profundo) con peso 900. "motorhub" usa `var(--green)` (`#10b981`) con un sutil `drop-shadow` para que contraste perfectamente en fondos blancos.

## 🗺️ 3. Navegación (Sidebar Hover)
Se eliminaron por completo la barra flotante inferior y la botonera del encabezado (`.bottom-nav`, `.desktop-nav`). 
- Toda la navegación se controla a través del **Menú Lateral Retráctil** (`<nav class="sidebar-nav">`).
- En Desktop: Está fijo a la izquierda, mide 60px y se expande a 220px al hacer hover.
- En Móvil: Se transforma mediante Media Queries (`max-width: 768px`) en un **Botón de Acción Flotante (FAB)** en la esquina inferior izquierda.
- Nomenclatura oficial de secciones: **"Asesor de Compra"** (antes Matchmaker), **"Códigos de Fallas"** (antes Escáner OBD2), **"Comparador"** y **"Mi Garage"**.

## 🧠 4. Arquitectura Frontend (Vanilla JS)
La aplicación es "Vanilla", no usa frameworks pesados como React o Angular. Toda la interactividad corre en `app.js`.

**Peligros Conocidos y Lecciones Aprendidas:**
- **Cuidado con los "Find and Replace":** Las clases CSS y nombres de variables en JS utilizan las palabras en inglés (`Matchmaker`, `OBD`, `tab-matchmaker`). Si haces un reemplazo de texto masivo para "traducir" la app (ej. cambiar `Matchmaker` por `Asesor de Compra`), romperás funciones como `updateMatchmaker()` y la app se bloqueará, perdiendo el parseo del DOM y forzando un retorno erróneo al modo oscuro. Traduce SOLAMENTE los textos visibles (`innerHTML`, `textContent`).

## 🛠️ 5. Módulo OBD-II (Códigos de Fallas)
Este módulo traduce códigos DTC (Data Trouble Codes) a un lenguaje humano.
- **Sistema de Semáforo:** No mostramos paredes de texto técnico. Inyectamos dinámicamente un ícono gigante de semáforo (Verde, Amarillo, Rojo) indicando la gravedad.
- **Caja Anti-Estafas:** La explicación técnica real (probabilidades, checklist anti-engaño) está Oculta por defecto. El usuario debe hacer clic en un botón "🛠️ Ver detalles para mi mecánico" para desplegarla.
- **Base de datos (`DTC_DB` en `app.js`):** Contiene el código, severidad, descripción amigable, contexto venezolano, causas probables y preguntas checklist.

## 💾 6. Caching y PWA
La app está servida vía GitHub Pages y tiene un Service Worker agresivo (`sw.js`).
- Siempre que modifiques archivos estáticos (`app.js`, `index.html`), PIDE al usuario que haga un *Hard Refresh* (Ctrl + F5).
- En caso de despliegues grandes, actualiza la constante `CACHE_NAME` en `sw.js` (ej. `v3`, `v4`).
