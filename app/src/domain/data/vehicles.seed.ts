import { CanonicalVehicle } from '../types/vehicle';

/**
 * Dataset Canónico de los 20 Vehículos más Relevantes en el Mercado Venezolano
 * Datos reales auditados para el MVP de CharuAutos.
 */
export const VENEZUELAN_VEHICLES_SEED: CanonicalVehicle[] = [
  {
    id: 'toyota-corolla-gli-2011',
    maker: 'Toyota',
    model: 'Corolla',
    generation: 'E140 (2008-2014)',
    yearStart: 2008,
    yearEnd: 2014,
    trimName: 'GLi 1.8 Automático',
    segment: 'sedan',
    engine: {
      code: '1ZZ-FE',
      displacementLiters: 1.8,
      cylinders: 4,
      horsepower: 132,
      torqueNm: 170,
      fuelType: 'gasolina_91',
      compressionRatio: 10.0,
      timingMechanism: 'cadena'
    },
    transmission: 'automatica',
    dimensions: {
      groundClearanceMm: 160,
      trunkCapacityLiters: 450,
      fuelTankLiters: 50,
      passengerCapacity: 5,
      weightKg: 1260
    },
    marketDataVE: {
      priceRangeUsdUsed: [6500, 9500],
      popularNicknames: ['Corolla Pantallita', 'Boca de Bagre'],
      partsAvailability: 'inmediata',
      estimatedAnnualMaintenanceUsd: 320,
      fuelConsumptionCityKmL: 11.5,
      fuelConsumptionHighwayKmL: 15.0,
      commonCriticalIssues: [
        'Bomba de agua suele fugar alrededor de los 120,000 km',
        'Bujes de horquilla delantera por baches'
      ]
    }
  },
  {
    id: 'chevrolet-aveo-ls-2011',
    maker: 'Chevrolet',
    model: 'Aveo',
    generation: 'T250 (2007-2014)',
    yearStart: 2007,
    yearEnd: 2014,
    trimName: 'LS 1.6 4 Puertas',
    segment: 'sedan',
    engine: {
      code: 'E-TEC II',
      displacementLiters: 1.6,
      cylinders: 4,
      horsepower: 103,
      torqueNm: 145,
      fuelType: 'gasolina_91',
      compressionRatio: 9.5,
      timingMechanism: 'correa_interferencia'
    },
    transmission: 'manual',
    dimensions: {
      groundClearanceMm: 150,
      trunkCapacityLiters: 400,
      fuelTankLiters: 45,
      passengerCapacity: 5,
      weightKg: 1115
    },
    marketDataVE: {
      priceRangeUsdUsed: [3200, 5200],
      popularNicknames: ['Aveo 4 Puertas', 'El Aveito'],
      partsAvailability: 'inmediata',
      estimatedAnnualMaintenanceUsd: 280,
      fuelConsumptionCityKmL: 10.0,
      fuelConsumptionHighwayKmL: 13.5,
      commonCriticalIssues: [
        'CRÍTICO: Correa de distribución dobla válvulas si no se cambia cada 40,000 km',
        'Pila de gasolina sensible a tanques sucios',
        'Termostato plástico tiende a tostarse'
      ]
    }
  },
  {
    id: 'ford-fiesta-move-2012',
    maker: 'Ford',
    model: 'Fiesta',
    generation: 'Mk5 Facelift (2010-2013)',
    yearStart: 2010,
    yearEnd: 2013,
    trimName: 'Move 1.6 Automático / Manual',
    segment: 'sedan',
    engine: {
      code: 'Zetec RoCam',
      displacementLiters: 1.6,
      cylinders: 4,
      horsepower: 98,
      torqueNm: 142,
      fuelType: 'gasolina_91',
      compressionRatio: 9.5,
      timingMechanism: 'cadena'
    },
    transmission: 'manual',
    dimensions: {
      groundClearanceMm: 140,
      trunkCapacityLiters: 420,
      fuelTankLiters: 54,
      passengerCapacity: 5,
      weightKg: 1120
    },
    marketDataVE: {
      priceRangeUsdUsed: [3400, 5500],
      popularNicknames: ['Fiesta Move', 'Fiestica'],
      partsAvailability: 'alta',
      estimatedAnnualMaintenanceUsd: 350,
      fuelConsumptionCityKmL: 10.5,
      fuelConsumptionHighwayKmL: 14.2,
      commonCriticalIssues: [
        'Tomas de agua plásticas del motor resecas (migrar a toma de aluminio)',
        'Envase de refrigerante tiende a fisurarse con calor'
      ]
    }
  },
  {
    id: 'toyota-yaris-sedan-2008',
    maker: 'Toyota',
    model: 'Yaris',
    generation: 'XP90 (2006-2009)',
    yearStart: 2006,
    yearEnd: 2009,
    trimName: 'Sedan 1.3 / 1.5',
    segment: 'sedan',
    engine: {
      code: '2NZ-FE',
      displacementLiters: 1.3,
      cylinders: 4,
      horsepower: 86,
      torqueNm: 122,
      fuelType: 'gasolina_91',
      compressionRatio: 10.5,
      timingMechanism: 'cadena'
    },
    transmission: 'automatica',
    dimensions: {
      groundClearanceMm: 155,
      trunkCapacityLiters: 475,
      fuelTankLiters: 42,
      passengerCapacity: 5,
      weightKg: 1060
    },
    marketDataVE: {
      priceRangeUsdUsed: [5500, 7800],
      popularNicknames: ['Yaris Belén', 'Yaris Redondito'],
      partsAvailability: 'alta',
      estimatedAnnualMaintenanceUsd: 260,
      fuelConsumptionCityKmL: 13.0,
      fuelConsumptionHighwayKmL: 17.5,
      commonCriticalIssues: [
        'Desgaste de puntas de tripoide en giros cerrados',
        'Soportes de motor delanteros'
      ]
    }
  },
  {
    id: 'changan-alsvin-2023',
    maker: 'Changan',
    model: 'Alsvin',
    generation: 'Gen 3 (2022-Presente)',
    yearStart: 2022,
    yearEnd: 2025,
    trimName: '1.4 Manual Comfort / 1.5 DCT',
    segment: 'sedan',
    engine: {
      code: 'BlueCore 1.4',
      displacementLiters: 1.4,
      cylinders: 4,
      horsepower: 99,
      torqueNm: 135,
      fuelType: 'gasolina_95',
      compressionRatio: 10.5,
      timingMechanism: 'cadena'
    },
    transmission: 'manual',
    dimensions: {
      groundClearanceMm: 145,
      trunkCapacityLiters: 380,
      fuelTankLiters: 40,
      passengerCapacity: 5,
      weightKg: 1090
    },
    marketDataVE: {
      priceRangeUsdUsed: [11000, 13500],
      priceUsdNew: 16500,
      popularNicknames: ['El Changan Chiquito', 'Alsvin'],
      partsAvailability: 'moderada',
      estimatedAnnualMaintenanceUsd: 250,
      fuelConsumptionCityKmL: 13.5,
      fuelConsumptionHighwayKmL: 17.0,
      commonCriticalIssues: [
        'Baja altura del parachoques delantero con aceras altas',
        'Requiere gasolina limpia para evitar avisos de inyección'
      ]
    }
  },
  {
    id: 'toyota-hilux-kavak-2011',
    maker: 'Toyota',
    model: 'Hilux',
    generation: 'AN10 / AN20 (2006-2015)',
    yearStart: 2006,
    yearEnd: 2015,
    trimName: 'Kavak 4.0 V6 4x4',
    segment: 'pickup',
    engine: {
      code: '1GR-FE',
      displacementLiters: 4.0,
      cylinders: 6,
      horsepower: 236,
      torqueNm: 361,
      fuelType: 'gasolina_91',
      compressionRatio: 10.0,
      timingMechanism: 'cadena'
    },
    transmission: 'automatica',
    dimensions: {
      groundClearanceMm: 225,
      trunkCapacityLiters: 1000,
      fuelTankLiters: 80,
      passengerCapacity: 5,
      weightKg: 1880
    },
    marketDataVE: {
      priceRangeUsdUsed: [14000, 22000],
      popularNicknames: ['La Kavak', 'Hilux Cuadrada'],
      partsAvailability: 'inmediata',
      estimatedAnnualMaintenanceUsd: 550,
      fuelConsumptionCityKmL: 6.5,
      fuelConsumptionHighwayKmL: 9.5,
      commonCriticalIssues: [
        'Alto consumo de gasolina en ciudad',
        'Bomba de dirección hidráulica con desgaste por neumáticos sobremedida'
      ]
    }
  },
  {
    id: 'chevrolet-spark-2011',
    maker: 'Chevrolet',
    model: 'Spark',
    generation: 'M200 (2007-2014)',
    yearStart: 2007,
    yearEnd: 2014,
    trimName: 'LT 1.0 Manual',
    segment: 'hatchback',
    engine: {
      code: 'B10S',
      displacementLiters: 1.0,
      cylinders: 4,
      horsepower: 65,
      torqueNm: 91,
      fuelType: 'gasolina_91',
      compressionRatio: 9.3,
      timingMechanism: 'correa_interferencia'
    },
    transmission: 'manual',
    dimensions: {
      groundClearanceMm: 145,
      trunkCapacityLiters: 170,
      fuelTankLiters: 35,
      passengerCapacity: 4,
      weightKg: 840
    },
    marketDataVE: {
      priceRangeUsdUsed: [2500, 4000],
      popularNicknames: ['Spark Tapita', 'El Huevito'],
      partsAvailability: 'inmediata',
      estimatedAnnualMaintenanceUsd: 220,
      fuelConsumptionCityKmL: 14.5,
      fuelConsumptionHighwayKmL: 18.0,
      commonCriticalIssues: [
        'Correa de tiempo sensible a rotura',
        'Poca fuerza en subidas pronunciadas con aire acondicionado encendido'
      ]
    }
  },
  {
    id: 'jac-js4-2023',
    maker: 'JAC',
    model: 'JS4',
    generation: 'Gen 1 (2021-Presente)',
    yearStart: 2021,
    yearEnd: 2025,
    trimName: '1.5 Turbo CVT Luxury',
    segment: 'suv',
    engine: {
      code: 'HFC4GB2.4E Turbo',
      displacementLiters: 1.5,
      cylinders: 4,
      horsepower: 147,
      torqueNm: 210,
      fuelType: 'gasolina_95',
      compressionRatio: 9.5,
      timingMechanism: 'cadena'
    },
    transmission: 'cvt',
    dimensions: {
      groundClearanceMm: 180,
      trunkCapacityLiters: 520,
      fuelTankLiters: 50,
      passengerCapacity: 5,
      weightKg: 1365
    },
    marketDataVE: {
      priceRangeUsdUsed: [15000, 18500],
      priceUsdNew: 23500,
      popularNicknames: ['JAC JS4', 'La Camionetica JAC'],
      partsAvailability: 'moderada',
      estimatedAnnualMaintenanceUsd: 380,
      fuelConsumptionCityKmL: 10.5,
      fuelConsumptionHighwayKmL: 14.5,
      commonCriticalIssues: [
        'Requiere estrictamente cumplir la Regla de los 60 segundos del turbo',
        'Repuestos de colisión de carrocería tardan en conseguirse fuera de concesionario'
      ]
    }
  }
];
