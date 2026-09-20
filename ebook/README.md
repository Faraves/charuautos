# Departamento Editorial — CharuAutos (Ebook Maestro)

Este departamento centraliza **absolutamente toda la producción editorial, de contenido educativo y lectores PWA** de CharuAutos en sus tres ediciones oficiales, organizadas desde el manuscrito fuente hasta los lectores interactivos web y paquetes de distribución.

---

## 📁 Estructura del Departamento Editorial

```text
ebook/
├── v2_tecnico/                     # 🏆 PRODUCTO INSIGNIA: Edición Conductor Inteligente V2
│   ├── 01_introduccion_seguridad_legal.md  # Módulos individuales 01 al 14
│   ├── ...
│   ├── 14_apendices_checklists_y_bitacora.md
│   ├── ebook_v2_completo.md        # Manuscrito unificado descargable
│   ├── ebook_v2_interactivo.html   # Lector web interactivo local Dark Showroom
│   ├── assets/                     # 61 ilustraciones técnicas e infografías HD
│   └── README.md                   # Ficha técnica de la Versión 2.0
│
├── historieta/                     # 🎨 NOVELA GRÁFICA: Las Aventuras de Charu (Cómic)
│   ├── 00_portada_y_personajes.md  # Prólogo y elenco de personajes
│   ├── 01_episodio_...md           # 14 episodios narrativos con acotaciones escénicas
│   ├── ...
│   ├── 14_episodio_el_pasaporte_a_la_tranquilidad.md
│   ├── ebook_historieta_completo.md# Guion maestro unificado
│   ├── historieta_interactiva.html # Lector de cómic interactivo local con Web Audio
│   ├── assets/                     # 31 viñetas panorámicas HD 16:9 y avatares
│   └── README.md                   # Ficha técnica y personajes del cómic
│
├── v1_clasico/                     # 🚗 EDICIÓN CLÁSICA 1.0 (Histórica)
│   ├── 00_introduccion_y_tablero.md al 08_bibliografia...md
│   ├── CharuAutos_Manual_del_Conductor_Inteligente.pdf # PDF de 33 páginas Full Bleed
│   ├── ebook_completo.md           # Manuscrito unificado V1
│   ├── ebook_interactivo.html      # Visor clásico original
│   └── assets/                     # Recursos gráficos originales
│
├── pwa/                            # 🚀 LECTORES WEB Y PWAs DEL EBOOK EN PRODUCCIÓN
│   ├── pwa_historieta/             # Lector web interactivo de la Historieta (Cómic PWA)
│   ├── pwa_v2/                     # Lector web interactivo del Manual Técnico V2
│   ├── pwa_v1/                     # Lector web interactivo clásico V1
│   └── releases/                   # Paquetes .zip compilados de distribución
│
└── ajustes_visuales/               # 📐 ESQUEMAS Y AJUSTES TÉCNICOS FUENTE
    ├── 2.1 varillas de motor.jpg
    ├── 2.2 turbo.jpg
    ├── 2.3 sistema de frenos.jpg
    ├── 2.4 cauchos.jpg
    ├── 2.5 kit seguridad.jpg
    └── README.md                   # Bitácora de correcciones visuales
```

---

## 📊 Comparativa de Ediciones Editoriales

| Característica | 🎨 Historieta (Cómic) | 🏆 V2 Conductor Inteligente | 🚗 V1 Clásica |
| :--- | :--- | :--- | :--- |
| **Enfoque Pedagógico** | Storytelling / Novela gráfica | Manual Técnico Descriptivo | Manual Técnico Clásico |
| **Público Objetivo** | Principiantes absolutos, visuales | Conductores diarios de ciudad/ruta | Estudiantes y entusiastas |
| **Personajes** | Charu, Carmen, Carlos, Chanchullo | Narrador didáctico en primera persona | Narrador técnico |
| **Capítulos / Módulos** | 14 Episodios ilustrados | 14 Módulos prácticos | 10 Capítulos técnicos |
| **Lector Web PWA** | `ebook/pwa/pwa_historieta/` | `ebook/pwa/pwa_v2/` | `ebook/pwa/pwa_v1/` |
| **Formato Offline** | Lector HTML + PWA | Lector HTML + PWA | PDF Impreso + PWA |
