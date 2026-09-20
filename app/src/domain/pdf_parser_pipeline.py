# -*- coding: utf-8 -*-
"""
Módulo de Extracción y Normalización Dinámica de Fichas Técnicas (PDF Parser Pipeline)
CharuAutos Platform - Pipeline de Ingesta Inteligente Multimodal

Este módulo define los contratos Pydantic v2, la ontología de sinónimos automotrices,
la normalización determinista de unidades y los guardrails dimensionales.
"""

import sys
import os
import io
import re
import json
import time
import logging
from typing import List, Optional, Literal, Dict, Any, Tuple

if sys.platform == "win32":
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    except Exception:
        pass

# ==============================================================================
# INTEGRACIÓN OFICIAL GOOGLE GENERATIVE AI (GEMINI MULTIMODAL API)
# ==============================================================================
try:
    import google.generativeai as genai
    GENAI_AVAILABLE = True
except ImportError:
    genai = None
    GENAI_AVAILABLE = False

try:
    from pydantic import BaseModel, Field, field_validator, model_validator
    PYDANTIC_AVAILABLE = True
except ImportError:
    PYDANTIC_AVAILABLE = False
    class BaseModel:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)
        def model_dump(self):
            return self.__dict__
        def dict(self):
            return self.__dict__
    def Field(default=None, **kwargs):
        return default
    def field_validator(*args, **kwargs):
        def dec(fn): return fn
        return dec
    def model_validator(*args, **kwargs):
        def dec(fn): return fn
        return dec

# ==============================================================================
# 1. TAXONOMÍA Y ENUMS AUTOMOTRICES CANÓNICOS
# ==============================================================================

DrivetrainType = Literal["FWD", "RWD", "AWD", "4WD_PART_TIME", "4WD_FULL_TIME", "DESCONOCIDO"]
TransmissionCategory = Literal["MANUAL", "AUTOMATICA_CONVENCIONAL", "CVT", "DOBLE_EMBRAGUE_DCT", "AUTOMATIZADA_AMT", "ELECTRICA_DIRECTA"]
FuelCategory = Literal["GASOLINA", "DIESEL", "HIBRIDO_MHEV", "HIBRIDO_HEV", "HIBRIDO_ENCHUFABLE_PHEV", "100_ELECTRICO_BEV", "GAS_GNV_GLP"]
DistributionMechanism = Literal["CADENA_DE_TIEMPO", "CORREA_DENTADA", "ENGRANAJES", "DESCONOCIDO"]

AUTOMOTIVE_SYNONYM_ONTOLOGY = {
    "ground_clearance_mm": [
        "despeje", "despeje mínimo del suelo", "distancia libre al piso",
        "distancia al suelo", "distancia al piso", "altura libre al suelo",
        "altura al piso", "ground clearance", "ride height", "despeje mínimo"
    ],
    "trunk_capacity_liters": [
        "volumen de equipaje", "capacidad de maletero", "cajuela",
        "baúl", "baul", "capacidad de baúl", "área de carga", "espacio de carga",
        "cargo capacity", "luggage compartment", "trunk volume", "maletero"
    ],
    "power_hp": [
        "potencia máxima", "potencia neta", "caballos de fuerza",
        "potencia (hp)", "potencia (cv)", "potencia (ps)", "maximum power",
        "output hp", "potencia motor", "potencia"
    ],
    "torque_nm": [
        "torque máximo", "torque neto", "par motor", "par máximo",
        "momento de torsión", "torque (nm)", "peak torque", "max torque",
        "torque"
    ],
    "wheelbase_mm": [
        "distancia entre ejes", "batalla", "wheelbase"
    ],
    "airbags_count": [
        "bolsas de aire", "airbags", "cojines inflables de seguridad",
        "srs airbags", "sistema suplementario de retención"
    ],
    "fuel_tank_liters": [
        "tanque de combustible", "capacidad del tanque", "depósito de combustible",
        "depósito de gasolina", "fuel tank capacity", "tanque"
    ],
    "curb_weight_kg": [
        "peso en vacío", "peso neto", "tara", "curb weight", "unladen weight", "peso en vacio"
    ],
    "gross_weight_kg": [
        "peso bruto", "peso bruto del vehículo", "peso bruto vehicular", "gvwr", "gross vehicle weight"
    ]
}

