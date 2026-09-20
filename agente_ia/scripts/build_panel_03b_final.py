import math, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance

W, H = 1280, 720
panel = Image.new('RGB', (W, H), (10, 15, 25))
draw = ImageDraw.Draw(panel)

# Fonts
f_main_title = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 24)
f_sub_title = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 13)
f_speech_charu = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 14)
f_speech_carmen = ImageFont.truetype(r'C:\Windows\Fonts\comicbd.ttf', 13)
f_badge_t = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 12)
f_badge_d = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 11)
f_rule = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 12)

# Outer borders
draw.rectangle([(5, 5), (W - 6, H - 6)], outline=(0, 242, 254), width=3)
draw.rectangle([(9, 9), (W - 10, H - 10)], outline=(20, 30, 48), width=2)

# 1. Top Title Header
draw.rectangle([(10, 10), (W - 11, 75)], fill=(12, 18, 30))
draw.line([(10, 75), (W - 11, 75)], fill=(0, 242, 254), width=2)
draw.text((W // 2, 30), 'EPISODIO 03 (PARTE 2) — EL SECRETO DEL DOBLE FONDO', fill=(255, 204, 0), font=f_main_title, anchor='mm')
draw.text((W // 2, 57), 'EL CAUCHO DE REPUESTO: INSPECCION MENSUAL, PRESION Y EQUIPO DE ANCLAJE', fill=(0, 242, 254), font=f_sub_title, anchor='mm')

# 2. Central Technical Illustration Box (x: 290 to 990, y: 88 to 535)
box_x1, box_y1, box_x2, box_y2 = 290, 88, 990, 535
draw.rounded_rectangle([(box_x1, box_y1), (box_x2, box_y2)], radius=12, fill=(16, 22, 36), outline=(0, 242, 254), width=2)

# Central Illustration Header Bar
draw.rounded_rectangle([(box_x1, box_y1), (box_x2, box_y1 + 32)], radius=12, fill=(24, 34, 54))
draw.rectangle([(box_x1, box_y1 + 16), (box_x2, box_y1 + 32)], fill=(24, 34, 54))
draw.text(((box_x1 + box_x2) // 2, box_y1 + 16), 'COMPARTIMIENTO INFERIOR DE LA CAJUELA ABIERTO', fill=(255, 255, 255), font=f_sub_title, anchor='mm')

# Trunk Well Visual:
cx = (box_x1 + box_x2) // 2
cy = 315

# Lifted lid flap (tapa levantada)
lid_poly = [
    (cx - 260, cy - 90),
    (cx + 260, cy - 90),
    (cx + 210, cy - 180),
    (cx - 210, cy - 180)
]
draw.polygon(lid_poly, fill=(42, 50, 68), outline=(25, 32, 45))
# Insulation texture lines on underside of lid:
for i in range(4):
    y_l = cy - 165 + i * 20
    draw.line([(cx - 180 + i * 10, y_l), (cx + 180 - i * 10, y_l)], fill=(30, 36, 50), width=3)
# Red pull strap
draw.polygon([(cx - 15, cy - 180), (cx + 15, cy - 180), (cx + 10, cy - 215), (cx - 10, cy - 215)], fill=(220, 50, 50), outline=(120, 20, 20))
draw.text((cx, cy - 200), 'PULL', fill=(255, 255, 255), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 9), anchor='mm')

# Deep circular well cavity
for d in range(35):
    draw.ellipse([cx - 240, cy - 110 + d, cx + 240, cy + 110 + d], fill=(18, 24, 34))

# Bottom of well
draw.ellipse([cx - 236, cy - 110 + 35, cx + 236, cy + 110 + 35], fill=(24, 30, 42), outline=(0, 242, 254), width=1)

# Rubber Spare Tire:
tr_x, tr_y = 200, 95
draw.ellipse([cx - tr_x, cy - tr_y + 20, cx + tr_x, cy + tr_y + 20], fill=(30, 32, 38), outline=(12, 14, 18), width=5)

# Tread grooves:
for a in range(0, 360, 18):
    rad = math.radians(a)
    x1 = cx + int((tr_x - 4) * math.cos(rad))
    y1 = cy + 20 + int((tr_y - 2) * math.sin(rad))
    x2 = cx + int((tr_x - 25) * math.cos(rad))
    y2 = cy + 20 + int((tr_y - 12) * math.sin(rad))
    draw.line([(x1, y1), (x2, y2)], fill=(15, 16, 20), width=3)

# Yellow safety ring on spare tire:
draw.ellipse([cx - tr_x + 30, cy - tr_y + 35, cx + tr_x - 30, cy + tr_y + 5], outline=(255, 204, 0), width=4)
draw.text((cx, cy - tr_y + 44), 'SPARE TIRE • USO TEMPORAL • MAX 80 KM/H', fill=(255, 204, 0), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 10), anchor='mm')

# Steel Wheel Rim (Rin negro):
rr_x, rr_y = 130, 60
draw.ellipse([cx - rr_x, cy - rr_y + 20, cx + rr_x, cy + rr_y + 20], fill=(42, 46, 54), outline=(75, 85, 100), width=3)
draw.ellipse([cx - rr_x + 20, cy - rr_y + 30, cx + rr_x - 20, cy + rr_y + 10], fill=(22, 26, 32), outline=(50, 60, 75), width=2)

# 5 Lug holes:
for a in range(0, 360, 72):
    rad = math.radians(a)
    lx = cx + int(60 * math.cos(rad))
    ly = cy + 20 + int(28 * math.sin(rad))
    draw.ellipse([lx - 8, ly - 5, lx + 8, ly + 5], fill=(12, 14, 18), outline=(130, 150, 175), width=2)

# Central Anchor Wing Bolt (Tornillo Mariposa de Fijacion):
draw.ellipse([cx - 24, cy + 10, cx + 24, cy + 30], fill=(80, 90, 110), outline=(220, 235, 255), width=2)
draw.polygon([(cx - 38, cy + 16), (cx - 20, cy + 12), (cx - 20, cy + 28), (cx - 38, cy + 24)], fill=(200, 220, 250))
draw.polygon([(cx + 38, cy + 16), (cx + 20, cy + 12), (cx + 20, cy + 28), (cx + 38, cy + 24)], fill=(200, 220, 250))
draw.text((cx, cy + 20), 'ANCLAJE', fill=(255, 255, 255), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 8), anchor='mm')

# Scissor Jack & Lug Wrench Molded inside:
draw.line([(cx - 50, cy + 50), (cx + 50, cy + 50)], fill=(120, 130, 145), width=4)
draw.line([(cx - 50, cy + 50), (cx, cy + 35)], fill=(100, 110, 125), width=4)
draw.line([(cx + 50, cy + 50), (cx, cy + 35)], fill=(100, 110, 125), width=4)
draw.text((cx, cy + 62), 'GATO Y MANIVELA SUJETOS', fill=(180, 200, 230), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 9), anchor='mm')

# Valve and Pressure Gauge callout:
vx, vy = cx - tr_x + 45, cy + 20
draw.ellipse([vx - 5, vy - 4, vx + 5, vy + 4], fill=(220, 190, 60))
# Digital Gauge:
draw.rounded_rectangle([(vx - 95, vy - 50), (vx - 15, vy - 10)], radius=6, fill=(10, 16, 24), outline=(0, 242, 254), width=2)
draw.text((vx - 55, vy - 36), '60 PSI', fill=(0, 242, 254), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 13), anchor='mm')
draw.text((vx - 55, vy - 20), 'CALIBRADO OK', fill=(50, 255, 120), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 8), anchor='mm')
draw.line([(vx - 15, vy - 30), (vx, vy)], fill=(0, 242, 254), width=2)

