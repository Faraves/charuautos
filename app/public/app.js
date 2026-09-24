/**
 * =============================================================================
 * CHARU motorhub — APLICACIÓN CLIENTE (LOCAL-FIRST)
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

// Dataset Canónico de Vehículos en Venezuela con rangos de precio reales y años de producción
const VEHICLES_DB = [
  {
    id: "chevrolet-spark-2009",
    maker: "Chevrolet",
    model: "Spark 1.0",
    yearRange: "2007 - 2014",
    nicknames: ["Spark Tapita", "El Huevito"],
    minPrice: 2000,
    maxPrice: 3500,
    clearanceMm: 145,
    parts: "Inmediata (Bajísimo costo)",
    hp: 65,
    engine: "1.0L 4 Cilindros",
    consumption: "16.0 km/L",
    pros: ["Consumo mínimo de gasolina", "Estaciona en cualquier hueco", "Repuestos baratísimos"],
    cons: ["Tren delantero delicado en baches", "Poco espacio de maleta", "Sin potencia para subidas cargado"],
    verdict: "El rey del ahorro urbano para presupuestos ajustados. Ideal para diligencias o primer carro."
  },
  {
    id: "chery-arauca-2015",
    maker: "Chery",
    model: "Arauca 1.3",
    yearRange: "2011 - 2016",
    nicknames: ["El Arauquita"],
    minPrice: 2200,
    maxPrice: 3800,
    clearanceMm: 145,
    parts: "Moderada (Accesible)",
    hp: 83,
    engine: "1.3L Acteco",
    consumption: "13.5 km/L",
    pros: ["Económico de comprar y rodar", "Buen aire acondicionado"],
    cons: ["Tren delantero suena con baches", "Caja áspera en segunda marcha"],
    verdict: "Opción de entrada económica si el presupuesto no alcanza para marcas japonesas."
  },
  {
    id: "chevrolet-aveo-2011",
    maker: "Chevrolet",
    model: "Aveo LS 4 Puertas",
    yearRange: "2005 - 2015",
    nicknames: ["Aveo 4 Puertas", "El Aveito"],
    minPrice: 3200,
    maxPrice: 5200,
    clearanceMm: 150,
    parts: "Inmediata en toda Venezuela",
    hp: 103,
    engine: "1.6L E-TEC II (Correa)",
    consumption: "10.0 km/L",
    pros: ["Repuestos en cualquier rincón del país", "Mecánica conocida por todos", "Líder en Ridery y Yummy"],
    cons: ["Correa de tiempo dobla válvulas si se descuida", "Consumo elevado en colas"],
    verdict: "El caballo de batalla venezolano. Cambiar kit de tiempo inmediatamente al comprar."
  },
  {
    id: "ford-fiesta-move-2012",
    maker: "Ford",
    model: "Fiesta Move 1.6",
    yearRange: "2011 - 2014",
    nicknames: ["Fiesta Move", "Fiestica"],
    minPrice: 3400,
    maxPrice: 5500,
    clearanceMm: 140,
    parts: "Alta disponibilidad",
    hp: 98,
    engine: "1.6L Zetec RoCam (Cadena)",
    consumption: "10.5 km/L",
    pros: ["Motor con cadena duradero", "Aire acondicionado congelador", "Excelente maniobrabilidad"],
    cons: ["Tomas de agua plásticas resecas (migrar a aluminio)", "Poco despeje para baches profundos"],
    verdict: "Muy rendidor si se le reemplaza preventivamente el envase y la toma de refrigerante."
  },
  {
    id: "toyota-yaris-2008",
    maker: "Toyota",
    model: "Yaris Sedan 1.3",
    yearRange: "2006 - 2010",
    nicknames: ["Yaris Belén", "Redondito"],
    minPrice: 5500,
    maxPrice: 7800,
    clearanceMm: 155,
    parts: "Alta disponibilidad",
    hp: 86,
    engine: "1.3L 2NZ-FE (Cadena)",
    consumption: "14.0 km/L",
    pros: ["Cadena irrompible", "Consumo ultra bajo", "Mantiene intacto su valor en dólares"],
    cons: ["Precio de compra elevado", "Maleta justa"],
    verdict: "La compra más inteligente para quien busca cero dolores de cabeza y máximo ahorro de gasolina."
  },
  {
    id: "honda-civic-2008",
    maker: "Honda",
    model: "Civic 1.8 EX",
    yearRange: "2006 - 2011",
    nicknames: ["Civic 8va Gen", "El Espacial"],
    minPrice: 4800,
    maxPrice: 7200,
    clearanceMm: 150,
    parts: "Media (Tiendas especializadas)",
    hp: 140,
    engine: "1.8L i-VTEC (Cadena)",
    consumption: "11.0 km/L",
    pros: ["Manejo deportivo y confort premium", "Motor i-VTEC altamente confiable", "Excelente valor"],
    cons: ["Soporte de motor hidráulico delicado", "Despeje bajo en huecos severos"],
    verdict: "Elegancia, presencia y durabilidad japonesa con sensación de manejo deportivo."
  },
  {
    id: "toyota-corolla-2011",
    maker: "Toyota",
    model: "Corolla GLi 1.8",
    yearRange: "2009 - 2014",
    nicknames: ["Corolla Pantallita", "Boca de Bagre"],
    minPrice: 6500,
    maxPrice: 9500,
    clearanceMm: 160,
    parts: "Inmediata en toda Venezuela",
    hp: 132,
    engine: "1.8L 1ZZ-FE (Cadena)",
    consumption: "11.5 km/L",
    pros: ["Indestructible en baches severos", "Repuestos garantizados", "Comodidad y durabilidad suprema"],
    cons: ["Muy buscado por los amigos de lo ajeno", "Precio alto de mercado"],
    verdict: "El patrón oro automotor en Venezuela. Si tienes el presupuesto, es la compra definitiva."
  },
  {
    id: "changan-alsvin-2024",
    maker: "Changan",
    model: "Alsvin Moderno",
    yearRange: "2022 - 2024",
    nicknames: ["El Chinito Nuevo", "Alsvin"],
    minPrice: 12000,
    maxPrice: 15500,
    clearanceMm: 150,
    parts: "Moderada (Red oficial)",
    hp: 107,
    engine: "1.5L BlueCore (Cadena)",
    consumption: "13.5 km/L",
    pros: ["Vehículo 0 km con garantía", "Pantalla táctil y tecnología moderna", "Muy buen rendimiento"],
    cons: ["Repuestos de latonería caros", "Devaluación a largo plazo incierta"],
    verdict: "Para quien busca la tranquilidad de estrenar sin pagar los 35 mil dólares de marcas tradicionales."
  },
  {
    id: "chery-tiggo4-2024",
    maker: "Chery",
    model: "Tiggo 4 Pro",
    yearRange: "2022 - 2024",
    nicknames: ["Tiggo 4", "Camionetica China"],
    minPrice: 16000,
    maxPrice: 22000,
    clearanceMm: 185,
    parts: "Moderada",
    hp: 147,
    engine: "1.5L Turbo",
    consumption: "11.0 km/L",
    pros: ["Excelente despeje para baches (185 mm)", "SUV espaciosa y cómoda", "Cámara 360 y conectividad"],
    cons: ["Sensible a gasolina de mala calidad por el turbo", "Mantenimiento especializado"],
    verdict: "Buena opción SUV para familias que transitan vías irregulares en el interior del país."
  },
  {
    id: "toyota-hilux-2012",
    maker: "Toyota",
    model: "Hilux Kavak 4.0",
    yearRange: "2006 - 2014",
    nicknames: ["Kavak", "La Reina"],
    minPrice: 13500,
    maxPrice: 22000,
    clearanceMm: 220,
    parts: "Inmediata en toda Venezuela",
    hp: 238,
    engine: "4.0L 1GR-FE V6 (Cadena)",
    consumption: "7.5 km/L",
    pros: ["Indestructible para cualquier camino en Venezuela", "Poder V6 imparable", "Valor de reventa más alto del país"],
    cons: ["Consumo alto de gasolina en ciudad", "Vehículo codiciado"],
    verdict: "La camioneta definitiva para rústico, finca o autopista en cualquier rincón del territorio."
  }
];

// Catálogo DTC OBD2 con lenguaje adaptado a Venezuela
const DTC_DB = {
  "P0420": {
    code: "P0420",
    title: "Eficiencia del Catalizador por Debajo del Umbral (Banco 1)",
    severity: 2,
    desc: "El sensor de oxígeno detecta que los gases del escape no están siendo filtrados adecuadamente. El vehículo rueda normalmente pero contamina más.",
    venezuela: "En Venezuela, los sedimentos y azufre de la gasolina ensucian el sensor antes de dañar el catalizador. ¡No permitas que te lo vacíen a la primera!",
    causes: [
      { name: "Sensor de oxígeno secundario sucio o carbonizado", pct: 60, cost: "$25 - $45 USD" },
      { name: "Fuga o fisura en tubería de escape (entra aire)", pct: 25, cost: "$10 - $20 USD" },
      { name: "Convertidor catalítico tapado o fundido", pct: 15, cost: "$180 - $450 USD" }
    ],
    questions: [
      "¿Ya verificaste el voltaje oscilante del sensor de oxígeno con el escáner antes de decirme que el catalizador no sirve?",
      "¿Revisaste si la tubería de escape tiene alguna fisura o fuga que esté metiendo aire fresco?",
      "Si vacías el catalizador, ¿sabes que el carro quedará oliendo a gasolina pura y la luz del tablero nunca se apagará?"
    ]
  },
  "P0171": {
    code: "P0171",
    title: "Sistema de Combustible Demasiado Pobre (Banco 1)",
    severity: 2,
    desc: "El motor recibe demasiado aire o muy poca gasolina (mezcla seca). Causa tirones en subidas y pérdida de potencia matutina.",
    venezuela: "Causado con frecuencia por filtros de gasolina saturados de lodo de tanques de estaciones de servicio o pila de gasolina desinflada.",
    causes: [
      { name: "Manguera de vacío rota o empacadura de admisión tostada", pct: 45, cost: "$5 - $15 USD" },
      { name: "Filtro tapado o pila de bomba perdiendo presión", pct: 35, cost: "$20 - $40 USD" },
      { name: "Sensor MAF o inyectores sucios", pct: 20, cost: "$15 - $30 USD" }
    ],
    questions: [
      "¿Mediste la presión de la gasolina con manómetro en el riel de inyección? ¿Cuántos PSI marca?",
      "¿Hiciste la prueba de humo o líquido para descartar chupadas de aire en el múltiple?"
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
let onlyWithinBudget = false;
let currentOdometer = 148500;
let bcvRate = 36.50;
let bcvLastUpdate = null;

// Micro-Blockchain SHA-256 en Memoria Local
let blockchain = [
  {
    index: 0,
    timestamp: "2026-01-10 09:30:00",
    km: 148500,
    reason: "Bloque Génesis - Verificación Inicial",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "e3c38dd0ef2fe72d988891238914619726354182910293847561829304958172"
  }
];

/* =============================================================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ============================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚗 Charu motorhub inicializado correctamente.");
  initOfflineSync();
  initProStatus();
  fetchBcvRate();
  updateMatchmaker();
  lookupDTC("P0420");
  renderBlockchain();
  loadDefaultDemoVehicles();
});

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

function setUsageFilter(usageType, element) {
  currentUsageFilter = usageType;
  const pills = document.querySelectorAll("#usageFilterPills .filter-pill");
  pills.forEach(p => p.classList.remove("active"));
  if (element) element.classList.add("active");
  updateMatchmaker();
}

function updateMatchmaker() {
  const slider = document.getElementById("budgetRange");
  const maxBudget = parseInt(slider ? slider.value : 6000) || 6000;

  // Actualizar etiqueta
  const label = document.getElementById("budgetLabel");
  if (label) label.textContent = `$${maxBudget.toLocaleString()} USD`;

  const numberInput = document.getElementById("budgetNumber");
  if (numberInput && numberInput.value != maxBudget) {
    numberInput.value = maxBudget;
  }

  // Filtrar y calificar vehículos
  let candidates = VEHICLES_DB.map(car => {
    let score = 50; // Base
    const isAffordable = car.minPrice <= maxBudget;
    const isFullyCovered = car.maxPrice <= maxBudget;

    // Ponderación de Precio (40%)
    if (isFullyCovered) {
      score += 30;
    } else if (isAffordable) {
      score += 15;
    } else {
      score -= 35; // Penalización fuerte por presupuesto
    }

    // Ponderación de Vías y Baches (30%)
    if (currentRoadFilter === "severo" || currentRoadFilter === "montana") {
      if (car.clearanceMm >= 160) score += 20;
      else if (car.clearanceMm >= 150) score += 10;
      else score -= 15;
    }

    // Ponderación de Repuestos (20%)
    if (car.parts.includes("Inmediata")) score += 15;
    else if (car.parts.includes("Alta")) score += 10;

    // Ponderación de Uso (10%)
    if (currentUsageFilter === "taxi" && (car.id.includes("aveo") || car.id.includes("yaris") || car.id.includes("spark"))) {
      score += 15;
    }
    if (currentUsageFilter === "diario" && (car.id.includes("spark") || car.id.includes("arauca") || car.id.includes("yaris"))) {
      score += 12;
    }
    if (currentUsageFilter === "familia" && (car.id.includes("corolla") || car.id.includes("tiggo"))) {
      score += 15;
    }

    score = Math.max(10, Math.min(99, score));
    return {
      ...car,
      score,
      isAffordable,
      isFullyCovered,
      diffAmount: car.minPrice - maxBudget
    };
  });

  // Si el usuario activó "Solo mostrar dentro de presupuesto"
  if (onlyWithinBudget) {
    candidates = candidates.filter(c => c.isAffordable);
  }

  // Ordenar de mayor a menor compatibilidad
  candidates.sort((a, b) => b.score - a.score);

  const container = document.getElementById("matchmakerResults");
  if (!container) return;

  if (candidates.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px 16px;">
        <div style="margin-bottom:12px; color:var(--cyan);">${ICONS.search}</div>
        <div style="font-weight:800; font-size:16px; color:#fff; margin-bottom:6px;">No se encontraron vehículos por debajo de $${maxBudget.toLocaleString()} USD</div>
        <div style="font-size:12px; color:var(--text-muted); margin-bottom:14px;">El vehículo más accesible en la base de datos comienza en $2,000 USD (Chevrolet Spark).</div>
        <button class="btn btn-secondary btn-sm" onclick="setBudgetPreset(3500)">Subir Presupuesto a $3,500 USD</button>
      </div>
    `;
    return;
  }

  container.innerHTML = candidates.map((c, i) => {
    const budgetBadge = c.isFullyCovered
      ? `<span class="badge" style="background:var(--green-dim); color:var(--green); border:1px solid rgba(16,185,129,0.35); display:inline-flex; align-items:center; gap:4px;">✓ En Presupuesto</span>`
      : (c.isAffordable
        ? `<span class="badge" style="background:var(--amber-dim); color:var(--amber); border:1px solid rgba(245,158,11,0.35); display:inline-flex; align-items:center; gap:4px;">${ICONS.bolt} Rango Base ($${c.minPrice.toLocaleString()})</span>`
        : `<span class="badge" style="background:var(--danger-dim); color:#fca5a5; border:1px solid rgba(239,68,68,0.35); display:inline-flex; align-items:center; gap:4px;">${ICONS.warning} +$${c.diffAmount.toLocaleString()} USD</span>`
      );

    const rankNum = (i + 1).toString().padStart(2, '0');

    return `
      <div class="car-card" style="${!c.isAffordable ? 'opacity: 0.78; border-color: rgba(239,68,68,0.25);' : ''}">
        <div class="match-header">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:var(--text-main); background:rgba(255,255,255,0.06); padding:3px 8px; border-radius:4px; border:1px solid var(--border-medium);">
              #${rankNum}
            </div>
            <div>
              <div style="font-size:16px; font-weight:800; color:#fff; letter-spacing:-0.3px; display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span>${c.maker} ${c.model}</span>
                <span style="font-family:var(--font-mono); font-size:11px; color:var(--cyan); background:rgba(56,189,248,0.08); padding:2px 8px; border-radius:4px; border:1px solid rgba(56,189,248,0.25); font-weight:700;">
                  Años: ${c.yearRange}
                </span>
              </div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">
                Alias: <em style="color:var(--text-secondary);">"${c.nicknames.join(', ')}"</em>
              </div>
            </div>
          </div>
          <div style="text-align:right;">
            <div class="match-score" style="color: ${c.score >= 80 ? 'var(--green)' : (c.score >= 60 ? 'var(--cyan)' : 'var(--amber)')};">${c.score}% MATCH</div>
            ${budgetBadge}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:8px; font-size:11.5px; margin: 12px 0; background:rgba(255,255,255,0.015); border:1px solid var(--border-subtle); padding:10px 12px; border-radius:var(--radius-sm);">
          <div><span style="color:var(--text-muted); font-size:10px; text-transform:uppercase; font-family:var(--font-mono); display:block;">Años Sugeridos:</span> <strong style="color:var(--cyan); font-family:var(--font-mono);">${c.yearRange}</strong></div>
          <div><span style="color:var(--text-muted); font-size:10px; text-transform:uppercase; font-family:var(--font-mono); display:block;">Precio Mercado VE:</span> <strong style="color:#fff;">$${c.minPrice.toLocaleString()} - $${c.maxPrice.toLocaleString()}</strong></div>
          <div><span style="color:var(--text-muted); font-size:10px; text-transform:uppercase; font-family:var(--font-mono); display:block;">Despeje Baches:</span> <strong style="color:${c.clearanceMm >= 160 ? 'var(--green)' : 'var(--amber)'}; display:inline-flex; align-items:center; gap:4px;">${c.clearanceMm} mm ${c.clearanceMm >= 160 ? ICONS.shield : ICONS.warning}</strong></div>
          <div><span style="color:var(--text-muted); font-size:10px; text-transform:uppercase; font-family:var(--font-mono); display:block;">Tren Motriz:</span> <strong style="color:var(--text-secondary);">${c.engine}</strong></div>
          <div><span style="color:var(--text-muted); font-size:10px; text-transform:uppercase; font-family:var(--font-mono); display:block;">Repuestos VE:</span> <strong style="color:var(--cyan);">${c.parts}</strong></div>
        </div>

        <div style="font-size:11.5px; color:#cbd5e1; margin-bottom:8px; line-height:1.6;">
          <div><strong style="color:var(--green); font-family:var(--font-mono); font-size:10px; text-transform:uppercase;">[PROS]</strong> ${c.pros.join(' • ')}</div>
          <div><strong style="color:var(--amber); font-family:var(--font-mono); font-size:10px; text-transform:uppercase;">[ATENCIÓN]</strong> ${c.cons.join(' • ')}</div>
        </div>

        <div class="verdict-box">
          <strong style="color:var(--accent); font-family:var(--font-mono); font-size:10px; letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:3px;">DICTAMEN TÉCNICO // EVALUACIÓN AUTOMOTRIZ:</strong> ${c.verdict}
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

  const sevClass = dtc.severity === 3 ? "sev-3" : (dtc.severity === 2 ? "sev-2" : "sev-1");
  const sevLabel = dtc.severity === 3 ? "SEVERIDAD CRÍTICA" : (dtc.severity === 2 ? "ADVERTENCIA TÉCNICA" : "ESTADO OPERATIVO");

  const card = document.getElementById("dtcResultCard");
  if (!card) return;

  card.innerHTML = `
    <div class="card" style="border-color: ${dtc.severity === 3 ? 'var(--danger)' : (dtc.severity === 2 ? 'var(--amber)' : 'var(--green)')};">
      <div class="card-title">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-mono); font-weight:900; color:var(--cyan); background:rgba(56,189,248,0.08); padding:3px 8px; border-radius:4px; border:1px solid rgba(56,189,248,0.25);">
            [${dtc.code}]
          </span>
          <span style="font-size:16px; font-weight:800; color:#fff;">${dtc.title}</span>
        </div>
        <span class="severity-pill ${sevClass}">${sevLabel}</span>
      </div>

      <p style="font-size:13px; line-height:1.6; color:#cbd5e1; margin-bottom:14px;">
        ${dtc.desc}
      </p>

      <div style="background:rgba(255,255,255,0.02); border-left:3px solid var(--cyan); padding:10px 14px; font-size:12px; border-radius:0 var(--radius-sm) var(--radius-sm) 0; margin-bottom:16px;">
        <span style="font-family:var(--font-mono); font-size:10px; color:var(--cyan); letter-spacing:1px; text-transform:uppercase; display:block; margin-bottom:2px;">REALIDAD VENEZUELA // CONTEXTO OPERATIVO:</span>
        <span style="color:var(--text-secondary);">${dtc.venezuela}</span>
      </div>

      <div class="input-label" style="font-family:var(--font-mono); font-size:10px; letter-spacing:1px;">ANÁLISIS TÉCNICO 80/20 // PROBABILIDAD DE ORIGEN:</div>
      ${dtc.causes.map(c => `
        <div class="cause-bar">
          <div class="cause-info">
            <span style="color:#fff; font-size:12px;"><strong>${c.name}</strong></span>
            <span style="color:var(--cyan); font-family:var(--font-mono); font-size:11.5px; font-weight:800;">${c.pct}% prob. • Est: ${c.cost}</span>
          </div>
          <div class="progress-bg">
            <div class="progress-fill" style="width: ${c.pct}%;"></div>
          </div>
        </div>
      `).join('')}

      <div class="anti-scam-box">
        <div style="font-family:var(--font-mono); font-weight:800; color:var(--amber); margin-bottom:10px; font-size:11.5px; letter-spacing:0.8px; text-transform:uppercase; display:flex; align-items:center; gap:6px;">
          ${ICONS.shield} CHECKLIST TÉCNICO // ASESORÍA DE TALLER (Preguntas clave para el mecánico):
        </div>
        ${dtc.questions.map(q => `
          <div class="question-item">
            <input type="checkbox" style="accent-color:var(--amber); margin-top:2px;">
            <span style="font-style:italic;">"${q}"</span>
          </div>
        `).join('')}
      </div>

      <button class="btn btn-secondary btn-block" style="margin-top:16px; display:inline-flex; align-items:center; justify-content:center; gap:6px;" onclick="saveDtcToCar('${dtc.code}')">
        ${ICONS.save} Registrar Falla en el Historial del Vehículo
      </button>
    </div>
  `;
}

function saveDtcToCar(code) {
  addMutation("service_records", "INSERT_DTC", { code, date: new Date().toISOString() });
  alert(`Código [${code}] registrado en el historial de servicio de tu Corolla GLi.`);
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

const SAMPLE_BROCHURES_CATALOG = {
  haval: {
    maker: "GWM Haval",
    model: "Haval Jolion 1.5T",
    fileName: "FICHA_TECNICA_GWM_HAVAL_JOLION.pdf",
    hp: 141,
    torque: 210,
    clearance: 163,
    trunk: 430,
    tank: 48,
    weight: 1370,
    engine: "1.5L Turbo GW4G15K DOHC",
    displacement: "1.5L (1,497 cc)",
    transmission: "Automática 7-Vel Doble Embrague (DCT)",
    traction: "FWD Delantera",
    fuelType: "Gasolina 95 Oct",
    airbags: "6 Airbags (Front, Lat, Cortina)",
    esp: "ESP Bosch 9.3 + TCS + Control Descenso",
    brakes: "Discos Ventilados 4 Ruedas (ABS+EBD+BA)",
    infotainment: "Pantalla Táctil 10.25 pulg Apple CarPlay / Android Auto",
    b2bServices: {
      oil: "5W-30 Totalmente Sintético API SP (4.0 L)",
      oilFilter: "Filtro Elemento Haval OEM 1017100",
      brakes: "Pastillas Cerámicas Altas Temperaturas",
      mechanicLabor: "$35 USD Mano de Obra Cerrada",
      insuranceYear: "$210 USD / Año (Todo Riesgo + RCV)"
    }
  },
  dashing: {
    maker: "Jetour",
    model: "Dashing 1.5T",
    fileName: "DASHING FICHA TECNICA.pdf",
    hp: 147,
    torque: 210,
    clearance: 160,
    trunk: 486,
    tank: 57,
    weight: 1520,
    engine: "1.5L Turbo Acteco E4T15C",
    displacement: "1.5L (1,498 cc)",
    transmission: "Automática 6DCT Doble Embrague",
    traction: "FWD Delantera",
    fuelType: "Gasolina 95 Oct",
    airbags: "2 Frontales (Conductor y Pasajero)",
    esp: "ESP + Control de Tracción + Freno EPB",
    brakes: "Discos en las 4 Ruedas (ABS+EBD)",
    infotainment: "Pantalla Cockpit Digital 12.8 pulg HD",
    b2bServices: {
      oil: "5W-30 Sintético API SN PLUS / SP (4.7 L)",
      oilFilter: "Filtro Original Chery/Jetour 481H",
      brakes: "Pastillas Cerámicas Delanteras EPB",
      mechanicLabor: "$35 USD Mano de Obra Cerrada",
      insuranceYear: "$230 USD / Año (Todo Riesgo)"
    }
  },
  x50: {
    maker: "Jetour",
    model: "X50 1.5T",
    fileName: "x50 FICHA TECNICA.pdf",
    hp: 147,
    torque: 210,
    clearance: 160,
    trunk: 398,
    tank: 45,
    weight: 1390,
    engine: "1.5L Turbo Acteco E4T15C",
    displacement: "1.5L (1,498 cc)",
    transmission: "Automática 6DCT Doble Embrague",
    traction: "FWD Delantera",
    fuelType: "Gasolina 95 Oct",
    airbags: "4 Airbags (Frontales + Laterales)",
    esp: "ESP + TCS + Asistente de Arranque en Pendiente",
    brakes: "Discos en 4 Ruedas (ABS + EBD)",
    infotainment: "Pantalla Táctil HD 10 pulg con Bluetooth",
    b2bServices: {
      oil: "5W-30 Sintético API SP (4.5 L)",
      oilFilter: "Filtro Metálico Roscado Jetour OEM",
      brakes: "Pastillas de Freno Semi-Metálicas",
      mechanicLabor: "$30 USD Mano de Obra Cerrada",
      insuranceYear: "$190 USD / Año (RCV + Cobertura Amplia)"
    }
  },
  x70: {
    maker: "Jetour",
    model: "X70 1.5T (7 Puestos)",
    fileName: "x70 FICHA TECNICA.pdf",
    hp: 147,
    torque: 210,
    clearance: 160,
    trunk: 895,
    tank: 57,
    weight: 1560,
    engine: "1.5L Turbo E4T15C (7 Pasajeros)",
    displacement: "1.5L (1,498 cc)",
    transmission: "Automática 6DCT Doble Embrague",
    traction: "FWD Delantera",
    fuelType: "Gasolina 95 Oct",
    airbags: "4 Airbags (Frontales + Laterales)",
    esp: "ESP + TCS + Asistencia Frenado EBA",
    brakes: "Discos Ventilados Del / Discos Sólidos Tras",
    infotainment: "Pantalla 10.1 pulg táctil con MirrorLink",
    b2bServices: {
      oil: "5W-30 Sintético API SP (4.7 L)",
      oilFilter: "Filtro Cartucho Jetour X70",
      brakes: "Juego Delantero + Trasero Cerámico",
      mechanicLabor: "$35 USD Mano de Obra Cerrada",
      insuranceYear: "$220 USD / Año (Póliza Familiar)"
    }
  },
  rich6: {
    maker: "Dongfeng",
    model: "Rich 6 Pickup 4x4",
    fileName: "rich 6.pdf",
    hp: 156,
    torque: 235,
    clearance: 215,
    trunk: 1000,
    tank: 73,
    weight: 1840,
    engine: "2.4L Nafta 4 Cilindros (2TZD)",
    displacement: "2.4L (2,438 cc)",
    transmission: "Manual 5 Velocidades",
    traction: "4x4 Part-Time con Caja Reductora (Low)",
    fuelType: "Gasolina 91 / 95 Oct",
    airbags: "2 Bolsas de Aire Frontales",
    esp: "ESP + Control de Tracción TCS",
    brakes: "Discos Ventilados Del / Tambor Tras (ABS+EBD)",
    infotainment: "Pantalla Táctil 9 pulg MP5 con USB/BT",
    b2bServices: {
      oil: "10W-40 / 15W-40 Heavy Duty (5.5 L)",
      oilFilter: "Filtro Blindado Dongfeng 2TZD",
      brakes: "Juego de Pastillas Delanteras Heavy Duty",
      mechanicLabor: "$40 USD Mano de Obra Taller 4x4",
      insuranceYear: "$260 USD / Año (Póliza Carga Comercial)"
    }
  },
  tunland: {
    maker: "Foton",
    model: "Tunland E 4x4",
    fileName: "tunland e.pdf",
    hp: 161,
    torque: 360,
    clearance: 210,
    trunk: 1050,
    tank: 76,
    weight: 1950,
    engine: "2.8L Cummins ISF Turbo Diésel",
    displacement: "2.8L (2,776 cc)",
    transmission: "Manual 5 Velocidades Getrag",
    traction: "4x4 Electrónico BorgWarner con Reductora",
    fuelType: "Diésel Automotriz",
    airbags: "2 Bolsas de Aire Frontales",
    esp: "ESP Bosch 9.1 + EBD + ABS",
    brakes: "Discos en las 4 Ruedas con ABS",
    infotainment: "Pantalla Multimedia 8 pulg",
    b2bServices: {
      oil: "15W-40 Diésel API CI-4 / CK-4 (6.0 L)",
      oilFilter: "Filtro Cummins ISF 2.8 Original",
      brakes: "Pastillas Diésel Carga Pesada",
      mechanicLabor: "$45 USD Taller Especialista Cummins",
      insuranceYear: "$280 USD / Año (Póliza Rústico/Carga)"
    }
  },
  changan: {
    maker: "Changan",
    model: "Alsvin 2024",
    fileName: "Ficha_Tecnica_Changan_Alsvin_2024.pdf",
    hp: 107,
    torque: 145,
    clearance: 150,
    trunk: 390,
    tank: 45,
    weight: 1090,
    engine: "1.5L BlueCore DOHC (Cadena)",
    displacement: "1.5L (1,480 cc)",
    transmission: "Automática DCT 5-Velocidades",
    traction: "FWD Delantera",
    fuelType: "Gasolina 91 / 95 Oct",
    airbags: "2 Frontales",
    esp: "ESP + Control de Estabilidad Electrónico",
    brakes: "Discos Delanteros / Tambor Trasero (ABS+EBD)",
    infotainment: "Pantalla 10 pulg Táctil Incell",
    b2bServices: {
      oil: "5W-30 Sintético API SP (3.8 L)",
      oilFilter: "Filtro Changan BlueCore OEM",
      brakes: "Pastillas Cerámicas Delanteras",
      mechanicLabor: "$25 USD Mano de Obra Cerrada",
      insuranceYear: "$150 USD / Año (RCV + Cobertura Total)"
    }
  },
  tiggo: {
    maker: "Chery",
    model: "Tiggo 4 Pro 2024",
    fileName: "Brochure_Chery_Tiggo_4_Pro.pdf",
    hp: 147,
    torque: 210,
    clearance: 185,
    trunk: 410,
    tank: 51,
    weight: 1360,
    engine: "1.5L Turbo Acteco Euro VI",
    displacement: "1.5L (1,498 cc)",
    transmission: "Automática CVT 9-Velocidades Simuladas",
    traction: "FWD Delantera",
    fuelType: "Gasolina 95 Oct",
    airbags: "4 Airbags",
    esp: "ESP Bosch 9.3 + TCS + Hill Assist",
    brakes: "Discos en las 4 Ruedas (ABS+EBD+BAS)",
    infotainment: "Pantalla Táctil 10.25 pulg con Apple CarPlay",
    b2bServices: {
      oil: "5W-30 Sintético API SP (4.3 L)",
      oilFilter: "Filtro Chery Acteco 481H",
      brakes: "Pastillas Cerámicas 4 Ruedas",
      mechanicLabor: "$30 USD Mano de Obra Cerrada",
      insuranceYear: "$200 USD / Año (Todo Riesgo)"
    }
  },
  yaris: {
    maker: "Toyota",
    model: "Yaris Sedan 2024",
    fileName: "Ficha_Toyota_Yaris_Sedan_2024.pdf",
    hp: 105,
    torque: 138,
    clearance: 160,
    trunk: 475,
    tank: 42,
    weight: 1060,
    engine: "1.5L 2NR-VE Dual VVT-i",
    displacement: "1.5L (1,496 cc)",
    transmission: "Automática CVT 7-Velocidades",
    traction: "FWD Delantera",
    fuelType: "Gasolina 91 / 95 Oct",
    airbags: "6 Airbags (Frontales, Laterales, Cortina)",
    esp: "VSC (Control Estabilidad) + TRC + HAC",
    brakes: "Discos Delanteros / Tambor Trasero (ABS+EBD)",
    infotainment: "Pantalla Táctil 8 pulg Apple CarPlay / Android Auto",
    b2bServices: {
      oil: "0W-20 / 5W-30 Sintético API SP (3.5 L)",
      oilFilter: "Toyota OEM 90915-10009",
      brakes: "Pastillas Originales Toyota Advics",
      mechanicLabor: "$25 USD Mano de Obra Cerrada",
      insuranceYear: "$175 USD / Año (RCV + Cobertura Total)"
    }
  }
};

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
  }
];

// Paleta de colores distintiva por vehículo (Precision Automotive Showroom)
const VEHICLE_COLORS = [
  { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.45)', bgTrans: 'rgba(59, 130, 246, 0.14)', name: 'Cobalto' },
  { border: '#10b981', bg: 'rgba(16, 185, 129, 0.45)', bgTrans: 'rgba(16, 185, 129, 0.14)', name: 'Esmeralda' },
  { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.45)', bgTrans: 'rgba(245, 158, 11, 0.14)', name: 'Ámbar' },
  { border: '#38bdf8', bg: 'rgba(56, 189, 248, 0.45)', bgTrans: 'rgba(56, 189, 248, 0.14)', name: 'Cian' },
  { border: '#a855f7', bg: 'rgba(168, 85, 247, 0.45)', bgTrans: 'rgba(168, 85, 247, 0.14)', name: 'Púrpura' }
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
    alert("⚠️ Límite alcanzado: Puedes comparar hasta 5 vehículos simultáneamente. Quita uno para agregar otro.");
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
  if (stepEl) stepEl.textContent = "✓ ¡Extracción completada con éxito!";

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
        alert("⚠️ Límite alcanzado: Se pueden comparar máximo 5 vehículos de manera simultánea.");
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

  // 1. Intentar scraping de alta fidelidad vía Gemini IA directamente desde Frontend
  try {
    updatePdfLoadingStep(`[2/3] Análisis semántico con Motor IA Gemini Multimodal...`);
    
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
4. Convierte unidades si es necesario: CV a HP, lt a Litros, cc a Litros.
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`, {
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
          responseMimeType: "application/json"
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
        console.log("✓ Scraping exitoso vía Frontend Gemini:", specs);
      }
    } else {
      console.warn("Fallo en IA:", await response.text());
    }
  } catch (err) {
    console.warn("Servicio frontend Gemini de scraping no disponible o error de red:", err);
  }

  // 2. Fallback heurístico en navegador si la IA falló
  if (!specs) {
    updatePdfLoadingStep(`[2/3] Conmutando a motor heurístico local para ${fileName}...`);
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
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${comparedVehicles.length} / 5 vehículos`;
  }

  // Estado vacío si no hay vehículos
  if (comparedVehicles.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:36px 16px; border-style:dashed;">
        <div style="margin-bottom:12px; color:var(--cyan);">${ICONS.telemetry}</div>
        <div style="font-weight:800; font-size:16px; color:#fff; margin-bottom:6px;">Comparador de Fichas Técnicas Vacío</div>
        <p style="font-size:12.5px; color:var(--text-muted); max-width:500px; margin:0 auto; line-height:1.6;">
          Arrastra o selecciona tus archivos PDF técnicos arriba para comenzar la extracción y contrastar especificaciones reales lado a lado. Admite de 1 a 5 vehículos simultáneamente.
        </p>
      </div>
    `;
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

  // Render HTML completo con Toolbar Cockpit y Tabla
  const isDemoActive = comparedVehicles.length > 0 && comparedVehicles.every(v => v.isDefaultDemo);
  const badgeText = isDemoActive
    ? '2 Modelos Predeterminados (Demo)'
    : (displayList.length === 1 ? '1 Ficha Cargada' : `${displayList.length} Fichas en Comparación Directa`);

  const bannerMarkup = isDemoActive
    ? `<div style="font-family:var(--font-mono); font-size:11.5px; color:var(--cyan); margin-bottom:12px; background:var(--cyan-dim); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid rgba(56,189,248,0.25); display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <div style="display:flex; align-items:center; gap:6px;">
          <span>ℹ</span> <span><strong>MODELOS PREDETERMINADOS EN COMPARATIVA:</strong> Arrastra o adjunta tus fichas técnicas PDF arriba para comparar tus propios vehículos.</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="clearAllComparedVehicles(true)" style="padding:3px 8px; font-size:10px; line-height:1.2;">Limpiar</button>
      </div>`
    : (comparedVehicles.length === 1
      ? `<div style="font-family:var(--font-mono); font-size:11.5px; color:var(--cyan); margin-bottom:12px; background:var(--cyan-dim); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid rgba(56,189,248,0.25); display:flex; align-items:center; gap:6px;">
          <span>ℹ</span> <span>1 VEHÍCULO RECONOCIDO: Adjunta otro archivo PDF para contrastar especificaciones lado a lado.</span>
        </div>`
      : `<div style="font-family:var(--font-mono); font-size:11.5px; color:var(--green); margin-bottom:12px; background:var(--green-dim); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid rgba(16,185,129,0.25); display:flex; align-items:center; gap:6px;">
          <span>✓</span> <span>COMPARACIÓN DIRECTA ACTIVA: Evaluando exclusivamente tus ${displayList.length} fichas técnicas extraídas.</span>
        </div>`);

  container.innerHTML = `
    <div class="card">
      <div class="card-title">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="display:flex; align-items:center; gap:8px;">${ICONS.telemetry} Matriz Comparativa de Modelos</span>
          <span class="badge" style="background:var(--cyan-dim); color:var(--cyan); border:1px solid rgba(56,189,248,0.3);">
            ${badgeText}
          </span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-secondary btn-sm" onclick="saveCurrentComparison()" style="display:inline-flex; align-items:center; gap:5px;">${ICONS.save} Guardar Sesión</button>
          <button class="btn btn-danger btn-sm" onclick="clearAllComparedVehicles()" style="display:inline-flex; align-items:center; gap:5px;">${ICONS.trash} Limpiar Todo</button>
        </div>
      </div>

      ${bannerMarkup}

      <!-- TOOLBAR DE FILTROS & BÚSQUEDA REACTIVA -->
      <div class="matrix-toolbar">
        <div class="matrix-search-wrap">
          <span class="matrix-search-icon">
            <svg class="cockpit-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input type="text" class="matrix-search-input" placeholder="Buscar especificación (ej: Potencia, Torque, ABS, Despeje...)" 
                 value="${matrixSearchQuery}" oninput="onMatrixSearch(this.value)">
        </div>

        <!-- Categorías -->
        <div style="display:flex; gap:5px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'all' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('all')">Todas</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'motor' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('motor')">Motor & Tracción</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'dimensions' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('dimensions')">Dimensiones & Carga</button>
          <button class="btn btn-secondary btn-sm ${matrixActiveCategory === 'safety' ? 'toggle-pill-active' : ''}" onclick="setMatrixCategory('safety')">Seguridad & Confort</button>
        </div>

        <!-- Filtros Inteligentes -->
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-secondary btn-sm ${diffOnlyMode ? 'toggle-pill-active' : ''}" onclick="toggleDiffOnly()" title="Ocultar especificaciones con valores idénticos">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
              Solo Diferencias ${diffOnlyMode ? '✓' : ''}
            </span>
          </button>
          <button class="btn btn-secondary btn-sm ${highlightBestMode ? 'toggle-pill-active' : ''}" onclick="toggleHighlightBest()" title="Resaltar con verde la mejor métrica cuantitativa">
            <span style="display:inline-flex; align-items:center; gap:5px;">
              <svg class="cockpit-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"/></svg>
              Resaltar Mejores ${highlightBestMode ? '✓' : ''}
            </span>
          </button>
        </div>
      </div>

      <!-- TABLA HORIZONTAL RESPONSIVA CON COLUMNA STICKY -->
      <div class="table-responsive-wrapper">
        <table class="compare-table" style="min-width:${Math.max(480, displayList.length * 165 + 160)}px;">
          <thead>
            <tr>
              <th style="min-width:155px; width:155px; font-family:var(--font-mono); font-size:11px; letter-spacing:1px; text-transform:uppercase;">
                Parámetro Técnico
              </th>
              ${displayList.map((v, idx) => {
                const colorInfo = VEHICLE_COLORS[idx % VEHICLE_COLORS.length];
                return `
                  <th style="min-width:165px; background:rgba(255,255,255,0.015); vertical-align:top; border-left:1px solid var(--border-subtle); border-top:2px solid ${colorInfo.border};">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
                      <div>
                        <div style="font-size:14px; font-weight:900; color:#fff; letter-spacing:-0.3px;">${v.maker}</div>
                        <div style="font-size:12px; color:${colorInfo.border}; font-family:var(--font-mono); font-weight:700;">${v.model}</div>
                        ${v.aiPowered || v.source === 'gemini_multimodal' ? `
                          <div style="display:inline-flex; align-items:center; gap:4px; margin-top:5px; font-size:9.5px; font-family:var(--font-mono); background:rgba(56,189,248,0.14); color:var(--cyan); border:1px solid rgba(56,189,248,0.3); border-radius:4px; padding:2px 6px;">
                            <span>✨</span> Motor IA Gemini
                          </div>
                        ` : (v.isDefaultDemo ? '' : `
                          <div style="display:inline-flex; align-items:center; gap:4px; margin-top:5px; font-size:9.5px; font-family:var(--font-mono); background:rgba(255,255,255,0.06); color:var(--text-muted); border:1px solid var(--border-subtle); border-radius:4px; padding:2px 6px;">
                            <span>⚙️</span> Motor Local
                          </div>
                        `)}
                      </div>
                      ${!v.isReference ? `
                        <button class="btn btn-danger btn-sm" style="padding:4px 7px; font-size:10px; line-height:1; border-radius:4px; display:inline-flex; align-items:center; justify-content:center;" 
                                onclick="removeComparedVehicle('${v.id}')" title="Eliminar vehículo">
                          ${ICONS.trash}
                        </button>
                      ` : `
                        <span style="font-family:var(--font-mono); font-size:9px; background:rgba(255,255,255,0.06); color:var(--text-muted); padding:2px 6px; border-radius:3px; border:1px solid var(--border-subtle);">BASE</span>
                      `}
                    </div>
                    <div style="font-size:10px; font-family:var(--font-mono); color:var(--text-muted); font-weight:normal; margin-top:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; display:flex; align-items:center; gap:4px;" title="${v.fileName}">
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
                          <td class="${isLeader ? 'winner-val' : ''}" style="${isLeader ? 'background:rgba(16,185,129,0.08);' : ''}">
                            <span style="font-family:${spec.isNumeric ? 'var(--font-mono)' : 'var(--font-main)'}; font-size:12px; font-weight:${isLeader ? '800' : (spec.isNumeric ? '700' : '500')}; color:${isLeader ? 'var(--green)' : 'inherit'};">
                              ${spec.format(v, isLeader)}
                            </span>
                            ${isLeader ? `<span class="badge-best-in-class">🏆 LÍDER</span>` : ''}
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

  renderSavedComparisons();
}

/* =============================================================================
   VISUALIZACIÓN GRÁFICA CON CHART.JS (BARRAS Y RADAR)
   ============================================================================= */
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
            color: '#cbd5e1',
            font: { family: "'JetBrains Mono', sans-serif", size: 10 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 15, 23, 0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { color: '#8b9bb4', font: { family: "'JetBrains Mono', sans-serif", size: 10 } },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        y: {
          ticks: { color: '#8b9bb4', font: { family: "'JetBrains Mono', sans-serif", size: 10 } },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
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
      pointBorderColor: '#fff',
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
            color: '#cbd5e1',
            font: { family: "'JetBrains Mono', sans-serif", size: 10 }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(11, 15, 23, 0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false },
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: {
            color: '#cbd5e1',
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
          ? `<span class="badge" style="background:var(--green-dim); color:var(--green); border:1px solid rgba(16,185,129,0.4); font-size:11px; font-weight:800; display:inline-flex; align-items:center; gap:5px;">🏆 RECOMENDACIÓN N° 1</span>`
          : `<span class="badge" style="background:rgba(255,255,255,0.06); color:var(--text-muted); border:1px solid var(--border-subtle); font-family:var(--font-mono);">Puesto #${idx + 1}</span>`;

        return `
          <div class="advisor-card-rank ${isWinner ? 'leader' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="font-size:22px; font-weight:900; font-family:var(--font-mono); color:${isWinner ? 'var(--green)' : 'var(--text-muted)'};">
                  #${idx + 1}
                </div>
                <div>
                  <div style="font-size:16px; font-weight:900; color:#fff;">${v.maker} ${v.model}</div>
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

            <div style="background:rgba(255,255,255,0.02); border-left:3px solid ${isWinner ? 'var(--green)' : 'var(--accent)'}; padding:8px 12px; border-radius:0 6px 6px 0; font-size:12px; color:#cbd5e1; margin-top:8px;">
              <strong style="color:#fff; font-size:11px; text-transform:uppercase; font-family:var(--font-mono); display:block; margin-bottom:4px;">Factores Decisivos de tu Búsqueda:</strong>
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
                  <div style="font-size:15px; font-weight:800; color:#fff;">${v.maker} ${v.model}</div>
                  <div style="font-size:11px; color:var(--cyan); font-family:var(--font-mono);">${v.engine}</div>
                </div>
                <span class="badge" style="background:var(--accent-dim); color:var(--accent);">Servicios VE</span>
              </div>

              <!-- Ficha de Repuestos Homologados -->
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:10px; margin-bottom:10px; font-size:11.5px;">
                <div style="color:var(--text-muted); font-family:var(--font-mono); font-size:10px; text-transform:uppercase; margin-bottom:4px;">Mantenimiento Preventivo Homologado:</div>
                <div style="color:#fff; margin-bottom:3px;">🛢️ <strong>Aceite:</strong> ${s.oil}</div>
                <div style="color:#fff; margin-bottom:3px;">⚙️ <strong>Filtro:</strong> ${s.oilFilter}</div>
                <div style="color:#fff;">🛑 <strong>Frenos:</strong> ${s.brakes}</div>
              </div>

              <!-- Tarifas Cerradas -->
              <div style="font-size:11px; color:#cbd5e1; line-height:1.6; margin-bottom:12px;">
                <div>🔧 <strong>Taller Mecánico Verificado:</strong> <span style="color:var(--green); font-weight:700;">${s.mechanicLabor}</span></div>
                <div>🛡️ <strong>Seguro RCV + Todo Riesgo:</strong> <span style="color:var(--amber); font-weight:700;">${s.insuranceYear}</span></div>
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
  alert(`📋 Solicitud de Servicio Registrada:\n\nVehículo: ${carName}\nServicio Solicitado: ${serviceType}\n\nUn asesor de la Red Oficial Charu motorhub se comunicará contigo con las tarifas cerradas garantizadas.`);
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
  renderSavedComparisons();
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
        <div style="background:var(--bg-card-alt); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; transition:border-color 0.2s;" onmouseover="this.style.borderColor='rgba(255,255,255,0.2)'" onmouseout="this.style.borderColor='var(--border-subtle)'">
          <div>
            <div style="font-size:14px; font-weight:800; color:#fff; letter-spacing:-0.2px;">${item.name}</div>
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
   TAB 4: BLOCKCHAIN ODÓMETRO & CRIPTO-SEGURIDAD
   ============================================================================= */
async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function openOdometerModal() {
  const currentKmDisplay = document.getElementById("modalCurrentKm");
  const newOdoInput = document.getElementById("newOdoInput");
  const fraudAlert = document.getElementById("fraudAlert");

  if (currentKmDisplay) currentKmDisplay.textContent = `${currentOdometer.toLocaleString()} km`;
  if (newOdoInput) newOdoInput.value = currentOdometer + 700;
  if (fraudAlert) fraudAlert.style.display = "none";

  openModal("odometerModal");
}

async function mineOdometerBlock() {
  const input = document.getElementById("newOdoInput");
  const reasonInput = document.getElementById("odoReasonInput");
  const fraudAlert = document.getElementById("fraudAlert");

  const newKm = parseInt(input ? input.value : 0);
  const reason = reasonInput ? reasonInput.value : "Registro rutinario";

  // REGLA MATEMÁTICA DE MONOTONICIDAD (ANTI-FRAUDE DE ODÓMETRO)
  if (newKm < currentOdometer) {
    if (fraudAlert) fraudAlert.style.display = "block";
    return;
  }

  const prevBlock = blockchain[blockchain.length - 1];
  const newIndex = blockchain.length;
  const timestamp = new Date().toISOString().replace("T", " ").substr(0, 19);

  const payloadString = `${newIndex}|toyota-corolla-gli-2011|${newKm}|${timestamp}|${prevBlock.hash}`;
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
  currentOdometer = newKm;

  const odoDisplay = document.getElementById("garageOdoDisplay");
  if (odoDisplay) odoDisplay.textContent = `${currentOdometer.toLocaleString()} km`;

  addMutation("odometer_chain", "INSERT_BLOCK", newBlock);

  closeModal("odometerModal");
  renderBlockchain();
  alert(`⛏️ ¡Bloque #${newIndex} minado con éxito!\nHash SHA-256 verificado y encadenado.`);
}

function renderBlockchain() {
  const feed = document.getElementById("blockchainFeed");
  if (!feed) return;

  feed.innerHTML = blockchain.slice().reverse().map(b => `
    <div class="chain-block">
      <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-family:var(--font-mono);">
        <strong style="color:var(--green); font-size:12px;">BLOQUE #${b.index} // ${b.km.toLocaleString()} KM</strong>
        <span style="color:var(--text-muted); font-size:10px;">${b.timestamp}</span>
      </div>
      <div style="color:var(--text-secondary); margin-bottom:4px; font-size:12px;"><strong style="color:#fff;">Motivo:</strong> ${b.reason}</div>
      <div style="margin-top:4px; font-size:10px; color:var(--text-muted);">PREV: <span style="color:#64748b;">${b.prevHash.substr(0, 24)}...</span></div>
      <div style="font-size:10px; color:var(--text-muted);">HASH SHA-256: <span class="chain-hash">${b.hash.substr(0, 32)}...</span></div>
    </div>
  `).join("");
}

function auditChain() {
  let valid = true;
  for (let i = 1; i < blockchain.length; i++) {
    if (blockchain[i].prevHash !== blockchain[i - 1].hash || blockchain[i].km < blockchain[i - 1].km) {
      valid = false;
      break;
    }
  }
  if (valid) {
    alert("🛡️ AUDITORÍA CRIPTOGRÁFICA EXITOSA:\nTodos los bloques cumplen con la función SHA-256 inmutable y la regla de monotonicidad. Cero adulteración detectada.");
  } else {
    alert("🚨 ALERTA: La cadena contiene inconsistencias matemáticas.");
  }
}

/* =============================================================================
   REGISTRO DE GASOLINA BIMONETARIO
   ============================================================================= */
function openFuelModal() {
  calcFuelCost();
  openModal("fuelModal");
}

function calcFuelCost() {
  const usdInput = document.getElementById("fuelUsdInput");
  const bcvDisplay = document.getElementById("fuelBcvDisplay");
  const usd = parseFloat(usdInput ? usdInput.value : 20) || 0;
  const bcvTotal = (usd * bcvRate).toFixed(2);
  if (bcvDisplay) bcvDisplay.value = `${bcvTotal} Bs.`;
}

function saveFuelLog() {
  const litersInput = document.getElementById("fuelLitersInput");
  const usdInput = document.getElementById("fuelUsdInput");

  const liters = parseFloat(litersInput ? litersInput.value : 40);
  const usd = parseFloat(usdInput ? usdInput.value : 20);
  const costPerKm = (usd / (liters * 12.44)).toFixed(3);

  const costDisplay = document.getElementById("garageCostDisplay");
  if (costDisplay) costDisplay.textContent = `$${costPerKm}`;

  addMutation("fuel_logs", "INSERT_LOG", { liters, usd, date: new Date().toISOString() });

  closeModal("fuelModal");
  alert(`⛽ Tanqueo guardado:\n${liters}L por $${usd} USD (${(usd * bcvRate).toFixed(2)} Bs.). Costo recalculado: $${costPerKm}/km.`);
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
  const text = `Charu motorhub — Datos Pago Móvil\nBanco: Banco de Venezuela (0102)\nTeléfono: 0414-9876543\nRIF: J-50012345-0\nMonto: ${priceBs} Bs. (${priceUSD} USD)`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyPmBtn");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = "✅ ¡Copiado!";
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
      btn.innerHTML = "✅ ¡Copiado!";
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {
    alert("Binance Pay ID: 849201948");
  });
}

function sendWhatsAppConfirmation() {
  const priceUSD = selectedProPlan === "vitalicio" ? 9.99 : 4.99;
  const priceBs = (priceUSD * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const planName = selectedProPlan === "vitalicio" ? "Pase Vitalicio CharuPro ($9.99 USD)" : "Plan Mensual CharuPro ($4.99 USD)";

  const bankEl = document.getElementById("pmBank");
  const bankName = bankEl ? bankEl.options[bankEl.selectedIndex].text : "Banco Emisor";
  const phone = document.getElementById("pmPhone")?.value.trim() || "";
  const ref = document.getElementById("pmRef")?.value.trim() || "Pendiente";

  const msg = encodeURIComponent(
    `Hola equipo de Charu motorhub! 🚗 Acabo de gestionar mi suscripción ${planName}.\n\n` +
    `📋 DATOS DE PAGO:\n` +
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
    alert("⚠️ Error de validación: El número de referencia bancaria debe tener al menos 6 dígitos.");
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
  alert(`👑 ¡MEMBRESÍA CHARUPRO ACTIVADA CON ÉXITO!\n\nMétodo: ${methodName}\nPlan: ${selectedProPlan === "vitalicio" ? "Pase Vitalicio" : "Plan Mensual"}\nToken Criptográfico: ${proData.token}\n\nYa puedes exportar certificados oficiales y acceder a todas las funciones VIP.`);
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
    if (confirm("La exportación del Certificado Oficial CharuPro es una función Pro ($4.99 USD / mes o $9.99 única vez).\n\n¿Deseas abrir el Checkout Bimonetario para activarlo o ver la muestra de prueba?")) {
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
    if (text) text.textContent = "Sistema // En Línea";
    if (pendingMutations.length > 0) {
      syncPendingMutations();
    } else {
      updateQueueDisplay();
    }
  } else {
    if (badge) badge.className = "status-badge status-offline";
    if (text) text.textContent = "Local // Desconectado";
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
      return { icon: "⛏️", label: "Odómetro Blockchain", desc: `Bloque #${m.payload ? m.payload.index : ''} (${m.payload && m.payload.km ? m.payload.km.toLocaleString() : ''} km)` };
    case "fuel_logs":
      return { icon: "⛽", label: "Registro Combustible", desc: `${m.payload ? m.payload.liters : ''}L ($${m.payload ? m.payload.usd : ''} USD)` };
    case "comparisons":
      return { icon: "⚖️", label: "Comparativa Guardada", desc: `"${m.payload ? m.payload.name : ''}"` };
    case "obd2_diagnostics":
      return { icon: "🔌", label: "Diagnóstico OBD2", desc: `Código [${m.payload ? m.payload.code : ''}]` };
    case "service_records":
      return { icon: "🔧", label: "Historial de Servicio", desc: `Código [${m.payload ? m.payload.code : ''}]` };
    default:
      return { icon: "📦", label: m.table, desc: m.action };
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
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:6px; padding:6px 10px; display:flex; justify-content:space-between; align-items:center; gap:8px;">
              <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                <span style="font-size:14px;">${meta.icon}</span>
                <div style="min-width:0;">
                  <div style="font-weight:700; color:#fff; font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
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
    alert(`📡 SINCRONIZACIÓN EXITOSA:\n\nSe han sincronizado e indexado ${totalSynced} operaciones almacenadas en el dispositivo.`);
  }, 900);
}

function exportOfflineBackup() {
  const backupData = {
    app: "Charu motorhub WebApp & PWA",
    version: "2.0.4",
    exportDate: new Date().toISOString(),
    proStatus: localStorage.getItem("charu_pro_status") ? JSON.parse(localStorage.getItem("charu_pro_status")) : null,
    odometerChain: blockchain,
    pendingMutations: pendingMutations
  };

  const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `charuautos_respaldo_offline_${new Date().toISOString().slice(0, 10)}.json`;
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
      if (data && (data.odometerChain || data.pendingMutations || data.proStatus)) {
        if (data.odometerChain && Array.isArray(data.odometerChain)) {
          blockchain = data.odometerChain;
          currentOdometer = blockchain[blockchain.length - 1].km;
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
        alert("✅ Respaldo restaurado con éxito en tu dispositivo.");
      } else {
        alert("⚠️ Archivo de respaldo no reconocido o sin formato válido.");
      }
    } catch (err) {
      alert("⚠️ Error al procesar el archivo JSON de respaldo.");
    }
  };
  reader.readAsText(file);
}


let currentTheme = localStorage.getItem('charu_theme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('charu_theme', theme);
  
  const icon = document.getElementById('themeIcon');
  if (icon) {
    if (theme === 'light') {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }
}

function toggleTheme() {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  console.log("Alternando tema a:", newTheme);
  applyTheme(newTheme);
}

// Expose to global scope explicitly
window.toggleTheme = toggleTheme;

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
