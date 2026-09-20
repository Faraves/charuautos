import { 
  DocumentScrapeResult, 
  RawExtractedVehicleData 
} from '../types/documentScraper';
import { CanonicalVehicle } from '../types/vehicle';

/**
 * Motor Heurístico de Scraping y Extracción de Fichas Técnicas Automotrices (PDF / Texto)
 */
export class DocumentScraperEngine {

  /**
   * Extrae especificaciones automotrices a partir de texto plano extraído de un PDF.
   */
  public parseDocumentText(fileName: string, rawText: string): DocumentScrapeResult {
    const extracted: RawExtractedVehicleData = {};
    const textLower = rawText.toLowerCase();

    // 1. EXTRAER CILINDRADA DEL MOTOR (Ej: 1.8L, 1.6 DOHC, 1798 cc)
    const displacementRegex = /(?:motor|cilindrada|desplazamiento)?\s*(\d\.\d)\s*(?:l|litros|dohc|sohc|vvt-i|mpi)?/i;
    const ccRegex = /(\d{3,4})\s*(?:cc|cm3)/i;
    
    const dispMatch = rawText.match(displacementRegex);
    const ccMatch = rawText.match(ccRegex);
    if (dispMatch && dispMatch[1]) {
      extracted.engineDisplacement = {
        value: parseFloat(dispMatch[1]),
        confidenceScore: 0.90,
        sourceSnippet: dispMatch[0]
      };
    } else if (ccMatch && ccMatch[1]) {
      const cc = parseInt(ccMatch[1], 10);
      extracted.engineDisplacement = {
        value: Math.round((cc / 1000) * 10) / 10,
        confidenceScore: 0.85,
        sourceSnippet: ccMatch[0]
      };
    }

    // 2. EXTRAER POTENCIA (HP / CV)
    const hpRegex = /(\d{2,3})\s*(?:hp|cv|caballos|fuerza|potencia(?:\s*máxima)?)/i;
    const hpMatch = rawText.match(hpRegex);
    if (hpMatch && hpMatch[1]) {
      extracted.horsepower = {
        value: parseInt(hpMatch[1], 10),
        confidenceScore: 0.88,
        sourceSnippet: hpMatch[0]
      };
    }

    // 3. EXTRAER TORQUE (Nm / kg-m)
    const torqueRegex = /(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m|newton(?:\s*metro)?)/i;
    const torqueMatch = rawText.match(torqueRegex);
    if (torqueMatch && torqueMatch[1]) {
      extracted.torqueNm = {
        value: parseFloat(torqueMatch[1]),
        confidenceScore: 0.92,
        sourceSnippet: torqueMatch[0]
      };
    }

    // 4. EXTRAER DESPEJE AL SUELO (mm o cm)
    const clearanceRegex = /(?:despeje|altura(?:\s*libre)?(?:\s*al\s*suelo)?|distancia(?:\s*al\s*piso)?)[^\d]*(\d{2,3})\s*(mm|cm)/i;
    const clearanceMatch = rawText.match(clearanceRegex);
    if (clearanceMatch && clearanceMatch[1]) {
      let val = parseInt(clearanceMatch[1], 10);
      if (clearanceMatch[2].toLowerCase() === 'cm') {
        val = val * 10; // convertir cm a mm
      }
      extracted.groundClearanceMm = {
        value: val,
        confidenceScore: 0.95,
        sourceSnippet: clearanceMatch[0]
      };
    }

    // 5. EXTRAER CAPACIDAD DEL MALETERO / BAÚL (Litros)
    const trunkRegex = /(?:maletero|cajuela|baúl|baul|área(?:\s*de\s*carga)?)[^\d]*(\d{2,4})\s*(?:l|litros)/i;
    const trunkMatch = rawText.match(trunkRegex);
    if (trunkMatch && trunkMatch[1]) {
      extracted.trunkLiters = {
        value: parseInt(trunkMatch[1], 10),
        confidenceScore: 0.90,
        sourceSnippet: trunkMatch[0]
      };
    }

    // 6. DETECTAR TIPO DE TRANSMISIÓN
    if (textLower.includes('cvt')) {
      extracted.transmission = { value: 'cvt', confidenceScore: 0.95, sourceSnippet: 'CVT' };
    } else if (textLower.includes('automátic') || textLower.includes('automatica') || textLower.includes('at')) {
      extracted.transmission = { value: 'automatica', confidenceScore: 0.90, sourceSnippet: 'Automática' };
    } else if (textLower.includes('manual') || textLower.includes('sincrónica') || textLower.includes('mt')) {
      extracted.transmission = { value: 'manual', confidenceScore: 0.90, sourceSnippet: 'Manual' };
    }

    // 7. DETECTAR MECANISMO DE DISTRIBUCIÓN
    if (textLower.includes('cadena')) {
      extracted.timingMechanism = { value: 'cadena', confidenceScore: 0.95, sourceSnippet: 'cadena de distribución' };
    } else if (textLower.includes('correa') || textLower.includes('banda')) {
      extracted.timingMechanism = { value: 'correa_interferencia', confidenceScore: 0.80, sourceSnippet: 'correa dentada' };
    }

    // 8. NORMALIZAR EN CANDIDATO CANÓNICO
    const candidate = this.buildCanonicalCandidate(fileName, extracted);

    const requiresHumanReview = 
      !extracted.engineDisplacement ||
      !extracted.horsepower ||
      !extracted.groundClearanceMm;

    return {
      documentId: `doc-${Date.now()}`,
      fileName,
      fileSizeBytes: rawText.length,
      totalTextLength: rawText.length,
      extractedData: extracted,
      canonicalVehicleCandidate: candidate,
      requiresHumanReview,
      unrecognizedFields: []
    };
  }

  private buildCanonicalCandidate(fileName: string, data: RawExtractedVehicleData): CanonicalVehicle {
    const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

    return {
      id: `imported-${Date.now()}`,
      maker: data.maker?.value || 'Marca Importada (PDF)',
      model: data.model?.value || cleanName,
      generation: 'Ficha Técnica Adjunta',
      yearStart: data.year?.value || new Date().getFullYear(),
      yearEnd: data.year?.value || new Date().getFullYear(),
      trimName: data.trimName?.value || cleanName,
      segment: (data.segment?.value as any) || 'sedan',
      engine: {
        code: 'Especificado en Ficha PDF',
        displacementLiters: data.engineDisplacement?.value || 1.6,
        cylinders: 4,
        horsepower: data.horsepower?.value || 110,
        torqueNm: data.torqueNm?.value || 150,
        fuelType: 'gasolina_91',
        compressionRatio: 10.0,
        timingMechanism: (data.timingMechanism?.value as any) || 'cadena'
      },
      transmission: (data.transmission?.value as any) || 'automatica',
      dimensions: {
        groundClearanceMm: data.groundClearanceMm?.value || 150,
        trunkCapacityLiters: data.trunkLiters?.value || 420,
        fuelTankLiters: data.fuelTankLiters?.value || 50,
        passengerCapacity: 5,
        weightKg: 1200
      },
      marketDataVE: {
        priceRangeUsdUsed: [8000, 12000],
        popularNicknames: [cleanName],
        partsAvailability: 'alta',
        estimatedAnnualMaintenanceUsd: 300,
        fuelConsumptionCityKmL: 11.5,
        fuelConsumptionHighwayKmL: 15.0,
        commonCriticalIssues: []
      }
    };
  }
}
