// components/RasoafHero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED
// v12 — Content pushed down to avoid navbar overlap
//   Inherits ALL v11 enhancements. New in v12:
//   • Increased top padding/margin to account for fixed navbar
//   • Content now sits comfortably below navbar
//   • All existing content, animations, and functionality preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Panel data ────────────────────────────────────────────────────────────────
const PANELS = [
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781839939/SOAR-FreeTrial-BuildAndSell-Guide_2_nmnzar.docx.png",
    alt: "Desert landscape — RASOAF travel destinations",
    label: "Destinations",
    tag: "50+ Countries",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg",
    alt: "Hajj pilgrimage — Makkah",
    label: "Hajj & Umrah",
    tag: "Sacred Journey",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png",
    alt: "Premium travel experience",
    label: "Premium Tours",
    tag: "Curated Experience",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg",
    alt: "International flight — visa services",
    label: "Visa Services",
    tag: "Fast Processing",
  },
];

// 2× clone — xPercent:-50% repeat:-1 = true seamless loop
const MARQUEE_PANELS = [...PANELS, ...PANELS];

const BG_VIDEO =
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781351650/3473-170690984_medium_h9g9gt.mp4";

const TV_VIDEO =
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781354114/3473-170690984_medium_vlr3ri.mp4";

const BG_SLIDES = [
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781839939/SOAR-FreeTrial-BuildAndSell-Guide_2_nmnzar.docx.png",
    position: "50% 55%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png",
    position: "50% 50%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_gsrsap.jpg",
    position: "50% 60%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877301/mohamed_hassan-hajj-8794441_1920_gsrsap.png",
    position: "50% 45%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg",
    position: "50% 55%",
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500;1,700;1,800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .rh-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #fafaf8;
    color: #1a1a1a;
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ── HERO ─────────────────────────────────────────────────────────────── */
  .rh-hero {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    background: #0a0a0a;
    /* v12: increased top padding to account for fixed navbar */
    padding-top: clamp(80px, 12vh, 120px);
    padding-bottom: 0;
    isolation: isolate;
  }

  /* ── v11: Background height reduced to 60% ──────────────────────────── */
  .rh-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60%;
    z-index: 0;
    overflow: hidden;
  }

  .rh-bgvid {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    will-change: transform, opacity;
  }
  .rh-bgvid.active { opacity: 1; }

  .rh-bgslide {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    will-change: transform, opacity;
    opacity: 0;
  }
  .rh-bgslide.active { opacity: 1; }

  .rh-glass-mask {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 60%;
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 65% 50% at 50% 45%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%),
      radial-gradient(ellipse 55% 35% at 50% 48%, rgba(255,255,255,0.03) 0%, transparent 60%);
    mix-blend-mode: overlay;
    transition: opacity 0.6s ease;
  }

  .rh-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 80% 35% at 50% 0%,  rgba(0,0,0,0.50) 0%, transparent 100%),
      radial-gradient(ellipse 100% 55% at 50% 100%, rgba(0,0,0,0.78) 0%, transparent 100%),
      linear-gradient(180deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.14) 50%, rgba(0,0,0,0.68) 100%);
  }

  .rh-vignette {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(ellipse 120% 100% at 0% 50%,   rgba(196,151,42,0.07) 0%, transparent 55%),
      radial-gradient(ellipse 120% 100% at 100% 50%, rgba(196,151,42,0.07) 0%, transparent 55%);
  }

  /* ── CONTENT ──────────────────────────────────────────────────────────── */
  .rh-content {
    position: relative;
    z-index: 10;
    width: 100%;
    text-align: center;
    padding: 0 clamp(16px, 4vw, 48px);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* v12: increased top margin to push content below navbar */
    margin-top: clamp(40px, 6vh, 80px);
    margin-bottom: clamp(16px, 3vh, 32px);
  }

  .rh-headline-wrapper {
    position: relative;
    display: inline-block;
    opacity: 0;
  }

  .rh-sup-text {
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(9px, 0.85vw, 12px);
    font-weight: 500;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(196,151,42,0.85);
    display: block;
    text-align: center;
    margin-bottom: clamp(6px, 0.8vw, 12px);
    opacity: 0;
    transform: translateY(8px);
    position: relative;
    padding: 0 16px;
  }
  .rh-sup-text::before,
  .rh-sup-text::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.3));
  }
  .rh-sup-text::before {
    left: -10px;
    transform: translateY(-50%) rotate(180deg);
  }
  .rh-sup-text::after {
    right: -10px;
    transform: translateY(-50%);
  }

  .rh-headline {
    font-family: 'Playfair Display', Georgia, 'Plus Jakarta Sans', serif;
    font-weight: 700;
    font-size: clamp(2.8rem, 7vw, 6.5rem);
    line-height: 1.04;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin: 0 auto clamp(6px, 1vw, 12px);
    max-width: 860px;
    opacity: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .rh-headline .rh-word { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .rh-headline .rh-char { display: inline-block; will-change: transform, opacity; }
  .rh-headline em { 
    font-style: italic; 
    font-weight: 500; 
    color: #C4972A;
    text-shadow: 0 0 40px rgba(196,151,42,0.15);
  }

  .rh-subtitle {
    font-family: 'Inter', 'DM Sans', sans-serif;
    font-size: clamp(0.85rem, 1.3vw, 1.1rem);
    font-weight: 350;
    line-height: 1.6;
    color: rgba(255,255,255,0.75);
    max-width: 500px;
    margin: 0 auto clamp(16px, 2.5vw, 28px);
    opacity: 0;
    transform: translateY(14px);
    letter-spacing: 0.01em;
  }

  .rh-cta-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 1.5vw, 20px);
    flex-wrap: wrap;
    margin-bottom: clamp(16px, 2.5vh, 28px);
    opacity: 0;
    transform: translateY(14px);
  }

  .rh-cta-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(13px, 1.1vw, 16px);
    font-weight: 700;
    color: #0f1d3d;
    background: linear-gradient(135deg, #C4972A 0%, #dba82e 100%);
    border: none;
    padding: clamp(11px, 1vw, 14px) clamp(24px, 2.5vw, 36px);
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 4px 20px rgba(196,151,42,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
    transform: translateY(0);
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
  }
  .rh-cta-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #dba82e 0%, #e8b840 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .rh-cta-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 32px rgba(196,151,42,0.45), inset 0 1px 0 rgba(255,255,255,0.3);
  }
  .rh-cta-primary:hover::before { opacity: 1; }
  .rh-cta-primary:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 12px rgba(196,151,42,0.25);
  }
  .rh-cta-primary span { position: relative; z-index: 1; }
  .rh-cta-primary svg { 
    position: relative; 
    z-index: 1; 
    transition: transform 0.3s ease; 
  }
  .rh-cta-primary:hover svg { transform: translateX(4px); }

  .rh-cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(13px, 1.1vw, 16px);
    font-weight: 600;
    color: rgba(255,255,255,0.9);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1.5px solid rgba(255,255,255,0.15);
    padding: clamp(11px, 1vw, 14px) clamp(24px, 2.5vw, 36px);
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  .rh-cta-secondary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(196,151,42,0.10);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 50px;
  }
  .rh-cta-secondary:hover {
    transform: translateY(-3px) scale(1.02);
    border-color: rgba(196,151,42,0.4);
    color: #C4972A;
    box-shadow: 0 8px 28px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  }
  .rh-cta-secondary:hover::before { opacity: 1; }
  .rh-cta-secondary:active {
    transform: translateY(0) scale(0.98);
  }
  .rh-cta-secondary span { position: relative; z-index: 1; }
  .rh-cta-secondary svg { 
    position: relative; 
    z-index: 1; 
    transition: transform 0.3s ease; 
  }
  .rh-cta-secondary:hover svg { transform: translateX(4px); }

  .rh-trust-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 1.2vw, 16px);
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(14px);
  }

  .rh-trust-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 100px;
    padding: 5px 14px 5px 10px;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(8px, 0.75vw, 10px);
    font-weight: 450;
    color: rgba(255,255,255,0.75);
    letter-spacing: 0.03em;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.12);
  }
  .rh-trust-badge:hover {
    border-color: rgba(196,151,42,0.4);
    background: rgba(196,151,42,0.10);
    color: #C4972A;
    transform: translateY(-2px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 20px rgba(196,151,42,0.10);
  }
  .rh-trust-badge svg { 
    color: #C4972A; 
    flex-shrink: 0; 
    width: 10px; 
    height: 10px;
  }
  .rh-trust-badge .badge-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(196,151,42,0.15);
    color: #C4972A;
    flex-shrink: 0;
  }
  .rh-trust-badge .badge-check svg {
    width: 8px;
    height: 8px;
  }

  /* ── MARQUEE ──────────────────────────────────────────────────────────── */
  .rh-marquee-wrap {
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top: auto;
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0,0,0,0.15) 3%,
      rgba(0,0,0,1) 8%,
      rgba(0,0,0,1) 92%,
      rgba(0,0,0,0.15) 97%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0,0,0,0.15) 3%,
      rgba(0,0,0,1) 8%,
      rgba(0,0,0,1) 92%,
      rgba(0,0,0,0.15) 97%,
      transparent 100%
    );
    padding: clamp(6px, 1vw, 12px) 0;
  }

  .rh-marquee-track {
    display: flex;
    gap: clamp(10px, 1.6vw, 20px);
    width: max-content;
    will-change: transform;
    padding: 0 clamp(6px, 1vw, 12px);
  }

  @keyframes rh-marquee-css {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @media (max-width: 768px) {
    .rh-marquee-track {
      will-change: auto;
      animation: rh-marquee-css 28s linear infinite;
    }
    .rh-marquee-track:hover { animation-play-state: paused; }

    .rh-panel-register {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
      padding: 6px 13px 6px 10px;
      font-size: 9px;
    }
  }

  /* ── PANELS ───────────────────────────────────────────────────────────── */
  .rh-panel {
    position: relative;
    flex-shrink: 0;
    width: clamp(180px, 20vw, 280px);
    height: clamp(230px, 32vw, 360px);
    overflow: hidden;
    cursor: pointer;
    border-radius: clamp(10px, 1.4vw, 18px);
    clip-path: ellipse(58% 92% at 50% 92%);
    will-change: clip-path, transform;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08);
    background: #1a1a1a;
    transition: box-shadow 0.5s ease;
  }
  .rh-panel:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 16px 40px rgba(0,0,0,0.14);
    z-index: 2;
  }
  .rh-panel img {
    width: 100%; height: 110%;
    object-fit: cover;
    object-position: center 65%;
    display: block;
    will-change: transform;
    transform: scale(1.05);
    transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .rh-panel:hover img { transform: scale(1.18); }

  .rh-panel-grad {
    position: absolute; inset: 0;
    pointer-events: none;
    background: linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.78) 100%);
    z-index: 1;
    transition: background 0.5s ease;
  }
  .rh-panel:hover .rh-panel-grad {
    background: linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.85) 100%);
  }

  .rh-shimmer-sweep {
    position: absolute;
    top: 0; left: -150%; width: 60%; height: 100%;
    z-index: 5;
    pointer-events: none;
    background: linear-gradient(105deg,
      transparent 0%, transparent 35%,
      rgba(196,151,42,0.12) 45%, rgba(196,151,42,0.22) 50%,
      rgba(196,151,42,0.12) 55%, transparent 65%, transparent 100%
    );
  }

  .rh-panel-shimmer {
    position: absolute;
    bottom: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.6), transparent);
    z-index: 3;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .rh-panel:hover .rh-panel-shimmer { opacity: 1; }

  .rh-panel-info {
    position: absolute; inset: 0; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px;
    opacity: 1; transform: scale(1);
    transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .rh-panel-label {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(14px, 1.6vw, 18px);
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
    line-height: 1.15;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);
    animation: rhHeartPump 2.4s ease-in-out infinite;
  }
  .rh-panel-tag {
    font-family: 'Inter', sans-serif;
    font-size: clamp(7px, 0.7vw, 9px);
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.82);
    text-align: center;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  .rh-panel-num {
    position: absolute; bottom: 14px; right: 16px; z-index: 3;
    font-family: 'Inter', sans-serif;
    font-size: 10px; font-weight: 500;
    color: rgba(255,255,255,0.50);
    letter-spacing: 0.08em;
    opacity: 1; transform: scale(1);
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  .rh-panel-corner {
    position: absolute; bottom: 0; left: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 28px 0 0 28px;
    border-color: transparent transparent transparent #C4972A;
    z-index: 4;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: bottom left;
  }
  .rh-panel:hover .rh-panel-corner { opacity: 1; transform: scale(1); }

  .rh-panel-register {
    position: absolute;
    bottom: clamp(12px, 1.8vw, 18px);
    left: clamp(10px, 1.4vw, 14px);
    z-index: 6;
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(0, 0, 0, 0.52);
    backdrop-filter: blur(10px) saturate(160%);
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    border: 1px solid rgba(196,151,42,0.50);
    border-radius: 100px;
    padding: 5px 11px 5px 8px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(8px, 0.85vw, 10px);
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: #C4972A;
    cursor: pointer;
    opacity: 0;
    transform: translateY(6px) scale(0.92);
    transition:
      opacity 0.32s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
      background 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06);
    pointer-events: auto;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }
  .rh-panel-register::before {
    content: '';
    flex-shrink: 0;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #C4972A;
    box-shadow: 0 0 5px rgba(196,151,42,0.7);
    transition: background 0.25s ease, box-shadow 0.25s ease;
  }
  .rh-panel:hover .rh-panel-register,
  .rh-panel:focus-visible .rh-panel-register {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .rh-panel-register:hover {
    background: rgba(196,151,42,0.22);
    border-color: rgba(196,151,42,0.80);
    color: #e8b840;
    box-shadow: 0 4px 16px rgba(196,151,42,0.20), inset 0 1px 0 rgba(255,255,255,0.10);
  }
  .rh-panel-register:hover::before {
    background: #e8b840;
    box-shadow: 0 0 8px rgba(232,184,64,0.85);
  }
  .rh-panel-register:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 2px;
  }

  .rh-marquee-paused .rh-marquee-track {
    animation-play-state: paused !important;
  }

  .rh-tv-section {
    position: relative; z-index: 10;
    width: 100%;
    display: flex; align-items: center; justify-content: center;
    padding: clamp(12px, 2vw, 24px) clamp(16px, 4vw, 48px);
    margin-top: clamp(12px, 2vh, 24px);
  }

  .rh-tv-container {
    position: relative;
    display: flex; flex-direction: column; align-items: center;
    width: 100%; max-width: 420px;
    margin: 0 auto;
    z-index: 200;
    will-change: transform;
  }

  .rh-tv-screen {
    position: relative;
    width: 100%;
    border-radius: 16px;
    overflow: hidden;
    border: 2px solid rgba(196,151,42,0.55);
    box-shadow:
      0 0 0 1px rgba(196,151,42,0.15),
      0 0 30px rgba(196,151,42,0.35),
      0 0 60px rgba(196,151,42,0.10),
      0 20px 50px -12px rgba(0,0,0,0.5);
    background: #000;
    z-index: 201;
    aspect-ratio: 16/9;
    animation: rh-tv-glow 4s ease-in-out infinite;
  }
  @keyframes rh-tv-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(196,151,42,0.15), 0 0 30px rgba(196,151,42,0.35), 0 0 60px rgba(196,151,42,0.10), 0 20px 50px -12px rgba(0,0,0,0.5); }
    50%       { box-shadow: 0 0 0 1px rgba(196,151,42,0.22), 0 0 40px rgba(196,151,42,0.45), 0 0 80px rgba(196,151,42,0.14), 0 20px 50px -12px rgba(0,0,0,0.5); }
  }

  .rh-tv-video {
    width: 100%; height: 100%;
    display: block; object-fit: cover; background: #000;
  }

  .rh-tv-stand {
    width: 70%; height: 6px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 4px;
    margin-top: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    position: relative; z-index: 199;
  }
  .rh-tv-stand::before {
    content: '';
    position: absolute;
    bottom: -35px; left: 50%; transform: translateX(-50%);
    width: 50px; height: 35px;
    background: linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  .rh-tv-stand::after {
    content: '';
    position: absolute;
    bottom: -45px; left: 50%; transform: translateX(-50%);
    width: 80px; height: 10px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .rh-tv-leg-left, .rh-tv-leg-right {
    position: absolute; bottom: -30px;
    width: 12px; height: 30px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  .rh-tv-leg-left  { left: 25%; }
  .rh-tv-leg-right { right: 25%; }

  .rh-tv-controls {
    position: absolute;
    bottom: clamp(8px, 1.2vw, 14px);
    left: clamp(8px, 1.2vw, 14px);
    display: flex; gap: 8px; z-index: 210;
  }
  .rh-tv-control-btn {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1.5px solid rgba(196,151,42,0.45);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #C4972A;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    padding: 0;
  }
  .rh-tv-control-btn:hover {
    transform: scale(1.08);
    background: rgba(196,151,42,0.20);
    border-color: rgba(196,151,42,0.7);
  }
  .rh-tv-control-btn:focus-visible { outline: 2px solid #C4972A; outline-offset: 2px; }

  .rh-tv-badge {
    position: absolute;
    top: clamp(8px, 1.2vw, 14px);
    right: clamp(8px, 1.2vw, 14px);
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid rgba(196,151,42,0.45);
    font-family: 'Inter', sans-serif;
    font-size: 8px; color: #C4972A;
    letter-spacing: 0.08em; font-weight: 550;
    z-index: 210;
  }

  @keyframes rhHeartPump {
    0%, 100% { transform: scale(1); }
    15%       { transform: scale(1.06); }
    30%       { transform: scale(1); }
    45%       { transform: scale(1.05); }
    60%       { transform: scale(1); }
  }

  .rh-tv-control-btn:focus-visible,
  .rh-panel:focus-visible {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ── v12: Responsive adjustments for navbar offset ──────────────────── */
  /* Tablet */
  @media (max-width: 1024px) and (min-width: 769px) {
    .rh-hero {
      padding-top: clamp(70px, 10vh, 90px);
    }
    .rh-bg-wrapper {
      height: 55%;
    }
    .rh-glass-mask {
      height: 55%;
    }
    .rh-content {
      margin-top: clamp(30px, 5vh, 50px);
    }
    .rh-headline {
      font-size: clamp(2.4rem, 6vw, 4.5rem);
    }
    .rh-tv-container {
      max-width: 360px;
    }
    .rh-panel {
      width: clamp(160px, 22vw, 220px);
      height: clamp(200px, 30vw, 280px);
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .rh-hero {
      padding-top: clamp(60px, 8vh, 80px);
    }
    .rh-bg-wrapper {
      height: 50%;
    }
    .rh-glass-mask {
      height: 50%;
    }
    .rh-tv-screen { animation: none !important; }
    .rh-panel {
      will-change: auto;
      contain: layout;
    }
    .rh-panel img { will-change: auto; }
    .rh-panel-label { animation: none !important; }
    .rh-panel:hover img { transform: scale(1.05); }
    .rh-wave-stat-item {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      will-change: auto;
    }
    .rh-trust-badge {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .rh-tv-container { will-change: auto; }
    .rh-content {
      margin-top: clamp(20px, 3vh, 35px);
    }
    .rh-headline {
      font-size: clamp(2.2rem, 8vw, 3.2rem);
    }
    .rh-tv-container {
      max-width: 300px;
    }
    .rh-panel {
      width: clamp(140px, 35vw, 180px);
      height: clamp(180px, 45vw, 240px);
    }
    .rh-tv-stand {
      width: 60%; height: 5px; margin-top: 10px;
    }
    .rh-tv-stand::before {
      width: 40px; height: 28px; bottom: -28px;
    }
    .rh-tv-stand::after {
      width: 60px; height: 8px; bottom: -36px;
    }
    .rh-tv-leg-left, .rh-tv-leg-right {
      width: 10px; height: 25px; bottom: -25px;
    }
    .rh-tv-leg-left  { left: 28%; }
    .rh-tv-leg-right { right: 28%; }
    .rh-tv-control-btn {
      width: 30px; height: 30px;
    }
    .rh-tv-control-btn svg {
      width: 14px; height: 14px;
    }
    .rh-tv-badge {
      font-size: 7px; padding: 3px 10px;
    }
  }

  /* Small Mobile */
  @media (max-width: 480px) {
    .rh-hero {
      padding-top: clamp(50px, 6vh, 65px);
    }
    .rh-bg-wrapper {
      height: 45%;
    }
    .rh-glass-mask {
      height: 45%;
    }
    .rh-content {
      margin-top: clamp(15px, 2.5vh, 25px);
    }
    .rh-headline {
      font-size: clamp(1.8rem, 7vw, 2.6rem);
    }
    .rh-subtitle {
      font-size: clamp(0.7rem, 2.5vw, 0.8rem);
    }
    .rh-cta-primary,
    .rh-cta-secondary {
      font-size: clamp(11px, 2.5vw, 13px);
      padding: clamp(8px, 1.5vw, 10px) clamp(16px, 3vw, 24px);
    }
    .rh-trust-badge {
      font-size: clamp(7px, 2vw, 8px);
      padding: 4px 10px 4px 8px;
    }
    .rh-panel {
      width: clamp(120px, 40vw, 160px);
      height: clamp(160px, 50vw, 200px);
    }
    .rh-panel-label {
      font-size: clamp(12px, 3.5vw, 14px);
    }
    .rh-panel-tag {
      font-size: clamp(6px, 2vw, 7px);
    }
    .rh-tv-container {
      max-width: 240px;
    }
    .rh-tv-stand {
      width: 50%;
    }
    .rh-tv-leg-left  { left: 30%; }
    .rh-tv-leg-right { right: 30%; }
    .rh-tv-stand::before {
      width: 35px; height: 25px; bottom: -25px;
    }
    .rh-tv-stand::after {
      width: 50px; height: 7px; bottom: -32px;
    }
    .rh-tv-leg-left, .rh-tv-leg-right {
      width: 8px; height: 22px; bottom: -22px;
    }
    .rh-tv-control-btn {
      width: 28px; height: 28px;
    }
    .rh-tv-control-btn svg {
      width: 12px; height: 12px;
    }
  }

  /* Large Monitors */
  @media (min-width: 1441px) {
    .rh-hero {
      padding-top: clamp(100px, 14vh, 140px);
    }
    .rh-bg-wrapper {
      height: 65%;
    }
    .rh-glass-mask {
      height: 65%;
    }
    .rh-content {
      margin-top: clamp(50px, 7vh, 90px);
    }
    .rh-headline {
      font-size: clamp(5rem, 6vw, 7.5rem);
    }
    .rh-panel {
      width: clamp(260px, 18vw, 340px);
      height: clamp(340px, 30vw, 440px);
    }
    .rh-tv-container {
      max-width: 480px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rh-headline, .rh-sup-text, .rh-subtitle,
    .rh-trust-row, .rh-cta-row {
      opacity: 1 !important; transform: none !important; animation: none !important;
    }
    .rh-marquee-track { animation: none !important; }
    .rh-panel, .rh-panel img, .rh-panel-info, .rh-panel-shimmer,
    .rh-panel-num, .rh-panel-corner, .rh-tv-control-btn,
    .rh-shimmer-sweep, .rh-bgslide, .rh-bgvid, .rh-tv-screen {
      transition: none !important; animation: none !important;
    }
    .rh-panel-register {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .rh-panel-label { animation: none !important; }
    .rh-panel:hover img { transform: none !important; }
  }
`;

// ── Trust Badge Icons ──────────────────────────────────────────────────
const TrustCheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const TRUST_BADGES = [
  { icon: TrustCheckIcon, text: "Licensed Agency" },
  { icon: TrustCheckIcon, text: "Visa Assistance" },
  { icon: TrustCheckIcon, text: "Flight & Hotel" },
  { icon: TrustCheckIcon, text: "24/7 Support" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function RasoafHero() {
  const rootRef            = useRef(null);
  const heroRef            = useRef(null);
  const videoRef           = useRef(null);
  const tvVideoRef         = useRef(null);
  const tvContainerRef     = useRef(null);
  const supTextRef         = useRef(null);
  const headlineWrapperRef = useRef(null);
  const headlineRef        = useRef(null);
  const subtitleRef        = useRef(null);
  const ctaRowRef          = useRef(null);
  const trustRef           = useRef(null);
  const marqueeTrackRef    = useRef(null);
  const tvSectionRef       = useRef(null);
  const lenisRef           = useRef(null);
  const panelRefs          = useRef([]);
  const shimmerRef         = useRef(null);
  const marqueeTween       = useRef(null);
  const scrollTimerRef     = useRef(null);
  const bgSlideARef        = useRef(null);
  const bgSlideBRef        = useRef(null);
  const bgSlideIndex       = useRef(0);
  const bgModeRef          = useRef("video");
  const rafHandleRef       = useRef(null);
  const magnetMapRef       = useRef(new Map());

  const [videoLoaded,     setVideoLoaded]     = useState(false);
  const [tvVideoReady,    setTvVideoReady]    = useState(false);
  const [isTvPlaying,     setIsTvPlaying]     = useState(true);
  const [isTvMuted,       setIsTvMuted]       = useState(false);
  const [tvVideoError,    setTvVideoError]    = useState(false);
  const [marqueePaused,   setMarqueePaused]   = useState(false);

  const isMobileRef = useRef(false);
  useEffect(() => {
    isMobileRef.current = window.innerWidth <= 768;
  }, []);

  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    if (isMobileRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const tick = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafHandleRef.current = requestAnimationFrame(tick);
    };
    rafHandleRef.current = requestAnimationFrame(tick);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(rafHandleRef.current);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  // ── Video load ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onCanPlay = () => setVideoLoaded(true);
    vid.addEventListener("canplaythrough", onCanPlay, { once: true });
    if (vid.readyState >= 3) setVideoLoaded(true);
    return () => vid.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  // ── TV Video handlers ──────────────────────────────────────────────────────
  const toggleTvPlay = useCallback(() => {
    if (tvVideoRef.current) {
      if (isTvPlaying) tvVideoRef.current.pause();
      else tvVideoRef.current.play().catch(() => {});
      setIsTvPlaying(!isTvPlaying);
    }
  }, [isTvPlaying]);

  const toggleTvMute = useCallback(() => {
    if (tvVideoRef.current) {
      tvVideoRef.current.muted = !isTvMuted;
      setIsTvMuted(!isTvMuted);
    }
  }, [isTvMuted]);

  const handleTvVideoError   = useCallback(() => setTvVideoError(true),  []);
  const handleTvVideoCanPlay = useCallback(() => setTvVideoReady(true),  []);

  // ── Scroll-aware marquee speed ────────────────────────────────────────────
  const slowMarquee = useCallback(() => {
    if (!marqueeTween.current) return;
    gsap.to(marqueeTween.current, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      if (marqueeTween.current) {
        gsap.to(marqueeTween.current, { timeScale: 1, duration: 1.2, ease: "power2.inOut" });
      }
    }, 800);
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.on("scroll", slowMarquee);
    return () => {
      lenis.off("scroll", slowMarquee);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [slowMarquee]);

  // ── Marquee pause on hover / touch ────────────────────────────────────────
  const pauseMarquee = useCallback(() => {
    setMarqueePaused(true);
    if (marqueeTween.current) {
      if (scrollTimerRef.current) { clearTimeout(scrollTimerRef.current); scrollTimerRef.current = null; }
      gsap.to(marqueeTween.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  const resumeMarquee = useCallback(() => {
    setMarqueePaused(false);
    if (marqueeTween.current) {
      gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
    }
  }, []);

  // ── Background cycle ──────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const videoEl  = videoRef.current;
      const slideAEl = bgSlideARef.current;
      const slideBEl = bgSlideBRef.current;
      if (!videoEl || !slideAEl || !slideBEl) return;

      if (isMobileRef.current) {
        gsap.set(videoEl,  { opacity: 1, className: "rh-bgvid active" });
        gsap.set(slideAEl, { opacity: 0, className: "rh-bgslide" });
        gsap.set(slideBEl, { opacity: 0, className: "rh-bgslide" });
        return;
      }

      gsap.set(videoEl,  { opacity: 1, className: "rh-bgvid active" });
      gsap.set(slideAEl, { opacity: 0, className: "rh-bgslide" });
      gsap.set(slideBEl, { opacity: 0, className: "rh-bgslide" });

      let nextSlideIdx = 0;
      let cycleTimer = null;

      const runCycle = () => {
        const isVideo = bgModeRef.current === "video";
        if (isVideo) {
          const slideData = BG_SLIDES[nextSlideIdx % BG_SLIDES.length];
          const slideEl   = (bgSlideIndex.current % 2 === 0) ? slideAEl : slideBEl;
          slideEl.src = slideData.src;
          slideEl.style.objectPosition = slideData.position;
          gsap.set(slideEl,  { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
          gsap.to(videoEl,   { opacity: 0, duration: 1.8, ease: "power3.inOut", onComplete: () => gsap.set(videoEl, { className: "rh-bgvid" }) });
          gsap.to(slideEl,   { opacity: 1, scale: 1, duration: 2.4, ease: "power3.out" });
          bgSlideIndex.current++;
          nextSlideIdx++;
          bgModeRef.current = "image";
          cycleTimer = gsap.delayedCall(10, runCycle);
        } else {
          const currentSlideEl = ((bgSlideIndex.current - 1) % 2 === 0) ? slideAEl : slideBEl;
          gsap.set(videoEl,        { opacity: 0, className: "rh-bgvid active" });
          gsap.to(videoEl,         { opacity: 1, duration: 1.8, ease: "power3.inOut" });
          gsap.to(currentSlideEl,  { opacity: 0, scale: 1.02, duration: 2.0, ease: "power3.inOut", onComplete: () => gsap.set(currentSlideEl, { className: "rh-bgslide" }) });
          bgModeRef.current = "video";
          cycleTimer = gsap.delayedCall(5, runCycle);
        }
      };

      cycleTimer = gsap.delayedCall(5, runCycle);
      return () => { if (cycleTimer) cycleTimer.kill(); };
    });

    return () => mm.revert();
  }, []);

  // ── Magnet effect ──────────────────────────────────────────────────────────
  const bindMagnet = useCallback((el) => {
    if (!el) return;
    if (isMobileRef.current) return;
    if (magnetMapRef.current.has(el)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width  / 2) * 0.04;
      const dy = (e.clientY - rect.top  - rect.height / 2) * 0.03;
      gsap.to(el, { x: dx, y: dy, duration: 0.55, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power2.out", overwrite: "auto" });
    };

    el.addEventListener("mousemove",  onEnter);
    el.addEventListener("mouseleave", onLeave);
    magnetMapRef.current.set(el, [onEnter, onLeave]);
  }, []);

  useEffect(() => {
    panelRefs.current.forEach((el) => bindMagnet(el));
    return () => {
      magnetMapRef.current.forEach(([onEnter, onLeave], el) => {
        el.removeEventListener("mousemove",  onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      magnetMapRef.current.clear();
    };
  }, [bindMagnet]);

  // ── GSAP master timeline ───────────────────────────────────────────────────
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const isMobile = isMobileRef.current;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(headlineWrapperRef.current, { opacity: 1, duration: 0.6 }, 0.1);
        tl.to(supTextRef.current,         { opacity: 1, y: 0, duration: 0.7 }, 0.15);
        tl.to(subtitleRef.current,        { opacity: 1, y: 0, duration: 0.85 }, 0.65);
        tl.to(ctaRowRef.current,          { opacity: 1, y: 0, duration: 0.8 }, 0.80);
        tl.to(trustRef.current,           { opacity: 1, y: 0, duration: 0.8 },  0.95);

        const ctaBtns = ctaRowRef.current?.querySelectorAll(".rh-cta-primary, .rh-cta-secondary");
        if (ctaBtns?.length) {
          tl.fromTo(ctaBtns,
            { opacity: 0, y: 12, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 },
            0.85
          );
        }

        const badges = trustRef.current?.querySelectorAll(".rh-trust-badge");
        if (badges?.length) {
          tl.fromTo(badges,
            { opacity: 0, y: 10, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06 },
            1.00
          );
        }

        // Headline character animation
        const headlineEl = headlineRef.current;
        if (headlineEl) {
          headlineEl.style.opacity = "1";
          const words = headlineEl.querySelectorAll(".rh-word");
          words.forEach((word, wi) => {
            const text = word.textContent || "";
            word.innerHTML = "";
            [...text].forEach((ch) => {
              const span = document.createElement("span");
              span.className = "rh-char";
              span.textContent = ch === " " ? "\u00A0" : ch;
              word.appendChild(span);
            });
            tl.fromTo(
              word.querySelectorAll(".rh-char"),
              { opacity: 0, y: 36, filter: "blur(3px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: { amount: 0.18 } },
              0.25 + wi * 0.10
            );
          });
        }

        // Marquee (GSAP on desktop only)
        if (marqueeTrackRef.current && !isMobile) {
          marqueeTween.current = gsap.to(marqueeTrackRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
        }

        const panels = panelRefs.current.filter(Boolean);

        // Panel ambient animations (desktop only)
        if (!isMobile) {
          panels.forEach((panel, i) => {
            gsap.to(panel, {
              y: i % 2 === 0 ? -10 : 10,
              duration: 4 + i * 0.6,
              repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3,
            });
            gsap.to(panel, {
              rotation: i % 2 === 0 ? 1.0 : -0.8,
              duration: 6 + i * 0.4,
              repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.5,
            });

            const baseClip = i === 0
              ? "ellipse(60% 90% at 42% 90%)"
              : i === panels.length - 1 ? "ellipse(60% 90% at 58% 90%)" : "ellipse(58% 92% at 50% 92%)";
            const morphedClip = i === 0
              ? "ellipse(63% 94% at 43% 91%)"
              : i === panels.length - 1 ? "ellipse(63% 94% at 57% 91%)" : "ellipse(60% 95% at 50% 91%)";

            gsap.fromTo(panel,
              { clipPath: baseClip },
              { clipPath: morphedClip, duration: 5 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2 }
            );

            const img = panel.querySelector("img");
            if (img) {
              gsap.to(img, {
                y: i % 2 === 0 ? "-3%" : "3%",
                duration: 8 + i * 0.5,
                repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4,
              });
            }
          });
        }

        // TV float (desktop only)
        if (tvContainerRef.current && !isMobile) {
          gsap.to(tvContainerRef.current, {
            y: -8, duration: 4.5,
            repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        }

        if (tvSectionRef.current) {
          gsap.fromTo(tvSectionRef.current, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, duration: 0.85,
            scrollTrigger: { trigger: tvSectionRef.current, start: "top 85%", toggleActions: "play none none none" },
          });
        }

        // Badge float (desktop only)
        if (badges?.length && !isMobile) {
          gsap.to(badges, {
            y: -3, stagger: 0.22,
            duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8,
          });
        }

        // Shimmer sweep (desktop only)
        const shimmerEl = shimmerRef.current;
        if (shimmerEl && !isMobile) {
          const runShimmer = () => {
            gsap.fromTo(shimmerEl, { left: "-60%" }, {
              left: "120%", duration: 2.2, ease: "power2.inOut",
              onComplete: () => {
                gsap.set(shimmerEl, { left: "-60%" });
                gsap.delayedCall(10, runShimmer);
              },
            });
          };
          gsap.delayedCall(2, runShimmer);
        }

      }, rootRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const els = [headlineWrapperRef, supTextRef, headlineRef, subtitleRef, ctaRowRef, trustRef];
      els.forEach(ref => {
        if (ref.current) { ref.current.style.opacity = "1"; ref.current.style.transform = "none"; }
      });
      if (bgSlideARef.current) { bgSlideARef.current.style.opacity = "0"; bgSlideARef.current.className = "rh-bgslide"; }
      if (bgSlideBRef.current) { bgSlideBRef.current.style.opacity = "0"; bgSlideBRef.current.className = "rh-bgslide"; }
      if (videoRef.current)    { videoRef.current.style.opacity = "1";    videoRef.current.className    = "rh-bgvid active"; }
      panelRefs.current.forEach(el => { if (el) el.style.opacity = "1"; });
      if (tvSectionRef.current) { tvSectionRef.current.style.opacity = "1"; tvSectionRef.current.style.transform = "none"; }
    });

    return () => mm.revert();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="rh-root" ref={rootRef}>

        <section className="rh-hero" ref={heroRef} id="home" aria-label="RASOAF Travels hero">

          {/* ── v11: Background Wrapper ──────────────────────────────── */}
          <div className="rh-bg-wrapper">
            <img ref={bgSlideARef} className="rh-bgslide" src={BG_SLIDES[0].src} alt="" aria-hidden="true" style={{ objectPosition: BG_SLIDES[0].position }} />
            <img ref={bgSlideBRef} className="rh-bgslide" src={BG_SLIDES[1].src} alt="" aria-hidden="true" style={{ objectPosition: BG_SLIDES[1].position }} />

            <video
              ref={videoRef}
              className="rh-bgvid active"
              src={BG_VIDEO}
              autoPlay loop muted playsInline preload="auto"
              aria-hidden="true"
            />
          </div>

          <div className="rh-glass-mask" aria-hidden="true" />
          <div className="rh-overlay"  aria-hidden="true" />
          <div className="rh-vignette" aria-hidden="true" />

          <div className="rh-content">
            <div className="rh-headline-wrapper" ref={headlineWrapperRef}>
              <span className="rh-sup-text" ref={supTextRef} aria-label="Your Gateway to The World">
                Your Gateway to The World
              </span>

              <h1 className="rh-headline" ref={headlineRef} aria-label="One Sacred Journey at a Time — RASOAF Travels">
                <span className="rh-word">One&nbsp;</span>
                <span className="rh-word">Sacred&nbsp;</span>
                <span className="rh-word">Journey</span><br />
                <span className="rh-word">at&nbsp;a&nbsp;</span>
                <span className="rh-word"><em>Time</em></span>
              </h1>
            </div>

            <p className="rh-subtitle" ref={subtitleRef}>
              Experience Hajj, Umrah, and international travel with trusted guidance, 
              personalized support, and seamless planning from departure to return.
            </p>

            <div className="rh-cta-row" ref={ctaRowRef}>
              <button
                type="button"
                className="rh-cta-primary"
                onClick={() => scrollTo("services")}
                aria-label="Plan Your Umrah"
              >
                <span>Plan Your Umrah</span>
                <ArrowIcon />
              </button>
              <button
                type="button"
                className="rh-cta-secondary"
                onClick={() => scrollTo("packages")}
                aria-label="Explore Packages"
              >
                <span>Explore Packages</span>
                <ArrowIcon />
              </button>
            </div>

            <div className="rh-trust-row" ref={trustRef} role="list" aria-label="Trust indicators">
              {TRUST_BADGES.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="rh-trust-badge" role="listitem">
                    <span className="badge-check">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`rh-marquee-wrap${marqueePaused ? " rh-marquee-paused" : ""}`}
            role="list"
            aria-label="Travel destinations gallery"
            onMouseEnter={pauseMarquee}
            onMouseLeave={resumeMarquee}
            onTouchStart={pauseMarquee}
            onTouchEnd={resumeMarquee}
            onTouchCancel={resumeMarquee}
          >
            <div className="rh-marquee-track" ref={marqueeTrackRef}>
              {MARQUEE_PANELS.map((panel, i) => (
                <div
                  key={i}
                  className="rh-panel"
                  ref={(el) => { if (i < PANELS.length) panelRefs.current[i] = el; }}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${panel.label} — ${panel.tag}. Press Enter to Register`}
                  onClick={() => scrollTo("register")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollTo("register"); }
                  }}
                >
                  <img src={panel.src} alt={panel.alt} loading="lazy" decoding="async" />
                  <div className="rh-panel-grad"    aria-hidden="true" />
                  <div className="rh-panel-shimmer" aria-hidden="true" />
                  <div className="rh-panel-corner"  aria-hidden="true" />
                  <span className="rh-panel-num" aria-hidden="true">
                    {(i % PANELS.length) + 1 < 10 ? `0${(i % PANELS.length) + 1}` : (i % PANELS.length) + 1}
                  </span>
                  <div className="rh-panel-info">
                    <span className="rh-panel-label">{panel.label}</span>
                    <span className="rh-panel-tag">{panel.tag}</span>
                  </div>
                  <button
                    type="button"
                    className="rh-panel-register"
                    aria-label={`Register for ${panel.label}`}
                    onClick={(e) => { e.stopPropagation(); scrollTo("register"); }}
                    onKeyDown={(e) => { e.stopPropagation(); }}
                    tabIndex={-1}
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
            <div className="rh-shimmer-sweep" ref={shimmerRef} aria-hidden="true" />
          </div>

          <div className="rh-tv-section" ref={tvSectionRef}>
            <div className="rh-tv-container" ref={tvContainerRef}>
              <div className="rh-tv-screen">
                {tvVideoError ? (
                  <div style={{
                    width: "100%", height: "100%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, #0a1a2f 0%, #0d1f3a 100%)",
                    color: "#C4972A", fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", textAlign: "center", padding: "20px",
                  }}>
                    <div>
                      <span style={{ fontSize: "32px" }}>✈️</span>
                      <p>Video loading...</p>
                      <p style={{ fontSize: "10px", opacity: 0.6, marginTop: "4px" }}>Premium content will appear shortly</p>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={tvVideoRef}
                    className="rh-tv-video"
                    autoPlay loop playsInline preload="auto"
                    muted={isTvMuted}
                    onPlay={() => setIsTvPlaying(true)}
                    onPause={() => setIsTvPlaying(false)}
                    onError={handleTvVideoError}
                    onCanPlay={handleTvVideoCanPlay}
                  >
                    <source src={TV_VIDEO} type="video/mp4" />
                  </video>
                )}

                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 100%)",
                  pointerEvents: "none",
                }} />

                {!tvVideoError && (
                  <div className="rh-tv-controls">
                    <button type="button" onClick={toggleTvPlay} className="rh-tv-control-btn" aria-label={isTvPlaying ? "Pause" : "Play"}>
                      {isTvPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button type="button" onClick={toggleTvMute} className="rh-tv-control-btn" aria-label={isTvMuted ? "Unmute" : "Mute"}>
                      {isTvMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                )}

                <div className="rh-tv-badge">✈️ WANDERLUST</div>
              </div>
              <div className="rh-tv-stand" />
              <div className="rh-tv-leg-left" />
              <div className="rh-tv-leg-right" />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}