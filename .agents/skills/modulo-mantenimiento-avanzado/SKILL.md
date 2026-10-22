---
name: modulo-mantenimiento-avanzado
description: >-
  Prompt Maestro y arquitectura de ingeniería para el Módulo de Control de Mantenimiento Preventivo y Correctivo ("Mi Garage 2.0") en Charu motorhub. Incluye roles multidisciplinarios (Ingeniero OEM, Seguridad Vial, Cripto-Seguridad SHA-256, UX Cockpit, Auditor TCO y Copiloto Charulo), Doble Régimen (Normal OEM vs. Severo/Tropicalizado), Health Score Dinámico (0-100), System Prompt IA con responseSchema y el perfil semilla real del GWM Haval Jolion Classic 1.5L Turbo Sincrónico (6MT - 100 km).
---

# 🛡️ Skill: Módulo de Mantenimiento Inteligente y Seguridad Vehicular (`Mi Garage 2.0`)

Esta skill define las directrices maestras de ingeniería automotriz, experiencia de usuario (UI/UX), cripto-seguridad (`SHA-256`) e inteligencia artificial para construir, mantener o expandir el módulo **Mi Garage** en `app/public/index.html` y `app/public/app.js`.

---

## 🎭 1. Roles Asumidos por el Sistema

Siempre que operes sobre el módulo de mantenimiento de **Charu motorhub**, debes actuar integrando estos 6 roles:
1. **Ingeniero Jefe de Mantenimiento OEM & Tribología (`SAE/API/ISO/DOT`):** Dominio de manuales de fabricante, lubricación de motores turbo (`SAE 5W-30 API SP` anti-LSPI), distribución por cadena vs. correa y transmisiones manuales (`6MT`) y automáticas.
2. **Especialista en Seguridad Vial Activa y Pasiva:** Priorización absoluta de sistemas críticos para la vida (Frenos `DOT 4`, neumáticos, suspensión, dirección `EPS` y enfriamiento).
3. **Arquitecto de Cripto-Seguridad (`SHA-256`):** Validación de monotonicidad del odómetro (`km_nuevo >= km_actual`) y sellado de cada servicio preventivo/correctivo en la Micro-Blockchain para respaldar la garantía y el valor de reventa (`Pasaporte Criptográfico CharuPro`).
4. **Lead UI/UX Designer (`Urban Vitality & Cockpit OLED`):** Flujos sin fricción (registro en `< 15s`), semáforos Cero Ansiedad (🟢/🟡/🔴) y tokens oficiales (`#071520`, `#13334C`, `#00E676`, `Oswald`, `Poppins`, `JetBrains Mono`).
5. **Auditor Financiero de TCO & Escudo Anti-Estafas:** Cálculo de costo por kilómetro (`$/km` en `USD` + `Bs. BCV`) y alertas contra malas prácticas de taller.
6. **Copiloto Leal "Charulo":** Comunicación cercana, pedagógica y empoderadora.

---

## 🚗 2. Vehículo Base Semilla Precargado (`charu_active_vehicle`)

El perfil predeterminado del módulo corresponde al vehículo real del usuario (manteniendo soporte multi-vehículo para agregar o cambiar de auto en cualquier momento):

```json
{
  "id": "gwm-haval-jolion-classic-6mt",
  "maker": "GWM Haval",
  "model": "Jolion Classic",
  "year": 2026,
  "engine": "1.5L Turbo (GW4G15K) 4 Cil. 16V DOHC",
  "timingSystem": "Cadena metálica + Tensor hidráulico",
  "oilSpec": "SAE 5W-30 100% Sintético (API SP / ILSAC GF-6A) - 4.2L",
  "transmission": "Sincrónica 6 Velocidades (6MT) - GL-4 75W-80",
  "odo": 100,
  "usageRegime": "mixto_tropicalizado",
  "nickname": "Jolion Turbo",
  "plate": "EN-RODAJE"
}
```

### Protocolo Activo de Asentamiento (`0 a 1.500 km`) y Cuidado del Turbo:
Cuando `currentOdometer < 1500`, el módulo muestra recomendaciones activas de *Break-in*:
- **Límite de RPM:** Mantener entre `2.000 y 3.500 RPM`, evitando aceleraciones a fondo (WOT) y velocidades constantes prolongadas para asentar anillos, cilindros y sincronizadores de la caja `6MT`.
- **Asentamiento de Frenos (`0 a 500 km`):** Frenadas progresivas para acoplar pastillas y discos sin cristalización.
- **Regla de Oro del Turbo (*Cool-down* de `60s`):** Esperar `45-60 segundos` en ralentí antes de apagar el motor tras rodar en autopista o subidas para evitar que el aceite `5W-30` se carbonice en el eje de la turbina.
- **Primer Servicio de Asentamiento Obligatorio:** A los `5.000 km` o `6 meses` (reemplazo de aceite de asentamiento y filtro OEM).

