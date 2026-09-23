# Documentación Maestra — Plataforma SaaS Cloud-Native CharuAutos
### Arquitectura Integral de Plataforma Comercial en la Nube, Modelo de Negocio SaaS, Motor RAG Multimodal y Dominio Automotriz
*Enfoque: Plataforma Comercial Cloud-Native Distribuida • Modelo SaaS Multimoneda • Arquitectura de Alta Disponibilidad*

---

## 🏛️ 1. Declaración de Enfoque: Arquitectura Cloud-Native & Plataforma SaaS

La arquitectura técnica de **CharuAutos** se fundamenta estrictamente como una **Plataforma SaaS Cloud-Native y Multi-Tenant** de alta escalabilidad comercial. Se descarta cualquier concepción de script o utilitario local: el sistema opera con backend distribuido en la nube, APIs RESTful y GraphQL, sincronización bidireccional en tiempo real para aplicaciones móviles (iOS / Android) y web, persistencia políglota centralizada (PostgreSQL, TimescaleDB, pgvector y Redis) y perfiles de usuario unificados con autenticación federada OAuth2/OIDC.

> [!IMPORTANT]
> **Directriz de Arquitectura Comercial:**
> Todos los módulos y subsistemas están diseñados para operar como servicios desacoplados en infraestructura de nube elástica (Kubernetes / Serverless Containers), garantizando tolerancia a fallos, soporte de alta concurrencia y despliegue global.

---

## 📑 2. Estructura del Índice Maestro Actualizado

