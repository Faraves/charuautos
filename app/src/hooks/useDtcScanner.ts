import { useState, useMemo, useCallback } from 'react';
import { DTCLookupEngine } from '../domain/engine/dtcLookup';
import { DTCCodeDefinition } from '../domain/types/dtc';

export interface SavedScanEntry {
  id: string;
  code: string;
  scannedAtIso: string;
  notes?: string;
  severity: number;
}

export function useDtcScanner() {
  const [searchCode, setSearchCode] = useState<string>('P0420');
  const [savedScans, setSavedScans] = useState<SavedScanEntry[]>([
    {
      id: 'scan_01',
      code: 'P0420',
      scannedAtIso: new Date(Date.now() - 5 * 86400000).toISOString(),
      notes: 'Luz Check Engine tras surtir gasolina en autopista.',
      severity: 2
    }
  ]);

  const engine = useMemo(() => new DTCLookupEngine(), []);

  const activeDTC = useMemo(() => {
    return engine.findCode(searchCode) || engine.searchByKeyword(searchCode)[0] || null;
  }, [searchCode, engine]);

  const saveCurrentScan = useCallback((notes?: string) => {
    if (!activeDTC) return false;
    const newEntry: SavedScanEntry = {
      id: `scan_${Date.now()}`,
      code: activeDTC.code,
      scannedAtIso: new Date().toISOString(),
      notes: notes || 'Diagnóstico manual preventivo.',
      severity: activeDTC.severity
    };
    setSavedScans((prev) => [newEntry, ...prev]);
    return true;
  }, [activeDTC]);

  const getSeverityMeta = (severity: number) => {
    switch (severity) {
      case 1:
        return { label: '🟢 LEVE', color: '#38ef7d', bg: 'rgba(56, 239, 125, 0.15)', desc: 'Puedes continuar rodando pero revísalo en el próximo servicio.' };
      case 2:
        return { label: '🟡 PRECAUCIÓN', color: '#ffb703', bg: 'rgba(255, 183, 3, 0.15)', desc: 'Atender pronto para evitar daños secundarios costosos.' };
      case 3:
      default:
        return { label: '🔴 CRÍTICO: DETENER AUTO', color: '#ff2a5f', bg: 'rgba(255, 42, 95, 0.15)', desc: 'Riesgo inminente de fundir motor, transmisión o frenos.' };
    }
  };

  return {
    searchCode,
    setSearchCode,
    activeDTC,
    savedScans,
    saveCurrentScan,
    getSeverityMeta,
    allSeedCodes: engine.getAllCodes()
  };
}
