# -*- coding: utf-8 -*-
"""
Compilador del HUB MAESTRO de CharuAutos en un PDF Unificado de Calidad Ejecutiva.
Une todos los documentos de app/docs/ en un único documento maestro corporativo
con portada, tabla de contenidos, tipografía editorial, diagramas y estilos de impresión.
"""

import sys
import os
import re
import subprocess
import markdown
import fitz # PyMuPDF

# Forzar salida en UTF-8 para consola de Windows
sys.stdout.reconfigure(encoding='utf-8')

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS_DIR = os.path.join(PROJECT_ROOT, "app", "docs")
OUTPUT_HTML = os.path.join(PROJECT_ROOT, "CharuAutos_Hub_Maestro_Compilado.html")
OUTPUT_PDF = os.path.join(PROJECT_ROOT, "CharuAutos_HUB_MAESTRO_COMPLETO.pdf")

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

DOCS_SEQUENCE = [
    {
        "filename": "01_RESUMEN_EJECUTIVO_Y_MODELO_DE_NEGOCIO.md",
        "chapter_num": "01",
        "title": "Resumen Ejecutivo y Modelo de Negocio",
        "desc": "Mercado automotor dual en Venezuela, patología mecánica por combustible y modelo híbrido multimoneda."
    },
    {
        "filename": "PITCH_DECK_MAESTRO_INVERSORES.md",
        "chapter_num": "02",
        "title": "Pitch Deck Maestro para Inversores",
        "desc": "Tesis de inversión, rondas de financiamiento Seed ($150k USD), unit economics y moat defensivo."
    },
    {
        "filename": "02_GESTION_Y_GOBERNANZA_DE_DATOS.md",
        "chapter_num": "03",
        "title": "Gestión y Gobernanza de Datos",
        "desc": "Arquitectura Medallion (Lakehouse), MDM automotriz venezolano, dbt, Great Expectations y RAG vectorial."
    },
    {
        "filename": "03_ESPECIFICACION_FUNCIONAL_DE_LOS_3_PILARES.md",
        "chapter_num": "04",
        "title": "Especificación Funcional de los 3 Pilares",
        "desc": "Algoritmo del Matchmaker, semáforo de riesgo OBD2 manual, Escudo Anti-Estafas y Cuaderno Dinámico ($/km)."
    },
    {
        "filename": "04_ARQUITECTURA_TECNICA_Y_STACK_DE_SOFTWARE.md",
        "chapter_num": "05",
        "title": "Arquitectura Técnica y Stack de Software",
        "desc": "Diagramas C4, stack React Native / Expo, NestJS, FastAPI, modelos PostgreSQL y persistencia SQLite."
    },
    {
        "filename": "05_CIBERSEGURIDAD_IMPLEMENTACION_Y_MANTENIMIENTO.md",
        "chapter_num": "06",
        "title": "Ciberseguridad, Implementación y Mantenimiento",
        "desc": "Modelo de amenazas STRIDE, OWASP Mobile/API, cadena SHA-256 anti-fraude, Zero Trust y DevSecOps."
    },
    {
        "filename": "06_DISENO_UI_UX_Y_EXPERIENCIA_DEL_USUARIO.md",
        "chapter_num": "07",
        "title": "Diseño UI/UX y Experiencia de Usuario",
        "desc": "Sistema de diseño Dark Showroom, modo manos sucias, emergencias en carretera y flujos de pantalla."
    },
    {
        "filename": "07_PLAN_DE_EJECUCION_ROADMAP_Y_GTM.md",
        "chapter_num": "08",
        "title": "Plan de Ejecución, Roadmap y GTM",
        "desc": "Timeline de 4 sprints (8 semanas), estrategia de lanzamiento con @charuautopics y red de talleres."
    },
    {
        "filename": "BITACORA_DE_DESARROLLO_Y_ROADMAP.md",
        "chapter_num": "09",
        "title": "Bitácora de Desarrollo Viva y Estado del Proyecto",
        "desc": "Registro histórico y continuo de hitos completados, tareas en curso y backlog de próximos sprints."
    },
    {
        "filename": "00_INDICE_Y_ARQUITECTURA_DOCUMENTAL.md",
        "chapter_num": "10",
        "title": "Índice Maestro y Matriz de Trazabilidad",
        "desc": "Matriz de correlación técnica, requerimientos de negocio y trazabilidad del ecosistema digital."
    }
]

