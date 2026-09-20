import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../storage/service';
import { SyncStatus } from '../storage/sync/syncManager';

export function useSyncQueue() {
  const [status, setStatus] = useState<SyncStatus>(storageService.syncManager.getStatus());
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(storageService.syncManager.getOnlineStatus());

  const refreshStats = useCallback(async () => {
    const stats = await storageService.syncQueue.getStats();
    setPendingCount(stats.totalPending);
    setStatus(storageService.syncManager.getStatus());
    setIsOnline(storageService.syncManager.getOnlineStatus());
  }, []);

  useEffect(() => {
    refreshStats();

    // Suscribirse a cambios en el despachador de sincronización
    const unsubscribe = storageService.syncManager.subscribe((newStatus, newPending) => {
      setStatus(newStatus);
      setPendingCount(newPending);
      setIsOnline(storageService.syncManager.getOnlineStatus());
    });

    return () => {
      unsubscribe();
    };
  }, [refreshStats]);

  const triggerManualSync = useCallback(async () => {
    await storageService.syncManager.flushQueue();
    await refreshStats();
  }, [refreshStats]);

  const toggleOnlineMode = useCallback(() => {
    const newOnlineState = !isOnline;
    storageService.syncManager.setOnlineStatus(newOnlineState);
    setIsOnline(newOnlineState);
    setStatus(newOnlineState ? 'idle' : 'offline');
  }, [isOnline]);

  return {
    status,
    pendingCount,
    isOnline,
    triggerManualSync,
    toggleOnlineMode,
    refreshStats
  };
}
