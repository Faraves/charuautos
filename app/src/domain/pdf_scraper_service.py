import sys
import io
import re

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

"""
Microservicio de Scraping y Extracción de Fichas Técnicas PDF (CharuAutos App)
Diseñado para procesar brochures de fabricantes y fichas técnicas adjuntas por usuarios.
"""

def extract_vehicle_specs_from_text(raw_text: str, filename: str = "ficha_tecnica.pdf"):
    print(f"📄 Procesando documento: '{filename}' ({len(raw_text)} caracteres)...")
    
    extracted = {}
    
    # 1. Cilindrada (Litros o cc)
    disp = re.search(r'(?:motor|cilindrada|desplazamiento)?\s*(\d\.\d)\s*(?:l|litros|dohc|sohc|vvt-i)?', raw_text, re.IGNORECASE)
    if disp:
        extracted['cilindrada_l'] = float(disp.group(1))

    # 2. Potencia (HP)
    hp = re.search(r'(\d{2,3})\s*(?:hp|cv|caballos|fuerza|potencia)', raw_text, re.IGNORECASE)
    if hp:
        extracted['potencia_hp'] = int(hp.group(1))

    # 3. Torque (Nm)
    torque = re.search(r'(\d{2,3}(?:\.\d)?)\s*(?:nm|n\.m|newton)', raw_text, re.IGNORECASE)
    if torque:
        extracted['torque_nm'] = float(torque.group(1))

    # 4. Despeje libre al suelo (mm o cm)
    clearance = re.search(r'(?:despeje|altura(?:\s*libre)?(?:\s*al\s*suelo)?|distancia(?:\s*al\s*piso)?)[^\d]*(\d{2,3})\s*(mm|cm)', raw_text, re.IGNORECASE)
    if clearance:
        val = int(clearance.group(1))
        if clearance.group(2).lower() == 'cm':
            val *= 10
        extracted['despeje_suelo_mm'] = val

    # 5. Capacidad de Baúl / Maletero (Litros)
    trunk = re.search(r'(?:maletero|cajuela|baúl|baul|área(?:\s*de\s*carga)?)[^\d]*(\d{2,4})\s*(?:l|litros)', raw_text, re.IGNORECASE)
    if trunk:
        extracted['maletero_litros'] = int(trunk.group(1))

    # 6. Transmisión
    t_lower = raw_text.lower()
    if 'cvt' in t_lower:
        extracted['transmision'] = 'CVT'
    elif 'automátic' in t_lower or 'automatica' in t_lower:
        extracted['transmision'] = 'Automática'
    elif 'manual' in t_lower or 'sincrónica' in t_lower:
        extracted['transmision'] = 'Manual'

    # 7. Mecanismo de distribución
    if 'cadena' in t_lower:
        extracted['distribucion'] = 'Cadena de tiempo'
    elif 'correa' in t_lower or 'banda' in t_lower:
        extracted['distribucion'] = 'Correa dentada'

    return extracted

if __name__ == "__main__":
    print("=" * 65)
    print("🤖 CHARUAUTOS — DEMO DE SCRAPING DE FICHA TÉCNICA (PDF ADJUNTO)")
    print("=" * 65)

    # Texto simulado típico de una ficha técnica en PDF de un concesionario (ej. Dongfeng Shine Max / Changan Hunter)
    sample_pdf_text = """
    FICHA TÉCNICA OFICIAL — DONGFENG SHINE MAX SEDÁN 2024
    MOTOR Y TRANSMISIÓN:
    Motor 1.5L Turbo Mach Power Gasolina de Inyección Directa.
    Potencia máxima de 190 HP @ 5200 rpm.
    Torque neto del motor: 300 Nm entre 2000 y 4000 rpm.
    Mecanismo de distribución accionado por cadena silenciosa.
    Transmisión automática de doble embrague húmedo 7DCT.
    
    DIMENSIONES Y CAPACIDADES:
    Largo x Ancho x Alto: 4797 x 1870 x 1475 mm.
    Distancia libre al suelo (despeje): 155 mm.
    Capacidad del maletero: 480 litros de volumen de carga.
    Capacidad del tanque de combustible: 52 litros.
    Peso neto vehicular: 1486 kg.
    """

    specs = extract_vehicle_specs_from_text(sample_pdf_text, "Dongfeng_ShineMax_2024_Ficha.pdf")
    
    print("\n🔍 ESPECIFICACIONES AUTOMÁTICAMENTE EXTRAÍDAS Y NORMALIZADAS:")
    for k, v in specs.items():
        print(f"  • {k.replace('_', ' ').title()}: {v}")

    print("\n⚖️ COMPARACIÓN INSTANTÁNEA CONTRA BASE DE DATOS CANÓNICA:")
    print("  Dongfeng Shine Max (Ficha PDF) vs. Toyota Corolla 1.8 (Seed VE):")
    print(f"  - Potencia:  {specs.get('potencia_hp', 0)} HP  VS  132 HP (Corolla)")
    print(f"  - Torque:    {specs.get('torque_nm', 0)} Nm  VS  170 Nm (Corolla)")
    print(f"  - Despeje:   {specs.get('despeje_suelo_mm', 0)} mm  VS  160 mm (Corolla)")
    print(f"  - Maletero:  {specs.get('maletero_litros', 0)} L   VS  450 L (Corolla)")
    print(f"  - Cadena:    {specs.get('distribucion')}  VS  Cadena (Corolla)")

    print("\n" + "=" * 65)
    print("✅ SCRAPING Y NORMALIZACIÓN COMPLETADOS EXITOSAMENTE")
    print("=" * 65)
