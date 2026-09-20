/**
 * Contratos de Dominio para Códigos OBD2 / DTC (SAE J2012 / ISO 15031)
 * Enriquecido con lenguaje claro, categorización de severidad y causas 80/20.
 */

export type DTCSeverity = 1 | 2 | 3; 
// 1 = Leve (Conducción segura, revisar en próximo servicio)
// 2 = Precaución (Afecta consumo/potencia, atender pronto)
// 3 = Crítico (Detener motor inmediatamente, riesgo de rotura)

export type DTCSystem = 'Powertrain' | 'Chassis' | 'Body' | 'Network';

export interface DTCRootCause {
  component: string;             // Ej: "Sensor de Oxígeno posterior (Banco 1, Sensor 2)"
  probabilityPercentage: number; // Ej: 60 (%)
  estimatedPartCostUsd: [number, number]; // [min, max] en USD en Venezuela
  difficultyLevel: 'facil' | 'moderado' | 'experto';
  canBeCleaned: boolean;         // Si admite limpieza o requiere cambio obligatorio
}

export interface DTCCodeDefinition {
  code: string;                  // Ej: "P0420"
  system: DTCSystem;
  severity: DTCSeverity;
  technicalTitle: string;        // "Catalyst System Efficiency Below Threshold (Bank 1)"
  plainSpanishExplanation: string; // Explicación sin jerga técnica para el conductor
  severityReason: string;        // Justificación del semáforo
  mostProbableCauses: DTCRootCause[]; // Lista de causas ordenada por probabilidad (80/20)
  venezuelaSpecificContext?: string; // Particularidad por octanaje o calidad de gasolina en VE
  antiScamMechanicQuestions: string[]; // Preguntas para confrontar al mecánico
  suggestedAction: string;       // Paso a paso inmediato que debe seguir el usuario
}
