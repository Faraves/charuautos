import { useState, useMemo, useCallback } from 'react';
import { MatchmakerEngine } from '../domain/engine/matchmaker';
import { MatchmakerUserProfile, RoadCondition, FuelPriority, MatchRecommendation } from '../domain/types/matchmaker';
import { Vehicle } from '../domain/types/vehicle';

export function useMatchmaker() {
  const [profile, setProfile] = useState<MatchmakerUserProfile>({
    maxBudgetUsd: 6000,
    preferNewOrUsed: 'usado',
    primaryRoadCondition: 'muchos_baches_huecos',
    minPassengerCapacity: 5,
    fuelPriority: 'resistencia_gasolina_mala',
    sparePartsTolerance: 'inmediata',
    needsBigTrunk: true
  });

  const [savedFavorites, setSavedFavorites] = useState<string[]>(['toyota_corolla_pantallita_2011']);

  const engine = useMemo(() => new MatchmakerEngine(), []);

  const results = useMemo(() => {
    return engine.evaluate(profile);
  }, [profile, engine]);

  const updateProfile = useCallback((updates: Partial<MatchmakerUserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleFavorite = useCallback((vehicleId: string) => {
    setSavedFavorites((prev) => 
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId]
    );
  }, []);

  return {
    profile,
    updateProfile,
    recommendations: results.recommendations,
    evaluatedCount: results.evaluatedCount,
    savedFavorites,
    toggleFavorite
  };
}