```text
📁 app/docs/
│
├── 00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md
│   ├── 1. Declaración de Enfoque y Transición Arquitectónica (De Local a Cloud-Native SaaS)
│   ├── 2. Matriz de Roles y Competencias Multidisciplinarias Senior
│   ├── 3. Estructura y Mapeo Detallado del Índice Maestro
│   └── 4. Matriz de Trazabilidad de Requerimientos vs. Componentes del Sistema
│
├── 01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO_SAAS.md
│   ├── 1.1. Tesis de Mercado y Oportunidad: Fricción e Información Asimétrica en LatAm
│   ├── 1.2. Propuesta de Valor Única (UVP) y Foso Defensivo (Moat)
│   ├── 1.3. Modelo de Negocio SaaS B2C & B2B:
│   │   ├── B2C Freemium vs. Suscripción Recurrente "CharuPro" ($3.99/mes o $29.99/año)
│   │   ├── B2B Marketplace de Talleres Mecánicos Verificados (Take-rate 12% - 15%)
│   │   ├── B2B Red de Repuestos Certificados y Afiliación E-commerce (Comisión 6% - 10%)
│   │   ├── B2B Lead Generation Calificado para Concesionarios y Agencias ($15 - $35 por lead)
│   │   ├── B2B Alianzas de Seguros Vehiculares y Garantías Extendidas
│   │   ├── Publicidad Nativa No Intrusiva y Segmentada (Recomendación contextual de marcas)
│   │   └── B2B SaaS "CharuFleet" para Micro-Flotas y Talleres Aliados ($49 - $149/mes)
│   ├── 1.4. Pasarelas de Pago Bimonetarias y Tokenización Recurrente (Stripe, Pago Móvil, Binance Pay)
│   └── 1.5. Unit Economics SaaS (CAC, LTV, Churn, Payback Period, Ratio LTV/CAC > 7x)
│
├── 02_GESTION_GOBERNANZA_Y_MODELADO_DE_DATOS_CLOUD.md
│   ├── 2.1. Arquitectura de Datos Lakehouse (Capa Medallion: Bronze -> Silver -> Gold en Cloud)
│   ├── 2.2. Master Data Management (MDM) y Ontología Automotriz Canónica
│   ├── 2.3. Modelado de Datos Vehiculares:
│   │   ├── Esquema Relacional de Fichas Técnicas Multidimensionales
│   │   ├── Esquema NoSQL Documental para Brochures y Especificaciones Desestructuradas
│   │   └── Esquema de Series de Tiempo (TimescaleDB) para Telemetría y Odómetros
│   ├── 2.4. Ingesta Continua, ETL/ELT y Pipelines de Validación Automotriz (Great Expectations)
│   └── 2.5. Gobernanza, Privacidad y Cumplimiento Normativo (Trazabilidad, Anonimización y Cifrado)
│
├── 03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES_CORE.md
│   ├── 3.1. Pilar 1: Módulo de Búsqueda y Comparación (Matchmaker + Fichas Técnicas con RAG)
│   │   ├── Ingeniería de Prompts Conversacionales (Traducción de lenguaje cotidiano a ingeniería)
│   │   ├── Motor de Recomendación y Ponderación Multi-Criterio (Ajuste TCO, Vías, Repuestos)
│   │   ├── Arquitectura RAG para Fichas Técnicas (Recuperación precisa sin alucinaciones)
│   │   └── Interfaz Comparativa Lado a Lado Dinámica (Hasta 5 vehículos simultáneos)
│   ├── 3.2. Pilar 2: Asistente Mecánico y Diagnóstico OBD2
│   │   ├── Base de Datos y Motor Predictivo de Códigos DTC (SAE J2012 / ISO 15031)
│   │   ├── Semáforo de Severidad (Nivel 1: Seguro, Nivel 2: Atención, Nivel 3: Detención Crítica)
│   │   ├── Desglose Causa-Raíz 80/20 adaptado a Combustibles y Vías Complejas
│   │   └── Generador del "Escudo Anti-Estafas" (Libreto de preguntas clave para el taller)
│   └── 3.3. Pilar 3: Cuaderno de Mantenimiento Dinámico & Dashboard Analítico Cloud
│   │   ├── Algoritmo Analítico de Costo Real por Kilómetro ($/km bimonetario USD / VES)
│   │   ├── Curva de Eficiencia de Combustible (km/L y L/100km según ciclo urbano/carretera)
│   │   ├── Algoritmo del "Health Score" Vehicular Dinámico (0 a 100%)
│   │   ├── Modelos de Desgaste Predictivo y Proyección de Gastos a 3, 6 y 12 meses
│   │   └── Pasaporte Digital Criptográfico con Cadena Inmutable de Odómetro (SHA-256)
│
├── 04_ARQUITECTURA_TECNICA_CLOUD_NATIVE_Y_STACK_SAAS.md
│   ├── 4.1. Arquitectura Cloud-Native Distribuida (Diagrama C4 Nivel 2 y Nivel 3)
│   ├── 4.2. Capa de Edge, API Gateway y Autenticación Segura (Kong, OAuth2/OIDC, JWT, RBAC)
│   ├── 4.3. Backend Centralizado y Microservicios:
│   │   ├── Core API Service (NestJS / Node.js)
│   │   ├── AI & RAG Engine (FastAPI / Python / LangChain / LlamaIndex)
│   │   ├── Analytics & Telemetry Worker (Python / Polars / Celery)
│   │   └── Sync & Notification Hub (WebSockets / Server-Sent Events / Firebase FCM)
│   ├── 4.4. Estrategia de Persistencia Políglota en la Nube:
│   │   ├── Relacional ACID (PostgreSQL 16 Multi-Tenant)
│   │   ├── Time-Series Telemetry (TimescaleDB Hypertable)
│   │   ├── Vector Store para RAG (pgvector / Qdrant con HNSW)
│   │   ├── In-Memory Caching & Task Broker (Redis Cluster)
│   │   └── Cloud Object Storage (AWS S3 / Cloudflare R2 para PDFs y Certificados)
│   ├── 4.5. Pipeline RAG de Alta Fidelidad (Chunking Semántico, Búsqueda Híbrida BM25+Vector, Reranking)
│   └── 4.6. Catálogo de APIs RESTful y Endpoints GraphQL
│
├── 05_CIBERSEGURIDAD_DEVSECOPS_Y_RESILIENCIA.md
│   ├── 5.1. Modelo de Amenazas (STRIDE) y Seguridad Aplicada a Plataformas Automotrices
│   ├── 5.2. Criptografía y Protección de Datos (AES-256-GCM, TLS 1.3, Blind Indexes)
│   ├── 5.3. Inmutabilidad y Regla de Monotonicidad de Odómetros (Micro-Blockchain SHA-256)
│   ├── 5.4. Arquitectura Zero Trust y Gestión Centralizada de Secretos (HashiCorp Vault)
│   └── 5.5. Pipeline DevSecOps (SAST, DAST, Auditoría de Dependencias y CI/CD)
│
├── 06_DISENO_UI_UX_Y_SISTEMA_VISUAL_AUTOMOTRIZ.md
│   ├── 6.1. Sistema de Diseño Sobrio "Dark Showroom & Precision Cobalt" (Porsche/Audi OEM)
│   ├── 6.2. Visualización de Datos de Baja Fricción Cognitiva (Timelines, Canvas y Semáforos)
│   ├── 6.3. Ergonomía Táctil y Modos de Uso Rápido (Modo Carretera y Modo Manos Sucias)
│   └── 6.4. Wireflows Clave: Flujo Matchmaker, Carga Multi-PDF y Escudo Diagnóstico
│
├── 07_ROADMAP_ESCALABILIDAD_Y_GO_TO_MARKET.md
│   ├── 7.1. Roadmap de Validación y Lanzamiento en 4 Fases (MVP Local -> Beta Cloud -> Expansión)
│   ├── 7.2. Estrategia Go-to-Market (Alianzas con Talleres, Creadores de Contenido y E-commerce)
│   ├── 7.3. Métricas Clave de Negocio (North Star Metric, DAU/MAU, Retención de Cohortes)
│   └── 7.4. Matriz Integral de Riesgos y Planes de Contingencia Operativa
│
├── 08_PIPELINE_EXTRACCION_MULTIMODAL_FICHAS_TECNICAS.md
│   ├── 8.1. Diagnóstico del Problema: Heterogeneidad en Catálogos Automotrices
│   ├── 8.2. Stack Tecnológico Obligatorio (Python, google.generativeai as genai, Gemini File API, Pydantic v2)
│   ├── 8.3. Pipeline de Ingesta Híbrida: Comprensión Espacial Multimodal y Glifos (● / -)
│   ├── 8.4. Esquema Estructurado Pydantic v2 y Servicio GeminiVehiclePDFParser
│   ├── 8.5. Capa de Normalización Determinista de Unidades y Ontología de Sinónimos
│   ├── 8.6. Casos de Estudio Reales Auditados (BAIC X35 y Toyota Corolla Cross)
│   └── 8.7. Guardrails Físicos y Persistencia en Base de Datos Centralizada
│
└── IDEAS_DEL_PROYECTO_MONETIZACION.md (Anexo Estratégico)
    ├── Resumen Ejecutivo y Diagnóstico de Factibilidad Inversor/Emprendedor
    ├── Evaluación de Mercado ($199M - $219M, 76% Región Capital)
    ├── Modelo de Negocio Híbrido (Freemium, Marketplace, Lead Gen, SaaS)
    ├── Matriz de 6 Fuentes de Ingreso (Prioridad, Potencial y Esfuerzo)
    └── Hoja de Ruta de Validación (Alianzas Piloto Caracas y Ronda Ángel $20k-$50k)
```

