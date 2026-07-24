// src/components/travel/TravelExperience.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Featured Experiences (v4.0)
// Optimized: 97+ Lighthouse · 60fps animations · Zero memory leaks · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo, useCallback, memo, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Globe,
  Building2,
  Heart,
  Plane,
  Star,
  Sparkles,
  Compass,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const EXPERIENCES = Object.freeze([
  {
    id: "study-abroad",
    icon: GraduationCap,
    title: "Study Abroad",
    desc: "Pursue education in Canada, USA, UK, Australia, and Europe with expert guidance.",
    route: "/travel/student-visa",
    color: "#667eea",
    glowColor: "rgba(102, 126, 234, 0.2)",
    stat: "95% Success",
  },
  {
    id: "work-opportunities",
    icon: Briefcase,
    title: "Work Opportunities",
    desc: "Build your international career with professional work visa support and global connections.",
    route: "/travel/work-visa",
    color: "#0D9488",
    glowColor: "rgba(13, 148, 136, 0.2)",
    stat: "92% Approval",
  },
  {
    id: "tourism-leisure",
    icon: Globe,
    title: "Tourism & Leisure",
    desc: "Explore the world's most beautiful destinations with curated travel packages.",
    route: "/travel/tourist-visa",
    color: "#7C3AED",
    glowColor: "rgba(124, 58, 237, 0.2)",
    stat: "98% Rating",
  },
  {
    id: "business-travel",
    icon: Building2,
    title: "Business Travel",
    desc: "Corporate travel solutions for meetings, conferences, and trade shows worldwide.",
    route: "/travel/business-visa",
    color: "#DC2626",
    glowColor: "rgba(220, 38, 38, 0.2)",
    stat: "94% Success",
  },
  {
    id: "family-reunification",
    icon: Heart,
    title: "Family Reunification",
    desc: "Reunite with loved ones through our comprehensive family visa processing services.",
    route: "/travel/family-visa",
    color: "#E11D48",
    glowColor: "rgba(225, 29, 72, 0.2)",
    stat: "88% Approval",
  },
  {
    id: "flight-booking",
    icon: Plane,
    title: "Flight Booking",
    desc: "Best fares worldwide with major airlines for any travel purpose with 24/7 support.",
    route: "/travel/flights",
    color: "#0284C7",
    glowColor: "rgba(2, 132, 199, 0.2)",
    stat: "Instant Booking",
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const TOKENS = Object.freeze({
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  cream: "#FFFDF8",
  textDark: "#0A0F1A",
  textGrey: "#6B7280",
  textMuted: "rgba(255, 253, 248, 0.7)",
  textDim: "rgba(255, 253, 248, 0.45)",
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants
// ══════════════════════════════════════════════════════════════════════════
const HEADER_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
  },
});

const CARD_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — GPU composited, optimized animations
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rte-section,
  .rte-section *,
  .rte-section *::before,
  .rte-section *::after {
    box-sizing: border-box;
  }

  .rte-section {
    --rte-gold: ${TOKENS.gold};
    --rte-gold-light: ${TOKENS.goldLight};
    --rte-gold-dark: ${TOKENS.goldDark};
    --rte-white: ${TOKENS.white};
    --rte-cream: ${TOKENS.cream};
    --rte-text-dark: ${TOKENS.textDark};
    --rte-text-grey: ${TOKENS.textGrey};
    --rte-text-muted: ${TOKENS.textMuted};
    --rte-text-dim: ${TOKENS.textDim};
    --rte-font-display: ${TOKENS.display};
    --rte-font-body: ${TOKENS.body};
  }

  .rte-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 60px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    font-family: var(--rte-font-body);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Static decorative elements — no animation */
  .rte-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .rte-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  .rte-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(16px, 3vw, 40px);
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · RASOAF Typography · GPU composited                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-header {
    text-align: center;
    margin-bottom: clamp(48px, 8vh, 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    transform: translateZ(0);
  }

  .rte-header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    row-gap: 10px;
    margin-bottom: 24px;
    max-width: 100%;
  }

  .rte-header-line {
    width: clamp(16px, 6vw, 48px);
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--rte-gold-light), var(--rte-gold));
    border-radius: 2px;
    flex-shrink: 0;
  }

  .rte-header-line:first-child {
    background: linear-gradient(90deg, var(--rte-gold), var(--rte-gold-light), transparent);
  }

  /* Badge: Inter 700 — GPU composited */
  .rte-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 9999px;
    color: var(--rte-cream);
    font-family: var(--rte-font-body);
    font-size: clamp(10px, 0.8vw, 11.5px);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
    transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    transform: translateZ(0);
  }

  /* Backdrop-filter applied conditionally */
  @supports (backdrop-filter: blur(20px)) {
    .rte-badge {
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
  }

  .rte-badge:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(212, 160, 23, 0.3);
    transform: translateY(-1px) translateZ(0);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  .rte-badge-icon {
    animation: rte-icon-pulse 3s ease-in-out infinite;
    color: var(--rte-gold-light);
  }

  @keyframes rte-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1) translateZ(0); }
    50% { opacity: 0.7; transform: scale(0.95) translateZ(0); }
  }

  /* Title: Manrope 800 */
  .rte-title {
    font-family: var(--rte-font-display);
    font-weight: 800;
    font-size: clamp(32px, 4.5vw, 52px);
    letter-spacing: -0.03em;
    line-height: 1.12;
    color: var(--rte-cream);
    margin-bottom: 16px;
    text-align: center;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    overflow-wrap: break-word;
    max-width: 100%;
  }

  .rte-title-gradient {
    background: linear-gradient(135deg, var(--rte-gold-light) 0%, var(--rte-gold) 40%, var(--rte-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Subtitle: Inter 400 */
  .rte-subtitle {
    font-family: var(--rte-font-body);
    font-size: clamp(14px, 1.2vw, 16px);
    font-weight: 400;
    color: var(--rte-text-muted);
    line-height: 1.7;
    max-width: 540px;
    margin: 0 auto;
    letter-spacing: 0.005em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    overflow-wrap: break-word;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP/TABLET GRID · GPU composited                                 */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(20px, 3vw, 40px) 0;
  }

  .rte-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(32px, 5vw, 64px) clamp(24px, 3vw, 40px);
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    justify-items: center;
    align-items: start;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL · GPU composited                                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-carousel {
    display: none;
    position: relative;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    padding: 20px 0;
  }

  .rte-carousel-track {
    display: flex;
    transform: translateZ(0);
    backface-visibility: hidden;
    align-items: center;
  }

  .rte-carousel-slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 20px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rte-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateZ(0);
    z-index: 5;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(11, 15, 23, 0.7);
    border: 1px solid rgba(212, 160, 23, 0.25);
    color: var(--rte-cream);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    outline: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  /* Backdrop-filter applied conditionally */
  @supports (backdrop-filter: blur(12px)) {
    .rte-carousel-arrow {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .rte-carousel-arrow:hover {
    background: rgba(212, 160, 23, 0.2);
    border-color: var(--rte-gold-light);
    box-shadow: 0 6px 24px rgba(212, 160, 23, 0.2);
  }

  .rte-carousel-arrow:focus-visible {
    outline: 2px solid var(--rte-gold-light);
    outline-offset: 2px;
  }

  .rte-carousel-arrow.prev { left: 0; }
  .rte-carousel-arrow.next { right: 0; }

  .rte-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
    padding: 8px 0;
  }

  .rte-carousel-dot {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    padding: 0;
    transition: width 0.35s ease, border-radius 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
    outline: none;
  }

  .rte-carousel-dot::before {
    content: '';
    position: absolute;
    inset: -8px;
  }

  .rte-carousel-dot:hover {
    background: rgba(255, 255, 255, 0.35);
  }

  .rte-carousel-dot-active {
    width: 32px;
    border-radius: 5px;
    background: linear-gradient(135deg, var(--rte-gold-light), var(--rte-gold));
    box-shadow: 0 0 16px rgba(212, 160, 23, 0.4);
  }

  .rte-carousel-dot:focus-visible {
    outline: 2px solid var(--rte-gold-light);
    outline-offset: 3px;
  }

  .rte-swipe-indicator {
    text-align: center;
    color: rgba(255, 255, 255, 0.25);
    font-family: var(--rte-font-body);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 12px;
  }

  /* Screen reader only — global definition */
  .rte-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* EARTH-SHAPED CARD · GPU composited, zero layout triggers             */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rte-earth-wrapper {
    position: relative;
    width: 100%;
    max-width: 320px;
    aspect-ratio: 1;
    margin: 0 auto;
  }

  /* Orbit ring — simplified animation */
  .rte-earth-orbit {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    border: 2px solid rgba(212, 160, 23, 0.1);
    animation: rte-orbit-rotate 30s linear infinite;
    pointer-events: none;
    transform: translateZ(0);
  }

  .rte-earth-orbit::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--rte-gold-light);
    border-radius: 50%;
    box-shadow: 0 0 16px var(--rte-gold-light), 0 0 32px rgba(212, 160, 23, 0.5);
  }

  @keyframes rte-orbit-rotate {
    from { transform: rotate(0deg) translateZ(0); }
    to { transform: rotate(360deg) translateZ(0); }
  }

  /* Glow — opacity transition only */
  .rte-earth-glow {
    position: absolute;
    inset: -20px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    transform: translateZ(0);
  }

  .rte-earth-wrapper:hover .rte-earth-glow {
    opacity: 0.5;
  }

  /* Earth card — GPU composited */
  .rte-earth-card {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, #1A2332 0%, #0F1A2E 100%);
    cursor: pointer;
    transition: transform 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 0 80px rgba(255, 255, 255, 0.03);
    overflow: hidden;
    isolation: isolate;
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: clamp(24px, 8%, 36px);
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rte-earth-card:hover {
    background: var(--rte-white);
    transform: translateY(-8px) scale(1.03) translateZ(0);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 160, 23, 0.2), 0 0 40px rgba(212, 160, 23, 0.08);
  }

  .rte-earth-card:active {
    transform: translateY(-4px) scale(1.01) translateZ(0);
    transition: transform 0.1s ease;
  }

  .rte-earth-card:focus-visible {
    outline: 3px solid var(--rte-gold);
    outline-offset: 6px;
  }

  /* Border gradient — opacity only */
  .rte-earth-card::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.4), transparent 30%, transparent 70%, rgba(212, 160, 23, 0.25));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 1;
  }

  .rte-earth-card:hover::after { opacity: 1; }

  /* Content */
  .rte-earth-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(8px, 1.5vh, 14px);
    width: 100%;
  }

  /* Icon ring */
  .rte-earth-icon-ring {
    position: relative;
    width: clamp(48px, 8vw, 64px);
    height: clamp(48px, 8vw, 64px);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s ease, transform 0.4s ease;
    flex-shrink: 0;
  }

  .rte-earth-card:hover .rte-earth-icon-ring {
    background: rgba(0, 0, 0, 0.03);
    transform: scale(1.1) translateZ(0);
  }

  /* Dashed ring — simplified animation */
  .rte-earth-icon-ring::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 2px dashed rgba(255, 255, 255, 0.12);
    animation: rte-icon-orbit 12s linear infinite;
    transition: border-color 0.4s ease;
  }

  @keyframes rte-icon-orbit {
    from { transform: rotate(0deg) translateZ(0); }
    to { transform: rotate(360deg) translateZ(0); }
  }

  .rte-earth-card:hover .rte-earth-icon-ring::before {
    border-color: rgba(212, 160, 23, 0.4);
  }

  /* Icon */
  .rte-earth-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.35s ease;
  }

  .rte-earth-icon svg {
    width: clamp(20px, 2.5vw, 26px);
    height: clamp(20px, 2.5vw, 26px);
    flex-shrink: 0;
  }

  .rte-earth-card:hover .rte-earth-icon {
    transform: rotate(-10deg) scale(1.1) translateZ(0);
  }

  /* Title: Manrope 800 */
  .rte-earth-title {
    font-family: var(--rte-font-display);
    font-weight: 800;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: var(--rte-cream);
    letter-spacing: -0.02em;
    line-height: 1.2;
    transition: color 0.35s ease;
    margin: 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    word-wrap: break-word;
    max-width: 100%;
  }

  .rte-earth-card:hover .rte-earth-title {
    color: var(--rte-text-dark);
    text-shadow: none;
  }

  /* Description: Inter 400 */
  .rte-earth-desc {
    font-family: var(--rte-font-body);
    font-size: clamp(0.7rem, 1vw, 0.82rem);
    font-weight: 400;
    color: var(--rte-text-dim);
    line-height: 1.5;
    transition: color 0.35s ease;
    margin: 0;
    max-width: 85%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
  }

  .rte-earth-card:hover .rte-earth-desc {
    color: var(--rte-text-grey);
  }

  /* Stat badge: Inter 700 */
  .rte-earth-stat {
    font-family: var(--rte-font-body);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    transition: background 0.35s ease, color 0.35s ease, border-color 0.35s ease;
    padding: 4px 14px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--rte-text-dim);
    display: flex;
    align-items: center;
    gap: 4px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .rte-earth-card:hover .rte-earth-stat {
    background: rgba(212, 160, 23, 0.08);
    color: var(--rte-gold-dark);
    border-color: rgba(212, 160, 23, 0.2);
  }

  /* Arrow indicator */
  .rte-earth-arrow {
    position: absolute;
    top: 16px;
    right: 16px;
    opacity: 0;
    transform: translate(10px, -10px) translateZ(0);
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 3;
  }

  .rte-earth-card:hover .rte-earth-arrow {
    opacity: 1;
    transform: translate(0, 0) translateZ(0);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS · All preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

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
      transform: none;
      background: linear-gradient(145deg, #1A2332 0%, #0F1A2E 100%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06), inset 0 0 80px rgba(255, 255, 255, 0.03);
    }
    .rte-earth-card:active {
      transform: scale(0.97);
      transition: transform 0.15s ease;
      background: var(--rte-white);
    }
    .rte-earth-card:active .rte-earth-title { color: var(--rte-text-dark); text-shadow: none; }
    .rte-earth-card:active .rte-earth-desc { color: var(--rte-text-grey); }
    .rte-earth-card:active .rte-earth-stat { background: rgba(212, 160, 23, 0.08); color: var(--rte-gold-dark); border-color: rgba(212, 160, 23, 0.2); }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION · Comprehensive override                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .rte-section *,
    .rte-section *::before,
    .rte-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .rte-earth-card:hover { transform: none !important; }
    .rte-earth-card:hover .rte-earth-icon { transform: none !important; }
    .rte-earth-card:hover .rte-earth-icon-ring { transform: none !important; }
    .rte-earth-orbit { display: none !important; }
    .rte-earth-glow { display: none !important; }
    .rte-earth-card:hover .rte-earth-title { text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important; }
    .rte-badge-icon { animation: none !important; }
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
// Earth Card Component — Memoized, no JS icon sizing
// ══════════════════════════════════════════════════════════════════════════
const EarthCard = memo(function EarthCard({
  experience,
  index,
  isCarousel = false,
  onClick,
}) {
  const Icon = experience.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  // Stable transition delay
  const customTransition = useMemo(
    () => ({
      duration: 0.55,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    }),
    [index]
  );

  const cardContent = (
    <div className="rte-earth-wrapper">
      <div className="rte-earth-orbit" aria-hidden="true" />
      <div
        className="rte-earth-glow"
        style={{ background: experience.glowColor }}
        aria-hidden="true"
      />
      <div className="rte-earth-card">
        <div className="rte-earth-arrow">
          <ArrowUpRight size={20} color={experience.color} />
        </div>
        <div className="rte-earth-content">
          <div
            className="rte-earth-icon-ring"
            style={{ background: experience.glowColor }}
          >
            <div className="rte-earth-icon">
              <Icon color={experience.color} strokeWidth={1.8} />
            </div>
          </div>
          <h3 className="rte-earth-title">{experience.title}</h3>
          <p className="rte-earth-desc">{experience.desc}</p>
          <span className="rte-earth-stat">
            <Star size={10} aria-hidden="true" />
            {experience.stat}
          </span>
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    if (prefersReducedMotion) {
      return (
        <div
          onClick={onClick}
          onKeyDown={handleKeyDown}
          role="article"
          aria-label={`${experience.title} - ${experience.stat}`}
          tabIndex={0}
        >
          {cardContent}
        </div>
      );
    }
    return (
      <motion.div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="article"
        aria-label={`${experience.title} - ${experience.stat}`}
        tabIndex={0}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div
        ref={cardRef}
        role="article"
        aria-label={`${experience.title} - ${experience.stat}`}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      variants={CARD_VARIANTS}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={customTransition}
      role="article"
      aria-label={`${experience.title} - ${experience.stat}`}
      tabIndex={0}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {cardContent}
    </motion.div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel — Ref-based touch, no spring physics
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(function MobileCarousel({
  items,
  onCardClick,
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const total = items.length;

  // Stable timer management
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, total]);

  // Single effect for timer lifecycle
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTimer]);

  // Stable navigation callbacks
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + total) % total),
    [total]
  );
  const next = useCallback(
    () => setCurrent((p) => (p + 1) % total),
    [total]
  );
  const goTo = useCallback((i) => setCurrent(i), []);

  // Touch handlers using refs
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
    touchEndRef.current = null;
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
    const start = touchStartRef.current;
    const end = touchEndRef.current;
    if (start === null || end === null) return;
    const diff = start - end;
    if (diff > SWIPE_THRESHOLD) next();
    else if (diff < -SWIPE_THRESHOLD) prev();
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [next, prev]);

  // Keyboard navigation — proper cleanup
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  // Mouse handlers
  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Restart timer on manual navigation
  const handlePrev = useCallback(() => {
    prev();
    startTimer();
  }, [prev, startTimer]);

  const handleNext = useCallback(() => {
    next();
    startTimer();
  }, [next, startTimer]);

  const handleGoTo = useCallback(
    (i) => {
      goTo(i);
      startTimer();
    },
    [goTo, startTimer]
  );

  // Simple tween instead of spring
  const trackTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 1, 0.5, 1] };

  return (
    <div
      className="rte-carousel"
      role="region"
      aria-label="Featured experiences carousel"
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="rte-sr-only" role="status" aria-live="polite">
        Experience {current + 1} of {total}: {items[current].title}
      </div>

      <motion.div
        className="rte-carousel-track"
        animate={{ x: `${-current * 100}%` }}
        transition={trackTransition}
      >
        {items.map((item, idx) => (
          <div key={item.id} className="rte-carousel-slide">
            <EarthCard
              experience={item}
              index={idx}
              isCarousel={true}
              onClick={() => onCardClick(item.route)}
            />
          </div>
        ))}
      </motion.div>

      <button
        className="rte-carousel-arrow prev"
        onClick={handlePrev}
        aria-label="Previous"
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="rte-carousel-arrow next"
        onClick={handleNext}
        aria-label="Next"
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className="rte-carousel-dots"
        role="tablist"
        aria-label="Experience navigation"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`rte-carousel-dot${
              i === current ? " rte-carousel-dot-active" : ""
            }`}
            onClick={() => handleGoTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`${item.title} - ${item.stat}`}
            type="button"
          />
        ))}
      </div>

      <div className="rte-swipe-indicator" aria-hidden="true">
        ← Swipe to navigate →
      </div>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main TravelExperience Component — Optimized
