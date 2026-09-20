import { useState, useMemo, useCallback } from 'react';
import { DocumentScraperEngine } from '../domain/engine/documentScraper';
import { ExtractedVehicleSpec } from '../domain/types/documentScraper';
import { VE_VEHICLE_CATALOG } from '../domain/data/vehicles.seed';
import { Vehicle } from '../domain/types/vehicle';

export function useDocumentScraper() {
  const [extractedSpec, setExtractedSpec] = useState<ExtractedVehicleSpec | null>({
    maker: 'GAC',
    model: 'Empow',
    year: 2024,
    powerHp: 177,
    torqueNm: 270,
    groundClearanceMm: 140,
    trunkVolumeLiters: 450,
    fuelConsumptionKmPerLiter: 14.5,
    recommendedFuel: 'Gasolina 95 octanos sin plomo',
    transmissionType: 'Automática Doble Embrague 7WD',
    confidenceScore: 0.92,
    rawSnippets: [
      'Motor 1.5L Turbo GDI con 177 caballos de fuerza',
      'Torque máximo de 270 Nm entre 1400-4500 rpm',
      'Despeje del suelo: 140 mm',
      'Capacidad del maletero: 450 L'
    ]
  });

  const [benchmarkVehicleId, setBenchmarkVehicleId] = useState<string>('toyota_corolla_pantallita_2011');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const engine = useMemo(() => new DocumentScraperEngine(), []);

  const benchmarkVehicle = useMemo<Vehicle | null>(() => {
    return VE_VEHICLE_CATALOG.find((v) => v.id === benchmarkVehicleId) || VE_VEHICLE_CATALOG[0];
  }, [benchmarkVehicleId]);

  const processRawText = useCallback((rawText: string) => {
    setIsProcessing(true);
    try {
      const result = engine.extractSpecsFromText(rawText);
      setExtractedSpec(result);
    } finally {
      setIsProcessing(false);
    }
  }, [engine]);

  return {
    extractedSpec,
    benchmarkVehicle,
    benchmarkVehicleId,
    setBenchmarkVehicleId,
    isProcessing,
    processRawText,
    availableBenchmarks: VE_VEHICLE_CATALOG
  };
}
