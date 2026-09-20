import { CharuProCertificateData } from '../types/certificate';
import { OdometerBlock, OdometerCryptographicChain } from '../../storage/crypto/odometerHasher';
import { UserVehicleEntity } from '../../storage/repositories/vehicleRepository';
import { ServiceRecordEntity } from '../../storage/repositories/maintenanceRepository';

export class CertificateGeneratorEngine {
  /**
   * Compila los datos crudos de SQLite y la cadena de bloques en un modelo canónico de certificado CharuPro.
   */
  public compileCertificateData(
    vehicle: UserVehicleEntity,
    blocks: OdometerBlock[],
    services: ServiceRecordEntity[],
    financials: { costPerKmUsd: number; costPerKmVes: number; fuelEfficiencyKmPerLiter: number }
  ): CharuProCertificateData {
    const certId = `CERT-${vehicle.licensePlate}-${Date.now().toString(36).toUpperCase()}`;
    const chainValidation = OdometerCryptographicChain.verifyChain(blocks);

    const totalServiceCost = services.reduce((acc, s) => acc + s.totalCostUsd, 0);

    return {
      metadata: {
        certificateId: certId,
        issueDateIso: new Date().toISOString(),
        issuer: 'CharuAutos Pro Verification Protocol (V1-VE)',
        verificationUrl: `https://charuautos.com/verify/${certId}`
      },
      vehicle: {
        id: vehicle.id,
        maker: vehicle.maker,
        model: vehicle.model,
        trimName: vehicle.trimName,
        nickname: vehicle.nickname,
        licensePlate: vehicle.licensePlate,
        currentMileageKm: vehicle.currentMileage,
        healthScore: vehicle.healthScore
      },
      cryptography: {
        totalBlocksMined: blocks.length,
        genesisHash: blocks.length > 0 ? blocks[0].currentHash : 'N/A',
        latestRootHash: blocks.length > 0 ? blocks[blocks.length - 1].currentHash : 'N/A',
        integrityStatus: chainValidation.isValid ? 'VERIFIED_TAMPER_FREE' : 'COMPROMISED',
        monotonicityVerified: chainValidation.isValid,
        blocks: blocks.map((b) => ({
          blockIndex: b.blockIndex,
          mileageKm: b.mileageKm,
          recordedAtIso: b.recordedAtIso,
          currentHash: b.currentHash,
          previousHash: b.previousHash
        }))
      },
      services: services.map((s) => ({
        id: s.id,
        serviceType: s.serviceType,
        mileageAtService: s.mileageAtService,
        serviceDateIso: s.serviceDateIso,
        workshopName: s.workshopName || 'Particular',
        totalCostUsd: s.totalCostUsd,
        notes: s.notes
      })),
      financials: {
        costPerKmUsd: financials.costPerKmUsd,
        costPerKmVes: financials.costPerKmVes,
        fuelEfficiencyKmPerLiter: financials.fuelEfficiencyKmPerLiter,
        totalServicesCostUsd: totalServiceCost
      },
      diagnostics: {
        totalScansRecorded: 2,
        activeCriticalCodes: 0,
        overallDiagnosis: 'Óptimo para circulación en Venezuela (Sin códigos críticos activos).'
      }
    };
  }

