# Sección 02: Gestión y Gobernanza de Datos (Data Engineering & Governance)
### Arquitectura de Datos, Calidad, Linaje y Modelado Analítico para CharuAutos App
*Diseñado bajo estándares de Ingeniería de Datos moderna para entornos analíticos y operativos escalables.*

---

## 2.1. Arquitectura de Datos: Enfoque Medallion (Lakehouse)

Para soportar tanto la operativa en tiempo real de la aplicación (OLTP) como la analítica avanzada, el motor de recomendación del Matchmaker y los modelos de IA (OLAP / RAG), implementamos una **Arquitectura Medallion** desacoplada:

```mermaid
flowchart LR
    subgraph Fuentes de Ingesta
        F1["📱 App Telemetría / Gastos<br>(PostgreSQL CDC Debezium)"]
        F2["🚗 Web Scraping / APIs Mercado<br>(Precios Venezuela USD/Bs)"]
        F3["🔧 Catálogos Técnicos & DTCs<br>(NHTSA, SAE J2012, Manuales)"]
    end

    subgraph Bronze Layer ["🥉 Capa Bronze (Raw / Ingestion)"]
        B1[("Eventos Raw en Parquet / S3<br>Logs inmutables sin transformar")]
    end

    subgraph Silver Layer ["🥈 Capa Silver (Cleaned / Conformed)"]
        S1[("Datos Validados & Tipados<br>Deduplicación, MDM aplicado,<br>Normalización de VIN y Monedas")]
    end

    subgraph Gold Layer ["🥇 Capa Gold (Business / Aggregated)"]
        G1[("Data Mart: Matchmaker Scoring")]
        G2[("Data Mart: Health Score & Predictivo")]
        G3[("Vector Store: Embeddings RAG Mecánica")]
    end

    F1 --> B1
    F2 --> B1
    F3 --> B1
    
    B1 -->|"Transformaciones dbt / DuckDB"| S1
    S1 -->|"Métricas & Modelos de Negocio"| G1
    S1 -->|"Agregaciones Temporales"| G2
    S1 -->|"Generación de Embeddings"| G3
```

### 1. Capa Bronze (Raw Data Store)
- **Propósito:** Almacén inmutable de solo adición (*append-only*).
- **Formato:** Archivos Apache Parquet particionados por `año/mes/día/fuente` almacenados en Cloud Object Storage (S3 / Cloudflare R2 / MinIO).
- **Tipos de Datos:** Eventos crudos de navegación del Matchmaker, respuestas crudas de las entrevistas, registros de cargas de combustible, fallas ingresadas por usuarios y scrapings de precios de vehículos usados en portales locales.

### 2. Capa Silver (Cleansed & Enriched Core)
- **Propósito:** Tablas limpias, validadas, deduplicadas y estructuradas según el modelo canónico.
- **Transformaciones:**
  - Limpieza de cadenas y estandarización fonética de marcas/modelos (ej. corregir "Toyoya Corola" a `TOYOTA COROLLA`).
  - Conversión de precios multimoneda a una base estandarizada USD a la tasa oficial BCV del día del registro.
  - Validación de coherencia de kilometraje (detección de saltos temporales erróneos o regresión de odómetro).

### 3. Capa Gold (Business Level / Data Marts)
- **Propósito:** Consumo directo para la aplicación, dashboards analíticos y motores de inteligencia artificial.
  - **Data Mart Matchmaker:** Fichas técnicas consolidadas con puntuaciones de confiabilidad, disponibilidad de repuestos en Venezuela y costo total de propiedad (TCO).
  - **Data Mart Telemetría y Salud:** Agregaciones por marca/modelo de frecuencia de códigos DTC según kilometraje (ej. *"El 68% de los Aveo con más de 120,000 km reportan falla P0300"*).
  - **Vector Database (Qdrant / pgvector):** Embeddings vectoriales de síntomas mecánicos y causas raíz para alimentar el asistente RAG en lenguaje natural.

---

## 2.2. Master Data Management (MDM): Catálogo Canónico Vehicular

