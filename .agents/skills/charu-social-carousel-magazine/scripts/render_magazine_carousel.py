#!/usr/bin/env python3
"""
Motor Reutilizable de Carruseles Editoriales — @charuautopics (Estilo 3: Acción Atmosférica / Magazine)
Reduce en ~80% el consumo de tokens por vehículo: lee un archivo `carousel_config.json` ligero,
compone las 6 escenas atmosféricas full-bleed (1080x1350 px), inyecta la caché local de fuentes WOFF2,
renderiza los 6 PNGs con Headless Chrome/Edge y genera `carrusel_slides.html`.

Uso:
  python render_magazine_carousel.py <ruta_a_carousel_config.json>
"""

import base64
import io
import json
import os
import subprocess
import sys
import numpy as np
from PIL import Image, ImageOps

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS_CACHE_PATH = os.path.join(SKILL_DIR, "resources", "fonts_cache.css")


def img_to_b64(pil_img, fmt="PNG", quality=93):
    buf = io.BytesIO()
    if fmt == "JPEG":
        pil_img.convert("RGB").save(buf, format="JPEG", quality=quality)
        mime = "image/jpeg"
    else:
        pil_img.save(buf, format="PNG")
        mime = "image/png"
    return f"data:{mime};base64,{base64.b64encode(buf.getvalue()).decode('utf-8')}"


def make_magazine_scene(
    src_path,
    crop_box=None,
    paste_y=250,
    paste_h=760,
    top_rgb=(18, 16, 16),
    bot_rgb=(11, 12, 15),
    top_blend_h=375,
    bot_blend_start=905,
    crop_centering=(0.5, 0.5),
    slide_idx=1,
):
    raw = Image.open(src_path).convert("RGB")
    if crop_box:
        raw = raw.crop(tuple(crop_box))

    # Automatic Anti-Pixelation / Resolution Check
    eff_w, eff_h = raw.size
    if eff_w < 800 or eff_h < 500:
        print(
            f"[WARN Slide {slide_idx:02d}] Baja resolucion efectiva tras recorte ({eff_w}x{eff_h} px < 800x500 px) en '{os.path.basename(src_path)}'. Riesgo de pixelacion en lienzo 1080x1350."
        )

    # Lock 1:1 aspect ratio using ImageOps.fit so images are NEVER stretched or distorted
    scaled = ImageOps.fit(
        raw,
        (1080, paste_h),
        method=Image.Resampling.LANCZOS,
        centering=tuple(crop_centering),
    )

    canvas = Image.new("RGB", (1080, 1350), tuple(top_rgb))
    if paste_y > 0:
        top_strip = scaled.crop((0, 0, 1080, min(40, paste_h))).resize(
            (1080, paste_y), Image.Resampling.BICUBIC
        )
        canvas.paste(top_strip, (0, 0))
    canvas.paste(scaled, (0, paste_y))
    bot_y = paste_y + paste_h
    if bot_y < 1350:
        bot_strip = scaled.crop((0, max(0, paste_h - 45), 1080, paste_h)).resize(
            (1080, 1350 - bot_y), Image.Resampling.BICUBIC
        )
        canvas.paste(bot_strip, (0, bot_y))

    arr = np.array(canvas, dtype=np.float32)
    t_col = np.array(top_rgb, dtype=np.float32)
    b_col = np.array(bot_rgb, dtype=np.float32)

    for y in range(top_blend_h):
        t = (y / float(top_blend_h)) ** 1.25
        arr[y, :, :] = arr[y, :, :] * t + t_col * (1.0 - t)

    for y in range(bot_blend_start, 1350):
        t = ((y - bot_blend_start) / float(1350 - bot_blend_start)) ** 1.1
        arr[y, :, :] = arr[y, :, :] * (1.0 - 0.85 * t) + b_col * (0.85 * t)

    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


TACHO_SVG = """
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00F2FE" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 14l4-4"/>
  <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
</svg>
"""

