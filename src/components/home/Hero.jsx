// components/RasoafHero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED
// v6 — Living Marquee · Wave Motion · Cinematic Drift · Gold Shimmer
// Sacred Glass Reflection · Alternating BG Video/Image Slideshow
// Premium typography · Organic motion · Scroll-responsive · Luxury aesthetic
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
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876182/mecapeople2_btukrr.png",
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

// Duplicate for infinite marquee
const MARQUEE_PANELS = [...PANELS, ...PANELS, ...PANELS, ...PANELS];

const BG_VIDEO =
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781351650/3473-170690984_medium_h9g9gt.mp4";

const TV_VIDEO =
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781354114/3473-170690984_medium_vlr3ri.mp4";

// ── Background slideshow images with image-specific object-position ────────────
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
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg",
    position: "50% 60%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877301/mohamed_hassan-hajj-8794441_1920_gsrsap.png",
    position: "50% 45%",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876182/mecapeople2_btukrr.png",
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
  html { scroll-behavior: auto; }

  .rh-root {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #fafaf8;
    color: #1a1a1a;
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ══════════════════════════════════════════════
     HERO SECTION
  ══════════════════════════════════════════════ */
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
    padding-top: clamp(40px, 6vh, 60px);
    padding-bottom: 0;
  }

  .rh-bgvid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    opacity: 0;
    will-change: transform, opacity;
  }
  .rh-bgvid.active { opacity: 1; }

  /* ── Slideshow background images ── */
  .rh-bgslide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    object-fit: cover;
    z-index: 0;
    will-change: transform, opacity;
    opacity: 0;
  }
  .rh-bgslide.active { opacity: 1; }

  /* Sacred glass reflection mask */
  .rh-glass-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
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
      radial-gradient(ellipse 120% 100% at 0% 50%, rgba(196,151,42,0.05) 0%, transparent 55%),
      radial-gradient(ellipse 120% 100% at 100% 50%, rgba(196,151,42,0.05) 0%, transparent 55%);
  }

  .rh-content {
    position: relative;
    z-index: 10;
    width: 100%;
    text-align: center;
    padding: 0 clamp(16px, 4vw, 48px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: clamp(80px, 12vh, 140px);
  }

  /* ── Headline wrapper for superscript positioning ── */
  .rh-headline-wrapper {
    position: relative;
    display: inline-block;
    opacity: 0;
  }

  /* ── Sup text positioned above headline ── */
  .rh-sup-text {
    font-family: 'Inter', sans-serif;
    font-size: clamp(8px, 0.8vw, 10px);
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(196,151,42,0.85);
    display: block;
    text-align: center;
    margin-bottom: clamp(4px, 0.6vw, 8px);
    opacity: 0;
    transform: translateY(8px);
  }

  .rh-headline {
    font-family: 'Playfair Display', Georgia, 'Plus Jakarta Sans', serif;
    font-weight: 700;
    font-size: clamp(3.2rem, 8vw, 7.5rem);
    line-height: 1.04;
    letter-spacing: -0.025em;
    color: #ffffff;
    margin: 0 auto clamp(8px, 1.5vw, 16px);
    max-width: 860px;
    opacity: 0;
  }
  .rh-headline .rh-word { display: inline-block; overflow: hidden; vertical-align: bottom; }
  .rh-headline .rh-char { display: inline-block; will-change: transform, opacity; }
  .rh-headline em { font-style: italic; font-weight: 500; color: #C4972A; }

  .rh-subtitle {
    font-family: 'Inter', 'DM Sans', sans-serif;
    font-size: clamp(0.95rem, 1.5vw, 1.15rem);
    font-weight: 350;
    line-height: 1.65;
    color: rgba(255,255,255,0.68);
    max-width: 440px;
    margin: 0 auto clamp(24px, 4vw, 36px);
    opacity: 0;
    transform: translateY(14px);
  }

  .rh-trust-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(12px, 2vw, 24px);
    flex-wrap: wrap;
    margin-bottom: clamp(24px, 3.5vw, 36px);
    opacity: 0;
    transform: translateY(14px);
  }
  .rh-trust-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 100px;
    padding: 6px 16px;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(9px, 1vw, 11px);
    font-weight: 450;
    color: rgba(255,255,255,0.78);
    letter-spacing: 0.03em;
    transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
    will-change: transform;
  }
  .rh-trust-badge:hover {
    border-color: rgba(196,151,42,0.45);
    background: rgba(196,151,42,0.08);
    color: #C4972A;
  }
  .rh-trust-badge svg { color: #C4972A; flex-shrink: 0; }

  /* ════════════════════════════════════════════════
     MARQUEE GALLERY — Infinite scroll + wave motion
  ════════════════════════════════════════════════ */
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
    padding: clamp(8px, 1.5vw, 16px) 0;
  }

  .rh-marquee-track {
    display: flex;
    gap: clamp(10px, 1.6vw, 20px);
    width: max-content;
    will-change: transform;
    padding: 0 clamp(6px, 1vw, 12px);
  }

  .rh-panel {
    position: relative;
    flex-shrink: 0;
    width: clamp(200px, 22vw, 320px);
    height: clamp(260px, 36vw, 420px);
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
    width: 100%;
    height: 110%;
    object-fit: cover;
    object-position: center 65%;
    display: block;
    will-change: transform;
    transform: scale(1.05);
    transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .rh-panel:hover img {
    transform: scale(1.18);
  }

  .rh-panel-grad {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(0deg, rgba(0,0,0,0.15) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.78) 100%);
    z-index: 1;
    transition: background 0.5s ease;
  }
  .rh-panel:hover .rh-panel-grad {
    background: linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.85) 100%);
  }

  /* Gold shimmer sweep overlay */
  .rh-shimmer-sweep {
    position: absolute;
    top: 0;
    left: -150%;
    width: 60%;
    height: 100%;
    z-index: 5;
    pointer-events: none;
    background: linear-gradient(105deg,
      transparent 0%,
      transparent 35%,
      rgba(196,151,42,0.12) 45%,
      rgba(196,151,42,0.22) 50%,
      rgba(196,151,42,0.12) 55%,
      transparent 65%,
      transparent 100%
    );
  }

  .rh-panel-shimmer {
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.6), transparent);
    z-index: 3;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .rh-panel:hover .rh-panel-shimmer { opacity: 1; }

  /* Info centered vertically & horizontally — always visible */
  .rh-panel-info {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .rh-panel-label {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(15px, 1.8vw, 20px);
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
    font-size: clamp(8px, 0.8vw, 10px);
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.82);
    text-align: center;
    text-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  /* Panel index number */
  .rh-panel-num {
    position: absolute;
    bottom: 14px;
    right: 16px;
    z-index: 3;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 500;
    color: rgba(255,255,255,0.50);
    letter-spacing: 0.08em;
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  /* Gold corner accent */
  .rh-panel-corner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 28px 0 0 28px;
    border-color: transparent transparent transparent #C4972A;
    z-index: 4;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .rh-panel:hover .rh-panel-corner { opacity: 1; }

  /* ═══════════════════════════════════
     TV SECTION WITH STAND
  ═══════════════════════════════════ */
  .rh-tv-section {
    position: relative;
    z-index: 10;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(16px, 3vw, 32px) clamp(16px, 4vw, 48px);
    margin-top: clamp(24px, 4vw, 48px);
  }

  .rh-tv-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    z-index: 200;
    will-change: transform;
  }

  .rh-tv-screen {
    position: relative;
    width: 100%;
    border-radius: 18px;
    overflow: hidden;
    border: 2px solid rgba(196,151,42,0.55);
    box-shadow: 0 0 30px rgba(196,151,42,0.35), 0 20px 50px -12px rgba(0,0,0,0.5);
    background: #000;
    z-index: 201;
    aspect-ratio: 16/9;
  }

  .rh-tv-video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    background: #000;
  }

  .rh-tv-stand {
    width: 70%;
    height: 8px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 4px;
    margin-top: 15px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    position: relative;
    z-index: 199;
  }

  .rh-tv-stand::before {
    content: '';
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 35px;
    background: linear-gradient(180deg, #2a2a2a 0%, #0a0a0a 100%);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }

  .rh-tv-stand::after {
    content: '';
    position: absolute;
    bottom: -45px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 10px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  .rh-tv-leg-left, .rh-tv-leg-right {
    position: absolute;
    bottom: -30px;
    width: 12px;
    height: 30px;
    background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }

  .rh-tv-leg-left { left: 25%; }
  .rh-tv-leg-right { right: 25%; }

  .rh-tv-controls {
    position: absolute;
    bottom: clamp(10px, 1.5vw, 16px);
    left: clamp(10px, 1.5vw, 16px);
    display: flex;
    gap: 10px;
    z-index: 210;
  }

  .rh-tv-control-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1.5px solid rgba(196,151,42,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #C4972A;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    padding: 0;
  }

  .rh-tv-control-btn:hover {
    transform: scale(1.08);
    background: rgba(196,151,42,0.20);
    border-color: rgba(196,151,42,0.7);
  }

  .rh-tv-badge {
    position: absolute;
    top: clamp(10px, 1.5vw, 16px);
    right: clamp(10px, 1.5vw, 16px);
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid rgba(196,151,42,0.45);
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    color: #C4972A;
    letter-spacing: 0.08em;
    font-weight: 550;
    z-index: 210;
  }

  /* ════════════════════════════════════════════════
     BOTTOM SECTION — Water Wave Grid
  ════════════════════════════════════════════════ */
  .rh-bottom-section {
    position: relative;
    z-index: 10;
    width: 100%;
    background: #fafaf8;
    padding: clamp(60px, 10vw, 100px) clamp(24px, 5vw, 48px);
    opacity: 0;
    transform: translateY(28px);
    overflow: hidden;
  }

  .rh-bottom-section::before {
    content: '';
    position: absolute;
    top: -60px;
    left: 0;
    right: 0;
    height: 120px;
    background: 
      radial-gradient(ellipse 85% 100% at 15% 100%, rgba(196,151,42,0.04) 0%, transparent 55%),
      radial-gradient(ellipse 75% 100% at 50% 100%, rgba(196,151,42,0.03) 0%, transparent 55%),
      radial-gradient(ellipse 85% 100% at 85% 100%, rgba(196,151,42,0.04) 0%, transparent 55%);
    z-index: 0;
    pointer-events: none;
  }

  .rh-bottom-section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: 
      radial-gradient(ellipse 70% 60% at 20% 50%, rgba(196,151,42,0.025) 0%, transparent 55%),
      radial-gradient(ellipse 60% 50% at 55% 40%, rgba(196,151,42,0.02) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 80% 50%, rgba(196,151,42,0.025) 0%, transparent 55%);
    z-index: 0;
    pointer-events: none;
  }

  .rh-bottom-inner {
    position: relative;
    z-index: 1;
    max-width: 960px;
    margin: 0 auto;
  }

  .rh-wave-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: clamp(10px, 1.5vw, 18px);
    align-items: start;
  }

  .rh-wave-paragraph {
    grid-column: 1 / -1;
    grid-row: 1;
    font-family: 'Inter', 'DM Sans', sans-serif;
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    font-weight: 380;
    line-height: 1.75;
    color: #6b6b64;
    text-align: center;
    padding: 0 clamp(16px, 4vw, 40px) clamp(12px, 2vw, 20px);
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }

  .rh-wave-ctas {
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(28px, 5vw, 48px);
    padding: clamp(10px, 2vw, 16px) 0;
  }

  .rh-text-cta {
    font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
    font-size: clamp(14px, 1.3vw, 16px);
    font-weight: 550;
    color: #1a1a1a;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0 0 4px;
    letter-spacing: -0.01em;
    position: relative;
    transition: color 0.25s ease;
  }
  .rh-text-cta::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: #c4b998;
    opacity: 0.3;
    border-radius: 2px;
    transition: opacity 0.25s ease, background 0.25s ease, transform 0.3s ease;
    transform-origin: left;
  }
  .rh-text-cta:hover { color: #b8942e; }
  .rh-text-cta:hover::after { opacity: 1; background: #b8942e; transform: scaleX(1.05); }
  .rh-cta-sep { width: 1px; height: 14px; background: #d4d4ce; flex-shrink: 0; }

  .rh-wave-stat-1 { grid-column: 1; grid-row: 3; transform: translateY(-4px); }
  .rh-wave-stat-2 { grid-column: 2; grid-row: 3; transform: translateY(8px); }
  .rh-wave-stat-3 { grid-column: 3; grid-row: 3; transform: translateY(16px); }
  .rh-wave-stat-4 { grid-column: 4; grid-row: 3; transform: translateY(4px); }

  .rh-wave-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: clamp(16px, 3vw, 28px) clamp(10px, 2vw, 16px);
    background: rgba(255,255,255,0.7);
    border-radius: clamp(10px, 1.4vw, 16px);
    border: 1px solid rgba(0,0,0,0.04);
    box-shadow: 0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.4s ease, border-color 0.4s ease;
    position: relative;
    overflow: hidden;
    will-change: transform;
  }

  .rh-wave-stat-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.3), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .rh-wave-stat-item:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 2px 6px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
    border-color: rgba(196,151,42,0.15);
  }
  .rh-wave-stat-item:hover::before { opacity: 1; }

  .rh-stat-num {
    font-family: 'Playfair Display', 'Plus Jakarta Sans', serif;
    font-size: clamp(1.6rem, 2.6vw, 2.4rem);
    font-weight: 700;
    color: #1a1a1a;
    letter-spacing: -0.03em;
    line-height: 1;
    transition: color 0.3s ease;
  }
  .rh-wave-stat-item:hover .rh-stat-num { color: #b8942e; }
  .rh-stat-num span { color: #C4972A; font-size: 0.7em; font-weight: 600; transition: color 0.3s ease; }
  .rh-wave-stat-item:hover .rh-stat-num span { color: #b8942e; }
  .rh-stat-label {
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(8px, 0.8vw, 10px);
    font-weight: 450;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0,0,0,0.36);
    white-space: nowrap;
    transition: color 0.3s ease;
  }
  .rh-wave-stat-item:hover .rh-stat-label { color: rgba(0,0,0,0.48); }

  .rh-social-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(6px, 1vw, 10px);
    flex-wrap: wrap;
    margin-top: clamp(32px, 5vw, 48px);
    padding-top: clamp(24px, 4vw, 36px);
    border-top: 1px solid rgba(0,0,0,0.05);
    position: relative;
  }

  .rh-social-row::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.15) 20%, rgba(196,151,42,0.08) 50%, rgba(196,151,42,0.15) 80%, transparent);
  }

  .rh-social-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Inter', 'Space Grotesk', sans-serif;
    font-size: clamp(10px, 0.95vw, 11px);
    font-weight: 450;
    color: rgba(0,0,0,0.50);
    text-decoration: none;
    background: rgba(255,255,255,0.6);
    border: 1px solid rgba(0,0,0,0.07);
    border-radius: 100px;
    padding: 5px 12px;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .rh-social-chip svg { color: currentColor; flex-shrink: 0; transition: transform 0.3s ease; }
  .rh-social-chip::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(196,151,42,0.06);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 100px;
  }
  .rh-social-chip:hover {
    border-color: rgba(196,151,42,0.35);
    color: #b8942e;
    background: rgba(196,151,42,0.03);
    transform: translateY(-2px);
    box-shadow: 0 3px 12px rgba(196,151,42,0.08);
  }
  .rh-social-chip:hover::after { opacity: 1; }
  .rh-social-chip:hover svg { transform: scale(1.1); }

  /* ═══════════════════════════════════
     KEYFRAMES
  ═══════════════════════════════════ */
  @keyframes rhHeartPump {
    0%, 100% { transform: scale(1); }
    15% { transform: scale(1.06); }
    30% { transform: scale(1); }
    45% { transform: scale(1.05); }
    60% { transform: scale(1); }
  }

  /* ── FOCUS ── */
  .rh-text-cta:focus-visible,
  .rh-social-chip:focus-visible,
  .rh-tv-control-btn:focus-visible,
  .rh-panel:focus-visible,
  .rh-wave-stat-item:focus-within {
    outline: 2px solid #C4972A;
    outline-offset: 3px;
    border-radius: 4px;
  }

  /* ═══════════════════════════════════
     RESPONSIVE
  ═══════════════════════════════════ */
  @media (max-width: 860px) {
    .rh-content {
      margin-top: clamp(60px, 10vh, 100px);
    }
    .rh-panel {
      width: clamp(170px, 28vw, 240px);
      height: clamp(220px, 44vw, 340px);
    }
    .rh-tv-container { max-width: 100%; }
    .rh-tv-screen { border-radius: 14px; border-width: 1.5px; }
    .rh-tv-stand { width: 60%; height: 6px; margin-top: 12px; }
    .rh-tv-stand::before { width: 40px; height: 28px; bottom: -28px; }
    .rh-tv-stand::after { width: 60px; height: 8px; bottom: -36px; }
    .rh-tv-leg-left, .rh-tv-leg-right { width: 10px; height: 25px; bottom: -25px; }
    .rh-tv-leg-left { left: 28%; }
    .rh-tv-leg-right { right: 28%; }
    .rh-tv-control-btn { width: 34px; height: 34px; }

    .rh-wave-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto auto;
    }
    .rh-wave-paragraph { grid-column: 1 / -1; grid-row: 1; }
    .rh-wave-ctas { grid-column: 1 / -1; grid-row: 2; }
    .rh-wave-stat-1 { grid-column: 1; grid-row: 3; transform: translateY(-2px); }
    .rh-wave-stat-2 { grid-column: 2; grid-row: 3; transform: translateY(6px); }
    .rh-wave-stat-3 { grid-column: 1; grid-row: 4; transform: translateY(2px); }
    .rh-wave-stat-4 { grid-column: 2; grid-row: 4; transform: translateY(10px); }
  }

  @media (max-width: 520px) {
    .rh-content {
      margin-top: clamp(50px, 8vh, 70px);
    }
    .rh-headline { font-size: clamp(2.8rem, 11vw, 4rem); }
    .rh-trust-row { gap: 8px; }
    .rh-panel {
      width: clamp(150px, 42vw, 200px);
      height: clamp(200px, 55vw, 280px);
    }
    .rh-tv-stand { width: 50%; }
    .rh-tv-leg-left { left: 30%; }
    .rh-tv-leg-right { right: 30%; }
    .rh-tv-stand::before { width: 35px; height: 25px; bottom: -25px; }
    .rh-tv-stand::after { width: 50px; height: 7px; bottom: -32px; }
    .rh-tv-leg-left, .rh-tv-leg-right { width: 8px; height: 22px; bottom: -22px; }
    .rh-tv-control-btn { width: 32px; height: 32px; }

    .rh-wave-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto auto auto;
      gap: 8px;
    }
    .rh-wave-paragraph { grid-column: 1 / -1; grid-row: 1; }
    .rh-wave-ctas { grid-column: 1 / -1; grid-row: 2; }
    .rh-wave-stat-1 { grid-column: 1; grid-row: 3; transform: none; }
    .rh-wave-stat-2 { grid-column: 2; grid-row: 3; transform: none; }
    .rh-wave-stat-3 { grid-column: 1; grid-row: 4; transform: none; }
    .rh-wave-stat-4 { grid-column: 2; grid-row: 4; transform: none; }
    .rh-wave-stat-item:hover { transform: translateY(-2px) !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .rh-headline, .rh-sup-text, .rh-subtitle,
    .rh-trust-row, .rh-bottom-section {
      opacity: 1 !important; transform: none !important;
      animation: none !important;
    }
    .rh-marquee-track { animation: none !important; }
    .rh-panel, .rh-panel img, .rh-panel-info, .rh-panel-shimmer,
    .rh-panel-num, .rh-panel-corner, .rh-tv-control-btn,
    .rh-wave-stat-item, .rh-social-chip, .rh-shimmer-sweep,
    .rh-bgslide, .rh-bgvid {
      transition: none !important;
      animation: none !important;
    }
    .rh-panel-label { animation: none !important; }
    .rh-panel:hover img { transform: none !important; }
    .rh-wave-stat-1, .rh-wave-stat-2, .rh-wave-stat-3, .rh-wave-stat-4 {
      transform: none !important;
    }
    .rh-wave-stat-item:hover { transform: none !important; }
    .rh-social-chip:hover { transform: none !important; }
  }
