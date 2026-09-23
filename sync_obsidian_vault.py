import os
import shutil
import sys
import io

if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


DOCS_DIR = "app/docs"
VAULT_DIR = "obsidian_vault"

def populate_vault():
    print("Iniciando estructuración del baúl de Obsidian...")
    
    # 1. Copiar Pitch Deck
    shutil.copyfile(
        os.path.join(DOCS_DIR, "PITCH_DECK_MAESTRO_INVERSORES.md"),
        os.path.join(VAULT_DIR, "07 - Pitch Inversores", "Pitch Deck Maestro Inversores.md")
    )
    shutil.copyfile(
        os.path.join(DOCS_DIR, "analisis_inicial_inversores.md"),
        os.path.join(VAULT_DIR, "07 - Pitch Inversores", "Tesis de Inversion & Moat.md")
    )
    
    # 2. Copiar Bitácora
    shutil.copyfile(
        os.path.join(DOCS_DIR, "BITACORA_DE_DESARROLLO_Y_ROADMAP.md"),
        os.path.join(VAULT_DIR, "08 - Bitacora & Roadmap", "Bitacora de Desarrollo Viva.md")
    )
    
    # 3. Negocio y Finanzas
    shutil.copyfile(
        os.path.join(DOCS_DIR, "01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md"),
        os.path.join(VAULT_DIR, "01 - Negocio & Finanzas", "Modelo de Negocio Hibrido.md")
    )
    
    # 4. Datos y Gobernanza
    shutil.copyfile(
        os.path.join(DOCS_DIR, "02_GESTION_Y_GOBERNANZA_DE_DATOS.md"),
        os.path.join(VAULT_DIR, "02 - Ingenieria de Datos", "Arquitectura Medallion Lakehouse.md")
    )
    
    # 5. Producto y Pilares
    shutil.copyfile(
        os.path.join(DOCS_DIR, "03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md"),
        os.path.join(VAULT_DIR, "03 - Producto & Pilares", "Especificacion de los 3 Pilares.md")
    )
    
    # 6. Arquitectura de Software
    shutil.copyfile(
        os.path.join(DOCS_DIR, "04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md"),
        os.path.join(VAULT_DIR, "04 - Arquitectura de Software", "Diagrama C4 & Microservicios.md")
    )
    
    # 7. Ciberseguridad
    shutil.copyfile(
        os.path.join(DOCS_DIR, "05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md"),
        os.path.join(VAULT_DIR, "05 - Ciberseguridad", "Seguridad Movil OWASP & Zero Trust.md")
    )
    
    # 8. Diseño UI/UX
    shutil.copyfile(
        os.path.join(DOCS_DIR, "06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md"),
        os.path.join(VAULT_DIR, "06 - Diseno UI-UX", "Design Tokens Dark Showroom.md")
    )

    # 9. Roadmap y GTM
    shutil.copyfile(
        os.path.join(DOCS_DIR, "07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md"),
        os.path.join(VAULT_DIR, "01 - Negocio & Finanzas", "Plan de Ejecucion Roadmap & GTM.md")
    )

    # 10. Ideas del Proyecto y Monetización
    shutil.copyfile(
        os.path.join(DOCS_DIR, "IDEAS_DEL_PROYECTO_MONETIZACION.md"),
        os.path.join(VAULT_DIR, "01 - Negocio & Finanzas", "Ideas del Proyecto - Ideas de Monetizacion.md")
    )
    
    print("✅ Baúl de Obsidian poblado exitosamente con enlaces canónicos.")

if __name__ == "__main__":
    populate_vault()