SHIELD_SVG = """
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <path d="m9 12 2 2 4-4"/>
</svg>
"""


def get_common_css(font_css):
    return f"""
{font_css}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
html, body {{
  width: 1080px; height: 1350px; overflow: hidden;
  font-family: 'Poppins', sans-serif; background: #0A0B0E; color: #F8FAFC;
  -webkit-font-smoothing: antialiased;
}}
.canvas {{ position: relative; width: 1080px; height: 1350px; overflow: hidden; }}
.bg-scene {{ position: absolute; inset: 0; width: 1080px; height: 1350px; object-fit: cover; z-index: 1; }}
.atmo-overlay {{
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(16,13,12,0.90) 0%, rgba(20,16,14,0.48) 23%, rgba(0,0,0,0.0) 46%, rgba(10,11,15,0.72) 72%, rgba(8,9,13,0.96) 100%);
  z-index: 2;
}}
.header-bar {{
  position: absolute; top: 52px; left: 60px; right: 60px;
  display: flex; justify-content: space-between; align-items: center; z-index: 20;
}}
.brand-text-logo {{
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 28px;
  letter-spacing: 4px; color: #FFFFFF; text-transform: uppercase;
}}
.mag-badge {{
  padding: 7px 18px; background: rgba(255, 138, 0, 0.18);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 158, 44, 0.50); border-radius: 30px;
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 15.5px;
  letter-spacing: 2px; color: #FF9E2C; text-transform: uppercase;
}}
.mag-header-center {{
  position: absolute; top: 112px; left: 60px; right: 60px;
  text-align: center; z-index: 20;
}}
.mag-kicker {{
  font-size: 14.5px; font-weight: 600; letter-spacing: 4px;
  color: #FDE68A; text-transform: uppercase; margin-bottom: 5px;
}}
.mag-title {{
  font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 62px;
  line-height: 1.0; color: #FFFFFF; text-transform: uppercase;
  text-shadow: 0 12px 30px rgba(0,0,0,0.65);
}}
.mag-title span.amber {{ color: #FF9E2C; }}
.mag-title span.cyan {{ color: #00F2FE; }}
.overlap-svg {{
  position: absolute; inset: 0; width: 1080px; height: 1350px;
  z-index: 5; pointer-events: none;
}}
.floating-pill {{
  position: absolute; background: rgba(14, 15, 20, 0.74);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(253, 230, 138, 0.42); border-radius: 16px;
  padding: 11px 18px; display: flex; align-items: center; gap: 12px;
  z-index: 20; box-shadow: 0 12px 28px rgba(0,0,0,0.5);
}}
.fp-title {{ font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 19px; color: #FDE68A; line-height: 1.1; }}
.fp-sub {{ font-size: 12px; color: #E2E8F0; font-weight: 600; }}
.mag-dock {{
  position: absolute; left: 60px; right: 60px; bottom: 104px;
  background: rgba(14, 16, 22, 0.74);
  backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255, 255, 255, 0.18); border-radius: 22px;
  padding: 20px 26px; z-index: 20; box-shadow: 0 20px 45px rgba(0,0,0,0.65);
}}
/* Comparative 2-column Dock */
.dock-header {{
  display: grid; grid-template-columns: 235px 1fr 1fr; align-items: center;
  padding-bottom: 11px; border-bottom: 1px solid rgba(255,255,255,0.14); margin-bottom: 8px;
}}
/* Single-version 1-column Dock */
.dock-header-single {{
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 11px; border-bottom: 1px solid rgba(255,255,255,0.14); margin-bottom: 8px;
}}
.dh-label {{ font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 17.5px; letter-spacing: 1.5px; color: #94A3B8; text-transform: uppercase; }}
.dh-col {{ font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 21px; text-align: center; padding: 6px 12px; border-radius: 10px; }}
.dh-col.sinc {{ background: rgba(0, 242, 254, 0.15); color: #00F2FE; margin-right: 8px; }}
.dh-col.aut {{ background: rgba(255, 138, 0, 0.18); color: #FF9E2C; margin-left: 8px; }}
.comp-row {{
  display: grid; grid-template-columns: 235px 1fr 1fr; align-items: center;
  padding: 8.5px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
}}
.single-row {{
  display: grid; grid-template-columns: 280px 1fr; align-items: center;
  padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
}}
.comp-row:last-child, .single-row:last-child {{ border-bottom: none; padding-bottom: 2px; }}
.cr-name {{ font-size: 13.5px; font-weight: 700; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.5px; }}
.cr-val {{ font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 16px; color: #FFFFFF; text-align: center; }}
.single-row .cr-val {{ text-align: right; }}
.cr-val.cyan-big {{ color: #00F2FE; font-family: 'Oswald', sans-serif; font-size: 23px; }}
.cr-val.amber-big {{ color: #FF9E2C; font-family: 'Oswald', sans-serif; font-size: 23px; }}
/* Cover Dual Cards */
.dual-hero-cards {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 14px; }}
.v-card {{ background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 15px 20px; }}
.v-card.sinc {{ border-top: 3px solid #00F2FE; }}
.v-card.aut {{ border-top: 3px solid #FF9E2C; }}
.vc-tag {{ display: inline-block; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1.2px; padding: 3px 10px; border-radius: 6px; margin-bottom: 6px; }}
.vc-tag.sinc {{ background: rgba(0,242,254,0.16); color: #00F2FE; }}
.vc-tag.aut {{ background: rgba(255,158,44,0.20); color: #FF9E2C; }}
.vc-price {{ font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 36px; color: #FFFFFF; line-height: 1.05; }}
.vc-price span {{ font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; color: #94A3B8; margin-left: 6px; }}
.vc-specs {{ margin-top: 8px; font-size: 13.5px; color: #E2E8F0; font-weight: 500; line-height: 1.4; }}
.vc-specs strong {{ color: #FFFFFF; }}
.summary-strip {{ display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.12); font-size: 14px; color: #CBD5E1; }}
.summary-strip strong {{ color: #FDE68A; }}
.decision-banner {{ margin-top: 10px; padding-top: 11px; border-top: 1px solid rgba(255,255,255,0.14); font-size: 14px; line-height: 1.4; color: #E2E8F0; text-align: center; }}
.decision-banner strong.cyan {{ color: #00F2FE; }}
.decision-banner strong.amber {{ color: #FF9E2C; }}
.charu-footer {{
  position: absolute; left: 60px; right: 60px; bottom: 34px; height: 54px;
  display: flex; align-items: center; justify-content: space-between; padding: 0 24px;
  background: rgba(8, 12, 20, 0.78); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 27px; z-index: 30;
}}
.footer-left {{ display: flex; align-items: center; gap: 12px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 18px; color: #F8FAFC; letter-spacing: 0.5px; }}
.footer-cta {{ font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 1.5px; color: #00F2FE; text-transform: uppercase; }}
"""


