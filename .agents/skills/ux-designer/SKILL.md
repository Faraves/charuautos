---
name: design-ux
description: "Auditoría de UX / Usabilidad — evaluación heurística de interfaces de usuario INTERACTIVAS (no solo estética visual). Utilizar junto con diseño cuando una UI \"se siente incómoda\", \"es frustrante de usar\", resulta difícil de aprender, requiere un muro de instrucciones explicativas o antes de publicar una herramienta/editor/app interactiva."
risk: critical
source: https://github.com/connerkward/ckw-design-skill/tree/main/deterministic-design/design-ux
source_repo: connerkward/ckw-design-skill
source_type: community
date_added: 2026-07-01
license: MIT
license_source: https://github.com/connerkward/ckw-design-skill/blob/main/LICENSE
author: Conner K Ward
---

# design-ux — Auditoría de Usabilidad (Evaluación Heurística)

## Cuándo Utilizar

Utiliza esta habilidad cuando requieras una auditoría de UX / usabilidad —evaluación heurística de interfaces interactivas (más allá del acabado visual estético)—. Aplícala junto a diseño cuando una UI "se siente incómoda", "es frustrante de usar", es difícil de aprender, necesita párrafos de instrucciones o antes de poner en producción cualquier herramienta interactiva. Califica la UI RENDERIZADA contra las 10 heurísticas de Nielsen y complementos de interacción modernos.

Usabilidad ≠ Estética. El sistema de diseño se encarga de que se *vea* bien; esta auditoría comprueba si un usuario primerizo puede completar su tarea **sin que nadie le explique cómo**.

## Regla 0: Ojos frescos sobre el artefacto renderizado

**Nunca te autoevalúes.** Quien construye tiende a justificar su propia interfaz. Renderiza la UI *en vivo* en su **estado de carga inicial por defecto** (no capturas acomodadas a mano), captura un **rastro de interacción** de la tarea principal y haz que un **evaluador independiente** (un subagente que no haya construido la UI) la califique. Una lista de intenciones o cambios no es una auditoría: la auditoría es un juez neutral buscando activamente qué está *fallando* en la pantalla real.

## Procedimiento Paso a Paso

1. **Definir la(s) tarea(s) primaria(s):** La razón por la que existe la UI (ej. "recortar un clip, ajustar su velocidad y exportarlo"). La auditoría se mide en función de esta tarea, no de apreciaciones estéticas abstractas.
2. **Renderizar el estado inicial y rastrear la tarea:** Captura la UI en su primer arranque (en resolución ancha Y móvil estrecha). Realiza la tarea paso a paso tomando capturas del avance.
3. **Calificar cada heurística en el artefacto:** Pasa / Falla, **Severidad** (bloqueante / mayor / menor), un hallazgo con *ubicación específica* en pantalla y una solución concreta.
4. **Priorizar correcciones:** Bloqueantes → Mayores → Menores. Agrupa las correcciones que impacten la misma superficie o componente.
5. **Corregir, volver a renderizar y recalificar:** No declares un problema solucionado sin auditar nuevamente el artefacto final generado.

## Heurísticas de Evaluación (Las 10 de Nielsen + Complementos Modernos)

| # | Heurística (Nielsen 1994) | Qué verificar en ESTA interfaz |
|---|---|---|
| 1 | **Visibilidad del estado del sistema** | Cada acción ofrece retroalimentación visible; el estado actual/selección/modo siempre es comprensible; barras de progreso para operaciones lentas. |
| 2 | **Correspondencia entre el sistema y el mundo real** | Metáforas y convenciones familiares del entorno del usuario; no inventar gestos crípticos que el usuario deba memorizar. |
| 3 | **Control y libertad del usuario** | Opciones claras de deshacer/rehacer (undo/redo), cancelar y salidas evidentes de cualquier pantalla o modal; reversible por defecto. |
| 4 | **Consistencia y estándares** | Elementos idénticos lucen y se comportan igual; respeto a atajos y convenciones de la plataforma (ej. Ctrl+Z, Delete, arrastrar para mover). |
| 5 | **Prevención de errores** | Los estados inválidos son imposibles de activar; acciones destructivas exigen confirmación o son fácilmente reversibles. |
| 6 | **Reconocimiento antes que recuerdo** | Las opciones y funcionalidades están **a la vista**: nada de memorizar. *Un muro de texto explicativo denota una falla en esta heurística: si necesitas explicar con párrafos cómo hacer scroll, zoom o doble clic, falta una señal visual intuitiva.* |
| 7 | **Flexibilidad y eficiencia de uso** | Flujo amigable para novatos y aceleradores/atajos para usuarios avanzados; configuración inicial sensata sin requerir setup complejo. |
| 8 | **Diseño estético y minimalista** | Máxima señal, mínimo ruido visual; eliminar elementos superfluos; la superficie principal de trabajo debe ser la protagonista visual. |
| 9 | **Ayudar a reconocer, diagnosticar y recuperarse de errores** | Mensajes de error en lenguaje humano claro (sin volcar logs crudos de stderr) y ofreciendo un camino claro de solución. |
| 10 | **Ayuda y documentación** | Rara vez necesaria si los puntos 1–9 se cumplen; enfocada en tareas puntuales, contextual y sin sermones al tope de página. |

### Complementos de Interacción Clave:
- **No me hagas pensar (Steve Krug):** Los controles deben ser autoevidentes; la interfaz debe enseñarse a sí misma.
- **Ley de Fitts y tiempo de tránsito:** Los controles deben ubicarse cerca de donde la tarea deja el cursor. Las propiedades de un objeto seleccionado deben estar contiguas al objeto (menú emergente/dock), no en un panel lejano.
- **Descubrimiento de gestos:** Cualquier gesto no evidente (rueda del ratón, arrastrar bordes, doble clic) requiere una pista visual explícita (manija, icono, cambio de cursor en hover).
- **Peso visual coherente:** La superficie que el usuario opera activamente (lienzo, línea de tiempo, editor) debe ser la protagonista visual, no una franja diminuta.
- **Divulgación progresiva:** Mostrar lo esencial de inmediato y lo avanzado bajo demanda. Divulgar no significa ocultar la herramienta principal.
- **Temporización de Tooltips:** Retardo sutil en el primer tooltip (~300–700ms en hover) para evitar parpadeos molestos al mover el mouse; una vez desplegado uno, los tooltips vecinos aparecen instantáneamente.
- **Restauración de la posición del scroll:** Regresar atrás o adelante debe devolver al usuario al punto exacto donde estaba, nunca al inicio de la página.
- **Idempotencia en envíos:** Las acciones mutables llevan un token de idempotencia y deshabilitan el botón con spinner para evitar cobros dobles o duplicación por clics repetidos.

## Formato del Reporte de Auditoría

Una tabla detallada: `Heurística | Hallazgo (Ubicación) | Severidad | Solución Concreta`, seguida de una lista priorizada de correcciones (bloqueantes primero).

## Limitaciones

- No sustituye la prueba real de usuarios con perfiles finales o pruebas de laboratorio físico.
- Aplica para validar usabilidad interactiva en interfaces funcionales.