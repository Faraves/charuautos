export interface ServiceRecordEntity {
  id: string;
  vehicleId: string;
  serviceDateIso: string;
  mileageAtService: number;
  serviceType: string;
  partsCostUsd: number;
  laborCostUsd: number;
  totalCostUsd: number;
  workshopName?: string;
  verifiedByWorkshop: boolean;
  notes?: string;
  nextDueMileageKm?: number;
}

export class MaintenanceRepository {
  private services: Map<string, ServiceRecordEntity> = new Map();

  public async addService(record: ServiceRecordEntity): Promise<ServiceRecordEntity> {
    this.services.set(record.id, record);
    return record;
  }

  public async getServicesByVehicle(vehicleId: string): Promise<ServiceRecordEntity[]> {
    const list = Array.from(this.services.values()).filter((s) => s.vehicleId === vehicleId);
    return list.sort((a, b) => new Date(b.serviceDateIso).getTime() - new Date(a.serviceDateIso).getTime());
  }

  /**
   * Recalcula el Health Score (0 - 100) en base a servicios vencidos y kilometraje actual.
   */
  public async computeHealthScore(vehicleId: string, currentMileageKm: number): Promise<number> {
    const services = await this.getServicesByVehicle(vehicleId);
    let health = 100;

    // Buscar si hay cambio de aceite reciente
    const oilServices = services.filter((s) => s.serviceType.toLowerCase().includes('aceite'));
    if (oilServices.length > 0) {
      const lastOil = oilServices[0];
      const kmSinceOil = currentMileageKm - lastOil.mileageAtService;
      if (kmSinceOil > 8000) {
        health -= 15; // Aceite vencido
      } else if (kmSinceOil > 5000) {
        health -= 5; // Aceite próximo
      }
    } else {
      health -= 20; // Sin registro de aceite
    }

    // Buscar servicios con alertas vencidas
    services.forEach((s) => {
      if (s.nextDueMileageKm && currentMileageKm > s.nextDueMileageKm) {
        const excess = currentMileageKm - s.nextDueMileageKm;
        if (excess > 2000) {
          health -= 10;
        } else {
          health -= 5;
        }
      }
    });

    return Math.max(20, Math.min(100, health));
  }
}
