# Habilidad Canónica: Flujo de Desarrollo Local & Despliegue Bajo Demanda

Esta directriz define la política operativa del Agente de IA para el desarrollo y ciclo de vida de **CharuAutos**:

---

## 🎯 Directrices Operativas Maestras

### 1. Entorno de Validación Local y Ciclo del Servicio
Cuando el usuario solicite cualquier cambio en la app, o se tenga que modificar algo relacionado con la app:
1. **Detener el servicio inmediatamente** antes de editar cualquier archivo (`manage_task kill` o finalizando el proceso en el puerto 8080).
2. **Aplicar las modificaciones** en código fuente localmente y verificar exhaustivamente que no existan errores de sintaxis ni etiquetas rotas.
3. **Volver a correr el servicio** con `python D:\Proyectos\CharuAutos\app\serve_local_app.py` cuando todo esté listo, para permitir la revisión inmediata del usuario en su navegador (`http://localhost:8080`).

---

### 2. Política de Despliegue en GitHub (Bajo Demanda)
- **Nunca realizar commits o pushes automáticos a GitHub** tras editar código local.
- Los cambios permanecen en el entorno de pruebas local hasta que el usuario dé su aprobación y ordene explícitamente: *"sube a github"*, *"actualiza el repositorio"* o instrucción equivalente.
- Solo tras esa orden expresa se preparará el commit y se ejecutará `git push origin main`.