# ==============================================================================
# 2. MOTOR DE NORMALIZACIÓN DETERMINISTA DE UNIDADES
# ==============================================================================

class UnitNormalizer:
    """Conversor determinista de unidades automotrices para homologar especificaciones."""

    @staticmethod
    def parse_dimensions_string(dim_str: str) -> Tuple[int, int, int]:
        """
        Interpreta expresiones complejas de dimensiones:
        - '4325*1830*1640 (mm)' -> (4325, 1830, 1640)
        - '4.460 x 1.825 x 1.620 mm' -> (4460, 1825, 1620)
        - '4,46 m x 1,82 m x 1,62 m' -> (4460, 1820, 1620)
        """
        # Limpiar separadores de miles y caracteres ajenos
        cleaned = dim_str.replace('.', '').replace(',', '')
        nums = [int(n) for n in re.findall(r'\b(1\d{3}|2\d{3}|3\d{3}|4\d{3}|5\d{3}|6\d{3})\b', cleaned)]
        if len(nums) >= 3:
            return nums[0], nums[1], nums[2]
        
        # Probar números decimales en metros: ej. 4.46 x 1.82 x 1.62
        m_matches = re.findall(r'(\d[.,]\d{1,3})\s*(?:m|metros)?', dim_str)
        if len(m_matches) >= 3:
            return (
                round(float(m_matches[0].replace(',', '.')) * 1000),
                round(float(m_matches[1].replace(',', '.')) * 1000),
                round(float(m_matches[2].replace(',', '.')) * 1000)
            )
        raise ValueError(f"No se pudieron resolver las 3 cotas dimensionales en: '{dim_str}'")

    @staticmethod
    def normalize_power_to_hp(value: float, unit_hint: str = "HP") -> int:
        """
        Estandariza a Caballos de Fuerza (HP).
        - 1 kW = 1.34102 HP
        - 1 CV / PS = 0.98632 HP
        """
        u = unit_hint.strip().upper()
        if "KW" in u:
            return round(value * 1.34102)
        elif "CV" in u or "PS" in u:
            return round(value * 0.98632)
        return round(value)

    @staticmethod
    def normalize_torque_to_nm(value: float, unit_hint: str = "NM") -> float:
        """
        Estandariza a Newton-Metro (Nm).
        - 1 lb-ft = 1.355818 Nm
        - 1 kg-m = 9.80665 Nm
        """
        u = unit_hint.strip().upper()
        if "LB" in u or "FT" in u:
            return round(value * 1.355818, 1)
        elif "KG" in u:
            return round(value * 9.80665, 1)
        return round(value, 1)

    @staticmethod
    def normalize_distance_to_mm(value: float, unit_hint: str = "MM") -> int:
        """
        Estandariza cotas lineales a milímetros (mm).
        - cm -> * 10
        - m -> * 1000
        - in -> * 25.4
        """
        u = unit_hint.strip().lower()
        if "cm" in u:
            return round(value * 10)
        elif "m" in u and "mm" not in u:
            return round(value * 1000)
        elif "in" in u or '"' in u:
            return round(value * 25.4)
        return round(value)

    @staticmethod
    def normalize_weight_to_kg(value: float, unit_hint: str = "KG") -> int:
        """Estandariza a kilogramos (kg). 1 lb = 0.453592 kg."""
        u = unit_hint.strip().upper()
        if "LB" in u:
            return round(value * 0.453592)
        return round(value)


# ==============================================================================
# 3. SUB-ESQUEMAS ESPECÍFICOS PYDANTIC V2
# ==============================================================================

