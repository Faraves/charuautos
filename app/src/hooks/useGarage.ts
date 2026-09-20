import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../storage/service';
import { UserVehicleEntity } from '../storage/repositories/vehicleRepository';
import { FuelLogEntity } from '../storage/repositories/fuelRepository';
import { ServiceRecordEntity } from '../storage/repositories/maintenanceRepository';
import { OdometerBlock } from '../storage/crypto/odometerHasher';

export interface GarageMetrics {
  costPerKmUsd: number;
  costPerKmVes: number;
  fuelEfficiencyKmPerLiter: number;
  estimatedKmPerTank: number;
}

export interface GarageState {
  vehicle: UserVehicleEntity | null;
  odometer: number;
  healthScore: number;
  metrics: GarageMetrics;
  fuelLogs: FuelLogEntity[];
  services: ServiceRecordEntity[];
  odometerBlocks: OdometerBlock[];
  isChainTampered: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useGarage() {
  const [state, setState] = useState<GarageState>({
    vehicle: null,
    odometer: 150000,
    healthScore: 92,
    metrics: {
      costPerKmUsd: 0.11,
      costPerKmVes: 4.18,
      fuelEfficiencyKmPerLiter: 12.4,
      estimatedKmPerTank: 580
    },
    fuelLogs: [],
    services: [],
    odometerBlocks: [],
    isChainTampered: false,
    isLoading: true,
    error: null
  });

  const loadGarageData = useCallback(async () => {
    try {
      await storageService.initialize();
      const vehicles = await storageService.vehicles.listActiveVehicles();
      const activeVehicle = vehicles[0] || null;

      if (activeVehicle) {
        const [fuelLogs, fuelMetrics, services, chainValidation] = await Promise.all([
          storageService.fuel.listFuelLogsByVehicle(activeVehicle.id),
          storageService.fuel.calculateVehicleMetrics(activeVehicle.id),
          storageService.maintenance.listRecordsByVehicle(activeVehicle.id),
          storageService.vehicles.getValidatedOdometerChain(activeVehicle.id)
        ]);

        const avgBcvRate = fuelLogs.length > 0 && fuelLogs[0].bcvExchangeRate ? fuelLogs[0].bcvExchangeRate : 36.5;

        setState({
          vehicle: activeVehicle,
          odometer: activeVehicle.currentMileage,
          healthScore: activeVehicle.healthScore,
          metrics: {
            costPerKmUsd: fuelMetrics.costPerKmUsd,
            costPerKmVes: fuelMetrics.costPerKmUsd * avgBcvRate,
            fuelEfficiencyKmPerLiter: fuelMetrics.averageConsumptionKmPerLiter,
            estimatedKmPerTank: Math.round(fuelMetrics.averageConsumptionKmPerLiter * 48) // Tanque estándar 48L
          },
          fuelLogs,
          services,
          odometerBlocks: chainValidation.chain,
          isChainTampered: chainValidation.isTampered,
          isLoading: false,
          error: null
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (err: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: err.message || 'Error al cargar garage' }));
    }
  }, []);

  useEffect(() => {
    loadGarageData();
  }, [loadGarageData]);

  /**
   * Actualiza el odómetro con generación de bloque criptográfico SHA-256
   */
  const updateMileage = async (newMileageKm: number): Promise<{ success: boolean; message: string; block?: OdometerBlock }> => {
    if (!state.vehicle) {
      return { success: false, message: 'No hay vehículo seleccionado.' };
    }

    try {
      const block = await storageService.vehicles.updateMileage(state.vehicle.id, newMileageKm);
      await loadGarageData();
      return {
        success: true,
        message: `Odómetro actualizado a ${newMileageKm.toLocaleString()} km con hash seguro: ${block.currentHash.substring(0, 10)}...`,
        block
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error al actualizar el kilometraje (posible violación de monotonicidad).'
      };
    }
  };

  /**
   * Registra un nuevo tanqueo de gasolina bimonetario
   */
  const recordFuel = async (params: {
    odometerKm: number;
    litersFilled: number;
    priceTotalUsd: number;
    priceTotalVes?: number;
    bcvExchangeRate?: number;
    octaneType?: 'regular_91' | 'internacional_95';
    fullTank?: boolean;
  }): Promise<{ success: boolean; message: string }> => {
    if (!state.vehicle) {
      return { success: false, message: 'No hay vehículo activo.' };
    }

    try {
      const logId = `fuel_${Date.now()}`;
      await storageService.fuel.addFuelLog({
        id: logId,
        vehicleId: state.vehicle.id,
        recordedAtIso: new Date().toISOString(),
        odometerKm: params.odometerKm,
        litersFilled: params.litersFilled,
        priceTotalUsd: params.priceTotalUsd,
        priceTotalVes: params.priceTotalVes || params.priceTotalUsd * (params.bcvExchangeRate || 36.5),
        bcvExchangeRate: params.bcvExchangeRate || 36.5,
        octaneType: params.octaneType || 'internacional_95',
        fullTank: params.fullTank ?? true
      });

      // Si el odómetro ingresado es superior, registrar también en la cadena criptográfica
      if (params.odometerKm > state.odometer) {
        await storageService.vehicles.updateMileage(state.vehicle.id, params.odometerKm);
      }

      await loadGarageData();
      return { success: true, message: 'Tanqueo de combustible guardado en SQLite local.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Error al registrar combustible.' };
    }
  };

  /**
   * Registra un nuevo servicio o mantenimiento preventivo/correctivo
   */
  const recordService = async (params: {
    serviceType: string;
    mileageAtService: number;
    partsCostUsd: number;
    laborCostUsd: number;
    workshopName?: string;
    notes?: string;
    nextDueMileageKm?: number;
  }): Promise<{ success: boolean; message: string }> => {
    if (!state.vehicle) {
      return { success: false, message: 'No hay vehículo activo.' };
    }

    try {
      const srvId = `srv_${Date.now()}`;
      await storageService.maintenance.addServiceRecord({
        id: srvId,
        vehicleId: state.vehicle.id,
        serviceDateIso: new Date().toISOString(),
        mileageAtService: params.mileageAtService,
        serviceType: params.serviceType,
        partsCostUsd: params.partsCostUsd,
        laborCostUsd: params.laborCostUsd,
        workshopName: params.workshopName || 'Taller Particular',
        notes: params.notes,
        nextDueMileageKm: params.nextDueMileageKm
      });

      await loadGarageData();
      return { success: true, message: 'Servicio técnico guardado con éxito.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Error al registrar servicio.' };
    }
  };

  return {
    ...state,
    refresh: loadGarageData,
    updateMileage,
    recordFuel,
    recordService
  };
}
