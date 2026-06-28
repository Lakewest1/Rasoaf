// components/RasoafHero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED
// v24 — 3 rotating BG videos + image slides display for 3 seconds
//
//  Changes in v24:
//  ├─ BG_VIDEO NOW ROTATES BETWEEN 3 VIDEOS
//  │   ├─ Video 1: WA0005_q9gvbi.mp4
//  │   ├─ Video 2: WA0000_tl1nxg.mp4  
//  │   └─ Video 3: WA0005_tei906.mp4
//  ├─ IMAGE SLIDES NOW DISPLAY FOR 3 SECONDS (was 10s)
//  ├─ PROMO VIDEOS STILL DISPLAY FOR 4 SECONDS EACH
//  └─ All other settings unchanged from v23
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
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782597320/worktrhough-for-Engineers_q46mrq.jpg",
    alt: "International flight — visa services",
    label: "Visa Services",
    tag: "Fast Processing",
  },
];

// ── Responsive panel slices ──────────────────────────────────────────────────
const getPanelSlices = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1440;
  if (w >= 1441) return { count: 4, width: "clamp(170px, 16vw, 240px)", height: "clamp(220px, 28vw, 320px)" };
  if (w >= 1025) return { count: 4, width: "clamp(160px, 15vw, 210px)", height: "clamp(210px, 26vw, 300px)" };
  if (w >= 769)  return { count: 3, width: "clamp(140px, 18vw, 180px)", height: "clamp(180px, 24vw, 240px)" };
  if (w >= 481)  return { count: 2, width: "clamp(100px, 30vw, 140px)", height: "clamp(130px, 38vw, 180px)" };
  return { count: 2, width: "clamp(80px, 35vw, 120px)", height: "clamp(110px, 44vw, 160px)" };
};

// 2× clone for seamless GSAP loop
const MARQUEE_PANELS = [...PANELS, ...PANELS];

// ── 3 rotating background videos ─────────────────────────────────────────────
const BG_VIDEOS = [
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4",
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646887/VID-20260628-WA0000_tl1nxg.mp4",
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647185/VID-20260628-WA0005_tei906.mp4",
];

const TV_VIDEO =
  "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781354114/3473-170690984_medium_vlr3ri.mp4";

// ── Promotional videos (all display for exactly 4 seconds) ───────────────────
const VIDEO_SLIDES = [
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4",
    type: "video/mp4",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646485/Lakewest_SOAR_Platform_Case_Study_1_sgalpd.docx.mp4",
    type: "video/mp4",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782646551/VID-20260628-WA0001_f3w0wk.mp4",
    type: "video/mp4",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1782647090/VID-20260628-WA0005_q9gvbi.mp4",
    type: "video/mp4",
  },
];

// Fixed 4-second display for promo videos
const VIDEO_DISPLAY_DURATION = 4000; // 4 seconds in milliseconds
// Image slides display for 3 seconds
const IMAGE_DISPLAY_DURATION = 3; // 3 seconds for GSAP delayedCall

const BG_SLIDES = [
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781839939/SOAR-FreeTrial-BuildAndSell-Guide_2_nmnzar.docx.png",
    position: "50% 55%",
    type: "image",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png",
    position: "50% 50%",
    type: "image",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_gsrsap.jpg",
    position: "50% 60%",
    type: "image",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877301/mohamed_hassan-hajj-8794441_1920_gsrsap.png",
    position: "50% 45%",
    type: "image",
  },
  {
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg",
    position: "50% 55%",
    type: "image",
  },
];

