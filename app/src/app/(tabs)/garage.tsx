import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  StyleSheet,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGarage } from '../../hooks/useGarage';
import { useSyncQueue } from '../../hooks/useSyncQueue';
import { useSubscription } from '../../hooks/useSubscription';
import { CertificateGeneratorEngine } from '../../domain/engine/certificateGenerator';

export default function GarageScreen() {
  const {
    vehicle,
    odometer,
    healthScore,
    metrics,
    services,
    odometerBlocks,
    isChainTampered,
    recordFuel,
    updateMileage,
    recordService
  } = useGarage();

  const {
    status: syncStatus,
    pendingCount,
    isOnline,
    triggerManualSync
  } = useSyncQueue();

  const {
    entitlements,
    bcvRate,
    banks,
    convertUsdToVes,
    submitPagoMovil,
    initiateBinancePay,
    simulateWebhookConfirmation,
    isProcessing
  } = useSubscription();

  // Modales de interacción
  const [showFuelModal, setShowFuelModal] = useState(false);
  const [showOdometerModal, setShowOdometerModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);

  // Estados locales para combustible y odómetro
  const [fuelLiters, setFuelLiters] = useState('40');
  const [fuelUsd, setFuelUsd] = useState('20');
  const [fuelKm, setFuelKm] = useState(String(odometer + 400));
  const [newOdometerInput, setNewOdometerInput] = useState(String(odometer + 150));
  const [cryptoError, setCryptoError] = useState<string | null>(null);

  const [serviceType, setServiceType] = useState('Cambio de Aceite 5W-30 Sintético');
  const [serviceCost, setServiceCost] = useState('45');
  const [serviceWorkshop, setServiceWorkshop] = useState('Taller Los Ruices');

  // Estados locales para Pago Bimonetario
  const [payMethod, setPayMethod] = useState<'pago_movil' | 'binance_pay'>('pago_movil');
  const [pmBank, setPmBank] = useState('0105'); // Mercantil por defecto
  const [pmPhone, setPmPhone] = useState('04141234567');
  const [pmId, setPmId] = useState('V-18765432');
  const [pmRef, setPmRef] = useState('847291');

  // Acciones
  const handleSaveFuel = async () => {
    const res = await recordFuel({
      odometerKm: Number(fuelKm) || odometer,
      litersFilled: Number(fuelLiters) || 40,
      priceTotalUsd: Number(fuelUsd) || 20,
      octaneType: 'internacional_95'
    });
    if (res.success) {
      setShowFuelModal(false);
      Alert.alert('Éxito', res.message);
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const handleSaveOdometer = async () => {
    setCryptoError(null);
    const targetKm = Number(newOdometerInput);
    if (targetKm <= odometer) {
      setCryptoError(`Violación de Monotonicidad: El nuevo kilometraje (${targetKm.toLocaleString()} km) no puede ser menor o igual al registrado (${odometer.toLocaleString()} km). Intento de alteración bloqueado.`);
      return;
    }

    const res = await updateMileage(targetKm);
    if (res.success) {
      setShowOdometerModal(false);
      Alert.alert('Bloque Minado', res.message);
    } else {
      setCryptoError(res.message);
    }
  };

  const handleSaveService = async () => {
    const res = await recordService({
      serviceType,
      mileageAtService: odometer,
      partsCostUsd: Number(serviceCost) * 0.7,
      laborCostUsd: Number(serviceCost) * 0.3,
      workshopName: serviceWorkshop
    });
    if (res.success) {
      setShowServiceModal(false);
      Alert.alert('Registrado', res.message);
    } else {
      Alert.alert('Error', res.message);
    }
  };

  const handleInspectOrExportCert = () => {
    if (!entitlements.canExportPdfCertificate) {
      Alert.alert(
        '👑 Función CharuPro Requerida',
        'La exportación del Pasaporte Criptográfico oficial con código QR requiere la suscripción CharuPro ($4.99 USD o en Bs. a tasa BCV).\n\n¿Deseas activarla ahora?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ver Planes de Pago', onPress: () => setShowPayModal(true) }
        ]
      );
    } else {
      setShowCertModal(true);
    }
  };

  const handleGenerateCertificatePdf = () => {
    if (!vehicle) return;
    const engine = new CertificateGeneratorEngine();
    const certData = engine.compileCertificateData(
      vehicle,
      odometerBlocks,
      services,
      metrics
    );
    Alert.alert(
      '📜 Certificado Criptográfico Generado',
      `ID: ${certData.metadata.certificateId}\n\nOdómetro: ${certData.vehicle.currentMileageKm.toLocaleString()} km\nBloques SHA-256: ${certData.cryptography.totalBlocksMined}\nEstado: ${certData.cryptography.integrityStatus === 'VERIFIED_TAMPER_FREE' ? '🟢 100% Verificado' : '🔴 Manipulado'}\n\nListo para exportar a PDF o imprimir para el traspaso del vehículo.`
    );
  };

  const handleSubmitPayment = async () => {
    const planPriceUsd = 4.99;
    const amountVes = convertUsdToVes(planPriceUsd);

    if (payMethod === 'pago_movil') {
      const res = await submitPagoMovil({
        planId: 'charu_driver_monthly',
        bankCode: pmBank,
        phoneNumber: pmPhone,
        idDocument: pmId,
        referenceNumber: pmRef,
        amountVes
      });

      if (res.success) {
        Alert.alert(
          '✅ Pago Móvil Recibido',
          `${res.message}\n\n[SIMULACIÓN EN VIVO]: ¿Deseas aprobar la conciliación bancaria automáticamente para esta prueba?`,
          [
            { text: 'Esperar conciliación', onPress: () => setShowPayModal(false) },
            { 
              text: 'Aprobar al instante', 
              onPress: async () => {
                if (res.transaction) {
                  await simulateWebhookConfirmation(res.transaction.id, 'charu_pro_driver');
                  setShowPayModal(false);
                  Alert.alert('🎉 ¡Membresía Activada!', 'Ahora tienes acceso a la exportación de certificados criptográficos en PDF.');
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Error en Validación', res.message);
      }
    } else {
      // Binance Pay
      const tx = await initiateBinancePay('charu_driver_monthly');
      Alert.alert(
        '🟡 Orden Binance Pay Creada',
        `Monto: $${tx.amountUsd} USDT\nID Orden: ${tx.binancePayData?.merchantOrderId}\n\n[SIMULACIÓN EN VIVO]: ¿Aprobar webhook instantáneo de Binance?`,
        [
          { text: 'Cerrar', onPress: () => setShowPayModal(false) },
          { 
            text: 'Aprobar Webhook', 
            onPress: async () => {
              await simulateWebhookConfirmation(tx.id, 'charu_pro_driver');
              setShowPayModal(false);
              Alert.alert('🎉 ¡Membresía Activada!', 'Binance Pay confirmó la transacción con éxito.');
            }
          }
        ]
      );
    }
  };

  const charuProPriceVes = convertUsdToVes(4.99);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER CON BADGE DE COLA DE SINCRONIZACIÓN Y PRO STATUS */}
        <View style={styles.header}>
          <View style={styles.badgeRow}>
            <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
              <Text style={styles.badge}>PASAPORTE DIGITAL 🛡️</Text>
              {entitlements.canExportPdfCertificate ? (
                <View style={styles.proBadge}>
                  <Text style={styles.proBadgeText}>👑 PRO ACTIVO</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.upgradeBadge} onPress={() => setShowPayModal(true)}>
                  <Text style={styles.upgradeBadgeText}>👑 ACTIVAR PRO</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* PILL DE SINCRONIZACIÓN EN SEGUNDO PLANO */}
            <TouchableOpacity 
              style={[
                styles.syncBadge,
                !isOnline ? styles.syncBadgeOffline : (pendingCount > 0 ? styles.syncBadgePending : styles.syncBadgeOnline)
              ]}
              onPress={triggerManualSync}
            >
              <View style={[
                styles.syncDot,
                !isOnline ? styles.syncDotOffline : (pendingCount > 0 ? styles.syncDotPending : styles.syncDotOnline)
              ]} />
              <Text style={styles.syncText}>
                {!isOnline 
                  ? 'Offline' 
                  : (pendingCount > 0 ? `${pendingCount} pendientes` : 'Sincronizado')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Mi Carro (Garage)</Text>
          <Text style={styles.subtitle}>
            Historial de vida útil, gastos bimonetarios y cadena inmutable SHA-256 en SQLite local.
          </Text>
        </View>

        {/* TARJETA DEL VEHÍCULO ACTIVO */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleTop}>
            <View>
              <Text style={styles.vehicleName}>{vehicle?.maker} {vehicle?.model}</Text>
              <Text style={styles.vehicleDetail}>{vehicle?.trimName} • Placa: {vehicle?.licensePlate}</Text>
            </View>
            <View style={[styles.healthCircle, isChainTampered && styles.healthCircleTampered]}>
              <Text style={[styles.healthNumber, isChainTampered && styles.healthNumberTampered]}>
                {isChainTampered ? '!' : healthScore}
              </Text>
              <Text style={[styles.healthLabel, isChainTampered && styles.healthNumberTampered]}>
                {isChainTampered ? 'ALTERADO' : 'SALUD'}
              </Text>
            </View>
          </View>

          {/* ODÓMETRO INTERACTIVO CON BOTÓN DE ACTUALIZAR */}
          <View style={styles.odometerBox}>
            <View>
              <Text style={styles.odometerLabel}>Odómetro Actual Auditado:</Text>
              <Text style={styles.odometerValue}>{odometer.toLocaleString()} km</Text>
            </View>
            <TouchableOpacity 
              style={styles.odometerBtn}
              onPress={() => {
                setNewOdometerInput(String(odometer + 200));
                setCryptoError(null);
                setShowOdometerModal(true);
              }}
            >
              <Text style={styles.odometerBtnText}>+ Actualizar Km</Text>
            </TouchableOpacity>
          </View>

          {/* ESTADO DE LA CADENA CRIPTOGRÁFICA */}
          <View style={styles.chainStatusRow}>
            <View style={[styles.chainDot, isChainTampered ? styles.chainDotRed : styles.chainDotGreen]} />
            <Text style={styles.chainStatusText}>
              {isChainTampered 
                ? 'ADVERTENCIA: Cadena de kilometraje alterada ilegítimamente.' 
                : `Cadena SHA-256 Verificada (${odometerBlocks.length} bloques inmutables)`}
            </Text>
          </View>
        </View>

        {/* DASHBOARD FINANCIERO Y RENDIMIENTO */}
        <Text style={styles.sectionHeader}>📊 Costos y Rendimiento (Bimonetario)</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Costo por Kilómetro:</Text>
            <Text style={styles.metricPrimary}>${metrics.costPerKmUsd.toFixed(2)} USD</Text>
            <Text style={styles.metricSecondary}>~{metrics.costPerKmVes.toFixed(2)} Bs./km (BCV)</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Consumo Promedio:</Text>
            <Text style={styles.metricPrimary}>{metrics.fuelEfficiencyKmPerLiter.toFixed(1)} km/L</Text>
            <Text style={styles.metricSecondary}>~{metrics.estimatedKmPerTank} km por tanque</Text>
          </View>
        </View>

        {/* ACCIONES RÁPIDAS INTERACTIVAS */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => {
              setFuelKm(String(odometer + 400));
              setShowFuelModal(true);
            }}
          >
            <Text style={styles.actionEmoji}>⛽</Text>
            <Text style={styles.actionBtnText}>Registrar Gasolina</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, styles.actionBtnSecondary]}
            onPress={() => setShowServiceModal(true)}
          >
            <Text style={styles.actionEmoji}>🔧</Text>
            <Text style={styles.actionBtnText}>Nuevo Servicio</Text>
          </TouchableOpacity>
        </View>

        {/* TIMELINE DE MANTENIMIENTOS */}
        <View style={styles.timelineTitleRow}>
          <Text style={styles.sectionHeader}>⏳ Línea de Tiempo de Servicios</Text>
          <Text style={styles.timelineCount}>{services.length} registros</Text>
        </View>

        {/* ALERTA PRÓXIMO SERVICIO */}
        <View style={[styles.timelineItem, styles.timelineAlert]}>
          <View style={styles.timelineDotAmber} />
          <View style={styles.timelineContent}>
            <View style={styles.timelineHeader}>
              <Text style={styles.timelineTitle}>Cambio de Aceite 5W-30 y Filtro</Text>
              <Text style={styles.timelineBadgeAmber}>En 1,500 km</Text>
            </View>
            <Text style={styles.timelineDesc}>Programado para los {(odometer + 1500).toLocaleString()} km. Estimado repuestos: $35 - $45 USD.</Text>
          </View>
        </View>

        {/* SERVICIOS DINÁMICOS DESDE SQLITE */}
        {services.map((srv) => (
          <View key={srv.id} style={styles.timelineItem}>
            <View style={styles.timelineDotGreen} />
            <View style={styles.timelineContent}>
              <View style={styles.timelineHeader}>
                <Text style={styles.timelineTitle}>{srv.serviceType}</Text>
                <Text style={styles.timelineDate}>{srv.mileageAtService.toLocaleString()} km</Text>
              </View>
              <Text style={styles.timelineDesc}>
                Total: ${srv.totalCostUsd.toFixed(2)} USD • Taller: {srv.workshopName || 'Particular'}.
                {srv.notes ? ` Nota: ${srv.notes}` : ''}
              </Text>
            </View>
          </View>
        ))}

        {/* DESCARGA CERTIFICADO CHARUPRO */}
        <TouchableOpacity 
          style={styles.certCard}
          onPress={handleInspectOrExportCert}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.certTitle}>📑 Exportar Pasaporte Criptográfico Anti-Fraude</Text>
            {!entitlements.canExportPdfCertificate && (
              <View style={styles.lockBadge}><Text style={styles.lockBadgeText}>PRO</Text></View>
            )}
          </View>
          <Text style={styles.certDesc}>
            Genera un certificado oficial con sello matemático inmutable SHA-256 para probar la salud real de tu auto y venderlo más rápido sin desconfianzas.
          </Text>
          <Text style={styles.certCta}>
            {entitlements.canExportPdfCertificate 
              ? 'Inspeccionar Cadena & Exportar PDF Oficial →' 
              : 'Desbloquear con CharuPro ($4.99 USD / Pago Móvil) →'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL 1: REGISTRAR GASOLINA */}
      <Modal visible={showFuelModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⛽ Registrar Carga de Combustible</Text>
            <Text style={styles.modalSubtitle}>Cálculo en vivo de consumo y costo bimonetario</Text>

            <Text style={styles.inputLabel}>Litros Cargados:</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={fuelLiters} 
              onChangeText={setFuelLiters} 
            />

            <Text style={styles.inputLabel}>Costo Total en USD ($0.50/L promedio internacional):</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={fuelUsd} 
              onChangeText={setFuelUsd} 
            />

            <Text style={styles.inputLabel}>Odómetro en el momento de la carga (km):</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={fuelKm} 
              onChangeText={setFuelKm} 
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowFuelModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleSaveFuel}>
                <Text style={styles.modalConfirmBtnText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: ACTUALIZAR ODÓMETRO (CON CRIPTOGRAFÍA ANTI-FRAUDE) */}
      <Modal visible={showOdometerModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🛡️ Actualizar Kilometraje</Text>
            <Text style={styles.modalSubtitle}>
              Cada lectura se sella con un bloque hash criptográfico inmutable.
            </Text>

            <Text style={styles.inputLabel}>Nuevo Odómetro (debe ser mayor a {odometer.toLocaleString()} km):</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={newOdometerInput} 
              onChangeText={setNewOdometerInput} 
            />

            {cryptoError && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{cryptoError}</Text>
              </View>
            )}

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowOdometerModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleSaveOdometer}>
                <Text style={styles.modalConfirmBtnText}>Sellar Bloque</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: NUEVO SERVICIO */}
      <Modal visible={showServiceModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🔧 Nuevo Registro de Mantenimiento</Text>
            
            <Text style={styles.inputLabel}>Descripción del Servicio:</Text>
            <TextInput 
              style={styles.input} 
              value={serviceType} 
              onChangeText={setServiceType} 
            />

            <Text style={styles.inputLabel}>Costo Total Estimado ($ USD):</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              value={serviceCost} 
              onChangeText={setServiceCost} 
            />

            <Text style={styles.inputLabel}>Nombre del Taller o Mecánico:</Text>
            <TextInput 
              style={styles.input} 
              value={serviceWorkshop} 
              onChangeText={setServiceWorkshop} 
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowServiceModal(false)}>
                <Text style={styles.modalCancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleSaveService}>
                <Text style={styles.modalConfirmBtnText}>Guardar Servicio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 4: VISUALIZADOR Y EXPORTADOR DE CERTIFICADO CHARUPRO */}
      <Modal visible={showCertModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '88%' }]}>
            <Text style={styles.modalTitle}>📜 Pasaporte Criptográfico CharuPro</Text>
            <Text style={styles.modalSubtitle}>
              Trazabilidad matemática anti-alteración. Cada bloque está encadenado al anterior mediante SHA-256.
            </Text>

            <ScrollView style={{ maxHeight: 240, marginVertical: 10 }}>
              {odometerBlocks.map((b) => (
                <View key={b.blockIndex} style={styles.certBlockItem}>
                  <View style={styles.certBlockHeader}>
                    <Text style={styles.certBlockIndex}>Bloque #{b.blockIndex}</Text>
                    <Text style={styles.certBlockKm}>{b.mileageKm.toLocaleString()} km</Text>
                  </View>
                  <Text style={styles.certBlockDate}>{new Date(b.recordedAtIso).toLocaleString()}</Text>
                  <Text style={styles.certBlockHash} numberOfLines={1}>
                    Hash: {b.currentHash}
                  </Text>
                  <Text style={styles.certBlockPrevHash} numberOfLines={1}>
                    Prev: {b.previousHash}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity 
              style={styles.exportPdfBtn}
              onPress={handleGenerateCertificatePdf}
            >
              <Text style={styles.exportPdfBtnText}>📄 Generar y Exportar PDF Oficial</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalCancelBtn} 
              onPress={() => setShowCertModal(false)}
            >
              <Text style={styles.modalCancelBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 5: PASARELA DE PAGO BIMONETARIA (PAGO MÓVIL / BINANCE PAY) */}
      <Modal visible={showPayModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: '90%' }]}>
            <Text style={styles.modalTitle}>👑 Membresía CharuPro</Text>
            <Text style={styles.modalSubtitle}>
              $4.99 USD / mes • Tasa oficial BCV ({bcvRate.toFixed(2)} Bs./$) = <Text style={{ color: '#00f2fe', fontWeight: '800' }}>{charuProPriceVes.toFixed(2)} Bs.</Text>
            </Text>

            {/* TABS DE MÉTODO DE PAGO */}
            <View style={styles.payTabRow}>
              <TouchableOpacity 
                style={[styles.payTab, payMethod === 'pago_movil' && styles.payTabActive]}
                onPress={() => setPayMethod('pago_movil')}
              >
                <Text style={[styles.payTabText, payMethod === 'pago_movil' && styles.payTabTextActive]}>
                  🇻🇪 Pago Móvil (Bs.)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.payTab, payMethod === 'binance_pay' && styles.payTabActive]}
                onPress={() => setPayMethod('binance_pay')}
              >
                <Text style={[styles.payTabText, payMethod === 'binance_pay' && styles.payTabTextActive]}>
                  🟡 Binance Pay (USDT)
                </Text>
              </TouchableOpacity>
            </View>

            {payMethod === 'pago_movil' ? (
              <ScrollView style={{ maxHeight: 280 }}>
                <View style={styles.payInfoBox}>
                  <Text style={styles.payInfoTitle}>Datos Receptores de CharuAutos:</Text>
                  <Text style={styles.payInfoText}>• Banco: Mercantil (0105)</Text>
                  <Text style={styles.payInfoText}>• Teléfono: 0414-9988776</Text>
                  <Text style={styles.payInfoText}>• Cédula/RIF: J-50012345-0</Text>
                  <Text style={styles.payInfoText}>• Monto exacto: <Text style={{ color: '#ffb703', fontWeight: '800' }}>{charuProPriceVes.toFixed(2)} Bs.</Text></Text>
                </View>

                <Text style={styles.inputLabel}>Banco Emisor (desde donde pagaste):</Text>
                <TextInput style={styles.input} value={pmBank} onChangeText={setPmBank} placeholder="Ej: 0105" />

                <Text style={styles.inputLabel}>Tu Teléfono Emisor:</Text>
                <TextInput style={styles.input} value={pmPhone} onChangeText={setPmPhone} keyboardType="phone-pad" />

                <Text style={styles.inputLabel}>Tu Cédula o RIF:</Text>
                <TextInput style={styles.input} value={pmId} onChangeText={setPmId} autoCapitalize="characters" />

                <Text style={styles.inputLabel}>Número de Referencia (6 a 8 dígitos):</Text>
                <TextInput style={styles.input} value={pmRef} onChangeText={setPmRef} keyboardType="numeric" />
              </ScrollView>
            ) : (
              <View style={styles.binanceBox}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>🪙</Text>
                <Text style={styles.binanceTitle}>Pago Instantáneo con USDT</Text>
                <Text style={styles.binanceDesc}>Escanea con tu App de Binance o toca para abrir la orden segura.</Text>
                <Text style={styles.binanceAmount}>Total: 4.99 USDT</Text>
                <Text style={styles.binanceHint}>Cero comisiones entre cuentas Binance</Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.paySubmitBtn} 
              onPress={handleSubmitPayment}
              disabled={isProcessing}
            >
              <Text style={styles.paySubmitBtnText}>
                {payMethod === 'pago_movil' ? `Confirmar Pago (${charuProPriceVes.toFixed(2)} Bs.)` : 'Pagar 4.99 USDT con Binance'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowPayModal(false)}>
              <Text style={styles.modalCancelBtnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 6
  },
  badge: {
    color: '#38ef7d',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1
  },
  proBadge: {
    backgroundColor: 'rgba(255, 183, 3, 0.2)',
    borderColor: '#ffb703',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1
  },
  proBadgeText: {
    color: '#ffb703',
    fontSize: 9,
    fontWeight: '800'
  },
  upgradeBadge: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    borderColor: '#00f2fe',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1
  },
  upgradeBadgeText: {
    color: '#00f2fe',
    fontSize: 9,
    fontWeight: '800'
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1
  },
  syncBadgeOnline: {
    backgroundColor: 'rgba(56, 239, 125, 0.1)',
    borderColor: 'rgba(56, 239, 125, 0.3)'
  },
  syncBadgePending: {
    backgroundColor: 'rgba(255, 183, 3, 0.15)',
    borderColor: '#ffb703'
  },
  syncBadgeOffline: {
    backgroundColor: 'rgba(100, 116, 139, 0.2)',
    borderColor: '#64748b'
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  syncDotOnline: {
    backgroundColor: '#38ef7d'
  },
  syncDotPending: {
    backgroundColor: '#ffb703'
  },
  syncDotOffline: {
    backgroundColor: '#94a3b8'
  },
  syncText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#f8fafc'
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
  vehicleCard: {
    backgroundColor: '#0c121d',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.2)',
    marginBottom: 18
  },
  vehicleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  vehicleName: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '800'
  },
  vehicleDetail: {
    color: '#ffb703',
    fontSize: 12,
    marginTop: 2
  },
  healthCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(56, 239, 125, 0.15)',
    borderWidth: 2,
    borderColor: '#38ef7d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  healthCircleTampered: {
    backgroundColor: 'rgba(255, 42, 95, 0.15)',
    borderColor: '#ff2a5f'
  },
  healthNumber: {
    color: '#38ef7d',
    fontSize: 18,
    fontWeight: '900'
  },
  healthNumberTampered: {
    color: '#ff2a5f'
  },
  healthLabel: {
    color: '#38ef7d',
    fontSize: 8,
    fontWeight: '800'
  },
  odometerBox: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  odometerLabel: {
    color: '#94a3b8',
    fontSize: 12
  },
  odometerValue: {
    color: '#00f2fe',
    fontSize: 18,
    fontWeight: '800'
  },
  odometerBtn: {
    backgroundColor: 'rgba(0, 242, 254, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00f2fe'
  },
  odometerBtnText: {
    color: '#00f2fe',
    fontSize: 11,
    fontWeight: '700'
  },
  chainStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8
  },
  chainDot: {
    width: 8,
    height: 8,
    borderRadius: 4
  },
  chainDotGreen: {
    backgroundColor: '#38ef7d'
  },
  chainDotRed: {
    backgroundColor: '#ff2a5f'
  },
  chainStatusText: {
    color: '#94a3b8',
    fontSize: 11
  },
  sectionHeader: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#0c121d',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  metricLabel: {
    color: '#94a3b8',
    fontSize: 11
  },
  metricPrimary: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 4
  },
  metricSecondary: {
    color: '#ffb703',
    fontSize: 10,
    fontWeight: '600'
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#00f2fe',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6
  },
  actionBtnSecondary: {
    backgroundColor: '#161f30',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.3)'
  },
  actionEmoji: {
    fontSize: 16
  },
  actionBtnText: {
    color: '#070a0f',
    fontWeight: '800',
    fontSize: 12
  },
  timelineTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  timelineCount: {
    color: '#64748b',
    fontSize: 11
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: '#0c121d',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'flex-start'
  },
  timelineAlert: {
    borderColor: 'rgba(255, 183, 3, 0.3)'
  },
  timelineDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#38ef7d',
    marginTop: 4,
    marginRight: 10
  },
  timelineDotAmber: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffb703',
    marginTop: 4,
    marginRight: 10
  },
  timelineContent: {
    flex: 1
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  timelineTitle: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '700'
  },
  timelineBadgeAmber: {
    color: '#ffb703',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(255, 183, 3, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  timelineDate: {
    color: '#64748b',
    fontSize: 10
  },
  timelineDesc: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 15
  },
  certCard: {
    backgroundColor: 'rgba(0, 242, 254, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.25)',
    borderRadius: 14,
    padding: 16,
    marginTop: 10
  },
  certTitle: {
    color: '#00f2fe',
    fontSize: 14,
    fontWeight: '800'
  },
  lockBadge: {
    backgroundColor: '#ffb703',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  lockBadgeText: {
    color: '#070a0f',
    fontWeight: '900',
    fontSize: 9
  },
  certDesc: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 16,
    marginVertical: 6
  },
  certCta: {
    color: '#ffb703',
    fontWeight: '700',
    fontSize: 12
  },

  // ESTILOS DE MODALES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#0c121d',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 242, 254, 0.3)'
  },
  modalTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4
  },
  modalSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 16
  },
  inputLabel: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4
  },
  input: {
    backgroundColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    color: '#f8fafc',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  errorBox: {
    backgroundColor: 'rgba(255, 42, 95, 0.15)',
    borderWidth: 1,
    borderColor: '#ff2a5f',
    borderRadius: 8,
    padding: 10,
    marginTop: 12
  },
  errorText: {
    color: '#ff2a5f',
    fontSize: 11,
    lineHeight: 15
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20
  },
  modalCancelBtn: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    marginTop: 8
  },
  modalCancelBtnText: {
    color: '#94a3b8',
    fontWeight: '700'
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#00f2fe',
    alignItems: 'center'
  },
  modalConfirmBtnText: {
    color: '#070a0f',
    fontWeight: '800'
  },
  exportPdfBtn: {
    backgroundColor: '#ffb703',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6
  },
  exportPdfBtnText: {
    color: '#070a0f',
    fontWeight: '900',
    fontSize: 13
  },
  certBlockItem: {
    backgroundColor: '#161f30',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#38ef7d'
  },
  certBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2
  },
  certBlockIndex: {
    color: '#38ef7d',
    fontWeight: '800',
    fontSize: 12
  },
  certBlockKm: {
    color: '#f8fafc',
    fontWeight: '800',
    fontSize: 12
  },
  certBlockDate: {
    color: '#64748b',
    fontSize: 10,
    marginBottom: 4
  },
  certBlockHash: {
    color: '#00f2fe',
    fontFamily: 'monospace',
    fontSize: 10
  },
  certBlockPrevHash: {
    color: '#94a3b8',
    fontFamily: 'monospace',
    fontSize: 9
  },

  // ESTILOS PAGO BIMONETARIO
  payTabRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14
  },
  payTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#161f30',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  payTabActive: {
    backgroundColor: 'rgba(0, 242, 254, 0.15)',
    borderColor: '#00f2fe'
  },
  payTabText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700'
  },
  payTabTextActive: {
    color: '#00f2fe'
  },
  payInfoBox: {
    backgroundColor: 'rgba(0, 242, 254, 0.05)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#00f2fe'
  },
  payInfoTitle: {
    color: '#00f2fe',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4
  },
  payInfoText: {
    color: '#e2e8f0',
    fontSize: 11,
    lineHeight: 16
  },
  binanceBox: {
    backgroundColor: 'rgba(255, 183, 3, 0.05)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 183, 3, 0.3)',
    marginVertical: 10
  },
  binanceTitle: {
    color: '#ffb703',
    fontSize: 16,
    fontWeight: '800'
  },
  binanceDesc: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
    marginVertical: 6
  },
  binanceAmount: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 6
  },
  binanceHint: {
    color: '#38ef7d',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4
  },
  paySubmitBtn: {
    backgroundColor: '#38ef7d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
  },
  paySubmitBtnText: {
    color: '#070a0f',
    fontWeight: '900',
    fontSize: 13
  }
});
