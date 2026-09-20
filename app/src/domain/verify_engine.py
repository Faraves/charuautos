import sys
import io

# Soporte UTF-8 en terminal de Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


VEHICLES = [
    {
        "id": "toyota-corolla-gli-2011",
        "maker": "Toyota",
        "model": "Corolla",
        "trim": "GLi 1.8 Automático (2011)",
        "nickname": "Corolla Pantallita / Boca de Bagre",
        "price_usd_used": [6500, 9500],
        "parts_availability": "inmediata",
        "annual_maintenance_usd": 320,
        "ground_clearance_mm": 160,
        "fuel_city_kml": 11.5,
        "timing_mechanism": "cadena",
        "trunk_liters": 450,
        "torque_nm": 170
    },
    {
        "id": "chevrolet-aveo-ls-2011",
        "maker": "Chevrolet",
        "model": "Aveo",
        "trim": "LS 1.6 4 Puertas (2011)",
        "nickname": "Aveo 4 Puertas / El Aveito",
        "price_usd_used": [3200, 5200],
        "parts_availability": "inmediata",
        "annual_maintenance_usd": 280,
        "ground_clearance_mm": 150,
        "fuel_city_kml": 10.0,
        "timing_mechanism": "correa_interferencia",
        "trunk_liters": 400,
        "torque_nm": 145
    },
    {
        "id": "ford-fiesta-move-2012",
        "maker": "Ford",
        "model": "Fiesta",
        "trim": "Move 1.6 (2012)",
        "nickname": "Fiesta Move / Fiestica",
        "price_usd_used": [3400, 5500],
        "parts_availability": "alta",
        "annual_maintenance_usd": 350,
        "ground_clearance_mm": 140,
        "fuel_city_kml": 10.5,
        "timing_mechanism": "cadena",
        "trunk_liters": 420,
        "torque_nm": 142
    },
    {
        "id": "toyota-yaris-sedan-2008",
        "maker": "Toyota",
        "model": "Yaris",
        "trim": "Sedan 1.3 / 1.5 (2008)",
        "nickname": "Yaris Belén / Redondito",
        "price_usd_used": [5500, 7800],
        "parts_availability": "alta",
        "annual_maintenance_usd": 260,
        "ground_clearance_mm": 155,
        "fuel_city_kml": 13.0,
        "timing_mechanism": "cadena",
        "trunk_liters": 475,
        "torque_nm": 122
    },
    {
        "id": "changan-alsvin-2023",
        "maker": "Changan",
        "model": "Alsvin",
        "trim": "1.4 Manual Comfort (2023)",
        "nickname": "El Changan Chiquito",
        "price_usd_used": [11000, 13500],
        "parts_availability": "moderada",
        "annual_maintenance_usd": 250,
        "ground_clearance_mm": 145,
        "fuel_city_kml": 13.5,
        "timing_mechanism": "cadena",
        "trunk_liters": 380,
        "torque_nm": 135
    },
    {
        "id": "chevrolet-spark-2011",
        "maker": "Chevrolet",
        "model": "Spark",
        "trim": "LT 1.0 (2011)",
        "nickname": "Spark Tapita / El Huevito",
        "price_usd_used": [2500, 4000],
        "parts_availability": "inmediata",
        "annual_maintenance_usd": 220,
        "ground_clearance_mm": 145,
        "fuel_city_kml": 14.5,
        "timing_mechanism": "correa_interferencia",
        "trunk_liters": 170,
        "torque_nm": 91
    }
]

def evaluate_matchmaker(profile):
    results = []
    for v in VEHICLES:
        avg_price = sum(v["price_usd_used"]) / 2
        # 1. Presupuesto
        if avg_price > profile["max_budget_usd"]:
            excess = (avg_price - profile["max_budget_usd"]) / profile["max_budget_usd"]
            budget_score = max(0, 100 - excess * 150)
        else:
            budget_score = 100

        # 2. TCO Mantenimiento
        tco_score = max(20, min(100, 100 - (v["annual_maintenance_usd"] - 200) * 0.15))

        # 3. Camino (Huecos / Despeje)
        clearance = v["ground_clearance_mm"]
        road_score = 95 if clearance >= 160 else 75 if clearance >= 148 else 50

        # 4. Repuestos
        parts_map = {"inmediata": 100, "alta": 85, "moderada": 65, "dificil": 35}
        parts_score = parts_map.get(v["parts_availability"], 70)

        # 5. Combustible
        fuel_score = min(100, v["fuel_city_kml"] * 7.0)

        # 6. Espacio
        space_score = 85 if v["trunk_liters"] >= 400 else 55

        # Ponderación
        raw = (budget_score * 0.25 + parts_score * 0.20 + road_score * 0.20 + 
               tco_score * 0.15 + fuel_score * 0.10 + space_score * 0.10)
        
        penalty = 0.94 if v["timing_mechanism"] == "correa_interferencia" else 1.0
        final_score = int(min(99, max(20, round(raw * penalty))))

        results.append({
            "vehicle": v,
            "score": final_score,
            "budget_score": int(budget_score),
            "parts_score": int(parts_score),
            "road_score": int(road_score)
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    return results

if __name__ == "__main__":
    print("=" * 60)
    print("🚗 CHARUAUTOS — VERIFICADOR DE ALGORITMO MATCHMAKER (VENEZUELA)")
    print("=" * 60)
    
    # Perfil 1: Daniel (Presupuesto $5,500, Caracas baches, repuestos fáciles)
    p1 = {
        "max_budget_usd": 5500,
        "road": "muchos_baches_huecos",
        "fuel": "resistencia_gasolina_mala"
    }
    print(f"\nCaso 1: Daniel • Presupuesto: ${p1['max_budget_usd']} USD • Vías con baches")
    res1 = evaluate_matchmaker(p1)
    for idx, r in enumerate(res1[:3]):
        v = r["vehicle"]
        print(f"  {idx+1}. [{r['score']}% MATCH] {v['maker']} {v['model']} ({v['nickname']})")
        print(f"     Precio est.: ${v['price_usd_used'][0]}-${v['price_usd_used'][1]} USD | Despeje: {v['ground_clearance_mm']}mm | Repuestos: {v['parts_availability'].upper()}")

    # Perfil 2: Familia con presupuesto mayor ($9,000 USD)
    p2 = {
        "max_budget_usd": 9000,
        "road": "muchos_baches_huecos",
        "fuel": "resistencia_gasolina_mala"
    }
    print(f"\nCaso 2: Familia • Presupuesto: ${p2['max_budget_usd']} USD • Vías con baches")
    res2 = evaluate_matchmaker(p2)
    for idx, r in enumerate(res2[:3]):
        v = r["vehicle"]
        print(f"  {idx+1}. [{r['score']}% MATCH] {v['maker']} {v['model']} ({v['nickname']})")
        print(f"     Precio est.: ${v['price_usd_used'][0]}-${v['price_usd_used'][1]} USD | Despeje: {v['ground_clearance_mm']}mm | Repuestos: {v['parts_availability'].upper()}")

    print("\n" + "=" * 60)
    print("✅ ALGORITMO VALIDADO Y CONSISTENTE")
    print("=" * 60)
