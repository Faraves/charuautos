---
name: gemini-pdf-extraction
description: >-
  Instrucciones maestras y arquitectura técnica para la lectura, extracción y normalización de datos desde archivos PDF utilizando el motor de Inteligencia Artificial Gemini de Google (Flash Lite) mediante su API REST en el frontend. Usar esta skill cuando el usuario requiera extraer datos de un PDF, modificar el prompt del asesor de compra, o agregar nuevas medidas de seguridad/validación.
---

# Blindaje de Extracción de PDFs con IA (Gemini) en CharuAutos

Esta skill documenta la arquitectura implementada en `app/public/app.js` (específicamente en las funciones `parseAndAddPdfVehicle` y `extractTextFromPdfFile`) para procesar Fichas Técnicas Automotrices pesadas y extraer sus especificaciones estructuradas.

## 1. Pre-Procesamiento del PDF (Evitando el límite de red)
**El problema:** Los PDFs de concesionarios pueden pesar más de 100MB, lo que colapsaría el servidor y excedería el límite de payload de la API REST.
**La solución:** El archivo NUNCA se sube a internet. 
1. Utilizamos la librería `pdfjsLib` en el Frontend (Javascript del navegador).
2. Se lee el archivo como un `ArrayBuffer`.
3. Se itera únicamente sobre las primeras 5 páginas (`Math.min(pdf.numPages, 5)`) y se extrae el texto puro (`getTextContent()`).
4. Se hace un `slice(0, 12000)` al texto para garantizar que no exceda los tokens de la ventana de contexto de Gemini.

## 2. Configuración Estricta de la API de Gemini (Blindaje JSON)
Para evitar "alucinaciones" y forzar a la IA a devolver un objeto JSON impecable que no rompa nuestra base de datos, la petición `fetch` a `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent` DEBE llevar este `generationConfig`:

```javascript
generationConfig: {
  temperature: 0.0, // Cero creatividad, 100% precisión clínica
  responseMimeType: "application/json",
  responseSchema: {
    type: "OBJECT",
    properties: {
      maker: { type: "STRING" },
      model: { type: "STRING" },
      hp: { type: "INTEGER" },
      torque: { type: "INTEGER" },
      clearance: { type: "INTEGER" },
      trunk: { type: "INTEGER" },
      tank: { type: "INTEGER" },
      weight: { type: "INTEGER" },
      engine: { type: "STRING" },
      displacement: { type: "STRING" },
      transmission: { type: "STRING" },
      traction: { type: "STRING" },
      fuelType: { type: "STRING" },
      airbags: { type: "STRING" },
      esp: { type: "STRING" },
      brakes: { type: "STRING" },
      infotainment: { type: "STRING" }
    },
    // Campos obligatorios garantizados por Google
    required: ["maker", "model", "hp", "torque", "clearance", "trunk", "tank", "weight"] 
  }
}
```

## 3. Reglas de Normalización en el Prompt (Ingeniería de Instrucciones)
Para que los vehículos puedan ser comparables en la tabla UI, la IA debe homogeneizar las unidades. El prompt incluye estas directrices fundamentales:
*   **Conversión:** Convertir matemáticamente de CV a HP, de cm3/cc a Litros, y de cm a mm.
*   **Limpieza:** Retornar los valores numéricos limpios (`hp: 147` en lugar de `hp: "147 Caballos"`).
*   **Valores Vacíos (Null Safety):** Si un valor no existe en el texto, el esquema estricto arrojaría un error HTTP si la IA intenta enviar texto (ej: "No Especificado") en un campo `INTEGER`. Por lo tanto, la regla es: *Si no encuentras el valor, devuelve el número 0.*

## 4. Fallback Heurístico Local
Si el dispositivo del usuario no tiene conexión a internet, o la API key expira, la aplicación envuelve el bloque en un `try/catch`. 
En el bloque `catch`, el sistema invoca `extractSpecsFromText(fileName, text)` que utiliza Expresiones Regulares (RegEx) preprogramadas para intentar rescatar la información básica sin IA, garantizando que el usuario jamás se quede bloqueado.
