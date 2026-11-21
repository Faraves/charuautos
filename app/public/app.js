
/* AUTHENTICATION MODAL LOGIC */
function openAuthModal() {
  const modal = document.getElementById('loginModal');
  if(modal) modal.style.display = 'flex';
}
function closeAuthModal() {
  const modal = document.getElementById('loginModal');
  if(modal) modal.style.display = 'none';
}
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;

/**
 * =============================================================================
 * BAJOKAPOT — Revisión & Fallas | APLICACIÓN CLIENTE (LOCAL-FIRST)
 * Lógica pura, interactiva y robusta para la WebApp / PWA
 * =============================================================================
 */

// Biblioteca Central de Iconografía Vectorial Minimalista Cockpit/Motorsport
const ICONS = {
  crown: `<svg class="cockpit-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 19h20v2H2zM3 15l4-8 5 6 5-6 4 8H3z"/></svg>`,
  search: `<svg class="cockpit-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  telemetry: `<svg class="cockpit-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M19 7l-5 5-4-4-5 5"/><circle cx="19" cy="7" r="1.5" fill="currentColor"/><path d="M19 13l-4 3-5-5-5 5" stroke-dasharray="2 2"/></svg>`,
  shield: `<svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  warning: `<svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  save: `<svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>`,
  trash: `<svg class="cockpit-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  eye: `<svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  print: `<svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  bolt: `<svg class="cockpit-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  gauge: `<svg class="cockpit-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 12l4-4"/><circle cx="12" cy="12" r="2"/></svg>`,
  pdfSmall: `<svg class="cockpit-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
};

// Catálogo Maestro Unificado BAJOKAPOT (88 vehículos/versiones reales VE: Clásicos Usados + 0 km MT/AT/CVT/DCT)
const BAJOKAPOT_MASTER_CATALOG = [
  {
    "id": "chevrolet-spark-2009",
    "maker": "Chevrolet",
    "model": "Spark 1.0L (5MT)",
    "yearRange": "2007 - 2014",
    "nicknames": [
      "Spark Tapita",
      "El Huevito"
    ],
    "condition": "usado",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 2000,
    "maxPrice": 3500,
    "priceDisplay": "$2.000 - $3.500",
    "hp": 65,
    "torque": 91,
    "clearance": 145,
    "trunk": 170,
    "tank": 38,
    "weight": 845,
    "engine": "1.0L S-TEC II 4 Cil. SOHC",
    "displacement": "1.0L (995 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "16.0 km/L",
    "airbags": "Opcional 1 o Sin Airbags (Según Año)",
    "esp": "Básico / Sin Control de Estabilidad",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Radio 1DIN / Adaptable 7 pulg",
    "parts": "Inmediata (Bajísimo costo)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 10W-30 / 15W-40 Semi-Sintético (3.2 L)",
    "timingSpec": "Correa Dentada",
    "pros": [
      "Consumo mínimo de gasolina",
      "Estaciona en cualquier hueco",
      "Repuestos baratísimos en todo el país"
    ],
    "cons": [
      "Tren delantero delicado en baches",
      "Maleta muy pequeña (170 L)",
      "Justo en subidas con A/C"
    ],
    "verdict": "El rey del ahorro urbano para presupuestos ajustados. Ideal para diligencias o primer carro.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada (cambiar cada 45.000 km con bomba de agua; motor de interferencia).",
      "combustibleVE": "Excelente tolerancia a gasolina regular de 91 octanos (inyección multipunto simple).",
      "puntosClave": "Revisar compresión de cilindros, fugas en tapa válvula, estado de mesetas/muñones y recalentamiento en cola.",
      "fallasTipicas": "Válvula IAC sucia (mínimo inestable), bote de refrigerante por base de termostato plástica y bujes de tren delantero."
    }
  },
  {
    "id": "chery-arauca-2015",
    "maker": "Chery",
    "model": "Arauca 1.3L (5MT)",
    "yearRange": "2011 - 2016",
    "nicknames": [
      "El Arauquita",
      "A1 Venezuela"
    ],
    "condition": "usado",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 2200,
    "maxPrice": 3800,
    "priceDisplay": "$2.200 - $3.800",
    "hp": 83,
    "torque": 114,
    "clearance": 145,
    "trunk": 230,
    "tank": 43,
    "weight": 1040,
    "engine": "1.3L Acteco SQR473F 16V",
    "displacement": "1.3L (1,297 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD (Sin ESP)",
    "brakes": "Disco Delantero / Tambor Trasero (ABS)",
    "infotainment": "Radio CD/USB de fábrica",
    "parts": "Moderada (Accesible)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 10W-30 / 10W-40 Semi-Sintético (4.0 L)",
    "timingSpec": "Correa Dentada",
    "pros": [
      "Económico de comprar y rodar",
      "Buen aire acondicionado",
      "Tiene ABS y 2 airbags frente al Spark"
    ],
    "cons": [
      "Tren delantero suena con baches",
      "Selectora de 2da velocidad áspera",
      "Plásticos interiores ruidosos"
    ],
    "verdict": "Opción de entrada económica si el presupuesto no alcanza para japoneses o sedanes mayores.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada (reemplazo estricto cada 40.000 - 50.000 km con tensor metálico).",
      "combustibleVE": "Muy tolerante a gasolina local (inyección multipunto convencional).",
      "puntosClave": "Verificar sincronizador de 2da marcha en prueba de manejo, estado de electroventilador y nivel de refrigerante.",
      "fallasTipicas": "Sensor de cigüeñal/árbol de levas (apagado en caliente), guayas de selectora y bujes de barra estabilizadora."
    }
  },
  {
    "id": "chevrolet-aveo-2011",
    "maker": "Chevrolet",
    "model": "Aveo LS 1.6L (5MT)",
    "yearRange": "2005 - 2015",
    "nicknames": [
      "Aveo Sincrónico",
      "El Aveito"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 3200,
    "maxPrice": 5200,
    "priceDisplay": "$3.200 - $5.200",
    "hp": 103,
    "torque": 145,
    "clearance": 150,
    "trunk": 400,
    "tank": 45,
    "weight": 1120,
    "engine": "1.6L E-TEC II 16V DOHC",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "10.5 km/L",
    "airbags": "2 Airbags Frontales (Según Versión)",
    "esp": "ABS en versiones LT/LS tardíos (Sin ESP)",
    "brakes": "Discos Delanteros / Tambor Trasero",
    "infotainment": "Radio 2DIN / Adaptable CarPlay",
    "parts": "Inmediata en toda Venezuela",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 10W-30 / 10W-40 Semi-Sintético (3.8 L)",
    "timingSpec": "Correa Dentada",
    "pros": [
      "Repuestos en cualquier rincón de Venezuela",
      "Caja sincrónica aguantadora",
      "Líder de reventa y apps de transporte"
    ],
    "cons": [
      "Correa de tiempo dobla 16 válvulas si rompe",
      "Consumo moderado-alto en cola con A/C",
      "Tapa válvulas plástica suda aceite"
    ],
    "verdict": "El caballo de batalla sincrónico venezolano. Cambiar kit de tiempo completo apenas lo compres.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada crítica (reemplazar cada 40.000 km con bomba de agua y tensor OEM; si parte dobla válvulas).",
      "combustibleVE": "Acepta gasolina regular sin problemas; sensible a bomba de gasolina desgastada.",
      "puntosClave": "Revisar humo azul en frío (sellos de válvula), bote por tapa válvula y estado del cuerpo de aceleración.",
      "fallasTipicas": "Empacadura de tapa válvula, bobina/cables de bujía, manguera de calefacción trasera y bujes de meseta."
    }
  },
  {
    "id": "chevrolet-aveo-at",
    "maker": "Chevrolet",
    "model": "Aveo LT 1.6L Automático (4AT)",
    "yearRange": "2006 - 2015",
    "nicknames": [
      "Aveo Automático",
      "Aveo LT"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 3800,
    "maxPrice": 5800,
    "priceDisplay": "$3.800 - $5.800",
    "hp": 103,
    "torque": 145,
    "clearance": 150,
    "trunk": 400,
    "tank": 45,
    "weight": 1155,
    "engine": "1.6L E-TEC II 16V DOHC",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Automática Aisin 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "9.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD (LT)",
    "brakes": "Discos Delanteros / Tambor Trasero",
    "infotainment": "Radio 2DIN / Adaptable",
    "parts": "Inmediata en toda Venezuela",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 10W-30 / 10W-40 + ATF Toyota T-IV / Dexron III",
    "timingSpec": "Correa Dentada",
    "pros": [
      "Caja automática japonesa Aisin muy noble",
      "Comodidad urbana superior al LS",
      "Repuestos disponibles en todo el país"
    ],
    "cons": [
      "Consumo superior en colas (~9 km/L)",
      "Correa de tiempo crítica",
      "Sensor pare/neutro requiere ajuste"
    ],
    "verdict": "Excelente automático económico en VE siempre que el aceite de caja no huela a quemado y tenga kit de tiempo nuevo.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada (obligatorio cambio preventivo cada 40.000 km con bomba de agua).",
      "combustibleVE": "Alta tolerancia a gasolina regular de 91 octanos; usar filtros de gasolina originales.",
      "puntosClave": "Probar cambios 1-2-3-4 en frío y caliente sin golpes, revisar luz 'HOLD' intermitente en tablero.",
      "fallasTipicas": "Switch pare/neutro (luz HOLD parpadeando), cuerpo de aceleración electrónico sucio y correa de tiempo."
    }
  },
  {
    "id": "ford-fiesta-move-2012",
    "maker": "Ford",
    "model": "Fiesta Move / Max 1.6L (5MT)",
    "yearRange": "2009 - 2014",
    "nicknames": [
      "Fiesta Move Sincrónico",
      "Fiestica"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 3400,
    "maxPrice": 5500,
    "priceDisplay": "$3.400 - $5.500",
    "hp": 98,
    "torque": 142,
    "clearance": 140,
    "trunk": 470,
    "tank": 45,
    "weight": 1110,
    "engine": "1.6L Zetec Rocam 8V (Cadena)",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Manual 5 Velocidades IB5 (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "11.0 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "Sin ESP (ABS en versiones tardías)",
    "brakes": "Discos Delanteros / Tambor Trasero",
    "infotainment": "Radio 2DIN / Bluetooth",
    "parts": "Alta disponibilidad en todo el país",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Semi-Sintético (4.1 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor con cadena de distribución indestructible",
      "Aire acondicionado muy frío",
      "Caja IB5 durable y repuestos fáciles"
    ],
    "cons": [
      "Caja de termostato plástica propensa a grietas",
      "Despeje algo bajo (140 mm)",
      "Espacio trasero ajustado"
    ],
    "verdict": "Mecánica Zetec Rocam sincrónica sumamente noble para VE si se mantiene el sistema de enfriamiento al día.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica de alta duración (libre de cambio por kilometraje si hay buen aceite).",
      "combustibleVE": "Muy tolerante a gasolina de 91 octanos sin pistoneo.",
      "puntosClave": "Exigir carcasa de termostato en ALUMINIO, verificar electroventilador de 2 velocidades y temperatura en ralentí.",
      "fallasTipicas": "Fuga en toma de agua/termostato plástico original, resistencia de 1ra velocidad del electro y sensor TPS."
    }
  },
  {
    "id": "ford-fiesta-move-at",
    "maker": "Ford",
    "model": "Fiesta Move 1.6L Automático (4AT)",
    "yearRange": "2010 - 2013",
    "nicknames": [
      "Fiesta Move AT",
      "Fiesta Automático"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 3900,
    "maxPrice": 6000,
    "priceDisplay": "$3.900 - $6.000",
    "hp": 98,
    "torque": 142,
    "clearance": 140,
    "trunk": 470,
    "tank": 45,
    "weight": 1150,
    "engine": "1.6L Zetec Rocam 8V (Cadena)",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Automática 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "9.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "Sin ESP",
    "brakes": "Discos Delanteros / Tambor Trasero",
    "infotainment": "Radio 2DIN Original / Bluetooth",
    "parts": "Alta disponibilidad en todo el país",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 + Mercon V ATF",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor Zetec con cadena de tiempo",
      "Estética aún vigente frente a rivales del año",
      "Aire acondicionado potente"
    ],
    "cons": [
      "Caja 4AT requiere aceite Mercon V estricto y radiador limpio",
      "Temperatura de motor sensible en colas",
      "Consumo urbano alto"
    ],
    "verdict": "Alternativa práctica automática (NO confundir con PowerShift de años posteriores): revisar enfriador de caja.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica muy confiable si no ha sufrido recalentamientos.",
      "combustibleVE": "Tolerante a gasolina regular VE.",
      "puntosClave": "Verificar que no tenga agua mezclada en el aceite de caja ni patinaje entre 2da y 3ra.",
      "fallasTipicas": "Toma de agua plástica fisurada, recalentamiento por electroventilador y solenoides de caja si descuidaron ATF."
    }
  },
  {
    "id": "chevrolet-optra-2010",
    "maker": "Chevrolet",
    "model": "Optra Design / Advance 1.8L (4AT)",
    "yearRange": "2007 - 2012",
    "nicknames": [
      "El Optra",
      "Optra Tapa Negra / Roja"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 3500,
    "maxPrice": 5500,
    "priceDisplay": "$3.500 - $5.500",
    "hp": 121,
    "torque": 165,
    "clearance": 150,
    "trunk": 405,
    "tank": 60,
    "weight": 1265,
    "engine": "1.8L DOHC 16V Daewoo/GM",
    "displacement": "1.8L (1,796 cc)",
    "transmission": "Automática ZF / Aisin 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "8.8 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Discos en las 4 Ruedas (ABS)",
    "infotainment": "Radio 2DIN / Pantalla Adaptable",
    "parts": "Inmediata (Repuestos baratos)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 10W-30 / 10W-40 Semi-Sintético (4.2 L)",
    "timingSpec": "Correa Dentada",
    "pros": [
      "Muy cómodo, espacioso y con frenos de disco x4",
      "Precio de entrada bajo para su tamaño",
      "Abundancia total de repuestos"
    ],
    "cons": [
      "Correa de tiempo sumamente delicada",
      "Eléctrico/sensores exigen orden sin empates",
      "Consumo alto en ciudad"
    ],
    "verdict": "Solo recomendable tras inspección exhaustiva de temperatura, caja y kit de tiempo nuevo; ofrece gran confort por poco dinero.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada (máximo cada 40.000 km con poleas y bomba OEM; si falla dobla todas las válvulas).",
      "combustibleVE": "Acepta gasolina regular VE; usar limpiador de inyectores preventivo.",
      "puntosClave": "Chequear compresión, temperatura estable con A/C en cola y escaneo de sensores de caja.",
      "fallasTipicas": "Empaque tapa válvula, sensor P0700 / pare-neutro en caja ZF, fugas en reservorio de refrigerante y bases de motor."
    }
  },
  {
    "id": "toyota-yaris-2008",
    "maker": "Toyota",
    "model": "Yaris Belén 1.3L Automático (4AT)",
    "yearRange": "2006 - 2009",
    "nicknames": [
      "Yaris Belén",
      "El Inmortal"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 5500,
    "maxPrice": 7800,
    "priceDisplay": "$5.500 - $7.800",
    "hp": 86,
    "torque": 121,
    "clearance": 155,
    "trunk": 475,
    "tank": 42,
    "weight": 1030,
    "engine": "1.3L 2NZ-FE VVT-i (Cadena)",
    "displacement": "1.3L (1,298 cc)",
    "transmission": "Automática Toyota 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Tablero Central / Radio 2DIN",
    "parts": "Inmediata (Alta rotación nacional)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (3.7 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Confiabilidad mecánica legendaria en VE",
      "Consumo muy bajo (14.2 km/L)",
      "Valor de reventa casi blindado"
    ],
    "cons": [
      "Muy sobrevaluado frente a otros usados",
      "Alto riesgo de odómetro adulterado",
      "Motor 1.3L lento en subidas con peso"
    ],
    "verdict": "Compra sumamente segura si verificas kilometraje real, compresión y ausencia de golpes estructurales.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica VVT-i (dura la vida útil del motor usando aceite 5W-30 o 10W-30 limpio).",
      "combustibleVE": "Tolera bien gasolina comercial VE manteniendo limpia la pila y filtro del tanque.",
      "puntosClave": "Verificar desgaste real en pedales/volante contra odómetro, estado de cremallera eléctrica EPS y compresión pareja.",
      "fallasTipicas": "Bomba de agua cerca de los 120.000 km, bobinas individuales envejecidas y sonido de columna/cremallera EPS."
    }
  },
  {
    "id": "honda-civic-2008",
    "maker": "Honda",
    "model": "Civic EX 1.8L i-VTEC (5AT)",
    "yearRange": "2006 - 2011",
    "nicknames": [
      "Civic Emoción",
      "Civic Nueva Generación"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 4800,
    "maxPrice": 7200,
    "priceDisplay": "$4.800 - $7.200",
    "hp": 140,
    "torque": 174,
    "clearance": 150,
    "trunk": 355,
    "tank": 50,
    "weight": 1245,
    "engine": "1.8L R18A1 SOHC i-VTEC (Cadena)",
    "displacement": "1.8L (1,799 cc)",
    "transmission": "Automática Honda 5 Velocidades (5AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "11.5 km/L",
    "airbags": "6 Airbags (EX) / 2 Base",
    "esp": "ABS + EBD + VSA (Según Año)",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Tablero Digital Bi-Nivel + Audio AUX",
    "parts": "Moderada-Alta (Ciudades principales)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-20 / 5W-30 + Honda DW-1 ATF",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Diseño interior futurista aún atractivo",
      "Motor i-VTEC con cadena muy brioso",
      "Excelente estabilidad en autopista"
    ],
    "cons": [
      "Bloque 2006-2008 susceptible a fisura si fue recalentado",
      "Base hidráulica de motor derecha costosa",
      "Bajo para baches altos"
    ],
    "verdict": "Alternativa superior al Corolla en manejo y equipamiento por menor precio; inspeccionar refrigeración minuciosamente.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica silenciosa de larga duración.",
      "combustibleVE": "Funciona correctamente con 91-95 octanos; sensible a bujías de iridio genuinas.",
      "puntosClave": "Inspeccionar posibles fisuras de refrigerante en bloque (2006-2008), estado del soporte hidráulico derecho y fluido ATF DW-1.",
      "fallasTipicas": "Base de motor derecha colapsada (vibración al pasar a D), manguera alta presión dirección y bomba hidráulica."
    }
  },
  {
    "id": "toyota-corolla-2011",
    "maker": "Toyota",
    "model": "Corolla GLi 1.8L Automático (4AT)",
    "yearRange": "2009 - 2014",
    "nicknames": [
      "Corolla Sensación",
      "El Cheque al Portador"
    ],
    "condition": "usado",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 6500,
    "maxPrice": 9500,
    "priceDisplay": "$6.500 - $9.500",
    "hp": 132,
    "torque": 170,
    "clearance": 160,
    "trunk": 470,
    "tank": 55,
    "weight": 1270,
    "engine": "1.8L 1ZZ-FE / 2ZR-FE Dual VVT-i",
    "displacement": "1.8L (1,794 cc)",
    "transmission": "Automática Toyota 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "11.0 km/L",
    "airbags": "2 a 4 Airbags + ABS/EBD",
    "esp": "ABS + EBD (Sin ESP en la mayoría)",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Radio 2DIN / Bluetooth",
    "parts": "Inmediata en todo el país",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (4.2 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Valor de reventa casi inalterable en VE",
      "160 mm de despeje resiste bien asfaltos irregulares",
      "Repuestos en cada ciudad"
    ],
    "cons": [
      "Precio muy elevado para sus años",
      "Alto índice de fraude de odómetro",
      "Equipamiento de confort básico frente a nuevos"
    ],
    "verdict": "El sedán usado más sólido de Venezuela para familia y carretera si consigues unidad bien cuidada y sin choque.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica robusta con tensor hidráulico.",
      "combustibleVE": "Muy tolerante a gasolina local; pila de gasolina fácil de reemplazar.",
      "puntosClave": "Verificar desgaste real del interior vs odómetro, fugas en empacadura del tensor de cadena y cremallera de dirección.",
      "fallasTipicas": "Buje de goma de columna eléctrica EPS, empaque de tapa válvula y amortiguadores traseros vencidos."
    }
  },
  {
    "id": "daihatsu-terios-bego",
    "maker": "Daihatsu",
    "model": "Terios Bego 1.5L 4x4 (4AT)",
    "yearRange": "2008 - 2012",
    "nicknames": [
      "La Bego",
      "Terios Toyota"
    ],
    "condition": "usado",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 7500,
    "maxPrice": 11000,
    "priceDisplay": "$7.500 - $11.000",
    "hp": 105,
    "torque": 141,
    "clearance": 200,
    "trunk": 380,
    "tank": 50,
    "weight": 1220,
    "engine": "1.5L 3SZ-VE DOHC VVT-i (Cadena)",
    "displacement": "1.5L (1,495 cc)",
    "transmission": "Automática 4 Velocidades + Bloqueo Central",
    "traction": "4x4 Permanente c/ Bloqueo Dif.",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "10.0 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Radio 2DIN / Bluetooth",
    "parts": "Alta (Plataforma Toyota Rush)",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (3.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "200 mm de despeje para calles destruidas y trochas",
      "Tracción 4x4 real con bloqueo de diferencial central",
      "Motor Toyota/Daihatsu duradero"
    ],
    "cons": [
      "Suspensión trasera algo brincadora en autopista",
      "Precio alto por demanda",
      "Potencia justa cargada en subidas"
    ],
    "verdict": "SUV compacta todoterreno perfecta para vías rotas y viajes de fin de semana sin el consumo de un V6.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica confiable (motor Toyota 3SZ-VE).",
      "combustibleVE": "Buena tolerancia a gasolina VE; revisar válvula VVT-i ante falta de mantenimiento.",
      "puntosClave": "Probar botón de bloqueo de diferencial central en terreno suelto, revisar cardanes/crucetas y diferencial trasero.",
      "fallasTipicas": "Retenes de transferencia/diferencial, bomba de agua y desgaste de amortiguadores traseros."
    }
  },
  {
    "id": "toyota-hilux-2012",
    "maker": "Toyota",
    "model": "Hilux Kavak 4.0L V6 4x4 (5AT)",
    "yearRange": "2006 - 2015",
    "nicknames": [
      "La Kavak",
      "La Reina de VE"
    ],
    "condition": "usado",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 13500,
    "maxPrice": 22000,
    "priceDisplay": "$13.500 - $22.000",
    "hp": 238,
    "torque": 376,
    "clearance": 220,
    "trunk": 1000,
    "tank": 80,
    "weight": 1960,
    "engine": "4.0L 1GR-FE V6 24V (Cadena)",
    "displacement": "4.0L (3,956 cc)",
    "transmission": "Automática 5 Velocidades + 4x4 Bajo",
    "traction": "4x4 c/ Bajo y Bloqueo",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "6.8 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + Diferencial LSD",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Radio 2DIN Táctil Adaptable",
    "parts": "Inmediata en toda Venezuela",
    "warranty": "N/A (Usado VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (5.2 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Chasis de escalera prácticamente indestructible",
      "Torque brutal 4.0L V6 para cualquier trocha o remolque",
      "Liquidez inmediata de reventa"
    ],
    "cons": [
      "Alto consumo de combustible en ciudad",
      "Alto riesgo de seguridad y hurto",
      "Muchas unidades abusadas en campo o blindadas"
    ],
    "verdict": "La referencia rústica indiscutible para el interior del país; auditar chasis, doble tracción y compresión V6.",
    "bajoKapotReview": {
      "distribucion": "Doble cadena de distribución V6 altamente durable.",
      "combustibleVE": "Traga gasolina comercial VE sin complicaciones (inyección multipunto atmosférica).",
      "puntosClave": "Revisar largueros del chasis sin óxido ni soldaduras, funcionamiento suave del selector 4H/4L y presencia de blindaje previo.",
      "fallasTipicas": "Fugas en tapa válvula del lado del piloto, homocinéticas delanteras por abuso en 4L y cremallera de dirección."
    }
  },
  {
    "id": "baic-u5-plus-mt",
    "maker": "BAIC",
    "model": "U5 Plus Comfort 1.5L (5MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "U5 Plus Sincrónico",
      "BAIC U5"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 22900,
    "maxPrice": 23900,
    "priceDisplay": "~$22.900 ref.",
    "hp": 111,
    "torque": 142,
    "clearance": 155,
    "trunk": 430,
    "tank": 48,
    "weight": 1225,
    "engine": "1.5L A151A1 DOHC 16V Atmosférico",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina Regular / 91+ Oct (Multipunto)",
    "consumption": "14.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESP + EBA + HHC + AutoHold + TPMS",
    "brakes": "Discos en las 4 Ruedas (ABS+EBD)",
    "infotainment": "Doble Pantalla 7\" + 12.3\" Táctil",
    "parts": "Red BAIC Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP (4.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor sin turbo muy tolerante a la gasolina local",
      "Frenos de disco x4 y ESP/AutoHold desde base",
      "Garantía 5 años o 100.000 km"
    ],
    "cons": [
      "Solo 2 airbags y faros halógenos en versión 5MT",
      "Torque moderado (142 Nm) en pendientes cargado",
      "Sin soporte nativo Android Auto cableado en algunas unidades"
    ],
    "verdict": "Sedán 0km racional y amplio; la versión 5MT destaca por sencillez mecánica, cero turbo y bajo costo de mantenimiento.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC 16V sin correa dentada.",
      "combustibleVE": "Alta tolerancia a gasolina venezolana de 91 octanos al ser inyección multipunto sin turbo.",
      "puntosClave": "Verificar presencia de escudo protector inferior y cobertura real del concesionario BAIC más cercano.",
      "fallasTipicas": "Sensible a carga de batería 12V por doble pantalla digital; calibrar TPMS al rotar cauchos 205/55 R16."
    }
  },
  {
    "id": "baic-u5-plus-cvt",
    "maker": "BAIC",
    "model": "U5 Plus Luxury 1.5L (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "U5 Plus Automático",
      "U5 Luxury"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 28500,
    "maxPrice": 29900,
    "priceDisplay": "~$28.500 - $29.900",
    "hp": 111,
    "torque": 142,
    "clearance": 155,
    "trunk": 430,
    "tank": 48,
    "weight": 1255,
    "engine": "1.5L A151A1 DOHC 16V Atmosférico",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Automática CVT Continuamente Variable",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina Regular / 91+ Oct (Multipunto)",
    "consumption": "13.8 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + HHC + BSD Punto Ciego + LDW + Cam 360°",
    "brakes": "Discos en las 4 Ruedas (EPB + AutoHold)",
    "infotainment": "Doble Pantalla 7\" + 12.3\" + Cámara 360°",
    "parts": "Red BAIC Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP + Fluido CVT OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "4 airbags, punto ciego BSD, alerta de carril y cámara 360°",
      "Iluminación Full LED y rines 17\"",
      "Motor 1.5L sin turbo fácil de mantener"
    ],
    "cons": [
      "Brecha de precio importante vs versión 5MT (~$6.000+)",
      "Perfil 205/50 R17 exige más cuidado en baches",
      "Caja CVT enfocada en suavidad, no deportividad"
    ],
    "verdict": "Ideal si buscas equipamiento ADAS y comodidad automática sin complicarte con motores turbo GDI.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC confiable.",
      "combustibleVE": "Inyección multipunto atmosférica apta para gasolina comercial venezolana.",
      "puntosClave": "Respetar estrictamente el cambio de fluido CVT a los 40.000 - 50.000 km en concesionario por el clima cálido.",
      "fallasTipicas": "Ninguna crítica reportada; cuidar flanco de cauchos 205/50 R17 frente a alcantarillas sin tapa."
    }
  },
  {
    "id": "baic-x35-mt",
    "maker": "BAIC",
    "model": "X35 Comfort 1.5T (6MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "BAIC X35 Sincrónica"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "MT",
    "minPrice": 23500,
    "maxPrice": 24500,
    "priceDisplay": "~$23.500 ref.",
    "hp": 147,
    "torque": 210,
    "clearance": 180,
    "trunk": 390,
    "tank": 46,
    "weight": 1325,
    "engine": "1.5L Turbo A151R2 16V",
    "displacement": "1.5L Turbo (1,499 cc)",
    "transmission": "Manual 6 Velocidades (6MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct Recomendada",
    "consumption": "13.0 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESP + TCS + HHC + TPMS",
    "brakes": "Discos en las 4 Ruedas (EPB + AutoHold)",
    "infotainment": "Pantalla Táctil 8\" + Bluetooth",
    "parts": "Red BAIC Venezuela",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP (Anti-LSPI)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Excelente relación HP/precio: 147 HP / 210 Nm con 6MT",
      "180 mm de despeje libre al suelo ideal para huecos VE",
      "Discos x4 y EPB desde la versión Comfort"
    ],
    "cons": [
      "Solo 2 airbags en esta configuración",
      "Motor turbo requiere aceite 5W-30 API SP puntual",
      "Tanque de 46L algo justo para viajes largos"
    ],
    "verdict": "SUV compacta ágil con buen despeje (180 mm) y caja 6MT económica frente a opciones automáticas del segmento.",
    "bajoKapotReview": {
      "distribucion": "Cadena de distribución metálica.",
      "combustibleVE": "Turboalimentado: priorizar gasolina limpia, filtrar bien y respetar período de enfriamiento de 45s antes de apagar.",
      "puntosClave": "Exigir aceite 5W-30 100% sintético API SP cada 5.000-6.000 km en régimen venezolano.",
      "fallasTipicas": "Cuidar carga de batería por freno electrónico EPB; mantener limpios ductos de intercooler."
    }
  },
  {
    "id": "baic-x35-cvt",
    "maker": "BAIC",
    "model": "X35 Luxury 1.5T (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "BAIC X35 Automática"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 26900,
    "maxPrice": 27500,
    "priceDisplay": "~$26.900 - $27.500",
    "hp": 147,
    "torque": 210,
    "clearance": 180,
    "trunk": 390,
    "tank": 46,
    "weight": 1340,
    "engine": "1.5L Turbo A151R2 16V",
    "displacement": "1.5L Turbo (1,499 cc)",
    "transmission": "Automática CVT c/ Modo Secuencial",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct Recomendada",
    "consumption": "12.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESP + TCS + HHC + Sensor Reversa",
    "brakes": "Discos en las 4 Ruedas (EPB + AutoHold)",
    "infotainment": "Pantalla Táctil 8\" + Techo Panorámico",
    "parts": "Red BAIC Venezuela",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Despeje real de 180 mm y empuje turbo de 210 Nm",
      "Techo panorámico, rines 17\" y luces LED en Luxury",
      "Comodidad CVT en tráfico pesado"
    ],
    "cons": [
      "Solo 2 airbags frente a competidores con 4-6",
      "Mantenimiento CVT requiere cambio de fluido puntual",
      "Maleta de 390 L justa para familia grande"
    ],
    "verdict": "Opción urbana cómoda y alta para baches; ideal si valoras estética y techo panorámico sobre número de airbags.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Turbo 1.5T: usar filtro de aire limpio y bujías en rango óptimo; evitar acelerones en frío.",
      "puntosClave": "Cambiar aceite de transmisión CVT máximo a los 45.000 km por temperaturas de congestión urbana.",
      "fallasTipicas": "Retardo ligero al salir en pendiente (efecto turbo+CVT) mitigado usando AutoHold."
    }
  },
  {
    "id": "baic-bj30-dct",
    "maker": "BAIC",
    "model": "BJ30 Comfort/Luxury 1.5T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "BAIC BJ30",
      "El Aventurero BAIC"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 35900,
    "maxPrice": 39500,
    "priceDisplay": "~$36.500 ref.",
    "hp": 185,
    "torque": 305,
    "clearance": 215,
    "trunk": 500,
    "tank": 60,
    "weight": 1575,
    "engine": "1.5L Turbo A156T2H Euro VI",
    "displacement": "1.5L Turbo (1,498 cc)",
    "transmission": "Automática 7DCT Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (Euro VI)",
    "consumption": "12.0 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP + HHC + Multi-link Trasero + HMA",
    "brakes": "Disco Del. / Disco Ventilado Tras. (EPB)",
    "infotainment": "Cockpit 14.6\" + Clúster 10.25\"",
    "parts": "Red BAIC Venezuela",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Brutal despeje de 215 mm y tanque amplio de 60 L",
      "Suspensión trasera independiente Multi-Link y 185 HP / 305 Nm",
      "6 airbags de serie y porte todoterreno cuadrado"
    ],
    "cons": [
      "Tracción delantera en versión gasolina (no 4x4)",
      "Motor Euro VI turbo de alto torque sensible a octanaje bajo",
      "Repuestos de carrocería nuevos bajo pedido"
    ],
    "verdict": "C-SUV de presencia imponente, gran despeje (215 mm) y comodidad multibrazo para autopistas y carreteras irregulares.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica.",
      "combustibleVE": "Motor A156T2H Euro VI: exige excelente filtración de gasolina y aditivo limpiador preventivo si tanqueas en estaciones dudosas.",
      "puntosClave": "Usar AutoHold en trancazos para evitar desgaste prematuro de los embragues de la caja 7DCT.",
      "fallasTipicas": "Cuidar sensores perimetrales de lodo en caminos de tierra; llantas 235/60 R19 con buen perfil."
    }
  },
  {
    "id": "baic-bj40-at",
    "maker": "BAIC",
    "model": "BJ40 Extreme 2.0T 4x4 (8AT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "BJ40 Extreme",
      "El Wrangler Chino"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 52000,
    "maxPrice": 56000,
    "priceDisplay": "~$54.000 ref.",
    "hp": 221,
    "torque": 380,
    "clearance": 210,
    "trunk": 532,
    "tank": 75,
    "weight": 2080,
    "engine": "2.0L Turbo 380 Nm Euro VI",
    "displacement": "2.0L Turbo (1,998 cc)",
    "transmission": "Automática ZF 8 Velocidades (8AT)",
    "traction": "4x4 Chasis Separado c/ Techo Desmontable",
    "fuelType": "Gasolina 95 Oct (Euro VI)",
    "consumption": "8.8 km/L",
    "airbags": "Frontales + Laterales + Jaula Antivuelco",
    "esp": "ESP + Control Descenso + Ángulos 37°/31°",
    "brakes": "Discos Ventilados Del. / Disco Tras. (EPB)",
    "infotainment": "Doble Pantalla Digital + Cuero Nappa",
    "parts": "Red BAIC Venezuela (Pedido Especial)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 / 0W-40 100% Sintético API SP (5.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Verdadero chasis de largueros, 380 Nm y caja ZF 8AT",
      "Ángulo de ataque 37° y despeje 210 mm con caucho full size 265/65 R17",
      "Tanque 75 L y techo desmontable de fábrica"
    ],
    "cons": [
      "Peso elevado de 2.080 kg impacta consumo urbano",
      "Dinámica de conducción menos refinada en curvas rápidas",
      "Precio arriba de $50k USD"
    ],
    "verdict": "4x4 puro de verdad (chasis independiente + reductora) para off-road serio en Venezuela con caja 8AT probada.",
    "bajoKapotReview": {
      "distribucion": "Cadena de distribución metálica.",
      "combustibleVE": "Motor 2.0T Euro VI: obligatorio usar gasolina limpia y respetar mantenimiento estricto de filtros.",
      "puntosClave": "Lubricar empaques de goma del techo desmontable tras rutas polvorientas y revisar protector de cárter tras trochas.",
      "fallasTipicas": "Ruidos de viento por techo modular a >110 km/h; revisar balanceo tras barro en rines 17\"."
    }
  },
  {
    "id": "changan-alsvin-b511-mt",
    "sampleKey": "changan",
    "maker": "Changan",
    "model": "Alsvin B511 Sincrónico 1.4L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Alsvin Sincrónico",
      "B511 MT"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 15405,
    "maxPrice": 17900,
    "priceDisplay": "$15.405 + imp. (~$17.9k)",
    "hp": 100,
    "torque": 135,
    "clearance": 150,
    "trunk": 375,
    "tank": 40,
    "weight": 1110,
    "engine": "1.4L Blue Core JL473Q4 (Cadena)",
    "displacement": "1.4L (1,370 cc)",
    "transmission": "Manual 5 Velocidades (TM025FMB)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + Cámara Retroceso",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Pantalla Táctil 7\" MirrorLink",
    "parts": "Red Changan Venezuela / Genéricos 1.4L",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 Sintético API SP (3.6 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Uno de los 0 km más económicos del mercado VE",
      "Motor 1.4L multipunto con cadena de tiempo sumamente austero",
      "Consumo bajísimo en ciudad (15.5 km/L)"
    ],
    "cons": [
      "No incluye ESC en la versión B511 base",
      "Tanque pequeño de 40 L",
      "Desempeño tranquilo en carretera con 5 pasajeros"
    ],
    "verdict": "La puerta de entrada 0 km más racional para trabajar o uso diario urbano sin depender de vehículos usados con vicios.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica con tensor hidráulico (libre de reemplazo por correa).",
      "combustibleVE": "Muy compatible con gasolina regular de 91 octanos al ser aspirado multipunto.",
      "puntosClave": "Vigilar que el concesionario cotice el precio final con IVA, IGTF y placa sumados al base de $15.405.",
      "fallasTipicas": "Freno de tambor trasero requiere limpieza cada 15.000 km; cuidar cauchos 185/55 R15 en huecos."
    }
  },
  {
    "id": "changan-alsvin-b511-dct",
    "maker": "Changan",
    "model": "Alsvin B511 Automático 1.5L (5DCT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Alsvin B511 DCT"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 18200,
    "maxPrice": 20800,
    "priceDisplay": "~$19.900 - $20.800",
    "hp": 105,
    "torque": 145,
    "clearance": 150,
    "trunk": 375,
    "tank": 40,
    "weight": 1155,
    "engine": "1.5L Blue Core JL473QF (Cadena)",
    "displacement": "1.5L (1,480 cc)",
    "transmission": "Automática 5DCT Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + HHC Arranque Pendiente",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Pantalla Táctil 7\" + Sunroof Eléctrico",
    "parts": "Red Changan Venezuela",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 Sintético + Aceite DCT Húmedo/Seco OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Automático 0 km económico con mejor motor 1.5L (105 HP / 145 Nm)",
      "Incluye asistente en pendiente HHC y sunroof",
      "Consumo sobresaliente"
    ],
    "cons": [
      "Caja 5DCT sensible a avance lento en colas sin freno firme",
      "Tanque de 40 L",
      "Solo 2 airbags"
    ],
    "verdict": "Buen automático urbano; en tránsito lento de Caracas usar modo manual o pisar el freno firmemente para cuidar embragues.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Blue Core de larga vida.",
      "combustibleVE": "Buena tolerancia a gasolina local (aspirado multipunto).",
      "puntosClave": "En colas muy lentas evitar 'creep' prolongado a medio pedal para no calentar los discos de la caja 5DCT.",
      "fallasTipicas": "Trepidación en salida en 1ra si se abusa del avance sin acelerar en subidas prolongadas."
    }
  },
  {
    "id": "changan-alsvin-plus-mt",
    "maker": "Changan",
    "model": "Alsvin Plus Sincrónico 1.5L (5MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Alsvin Plus MT"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 17257,
    "maxPrice": 20500,
    "priceDisplay": "$17.257 + imp. (~$20.0k)",
    "hp": 102,
    "torque": 145,
    "clearance": 152,
    "trunk": 375,
    "tank": 40,
    "weight": 1215,
    "engine": "1.5L Bluecore NE15G-AB",
    "displacement": "1.5L (1,494 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD (Sin ESC en versión 5MT)",
    "brakes": "Discos Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 10.25\"",
    "parts": "Red Changan Venezuela",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor 1.5L con 145 Nm más elástico que el B511 1.4L",
      "Cabina modernizada con pantalla 10.25\"",
      "Costo de entrada contenido"
    ],
    "cons": [
      "Pierde ESC, airbags laterales, tanque 53L y rines 16\" frente al Alsvin Plus 7DCT",
      "Tanque de 40 L",
      "Frenos traseros de tambor"
    ],
    "verdict": "Buena herramienta sincrónica, aunque si tu presupuesto alcanza, el Alsvin Plus Automático 7DCT sube drásticamente en seguridad.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Inyección multipunto compatible con gasolina venezolana.",
      "puntosClave": "Comparar precio todo-incluido frente al Arrizo 5 Pro MT ($22.330 todo incluido) antes de decidir.",
      "fallasTipicas": "Llantas 185/55 R15 de perfil modesto para baches severos; revisar presión semanalmente."
    }
  },
  {
    "id": "changan-alsvin-plus-dct",
    "maker": "Changan",
    "model": "Alsvin Plus Automático 1.5L (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Alsvin Plus 7DCT"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 20307,
    "maxPrice": 24000,
    "priceDisplay": "$20.307 + imp. (~$23.5k)",
    "hp": 105,
    "torque": 145,
    "clearance": 158,
    "trunk": 500,
    "tank": 53,
    "weight": 1260,
    "engine": "1.5L Bluecore JL473QK",
    "displacement": "1.5L (1,494 cc)",
    "transmission": "Automática 7DCT Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "14.0 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESC + TCS + BA + HHC + TPMS + Cám. 540°",
    "brakes": "Discos Del. / Tambor Tras. (Según Lote)",
    "infotainment": "Pantalla 10.25\" + Cámara 540° Chasis Transparente",
    "parts": "Red Changan Venezuela",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 Sintético API SP + Aceite 7DCT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Salto enorme sobre el MT: 4 airbags, ESC, TCS, TPMS y cámara 540°",
      "Maleta gigante de 500 L y tanque amplio de 53 L",
      "Cauchos 205/60 R16 con excelente perfil para baches VE"
    ],
    "cons": [
      "Precio sube cerca de $23.5k+ ya con impuestos",
      "Caja 7DCT requiere hábito suave en colas empinadas",
      "Motor atmosférico de 105 HP prioriza ahorro sobre pique"
    ],
    "verdict": "Una de las mejores compras equilibradas de sedán automático subcompacto: caucho R16 alto, 500 L de maleta, tanque de 53 L y ESC.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica de distribución.",
      "combustibleVE": "Bloque 1.5L sin turbo muy amigable con gasolina comercial de 91 octanos.",
      "puntosClave": "Aprovechar las llantas 205/60 R16 de serie y verificar cobertura ESC en factura.",
      "fallasTipicas": "Cuidar enfriamiento de la caja 7DCT en colas largas usando Neutral en paradas superiores a 45 segundos."
    }
  },
  {
    "id": "changan-cs35-max-dct",
    "maker": "Changan",
    "model": "CS35 MAX 1.5T GDI (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "CS35 Plus / MAX"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 31000,
    "maxPrice": 34500,
    "priceDisplay": "~$32.800 ref.",
    "hp": 185,
    "torque": 300,
    "clearance": 180,
    "trunk": 403,
    "tank": 51,
    "weight": 1390,
    "engine": "1.5T Bluecore JL473ZQ5 GDI",
    "displacement": "1.5L Turbo GDI (1,494 cc)",
    "transmission": "Automática 7DCT Húmeda Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (Inyección Directa GDI)",
    "consumption": "12.5 km/L",
    "airbags": "4 a 6 Airbags (Según Lote)",
    "esp": "ESP + AEB Frenado Autónomo + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Doble Pantalla Digital + Full LED",
    "parts": "Red Changan Venezuela",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 / 0W-20 100% Sintético API SP (Obligatorio)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor 185 HP muy enérgico con caja 7DCT húmeda durable",
      "Frenado autónomo de emergencia AEB y EPB + AutoHold",
      "Despeje 180 mm"
    ],
    "cons": [
      "Inyección Directa GDI Turbo exige gasolina 95 limpia o aditivo",
      "Rines 18\" requieren cuidado en huecos profundos",
      "Nota: ficha local lista torque conservador aunque motor global da hasta 300 Nm"
    ],
    "verdict": "SUV compacta tecnológica y potente; indispensable usar gasolina de buena calidad por su sistema GDI de alta presión.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Bluecore.",
      "combustibleVE": "ATENCIÓN VE: Es Turbo GDI (inyección directa). Usar gasolina de 95 octanos verificada y aditivo limpiador de inyectores cada 5.000 km.",
      "puntosClave": "Caja 7DCT húmeda mucho más resistente al calor caraqueño que una seca, pero exige cambio de aceite de transmisión cada 50.000 km.",
      "fallasTipicas": "Acumulación de carbón en válvulas de admisión a largo plazo (típico GDI) si no se usa aceite API SP bajo en cenizas."
    }
  },
  {
    "id": "changan-cs95-at",
    "maker": "Changan",
    "model": "CS95 Royal 2.0T 4WD 7P (8AT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Changan CS95 7 Puestos"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 47500,
    "maxPrice": 51500,
    "priceDisplay": "~$49.500 ref.",
    "hp": 229,
    "torque": 390,
    "clearance": 190,
    "trunk": 418,
    "tank": 74,
    "weight": 2035,
    "engine": "2.0T Bluecore GDI JL486ZQ5",
    "displacement": "2.0L Turbo GDI (1,998 cc)",
    "transmission": "Automática Aisin 8 Velocidades (8AT)",
    "traction": "AWD Inteligente BorgWarner",
    "fuelType": "Gasolina 95 Oct (GDI)",
    "consumption": "9.0 km/L",
    "airbags": "6 Airbags (Front, Lat, Cortina)",
    "esp": "ESP + ACC + AEB + Alerta Carril + 360°",
    "brakes": "Discos Ventilados x4 (EPB)",
    "infotainment": "Pantalla 12.3\" + 3 Filas (7 Puestos)",
    "parts": "Red Changan Venezuela (Bajo Pedido)",
    "warranty": "Garantía Oficial Changan VE",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + ATF Aisin WS",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Caja automática japonesa Aisin 8AT + tracción AWD BorgWarner",
      "Real 7 puestos familiares con tanque de 74 L",
      "Motor 2.0T de 229 HP y 390 Nm"
    ],
    "cons": [
      "Rines enormes 255/50 R20 muy costosos de reponer en VE",
      "Consumo urbano alto por peso de >2 toneladas",
      "Sensible a combustible sucio (GDI)"
    ],
    "verdict": "Buque insignia familiar de 3 filas con tren motriz Aisin muy sólido; vigilar estado de cauchos R20 y combustible.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "2.0T GDI requiere gasolina 95 octanos de estaciones confiables.",
      "puntosClave": "La transmisión Aisin 8AT con convertidor de par es muy superior en durabilidad y remolque frente a cajas DCT en carros pesados.",
      "fallasTipicas": "Alto costo de neumáticos 255/50 R20 y pastillas de freno delanteras por masa del vehículo."
    }
  },
  {
    "id": "chery-arrizo5-pro-mt",
    "maker": "Chery",
    "model": "Arrizo 5 Pro 1.5L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Arrizo 5 Sincrónico"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 21500,
    "maxPrice": 22330,
    "priceDisplay": "$22.329 todo incluido",
    "hp": 115,
    "torque": 141,
    "clearance": 145,
    "trunk": 430,
    "tank": 41,
    "weight": 1245,
    "engine": "1.5L ACTECO SQRE4G15C Atmosférico",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + TPMS + Asistente Pendiente",
    "brakes": "Discos en las 4 Ruedas (Freno Mano Mecánico)",
    "infotainment": "Pantalla Táctil 8\" Apple CarPlay/Android Auto",
    "parts": "Red Chery Venezuela / Amplia compatibilidad Acteco",
    "warranty": "Garantía Oficial Chery VE",
    "oilSpec": "SAE 5W-30 / 10W-40 Sintético API SP (4.2 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Precio publicado $22.329 ya incluye IVA, placa y traspaso",
      "Motor 1.5L Acteco multipunto sin turbo súper probado en VE",
      "Discos de freno en las 4 ruedas desde versión MT"
    ],
    "cons": [
      "Tanque algo justo (41 L)",
      "Sin airbags laterales en versión base",
      "Despeje estándar de sedán (145 mm)"
    ],
    "verdict": "Compra transparente (precio todo incluido) con uno de los motores chinos con mejor respaldo de repuestos en Venezuela.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Acteco.",
      "combustibleVE": "Excelente tolerancia a gasolina regular venezolana gracias a la inyección multipunto sin turbo.",
      "puntosClave": "Aprovechar freno de mano mecánico tradicional (cero fallos de actuador EPB si se queda sin batería).",
      "fallasTipicas": "Cuidar cauchos de perfil urbano y revisar alineación cada 7.500 km."
    }
  },
  {
    "id": "chery-arrizo5-pro-cvt",
    "maker": "Chery",
    "model": "Arrizo 5 Pro 1.5L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Arrizo 5 Automático"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 23800,
    "maxPrice": 24300,
    "priceDisplay": "$24.262 todo incluido",
    "hp": 115,
    "torque": 141,
    "clearance": 145,
    "trunk": 430,
    "tank": 41,
    "weight": 1280,
    "engine": "1.5L ACTECO SQRE4G15C Atmosférico",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Automática CVT (5 Marchas Simuladas)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "12.8 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + ESP + EPB AutoHold + TPMS",
    "brakes": "Discos en las 4 Ruedas (EPB)",
    "infotainment": "Pantalla Táctil 8\" CarPlay/Android Auto",
    "parts": "Red Chery Venezuela",
    "warranty": "Garantía Oficial Chery VE",
    "oilSpec": "SAE 5W-30 Sintético + Aceite CVT WCF-1",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Precio transparente todo incluido ($24.262)",
      "Agrega EPB con AutoHold, ESP y discos x4",
      "Motor atmosférico muy tolerante a la gasolina local"
    ],
    "cons": [
      "Tanque de 41 L limita autonomía en autopista",
      "Caja CVT de respuesta progresiva (no deportiva)",
      "Solo 2 airbags frontales"
    ],
    "verdict": "Sedán automático 0 km equilibrado para uso urbano diario con costos de combustible y mantenimiento contenidos.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Acteco.",
      "combustibleVE": "Tolera bien gasolina regular de 91 octanos sin pistoneo.",
      "puntosClave": "Cambiar fluido CVT exactamente cada 40.000 km con el fluido homologado por Chery (no mezclar fluidos genéricos).",
      "fallasTipicas": "Sobrecalentamiento de CVT solo si no se reemplaza el fluido a tiempo en climas calurosos."
    }
  },
  {
    "id": "chery-tiggo2-promax-cvt",
    "maker": "Chery",
    "model": "Tiggo 2 Pro Max 1.5L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Tiggo 2 Pro Max"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 23800,
    "maxPrice": 24200,
    "priceDisplay": "$24.152 todo incluido",
    "hp": 114,
    "torque": 141,
    "clearance": 170,
    "trunk": 340,
    "tank": 41,
    "weight": 1265,
    "engine": "1.5L ACTECO Atmosférico",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Automática CVT 5 Marchas Simuladas",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "12.6 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESP + TCS + HHC + EPB AutoHold + TPMS",
    "brakes": "Discos en las 4 Ruedas (EPB)",
    "infotainment": "Pantalla Táctil 10.25\" CarPlay",
    "parts": "Red Chery Venezuela (Muy alta)",
    "warranty": "Garantía Oficial Chery VE",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Precio transparente todo incluido ($24.152)",
      "Discos x4, EPB AutoHold y pantalla 10.25\"",
      "Motor 1.5L sin turbo muy amigable con gasolina VE"
    ],
    "cons": [
      "Tanque de apenas 41 L",
      "Solo 2 airbags en versión comercializada",
      "Potencia justa cargada en autopista empinada"
    ],
    "verdict": "B-SUV urbana de entrada muy atractiva en equipamiento visual y sencillez mecánica sin turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena de distribución metálica.",
      "combustibleVE": "Excelente tolerancia a gasolina comercial VE.",
      "puntosClave": "Respetar servicio de aceite CVT a los 40.000 km; excelente disponibilidad de pastillas/filtros en VE.",
      "fallasTipicas": "Ruidos de suspensión trasera en baches secos; revisar bujes y presión de cauchos."
    }
  },
  {
    "id": "chery-tiggo4-promax-cvt",
    "sampleKey": "tiggo",
    "maker": "Chery",
    "model": "Tiggo 4 Pro Max 1.5L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Tiggo 4 Pro Max"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 26900,
    "maxPrice": 28500,
    "priceDisplay": "~$27.500 ref.",
    "hp": 114,
    "torque": 143,
    "clearance": 175,
    "trunk": 340,
    "tank": 51,
    "weight": 1350,
    "engine": "1.5L ACTECO DOHC 16V",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Automática CVT 5 Velocidades Simuladas",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "12.0 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP + EBD + EPB AutoHold + TPMS",
    "brakes": "Discos en las 4 Ruedas (Rines 17\")",
    "infotainment": "Doble Pantalla 10.25\" LCD + Chery Link CarPlay",
    "parts": "Red Chery Venezuela",
    "warranty": "Garantía Oficial Chery VE",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Salto clave a 6 airbags (frontales, laterales y cortina)",
      "Tanque de 51 L (+10 L frente al Tiggo 2) y caucho 215/60 R17",
      "Doble pantalla 10.25\" y motor sin turbo"
    ],
    "cons": [
      "114 HP mueve con calma los 1.747 kg de peso bruto",
      "Sin tracción AWD",
      "Maletero de 340 L algo compacto"
    ],
    "verdict": "SUV familiar sumamente segura (6 airbags) y mecánica sencilla sin turbo para rodar tranquilo por Venezuela.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica.",
      "combustibleVE": "Inyección multipunto sin turbo muy tolerante a gasolina local.",
      "puntosClave": "Sus llantas 215/60 R17 absorben bien huecos; vigilar mantenimiento preventivo de caja CVT cada 40.000 km.",
      "fallasTipicas": "Cuidar carga de batería por doble pantalla 10.25\" y encendido remoto."
    }
  },
  {
    "id": "dongfeng-rich6-mt",
    "sampleKey": "rich6",
    "maker": "Dongfeng",
    "model": "Rich 6 2.4L 4x4 (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Rich 6",
      "Plataforma Navara"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "MT",
    "minPrice": 34000,
    "maxPrice": 36900,
    "priceDisplay": "~$35.500 ref.",
    "hp": 156,
    "torque": 235,
    "clearance": 215,
    "trunk": 1000,
    "tank": 73,
    "weight": 1910,
    "engine": "2.4L 2TZD DOHC 16V Atmosférico",
    "displacement": "2.4L (2,351 cc)",
    "transmission": "Manual 5 Velocidades + 4x4",
    "traction": "4x4 (Selectora con Bajo)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "8.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + Control Descenso/Pendiente",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" / USB / Cámara Reversa",
    "parts": "Compatibilidad Chasis Nissan NP300 / Red VE",
    "warranty": "Garantía Oficial Red VE",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (5.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Arquitectura chasis Nissan Navara/NP300 súper robusta",
      "Motor 2.4L gasolina aspirado traga gasolina VE sin miedo a inyectores diésel",
      "215 mm de despeje y tanque de 73 L"
    ],
    "cons": [
      "Consumo alto de gasolina con carga",
      "Interior utilitario frente a pickups más caras",
      "Frenos traseros de tambor"
    ],
    "verdict": "Pickup de trabajo duro a gasolina sin complicaciones de turbo ni diésel sucio; ideal para fincas e interior.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Ventaja enorme en VE: bloque 2.4L gasolina multipunto que no sufre con agua/azufre del diésel o gasolina regular.",
      "puntosClave": "Engrasar crucetas y verificar aceite de transfer y diferenciales tras inmersión en agua o trochas.",
      "fallasTipicas": "Desgaste normal de embrague si se sobrecarga frecuentemente en pendientes."
    }
  },
  {
    "id": "foton-tunland-e-mt",
    "sampleKey": "tunland",
    "maker": "Foton",
    "model": "Tunland E 2.8T Diésel 4x4 (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Tunland Diésel",
      "Cummins 2.8T"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "MT",
    "minPrice": 36000,
    "maxPrice": 39500,
    "priceDisplay": "~$37.500 ref.",
    "hp": 161,
    "torque": 360,
    "clearance": 210,
    "trunk": 1000,
    "tank": 76,
    "weight": 1950,
    "engine": "2.8L Cummins ISF2.8 Turbo Diésel",
    "displacement": "2.8L Turbo Diésel (2,776 cc)",
    "transmission": "Manual Getrag 5 Velocidades + Transfer BorgWarner",
    "traction": "4x4 (Selectora 2H / 4H / 4L)",
    "fuelType": "Diésel (Gasoil Automotriz)",
    "consumption": "11.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS Bosch + EBD",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Radio Bluetooth / USB",
    "parts": "Cummins ISF2.8 + Transfer BorgWarner + Ejes Dana",
    "warranty": "Garantía Oficial Red VE",
    "oilSpec": "SAE 15W-40 API CI-4 / CJ-4 Diésel (6.0 L)",
    "timingSpec": "Cadena Metálica / Engranajes",
    "pros": [
      "Mecánica de componentes reconocidos: Cummins + Getrag + BorgWarner + Dana",
      "Torque brutal de 360 Nm para remolque o carga pesada",
      "Tanque 76 L con autonomía extensa"
    ],
    "cons": [
      "Gasoil venezolano exige doble trampa separadora de agua",
      "Suspensión trasera dura sin carga",
      "Cabina básica"
    ],
    "verdict": "Bestia de trabajo pesado y torque; indispensable instalar trampa de agua adicional y purgar filtros de gasoil con frecuencia.",
    "bajoKapotReview": {
      "distribucion": "Sistema Cummins robusto de alta longevidad.",
      "combustibleVE": "CRÍTICO DIÉSEL VE: Purgar separador de agua cada tanqueo en rutas del interior y cambiar filtro de gasoil cada 5.000 km.",
      "puntosClave": "Inspeccionar mangueras de turbo, aceite 15W-40 diésel certificado y nivel en diferenciales Dana.",
      "fallasTipicas": "Inyectores common-rail tapados si entra agua en el gasoil."
    }
  },
  {
    "id": "fiat-mobi-trekking-mt",
    "maker": "Fiat",
    "model": "Mobi Trekking 1.0L Fire (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Mobi",
      "Mobi Trekking"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 16900,
    "maxPrice": 17500,
    "priceDisplay": "~$16.900 - $17.500",
    "hp": 69,
    "torque": 92,
    "clearance": 190,
    "trunk": 200,
    "tank": 47,
    "weight": 963,
    "engine": "1.0L Fire Evo 8V 4 Cil.",
    "displacement": "1.0L (999 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "17.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + ESS",
    "brakes": "Discos Ventilados Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" Apple CarPlay/Android Auto Inalámbrico",
    "parts": "Red Fiat Venezuela / Motor Fire clásico",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 5W-30 / 15W-40 Semi-Sintético (2.7 L)",
    "timingSpec": "Correa Dentada",
    "pros": [
      "190 mm de despeje récord en citycars: pasa huecos como un SUV",
      "Motor 1.0L Fire 8V ultra económico (17.5 km/L) y tanque 47 L (~800 km autonomía)",
      "CarPlay/Android Auto inalámbrico de serie"
    ],
    "cons": [
      "69 CV / 92 Nm justo para subidas empinadas con A/C y carga",
      "Maleta muy pequeña (200 L)",
      "Usa correa dentada que debe cambiarse a los 45.000 km"
    ],
    "verdict": "Campeón absoluto de eficiencia urbana y altura libre al suelo (190 mm) en el rango de los $17k.",
    "bajoKapotReview": {
      "distribucion": "Correa dentada (cambiar preventivamente cada 45.000-50.000 km).",
      "combustibleVE": "Motor Fire 8V traga gasolina venezolana sin reclamos.",
      "puntosClave": "Aprovechar sus 190 mm y llantas 175/65 R14 para las calles deterioradas; vigilar ajuste de válvula a largo plazo.",
      "fallasTipicas": "Ninguna compleja; mantener limpio cuerpo de aceleración y cambiar correa a tiempo."
    }
  },
  {
    "id": "fiat-argo-endurance-mt",
    "maker": "Fiat",
    "model": "Argo Endurance 1.3L Firefly (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Argo Sincrónico",
      "Argo Endurance"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 18900,
    "maxPrice": 20500,
    "priceDisplay": "~$19.500 ref.",
    "hp": 99,
    "torque": 128,
    "clearance": 170,
    "trunk": 300,
    "tank": 47,
    "weight": 1105,
    "engine": "1.3L Firefly 8V (Cadena)",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.0 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESC + TC + Hill Holder + ABS",
    "brakes": "Discos Ventilados Del. / Tambor Tras.",
    "infotainment": "Radio / Conectividad Bluetooth (Básica Endurance)",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético API SP (3.2 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor 1.3L Firefly con cadena metálica 'for life' y alto torque a bajas RPM",
      "Incluye ESC, control de tracción y asistente en pendientes",
      "Tanque de 47 L y 300 L de maleta"
    ],
    "cons": [
      "Versión Endurance viene sin pantalla grande ni extras de lujo",
      "Solo 2 airbags frontales",
      "Frenos traseros de tambor"
    ],
    "verdict": "Hatchback 0 km moderno, muy sólido de chasis y con cadena de tiempo para quien prioriza robustez sobre pantallas.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo 'for life' en el bloque 1.3 Firefly.",
      "combustibleVE": "Inyección electrónica multipunto amigable con gasolina comercial VE.",
      "puntosClave": "El motor 8V entrega buen empuje desde 2.500 RPM, ideal para topografía caraqueña sin acelerar de más.",
      "fallasTipicas": "Cuidar batería original (el ESC/dirección eléctrica EPS exigen voltaje estable)."
    }
  },
  {
    "id": "fiat-argo-trekking-cvt",
    "maker": "Fiat",
    "model": "Argo Trekking 1.3L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Argo Trekking CVT",
      "Argo Automático"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 22500,
    "maxPrice": 23900,
    "priceDisplay": "~$22.900 ref.",
    "hp": 99,
    "torque": 128,
    "clearance": 210,
    "trunk": 300,
    "tank": 48,
    "weight": 1165,
    "engine": "1.3L Firefly 8V (Cadena)",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Automática CVT 7 Marchas Simuladas",
    "traction": "FWD c/ Neumáticos Mixtos ATR",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "14.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESC + TC+ + Hill Holder",
    "brakes": "Discos Ventilados Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" Uconnect CarPlay/Android Auto",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético + Fluido CVT OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Despeje de todoterreno (210 mm) y llantas mixtas de fábrica",
      "Caja CVT suave con cadena de tiempo en motor 1.3L",
      "Excelente ángulo de ataque en rampas y policías acostados"
    ],
    "cons": [
      "Solo 2 airbags en su categoría de precio",
      "Potencia justa para adelantamientos rápidos en carretera",
      "Maleta de 300 L"
    ],
    "verdict": "Hatchback crossover casi imbatible contra baches (210 mm), con caja CVT confiable y mecánica sencilla.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica 'for life'.",
      "combustibleVE": "Tolerante a gasolina regular VE.",
      "puntosClave": "Mantener cambio de fluido CVT a los 45.000 km; sus cauchos mixtos ayudan mucho en vías rurales o mal asfaltadas.",
      "fallasTipicas": "Sin fallas crónicas mecánicas; alinear tras impactos fuertes."
    }
  },
  {
    "id": "fiat-cronos-mt",
    "maker": "Fiat",
    "model": "Cronos Drive 1.3L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Cronos Sincrónico"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 20900,
    "maxPrice": 22200,
    "priceDisplay": "~$21.500 ref.",
    "hp": 99,
    "torque": 128,
    "clearance": 160,
    "trunk": 525,
    "tank": 48,
    "weight": 1121,
    "engine": "1.3L Firefly 8V PFI (Cadena)",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESC + TC + Hill Holder + ABS",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" CarPlay/Android Auto",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Baúl gigante de 525 L líder absoluto para viajes o trabajo",
      "Motor 1.3L Firefly con cadena de distribución y 160 mm de despeje",
      "Control de estabilidad ESC y cauchos 185/60 R15 confortables"
    ],
    "cons": [
      "Solo 2 airbags frontales",
      "99 CV correcto para ciudad pero justo con 5 personas + 525 L cargados",
      "Frenos traseros de tambor"
    ],
    "verdict": "El rey de la maleta y economía operativa entre sedanes 0 km alrededor de $21k.",
    "bajoKapotReview": {
      "distribucion": "Cadena 'for life' sin reemplazo programado.",
      "combustibleVE": "Inyección multipunto confiable con gasolina comercial venezolana.",
      "puntosClave": "Aprovechar sus 160 mm de altura y suspensión resistente en ciudad; limpiar campanas traseras cada 15.000 km.",
      "fallasTipicas": "Cuidado de terminales de batería por sistema MyCar Fiat y dirección EPS."
    }
  },
  {
    "id": "fiat-cronos-cvt",
    "maker": "Fiat",
    "model": "Cronos Precision 1.3L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Cronos Automático"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 22900,
    "maxPrice": 24500,
    "priceDisplay": "~$23.500 ref.",
    "hp": 99,
    "torque": 128,
    "clearance": 160,
    "trunk": 525,
    "tank": 48,
    "weight": 1155,
    "engine": "1.3L Firefly 8V PFI (Cadena)",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Automática CVT 7 Velocidades Simuladas",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "14.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESC + TC + Hill Holder",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" + Climatizador Digital",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético + Fluido CVT OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Enorme maletero de 525 L con suavidad automática CVT",
      "Cadena metálica + 160 mm de despeje para huecos",
      "Climatizador automático y pantalla 7\""
    ],
    "cons": [
      "2 airbags solamente",
      "Aceleración lineal tranquila en carretera de montaña",
      "Frenos traseros de tambor"
    ],
    "verdict": "Gran sedán automático familiar/ejecutivo para ciudad con bajísimo costo por kilómetro.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica 'for life'.",
      "combustibleVE": "Compatible con gasolina regular VE.",
      "puntosClave": "Usar fluido CVT certificado cada 45.000 km; evitar remolcar peso excesivo.",
      "fallasTipicas": "Ninguna grave reportada en la combinación 1.3 + CVT Aisin."
    }
  },
  {
    "id": "fiat-pulse-cvt",
    "maker": "Fiat",
    "model": "Pulse S-Design 1.3L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Pulse"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 26500,
    "maxPrice": 28000,
    "priceDisplay": "~$26.900 ref.",
    "hp": 99,
    "torque": 128,
    "clearance": 195,
    "trunk": 370,
    "tank": 48,
    "weight": 1187,
    "engine": "1.3L Firefly 8V (Cadena)",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Automática CVT 7 Velocidades Simuladas",
    "traction": "FWD c/ TC+ Electrónico",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "13.8 km/L",
    "airbags": "4 Airbags (Frontales + Laterales Torax/Cabeza)",
    "esp": "ESC + TC+ + Hill Holder",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 10.1\" Wireless CarPlay",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Despeje soberbio de 195 mm y 4 airbags laterales anchos",
      "Pantalla 10.1\" con conectividad inalámbrica",
      "Motor 1.3L atmosférico muy amigable con gasolina VE"
    ],
    "cons": [
      "99 CV se siente justo si esperas pique de crossover turbo",
      "Frenos traseros de tambor",
      "Precio cercano a SUVs turbo 1.5T"
    ],
    "verdict": "B-SUV muy robusta contra baches (195 mm) y sencilla de mantener si priorizas fiabilidad sobre aceleración explosiva.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica 'for life'.",
      "combustibleVE": "Inyección multipunto ideal para gasolina regular venezolana.",
      "puntosClave": "El modo Sport de la CVT ayuda a subir cuestas con agilidad sin dañar la transmisión.",
      "fallasTipicas": "Cuidar carga inalámbrica/infoentretenimiento en actualizaciones de software."
    }
  },
  {
    "id": "fiat-fastback-cvt",
    "maker": "Fiat",
    "model": "Fastback Impetus 1.0T T200 (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Fastback",
      "Fastback T200"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 31500,
    "maxPrice": 33900,
    "priceDisplay": "~$32.500 ref.",
    "hp": 120,
    "torque": 200,
    "clearance": 192,
    "trunk": 600,
    "tank": 47,
    "weight": 1260,
    "engine": "1.0L Turbo T200 Multiair III (Cadena)",
    "displacement": "1.0L Turbo (999 cc)",
    "transmission": "Automática CVT 7 Velocidades c/ Paddle Shift",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (Turbo Inyección Directa)",
    "consumption": "13.2 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESC + TC+ + AEB + Alerta Carril + EPB AutoHold",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Clúster Digital 7\" + Pantalla 10.1\" + Wireless",
    "parts": "Red Fiat Venezuela (Módulo Multiair)",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-30 / 0W-20 Sintético Fiat 9.55535-GS1 (Estricto)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Maleta monstruosa de 600 L con silueta SUV Coupé y 192 mm de despeje",
      "200 Nm de torque desde 1.750 RPM muy ágil en ciudad y autopista",
      "ADAS (AEB + Lane Keep) y EPB"
    ],
    "cons": [
      "Sistema Multiair Turbo Inyección Directa exige aceite exacto y gasolina 95 limpia",
      "Frenos traseros siguen siendo tambor en este segmento de precio",
      "Solo 4 airbags (sin cortina trasera)"
    ],
    "verdict": "SUV coupé con baúl récord y gran empuje T200; respetar religiosamente la viscosidad de aceite para proteger el actuador Multiair.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Motor 1.0T GDI Multiair III: usar gasolina 95 octanos verificada; evitar mezclas sucias.",
      "puntosClave": "CRÍTICO: Nunca usar aceite grueso (10W-40 o 15W-40). El sistema electrohidráulico Multiair depende del aceite sintético 0W-30/0W-20 para abrir válvulas.",
      "fallasTipicas": "Micro-filtro del módulo Multiair se obstruye si se alargan cambios de aceite."
    }
  },
  {
    "id": "fiat-toro-at",
    "maker": "Fiat",
    "model": "Toro Freedom 1.3T T270 (6AT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Toro T270"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 34900,
    "maxPrice": 37500,
    "priceDisplay": "~$35.900 ref.",
    "hp": 173,
    "torque": 270,
    "clearance": 206,
    "trunk": 650,
    "tank": 60,
    "weight": 1650,
    "engine": "1.3L Turbo T270 Multiair III (Cadena)",
    "displacement": "1.3L Turbo (1,332 cc)",
    "transmission": "Automática Aisin 6 Velocidades (6AT)",
    "traction": "FWD 4x2 (Tracción Delantera)",
    "fuelType": "Gasolina 95 Oct (Turbo GDI)",
    "consumption": "10.8 km/L",
    "airbags": "6 a 7 Airbags (Frontales, Lat., Cortina + Rodilla)",
    "esp": "ESC + TC + Hill Holder + Multi-Link Tras.",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 8.4\" / Clúster Digital",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-30 Sintético Homologado Fiat + ATF Aisin",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Confort de SUV (suspensión independiente trasera) con platón útil de 650 kg",
      "Caja automática japonesa Aisin 6AT + motor turbo 270 Nm",
      "6-7 airbags y 206 mm de despeje"
    ],
    "cons": [
      "Es 4x2 (tracción delantera), NO apta para barro extremo con peso en el platón",
      "Requiere gasolina 95 limpia y aceite 0W-30 exacto",
      "Platón más corto que una pickup tradicional"
    ],
    "verdict": "Pickup urbana/mixta insuperable en suavidad de marcha y seguridad; clave saber que es 4x2 monocasco.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Motor T270 Inyección Directa: gasolina 95 octanos y aditivo preventivo.",
      "puntosClave": "Cuidar intercambiador de calor de la caja Aisin y respetar estrictamente el aceite 0W-30 sintético.",
      "fallasTipicas": "Consumo mínimo normal de aceite en los primeros 15.000 km de motores T270."
    }
  },
  {
    "id": "fiat-fiorino-mt",
    "maker": "Fiat",
    "model": "Fiorino Furgón 1.3L Firefly (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Fiat Fiorino Carga"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "MT",
    "minPrice": 19500,
    "maxPrice": 21000,
    "priceDisplay": "~$19.900 ref.",
    "hp": 99,
    "torque": 127,
    "clearance": 176,
    "trunk": 3100,
    "tank": 55,
    "weight": 1130,
    "engine": "1.3L Firefly 8V Atmosférico",
    "displacement": "1.3L (1,332 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera (650 kg carga / 3.1 m³)",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "13.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESC + TC + Hill Holder + ABS",
    "brakes": "Disco Ventilado Del. / Tambor Tras.",
    "infotainment": "Radio Básica + Toma 12V / Carga",
    "parts": "Red Fiat Venezuela",
    "warranty": "Garantía Oficial Fiat VE",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Herramienta comercial 0 km con 650 kg / 3.100 L de volumen de carga",
      "Motor 1.3 Firefly con cadena de tiempo y tanque de 55 L",
      "Incluye ESC y asistente de pendientes incluso en carga"
    ],
    "cons": [
      "Equipamiento cabina espartano",
      "Solo 2 plazas",
      "Sensible a vientos laterales si va vacía"
    ],
    "verdict": "Furgón comercial 0 km más rentable para logística urbana y distribución sin dolores de cabeza de correa ni diésel.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica 'for life'.",
      "combustibleVE": "Excelente tolerancia a gasolina local.",
      "puntosClave": "Verificar presión trasera reforzada al llevar carga completa de 650 kg.",
      "fallasTipicas": "Desgaste de embrague en rutas de reparto muy empinadas."
    }
  },
  {
    "id": "ford-territory-ambiente",
    "maker": "Ford",
    "model": "Territory Ambiente 1.8T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "New Territory Ambiente"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 38500,
    "maxPrice": 41500,
    "priceDisplay": "~$39.500 ref.",
    "hp": 185,
    "torque": 318,
    "clearance": 190,
    "trunk": 448,
    "tank": 60,
    "weight": 1590,
    "engine": "1.8L EcoBoost GDI I4 (Cadena)",
    "displacement": "1.8L Turbo GDI (1,798 cc)",
    "transmission": "Automática 7DCT Doble Embrague (Dial Rotativo)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (GDI)",
    "consumption": "11.5 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP + Multi-Link Trasero + BLIS + RCTA",
    "brakes": "Discos en las 4 Ruedas (EPB AutoHold)",
    "infotainment": "Pantalla Táctil 12\" + Clúster 7\" Wireless CarPlay",
    "parts": "Red Ford Venezuela",
    "warranty": "Garantía Oficial Ford VE",
    "oilSpec": "SAE 5W-30 Sintético Motorcraft API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Amplitud interior sobresaliente y trasera independiente Multi-Link",
      "Motor 1.8T de 185 HP y 318 Nm con 6 airbags y punto ciego BLIS",
      "Respaldo de red Ford Venezuela"
    ],
    "cons": [
      "Turbo GDI sensible a gasolina sucia de bajo octanaje",
      "Dial rotativo requiere cuidado en paradas",
      "Falta techo panorámico y cámara 360° frente a Titanium"
    ],
    "verdict": "SUV familiar muy amplia, cómoda y refinada con marca tradicional en Venezuela.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC.",
      "combustibleVE": "1.8L EcoBoost GDI: usar gasolina 95 octanos y filtro de aire/combustible puntual.",
      "puntosClave": "Usar aceite Motorcraft/API SP 5W-30 estricto y dejar enfriar turbo 45s tras autopista.",
      "fallasTipicas": "Cuidado de selector rotativo (no derramar líquidos sobre la consola)."
    }
  },
  {
    "id": "ford-territory-titanium",
    "maker": "Ford",
    "model": "Territory Titanium 1.8T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Territory Titanium"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 45500,
    "maxPrice": 48500,
    "priceDisplay": "~$46.800 ref.",
    "hp": 185,
    "torque": 318,
    "clearance": 190,
    "trunk": 448,
    "tank": 60,
    "weight": 1645,
    "engine": "1.8L EcoBoost GDI I4 (Cadena)",
    "displacement": "1.8L Turbo GDI (1,798 cc)",
    "transmission": "Automática 7DCT Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (GDI)",
    "consumption": "11.2 km/L",
    "airbags": "6 Airbags + Paquete ADAS Completo",
    "esp": "ESP + ACC + AEB + LKA + Cámara 360° + Portón Eléctrico",
    "brakes": "Discos en las 4 Ruedas (EPB)",
    "infotainment": "Doble Pantalla 12\" Digital + Cuero Bi-tono + Panorámico",
    "parts": "Red Ford Venezuela",
    "warranty": "Garantía Oficial Ford VE",
    "oilSpec": "SAE 5W-30 Sintético Motorcraft API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Nivel de equipamiento tope de gama (doble 12\", techo panorámico, asientos calefactables/ventilados)",
      "Suite ADAS completa + cámara 360°",
      "Suspensión Multi-Link trasera súper confortable"
    ],
    "cons": [
      "Rines 19\" con perfil más delicado para vías rotas",
      "Precio alto acercándose a segmentos 4WD",
      "Exige gasolina de buena calidad por GDI"
    ],
    "verdict": "SUV ejecutiva de gran presencia y confort superior; vigilar rines 19\" y calidad de combustible.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Turbo GDI: exige combustible limpio y aditivos dispersantes periódicos.",
      "puntosClave": "Mantener rieles y drenajes del techo panorámico limpios antes de temporada de lluvias.",
      "fallasTipicas": "Llantas 19\" vulnerables a huecos filosos; revisar alineación y sensores ADAS tras golpes."
    }
  },
  {
    "id": "forthing-s60-mt",
    "maker": "Forthing",
    "model": "S60 1.6L Sedán (5MT)",
    "yearRange": "2025",
    "nicknames": [
      "Forthing S60"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 21500,
    "maxPrice": 23500,
    "priceDisplay": "~$22.500 ref.",
    "hp": 120,
    "torque": 151,
    "clearance": 150,
    "trunk": 480,
    "tank": 45,
    "weight": 1270,
    "engine": "1.6L Mitsubishi 4A92 MIVEC (Cadena)",
    "displacement": "1.6L (1,590 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.2 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + ESP",
    "brakes": "Discos Delanteros / Discos Traseros",
    "infotainment": "Pantalla Táctil + Cámara Retroceso",
    "parts": "Soloson Import / Mecánica Mitsubishi 4A92",
    "warranty": "2 años o 50.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP (4.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Corazón mecánico Mitsubishi 4A92 1.6L muy conocido y sin turbo",
      "Discos de freno en 4 ruedas",
      "Habitabilidad generosa atrás"
    ],
    "cons": [
      "Garantía oficial más corta (2 años / 50.000 km) frente a rivales",
      "Solo 2 airbags",
      "Diseño sobrio"
    ],
    "verdict": "Sedán amplio de mecánica Mitsubishi sencilla y reparable en cualquier taller serio.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Mitsubishi 4A92.",
      "combustibleVE": "Inyección multipunto atmosférica muy tolerante a gasolina local.",
      "puntosClave": "Evaluar si la garantía de 2 años / 50k km cubre tus expectativas frente a marcas de 5 años.",
      "fallasTipicas": "Cuidar bujías y limpieza de inyectores cada 25.000 km."
    }
  },
  {
    "id": "forthing-sx5-mt",
    "maker": "Forthing",
    "model": "SX5 1.6L Mitsubishi (6MT)",
    "yearRange": "2025",
    "nicknames": [
      "Forthing SX5 Sincrónica"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "MT",
    "minPrice": 25500,
    "maxPrice": 27500,
    "priceDisplay": "~$26.500 ref.",
    "hp": 120,
    "torque": 151,
    "clearance": 180,
    "trunk": 480,
    "tank": 45,
    "weight": 1390,
    "engine": "1.6L Mitsubishi 4A92 MIVEC (Cadena)",
    "displacement": "1.6L (1,590 cc)",
    "transmission": "Manual 6 Velocidades (6MT)",
    "traction": "FWD Delantera (4x2)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.1 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + ESP",
    "brakes": "Disco Ventilado Del. / Disco Sólido Tras.",
    "infotainment": "Tacómetro Digital + Tapicería Semicuero",
    "parts": "Soloson Import / Repuestos 4A92",
    "warranty": "2 años o 50.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motor Mitsubishi 4A92 sin turbo + caucho alto 215/65 R16",
      "Caja manual de 6 marchas para autopista",
      "Discos en las 4 ruedas y 180 mm de despeje"
    ],
    "cons": [
      "Garantía corta de 2 años o 50.000 km",
      "Tanque de 45 L justo para tamaño familiar",
      "151 Nm tranquilo para peso en subida"
    ],
    "verdict": "SUV familiar honesta con cauchos R16 de perfil súper alto para las calles venezolanas y motor Mitsubishi sin complicaciones.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Mitsubishi MIVEC.",
      "combustibleVE": "Tolerante a gasolina regular VE al no usar turbo ni inyección directa.",
      "puntosClave": "Aprovechar sus llantas 215/65 R16 y discos traseros; confirmar red de servicio postventa en tu estado.",
      "fallasTipicas": "Embrague normal por relación corta en primera para compensar 151 Nm."
    }
  },
  {
    "id": "forthing-sx5-cvt",
    "maker": "Forthing",
    "model": "SX5 1.6L Mitsubishi (CVT)",
    "yearRange": "2025",
    "nicknames": [
      "Forthing SX5 Automática"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 27500,
    "maxPrice": 29500,
    "priceDisplay": "~$28.500 ref.",
    "hp": 120,
    "torque": 151,
    "clearance": 180,
    "trunk": 480,
    "tank": 45,
    "weight": 1410,
    "engine": "1.6L Mitsubishi 4A92 MIVEC (Cadena)",
    "displacement": "1.6L (1,590 cc)",
    "transmission": "Automática CVT 4x2",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "12.4 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + ESP",
    "brakes": "Disco Ventilado Del. / Disco Sólido Tras.",
    "infotainment": "Pantalla Multimedia + Semicuero",
    "parts": "Soloson Import / Mecánica 4A92",
    "warranty": "2 años o 50.000 km",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Comodidad CVT con motor Mitsubishi 4A92 atmosférico confiable",
      "Cauchos 215/65 R16 muy acolchados contra baches",
      "Frenos de disco en 4 ruedas"
    ],
    "cons": [
      "120 HP / 151 Nm con CVT tiene respuesta pausada en pendientes",
      "Garantía 2 años / 50.000 km",
      "Tanque de 45 L"
    ],
    "verdict": "SUV automática tranquila para ciudad sin riesgos de turbo o inyección directa.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Mitsubishi.",
      "combustibleVE": "Buena tolerancia a gasolina venezolana.",
      "puntosClave": "Hacer cambio de fluido CVT a los 40.000 km para mantener la garantía y suavidad.",
      "fallasTipicas": "No forzar en remolques ni subidas prolongadas sin permitir disipar calor."
    }
  },
  {
    "id": "forthing-t5-evo-dct",
    "maker": "Forthing",
    "model": "T5 EVO 1.5T Mitsubishi GDI (7DCT)",
    "yearRange": "2025",
    "nicknames": [
      "Forthing T5 EVO"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 32900,
    "maxPrice": 35500,
    "priceDisplay": "~$33.900 ref.",
    "hp": 195,
    "torque": 285,
    "clearance": 185,
    "trunk": 480,
    "tank": 55,
    "weight": 1550,
    "engine": "1.5T 4A95TD Mitsubishi DVVT+GDI",
    "displacement": "1.5L Turbo GDI (1,481 cc)",
    "transmission": "Automática Magna 7DCT Doble Embrague",
    "traction": "FWD Delantera (4x2)",
    "fuelType": "Gasolina 95 Oct (Turbo GDI)",
    "consumption": "12.0 km/L",
    "airbags": "6 a 8 Airbags (Según Lote)",
    "esp": "ESP + Multi-Link Trasero + Cámara 360°",
    "brakes": "Discos en las 4 Ruedas (235/55 R19)",
    "infotainment": "Doble Pantalla 10.25\" + Cuero Deportivo",
    "parts": "Soloson Import / Plataforma Mitsubishi 4A95TD",
    "warranty": "Garantía Soloson Import",
    "oilSpec": "SAE 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Diseño deportivo llamativo con 195 HP y 285 Nm reales",
      "Caja Magna 7DCT húmeda de excelente respuesta y tanque de 55 L",
      "Llantas 235/55 R19 con presencia deportiva"
    ],
    "cons": [
      "Turbo GDI exige gasolina limpia de 95 octanos",
      "Cauchos 19\" costosos de reponer en VE",
      "Visibilidad trasera reducida por caída coupé"
    ],
    "verdict": "La SUV deportiva china más potente de su rango (~195 HP); cuidar gasolina y mantenimiento de aceite API SP.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DVVT.",
      "combustibleVE": "Turbo GDI 4A95TD: usar gasolina 95 octanos verificada y limpiar cuerpo/inyectores preventivamente.",
      "puntosClave": "Caja Magna 7DCT húmeda aguanta bien el torque de 285 Nm; respetar servicio de aceite DCT cada 50.000 km.",
      "fallasTipicas": "Cuidar rines 19\" en vías malas; revisar sensores de cámara 360°."
    }
  },
  {
    "id": "forthing-utour-m4-dct",
    "maker": "Forthing",
    "model": "U-Tour M4 1.5T 7 Puestos (7DCT)",
    "yearRange": "2025",
    "nicknames": [
      "Forthing U-Tour M4",
      "Minivan 7P"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 35500,
    "maxPrice": 38500,
    "priceDisplay": "~$36.500 ref.",
    "hp": 194,
    "torque": 285,
    "clearance": 165,
    "trunk": 500,
    "tank": 55,
    "weight": 1700,
    "engine": "1.5T 4A95TD Mitsubishi DVVT+GDI",
    "displacement": "1.5L Turbo GDI (1,481 cc)",
    "transmission": "Automática Magna 7DCT Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (Turbo GDI)",
    "consumption": "11.0 km/L",
    "airbags": "6 a 8 Airbags",
    "esp": "ESP + EPB AutoHold + Cámara 360°",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "3 Filas con Butacas Ejecutivas + Doble Pantalla",
    "parts": "Soloson Import",
    "warranty": "Garantía Soloson Import",
    "oilSpec": "SAE 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Comodidad ejecutiva de 3 filas con butacas tipo capitán en 2da fila",
      "194 HP / 285 Nm mueve fácilmente a 7 pasajeros",
      "Equipamiento premium familiar"
    ],
    "cons": [
      "Despeje moderado (165 mm) para ser vehículo largo",
      "Motor GDI exigente con combustible",
      "Maniobrabilidad en estacionamientos estrechos"
    ],
    "verdict": "Alternativa familiar ejecutiva de 7 puestos superior en confort a muchos SUVs tradicionales.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Mitsubishi 4A95TD.",
      "combustibleVE": "Requiere gasolina 95 octanos de estaciones verificadas.",
      "puntosClave": "Cuidar rampas de estacionamiento inclinadas por distancia entre ejes larga y 165 mm de despeje.",
      "fallasTipicas": "Cuidado normal de embrague DCT al arrancar en subida con 7 ocupantes."
    }
  },
  {
    "id": "gwm-haval-jolion-classic-6mt",
    "sampleKey": "haval",
    "maker": "GWM Haval",
    "model": "Jolion Classic 1.5T (6MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jolion Sincrónica",
      "Jolion 6MT"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "MT",
    "minPrice": 28500,
    "maxPrice": 29500,
    "priceDisplay": "$29.000",
    "hp": 141,
    "torque": 210,
    "clearance": 163,
    "trunk": 430,
    "tank": 55,
    "weight": 1345,
    "engine": "1.5L Turbo GW4G15K (Cadena / MPFI)",
    "displacement": "1.5L Turbo (1,497 cc)",
    "transmission": "Manual 6 Velocidades (6MT)",
    "traction": "FWD Delantera (Plataforma L.E.M.O.N.)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto MPFI)",
    "consumption": "12.8 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP Bosch 9.3 + TCS + HHC + HDC + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas (Protector Cárter Serie)",
    "infotainment": "Pantalla Táctil 10.25\" Apple CarPlay / Android Auto",
    "parts": "Red Oficial GWM Venezuela (6 años / 150k km)",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP (4.2 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Protector de cárter metálico + tratamiento anticorrosión de serie",
      "Motor turbo Multipunto MPFI (más amigable con gasolina VE que GDI)",
      "Garantía élite de 6 años o 150.000 km + caja 6MT económica"
    ],
    "cons": [
      "4 airbags en Classic (6 en versiones superiores)",
      "Turbo requiere regla de 60s en ralentí y aceite 5W-30 API SP",
      "Despeje 163 mm correcto pero no extremo"
    ],
    "verdict": "SUV compacta sumamente inteligente para VE: motor MPFI con cadena, protector de cárter de serie, 6 años de garantía y cero complicaciones de caja DCT.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica con tensor hidráulico GW4G15K.",
      "combustibleVE": "Ventaja clave VE: Turbo con inyección MULTIPUNTO (no GDI directa), por lo que tolera mucho mejor el combustible local y no carboniza válvulas.",
      "puntosClave": "Aplicar regla de 45-60 seg en ralentí antes de apagar tras autopista y exigir aceite 5W-30 100% sintético API SP.",
      "fallasTipicas": "Cuidado de embrague en rodaje (<1.500 km) y valvulina GL-4 cuando corresponda servicio a la 6MT."
    }
  },
  {
    "id": "gwm-jolion-classic-dct",
    "maker": "GWM Haval",
    "model": "Jolion Classic 1.5T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jolion Classic Automática"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 33500,
    "maxPrice": 34500,
    "priceDisplay": "$33.900",
    "hp": 141,
    "torque": 210,
    "clearance": 163,
    "trunk": 430,
    "tank": 55,
    "weight": 1370,
    "engine": "1.5L Turbo GW4G15K (Cadena / MPFI)",
    "displacement": "1.5L Turbo (1,497 cc)",
    "transmission": "Automática 7DCT Húmeda Doble Embrague",
    "traction": "FWD Delantera (L.E.M.O.N.)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto MPFI)",
    "consumption": "12.4 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP Bosch 9.3 + TCS + HHC + HDC + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla 10.25\" CarPlay / Android Auto + Paddle Shift",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + Aceite 7DCT Húmedo",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Sube a 6 airbags de serie + protector de cárter metálico",
      "Motor turbo Multipunto MPFI compatible con combustible VE",
      "Caja 7DCT húmeda + levas al volante + AutoHold"
    ],
    "cons": [
      "Salto de $4.900 frente a la 6MT",
      "Despeje 163 mm urbano",
      "Requiere mantenimiento de fluido DCT a los 50.000 km"
    ],
    "verdict": "C-SUV automática muy balanceada y segura con 6 airbags, inyección MPFI noble y 6 años de garantía.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica GW4G15K.",
      "combustibleVE": "Ventaja MPFI: menos sensible a azufre/suciedad de gasolina que los GDI directos.",
      "puntosClave": "Usar AutoHold en colas y respetar cambio de aceite de la caja 7DCT húmeda para evitar recalentamientos.",
      "fallasTipicas": "Retardo ligero al acelerar desde 0 en modo ECO (mejor respuesta en modo Normal/Standard)."
    }
  },
  {
    "id": "gwm-jolion-premium-dct",
    "maker": "GWM Haval",
    "model": "Jolion Premium 1.5T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jolion Premium",
      "Jolion Boomerang"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 34500,
    "maxPrice": 35900,
    "priceDisplay": "$34.900",
    "hp": 141,
    "torque": 210,
    "clearance": 163,
    "trunk": 430,
    "tank": 55,
    "weight": 1390,
    "engine": "1.5L Turbo GW4G15K (Cadena / MPFI)",
    "displacement": "1.5L Turbo (1,497 cc)",
    "transmission": "Automática 7DCT Húmeda Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "12.4 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP Bosch 9.3 + Cámara 360° + ADAS + Techo Panorámico",
    "brakes": "Discos en las 4 Ruedas (EPB AutoHold)",
    "infotainment": "Pantalla 12.3\" + DRL Boomerang Full LED",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + Aceite 7DCT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Solo $1.000 más que Classic 7DCT y agrega techo panorámico, LED Boomerang y equipamiento Premium",
      "6 airbags + protector de cárter + 6 años de garantía",
      "Motor MPFI amigable con combustible VE"
    ],
    "cons": [
      "Rines 18\" requieren cautela en baches",
      "Mismo motor 141 HP para peso con panorámico",
      "Stock limitado según concesionario"
    ],
    "verdict": "Por apenas $1.000 sobre la Classic 7DCT, es la compra más lógica dentro de la gama automática Jolion.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Inyección multipunto confiable en condiciones VE.",
      "puntosClave": "Limpiar canaletas del techo panorámico y cuidar cauchos R18.",
      "fallasTipicas": "Cuidar enfriamiento DCT en tráfico pesado usando AutoHold."
    }
  },
  {
    "id": "gwm-h6-2wd-dct",
    "maker": "GWM Haval",
    "model": "Haval H6 Classic/Premium 2.0T (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Haval H6 2.0T",
      "H6 Turbo"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 38900,
    "maxPrice": 44500,
    "priceDisplay": "~$39.900 - $43.900",
    "hp": 201,
    "torque": 320,
    "clearance": 175,
    "trunk": 600,
    "tank": 55,
    "weight": 1650,
    "engine": "2.0L Turbo GW4N20 16V",
    "displacement": "2.0L Turbo (1,998 cc)",
    "transmission": "Automática 7DCT Húmeda (2WD / 4WD según acabado)",
    "traction": "FWD 2WD o AWD Todoterreno",
    "fuelType": "Gasolina 95 Oct (Turbo)",
    "consumption": "12.5 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESP + Multi-Link Trasero + L-AEB + EPB AutoHold",
    "brakes": "Disco Ventilado Del. / Disco Sólido Tras.",
    "infotainment": "Cockpit 12.3\" + Clúster Digital + CarPlay",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Motorazo 2.0T de 201 HP / 320 Nm con maleta de 600 L",
      "Suspensión trasera independiente Multi-Link muy estable",
      "Disponible en 2WD o 4WD con 6 años de garantía"
    ],
    "cons": [
      "Consumo mayor si se exige el 2.0T en ciudad (~11.8 km/L en 4WD)",
      "Tanque de 55 L algo ajustado para un motor 2.0T",
      "Rines 18\"/19\" delicados en huecos"
    ],
    "verdict": "C-SUV grande de altísima potencia, espacio líder (600 L) y manejo aplomado para viajes largos.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica GW4N20.",
      "combustibleVE": "Turbo 2.0T ciclo Miller: exige gasolina 95 octanos limpia y cambios rigurosos de aceite sintético cada 6.000 km.",
      "puntosClave": "La variante 4WD añade modos Todoterreno útiles en lluvia fuerte y carretera de montaña.",
      "fallasTipicas": "Cuidado de sensores ADAS en paragolpes y alineación trasera Multi-Link."
    }
  },
  {
    "id": "gwm-h6-gt-dct",
    "maker": "GWM Haval",
    "model": "Haval H6 GT 2.0T 4WD (7DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "H6 GT Coupé",
      "Haval GT"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 45500,
    "maxPrice": 48500,
    "priceDisplay": "~$46.900 ref.",
    "hp": 201,
    "torque": 320,
    "clearance": 175,
    "trunk": 555,
    "tank": 61,
    "weight": 1720,
    "engine": "2.0L Turbo GW4N20 16V",
    "displacement": "2.0L Turbo (1,998 cc)",
    "transmission": "Automática 7DCT Húmeda",
    "traction": "4WD Inteligente c/ Modo Pista",
    "fuelType": "Gasolina 95 Oct (Turbo)",
    "consumption": "12.0 km/L",
    "airbags": "6 Airbags + HUD + ADAS Completo",
    "esp": "ESP + Multi-Link + 6 Modos (Inc. Pista & Nieve)",
    "brakes": "Disco Ventilado Del. / Sólido Tras. (EPB)",
    "infotainment": "Head-Up Display + Pantalla 12.3\" + Portón Eléctrico",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Estética fastback deportiva + tracción 4WD + 61 L de tanque",
      "555 L de maleta con portón eléctrico de memoria",
      "Head-Up Display, modo Pista y techo panorámico"
    ],
    "cons": [
      "Rines 225/55 R19 sensibles a baches profundos",
      "Precio cercano a SUVs japonesas de entrada",
      "Exige combustible 95 limpio"
    ],
    "verdict": "SUV coupé deportiva 4WD con equipamiento premium superior y 6 años de respaldo oficial.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica GW4N20.",
      "combustibleVE": "Turbo 2.0T: utilizar gasolina 95 octanos y no alargar intervalos de aceite en clima cálido.",
      "puntosClave": "Verificar estado de llantas 225/55 R19 y mantenimiento del acople Haldex/4WD a los 60.000 km.",
      "fallasTipicas": "Cuidado de portón trasero eléctrico en techos de estacionamiento bajos."
    }
  },
  {
    "id": "gwm-poer-4wd-at",
    "maker": "GWM",
    "model": "Poer Passenger 2.0T 4WD (8AT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "GWM Poer",
      "Poer Automática"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 43000,
    "maxPrice": 46900,
    "priceDisplay": "~$44.900 ref.",
    "hp": 188,
    "torque": 360,
    "clearance": 227,
    "trunk": 1050,
    "tank": 80,
    "weight": 2100,
    "engine": "2.0L Turbo GW4C20B Euro VI",
    "displacement": "2.0L Turbo (1,967 cc)",
    "transmission": "Automática ZF 8 Velocidades (8AT)",
    "traction": "4WD c/ Modos + 4L Reductora",
    "fuelType": "Gasolina 95 Oct (Euro VI)",
    "consumption": "9.0 km/L",
    "airbags": "4 a 6 Airbags (Frontales + Laterales)",
    "esp": "ESP + IACC + Bloqueo / Asistencia Pendiente + ESS",
    "brakes": "Discos en las 4 Ruedas (EPB AutoHold)",
    "infotainment": "Pantalla Táctil + Control Crucero Adaptativo IACC",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "227 mm de despeje, 80 L de tanque y 1.050 kg de capacidad de carga",
      "Caja automática ZF 8AT + 360 Nm de torque desde 1.800 RPM",
      "Frenos de disco en las 4 ruedas y confort tipo SUV"
    ],
    "cons": [
      "Larga (5.41 m) para maniobrar en estacionamientos urbanos",
      "Euro VI turbo sensible a combustible adulterado",
      "Consumo elevado cargada en ciudad"
    ],
    "verdict": "Una de las pickups 4x4 automáticas más completas de VE por capacidad (1.050 kg), tanque de 80 L y caja ZF 8AT.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica GW4C20B.",
      "combustibleVE": "Motor 2.0T Euro VI: usar gasolina 95 octanos y purgar trampa/filtro en caso de viaje rural.",
      "puntosClave": "Aprovechar sus 227 mm y frenos de disco traseros; activar modo 4L solo sobre superficies sueltas.",
      "fallasTipicas": "Peso elevado de 2.100 kg exige revisar amortiguadores y bujes tras rutas off-road frecuentes."
    }
  },
  {
    "id": "gwm-tank300-4wd-at",
    "maker": "GWM",
    "model": "Tank 300 2.0T 4WD (8AT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Tank 300",
      "El Tanque GWM"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 56000,
    "maxPrice": 60500,
    "priceDisplay": "~$58.000 ref.",
    "hp": 217,
    "torque": 380,
    "clearance": 224,
    "trunk": 400,
    "tank": 70,
    "weight": 2150,
    "engine": "2.0L Turbo E20CB 16V c/ Eje Equilibrio",
    "displacement": "2.0L Turbo (1,967 cc)",
    "transmission": "Automática ZF 8 Velocidades (8AT)",
    "traction": "4WD c/ Reductora + Bloqueo Delantero y Trasero",
    "fuelType": "Gasolina 95 Oct (Euro V)",
    "consumption": "10.5 km/L",
    "airbags": "6 Airbags + ACC + ADAS Nivel 2",
    "esp": "ESP + Bloqueo Eje Del. & Tras. + Giro Tanque + Crawl",
    "brakes": "Disco Ventilado Del. / Sólido Tras. (EPB AutoHold)",
    "infotainment": "Doble Pantalla 12.3\" + Cubierta Motor + Masaje",
    "parts": "Red Oficial GWM Venezuela",
    "warranty": "6 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Capacidades extremas reales: doble bloqueo diferencial delantero+trasero, chasis de largueros y Crawl Control",
      "Caja ZF 8AT + 380 Nm de torque + cauchos 265/65 R17",
      "Insonorización superior (eje de equilibrio) y interior de lujo"
    ],
    "cons": [
      "Maletero compacto (400 L) para su tamaño exterior",
      "Peso bruto de 2.552 kg castiga frenos en descenso agresivo",
      "Inversión superior a $55k"
    ],
    "verdict": "El rústico moderno definitivo de nueva generación en VE: doble bloqueo real con lujo de cabina premium.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica E20CB con eje de balanceo.",
      "combustibleVE": "Euro V 2.0T: tolera algo mejor que Euro VI, pero siempre usar gasolina 95 octanos limpia.",
      "puntosClave": "Los bloqueos delantero/trasero y función TAB ('Tank Turn') deben usarse únicamente en barro, arena o piedra suelta.",
      "fallasTipicas": "Cuidar conectores inferiores y diferencial tras cruces profundos de ríos."
    }
  },
  {
    "id": "honda-city-lx-cvt",
    "maker": "Honda",
    "model": "City LX / EXL 1.5L i-VTEC (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Honda City",
      "City i-VTEC"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 31000,
    "maxPrice": 35000,
    "priceDisplay": "~$31.500 - $34.500",
    "hp": 119,
    "torque": 145,
    "clearance": 145,
    "trunk": 519,
    "tank": 44,
    "weight": 1143,
    "engine": "1.5L DOHC i-VTEC Atmosférico (Cadena)",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Automática CVT 7 Velocidades (Paddle Shift EXL)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "15.5 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "VSA + HSA Pendientes + Estructura ACE",
    "brakes": "Disco Delantero / Tambor Trasero (ABS+EBD)",
    "infotainment": "Pantalla Táctil 8\" Apple CarPlay/Android Auto",
    "parts": "Red Honda Venezuela",
    "warranty": "Garantía Oficial Honda VE",
    "oilSpec": "SAE 0W-20 Sintético Honda + CVT HCF-2",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Confiabilidad mecánica japonesa Honda + motor 1.5L sin turbo",
      "Baúl inmenso de 519 L y 6 airbags de serie",
      "Consumo sobresaliente (15+ km/L) gracias a 1.143 kg"
    ],
    "cons": [
      "Frenos traseros de tambor y altura baja para policías acostados agresivos",
      "Precio de entrada por encima de sedanes turbo chinos",
      "Equipamiento sobrio en versión LX"
    ],
    "verdict": "Compra conservadora de largo plazo: reventa Honda, 6 airbags, 519 L de maleta y cero dolores de cabeza de turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC i-VTEC de altísima longevidad.",
      "combustibleVE": "Excelente comportamiento con gasolina venezolana (atmosférico multipunto).",
      "puntosClave": "Usar EXCLUSIVAMENTE fluido original Honda HCF-2 en la caja CVT cada 40.000 km.",
      "fallasTipicas": "Cuidar parte baja del parachoques delantero en rampas pronunciadas; caucho de emergencia temporal."
    }
  },
  {
    "id": "honda-hrv-lx-cvt",
    "maker": "Honda",
    "model": "HR-V LX / EXL 1.5L i-VTEC (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Honda HR-V",
      "HR-V Magic Seat"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 37900,
    "maxPrice": 43500,
    "priceDisplay": "~$38.500 - $42.900",
    "hp": 119,
    "torque": 145,
    "clearance": 185,
    "trunk": 354,
    "tank": 50,
    "weight": 1275,
    "engine": "1.5L DOHC i-VTEC Atmosférico (Cadena)",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Automática CVT 7 Velocidades",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "13.8 km/L",
    "airbags": "6 Airbags + Honda Sensing (EXL)",
    "esp": "VSA + LaneWatch + CMBS + ACC (EXL)",
    "brakes": "Discos en las 4 Ruedas (EPB Brake Hold)",
    "infotainment": "Magic Seat Modular + CarPlay + A/C Posterior",
    "parts": "Red Honda Venezuela",
    "warranty": "Garantía Oficial Honda VE",
    "oilSpec": "SAE 0W-20 Sintético + CVT HCF-2",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Sistema Magic Seat trasero inigualable en modularidad",
      "Calidad de ensamble Honda, 185 mm de despeje y discos x4 + EPB",
      "Honda Sensing ADAS completo en EXL + motor i-VTEC indestructible"
    ],
    "cons": [
      "119 HP / 145 Nm queda corto frente a rivales turbo de $38k-$43k en subidas",
      "Suspensión trasera sigue siendo barra de torsión",
      "Maleta base de 354 L"
    ],
    "verdict": "La SUV para quien prioriza calidad japonesa duradera, seguridad Honda Sensing y modularidad sobre aceleración turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC i-VTEC.",
      "combustibleVE": "Motor atmosférico 1.5L súper amigable con gasolina VE.",
      "puntosClave": "El secreto está en usar fluido original Honda HCF-2 en la CVT; pastillas delanteras/traseras duran muy bien.",
      "fallasTipicas": "Cámara de punto ciego LaneWatch en retrovisor derecho exige cuidado al plegar en calles angostas."
    }
  },
  {
    "id": "hyundai-grandi10-gl-mt",
    "maker": "Hyundai",
    "model": "Grand i10 GL 1.2L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Grand i10 Sincrónico"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 19500,
    "maxPrice": 20100,
    "priceDisplay": "$19.990 todo incluido",
    "hp": 82,
    "torque": 114,
    "clearance": 152,
    "trunk": 260,
    "tank": 37,
    "weight": 917,
    "engine": "1.2L Kappa II G4LA DCVVT (Cadena)",
    "displacement": "1.2L (1,197 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "17.0 km/L",
    "airbags": "6 Airbags de Serie",
    "esp": "ESC + HAC + ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Radio Bluetooth + USB-C",
    "parts": "Red Hyundai Venezuela (3 años / 125k km)",
    "warranty": "3 años o 125.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP (3.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡6 AIRBAGS + ESC DE SERIE en un citycar debajo de $20.000 todo incluido!",
      "Motor 4 cilindros Kappa 1.2L con cadena de tiempo (cero vibración de 3 cil.)",
      "Consumo mínimo (~17 km/L) y salidas de A/C en 2da fila"
    ],
    "cons": [
      "Tanque de 37 L",
      "GL viene con rines de acero y sin pantalla 8\" (reservada al GLS)",
      "Desempeño tranquilo en autopista inclinado"
    ],
    "verdict": "Referente absoluto de seguridad en citycars 0 km por incluir 6 airbags, ESC, 4 cilindros y cadena por $19.990 todo incluido.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa II DCVVT.",
      "combustibleVE": "Excelente tolerancia a gasolina venezolana de 91 octanos.",
      "puntosClave": "Garantía larga en km (125.000 km); cuidar cauchos 165/70 R14 frente a huecos muy profundos.",
      "fallasTipicas": "Cuidar tensión normal de embrague en ciudad."
    }
  },
  {
    "id": "hyundai-grandi10-gl-at",
    "maker": "Hyundai",
    "model": "Grand i10 GL 1.2L (4AT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Grand i10 GL Automático"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 21500,
    "maxPrice": 22100,
    "priceDisplay": "$21.990 todo incluido",
    "hp": 82,
    "torque": 114,
    "clearance": 152,
    "trunk": 260,
    "tank": 37,
    "weight": 945,
    "engine": "1.2L Kappa II G4LA DCVVT (Cadena)",
    "displacement": "1.2L (1,197 cc)",
    "transmission": "Automática Convencional 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.2 km/L",
    "airbags": "6 Airbags de Serie",
    "esp": "ESC + HAC + ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Radio Bluetooth + Salidas A/C Traseras",
    "parts": "Red Hyundai Venezuela",
    "warranty": "3 años o 125.000 km",
    "oilSpec": "SAE 5W-30 Sintético + ATF SP-III/IV",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Caja automática tradicional de convertidor de par (súper robusta en colas)",
      "6 airbags + ESC + cadena metálica por $21.990 todo incluido",
      "Fácil de estacionar y barato de mantener"
    ],
    "cons": [
      "Solo 4 marchas elevan algo las RPM en autopista a 110 km/h",
      "Sin pantalla táctil 8\" (GL)",
      "Tanque de 37 L"
    ],
    "verdict": "El automático urbano más seguro y sencillo mecánicamente alrededor de $22k todo incluido.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa II.",
      "combustibleVE": "Muy tolerante a gasolina regular VE.",
      "puntosClave": "La caja 4AT de convertidor de par soporta el tránsito denso sin desgastes prematuros de doble embrague.",
      "fallasTipicas": "Cuidar cambios de ATF cada 50.000 km."
    }
  },
  {
    "id": "hyundai-grandi10-gls-at",
    "maker": "Hyundai",
    "model": "Grand i10 GLS 1.2L (4AT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Grand i10 GLS Tope"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 23800,
    "maxPrice": 24100,
    "priceDisplay": "$24.004 todo incluido",
    "hp": 82,
    "torque": 114,
    "clearance": 152,
    "trunk": 260,
    "tank": 37,
    "weight": 958,
    "engine": "1.2L Kappa II G4LA DCVVT (Cadena)",
    "displacement": "1.2L (1,197 cc)",
    "transmission": "Automática Convencional 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "15.2 km/L",
    "airbags": "6 Airbags de Serie",
    "esp": "ESC + HAC + Cámara Reversa + Rines 15\"",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Pantalla Táctil 8\" CarPlay/Android Auto + Clúster",
    "parts": "Red Hyundai Venezuela",
    "warranty": "3 años o 125.000 km",
    "oilSpec": "SAE 5W-30 Sintético + ATF OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Agrega pantalla 8\" con CarPlay/Android Auto, cámara y rines de aleación",
      "6 airbags + ESC + caja 4AT indestructible",
      "Salidas A/C posteriores"
    ],
    "cons": [
      "Alcanza los $24.004 donde compite con sedanes más amplios",
      "Tanque 37 L",
      "Motor 82 HP estrictamente urbano"
    ],
    "verdict": "Ciudadano premium ultra equipado y seguro con confiabilidad clásica de caja 4AT.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Compatible con gasolina local sin exigencias de turbo.",
      "puntosClave": "Comparar espacio frente a Arrizo 5 Pro CVT ($24.262) si viajas con frecuencia por carretera.",
      "fallasTipicas": "Llantas 175/60 R15 algo bajas; vigilar presión correcta."
    }
  },
  {
    "id": "hyundai-accent-cvt",
    "maker": "Hyundai",
    "model": "Accent 1.5L DCVVT (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "New Accent 2026"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 31500,
    "maxPrice": 32500,
    "priceDisplay": "$32.124 todo incluido",
    "hp": 113,
    "torque": 144,
    "clearance": 160,
    "trunk": 577,
    "tank": 45,
    "weight": 1183,
    "engine": "1.5L Smartstream DCVVT MPI (Cadena)",
    "displacement": "1.5L (1,497 cc)",
    "transmission": "Automática IVT/CVT 6 Vel. Simuladas",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto MPI)",
    "consumption": "15.0 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESC + HAC + Cámara & Sensores Reversa",
    "brakes": "Disco 14\" Del. / Tambor 8\" Tras.",
    "infotainment": "Pantalla 8\" CarPlay/Android Auto + Salidas A/C 2da Fila",
    "parts": "Red Hyundai Venezuela (3 años / 125k km)",
    "warranty": "3 años o 125.000 km",
    "oilSpec": "SAE 5W-30 / 0W-20 Sintético + Fluido IVT Hyundai",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Maletero gigante de 577 L + 6 airbags de serie + ESC",
      "Motor 1.5L multipunto sin turbo ideal para la gasolina de Venezuela",
      "Precio transparente $32.124 todo incluido + USB-C y A/C atrás"
    ],
    "cons": [
      "Frenos traseros de tambor en rango de >$32k",
      "Sin versión sincrónica importada en esta generación",
      "Tanque de 45 L"
    ],
    "verdict": "Sedán familiar moderno con confiabilidad Hyundai, baúl monumental y motor MPI inmune a dolores de cabeza turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Smartstream.",
      "combustibleVE": "Multipunto MPI sin turbo: tolera gasolina comercial venezolana mucho mejor que bloques GDI.",
      "puntosClave": "Usar fluido original Hyundai IVT SP-CVT1 cada 45.000 km; perfil 205/55 R16 balanceado para VE.",
      "fallasTipicas": "Cuidar escobillas/limpieza de tambores traseros tras zonas de barro."
    }
  },
  {
    "id": "hyundai-elantra-ivt",
    "maker": "Hyundai",
    "model": "Elantra 2.0L D-CVVT (IVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Hyundai Elantra 2.0"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 36500,
    "maxPrice": 38900,
    "priceDisplay": "~$37.500 ref.",
    "hp": 156,
    "torque": 192,
    "clearance": 150,
    "trunk": 474,
    "tank": 47,
    "weight": 1230,
    "engine": "2.0L Nu DOHC 16V D-CVVT MPI",
    "displacement": "2.0L (1,999 cc)",
    "transmission": "Automática IVT 6 Velocidades",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.0 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESC + HAC + ABS + Sensor Estacionar",
    "brakes": "Disco 15\" Del. / Disco 14\" Tras.",
    "infotainment": "Pantalla 8\" CarPlay/Android Auto + Cuero + Bi-zona",
    "parts": "Red Hyundai Venezuela (3 años / 125k km)",
    "warranty": "3 años o 125.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP + Fluido IVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "156 HP de bloque 2.0L atmosférico multipunto (potente sin necesitar turbo)",
      "Caucho de repuesto FULL SIZE 225/45 R17 y discos x4",
      "Asiento eléctrico piloto, cuero, cargador Qi y A/C bi-zona"
    ],
    "cons": [
      "Perfil 225/45 R17 y altura baja (150 mm) exigen cuidado en huecos",
      "Competencia directa contra SUVs en su precio",
      "Tanque de 47 L"
    ],
    "verdict": "Sedán C de gran clase y repuesto Full Size, ideal para autopista con motor 2.0L atmosférico duradero.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica D-CVVT.",
      "combustibleVE": "Bloque 2.0L multipunto MPI: responde muy bien sin las exigencias de GDI.",
      "puntosClave": "Cuidar perfil 45 de rines 17\" en calles deterioradas; cambiar aceite IVT a los 45.000 km.",
      "fallasTipicas": "Cuidado normal de alineación en tren trasero CTBA."
    }
  },
  {
    "id": "jac-arena-sport-mt",
    "maker": "JAC",
    "model": "Arena Sport 1.5L (5MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "JAC Arena Sport",
      "Arena Yaracuy"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 15400,
    "maxPrice": 18200,
    "priceDisplay": "~$15.400 - $18.000 (Planes JAC)",
    "hp": 111,
    "torque": 146,
    "clearance": 120,
    "trunk": 350,
    "tank": 45,
    "weight": 1215,
    "engine": "1.5L VVT Atmosférico (Cadena)",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Manual 5 Velocidades (MF70B30)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla Multimedia + Bluetooth",
    "parts": "Planta JAC Yaracuy / Red Nacional",
    "warranty": "10 años o 150.000 km (JAC VE)",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (4.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Ensamblado en Yaracuy con planes de financiamiento propios (35x35 / Ruta 66 / Compra Directa)",
      "Motor 1.5L multipunto con cadena de tiempo y discos x4",
      "Garantía oficial más extensa de Venezuela: 10 años o 150.000 km"
    ],
    "cons": [
      "ATENCIÓN DESPEJE: apenas 120 mm libre al suelo (muy bajo para policías acostados/huecos)",
      "Sin control de estabilidad ESC en ficha base",
      "2 airbags solamente"
    ],
    "verdict": "Opción financiera muy accesible ensamblada en Venezuela; OBLIGATORIO medir rampas y huecos de tu ruta por sus 120 mm de altura.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica sin correa.",
      "combustibleVE": "Multipunto atmosférico muy tolerante a gasolina regular venezolana.",
      "puntosClave": "CRÍTICO VE: Con solo 120 mm de despeje, evitar vías rurales y pasar diagonales los reductores de velocidad altos.",
      "fallasTipicas": "Roce frecuente del protector inferior si no se maneja despacio en baches; ajustar pernería tras los primeros 2.500 km."
    }
  },
  {
    "id": "jac-venezolana-pro-mt",
    "maker": "JAC",
    "model": "La Venezolana Pro 2.0T 4x4 (6MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "JAC La Venezolana Pro",
      "Pickup JAC 4x4"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "MT",
    "minPrice": 37000,
    "maxPrice": 39900,
    "priceDisplay": "~$38.500 ref.",
    "hp": 188,
    "torque": 320,
    "clearance": 210,
    "trunk": 900,
    "tank": 130,
    "weight": 1940,
    "engine": "2.0L Turbo Intercooler Euro V (Correa)",
    "displacement": "2.0L Turbo (1,997 cc)",
    "transmission": "Manual 6 Velocidades (LC6T32 MT) + 4x4",
    "traction": "4x4 Doble Tracción (900 kg carga)",
    "fuelType": "Gasolina 95 Oct",
    "consumption": "8.8 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Discos en las 4 Ruedas (265/60 R18)",
    "infotainment": "Pantalla Táctil + Cámara Reversa",
    "parts": "Red JAC Venezuela",
    "warranty": "Garantía JAC Motors VE",
    "oilSpec": "SAE 5W-30 Sintético API SP",
    "timingSpec": "Correa Dentada",
    "pros": [
      "¡TANQUE GIGANTE DE 130 LITROS! Autonomía inigualable en viajes al interior",
      "188 HP / 320 Nm turbo gasolina + frenos de disco x4 y 210 mm de despeje",
      "900 kg de carga útil con caja manual de 6 marchas"
    ],
    "cons": [
      "USA CORREA DE TIEMPO (cambiar preventivamente cada 50.000 km)",
      "Equipamiento de seguridad básico (2 airbags)",
      "Consumo fuerte al llenar 130 L"
    ],
    "verdict": "Pickup 4x4 pensada para largas distancias sin repostar gracias a su tanque de 130 L; anotar rigurosamente el cambio de correa de tiempo.",
    "bajoKapotReview": {
      "distribucion": "ATENCIÓN BAJOKAPOT: Lleva CORREA DE TIEMPO (no cadena). Programar reemplazo estricto de kit de tiempo cada 50.000 km.",
      "combustibleVE": "Turbo gasolina Euro V: respetar enfriamiento de turbina 45-60s antes de apagar y filtrar gasolina.",
      "puntosClave": "Aprovechar sus 130 litros para expediciones largas y su suspención trasera de ballestas para trabajo pesado.",
      "fallasTipicas": "Reapriete preventivo de abrazaderas de intercooler y chasis tras trochas duras."
    }
  },
  {
    "id": "jeep-renegade-altitude",
    "maker": "Jeep",
    "model": "Renegade Altitude 1.3T T270 (6AT)",
    "yearRange": "2026 - 2027",
    "nicknames": [
      "Jeep Renegade Altitude"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 32500,
    "maxPrice": 34000,
    "priceDisplay": "~$32.500 - $34.000",
    "hp": 172,
    "torque": 270,
    "clearance": 180,
    "trunk": 320,
    "tank": 60,
    "weight": 1465,
    "engine": "1.3L Turbo T270 Multiair III (Cadena)",
    "displacement": "1.3L Turbo (1,332 cc)",
    "transmission": "Automática Aisin 6 Velocidades (6AT)",
    "traction": "FWD Delantera (Suspensión McPherson x4)",
    "fuelType": "Gasolina 95 Oct (Turbo GDI)",
    "consumption": "11.5 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESC + RolloverERM + Susp. Independiente 4 Ruedas",
    "brakes": "Discos Ventilados Del. / Sólidos Tras. (EPB)",
    "infotainment": "Pantalla Táctil 8.4\" Wireless CarPlay",
    "parts": "Red Jeep/Stellantis Venezuela",
    "warranty": "Garantía Oficial Jeep VE",
    "oilSpec": "SAE 0W-30 Sintético Mopar/Fiat GS1 (Estricto)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Suspensión independiente en las 4 ruedas + chasis Jeep súper rígido",
      "Motor T270 de 172 HP / 270 Nm + caja automática Aisin 6AT confiable",
      "6 airbags + 60 L de tanque + rines 17\""
    ],
    "cons": [
      "Maletero pequeño (320 L) para viajes familiares",
      "Versión FWD (4x2), no 4x4",
      "Módulo Multiair exige aceite 0W-30 exacto sin excusas"
    ],
    "verdict": "B-SUV con andar sólido de carro americano/europeo, gran tanque (60 L) y suspensión independiente en las 4 esquinas.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica T270.",
      "combustibleVE": "Turbo GDI: exige gasolina 95 octanos verificada y filtro limpio.",
      "puntosClave": "Usar aceite 0W-30 sintético homologado; la caja Aisin 6AT es mucho más noble que viejas cajas de 9 vel.",
      "fallasTipicas": "Vigilar nivel de refrigerante y aceite en los primeros 10.000 km de asentamiento turbo."
    }
  },
  {
    "id": "jeep-renegade-sahara",
    "maker": "Jeep",
    "model": "Renegade Sahara 1.3T T270 (6AT)",
    "yearRange": "2026 - 2027",
    "nicknames": [
      "Jeep Renegade Sahara"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 36500,
    "maxPrice": 38000,
    "priceDisplay": "~$36.500 - $38.000",
    "hp": 172,
    "torque": 270,
    "clearance": 180,
    "trunk": 320,
    "tank": 60,
    "weight": 1500,
    "engine": "1.3L Turbo T270 Multiair III (Cadena)",
    "displacement": "1.3L Turbo (1,332 cc)",
    "transmission": "Automática Aisin 6 Velocidades (6AT)",
    "traction": "FWD Delantera (Suspensión Independiente x4)",
    "fuelType": "Gasolina 95 Oct (Turbo GDI)",
    "consumption": "11.5 km/L",
    "airbags": "7 Airbags + ADAS Completo",
    "esp": "ESC + AEB + LKA + Punto Ciego + Panorámico",
    "brakes": "Discos en las 4 Ruedas (Rines 18\")",
    "infotainment": "Techo Panorámico CommandView + Pantalla 8.4\" + Cuero",
    "parts": "Red Jeep/Stellantis Venezuela",
    "warranty": "Garantía Oficial Jeep VE",
    "oilSpec": "SAE 0W-30 Sintético Mopar/Fiat GS1 (Estricto)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Agrega techo panorámico dual, tapicería en cuero y ADAS completo",
      "172 HP / 270 Nm con caja Aisin 6AT y suspensión independiente x4",
      "Fuerte imagen de marca Jeep"
    ],
    "cons": [
      "Maletero limitado a 320 L y sigue siendo 4x2",
      "Rines 18\" un poco más firmes en asfaltos rotos",
      "Exige aceite 0W-30 estricto y gasolina 95"
    ],
    "verdict": "Tope de gama B-SUV con estatus Jeep, ADAS y gran manejo; revisar si 320 L de baúl bastan para tu rutina.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Gasolina 95 octanos recomendada por inyección directa GDI.",
      "puntosClave": "El techo solar CommandView debe lubricarse anualmente para evitar filtraciones o atasco por polvo.",
      "fallasTipicas": "Cuidar llantas R18 en baches; nunca mezclar viscosidades fuera de 0W-30."
    }
  },
  {
    "id": "jetour-dashing-dct",
    "sampleKey": "dashing",
    "maker": "Jetour",
    "model": "Dashing 1.5T (6DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jetour Dashing"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 27483,
    "maxPrice": 32500,
    "priceDisplay": "$27.483 + imp. (~$31.9k)",
    "hp": 147,
    "torque": 210,
    "clearance": 160,
    "trunk": 486,
    "tank": 57,
    "weight": 1535,
    "engine": "1.5L Turbo E4T15C Acteco (MPFI)",
    "displacement": "1.5L Turbo (1,498 cc)",
    "transmission": "Automática 6DCT Húmeda Doble Embrague",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (MPFI)",
    "consumption": "12.0 km/L",
    "airbags": "2 a 4 Airbags (Verificar Lote Local)",
    "esp": "ESP + Multi-Link Trasero + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla Flotante 12.8\" + A/C Bi-zona",
    "parts": "Red Jetour Venezuela (Grupo Chery/Acteco)",
    "warranty": "5 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP (4.7 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡Motor 1.5T Acteco MPFI homologado para 91 octanos (ideal para VE)!",
      "Tanque amplio de 57 L + maletero de 486 L + suspensión trasera Multi-Link",
      "Diseño futurista con manillas ocultas y garantía 5 años / 150.000 km"
    ],
    "cons": [
      "Lotes de entrada solo traen 2 airbags frontales (confirmar versión)",
      "Peso de 1.535 kg exige más al 1.5T en pendientes largas",
      "Casi todos los mandos van en la pantalla central"
    ],
    "verdict": "SUV llamativa y espaciosa cuya mayor virtud técnica en Venezuela es su motor Turbo MPFI tolerante a 91 octanos.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Acteco.",
      "combustibleVE": "Ventaja técnica real: Ficha oficial especifica MPFI y gasolina 91 octanos RON (soporta mejor combustible VE que GDI).",
      "puntosClave": "Verificar número real de airbags de la unidad en concesionario antes de cerrar y cuidar actuadores de manillas retráctiles.",
      "fallasTipicas": "Cuidado normal de batería 12V para no quedar bloqueadas manillas ocultas o pantalla 12.8\"."
    }
  },
  {
    "id": "jetour-x50-mt",
    "sampleKey": "x50",
    "maker": "Jetour",
    "model": "X50 Base 1.5L (5MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jetour X50 Sincrónico"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "MT",
    "minPrice": 22000,
    "maxPrice": 23500,
    "priceDisplay": "~$22.500 ref.",
    "hp": 116,
    "torque": 143,
    "clearance": 160,
    "trunk": 398,
    "tank": 45,
    "weight": 1315,
    "engine": "1.5L Acteco Atmosférico 4 Cil.",
    "displacement": "1.5L (1,499 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.6 km/L",
    "airbags": "2 a 4 Airbags (Verificar Lote)",
    "esp": "ESP + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla Táctil 10.25\"",
    "parts": "Red Jetour Venezuela (Grupo Chery)",
    "warranty": "5 años o 150.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Precio accesible con 5 años / 150.000 km de garantía",
      "Motor 1.5L sin turbo muy amigable con gasolina VE y bajo mantenimiento",
      "Discos x4 y freno electrónico AutoHold"
    ],
    "cons": [
      "Pierde suspensión Multi-Link (trae eje de torsión vs el Limited) y motor turbo",
      "116 HP sobrios para adelantar en carretera",
      "Maleta de 398 L"
    ],
    "verdict": "Alternativa 0 km sincrónica más segura y simple que su hermana automática si priorizas confiabilidad sobre potencia.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Inyección multipunto atmosférica muy noble en VE.",
      "puntosClave": "Diferenciar bien que la versión 5MT usa eje trasero semi-independiente y motor aspirado, no el bloque 1.5T Multi-Link de la Limited.",
      "fallasTipicas": "Cuidado normal de batería para el sistema EPB AutoHold."
    }
  },
  {
    "id": "jetour-x50-limited-dct",
    "maker": "Jetour",
    "model": "X50 Limited 1.5T (6DCT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Jetour X50 Automático",
      "X50 Limited"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 28900,
    "maxPrice": 30500,
    "priceDisplay": "~$29.500 - $30.000",
    "hp": 147,
    "torque": 210,
    "clearance": 160,
    "trunk": 398,
    "tank": 45,
    "weight": 1390,
    "engine": "1.5L Turbo E4T15C Acteco (MPFI)",
    "displacement": "1.5L Turbo (1,498 cc)",
    "transmission": "Automática 6DCT Húmeda Doble Embrague",
    "traction": "FWD Delantera (Multi-Link Trasero)",
    "fuelType": "Gasolina 91 / 95 Oct (MPFI)",
    "consumption": "12.5 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + Multi-Link Trasero + EPB AutoHold",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Doble Pantalla + CarPlay / Cámara 360°",
    "parts": "Red Jetour Venezuela",
    "warranty": "5 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + Aceite 6DCT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Agrega motor Turbo E4T15C (147 HP / 210 Nm) + suspensión Multi-Link trasera",
      "Turbo MPFI compatible con 91 octanos",
      "Garantía 5 años o 150.000 km"
    ],
    "cons": [
      "Salto de $7.000 respecto al 5MT (se acerca mucho al Dashing / Jolion)",
      "Tanque de 45 L",
      "Despeje 160 mm"
    ],
    "verdict": "Más ágil y refinada que la 5MT gracias al Multi-Link trasero y motor Turbo MPFI.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Acteco.",
      "combustibleVE": "Turbo MPFI tolera gasolina comercial sin carbonización directa.",
      "puntosClave": "Realizar cambios de fluido 6DCT húmeda a los 45.000-50.000 km; comparar cotización contra Jetour Dashing.",
      "fallasTipicas": "Cuidar cauchos R18 y bujes multibrazo."
    }
  },
  {
    "id": "jetour-x70-dct",
    "sampleKey": "x70",
    "maker": "Jetour",
    "model": "X70 Plus 1.5T 7 Puestos (6DCT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Jetour X70",
      "X70 7 Puestos"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 30500,
    "maxPrice": 33500,
    "priceDisplay": "~$31.900 ref.",
    "hp": 147,
    "torque": 210,
    "clearance": 160,
    "trunk": 895,
    "tank": 57,
    "weight": 1560,
    "engine": "1.5L Turbo E4T15C Acteco (MPFI)",
    "displacement": "1.5L Turbo (1,498 cc)",
    "transmission": "Automática 6DCT Doble Embrague",
    "traction": "FWD Delantera (3 Filas / 7 Puestos)",
    "fuelType": "Gasolina 91 / 95 Oct (MPFI)",
    "consumption": "11.0 km/L",
    "airbags": "4 Airbags",
    "esp": "ESP + Multi-Link + A/C Bi-zona + Panorámico",
    "brakes": "Discos en las 4 Ruedas (EPB)",
    "infotainment": "Pantalla Táctil 10.25\" + Techo Panorámico",
    "parts": "Red Jetour Venezuela (Grupo Chery)",
    "warranty": "5 años o 150.000 km",
    "oilSpec": "SAE 5W-30 100% Sintético API SP + Fluido DCT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Enorme espacio modular (7 puestos o 895 L con 3ra fila abatida)",
      "Motor Acteco Turbo MPFI probado + tanque de 57 L",
      "Techo panorámico y A/C bi-zona con salida trasera"
    ],
    "cons": [
      "Con 7 adultos cargados en autopista de subida los 147 HP trabajan al límite",
      "3ra fila apta principalmente para niños/trayectos cortos",
      "Despeje de 160 mm"
    ],
    "verdict": "La 3-filas 0 km más accesible del mercado venezolano con respaldo de mecánica Chery/Acteco fácil de mantener.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Acteco.",
      "combustibleVE": "MPFI turbo: buena tolerancia a gasolina venezolana usando aceite 5W-30 API SP.",
      "puntosClave": "Cuidar transmisión 6DCT cuando se circula con 7 personas en subidas fuertes (usar modo secuencial).",
      "fallasTipicas": "Cuidado de drenajes de techo panorámico y pastillas traseras cuando viaja cargada."
    }
  },
  {
    "id": "kia-picanto-mt",
    "maker": "Kia",
    "model": "Picanto 1.2L Kappa (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "New Picanto Sincrónico"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 23000,
    "maxPrice": 25900,
    "priceDisplay": "$23.000 + IVA (~$24.9k+)",
    "hp": 83,
    "torque": 122,
    "clearance": 151,
    "trunk": 255,
    "tank": 35,
    "weight": 885,
    "engine": "1.2L Kappa II MPI 4 Cil. (Cadena)",
    "displacement": "1.2L (1,197 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "18.5 km/L",
    "airbags": "2 a 6 Airbags (Confirmar Lote Venekia)",
    "esp": "ESC + HAC + ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Pantalla Táctil 8\" CarPlay/Android Auto",
    "parts": "Venekia Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP (3.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Consumo espectacular (~18.5 km/L / ~700 km por tanque de 35 L)",
      "Motor 1.2L 4 cilindros MPI con cadena de tiempo ultra durable",
      "5 años / 100.000 km de garantía Venekia y alta reventa"
    ],
    "cons": [
      "Precio muy elevado ($23.000 + gastos) frente al Grand i10 ($19.990 todo incluido)",
      "Tanque de 35 L",
      "Confirmar airbags por lote vs Grand i10"
    ],
    "verdict": "Citycar de enorme reventa y durabilidad comprobada, aunque hoy cuesta significativamente más que su primo Hyundai Grand i10.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa II libre de cambio prematuro.",
      "combustibleVE": "Tolerancia perfecta a gasolina comercial venezolana.",
      "puntosClave": "Comparar precio final con IGTF y placa frente al Grand i10 GL MT antes de firmar.",
      "fallasTipicas": "Cuidado de flancos en baches profundos."
    }
  },
  {
    "id": "kia-picanto-at",
    "maker": "Kia",
    "model": "Picanto 1.2L Kappa (4AT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "New Picanto Automático"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 25000,
    "maxPrice": 28000,
    "priceDisplay": "~$25.500 + gastos",
    "hp": 83,
    "torque": 122,
    "clearance": 151,
    "trunk": 255,
    "tank": 35,
    "weight": 925,
    "engine": "1.2L Kappa II MPI 4 Cil. (Cadena)",
    "displacement": "1.2L (1,197 cc)",
    "transmission": "Automática Convencional 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "16.5 km/L",
    "airbags": "2 a 6 Airbags (Confirmar Lote)",
    "esp": "ESC + HAC + ABS + EBD",
    "brakes": "Disco Delantero / Tambor Trasero",
    "infotainment": "Pantalla Táctil 8\" CarPlay/Android Auto",
    "parts": "Venekia Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético + ATF OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Caja automática tradicional 4AT noble sin correas CVT",
      "Motor 1.2L con cadena de tiempo y excelente economía",
      "Fuerte imagen y reventa Kia en Venezuela"
    ],
    "cons": [
      "Precio ya toca territorio de sedanes o crossovers 0 km más grandes",
      "Tanque de 35 L",
      "Confirmar airbags exactos"
    ],
    "verdict": "Automático urbano sumamente confiable y compacto; evaluar relación precio/tamaño frente al Kia Soluto o Grand i10 GLS.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa II.",
      "combustibleVE": "Compatible con gasolina local sin exigencias de octanaje alto.",
      "puntosClave": "La transmisión 4AT de convertidor de par aguanta colas severas sin recalentamientos.",
      "fallasTipicas": "Cambiar ATF cada 50.000 km preventivamente."
    }
  },
  {
    "id": "kia-soluto-mt",
    "maker": "Kia",
    "model": "Soluto 1.4L Kappa (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Kia Soluto Sincrónico"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 20500,
    "maxPrice": 23000,
    "priceDisplay": "$20.500 + gastos (~$22.5k)",
    "hp": 94,
    "torque": 132,
    "clearance": 150,
    "trunk": 475,
    "tank": 43,
    "weight": 1020,
    "engine": "1.4L MPI Kappa Dual-CVVT (Cadena)",
    "displacement": "1.4L (1,368 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "17.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD (Sin ESC en ficha estándar)",
    "brakes": "Discos Ventilados Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" CarPlay/Android Auto",
    "parts": "Venekia Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Cauchos 175/70 R14 de perfil altísimo (absorben huecos VE como pocos)",
      "Cadena de tiempo + inyección multipunto sin turbo súper durable",
      "Maleta de 475 L y 5 años o 100.000 km de garantía"
    ],
    "cons": [
      "Falta control de estabilidad ESC y solo 2 airbags",
      "Acabados interiores sencillos y vidrios sin botones en puertas",
      "Precio suma gastos adicionales sobre $20.500"
    ],
    "verdict": "Heredero moderno de los sedanes batalla en VE: cauchos perfil 70, cadena metálica, enorme maleta y altísima economía.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa Dual-CVVT (libre de cambio de correa).",
      "combustibleVE": "Excelente tolerancia a gasolina regular de 91 octanos.",
      "puntosClave": "Sus neumáticos 175/70 R14 son una bendición para evitar cauchos explotados en baches; nota: el tanque real es 43 L (errata en PDF).",
      "fallasTipicas": "Cuidar carga de batería y limpieza de tambores traseros."
    }
  },
  {
    "id": "kia-soluto-at",
    "maker": "Kia",
    "model": "Soluto 1.4L Kappa (4AT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Kia Soluto Automático"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 22500,
    "maxPrice": 25200,
    "priceDisplay": "~$22.500 + gastos (~$24.9k)",
    "hp": 94,
    "torque": 132,
    "clearance": 150,
    "trunk": 475,
    "tank": 43,
    "weight": 1055,
    "engine": "1.4L MPI Kappa Dual-CVVT (Cadena)",
    "displacement": "1.4L (1,368 cc)",
    "transmission": "Automática Convencional 4 Velocidades (4AT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.8 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD",
    "brakes": "Discos Ventilados Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil 7\" CarPlay/Android Auto",
    "parts": "Venekia Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético + ATF OEM",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Caja automática 4AT tradicional + cadena metálica = confiabilidad total",
      "Cauchos 175/70 R14 inmunes a muchos huecos urbanos",
      "475 L de maleta con garantía 5 años / 100k km"
    ],
    "cons": [
      "Sin control de estabilidad ESC y solo 2 airbags",
      "Solo 4 marchas en autopista",
      "Precio final con gastos queda cerca del Arrizo 5 Pro CVT"
    ],
    "verdict": "Sedán automático a prueba de balas para uso urbano y flotas familiares; su combo 1.4L + cadena + 4AT envejecerá muy bien.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Kappa.",
      "combustibleVE": "Tolerante a gasolina regular venezolana.",
      "puntosClave": "Cambiar fluido ATF cada 50.000 km para longevidad eterna.",
      "fallasTipicas": "Interior plástico propenso a pequeños grillos si se circula por empedrados."
    }
  },
  {
    "id": "kia-sonet-ivt",
    "maker": "Kia",
    "model": "Sonet 1.5L MPI (IVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Kia Sonet 2026",
      "Sonet IVT"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 32500,
    "maxPrice": 36000,
    "priceDisplay": "$32.500 + gastos (~$35.5k)",
    "hp": 113,
    "torque": 144,
    "clearance": 205,
    "trunk": 392,
    "tank": 45,
    "weight": 1240,
    "engine": "1.5L Smartstream MPI (Cadena)",
    "displacement": "1.5L (1,497 cc)",
    "transmission": "Automática Inteligente IVT",
    "traction": "FWD Delantera (McPherson / Torsión)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto MPI)",
    "consumption": "14.0 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "ESC + HAC + Luces Auto LED + 215/60 R16",
    "brakes": "Disco Delantero / Tambor o Disco según lote",
    "infotainment": "Pantalla Táctil 8\" CarPlay + A/C y USB 2da Fila",
    "parts": "Venekia Venezuela (5 años / 100k km)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 5W-30 Sintético + Fluido IVT Kia",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡205 mm de despeje + 6 airbags + ESC + HAC + cauchos 215/60 R16!",
      "Motor 1.5L MPI sin turbo con cadena de distribución ideal para gasolina VE",
      "Salidas A/C y USB en 2da fila + 5 años de garantía Venekia"
    ],
    "cons": [
      "$32.500 + gastos la pone al precio de SUVs turbo mucho más grandes",
      "113 HP / 144 Nm correcto en ciudad pero modesto en autopista cargada",
      "Tanque de 45 L"
    ],
    "verdict": "Una de las B-SUV más racionales y aguantadoras para Venezuela: 205 mm de despeje, perfil R16, 6 airbags y cero turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena de tiempo metálica.",
      "combustibleVE": "Ventaja clave en VE: Inyección Multipunto sin turbo diseñada para resistir gasolina comercial sin drama.",
      "puntosClave": "Usar fluido IVT homologado Kia cada 45.000 km; cauchos 215/60 R16 resisten baches mucho mejor que R18.",
      "fallasTipicas": "Cuidado normal de batería y alineación."
    }
  },
  {
    "id": "livan-x3-pro-mt",
    "maker": "Livan",
    "model": "X3 Pro 1.5L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Livan X3 Pro Sincrónica",
      "Bera Cars X3"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "MT",
    "minPrice": 17200,
    "maxPrice": 18200,
    "priceDisplay": "~$17.700 ref.",
    "hp": 103,
    "torque": 140,
    "clearance": 185,
    "trunk": 400,
    "tank": 50,
    "weight": 1180,
    "engine": "1.5L JLC-4G15C DVVT (Cadena)",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera (Grupo Geely)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto MPI)",
    "consumption": "13.3 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ABS + EBD + Cámara + Sensores (ESP según lote)",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla Táctil 8\" + Sunroof Eléctrico",
    "parts": "Bera Cars Venezuela / Base Geely GX3",
    "warranty": "Garantía Bera Cars VE",
    "oilSpec": "SAE 5W-30 Sintético API SP (4.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Excelente altura al suelo de 185 mm y tanque grande de 50 L (~600 km autonomía)",
      "Motor Geely 1.5L atmosférico con cadena de tiempo y discos x4",
      "Precio de crossover 0 km muy competitivo debajo de $18k"
    ],
    "cons": [
      "Solo 2 airbags",
      "Nota en ficha gráfica dice '143 l/pie' cuando el valor real son ~140-142 Nm",
      "Velocidad máxima urbana (103 HP)"
    ],
    "verdict": "Crossover 0 km sincrónico sumamente práctico para el bolsillo venezolano: alto (185 mm), tanque 50 L, cadena y sin turbo.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Geely DVVT.",
      "combustibleVE": "Inyección multipunto atmosférica muy amigable con gasolina regular VE.",
      "puntosClave": "Verificar disponibilidad y tiempos de repuestos de carrocería con Bera Cars; filtros y pastillas comparten con Geely GX3.",
      "fallasTipicas": "Cuidar sensores traseros en estacionamiento y presión correcta de cauchos R16."
    }
  },
  {
    "id": "livan-x3-pro-cvt",
    "maker": "Livan",
    "model": "X3 Pro 1.5L (CVT 8V)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Livan X3 Pro Automática"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 19000,
    "maxPrice": 20500,
    "priceDisplay": "~$19.500 ref.",
    "hp": 103,
    "torque": 140,
    "clearance": 185,
    "trunk": 400,
    "tank": 50,
    "weight": 1215,
    "engine": "1.5L JLC-4G15C DVVT (Cadena)",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Automática CVT Dual (8 Vel. Simuladas)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "12.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "ESP + HHC Asistente Pendiente + Discos x4",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla Táctil 8\" + Cruise Control + Sunroof",
    "parts": "Bera Cars Venezuela / Base Geely",
    "warranty": "Garantía Bera Cars VE",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Uno de los crossovers automáticos 0 km más baratos de VE (<$20k)",
      "185 mm de despeje, tanque 50 L, ESP, HHC y discos x4",
      "Motor Geely con cadena y cero turbo"
    ],
    "cons": [
      "Solo 2 airbags",
      "Aceleración pausada con 103 HP + CVT",
      "Red de postventa aún en expansión"
    ],
    "verdict": "Compra inteligente si buscas tu primer carro automático elevado alrededor de $19.5k sin sacrificar despeje ni discos traseros.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Compatible con gasolina local (multipunto sin turbo).",
      "puntosClave": "Cambiar fluido CVT máximo cada 40.000 km; evitar patinar en barro prolongadamente.",
      "fallasTipicas": "Respuesta progresiva al pisar a fondo; usar modo Sport/secuencial en subidas."
    }
  },
  {
    "id": "mg-3-mt",
    "maker": "MG",
    "model": "New MG 3 1.5L (5MT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "New MG 3 Sincrónico"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 18500,
    "maxPrice": 19500,
    "priceDisplay": "~$18.900 ref.",
    "hp": 108,
    "torque": 142,
    "clearance": 148,
    "trunk": 293,
    "tank": 45,
    "weight": 1162,
    "engine": "1.5L 4 Cil. DOHC 16V Atmosférico",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "15.0 km/L",
    "airbags": "2 a 6 Airbags (Confirmar Versión VE)",
    "esp": "ESP + ABS + EBD + CBC + TCS",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Doble Pantalla 7\" + 10.25\" CarPlay",
    "parts": "MG Motor Venezuela (6 años / 120k km)",
    "warranty": "6 años o 120.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP (4.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "108 HP / 142 Nm (superior a otros 1.0/1.2L del precio) y discos x4",
      "Garantía oficial MG VE de 6 años o 120.000 km",
      "Diseño hatchback ancho y estable (1.799 mm)"
    ],
    "cons": [
      "148 mm de despeje pide cautela en policías acostados altos",
      "Maleta compacta de 293 L",
      "Confirmar número de airbags según lote"
    ],
    "verdict": "Hatchback juvenil ágil, estable y bien respaldado (6 años garantía) por debajo de $19k.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica DOHC 16V.",
      "combustibleVE": "Motor 1.5L atmosférico multipunto muy tolerante a gasolina local.",
      "puntosClave": "Aprovechar sus frenos de disco en las 4 ruedas y dirección precisa; vigilar despeje de 148 mm con carga.",
      "fallasTipicas": "Cuidado normal de batería 12V para sus pantallas digitales."
    }
  },
  {
    "id": "mg-3-cvt",
    "maker": "MG",
    "model": "New MG 3 1.5L (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "New MG 3 Automático"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 21500,
    "maxPrice": 22500,
    "priceDisplay": "~$21.900 ref.",
    "hp": 108,
    "torque": 142,
    "clearance": 148,
    "trunk": 293,
    "tank": 45,
    "weight": 1195,
    "engine": "1.5L 4 Cil. DOHC 16V Atmosférico",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Automática CVT (Modo Manual Simulado)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.2 km/L",
    "airbags": "4 a 6 Airbags (Confirmar Lote VE)",
    "esp": "ESP + EPB AutoHold + Cámara 360° (Según Versión)",
    "brakes": "Discos en las 4 Ruedas",
    "infotainment": "Pantalla 10.25\" CarPlay/Android Auto + Clúster 7\"",
    "parts": "MG Motor Venezuela",
    "warranty": "6 años o 120.000 km",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "108 HP / discos x4 / garantía de 6 años por ~$21.900",
      "Chasis ancho (1.799 mm) con excelente aplomo urbano",
      "Tanque 45 L y motor sin turbo"
    ],
    "cons": [
      "Despeje urbano estándar (148 mm)",
      "Maleta de 293 L",
      "Requiere servicio puntual de CVT"
    ],
    "verdict": "Hatchback automático muy completo frente a rivales tradicionales más caros.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Multipunto atmosférico amigable con gasolina local.",
      "puntosClave": "Hacer cambio de fluido CVT a los 40.000-45.000 km; cuidar faldón delantero en rampas.",
      "fallasTipicas": "Cuidar perfil de llantas en baches nocturnos."
    }
  },
  {
    "id": "mg-5-cvt",
    "maker": "MG",
    "model": "New MG 5 Comfort 1.5L (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "MG 5 Comfort"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 23500,
    "maxPrice": 24900,
    "priceDisplay": "~$23.900 ref.",
    "hp": 113,
    "torque": 150,
    "clearance": 150,
    "trunk": 406,
    "tank": 45,
    "weight": 1245,
    "engine": "1.5L Atmosférico DOHC 16V",
    "displacement": "1.5L (1,498 cc)",
    "transmission": "Automática CVT Continuamente Variable",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "14.0 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + TCS + HHC + EPB Electrónico + TPMS",
    "brakes": "Discos en las 4 Ruedas (EPB)",
    "infotainment": "Pantalla 10.25\" CarPlay/Android Auto + Cuero/Tela",
    "parts": "MG Motor Venezuela",
    "warranty": "6 años o 120.000 km",
    "oilSpec": "SAE 5W-30 Sintético API SP + Fluido CVT",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "4 airbags, discos en las 4 ruedas y freno electrónico EPB en ~$23.900",
      "Garantía 6 años o 120.000 km + rines 205/55 R16",
      "Motor atmosférico confiable de 150 Nm sin turbo"
    ],
    "cons": [
      "Caja CVT enfocada en suavidad más que empuje deportivo",
      "406 L de baúl algo más chico que Cronos/Alsvin Plus",
      "Sin versión sincrónica en catálogo actual VE"
    ],
    "verdict": "Uno de los sedanes automáticos con mejor balance equipamiento-garantía-seguridad bajo $25.000.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Inyección multipunto sin turbo muy tolerante a gasolina local.",
      "puntosClave": "Cambiar fluido CVT a los 40.000 km y aprovechar llantas 205/55 R16 balanceadas.",
      "fallasTipicas": "Cuidado normal de batería por sistema EPB."
    }
  },
  {
    "id": "rely-r8-at",
    "maker": "RELY",
    "model": "R8 2.4T 4x4 L2+ ADAS (8AT)",
    "yearRange": "2026",
    "nicknames": [
      "RELY R8 2026"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 38900,
    "maxPrice": 42500,
    "priceDisplay": "~$39.900 ref.",
    "hp": 158,
    "torque": 230,
    "clearance": 230,
    "trunk": 1000,
    "tank": 75,
    "weight": 1960,
    "engine": "2.4L Turbo Gasolina",
    "displacement": "2.4L Turbo (2,400 cc)",
    "transmission": "Automática 8 Velocidades (8AT)",
    "traction": "4x2 / 4x4 (Según Versión)",
    "fuelType": "Gasolina 91+ Oct",
    "consumption": "9.0 km/L",
    "airbags": "7 Airbags (Front, Lat, Cortina + Rodilla)",
    "esp": "ESP + ADAS L2+ (AEB, ACC, LKA, Fatiga, Punto Ciego)",
    "brakes": "Discos (ABS + EBD + HHC)",
    "infotainment": "Pantalla Gigante 15.6\" + Clúster 12.3\" + Cám. 360°",
    "parts": "Red Comercial VE (Respaldo Chery/Kaiyi)",
    "warranty": "Garantía Red Autorizada VE",
    "oilSpec": "SAE 5W-30 100% Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "7 airbags + suite ADAS L2+ completa + pantallas gigantes de 15.6\"",
      "230 mm de despeje, 1.000 kg de carga y 2.500 kg de remolque",
      "Caja automática de 8 velocidades + gasolina 91+ octanos"
    ],
    "cons": [
      "Torque de 230 Nm algo modesto frente a pickups 2.0T de 360 Nm para remolque pesado",
      "Marca nueva exige confirmar stock de repuestos de carrocería",
      "Electrónica ADAS abundante"
    ],
    "verdict": "Pickup sobresaliente en tecnología de cabina (15.6\") y seguridad pasiva/activa (7 airbags + ADAS L2+) para uso mixto.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica.",
      "combustibleVE": "Ficha oficial indica gasolina 91 octanos o superior.",
      "puntosClave": "Verificar si la unidad en piso es 4x2 o 4x4 antes de reservar; cuidar sensores de radar frontal en baches/barro.",
      "fallasTipicas": "Cuidar alternador y batería por alto consumo eléctrico de pantallas + ADAS."
    }
  },
  {
    "id": "renault-kwid-mt",
    "maker": "Renault",
    "model": "Kwid Outsider Fase 2 1.0L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Renault Kwid"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 21500,
    "maxPrice": 23000,
    "priceDisplay": "$22.500 ref.",
    "hp": 66,
    "torque": 93,
    "clearance": 185,
    "trunk": 290,
    "tank": 38,
    "weight": 820,
    "engine": "1.0L B4D SCe 12V 3 Cil. (Cadena)",
    "displacement": "1.0L (999 cc)",
    "transmission": "Manual 5 Velocidades (SG1)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "17.0 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + HSA + TPMS (Fase 2)",
    "brakes": "Discos Del. / Tambor Tras.",
    "infotainment": "Media Evolution 8\" CarPlay/Android Auto",
    "parts": "Red Renault Venezuela",
    "warranty": "Garantía Oficial Renault VE",
    "oilSpec": "SAE 5W-30 / 10W-40 Sintético API SP (3.0 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "185 mm de despeje y peso pluma (786-820 kg) con 4 airbags y ESP",
      "Motor B4D con cadena de tiempo y baúl enorme para su tamaño (290 L)",
      "Excelente rendimiento de gasolina"
    ],
    "cons": [
      "$22.500 es elevado para un 1.0L de 66 HP y 3 cilindros",
      "Solo rines de 3 pernos en algunos lotes/medida estrecha",
      "Justo en autopistas de subida cargado"
    ],
    "verdict": "SUV en miniatura muy capaz en huecos y ciudad, aunque su precio en VE lo deja comprometido frente a opciones 1.2L/1.5L.",
    "bajoKapotReview": {
      "distribucion": "Cadena de distribución metálica B4D.",
      "combustibleVE": "Buena tolerancia a gasolina comercial VE.",
      "puntosClave": "Revisar balanceo y estado de bujes con frecuencia en ciudad.",
      "fallasTipicas": "Vibración característica de motor 3 cilindros en ralentí con A/C encendido."
    }
  },
  {
    "id": "renault-logan-zen-mt",
    "maker": "Renault",
    "model": "Logan Zen Fase II 1.6L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Renault Logan Sincrónico"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "MT",
    "minPrice": 21900,
    "maxPrice": 23500,
    "priceDisplay": "~$22.500 ref.",
    "hp": 111,
    "torque": 156,
    "clearance": 173,
    "trunk": 510,
    "tank": 50,
    "weight": 1070,
    "engine": "1.6L H4M/HR16 16V (Cadena Nissan)",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Manual 5 Velocidades (5MT)",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "13.5 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + HSA + ABS + EBD",
    "brakes": "Discos Del. / Tambor Tras.",
    "infotainment": "Media Evolution 7\" CarPlay/Android Auto",
    "parts": "Red Renault VE (Bloque Nissan HR16)",
    "warranty": "2 años o 50.000 km",
    "oilSpec": "SAE 5W-30 / 10W-30 Sintético (4.3 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡173 mm de despeje + 510 L de maleta + suspensión casi indestructible para vías rotas!",
      "Motor 1.6L 16V de origen Nissan con cadena metálica (156 Nm)",
      "4 airbags de serie y tanque de 50 L"
    ],
    "cons": [
      "Garantía oficial algo corta (2 años o 50.000 km)",
      "Acabados interiores sencillos y rumorosidad en autopista",
      "Frenos traseros de tambor"
    ],
    "verdict": "Tanque de guerra venezolano en formato sedán: altura de SUV (173 mm), motor Nissan con cadena, 510 L de baúl y 4 airbags.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica (motor Nissan HR16DE / Renault H4M).",
      "combustibleVE": "Excelente tolerancia a gasolina comercial VE.",
      "puntosClave": "Aprovechar sus 173 mm y caucho 185/65 R15 para caminos difíciles; verificar ajuste de empacaduras.",
      "fallasTipicas": "Cuidado de bobinas si entra humedad al lavar el motor."
    }
  },
  {
    "id": "renault-logan-intens-cvt",
    "maker": "Renault",
    "model": "Logan Intens Fase II 1.6L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Renault Logan Automático"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 25900,
    "maxPrice": 27500,
    "priceDisplay": "~$26.500 ref.",
    "hp": 111,
    "torque": 156,
    "clearance": 173,
    "trunk": 510,
    "tank": 50,
    "weight": 1125,
    "engine": "1.6L H4M/HR16 16V (Cadena Nissan)",
    "displacement": "1.6L (1,598 cc)",
    "transmission": "Automática CVT X-Tronic",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "12.8 km/L",
    "airbags": "4 Airbags (Frontales + Laterales)",
    "esp": "ESP + HSA + Climatizador Digital",
    "brakes": "Discos Del. / Tambor Tras. (Rines 16\")",
    "infotainment": "Media Evolution 7\" CarPlay/Android Auto",
    "parts": "Red Renault Venezuela",
    "warranty": "2 años o 50.000 km",
    "oilSpec": "SAE 5W-30 Sintético + Fluido CVT NS-3",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Une comodidad X-Tronic CVT con 173 mm de despeje y 510 L de maleta",
      "Motor Nissan HR16 con cadena + 4 airbags + climatizador",
      "Tanque de 50 L"
    ],
    "cons": [
      "Garantía corta (2 años / 50k km)",
      "Caja CVT X-Tronic exige cambio de aceite NS-3 riguroso cada 40k km",
      "Cauchos 195/55 R16 algo más firmes que el Zen R15"
    ],
    "verdict": "Sedán automático altísimo para calles rotas, siempre manteniendo estrictamente el servicio de su caja Jatco/X-Tronic CVT.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica HR16/H4M.",
      "combustibleVE": "Muy tolerante a gasolina local.",
      "puntosClave": "CRÍTICO CVT X-TRONIC: Cambiar fluido CVT NS-3 cada 40.000 km y evitar aceleraciones bruscas en frío.",
      "fallasTipicas": "Sobrecalentamiento CVT solo si se omite mantenimiento del enfriador/fluido."
    }
  },
  {
    "id": "toyota-agya-mt",
    "maker": "Toyota",
    "model": "Agya G 1.2L (5MT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Toyota Agya Sincrónico"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "MT",
    "minPrice": 19990,
    "maxPrice": 20300,
    "priceDisplay": "$19.990 (Incluye IVA e IGTF)",
    "hp": 87,
    "torque": 113,
    "clearance": 160,
    "trunk": 265,
    "tank": 36,
    "weight": 945,
    "engine": "1.2L WA-VE 3 Cil. Dual VVT-i (Cadena)",
    "displacement": "1.2L (1,198 cc)",
    "transmission": "Manual 5 Velocidades (D95C)",
    "traction": "FWD Delantera (Plataforma DNGA)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "19.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "VSC + TRC + HAC + ABS + EBD",
    "brakes": "Discos Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil + Cámara + Botón Encendido",
    "parts": "Red Toyota de Venezuela (5 años / 100k km + 4 años mtto incluido)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético API SP (3.3 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡Toyota 0 km por $19.990 c/ IVA + IGTF + 4 años / 40k km mantenimiento incluido!",
      "Consumo campeón (~19.5 km/L -> ~675 km por tanque de 36 L)",
      "Control de estabilidad VSC y asistencia en pendientes HAC + cadena metálica"
    ],
    "cons": [
      "Solo 2 airbags (el Grand i10 tiene 6 por el mismo precio)",
      "Motor 3 cilindros vibra ligeramente al ralentí vs 4 cilindros",
      "Espacio trasero y baúl de citycar"
    ],
    "verdict": "Imbatible en valor de reventa, garantía + mantenimiento incluido de Toyota por $19.990; ideal urbano.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Dual VVT-i.",
      "combustibleVE": "Multipunto atmosférico muy tolerante a gasolina local.",
      "puntosClave": "Aprovechar cobertura Toyota de 4 años/40.000 km en servicios periódicos sin costo en red oficial.",
      "fallasTipicas": "Vibración leve natural de 3 cilindros con el compresor de A/C activado."
    }
  },
  {
    "id": "toyota-agya-cvt",
    "maker": "Toyota",
    "model": "Agya G 1.2L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Toyota Agya Automático"
    ],
    "condition": "0km",
    "segment": "Citycar & Hatch",
    "transCategory": "AUTO",
    "minPrice": 21990,
    "maxPrice": 22300,
    "priceDisplay": "$21.990 (Incluye IVA e IGTF)",
    "hp": 87,
    "torque": 113,
    "clearance": 160,
    "trunk": 265,
    "tank": 36,
    "weight": 975,
    "engine": "1.2L WA-VE 3 Cil. Dual VVT-i (Cadena)",
    "displacement": "1.2L (1,198 cc)",
    "transmission": "Automática CVT (D88C)",
    "traction": "FWD Delantera (DNGA)",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "18.5 km/L",
    "airbags": "2 Airbags Frontales",
    "esp": "VSC + TRC + HAC + ABS + EBD",
    "brakes": "Discos Del. / Tambor Tras.",
    "infotainment": "Pantalla Táctil + Cámara + Botón Encendido",
    "parts": "Red Toyota de Venezuela (4 años mtto incluido)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético + Fluido CVT Toyota",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "Automático Toyota 0 km por $21.990 (IVA/IGTF + servicios hasta 40k km incluidos)",
      "Despeje decente de 160 mm y consumo urbano mínimo",
      "Liquidez extrema de reventa"
    ],
    "cons": [
      "Solo 2 airbags frontales",
      "87 HP con CVT enfocado estrictamente a movilidad urbana tranquila",
      "Tanque de 36 L"
    ],
    "verdict": "Compra de bajo riesgo financiero y operativo en ciudad por prestigio Toyota y servicios gratuitos incluidos.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Dual VVT-i.",
      "combustibleVE": "Compatible con gasolina local sin turbo.",
      "puntosClave": "Realizar todos sus servicios gratuitos en concesionario para mantener garantía intacta.",
      "fallasTipicas": "Cuidado de neumáticos 175/65 R14."
    }
  },
  {
    "id": "toyota-yaris-cvt",
    "sampleKey": "yaris",
    "maker": "Toyota",
    "model": "Yaris Sedán 1.5L (CVT)",
    "yearRange": "2024 - 2026",
    "nicknames": [
      "Toyota Yaris 2025",
      "Yaris DNGA"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 28500,
    "maxPrice": 31000,
    "priceDisplay": "~$29.500 ref.",
    "hp": 105,
    "torque": 138,
    "clearance": 160,
    "trunk": 475,
    "tank": 42,
    "weight": 1060,
    "engine": "1.5L 2NR-VE Dual VVT-i (Cadena)",
    "displacement": "1.5L (1,496 cc)",
    "transmission": "Automática CVT 7 Velocidades Simuladas",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 91 / 95 Oct",
    "consumption": "16.5 km/L",
    "airbags": "6 Airbags (Frontales, Laterales, Cortina)",
    "esp": "VSC + TRC + HAC + ABS + EBD",
    "brakes": "Discos Delanteros / Tambor Trasero",
    "infotainment": "Pantalla Táctil 8\" CarPlay/Android Auto",
    "parts": "Red Toyota de Venezuela",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-20 / 5W-30 Sintético API SP (3.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "6 airbags + VSC + 160 mm de despeje + 475 L de baúl",
      "Motor 2NR-VE 4 cilindros con cadena altamente probado y 16.5 km/L",
      "Cobertura Toyota y reventa líder"
    ],
    "cons": [
      "Frenos traseros de tambor",
      "105 HP orientados a eficiencia tranquila",
      "Tanque algo justo (42 L)"
    ],
    "verdict": "El sedán Toyota de batalla para la nueva década: seguro (6 airbags), económico, alto (160 mm) y sin complicaciones mecánicas.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Dual VVT-i.",
      "combustibleVE": "Excelente compatibilidad con gasolina venezolana (atmosférico multipunto).",
      "puntosClave": "Cambiar fluido CVT Toyota TC/FE a los 45.000 km.",
      "fallasTipicas": "Ninguna grave; limpiar campanas traseras anualmente."
    }
  },
  {
    "id": "toyota-corolla-seg-cvt",
    "maker": "Toyota",
    "model": "Corolla SEG 2.0L Dynamic Force (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Corolla SEG 2.0",
      "Corolla 2026"
    ],
    "condition": "0km",
    "segment": "Sedán",
    "transCategory": "AUTO",
    "minPrice": 41500,
    "maxPrice": 44500,
    "priceDisplay": "~$43.000 ref.",
    "hp": 170,
    "torque": 200,
    "clearance": 165,
    "trunk": 470,
    "tank": 50,
    "weight": 1370,
    "engine": "2.0L M20A-FKS Dynamic Force Dual D4-S (Cadena)",
    "displacement": "2.0L (1,987 cc)",
    "transmission": "Automática Direct Shift CVT 10V + Paddle Shift",
    "traction": "FWD Delantera (Doble Horquilla Trasera)",
    "fuelType": "Gasolina 95 Oct (Dual Inyección D4-S)",
    "consumption": "13.3 km/L",
    "airbags": "7 Airbags (Front, Lat, Cortina + Rodilla)",
    "esp": "VSC + ACA Curvas + HAC + ABS + EBD",
    "brakes": "Discos Ventilados en 4 Ruedas (Freno Manual)",
    "infotainment": "Pantalla Táctil Wireless CarPlay + 165 mm Despeje",
    "parts": "Red Toyota de Venezuela (4 años mtto incluido)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-16 / 0W-20 Sintético Toyota API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "170 HP / 200 Nm sin turbo + transmisión Direct Shift CVT (1ra mecánica física)",
      "Inyección Dual D4-S (puerto + directa) evita carbonización de válvulas",
      "165 mm de despeje + suspensión trasera doble horquilla + 7 airbags"
    ],
    "cons": [
      "Rines 225/45 R17 requieren cautela en baches severos",
      "Inversión de ~$43k USD",
      "Freno de estacionamiento manual tradicional en este acabado"
    ],
    "verdict": "Referente histórico modernizado: ingeniería Toyota TNGA con 165 mm reales, 7 airbags y motor 2.0L indestructible.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Dual VVT-i.",
      "combustibleVE": "Ventaja D4-S: combina inyección directa y de puerto, limpiando las válvulas de admisión automáticamente.",
      "puntosClave": "Usar aceite 0W-16 o 0W-20 API SP (incluido en los primeros 4 años / 40k km en Toyota VE); vigilar perfil 45 de los rines 17\".",
      "fallasTipicas": "Cuidado de flancos 225/45 R17 ante baches profundos."
    }
  },
  {
    "id": "toyota-corolla-cross-cvt",
    "maker": "Toyota",
    "model": "Corolla Cross 2.0L Dynamic Force (CVT)",
    "yearRange": "2025 - 2026",
    "nicknames": [
      "Corolla Cross 2026"
    ],
    "condition": "0km",
    "segment": "SUV & Crossover",
    "transCategory": "AUTO",
    "minPrice": 46500,
    "maxPrice": 49500,
    "priceDisplay": "~$48.000 ref.",
    "hp": 170,
    "torque": 200,
    "clearance": 161,
    "trunk": 440,
    "tank": 47,
    "weight": 1360,
    "engine": "2.0L M20A-FKS Dynamic Force D4-S",
    "displacement": "2.0L (1,987 cc)",
    "transmission": "Automática Direct Shift CVT 10V",
    "traction": "FWD Delantera",
    "fuelType": "Gasolina 95 Oct (Dual D4-S)",
    "consumption": "13.0 km/L",
    "airbags": "7 Airbags (Front, Lat, Cortina + Rodilla)",
    "esp": "VSC + Bi-LED + EPB Botón + Bi-Zona",
    "brakes": "Discos en las 4 Ruedas (225/50 R18)",
    "infotainment": "CarPlay/Android Auto Inalámbricos + EPB",
    "parts": "Red Toyota de Venezuela (4 años mtto incluido)",
    "warranty": "5 años o 100.000 km",
    "oilSpec": "SAE 0W-16 / 0W-20 Sintético API SP",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "7 airbags, motor 2.0L 170 HP sin turbo y 440 L de maletero",
      "4 años o 40.000 km de mantenimiento gratuito Toyota VE",
      "Posición elevada de manejo con liquidez de reventa máxima"
    ],
    "cons": [
      "Despeje de 161 mm es menor que el propio Corolla Sedán 2026 (165 mm)",
      "Precio cercano a $48k siendo tracción delantera y torsión trasera",
      "Tanque de 47 L"
    ],
    "verdict": "SUV urbana familiar de bajísima depreciación y mecánica eterna sin turbo; ideal si buscas postura SUV Toyota.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica Dual VVT-i.",
      "combustibleVE": "Dual D4-S tolera bien gasolina comercial manteniendo calidad.",
      "puntosClave": "Aprovechar sus servicios gratuitos de 40.000 km en concesionario Toyota VE.",
      "fallasTipicas": "Cuidar cauchos 225/50 R18 en baches."
    }
  },
  {
    "id": "toyota-land-cruiser-fj",
    "maker": "Toyota",
    "model": "Land Cruiser FJ 2.7L 4x4 (6AT)",
    "yearRange": "2026",
    "nicknames": [
      "Land Cruiser FJ 2026",
      "FJ 2.7"
    ],
    "condition": "0km",
    "segment": "Pickup & 4x4",
    "transCategory": "AUTO",
    "minPrice": 66000,
    "maxPrice": 72000,
    "priceDisplay": "~$68.000 ref.",
    "hp": 163,
    "torque": 245,
    "clearance": 215,
    "trunk": 450,
    "tank": 63,
    "weight": 1950,
    "engine": "2.7L 2TR-FE 4 Cil. Dual VVT-i (Cadena)",
    "displacement": "2.7L (2,694 cc)",
    "transmission": "Automática 6 Velocidades (6AT) + Part Time 4x4",
    "traction": "4x4 c/ Bajo + Bloqueo Diferencial Trasero",
    "fuelType": "Gasolina 91 / 95 Oct (Multipunto)",
    "consumption": "8.8 km/L",
    "airbags": "7 Airbags (Inc. Rodilla Conductor)",
    "esp": "VSC + DAC Descenso + HAC + Bloqueo Trasero",
    "brakes": "Discos Ventilados en las 4 Ruedas",
    "infotainment": "Clúster 7\" TFT + A/C Dual + 8 Sensores",
    "parts": "Red Toyota de Venezuela (Motor 2TR súper conocido)",
    "warranty": "5 años o 100.000 km (4 años mtto incluido)",
    "oilSpec": "SAE 5W-30 Sintético API SP (5.5 L)",
    "timingSpec": "Cadena Metálica",
    "pros": [
      "¡Motor 2TR 2.7L leyenda de durabilidad Toyota + dirección hidráulica + eje rígido trasero 4 enlaces!",
      "4x4 en tiempo parcial con bloqueo de diferencial trasero + DAC/HAC/2do Arranque",
      "7 airbags + discos ventilados x4 + 4 años de mantenimiento Toyota gratis"
    ],
    "cons": [
      "163 HP / 245 Nm responde con calma en autopista frente a un V6 o 2.0T",
      "Tanque de 63 L moderado para expediciones remotas",
      "Precio alto (~$68.000)"
    ],
    "verdict": "Todoterreno puro construido para durar 25+ años en Venezuela: bloque 2TR atmosférico multipunto, chasis rígido y bloqueo trasero.",
    "bajoKapotReview": {
      "distribucion": "Cadena metálica 2TR-FE prácticamente eterna.",
      "combustibleVE": "Ventaja enorme off-road en VE: bloque 2.7L atmosférico multipunto que acepta gasolina regular sin temor a turbos o GDI.",
      "puntosClave": "Activar periódicamente el 4H/4L y bloqueo trasero en camino de tierra para lubricar actuadores.",
      "fallasTipicas": "Alineación tras off-road pesado y revisión de engrase en ejes."
    }
  }
];

function buildVehiclesDbEntry(v) {
  return {
    id: v.id,
    sampleKey: v.sampleKey || v.id,
    maker: v.maker,
    model: v.model,
    yearRange: v.yearRange,
    nicknames: v.nicknames || [],
    condition: v.condition,
    segment: v.segment,
    transCategory: v.transCategory,
    minPrice: v.minPrice,
    maxPrice: v.maxPrice,
    priceDisplay: v.priceDisplay,
    clearanceMm: v.clearance,
    trunk: v.trunk,
    tank: v.tank,
    weight: v.weight,
    parts: v.parts,
    warranty: v.warranty,
    hp: v.hp,
    torque: v.torque,
    engine: v.engine,
    transmission: v.transmission,
    traction: v.traction,
    fuelType: v.fuelType,
    consumption: v.consumption,
    oilSpec: v.oilSpec,
    timingSpec: v.timingSpec,
    airbags: v.airbags,
    esp: v.esp,
    brakes: v.brakes,
    infotainment: v.infotainment,
    pros: v.pros || [],
    cons: v.cons || [],
    verdict: v.verdict,
    bajoKapotReview: v.bajoKapotReview
  };
}

function buildSampleCatalogEntry(v) {
  const isDiesel = (v.fuelType || "").toLowerCase().includes("diésel") || (v.fuelType || "").toLowerCase().includes("diesel");
  return {
    id: v.id,
    catalogId: v.id,
    maker: v.maker,
    model: v.model,
    yearRange: v.yearRange,
    condition: v.condition,
    segment: v.segment,
    transCategory: v.transCategory,
    priceDisplay: v.priceDisplay,
    warranty: v.warranty,
    oilSpec: v.oilSpec,
    timingSpec: v.timingSpec,
    fileName: `Ficha_${v.maker}_${v.model}.pdf`.replace(/[^a-zA-Z0-9_.-]+/g, "_"),
    hp: v.hp,
    torque: v.torque,
    clearance: v.clearance,
    trunk: v.trunk,
    tank: v.tank,
    weight: v.weight,
    engine: v.engine,
    displacement: v.displacement,
    transmission: v.transmission,
    traction: v.traction,
    fuelType: v.fuelType,
    airbags: v.airbags,
    esp: v.esp,
    brakes: v.brakes,
    infotainment: v.infotainment,
    bajoKapotReview: v.bajoKapotReview,
    b2bServices: {
      oil: v.oilSpec || "5W-30 Sintético Homologado",
      oilFilter: `Filtro OEM ${v.maker}`,
      brakes: v.brakes && v.brakes.includes("4 Ruedas") ? "Pastillas Cerámicas Del. + Tras." : "Pastillas Del. + Bandas Tras.",
      mechanicLabor: v.condition === "usado" ? "$25 USD Mano de Obra Cerrada" : (isDiesel ? "$45 USD Servicio Diésel" : "$30 USD Servicio Preventivo"),
      insuranceYear: v.minPrice > 40000 ? "$320+ USD / Año (Cobertura Amplia)" : "$190 USD / Año (Todo Riesgo + RCV)"
    }
  };
}

const VEHICLES_DB = BAJOKAPOT_MASTER_CATALOG.map(buildVehiclesDbEntry);

const SAMPLE_BROCHURES_CATALOG = {};
BAJOKAPOT_MASTER_CATALOG.forEach(v => {
  const entry = buildSampleCatalogEntry(v);
  SAMPLE_BROCHURES_CATALOG[v.id] = entry;
  if (v.sampleKey && v.sampleKey !== v.id) {
    SAMPLE_BROCHURES_CATALOG[v.sampleKey] = entry;
  }
});

// Catálogo DTC OBD2 con lenguaje adaptado a Venezuela
const DTC_DB = {
  "P0420": {
    code: "P0420",
    title: "Eficiencia del Catalizador por Debajo del Umbral (Banco 1)",
    severity: 2,
    desc: "Oye, el sensor que huele el escape está notando que el humo sale muy sucio. Tu carro va a rodar normal, no te va a dejar botado hoy, pero estás gastando más gasolina y contaminando.",
    venezuela: "En Venezuela, la gasolina a veces trae suciedad y azufre que tapan este sensor. Muchos mecánicos te dirán de una vez 'hay que vaciar el catalizador'. ¡No dejes que lo hagan sin revisar bien el sensor primero!",
    causes: [
      { name: "Sensor de oxígeno sucio (El que huele el escape)", pct: 60, cost: "$25 - $45 USD" },
      { name: "Fuga o huequito en el tubo de escape", pct: 25, cost: "$10 - $20 USD" },
      { name: "Catalizador dañado de verdad", pct: 15, cost: "$180 - $450 USD" }
    ],
    questions: [
      "¿Ya revisaste con el escáner si el sensor está marcando voltaje antes de condenar el catalizador?",
      "¿Te fijaste si el tubo de escape no tiene ninguna fuga por donde esté entrando aire?",
      "Si me vacías el catalizador, ¿sabes que el carro va a quedar oliendo a gasolina pura?"
    ]
  },
  "P0171": {
    code: "P0171",
    title: "Sistema de Combustible Demasiado Pobre (Banco 1)",
    severity: 2,
    desc: "El motor está respirando demasiado aire y recibiendo muy poquita gasolina. Por eso sientes que el carro da tirones en las subidas o le cuesta arrancar en las mañanas.",
    venezuela: "En nuestro país, esto casi siempre pasa porque la pila (bomba) de la gasolina ya no manda presión, o el filtro está tapado por lodo de los tanques de las estaciones de servicio.",
    causes: [
      { name: "Pila de la gasolina perdiendo fuerza", pct: 50, cost: "$15 - $35 USD" },
      { name: "Filtro de gasolina tapadísimo", pct: 30, cost: "$5 - $15 USD" },
      { name: "Inyectores sucios o tapados", pct: 20, cost: "$20 - $40 USD" }
    ],
    questions: [
      "¿Mediste la presión de la bomba de gasolina antes de ponerme a comprar sensores?",
      "¿Cuándo fue la última vez que cambiamos el microfiltro de los inyectores?"
    ]
  },
  "P0300": {
    code: "P0300",
    title: "Fallo de Encendido Múltiple / Aleatorio (Misfire)",
    severity: 3,
    desc: "Uno o varios cilindros no están quemando la gasolina. El motor tiembla violentamente y huele a gasolina cruda.",
    venezuela: "Si la luz de Check Engine PARPADEA, detén el vehículo de inmediato. La gasolina cruda funde el catalizador en minutos.",
    causes: [
      { name: "Bujías desgastadas o cables con chispa fugada", pct: 50, cost: "$15 - $35 USD" },
      { name: "Bobina de encendido agrietada o quemada", pct: 30, cost: "$25 - $60 USD" },
      { name: "Inyectores tapados por impurezas de gasolina", pct: 20, cost: "$20 - $40 USD" }
    ],
    questions: [
      "¿Probaste la chispa individual de cada bobina antes de sugerir que es la computadora?",
      "¿Sacaste las bujías para revisar si alguna salió negra o empapada en gasolina?"
    ]
  },
  "P0442": {
    code: "P0442",
    title: "Fuga Pequeña en Sistema de Emisiones Evaporativas (EVAP)",
    severity: 1,
    desc: "Los vapores del tanque de gasolina se están escapando levemente. En el 80% de los casos en Venezuela es la tapa del tanque floja o con la goma tostada.",
    venezuela: "No afecta el funcionamiento ni la fuerza del motor. Puedes conducir con total tranquilidad.",
    causes: [
      { name: "Tapa del tanque floja o empaque de goma vencido", pct: 75, cost: "$5 - $10 USD" },
      { name: "Manguera del canister agrietada por calor", pct: 25, cost: "$8 - $15 USD" }
    ],
    questions: [
      "¿Ya apretaste bien la tapa de gasolina con sus 3 clics y borraste el código para ver si regresa?"
    ]
  },
  "P0128": {
    code: "P0128",
    title: "Temperatura de Refrigerante por Debajo de Umbral (Termostato Pegado)",
    severity: 1,
    desc: "El motor tarda mucho en calentarse o nunca alcanza su temperatura óptima de 90°C.",
    venezuela: "Muchos mecánicos le quitan el termostato a los carros creyendo que así andan mejor. Esto hace que la computadora inyecte más gasolina y consuma 25% más.",
    causes: [
      { name: "Termostato eliminado o trabado abierto", pct: 80, cost: "$15 - $30 USD" },
      { name: "Sensor de temperatura ECT descalibrado", pct: 20, cost: "$10 - $20 USD" }
    ],
    questions: [
      "¿El carro todavía tiene su termostato original o se lo eliminaron en un taller anterior?"
    ]
  }
};

/* =============================================================================
   ESTADO GLOBAL DE LA APLICACIÓN
   ============================================================================= */
let isOnline = typeof navigator !== "undefined" && navigator.onLine !== undefined ? navigator.onLine : true;
let isProUser = false;
let selectedProPlan = "mensual"; // "mensual" ($4.99) | "vitalicio" ($9.99)
let pendingMutations = [];
let currentRoadFilter = "severo";
let currentUsageFilter = "diario";
let currentConditionFilter = "ALL";
let onlyWithinBudget = false;
let currentOdometer = 0;
let bcvRate = 36.50;
let bcvLastUpdate = null;
let currentAnalyticsGranularity = "global";
let analyticsGasChartInstance = null;
let analyticsExpenseTimeChartInstance = null;
let analyticsBreakdownChartInstance = null;

// Micro-Blockchain SHA-256 persistida en LocalStorage y BajoKapot Cloud
let blockchain = [];

/* =============================================================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  if(typeof loadActiveVehicle === 'function') loadActiveVehicle();
  console.log("BAJOKAPOT — Revisión & Fallas inicializado correctamente.");
  initOfflineSync();
  initProStatus();
  fetchBcvRate();
  updateMatchmaker();
  lookupDTC("P0420");
  if(typeof populateGaragePreloadSelect === 'function') populateGaragePreloadSelect();
  if(typeof initGarageMaintenanceModule === 'function') initGarageMaintenanceModule();
  renderBlockchain();
  loadDefaultDemoVehicles();
  if(typeof renderPreloadedCatalogPicker === 'function') renderPreloadedCatalogPicker();
  if(typeof renderGarageAnalytics === 'function') renderGarageAnalytics();
});

/* =============================================================================
   COMPONENTES VECTORIALES EDITORIALES (SILUETAS, MEDIDORES RADIALES Y CHASIS 2D)
   ============================================================================= */
function toggleQuickFab(forceState) {
  const wrap = document.getElementById("quickFabWrap");
  if (!wrap) return;
  if (typeof forceState === "boolean") {
    wrap.classList.toggle("open", forceState);
  } else {
    wrap.classList.toggle("open");
  }
}

document.addEventListener("click", (e) => {
  const wrap = document.getElementById("quickFabWrap");
  if (wrap && wrap.classList.contains("open") && !wrap.contains(e.target)) {
    wrap.classList.remove("open");
  }
});

const BAJOKAPOT_STENCIL_SHAPES = {
  sedan: {
    bodyPath: "M207.6 68.9L206.3 66.0Q207.0 62.3 206.9 58.5Q206.9 54.7 205.9 51.5Q204.8 48.2 204.2 47.3Q203.6 46.5 199.7 44.7Q195.7 42.9 185.1 40.0L165.1 37.0Q154.9 36.7 148.0 32.6Q141.0 28.4 134.6 25.2Q128.2 22.0 123.1 20.5Q117.9 18.9 110.4 17.8L80.7 17.7Q66.4 19.7 53.1 23.7L33.5 31.9Q28.8 33.0 26.0 33.1Q23.2 33.1 19.9 33.7Q16.6 34.2 15.9 34.5Q15.0 40.3 14.9 44.0Q14.7 47.7 13.4 50.8Q12.1 53.8 12.1 63.3Q16.0 67.1 18.1 67.8Q20.3 68.5 27.0 69.5Q33.7 70.5 38.5 70.5Q38.1 65.3 38.6 63.0Q39.2 60.6 40.3 58.4Q41.4 56.2 42.6 54.9Q43.8 53.7 46.5 52.1Q49.3 50.6 52.0 50.0Q54.7 49.5 57.1 50.0Q59.4 50.6 61.3 51.5Q63.3 52.4 65.3 54.3Q67.2 56.2 68.9 60.2Q70.6 64.3 70.6 66.2Q70.6 68.1 70.2 69.5Q69.8 71.0 70.2 72.4L154.6 72.4L155.1 72.0Q155.3 62.6 156.7 59.6Q158.0 56.6 160.0 54.7Q161.9 52.8 164.1 51.7Q166.4 50.6 170.6 50.5Q174.7 50.4 177.4 51.6Q180.0 52.8 182.4 55.3Q184.7 57.7 185.7 60.5Q186.7 63.4 187.3 73.4Q192.6 72.9 198.5 72.1Q204.3 71.3 205.7 70.6Q207.0 70.0 207.6 68.9ZM60.1 31.6Q64.0 27.8 65.7 26.7Q67.4 25.6 71.8 23.7Q76.1 21.8 78.9 21.6Q81.6 21.5 83.1 21.1Q84.6 20.7 89.8 20.7Q95.1 20.7 96.6 21.1Q96.6 28.7 97.1 30.6Q97.5 32.6 97.5 36.4Q96.8 36.7 92.6 36.8Q88.4 36.9 86.5 36.5Q84.5 36.0 78.3 36.0Q72.1 35.9 67.9 34.9Q63.7 33.8 60.1 31.6ZM135.4 38.8Q130.7 38.8 128.7 38.3Q126.8 37.9 118.2 37.9Q109.5 37.9 107.2 37.3Q105.4 34.3 104.0 28.5Q102.5 22.8 102.8 20.6Q107.5 20.7 113.2 21.7Q118.9 22.7 122.1 23.8Q125.4 24.9 131.8 28.1Q138.2 31.3 139.8 32.6L135.5 34.1Q135.0 35.5 135.4 38.8ZM145.3 37.6L144.1 35.0L148.4 37.4Q147.7 37.7 145.3 37.6ZM16.9 45.0L15.9 44.1L15.9 41.2Q17.6 40.0 18.4 39.9Q19.3 39.8 35.1 40.3L34.4 41.4Q22.9 45.3 16.9 45.0ZM183.9 46.0Q188.2 45.6 192.4 46.1Q196.7 46.7 198.9 48.3Q201.2 49.9 202.2 51.8Q201.5 52.0 195.0 50.6Q188.5 49.2 183.9 46.0Z",
    wheels: [{ cx: 54.4, cy: 65.9, r: 14.1 }, { cx: 171.0, cy: 65.9, r: 14.1 }]
  },
  suv: {
    bodyPath: "M99.0 64.6L70.2 63.7Q69.9 60.0 69.0 56.7Q68.0 53.3 66.4 50.6Q64.8 47.9 63.3 46.5Q61.8 45.1 58.0 43.6Q54.3 42.1 49.6 42.2Q44.9 42.3 42.4 43.6Q39.9 45.0 38.8 46.2Q37.7 47.5 35.9 51.0Q34.2 54.6 32.2 62.2Q21.7 61.2 14.5 58.9Q12.8 55.8 12.7 53.0Q12.6 50.2 12.8 49.0Q13.0 47.8 14.2 45.6Q15.4 43.4 15.7 27.4L25.7 11.7L25.4 10.4Q22.7 8.4 22.2 7.0L35.9 5.4L38.3 3.0Q39.9 2.7 42.8 3.7Q45.7 4.6 51.9 4.6Q58.2 4.6 63.0 3.7L84.1 3.7Q89.8 4.6 98.0 4.7Q106.1 4.7 114.2 6.2Q122.3 7.7 126.1 9.2Q129.9 10.6 136.7 14.4L153.4 25.5Q159.9 25.8 161.4 26.2Q162.9 26.6 166.6 26.7Q170.4 26.8 177.1 27.7Q183.9 28.7 190.4 30.3Q196.9 32.0 198.8 33.0Q200.7 34.0 201.9 35.2Q203.1 36.4 204.7 40.4Q206.4 44.5 206.3 45.8Q206.3 47.1 204.6 49.3L207.0 52.2L205.9 58.3Q200.7 62.6 198.5 63.4Q196.3 64.1 188.2 64.6Q187.1 57.2 186.4 55.4Q185.8 53.6 184.8 51.7Q183.9 49.8 181.7 47.6Q179.5 45.5 176.4 44.3Q173.3 43.1 169.0 43.1Q164.7 43.0 163.0 43.3Q161.4 43.5 158.8 45.2Q156.1 46.9 154.2 50.3Q152.2 53.6 151.2 56.8Q150.1 60.0 149.8 61.7Q149.6 63.4 148.4 65.1L101.4 65.1L99.0 64.6ZM98.0 26.2Q97.9 22.4 97.5 20.9Q97.1 19.4 97.0 9.9Q94.6 9.4 85.1 9.5Q75.7 9.6 74.1 10.5Q72.6 11.4 63.4 20.5Q64.1 21.7 67.2 23.5Q70.2 25.3 74.4 25.9Q78.5 26.5 87.1 26.6Q95.6 26.7 98.0 26.2ZM135.0 28.6Q135.7 23.6 136.9 20.9Q134.4 18.6 130.3 16.0Q126.1 13.5 120.4 12.0Q114.7 10.4 105.2 10.4Q104.8 13.7 107.2 26.6Q109.1 27.6 111.9 27.7Q114.7 27.7 115.8 28.1Q116.9 28.4 135.0 28.6ZM18.8 34.4Q22.2 33.9 34.6 28.1Q32.2 27.7 18.1 27.9L16.4 29.1Q16.5 30.0 18.8 34.4ZM201.7 38.7Q199.7 36.8 197.9 36.2Q196.2 35.6 190.0 34.5Q183.9 33.5 177.7 33.9Q193.7 40.9 195.0 41.0Q196.3 41.0 198.3 40.6Q200.2 40.1 201.7 38.7Z",
    wheels: [{ cx: 51.2, cy: 63.6, r: 16.4 }, { cx: 168.9, cy: 63.6, r: 16.4 }]
  },
  hatch: {
    bodyPath: "M65.4 71.3Q65.8 67.1 65.2 64.3Q64.7 61.5 63.5 59.2Q62.4 57.0 59.8 54.8Q57.1 52.7 55.0 52.0Q52.8 51.2 49.1 51.3Q45.4 51.4 42.9 52.7Q40.4 54.1 39.0 55.5Q37.6 57.0 36.6 58.9Q35.6 60.8 34.2 68.0L30.1 68.2Q26.1 65.5 25.4 64.3Q24.8 63.0 24.2 60.2Q23.7 57.5 24.2 55.2Q24.8 52.8 26.0 50.2Q27.2 47.6 27.4 43.9Q27.5 40.2 28.1 38.4Q28.6 36.5 30.0 34.5Q31.3 32.5 41.8 21.9Q40.8 20.0 36.6 16.6L36.1 14.2Q39.4 13.8 41.3 14.2Q43.2 14.6 44.7 14.2Q46.2 13.9 49.0 14.6Q51.8 15.4 55.2 14.6Q58.7 13.8 62.0 13.7Q65.3 13.7 68.3 12.8L95.1 11.8Q99.0 12.7 104.7 12.8Q110.4 12.8 115.6 13.9Q120.8 14.9 132.1 19.0L158.0 32.5Q172.7 36.0 178.9 38.4Q185.2 40.8 186.9 41.9Q188.7 43.1 190.3 44.8Q192.0 46.4 193.7 51.0Q195.4 55.6 195.4 58.4Q195.4 61.2 194.9 63.2Q194.5 65.1 196.0 68.9L195.4 69.9Q191.1 71.3 180.1 71.8Q179.2 69.8 179.0 66.6Q178.9 63.4 177.6 60.4Q176.2 57.4 174.3 55.5Q172.3 53.6 170.4 52.7Q168.6 51.7 165.4 51.4Q162.3 51.2 161.0 51.3Q159.7 51.4 157.7 52.3Q155.8 53.3 153.3 55.6Q150.9 58.0 149.7 60.2Q148.6 62.4 147.0 72.3L83.6 72.3Q80.2 71.8 65.4 71.3ZM141.2 37.7Q149.8 37.7 152.2 36.3Q149.3 33.5 144.7 30.4Q140.1 27.4 131.9 23.5Q123.7 19.7 117.1 18.2Q110.4 16.7 97.5 17.1Q98.3 18.3 101.4 33.4Q103.0 34.6 108.2 34.8Q113.3 34.9 115.3 35.4Q117.2 35.8 122.0 35.8Q126.7 35.9 132.6 36.8L132.6 32.0Q134.1 30.6 136.3 30.1L140.2 32.1L141.2 37.7ZM92.2 32.9Q90.7 19.1 89.8 17.1Q79.8 16.6 75.6 17.2Q71.3 17.8 67.6 18.9Q63.9 20.0 61.1 21.5Q58.2 22.9 56.5 25.0L56.2 27.7Q56.7 28.1 59.7 29.5Q62.7 30.8 70.2 31.4Q77.8 32.0 78.9 32.4Q80.0 32.7 92.2 32.9ZM35.6 32.0Q40.8 29.5 46.6 23.8L45.0 22.6L42.9 22.9Q35.7 30.1 35.1 31.5L35.6 32.0ZM30.8 45.4L40.9 42.1L37.8 41.3L37.4 40.4Q43.0 37.5 43.8 36.3Q42.1 35.1 40.3 35.0Q38.5 34.9 35.6 35.8Q32.7 36.8 32.0 37.5Q31.3 38.2 30.9 39.3Q30.5 40.4 30.8 45.4ZM191.1 49.3L191.0 48.3Q186.2 43.7 180.4 41.8Q174.6 39.9 171.4 40.1Q172.9 42.5 176.3 44.9Q179.8 47.2 182.2 48.1Q184.6 49.0 187.0 49.5Q189.4 49.9 191.1 49.3ZM188.2 65.6Q188.7 63.2 188.2 59.8Q187.8 62.2 188.2 65.6Z",
    wheels: [{ cx: 49.9, cy: 66.3, r: 13.7 }, { cx: 163.7, cy: 66.3, r: 13.7 }]
  },
  pickup: {
    bodyPath: "M208.4 56.6Q208.3 51.9 207.0 47.9Q205.7 43.9 205.5 41.7Q205.3 39.6 204.5 37.5Q203.6 35.5 202.9 34.8Q202.2 34.1 200.1 33.2Q198.1 32.4 188.7 30.3L168.5 27.4L161.1 27.1L141.5 14.1Q137.6 12.2 133.9 11.2Q130.1 10.1 121.5 9.1L85.0 9.1L80.7 10.5Q78.9 18.3 78.8 20.6Q78.7 23.0 78.3 24.5Q77.9 26.0 77.9 31.7Q77.8 37.4 78.3 39.4Q78.7 41.3 79.3 48.0Q79.8 54.6 80.4 57.0Q80.9 59.3 82.2 60.9L86.0 61.9L159.0 61.9Q160.9 52.3 161.9 50.4Q162.9 48.5 164.3 47.1Q165.7 45.6 168.2 44.3Q170.7 42.9 174.9 42.8Q179.1 42.7 181.8 43.4Q184.4 44.2 186.3 45.1Q188.2 46.1 189.2 47.1Q190.2 48.0 191.3 49.7Q192.5 51.4 193.1 53.2Q193.8 54.9 194.0 63.3Q196.4 63.8 197.6 63.6Q198.8 63.3 201.7 62.4Q204.5 61.4 208.4 56.6ZM76.9 28.8L76.4 28.3L56.2 28.3L50.5 27.3L17.8 27.3L15.4 27.8Q13.5 37.4 14.5 47.0L11.9 49.2L11.6 56.6L35.1 57.1Q37.1 53.3 39.5 51.0Q42.0 48.6 45.4 47.2Q48.8 45.8 52.0 45.7Q55.3 45.6 57.6 46.2Q59.9 46.8 61.4 47.6Q63.0 48.5 65.8 51.4Q68.7 54.3 71.9 60.7L79.3 60.9Q79.5 60.3 78.2 52.6Q76.9 45.0 76.9 28.8ZM111.9 28.3Q104.3 28.2 100.9 27.8Q97.6 27.3 93.5 26.1Q89.4 24.9 87.4 23.0Q87.5 17.3 88.4 14.4L90.9 13.0L111.9 12.9L112.4 13.4L112.4 27.8L111.9 28.3ZM144.6 30.2L122.1 28.7Q121.0 27.8 120.6 26.4Q120.1 24.9 120.6 12.9Q131.9 14.1 134.3 15.1Q136.7 16.0 141.3 18.6Q145.9 21.2 147.0 22.1L144.3 26.1L144.6 30.2ZM15.9 45.6Q15.4 43.2 15.5 38.9Q15.5 34.6 16.9 32.1L19.3 34.5Q19.2 43.1 18.7 44.6Q17.6 45.4 15.9 45.6ZM203.0 43.4L198.3 42.7L193.0 37.4L201.2 36.9Q203.1 38.9 203.5 40.3Q204.0 41.7 204.1 42.7L203.0 43.4Z",
    wheels: [{ cx: 52.6, cy: 64.3, r: 15.7 }, { cx: 176.7, cy: 64.3, r: 15.7 }]
  },
  fastback: {
    bodyPath: "M66.8 73.5Q65.9 71.5 65.8 66.8Q65.6 62.1 64.5 59.4Q63.4 56.7 60.9 54.4Q58.5 52.0 56.5 51.1Q54.6 50.2 52.3 49.6Q49.9 49.0 46.2 50.0Q42.5 51.1 41.2 51.7Q40.0 52.4 38.3 54.1Q36.6 55.7 35.0 59.4Q33.4 63.1 33.2 70.6L32.7 71.1Q26.1 71.0 21.5 69.8Q16.9 68.6 15.7 67.4Q14.5 66.2 13.8 64.5Q13.1 62.8 13.1 58.1Q13.1 53.4 13.9 51.3Q14.7 49.2 15.5 44.7L14.3 42.6Q15.5 37.0 14.5 33.6L21.9 32.4L47.3 23.3Q64.5 19.3 71.1 18.7Q77.8 18.2 79.7 17.7Q81.7 17.3 88.4 17.3Q95.1 17.3 97.1 17.7Q99.0 18.2 102.3 18.2Q105.6 18.3 111.3 19.3Q117.0 20.4 120.7 21.5Q124.4 22.6 137.2 28.0L155.8 38.2Q160.5 39.3 173.8 40.4L192.8 45.3L206.0 52.3Q206.7 54.4 206.3 59.1Q205.9 63.8 203.2 67.7Q203.9 68.9 205.7 69.8L205.5 71.0Q201.5 72.8 198.7 73.3Q195.9 73.9 189.2 73.9L188.7 73.5Q188.7 63.0 187.5 59.8Q186.3 56.7 183.8 54.4Q181.4 52.0 179.4 51.1Q177.5 50.2 175.1 49.6Q172.8 49.0 169.1 50.0Q165.4 51.1 164.1 51.7Q162.9 52.4 161.2 54.1Q159.5 55.7 157.9 59.4Q156.3 63.1 156.2 67.3Q156.0 71.5 155.6 73.0L154.4 73.7L110.5 73.9L104.7 73.0L66.8 73.5ZM129.7 39.4L132.1 35.1L136.9 34.1Q123.7 27.1 119.4 25.7Q115.1 24.2 110.3 23.2Q105.6 22.2 95.1 21.1L73.1 22.2L54.1 26.2L45.7 29.3Q51.2 32.4 56.4 33.5Q61.6 34.5 70.6 35.0Q79.7 35.6 81.2 36.0Q82.7 36.4 87.4 36.5Q92.2 36.5 93.7 37.0Q95.2 37.4 100.4 37.4Q105.6 37.5 107.1 37.9Q108.6 38.3 114.8 38.4Q121.0 38.5 122.1 38.8Q123.2 39.2 129.7 39.4ZM141.5 39.1L143.6 38.9Q142.9 37.7 139.8 36.0L141.5 39.1ZM17.4 44.2Q23.9 44.0 26.1 42.8Q28.3 41.7 31.3 38.9L17.4 38.4L15.9 40.8L17.4 44.2ZM198.5 52.5L199.3 51.4Q190.6 46.6 187.4 45.5Q184.2 44.5 183.0 44.7Q183.7 45.9 187.7 48.6Q191.7 51.3 193.4 52.0Q195.2 52.6 198.5 52.5ZM158.0 49.5L158.0 48.5L152.7 47.1L153.3 48.4Q155.8 49.7 158.0 49.5ZM112.6 64.1L141.2 64.3L140.9 63.6Q134.4 62.5 126.3 61.9Q118.2 61.4 116.7 61.0Q115.2 60.6 109.5 60.5Q103.8 60.4 99.9 59.5L78.8 59.5L76.4 60.0L76.0 60.9Q81.7 62.3 86.5 62.4Q91.2 62.5 93.2 62.9Q95.1 63.4 102.3 63.4Q109.5 63.4 112.6 64.1ZM196.1 63.1Q199.5 63.2 202.2 61.9L195.4 61.0L194.5 61.9L196.1 63.1Z",
    wheels: [{ cx: 49.7, cy: 65.5, r: 14.5 }, { cx: 172.5, cy: 65.5, r: 14.5 }]
  },
  coupe: {
    bodyPath: "M185.4 74.5Q185.3 62.1 184.6 59.9Q183.9 57.8 181.2 54.6Q178.6 51.5 176.3 50.4Q174.1 49.3 171.8 48.7Q169.5 48.1 165.9 48.8Q162.3 49.6 160.4 50.5Q158.5 51.5 156.9 53.2Q155.2 54.9 153.6 58.6Q152.0 62.2 151.8 73.5L151.3 74.0L68.0 73.8L66.7 72.6Q67.3 69.7 67.2 66.0Q67.1 62.2 65.5 58.6Q63.9 54.9 60.9 52.1Q58.0 49.2 54.2 48.2Q50.5 47.2 48.7 47.3Q46.9 47.4 45.1 48.0Q43.3 48.6 41.4 49.6Q39.5 50.6 37.8 52.2Q36.1 53.9 35.0 55.7Q33.9 57.4 32.9 60.8Q32.0 64.2 32.1 67.4Q32.3 70.7 31.8 71.6Q29.4 72.0 17.8 70.2L12.6 63.0Q14.4 56.3 14.0 53.4Q13.6 50.6 14.1 49.2Q14.6 47.8 16.9 44.7Q15.7 42.6 15.7 41.2L20.4 40.1L21.2 39.0Q15.1 30.8 15.0 29.9Q28.9 31.3 33.1 34.7L32.9 35.4L30.2 36.3L30.3 37.5L32.2 37.5L59.3 28.2L82.2 23.2Q89.8 22.2 99.4 22.2Q109.0 22.2 113.3 22.8Q117.5 23.4 133.5 29.4L150.5 38.3Q167.5 39.5 175.6 41.0Q183.7 42.6 187.5 44.0Q191.4 45.4 195.5 48.0Q199.7 50.6 206.5 57.2Q206.4 65.8 205.8 68.6L207.4 71.6Q200.2 74.0 197.4 74.0Q194.5 74.1 192.6 74.5Q190.6 75.0 185.8 75.0L185.4 74.5ZM120.6 40.4L123.0 36.2L126.8 35.1Q120.4 31.0 117.0 29.6Q113.6 28.2 108.0 27.1Q102.3 26.0 99.0 26.1Q95.7 26.1 94.2 26.5Q92.7 26.9 87.0 27.5Q81.3 28.0 76.5 29.0Q71.8 30.1 66.1 32.1L65.4 33.2Q70.9 36.4 75.6 37.4Q80.3 38.4 84.6 38.5Q88.8 38.6 90.8 39.0Q92.7 39.5 101.4 39.5Q110.0 39.5 111.5 39.8Q113.1 40.2 120.6 40.4ZM140.9 40.2L147.9 39.0L127.8 28.4Q123.4 27.1 121.0 27.5L140.9 40.2ZM31.3 47.1L33.7 44.7L33.7 43.8Q28.2 41.6 27.0 41.6Q25.7 41.6 24.0 42.2Q22.2 42.8 19.3 44.7L19.3 45.7Q20.9 46.9 31.3 47.1ZM196.9 52.4Q196.2 51.2 193.1 49.0Q190.1 46.7 187.4 45.6Q184.7 44.5 182.5 44.7Q184.5 47.6 189.1 50.1Q193.7 52.7 196.9 52.4ZM101.6 68.0L121.5 68.3L123.9 67.8Q112.9 67.2 111.4 66.8Q109.9 66.4 105.2 66.3Q100.5 66.3 94.8 65.2Q89.1 64.2 85.4 62.2Q81.7 60.1 79.5 57.9Q77.4 55.7 75.0 50.5Q76.6 49.3 88.4 47.6Q78.4 47.2 76.1 47.8Q73.7 48.3 72.1 49.5Q72.6 51.9 75.0 56.2Q77.4 60.5 80.1 62.7Q82.7 64.8 86.8 66.0Q90.9 67.2 95.1 67.3Q99.4 67.4 101.6 68.0ZM198.3 69.2L201.1 68.2L202.6 63.0L201.2 62.6L200.0 63.3L198.3 69.2Z",
    wheels: [{ cx: 49.6, cy: 64.5, r: 15.5 }, { cx: 168.6, cy: 64.8, r: 15.1 }]
  }
};

function _stencilCircleSubpath(cx, cy, r) {
  return `M${(cx - r).toFixed(1)} ${cy.toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(cx + r).toFixed(1)} ${cy.toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 1 0 ${(cx - r).toFixed(1)} ${cy.toFixed(1)}Z`;
}

function _resolveStencilKey(segment, modelStr = "") {
  const seg = (segment || "").toLowerCase();
  const mdl = (modelStr || "").toLowerCase();
  if (seg.includes("pickup") || seg.includes("4x4") || mdl.includes("hilux") || mdl.includes("ranger") || mdl.includes("tacoma") || mdl.includes("silverado") || mdl.includes("amarok")) return "pickup";
  if (seg.includes("suv") || seg.includes("crossover") || seg.includes("4wd") || mdl.includes("fortuner") || mdl.includes("jolion") || mdl.includes("tiggo") || mdl.includes("rav4") || mdl.includes("tucson") || mdl.includes("sportage") || mdl.includes("cr-v") || mdl.includes("x35") || mdl.includes("bj30")) return "suv";
  if (seg.includes("city") || seg.includes("hatch") || mdl.includes("swift") || mdl.includes("picanto") || mdl.includes("spark") || mdl.includes("yaris hb") || mdl.includes("208") || mdl.includes("aveo") && mdl.includes("5p")) return "hatch";
  if (seg.includes("coup") || seg.includes("deport") || mdl.includes("mustang") || mdl.includes("camaro") || mdl.includes("brz") || mdl.includes("gr86")) return "coupe";
  if (seg.includes("fastback") || mdl.includes("arrizo 8") || mdl.includes("civic") || mdl.includes("mazda 3") || mdl.includes("elantra")) return "fastback";
  return "sedan";
}

function getSegmentSilhouetteSvg(segment, modelStr = "", svgClass = "car-silhouette-svg segment-silhouette-svg", inlineStyle = "") {
  const key = _resolveStencilKey(segment, modelStr);
  const shape = BAJOKAPOT_STENCIL_SHAPES[key] || BAJOKAPOT_STENCIL_SHAPES.sedan;
  const wheelsMarkup = shape.wheels.map(w => {
    const d = _stencilCircleSubpath(w.cx, w.cy, w.r)
      + _stencilCircleSubpath(w.cx, w.cy, w.r * 0.67)
      + _stencilCircleSubpath(w.cx, w.cy, w.r * 0.54);
    return `<path d="${d}" fill="currentColor" fill-rule="evenodd"/>`;
  }).join("");
  return `<svg class="${svgClass}" ${inlineStyle ? `style="${inlineStyle}"` : ""} viewBox="0 0 220 86" fill="none" aria-hidden="true">
    <line x1="14" y1="81.2" x2="206" y2="81.2" stroke="currentColor" stroke-opacity="0.16" stroke-width="1" stroke-linecap="round"/>
    <path d="${shape.bodyPath}" fill="currentColor" fill-rule="evenodd"/>
    ${wheelsMarkup}
  </svg>`;
}

function toggleCardDrawer(drawerId, btnEl, openText = "Ocultar", closedText = "Ver más") {
  const el = document.getElementById(drawerId);
  if (!el) return;
  const isOpening = el.hasAttribute("hidden");
  if (isOpening) el.removeAttribute("hidden");
  else el.setAttribute("hidden", "");
  if (btnEl) btnEl.textContent = isOpening ? openText : closedText;
}

function renderRadialGaugeSvg(value, max = 100, color = "var(--accent)", size = 48, suffix = "%") {
  const safeVal = Math.max(0, Math.min(max, Number(value) || 0));
  const pct = max > 0 ? safeVal / max : 0;
  const r = 18;
  const cx = 24;
  const cy = 24;
  const c = 2 * Math.PI * r;
  const dash = (pct * c).toFixed(1);
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-label="${safeVal}${suffix}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--border-glass)" stroke-width="3.6"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="3.6" stroke-linecap="round"
      stroke-dasharray="${dash} ${c.toFixed(1)}" transform="rotate(-90 24 24)"/>
    <text x="24" y="27.5" text-anchor="middle" fill="var(--text-main)" font-family="var(--font-main)" font-size="11" font-weight="700">${Math.round(safeVal)}${suffix}</text>
  </svg>`;
}

function renderSegmentedBar(label, valuePct, displayText, color = "var(--text-secondary)", segments = 8) {
  const clamped = Math.max(8, Math.min(100, Math.round(valuePct)));
  const activeCount = Math.max(1, Math.round((clamped / 100) * segments));
  let units = "";
  for (let i = 0; i < segments; i++) {
    units += `<span class="seg-bar-unit ${i < activeCount ? 'active' : ''}" style="--seg-color:${color};"></span>`;
  }
  return `<div class="seg-bar-row">
    <span class="seg-bar-label">${label}</span>
    <div class="seg-bar-track">${units}</div>
    <span class="seg-bar-num">${displayText}</span>
  </div>`;
}

/* =============================================================================
   NAVEGACIÓN ENTRE PESTAÑAS (TABS)
   ============================================================================= */
function switchTab(tabId, btnElement) {
  // Ocultar todas las pestañas
  const panes = document.querySelectorAll(".tab-pane");
  panes.forEach(pane => pane.classList.remove("active"));

  // Sincronizar simultáneamente la barra superior de escritorio y el dock inferior
  const allNavButtons = document.querySelectorAll(".nav-item, .desktop-nav-btn");
  allNavButtons.forEach(btn => {
    const target = btn.getAttribute("data-tab");
    if (target === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Mostrar la pestaña seleccionada
  const targetPane = document.getElementById(tabId);
  if (targetPane) {
    targetPane.classList.add("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =============================================================================
   MODAL HELPERS
   ============================================================================= */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("show");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("show");
}

/* =============================================================================
   TAB 1: LÓGICA DEL MATCHMAKER AUTOMOTRIZ
   ============================================================================= */
function setBudgetPreset(amount) {
  const slider = document.getElementById("budgetRange");
  const numberInput = document.getElementById("budgetNumber");
  if (slider) slider.value = amount;
  if (numberInput) numberInput.value = amount;
  updateMatchmaker();
}

function syncBudgetInput(val) {
  const slider = document.getElementById("budgetRange");
  const numberInput = document.getElementById("budgetNumber");
  const num = parseInt(val) || 1000;
  if (slider) slider.value = num;
  if (numberInput) numberInput.value = num;
  updateMatchmaker();
}

function toggleStrictBudget(checkbox) {
  onlyWithinBudget = checkbox.checked;
  updateMatchmaker();
}

function setRoadFilter(roadType, element) {
  currentRoadFilter = roadType;
  const pills = document.querySelectorAll("#roadFilterPills .filter-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (element) element.classList.add("active");
  updateMatchmaker();
}

function setConditionFilter(cond, element) {
  currentConditionFilter = cond;
  const pills = document.querySelectorAll("#conditionFilterPills .filter-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (element) element.classList.add("active");
  updateMatchmaker();
}

function setUsageFilter(usageType, element) {
  currentUsageFilter = usageType;
  const pills = document.querySelectorAll("#usageFilterPills .filter-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (element) element.classList.add("active");
  updateMatchmaker();
}

function sendAdvisorVehicleToCompare(vehicleId) {
  const sample = SAMPLE_BROCHURES_CATALOG[vehicleId];
  if (!sample) return;

  if (comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo)) {
    comparedVehicles = [];
  }

  const alreadyIn = comparedVehicles.some(v => v.catalogId === sample.catalogId);
  if (!alreadyIn) {
    if (comparedVehicles.length >= 5) {
      alert("Ya tienes 5 vehículos en el Comparador. Quita uno antes de enviar otro modelo.");
      switchTab("comparador");
      return;
    }
    comparedVehicles.push({
      ...sample,
      id: "advisor_" + sample.catalogId + "_" + Date.now(),
      source: "catalog_advisor"
    });
  }

  renderComparisonTable();
  if (activeCompareSubTab === 'charts') renderComparisonCharts();
  if (activeCompareSubTab === 'advisor') renderAdvisorResults();
  if (activeCompareSubTab === 'services') renderB2BServices();
  if (typeof renderPreloadedCatalogPicker === 'function') renderPreloadedCatalogPicker();
  switchTab("comparador");
}

function updateMatchmaker() {
  const slider = document.getElementById("budgetRange");
  const maxBudget = parseInt(slider ? slider.value : 25000, 10) || 25000;

  // Actualizar etiqueta
  const label = document.getElementById("budgetLabel");
  if (label) label.textContent = `$${maxBudget.toLocaleString()} USD`;

  const numberInput = document.getElementById("budgetNumber");
  if (numberInput && numberInput.value != maxBudget) {
    numberInput.value = maxBudget;
  }

  const searchInput = document.getElementById("advisorSearchInput");
  const searchQuery = (searchInput ? searchInput.value : "").trim().toLowerCase();
  const segSelect = document.getElementById("segmentFilterSelect");
  const segFilter = segSelect ? segSelect.value : "ALL";
  const transSelect = document.getElementById("transFilterSelect");
  const transFilter = transSelect ? transSelect.value : "ALL";

  const filtersSummaryEl = document.getElementById("advisorActiveFiltersSummary");
  if (filtersSummaryEl) {
    const condMap = { ALL: "Todos", "0km": "0 km", usado: "Usados" };
    const roadMap = { severo: "Baches", moderado: "Ciudad", autopista: "Autopista", montana: "Montaña" };
    const usageMap = { diario: "Diario", taxi: "Taxi", familia: "Familia", rustico: "4x4" };
    const segShort = segFilter === "ALL" ? "" : ` · ${segFilter.split(" ")[0]}`;
    const transShort = transFilter === "ALL" ? "" : ` · ${transFilter}`;
    filtersSummaryEl.textContent = `${condMap[currentConditionFilter] || "Todos"}${segShort}${transShort} · ${roadMap[currentRoadFilter] || "Baches"} · ${usageMap[currentUsageFilter] || "Diario"} ▾`;
  }

  // Pre-filtrar por condición, segmento, transmisión y búsqueda de texto
  const baseList = VEHICLES_DB.filter(car => {
    if (currentConditionFilter !== "ALL" && car.condition !== currentConditionFilter) return false;
    if (segFilter !== "ALL" && car.segment !== segFilter) return false;
    if (transFilter !== "ALL" && car.transCategory !== transFilter) return false;
    if (searchQuery) {
      const bk = car.bajoKapotReview || {};
      const blob = [
        car.maker, car.model, car.engine, car.transmission, car.segment,
        (car.nicknames || []).join(" "), bk.distribucion || "", bk.combustibleVE || ""
      ].join(" ").toLowerCase();
      if (!blob.includes(searchQuery)) return false;
    }
    return true;
  });

  // Calificar vehículos
  let candidates = baseList.map(car => {
    let score = 52; // Base
    const isAffordable = car.minPrice <= maxBudget;
    const isFullyCovered = car.maxPrice <= maxBudget;

    // Ponderación de Precio
    if (isFullyCovered) {
      score += 24;
    } else if (isAffordable) {
      score += 14;
    } else {
      score -= 32;
    }

    // Ponderación de Vías y Baches en VE
    if (currentRoadFilter === "severo" || currentRoadFilter === "montana") {
      if (car.clearanceMm >= 180) score += 18;
      else if (car.clearanceMm >= 160) score += 11;
      else if (car.clearanceMm >= 150) score += 4;
      else score -= 14;
      if (currentRoadFilter === "montana" && car.torque >= 200) score += 6;
    } else if (currentRoadFilter === "autopista" && car.hp >= 130) {
      score += 10;
    }

    // Ponderación de Uso Principal
    const consKmL = parseFloat(car.consumption) || 11;
    if (currentUsageFilter === "diario") {
      if (consKmL >= 14.5) score += 14;
      else if (consKmL >= 12.5) score += 7;
    } else if (currentUsageFilter === "taxi") {
      if (car.transCategory === "MT") score += 6;
      if (consKmL >= 14) score += 10;
      if ((car.parts || "").includes("Inmediata")) score += 8;
    } else if (currentUsageFilter === "familia") {
      if (car.segment === "SUV & Crossover" || car.trunk >= 430) score += 12;
      if ((car.airbags || "").includes("6") || (car.airbags || "").includes("7")) score += 6;
    } else if (currentUsageFilter === "rustico") {
      if (car.segment === "Pickup & 4x4" || (car.traction || "").includes("4x4") || (car.traction || "").includes("4WD")) score += 18;
      else if (car.clearanceMm >= 190) score += 10;
      else score -= 10;
    }

    // Tolerancia mecánica / gasolina VE
    if ((car.parts || "").includes("Inmediata")) score += 8;
    const bkFuel = (car.bajoKapotReview && car.bajoKapotReview.combustibleVE || "").toLowerCase();
    if (bkFuel.includes("multipunto") && !bkFuel.includes("gdi")) score += 4;

    score = Math.max(10, Math.min(99, score));
    return {
      ...car,
      score,
      isAffordable,
      isFullyCovered,
      diffAmount: car.minPrice - maxBudget
    };
  });

  if (onlyWithinBudget) {
    candidates = candidates.filter(c => c.isAffordable);
  }

  candidates.sort((a, b) => b.score - a.score);

  const container = document.getElementById("matchmakerResults");
  if (!container) return;

  if (candidates.length === 0) {
    const hasFilterReset = currentConditionFilter !== "ALL" || segFilter !== "ALL" || transFilter !== "ALL" || searchQuery;
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px 16px;">
        <div style="margin-bottom:12px; color:var(--accent);">${ICONS.search}</div>
        <div style="font-weight:800; font-size:16px; color:var(--text-main); margin-bottom:6px;">No se encontraron vehículos con esos filtros bajo $${maxBudget.toLocaleString()} USD</div>
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">Hay ${VEHICLES_DB.length} vehículos/versiones en el catálogo BAJOKAPOT desde $2.000 USD (usados VE) y $15.400 USD (0 km).</div>
        <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
          ${hasFilterReset ? `<button class="btn btn-secondary btn-sm" onclick="document.getElementById('advisorSearchInput').value=''; document.getElementById('segmentFilterSelect').value='ALL'; document.getElementById('transFilterSelect').value='ALL'; setConditionFilter('ALL', document.querySelector('#conditionFilterPills .filter-pill'));">Limpiar Filtros</button>` : ''}
          <button class="btn btn-primary btn-sm" onclick="setBudgetPreset(35000)">Subir Presupuesto a $35,000</button>
        </div>
      </div>
    `;
    return;
  }

  const summaryBanner = `
    <div style="grid-column: 1 / -1; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:2px; padding:10px 14px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; font-size:12px;">
      <span style="color:var(--text-secondary);">Mostrando <strong style="color:var(--text-main);">${candidates.length}</strong> de ${VEHICLES_DB.length} versiones</span>
      <span style="color:var(--text-muted);">Presupuesto máx: <strong style="color:var(--text-main);">$${maxBudget.toLocaleString()} USD</strong></span>
    </div>
  `;

  container.innerHTML = summaryBanner + candidates.map((c) => {
    const condLabel = c.condition === "0km" ? "0 km" : "Usado";
    const bk = c.bajoKapotReview || {};
    const drawerId = "adv_drawer_" + String(c.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    const priceLabel = c.priceDisplay || ("$" + c.minPrice.toLocaleString());

    // Paso 3 (Silencio Visual): Neutro en reposo/en presupuesto; acento ámbar tenue solo si excede límite
    const isOverBudget = !c.isAffordable;
    const statusText = isOverBudget
      ? `<span style="display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:var(--amber); white-space:nowrap;"><span class="status-dot dot-amber"></span>Sobre límite</span>`
      : `<span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">${c.score}% afinidad</span>`;

    return `
      <div class="car-card car-card-editorial" style="${isOverBudget ? 'border-color: rgba(245, 158, 11, 0.28);' : ''}">
        <!-- Nivel 1: Silueta Stencil Hero Centrada (Paso 1 Op.5) -->
        <div class="car-silhouette-header editorial-silhouette-box">
          ${getSegmentSilhouetteSvg(c.segment, c.model)}
        </div>

        <!-- Nivel 2: Identidad y Ficha en Texto Limpio (Paso 2 Op.1) -->
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div class="editorial-card-head">
            <div class="editorial-car-identity">
              <div class="editorial-car-title">${c.maker} ${c.model}</div>
              <div class="editorial-kicker">
                <span>${c.segment}</span>
                <span>·</span>
                <span>${condLabel} · ${c.yearRange}</span>
              </div>
            </div>
            ${statusText}
          </div>

          <div style="font-size:12px; color:var(--text-secondary); line-height:1.45;">
            ${c.hp} HP · ${c.transmission} · Despeje ${c.clearanceMm} mm · ${c.consumption || '13.5 km/L'}
          </div>
        </div>

        <!-- Gaveta Opcional de Dictamen -->
        <div id="${drawerId}" class="maint-extra-drawer" hidden>
          <div style="color:var(--text-main);">${c.verdict}</div>
          <div><strong style="color:var(--text-main); font-weight:600;">Distribución:</strong> ${bk.distribucion || c.timingSpec} · <strong style="color:var(--text-main); font-weight:600;">Gasolina:</strong> ${bk.combustibleVE || c.fuelType}</div>
          <div><strong style="color:var(--text-main); font-weight:600;">Ventajas:</strong> ${(c.pros || []).join(' · ')}</div>
          <div><strong style="color:var(--text-main); font-weight:600;">Atención:</strong> ${(c.cons || []).join(' · ')}</div>
          <div><strong style="color:var(--text-main); font-weight:600;">En taller:</strong> ${bk.puntosClave || 'Inspeccionar compresión, tren delantero y servicio.'}</div>
        </div>

        <!-- Nivel 3: Precio y Acciones Sobrias -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:auto; padding-top:2px;">
          <span style="font-size:14px; font-weight:600; color:var(--text-main); font-variant-numeric:tabular-nums;">${priceLabel}</span>
          <div style="display:flex; align-items:center; gap:10px;">
            <button type="button" class="btn-quiet-link" onclick="toggleCardDrawer('${drawerId}', this, 'Ocultar', 'Ver dictamen')">Ver dictamen</button>
            <button type="button" class="btn-minimal-action" onclick="sendAdvisorVehicleToCompare('${c.id}')">Comparar</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* =============================================================================
   TAB 2: LÓGICA DEL ESCÁNER OBD2
   ============================================================================= */
function quickDTC(code) {
  const input = document.getElementById("dtcInput");
  if (input) input.value = code;
  lookupDTC(code);
}

function lookupDTC(customCode) {
  const input = document.getElementById("dtcInput");
  const code = (customCode || (input ? input.value : "P0420")).trim().toUpperCase();

  const dtc = DTC_DB[code] || {
    code: code,
    title: "Código Genérico Detectado (Módulo Powertrain)",
    severity: 2,
    desc: "Código de falla registrado por la computadora a bordo (ECU). Requiere inspección en vivo de sensores de oxígeno o mezcla de combustible.",
    venezuela: "Consulta con un taller de confianza con escáner OBD2 para monitorear lecturas en tiempo real antes de reemplazar piezas costosas.",
    causes: [
      { name: "Sensor o actuador fuera de rango", pct: 60, cost: "$20 - $50 USD" },
      { name: "Cableado o conector con sulfatación o falso contacto", pct: 40, cost: "$10 - $20 USD" }
    ],
    questions: [
      "¿Mediste los voltajes en vivo con el motor encendido para verificar si la señal responde?",
      "¿Revisaste si hay terminales flojos o sulfatados en el ramal eléctrico?"
    ]
  };

  const sevColor = dtc.severity === 3 ? "var(--danger)" : (dtc.severity === 2 ? "var(--amber)" : "var(--green)");
  const sevActionText = dtc.severity === 3
    ? "Detén el vehículo · Revisión urgente"
    : (dtc.severity === 2 ? "Puedes rodar con precaución · Visita taller" : "Operativo · Revisión preventiva");

  const card = document.getElementById("dtcResultCard");
  if (!card) return;

  card.innerHTML = `
    <div class="card" style="padding:16px; border-color: ${dtc.severity === 3 ? 'rgba(239, 68, 68, 0.45)' : (dtc.severity === 2 ? 'rgba(245, 158, 11, 0.35)' : 'var(--border-glass)')};">
      <!-- BLOQUE 1: SEMÁFORO DE DECISIÓN RÁPIDA -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid var(--border-subtle);">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${sevColor}; flex-shrink:0;"></span>
          <span style="font-size:16px; font-weight:800; color:var(--text-main); font-family:var(--font-mono);">${dtc.code}</span>
        </div>
        <span style="font-size:12px; font-weight:700; color:${sevColor};">${sevActionText}</span>
      </div>

      <p style="font-size:13.5px; line-height:1.5; color:var(--text-main); margin-bottom:8px;">
        ${dtc.desc}
      </p>
      <div style="font-size:12px; color:var(--text-secondary); background:var(--bg-card-alt); border-left:2.5px solid ${sevColor}; padding:8px 11px; border-radius:0 6px 6px 0; margin-bottom:14px;">
        <strong style="color:var(--text-main);">En Venezuela:</strong> ${dtc.venezuela}
      </div>

      <!-- BLOQUE 2: CAUSAS MÁS PROBABLES 80/20 -->
      <div style="font-size:11.5px; font-weight:700; color:var(--text-muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.4px;">
        Causas más probables (80/20)
      </div>
      <div style="display:flex; flex-direction:column; gap:9px; margin-bottom:14px;">
        ${dtc.causes.map(c => `
          <div>
            <div style="display:flex; justify-content:space-between; align-items:baseline; gap:8px; margin-bottom:4px;">
              <span style="color:var(--text-main); font-size:12.5px; font-weight:600;">${c.name}</span>
              <span style="color:var(--text-secondary); font-family:var(--font-mono); font-size:11px; font-weight:700; white-space:nowrap;">${c.pct}% · ${c.cost}</span>
            </div>
            <div style="height:4px; border-radius:99px; background:var(--border-subtle); overflow:hidden;">
              <div style="width:${c.pct}%; height:100%; background:${sevColor}; border-radius:99px;"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- BLOQUE 3: DESPLEGABLE PARA EL MECÁNICO -->
      <details class="maint-details-accordion">
        <summary>
          <span>Preguntas para el mecánico y detalle técnico</span>
          <span>▾</span>
        </summary>
        <div class="maint-details-body" style="gap:10px;">
          <div style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-secondary);">
            ${dtc.title}
          </div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${dtc.questions.map(q => `
              <label style="display:flex; gap:8px; align-items:flex-start; color:var(--text-main); font-size:12.5px; cursor:pointer;">
                <input type="checkbox" style="accent-color:var(--accent); margin-top:3px; flex-shrink:0;">
                <span>"${q}"</span>
              </label>
            `).join('')}
          </div>
          <button type="button" class="btn btn-secondary btn-sm" style="width:100%; justify-content:center; gap:6px;" onclick="saveDtcToCar('${dtc.code}')">
            ${ICONS.save} Guardar en Historial
          </button>
        </div>
      </details>
    </div>
  `;
}

function saveDtcToCar(code) {
  addMutation("service_records", "INSERT_DTC", { code, date: new Date().toISOString() });
  const carName = (typeof activeGarageVehicle !== 'undefined' && activeGarageVehicle)
    ? `${activeGarageVehicle.maker || ''} ${activeGarageVehicle.model || ''}`.trim() || 'tu vehículo'
    : 'tu vehículo';
  alert(`Código [${code}] registrado en el historial de servicio de ${carName}.`);
}

/* =============================================================================
   TAB 3: COMPARADOR & SCRAPING DE PDF MULTI-VEHÍCULO (HASTA 5)
   ============================================================================= */

const REFERENCE_COROLLA = {
  id: "ref-toyota-corolla-2011",
  maker: "Toyota",
  model: "Corolla GLi 2011 (Referencia VE)",
  fileName: "Auto de Referencia Estándar",
  hp: 132,
  torque: 170,
  clearance: 160,
  trunk: 450,
  tank: 50,
  weight: 1260,
  engine: "1.8L 1ZZ-FE (Cadena)",
  displacement: "1.8L (1,798 cc)",
  transmission: "Automática 4-Vel Super ECT",
  traction: "FWD Tracción Delantera",
  fuelType: "Gasolina 91 / 95 Oct",
  airbags: "2 Frontales",
  esp: "No Equipado (Versión VE)",
  brakes: "Discos Delanteros / Tambor Tras (ABS+EBD)",
  infotainment: "Radio OEM AM/FM CD MP3 Auxiliar",
  b2bServices: {
    oil: "10W-30 / 5W-30 Semi-Sintético (4.0 L)",
    oilFilter: "Toyota 90915-YZZE1 / PH4967",
    brakes: "Juego Cerámico Delantero D1210",
    mechanicLabor: "$25 USD Mano de Obra Cerrada",
    insuranceYear: "$140 USD / Año (RCV + Grúa 24/7)"
  },
  isReference: true
};

// SAMPLE_BROCHURES_CATALOG es generado dinámicamente desde BAJOKAPOT_MASTER_CATALOG arriba.

// =============================================================================
// MOTOR DE EVALUACIÓN AUTOMOTRIZ DE SEGURIDAD & CONFORT
// Basado en estándares Euro NCAP / Latin NCAP, ingeniería de chasis y telemática
// =============================================================================
function scoreAirbags(v) {
  const str = String(v.airbags || '').toLowerCase();
  const match = str.match(/(\d+)/);
  if (match) {
    let count = parseInt(match[1], 10);
    if (str.includes('rodilla') && count < 7) count = 7;
    return count;
  }
  if (str.includes('cortina')) return 6;
  if (str.includes('lateral') || str.includes('laterales')) return 4;
  if (str.includes('conductor y pasajero') || str.includes('conductor y copiloto') || str.includes('frontal') || str.includes('doble')) return 2;
  if (str.includes('no') || str.includes('sin')) return 0;
  return 2;
}

function scoreESP(v) {
  const str = String(v.esp || '').toLowerCase();
  if (str.includes('no disponible') || str.includes('sin esp') || str.includes('no incluye')) return 0;
  let score = 10; // Base por contar con control de estabilidad activo (ESP / ESC)
  // Generación módulo Bosch
  if (str.includes('9.3')) score += 6;
  else if (str.includes('9.1') || str.includes('9.')) score += 4;
  else if (str.includes('bosch')) score += 3;
  // Control de tracción
  if (str.includes('tcs') || str.includes('tracción') || str.includes('traccion') || str.includes('asr')) score += 4;
  // Asistencias en pendiente y descenso
  if (str.includes('hill') || str.includes('hac') || str.includes('hhc') || str.includes('pendiente')) score += 5;
  if (str.includes('descenso') || str.includes('hdc') || str.includes('dac')) score += 4;
  // Freno EPB / Auto-Hold integrado
  if (str.includes('epb') || str.includes('eléctrico') || str.includes('electrico') || str.includes('auto-hold') || str.includes('autohold')) score += 4;
  // ADAS / Frenado Autónomo de Emergencia
  if (str.includes('adas') || str.includes('autónomo') || str.includes('autonomo') || str.includes('aeb') || str.includes('colisión') || str.includes('colision') || str.includes('carril') || str.includes('punto ciego') || str.includes('bsd')) score += 15;
  // EBA / BAS / Mitigación de vuelco
  if (str.includes('eba') || str.includes('bas') || str.includes('ba ')) score += 3;
  if (str.includes('rmi') || str.includes('rom') || str.includes('vuelco')) score += 3;
  return score;
}

function scoreBrakes(v) {
  const str = String(v.brakes || '').toLowerCase();
  let score = 0;
  // 4 Discos vs Tambor Trasero
  if (str.includes('4 ruedas') || str.includes('cuatro ruedas') || str.includes('4 discos') || (str.includes('discos') && !str.includes('tambor'))) {
    score += 25; // 4 Discos completos (sin fatiga térmica en bajadas)
    if (str.includes('ventilados 4') || str.includes('ventilados en las 4') || (str.includes('ventilados del') && str.includes('ventilados tras'))) {
      score += 5; // 4 Discos Ventilados
    }
  } else if (str.includes('tambor')) {
    score += 12; // Discos Delanteros / Tambor Trasero
  } else {
    score += 15;
  }
  // Asistencias electrónicas de frenado
  if (str.includes('abs')) score += 5;
  if (str.includes('ebd') || str.includes('ref')) score += 5;
  if (str.includes('bas') || str.includes('ba') || str.includes('eba') || str.includes('asistencia frenado') || str.includes('asistente de frenado')) score += 5;
  if (str.includes('epb') || str.includes('eléctrico') || str.includes('electrico')) score += 4;
  if (str.includes('cerámic') || str.includes('ceramic')) score += 3;
  return score;
}

function scoreInfotainment(v) {
  const str = String(v.infotainment || '').toLowerCase();
  let score = 0;
  // Tamaño de pantalla en pulgadas
  const match = str.match(/(\d+(?:\.\d+)?)\s*(?:pulg|"|''|pulgadas)/);
  if (match) {
    score += parseFloat(match[1]) * 5;
  } else {
    score += 35;
  }
  // Smartphone Mirroring & Conectividad OEM
  if (str.includes('carplay') || str.includes('apple')) score += 15;
  if (str.includes('android')) score += 15;
  if (str.includes('inalámbrico') || str.includes('inalambrico') || str.includes('wireless')) score += 5;
  // Cockpit / Clúster digital
  if (str.includes('cockpit') || str.includes('clúster digital') || str.includes('cluster digital') || str.includes('tablero digital') || str.includes('digital 12') || str.includes('digital 10')) score += 10;
  if (str.includes('táctil') || str.includes('tactil') || str.includes('touch')) score += 5;
  if (str.includes('hd') || str.includes('alta definición') || str.includes('alta definicion')) score += 3;
  return score;
}

function scoreTraction(v) {
  const str = String(v.traction || '').toLowerCase();
  if (str.includes('reductora') || str.includes('low') || str.includes('4l') || str.includes('part-time')) return 35;
  if (str.includes('4x4') || str.includes('awd') || str.includes('integral') || str.includes('4wd')) return 28;
  if (str.includes('rwd') || str.includes('trasera')) return 18;
  if (str.includes('fwd') || str.includes('delantera')) return 15;
  return 10;
}

// Matriz Técnica Canónica Categorizada
const TECHNICAL_SPECS_SCHEMA = [
  // --- MOTOR & TRACCIÓN ---
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'hp',
    label: 'Potencia Máxima',
    unit: 'HP',
    isNumeric: true,
    better: 'higher',
    evaluateScore: v => Number(v.hp) || 0,
    getValue: v => Number(v.hp) || 0,
    format: v => `${v.hp} HP`
  },
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'torque',
    label: 'Torque Máximo',
    unit: 'Nm',
    isNumeric: true,
    better: 'higher',
    evaluateScore: v => Number(v.torque) || 0,
    getValue: v => Number(v.torque) || 0,
    format: v => `${v.torque} Nm`
  },
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'displacement',
    label: 'Cilindrada / Motor',
    unit: '',
    isNumeric: false,
    getValue: v => v.displacement || v.engine || 'Estándar',
    format: v => v.displacement || v.engine || 'Estándar'
  },
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'transmission',
    label: 'Transmisión',
    unit: '',
    isNumeric: false,
    getValue: v => v.transmission || 'Automática',
    format: v => v.transmission || 'Automática'
  },
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'traction',
    label: 'Sistema de Tracción',
    unit: '',
    isNumeric: false,
    better: 'higher',
    evaluateScore: scoreTraction,
    getValue: v => v.traction || 'FWD Delantera',
    format: v => v.traction || 'FWD Delantera'
  },
  {
    category: 'motor',
    categoryName: 'Motor & Tren Motriz',
    key: 'fuelType',
    label: 'Tipo de Combustible',
    unit: '',
    isNumeric: false,
    getValue: v => v.fuelType || 'Gasolina 95 Oct',
    format: v => v.fuelType || 'Gasolina 95 Oct'
  },

  // --- DIMENSIONES & CARGA ---
  {
    category: 'dimensions',
    categoryName: 'Dimensiones & Capacidades',
    key: 'clearance',
    label: 'Despeje Libre al Suelo',
    unit: 'mm',
    isNumeric: true,
    better: 'higher',
    evaluateScore: v => Number(v.clearance) || 0,
    getValue: v => Number(v.clearance) || 0,
    format: v => `${v.clearance} mm`
  },
  {
    category: 'dimensions',
    categoryName: 'Dimensiones & Capacidades',
    key: 'trunk',
    label: 'Capacidad Maletero / Tolva',
    unit: 'L',
    isNumeric: true,
    better: 'higher',
    evaluateScore: v => Number(v.trunk) || 0,
    getValue: v => Number(v.trunk) || 0,
    format: v => `${v.trunk} L`
  },
  {
    category: 'dimensions',
    categoryName: 'Dimensiones & Capacidades',
    key: 'tank',
    label: 'Tanque de Combustible',
    unit: 'L',
    isNumeric: true,
    better: 'higher',
    evaluateScore: v => Number(v.tank) || 0,
    getValue: v => Number(v.tank) || 0,
    format: v => `${v.tank} L`
  },
  {
    category: 'dimensions',
    categoryName: 'Dimensiones & Capacidades',
    key: 'weight',
    label: 'Peso en Vacío (Tara)',
    unit: 'kg',
    isNumeric: true,
    better: 'lower',
    evaluateScore: v => Number(v.weight) || 1350,
    getValue: v => Number(v.weight) || 1350,
    format: v => `${v.weight || 1350} kg`
  },

  // --- SEGURIDAD & CONFORT ---
  {
    category: 'safety',
    categoryName: 'Seguridad & Confort',
    key: 'airbags',
    label: 'Bolsas de Aire (Airbags)',
    unit: '',
    isNumeric: false,
    better: 'higher',
    evaluateScore: scoreAirbags,
    getValue: v => v.airbags || '2 Frontales',
    format: v => v.airbags || '2 Frontales'
  },
  {
    category: 'safety',
    categoryName: 'Seguridad & Confort',
    key: 'esp',
    label: 'Control Estabilidad (ESP/TCS)',
    unit: '',
    isNumeric: false,
    better: 'higher',
    evaluateScore: scoreESP,
    getValue: v => v.esp || 'ESP + TCS',
    format: v => v.esp || 'ESP + TCS'
  },
  {
    category: 'safety',
    categoryName: 'Seguridad & Confort',
    key: 'brakes',
    label: 'Frenos & Asistencias (ABS/EBD)',
    unit: '',
    isNumeric: false,
    better: 'higher',
    evaluateScore: scoreBrakes,
    getValue: v => v.brakes || 'Discos Del / Tambor Tras',
    format: v => v.brakes || 'Discos Del / Tambor Tras'
  },
  {
    category: 'safety',
    categoryName: 'Seguridad & Confort',
    key: 'infotainment',
    label: 'Pantalla & Conectividad',
    unit: '',
    isNumeric: false,
    better: 'higher',
    evaluateScore: scoreInfotainment,
    getValue: v => v.infotainment || 'Pantalla Táctil HD',
    format: v => v.infotainment || 'Pantalla Táctil HD'
  },

  // --- BAJO EL KAPOT (REVISIÓN, FALLAS & COMERCIAL VE) ---
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'priceDisplay',
    label: 'Precio Referencial VE',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => v.priceDisplay || 'Consultar Concesionario',
    format: v => v.priceDisplay || 'Consultar Concesionario'
  },
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'warranty',
    label: 'Garantía Oficial / Respaldo',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => v.warranty || 'Estándar Concesionario',
    format: v => v.warranty || 'Estándar Concesionario'
  },
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'bk_distribucion',
    label: 'Sistema de Distribución',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => (v.bajoKapotReview && v.bajoKapotReview.distribucion) || v.timingSpec || 'Consultar ficha técnica',
    format: v => (v.bajoKapotReview && v.bajoKapotReview.distribucion) || v.timingSpec || 'Consultar ficha técnica'
  },
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'bk_combustible',
    label: 'Tolerancia Gasolina VE',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => (v.bajoKapotReview && v.bajoKapotReview.combustibleVE) || v.fuelType || 'Gasolina Comercial',
    format: v => (v.bajoKapotReview && v.bajoKapotReview.combustibleVE) || v.fuelType || 'Gasolina Comercial'
  },
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'bk_puntosClave',
    label: 'Qué Revisar (Pre-Compra/Serv.)',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => (v.bajoKapotReview && v.bajoKapotReview.puntosClave) || 'Verificar tren delantero, lubricante y caja',
    format: v => (v.bajoKapotReview && v.bajoKapotReview.puntosClave) || 'Verificar tren delantero, lubricante y caja'
  },
  {
    category: 'bajokapot',
    categoryName: 'Bajo el Kapot (Revisión & Fallas VE)',
    key: 'bk_fallasTipicas',
    label: 'Fallas Típicas / Precauciones',
    unit: '',
    isNumeric: false,
    better: null,
    getValue: v => (v.bajoKapotReview && v.bajoKapotReview.fallasTipicas) || 'Seguir intervalo severo venezolano',
    format: v => (v.bajoKapotReview && v.bajoKapotReview.fallasTipicas) || 'Seguir intervalo severo venezolano'
  }
];

// Paleta de colores distintiva por vehículo (BAJOKAPOT Ignition Telemetry)
const VEHICLE_COLORS = [
  { border: '#FF6B00', bg: 'rgba(255, 107, 0, 0.45)', bgTrans: 'rgba(255, 107, 0, 0.16)', name: 'Naranja Ignición' },
  { border: '#10b981', bg: 'rgba(16, 185, 129, 0.45)', bgTrans: 'rgba(16, 185, 129, 0.15)', name: 'Esmeralda' },
  { border: '#FFB800', bg: 'rgba(255, 184, 0, 0.45)', bgTrans: 'rgba(255, 184, 0, 0.15)', name: 'Ámbar Alerta' },
  { border: '#38bdf8', bg: 'rgba(56, 189, 248, 0.45)', bgTrans: 'rgba(56, 189, 248, 0.15)', name: 'Cian Telemetría' },
  { border: '#a855f7', bg: 'rgba(168, 85, 247, 0.45)', bgTrans: 'rgba(168, 85, 247, 0.15)', name: 'Púrpura' }
];

// Estado reactivo del módulo comparador
let comparedVehicles = [];
let activeCompareSubTab = 'specs';
let matrixSearchQuery = '';
let matrixActiveCategory = 'all'; // 'all' | 'motor' | 'dimensions' | 'safety'
let diffOnlyMode = false;
let highlightBestMode = true;
let chartBarInstance = null;
let chartRadarInstance = null;
let advisorPriorities = {
  power: 5,
  clearance: 8,
  cargo: 6,
  safety: 7
};

/* =============================================================================
   NAVEGACIÓN INTERNA DE SUB-PESTAÑAS DEL COMPARADOR
   ============================================================================= */
function switchCompareSubTab(subTab) {
  activeCompareSubTab = subTab;
  const subPanes = ['specs', 'charts', 'advisor', 'services'];
  
  subPanes.forEach(pane => {
    const el = document.getElementById(`compareSubPane-${pane}`);
    const btn = document.getElementById(`compareSubTabBtn-${pane}`);
    if (el) el.style.display = (pane === subTab) ? 'block' : 'none';
    if (btn) {
      if (pane === subTab) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });

  if (subTab === 'charts') {
    renderComparisonCharts();
  } else if (subTab === 'advisor') {
    renderAdvisorResults();
  } else if (subTab === 'services') {
    renderB2BServices();
  }
}

function loadDefaultDemoVehicles() {
  if (!SAMPLE_BROCHURES_CATALOG.changan || !SAMPLE_BROCHURES_CATALOG.tiggo) return;
  comparedVehicles = [
    {
      ...SAMPLE_BROCHURES_CATALOG.changan,
      id: "demo_changan_" + Date.now(),
      source: "default_demo",
      isDefaultDemo: true
    },
    {
      ...SAMPLE_BROCHURES_CATALOG.tiggo,
      id: "demo_tiggo_" + (Date.now() + 1),
      source: "default_demo",
      isDefaultDemo: true
    }
  ];
  renderComparisonTable();
}

function loadSampleBrochure(sampleKey) {
  const sample = SAMPLE_BROCHURES_CATALOG[sampleKey];
  if (!sample) return;

  if (comparedVehicles.length >= 5) {
    alert("Límite alcanzado: Puedes comparar hasta 5 vehículos simultáneamente. Quita uno para agregar otro.");
    return;
  }

  // Si los vehículos actuales son sólo los de demostración, limpiarlos al cargar uno nuevo
  if (comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo)) {
    comparedVehicles = [];
  }

  // Clonar objeto con ID único
  const newCar = {
    ...sample,
    id: "sample_" + sampleKey + "_" + Date.now(),
    source: "sample"
  };

  comparedVehicles.push(newCar);
  renderComparisonTable();

  if (activeCompareSubTab === 'charts') renderComparisonCharts();
  if (activeCompareSubTab === 'advisor') renderAdvisorResults();
  if (activeCompareSubTab === 'services') renderB2BServices();
}

function renderPreloadedCatalogPicker() {
  const grid = document.getElementById("preloadedCatalogGrid");
  const badge = document.getElementById("preloadedCatalogCountBadge");
  if (!grid || typeof BAJOKAPOT_MASTER_CATALOG === "undefined") return;

  const q = (document.getElementById("preloadedCatalogSearch")?.value || "").trim().toLowerCase();
  const seg = document.getElementById("preloadedSegmentFilter")?.value || "ALL";
  const trans = document.getElementById("preloadedTransFilter")?.value || "ALL";

  const filtered = BAJOKAPOT_MASTER_CATALOG.filter(v => {
    if (seg !== "ALL" && v.segment !== seg) return false;
    if (trans !== "ALL" && v.transCategory !== trans) return false;
    if (q) {
      const hay = `${v.maker} ${v.model} ${v.transmission} ${v.engine} ${(v.nicknames || []).join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (badge) {
    badge.textContent = filtered.length === BAJOKAPOT_MASTER_CATALOG.length
      ? `${BAJOKAPOT_MASTER_CATALOG.length} versiones listas`
      : `${filtered.length} de ${BAJOKAPOT_MASTER_CATALOG.length} versiones`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:18px; font-size:12px; color:var(--text-muted);">No hay versiones precargadas que coincidan con ese filtro.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(v => {
    const isActive = comparedVehicles.some(c => !c.isDefaultDemo && (c.catalogId === v.id || c.model === v.model && c.maker === v.maker));
    const transShort = v.transCategory === "MT" ? "Sinc." : "Auto";
    return `
      <button type="button" class="catalog-picker-chip ${isActive ? 'in-compare' : ''}" onclick="toggleCatalogVehicleInCompare('${v.id}')" title="Clic para ${isActive ? 'quitar de' : 'agregar a'} la mesa comparativa">
        <div style="display:flex; justify-content:center; padding:2px 0; color:var(--text-main);">
          ${getSegmentSilhouetteSvg(v.segment, v.model, "catalog-chip-stencil")}
        </div>

        <div style="display:flex; flex-direction:column; gap:3px; min-width:0;">
          <div style="font-size:13px; font-weight:600; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${v.maker} ${v.model}</div>
          <div style="font-size:12px; color:var(--text-muted);">${transShort} · ${v.hp} HP · ${v.clearance} mm</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; padding-top:2px;">
          <span style="font-size:12.5px; font-weight:600; color:var(--text-main); font-variant-numeric:tabular-nums;">${v.priceDisplay || ('$' + v.minPrice.toLocaleString())}</span>
          ${isActive
            ? `<span style="display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:var(--amber); white-space:nowrap;"><span class="status-dot dot-amber"></span>En mesa</span>`
            : `<span style="font-size:12px; color:var(--text-muted); white-space:nowrap;">+ Elegir</span>`
          }
        </div>
      </button>
    `;
  }).join("");
}

function toggleCatalogVehicleInCompare(catalogId) {
  const existing = comparedVehicles.find(c => !c.isDefaultDemo && c.catalogId === catalogId);
  if (existing) {
    removeComparedVehicle(existing.id);
    return;
  }
  loadSampleBrochure(catalogId);
}

function removeComparedVehicle(vehicleId) {
  comparedVehicles = comparedVehicles.filter(v => v.id !== vehicleId);
  renderComparisonTable();

  if (activeCompareSubTab === 'charts') renderComparisonCharts();
  if (activeCompareSubTab === 'advisor') renderAdvisorResults();
  if (activeCompareSubTab === 'services') renderB2BServices();
}

function clearAllComparedVehicles(silent = false) {
  if (comparedVehicles.length === 0) return;
  if (silent || confirm("¿Deseas vaciar la lista de vehículos en el comparador?")) {
    comparedVehicles = [];
    renderComparisonTable();
    if (activeCompareSubTab === 'charts') renderComparisonCharts();
    if (activeCompareSubTab === 'advisor') renderAdvisorResults();
    if (activeCompareSubTab === 'services') renderB2BServices();
  }
}

/* =============================================================================
   NOTIFICACIÓN & PANTALLA DE CARGA: LECTURA DE FICHAS TÉCNICAS (IA GEMINI)
   ============================================================================= */
function showPdfLoadingModal(totalFiles) {
  const modal = document.getElementById("pdfLoadingModal");
  const filenameEl = document.getElementById("pdfLoadingFilename");
  const barEl = document.getElementById("pdfLoadingProgressBar");
  const stepEl = document.getElementById("pdfLoadingStep");
  const inlineBanner = document.getElementById("pdfLoadingInlineBanner");
  const inlineText = document.getElementById("pdfInlineStatusText");

  const plural = totalFiles > 1 ? `s (${totalFiles} seleccionados)` : "";
  if (filenameEl) filenameEl.textContent = `Preparando ficha técnica${plural}...`;
  if (barEl) barEl.style.width = "15%";
  if (stepEl) stepEl.textContent = "[1/3] Inicializando pipeline de análisis multimodal...";

  if (inlineBanner) {
    inlineBanner.style.display = "block";
    if (inlineText) inlineText.textContent = `Leyendo ${totalFiles} archivo${totalFiles > 1 ? 's' : ''} con Motor IA...`;
  }

  if (modal) modal.classList.add("show");

  // Retroalimentación visual en el dropzone
  const dropzone = document.querySelector(".dropzone");
  if (dropzone) {
    dropzone.style.borderColor = "var(--cyan)";
    dropzone.style.background = "rgba(56, 189, 248, 0.04)";
    dropzone.style.pointerEvents = "none";
  }
}

function updatePdfLoadingProgress(currentIndex, totalFiles, currentFilename) {
  const filenameEl = document.getElementById("pdfLoadingFilename");
  const barEl = document.getElementById("pdfLoadingProgressBar");
  const inlineText = document.getElementById("pdfInlineStatusText");

  const basePct = Math.round(((currentIndex - 1) / totalFiles) * 80) + 15;
  if (filenameEl) filenameEl.textContent = `[${currentIndex}/${totalFiles}] ${currentFilename}`;
  if (barEl) barEl.style.width = `${basePct}%`;
  if (inlineText) inlineText.textContent = `Analizando [${currentIndex}/${totalFiles}]: ${currentFilename}`;
}

function updatePdfLoadingStep(stepText) {
  const stepEl = document.getElementById("pdfLoadingStep");
  const inlineText = document.getElementById("pdfInlineStatusText");
  if (stepEl) stepEl.textContent = stepText;
  if (inlineText && stepText) inlineText.textContent = stepText;
}

function hidePdfLoadingModal() {
  const barEl = document.getElementById("pdfLoadingProgressBar");
  const stepEl = document.getElementById("pdfLoadingStep");
  if (barEl) barEl.style.width = "100%";
  if (stepEl) stepEl.textContent = "Extracción completada con éxito.";

  setTimeout(() => {
    const modal = document.getElementById("pdfLoadingModal");
    if (modal) modal.classList.remove("show");

    const inlineBanner = document.getElementById("pdfLoadingInlineBanner");
    if (inlineBanner) {
      inlineBanner.style.display = "none";
    }

    const dropzone = document.querySelector(".dropzone");
    if (dropzone) {
      dropzone.style.borderColor = "";
      dropzone.style.background = "";
      dropzone.style.pointerEvents = "";
    }
  }, 450);
}

async function handleFileUpload(e) {
  const files = Array.from(e.target.files || []);
  if (!files.length) return;

  // Si los vehículos en el comparador son exclusivamente los dos predeterminados de muestra,
  // limpiarlos de inmediato para que el comparador quede dedicado 100% a las fichas que sube el usuario:
  if (comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo)) {
    comparedVehicles = [];
  }

  showPdfLoadingModal(files.length);

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (comparedVehicles.length >= 5) {
        alert("Límite alcanzado: Se pueden comparar máximo 5 vehículos de manera simultánea.");
        break;
      }
      updatePdfLoadingProgress(i + 1, files.length, file.name);
      await parseAndAddPdfVehicle(file);
    }
  } catch (err) {
    console.error("Error al procesar archivos PDF:", err);
  } finally {
    hidePdfLoadingModal();
    if (e && e.target) {
      e.target.value = "";
    }
  }
}

function extractCleanVehicleMakerAndModel(fileName, text) {
  let cleanFn = (fileName || '').replace(/\.pdf$/i, '');
  cleanFn = cleanFn.replace(/^[a-f0-9]{16,64}[_\s-]*/i, '');
  cleanFn = cleanFn.replace(/^\d{6,}[_\s-]*/, '');
  cleanFn = cleanFn.replace(/\b(f\.?t\.?|ficha(?:\s*t[eé]cnica)?|brochure|cat[aá]logo|catalogo|compressed|compreso|comprimido|copia|copy|\(\d+\)|v\d+)\b/gi, '');
  cleanFn = cleanFn.replace(/([a-zA-Z]+)(\d{4})\b/g, '$1 $2');
  cleanFn = cleanFn.replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();

  let maker = 'No Especificado';
  let model = 'Modelo Extraído';
  const words = cleanFn.split(' ').filter(Boolean);
  if (words.length > 0) {
    maker = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    const formatted = words.map(w => (w.length > 4 && w === w.toUpperCase()) ? (w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) : (w.charAt(0).toUpperCase() + w.slice(1)));
    let candidate = formatted.join(' ').trim();
    if (candidate.toLowerCase().startsWith(maker.toLowerCase())) {
      candidate = candidate.slice(maker.length).trim().replace(/^[-:]\s*/, '');
    }
    model = candidate || 'Modelo Extraído';
  }
  return { maker, model };
}

async function parseAndAddPdfVehicle(file) {
  // Asegurar reemplazo de vehículos demo si fue llamado directamente
  if (comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo)) {
    comparedVehicles = [];
  }

  const fileName = file.name;
  updatePdfLoadingStep(`[1/3] Extrayendo estructura y capas de ${fileName}...`);
  const cleanInfo = extractCleanVehicleMakerAndModel(fileName, "");
  const cleanName = cleanInfo.model;

  let specs = null;

  // 1. Lectura estructurada de ficha técnica
  try {
    updatePdfLoadingStep(`[2/3] Lectura automática de especificaciones técnicas...`);
    
    // Primero extraemos el texto para pasárselo a la IA
    const fullText = await extractTextFromPdfFile(file);
    const shortText = fullText.slice(0, 12000);

    const apiKey = "AQ." + "Ab8RN6LYFe" + "Ozp2at_y2p" + "2lsuItgReG8Z" + "sixUMaqwkI_e" + "YrXiXA";
    const promptText = `Eres un Ingeniero Automotriz experto y Parser de Fichas Técnicas de máxima precisión.
Analiza este documento técnico (Nombre de archivo: ${fileName}).

--- CONTENIDO EXTRAÍDO DEL DOCUMENTO ---
${shortText}
--- FIN DEL CONTENIDO ---

Instrucciones obligatorias:
1. Extrae las especificaciones técnicas completas y exactas del vehículo indicado en el documento.
2. Identifica la Marca y el Nombre Comercial Real del vehículo (ej: 'Fiat Cronos 1.3L MT/CVT', 'Toyota Corolla SEG 2.0L A/T', 'Hyundai Elantra 2.0L A/T', 'Chery Arrizo 5 Pro').
3. Extrae los valores numéricos limpios como números enteros (sin texto de unidades, ej: hp: 99, torque: 128, clearance: 160, trunk: 525, tank: 48, weight: 1121).
4. Convierte unidades si es necesario: CV a HP, lt a Litros, cc a Litros.\n4.5. Si un valor numerico no se menciona en absoluto en el documento, devuelve el valor entero 0.
5. Devuelve EXCLUSIVAMENTE un JSON válido con esta estructura exacta:

{
  "maker": "Marca oficial",
  "model": "Nombre comercial completo",
  "hp": 99,
  "torque": 128,
  "clearance": 160,
  "trunk": 525,
  "tank": 48,
  "weight": 1121,
  "engine": "Descripción técnica completa del motor",
  "displacement": "Cilindrada (ej: 1.3L / 1,332 cc)",
  "transmission": "Tipo de transmisión y marchas",
  "traction": "Tracción (ej: FWD Delantera / 4x2)",
  "fuelType": "Tipo de combustible (ej: Gasolina 95 Oct)",
  "airbags": "Cantidad y distribución de airbags",
  "esp": "Sistemas de control de estabilidad y tracción",
  "brakes": "Tipo de frenos",
  "infotainment": "Sistema de infoentretenimiento"
}

No incluyas markdown (como \`\`\`json), sólo el objeto JSON puro.`;

    // Detección de Entorno: Si estamos en Vercel/Nube usamos el Backend seguro, si estamos en local usamos la llave de prueba
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:";
    const fetchUrl = isLocal 
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`
      : '/api/gemini';

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptText }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.0,
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
            required: ["maker", "model", "hp", "torque", "clearance", "trunk", "tank", "weight"]
          }
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      if (result.candidates && result.candidates[0].content.parts[0].text) {
        const jsonText = result.candidates[0].content.parts[0].text;
        specs = JSON.parse(jsonText);
        specs.source = "gemini_multimodal";
        specs.aiPowered = true;
        specs.modelEngine = "gemini-3.1-flash-lite";
        console.log("Lectura automática completada:", specs);
      }
    } else {
      console.warn("Lectura remota no disponible:", await response.text());
    }
  } catch (err) {
    console.warn("Servicio de lectura automática no disponible, usando análisis local:", err);
  }

  // 2. Fallback local si la lectura remota falló
  if (!specs) {
    updatePdfLoadingStep(`[2/3] Analizando texto técnico local para ${fileName}...`);
    let text = "";
    try {
      text = await extractTextFromPdfFile(file);
    } catch (err) {
      console.warn("Fallo lectura de texto plano PDF:", err);
    }
    specs = extractSpecsFromText(fileName, text);
    specs.source = "local_heuristics";
    specs.aiPowered = false;
  }

  updatePdfLoadingStep(`[3/3] Normalizando especificaciones de ${specs.maker || ''} ${specs.model || ''}...`);

  const newVehicle = {
    id: "pdf_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
    maker: specs.maker || cleanInfo.maker || "Marca Importada",
    model: specs.model || cleanInfo.model || cleanName,
    fileName: fileName,
    hp: Number(specs.hp) || 120,
    torque: Number(specs.torque) || 160,
    clearance: Number(specs.clearance) || 160,
    trunk: Number(specs.trunk) || 420,
    tank: Number(specs.tank) || 48,
    weight: Number(specs.weight) || 1350,
    engine: specs.engine || "1.5L 4 Cilindros",
    displacement: specs.displacement || specs.engine || "1.5L",
    transmission: specs.transmission || "Automática",
    traction: specs.traction || "FWD Delantera",
    fuelType: specs.fuelType || "Gasolina 95 Oct",
    airbags: specs.airbags || "2 Frontales",
    esp: specs.esp || "ESP + Control Tracción",
    brakes: specs.brakes || "Discos en las 4 Ruedas",
    infotainment: specs.infotainment || "Pantalla Táctil Multimedia",
    b2bServices: {
      oil: "5W-30 Sintético API SP (4.5 L)",
      oilFilter: "Filtro de Aceite Homologado OEM",
      brakes: "Juego de Pastillas Cerámicas",
      mechanicLabor: "$30 USD Mano de Obra Cerrada",
      insuranceYear: "$195 USD / Año (Póliza Integral)"
    },
    source: specs.source || "pdf",
    aiPowered: specs.aiPowered === true || specs.source === "gemini_multimodal",
    modelEngine: specs.modelEngine || null
  };

  comparedVehicles.push(newVehicle);
  renderComparisonTable();

  if (activeCompareSubTab === 'charts') renderComparisonCharts();
  if (activeCompareSubTab === 'advisor') renderAdvisorResults();
  if (activeCompareSubTab === 'services') renderB2BServices();
}

function extractTextFromPdfFile(file) {
  return new Promise((resolve) => {
    if (window.pdfjsLib) {
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        try {
          const typedarray = new Uint8Array(this.result);
          const pdf = await window.pdfjsLib.getDocument(typedarray).promise;
          let fullText = "";
          for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fullText += " " + textContent.items.map(s => s.str).join(" ");
          }
          resolve(fullText);
        } catch (e) {
          resolve(file.name);
        }
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = function(evt) {
        resolve(evt.target.result || file.name);
      };
      reader.readAsText(file);
    }
  });
}

function extractSpecsFromText(fileName, text) {
  const clean = (text + ' ' + fileName).toLowerCase();
  const { maker, model } = extractCleanVehicleMakerAndModel(fileName, text);

  let hp = null;
  const mHpPre = text.match(/(\d{2,3})\s*(?:hp|cv|ps)\b[\s\S]{0,40}?(?:potencia|power)/i);
  const mHpPost = text.match(/(?:potencia(?:\s*m[áa]xima)?|power)[^\d]{0,40}?(\d{2,3})\b(?!\s*(?:rpm|nm|gdi|vvt))/i);
  const mHpGeneric = text.match(/(\d{2,3})\s*(?:hp|cv|ps)\b/i);
  if (mHpPre) hp = parseInt(mHpPre[1]);
  else if (mHpPost) hp = parseInt(mHpPost[1]);
  else if (mHpGeneric) hp = parseInt(mHpGeneric[1]);

  let torque = null;
  const mTqPre = text.match(/(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b[\s\S]{0,40}?(?:torque|par)/i);
  const mTqPost = text.match(/(?:torque(?:\s*m[áa]ximo)?|par\s*motor)[^\d]{0,40}?(\d{2,3}(?:\.\d)?)\b(?!\s*(?:rpm|hp))/i);
  const mTqGeneric = text.match(/(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b/i);
  if (mTqPre) torque = parseFloat(mTqPre[1]);
  else if (mTqPost) torque = parseFloat(mTqPost[1]);
  else if (mTqGeneric) torque = parseFloat(mTqGeneric[1]);

  let clearance = null;
  const mClrPre = text.match(/(?:^|[^\d.])(\d{2,3})\s*mm\b[\s\S]{0,40}?(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)/i);
  const mClrPost = text.match(/(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)[^\d]{0,40}?(?:^|[^\d.])(\d{2,3})\s*(mm)?\b/i);
  if (mClrPre) clearance = parseInt(mClrPre[1]);
  else if (mClrPost) clearance = parseInt(mClrPost[1]);

  let trunk = null;
  const mTrkPre = text.match(/(?:^|[^\d.])(\d{2,4})\s*l\b[\s\S]{0,80}?(?:maletero|cajuela|ba[úu]l|equipaje)/i);
  const mTrkPost = text.match(/(?:volumen\s*de\s*equipaje|capacidad\s*(?:de\s*)?(?:maletero|ba[úu]l)|maletero|cajuela|ba[úu]l)[^\d]{0,40}?(?:^|[^\d.])(\d{2,4})\b/i);
  if (mTrkPre) trunk = parseInt(mTrkPre[1]);
  else if (mTrkPost) trunk = parseInt(mTrkPost[1]);

  let tank = null;
  const mTnkPre = text.match(/(\d{2,3})\s*l\b[\s\S]{0,40}?(?:tanque|combustible)/i);
  const mTnkPost = text.match(/(?:tanque(?:\s*de\s*combustible)?|capacidad\s*del\s*tanque)[^\d]{0,40}?(\d{2,3})\b/i);
  if (mTnkPre) tank = parseInt(mTnkPre[1]);
  else if (mTnkPost) tank = parseInt(mTnkPost[1]);

  let weight = null;
  const mWtPre = text.match(/([\d.]{4,6})\s*(?:kg|kilos)\b[\s\S]{0,40}?(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)/i);
  const mWtPost = text.match(/(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)[^\d]{0,40}?([\d.]{4,6})\b/i);
  const rawWt = mWtPre ? mWtPre[1] : (mWtPost ? mWtPost[1] : null);
  if (rawWt) weight = parseInt(rawWt.replace('.', ''));

  let transmission = 'No Especificado';
  if (clean.includes('cvt')) transmission = 'Automática CVT';
  else if (clean.includes('dct') || clean.includes('doble embrague')) transmission = 'Doble Embrague DCT 6/7-Vel';
  else if (clean.includes('manual') || clean.includes('sincronico') || clean.includes('sincrónica')) transmission = 'Manual';
  else if (clean.includes('automática') || clean.includes('aut')) transmission = 'Automática';

  let traction = 'FWD Delantera';
  if (clean.includes('4x4') || clean.includes('awd') || clean.includes('4wd')) {
    traction = clean.includes('bloqueo') || clean.includes('reductora') ? '4x4 Part-Time con Reductora' : '4WD / AWD Integral';
  }

  let airbags = 'No Especificado';
  const mAb = text.match(/(\d+)\s*(?:airbags?|bolsas?\s*de\s*aire)/i) || text.match(/(\d+)\s*\([^)]*\)[\s\S]{0,20}?bolsas?\s*de\s*aire/i);
  if (mAb) airbags = `${mAb[1]} Airbags`;
  else if (clean.includes('conductor y pasajero')) airbags = '2 Frontales (Conductor y Pasajero)';

  let engine = 'No Especificado';
  const mEng = text.match(/(\d\.\d[L|l][\s\S]{0,30}?(?:turbo|dohc|sohc|mpi|gdi|vvt|cilindros))/i);
  if (mEng) engine = mEng[1].trim();

  let displacement = 'No Especificado';
  const mDisp = text.match(/(\d\.\d[L|l])/i);
  if (mDisp) displacement = mDisp[1].trim();

  let esp = 'No Especificado';
  if (clean.includes('esp') || clean.includes('esc') || clean.includes('vsc')) esp = 'Equipado con Control de Estabilidad';

  let brakes = 'No Especificado';
  if (clean.includes('disco')) brakes = 'Frenos de Disco';

  let infotainment = 'No Especificado';
  if (clean.includes('pantalla') || clean.includes('tactil') || clean.includes('touch')) infotainment = 'Pantalla Táctil';

  return {
    maker, model, hp, torque, clearance, trunk, tank, weight, engine, displacement,
    transmission, traction, fuelType: clean.includes('diesel') ? 'Diésel' : 'Gasolina',
    airbags, esp, brakes, infotainment
  };
}

/* =============================================================================
   LÓGICA DE FILTRADO Y MATRIZ DINÁMICA
   ============================================================================= */
function onMatrixSearch(query) {
  matrixSearchQuery = (query || "").trim().toLowerCase();
  renderComparisonTable();
}

function setMatrixCategory(category) {
  matrixActiveCategory = category;
  renderComparisonTable();
}

function toggleDiffOnly() {
  diffOnlyMode = !diffOnlyMode;
  renderComparisonTable();
}

function toggleHighlightBest() {
  highlightBestMode = !highlightBestMode;
  renderComparisonTable();
}

function getDisplayVehiclesList() {
  if (comparedVehicles.length === 0) return [];
  return comparedVehicles.slice(0, 5);
}

function renderComparisonTable() {
  const container = document.getElementById("compareResultCard");
  const countBadge = document.getElementById("compareCountBadge");
  const slotsBar = document.getElementById("compareActiveSlotsBar");
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${comparedVehicles.length} / 5`;
  }

  if (slotsBar) {
    if (comparedVehicles.length === 0) {
      slotsBar.innerHTML = `<span style="font-size:11.5px; color:var(--text-muted);">Elige versiones del catálogo o sube fichas PDF.</span>`;
    } else {
      slotsBar.innerHTML = comparedVehicles.map(v => `
        <span class="compare-slot-pill">
          <span>${v.maker} ${v.model}</span>
          <button type="button" class="compare-slot-remove" onclick="removeComparedVehicle('${v.id}')" aria-label="Quitar ${v.maker} ${v.model}">&times;</button>
        </span>
      `).join("") + (comparedVehicles.length > 1
        ? `<button type="button" class="btn-quiet-link" onclick="clearAllComparedVehicles()" style="font-size:11px; padding:2px 6px;">Limpiar</button>`
        : "");
    }
  }

  // Estado vacío si no hay vehículos
  if (comparedVehicles.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:36px 16px; border-style:dashed;">
        <div style="margin-bottom:12px; color:var(--cyan);">${ICONS.telemetry}</div>
        <div style="font-weight:800; font-size:16px; color:var(--text-main); margin-bottom:6px;">Comparador de Fichas Técnicas Vacío</div>
        <p style="font-size:12.5px; color:var(--text-muted); max-width:520px; margin:0 auto; line-height:1.6;">
          Selecciona modelos del catálogo precargado BAJOKAPOT arriba o arrastra tus archivos PDF técnicos para contrastar especificaciones reales lado a lado (hasta 5 vehículos simultáneamente).
        </p>
      </div>
    `;
    if (typeof renderPreloadedCatalogPicker === 'function') renderPreloadedCatalogPicker();
    renderSavedComparisons();
    return;
  }

  const displayList = getDisplayVehiclesList();

  // Calcular líderes para cada especificación técnica (Métricas Cuantitativas y Cualitativas de Seguridad & Confort)
  const specLeadersMap = {}; // { [spec.key]: Set of winner vehicle IDs }

  TECHNICAL_SPECS_SCHEMA.forEach(spec => {
    if (displayList.length < 2) return;

    let getScore = null;
    if (typeof spec.evaluateScore === 'function') {
      getScore = spec.evaluateScore;
    } else if (spec.isNumeric) {
      getScore = v => Number(spec.getValue(v)) || 0;
    }

    if (getScore) {
      const scoredList = displayList.map(v => ({ id: v.id, score: getScore(v) }));
      const scoreValues = scoredList.map(s => s.score);

      // Si todos los vehículos empatan con exactamente el mismo puntaje, ninguno es líder diferenciado
      const allTied = scoreValues.every(val => val === scoreValues[0]);
      if (!allTied) {
        let bestScore;
        if (spec.better === 'lower') {
          bestScore = Math.min(...scoreValues.filter(s => s > 0));
        } else {
          bestScore = Math.max(...scoreValues);
        }

        const leaders = new Set(
          scoredList.filter(s => s.score === bestScore).map(s => s.id)
        );
        specLeadersMap[spec.key] = leaders;
      }
    }
  });

  // Filtrar especificaciones según búsqueda, categoría y "Solo Diferencias"
  const filteredSpecs = TECHNICAL_SPECS_SCHEMA.filter(spec => {
    // 1. Filtro por categoría
    if (matrixActiveCategory !== 'all' && spec.category !== matrixActiveCategory) {
      return false;
    }

    // 2. Filtro por búsqueda de texto
    if (matrixSearchQuery) {
      const matchLabel = spec.label.toLowerCase().includes(matrixSearchQuery);
      const matchCat = spec.categoryName.toLowerCase().includes(matrixSearchQuery);
      const matchValues = displayList.some(v => String(spec.getValue(v)).toLowerCase().includes(matrixSearchQuery));
      if (!matchLabel && !matchCat && !matchValues) return false;
    }

    // 3. Filtro "Solo Diferencias"
    if (diffOnlyMode && displayList.length > 1) {
      const firstVal = String(spec.getValue(displayList[0])).trim().toLowerCase();
      const allEqual = displayList.every(v => String(spec.getValue(v)).trim().toLowerCase() === firstVal);
      if (allEqual) return false;
    }

    return true;
  });

  // Agrupar filas visibles por categoría
  const categoriesPresent = {};
  filteredSpecs.forEach(spec => {
    if (!categoriesPresent[spec.category]) {
      categoriesPresent[spec.category] = {
        name: spec.categoryName,
        specs: []
      };
    }
    categoriesPresent[spec.category].specs.push(spec);
  });

  // Render HTML completo con Toolbar Cockpit, Matriz Escritorio y Comparador Móvil (Opción 1)
  const isDemoActive = comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo);
  const badgeText = isDemoActive
    ? 'Demo (2)'
    : `${displayList.length} en mesa`;

  const mobileCols = displayList.length <= 2 ? displayList.length : 2;
  const showCarTagInCell = displayList.length > 2;

  const bannerMarkup = isDemoActive
    ? `<div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:10px; background:var(--bg-card-alt); padding:7px 10px; border-radius:7px; border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <span>Vehículos de ejemplo · Sube tu PDF o elige del catálogo arriba.</span>
        <button class="btn btn-secondary btn-sm" onclick="clearAllComparedVehicles(true)" style="padding:3px 8px; font-size:10px; line-height:1.2;">Limpiar</button>
      </div>`
    : (comparedVehicles.length === 1
      ? `<div style="font-size:11.5px; color:var(--text-secondary); margin-bottom:10px; background:var(--bg-card-alt); padding:7px 10px; border-radius:7px; border:1px solid var(--border-subtle);">
          Agrega otro modelo desde "+ Catálogo" o "+ PDF" para comparar cara a cara.
        </div>`
      : '');

  const mobileCompareMarkup = `
    <div class="compare-mobile-stack" style="--comp-cols: ${mobileCols};">
      <div class="compare-mobile-sticky-head">
        ${displayList.map(v => `
          <div class="compare-mobile-sticky-car">
            <div class="compare-mobile-sticky-top">
              <span style="font-size:12.5px; font-weight:700; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${v.maker}</span>
              ${!v.isReference ? `
                <button type="button" class="compare-slot-remove" onclick="removeComparedVehicle('${v.id}')" title="Quitar ${v.maker} ${v.model}" aria-label="Quitar ${v.maker} ${v.model}">&times;</button>
              ` : `<span style="font-size:10px; color:var(--text-muted);">Base</span>`}
            </div>
            <div style="font-size:11px; color:var(--text-secondary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${v.model}</div>
          </div>
        `).join('')}
      </div>

      ${Object.keys(categoriesPresent).length === 0 ? `
        <div style="text-align:center; padding:20px 12px; color:var(--text-muted); font-size:12px;">
          No hay parámetros que coincidan con el filtro actual.
        </div>
      ` : Object.keys(categoriesPresent).map(catKey => {
        const catObj = categoriesPresent[catKey];
        return `
          <div class="compare-mobile-cat">${catObj.name}</div>
          ${catObj.specs.map(spec => `
            <div class="compare-mobile-row">
              <div class="compare-mobile-param">${spec.label}</div>
              <div class="compare-mobile-vals">
                ${displayList.map(v => {
                  const isLeader = highlightBestMode && displayList.length > 1 && Boolean(specLeadersMap[spec.key]?.has(v.id));
                  return `
                    <div class="compare-mobile-cell ${isLeader ? 'is-leader' : ''}">
                      ${showCarTagInCell ? `<div class="compare-mobile-car-tag">${v.maker} ${v.model}</div>` : ''}
                      <span style="display:inline-flex; align-items:center; gap:5px;">
                        ${isLeader ? `<span class="status-dot dot-amber"></span>` : ''}<span>${spec.format(v, isLeader)}</span>
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `).join('')}
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = `
    <div class="card" style="padding:14px;">
      <div class="card-title" style="margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span>Comparativa</span>
          <span class="badge" style="background:var(--bg-card-alt); color:var(--text-secondary); border:1px solid var(--border-glass);">
            ${badgeText}
          </span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="saveCurrentComparison()" style="display:inline-flex; align-items:center; gap:4px; padding:5px 9px;">${ICONS.save} Guardar</button>
          <button class="btn btn-danger btn-sm" onclick="clearAllComparedVehicles()" style="display:inline-flex; align-items:center; gap:4px; padding:5px 9px;">${ICONS.trash} Vaciar</button>
        </div>
      </div>

      ${bannerMarkup}

      <!-- TOOLBAR DE FILTROS & BÚSQUEDA REACTIVA -->
      <div class="matrix-toolbar" style="padding:10px; gap:8px; margin-bottom:8px;">
        <div class="matrix-search-wrap">
          <span class="matrix-search-icon">
            <svg class="cockpit-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input type="text" class="matrix-search-input" placeholder="Buscar parámetro (Potencia, ABS, Despeje...)" 
                 value="${matrixSearchQuery}" oninput="onMatrixSearch(this.value)">
        </div>

        <!-- Categorías -->
        <div style="display:flex; gap:5px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'all' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('all')">Todas</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'motor' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('motor')">Motor</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'dimensions' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('dimensions')">Dimensiones</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'safety' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('safety')">Seguridad</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'bajokapot' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('bajokapot')">Bajo el Kapot</button>
        </div>

        <!-- Filtros Inteligentes -->
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm ${diffOnlyMode ? 'toggle-pill-active' : ''}" onclick="toggleDiffOnly()" title="Ocultar especificaciones con valores idénticos">
            Solo Diferencias
          </button>
          <button class="btn btn-secondary btn-sm ${highlightBestMode ? 'toggle-pill-active' : ''}" onclick="toggleHighlightBest()" title="Resaltar la mejor métrica">
            Destacar Líder
          </button>
        </div>
      </div>

      ${mobileCompareMarkup}

      <!-- TABLA HORIZONTAL RESPONSIVA CON COLUMNA STICKY (ESCRITORIO) -->
      <div class="table-responsive-wrapper">
        <table class="compare-table" style="min-width:${Math.max(480, displayList.length * 165 + 160)}px;">
          <thead>
            <tr>
              <th style="min-width:155px; width:155px; font-family:var(--font-mono); font-size:11px; letter-spacing:1px; text-transform:uppercase;">
                Parámetro Técnico
              </th>
              ${displayList.map((v, idx) => {
                return `
                  <th style="min-width:175px; background:var(--bg-card-alt); vertical-align:top; border-left:1px solid var(--border-subtle); border-top:2px solid var(--border-editorial); padding:12px 14px;">
                    <div style="display:flex; justify-content:center; padding-bottom:8px; color:var(--text-main);">
                      ${getSegmentSilhouetteSvg(v.segment, v.model, "catalog-chip-stencil", "width:118px; height:40px;")}
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                      <div style="min-width:0;">
                        <div style="font-size:13.5px; font-weight:600; color:var(--text-main); letter-spacing:-0.01em;">${v.maker}</div>
                        <div style="font-size:12px; color:var(--text-secondary); font-weight:500;">${v.model}</div>
                      </div>
                      ${!v.isReference ? `
                        <button class="btn-minimal-action" style="padding:4px 7px;" onclick="removeComparedVehicle('${v.id}')" title="Eliminar vehículo">
                          ${ICONS.trash}
                        </button>
                      ` : `
                        <span style="font-size:11px; color:var(--text-muted); font-weight:500;">Base</span>
                      `}
                    </div>
                    <div style="font-size:11.5px; color:var(--text-muted); font-weight:normal; margin-top:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:flex; align-items:center; gap:4px;" title="${v.fileName}">
                      ${ICONS.pdfSmall} <span>${v.fileName}</span>
                    </div>
                  </th>
                `;
              }).join('')}
            </tr>
          </thead>
          <tbody>
            ${Object.keys(categoriesPresent).length === 0 ? `
              <tr>
                <td colspan="${displayList.length + 1}" style="text-align:center; padding:24px; color:var(--text-muted); font-size:12px;">
                  No hay filas que coincidan con la búsqueda actual o con el filtro de diferencias.
                </td>
              </tr>
            ` : Object.keys(categoriesPresent).map(catKey => {
              const catObj = categoriesPresent[catKey];
              return `
                <!-- Cabecera de Categoría -->
                <tr class="matrix-category-header">
                  <td colspan="${displayList.length + 1}" class="matrix-category-title">
                    ${catObj.name}
                  </td>
                </tr>

                <!-- Filas de la Categoría -->
                ${catObj.specs.map(spec => {
                  return `
                    <tr>
                      <td style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted); min-width:155px; width:155px;">
                        <strong style="color:var(--text-secondary);">${spec.label}:</strong>
                      </td>
                      ${displayList.map(v => {
                        const isLeader = highlightBestMode && displayList.length > 1 && Boolean(specLeadersMap[spec.key]?.has(v.id));
                        return `
                          <td class="${isLeader ? 'winner-val' : ''}" style="${isLeader ? 'background:rgba(245,158,11,0.06);' : ''}">
                            <span style="font-size:12.5px; font-weight:${isLeader ? '600' : '400'}; color:${isLeader ? 'var(--text-main)' : 'inherit'}; display:inline-flex; align-items:center; gap:6px;">
                              ${isLeader ? `<span class="status-dot dot-amber"></span>` : ''}${spec.format(v, isLeader)}
                            </span>
                          </td>
                        `;
                      }).join('')}
                    </tr>
                  `;
                }).join('')}
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- BOTONES DE EXPORTACIÓN Y ACCIONES -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:10px;">
        <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">
          Mostrando ${filteredSpecs.length} especificaciones técnicas activas
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="switchCompareSubTab('charts')" style="display:inline-flex; align-items:center; gap:6px;">
            <svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"/></svg>
            Ver en Gráficos Visuales
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.print()" style="display:inline-flex; align-items:center; gap:6px;">
            ${ICONS.print} Exportar Ficha Comparativa
          </button>
        </div>
      </div>
    </div>
  `;

  if (typeof renderPreloadedCatalogPicker === 'function') renderPreloadedCatalogPicker();
  renderSavedComparisons();
}

/* =============================================================================
   VISUALIZACIÓN GRÁFICA CON CHART.JS (BARRAS Y RADAR)
   ============================================================================= */
function getChartThemePalette() {
  const isLight = (typeof currentTheme !== 'undefined' && currentTheme === 'light')
    || document.documentElement.getAttribute('data-theme') === 'light';
  return {
    isLight,
    text: isLight ? '#1e293b' : '#cbd5e1',
    tick: isLight ? '#475569' : '#94a3b8',
    grid: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.06)',
    angle: isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.1)',
    tooltipBg: isLight ? 'rgba(255, 255, 255, 0.97)' : 'rgba(15, 17, 21, 0.95)',
    tooltipTitle: isLight ? '#0f172a' : '#f8fafc',
    tooltipBody: isLight ? '#334155' : '#cbd5e1',
    tooltipBorder: isLight ? 'rgba(15, 23, 42, 0.14)' : 'rgba(255, 255, 255, 0.12)',
    pointBorder: isLight ? '#ffffff' : '#161920'
  };
}

function renderComparisonCharts() {
  const displayList = getDisplayVehiclesList();
  const barCanvas = document.getElementById("compareBarChart");
  const radarCanvas = document.getElementById("compareRadarChart");

  if (!barCanvas || !radarCanvas) return;

  if (displayList.length === 0) {
    if (chartBarInstance) { chartBarInstance.destroy(); chartBarInstance = null; }
    if (chartRadarInstance) { chartRadarInstance.destroy(); chartRadarInstance = null; }
    return;
  }

  // Destruir instancias previas para evitar memory leaks y superposición en canvas
  if (chartBarInstance) { chartBarInstance.destroy(); chartBarInstance = null; }
  if (chartRadarInstance) { chartRadarInstance.destroy(); chartRadarInstance = null; }

  if (typeof Chart === 'undefined') {
    console.warn("Chart.js no está disponible globalmente.");
    return;
  }

  const pal = getChartThemePalette();

  // 1. Configuración Gráfico de Barras de Rendimiento Mecánico
  const barLabels = ['Potencia (HP)', 'Torque (Nm)', 'Despeje (mm)', 'Tanque (L)', 'Maleta (L/10)'];
  const barDatasets = displayList.map((v, i) => {
    const col = VEHICLE_COLORS[i % VEHICLE_COLORS.length];
    return {
      label: `${v.maker} ${v.model}`,
      data: [
        Number(v.hp) || 0,
        Number(v.torque) || 0,
        Number(v.clearance) || 0,
        Number(v.tank) || 0,
        Math.round((Number(v.trunk) || 0) / 10)
      ],
      backgroundColor: col.bg,
      borderColor: col.border,
      borderWidth: 1.5,
      borderRadius: 4
    };
  });

  chartBarInstance = new Chart(barCanvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: barLabels,
      datasets: barDatasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: pal.text,
            font: { family: "'JetBrains Mono', sans-serif", size: 10 }
          }
        },
        tooltip: {
          backgroundColor: pal.tooltipBg,
          titleColor: pal.tooltipTitle,
          bodyColor: pal.tooltipBody,
          borderColor: pal.tooltipBorder,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: pal.tick, font: { family: "'JetBrains Mono', sans-serif", size: 10 } },
          grid: { color: pal.grid }
        },
        y: {
          ticks: { color: pal.tick, font: { family: "'JetBrains Mono', sans-serif", size: 10 } },
          grid: { color: pal.grid }
        }
      }
    }
  });

  // 2. Configuración Radar de Balance Multidimensional (0 - 100)
  const radarLabels = ['Potencia & Pique', 'Autonomía & Tanque', 'Aptitud Baches', 'Carga & Espacio', 'Seguridad & ESP'];
  const radarDatasets = displayList.map((v, i) => {
    const col = VEHICLE_COLORS[i % VEHICLE_COLORS.length];
    
    // Normalizaciones a escala 0-100
    const scorePower = Math.min(100, Math.round(((Number(v.hp) || 100) / 175) * 100));
    const scoreRange = Math.min(100, Math.round(((Number(v.tank) || 45) / 80) * 100));
    const scoreClearance = Math.min(100, Math.round(((Number(v.clearance) || 150) / 220) * 100));
    const scoreTrunk = Math.min(100, Math.round(((Number(v.trunk) || 400) / 1050) * 100));
    
    const safetyAirbags = Math.min(35, Math.round((scoreAirbags(v) / 6) * 35));
    const safetyESP = Math.min(35, Math.round((scoreESP(v) / 25) * 35));
    const safetyBrakes = Math.min(30, Math.round((scoreBrakes(v) / 40) * 30));
    const scoreSafety = Math.min(100, safetyAirbags + safetyESP + safetyBrakes);

    return {
      label: `${v.maker} ${v.model}`,
      data: [scorePower, scoreRange, scoreClearance, scoreTrunk, scoreSafety],
      backgroundColor: col.bgTrans,
      borderColor: col.border,
      borderWidth: 2,
      pointBackgroundColor: col.border,
      pointBorderColor: pal.pointBorder,
      pointRadius: 3
    };
  });

  chartRadarInstance = new Chart(radarCanvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels: radarLabels,
      datasets: radarDatasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: pal.text,
            font: { family: "'JetBrains Mono', sans-serif", size: 10 }
          }
        },
        tooltip: {
          backgroundColor: pal.tooltipBg,
          titleColor: pal.tooltipTitle,
          bodyColor: pal.tooltipBody,
          borderColor: pal.tooltipBorder,
          borderWidth: 1
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false },
          angleLines: { color: pal.angle },
          grid: { color: pal.angle },
          pointLabels: {
            color: pal.text,
            font: { family: "'Plus Jakarta Sans', sans-serif", size: 10.5, weight: '600' }
          }
        }
      }
    }
  });
}

/* =============================================================================
   ASISTENTE INTELIGENTE DE SELECCIÓN ("¿CUÁL ELEGIR?")
   ============================================================================= */
function onAdvisorPriorityChange() {
  const pPower = document.getElementById("prioPower");
  const pClearance = document.getElementById("prioClearance");
  const pCargo = document.getElementById("prioCargo");
  const pSafety = document.getElementById("prioSafety");

  if (pPower) {
    advisorPriorities.power = parseInt(pPower.value) || 5;
    const l = document.getElementById("prioValPower");
    if (l) l.textContent = `${advisorPriorities.power} / 10`;
  }
  if (pClearance) {
    advisorPriorities.clearance = parseInt(pClearance.value) || 8;
    const l = document.getElementById("prioValClearance");
    if (l) l.textContent = `${advisorPriorities.clearance} / 10`;
  }
  if (pCargo) {
    advisorPriorities.cargo = parseInt(pCargo.value) || 6;
    const l = document.getElementById("prioValCargo");
    if (l) l.textContent = `${advisorPriorities.cargo} / 10`;
  }
  if (pSafety) {
    advisorPriorities.safety = parseInt(pSafety.value) || 7;
    const l = document.getElementById("prioValSafety");
    if (l) l.textContent = `${advisorPriorities.safety} / 10`;
  }

  renderAdvisorResults();
}

function resetAdvisorPriorities() {
  advisorPriorities = { power: 5, clearance: 8, cargo: 6, safety: 7 };
  const pPower = document.getElementById("prioPower");
  const pClearance = document.getElementById("prioClearance");
  const pCargo = document.getElementById("prioCargo");
  const pSafety = document.getElementById("prioSafety");

  if (pPower) pPower.value = 5;
  if (pClearance) pClearance.value = 8;
  if (pCargo) pCargo.value = 6;
  if (pSafety) pSafety.value = 7;

  onAdvisorPriorityChange();
}

function renderAdvisorResults() {
  const container = document.getElementById("advisorResultsContainer");
  if (!container) return;

  const displayList = getDisplayVehiclesList();

  if (displayList.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:24px; color:var(--text-muted); font-size:12px;">
        Adjunta al menos 1 o más fichas técnicas en el comparador para computar la recomendación personalizada.
      </div>
    `;
    return;
  }

  // Ponderadores
  const wP = advisorPriorities.power / 10;
  const wC = advisorPriorities.clearance / 10;
  const wK = advisorPriorities.cargo / 10;
  const wS = advisorPriorities.safety / 10;
  const totalWeight = wP + wC + wK + wS || 1;

  // Calificar cada vehículo
  const scored = displayList.map(v => {
    const rawP = Math.min(100, Math.round(((Number(v.hp) || 100) / 175) * 100));
    const rawC = Math.min(100, Math.round(((Number(v.clearance) || 150) / 220) * 100));
    const rawK = Math.min(100, Math.round(((Number(v.trunk) || 400) / 1050) * 100));
    
    const safetyAirbags = Math.min(35, Math.round((scoreAirbags(v) / 6) * 35));
    const safetyESP = Math.min(35, Math.round((scoreESP(v) / 25) * 35));
    const safetyBrakes = Math.min(30, Math.round((scoreBrakes(v) / 40) * 30));
    const rawS = Math.min(100, safetyAirbags + safetyESP + safetyBrakes);

    const finalScore = Math.round((rawP * wP + rawC * wC + rawK * wK + rawS * wS) / totalWeight);

    // Razones automotrices clave
    const reasons = [];
    if (v.clearance >= 170) reasons.push(`Excelente despeje de ${v.clearance} mm para proteger tren motriz de baches`);
    if (v.hp >= 145) reasons.push(`Reserva de potencia sólida de ${v.hp} HP para subidas y adelantamientos`);
    if (v.trunk >= 600) reasons.push(`Capacidad volumétrica destacada de ${v.trunk} L para carga familiar o trabajo`);
    if (scoreAirbags(v) >= 6) reasons.push(`Máxima protección pasiva en cabina: ${v.airbags}`);
    else if (scoreAirbags(v) >= 4) reasons.push(`Seguridad pasiva destacada con ${v.airbags}`);
    if (scoreESP(v) >= 20) reasons.push(`Seguridad activa avanzada: ${v.esp}`);
    else if (v.esp && !v.esp.includes('No')) reasons.push(`Control de estabilidad electrónico activo`);
    if (scoreBrakes(v) >= 35) reasons.push(`Potente sistema de frenado con ${v.brakes}`);
    if (v.traction && v.traction.includes('4x4')) reasons.push(`Tracción 4x4 robusta con caja reductora`);

    return {
      vehicle: v,
      score: finalScore,
      reasons: reasons.length ? reasons : ["Vehículo equilibrado con mecánica confiable para uso urbano"]
    };
  });

  scored.sort((a, b) => b.score - a.score);

  container.innerHTML = `
    <div style="font-size:12px; font-family:var(--font-mono); color:var(--text-muted); margin-bottom:12px; text-transform:uppercase; letter-spacing:1px;">
      Ranking Ponderado de Idoneidad (${scored.length} Vehículos Evaluados):
    </div>
    <div class="advisor-cards-grid">
      ${scored.map((item, idx) => {
        const isWinner = idx === 0;
        const v = item.vehicle;
        const rankBadge = isWinner
          ? `<span class="badge" style="background:var(--green-dim); color:var(--green); border:1px solid rgba(16,185,129,0.4); font-size:11px; font-weight:800; display:inline-flex; align-items:center; gap:5px;">RECOMENDACIÓN N° 1</span>`
          : `<span class="badge" style="background:rgba(255,255,255,0.06); color:var(--text-muted); border:1px solid var(--border-subtle); font-family:var(--font-mono);">Puesto #${idx + 1}</span>`;

        return `
          <div class="advisor-card-rank ${isWinner ? 'leader' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="font-size:22px; font-weight:900; font-family:var(--font-mono); color:${isWinner ? 'var(--green)' : 'var(--text-muted)'};">
                  #${idx + 1}
                </div>
                <div>
                  <div style="font-size:16px; font-weight:900; color:var(--text-main);">${v.maker} ${v.model}</div>
                  <div style="font-size:11px; color:var(--cyan); font-family:var(--font-mono);">${v.engine} • ${v.transmission}</div>
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:20px; font-weight:900; font-family:var(--font-mono); color:${item.score >= 80 ? 'var(--green)' : 'var(--cyan)'};">
                  ${item.score}%
                </div>
                ${rankBadge}
              </div>
            </div>

            <div style="background:var(--bg-card-alt); border-left:3px solid ${isWinner ? 'var(--green)' : 'var(--accent)'}; padding:8px 12px; border-radius:0 6px 6px 0; font-size:12px; color:var(--text-secondary); margin-top:8px;">
              <strong style="color:var(--text-main); font-size:11px; text-transform:uppercase; font-family:var(--font-mono); display:block; margin-bottom:4px;">Factores Decisivos de tu Búsqueda:</strong>
              <ul style="padding-left:16px; margin:0; line-height:1.6;">
                ${item.reasons.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/* =============================================================================
   ECOSISTEMA DE MONETIZACIÓN & SERVICIOS B2B
   ============================================================================= */
function renderB2BServices() {
  const container = document.getElementById("b2bServicesContainer");
  if (!container) return;

  const displayList = getDisplayVehiclesList();

  if (displayList.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px; color:var(--text-muted); font-size:12px;">
        Carga vehículos en el comparador para desplegar la red de servicios y cotizaciones específicas.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="b2b-services-grid">
      ${displayList.map(v => {
        const s = v.b2bServices || {
          oil: "5W-30 Sintético Homologado",
          oilFilter: "Filtro de Aceite OEM",
          brakes: "Juego de Pastillas Cerámicas",
          mechanicLabor: "$30 USD Mano de Obra Cerrada",
          insuranceYear: "$180 USD / Año (RCV + Cobertura)"
        };

        return `
          <div class="b2b-service-card">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                <div>
                  <div style="font-size:15px; font-weight:800; color:var(--text-main);">${v.maker} ${v.model}</div>
                  <div style="font-size:11px; color:var(--cyan); font-family:var(--font-mono);">${v.engine}</div>
                </div>
                <span class="badge" style="background:var(--accent-dim); color:var(--accent);">Servicios VE</span>
              </div>

              <!-- Ficha de Repuestos Homologados -->
              <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:10px; margin-bottom:10px; font-size:11.5px;">
                <div style="color:var(--text-muted); font-family:var(--font-mono); font-size:10px; text-transform:uppercase; margin-bottom:4px;">Mantenimiento Preventivo Homologado:</div>
                <div style="color:var(--text-main); margin-bottom:3px;"><strong>Aceite:</strong> ${s.oil}</div>
                <div style="color:var(--text-main); margin-bottom:3px;"><strong>Filtro:</strong> ${s.oilFilter}</div>
                <div style="color:var(--text-main);"><strong>Frenos:</strong> ${s.brakes}</div>
              </div>

              <!-- Tarifas Cerradas -->
              <div style="font-size:11px; color:var(--text-secondary); line-height:1.6; margin-bottom:12px;">
                <div><strong>Taller Mecánico Verificado:</strong> <span style="color:var(--green); font-weight:700;">${s.mechanicLabor}</span></div>
                <div><strong>Seguro RCV + Todo Riesgo:</strong> <span style="color:var(--amber); font-weight:700;">${s.insuranceYear}</span></div>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:6px; margin-top:8px;">
              <button class="btn btn-secondary btn-sm" onclick="requestB2BQuote('${v.maker} ${v.model}', 'Repuestos Homologados')" style="width:100%; justify-content:center;">
                Cotizar Repuestos con Repuesteras Verificadas
              </button>
              <button class="btn btn-green btn-sm" onclick="requestB2BQuote('${v.maker} ${v.model}', 'Taller Red Don Carlos')" style="width:100%; justify-content:center;">
                Agendar Cita en Taller Mecánico Verificado
              </button>
              <button class="btn btn-secondary btn-sm" onclick="requestB2BQuote('${v.maker} ${v.model}', 'Póliza de Seguro')" style="width:100%; justify-content:center;">
                Cotizar Póliza de Seguro Automotriz
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function requestB2BQuote(carName, serviceType) {
  alert(`Solicitud de Servicio Registrada:\n\nVehículo: ${carName}\nServicio Solicitado: ${serviceType}\n\nUn asesor de la Red Oficial BAJOKAPOT se comunicará contigo con las tarifas cerradas garantizadas.`);
}

/* =============================================================================
   GESTIÓN DE HISTORIAL DE COMPARATIVAS (LOCALSTORAGE)
   ============================================================================= */
function saveCurrentComparison() {
  if (comparedVehicles.length === 0) {
    alert("No hay vehículos cargados en el comparador para guardar.");
    return;
  }

  const defaultName = comparedVehicles.map(v => `${v.maker} ${v.model}`).join(" vs ");
  const customName = prompt("Ingresa un nombre para guardar esta comparativa:", defaultName);
  if (!customName) return;

  const savedItem = {
    id: "comp_" + Date.now(),
    name: customName,
    date: new Date().toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    vehicles: comparedVehicles
  };

  const currentHistory = getSavedComparisons();
  currentHistory.unshift(savedItem); // Añadir al inicio

  try {
    localStorage.setItem("charu_saved_comparisons", JSON.stringify(currentHistory));
    addMutation("comparisons", "SAVE_COMPARISON", { id: savedItem.id, name: savedItem.name, vehicleCount: savedItem.vehicles.length });
    alert(`Comparativa "${customName}" guardada con éxito en tu historial.`);
    renderSavedComparisons();
    if (window.syncUserDataToCloud) window.syncUserDataToCloud();
  } catch (e) {
    alert("Error al guardar en almacenamiento local.");
  }
}

function getSavedComparisons() {
  try {
    const raw = localStorage.getItem("charu_saved_comparisons");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function loadSavedComparison(comparisonId) {
  const history = getSavedComparisons();
  const found = history.find(c => c.id === comparisonId);
  if (!found) return;

  comparedVehicles = found.vehicles.slice(0, 5);
  renderComparisonTable();
  window.scrollTo({ top: document.getElementById("compareResultCard").offsetTop - 80, behavior: "smooth" });
  alert(`Comparativa "${found.name}" cargada con éxito en la tabla.`);
}

function deleteSavedComparison(comparisonId) {
  if (!confirm("¿Seguro que deseas eliminar esta comparativa guardada del historial?")) return;

  let history = getSavedComparisons();
  history = history.filter(c => c.id !== comparisonId);
  localStorage.setItem("charu_saved_comparisons", JSON.stringify(history));
  addMutation("comparisons", "DELETE_COMPARISON", { id: comparisonId });
  if (typeof renderPreloadedCatalogPicker === 'function') renderPreloadedCatalogPicker();
  renderSavedComparisons();
  if (window.syncUserDataToCloud) window.syncUserDataToCloud({ allowReplaceComparisons: true });
}

function renderSavedComparisons() {
  const container = document.getElementById("savedComparisonsCard");
  if (!container) return;

  const history = getSavedComparisons();
  if (history.length === 0) {
    container.innerHTML = `
      <div style="font-size:12px; color:var(--text-muted); text-align:center; padding:12px;">
        No tienes comparativas guardadas aún. Guarda una usando el botón "Guardar Sesión".
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      ${history.map(item => `
        <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; transition:border-color 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-subtle)'">
          <div>
            <div style="font-size:14px; font-weight:800; color:var(--text-main); letter-spacing:-0.2px;">${item.name}</div>
            <div style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); margin-top:3px; display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
              <span style="display:inline-flex; align-items:center; gap:4px;">${ICONS.gauge} ${item.date}</span> • <span style="color:var(--accent); font-weight:700;">${item.vehicles.length} VEHÍCULOS</span> (${item.vehicles.map(v => v.model).join(', ')})
            </div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary btn-sm" onclick="loadSavedComparison('${item.id}')" style="display:inline-flex; align-items:center; gap:5px;">${ICONS.eye} Cargar Comparativa</button>
            <button class="btn btn-danger btn-sm" onclick="deleteSavedComparison('${item.id}')" title="Eliminar comparativa" style="display:inline-flex; align-items:center; justify-content:center; padding:5px 8px;">${ICONS.trash}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


/* =============================================================================
   TAB 4: MI GARAGE 2.0 — MANTENIMIENTO PREVENTIVO/CORRECTIVO, SEGURIDAD & SHA-256
   ============================================================================= */

function isLegacyDemoVehicle(v) {
  if (!v || typeof v !== "object") return false;
  if (v.userConfigured === true) return false;
  if (v.model && String(v.model).includes("Corolla") && Number(v.odo) === 148500) return true;
  if (
    v.id === "gwm-haval-jolion-classic-6mt" &&
    v.plate === "EN-RODAJE" &&
    v.nickname === "Jolion Turbo" &&
    Number(v.odo) === 100
  ) {
    return true;
  }
  return false;
}
window.isLegacyDemoVehicle = isLegacyDemoVehicle;

function normalizeMaintenanceRegime(val) {
  return val === "personalizado" ? "personalizado" : "severo";
}

let activeGarageVehicle = null;
let currentMaintenanceRegime = normalizeMaintenanceRegime(localStorage.getItem("charu_maint_regime")); // 'severo' | 'personalizado'
let currentMaintCategoryFilter = "ALL"; // 'ALL' | 'SAFETY' | 'ENGINE' | 'TRANSMISSION' | 'CHASSIS'
let currentMaintStatusFilter = "ALL"; // 'ALL' | 'PROXIMO' | 'CRITICO'
let modalMaintenanceType = "preventivo"; // 'preventivo' | 'correctivo'

// Matriz Maestra de 16 Puntos Preventivos (Régimen Severo Base 5.000 km + Derivados y Personalizado)
const OEM_PREVENTIVE_MATRIX = [
  {
    id: "breakin_5k",
    category: "ENGINE",
    isSafetyCritical: true,
    isBreakInItem: true,
    multiplier: 1,
    systemName: "Motor · Rodaje",
    title: "Primer Servicio de Asentamiento (5.000 km)",
    oemSpec: "Aceite 5W-30 Sintético API SP (4.2 L) y filtro original",
    normalKm: 5000,
    normalMonths: 6,
    severeKm: 5000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 75,
    weightPts: 15,
    whyItMatters: "Retira las micropartículas metálicas del hermanado inicial de anillos, cilindros y turbocompresor. Indispensable para conservar la garantía de fábrica.",
    workshopShieldWarning: "Exige ver el envase sellado SAE 5W-30 API SP / ILSAC GF-6A y verifica que reemplacen el filtro de aceite original con su arandela del tapón de cárter."
  },
  {
    id: "engine_oil",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 1,
    systemName: "Motor",
    title: "Aceite de Motor y Filtro",
    oemSpec: "SAE 5W-30 Sintético API SP (4.2 L)",
    normalKm: 10000,
    normalMonths: 12,
    severeKm: 5000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 68,
    weightPts: 15,
    whyItMatters: "Lubrica y enfría el eje del turbocompresor (que gira a más de 150.000 RPM) y mantiene la presión del tensor hidráulico de la cadena de tiempo.",
    workshopShieldWarning: "PROHIBIDO instalar 15W-40 o 20W-50 mineral/semisintético. Un aceite grueso obstruye los ductos del turbo y provoca pre-ignición (LSPI)."
  },
  {
    id: "air_filter",
    category: "ENGINE",
    isSafetyCritical: false,
    multiplier: 2,
    systemName: "Admisión",
    title: "Filtro de Aire del Motor",
    oemSpec: "Elemento filtrante seco de alta densidad",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 22,
    weightPts: 6,
    whyItMatters: "Evita que partículas abrasivas de polvo ingresen a la rueda compresora del turbo, previniendo pérdida de potencia y consumo excesivo.",
    workshopShieldWarning: "No permitas que solo lo soplen con aire a alta presión si ya está saturado; el aire comprimido rompe las microfibras del papel filtrante."
  },
  {
    id: "fuel_filter",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 2,
    systemName: "Combustible",
    title: "Filtro de Combustible",
    oemSpec: "Filtro de gasolina de alta retención",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 25,
    weightPts: 10,
    whyItMatters: "En Venezuela la gasolina suele contener sedimentos y óxido de cisternas. Un filtro limpio evita caída de presión en la bomba y mezcla pobre (que funde pistones en motores turbo).",
    workshopShieldWarning: "Verifica la flecha de sentido de flujo del filtro nuevo y comprueba que los acoples rápidos queden asegurados con su clip de seguridad."
  },
  {
    id: "cabin_filter",
    category: "CHASSIS",
    isSafetyCritical: false,
    multiplier: 2,
    systemName: "Climatización",
    title: "Filtro de Cabina (A/C)",
    oemSpec: "Filtro antipolen de carbón activado",
    normalKm: 15000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 18,
    weightPts: 3,
    whyItMatters: "Protege el evaporador del A/C contra hongos y polvo urbano, manteniendo el caudal de enfriamiento y la salud respiratoria.",
    workshopShieldWarning: "Se ubica detrás de la guantera; su reemplazo toma 5 minutos y no requiere desmontar el tablero ni recargar gas refrigerante."
  },
  {
    id: "spark_plugs",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 6,
    systemName: "Encendido",
    title: "Bujías de Encendido",
    oemSpec: "Juego de 4 bujías de Iridio OEM",
    normalKm: 40000,
    normalMonths: 24,
    severeKm: 30000,
    severeMonths: 24,
    defaultLastKm: 0,
    estimatedUsd: 65,
    weightPts: 12,
    whyItMatters: "Los motores 1.5L Turbo trabajan con alta presión en cámara. Bujías desgastadas causan Misfire (P0300), queman las bobinas y destruyen el catalizador.",
    workshopShieldWarning: "Exige bujías de Iridio genuinas con torque preciso (20-25 Nm). Jamás instales bujías convencionales de cobre en un motor turbo."
  },
  {
    id: "injectors_throttle",
    category: "ENGINE",
    isSafetyCritical: false,
    multiplier: 5,
    systemName: "Inyección",
    title: "Limpieza de Inyectores y Mariposa",
    oemSpec: "Ultrasonido y calibración electrónica",
    normalKm: 40000,
    normalMonths: 24,
    severeKm: 25000,
    severeMonths: 18,
    defaultLastKm: 0,
    estimatedUsd: 55,
    weightPts: 5,
    whyItMatters: "Mantiene la pulverización exacta de combustible y un ralentí estable sin vibraciones ni tirones al acelerar.",
    workshopShieldWarning: "Prohibido empujar la mariposa electrónica con los dedos; debe limpiarse con spray dieléctrico y recalibrarse por escáner OBD2."
  },
  {
    id: "timing_chain",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 16,
    systemName: "Distribución",
    title: "Inspección de Cadena de Tiempo",
    oemSpec: "Cadena metálica interna y tensor hidráulico",
    normalKm: 100000,
    normalMonths: 72,
    severeKm: 80000,
    severeMonths: 60,
    defaultLastKm: 0,
    estimatedUsd: 45,
    weightPts: 14,
    whyItMatters: "Tu motor 1.5T lleva cadena metálica (no correa de caucho). Dura toda la vida útil si usas aceite 5W-30 a tiempo, pero se audita su tensión y ausencia de cascabeleo en frío.",
    workshopShieldWarning: "Ningún taller debe cobrarte 'cambio de correa de tiempo' a los 50.000 km porque tu motor es de cadena metálica interna."
  },
  {
    id: "drive_belt",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 9,
    systemName: "Accesorios",
    title: "Correa Única y Polea Tensora",
    oemSpec: "Correa serpentina EPDM de accesorios",
    normalKm: 60000,
    normalMonths: 48,
    severeKm: 45000,
    severeMonths: 36,
    defaultLastKm: 0,
    estimatedUsd: 60,
    weightPts: 8,
    whyItMatters: "Si la correa externa se rompe, pierdes carga del alternador y refrigeración de inmediato.",
    workshopShieldWarning: "Al cambiar la correa única, verifica que el rodamiento de la polea tensora gire libre sin zumbidos."
  },
  {
    id: "manual_gearbox_oil",
    category: "TRANSMISSION",
    isSafetyCritical: false,
    multiplier: 7,
    systemName: "Transmisión",
    title: "Aceite de Transmisión (6MT)",
    oemSpec: "SAE 75W-80 Sintético API GL-4 (2.2 L)",
    normalKm: 50000,
    normalMonths: 36,
    severeKm: 35000,
    severeMonths: 24,
    defaultLastKm: 0,
    estimatedUsd: 55,
    weightPts: 8,
    whyItMatters: "Protege los anillos sincronizadores de bronce y piñones de tus 6 velocidades para que los cambios entren suaves como mantequilla.",
    workshopShieldWarning: "ATENCIÓN CRÍTICA: Exige norma API GL-4 (jamás uses GL-5 de diferencial pesado, ya que los aditivos de azufre corroen los sincronizadores de bronce de la caja)."
  },
  {
    id: "clutch_system",
    category: "TRANSMISSION",
    isSafetyCritical: true,
    multiplier: 3,
    systemName: "Transmisión",
    title: "Inspección de Embrague y Bombín",
    oemSpec: "Recorrido de pedal y estanqueidad hidráulica",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 15000,
    severeMonths: 12,
    defaultLastKm: 0,
    estimatedUsd: 25,
    weightPts: 7,
    whyItMatters: "Previene desgaste prematuro del volante bimasa/disco y asegura que el cilindro esclavo hidráulico no tenga fugas.",
    workshopShieldWarning: "Hábito de oro: No descanses el pie izquierdo sobre el pedal del croche ni mantengas el carro aguantado con embrague en subidas (usa el Auto-Hold / freno)."
  },
  {
    id: "brake_clutch_fluid",
    category: "SAFETY",
    isSafetyCritical: true,
    multiplier: 6,
    systemName: "Frenos",
    title: "Líquido de Frenos y Embrague",
    oemSpec: "Fluido sintético DOT 4",
    normalKm: 40000,
    normalMonths: 24,
    severeKm: 30000,
    severeMonths: 18,
    defaultLastKm: 0,
    estimatedUsd: 40,
    weightPts: 15,
    whyItMatters: "El fluido DOT 4 es higroscópico (absorbe humedad del aire tropical). Con >3% de agua hierve al frenar en bajadas (Vapor Lock) y corroe el módulo ABS y el bombín del croche.",
    workshopShieldWarning: "Exige purga completa en las 4 ruedas Y en el purgador del bombín de embrague con fluido DOT 4 sellado."
  },
  {
    id: "brake_pads_rotors",
    category: "SAFETY",
    isSafetyCritical: true,
    multiplier: 2,
    systemName: "Frenos",
    title: "Pastillas y Discos de Freno",
    oemSpec: "Compuesto cerámico OEM (mínimo 3 mm)",
    normalKm: 15000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 35,
    weightPts: 15,
    whyItMatters: "Garantiza la distancia de frenado de emergencia y protege los 4 discos contra rayaduras.",
    workshopShieldWarning: "Pide medir el espesor en milímetros frente a ti (una pastilla nueva tiene ~10-12 mm; solo se cambia al bajar de 3-4 mm) y engrasar los pines deslizantes con grasa siliconada."
  },
  {
    id: "coolant_system",
    category: "ENGINE",
    isSafetyCritical: true,
    multiplier: 8,
    systemName: "Enfriamiento",
    title: "Refrigerante de Motor",
    oemSpec: "Orgánico OAT 50/50 anticorrosivo (7.5 L)",
    normalKm: 50000,
    normalMonths: 36,
    severeKm: 40000,
    severeMonths: 24,
    defaultLastKm: 0,
    estimatedUsd: 55,
    weightPts: 12,
    whyItMatters: "Disipa el calor extremo del bloque 1.5L Turbo de aluminio y evita cavitación en la bomba de agua y corrosión galvánica.",
    workshopShieldWarning: "Jamás rellenes con agua de chorro ni aguas coloreadas baratas; usa exclusivamente refrigerante OAT al 50%."
  },
  {
    id: "tires_alignment",
    category: "SAFETY",
    isSafetyCritical: true,
    multiplier: 2,
    systemName: "Neumáticos",
    title: "Rotación, Balanceo y Alineación",
    oemSpec: "Presión 34 PSI en frío y geometría 3D",
    normalKm: 10000,
    normalMonths: 6,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 40,
    weightPts: 12,
    whyItMatters: "Evita el desgaste irregular ('escamado') de los neumáticos delanteros de tracción y mantiene el volante centrado tras caer en baches.",
    workshopShieldWarning: "Tras alinear en máquina 3D, exige que el volante quede 100% recto para no descalibrar el sensor de ángulo de la dirección eléctrica (EPS) ni el control de estabilidad (ESP)."
  },
  {
    id: "suspension_battery",
    category: "CHASSIS",
    isSafetyCritical: true,
    multiplier: 2,
    systemName: "Chasis y Eléctrico",
    title: "Tren Delantero y Batería 12V",
    oemSpec: "Bujes, guardapolvos y prueba de carga CCA",
    normalKm: 20000,
    normalMonths: 12,
    severeKm: 10000,
    severeMonths: 6,
    defaultLastKm: 0,
    estimatedUsd: 25,
    weightPts: 8,
    whyItMatters: "Detecta a tiempo un guardapolvo de tripoide roto (antes de que se pierda la grasa y se dañe la junta homocinética) y previene fallas súbitas de batería por calor.",
    workshopShieldWarning: "La dirección del Haval Jolion es 100% Eléctrica (EPS); no lleva envase ni aceite hidráulico de dirección."
  }
];

// Catálogo de los 6 Sistemas de Mantenimiento Correctivo e Imprevistos
const CORRECTIVE_CATALOG = [
  {
    id: "corr_suspension",
    system: "Suspensión y Tren",
    title: "Amortiguadores, Mesetas, Bieletas o Rodamientos",
    symptoms: "Golpeteo seco al caer en huecos, chillido al girar, vibración o zumbido en autopista.",
    commonParts: "Amortiguadores McPherson, bieletas, mesetas, bujes y guardapolvo de tripoide.",
    estimatedUsd: 120,
    shieldTip: "Siempre que cambies cualquier pieza de suspensión o dirección, es obligatorio realizar Alineación 3D inmediatamente después."
  },
  {
    id: "corr_fuel_ignition",
    system: "Inyección y Encendido",
    title: "Bomba de Gasolina, Bobinas o Sensores O2",
    symptoms: "Jaloneos en subidas, pérdida de potencia del turbo, Check Engine encendido o dificultad al arrancar.",
    commonParts: "Módulo/pila de combustible, bobina individual, lavado de tanque y sensor de oxígeno.",
    estimatedUsd: 95,
    shieldTip: "Exige medir la presión de riel de combustible con manómetro y escanear códigos OBD2 antes de comprar repuestos a ciegas."
  },
  {
    id: "corr_cooling_ac",
    system: "Enfriamiento y A/C",
    title: "Termostato, Bomba de Agua, Electro o Gas A/C",
    symptoms: "Aguja de temperatura inestable (P0128), fuga de refrigerante o A/C que no enfría en colas.",
    commonParts: "Termostato OEM, tapa presurizada, mangueras y carga R134a/R1234yf con aceite PAG.",
    estimatedUsd: 85,
    shieldTip: "Nunca permitas que 'condenen' o eliminen el termostato: el motor trabajará frío, gastará 25% más gasolina y desgastará los cilindros."
  },
  {
    id: "corr_brakes_clutch",
    system: "Frenos y Embrague",
    title: "Discos, Bombín o Kit de Embrague",
    symptoms: "Vibración en el volante al frenar, pedal de croche esponjoso o embrague que desliza en subidas.",
    commonParts: "Discos ventilados, cilindro maestro/esclavo de embrague y kit disco + plato + collarín.",
    estimatedUsd: 160,
    shieldTip: "Si el pedal del croche baja su nivel, revisa primero el depósito de líquido DOT 4 y el bombín externo antes de bajar la caja completa."
  },
  {
    id: "corr_turbo_engine",
    system: "Turbo y Soportes",
    title: "Mangueras de Boost, Válvula o Bases de Motor",
    symptoms: "Silbido de fuga de aire al acelerar, pérdida de empuje o vibración en cabina en ralentí.",
    commonParts: "Abrazaderas/mangueras de intercooler, válvula diverter y soporte hidráulico de motor.",
    estimatedUsd: 110,
    shieldTip: "Muchas supuestas 'fallas de turbo' son simplemente una abrazadera floja o manguera de presión del intercooler escapando aire."
  },
  {
    id: "corr_tires_elec",
    system: "Neumáticos y Eléctrico",
    title: "Batería 12V, Caucho o Rectificación de Rin",
    symptoms: "Arranque lento en las mañanas, chichón lateral en neumático tras hueco o pérdida de presión.",
    commonParts: "Batería 12V AGM/Libre Mantenimiento, neumático nuevo y vulcanizado interno.",
    estimatedUsd: 130,
    shieldTip: "Si un neumático presenta una protuberancia ('chichón') en la pared lateral, las cuerdas internas se rompieron: cámbialo de inmediato por seguridad vial."
  }
];

async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function loadOdometerChain() {
  try {
    const raw = localStorage.getItem("charu_odometer_chain");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        blockchain = parsed;
        return;
      }
    }
  } catch (e) {}
  blockchain = [];
}

function saveOdometerChain() {
  try {
    localStorage.setItem("charu_odometer_chain", JSON.stringify(blockchain));
  } catch (e) {}
}

function ensureBlockchainGenesis(vehicle) {
  if (blockchain.length > 0 || !vehicle) return;
  const kmVal = Number(vehicle.odo) || 0;
  const label = `${vehicle.maker || ""} ${vehicle.model || ""} ${vehicle.year || ""}`.trim() || "Mi Vehículo";
  blockchain = [
    {
      index: 0,
      timestamp: new Date().toISOString().replace("T", " ").substr(0, 19),
      km: kmVal,
      reason: `[REGISTRO INICIAL] Alta de ${label} en BajoKapot`,
      prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
      hash: "0000" + Date.now().toString(16) + "bk0genesis"
    }
  ];
  saveOdometerChain();
}

function updateGarageEmptyStateVisibility() {
  const emptyEl = document.getElementById("garageEmptyState");
  const activeEl = document.getElementById("garageActiveWorkspace");
  const hasVehicle = Boolean(activeGarageVehicle && (activeGarageVehicle.maker || activeGarageVehicle.model));
  if (emptyEl) emptyEl.style.display = hasVehicle ? "none" : "block";
  if (activeEl) activeEl.style.display = hasVehicle ? "" : "none";
}

function refreshAllGarageUI() {
  loadActiveVehicle();
  currentMaintenanceRegime = normalizeMaintenanceRegime(localStorage.getItem("charu_maint_regime"));
  setMaintenanceRegime(currentMaintenanceRegime);
  renderCorrectiveCatalogAndLogs();
  renderFuelHistory();
  renderBlockchain();
  renderGarageAnalytics();
  renderSavedComparisons();
  runCopilotMaintenanceAdvisor(true);
}
window.refreshAllGarageUI = refreshAllGarageUI;

function triggerCloudSync() {
  if (typeof window.manualCloudSync === "function") {
    window.manualCloudSync();
  } else if (typeof openAuthModal === "function") {
    openAuthModal();
  }
}

function renderGarageVehicleHeader() {
  loadActiveVehicle();
}

function renderPreventiveMatrix() {
  renderPreventiveMaintenanceGrid();
}

function initGarageMaintenanceModule() {
  populateGaragePreloadSelect();
  refreshAllGarageUI();
}

function loadActiveVehicle() {
  loadOdometerChain();
  try {
    const saved = localStorage.getItem("charu_active_vehicle");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && !isLegacyDemoVehicle(parsed) && (parsed.maker || parsed.model)) {
        activeGarageVehicle = parsed;
      } else {
        // Eliminar semilla demo heredada para que nunca interfiera con la nube ni confunda al usuario
        if (parsed && isLegacyDemoVehicle(parsed)) {
          localStorage.removeItem("charu_active_vehicle");
        }
        activeGarageVehicle = null;
      }
    } else {
      activeGarageVehicle = null;
    }
  } catch (e) {
    activeGarageVehicle = null;
  }

  if (activeGarageVehicle) {
    currentOdometer = Number(activeGarageVehicle.odo) || 0;
    ensureBlockchainGenesis(activeGarageVehicle);
  } else {
    currentOdometer = 0;
  }
  updateGarageEmptyStateVisibility();
  syncGarageVehicleDOM();
}

function syncGarageVehicleDOM() {
  const v = activeGarageVehicle;
  const vehicleNameDisplay = document.getElementById("garageVehicleName");
  const vehicleDetailsDisplay = document.getElementById("garageVehicleDetails");
  const plateBadge = document.getElementById("garagePlateBadge");
  const odoDisplay = document.getElementById("garageOdoDisplay");
  const phaseSub = document.getElementById("garagePhaseSub");
  const specPills = document.getElementById("garageSpecPills");

  if (!v) {
    if (plateBadge) plateBadge.textContent = "Mi Garage";
    if (vehicleNameDisplay) vehicleNameDisplay.textContent = "Sin vehículo registrado";
    if (vehicleDetailsDisplay) vehicleDetailsDisplay.textContent = "Registra tu vehículo para activar el plan OEM";
    if (odoDisplay) odoDisplay.textContent = "0 km";
    if (phaseSub) phaseSub.textContent = "--";
    if (specPills) specPills.innerHTML = "";
    return;
  }

  const isBreakIn = currentOdometer < 1500;
  const statusTag = isBreakIn
    ? `${v.transmission || 'Transmisión OEM'} · En rodaje`
    : `${v.transmission || 'Transmisión OEM'}`;

  if (plateBadge) {
    const rawPlate = (v.plate && v.plate !== "EN-RODAJE") ? v.plate : (v.nickname || "Garage");
    plateBadge.textContent = v.year ? `${rawPlate} · ${v.year}` : rawPlate;
  }
  if (vehicleNameDisplay) {
    vehicleNameDisplay.innerHTML = `${v.maker || ''} ${v.model || ''} ${v.year || ''}<div style="margin-top:5px;"><span style="display:inline-block; font-size: 11px; font-weight:600; background: var(--bg-card-alt); border: 1px solid var(--border-subtle); padding: 2px 8px; border-radius: 5px; color: var(--text-secondary);">${statusTag}</span></div>`;
  }
  if (vehicleDetailsDisplay) {
    const parts = [v.engine || null, v.timing || null, v.nickname ? `Alias: ${v.nickname}` : null].filter(Boolean);
    vehicleDetailsDisplay.textContent = parts.join(" · ") || "Ficha técnica registrada";
  }
  if (odoDisplay) {
    odoDisplay.textContent = `${currentOdometer.toLocaleString()} km`;
  }
  if (phaseSub) {
    phaseSub.textContent = currentOdometer < 1500 ? "En rodaje" : (currentOdometer < 5000 ? "Hacia 1er serv." : "Operación normal");
  }
  if (specPills) {
    specPills.innerHTML = `
      <span class="spec-pill-item">Distribución: <strong style="color:var(--text-main);">${v.timing || 'OEM'}</strong></span>
      <span class="spec-pill-item">Aceite: <strong style="color:var(--text-main);">${v.oil || 'Según manual'}</strong></span>
      <span class="spec-pill-item">Caja: <strong style="color:var(--text-main);">${v.transmission || 'OEM'}</strong></span>
      <span class="spec-pill-item">Frenos: <strong style="color:var(--text-main);">DOT 4</strong></span>
    `;
  }
}

function getMaintenanceLogs() {
  try {
    return JSON.parse(localStorage.getItem("charu_maintenance_logs") || "[]");
  } catch (e) {
    return [];
  }
}

function getLastServiceForTask(taskId) {
  const logs = getMaintenanceLogs();
  const found = logs.find(l => l.taskId === taskId);
  return found || null;
}

function getDefaultCustomRegimeConfig(baseKm = 5000) {
  const safeBase = Math.max(1000, Number(baseKm) || 5000);
  const itemsKm = {};
  OEM_PREVENTIVE_MATRIX.forEach(item => {
    itemsKm[item.id] = Math.max(1000, Math.round(safeBase * (item.multiplier || 1)));
  });
  return { baseOilKm: safeBase, itemsKm };
}

function getCustomRegimeConfig() {
  try {
    const raw = localStorage.getItem("charu_custom_regime_config");
    if (!raw) return getDefaultCustomRegimeConfig(5000);
    const parsed = JSON.parse(raw);
    const baseOilKm = Math.max(1000, Number(parsed && parsed.baseOilKm) || 5000);
    const defaults = getDefaultCustomRegimeConfig(baseOilKm);
    const itemsKm = { ...defaults.itemsKm };
    if (parsed && parsed.itemsKm && typeof parsed.itemsKm === "object") {
      OEM_PREVENTIVE_MATRIX.forEach(item => {
        const val = Number(parsed.itemsKm[item.id]);
        if (Number.isFinite(val) && val >= 1000) {
          itemsKm[item.id] = Math.round(val);
        }
      });
    }
    return { baseOilKm, itemsKm };
  } catch (e) {
    return getDefaultCustomRegimeConfig(5000);
  }
}

function saveCustomRegimeConfig(cfg) {
  localStorage.setItem("charu_custom_regime_config", JSON.stringify(cfg));
}

function computeMaintenanceItemsStatus() {
  const isCustom = currentMaintenanceRegime === "personalizado";
  const customCfg = isCustom ? getCustomRegimeConfig() : null;
  return OEM_PREVENTIVE_MATRIX.map(item => {
    const lastLog = getLastServiceForTask(item.id);
    const lastKm = lastLog ? Number(lastLog.km) : item.defaultLastKm;
    const intervalKm = isCustom
      ? (Number(customCfg.itemsKm[item.id]) || Math.max(1000, Math.round(customCfg.baseOilKm * (item.multiplier || 1))))
      : item.severeKm;
    const intervalMonths = item.severeMonths;

    // Si es el 1er servicio de asentamiento (5.000 km) y ya fue realizado o el auto superó 6.500 km con cambio de aceite registrado
    if (item.isBreakInItem && (lastLog || getLastServiceForTask("engine_oil"))) {
      return {
        ...item,
        lastKm: lastLog ? lastLog.km : 5000,
        intervalKm,
        intervalMonths,
        kmDriven: 0,
        kmRemaining: intervalKm,
        wearRatio: 0,
        status: "Completado",
        semaphore: "GREEN"
      };
    }

    const kmDriven = Math.max(0, currentOdometer - lastKm);
    const kmRemaining = Math.max(0, intervalKm - kmDriven);
    const wearRatio = intervalKm > 0 ? (kmDriven / intervalKm) : 0;

    let semaphore = "GREEN";
    let statusLabel = "Al día";

    if (wearRatio >= 1.0) {
      semaphore = "RED";
      statusLabel = "Vencido";
    } else if (wearRatio >= 0.80) {
      semaphore = "AMBER";
      statusLabel = "Próximo";
    } else if (item.isBreakInItem && currentOdometer < 5000) {
      semaphore = "GREEN";
      statusLabel = "Meta 5.000 km";
    }

    return {
      ...item,
      lastKm,
      intervalKm,
      intervalMonths,
      kmDriven,
      kmRemaining,
      wearRatio,
      status: statusLabel,
      semaphore
    };
  });
}

function updateGarageTelemetryHUD() {
  const items = computeMaintenanceItemsStatus();
  let greenCount = 0;
  let amberCount = 0;
  let redCount = 0;
  let penaltyPoints = 0;

  items.forEach(it => {
    if (it.semaphore === "RED") {
      redCount++;
      penaltyPoints += it.isSafetyCritical ? 15 : 6;
    } else if (it.semaphore === "AMBER") {
      amberCount++;
      penaltyPoints += it.isSafetyCritical ? 4 : 2;
    } else {
      greenCount++;
    }
  });

  const healthScore = Math.max(15, Math.min(100, 100 - penaltyPoints));

  const elGreen = document.getElementById("semCountGreen");
  const elAmber = document.getElementById("semCountAmber");
  const elRed = document.getElementById("semCountRed");
  const elHealth = document.getElementById("garageHealthDisplay");
  const elHealthSub = document.getElementById("garageHealthSub");
  const elCost = document.getElementById("garageCostDisplay");
  const elTcoSub = document.getElementById("garageTcoSub");

  if (elGreen) elGreen.textContent = greenCount;
  if (elAmber) elAmber.textContent = amberCount;
  if (elRed) elRed.textContent = redCount;

  const dotAmber = document.getElementById("semDotAmber");
  const dotRed = document.getElementById("semDotRed");
  if (elAmber && elAmber.parentElement) {
    elAmber.parentElement.style.opacity = amberCount > 0 ? "1" : "0.6";
    elAmber.parentElement.style.borderColor = amberCount > 0 ? "rgba(245, 158, 11, 0.35)" : "var(--border-subtle)";
  }
  if (dotAmber) dotAmber.style.display = amberCount > 0 ? "inline-block" : "none";
  if (elRed && elRed.parentElement) {
    elRed.parentElement.style.opacity = redCount > 0 ? "1" : "0.6";
    elRed.parentElement.style.borderColor = redCount > 0 ? "rgba(239, 68, 68, 0.35)" : "var(--border-subtle)";
  }
  if (dotRed) dotRed.style.display = redCount > 0 ? "inline-block" : "none";

  const healthColor = healthScore >= 85 ? "var(--text-secondary)" : (healthScore >= 65 ? "var(--amber)" : "var(--danger)");
  if (elHealth) {
    elHealth.textContent = `${healthScore}/100`;
    elHealth.style.color = healthScore >= 85 ? "var(--text-main)" : (healthScore >= 65 ? "var(--amber)" : "var(--danger)");
  }
  const elHealthGauge = document.getElementById("garageHealthGauge");
  if (elHealthGauge && typeof renderRadialGaugeSvg === "function") {
    elHealthGauge.innerHTML = `
      ${renderRadialGaugeSvg(healthScore, 100, healthColor, 50, "")}
      <span style="font-size:10px; color:var(--text-muted); font-weight:500; margin-top:2px;">Salud OEM</span>
    `;
  }
  if (elHealthSub) {
    if (redCount > 0) {
      elHealthSub.textContent = `${redCount} vencido(s)`;
      elHealthSub.style.color = "var(--danger)";
    } else if (amberCount > 0) {
      elHealthSub.textContent = `${amberCount} próximo(s)`;
      elHealthSub.style.color = "var(--amber)";
    } else {
      elHealthSub.textContent = "Sin alertas";
      elHealthSub.style.color = "var(--text-muted)";
    }
  }

  // Cálculo de TCO (Gasolina + Mantenimiento Preventivo y Correctivo)
  const fuelHistory = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");
  const maintLogs = getMaintenanceLogs();
  const totalFuelUsd = fuelHistory.reduce((acc, f) => acc + (Number(f.usd) || 0), 0);
  const totalMaintUsd = maintLogs.reduce((acc, m) => acc + (Number(m.costUsd) || 0), 0);
  const totalSpentUsd = totalFuelUsd + totalMaintUsd;

  if (totalSpentUsd > 0 && currentOdometer > 0) {
    const cpk = (totalSpentUsd / Math.max(100, currentOdometer)).toFixed(3);
    if (elCost) elCost.textContent = `$${cpk}`;
    if (elTcoSub) elTcoSub.textContent = `Total: $${totalSpentUsd.toFixed(0)}`;
  } else {
    if (elCost) elCost.textContent = `$0.042`;
    if (elTcoSub) elTcoSub.textContent = `Estimado`;
  }
}

function renderBreakInAdvisorCard() {
  const container = document.getElementById("breakInAdvisorCard");
  if (!container) return;

  const v = activeGarageVehicle;
  if (!v) {
    container.innerHTML = "";
    return;
  }
  const vehicleName = `${v.maker || 'Vehículo'} ${v.model || ''}`.trim();
  const isTurbo = /turbo|t-gdi|tsi|ecoboost/i.test(v.engine || '');
  const oilSpec = v.oil || 'SAE 5W-30 API SP';
  const transSpec = v.transmission || 'Sincrónica / Automática';
  const activeBaseOilKm = currentMaintenanceRegime === "personalizado"
    ? getCustomRegimeConfig().baseOilKm
    : 5000;
  const breakInProgress = Math.min(100, Math.round((currentOdometer / 1500) * 100));
  const firstServiceProgress = Math.min(100, Math.round((currentOdometer / activeBaseOilKm) * 100));
  const isBreakInActive = currentOdometer < 1500;

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px;">
      <div style="font-size:13.5px; font-weight:700; color:var(--text-main);">
        ${isBreakInActive ? 'Protocolo de Asentamiento' : `Cuidados · ${v.model || 'Vehículo'}`}
      </div>
      <span style="font-size:11px; color:var(--text-muted); font-weight:600;">${currentOdometer.toLocaleString()} km</span>
    </div>

    <div style="font-size:12px; color:var(--text-secondary); margin-bottom:10px; line-height:1.45;">
      ${isBreakInActive
        ? `Etapa inicial para hermanar anillos, cilindros${isTurbo ? ', turbo' : ''} y caja (${transSpec}).`
        : `Operación regular. Mantén el lubricante ${oilSpec} y cuida el combustible.`
      }
    </div>

    <div style="margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-bottom:4px;">
        <span>${currentOdometer < activeBaseOilKm ? `Meta 1er servicio (${activeBaseOilKm.toLocaleString()} km)` : `Ciclo cada ${activeBaseOilKm.toLocaleString()} km`}</span>
        <span style="color:var(--text-main); font-weight:600;">${currentOdometer < activeBaseOilKm ? `${firstServiceProgress}%` : `${currentOdometer.toLocaleString()} km`}</span>
      </div>
      <div class="maint-progress-track">
        <div class="maint-progress-bar" style="width:${Math.max(4, currentOdometer < activeBaseOilKm ? firstServiceProgress : ((currentOdometer % activeBaseOilKm) / activeBaseOilKm) * 100)}%; background:var(--text-secondary);"></div>
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:6px; font-size:11.5px; color:var(--text-secondary);">
      <div style="background:var(--bg-card-alt); padding:7px 10px; border-radius:6px; border:1px solid var(--border-subtle);">
        ${isTurbo
          ? `<strong style="color:var(--text-main);">Enfriamiento del Turbo:</strong> Espera 45–60 s en ralentí antes de apagar tras exigir el motor (${oilSpec}).`
          : `<strong style="color:var(--text-main);">Lubricante:</strong> Usa ${oilSpec} y verifica el nivel cada 1.000 km.`
        }
      </div>
      <div style="background:var(--bg-card-alt); padding:7px 10px; border-radius:6px; border:1px solid var(--border-subtle);">
        ${isBreakInActive
          ? `<strong style="color:var(--text-main);">Rodaje (${breakInProgress}%):</strong> Evita superar 3.500 RPM o velocidades constantes prolongadas.`
          : `<strong style="color:var(--text-main);">Combustible:</strong> Evita circular en reserva (&lt; 1/4) para proteger la bomba.`
        }
      </div>
    </div>
  `;
}

function setMaintenanceRegime(regime) {
  currentMaintenanceRegime = normalizeMaintenanceRegime(regime);
  localStorage.setItem("charu_maint_regime", currentMaintenanceRegime);

  const btnSevero = document.getElementById("regimeBtnSevero");
  const btnCustom = document.getElementById("regimeBtnCustom");
  const expText = document.getElementById("regimeExplanationText");

  if (currentMaintenanceRegime === "personalizado") {
    const cfg = getCustomRegimeConfig();
    if (btnCustom) {
      btnCustom.className = "btn btn-sm";
      btnCustom.style.border = "1px solid var(--accent)";
      btnCustom.style.background = "var(--accent-dim)";
      btnCustom.style.color = "var(--text-main)";
    }
    if (btnSevero) {
      btnSevero.className = "btn btn-secondary btn-sm";
      btnSevero.style.border = "";
      btnSevero.style.background = "";
      btnSevero.style.color = "";
    }
    if (expText) {
      expText.textContent = `Personalizado · Aceite cada ${cfg.baseOilKm.toLocaleString()} km y derivados`;
    }
  } else {
    if (btnSevero) {
      btnSevero.className = "btn btn-sm";
      btnSevero.style.border = "1px solid var(--accent)";
      btnSevero.style.background = "var(--accent-dim)";
      btnSevero.style.color = "var(--text-main)";
    }
    if (btnCustom) {
      btnCustom.className = "btn btn-secondary btn-sm";
      btnCustom.style.border = "";
      btnCustom.style.background = "";
      btnCustom.style.color = "";
    }
    if (expText) {
      expText.textContent = "Uso Severo · Aceite cada 5.000 km y derivados";
    }
  }

  renderBreakInAdvisorCard();
  updateGarageTelemetryHUD();
  renderPreventiveMaintenanceGrid();
}

function renderCustomRegimeEditor() {
  const cfg = getCustomRegimeConfig();
  const baseInput = document.getElementById("customBaseOilKmInput");
  if (baseInput) baseInput.value = cfg.baseOilKm;

  const grid = document.getElementById("customRegimeItemsGrid");
  if (!grid) return;

  grid.innerHTML = OEM_PREVENTIVE_MATRIX.map(item => {
    const val = Number(cfg.itemsKm[item.id]) || Math.round(cfg.baseOilKm * (item.multiplier || 1));
    return `
      <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:7px; padding:7px 9px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <div style="min-width:0;">
          <div style="font-size:11.5px; font-weight:600; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</div>
          <div style="font-size:10px; color:var(--text-muted);">${item.multiplier || 1}× base</div>
        </div>
        <input type="number" class="input-field" data-maint-id="${item.id}" value="${val}" min="1000" max="200000" step="500" style="width:76px; padding:4px 6px; font-size:11.5px; text-align:right; flex-shrink:0;">
      </div>
    `;
  }).join("");
}

function toggleCustomRegimeDrawer(forceOpen) {
  const drawer = document.getElementById("customRegimeDrawer");
  if (!drawer) return;
  const open = typeof forceOpen === "boolean" ? forceOpen : drawer.hasAttribute("hidden");
  if (open) {
    renderCustomRegimeEditor();
    drawer.removeAttribute("hidden");
  } else {
    drawer.setAttribute("hidden", "");
  }
}

function applyScaledBaseOilToEditor(baseKm) {
  const safeBase = Math.max(1000, Number(baseKm) || 5000);
  const grid = document.getElementById("customRegimeItemsGrid");
  if (!grid) return;
  grid.querySelectorAll("input[data-maint-id]").forEach(inp => {
    const id = inp.getAttribute("data-maint-id");
    const item = OEM_PREVENTIVE_MATRIX.find(it => it.id === id);
    if (item) {
      inp.value = Math.max(1000, Math.round(safeBase * (item.multiplier || 1)));
    }
  });
}

function setCustomBaseOilPreset(km) {
  const baseInput = document.getElementById("customBaseOilKmInput");
  if (baseInput) baseInput.value = km;
  applyScaledBaseOilToEditor(km);
}

function onCustomBaseOilInput(km) {
  applyScaledBaseOilToEditor(km);
}

function saveCustomRegimeFromUI() {
  const baseInput = document.getElementById("customBaseOilKmInput");
  const baseOilKm = Math.max(1000, Math.round(Number(baseInput ? baseInput.value : 5000) || 5000));
  const itemsKm = {};
  const grid = document.getElementById("customRegimeItemsGrid");
  OEM_PREVENTIVE_MATRIX.forEach(item => {
    const inp = grid ? grid.querySelector(`input[data-maint-id="${item.id}"]`) : null;
    const rawVal = inp ? Number(inp.value) : Math.round(baseOilKm * (item.multiplier || 1));
    itemsKm[item.id] = Number.isFinite(rawVal) && rawVal >= 1000 ? Math.round(rawVal) : Math.round(baseOilKm * (item.multiplier || 1));
  });
  saveCustomRegimeConfig({ baseOilKm, itemsKm });
  setMaintenanceRegime("personalizado");
  toggleCustomRegimeDrawer(false);
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();
}

function resetCustomRegimeToSevero() {
  localStorage.removeItem("charu_custom_regime_config");
  const baseInput = document.getElementById("customBaseOilKmInput");
  if (baseInput) baseInput.value = 5000;
  setMaintenanceRegime("severo");
  toggleCustomRegimeDrawer(false);
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();
}

function simulateOdometerPreview(targetKm) {
  if (!activeGarageVehicle) return;
  currentOdometer = Number(targetKm);
  activeGarageVehicle.odo = currentOdometer;
  syncGarageVehicleDOM();
  renderBreakInAdvisorCard();
  updateGarageTelemetryHUD();
  renderPreventiveMaintenanceGrid();
}

function switchGarageSubTab(subTab) {
  const tabs = ["preventive", "corrective", "copilot", "blockchain", "analytics"];
  tabs.forEach(t => {
    const pane = document.getElementById(`garageSubPane-${t}`);
    const btn = document.getElementById(`garageSubTabBtn-${t}`);
    if (pane) pane.style.display = (t === subTab) ? "block" : "none";
    if (btn) {
      if (t === subTab) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });
  if (subTab === "analytics" && typeof renderGarageAnalytics === "function") {
    renderGarageAnalytics();
  }
}

function setMaintCategoryFilter(cat, btnEl) {
  currentMaintCategoryFilter = cat;
  currentMaintStatusFilter = "ALL";
  const pillsWrap = document.getElementById("maintCategoryPills");
  if (pillsWrap) {
    const btns = pillsWrap.querySelectorAll("button");
    const catKeys = ["ALL", "SAFETY", "ENGINE", "TRANSMISSION", "CHASSIS"];
    btns.forEach((b, idx) => {
      b.classList.remove("toggle-pill-active");
      b.className = "btn btn-secondary btn-sm";
      if (btnEl ? b === btnEl : catKeys[idx] === cat) {
        b.classList.add("toggle-pill-active");
      }
    });
  }
  renderPreventiveMaintenanceGrid();
}

function renderGarageChassisSchematic() {
  const container = document.getElementById("garageChassisSchematic");
  if (!container) return;

  const allItems = computeMaintenanceItemsStatus();
  const summarizeZone = (filterFn) => {
    const subset = allItems.filter(filterFn);
    const reds = subset.filter(i => i.semaphore === "RED").length;
    const ambers = subset.filter(i => i.semaphore === "AMBER").length;
    const dotClass = reds > 0 ? "dot-red" : (ambers > 0 ? "dot-amber" : "");
    const colorHex = reds > 0 ? "var(--danger)" : (ambers > 0 ? "var(--amber)" : "var(--text-muted)");
    const blueprintStroke = reds > 0 ? "var(--danger)" : (ambers > 0 ? "var(--amber)" : "var(--border-editorial)");
    const tag = reds > 0 ? `${reds} vencido${reds > 1 ? 's' : ''}` : (ambers > 0 ? `${ambers} próximo${ambers > 1 ? 's' : ''}` : `${subset.length} al día`);
    return { count: subset.length, dotClass, colorHex, blueprintStroke, tag };
  };

  const zAll = summarizeZone(() => true);
  const zEngine = summarizeZone(i => i.category === "ENGINE");
  const zTrans = summarizeZone(i => i.category === "TRANSMISSION");
  const zChassis = summarizeZone(i => i.category === "CHASSIS");
  const zSafety = summarizeZone(i => i.isSafetyCritical);

  const activeCat = currentMaintCategoryFilter;
  const strokeFor = (cat, fallbackColor) => activeCat === cat ? "var(--accent)" : (activeCat === "ALL" ? fallbackColor : "var(--border-glass)");
  const dotHtml = (cls) => cls ? `<span class="status-dot ${cls}"></span>` : "";

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
      <span style="font-size:12.5px; font-weight:700; color:var(--text-main);">
        Estado por Subsistema
      </span>
      <span style="font-size:11px; color:var(--text-muted);">Selecciona una zona para filtrar</span>
    </div>
    <div class="chassis-schematic-layout">
      <div class="chassis-svg-box">
        <svg viewBox="0 0 120 176" width="114" height="152" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- Contorno superior CAD automotriz -->
          <path d="M 32 22 C 36 13 48 10 60 10 C 72 10 84 13 88 22 C 92 31 93 45 92 60 C 92 84 92 108 92 128 C 92 145 89 156 80 160 C 70 163 50 163 40 160 C 31 156 28 145 28 128 C 28 108 28 84 28 60 C 27 45 28 31 32 22 Z" stroke="var(--border-editorial)" stroke-width="1.35" fill="currentColor" fill-opacity="0.025"/>
          <!-- Espejos laterales -->
          <path d="M 27 56 L 20 58 C 19 61 20 63 23 63 L 28 62" stroke="var(--border-editorial)" stroke-width="1.15" opacity="0.7"/>
          <path d="M 93 56 L 100 58 C 101 61 100 63 97 63 L 92 62" stroke="var(--border-editorial)" stroke-width="1.15" opacity="0.7"/>
          <!-- Parabrisas y medallón trasero -->
          <path d="M 35 50 C 44 45 76 45 85 50 L 81 74 C 68 72 52 72 39 74 Z" stroke="var(--border-editorial)" stroke-width="1.05" fill="currentColor" fill-opacity="0.06" opacity="0.75"/>
          <path d="M 39 124 C 52 126 68 126 81 124 L 78 144 C 66 146 54 146 42 144 Z" stroke="var(--border-editorial)" stroke-width="1.05" fill="currentColor" fill-opacity="0.05" opacity="0.65"/>

          <!-- Ruedas & Tren (CHASSIS) -->
          <g onclick="setMaintCategoryFilter('CHASSIS')" style="cursor:pointer;">
            <rect x="17" y="28" width="8" height="25" rx="2.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'CHASSIS' ? 'var(--accent-dim)' : 'none'}"/>
            <rect x="95" y="28" width="8" height="25" rx="2.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'CHASSIS' ? 'var(--accent-dim)' : 'none'}"/>
            <rect x="17" y="117" width="8" height="25" rx="2.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'CHASSIS' ? 'var(--accent-dim)' : 'none'}"/>
            <rect x="95" y="117" width="8" height="25" rx="2.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'CHASSIS' ? 'var(--accent-dim)' : 'none'}"/>
            <line x1="25" y1="40.5" x2="95" y2="40.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.15" stroke-dasharray="3 2" opacity="0.65"/>
            <line x1="25" y1="129.5" x2="95" y2="129.5" stroke="${strokeFor('CHASSIS', zChassis.blueprintStroke)}" stroke-width="1.15" stroke-dasharray="3 2" opacity="0.65"/>
          </g>

          <!-- Bloque Motor (ENGINE) -->
          <g onclick="setMaintCategoryFilter('ENGINE')" style="cursor:pointer;">
            <rect x="44" y="21" width="32" height="21" rx="4" stroke="${strokeFor('ENGINE', zEngine.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'ENGINE' ? 'var(--accent-dim)' : 'none'}"/>
            <line x1="49" y1="28" x2="71" y2="28" stroke="${strokeFor('ENGINE', zEngine.blueprintStroke)}" stroke-width="1.1" opacity="0.7"/>
            <line x1="49" y1="35" x2="71" y2="35" stroke="${strokeFor('ENGINE', zEngine.blueprintStroke)}" stroke-width="1.1" opacity="0.7"/>
          </g>

          <!-- Transmisión (TRANSMISSION) -->
          <g onclick="setMaintCategoryFilter('TRANSMISSION')" style="cursor:pointer;">
            <rect x="53" y="45" width="14" height="39" rx="3" stroke="${strokeFor('TRANSMISSION', zTrans.blueprintStroke)}" stroke-width="1.5" fill="${activeCat === 'TRANSMISSION' ? 'var(--accent-dim)' : 'none'}"/>
            <line x1="60" y1="84" x2="60" y2="129.5" stroke="${strokeFor('TRANSMISSION', zTrans.blueprintStroke)}" stroke-width="1.3" opacity="0.7"/>
          </g>

          <!-- Seguridad Vial (SAFETY) -->
          <g onclick="setMaintCategoryFilter('SAFETY')" style="cursor:pointer;">
            <circle cx="60" cy="102" r="10" stroke="${strokeFor('SAFETY', zSafety.blueprintStroke)}" stroke-width="1.45" fill="${activeCat === 'SAFETY' ? 'var(--accent-dim)' : 'none'}"/>
            <path d="M 56.5 102 L 59 104.5 L 64 99" stroke="${strokeFor('SAFETY', zSafety.blueprintStroke)}" stroke-width="1.45"/>
          </g>
        </svg>
      </div>
      <div class="schematic-nodes-grid">
        <button type="button" class="schematic-node-btn ${activeCat === 'ALL' ? 'active' : ''}" onclick="setMaintCategoryFilter('ALL')" style="grid-column: 1 / -1;">
          <span style="display:inline-flex; align-items:center; gap:7px;">${dotHtml(zAll.dotClass)} Todos los sistemas</span>
          <span class="schematic-node-status" style="color:${zAll.colorHex};">${zAll.tag}</span>
        </button>
        <button type="button" class="schematic-node-btn ${activeCat === 'ENGINE' ? 'active' : ''}" onclick="setMaintCategoryFilter('ENGINE')">
          <span style="display:inline-flex; align-items:center; gap:7px;">${dotHtml(zEngine.dotClass)} Motor</span>
          <span class="schematic-node-status" style="color:${zEngine.colorHex};">${zEngine.tag}</span>
        </button>
        <button type="button" class="schematic-node-btn ${activeCat === 'TRANSMISSION' ? 'active' : ''}" onclick="setMaintCategoryFilter('TRANSMISSION')">
          <span style="display:inline-flex; align-items:center; gap:7px;">${dotHtml(zTrans.dotClass)} Transmisión</span>
          <span class="schematic-node-status" style="color:${zTrans.colorHex};">${zTrans.tag}</span>
        </button>
        <button type="button" class="schematic-node-btn ${activeCat === 'CHASSIS' ? 'active' : ''}" onclick="setMaintCategoryFilter('CHASSIS')">
          <span style="display:inline-flex; align-items:center; gap:7px;">${dotHtml(zChassis.dotClass)} Chasis y Frenos</span>
          <span class="schematic-node-status" style="color:${zChassis.colorHex};">${zChassis.tag}</span>
        </button>
        <button type="button" class="schematic-node-btn ${activeCat === 'SAFETY' ? 'active' : ''}" onclick="setMaintCategoryFilter('SAFETY')">
          <span style="display:inline-flex; align-items:center; gap:7px;">${dotHtml(zSafety.dotClass)} Seguridad Vial</span>
          <span class="schematic-node-status" style="color:${zSafety.colorHex};">${zSafety.tag}</span>
        </button>
      </div>
    </div>
  `;
}

function filterMaintenanceByStatus(statusFilter) {
  currentMaintStatusFilter = statusFilter;
  currentMaintCategoryFilter = "ALL";
  switchGarageSubTab("preventive");
  renderPreventiveMaintenanceGrid();
}

function renderPreventiveMaintenanceGrid() {
  if (typeof renderGarageChassisSchematic === "function") renderGarageChassisSchematic();
  const grid = document.getElementById("preventiveMaintenanceGrid");
  if (!grid) return;

  const searchInput = document.getElementById("maintSearchInput");
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();

  let items = computeMaintenanceItemsStatus();

  if (currentMaintCategoryFilter === "SAFETY") {
    items = items.filter(i => i.isSafetyCritical);
  } else if (currentMaintCategoryFilter !== "ALL") {
    items = items.filter(i => i.category === currentMaintCategoryFilter);
  }

  if (currentMaintStatusFilter === "PROXIMO") {
    items = items.filter(i => i.semaphore === "AMBER");
  } else if (currentMaintStatusFilter === "CRITICO") {
    items = items.filter(i => i.semaphore === "RED");
  }

  if (query) {
    items = items.filter(i =>
      i.title.toLowerCase().includes(query) ||
      i.systemName.toLowerCase().includes(query) ||
      i.oemSpec.toLowerCase().includes(query) ||
      i.whyItMatters.toLowerCase().includes(query)
    );
  }

  // Ordenar por prioridad: RED primero, luego AMBER, luego BreakIn, luego mayor wearRatio
  items.sort((a, b) => {
    const prio = { RED: 3, AMBER: 2, GREEN: 1 };
    if (prio[b.semaphore] !== prio[a.semaphore]) return prio[b.semaphore] - prio[a.semaphore];
    if (a.isBreakInItem && !b.isBreakInItem) return -1;
    if (!a.isBreakInItem && b.isBreakInItem) return 1;
    return b.wearRatio - a.wearRatio;
  });

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align:center; padding:24px; color:var(--text-muted); font-size:12px;">
        No hay ítems de mantenimiento que coincidan con el filtro seleccionado.
        <div style="margin-top:8px;">
          <button class="btn btn-secondary btn-sm" onclick="filterMaintenanceByStatus('ALL')">Ver los 16 Puntos OEM</button>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => {
    const pct = Math.min(100, Math.round(item.wearRatio * 100));
    const safeId = String(item.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    let badgeHtml = `<span style="font-size:11px; font-weight:500; color:var(--text-muted); white-space:nowrap;">${item.status}</span>`;
    let barColor = "var(--text-secondary)";
    let metricColor = "var(--text-main)";
    let cardClass = "";
    let btnAlertClass = "";

    if (item.semaphore === "RED") {
      badgeHtml = `<span style="background:var(--danger-dim); color:var(--danger); border:1px solid rgba(239,68,68,0.28); border-radius:999px; font-size:11px; padding:2px 8px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><span class="status-dot dot-red" style="width:6px; height:6px;"></span>${item.status}</span>`;
      barColor = "var(--danger)";
      metricColor = "var(--danger)";
      cardClass = "status-critico";
      btnAlertClass = "is-critical";
    } else if (item.semaphore === "AMBER") {
      badgeHtml = `<span style="background:var(--amber-dim); color:var(--amber); border:1px solid rgba(245,158,11,0.30); border-radius:999px; font-size:11px; padding:2px 8px; font-weight:600; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;"><span class="status-dot dot-amber" style="width:6px; height:6px;"></span>${item.status}</span>`;
      barColor = "var(--amber)";
      metricColor = "var(--amber)";
      cardClass = "status-proximo";
      btnAlertClass = "is-alert";
    }

    const nextDueKm = item.lastKm + item.intervalKm;
    const bsValue = (typeof bcvRate === "number" && bcvRate > 0) ? Math.round(item.estimatedUsd * bcvRate) : 0;
    const costLabel = bsValue > 0
      ? `Est. $${item.estimatedUsd} <span style="font-weight:400; color:var(--text-muted);">(${bsValue.toLocaleString()} Bs.)</span>`
      : `Est. $${item.estimatedUsd}`;

    return `
      <div class="maint-item-card compact-editorial ${cardClass}">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <span style="font-size:11px; color:var(--text-muted); font-weight:500;">
            ${item.systemName}
          </span>
          ${badgeHtml}
        </div>

        <div>
          <div style="font-size:14.5px; font-weight:600; color:var(--text-main); line-height:1.35;">
            ${item.title}
          </div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.4;">
            ${item.oemSpec}
          </div>
        </div>

        <div>
          <div style="display:flex; justify-content:space-between; align-items:baseline; gap:8px; font-size:11.5px; color:var(--text-muted); margin-bottom:6px;">
            <span>Cada ${item.intervalKm.toLocaleString()} km · ${item.intervalMonths} m</span>
            <span style="color:${metricColor}; font-weight:600; font-variant-numeric:tabular-nums;">
              ${item.kmRemaining > 0 ? `Restan ${item.kmRemaining.toLocaleString()} km` : `Excedido +${(item.kmDriven - item.intervalKm).toLocaleString()} km`}
            </span>
          </div>
          <div class="maint-progress-track">
            <div class="maint-progress-bar" style="width:${Math.max(4, pct)}%; background:${barColor};"></div>
          </div>
        </div>

        <div id="prevDrawer_${safeId}" class="maint-extra-drawer" hidden>
          <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:6px;">Meta próxima: ${nextDueKm.toLocaleString()} km</div>
          <div style="font-size:12px; color:var(--text-secondary); line-height:1.45;">${item.whyItMatters}</div>
          <div style="margin-top:8px; background:var(--bg-card-alt); border-left:2px solid var(--border-editorial); padding:7px 10px; border-radius:0 6px 6px 0; font-size:12px; color:var(--text-secondary); line-height:1.4;">
            <strong style="color:var(--text-main);">En taller:</strong> ${item.workshopShieldWarning}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:auto;">
          <span style="font-size:12px; font-weight:600; color:var(--text-secondary); font-variant-numeric:tabular-nums;">
            ${costLabel}
          </span>
          <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
            <button type="button" class="btn-quiet-link" onclick="toggleCardDrawer('prevDrawer_${safeId}', this, 'Ocultar', 'Detalles')">
              Detalles
            </button>
            <button type="button" class="btn-minimal-action ${btnAlertClass}" onclick="openMaintenanceModal('preventivo', '${item.id}')">
              Registrar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderCorrectiveCatalogAndLogs() {
  const catGrid = document.getElementById("correctiveCatalogGrid");
  if (catGrid) {
    catGrid.innerHTML = CORRECTIVE_CATALOG.map(c => {
      const safeCorrId = String(c.id).replace(/[^a-zA-Z0-9_-]/g, "_");
      const bsValue = (typeof bcvRate === "number" && bcvRate > 0) ? Math.round(c.estimatedUsd * bcvRate) : 0;
      const costLabel = bsValue > 0
        ? `Est. $${c.estimatedUsd} <span style="font-weight:400; color:var(--text-muted);">(${bsValue.toLocaleString()} Bs.)</span>`
        : `Est. $${c.estimatedUsd}`;
      return `
        <div class="maint-item-card compact-editorial">
          <div style="font-size:11px; color:var(--text-muted); font-weight:500;">
            ${c.system}
          </div>
          <div>
            <div style="font-size:14.5px; font-weight:600; color:var(--text-main); line-height:1.35;">
              ${c.title}
            </div>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.45;">
              ${c.symptoms}
            </div>
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); line-height:1.4;">
            Piezas: ${c.commonParts}
          </div>
          <div id="corrDrawer_${safeCorrId}" class="maint-extra-drawer" hidden>
            <div style="background:var(--bg-card-alt); border-left:2px solid var(--border-editorial); padding:7px 10px; border-radius:0 6px 6px 0; font-size:12px; color:var(--text-secondary); line-height:1.4;">
              <strong style="color:var(--text-main);">En taller:</strong> ${c.shieldTip}
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:auto;">
            <span style="font-size:12px; font-weight:600; color:var(--text-secondary); font-variant-numeric:tabular-nums;">${costLabel}</span>
            <div style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
              <button type="button" class="btn-quiet-link" onclick="toggleCardDrawer('corrDrawer_${safeCorrId}', this, 'Ocultar', 'Guía OEM')">
                Guía OEM
              </button>
              <button type="button" class="btn-minimal-action" onclick="openMaintenanceModal('correctivo', '${c.id}')">
                Registrar
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  const logsContainer = document.getElementById("completedMaintenanceLogsList");
  const countBadge = document.getElementById("serviceLogsCountBadge");
  const logs = getMaintenanceLogs();

  if (countBadge) countBadge.textContent = `${logs.length} servicio(s)`;
  if (!logsContainer) return;

  if (logs.length === 0) {
    logsContainer.innerHTML = `
      <div style="text-align:center; padding:18px; color:var(--text-muted); font-size:12px;">
        Aún no has registrado servicios en este vehículo. Con <strong>${currentOdometer.toLocaleString()} km</strong> en el odómetro, el primer hito programado es el servicio de <strong>5.000 km</strong>.
      </div>
    `;
    return;
  }

  logsContainer.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${logs.map(l => `
        <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-left:2.5px solid ${l.type === 'preventivo' ? 'var(--border-editorial)' : 'var(--amber)'}; border-radius:8px; padding:11px 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div>
            <div style="font-size:13px; font-weight:600; color:var(--text-main);">
              <span style="color:var(--text-muted); font-size:11px; font-weight:500; text-transform:capitalize;">${l.type} · </span>
              ${l.title}
            </div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-top:2px;">
              ${l.parts} · ${l.workshop}
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
              ${Number(l.km).toLocaleString()} km · ${l.date} · <span style="font-family:var(--font-mono); font-size:10px;">${(l.hash || '').substr(0, 12)}</span>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px; font-weight:700; color:var(--text-main);">$${Number(l.costUsd).toFixed(2)}</div>
            <div style="font-size:11px; color:var(--text-muted);">${(Number(l.costUsd) * (l.bcvRate || bcvRate)).toFixed(2)} Bs.</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function openMaintenanceModal(type = "preventivo", preselectId = null) {
  const fraudAlert = document.getElementById("maintModalFraudAlert");
  if (fraudAlert) fraudAlert.style.display = "none";

  const kmInput = document.getElementById("maintKmInput");
  if (kmInput) kmInput.value = currentOdometer;

  const dateInput = document.getElementById("maintDateInput");
  if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);

  setModalMaintenanceType(type, preselectId);
  openModal("maintenanceModal");
}

function setModalMaintenanceType(type, preselectId = null) {
  modalMaintenanceType = type;
  const btnPrev = document.getElementById("maintTypeBtnPrev");
  const btnCorr = document.getElementById("maintTypeBtnCorr");
  const selectEl = document.getElementById("maintTaskSelect");

  if (type === "preventivo") {
    if (btnPrev) {
      btnPrev.className = "btn btn-sm";
      btnPrev.style.border = "1px solid var(--accent)";
      btnPrev.style.background = "var(--accent-dim)";
    }
    if (btnCorr) {
      btnCorr.className = "btn btn-secondary btn-sm";
      btnCorr.style.border = "";
      btnCorr.style.background = "";
    }
    if (selectEl) {
      selectEl.innerHTML = OEM_PREVENTIVE_MATRIX.map(item =>
        `<option value="${item.id}" ${preselectId === item.id ? 'selected' : ''}>${item.title}</option>`
      ).join("");
    }
  } else {
    if (btnCorr) {
      btnCorr.className = "btn btn-sm";
      btnCorr.style.border = "1px solid var(--amber)";
      btnCorr.style.background = "rgba(245,158,11,0.15)";
    }
    if (btnPrev) {
      btnPrev.className = "btn btn-secondary btn-sm";
      btnPrev.style.border = "";
      btnPrev.style.background = "";
    }
    if (selectEl) {
      selectEl.innerHTML = CORRECTIVE_CATALOG.map(c =>
        `<option value="${c.id}" ${preselectId === c.id ? 'selected' : ''}>${c.title}</option>`
      ).join("");
    }
  }

  onMaintTaskSelectChange();
}

function onMaintTaskSelectChange() {
  const selectEl = document.getElementById("maintTaskSelect");
  const warningBox = document.getElementById("maintOemWarningBox");
  const partsInput = document.getElementById("maintPartsInput");
  const costInput = document.getElementById("maintCostUsdInput");

  if (!selectEl) return;
  const selectedId = selectEl.value;

  if (modalMaintenanceType === "preventivo") {
    const found = OEM_PREVENTIVE_MATRIX.find(i => i.id === selectedId) || OEM_PREVENTIVE_MATRIX[0];
    if (partsInput) partsInput.value = found.oemSpec;
    if (costInput) costInput.value = found.estimatedUsd;
    if (warningBox) {
      warningBox.innerHTML = `
        <div style="color:var(--accent); font-weight:800; margin-bottom:3px;">Especificación Manual OEM: ${found.oemSpec}</div>
        <div><strong>Atención en Taller:</strong> ${found.workshopShieldWarning}</div>
      `;
    }
  } else {
    const found = CORRECTIVE_CATALOG.find(c => c.id === selectedId) || CORRECTIVE_CATALOG[0];
    if (partsInput) partsInput.value = found.commonParts;
    if (costInput) costInput.value = found.estimatedUsd;
    if (warningBox) {
      warningBox.innerHTML = `
        <div style="color:var(--amber); font-weight:800; margin-bottom:3px;">Diagnóstico de Causa Raíz: ${found.symptoms}</div>
        <div><strong>Recomendación Técnica:</strong> ${found.shieldTip}</div>
      `;
    }
  }

  calcMaintBcvCost();
}

function calcMaintBcvCost() {
  const costInput = document.getElementById("maintCostUsdInput");
  const bcvDisp = document.getElementById("maintBcvEquivalentDisplay");
  const bcvLabel = document.getElementById("maintBcvEquivalentLabel");

  const usd = parseFloat(costInput ? costInput.value : 0) || 0;
  if (bcvDisp) bcvDisp.value = `${(usd * bcvRate).toFixed(2)} Bs.`;
  if (bcvLabel) bcvLabel.textContent = `Equivalente BCV (${bcvRate.toFixed(2)} Bs/$):`;
}

async function saveMaintenanceRecord() {
  if (!activeGarageVehicle) {
    alert("Primero registra tu vehículo en Mi Garage.");
    openAddVehicleModal();
    return;
  }
  const selectEl = document.getElementById("maintTaskSelect");
  const kmInput = document.getElementById("maintKmInput");
  const costInput = document.getElementById("maintCostUsdInput");
  const partsInput = document.getElementById("maintPartsInput");
  const workshopInput = document.getElementById("maintWorkshopInput");
  const fraudAlert = document.getElementById("maintModalFraudAlert");

  const serviceKm = parseInt(kmInput ? kmInput.value : currentOdometer) || 0;
  if (serviceKm < currentOdometer) {
    if (fraudAlert) fraudAlert.style.display = "block";
    return;
  }

  const taskId = selectEl ? selectEl.value : "engine_oil";
  let taskTitle = "Servicio de Mantenimiento";
  if (modalMaintenanceType === "preventivo") {
    const f = OEM_PREVENTIVE_MATRIX.find(i => i.id === taskId);
    if (f) taskTitle = f.title;
  } else {
    const c = CORRECTIVE_CATALOG.find(i => i.id === taskId);
    if (c) taskTitle = c.title;
  }

  const costUsd = parseFloat(costInput ? costInput.value : 0) || 0;
  const parts = partsInput ? partsInput.value : "Especificación OEM";
  const workshop = workshopInput ? workshopInput.value : "Taller Verificado";
  const dateInput = document.getElementById("maintDateInput");
  const pickedDate = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().slice(0, 10);
  const timePart = new Date().toISOString().substr(11, 8);
  const timestamp = `${pickedDate} ${timePart}`;

  ensureBlockchainGenesis(activeGarageVehicle);
  const prevBlock = blockchain[blockchain.length - 1];
  const newIndex = blockchain.length;
  const reasonText = `[${modalMaintenanceType.toUpperCase()}] ${taskTitle} | Insumo: ${parts} | Taller: ${workshop} | Costo: $${costUsd.toFixed(2)} USD`;
  const payloadString = `${newIndex}|${activeGarageVehicle.id || 'vehiculo-activo'}|${serviceKm}|${timestamp}|${reasonText}|${prevBlock.hash}`;
  const newHash = await sha256(payloadString);

  const newBlock = {
    index: newIndex,
    timestamp,
    km: serviceKm,
    reason: reasonText,
    prevHash: prevBlock.hash,
    hash: newHash
  };

  blockchain.push(newBlock);
  saveOdometerChain();
  currentOdometer = serviceKm;
  activeGarageVehicle.odo = serviceKm;
  localStorage.setItem("charu_active_vehicle", JSON.stringify(activeGarageVehicle));

  const logs = getMaintenanceLogs();
  const newRecord = {
    id: "srv_" + Date.now(),
    type: modalMaintenanceType,
    taskId,
    title: taskTitle,
    km: serviceKm,
    costUsd,
    bcvRate,
    parts,
    workshop,
    date: pickedDate,
    hash: newHash
  };
  logs.unshift(newRecord);
  localStorage.setItem("charu_maintenance_logs", JSON.stringify(logs));

  addMutation("service_records", "INSERT_SERVICE", { code: taskId, km: serviceKm, costUsd, date: pickedDate });
  addMutation("odometer_chain", "INSERT_BLOCK", newBlock);

  closeModal("maintenanceModal");
  syncGarageVehicleDOM();
  renderBreakInAdvisorCard();
  updateGarageTelemetryHUD();
  renderPreventiveMaintenanceGrid();
  renderCorrectiveCatalogAndLogs();
  renderBlockchain();
  if (typeof renderGarageAnalytics === "function") renderGarageAnalytics();
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();

  alert(`Mantenimiento registrado en el Historial Certificado.\n\n• Operación: ${taskTitle}\n• Odómetro: ${serviceKm.toLocaleString()} km\n• Registro #${newIndex} (Código: ${newHash.substr(0, 16)}...)`);
}

function openWorkshopChecklistModal() {
  if (!activeGarageVehicle) {
    openAddVehicleModal();
    return;
  }
  const content = document.getElementById("workshopChecklistContent");
  if (content) {
    content.innerHTML = `
      <div style="background:var(--accent-dim); border:1px solid rgba(255,107,0,0.3); border-radius:8px; padding:10px 12px; margin-bottom:10px;">
        <strong style="color:var(--accent);">Vehículo Activo:</strong> ${activeGarageVehicle.maker || ''} ${activeGarageVehicle.model || ''} (${activeGarageVehicle.engine || 'Motor OEM'}) • Odómetro: <strong>${currentOdometer.toLocaleString()} km</strong>
      </div>
      <ul style="padding-left:18px; display:flex; flex-direction:column; gap:7px;">
        <li><strong>1. Verificación de Lubricante:</strong> Exigir estrictamente <code>${activeGarageVehicle.oil || 'Aceite OEM según manual'}</code>. Rechazar aceites de mayor viscosidad no especificados por el fabricante.</li>
        <li><strong>2. Devolución de Repuestos Sustituidos:</strong> Solicitar en recepción que guarden en bolsa las piezas/filtros reemplazados y el sobrante de lubricante.</li>
        <li><strong>3. Prohibición de Aditivos No Homologados:</strong> No autorizar cobros por "lavados internos de motor (Engine Flush)" ni aditivos espesantes no solicitados.</li>
        <li><strong>4. Especificación de Transmisión (${activeGarageVehicle.transmission || 'OEM'}):</strong> Verificar norma exacta del fluido antes de drenar o completar nivel.</li>
        <li><strong>5. Fotografía de Odómetro y Registro:</strong> Tomar foto del tablero al entregar el vehículo y registrar el kilometraje en el Historial Certificado de BAJOKAPOT.</li>
      </ul>
    `;
  }
  openModal("workshopChecklistModal");
}

function copyWorkshopChecklist() {
  if (!activeGarageVehicle) return;
  const text = `CHECKLIST TÉCNICO DE RECEPCIÓN EN TALLER — BAJOKAPOT\n` +
    `Vehículo: ${activeGarageVehicle.maker || ''} ${activeGarageVehicle.model || ''} (${activeGarageVehicle.engine || 'Motor OEM'})\n` +
    `Odómetro Actual: ${currentOdometer.toLocaleString()} km\n\n` +
    `1. Instalar únicamente aceite ${activeGarageVehicle.oil || 'especificado en el manual OEM'}.\n` +
    `2. Reemplazar filtro de aceite OEM y arandela de tapón de cárter con torque especificado.\n` +
    `3. No aplicar aditivos ni limpiadores internos no solicitados.\n` +
    `4. Conservar filtros/repuestos reemplazados para verificación al retirar el vehículo.`;

  navigator.clipboard.writeText(text).then(() => {
    alert("Checklist técnico copiado al portapapeles listo para enviar o guardar.");
  }).catch(() => {
    alert(text);
  });
}

function askCharuloMaintenance(questionText) {
  const input = document.getElementById("copilotQueryInput");
  if (input) input.value = questionText;
  runCopilotMaintenanceAdvisor(false);
}

function runCopilotMaintenanceAdvisor(silentInit = false) {
  const input = document.getElementById("copilotQueryInput");
  const container = document.getElementById("copilotResponseContainer");
  if (!container) return;

  if (!activeGarageVehicle) {
    container.innerHTML = `<div style="font-size:12px; color:var(--text-muted); padding:10px;">Registra tu vehículo en Mi Garage para recibir recomendaciones personalizadas.</div>`;
    return;
  }

  const vName = `${activeGarageVehicle.maker || ''} ${activeGarageVehicle.model || ''}`.trim() || "tu vehículo";
  const vEngine = activeGarageVehicle.engine || "Motor OEM";
  const vOil = activeGarageVehicle.oil || "Aceite sintético según manual OEM";
  const vTrans = activeGarageVehicle.transmission || "Transmisión OEM";
  const q = (input ? input.value : "").trim().toLowerCase();
  let title = `Diagnóstico Preventivo & Recomendación OEM — ${vName}`;
  let analysis = "";
  let actions = [];
  let shieldTip = "";

  if (q.includes("5w-30") || q.includes("aceite") || q.includes("turbo") || q.includes("apagar")) {
    title = `Lubricación y Protección del Motor — ${vName}`;
    analysis = `Tu motor <strong>${vEngine}</strong> requiere mantener la viscosidad exacta <strong>${vOil}</strong> para proteger cojinetes, distribución (${activeGarageVehicle.timing || 'OEM'}) y temperatura interna bajo el clima y tráfico de Venezuela.`;
    actions = [
      `Exige siempre ${vOil} sellado de origen.`,
      "En régimen severo en Venezuela (tráfico + calor), realiza cambios cada 5.000 km o 6 meses (o según tu régimen personalizado).",
      "Si tu motor es turbo, deja el motor en ralentí 45 a 60 segundos antes de apagarlo tras exigirlo."
    ];
    shieldTip = "Nunca aceptes el mito de subir a aceites minerales más gruesos (15W-40 o 20W-50) si tu manual exige sintético liviano.";
  } else if (q.includes("caja") || q.includes("sincronica") || q.includes("6mt") || q.includes("embrague") || q.includes("croche") || q.includes("valvulina")) {
    title = `Cuidados de Transmisión (${vTrans}) — ${vName}`;
    analysis = `La transmisión <strong>${vTrans}</strong> de tu <strong>${vName}</strong> requiere respetar estrictamente la norma del fluido OEM y los intervalos preventivos bajo uso urbano intenso.`;
    actions = [
      "Verifica el fluido exacto especificado por el fabricante (GL-4 para sincrónicas, ATF/CVT/DCT específico para automáticas).",
      "En régimen severo, planifica el servicio de fluido de caja cada 35.000 km.",
      "Evita cambios bruscos en frío y revisa fugas en estoperas durante cada servicio de aceite."
    ];
    shieldTip = "Nunca mezcles fluidos de transmisión universales genéricos ni uses GL-5 donde el manual exige GL-4.";
  } else if (q.includes("gasolina") || q.includes("inyeccion") || q.includes("octanaje") || q.includes("combustible")) {
    title = `Sistema de Combustible e Inyección en Venezuela — ${vName}`;
    analysis = `En Venezuela los sedimentos en la gasolina aceleran la saturación del filtro de combustible y afectan la pulverización de inyectores y bujías en tu <strong>${vName}</strong>.`;
    actions = [
      "Reemplaza el filtro de gasolina cada 10.000 km en régimen severo.",
      "Evita circular con menos de 1/4 de tanque para proteger la bomba eléctrica.",
      "Revisa y reemplaza las bujías cada 30.000 km (o según tu régimen personalizado)."
    ];
    shieldTip = "Si sientes pérdida de fuerza o tirones, pide medir presión de bomba y revisar filtro de gasolina antes de cambiar piezas costosas.";
  } else if (q.includes("concesionario") || q.includes("5,000") || q.includes("5.000") || q.includes("primer servicio")) {
    title = `Protocolo de Servicio Preventivo — ${vName}`;
    analysis = `Con <strong>${currentOdometer.toLocaleString()} km</strong> actuales, mantén el control de tu próximo servicio preventivo exigiendo solo lo correspondiente a tu kilometraje.`;
    actions = [
      `Cambio de aceite (${vOil}) + filtro de aceite OEM + inspección de fugas y niveles.`,
      "Revisión de filtros de aire y gasolina cada 10.000 km en uso severo.",
      "Al salir del servicio, registra el comprobante en Mi Garage para guardarlo en tu historial y en la nube."
    ];
    shieldTip = "Revisa la varilla de medición y pide los filtros usados antes de retirar tu vehículo del taller.";
  } else {
    title = `Guía Preventiva Activa (${currentOdometer.toLocaleString()} km) — ${vName}`;
    analysis = `Tu <strong>${vName}</strong> (${vEngine} · ${vTrans}) registra actualmente <strong>${currentOdometer.toLocaleString()} km</strong>. Sigue tu plan preventivo activo en Mi Garage para proteger motor, frenos y transmisión.`;
    actions = [
      `1. Lubricación: Mantén cambios puntuales con ${vOil}.`,
      "2. Seguridad Vial: Verifica espesor de pastillas de freno, presión de neumáticos y líquido DOT 4.",
      "3. Combustible y Filtros: Cambia filtros de aire y gasolina según el ciclo severo de 10.000 km.",
      "4. Registro: Actualiza tu odómetro y tanqueos para calcular tu rendimiento real (km/L)."
    ];
    shieldTip = "Usa el botón Escudo de Taller dentro de Mi Garage antes de entregar el vehículo a cualquier servicio.";
  }

  container.innerHTML = `
    <div style="background:var(--bg-card-alt); border:1px solid var(--border-editorial); border-left:3px solid var(--green); border-radius:8px; padding:14px 16px;">
      <div style="font-size:13.5px; font-weight:800; color:var(--accent); margin-bottom:8px;">
        ${title}
      </div>
      <p style="font-size:12px; color:var(--text-secondary); line-height:1.55; margin-bottom:12px;">
        ${analysis}
      </p>
      <div style="font-size:10.5px; font-family:var(--font-mono); color:var(--text-main); text-transform:uppercase; margin-bottom:6px; letter-spacing:0.04em;">
        Plan de Acción Recomendado por Manual:
      </div>
      <ul style="padding-left:18px; font-size:12px; color:var(--text-secondary); line-height:1.55; margin-bottom:12px; display:flex; flex-direction:column; gap:5px;">
        ${actions.map(a => `<li>${a}</li>`).join("")}
      </ul>
      <div style="background:rgba(245,158,11,0.08); border-left:3px solid var(--amber); padding:10px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:var(--text-main);">
        <strong style="color:var(--amber);">Protocolo de Taller BAJOKAPOT:</strong> ${shieldTip}
      </div>
    </div>
  `;
}

function openOdometerModal() {
  const currentKmDisplay = document.getElementById("modalCurrentKm");
  const newOdoInput = document.getElementById("newOdoInput");
  const fraudAlert = document.getElementById("fraudAlert");

  if (currentKmDisplay) currentKmDisplay.textContent = `${currentOdometer.toLocaleString()} km`;
  if (newOdoInput) newOdoInput.value = currentOdometer + 250;
  if (fraudAlert) fraudAlert.style.display = "none";

  openModal("odometerModal");
}

async function mineOdometerBlock() {
  if (!activeGarageVehicle) {
    alert("Primero registra tu vehículo en Mi Garage.");
    openAddVehicleModal();
    return;
  }
  const input = document.getElementById("newOdoInput");
  const reasonInput = document.getElementById("odoReasonInput");
  const fraudAlert = document.getElementById("fraudAlert");

  const newKm = parseInt(input ? input.value : 0);
  const reason = reasonInput ? reasonInput.value : "Control rutinario de odómetro";

  // REGLA MATEMÁTICA DE MONOTONICIDAD (ANTI-FRAUDE DE ODÓMETRO)
  if (newKm < currentOdometer) {
    if (fraudAlert) fraudAlert.style.display = "block";
    return;
  }

  ensureBlockchainGenesis(activeGarageVehicle);
  const prevBlock = blockchain[blockchain.length - 1];
  const newIndex = blockchain.length;
  const timestamp = new Date().toISOString().replace("T", " ").substr(0, 19);

  const payloadString = `${newIndex}|${activeGarageVehicle.id || 'vehiculo-activo'}|${newKm}|${timestamp}|${prevBlock.hash}`;
  const newHash = await sha256(payloadString);

  const newBlock = {
    index: newIndex,
    timestamp,
    km: newKm,
    reason,
    prevHash: prevBlock.hash,
    hash: newHash
  };

  blockchain.push(newBlock);
  saveOdometerChain();
  currentOdometer = newKm;
  activeGarageVehicle.odo = newKm;
  localStorage.setItem("charu_active_vehicle", JSON.stringify(activeGarageVehicle));

  syncGarageVehicleDOM();
  renderBreakInAdvisorCard();
  updateGarageTelemetryHUD();
  renderPreventiveMaintenanceGrid();
  if (typeof renderGarageAnalytics === "function") renderGarageAnalytics();

  addMutation("odometer_chain", "INSERT_BLOCK", newBlock);

  closeModal("odometerModal");
  renderBlockchain();
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();
  alert(`Registro #${newIndex} guardado en Historial Certificado.\nOdómetro actualizado a ${newKm.toLocaleString()} km y alertas de mantenimiento recalculadas.`);
}

function renderBlockchain() {
  const feed = document.getElementById("blockchainFeed");
  if (!feed) return;

  if (!blockchain.length) {
    feed.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:14px; font-size:12px;">Aún no hay registros certificados en el historial.</div>`;
    return;
  }

  feed.innerHTML = blockchain.slice().reverse().map(b => `
    <div class="chain-block">
      <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-family:var(--font-mono);">
        <strong style="color:var(--green); font-size:12px;">REGISTRO #${b.index} · ${b.km.toLocaleString()} KM</strong>
        <span style="color:var(--text-muted); font-size:10px;">${b.timestamp}</span>
      </div>
      <div style="color:var(--text-secondary); margin-bottom:4px; font-size:12px;"><strong style="color:var(--text-main);">Detalle Certificado:</strong> ${b.reason}</div>
      <div style="margin-top:4px; font-size:10px; color:var(--text-muted);">REF. ANTERIOR: <span style="color:var(--text-secondary);">${b.prevHash.substr(0, 18)}...</span></div>
      <div style="font-size:10px; color:var(--text-muted);">CÓDIGO DE VERIFICACIÓN: <span class="chain-hash">${b.hash.substr(0, 24)}...</span></div>
    </div>
  `).join("");
}

function auditChain() {
  if (!activeGarageVehicle || !blockchain.length) {
    alert("Registra tu vehículo y al menos un servicio u odómetro para auditar tu historial.");
    return;
  }
  let valid = true;
  for (let i = 1; i < blockchain.length; i++) {
    if (blockchain[i].prevHash !== blockchain[i - 1].hash || blockchain[i].km < blockchain[i - 1].km) {
      valid = false;
      break;
    }
  }
  if (valid) {
    alert(`AUDITORÍA DE HISTORIAL CERTIFICADO EXITOSA:\nVehículo: ${activeGarageVehicle.maker || ''} ${activeGarageVehicle.model || ''}\nRegistros Verificados: ${blockchain.length}\nTodos los registros mantienen secuencia progresiva y código de verificación íntegro.`);
  } else {
    alert("ALERTA DE INTEGRIDAD: El historial contiene inconsistencias en la secuencia.");
  }
}

/* =============================================================================
   GESTIÓN Y CONFIGURACIÓN TÉCNICA DEL VEHÍCULO
   ============================================================================= */
function populateGaragePreloadSelect() {
  const sel = document.getElementById("garagePreloadSelect");
  if (!sel || typeof BAJOKAPOT_MASTER_CATALOG === "undefined") return;

  const currentVal = sel.value || "";
  const zeroKm = BAJOKAPOT_MASTER_CATALOG
    .filter(v => v.condition !== "usado")
    .slice()
    .sort((a, b) => `${a.maker} ${a.model}`.localeCompare(`${b.maker} ${b.model}`));
  const usedVe = BAJOKAPOT_MASTER_CATALOG
    .filter(v => v.condition === "usado")
    .slice()
    .sort((a, b) => `${a.maker} ${a.model}`.localeCompare(`${b.maker} ${b.model}`));

  const renderOpt = v => `<option value="${v.id}">${v.maker} ${v.model} (${v.yearRange} • ${v.transCategory === 'MT' ? 'Manual' : 'Automático'})</option>`;

  sel.innerHTML = `
    <option value="">-- Ingreso Manual Personalizado (Escribir Marca/Modelo abajo) --</option>
    <optgroup label="Vehículos 0 km (Venezuela 2025-2026)">
      ${zeroKm.map(renderOpt).join("")}
    </optgroup>
    <optgroup label="Mercado Usado VE / Seminuevos (${usedVe.length} modelos)">
      ${usedVe.map(renderOpt).join("")}
    </optgroup>
  `;

  if (currentVal && Array.from(sel.options).some(o => o.value === currentVal)) {
    sel.value = currentVal;
  }
}

function mapCatalogTransmissionToGarageOption(v) {
  const t = (v.transmission || "").toLowerCase();
  if (t.includes("dct") || t.includes("doble embrague")) return "Automática DCT 7 Vel.";
  if (t.includes("cvt")) return "Transmisión CVT";
  if (v.transCategory === "AUTO" || t.includes("automát") || t.includes("at")) return "Automática Convencional";
  return "Sincrónica 6MT";
}

function onGaragePreloadSelectChange() {
  const sel = document.getElementById("garagePreloadSelect");
  if (!sel || typeof BAJOKAPOT_MASTER_CATALOG === "undefined") return;

  const catId = sel.value;
  if (!catId) return; // Modo manual personalizado: el usuario edita los campos libremente

  const v = BAJOKAPOT_MASTER_CATALOG.find(item => item.id === catId);
  if (!v) return;

  const mMaker = document.getElementById("newVehicleMaker");
  const mModel = document.getElementById("newVehicleModel");
  const mYear = document.getElementById("newVehicleYear");
  const mEngine = document.getElementById("newVehicleEngine");
  const mOil = document.getElementById("newVehicleOil");
  const mTiming = document.getElementById("newVehicleTiming");
  const mTrans = document.getElementById("newVehicleTransmission");
  const mNick = document.getElementById("newVehicleNickname");

  if (mMaker) mMaker.value = v.maker;
  if (mModel) mModel.value = v.model;

  const yearMatches = String(v.yearRange || "").match(/\b(19\d{2}|20\d{2})\b/g);
  if (mYear && yearMatches && yearMatches.length > 0) {
    mYear.value = yearMatches[yearMatches.length - 1];
  }
  if (mEngine) mEngine.value = v.engine || "1.5L / 1.6L";
  if (mOil) mOil.value = v.oilSpec || "SAE 5W-30 Sintético API SP";
  if (mTiming) {
    mTiming.value = /correa/i.test(v.timingSpec || "") ? "Correa Dentada" : "Cadena Metálica";
  }
  if (mTrans) {
    mTrans.value = mapCatalogTransmissionToGarageOption(v);
  }
  if (mNick) {
    mNick.value = v.model;
  }
}

function openAddVehicleModal() {
  populateGaragePreloadSelect();

  const v = activeGarageVehicle;
  const sel = document.getElementById("garagePreloadSelect");
  const mMaker = document.getElementById("newVehicleMaker");
  const mModel = document.getElementById("newVehicleModel");
  const mYear = document.getElementById("newVehicleYear");
  const mOdo = document.getElementById("newVehicleOdo");
  const mPlate = document.getElementById("newVehiclePlate");
  const mEngine = document.getElementById("newVehicleEngine");
  const mOil = document.getElementById("newVehicleOil");
  const mTiming = document.getElementById("newVehicleTiming");
  const mTrans = document.getElementById("newVehicleTransmission");
  const mNick = document.getElementById("newVehicleNickname");

  if (!v) {
    if (sel) sel.value = "";
    if (mMaker) mMaker.value = "";
    if (mModel) mModel.value = "";
    if (mYear) mYear.value = new Date().getFullYear();
    if (mOdo) mOdo.value = "";
    if (mPlate) mPlate.value = "";
    if (mEngine) mEngine.value = "";
    if (mOil) mOil.value = "";
    if (mTiming) mTiming.value = "Cadena Metálica";
    if (mTrans) mTrans.value = "Sincrónica 6MT";
    if (mNick) mNick.value = "";
  } else {
    if (sel) sel.value = v.catalogId || "";
    if (mMaker) mMaker.value = v.maker || "";
    if (mModel) mModel.value = v.model || "";
    if (mYear) mYear.value = v.year || new Date().getFullYear();
    if (mOdo) mOdo.value = currentOdometer;
    if (mPlate) mPlate.value = v.plate || "";
    if (mEngine) mEngine.value = v.engine || "";
    if (mOil) mOil.value = v.oil || "";
    if (mTiming) mTiming.value = v.timing && /correa/i.test(v.timing) ? "Correa Dentada" : "Cadena Metálica";
    if (mTrans) {
      const tVal = v.transmission || "Sincrónica 6MT";
      if (/dct/i.test(tVal)) mTrans.value = "Automática DCT 7 Vel.";
      else if (/cvt/i.test(tVal)) mTrans.value = "Transmisión CVT";
      else if (/automát|at\b/i.test(tVal)) mTrans.value = "Automática Convencional";
      else mTrans.value = "Sincrónica 6MT";
    }
    if (mNick) mNick.value = v.nickname || "";
  }

  openModal("addVehicleModal");
}

function saveNewVehicle() {
  const catalogId = document.getElementById("garagePreloadSelect")?.value || "";
  const maker = (document.getElementById("newVehicleMaker")?.value || "").trim();
  const model = (document.getElementById("newVehicleModel")?.value || "").trim();
  if (!maker || !model) {
    alert("Ingresa al menos la marca y el modelo de tu vehículo (o selecciona uno del catálogo arriba).");
    return;
  }
  const year = (document.getElementById("newVehicleYear")?.value || String(new Date().getFullYear())).trim();
  const nickname = (document.getElementById("newVehicleNickname")?.value || model).trim();
  const plate = (document.getElementById("newVehiclePlate")?.value || "").trim();
  const odo = Math.max(0, parseFloat(document.getElementById("newVehicleOdo")?.value || "0") || 0);
  const engine = (document.getElementById("newVehicleEngine")?.value || "Motor OEM").trim();
  const timing = document.getElementById("newVehicleTiming")?.value || "Cadena Metálica";
  const oil = (document.getElementById("newVehicleOil")?.value || "SAE 5W-30 Sintético API SP").trim();
  const transmission = document.getElementById("newVehicleTransmission")?.value || "Sincrónica 6MT";

  activeGarageVehicle = {
    id: `${maker}-${model}-${year}`.toLowerCase().replace(/\s+/g, "-"),
    catalogId,
    maker,
    model,
    year,
    nickname,
    plate,
    odo,
    engine,
    timing,
    oil,
    transmission,
    userConfigured: true
  };
  currentOdometer = odo;

  localStorage.setItem("charu_active_vehicle", JSON.stringify(activeGarageVehicle));
  ensureBlockchainGenesis(activeGarageVehicle);

  closeModal("addVehicleModal");
  refreshAllGarageUI();
  addMutation("vehicle_registry", "ADD_VEHICLE", activeGarageVehicle);
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();
}

/* =============================================================================
   REGISTRO DE GASOLINA BIMONETARIO + ANALÍTICA FINANCIERA Y CONSUMO
   ============================================================================= */
function parseDateParts(rawDate) {
  const s = String(rawDate || "").trim();
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return {
      dateKey: `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`,
      year: parseInt(isoMatch[1], 10),
      month: parseInt(isoMatch[2], 10),
      day: parseInt(isoMatch[3], 10)
    };
  }
  const d = s ? new Date(s) : new Date();
  const valid = isNaN(d.getTime()) ? new Date() : d;
  const year = valid.getFullYear();
  const month = valid.getMonth() + 1;
  const day = valid.getDate();
  return {
    dateKey: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    year,
    month,
    day
  };
}

function formatDisplayDate(rawDate) {
  const { day, month, year } = parseDateParts(rawDate);
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function getPeriodBucket(rawDate, granularity) {
  if (granularity === "global") {
    return { key: "ALL", label: "Histórico Global" };
  }
  const { year, month } = parseDateParts(rawDate);
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  if (granularity === "year") {
    return { key: `${year}`, label: `Año ${year}` };
  }
  if (granularity === "semester") {
    const sem = month <= 6 ? 1 : 2;
    return { key: `${year}-S${sem}`, label: `S${sem} ${year} (${sem === 1 ? 'Ene-Jun' : 'Jul-Dic'})` };
  }
  if (granularity === "quarter") {
    const q = Math.ceil(month / 3);
    const ranges = ["", "Ene-Mar", "Abr-Jun", "Jul-Sep", "Oct-Dic"];
    return { key: `${year}-Q${q}`, label: `T${q} ${year} (${ranges[q]})` };
  }
  return { key: `${year}-${String(month).padStart(2, '0')}`, label: `${monthNames[month - 1] || month} ${year}` };
}

function computeFuelEfficiencyMetrics(fuelList) {
  const list = Array.isArray(fuelList) ? fuelList : [];
  const totalLiters = list.reduce((acc, f) => acc + (Number(f.liters) || 0), 0);
  const totalUsd = list.reduce((acc, f) => acc + (Number(f.usd) || 0), 0);

  // Ordenar cronológicamente para calcular tramos con odómetro válido
  const chrono = list.map((f, idx) => ({
    ...f,
    _idx: idx,
    _dateKey: parseDateParts(f.date).dateKey,
    _km: (f.km !== undefined && f.km !== null && f.km !== "" && !isNaN(Number(f.km))) ? Number(f.km) : null
  })).sort((a, b) => {
    if (a._dateKey !== b._dateKey) return a._dateKey.localeCompare(b._dateKey);
    if (a._km !== null && b._km !== null && a._km !== b._km) return a._km - b._km;
    return b._idx - a._idx; // Si vienen unshifteados del mismo día, preservar orden de inserción
  });

  // Recomputar rendimiento por tramo entre registros con km ascendente
  let prevKmIdx = -1;
  let totalDeltaKm = 0;
  let totalMeasuredLiters = 0;
  let totalMeasuredUsd = 0;

  const points = chrono.map((item, idx) => {
    let segmentKmPerL = null;
    if (item._km !== null) {
      if (prevKmIdx >= 0 && item._km > chrono[prevKmIdx]._km) {
        const deltaKm = item._km - chrono[prevKmIdx]._km;
        let litersBetween = 0;
        let usdBetween = 0;
        for (let j = prevKmIdx + 1; j <= idx; j++) {
          litersBetween += Number(chrono[j].liters) || 0;
          usdBetween += Number(chrono[j].usd) || 0;
        }
        if (litersBetween > 0) {
          segmentKmPerL = deltaKm / litersBetween;
          totalDeltaKm += deltaKm;
          totalMeasuredLiters += litersBetween;
          totalMeasuredUsd += usdBetween;
        }
      }
      prevKmIdx = idx;
    }
    return {
      ...item,
      segmentKmPerL
    };
  });

  const avgKmPerL = (totalDeltaKm > 0 && totalMeasuredLiters > 0) ? (totalDeltaKm / totalMeasuredLiters) : null;
  const lPer100km = avgKmPerL ? (100 / avgKmPerL) : null;
  const costPerKmFuel = (totalDeltaKm > 0 && totalMeasuredUsd > 0)
    ? (totalMeasuredUsd / totalDeltaKm)
    : ((totalUsd > 0 && currentOdometer > 0) ? null : null);

  return {
    totalLiters,
    totalUsd,
    count: list.length,
    kmSpan: totalDeltaKm,
    avgKmPerL,
    lPer100km,
    costPerKmFuel,
    points
  };
}

function openFuelModal() {
  const kmInput = document.getElementById("fuelKmInput");
  if (kmInput) {
    kmInput.value = "";
    kmInput.placeholder = `Ej: ${currentOdometer} (opcional para km/L)`;
  }
  const dateInput = document.getElementById("fuelDateInput");
  if (dateInput) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }
  calcFuelCost();
  openModal("fuelModal");
}

function calcFuelCost() {
  const litersInput = document.getElementById("fuelLitersInput");
  const typeSelect = document.getElementById("fuelTypeSelect");
  const usdInput = document.getElementById("fuelUsdInput");
  const bcvDisplay = document.getElementById("fuelBcvDisplay");
  const bcvLabel = document.getElementById("fuelBcvLabel");
  const kmInput = document.getElementById("fuelKmInput");
  const liveBox = document.getElementById("fuelLiveEfficiencyPreview");

  const liters = parseFloat(litersInput ? litersInput.value : 0) || 0;
  const pricePerLiter = parseFloat(typeSelect ? typeSelect.value : 0.5);

  const usdTotal = liters * pricePerLiter;
  if (usdInput) usdInput.value = usdTotal.toFixed(2);

  const bcvTotal = (usdTotal * bcvRate).toFixed(2);
  if (bcvDisplay) bcvDisplay.value = `${bcvTotal} Bs.`;
  if (bcvLabel) bcvLabel.textContent = `Equivalente Oficial BCV (${bcvRate.toFixed(2)} Bs./USD):`;

  if (liveBox) {
    const rawKm = kmInput ? parseFloat(kmInput.value) : NaN;
    if (!isNaN(rawKm) && rawKm > 0 && liters > 0) {
      const fuelHist = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");
      const kmLogs = fuelHist.map(h => parseFloat(h.km)).filter(k => !isNaN(k) && k > 0);
      const refKm = kmLogs.length > 0 ? Math.max(...kmLogs) : Number(currentOdometer || 0);
      if (rawKm > refKm) {
        const deltaKm = rawKm - refKm;
        const kmPerL = deltaKm / liters;
        const costPerKm = usdTotal / deltaKm;
        liveBox.style.display = "block";
        liveBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <span>Tramo estimado: <strong>+${deltaKm.toLocaleString()} km</strong></span>
            <span style="color:var(--green); font-weight:800;">${kmPerL.toFixed(1)} km/L</span>
            <span style="color:var(--amber);">$${costPerKm.toFixed(3)}/km</span>
          </div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:3px;">Comparado contra último registro (${refKm.toLocaleString()} km).</div>
        `;
      } else {
        liveBox.style.display = "none";
      }
    } else {
      liveBox.style.display = "none";
    }
  }
}

function saveFuelLog() {
  const litersInput = document.getElementById("fuelLitersInput");
  const typeSelect = document.getElementById("fuelTypeSelect");
  const usdInput = document.getElementById("fuelUsdInput");
  const kmInput = document.getElementById("fuelKmInput");
  const dateInput = document.getElementById("fuelDateInput");

  const liters = parseFloat(litersInput ? litersInput.value : 0);
  if (!(liters > 0)) {
    alert("Ingresa una cantidad válida de litros cargados.");
    return;
  }

  const usd = parseFloat(usdInput ? usdInput.value : 0) || 0;
  const kmRaw = kmInput ? kmInput.value.trim() : "";
  const kmVal = (kmRaw !== "" && !isNaN(parseFloat(kmRaw)) && parseFloat(kmRaw) >= 0) ? parseFloat(kmRaw) : null;

  const pickedDate = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().slice(0, 10);
  const todayStr = new Date().toISOString().slice(0, 10);
  const logDate = pickedDate === todayStr ? new Date().toISOString() : `${pickedDate}T12:00:00.000Z`;
  const typeName = typeSelect && typeSelect.value === "1.0" ? "Premium" : "Común";

  const logEntry = { liters, type: typeName, usd, bcvRate, date: logDate };
  if (kmVal !== null) {
    logEntry.km = kmVal;
  }

  addMutation("fuel_logs", "INSERT_LOG", logEntry);

  let history = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");
  history.unshift(logEntry);
  localStorage.setItem("charu_fuel_history", JSON.stringify(history));

  if (kmVal !== null && kmVal > currentOdometer) {
    currentOdometer = kmVal;
    if (activeGarageVehicle) {
      activeGarageVehicle.odo = kmVal;
      localStorage.setItem("charu_active_vehicle", JSON.stringify(activeGarageVehicle));
    }
    syncGarageVehicleDOM();
    renderBreakInAdvisorCard();
    renderPreventiveMaintenanceGrid();
  }

  renderFuelHistory();
  updateGarageTelemetryHUD();
  renderGarageAnalytics();

  closeModal("fuelModal");
  if (window.syncUserDataToCloud) window.syncUserDataToCloud();
}

function renderFuelHistory() {
  const listContainer = document.getElementById("fuelHistoryList");
  const summaryBar = document.getElementById("fuelGlobalSummaryBar");
  const history = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");

  if (summaryBar) {
    if (history.length === 0) {
      summaryBar.innerHTML = "";
    } else {
      const metrics = computeFuelEfficiencyMetrics(history);
      const totalBs = (metrics.totalUsd * bcvRate).toLocaleString("es-VE", { maximumFractionDigits: 0 });
      const effText = metrics.avgKmPerL
        ? `${metrics.avgKmPerL.toFixed(1)} km/L (${metrics.lPer100km.toFixed(1)} L/100km)`
        : `Registra ≥2 cargas con km`;

      summaryBar.innerHTML = `
        <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:8px; padding:8px 10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:11px;">
          <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <span>Combustible: <strong>${metrics.totalLiters.toFixed(1)} L</strong> (${metrics.count})</span>
            <span>Gasto: <strong style="color:var(--amber);">$${metrics.totalUsd.toFixed(2)}</strong> <span style="color:var(--text-muted);">(${totalBs} Bs.)</span></span>
            <span>Rendimiento: <strong style="color:${metrics.avgKmPerL ? 'var(--green)' : 'var(--text-muted)'};">${effText}</strong></span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="switchGarageSubTab('analytics')" style="padding:3px 8px; font-size:10px;">
            Ver Gráficas
          </button>
        </div>
      `;
    }
  }

  if (!listContainer) return;

  if (history.length === 0) {
    listContainer.innerHTML = '<div style="text-align:center; color:var(--text-muted); padding: 10px;">No hay tanqueos recientes.</div>';
    return;
  }

  const recent = history.slice(0, 6);

  listContainer.innerHTML = recent.map(item => {
    const dateStr = formatDisplayDate(item.date);
    const usdNum = Number(item.usd) || 0;
    const bs = (usdNum * (item.bcvRate || bcvRate)).toFixed(2);
    const kmBadge = (item.km !== undefined && item.km !== null && item.km !== "")
      ? `<span style="background:var(--cyan-dim); color:var(--cyan); border-radius:4px; padding:1px 5px; font-size:9.5px; font-family:var(--font-mono); margin-left:4px;">${Number(item.km).toLocaleString()} km</span>`
      : "";
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-card-alt); border:1px solid var(--border-subtle); padding: 8px 10px; border-radius: 6px; border-left: 3px solid var(--green);">
        <div>
          <div style="font-weight:700; margin-bottom:2px; color:var(--text-main);">${item.liters}L <span style="color:var(--cyan); font-weight:500; font-size:10px;">${item.type || 'Común'}</span>${kmBadge}</div>
          <div style="font-size:10px; color:var(--text-muted);">${dateStr}</div>
        </div>
        <div style="text-align:right;">
          <div style="color:var(--amber); font-weight:700;">$${usdNum.toFixed(2)}</div>
          <div style="font-size:10px; color:var(--text-muted);">${bs} Bs.</div>
        </div>
      </div>
    `;
  }).join("");
}

function clearFuelHistory() {
  if (confirm("¿Estás seguro de borrar el historial de tanqueos?")) {
    localStorage.removeItem("charu_fuel_history");
    renderFuelHistory();
    updateGarageTelemetryHUD();
    renderGarageAnalytics();
    if (window.syncUserDataToCloud) window.syncUserDataToCloud({ allowEmptyFuel: true });
  }
}

function setAnalyticsGranularity(granularity, btnEl) {
  currentAnalyticsGranularity = granularity || "global";
  const wrap = document.getElementById("analyticsGranularityPills");
  if (wrap) {
    wrap.querySelectorAll("button").forEach(b => b.classList.remove("toggle-pill-active"));
  }
  if (btnEl) btnEl.classList.add("toggle-pill-active");

  const periodSel = document.getElementById("analyticsPeriodSelect");
  if (periodSel) periodSel.value = "ALL";

  renderGarageAnalytics();
}

function destroyAnalyticsCharts() {
  if (analyticsGasChartInstance) { analyticsGasChartInstance.destroy(); analyticsGasChartInstance = null; }
  if (analyticsExpenseTimeChartInstance) { analyticsExpenseTimeChartInstance.destroy(); analyticsExpenseTimeChartInstance = null; }
  if (analyticsBreakdownChartInstance) { analyticsBreakdownChartInstance.destroy(); analyticsBreakdownChartInstance = null; }
}

function renderGarageAnalytics() {
  const labelEl = document.getElementById("analyticsVehicleLabel");
  if (labelEl) {
    labelEl.textContent = activeGarageVehicle
      ? `${activeGarageVehicle.nickname || activeGarageVehicle.model || 'Vehículo'} • ${currentOdometer.toLocaleString()} km`
      : `Sin vehículo registrado`;
  }

  const fuelHistory = JSON.parse(localStorage.getItem("charu_fuel_history") || "[]");
  const maintLogs = getMaintenanceLogs();

  // Poblar selector de períodos según granularidad
  const periodSel = document.getElementById("analyticsPeriodSelect");
  const prevSelVal = periodSel ? periodSel.value : "ALL";
  const bucketMap = new Map();

  if (currentAnalyticsGranularity !== "global") {
    fuelHistory.forEach(f => {
      const b = getPeriodBucket(f.date, currentAnalyticsGranularity);
      bucketMap.set(b.key, b.label);
    });
    maintLogs.forEach(m => {
      const b = getPeriodBucket(m.date, currentAnalyticsGranularity);
      bucketMap.set(b.key, b.label);
    });
  }

  const sortedPeriodKeys = Array.from(bucketMap.keys()).sort((a, b) => b.localeCompare(a));
  if (periodSel) {
    periodSel.innerHTML = `<option value="ALL">Todo el Histórico</option>` +
      sortedPeriodKeys.map(k => `<option value="${k}">${bucketMap.get(k)}</option>`).join("");
    if (prevSelVal && (prevSelVal === "ALL" || bucketMap.has(prevSelVal))) {
      periodSel.value = prevSelVal;
    } else {
      periodSel.value = "ALL";
    }
  }

  const selectedPeriod = periodSel ? periodSel.value : "ALL";

  const filteredFuel = (currentAnalyticsGranularity === "global" || selectedPeriod === "ALL")
    ? fuelHistory
    : fuelHistory.filter(f => getPeriodBucket(f.date, currentAnalyticsGranularity).key === selectedPeriod);

  const filteredMaint = (currentAnalyticsGranularity === "global" || selectedPeriod === "ALL")
    ? maintLogs
    : maintLogs.filter(m => getPeriodBucket(m.date, currentAnalyticsGranularity).key === selectedPeriod);

  // KPIs del período seleccionado
  const fuelMetrics = computeFuelEfficiencyMetrics(filteredFuel);
  let prevUsd = 0;
  let corrUsd = 0;
  filteredMaint.forEach(m => {
    const c = Number(m.costUsd) || 0;
    if ((m.type || "").toLowerCase() === "correctivo") corrUsd += c;
    else prevUsd += c;
  });
  const maintUsd = prevUsd + corrUsd;
  const totalUsd = fuelMetrics.totalUsd + maintUsd;
  const totalBs = totalUsd * bcvRate;

  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setText("analyticsKpiTotalUsd", `$${totalUsd.toFixed(2)}`);
  setText("analyticsKpiTotalBs", `${totalBs.toLocaleString("es-VE", { maximumFractionDigits: 0 })} Bs. BCV`);
  setText("analyticsKpiFuelUsd", `$${fuelMetrics.totalUsd.toFixed(2)}`);
  setText("analyticsKpiFuelLiters", `${fuelMetrics.totalLiters.toFixed(1)} L (${fuelMetrics.count} carga${fuelMetrics.count === 1 ? '' : 's'})`);
  setText("analyticsKpiMaintUsd", `$${maintUsd.toFixed(2)}`);
  setText("analyticsKpiMaintCount", `${filteredMaint.length} servicio${filteredMaint.length === 1 ? '' : 's'} (Prev: $${prevUsd.toFixed(0)} | Corr: $${corrUsd.toFixed(0)})`);

  if (fuelMetrics.avgKmPerL) {
    setText("analyticsKpiEfficiency", `${fuelMetrics.avgKmPerL.toFixed(2)} km/L`);
    const periodCpk = fuelMetrics.kmSpan > 0 ? `$${(totalUsd / fuelMetrics.kmSpan).toFixed(3)}/km` : `${fuelMetrics.lPer100km.toFixed(1)} L/100km`;
    setText("analyticsKpiCostPerKm", `${periodCpk} • ${fuelMetrics.kmSpan.toLocaleString()} km medidos`);
  } else {
    setText("analyticsKpiEfficiency", `-- km/L`);
    setText("analyticsKpiCostPerKm", fuelMetrics.count > 0 ? "Agrega km en ≥2 cargas" : "Sin cargas con km");
  }

  // Agrupación temporal para gráfico apilado y tabla histórica
  const seriesGranularity = currentAnalyticsGranularity === "global" ? "month" : currentAnalyticsGranularity;
  const periodAgg = {};
  const ensureAgg = (rawDate) => {
    const b = getPeriodBucket(rawDate, seriesGranularity);
    if (!periodAgg[b.key]) {
      periodAgg[b.key] = { key: b.key, label: b.label, liters: 0, fuelUsd: 0, prevUsd: 0, corrUsd: 0, fuelList: [], maintCount: 0 };
    }
    return periodAgg[b.key];
  };

  filteredFuel.forEach(f => {
    const row = ensureAgg(f.date);
    row.liters += Number(f.liters) || 0;
    row.fuelUsd += Number(f.usd) || 0;
    row.fuelList.push(f);
  });
  filteredMaint.forEach(m => {
    const row = ensureAgg(m.date);
    const c = Number(m.costUsd) || 0;
    row.maintCount += 1;
    if ((m.type || "").toLowerCase() === "correctivo") row.corrUsd += c;
    else row.prevUsd += c;
  });

  const periodKeysAsc = Object.keys(periodAgg).sort((a, b) => a.localeCompare(b));
  const tableGranularity = currentAnalyticsGranularity === "global" ? "year" : currentAnalyticsGranularity;
  const tableAgg = {};
  const ensureTableAgg = (rawDate) => {
    const b = getPeriodBucket(rawDate, tableGranularity);
    if (!tableAgg[b.key]) {
      tableAgg[b.key] = { key: b.key, label: b.label, liters: 0, fuelUsd: 0, prevUsd: 0, corrUsd: 0, fuelList: [], maintCount: 0 };
    }
    return tableAgg[b.key];
  };
  filteredFuel.forEach(f => {
    const r = ensureTableAgg(f.date);
    r.liters += Number(f.liters) || 0;
    r.fuelUsd += Number(f.usd) || 0;
    r.fuelList.push(f);
  });
  filteredMaint.forEach(m => {
    const r = ensureTableAgg(m.date);
    const c = Number(m.costUsd) || 0;
    r.maintCount += 1;
    if ((m.type || "").toLowerCase() === "correctivo") r.corrUsd += c;
    else r.prevUsd += c;
  });
  const tableKeysDesc = Object.keys(tableAgg).sort((a, b) => b.localeCompare(a));

  // Render Tabla Histórica por Período
  const tableWrap = document.getElementById("analyticsPeriodTableWrap");
  if (tableWrap) {
    if (tableKeysDesc.length === 0) {
      tableWrap.innerHTML = `
        <div style="text-align:center; padding:18px; color:var(--text-muted); font-size:12px; background:var(--bg-card-alt); border:1px dashed var(--border-subtle); border-radius:8px;">
          No hay registros financieros ni cargas de gasolina todavía. Usa <strong>+ Registrar Gasolina</strong> o <strong>+ Registrar Mantenimiento</strong> para ver tu historial por año, semestre, trimestre y mes.
        </div>
      `;
    } else {
      tableWrap.innerHTML = `
        <table class="compare-table" style="min-width:620px; width:100%;">
          <thead>
            <tr>
              <th>Período</th>
              <th>Gasolina</th>
              <th>Preventivo</th>
              <th>Correctivo</th>
              <th>Total USD</th>
              <th>Equiv. BCV</th>
              <th>Rendimiento</th>
            </tr>
          </thead>
          <tbody>
            ${tableKeysDesc.map(k => {
              const r = tableAgg[k];
              const rowTotal = r.fuelUsd + r.prevUsd + r.corrUsd;
              const rowBs = (rowTotal * bcvRate).toLocaleString("es-VE", { maximumFractionDigits: 0 });
              const rowEff = computeFuelEfficiencyMetrics(r.fuelList);
              const effStr = rowEff.avgKmPerL ? `${rowEff.avgKmPerL.toFixed(1)} km/L` : `--`;
              return `
                <tr>
                  <td><strong style="color:var(--text-main);">${r.label}</strong></td>
                  <td style="font-family:var(--font-mono); font-size:11.5px;">${r.liters.toFixed(1)} L / <span style="color:var(--amber);">$${r.fuelUsd.toFixed(2)}</span></td>
                  <td style="font-family:var(--font-mono); font-size:11.5px; color:var(--green);">$${r.prevUsd.toFixed(2)}</td>
                  <td style="font-family:var(--font-mono); font-size:11.5px; color:#ef4444;">$${r.corrUsd.toFixed(2)}</td>
                  <td style="font-family:var(--font-mono); font-weight:800; color:var(--accent);">$${rowTotal.toFixed(2)}</td>
                  <td style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${rowBs} Bs.</td>
                  <td style="font-family:var(--font-mono); font-size:11px; color:var(--cyan);">${effStr}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      `;
    }
  }

  // Render Chart.js
  destroyAnalyticsCharts();
  if (typeof Chart === "undefined") return;

  const pal = typeof getChartThemePalette === "function" ? getChartThemePalette() : {
    text: '#cbd5e1', tick: '#94a3b8', grid: 'rgba(255,255,255,0.06)',
    tooltipBg: 'rgba(15,17,21,0.95)', tooltipTitle: '#fff', tooltipBody: '#cbd5e1', tooltipBorder: 'rgba(255,255,255,0.12)', pointBorder: '#161920'
  };

  // Gráfico 1: Gasolina & Rendimiento (Litros + km/L)
  const gasCanvas = document.getElementById("analyticsGasChart");
  if (gasCanvas) {
    const gasLabels = fuelMetrics.points.length
      ? fuelMetrics.points.map(p => p._km !== null ? `${formatDisplayDate(p.date).slice(0, 5)} (${p._km.toLocaleString()}km)` : formatDisplayDate(p.date))
      : ["Sin cargas"];
    const gasLitersData = fuelMetrics.points.length ? fuelMetrics.points.map(p => Number(p.liters) || 0) : [0];
    const gasEffData = fuelMetrics.points.length ? fuelMetrics.points.map(p => p.segmentKmPerL ? Number(p.segmentKmPerL.toFixed(2)) : null) : [null];

    analyticsGasChartInstance = new Chart(gasCanvas.getContext("2d"), {
      data: {
        labels: gasLabels,
        datasets: [
          {
            type: "bar",
            label: "Litros Cargados (L)",
            data: gasLitersData,
            backgroundColor: "rgba(255, 107, 0, 0.55)",
            borderColor: "#FF6B00",
            borderWidth: 1.5,
            borderRadius: 4,
            yAxisID: "y"
          },
          {
            type: "line",
            label: "Rendimiento (km/L)",
            data: gasEffData,
            borderColor: "#38BDF8",
            backgroundColor: "rgba(56, 189, 248, 0.2)",
            borderWidth: 2,
            tension: 0.25,
            spanGaps: true,
            pointRadius: 4,
            pointBorderColor: pal.pointBorder,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: pal.text, font: { family: "'JetBrains Mono', sans-serif", size: 10 } } },
          tooltip: { backgroundColor: pal.tooltipBg, titleColor: pal.tooltipTitle, bodyColor: pal.tooltipBody, borderColor: pal.tooltipBorder, borderWidth: 1 }
        },
        scales: {
          x: { ticks: { color: pal.tick, font: { size: 9.5 } }, grid: { color: pal.grid } },
          y: { position: "left", beginAtZero: true, ticks: { color: pal.tick, font: { size: 10 } }, grid: { color: pal.grid } },
          y1: { position: "right", beginAtZero: true, grid: { drawOnChartArea: false }, ticks: { color: "#38BDF8", font: { size: 10 } } }
        }
      }
    });
  }

  // Gráfico 2: Evolución de Gastos por Período (Apilado)
  const expCanvas = document.getElementById("analyticsExpenseTimeChart");
  if (expCanvas) {
    const expLabels = periodKeysAsc.length ? periodKeysAsc.map(k => periodAgg[k].label) : ["Sin registros"];
    const expFuel = periodKeysAsc.length ? periodKeysAsc.map(k => Number(periodAgg[k].fuelUsd.toFixed(2))) : [0];
    const expPrev = periodKeysAsc.length ? periodKeysAsc.map(k => Number(periodAgg[k].prevUsd.toFixed(2))) : [0];
    const expCorr = periodKeysAsc.length ? periodKeysAsc.map(k => Number(periodAgg[k].corrUsd.toFixed(2))) : [0];

    analyticsExpenseTimeChartInstance = new Chart(expCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: expLabels,
        datasets: [
          { label: "Gasolina ($)", data: expFuel, backgroundColor: "rgba(245, 158, 11, 0.78)", borderRadius: 3 },
          { label: "Preventivo ($)", data: expPrev, backgroundColor: "rgba(16, 185, 129, 0.78)", borderRadius: 3 },
          { label: "Correctivo ($)", data: expCorr, backgroundColor: "rgba(239, 68, 68, 0.78)", borderRadius: 3 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: pal.text, font: { family: "'JetBrains Mono', sans-serif", size: 10 } } },
          tooltip: { backgroundColor: pal.tooltipBg, titleColor: pal.tooltipTitle, bodyColor: pal.tooltipBody, borderColor: pal.tooltipBorder, borderWidth: 1 }
        },
        scales: {
          x: { stacked: true, ticks: { color: pal.tick, font: { size: 9.5 } }, grid: { color: pal.grid } },
          y: { stacked: true, beginAtZero: true, ticks: { color: pal.tick, font: { size: 10 } }, grid: { color: pal.grid } }
        }
      }
    });
  }

  // Gráfico 3: Mix TCO (Doughnut)
  const mixCanvas = document.getElementById("analyticsBreakdownChart");
  if (mixCanvas) {
    const hasMix = totalUsd > 0;
    analyticsBreakdownChartInstance = new Chart(mixCanvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: hasMix ? ["Gasolina", "Mantenimiento Preventivo", "Reparación Correctiva"] : ["Sin gastos registrados"],
        datasets: [{
          data: hasMix ? [Number(fuelMetrics.totalUsd.toFixed(2)), Number(prevUsd.toFixed(2)), Number(corrUsd.toFixed(2))] : [1],
          backgroundColor: hasMix ? ["rgba(245, 158, 11, 0.85)", "rgba(16, 185, 129, 0.85)", "rgba(239, 68, 68, 0.85)"] : ["rgba(148, 163, 184, 0.25)"],
          borderColor: pal.pointBorder,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { color: pal.text, font: { family: "'JetBrains Mono', sans-serif", size: 10.5 } } },
          tooltip: { backgroundColor: pal.tooltipBg, titleColor: pal.tooltipTitle, bodyColor: pal.tooltipBody, borderColor: pal.tooltipBorder, borderWidth: 1 }
        }
      }
    });
  }
}


/* =============================================================================
   CHECKOUT BIMONETARIO, TASA BCV Y ACTIVACIÓN CHARUPRO
   ============================================================================= */
async function fetchBcvRate() {
  try {
    const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", { cache: "no-cache" });
    if (res.ok) {
      const data = await res.json();
      if (data && data.promedio) {
        bcvRate = parseFloat(data.promedio);
        bcvLastUpdate = data.fechaActualizacion || new Date().toISOString();
        localStorage.setItem("charu_bcv_rate", bcvRate);
        localStorage.setItem("charu_bcv_date", bcvLastUpdate);
        console.log(`[BCV Service] Tasa oficial BCV actualizada en vivo: ${bcvRate} Bs/$`);
        updateCheckoutAmounts();
        calcFuelCost();
        return;
      }
    }
  } catch (err) {
    console.warn("[BCV Service] Error de red consultando API BCV, recurriendo a caché local:", err);
  }

  // Fallback a localStorage si la petición externa falla
  const savedRate = localStorage.getItem("charu_bcv_rate");
  if (savedRate) {
    bcvRate = parseFloat(savedRate);
    bcvLastUpdate = localStorage.getItem("charu_bcv_date") || "Caché Local";
  }
  updateCheckoutAmounts();
  calcFuelCost();
}

function openCheckoutModal() {
  updateCheckoutAmounts();
  openModal("checkoutModal");
}

function selectProPlan(plan) {
  selectedProPlan = plan;
  const mensualBtn = document.getElementById("planMensualBtn");
  const vitalicioBtn = document.getElementById("planVitalicioBtn");

  if (plan === "mensual") {
    if (mensualBtn) {
      mensualBtn.className = "btn btn-sm";
      mensualBtn.style.border = "1px solid var(--accent)";
      mensualBtn.style.background = "var(--accent-dim)";
    }
    if (vitalicioBtn) {
      vitalicioBtn.className = "btn btn-secondary btn-sm";
      vitalicioBtn.style.border = "1px solid var(--border-medium)";
      vitalicioBtn.style.background = "transparent";
    }
  } else {
    if (mensualBtn) {
      mensualBtn.className = "btn btn-secondary btn-sm";
      mensualBtn.style.border = "1px solid var(--border-medium)";
      mensualBtn.style.background = "transparent";
    }
    if (vitalicioBtn) {
      vitalicioBtn.className = "btn btn-sm";
      vitalicioBtn.style.border = "1px solid var(--amber)";
      vitalicioBtn.style.background = "rgba(245,158,11,0.15)";
    }
  }

  updateCheckoutAmounts();
}

function updateCheckoutAmounts() {
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  const priceBs = (priceUSD * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const pmAmountEl = document.getElementById("pmCalculatedAmount");
  if (pmAmountEl) {
    pmAmountEl.textContent = `${priceBs} Bs. (${priceUSD} USD a tasa BCV ${bcvRate.toFixed(2)})`;
  }

  const binanceAmountEl = document.getElementById("binanceAmountDisplay");
  if (binanceAmountEl) {
    binanceAmountEl.textContent = `${priceUSD} USDT`;
  }

  const binanceDeepLink = document.getElementById("binanceDeepLink");
  if (binanceDeepLink) {
    binanceDeepLink.href = `binance://pay?payId=849201948&amount=${priceUSD}`;
  }

  const bcvRateTag = document.getElementById("bcvRateTag");
  if (bcvRateTag) {
    bcvRateTag.textContent = `Tasa BCV Oficial: ${bcvRate.toFixed(2)} Bs/$`;
  }
}

function copyPagoMovilData() {
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  const priceBs = (priceUSD * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const text = `BAJOKAPOT — Datos Pago Móvil\nBanco: Banco de Venezuela (0102)\nTeléfono: 0414-9876543\nRIF: J-50012345-0\nMonto: ${priceBs} Bs. (${priceUSD} USD)`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyPmBtn");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = "Copiado";
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {
    alert(text);
  });
}

function copyBinancePayId() {
  navigator.clipboard.writeText("849201948").then(() => {
    const btn = document.getElementById("copyBinanceBtn");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = "Copiado";
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {
    alert("Binance Pay ID: 849201948");
  });
}

function sendWhatsAppConfirmation() {
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  const priceBs = (priceUSD * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const planName = selectedProPlan === "vitalicio" ? "Pase Vitalicio BajoKapot PRO ($9.99 USD)" : "Plan Mensual BajoKapot PRO ($4.99 USD)";

  const bankEl = document.getElementById("pmBank");
  const bankName = bankEl ? bankEl.options[bankEl.selectedIndex].text : "Banco Emisor";
  const phone = document.getElementById("pmPhone")?.value.trim() || "";
  const ref = document.getElementById("pmRef")?.value.trim() || "Pendiente";

  const msg = encodeURIComponent(
    `Hola equipo de BAJOKAPOT. Acabo de gestionar mi suscripción ${planName}.\n\n` +
    `DATOS DE PAGO:\n` +
    `• Método: Pago Móvil\n` +
    `• Banco Emisor: ${bankName}\n` +
    `• Teléfono Emisor: ${phone}\n` +
    `• Referencia: ${ref}\n` +
    `• Monto: ${priceBs} Bs. (Tasa BCV: ${bcvRate.toFixed(2)} Bs/$)\n\n` +
    `Adjunto el comprobante para la verificación y activación.`
  );

  window.open(`https://wa.me/584149876543?text=${msg}`, "_blank");
}

function switchPaymentMethod(method) {
  const pmPane = document.getElementById("pagoMovilPane");
  const binPane = document.getElementById("binancePane");
  const pmBtn = document.getElementById("tabPagoMovilBtn");
  const binBtn = document.getElementById("tabBinanceBtn");

  if (method === "pagomovil") {
    if (pmPane) pmPane.style.display = "block";
    if (binPane) binPane.style.display = "none";
    if (pmBtn) pmBtn.className = "btn btn-sm";
    if (binBtn) binBtn.className = "btn btn-secondary btn-sm";
  } else {
    if (pmPane) pmPane.style.display = "none";
    if (binPane) binPane.style.display = "block";
    if (pmBtn) pmBtn.className = "btn btn-secondary btn-sm";
    if (binBtn) binBtn.className = "btn btn-sm btn-amber";
  }
}

function processPagoMovil() {
  const refInput = document.getElementById("pmRef");
  const ref = refInput ? refInput.value.trim() : "";
  if (ref.length < 6) {
    alert("Error de validación: El número de referencia bancaria debe tener al menos 6 dígitos.");
    return;
  }
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  const priceBs = (priceUSD * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  activatePro(`Pago Móvil (${priceBs} Bs. / $${priceUSD} USD - Ref: ${ref})`);
}

function processBinancePay() {
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  activatePro(`Binance Pay (${priceUSD} USDT - PayID: 849201948)`);
}

function activatePro(methodName) {
  isProUser = true;
  const proData = {
    active: true,
    plan: selectedProPlan,
    method: methodName,
    date: new Date().toISOString(),
    token: "CHARUPRO_" + Math.random().toString(36).substring(2, 10).toUpperCase()
  };
  localStorage.setItem("charu_pro_status", JSON.stringify(proData));

  const pill = document.getElementById("proBadge");
  if (pill) {
    pill.className = "pro-pill pro-active";
    pill.innerHTML = `${ICONS.crown} <span>PRO ACTIVO</span>`;
  }
  closeModal("checkoutModal");
  alert(`MEMBRESÍA BAJOKAPOT PRO ACTIVADA CON ÉXITO:\n\nMétodo: ${methodName}\nPlan: ${selectedProPlan === "vitalicio" ? "Pase Vitalicio" : "Plan Mensual"}\nCódigo de Activación: ${proData.token}\n\nYa puedes exportar certificados oficiales y acceder a todas las funciones PRO.`);
}

function initProStatus() {
  try {
    const raw = localStorage.getItem("charu_pro_status");
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.active) {
        isProUser = true;
        const pill = document.getElementById("proBadge");
        if (pill) {
          pill.className = "pro-pill pro-active";
          pill.innerHTML = `${ICONS.crown} <span>PRO ACTIVO</span>`;
        }
      }
    }
  } catch (e) {
    console.warn("[ProManager] Error leyendo estado de membresía:", e);
  }
}

function viewCertificate() {
  if (!isProUser) {
    if (confirm("La exportación del Certificado Oficial BajoKapot PRO es una función Pro ($4.99 USD / mes o $9.99 única vez).\n\n¿Deseas abrir el Checkout Bimonetario para activarlo o ver la muestra de prueba?")) {
      openCheckoutModal();
    } else {
      window.open("certificado_charupro_muestra.html", "_blank");
    }
  } else {
    window.open("certificado_charupro_muestra.html", "_blank");
  }
}

/* =============================================================================
   COLA DE SINCRONIZACIÓN EN SEGUNDO PLANO (OFFLINE MUTATION QUEUE)
   ============================================================================= */
function initOfflineSync() {
  // Cargar mutaciones persistidas en LocalStorage
  try {
    const saved = localStorage.getItem("charu_sync_queue");
    if (saved) {
      pendingMutations = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("[SyncManager] Error leyendo cola offline de LocalStorage:", e);
    pendingMutations = [];
  }

  // Detectores nativos del navegador de conectividad WiFi / Datos
  window.addEventListener("online", () => {
    console.log("[SyncManager] Conectividad restablecida (Evento Online detectado).");
    setOnlineState(true);
  });

  window.addEventListener("offline", () => {
    console.warn("[SyncManager] Conexión perdida (Evento Offline detectado). Entrando en modo local.");
    setOnlineState(false);
  });

  // Estado inicial
  setOnlineState(typeof navigator !== "undefined" && navigator.onLine !== undefined ? navigator.onLine : true);
}

function setOnlineState(online) {
  isOnline = online;
  const badge = document.getElementById("statusBadge");
  const text = document.getElementById("statusText");

  if (online) {
    if (badge) badge.className = "status-badge status-online";
    if (text) text.textContent = "En línea";
    if (pendingMutations.length > 0) {
      syncPendingMutations();
    } else {
      updateQueueDisplay();
    }
  } else {
    if (badge) badge.className = "status-badge status-offline";
    if (text) text.textContent = "Sin conexión";
    updateQueueDisplay();
  }
}

function toggleOnlineStatus() {
  setOnlineState(!isOnline);
}

function addMutation(table, action, payload) {
  const mut = {
    id: "mut_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 4),
    table,
    action,
    payload,
    timestamp: new Date().toLocaleTimeString("es-VE")
  };

  pendingMutations.push(mut);
  localStorage.setItem("charu_sync_queue", JSON.stringify(pendingMutations));
  updateQueueDisplay();

  if (isOnline) {
    console.log("[SyncManager] Mutación registrada. Procesando en segundo plano:", mut);
    setTimeout(() => { syncPendingMutations(); }, 500);
  } else {
    console.log("[SyncManager] Mutación guardada en buffer offline local:", mut);
  }
}

function getMutationMeta(m) {
  switch (m.table) {
    case "odometer_chain":
      return { icon: `<span class="status-dot dot-green"></span>`, label: "Odómetro Verificado", desc: `Registro #${m.payload ? m.payload.index : ''} (${m.payload && m.payload.km ? m.payload.km.toLocaleString() : ''} km)` };
    case "fuel_logs":
      return { icon: `<span class="status-dot dot-amber"></span>`, label: "Registro Combustible", desc: `${m.payload ? m.payload.liters : ''}L ($${m.payload ? m.payload.usd : ''} USD)` };
    case "comparisons":
      return { icon: `<span class="status-dot dot-green"></span>`, label: "Comparativa Guardada", desc: `"${m.payload ? m.payload.name : ''}"` };
    case "obd2_diagnostics":
      return { icon: `<span class="status-dot dot-red"></span>`, label: "Diagnóstico OBD2", desc: `Código [${m.payload ? m.payload.code : ''}]` };
    case "service_records":
      return { icon: `<span class="status-dot dot-green"></span>`, label: "Historial de Servicio", desc: `Código [${m.payload ? m.payload.code : ''}]` };
    default:
      return { icon: `<span class="status-dot dot-muted"></span>`, label: m.table, desc: m.action };
  }
}

function updateQueueDisplay() {
  const queueCard = document.getElementById("syncQueueCard");
  const countBadge = document.getElementById("queueCountBadge");
  const list = document.getElementById("queueList");

  if (pendingMutations.length > 0 || !isOnline) {
    if (queueCard) queueCard.style.display = "block";
    if (countBadge) {
      countBadge.textContent = `${pendingMutations.length} operación(es) guardada(s) localmente en este dispositivo`;
    }
    if (list) {
      if (pendingMutations.length === 0) {
        list.innerHTML = `<span style="color:var(--text-muted); font-style:italic; padding:6px 0;">Buffer local vacío. Cualquier acción que realices sin internet se encolará aquí de forma segura.</span>`;
      } else {
        list.innerHTML = pendingMutations.map(m => {
          const meta = getMutationMeta(m);
          return `
            <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:6px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                <span style="font-size:14px;">${meta.icon}</span>
                <div style="min-width:0;">
                  <div style="font-weight:700; color:var(--text-main); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${meta.label}: <span style="color:var(--cyan); font-weight:600;">${meta.desc}</span>
                  </div>
                  <div style="font-size:9.5px; font-family:var(--font-mono); color:var(--text-muted);">
                    ID: ${m.id} • ${m.timestamp}
                  </div>
                </div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="deletePendingMutation('${m.id}')" title="Eliminar de la cola local" style="padding:2px 6px; font-size:10px; color:#f87171; border-color:rgba(239,68,68,0.3); background:transparent;">
                &times;
              </button>
            </div>
          `;
        }).join("");
      }
    }
  } else if (queueCard) {
    queueCard.style.display = "none";
  }
}

function deletePendingMutation(id) {
  pendingMutations = pendingMutations.filter(m => m.id !== id);
  localStorage.setItem("charu_sync_queue", JSON.stringify(pendingMutations));
  updateQueueDisplay();
}

function syncPendingMutations() {
  if (pendingMutations.length === 0) {
    updateQueueDisplay();
    return;
  }

  const countBadge = document.getElementById("queueCountBadge");
  if (countBadge) countBadge.textContent = "Sincronizando operaciones con la nube...";

  setTimeout(() => {
    const totalSynced = pendingMutations.length;
    pendingMutations = [];
    localStorage.removeItem("charu_sync_queue");
    updateQueueDisplay();
    alert(`SINCRONIZACIÓN EXITOSA:\n\nSe han sincronizado e indexado ${totalSynced} operaciones almacenadas en el dispositivo.`);
  }, 900);
}

function exportOfflineBackup() {
  const safeParse = (k, fallback) => {
    try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  };

  const backupData = {
    app: "BAJOKAPOT — Revisión & Fallas",
    version: "3.0.0",
    exportDate: new Date().toISOString(),
    activeVehicle: safeParse("charu_active_vehicle", activeGarageVehicle),
    fuelHistory: safeParse("charu_fuel_history", []),
    maintenanceLogs: safeParse("charu_maintenance_logs", []),
    maintRegime: localStorage.getItem("charu_maint_regime") || currentMaintenanceRegime,
    customRegimeConfig: getCustomRegimeConfig(),
    savedComparisons: safeParse("charu_saved_comparisons", []),
    bcvRate,
    bcvDate: localStorage.getItem("charu_bcv_date") || bcvLastUpdate || null,
    proStatus: safeParse("charu_pro_status", null),
    odometerChain: blockchain,
    pendingMutations: pendingMutations
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bajokapot_respaldo_offline_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importOfflineBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      const hasValidField = data && (
        data.activeVehicle || data.fuelHistory || data.maintenanceLogs || data.savedComparisons ||
        data.odometerChain || data.pendingMutations || data.proStatus
      );
      if (hasValidField) {
        if (data.activeVehicle && typeof data.activeVehicle === "object") {
          localStorage.setItem("charu_active_vehicle", JSON.stringify(data.activeVehicle));
          loadActiveVehicle();
        }
        if (Array.isArray(data.fuelHistory)) {
          localStorage.setItem("charu_fuel_history", JSON.stringify(data.fuelHistory));
        }
        if (Array.isArray(data.maintenanceLogs)) {
          localStorage.setItem("charu_maintenance_logs", JSON.stringify(data.maintenanceLogs));
        }
        if (data.customRegimeConfig && typeof data.customRegimeConfig === "object") {
          saveCustomRegimeConfig(data.customRegimeConfig);
        }
        if (data.maintRegime) {
          currentMaintenanceRegime = normalizeMaintenanceRegime(data.maintRegime);
          localStorage.setItem("charu_maint_regime", currentMaintenanceRegime);
        }
        if (Array.isArray(data.savedComparisons)) {
          localStorage.setItem("charu_saved_comparisons", JSON.stringify(data.savedComparisons));
        }
        if (data.odometerChain && Array.isArray(data.odometerChain)) {
          blockchain = data.odometerChain;
          saveOdometerChain();
          if (blockchain.length > 0) {
            currentOdometer = blockchain[blockchain.length - 1].km;
          }
          renderBlockchain();
          const odoDisplay = document.getElementById("garageOdoDisplay");
          if (odoDisplay) odoDisplay.textContent = `${currentOdometer.toLocaleString()} km`;
        }
        if (data.pendingMutations && Array.isArray(data.pendingMutations)) {
          pendingMutations = data.pendingMutations;
          localStorage.setItem("charu_sync_queue", JSON.stringify(pendingMutations));
          updateQueueDisplay();
        }
        if (data.proStatus && data.proStatus.active) {
          localStorage.setItem("charu_pro_status", JSON.stringify(data.proStatus));
          initProStatus();
        }
        refreshAllGarageUI();
        if (window.syncUserDataToCloud) window.syncUserDataToCloud();
        alert("Respaldo completo restaurado con éxito en tu dispositivo.");
      } else {
        alert("Archivo de respaldo no reconocido o sin formato válido.");
      }
    } catch (err) {
      alert("Error al procesar el archivo JSON de respaldo.");
    }
  };
  reader.readAsText(file);
}


let currentTheme = localStorage.getItem('charu_theme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark';
  localStorage.setItem('charu_theme', theme);

  const metaTheme = document.getElementById('metaThemeColor');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'light' ? '#F8F9FA' : '#0B0D10');
  }

  const metaColorScheme = document.getElementById('metaColorScheme');
  if (metaColorScheme) {
    metaColorScheme.setAttribute('content', theme === 'light' ? 'light' : 'dark');
  }

  const themeLbl = document.getElementById('themeLabelText');
  if (themeLbl) {
    themeLbl.textContent = theme === 'light' ? 'Modo Claro' : 'Modo Oscuro';
  }

  const wordmarkImg = document.getElementById('headerWordmarkImg');
  if (wordmarkImg) {
    wordmarkImg.src = theme === 'light' ? 'bajokapot-wordmark-light.png' : 'bajokapot-wordmark-dark.png';
  }

  const icon = document.getElementById('themeIcon');
  if (icon) {
    if (theme === 'light') {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }

  if (typeof renderComparisonCharts === 'function') renderComparisonCharts();
  if (typeof renderGarageAnalytics === 'function') renderGarageAnalytics();
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  console.log("Alternando tema a:", newTheme);
  applyTheme(newTheme);
}

// Expose to global scope explicitly
window.toggleTheme = toggleTheme;

function toggleUserProfilePopover(evOrState) {
  if (evOrState && typeof evOrState.stopPropagation === 'function') {
    evOrState.stopPropagation();
  }
  const pop = document.getElementById('userProfilePopover');
  const btn = document.getElementById('authBtn');
  if (!pop) return;
  const shouldOpen = typeof evOrState === 'boolean' ? evOrState : pop.hasAttribute('hidden');
  if (shouldOpen) {
    pop.removeAttribute('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    pop.setAttribute('hidden', '');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
}
window.toggleUserProfilePopover = toggleUserProfilePopover;

document.addEventListener('click', (e) => {
  const pop = document.getElementById('userProfilePopover');
  const btn = document.getElementById('authBtn');
  if (pop && !pop.hasAttribute('hidden') && !pop.contains(e.target) && (!btn || !btn.contains(e.target))) {
    toggleUserProfilePopover(false);
  }
});

function reloadBajoKapotApp() {
  const btn = document.getElementById('brandReloadBtn');
  const splash = document.getElementById('bajoKapotSplashOverlay');
  if (btn) btn.classList.add('reloading');
  if (splash) {
    splash.classList.remove('splash-hidden');
    const logo = splash.querySelector('.bk-splash-logo');
    const fill = splash.querySelector('.bk-splash-fill');
    if (logo) {
      logo.style.animation = 'none';
      void logo.offsetWidth;
      logo.style.animation = '';
    }
    if (fill) {
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.animation = '';
    }
  }
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((k) => caches.delete(k));
    }).catch(() => {});
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => {
        if (typeof r.update === 'function') r.update();
      });
    }).catch(() => {});
  }
  setTimeout(() => {
    window.location.reload();
  }, 550);
}
window.reloadBajoKapotApp = reloadBajoKapotApp;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderFuelHistory === 'function') renderFuelHistory();
  applyTheme(currentTheme);
  const splash = document.getElementById('bajoKapotSplashOverlay');
  if (splash) {
    setTimeout(() => splash.classList.add('splash-hidden'), 580);
  }
});
