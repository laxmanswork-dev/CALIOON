import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import imgIcon   from "./assets/images/icon.png";
import imgZeus   from "./assets/images/zeus.jpg";
import imgAthena from "./assets/images/athena.jpg";
import imgHermes from "./assets/images/hermes.jpg";
import imgHades  from "./assets/images/hades.jpg";
import imgApollo from "./assets/images/apollo.jpg";
import imgRini    from "./assets/images/rini.jpg";
import imgNayana  from "./assets/images/nayana.jpg";
import imgKarthick from "./assets/images/karthick.jpg";
import imgLaxman  from "./assets/images/laxman.png";

// --- GLOBAL ROOT ARCHITECTURE, BRAND PLATFORM GRAPHICS & COMPACT VIEWPORT METRICS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800;900&display=swap');
  
  html {
    scroll-behavior: smooth;
    background-color: #050A12;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #050A12;
    overflow-x: hidden;
    color: #ffffff;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* --- AXIS ALIGNMENT CONTAINMENT --- */
  .calioon-global-container {
    width: 100%;
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 96px;  
    padding-right: 96px; 
    box-sizing: border-box;
    position: relative;
    z-index: 10;
  }
  @media(max-width: 1024px) {
    .calioon-global-container { padding-left: 64px; padding-right: 64px; }
  }
  @media(max-width: 768px) {
    .calioon-global-container { padding-left: 32px; padding-right: 32px; }
  }
  @media(max-width: 640px) {
    .calioon-global-container { padding-left: 14px; padding-right: 14px; }
  }
  @media(max-width: 425px) {
    .calioon-global-container { padding-left: 10px; padding-right: 10px; }
  }

  /* --- FULL VIEWPORT CONTAINER --- */
  .calioon-section-hero {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 100px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #050A12;
  }
  @media (max-width: 1024px) {
    .calioon-section-hero {
      min-height: auto;
      align-items: flex-start;
      padding-top: 130px;
      padding-bottom: 80px;
    }
  }

  .calioon-section-auto {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 100px;
    padding-bottom: 40px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #050A12;
  }

  /* --- SPECIFIC SAFEVIEWPORT CONTAINER FOR PHILOSOPHY (LOCKED) --- */
  .calioon-section-philosophy {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: visible;
    background-color: #050A12;
    padding-top: 120px;
    padding-bottom: 60px;
  }
  @media(max-width: 1024px) {
    .calioon-section-philosophy {
      padding-top: 100px;
      padding-bottom: 100px;
      height: auto;
      min-height: auto;
    }
  }
  @media(max-width: 640px) {
    .calioon-section-philosophy {
      padding-top: 90px;
      padding-bottom: 80px;
    }
  }

  /* --- STRICT ONE-VIEWPORT CONFIGURATION FOR DOMAINS (FINAL PASS MASTER) --- */
  .calioon-section-domains-viewport {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #050A12;
    padding-top: 100px;
    padding-bottom: 20px;
  }
  @media(max-width: 1024px) {
    .calioon-section-domains-viewport {
      height: auto;
      min-height: 100vh;
      padding-top: 110px;
      padding-bottom: 60px;
    }
  }

  /* --- LEFT BLOCK HERO AXIS (LOCKED) --- */
  .hero-content-block {
    max-width: 580px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin: 0;
    position: relative;
    z-index: 40;
    transform: translate(-60px, 8px);
  }
  @media(max-width: 1280px) {
    .hero-content-block { transform: translate(-30px, 8px); }
  }
  @media(max-width: 1024px) {
    .hero-content-block { transform: none; }
  }
  @media(max-width: 768px) {
    .hero-content-block { align-items: center; text-align: center; }
  }
  @media(max-width: 640px) {
    .hero-content-block { max-width: 100%; align-items: center; text-align: center; }
  }

  /* --- MOBILE PERFORMANCE: disable blur filters on phones --- */
  @media (max-width: 768px) {
    * { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    .god-matte-card { will-change: transform; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }

  /* --- HERO CREDIBILITY STRIP --- */
  .hero-cred-label { font-size: 11px; letter-spacing: 0.28em; }
  .hero-cred-sep   { font-size: 8px; margin: 0 13px; }
  @media(max-width: 768px) {
    .hero-cred-label { font-size: 9.5px; letter-spacing: 0.14em; }
    .hero-cred-sep   { font-size: 7px; margin: 0 7px; }
  }
  @media(max-width: 480px) {
    .hero-cred-label { font-size: 8.5px; letter-spacing: 0.09em; }
    .hero-cred-sep   { font-size: 6px; margin: 0 5px; }
  }

  /* --- SPECIFIC PHILOSOPHY LEFT INNER CONTAINER (LOCKED) --- */
  .philosophy-left-content-block {
    max-width: 500px; 
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin: 0;
    position: relative;
    z-index: 40;
    transform: translateY(-17px); 
  }
  @media(max-width: 1024px) {
    .philosophy-left-content-block { transform: none; margin-bottom: 32px; }
  }

  /* --- GREEK GEOMETRY BACKGROUND SYSTEM LAYER --- */
  .philosophy-sacred-geometry-wrap {
    position: absolute;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(98vw, 1320px);
    height: auto;
    opacity: 0.20;
    filter: drop-shadow(0 0 40px rgba(13, 27, 48, 0.5)) drop-shadow(0 0 18px rgba(198, 160, 98, 0.10));
    animation: philosophyMuseumDriftFinal 14s ease-in-out infinite alternate;
  }
  @media(max-width: 1280px) {
    .philosophy-sacred-geometry-wrap { width: min(98vw, 1100px); }
  }
  @media(max-width: 1024px) {
    .philosophy-sacred-geometry-wrap { width: min(96vw, 860px); top: 50%; }
  }
  @media(max-width: 640px) {
    .philosophy-sacred-geometry-wrap { width: min(94vw, 600px); }
  }

  /* --- LOCKED GREEK SACRED TRIANGLE ARCHITECTURE SYSTEM --- */
  .domains-sacred-triangle-system {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(92vw, 900px);
    height: min(92vw, 900px);
    pointer-events: none;
    user-select: none;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.19;
    filter: drop-shadow(0 0 55px rgba(11, 21, 38, 0.95)) drop-shadow(0 0 25px rgba(198, 160, 98, 0.06));
  }
  @media(max-width: 1280px) {
    .domains-sacred-triangle-system { width: min(88vw, 760px); height: min(88vw, 760px); top: 54%; }
  }
  @media(max-width: 1024px) {
    .domains-sacred-triangle-system { width: min(85vw, 650px); height: min(85vw, 650px); top: 50%; }
  }
  @media(max-width: 640px) {
    .domains-sacred-triangle-system { width: min(95vw, 400px); height: min(95vw, 400px); top: 50%; }
  }

  @keyframes masterDeltaRotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes masterDeltaDrift {
    0% { transform: translate(-50%, -50%) translateY(-10px) translateX(-4px); }
    100% { transform: translate(-50%, -50%) translateY(10px) translateX(4px); }
  }

  .animate-master-delta-rotation {
    transform-origin: center center;
    animation: masterDeltaRotation 180s linear infinite;
  }
  .animate-master-delta-drift {
    animation: masterDeltaDrift 20s ease-in-out infinite alternate;
  }

  /* --- CHRONOS WARRIOR STATUE SHADE LAYER --- */
  .domains-monolith-statue-shade {
    position: absolute;
    bottom: -4%;
    right: 2%;
    width: min(45vw, 640px);
    height: auto;
    pointer-events: none;
    user-select: none;
    z-index: 2;
    opacity: 0.065; 
    mix-blend-mode: luminosity;
  }
  @media(max-width: 1024px) {
    .domains-monolith-statue-shade {
      right: auto;
      left: 50%;
      transform: translateX(-50%);
      width: min(65vw, 520px);
      bottom: 5%;
      opacity: 0.04;
    }
  }
  @media(max-width: 640px) {
    .domains-monolith-statue-shade {
      width: min(80vw, 360px);
      opacity: 0.025;
    }
  }

  @keyframes masterStatueFloat {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(0.2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  @media(max-width: 1024px) {
    @keyframes masterStatueFloat {
      0% { transform: translateX(-50%) translateY(0px); }
      50% { transform: translateX(-50%) translateY(-6px); }
      100% { transform: translateX(-50%) translateY(0px); }
    }
  }
  .animate-master-statue-float {
    animation: masterStatueFloat 14s ease-in-out infinite;
  }

  /* --- CLEAN PREMIUM GRID CONTAINER --- */
  .domains-premium-matrix-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 20;
  }
  @media(max-width: 1280px) {
    .domains-premium-matrix-grid { gap: 14px; }
  }
  @media(max-width: 1024px) {
    .domains-premium-matrix-grid {
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
    }
    .domains-premium-matrix-grid > *:nth-child(1) { grid-column: 1 / 3; }
    .domains-premium-matrix-grid > *:nth-child(2) { grid-column: 3 / 5; }
    .domains-premium-matrix-grid > *:nth-child(3) { grid-column: 5 / 7; }
    .domains-premium-matrix-grid > *:nth-child(4) { grid-column: 2 / 4; }
    .domains-premium-matrix-grid > *:nth-child(5) { grid-column: 4 / 6; }
  }
  @media(max-width: 640px) {
    .domains-premium-matrix-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  /* --- LUXURY BLACK MARBLE EMPIRE PLAQUE CARDS --- */
  .domains-row-matte-card {
    background: linear-gradient(160deg, #060F1C 0%, #040C17 45%, #030814 75%, #020711 100%);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(198, 160, 98, 0.15);
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 350px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow:
      0 10px 48px rgba(1, 3, 9, 0.92),
      0 2px 10px rgba(1, 3, 9, 0.7),
      inset 0 1px 0 rgba(198, 160, 98, 0.07);
    transition:
      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .domains-row-matte-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 16px; height: 16px;
    border-top: 1px solid rgba(198, 160, 98, 0.28);
    border-left: 1px solid rgba(198, 160, 98, 0.28);
    z-index: 5;
    pointer-events: none;
    transition: border-color 0.4s ease;
  }
  .domains-row-matte-card::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 16px; height: 16px;
    border-bottom: 1px solid rgba(198, 160, 98, 0.28);
    border-right: 1px solid rgba(198, 160, 98, 0.28);
    z-index: 5;
    pointer-events: none;
    transition: border-color 0.4s ease;
  }
  @media(max-width: 1280px) {
    .domains-row-matte-card { min-height: 380px; padding: 24px 20px; }
  }
  @media(max-width: 1024px) {
    .domains-row-matte-card { min-height: 320px; padding: 28px 24px; }
  }
  @media(max-width: 640px) {
    .domains-row-matte-card { min-height: auto; padding: 24px 20px; }
  }
  .domains-row-matte-card:hover {
    border-color: rgba(198, 160, 98, 0.28);
    background: linear-gradient(160deg, #07111E 0%, #050E19 45%, #040A15 75%, #030912 100%);
    box-shadow:
      0 20px 64px rgba(1, 3, 9, 0.96),
      0 4px 18px rgba(1, 3, 9, 0.82),
      inset 0 1px 0 rgba(198, 160, 98, 0.13);
  }
  .domains-row-matte-card:hover::before,
  .domains-row-matte-card:hover::after {
    border-color: rgba(198, 160, 98, 0.52);
  }

  /* --- CARD INTERIOR LAYERS --- */
  .domain-card-radial-highlight {
    position: absolute;
    top: 0; left: 0;
    width: 180px; height: 180px;
    background: radial-gradient(ellipse at 0% 0%, rgba(198, 160, 98, 0.038) 0%, transparent 60%);
    pointer-events: none;
    z-index: 1;
  }
  .domain-card-geo-overlay {
    position: absolute;
    bottom: -10px; right: -10px;
    width: 110px; height: 110px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.36;
  }

  /* --- CARD VERTICAL ALIGNMENT SYSTEM --- */

  /* Zone 1 — numeral block: locked height so title row starts at same Y on all cards */
  .domains-row-matte-card .space-y-4 > div {
    min-height: 56px;
  }

  /* Zone 2 — title: locked height absorbs 1-line vs 2-line wrapping variance */
  .domains-row-matte-card h3 {
    position: relative;
    padding-left: 12px;
    min-height: 64px;
    align-content: start;
  }
  .domains-row-matte-card h3::before {
    content: '';
    position: absolute;
    left: 0; top: 6%; bottom: 6%;
    width: 2px;
    background: linear-gradient(to bottom, rgba(198, 160, 98, 0.78) 0%, rgba(198, 160, 98, 0.15) 100%);
    border-radius: 1px;
  }

  /* Zone 3 — category label: locked height so description row starts at same Y */
  .domains-row-matte-card h3 + p {
    color: #d4a85e;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(198, 160, 98, 0.18);
    display: inline-block;
    min-height: 28px;
    box-sizing: border-box;
  }

  /* Zone 4 — description: consistent min-height for visual rhythm */
  .domains-row-matte-card h3 + p + p {
    color: rgba(255, 255, 255, 0.72);
    min-height: 72px;
  }

  .domains-row-matte-card ul li {
    color: rgba(255, 255, 255, 0.5);
  }

  /* --- SHIMMER --- */
  .domains-clean-shimmer {
    position: absolute;
    top: 0; left: -150%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(253, 240, 213, 0.04), transparent);
    transform: skewX(-20deg);
  }
  .domains-row-matte-card:hover .domains-clean-shimmer {
    left: 200%;
    transition: all 1.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- TYPOGRAPHY SCALE --- */
  .text-logo {
    font-family: 'Cinzel', serif;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    line-height: 1;
  }

  .text-hero {
    font-family: 'Cinzel', serif;
    font-size: clamp(32px, 5.5vw, 64px);
    line-height: 1.08;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 0;
  }
  /* Narrow laptop (1025–1280px): padding jumps to 96px making column ~416–544px.
     Scale smoothly from 49px at 1025px to 62px at 1280px so BRANDS. never clips. */
  @media(min-width: 1025px) and (max-width: 1280px) { .text-hero { font-size: clamp(48px, 4.8vw, 62px); } }
  @media(max-width: 1024px) { .text-hero { font-size: 56px; } }
  @media(max-width: 640px)  { .text-hero { font-size: 48px; } }
  @media(max-width: 480px)  { .text-hero { font-size: 44px; line-height: 1.13; } }
  @media(max-width: 375px)  { .text-hero { font-size: 36px; line-height: 1.13; } }
  @media(max-width: 320px)  { .text-hero { font-size: 26px; } }

  /* Tablet-landscape / narrow-laptop gap (1024–1255px): the 2-col grid kicks in
     at lg (1024px) but the column is too narrow for fixed 252px hero buttons
     and the full navbar (links + CTA) until ~1256px, causing clipping/overflow.
     Shrink just these elements in this exact window — untouched below 1024
     and at 1256px+, where the original sizing already fits natively. */
  @media (min-width: 1024px) and (max-width: 1255px) {
    .text-hero      { font-size: 44px !important; }
    .hero-cta-btn   { width: 200px !important; }
    .hero-btns-wrap { gap: 14px !important; }
    .nav-links-zone { gap: 14px !important; }
    .nav-links-zone a { font-size: 10px !important; letter-spacing: 0.12em !important; }
    .nav-cta-zone   { width: 168px !important; }
    .nav-cta-link   { padding: 0 12px !important; font-size: 9.5px !important; letter-spacing: 0.14em !important; }
  }

  .text-section-title {
    font-family: 'Cinzel', serif;
    font-size: clamp(26px, 4vw, 56px);
    line-height: 1.1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  @media(max-width: 1024px) { .text-section-title { font-size: 46px; } }
  @media(max-width: 640px) { .text-section-title { font-size: 36px; } }

  .text-card-title {
    font-family: 'Cinzel', serif;
    font-size: 24px;
    line-height: 1.3;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .heading-cinzel {
    font-family: 'Cinzel', serif;
    font-weight: 600;
  }

  .text-body-copy {
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 1.2vw, 17px);
    line-height: 1.75;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .text-label-caps {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  /* --- BRAND EFFECTS --- */
  .gold-matte-text { 
    background: linear-gradient(135deg, #f5e3c3 0%, #c6a062 50%, #8a6d3b 100%); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
  }

  /* --- SYSTEM GLOBAL GREEK MUSEUM TEXTURE & GRAIN PASS --- */
  .grain-overlay { 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='museumNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23museumNoise)'/%3E%3C/svg%3E"); 
    opacity: 0.045; 
    pointer-events: none; 
    z-index: 9999; 
    mix-blend-mode: overlay;
  }

  .greek-stone-texture-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.045;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cfilter id='agedMarble'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23agedMarble)'/%3E%3C/svg%3E");
  }

  .greek-temple-wall-grain {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    opacity: 0.035;
    mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Cfilter id='ancientPlaster'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='4' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%230b1526' surfaceScale='1.5'%3E%3CfeDistantLight azimuth='60' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ancientPlaster)'/%3E%3C/svg%3E");
  }

  .greek-museum-vignette {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3;
    background: radial-gradient(circle at 50% 50%, transparent 15%, #04080F 95%);
    mix-blend-mode: multiply;
  }

  /* --- LUXURY NAVY MIST BLEND LAYER --- */
  .museum-navy-mist-ambient {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(circle at 50% 30%, rgba(13, 27, 48, 0.15) 0%, rgba(7, 16, 29, 0.05) 50%, transparent 100%);
  }

  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(1.65) contrast(1.02) saturate(0.80);
    transform: scale(1.04);
    transform-origin: center center;
  }

  .cta-headline {
    font-size: clamp(26px, 4.5vw, 60px);
  }
  @media(max-width: 1280px) { .cta-headline { font-size: 52px; } }
  @media(max-width: 1024px) { .cta-headline { font-size: 44px; } }
  @media(max-width: 640px) { .cta-headline { font-size: 32px; } }


  .gold-shimmer-button {
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .gold-shimmer-button::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-25deg);
  }
  .gold-shimmer-button:hover::after {
    left: 150%; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- ANIMATION ENGAGEMENT PARADIGMS --- */
  @keyframes greekCircleRotation { 
    from { transform: rotate(0deg); } 
    to { transform: rotate(360deg); } 
  }
  .animate-greek-ring { 
    animation: greekCircleRotation 180s linear infinite; 
  }

  @keyframes philosophySacredCircleFinal {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-philosophy-circle-160s {
    animation: philosophySacredCircleFinal 160s linear infinite;
  }

  @keyframes philosophyMuseumDriftFinal {
    0% { transform: translate(-50%, -50%) translateY(-8px); }
    100% { transform: translate(-50%, -50%) translateY(8px); }
  }

  @keyframes philBgFloat1 {
    0%,100% { transform: translateY(0px) translateX(0px); opacity: 0.55; }
    33%      { transform: translateY(-14px) translateX(6px); opacity: 0.90; }
    66%      { transform: translateY(-6px) translateX(-8px); opacity: 0.65; }
  }
  @keyframes philBgFloat2 {
    0%,100% { transform: translateY(0px) translateX(0px); opacity: 0.40; }
    50%      { transform: translateY(-18px) translateX(10px); opacity: 0.80; }
  }
  @keyframes philBgFloat3 {
    0%,100% { transform: translateY(0px); opacity: 0.30; }
    40%      { transform: translateY(-10px); opacity: 0.70; }
  }
  @keyframes philTempleBreath {
    0%,100% { opacity: 0.045; }
    50%      { opacity: 0.075; }
  }
  @keyframes philGlowPulse {
    0%,100% { opacity: 0.55; transform: translate(-50%,-50%) scale(1); }
    50%      { opacity: 1;    transform: translate(-50%,-50%) scale(1.08); }
  }
  @keyframes philRingRotateCW {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes philRingRotateCCW {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  .phil-temple-svg   { animation: philTempleBreath 9s ease-in-out infinite; }
  .phil-ring-cw-90s  { animation: philRingRotateCW  90s linear infinite; transform-origin: center; }
  .phil-ring-cw-140s { animation: philRingRotateCW 140s linear infinite; transform-origin: center; }
  .phil-ring-ccw-110s{ animation: philRingRotateCCW 110s linear infinite; transform-origin: center; }
  .phil-node-1 { animation: philBgFloat1 7.4s ease-in-out infinite; }
  .phil-node-2 { animation: philBgFloat2 9.1s ease-in-out 1.2s infinite; }
  .phil-node-3 { animation: philBgFloat3 6.8s ease-in-out 0.6s infinite; }
  .phil-node-4 { animation: philBgFloat1 11s ease-in-out 2s infinite; }
  .phil-node-5 { animation: philBgFloat2 8.3s ease-in-out 3s infinite; }

  @keyframes nodePulseGlow {
    0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px rgba(253,240,213,0.5)); transform: scale(1); }
    50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(253,240,213,1)); transform: scale(1.3); }
  }
  .animate-node-pulse {
    animation: nodePulseGlow 4s ease-in-out infinite;
  }

  @keyframes traceLineDash {
    0% { stroke-dashoffset: 200; }
    50% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -200; }
  }
  .animate-trace-line {
    stroke-dasharray: 40 160;
    animation: traceLineDash 14s linear infinite;
  }

  @keyframes slowSubtleGlow {
    0%, 100% { opacity: 0.65; }
    50% { opacity: 0.80; }
  }
  .animate-subtle-glow { 
    animation: slowSubtleGlow 6s ease-in-out infinite; 
  }

  @keyframes logoGlow {
    0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 2px rgba(198, 160, 98, 0.2)); }
    50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(198, 160, 98, 0.5)); }
  }
  .animate-logo-glow { animation: logoGlow 4s ease-in-out infinite; }

  @keyframes greekFloatDrift {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-15px) scale(1.02); }
  }
  .animate-greek-drift { 
    animation: greekFloatDrift 20s ease-in-out infinite; 
  }

  @keyframes linePulseAnimation { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.08; } }
  .animate-line-pulse { animation: linePulseAnimation 8s ease-in-out infinite; }

  @keyframes premiumLightSweep {
    0% { transform: translate(-30%, -30%) rotate(-15deg); opacity: 0.15; }
    50% { transform: translate(-20%, -20%) rotate(-10deg); opacity: 0.25; }
    100% { transform: translate(-30%, -30%) rotate(-15deg); opacity: 0.15; }
  }
  .animate-light-sweep {
    animation: premiumLightSweep 12s ease-in-out infinite;
  }

  @keyframes lineShimmerOnce {
    0% { left: -100%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }
  .accent-line-shimmer::after {
    content: '';
    position: absolute;
    top: 0; left: -100%; width: 60px; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(253, 240, 213, 0.8), transparent);
    animation: lineShimmerOnce 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 0.6s;
  }

  @keyframes deltaConstellationPulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.25); }
  }
  .animate-delta-node {
    animation: deltaConstellationPulse 5s ease-in-out infinite;
  }

  @keyframes manuscriptDust {
    0% { transform: translateY(10px) translateX(0px); opacity: 0; }
    20% { opacity: 0.4; }
    80% { opacity: 0.4; }
    100% { transform: translateY(-40px) translateX(15px); opacity: 0; }
  }
  .animate-manuscript-dust-1 { animation: manuscriptDust 9s ease-in-out infinite; }
  .animate-manuscript-dust-2 { animation: manuscriptDust 13s ease-in-out infinite 3s; }
  .animate-manuscript-dust-3 { animation: manuscriptDust 11s ease-in-out infinite 6s; }

  /* ====================================================
     NEW: GOD CARD DEITY SYMBOL ANIMATIONS
  ==================================================== */
  @keyframes godSymbolRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes godSymbolPulse {
    0%, 100% { opacity: 0.55; filter: drop-shadow(0 0 4px rgba(198,160,98,0.25)); }
    50% { opacity: 0.85; filter: drop-shadow(0 0 14px rgba(198,160,98,0.55)); }
  }
  @keyframes godOrbitalRing {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -314; }
  }
  @keyframes godInnerPulse {
    0%, 100% { r: 16; opacity: 0.4; }
    50% { r: 19; opacity: 0.7; }
  }
  .animate-god-symbol { animation: godSymbolPulse 5s ease-in-out infinite; }
  .animate-god-ring-cw { 
    animation: godSymbolRotate 18s linear infinite;
    transform-origin: center;
  }
  .animate-god-ring-ccw { 
    animation: godSymbolRotate 24s linear infinite reverse;
    transform-origin: center;
  }
  .animate-god-orbital {
    stroke-dasharray: 8 6;
    animation: godOrbitalRing 6s linear infinite;
  }

  /* ====================================================
     NEW: CASE STUDIES TRACKER ANIMATIONS
  ==================================================== */
  @keyframes trackerScanLine {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(400px); opacity: 0; }
  }
  @keyframes trackerNodeBlink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  @keyframes trackerDataFlow {
    0% { stroke-dashoffset: 200; opacity: 0.8; }
    100% { stroke-dashoffset: -200; opacity: 0.2; }
  }
  @keyframes trackerBarGrow {
    0% { width: 0%; opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes trackerPingRipple {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  .animate-scan-line {
    animation: trackerScanLine 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-tracker-blink { animation: trackerNodeBlink 2s ease-in-out infinite; }
  .animate-tracker-blink-2 { animation: trackerNodeBlink 2s ease-in-out infinite 0.5s; }
  .animate-tracker-blink-3 { animation: trackerNodeBlink 2s ease-in-out infinite 1s; }
  .animate-data-flow {
    stroke-dasharray: 30 170;
    animation: trackerDataFlow 3.5s linear infinite;
  }
  .animate-data-flow-2 {
    stroke-dasharray: 20 180;
    animation: trackerDataFlow 4.5s linear infinite 1s;
  }
  .animate-ping-ripple {
    animation: trackerPingRipple 2.4s ease-out infinite;
  }
  .animate-ping-ripple-2 {
    animation: trackerPingRipple 2.4s ease-out infinite 0.8s;
  }

  /* ====================================================
     NEW: STAT COUNTER HIGHLIGHT FLASH
  ==================================================== */
  @keyframes statCounterReveal {
    0% { opacity: 0; transform: translateY(14px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-stat-reveal {
    animation: statCounterReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* ====================================================
     GOD CARDS — MATTE FINISH THEME
  ==================================================== */
  .god-matte-card {
    background: linear-gradient(160deg, #0B1526 0%, #07101D 50%, #04080F 100%);
    border: 1px solid rgba(198, 160, 98, 0.13);
    position: relative;
    overflow: hidden;
    box-shadow:
      0 12px 52px rgba(1, 3, 9, 0.90),
      0 2px 12px rgba(1, 3, 9, 0.65),
      inset 0 1px 0 rgba(198, 160, 98, 0.07),
      inset 0 0 40px rgba(198, 160, 98, 0.015);
    transition:
      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .god-matte-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 18px; height: 18px;
    border-top: 1px solid rgba(198, 160, 98, 0.30);
    border-left: 1px solid rgba(198, 160, 98, 0.30);
    pointer-events: none;
    z-index: 30;
  }
  .god-matte-card::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 18px; height: 18px;
    border-bottom: 1px solid rgba(198, 160, 98, 0.20);
    border-right: 1px solid rgba(198, 160, 98, 0.20);
    pointer-events: none;
    z-index: 30;
  }
  .god-matte-card:hover {
    border-color: rgba(198, 160, 98, 0.32);
    box-shadow:
      0 18px 64px rgba(1, 3, 9, 0.92),
      0 4px 20px rgba(1, 3, 9, 0.70),
      inset 0 1px 0 rgba(198, 160, 98, 0.14),
      0 0 0 1px rgba(198, 160, 98, 0.06);
  }
  .god-matte-shimmer {
    position: absolute;
    top: 0; left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(105deg, transparent 40%, rgba(253, 240, 213, 0.025) 50%, transparent 60%);
    pointer-events: none;
    z-index: 2;
    transition: left 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .god-matte-card:hover .god-matte-shimmer {
    left: 160%;
  }

  /* ====================================================
     NEW: GOD CARD IMAGE AREA HOVER PARALLAX
  ==================================================== */
  .god-card-image-zone {
    position: relative;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .god-card-image-zone:hover .god-inner-symbol {
    transform: scale(1.08) translateY(-3px);
  }
  .god-inner-symbol {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ====================================================
     TYPEWRITER CURSOR
  ==================================================== */
  @keyframes globalReachLine {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }

  /* ====================================================
     NEW: CONTACT SECTION CTA RADIANCE PULSE
  ==================================================== */
  @keyframes contactRadiancePulse {
    0%, 100% { opacity: 0.04; transform: scale(1); }
    50% { opacity: 0.09; transform: scale(1.06); }
  }
  .animate-contact-radiance {
    animation: contactRadiancePulse 7s ease-in-out infinite;
  }

  /* ====================================================
     NEW: FOOTER GREEK KEY BORDER SHIMMER
  ==================================================== */
  @keyframes footerKeylineShimmer {
    0% { background-position: -300px 0; }
    100% { background-position: 300px 0; }
  }
  .footer-greek-keyline {
    position: relative;
    overflow: hidden;
  }
  .footer-greek-keyline::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(198,160,98,0.0) 20%, rgba(198,160,98,0.35) 50%, rgba(198,160,98,0.0) 80%, transparent);
    background-size: 600px 1px;
    animation: footerKeylineShimmer 6s linear infinite;
  }

  /* ====================================================
     HERO ULTRA-SUBTLE ANIMATIONS
  ==================================================== */
  @keyframes pillarUltraFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-0.5px); }
  }
  .animate-pillar-ultra {
    animation: pillarUltraFloat 13s ease-in-out infinite;
  }
  @keyframes wingLinePulse {
    0%, 100% { opacity: 0.70; }
    50% { opacity: 0.88; }
  }
  .animate-wing-line-pulse {
    animation: wingLinePulse 8s ease-in-out infinite;
  }
  @keyframes ringFaintBreathe {
    0%, 100% { opacity: 0.50; }
    50% { opacity: 0.64; }
  }
  .animate-ring-faint-breathe {
    animation: ringFaintBreathe 10s ease-in-out infinite;
  }
  @keyframes wingsBreathing {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-0.5px) scale(1.0018); }
  }
  .animate-wings-breathe {
    animation: wingsBreathing 12s ease-in-out infinite;
  }
  @keyframes pillarAmbientPulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.75; }
  }
  .animate-pillar-ambient {
    animation: pillarAmbientPulse 8s ease-in-out infinite;
  }

  /* ── HERO RING SLOW ROTATION — 1 revolution / 90 s ── */
  @keyframes heroRingRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-hero-ring-rotate {
    animation: heroRingRotate 90s linear infinite;
    transform-origin: center;
  }

  /* ── HERO WING OPENING — living sculpture, 9 s ease-in-out ── */
  @keyframes heroWingOpen {
    0%, 100% { transform: translateX(0px); }
    50%       { transform: translateX(-9px); }
  }
  .animate-hero-wing-open {
    animation: heroWingOpen 9s ease-in-out infinite;
  }

  /* ── NAVBAR RING SLOW ROTATION ── */
  @keyframes navRingRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  .animate-nav-ring-rotate {
    animation: navRingRotate 70s linear infinite;
    transform-origin: center;
  }

  /* ====================================================
     CTA SECTION — EMPEROR BUST ANIMATIONS
  ==================================================== */
  @keyframes ctaStatueLux {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  .animate-cta-statue-lux {
    animation: ctaStatueLux 16s ease-in-out infinite;
  }
  @keyframes ctaRingBreath {
    0%, 100% { opacity: 0.28; }
    50%       { opacity: 0.55; }
  }
  .animate-cta-ring-breath {
    animation: ctaRingBreath 10s ease-in-out infinite;
  }

  /* ── EMPIRE CREST BUILD ANIMATION (Hero Background) ── */
  @keyframes ecK_guide {
    0%,100% { opacity:0; }
    3%  { opacity:1; }
    80% { opacity:1; }
    93% { opacity:0; }
  }
  @keyframes ecK_ring_out {
    0%,12%  { stroke-dashoffset:2000; opacity:0; }
    14%     { stroke-dashoffset:2000; opacity:1; }
    38%     { stroke-dashoffset:0; }
    80%     { stroke-dashoffset:0; opacity:1; }
    93%     { opacity:0; }
    100%    { stroke-dashoffset:2000; opacity:0; }
  }
  @keyframes ecK_ring_in {
    0%,15%  { stroke-dashoffset:2000; opacity:0; }
    17%     { stroke-dashoffset:2000; opacity:1; }
    41%     { stroke-dashoffset:0; }
    80%     { stroke-dashoffset:0; opacity:1; }
    93%     { opacity:0; }
    100%    { stroke-dashoffset:2000; opacity:0; }
  }
  @keyframes ecK_cap {
    0%,38%  { opacity:0; }
    42%     { opacity:1; }
    80%     { opacity:1; }
    93%,100%{ opacity:0; }
  }
  @keyframes ecK_wf1 { 0%,33%{opacity:0;} 38%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_wf2 { 0%,36%{opacity:0;} 41%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_wf3 { 0%,39%{opacity:0;} 44%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_wf4 { 0%,42%{opacity:0;} 47%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_wf5 { 0%,45%{opacity:0;} 50%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_seal {
    0%,46%  { stroke-dashoffset:1000; opacity:0; }
    48%     { opacity:1; }
    62%     { stroke-dashoffset:0; }
    80%     { stroke-dashoffset:0; opacity:1; }
    93%     { opacity:0; }
    100%    { stroke-dashoffset:1000; opacity:0; }
  }
  @keyframes ecK_sp1 { 0%,50%{opacity:0;} 56%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_sp2 { 0%,53%{opacity:0;} 59%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_sp3 { 0%,56%{opacity:0;} 62%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_ctr { 0%,58%{opacity:0;} 65%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_fin { 0%,63%{opacity:0;} 70%{opacity:1;} 80%{opacity:1;} 93%,100%{opacity:0;} }
  @keyframes ecK_glow {
    0%,66%  { filter: drop-shadow(0 0 0px  rgba(198,160,98,0));    }
    72%     { filter: drop-shadow(0 0 12px rgba(198,160,98,0.35)); }
    79%     { filter: drop-shadow(0 0 6px  rgba(198,160,98,0.18)); }
    85%,100%{ filter: drop-shadow(0 0 0px  rgba(198,160,98,0));    }
  }

  /* ── PROCESS SECTION — Greek Tholos Oracle — 8s sequential construction ── */
  @keyframes grkK_border { 0%,100%{stroke-dashoffset:3500;opacity:0;} 2%{opacity:1;} 18%{stroke-dashoffset:0;opacity:1;} 80%{opacity:1;} 94%{opacity:0;} }
  @keyframes grkK_col    { 0%,14%{opacity:0;} 22%{opacity:0.85;} 80%{opacity:0.85;} 94%,100%{opacity:0;} }
  @keyframes grkK_ring1  { 0%,10%{stroke-dashoffset:2200;opacity:0;} 12%{opacity:1;} 28%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:2200;opacity:0;} }
  @keyframes grkK_ring2  { 0%,22%{stroke-dashoffset:1500;opacity:0;} 24%{opacity:1;} 38%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:1500;opacity:0;} }
  @keyframes grkK_ring3  { 0%,32%{stroke-dashoffset:900;opacity:0;} 34%{opacity:1;} 46%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:900;opacity:0;} }
  @keyframes grkK_axis   { 0%,38%{stroke-dashoffset:1100;opacity:0;} 40%{opacity:1;} 52%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:1100;opacity:0;} }
  @keyframes grkK_spoke  { 0%,46%{stroke-dashoffset:300;opacity:0;} 48%{opacity:1;} 58%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:300;opacity:0;} }
  @keyframes grkK_star   { 0%,52%{stroke-dashoffset:1600;opacity:0;} 54%{opacity:1;} 68%{stroke-dashoffset:0;} 80%{opacity:1;} 94%,100%{stroke-dashoffset:1600;opacity:0;} }
  @keyframes grkK_meand  { 0%,60%{opacity:0;} 68%{opacity:1;} 80%{opacity:1;} 94%,100%{opacity:0;} }
  @keyframes grkK_dot    { 0%,66%{opacity:0;} 72%{opacity:1;} 80%{opacity:1;} 94%,100%{opacity:0;} }
  @keyframes grkK_spin   { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
  @keyframes grkK_glow   { 0%,74%{filter:drop-shadow(0 0 0px rgba(198,160,98,0));} 80%{filter:drop-shadow(0 0 22px rgba(198,160,98,0.45));} 87%{filter:drop-shadow(0 0 10px rgba(198,160,98,0.20));} 94%,100%{filter:drop-shadow(0 0 0px rgba(198,160,98,0));} }

  /* ── Philosophy panel gold light sweep ── */
  @keyframes philK_sweep {
    0%   { transform: translateX(-130%) skewX(-12deg); opacity: 0; }
    6%   { opacity: 1; }
    28%  { transform: translateX(200%) skewX(-12deg); opacity: 0; }
    100% { transform: translateX(200%) skewX(-12deg); opacity: 0; }
  }
  @keyframes ctaGlassPass {
    0%   { transform: translateX(-160%) skewX(-18deg); opacity: 0; }
    7%   { opacity: 1; }
    32%  { transform: translateX(260%) skewX(-18deg); opacity: 0; }
    100% { transform: translateX(260%) skewX(-18deg); opacity: 0; }
  }

  /* ── LARGE SCREEN / 4K SCALING ──
     .hero-content-block stays capped at max-width:580px by default, which is
     far narrower than the ~50% grid column these tiers actually have. Widen
     the block and use font sizes that fit it, so "BUILD BRANDS." (the
     longest nowrap line) doesn't clip against the pillar video column. */
  @media(min-width: 1920px) {
    .calioon-global-container { max-width: 1800px; padding-left: 120px; padding-right: 120px; }
    .hero-content-block { max-width: 760px; }
    .text-hero { font-size: clamp(60px, 4vw, 74px); }
    .text-section-title { font-size: clamp(64px, 4vw, 88px); }
    .text-body-copy { font-size: 19px; }
    .cta-headline { font-size: clamp(64px, 4vw, 88px); }
  }
  @media(min-width: 2560px) {
    .calioon-global-container { max-width: 2400px; padding-left: 180px; padding-right: 180px; }
    .hero-content-block { max-width: 980px; }
    .text-hero { font-size: clamp(78px, 4vw, 96px); }
    .text-section-title { font-size: clamp(88px, 4.5vw, 128px); }
    .text-body-copy { font-size: 22px; }
  }
  @media(min-width: 3840px) {
    .calioon-global-container { max-width: 3400px; padding-left: 240px; padding-right: 240px; }
    .hero-content-block { max-width: 1380px; }
    .text-hero { font-size: 120px; }
    .text-section-title { font-size: 160px; }
    .text-body-copy { font-size: 28px; }
  }

  /* --- NAVBAR BRAND ZONE — responsive negative offset --- */
  .nav-brand-zone { margin-left: -52px; width: 240px; }
  @media(max-width: 1280px) { .nav-brand-zone { margin-left: -26px; } }
  @media(max-width: 1024px) { .nav-brand-zone { margin-left: 0; width: auto; } }

  /* --- FORM CARD — tighter padding on small screens --- */
  .form-card { padding: 32px 36px 40px 40px; box-sizing: border-box; }
  @media(max-width: 768px)  { .form-card { padding: 24px 24px 32px 24px; } }
  @media(max-width: 425px)  { .form-card { padding: 20px 16px 24px 16px; } }

  /* --- SERVICE PILLAR HEADING — "WHICH PILLAR CALLS YOU?" --- */
  .svc-pillar-word {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 0.32em;
    font-weight: 800;
    text-transform: uppercase;
    white-space: nowrap;
    display: inline-block;
  }
  @media(max-width: 640px) {
    .svc-pillar-word { font-size: 9.5px; letter-spacing: 0.16em; }
  }

  /* --- PROCESS STEP TITLE — prevent mid-word line breaks --- */
  .process-step-word {
    display: inline-block;
    white-space: nowrap;
  }

  /* --- CONTACT LEFT LABEL — prevent overflow on small screens --- */
  @media(max-width: 640px) {
    .contact-eyebrow { font-size: 11px !important; letter-spacing: 0.16em !important; }
  }

  /* ── MOBILE AUDIT FIXES (320–430px) ── */

  /* Cred strip: prevent clipping on 320px phones */
  @media(max-width: 360px) {
    .hero-cred-label { font-size: 7px; letter-spacing: 0.03em; }
    .hero-cred-sep   { font-size: 5px; margin: 0 2px; }
  }

  /* Philosophy left block: center on mobile like hero content */
  @media(max-width: 768px) {
    .philosophy-left-content-block {
      align-items: center;
      text-align: center;
      max-width: 100%;
    }
  }

  /* Contact section left column: center on mobile */
  @media(max-width: 768px) {
    .contact-main-heading { text-align: center !important; }
    .contact-desc-para { text-align: center !important; margin-left: auto !important; margin-right: auto !important; }
    .contact-feature-list { align-items: center !important; }
    .contact-feature-item { justify-content: center !important; }
    .contact-feature-label { text-align: center !important; }
    .contact-feature-desc  { text-align: center !important; }
    .contact-privacy-row { justify-content: center !important; }
  }

  /* Case Studies + Contact: prevent background image zoom/crop on mobile */
  @media(max-width: 768px) {
    .case-bg-img {
      object-fit: contain !important;
      object-position: center center !important;
      filter: brightness(1.20) contrast(1.05) !important;
      opacity: 0.26 !important;
    }
    .contact-bg-img {
      object-fit: cover !important;
      object-position: center top !important;
      top: clamp(70px, 22vw, 100px) !important;
      height: calc(100% - clamp(70px, 22vw, 100px)) !important;
      filter: grayscale(70%) brightness(0.75) contrast(1.40) !important;
      opacity: 0.55 !important;
    }
  }

  /* Contact feature list: scale down on small phones */
  @media(max-width: 640px) {
    .contact-feature-label { font-size: 13px !important; letter-spacing: 0.08em !important; }
    .contact-feature-desc  { font-size: 13px !important; line-height: 1.55 !important; }
  }

  /* Footer links: increase from 9.5px — unreadable on mobile */
  @media(max-width: 640px) {
    .footer-legal-link { font-size: 11px !important; letter-spacing: 0.10em !important; }
  }

  /* Case studies left: center heading + ornament on mobile */
  @media(max-width: 768px) {
    .case-left-col { text-align: center !important; }
    .case-left-col h3, .case-left-col h2 { text-align: center; }
  }

  /* Process left col: center label + heading on mobile */
  @media(max-width: 768px) {
    .process-left-col { text-align: center !important; }
    .process-left-col h3, .process-left-col h2, .process-left-col p { text-align: center; }
  }

  /* Ornament line (⌜⌟⌜⌟⌜⌟ ⊙ ⌜⌟⌜⌟⌜⌟): center on mobile in process + case studies */
  .section-ornament-line { text-align: left; }
  @media(max-width: 768px) {
    .section-ornament-line { text-align: center !important; }
  }

  /* Hero section: tighten top padding on very small phones */
  @media(max-width: 375px) {
    .calioon-section-hero { padding-top: 118px; padding-bottom: 60px; }
  }

  /* ─── Mobile Hero Optimization: headline dominance 375–430px ─── */
  @media(max-width: 480px) {
    /* Tighter top padding → more viewport for headline */
    .calioon-section-hero { padding-top: 106px !important; padding-bottom: 28px; }
    /* Lock accent rule close to EMPIRES. */
    .text-hero { margin-bottom: 0px !important; }
    /* Cred strip: eyebrow above headline, bigger labels so industry reads instantly */
    .hero-cred-strip { order: -1; margin-top: 14px !important; margin-bottom: 18px !important; }
    .hero-cred-rule  { display: none !important; }
    .hero-cred-label { font-size: 11px !important; letter-spacing: 0.07em !important; }
    .hero-cred-sep   { font-size: 8px !important; margin: 0 6px !important; }
    /* Paragraph immediately after accent rule, buttons last */
    .hero-para-text  { order: 3; margin-top: 0px !important; margin-bottom: 14px !important; max-width: 250px !important; }
    .hero-btns-wrap  { order: 4; }
    /* Buttons: slimmer; primary slightly heavier to lead the eye */
    .hero-cta-btn     { height: 40px !important; min-height: 40px !important; font-size: 11px !important; }
    .hero-cta-primary { font-size: 12px !important; font-weight: 800 !important; letter-spacing: 0.16em !important; }
    .hero-btns-wrap   { gap: 10px !important; }
    /* Paragraph: accessible contrast (≥4.5:1) + lower visual weight */
    .hero-para-text { font-size: 14px !important; line-height: 1.55 !important; color: rgba(255,255,255,0.72) !important; }
    /* Open leading on each line */
    .hero-line-wrap > span { line-height: 1.60 !important; }
    /* Couplet grouping:
       WE DON'T          ← tight to BUILD BRANDS.
       BUILD BRANDS.     ← big gap (couplet break)
       WE BUILD          ← medium gap (breathing before EMPIRES)
       EMPIRES.
    */
    .hero-line-wrap-0      { margin-bottom: 1px;  }
    .hero-line-wrap-1      { margin-bottom: 14px; }
    .hero-line-wrap-2      { margin-bottom: 6px; }
    .hero-line-wrap-empires { margin-bottom: 0;   }
  }
  @media(max-width: 375px) {
    .calioon-section-hero { padding-top: 100px !important; }
    .text-hero { margin-bottom: 8px !important; }
    .hero-cred-label { font-size: 9.5px !important; letter-spacing: 0.05em !important; }
    .hero-cred-sep   { font-size: 7px !important; margin: 0 4px !important; }
    .hero-line-wrap-0      { margin-bottom: 1px;  }
    .hero-line-wrap-1      { margin-bottom: 14px; }
    .hero-line-wrap-2      { margin-bottom: 7px;  }
  }
`;

const LUXURY_EASE = [0.16, 1, 0.3, 1];

const SectionReveal = ({ children, delay = 0, x = 0, y = 25, duration = 1.1 }) => (
  <motion.div 
    initial={{ opacity: 0, x, y }} 
    whileInView={{ opacity: 1, x: 0, y: 0 }} 
    viewport={{ once: true, margin: "-40px" }} 
    transition={{ duration, delay, ease: LUXURY_EASE }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// ====================================================
// NEW: ANIMATED STAT COUNTER HOOK
// ====================================================
function useCountUp(target, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = null;
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ""));
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(numericTarget);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);
  return count;
}

// ====================================================
// NEW: GOD DEITY SYMBOL SVG COMPONENTS
// ====================================================
const DeitySymbol = ({ type }) => {
  const symbols = {
    zeus: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full animate-god-symbol" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="#c6a062" strokeWidth="0.8" strokeOpacity="0.25" />
        <circle cx="60" cy="60" r="46" stroke="#fdf0d5" strokeWidth="1" strokeDasharray="3 7" strokeOpacity="0.5" className="animate-god-ring-cw" style={{ transformOrigin: "60px 60px" }} />
        <circle cx="60" cy="60" r="36" stroke="#c6a062" strokeWidth="0.8" strokeOpacity="0.35" className="animate-god-ring-ccw" style={{ transformOrigin: "60px 60px" }} />
        {/* Lightning bolt */}
        <path d="M66,24 L48,58 L60,58 L54,96 L78,54 L64,54 Z" fill="url(#zeusGold)" opacity="0.85" />
        {/* Outer glow ring */}
        <circle cx="60" cy="60" r="28" stroke="#c6a062" strokeWidth="1.5" strokeDasharray="12 4" strokeOpacity="0.6" className="animate-god-orbital" style={{ transformOrigin: "60px 60px" }} />
        <defs>
          <linearGradient id="zeusGold" x1="48" y1="24" x2="78" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fdf0d5" />
            <stop offset="55%" stopColor="#c6a062" />
            <stop offset="100%" stopColor="#8a6d3b" />
          </linearGradient>
        </defs>
      </svg>
    ),
    athena: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full animate-god-symbol" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="#c6a062" strokeWidth="0.8" strokeOpacity="0.2" />
        <circle cx="60" cy="60" r="46" stroke="#fdf0d5" strokeWidth="0.8" strokeDasharray="2 8" strokeOpacity="0.4" className="animate-god-ring-ccw" style={{ transformOrigin: "60px 60px" }} />
        {/* Owl eye symbol / strategic sight */}
        <circle cx="60" cy="52" r="14" stroke="#c6a062" strokeWidth="1.4" strokeOpacity="0.75" />
        <circle cx="60" cy="52" r="7" fill="#c6a062" fillOpacity="0.35" />
        <circle cx="60" cy="52" r="3" fill="#fdf0d5" fillOpacity="0.7" />
        {/* Spear shaft */}
        <line x1="60" y1="30" x2="60" y2="92" stroke="#c6a062" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Spear tip */}
        <path d="M54,36 L60,24 L66,36 Z" fill="#c6a062" fillOpacity="0.65" />
        {/* Shield arc */}
        <path d="M38,70 Q60,88 82,70" stroke="#fdf0d5" strokeWidth="1.2" strokeOpacity="0.55" fill="none" />
        <path d="M42,73 Q60,86 78,73" stroke="#c6a062" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
        <circle cx="60" cy="60" r="32" stroke="#c6a062" strokeWidth="1" strokeDasharray="8 5" strokeOpacity="0.35" className="animate-god-orbital" style={{ transformOrigin: "60px 60px" }} />
      </svg>
    ),
    hermes: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full animate-god-symbol" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="#c6a062" strokeWidth="0.7" strokeOpacity="0.18" />
        <circle cx="60" cy="60" r="44" stroke="#fdf0d5" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.35" className="animate-god-ring-cw" style={{ transformOrigin: "60px 60px" }} />
        {/* Caduceus staff */}
        <line x1="60" y1="22" x2="60" y2="98" stroke="#c6a062" strokeWidth="1.6" strokeOpacity="0.65" />
        {/* Two serpents */}
        <path d="M60,40 C72,46 72,54 60,60 C48,66 48,74 60,80" stroke="#fdf0d5" strokeWidth="1.4" strokeOpacity="0.6" fill="none" />
        <path d="M60,40 C48,46 48,54 60,60 C72,66 72,74 60,80" stroke="#c6a062" strokeWidth="1.4" strokeOpacity="0.55" fill="none" />
        {/* Wings at top */}
        <path d="M60,26 C52,22 42,24 38,30 C44,28 52,30 60,34" fill="#c6a062" fillOpacity="0.55" />
        <path d="M60,26 C68,22 78,24 82,30 C76,28 68,30 60,34" fill="#c6a062" fillOpacity="0.55" />
        <circle cx="60" cy="38" r="4" stroke="#fdf0d5" strokeWidth="1" strokeOpacity="0.65" fill="none" />
        <circle cx="60" cy="60" r="30" stroke="#c6a062" strokeWidth="0.8" strokeDasharray="10 5" strokeOpacity="0.3" className="animate-god-ring-ccw" style={{ transformOrigin: "60px 60px" }} />
      </svg>
    ),
    hades: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full animate-god-symbol" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="#c6a062" strokeWidth="0.7" strokeOpacity="0.15" />
        <circle cx="60" cy="60" r="46" stroke="#fdf0d5" strokeWidth="0.7" strokeDasharray="1 10" strokeOpacity="0.3" className="animate-god-ring-ccw" style={{ transformOrigin: "60px 60px" }} />
        {/* Helm of darkness / bident */}
        <path d="M44,88 L44,42 L60,28 L76,42 L76,88" stroke="#c6a062" strokeWidth="1.3" strokeOpacity="0.65" fill="none" />
        <path d="M48,88 L48,44 L60,33 L72,44 L72,88" stroke="#fdf0d5" strokeWidth="0.7" strokeOpacity="0.35" fill="none" />
        {/* Helm crest */}
        <path d="M44,42 L38,30 M76,42 L82,30" stroke="#c6a062" strokeWidth="1.2" strokeOpacity="0.5" />
        <path d="M60,28 L60,20" stroke="#fdf0d5" strokeWidth="1.5" strokeOpacity="0.6" />
        <circle cx="60" cy="18" r="3.5" fill="#c6a062" fillOpacity="0.7" />
        {/* ROI data rings */}
        <circle cx="60" cy="60" r="22" stroke="#c6a062" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.5" className="animate-god-orbital" style={{ transformOrigin: "60px 60px" }} />
        <circle cx="60" cy="60" r="34" stroke="#fdf0d5" strokeWidth="0.6" strokeDasharray="2 12" strokeOpacity="0.25" className="animate-god-ring-cw" style={{ transformOrigin: "60px 60px" }} />
      </svg>
    ),
    apollo: (
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full animate-god-symbol" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="54" stroke="#c6a062" strokeWidth="0.7" strokeOpacity="0.2" />
        {/* Sun radiance rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = 60 + Math.cos(angle) * 28;
          const y1 = 60 + Math.sin(angle) * 28;
          const x2 = 60 + Math.cos(angle) * (i % 2 === 0 ? 44 : 38);
          const y2 = 60 + Math.sin(angle) * (i % 2 === 0 ? 44 : 38);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c6a062" strokeWidth={i % 2 === 0 ? "1.4" : "0.8"} strokeOpacity={i % 2 === 0 ? "0.7" : "0.45"} />;
        })}
        {/* Sun core */}
        <circle cx="60" cy="60" r="20" stroke="#c6a062" strokeWidth="1.5" strokeOpacity="0.75" fill="none" />
        <circle cx="60" cy="60" r="12" fill="url(#apolloGold)" fillOpacity="0.45" />
        <circle cx="60" cy="60" r="5" fill="#fdf0d5" fillOpacity="0.75" />
        {/* Lyre arc */}
        <path d="M38,76 Q60,96 82,76" stroke="#fdf0d5" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
        <circle cx="60" cy="60" r="46" stroke="#fdf0d5" strokeWidth="0.6" strokeDasharray="2 9" strokeOpacity="0.25" className="animate-god-ring-ccw" style={{ transformOrigin: "60px 60px" }} />
        <defs>
          <radialGradient id="apolloGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdf0d5" />
            <stop offset="100%" stopColor="#c6a062" />
          </radialGradient>
        </defs>
      </svg>
    )
  };
  return symbols[type] || null;
};

// --- COMPONENT: NAVBAR (LOCKED) ---
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const menuItems = ["PHILOSOPHY", "DOMAINS", "OUR GODS", "PROCESS", "CASE STUDIES", "CONTACT"];

  useEffect(() => {
    const sectionIds = ['philosophy', 'domains', 'ourgods', 'process', 'casestudies', 'contact'];
    const observers = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: '-80px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const getHref = item => `#${item.toLowerCase().replaceAll(' ', '')}`;
  const isActive = item => {
    const map = { 'PHILOSOPHY':'philosophy', 'DOMAINS':'domains', 'OUR GODS':'ourgods', 'PROCESS':'process', 'CASE STUDIES':'casestudies', 'CONTACT':'contact' };
    return map[item] === activeSection;
  };
  
  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-[100] h-[100px] border-b border-white/5 bg-[#050A12]/90 backdrop-blur-md">
      <div className="greek-stone-texture-overlay !opacity-[0.03]" />
      {/* 3-zone layout: brand | nav | cta — all zones explicit width so center is always truly centered */}
      <div className="calioon-global-container h-full flex items-center justify-between relative">

        {/* ── ZONE 1: BRAND (left) ── */}
        <div className="nav-brand-zone flex items-center justify-start flex-shrink-0">
          <a
            href="#"
            className="flex items-center transition-opacity duration-300 hover:opacity-80"
            style={{ gap: '4px', textDecoration: 'none' }}
          >
            {/* Emblem — ES import guarantees path resolves at build time */}
            <img
              src={imgIcon}
              alt=""
              aria-hidden="true"
              style={{
                height: '55px',
                width: '55px',
                display: 'block',
                flexShrink: 0,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(198,160,98,0.40)) drop-shadow(0 0 2px rgba(198,160,98,0.20)) drop-shadow(0 1px 3px rgba(0,0,0,0.50))',
              }}
            />
            {/* Thin gold rule between emblem and wordmark */}
            <span
              aria-hidden="true"
              style={{
                display: 'block',
                width: '1px',
                height: '20px',
                flexShrink: 0,
                background: 'linear-gradient(to bottom, transparent 0%, rgba(198,160,98,0.38) 40%, rgba(198,160,98,0.38) 60%, transparent 100%)',
              }}
            />
            <span style={{
              fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 800,
              fontSize: '24px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#F2EDE4',
              textShadow: '0 0 28px rgba(198,160,98,0.12)',
              lineHeight: 1,
              paddingLeft: '2px',
            }}>CALIOON</span>
          </a>
        </div>

        {/* ── ZONE 2: NAV LINKS (center — Greek style) ── */}
        <nav className="nav-links-zone hidden lg:flex items-center h-full" style={{ gap: '32px' }} aria-label="Primary navigation">
          {menuItems.map(item => {
            const active = isActive(item);
            return (
              <a
                key={item}
                href={getHref(item)}
                style={{
                  fontFamily:"'Cinzel', serif",
                  fontSize:'12px',
                  fontWeight: active ? 700 : 600,
                  letterSpacing:'0.20em',
                  textTransform:'uppercase',
                  color: active ? 'rgba(255,232,140,0.95)' : 'rgba(212,175,106,0.55)',
                  textDecoration:'none',
                  position:'relative',
                  display:'flex', alignItems:'center', height:'100%',
                  transition:'color 0.25s ease, font-weight 0.25s ease',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'rgba(255,232,140,0.95)';
                  e.currentTarget.querySelector('span').style.opacity = '1';
                  e.currentTarget.querySelector('span').style.width = '100%';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = active ? 'rgba(255,232,140,0.95)' : 'rgba(212,175,106,0.55)';
                  e.currentTarget.querySelector('span').style.opacity = active ? '1' : '0.28';
                  e.currentTarget.querySelector('span').style.width = active ? '100%' : '40%';
                }}
              >
                {item}
                {/* Underline — active: full gold, rest: dim partial */}
                <span style={{
                  position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)',
                  height:'1px', width: active ? '100%' : '40%', opacity: active ? '1' : '0.28',
                  background:'linear-gradient(90deg, transparent, rgba(212,175,106,1), transparent)',
                  transition:'width 0.30s ease, opacity 0.30s ease',
                  pointerEvents:'none',
                }} />
              </a>
            );
          })}
        </nav>

        {/* ── ZONE 3: CTA BUTTON — chamfered imperial ── */}
        <div className="nav-cta-zone hidden lg:flex items-center justify-end flex-shrink-0" style={{ width: '240px' }}>
          <a href="#contact" className="nav-cta-link" style={{
            position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center',
            height:'46px', padding:'0 28px', textDecoration:'none',
            background:'linear-gradient(135deg, #C8A030 0%, #E8C860 35%, #D4AF50 60%, #A07820 100%)',
            clipPath:'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
            fontFamily:"'Cinzel',serif", fontSize:'11px', fontWeight:800,
            letterSpacing:'0.24em', textTransform:'uppercase', whiteSpace:'nowrap',
            color:'#04080F',
            boxShadow:'0 4px 24px rgba(212,175,106,0.35), 0 1px 6px rgba(212,175,106,0.20)',
            transition:'filter 0.22s ease, box-shadow 0.22s ease, transform 0.18s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter='brightness(1.12) saturate(1.10)';
            e.currentTarget.style.transform='translateY(-2px)';
            e.currentTarget.style.boxShadow='0 8px 32px rgba(212,175,106,0.50), 0 2px 10px rgba(212,175,106,0.30)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter='brightness(1) saturate(1)';
            e.currentTarget.style.transform='translateY(0)';
            e.currentTarget.style.boxShadow='0 4px 24px rgba(212,175,106,0.35), 0 1px 6px rgba(212,175,106,0.20)';
          }}
          >
            {/* Shimmer sweep */}
            <span aria-hidden="true" style={{
              position:'absolute', inset:0,
              background:'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.22) 50%, transparent 75%)',
              animation:'empireSubmitShimmer 2.8s ease-in-out 0.6s infinite',
              pointerEvents:'none',
            }} />
            <span style={{ position:'relative', zIndex:1 }}>ENTER THE EMPIRE</span>
          </a>
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col z-50 focus:outline-none ml-auto"
          style={{ gap: '6px', width: '24px' }}
          aria-label="Open menu"
        >
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-300 w-6 ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-200 w-5 ${mobileOpen ? 'opacity-0 w-0' : ''}`} />
          <span className={`block h-0.5 bg-[#c6a062] transition-all duration-300 w-6 ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(4,8,15,0.93)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '520px',
              padding: 'clamp(36px,6vw,64px) clamp(24px,5vw,48px)',
              textAlign: 'center',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
              style={{
                position: 'absolute', top: 0, right: 'clamp(20px,4vw,40px)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(198,160,98,0.55)', fontSize: '20px',
                fontFamily: "'Cinzel',serif", lineHeight: 1, padding: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c6a062'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(198,160,98,0.55)'}
            >✕</button>

            {/* Eyebrow */}
            <div style={{ marginBottom: 'clamp(24px,4vw,40px)' }}>
              <span style={{
                fontFamily: "'Cinzel',serif", fontSize: 'clamp(8px,1.8vw,11px)',
                letterSpacing: '0.32em', color: 'rgba(198,160,98,0.55)',
                textTransform: 'uppercase', display: 'block',
              }}>THE PILLARS OF CALIOON</span>
              <div style={{
                margin: '10px auto 0', height: '1px', width: '60px',
                background: 'linear-gradient(90deg,transparent,rgba(198,160,98,0.60),transparent)',
              }} />
            </div>

            {/* Nav items */}
            <nav>
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.30, delay: 0.08 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  href={`#${item.toLowerCase().replaceAll(' ', '')}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', width: '100%',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Cinzel',serif",
                    fontSize: 'clamp(14px,3.2vw,20px)',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(253,240,213,0.82)',
                    padding: 'clamp(12px,2.4vw,18px) 0',
                    borderBottom: i < menuItems.length - 1 ? '1px solid rgba(198,160,98,0.10)' : 'none',
                    transition: 'color 0.22s ease, letter-spacing 0.22s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c6a062'; e.currentTarget.style.letterSpacing = '0.22em'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,240,213,0.82)'; e.currentTarget.style.letterSpacing = '0.16em'; }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Bottom ornament */}
            <div style={{
              marginTop: 'clamp(20px,3.5vw,32px)',
              color: 'rgba(198,160,98,0.35)', fontSize: '13px',
              letterSpacing: '0.05em', fontFamily: 'monospace',
            }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

// --- COMPONENT: EMPIRE CREST BACKGROUND ---
const EmpireCrestBg = ({ wrapStyle = {}, svgStyle = {} }) => {
  const SPOKES = Array.from({ length: 12 }, (_, i) => {
    const rad = (i * 30 * Math.PI) / 180;
    return {
      x1: +(250 + 30 * Math.cos(rad)).toFixed(1),
      y1: +(310 + 30 * Math.sin(rad)).toFixed(1),
      x2: +(250 + 65 * Math.cos(rad)).toFixed(1),
      y2: +(310 + 65 * Math.sin(rad)).toFixed(1),
    };
  });

  const A12 = '4s ease-in-out infinite';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 2,
        pointerEvents: 'none', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        opacity: 0.11,
        ...wrapStyle,
      }}
    >
      <svg
        viewBox="0 0 500 620"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '72%', maxWidth: '600px', height: 'auto', animation: `ecK_glow ${A12}`, ...svgStyle }}
      >
        {/* Stage 1 — Construction guide lines */}
        <g fill="none" stroke="#c6a062" style={{ animation: `ecK_guide ${A12}` }}>
          <line x1="250" y1="10"  x2="250" y2="610" strokeWidth="0.5" />
          <line x1="10"  y1="310" x2="490" y2="310" strokeWidth="0.5" />
          <circle cx="250" cy="310" r="225" strokeWidth="0.5" strokeDasharray="8 7" />
          <circle cx="250" cy="310" r="140" strokeWidth="0.4" strokeDasharray="4 6" />
          <line x1="243" y1="310" x2="257" y2="310" strokeWidth="1.2" />
          <line x1="250" y1="303" x2="250" y2="317" strokeWidth="1.2" />
        </g>

        {/* Stage 2 — Outer C ring (draws on) */}
        <path fill="none" stroke="#c6a062" strokeWidth="2"
          d="M 348 141 A 195 195 0 1 0 348 479"
          style={{ strokeDasharray: 2000, animation: `ecK_ring_out ${A12}` }}
        />

        {/* Stage 2 — Inner C ring (draws on, slightly after outer) */}
        <path fill="none" stroke="#c6a062" strokeWidth="1.4"
          d="M 333 167 A 165 165 0 1 0 333 453"
          style={{ strokeDasharray: 2000, animation: `ecK_ring_in ${A12}` }}
        />

        {/* Stage 2 — Terminal caps connecting inner/outer ring ends */}
        <g fill="none" stroke="#c6a062" strokeWidth="1.8" style={{ animation: `ecK_cap ${A12}` }}>
          <line x1="348" y1="141" x2="333" y2="167" />
          <line x1="348" y1="479" x2="333" y2="453" />
        </g>

        {/* Stage 4a — Inner seal rings (draw on) */}
        <circle fill="none" stroke="#c6a062" strokeWidth="1.2" cx="250" cy="310" r="80"
          style={{ strokeDasharray: 1000, animation: `ecK_seal ${A12}` }} />
        <circle fill="none" stroke="#c6a062" strokeWidth="0.6" cx="250" cy="310" r="68"
          style={{ strokeDasharray: 1000, animation: `ecK_seal ${A12}` }} />

        {/* Stage 4b — Radial spokes (3 staggered batches of 4) */}
        {SPOKES.map((s, i) => (
          <line key={i} fill="none" stroke="#c6a062" strokeWidth="0.65"
            x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            style={{ animation: `${i < 4 ? 'ecK_sp1' : i < 8 ? 'ecK_sp2' : 'ecK_sp3'} ${A12}` }}
          />
        ))}

        {/* Stage 4c — Center symbol: circle + diamond */}
        <g fill="none" stroke="#c6a062" style={{ animation: `ecK_ctr ${A12}` }}>
          <circle cx="250" cy="310" r="28" strokeWidth="1.0" />
          <polygon points="250,288 272,310 250,332 228,310" strokeWidth="0.8" />
        </g>

        {/* Stage 5 — Final ornamental details */}
        <g fill="none" stroke="#c6a062" style={{ animation: `ecK_fin ${A12}` }}>
          <circle cx="348" cy="141" r="4"   strokeWidth="1.2" />
          <circle cx="348" cy="479" r="4"   strokeWidth="1.2" />
          <line x1="42"  y1="310" x2="55"  y2="310" strokeWidth="1.8" />
          <line x1="55"  y1="310" x2="168" y2="310" strokeWidth="0.5" strokeDasharray="3 4" />
          <circle cx="250" cy="310" r="12" strokeWidth="0.7" />
          <path d="M 358 135 A 12 12 0 0 1 340 162" strokeWidth="0.8" />
          <path d="M 358 485 A 12 12 0 0 0 340 458" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};

// --- COMPONENT: HERO (LOCKED) ---
const Hero = () => {
  const [pillarOpen, setPillarOpen] = useState(false);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
  <>
  <section className="calioon-section-hero relative border-t border-[#c6a062]/20">
    <div className="greek-stone-texture-overlay" />
    <div className="greek-museum-vignette" />

    {/* Center vertical divider — fills gap between text and pillar */}
    <div aria-hidden="true" className="hidden lg:block" style={{
      position: 'absolute', left: '50%', top: 0, bottom: 0,
      width: '1px', transform: 'translateX(-50%)',
      background: 'linear-gradient(to bottom, transparent 0%, rgba(198,160,98,0.22) 12%, rgba(198,160,98,0.28) 40%, rgba(198,160,98,0.28) 60%, rgba(198,160,98,0.22) 88%, transparent 100%)',
      pointerEvents: 'none', zIndex: 5,
    }} />


    <div className="calioon-global-container h-full w-full relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:items-center w-full lg:h-full lg:min-h-[calc(100vh-100px)]">
        
        <div className="hero-content-block">
          <div className="flex flex-col gap-0 w-full items-start text-left m-0 p-0">

            {/* Ultra-subtle radial depth glow behind headline */}
            <div aria-hidden="true" style={{
              position: 'absolute', left: '-8%', top: '-5%', width: '72%', height: '60%',
              background: 'radial-gradient(ellipse 70% 65% at 30% 40%, rgba(8,18,42,0.045) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: 0,
            }} />

                        {/* H1 — cinematic line-by-line vertical emergence */}
            <h1 className="text-hero text-white block m-0 p-0 mb-6 w-full overflow-hidden text-left" style={{ position: 'relative', zIndex: 1 }}>
              {[
                { text: "WE DON'T",      delay: 0.10, ls: '0.10em', color: 'inherit' },
                { text: "BUILD BRANDS.", delay: 0.28, ls: '0.03em', color: 'inherit' },
                { text: "WE BUILD",      delay: 0.46, ls: '0.10em', color: '#c6a062' },
              ].map(({ text, delay, ls, color }, li) => (
                <div key={li} className={`hero-line-wrap hero-line-wrap-${li}`} style={{ display: 'block', overflow: 'hidden', lineHeight: '1.12' }}>
                  <motion.span
                    style={{ display: 'block', whiteSpace: 'nowrap', letterSpacing: ls, color, lineHeight: '1.06' }}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {text}
                  </motion.span>
                </div>
              ))}
              {/* EMPIRES. — gold horizontal sweep */}
              <div className="hero-line-wrap hero-line-wrap-empires" style={{ display: 'block', overflow: 'hidden', lineHeight: '1.12' }}>
                <motion.span
                  className="gold-matte-text"
                  style={{ display: 'block', whiteSpace: 'nowrap', letterSpacing: '0.16em', lineHeight: '1.06', filter: 'brightness(1.22)' }}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.90, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
                >
                  EMPIRES.
                </motion.span>
              </div>
            </h1>
            {/* Accent rule */}
            <motion.div
              className="self-center lg:self-start mb-8"
              style={{ height: '1px', width: '120px', background: 'linear-gradient(to right, rgba(198,160,98,0.75) 0%, rgba(198,160,98,0.30) 55%, transparent 100%)', transformOrigin: 'left center' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.60, delay: 1.18, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Paragraph — single unit fade + rise (no word splitting) */}
            <motion.p
              className="hero-para-text text-body-copy text-white/70 max-w-[480px] block w-full m-0 p-0 mb-9 self-start text-left"
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 1.32, ease: [0.22, 1, 0.36, 1] }}
            >
              CALIOON architects category leadership through branding, performance systems, AI automation, and digital empire building.
            </motion.p>

            {/* Buttons — individual staggered entrance */}
            <div className="hero-btns-wrap flex flex-col sm:flex-row gap-[28px] justify-center lg:justify-start items-center w-full m-0 p-0 self-center lg:self-start">

                {/* PRIMARY */}
                <motion.button
                  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                  className="hero-cta-btn hero-cta-primary heading-cinzel bg-[#c6a062] text-black h-[54px] w-full sm:w-[252px] text-[12.5px] font-bold flex items-center justify-center transition-all duration-300 hover:brightness-110"
                  style={{ position: 'relative', overflow: 'hidden', letterSpacing: '0.20em', flexShrink: 0, border: 'none', cursor: 'pointer' }}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.65, delay: 1.60, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', top:5, left:5 }}>
                    <path d="M0,11 L0,0 L11,0" stroke="rgba(0,0,0,0.30)" strokeWidth="1.1" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', top:5, right:5 }}>
                    <path d="M11,11 L11,0 L0,0" stroke="rgba(0,0,0,0.30)" strokeWidth="1.1" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', bottom:5, left:5 }}>
                    <path d="M0,0 L0,11 L11,11" stroke="rgba(0,0,0,0.30)" strokeWidth="1.1" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', bottom:5, right:5 }}>
                    <path d="M11,0 L11,11 L0,11" stroke="rgba(0,0,0,0.30)" strokeWidth="1.1" strokeLinecap="square" />
                  </svg>
                  <span aria-hidden style={{ display:'inline-block', width:'14px', height:'1px', background:'currentColor', opacity:0.42, marginRight:'10px', verticalAlign:'middle' }} />
                  ENTER THE EMPIRE
                  <span aria-hidden style={{ display:'inline-block', width:'14px', height:'1px', background:'currentColor', opacity:0.42, marginLeft:'10px', verticalAlign:'middle' }} />
                  <span aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
                    <span style={{ position:'absolute', top:0, bottom:0, width:'40%', background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.20) 40%,rgba(255,255,255,0.36) 50%,rgba(255,255,255,0.20) 60%,transparent 100%)', animation:'ctaGlassPass 3.0s ease-in-out 2.4s infinite' }} />
                  </span>
                </motion.button>

                {/* SECONDARY */}
                <motion.button
                  onClick={() => setPillarOpen(true)}
                  className="hero-cta-btn heading-cinzel text-[#c6a062] h-[54px] w-full sm:w-[252px] text-[12.5px] font-bold flex items-center justify-center transition-all duration-500 hover:bg-[rgba(198,160,98,0.07)]"
                  style={{ position: 'relative', border: '1px solid rgba(198,160,98,0.40)', letterSpacing: '0.20em', flexShrink: 0, background: 'none', cursor: 'pointer' }}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.65, delay: 1.80, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', top:4, left:4 }}>
                    <path d="M0,11 L0,0 L11,0" stroke="#c6a062" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', top:4, right:4 }}>
                    <path d="M11,11 L11,0 L0,0" stroke="#c6a062" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', bottom:4, left:4 }}>
                    <path d="M0,0 L0,11 L11,11" stroke="#c6a062" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="square" />
                  </svg>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ position:'absolute', bottom:4, right:4 }}>
                    <path d="M11,0 L11,11 L0,11" stroke="#c6a062" strokeWidth="1.1" strokeOpacity="0.70" strokeLinecap="square" />
                  </svg>
                  <span aria-hidden style={{ display:'inline-block', width:'14px', height:'1px', background:'currentColor', opacity:0.55, marginRight:'10px', verticalAlign:'middle' }} />
                  DISCOVER THE PILLARS
                  <span aria-hidden style={{ display:'inline-block', width:'14px', height:'1px', background:'currentColor', opacity:0.55, marginLeft:'10px', verticalAlign:'middle' }} />
                </motion.button>

            </div>

            {/* Credibility strip — hairline sweep + per-item stagger */}
            <div className="hero-cred-strip self-center lg:self-start w-full" style={{ marginTop: '36px' }}>
              <motion.div
                aria-hidden="true"
                className="hero-cred-rule"
                style={{ height: '1px', width: '100%', maxWidth: '480px', background: 'linear-gradient(to right, rgba(198,160,98,0.22), rgba(198,160,98,0.06) 70%, transparent)', marginBottom: '16px', transformOrigin: 'left center' }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 2.08, ease: [0.16, 1, 0.3, 1] }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0', overflow: 'visible' }}>
                {['BRANDING', 'AI AUTOMATION', 'PERFORMANCE', 'SYSTEMS'].map((label, i) => (
                  <motion.span
                    key={i}
                    style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.50, delay: 2.24 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {i > 0 && (
                      <span aria-hidden="true" className="hero-cred-sep" style={{ color: 'rgba(198,160,98,0.50)', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>
                        <svg width="4" height="4" viewBox="0 0 4 4" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                          <circle cx="2" cy="2" r="2" fill="currentColor" />
                        </svg>
                      </span>
                    )}
                    <span className="hero-cred-label" style={{ fontFamily: "'Cinzel', serif", color: 'rgba(198,160,98,0.70)', fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, display: 'inline-block', verticalAlign: 'middle' }}>
                      {label}
                    </span>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full h-full relative" />

      </div>
    </div>

    {/* Mobile deity background */}
    <div className="lg:hidden absolute inset-0 select-none pointer-events-none z-0" aria-hidden="true">
      <video
        autoPlay muted playsInline
        onLoadedMetadata={e => { e.currentTarget.currentTime = 1; }}
        onTimeUpdate={e => {
          const v = e.currentTarget;
          if (v.duration && v.currentTime >= v.duration - 0.15) v.currentTime = 1;
        }}
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'60% center',
          opacity:0.58, filter:'brightness(1.90) contrast(1.10) saturate(0.80)',
        }}>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      {/* Solid cover behind navbar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:'100px', background:'#050A12', zIndex:2 }} />
      {/* Left-side dark shield keeps text readable */}
      <div style={{
        position:'absolute', top:'100px', left:0, right:0, bottom:0, zIndex:1,
        background:'linear-gradient(to right, rgba(5,10,18,0.92) 0%, rgba(5,10,18,0.70) 40%, rgba(5,10,18,0.28) 100%)',
      }} />
      {/* Headline zone: uniform 12% dark wash top-to-bottom over text area */}
      <div style={{
        position:'absolute', top:'100px', left:0, width:'100%', height:'62%', zIndex:1, pointerEvents:'none',
        background:'linear-gradient(to bottom, rgba(5,10,18,0.20) 0%, rgba(5,10,18,0.14) 55%, transparent 100%)',
      }} />
    </div>

    <div className="hidden lg:block absolute right-0 bottom-0 top-[100px] w-[52vw] max-w-[860px] h-[calc(100vh-100px)] select-none pointer-events-none z-20" style={{ transform: 'translateX(11px)' }}>
      <div className="relative w-full h-full">

        {/* IMPERIAL CORINTHIAN PILLAR */}
        <div className="absolute inset-0 z-[25]">
          <div className="relative w-full h-full overflow-hidden">
            {/* ── hero video renders here ── */}
            <video
              autoPlay
              muted
              playsInline
              className="hero-video"
              onLoadedMetadata={e => { e.currentTarget.currentTime = 1; }}
              onTimeUpdate={e => {
                const v = e.currentTarget;
                if (v.duration && v.currentTime >= v.duration - 0.15) v.currentTime = 1;
              }}
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            {/* Full-video navy atmosphere — clear column corridor top-to-bottom, dark sides */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 8, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 44% 86% at 52% 48%, transparent 0%, transparent 28%, rgba(7,16,29,0.18) 50%, rgba(5,10,18,0.62) 72%, rgba(4,8,15,0.94) 88%, rgba(4,8,15,0.99) 100%)',
            }} />
            {/* Pillar glow — full-height warm bloom along entire column */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 34% 86% at 52% 46%, rgba(255,240,195,0.16) 0%, rgba(198,160,98,0.08) 50%, transparent 100%)',
              mixBlendMode: 'screen',
            }} />
            {/* Top edge — minimal seal, just hides the raw video border */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '60px', zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(4,8,15,0.95) 0%, rgba(5,10,18,0.50) 50%, transparent 100%)',
            }} />
            {/* Left edge — hard seal into site content */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '300px', zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(to right, rgba(4,8,15,1.0) 0%, rgba(5,10,18,0.88) 12%, rgba(7,16,29,0.58) 28%, rgba(11,21,38,0.22) 52%, rgba(11,21,38,0.04) 76%, transparent 100%)',
            }} />
            {/* Right edge */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '160px', zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(to left, rgba(4,8,15,0.95) 0%, rgba(7,16,29,0.55) 25%, rgba(11,21,38,0.16) 55%, transparent 100%)',
            }} />
            {/* Bottom edge — thin seal only, leaves pillar base visible */}
            <div aria-hidden="true" style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(4,8,15,0.98) 0%, rgba(5,10,18,0.72) 38%, rgba(7,16,29,0.22) 72%, transparent 100%)',
            }} />
          </div>{/* ── end photo wrapper ──
          REMOVE EVERYTHING BELOW THIS LINE (leftover SVG defs and geometry) ──
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          */}
          <svg viewBox="0 0 1 1" style={{display:'none'}}>
            <defs>

              {/* ── STONE TEXTURE FILTER ──
                  feTurbulence creates organic grain → feDiffuseLighting physically
                  models directional light hitting that surface → multiply onto geometry.
                  This is what makes flat SVG look like carved mineral. */}
              <filter id="stF" x="-3%" y="-3%" width="106%" height="106%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.052 0.019" numOctaves="5" seed="23" result="grain"/>
                <feDiffuseLighting in="grain" lightingColor="#cfc0a0" surfaceScale="4.2" diffuseConstant="1.1" result="lit">
                  <feDistantLight azimuth="228" elevation="50"/>
                </feDiffuseLighting>
                <feBlend in="SourceGraphic" in2="lit" mode="multiply" result="tx"/>
                <feComposite in="tx" in2="SourceAlpha" operator="in"/>
              </filter>

              {/* ── DEEP CARVE SHADOW — drops into carved recesses ── */}
              <filter id="cvF" x="-8%" y="-8%" width="116%" height="116%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2.8" result="bl"/>
                <feOffset dx="1.5" dy="3.5" result="off"/>
                <feFlood floodColor="#030201" floodOpacity="0.96" result="dk"/>
                <feComposite in="dk" in2="off" operator="in" result="sh"/>
                <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>

              {/* SHAFT — brighter lit center to compensate for multiply darkening */}
              <linearGradient id="shG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0e0b08"/>
                <stop offset="5%"   stopColor="#342818"/>
                <stop offset="14%"  stopColor="#6e5c4c"/>
                <stop offset="27%"  stopColor="#aa9888"/>
                <stop offset="44%"  stopColor="#cebcaa"/>
                <stop offset="52%"  stopColor="#daccba"/>
                <stop offset="62%"  stopColor="#bca898"/>
                <stop offset="78%"  stopColor="#8a7868"/>
                <stop offset="92%"  stopColor="#3e2e20"/>
                <stop offset="100%" stopColor="#0c0906"/>
              </linearGradient>

              {/* CAPITAL — warmer, richer */}
              <linearGradient id="cpG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#100c08"/>
                <stop offset="7%"   stopColor="#34261a"/>
                <stop offset="18%"  stopColor="#705e4c"/>
                <stop offset="34%"  stopColor="#a8967e"/>
                <stop offset="50%"  stopColor="#c8b49a"/>
                <stop offset="66%"  stopColor="#a8967e"/>
                <stop offset="82%"  stopColor="#705e4c"/>
                <stop offset="93%"  stopColor="#34261a"/>
                <stop offset="100%" stopColor="#100c08"/>
              </linearGradient>

              {/* ABACUS — warmest, light-catching slab */}
              <linearGradient id="abG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0e0a06"/>
                <stop offset="4%"   stopColor="#3a2e1e"/>
                <stop offset="13%"  stopColor="#8c7a68"/>
                <stop offset="30%"  stopColor="#c0aea0"/>
                <stop offset="50%"  stopColor="#d8c8b8"/>
                <stop offset="70%"  stopColor="#c0aea0"/>
                <stop offset="87%"  stopColor="#8c7a68"/>
                <stop offset="96%"  stopColor="#3a2e1e"/>
                <stop offset="100%" stopColor="#0e0a06"/>
              </linearGradient>

              {/* BASE */}
              <linearGradient id="baG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#100e0c"/>
                <stop offset="8%"   stopColor="#42382e"/>
                <stop offset="24%"  stopColor="#7e7264"/>
                <stop offset="46%"  stopColor="#a89a8e"/>
                <stop offset="50%"  stopColor="#b4a89a"/>
                <stop offset="54%"  stopColor="#a89a8e"/>
                <stop offset="76%"  stopColor="#7e7264"/>
                <stop offset="92%"  stopColor="#42382e"/>
                <stop offset="100%" stopColor="#100e0c"/>
              </linearGradient>

              {/* VERTICAL CINEMATIC LIGHT */}
              <linearGradient id="vtG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.20"/>
                <stop offset="10%"  stopColor="#ffffff" stopOpacity="0.08"/>
                <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.01"/>
                <stop offset="75%"  stopColor="#000000" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.50"/>
              </linearGradient>

              {/* FLUTE — near-black at carved center for maximum depth */}
              <linearGradient id="flG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#201810" stopOpacity="0.55"/>
                <stop offset="22%"  stopColor="#0c0806" stopOpacity="0.90"/>
                <stop offset="50%"  stopColor="#020100" stopOpacity="0.98"/>
                <stop offset="78%"  stopColor="#0c0806" stopOpacity="0.90"/>
                <stop offset="100%" stopColor="#201810" stopOpacity="0.55"/>
              </linearGradient>

              {/* ARRIS — bright stone ridge catch-light */}
              <linearGradient id="arG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#e8dcc8" stopOpacity="0.0"/>
                <stop offset="50%"  stopColor="#f8eedd" stopOpacity="0.60"/>
                <stop offset="100%" stopColor="#e8dcc8" stopOpacity="0.0"/>
              </linearGradient>

              {/* LEAF — darker base for deeper carved look */}
              <linearGradient id="lfG" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%"   stopColor="#6a5848"/>
                <stop offset="50%"  stopColor="#4c3c2c"/>
                <stop offset="100%" stopColor="#241a10"/>
              </linearGradient>

              {/* VOLUTE */}
              <linearGradient id="vlG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#a09080"/>
                <stop offset="45%"  stopColor="#705e4e"/>
                <stop offset="100%" stopColor="#342418"/>
              </linearGradient>

              {/* GOLD CROWN */}
              <linearGradient id="gcH" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#c6a062" stopOpacity="0.0"/>
                <stop offset="18%"  stopColor="#c6a062" stopOpacity="0.22"/>
                <stop offset="50%"  stopColor="#e0be76" stopOpacity="0.50"/>
                <stop offset="82%"  stopColor="#c6a062" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="#c6a062" stopOpacity="0.0"/>
              </linearGradient>

              {/* LEFT RIM LIGHT */}
              <linearGradient id="lrG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#c6a062" stopOpacity="0.32"/>
                <stop offset="100%" stopColor="#c6a062" stopOpacity="0.0"/>
              </linearGradient>

            </defs>

            {/* ══════════════════════════════════════════════
                STONE TEXTURE WRAP — everything inside this
                group gets the feTurbulence+feDiffuseLighting
                stone surface applied
            ══════════════════════════════════════════════ */}
            <g filter="url(#stF)">

              {/* ── ABACUS ── */}
              <rect x="-24" y="0" width="316" height="28" fill="url(#abG)"/>
              <rect x="-24" y="0" width="316" height="2.5" fill="#f8eedd" fillOpacity="0.22"/>
              <rect x="-24" y="0" width="316" height="28" fill="url(#vtG)"/>
              <rect x="-24" y="26" width="316" height="2" fill="#050302" fillOpacity="0.92"/>
              <rect x="-24" y="0" width="316" height="28" fill="url(#gcH)"/>

              {/* Ovolo curve below abacus */}
              <path d="M-16,28 C-16,38 -5,45 8,47 L260,47 C273,45 284,38 284,28 Z" fill="url(#cpG)"/>
              <path d="M-16,28 C-13,37 -3,43 8,45" stroke="#f0e4ce" strokeWidth="0.7" strokeOpacity="0.25" fill="none"/>
              <path d="M284,28 C281,37 271,43 260,45" stroke="#f0e4ce" strokeWidth="0.7" strokeOpacity="0.25" fill="none"/>

              {/* Egg-and-dart */}
              <rect x="4" y="47" width="260" height="7" fill="#26180e" fillOpacity="0.60"/>
              {Array.from({length: 13}, (_, j) => (
                <g key={j}>
                  <ellipse cx={10+j*20} cy={50.5} rx={5.5} ry={3.2} fill="#786044" fillOpacity="0.70"/>
                  <line x1={20+j*20} y1="47" x2={20+j*20} y2="54" stroke="#100c08" strokeWidth="0.9" strokeOpacity="0.88"/>
                </g>
              ))}

              {/* Bead strip */}
              <rect x="6" y="54" width="256" height="4" fill="#2e2018" fillOpacity="0.65"/>
              {Array.from({length: 22}, (_, j) => (
                <circle key={j} cx={12+j*11} cy={56} r={1.6} fill="#8a7a60" fillOpacity="0.45"/>
              ))}

              {/* ── CAPITAL BELL ── */}
              <path d="M6,58 L262,58 L246,208 L22,208 Z" fill="url(#cpG)"/>
              <path d="M6,58 L262,58 L246,208 L22,208 Z" fill="url(#vtG)"/>
              <path d="M6,58 L22,208 L36,208 L18,58 Z" fill="#040202" fillOpacity="0.60"/>
              <path d="M262,58 L246,208 L232,208 L250,58 Z" fill="#040202" fillOpacity="0.60"/>
              {[92,124,158,186].map((y, i) => (
                <path key={i} d={`M${22+(y-58)*0.09},${y} L${246-(y-58)*0.09},${y}`}
                  stroke="#140e08" strokeWidth="0.4" strokeOpacity={0.20-i*0.03} fill="none"/>
              ))}

              {/* ── LOWER ACANTHUS LEAVES ── */}

              {/* Far-left */}
              <path d="M22,208 C20,190 18,173 20,157 C22,142 29,132 39,130 C46,128 53,134 55,146 C57,134 64,128 73,131 C83,136 85,152 81,168 C77,184 63,197 48,208 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M22,208 C21,192 20,175 22,160 C24,145 31,137 40,135"
                stroke="#d4c4ac" strokeWidth="0.7" strokeOpacity="0.40" fill="none"/>
              <path d="M38,168 C29,163 19,160 13,163 C19,157 30,158 38,162 Z" fill="#080402" fillOpacity="0.88"/>
              <path d="M36,149 C27,144 17,140 12,143 C18,137 29,138 36,142 Z" fill="#080402" fillOpacity="0.84"/>
              <path d="M55,168 C64,163 73,160 78,163 C72,157 62,158 55,162 Z" fill="#080402" fillOpacity="0.80"/>

              {/* Center-left — dominant */}
              <path d="M78,208 C74,186 68,167 66,148 C64,131 71,119 82,115 C91,111 100,117 102,130 C104,117 113,111 124,116 C136,122 138,138 134,155 C130,172 120,190 108,208 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M82,208 C79,190 75,171 74,153 C73,136 78,125 87,122 C93,120 100,125 102,137"
                stroke="#9a8a72" strokeWidth="1.5" strokeOpacity="0.48" fill="none"/>
              <path d="M101,208 C99,186 97,166 97,148 C97,131 99,120 105,115"
                stroke="#ddd0b8" strokeWidth="1.1" strokeOpacity="0.60" fill="none"/>
              <path d="M85,158 C75,153 65,149 58,153 C65,146 76,148 85,152 Z" fill="#080402" fillOpacity="0.92"/>
              <path d="M81,137 C71,132 61,128 55,131 C62,125 73,126 81,130 Z" fill="#080402" fillOpacity="0.88"/>
              <path d="M117,158 C127,153 137,149 143,153 C136,146 125,148 117,152 Z" fill="#080402" fillOpacity="0.92"/>
              <path d="M121,137 C131,132 141,128 147,131 C140,125 129,126 121,130 Z" fill="#080402" fillOpacity="0.88"/>

              {/* Center-right */}
              <path d="M148,208 C144,186 138,167 136,148 C134,131 141,119 152,115 C161,111 170,117 172,130 C174,117 183,111 194,116 C206,122 208,138 204,155 C200,172 190,190 178,208 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M171,208 C169,186 167,166 167,148 C167,131 169,120 175,115"
                stroke="#ddd0b8" strokeWidth="1.1" strokeOpacity="0.56" fill="none"/>
              <path d="M153,158 C143,153 133,149 127,153 C134,146 145,148 153,152 Z" fill="#080402" fillOpacity="0.92"/>
              <path d="M187,158 C197,153 207,149 213,153 C206,146 195,148 187,152 Z" fill="#080402" fillOpacity="0.92"/>
              <path d="M157,137 C147,132 137,128 131,131 C138,125 149,126 157,130 Z" fill="#080402" fillOpacity="0.88"/>
              <path d="M183,137 C193,132 203,128 209,131 C202,125 191,126 183,130 Z" fill="#080402" fillOpacity="0.88"/>

              {/* Far-right */}
              <path d="M220,208 C222,190 224,173 222,157 C220,142 213,132 203,130 C196,128 189,134 187,146 C185,134 178,128 169,131 C159,136 157,152 161,168 C165,184 179,197 194,208 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M220,208 C221,192 222,175 220,160 C218,145 211,137 202,135"
                stroke="#d4c4ac" strokeWidth="0.7" strokeOpacity="0.38" fill="none"/>
              <path d="M198,168 C207,163 216,160 222,163 C216,157 205,158 198,162 Z" fill="#080402" fillOpacity="0.78"/>

              {/* ── UPPER LEAVES ── */}

              {/* Left upper */}
              <path d="M60,124 C54,112 50,99 52,84 C54,72 61,66 68,66 C75,64 82,70 82,83 C82,70 88,64 95,67 C103,72 105,86 101,100 C97,113 90,122 81,128 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M80,126 C78,111 76,96 76,82 C76,70 78,64 82,64"
                stroke="#c8b89c" strokeWidth="0.9" strokeOpacity="0.45" fill="none"/>
              <path d="M65,97 C56,92 47,89 42,92 C49,86 58,87 65,91 Z" fill="#080402" fillOpacity="0.84"/>
              <path d="M93,97 C102,92 111,89 116,92 C109,86 100,87 93,91 Z" fill="#080402" fillOpacity="0.82"/>

              {/* Center upper — tallest */}
              <path d="M112,109 C108,94 106,80 108,66 C110,54 117,48 124,48 C131,46 138,53 138,66 C138,53 145,46 152,49 C160,54 162,68 158,82 C154,96 147,107 138,113 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M133,111 C131,95 129,79 129,65 C129,53 131,47 135,47"
                stroke="#e0d0b8" strokeWidth="1.0" strokeOpacity="0.58" fill="none"/>
              <path d="M116,79 C107,74 98,71 93,74 C100,68 110,69 116,73 Z" fill="#060300" fillOpacity="0.86"/>
              <path d="M150,79 C159,74 168,71 173,74 C166,68 156,69 150,73 Z" fill="#060300" fillOpacity="0.84"/>
              <path d="M113,62 C104,57 96,54 92,58 C98,52 108,53 114,57 Z" fill="#060300" fillOpacity="0.80"/>
              <path d="M153,62 C162,57 170,54 174,58 C168,52 158,53 152,57 Z" fill="#060300" fillOpacity="0.78"/>

              {/* Right upper */}
              <path d="M186,124 C192,112 196,99 194,84 C192,72 185,66 178,66 C171,64 164,70 164,83 C164,70 158,64 151,67 C143,72 141,86 145,100 C149,113 156,122 165,128 Z"
                fill="url(#lfG)" filter="url(#cvF)"/>
              <path d="M166,126 C168,111 170,96 170,82 C170,70 168,64 164,64"
                stroke="#c8b89c" strokeWidth="0.9" strokeOpacity="0.42" fill="none"/>

              {/* ── CAULICOLES ── */}
              <path d="M70,122 C59,118 47,116 36,120 C27,124 25,133 30,143 C35,153 47,154 57,148 C64,143 62,133 55,131"
                stroke="#8a7a60" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path d="M70,122 C61,116 50,114 40,118 C32,121 29,130 34,138"
                stroke="#d8c8a8" strokeWidth="0.75" strokeOpacity="0.40" fill="none" strokeLinecap="round"/>
              <path d="M196,122 C207,118 219,116 230,120 C239,124 241,133 236,143 C231,153 219,154 209,148 C202,143 204,133 211,131"
                stroke="#8a7a60" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path d="M196,122 C205,116 216,114 226,118 C234,121 237,130 232,138"
                stroke="#d8c8a8" strokeWidth="0.75" strokeOpacity="0.40" fill="none" strokeLinecap="round"/>

              {/* ── VOLUTES ── */}
              <path d="M20,58 C-18,58 -34,95 -17,140 C-9,161 9,174 32,165 C50,157 52,137 37,129 C26,122 14,129 16,144 C18,156 31,157 33,148"
                fill="url(#vlG)" stroke="#8a7a62" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M20,58 L6,54 C-8,52 -18,64 -20,78" fill="#0e0a06" fillOpacity="0.35"/>
              <path d="M18,72 C2,72 -9,91 -3,112 C1,126 14,132 26,127 C35,122 35,109 26,105"
                stroke="#c8ba9a" strokeWidth="0.9" strokeOpacity="0.50" fill="none"/>
              <path d="M16,86 C6,86 0,97 6,109 C10,116 22,119 29,111"
                stroke="#bca88e" strokeWidth="0.7" strokeOpacity="0.42" fill="none"/>
              <path d="M12,98 C8,98 6,106 11,113"
                stroke="#b0a080" strokeWidth="0.5" strokeOpacity="0.35" fill="none"/>
              <path d="M20,60 C7,63 -2,76 -4,91"
                stroke="#f0e4ce" strokeWidth="0.8" strokeOpacity="0.22" fill="none"/>

              <path d="M248,58 C286,58 302,95 285,140 C277,161 259,174 236,165 C218,157 216,137 231,129 C242,122 254,129 252,144 C250,156 237,157 235,148"
                fill="url(#vlG)" stroke="#8a7a62" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M248,58 L262,54 C276,52 286,64 288,78" fill="#0e0a06" fillOpacity="0.35"/>
              <path d="M250,72 C266,72 277,91 271,112 C267,126 254,132 242,127 C233,122 233,109 242,105"
                stroke="#c8ba9a" strokeWidth="0.9" strokeOpacity="0.50" fill="none"/>
              <path d="M252,86 C262,86 268,97 262,109 C258,116 246,119 239,111"
                stroke="#bca88e" strokeWidth="0.7" strokeOpacity="0.42" fill="none"/>
              <path d="M248,60 C261,63 270,76 272,91"
                stroke="#f0e4ce" strokeWidth="0.8" strokeOpacity="0.22" fill="none"/>

              {/* ── ROSETTE ── */}
              <circle cx="134" cy="61" r="9.5" fill="#1a1208" stroke="#907e68" strokeWidth="1.6" strokeOpacity="0.72"/>
              <circle cx="134" cy="61" r="5.5" fill="#604e3c" fillOpacity="0.68"/>
              <circle cx="134" cy="61" r="2.8" fill="#c8b89e" fillOpacity="0.58"/>
              {Array.from({length: 8}, (_, j) => {
                const a = j * 45 * Math.PI / 180;
                return <line key={j}
                  x1={134+Math.cos(a)*7} y1={61+Math.sin(a)*7}
                  x2={134+Math.cos(a)*11} y2={61+Math.sin(a)*11}
                  stroke="#9a8c72" strokeWidth="1.2" strokeOpacity="0.68"/>;
              })}

              {/* Capital inter-leaf shadow valleys */}
              <path d="M134,206 C129,192 126,178 124,165 C122,153 124,141 131,136"
                stroke="#040200" strokeWidth="4" strokeOpacity="0.45" fill="none"/>
              <path d="M134,206 C139,192 142,178 144,165 C146,153 144,141 137,136"
                stroke="#040200" strokeWidth="4" strokeOpacity="0.45" fill="none"/>
              <path d="M78,208 C72,198 68,186 68,174" stroke="#040200" strokeWidth="2.5" strokeOpacity="0.38" fill="none"/>
              <path d="M190,208 C196,198 200,186 200,174" stroke="#040200" strokeWidth="2.5" strokeOpacity="0.38" fill="none"/>

              {/* ── NECK MOLDING ── */}
              <rect x="22" y="206" width="224" height="5" fill="#201a12"/>
              <rect x="22" y="211" width="224" height="3.5" fill="#5a5040"/>
              {Array.from({length: 18}, (_, j) => (
                <circle key={j} cx={29+j*12} cy={213} r={1.8} fill="#9a8c72" fillOpacity="0.45"/>
              ))}
              <rect x="22" y="214" width="224" height="2.5" fill="#201a12"/>

              {/* ── SHAFT ── */}
              <rect x="22" y="217" width="224" height="794" fill="url(#shG)"/>
              <rect x="22" y="217" width="224" height="794" fill="url(#vtG)"/>

              {/* FLUTING — 20 channels, near-black grooves */}
              {Array.from({length: 20}, (_, j) => {
                const pitch = 224 / 20;
                const x = 22 + j * pitch;
                const fw = pitch * 0.64;
                const rw = pitch * 0.36;
                return (
                  <g key={j}>
                    <rect x={x} y="217" width={fw} height="794" fill="url(#flG)"/>
                    <rect x={x+fw} y="217" width={rw} height="794" fill="url(#arG)"/>
                  </g>
                );
              })}

              {/* Cylindrical mass — deep dark edges */}
              <rect x="22" y="217" width="40" height="794" fill="#040200" fillOpacity="0.62"/>
              <rect x="206" y="217" width="40" height="794" fill="#040200" fillOpacity="0.62"/>
              <rect x="22" y="217" width="18" height="794" fill="#040200" fillOpacity="0.36"/>
              <rect x="228" y="217" width="18" height="794" fill="#040200" fillOpacity="0.36"/>

              {/* Left rim catch-light */}
              <rect x="22" y="217" width="5" height="794" fill="url(#lrG)"/>

              {/* Stone aging cracks — irregular, organic */}
              <path d="M62,314 C67,330 65,347 70,360" stroke="#5a4838" strokeWidth="0.6" strokeOpacity="0.48" fill="none"/>
              <path d="M155,482 Q160,498 158,514" stroke="#5a4838" strokeWidth="0.5" strokeOpacity="0.40" fill="none"/>
              <path d="M90,665 C95,680 93,694 98,706" stroke="#5a4838" strokeWidth="0.5" strokeOpacity="0.38" fill="none"/>
              <path d="M194,564 Q199,578 197,590" stroke="#5a4838" strokeWidth="0.4" strokeOpacity="0.32" fill="none"/>
              <path d="M46,756 Q50,768 48,778" stroke="#5a4838" strokeWidth="0.35" strokeOpacity="0.28" fill="none"/>
              <path d="M168,320 Q172,334 170,346" stroke="#5a4838" strokeWidth="0.4" strokeOpacity="0.30" fill="none"/>
              <path d="M36,540 L40,552" stroke="#5a4838" strokeWidth="0.35" strokeOpacity="0.26" fill="none"/>

              {/* Horizontal stone stress lines */}
              <path d="M24,416 Q82,414 134,415 Q186,414 242,416" stroke="#3e2e1c" strokeWidth="0.45" strokeOpacity="0.22" fill="none"/>
              <path d="M24,630 Q82,628 134,629 Q186,628 242,630" stroke="#3e2e1c" strokeWidth="0.38" strokeOpacity="0.18" fill="none"/>

              {/* ── BASE MOLDINGS ── */}
              <rect x="18" y="1011" width="232" height="13" fill="url(#baG)"/>
              <path d="M18,1011 Q18,1017 24,1024 L242,1024 Q248,1017 248,1011"
                stroke="#d8caa8" strokeWidth="0.65" strokeOpacity="0.28" fill="none"/>
              <rect x="18" y="1011" width="232" height="2" fill="#f8eedc" fillOpacity="0.12"/>

              <path d="M14,1024 C14,1038 20,1044 27,1044 L241,1044 C248,1044 254,1038 254,1024 Z"
                fill="url(#baG)"/>
              <path d="M14,1024 C16,1037 22,1042 29,1042" stroke="#060402" strokeWidth="0.9" strokeOpacity="0.60" fill="none"/>
              <path d="M254,1024 C252,1037 246,1042 239,1042" stroke="#060402" strokeWidth="0.9" strokeOpacity="0.60" fill="none"/>

              <rect x="8" y="1044" width="252" height="15" fill="url(#abG)"/>
              <path d="M8,1044 Q8,1051 14,1059 L254,1059 Q260,1051 260,1044"
                stroke="#d8caa8" strokeWidth="0.65" strokeOpacity="0.22" fill="none"/>
              <rect x="8" y="1044" width="252" height="2.5" fill="#f8eedc" fillOpacity="0.14"/>

              <path d="M20,1046 L24,1042 L29,1046 L29,1042 L34,1042 L34,1046 L39,1046"
                stroke="#5a4a38" strokeWidth="0.7" strokeOpacity="0.55" fill="none"/>
              <path d="M229,1046 L233,1042 L238,1046 L238,1042 L243,1042 L243,1046 L248,1046"
                stroke="#5a4a38" strokeWidth="0.7" strokeOpacity="0.55" fill="none"/>

              <rect x="0" y="1059" width="268" height="20" fill="url(#abG)"/>
              <rect x="0" y="1059" width="268" height="2.5" fill="#f8eedc" fillOpacity="0.16"/>
              <rect x="0" y="1077" width="268" height="2" fill="#050302" fillOpacity="0.94"/>
              <rect x="0" y="1059" width="268" height="20" fill="url(#gcH)"/>

            </g>{/* end stone texture group */}

            {/* Rim light is outside the multiply-filter to stay vivid */}
            <rect x="22" y="217" width="3" height="794" fill="url(#lrG)" opacity="0.7"/>

          </svg>
        </div>

        {/* Bottom blend */}
        <div className="absolute bottom-0 left-0 right-0 h-[65px] bg-gradient-to-t from-[#050A12] to-transparent pointer-events-none z-[30]" />

      </div>
    </div>

  </section>

  {/* ── PILLARS NAV OVERLAY ── */}
  {createPortal(
    <AnimatePresence>
      {pillarOpen && (
        <motion.div
          key="pillars-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setPillarOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(4,8,15,0.93)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '520px',
              padding: 'clamp(36px,6vw,64px) clamp(24px,5vw,48px)',
              textAlign: 'center',
            }}
          >
            {/* Close */}
            <button
              onClick={() => setPillarOpen(false)}
              aria-label="Close navigation"
              style={{
                position: 'absolute', top: 0, right: 'clamp(20px,4vw,40px)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(198,160,98,0.55)', fontSize: '20px',
                fontFamily: "'Cinzel',serif", lineHeight: 1, padding: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c6a062'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(198,160,98,0.55)'}
            >✕</button>

            {/* Eyebrow */}
            <div style={{ marginBottom: 'clamp(24px,4vw,40px)' }}>
              <span style={{
                fontFamily: "'Cinzel',serif", fontSize: 'clamp(8px,1.8vw,11px)',
                letterSpacing: '0.32em', color: 'rgba(198,160,98,0.55)',
                textTransform: 'uppercase', display: 'block',
              }}>THE PILLARS OF CALIOON</span>
              <div style={{
                margin: '10px auto 0', height: '1px', width: '60px',
                background: 'linear-gradient(90deg,transparent,rgba(198,160,98,0.60),transparent)',
              }} />
            </div>

            {/* Nav items */}
            <nav>
              {[
                { label: 'Philosophy',   id: 'philosophy'  },
                { label: 'Domains',      id: 'domains'     },
                { label: 'Our Gods',     id: 'ourgods'     },
                { label: 'Process',      id: 'process'     },
                { label: 'Case Studies', id: 'casestudies' },
                { label: 'Contact',      id: 'contact'     },
              ].map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.30, delay: 0.08 + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => { scrollTo(id); setPillarOpen(false); }}
                  style={{
                    display: 'block', width: '100%',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Cinzel',serif",
                    fontSize: 'clamp(14px,3.2vw,20px)',
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'rgba(253,240,213,0.82)',
                    padding: 'clamp(12px,2.4vw,18px) 0',
                    borderBottom: i < 5 ? '1px solid rgba(198,160,98,0.10)' : 'none',
                    transition: 'color 0.22s ease, letter-spacing 0.22s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c6a062'; e.currentTarget.style.letterSpacing = '0.22em'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(253,240,213,0.82)'; e.currentTarget.style.letterSpacing = '0.16em'; }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom ornament */}
            <div style={{
              marginTop: 'clamp(20px,3.5vw,32px)',
              color: 'rgba(198,160,98,0.35)', fontSize: '13px',
              letterSpacing: '0.05em', fontFamily: 'monospace',
            }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )}
  </>
  );
};

// --- COMPONENT: PHILOSOPHY (LOCKED) ---
const PHILOSOPHY_ITEMS = [
  { t: "We don't follow trends.", s: "We architect industry influence." },
  { t: "We don't run ads.", s: "We engineer precise demand." },
  { t: "We don't manage brands.", s: "We turn scale into empires." },
  { t: "We don't chase attention.", s: "We globally command it." },
];
const REVEAL_DUR = 0.29;
const HEAD_SUB_GAP = 0.08;
const ITEM_GAP = 0.12;
const ITEM_CYCLE = REVEAL_DUR + HEAD_SUB_GAP + REVEAL_DUR + ITEM_GAP;

const Philosophy = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
  <section id="philosophy" ref={sectionRef} className="calioon-section-philosophy border-t border-[#c6a062]/20 relative">
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'url(/laxman.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
      opacity: 0.32,
      filter: 'blur(0.6px)',
    }} />
    <div className="greek-stone-texture-overlay" />
    <div className="greek-temple-wall-grain" />
    <div className="museum-navy-mist-ambient" />
    <div className="greek-museum-vignette" />


    <div className="calioon-global-container relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        <div className="philosophy-left-content-block">
          <div className="space-y-6 text-left relative z-10 w-full">

            {/* Label — each character blurs in sequentially */}
            <span className="text-label-caps text-[#c6a062]" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {"The Philosophy".split('').map((char, ci) =>
                char === ' ' ? (
                  <span key={ci} style={{ display: 'inline-block', width: '0.45em' }} />
                ) : (
                  <motion.span
                    key={ci}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 14, filter: 'blur(7px)' }}
                    animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 14, filter: 'blur(7px)' }}
                    transition={{ duration: 0.26, delay: ci * 0.042, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </span>
            <div style={{ marginTop:'8px', marginBottom:'16px', textAlign:'left', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>

            {/* Heading — each line rises from behind a hidden overflow mask */}
            <h2 className="text-section-title text-white block">
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '108%', opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: '108%', opacity: 0 }}
                  transition={{ duration: 0.72, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  In Ancient Greece,
                </motion.span>
              </span>
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '108%', opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: '108%', opacity: 0 }}
                  transition={{ duration: 0.72, delay: 0.53, ease: [0.16, 1, 0.3, 1] }}
                >
                  Power Wasn't Given.
                </motion.span>
              </span>
              {/* Gold line — left-to-right wipe reveal */}
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  className="gold-matte-text"
                  style={{ display: 'block' }}
                  initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
                  animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
                  transition={{ duration: 0.88, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                >
                  Power Was Claimed.
                </motion.span>
              </span>

            </h2>
            <div style={{ marginTop:'8px', textAlign:'left', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>

            {/* Paragraph — word by word soft fade + rise */}
            <p className="text-body-copy text-white/60 max-w-full" style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.3em', rowGap: '0.15em' }}>
              {"At CALIOON, we operate with the absolute conviction that market leadership belongs solely to those who command it via absolute operational dominance.".split(' ').map((word, wi) => (
                <motion.span
                  key={wi}
                  style={{ display: 'inline-block' }}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.34, delay: 1.08 + wi * 0.048, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </p>

          </div>
        </div>
        
        <div className="w-full relative z-20 pt-[20px] pb-[20px] lg:ml-9" style={{ background: 'rgba(3, 6, 12, 0.20)', backdropFilter: 'blur(3px)' }}>

          {/* ── Greek Temple Corner Brackets ── */}

          {/* TOP-LEFT */}
          <svg aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none"
            style={{ position:'absolute', top:0, left:0, pointerEvents:'none', zIndex:10 }}>
            {/* Outer L-bracket */}
            <polyline points="72,1 1,1 1,72" stroke="rgba(198,160,98,0.70)" strokeWidth="1.2"/>
            {/* Inner echo bracket */}
            <polyline points="72,7 7,7 7,72" stroke="rgba(198,160,98,0.22)" strokeWidth="0.6"/>
            {/* Meander strip — horizontal arm */}
            <polyline points="18,1 18,7 24,7 24,1 30,1 30,7 36,7 36,1 42,1 42,7 48,7 48,1"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            {/* Meander strip — vertical arm */}
            <polyline points="1,18 7,18 7,24 1,24 1,30 7,30 7,36 1,36 1,42 7,42 7,48 1,48"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            {/* Corner diamond */}
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255,224,140,0.95)" transform="rotate(45 1 1)"/>
          </svg>

          {/* TOP-RIGHT */}
          <svg aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none"
            style={{ position:'absolute', top:0, right:0, pointerEvents:'none', zIndex:10 }}>
            <polyline points="0,1 71,1 71,72" stroke="rgba(198,160,98,0.70)" strokeWidth="1.2"/>
            <polyline points="0,7 65,7 65,72" stroke="rgba(198,160,98,0.22)" strokeWidth="0.6"/>
            <polyline points="54,1 54,7 48,7 48,1 42,1 42,7 36,7 36,1 30,1 30,7 24,7 24,1"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <polyline points="71,18 65,18 65,24 71,24 71,30 65,30 65,36 71,36 71,42 65,42 65,48 71,48"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255,224,140,0.95)" transform="rotate(45 71 1)"/>
          </svg>

          {/* BOTTOM-LEFT */}
          <svg aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none"
            style={{ position:'absolute', bottom:0, left:0, pointerEvents:'none', zIndex:10 }}>
            <polyline points="72,71 1,71 1,0" stroke="rgba(198,160,98,0.70)" strokeWidth="1.2"/>
            <polyline points="72,65 7,65 7,0" stroke="rgba(198,160,98,0.22)" strokeWidth="0.6"/>
            <polyline points="18,71 18,65 24,65 24,71 30,71 30,65 36,65 36,71 42,71 42,65 48,65 48,71"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <polyline points="1,54 7,54 7,48 1,48 1,42 7,42 7,36 1,36 1,30 7,30 7,24 1,24"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255,224,140,0.95)" transform="rotate(45 1 71)"/>
          </svg>

          {/* BOTTOM-RIGHT */}
          <svg aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none"
            style={{ position:'absolute', bottom:0, right:0, pointerEvents:'none', zIndex:10 }}>
            <polyline points="0,71 71,71 71,0" stroke="rgba(198,160,98,0.70)" strokeWidth="1.2"/>
            <polyline points="0,65 65,65 65,0" stroke="rgba(198,160,98,0.22)" strokeWidth="0.6"/>
            <polyline points="54,71 54,65 48,65 48,71 42,71 42,65 36,65 36,71 30,71 30,65 24,65 24,71"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <polyline points="71,54 65,54 65,48 71,48 71,42 65,42 65,36 71,36 71,30 65,30 65,24 71,24"
              fill="none" stroke="rgba(198,160,98,0.50)" strokeWidth="0.85"/>
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255,224,140,0.95)" transform="rotate(45 71 71)"/>
          </svg>

          {/* ── Glass top reflection line ── */}
          <div aria-hidden="true" style={{
            position:'absolute', top:0, left:'8px', right:'8px', height:'1px', zIndex:3, pointerEvents:'none',
            background:'linear-gradient(90deg, transparent 5%, rgba(253,240,213,0.10) 30%, rgba(253,240,213,0.20) 50%, rgba(253,240,213,0.10) 70%, transparent 95%)',
          }} />

          {/* ── Gold light sweep every 18s ── */}
          <div aria-hidden="true" style={{ position:'absolute', inset:0, overflow:'hidden', zIndex:2, pointerEvents:'none' }}>
            <div style={{
              position:'absolute', top:0, bottom:0, left:0, width:'50%',
              background:'linear-gradient(90deg, transparent 0%, rgba(210,200,185,0.014) 35%, rgba(255,250,242,0.032) 50%, rgba(210,200,185,0.014) 65%, transparent 100%)',
              animation:'philK_sweep 20s ease-in-out 4s infinite',
            }} />
          </div>

          {/* ── Subtle grain texture ── */}
          <div aria-hidden="true" style={{
            position:'absolute', inset:0, zIndex:1, pointerEvents:'none', opacity:0.032,
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize:'180px 180px',
          }} />


          {/* ── Soft radial gold glow ── */}
          <div aria-hidden="true" style={{
            position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
            background:'radial-gradient(ellipse 75% 60% at 55% 50%, rgba(198,160,98,0.038) 0%, rgba(198,160,98,0.010) 50%, transparent 75%)',
          }} />

          {/* Gold vertical column line */}
          <div className="absolute top-0 bottom-0 pointer-events-none select-none" style={{ left: '30px', width: '1px', background: 'linear-gradient(to bottom, transparent 0%, rgba(198,160,98,0.55) 8%, rgba(198,160,98,0.55) 92%, transparent 100%)', zIndex: 0 }} />

          {PHILOSOPHY_ITEMS.map((item, i) => {
            const d = i * ITEM_CYCLE;
            return (
              <motion.div
                key={i}
                className="group relative"
                whileHover={{ x: 4, filter: 'brightness(1.10)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                style={{ cursor: 'default', willChange: 'transform' }}
              >
                {/* Greek meander divider */}
                <motion.div style={{ display:'flex', alignItems:'center', gap:0, overflow:'hidden' }}
                  initial={{ opacity:0, scaleX:0 }} animate={inView ? { opacity:1, scaleX:1 } : { opacity:0, scaleX:0 }}
                  transition={{ duration:0.32, delay:d, ease:[0.16,1,0.3,1] }}>
                  <svg width="100%" height="10" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true">
                    <line x1="0" y1="5" x2="400" y2="5" stroke="rgba(198,160,98,0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
                    {/* Left meander teeth */}
                    <polyline points="32,5 32,1 38,1 38,9 44,9 44,1 50,1 50,5"
                      fill="none" stroke="rgba(198,160,98,0.55)" strokeWidth="0.9" vectorEffect="non-scaling-stroke"/>
                    {/* Right meander teeth */}
                    <polyline points="350,5 350,1 356,1 356,9 362,9 362,1 368,1 368,5"
                      fill="none" stroke="rgba(198,160,98,0.55)" strokeWidth="0.9" vectorEffect="non-scaling-stroke"/>
                    {/* Centre ornament */}
                    <rect x="197" y="2" width="6" height="6" fill="rgba(198,160,98,0.70)" transform="rotate(45 200 5)" vectorEffect="non-scaling-stroke"/>
                  </svg>
                </motion.div>

                <div className="py-[22px] relative z-10 pl-[56px]">
                  {/* Diamond marker on vertical line */}
                  <motion.div aria-hidden="true" style={{
                    position:'absolute', left:'24px', top:'50%', transform:'translateY(-50%)',
                    pointerEvents:'none', zIndex:12,
                    filter:'drop-shadow(0 0 4px rgba(198,160,98,0.50))',
                  }}
                    initial={{ opacity:0, scale:0 }}
                    animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0 }}
                    transition={{ duration:0.28, delay:d+0.06, ease:[0.16,1,0.3,1] }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.4" stroke="#c6a062" strokeWidth="1" fill="rgba(198,160,98,0.14)"/>
                      <circle cx="7" cy="7" r="1.7" fill="rgba(198,160,98,0.90)"/>
                      <line x1="7" y1="0.4" x2="7" y2="2.1" stroke="#c6a062" strokeWidth="1"/>
                      <line x1="7" y1="11.9" x2="7" y2="13.6" stroke="#c6a062" strokeWidth="1"/>
                    </svg>
                  </motion.div>

                  {/* "We don't…" — italic classical white, smaller */}
                  <motion.p
                    style={{ fontFamily:"'Cinzel',serif", fontStyle:'italic', fontWeight:400,
                      fontSize:'clamp(13px,1.4vw,16px)', letterSpacing:'0.12em',
                      color:'rgba(255,255,255,0.72)', textTransform:'uppercase', margin:'0 0 6px',
                      lineHeight:1.4,
                    }}
                    initial={{ opacity:0, x:-12 }}
                    animate={inView ? { opacity:1, x:0 } : { opacity:0, x:-12 }}
                    transition={{ duration:REVEAL_DUR, delay:d+0.06, ease:[0.16,1,0.3,1] }}
                  >{item.t}</motion.p>

                  {/* "We architect…" — bold gold Cinzel, dominant */}
                  <motion.h4
                    style={{ fontFamily:"'Cinzel',serif", fontWeight:700,
                      fontSize:'clamp(17px,2.0vw,24px)', letterSpacing:'0.08em',
                      background:'linear-gradient(135deg,#FFE88A 0%,#D4AF60 35%,#F0C84A 65%,#C8A040 100%)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                      textTransform:'uppercase', margin:0, lineHeight:1.3,
                    }}
                    initial={{ opacity:0, y:16, filter:'blur(5px)' }}
                    animate={inView ? { opacity:1, y:0, filter:'blur(0px)' } : { opacity:0, y:16, filter:'blur(5px)' }}
                    transition={{ duration:REVEAL_DUR, delay:d+REVEAL_DUR+HEAD_SUB_GAP, ease:[0.16,1,0.3,1] }}
                  >{item.s}</motion.h4>
                </div>
              </motion.div>
            );
          })}

          {/* Closing meander divider */}
          <motion.div style={{ display:'flex', alignItems:'center', overflow:'hidden' }}
            initial={{ opacity:0, scaleX:0 }} animate={inView ? { opacity:1, scaleX:1 } : { opacity:0, scaleX:0 }}
            transition={{ duration:0.32, delay:3*ITEM_CYCLE, ease:[0.16,1,0.3,1] }}>
            <svg width="100%" height="10" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="5" x2="400" y2="5" stroke="rgba(198,160,98,0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
              <polyline points="32,5 32,1 38,1 38,9 44,9 44,1 50,1 50,5"
                fill="none" stroke="rgba(198,160,98,0.55)" strokeWidth="0.9" vectorEffect="non-scaling-stroke"/>
              <polyline points="350,5 350,1 356,1 356,9 362,9 362,1 368,1 368,5"
                fill="none" stroke="rgba(198,160,98,0.55)" strokeWidth="0.9" vectorEffect="non-scaling-stroke"/>
              <rect x="197" y="2" width="6" height="6" fill="rgba(198,160,98,0.70)" transform="rotate(45 200 5)" vectorEffect="non-scaling-stroke"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
};

// --- COMPONENT: DOMAINS (LOCKED) ---
const Domains = () => {
  const domainData = [
    {
      num: "I",
      title: "BRAND OLYMPUS™",
      sub: "Identity & Positioning",
      desc: "Forging sovereign brand architectures that command immediate sector authority and category respect.",
      bullets: ["Visual Rule Systems", "Luxury Category Mapping"]
    },
    {
      num: "II",
      title: "ARES ENGINE™",
      sub: "Performance Domination",
      desc: "Calculated growth vectors scaling modern capital metrics into permanent market acquisition funnels.",
      bullets: ["Predictive Scaled Funnels", "LTV Maximization Systems"]
    },
    {
      num: "III",
      title: "HERMES NETWORK™",
      sub: "Social Mass Syndication",
      desc: "High-output asset deployment mechanics anchoring unassailable relevance across target networks.",
      bullets: ["Omnipresent Distribution", "Algorithmic Infiltration"]
    },
    {
      num: "IV",
      title: "HEPHAESTUS LAB™",
      sub: "AI & Automation Logic",
      desc: "Engineering custom machine intelligence pipelines to fully bypass operational bottleneck frameworks.",
      bullets: ["Custom Tool Processing", "AI Extraction Blueprints"]
    },
    {
      num: "V",
      title: "THE PANTHEON™",
      sub: "Sovereign Consolidation",
      desc: "Unified strategy integration connecting operational metrics, media, and design into market dominance.",
      bullets: ["Architecture Oversight", "Enterprise Market Control"]
    }
  ];

  // Per-card unique content animation signatures
  const CARD_ANIM_CONFIGS = [
    // 0 — BRAND OLYMPUS™ — Brand Seal stamp + left-wipe title
    {
      num:   { initial:{ scale:1.8, opacity:0, filter:'blur(10px)' }, whileInView:{ scale:1, opacity:1, filter:'blur(0px)' }, transition:{ duration:0.52, delay:0.22, ease:[0.34,1.56,0.64,1] } },
      title: { wrap:false, initial:{ clipPath:'inset(0 100% 0 0)' }, whileInView:{ clipPath:'inset(0 0% 0 0)' }, transition:{ duration:0.72, delay:0.36, ease:[0.16,1,0.3,1] } },
      sub:   { initial:{ opacity:0, y:8 }, whileInView:{ opacity:1, y:0 }, transition:{ duration:0.45, delay:0.50, ease:'easeOut' } },
      desc:  { initial:{ opacity:0, y:14 }, whileInView:{ opacity:1, y:0 }, transition:{ duration:0.55, delay:0.60, ease:'easeOut' } },
      bDelay: 0.68,
    },
    // 1 — ARES ENGINE™ — Power punch numeral + scale thrust title + aggressive slide
    {
      num:   { initial:{ scale:0.2, opacity:0 }, whileInView:{ scale:1, opacity:1 }, transition:{ duration:0.52, delay:0.26, ease:[0.34,1.56,0.64,1] } },
      title: { wrap:false, initial:{ y:22, opacity:0, scale:0.88 }, whileInView:{ y:0, opacity:1, scale:1 }, transition:{ duration:0.55, delay:0.40, ease:[0.34,1.56,0.64,1] } },
      sub:   { initial:{ opacity:0, x:-18 }, whileInView:{ opacity:1, x:0 }, transition:{ duration:0.48, delay:0.54, ease:[0.16,1,0.3,1] } },
      desc:  { initial:{ opacity:0, x:-16 }, whileInView:{ opacity:1, x:0 }, transition:{ duration:0.55, delay:0.62, ease:[0.16,1,0.3,1] } },
      bDelay: 0.70,
    },
    // 2 — HERMES NETWORK™ — Signal blur dissolve (everything defocuses in)
    {
      num:   { initial:{ scale:0.55, opacity:0, filter:'blur(14px)' }, whileInView:{ scale:1, opacity:1, filter:'blur(0px)' }, transition:{ duration:0.60, delay:0.30, ease:[0.22,1,0.36,1] } },
      title: { wrap:false, initial:{ opacity:0, filter:'blur(10px)' }, whileInView:{ opacity:1, filter:'blur(0px)' }, transition:{ duration:0.70, delay:0.44, ease:[0.22,1,0.36,1] } },
      sub:   { initial:{ opacity:0, filter:'blur(6px)', y:8 }, whileInView:{ opacity:1, filter:'blur(0px)', y:0 }, transition:{ duration:0.50, delay:0.56, ease:[0.22,1,0.36,1] } },
      desc:  { initial:{ opacity:0, filter:'blur(8px)' }, whileInView:{ opacity:1, filter:'blur(0px)' }, transition:{ duration:0.65, delay:0.64, ease:[0.22,1,0.36,1] } },
      bDelay: 0.74,
    },
    // 3 — HEPHAESTUS LAB™ — Glitch flicker numeral + top→bottom scan clip title
    {
      num:   { initial:{ opacity:0 }, whileInView:{ opacity:[0,0.45,1,0.60,1] }, transition:{ duration:0.68, delay:0.36, times:[0,0.22,0.44,0.72,1] } },
      title: { wrap:false, initial:{ clipPath:'inset(0 0 100% 0)' }, whileInView:{ clipPath:'inset(0 0 0% 0)' }, transition:{ duration:0.65, delay:0.50, ease:[0.16,1,0.3,1] } },
      sub:   { initial:{ opacity:0, y:10, filter:'blur(4px)' }, whileInView:{ opacity:1, y:0, filter:'blur(0px)' }, transition:{ duration:0.48, delay:0.64, ease:[0.22,1,0.36,1] } },
      desc:  { initial:{ opacity:0, filter:'blur(7px)', y:8 }, whileInView:{ opacity:1, filter:'blur(0px)', y:0 }, transition:{ duration:0.62, delay:0.72, ease:[0.22,1,0.36,1] } },
      bDelay: 0.80,
    },
    // 4 — THE PANTHEON™ — Crown descend numeral + scaleX expand title + majestic rise
    {
      num:   { initial:{ y:-30, opacity:0 }, whileInView:{ y:0, opacity:1 }, transition:{ duration:0.70, delay:0.42, ease:[0.34,1.56,0.64,1] } },
      title: { wrap:false, titleStyle:{ transformOrigin:'left center' }, initial:{ scaleX:0, opacity:0 }, whileInView:{ scaleX:1, opacity:1 }, transition:{ duration:0.80, delay:0.56, ease:[0.16,1,0.3,1] } },
      sub:   { initial:{ opacity:0, y:14 }, whileInView:{ opacity:1, y:0 }, transition:{ duration:0.55, delay:0.68, ease:[0.22,1,0.36,1] } },
      desc:  { initial:{ opacity:0, y:18 }, whileInView:{ opacity:1, y:0 }, transition:{ duration:0.65, delay:0.76, ease:[0.22,1,0.36,1] } },
      bDelay: 0.84,
    },
  ];

  return (
    <section id="domains" className="calioon-section-domains-viewport border-t border-[#c6a062]/20 relative">
      <img aria-hidden="true" src="/hn.png" alt=""
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center center',
          opacity:0.45, pointerEvents:'none', zIndex:0,
          filter:'grayscale(80%) brightness(1.10) contrast(0.75)',
          mixBlendMode:'luminosity',
          maskImage:'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.20) 100%)',
          WebkitMaskImage:'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 55%, rgba(0,0,0,0.20) 100%)',
        }}
      />
<div className="greek-stone-texture-overlay" />
      <div className="greek-temple-wall-grain" />
      <div className="museum-navy-mist-ambient" />
      <div className="greek-museum-vignette" />


      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-[#c6a062]/25 animate-manuscript-dust-1" />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-white/15 animate-manuscript-dust-2" />
        <div className="absolute top-1/2 left-2/3 w-1 h-1 bg-[#fdf0d5]/20 animate-manuscript-dust-3" />
      </div>

      <div className="domains-monolith-statue-shade animate-master-statue-float">
        <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M40,800 C70,710 110,670 170,640 C220,610 240,550 230,500 C220,450 200,420 210,350 C220,280 190,200 230,130 C270,60 350,20 440,30 C520,40 570,110 560,190 C550,270 580,310 550,370 C520,430 500,460 510,520 C520,580 550,630 590,690 L590,800 Z" fill="#04080F" />
          <path d="M170,640 C200,620 230,625 240,580 C250,530 280,510 300,460 C320,410 300,370 330,330 C360,290 390,270 400,210 C410,150 450,120 440,30" stroke="#c6a062" strokeWidth="0.8" strokeOpacity="0.22" />
          <path d="M210,350 C195,320 205,270 220,240 C235,210 240,170 265,140" stroke="#fdf0d5" strokeWidth="0.5" strokeOpacity="0.12" />
        </svg>
      </div>

      <div className="calioon-global-container relative z-30 w-full h-full flex flex-col justify-center" style={{ paddingTop:'25px' }}>

        {/* ── SECTION HEADER ── */}
        <div className="w-full text-left mb-8 xl:mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="text-label-caps text-[#c6a062] font-bold tracking-[0.3em] block mb-2" style={{ fontSize:'16px' }}
          >
            OUR DOMAINS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05, ease: LUXURY_EASE }}
            className="text-section-title text-white font-bold uppercase m-0"
          >
            THE DOMAINS OF <span style={{ color:'#c6a062' }}>EMPIRE</span>
          </motion.h2>
          <div style={{ marginTop:'14px', textAlign:'left', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
        </div>

        {/* ── CARDS ── */}
        <div className="domains-premium-matrix-grid">
          {domainData.map((card, idx) => {
            const a = CARD_ANIM_CONFIGS[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.85, delay: idx * 0.08, ease: LUXURY_EASE }}
                whileHover={{ y: -8 }}
                className="domains-row-matte-card group"
              >
                <div className="domains-clean-shimmer" />
                <div className="greek-stone-texture-overlay" />
                <div className="greek-temple-wall-grain" />
                <div className="domain-card-radial-highlight" />
                <div className="domain-card-geo-overlay" aria-hidden="true">
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="40" cy="40" r="34" stroke="rgba(198,160,98,0.1)" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="22" strokeDasharray="3 4" stroke="rgba(253,240,213,0.07)" strokeWidth="0.5" />
                    <circle cx="40" cy="40" r="10" stroke="rgba(198,160,98,0.07)" strokeWidth="0.5" />
                    <line x1="6" y1="40" x2="74" y2="40" stroke="rgba(198,160,98,0.05)" strokeWidth="0.5" />
                    <line x1="40" y1="6" x2="40" y2="74" stroke="rgba(198,160,98,0.05)" strokeWidth="0.5" />
                    <polygon points="40,12 66,56 14,56" stroke="rgba(253,240,213,0.05)" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>

                <div className="space-y-3 relative z-10 w-full flex flex-col justify-start items-start">
                  <div className="w-full pb-[8px]">
                    <motion.span
                      initial={a.num.initial}
                      whileInView={a.num.whileInView}
                      viewport={{ once: true }}
                      transition={a.num.transition}
                      className="heading-cinzel text-[#c6a062] text-[24px] xl:text-[26px] font-bold leading-none tracking-[0.06em] block group-hover:text-[#d4b07a] transition-colors duration-300"
                    >
                      {card.num}
                    </motion.span>
                    <div className="flex items-center gap-2 mt-[6px]">
                      <div className="w-6 h-[1.5px]" style={{ background: 'linear-gradient(90deg, rgba(198,160,98,0.65), rgba(198,160,98,0.1))' }} />
                      <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                  </div>

                  {a.title.wrap ? (
                    <div style={{ overflow: 'hidden', width: '100%' }}>
                      <motion.h3
                        initial={a.title.initial}
                        whileInView={a.title.whileInView}
                        viewport={{ once: true }}
                        transition={a.title.transition}
                        style={a.title.titleStyle || {}}
                        className="heading-cinzel text-[#fdf0d5] tracking-[0.05em] font-bold text-[18px] xl:text-[20px] lg:text-[19px] m-0 group-hover:text-white transition-colors duration-300"
                      >
                        {card.title}
                      </motion.h3>
                    </div>
                  ) : (
                    <motion.h3
                      initial={a.title.initial}
                      whileInView={a.title.whileInView}
                      viewport={{ once: true }}
                      transition={a.title.transition}
                      style={a.title.titleStyle || {}}
                      className="heading-cinzel text-[#fdf0d5] tracking-[0.05em] font-bold text-[18px] xl:text-[20px] lg:text-[19px] m-0 group-hover:text-white transition-colors duration-300"
                    >
                      {card.title}
                    </motion.h3>
                  )}

                  <motion.p
                    initial={a.sub.initial}
                    whileInView={a.sub.whileInView}
                    viewport={{ once: true }}
                    transition={a.sub.transition}
                    className="text-[#c6a062] text-[11px] font-bold tracking-[0.20em] uppercase m-0"
                  >
                    {card.sub}
                  </motion.p>

                  <motion.p
                    initial={a.desc.initial}
                    whileInView={a.desc.whileInView}
                    viewport={{ once: true }}
                    transition={a.desc.transition}
                    className="text-white/60 text-[13px] xl:text-[13.5px] leading-relaxed m-0 font-normal"
                  >
                    {card.desc}
                  </motion.p>
                </div>

                <div className="w-full relative z-10 mt-4 pt-3 border-t border-white/[0.07] flex flex-col justify-end items-start">
                  <ul className="space-y-2 w-full m-0 p-0 list-none">
                    {card.bullets.map((bullet, bIdx) => (
                      <motion.li
                        key={bIdx}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: a.bDelay + bIdx * 0.10, ease: [0.22, 1, 0.36, 1] }}
                        className="text-white/40 group-hover:text-white/60 text-[11.5px] flex items-center gap-2 uppercase tracking-wider font-semibold transition-colors duration-300"
                      >
                        <svg width="5" height="5" viewBox="0 0 6 6" fill="none" className="text-[#c6a062]/50 group-hover:text-[#c6a062] transition-colors duration-300 flex-shrink-0">
                          <polygon points="3,0 6,5 0,5" fill="currentColor" />
                        </svg>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  )
};


// --- COMPONENT: OUR GODS ---
const OurGods = () => {
  const gods = [
    { tag: "MATHY",          n: "ARES",       r: "Founder & CEO",           img: imgZeus,     desc: "Sovereign growth engine, algorithmic visibility leadership, and strategic dominance architecture." },
    { tag: "TAMIL NILAVAN",  n: "APOLLO",     r: "Co-Founder & CMO",        img: imgApollo,   desc: "High-end luxury interfaces, digital design paradigms, and brand asset layouts that visually command." },
    { tag: "GAIYASHREE",     n: "ATHENA",     r: "Marketing Director",       img: imgAthena,   desc: "Brand transformation intelligence, predictive enterprise alignment, and high-tier market positioning." },
    { tag: "RINI",           n: "ARTEMIS",    r: "Director of Partnerships", img: imgRini,     desc: "Razor-sharp targeting intelligence, precision audience acquisition, and strategic hit-rate optimization at elite scale." },
    { tag: "NAYANA SAI",     n: "APHRODITE",  r: "Creative Director",        img: imgNayana,   desc: "Irresistible brand narratives, cultural influence engineering, and audience connection at the highest tier." },
    { tag: "KRITHICK SURYA", n: "POSEIDON",   r: "Director of Sales",        img: imgKarthick, desc: "Relentless market penetration, strategic partnership dominance, and territory expansion at oceanic scale." },
    { tag: "BUBESH PRANAV",  n: "HADES",      r: "Director of Operations",   img: imgHades,    desc: "Data processing metrics, scalable programmatic deployment, tracking models, and absolute ROI mastery." },
    { tag: "LAXMAN",         n: "HEPHAESTUS", r: "Director of Web-Strategy", img: imgLaxman,   desc: "Precision systems architecture, technology infrastructure mastery, and forge-level craftsmanship in every build." },
  ];

  const renderCard = (god, i, baseDelay = 0) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay: i * 0.09 + baseDelay, ease: LUXURY_EASE }}
      className="god-matte-card p-5 flex flex-col group"
    >
      <div className="god-matte-shimmer" />
      <div className="greek-stone-texture-overlay" />
      <div className="greek-temple-wall-grain" />
      <div className="w-full mb-4 relative overflow-hidden z-10" style={{ aspectRatio: '3/4', border: '1px solid rgba(198,160,98,0.45)', boxShadow: '0 0 18px rgba(198,160,98,0.10), inset 0 0 12px rgba(198,160,98,0.04)', transition: 'border-color 0.40s ease, box-shadow 0.40s ease' }}>
        <img src={god.img} alt={god.n} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050A12]/90 z-10 pointer-events-none" />
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(198,160,98,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c6a062]/60 group-hover:border-[#c6a062]/95 transition-colors duration-500 z-20" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c6a062]/60 group-hover:border-[#c6a062]/95 transition-colors duration-500 z-20" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c6a062]/60 group-hover:border-[#c6a062]/95 transition-colors duration-500 z-20" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c6a062]/60 group-hover:border-[#c6a062]/95 transition-colors duration-500 z-20" />
      </div>
      <div className="flex flex-col flex-grow relative z-10">
        <span className="text-[#c6a062] text-[12px] block tracking-[0.18em] uppercase font-bold" style={{ fontFamily: "'Cinzel', serif" }}>{god.tag}</span>
        <div className="w-full h-px my-2" style={{ background: 'linear-gradient(90deg, rgba(198,160,98,0.45), rgba(198,160,98,0.10) 60%, transparent)' }} />
        <h4 className="heading-cinzel text-[#fdf0d5] text-[18px] font-bold tracking-[0.05em] group-hover:text-white transition-colors duration-300">{god.n}</h4>
        <div className="w-full h-px my-2" style={{ background: 'linear-gradient(90deg, rgba(198,160,98,0.30), rgba(198,160,98,0.07) 60%, transparent)' }} />
        <p className="text-[11px] text-[#c6a062] font-bold uppercase tracking-[0.18em] group-hover:text-[#d4b07a] transition-colors duration-300">{god.r}</p>
        <div className="w-full h-px my-2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 60%, transparent)' }} />
        <p className="text-white/55 text-[12px] leading-relaxed mt-auto group-hover:text-white/70 transition-colors duration-400">{god.desc}</p>
      </div>
    </motion.div>
  );

  return (
    <section id="ourgods" className="calioon-section-auto border-t border-[#c6a062]/20 relative">
      <div className="greek-stone-texture-overlay" />
      <div className="greek-temple-wall-grain" />
      <div className="museum-navy-mist-ambient" />
      <div className="greek-museum-vignette" />
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center text-[#c6a062] select-none z-0">
        <svg viewBox="0 0 1200 800" className="w-[100%] h-auto animate-greek-drift">
          <path d="M 200,200 L 400,300 L 600,200 L 800,300 L 1000,200" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="8 8" />
          <circle cx="600" cy="400" r="250" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="calioon-global-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 relative">
          <div aria-hidden style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '200px', background: 'radial-gradient(ellipse at center, rgba(198,160,98,0.07) 0%, transparent 72%)', pointerEvents: 'none', zIndex: 0 }} />
          <motion.span className="text-label-caps text-[#c6a062] block tracking-[0.3em] font-bold" style={{ fontSize: '15px' }} initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 0.70, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}>THE GODS OF CALIOON</motion.span>
          <motion.h2 className="text-section-title text-white text-center font-bold leading-tight uppercase m-0" initial={{ opacity: 0, y: 22, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}>WE DON'T HAVE EMPLOYEES.</motion.h2>
          <motion.h2 className="text-section-title text-center font-bold leading-tight uppercase m-0" initial={{ opacity: 0, y: 22, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}>
            <span className="text-white">WE HAVE </span>
            <motion.span className="gold-matte-text" style={{ display: 'inline-block', filter: 'brightness(1.20)' }} initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }} transition={{ duration: 0.90, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}>ENTITIES OF POWER.</motion.span>
          </motion.h2>
          <motion.div style={{ paddingTop:'6px', maxWidth:'320px', margin:'0 auto', textAlign:'center', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.60, delay:0.88, ease:[0.16,1,0.3,1] }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</motion.div>
        </div>

        {/* Row 1 — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-5">
          {gods.slice(0, 4).map((god, i) => renderCard(god, i))}
        </div>

        {/* Divider */}
        <div className="w-full h-px my-2" style={{ background: 'linear-gradient(90deg, transparent, rgba(198,160,98,0.18) 30%, rgba(198,160,98,0.18) 70%, transparent)' }} />

        {/* Row 2 — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-5">
          {gods.slice(4).map((god, i) => renderCard(god, i, 0.06))}
        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: PROCESS ---
const Process = () => (
  <section id="process" className="calioon-section-auto border-t border-[#c6a062]/20 relative">
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: 'url(/process.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.12,
    }} />
    <div className="greek-stone-texture-overlay" />
    <div className="greek-temple-wall-grain" />
    <div className="museum-navy-mist-ambient" />
    <div className="greek-museum-vignette" />


    <div className="calioon-global-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-center w-full">
        <div className="space-y-6 text-left process-left-col">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.80, delay: 0, ease: LUXURY_EASE }}
          >
            <div className="mb-4" style={{ display:'block', overflow:'hidden' }}>
              <h3 className="text-label-caps text-[#c6a062] block" style={{ fontSize: '15px', marginBottom:'7px' }}>Our Process</h3>
              <div className="section-ornament-line" style={{ color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.80, delay: 0.15, ease: LUXURY_EASE }}
            style={{ marginTop:'-18px' }}
          >
            <h2 className="text-section-title text-white" style={{ marginBottom:'12px' }}>The Ascension <span style={{ color:'#D4AF60' }}>System</span></h2>
            <div className="section-ornament-line" style={{ marginBottom:'24px', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
          </motion.div>
          <motion.p
            className="text-body-copy text-white/60 max-w-[450px] w-full"
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.75, delay: 0.30, ease: LUXURY_EASE }}
          >
            A continuous strategic pipeline deployed to map, verify, and escalate market standing dynamically.
          </motion.p>
        </div>

        <div className="space-y-8 relative border-l border-white/10 pl-10 md:pl-10 text-left z-20">
          {[
            { n: "I",   t: "INITIATION AUDIT",         d: "We completely deconstruct your current architecture to find structural scale leakage." },
            { n: "II",  t: "RECONSTRUCTION SYSTEM",    d: "We deploy complete luxury-tier positioning matrix assets alongside modern technical modules." },
            { n: "III", t: "AMPLIFICATION DEPLOYMENT", d: "High-octane operational tracking acquisition funnels activate across target networks." },
            { n: "IV",  t: "SOCIETAL ASCENSION",       d: "Your systemic infrastructure achieves permanent, unassailable categorical sovereignty." }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.18, ease: LUXURY_EASE }}
              className="relative flex flex-col gap-2 items-start z-10"
            >
              {/* Number circle — spring pop */}
              <motion.div
                className="absolute -left-[34px] md:-left-[54px] top-1 w-7 h-7 rounded-full border border-[#c6a062] bg-[#050A12] flex items-center justify-center text-[12px] text-[#c6a062] font-mono font-bold"
                initial={{ opacity: 0, scale: 0.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 440, damping: 16, delay: i * 0.18 + 0.06 }}
              >
                {step.n}
              </motion.div>

              {/* Title — typewriter: each letter blur-fades in sequentially */}
              <h4 className="text-card-title text-[#c6a062] text-[20px] leading-tight">
                {(() => {
                  const words = step.t.split(' ');
                  let charIdx = 0;
                  return words.map((word, wi) => {
                    const wordStart = charIdx;
                    charIdx += word.length + 1;
                    return (
                      <span key={wi} className="process-step-word" style={{ marginRight: wi < words.length - 1 ? '0.3em' : 0 }}>
                        {word.split('').map((char, ci) => (
                          <motion.span
                            key={ci}
                            style={{ display: 'inline-block' }}
                            initial={{ opacity: 0, filter: 'blur(8px)', y: 5 }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.22,
                              delay: i * 0.18 + 0.14 + (wordStart + ci) * 0.036,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </span>
                    );
                  });
                })()}
              </h4>

              {/* Description — word-by-word soft fade rise */}
              <p className="text-body-copy text-white/50" style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.32em' }}>
                {step.d.split(' ').map((word, wi) => (
                  <motion.span
                    key={wi}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.32,
                      delay: i * 0.18 + 0.20 + wi * 0.055,
                      ease: LUXURY_EASE,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ====================================================
// NEW: ANIMATED STAT COUNTER COMPONENT
// ====================================================
const StatCounter = ({ value, label, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.endsWith("X") ? "X" : value.endsWith("+") ? "+" : value.endsWith("%") ? "%" : "";
  const raw = parseFloat(value.replace(/[^0-9.]/g, ""));
  const isDecimal = value.includes(".");
  const count = useCountUp(String(raw), 1600, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay, ease: LUXURY_EASE }}
      className="border-l border-[#c6a062]/30 pl-5 z-10"
    >
      <h3 className="heading-cinzel text-[32px] sm:text-[42px] font-bold text-white mb-2 tabular-nums tracking-[0.02em]">
        {prefix}{isDecimal ? (isInView ? raw.toFixed(1) : "0.0") : count}{suffix}
      </h3>
      <p className="text-label-caps text-white/40 leading-snug">{label}</p>
    </motion.div>
  );
};

// ====================================================
// IMPERIAL ARCHIVE — Luxury empire case study presentation
// ====================================================
const ImperialArchive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const records = [
    { num: "I",   title: "BRAND OLYMPUS™",   domain: "Identity & Positioning",    result: "+320% Authority", era: "ACTIVE",  icon: "crown", desc: "Forging sovereign brand architectures that command immediate sector authority and category respect.",           tags: ["Visual Rule Systems",       "Luxury Category Mapping"]     },
    { num: "II",  title: "ARES ENGINE™",      domain: "Performance Domination",    result: "+450% ROI Scale", era: "ACTIVE",  icon: "sword", desc: "Calculated growth vectors scaling modern capital metrics into permanent market acquisition funnels.",            tags: ["Predictive Scaled Funnels", "LTV Maximization Systems"]    },
    { num: "III", title: "HERMES NETWORK™",   domain: "Social Mass Syndication",   result: "×3.2 Reach",      era: "SCALING", icon: "wing",  desc: "High-output asset deployment mechanics anchoring unassailable relevance across target networks.",              tags: ["Omnipresent Distribution",  "Algorithmic Infiltration"]    },
    { num: "IV",  title: "HEPHAESTUS LAB™",   domain: "AI & Automation Logic",     result: "7 Industries",    era: "LIVE",    icon: "forge", desc: "Engineering custom machine intelligence pipelines to fully bypass operational bottleneck frameworks.",           tags: ["Custom Tool Processing",    "AI Extraction Blueprints"]    },
    { num: "V",   title: "THE PANTHEON™",     domain: "Sovereign Consolidation",   result: "Full Dominion",   era: "ACTIVE",  icon: "crown", desc: "Unified strategy integration connecting operational metrics, media, and design into total market dominance.",    tags: ["Architecture Oversight",    "Enterprise Market Control"]   },
  ];

  const renderIcon = (type) => {
    if (type === "crown") return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4,17 L6,9 L10,14 L12,7 L14,14 L18,9 L20,17"
          stroke="#c6a062" strokeWidth="1.3" strokeOpacity="0.88" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
        <line x1="4" y1="17" x2="20" y2="17" stroke="#c6a062" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="3.5" y1="19.5" x2="20.5" y2="19.5" stroke="#c6a062" strokeWidth="0.7" strokeOpacity="0.3"/>
        <circle cx="6" cy="9" r="1" fill="#c6a062" fillOpacity="0.75"/>
        <circle cx="12" cy="7" r="1" fill="#c6a062" fillOpacity="0.75"/>
        <circle cx="18" cy="9" r="1" fill="#c6a062" fillOpacity="0.75"/>
      </svg>
    );
    if (type === "sword") return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="3" x2="12" y2="17" stroke="#c6a062" strokeWidth="1.5" strokeOpacity="0.9"/>
        <path d="M10.5,4.5 L12,3 L13.5,4.5 L13.2,14 L12,17 L10.8,14 Z"
          stroke="#c6a062" strokeWidth="0.9" strokeOpacity="0.45" fill="none" strokeLinejoin="round"/>
        <line x1="8.5" y1="13" x2="15.5" y2="13" stroke="#c6a062" strokeWidth="1.4" strokeOpacity="0.85"/>
        <line x1="12" y1="17" x2="12" y2="20.5" stroke="#c6a062" strokeWidth="1.2" strokeOpacity="0.65"/>
        <ellipse cx="12" cy="21" rx="2.2" ry="1.1" stroke="#c6a062" strokeWidth="1" strokeOpacity="0.6" fill="none"/>
      </svg>
    );
    if (type === "wing") return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12,16 C8,13 4,12 2,14 C6,13 9,14 12,17 Z"
          stroke="#c6a062" strokeWidth="1" strokeOpacity="0.7" fill="none" strokeLinejoin="round"/>
        <path d="M12,16 C9,11 5,9 2,10.5 C6,11 9.5,13 12,16 Z"
          stroke="#c6a062" strokeWidth="1.3" strokeOpacity="0.88" fill="none" strokeLinejoin="round"/>
        <path d="M12,16 C10,8.5 7,6.5 4,7.5 C8,9 10.5,12 12,15 Z"
          stroke="#c6a062" strokeWidth="1.1" strokeOpacity="0.78" fill="none" strokeLinejoin="round"/>
        <line x1="12" y1="12" x2="12" y2="21" stroke="#c6a062" strokeWidth="1.2" strokeOpacity="0.45"/>
        <circle cx="12" cy="11.5" r="1.8" stroke="#c6a062" strokeWidth="1" strokeOpacity="0.7" fill="none"/>
      </svg>
    );
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3.5" stroke="#c6a062" strokeWidth="1.3" strokeOpacity="0.9" fill="none"/>
        <circle cx="12" cy="12" r="1.2" fill="#c6a062" fillOpacity="0.55"/>
        {[0,45,90,135,180,225,270,315].map((a, idx) => {
          const rad = a * Math.PI / 180;
          return (
            <line key={idx}
              x1={12 + Math.cos(rad) * 5} y1={12 + Math.sin(rad) * 5}
              x2={12 + Math.cos(rad) * 8.5} y2={12 + Math.sin(rad) * 8.5}
              stroke="#c6a062" strokeWidth="1.2" strokeOpacity="0.72"/>
          );
        })}
        <circle cx="12" cy="12" r="9" stroke="#c6a062" strokeWidth="0.7" strokeOpacity="0.28" fill="none" strokeDasharray="2 2"/>
      </svg>
    );
  };

  return (
    <div ref={ref} className="relative w-full">
      {records.map((rec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08 + i * 0.13, ease: LUXURY_EASE }}
          className="group mb-[10px]"
        >
          <div className="flex gap-4 py-[16px] px-[14px]" style={{
            border: '1px solid rgba(198,160,98,0.28)',
            borderRadius: '3px',
            background: 'linear-gradient(145deg, rgba(11,21,38,0.30) 0%, rgba(4,8,15,0.20) 100%)',
            boxShadow: '0 0 18px rgba(198,160,98,0.05), inset 0 1px 0 rgba(198,160,98,0.06)',
            transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(198,160,98,0.60)';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(198,160,98,0.12), inset 0 1px 0 rgba(198,160,98,0.10)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(198,160,98,0.28)';
            e.currentTarget.style.boxShadow = '0 0 18px rgba(198,160,98,0.05), inset 0 1px 0 rgba(198,160,98,0.06)';
          }}
          >

            {/* Greek domain icon */}
            <div className="flex-shrink-0 w-8 flex items-start justify-center pt-[3px] opacity-45 group-hover:opacity-85 transition-opacity duration-500">
              {renderIcon(rec.icon)}
            </div>

            {/* Main content column */}
            <div className="flex-1 min-w-0">

              {/* Row 1: numeral + title + era badge */}
              <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:'4px', gap:'8px' }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:'8px' }}>
                  <span style={{
                    fontFamily:'monospace', fontSize:'9px', letterSpacing:'0.26em',
                    color:'rgba(198,160,98,0.32)', flexShrink:0, userSelect:'none',
                  }}>{rec.num}</span>
                  <span style={{
                    fontFamily:"'Cinzel',serif", fontWeight:700, fontSize:'13.5px',
                    letterSpacing:'0.08em', textTransform:'uppercase', lineHeight:1,
                    color:'rgba(255,255,255,0.90)',
                    transition:'color 0.35s ease',
                  }} className="group-hover:text-[#fdf0d5]">{rec.title}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'5px', flexShrink:0 }}>
                  <span style={{
                    width:'3px', height:'3px', borderRadius:'50%', display:'inline-block', flexShrink:0,
                    background: rec.era === 'SCALING' ? 'rgba(253,240,213,0.55)' : 'rgba(198,160,98,0.70)',
                  }}/>
                  <span style={{
                    fontFamily:"'Cinzel',serif", fontSize:'8px', fontWeight:600,
                    letterSpacing:'0.26em', textTransform:'uppercase',
                    color: rec.era === 'SCALING' ? 'rgba(253,240,213,0.50)' : 'rgba(198,160,98,0.68)',
                  }}>{rec.era}</span>
                </div>
              </div>

              {/* Row 2: domain */}
              <p style={{
                fontFamily:"'Cinzel',serif", fontSize:'9.5px', fontWeight:500,
                letterSpacing:'0.18em', textTransform:'uppercase',
                color:'rgba(198,160,98,0.52)', margin:'0 0 9px 0', lineHeight:1,
              }}>{rec.domain}</p>

              {/* Row 3: description */}
              <p style={{
                fontFamily:"'Inter',sans-serif", fontSize:'11px', fontWeight:400,
                letterSpacing:'0.01em', lineHeight:1.65,
                color:'rgba(255,255,255,0.40)', margin:'0 0 11px 0',
              }}>{rec.desc}</p>

              {/* Row 4: tags */}
              <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
                {rec.tags.map((tag, ti) => (
                  <span key={ti} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    {ti > 0 && <span style={{ width:'3px', height:'3px', background:'rgba(198,160,98,0.28)', transform:'rotate(45deg)', display:'inline-block', flexShrink:0 }}/>}
                    <span style={{
                      fontFamily:"'Cinzel',serif", fontSize:'8.5px', fontWeight:600,
                      letterSpacing:'0.16em', textTransform:'uppercase',
                      color:'rgba(198,160,98,0.58)',
                    }}>{tag}</span>
                  </span>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      ))}
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.055)" }} />
    </div>
  );
};

// --- COMPONENT: CASE STUDIES (ENHANCED with live tracker + animated counters) ---
const CaseStudies = () => (
  <section id="casestudies" className="calioon-section-auto border-t border-[#c6a062]/20 relative">
    <img aria-hidden="true" src="/jas.png" alt="" className="case-bg-img"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center center',
        zIndex: 0, pointerEvents: 'none',
        opacity: 0.18,
      }}
    />
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: 'linear-gradient(to bottom, rgba(4,8,15,0.60) 0%, rgba(4,8,15,0.42) 40%, rgba(4,8,15,0.60) 100%)',
    }} />
    <div className="greek-stone-texture-overlay" />
    <div className="greek-temple-wall-grain" />
    <div className="museum-navy-mist-ambient" />
    <div className="greek-museum-vignette" />

    {/* Floating gold particles */}
    {[
      { top: '18%', left: '14%', cls: 'phil-node-1', r: 2.2 },
      { top: '72%', left: '22%', cls: 'phil-node-2', r: 1.6 },
      { top: '38%', left: '48%', cls: 'phil-node-3', r: 1.4 },
      { top: '82%', left: '62%', cls: 'phil-node-4', r: 1.8 },
      { top: '24%', left: '78%', cls: 'phil-node-5', r: 1.5 },
    ].map((p, i) => (
      <div key={i} aria-hidden className={p.cls} style={{
        position: 'absolute', top: p.top, left: p.left,
        pointerEvents: 'none', zIndex: 2,
      }}>
        <svg width={p.r * 8} height={p.r * 8} viewBox={`0 0 ${p.r * 8} ${p.r * 8}`}>
          <circle cx={p.r * 4} cy={p.r * 4} r={p.r} fill="rgba(198,160,98,0.70)" filter="url(#csGlow)" />
          <defs>
            <filter id="csGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    ))}

    {/* Imperial celestial blueprint — ultra-slow rotation, frames the content with depth */}
    <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-0" style={{ opacity: 0.036 }}>
      <svg viewBox="0 0 900 900" className="w-[82%] max-w-[740px] h-auto animate-greek-ring text-[#c6a062]" fill="none" stroke="currentColor">
        <circle cx="450" cy="450" r="418" strokeWidth="0.7" strokeDasharray="9 20" strokeOpacity="0.95"/>
        <circle cx="450" cy="450" r="326" strokeWidth="0.55" strokeOpacity="0.8"/>
        <circle cx="450" cy="450" r="234" strokeWidth="0.65" strokeDasharray="5 11" strokeOpacity="0.72"/>
        <circle cx="450" cy="450" r="136" strokeWidth="0.55" strokeOpacity="0.62"/>
        <circle cx="450" cy="450" r="54"  strokeWidth="0.5" strokeDasharray="2 6" strokeOpacity="0.5"/>
        <line x1="450" y1="26" x2="450" y2="874" strokeWidth="0.45" strokeDasharray="7 15" strokeOpacity="0.55"/>
        <line x1="26"  y1="450" x2="874" y2="450" strokeWidth="0.45" strokeDasharray="7 15" strokeOpacity="0.55"/>
        <line x1="150" y1="150" x2="750" y2="750" strokeWidth="0.35" strokeDasharray="4 11" strokeOpacity="0.38"/>
        <line x1="750" y1="150" x2="150" y2="750" strokeWidth="0.35" strokeDasharray="4 11" strokeOpacity="0.38"/>
        <polygon points="450,32 792,228 792,672 450,868 108,672 108,228" strokeWidth="0.65" strokeDasharray="6 13" strokeOpacity="0.65"/>
        <polygon points="450,148 720,302 720,598 450,752 180,598 180,302" strokeWidth="0.5" strokeOpacity="0.5"/>
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, idx) => {
          const rad = angle * Math.PI / 180;
          return <line key={idx}
            x1={450 + Math.cos(rad) * 408} y1={450 + Math.sin(rad) * 408}
            x2={450 + Math.cos(rad) * 422} y2={450 + Math.sin(rad) * 422}
            strokeWidth="1.1" strokeOpacity="0.85"/>;
        })}
      </svg>
    </div>

    {/* Corner arc — existing depth element */}
    <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none text-[#c6a062] select-none z-0">
      <svg width="600" height="600" viewBox="0 0 600 600" className="animate-greek-ring">
        <circle cx="600" cy="600" r="550" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="600" cy="600" r="450" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="16 8" />
      </svg>
    </div>

    <div className="calioon-global-container relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        <div className="space-y-10 text-left relative z-20 case-left-col">
          <SectionReveal x={-15} y={0}>
            <h3 className="text-label-caps text-[#c6a062] mb-4 block">Case Studies</h3>
            <h2 className="text-section-title text-white" style={{ marginBottom:'12px' }}>From Unknown<br /><span className="gold-matte-text">To Unavoidable.</span></h2>
            <div className="section-ornament-line" style={{ marginBottom:'8px', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace' }}>⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</div>
          </SectionReveal>
          
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-10">
            <StatCounter value="+320%" label="Revenue Growth" delay={0} />
            <StatCounter value="+450%" label="Return on Ad Spend" delay={0.1} />
            <StatCounter value="3.2X" label="Average ROI" delay={0.2} />
            <StatCounter value="7+" label="Industries Served" delay={0.3} />
          </div>
        </div>
        
        {/* ── EMPIRE INTELLIGENCE ARCHIVE — content only, no box ── */}
        <motion.div
          className="flex flex-col relative z-10 mt-10 lg:mt-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.0, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Archive header */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ borderBottom: '1px solid rgba(198,160,98,0.10)', paddingBottom: '14px', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }} whileInView={{ clipPath: 'inset(0 0% 0 0)' }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.40, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Cinzel', serif", fontSize: '8.5px', letterSpacing: '0.28em', color: 'rgba(198,160,98,0.52)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="4" height="4" viewBox="0 0 4 4" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="2" cy="2" r="2" fill="currentColor" />
              </svg>
              Empire Intelligence Archive
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Cinzel', serif", fontSize: '7.5px', letterSpacing: '0.20em', color: 'rgba(198,160,98,0.26)', textTransform: 'uppercase', border: '1px solid rgba(198,160,98,0.14)', padding: '3px 8px', display: 'inline-block' }}
            >
              CLASSIFIED
            </motion.span>
          </motion.div>

          {/* Case study entries */}
          {[
            { id: '001', industry: 'LUXURY HOSPITALITY', name: 'THE SOVEREIGN ASCENT',  challenge: 'Zero digital footprint. No category authority. Invisible in a saturated market.', metric: '+420%', result: 'Direct Booking Dominance', status: 'EMPIRE COMPLETE', statusGold: true  },
            { id: '002', industry: 'PREMIUM E-COMMERCE',  name: 'THE CONQUEST FORMULA', challenge: 'Commoditized brand drowning in price wars. No premium positioning.',                metric: '+285%', result: 'Revenue Architecture',        status: 'EMPIRE COMPLETE', statusGold: true  },
            { id: '003', industry: 'B2B TECHNOLOGY',      name: 'THE ORACLE PROTOCOL',  challenge: 'No pipeline. No positioning. No growth vector in place.',                           metric: '3.8×',  result: 'Pipeline Command Growth',     status: 'SCALING',         statusGold: false },
          ].map((c, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {i > 0 && (
                <motion.div
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.50 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '1px', background: 'rgba(198,160,98,0.08)', transformOrigin: 'left center' }}
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.48 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                style={{ padding: '20px 0' }}
              >
                <motion.div
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.54 + i * 0.18 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', color: 'rgba(198,160,98,0.28)', letterSpacing: '0.16em' }}>{c.id}</span>
                    <span style={{ width: '1px', height: '10px', background: 'rgba(198,160,98,0.18)', display: 'inline-block' }} />
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(198,160,98,0.44)', textTransform: 'uppercase' }}>{c.industry}</span>
                  </div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '7.5px', letterSpacing: '0.18em', color: c.statusGold ? 'rgba(198,160,98,0.60)' : 'rgba(253,240,213,0.45)', textTransform: 'uppercase' }}>{c.status}</span>
                </motion.div>
                <div style={{ overflow: 'hidden', marginBottom: '8px' }}>
                  <motion.h4
                    initial={{ y: '100%' }} whileInView={{ y: '0%' }} viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.60 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "'Cinzel', serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.10em', color: 'rgba(255,255,255,0.88)', textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}
                  >
                    {c.name}
                  </motion.h4>
                </div>
                <motion.p
                  initial={{ opacity: 0, filter: 'blur(4px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} viewport={{ once: true }}
                  transition={{ duration: 0.60, delay: 0.68 + i * 0.18 }}
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '11.5px', color: 'rgba(255,255,255,0.36)', lineHeight: 1.6, margin: '0 0 14px 0', letterSpacing: '0.01em' }}
                >
                  {c.challenge}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 8, filter: 'blur(12px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true }}
                  transition={{ duration: 0.70, delay: 0.76 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}
                >
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: '22px', fontWeight: 700, color: '#c6a062', letterSpacing: '0.04em', lineHeight: 1 }}>{c.metric}</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(198,160,98,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>{c.result}</span>
                </motion.div>
              </motion.div>
            </div>
          ))}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.10 }}
            style={{ borderTop: '1px solid rgba(198,160,98,0.08)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '7.5px', letterSpacing: '0.20em', color: 'rgba(198,160,98,0.25)', textTransform: 'uppercase' }}>CALIOON // STRATEGIC EMPIRE DIVISION</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '7.5px', letterSpacing: '0.16em', color: 'rgba(198,160,98,0.22)', textTransform: 'uppercase' }}>MMXXV</span>
          </motion.div>
        </motion.div>

      </div>
    </div>
  </section>
);

// --- COMPONENT: CONTACT (REFINED — emperor bust + premium typography) ---
const CTA_HEAD_V = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.044, delayChildren: 0.15 } },
};
const CTA_CHAR_V = {
  hidden: { opacity: 0, y: 14, filter: 'blur(9px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] } },
};
const CTA_SUB_V = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.55 } },
};
const CTA_WORD_V = {
  hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
};

const HEADING_TEXT = 'EMPIRES ARE BUILT. NOT BORN.';
const BLANK_FORM = { name: '', email: '', phone: '', company: '', services: [], description: '' };

const Contact = () => {
  const [form, setForm] = useState(BLANK_FORM);
  const [cycle, setCycle] = useState(0);
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const id = setInterval(() => setCycle(c => c + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const handleService = s => {
    setForm(f => ({
      ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s]
    }));
    if (errors.services) setErrors(e => ({ ...e, services: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())          errs.name        = 'Name is required';
    if (!form.email.trim())         errs.email       = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.phone.trim())         errs.phone       = 'Phone number is required';
    if (form.services.length === 0) errs.services    = 'Select at least one service pillar';
    if (!form.description.trim())   errs.description = 'Project description is required';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitState('loading');
    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitState('success');
        setTimeout(() => { setForm(BLANK_FORM); setSubmitState('idle'); }, 6000);
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section id="contact" className="calioon-section-auto border-t border-[#c6a062]/20 relative overflow-hidden"
      style={{ background:'radial-gradient(ellipse at 30% 20%, #0B1526 0%, #07101D 45%, #04080F 100%)' }}>
      <div className="greek-stone-texture-overlay" />
      <div className="greek-temple-wall-grain" />
      <div className="museum-navy-mist-ambient" />
      <div className="greek-museum-vignette" />

      {/* Static radiance rings — animation removed for performance */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[600px] h-[600px] rounded-full border border-[#c6a062]/[0.06]"
          style={{ boxShadow: "0 0 120px 10px rgba(198,160,98,0.03)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[380px] h-[380px] rounded-full border border-[#c6a062]/[0.05]" />
      </div>

      <EmpireCrestBg
        wrapStyle={{ opacity: 0.28, justifyContent: 'flex-start', paddingLeft: '3%', alignItems: 'center', paddingTop: '4%' }}
        svgStyle={{ width: '72%', maxWidth: '640px' }}
      />

      <style>{`
        .empire-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(212,175,106,0.42);
          color: rgba(253,240,213,0.92);
          padding: 13px 0 10px;
          border-radius: 0;
          font-size: 14px;
          letter-spacing: 0.05em;
          outline: none;
          height: 46px;
          transition: border-bottom-color 0.28s ease, box-shadow 0.28s ease;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
          display: block;
        }
        textarea.empire-input { height: auto; min-height: 82px; padding-top: 12px; }
        .empire-input::placeholder { color: rgba(212,175,106,0.55); font-size: 12px; letter-spacing: 0.10em; font-family: 'Cinzel', serif; }
        .empire-input:-webkit-autofill,
        .empire-input:-webkit-autofill:hover,
        .empire-input:-webkit-autofill:focus,
        .empire-input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: rgba(253,240,213,0.92) !important;
          background-color: transparent !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        .empire-select option { background: #0B1526; color: #FDF0D5; }
        .empire-label {
          font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
          color: #F2D492; font-weight: 700; margin-bottom: 9px; display: block;
          font-family: 'Cinzel', serif;
          transition: letter-spacing 0.3s ease, color 0.3s ease;
          opacity: 0.95;
        }
        .empire-label:hover { color: #FFE08C; letter-spacing: 0.27em; opacity: 1; }
        .empire-input:focus {
          border-bottom-color: rgba(212,175,106,0.95) !important;
          box-shadow: none !important;
          background: transparent !important;
          color: #FDF0D5 !important;
        }
        .empire-field-box:focus-within {
          border-color: rgba(212,175,106,0.85) !important;
          box-shadow: 0 0 0 1.5px rgba(212,175,106,0.30), 0 0 22px rgba(212,175,106,0.10) !important;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .empire-form-group {
          padding-bottom: 4px;
        }
        .empire-service-btn-selected {
          animation: empireServicePulse 2.2s ease-in-out infinite;
        }
        @keyframes empireCornerPulse { 0%,100% { opacity:0.45 } 50% { opacity:0.9 } }
        @keyframes empireSubmitShimmer { 0% { left:-80% } 100% { left:140% } }
        @keyframes empireHeadingGlow {
          0%,100% { filter: saturate(0.88) brightness(0.96) drop-shadow(0 2px 8px rgba(0,0,0,0.6)); }
          50%     { filter: saturate(1.05) brightness(1.08) drop-shadow(0 0 18px rgba(212,175,106,0.30)); }
        }
        @keyframes navUnderlineShimmer {
          0%   { background-position: 200% center; opacity: 0.45; }
          50%  { opacity: 0.85; }
          100% { background-position: -200% center; opacity: 0.45; }
        }
        @keyframes empireCursorBlink {
          0%,100% { opacity:0.85; }
          50%     { opacity:0; }
        }
        .empire-cursor {
          display:inline-block;
          width:2px; height:1.1em;
          background: linear-gradient(180deg, rgba(255,232,138,0.80), rgba(212,175,106,0.70));
          margin-left:3px;
          vertical-align:middle;
          border-radius:1px;
          animation: empireCursorBlink 0.7s step-end infinite;
          box-shadow: 0 0 5px rgba(212,175,106,0.40);
        }
        @keyframes empireSubtextPulse {
          0%,100% { opacity:0.62; }
          50%     { opacity:0.80; }
        }
        @keyframes empireLabelReveal {
          from { opacity:0; transform:translateX(-6px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes empireInputPulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(212,175,106,0.08), inset 0 0 12px rgba(212,175,106,0.03); }
          50%     { box-shadow: 0 0 0 3px rgba(212,175,106,0.14), inset 0 0 18px rgba(212,175,106,0.05); }
        }
        @keyframes empireRowReveal {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes empireBoxShimmer {
          0%   { left:-60%; }
          100% { left:130%; }
        }
        .empire-field-box {
          position:relative; overflow:hidden;
          transition: border-color 0.30s ease, box-shadow 0.30s ease;
        }
        .empire-field-box::before {
          content:'';
          position:absolute; top:0; left:-60%;
          width:40%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(212,175,106,0.07), transparent);
          transform:skewX(-18deg);
          opacity:0; transition:opacity 0.3s;
          pointer-events:none; z-index:1;
        }
        .empire-field-box:hover::before {
          animation: empireBoxShimmer 0.75s ease forwards;
          opacity:1;
        }
        .empire-field-box:hover {
          border-color: rgba(212,175,106,0.34) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px rgba(212,175,106,0.07) !important;
        }
        @keyframes empireServicePulse {
          0%,100% { box-shadow: inset 0 1px 0 rgba(212,175,106,0.15), 0 2px 6px rgba(0,0,0,0.28); }
          50%     { box-shadow: inset 0 1px 0 rgba(212,175,106,0.28), 0 2px 10px rgba(0,0,0,0.28), 0 0 10px rgba(212,175,106,0.10); }
        }
        @keyframes empireSubmitGlow {
          0%,100% { box-shadow: 0 3px 18px rgba(212,175,106,0.20), 0 1px 5px rgba(212,175,106,0.12); }
          50%     { box-shadow: 0 4px 32px rgba(212,175,106,0.35), 0 2px 10px rgba(212,175,106,0.22); }
        }
        @keyframes empireRollerSweep {
          0%   { left:-15%; opacity:0; }
          10%  { opacity:0.55; }
          90%  { opacity:0.55; }
          100% { left:110%; opacity:0; }
        }
        @keyframes empireDiamondPulse {
          0%,100% { opacity:0.45; transform:rotate(45deg) scale(1); }
          50%     { opacity:0.70; transform:rotate(45deg) scale(1.20); }
        }
        .empire-input-error { border-bottom-color: rgba(255,100,100,0.80) !important; }
        .empire-error-msg {
          font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.14em;
          color: rgba(255,120,100,0.85); margin-top: 5px; display: block;
        }
        @keyframes empireSuccessIn {
          from { opacity:0; transform:scale(0.92) translateY(18px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes empireCardEntrance {
          from { opacity:0; transform:translateY(28px) scale(0.97); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes empireReviewedFade {
          0%,100% { opacity:0.50; }
          50% { opacity:0.80; }
        }
        @keyframes empireTextShine {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes empireParticleFloat {
          0%   { transform: translateY(0px) scale(1);   opacity: 0.18; }
          50%  { transform: translateY(-14px) scale(1.2); opacity: 0.38; }
          100% { transform: translateY(0px) scale(1);   opacity: 0.18; }
        }
        @keyframes empireOrbDrift {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.10; }
          40%     { transform: translate(calc(-50% + 18px),calc(-50% - 22px)) scale(1.12); opacity: 0.22; }
          70%     { transform: translate(calc(-50% - 10px),calc(-50% + 12px)) scale(0.90); opacity: 0.13; }
        }
        @keyframes empireOrbDrift2 {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.07; }
          35%     { transform: translate(calc(-50% - 20px),calc(-50% + 16px)) scale(1.10); opacity: 0.17; }
          65%     { transform: translate(calc(-50% + 14px),calc(-50% - 10px)) scale(0.94); opacity: 0.11; }
        }
        @keyframes empireOrbDrift3 {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.08; }
          50%     { transform: translate(calc(-50% + 8px),calc(-50% - 30px)) scale(1.15); opacity: 0.18; }
        }
        @keyframes empireCardBreath {
          0%,100% { box-shadow: 0 0 28px rgba(212,175,106,0.10), 0 0 60px rgba(212,175,106,0.04), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,224,140,0.07); }
          50%     { box-shadow: 0 0 52px rgba(212,175,106,0.22), 0 0 100px rgba(212,175,106,0.09), 0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,224,140,0.16); }
        }
        @keyframes empireCornerGlow {
          0%,100% { opacity: 0.38; }
          50%     { opacity: 0.90; }
        }
        @keyframes selectSvcSlam {
          0%   { opacity:0; transform: scale(1.18) translateY(-6px); filter: blur(8px) drop-shadow(0 0 0px rgba(212,175,106,0)); }
          45%  { opacity:1; transform: scale(1.0) translateY(0);    filter: blur(0px) drop-shadow(0 0 16px rgba(212,175,106,0.80)); }
          70%  { filter: blur(0px) drop-shadow(0 0 8px rgba(212,175,106,0.55)); }
          100% { opacity:1; transform: scale(1.0) translateY(0);    filter: blur(0px) drop-shadow(0 0 8px rgba(212,175,106,0.45)); }
        }
        @keyframes empireSubmitRingPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(212,175,106,0); opacity: 0; }
          50%     { box-shadow: 0 0 0 8px rgba(212,175,106,0.12); opacity: 1; }
        }
        @keyframes empireGoldBeam {
          0%   { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
          12%  { opacity: 0.55; }
          88%  { opacity: 0.55; }
          100% { transform: translateX(260%) skewX(-14deg); opacity: 0; }
        }
        @keyframes empireWordEntrance {
          0%   { opacity: 0; transform: scale(1.55) translateY(-14px); filter: blur(18px); }
          100% { opacity: 1; transform: scale(1) translateY(0);   filter: blur(0px); }
        }
        @keyframes empireWordFlash {
          0%   { text-shadow: 0 0 32px rgba(255,232,100,1), 0 0 64px rgba(212,175,106,0.75), 0 0 110px rgba(212,175,106,0.35); }
          100% { text-shadow: 0 0 0px transparent; }
        }
        @keyframes empireSubLine1 {
          0%   { opacity: 0; transform: translateX(-22px); filter: blur(7px); }
          100% { opacity: 1; transform: translateX(0);     filter: blur(0px); }
        }
        @keyframes empireSubLine2 {
          0%   { opacity: 0; transform: translateX(22px);  filter: blur(7px); }
          100% { opacity: 1; transform: translateX(0);     filter: blur(0px); }
        }
      `}</style>

      {/* Constellation / grid background */}
      <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
          <defs>
            <pattern id="empireGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(212,175,106,0.06)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#empireGrid)" />
          {[
            [12,18],[38,7],[65,22],[88,11],[95,45],[78,68],[55,85],[30,92],
            [8,75],[22,55],[45,40],[70,55],[85,30],[15,35],[50,60],[72,78],
          ].map(([cx,cy],i) => (
            <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="1.2" fill="rgba(212,175,106,0.40)" />
          ))}
          <line x1="12%" y1="18%" x2="38%" y2="7%"  stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="38%" y1="7%"  x2="65%" y2="22%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="65%" y1="22%" x2="88%" y2="11%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="88%" y1="11%" x2="95%" y2="45%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="8%"  y1="75%" x2="22%" y2="55%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="22%" y1="55%" x2="45%" y2="40%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="45%" y1="40%" x2="70%" y2="55%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
          <line x1="70%" y1="55%" x2="78%" y2="68%" stroke="rgba(212,175,106,0.07)" strokeWidth="0.5"/>
        </svg>
      </div>



      {/* Empire seal watermark */}
      <img aria-hidden="true" src="/CALIOON Empire.png" alt="" className="contact-bg-img"
        style={{
          position:'absolute', top:0, left:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center center',
          opacity:0.45, pointerEvents:'none', zIndex:1,
          filter:'grayscale(80%) brightness(1.10) contrast(0.75)',
          mixBlendMode:'screen',
          maskImage:'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.70) 100%)',
          WebkitMaskImage:'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.70) 100%)',
        }}
      />

      {/* Radial ambient glow */}
      <div aria-hidden="true" style={{ position:'absolute', top:'50%', left:'52%', transform:'translate(-50%,-50%)', width:'900px', height:'700px', background:'radial-gradient(ellipse, rgba(212,175,106,0.05) 0%, transparent 65%)', pointerEvents:'none', zIndex:1 }} />

      <div className="calioon-global-container relative z-10 w-full" style={{ zIndex: 10, paddingTop:'clamp(28px, 5vw, 56px)', paddingBottom:'clamp(40px, 6vw, 72px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.18fr] gap-10 lg:gap-14" style={{ alignItems:'flex-start', width:'100%' }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display:'flex', flexDirection:'column', paddingTop:'8px' }}>

            <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center', gap:'8px', marginBottom:'16px', position:'relative', zIndex:1 }}
            >
              <div style={{ height:'1px', width:'clamp(18px,5vw,40px)', background:'linear-gradient(90deg,transparent,rgba(212,175,106,0.7))' }} />
              <span style={{ fontSize:'clamp(9px,2.6vw,14px)', letterSpacing:'clamp(0.05em,0.8vw,0.26em)', color:'#D4AF6A', fontFamily:"'Cinzel',serif", fontWeight:700, textAlign:'center' }}>THE BRANDS THAT WIN TOMORROW</span>
              <div style={{ height:'1px', width:'clamp(18px,5vw,40px)', background:'linear-gradient(90deg,rgba(212,175,106,0.7),transparent)' }} />
            </motion.div>

            <motion.h2
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.75, delay:0.10, ease:[0.16,1,0.3,1] }}
              className="contact-main-heading text-white font-bold uppercase"
              style={{ fontSize:'clamp(34px, 8vw, 88px)', lineHeight:'1.06', letterSpacing:'0.04em', margin:0, fontFamily:"'Cinzel',serif", position:'relative', zIndex:1 }}
            >
              <span style={{ color:'#ffffff' }}>BUILD YOUR</span><br/>
              <span style={{ color:'#c6a062' }}>EMPIRE WITH US.</span>
            </motion.h2>

            <motion.div initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
              transition={{ duration:0.55, delay:0.25, ease:[0.16,1,0.3,1] }}
              style={{ width:'90px', height:'2.5px', background:'linear-gradient(90deg,rgba(212,175,106,1),rgba(212,175,106,0.45))', margin:'14px 0', transformOrigin:'left', position:'relative', zIndex:1 }}
            />

            <motion.div className="section-ornament-line"
              initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              transition={{ duration:0.60, delay:0.35, ease:[0.16,1,0.3,1] }}
              style={{ marginBottom:'14px', color:'rgba(198,160,98,0.65)', fontSize:'14px', letterSpacing:'0.05em', fontFamily:'monospace', position:'relative', zIndex:1 }}
            >⌜⌟⌜⌟⌜⌟   ⊙   ⌜⌟⌜⌟⌜⌟</motion.div>

            <motion.p
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.65, delay:0.30, ease:[0.16,1,0.3,1] }}
              className="contact-desc-para"
              style={{ color:'rgba(253,240,213,0.68)', fontSize:'16px', lineHeight:'1.72', maxWidth:'380px', margin:'0 0 14px', position:'relative', zIndex:1 }}
            >
              CALIOON accepts a limited number of growth partners each quarter. Complete the application below to begin your evaluation.
            </motion.p>

            <div className="contact-feature-list" style={{ display:'flex', flexDirection:'column', gap:'14px', position:'relative', zIndex:1 }}>
              {[
                { label:'Strategic Growth',      desc:'Data-driven market expansion and brand positioning at the highest tier.' },
                { label:'Performance Dominance', desc:'ROI-obsessed execution across every channel, every campaign.' },
                { label:'Automation Systems',    desc:'AI-powered pipelines that scale without adding headcount.' },
              ].map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                  transition={{ duration:0.55, delay:0.40 + i*0.10, ease:[0.16,1,0.3,1] }}
                  className="contact-feature-item" style={{ display:'flex', alignItems:'flex-start', gap:'14px' }}
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true" style={{ marginTop:'7px', flexShrink:0 }}>
                    <circle cx="4.5" cy="4.5" r="3.6" stroke="#D4AF6A" strokeWidth="1" fill="rgba(212,175,106,0.14)" />
                    <circle cx="4.5" cy="4.5" r="1.1" fill="#D4AF6A" />
                  </svg>
                  <div>
                    <p className="contact-feature-label" style={{ fontSize:'clamp(13px,4.2vw,17px)', fontFamily:"'Cinzel',serif", color:'#D4AF6A', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 4px' }}>{p.label}</p>
                    <p className="contact-feature-desc" style={{ fontSize:'clamp(13px,4vw,16px)', color:'rgba(253,240,213,0.55)', lineHeight:'1.62', margin:0 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div className="contact-privacy-row" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:0.72 }}
              style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'14px', position:'relative', zIndex:1 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L2 3.5V7.5C2 10.3 4.2 12.85 7 13.5C9.8 12.85 12 10.3 12 7.5V3.5L7 1Z" stroke="#D4AF6A" strokeWidth="0.8" fill="rgba(212,175,106,0.08)"/>
              </svg>
              <span style={{ fontSize:'13px', color:'rgba(212,175,106,0.60)', letterSpacing:'0.22em', textTransform:'uppercase', fontFamily:"'Cinzel',serif" }}>Private · Secure · Confidential</span>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — FORM CARD ── */}
          <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.85, delay:0.15, ease:[0.16,1,0.3,1] }}
            style={{ position:'relative', width:'100%' }}
          >

            {/* Form card */}
            <div className="form-card" style={{
              position:'relative', overflow:'hidden', width:'100%', maxWidth:'760px', margin:'0 auto',
              background:'#000000',
              backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
              border:'1.5px solid rgba(198,160,98,0.80)',
              borderRadius:'2px',
              boxShadow:'0 0 0 1px rgba(198,160,98,0.12), 0 0 48px rgba(198,160,98,0.10), 0 24px 80px rgba(0,0,0,0.70), inset 0 1px 0 rgba(198,160,98,0.10)',
            }}>

              {/* Top gold accent stripe */}
              <div aria-hidden="true" style={{
                position:'absolute', top:0, left:0, right:0, height:'2px', zIndex:6, pointerEvents:'none',
                background:'linear-gradient(90deg, transparent 0%, rgba(198,160,98,0.60) 20%, rgba(198,160,98,0.95) 50%, rgba(198,160,98,0.60) 80%, transparent 100%)',
              }} />
              {/* Subtle inner radial glow */}
              <div aria-hidden="true" style={{
                position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
                background:'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(198,160,98,0.05) 0%, transparent 70%)',
              }} />


              {/* Static ambient glow orbs — animations removed for performance */}
              {[
                { left:'18%', top:'28%', size:180, opacity:0.10 },
                { left:'78%', top:'62%', size:140, opacity:0.08 },
                { left:'52%', top:'88%', size:110, opacity:0.07 },
              ].map((o,i) => (
                <div key={i} aria-hidden="true" style={{
                  position:'absolute', pointerEvents:'none', zIndex:1,
                  left:o.left, top:o.top,
                  width:`${o.size}px`, height:`${o.size}px`,
                  background:`radial-gradient(circle, rgba(212,175,106,${o.opacity}) 0%, transparent 70%)`,
                  borderRadius:'50%',
                }} />
              ))}

              {/* Animated corner ornaments */}
              {[
                { top:0,    left:0,    rotate:0   },
                { top:0,    right:0,   rotate:90  },
                { bottom:0, right:0,   rotate:180 },
                { bottom:0, left:0,    rotate:270 },
              ].map((pos,i) => (
                <svg key={i} aria-hidden="true" width="36" height="36" viewBox="0 0 36 36" fill="none"
                  style={{
                    position:'absolute', ...pos, pointerEvents:'none', zIndex:5,
                    transform:`rotate(${pos.rotate}deg)`,
                    opacity:0.85,
                  }}>
                  <polyline points="2,24 2,2 24,2" stroke="rgba(198,160,98,0.95)" strokeWidth="1.5" fill="none" strokeLinecap="square"/>
                  <polyline points="7,18 7,7 18,7"  stroke="rgba(198,160,98,0.40)" strokeWidth="0.8" fill="none" strokeLinecap="square"/>
                  <circle cx="2" cy="2" r="1.5" fill="rgba(198,160,98,0.70)"/>
                </svg>
              ))}

              {/* ── Header block ── */}
              <div style={{ position:'relative', zIndex:2, marginBottom:'24px' }}>

                {/* Title — word slam: each word scales in from blur with a gold flash on impact */}
                <p key={cycle} style={{
                  fontFamily:"'Cinzel',serif", fontWeight:700,
                  fontSize:'clamp(16px, 2.2vw, 26px)',
                  letterSpacing:'0.14em', lineHeight:1.2,
                  margin:'0 0 8px 0',
                  minHeight:'1.3em', display:'flex', alignItems:'center', flexWrap:'wrap', gap:'0.28em',
                }}>
                  {HEADING_TEXT.split(' ').map((word, wi) => (
                    <span key={wi} style={{
                      display:'inline-block',
                      background:'linear-gradient(135deg, #FFE88A 0%, #D4AF60 28%, #F5CC72 52%, #C8A040 78%, #E8C870 100%)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                      animationName:'empireWordEntrance, empireWordFlash',
                      animationDuration:'0.52s, 0.95s',
                      animationDelay:`${wi * 0.14}s, ${wi * 0.14 + 0.52}s`,
                      animationFillMode:'both, both',
                      animationTimingFunction:'cubic-bezier(0.22,1,0.36,1), ease-out',
                    }}>{word}</span>
                  ))}
                </p>

                {/* Gold rule — flush left, fades right */}
                <div style={{
                  height:'1px', width:'60%', marginBottom:'14px',
                  background:'linear-gradient(90deg, rgba(212,175,106,0.90) 0%, rgba(212,175,106,0.40) 55%, transparent 100%)',
                }} />

                {/* Subtitle — line 1 slides from left, line 2 from right, staggered after heading */}
                <p key={`sub-${cycle}`} style={{
                  fontFamily:"'Cinzel',serif", fontWeight:500,
                  fontSize:'15px', letterSpacing:'0.07em', lineHeight:1.5,
                  margin:0, display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap',
                }}>
                  <span style={{
                    color:'rgba(255,255,255,0.88)', display:'inline-block',
                    animationName:'empireSubLine1',
                    animationDuration:'0.72s',
                    animationDelay:`${4 * 0.14 + 0.40}s`,
                    animationFillMode:'both',
                    animationTimingFunction:'cubic-bezier(0.16,1,0.3,1)',
                  }}>History remembers empires.</span>
                  <span style={{
                    color:'#D4AF60', fontWeight:600, display:'inline-block',
                    animationName:'empireSubLine2',
                    animationDuration:'0.72s',
                    animationDelay:`${4 * 0.14 + 0.76}s`,
                    animationFillMode:'both',
                    animationTimingFunction:'cubic-bezier(0.16,1,0.3,1)',
                  }}>Not advertisements.</span>
                </p>

              </div>

              {/* Separator before form */}
              <div aria-hidden="true" style={{
                position:'relative', zIndex:2, marginBottom:'20px',
                height:'1px',
                background:'linear-gradient(90deg, rgba(212,175,106,0.50) 0%, rgba(212,175,106,0.18) 60%, transparent 100%)',
              }} />

              {/* Form */}
              {/* Success state */}
              {submitState === 'success' && (
                <div style={{
                  position:'relative', zIndex:10, textAlign:'center', padding:'48px 24px',
                  animation:'empireSuccessIn 0.75s cubic-bezier(0.16,1,0.3,1) forwards',
                }}>
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin:'0 auto 20px' }}>
                    <circle cx="28" cy="28" r="27" stroke="rgba(198,160,98,0.60)" strokeWidth="1"/>
                    <path d="M16 28 L24 36 L40 20" stroke="#c6a062" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'22px', fontWeight:700, letterSpacing:'0.14em', color:'#FDF0D5', margin:'0 0 12px', textTransform:'uppercase' }}>
                    APPLICATION RECEIVED
                  </h3>
                  <div style={{ height:'1px', width:'60px', background:'linear-gradient(90deg,transparent,rgba(198,160,98,0.80),transparent)', margin:'0 auto 16px' }} />
                  <p style={{ fontFamily:"'Cinzel',serif", fontSize:'13px', color:'rgba(253,240,213,0.65)', lineHeight:1.9, margin:0, letterSpacing:'0.06em' }}>
                    Your empire evaluation has begun.<br/>
                    A response will be provided within 48 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: submitState === 'success' ? 'none' : 'flex', flexDirection:'column', gap:'14px', position:'relative', zIndex:2, marginTop:'0' }}>

                {/* Row 1: Full Name + Email */}
                <motion.div className="empire-field-box grid grid-cols-1 sm:grid-cols-2"
                  initial={{ opacity:0, y:24, filter:'blur(6px)' }}
                  whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
                  viewport={{ once:true, margin:'-20px' }}
                  transition={{ duration:0.65, delay:0.05, ease:[0.16,1,0.3,1] }}
                  style={{ gap:'24px', padding:'14px 16px', background:'#000000', border:'1.5px solid rgba(198,160,98,0.38)', borderRadius:'6px', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', boxShadow:'inset 0 1px 0 rgba(198,160,98,0.06), 0 4px 20px rgba(0,0,0,0.80)' }}>
                  <div>
                    <label className="empire-label">Full Name <span style={{color:'#D4AF6A'}}>*</span></label>
                    <input className={`empire-input${errors.name ? ' empire-input-error' : ''}`} type="text" placeholder="YOUR NAME"
                      value={form.name} onChange={e => { setForm(f => ({...f, name: e.target.value})); if (errors.name) setErrors(x => ({...x, name: undefined})); }} />
                    {errors.name && <span className="empire-error-msg">{errors.name}</span>}
                  </div>
                  <div>
                    <label className="empire-label">Email Address <span style={{color:'#D4AF6A'}}>*</span></label>
                    <input className={`empire-input${errors.email ? ' empire-input-error' : ''}`} type="email" placeholder="YOUR@EMAIL.COM"
                      value={form.email} onChange={e => { setForm(f => ({...f, email: e.target.value})); if (errors.email) setErrors(x => ({...x, email: undefined})); }} />
                    {errors.email && <span className="empire-error-msg">{errors.email}</span>}
                  </div>
                </motion.div>

                {/* Row 2: Phone + Company */}
                <motion.div className="empire-field-box grid grid-cols-1 sm:grid-cols-2"
                  initial={{ opacity:0, y:24, filter:'blur(6px)' }}
                  whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
                  viewport={{ once:true, margin:'-20px' }}
                  transition={{ duration:0.65, delay:0.16, ease:[0.16,1,0.3,1] }}
                  style={{ gap:'24px', padding:'14px 16px', background:'#000000', border:'1.5px solid rgba(198,160,98,0.38)', borderRadius:'6px', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', boxShadow:'inset 0 1px 0 rgba(198,160,98,0.06), 0 4px 20px rgba(0,0,0,0.80)' }}>
                  <div>
                    <label className="empire-label">Phone Number <span style={{color:'#D4AF6A'}}>*</span></label>
                    <input className={`empire-input${errors.phone ? ' empire-input-error' : ''}`} type="tel" placeholder="+1 000 000 0000"
                      value={form.phone} onChange={e => { setForm(f => ({...f, phone: e.target.value})); if (errors.phone) setErrors(x => ({...x, phone: undefined})); }} />
                    {errors.phone && <span className="empire-error-msg">{errors.phone}</span>}
                  </div>
                  <div>
                    <label className="empire-label">Company / Brand</label>
                    <input className="empire-input" type="text" placeholder="YOUR BRAND"
                      value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
                  </div>
                </motion.div>

                {/* Row 3: Services — grid for even alignment */}
                <motion.div className="empire-field-box"
                  initial={{ opacity:0, y:24, filter:'blur(6px)' }}
                  whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
                  viewport={{ once:true, margin:'-20px' }}
                  transition={{ duration:0.65, delay:0.28, ease:[0.16,1,0.3,1] }}
                  style={{ padding:'18px 16px', background:'#000000', border:'1.5px solid rgba(198,160,98,0.52)', borderRadius:'6px', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', boxShadow:'0 0 32px rgba(198,160,98,0.10), inset 0 1px 0 rgba(198,160,98,0.08), 0 8px 28px rgba(0,0,0,0.80)' }}>
                  {/* Section header */}
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
                    <div style={{ height:'1px', flex:1, background:'linear-gradient(90deg, transparent, rgba(212,175,106,0.55))' }} />
                    <span key={`svc-title-${cycle}`} style={{ display:'inline-flex', gap:'0.28em', alignItems:'center' }}>
                      {['WHICH','PILLAR','CALLS','YOU?'].map((word, wi) => (
                        <span key={wi} className="svc-pillar-word" style={{ animation:'selectSvcSlam 0.65s cubic-bezier(0.22,1,0.36,1) both', animationDelay:`${wi * 0.20}s`, ...(wi < 2 ? { color:'rgba(185,205,232,0.90)' } : { background:'linear-gradient(135deg, #FFE88A 0%, #D4AF60 40%, #FFE08A 70%, #C6A04A 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }) }}>{word}</span>
                      ))}
                    </span>
                    <div style={{ height:'1px', flex:1, background:'linear-gradient(90deg, rgba(212,175,106,0.55), transparent)' }} />
                  </div>

                  {/* Service icon cards */}
                  <div className="grid grid-cols-2" style={{ gap:'8px' }}>
                    {[
                      { name:'Branding',              sub:'Identity & Authority',           d:'M5 17 C5 9 8 3 12 3 C16 3 19 9 19 17 M3.5 17 L7.5 21 M20.5 17 L16.5 21' },
                      { name:'Performance Marketing', sub:'Growth & Reach',                 d:'M12 2 L12 22 M10 3 C9 1.5 15 1.5 14 3 M7 8 C5 7 5 12 8 12 C14 12 19 7 17 8 M7 14 C5 13 5 18 8 18 C14 18 19 13 17 14' },
                      { name:'AI Automation',         sub:'Systems & Power',                d:'M3 21 L3 3 L21 3 L21 17 L7 17 L7 7 L17 7 L17 13 L11 13' },
                      { name:'Web Development',       sub:'Presence & Speed',               d:'M12 2 L12 22 M6 2 L6 9 C6 11 8 11 8 9 M18 2 L18 9 C18 11 16 11 16 9 M6 2 L18 2' },
                      { name:'Holistic Empire Build',  sub:'All Services — Total Dominance', d:'M3 20 L3 13 L7 13 L7 9 L10 13 L12 5 L14 13 L17 9 L17 13 L21 13 L21 20 Z M9 20 V16 H15 V20' },
                    ].map((svc, idx) => {
                      const sel = form.services.includes(svc.name);
                      const full = idx === 4;
                      return (
                        <button key={svc.name} type="button" onClick={() => handleService(svc.name)}
                          style={{
                            gridColumn: full ? '1 / -1' : undefined,
                            position:'relative', cursor:'pointer', borderRadius:'4px',
                            padding: full ? '30px 24px 22px' : '22px 12px 18px',
                            display:'flex', flexDirection:'column',
                            alignItems:'center', justifyContent:'center',
                            gap: full ? '10px' : '9px',
                            fontFamily:"'Cinzel',serif",
                            border: full
                              ? (sel ? '1.5px solid rgba(212,175,106,0.90)' : '1.5px solid rgba(212,175,106,0.62)')
                              : (sel ? '1.5px solid rgba(212,175,106,0.92)' : '1.5px solid rgba(212,175,106,0.52)'),
                            outline: full
                              ? (sel ? '1px solid rgba(212,175,106,0.22)' : '1px solid rgba(212,175,106,0.12)')
                              : (sel ? '1px solid rgba(212,175,106,0.18)' : '1px solid rgba(212,175,106,0.08)'),
                            outlineOffset: '3px',
                            background: full
                              ? (sel
                                ? 'linear-gradient(160deg, rgba(20,14,4,0.98) 0%, rgba(4,3,1,1) 50%, rgba(18,12,3,0.97) 100%)'
                                : 'linear-gradient(160deg, rgba(8,6,2,0.99) 0%, rgba(2,2,1,1) 50%, rgba(6,5,1,0.98) 100%)')
                              : (sel
                                ? 'linear-gradient(160deg, rgba(22,16,4,0.98) 0%, rgba(5,4,1,1) 50%, rgba(20,14,3,0.97) 100%)'
                                : 'linear-gradient(160deg, rgba(8,6,2,0.99) 0%, rgba(2,2,1,1) 50%, rgba(6,5,1,0.98) 100%)'),
                            boxShadow: full
                              ? (sel
                                ? '0 0 36px rgba(212,175,106,0.22), 0 0 80px rgba(212,175,106,0.08), inset 0 0 24px rgba(212,175,106,0.07), inset 0 1px 0 rgba(255,232,138,0.12)'
                                : '0 0 22px rgba(212,175,106,0.14), 0 0 50px rgba(212,175,106,0.05), inset 0 0 16px rgba(212,175,106,0.04), inset 0 1px 0 rgba(255,232,138,0.08), 0 8px 30px rgba(0,0,0,0.70)')
                              : (sel
                                ? '0 0 28px rgba(212,175,106,0.16), inset 0 0 16px rgba(212,175,106,0.06), inset 0 1px 0 rgba(255,255,255,0.05)'
                                : 'inset 0 1px 0 rgba(255,255,255,0.03), 0 2px 8px rgba(0,0,0,0.22)'),
                            marginTop: full ? '4px' : undefined,
                            transition:'all 0.24s cubic-bezier(0.16,1,0.3,1)',
                            overflow:'hidden',
                          }}
                          onMouseEnter={e => { if(!sel && !full) { e.currentTarget.style.border='1.5px solid rgba(212,175,106,0.80)'; e.currentTarget.style.background='linear-gradient(160deg, rgba(22,16,4,0.98) 0%, rgba(5,4,1,1) 50%, rgba(20,14,3,0.97) 100%)'; e.currentTarget.style.transform='translateY(-2px)'; } if(!sel && full) { e.currentTarget.style.transform='translateY(-2px)'; } }}
                          onMouseLeave={e => { if(!sel && !full) { e.currentTarget.style.border='1.5px solid rgba(212,175,106,0.52)'; e.currentTarget.style.background='linear-gradient(160deg, rgba(8,6,2,0.99) 0%, rgba(2,2,1,1) 50%, rgba(6,5,1,0.98) 100%)'; } e.currentTarget.style.transform='translateY(0)'; }}
                        >
                          {/* Gold top accent bar — always on for Holistic Empire, on-select for others */}
                          {(sel || full) && <span aria-hidden="true" style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background: full ? 'linear-gradient(90deg, rgba(212,175,106,0.18), rgba(212,175,106,0.55), rgba(212,175,106,0.18))' : 'linear-gradient(90deg, transparent, rgba(212,175,106,0.90), transparent)' }} />}

                          {/* Continuous shimmer sweep — Holistic Empire only */}
                          {full && <span aria-hidden="true" style={{ position:'absolute', top:0, bottom:0, width:'45%', background:'linear-gradient(105deg, transparent, rgba(212,175,106,0.04), transparent)', animation:'empireGoldBeam 4s ease-in-out 1s infinite', pointerEvents:'none', transform:'skewX(-14deg)' }} />}

                          {/* Pulsing outer glow ring — Holistic Empire only */}
                          {full && <span aria-hidden="true" style={{ position:'absolute', inset:'-1px', borderRadius:'4px', animation:'empireSubmitRingPulse 3.5s ease-in-out infinite', pointerEvents:'none', opacity:0.55 }} />}

                          {/* "<svg width="11" height="10" viewBox="0 0 22 18" fill="none" style={{display:'inline-block',verticalAlign:'middle',marginRight:'5px',flexShrink:0}}><path d="M11 17 L11 7 M11 7 C9.5 4 6 1 3 3 C1 4.5 3 8.5 7 7.5 C8.5 7 10 7 11 7 M11 7 C12.5 4 16 1 19 3 C21 4.5 19 8.5 15 7.5 C13.5 7 12 7 11 7 M8 15 L11 7 L14 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>Highly Recommended" badge — Holistic Empire only */}
                          {full && (
                            <span style={{ position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%)', background:'linear-gradient(90deg, rgba(185,145,62,0.70), rgba(212,175,106,0.80), rgba(185,145,62,0.70))', color:'#07101D', fontSize:'8px', letterSpacing:'0.22em', fontWeight:800, fontFamily:"'Cinzel',serif", textTransform:'uppercase', padding:'3px 18px', borderRadius:'0 0 4px 4px', boxShadow:'0 2px 6px rgba(212,175,106,0.18)' }}><svg width="11" height="10" viewBox="0 0 22 18" fill="none" style={{display:'inline-block',verticalAlign:'middle',marginRight:'5px',flexShrink:0}}><path d="M11 17 L11 7 M11 7 C9.5 4 6 1 3 3 C1 4.5 3 8.5 7 7.5 C8.5 7 10 7 11 7 M11 7 C12.5 4 16 1 19 3 C21 4.5 19 8.5 15 7.5 C13.5 7 12 7 11 7 M8 15 L11 7 L14 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>Highly Recommended</span>
                          )}

                          {/* Checkmark badge */}
                          {sel && (
                            <span style={{ position:'absolute', top: full ? '12px' : '7px', right:'10px', width:'18px', height:'18px', borderRadius:'50%', border:'1px solid rgba(212,175,106,0.75)', background:'rgba(212,175,106,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                              <svg width="9" height="9" viewBox="0 0 8 8" fill="none"><polyline points="1.5,4 3,5.5 6.5,1.5" stroke="#D4AF6A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </span>
                          )}

                          {/* Icon */}
                          <svg width={full ? 52 : 30} height={full ? 52 : 30} viewBox="0 0 24 24" fill="none"
                            style={{ flexShrink:0, color: (sel || full) ? '#D4AF6A' : 'rgba(212,175,106,0.40)', filter: (sel || full) ? 'drop-shadow(0 0 8px rgba(212,175,106,0.55))' : 'none', transition:'color 0.24s ease, filter 0.24s ease' }}>
                            {full ? (<>
                              {/* Greek Parthenon temple */}
                              <polyline points="2,9 12,2 22,9" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
                              <line x1="1.5" y1="9" x2="22.5" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                              <line x1="2.5" y1="11" x2="21.5" y2="11" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
                              {[4.5,7.5,11,14.5,17.5].map((x,ci) => <line key={ci} x1={x} y1="11" x2={x} y2="19.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>)}
                              <line x1="2.5" y1="19.5" x2="21.5" y2="19.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                              <line x1="1.5" y1="21" x2="22.5" y2="21" stroke="currentColor" strokeWidth="1.0" strokeLinecap="round"/>
                              <line x1="0.5" y1="22.5" x2="23.5" y2="22.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
                            </>) : (
                              <path d={svc.d} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            )}
                          </svg>

                          {/* Greek meander rule — Holistic card only */}
                          {full && (
                            <svg aria-hidden="true" style={{ width:'88%', height:'8px', pointerEvents:'none', opacity:0.55, flexShrink:0 }} viewBox="0 0 160 8" preserveAspectRatio="xMidYMid meet">
                              <polyline points="0,8 0,0 4,0 4,8 8,8 8,0 12,0 12,8 16,8 16,0 20,0 20,8 24,8 24,0 28,0 28,8 32,8 32,0 36,0 36,8 40,8 40,0 44,0 44,8 48,8 48,0 52,0 52,8 56,8 56,0 60,0 60,8 64,8 64,0 68,0 68,8 72,8 72,0 76,0 76,8 80,8 80,0 84,0 84,8 88,8 88,0 92,0 92,8 96,8 96,0 100,0 100,8 104,8 104,0 108,0 108,8 112,8 112,0 116,0 116,8 120,8 120,0 124,0 124,8 128,8 128,0 132,0 132,8 136,8 136,0 140,0 140,8 144,8 144,0 148,0 148,8 152,8 152,0 156,0 156,8 160,8"
                                stroke="rgba(212,175,106,0.70)" strokeWidth="0.9" fill="none" strokeLinecap="square"/>
                            </svg>
                          )}

                          {/* Label + sub */}
                          <div style={{ textAlign:'center' }}>
                            <div style={{ fontSize: full ? '13px' : '11px', letterSpacing:'0.16em', textTransform:'uppercase', fontWeight:700, color: full ? '#FFE08A' : (sel ? '#ffffff' : 'rgba(255,255,255,0.82)'), lineHeight:1.3, transition:'color 0.24s ease', wordBreak:'break-word' }}>{svc.name}</div>
                            <div style={{ fontSize: full ? '9.5px' : '9px', letterSpacing:'0.08em', textTransform:'uppercase', color: full ? 'rgba(212,175,106,0.55)' : (sel ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.38)'), marginTop:'4px', transition:'color 0.24s ease', fontFamily:"'Inter',sans-serif", fontWeight:400 }}>{svc.sub}</div>
                          </div>

                          {/* "All In" pill — centered below text */}
                          {full && (
                            <span style={{ fontSize:'8.5px', letterSpacing:'0.22em', textTransform:'uppercase', fontFamily:"'Cinzel',serif", fontWeight:700, color: sel ? '#0A0F1A' : 'rgba(212,175,106,0.80)', background: sel ? 'linear-gradient(90deg, #D4AF60, #FFE08A, #D4AF60)' : 'rgba(212,175,106,0.10)', border:'1px solid rgba(212,175,106,0.45)', padding:'6px 20px', borderRadius:'2px', transition:'all 0.24s ease', whiteSpace:'nowrap' }}>All In</span>
                          )}

                          {/* Greek corner ornaments — Holistic card only */}
                          {full && ['tl','tr','bl','br'].map(p => (
                            <svg key={p} aria-hidden="true" width="20" height="20" viewBox="0 0 14 14" fill="none"
                              style={{ position:'absolute', top: p[0]==='t'?'6px':undefined, bottom: p[0]==='b'?'6px':undefined, left: p[1]==='l'?'7px':undefined, right: p[1]==='r'?'7px':undefined, opacity:0.50, pointerEvents:'none', transform: p==='tr'?'rotate(90deg)':p==='br'?'rotate(180deg)':p==='bl'?'rotate(270deg)':'rotate(0deg)' }}>
                              <polyline points="2,12 2,2 12,2" stroke="rgba(212,175,106,0.90)" strokeWidth="1.1" fill="none" strokeLinecap="square"/>
                              <polyline points="5,12 5,5 12,5" stroke="rgba(212,175,106,0.50)" strokeWidth="0.7" fill="none" strokeLinecap="square"/>
                            </svg>
                          ))}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <p style={{ fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.14em', color:'rgba(255,120,100,0.85)', marginTop:'10px', textAlign:'center' }}>{errors.services}</p>}
                </motion.div>

                {/* Row 4: Project Description */}
                <motion.div className="empire-field-box"
                  initial={{ opacity:0, y:24, filter:'blur(6px)' }}
                  whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
                  viewport={{ once:true, margin:'-20px' }}
                  transition={{ duration:0.65, delay:0.40, ease:[0.16,1,0.3,1] }}
                  style={{ padding:'14px 16px', background:'#000000', border:'1.5px solid rgba(198,160,98,0.38)', borderRadius:'6px', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', boxShadow:'inset 0 1px 0 rgba(198,160,98,0.06), 0 4px 20px rgba(0,0,0,0.80)' }}>
                  <label className="empire-label">Project Description <span style={{color:'#D4AF6A'}}>*</span></label>
                  <textarea className={`empire-input${errors.description ? ' empire-input-error' : ''}`} rows={3} placeholder="DESCRIBE YOUR VISION AND GOALS..."
                    value={form.description} onChange={e => { setForm(f => ({...f, description: e.target.value})); if (errors.description) setErrors(x => ({...x, description: undefined})); }}
                    style={{ resize:'none', lineHeight:'1.75', width:'100%' }}
                  />
                  {errors.description && <span className="empire-error-msg">{errors.description}</span>}
                </motion.div>

                {/* Submit */}
                <div style={{ marginTop:'0', position:'relative', background:'linear-gradient(160deg, rgba(8,6,2,0.99) 0%, rgba(2,2,1,1) 50%, rgba(6,5,1,0.98) 100%)', border:'1.5px solid rgba(212,175,106,0.38)', borderRadius:'6px', padding:'16px', boxShadow:'inset 0 1px 0 rgba(255,232,138,0.06), 0 4px 20px rgba(0,0,0,0.65)' }}>
                  <button type="submit"
                    style={{
                      width:'100%', height:'60px', padding:'0 32px',
                      background:'linear-gradient(160deg, rgba(10,7,2,1) 0%, rgba(2,2,1,1) 50%, rgba(6,4,1,1) 100%)',
                      color:'#D4AF60', fontFamily:"'Cinzel',serif", fontSize:'12px', fontWeight:800,
                      letterSpacing:'0.30em', textTransform:'uppercase', border:'none', cursor:'pointer',
                      position:'relative', overflow:'visible', display:'flex', alignItems:'center', justifyContent:'center',
                      boxShadow:'0 8px 32px rgba(4,8,15,0.60), 0 2px 12px rgba(212,175,106,0.12)',
                      transition:'transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform='translateY(-3px)';
                      e.currentTarget.style.filter='brightness(1.12)';
                      e.currentTarget.style.boxShadow='0 14px 40px rgba(4,8,15,0.70), 0 4px 20px rgba(212,175,106,0.22)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform='translateY(0)';
                      e.currentTarget.style.filter='brightness(1)';
                      e.currentTarget.style.boxShadow='0 8px 32px rgba(4,8,15,0.60), 0 2px 12px rgba(212,175,106,0.12)';
                    }}
                  >
                    {/* Greek SVG border */}
                    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }}
                      viewBox="0 0 400 60" preserveAspectRatio="none">
                      {/* Outer border */}
                      <rect x="0.5" y="0.5" width="399" height="59" fill="none"
                        stroke="rgba(212,175,106,0.60)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      {/* Inner border */}
                      <rect x="4" y="4" width="392" height="52" fill="none"
                        stroke="rgba(212,175,106,0.16)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />

                      {/* Left meander block */}
                      <polyline points="4,4 10,4 10,10 16,10 16,4 22,4 22,10 28,10 28,4 34,4 34,10 40,10 40,4"
                        fill="none" stroke="rgba(212,175,106,0.45)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
                      <polyline points="4,56 10,56 10,50 16,50 16,56 22,56 22,50 28,50 28,56 34,56 34,50 40,50 40,56"
                        fill="none" stroke="rgba(212,175,106,0.45)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />

                      {/* Right meander block */}
                      <polyline points="360,4 366,4 366,10 372,10 372,4 378,4 378,10 384,10 384,4 390,4 390,10 396,10 396,4"
                        fill="none" stroke="rgba(212,175,106,0.45)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
                      <polyline points="360,56 366,56 366,50 372,50 372,56 378,56 378,50 384,50 384,56 390,56 390,50 396,50 396,56"
                        fill="none" stroke="rgba(212,175,106,0.45)" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />

                    </svg>

                    {/* Shimmer sweep */}
                    <span aria-hidden="true" style={{
                      position:'absolute', inset:0,
                      background:'linear-gradient(105deg, transparent 30%, rgba(212,175,106,0.07) 50%, transparent 70%)',
                      animation:'empireSubmitShimmer 3s ease-in-out 1s infinite',
                      pointerEvents:'none',
                    }} />

                    {/* Pulsing outer glow ring */}
                    <span aria-hidden="true" style={{
                      position:'absolute', inset:0,
                      borderRadius:'2px',
                      animation:'empireSubmitRingPulse 2.8s ease-in-out infinite',
                      pointerEvents:'none',
                    }} />

                    {/* Gold gradient text */}
                    <span style={{
                      position:'relative', zIndex:1,
                      background:'linear-gradient(135deg, #FFE88A 0%, #D4AF60 35%, #F5CC72 60%, #C8A040 100%)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                      opacity: submitState === 'loading' ? 0.6 : 1,
                      transition: 'opacity 0.22s ease',
                    }}>
                      {submitState === 'loading' ? 'PROCESSING APPLICATION...' : 'SUBMIT EMPIRE APPLICATION'}
                    </span>
                  </button>

                  {submitState === 'error' && (
                    <p style={{ textAlign:'center', fontSize:'11px', color:'rgba(255,120,100,0.85)', marginTop:'12px', letterSpacing:'0.14em', fontFamily:"'Cinzel',serif" }}>
                      APPLICATION FAILED — Please try again in a few moments.
                    </p>
                  )}
                  {submitState !== 'error' && (
                    <p style={{ textAlign:'center', fontSize:'10.5px', color:'rgba(232,200,128,0.55)', marginTop:'14px', letterSpacing:'0.16em', fontFamily:"'Cinzel',serif",
                      animation:'empireReviewedFade 3.5s ease-in-out 2s infinite',
                    }}>
                      Applications are reviewed within 48 hours.
                    </p>
                  )}
                </div>

              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- COMPONENT: FOOTER ---
const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#050A12] border-t border-[#c6a062]/20 relative z-10 footer-greek-keyline" style={{ paddingTop:'48px', paddingBottom:'32px' }}>
      <div className="greek-stone-texture-overlay" />
      <div className="calioon-global-container relative z-10">

        {/* ── Top row: brand + back-to-top ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full mb-8">
          {/* Brand + social links */}
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <a href="#" className="flex items-center" style={{ gap:'6px', textDecoration:'none' }}>
              <img src={imgIcon} alt="" aria-hidden="true"
                style={{ height:'38px', width:'38px', objectFit:'contain',
                  filter:'drop-shadow(0 0 6px rgba(198,160,98,0.35))' }} />
              <span style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:'20px',
                letterSpacing:'0.22em', textTransform:'uppercase', color:'#F2EDE4', lineHeight:1,
              }}>CALIOON</span>
            </a>

            {/* Social links */}
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
              {[
                {
                  name: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/calioon/',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  name: 'Instagram',
                  href: 'https://www.instagram.com/officialcalioon?igsh=MWJ5cHhqd3Y1OHhudw%3D%3D&utm_source=qr',
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink:0 }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ),
                },
              ].map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    border: '1px solid rgba(198,160,98,0.35)',
                    padding: '7px 14px', textDecoration: 'none',
                    fontFamily: "'Cinzel',serif", fontSize: '10px',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(198,160,98,0.65)',
                    transition: 'color 0.22s ease, border-color 0.22s ease, background 0.22s ease',
                    background: 'rgba(198,160,98,0.04)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color='rgba(198,160,98,1)'; e.currentTarget.style.borderColor='rgba(198,160,98,0.70)'; e.currentTarget.style.background='rgba(198,160,98,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(198,160,98,0.65)'; e.currentTarget.style.borderColor='rgba(198,160,98,0.35)'; e.currentTarget.style.background='rgba(198,160,98,0.04)'; }}
                >
                  {icon}
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Back to top */}
          <button onClick={scrollToTop} aria-label="Back to top"
            style={{
              display:'flex', alignItems:'center', gap:'8px',
              fontFamily:"'Cinzel',serif", fontSize:'10px', letterSpacing:'0.22em',
              textTransform:'uppercase', color:'rgba(198,160,98,0.50)',
              background:'none', border:'none', cursor:'pointer', padding:0,
              transition:'color 0.22s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(198,160,98,0.90)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(198,160,98,0.50)'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 13 L8 3 M4 7 L8 3 L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK TO TOP
          </button>
        </div>

        {/* ── Divider ── */}
        <div style={{ height:'1px', background:'linear-gradient(90deg, transparent, rgba(198,160,98,0.20), transparent)', marginBottom:'20px' }} />

        {/* ── Bottom row: links + copyright ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          {/* Legal links + contact */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start" style={{ gap:'6px 20px' }}>
            {[
              { label:'Privacy Policy', href:'/privacy' },
              { label:'Terms of Service', href:'/terms' },
              { label:'calioon.global@gmail.com', href:'mailto:calioon.global@gmail.com' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="footer-legal-link"
                style={{
                  fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.18em',
                  textTransform:'uppercase', color:'rgba(198,160,98,0.38)', textDecoration:'none',
                  transition:'color 0.22s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(198,160,98,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(198,160,98,0.38)'}
              >{link.label}</a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{
            fontFamily:"'Cinzel',serif", fontSize:'9.5px', letterSpacing:'0.18em',
            textTransform:'uppercase', color:'rgba(255,255,255,0.20)', margin:0, textAlign:'center', padding:'0 8px',
          }}>
            © {new Date().getFullYear()} CALIOON COLLECTIVE. AD OLYMPUM.
          </p>
        </div>

      </div>
    </footer>
  );
};

// --- COMPONENT: INTRO SCREEN ---
const IntroScreen = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 2900);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      key="intro"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#04080F',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', overflow: 'hidden',
      }}
      exit={{ y: '-100%', transition: { duration: 0.90, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Ambient radial glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(11,21,38,0.70) 0%, rgba(4,8,15,0.95) 100%)',
      }} />

      {/* Corner ornaments */}
      {[
        { top:28, left:28, path:'M0,40 L0,0 L40,0' },
        { top:28, right:28, path:'M40,40 L40,0 L0,0' },
        { bottom:28, left:28, path:'M0,0 L0,40 L40,40' },
        { bottom:28, right:28, path:'M40,0 L40,40 L0,40' },
      ].map((c, i) => (
        <motion.svg key={i} width="40" height="40" viewBox="0 0 40 40" fill="none"
          style={{ position:'absolute', top:c.top, left:c.left, right:c.right, bottom:c.bottom, pointerEvents:'none' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
        >
          <path d={c.path} stroke="rgba(198,160,98,0.35)" strokeWidth="1" strokeLinecap="square" />
        </motion.svg>
      ))}

      {/* Top rule */}
      <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', marginTop:'-148px', pointerEvents:'none' }}
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width:'220px', height:'1px', background:'linear-gradient(to right, transparent, rgba(198,160,98,0.55), transparent)' }} />
      </motion.div>

      {/* Centre content */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'22px', position:'relative', zIndex:1 }}>

        {/* Icon */}
        <motion.img
          src={imgIcon}
          alt=""
          aria-hidden="true"
          style={{
            width:'80px', height:'80px', objectFit:'contain', display:'block',
            filter:'drop-shadow(0 0 22px rgba(198,160,98,0.60)) drop-shadow(0 0 8px rgba(198,160,98,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.70))',
          }}
          initial={{ opacity: 0, scale: 0.80, filter: 'blur(12px) drop-shadow(0 0 0px rgba(198,160,98,0))' }}
          animate={{ opacity: 1, scale: 1, filter: 'drop-shadow(0 0 22px rgba(198,160,98,0.60)) drop-shadow(0 0 8px rgba(198,160,98,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.70))' }}
          transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* CALIOON wordmark — horizontal sweep */}
        <div style={{ overflow:'hidden', lineHeight:1, width:'100%', textAlign:'center' }}>
          <motion.div
            style={{
              fontFamily:"'Cinzel',serif", fontSize:'clamp(28px, 12vw, 54px)', fontWeight:700,
              letterSpacing:'clamp(0.10em, 2.5vw, 0.32em)', paddingRight:'clamp(0.10em, 2.5vw, 0.32em)',
              color:'#fdf0d5', lineHeight:1, whiteSpace:'nowrap',
            }}
            initial={{ clipPath:'inset(0 100% 0 0)', opacity:1 }}
            animate={{ clipPath:'inset(0 0% 0 0)' }}
            transition={{ duration: 1.05, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            CALIOON
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          style={{ width:'100%', height:'1px', background:'linear-gradient(to right, transparent, rgba(198,160,98,0.50), transparent)', transformOrigin:'center' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 1.62, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline */}
        <motion.div
          style={{
            fontFamily:"'Cinzel',serif", fontSize:'clamp(8px, 2.5vw, 10.5px)', fontWeight:600,
            letterSpacing:'clamp(0.14em, 2vw, 0.48em)', paddingRight:'clamp(0.14em, 2vw, 0.48em)',
            color:'rgba(198,160,98,0.68)', textTransform:'uppercase', whiteSpace:'nowrap',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.70, delay: 1.82, ease: [0.22, 1, 0.36, 1] }}
        >
          ARCHITECTS OF EMPIRE
        </motion.div>

      </div>

      {/* Bottom rule */}
      <motion.div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', marginTop:'148px', pointerEvents:'none' }}
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.20, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width:'220px', height:'1px', background:'linear-gradient(to right, transparent, rgba(198,160,98,0.55), transparent)' }} />
      </motion.div>

      {/* Progress bar — bottom edge */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', background:'rgba(198,160,98,0.08)' }}>
        <motion.div
          style={{ height:'100%', background:'linear-gradient(to right, rgba(198,160,98,0.30), rgba(198,160,98,0.80), rgba(198,160,98,0.30))', transformOrigin:'left center' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.65, delay: 0.20, ease: 'linear' }}
        />
      </div>

    </motion.div>
  );
};

// --- MAIN RUNTIME HOOK ---
export default function App() {
  useEffect(() => {
    const s = document.createElement("style");
    s.id = "calioon-production-recovery-css";
    s.innerText = styles;
    document.head.appendChild(s);
    return () => {
      const existing = document.getElementById("calioon-production-recovery-css");
      if (existing) document.head.removeChild(existing);
    };
  }, []);

    const [introComplete, setIntroComplete] = useState(() =>
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem('calioon_intro') === '1'
  );
  const handleIntroComplete = () => {
    sessionStorage.setItem('calioon_intro', '1');
    setIntroComplete(true);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      <motion.main
        className="antialiased bg-[#050A12] selection:bg-[#c6a062] selection:text-black min-h-screen relative text-white overflow-x-hidden w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.60, ease: 'easeOut' }}
      >
        <div className="grain-overlay" />
        <Navbar />
        <Hero />
        <Philosophy />
        <Domains />
        <OurGods />
        <Process />
        <CaseStudies />
        <Contact />
        <Footer />
      </motion.main>
    </>
  );
}