const TRUST_BADGES = [
  { text: "Licensed Agency" },
  { text: "Visa Assistance" },
  { text: "Flight & Hotel" },
  { text: "24/7 Support" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Google Fonts — Rasoaf Design System ── */
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

  .rh-root {
    --clr-primary-bg:    #F7C948;
    --clr-primary-text:  #111111;
    --clr-supporting-bg: #FFF8E6;
    --clr-card:          #FFFFFF;
    --clr-accent:        #D4A017;
    --clr-accent-2:      #B8860B;
    --clr-border:        #E6D5A8;
    --clr-muted:         #5F5F5F;
    --clr-hover-bg:      #FFE082;
    --clr-dark-surface:  #0a0a0a;
    --clr-overlay-1:     rgba(0, 0, 0, 0.50);
    --clr-overlay-2:     rgba(0, 0, 0, 0.78);
    --clr-glass-border:  rgba(255, 255, 255, 0.15);
    --clr-glass-bg:      rgba(255, 255, 255, 0.06);
    --clr-accent-glow:   rgba(212, 160, 23, 0.35);
    --clr-accent-glow-2: rgba(212, 160, 23, 0.10);
    --ff-heading: 'Manrope', sans-serif;
    --ff-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --sp-section: clamp(48px, 8vh, 96px);
    --sp-content: clamp(16px, 4vw, 48px);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  .rh-root {
    font-family: var(--ff-body);
    background: var(--clr-supporting-bg);
    color: var(--clr-primary-text);
    width: 100%;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     HERO
  ───────────────────────────────────────────────────────────────────────── */
  .rh-hero {
    position: relative;
    width: 100%;
    min-height: 92vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow: visible;
    background: var(--clr-dark-surface);
    padding-top: clamp(80px, 10vh, 120px);
    padding-bottom: 0;
    isolation: isolate;
  }

  /* ── Background wrapper ────────────────────────────────────────────────── */
  .rh-bg-wrapper {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 55%;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .rh-bgvid {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0;
    will-change: transform, opacity;
  }
  .rh-bgvid.active { opacity: 1; }

  .rh-bgslide {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
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
    height: 55%;
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 65% 50% at 50% 45%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.60) 100%),
      radial-gradient(ellipse 55% 35% at 50% 48%, rgba(255,255,255,0.04) 0%, transparent 60%);
    mix-blend-mode: overlay;
    transition: opacity 0.6s ease;
  }

  .rh-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      radial-gradient(ellipse 80% 35% at 50% 0%,   rgba(0,0,0,0.52) 0%, transparent 100%),
      radial-gradient(ellipse 100% 55% at 50% 100%, rgba(0,0,0,0.80) 0%, transparent 100%),
      linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.70) 100%);
  }

  .rh-vignette {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      radial-gradient(ellipse 130% 110% at 0%   50%, rgba(212,160,23,0.09) 0%, transparent 55%),
      radial-gradient(ellipse 130% 110% at 100% 50%, rgba(212,160,23,0.09) 0%, transparent 55%),
      radial-gradient(ellipse 80%  60%  at 50%  0%,  rgba(184,134,11,0.05) 0%, transparent 50%);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     CONTENT
  ───────────────────────────────────────────────────────────────────────── */
  .rh-content {
    position: relative;
    z-index: 10;
    width: 100%;
    text-align: center;
    padding: 0 var(--sp-content);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: clamp(20px, 3vh, 40px);
    margin-bottom: clamp(16px, 2vh, 28px);
  }

  .rh-headline-wrapper {
    position: relative;
    display: inline-block;
    opacity: 0;
  }

  .rh-sup-text {
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(212, 160, 23, 0.90);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    text-align: center;
    margin-bottom: clamp(8px, 1vw, 12px);
    opacity: 0;
    transform: translateY(8px);
    position: relative;
  }
  .rh-sup-text::before,
  .rh-sup-text::after {
    content: '';
    display: block;
    width: 2.5ch;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,160,23,0.45));
    flex-shrink: 0;
  }
  .rh-sup-text::after { transform: scaleX(-1); }

  .rh-headline {
    font-family: var(--ff-heading);
    font-weight: 800;
    font-size: clamp(3rem, 6vw, 4.75rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0 auto clamp(6px, 1vw, 12px);
    max-width: 780px;
    opacity: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .rh-headline .rh-word {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
  }
  .rh-headline .rh-char {
    display: inline-block;
    will-change: transform, opacity;
  }
  .rh-headline em {
    font-style: italic;
    font-weight: 700;
    color: var(--clr-accent);
    text-shadow: 0 0 48px rgba(212,160,23,0.18);
  }

  .rh-subtitle {
    font-family: var(--ff-body);
    font-size: clamp(1rem, 1.4vw, 1.125rem);
    font-weight: 400;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
    max-width: 520px;
    margin: 0 auto clamp(16px, 2.5vw, 28px);
    opacity: 0;
    transform: translateY(14px);
    letter-spacing: 0.005em;
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
    font-family: var(--ff-body);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: var(--clr-primary-text);
    background: linear-gradient(135deg, var(--clr-primary-bg) 0%, var(--clr-accent) 100%);
    border: none;
    padding: clamp(11px, 1vw, 14px) clamp(24px, 2.5vw, 36px);
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 4px 20px var(--clr-accent-glow), inset 0 1px 0 rgba(255,255,255,0.22);
    transform: translateY(0);
    position: relative;
    overflow: hidden;
  }
  .rh-cta-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--clr-hover-bg) 0%, var(--clr-primary-bg) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .rh-cta-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 32px rgba(212,160,23,0.48), inset 0 1px 0 rgba(255,255,255,0.30);
  }
  .rh-cta-primary:hover::before { opacity: 1; }
  .rh-cta-primary:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 12px rgba(212,160,23,0.25);
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
    font-family: var(--ff-body);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.88);
    background: transparent;
    backdrop-filter: blur(14px) saturate(180%);
    -webkit-backdrop-filter: blur(14px) saturate(180%);
    border: 1.5px solid var(--clr-glass-border);
    padding: clamp(11px, 1vw, 14px) clamp(24px, 2.5vw, 36px);
    border-radius: 50px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    position: relative;
    overflow: hidden;
  }
  .rh-cta-secondary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(247, 201, 72, 0.12);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 50px;
  }
  .rh-cta-secondary:hover {
    transform: translateY(-3px) scale(1.02);
    border-color: rgba(247, 201, 72, 0.55);
    color: var(--clr-hover-bg);
    box-shadow: 0 8px 28px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(247,201,72,0.25);
  }
  .rh-cta-secondary:hover::before { opacity: 1; }
  .rh-cta-secondary:active { transform: translateY(0) scale(0.98); }
  .rh-cta-secondary span { position: relative; z-index: 1; }
  .rh-cta-secondary svg {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }
  .rh-cta-secondary:hover svg { transform: translateX(4px); }

  .rh-cta-primary:focus-visible,
  .rh-cta-secondary:focus-visible,
  .rh-panel:focus-visible,
  .rh-tv-control-btn:focus-visible,
  .rh-panel-register:focus-visible {
    outline: 2.5px solid var(--clr-accent);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .rh-trust-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 1.2vw, 14px);
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(14px);
  }

  .rh-trust-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: rgba(255, 255, 255, 0.07);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-radius: 100px;
    padding: 6px 14px 6px 10px;
    font-family: var(--ff-body);
    font-size: clamp(0.7rem, 0.8vw, 0.8rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.72);
    letter-spacing: 0.02em;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 2px 8px rgba(0,0,0,0.12);
  }
  .rh-trust-badge:hover {
    border-color: rgba(212, 160, 23, 0.45);
    background: rgba(212, 160, 23, 0.10);
    color: var(--clr-accent);
    transform: translateY(-2px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.09), 0 6px 20px rgba(212,160,23,0.12);
  }
  .rh-trust-badge .badge-check {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px; height: 15px;
    border-radius: 50%;
    background: rgba(212, 160, 23, 0.18);
    color: var(--clr-accent);
    flex-shrink: 0;
  }
  .rh-trust-badge .badge-check svg { width: 9px; height: 9px; }

  /* ─────────────────────────────────────────────────────────────────────────
     MARQUEE — Panels with travel scrapbook styling
  ───────────────────────────────────────────────────────────────────────── */
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
      rgba(0,0,0,1)    8%,
      rgba(0,0,0,1)    92%,
      rgba(0,0,0,0.15) 97%,
      transparent      100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      rgba(0,0,0,0.15) 3%,
      rgba(0,0,0,1)    8%,
      rgba(0,0,0,1)    92%,
      rgba(0,0,0,0.15) 97%,
      transparent      100%
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

  .rh-panel {
    position: relative;
    flex-shrink: 0;
    width: clamp(160px, 15vw, 210px);
    height: clamp(210px, 26vw, 300px);
    overflow: hidden;
    cursor: pointer;
    border-radius: 18px;
    clip-path: ellipse(58% 92% at 50% 92%);
    will-change: clip-path, transform;
    box-shadow:
      0 1px 3px rgba(0,0,0,0.06),
      0 8px 24px rgba(0,0,0,0.10),
      0 0 0 1px rgba(212,160,23,0.06);
    background: #1a1a1a;
    transition: box-shadow 0.5s ease;
    transform: rotate(var(--panel-rotate, 0deg));
    border: 1px solid rgba(255, 255, 255, 0.10);
  }
  .rh-panel:nth-child(1) { --panel-rotate: -2.5deg; }
  .rh-panel:nth-child(2) { --panel-rotate: 3deg; }
  .rh-panel:nth-child(3) { --panel-rotate: -1.5deg; }
  .rh-panel:nth-child(4) { --panel-rotate: 2deg; }

  .rh-panel:hover {
    box-shadow:
      0 2px 8px rgba(0,0,0,0.10),
      0 18px 44px rgba(0,0,0,0.16),
      0 0 0 1px rgba(212,160,23,0.15);
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
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0.18) 0%,
      transparent 35%,
      transparent 55%,
      rgba(0,0,0,0.82) 100%
    );
    z-index: 1;
    transition: background 0.5s ease;
  }
  .rh-panel:hover .rh-panel-grad {
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0.38) 0%,
      rgba(0,0,0,0.12) 35%,
      rgba(0,0,0,0.12) 55%,
      rgba(0,0,0,0.88) 100%
    );
  }

  .rh-shimmer-sweep {
    position: absolute;
    top: 0; left: -150%; width: 60%; height: 100%;
    z-index: 5;
    pointer-events: none;
    background: linear-gradient(
      105deg,
      transparent 0%, transparent 35%,
      rgba(212,160,23,0.10) 45%,
      rgba(247,201,72,0.22) 50%,
      rgba(212,160,23,0.10) 55%,
      transparent 65%, transparent 100%
    );
  }

  .rh-panel-shimmer {
    position: absolute;
    bottom: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,134,11,0.65), transparent);
    z-index: 3;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .rh-panel:hover .rh-panel-shimmer { opacity: 1; }

  .rh-panel-info {
    position: absolute; inset: 0; z-index: 2;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 5px;
    opacity: 1; transform: scale(1);
    transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .rh-panel-label {
    font-family: var(--ff-heading);
    font-size: clamp(13px, 1.4vw, 17px);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
    line-height: 1.15;
    text-align: center;
    text-shadow: 0 2px 8px rgba(0,0,0,0.45);
    animation: rhHeartPump 2.4s ease-in-out infinite;
  }

  .rh-panel-tag {
    font-family: var(--ff-body);
    font-size: clamp(6.5px, 0.6vw, 8.5px);
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.80);
    text-align: center;
    text-shadow: 0 1px 4px rgba(0,0,0,0.35);
  }

  .rh-panel-num {
    position: absolute; bottom: 14px; right: 16px; z-index: 3;
    font-family: var(--ff-body);
    font-size: 10px; font-weight: 500;
    color: rgba(255, 255, 255, 0.48);
    letter-spacing: 0.08em;
    opacity: 1;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  .rh-panel-corner {
    position: absolute; bottom: 0; left: 0;
    width: 0; height: 0;
    border-style: solid;
    border-width: 28px 0 0 28px;
    border-color: transparent transparent transparent var(--clr-accent);
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
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px) saturate(160%);
    -webkit-backdrop-filter: blur(10px) saturate(160%);
    border: 1px solid rgba(212,160,23,0.52);
    border-radius: 100px;
    padding: 5px 11px 5px 8px;
    font-family: var(--ff-body);
    font-size: clamp(8px, 0.85vw, 10px);
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: var(--clr-accent);
    cursor: pointer;
    opacity: 0;
    transform: translateY(6px) scale(0.92);
    transition:
      opacity      0.32s cubic-bezier(0.25, 1, 0.5, 1),
      transform    0.32s cubic-bezier(0.34, 1.56, 0.64, 1),
      background   0.25s ease,
      border-color 0.25s ease,
      box-shadow   0.25s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.06);
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
    background: var(--clr-accent);
    box-shadow: 0 0 5px rgba(212,160,23,0.7);
    transition: background 0.25s ease, box-shadow 0.25s ease;
  }
  .rh-panel:hover .rh-panel-register,
  .rh-panel:focus-visible .rh-panel-register {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .rh-panel-register:hover {
    background: rgba(212,160,23,0.22);
    border-color: rgba(212,160,23,0.82);
    color: var(--clr-primary-bg);
    box-shadow: 0 4px 16px rgba(212,160,23,0.22), inset 0 1px 0 rgba(255,255,255,0.10);
  }
  .rh-panel-register:hover::before {
    background: var(--clr-primary-bg);
    box-shadow: 0 0 8px rgba(247,201,72,0.85);
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

  .rh-marquee-paused .rh-marquee-track {
    animation-play-state: paused !important;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     TV SECTION
  ───────────────────────────────────────────────────────────────────────── */
  .rh-tv-section {
    position: relative; z-index: 10;
    width: 100%;
    display: flex; align-items: center; justify-content: center;
    padding: clamp(12px, 2vw, 24px) var(--sp-content);
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
    border: 2px solid rgba(212,160,23,0.55);
    box-shadow:
      0 0 0  1px  rgba(212,160,23,0.14),
      0 0 32px    var(--clr-accent-glow),
      0 0 64px    var(--clr-accent-glow-2),
      0 24px 52px -12px rgba(0,0,0,0.55);
    background: var(--clr-dark-surface);
    z-index: 201;
    aspect-ratio: 16 / 9;
    animation: rh-tv-glow 4s ease-in-out infinite;
  }

  @keyframes rh-tv-glow {
    0%, 100% {
      box-shadow:
        0 0 0 1px rgba(212,160,23,0.14),
        0 0 32px var(--clr-accent-glow),
        0 0 64px var(--clr-accent-glow-2),
        0 24px 52px -12px rgba(0,0,0,0.55);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(212,160,23,0.22),
        0 0 44px rgba(212,160,23,0.48),
        0 0 88px rgba(184,134,11,0.16),
        0 24px 52px -12px rgba(0,0,0,0.55);
    }
  }

  .rh-tv-video {
    width: 100%; height: 100%;
    display: block; object-fit: cover;
    background: var(--clr-dark-surface);
  }

  .rh-tv-error {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 8px;
    background: var(--clr-dark-surface);
    color: var(--clr-accent);
    font-family: var(--ff-body);
    font-size: 0.875rem;
    text-align: center;
    padding: 20px;
  }
  .rh-tv-error__icon { font-size: 32px; }
  .rh-tv-error__title {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--clr-accent);
    letter-spacing: 0.01em;
  }
  .rh-tv-error__sub {
    font-size: 0.8rem;
    color: var(--clr-muted);
    opacity: 0.75;
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

  .rh-tv-leg-left,
  .rh-tv-leg-right {
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
    background: rgba(0,0,0,0.76);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1.5px solid rgba(212,160,23,0.45);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--clr-accent);
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    padding: 0;
  }
  .rh-tv-control-btn:hover {
    transform: scale(1.08);
    background: rgba(212,160,23,0.22);
    border-color: rgba(212,160,23,0.72);
  }

  .rh-tv-badge {
    position: absolute;
    top: clamp(8px, 1.2vw, 14px);
    right: clamp(8px, 1.2vw, 14px);
    background: rgba(0,0,0,0.76);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid rgba(212,160,23,0.45);
    font-family: var(--ff-body);
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--clr-accent);
    z-index: 210;
  }

  .rh-tv-glass {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.14) 100%);
    pointer-events: none;
  }

  @keyframes rhHeartPump {
    0%, 100% { transform: scale(1); }
    15%       { transform: scale(1.06); }
    30%       { transform: scale(1); }
    45%       { transform: scale(1.05); }
    60%       { transform: scale(1); }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     RESPONSIVE BREAKPOINTS — v21: Increased background height + padding
     • Mobile (≤768px): height 65% (was 55%), padding-bottom: 20px
     • Small Mobile (≤480px): height 60% (was 50%), padding-bottom: 16px
     • Tablet: height 58% (was 55%), padding-bottom: 8px
  ───────────────────────────────────────────────────────────────────────── */
  @media (max-width: 1200px) {
    .rh-hero { min-height: 85vh; }
    .rh-panel {
      width: clamp(150px, 14vw, 190px);
      height: clamp(200px, 24vw, 270px);
    }
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    .rh-hero {
      min-height: 80vh;
      padding-top: clamp(70px, 8vh, 100px);
    }
    .rh-bg-wrapper {
      height: 58%;
      padding-bottom: 8px;
    }
    .rh-glass-mask { height: 58%; }
    .rh-bgvid,
    .rh-bgslide {
      object-fit: cover;
      object-position: center top;
      transform: scale(1.45);
      transform-origin: center top;
    }
    .rh-content { margin-top: clamp(20px, 3vh, 30px); }
    .rh-headline { font-size: clamp(2.4rem, 5vw, 3.8rem); }
    .rh-panel {
      width: clamp(130px, 18vw, 170px);
      height: clamp(170px, 24vw, 230px);
    }
    .rh-tv-container { max-width: 360px; }
  }

  @media (max-width: 768px) {
    .rh-hero {
      min-height: 70vh;
      padding-top: clamp(80px, 10vh, 110px);
      overflow: hidden;
    }
    .rh-bg-wrapper {
      height: 65%;
      padding-bottom: 20px;
    }
    .rh-glass-mask { height: 65%; }
    .rh-bgvid,
    .rh-bgslide {
      object-fit: cover;
      object-position: center top;
      transform: scale(1.9);
      transform-origin: center top;
    }
    .rh-tv-screen   { animation: none !important; }
    .rh-panel       { will-change: auto; contain: layout; }
    .rh-panel img   { will-change: auto; }
    .rh-panel-label { animation: none !important; }
    .rh-panel:hover img { transform: scale(1.05); }
    .rh-trust-badge {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    .rh-tv-container { will-change: auto; max-width: 300px; }
    .rh-content { margin-top: clamp(12px, 2vh, 20px); }
    .rh-headline { font-size: clamp(2rem, 7vw, 2.8rem); }
    .rh-panel {
      width: clamp(100px, 30vw, 140px);
      height: clamp(130px, 38vw, 180px);
    }
    .rh-panel-label { font-size: clamp(11px, 3vw, 14px); }
    .rh-panel-tag { font-size: clamp(6px, 1.8vw, 8px); }
    .rh-tv-stand { width: 60%; height: 5px; margin-top: 10px; }
    .rh-tv-stand::before { width: 40px; height: 28px; bottom: -28px; }
    .rh-tv-stand::after  { width: 60px; height: 8px;  bottom: -36px; }
    .rh-tv-leg-left, .rh-tv-leg-right { width: 10px; height: 25px; bottom: -25px; }
    .rh-tv-leg-left  { left: 28%; }
    .rh-tv-leg-right { right: 28%; }
    .rh-tv-control-btn { width: 30px; height: 30px; }
    .rh-tv-control-btn svg { width: 14px; height: 14px; }
    .rh-tv-badge { font-size: 0.62rem; padding: 3px 10px; }
  }

  @media (max-width: 480px) {
    .rh-hero {
      min-height: 65vh;
      padding-top: clamp(90px, 12vh, 130px);
      overflow: hidden;
    }
    .rh-bg-wrapper {
      height: 60%;
      padding-bottom: 16px;
    }
    .rh-glass-mask { height: 60%; }
    .rh-bgvid,
    .rh-bgslide {
      object-fit: cover;
      object-position: center top;
      transform: scale(2.15);
      transform-origin: center top;
    }
    .rh-content { margin-top: clamp(8px, 1.5vh, 15px); }
    .rh-headline { font-size: clamp(1.8rem, 6.5vw, 2.4rem); }
    .rh-subtitle  { font-size: clamp(0.85rem, 2.5vw, 0.95rem); }
    .rh-cta-primary,
    .rh-cta-secondary {
      font-size: 0.8rem;
      padding: clamp(6px, 1.2vw, 8px) clamp(14px, 2.5vw, 20px);
    }
    .rh-trust-badge { font-size: 0.65rem; padding: 4px 10px 4px 8px; }
    .rh-panel {
      width: clamp(80px, 35vw, 120px);
      height: clamp(110px, 44vw, 160px);
    }
    .rh-panel-label { font-size: clamp(10px, 3vw, 12px); }
    .rh-panel-tag { font-size: clamp(5px, 1.5vw, 6.5px); }
    .rh-panel:nth-child(1) { --panel-rotate: -1.5deg; }
    .rh-panel:nth-child(2) { --panel-rotate: 2deg; }
    .rh-panel:nth-child(3) { --panel-rotate: -1deg; }
    .rh-panel:nth-child(4) { --panel-rotate: 1.5deg; }
    .rh-tv-container { max-width: 240px; }
    .rh-tv-stand { width: 50%; }
    .rh-tv-stand::before { width: 35px; height: 25px; bottom: -25px; }
    .rh-tv-stand::after  { width: 50px; height: 7px;  bottom: -32px; }
    .rh-tv-leg-left, .rh-tv-leg-right { width: 8px; height: 22px; bottom: -22px; }
    .rh-tv-leg-left  { left: 30%; }
    .rh-tv-leg-right { right: 30%; }
    .rh-tv-control-btn { width: 28px; height: 28px; }
    .rh-tv-control-btn svg { width: 12px; height: 12px; }
  }

  @media (min-width: 1441px) {
    .rh-hero {
      min-height: 78vh;
      padding-top: clamp(100px, 12vh, 140px);
    }
    .rh-bg-wrapper { height: 50%; }
    .rh-glass-mask { height: 50%; }
    .rh-content { margin-top: clamp(30px, 4vh, 50px); }
    .rh-panel {
      width: clamp(170px, 16vw, 240px);
      height: clamp(220px, 28vw, 320px);
    }
    .rh-tv-container { max-width: 480px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .rh-headline,
    .rh-sup-text,
    .rh-subtitle,
    .rh-trust-row,
    .rh-cta-row,
    .rh-headline-wrapper {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
    .rh-marquee-track { animation: none !important; }
    .rh-panel,
    .rh-panel img,
    .rh-panel-info,
    .rh-panel-shimmer,
    .rh-panel-num,
    .rh-panel-corner,
    .rh-tv-control-btn,
    .rh-shimmer-sweep,
    .rh-bgslide,
    .rh-bgvid,
    .rh-tv-screen,
    .rh-tv-container,
    .rh-trust-badge {
      transition: none !important;
      animation: none !important;
    }
    .rh-panel-register {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .rh-panel-label  { animation: none !important; }
    .rh-panel:hover img { transform: none !important; }
  }
`;

// ── Shared SVG icons ──────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg
    width="10" height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16" height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
export default function RasoafHero() {
  const rootRef            = useRef(null);
  const heroRef            = useRef(null);
  const videoRef           = useRef(null);
  const promoVideoRef      = useRef(null);
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
  const videoSlideIndex    = useRef(0);
  const bgVideoIndex       = useRef(0);  // Track which of the 3 BG videos is active
  const rafHandleRef       = useRef(null);
  const magnetMapRef       = useRef(new Map());

  const [isTvPlaying,   setIsTvPlaying]   = useState(true);
  const [isTvMuted,     setIsTvMuted]     = useState(false);
  const [tvVideoError,  setTvVideoError]  = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);

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

  // ── TV video controls ────────────────────────────────────────────────────
  const toggleTvPlay = useCallback(() => {
    if (!tvVideoRef.current) return;
    if (isTvPlaying) tvVideoRef.current.pause();
    else tvVideoRef.current.play().catch(() => {});
    setIsTvPlaying((p) => !p);
  }, [isTvPlaying]);

  const toggleTvMute = useCallback(() => {
    if (!tvVideoRef.current) return;
    tvVideoRef.current.muted = !isTvMuted;
    setIsTvMuted((m) => !m);
  }, [isTvMuted]);

  const handleTvVideoError   = useCallback(() => setTvVideoError(true),  []);
  const handleTvVideoCanPlay = useCallback(() => {}, []);

  // ── Scroll-aware marquee speed ───────────────────────────────────────────
  const slowMarquee = useCallback(() => {
    if (!marqueeTween.current) return;
    gsap.to(marqueeTween.current, { timeScale: 0.25, duration: 0.6, ease: "power2.out" });
    clearTimeout(scrollTimerRef.current);
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
      clearTimeout(scrollTimerRef.current);
    };
  }, [slowMarquee]);

  // ── Marquee pause / resume ───────────────────────────────────────────────
  const pauseMarquee = useCallback(() => {
    setMarqueePaused(true);
    if (marqueeTween.current) {
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = null;
      gsap.to(marqueeTween.current, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  const resumeMarquee = useCallback(() => {
    setMarqueePaused(false);
    if (marqueeTween.current) {
      gsap.to(marqueeTween.current, { timeScale: 1, duration: 0.6, ease: "power2.inOut" });
    }
  }, []);

  // ── Background slide cycle (3 rotating BG videos + 4s promo + 3s images) ─
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const videoEl  = videoRef.current;
      const promoEl  = promoVideoRef.current;
      const slideAEl = bgSlideARef.current;
      const slideBEl = bgSlideBRef.current;
      if (!videoEl || !slideAEl || !slideBEl || !promoEl) return;

      // Set up promotional video element
      promoEl.muted = true;
      promoEl.playsInline = true;
      promoEl.style.opacity = "0";
      promoEl.className = "rh-bgslide";

      // Initialize with first BG video
      videoEl.src = BG_VIDEOS[0];

      gsap.set(videoEl,  { opacity: 1, className: "rh-bgvid active" });
      gsap.set(slideAEl, { opacity: 0, className: "rh-bgslide" });
      gsap.set(slideBEl, { opacity: 0, className: "rh-bgslide" });
      gsap.set(promoEl,  { opacity: 0, className: "rh-bgslide" });

      if (isMobileRef.current) return;

      let nextSlideIdx = 0;
      let cycleTimer   = null;

      const playPromoVideo = () => {
        const videoData = VIDEO_SLIDES[videoSlideIndex.current % VIDEO_SLIDES.length];
        promoEl.src = videoData.src;
        promoEl.load();
        
        return new Promise((resolve) => {
          // Force play and then stop after exactly 4 seconds
          promoEl.oncanplay = () => {
            promoEl.play().catch(() => {});
          };
          
          // Always stop after exactly 4 seconds regardless of video state
          const forceStopTimer = setTimeout(() => {
            if (promoEl) {
              promoEl.pause();
              promoEl.currentTime = 0;
            }
            resolve();
          }, VIDEO_DISPLAY_DURATION);
          
          // Clean up if video ends naturally before 4 seconds
          promoEl.onended = () => {
            clearTimeout(forceStopTimer);
            resolve();
          };
        });
      };

      const runCycle = async () => {
        if (bgModeRef.current === "video") {
          // Show a promotional video for exactly 4 seconds
          videoSlideIndex.current++;
          bgModeRef.current = "promo";
          
          gsap.set(promoEl, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
          gsap.to(videoEl, { opacity: 0, duration: 1.5, ease: "power3.inOut",
            onComplete: () => gsap.set(videoEl, { className: "rh-bgvid" }),
          });
          gsap.to(promoEl, { opacity: 1, scale: 1, duration: 2.0, ease: "power3.out" });
          
          await playPromoVideo();
          cycleTimer = gsap.delayedCall(0.5, runCycle);
          
        } else if (bgModeRef.current === "promo") {
          // Show an image slide for exactly 3 seconds
          const slideData = BG_SLIDES[nextSlideIdx % BG_SLIDES.length];
          const slideEl   = bgSlideIndex.current % 2 === 0 ? slideAEl : slideBEl;
          slideEl.src = slideData.src;
          slideEl.style.objectPosition = slideData.position;
          
          gsap.set(slideEl, { opacity: 0, scale: 1.04, className: "rh-bgslide active" });
          gsap.to(promoEl, { opacity: 0, duration: 1.8, ease: "power3.inOut",
            onComplete: () => gsap.set(promoEl, { className: "rh-bgslide" }),
          });
          gsap.to(slideEl, { opacity: 1, scale: 1, duration: 2.4, ease: "power3.out" });
          bgSlideIndex.current++;
          nextSlideIdx++;
          bgModeRef.current = "image";
          cycleTimer = gsap.delayedCall(IMAGE_DISPLAY_DURATION, runCycle);
          
        } else if (bgModeRef.current === "image") {
          // Show the next background video (rotate through 3 BG_VIDEOS)
          const nextBgVideo = BG_VIDEOS[bgVideoIndex.current % BG_VIDEOS.length];
          videoEl.src = nextBgVideo;
          bgVideoIndex.current++;
          
          const prevSlideEl =
            (bgSlideIndex.current - 1) % 2 === 0 ? slideAEl : slideBEl;
          gsap.set(videoEl, { opacity: 0, className: "rh-bgvid active" });
          gsap.to(videoEl, { opacity: 1, duration: 1.8, ease: "power3.inOut" });
          gsap.to(prevSlideEl, {
            opacity: 0, scale: 1.02, duration: 2.0, ease: "power3.inOut",
            onComplete: () => gsap.set(prevSlideEl, { className: "rh-bgslide" }),
          });
          bgModeRef.current = "video";
          cycleTimer = gsap.delayedCall(5, runCycle);
        }
      };

      cycleTimer = gsap.delayedCall(5, runCycle);
      return () => { if (cycleTimer) cycleTimer.kill(); };
    });

    return () => mm.revert();
  }, []);

  // ── Magnet hover effect ──────────────────────────────────────────────────
  const bindMagnet = useCallback((el) => {
    if (!el || isMobileRef.current) return;
    if (magnetMapRef.current.has(el)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.04;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.03;
      gsap.to(el, { x: dx, y: dy, duration: 0.55, ease: "power2.out", overwrite: "auto" });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "power2.out", overwrite: "auto" });

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseleave", onLeave);
    magnetMapRef.current.set(el, [onMove, onLeave]);
  }, []);

  useEffect(() => {
    panelRefs.current.forEach(bindMagnet);
    return () => {
      magnetMapRef.current.forEach(([onMove, onLeave], el) => {
        el.removeEventListener("mousemove",  onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
      magnetMapRef.current.clear();
    };
  }, [bindMagnet]);

  // ── GSAP master timeline ─────────────────────────────────────────────────
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const mobile = isMobileRef.current;
        const tl     = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(headlineWrapperRef.current, { opacity: 1, duration: 0.6 },      0.10);
        tl.to(supTextRef.current,         { opacity: 1, y: 0, duration: 0.7 }, 0.15);

        const headlineEl = headlineRef.current;
        if (headlineEl) {
          headlineEl.style.opacity = "1";
          headlineEl.querySelectorAll(".rh-word").forEach((word, wi) => {
            const text = word.textContent || "";
            word.innerHTML = "";
            [...text].forEach((ch) => {
              const span       = document.createElement("span");
              span.className   = "rh-char";
              span.textContent = ch === " " ? "\u00A0" : ch;
              word.appendChild(span);
            });
            tl.fromTo(
              word.querySelectorAll(".rh-char"),
              { opacity: 0, y: 36, filter: "blur(3px)" },
              { opacity: 1, y: 0,  filter: "blur(0px)", duration: 0.8,
                stagger: { amount: 0.18 } },
              0.25 + wi * 0.10
            );
          });
        }

        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.85 }, 0.65);
        tl.to(ctaRowRef.current,   { opacity: 1, y: 0, duration: 0.80 }, 0.80);
        tl.to(trustRef.current,    { opacity: 1, y: 0, duration: 0.80 }, 0.95);

        const ctaBtns = ctaRowRef.current?.querySelectorAll(
          ".rh-cta-primary, .rh-cta-secondary"
        );
        if (ctaBtns?.length) {
          tl.fromTo(
            ctaBtns,
            { opacity: 0, y: 12, scale: 0.94 },
            { opacity: 1, y: 0,  scale: 1,  duration: 0.55, stagger: 0.08 },
            0.85
          );
        }

        const badges = trustRef.current?.querySelectorAll(".rh-trust-badge");
        if (badges?.length) {
          tl.fromTo(
            badges,
            { opacity: 0, y: 10, scale: 0.92 },
            { opacity: 1, y: 0,  scale: 1,    duration: 0.50, stagger: 0.06 },
            1.00
          );
        }

        if (marqueeTrackRef.current && !mobile) {
          marqueeTween.current = gsap.to(marqueeTrackRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
          });
        }

        const panels = panelRefs.current.filter(Boolean);
        if (!mobile) {
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

            const edge =
              i === 0 ? "42%" : i === panels.length - 1 ? "58%" : "50%";
            gsap.fromTo(
              panel,
              { clipPath: `ellipse(58% 92% at ${edge} 92%)` },
              { clipPath: `ellipse(61% 95% at ${edge} 91%)`,
                duration: 5 + i * 0.3, repeat: -1, yoyo: true,
                ease: "sine.inOut", delay: i * 0.2 }
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

        if (tvContainerRef.current && !mobile) {
          gsap.to(tvContainerRef.current, {
            y: -8, duration: 4.5,
            repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        }

        if (tvSectionRef.current) {
          gsap.fromTo(
            tvSectionRef.current,
            { opacity: 0, y: 36 },
            {
              opacity: 1, y: 0, duration: 0.85,
              scrollTrigger: {
                trigger: tvSectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (badges?.length && !mobile) {
          gsap.to(badges, {
            y: -3, stagger: 0.22,
            duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8,
          });
        }

        const shimmerEl = shimmerRef.current;
        if (shimmerEl && !mobile) {
          const runShimmer = () => {
            gsap.fromTo(
              shimmerEl,
              { left: "-60%" },
              {
                left: "120%", duration: 2.2, ease: "power2.inOut",
                onComplete: () => {
                  gsap.set(shimmerEl, { left: "-60%" });
                  gsap.delayedCall(10, runShimmer);
                },
              }
            );
          };
          gsap.delayedCall(2, runShimmer);
        }
      }, rootRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const staticRefs = [
        headlineWrapperRef, supTextRef, headlineRef,
        subtitleRef, ctaRowRef, trustRef,
      ];
      staticRefs.forEach((r) => {
        if (r.current) {
          r.current.style.opacity   = "1";
          r.current.style.transform = "none";
        }
      });
      if (bgSlideARef.current) {
        bgSlideARef.current.style.opacity = "0";
        bgSlideARef.current.className     = "rh-bgslide";
      }
      if (bgSlideBRef.current) {
        bgSlideBRef.current.style.opacity = "0";
        bgSlideBRef.current.className     = "rh-bgslide";
      }
      if (videoRef.current) {
        videoRef.current.style.opacity = "1";
        videoRef.current.className     = "rh-bgvid active";
      }
      panelRefs.current.forEach((el) => { if (el) el.style.opacity = "1"; });
      if (tvSectionRef.current) {
        tvSectionRef.current.style.opacity   = "1";
        tvSectionRef.current.style.transform = "none";
      }
    });

    return () => mm.revert();
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="rh-root" ref={rootRef}>

        <section
          className="rh-hero"
          ref={heroRef}
          id="home"
          aria-label="RASOAF Travels — Hero"
        >
          {/* ── Background Stack ── */}
          <div className="rh-bg-wrapper" aria-hidden="true">
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
            <video
              ref={promoVideoRef}
              className="rh-bgslide"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <video
              ref={videoRef}
              className="rh-bgvid active"
              autoPlay loop muted playsInline preload="auto"
              aria-hidden="true"
            />
          </div>

          <div className="rh-glass-mask" aria-hidden="true" />
          <div className="rh-overlay"    aria-hidden="true" />
          <div className="rh-vignette"   aria-hidden="true" />

          {/* ── Hero Content ── */}
          <div className="rh-content">
            <div className="rh-headline-wrapper" ref={headlineWrapperRef}>
              <span
                className="rh-sup-text"
                ref={supTextRef}
                aria-label="Your Gateway to The World"
              >
                Your Gateway to The World
              </span>

              <h1
                className="rh-headline"
                ref={headlineRef}
                aria-label="One Sacred Journey at a Time — RASOAF Travels"
              >
                <span className="rh-word">One&nbsp;</span>
                <span className="rh-word">Sacred&nbsp;</span>
                <span className="rh-word">Journey</span>
                <br />
                <span className="rh-word">at&nbsp;a&nbsp;</span>
                <span className="rh-word"><em>Time</em></span>
              </h1>
            </div>

            <p className="rh-subtitle" ref={subtitleRef}>
              Experience Hajj, Umrah, and international travel with trusted
              guidance, personalised support, and seamless planning from
              departure to return.
            </p>

            <div className="rh-cta-row" ref={ctaRowRef}>
              <button
                type="button"
                className="rh-cta-primary"
                onClick={() => scrollTo("services")}
                aria-label="Plan your Umrah journey with RASOAF Travels"
              >
                <span>Plan Your Umrah</span>
                <ArrowIcon />
              </button>
              <button
                type="button"
                className="rh-cta-secondary"
                onClick={() => scrollTo("packages")}
                aria-label="Explore RASOAF travel packages"
              >
                <span>Explore Packages</span>
                <ArrowIcon />
              </button>
            </div>

            <div
              className="rh-trust-row"
              ref={trustRef}
              role="list"
              aria-label="Trust and quality indicators"
            >
              {TRUST_BADGES.map((b, i) => (
                <div key={i} className="rh-trust-badge" role="listitem">
                  <span className="badge-check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Marquee Gallery ── */}
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
                  aria-label={`${panel.label} — ${panel.tag}. Press Enter to register interest`}
                  onClick={() => scrollTo("register")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollTo("register");
                    }
                  }}
                >
                  <img
                    src={panel.src}
                    alt={panel.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="rh-panel-grad"    aria-hidden="true" />
                  <div className="rh-panel-shimmer" aria-hidden="true" />
                  <div className="rh-panel-corner"  aria-hidden="true" />
                  <span className="rh-panel-num" aria-hidden="true">
                    {String((i % PANELS.length) + 1).padStart(2, "0")}
                  </span>
                  <div className="rh-panel-info">
                    <span className="rh-panel-label">{panel.label}</span>
                    <span className="rh-panel-tag">{panel.tag}</span>
                  </div>
                  <button
                    type="button"
                    className="rh-panel-register"
                    aria-label={`Register interest in ${panel.label}`}
                    onClick={(e) => { e.stopPropagation(); scrollTo("register"); }}
                    onKeyDown={(e) => e.stopPropagation()}
                    tabIndex={-1}
                  >
                    Register
                  </button>
                </div>
              ))}
            </div>
            <div className="rh-shimmer-sweep" ref={shimmerRef} aria-hidden="true" />
          </div>

          {/* ── TV Section ── */}
          <div className="rh-tv-section" ref={tvSectionRef}>
            <div className="rh-tv-container" ref={tvContainerRef}>
              <div className="rh-tv-screen">
                {tvVideoError ? (
                  <div
                    className="rh-tv-error"
                    role="status"
                    aria-label="Travel showcase video loading"
                  >
                    <span className="rh-tv-error__icon" aria-hidden="true">✈️</span>
                    <p className="rh-tv-error__title">Video loading…</p>
                    <p className="rh-tv-error__sub">Premium content will appear shortly</p>
                  </div>
                ) : (
                  <video
                    ref={tvVideoRef}
                    className="rh-tv-video"
                    autoPlay loop playsInline preload="auto"
                    muted={isTvMuted}
                    onPlay={()  => setIsTvPlaying(true)}
                    onPause={()  => setIsTvPlaying(false)}
                    onError={handleTvVideoError}
                    onCanPlay={handleTvVideoCanPlay}
                    aria-label="RASOAF Travels destination showcase"
                  >
                    <source src={TV_VIDEO} type="video/mp4" />
                  </video>
                )}

                <div className="rh-tv-glass" aria-hidden="true" />

                {!tvVideoError && (
                  <div className="rh-tv-controls">
                    <button
                      type="button"
                      className="rh-tv-control-btn"
                      onClick={toggleTvPlay}
                      aria-label={isTvPlaying ? "Pause showcase video" : "Play showcase video"}
                    >
                      {isTvPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                      type="button"
                      className="rh-tv-control-btn"
                      onClick={toggleTvMute}
                      aria-label={isTvMuted ? "Unmute showcase video" : "Mute showcase video"}
                    >
                      {isTvMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                )}

                <div className="rh-tv-badge" aria-hidden="true">✈️ WANDERLUST</div>
              </div>

              <div className="rh-tv-stand"     aria-hidden="true" />
              <div className="rh-tv-leg-left"  aria-hidden="true" />
              <div className="rh-tv-leg-right" aria-hidden="true" />
            </div>
          </div>

        </section>
      </div>
    </>
  );
}