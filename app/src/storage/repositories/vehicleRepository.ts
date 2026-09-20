import { OdometerCryptographicChain, OdometerBlock } from '../crypto/odometerHasher';

export interface UserVehicleEntity {
  id: string;
  maker: string;
  model: string;
  trimName: string;
  nickname?: string;
  licensePlate: string;
  currentMileage: number;
  healthScore: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Repositorio de Vehículos con Integridad Criptográfica de Odómetro
 */
export class VehicleRepository {
  // Simulador de almacenamiento en memoria / SQLite State
  private vehicles: Map<string, UserVehicleEntity> = new Map();
  private odometerChains: Map<string, OdometerBlock[]> = new Map();

  /**
   * Registra un nuevo vehículo en el garage local e inicializa su bloque génesis de odómetro.
   */
  public async addVehicle(data: Omit<UserVehicleEntity, 'createdAt' | 'updatedAt'>): Promise<UserVehicleEntity> {
    const now = new Date().toISOString();
    const vehicle: UserVehicleEntity = {
      ...data,
      createdAt: now,
      updatedAt: now
    };

    this.vehicles.set(vehicle.id, vehicle);

    // Inicializar cadena de odómetro con bloque 0
    const genesisBlock = OdometerCryptographicChain.createBlock(
      vehicle.id,
      vehicle.currentMileage,
      null,
      now
    );

    this.odometerChains.set(vehicle.id, [genesisBlock]);

    return vehicle;
  }

  /**
   * Actualiza el kilometraje del vehículo, validando monotonicidad y anexando bloque SHA-256.
   */
  public async updateMileage(vehicleId: string, newMileage: number): Promise<OdometerBlock> {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) {
      throw new Error(`Vehículo con ID ${vehicleId} no encontrado.`);
    }

    const chain = this.odometerChains.get(vehicleId) || [];
    const lastBlock = chain.length > 0 ? chain[chain.length - 1] : null;

    // Crea el nuevo bloque criptográfico (lanzará error si newMileage < lastBlock.mileageKm)
    const newBlock = OdometerCryptographicChain.createBlock(
      vehicleId,
      newMileage,
      lastBlock,
      new Date().toISOString()
    );

    chain.push(newBlock);
    this.odometerChains.set(vehicleId, chain);

    // Actualizar vehículo
    vehicle.currentMileage = newMileage;
    vehicle.updatedAt = new Date().toISOString();
    this.vehicles.set(vehicleId, vehicle);

    return newBlock;
  }

  /**
   * Obtiene la cadena completa de bloques de odómetro y valida su integridad matemática.
   */
  public async getValidatedOdometerChain(vehicleId: string): Promise<{
    chain: OdometerBlock[];
    isTampered: boolean;
    error?: string;
  }> {
    const chain = this.odometerChains.get(vehicleId) || [];
    const validation = OdometerCryptographicChain.verifyChain(chain);

    return {
      chain,
      isTampered: !validation.isValid,
      error: validation.error
    };
  }

  public async getVehicleById(id: string): Promise<UserVehicleEntity | null> {
    return this.vehicles.get(id) || null;
  }

  public async listActiveVehicles(): Promise<UserVehicleEntity[]> {
    return Array.from(this.vehicles.values()).filter((v) => v.isActive);
  }
}