def preprocess_markdown(text: str) -> str:
    # 1. Transformar GitHub callouts en divs estilizados
    def replace_callout(match):
        c_type = match.group(1).upper()
        content = match.group(2).strip()
        icon = "📌"
        cls = "callout-note"
        if c_type == "IMPORTANT":
            icon = "⚡"
            cls = "callout-important"
        elif c_type == "WARNING":
            icon = "⚠️"
            cls = "callout-warning"
        elif c_type == "TIP":
            icon = "💡"
            cls = "callout-tip"
        elif c_type == "CAUTION":
            icon = "🛑"
            cls = "callout-caution"
        
        return f'<div class="callout {cls}"><div class="callout-header"><span class="callout-icon">{icon}</span> <strong>{c_type}</strong></div><div class="callout-body">{content}</div></div>'

    text = re.sub(r'>\s*\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*\n((?:>.*\n?)*)', 
                  lambda m: replace_callout(re.match(r'>\s*\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*\n((?:>.*\n?)*)', m.group(0))), 
                  text)
    
    # Limpiar prefijos de comillas sobrantes dentro del body del callout
    text = re.sub(r'<div class="callout-body">\n(.*?)\n</div>', 
                  lambda m: '<div class="callout-body">\n' + re.sub(r'^>\s?', '', m.group(1), flags=re.MULTILINE) + '\n</div>', 
                  text, flags=re.DOTALL)

    # 2. Transformar bloques mermaid en cajas de arquitectura estilizadas
    def replace_mermaid(match):
        diagram_code = match.group(1).strip()
        return f'<div class="mermaid-box"><div class="mermaid-tag">DIAGRAMA DE ARQUITECTURA / FLUJO</div><pre><code>{diagram_code}</code></pre></div>'
    
    text = re.sub(r'```mermaid(.*?)```', replace_mermaid, text, flags=re.DOTALL)

    # 3. Checkboxes de markdown
    text = text.replace('- [x]', '<span class="checkbox checked">☑</span>')
    text = text.replace('- [ ]', '<span class="checkbox">☐</span>')

    return text

