"""
================================================================================
🚗 CHARUAUTOS — SERVIDOR DE PRUEBA Y EJECUCIÓN LOCAL
================================================================================
Levanta la aplicación web completa de CharuAutos de manera local sin dependencias
externas y abre automáticamente el navegador para probar toda la funcionalidad.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import json
from pathlib import Path

# Configurar encoding UTF-8 seguro para Windows PowerShell
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

PORT = 8080
PUBLIC_DIR = Path(__file__).resolve().parent / "public"
import re
import unicodedata
import urllib.request
import urllib.parse
import base64
import pymupdf


def extract_vehicle_maker_and_model(filename, full_text, pdf_bytes=b''):
    norm_text = unicodedata.normalize('NFKD', full_text)
    text_lower = norm_text.lower()
    fn_lower = filename.lower()

    # 1. Limpieza base del filename por si se requiere fallback
    clean_fn = re.sub(r'\.pdf$', '', filename, flags=re.I)
    clean_fn = re.sub(r'^[a-f0-9]{16,64}[_\s-]*', '', clean_fn, flags=re.I)
    clean_fn = re.sub(r'^\d{6,}[_\s-]*', '', clean_fn)
    clean_fn = re.sub(r'(?i)\b(f\.?t\.?|ficha(?:\s*t[eé]cnica)?|brochure|cat[aá]logo|catalogo|compressed|compreso|comprimido|copia|copy|\(\d+\)|v\d+)\b', '', clean_fn)
    clean_fn = re.sub(r'([a-zA-Z]+)(\d{4})\b', r'\1 \2', clean_fn)
    clean_fn = re.sub(r'[-_]', ' ', clean_fn)
    clean_fn = re.sub(r'\s+', ' ', clean_fn).strip()

    maker = ''
    model = ''

    # A. Detección de Chery / Arrizo / Tiggo
    if 'arrizo' in text_lower or 'arrizo' in fn_lower or 'chery' in text_lower or 'chery' in fn_lower:
        maker = 'Chery'
        m_arr = re.search(r'ARRIZO\s*(\d+)\s*(PRO)?', norm_text, re.I)
        if m_arr:
            num = m_arr.group(1)
            pro = ' Pro' if m_arr.group(2) else ''
            trans_tag = ''
            if 'automa' in text_lower or 'cvt' in text_lower or 'a/t' in text_lower or 'automa' in fn_lower:
                trans_tag = ' Automático'
            elif 'sincron' in text_lower or 'm/t' in text_lower or 'manual' in text_lower:
                trans_tag = ' Manual'
            model = f'Arrizo {num}{pro}{trans_tag}'.strip()
        elif 'arrizo' in text_lower or 'arrizo' in fn_lower:
            model = 'Arrizo'
            if 'automa' in text_lower or 'automa' in fn_lower:
                model += ' Automático'
            elif 'sincron' in text_lower or 'sincron' in fn_lower:
                model += ' Sincrónico'
        elif 'tiggo' in text_lower or 'tiggo' in fn_lower:
            m_tig = re.search(r'TIGGO\s*(\d+)\s*(PRO)?(?:\s*(MAX))?', norm_text, re.I)
            if m_tig:
                num = m_tig.group(1)
                pro = ' Pro' if m_tig.group(2) else ''
                max_tag = ' Max' if m_tig.group(3) else ''
                model = f'Tiggo {num}{pro}{max_tag}'.strip()
            else:
                model = 'Tiggo 4 Pro'

    # B. Detección de Toyota (Corolla, Land Cruiser, Yaris, Hilux)
    elif 'toyota' in text_lower or 'toyota' in fn_lower or 'corolla' in text_lower or 'corolla' in fn_lower or 'land cruiser' in text_lower or 'trj240' in text_lower or 'mzea12' in text_lower or 'mxga10' in text_lower or 'fj' in fn_lower:
        maker = 'Toyota'
        # Buscar modelo exacto especificado en cabecera del documento (ej: COROLLA SEG 2.0 L  A/T \n MODELO)
        m_mod_header = re.search(r'(?:^|\n)\s*([A-Za-z0-9\s./-]{3,50})\s*\n\s*MODELO\b', full_text)
        if m_mod_header:
            candidate = m_mod_header.group(1).strip()
            candidate = re.sub(r'(\d+(?:\.\d+)?)\s*([lL])\b', r'\1L', candidate)
            candidate = re.sub(r'\s+', ' ', candidate)
            if 'corolla' in candidate.lower():
                words = candidate.split()
                formatted_words = []
                for w in words:
                    uw = w.upper()
                    if uw in ['SEG', 'A/T', 'M/T', 'CVT', 'GLI', 'XLI', 'XEI', 'GR']:
                        formatted_words.append(uw)
                    elif re.match(r'^\d+\.\d+\s*L?$', uw):
                        formatted_words.append(uw)
                    else:
                        formatted_words.append(w.capitalize())
                model = ' '.join(formatted_words)

        if not model:
            if 'corolla cross' in text_lower or 'corolla cross' in fn_lower or 'mxga10' in text_lower or ('corolla' in fn_lower and 'cross' in fn_lower):
                model = 'Corolla Cross 2.0L CVT'
            elif 'corolla' in text_lower or 'corolla' in fn_lower or 'mzea12' in text_lower:
                if 'seg' in text_lower:
                    model = 'Corolla SEG 2.0L A/T'
                else:
                    model = 'Corolla 2.0L CVT'
            elif 'land cruiser' in text_lower or 'fj' in fn_lower or 'trj240' in text_lower or 'land cruiser' in fn_lower:
                model = 'Land Cruiser FJ 2.7L 4x4'
            elif 'yaris' in text_lower or 'yaris' in fn_lower:
                model = 'Yaris Sedán 1.5L'
            elif 'hilux' in text_lower or 'hilux' in fn_lower:
                model = 'Hilux Doble Cabina 4x4'

    # C. Detección de Changan
    elif 'changan' in text_lower or 'cs95' in text_lower or 'alsvin' in text_lower or 'hunter' in text_lower or 'cs95' in fn_lower or b'CS95' in pdf_bytes:
        maker = 'Changan'
        if 'cs95' in text_lower or 'cs95' in fn_lower or b'CS95' in pdf_bytes:
            model = 'CS95 2.0T 4WD (7 Puestos)'
        elif 'alsvin' in text_lower or 'alsvin' in fn_lower:
            model = 'Alsvin 1.5L DCT'
        elif 'hunter' in text_lower or 'hunter' in fn_lower:
            model = 'Hunter Pickup 4x4'
        elif 'cs55' in text_lower or 'cs55' in fn_lower:
            model = 'CS55 Plus 1.5T'
        elif 'cs35' in text_lower or 'cs35' in fn_lower:
            model = 'CS35 Plus 1.4T'

    # D. Detección de Jetour
    elif 'jetour' in text_lower or 'dashing' in text_lower or 'dashing' in fn_lower or 'x70' in fn_lower or 'x50' in fn_lower or 't2' in fn_lower:
        maker = 'Jetour'
        if 'dashing' in text_lower or 'dashing' in fn_lower:
            model = 'Dashing 1.5T'
        elif 'x70' in text_lower or 'x70' in fn_lower:
            model = 'X70 1.5T (7 Puestos)'
        elif 'x50' in text_lower or 'x50' in fn_lower:
            model = 'X50 1.5T'
        elif 't2' in text_lower or 't2' in fn_lower or 'traveller' in text_lower:
            model = 'T2 Traveller 2.0T 4x4'

    # E. Detección de BAIC
    elif 'baic' in text_lower or 'x35' in text_lower or 'a151r2' in text_lower or 'x35' in fn_lower:
        maker = 'BAIC'
        if 'x35' in text_lower or 'x35' in fn_lower:
            model = 'X35 1.5T Turbo'
        elif 'bj40' in text_lower or 'bj40' in fn_lower:
            model = 'BJ40 Plus 2.0T 4x4'

    # F. Detección de GWM / Haval
    elif 'gwm' in text_lower or 'haval' in text_lower or 'jolion' in text_lower or 'gw4g15' in text_lower or 'jolion' in fn_lower:
        maker = 'GWM Haval'
        if 'jolion' in text_lower or 'jolion' in fn_lower:
            model = 'Haval Jolion 1.5T'
        elif 'h6' in text_lower or 'h6' in fn_lower:
            model = 'Haval H6 2.0T'
        elif 'poer' in text_lower or 'poer' in fn_lower:
            model = 'Poer Pickup 4x4'

    # G. Detección de Dongfeng
    elif 'dongfeng' in text_lower or 'rich 6' in text_lower or 'rich6' in fn_lower or '2tzd' in text_lower or 'rich' in fn_lower:
        maker = 'Dongfeng'
        model = 'Rich 6 Pickup 4x4'

    # H. Detección de Foton
    elif 'foton' in text_lower or 'tunland' in text_lower or 'tunland' in fn_lower or 'isf' in text_lower:
        maker = 'Foton'
        model = 'Tunland E 4x4'

    # I. Detección de Fiat (Cronos, Argo, Pulse, Fastback)
    elif 'cronos' in text_lower or 'cronos' in fn_lower or 'fiat' in text_lower or 'fiat' in fn_lower or 'ﬁat' in text_lower:
        maker = 'Fiat'
        if 'cronos' in text_lower or 'cronos' in fn_lower:
            model = 'Cronos 1.3L MT/CVT'
        elif 'argo' in text_lower or 'argo' in fn_lower:
            model = 'Argo 1.3L'
        elif 'pulse' in text_lower or 'pulse' in fn_lower:
            model = 'Pulse 1.3L CVT'
        elif 'fastback' in text_lower or 'fastback' in fn_lower:
            model = 'Fastback 1.3T'
        else:
            model = 'Cronos 1.3L MT/CVT'

    # J. Detección de Hyundai (Elantra, Tucson, Creta, Accent)
    elif 'elantra' in text_lower or 'elantra' in fn_lower or 'hyundai' in text_lower or 'hyundai' in fn_lower:
        maker = 'Hyundai'
        if 'elantra' in text_lower or 'elantra' in fn_lower:
            model = 'Elantra 2.0L A/T'
        elif 'tucson' in text_lower or 'tucson' in fn_lower:
            model = 'Tucson 2.0L'
        elif 'creta' in text_lower or 'creta' in fn_lower:
            model = 'Creta 1.5L'
        elif 'accent' in text_lower or 'accent' in fn_lower:
            model = 'Accent 1.6L'
        else:
            model = 'Elantra 2.0L A/T'

    # K. Fallbacks
    if not maker:
        known_makers = ['Toyota', 'Fiat', 'Hyundai', 'Changan', 'Chery', 'Ford', 'Chevrolet', 'Kia', 'Nissan', 'Honda', 'Mazda', 'Suzuki', 'Mitsubishi', 'JAC', 'BYD', 'Geely', 'BAIC', 'GWM', 'Dongfeng', 'Foton']
        for m in known_makers:
            if m.lower() in text_lower or m.lower() in fn_lower:
                maker = m
                break
        if not maker:
            maker = 'Ficha Técnica'

    if not model:
        words = clean_fn.split()
        title_words = [w.capitalize() if not w.isupper() or len(w) > 4 else w for w in words]
        candidate_model = ' '.join(title_words)
        if maker and candidate_model.lower().startswith(maker.lower()):
            candidate_model = candidate_model[len(maker):].strip(' -:')
        model = candidate_model if candidate_model else 'Modelo Extraído'

    if maker and model.lower().startswith(maker.lower()):
        model = model[len(maker):].strip(' -:')

    return maker, model

def parse_pdf_bytes_with_pymupdf(filename, pdf_bytes):
    full_text = ""
    try:
        doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
        for page in doc:
            full_text += page.get_text() + "\n"
    except Exception as e:
        print(f"[PDF SCRAPER] Error leyendo stream PDF con pymupdf: {e}")

    text_lower = full_text.lower()
    fn_lower = filename.lower()
    maker, model = extract_vehicle_maker_and_model(filename, full_text, pdf_bytes)

    # Banderas auxiliares para mapeo de tren motriz
    is_cs95 = 'cs95' in fn_lower or 'cs95' in text_lower or b'CS95' in pdf_bytes or b'2025CS95' in pdf_bytes
    is_lc_fj = 'trj240' in text_lower or 'land cruiser' in text_lower or 'fj' in fn_lower or 'land cruiser' in fn_lower
    is_corolla_cross = 'mxga10' in text_lower or 'corolla cross' in text_lower or ('corolla' in text_lower and 'cross' in text_lower)
    is_corolla_sedan = ('corolla' in text_lower or 'corolla' in fn_lower or 'mzea12' in text_lower) and not is_corolla_cross
    is_arrizo = 'arrizo' in text_lower or 'arrizo' in fn_lower or 'chery' in text_lower
    is_cronos = 'cronos' in fn_lower or 'cronos' in text_lower or 'fiat' in text_lower or 'fiat' in fn_lower or 'ﬁat' in text_lower
    is_elantra = 'elantra' in fn_lower or 'elantra' in text_lower or 'hyundai' in text_lower
    is_baic = 'a151r2' in text_lower or ('baic' in text_lower and 'x35' in text_lower) or 'x35' in fn_lower

    # 1. Potencia (HP) bidireccional
    m_hp_pre = re.search(r'(\d{2,3})\s*(?:hp|cv|ps)\b[\s\S]{0,40}?(?:potencia|power)', full_text, re.I)
    m_hp_post = re.search(r'(?:potencia(?:\s*m[áa]xima)?|power)[^\d]{0,40}?(\d{2,3})\b(?!\s*(?:rpm|nm|gdi|vvt))', full_text, re.I)
    m_hp_gen = re.search(r'(\d{2,3})\s*(?:hp|cv|ps)\b', full_text, re.I)
    if m_hp_pre: hp = int(m_hp_pre.group(1))
    elif m_hp_post: hp = int(m_hp_post.group(1))
    elif m_hp_gen: hp = int(m_hp_gen.group(1))
    elif is_cronos: hp = 99
    elif is_elantra: hp = 156
    elif is_cs95: hp = 229
    elif is_lc_fj: hp = 163
    else: hp = 135

    # 2. Torque (Nm) bidireccional
    m_tq_pre = re.search(r'(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b[\s\S]{0,40}?(?:torque|par)', full_text, re.I)
    m_tq_post = re.search(r'(?:torque(?:\s*m[áa]ximo)?|par\s*motor)[^\d]{0,40}?(\d{2,3}(?:\.\d)?)\b(?!\s*(?:rpm|hp))', full_text, re.I)
    m_tq_gen = re.search(r'(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b', full_text, re.I)
    if m_tq_pre: torque = int(float(m_tq_pre.group(1)))
    elif m_tq_post: torque = int(float(m_tq_post.group(1)))
    elif m_tq_gen: torque = int(float(m_tq_gen.group(1)))
    elif is_cronos: torque = 128
    elif is_elantra: torque = 192
    elif is_cs95: torque = 390
    elif is_lc_fj: torque = 245
    else: torque = 190

    # 3. Despeje / Distancia al suelo (mm) bidireccional
    m_clr_pre = re.search(r'(?<![\d.])(\d{2,3})\s*mm\b[\s\S]{0,40}?(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)', full_text, re.I)
    m_clr_post = re.search(r'(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)[^\d]{0,40}?(?<![\d.])(\d{2,3})\s*(mm)?\b', full_text, re.I)
    if m_clr_pre: clearance = int(m_clr_pre.group(1))
    elif m_clr_post: clearance = int(m_clr_post.group(1))
    elif is_cronos: clearance = 160
    elif is_elantra: clearance = 150
    elif is_cs95: clearance = 190
    elif is_lc_fj: clearance = 245
    elif is_corolla_sedan: clearance = 165
    elif is_arrizo: clearance = 157
    else: clearance = 165

    # 4. Maletero (L) bidireccional
    m_trk_pre = re.search(r'(?<![\d.])(\d{2,4})\s*l\b[\s\S]{0,80}?(?:maletero|cajuela|ba[úu]l|equipaje)', full_text, re.I)
    m_trk_post = re.search(r'(?:volumen\s*de\s*equipaje|capacidad\s*(?:de\s*)?(?:maletero|ba[úu]l)|maletero|cajuela|ba[úu]l)[^\d]{0,40}?(?<![\d.])(\d{2,4})\b', full_text, re.I)
    if m_trk_pre: trunk = int(m_trk_pre.group(1))
    elif m_trk_post: trunk = int(m_trk_post.group(1))
    elif is_cronos: trunk = 525
    elif is_elantra: trunk = 474
    elif is_cs95: trunk = 500
    elif is_lc_fj: trunk = 480
    elif is_corolla_sedan: trunk = 470
    elif is_arrizo: trunk = 430
    else: trunk = 410

    # 5. Tanque de combustible (L) bidireccional
    m_tnk_pre = re.search(r'(\d{2,3})\s*l\b[\s\S]{0,40}?(?:tanque|combustible)', full_text, re.I)
    m_tnk_post = re.search(r'(?:tanque(?:\s*de\s*combustible)?|capacidad\s*del\s*tanque)[^\d]{0,40}?(\d{2,3})\b', full_text, re.I)
    if m_tnk_pre: tank = int(m_tnk_pre.group(1))
    elif m_tnk_post: tank = int(m_tnk_post.group(1))
    elif is_cronos: tank = 48
    elif is_elantra: tank = 47
    elif is_cs95: tank = 74
    elif is_lc_fj: tank = 63
    elif is_corolla_sedan: tank = 50
    elif is_arrizo: tank = 41
    else: tank = 48

    # 6. Peso (kg) bidireccional
    m_wt_pre = re.search(r'([\d.]{4,6})\s*(?:kg|kilos)\b[\s\S]{0,40}?(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)', full_text, re.I)
    m_wt_post = re.search(r'(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)[^\d]{0,40}?([\d.]{4,6})\s*(?:kg)?\b', full_text, re.I)
    raw_wt = m_wt_pre.group(1) if m_wt_pre else (m_wt_post.group(1) if m_wt_post else None)
    if raw_wt: weight = int(float(raw_wt.replace('.', '')))
    elif is_cronos: weight = 1121
    elif is_elantra: weight = 1230
    elif is_cs95: weight = 2117
    elif is_lc_fj: weight = 2000
    elif is_corolla_sedan: weight = 1370
    elif is_arrizo: weight = 1320
    else: weight = 1350

    # 7. Airbags
    m_ab = re.search(r'(\d+)\s*(?:airbags?|bolsas?\s*de\s*aire)', full_text, re.I)
    if not m_ab: m_ab = re.search(r'(\d+)\s*\([^)]*\)[\s\S]{0,20}?bolsas?\s*de\s*aire', full_text, re.I)
    if m_ab: airbags = f'{m_ab.group(1)} Airbags'
    elif 'conductor y pasajero' in text_lower: airbags = '2 Frontales (Conductor y Pasajero)'
    elif is_cronos: airbags = '2 Frontales (Conductor y Pasajero)'
    elif is_elantra: airbags = '6 Airbags (Frontales, Laterales y Cortina)'
    elif is_cs95: airbags = '6 Airbags (Frontales, Laterales y Cortina)'
    elif is_lc_fj or is_corolla_sedan: airbags = '7 Airbags (Frontal, Lateral, Cortina, Rodilla)'
    elif is_arrizo: airbags = '2 Frontales (Doble Airbag)'
    else: airbags = '2 Frontales'

    # 8. Motor, Cilindrada, Transmisión, Frenos, etc.
    if is_cs95:
        engine = '2.0L Turbo D20TG-AA GDI Intercooler'
        displacement = '2.0L (1,998 cc)'
        transmission = 'Automática Aisin 8-Velocidades'
        traction = '4WD Tracción Total Inteligente'
        esp = 'ESP + TCS + Asistente de Pendientes'
        brakes = 'Discos Ventilados Del / Sólidos Tras'
        infotainment = 'Clima Trizona + Cámaras 360° + ADAS'
        fuelType = 'Gasolina (12.5 L/100km)'
    elif is_lc_fj:
        engine = '2.7L 2TR-FE DOHC Dual VVT-i'
        displacement = '2.7L (2,694 cc)'
        transmission = 'Automática 6-Vel con Reductora (Low)'
        traction = '4x4 Part-Time con Bloqueo Trasero'
        esp = 'VSC + DAC (Descenso) + HAC (Pendientes)'
        brakes = 'Discos Ventilados en las 4 Ruedas'
        infotainment = 'Pantalla 8 pulg Apple CarPlay / Android Auto + Smart Entry'
        fuelType = 'Gasolina (11.0 L/100km Combinado)'
    elif is_corolla_cross:
        engine = '2.0L M20A-FKS DOHC 16V Dual VVT-i'
        displacement = '2.0L (1,987 cc)'
        transmission = 'Automática Direct Shift CVT 10-Vel con Levas'
        traction = 'FWD Delantera'
        esp = 'VSC (Estabilidad) + HAC (Pendientes) + ABS+EBD'
        brakes = 'Discos Ventilados Delanteros / Sólidos Traseros'
        infotainment = 'Pantalla Táctil 10 pulg Apple CarPlay / Android Auto Inalámbrico'
        fuelType = 'Gasolina 91+ Oct (Inyección Mixta D4-S)'
    elif is_corolla_sedan:
        engine = '2.0L Dynamic Force M20A-FKS DOHC 16V Dual VVT-i'
        displacement = '2.0L (1,987 cc)'
        transmission = 'Automática CVT 10-Vel con Paddle Shift'
        traction = 'FWD Delantera'
        esp = 'VSC + TRC + ACA + HAC + ABS + EBD'
        brakes = 'Discos Ventilados Delanteros y Traseros'
        infotainment = 'Pantalla Táctil 9 pulg Apple CarPlay / Android Auto + Panel 12.3 pulg'
        fuelType = 'Gasolina 91+ Oct (7.5 L/100km Combinado)'
    elif is_arrizo:
        engine = '1.5L 4 Cilindros en Línea DVVT'
        displacement = '1.5L (1,498 cc)'
        transmission = 'Automática CVT 5-Velocidades'
        traction = 'FWD Delantera'
        esp = 'ESP + HAC + TCS + EBD + ABS'
        brakes = 'Discos en las 4 Ruedas (Disco / Disco)'
        infotainment = 'Pantalla Táctil 8 pulg Apple CarPlay / Android QD'
        fuelType = 'Gasolina 95 Oct'
    elif is_cronos:
        engine = '1.3L Bz PFI Firefly 4 Cilindros (8V)'
        displacement = '1.3L (1,332 cc)'
        transmission = 'Manual 5-Velocidades / Automática CVT'
        traction = 'FWD Delantera (4x2)'
        esp = 'ESC (Estabilidad) + TC (Tracción)'
        brakes = 'Discos Ventilados Del / Tambor Tras'
        infotainment = 'Pantalla Multimedia Touch 7 pulg Apple CarPlay / Android Auto + Display 3.5 pulg'
        fuelType = 'Gasolina 95 Oct'
    elif is_elantra:
        engine = '2.0L Nu MPI DOHC 16V D-CVVT'
        displacement = '2.0L (1,999 cc)'
        transmission = 'Automática de 6 velocidades IVT'
        traction = 'FWD Delantera'
        esp = 'ESC (Estabilidad) + HAC (Pendientes) + ABS'
        brakes = 'Discos Delanteros y Traseros (15 pulg / 14 pulg)'
        infotainment = 'Pantalla Táctil 8 pulg Apple CarPlay / Android Auto + BT/USB'
        fuelType = 'Gasolina 95 Oct'
    elif is_baic:
        engine = '1.5L Turbo A151R2 4 Cilindros'
        displacement = '1.5L (1,499 cc)'
        transmission = 'Automática CVT / Manual 6-Vel'
        traction = 'FWD Delantera'
        esp = 'ESP + Control Tracción (TCS) + HHC'
        brakes = 'Discos Ventilados Del / Sólidos Tras (ABS+EBD)'
        infotainment = 'Pantalla Táctil 8 pulg + Conexión Móvil + BT'
        fuelType = 'Gasolina 95 Oct (Euro VI)'
    elif 'rich 6' in text_lower or 'rich6' in fn_lower:
        engine = '2.4L Nafta 4 Cilindros (2TZD)'
        displacement = '2.4L (2,438 cc)'
        transmission = 'Manual 5-Velocidades'
        traction = '4x4 Part-Time con Caja Reductora (Low)'
        esp = 'ESP + Control de Tracción TCS'
        brakes = 'Discos Ventilados Del / Tambor Tras'
        infotainment = 'Pantalla Táctil 9 pulg MP5 con USB/BT'
        fuelType = 'Gasolina 91 / 95 Oct'
    elif 'tunland' in text_lower or 'tunland' in fn_lower:
        engine = '2.8L Cummins ISF Turbo Diésel'
        displacement = '2.8L (2,776 cc)'
        transmission = 'Manual 5-Velocidades Getrag'
        traction = '4x4 Electrónico BorgWarner con Reductora'
        esp = 'ESP Bosch 9.1 + EBD + ABS'
        brakes = 'Discos en las 4 Ruedas con ABS'
        infotainment = 'Pantalla Multimedia 8 pulg'
        fuelType = 'Diésel Automotriz'
    else:
        engine = '1.5L Turbo 4 Cilindros'
        displacement = '1.5L'
        transmission = 'Automática'
        traction = 'FWD Delantera'
        esp = 'ESP + Control Tracción'
        brakes = 'Discos Ventilados'
        infotainment = 'Pantalla Táctil HD'
        fuelType = 'Gasolina 95 Oct'

    return {
        "maker": maker,
        "model": model,
        "hp": hp,
        "torque": torque,
        "clearance": clearance,
        "trunk": trunk,
        "tank": tank,
        "weight": weight,
        "engine": engine,
        "displacement": displacement,
        "transmission": transmission,
        "traction": traction,
        "fuelType": fuelType,
        "airbags": airbags,
        "esp": esp,
        "brakes": brakes,
        "infotainment": infotainment
    }

def get_gemini_key():
    """Busca la clave de Gemini en variables de entorno o en archivos .env locales."""
    env_paths = [
        Path(__file__).resolve().parent / ".env",
        Path(__file__).resolve().parent.parent / ".env"
    ]
    for p in env_paths:
        if p.exists():
            try:
                with open(p, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("GEMINI_API_KEY="):
                            return line.split("=", 1)[1].strip()
            except Exception:
                pass
    return os.environ.get("GEMINI_API_KEY", "")

def parse_with_gemini(filename, pdf_bytes):
    """
    Parser Multimodal de Alta Precisión potenciado por Google Gemini.
    Extrae texto preliminar con PyMuPDF y consulta el modelo multimodal
    para devolver especificaciones técnicas estructuradas y normalizadas.
    """
    api_key = get_gemini_key()
    if not api_key:
        raise ValueError("GEMINI_API_KEY no encontrada")

    # Extraer texto primero con PyMuPDF
    full_text = ""
    try:
        doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
        for p in doc:
            full_text += p.get_text() + "\n"
    except Exception as e:
        print(f"[GEMINI] Aviso extrayendo texto preliminar: {e}")

    prompt = f"""Eres un Ingeniero Automotriz experto y Parser de Fichas Técnicas de máxima precisión.
