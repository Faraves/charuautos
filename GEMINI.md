# Reglas de Desarrollo Canónicas — CharuAutos

## 🔄 Ciclo de Vida del Servidor Local (`app/serve_local_app.py`)

**REGLA OBLIGATORIA DE FLUJO EN CUALQUIER CAMBIO:**
Siempre que el usuario solicite realizar cualquier cambio en la app, o se tenga que modificar cualquier archivo relacionado con la app:

1. **Detener el Servicio Primero:** Detener INMEDIATAMENTE el proceso del servidor local (`manage_task` con acción `kill` sobre la tarea activa o liberando el puerto 8080) **antes** de tocar o editar cualquier archivo.
2. **Aplicar Modificaciones:** Ejecutar todos los ajustes requeridos en el código fuente (`app.js`, `index.html`, etc.), verificar la sintaxis, paridad de etiquetas HTML y consistencia técnica.
3. **Volver a Correr el Servicio Cuando Esté Listo:** Una vez listos y validados todos los cambios, reiniciar el servidor ejecutando `python serve_local_app.py` desde `app` como daemon en segundo plano (`IsDaemon: true`) y verificar respuesta `HTTP 200`.
4. **Confirmación:** Notificar al usuario que las modificaciones están completadas y que el servidor se ha reiniciado y actualizado en `http://localhost:8080`.

---

## ⛔ Política Estricta de GitHub (Push Bajo Demanda)
- **NUNCA** hacer commits ni pushes automáticos a GitHub tras aplicar cambios en la app.
- Todo cambio se valida primero en local con el servidor Python (`serve_local_app.py`).
- Solo sincronizar con GitHub (`git commit` / `git push`) cuando el usuario lo ordene de forma expresa.
