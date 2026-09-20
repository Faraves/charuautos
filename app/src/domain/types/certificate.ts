/**
 * Contratos de Datos para el Pasaporte y Certificado Criptográfico CharuPro
 */

export interface CertificateMetadata {
  certificateId: string;
  issueDateIso: string;
  issuer: string;
  verificationUrl: string;
  qrCodeDataUri?: string;
}

export interface VehiclePassportSummary {
  id: string;
  maker: string;
  model: string;
  trimName: string;
  nickname?: string;
  licensePlate: string;
  year?: number;
  currentMileageKm: number;
  healthScore: number;
}

export interface CryptographicAuditSummary {
  totalBlocksMined: number;
  genesisHash: string;
  latestRootHash: string;
  integrityStatus: 'VERIFIED_TAMPER_FREE' | 'COMPROMISED';
  monotonicityVerified: boolean;
  blocks: Array<{
    blockIndex: number;
    mileageKm: number;
    recordedAtIso: string;
    currentHash: string;
    previousHash: string;
  }>;
}

export interface ServiceRecordSummary {
  id: string;
  serviceType: string;
  mileageAtService: number;
  serviceDateIso: string;
  workshopName: string;
  totalCostUsd: number;
  notes?: string;
}

export interface CharuProCertificateData {
  metadata: CertificateMetadata;
  vehicle: VehiclePassportSummary;
  cryptography: CryptographicAuditSummary;
  services: ServiceRecordSummary[];
  financials: {
    costPerKmUsd: number;
    costPerKmVes: number;
    fuelEfficiencyKmPerLiter: number;
    totalServicesCostUsd: number;
  };
  diagnostics: {
    totalScansRecorded: number;
    activeCriticalCodes: number;
    overallDiagnosis: string;
  };
}
