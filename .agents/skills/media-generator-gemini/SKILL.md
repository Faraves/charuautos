---
name: generate-nanobanana
description: "Genera y edita imágenes y videos con los modelos multimedia Gemini de Google (Nano Banana 2/Pro, Gemini Omni Flash), con control de aprobación de costos, soporte para imágenes de referencia y un registro JSON por cada llamada."
category: media
risk: critical
source: community
source_repo: AntonioCardenas/generate-nanobanana
source_type: community
date_added: "2026-08-04"
author: antonio
tags: [nanobanana, gemini, google-ai-studio, generacion-imagenes, generacion-videos]
tools: [claude, cursor, gemini, codex, antigravity]
license: "MIT"
license_source: "https://github.com/AntonioCardenas/generate-nanobanana/blob/main/LICENSE"
---

# Generar Nanobanana (Generate Nanobanana)

## Descripción General

`generate-nanobanana` invoca los modelos multimedia Gemini de Google directamente a través de la API de Gemini —sin capas de enrutamiento intermedias de terceros— para generar y editar imágenes y videos. Enruta cada solicitud al nivel de modelo adecuado (borrador, estándar, calidad o video), carga imágenes de referencia reales en lugar de depender únicamente de descripciones de texto, restringe cada llamada de pago bajo la aprobación explícita del usuario y escribe un archivo complementario (sidecar) `.json` junto a cada salida registrando el prompt exacto, el modelo y el costo. Registra el comando único `/generate`.