La fragmentación y los errores en nombres de vehículos en Venezuela es uno de los mayores problemas de datos. El sistema implementa una entidad de **Golden Record** para vehículos y repuestos:

```mermaid
erDiagram
    MAKER ||--o{ MODEL : manufactures
    MODEL ||--o{ GENERATION : has
    GENERATION ||--o{ TRIM : configures
    TRIM ||--o{ VEHICLE_SPEC : defines
    TRIM ||--o{ MAINTENANCE_SCHEDULE : requires
    MAINTENANCE_SCHEDULE ||--o{ PART_REQUIREMENT : uses
    PART_REQUIREMENT }o--|| CANONICAL_PART : matches

    MAKER {
        string maker_id PK "UUID"
        string name "Ej: Toyota, Changan, Chevrolet"
        string origin_country "JP, CN, US"
    }
    MODEL {
        string model_id PK "UUID"
        string maker_id FK
        string canonical_name "Ej: Corolla, Alsvin, Aveo"
        string body_type "Sedan, SUV, Pickup, Hatchback"
    }
    GENERATION {
        string gen_id PK "UUID"
        string model_id FK
        int year_start "2008"
        int year_end "2014"
        string local_nickname "Ej: 'New Sensation', 'Boca de Bagre'"
    }
    TRIM {
        string trim_id PK "UUID"
        string gen_id FK
        string engine_code "Ej: 1ZZ-FE (1.8L)"
        string transmission "Manual 5v / Automática 4v"
        string fuel_type "Gasolina 91/95"
    }
    CANONICAL_PART {
        string part_id PK "UUID"
        string part_number_oem "Número parte fabricante"
        string category "Frenos, Suspensión, Filtración, Inyección"
        string standard_name "Pila de Gasolina, Pastillas Delanteras"
        boolean critical_for_venezuela "True si falla por gasolina/huecos"
    }
```

### Reglas de Normalización de Entidades:
1. **Identificador Global Canónico (CarID):** Cada vehículo comercializado en Venezuela posee un UUID inmutable que desacopla el nombre comercial de su especificación técnica.
2. **Aliases y Moteado Popular:** El MDM mapea los modismos populares venezolanos (*"Corolla Pantallita"*, *"Spark Tapita"*, *"Yaris Belén"*, *"Silverado Carita Sucia"*) hacia el `trim_id` exacto, permitiendo que el buscador y el chatbot entiendan el lenguaje de la calle sin romper la consistencia relacional.
3. **Equivalencias de Repuestos (Cross-Reference Engine):** Mapeo de piezas OEM contra alternativas de repuesteras del *Aftermarket* reconocidas (Denso, Bosch, Valeo, ACDelco, 555) descartando copias de baja calidad.

---

## 2.3. Pipelines de Datos & Ingesta (ETL / ELT)

```mermaid
sequenceDiagram
    autonumber
    participant App as App Cliente / API
    participant Kafka as Event Stream (Kafka/Redpanda)
    participant Lake as Data Lakehouse (Parquet/Iceberg)
    participant DBT as dbt Core Engine
    participant Gold as PostgreSQL / Supabase (Gold DB)

    App->>Kafka: Evento: Nuevo gasto de combustible ($20 USD / 40L)
    App->>Kafka: Evento: Código DTC consultado (P0420 - Aveo 2011)
    Kafka->>Lake: Micro-batching a Bronze Layer (cada 15 min)
    DBT->>Lake: Lectura de Bronze & Validación de Esquema
    DBT->>DBT: Ejecución de reglas Silver (conversión BCV, tipado)
    DBT->>Gold: Actualización de Data Marts (Cálculo $/km y Health Score)
    Gold-->>App: Dashboard analítico actualizado en tiempo real
```

### Orquestación y Herramientas:
- **Orquestador:** **Prefect** o **Airflow** ligero en contenedor Docker.
- **Transformación en el Data Warehouse:** **dbt (data build tool)** para control de versiones en SQL, pruebas automáticas de integridad y generación de documentación de linaje.
- **Ingesta de Fichas Técnicas:** Scrapers programados que ingieren especificaciones oficiales y validan contra la base de datos global de la **NHTSA VPIC API**.

