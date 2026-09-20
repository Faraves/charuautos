/**
 * Contratos de Datos para Pasarelas de Pago Bimonetarias y Suscripciones CharuPro
 * Soporta Pago Móvil (VES a tasa BCV) y Binance Pay (USDT).
 */

export type SubscriptionTier = 'free_pilot' | 'charu_pro_driver' | 'charu_pro_workshop';

export type PaymentMethod = 'pago_movil' | 'binance_pay';

export type PaymentStatus = 'pending' | 'verifying' | 'completed' | 'rejected';

export interface SubscriptionPlan {
  id: string;
  name: string;
  targetAudience: 'B2C_Conductor' | 'B2B_Taller';
  priceUsd: number;
  billingPeriod: 'monthly' | 'one_time';
  features: string[];
  recommendedBadge?: string;
}

export interface BcvExchangeRate {
  rateVesPerUsd: number;
  effectiveDateIso: string;
  source: 'BCV_Oficial' | 'Fallback_Cache';
}

export interface PagoMovilDetails {
  bankCode: string; // Ej: '0102' (BDV), '0134' (Banesco), '0105' (Mercantil)
  bankName: string;
  phoneNumber: string; // Ej: '0414-1234567'
  idDocument: string; // Ej: 'V-12345678'
  referenceNumber: string; // 6 u 8 dígitos
  amountVes: number;
  bcvRateApplied: number;
  paymentDateIso: string;
}

export interface BinancePayDetails {
  merchantOrderId: string;
  prepayId: string;
  amountUsdt: number;
  qrContent: string;
  universalUrl: string;
  expireTimeIso: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  planId: string;
  method: PaymentMethod;
  amountUsd: number;
  amountLocal: number; // VES o USDT
  status: PaymentStatus;
  createdAtIso: string;
  confirmedAtIso?: string;
  pagoMovilData?: PagoMovilDetails;
  binancePayData?: BinancePayDetails;
  reconciliationNotes?: string;
}

export interface UserSubscriptionEntitlements {
  tier: SubscriptionTier;
  isActive: boolean;
  expiresAtIso?: string;
  canExportPdfCertificate: boolean;
  unlimitedOdometerBlockchain: boolean;
  extendedAntiScamShield: boolean;
  b2bVerifiedWorkshopBadge: boolean;
}