class EngineSpec(BaseModel):
    engine_code: Optional[str] = Field(None, description="Código del fabricante (ej. 'M20A-FKS', 'A151R2')")
    displacement_cc: Optional[int] = Field(None, description="Cilindrada en cc / ml (ej. 1987, 1499)")
    displacement_liters: Optional[float] = Field(None, description="Cilindrada en litros (ej. 2.0, 1.5)")
    cylinders: Optional[int] = Field(4, description="Número de cilindros")
    valves_total: Optional[int] = Field(16, description="Válvulas totales del motor")
    induction_type: Literal["NATURALMENTE_ASPIRADO", "TURBOCARGADO", "SUPERCARGADO", "BITURBO"] = "NATURALMENTE_ASPIRADO"
    fuel_system: Optional[str] = Field(None, description="Tipo de inyección (ej. 'Inyección mixta D4-S')")
    fuel_type: FuelCategory = "GASOLINA"
    distribution_type: DistributionMechanism = "DESCONOCIDO"

    @field_validator('displacement_liters', mode='before')
    @classmethod
    def calculate_liters_if_missing(cls, v, values):
        if v is None and 'displacement_cc' in values.data and values.data['displacement_cc']:
            return round(values.data['displacement_cc'] / 1000.0, 1)
        return v

class PowertrainOutput(BaseModel):
    power_hp: int = Field(..., ge=20, le=1500, description="Potencia neta homologada en HP")
    power_rpm: Optional[int] = Field(None, ge=1000, le=10000, description="Régimen de giro para potencia pico (RPM)")
    torque_nm: float = Field(..., ge=30.0, le=2500.0, description="Torque neto homologado en Nm")
    torque_rpm_min: Optional[int] = Field(None, ge=800, le=8000, description="Régimen de giro mínimo para torque pico")
    torque_rpm_max: Optional[int] = Field(None, ge=800, le=8000, description="Régimen de giro máximo de la meseta de torque")

class TransmissionSpec(BaseModel):
    type_category: TransmissionCategory = Field(..., description="Categoría funcional")
    commercial_name: str = Field(..., description="Nombre comercial (ej. 'Direct Shift CVT 10 vel', 'Manual 6 vel')")
    forward_gears: Optional[int] = Field(None, description="Marchas físicas o preprogramadas")
    has_paddle_shifters: bool = Field(False, description="Levas al volante")
    drivetrain: DrivetrainType = "FWD"

class DimensionsAndCapacities(BaseModel):
    length_mm: int = Field(..., ge=2500, le=7000, description="Largo total en mm")
    width_mm: int = Field(..., ge=1200, le=2500, description="Ancho total en mm")
    height_mm: int = Field(..., ge=1000, le=2800, description="Alto total en mm")
    wheelbase_mm: int = Field(..., ge=1800, le=4500, description="Distancia entre ejes en mm")
    ground_clearance_mm: int = Field(..., ge=80, le=400, description="Despeje libre al suelo en mm")
    curb_weight_kg: Optional[int] = Field(None, ge=600, le=4500, description="Peso neto en vacío")
    gross_weight_kg: Optional[int] = Field(None, ge=800, le=6000, description="Peso bruto vehicular")
    fuel_tank_liters: int = Field(..., ge=20, le=200, description="Capacidad del tanque en litros")
    trunk_capacity_liters: Optional[int] = Field(None, description="Capacidad de maletero estándar en litros")
    seating_capacity: int = Field(5, ge=1, le=15, description="Número de asientos")

class SafetyAndADAS(BaseModel):
    airbags_count: int = Field(..., ge=0, le=14, description="Número total aritmético de airbags")
    airbags_breakdown: Optional[str] = Field(None, description="Detalle de ubicación de airbags")
    has_abs: bool = True
    has_ebd: bool = True
    has_stability_control: bool = Field(False, description="Control de estabilidad (ESP/VSC/ESC)")
    has_traction_control: bool = Field(False, description="Control de tracción (TCS/TRC)")
    has_hill_start_assist: bool = Field(False, description="Asistente de arranque en pendientes (HAC/HHC)")
    has_tpms: bool = Field(False, description="Monitoreo de presión de neumáticos")
    isofix_anchors: bool = Field(False, description="Anclajes ISOFIX")
    reverse_camera: bool = False
    parking_sensors: Optional[str] = Field(None, description="'Ninguno', 'Traseros', 'Delanteros y Traseros'")
    cruise_control: Optional[str] = Field(None, description="'Ninguno', 'Convencional', 'Adaptativo'")