---

## 2.4. Data Quality & Data Observability

Para garantizar la veracidad de las recomendaciones del Matchmaker y la precisión del dashboard, se implementa un marco de observabilidad de datos basado en **Great Expectations** y pruebas automatizadas en **dbt**:

| Dimensión de Calidad | Regla / Prueba Implementada | Acción ante Falla |
| :--- | :--- | :--- |
| **Completitud** | Todo registro de vehículo debe contener obligatoriamente: `trim_id`, `combustible`, `despeje_suelo_mm` y `capacidad_tanque_litros`. | Registro rechazado a cuarentena (*Dead Letter Queue*). |
| **Consistencia de Kilometraje** | `Kilometraje_Actual >= Kilometraje_Anterior` (Monotonicidad estricta). La tasa de avance no puede exceder los 1,000 km/día (salvo flag explícito de viaje). | Alerta de posible manipulación de odómetro / error de dedo del usuario. |
| **Data Drift en Precios** | Desviación estándar del precio promedio de mercado de un modelo específico > 25% en una ventana móvil de 7 días. | Alerta al equipo comercial para revisar si hubo distorsión cambiaria o error de scraping. |
| **Validez de Códigos DTC** | El código ingresado debe coincidir con la expresión regular `^[PBCU][0-3][0-9A-F]{3}$` (Estándar SAE J2012). | Si no existe, se clasifica como código específico de fabricante o error tipográfico y se envía a revisión. |

---

## 2.5. Privacidad, Seguridad y Anonimización de Datos

1. **Anonimización de Patrones de Uso y Kilometraje:**
   - Para alimentar los modelos de recomendación general (Big Data automotriz), los datos de conducción y fallas se disocian completamente del nombre, cédula/DNI y correo electrónico del usuario mediante técnicas de **K-Anonimato**.
2. **Cifrado de Número de Chasis (VIN) y Placas:**
   - El VIN y la placa del vehículo se consideran identificadores sensibles. Se almacenan cifrados a nivel de columna con **AES-256-GCM** y se indexan mediante hashes ciegos (*Blind Indexing con HMAC-SHA256*) para permitir búsquedas sin exponer el dato en texto plano.
3. **Linaje del Dato (Data Lineage):**
   - Trazabilidad completa con dbt Docs y OpenLineage: cualquier cálculo visible en el dashboard (ej. *"Costo por kilómetro: $0.14 USD/km"*) puede ser auditado hacia atrás hasta el ticket de combustible o factura original que lo originó.

---

## 2.6. Modelado Analítico y Preparación para IA / RAG

```mermaid
flowchart TD
    RawDocs["Manuales de Taller + Guías SAE + Fichas Técnicas"] --> Chunking["Chunking Semántico por Sistema Mecánico"]
    Chunking --> Embedding["Generador de Embeddings (OpenAI / Cohere / Local)"]
    Embedding --> VectorDB[("Base de Datos Vectorial (pgvector)")]
    
    UserQuery["Consulta del Usuario: 'Mi Yaris suena como matraca al cruzar'"] --> QueryEmbed["Embedding de la Consulta"]
    QueryEmbed --> SimilaritySearch["Búsqueda de Similitud Coseno (k-NN)"]
    VectorDB --> SimilaritySearch
    SimilaritySearch --> Context["Contexto Enriquecido: Fallas comunes de triceta / punta de tripoide en Yaris"]
    Context --> LLM["LLM (Generación en lenguaje accesible CharuAutos)"]
    LLM --> Answer["Explicación clara, costo aproximado y prevención anti-estafas"]
```

- **Almacenamiento Vectorial:** Extensión **pgvector** integrada en la misma base de datos PostgreSQL, evitando mantener una infraestructura separada en la etapa de MVP.
- **Metadatos Enriquecidos:** Cada fragmento vectorial incluye filtros relacionales: `{ "marca": "Toyota", "modelo": "Yaris", "componente": "Tripoide/Junta Homocinética", "frecuencia_venezuela": "Alta" }`.
