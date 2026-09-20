import { CanonicalVehicle } from '../types/vehicle';
import { 
  MatchmakerUserProfile, 
  MatchResultItem, 
  VehicleMatchBreakdown, 
  MatchmakerResponse 
} from '../types/matchmaker';
import { VENEZUELAN_VEHICLES_SEED } from '../data/vehicles.seed';

/**
 * Motor Algorítmico del Matchmaker de CharuAutos
 * Evalúa compatibilidad de vehículos con la realidad automotriz de Venezuela.
 */
export class MatchmakerEngine {
  private vehicles: CanonicalVehicle[];

  constructor(vehicles: CanonicalVehicle[] = VENEZUELAN_VEHICLES_SEED) {
    this.vehicles = vehicles;
  }

  /**
   * Ejecuta la evaluación completa para un perfil de usuario.
   */
  public evaluate(profile: MatchmakerUserProfile): MatchmakerResponse {
    const scoredList: MatchResultItem[] = this.vehicles.map((vehicle) => {
      const breakdown = this.calculateBreakdown(profile, vehicle);
      const overallMatchScore = this.calculateOverallScore(breakdown, vehicle);
      const pros = this.generatePros(profile, vehicle);
      const cons = this.generateCons(profile, vehicle);
      const verdict = this.generateVerdict(overallMatchScore, vehicle);

      return {
        vehicle,
        overallMatchScore,
        breakdown,
        prosInVenezuela: pros,
        consInVenezuela: cons,
        verdictSummary: verdict
      };
    });

    // Ordenar de mayor a menor compatibilidad
    scoredList.sort((a, b) => b.overallMatchScore - a.overallMatchScore);

    return {
      queryTimestamp: new Date().toISOString(),
      totalEvaluated: this.vehicles.length,
      recommendations: scoredList
    };
  }

  private calculateBreakdown(
    profile: MatchmakerUserProfile, 
    vehicle: CanonicalVehicle
  ): VehicleMatchBreakdown {
    // 1. Ajuste a Presupuesto
    const avgPrice = (vehicle.marketDataVE.priceRangeUsdUsed[0] + vehicle.marketDataVE.priceRangeUsdUsed[1]) / 2;
    let budgetScore = 100;
    if (avgPrice > profile.maxBudgetUsd) {
      const excessRatio = (avgPrice - profile.maxBudgetUsd) / profile.maxBudgetUsd;
      budgetScore = Math.max(0, Math.round(100 - excessRatio * 150));
    } else {
      // Si está bien por debajo del presupuesto, excelente
      budgetScore = 100;
    }

    // 2. Costo de Mantenimiento TCO
    // Base de referencia: 200 USD/año = 100 pts; 600 USD/año = 40 pts
    const annualMaint = vehicle.marketDataVE.estimatedAnnualMaintenanceUsd;
    const maintenanceTcoScore = Math.max(20, Math.min(100, Math.round(100 - (annualMaint - 200) * 0.15)));

    // 3. Adaptabilidad al Camino (Despeje al suelo + Torque)
    let roadSuitabilityScore = 70;
    const clearance = vehicle.dimensions.groundClearanceMm;
    const torque = vehicle.engine.torqueNm;

    if (profile.primaryRoadCondition === 'muchos_baches_huecos') {
      roadSuitabilityScore = clearance >= 160 ? 95 : clearance >= 145 ? 75 : 50;
    } else if (profile.primaryRoadCondition === 'subidas_pronunciadas') {
      roadSuitabilityScore = torque >= 160 ? 95 : torque >= 135 ? 80 : 55;
    } else if (profile.primaryRoadCondition === 'autopista_viajes') {
      roadSuitabilityScore = vehicle.engine.horsepower >= 110 ? 90 : 70;
    } else {
      roadSuitabilityScore = 85; // Ciudad plana
    }

    // 4. Sensibilidad al Combustible
    let fuelSuitabilityScore = 75;
    if (profile.fuelPriority === 'maximo_ahorro') {
      const cityKml = vehicle.marketDataVE.fuelConsumptionCityKmL;
      fuelSuitabilityScore = Math.min(100, Math.round(cityKml * 6.5));
    } else if (profile.fuelPriority === 'resistencia_gasolina_mala') {
      // Motores atmosféricos con compresión moderada toleran mejor la gasolina irregular
      fuelSuitabilityScore = vehicle.engine.compressionRatio <= 10.0 ? 95 : 65;
    } else {
      // Potencia
      fuelSuitabilityScore = vehicle.engine.horsepower >= 120 ? 90 : 70;
    }

    // 5. Espacio / Habitabilidad
    let spaceScore = 80;
    if (profile.needsBigTrunk && vehicle.dimensions.trunkCapacityLiters < 400) {
      spaceScore -= 30;
    }
    if (vehicle.dimensions.passengerCapacity < profile.minPassengerCapacity) {
      spaceScore -= 40;
    }
    spaceScore = Math.max(10, Math.min(100, spaceScore));

    // 6. Disponibilidad de Repuestos
    const partsMap: Record<string, number> = {
      inmediata: 100,
      alta: 85,
      moderada: 65,
      dificil: 35
    };
    const partsAvailabilityScore = partsMap[vehicle.marketDataVE.partsAvailability] || 70;

    return {
      budgetScore,
      maintenanceTcoScore,
      roadSuitabilityScore,
      fuelSuitabilityScore,
      spaceScore,
      partsAvailabilityScore
    };
  }

