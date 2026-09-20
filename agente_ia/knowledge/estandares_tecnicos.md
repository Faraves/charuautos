# Estándares Técnicos y Normativas Automotrices — CharuAutos

Compendio de referencia para el Agente IA al verificar afirmaciones técnicas, tolerancias, especificaciones de fluidos y procedimientos de seguridad.

---

## 1. Viscosidad y Clasificación de Aceites de Motor (SAE J300 & API/ACEA)
- **Norma SAE J300:** Define la viscosidad cinemática y dinámica a bajas (`W` = Winter) y altas temperaturas (100°C / 150°C HTHS).
- **Ejemplo `5W-30`:**
  - `5W`: Bombeabilidad fluida en frío (-30°C a -35°C).
  - `30`: Película hidrodinámica de protección a temperatura operativa del motor (100°C).
- **Categorías de Servicio API:**
  - Gasolina: SP (la más moderna para mitigar LSPI en motores turbo GDI), SN PLUS, SN.
  - Diésel: CK-4, CJ-4.
- **Regla Fundamental:** Jamás recomendar "subir la viscosidad a 20W-50 porque el auto tiene más de 100,000 km" (mito peligroso que destruye variadores de fase VVT y cadenas de tiempo).

---

## 2. Líquidos de Frenos (DOT 3, DOT 4, DOT 5.1 vs DOT 5)
- **Higroscopicidad:** Los líquidos con base de poliglicol (DOT 3, 4 y 5.1) absorben humedad del ambiente con el tiempo, reduciendo su punto de ebullición húmedo (peligro de *Vapor Lock*).
- **Incompatibilidad Fatal:** El líquido **DOT 5 es de base silicona** y **NUNCA** debe mezclarse con DOT 3, 4 ni 5.1 ni utilizarse en sistemas con ABS tradicional.
- **Intervalo de Cambio:** Cada 2 años o 40,000 km independientemente del kilometraje.

---

## 3. Refrigerantes y Anticongelantes (ASTM D3306)
- **IAT (Inorganic Acid Technology):** Verde tradicional (silicatos), duración corta (~2 años / 40,000 km).
- **OAT (Organic Acid Technology):** Naranja/Rojo/Rosa (ácidos orgánicos de larga duración), hasta 5 años / 150,000 km.
- **HOAT (Hybrid OAT):** Amarillo/Azul (híbrido común en marcas europeas y asiáticas).
- **Regla de Oro:** NUNCA usar agua de grifo (genera cavitación, sarro galvánico y óxido). Utilizar mezcla 50/50 de agua desmineralizada y etilenglicol con la especificación del fabricante.

---

## 4. Neumáticos: Código DOT y Medidas (FMVSS 109 / 139)
- **Nomenclatura (Ej: `205/55 R16 91V`):**
  - `205`: Ancho de sección en milímetros.
  - `55`: Perfil o relación de aspecto (55% de 205 mm = 112.75 mm).
  - `R`: Construcción radial.
  - `16`: Diámetro de la llanta en pulgadas.
  - `91`: Índice de carga (615 kg por neumático).
  - `V`: Código de velocidad máxima (hasta 240 km/h).
- **Código DOT (Fecha de Fabricación):** Los últimos 4 dígitos indican `Semana y Año` (Ej: `2823` = Semana 28 del año 2023). Vida útil máxima recomendada: 5 a 6 años desde fabricación.
- **Profundidad mínima legal de la banda:** 1.6 mm (marcador TWI). Recomendado de seguridad: 3 mm en mojado.

---

## 5. Diagnóstico a Bordo (OBD-II / ISO 15031)
- **Estructura del Código DTC (Ej: `P0300`):**
  - Primer carácter: `P` (Powertrain / Motor y Caja), `B` (Body), `C` (Chassis), `U` (Network / Comunicación).
  - Segundo carácter: `0` (Estándar genérico SAE/ISO), `1` (Específico del fabricante).
  - Tercer dígito: Subsistema (`1` = Medición combustible/aire, `3` = Sistema de encendido, etc.).
  - Cuarto y quinto: Falla puntual (`00` = Misfire múltiple o aleatorio detectado).

---

## 6. Turbocompresores: La Regla de los 60 Segundos
- Los turbocompresores giran hasta a **200,000 – 280,000 RPM** y operan con gases de escape a más de **850°C - 950°C**.
- **Regla al encender:** Esperar 30 segundos antes de acelerar bruscamente para que el aceite frío alcance el eje flotante.
- **Regla al apagar tras autopista/carga:** Mantener el motor en ralentí durante **60 segundos** antes de apagar la llave. Evita la coquización del aceite residual en los cojinetes al cesar repentinamente el flujo de refrigeración.
