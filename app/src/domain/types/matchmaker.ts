/**
 * Contratos de Dominio para el Matchmaker de Compra de CharuAutos
 */

import { CanonicalVehicle, SparePartsAvailability } from './vehicle';

export type RoadCondition = 'ciudad_plana' | 'subidas_pronunciadas' | 'muchos_baches_huecos' | 'autopista_viajes';

export type FuelPriority = 'maximo_ahorro' | 'fuerza_y_potencia' | 'resistencia_gasolina_mala';

export interface MatchmakerUserProfile {
  maxBudgetUsd: number;                  // Presupuesto máximo del usuario en USD
  preferNewOrUsed: 'usado' | 'cero_km' | 'indiferente';
  primaryRoadCondition: RoadCondition;   // Tipo de camino habitual
  minPassengerCapacity: number;          // 4, 5, 7 puestos
  fuelPriority: FuelPriority;            // Sensibilidad al combustible
  sparePartsTolerance: SparePartsAvailability; // Qué tan fácil requiere repuestos
  needsBigTrunk: boolean;                // Si requiere maletero amplio (> 400 L)
}

export interface VehicleMatchBreakdown {
  budgetScore: number;         // 0 - 100
  maintenanceTcoScore: number; // 0 - 100
  roadSuitabilityScore: number;// 0 - 100 (Despeje al suelo + torque)
  fuelSuitabilityScore: number;// 0 - 100 (Consumo + compresión)
  spaceScore: number;          // 0 - 100
  partsAvailabilityScore: number; // 0 - 100
}

export interface MatchResultItem {
  vehicle: CanonicalVehicle;
  overallMatchScore: number;    // % Final ponderado (0 - 100)
  breakdown: VehicleMatchBreakdown;
  prosInVenezuela: string[];    // Puntos a favor para las calles del país
  consInVenezuela: string[];    // Puntos en contra o precauciones
  verdictSummary: string;       // Conclusión en una sola frase pedagógica
}

export interface MatchmakerResponse {
  queryTimestamp: string;
  totalEvaluated: number;
  recommendations: MatchResultItem[]; // Ordenadas de mayor a menor compatibilidad
}
