# Proyecto: CharuAutos App (Ecosistema Automotriz Digital)

¡Bienvenido al repositorio maestro del software de **CharuAutos App**!

Este directorio contiene la arquitectura, especificaciones técnicas, gobernanza de datos, ciberseguridad y código fuente de la aplicación que estamos desarrollando juntos: el copiloto digital definitivo para el conductor inteligente en Venezuela e Hispanoamérica.

---

## 📚 Suite de Documentación Maestra (`app/docs/`)

La documentación técnica y de negocio completa está organizada de forma modular:

| Documento | Enfoque Principal |
| :--- | :--- |
| 📑 **[00. Índice y Arquitectura Documental](docs/00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md)** | Mapa general, trazabilidad y decisiones de diseño del MVP. |
| 💼 **[01. Resumen Ejecutivo y Modelo de Negocio](docs/01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md)** | Mercado venezolano, modelo híbrido (Freemium B2C + B2B Marketplace/Leads) y Unit Economics. |
| 🗄️ **[02. Gestión y Gobernanza de Datos](docs/02_GESTION_Y_GOBERNANZA_DE_DATOS.md)** | Arquitectura Medallion (Bronze/Silver/Gold), MDM vehicular, linaje, calidad y RAG vectorial. |
| 🔍 **[03. Especificación Funcional de los 3 Pilares](docs/03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md)** | Matchmaker inteligente, Asistente OBD2 manual con Escudo Anti-Estafas y Cuaderno Dinámico. |
| ⚙️ **[04. Arquitectura Técnica y Stack de Software](docs/04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md)** | Diagrama C4, React Native (Expo), NestJS, FastAPI, esquemas PostgreSQL/TimescaleDB. |
| 🔒 **[05. Ciberseguridad, Implementación y Mantenimiento](docs/05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md)** | STRIDE, OWASP Mobile/API, hashing SHA-256 anti-fraude de odómetro, Zero Trust y DevSecOps. |
| 🎨 **[06. Diseño UI/UX y Experiencia del Usuario](docs/06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md)** | Design Tokens Dark Showroom, wireflows, accesibilidad en ruta y modo manos sucias. |
| 🚀 **[07. Plan de Ejecución, Roadmap y Go-To-Market](docs/07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md)** | Plan de 4 Sprints (8 semanas para MVP), estrategia GTM Venezuela y KPIs. |
| 📊 **[Executive Brief para Inversores](docs/analisis_inicial_inversores.md)** | Tesis de inversión, análisis de tracción y foso defensivo (*Moat*). |

---

## 📁 Estructura del Directorio `app/`

```text
app/
├── README.md                              # Este mapa maestro de navegación
├── docs/                                  # Especificaciones funcionales, técnicas y de gobernanza
│   ├── 00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md
│   ├── 01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md
│   ├── 02_GESTION_Y_GOBERNANZA_DE_DATOS.md
│   ├── 03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md
│   ├── 04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md
│   ├── 05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md
│   ├── 06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md
│   ├── 07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md
│   └── analisis_inicial_inversores.md
├── public/                                # Activos gráficos, iconos, splash screens
└── src/                                   # Código fuente de la aplicación (Frontend & Backend)
```

---

## 🛠️ Parámetros Estratégicos del MVP

- **Mercado Inicial:** Venezuela (Caracas / Valencia / Maracaibo / Barquisimeto).
- **Hook de Entrada (Día 1):** Módulo Matchmaker de Compra y Comparador Inteligente de Vehículos.
- **Monetización:** Modelo Híbrido (Suscripción *CharuPro* + Marketplace de Talleres/Repuestos + Venta de Leads a Concesionarios).
- **Diagnóstico OBD2:** Manual y asistido por síntomas (sin dependencia obligatoria de hardware Bluetooth en el MVP).
- **Arquitectura de Software:** Local-First Reactive Sync (100% operativa sin conexión en autopistas).