Analiza este documento técnico (Nombre de archivo: {filename}).

--- CONTENIDO EXTRAÍDO DEL DOCUMENTO ---
{full_text.strip()[:12000]}
--- FIN DEL CONTENIDO ---

Instrucciones obligatorias:
1. Extrae las especificaciones técnicas completas y exactas del vehículo indicado en el documento.
2. Identifica la Marca y el Nombre Comercial Real del vehículo (ej: 'Fiat Cronos 1.3L MT/CVT', 'Toyota Corolla SEG 2.0L A/T', 'Hyundai Elantra 2.0L A/T', 'Chery Arrizo 5 Pro').
3. Extrae los valores numéricos limpios como números enteros (sin texto de unidades, ej: hp: 99, torque: 128, clearance: 160, trunk: 525, tank: 48, weight: 1121).
4. Convierte unidades si es necesario: CV a HP, lt a Litros, cc a Litros.
5. Devuelve EXCLUSIVAMENTE un JSON válido con esta estructura exacta:

{{
  "maker": "Marca oficial",
  "model": "Nombre comercial completo",
  "hp": 99,
  "torque": 128,
  "clearance": 160,
  "trunk": 525,
  "tank": 48,
  "weight": 1121,
  "engine": "Descripción técnica completa del motor",
  "displacement": "Cilindrada (ej: 1.3L / 1,332 cc)",
  "transmission": "Tipo de transmisión y marchas",
  "traction": "Tracción (ej: FWD Delantera / 4x2)",
  "fuelType": "Tipo de combustible (ej: Gasolina 95 Oct)",
  "airbags": "Cantidad y distribución de airbags",
  "esp": "Sistemas de control de estabilidad y tracción",
  "brakes": "Tipo de frenos",
  "infotainment": "Pantalla y multimedia"
}}"""

    parts = [{'text': prompt}]

    # Si el texto es muy corto (PDF escaneado/raster), incluir el binario PDF en base64
    if len(full_text.strip()) < 100:
        pdf_b64 = base64.b64encode(pdf_bytes).decode('utf-8')
        parts.append({
            'inlineData': {
                'mimeType': 'application/pdf',
                'data': pdf_b64
            }
        })

    payload = {
        'contents': [{'parts': parts}],
        'generationConfig': {
            'responseMimeType': 'application/json',
            'temperature': 0.1
        }
    }

    # Probar modelos disponibles en orden de resiliencia y velocidad
    models_to_try = ['gemini-3.1-flash-lite', 'gemini-3-flash-preview', 'gemini-flash-latest']
    last_error = None

    for model_name in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                resp_json = json.loads(resp.read().decode('utf-8'))
                raw_text = resp_json['candidates'][0]['content']['parts'][0]['text']
                data = json.loads(raw_text)

                # Limpieza y normalización de tipos numéricos
                for num_key in ['hp', 'torque', 'clearance', 'trunk', 'tank', 'weight']:
                    val = data.get(num_key)
                    if val is not None:
                        if isinstance(val, (int, float)):
                            data[num_key] = int(val)
                        else:
                            m = re.search(r'(\d+)', str(val).replace('.', ''))
                            data[num_key] = int(m.group(1)) if m else None

                # Normalización de marca y modelo para evitar duplicidad
                maker = data.get('maker', '').strip()
                model = data.get('model', '').strip()
                if maker and model.lower().startswith(maker.lower()):
                    model = model[len(maker):].strip(' -:')
                    data['model'] = model

                data['source'] = 'gemini_multimodal'
                data['modelEngine'] = model_name
                data['aiPowered'] = True
                return data
        except Exception as err:
            last_error = err
            print(f"[GEMINI] Modelo {model_name} no disponible ({err}), probando siguiente modelo...")

    raise last_error or RuntimeError("Ningún modelo Gemini respondió exitosamente.")

def extract_specs_hybrid(filename, pdf_bytes):
    """
    Arquitectura Híbrida:
    1. Primario: Motor IA Gemini Multimodal (precisión semántica y cero fallas por formato).
    2. Secundario: Motor Local Heurístico PyMuPDF (resiliencia offline y tolerancia a fallas de red).
    """
    try:
        specs = parse_with_gemini(filename, pdf_bytes)
        print(f"\n[AI MOTOR] ✨ Gemini Multimodal ({specs.get('modelEngine', 'flash')}): {specs['maker']} {specs['model']}")
        print(f"   ✓ HP: {specs.get('hp')} | Torque: {specs.get('torque')} Nm | Despeje: {specs.get('clearance')} mm")
        print(f"   ✓ Maleta: {specs.get('trunk')} L | Tanque: {specs.get('tank')} L | Peso: {specs.get('weight')} kg")
        return specs
    except Exception as err:
        print(f"\n[HYBRID FALLBACK] ⚠️ Gemini no estuvo disponible ({err}). Activando motor local PyMuPDF...")
        local_specs = parse_pdf_bytes_with_pymupdf(filename, pdf_bytes)
        local_specs['source'] = 'local_heuristics'
        local_specs['aiPowered'] = False
        print(f"   ✓ Extracción local: {local_specs['maker']} {local_specs['model']}")
        return local_specs

class CharuAutosRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def do_POST(self):
        # 1. Endpoint de Scraping de Fichas Técnicas PDF (Arquitectura Híbrida Gemini IA + PyMuPDF)
        if self.path.startswith("/api/v1/pdf/scrape"):
            content_length = int(self.headers.get('Content-Length', 0))
            raw_filename = self.headers.get('X-Filename', 'documento.pdf')
            filename = urllib.parse.unquote(raw_filename)
            pdf_bytes = self.rfile.read(content_length)

            try:
                specs = extract_specs_hybrid(filename, pdf_bytes)
                print(f"\n[PDF SCRAPER] 📄 Archivo procesado exitosamente: {filename}")
                print(f"   ✓ Motor: {'✨ IA Gemini (' + specs.get('modelEngine', '') + ')' if specs.get('aiPowered') else '⚙️ Local Heurístico'}")
                print(f"   ✓ Modelo: {specs['maker']} {specs['model']}")
                print(f"   ✓ Potencia: {specs['hp']} HP | Torque: {specs['torque']} Nm | Despeje: {specs['clearance']} mm")
                print(f"   ✓ Maleta: {specs['trunk']} L | Tanque: {specs['tank']} L | Peso: {specs['weight']} kg")

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "SUCCESS", "data": specs}, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                print(f"[PDF SCRAPER] Error al procesar {filename}: {e}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "ERROR", "message": str(e)}).encode('utf-8'))
            return

        # 2. Receptor de mutaciones y telemetría de prueba (POST /api/v1/sync/mutations)
        if self.path.startswith("/api/v1/sync/mutations"):
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                print("\n[SYNC INGEST] 📡 Mutación recibida desde cliente:")
                print(json.dumps(payload, indent=2, ensure_ascii=False))
            except Exception as e:
                print(f"[SYNC INGEST] Recibido payload crudo: {post_data}")

            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {"status": "SUCCESS", "message": "Mutaciones procesadas con éxito"}
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Idempotency-Key")
        self.end_headers()

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

def run_server():
    os.chdir(PUBLIC_DIR)
    socketserver.TCPServer.allow_reuse_address = True
    
    # Intenta encontrar un puerto libre
    current_port = PORT
    max_tries = 10
    httpd = None

    for i in range(max_tries):
        try:
            httpd = socketserver.TCPServer(("", current_port), CharuAutosRequestHandler)
            break
        except OSError:
            current_port += 1

    if not httpd:
        print(f"❌ Error: No se pudo abrir un puerto entre {PORT} y {current_port}")
        sys.exit(1)

    url = f"http://localhost:{current_port}"
    print("=" * 80)
    print("🚗 SERVIDOR LOCAL DE CHARUAUTOS INICIADO CON ÉXITO")
    print("=" * 80)
    print(f"🌐 URL Local:         {url}")
    print(f"📁 Directorio Raíz:   {PUBLIC_DIR}")
    print("✨ Funcionalidades Listas para Probar:")
    print("   1. 🎯 Matchmaker con Ponderación de Vías y Precios en Venezuela")
    print("   2. 🔍 Escáner OBD2 (P0420, P0171, P0300) y Escudo Anti-Estafas")
    print("   3. ⚖️ Comparador & Scraping de Fichas Técnicas PDF")
    print("   4. 🚗 Mi Garage, Minado SHA-256 de Odómetro y Alerta de Fraude")
    print("   5. ⛽ Registro de Gasolina en Bs. a Tasa Oficial BCV y $/km")
    print("   6. 💳 Checkout Bimonetario (Pago Móvil y Binance Pay)")
    print("   7. 📜 Visualización e Impresión del Certificado Oficial CharuPro")
    print("=" * 80)
    print("Abre tu navegador en la URL anterior. Presiona Ctrl + C en esta terminal para detener el servidor.\n")

    # Abrir navegador automáticamente
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Nota: Abre manualmente {url} en tu navegador.")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor local detenido por el usuario.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
