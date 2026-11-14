import base64
import os
import re
import urllib.request

skill_dir = r"d:\Proyectos\CharuAutos\.agents\skills\charu-social-carousel-magazine"
scripts_dir = os.path.join(skill_dir, "scripts")
resources_dir = os.path.join(skill_dir, "resources")
os.makedirs(scripts_dir, exist_ok=True)
os.makedirs(resources_dir, exist_ok=True)

font_url = "https://fonts.googleapis.com/css2?family=Oswald:ital,wght@0,500;0,700;1,700&family=Poppins:wght@400;500;600;700;800&display=swap"
req = urllib.request.Request(
    font_url,
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
)
with urllib.request.urlopen(req) as resp:
    font_css = resp.read().decode("utf-8")

urls = re.findall(r"url\((https://[^\)]+)\)", font_css)
for u in set(urls):
    f_req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(f_req) as f_resp:
        b64_font = base64.b64encode(f_resp.read()).decode("utf-8")
    font_css = font_css.replace(u, f"data:font/woff2;base64,{b64_font}")

cache_path = os.path.join(resources_dir, "fonts_cache.css")
with open(cache_path, "w", encoding="utf-8") as f:
    f.write(font_css)

print(f"Saved cached Base64 fonts to {cache_path} ({len(font_css)} bytes)")
