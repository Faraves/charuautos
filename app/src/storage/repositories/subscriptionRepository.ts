import { 
  SubscriptionTier, 
  UserSubscriptionEntitlements, 
  PaymentTransaction 
} from '../../domain/types/payment';
import { PaymentProcessorEngine } from '../../domain/engine/paymentProcessor';

export interface UserSubscriptionRecord {
  userId: string;
  tier: SubscriptionTier;
  isActive: boolean;
  startDateIso: string;
  expiresAtIso?: string;
  lastPaymentMethod?: string;
}

export class SubscriptionRepository {
  private subscription: UserSubscriptionRecord;
  private transactions: Map<string, PaymentTransaction> = new Map();
  private processor: PaymentProcessorEngine;

  constructor() {
    this.processor = new PaymentProcessorEngine();
    // Por defecto el usuario comienza en plan piloto gratuito
    this.subscription = {
      userId: 'user_active_01',
      tier: 'free_pilot',
      isActive: false,
      startDateIso: new Date().toISOString()
    };
  }

  public async getSubscription(): Promise<UserSubscriptionRecord> {
    return { ...this.subscription };
  }

  public async getEntitlements(): Promise<UserSubscriptionEntitlements> {
    return this.processor.resolveEntitlements(
      this.subscription.tier,
      this.subscription.isActive
    );
  }

  public async recordTransaction(tx: PaymentTransaction): Promise<PaymentTransaction> {
    this.transactions.set(tx.id, tx);
    return tx;
  }

  public async listTransactions(): Promise<PaymentTransaction[]> {
    return Array.from(this.transactions.values()).sort(
      (a, b) => new Date(b.createdAtIso).getTime() - new Date(a.createdAtIso).getTime()
    );
  }

  /**
   * Confirma un pago (por webhook bancario o de Binance) y activa la suscripción
   */
  public async activateSubscription(
    transactionId: string,
    tier: SubscriptionTier,
    durationDays = 30
  ): Promise<{ success: boolean; subscription: UserSubscriptionRecord }> {
    const tx = this.transactions.get(transactionId);
    if (tx) {
      tx.status = 'completed';
      tx.confirmedAtIso = new Date().toISOString();
      this.transactions.set(tx.id, tx);
    }

    const now = new Date();
    const expires = new Date(now.getTime() + durationDays * 86400000);

    this.subscription = {
      userId: this.subscription.userId,
      tier,
      isActive: true,
      startDateIso: now.toISOString(),
      expiresAtIso: expires.toISOString(),
      lastPaymentMethod: tx?.method || 'pago_movil'
    };

    return {
      success: true,
      subscription: { ...this.subscription }
    };
  }

  /**
   * Revoca o cancela una suscripción
   */
  public async cancelSubscription(): Promise<void> {
    this.subscription.isActive = false;
    this.subscription.tier = 'free_pilot';
  }
}
