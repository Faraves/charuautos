# -*- coding: utf-8 -*-
"""
Generador y Validador del Certificado Criptográfico CharuPro en PDF / HTML Imprimible
Produce un certificado de muestra en 'app/public/certificado_charupro_muestra.html'
con sello hash SHA-256 inmutable, trazabilidad de odómetro y telemetría bimonetaria.
"""

import sys
import os
import hashlib
from datetime import datetime

# Forzar salida en UTF-8 para consola de Windows
sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")
OUTPUT_HTML = os.path.join(OUTPUT_DIR, "certificado_charupro_muestra.html")

def compute_sha256(data: str) -> str:
    return hashlib.sha256(data.encode('utf-8')).hexdigest()

def main():
    print("================================================================================")
    print("📜 GENERADOR DE CERTIFICADOS CRIPTOGRÁFICOS CHARUPRO (VENEZUELA)")
    print("================================================================================")

    # 1. Datos del Vehículo
    vehicle = {
        "id": "veh_corolla_2011_01",
        "maker": "Toyota",
        "model": "Corolla",
        "trim": "GLi 1.8L Automático ('Pantallita')",
        "nickname": "El Gladiador",
        "license_plate": "AB123CD",
        "current_km": 150000,
        "health_score": 92
    }

    # 2. Cadena de Bloques de Odómetro
    genesis_prev = "0" * 64
    d0 = "2026-01-10T10:00:00Z"
    h0 = compute_sha256(f"0|{vehicle['id']}|148500|{d0}|{genesis_prev}")

    d1 = "2026-02-15T14:30:00Z"
    h1 = compute_sha256(f"1|{vehicle['id']}|149200|{d1}|{h0}")

    d2 = "2026-03-20T18:00:00Z"
    h2 = compute_sha256(f"2|{vehicle['id']}|150000|{d2}|{h1}")

    blocks = [
        {"idx": 0, "km": 148500, "date": d0, "prev": genesis_prev, "hash": h0},
        {"idx": 1, "km": 149200, "date": d1, "prev": h0, "hash": h1},
        {"idx": 2, "km": 150000, "date": d2, "prev": h1, "hash": h2}
    ]

    # Validar cadena
    valid = True
    prev = genesis_prev
    for b in blocks:
        expected = compute_sha256(f"{b['idx']}|{vehicle['id']}|{b['km']}|{b['date']}|{b['prev']}")
        if b['prev'] != prev or b['hash'] != expected:
            valid = False
            break
        prev = b['hash']

    print(f"1️⃣ Integridad Criptográfica: {'✓ VÁLIDA (100% INMUTABLE)' if valid else '✗ COMPROMETIDA'}")
    print(f"   Root Hash Actual (Bloque #2): {h2}")

    # 3. Servicios Registrados
    services = [
        {"type": "Pastillas de Freno Delanteras Cerámicas", "km": 145200, "date": "2026-01-15", "workshop": "Frenos Los Ruices", "cost": 50.0},
        {"type": "Limpieza de Inyectores & Filtro Gasolina", "km": 140000, "date": "2025-11-20", "workshop": "AutoServicios Bello Monte", "cost": 30.0},
        {"type": "Cambio de Aceite 5W-30 Sintético & Filtro", "km": 135000, "date": "2025-08-10", "workshop": "Taller Particular", "cost": 45.0}
    ]

    # 4. Telemetría Financiera
    cost_per_km_usd = 0.040
    bcv_rate = 36.50
    cost_per_km_ves = cost_per_km_usd * bcv_rate
    fuel_efficiency = 12.44
    total_services_cost = sum(s["cost"] for s in services)

    cert_id = f"CHARUPRO-{vehicle['license_plate']}-20260320"
    issue_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    # 5. Generar HTML Imprimible de Calidad Editorial
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    block_rows = "".join([f"""
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);">#{b['idx']}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 700; color: #f8fafc;">{b['km']:,} km</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8;">{b['date']}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-family: monospace; color: #00f2fe; font-size: 11px;">{b['hash'][:24]}...</td>
      </tr>
    """ for b in blocks])

    service_rows = "".join([f"""
      <tr>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 700; color: #f8fafc;">{s['type']}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #cbd5e1;">{s['km']:,} km</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8;">{s['date']}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #94a3b8;">{s['workshop']}</td>
        <td style="padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); text-align: right; color: #38ef7d; font-weight: 700;">${s['cost']:.2f} USD</td>
      </tr>
    """ for s in services])

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Certificado CharuPro - {cert_id}</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 12mm;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #070a0f;
      color: #f8fafc;
      padding: 24px;
      font-size: 12px;
      line-height: 1.5;
    }}
    .cert-card {{
      max-width: 820px;
      margin: 0 auto;
      border: 2px solid rgba(0, 242, 254, 0.4);
      border-radius: 16px;
      padding: 28px;
      background: linear-gradient(180deg, #0c121d 0%, #06090e 100%);
      box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    }}
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid rgba(0, 242, 254, 0.25);
      padding-bottom: 18px;
      margin-bottom: 20px;
    }}
    .brand-title {{
      font-size: 26px;
      font-weight: 900;
      color: #00f2fe;
      letter-spacing: -0.5px;
    }}
    .brand-title span {{ color: #ffb703; }}
    .brand-sub {{
      color: #94a3b8;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 3px;
    }}
    .cert-badge {{
      text-align: right;
    }}
    .cert-id-tag {{
      background: rgba(255, 183, 3, 0.15);
      border: 1px solid #ffb703;
      color: #ffb703;
      padding: 4px 10px;
      border-radius: 6px;
      font-family: monospace;
      font-weight: 800;
      display: inline-block;
      margin-bottom: 4px;
    }}
    .status-banner {{
      background: rgba(56, 239, 125, 0.12);
      border: 1px solid #38ef7d;
      color: #38ef7d;
      padding: 10px 16px;
      border-radius: 10px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 22px;
    }}
    .status-dot {{
      width: 10px;
      height: 10px;
      background: #38ef7d;
      border-radius: 50%;
    }}
    .grid-2 {{
      display: grid;
      grid-template-columns: 2.2fr 1fr;
      gap: 16px;
      margin-bottom: 22px;
    }}
    .box {{
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 16px;
    }}
    .veh-title {{
      font-size: 20px;
      font-weight: 800;
      color: #f8fafc;
    }}
    .veh-sub {{
      color: #ffb703;
      font-size: 12px;
      font-weight: 600;
      margin-top: 2px;
    }}
    .metric-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }}
    .m-lbl {{ font-size: 10px; color: #94a3b8; text-transform: uppercase; }}
    .m-val {{ font-size: 15px; font-weight: 800; color: #00f2fe; margin-top: 2px; }}
    .score-circle {{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(56, 239, 125, 0.08);
      border: 2px solid #38ef7d;
      border-radius: 12px;
      padding: 14px;
      text-align: center;
    }}
    .score-num {{ font-size: 40px; font-weight: 900; color: #38ef7d; line-height: 1; }}
    .score-lbl {{ font-size: 11px; font-weight: 800; color: #38ef7d; margin-top: 6px; letter-spacing: 1px; }}
    .table-title {{
      font-size: 13px;
      font-weight: 800;
      color: #e2e8f0;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 11px;
    }}
    th {{
      background: #1e293b;
      color: #94a3b8;
      text-align: left;
      padding: 8px 12px;
      font-weight: 700;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }}
    .fin-summary {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }}
    .fin-card {{
      background: #111827;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 12px;
    }}
    .footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 16px;
      margin-top: 10px;
    }}
    .qr-badge {{
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(0, 242, 254, 0.06);
      border: 1px dashed #00f2fe;
      border-radius: 8px;
      padding: 10px 14px;
    }}
    .qr-text {{ font-size: 10px; color: #cbd5e1; line-height: 1.4; }}
    .qr-url {{ color: #00f2fe; font-weight: 700; word-break: break-all; }}
    .legal-box {{ text-align: right; font-size: 9px; color: #64748b; line-height: 1.4; }}

    @media print {{
      body {{ background-color: #fff !important; color: #111827 !important; padding: 0 !important; }}
      .cert-card {{ border: 2px solid #0284c7 !important; background: #fff !important; color: #111827 !important; box-shadow: none !important; }}
      .brand-title {{ color: #0284c7 !important; }}
      .brand-title span {{ color: #d97706 !important; }}
      .box, .fin-card {{ background: #f8fafc !important; border-color: #cbd5e1 !important; }}
      .veh-title {{ color: #111827 !important; }}
      .m-val {{ color: #0284c7 !important; }}
      th {{ background: #e2e8f0 !important; color: #334155 !important; }}
      td {{ color: #1f2937 !important; border-bottom-color: #e5e7eb !important; }}
      .status-banner {{ background: #ecfdf5 !important; color: #047857 !important; border-color: #059669 !important; }}
      .status-dot {{ background: #047857 !important; }}
      .qr-badge {{ border-color: #0284c7 !important; background: #f0f9ff !important; }}
      .qr-text {{ color: #334155 !important; }}
      .qr-url {{ color: #0284c7 !important; }}
    }}
  </style>
</head>
<body>
  <div class="cert-card">
    <div class="header">
      <div>
        <div class="brand-title">Charu<span>Autos</span> Pro</div>
        <div class="brand-sub">Pasaporte Digital Criptográfico de Inspección</div>
      </div>
      <div class="cert-badge">
        <div class="cert-id-tag">{cert_id}</div>
        <div style="font-size: 10px; color: #64748b;">Emitido: {issue_date}</div>
      </div>
    </div>

    <div class="status-banner">
      <div class="status-dot"></div>
      <span>ODÓMETRO 100% AUDITADO • CADENA SHA-256 ÍNTEGRA (0 INTENTOS DE RETROCESO)</span>
    </div>

    <div class="grid-2">
      <div class="box">
        <div class="veh-title">{vehicle['maker']} {vehicle['model']}</div>
        <div class="veh-sub">{vehicle['trim']} • "{vehicle['nickname']}"</div>
        <div class="metric-grid">
          <div>
            <div class="m-lbl">Placa de Rodaje:</div>
            <div class="m-val">{vehicle['license_plate']}</div>
          </div>
          <div>
            <div class="m-lbl">Odómetro Auditado:</div>
            <div class="m-val">{vehicle['current_km']:,} km</div>
          </div>
        </div>
      </div>

      <div class="score-circle">
        <div class="score-num">{vehicle['health_score']}</div>
        <div class="score-lbl">SALUD TOTAL</div>
        <div style="font-size: 9px; color: #94a3b8; margin-top: 4px;">Score Preventivo y Físico</div>
      </div>
    </div>

    <div class="table-title">🛡️ Bloques de Trazabilidad Criptográfica de Kilometraje</div>
    <table>
      <thead>
        <tr>
          <th>Bloque</th>
          <th>Odómetro</th>
          <th>Fecha Sellado</th>
          <th>Hash Criptográfico SHA-256</th>
        </tr>
      </thead>
      <tbody>
        {block_rows}
      </tbody>
    </table>

    <div class="table-title">📊 Rendimiento Operativo y Financiero (Venezuela)</div>
    <div class="fin-summary">
      <div class="fin-card">
        <div class="m-lbl">Costo por Kilómetro</div>
        <div class="m-val">${cost_per_km_usd:.3f} USD</div>
        <div style="font-size: 10px; color: #ffb703;">~{cost_per_km_ves:.2f} Bs./km (BCV)</div>
      </div>
      <div class="fin-card">
        <div class="m-lbl">Consumo Promedio</div>
        <div class="m-val">{fuel_efficiency:.1f} km/L</div>
        <div style="font-size: 10px; color: #38ef7d;">~{fuel_efficiency * 48:.0f} km por tanque</div>
      </div>
      <div class="fin-card">
        <div class="m-lbl">Inversión en Talleres</div>
        <div class="m-val">${total_services_cost:.2f} USD</div>
        <div style="font-size: 10px; color: #94a3b8;">{len(services)} mantenimientos</div>
      </div>
    </div>

    <div class="table-title">⏳ Historial Cronológico de Servicios Técnicos</div>
    <table>
      <thead>
        <tr>
          <th>Mantenimiento</th>
          <th>Kilometraje</th>
          <th>Fecha</th>
          <th>Taller Mecánico</th>
          <th style="text-align: right;">Costo USD</th>
        </tr>
      </thead>
      <tbody>
        {service_rows}
      </tbody>
    </table>

    <div class="footer">
      <div class="qr-badge">
        <div style="font-size: 24px;">🛡️</div>
        <div class="qr-text">
          <strong>Validar Certificado en Línea:</strong><br>
          <span class="qr-url">https://charuautos.com/verify/{cert_id}</span>
        </div>
      </div>
      <div class="legal-box">
        <strong>Protocolo CharuPro Anti-Estafas</strong><br>
        Sellado criptográficamente mediante cadena SHA-256.<br>
        Garantiza la inmutabilidad del kilometraje e historial.
      </div>
    </div>
  </div>
</body>
</html>
"""

    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"2️⃣ Certificado generado exitosamente:")
    print(f"   Archivo: {OUTPUT_HTML}")
    print(f"   Tamaño: {len(html_content)} bytes")
    print(f"   Listo para exportación e impresión directa a PDF.")
    print("================================================================================")
    print("✅ MOTOR DE CERTIFICADOS CHARUPRO OPERATIVO")
    print("================================================================================")

if __name__ == '__main__':
    main()
