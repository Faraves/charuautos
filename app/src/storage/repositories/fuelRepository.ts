export interface FuelLogEntity {
  id: string;
  vehicleId: string;
  recordedAtIso: string;
  odometerKm: number;
  litersFilled: number;
  priceTotalUsd: number;
  priceTotalVes?: number;
  bcvExchangeRate?: number;
  octaneType: 'regular_91' | 'premium_95' | 'diesel';
  fullTank: boolean;
}

export interface FuelMetricsSummary {
  totalSpentUsd: number;
  totalLiters: number;
  averageConsumptionKmL: number; // km / Litro
  costPerKilometerUsd: number;   // USD / km
  costPerKilometerVes?: number;  // Bs. / km
  totalDistanceTrackedKm: number;
}

export class FuelRepository {
  private logs: Map<string, FuelLogEntity> = new Map();

  public async addFuelLog(log: FuelLogEntity): Promise<FuelLogEntity> {
    this.logs.set(log.id, log);
    return log;
  }

  public async getLogsByVehicle(vehicleId: string): Promise<FuelLogEntity[]> {
    const list = Array.from(this.logs.values()).filter((l) => l.vehicleId === vehicleId);
    return list.sort((a, b) => a.odometerKm - b.odometerKm);
  }

  /**
   * Calcula las métricas de rendimiento y costo operativo por km para un vehículo.
   */
  public async calculateMetrics(vehicleId: string, bcvRate: number = 38.0): Promise<FuelMetricsSummary> {
    const logs = await this.getLogsByVehicle(vehicleId);

    if (logs.length < 2) {
      return {
        totalSpentUsd: logs.reduce((acc, l) => acc + l.priceTotalUsd, 0),
        totalLiters: logs.reduce((acc, l) => acc + l.litersFilled, 0),
        averageConsumptionKmL: 12.0, // Estimado de fábrica inicial si no hay historial
        costPerKilometerUsd: 0.10,
        costPerKilometerVes: 0.10 * bcvRate,
        totalDistanceTrackedKm: 0
      };
    }

    const firstKm = logs[0].odometerKm;
    const lastKm = logs[logs.length - 1].odometerKm;
    const distanceKm = lastKm - firstKm;

    const totalSpentUsd = logs.reduce((acc, l) => acc + l.priceTotalUsd, 0);
    // Excluir la primera carga del cálculo de litros consumidos (estándar de tanque lleno a tanque lleno)
    const consumedLiters = logs.slice(1).reduce((acc, l) => acc + l.litersFilled, 0);

    const averageConsumptionKmL = consumedLiters > 0 && distanceKm > 0
      ? Math.round((distanceKm / consumedLiters) * 10) / 10
      : 12.0;

    const costPerKilometerUsd = distanceKm > 0
      ? Math.round((totalSpentUsd / distanceKm) * 100) / 100
      : 0.10;

    return {
      totalSpentUsd: Math.round(totalSpentUsd * 100) / 100,
      totalLiters: Math.round(consumedLiters * 10) / 10,
      averageConsumptionKmL,
      costPerKilometerUsd,
      costPerKilometerVes: Math.round(costPerKilometerUsd * bcvRate * 100) / 100,
      totalDistanceTrackedKm: distanceKm
    };
  }
}