class VehicleTrimSpec(BaseModel):
    trim_name: str = Field(..., description="Nombre del acabado (ej. 'COMFORT', 'LUXURY', '2.0L CVT')")
    internal_code: Optional[str] = Field(None, description="Código de fábrica / Katashiki")
    powertrain: PowertrainOutput
    engine: EngineSpec
    transmission: TransmissionSpec
    dimensions: DimensionsAndCapacities
    safety: SafetyAndADAS
    features_checklist: Dict[str, bool] = Field(default_factory=dict, description="Equipamiento con glifos (● vs -)")

class VehicleBrochureExtraction(BaseModel):
    maker: str = Field(..., description="Fabricante (ej. 'Toyota', 'BAIC', 'Jetour')")
    model: str = Field(..., description="Modelo base (ej. 'Corolla Cross', 'X35')")
    model_year: Optional[int] = Field(None, description="Año modelo")
    is_multi_trim: bool = Field(..., description="Indica si contiene múltiples acabados")
    source_filename: str = Field(default="ficha.pdf", description="Nombre del archivo original")
    extraction_confidence_score: float = Field(default=0.95, ge=0.0, le=1.0)
    trims: List[VehicleTrimSpec] = Field(default_factory=list, description="Lista de versiones extraídas")

# ==============================================================================
# 4. PIPELINE MULTIMODAL CON GOOGLE GENERATIVE AI (API OFICIAL)
# ==============================================================================

