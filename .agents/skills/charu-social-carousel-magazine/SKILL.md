---
name: charu-social-carousel-magazine
description: Motor canónico y flujo de bajo consumo de tokens para diseñar, renderizar y subir a Google Drive los carruseles de Instagram (1080x1350 px) de @charuautopics bajo el "Estilo 3 — Acción Atmosférica / Editorial Magazine" (6 a 10 láminas) con bloqueo de proporción 1:1, auditoría anti-pixelación y balance 50/50 entre versiones del mercado venezolano. Úsalo siempre que el usuario pida crear o actualizar el post/carrusel de un vehículo.
---

# Skill Canónica: Carruseles Editoriales `@charuautopics` (Estilo 3 Magazine)

Esta skill reduce en un **75%–85% el gasto de tokens** y evita re-trabajos en cada nuevo vehículo al reemplazar la generación manual de código HTML/CSS/SVG por el **motor Python parametrizado (`render_magazine_carousel.py`)** con validaciones automáticas integradas y la **caché local de fuentes WOFF2 (`fonts_cache.css`)**.

---

## 🎯 1. Reglas Visuales, Técnicas y Editoriales Innegociables (Cero Re-Trabajos)

1. **Fidelidad Estricta al Mercado Venezolano (Cero Versiones o Colores No Comercializados):**
   - Priorizar siempre las imágenes oficiales de Venezuela: **Ficha Técnica PDF**, **portal web oficial de la marca en Venezuela**, **Instagram/Facebook de concesionarios locales** y **fotografías reales suministradas por el usuario**.
   - **Prohibido** incluir colores de carrocería, frentes o motorizaciones de galerías globales que no se comercialicen en Venezuela.
2. **Balance Visual 50/50 entre Versiones (Exteriores e Interiores):**
   - Cuando un vehículo se comercialice en **2 o más versiones/transmisiones** (ej. *Classic Sincrónica 6MT* vs. *Classic/Premium Automática 7DCT*):
     - **Equilibrio 50/50 en láminas:** Asignar la mitad de las láminas a fotografías reales de la Versión A y la otra mitad a fotografías de la Versión B.
     - **Doble Interior Obligatorio (Comparativa de Transmisión):** Nunca repetir dos láminas de interior de la misma versión. Incluir **1 lámina con la cabina/palanca de la versión base/sincrónica** y **1 lámina con la cabina/selector de la versión tope/automática** (preferir encuadres cuadrados/verticales donde se aprecie en primer plano el mecanismo de transmisión, volante y pantallas).
3. **Bloqueo Matemático de Proporción `1:1` (Cero Estiramiento):**
   - `make_magazine_scene()` utiliza `ImageOps.fit(..., method=Image.Resampling.LANCZOS, centering=crop_centering)` para garantizar que la carrocería, rines, volante y consola mantengan su geometría original `1:1` sin estiramientos horizontales ni verticales.
4. **Auditoría Automática Anti-Pixelación (`>= 800×500 px` tras recorte):**
   - El motor verifica automáticamente que el área efectiva después de `crop_box` tenga al menos `800×500 px`. Si una imagen tiene baja resolución o texto promocional superpuesto, reemplazarla por un activo Ultra-HD del portal oficial o limpiarla en estudio antes de renderizar.
5. **Protocolo de Retoque de Estudio HD (Para Fotos de Concesionario / Marketplace):**
   - Cuando se utilicen fotografías reales tomadas en calle, galpones o concesionarios:
     - **Eliminar matrículas o placas de terceros** y colocar un portaplacas oficial de exhibición en negro mate con el nombre del modelo.
     - **Reemplazar fondos distractores** (galpones, banderines, cables, edificios, rejas, otros vehículos) por un pabellón arquitectónico moderno o fondo de estudio limpio.
     - **Limpiar el habitáculo y textos superpuestos:** Retirar papeles en las alfombras/pedales, objetos colgantes del retrovisor o cuadros promocionales de texto, respetando al 100% los rasgos originales de esa versión (parrilla, faros, rines, asientos de tela o cuero, palanca o perilla).
