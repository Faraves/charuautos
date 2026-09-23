# -*- coding: utf-8 -*-
"""
Script to render all 20 cross-platform app mockups (Desktop Web App + Smartphone Mobile App)
using Microsoft Edge in headless mode.
"""
import os
import subprocess
import time
from PIL import Image

edge_path = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
output_dir = os.path.join(base_dir, 'exploraciones_rebranding')
temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp_render')

os.makedirs(temp_dir, exist_ok=True)
os.makedirs(output_dir, exist_ok=True)

PROPOSALS = [
    # 01
    {
        "id": "01",
        "key": "app_01_aero_light",
        "title": "Aero Light Studio • Paddock Day Clean",
        "font_family": "'Syncopate', sans-serif",
        "body_font": "'Instrument Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #090E17 0%, #152030 100%)",
        "glow_color": "rgba(2, 132, 199, 0.22)",
        "web_bg": "#F6F8FB",
        "web_surface": "#FFFFFF",
        "web_text": "#090D14",
        "text_muted": "#64748B",
        "accent_color": "#0284C7",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#E0F2FE",
        "inner_box_bg": "#F1F5F9",
        "border_color": "#E2E8F0",
        "window_bar_bg": "#0F172A",
        "mobile_bg": "#F6F8FB",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#090D14",
        "obd_color": "#059669",
        "obd_status": "SISTEMA NOMINAL // CERO FALLAS",
        "url_slug": "aero-light/dashboard",
        "nav_status": "TUNNEL Cd 0.28 ONLINE",
        "m1_label": "RECOMENDADOR PREDICTIVO",
        "m1_title": "Porsche 911 GT3 Touring (992)",
        "m1_desc": "4.0L Bóxer Atmosférico • 510 HP • Cd 0.28 Aero Lab • Coincidencia de perfil: 98.4% Match aerodinámico.",
        "s1_lbl": "0-100 KM/H", "s1_val": "3.4 s",
        "s2_lbl": "VEL. MÁX", "s2_val": "318 km/h",
        "s3_lbl": "MATCH IA", "s3_val": "98.4%",
        "m2_label": "DIAGNÓSTICO OBD-II",
        "m2_title": "CAN-Bus Telemetry Scanner",
        "m2_desc": "48 ECUs validadas sin fallas DTC almacenadas. Flujo MAF y presión barométrica en rango óptimo.",
        "m2_tech_line": "ISO 15765-4 CAN // PIDs Activos: 28 // Check Engine: OFF",
        "m3_label": "COMPARADOR TÉCNICO",
        "m3_title": "Matriz Aero Lab Lado a Lado",
        "m3_desc": "911 GT3 (510 HP, 1,418 kg, 2.78 kg/HP) vs Audi R8 V10 (570 HP, 1,595 kg, 2.80 kg/HP).",
        "m3_drop_text": "📁 Suelta aquí la ficha técnica PDF para extracción aerodinámica",
        "m4_label": "BITÁCORA DE RENDIMIENTO",
        "m4_title": "Consumo & Eficiencia Térmica",
        "m4_big_stat": "12.4 L",
        "m4_stat_sub": "Media cada 100 km",
        "m4_desc": "Costo por km: $1.85 USD • Próximo servicio programado en 4,200 km.",
        "m4_bar_pct": "78%",
        "mob_badge": "98.4% MATCH PREDICTIVO",
        "mob_car_title": "Porsche 911 GT3",
        "mob_car_sub": "4.0L Bóxer Atmosférico • 510 HP",
        "mob_s1": "0-100: 3.4s", "mob_s2": "Cd: 0.28", "mob_s3": "$210,000",
        "mob_obd_title": "0 Códigos DTC • Sistema Nominal",
        "mob_obd_desc": "Enlace BLE 5.0 activo con centralita Bosch.",
        "mob_m4_label": "CONSUMO EN VIAJE ACTUAL",
        "mob_m4_stat": "11.8 L/100km",
        "mob_m4_badge": "-8% vs Media",
        "mob_btn_text": "⚡ Iniciar Comparativa Rápida"
    },
    # 02
    {
        "id": "02",
        "key": "app_02_telemetry_dual",
        "title": "Telemetry Dual-State • FIA Timing Tower",
        "font_family": "'Rajdhani', sans-serif",
        "body_font": "'DM Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #05070B 0%, #0D1322 100%)",
        "glow_color": "rgba(37, 99, 235, 0.25)",
        "web_bg": "#0A0E17",
        "web_surface": "#111827",
        "web_text": "#F8FAFC",
        "text_muted": "#94A3B8",
        "accent_color": "#3B82F6",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "rgba(59, 130, 246, 0.15)",
        "inner_box_bg": "#0F172A",
        "border_color": "rgba(59, 130, 246, 0.3)",
        "window_bar_bg": "#05070B",
        "mobile_bg": "#0A0E17",
        "mobile_surface": "#111827",
        "mobile_text": "#F8FAFC",
        "obd_color": "#10B981",
        "obd_status": "TELEMETRÍA EN VIVO // SECTOR 1 PURPLE",
        "url_slug": "telemetry/timing-tower",
        "nav_status": "CAN-BUS 1Mbps • 24 PIDs LIVE",
        "m1_label": "PREDICTIVE MATCHING",
        "m1_title": "Ferrari 296 GTB Assetto Fiorano",
        "m1_desc": "V6 3.0L Twin-Turbo Híbrido • 830 HP • Coincidencia de telemetría de circuito: 99.1%.",
        "s1_lbl": "0-100 KM/H", "s1_val": "2.9 s",
        "s2_lbl": "TIEMPO VUELTA", "s2_val": "1:21.00",
        "s3_lbl": "MATCH RACING", "s3_val": "99.1%",
        "m2_label": "OBD-II LIVE STREAM",
        "m2_title": "ECU Powertrain Diagnostics",
        "m2_desc": "Monitoreo continuo de presión de turbo (2.1 bar) y temperatura de frenos carbocerámicos.",
        "m2_tech_line": "PID 0x010C: 8,500 RPM // BOOST: 2.1 BAR // DTC: P0000 (CLEAN)",
        "m3_label": "FICHAS TÉCNICAS COMPARADAS",
        "m3_title": "Matriz Dual Telemetría Ficha PDF",
        "m3_desc": "296 GTB (830 HP, 1,470 kg) vs McLaren 750S (750 HP, 1,389 kg). Discrepancia: +0.2 bar boost.",
        "m3_drop_text": "📥 Importar Telemetría CSV / Ficha Homologada PDF",
        "m4_label": "BITÁCORA DE BOXES",
        "m4_title": "Registro de Stints & Consumo",
        "m4_big_stat": "28.6 L",
        "m4_stat_sub": "Pista / 100 km",
        "m4_desc": "Vida útil neumáticos: 68% restante • Pastillas de freno: 82%.",
        "m4_bar_pct": "68%",
        "mob_badge": "TIMING TOWER ACTIVE",
        "mob_car_title": "Ferrari 296 GTB",
        "mob_car_sub": "V6 Twin-Turbo + E-Motor • 830 HP",
        "mob_s1": "0-100: 2.9s", "mob_s2": "Sector: -0.32s", "mob_s3": "99.1% MATCH",
        "mob_obd_title": "Fiorano Telemetry Online",
        "mob_obd_desc": "Transmisión de datos por Wi-Fi de Boxes a 100 Hz.",
        "mob_m4_label": "PRESIÓN NEUMÁTICOS STINT 3",
        "mob_m4_stat": "2.1 / 2.0 Bar",
        "mob_m4_badge": "ÓPTIMO",
        "mob_btn_text": "⏱️ Iniciar Telemetría de Vuelta"
    },
    # 03
    {
        "id": "03",
        "key": "app_03_monza_white",
        "title": "Monza Pure White & Speed Titanium",
        "font_family": "'Unbounded', sans-serif",
        "body_font": "'Sora', sans-serif",
        "studio_bg": "linear-gradient(135deg, #180505 0%, #2A0D0D 100%)",
        "glow_color": "rgba(220, 38, 38, 0.25)",
        "web_bg": "#FAFAFA",
        "web_surface": "#FFFFFF",
        "web_text": "#111827",
        "text_muted": "#6B7280",
        "accent_color": "#DC2626",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#FEE2E2",
        "inner_box_bg": "#F3F4F6",
        "border_color": "#E5E7EB",
        "window_bar_bg": "#1F2937",
        "mobile_bg": "#FAFAFA",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#111827",
        "obd_color": "#16A34A",
        "obd_status": "CENTRALITA MAGNETI MARELLI OK",
        "url_slug": "monza-racing/showroom",
        "nav_status": "SCUDERIA ONLINE",
        "m1_label": "SELEZIONE SPORTIVA",
        "m1_title": "Alfa Romeo Giulia GTAm",
        "m1_desc": "2.9L V6 Bi-Turbo Akrapovic • 540 HP • Alerón de fibra de carbono ajustable • 97.8% Match.",
        "s1_lbl": "0-100 KM/H", "s1_val": "3.6 s",
        "s2_lbl": "PESO SECO", "s2_val": "1,520 kg",
        "s3_lbl": "EMOCIÓN", "s3_val": "100%",
        "m2_label": "DIAGNOSTICA ELETTRONICA",
        "m2_title": "Scanner Centralina Motore",
        "m2_desc": "Doble intercooler sin caídas de presión. Sistema de inyección multipunto en calibración perfecta.",
        "m2_tech_line": "BOSCH MED17.3.5 // DTC: ASSENTI // PRESSIONE CARBURANTE: 200 BAR",
        "m3_label": "CONFRONTO SCHEDA TECNICA",
        "m3_title": "Comparazione Monoposto & GT",
        "m3_desc": "Giulia GTAm (540 HP) vs BMW M3 CS (550 HP). Relación peso/potencia: 2.81 vs 2.88 kg/HP.",
        "m3_drop_text": "🏁 Trascina qui il file PDF della scheda tecnica",
        "m4_label": "REGISTRO MANUTENZIONE",
        "m4_title": "Consumi & Tagliandi Ufficiali",
        "m4_big_stat": "13.8 L",
        "m4_stat_sub": "Misto / 100 km",
        "m4_desc": "Olio Motul 300V sostituito a 14.500 km • Prossimo controllo a 20.000 km.",
        "m4_bar_pct": "85%",
        "mob_badge": "EDIZIONE LIMITATA 500 PZ",
        "mob_car_title": "Giulia GTAm 2.9",
        "mob_car_sub": "V6 Bi-Turbo 540 HP Carbon",
        "mob_s1": "0-100: 3.6s", "mob_s2": "Akrapovic", "mob_s3": "€180k",
        "mob_obd_title": "Controllo Motore Superato",
        "mob_obd_desc": "Zero errori in memoria ECU. Pressione turbo al picco.",
        "mob_m4_label": "PROSSIMO TAGLIANDO",
        "mob_m4_stat": "5,500 km",
        "mob_m4_badge": "IN GARANZIA",
        "mob_btn_text": "🏎️ Configura Prova su Pista"
    },
    # 04
    {
        "id": "04",
        "key": "app_04_dyno_lab",
        "title": "Dyno Lab Pro • OBD Diagnostic & Dyno",
        "font_family": "'Chivo', sans-serif",
        "body_font": "'Space Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #0B0E14 0%, #151A24 100%)",
        "glow_color": "rgba(245, 158, 11, 0.25)",
        "web_bg": "#0F141C",
        "web_surface": "#17202D",
        "web_text": "#F8FAFC",
        "text_muted": "#94A3B8",
        "accent_color": "#F59E0B",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(245, 158, 11, 0.15)",
        "inner_box_bg": "#0A0D13",
        "border_color": "#283548",
        "window_bar_bg": "#090C12",
        "mobile_bg": "#0F141C",
        "mobile_surface": "#17202D",
        "mobile_text": "#F8FAFC",
        "obd_color": "#EF4444",
        "obd_status": "DTC P0301 DETECTADO // MISFIRE CIL. 1",
        "url_slug": "dynolab/bench-test",
        "nav_status": "DYNO LINK 4WD ACTIVE",
        "m1_label": "POWERTRAIN MATCH",
        "m1_title": "Audi RS3 2.5 TFSI Quattro (8Y)",
        "m1_desc": "5 Cilindros Turbo • 400 HP @ 7,000 RPM • 500 Nm • Potencia en banco: 418 WHP corregido.",
        "s1_lbl": "POTENCIA DYNO", "s1_val": "418 WHP",
        "s2_lbl": "TORQUE MAX", "s2_val": "524 Nm",
        "s3_lbl": "MATCH TÉCNICO", "s3_val": "96.7%",
        "m2_label": "OBD-II OSCILLOSCOPE",
        "m2_title": "Análisis de Inyección y Encendido",
        "m2_desc": "Falla de encendido en cilindro 1 detectada en carga plena (DTC P0301). Bobina sugerida.",
        "m2_tech_line": "FREEZE FRAME: RPM: 6,100 // LOAD: 94% // COOLANT: 91°C // DTC: P0301",
        "m3_label": "PDF SPEC EXTRACTION",
        "m3_title": "Extracción Automática de Curvas Dyno",
        "m3_desc": "Cotejo de curva oficial Audi Sport vs gráfico de banco Mustang 4x4. Delta detectado: +4.5%.",
        "m3_drop_text": "⚡ Ingesta de gráfica dyno o PDF de homologación técnica",
        "m4_label": "LOGBOOK DE BANCO",
        "m4_title": "Historial de Reprogramaciones",
        "m4_big_stat": "1.82 bar",
        "m4_stat_sub": "Presión Turbo Pico",
        "m4_desc": "Mapa Stage 1 validado con gasolina de 98 octanos sin detonación.",
        "m4_bar_pct": "91%",
        "mob_badge": "DYNO PASS 418 WHP",
        "mob_car_title": "Audi RS3 2.5T 8Y",
        "mob_car_sub": "5 Cilindros Turbo • 400 HP",
        "mob_s1": "WHP: 418", "mob_s2": "Nm: 524", "mob_s3": "STAGE 1",
        "mob_obd_title": "DTC P0301: Falla Cil. 1",
        "mob_obd_desc": "Reemplazo recomendado de bujía / bobina cilindro 1.",
        "mob_m4_label": "PRESIÓN COMBUSTIBLE RAIL",
        "mob_m4_stat": "220 Bar",
        "mob_m4_badge": "EN RANGO",
        "mob_btn_text": "🔧 Despejar Códigos DTC"
    },
    # 05
    {
        "id": "05",
        "key": "app_05_nordic_aero",
        "title": "Nordic Wind-Tunnel Cd • Pureza Escandinava",
        "font_family": "'Krona One', sans-serif",
        "body_font": "'Albert Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #0E1620 0%, #1A2636 100%)",
        "glow_color": "rgba(2, 132, 199, 0.2)",
        "web_bg": "#EEF2F6",
        "web_surface": "#FFFFFF",
        "web_text": "#131B26",
        "text_muted": "#5A6B7C",
        "accent_color": "#0284C7",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#E0F2FE",
        "inner_box_bg": "#F4F7FA",
        "border_color": "#D8E1E8",
        "window_bar_bg": "#131B26",
        "mobile_bg": "#EEF2F6",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#131B26",
        "obd_color": "#0D9488",
        "obd_status": "SEGURIDAD ACTIVA PILOT ASSIST NOMINAL",
        "url_slug": "nordic-aero/safety-lab",
        "nav_status": "WCAG AAA COMPLIANT",
        "m1_label": "VALORACIÓN ESCANDINAVA",
        "m1_title": "Polestar 4 Dual Motor Performance",
        "m1_desc": "544 HP • Cd 0.269 • Arquitectura SEA • Coincidencia de perfil sostenible y seguridad: 98.9%.",
        "s1_lbl": "0-100 KM/H", "s1_val": "3.8 s",
        "s2_lbl": "COEF. Cd", "s2_val": "0.269",
        "s3_lbl": "SEGURIDAD", "s3_val": "5★ EuroNCAP",
        "m2_label": "SISTEMAS ADAS & OBD",
        "m2_title": "Diagnóstico LiDAR y Cámaras Perimétricas",
        "m2_desc": "Calibración milimétrica de sensores de radar 77GHz y módulos de frenada activa.",
        "m2_tech_line": "NORDIC SAFETY BUS // ZERO DTC // BATERÍA SOH: 99.2% // TEMP: 22°C",
        "m3_label": "COMPARADOR AERODINÁMICO",
        "m3_title": "Matriz Cd y Eficiencia Energética",
        "m3_desc": "Polestar 4 (Cd 0.269, 18.2 kWh/100km) vs Porsche Macan EV (Cd 0.250, 19.1 kWh/100km).",
        "m3_drop_text": "🍃 Desliza aquí la ficha técnica del fabricante para auditoría",
        "m4_label": "HUELLA Y CONSUMO",
        "m4_title": "Eficiencia Eléctrica Real",
        "m4_big_stat": "18.4",
        "m4_stat_sub": "kWh / 100 km",
        "m4_desc": "Emisiones de ciclo de vida: 19.4 t CO2e • Autonomía restante: 530 km.",
        "m4_bar_pct": "88%",
        "mob_badge": "5★ SEGURIDAD EURONCAP",
        "mob_car_title": "Polestar 4 Dual",
        "mob_car_sub": "544 HP • Tracción Total Eléctrica",
        "mob_s1": "0-100: 3.8s", "mob_s2": "Cd: 0.269", "mob_s3": "530 km",
        "mob_obd_title": "Sensores ADAS Verificados",
        "mob_obd_desc": "Sin alertas en cámaras ni radares perimétricos.",
        "mob_m4_label": "CONSUMO MEDIO ÚLTIMOS 1,000 KM",
        "mob_m4_stat": "18.2 kWh",
        "mob_m4_badge": "EFICIENTE",
        "mob_btn_text": "🛡️ Auditoría de Seguridad"
    },
    # 06
    {
        "id": "06",
        "key": "app_06_silverstone_gt",
        "title": "Silverstone Paddock Club • Gran Turismo",
        "font_family": "'Bodoni Moda', serif",
        "body_font": "'Albert Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #060B08 0%, #101F15 100%)",
        "glow_color": "rgba(21, 128, 61, 0.25)",
        "web_bg": "#FBF9F5",
        "web_surface": "#FFFFFF",
        "web_text": "#1A1D1A",
        "text_muted": "#666F66",
        "accent_color": "#15803D",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#DCFCE7",
        "inner_box_bg": "#F4F1EA",
        "border_color": "#E2DDD3",
        "window_bar_bg": "#132117",
        "mobile_bg": "#FBF9F5",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#1A1D1A",
        "obd_color": "#15803D",
        "obd_status": "CERTIFICADO DE CONCURSO // ESTADO IMPECABLE",
        "url_slug": "silverstone/paddock-atelier",
        "nav_status": "HERITAGE CLUB MEMBER",
        "m1_label": "COMMISSION SELECTION",
        "m1_title": "Aston Martin DB12 Super Tourer",
        "m1_desc": "4.0L V8 Twin-Turbo Handcrafted • 680 HP • Cuero Bridge of Weir cosido a mano • 97.4% Match.",
        "s1_lbl": "0-100 KM/H", "s1_val": "3.6 s",
        "s2_lbl": "VEL. PUNTA", "s2_val": "325 km/h",
        "s3_lbl": "DISTINCIÓN", "s3_val": "99/100",
        "m2_label": "DIAGNÓSTICO HOMOLOGADO",
        "m2_title": "Inspección Pericial de Fábrica",
        "m2_desc": "Cero tolerancias mecánicas. Compresión de cilindros simétrica al 99.4% en los 8 bancos.",
        "m2_tech_line": "GAYDON QC PASS // ZERO FAULTS // VALVETRAIN TIMING: NOMINAL",
        "m3_label": "COMPARADOR EDITORIAL",
        "m3_title": "Matriz Gran Turismo Británico vs Continental",
        "m3_desc": "Aston Martin DB12 (680 HP, 800 Nm) vs Bentley Continental GT V8 (550 HP, 770 Nm).",
        "m3_drop_text": "📜 Inserte aquí el certificado de origen o dossier de fábrica",
        "m4_label": "CUADERNO DE MANTENIMIENTO",
        "m4_title": "Historial de Servicio Oficial",
        "m4_big_stat": "14.2 L",
        "m4_stat_sub": "Crucero / 100 km",
        "m4_desc": "Servicio de rodaje completado en Gaydon Heritage • Garantía Timeless activa.",
        "m4_bar_pct": "92%",
        "mob_badge": "CERTIFICADO VIP GOODWOOD",
        "mob_car_title": "Aston Martin DB12",
        "mob_car_sub": "Handbuilt V8 Twin-Turbo 680 HP",
        "mob_s1": "0-100: 3.6s", "mob_s2": "800 Nm", "mob_s3": "£185,000",
        "mob_obd_title": "Inspección Pericial Aprobada",
        "mob_obd_desc": "Homologación 100% oficial para salones de concurso.",
        "mob_m4_label": "KILOMETRAJE DOCUMENTADO",
        "mob_m4_stat": "6,420 km",
        "mob_m4_badge": "CERTIFICADO",
        "mob_btn_text": "🏆 Consultar Cuaderno de Origen"
    },
    # 07
    {
        "id": "07",
        "key": "app_07_hypercar_monocoque",
        "title": "Hypercar Monocoque • Cyber-Torque HUD",
        "font_family": "'Oxanium', sans-serif",
        "body_font": "'Sora', sans-serif",
        "studio_bg": "linear-gradient(135deg, #020408 0%, #07101C 100%)",
        "glow_color": "rgba(0, 240, 255, 0.25)",
        "web_bg": "#05080E",
        "web_surface": "#0E1420",
        "web_text": "#F0FDF4",
        "text_muted": "#7DD3FC",
        "accent_color": "#00F0FF",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(0, 240, 255, 0.12)",
        "inner_box_bg": "#080C14",
        "border_color": "rgba(0, 240, 255, 0.3)",
        "window_bar_bg": "#020408",
        "mobile_bg": "#05080E",
        "mobile_surface": "#0E1420",
        "mobile_text": "#F0FDF4",
        "obd_color": "#10E7A2",
        "obd_status": "INVERSORES SiC 800V // CERO DERIVACIONES",
        "url_slug": "hypercar/monocoque-telemetry",
        "nav_status": "NEURAL RELAY 10Gbps",
        "m1_label": "NEURAL TORQUE DISPATCH",
        "m1_title": "Rimac Nevera Time Attack Edition",
        "m1_desc": "4 Motores de Imán Permanente • 1,914 HP • 2,360 Nm • Vectorización de par por rueda a 100 Hz.",
        "s1_lbl": "0-100 KM/H", "s1_val": "1.81 s",
        "s2_lbl": "VEL. MÁX", "s2_val": "412 km/h",
        "s3_lbl": "TORQUE VECTOR", "s3_val": "100%",
        "m2_label": "CAN-BUS VOLTAGE AUDIT",
        "m2_title": "Diagnóstico Inversores y Batería 120 kWh",
        "m2_desc": "Delta térmico de celdas cilíndricas 21700 <1.5°C bajo aceleración de 1.8G continua.",
        "m2_tech_line": "BMS 800V OK // PACK RESISTANCE: 0.012 OHM // BUS DTC: NONE",
        "m3_label": "MONOCOQUE MATRIX",
        "m3_title": "Comparador de Rigidez Torsional",
        "m3_desc": "Rimac Nevera (70,000 Nm/grado, 1,914 HP) vs Bugatti Chiron Pur Sport (50,000 Nm/grado, 1,500 HP).",
        "m3_drop_text": "⚡ Ingesta de telemetría de bus CAN de alta velocidad o PDF CAD",
        "m4_label": "REGEN ENERGY LOG",
        "m4_title": "Regeneración de Energía Cinética",
        "m4_big_stat": "300 kW",
        "m4_stat_sub": "Frenado Regenerativo",
        "m4_desc": "Recuperación de energía en curva: +34% autonomía en circuito cerrado.",
        "m4_bar_pct": "95%",
        "mob_badge": "RECORD 0-400-0: 29.9s",
        "mob_car_title": "Rimac Nevera",
        "mob_car_sub": "Quad-Motor Electric • 1,914 HP",
        "mob_s1": "0-100: 1.81s", "mob_s2": "2,360 Nm", "mob_s3": "€2.4M",
        "mob_obd_title": "Batería 800V Nominal",
        "mob_obd_desc": "SOH 99.8% • Cero fallos de aislamiento HV.",
        "mob_m4_label": "POTENCIA DE CARGA PICO",
        "mob_m4_stat": "500 kW",
        "mob_m4_badge": "800V DC",
        "mob_btn_text": "⚡ Activar Modo Carrera"
    },
    # 08
    {
        "id": "08",
        "key": "app_08_baja_dakar",
        "title": "Baja Dakar Sandstorm • Overland Precision",
        "font_family": "'Epilogue', sans-serif",
        "body_font": "'Space Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #1C150D 0%, #2A1D11 100%)",
        "glow_color": "rgba(234, 88, 12, 0.25)",
        "web_bg": "#F7F4EC",
        "web_surface": "#FFFFFF",
        "web_text": "#1A1815",
        "text_muted": "#5C5549",
        "accent_color": "#EA580C",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#FFEDD5",
        "inner_box_bg": "#EDE6D8",
        "border_color": "#D4C5B0",
        "window_bar_bg": "#221A11",
        "mobile_bg": "#F7F4EC",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#1A1815",
        "obd_color": "#15803D",
        "obd_status": "FOX RACING 3.0 // TEMPERATURA 64°C",
        "url_slug": "baja-dakar/overland-hub",
        "nav_status": "DESERT GPS LOCK 12 SAT",
        "m1_label": "OVERLAND MATCH",
        "m1_title": "Ford F-150 Raptor R 5.2L V8",
        "m1_desc": "Supercharged V8 • 720 HP • 37\" Neumáticos BFGoodrich • Suspensión Fox Live Valve • 99.4% Match.",
        "s1_lbl": "DESPEJE", "s1_val": "333 mm",
        "s2_lbl": "RECORRIDO", "s2_val": "381 mm",
        "s3_lbl": "RESISTENCIA", "s3_val": "10/10",
        "m2_label": "OBD-II 4X4 SCANNER",
        "m2_title": "Sensores de Suspensión y Reductora",
        "m2_desc": "Presión de aceite de amortiguadores en rango óptimo tras 200 km de dunas sin atenuación.",
        "m2_tech_line": "TRANSFER CASE: 4L LOCKED // REAR DIFF: E-LOCKED // DTC: CLEAN",
        "m3_label": "COMPARADOR TROCHA",
        "m3_title": "Matriz Todoterreno Extrema",
        "m3_desc": "Raptor R (720 HP, 333mm despeje) vs Ram TRX (702 HP, 300mm despeje). Capacidad de vadeo: 810mm.",
        "m3_drop_text": "🏜️ Suelta ficha técnica de homologación 4x4 o pesaje",
        "m4_label": "BITÁCORA DE COMBUSTIBLE",
        "m4_title": "Consumo en Arena & Autonomía",
        "m4_big_stat": "22.5 L",
        "m4_stat_sub": "Trocha / 100 km",
        "m4_desc": "Doble tanque activo: 136 Litros • Autonomía en desierto: 604 km garantizados.",
        "m4_bar_pct": "74%",
        "mob_badge": "DAKAR READY RIG",
        "mob_car_title": "Raptor R 5.2 V8",
        "mob_car_sub": "Supercharged 720 HP • Fox 3.0",
        "mob_s1": "Despeje: 333mm", "mob_s2": "720 HP", "mob_s3": "4L Lock",
        "mob_obd_title": "Tracción 4x4 Nominal",
        "mob_obd_desc": "Bloqueos activos sin sobrecalentamiento.",
        "mob_m4_label": "NIVEL DE COMBUSTIBLE COMBINADO",
        "mob_m4_stat": "102 / 136 L",
        "mob_m4_badge": "75% TANQUE",
        "mob_btn_text": "🧭 Planificar Ruta Off-Road"
    },
    # 09
    {
        "id": "09",
        "key": "app_09_autonomous_ai",
        "title": "Autonomous AI • Neural HUD Vision",
        "font_family": "'Michroma', sans-serif",
        "body_font": "'Instrument Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #030612 0%, #0B132B 100%)",
        "glow_color": "rgba(79, 70, 229, 0.28)",
        "web_bg": "#050811",
        "web_surface": "#0C1222",
        "web_text": "#F8FAFC",
        "text_muted": "#818CF8",
        "accent_color": "#6366F1",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "rgba(99, 102, 241, 0.15)",
        "inner_box_bg": "#080D1A",
        "border_color": "rgba(99, 102, 241, 0.3)",
        "window_bar_bg": "#030612",
        "mobile_bg": "#050811",
        "mobile_surface": "#0C1222",
        "mobile_text": "#F8FAFC",
        "obd_color": "#059669",
        "obd_status": "RED NEURONAL AUDITADA // PREDICTIVO 0 FALLAS",
        "url_slug": "autonomous-ai/neural-pilot",
        "nav_status": "NEURAL ENGINE 2.4 PFLOPS",
        "m1_label": "AI BUYER RECOMMENDATION",
        "m1_title": "Mercedes-AMG EQS 53 4MATIC+ Hyperscreen",
        "m1_desc": "Doble Motor Eléctrico • 761 HP • 1,020 Nm • MBUX Hyperscreen 56\" • Algoritmo de decisión: 99.6%.",
        "s1_lbl": "TIEMPO DECISIÓN", "s1_val": "0.04 s",
        "s2_lbl": "TCO 5 AÑOS", "s2_val": "-34%",
        "s3_lbl": "AI SCORE", "s3_val": "99.6%",
        "m2_label": "NEURAL OBD-II PROGNOSIS",
        "m2_title": "Predicción de Mantenimiento Preventivo",
        "m2_desc": "Algoritmo estima 98.2% de vida útil en pastillas de freno y 0 degradación en inversor.",
        "m2_tech_line": "NEURAL PRED_MODEL_V4 // ACCURACY: 99.1% // ANOMALY_INDEX: 0.002",
        "m3_label": "AI SPEC PARSER",
        "m3_title": "Extracción e Inferencia de Discrepancias",
        "m3_desc": "EQS 53 (761 HP, batería 108.4 kWh) vs Lucid Air Sapphire (1,234 HP, batería 118 kWh).",
        "m3_drop_text": "🧠 Arrastra cualquier ficha PDF para escaneo de visión artificial OCR",
        "m4_label": "PREDICTIVE BATTERY HEALTH",
        "m4_title": "Degradación Molecular Proyectada",
        "m4_big_stat": "99.4%",
        "m4_stat_sub": "Salud de Batería SOH",
        "m4_desc": "Consumo medio por IA: 21.2 kWh/100km • Ahorro energético vs conductor humano: +14%.",
        "m4_bar_pct": "99%",
        "mob_badge": "CHARU BRAIN AI: 99.6%",
        "mob_car_title": "Mercedes-AMG EQS 53",
        "mob_car_sub": "761 HP • MBUX Hyperscreen",
        "mob_s1": "0-100: 3.4s", "mob_s2": "Hyperscreen", "mob_s3": "$147,500",
        "mob_obd_title": "Prognosis IA Impecable",
        "mob_obd_desc": "Cero fallas proyectadas en 25,000 km.",
        "mob_m4_label": "EFICIENCIA PREDICTIVA IA",
        "mob_m4_stat": "+14% Ahorro",
        "mob_m4_badge": "OPTIMIZADO",
        "mob_btn_text": "🤖 Ejecutar Recomendador IA"
    },
    # 10
    {
        "id": "10",
        "key": "app_10_nurburgring_apex",
        "title": "Nürburgring Apex • Sector Timing",
        "font_family": "'Unbounded', sans-serif",
        "body_font": "'Chivo', sans-serif",
        "studio_bg": "linear-gradient(135deg, #040905 0%, #0A170D 100%)",
        "glow_color": "rgba(34, 197, 94, 0.25)",
        "web_bg": "#070A08",
        "web_surface": "#0E1510",
        "web_text": "#F0FDF4",
        "text_muted": "#86EFAC",
        "accent_color": "#22C55E",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(34, 197, 94, 0.15)",
        "inner_box_bg": "#050906",
        "border_color": "rgba(34, 197, 94, 0.3)",
        "window_bar_bg": "#030604",
        "mobile_bg": "#070A08",
        "mobile_surface": "#0E1510",
        "mobile_text": "#F0FDF4",
        "obd_color": "#22C55E",
        "obd_status": "NORDSCHLEIFE: 6:49.328 // RECORD OFICIAL",
        "url_slug": "nurburgring/apex-timing",
        "nav_status": "20.832 KM LIVE SECTORS",
        "m1_label": "APEX MATCHING",
        "m1_title": "Porsche 911 GT3 RS (992) Weissach",
        "m1_desc": "4.0L Bóxer • 525 HP • Aerodinámica activa DRS • 860 kg de carga aerodinámica a 285 km/h.",
        "s1_lbl": "NORDSCHLEIFE", "s1_val": "6:49.32",
        "s2_lbl": "CARGA AERO", "s2_val": "860 kg",
        "s3_lbl": "MATCH PISTA", "s3_val": "99.8%",
        "m2_label": "OBD TELEMETRY APEX",
        "m2_title": "Sensores de Suspensión y Fuerza Lateral",
        "m2_desc": "Pico de 1.95G en Curva Schwedenkreuz. Presión y temperatura de neumáticos en ventana óptima.",
        "m2_tech_line": "SECTOR 1: 32.14s (PURPLE) // G-FORCE LAT: 1.95G // OIL TEMP: 104°C",
        "m3_label": "COMPARADOR RADAR DE 5 EJES",
        "m3_title": "Matriz Superdeportivos en Vuelta Lanzada",
        "m3_desc": "911 GT3 RS (6:49.32, 525 HP) vs Mercedes-AMG GT Black Series (6:48.04, 730 HP).",
        "m3_drop_text": "🏁 Ingesta de telemetría de vuelta AiM / MoTeC o ficha PDF",
        "m4_label": "CRONÓMETRO DE CONSUMIBLES",
        "m4_title": "Desgaste de Pastillas y Cup 2 R",
        "m4_big_stat": "3 Vueltas",
        "m4_stat_sub": "Vida Útil Neumáticos Pico",
        "m4_desc": "Coste por vuelta rápida en Nordschleife: $420 USD (gomas + frenos + 100 oct).",
        "m4_bar_pct": "62%",
        "mob_badge": "LAP RECORD 6:49.3",
        "mob_car_title": "911 GT3 RS 992",
        "mob_car_sub": "525 HP • DRS Activo Weissach",
        "mob_s1": "Lap: 6:49.3", "mob_s2": "Aero: 860kg", "mob_s3": "$285k",
        "mob_obd_title": "G-Force Lateral: 1.95G",
        "mob_obd_desc": "Temperatura frenos: 520°C (Nominal).",
        "mob_m4_label": "SECTOR 2 // BERGWERK",
        "mob_m4_stat": "284 km/h",
        "mob_m4_badge": "RECORD PURPLE",
        "mob_btn_text": "⏱️ Iniciar Vuelta Lanzada"
    },
    # 11
    {
        "id": "11",
        "key": "app_11_bat_auction",
        "title": "BaT Provenance & Live Auction • Auction Telemetry",
        "font_family": "'Bodoni Moda', serif",
        "body_font": "'Chivo Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #1C1908 0%, #2A240E 100%)",
        "glow_color": "rgba(234, 179, 8, 0.25)",
        "web_bg": "#F8F9FA",
        "web_surface": "#FFFFFF",
        "web_text": "#1A1A1A",
        "text_muted": "#4A5568",
        "accent_color": "#EAB308",
        "badge_text_color": "#000000",
        "tag_bg": "#FEF9C3",
        "inner_box_bg": "#F1F5F9",
        "border_color": "#E2E8F0",
        "window_bar_bg": "#1E293B",
        "mobile_bg": "#F8F9FA",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#1A1A1A",
        "obd_color": "#059669",
        "obd_status": "AUDITORÍA I/M READINESS APROBADA // SIN CÓDIGOS BORRADOS",
        "url_slug": "bat-auction/lot-74892",
        "nav_status": "LIVE AUCTION // 04:12 RESTANTES",
        "m1_label": "LOTE 74892 EN VIVO",
        "m1_title": "1997 Porsche 911 Turbo (993) 6-Speed",
        "m1_desc": "3.6L Twin-Turbo Refrigerado por Aire • 408 HP • Matching Numbers chasis y motor • 24,100 mi.",
        "s1_lbl": "PUJA ACTUAL", "s1_val": "$245,000",
        "s2_lbl": "PUJAS TOTAL", "s2_val": "42 Pujas",
        "s3_lbl": "TIEMPO", "s3_val": "04:12",
        "m2_label": "AUDITORÍA OBD-II ANTIFRAUDE",
        "m2_title": "Verificación de Ciclos de Conducción",
        "m2_desc": "Inspección de monitores I/M: 1,840 km recorridos desde el último reseteo. Cero códigos ocultos.",
        "m2_tech_line": "DRIVE_CYCLE_COMPLETION: 100% // P0000 CLEAN // VIN_MATCH: CONFIRMED",
        "m3_label": "SCATTERPLOT DE MERCADO",
        "m3_title": "Comparador de Remates Históricos 993 Turbo",
        "m3_desc": "Cotejo frente a 28 unidades subastadas en 36 meses. Rango estimado: $230,000 - $275,000.",
        "m3_drop_text": "📁 Ingesta de historial Carfax o Ficha Técnica de Registro",
        "m4_label": "TRAZABILIDAD FORENSE",
        "m4_title": "Historial de Facturas y Mantenimiento",
        "m4_big_stat": "48 Docs",
        "m4_stat_sub": "Facturas Verificadas",
        "m4_desc": "Servicio mayor completado por especialista oficial con cambio de turbinas K64.",
        "m4_bar_pct": "94%",
        "mob_badge": "MATCHING NUMBERS // BaT VERIFIED",
        "mob_car_title": "1997 911 Turbo 993",
        "mob_car_sub": "Refrigerado por Aire • 408 HP",
        "mob_s1": "Millas: 24,100", "mob_s2": "6-Speed", "mob_s3": "$245,000",
        "mob_obd_title": "Auditoría I/M Aprobada",
        "mob_obd_desc": "Cero códigos reseteados antes del remate.",
        "mob_m4_label": "PUJA MÁS RECIENTE",
        "mob_m4_stat": "$245,000",
        "mob_m4_badge": "+$5,000",
        "mob_btn_text": "🔨 Realizar Puja Oficial ($250k)"
    },
    # 12
    {
        "id": "12",
        "key": "app_12_singer_atelier",
        "title": "Singer Bespoke Atelier • Restomod Lookbook",
        "font_family": "'Bodoni Moda', serif",
        "body_font": "'Instrument Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #0E0E11 0%, #1A1612 100%)",
        "glow_color": "rgba(224, 169, 109, 0.22)",
        "web_bg": "#0E0E11",
        "web_surface": "#131317",
        "web_text": "#F5F5F7",
        "text_muted": "#8E8E93",
        "accent_color": "#E0A96D",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(224, 169, 109, 0.15)",
        "inner_box_bg": "#09090C",
        "border_color": "rgba(224, 169, 109, 0.25)",
        "window_bar_bg": "#070709",
        "mobile_bg": "#0E0E11",
        "mobile_surface": "#131317",
        "mobile_text": "#F5F5F7",
        "obd_color": "#48BB78",
        "obd_status": "MOTEC M130 CALIBRADA // LAMBDA 1.00 ESTEQUIOMÉTRICO",
        "url_slug": "singer-atelier/commission-084",
        "nav_status": "HANDCRAFTED IN CALIFORNIA",
        "m1_label": "COMMISSION LOOKBOOK",
        "m1_title": "The Mountain View Commission 4.0L",
        "m1_desc": "Chasis aligerado en fibra de carbono • Bóxer 4.0L Ed Pink Racing • 390 HP • Cuero Tabaco.",
        "s1_lbl": "PESO SECO", "s1_val": "1,080 kg",
        "s2_lbl": "POTENCIA", "s2_val": "390 HP @ 7.4k",
        "s3_lbl": "ACABADO", "s3_val": "Carbon Blue",
        "m2_label": "MOTEC M130 TELEMETRY",
        "m2_title": "Balanceo de Mariposas Individuales ITB",
        "m2_desc": "Sincronización milimétrica de las 6 mariposas de admisión con lectura independiente de vacío.",
        "m2_tech_line": "MOTEC M130 // DUAL WIDEBAND LAMBDA 0.98 // ITB SYNC: 100% // NO DTC",
        "m3_label": "DONOR CHASSIS VS BESPOKE",
        "m3_title": "Matriz Aligeramiento vs 964 Original",
        "m3_desc": "Singer Monocoque (1,080 kg, 390 HP, 2.76 kg/HP) vs 964 Carrera 2 (1,350 kg, 250 HP, 5.40 kg/HP).",
        "m3_drop_text": "🎨 Desliza especificación de materiales o certificado de artesano",
        "m4_label": "LIBRO MAESTRO ATELIER",
        "m4_title": "Horas de Fabricación Manual",
        "m4_big_stat": "4,200 h",
        "m4_stat_sub": "Construcción Artesanal",
        "m4_desc": "Ensamblaje del motor supervisado y firmado por Jefe de Ingeniería del Atelier.",
        "m4_bar_pct": "96%",
        "mob_badge": "COMMISSION N° 084",
        "mob_car_title": "Mountain View 4.0L",
        "mob_car_sub": "Singer Reimagined • 390 HP",
        "mob_s1": "1,080 kg", "mob_s2": "7,800 RPM", "mob_s3": "$1.2M",
        "mob_obd_title": "ITB Throttle Sync OK",
        "mob_obd_desc": "Mezcla estequiométrica en los 6 cilindros.",
        "mob_m4_label": "HORAS DE BANCO DE PRUEBAS",
        "mob_m4_stat": "80 Horas",
        "mob_m4_badge": "DYNO CERTIFIED",
        "mob_btn_text": "🧵 Personalizar Muestras de Cuero"
    },
    # 13
    {
        "id": "13",
        "key": "app_13_carwow_deals",
        "title": "Carwow Decision Engine • Buyer's Reverse-Auction",
        "font_family": "'Albert Sans', sans-serif",
        "body_font": "'DM Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #06112C 0%, #0F2256 100%)",
        "glow_color": "rgba(0, 82, 255, 0.22)",
        "web_bg": "#F4F6F9",
        "web_surface": "#FFFFFF",
        "web_text": "#111827",
        "text_muted": "#6B7280",
        "accent_color": "#0052FF",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#DBEAFE",
        "inner_box_bg": "#EFF6FF",
        "border_color": "#E2E8F0",
        "window_bar_bg": "#0F172A",
        "mobile_bg": "#F4F6F9",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#111827",
        "obd_color": "#00D66C",
        "obd_status": "INSPECCIÓN MECÁNICA 100% LIMPIA // 3 AÑOS GARANTÍA",
        "url_slug": "carwow-deals/compare-offers",
        "nav_status": "5 OFERTAS DE CONCESIONARIOS EN VIVO",
        "m1_label": "MEJOR OFERTA DE COMPRA",
        "m1_title": "Hyundai Ioniq 5 N AWD 650 HP",
        "m1_desc": "Eléctrico de alto rendimiento • 0-100 en 3.4s • Precio oficial: €78,000. Oferta negociada directa: €69,500.",
        "s1_lbl": "PVP OFICIAL", "s1_val": "€78,000",
        "s2_lbl": "PRECIO CARWOW", "s2_val": "€69,500",
        "s3_lbl": "AHORRO", "s3_val": "€8,500 NETO",
        "m2_label": "INSPECCIÓN TRANSPARENTE",
        "m2_title": "Salud Mecánica sin Letra Pequeña",
        "m2_desc": "Vehículo nuevo en stock oficial con verificación de batería, alineación y firmware más reciente.",
        "m2_tech_line": "CHECK: 100% OK // FABRICANTE: HYUNDAI OFICIAL // GARANTÍA: 5 AÑOS",
        "m3_label": "CALCULADORA DE FINANCIACIÓN",
        "m3_title": "Comparativa Contado vs Financiado PCP",
        "m3_desc": "Entrada: €10,000 • Cuota: €485/mes a 48 meses • Valor Mínimo Garantizado final: €38,000.",
        "m3_drop_text": "📄 Suelta la propuesta de tu concesionario local para mejorarla",
        "m4_label": "COSTE MENSUAL REAL",
        "m4_title": "Gasolina/Luz + Seguro + Mantenimiento",
        "m4_big_stat": "€82",
        "m4_stat_sub": "Recarga Mensual Estimada",
        "m4_desc": "Ahorro anual estimado frente a gasolina equivalente: €2,400 al año.",
        "m4_bar_pct": "84%",
        "mob_badge": "-€8,500 DESCUENTO",
        "mob_car_title": "Hyundai Ioniq 5 N",
        "mob_car_sub": "AWD 650 HP • Stock Inmediato",
        "mob_s1": "PVP: €78k", "mob_s2": "Oferta: €69.5k", "mob_s3": "-11% OFF",
        "mob_obd_title": "Garantía Oficial 5 Años",
        "mob_obd_desc": "Inspección pre-entrega superada al 100%.",
        "mob_m4_label": "CUOTA MENSUAL FINANCIADA",
        "mob_m4_stat": "€485 / mes",
        "mob_m4_badge": "SIN ENTRADA",
        "mob_btn_text": "💬 Chatear con el Concesionario"
    },
    # 14
    {
        "id": "14",
        "key": "app_14_mobile_de",
        "title": "Mobile.de Fleet Grid • European Dealer B2B",
        "font_family": "'Chivo', sans-serif",
        "body_font": "'Albert Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #1C0F00 0%, #2E1800 100%)",
        "glow_color": "rgba(255, 96, 0, 0.22)",
        "web_bg": "#EEF1F5",
        "web_surface": "#FFFFFF",
        "web_text": "#212529",
        "text_muted": "#4B5563",
        "accent_color": "#FF6000",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#FFEDD5",
        "inner_box_bg": "#F1F5F9",
        "border_color": "#D1D5DB",
        "window_bar_bg": "#1E3A8A",
        "mobile_bg": "#EEF1F5",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#212529",
        "obd_color": "#059669",
        "obd_status": "TÜV SÜD CERTIFIED // VÁLIDO HASTA 2028 // EURO 6D",
        "url_slug": "mobile-de/fleet-search",
        "nav_status": "148,290 VEHÍCULOS B2B EN RED",
        "m1_label": "VEHÍCULO COMERCIAL / FLOTAS",
        "m1_title": "Volkswagen Crafter 2.0 TDI 177 CV L3H3",
        "m1_desc": "IVA Deducible para empresas • Historial TÜV certificado • Puerta lateral eléctrica • 38,400 km.",
        "s1_lbl": "PRECIO NETO", "s1_val": "€32,900",
        "s2_lbl": "IVA (19%)", "s2_val": "€6,251",
        "s3_lbl": "TÜV", "s3_val": "APROBADO",
        "m2_label": "SISTEMA AD-BLUE & DPF",
        "m2_title": "Diagnóstico de Emisiones Euro 6d",
        "m2_desc": "Saturación del filtro de partículas (DPF) en 14%. Sensor de NOx operando con 100% de eficiencia.",
        "m2_tech_line": "EURO 6D-TEMP // DPF LOAD: 14% // AD-BLUE: 85% // DTC: 0000",
        "m3_label": "COMPARADOR MULTIFLOTA",
        "m3_title": "Matriz Volumen de Carga vs Consumo Diesel",
        "m3_desc": "VW Crafter (14.4 m³, 8.4 L/100km) vs Mercedes Sprinter 317 CDI (14.0 m³, 8.7 L/100km).",
        "m3_drop_text": "📋 Carga masiva de inventario CSV o Fichas Técnicas de Flota",
        "m4_label": "LIBRO DIGITAL DE REVISIONES",
        "m4_title": "Historial de Mantenimiento en Red Oficial",
        "m4_big_stat": "3 Servicios",
        "m4_stat_sub": "Sellados Oficiales VW",
        "m4_desc": "Próxima inspección de aceite y filtros programada a los 60,000 km.",
        "m4_bar_pct": "70%",
        "mob_badge": "IVA DEDUCIBLE // TÜV PASS",
        "mob_car_title": "VW Crafter L3H3",
        "mob_car_sub": "2.0 TDI 177 CV • Flotas B2B",
        "mob_s1": "38,400 km", "mob_s2": "Euro 6d", "mob_s3": "€32.9k +IVA",
        "mob_obd_title": "TÜV Aprobado sin Defectos",
        "mob_obd_desc": "Filtro DPF limpio y emisiones en norma europea.",
        "mob_m4_label": "VOLUMEN DE CARGA ÚTIL",
        "mob_m4_stat": "14.4 m³",
        "mob_m4_badge": "1,420 KG",
        "mob_btn_text": "📑 Solicitar Factura Proforma"
    },
    # 15
    {
        "id": "15",
        "key": "app_15_porsche_cpo",
        "title": "Porsche Finder Approved • 111-Point CPO",
        "font_family": "'Syncopate', sans-serif",
        "body_font": "'Instrument Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #1C0508 0%, #2A080C 100%)",
        "glow_color": "rgba(213, 0, 28, 0.22)",
        "web_bg": "#FFFFFF",
        "web_surface": "#FAFAFA",
        "web_text": "#000000",
        "text_muted": "#4B5563",
        "accent_color": "#D5001C",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#FEE2E2",
        "inner_box_bg": "#F4F4F5",
        "border_color": "#E4E4E7",
        "window_bar_bg": "#18181B",
        "mobile_bg": "#FFFFFF",
        "mobile_surface": "#FAFAFA",
        "mobile_text": "#000000",
        "obd_color": "#059669",
        "obd_status": "PIWIS III PASSED // 111 PUNTOS AUDITADOS AL 100%",
        "url_slug": "porsche-finder/approved-cpo",
        "nav_status": "24 MESES GARANTÍA PORSCHE APPROVED",
        "m1_label": "PORSCHE APPROVED CPO",
        "m1_title": "Porsche Taycan GTS Sport Turismo",
        "m1_desc": "Batería Performance Plus 93.4 kWh • 598 HP Overboost • Techo Sunshine Control • 12,800 km.",
        "s1_lbl": "AÑO", "s1_val": "2023",
        "s2_lbl": "KILÓMETROS", "s2_val": "12,800 km",
        "s3_lbl": "GARANTÍA", "s3_val": "24 Meses",
        "m2_label": "CHECKLIST PIWIS III OFICIAL",
        "m2_title": "Auditoría de Sobregiro y Desgaste Carbocerámico",
        "m2_desc": "Overrev Range 1-6: 0 ocurrencias. Desgaste de frenos carbocerámicos PCCB: 4.2% (apto CPO <8%).",
        "m2_tech_line": "PIWIS III LOG: SOH BATERÍA 98.6% // RANGE OVERREV: 0 // BRAKES: OK",
        "m3_label": "LISTA DE OPCIONES DE FÁBRICA PR",
        "m3_title": "Cotejo de Equipamiento Opcional PR",
        "m3_desc": "Validación digital de 24 opciones de fábrica por €34,200 (Paquete Sport Chrono, PDCC).",
        "m3_drop_text": "📁 Cargar certificado de nacimiento Porsche o ficha técnica oficial",
        "m4_label": "HISTORIAL DE CONCESIONARIOS",
        "m4_title": "Sello Digital de Centro Porsche Madrid Norte",
        "m4_big_stat": "100%",
        "m4_stat_sub": "Puntos Superados",
        "m4_desc": "Inspección técnica anual completada sin ninguna observación pendiente.",
        "m4_bar_pct": "100%",
        "mob_badge": "PORSCHE APPROVED 24M",
        "mob_car_title": "Taycan GTS Sport",
        "mob_car_sub": "598 HP • 93.4 kWh • CPO Oficial",
        "mob_s1": "12,800 km", "mob_s2": "0-100: 3.7s", "mob_s3": "€118,500",
        "mob_obd_title": "111 Puntos Auditados",
        "mob_obd_desc": "Firma digital del maestro perito de Porsche Center.",
        "mob_m4_label": "SALUD DE BATERÍA DE ALTA TENSIÓN",
        "mob_m4_stat": "98.6% SOH",
        "mob_m4_badge": "EXCELENTE",
        "mob_btn_text": "🛡️ Descargar Certificado CPO"
    },
    # 16
    {
        "id": "16",
        "key": "app_16_rivian_os",
        "title": "Rivian Adventure OS • Clean-Tech Interface",
        "font_family": "'Krona One', sans-serif",
        "body_font": "'DM Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #070B0E 0%, #111A22 100%)",
        "glow_color": "rgba(132, 204, 22, 0.22)",
        "web_bg": "#0B0E14",
        "web_surface": "#121721",
        "web_text": "#F3F4F6",
        "text_muted": "#9CA3AF",
        "accent_color": "#84CC16",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(132, 204, 22, 0.15)",
        "inner_box_bg": "#070A0F",
        "border_color": "rgba(132, 204, 22, 0.25)",
        "window_bar_bg": "#05070A",
        "mobile_bg": "#0B0E14",
        "mobile_surface": "#121721",
        "mobile_text": "#F3F4F6",
        "obd_color": "#84CC16",
        "obd_status": "SISTEMA TÉRMICO DE BATERÍA // NOMINAL 24°C",
        "url_slug": "rivian-os/adventure-deck",
        "nav_status": "SATELLITE LINK ACTIVE",
        "m1_label": "ADVENTURE RANGE PLANNER",
        "m1_title": "Rivian R1T Quad-Motor Adventure Pack",
        "m1_desc": "835 HP • 1,231 Nm • Suspensión neumática ajustable hasta 378 mm • Autonomía en ruta: 512 km.",
        "s1_lbl": "AUTONOMÍA", "s1_val": "512 km",
        "s2_lbl": "POTENCIA", "s2_val": "835 HP",
        "s3_lbl": "REMOLQUE", "s3_val": "5,000 kg",
        "m2_label": "DIAGNÓSTICO BMS CELDA A CELDA",
        "m2_title": "Salud Molecular del Pack de 135 kWh",
        "m2_desc": "Delta de tensión entre módulos: 6 mV. Cero pérdidas de aislamiento en circuitos HV.",
        "m2_tech_line": "BMS REPORT: DELTA_V: 6mV // PACK SOH: 98.4% // REGEN EFF: 94%",
        "m3_label": "SIMULADOR DE CONSUMO CON REMOLQUE",
        "m3_title": "Matriz de Autonomía vs Carga Útil",
        "m3_desc": "Consumo sin remolque: 27 kWh/100km. Con remolque de 3,000 kg: 42 kWh/100km (Autonomía: 320 km).",
        "m3_drop_text": "⚡ Ingesta de perfil topográfico o ficha técnica de carga",
        "m4_label": "CONSUMO EN EXPEDICIÓN",
        "m4_title": "Historial Energético Off-Grid",
        "m4_big_stat": "28.4",
        "m4_stat_sub": "kWh / 100 km",
        "m4_desc": "34 kWh recuperados mediante frenada regenerativa en bajada de montaña.",
        "m4_bar_pct": "82%",
        "mob_badge": "RIVIAN ADVENTURE READY",
        "mob_car_title": "Rivian R1T Quad",
        "mob_car_sub": "835 HP • Batería 135 kWh Max",
        "mob_s1": "512 km", "mob_s2": "Quad-Motor", "mob_s3": "$89,000",
        "mob_obd_title": "Celdas de Batería Balanceadas",
        "mob_obd_desc": "Delta térmico de 0.8°C en el pack principal.",
        "mob_m4_label": "CARGA RÁPIDA 220 kW",
        "mob_m4_stat": "78% (398 km)",
        "mob_m4_badge": "+180 KM EN 20 MIN",
        "mob_btn_text": "🌲 Planificar Ruta Remota"
    },
    # 17
    {
        "id": "17",
        "key": "app_17_copart_salvage",
        "title": "Copart Forensic Salvage • Structural Audit",
        "font_family": "'Epilogue', sans-serif",
        "body_font": "'Space Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #050811 0%, #0E162A 100%)",
        "glow_color": "rgba(239, 68, 68, 0.22)",
        "web_bg": "#0A0F1D",
        "web_surface": "#131E35",
        "web_text": "#FFFFFF",
        "text_muted": "#94A3B8",
        "accent_color": "#EF4444",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "rgba(239, 68, 68, 0.15)",
        "inner_box_bg": "#070B16",
        "border_color": "#1E2E4E",
        "window_bar_bg": "#050811",
        "mobile_bg": "#0A0F1D",
        "mobile_surface": "#131E35",
        "mobile_text": "#FFFFFF",
        "obd_color": "#22C55E",
        "obd_status": "RUN & DRIVE VERIFICADO // MOTOR ARRANCA Y MARCHA",
        "url_slug": "copart-salvage/lot-849102",
        "nav_status": "AUCTION BIDDING OPEN",
        "m1_label": "LOTE SALVAMENTO N° 849102",
        "m1_title": "2023 BMW M4 Competition xDrive",
        "m1_desc": "Impacto frontal lateral leve • Airbags no desplegados • Largueros de chasis intactos en bancada • 8,900 mi.",
        "s1_lbl": "VALOR INTACTO", "s1_val": "$92,500",
        "s2_lbl": "PRESUPUESTO REP.", "s2_val": "$13,200",
        "s3_lbl": "ESTADO", "s3_val": "RUN & DRIVE",
        "m2_label": "CRASH EVENT FREEZE FRAME",
        "m2_title": "Memoria de Impacto y Corte Inercial",
        "m2_desc": "Lectura de ECU de colisión: Velocidad al impacto 38 km/h. Corte inercial de combustible reactivado.",
        "m2_tech_line": "CRASH_DATA: B1193 RECORDED // STEERING_ANGLE: OK // ENGINE_RUN: YES",
        "m3_label": "AUDITORÍA DE RENTABILIDAD B2B",
        "m3_title": "Matriz Coste Reparación vs Margen",
        "m3_desc": "Puja estimada: $38,000 + Repuestos OEM: $13,200 = Inversión $51,200 (Margen reventa: +44%).",
        "m3_drop_text": "🔧 Subir informe pericial de aseguradora o presupuesto taller",
        "m4_label": "TITULARIDAD FORENSE",
        "m4_title": "Historial de Títulos de Propiedad",
        "m4_big_stat": "Certificado",
        "m4_stat_sub": "Salvage Certificate FL",
        "m4_desc": "Apto para reconstrucción y emisión de Rebuilt Title tras peritaje estatal.",
        "m4_bar_pct": "89%",
        "mob_badge": "RUN & DRIVE CERTIFIED",
        "mob_car_title": "BMW M4 Competition",
        "mob_car_sub": "xDrive 503 HP • Daño Frontal Leve",
        "mob_s1": "8,900 mi", "mob_s2": "MSRP $92.5k", "mob_s3": "Puja $38k",
        "mob_obd_title": "Motor Arranca al Primer Giro",
        "mob_obd_desc": "Sin fallas en compresión de bancada S58.",
        "mob_m4_label": "MARGEN ESTIMADO POST-TALLER",
        "mob_m4_stat": "+$28,100",
        "mob_m4_badge": "+44% ROI",
        "mob_btn_text": "🔨 Participar en Subasta B2B"
    },
    # 18
    {
        "id": "18",
        "key": "app_18_motec_telemetry",
        "title": "MoTeC Racing Telemetry • Pitwall Workstation",
        "font_family": "'Rajdhani', sans-serif",
        "body_font": "'Chivo Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #000000 0%, #08080C 100%)",
        "glow_color": "rgba(0, 229, 255, 0.22)",
        "web_bg": "#000000",
        "web_surface": "#0A0A0E",
        "web_text": "#FFFFFF",
        "text_muted": "#71717A",
        "accent_color": "#00E5FF",
        "badge_text_color": "#000000",
        "tag_bg": "rgba(0, 229, 255, 0.12)",
        "inner_box_bg": "#040406",
        "border_color": "#1F1F2E",
        "window_bar_bg": "#000000",
        "mobile_bg": "#000000",
        "mobile_surface": "#0A0A0E",
        "mobile_text": "#FFFFFF",
        "obd_color": "#00FF66",
        "obd_status": "CAN TELEMETRY 100Hz // DELTA -0.34s RECORD",
        "url_slug": "motec-i2/telemetry-stint",
        "nav_status": "CHASSIS LOGGING ACTIVE",
        "m1_label": "CAN CHANNEL ACQUISITION",
        "m1_title": "Porsche 911 GT3 R (Type 992 GT3)",
        "m1_desc": "Motor Bóxer 4.2L Competición • 565 HP • Caja secuencial de 6 velocidades • Calificación Le Mans.",
        "s1_lbl": "VEL. GPS", "s1_val": "294 km/h",
        "s2_lbl": "RPM MOTOR", "s2_val": "9,150",
        "s3_lbl": "DELTA", "s3_val": "-0.34 s",
        "m2_label": "HEXADECIMAL PID LOG",
        "m2_title": "Temperatura de Culata & Presión de Frenos",
        "m2_desc": "Presión circuito de frenos: 94 Bar en curva 1. Temperatura de escape EGT en 880°C (mezcla óptima).",
        "m2_tech_line": "PID_0x3E: BRAKE_F 94BAR // PID_0x42: EGT 880C // TPS: 100% WOT",
        "m3_label": "SUPERPOSICIÓN DE TRAZAS",
        "m3_title": "Comparador de Vuelta Rápida Piloto A vs B",
        "m3_desc": "Piloto A frena 18 metros más tarde en Variante Ascari y gana +0.18s a la salida por mejor tracción.",
        "m3_drop_text": "📈 Importar archivo MoTeC .ld o telemetría CSV de pista",
        "m4_label": "VIDA ÚTIL DE PIEZAS DE CARRERA",
        "m4_title": "Horas de Motor & Caja de Cambios",
        "m4_big_stat": "22.4 h",
        "m4_stat_sub": "De 40h de Reconstrucción",
        "m4_desc": "Pastillas Pagid Endurance al 72% • Fluido de frenos a 180°C tras 45 minutos.",
        "m4_bar_pct": "56%",
        "mob_badge": "DELTA -0.34s PURPLE",
        "mob_car_title": "911 GT3 R 4.2L",
        "mob_car_sub": "565 HP • GT World Challenge",
        "mob_s1": "294 km/h", "mob_s2": "9,150 RPM", "mob_s3": "94 Bar",
        "mob_obd_title": "CAN Bus 100 Hz Nominal",
        "mob_obd_desc": "Transmisión telemétrica en vivo a muro de boxes.",
        "mob_m4_label": "TEMPERATURA NEUMÁTICOS DEL/IZQ",
        "mob_m4_stat": "94°C",
        "mob_m4_badge": "GRIP ÓPTIMO",
        "mob_btn_text": "📊 Analizar Canales de Freno"
    },
    # 19
    {
        "id": "19",
        "key": "app_19_autotrader_deals",
        "title": "AutoTrader Price Index • Market Deal Rating",
        "font_family": "'Epilogue', sans-serif",
        "body_font": "'Instrument Sans', sans-serif",
        "studio_bg": "linear-gradient(135deg, #061120 0%, #0E1D36 100%)",
        "glow_color": "rgba(5, 150, 105, 0.22)",
        "web_bg": "#F8FAFC",
        "web_surface": "#FFFFFF",
        "web_text": "#0F172A",
        "text_muted": "#64748B",
        "accent_color": "#059669",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "#DCFCE7",
        "inner_box_bg": "#F1F5F9",
        "border_color": "#E2E8F0",
        "window_bar_bg": "#0F172A",
        "mobile_bg": "#F8FAFC",
        "mobile_surface": "#FFFFFF",
        "mobile_text": "#0F172A",
        "obd_color": "#059669",
        "obd_status": "RIESGO DE TALLER: BAJO // 9.4/10 SCORE MECÁNICO",
        "url_slug": "autotrader/price-indicator",
        "nav_status": "38 VEHÍCULOS COMPARADOS EN 150KM",
        "m1_label": "VALORACIÓN ALGORÍTMICA",
        "m1_title": "BMW M340i xDrive Touring 374 HP",
        "m1_desc": "Precio publicado: €49,500 • Precio medio de mercado: €54,900. Ahorro calculado por Machine Learning.",
        "s1_lbl": "PRECIO MERCADO", "s1_val": "€54,900",
        "s2_lbl": "PRECIO OFERTA", "s2_val": "€49,500",
        "s3_lbl": "VALORACIÓN", "s3_val": "GRAN PRECIO",
        "m2_label": "CALCULADORA DE RIESGO MECÁNICO",
        "m2_title": "Estimación de Gastos en Primeros 6 Meses",
        "m2_desc": "Historial de fallas típico del motor B58: 99.2% de fiabilidad. Coste estimado de prevención: €380.",
        "m2_tech_line": "B58 RELIABILITY INDEX: 9.4/10 // RISK FACTOR: LOW // TCO: €0.24/KM",
        "m3_label": "CURVA DE DEPRECIACIÓN A 3 AÑOS",
        "m3_title": "Matriz Retención de Valor de Reventa",
        "m3_desc": "Retención a 36 meses: 68% del valor actual (supera en +9% la media del segmento D premium).",
        "m3_drop_text": "📊 Ingesta de ficha técnica o cotización para cálculo de Deal Rating",
        "m4_label": "TERMÓMETRO DE PRECIO",
        "m4_title": "Posición Frente a Ofertas Rivales",
        "m4_big_stat": "-€5,400",
        "m4_stat_sub": "Bajo la Media de Mercado",
        "m4_desc": "El algoritmo recomienda comprar ahora: tendencia de precios se mantendrá estable.",
        "m4_bar_pct": "88%",
        "mob_badge": "EXCELENTE PRECIO // -€5.4k",
        "mob_car_title": "BMW M340i Touring",
        "mob_car_sub": "374 HP • 6 Cilindros B58 xDrive",
        "mob_s1": "€49,500", "mob_s2": "42,000 km", "mob_s3": "-10% Media",
        "mob_obd_title": "Score Mecánico: 9.4 / 10",
        "mob_obd_desc": "Bajo riesgo de averías costosas documentado.",
        "mob_m4_label": "RETENCIÓN DE VALOR A 3 AÑOS",
        "mob_m4_stat": "68% Retenido",
        "mob_m4_badge": "ALTA DEMANDA",
        "mob_btn_text": "📈 Ver Gráfico de Depreciación"
    },
    # 20
    {
        "id": "20",
        "key": "app_20_arb_overland",
        "title": "ARB Overland Rig Builder • Payload & GVM",
        "font_family": "'Epilogue', sans-serif",
        "body_font": "'Space Mono', monospace",
        "studio_bg": "linear-gradient(135deg, #120D0A 0%, #1F1610 100%)",
        "glow_color": "rgba(217, 119, 6, 0.22)",
        "web_bg": "#181512",
        "web_surface": "#211A15",
        "web_text": "#F5F5F4",
        "text_muted": "#A8A29E",
        "accent_color": "#D97706",
        "badge_text_color": "#FFFFFF",
        "tag_bg": "rgba(217, 119, 6, 0.15)",
        "inner_box_bg": "#120E0B",
        "border_color": "#382B21",
        "window_bar_bg": "#120D0A",
        "mobile_bg": "#181512",
        "mobile_surface": "#211A15",
        "mobile_text": "#F5F5F4",
        "obd_color": "#22C55E",
        "obd_status": "BLOQUEOS AIR LOCKER LISTOS // TRANSFER CASE 74°C",
        "url_slug": "arb-overland/rig-builder",
        "nav_status": "GVM HOMOLOGATION APPROVED",
        "m1_label": "RIG BLUEPRINT & CARGA GVM",
        "m1_title": "Toyota Land Cruiser 79 Double Cab 4.5 V8",
        "m1_desc": "Defensa Bullbar ARB + Cabrestante Warn 12k + Suspensión Old Man Emu BP-51 + Tienda rígida.",
        "s1_lbl": "PESO TARA", "s1_val": "2,380 kg",
        "s2_lbl": "CARGA ÚTIL", "s2_val": "1,120 kg",
        "s3_lbl": "GVM TOTAL", "s3_val": "3,500 kg",
        "m2_label": "TELEMETRÍA 4X4 DE EXPEDICIÓN",
        "m2_title": "Temperatura Reductora y Presión Neumáticos",
        "m2_desc": "Compresor de aire ARB Twin en reposo (150 PSI). Sensor de temperatura de transfer en rango seguro.",
        "m2_tech_line": "TRANSFER_OIL: 74°C // DIFF_LOCK_F: READY // DIFF_LOCK_R: READY",
        "m3_label": "BALANCE DE MASA POR EJE",
        "m3_title": "Matriz Distribución de Peso Frontal / Trasero",
        "m3_desc": "Eje delantero: 1,480 kg (42%) • Eje trasero: 2,020 kg (58%) con tanques llenos (agua 90L + diesel 180L).",
        "m3_drop_text": "⛺ Ingesta de lista de accesorios y pesos en formato PDF",
        "m4_label": "CONSUMO EN EXPEDICIÓN PESADA",
        "m4_title": "Autonomía en Trocha con 3.5 Toneladas",
        "m4_big_stat": "16.8 L",
        "m4_stat_sub": "Diesel / 100 km",
        "m4_desc": "Doble tanque de 180 Litros totales: Autonomía garantizada en terreno remoto: 1,070 km.",
        "m4_bar_pct": "79%",
        "mob_badge": "GVM 3,500 KG HOMOLOGADO",
        "mob_car_title": "Land Cruiser 79 V8",
        "mob_car_sub": "4.5 Turbo Diesel • ARB Full Armor",
        "mob_s1": "GVM: 3.5t", "mob_s2": "OME BP-51", "mob_s3": "4x4 Dual Lock",
        "mob_obd_title": "Air Lockers Operativos",
        "mob_obd_desc": "Compresor ARB Twin con 150 PSI en línea.",
        "mob_m4_label": "AUTONOMÍA TANQUE DOBLE",
        "mob_m4_stat": "1,070 km",
        "mob_m4_badge": "180L DIESEL",
        "mob_btn_text": "🛠️ Añadir Accesorios al Rig"
    }
]

