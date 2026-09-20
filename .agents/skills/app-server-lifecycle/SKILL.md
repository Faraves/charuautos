---
name: app-server-lifecycle
description: >-
  Protocolo estricto y obligatorio de ciclo de vida del servidor y desarrollo local en CharuAutos: ante cualquier solicitud de cambio o modificación en la app, se debe detener el servicio inmediatamente antes de editar archivos, aplicar los cambios, y volver a levantar el servidor local (serve_local_app.py en puerto 8080) cuando todo esté listo. NUNCA realizar commits ni pushes a GitHub hasta recibir autorización expresa del usuario.
---

# 🚀 Protocolo Obligatorio: Ciclo de Vida del Servidor y Desarrollo Local en CharuAutos

Este documento define la **regla de oro inquebrantable** para cualquier modificación en la WebApp de CharuAutos (frontend, backend, estilos, lógica o configuración).

---

## ⚡ Regla Fundamental de Ejecución

> [!IMPORTANT]
> **SIEMPRE QUE SE VAYA A MODIFICAR ALGO EN LA APP:**
> 1. **DETENER EL SERVICIO PRIMERO.**
> 2. **APLICAR Y VALIDAR LOS CAMBIOS.**
> 3. **VOLVER A CORRER EL SERVICIO CUANDO ESTÉ LISTO.**
> 4. **SUBIR A GITHUB SOLO BAJO ORDEN EXPRESA.**

---

## 📋 Flujo de Trabajo Paso a Paso

### Paso 1: Detención Inmediata del Servicio
Antes de editar o tocar cualquier archivo de la app (`index.html`, `app.js`, `serve_local_app.py`, CSS, etc.):
1. Si el servidor local está activo como tarea en segundo plano, usar la herramienta `manage_task` con acción `kill` para terminar la tarea.
2. Si existe algún proceso residual en el puerto 8080 en Windows PowerShell, liberarlo:
   ```powershell
   Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
   ```
3. Comprobar que el puerto 8080 ha quedado totalmente libre antes de continuar.

### Paso 2: Edición de Código y Validación Técnica
1. Aplicar las modificaciones solicitadas con precisión quirúrgica (`replace_file_content` o `write_to_file`).
2. Incrementar la versión del script en `index.html` para invalidar la caché del navegador (ej. `app.js?v=YYYYMMDD_feature_vN`).
3. Validar la integridad técnica:
   - Sintaxis de etiquetas HTML (sin cierres faltantes).
   - Consistencia de variables y funciones JavaScript.
   - Preservar el diseño monocoque oscuro de lujo automotriz y la responsividad total en smartphones, tablets y PC.

### Paso 3: Volver a Correr el Servicio
Una vez que todas las modificaciones estén listas y verificadas:
1. Iniciar el servidor local desde `D:\Proyectos\CharuAutos\app`:
   ```powershell
   python serve_local_app.py
   ```
   Configurado como proceso persistente de fondo (`IsDaemon: true`).
2. Comprobar que el servidor responde con éxito:
   ```powershell
   (Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing).StatusCode
   ```
   Debe retornar `200`.
3. Notificar al usuario que la app está lista, detallando los cambios efectuados e indicando el enlace local:
   👉 **`http://localhost:8080`**

---

## 🛡️ Política Estricta de GitHub (Push Solo Bajo Demanda)

- ⛔ **PROHIBIDO EL PUSH AUTOMÁTICO:** Queda estrictamente vetado realizar `git commit` o `git push` tras hacer ajustes locales.
- ✅ **Autorización Explícita:** El repositorio de GitHub solo se actualizará cuando el usuario dé una orden directa como:
  - *"Sube los cambios a GitHub"*
  - *"Actualiza el repositorio"*
  - *"Haz push a main"*
- **Objetivo:** Garantizar que cada entrega en producción y GitHub Pages esté 100% aprobada y probada por el usuario en local antes del lanzamiento.
