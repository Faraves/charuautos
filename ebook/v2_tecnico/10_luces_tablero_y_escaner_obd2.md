# Módulo 10 — Testigos del Tablero y Escáner OBD-II para Principiantes
### Manual del Conductor Inteligente • Edición Cero Conocimientos
*Por CharuAutos (@charuautopics) — "Pasión Automotriz al Alcance de tus Manos"*

---

![Cuadro de Instrumentos y Advertencias Automotrices](assets/tablero_testigos_espanol.jpg)
*Guía Gráfica de Testigos y Prioridades del Cuadro de Mandos en Español*

---

## 🚦 1. El Sistema de Semáforo del Cuadro de Instrumentos

Cuando giras la llave a la posición de contacto ("ON"), todos los testigos del cuadro se iluminan durante unos segundos en lo que se conoce como "autotest del sistema". Al arrancar el motor, deben apagarse por completo.

Si alguno permanece encendido o parpadea mientras conduces, clasifícalo inmediatamente según el código internacional de colores ISO 2575:

---

## ⚠️ 2. Los 7 Testigos Críticos que Jamás Debes Ignorar

| Icono Simbolizado | Color | Significado Real sin Jerga |
| :--- | :---: | :--- |
| **🛢️ Tetera de Aceite** | 🔴 Rojo | **PRESIÓN DE ACEITE NULA:** El motor se fundirá en segundos si no lo apagas |
| **🌡️ Termómetro en Líquido** | 🔴 Rojo | **TEMPERATURA CRÍTICA:** Sobrecalentamiento extremo del motor |
| **🪫 Batería con Polos** | 🔴 Rojo | **FALLO DE ALTERNADOR:** El sistema eléctrico se alimenta solo de la batería |
| **🛑 Círculo con Exclamación (!)** | 🔴 Rojo | **FRENO DE MANO O FUGA:** Nivel crítico en depósito de frenos |
| **🏎️ Silueta de Motor (Check Engine)**| 🟡 Amarillo | **FALLO DE SISTEMA:** Sensor averiado o combustión imperfecta (escanear) |
| **🛞 Neumático con Rayas (!)** | 🟡 Amarillo | **TPMS:** Presión baja de aire en uno o más neumáticos |
| **⭕ Círculo con letras ABS** | 🟡 Amarillo | **ABS INACTIVO:** El auto frena pero sin antibloqueo en piso deslizante |

> [!CAUTION]
> ### 🛑 La Tetera Roja: La Emergencia Más Letal
> El testigo de la tetera **NO mide la cantidad de aceite**, sino la **presión hidráulica**. Si se enciende en marcha significa que el aceite no está llegando con fuerza a las bielas y pistones. Si sigues conduciendo aunque sea 60 segundos, las piezas metálicas se soldarán por fricción extrema ("motor fundido" o "biela desbocada").  
> **Acción:** Pisar embrague, detenerse en el arcén, apagar el motor al instante y pedir grúa.

---

## 📱 3. El Escáner OBD-II para Principiantes: Diagnóstico por $15 USD

Desde 1996 en EE.UU. y 2001 en Europa, todos los automóviles cuentan por ley con un puerto estándar llamado **OBD-II (On-Board Diagnostics de 16 pines)**.

### ¿Qué necesitas para leer tu auto tú mismo?
1. **Un adaptador Bluetooth/Wi-Fi mini ELM327:** Cuesta entre $8 y $15 USD en Amazon o tiendas online.
2. **Una app gratuita en tu smartphone:** *Car Scanner ELM OBD2*, *Torque Lite* o *OBD Fusion*.

### Cómo Conectarlo y Diagnosticar en 3 Pasos:
1. Con el auto apagado, enchufa el adaptador en el puerto OBD-II bajo el tablero.
2. Pon la llave en contacto ("ON") sin arrancar el motor.
3. Abre la app en el teléfono, conéctala por Bluetooth y pulsa "Leer códigos de error (Read Fault Codes)".

### Anatomía de un Código DTC (Diagnostic Trouble Code):
La app te devolverá un código de 5 caracteres como `P0300`:
- **P (Powertrain):** Fallo en tren motriz (motor o transmisión).
- **0 (Universal):** Código estándar de la industria SAE.
- **3 (Subsistema):** Sistema de encendido / chispa.
- **00 (Código específico):** Fallo de encendido aleatorio en los cilindros (Random/Multiple Cylinder Misfire).

| Código Común OBD-II | Significado sin Jerga | Causa Más Frecuente |
| :--- | :--- | :--- |
| **P0301 / P0302 / P0303** | Fallo de encendido (chispa) en cilindro 1, 2 o 3 | Bujía desgastada o bobina de encendido defectuosa |
| **P0420** | Eficiencia del catalizador por debajo del umbral | Sensor de oxígeno sucio o catalizador fatigado |
| **P0171** | Sistema demasiado pobre (demasiado aire / poca nafta) | Manguera de vacío rajada o caudalímetro MAF sucio |
| **P0442** | Fuga pequeña en sistema EVAP de vapores | ¡El tapón del tanque de combustible quedó mal cerrado! |

> [!TIP]
> ### 💡 Borrar el Código NO Repara la Falla
> Las aplicaciones tienen un botón que dice "Clear DTC / Borrar Códigos". Si lo pulsas, la luz de Check Engine se apagará temporalmente, pero si no reparaste la pieza física rota, la computadora detectará la anomalía nuevamente tras 20 a 50 km de ciclo de conducción y volverá a encender la luz.