`;

// ── SVG Social Icons ──────────────────────────────────────────────────────────
const SvgGlobe = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const SvgMail = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const SvgFB = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const SvgIG = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const SvgX = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const SvgTikTok = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);
const SvgStar = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const SvgShield = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const SvgPlane = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.8 1.1l1.6 5.7c.1.4.4.6.8.6l3.6-.5 1.5 3.5c.2.4.6.6 1.1.5l4.7-1.1c.5-.1.8-.6.7-1.1z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { label: "Website",   href: "https://www.rasoaf.com",                                 Icon: SvgGlobe  },
  { label: "Email",     href: "mailto:rasoaf24@gmail.com",                              Icon: SvgMail   },
  { label: "Facebook",  href: "https://www.facebook.com/profile.php?id=61590695552485", Icon: SvgFB     },
  { label: "Instagram", href: "https://www.instagram.com/rasoaftravelsandtours/",       Icon: SvgIG     },
  { label: "X",         href: "https://x.com/Rasoaftravels",                            Icon: SvgX      },
  { label: "TikTok",    href: "https://www.tiktok.com/@rasoaftravelsandtours",           Icon: SvgTikTok },
];

const TRUST_BADGES = [
  { icon: SvgStar,   text: "10K+ Happy Travellers" },
  { icon: SvgShield, text: "Secure & Trusted" },
  { icon: SvgPlane,  text: "50+ Destinations" },
];

const STATS = [
  { num: "10K", unit: "+", label: "Happy Travellers" },
  { num: "98",  unit: "%", label: "Satisfaction Rate" },
  { num: "15",  unit: "+", label: "Years Experience"  },
  { num: "50",  unit: "+", label: "Global Destinations" },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function RasoafHero() {
  const rootRef      = useRef(null);
  const heroRef      = useRef(null);
  const videoRef     = useRef(null);
  const tvVideoRef   = useRef(null);
  const supTextRef   = useRef(null);
  const headlineWrapperRef = useRef(null);
  const headlineRef  = useRef(null);
  const subtitleRef  = useRef(null);
  const trustRef     = useRef(null);
  const marqueeTrackRef = useRef(null);
  const tvSectionRef = useRef(null);
  const bottomRef    = useRef(null);
  const lenisRef     = useRef(null);
  const panelRefs    = useRef([]);
  const shimmerRef   = useRef(null);
  const waveStatRefs = useRef([]);
  const marqueeTween = useRef(null);
  const scrollTimer  = useRef(null);
  const bgSlideARef = useRef(null);
  const bgSlideBRef = useRef(null);
  const bgSlideIndex = useRef(0);
  const bgModeRef = useRef("video");
  const bgCycleTimer = useRef(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [tvVideoReady, setTvVideoReady] = useState(false);
  const [isTvPlaying, setIsTvPlaying] = useState(true);
  const [isTvMuted, setIsTvMuted] = useState(false);
  const [tvVideoError, setTvVideoError] = useState(false);

  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    const raf = (time) => {
      lenisRef.current.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenisRef.current.on("scroll", ScrollTrigger.update);

    return () => lenisRef.current.destroy();
  }, []);

  // ── Video load ───────────────────────────────────────────────────────────
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onCanPlay = () => setVideoLoaded(true);
    vid.addEventListener("canplaythrough", onCanPlay, { once: true });
    if (vid.readyState >= 3) setVideoLoaded(true);
    return () => vid.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  // ── TV Video handlers ────────────────────────────────────────────────────
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

  const handleTvVideoError = useCallback(() => setTvVideoError(true), []);
  const handleTvVideoCanPlay = useCallback(() => setTvVideoReady(true), []);

  // ── Scroll-aware marquee speed control ───────────────────────────────────
  const slowMarquee = useCallback(() => {
    if (!marqueeTween.current) return;
    gsap.to(marqueeTween.current, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      if (marqueeTween.current) {
        gsap.to(marqueeTween.current, { timeScale: 1, duration: 1.2, ease: "power2.inOut" });
      }
    }, 800);
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    lenisRef.current.on("scroll", slowMarquee);
    return () => { if (lenisRef.current) lenisRef.current.off("scroll", slowMarquee); };
  }, [slowMarquee]);

  // ── Background video/image alternating cycle ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const videoEl = videoRef.current;
      const slideAEl = bgSlideARef.current;
      const slideBEl = bgSlideBRef.current;
      
      if (!videoEl || !slideAEl || !slideBEl) return;
      
      gsap.set(videoEl, { opacity: 1, className: "rh-bgvid active" });
      gsap.set(slideAEl, { opacity: 0, className: "rh-bgslide" });
      gsap.set(slideBEl, { opacity: 0, className: "rh-bgslide" });
      
      let nextSlideIdx = 0;
      
      const runCycle = () => {
        const isVideo = bgModeRef.current === "video";
        
        if (isVideo) {
          const slideData = BG_SLIDES[nextSlideIdx % BG_SLIDES.length];
          const slideRef = (bgSlideIndex.current % 2 === 0) ? slideAEl : slideBEl;
          slideRef.src = slideData.src;
          slideRef.style.objectPosition = slideData.position;
          
          gsap.set(slideRef, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
          
          gsap.to(videoEl, {
            opacity: 0,
            duration: 1.8,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(videoEl, { className: "rh-bgvid" });
            }
          });
          
          gsap.to(slideRef, {
            opacity: 1,
            scale: 1,
            duration: 2.4,
            ease: "power3.out",
          });
          
          bgSlideIndex.current++;
          nextSlideIdx++;
          bgModeRef.current = "image";
          bgCycleTimer.current = gsap.delayedCall(10, runCycle);
          
        } else {
          gsap.set(videoEl, { opacity: 0, className: "rh-bgvid active" });
          
          const currentSlideRef = ((bgSlideIndex.current - 1) % 2 === 0) ? slideAEl : slideBEl;
          
          gsap.to(videoEl, {
            opacity: 1,
            duration: 1.8,
            ease: "power3.inOut",
          });
          
          gsap.to(currentSlideRef, {
            opacity: 0,
            scale: 1.02,
            duration: 2.0,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(currentSlideRef, { className: "rh-bgslide" });
            }
          });
          
          bgModeRef.current = "video";
          bgCycleTimer.current = gsap.delayedCall(5, runCycle);
        }
      };
      
      bgCycleTimer.current = gsap.delayedCall(5, runCycle);
      
      return () => {
        if (bgCycleTimer.current) bgCycleTimer.current.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // ── GSAP master timeline ─────────────────────────────────────────────────
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(headlineWrapperRef.current, { opacity: 1, duration: 0.6 }, 0.1);
        tl.to(supTextRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.15);
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.65);
        tl.to(trustRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.80);

        const badges = trustRef.current?.querySelectorAll(".rh-trust-badge");
        if (badges?.length) {
          tl.fromTo(badges,
            { opacity: 0, y: 12, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" },
            0.90
          );
        }

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
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: { amount: 0.18 }, ease: "power3.out" },
              0.25 + wi * 0.10
            );
          });
        }

        if (marqueeTrackRef.current) {
          const trackWidth = marqueeTrackRef.current.scrollWidth;
          const viewWidth = marqueeTrackRef.current.parentElement?.offsetWidth || window.innerWidth;
          const travelPercent = ((trackWidth - viewWidth) / trackWidth) * 100 * 0.5;

          marqueeTween.current = gsap.to(marqueeTrackRef.current, {
            xPercent: -travelPercent,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
        }

        const panels = panelRefs.current.filter(Boolean);
        panels.forEach((panel, i) => {
          gsap.to(panel, {
            y: i % 2 === 0 ? -10 : 10,
            duration: 4 + i * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });

          gsap.to(panel, {
            rotation: i % 2 === 0 ? 1.0 : -0.8,
            duration: 6 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });

          const baseClip = i === 0 ? "ellipse(60% 90% at 42% 90%)"
            : i === panels.length - 1 ? "ellipse(60% 90% at 58% 90%)"
            : "ellipse(58% 92% at 50% 92%)";
          const morphedClip = i === 0 ? "ellipse(63% 94% at 43% 91%)"
            : i === panels.length - 1 ? "ellipse(63% 94% at 57% 91%)"
            : "ellipse(60% 95% at 50% 91%)";

          gsap.fromTo(panel,
            { clipPath: baseClip },
            { clipPath: morphedClip, duration: 5 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2 }
          );

          const img = panel.querySelector("img");
          if (img) {
            gsap.to(img, {
              y: i % 2 === 0 ? "-3%" : "3%",
              duration: 8 + i * 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.4,
            });
          }
        });

        const tvContainer = document.querySelector(".rh-tv-container");
        if (tvContainer) {
          gsap.to(tvContainer, {
            y: -8,
            duration: 4.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        if (tvSectionRef.current) {
          gsap.fromTo(tvSectionRef.current, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: tvSectionRef.current, start: "top 85%", toggleActions: "play none none none" },
          });
        }

        if (badges?.length) {
          gsap.to(badges, {
            y: -3,
            stagger: 0.22,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.8,
          });
        }

        const shimmerEl = shimmerRef.current;
        if (shimmerEl) {
          const runShimmer = () => {
            gsap.fromTo(shimmerEl, { left: "-60%" }, {
              left: "120%",
              duration: 2.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(shimmerEl, { left: "-60%" });
                gsap.delayedCall(10, runShimmer);
              },
            });
          };
          gsap.delayedCall(2, runShimmer);
        }

        if (bottomRef.current) {
          gsap.to(bottomRef.current, {
            opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: bottomRef.current, start: "top 88%", toggleActions: "play none none none" },
          });
        }

        const waveStats = waveStatRefs.current.filter(Boolean);
        if (waveStats.length) {
          waveStats.forEach((card, i) => {
            gsap.fromTo(card, { opacity: 0, y: 40 }, {
              opacity: 1,
              y: [-4, 8, 16, 4][i] || 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.1 * i,
              scrollTrigger: { trigger: bottomRef.current, start: "top 80%", toggleActions: "play none none none" },
            });

            gsap.to(card, {
              y: ([-4, 8, 16, 4][i] || 0) - 4,
              duration: 3.5 + i * 0.4,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 1.2 + i * 0.3,
            });
          });
        }

        const statNums = bottomRef.current?.querySelectorAll(".rh-stat-num");
        if (statNums?.length) {
          statNums.forEach((el) => {
            const numVal = parseFloat(el.dataset.num);
            if (isNaN(numVal)) return;
            const proxy = { val: 0 };
            ScrollTrigger.create({
              trigger: el,
              start: "top 88%",
              once: true,
              onEnter: () => {
                gsap.to(proxy, {
                  val: numVal, duration: 1.8, ease: "power2.out",
                  onUpdate() { if (el.childNodes[0]) el.childNodes[0].textContent = Math.round(proxy.val); },
                });
              },
            });
          });
        }
      }, rootRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const els = [headlineWrapperRef, supTextRef, headlineRef, subtitleRef, trustRef, bottomRef];
      els.forEach(ref => { if (ref.current) { ref.current.style.opacity = "1"; ref.current.style.transform = "none"; } });
      if (bgSlideARef.current) { bgSlideARef.current.style.opacity = "0"; bgSlideARef.current.className = "rh-bgslide"; }
      if (bgSlideBRef.current) { bgSlideBRef.current.style.opacity = "0"; bgSlideBRef.current.className = "rh-bgslide"; }
      if (videoRef.current) { videoRef.current.style.opacity = "1"; videoRef.current.className = "rh-bgvid active"; }
      panelRefs.current.forEach(el => { if (el) el.style.opacity = "1"; });
      waveStatRefs.current.forEach(el => { if (el) el.style.opacity = "1"; });
      if (tvSectionRef.current) { tvSectionRef.current.style.opacity = "1"; tvSectionRef.current.style.transform = "none"; }
      gsap.globalTimeline.clear();
      if (bgCycleTimer.current) bgCycleTimer.current.kill();
    });

    return () => mm.revert();
  }, []);

  const bindMagnet = useCallback((el) => {
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.04;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.03;
      gsap.to(el, { x: dx, y: dy, duration: 0.55, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power2.out", overwrite: "auto" });
    };
    el.addEventListener("mousemove", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const cleanups = panelRefs.current.map((el) => bindMagnet(el));
    return () => cleanups.forEach((fn) => fn?.());
  }, [bindMagnet]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="rh-root" ref={rootRef}>

        <section className="rh-hero" ref={heroRef} id="home" aria-label="RASOAF Travels hero">

          <img
            ref={bgSlideARef}
            className="rh-bgslide"
            src={BG_SLIDES[0].src}
            alt=""
            aria-hidden="true"
            style={{ objectPosition: BG_SLIDES[0].position }}
          />
          <img
            ref={bgSlideBRef}
            className="rh-bgslide"
            src={BG_SLIDES[1].src}
            alt=""
            aria-hidden="true"
            style={{ objectPosition: BG_SLIDES[1].position }}
          />
          <div className="rh-glass-mask" aria-hidden="true" />

          <video
            ref={videoRef}
            className="rh-bgvid active"
            src={BG_VIDEO}
            autoPlay loop muted playsInline preload="auto"
            aria-hidden="true"
          />

          <div className="rh-overlay" aria-hidden="true" />
          <div className="rh-vignette" aria-hidden="true" />

          <div className="rh-content">

            <div className="rh-headline-wrapper" ref={headlineWrapperRef}>
              <span className="rh-sup-text" ref={supTextRef} aria-label="Your Gateway to The World">
                Your Gateway to The World
              </span>
              <h1 className="rh-headline" ref={headlineRef} aria-label="One Story at a Time — RASOAF Travels">
                <span className="rh-word">One&nbsp;</span>
                <span className="rh-word">Story</span><br />
                <span className="rh-word">at&nbsp;a&nbsp;</span>
                <span className="rh-word"><em>Time</em></span>
              </h1>
            </div>

            <p className="rh-subtitle" ref={subtitleRef}>
              Your journey to the world has never been crafted like this before.
            </p>

            <div className="rh-trust-row" ref={trustRef} role="list" aria-label="Trust indicators">
              {TRUST_BADGES.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="rh-trust-badge" role="listitem">
                    <Icon aria-hidden="true" /><span>{b.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rh-marquee-wrap">
            <div className="rh-marquee-track" ref={marqueeTrackRef}>
              {MARQUEE_PANELS.map((panel, i) => (
                <div
                  key={i}
                  className="rh-panel"
                  ref={(el) => {
                    if (i < PANELS.length) panelRefs.current[i] = el;
                  }}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${panel.label} — ${panel.tag}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollTo("services");
                    }
                  }}
                >
                  <img src={panel.src} alt={panel.alt} loading="lazy" decoding="async" />
                  <div className="rh-panel-grad" aria-hidden="true" />
                  <div className="rh-panel-shimmer" aria-hidden="true" />
                  <div className="rh-panel-corner" aria-hidden="true" />
                  <span className="rh-panel-num" aria-hidden="true">
                    {(i % PANELS.length) + 1 < 10 ? `0${(i % PANELS.length) + 1}` : (i % PANELS.length) + 1}
                  </span>
                  <div className="rh-panel-info">
                    <span className="rh-panel-label">{panel.label}</span>
                    <span className="rh-panel-tag">{panel.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rh-shimmer-sweep" ref={shimmerRef} aria-hidden="true" />
          </div>

          <div className="rh-tv-section" ref={tvSectionRef}>
            <div className="rh-tv-container">
              <div className="rh-tv-screen">
                {tvVideoError ? (
                  <div style={{
                    width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, #0a1a2f 0%, #0d1f3a 100%)",
                    color: "#C4972A", fontFamily: "'Inter', sans-serif", fontSize: "14px", textAlign: "center", padding: "20px",
                  }}>
                    <div>
                      <Plane size={32} style={{ marginBottom: "8px", opacity: 0.6 }} />
                      <p>Video loading...</p>
                      <p style={{ fontSize: "10px", opacity: 0.6, marginTop: "4px" }}>Premium content will appear shortly</p>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={tvVideoRef} className="rh-tv-video"
                    autoPlay loop playsInline preload="auto" muted={isTvMuted}
                    onPlay={() => setIsTvPlaying(true)} onPause={() => setIsTvPlaying(false)}
                    onError={handleTvVideoError} onCanPlay={handleTvVideoCanPlay}
                  >
                    <source src={TV_VIDEO} type="video/mp4" />
                  </video>
                )}

                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.15) 100%)", pointerEvents: "none" }} />

                {!tvVideoError && (
                  <div className="rh-tv-controls">
                    <button onClick={toggleTvPlay} className="rh-tv-control-btn" aria-label={isTvPlaying ? "Pause" : "Play"}>
                      {isTvPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button onClick={toggleTvMute} className="rh-tv-control-btn" aria-label={isTvMuted ? "Unmute" : "Mute"}>
                      {isTvMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>
                )}

                <div className="rh-tv-badge">✈️ WANDERLUST</div>
              </div>
              <div className="rh-tv-stand"></div>
              <div className="rh-tv-leg-left"></div>
              <div className="rh-tv-leg-right"></div>
            </div>
          </div>
        </section>

        <section className="rh-bottom-section" ref={bottomRef} aria-label="About RASOAF Travels">
          <div className="rh-bottom-inner">
            <div className="rh-wave-grid">
              <div className="rh-wave-paragraph">
                <p style={{ margin: 0, fontFamily: "'Inter','DM Sans',sans-serif", fontSize: "clamp(0.9rem,1.2vw,1.05rem)", fontWeight: 380, lineHeight: 1.75, color: "#6b6b64" }}>
                  We bring reality to your journey — from sacred Hajj &amp; Umrah pilgrimages to seamless global visa services and premium travel experiences. No templates, no repeated routes, no shortcuts.
                </p>
              </div>

              <div className="rh-wave-ctas">
                <button className="rh-text-cta" onClick={() => scrollTo("booking")} aria-label="Book a trip">Book a trip</button>
                <span className="rh-cta-sep" aria-hidden="true" />
                <button className="rh-text-cta" onClick={() => scrollTo("services")} aria-label="See Packages">See Packages</button>
              </div>

              {STATS.map((s, i) => (
                <div key={i} className={`rh-wave-stat-${i + 1} rh-wave-stat-item`}
                  ref={(el) => { waveStatRefs.current[i] = el; }}
                  role="listitem" aria-label={`${s.num}${s.unit} ${s.label}`}
                >
                  <span className="rh-stat-num" data-num={parseFloat(s.num)}>
                    {s.num}<span>{s.unit}</span>
                  </span>
                  <span className="rh-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="rh-social-row" role="list" aria-label="RASOAF social media">
              {SOCIAL_LINKS.map((link, i) => {
                const Icon = link.Icon;
                return (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="rh-social-chip" aria-label={`RASOAF on ${link.label}`} role="listitem">
                    <Icon aria-hidden="true" /><span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}