6. **Escala Dinámica del Carrusel (6 a 10 Láminas) y Ángulos Distintos:**
   - **6 Láminas:** Para modelos de 1 sola versión o comparativas simples.
   - **10 Láminas:** Para modelos con múltiples versiones y alto nivel de detalle técnico (Portada, Estética Exterior A vs B, Motor, Duelo de Cajas, Plataforma/Dimensiones, Chasis/Cauchos/Frenos, Iluminación, Seguridad/Airbags, Cabina/Conectividad, Resumen de Precios).
   - **Prohibido repetir la misma foto en distintas láminas** (el motor emite una alerta automática si detecta `image_path` duplicado).
7. **Sello Editorial Venezolano (`@charuautopics`):**
   - Usar siempre **"los huecos"** (nunca *"las bateas"*).
   - Cero meta-etiquetas como *"VEREDICTO DE CHARU"* o *"COMENTARIO EN EL POST"*.
   - Footer único con ícono de tacómetro + `@charuautopics` a la izquierda y CTA en cian a la derecha.
   - Entregar siempre en la respuesta final el **Caption corto de alto engagement para Instagram**, crear obligatoriamente el archivo **`imagenes_y_posts/IDEAS_CAPTIONS_INSTAGRAM.txt`** dentro de la carpeta del vehículo y depositar una nota **`slides_png/CAPTION_PROPUESTO.txt`** directamente en la carpeta de las láminas PNG finales (y en su subcarpeta en Google Drive).

---

## ⚡ 2. Flujo de Ejecución Rápido y Renderizado Selectivo (Ahorro de Tokens)

Para cada nuevo vehículo en `d:\Proyectos\CharuAutos\marketing\social_media\Vehiculos\<Marca>\<Modelo>\`:

1. **Cuestionario Preventivo Único (Antes de Renderizar):**
   - Antes de generar las láminas, validar en una sola consulta con el usuario: precios exactos por versión en Venezuela, cantidad de láminas (6 o 10) y distribución 50/50 de las imágenes disponibles.
2. **Extraer, Normalizar y Crear Notas de Captions:** Crear `informacion/FICHA_TECNICA_NORMALIZADA.md`, `imagenes_y_posts/COPIES_Y_ESTRATEGIA_REDES.md`, **`imagenes_y_posts/IDEAS_CAPTIONS_INSTAGRAM.txt`** y **`slides_png/CAPTION_PROPUESTO.txt`**.
3. **Generar `carousel_config.json` y ejecutar el Motor:**
   - **Renderizado completo:**
     ```powershell
     python "d:\Proyectos\CharuAutos\.agents\skills\charu-social-carousel-magazine\scripts\render_magazine_carousel.py" "d:\Proyectos\CharuAutos\marketing\social_media\Vehiculos\<Marca>\<Modelo>\imagenes_y_posts\carousel_config.json"
     ```
   - **Renderizado selectivo (`--only`):** Si solo se ajusta 1 o 2 láminas, usar `--only 8,9` para renderizar en 1 segundo únicamente esas láminas sin reprocesar todo el carrusel:
     ```powershell
     python "d:\Proyectos\CharuAutos\.agents\skills\charu-social-carousel-magazine\scripts\render_magazine_carousel.py" "...\carousel_config.json" --only 8,9
     ```
4. **Verificar y Subir a Google Drive (`FOLDER_ID`: `1Nr2KyuZuuonz1Ke2OKsGMx3SmJHwAp1r`):**
   - Inspeccionar las láminas generadas con `read_file`.
   - Al copiar al directorio de artifacts para mostrar al usuario, usar un nombre de archivo único si hubo cambios previos para evitar colisiones de caché visual en el chat.
   - Crear o actualizar la subcarpeta `<Marca Modelo> (slides_png)` en Google Drive usando `gdrive mutate upload` o `gdrive mutate update`.

---

## 📄 3. Esquema de Referencia de `carousel_config.json`

- Soporta `dock_type: "dual_cover"` (Portada comparativa), `"comp_table"` (Tabla comparativa 2 columnas: Cian vs. Ámbar) y `"single_table"` (Tabla editorial para vehículos de 1 sola versión).
- Soporta `crop_box: [x1, y1, x2, y2]` y `crop_centering: [0.5, 0.5]` con bloqueo de proporción `1:1`.
- Clases de resaltado en filas: `"cyan-big"` (`#00F2FE`, `23px`) y `"amber-big"` (`#FF9E2C`, `23px`).