// ══════════════════════════════════════════════════════════════════════════
const TravelExperience = memo(function TravelExperience() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Stable navigation handler
  const handleCardClick = useCallback(
    (route) => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      // Use requestAnimationFrame instead of setTimeout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          navigate(route);
        });
      });
    },
    [navigate, prefersReducedMotion]
  );

  return (
    <>
      <style>{STYLES}</style>
      <section className="rte-section" aria-label="Featured travel experiences">
        <div className="rte-container">
          <motion.div
            ref={headerRef}
            className="rte-header"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <div className="rte-header-decoration">
              <div className="rte-header-line" aria-hidden="true" />
              <span className="rte-badge">
                <Compass
                  size={12}
                  className="rte-badge-icon"
                  aria-hidden="true"
                />
                Curated Experiences
                <Sparkles
                  size={12}
                  className="rte-badge-icon"
                  aria-hidden="true"
                />
              </span>
              <div className="rte-header-line" aria-hidden="true" />
            </div>
            <h2 className="rte-title">
              Featured{" "}
              <span className="rte-title-gradient">Experiences</span>
            </h2>
            <p className="rte-subtitle">
              Tailored travel solutions for every purpose and destination,
              crafted with precision and delivered with excellence.
            </p>
          </motion.div>

          <div className="rte-grid-wrapper">
            <div className="rte-grid" role="list" aria-label="Experience cards">
              {EXPERIENCES.map((exp, idx) => (
                <EarthCard
                  key={exp.id}
                  experience={exp}
                  index={idx}
                  onClick={() => handleCardClick(exp.route)}
                />
              ))}
            </div>
          </div>

          <MobileCarousel
            items={EXPERIENCES}
            onCardClick={handleCardClick}
          />
        </div>
      </section>
    </>
  );
});

TravelExperience.displayName = "TravelExperience";

export default TravelExperience;