---

## 📊 3. Matriz de Intervalos OEM vs. Severo/Tropicalizado (Haval Jolion 1.5T `6MT`)

| Sistema | Tarea / Insumo | Especificación OEM | Intervalo Normal OEM | Intervalo Severo / Mixto VE | Peso Health Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Asentamiento** | 1er Servicio Break-in | Aceite `5W-30 API SP` + Filtro OEM + Inspección general | `5.000 km` / `6 meses` | `5.000 km` / `6 meses` | Crítico (`15 pts`) |
| **Lubricación** | Aceite de Motor + Filtro | `SAE 5W-30` 100% Sintético `API SP` (`4.2 L`) | `10.000 km` / `12 meses` | `5.000 - 7.500 km` / `6 meses` | Crítico (`15 pts`) |
| **Filtración** | Filtro de Aire de Motor | Elemento seco alta densidad Turbo | `20.000 km` / `12 meses` | `10.000 - 15.000 km` / `9 meses` | Alto (`8 pts`) |
| **Filtración** | Filtro de Gasolina | Filtro en línea alta retención | `20.000 km` / `12 meses` | `10.000 - 15.000 km` / `6-9 meses` | Alto (`10 pts`) |
| **Filtración** | Filtro de Cabina (A/C) | Antipolen / Carbón activado | `15.000 km` / `12 meses` | `10.000 km` / `6 meses` | Medio (`4 pts`) |
| **Encendido** | Bujías del Motor Turbo | Iridio OEM `GW4G15K` | `40.000 km` / `24 meses` | `30.000 km` / `24 meses` | Crítico (`12 pts`) |
| **Inyección** | Limpieza Inyectores y Cuerpo Acel. | Ultrasonido + calibración electrónica | `40.000 km` / `24 meses` | `25.000 - 30.000 km` / `18 meses` | Alto (`6 pts`) |
| **Distribución** | Cadena de Tiempo + Tensor | Cadena metálica lubricada por aceite | Inspección `100.000 km` | Inspección acústica desde `80.000 km` | Crítico (`15 pts`) |
| **Accesorios** | Correa Única + Polea Tensora | Serpentina EPDM | `60.000 km` / `48 meses` | `45.000 - 50.000 km` / `36 meses` | Alto (`10 pts`) |
| **Transmisión** | Aceite Caja Sincrónica `6MT` | Sintético `75W-80` / `75W-90 API GL-4` (`~2.2 L`) | `40.000 - 60.000 km` / `36 m` | `30.000 - 40.000 km` / `24 meses` | Alto (`8 pts`) |
| **Frenos/Embrague** | Líquido de Frenos y Croche | Sintético `DOT 4` (Higroscópico) | `40.000 km` / `24 meses` | `30.000 km` / `18-24 meses` | Crítico (`15 pts`) |
| **Frenos** | Pastillas y Discos (4 Ruedas) | Compuesto cerámico/OEM (`> 3 mm`) | Inspección `10k` / Cambio `40k` | Inspección `5k` / Cambio `25k-30k` | Crítico (`15 pts`) |
| **Enfriamiento** | Refrigerante / Coolant | Orgánico `OAT 50/50` (`~7.5 L`) | `50.000 km` / `36 meses` | `40.000 km` / `24 meses` | Crítico (`12 pts`) |
| **Neumáticos** | Rotación, Balanceo y Alineación 3D | `33-35 PSI` en frío + Geometría 3D | `10.000 km` / `6 meses` | `7.500 - 10.000 km` / `6 meses` | Crítico (`10 pts`) |
| **Suspensión/EPS** | Tren Delantero, Bujes y Amort. | McPherson + Barra torsión + `EPS` | Inspección `20.000 km` | Inspección cada `10.000 km` | Alto (`8 pts`) |
| **Eléctrico** | Batería `12V` y Alternador | Prueba `CCA` y voltaje `13.8V-14.4V` | Inspección `10k` / Cambio `48m` | Inspección `6m` / Cambio `24-36m` | Alto (`6 pts`) |

---

## 🔐 4. Integración Criptográfica (`SHA-256`) y Bimonetaria (`USD` / `Bs. BCV`)

Cada vez que el usuario registra un mantenimiento preventivo o correctivo:
1. Se verifica que el kilometraje ingresado cumpla la **regla de monotonicidad** (`km >= currentOdometer`).
2. Se almacena en `localStorage` (`charu_maintenance_logs`) y se encola en `addMutation("service_records", "INSERT_SERVICE", payload)`.
3. Se genera automáticamente un bloque en la Micro-Blockchain (`blockchain`) cuyo motivo e información sellada incluye: `[PREVENTIVO/CORRECTIVO] Tarea + Especificación/Marca + Costo USD/Bs`.
4. Se recalcula en tiempo real el `Health Score (0-100)` y el `Costo por km ($/km)` en el panel principal de **Mi Garage**.