# Pointer Labels with glowing lines:
# 1. Tornillo Anclaje
draw.line([(cx, cy + 10), (cx, cy - 65), (cx + 80, cy - 65)], fill=(255, 204, 0), width=2)
draw.rounded_rectangle([(cx + 80, cy - 80), (cx + 250, cy - 50)], radius=5, fill=(15, 20, 30), outline=(255, 204, 0), width=1)
draw.text((cx + 165, cy - 65), 'Tornillo Central Roscado', fill=(255, 204, 0), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 10), anchor='mm')

# 2. Codigo DOT
draw.line([(cx + tr_x - 30, cy + 20), (cx + tr_x + 20, cy + 60)], fill=(0, 242, 254), width=2)
draw.rounded_rectangle([(cx + tr_x - 30, cy + 60), (cx + tr_x + 100, cy + 90)], radius=5, fill=(15, 20, 30), outline=(0, 242, 254), width=1)
draw.text((cx + tr_x + 35, cy + 75), 'Codigo DOT (<6 anos)', fill=(0, 242, 254), font=ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 10), anchor='mm')

# 3. Paste Characters!
# Carmen on left:
carmen_src = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\carmen_ep02_crop.jpg'
if os.path.exists(carmen_src):
    c_img = Image.open(carmen_src).convert('RGB')
    ch_target = 430
    cw_target = int(c_img.width * (ch_target / c_img.height))
    c_resized = c_img.resize((cw_target, ch_target), Image.Resampling.LANCZOS)
    panel.paste(c_resized, (25, 100))
    draw.rectangle([(23, 98), (25 + cw_target + 2, 100 + ch_target + 2)], outline=(0, 242, 254), width=2)

