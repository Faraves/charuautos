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
    # Limpieza base del filename
    clean_fn = re.sub(r'\.pdf$', '', filename, flags=re.I)
    clean_fn = re.sub(r'^[a-f0-9]{16,64}[_\s-]*', '', clean_fn, flags=re.I)
    clean_fn = re.sub(r'^\d{6,}[_\s-]*', '', clean_fn)
    clean_fn = re.sub(r'(?i)\b(f\.?t\.?|ficha(?:\s*t[eé]cnica)?|brochure|cat[aá]logo|catalogo|compressed|compreso|comprimido|copia|copy|\(\d+\)|v\d+)\b', '', clean_fn)
    clean_fn = re.sub(r'([a-zA-Z]+)(\d{4})\b', r'\1 \2', clean_fn)
    clean_fn = re.sub(r'[-_]', ' ', clean_fn)
    clean_fn = re.sub(r'\s+', ' ', clean_fn).strip()

    # Extraer el primer par de palabras del filename como Maker y el resto como Model de forma genérica
    words = clean_fn.split()
    maker = 'No Especificado'
    model = 'Modelo Extraído'
    
    if len(words) > 0:
        maker = words[0].capitalize()
        title_words = [w.capitalize() if not w.isupper() or len(w) > 4 else w for w in words]
        candidate_model = ' '.join(title_words)
        if candidate_model.lower().startswith(maker.lower()):
            candidate_model = candidate_model[len(maker):].strip(' -:')
        model = candidate_model if candidate_model else 'Modelo Extraído'

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

    # 1. Potencia (HP) bidireccional
    m_hp_pre = re.search(r'(\d{2,3})\s*(?:hp|cv|ps)\b[\s\S]{0,40}?(?:potencia|power)', full_text, re.I)
    m_hp_post = re.search(r'(?:potencia(?:\s*m[áa]xima)?|power)[^\d]{0,40}?(\d{2,3})\b(?!\s*(?:rpm|nm|gdi|vvt))', full_text, re.I)
    m_hp_gen = re.search(r'(\d{2,3})\s*(?:hp|cv|ps)\b', full_text, re.I)
    hp = None
    if m_hp_pre: hp = int(m_hp_pre.group(1))
    elif m_hp_post: hp = int(m_hp_post.group(1))
    elif m_hp_gen: hp = int(m_hp_gen.group(1))

    # 2. Torque (Nm) bidireccional
    m_tq_pre = re.search(r'(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b[\s\S]{0,40}?(?:torque|par)', full_text, re.I)
    m_tq_post = re.search(r'(?:torque(?:\s*m[áa]ximo)?|par\s*motor)[^\d]{0,40}?(\d{2,3}(?:\.\d)?)\b(?!\s*(?:rpm|hp))', full_text, re.I)
    m_tq_gen = re.search(r'(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m)\b', full_text, re.I)
    torque = None
    if m_tq_pre: torque = int(float(m_tq_pre.group(1)))
    elif m_tq_post: torque = int(float(m_tq_post.group(1)))
    elif m_tq_gen: torque = int(float(m_tq_gen.group(1)))

    # 3. Despeje / Distancia al suelo (mm) bidireccional
    m_clr_pre = re.search(r'(?<![\d.])(\d{2,3})\s*mm\b[\s\S]{0,40}?(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)', full_text, re.I)
    m_clr_post = re.search(r'(?:despeje(?:\s*m[íi]nimo)?(?:\s*del\s*suelo)?|distancia\s*al\s*(?:suelo|piso)|altura\s*libre)[^\d]{0,40}?(?<![\d.])(\d{2,3})\s*(mm)?\b', full_text, re.I)
    clearance = None
    if m_clr_pre: clearance = int(m_clr_pre.group(1))
    elif m_clr_post: clearance = int(m_clr_post.group(1))

    # 4. Maletero (L) bidireccional
    m_trk_pre = re.search(r'(?<![\d.])(\d{2,4})\s*l\b[\s\S]{0,80}?(?:maletero|cajuela|ba[úu]l|equipaje)', full_text, re.I)
    m_trk_post = re.search(r'(?:volumen\s*de\s*equipaje|capacidad\s*(?:de\s*)?(?:maletero|ba[úu]l)|maletero|cajuela|ba[úu]l)[^\d]{0,40}?(?<![\d.])(\d{2,4})\b', full_text, re.I)
    trunk = None
    if m_trk_pre: trunk = int(m_trk_pre.group(1))
    elif m_trk_post: trunk = int(m_trk_post.group(1))

    # 5. Tanque de combustible (L) bidireccional
    m_tnk_pre = re.search(r'(\d{2,3})\s*l\b[\s\S]{0,40}?(?:tanque|combustible)', full_text, re.I)
    m_tnk_post = re.search(r'(?:tanque(?:\s*de\s*combustible)?|capacidad\s*del\s*tanque)[^\d]{0,40}?(\d{2,3})\b', full_text, re.I)
    tank = None
    if m_tnk_pre: tank = int(m_tnk_pre.group(1))
    elif m_tnk_post: tank = int(m_tnk_post.group(1))

    # 6. Peso (kg) bidireccional
    m_wt_pre = re.search(r'([\d.]{4,6})\s*(?:kg|kilos)\b[\s\S]{0,40}?(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)', full_text, re.I)
    m_wt_post = re.search(r'(?:peso\s*(?:neto|en\s*vac[íi]o|en\s*orden)|curb\s*weight)[^\d]{0,40}?([\d.]{4,6})\s*(?:kg)?\b', full_text, re.I)
    raw_wt = m_wt_pre.group(1) if m_wt_pre else (m_wt_post.group(1) if m_wt_post else None)
    weight = None
    if raw_wt: weight = int(float(raw_wt.replace('.', '')))

    # 7. Airbags
    m_ab = re.search(r'(\d+)\s*(?:airbags?|bolsas?\s*de\s*aire)', full_text, re.I)
    if not m_ab: m_ab = re.search(r'(\d+)\s*\([^)]*\)[\s\S]{0,20}?bolsas?\s*de\s*aire', full_text, re.I)
    airbags = 'No Especificado'
    if m_ab: airbags = f'{m_ab.group(1)} Airbags'
    elif 'conductor y pasajero' in text_lower: airbags = '2 Frontales (Conductor y Pasajero)'

    # 8. Motor, Cilindrada, Transmisión, Frenos genéricos
    engine = 'No Especificado'
    m_eng = re.search(r'(\d\.\d[L|l][\s\S]{0,30}?(?:turbo|dohc|sohc|mpi|gdi|vvt|cilindros))', full_text, re.I)
    if m_eng: engine = m_eng.group(1).strip()

    displacement = 'No Especificado'
    m_disp = re.search(r'(\d\.\d[L|l])', full_text, re.I)
    if m_disp: displacement = m_disp.group(1).strip()

    transmission = 'No Especificado'
    if 'cvt' in text_lower: transmission = 'Automática CVT'
    elif 'dct' in text_lower or 'doble embrague' in text_lower: transmission = 'Doble Embrague (DCT)'
    elif 'automática' in text_lower or 'aut' in text_lower: transmission = 'Automática'
    elif 'manual' in text_lower or 'mecánica' in text_lower or 'sincrónica' in text_lower: transmission = 'Manual'

    traction = 'FWD Delantera'
    if '4x4' in text_lower or '4wd' in text_lower or 'awd' in text_lower: traction = '4x4 / AWD'

    esp = 'No Especificado'
    if 'esp' in text_lower or 'esc' in text_lower or 'vsc' in text_lower: esp = 'Equipado con Control de Estabilidad'

    brakes = 'No Especificado'
    if 'disco' in text_lower: brakes = 'Frenos de Disco'
    
    infotainment = 'No Especificado'
    if 'pantalla' in text_lower or 'tactil' in text_lower or 'touch' in text_lower: infotainment = 'Pantalla Táctil'
    
    fuelType = 'Gasolina'
    if 'diesel' in text_lower or 'diésel' in text_lower: fuelType = 'Diésel'

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
