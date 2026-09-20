import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMatchmaker } from '../../hooks/useMatchmaker';

export default function MatchmakerScreen() {
  const {
    profile,
    updateProfile,
    recommendations,
    savedFavorites,
    toggleFavorite
  } = useMatchmaker();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.badge}>MERCADO VENEZUELA 🇻🇪</Text>
          <Text style={styles.title}>Matchmaker Automotriz</Text>
          <Text style={styles.subtitle}>
            Encuentra el auto ideal para tu bolsillo, el estado de las vías y la disponibilidad de repuestos.
          </Text>
        </View>

        {/* SELECTOR DE PRESUPUESTO */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Presupuesto Máximo Disponible:</Text>
          <Text style={styles.budgetValue}>${profile.maxBudgetUsd.toLocaleString()} USD</Text>
          
          <View style={styles.pillRow}>
            {[4000, 6000, 9000, 15000].map((b) => (
              <TouchableOpacity
                key={b}
                onPress={() => updateProfile({ maxBudgetUsd: b })}
                style={[styles.pill, profile.maxBudgetUsd === b && styles.pillActive]}
              >
                <Text style={[styles.pillText, profile.maxBudgetUsd === b && styles.pillTextActive]}>
                  ${b / 1000}k
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SELECTOR DE CAMINOS */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>¿Por dónde ruedas habitualmente?</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity 
              onPress={() => updateProfile({ primaryRoadCondition: 'muchos_baches_huecos' })}
              style={[styles.optionBtn, profile.primaryRoadCondition === 'muchos_baches_huecos' && styles.optionBtnActive]}
            >
              <Text style={styles.optionEmoji}>🛑</Text>
              <Text style={styles.optionText}>Huecos / Baches</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => updateProfile({ primaryRoadCondition: 'subidas_pronunciadas' })}
              style={[styles.optionBtn, profile.primaryRoadCondition === 'subidas_pronunciadas' && styles.optionBtnActive]}
            >
              <Text style={styles.optionEmoji}>⛰️</Text>
              <Text style={styles.optionText}>Subidas / Cerros</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => updateProfile({ primaryRoadCondition: 'ciudad_plana' })}
              style={[styles.optionBtn, profile.primaryRoadCondition === 'ciudad_plana' && styles.optionBtnActive]}
            >
              <Text style={styles.optionEmoji}>🏙️</Text>
              <Text style={styles.optionText}>Ciudad Plana</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SELECTOR DE TOLERANCIA A GASOLINA */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Sensibilidad a Gasolina de Bajo Octanaje:</Text>
          <View style={styles.optionRow}>
            <TouchableOpacity 
              onPress={() => updateProfile({ fuelPriority: 'resistencia_gasolina_mala' })}
              style={[styles.optionBtn, profile.fuelPriority === 'resistencia_gasolina_mala' && styles.optionBtnActive]}
            >
              <Text style={styles.optionEmoji}>🛡️</Text>
              <Text style={styles.optionText}>Muelle / 91 Oct</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => updateProfile({ fuelPriority: 'ahorro_maximo_consumo' })}
              style={[styles.optionBtn, profile.fuelPriority === 'ahorro_maximo_consumo' && styles.optionBtnActive]}
            >
              <Text style={styles.optionEmoji}>⚡</Text>
              <Text style={styles.optionText}>Bajo Consumo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RESULTADOS RECOMENDADOS */}
        <Text style={styles.sectionHeader}>🏆 Top Recomendaciones ({recommendations.length} evaluados)</Text>

        {recommendations.slice(0, 3).map((item) => {
          const isFav = savedFavorites.includes(item.vehicle.id);
          return (
            <View key={item.vehicle.id} style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vehicleName}>
                    {item.vehicle.maker} {item.vehicle.model}
                  </Text>
                  <Text style={styles.vehicleNickname}>
                    "{item.vehicle.marketDataVE.popularNicknames[0] || item.vehicle.trimName}"
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[styles.favBtn, isFav && styles.favBtnActive]}
                  onPress={() => toggleFavorite(item.vehicle.id)}
                >
                  <Text style={styles.favBtnText}>{isFav ? '★ Favorito' : '☆ Guardar'}</Text>
                </TouchableOpacity>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreNumber}>{item.overallMatchScore}%</Text>
                  <Text style={styles.scoreLabel}>MATCH</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Precio estimado usado:</Text>
                <Text style={styles.priceValue}>
                  ${item.vehicle.marketDataVE.priceRangeUsdUsed[0].toLocaleString()} - ${item.vehicle.marketDataVE.priceRangeUsdUsed[1].toLocaleString()} USD
                </Text>
              </View>

              {/* PROS */}
              <View style={styles.prosContainer}>
                {item.prosInVenezuela.map((pro, pIdx) => (
                  <Text key={pIdx} style={styles.proItem}>✓ {pro}</Text>
                ))}
              </View>

              {/* CONS */}
              {item.consInVenezuela.length > 0 && (
                <View style={styles.consContainer}>
                  {item.consInVenezuela.map((con, cIdx) => (
                    <Text key={cIdx} style={styles.conItem}>⚠️ {con}</Text>
                  ))}
                </View>
              )}

              {/* BOTÓN LEAD CONCESIONARIO / REVISIÓN */}
              <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>Agendar Revisión Pre-Compra en Taller</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070a0f'
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40
  },
  header: {
    marginBottom: 20
  },
  badge: {
    color: '#ffb703',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4
  },
  title: {
    color: '#f8fafc',
    fontSize: 26,
    fontWeight: '800'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18
  },
  card: {
    backgroundColor: '#0c121d',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  cardLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 8
  },
  budgetValue: {
    color: '#00f2fe',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8
  },
  pill: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#161f30',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  pillActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    borderColor: '#00f2fe'
  },
  pillText: {
    color: '#94a3b8',
    fontWeight: '700',
    fontSize: 13
  },
  pillTextActive: {
    color: '#00f2fe'
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8
  },
  optionBtn: {
    flex: 1,
    backgroundColor: '#161f30',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  optionBtnActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.12)',
    borderColor: '#00f2fe'
  },
  optionEmoji: {
    fontSize: 18,
    marginBottom: 4
  },
  optionText: {
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center'
  },
  sectionHeader: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 12
  },
  resultCard: {
    backgroundColor: '#0c121d',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.2)'
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  vehicleName: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800'
  },
  vehicleNickname: {
    color: '#ffb703',
    fontSize: 12,
    fontWeight: '600'
  },
  favBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#161f30',
    marginRight: 8
  },
  favBtnActive: {
    backgroundColor: 'rgba(255, 183, 3, 0.2)'
  },
  favBtnText: {
    color: '#ffb703',
    fontSize: 10,
    fontWeight: '700'
  },
  scoreBadge: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00f2fe'
  },
  scoreNumber: {
    color: '#00f2fe',
    fontSize: 16,
    fontWeight: '900'
  },
  scoreLabel: {
    color: '#00f2fe',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12
  },
  priceLabel: {
    color: '#94a3b8',
    fontSize: 11
  },
  priceValue: {
    color: '#38ef7d',
    fontWeight: '700',
    fontSize: 13
  },
  prosContainer: {
    marginBottom: 8,
    gap: 4
  },
  proItem: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 16
  },
  consContainer: {
    marginBottom: 14,
    gap: 4
  },
  conItem: {
    color: '#ffb703',
    fontSize: 11,
    lineHeight: 16
  },
  ctaButton: {
    backgroundColor: '#00f2fe',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  ctaButtonText: {
    color: '#070a0f',
    fontWeight: '800',
    fontSize: 12
  }
});
