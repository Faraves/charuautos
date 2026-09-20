# Reglas de Desarrollo — CharuAutos

## Ciclo de Vida del Servidor Local (app/serve_local_app.py)

**REGLA OBLIGATORIA DE FLUJO:**
Si el script del servidor local (`app/serve_local_app.py` o proceso escuchando en el puerto 8080) está corriendo y el usuario solicita realizar cualquier modificación, ajuste o corrección en la app:

1. **Detención Inmediata:** Detener INMEDIATAMENTE el proceso del servidor local (`manage_task` con acción `kill` o finalizando el proceso en el puerto 8080) antes de tocar o editar cualquier archivo.
2. **Aplicar Modificaciones:** Ejecutar todos los ajustes requeridos en el código fuente (`app.js`, `index.html`, etc.), verificar la sintaxis, paridad de etiquetas y consistencia técnica.
3. **Reinicio al Finalizar:** Una vez listos y validados todos los cambios, reiniciar el servidor ejecutando `python app/serve_local_app.py` como daemon en segundo plano (`IsDaemon: true`).
4. **Confirmación:** Notificar al usuario que las modificaciones están completadas y que el servidor se ha reiniciado y actualizado en `http://localhost:8080`.
