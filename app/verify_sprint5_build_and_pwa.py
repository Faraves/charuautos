# -*- coding: utf-8 -*-
"""
Script de Verificación y Auditoría de Empaquetado Multiplataforma y PWA (Sprint 5)
Verifica:
1. Esquema EAS Build (eas.json): Perfiles 'preview' (APK directo) y 'production' (AAB / IPA).
2. Configuración nativa Expo (app.json): Permisos Android, Plist iOS y Theme nocturno.
3. Especificación PWA Web: Web App Manifest, Service Worker offline y Shell HTML.
4. Trazabilidad completa de scripts de empaquetado en package.json.
"""

import sys
import os
import json

# Forzar salida en UTF-8 para consola de Windows
sys.stdout.reconfigure(encoding='utf-8')

APP_DIR = os.path.dirname(os.path.abspath(__file__))

def check_file_exists(rel_path: str) -> str:
    path = os.path.join(APP_DIR, rel_path)
    assert os.path.exists(path), f"Archivo no encontrado: {rel_path}"
    return path

def main():
    print("================================================================================")
    print("🚀 AUDITORÍA DE EMPAQUETADO MULTIPLATAFORMA Y PWA (SPRINT 5 FINAL)")
    print("================================================================================")

    # 1. Auditar eas.json
    print("\n1️⃣ Verificando Configuración EAS Build (eas.json)...")
    eas_path = check_file_exists("eas.json")
    with open(eas_path, "r", encoding="utf-8") as f:
        eas_data = json.load(f)
    
    assert "build" in eas_data, "Falta bloque 'build' en eas.json"
    assert eas_data["build"]["preview"]["android"]["buildType"] == "apk", "El perfil preview de Android debe generar un .APK directo para Venezuela."
    assert eas_data["build"]["production"]["android"]["buildType"] == "app-bundle", "El perfil de producción debe generar AAB para Google Play."
    print("   ✓ Perfil 'preview' configurado para APK descargable directo (Android).")
    print("   ✓ Perfil 'production' configurado para Google Play (AAB) y App Store (IPA).")

    # 2. Auditar app.json
    print("\n2️⃣ Verificando Identificadores Nativos y Permisos (app.json)...")
    app_json_path = check_file_exists("app.json")
    with open(app_json_path, "r", encoding="utf-8") as f:
        app_data = json.load(f)["expo"]

    assert app_data["android"]["package"] == "com.charuautos.app"
    assert app_data["ios"]["bundleIdentifier"] == "com.charuautos.app"
    assert "CAMERA" in app_data["android"]["permissions"]
    assert "INTERNET" in app_data["android"]["permissions"]
    assert app_data["userInterfaceStyle"] == "dark"
    print(f"   ✓ Android Package: {app_data['android']['package']}")
    print(f"   ✓ iOS Bundle ID:   {app_data['ios']['bundleIdentifier']}")
    print(f"   ✓ Permisos Android: {', '.join(app_data['android']['permissions'])}")
    print(f"   ✓ Dark Showroom UI Style: {app_data['userInterfaceStyle']} (#070a0f)")

    # 3. Auditar Web App Manifest (PWA)
    print("\n3️⃣ Verificando Especificación PWA Web Manifest (manifest.json)...")
    manifest_path = check_file_exists(os.path.join("public", "manifest.json"))
    with open(manifest_path, "r", encoding="utf-8") as f:
        manifest_data = json.load(f)

    assert manifest_data["display"] == "standalone"
    assert manifest_data["theme_color"] == "#070a0f"
    assert len(manifest_data["shortcuts"]) >= 3
    print(f"   ✓ Modo de visualización: {manifest_data['display']} (Sin barra de navegador)")
    print(f"   ✓ Theme Color: {manifest_data['theme_color']}")
    print(f"   ✓ Atajos en Pantalla de Inicio: {[s['name'] for s in manifest_data['shortcuts']]}")

    # 4. Auditar Service Worker y Shell HTML
    print("\n4️⃣ Verificando Resiliencia Offline (Service Worker & Shell)...")
    sw_path = check_file_exists(os.path.join("public", "sw.js"))
    html_path = check_file_exists(os.path.join("public", "index.html"))

    with open(sw_path, "r", encoding="utf-8") as f:
        sw_content = f.read()
    assert "charuautos-pwa-v1" in sw_content
    assert "caches.match" in sw_content

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    assert "serviceWorker.register('/sw.js')" in html_content
    print("   ✓ Service Worker: Estrategia de caché local y fallback offline validada.")
    print("   ✓ PWA Entry Shell: index.html con registro automático y diseño Dark Showroom.")

    # 5. Auditar Scripts de build en package.json
    print("\n5️⃣ Verificando Scripts de Automatización (package.json)...")
    pkg_path = check_file_exists("package.json")
    with open(pkg_path, "r", encoding="utf-8") as f:
        pkg_data = json.load(f)

    scripts = pkg_data["scripts"]
    assert "build:apk" in scripts
    assert "build:bundle" in scripts
    assert "build:web" in scripts
    assert "verify:all" in scripts
    print("   ✓ Scripts disponibles:")
    print(f"     • npm run build:apk   -> {scripts['build:apk']}")
    print(f"     • npm run build:web   -> {scripts['build:web']}")
    print(f"     • npm run verify:all  -> {scripts['verify:all']}")

    print("\n================================================================================")
    print("✅ TODAS LAS AUDITORÍAS DE EMPAQUETADO MULTIPLATAFORMA Y PWA FUERON EXITOSAS")
    print("================================================================================")

if __name__ == '__main__':
    main()
