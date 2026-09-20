import { 
  PaymentTransaction, 
  PagoMovilDetails, 
  BinancePayDetails, 
  SubscriptionTier, 
  UserSubscriptionEntitlements 
} from '../types/payment';
import { CHARU_SUBSCRIPTION_PLANS, DEFAULT_BCV_RATE, VENEZUELAN_BANKS } from '../data/plans.seed';

export class PaymentProcessorEngine {
  private currentBcvRate = DEFAULT_BCV_RATE;

  public setBcvRate(rate: number) {
    this.currentBcvRate = rate;
  }

  public getBcvRate(): number {
    return this.currentBcvRate;
  }

  /**
   * Convierte un monto en USD a Bolívares usando la tasa oficial del Banco Central de Venezuela.
   */
  public convertUsdToVes(priceUsd: number, rate?: number): number {
    const activeRate = rate || this.currentBcvRate;
    return Math.round(priceUsd * activeRate * 100) / 100;
  }

  /**
   * Valida estrictamente los datos de un Pago Móvil según la normativa bancaria venezolana.
   */
  public validatePagoMovilInput(params: {
    bankCode: string;
    phoneNumber: string;
    idDocument: string;
    referenceNumber: string;
    amountVes: number;
    expectedVes: number;
  }): { isValid: boolean; error?: string } {
    // 1. Validar código de banco
    const bankExists = VENEZUELAN_BANKS.some((b) => b.code === params.bankCode);
    if (!bankExists) {
      return { isValid: false, error: `Código de banco inválido: ${params.bankCode}. Selecciona un banco nacional emisor.` };
    }

    // 2. Validar formato de teléfono venezolano (0414, 0424, 0412, 0416, 0426)
    const cleanPhone = params.phoneNumber.replace(/\D/g, '');
    if (!/^04(14|24|12|16|26)\d{7}$/.test(cleanPhone)) {
      return { isValid: false, error: 'Número de teléfono inválido. Debe comenzar con 0414, 0424, 0412 o 0416 y tener 11 dígitos.' };
    }

    // 3. Validar cédula o RIF venezolano (V, E, J, G seguido de 6 a 9 dígitos)
    const cleanId = params.idDocument.trim().toUpperCase();
    if (!/^[VEJG]-\d{6,9}$/.test(cleanId) && !/^[VEJG]\d{6,9}$/.test(cleanId)) {
      return { isValid: false, error: 'Documento de identidad inválido. Formato requerido: V-12345678 o J-123456789.' };
    }

    // 4. Validar referencia bancaria (usualmente últimos 6 u 8 dígitos numéricos)
    const cleanRef = params.referenceNumber.trim();
    if (!/^\d{6,8}$/.test(cleanRef)) {
      return { isValid: false, error: 'Número de referencia bancaria inválido. Debe contener entre 6 y 8 dígitos numéricos.' };
    }

    // 5. Validar monto (tolerancia de 1 Bolívar por redondeos cambiarios)
    const delta = Math.abs(params.amountVes - params.expectedVes);
    if (delta > 2.0) {
      return { isValid: false, error: `Monto pagado (${params.amountVes.toFixed(2)} Bs.) no coincide con el total requerido (${params.expectedVes.toFixed(2)} Bs. a tasa BCV).` };
    }

    return { isValid: true };
  }

  /**
   * Prepara una transacción de Pago Móvil para conciliación bancaria
   */
  public processPagoMovilSubmission(params: {
    userId: string;
    planId: string;
    bankCode: string;
    phoneNumber: string;
    idDocument: string;
    referenceNumber: string;
    amountVes: number;
  }): PaymentTransaction {
    const plan = CHARU_SUBSCRIPTION_PLANS.find((p) => p.id === params.planId);
    if (!plan) {
      throw new Error(`Plan con ID ${params.planId} no encontrado.`);
    }

    const expectedVes = this.convertUsdToVes(plan.priceUsd);
    const validation = this.validatePagoMovilInput({
      ...params,
      expectedVes
    });

    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const bank = VENEZUELAN_BANKS.find((b) => b.code === params.bankCode)!;
    const txId = `tx_pm_${Date.now()}_${params.referenceNumber}`;

    const tx: PaymentTransaction = {
      id: txId,
      userId: params.userId,
      planId: params.planId,
      method: 'pago_movil',
      amountUsd: plan.priceUsd,
      amountLocal: params.amountVes,
      status: 'verifying', // Pasa a conciliación bancaria
      createdAtIso: new Date().toISOString(),
      pagoMovilData: {
        bankCode: params.bankCode,
        bankName: bank.name,
        phoneNumber: params.phoneNumber,
        idDocument: params.idDocument,
        referenceNumber: params.referenceNumber,
        amountVes: params.amountVes,
        bcvRateApplied: this.currentBcvRate,
        paymentDateIso: new Date().toISOString()
      },
      reconciliationNotes: 'Enviado a verificación contra extracto bancario C2P.'
    };

    return tx;
  }

  /**
   * Genera una orden de cobro en criptomoneda a través de Binance Pay (USDT)
   */
  public createBinancePayOrder(userId: string, planId: string): PaymentTransaction {
    const plan = CHARU_SUBSCRIPTION_PLANS.find((p) => p.id === paramsPlanId(planId));
    if (!plan) {
      throw new Error(`Plan con ID ${planId} no encontrado.`);
    }

    const orderId = `binance_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const prepayId = `prepay_${Math.random().toString(36).substring(2, 10)}`;

    const details: BinancePayDetails = {
      merchantOrderId: orderId,
      prepayId,
      amountUsdt: plan.priceUsd,
      qrContent: `binance://pay?prepayId=${prepayId}&orderId=${orderId}&amount=${plan.priceUsd}`,
      universalUrl: `https://app.binance.com/qr/dopay?prepayId=${prepayId}`,
      expireTimeIso: new Date(Date.now() + 15 * 60000).toISOString() // 15 minutos de vigencia
    };

    return {
      id: `tx_bp_${Date.now()}`,
      userId,
      planId,
      method: 'binance_pay',
      amountUsd: plan.priceUsd,
      amountLocal: plan.priceUsd,
      status: 'pending',
      createdAtIso: new Date().toISOString(),
      binancePayData: details,
      reconciliationNotes: 'Esperando confirmación de webhook instantáneo de Binance Pay.'
    };
  }

  /**
   * Resuelve los permisos y funcionalidades que desbloquea una suscripción
   */
  public resolveEntitlements(tier: SubscriptionTier, isActive: boolean): UserSubscriptionEntitlements {
    if (!isActive || tier === 'free_pilot') {
      return {
        tier: 'free_pilot',
        isActive: false,
        canExportPdfCertificate: false,
        unlimitedOdometerBlockchain: false,
        extendedAntiScamShield: false,
        b2bVerifiedWorkshopBadge: false
      };
    }

    if (tier === 'charu_pro_driver') {
      return {
        tier: 'charu_pro_driver',
        isActive: true,
        canExportPdfCertificate: true,
        unlimitedOdometerBlockchain: true,
        extendedAntiScamShield: true,
        b2bVerifiedWorkshopBadge: false
      };
    }

    // charu_pro_workshop
    return {
      tier: 'charu_pro_workshop',
      isActive: true,
      canExportPdfCertificate: true,
      unlimitedOdometerBlockchain: true,
      extendedAntiScamShield: true,
      b2bVerifiedWorkshopBadge: true
    };
  }
}

function paramsPlanId(id: string): string {
  return id;
}
