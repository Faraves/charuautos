/**
 * Repositorio de Cola de Mutaciones Offline (Sync Queue Repository)
 * Gestiona el encolamiento, reintentos y despacho de operaciones pendientes hacia la nube.
 */

export type SyncAction = 'INSERT' | 'UPDATE' | 'DELETE';

export interface SyncMutationEntity {
  mutationId: string;
  entityTable: string;
  action: SyncAction;
  payloadJson: string;
  createdAtIso: string;
  retryCount: number;
  lastError?: string;
}

export interface SyncQueueStats {
  totalPending: number;
  failedWithRetries: number;
  oldestPendingIso?: string;
}

export class SyncQueueRepository {
  private queue: Map<string, SyncMutationEntity> = new Map();

  /**
   * Encola una mutación producida en modo offline o conectividad débil
   */
  public async enqueueMutation(
    entityTable: string,
    action: SyncAction,
    payload: Record<string, any>,
    customMutationId?: string
  ): Promise<SyncMutationEntity> {
    const mutationId = customMutationId || `mut_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const entity: SyncMutationEntity = {
      mutationId,
      entityTable,
      action,
      payloadJson: JSON.stringify(payload),
      createdAtIso: new Date().toISOString(),
      retryCount: 0
    };

    this.queue.set(mutationId, entity);
    return entity;
  }

  /**
   * Retorna las siguientes N mutaciones pendientes en orden FIFO
   */
  public async peekPending(limit = 20): Promise<SyncMutationEntity[]> {
    const list = Array.from(this.queue.values())
      .sort((a, b) => new Date(a.createdAtIso).getTime() - new Date(b.createdAtIso).getTime());
    return list.slice(0, limit);
  }

  /**
   * Remueve una mutación tras ser confirmada exitosamente por el backend en la nube
   */
  public async markSuccess(mutationId: string): Promise<boolean> {
    return this.queue.delete(mutationId);
  }

  /**
   * Registra un fallo de red o rechazo temporal e incrementa el contador de reintentos
   */
  public async recordFailure(mutationId: string, errorMessage: string): Promise<SyncMutationEntity | null> {
    const item = this.queue.get(mutationId);
    if (!item) return null;

    item.retryCount += 1;
    item.lastError = errorMessage;
    this.queue.set(mutationId, item);
    return item;
  }

  /**
   * Obtiene estadísticas de la cola de sincronización para la UI
   */
  public async getStats(): Promise<SyncQueueStats> {
    const items = Array.from(this.queue.values());
    const failed = items.filter((i) => i.retryCount > 0);
    const sorted = items.sort((a, b) => new Date(a.createdAtIso).getTime() - new Date(b.createdAtIso).getTime());

    return {
      totalPending: items.length,
      failedWithRetries: failed.length,
      oldestPendingIso: sorted.length > 0 ? sorted[0].createdAtIso : undefined
    };
  }

  /**
   * Limpia toda la cola (útil para pruebas)
   */
  public async clear(): Promise<void> {
    this.queue.clear();
  }
}