def build_executive_html() -> str:
    chapters_html = []

    for doc_meta in DOCS_SEQUENCE:
        filepath = os.path.join(DOCS_DIR, doc_meta["filename"])
        if not os.path.exists(filepath):
            print(f"⚠️ Advertencia: No se encontró {doc_meta['filename']}")
            continue

        with open(filepath, "r", encoding="utf-8") as f:
            raw_content = f.read()

        processed_md = preprocess_markdown(raw_content)
        parsed_html = markdown.markdown(
            processed_md,
            extensions=['extra', 'codehilite', 'toc', 'nl2br', 'sane_lists']
        )

        chapter_block = f"""
        <section class="chapter" id="capitulo-{doc_meta['chapter_num']}">
            <div class="chapter-header-banner">
                <div class="chapter-badge">CAPÍTULO {doc_meta['chapter_num']}</div>
                <h1 class="chapter-title">{doc_meta['title']}</h1>
                <p class="chapter-lead">{doc_meta['desc']}</p>
            </div>
            <div class="chapter-content">
                {parsed_html}
            </div>
        </section>
        """
        chapters_html.append(chapter_block)

    all_chapters_str = "\n".join(chapters_html)

    toc_rows = "\n".join([
        f"""
        <div class="toc-item">
            <div class="toc-num">{item['chapter_num']}</div>
            <div class="toc-details">
                <a href="#capitulo-{item['chapter_num']}" class="toc-title">{item['title']}</a>
                <div class="toc-desc">{item['desc']}</div>
            </div>
        </div>
        """ for item in DOCS_SEQUENCE
    ])

    html_template = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CharuAutos App — Hub Maestro de Documentación</title>
    <style>
        @page {{
            size: letter portrait;
            margin: 18mm 16mm 20mm 16mm;
            @bottom-right {{
                content: "Página " counter(page);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 8pt;
                color: #64748b;
            }}
            @bottom-left {{
                content: "CharuAutos App • Hub Maestro de Documentación & Inversión";
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 8pt;
                color: #64748b;
            }}
        }}

        * {{
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background-color: #ffffff;
            font-size: 11pt;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }}

        /* PORTADA EJECUTIVA */
        .cover-page {{
            page-break-after: always;
            min-height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 20px 20px 20px;
            background: linear-gradient(135deg, #070a0f 0%, #0f172a 60%, #1e293b 100%);
            color: #ffffff;
            border-radius: 12px;
            border: 2px solid #00f2fe;
            margin-bottom: 20px;
        }}
        .cover-top {{
            border-bottom: 2px solid rgba(0, 242, 254, 0.4);
            padding-bottom: 20px;
        }}
        .cover-brand {{
            font-size: 38pt;
            font-weight: 900;
            color: #00f2fe;
            letter-spacing: -1px;
            margin: 0;
            line-height: 1.1;
        }}
        .cover-brand span {{
            color: #ffb703;
        }}
        .cover-badge {{
            display: inline-block;
            background: rgba(0, 242, 254, 0.15);
            border: 1px solid #00f2fe;
            color: #00f2fe;
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 10pt;
            font-weight: 800;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 14px;
        }}
        .cover-center {{
            margin: 40px 0;
        }}
        .cover-doc-title {{
            font-size: 26pt;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.25;
            margin-bottom: 16px;
        }}
        .cover-doc-subtitle {{
            font-size: 13pt;
            color: #94a3b8;
            line-height: 1.5;
            max-width: 90%;
        }}
        .cover-meta-grid {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            padding-top: 20px;
        }}
        .meta-box {{
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px;
        }}
        .meta-box-label {{
            font-size: 8pt;
            color: #94a3b8;
            text-transform: uppercase;
            font-weight: 700;
            letter-spacing: 0.5px;
        }}
        .meta-box-val {{
            font-size: 11pt;
            color: #00f2fe;
            font-weight: 800;
            margin-top: 2px;
        }}

        /* TABLA DE CONTENIDOS */
        .toc-page {{
            page-break-after: always;
            padding: 20px 0;
        }}
        .toc-header {{
            font-size: 22pt;
            font-weight: 800;
            color: #0f172a;
            border-bottom: 3px solid #0284c7;
            padding-bottom: 10px;
            margin-bottom: 24px;
        }}
        .toc-item {{
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
        }}
        .toc-num {{
            font-size: 14pt;
            font-weight: 900;
            color: #0284c7;
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }}
        .toc-details {{
            flex: 1;
        }}
        .toc-title {{
            font-size: 12pt;
            font-weight: 700;
            color: #0f172a;
            text-decoration: none;
        }}
        .toc-desc {{
            font-size: 9.5pt;
            color: #64748b;
            margin-top: 2px;
        }}

        /* CAPÍTULOS */
        .chapter {{
            page-break-before: always;
            padding-top: 10px;
        }}
        .chapter-header-banner {{
            background: #f8fafc;
            border-left: 5px solid #0284c7;
            padding: 18px 24px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 28px;
            border-top: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
        }}
        .chapter-badge {{
            font-size: 8pt;
            font-weight: 800;
            color: #0284c7;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }}
        .chapter-title {{
            font-size: 20pt;
            font-weight: 800;
            color: #0f172a;
            margin: 4px 0;
            line-height: 1.2;
        }}
        .chapter-lead {{
            font-size: 10.5pt;
            color: #475569;
            margin: 0;
        }}

        /* TIPOGRAFÍA GENERAL */
        h1, h2, h3, h4 {{
            color: #0f172a;
            font-weight: 800;
            margin-top: 22px;
            margin-bottom: 10px;
            page-break-after: avoid;
        }}
        h1 {{ font-size: 16pt; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 6px; }}
        h2 {{ font-size: 13.5pt; color: #0369a1; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }}
        h3 {{ font-size: 12pt; color: #334155; }}
        h4 {{ font-size: 11pt; color: #475569; }}

        p, li {{
            color: #334155;
            font-size: 10.5pt;
            line-height: 1.6;
        }}

        ul, ol {{
            padding-left: 22px;
            margin-bottom: 14px;
        }}

        li {{
            margin-bottom: 4px;
        }}

        /* TABLAS */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 9.5pt;
            page-break-inside: avoid;
        }}
        th {{
            background-color: #0f172a;
            color: #ffffff;
            font-weight: 700;
            padding: 8px 10px;
            text-align: left;
            border: 1px solid #0f172a;
        }}
        td {{
            padding: 7px 10px;
            border: 1px solid #cbd5e1;
            color: #1e293b;
            vertical-align: top;
        }}
        tr:nth-child(even) td {{
            background-color: #f8fafc;
        }}

        /* CALLOUTS GITHUB */
        .callout {{
            border-radius: 8px;
            padding: 12px 16px;
            margin: 16px 0;
            page-break-inside: avoid;
            font-size: 10pt;
        }}
        .callout-header {{
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 9.5pt;
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        .callout-note {{
            background-color: #f0f9ff;
            border-left: 4px solid #0284c7;
            color: #0369a1;
        }}
        .callout-important {{
            background-color: #f5f3ff;
            border-left: 4px solid #7c3aed;
            color: #6d28d9;
        }}
        .callout-warning {{
            background-color: #fffbeb;
            border-left: 4px solid #d97706;
            color: #b45309;
        }}
        .callout-tip {{
            background-color: #ecfdf5;
            border-left: 4px solid #059669;
            color: #047857;
        }}
        .callout-caution {{
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            color: #b91c1c;
        }}
        .callout-body {{
            color: #334155;
            line-height: 1.5;
        }}

        /* CÓDIGO Y DIAGRAMAS */
        pre {{
            background-color: #0f172a;
            color: #e2e8f0;
            padding: 12px 14px;
            border-radius: 8px;
            font-family: Consolas, Monaco, "Courier New", monospace;
            font-size: 9pt;
            overflow-x: auto;
            margin: 14px 0;
            page-break-inside: avoid;
            border: 1px solid #1e293b;
        }}
        code {{
            font-family: Consolas, Monaco, "Courier New", monospace;
            background-color: #f1f5f9;
            color: #0f172a;
            padding: 2px 5px;
            border-radius: 4px;
            font-size: 9.5pt;
        }}
        pre code {{
            background-color: transparent;
            color: inherit;
            padding: 0;
        }}

        .mermaid-box {{
            background-color: #0b1320;
            border: 1.5px solid #0284c7;
            border-radius: 8px;
            padding: 12px 14px;
            margin: 18px 0;
            page-break-inside: avoid;
        }}
        .mermaid-tag {{
            font-size: 7.5pt;
            font-weight: 800;
            color: #38bdf8;
            letter-spacing: 1px;
            margin-bottom: 6px;
        }}
        .mermaid-box pre {{
            background: transparent;
            border: none;
            padding: 0;
            margin: 0;
            color: #93c5fd;
        }}

        .checkbox {{
            font-family: monospace;
            font-weight: bold;
            color: #64748b;
        }}
        .checkbox.checked {{
            color: #059669;
        }}

        hr {{
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 24px 0;
        }}

        /* BADGES */
        .badge {{
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 8.5pt;
            font-weight: 700;
            background: #e2e8f0;
            color: #334155;
        }}
    </style>
</head>
<body>

    <!-- 1. PORTADA CORPORATIVA -->
    <div class="cover-page">
        <div class="cover-top">
            <div class="cover-brand">Charu<span>Autos</span> App</div>
            <div class="cover-badge">Ecosistema Digital Automotriz • Venezuela</div>
        </div>

        <div class="cover-center">
            <div class="cover-doc-title">HUB MAESTRO DE INGENIERÍA, ARQUITECTURA, GOBERNANZA DE DATOS Y NEGOCIO</div>
            <div class="cover-doc-subtitle">
                Compendio Maestro Integral de Especificación Técnica, Algoritmos de Dominio, Modelo Híbrido de Monetización, Seguridad Criptográfica Anti-Fraude y Plan de Despliegue.
            </div>
        </div>

        <div class="cover-meta-grid">
            <div class="meta-box">
                <div class="meta-box-label">Versión del Sistema</div>
                <div class="meta-box-val">v1.0 (MVP Sprint 4)</div>
            </div>
            <div class="meta-box">
                <div class="meta-box-label">Mercado Objetivo</div>
                <div class="meta-box-val">Venezuela (Bimonetario)</div>
            </div>
            <div class="meta-box">
                <div class="meta-box-label">Estado Documental</div>
                <div class="meta-box-val">Auditado & Homologado</div>
            </div>
        </div>
    </div>

    <!-- 2. TABLA DE CONTENIDOS -->
    <div class="toc-page">
        <div class="toc-header">📑 Índice General del Hub Maestro</div>
        {toc_rows}
    </div>

    <!-- 3. CUERPO COMPLETO DE CAPÍTULOS -->
    {all_chapters_str}

</body>
</html>
"""
    return html_template

def main():
    print("================================================================================")
    print("📚 COMPILADOR DEL HUB MAESTRO EN PDF UNIFICADO (CHARUAUTOS)")
    print("================================================================================")

    # 1. Compilar HTML Unificado
    print("\n1️⃣ Generando HTML con diseño editorial ejecutivo...")
    html_content = build_executive_html()
    with open(OUTPUT_HTML, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"   ✓ HTML generado: {OUTPUT_HTML} ({len(html_content)} bytes)")

    # 2. Renderizar PDF con Microsoft Edge Headless
    print(f"\n2️⃣ Renderizando PDF de alta resolución con Microsoft Edge Headless...")
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--run-all-compositor-stages-before-draw",
        f"--print-to-pdf={OUTPUT_PDF}",
        OUTPUT_HTML
    ]
    subprocess.run(cmd, check=True)

    # 3. Auditar PDF generado con PyMuPDF
    print("\n3️⃣ Auditando PDF generado...")
    if os.path.exists(OUTPUT_PDF):
        doc = fitz.open(OUTPUT_PDF)
        page_count = len(doc)
        file_size_mb = os.path.getsize(OUTPUT_PDF) / (1024 * 1024)
        doc.close()

        print(f"   ✓ Archivo: {OUTPUT_PDF}")
        print(f"   ✓ Total de Páginas: {page_count} páginas")
        print(f"   ✓ Tamaño del Archivo: {file_size_mb:.2f} MB")
        print("\n================================================================================")
        print(f"✅ HUB MAESTRO EN PDF GENERADO CON ÉXITO: {page_count} PÁGINAS")
        print("================================================================================")
    else:
        print("❌ Error: No se encontró el archivo PDF generado.")

if __name__ == "__main__":
    main()
