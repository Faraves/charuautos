import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DocumentScraperEngine } from '../../domain/engine/documentScraper';
import { CanonicalVehicle } from '../../domain/types/vehicle';
import { VENEZUELAN_VEHICLES_SEED } from '../../domain/data/vehicles.seed';

export default function CompareAndPdfScreen() {
  const [extractedVehicle, setExtractedVehicle] = useState<CanonicalVehicle | null>(null);
  const [baselineIndex, setBaselineIndex] = useState<number>(0); // Toyota Corolla por defecto

  const scraper = useMemo(() => new DocumentScraperEngine(), []);
  const baselineVehicle = VENEZUELAN_VEHICLES_SEED[baselineIndex];

  // Simulación interactiva de carga de un PDF de Ficha Técnica
  const handleSimulatePdfUpload = () => {
    const sampleBrochureText = `
      FICHA TÉCNICA OFICIAL — DONGFENG SHINE MAX SEDÁN 2024
      MOTOR Y TRANSMISIÓN:
      Motor 1.5L Turbo Mach Power Gasolina.
      Potencia máxima de 190 HP @ 5200 rpm.
      Torque neto del motor: 300 Nm entre 2000 y 4000 rpm.
      Mecanismo de distribución por cadena silenciosa.
      Transmisión automática 7DCT.
      
      DIMENSIONES Y CAPACIDADES:
      Distancia libre al suelo (despeje): 155 mm.
      Capacidad del maletero: 480 litros.
      Capacidad del tanque de combustible: 52 litros.
    `;

    const result = scraper.parseDocumentText('Dongfeng_ShineMax_2024.pdf', sampleBrochureText);
    setExtractedVehicle(result.canonicalVehicleCandidate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.badge}>PARSER & SCRAPER INTELIGENTE</Text>
          <Text style={styles.title}>Comparador de Fichas</Text>
          <Text style={styles.subtitle}>
            Adjunta cualquier PDF comercial o ficha técnica para extraer sus datos y compararlo al instante.
          </Text>
        </View>

        {/* ÁREA DE CARGA DE PDF */}
        <View style={styles.dropzoneCard}>
          <Text style={styles.dropzoneEmoji}>📄</Text>
          <Text style={styles.dropzoneTitle}>Adjuntar Ficha Técnica en PDF</Text>
          <Text style={styles.dropzoneSubtitle}>
            Compatible con brochures de marcas chinas, importadas o fichas técnicas locales.
          </Text>

          <TouchableOpacity 
            onPress={handleSimulatePdfUpload}
            style={styles.uploadBtn}
          >
            <Text style={styles.uploadBtnText}>
              {extractedVehicle ? '✓ PDF Procesado (Toca para recargar)' : '➕ Cargar Ficha Técnica PDF'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* COMPARADOR LADO A LADO */}
        {extractedVehicle && (
          <View style={styles.comparisonContainer}>
            <Text style={styles.sectionHeader}>⚖️ Comparativa Lado a Lado</Text>

            {/* SELECTOR DEL VEHÍCULO BASE */}
            <View style={styles.selectorCard}>
              <Text style={styles.selectorLabel}>Comparando Ficha PDF contra:</Text>
              <View style={styles.pillRow}>
                {VENEZUELAN_VEHICLES_SEED.slice(0, 3).map((veh, idx) => (
                  <TouchableOpacity
                    key={veh.id}
                    onPress={() => setBaselineIndex(idx)}
                    style={[styles.vehPill, baselineIndex === idx && styles.vehPillActive]}
                  >
                    <Text style={[styles.vehPillText, baselineIndex === idx && styles.vehPillTextActive]}>
                      {veh.model}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* TABLA COMPARATIVA */}
            <View style={styles.tableCard}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.colHeader, { flex: 1.2 }]}>Parámetro</Text>
                <Text style={[styles.colHeader, { flex: 1, color: '#ffb703' }]}>Ficha PDF</Text>
                <Text style={[styles.colHeader, { flex: 1, color: '#00f2fe' }]}>{baselineVehicle.model}</Text>
              </View>

              {/* FILA: POTENCIA */}
              <View style={styles.tableRow}>
                <Text style={[styles.cellParam, { flex: 1.2 }]}>Potencia</Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#ffb703' }]}>
                  {extractedVehicle.engine.horsepower} HP
                </Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#00f2fe' }]}>
                  {baselineVehicle.engine.horsepower} HP
                </Text>
              </View>

              {/* FILA: TORQUE */}
              <View style={styles.tableRow}>
                <Text style={[styles.cellParam, { flex: 1.2 }]}>Torque (Fuerza)</Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#ffb703' }]}>
                  {extractedVehicle.engine.torqueNm} Nm
                </Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#00f2fe' }]}>
                  {baselineVehicle.engine.torqueNm} Nm
                </Text>
              </View>

              {/* FILA: DESPEJE SUELO */}
              <View style={styles.tableRow}>
                <Text style={[styles.cellParam, { flex: 1.2 }]}>Despeje Huecos</Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#ffb703' }]}>
                  {extractedVehicle.dimensions.groundClearanceMm} mm
                </Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#00f2fe' }]}>
                  {baselineVehicle.dimensions.groundClearanceMm} mm
                </Text>
              </View>

              {/* FILA: MALETERO */}
              <View style={styles.tableRow}>
                <Text style={[styles.cellParam, { flex: 1.2 }]}>Maletero</Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#ffb703' }]}>
                  {extractedVehicle.dimensions.trunkCapacityLiters} L
                </Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#00f2fe' }]}>
                  {baselineVehicle.dimensions.trunkCapacityLiters} L
                </Text>
              </View>

              {/* FILA: CADENA O CORREA */}
              <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                <Text style={[styles.cellParam, { flex: 1.2 }]}>Distribución</Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#38ef7d' }]}>
                  {extractedVehicle.engine.timingMechanism.toUpperCase()}
                </Text>
                <Text style={[styles.cellValue, { flex: 1, color: '#38ef7d' }]}>
                  {baselineVehicle.engine.timingMechanism.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        )}
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
    marginBottom: 18
  },
  badge: {
    color: '#00f2fe',
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
  dropzoneCard: {
    backgroundColor: '#0c121d',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(0, 242, 254, 0.3)',
    alignItems: 'center',
    marginBottom: 20
  },
  dropzoneEmoji: {
    fontSize: 36,
    marginBottom: 8
  },
  dropzoneTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700'
  },
  dropzoneSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
    lineHeight: 16
  },
  uploadBtn: {
    backgroundColor: '#00f2fe',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8
  },
  uploadBtnText: {
    color: '#070a0f',
    fontWeight: '800',
    fontSize: 12
  },
  comparisonContainer: {
    marginTop: 10
  },
  sectionHeader: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12
  },
  selectorCard: {
    backgroundColor: '#0c121d',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  selectorLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 8
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8
  },
  vehPill: {
    flex: 1,
    backgroundColor: '#161f30',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center'
  },
  vehPillActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    borderWidth: 1,
    borderColor: '#00f2fe'
  },
  vehPillText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600'
  },
  vehPillTextActive: {
    color: '#00f2fe',
    fontWeight: '800'
  },
  tableCard: {
    backgroundColor: '#0c121d',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.15)'
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  colHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center'
  },
  cellParam: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600'
  },
  cellValue: {
    fontSize: 12,
    fontWeight: '700'
  }
});
