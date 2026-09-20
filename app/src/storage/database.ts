/**
 * Administrador de Esquema y Migraciones SQLite Local-First (CharuAutos App)
 * Compatible con expo-sqlite, op-sqlite y SQLite3 en Node / React Native.
 */

export const DATABASE_VERSION = 1;
export const DATABASE_NAME = 'charuautos_local.db';

export const SQL_MIGRATIONS = [
  // 1. TABLA DE VEHÍCULOS DEL USUARIO (GARAGE)
  `CREATE TABLE IF NOT EXISTS user_vehicles (
    id TEXT PRIMARY KEY,
    maker TEXT NOT NULL,
    model TEXT NOT NULL,
    trim_name TEXT NOT NULL,
    nickname TEXT,
    license_plate TEXT NOT NULL,
    current_mileage INTEGER NOT NULL DEFAULT 0,
    health_score INTEGER NOT NULL DEFAULT 100,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );`,

  // 2. TABLA CRIPTOGRÁFICA DE ODÓMETRO (CADENA SHA-256 ANTI-FRAUDE)
  `CREATE TABLE IF NOT EXISTS odometer_chain (
    block_index INTEGER NOT NULL,
    vehicle_id TEXT NOT NULL,
    mileage_km INTEGER NOT NULL,
    recorded_at_iso TEXT NOT NULL,
    previous_hash TEXT NOT NULL,
    current_hash TEXT NOT NULL,
    PRIMARY KEY (vehicle_id, block_index),
    FOREIGN KEY (vehicle_id) REFERENCES user_vehicles(id) ON DELETE CASCADE
  );`,

  // 3. TABLA DE REGISTROS DE COMBUSTIBLE (BIMONETARIO USD / BS)
  `CREATE TABLE IF NOT EXISTS fuel_logs (
    id TEXT PRIMARY KEY,
    vehicle_id TEXT NOT NULL,
    recorded_at_iso TEXT NOT NULL,
    odometer_km INTEGER NOT NULL,
    liters_filled REAL NOT NULL,
    price_total_usd REAL NOT NULL,
    price_total_ves REAL,
    bcv_exchange_rate REAL,
    octane_type TEXT DEFAULT 'regular_91',
    full_tank INTEGER DEFAULT 1,
    sync_status TEXT DEFAULT 'pending_upload',
    FOREIGN KEY (vehicle_id) REFERENCES user_vehicles(id) ON DELETE CASCADE
  );`,

  // 4. TABLA DE REGISTROS DE SERVICIOS Y MANTENIMIENTOS
  `CREATE TABLE IF NOT EXISTS service_records (
    id TEXT PRIMARY KEY,
    vehicle_id TEXT NOT NULL,
    service_date_iso TEXT NOT NULL,
    mileage_at_service INTEGER NOT NULL,
    service_type TEXT NOT NULL,
    parts_cost_usd REAL NOT NULL DEFAULT 0,
    labor_cost_usd REAL NOT NULL DEFAULT 0,
    total_cost_usd REAL NOT NULL DEFAULT 0,
    workshop_name TEXT,
    verified_by_workshop INTEGER DEFAULT 0,
    notes TEXT,
    next_due_mileage_km INTEGER,
    sync_status TEXT DEFAULT 'pending_upload',
    FOREIGN KEY (vehicle_id) REFERENCES user_vehicles(id) ON DELETE CASCADE
  );`,

  // 5. TABLA DE CACHÉ LOCAL DE CÓDIGOS DTC OBD2 (100% OFFLINE)
  `CREATE TABLE IF NOT EXISTS cached_dtc_codes (
    code TEXT PRIMARY KEY,
    system TEXT NOT NULL,
    severity INTEGER NOT NULL,
    technical_title TEXT NOT NULL,
    plain_spanish_explanation TEXT NOT NULL,
    causes_json TEXT NOT NULL,
    anti_scam_questions_json TEXT NOT NULL,
    venezuela_context TEXT
  );`,

  // 6. COLA DE SINCRONIZACIÓN REACTIVA (OFFLINE MUTATION QUEUE)
  `CREATE TABLE IF NOT EXISTS sync_queue (
    mutation_id TEXT PRIMARY KEY,
    entity_table TEXT NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    payload_json TEXT NOT NULL,
    created_at_iso TEXT NOT NULL,
    retry_count INTEGER NOT NULL DEFAULT 0,
    last_error TEXT
  );`
];
