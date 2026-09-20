import { DTCCodeDefinition } from '../types/dtc';

/**
 * Catálogo Semilla de los Códigos DTC OBD2 más Frecuentes en Venezuela
 * Enriquecido con lenguaje didáctico, semáforo de riesgo y preguntas anti-estafas.
 */
export const VENEZUELAN_DTC_SEED: DTCCodeDefinition[] = [
  {
    code: 'P0420',
    system: 'Powertrain',
    severity: 2, // Precaución
    technicalTitle: 'Eficiencia del Sistema Catalítico por Debajo del Umbral (Banco 1)',
    plainSpanishExplanation: 'El sensor de oxígeno trasero detecta que los gases que salen del tubo de escape no están siendo filtrados adecuadamente por el catalizador. Tu carro rueda perfectamente, pero contamina más y consumirá un poco más de combustible.',
    severityReason: 'No te dejará varado de inmediato ni romperá el motor a corto plazo. Puedes seguir conduciendo con tranquilidad y atenderlo en los próximos días.',
    mostProbableCauses: [
      {
        component: 'Sensor de Oxígeno secundario (posterior) sucio o desgastado',
        probabilityPercentage: 60,
        estimatedPartCostUsd: [25, 45],
        difficultyLevel: 'facil',
        canBeCleaned: true
      },
      {
        component: 'Fuga o fisura de escape antes del sensor (toma de aire falsa)',
        probabilityPercentage: 25,
        estimatedPartCostUsd: [10, 20],
        difficultyLevel: 'facil',
        canBeCleaned: false
      },
      {
        component: 'Convertidor catalítico tapado o fundido por mala gasolina',
        probabilityPercentage: 15,
        estimatedPartCostUsd: [180, 450],
        difficultyLevel: 'experto',
        canBeCleaned: false
      }
    ],
    venezuelaSpecificContext: 'En Venezuela, la acumulación de azufre o residuos en la gasolina suele 'engañar' al sensor de oxígeno antes de que el catalizador esté realmente dañado.',
    antiScamMechanicQuestions: [
      '¿Ya verificaste el voltaje oscilante del sensor de oxígeno con el escáner antes de decirme que el catalizador no sirve?',
      '¿Revisaste si la tubería de escape tiene alguna fisura o fuga que esté metiendo aire fresco?',
      'Si insistes en vaciar el catalizador, ¿sabes que el carro quedará oliendo a gasolina pura y la luz del tablero nunca se apagará?'
    ],
    suggestedAction: '1. Pídele al mecánico que revise el cableado y limpie o pruebe el sensor de oxígeno trasero. 2. Verifica fugas en el tubo de escape. 3. Solo como último recurso evalúa el cambio o lavado del catalizador.'
  },
  {
    code: 'P0171',
    system: 'Powertrain',
    severity: 2, // Precaución
    technicalTitle: 'Sistema Demasiado Pobre (Banco 1)',
    plainSpanishExplanation: 'El motor está recibiendo demasiado aire o muy poca gasolina (la mezcla está 'seca'). El carro puede perder fuerza al acelerar, titubear en subidas o encender con dificultad en las mañanas.',
    severityReason: 'Si lo conduces mucho tiempo con mezcla pobre, la temperatura de la cámara de combustión sube y puede quemar válvulas.',
    mostProbableCauses: [
      {
        component: 'Manguera de vacío rota o junta de admisión tostada (entra aire no medido)',
        probabilityPercentage: 45,
        estimatedPartCostUsd: [5, 15],
        difficultyLevel: 'facil',
        canBeCleaned: false
      },
      {
        component: 'Pila de bomba de gasolina perdiendo presión o filtro de gasolina tapado',
        probabilityPercentage: 35,
        estimatedPartCostUsd: [20, 40],
        difficultyLevel: 'moderado',
        canBeCleaned: false
      },
      {
        component: 'Inyectores sucios o sensor MAF (flujo de masa de aire) sucio',
        probabilityPercentage: 20,
        estimatedPartCostUsd: [15, 30],
        difficultyLevel: 'moderado',
        canBeCleaned: true
      }
    ],
    venezuelaSpecificContext: 'Muy común por filtros de gasolina saturados de sedimentos de tanques subterráneos o bombas de combustible forzadas por andar con la reserva de tanque vacía.',
    antiScamMechanicQuestions: [
      '¿Mediste la presión de la gasolina con un manómetro en el riel? ¿Cuántas libras (PSI) marca?',
      '¿Hiciste la prueba de humo o líquido para descartar chupadas de aire en el múltiple de admisión?'
    ],
    suggestedAction: 'Revisa primero si hay mangueras de vacío sueltas o rotas detrás del motor. Luego cambia el filtro de gasolina externo si tiene más de 15,000 km.'
  },
  {
    code: 'P0300',
    system: 'Powertrain',
    severity: 3, // Crítico si parpadea
    technicalTitle: 'Fallo de Encendido Múltiple / Aleatorio en Cilindros (Random Misfire)',
    plainSpanishExplanation: 'Uno o varios cilindros no están quemando la gasolina a tiempo. El carro tiembla bruscamente en ralentí, huele a gasolina cruda por el escape y pierde muchísima fuerza.',
    severityReason: 'Si la luz de Check Engine PARPADEA, significa que la gasolina cruda está entrando al escape caliente y puede quemar el catalizador o doblar componentes en minutos.',
    mostProbableCauses: [
      {
        component: 'Bujías desgastadas o cables de bujía con fuga de chispa',
        probabilityPercentage: 50,
        estimatedPartCostUsd: [15, 35],
        difficultyLevel: 'facil',
        canBeCleaned: false
      },
      {
        component: 'Bobina de encendido quemada o agrietada',
        probabilityPercentage: 30,
        estimatedPartCostUsd: [25, 60],
        difficultyLevel: 'facil',
        canBeCleaned: false
      },
      {
        component: 'Inyector trancado o compresión baja en cilindro',
        probabilityPercentage: 20,
        estimatedPartCostUsd: [20, 80],
        difficultyLevel: 'experto',
        canBeCleaned: true
      }
    ],
    venezuelaSpecificContext: 'Las bujías piratas de baja calidad abundan en el mercado. Instalar bujías originales calibradas suele resolver el 70% de estos fallos.',
    antiScamMechanicQuestions: [
      '¿Revisaste la chispa y el ohmiaje de las bobinas antes de decirme que la computadora del carro está quemada?',
      '¿En qué cilindro específico está el fallo principal (P0301, P0302, etc.)?'
    ],
    suggestedAction: 'Si la luz parpadea, no aceleres fuerte ni uses el auto para viajes largos. Cambia el juego de bujías y revisa los cables de bujía.'
  }
];