# Charulo on right:
charu_src = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\charulo_full_u2net.png'
if os.path.exists(charu_src):
    ch_img = Image.open(charu_src).convert('RGBA')
    dog_h = 390
    dog_w = int(ch_img.width * (dog_h / ch_img.height))
    dog_resized = ch_img.resize((dog_w, dog_h), Image.Resampling.LANCZOS)
    panel.paste(dog_resized, (995, 140), dog_resized)

# 4. Comic Speech Bubbles!
# Carmen's speech bubble (left):
cb_x1, cb_y1, cb_x2, cb_y2 = 25, 545, 450, 625
draw.rounded_rectangle([(cb_x1, cb_y1), (cb_x2, cb_y2)], radius=12, fill=(255, 255, 255), outline=(10, 10, 10), width=3)
draw.polygon([(180, cb_y1), (205, cb_y1), (195, cb_y1 - 15)], fill=(255, 255, 255))
draw.line([(180, cb_y1), (195, cb_y1 - 15)], fill=(10, 10, 10), width=3)
draw.line([(205, cb_y1), (195, cb_y1 - 15)], fill=(10, 10, 10), width=3)
draw.text((237, 565), '¡Increible, Charu! ¡El doble fondo', fill=(15, 15, 15), font=f_speech_carmen, anchor='mm')
draw.text((237, 585), 'oculta el repuesto y las herramientas!', fill=(15, 15, 15), font=f_speech_carmen, anchor='mm')
draw.text((237, 605), '¡Casi olvido que necesita presion!', fill=(220, 20, 20), font=f_speech_carmen, anchor='mm')

# Charulo's speech bubble (right):
db_x1, db_y1, db_x2, db_y2 = 820, 545, 1255, 625
draw.rounded_rectangle([(db_x1, db_y1), (db_x2, db_y2)], radius=12, fill=(255, 255, 255), outline=(10, 10, 10), width=3)
draw.polygon([(1060, db_y1), (1085, db_y1), (1075, db_y1 - 15)], fill=(255, 255, 255))
draw.line([(1060, db_y1), (1075, db_y1 - 15)], fill=(10, 10, 10), width=3)
draw.line([(1085, db_y1), (1075, db_y1 - 15)], fill=(10, 10, 10), width=3)
draw.text((1037, 565), '¡No basta con tenerla, Carmen!', fill=(15, 15, 15), font=f_speech_charu, anchor='mm')
draw.text((1037, 585), '¡Debe calibrarse a 60 PSI cada mes!', fill=(200, 10, 10), font=f_speech_charu, anchor='mm')
draw.text((1037, 605), '¡Una llanta sin aire no te salvara del apuro!', fill=(15, 15, 15), font=f_speech_charu, anchor='mm')

# 5. Middle Bottom Golden Rule Card (between bubbles):
mb_x1, mb_y1, mb_x2, mb_y2 = 465, 545, 805, 625
draw.rounded_rectangle([(mb_x1, mb_y1), (mb_x2, mb_y2)], radius=10, fill=(18, 26, 42), outline=(255, 204, 0), width=2)
draw.text(((mb_x1 + mb_x2) // 2, mb_y1 + 18), '⚡ PROTOCOLO DE REPUESTO', fill=(255, 204, 0), font=f_badge_t, anchor='mm')
draw.text(((mb_x1 + mb_x2) // 2, mb_y1 + 38), '• 60 PSI (galleta) o 32-35 PSI (normal)', fill=(220, 235, 250), font=f_badge_d, anchor='mm')
draw.text(((mb_x1 + mb_x2) // 2, mb_y1 + 54), '• Max. 80 km/h y no mas de 80 km', fill=(220, 235, 250), font=f_badge_d, anchor='mm')
draw.text(((mb_x1 + mb_x2) // 2, mb_y1 + 70), '• Tornillo central siempre ajustado', fill=(0, 242, 254), font=f_badge_d, anchor='mm')

# 6. Bottom Banner Rule
draw.rectangle([(10, 638), (W - 11, H - 11)], fill=(12, 18, 30))
draw.line([(10, 638), (W - 11, 638)], fill=(0, 242, 254), width=1)
draw.rounded_rectangle([(25, 646), (180, 672)], radius=12, fill=(255, 204, 0))
draw.text((102, 659), 'REGLA DE CHARU', fill=(10, 15, 25), font=f_rule, anchor='mm')
draw.text((200, 650), 'Comprueba la presion del caucho de repuesto cada 30 dias cuando calibres las 4 ruedas titulares.', fill=(220, 235, 250), font=f_badge_d)
draw.text((200, 665), 'Si es de uso temporal (galleta), no superes los 80 km/h ni recorras mas de 80 km. ¡Seguridad primero!', fill=(0, 242, 254), font=f_badge_d)

output_path = r'C:\Users\Frode\.gemini\antigravity\brain\c89f57d2-6d47-48df-81b4-51e4599bbd6a\scratch\panel_03b_final.jpg'
panel.save(output_path, quality=95)
print('Panel 03B generated successfully at:', output_path)
