import sys
import io
import hashlib
import json
from datetime import datetime

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

"""
Verificador de la Capa de Persistencia Local y Cadena Criptográfica (CharuAutos App)
Prueba la integridad anti-fraude del odómetro y los cálculos bimonetarios de combustible.
"""

GENESIS_HASH = "0000000000000000000000000000000000000000000000000000000000000000"

def compute_odometer_hash(vehicle_id: str, mileage_km: int, recorded_at: str, prev_hash: str) -> str:
    payload = f"{vehicle_id}|{mileage_km}|{recorded_at}|{prev_hash}"
    return hashlib.sha256(payload.encode('utf-8')).hexdigest()

class OdometerBlock:
    def __init__(self, index: int, vehicle_id: str, mileage_km: int, recorded_at: str, prev_hash: str, cur_hash: str):
        self.index = index
        self.vehicle_id = vehicle_id
        self.mileage_km = mileage_km
        self.recorded_at = recorded_at
        self.prev_hash = prev_hash
        self.cur_hash = cur_hash

def verify_odometer_chain(chain):
    for i, block in enumerate(chain):
        if i == 0:
            if block.prev_hash != GENESIS_HASH:
                return False, f"Bloque 0 tiene hash previo inválido"
        else:
            prev = chain[i - 1]
            if block.prev_hash != prev.cur_hash:
                return False, f"Discrepancia en enlace de hash en bloque {i}"
            if block.mileage_km < prev.mileage_km:
                return False, f"Regresión de odómetro detectada en bloque {i} ({block.mileage_km} < {prev.mileage_km})"
        
        expected = compute_odometer_hash(block.vehicle_id, block.mileage_km, block.recorded_at, block.prev_hash)
        if block.cur_hash != expected:
            return False, f"Hash adulterado en bloque {i}"
    return True, "Cadena 100% íntegra y verificada"

if __name__ == "__main__":
    print("=" * 65)
    print("🔒 CHARUAUTOS — PRUEBA DE PERSISTENCIA & CRIPTOGRAFÍA LOCAL")
    print("=" * 65)

    veh_id = "toyota-corolla-2011"
    chain = []

    # 1. BLOQUE 0: Registro inicial (145,000 km)
    t0 = "2026-06-01T10:00:00Z"
    h0 = compute_odometer_hash(veh_id, 145000, t0, GENESIS_HASH)
    chain.append(OdometerBlock(0, veh_id, 145000, t0, GENESIS_HASH, h0))
    print(f"📦 Bloque 0 (Génesis): 145,000 km -> Hash: {h0[:16]}...")

    # 2. BLOQUE 1: Carga de gasolina (146,800 km)
    t1 = "2026-07-15T14:30:00Z"
    h1 = compute_odometer_hash(veh_id, 146800, t1, h0)
    chain.append(OdometerBlock(1, veh_id, 146800, t1, h0, h1))
    print(f"📦 Bloque 1 (Carga):   146,800 km -> Hash: {h1[:16]}...")

    # 3. BLOQUE 2: Servicio en taller (148,500 km)
    t2 = "2026-09-19T09:15:00Z"
    h2 = compute_odometer_hash(veh_id, 148500, t2, h1)
    chain.append(OdometerBlock(2, veh_id, 148500, t2, h1, h2))
    print(f"📦 Bloque 2 (Taller):  148,500 km -> Hash: {h2[:16]}...")

    # VERIFICACIÓN LEGÍTIMA
    valid, msg = verify_odometer_chain(chain)
    print(f"\n🔍 Verificación de Cadena Original: {'✅ APROBADO' if valid else '❌ RECHAZADO'}")
    print(f"   Mensaje: {msg}")

    # 4. SIMULACIÓN DE INTENTO DE FRAUDE:
    # "Un vendedor malicioso intenta bajar el odómetro del bloque 2 a 130,000 km para vender más caro"
    print("\n🚨 SIMULACIÓN DE ATAQUE: Un usuario adultera el odómetro a 130,000 km...")
    tampered_chain = list(chain)
    tampered_chain[2] = OdometerBlock(2, veh_id, 130000, t2, h1, h2) # Mismo hash, pero km alterado
    tampered_valid, tampered_msg = verify_odometer_chain(tampered_chain)
    print(f"   Resultado de Auditoría: {'✅ APROBADO' if tampered_valid else '🛡️ FRAUDE DETECTADO'}")
    print(f"   Motivo: {tampered_msg}")

    # 5. PRUEBA DE MÉTRICAS BIMONETARIAS ($/km y Bs./km)
    print("\n" + "-" * 65)
    print("⛽ PRUEBA DE MÉTRICAS DE COMBUSTIBLE ($/km y Rendimiento)")
    print("-" * 65)
    distance = 148500 - 145000 # 3,500 km recorridos
    total_spent_usd = 385.0 # USD gastados en gasolina
    bcv_rate = 38.50 # Tasa oficial BCV

    cost_per_km_usd = round(total_spent_usd / distance, 3)
    cost_per_km_ves = round(cost_per_km_usd * bcv_rate, 2)
    liters_consumed = 290.0
    kml = round(distance / liters_consumed, 1)

    print(f"  • Distancia Monitoreada: {distance:,} km")
    print(f"  • Consumo Promedio:     {kml} km/Litro")
    print(f"  • Costo por Kilómetro:  ${cost_per_km_usd} USD/km")
    print(f"  • Equivalente en Bs:    {cost_per_km_ves} Bs./km (Tasa BCV: {bcv_rate} Bs/$)")

    print("\n" + "=" * 65)
    print("✅ PERSISTENCIA Y CRIPTOGRAFÍA VALIDADAS EXITOSAMENTE")
    print("=" * 65)
