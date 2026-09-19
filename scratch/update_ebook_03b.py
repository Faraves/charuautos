with open('dist_pwa_historieta/ebook_historieta_completo.md', 'r', encoding='utf-8') as f:
    c = f.read()

target = """**Carmen (Conductora Principiante)** `😳 Vergüenza Divertida`:
*sonrojándose mientras apila apenada los cacharros viejos fuera del maletero*
> "¡Ups! Confieso que la cajuela se convirtió en el armario de lo que no sabía dónde guardar... ¡El vendedor me juró que venía con llanta de repuesto y no revisé nada más!\""""

replacement = """**Carmen (Conductora Principiante)** `😳 Vergüenza Divertida`:
*sonrojándose mientras apila apenada los cacharros viejos fuera del maletero*
> "¡Ups! Confieso que la cajuela se convirtió en el armario de lo que no sabía dónde guardar... ¡El vendedor me juró que venía con llanta de repuesto y no revisé nada más!"

---

![Inspección del Caucho de Repuesto y Doble Fondo](assets/comic_panel_03b_caucho_repuesto.jpg)
*Episodio 03 (Parte 2): Inspección del caucho de repuesto temporal (galleta), presión a 60 PSI y tornillo de anclaje*

💥 **[EFECTO SONORO VISUAL]:** *¡CLAC! ¡DOBLE FONDO AL DESCUBIERTO!* (Charu tira de la correa y revela el compartimiento del caucho de repuesto)

**Charu (Piloto y Mentor)** `⚠️ Inspección Crítica`:
*señalando con su pata el vástago de válvula y el tornillo mariposa de anclaje*
> "¡Ese es el gran error de los conductores novatos, Carmen! Confían en que tienen una llanta de repuesto abajo, pero nunca la revisan. En reposo pierde hasta 1 PSI al mes. Si tu repuesto es de uso temporal (galleta), requiere 60 PSI para aguantar el peso del auto. ¡Una llanta de auxilio desinflada en el fondo es solo peso muerto!"

**Carmen (Conductora Principiante)** `📝 Aprendizaje Clave`:
*anotando en su tabla mientras comprueba con el manómetro*
> "¡Menos mal levantamos la alfombra! Estaba en 35 PSI cuando debería tener 60. ¡La inflamos ya mismo y verifiqué que el tornillo de anclaje esté bien apretado para que no vibre en las curvas!\""""

if target in c:
    c = c.replace(target, replacement)
    with open('dist_pwa_historieta/ebook_historieta_completo.md', 'w', encoding='utf-8') as f:
        f.write(c)
    print('ebook_historieta_completo.md updated successfully')
else:
    print('target not found')