def build_slide_html(slide_cfg, brand_html, common_css, idx):
    bg_b64 = slide_cfg["_bg_b64"]
    badge = slide_cfg.get("badge", f"0{idx} / 06 • FICHA EDITORIAL")
    kicker = slide_cfg.get("kicker", "")
    title_html = slide_cfg.get("title_html", "")

    # 3D Overlap Watermark SVG
    overlap_html = ""
    ov = slide_cfg.get("overlap_text")
    if ov:
        text_str = ov.get("text", "")
        font_sz = ov.get("font_size", 195)
        y_pos = ov.get("y", 450)
        mask_path = ov.get(
            "mask_path",
            "M 180,680 L 210,500 L 380,420 L 700,420 L 860,510 L 900,680 Z",
        )
        grad_end = ov.get("grad_color", "#FDE68A")
        overlap_html = f"""
        <svg class="overlap-svg" viewBox="0 0 1080 1350">
          <defs>
            <linearGradient id="g_{idx}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="{grad_end}" stop-opacity="0.06"/>
            </linearGradient>
            <mask id="m_{idx}">
              <rect x="0" y="0" width="1080" height="1350" fill="white"/>
              <path d="{mask_path}" fill="black"/>
            </mask>
          </defs>
          <text x="540" y="{y_pos}" text-anchor="middle" font-family="'Oswald', sans-serif" font-weight="700" font-size="{font_sz}" letter-spacing="5" fill="url(#g_{idx})" mask="url(#m_{idx})">{text_str}</text>
        </svg>
        """

    # Floating Pill
    pill_html = ""
    fp = slide_cfg.get("floating_pill")
    if fp:
        pos_style = fp.get("style", "top: 380px; right: 60px;")
        icon_type = fp.get("icon", "shield")
        if icon_type == "shield":
            icon_markup = SHIELD_SVG
        else:
            icon_markup = f'<div style="font-family:\'Oswald\',sans-serif; font-size:26px; font-weight:700; color:{fp.get("metric_color", "#FDE68A")};">{fp.get("metric_text", "")}</div>'
        pill_html = f"""
        <div class="floating-pill" style="{pos_style}">
          {icon_markup}
          <div>
            <div class="fp-title">{fp.get("title", "")}</div>
            <div class="fp-sub">{fp.get("sub", "")}</div>
          </div>
        </div>
        """

    # Dock Content: supports "dual_cover", "comp_table", or "single_table"
    dock_type = slide_cfg.get("dock_type", "comp_table")
    dock_inner = ""
    if dock_type == "dual_cover":
        c1 = slide_cfg["card_left"]
        c2 = slide_cfg["card_right"]
        strip_left = slide_cfg.get("strip_left", "")
        strip_right = slide_cfg.get("strip_right", "")
        dock_inner = f"""
        <div class="dual-hero-cards">
          <div class="v-card sinc">
            <div class="vc-tag sinc">{c1["tag"]}</div>
            <div class="vc-price">{c1["price"]} <span>{c1.get("price_sub", "")}</span></div>
            <div class="vc-specs">{c1["specs_html"]}</div>
          </div>
          <div class="v-card aut">
            <div class="vc-tag aut">{c2["tag"]}</div>
            <div class="vc-price">{c2["price"]} <span>{c2.get("price_sub", "")}</span></div>
            <div class="vc-specs">{c2["specs_html"]}</div>
          </div>
        </div>
        <div class="summary-strip">
          <span>{strip_left}</span>
          <span>{strip_right}</span>
        </div>
        """
    elif dock_type == "comp_table":
        label = slide_cfg.get("table_label", "FICHA COMPARATIVA")
        col1 = slide_cfg.get("col_left", "VERSIÓN A")
        col2 = slide_cfg.get("col_right", "VERSIÓN B")
        rows_html = ""
        for r in slide_cfg.get("rows", []):
            c1_cls = "cr-val " + r.get("left_class", "")
            c2_cls = "cr-val " + r.get("right_class", "")
            rows_html += f"""
            <div class="comp-row">
              <div class="cr-name">{r["name"]}</div>
              <div class="{c1_cls.strip()}">{r["left"]}</div>
              <div class="{c2_cls.strip()}">{r["right"]}</div>
            </div>
            """
        banner_html = ""
        if slide_cfg.get("decision_html"):
            banner_html = f'<div class="decision-banner">{slide_cfg["decision_html"]}</div>'
        dock_inner = f"""
        <div class="dock-header">
          <div class="dh-label">{label}</div>
          <div class="dh-col sinc">{col1}</div>
          <div class="dh-col aut">{col2}</div>
        </div>
        {rows_html}
        {banner_html}
        """
    elif dock_type == "single_table":
        label = slide_cfg.get("table_label", "ESPECIFICACIONES CLAVE")
        badge_right = slide_cfg.get("col_right", "")
        rows_html = ""
        for r in slide_cfg.get("rows", []):
            v_cls = "cr-val " + r.get("val_class", "")
            rows_html += f"""
            <div class="single-row">
              <div class="cr-name">{r["name"]}</div>
              <div class="{v_cls.strip()}">{r["value"]}</div>
            </div>
            """
        banner_html = ""
        if slide_cfg.get("decision_html"):
            banner_html = f'<div class="decision-banner">{slide_cfg["decision_html"]}</div>'
        dock_inner = f"""
        <div class="dock-header-single">
          <div class="dh-label">{label}</div>
          <div class="dh-col aut">{badge_right}</div>
        </div>
        {rows_html}
        {banner_html}
        """

    cta = slide_cfg.get("cta", "DESLIZA PARA MÁS DETALLES ➔")

    return f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><style>{common_css}</style></head>
