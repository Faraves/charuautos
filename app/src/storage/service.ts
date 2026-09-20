import { VehicleRepository, UserVehicleEntity } from './repositories/vehicleRepository';
import { FuelRepository, FuelLogEntity } from './repositories/fuelRepository';
import { MaintenanceRepository, ServiceRecordEntity } from './repositories/maintenanceRepository';
import { SyncQueueRepository } from './repositories/syncQueueRepository';
import { SyncManager } from './sync/syncManager';
import { SubscriptionRepository } from './repositories/subscriptionRepository';

/**
 * Servicio Centralizado de Almacenamiento Local (Local Storage Orchestrator)
 * Provee instancias únicas (Singleton) de los repositorios, cola de mutaciones y sincronizador reactivo.
 */
export class LocalStorageService {
  private static instance: LocalStorageService;

  public readonly vehicles: VehicleRepository;
  public readonly fuel: FuelRepository;
  public readonly maintenance: MaintenanceRepository;
  public readonly syncQueue: SyncQueueRepository;
  public readonly syncManager: SyncManager;
  public readonly subscriptions: SubscriptionRepository;

  private isInitialized = false;

  private constructor() {
    this.vehicles = new VehicleRepository();
    this.fuel = new FuelRepository();
    this.maintenance = new MaintenanceRepository();
    this.syncQueue = new SyncQueueRepository();
    this.syncManager = new SyncManager(this.syncQueue);
    this.subscriptions = new SubscriptionRepository();
  }


  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  /**
   * Inicializa la base de datos local con el vehículo activo por defecto para Venezuela
   * (Toyota Corolla GLi 2011 "Pantallita") e historial de servicios y combustible inicial.
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const defaultVehicleId = 'veh_corolla_2011_01';
    
    // 1. Crear vehículo activo
    await this.vehicles.addVehicle({
      id: defaultVehicleId,
      maker: 'Toyota',
      model: 'Corolla',
      trimName: 'GLi 1.8L Automático ("Pantallita")',
      nickname: 'El Gladiador',
      licensePlate: 'AB123CD',
      currentMileage: 148500,
      healthScore: 92,
      isActive: true
    });

    // 2. Anexar histórico de odómetro previo para certificar la cadena SHA-256
    try {
      await this.vehicles.updateMileage(defaultVehicleId, 149200);
      await this.vehicles.updateMileage(defaultVehicleId, 150000);
    } catch {
      // Bloques sucesivos iniciales
    }

    // 3. Cargar registros iniciales de combustible para cálculo de $/km y consumo km/L
    await this.fuel.addFuelLog({
      id: 'fuel_init_01',
      vehicleId: defaultVehicleId,
      recordedAtIso: new Date(Date.now() - 14 * 86400000).toISOString(),
      odometerKm: 149450,
      litersFilled: 45.0,
      priceTotalUsd: 22.50, // $0.50/L internacional
      priceTotalVes: 810.0,
      bcvExchangeRate: 36.0,
      octaneType: 'internacional_95',
      fullTank: true
    });

    await this.fuel.addFuelLog({
      id: 'fuel_init_02',
      vehicleId: defaultVehicleId,
      recordedAtIso: new Date().toISOString(),
      odometerKm: 150000,
      litersFilled: 44.2,
      priceTotalUsd: 22.10,
      priceTotalVes: 805.0,
      bcvExchangeRate: 36.4,
      octaneType: 'internacional_95',
      fullTank: true
    });

    // 4. Cargar servicios previos y futuros
    await this.maintenance.addServiceRecord({
      id: 'srv_init_01',
      vehicleId: defaultVehicleId,
      serviceDateIso: new Date(Date.now() - 60 * 86400000).toISOString(),
      mileageAtService: 145200,
      serviceType: 'Pastillas de Freno Delanteras',
      partsCostUsd: 35.0,
      laborCostUsd: 15.0,
      workshopName: 'Frenos & Tren Delantero Los Ruices',
      notes: 'Pastillas cerámicas instaladas.',
      nextDueMileageKm: 175000
    });

    await this.maintenance.addServiceRecord({
      id: 'srv_init_02',
      vehicleId: defaultVehicleId,
      serviceDateIso: new Date(Date.now() - 120 * 86400000).toISOString(),
      mileageAtService: 140000,
      serviceType: 'Limpieza de Inyectores & Filtro Gasolina',
      partsCostUsd: 20.0,
      laborCostUsd: 10.0,
      workshopName: 'AutoServicios Bello Monte',
      notes: 'Preventivo por mala calidad de combustible.',
      nextDueMileageKm: 160000
    });

    this.isInitialized = true;
  }

  /**
   * Registra una operación y la encola para sincronización eventual
   */
  public async trackOfflineMutation(
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    payload: Record<string, any>
  ): Promise<void> {
    await this.syncQueue.enqueueMutation(table, action, payload);
    // Si hay conexión, intentar despachar de inmediato
    if (this.syncManager.getOnlineStatus()) {
      this.syncManager.flushQueue();
    }
  }
}

export const storageService = LocalStorageService.getInstance();
