/**
 * Contratos de Dominio para Vehículos (MDM Canónico de CharuAutos)
 * Adaptado con especificaciones clave para el mercado venezolano.
 */

export type VehicleSegment = 'sedan' | 'suv' | 'hatchback' | 'pickup' | 'crossover';

export type FuelType = 'gasolina_91' | 'gasolina_95' | 'diesel' | 'flex';

export type TransmissionType = 'manual' | 'automatica' | 'cvt';

export type SparePartsAvailability = 'inmediata' | 'alta' | 'moderada' | 'dificil';

export interface VehicleEngineSpec {
  code: string;                  // Ej: "1ZZ-FE", "E-TEC II 1.6"
  displacementLiters: number;    // Ej: 1.8, 1.6
  cylinders: number;             // Ej: 4
  horsepower: number;            // HP a RPM
  torqueNm: number;              // Nm de torque (fuerza para subidas)
  fuelType: FuelType;
  compressionRatio: number;      // Ej: 10.0:1 (relevante para tolerancia a gasolina de bajo octanaje)
  timingMechanism: 'cadena' | 'correa_interferencia' | 'correa_no_interferencia'; // Criticidad de rotura
}

export interface VehicleDimensions {
  groundClearanceMm: number;     // Despeje libre al suelo (crucial para baches y reductores de velocidad en VE)
  trunkCapacityLiters: number;   // Capacidad de carga del maletero
  fuelTankLiters: number;        // Capacidad del tanque de combustible
  passengerCapacity: number;     // 4, 5, 7 puestos
  weightKg: number;              // Peso en vacío
}

export interface VehicleMarketDataVE {
  priceRangeUsdUsed: [number, number]; // [min, max] en mercado de segunda mano (USD)
  priceUsdNew?: number;                // Precio 0km si aplica
  popularNicknames: string[];          // Moteado popular en Venezuela (ej. "Boca de Bagre", "Pantallita")
  partsAvailability: SparePartsAvailability; // Disponibilidad de repuestos en repuesteras locales
  estimatedAnnualMaintenanceUsd: number;    // Costo estimado anual en repuestos y servicios (USD)
  fuelConsumptionCityKmL: number;      // km por litro en tráfico urbano
  fuelConsumptionHighwayKmL: number;   // km por litro en autopista
  commonCriticalIssues: string[];      // Fallas típicas en Venezuela (ej: "Pila de gasolina sensible a suciedad")
}

export interface CanonicalVehicle {
  id: string;                          // UUID o ID canónico (ej: "toyota-corolla-2011-1.8")
  maker: string;                       // "Toyota", "Chevrolet", "Changan"
  model: string;                       // "Corolla", "Aveo", "Alsvin"
  generation: string;                  // "E140 (2008-2014)"
  yearStart: number;
  yearEnd: number;
  trimName: string;                    // "GLi 1.8 Automático"
  segment: VehicleSegment;
  engine: VehicleEngineSpec;
  transmission: TransmissionType;
  dimensions: VehicleDimensions;
  marketDataVE: VehicleMarketDataVE;
  imageUrl?: string;
}