  private calculateOverallScore(
    breakdown: VehicleMatchBreakdown, 
    vehicle: CanonicalVehicle
  ): number {
    // Ponderación estándar balanceada
    const rawScore = 
      breakdown.budgetScore * 0.25 +
      breakdown.partsAvailabilityScore * 0.20 +
      breakdown.roadSuitabilityScore * 0.20 +
      breakdown.maintenanceTcoScore * 0.15 +
      breakdown.fuelSuitabilityScore * 0.10 +
      breakdown.spaceScore * 0.10;

    // Penalización por correa de interferencia si el comprador busca bajo mantenimiento
    let penalty = 1.0;
    if (vehicle.engine.timingMechanism === 'correa_interferencia') {
      penalty = 0.94; // 6% de penalización por riesgo de rotura
    }

    return Math.min(99, Math.max(20, Math.round(rawScore * penalty)));
  }

  private generatePros(profile: MatchmakerUserProfile, vehicle: CanonicalVehicle): string[] {
    const pros: string[] = [];
    if (vehicle.marketDataVE.partsAvailability === 'inmediata') {
      pros.push('Repuestos inmediatos en cualquier repuestera de Venezuela.');
    }
    if (vehicle.dimensions.groundClearanceMm >= 160) {
      pros.push(`Excelente altura libre (${vehicle.dimensions.groundClearanceMm} mm) para evitar raspaduras con baches.`);
    }
    if (vehicle.engine.timingMechanism === 'cadena') {
      pros.push('Motor con cadena de tiempo (sin riesgo de doblar válvulas por correa partida).');
    }
    if (vehicle.marketDataVE.fuelConsumptionCityKmL >= 12.0) {
      pros.push(`Muy económico en ciudad: rinde ~${vehicle.marketDataVE.fuelConsumptionCityKmL} km por litro.`);
    }
    if (vehicle.dimensions.trunkCapacityLiters >= 440) {
      pros.push(`Maletero amplio de ${vehicle.dimensions.trunkCapacityLiters} litros ideal para viajes familiares.`);
    }
    return pros.slice(0, 3);
  }

  private generateCons(profile: MatchmakerUserProfile, vehicle: CanonicalVehicle): string[] {
    const cons: string[] = [];
    if (vehicle.engine.timingMechanism === 'correa_interferencia') {
      cons.push('Requiere cambio estricto de correa de distribución cada 40,000 km (motor de interferencia).');
    }
    if (vehicle.marketDataVE.partsAvailability === 'moderada') {
      cons.push('Repuestos de carrocería y sensores suelen concentrarse solo en concesionarios o importación.');
    }
    if (vehicle.dimensions.groundClearanceMm < 150) {
      cons.push('Despeje bajo: requiere precaución extrema en reductores de velocidad pronunciados.');
    }
    if (vehicle.marketDataVE.commonCriticalIssues.length > 0) {
      cons.push(`Ojo con: ${vehicle.marketDataVE.commonCriticalIssues[0]}`);
    }
    return cons.slice(0, 2);
  }

  private generateVerdict(score: number, vehicle: CanonicalVehicle): string {
    if (score >= 88) {
      return `¡Una de las opciones más equilibradas y seguras para tu bolsillo en Venezuela! ${vehicle.marketDataVE.popularNicknames[0] || vehicle.model} cumple con creces tus requisitos.`;
    }
    if (score >= 75) {
      return `Buena alternativa con excelente rendimiento, aunque debes tener presente el mantenimiento de ${vehicle.engine.timingMechanism === 'cadena' ? 'suspensión' : 'la correa de tiempo'}.`;
    }
    return `Opción viable si priorizas precio, pero considera que sus costos o disponibilidad de piezas exigen mayor atención.`;
  }
}
