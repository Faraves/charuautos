import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

W, H = 1280, 720
panel = Image.new('RGB', (W, H), (8, 12, 20))
draw = ImageDraw.Draw(panel)

# Fonts
f_main_title = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 24)
f_sub_title = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 13)
f_speech_charu = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 13)
f_speech_carmen = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 13)
f_badge_t = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 12)
f_badge_d = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 11)
f_rule_t = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 11)
f_rule_d = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 11)

# Outer Borders
draw.rectangle([(5, 5), (W - 6, H - 6)], outline=(0, 242, 254), width=3)
draw.rectangle([(9, 9), (W - 10, H - 10)], outline=(16, 24, 38), width=2)

# 1. Header Banner
draw.rectangle([(10, 10), (W - 11, 75)], fill=(12, 18, 30))
draw.line([(10, 75), (W - 11, 75)], fill=(0, 242, 254), width=2)
draw.text((W // 2, 30), 'EPISODIO 03B — EL SECRETO DEL DOBLE FONDO', fill=(255, 204, 0), font=f_main_title, anchor='mm')
draw.text((W // 2, 57), 'INSPECCION Y MANTENIMIENTO DEL CAUCHO DE REPUESTO Y HERRAMIENTAS DE ELEVACION', fill=(0, 242, 254), font=f_sub_title, anchor='mm')

# 2. Left Frame: Carmen (x: 25 to 300, y: 88 to 535)
carmen_box = [(25, 88), (300, 535)]
draw.rounded_rectangle(carmen_box, radius=10, fill=(15, 20, 32), outline=(0, 242, 254), width=2)
# Load clean Carmen crop
carmen_tight_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\carmen_tight.jpg'
if os.path.exists(carmen_tight_path):
    c_img = Image.open(carmen_tight_path).convert('RGB')
    # Crop slightly to remove left blue line: from x=20
    c_img = c_img.crop((22, 0, c_img.width - 15, c_img.height))
    # Resize to fit height 410
    th = 410
    tw = int(c_img.width * (th / c_img.height))
    c_img = c_img.resize((tw, th), Image.Resampling.LANCZOS)
    panel.paste(c_img, (35, 115))
# Header label inside Carmen card
draw.rectangle([(25, 88), (300, 115)], fill=(20, 28, 45))
draw.text((162, 101), 'CONDUCTORA PRECAVIDA', fill=(255, 204, 0), font=f_badge_t, anchor='mm')

# 3. Central Frame: Spare Tire Well (x: 312 to 965, y: 88 to 535)
well_box = [(312, 88), (965, 535)]
draw.rounded_rectangle(well_box, radius=10, fill=(14, 18, 28), outline=(0, 242, 254), width=2)
draw.rectangle([(312, 88), (965, 120)], fill=(22, 30, 48))
draw.text((638, 104), 'COMPARTIMIENTO INFERIOR DE LA CAJUELA (DOBLE FONDO)', fill=(255, 255, 255), font=f_sub_title, anchor='mm')

# Inside Central Frame:
# Raised carpet lid (top):
cx = 638
cy = 315
lid_pts = [
    (cx - 270, cy - 85),
    (cx + 270, cy - 85),
    (cx + 210, cy - 175),
    (cx - 210, cy - 175)
]
draw.polygon(lid_pts, fill=(35, 42, 58), outline=(20, 26, 38))
for i in range(4):
    y_l = cy - 160 + i * 20
    draw.line([(cx - 180 + i * 12, y_l), (cx + 180 - i * 12, y_l)], fill=(24, 30, 42), width=3)
# Red pull strap
draw.polygon([(cx - 15, cy - 175), (cx + 15, cy - 175), (cx + 10, cy - 205), (cx - 10, cy - 205)], fill=(220, 40, 40), outline=(120, 10, 10))
draw.text((cx, cy - 192), 'PULL', fill=(255, 255, 255), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 9), anchor='mm')

# Circular well depth
for d in range(35):
    draw.ellipse([cx - 250, cy - 105 + d, cx + 250, cy + 105 + d], fill=(16, 20, 30))
draw.ellipse([cx - 245, cy - 105 + 35, cx + 245, cy + 105 + 35], fill=(22, 28, 40), outline=(0, 242, 254), width=1)

# Paste Wheel graphic (from clean_spare_wheel_art or composite):
wheel_alpha_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\wheel_clean_alpha.png'
if os.path.exists(wheel_alpha_path):
    w_img = Image.open(wheel_alpha_path).convert('RGBA')
    # Resize wheel to height 260
    wh_target = 270
    ww_target = int(w_img.width * (wh_target / w_img.height))
    w_img = w_img.resize((ww_target, wh_target), Image.Resampling.LANCZOS)
    panel.paste(w_img, (cx - 190, cy - 100), w_img)

# Tools & Accessories on the right side of the well:
# Scissor jack crop
jack_crop_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\jack_tool.jpg'
if os.path.exists(jack_crop_path):
    j_img = Image.open(jack_crop_path).convert('RGB')
    j_img = j_img.resize((180, 120), Image.Resampling.LANCZOS)
    # Give border
    panel.paste(j_img, (cx + 60, cy - 50))
    draw.rectangle([(cx + 59, cy - 51), (cx + 241, cy + 71)], outline=(0, 242, 254), width=1)

# Digital Inflator crop
inflator_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\inflator_tool.jpg'
if os.path.exists(inflator_path):
    inf_img = Image.open(inflator_path).convert('RGB')
    inf_img = inf_img.resize((110, 110), Image.Resampling.LANCZOS)
    panel.paste(inf_img, (cx + 120, cy + 80))
    draw.rectangle([(cx + 119, cy + 79), (cx + 231, cy + 191)], outline=(0, 242, 254), width=1)

# Callout Leaders:
# 1. Spare Tire Pressure
draw.line([(cx - 100, cy - 20), (cx - 180, cy - 60), (cx - 240, cy - 60)], fill=(0, 242, 254), width=2)
draw.rounded_rectangle([(cx - 300, cy - 75), (cx - 170, cy - 45)], radius=5, fill=(10, 16, 26), outline=(0, 242, 254), width=1)
draw.text((cx - 235, cy - 60), 'Caucho 60 PSI (Galleta)', fill=(0, 242, 254), font=f_badge_t, anchor='mm')

# 2. Central Anchor Bolt
draw.line([(cx - 70, cy + 20), (cx - 10, cy + 130), (cx + 50, cy + 130)], fill=(255, 204, 0), width=2)
draw.rounded_rectangle([(cx + 50, cy + 115), (cx + 190, cy + 145)], radius=5, fill=(10, 16, 26), outline=(255, 204, 0), width=1)
draw.text((cx + 120, cy + 130), 'Tornillo de Anclaje Firme', fill=(255, 204, 0), font=f_badge_t, anchor='mm')

# 3. Gato y Manivela
draw.line([(cx + 150, cy - 50), (cx + 150, cy - 75), (cx + 100, cy - 75)], fill=(0, 242, 254), width=2)
draw.rounded_rectangle([(cx - 30, cy - 90), (cx + 110, cy - 60)], radius=5, fill=(10, 16, 26), outline=(0, 242, 254), width=1)
draw.text((cx + 40, cy - 75), 'Gato Mecanico y Llave', fill=(255, 255, 255), font=f_badge_t, anchor='mm')

# 4. Right Frame: Charulo Mech-Dog (x: 975 to 1255, y: 88 to 535)
charu_box = [(975, 88), (1255, 535)]
draw.rounded_rectangle(charu_box, radius=10, fill=(15, 20, 32), outline=(0, 242, 254), width=2)
draw.rectangle([(975, 88), (1255, 115)], fill=(20, 28, 45))
draw.text((1115, 101), 'CHARULO • INSPECTOR TACTICO', fill=(255, 204, 0), font=f_badge_t, anchor='mm')

# Paste Charulo
charu_alpha_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\charulo_full_u2net.png'
if os.path.exists(charu_alpha_path):
    ch_img = Image.open(charu_alpha_path).convert('RGBA')
    dog_h = 390
    dog_w = int(ch_img.width * (dog_h / ch_img.height))
    ch_img = ch_img.resize((dog_w, dog_h), Image.Resampling.LANCZOS)
    panel.paste(ch_img, (985, 125), ch_img)

# 5. Speech Bubbles across the bottom-middle (y: 545 to 630)
# Carmen's speech bubble:
draw.rounded_rectangle([(25, 545), (460, 630)], radius=12, fill=(255, 255, 255), outline=(10, 10, 10), width=3)
draw.polygon([(150, 545), (175, 545), (162, 530)], fill=(255, 255, 255))
draw.line([(150, 545), (162, 530)], fill=(10, 10, 10), width=3)
draw.line([(175, 545), (162, 530)], fill=(10, 10, 10), width=3)
draw.text((242, 565), '¡Menos mal levantamos la alfombra!', fill=(15, 15, 15), font=f_speech_carmen, anchor='mm')
draw.text((242, 587), '¡El gato y la cruceta estan en su sitio,', fill=(15, 15, 15), font=f_speech_carmen, anchor='mm')
draw.text((242, 609), 'pero casi olvido verificar la presion!', fill=(200, 10, 10), font=f_speech_carmen, anchor='mm')

# Charulo's speech bubble:
draw.rounded_rectangle([(820, 545), (1255, 630)], radius=12, fill=(255, 255, 255), outline=(10, 10, 10), width=3)
draw.polygon([(1050, 545), (1075, 545), (1062, 530)], fill=(255, 255, 255))
draw.line([(1050, 545), (1062, 530)], fill=(10, 10, 10), width=3)
draw.line([(1075, 545), (1062, 530)], fill=(10, 10, 10), width=3)
draw.text((1037, 565), '¡Ese es el gran error, Carmen!', fill=(15, 15, 15), font=f_speech_charu, anchor='mm')
draw.text((1037, 587), '¡El caucho de repuesto pierde aire al mes!', fill=(200, 10, 10), font=f_speech_charu, anchor='mm')
draw.text((1037, 609), '¡Calibralo a 60 PSI para no quedar varada!', fill=(15, 15, 15), font=f_speech_charu, anchor='mm')

# Middle Protocol Card:
draw.rounded_rectangle([(472, 545), (808, 630)], radius=10, fill=(18, 26, 42), outline=(255, 204, 0), width=2)
draw.text((640, 563), '⚡ REQUISITOS DEL CAUCHO DE REPUESTO', fill=(255, 204, 0), font=f_badge_t, anchor='mm')
draw.text((640, 583), '• Presion: 60 PSI (galleta) o 32-35 PSI (normal)', fill=(220, 235, 250), font=f_badge_d, anchor='mm')
draw.text((640, 599), '• Limite: Maximo 80 km/h y maximo 80 km', fill=(220, 235, 250), font=f_badge_d, anchor='mm')
draw.text((640, 615), '• Caducidad: Renovar cada 6-8 anos (Codigo DOT)', fill=(0, 242, 254), font=f_badge_d, anchor='mm')

# 6. Bottom Banner Rule
draw.rectangle([(10, 642), (W - 11, H - 11)], fill=(12, 18, 30))
draw.line([(10, 642), (W - 11, 642)], fill=(0, 242, 254), width=1)
draw.rounded_rectangle([(25, 650), (180, 676)], radius=12, fill=(255, 204, 0))
draw.text((102, 663), 'REGLA DE CHARU', fill=(10, 15, 25), font=f_rule_t, anchor='mm')
draw.text((195, 652), '\"Comprueba la presion del caucho de repuesto cada 30 dias cuando calibres las 4 ruedas titulares.\"', fill=(220, 235, 250), font=f_rule_d)
draw.text((195, 667), '\"Una llanta de auxilio desinflada es peso muerto. ¡Asegura tambien que el gato y la manivela esten anclados!\"', fill=(0, 242, 254), font=f_rule_d)

output_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\comic_panel_03b_caucho_repuesto.jpg'
panel.save(output_path, quality=95)
print('Master Panel 03B saved successfully at:', output_path)