class GeminiVehiclePDFParser:
    """
    Servicio de extracción y normalización multimodal de fichas técnicas en PDF.
    Utiliza obligatoriamente la API oficial de Google: google.generativeai as genai.
    Sube archivos mediante genai.upload_file() y delega la comprensión del layout
    complejo al modelo multimodal Gemini (gemini-1.5-pro / gemini-1.5-flash).
    """

    SYSTEM_INSTRUCTION = """
    Eres un Ingeniero Automotriz y Especialista en Normalización de Datos de CharuAutos.
    Tu tarea es analizar el documento PDF adjunto (ficha técnica o catálogo de vehículo) y extraer de forma exhaustiva, minuciosa y estructurada todas las especificaciones técnicas en un objeto JSON que cumpla estrictamente con el esquema Pydantic VehicleBrochureExtraction.

    REGLAS DE EXTRACCIÓN AUTOMOTRIZ:
    1. MULTI-TRIM: Si el documento presenta múltiples versiones o acabados en columnas (ej. COMFORT vs LUXURY, STD vs FULL), debes generar un objeto en la lista 'trims' para cada una, desagregando correctamente valores comunes (como dimensiones) y valores divergentes (como pesos, transmisiones o equipamiento).
    2. GLIFOS Y SÍMBOLOS: Interpreta los símbolos gráficos de disponibilidad:
       - Círculo relleno (●) = True (Equipamiento de serie / estándar)
       - Guion (-) = False (No disponible)
       - Círculo vacío (○) = Opcional
    3. AIRBAGS (BOLSAS DE AIRE): Desglosa la cantidad real. Si dice 'Bolsas de aire para conductor y pasajero: ● ●', la cantidad es 2 (1 conductor + 1 pasajero). Si es una lista explícita (ej. '7 airbags: 2 frontales, 1 rodilla, 2 laterales, 2 cortina'), airbags_count es 7.
    4. POTENCIA Y TORQUE: Extrae la potencia en HP y las RPM si están disponibles. Si está en kW o CV, extrae el número y la unidad para normalización. Extrae el torque en Nm y su rango de RPM (ej. 210 Nm @ 4400 RPM).
    5. DIMENSIONES: Si vienen agrupadas como '4325*1830*1640', asígnalas a length_mm=4325, width_mm=1830, height_mm=1640. Si vienen con puntos como '4.460 mm', elimínalos para obtener el entero en milímetros (4460).
    6. SALIDA ESTRICTA: Responde exclusivamente en JSON válido según la estructura requerida.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: str = "gemini-1.5-pro"):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        self.model_name = model_name
        if GENAI_AVAILABLE and self.api_key:
            genai.configure(api_key=self.api_key)

    def upload_and_process_pdf(self, pdf_path: str, auto_cleanup: bool = True) -> VehicleBrochureExtraction:
        if not GENAI_AVAILABLE:
            raise RuntimeError("La librería oficial 'google-generativeai' no está instalada. Ejecute: pip install google-generativeai")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY no está configurada en las variables de entorno ni en el constructor.")

        if not os.path.exists(pdf_path):
            raise FileNotFoundError(f"Archivo no encontrado: {pdf_path}")

        print(f"🚀 Subiendo PDF a Gemini File API vía genai.upload_file()... Archivo: {os.path.basename(pdf_path)}")
        uploaded_file = genai.upload_file(path=pdf_path, mime_type="application/pdf")
        
        try:
            # Esperar procesamiento de Gemini si el archivo es grande
            while uploaded_file.state.name == "PROCESSING":
                time.sleep(1)
                uploaded_file = genai.get_file(uploaded_file.name)

            if uploaded_file.state.name == "FAILED":
                raise RuntimeError("Falla en el procesamiento del PDF por parte de Gemini File API.")

            print(f"✅ Archivo listo en Gemini File API ({uploaded_file.name}). Ejecutando extracción multimodal con {self.model_name}...")

            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=self.SYSTEM_INSTRUCTION,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                )
            )

            prompt = (
                f"Analiza minuciosamente el archivo PDF cargado '{os.path.basename(pdf_path)}'. "
                "Extrae todos los datos técnicos del tren motriz, dimensiones, chasis, seguridad y equipamiento. "
                "Genera el JSON estructurado completo para todas las versiones presentes en el folleto."
            )

            response = model.generate_content([uploaded_file, prompt])
            raw_json = json.loads(response.text)

            # Normalizar unidades y validar contra Pydantic
            normalized_extraction = self._post_process_and_validate(raw_json, os.path.basename(pdf_path))
            return normalized_extraction

        finally:
            if auto_cleanup:
                try:
                    print(f"🧹 Limpiando archivo remoto en Gemini: {uploaded_file.name}")
                    genai.delete_file(uploaded_file.name)
                except Exception as e:
                    logging.warning(f"No se pudo eliminar el archivo remoto: {e}")

    def _post_process_and_validate(self, raw_data: Dict[str, Any], filename: str) -> VehicleBrochureExtraction:
        raw_data["source_filename"] = filename
        if "extraction_confidence_score" not in raw_data:
            raw_data["extraction_confidence_score"] = 0.95
        
        for trim in raw_data.get("trims", []):
            pt = trim.get("powertrain", {})
            if "power_hp" in pt and isinstance(pt["power_hp"], (int, float)):
                pt["power_hp"] = UnitNormalizer.normalize_power_to_hp(pt["power_hp"])
            if "torque_nm" in pt and isinstance(pt["torque_nm"], (int, float)):
                pt["torque_nm"] = UnitNormalizer.normalize_torque_to_nm(pt["torque_nm"])
            
            dim = trim.get("dimensions", {})
            if "ground_clearance_mm" in dim and isinstance(dim["ground_clearance_mm"], (int, float)):
                dim["ground_clearance_mm"] = UnitNormalizer.normalize_distance_to_mm(dim["ground_clearance_mm"])

        return VehicleBrochureExtraction(**raw_data)

# ==============================================================================
# 5. INSTANCIACIÓN Y VERIFICACIÓN CON CASOS REALES (BAIC X35 Y COROLLA CROSS)
# ==============================================================================

def get_demo_baic_x35_extraction() -> VehicleBrochureExtraction:
    """Genera la extracción canónica validada de la ficha técnica de la BAIC X35."""
    # Cotas comunes
    length, width, height = UnitNormalizer.parse_dimensions_string("4325*1830*1640 (mm)")
    
    # Versión COMFORT
    comfort_trim = VehicleTrimSpec(
        trim_name="COMFORT",
        powertrain=PowertrainOutput(
            power_hp=UnitNormalizer.normalize_power_to_hp(147, "HP"),
            torque_nm=UnitNormalizer.normalize_torque_to_nm(210, "Nm")
        ),
        engine=EngineSpec(
            engine_code="A151R2",
            displacement_cc=1499,
            displacement_liters=1.5,
            induction_type="TURBOCARGADO",
            distribution_type="CADENA_DE_TIEMPO"
        ),
        transmission=TransmissionSpec(
            type_category="MANUAL",
            commercial_name="Manual de 6 velocidades",
            forward_gears=6,
            drivetrain="FWD"
        ),
        dimensions=DimensionsAndCapacities(
            length_mm=length,
            width_mm=width,
            height_mm=height,
            wheelbase_mm=2570,
            ground_clearance_mm=180,
            curb_weight_kg=1325,
            gross_weight_kg=1750,
            fuel_tank_liters=46,
            trunk_capacity_liters=390,
            seating_capacity=5
        ),
        safety=SafetyAndADAS(
            airbags_count=2,  # 1 conductor + 1 pasajero = 2 airbags
            airbags_breakdown="Bolsas de aire para conductor y pasajero",
            has_abs=True,
            has_ebd=True,
            has_stability_control=True,
            has_traction_control=True,
            has_hill_start_assist=True,
            has_tpms=True,
            isofix_anchors=True,
            reverse_camera=False,
            parking_sensors="Traseros",
            cruise_control="Ninguno"
        ),
        features_checklist={
            "techo_corredizo": False,
            "volante_cuero": False,
            "asientos_mixtos_cuero": False,
            "encendido_boton": False,
            "faros_led": True
        }
    )

    # Versión LUXURY
    luxury_trim = VehicleTrimSpec(
        trim_name="LUXURY",
        powertrain=PowertrainOutput(
            power_hp=UnitNormalizer.normalize_power_to_hp(147, "HP"),
            torque_nm=UnitNormalizer.normalize_torque_to_nm(210, "Nm")
        ),
        engine=EngineSpec(
            engine_code="A151R2",
            displacement_cc=1499,
            displacement_liters=1.5,
            induction_type="TURBOCARGADO",
            distribution_type="CADENA_DE_TIEMPO"
        ),
        transmission=TransmissionSpec(
            type_category="CVT",
            commercial_name="Automática CVT",
            drivetrain="FWD"
        ),
        dimensions=DimensionsAndCapacities(
            length_mm=length,
            width_mm=width,
            height_mm=height,
            wheelbase_mm=2570,
            ground_clearance_mm=180,
            curb_weight_kg=1340,  # Diverge de Comfort
            gross_weight_kg=1765, # Diverge de Comfort
            fuel_tank_liters=46,
            trunk_capacity_liters=390,
            seating_capacity=5
        ),
        safety=SafetyAndADAS(
            airbags_count=2,
            airbags_breakdown="Bolsas de aire para conductor y pasajero",
            has_abs=True,
            has_ebd=True,
            has_stability_control=True,
            has_traction_control=True,
            has_hill_start_assist=True,
            has_tpms=True,
            isofix_anchors=True,
            reverse_camera=True,  # Incluida en Luxury
            parking_sensors="Traseros",
            cruise_control="Convencional"  # Incluido en Luxury
        ),
        features_checklist={
            "techo_corredizo": True,
            "volante_cuero": True,
            "asientos_mixtos_cuero": True,
            "encendido_boton": True,
            "faros_led": True
        }
    )

    return VehicleBrochureExtraction(
        maker="BAIC",
        model="X35",
        model_year=2024,
        is_multi_trim=True,
        source_filename="BAIC_X35_Ficha_Tecnica.pdf",
        extraction_confidence_score=0.98,
        trims=[comfort_trim, luxury_trim]
    )


def get_demo_toyota_corolla_cross_extraction() -> VehicleBrochureExtraction:
    """Genera la extracción canónica validada de la ficha técnica de la Toyota Corolla Cross."""
    cross_trim = VehicleTrimSpec(
        trim_name="2.0L CVT",
        internal_code="MXGA10L-GHXEHG",
        powertrain=PowertrainOutput(
            power_hp=166,
            power_rpm=6000,
            torque_nm=210.0,
            torque_rpm_min=4400
        ),
        engine=EngineSpec(
            engine_code="M20A-FKS",
            displacement_cc=1987,
            displacement_liters=2.0,
            cylinders=4,
            valves_total=16,
            induction_type="NATURALMENTE_ASPIRADO",
            fuel_system="Inyección mixta D4-S (directa e indirecta)",
            distribution_type="CADENA_DE_TIEMPO"
        ),
        transmission=TransmissionSpec(
            type_category="CVT",
            commercial_name="Direct Shift CVT con modo secuencial de 10 velocidades preprogramadas",
            forward_gears=10,
            has_paddle_shifters=True,
            drivetrain="FWD"
        ),
        dimensions=DimensionsAndCapacities(
            length_mm=4460,
            width_mm=1825,
            height_mm=1620,
            wheelbase_mm=2640,
            ground_clearance_mm=161,
            curb_weight_kg=1360,
            gross_weight_kg=1840,
            fuel_tank_liters=47,
            trunk_capacity_liters=440,
            seating_capacity=5
        ),
        safety=SafetyAndADAS(
            airbags_count=7,
            airbags_breakdown="2 frontal, 1 rodillas, 2 laterales de asientos, 2 cortina",
            has_abs=True,
            has_ebd=True,
            has_stability_control=True,
            has_traction_control=True,
            has_hill_start_assist=True,
            has_tpms=False,
            isofix_anchors=True,
            reverse_camera=True,
            parking_sensors="Delanteros y Traseros",
            cruise_control="Convencional"
        ),
        features_checklist={
            "faros_bi_led": True,
            "cargador_inalambrico": True,
            "climatizador_bizona": True,
            "salida_aire_trasera": True,
            "apple_carplay_inalambrico": True
        }
    )

    return VehicleBrochureExtraction(
        maker="Toyota",
        model="Corolla Cross",
        model_year=2024,
        is_multi_trim=False,
        source_filename="Toyota_Corolla_Cross_Ficha_Tecnica.pdf",
        extraction_confidence_score=0.99,
        trims=[cross_trim]
    )

if __name__ == "__main__":
    print("=" * 80)
    print("🚗 CHARUAUTOS - PIPELINE MULTIMODAL DE VALIDACIÓN Y NORMALIZACIÓN PYDANTIC V2")
    print("=" * 80)
    
    baic_doc = get_demo_baic_x35_extraction()
    print(f"\n✅ Extracción Validada: {baic_doc.maker} {baic_doc.model} (Multi-Trim: {baic_doc.is_multi_trim})")
    for t in baic_doc.trims:
        print(f"  👉 Trim '{t.trim_name}': {t.powertrain.power_hp} HP | {t.powertrain.torque_nm} Nm | {t.transmission.commercial_name} | Peso: {t.dimensions.curb_weight_kg} kg | Airbags: {t.safety.airbags_count}")

    toyota_doc = get_demo_toyota_corolla_cross_extraction()
    print(f"\n✅ Extracción Validada: {toyota_doc.maker} {toyota_doc.model} (Katashiki: {toyota_doc.trims[0].internal_code})")
    t0 = toyota_doc.trims[0]
    print(f"  👉 Trim '{t0.trim_name}': {t0.powertrain.power_hp} HP @ {t0.powertrain.power_rpm} RPM | {t0.powertrain.torque_nm} Nm | Airbags: {t0.safety.airbags_count} ({t0.safety.airbags_breakdown})")

    print("\n" + "=" * 80)
    print("🎉 MODELOS Y VALIDACIONES EJECUTADOS CON ÉXITO")
    print("=" * 80)
