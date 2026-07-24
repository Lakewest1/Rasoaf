// src/components/travel/TravelExperience.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Featured Experiences (v3.5)
// Black Gradient Background · Earth-shaped cards · White on hover · Scroll reveal
// GPU-accelerated · Mobile carousel · Premium dark design · Perfectly responsive
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo, useCallback, memo, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { 
  GraduationCap, Briefcase, Globe, Building2, Heart, Plane, 
  Star, Sparkles, Compass, ArrowUpRight, ChevronRight, ChevronLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const experiences = Object.freeze([
  { 
    id: "study-abroad", icon: GraduationCap, 
    title: "Study Abroad", 
    desc: "Pursue education in Canada, USA, UK, Australia, and Europe with expert guidance.", 
    route: "/travel/student-visa", color: "#667eea",
    glowColor: "rgba(102, 126, 234, 0.2)", stat: "95% Success"
  },
  { 
    id: "work-opportunities", icon: Briefcase, 
    title: "Work Opportunities", 
    desc: "Build your international career with professional work visa support and global connections.", 
    route: "/travel/work-visa", color: "#0D9488",
    glowColor: "rgba(13, 148, 136, 0.2)", stat: "92% Approval"
  },
  { 
    id: "tourism-leisure", icon: Globe, 
    title: "Tourism & Leisure", 
    desc: "Explore the world's most beautiful destinations with curated travel packages.", 
    route: "/travel/tourist-visa", color: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.2)", stat: "98% Rating"
  },
  { 
    id: "business-travel", icon: Building2, 
    title: "Business Travel", 
    desc: "Corporate travel solutions for meetings, conferences, and trade shows worldwide.", 
    route: "/travel/business-visa", color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.2)", stat: "94% Success"
  },
  { 
    id: "family-reunification", icon: Heart, 
    title: "Family Reunification", 
    desc: "Reunite with loved ones through our comprehensive family visa processing services.", 
    route: "/travel/family-visa", color: "#E11D48",
    glowColor: "rgba(225, 29, 72, 0.2)", stat: "88% Approval"
  },
  { 
    id: "flight-booking", icon: Plane, 
    title: "Flight Booking", 
    desc: "Best fares worldwide with major airlines for any travel purpose with 24/7 support.", 
    route: "/travel/flights", color: "#0284C7",
    glowColor: "rgba(2, 132, 199, 0.2)", stat: "Instant Booking"
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const TOKENS = {
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  white: "#FFFFFF", cream: "#FFFDF8",
  textDark: "#0A0F1A", textGrey: "#6B7280",
  textMuted: "rgba(255, 253, 248, 0.7)", textDim: "rgba(255, 253, 248, 0.45)",
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
};

function computeIconSize(width) {
  if (width < 375) return 20;
  if (width < 600) return 22;
  if (width < 768) return 24;
  if (width < 1024) return 24;
  return 26;
}

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to .rte-section
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rte-section,
  .rte-section *,
  .rte-section *::before,
  .rte-section *::after {
    box-sizing: border-box;
  }

  .rte-section {
    --rte-gold: ${TOKENS.gold}; --rte-gold-light: ${TOKENS.goldLight}; --rte-gold-dark: ${TOKENS.goldDark};
    --rte-white: ${TOKENS.white}; --rte-cream: ${TOKENS.cream};
    --rte-text-dark: ${TOKENS.textDark}; --rte-text-grey: ${TOKENS.textGrey};
    --rte-text-muted: ${TOKENS.textMuted}; --rte-text-dim: ${TOKENS.textDim};
    --rte-font-display: ${TOKENS.display}; --rte-font-body: ${TOKENS.body};
  }

  .rte-section {
    width: 100%; max-width: 100vw;
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 60px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    font-family: var(--rte-font-body);
    position: relative; overflow-x: clip; overflow-y: visible;
    isolation: isolate; contain: layout paint style;
  }

  .rte-section::before {
    content: ''; position: absolute; inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%);
    pointer-events: none; z-index: 0;
  }

  .rte-section::after {
    content: ''; position: absolute; inset: 0;
    background-image: 
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px; pointer-events: none; z-index: 0; opacity: 0.5;
  }

  .rte-container {
    max-width: 1400px; width: 100%; margin: 0 auto;
    padding: 0 clamp(16px, 3vw, 40px); position: relative; z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · RASOAF Typography                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-header {
    text-align: center; margin-bottom: clamp(48px, 8vh, 80px);
    display: flex; flex-direction: column; align-items: center; width: 100%;
  }

  .rte-header-decoration {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; gap: 16px; row-gap: 10px; margin-bottom: 24px; max-width: 100%;
  }

  .rte-header-line {
    width: clamp(16px, 6vw, 48px); height: 2px;
    background: linear-gradient(90deg, transparent, var(--rte-gold-light), var(--rte-gold));
    border-radius: 2px; flex-shrink: 0;
  }

  .rte-header-line:first-child {
    background: linear-gradient(90deg, var(--rte-gold), var(--rte-gold-light), transparent);
  }

  /* Badge: Inter 700 */
  .rte-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 24px;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 9999px;
    color: var(--rte-cream);
    font-family: var(--rte-font-body); font-size: clamp(10px, 0.8vw, 11.5px);
    font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    white-space: nowrap; transition: all 0.3s ease;
  }

  .rte-badge:hover {
    background: rgba(255, 255, 255, 0.1); border-color: rgba(212, 160, 23, 0.3);
    transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  .rte-badge-icon { animation: rte-icon-pulse 2s ease-in-out infinite; color: var(--rte-gold-light); }

  @keyframes rte-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }

  /* Title: Manrope 800 */
  .rte-title {
    font-family: var(--rte-font-display); font-weight: 800;
    font-size: clamp(32px, 4.5vw, 52px); letter-spacing: -0.03em;
    line-height: 1.12; color: var(--rte-cream);
    margin-bottom: 16px; text-align: center;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    overflow-wrap: break-word; max-width: 100%;
  }

  .rte-title-gradient {
    background: linear-gradient(135deg, var(--rte-gold-light) 0%, var(--rte-gold) 40%, var(--rte-gold-dark) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Subtitle: Inter 400 */
  .rte-subtitle {
    font-family: var(--rte-font-body); font-size: clamp(14px, 1.2vw, 16px);
    font-weight: 400; color: var(--rte-text-muted); line-height: 1.7;
    max-width: 540px; margin: 0 auto; letter-spacing: 0.005em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); overflow-wrap: break-word;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP/TABLET GRID                                                  */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-grid-wrapper {
    width: 100%; display: flex; justify-content: center; align-items: center;
    padding: clamp(20px, 3vw, 40px) 0;
  }

  .rte-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: clamp(32px, 5vw, 64px) clamp(24px, 3vw, 40px);
    width: 100%; max-width: 1100px; margin: 0 auto;
    justify-items: center; align-items: start;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL                                                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-carousel {
    display: none; position: relative; width: 100%; max-width: 420px;
    margin: 0 auto; overflow: hidden; touch-action: pan-y;
    user-select: none; -webkit-user-select: none; padding: 20px 0;
  }

  .rte-carousel-track {
    display: flex; will-change: transform; backface-visibility: hidden;
    transform: translate3d(0, 0, 0); align-items: center;
  }

  .rte-carousel-slide {
    flex: 0 0 100%; min-width: 0; padding: 20px 24px;
    display: flex; justify-content: center; align-items: center;
  }

  .rte-carousel-arrow {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 5;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(11, 15, 23, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 160, 23, 0.25); color: var(--rte-cream);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease; outline: none; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .rte-carousel-arrow:hover {
    background: rgba(212, 160, 23, 0.2); border-color: var(--rte-gold-light);
    box-shadow: 0 6px 24px rgba(212, 160, 23, 0.2);
  }

  .rte-carousel-arrow:focus-visible {
    outline: 2px solid var(--rte-gold-light); outline-offset: 2px;
  }

  .rte-carousel-arrow.prev { left: 0; }
  .rte-carousel-arrow.next { right: 0; }

  .rte-carousel-dots {
    display: flex; justify-content: center; align-items: center;
    gap: 10px; margin-top: 28px; padding: 8px 0;
  }

  .rte-carousel-dot {
    position: relative; width: 10px; height: 10px; border-radius: 50%;
    border: none; background: rgba(255, 255, 255, 0.2);
    cursor: pointer; padding: 0;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); outline: none;
  }

  .rte-carousel-dot::before { content: ''; position: absolute; inset: -8px; }

  .rte-carousel-dot:hover { background: rgba(255, 255, 255, 0.35); }

  .rte-carousel-dot-active {
    width: 32px; border-radius: 5px;
    background: linear-gradient(135deg, var(--rte-gold-light), var(--rte-gold));
    box-shadow: 0 0 16px rgba(212, 160, 23, 0.4);
  }

  .rte-carousel-dot:focus-visible {
    outline: 2px solid var(--rte-gold-light); outline-offset: 3px;
  }

  .rte-swipe-indicator {
    text-align: center; color: rgba(255, 255, 255, 0.25);
    font-family: var(--rte-font-body); font-size: 10px;
    font-weight: 500; letter-spacing: 0.08em; margin-top: 12px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* EARTH-SHAPED CARD · Dark → White on Hover                            */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-earth-wrapper {
    position: relative; width: 100%; max-width: 320px;
    aspect-ratio: 1; perspective: 1000px; margin: 0 auto;
  }

  .rte-earth-orbit {
    position: absolute; inset: -12px; border-radius: 50%;
    border: 2px solid rgba(212, 160, 23, 0.1);
    animation: rte-orbit-rotate 20s linear infinite; pointer-events: none;
  }

  .rte-earth-orbit::before {
    content: ''; position: absolute; top: -3px; left: 50%;
    width: 6px; height: 6px; background: var(--rte-gold-light); border-radius: 50%;
    box-shadow: 0 0 16px var(--rte-gold-light), 0 0 32px rgba(212, 160, 23, 0.5);
  }

  @keyframes rte-orbit-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .rte-earth-glow {
    position: absolute; inset: -20px; border-radius: 50%;
    opacity: 0; transition: all 0.6s ease; pointer-events: none; filter: blur(20px);
  }

  .rte-earth-wrapper:hover .rte-earth-glow {
    opacity: 0.7; animation: rte-glow-pulse 2s ease-in-out infinite;
  }

  @keyframes rte-glow-pulse {
    0%, 100% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.08); opacity: 0.8; }
  }

  .rte-earth-card {
    position: relative; width: 100%; height: 100%; border-radius: 50%;
    background: linear-gradient(145deg, #1A2332 0%, #0F1A2E 100%);
    cursor: pointer; transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 0 80px rgba(255, 255, 255, 0.03);
    overflow: hidden; isolation: isolate; outline: none;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: clamp(24px, 8%, 36px);
  }

  .rte-earth-card:hover {
    background: var(--rte-white); transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 160, 23, 0.2), 0 0 40px rgba(212, 160, 23, 0.08);
  }

  .rte-earth-card:active { transform: translateY(-4px) scale(1.01); }

  .rte-earth-card:focus-visible {
    outline: 3px solid var(--rte-gold); outline-offset: 6px;
  }

  .rte-earth-card::before {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: 
      radial-gradient(circle at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(255,255,255,0.03) 0%, transparent 50%),
      radial-gradient(circle at 50% 30%, rgba(0,0,0,0.15) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.5s ease; pointer-events: none; z-index: 0;
  }

  .rte-earth-card:hover::before { opacity: 0; }

  .rte-earth-card::after {
    content: ''; position: absolute; inset: -3px; border-radius: 50%; padding: 3px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.4), transparent 30%, transparent 70%, rgba(212, 160, 23, 0.25));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    opacity: 0; transition: opacity 0.5s ease; pointer-events: none; z-index: 1;
  }

  .rte-earth-card:hover::after { opacity: 1; }

  .rte-earth-content {
    position: relative; z-index: 2; display: flex; flex-direction: column;
    align-items: center; gap: clamp(8px, 1.5vh, 14px); width: 100%;
  }

  .rte-earth-icon-ring {
    position: relative; width: clamp(48px, 8vw, 64px); height: clamp(48px, 8vw, 64px);
    border-radius: 50%; background: rgba(255, 255, 255, 0.04);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.5s ease; flex-shrink: 0;
  }

  .rte-earth-card:hover .rte-earth-icon-ring { background: rgba(0, 0, 0, 0.03); }

  .rte-earth-icon-ring::before {
    content: ''; position: absolute; inset: -6px; border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.12);
    animation: rte-icon-orbit 8s linear infinite; transition: border-color 0.5s ease;
  }

  @keyframes rte-icon-orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .rte-earth-card:hover .rte-earth-icon-ring { transform: scale(1.1); }

  .rte-earth-card:hover .rte-earth-icon-ring::before {
    border-color: rgba(212, 160, 23, 0.4); animation-duration: 4s;
  }

  .rte-earth-icon { position: relative; z-index: 1; transition: all 0.4s ease; }

  .rte-earth-card:hover .rte-earth-icon { transform: rotate(-10deg) scale(1.1); }

  /* Title: Manrope 800 */
  .rte-earth-title {
    font-family: var(--rte-font-display); font-weight: 800;
    font-size: clamp(1rem, 1.8vw, 1.2rem); color: var(--rte-cream);
    letter-spacing: -0.02em; line-height: 1.2; transition: all 0.4s ease;
    margin: 0; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    word-wrap: break-word; max-width: 100%;
  }

  .rte-earth-card:hover .rte-earth-title {
    color: var(--rte-text-dark); text-shadow: none;
    background: linear-gradient(135deg, var(--rte-text-dark) 0%, var(--rte-gold-dark) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Description: Inter 400 */
  .rte-earth-desc {
    font-family: var(--rte-font-body); font-size: clamp(0.7rem, 1vw, 0.82rem);
    font-weight: 400; color: var(--rte-text-dim); line-height: 1.5;
    transition: color 0.4s ease; margin: 0; max-width: 85%;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden; word-wrap: break-word;
  }

  .rte-earth-card:hover .rte-earth-desc { color: var(--rte-text-grey); }

  /* Stat badge: Inter 700 */
  .rte-earth-stat {
    font-family: var(--rte-font-body); font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em; transition: all 0.4s ease;
    padding: 4px 14px; border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05); color: var(--rte-text-dim);
    display: flex; align-items: center; gap: 4px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .rte-earth-card:hover .rte-earth-stat {
    background: rgba(212, 160, 23, 0.08); color: var(--rte-gold-dark);
    border-color: rgba(212, 160, 23, 0.2);
  }

  .rte-earth-arrow {
    position: absolute; top: 16px; right: 16px; opacity: 0;
    transform: translate(10px, -10px);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 3;
  }

  .rte-earth-card:hover .rte-earth-arrow { opacity: 1; transform: translate(0, 0); }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS                                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  /* Desktop: Show Grid */
  @media (min-width: 769px) {
    .rte-grid-wrapper { display: flex; }
    .rte-carousel { display: none; }
  }

  @media (min-width: 1920px) {
    .rte-container { max-width: 1600px; }
    .rte-grid { max-width: 1300px; gap: 48px 36px; }
    .rte-earth-wrapper { max-width: 360px; }
  }

  @media (min-width: 1440px) and (max-width: 1919px) {
    .rte-container { max-width: 1500px; }
    .rte-grid { max-width: 1200px; gap: 44px 32px; }
    .rte-earth-wrapper { max-width: 340px; }
  }

  @media (max-width: 1200px) {
    .rte-grid { max-width: 960px; gap: 28px 20px; }
    .rte-earth-wrapper { max-width: 280px; }
  }

  @media (max-width: 1023px) {
    .rte-grid { grid-template-columns: repeat(2, 1fr); max-width: 640px; gap: 32px 24px; }
    .rte-earth-wrapper { max-width: 300px; }
    .rte-earth-orbit { inset: -8px; }
  }

  @media (max-width: 768px) {
    .rte-section { padding: clamp(50px, 7vh, 70px) 20px; }
    .rte-grid-wrapper { display: none; }
    .rte-carousel { display: block; }
    .rte-title { font-size: clamp(28px, 5.5vw, 38px); }
    .rte-header { margin-bottom: clamp(32px, 5vh, 48px); }
  }

  @media (max-width: 480px) {
    .rte-section { padding: clamp(36px, 5vh, 52px) 16px; }
    .rte-carousel { max-width: 400px; }
    .rte-earth-wrapper { max-width: 320px; }
    .rte-carousel-slide { padding: 16px 16px; }
  }

  @media (max-width: 374px) {
    .rte-section { padding: 28px 12px; }
    .rte-carousel { max-width: 320px; }
    .rte-earth-wrapper { max-width: 270px; }
    .rte-earth-card { padding: clamp(16px, 6%, 22px); }
    .rte-carousel-slide { padding: 10px 10px; }
    .rte-carousel-arrow { width: 36px; height: 36px; }
    .rte-earth-orbit { display: none; }
    .rte-header-decoration { gap: 8px; }
    .rte-header-line { width: 16px; }
    .rte-badge { padding: 6px 14px; font-size: 9px; gap: 6px; }
    .rte-title { font-size: 1.4rem; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* TOUCH DEVICES                                                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (hover: none) and (pointer: coarse) {
    .rte-earth-card { cursor: default; }
    .rte-earth-card:hover { 
      transform: none; background: linear-gradient(145deg, #1A2332 0%, #0F1A2E 100%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 0 80px rgba(255, 255, 255, 0.03);
    }
    .rte-earth-card:active { 
      transform: scale(0.97); transition: transform 0.15s ease; background: var(--rte-white);
    }
    .rte-earth-card:active .rte-earth-title { color: var(--rte-text-dark); text-shadow: none; }
    .rte-earth-card:active .rte-earth-desc { color: var(--rte-text-grey); }
    .rte-earth-card:active .rte-earth-stat { background: rgba(212, 160, 23, 0.08); color: var(--rte-gold-dark); border-color: rgba(212, 160, 23, 0.2); }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .rte-section, .rte-section *, .rte-section *::before, .rte-section *::after {
      animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important;
    }
    .rte-earth-card:hover { transform: none !important; }
    .rte-earth-card:hover .rte-earth-icon { transform: none !important; }
    .rte-earth-card:hover .rte-earth-icon-ring { transform: none !important; }
    .rte-earth-orbit { display: none !important; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HIGH CONTRAST & PRINT                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (forced-colors: active) {
    .rte-earth-card { border: 3px solid CanvasText; }
    .rte-earth-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .rte-section { padding: 20px; background: #0A1628 !important; }
    .rte-carousel { display: none !important; }
    .rte-grid-wrapper { display: flex !important; }
    .rte-grid { display: grid !important; }
    .rte-earth-card { box-shadow: none !important; border: 2px solid #333 !important; }
    .rte-earth-orbit, .rte-earth-glow { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Earth Card Component
// ══════════════════════════════════════════════════════════════════════════
const EarthCard = memo(({ experience, index, isCarousel = false, onClick, iconSize = 26 }) => {
  const Icon = experience.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
  }, [onClick]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 80, scale: 0.85, filter: "blur(10px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] },
    },
  }), [index]);

  const cardContent = (
    <div className="rte-earth-wrapper">
      <div className="rte-earth-orbit" aria-hidden="true" />
      <div className="rte-earth-glow" style={{ background: experience.glowColor }} aria-hidden="true" />
      <div className="rte-earth-card">
        <div className="rte-earth-arrow"><ArrowUpRight size={20} color={experience.color} /></div>
        <div className="rte-earth-content">
          <div className="rte-earth-icon-ring" style={{ background: experience.glowColor }}>
            <div className="rte-earth-icon"><Icon size={iconSize} color={experience.color} strokeWidth={1.8} /></div>
          </div>
          <h3 className="rte-earth-title">{experience.title}</h3>
          <p className="rte-earth-desc">{experience.desc}</p>
          <span className="rte-earth-stat"><Star size={10} aria-hidden="true" />{experience.stat}</span>
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <motion.div onClick={onClick} onKeyDown={handleKeyDown} role="article"
        aria-label={`${experience.title} - ${experience.stat}`} tabIndex={0}
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}>
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div ref={cardRef} onClick={onClick} onKeyDown={handleKeyDown}
      variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
      role="article" aria-label={`${experience.title} - ${experience.stat}`} tabIndex={0}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -8 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {cardContent}
    </motion.div>
  );
});

EarthCard.displayName = "EarthCard";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel Component
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(({ items, onCardClick, iconSize }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % items.length), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, items.length]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const prev = useCallback(() => setCurrent((prev) => (prev - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((prev) => (prev + 1) % items.length), [items.length]);
  const handleManualNav = useCallback((index) => { setCurrent(index); startTimer(); }, [startTimer]);

  const handleTouchStart = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const handleTouchMove = useCallback((e) => { setTouchEnd(e.touches[0].clientX); }, []);
  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > SWIPE_THRESHOLD) next();
    else if (distance < -SWIPE_THRESHOLD) prev();
    setTouchStart(null); setTouchEnd(null); startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, startTimer]);

  return (
    <div className="rte-carousel" role="region" aria-label="Featured experiences carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="sr-only" role="status" aria-live="polite">
        Experience {current + 1} of {items.length}: {items[current].title}
      </div>
      <motion.div className="rte-carousel-track" animate={{ x: `${-current * 100}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 250, damping: 35 }}>
        {items.map((item, idx) => (
          <div key={item.id} className="rte-carousel-slide">
            <EarthCard experience={item} index={idx} isCarousel={true} onClick={() => onCardClick(item.route)} iconSize={iconSize} />
          </div>
        ))}
      </motion.div>
      <button className="rte-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous" type="button"><ChevronLeft size={20} /></button>
      <button className="rte-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next" type="button"><ChevronRight size={20} /></button>
      <div className="rte-carousel-dots" role="tablist" aria-label="Experience navigation">
        {items.map((item, i) => (
          <button key={item.id} className={`rte-carousel-dot${i === current ? " rte-carousel-dot-active" : ""}`}
            onClick={() => handleManualNav(i)} role="tab" aria-selected={i === current}
            aria-label={`${item.title} - ${item.stat}`} type="button" />
        ))}
      </div>
      <div className="rte-swipe-indicator" aria-hidden="true">← Swipe to navigate →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
});

MobileCarousel.displayName = "MobileCarousel";

// ══════════════════════════════════════════════════════════════════════════
// Main TravelExperience Component
// ══════════════════════════════════════════════════════════════════════════
const TravelExperience = memo(function TravelExperience() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const [iconSize, setIconSize] = useState(() =>
    computeIconSize(typeof window !== "undefined" ? window.innerWidth : 1280)
  );

  useEffect(() => {
    const handleResize = () => setIconSize(computeIconSize(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = useCallback((route) => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate, prefersReducedMotion]);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  }), []);

  return (
    <>
      <style>{STYLES}</style>
      <section className="rte-section" aria-label="Featured travel experiences">
        <div className="rte-container">
          <motion.div ref={headerRef} className="rte-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="rte-header-decoration">
              <div className="rte-header-line" aria-hidden="true" />
              <span className="rte-badge">
                <Compass size={12} className="rte-badge-icon" aria-hidden="true" />Curated Experiences<Sparkles size={12} className="rte-badge-icon" aria-hidden="true" />
              </span>
              <div className="rte-header-line" aria-hidden="true" />
            </div>
            <h2 className="rte-title">Featured <span className="rte-title-gradient">Experiences</span></h2>
            <p className="rte-subtitle">Tailored travel solutions for every purpose and destination, crafted with precision and delivered with excellence.</p>
          </motion.div>
          <div className="rte-grid-wrapper">
            <div className="rte-grid" role="list" aria-label="Experience cards">
              {experiences.map((exp, idx) => (
                <EarthCard key={exp.id} experience={exp} index={idx} onClick={() => handleCardClick(exp.route)} iconSize={iconSize} />
              ))}
            </div>
          </div>
          <MobileCarousel items={experiences} onCardClick={handleCardClick} iconSize={iconSize} />
        </div>
      </section>
    </>
  );
});

TravelExperience.displayName = "TravelExperience";

export default TravelExperience;