import { MatchmakerEngine } from './engine/matchmaker';
import { DTCLookupEngine } from './engine/dtcLookup';
import { MatchmakerUserProfile } from './types/matchmaker';

/**
 * Script de Verificación Rápida del Dominio Core
 * Simula perfiles típicos de conductores en Venezuela.
 */
console.log('====================================================');
console.log('🚗 CHARUAUTOS DOMAIN CORE — PRUEBA DE MOTORES');
console.log('====================================================\n');

// 1. PROBAR EL MATCHMAKER CON CASO REAL DE VENEZUELA:
// "Daniel: Presupuesto de $6,000 USD, caminos con muchos huecos en Caracas/Guarenas,
//  quiere repuestos inmediatos y que acepte gasolina regular sin quejarme."
const profileDaniel: MatchmakerUserProfile = {
  maxBudgetUsd: 6000,
  preferNewOrUsed: 'usado',
  primaryRoadCondition: 'muchos_baches_huecos',
  minPassengerCapacity: 5,
  fuelPriority: 'resistencia_gasolina_mala',
  sparePartsTolerance: 'inmediata',
  needsBigTrunk: true
};

const matchmaker = new MatchmakerEngine();
const result = matchmaker.evaluate(profileDaniel);

console.log(`🔍 MATCHMAKER: Evaluados ${result.totalEvaluated} vehículos para Daniel (Presupuesto: $${profileDaniel.maxBudgetUsd} USD)`);
console.log('🏆 TOP 3 VEHÍCULOS COMPATIBLES:\n');

result.recommendations.slice(0, 3).forEach((rec, idx) => {
  console.log(`${idx + 1}. [${rec.overallMatchScore}% MATCH] ${rec.vehicle.maker} ${rec.vehicle.model} (${rec.vehicle.trimName})`);
  console.log(`   💰 Rango de Precio: $${rec.vehicle.marketDataVE.priceRangeUsdUsed[0]} - $${rec.vehicle.marketDataVE.priceRangeUsdUsed[1]} USD`);
  console.log(`   🏷️ Moteado Popular: "${rec.vehicle.marketDataVE.popularNicknames.join(', ')}"`);
  console.log(`   ✅ Pros en Venezuela: ${rec.prosInVenezuela.join(' | ')}`);
  console.log(`   ⚠️ Precaución: ${rec.consInVenezuela.join(' | ')}`);
  console.log(`   📝 Veredicto: ${rec.verdictSummary}\n`);
});

// 2. PROBAR EL ASISTENTE OBD2:
console.log('----------------------------------------------------');
console.log('⚠️ ASISTENTE OBD2 MANUAL: CONSULTA DE CÓDIGO');
console.log('----------------------------------------------------\n');

const dtcEngine = new DTCLookupEngine();
const codeP0420 = dtcEngine.findCode('P0420');

if (codeP0420) {
  const semaforo = codeP0420.severity === 1 ? '🟢 LEVE' : codeP0420.severity === 2 ? '🟡 PRECAUCIÓN' : '🔴 CRÍTICO';
  console.log(`Código: ${codeP0420.code} • Semáforo: ${semaforo}`);
  console.log(`Título Técnico: ${codeP0420.technicalTitle}`);
  console.log(`Explicación Clara: "${codeP0420.plainSpanishExplanation}"`);
  console.log(`Contexto Venezuela: "${codeP0420.venezuelaSpecificContext}"`);
  console.log('\n📊 Causas Probables (80/20):');
  codeP0420.mostProbableCauses.forEach((cause) => {
    console.log(`  - [${cause.probabilityPercentage}%] ${cause.component} (Costo est.: $${cause.estimatedPartCostUsd[0]}-$${cause.estimatedPartCostUsd[1]} USD)`);
  });
  console.log('\n🛡️ Pregunta Clave para el Taller:');
  console.log(`  "${codeP0420.antiScamMechanicQuestions[0]}"`);
}

console.log('\n====================================================');
console.log('✅ PRUEBA DEL DOMINIO FINALIZADA EXITOSAMENTE');
console.log('====================================================');