<body>
<div class="canvas">
  <img class="bg-scene" src="{bg_b64}" alt="Slide {idx}" />
  <div class="atmo-overlay"></div>
  <div class="header-bar">
    {brand_html}
    <div class="mag-badge">{badge}</div>
  </div>
  <div class="mag-header-center">
    <div class="mag-kicker">{kicker}</div>
    <div class="mag-title">{title_html}</div>
  </div>
  {overlap_html}
  {pill_html}
  <div class="mag-dock">
    {dock_inner}
  </div>
  <div class="charu-footer">
    <div class="footer-left">{TACHO_SVG}<span>@charuautopics</span></div>
    <div class="footer-cta">{cta}</div>
  </div>
</div>
</body></html>
"""


def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python render_magazine_carousel.py <path_to_carousel_config.json> [--only 1,4,9]"
        )
        sys.exit(1)

    cfg_path = os.path.abspath(sys.argv[1])
    only_slides = None
    if "--only" in sys.argv:
        only_idx = sys.argv.index("--only")
        if only_idx + 1 < len(sys.argv):
            only_slides = {
                int(x.strip()) for x in sys.argv[only_idx + 1].split(",") if x.strip().isdigit()
            }

    base_dir = os.path.dirname(cfg_path)
    with open(cfg_path, "r", encoding="utf-8") as f:
        cfg = json.load(f)

    # Automated Check: Detect repeated image_path across slides
    seen_paths = {}
    for i, s in enumerate(cfg.get("slides", []), 1):
        p = s.get("image_path", "")
        if p in seen_paths:
            print(
                f"[WARN] Imagen repetida detectada en Slide {i:02d} y Slide {seen_paths[p]:02d}: '{p}'. Regla canonica exige angulos distintos."
            )
        seen_paths[p] = i

    png_dir = os.path.join(base_dir, cfg.get("output_subdir", "slides_png"))
    os.makedirs(png_dir, exist_ok=True)

    with open(FONTS_CACHE_PATH, "r", encoding="utf-8") as f:
        font_css = f.read()

    common_css = get_common_css(font_css) + "\n" + cfg.get("extra_css", "")

    # Brand logo (image or text)
    logo_rel = cfg.get("brand_logo_path")
    if logo_rel and os.path.exists(os.path.join(base_dir, logo_rel)):
        logo_pil = Image.open(os.path.join(base_dir, logo_rel)).convert("RGBA")
        logo_b64 = img_to_b64(logo_pil, "PNG")
        inv = "filter: brightness(0) invert(1);" if cfg.get("invert_logo", True) else ""
        brand_html = f'<img src="{logo_b64}" style="height: 34px; {inv}" alt="Logo" />'
    else:
        brand_html = f'<div class="brand-text-logo">{cfg.get("brand_name", "CHARU")}</div>'

    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    ]
    browser = next((p for p in chrome_paths if os.path.exists(p)), None)
    if not browser:
        raise RuntimeError("No Chrome or Edge found for headless rendering!")

    rendered_files = []
    for idx, s_cfg in enumerate(cfg["slides"], 1):
        png_name = s_cfg.get("output_png", f"{cfg.get('file_prefix', 'Slide')}_{idx:02d}.png")
        if only_slides and idx not in only_slides:
            rendered_files.append((idx, png_name))
            continue

        img_src = os.path.join(base_dir, s_cfg["image_path"])
        scene_pil = make_magazine_scene(
            img_src,
            crop_box=s_cfg.get("crop_box"),
            paste_y=s_cfg.get("paste_y", 250),
            paste_h=s_cfg.get("paste_h", 760),
            top_rgb=s_cfg.get("top_rgb", [18, 16, 16]),
            bot_rgb=s_cfg.get("bot_rgb", [11, 12, 15]),
            top_blend_h=s_cfg.get("top_blend_h", 375),
            bot_blend_start=s_cfg.get("bot_blend_start", 905),
            crop_centering=s_cfg.get("crop_centering", [0.5, 0.5]),
            slide_idx=idx,
        )
        s_cfg["_bg_b64"] = img_to_b64(scene_pil, "JPEG")
        html_code = build_slide_html(s_cfg, brand_html, common_css, idx)

        temp_html = os.path.join(base_dir, f"_tmp_slide_{idx:02d}.html")
        png_path = os.path.join(png_dir, png_name)

        with open(temp_html, "w", encoding="utf-8") as f:
            f.write(html_code)

        cmd = [
            browser,
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--force-device-scale-factor=1",
            "--window-size=1080,1450",
            f"--screenshot={png_path}",
            f"file:///{temp_html.replace(os.sep, '/')}",
        ]
        subprocess.run(cmd, check=True)
        im = Image.open(png_path)
        if im.size != (1080, 1350):
            im = im.crop((0, 0, 1080, 1350))
            im.save(png_path)
        os.remove(temp_html)
        rendered_files.append((idx, png_name))
        print(f"Rendered {png_name} ({im.size[0]}x{im.size[1]})")

    # Generate carrusel_slides.html viewer
    cards_html = ""
    for idx, png_name in rendered_files:
        cards_html += f"""
        <div class="slide-card">
          <div class="slide-header">
            <span>LÁMINA {idx:02d} (ESTILO 3 MAGAZINE)</span>
            <a href="slides_png/{png_name}" download class="dl-btn">⬇ Descargar PNG (1080×1350)</a>
          </div>
          <img src="slides_png/{png_name}" alt="Slide {idx:02d}" />
        </div>
        """
    viewer_html = f"""<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8" /><title>{cfg.get("title", "Carrusel @charuautopics")}</title>