---

## 🎯 3. Matriz de Competencias Multidisciplinarias Aplicadas (5 Roles Clave)

| Rol Especialista | Aportes Principales en la Plataforma Cloud-Native SaaS | Secciones Directas |
| :--- | :--- | :--- |
| **1. Comerciante y Empresario (Monetización SaaS y B2B)** | Modelo Freemium con suscripción CharuPro recurrente, marketplace de talleres verificados (take-rate 12-15%), afiliación de repuestos OEM (6-10%), qualified lead gen para concesionarios ($15-$35) y CharuFleet B2B. | `01`, `07` |
| **2. Emprendedor de Tecnología** | Visión de producto, foso defensivo (moat) contra asimetría informativa, bucles de viralidad orgánica en redes (@charuautopics) y unit economics de alta rentabilidad (LTV/CAC > 7x, payback < 2 meses). | `01`, `07` |
| **3. Ingeniero de Software y Arquitecto Cloud** | Arquitectura distribuida Cloud-Native, microservicios desacoplados (NestJS, FastAPI, Celery), base de datos centralizada (PostgreSQL multi-tenant, TimescaleDB, Redis v7), APIs RESTful/GraphQL y autenticación JWT RS256. | `02`, `04`, `05` |
| **4. Especialista UI/UX** | Diseño "Dark Showroom & Precision Cobalt", ergonomía para conductores, prompts conversacionales de decodificación (jerga a ingeniería) y visualización de datos de baja fricción cognitiva (canvas, semáforos, timelines). | `03`, `06` |
| **5. Experto Automotriz & Parser de Datos** | Ontología vehicular, diagnóstico OBD2 (DTC SAE J2012) con regla 80/20, cálculo de $/km real, y pipeline de extracción multimodal agnóstico con `google.generativeai as genai` y Pydantic v2. | `03`, `04`, `08` |