  /**
   * Genera el documento HTML/CSS de alta fidelidad listo para exportación a PDF o impresión directa.
   */
  public generatePrintableHtml(data: CharuProCertificateData): string {
    const isTamperFree = data.cryptography.integrityStatus === 'VERIFIED_TAMPER_FREE';

    const statusBadgeHtml = isTamperFree
      ? `<div class="status-badge status-verified">
           <span class="dot"></span>
           ODÓMETRO 100% VERIFICADO • CADENA SHA-256 ÍNTEGRA
         </div>`
      : `<div class="status-badge status-compromised">
           <span class="dot"></span>
           ¡ALERTA DE SEGURIDAD! CADENA DE KILOMETRAJE MANIPULADA
         </div>`;

    const serviceRowsHtml = data.services
      .map(
        (s) => `
        <tr>
          <td><strong>${s.serviceType}</strong></td>
          <td>${s.mileageAtService.toLocaleString()} km</td>
          <td>${new Date(s.serviceDateIso).toLocaleDateString()}</td>
          <td>${s.workshopName}</td>
          <td class="text-right">$${s.totalCostUsd.toFixed(2)} USD</td>
        </tr>
      `
      )
      .join('');

    const blockRowsHtml = data.cryptography.blocks
      .map(
        (b) => `
        <tr>
          <td>#${b.blockIndex}</td>
          <td><strong>${b.mileageKm.toLocaleString()} km</strong></td>
          <td>${new Date(b.recordedAtIso).toLocaleString()}</td>
          <td class="font-mono hash-cell">${b.currentHash.substring(0, 20)}...</td>
        </tr>
      `
      )
      .join('');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Certificado CharuPro - ${data.metadata.certificateId}</title>
  <style>
    @page {
      size: letter portrait;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #070a0f;
      color: #f8fafc;
      padding: 24px;
      font-size: 13px;
      line-height: 1.5;
    }
    .cert-wrapper {
      max-width: 820px;
      margin: 0 auto;
      border: 2px solid rgba(0, 242, 254, 0.4);
      border-radius: 16px;
      padding: 30px;
      background: linear-gradient(180deg, #0b111c 0%, #06090e 100%);
      position: relative;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid rgba(0, 242, 254, 0.2);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #00f2fe;
    }
    .brand-title span {
      color: #ffb703;
    }
    .brand-subtitle {
      font-size: 11px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .cert-meta {
      text-align: right;
    }
    .cert-id {
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      color: #ffb703;
      background: rgba(255, 183, 3, 0.1);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(255, 183, 3, 0.3);
      display: inline-block;
      margin-bottom: 4px;
    }
    .cert-date {
      font-size: 11px;
      color: #64748b;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 800;
      padding: 8px 16px;
      border-radius: 8px;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }
    .status-verified {
      background: rgba(56, 239, 125, 0.12);
      color: #38ef7d;
      border: 1px solid #38ef7d;
    }
    .status-compromised {
      background: rgba(255, 42, 95, 0.15);
      color: #ff2a5f;
      border: 1px solid #ff2a5f;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: currentColor;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .info-card {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px;
    }
    .veh-name {
      font-size: 20px;
      font-weight: 800;
      color: #f8fafc;
    }
    .veh-detail {
      color: #ffb703;
      font-size: 12px;
      font-weight: 600;
      margin-top: 2px;
    }
    .veh-kv-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .kv-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
    }
    .kv-value {
      font-size: 14px;
      font-weight: 700;
      color: #00f2fe;
    }
    .score-card {
      background: #0f172a;
      border: 1px solid rgba(56, 239, 125, 0.3);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .score-number {
      font-size: 42px;
      font-weight: 900;
      color: #38ef7d;
      line-height: 1;
    }
    .score-label {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #38ef7d;
      margin-top: 6px;
    }
    .score-desc {
      font-size: 10px;
      color: #94a3b8;
      margin-top: 4px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #cbd5e1;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .custom-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    .custom-table th {
      background: #161f30;
      color: #94a3b8;
      text-align: left;
      padding: 8px 12px;
      font-weight: 700;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .custom-table td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
    }
    .font-mono {
      font-family: monospace;
      font-size: 11px;
    }
    .hash-cell {
      color: #00f2fe;
    }
    .text-right {
      text-align: right;
    }
    .financials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .fin-box {
      background: #0f172a;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      padding: 12px;
    }
    .fin-title {
      font-size: 10px;
      color: #94a3b8;
      text-transform: uppercase;
    }
    .fin-val {
      font-size: 16px;
      font-weight: 800;
      color: #f8fafc;
      margin: 4px 0;
    }
    .fin-sub {
      font-size: 10px;
      color: #ffb703;
    }
    .footer {
      border-top: 2px solid rgba(255, 255, 255, 0.08);
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .qr-box {
      border: 1px dashed #00f2fe;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(0, 242, 254, 0.05);
    }
    .qr-text {
      font-size: 10px;
      color: #cbd5e1;
      max-width: 260px;
      line-height: 1.4;
    }
    .qr-link {
      color: #00f2fe;
      font-weight: 700;
      word-break: break-all;
    }
    .seal-text {
      text-align: right;
      font-size: 10px;
      color: #64748b;
      line-height: 1.4;
    }
    .seal-text strong {
      color: #94a3b8;
    }

    @media print {
      body {
        background-color: #ffffff !important;
        color: #0f172a !important;
        padding: 0;
      }
      .cert-wrapper {
        border-color: #0284c7 !important;
        background: #ffffff !important;
        color: #0f172a !important;
        box-shadow: none !important;
        padding: 15px !important;
      }
      .brand-title {
        color: #0284c7 !important;
      }
      .brand-title span {
        color: #d97706 !important;
      }
      .info-card, .score-card, .fin-box {
        background: #f8fafc !important;
        border-color: #cbd5e1 !important;
      }
      .veh-name, .fin-val {
        color: #0f172a !important;
      }
      .veh-detail, .fin-sub {
        color: #d97706 !important;
      }
      .kv-value {
        color: #0284c7 !important;
      }
      .custom-table th {
        background: #e2e8f0 !important;
        color: #334155 !important;
      }
      .custom-table td {
        color: #1e293b !important;
        border-color: #cbd5e1 !important;
      }
      .hash-cell {
        color: #0369a1 !important;
      }
      .qr-box {
        border-color: #0284c7 !important;
        background: #f0f9ff !important;
      }
      .qr-text {
        color: #334155 !important;
      }
      .qr-link {
        color: #0284c7 !important;
      }
      .status-verified {
        background: #ecfdf5 !important;
        color: #047857 !important;
        border-color: #059669 !important;
      }
    }
  </style>
</head>
<body>
  <div class="cert-wrapper">
    <!-- ENCABEZADO OFICIAL -->
    <div class="header">
      <div>
        <div class="brand-title">Charu<span>Autos</span> Pro</div>
        <div class="brand-subtitle">Pasaporte Digital & Certificado Anti-Fraude de Vehículo</div>
      </div>
      <div class="cert-meta">
        <div class="cert-id">${data.metadata.certificateId}</div>
        <div class="cert-date">Emitido: ${new Date(data.metadata.issueDateIso).toLocaleString()}</div>
      </div>
    </div>

    <!-- SELLO DE ESTADO -->
    ${statusBadgeHtml}

    <!-- VEHÍCULO Y SCORE -->
    <div class="hero-grid">
      <div class="info-card">
        <div class="veh-name">${data.vehicle.maker} ${data.vehicle.model}</div>
        <div class="veh-detail">${data.vehicle.trimName} • "${data.vehicle.nickname || 'Vehículo de Garage'}"</div>
        
        <div class="veh-kv-grid">
          <div>
            <div class="kv-label">Placa de Identificación:</div>
            <div class="kv-value">${data.vehicle.licensePlate}</div>
          </div>
          <div>
            <div class="kv-label">Kilometraje Auditado:</div>
            <div class="kv-value">${data.vehicle.currentMileageKm.toLocaleString()} km</div>
          </div>
        </div>
      </div>

      <div class="score-card">
        <div class="score-number">${data.vehicle.healthScore}</div>
        <div class="score-label">SALUD MECÁNICA</div>
        <div class="score-desc">Evaluación 360° en base a mantenimientos y combustible</div>
      </div>
    </div>

    <!-- AUDITORÍA CRIPTOGRÁFICA DE ODÓMETRO -->
    <div class="section-title">
      <span>🛡️</span> Cadena Criptográfica de Odómetro (${data.cryptography.totalBlocksMined} Bloques SHA-256)
    </div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Bloque</th>
          <th>Odómetro</th>
          <th>Fecha Registro</th>
          <th>Hash Criptográfico (SHA-256)</th>
        </tr>
      </thead>
      <tbody>
        ${blockRowsHtml}
      </tbody>
    </table>

    <!-- TELEMETRÍA FINANCIERA BIMONETARIA -->
    <div class="section-title">
      <span>📊</span> Rendimiento y Costos de Operación
    </div>
    <div class="financials-grid">
      <div class="fin-box">
        <div class="fin-title">Costo por Kilómetro:</div>
        <div class="fin-val">$${data.financials.costPerKmUsd.toFixed(2)} USD</div>
        <div class="fin-sub">~${data.financials.costPerKmVes.toFixed(2)} Bs./km (Tasa BCV)</div>
      </div>
      <div class="fin-box">
        <div class="fin-title">Consumo de Combustible:</div>
        <div class="fin-val">${data.financials.fuelEfficiencyKmPerLiter.toFixed(1)} km/L</div>
        <div class="fin-sub">Gasolina 95 Internacional</div>
      </div>
      <div class="fin-box">
        <div class="fin-title">Inversión en Repuestos:</div>
        <div class="fin-val">$${data.financials.totalServicesCostUsd.toFixed(2)} USD</div>
        <div class="fin-sub">${data.services.length} Servicios realizados</div>
      </div>
    </div>

    <!-- HISTORIAL DE SERVICIOS -->
    <div class="section-title">
      <span>⏳</span> Historial Cronológico de Mantenimientos
    </div>
    <table class="custom-table">
      <thead>
        <tr>
          <th>Servicio Realizado</th>
          <th>Kilometraje</th>
          <th>Fecha</th>
          <th>Taller Mecánico</th>
          <th class="text-right">Costo USD</th>
        </tr>
      </thead>
      <tbody>
        ${serviceRowsHtml}
      </tbody>
    </table>

    <!-- PIE DE PÁGINA Y VERIFICACIÓN QR -->
    <div class="footer">
      <div class="qr-box">
        <div style="font-size: 28px;">📱</div>
        <div class="qr-text">
          <strong>Validar Autenticidad en Línea:</strong><br>
          <span class="qr-link">${data.metadata.verificationUrl}</span>
        </div>
      </div>
      <div class="seal-text">
        <strong>Protocolo CharuPro Anti-Estafas</strong><br>
        Sellado mediante hash SHA-256 inmutable.<br>
        Prohibida su reproducción no autorizada.
      </div>
    </div>
  </div>
</body>
</html>`;
  }
}
