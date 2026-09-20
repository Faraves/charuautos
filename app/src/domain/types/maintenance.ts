/**
 * Contratos de Dominio para el Cuaderno de Mantenimiento Dinámico y Métricas Financieras
 */

export type ServiceSeverity = 'preventivo' | 'correctivo' | 'urgente';

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  dateIso: string;
  mileageKm: number;
  serviceType: string;           // Ej: "Cambio de Aceite y Filtro", "Pastillas de Freno"
  partsCostUsd: number;
  laborCostUsd: number;
  totalCostUsd: number;
  totalCostVes?: number;
  workshopName?: string;
  verifiedByWorkshop: boolean;
  notes?: string;
  nextServiceDueMileageKm?: number;
}

export interface FuelLogRecord {
  id: string;
  vehicleId: string;
  dateIso: string;
  mileageKm: number;
  litersFilled: number;
  pricePerLiterUsd: number;
  totalPaidUsd: number;
  totalPaidVes?: number;
  octaneType: 'regular_91' | 'premium_95' | 'diesel';
  fullTank: boolean;
}

export interface VehicleHealthAnalytics {
  healthScore: number;           // 0 a 100
  totalSpentLifetimeUsd: number;
  costPerKilometerUsd: number;   // $/km
  averageConsumptionKmL: number; // km/litro
  lastRecordedMileageKm: number;
  pendingUrgentAlertsCount: number;
  upcomingScheduledServicesCount: number;
}
