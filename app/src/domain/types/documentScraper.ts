/**
 * Contratos de Dominio para Extracción, Scraping y Parsing de Documentos (PDFs de Fichas Técnicas)
 */

import { CanonicalVehicle, VehicleSegment, TransmissionType } from './vehicle';

export interface ExtractedEntityConfidence {
  value: any;
  confidenceScore: number;       // 0.0 a 1.0
  sourceSnippet?: string;        // Fragmento de texto de donde se extrajo
}

export interface RawExtractedVehicleData {
  maker?: ExtractedEntityConfidence;
  model?: ExtractedEntityConfidence;
  year?: ExtractedEntityConfidence;
  trimName?: ExtractedEntityConfidence;
  segment?: ExtractedEntityConfidence;
  engineDisplacement?: ExtractedEntityConfidence; // Litros
  horsepower?: ExtractedEntityConfidence;         // HP
  torqueNm?: ExtractedEntityConfidence;           // Nm
  groundClearanceMm?: ExtractedEntityConfidence;  // mm
  trunkLiters?: ExtractedEntityConfidence;        // Litros
  fuelTankLiters?: ExtractedEntityConfidence;     // Litros
  transmission?: ExtractedEntityConfidence;       // Manual, Automática, CVT
  timingMechanism?: ExtractedEntityConfidence;    // Cadena o Correa
}

export interface DocumentScrapeResult {
  documentId: string;
  fileName: string;
  fileSizeBytes: number;
  totalTextLength: number;
  extractedData: RawExtractedVehicleData;
  canonicalVehicleCandidate: CanonicalVehicle;
  requiresHumanReview: boolean;  // True si algún campo clave tiene confianza < 0.70
  unrecognizedFields: string[];  // Textos que no se pudieron clasificar
}