<style>
  body {{ margin: 0; padding: 40px; background: #07090E; color: #F8FAFC; font-family: system-ui, sans-serif; }}
  h1 {{ text-align: center; color: #FF9E2C; letter-spacing: 2px; margin-bottom: 8px; }}
  p.sub {{ text-align: center; color: #94A3B8; margin-bottom: 40px; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 32px; max-width: 1400px; margin: 0 auto; }}
  .slide-card {{ background: #11151F; border: 1px solid rgba(255, 158, 44, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }}
  .slide-header {{ display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: rgba(255, 158, 44, 0.1); font-weight: 700; color: #FF9E2C; }}
  .dl-btn {{ color: #07090E; background: #FF9E2C; text-decoration: none; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; }}
  .slide-card img {{ width: 100%; height: auto; display: block; }}
</style></head>
<body>
  <h1>{cfg.get("title", "CARRUSEL EDITORIAL — ESTILO 3 MAGAZINE")}</h1>
  <p class="sub">Resolución nativa 1080×1350 px (4:5 Vertical Instagram) • @charuautopics</p>
  <div class="grid">{cards_html}</div>
</body></html>
"""
    with open(os.path.join(base_dir, "carrusel_slides.html"), "w", encoding="utf-8") as f:
        f.write(viewer_html)
    print("Updated carrusel_slides.html successfully!")


if __name__ == "__main__":
    main()
