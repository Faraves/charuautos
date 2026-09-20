---
name: comparador-vehicular-avanzado
description: Guía y directrices de ingeniería para el comparador multi-vehículo avanzado en CharuAutos, integrando matriz técnica categorizada, filtros dinámicos (Solo Diferencias / Resaltar Mejores), visualización con Chart.js (Barras y Radar), asistente inteligente de elección y pasarelas de monetización B2B/B2C.
---

# Skill: Comparador Vehicular Avanzado & Matriz Técnica Dinámica

Esta habilidad documenta las capacidades y patrones de implementación para el **Comparador de Vehículos de CharuAutos**, inspirada en las especificaciones maestras de `autocompare_pro_gestor_y_comparador_multi_veh_culo.html` y `dashboard_comparativo_interactivo.html`.

---

## 🚀 1. Arquitectura de Navegación del Módulo Comparador

El comparador se organiza internamente en 4 sub-secciones ergonómicas y fluidas mediante pestañas de acceso rápido:

```text
Comparador de Vehículos (Sub-Vistas):
├── 1. Ficha & Matriz Comparativa (Buscador, Filtros de Categoría, "Solo Diferencias", "Resaltar Mejores")
├── 2. Gráficos Visuales (Gráfico de Barras de Rendimiento + Radar de Atributos Clave con Chart.js)
├── 3. Asistente Inteligente (¿Cuál Elegir?) (Ponderador de prioridades del usuario con scoring en tiempo real)
└── 4. Servicios & Monetización B2B (Presupuestos de repuestos afiliados, talleres verificados y seguros)
```

---

## 🎛️ 2. Capacidades de la Matriz Comparativa Dinámica

### A. Filtros Instantáneos de Inspección:
1. **Buscador en Tiempo Real:** Entrada de texto reactiva (`matrixSearch`) que filtra filas técnicas al escribir (ej. "Torque", "ABS", "Despeje", "Tanque", "Maleta").
2. **Filtros por Categoría Técnica:**
   - `Todas`: Muestra el catálogo completo de filas.
   - `Motor & Tracción`: Cilindrada, HP, Torque, Tipo de Inyección, Transmisión, Tracción 4x4/AWD/FWD.
   - `Dimensiones & Carga`: Despeje libre al suelo (mm), Capacidad de Maletero (L), Tanque de Combustible (L), Peso en vacío (kg).
   - `Seguridad & Confort`: Bolsas de aire (Airbags), Control de Estabilidad (ESP/TCS), Frenos ABS+EBD, Pantalla multimedia.
3. **Interruptor "Solo Diferencias" (`toggleDiffOnly`):**
   - Oculta instantáneamente aquellas filas donde todos los vehículos comparados poseen exactamente el mismo valor o equipamiento, dejando visibles únicamente las discrepancias críticas que definen una decisión de compra.
4. **Interruptor "Resaltar Mejores Datos" (`toggleHighlightBest`):**
   - Calcula el valor óptimo en cada métrica cuantitativa (mayor potencia, mayor torque, mayor despeje, mayor maletero, mayor tanque, menor peso) y le aplica un estilo distintivo con insignia verde esmeralda y medalla de trofeo (`LÍDER`).

---

## 📊 3. Visualización de Datos con Chart.js

### A. Gráfico de Barras (Rendimiento Mecánico & Capacidades)
- Compara directamente en un gráfico de barras agrupadas:
  - Potencia (HP)
  - Torque Máximo (Nm)
  - Despeje Libre al Suelo (mm)
  - Tanque de Combustible (L)
  - Capacidad de Maletero escalada (L / 10)
- Paleta sobria por vehículo: Azul Cobalto (`#3b82f6`), Esmeralda (`#10b981`), Ámbar (`#f59e0b`), Cian Hielo (`#38bdf8`), Violeta (`#8b5cf6`).

### B. Radar de Atributos Clave (Balance General 0 - 100)
- Ejes normalizados:
  1. **Potencia & Aceleración** (basado en HP y relación peso/potencia).
  2. **Eficiencia & Autonomía** (basado en tanque y consumo estimado).
  3. **Aptitud contra Baches** (basado en despeje mm respecto a 160 mm estándar).
  4. **Capacidad de Carga** (basado en maletero L).
  5. **Seguridad & Asistencias** (basado en ESP, Airbags y tracción).

---

## 🧠 4. Asistente Inteligente de Elección (¿Cuál Elegir?)

Permite al usuario seleccionar sus prioridades principales entre los vehículos **actualmente en comparación**:
- Prioridad 1: Entorno de Vías (Baches severos vs. Autopista rápida).
- Prioridad 2: Tolerancia a Combustible (Gasolina regular con sedimentos vs. Alta tecnología Euro V/VI).
- Prioridad 3: Espacio Familiar / Carga (Maleta grande vs. Tamaño compacto para estacionar).

El algoritmo calcula un porcentaje de recomendación personalizado sobre los modelos comparados y emite un veredicto técnico honesto.

---

## 💰 5. Integración con el Modelo de Negocio SaaS y Marketplace

- **Botón "Cotizar Repuestos Asociados":** Enlaza las especificaciones de mantenimiento preventivo del modelo con repuesteras certificadas (afiliación 6-10%).
- **Botón "Agendar Revisión Pre-Compra":** Deriva al usuario a la red de talleres verificados ("Red Don Carlos", take-rate 12-15%).
- **Botón "Cotizar Seguro / Financiamiento":** Genera un lead calificado para concesionarios aliados ($15-$35 USD).
