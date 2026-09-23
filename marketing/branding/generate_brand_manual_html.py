# -*- coding: utf-8 -*-
"""
Generates the comprehensive Brand Identity Manual & UI/UX Design System HTML for:
CHARU MOTORHUB | URBAN VITALITY & THE MECHANICAL HUB (Versión Oficial 2.0)
Now includes complete Dark Mode vision, interactive Light/Dark/Split app showcase,
OLED ergonomics, contrast ratios, and dark theme design tokens.
"""
import os

html_code = """<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Charu motorhub | Manual de Identidad Corporativa y Sistema de Diseño UI/UX — Versión Oficial 2.0</title>
  
  <!-- Google Fonts: Oswald (Display / Titulares), Poppins (Lectura / UI), JetBrains Mono (Datos Técnicos / OBD) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    /* ==========================================================================
       DESIGN TOKENS & VARIABLES — URBAN VITALITY & THE MECHANICAL HUB (V2.0)
       ========================================================================== */
    :root {
      /* Paleta Cromática Canónica (Brand Tokens) */
      --color-ground-navy: #13334C;
      --color-ground-navy-dark: #071520;
      --color-ground-navy-mid: #0F2A3F;
      --color-accent-lime: #00E676;
      --color-accent-lime-hover: #00FF83;
      --color-accent-lime-dim: rgba(0, 230, 118, 0.14);
      --color-pop-white: #FFFFFF;
      --color-text-dark: #1E293B;
      --color-text-muted: #64748B;
      --color-text-soft: #94A3B8;
      --color-surface-light: #F4F6F9;
      --color-surface-white: #FFFFFF;
      --color-border-subtle: #E2E8F0;
      --color-border-accent: rgba(0, 230, 118, 0.35);

      /* Tipografías Oficiales */
      --font-heading: 'Oswald', sans-serif;
      --font-body: 'Poppins', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      /* Radios de Contenedor */
      --radius-xs: 6px;
      --radius-sm: 10px;
      --radius-card: 16px;
      --radius-panel: 24px;
      --radius-btn: 12px;
      --radius-pill: 999px;

      /* Sombras & Elevaciones */
      --shadow-diffuse: 0 10px 30px rgba(19, 51, 76, 0.07);
      --shadow-hover: 0 18px 45px rgba(19, 51, 76, 0.14);
      --shadow-neon-glow: 0 8px 25px rgba(0, 230, 118, 0.35);
      --shadow-neon-hover: 0 12px 35px rgba(0, 230, 118, 0.55);

      /* Sistema de Layout */
      --container-max: 1320px;
      --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Dark Mode (Conmutador Global del Manual) */
    body.dark-theme {
      --color-surface-light: #071520;
      --color-surface-white: #0F2A3F;
      --color-text-dark: #F8FAFC;
      --color-text-muted: #94A3B8;
      --color-text-soft: #64748B;
      --color-border-subtle: rgba(255, 255, 255, 0.08);
      --color-border-accent: rgba(0, 230, 118, 0.45);
      --shadow-diffuse: 0 12px 40px rgba(0, 0, 0, 0.6);
      --shadow-hover: 0 20px 50px rgba(0, 0, 0, 0.8);
    }

    /* ==========================================================================
       RESETS & BASE ESTILOS
       ========================================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      background-color: var(--color-surface-light);
      color: var(--color-text-dark);
      font-family: var(--font-body);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.3s ease, color 0.3s ease;
      overflow-x: hidden;
    }

    ::selection {
      background: var(--color-accent-lime);
      color: var(--color-ground-navy);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* ==========================================================================
       BARRA DE NAVEGACIÓN SUPERIOR (STICKY)
       ========================================================================== */
    .top-nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(19, 51, 76, 0.97);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--color-pop-white);
      padding: 12px 28px;
    }

    .nav-inner {
      max-width: var(--container-max);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .brand-logo-badge {
      width: 38px;
      height: 38px;
      border-radius: 9px;
      overflow: hidden;
      background: #13334C;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--color-accent-lime);
      box-shadow: 0 3px 12px rgba(0, 230, 118, 0.35);
      flex-shrink: 0;
    }

    .brand-logo-badge img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .brand-title-wrap {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .brand-title {
      font-family: var(--font-heading);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: var(--color-pop-white);
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .brand-title span.sub {
      font-family: var(--font-body);
      font-size: 13px;
      font-weight: 600;
      color: var(--color-accent-lime);
      letter-spacing: 2px;
      text-transform: lowercase;
    }
    .brand-subtitle-tag {
      font-family: var(--font-body);
      font-size: 8px;
      font-weight: 700;
      color: #94A3B8;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 3px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 18px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .nav-links a {
      color: #CBD5E1;
      transition: var(--transition-smooth);
      position: relative;
      padding: 4px 0;
      white-space: nowrap;
    }

    .nav-links a:hover {
      color: var(--color-accent-lime);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--color-accent-lime);
      transition: width 0.3s ease;
    }

    .nav-links a:hover::after {
      width: 100%;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .theme-toggle-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: var(--color-pop-white);
      padding: 7px 16px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--transition-smooth);
    }

    .theme-toggle-btn:hover {
      background: rgba(0, 230, 118, 0.2);
      border-color: var(--color-accent-lime);
      color: var(--color-accent-lime);
    }

    /* ==========================================================================
       HERO BANNER & IDENTIFICADOR PRINCIPAL
       ========================================================================== */
    .hero-banner {
      background: linear-gradient(135deg, var(--color-ground-navy-dark) 0%, var(--color-ground-navy-mid) 50%, var(--color-ground-navy) 100%);
      color: var(--color-pop-white);
      padding: 70px 28px 80px;
      position: relative;
      overflow: hidden;
      border-bottom: 4px solid var(--color-accent-lime);
    }

    .hero-pattern {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), 
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
    }

    .hero-glow {
      position: absolute;
      width: 700px;
      height: 700px;
      background: radial-gradient(circle, rgba(0, 230, 118, 0.22) 0%, transparent 70%);
      top: -180px;
      right: -120px;
      pointer-events: none;
    }

    .hero-container {
      max-width: var(--container-max);
      margin: 0 auto;
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 48px;
      align-items: center;
    }

    .badge-vitality {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(0, 230, 118, 0.15);
      border: 1px solid var(--color-accent-lime);
      color: var(--color-accent-lime);
      padding: 6px 16px;
      border-radius: var(--radius-pill);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .hero-h1 {
      font-family: var(--font-heading);
      font-size: 52px;
      font-weight: 700;
      line-height: 1.12;
      text-transform: uppercase;
      letter-spacing: -0.5px;
      margin-bottom: 18px;
    }

    .hero-h1 span.highlight {
      color: var(--color-accent-lime);
      text-shadow: 0 0 28px rgba(0, 230, 118, 0.45);
    }

    .hero-p {
      font-size: 16px;
      color: #CBD5E1;
      max-width: 620px;
      margin-bottom: 30px;
      font-weight: 400;
      line-height: 1.75;
    }

    .hero-quick-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
      font-size: 13px;
      color: #94A3B8;
    }
    .hero-quick-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .hero-quick-meta strong {
      color: var(--color-pop-white);
    }

    /* Hero Card Tribute & Real Logo Preview */
    .hero-card-tribute {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(16px);
      border-radius: var(--radius-panel);
      padding: 24px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.45);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .hero-tribute-banner {
      display: flex;
      align-items: center;
      gap: 18px;
      background: var(--color-ground-navy-dark);
      padding: 14px 18px;
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-accent);
    }

    .hero-charulo-thumb {
      width: 65px;
      height: 65px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--color-accent-lime);
      box-shadow: var(--shadow-neon-glow);
      flex-shrink: 0;
    }

    .hero-tribute-text h3 {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-pop-white);
      margin-bottom: 2px;
    }
    .hero-tribute-text p {
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.4;
    }

    .hero-logo-showcase-box {
      background: #071520;
      border-radius: var(--radius-card);
      padding: 16px;
      border: 1px solid var(--color-border-accent);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-align: center;
    }

    .hero-logo-img {
      width: 100%;
      max-width: 320px;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.08);
      transition: var(--transition-smooth);
    }

    .hero-logo-img:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 30px rgba(0, 230, 118, 0.25);
    }

    /* ==========================================================================
       MAIN CONTENT WRAPPER & SECCIONES
       ========================================================================== */
    .main-wrapper {
      max-width: var(--container-max);
      margin: 0 auto;
      padding: 60px 28px 120px;
    }

    .section-block {
      margin-bottom: 90px;
      scroll-margin-top: 85px;
    }

    .section-header {
      margin-bottom: 36px;
      border-bottom: 2px solid var(--color-border-subtle);
      padding-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .section-number {
      font-family: var(--font-heading);
      font-size: 13px;
      font-weight: 700;
      color: #00B359;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: 36px;
      font-weight: 700;
      color: var(--color-ground-navy);
      letter-spacing: -0.5px;
    }
    body.dark-theme .section-title {
      color: var(--color-pop-white);
    }

    .section-desc {
      font-size: 15px;
      color: var(--color-text-muted);
      max-width: 820px;
      margin-top: 6px;
    }

    /* ==========================================================================
       SECCIÓN 1: ESTRATEGIA Y ADN DE MARCA
       ========================================================================== */
    .charulo-tribute-hero {
      background: var(--color-surface-white);
      border-radius: var(--radius-panel);
      border: 1px solid var(--color-border-subtle);
      padding: 36px;
      box-shadow: var(--shadow-diffuse);
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 36px;
      align-items: center;
      margin-bottom: 36px;
      position: relative;
      overflow: hidden;
    }
    .charulo-tribute-hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 100%;
      background: var(--color-accent-lime);
    }

    .charulo-portrait-wrap {
      text-align: center;
    }
    .charulo-portrait-img {
      width: 240px;
      height: 240px;
      border-radius: var(--radius-card);
      object-fit: cover;
      border: 3px solid var(--color-accent-lime);
      box-shadow: var(--shadow-neon-glow);
      margin-bottom: 12px;
    }
    .charulo-badge-pill {
      display: inline-block;
      background: var(--color-ground-navy);
      color: var(--color-accent-lime);
      font-family: var(--font-heading);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: var(--radius-pill);
      letter-spacing: 1px;
    }

    .charulo-narrative h3 {
      font-family: var(--font-heading);
      font-size: 26px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 12px;
    }
    body.dark-theme .charulo-narrative h3 {
      color: var(--color-pop-white);
    }
    .charulo-narrative p {
      font-size: 15px;
      color: var(--color-text-dark);
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .tribute-pillars-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 20px;
    }
    .pillar-box {
      background: var(--color-surface-light);
      border-radius: var(--radius-sm);
      padding: 16px;
      border-left: 3px solid var(--color-accent-lime);
    }
    .pillar-box strong {
      display: block;
      font-family: var(--font-heading);
      font-size: 15px;
      color: var(--color-ground-navy);
      margin-bottom: 4px;
    }
    body.dark-theme .pillar-box strong {
      color: var(--color-pop-white);
    }
    .pillar-box span {
      font-size: 12.5px;
      color: var(--color-text-muted);
      line-height: 1.45;
    }

    .grid-strategy-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .strategy-card {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 28px;
      box-shadow: var(--shadow-diffuse);
      position: relative;
    }
    .strategy-card h4 {
      font-family: var(--font-heading);
      font-size: 21px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 10px;
    }
    body.dark-theme .strategy-card h4 {
      color: var(--color-pop-white);
    }
    .strategy-card p {
      font-size: 14.5px;
      color: var(--color-text-dark);
      line-height: 1.65;
    }

    /* ==========================================================================
       SECCIÓN 2: EL LOGOTIPO OFICIAL & LA HUELLA MECÁNICA
       ========================================================================== */
    .logo-hero-board {
      background: var(--color-surface-white);
      border-radius: var(--radius-panel);
      border: 1px solid var(--color-border-subtle);
      padding: 32px;
      box-shadow: var(--shadow-diffuse);
      margin-bottom: 36px;
    }

    .brandboard-frame {
      border-radius: var(--radius-card);
      overflow: hidden;
      border: 1px solid var(--color-border-accent);
      background: #071520;
      box-shadow: 0 15px 45px rgba(0,0,0,0.5);
      position: relative;
    }

    .brandboard-img {
      width: 100%;
      height: auto;
      display: block;
      transition: var(--transition-smooth);
    }

    .brandboard-badge-bar {
      padding: 14px 24px;
      background: #0F2A3F;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
      color: #CBD5E1;
    }

    /* Interactive Logo Switcher */
    .logo-interactive-container {
      background: var(--color-surface-white);
      border-radius: var(--radius-panel);
      border: 1px solid var(--color-border-subtle);
      padding: 32px;
      box-shadow: var(--shadow-diffuse);
      margin-bottom: 36px;
    }

    .logo-switcher-bar {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .btn-logo-switch {
      background: var(--color-surface-light);
      border: 1px solid var(--color-border-subtle);
      padding: 9px 20px;
      border-radius: var(--radius-btn);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      color: var(--color-text-dark);
      transition: var(--transition-smooth);
    }

    .btn-logo-switch.active {
      background: var(--color-ground-navy);
      color: var(--color-pop-white);
      border-color: var(--color-ground-navy);
      box-shadow: 0 4px 14px rgba(19, 51, 76, 0.25);
    }

    .logo-stage-display {
      min-height: 280px;
      border-radius: var(--radius-card);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      transition: var(--transition-smooth);
      padding: 24px;
    }

    .logo-stage-display.dark-stage {
      background: #13334C;
      background-image: radial-gradient(circle at center, rgba(0, 230, 118, 0.08) 0%, transparent 70%);
    }

    .logo-stage-display.light-stage {
      background: #FFFFFF;
      box-shadow: inset 0 0 0 1px #E2E8F0;
    }

    .logo-stage-display.mono-stage {
      background: #000000;
    }

    .rendered-logo-lockup {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      text-align: center;
    }

    .stage-logo-crop {
      max-height: 200px;
      max-width: 480px;
      object-fit: contain;
      filter: drop-shadow(0 4px 20px rgba(0,0,0,0.35));
      transition: var(--transition-smooth);
    }

    /* Anatomy Breakdown Cards */
    .anatomy-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .anatomy-card {
      background: var(--color-surface-light);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .anatomy-card-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 700;
      color: #00B359;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .anatomy-card h5 {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-ground-navy);
    }
    body.dark-theme .anatomy-card h5 {
      color: var(--color-pop-white);
    }

    .anatomy-card p {
      font-size: 13.5px;
      color: var(--color-text-dark);
      line-height: 1.6;
    }

    /* 4 Pistons correspondence */
    .piston-matrix {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 10px;
    }

    .piston-item {
      background: var(--color-surface-white);
      border-radius: 10px;
      padding: 10px 12px;
      border: 1px solid var(--color-border-subtle);
      text-align: center;
    }
    .piston-item strong {
      display: block;
      font-family: var(--font-heading);
      font-size: 13px;
      color: var(--color-ground-navy);
    }
    body.dark-theme .piston-item strong {
      color: var(--color-accent-lime);
    }
    .piston-item span {
      font-size: 11px;
      color: var(--color-text-muted);
    }

    /* ==========================================================================
       SECCIÓN 3: SISTEMA CROMÁTICO (DESIGN TOKENS DE COLOR)
       ========================================================================== */
    .grid-color-palettes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .color-swatch-card {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      overflow: hidden;
      box-shadow: var(--shadow-diffuse);
      transition: var(--transition-smooth);
    }
    .color-swatch-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .swatch-fill {
      height: 115px;
      position: relative;
      display: flex;
      align-items: flex-end;
      padding: 12px;
    }

    .swatch-body {
      padding: 18px;
    }

    .swatch-role-tag {
      font-size: 10.5px;
      font-weight: 700;
      color: #00B359;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }

    .swatch-title {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 8px;
    }
    body.dark-theme .swatch-title {
      color: var(--color-pop-white);
    }

    .swatch-values {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--color-text-muted);
      font-family: var(--font-mono);
      margin-bottom: 14px;
    }

    .btn-copy-color {
      width: 100%;
      background: var(--color-surface-light);
      border: 1px solid var(--color-border-subtle);
      color: var(--color-text-dark);
      padding: 6px 12px;
      border-radius: var(--radius-xs);
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .btn-copy-color:hover {
      background: var(--color-accent-lime);
      color: var(--color-ground-navy);
      border-color: var(--color-accent-lime);
    }

    .wcag-accessibility-callout {
      background: linear-gradient(135deg, var(--color-ground-navy-dark), var(--color-ground-navy));
      border-radius: var(--radius-panel);
      padding: 28px 36px;
      color: var(--color-pop-white);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
      border: 1px solid var(--color-border-accent);
      box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }

    .wcag-score-badge {
      background: var(--color-accent-lime);
      color: var(--color-ground-navy);
      font-family: var(--font-heading);
      font-size: 24px;
      font-weight: 700;
      padding: 12px 28px;
      border-radius: var(--radius-pill);
      letter-spacing: 1px;
      box-shadow: var(--shadow-neon-glow);
      white-space: nowrap;
    }

    /* ==========================================================================
       SECCIÓN 4: SISTEMA TIPOGRÁFICO
       ========================================================================== */
    .type-specimen-panel {
      background: var(--color-surface-white);
      border-radius: var(--radius-panel);
      border: 1px solid var(--color-border-subtle);
      padding: 32px;
      box-shadow: var(--shadow-diffuse);
      margin-bottom: 24px;
    }

    .type-specimen-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--color-border-subtle);
      padding-bottom: 14px;
      margin-bottom: 20px;
    }

    .type-title-large {
      font-size: 24px;
      font-weight: 700;
      color: var(--color-ground-navy);
    }
    body.dark-theme .type-title-large {
      color: var(--color-pop-white);
    }

    .type-scale-row {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 20px;
      align-items: baseline;
      padding: 16px 0;
      border-bottom: 1px dashed var(--color-border-subtle);
    }
    .type-scale-row:last-child {
      border-bottom: none;
    }

    .type-scale-meta {
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--color-text-muted);
    }

    .live-tester-wrap {
      background: var(--color-surface-light);
      border-radius: var(--radius-card);
      padding: 24px;
      margin-top: 24px;
      border: 1px solid var(--color-border-subtle);
    }

    .live-tester-input {
      width: 100%;
      background: var(--color-surface-white);
      border: 1px solid var(--color-border-subtle);
      padding: 12px 18px;
      border-radius: var(--radius-btn);
      font-family: var(--font-body);
      font-size: 15px;
      color: var(--color-text-dark);
      outline: none;
      transition: var(--transition-smooth);
      margin-bottom: 16px;
    }
    .live-tester-input:focus {
      border-color: var(--color-accent-lime);
      box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.2);
    }

    /* ==========================================================================
       SECCIÓN 5: SISTEMA ICONOGRÁFICO Y ELEMENTOS GRÁFICOS
       ========================================================================== */
    .grid-brand-assets {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .asset-card {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 28px;
      box-shadow: var(--shadow-diffuse);
    }

    .asset-card h4 {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 10px;
    }
    body.dark-theme .asset-card h4 {
      color: var(--color-pop-white);
    }

    .asset-card p {
      font-size: 14px;
      color: var(--color-text-dark);
      line-height: 1.6;
    }

    /* ==========================================================================
       SECCIÓN 6: UI KIT WEB & APP
       ========================================================================== */
    .grid-uikit-components {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 24px;
    }

    .uikit-preview-card {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 26px;
      box-shadow: var(--shadow-diffuse);
    }
    .uikit-preview-card h4 {
      font-family: var(--font-heading);
      font-size: 19px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 8px;
    }
    body.dark-theme .uikit-preview-card h4 {
      color: var(--color-pop-white);
    }

    .btn-vitality-primary {
      background: var(--color-accent-lime);
      color: var(--color-ground-navy);
      border: none;
      padding: 13px 28px;
      border-radius: var(--radius-btn);
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: var(--shadow-neon-glow);
      transition: var(--transition-smooth);
    }
    .btn-vitality-primary:hover {
      background: var(--color-accent-lime-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-neon-hover);
    }

    .btn-vitality-ghost {
      background: transparent;
      color: var(--color-ground-navy);
      border: 1.5px solid var(--color-border-subtle);
      padding: 12px 24px;
      border-radius: var(--radius-btn);
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    body.dark-theme .btn-vitality-ghost {
      color: var(--color-pop-white);
      border-color: rgba(255,255,255,0.2);
    }
    .btn-vitality-ghost:hover {
      border-color: var(--color-accent-lime);
      color: var(--color-accent-lime);
    }

    /* ==========================================================================
       SECCIÓN 7: MAQUETA DE LA APLICACIÓN (MODO CLARO & MODO OSCURO)
       ========================================================================== */
    .app-showcase-wrapper {
      background: var(--color-surface-white);
      border-radius: var(--radius-panel);
      border: 1px solid var(--color-border-subtle);
      padding: 32px;
      box-shadow: var(--shadow-diffuse);
      margin-bottom: 30px;
    }

    /* Controls Bar for App Mockup */
    .app-theme-switcher-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .app-switch-buttons-group {
      display: flex;
      gap: 10px;
    }

    .btn-app-switch {
      background: var(--color-surface-light);
      border: 1px solid var(--color-border-subtle);
      padding: 9px 22px;
      border-radius: var(--radius-btn);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      color: var(--color-text-dark);
      transition: var(--transition-smooth);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn-app-switch.active {
      background: var(--color-ground-navy);
      color: var(--color-accent-lime);
      border-color: var(--color-accent-lime);
      box-shadow: 0 4px 18px rgba(0, 230, 118, 0.28);
    }
    body.dark-theme .btn-app-switch.active {
      background: #071520;
      color: var(--color-accent-lime);
      border-color: var(--color-accent-lime);
    }

    .showcase-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
      font-size: 13px;
      color: var(--color-text-muted);
    }

    .showcase-frame {
      border-radius: var(--radius-card);
      overflow: hidden;
      border: 2px solid var(--color-border-accent);
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      background: #071520;
    }

    .showcase-frame img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.4s ease;
    }
    .showcase-frame:hover img {
      transform: scale(1.008);
    }

    /* Split Frame Comparison */
    .split-comparison-grid {
      display: none;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .split-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .split-label {
      font-family: var(--font-heading);
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .split-col img {
      width: 100%;
      height: auto;
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-accent);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    /* Dark Mode Architecture Cards */
    .dark-mode-specs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 28px;
    }

    .dark-spec-card {
      background: var(--color-surface-light);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 22px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .dark-spec-tag {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 700;
      color: #00B359;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .dark-spec-card h5 {
      font-family: var(--font-heading);
      font-size: 18px;
      font-weight: 700;
      color: var(--color-ground-navy);
    }
    body.dark-theme .dark-spec-card h5 {
      color: var(--color-pop-white);
    }

    .dark-spec-card p {
      font-size: 13.5px;
      color: var(--color-text-dark);
      line-height: 1.6;
    }

    .app-modules-explained {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }

    .module-card {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 24px;
      box-shadow: var(--shadow-diffuse);
      position: relative;
    }
    .module-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      height: 3px;
      background: var(--color-accent-lime);
      border-radius: 0 0 4px 4px;
    }

    .module-card-badge {
      font-family: var(--font-heading);
      font-size: 11px;
      font-weight: 700;
      color: #00B359;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .module-card h4 {
      font-family: var(--font-heading);
      font-size: 19px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 8px;
    }
    body.dark-theme .module-card h4 {
      color: var(--color-pop-white);
    }

    .module-card p {
      font-size: 13px;
      color: var(--color-text-dark);
      line-height: 1.6;
    }

    /* ==========================================================================
       SECCIÓN 8: ESPECIFICACIONES FRONTEND (CSS DESIGN TOKENS)
       ========================================================================== */
    .css-code-container {
      background: #071520;
      border-radius: var(--radius-panel);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      box-shadow: 0 15px 45px rgba(0,0,0,0.5);
    }

    .code-top-bar {
      background: #0F2A3F;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-family: var(--font-mono);
      font-size: 12px;
      color: #CBD5E1;
    }

    .btn-copy-css {
      background: var(--color-accent-lime);
      color: var(--color-ground-navy);
      border: none;
      padding: 6px 14px;
      border-radius: var(--radius-xs);
      font-family: var(--font-body);
      font-size: 11.5px;
      font-weight: 700;
      cursor: pointer;
      transition: var(--transition-smooth);
    }
    .btn-copy-css:hover {
      background: var(--color-accent-lime-hover);
      box-shadow: 0 2px 10px rgba(0, 230, 118, 0.4);
    }

    .css-code-container pre {
      padding: 24px;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 12.5px;
      line-height: 1.7;
      color: #E2E8F0;
    }

    .token-comm { color: #64748B; font-style: italic; }
    .token-var { color: #00E676; }
    .token-val { color: #38BDF8; }

    /* ==========================================================================
       SECCIÓN 9: APLICACIONES DE MARCA (BRAND COLLATERAL)
       ========================================================================== */
    .grid-collateral {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    .collateral-item {
      background: var(--color-surface-white);
      border-radius: var(--radius-card);
      border: 1px solid var(--color-border-subtle);
      padding: 28px;
      box-shadow: var(--shadow-diffuse);
    }
    .collateral-item h4 {
      font-family: var(--font-heading);
      font-size: 20px;
      font-weight: 700;
      color: var(--color-ground-navy);
      margin-bottom: 10px;
    }
    body.dark-theme .collateral-item h4 {
      color: var(--color-pop-white);
    }
    .collateral-item p {
      font-size: 13.5px;
      color: var(--color-text-dark);
      line-height: 1.6;
    }

    /* ==========================================================================
       PIE DE PÁGINA (FOOTER)
       ========================================================================== */
    .manual-footer {
      background: #071520;
      color: #CBD5E1;
      padding: 50px 28px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      font-size: 13px;
    }

    /* Responsive */
    @media (max-width: 960px) {
      .hero-container {
        grid-template-columns: 1fr;
      }
      .charulo-tribute-hero {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .tribute-pillars-grid {
        grid-template-columns: 1fr;
      }
      .nav-links {
        display: none;
      }
      .wcag-accessibility-callout {
        flex-direction: column;
        text-align: center;
      }
      .piston-matrix {
        grid-template-columns: repeat(2, 1fr);
      }
      .split-comparison-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- ==========================================================================
       BARRA DE NAVEGACIÓN SUPERIOR
       ========================================================================== */
  <header class="top-nav">
    <div class="nav-inner">
      <div class="nav-brand" onclick="window.scrollTo({top:0, behavior:'smooth'})">
        <div class="brand-logo-badge">
          <img src="assets/charu_paw_symbol.jpg" alt="La Huella Mecánica">
        </div>
        <div class="brand-title-wrap">
          <div class="brand-title">
            CHARU <span class="sub">motorhub</span>
          </div>
          <div class="brand-subtitle-tag">ASESORÍA AUTOMOTRIZ</div>
        </div>
      </div>

      <nav class="nav-links">
        <a href="#adn-marca">01. ADN Marca</a>
        <a href="#logotipo">02. Logotipo</a>
        <a href="#colores">03. Colores</a>
        <a href="#tipografia">04. Tipografía</a>
        <a href="#brand-assets">05. Iconos</a>
        <a href="#uikit">06. UI Kit</a>
        <a href="#app-showcase">07. App Web &amp; Mobile</a>
        <a href="#dev-tokens">08. Tokens CSS</a>
        <a href="#collateral">09. Aplicaciones</a>
      </nav>

      <div class="nav-actions">
        <button class="theme-toggle-btn" onclick="toggleTheme()">
          <span id="themeIcon">☀️</span> Modo Manual
        </button>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       HERO BANNER
       ========================================================================== */
  <header class="hero-banner">
    <div class="hero-pattern"></div>
    <div class="hero-glow"></div>
    <div class="hero-container">
      <div>
        <div class="badge-vitality">
          <span>⚡</span> VERSIÓN OFICIAL 2.0 • SISTEMA DE IDENTIDAD &amp; UI/UX BIFÁSICO (LIGHT &amp; DARK)
        </div>
        <h1 class="hero-h1">
          URBAN VITALITY &amp; <br>
          <span class="highlight">THE MECHANICAL HUB</span>
        </h1>
        <p class="hero-p">
          Manual Oficial de Identidad Corporativa y Sistema de Diseño UI/UX. La evolución definitiva desde CharuAutos hacia un <strong>ecosistema colaborativo de asesoría automotriz inteligente</strong>, guiado por la lealtad y protección activa del copiloto <strong>Charulo</strong>, sellado por <strong>La Huella Mecánica</strong> e implementado con visión completa diurna (Light) y nocturna (OLED Cockpit Dark).
        </p>
        <div class="hero-quick-meta">
          <span>Versión: <strong>2.0 Oficial</strong></span>
          <span>•</span>
          <span>Concepto: <strong>Urban Vitality</strong></span>
          <span>•</span>
          <span>Modos: <strong>Light &amp; OLED Dark</strong></span>
          <span>•</span>
          <span>Accesibilidad: <strong>WCAG 2.1 AAA (Ratio 7.4:1 / 12.1:1)</strong></span>
        </div>
      </div>

      <div class="hero-card-tribute">
        <div class="hero-tribute-banner">
          <img class="hero-charulo-thumb" src="assets/charulo_personaje_animado_comic.jpg" alt="Charulo Mech-Dog">
          <div class="hero-tribute-text">
            <h3>CHARULO: EL COPILOTO LEAL</h3>
            <p>Mascota heráldica y alma protectora: el amigo experto que cuida tus espaldas en cada decisión técnica y comercial.</p>
          </div>
        </div>

        <div class="hero-logo-showcase-box">
          <div style="font-size: 11px; font-weight: 700; color: #00E676; letter-spacing: 1.5px; text-transform: uppercase;">
            IMAGOTIPO OFICIAL • LA HUELLA MECÁNICA
          </div>
          <img class="hero-logo-img" src="assets/charu_logo_lockup.jpg" alt="Logotipo Oficial Charu motorhub">
          <div style="font-size: 11px; color: #94A3B8;">
            4 Pistones Radiales (Módulos) + Corona Dentada Central (Hub)
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- ==========================================================================
       MAIN CONTENT
       ========================================================================== */
  <main class="main-wrapper">

    <!-- SECCIÓN 1: ESTRATEGIA Y ADN DE MARCA -->
    <section id="adn-marca" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 01</div>
          <h2 class="section-title">Estrategia y ADN de Marca</h2>
          <p class="section-desc">Origen, transición del modelo de negocio, el homenaje central a Charulo y los pilares de la personalidad de marca.</p>
        </div>
      </div>

      <!-- El Homenaje a Charulo -->
      <div class="charulo-tribute-hero">
        <div class="charulo-portrait-wrap">
          <img class="charulo-portrait-img" src="assets/charulo_personaje_animado_comic.jpg" alt="Charulo Mech-Dog Copiloto">
          <div class="charulo-badge-pill">CHARULO • MECH-DOG</div>
        </div>
        <div class="charulo-narrative">
          <div style="font-size: 11px; font-weight: 700; color: #00B359; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;">
            1.2. EL ALMA DE LA MARCA
          </div>
          <h3>El Homenaje a Charulo (El Copiloto Leal)</h3>
          <p>
            El nombre y la mística de la compañía nacen de <strong>Charulo</strong>, la mascota familiar que encarna el espíritu del <strong>copiloto leal</strong>. Inspirado en la narrativa gráfica original (el perro mecánico con gafas de aviador y arnés técnico de exploración), Charulo humaniza la ingeniería automotriz y protege al conductor en cada decisión:
          </p>
          <div class="tribute-pillars-grid">
            <div class="pillar-box">
              <strong>🛡️ Protección Activa</strong>
              <span>El copiloto que cuida tus espaldas y evita que caigas en estafas o compres un auto con fallas ocultas.</span>
            </div>
            <div class="pillar-box">
              <strong>🤝 Lealtad Incondicional</strong>
              <span>La asesoría no responde a comisiones de concesionarios, sino al interés honesto y absoluto del cliente.</span>
            </div>
            <div class="pillar-box">
              <strong>🔧 Pasión por los Fierros</strong>
              <span>La curiosidad técnica de meterse bajo el capó para entender cómo funciona cada componente.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid-strategy-cards">
        <div class="strategy-card">
          <h4>1.1. De CharuAutos a Charu motorhub</h4>
          <p>
            La antigua denominación <em>CharuAutos</em> sugería un catálogo estático de compraventa. La nueva identidad, <strong>Charu motorhub</strong>, redefine el negocio como un <strong>ecosistema colaborativo de asesoría automotriz inteligente</strong>. El término <em>Hub</em> sitúa a la plataforma como el centro neurálgico donde convergen conductores, mecánicos certificados y peritos.
          </p>
        </div>

        <div class="strategy-card">
          <h4>1.3. Propósito, Misión y Visión</h4>
          <p>
            <strong>Propósito:</strong> Desmitificar el mundo automotriz para que cualquier persona tome decisiones con total seguridad.<br>
            <strong>Misión:</strong> Brindar asesoría, peritaje y acompañamiento técnico a través de una plataforma digital ágil, empática y rigurosa.<br>
            <strong>Visión:</strong> Ser el referente líder nacional en asesoría y certificación vehicular independiente.
          </p>
        </div>

        <div class="strategy-card">
          <h4>1.4. Personalidad y Tono de Voz</h4>
          <p>
            <strong>El Amigo Experto:</strong> Hablamos de tú a tú; traducimos códigos OBD-II complejos a lenguaje comprensible.<br>
            <strong>Ágil y Directo:</strong> Cero burocracia ni rodeos eternos; vamos directo al diagnóstico del vehículo.<br>
            <strong>Optimista y Energético:</strong> Cuidar o comprar un auto debe ser una experiencia estimulante, no un dolor de cabeza.
          </p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2: SISTEMA DE IDENTIFICADORES VISUALES (EL LOGOTIPO) -->
    <section id="logotipo" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 02</div>
          <h2 class="section-title">Sistema de Identificadores Visuales (El Logotipo Oficial)</h2>
          <p class="section-desc">Imagotipo definitivo: anatomía de La Huella Mecánica (The Mechanical Paw), lockup tipográfico, retícula y versiones oficiales.</p>
        </div>
      </div>

      <!-- Tablero Oficial del Logo (Brandboard) -->
      <div class="logo-hero-board">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 22px; color: var(--color-ground-navy);">Tablero Oficial de Marca (The Mechanical Hub Board)</h3>
            <p style="font-size: 13px; color: var(--color-text-muted);">Composición gráfica maestra de alta resolución (2752×1536 px) integrando imagotipo, escalas mínimas y tokens cromáticos.</p>
          </div>
          <a href="assets/Charu_motorhub_logo.jpg" target="_blank" style="font-size: 12px; font-weight: 700; color: #00B359; display: flex; align-items: center; gap: 6px;">
            🔍 Ver Arte Original Full-Res (2752×1536) ↗
          </a>
        </div>

        <div class="brandboard-frame">
          <a href="assets/Charu_motorhub_logo.jpg" target="_blank">
            <img class="brandboard-img" src="assets/Charu_motorhub_logo.jpg" alt="Tablero Oficial de Identidad Charu motorhub">
          </a>
          <div class="brandboard-badge-bar">
            <span><strong>ISOTIPO:</strong> La Huella Mecánica (4 Pistones + Corona Central)</span>
            <span><strong>TIPOGRAFÍA:</strong> CHARU motorhub • ASESORÍA AUTOMOTRIZ</span>
            <span><strong>COLORES:</strong> #FFFFFF • #00E676 • #13334C</span>
          </div>
        </div>
      </div>

      <!-- Selector Interactivo de Variantes -->
      <div class="logo-interactive-container">
        <div class="logo-switcher-bar">
          <button class="btn-logo-switch active" onclick="switchLogo('dark')">🌙 Versión Dark Theme (Principal)</button>
          <button class="btn-logo-switch" onclick="switchLogo('light')">☀️ Versión Light Theme</button>
          <button class="btn-logo-switch" onclick="switchLogo('mono')">⚪ Versión Monocromática (Peritaje)</button>
        </div>

        <div class="logo-stage-display dark-stage" id="mainLogoStage">
          <div class="rendered-logo-lockup" id="logoLockup">
            <img class="stage-logo-crop" id="stageLogoImg" src="assets/charu_logo_lockup.jpg" alt="Logo Render">
          </div>
        </div>

        <!-- Anatomía y Simbolismo Exhaustivo -->
        <div class="anatomy-cards-grid">
          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.1. ANATOMÍA DEL ISOTIPO</div>
            <h5>La Huella Mecánica (The Mechanical Paw)</h5>
            <p>
              Fusión gráfica de la huella leal de <strong>Charulo</strong> con la ingeniería del tren motriz. La huella orgánica se compone de una almohadilla plantar central y 4 dedos radiales materializados como componentes mecánicos.
            </p>
          </div>

          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.1.1. LOS 4 PISTONES RADIALES</div>
            <h5>Los 4 Módulos de la Plataforma</h5>
            <p>
              Cada pistón radial representa uno de los cuatro pilares tecnológicos de Charu motorhub, equipados con aros de compresión y pasador de biela en Verde Neón (<code>#00E676</code>):
            </p>
            <div class="piston-matrix">
              <div class="piston-item">
                <strong>Pistón 1</strong>
                <span>Recomendador de Compra</span>
              </div>
              <div class="piston-item">
                <strong>Pistón 2</strong>
                <span>Diagnóstico OBD-II</span>
              </div>
              <div class="piston-item">
                <strong>Pistón 3</strong>
                <span>Comparador Técnico PDF</span>
              </div>
              <div class="piston-item">
                <strong>Pistón 4</strong>
                <span>Bitácora de Rendimiento</span>
              </div>
            </div>
          </div>

          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.1.2. ENGRANAJE CENTRAL (HUB COG)</div>
            <h5>El Centro de Articulación Técnica</h5>
            <p>
              La corona dentada central de 12 dientes simboliza el <strong>Hub</strong>: el punto neurálgico donde engranan de forma armónica los usuarios, los talleres certificados y los inspectores periciales.
            </p>
          </div>

          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.1.3. DOBLE CONTORNO LUMINISCENTE</div>
            <h5>Delineado Estructural &amp; Sombra Neón</h5>
            <p>
              El isotipo emplea una línea exterior blanca de alta visibilidad acompañada de un desfase dinámico inferior en <strong>Verde Neón (<code>#00E676</code>)</strong> que genera un efecto de resplandor y tridimensionalidad sobre asfalto.
            </p>
          </div>

          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.2. ARQUITECTURA TIPOGRÁFICA</div>
            <h5>Lockup Jerárquico Oficial</h5>
            <p>
              <strong>CHARU:</strong> Caja alta geométrica, Bold 700 en blanco puro.<br>
              <strong>motorhub:</strong> Caja baja geométrica, Regular 400 en blanco / verde neón.<br>
              <strong>ASESORÍA AUTOMOTRIZ:</strong> Descriptor con tracking amplio (<code>0.35em</code>).
            </p>
          </div>

          <div class="anatomy-card">
            <div class="anatomy-card-tag">2.4. DIMENSIONES MÍNIMAS</div>
            <h5>Escalas de Reproducción Garantizadas</h5>
            <p>
              <strong>Digital:</strong> 120 px ancho para el lockup horizontal; 32 px para el isotipo aislado (favicon / app bar).<br>
              <strong>Impresión:</strong> 35 mm de ancho para papelería; 12 mm para cuños y sellos de peritaje.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3: SISTEMA CROMÁTICO -->
    <section id="colores" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 03</div>
          <h2 class="section-title">Sistema Cromático (Design Tokens de Color)</h2>
          <p class="section-desc">Paleta canónica de alto contraste automotriz, combinando la solidez de Deep Navy con la vitalidad disruptiva de Neon Lime Green en entornos diurnos y nocturnos.</p>
        </div>
      </div>

      <div class="grid-color-palettes">
        <!-- Deep Navy -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #13334C;">
            <span style="color: #FFF; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.35); padding: 2px 8px; border-radius: 4px;">GROUND</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">PRIMARIO / FONDO DIURNO</div>
            <div class="swatch-title">Deep Navy</div>
            <div class="swatch-values">
              <span>HEX: <strong>#13334C</strong></span>
              <span>RGB: 19, 51, 76</span>
              <span>HSL: 206°, 60%, 19%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#13334C', this)">📋 Copiar HEX</button>
          </div>
        </div>

        <!-- Cockpit Black / Ground Navy Dark -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #071520;">
            <span style="color: #00E676; font-size: 10px; font-weight: 700; background: rgba(0,230,118,0.2); padding: 2px 8px; border-radius: 4px;">OLED DARK</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">CANVAS MODO OSCURO</div>
            <div class="swatch-title">Cockpit Navy Dark</div>
            <div class="swatch-values">
              <span>HEX: <strong>#071520</strong></span>
              <span>RGB: 7, 21, 32</span>
              <span>HSL: 206°, 64%, 8%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#071520', this)">📋 Copiar HEX</button>
          </div>
        </div>

        <!-- Neon Lime Green -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #00E676;">
            <span style="color: #13334C; font-size: 10px; font-weight: 800; background: rgba(255,255,255,0.4); padding: 2px 8px; border-radius: 4px;">ACCENT</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">ACENTO VITAL</div>
            <div class="swatch-title">Neon Lime</div>
            <div class="swatch-values">
              <span>HEX: <strong>#00E676</strong></span>
              <span>RGB: 0, 230, 118</span>
              <span>HSL: 151°, 100%, 45%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#00E676', this)">📋 Copiar HEX</button>
          </div>
        </div>

        <!-- Bright White -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #FFFFFF; box-shadow: inset 0 0 0 1px #E2E8F0;">
            <span style="color: #333; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.06); padding: 2px 8px; border-radius: 4px;">POP</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">ALTO CONTRASTE</div>
            <div class="swatch-title">Bright White</div>
            <div class="swatch-values">
              <span>HEX: <strong>#FFFFFF</strong></span>
              <span>RGB: 255, 255, 255</span>
              <span>HSL: 0°, 0%, 100%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#FFFFFF', this)">📋 Copiar HEX</button>
          </div>
        </div>

        <!-- Mid Navy Surface -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #0F2A3F;">
            <span style="color: #FFF; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 4px;">DARK CARD</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">SUPERFICIE OSCURA</div>
            <div class="swatch-title">Mid Navy Card</div>
            <div class="swatch-values">
              <span>HEX: <strong>#0F2A3F</strong></span>
              <span>RGB: 15, 42, 63</span>
              <span>HSL: 206°, 62%, 15%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#0F2A3F', this)">📋 Copiar HEX</button>
          </div>
        </div>

        <!-- Urban Mist -->
        <div class="color-swatch-card">
          <div class="swatch-fill" style="background: #F4F6F9; box-shadow: inset 0 0 0 1px #E2E8F0;">
            <span style="color: #333; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.06); padding: 2px 8px; border-radius: 4px;">SURFACE</span>
          </div>
          <div class="swatch-body">
            <div class="swatch-role-tag">SUPERFICIE CLARA</div>
            <div class="swatch-title">Urban Mist</div>
            <div class="swatch-values">
              <span>HEX: <strong>#F4F6F9</strong></span>
              <span>RGB: 244, 246, 249</span>
              <span>HSL: 216°, 33%, 97%</span>
            </div>
            <button class="btn-copy-color" onclick="copyHex('#F4F6F9', this)">📋 Copiar HEX</button>
          </div>
        </div>
      </div>

      <div class="wcag-accessibility-callout">
        <div>
          <div style="font-family: var(--font-heading); font-size: 21px; font-weight: 700; margin-bottom: 4px;">
            3.3. Certificación de Contraste y Accesibilidad (WCAG 2.1 AAA)
          </div>
          <p style="font-size: 14px; color: #CBD5E1; max-width: 740px; line-height: 1.6;">
            • En <strong>Modo Diurno</strong>, la relación entre <strong>#00E676</strong> y <strong>#13334C</strong> es de <strong>7.4:1</strong> (Certificación AAA).<br>
            • En <strong>Modo Oscuro OLED</strong>, la relación entre <strong>#00E676</strong> y el fondo <strong>#071520</strong> se eleva hasta <strong>12.1:1</strong>, garantizando legibilidad instantánea sin fatiga ocular en condiciones de conducción nocturna en cabina.
          </p>
        </div>
        <div class="wcag-score-badge">
          RATIO HASTA 12.1:1 (AAA)
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4: SISTEMA TIPOGRÁFICO -->
    <section id="tipografia" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 04</div>
          <h2 class="section-title">Sistema Tipográfico</h2>
          <p class="section-desc">Jerarquía tripartita: Oswald (Titulares y Métricas), Poppins (Lectura y UI) y JetBrains Mono (Datos Técnicos y OBD-II).</p>
        </div>
      </div>

      <div class="type-specimen-panel">
        <div class="type-specimen-top">
          <div class="type-title-large" style="font-family:'Oswald',sans-serif;">4.1. Oswald — Titulares &amp; Señalética de Gran Impacto</div>
          <span style="font-size:11px; font-weight:700; background:var(--color-surface-light); padding:4px 12px; border-radius:999px; color:var(--color-text-muted);">Bold 700 / SemiBold 600</span>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">H1 Hero<br>40px / Bold 700</div>
          <div style="font-family:'Oswald',sans-serif; font-size:38px; font-weight:700; color:var(--color-ground-navy); line-height:1.15;">
            ASESORÍA AUTOMOTRIZ ACCESIBLE Y DINÁMICA
          </div>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">H2 Sección<br>28px / Bold 700</div>
          <div style="font-family:'Oswald',sans-serif; font-size:28px; font-weight:700; color:var(--color-ground-navy); line-height:1.2;">
            Inspección Electrónica OBD-II en Tiempo Real
          </div>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">H3 Tarjetas<br>20px / SemiBold 600</div>
          <div style="font-family:'Oswald',sans-serif; font-size:20px; font-weight:600; color:var(--color-ground-navy); line-height:1.3;">
            Toyota Corolla Cross Hybrid • 98.5% Match Urbano
          </div>
        </div>
      </div>

      <div class="type-specimen-panel">
        <div class="type-specimen-top">
          <div class="type-title-large" style="font-family:'Poppins',sans-serif;">4.2. Poppins — Cuerpo de Texto, Formularios &amp; UI</div>
          <span style="font-size:11px; font-weight:700; background:var(--color-surface-light); padding:4px 12px; border-radius:999px; color:var(--color-text-muted);">Regular 400 / Medium 500 / SemiBold 600</span>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">Subtítulo<br>16px / Medium 500</div>
          <div style="font-family:'Poppins',sans-serif; font-size:16px; font-weight:500; color:var(--color-text-dark);">
            La plataforma inteligente donde conductores y mecánicos certificados toman decisiones informadas.
          </div>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">Párrafo UI<br>14px / Regular 400</div>
          <div style="font-family:'Poppins',sans-serif; font-size:14px; font-weight:400; color:var(--color-text-dark); line-height:1.65;">
            Tu vehículo ha superado las pruebas dinámicas de emisiones y suspensión sin registrar anomalías en los sensores de inyección electrónica.
          </div>
        </div>
      </div>

      <div class="type-specimen-panel">
        <div class="type-specimen-top">
          <div class="type-title-large" style="font-family:'JetBrains Mono',monospace;">4.3. JetBrains Mono — Datos Técnicos, Telemetría &amp; OBD-II</div>
          <span style="font-size:11px; font-weight:700; background:var(--color-surface-light); padding:4px 12px; border-radius:999px; color:var(--color-text-muted);">Regular 400 / Bold 700</span>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">Código DTC<br>13px / Bold 700</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:700; color:#00B359;">
            DTC_STATUS: P0000 // ZERO FAULT CODES DETECTED // CAN_BUS: NOMINAL
          </div>
        </div>
        <div class="type-scale-row">
          <div class="type-scale-meta">Telemetría<br>12px / Regular 400</div>
          <div style="font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:400; color:var(--color-text-muted);">
            VIN: 9BRBL30E8HP • ENGINE: M20A-FXS 2.0L 16V DOHC • BATTERY: 201.6V Ni-MH
          </div>
        </div>
      </div>

      <!-- Probador Tipográfico en Vivo -->
      <div class="live-tester-wrap">
        <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--color-ground-navy);">
          ⌨️ Probador Tipográfico Interactivo
        </div>
        <input class="live-tester-input" type="text" placeholder="Escribe aquí para probar la tipografía en tiempo real..." oninput="testType(this.value)">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div id="outOswald" style="font-family:'Oswald',sans-serif; font-size:26px; font-weight:700; color:var(--color-ground-navy);">
            Charu motorhub • Asesoría Automotriz
          </div>
          <div id="outPoppins" style="font-family:'Poppins',sans-serif; font-size:15px; color:var(--color-text-dark);">
            Charu motorhub • Asesoría Automotriz
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5: SISTEMA ICONOGRÁFICO Y ELEMENTOS GRÁFICOS -->
    <section id="brand-assets" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 05</div>
          <h2 class="section-title">Sistema Iconográfico y Elementos Gráficos</h2>
          <p class="section-desc">Líneas de 2.5px con extremos redondeados, patrones de señalética vial y dirección de fotografía urbana.</p>
        </div>
      </div>

      <div class="grid-brand-assets">
        <div class="asset-card">
          <h4>5.1. Reglas de Construcción Iconográfica</h4>
          <p>
            Iconos diseñados sobre una retícula de 24×24px con un grosor de trazo uniforme de <strong>2.5px</strong> y terminaciones redondeadas (<em>Round Caps</em>). Se emplean en duotono (Deep Navy + Neon Lime Green).
          </p>
          <div style="display: flex; gap: 16px; margin-top: 16px; font-size: 26px;">
            <span>🧭</span><span>🔍</span><span>⚡</span><span>🛡️</span><span>📊</span><span>🚗</span>
          </div>
        </div>

        <div class="asset-card">
          <h4>5.2. Patrones Viales Secundarios</h4>
          <p>
            Líneas viales diagonales discontinuas a 45° con baja opacidad (5% a 10%), evocando el ritmo y la fluidez del asfalto contemporáneo y la trama cartográfica urbana visible en el isotipo.
          </p>
          <div style="height: 48px; background: repeating-linear-gradient(-45deg, rgba(0, 230, 118, 0.2), rgba(0, 230, 118, 0.2) 14px, transparent 14px, transparent 28px); border-radius: 8px; margin-top: 14px; border: 1px solid var(--color-border-subtle);"></div>
        </div>

        <div class="asset-card">
          <h4>5.3. Dirección de Fotografía</h4>
          <p>
            Entornos urbanos limpios, iluminación diurna nítida o nocturna con reflejos de neón y luminarias públicas azuladas/verdosas. Sujetos con expresiones de tranquilidad y confianza técnica.
          </p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 6: UI KIT WEB & APP -->
    <section id="uikit" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 06</div>
          <h2 class="section-title">Sistema de Diseño Digital (UI Kit Web &amp; App)</h2>
          <p class="section-desc">Tarjetas de asesoría, botones con resplandor neón, semáforos amigables de peritaje y geometría táctil.</p>
        </div>
      </div>

      <div class="grid-uikit-components">
        <!-- Botones -->
        <div class="uikit-preview-card">
          <h4>6.2. Botones &amp; Jerarquía de Interacción</h4>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 16px;">
            El botón primario <em>Vitality Action</em> utiliza <code>#00E676</code> con texto en <code>#13334C</code> (o <code>#071520</code> en Dark Mode) y resplandor neón difuso.
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
            <button class="btn-vitality-primary">
              <span>⚡</span> Acción Vitality (CTA)
            </button>
            <button class="btn-vitality-ghost">
              Acción Secundaria
            </button>
          </div>
        </div>

        <!-- Radios & Geometría -->
        <div class="uikit-preview-card">
          <h4>6.1. Radios de Curvatura &amp; Elevación</h4>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 14px;">
            Curvaturas suaves que transmiten modernidad táctil y amabilidad visual.
          </p>
          <div style="display: flex; gap: 12px;">
            <div style="flex:1; background:var(--color-surface-light); padding:12px; border-radius:16px; border:1px solid var(--color-border-subtle); text-align:center; font-size:12px; font-weight:600;">
              Radius: 16px<br><small style="color:#64748B;">Tarjetas &amp; Módulos</small>
            </div>
            <div style="flex:1; background:var(--color-surface-light); padding:12px; border-radius:999px; border:1px solid var(--color-border-subtle); text-align:center; font-size:12px; font-weight:600; display:flex; align-items:center; justify-content:center;">
              Pill: 999px
            </div>
          </div>
        </div>

        <!-- Semáforo OBD-II -->
        <div class="uikit-preview-card">
          <h4>6.3. Badges y Estados de Peritaje</h4>
          <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 12px;">
            Semáforos amigables que comunican la salud motriz sin generar ansiedad al conductor.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#00B359; background:rgba(0,230,118,0.12); padding:6px 12px; border-radius:8px;">
              <span style="width:8px; height:8px; border-radius:50%; background:#00E676;"></span>
              SISTEMA NOMINAL // CERO FALLAS
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#D97706; background:rgba(217,119,6,0.12); padding:6px 12px; border-radius:8px;">
              <span style="width:8px; height:8px; border-radius:50%; background:#F59E0B;"></span>
              ATENCIÓN PREVENTIVA // REVISIÓN LEVE
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#DC2626; background:rgba(220,38,38,0.12); padding:6px 12px; border-radius:8px;">
              <span style="width:8px; height:8px; border-radius:50%; background:#DC2626;"></span>
              REVISIÓN URGENTE EN TALLER ALIADO
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 7: MAQUETA DE LA APLICACIÓN (LIGHT & DARK MODE SHOWCASE) -->
    <section id="app-showcase" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 07</div>
          <h2 class="section-title">Maqueta de la Aplicación en Producción (Modo Claro &amp; Modo Oscuro)</h2>
          <p class="section-desc">Renders fotográficos de alta resolución (1920×1080) demostrando la materialización del sistema Urban Vitality y La Huella Mecánica en versión Diurna y Cockpit Nocturno.</p>
        </div>
      </div>

      <div class="app-showcase-wrapper">
        <!-- Switcher de Modo de la Aplicación -->
        <div class="app-theme-switcher-bar">
          <div class="app-switch-buttons-group">
            <button class="btn-app-switch active" onclick="switchAppTheme('light')">
              <span>☀️</span> Modo Claro (Urban Light)
            </button>
            <button class="btn-app-switch" onclick="switchAppTheme('dark')">
              <span>🌙</span> Modo Oscuro (Cockpit OLED)
            </button>
            <button class="btn-app-switch" onclick="switchAppTheme('split')">
              <span>🌗</span> Comparativa Simultánea
            </button>
          </div>

          <div style="display: flex; gap: 14px; font-size: 12px; font-weight: 700;">
            <a id="linkLightDownload" href="assets/app_urban_vitality_light.jpg" target="_blank" style="color:#00B359; display:flex; align-items:center; gap:5px;">
              ☀️ Abrir Light Full-Res (1920×1080) ↗
            </a>
            <span style="color:#94A3B8;">|</span>
            <a id="linkDarkDownload" href="assets/app_urban_vitality_dark.jpg" target="_blank" style="color:#00E676; display:flex; align-items:center; gap:5px;">
              🌙 Abrir Dark Full-Res (1920×1080) ↗
            </a>
          </div>
        </div>

        <div class="showcase-header-bar">
          <div id="appModeTitleText" style="display: flex; align-items: center; gap: 8px;">
            <span style="color:#00E676;">●</span>
            <strong>CHARU MOTORHUB APP:</strong> Modo Claro (Urban Light) — Desktop Web App (1260px) &amp; Smartphone App (440px)
          </div>
          <span style="font-size: 11.5px; color: #94A3B8;">Resolución Render: 1920×1080 px UHD</span>
        </div>

        <!-- Frame Individual (Light o Dark) -->
        <div class="showcase-frame" id="appMockupFrameSingle">
          <img id="appMockupImg" src="assets/app_urban_vitality_light.jpg" alt="Maqueta de la App Charu motorhub Urban Vitality" title="Haz clic en los botones superiores para alternar entre Modo Claro y Modo Oscuro">
        </div>

        <!-- Frame Comparativo Lado a Lado (Split) -->
        <div class="split-comparison-grid" id="appMockupFrameSplit">
          <div class="split-col">
            <div class="split-label" style="color: var(--color-ground-navy);">
              <span>☀️</span> VISIÓN MODO CLARO (DIURNO / URBAN LIGHT)
            </div>
            <a href="assets/app_urban_vitality_light.jpg" target="_blank">
              <img src="assets/app_urban_vitality_light.jpg" alt="Modo Claro App">
            </a>
          </div>
          <div class="split-col">
            <div class="split-label" style="color: #00E676;">
              <span>🌙</span> VISIÓN MODO OSCURO (NOCTURNO / COCKPIT OLED)
            </div>
            <a href="assets/app_urban_vitality_dark.jpg" target="_blank">
              <img src="assets/app_urban_vitality_dark.jpg" alt="Modo Oscuro App">
            </a>
          </div>
        </div>

        <!-- 7.2. Principios de Diseño en Modo Oscuro (OLED Cockpit Ergonomics) -->
        <div class="dark-mode-specs-grid">
          <div class="dark-spec-card">
            <div class="dark-spec-tag">7.2. ERGONOMÍA EN CABINA</div>
            <h5>Conducción Nocturna Sin Fatiga</h5>
            <p>
              El modo oscuro está diseñado para condiciones lumínicas críticas de cabina vehicular o talleres nocturnos. Los fondos <code>#071520</code> eliminan el deslumbramiento y reducen la emisión de luz azul, protegiendo la agudeza visual del conductor.
            </p>
          </div>

          <div class="dark-spec-card">
            <div class="dark-spec-tag">7.2. EFICIENCIA ENERGÉTICA</div>
            <h5>Ahorro de Batería OLED (Hasta -42%)</h5>
            <p>
              En smartphones con paneles AMOLED/OLED, los negros profundos apagan físicamente los píxeles durante sesiones continuas de diagnóstico en tiempo real con el escáner Bluetooth OBD-II, maximizando la autonomía en ruta.
            </p>
          </div>

          <div class="dark-spec-card">
            <div class="dark-spec-tag">7.2. JERARQUÍA DE ELEVACIÓN</div>
            <h5>Capas de Profundidad (Elevation Tokens)</h5>
            <p>
              <strong>Nivel 0 (Canvas):</strong> <code>#071520</code><br>
              <strong>Nivel 1 (Superficies/Cards):</strong> <code>#0F2A3F</code><br>
              <strong>Nivel 2 (Modales/Elevados):</strong> <code>#13334C</code><br>
              <strong>Acentos Luminiscentes:</strong> <code>#00E676</code> con resplandor neón difuso (Glow).
            </p>
          </div>
        </div>
      </div>

      <!-- Desglose de los 4 módulos funcionales conectados a los 4 pistones -->
      <div class="app-modules-explained">
        <div class="module-card">
          <div class="module-card-badge">PISTÓN 01 • MÓDULO 01</div>
          <h4>Recomendador Predictivo</h4>
          <p>
            Asesoría inteligente de compra guiada por el Copiloto Charulo. Tarjeta de vehículo sugerido (Toyota Corolla Cross Hybrid 2.0L) con consumo urbano de 4.8 L/100km y <strong>98.5% Match de Perfil</strong>.
          </p>
        </div>

        <div class="module-card">
          <div class="module-card-badge">PISTÓN 02 • MÓDULO 02</div>
          <h4>Diagnóstico OBD-II Amigable</h4>
          <p>
            Monitoreo en vivo de 38 sensores del motor traducido a lenguaje reconfortante: <em>"Sistema en Óptimo Estado // Cero Códigos de Falla"</em>, eliminando el estrés mecánico tradicional.
          </p>
        </div>

        <div class="module-card">
          <div class="module-card-badge">PISTÓN 03 • MÓDULO 03</div>
          <h4>Comparador Técnico &amp; PDF</h4>
          <p>
            Zona interactiva <em>Drag &amp; Drop</em> con marco punteado en verde lima neón para extracción instantánea de fichas técnicas en PDF, contrastando torque, potencia y garantía lado a lado.
          </p>
        </div>

        <div class="module-card">
          <div class="module-card-badge">PISTÓN 04 • MÓDULO 04</div>
          <h4>Bitácora Urbana &amp; Ahorro</h4>
          <p>
            Registro de rendimiento y gastos que traduce los kilómetros a dinero real: <strong>+$64.20 USD ahorrados este mes</strong> (+18% de eficiencia) con barra de vida útil de servicios en gradiente institucional.
          </p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 8: ESPECIFICACIONES FRONTEND (CSS DESIGN TOKENS) -->
    <section id="dev-tokens" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 08</div>
          <h2 class="section-title">Especificaciones Frontend (CSS Design Tokens)</h2>
          <p class="section-desc">Conjunto de variables CSS listas para ser importadas en cualquier arquitectura web moderna (React, Vue, Tailwind o CSS nativo), incluyendo la especificación completa bifásica Light &amp; Dark Mode.</p>
        </div>
      </div>

      <div class="css-code-container">
        <div class="code-top-bar">
          <span>📁 src/styles/theme-urban-vitality-v2.css (Light &amp; Dark Tokens)</span>
          <button class="btn-copy-css" onclick="copyCssTokens(this)">📋 Copiar Tokens CSS</button>
        </div>
        <pre><code id="cssTokensBlock"><span class="token-comm">/* ==========================================================================
   CHARU MOTORHUB — URBAN VITALITY & THE MECHANICAL HUB
   Official Design Tokens Specification (Version 2.0 — Dual Light & Dark)
   ========================================================================== */</span>

<span class="token-comm">/* 1. Tokens Base & Modo Claro (Default / Urban Light) */</span>
<span class="token-var">:root</span> {
  <span class="token-comm">/* Paleta Cromática Canónica */</span>
  <span class="token-var">--color-ground-navy:</span> <span class="token-val">#13334C</span>;         <span class="token-comm">/* Azul primario, barras de navegación */</span>
  <span class="token-var">--color-ground-navy-dark:</span> <span class="token-val">#071520</span>;    <span class="token-comm">/* Fondo ultra oscuro de consola */</span>
  <span class="token-var">--color-ground-navy-mid:</span> <span class="token-val">#0F2A3F</span>;     <span class="token-comm">/* Superficie intermedia */</span>
  <span class="token-var">--color-accent-lime:</span> <span class="token-val">#00E676</span>;         <span class="token-comm">/* Acento vital, CTAs principales */</span>
  <span class="token-var">--color-accent-lime-hover:</span> <span class="token-val">#00FF83</span>;   <span class="token-comm">/* Estado hover luminoso */</span>
  <span class="token-var">--color-pop-white:</span> <span class="token-val">#FFFFFF</span>;           <span class="token-comm">/* Alto contraste, titulares y tarjetas */</span>
  <span class="token-var">--color-text-primary:</span> <span class="token-val">#1E293B</span>;        <span class="token-comm">/* Lectura prolongada sin fatiga */</span>
  <span class="token-var">--color-text-muted:</span> <span class="token-val">#64748B</span>;          <span class="token-comm">/* Texto secundario y soporte */</span>
  <span class="token-var">--color-surface-light:</span> <span class="token-val">#F4F6F9</span>;       <span class="token-comm">/* Fondo general diurno (Urban Mist) */</span>
  <span class="token-var">--color-surface-card:</span> <span class="token-val">#FFFFFF</span>;        <span class="token-comm">/* Tarjetas diurnas */</span>

  <span class="token-comm">/* Jerarquía Tipográfica */</span>
  <span class="token-var">--font-heading:</span> <span class="token-val">'Oswald', sans-serif</span>;
  <span class="token-var">--font-body:</span> <span class="token-val">'Poppins', sans-serif</span>;
  <span class="token-var">--font-mono:</span> <span class="token-val">'JetBrains Mono', monospace</span>;

  <span class="token-comm">/* Radios & Geometría */</span>
  <span class="token-var">--radius-card:</span> <span class="token-val">16px</span>;
  <span class="token-var">--radius-panel:</span> <span class="token-val">24px</span>;
  <span class="token-var">--radius-btn:</span> <span class="token-val">12px</span>;
  <span class="token-var">--radius-pill:</span> <span class="token-val">999px</span>;

  <span class="token-comm">/* Sombras */</span>
  <span class="token-var">--shadow-diffuse:</span> <span class="token-val">0 10px 30px rgba(19, 51, 76, 0.08)</span>;
  <span class="token-var">--shadow-neon-glow:</span> <span class="token-val">0 8px 25px rgba(0, 230, 118, 0.35)</span>;
}

<span class="token-comm">/* 2. Tokens Modo Oscuro (Cockpit OLED / Night Vitality) */</span>
<span class="token-var">[data-theme="dark"], body.dark-theme</span> {
  <span class="token-var">--color-surface-light:</span> <span class="token-val">#071520</span>;       <span class="token-comm">/* Canvas OLED profundo (negro azulado) */</span>
  <span class="token-var">--color-surface-card:</span> <span class="token-val">#0F2A3F</span>;        <span class="token-comm">/* Tarjetas oscuras con profundidad */</span>
  <span class="token-var">--color-surface-elevated:</span> <span class="token-val">#13334C</span>;    <span class="token-comm">/* Modales y elementos elevados */</span>
  <span class="token-var">--color-text-primary:</span> <span class="token-val">#F8FAFC</span>;        <span class="token-comm">/* Lectura brillante en fondo oscuro */</span>
  <span class="token-var">--color-text-muted:</span> <span class="token-val">#94A3B8</span>;          <span class="token-comm">/* Soporte balanceado */</span>
  <span class="token-var">--color-border-subtle:</span> <span class="token-val">rgba(255, 255, 255, 0.08)</span>;
  <span class="token-var">--color-border-accent:</span> <span class="token-val">rgba(0, 230, 118, 0.4)</span>;
  <span class="token-var">--shadow-diffuse:</span> <span class="token-val">0 15px 45px rgba(0, 0, 0, 0.6)</span>;
  <span class="token-var">--shadow-neon-glow:</span> <span class="token-val">0 0 25px rgba(0, 230, 118, 0.5)</span>;
}</code></pre>
      </div>
    </section>

    <!-- SECCIÓN 9: APLICACIONES DE MARCA (BRAND COLLATERAL) -->
    <section id="collateral" class="section-block">
      <div class="section-header">
        <div>
          <div class="section-number">SECCIÓN 09</div>
          <h2 class="section-title">Aplicaciones de Marca (Brand Collateral)</h2>
          <p class="section-desc">Puntos de contacto físicos y digitales: certificados de peritaje oficial, credenciales de asesores y rotulación de móviles.</p>
        </div>
      </div>

      <div class="grid-collateral">
        <div class="collateral-item">
          <h4>9.1. Certificado Digital de Peritaje</h4>
          <p>
            Documento de alta seguridad con sello de agua de La Huella Mecánica, firma digital del perito mecánico, código QR de trazabilidad criptográfica y sello oficial: <em>"Certificado por Charu motorhub"</em>.
          </p>
        </div>

        <div class="collateral-item">
          <h4>9.2. Uniformes &amp; Credenciales de Peritos</h4>
          <p>
            Chaleco técnico en azul marino <em>Deep Navy</em> con vivos reflectantes en verde lima neón, parche en el hombro con la silueta de <strong>Charulo Mech-Dog</strong> y credencial con chip RFID.
          </p>
        </div>

        <div class="collateral-item">
          <h4>9.3. Rotulación Vehicular de Flota</h4>
          <p>
            Vehículos utilitarios de inspección a domicilio con base en blanco perla, franja aerodinámica en azul marino y líneas de estela en verde neón luminiscente para visibilidad nocturna.
          </p>
        </div>
      </div>
    </section>

  </main>

  <!-- ==========================================================================
       PIE DE PÁGINA
       ========================================================================== */
  <footer class="manual-footer">
    <div style="max-width: var(--container-max); margin: 0 auto;">
      <p style="margin-bottom: 8px;">
        <strong>CHARU MOTORHUB</strong> • Manual de Identidad Corporativa y Sistema de Diseño UI/UX
      </p>
      <p style="font-size: 12px; color: #64748B;">
        Concepto: <em>Urban Vitality &amp; The Mechanical Hub</em> • Versión Oficial 2.0 • Septiembre 2026
      </p>
    </div>
  </footer>

  <!-- ==========================================================================
       SCRIPTS INTERACTIVOS
       ========================================================================== */
  <script>
    // Conmutador Global de Modo Claro / Oscuro del Manual
    function toggleTheme() {
      const isDark = document.body.classList.toggle('dark-theme');
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.textContent = isDark ? '🌙' : '☀️';
      }
    }

    // Switcher de Modo en la Maqueta de la App (Sección 07)
    function switchAppTheme(mode) {
      const imgSingle = document.getElementById('appMockupImg');
      const frameSingle = document.getElementById('appMockupFrameSingle');
      const frameSplit = document.getElementById('appMockupFrameSplit');
      const titleText = document.getElementById('appModeTitleText');
      const buttons = document.querySelectorAll('.btn-app-switch');

      buttons.forEach(b => b.classList.remove('active'));

      if (mode === 'light') {
        buttons[0].classList.add('active');
        frameSingle.style.display = 'block';
        frameSplit.style.display = 'none';
        imgSingle.src = 'assets/app_urban_vitality_light.jpg';
        imgSingle.alt = 'Maqueta App Modo Claro';
        titleText.innerHTML = '<span style="color:#00E676;">●</span> <strong>CHARU MOTORHUB APP:</strong> Modo Claro (Urban Light) — Desktop Web App (1260px) &amp; Smartphone App (440px)';
      } else if (mode === 'dark') {
        buttons[1].classList.add('active');
        frameSingle.style.display = 'block';
        frameSplit.style.display = 'none';
        imgSingle.src = 'assets/app_urban_vitality_dark.jpg';
        imgSingle.alt = 'Maqueta App Modo Oscuro';
        titleText.innerHTML = '<span style="color:#00E676;">●</span> <strong>CHARU MOTORHUB APP:</strong> Modo Oscuro (Cockpit OLED) — Desktop Web App (1260px) &amp; Smartphone App (440px)';
      } else if (mode === 'split') {
        buttons[2].classList.add('active');
        frameSingle.style.display = 'none';
        frameSplit.style.display = 'grid';
        titleText.innerHTML = '<span style="color:#00E676;">●</span> <strong>CHARU MOTORHUB APP:</strong> Comparativa Simultánea (Modo Claro vs Modo Oscuro)';
      }
    }

    // Selector de Variantes de Logo (Sección 02)
    function switchLogo(variant) {
      const stage = document.getElementById('mainLogoStage');
      const img = document.getElementById('stageLogoImg');
      const buttons = document.querySelectorAll('.btn-logo-switch');

      buttons.forEach(b => b.classList.remove('active'));

      if (variant === 'dark') {
        buttons[0].classList.add('active');
        stage.className = 'logo-stage-display dark-stage';
        img.src = 'assets/charu_logo_lockup.jpg';
        img.style.filter = 'drop-shadow(0 4px 20px rgba(0,0,0,0.35))';
      } else if (variant === 'light') {
        buttons[1].classList.add('active');
        stage.className = 'logo-stage-display light-stage';
        img.src = 'assets/charu_logo_lockup.jpg';
        img.style.filter = 'drop-shadow(0 8px 24px rgba(19, 51, 76, 0.25))';
      } else if (variant === 'mono') {
        buttons[2].classList.add('active');
        stage.className = 'logo-stage-display mono-stage';
        img.src = 'assets/charu_logo_lockup.jpg';
        img.style.filter = 'grayscale(100%) contrast(150%) drop-shadow(0 4px 20px rgba(255,255,255,0.2))';
      }
    }

    // Copiar código HEX al portapapeles
    function copyHex(hex, btn) {
      navigator.clipboard.writeText(hex).then(() => {
        const prev = btn.innerText;
        btn.innerText = '✓ ¡Copiado!';
        btn.style.background = '#00E676';
        btn.style.color = '#13334C';
        setTimeout(() => {
          btn.innerText = prev;
          btn.style.background = '';
          btn.style.color = '';
        }, 1800);
      });
    }

    // Copiar código CSS
    function copyCssTokens(btn) {
      const code = document.getElementById('cssTokensBlock').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const prev = btn.innerText;
        btn.innerText = '✓ ¡Tokens Copiados!';
        setTimeout(() => {
          btn.innerText = prev;
        }, 2000);
      });
    }

    // Probador Tipográfico en vivo
    function testType(text) {
      const val = text || 'Charu motorhub • Asesoría Automotriz';
      document.getElementById('outOswald').innerText = val;
      document.getElementById('outPoppins').innerText = val;
    }
  </script>
</body>
</html>
"""
target_dir = os.path.dirname(os.path.abspath(__file__))
target_file_1 = os.path.join(target_dir, 'manual_identidad_urban_vitality.html')
target_file_2 = os.path.join(target_dir, 'manual_identidad.html')

with open(target_file_1, 'w', encoding='utf-8') as f:
    f.write(html_code)

with open(target_file_2, 'w', encoding='utf-8') as f:
    f.write(html_code)

print(f"SUCCESS: Generated {target_file_1} and {target_file_2} with length {len(html_code)} chars.")
