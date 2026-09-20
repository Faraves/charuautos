import { useState, useEffect, useCallback, useMemo } from 'react';
import { storageService } from '../storage/service';
import { PaymentProcessorEngine } from '../domain/engine/paymentProcessor';
import { 
  SubscriptionPlan, 
  SubscriptionTier, 
  UserSubscriptionEntitlements, 
  PaymentTransaction 
} from '../domain/types/payment';
import { CHARU_SUBSCRIPTION_PLANS, VENEZUELAN_BANKS } from '../domain/data/plans.seed';

export function useSubscription() {
  const processor = useMemo(() => new PaymentProcessorEngine(), []);

  const [entitlements, setEntitlements] = useState<UserSubscriptionEntitlements>({
    tier: 'free_pilot',
    isActive: false,
    canExportPdfCertificate: false,
    unlimitedOdometerBlockchain: false,
    extendedAntiScamShield: false,
    b2bVerifiedWorkshopBadge: false
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [bcvRate, setBcvRate] = useState<number>(processor.getBcvRate());
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const refreshSubscription = useCallback(async () => {
    const ent = await storageService.subscriptions.getEntitlements();
    const txs = await storageService.subscriptions.listTransactions();
    setEntitlements(ent);
    setTransactions(txs);
  }, []);

  useEffect(() => {
    refreshSubscription();
  }, [refreshSubscription]);

  /**
   * Envía un reporte de Pago Móvil para conciliación
   */
  const submitPagoMovil = async (params: {
    planId: string;
    bankCode: string;
    phoneNumber: string;
    idDocument: string;
    referenceNumber: string;
    amountVes: number;
  }): Promise<{ success: boolean; message: string; transaction?: PaymentTransaction }> => {
    setIsProcessing(true);
    try {
      const tx = processor.processPagoMovilSubmission({
        userId: 'user_active_01',
        ...params
      });

      await storageService.subscriptions.recordTransaction(tx);
      // Encolar también en la cola de sincronización para que el backend Lakehouse lo concilie
      await storageService.trackOfflineMutation('payment_transactions', 'INSERT', tx);
      await refreshSubscription();

      return {
        success: true,
        message: 'Pago Móvil registrado. Tu referencia está en proceso de verificación bancaria automática (1 a 3 minutos).',
        transaction: tx
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Error al procesar los datos del Pago Móvil.'
      };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Genera una orden de cobro en Binance Pay (USDT)
   */
  const initiateBinancePay = async (planId: string): Promise<PaymentTransaction> => {
    setIsProcessing(true);
    try {
      const tx = processor.createBinancePayOrder('user_active_01', planId);
      await storageService.subscriptions.recordTransaction(tx);
      await storageService.trackOfflineMutation('payment_transactions', 'INSERT', tx);
      await refreshSubscription();
      return tx;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Simula la confirmación por Webhook bancario o de Binance para desbloqueo instantáneo
   */
  const simulateWebhookConfirmation = async (
    txId: string,
    tier: SubscriptionTier
  ): Promise<{ success: boolean; message: string }> => {
    await storageService.subscriptions.activateSubscription(txId, tier, 30);
    await refreshSubscription();
    return {
      success: true,
      message: `¡Pago confirmado con éxito! Membresía CharuPro activada.`
    };
  };

  return {
    entitlements,
    transactions,
    bcvRate,
    plans: CHARU_SUBSCRIPTION_PLANS,
    banks: VENEZUELAN_BANKS,
    isProcessing,
    convertUsdToVes: (usd: number) => processor.convertUsdToVes(usd, bcvRate),
    submitPagoMovil,
    initiateBinancePay,
    simulateWebhookConfirmation,
    refreshSubscription
  };
}
