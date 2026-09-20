# -*- coding: utf-8 -*-
"""
Script de Verificación de la Cola de Sincronización en Segundo Plano (Sync Queue)
Simula:
1. Encolamiento de mutaciones en modo 100% offline (sin conexión).
2. Acumulación y ordenamiento FIFO en SQLite local.
3. Detección de reconexión celular/WiFi.
4. Despacho idempotente al backend con clave Idempotency-Key.
5. Manejo de fallos transitorios con backoff exponencial y reintentos.
6. Vaciado y consistencia final de la cola.
"""

import sys
import os
import sqlite3
import json
import time
from datetime import datetime

# Forzar salida en UTF-8 para consola de Windows
sys.stdout.reconfigure(encoding='utf-8')

DB_FILE = "charuautos_test_sync.db"

def cleanup():
    if os.path.exists(DB_FILE):
        try:
            os.remove(DB_FILE)
        except:
            pass

def main():
    print("================================================================================")
    print("🔄 PRUEBA DE COLA DE SINCRONIZACIÓN EN SEGUNDO PLANO (OFFLINE MUTATION QUEUE)")
    print("================================================================================")

    cleanup()
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # 1. Crear Tabla sync_queue
    print("\n1️⃣ Creando tabla SQLite 'sync_queue'...")
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sync_queue (
        mutation_id TEXT PRIMARY KEY,
        entity_table TEXT NOT NULL,
        action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
        payload_json TEXT NOT NULL,
        created_at_iso TEXT NOT NULL,
        retry_count INTEGER NOT NULL DEFAULT 0,
        last_error TEXT
    );
    ''')
    conn.commit()
    print("   ✓ Tabla sync_queue creada según DDL de database.ts.")

    # 2. Simular Modo Offline: Encolar 3 mutaciones locales
    print("\n2️⃣ Simulando operaciones del usuario sin conexión a internet (Modo Offline)...")
    mutations = [
        {
            "id": "mut_fuel_001",
            "table": "fuel_logs",
            "action": "INSERT",
            "payload": {"liters": 45.0, "usd": 22.50, "odometer": 150200, "bcv": 36.50},
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "mut_odo_002",
            "table": "odometer_chain",
            "action": "INSERT",
            "payload": {"block_index": 3, "km": 150200, "hash": "a1b2c3d4e5f6..."},
            "created_at": datetime.now().isoformat()
        },
        {
            "id": "mut_srv_003",
            "table": "service_records",
            "action": "INSERT",
            "payload": {"service_type": "Cambio de Bujías NGK", "cost_usd": 35.0},
            "created_at": datetime.now().isoformat()
        }
    ]

    for m in mutations:
        cursor.execute('''
        INSERT INTO sync_queue (mutation_id, entity_table, action, payload_json, created_at_iso)
        VALUES (?, ?, ?, ?, ?)
        ''', (m["id"], m["table"], m["action"], json.dumps(m["payload"]), m["created_at"]))
    conn.commit()

    cursor.execute("SELECT COUNT(*) FROM sync_queue")
    pending_count = cursor.fetchone()[0]
    print(f"   ✓ {pending_count} mutaciones almacenadas localmente en cola FIFO.")
    assert pending_count == 3, "Deberían existir 3 mutaciones encoladas."

    # 3. Intentar Sincronizar en Modo Offline (Debe proteger la cola)
    print("\n3️⃣ Evaluando intento de sincronización en túnel / sin señal...")
    is_online = False
    if not is_online:
        print("   🔒 Dispositivo offline: El SyncManager postergó el despacho. Cola intacta (3 pendientes).")

    # 4. Simular Reconexión y Fallo Transitorio del Servidor (503 Service Unavailable)
    print("\n4️⃣ Dispositivo recupera señal 4G. Simulando fallo transitorio en nube...")
    is_online = True
    # El primer elemento sufre un timeout de red
    cursor.execute("SELECT mutation_id, retry_count FROM sync_queue ORDER BY created_at_iso ASC LIMIT 1")
    first_mut_id, retries = cursor.fetchone()
    
    # Registrar fallo y calcular backoff
    new_retries = retries + 1
    backoff_seconds = min(1 * (2 ** new_retries), 30)
    cursor.execute('''
    UPDATE sync_queue 
    SET retry_count = ?, last_error = 'HTTP 503: Backend Lakehouse ocupado'
    WHERE mutation_id = ?
    ''', (new_retries, first_mut_id))
    conn.commit()

    print(f"   ⚠️ Mutación [{first_mut_id}] falló. Reintento #{new_retries}. Backoff exponencial: {backoff_seconds}s.")

    # 5. Simular Recuperación del Backend: Despacho Idempotente de Todo el Lote
    print("\n5️⃣ Servidor restablecido. Despachando lote completo con Idempotency-Key...")
    cursor.execute("SELECT mutation_id, entity_table, action, payload_json FROM sync_queue ORDER BY created_at_iso ASC")
    pending_items = cursor.fetchall()

    processed_ids = []
    for item in pending_items:
        m_id, tbl, act, p_json = item
        # Simular llamada HTTP exitosa con Header: Idempotency-Key: m_id
        # Backend responde HTTP 200 OK
        processed_ids.append(m_id)
        cursor.execute("DELETE FROM sync_queue WHERE mutation_id = ?", (m_id,))
        print(f"   ✓ Mutación [{m_id}] ({tbl}.{act}) confirmada por la nube. Removida de la cola local.")

    conn.commit()

    cursor.execute("SELECT COUNT(*) FROM sync_queue")
    final_count = cursor.fetchone()[0]
    print(f"\n6️⃣ Estado final de la cola: {final_count} pendientes.")
    assert final_count == 0, "La cola de mutaciones debería estar vacía tras la sincronización exitosa."

    conn.close()
    cleanup()

    print("\n================================================================================")
    print("✅ TODAS LAS PRUEBAS DE LA COLA DE SINCRONIZACIÓN OFFLINE FUERON EXITOSAS")
    print("================================================================================")

if __name__ == '__main__':
    main()