Esta habilidad adapta el flujo de trabajo (enrutamiento de modelos, manejo de imágenes de referencia, registro en sidecars) desde [AntonioCardenas/generate-nanobanana](https://github.com/AntonioCardenas/generate-nanobanana). Las estructuras de solicitud reales en `references/` se verificaron de forma independiente con la documentación en vivo de [Gemini API docs](https://ai.google.dev/gemini-api/docs/image-generation) en lugar de copiarse directamente del repositorio original. Los IDs de modelos, contratos de solicitud y tarifas se actualizan según los lineamientos de Google: vuelve a verificar con la documentación enlazada antes de confiar ciegamente en una sesión nueva.

## Cuándo Utilizar Esta Habilidad

- Cuando el usuario solicite generar, crear o producir una imagen o video, o requiera una miniatura (thumbnail).
- Cuando el usuario desee animar una imagen estática, o indique "generar bajo la marca" ("on brand") o "generar a partir de referencia".
- Cuando el usuario quiera vincular o importar una carpeta de imágenes de referencia (logotipos, rostros, fotos de producto) para su reutilización en múltiples generaciones.
- Cuando el usuario ejecute `/generate` o `/generate frf <set>`, incluso sin nombrar un modelo específico.

## Cómo Funciona

### Paso 1: Enrutar a un modelo

Selecciona el modelo adecuado para la tarea y consulta su archivo de referencia en [`references/`](references/) antes de ejecutar llamadas: cada archivo contiene la estructura de petición verificada para dicho modelo.

| Tarea | Modelo | ID del Modelo | Referencia |
| --- | --- | --- | --- |
| Imagen (borrador/rápido) | Nano Banana 2 Lite | `gemini-3.1-flash-lite-image` | [`references/gemini-3.1-flash-lite-image.md`](references/gemini-3.1-flash-lite-image.md) |
| Imagen (estándar) | Nano Banana 2 | `gemini-3.1-flash-image` | [`references/gemini-3.1-flash-image.md`](references/gemini-3.1-flash-image.md) |
| Imagen (alta calidad, fusión múltiple) | Nano Banana Pro | `gemini-3-pro-image` | [`references/gemini-3-pro-image.md`](references/gemini-3-pro-image.md) |
| Video | Gemini Omni Flash | `gemini-omni-flash-preview` | [`references/gemini-omni-flash-preview.md`](references/gemini-omni-flash-preview.md) |

Los cuatro modelos se invocan mediante la **API de Interacciones** (`client.interactions.create(...)`, REST `POST /v1beta/interactions`). Toda llamada es facturable; consulta el Paso 3.

Genera borradores primero en Nano Banana 2 Lite y vuelve a procesar la opción elegida en Nano Banana 2 o Pro; reserva la versión Pro para fusiones complejas de múltiples imágenes, series con consistencia de personajes o textos densos incrustados en la imagen.

### Paso 2: Cargar referencias

Extrae imágenes de referencia reales desde `generations/refs/`, o desde un conjunto de referencias con nombre cuando la solicitud indique "bajo la marca" o invoque `/generate frf <set>`. Nunca reemplaces una imagen de referencia existente (logo, rostro, marca gráfica) por una simple descripción de texto: detén el proceso y pregunta si falta una referencia en lugar de aproximarla.

Los conjuntos de referencias se registran mediante **importación** (copiando archivos en `generations/refs/<set>/`, como instantánea) o **enlace** (registrando la ruta de origen en `generations/refs/sets.json`, leída en tiempo de generación). Un conjunto puede incluir un archivo `style.md` cuyo contenido se antepone textualmente a cada prompt generado para ese conjunto.

### Paso 3: Generar

Ejecuta la llamada a la API de Gemini según el archivo de referencia del modelo. **Cada generación (imagen o video) es facturable y requiere una compuerta de aprobación explícita**: cotiza el precio unitario vigente desde la [página de precios en vivo](https://ai.google.dev/gemini-api/docs/pricing) para el modelo seleccionado y obtén la autorización expresa del usuario antes de dicha llamada. Una aprobación cubre exactamente una llamada; una regeneración requiere su propia aprobación. Ejecuta las generaciones una a una, nunca en paralelo, para garantizar la precisión en costos y aprobaciones.

Ningún modelo en esta habilidad documenta un parámetro de semilla (`seed`) o reproducibilidad garantizada: no prometas una regeneración idéntica. Para solicitudes como "la misma imagen pero cambiando X", reutiliza el prompt original exacto y las imágenes de referencia (desde el registro sidecar) y modifica únicamente la variación solicitada; para video, encadena ediciones a través de `previous_interaction_id` si es compatible.

### Paso 4: Verificar y registrar en bitácora

Confirma que el archivo generado esté guardado en disco y no esté vacío; luego, escribe un archivo sidecar `.json` complementario junto a él (ver Ejemplos) registrando el ID exacto del modelo, prompt, referencias empleadas, `id` de respuesta, costo y marca de tiempo. Nunca registres una generación cuyo archivo no exista físicamente, y nunca crees un sidecar para una llamada fallida o bloqueada por políticas de seguridad.

## Ejemplos

### Ejemplo 1: Miniatura corporativa desde un conjunto de referencias vinculado

```
Usuario: genera una miniatura con la identidad de marca para la nueva página de precios
```

La habilidad localiza el conjunto de referencias `brand` en `generations/refs/sets.json`, antepone su archivo `style.md` (si existe), selecciona las imágenes pertinentes (ej. el logotipo y una captura de estilo), cotiza el costo actual en Nano Banana 2 Lite, obtiene la aprobación del usuario y guarda el resultado en `generations/pricing_page_thumbnail_<timestamp>.png` junto a su archivo sidecar.

### Ejemplo 2: Registro Sidecar generado junto a una salida

```json
{
  "model": "gemini-3.1-flash-lite-image",
  "prompt": "prompt exacto enviado",
  "reference_images": ["generations/refs/brand/logo_dark.png"],
  "reference_set": "brand",
  "response_id": "v1_...",
  "params": { "aspect_ratio": "16:9", "image_size": "1K" },
  "cost": "$0.02 USD (precio cotizado en vivo antes de la ejecución)",
  "created": "2026-07-31T14:20:00Z",
  "approved_by_user": true
}
```

## Buenas Prácticas

- ✅ Cotiza el precio vigente y obtén aprobación explícita antes de **cada** generación de pago —tanto para imágenes como para videos—. Una cotización no equivale a una aprobación, y cada regeneración requiere su propio permiso.
- ✅ Utiliza imágenes de referencia auténticas para rostros, logotipos e identidades de marca en lugar de describirlos en texto.
- ✅ Consulta el archivo de referencia del modelo en `references/` antes de llamarlo.
- ❌ No generes "bajo la marca" a partir de un conjunto de referencias vacío o inexistente: prepara la carpeta primero y espera a que tenga al menos una imagen real.
- ❌ No prometas que una generación será 100% reproducible: ningún modelo aquí documenta semillas (`seed`). Reutiliza los prompts y referencias exactas en su lugar.
- ❌ No ejecutes generaciones en paralelo ni reconstruyas prompts de memoria si el archivo sidecar original contiene el texto fidedigno.

## Limitaciones

- Cubre exclusivamente modelos de Google Gemini; no cuenta con enrutamiento multiproveedor a otros generadores de imagen/video.
- Requiere una clave de API de Google AI Studio (`GEMINI_API_KEY`) y el paquete de Python `google-genai` si se ejecuta fuera de Antigravity.
- Sin parámetro de semilla documentado: las repeticiones son aproximadas a partir del prompt y referencias guardadas.
- Los identificadores de modelos y precios los gestiona Google y están sujetos a cambios.
- No sustituye la validación o revisión visual humana de los activos generados.
- Detén la acción y pide aclaraciones si falta una imagen de referencia, permisos o la API key.

## Seguridad y Privacidad

- **Red:** Las peticiones de generación y transferencia van a `generativelanguage.googleapis.com`; la consulta de documentación o precios contacta a `ai.google.dev`. Nunca envíes prompts ni material de referencia a ningún otro endpoint no autorizado.
- **Secretos:** `GEMINI_API_KEY` solo se lee desde las variables de entorno o desde el archivo `.env` configurado por el usuario; nunca se muestra en consola, ni se imprime en logs, prompts o archivos sidecar.
- **Escritura en disco:** Las salidas generadas por este skill se confinan estrictamente a la carpeta `generations/` del espacio de trabajo.
- **Costos:** Cada invocación consume saldo real en Google AI Studio; por esta razón, la habilidad está clasificada con nivel de riesgo `critical`.

## Problemas Frecuentes y Soluciones

- **Problema:** Solicitar generación "bajo la marca" antes de que existan imágenes de referencia.
  **Solución:** Crear la carpeta `generations/refs/<nombre>/`, informar la ruta al usuario y pausar hasta contar con al menos una imagen.
- **Problema:** Variar una imagen existente reescribiéndola de memoria.
  **Solución:** Consultar el sidecar original para obtener el prompt y referencias exactas, y alterar únicamente el delta requerido.
- **Problema:** Ejecutar una llamada sin cotización previa de costo.
  **Solución:** Cotizar siempre el precio unitario y aguardar confirmación expresa antes de enviar cualquier petición facturable.