def generate_html(cfg):
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;700;800;900&family=Bodoni+Moda:ital,opsz,wght@0,6..96,700..900;1,6..96,700..900&family=Chivo+Mono:wght@600;700&family=Chivo:wght@700;900&family=DM+Sans:wght@500;700;800&family=Epilogue:wght@700;800;900&family=Instrument+Sans:wght@500;600;700&family=Krona+One&family=Michroma&family=Oxanium:wght@600;700;800&family=Rajdhani:wght@600;700;800&family=Sora:wght@500;700;800&family=Space+Mono:wght@400;700&family=Syncopate:wght@700&family=Unbounded:wght@700;800;900&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: {cfg['font_family']}, {cfg['body_font']}, -apple-system, sans-serif; }}
  body {{
    width: 1920px; height: 1080px; overflow: hidden;
    background: {cfg['studio_bg']};
    color: #F8FAFC;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 60px;
  }}

  /* Ambient Glow & Grid */
  .ambient-glow {{
    position: absolute;
    width: 950px; height: 950px;
    background: radial-gradient(circle, {cfg['glow_color']} 0%, rgba(0,0,0,0) 70%);
    top: 50%; left: 45%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }}
  .grid-pattern {{
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }}

  /* Presentation Tag */
  .deck-tag {{
    position: absolute; top: 32px; left: 60px;
    display: flex; align-items: center; gap: 14px;
    font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;
    color: #94A3B8;
  }}
  .tag-badge {{
    background: {cfg['accent_color']}; color: {cfg['badge_text_color']}; padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 900;
  }}

  /* 1. DESKTOP WEB APP */
  .desktop-app {{
    width: 1260px; height: 860px;
    background: {cfg['web_bg']};
    color: {cfg['web_text']};
    border-radius: 16px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px {cfg['border_color']};
    display: flex; flex-direction: column;
    overflow: hidden;
    position: relative;
    z-index: 1;
    margin-top: 45px;
  }}
  .window-bar {{
    background: {cfg['window_bar_bg']}; color: #FFF;
    padding: 12px 20px;
    display: flex; align-items: center; gap: 16px;
  }}
  .win-dots {{ display: flex; gap: 8px; }}
  .dot {{ width: 12px; height: 12px; border-radius: 50%; }}
  .d-red {{ background: #FF5F56; }}
  .d-yellow {{ background: #FFBD2E; }}
  .d-green {{ background: #27C93F; }}
  .url-bar {{
    flex: 1; max-width: 600px; margin: 0 auto;
    background: rgba(255,255,255,0.08); border-radius: 6px;
    padding: 6px 16px; font-size: 12px; font-family: monospace; color: #94A3B8;
    text-align: center;
  }}

  /* Web App Main Content */
  .web-nav {{
    background: {cfg['web_surface']}; border-bottom: 1px solid {cfg['border_color']};
    padding: 14px 28px;
    display: flex; justify-content: space-between; align-items: center;
  }}
  .web-logo {{ font-size: 19px; font-weight: 900; letter-spacing: 1px; }}
  .web-logo span {{ color: {cfg['accent_color']}; }}
  .web-tabs {{ display: flex; gap: 22px; font-size: 13px; font-weight: 700; color: {cfg['text_muted']}; }}
  .web-tabs .active {{ color: {cfg['accent_color']}; border-bottom: 2px solid {cfg['accent_color']}; padding-bottom: 4px; }}

  .web-body {{
    padding: 24px 28px; flex: 1;
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  }}
  .web-card {{
    background: {cfg['web_surface']}; border-radius: 12px; padding: 20px;
    border: 1px solid {cfg['border_color']};
    box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    display: flex; flex-direction: column; justify-content: space-between;
  }}
  .card-label {{ font-size: 10px; font-weight: 800; color: {cfg['text_muted']}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }}
  .card-h {{ font-size: 19px; font-weight: 800; margin-bottom: 10px; color: {cfg['web_text']}; }}

  /* 2. SMARTPHONE MOBILE APP */
  .phone-app {{
    position: absolute;
    right: 70px; top: 100px;
    width: 440px; height: 900px;
    background: #000;
    border-radius: 52px;
    border: 8px solid #2B3340;
    box-shadow: 0 35px 90px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.15);
    overflow: hidden;
    z-index: 10;
    display: flex; flex-direction: column;
  }}
  
  /* Phone Status & Dynamic Island */
  .phone-status-bar {{
    background: {cfg['mobile_bg']}; color: {cfg['mobile_text']};
    padding: 14px 28px 8px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 13px; font-weight: 800;
    position: relative;
  }}
  .dynamic-island {{
    position: absolute; top: 10px; left: 50%;
    transform: translateX(-50%);
    width: 120px; height: 26px;
    background: #000; border-radius: 20px;
    display: flex; align-items: center; justify-content: flex-end; padding-right: 10px;
  }}
  .camera-dot {{ width: 10px; height: 10px; border-radius: 50%; background: #111; }}

  /* Phone App Body */
  .phone-body {{
    background: {cfg['mobile_bg']}; color: {cfg['mobile_text']};
    flex: 1; padding: 18px 22px;
    display: flex; flex-direction: column; gap: 13px;
    overflow: hidden;
  }}
  .phone-header {{
    display: flex; justify-content: space-between; align-items: center;
  }}
  .phone-logo {{ font-size: 16px; font-weight: 900; }}
  .phone-logo span {{ color: {cfg['accent_color']}; }}

  .phone-card-1 {{
    background: {cfg['mobile_surface']}; border-radius: 14px; padding: 16px;
    border: 1px solid {cfg['border_color']};
  }}
  .phone-badge {{
    background: {cfg['accent_color']}; color: {cfg['badge_text_color']};
    font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px; width: fit-content; margin-bottom: 8px;
  }}
  .phone-car-title {{ font-size: 17px; font-weight: 800; margin-bottom: 4px; }}
  .phone-car-sub {{ font-size: 12px; color: {cfg['text_muted']}; }}

  .phone-card-2 {{
    background: {cfg['mobile_surface']}; border-radius: 14px; padding: 15px;
    border-left: 4px solid {cfg['obd_color']};
    border: 1px solid {cfg['border_color']}; border-left-width: 4px;
  }}
  .obd-status-pill {{
    display: flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; color: {cfg['obd_color']};
  }}
  .obd-pulse {{ width: 8px; height: 8px; border-radius: 50%; background: {cfg['obd_color']}; }}

  .phone-btn {{
    background: {cfg['accent_color']}; color: {cfg['badge_text_color']};
    padding: 12px; border-radius: 10px;
    text-align: center; font-size: 13px; font-weight: 800; cursor: pointer;
  }}

  /* Phone Bottom Tab Bar */
  .phone-tab-bar {{
    background: {cfg['mobile_surface']}; border-top: 1px solid {cfg['border_color']};
    padding: 10px 18px 22px;
    display: flex; justify-content: space-around; align-items: center;
    font-size: 10px; font-weight: 700; color: {cfg['text_muted']};
  }}
  .phone-tab-item {{ display: flex; flex-direction: column; align-items: center; gap: 4px; }}
  .phone-tab-item.active {{ color: {cfg['accent_color']}; }}
  .phone-tab-icon {{ font-size: 17px; }}
</style>
</head>
<body>
  <div class="ambient-glow"></div>
  <div class="grid-pattern"></div>
  
  <div class="deck-tag">
    <span class="tag-badge">PROPUESTA {cfg['id']} // APP MÓVIL &amp; WEB</span>
    <span>{cfg['title']} • Responsive Ecosystem</span>
  </div>

  <!-- 1. DESKTOP WEB APP VIEW -->
  <div class="desktop-app">
    <div class="window-bar">
      <div class="win-dots">
        <div class="dot d-red"></div>
        <div class="dot d-yellow"></div>
        <div class="dot d-green"></div>
      </div>
      <div class="url-bar">https://app.charumotorhub.com/{cfg['url_slug']}</div>
    </div>
    
    <div class="web-nav">
      <div class="web-logo">CHARU <span>MOTORHUB</span> APP</div>
      <div class="web-tabs">
        <span class="active">01. Recomendador</span>
        <span>02. Diagnóstico OBD-II</span>
        <span>03. Comparador Fichas</span>
        <span>04. Bitácora</span>
      </div>
      <div style="font-size:11px; font-weight:800; background:{cfg['tag_bg']}; color:{cfg['accent_color']}; padding:6px 12px; border-radius:20px;">
        {cfg['nav_status']}
      </div>
    </div>

    <div class="web-body">
      <!-- Module 1: Recomendador -->
      <div class="web-card">
        <div>
          <div class="card-label">MÓDULO 01 // {cfg['m1_label']}</div>
          <div class="card-h">{cfg['m1_title']}</div>
          <p style="font-size:12px; color:{cfg['text_muted']}; line-height:1.5; font-family:{cfg['body_font']};">
            {cfg['m1_desc']}
          </p>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:14px; background:{cfg['inner_box_bg']}; padding:10px 14px; border-radius:8px;">
          <div><div style="font-size:10px; color:{cfg['text_muted']}; font-family:{cfg['body_font']};">{cfg['s1_lbl']}</div><strong style="font-size:15px; color:{cfg['web_text']};">{cfg['s1_val']}</strong></div>
          <div><div style="font-size:10px; color:{cfg['text_muted']}; font-family:{cfg['body_font']};">{cfg['s2_lbl']}</div><strong style="font-size:15px; color:{cfg['web_text']};">{cfg['s2_val']}</strong></div>
          <div><div style="font-size:10px; color:{cfg['text_muted']}; font-family:{cfg['body_font']};">{cfg['s3_lbl']}</div><strong style="font-size:15px; color:{cfg['accent_color']};">{cfg['s3_val']}</strong></div>
        </div>
      </div>

      <!-- Module 2: Diagnóstico OBD-II -->
      <div class="web-card">
        <div>
          <div class="card-label">MÓDULO 02 // {cfg['m2_label']}</div>
          <div class="card-h">{cfg['m2_title']}</div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <div style="width:10px; height:10px; border-radius:50%; background:{cfg['obd_color']};"></div>
            <span style="font-weight:800; font-size:12px; color:{cfg['obd_color']};">{cfg['obd_status']}</span>
          </div>
          <p style="font-size:12px; color:{cfg['text_muted']}; line-height:1.5; font-family:{cfg['body_font']};">{cfg['m2_desc']}</p>
        </div>
        <div style="background:{cfg['inner_box_bg']}; border-radius:6px; padding:10px; font-family:monospace; font-size:11px; color:{cfg['web_text']};">
          {cfg['m2_tech_line']}
        </div>
      </div>

      <!-- Module 3: Comparador PDF -->
      <div class="web-card">
        <div>
          <div class="card-label">MÓDULO 03 // {cfg['m3_label']}</div>
          <div class="card-h">{cfg['m3_title']}</div>
          <div style="font-size:12px; color:{cfg['text_muted']}; line-height:1.6; font-family:{cfg['body_font']};">
            {cfg['m3_desc']}
          </div>
        </div>
        <div style="border: 2px dashed {cfg['accent_color']}; background: {cfg['tag_bg']}; border-radius: 8px; padding: 10px; text-align: center; font-size: 11px; font-weight: 700; color: {cfg['accent_color']};">
          {cfg['m3_drop_text']}
        </div>
      </div>

      <!-- Module 4: Bitácora -->
      <div class="web-card">
        <div>
          <div class="card-label">MÓDULO 04 // {cfg['m4_label']}</div>
          <div class="card-h">{cfg['m4_title']}</div>
          <div style="display:flex; justify-content:space-between; align-items:baseline;">
            <span style="font-size:30px; font-weight:900; color:{cfg['accent_color']};">{cfg['m4_big_stat']}</span>
            <span style="font-size:12px; color:{cfg['text_muted']}; font-family:{cfg['body_font']};">{cfg['m4_stat_sub']}</span>
          </div>
          <p style="font-size:12px; color:{cfg['text_muted']}; margin-top:4px; font-family:{cfg['body_font']};">{cfg['m4_desc']}</p>
        </div>
        <div style="height:6px; background:rgba(0,0,0,0.1); border-radius:3px; overflow:hidden;">
          <div style="width:{cfg['m4_bar_pct']}; height:100%; background:{cfg['accent_color']};"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- 2. SMARTPHONE MOBILE APP VIEW -->
  <div class="phone-app">
    <div class="phone-status-bar">
      <span>09:41</span>
      <div class="dynamic-island"><div class="camera-dot"></div></div>
      <span>5G 100%</span>
    </div>

    <div class="phone-body">
      <div class="phone-header">
        <div class="phone-logo">CHARU <span>MOTORHUB</span></div>
        <div style="font-size:17px;">🔔</div>
      </div>

      <div class="phone-card-1">
        <div class="phone-badge">{cfg['mob_badge']}</div>
        <div class="phone-car-title">{cfg['mob_car_title']}</div>
        <div class="phone-car-sub" style="font-family:{cfg['body_font']};">{cfg['mob_car_sub']}</div>
        <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:12px; font-weight:700;">
          <span>{cfg['mob_s1']}</span>
          <span>{cfg['mob_s2']}</span>
          <span style="color:{cfg['accent_color']}; font-weight:900;">{cfg['mob_s3']}</span>
        </div>
      </div>

      <div class="phone-card-2">
        <div class="obd-status-pill">
          <div class="obd-pulse"></div>
          <span>ESCANEO MÓVIL EN VIVO</span>
        </div>
        <div style="font-size:13px; font-weight:800; margin:4px 0;">{cfg['mob_obd_title']}</div>
        <div style="font-size:11px; color:{cfg['text_muted']}; font-family:{cfg['body_font']};">{cfg['mob_obd_desc']}</div>
      </div>

      <div style="background:{cfg['mobile_surface']}; border-radius:14px; padding:12px; border:1px solid {cfg['border_color']}; font-size:11px;">
        <div style="font-size:10px; font-weight:800; color:{cfg['text_muted']}; text-transform:uppercase;">{cfg['mob_m4_label']}</div>
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:4px;">
          <span style="font-size:20px; font-weight:900; color:{cfg['mobile_text']};">{cfg['mob_m4_stat']}</span>
          <span style="color:{cfg['obd_color']}; font-weight:800;">{cfg['mob_m4_badge']}</span>
        </div>
      </div>

      <div class="phone-btn">{cfg['mob_btn_text']}</div>
    </div>

    <div class="phone-tab-bar">
      <div class="phone-tab-item active">
        <div class="phone-tab-icon">🏠</div>
        <span>Inicio</span>
      </div>
      <div class="phone-tab-item">
        <div class="phone-tab-icon">🔍</div>
        <span>OBD-II</span>
      </div>
      <div class="phone-tab-item">
        <div class="phone-tab-icon">⚖️</div>
        <span>Comparar</span>
      </div>
      <div class="phone-tab-item">
        <div class="phone-tab-icon">📊</div>
        <span>Bitácora</span>
      </div>
      <div class="phone-tab-item">
        <div class="phone-tab-icon">👤</div>
        <span>Perfil</span>
      </div>
    </div>
  </div>
</body>
</html>"""

def render_mockup(cfg):
    filename = cfg['key']
    temp_html = os.path.join(temp_dir, f"{filename}.html")
    temp_png = os.path.join(temp_dir, f"{filename}.png")
    out_jpg = os.path.join(output_dir, f"{filename}.jpg")

    html_content = generate_html(cfg)
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(html_content)

    cmd = [
        edge_path,
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        f'--screenshot={temp_png}',
        '--window-size=1920,1080',
        'file:///' + os.path.abspath(temp_html).replace('\\', '/')
    ]
    subprocess.run(cmd, capture_output=True, text=True)

    if os.path.exists(temp_png):
        img = Image.open(temp_png)
        rgb = img.convert('RGB')
        rgb.save(out_jpg, quality=95)
        os.remove(temp_png)
        os.remove(temp_html)
        size_kb = os.path.getsize(out_jpg) / 1024
        print(f"[{cfg['id']}/20] Rendered: {out_jpg} ({size_kb:.1f} KB)")
        return True
    else:
        print(f"[{cfg['id']}/20] FAILED: {out_jpg}")
        return False

if __name__ == '__main__':
    t0 = time.time()
    print("=" * 60)
    print("STARTING BATCH RENDERING OF 20 CROSS-PLATFORM APPS")
    print("=" * 60)
    success_count = 0
    for cfg in PROPOSALS:
        if render_mockup(cfg):
            success_count += 1
    t1 = time.time()
    print("=" * 60)
    print(f"DONE: {success_count}/20 images rendered in {t1 - t0:.1f} seconds")
    print("=" * 60)
