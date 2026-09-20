import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDtcScanner } from '../../hooks/useDtcScanner';

export default function ScannerScreen() {
  const {
    searchCode,
    setSearchCode,
    activeDTC,
    savedScans,
    saveCurrentScan,
    getSeverityMeta
  } = useDtcScanner();

  const [scanNotes, setScanNotes] = useState('');
  const [showNotesInput, setShowNotesInput] = useState(false);

  const handleSaveScan = () => {
    const ok = saveCurrentScan(scanNotes);
    if (ok) {
      setShowNotesInput(false);
      setScanNotes('');
      Alert.alert('Guardado', `Código ${activeDTC?.code} archivado en el historial de diagnóstico de tu vehículo.`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <Text style={styles.badge}>DIAGNÓSTICO OBD2 MANUAL</Text>
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineText}>● 100% OFFLINE</Text>
            </View>
          </View>
          <Text style={styles.title}>Decodificador de Fallas</Text>
          <Text style={styles.subtitle}>
            Ingresa el código que arrojó el escáner o busca por síntoma para blindarte contra engaños en el taller.
          </Text>
        </View>

        {/* INPUT DE BÚSQUEDA */}
        <View style={styles.searchCard}>
          <Text style={styles.inputLabel}>Código DTC de Falla (Ej: P0420, P0171, P0300):</Text>
          <TextInput
            style={styles.input}
            value={searchCode}
            onChangeText={(text) => setSearchCode(text.toUpperCase())}
            placeholder="Escribe el código..."
            placeholderTextColor="#64748b"
            autoCapitalize="characters"
          />

          {/* ATAJOS RÁPIDOS */}
          <View style={styles.quickRow}>
            <Text style={styles.quickLabel}>Comunes en VE:</Text>
            {['P0420', 'P0171', 'P0300'].map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setSearchCode(c)}
                style={[styles.quickPill, searchCode === c && styles.quickPillActive]}
              >
                <Text style={[styles.quickPillText, searchCode === c && styles.quickPillTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* RESULTADO DE DIAGNÓSTICO */}
        {activeDTC ? (
          <View style={styles.resultCard}>
            {/* ENCABEZADO Y SEMÁFORO */}
            <View style={styles.resultHeader}>
              <View>
                <Text style={styles.codeText}>{activeDTC.code}</Text>
                <Text style={styles.systemText}>Sistema: {activeDTC.system}</Text>
              </View>
              {(() => {
                const badge = getSeverityMeta(activeDTC.severity);
                return (
                  <View style={[styles.sevBadge, { backgroundColor: badge.bg, borderColor: badge.color }]}>
                    <Text style={[styles.sevBadgeText, { color: badge.color }]}>{badge.label}</Text>
                  </View>
                );
              })()}
            </View>

            {/* BOTÓN DE GUARDAR EN HISTORIAL */}
            <TouchableOpacity 
              style={styles.saveHistoryBtn}
              onPress={() => setShowNotesInput(!showNotesInput)}
            >
              <Text style={styles.saveHistoryBtnText}>
                {showNotesInput ? '✕ Cancelar Nota' : '💾 Guardar en Diagnósticos de mi Auto'}
              </Text>
            </TouchableOpacity>

            {showNotesInput && (
              <View style={styles.notesForm}>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Añade notas (ej: Falló subiendo Tazón tras echar gasolina)..."
                  placeholderTextColor="#64748b"
                  value={scanNotes}
                  onChangeText={setScanNotes}
                />
                <TouchableOpacity style={styles.confirmSaveBtn} onPress={handleSaveScan}>
                  <Text style={styles.confirmSaveBtnText}>Confirmar Guardado en SQLite</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* EXPLICACIÓN CLARA */}
            <View style={styles.sectionBlock}>
              <Text style={styles.blockTitle}>¿Qué significa en cristiano?</Text>
              <Text style={styles.plainText}>{activeDTC.plainSpanishExplanation}</Text>
            </View>

            {/* CONTEXTO VENEZUELA */}
            {activeDTC.venezuelaSpecificContext && (
              <View style={styles.contextBox}>
                <Text style={styles.contextTitle}>🇻🇪 Realidad en Venezuela:</Text>
                <Text style={styles.contextText}>{activeDTC.venezuelaSpecificContext}</Text>
              </View>
            )}

            {/* CAUSAS PROBABLES 80/20 */}
            <View style={styles.sectionBlock}>
              <Text style={styles.blockTitle}>📊 Causas Raíz Más Probables (80/20):</Text>
              {activeDTC.mostProbableCauses.map((cause, idx) => (
                <View key={idx} style={styles.causeItem}>
                  <View style={styles.causeRow}>
                    <Text style={styles.causeProb}>{cause.probabilityPercentage}%</Text>
                    <Text style={styles.causeComp}>{cause.component}</Text>
                  </View>
                  <Text style={styles.causePrice}>
                    Repuesto aprox: ${cause.estimatedPartCostUsd[0]} - ${cause.estimatedPartCostUsd[1]} USD
                  </Text>
                </View>
              ))}
            </View>

            {/* ESCUDO ANTI-ESTAFAS */}
            <View style={styles.shieldCard}>
              <Text style={styles.shieldHeader}>🛡️ ESCUDO ANTI-ESTAFAS PARA EL TALLER</Text>
              <Text style={styles.shieldSubtitle}>Hazle estas preguntas al mecánico antes de autorizar el arreglo:</Text>
              {activeDTC.antiScamMechanicQuestions.map((q, qIdx) => (
                <Text key={qIdx} style={styles.shieldQuestion}>• "{q}"</Text>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Código no encontrado en el diccionario inicial.</Text>
            <Text style={styles.emptySubtext}>Prueba con P0420, P0171 o P0300.</Text>
          </View>
        )}

        {/* HISTORIAL DE ESCANEOS GUARDADOS */}
        {savedScans.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>📋 Historial de Diagnósticos Recientes</Text>
            {savedScans.map((scan) => (
              <TouchableOpacity 
                key={scan.id} 
                style={styles.historyItem}
                onPress={() => setSearchCode(scan.code)}
              >
                <View style={styles.historyHeader}>
                  <Text style={styles.historyCode}>{scan.code}</Text>
                  <Text style={styles.historyDate}>{new Date(scan.scannedAtIso).toLocaleDateString()}</Text>
                </View>
                {scan.notes && <Text style={styles.historyNotes}>{scan.notes}</Text>}
              </TouchableOpacity>
            ))}
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
    marginBottom: 16
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  badge: {
    color: '#ffb703',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1
  },
  offlineBadge: {
    backgroundColor: 'rgba(56, 239, 125, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 239, 125, 0.3)'
  },
  offlineText: {
    color: '#38ef7d',
    fontSize: 10,
    fontWeight: '700'
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
  searchCard: {
    backgroundColor: '#0c121d',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.15)',
    marginBottom: 16
  },
  inputLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#161f30',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#00f2fe',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.2)'
  },
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12
  },
  quickLabel: {
    color: '#64748b',
    fontSize: 11
  },
  quickPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#161f30',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)'
  },
  quickPillActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    borderColor: '#00f2fe'
  },
  quickPillText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700'
  },
  quickPillTextActive: {
    color: '#00f2fe'
  },
  resultCard: {
    backgroundColor: '#0c121d',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 16
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14
  },
  codeText: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1
  },
  systemText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2
  },
  sevBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1
  },
  sevBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  },
  saveHistoryBtn: {
    backgroundColor: 'rgba(0, 242, 254, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.25)'
  },
  saveHistoryBtnText: {
    color: '#00f2fe',
    fontSize: 12,
    fontWeight: '700'
  },
  notesForm: {
    backgroundColor: '#161f30',
    borderRadius: 8,
    padding: 10,
    marginBottom: 14
  },
  notesInput: {
    color: '#f8fafc',
    fontSize: 12,
    marginBottom: 8
  },
  confirmSaveBtn: {
    backgroundColor: '#00f2fe',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center'
  },
  confirmSaveBtnText: {
    color: '#070a0f',
    fontWeight: '800',
    fontSize: 12
  },
  sectionBlock: {
    marginBottom: 14
  },
  blockTitle: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6
  },
  plainText: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18
  },
  contextBox: {
    backgroundColor: 'rgba(255, 183, 3, 0.08)',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#ffb703',
    marginBottom: 16
  },
  contextTitle: {
    color: '#ffb703',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4
  },
  contextText: {
    color: '#e2e8f0',
    fontSize: 12,
    lineHeight: 17
  },
  causeItem: {
    backgroundColor: '#161f30',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8
  },
  causeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  causeProb: {
    color: '#ff2a5f',
    fontWeight: '800',
    fontSize: 12
  },
  causeComp: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 13
  },
  causePrice: {
    color: '#64748b',
    fontSize: 11
  },
  shieldCard: {
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.2)',
    marginTop: 8
  },
  shieldHeader: {
    color: '#00f2fe',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 4
  },
  shieldSubtitle: {
    color: '#94a3b8',
    fontSize: 11,
    marginBottom: 8
  },
  shieldQuestion: {
    color: '#e2e8f0',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 4,
    fontStyle: 'italic'
  },
  emptyCard: {
    backgroundColor: '#0c121d',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center'
  },
  emptyText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600'
  },
  emptySubtext: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 4
  },
  historySection: {
    marginTop: 10
  },
  historyTitle: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10
  },
  historyItem: {
    backgroundColor: '#0c121d',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  historyCode: {
    color: '#00f2fe',
    fontSize: 14,
    fontWeight: '800'
  },
  historyDate: {
    color: '#64748b',
    fontSize: 10
  },
  historyNotes: {
    color: '#94a3b8',
    fontSize: 11
  }
});
