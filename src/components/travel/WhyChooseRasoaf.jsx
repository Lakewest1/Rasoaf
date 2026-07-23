// src/components/travel/WhyChooseRasoaf.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Why Choose Us (v6)
// Fixed overlapping · Proper gaps · Original card design preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { 
  Shield, Zap, PiggyBank, Globe, Headphones, Award, Lock, Heart,
  Sparkles, BadgeCheck, Star, ChevronLeft, ChevronRight
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const REASONS = [
  { id: "worldwide", icon: Globe, title: "Worldwide Destinations", desc: "Access 60+ countries across all continents. Canada, USA, UK, Australia, UAE, and more.", stat: "60+ Countries", metric: "4.9/5 Rating", stars: 5, color: "#D4A017", bgColor: "#FFFDF5" },
  { id: "trusted", icon: Shield, title: "Trusted Experts", desc: "Over 20 years of experience in travel and visa services with proven track record.", stat: "20+ Years", metric: "15K+ Visas", stars: 5, color: "#D4A017", bgColor: "#FFF8F0" },
  { id: "fast", icon: Zap, title: "Fast Processing", desc: "Expedited visa and booking processing for urgent travel needs with priority service.", stat: "Quick Turnaround", metric: "98% Approval", stars: 5, color: "#D4A017", bgColor: "#FFFDF8" },
  { id: "affordable", icon: PiggyBank, title: "Affordable Pricing", desc: "Competitive rates with flexible payment options and no hidden fees.", stat: "Best Value", metric: "Price Match", stars: 5, color: "#D4A017", bgColor: "#FFFAF2" },
  { id: "support", icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer care via phone, email, and WhatsApp.", stat: "Always Available", metric: "Instant Response", stars: 5, color: "#D4A017", bgColor: "#FFFDF5" },
  { id: "certified", icon: Award, title: "Certified Agency", desc: "NAHCON approved and fully licensed by relevant authorities.", stat: "Fully Licensed", metric: "Government Approved", stars: 5, color: "#D4A017", bgColor: "#FFF8F0" },
  { id: "secure", icon: Lock, title: "Secure Payments", desc: "Enterprise-grade security protecting your transactions and personal data.", stat: "Encrypted", metric: "256-bit SSL", stars: 5, color: "#D4A017", bgColor: "#FFFDF8" },
  { id: "customer", icon: Heart, title: "Customer First", desc: "Personalized service prioritizing your satisfaction with dedicated support.", stat: "Top Rated", metric: "98% Satisfaction", stars: 5, color: "#D4A017", bgColor: "#FFFAF2" },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

// ══════════════════════════════════════════════════════════════════════════
// CSS — Fixed overlapping with proper gaps
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  :root {
    --gold-1: #D4A017;
    --gold-2: #F7C948;
    --white: #FFFFFF;
    --bg-light: #F7F8FA;
    --navy-dark: #0D3C6E;
    --text-dark: #0A0F1A;
    --text-grey: #6B7280;
    --text-light: #9CA3AF;
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.04);
    --shadow-hover: 0 12px 48px rgba(0, 0, 0, 0.08);
    --font-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    --radius-card: 24px;
    --radius-icon: 16px;
    --transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ── */
  .rwc-section {
    width: 100%;
    padding: clamp(80px, 12vh, 140px) clamp(24px, 6vw, 100px);
    padding-bottom: clamp(80px, 12vh, 140px);
    background: var(--bg-light);
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    z-index: 10;
    box-sizing: border-box;
    transition: background-color 1s ease;
  }

  .rwc-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .rwc-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 64px);
  }

  .rwc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-1);
    margin-bottom: 16px;
    white-space: nowrap;
  }

  .rwc-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--text-dark);
    margin: 0 0 16px 0;
  }

  .rwc-title-accent {
    background: linear-gradient(135deg, var(--gold-1) 0%, var(--gold-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rwc-subtitle {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.1vw, 1.1rem);
    font-weight: 400;
    color: var(--text-grey);
    max-width: 540px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* DESKTOP/TABLET GRID — Fixed gaps, no overlapping */
  /* ════════════════════════════════════════════════════════════════ */
  .rwc-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    box-sizing: border-box;
  }

  .rwc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .rwc-card-reveal {
    width: 100%;
    min-width: 0; /* Prevent grid blowout */
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL */
  /* ════════════════════════════════════════════════════════════════ */
  .rwc-carousel {
    display: none;
    position: relative;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    padding: 10px 0;
    box-sizing: border-box;
  }

  .rwc-carousel-track {
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    align-items: stretch;
  }

  .rwc-carousel-slide {
    flex: 0 0 100%;
    padding: 8px 28px;
    box-sizing: border-box;
    display: flex;
  }

  .rwc-carousel-slide > * { width: 100%; }

  .rwc-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(212, 160, 23, 0.25);
    color: var(--gold-1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    outline: none;
  }

  .rwc-carousel-arrow:hover { background: var(--gold-1); color: white; border-color: var(--gold-1); }
  .rwc-carousel-arrow:focus-visible { outline: 2px solid var(--gold-1); outline-offset: 2px; }
  .rwc-carousel-arrow.prev { left: 2px; }
  .rwc-carousel-arrow.next { right: 2px; }

  .rwc-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 22px;
    padding: 8px 0;
    flex-wrap: wrap;
  }

  .rwc-carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.12);
    cursor: pointer;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    outline: none;
    flex-shrink: 0;
  }

  .rwc-carousel-dot.active {
    width: 30px;
    background: linear-gradient(135deg, var(--gold-2), var(--gold-1));
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(212, 160, 23, 0.3);
  }

  .rwc-swipe-indicator {
    text-align: center;
    color: var(--text-light);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 10px;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* CARD — Original Design, no overlap */
  /* ════════════════════════════════════════════════════════════════ */
  .rwc-card-wrapper {
    position: relative;
    background: var(--white);
    border-radius: var(--radius-card);
    padding: 32px 24px 28px;
    box-shadow: var(--shadow-card);
    transition: all 0.5s var(--transition-smooth);
    cursor: pointer;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    will-change: transform, box-shadow;
    overflow: hidden;
    isolation: isolate;
    outline: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .rwc-card-wrapper:focus-visible {
    outline: 2px solid var(--gold-1);
    outline-offset: 3px;
  }

  .rwc-card-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-card);
    padding: 1px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.15), transparent 40%, transparent 60%, rgba(212, 160, 23, 0.08));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s var(--transition-smooth);
    z-index: 10;
  }

  .rwc-card-wrapper:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover), 0 0 0 1px rgba(212, 160, 23, 0.06);
  }

  .rwc-card-wrapper:hover::before { opacity: 1; }

  /* ── Icon ── */
  .rwc-icon-wrap { margin-bottom: 20px; flex-shrink: 0; position: relative; }

  .rwc-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-icon);
    background: #F1F3F5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--navy-dark);
    transition: all 0.6s var(--transition-smooth);
    will-change: transform, border-radius, background;
    backface-visibility: hidden;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .rwc-icon svg { width: 28px; height: 28px; stroke-width: 1.8; transition: color 0.4s var(--transition-smooth); }

  .rwc-card-wrapper:hover .rwc-icon {
    border-radius: 50%;
    background: var(--white);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  .rwc-card-wrapper:hover .rwc-icon svg { color: var(--gold-1); }

  /* ── Title ── */
  .rwc-title-text {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    line-height: 1.3;
    color: var(--text-dark);
    margin: 0 0 8px 0;
    position: relative;
    z-index: 5;
  }

  /* ── Description ── */
  .rwc-desc-text {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
    color: var(--text-grey);
    margin: 0 0 16px 0;
    flex: 1;
    position: relative;
    z-index: 5;
  }

  /* ── Stars ── */
  .rwc-stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 12px;
    position: relative;
    z-index: 5;
  }

  .rwc-star { color: var(--gold-1); fill: var(--gold-1); width: 18px; height: 18px; }
  .rwc-star-empty { color: #E5E7EB; width: 18px; height: 18px; }

  /* ── Stat Badge ── */
  .rwc-stat-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding: 6px 14px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.08);
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--gold-1);
    position: relative;
    z-index: 5;
  }

  /* ── Overlay ── */
  .rwc-overlay {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: var(--radius-card);
    opacity: 0;
    transition: opacity 0.6s var(--transition-smooth);
    pointer-events: none;
    z-index: 4;
    will-change: opacity;
  }

  .rwc-overlay::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }

  .rwc-card-wrapper:hover .rwc-overlay { opacity: 1; }

  /* ── Slide-Up Panel ── */
  .rwc-panel {
    position: absolute;
    bottom: 0;
    left: 4px;
    right: 4px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-card);
    height: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.7s var(--transition-smooth);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.04);
    z-index: 6;
    pointer-events: none;
    will-change: transform;
    backface-visibility: hidden;
  }

  .rwc-card-wrapper:hover .rwc-panel { transform: translateY(0); pointer-events: auto; }

  .rwc-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: skewX(-25deg);
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .rwc-card-wrapper:hover .rwc-panel::before { left: 100%; }

  .rwc-panel::after {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    pointer-events: none;
  }

  .rwc-panel-stars { display: flex; gap: 6px; margin-bottom: 12px; }
  .rwc-panel-stars .rwc-star { width: 22px; height: 22px; }

  .rwc-panel-stat {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--gold-1);
    margin: 0;
    line-height: 1.2;
  }

  .rwc-panel-label {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-grey);
    margin: 4px 0 0 0;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE — Proper gaps at every breakpoint */
  /* ════════════════════════════════════════════════════════════════ */

  /* 1920px+ — 4 columns, large gaps */
  @media (min-width: 1920px) {
    .rwc-section { padding: clamp(90px, 12vh, 160px) clamp(60px, 8vw, 200px); }
    .rwc-container { max-width: 1600px; }
    .rwc-grid { max-width: 1500px; gap: 32px; padding: 0 40px; }
    .rwc-card-wrapper { min-height: 300px; padding: 36px 28px 32px; }
  }

  /* 1600-1919px — 4 columns */
  @media (min-width: 1600px) and (max-width: 1919px) {
    .rwc-section { padding: clamp(80px, 10vh, 140px) clamp(40px, 6vw, 120px); }
    .rwc-container { max-width: 1500px; }
    .rwc-grid { max-width: 1400px; gap: 28px; padding: 0 30px; }
    .rwc-card-wrapper { min-height: 290px; }
  }

  /* 1440-1599px — 4 columns */
  @media (min-width: 1440px) and (max-width: 1599px) {
    .rwc-section { padding: clamp(72px, 9vh, 120px) clamp(32px, 5vw, 80px); }
    .rwc-container { max-width: 1400px; }
    .rwc-grid { max-width: 1300px; gap: 24px; padding: 0 24px; }
  }

  /* 1280-1439px — 4 columns */
  @media (min-width: 1280px) and (max-width: 1439px) {
    .rwc-section { padding: clamp(64px, 8vh, 100px) clamp(24px, 4vw, 60px); }
    .rwc-container { max-width: 1300px; }
    .rwc-grid { max-width: 1220px; gap: 22px; padding: 0 20px; }
    .rwc-card-wrapper { min-height: 275px; padding: 28px 22px 24px; }
    .rwc-icon { width: 58px; height: 58px; }
    .rwc-icon svg { width: 26px; height: 26px; }
  }

  /* 1024-1279px — 3 columns */
  @media (min-width: 1024px) and (max-width: 1279px) {
    .rwc-section { padding: clamp(56px, 7vh, 80px) clamp(20px, 3vw, 40px); }
    .rwc-container { max-width: 1100px; }
    .rwc-grid { grid-template-columns: repeat(3, 1fr); max-width: 1020px; gap: 24px; padding: 0 20px; }
    .rwc-card-wrapper { min-height: 270px; padding: 28px 22px 24px; }
  }

  /* 820-1023px — 3 columns */
  @media (min-width: 820px) and (max-width: 1023px) {
    .rwc-section { padding: clamp(48px, 6vh, 64px) 20px; }
    .rwc-grid { grid-template-columns: repeat(3, 1fr); max-width: 800px; gap: 18px; padding: 0 16px; }
    .rwc-card-wrapper { min-height: 255px; padding: 24px 18px 20px; }
    .rwc-icon { width: 54px; height: 54px; }
    .rwc-icon svg { width: 24px; height: 24px; }
    .rwc-title-text { font-size: 1.05rem; }
    .rwc-desc-text { font-size: 0.82rem; }
    .rwc-panel { height: 60%; padding: 16px; }
  }

  /* 768-819px — 2 columns */
  @media (min-width: 768px) and (max-width: 819px) {
    .rwc-section { padding: clamp(56px, 8vh, 72px) 20px; }
    .rwc-grid { grid-template-columns: repeat(2, 1fr); max-width: 720px; gap: 22px; padding: 0 16px; }
    .rwc-card-wrapper { min-height: 260px; padding: 26px 20px 22px; }
    .rwc-icon { width: 56px; height: 56px; }
    .rwc-icon svg { width: 24px; height: 24px; }
    .rwc-panel { height: 62%; padding: 16px; }
  }

  /* 600-767px — 2 columns */
  @media (min-width: 600px) and (max-width: 767px) {
    .rwc-section { padding: clamp(48px, 7vh, 56px) 18px; }
    .rwc-grid { grid-template-columns: repeat(2, 1fr); max-width: 580px; gap: 18px; padding: 0 12px; }
    .rwc-card-wrapper { min-height: 245px; padding: 24px 18px 20px; }
    .rwc-icon { width: 54px; height: 54px; }
    .rwc-icon svg { width: 23px; height: 23px; }
    .rwc-title-text { font-size: 1rem; }
    .rwc-desc-text { font-size: 0.82rem; }
    .rwc-star { width: 16px; height: 16px; }
    .rwc-star-empty { width: 16px; height: 16px; }
    .rwc-panel { height: 64%; padding: 14px; }
    .rwc-panel-stars .rwc-star { width: 18px; height: 18px; }
    .rwc-panel-stat { font-size: 1rem; }
  }

  /* Mobile — Carousel */
  @media (max-width: 599px) {
    .rwc-grid-wrapper { display: none !important; }
    .rwc-carousel { display: block; }
    .rwc-section { padding: clamp(44px, 7vh, 60px) 12px; padding-bottom: clamp(44px, 7vh, 60px); }
    .rwc-container { padding: 0 4px; }
    .rwc-header { margin-bottom: clamp(28px, 4vh, 40px); }
    .rwc-title { font-size: clamp(1.8rem, 5.5vw, 2.4rem); }
    .rwc-subtitle { font-size: 0.95rem; max-width: 100%; padding: 0 12px; }
    .rwc-card-wrapper { min-height: 260px; padding: 28px 22px 24px; }
    .rwc-icon { width: 58px; height: 58px; }
    .rwc-icon svg { width: 25px; height: 25px; }
    .rwc-title-text { font-size: 1.05rem; }
    .rwc-desc-text { font-size: 0.88rem; }
    .rwc-star { width: 18px; height: 18px; }
    .rwc-star-empty { width: 18px; height: 18px; }
    .rwc-panel-stars .rwc-star { width: 22px; height: 22px; }
    .rwc-panel-stat { font-size: 1.15rem; }
    .rwc-carousel-arrow { width: 44px; height: 44px; }
  }

  /* 430-599px */
  @media (min-width: 430px) and (max-width: 599px) {
    .rwc-carousel { max-width: 440px; }
    .rwc-carousel-slide { padding: 8px 20px; }
  }

  /* 375-429px */
  @media (min-width: 375px) and (max-width: 429px) {
    .rwc-carousel { max-width: 400px; }
    .rwc-carousel-slide { padding: 6px 16px; }
    .rwc-card-wrapper { min-height: 245px; padding: 24px 20px 22px; }
    .rwc-icon { width: 52px; height: 52px; }
    .rwc-icon svg { width: 22px; height: 22px; }
    .rwc-title-text { font-size: 1rem; }
    .rwc-desc-text { font-size: 0.85rem; }
  }

  /* 320-374px */
  @media (min-width: 320px) and (max-width: 374px) {
    .rwc-section { padding: clamp(32px, 5vh, 44px) 8px; padding-bottom: clamp(32px, 5vh, 44px); }
    .rwc-carousel { max-width: 350px; }
    .rwc-carousel-slide { padding: 4px 12px; }
    .rwc-card-wrapper { min-height: 225px; padding: 20px 16px 18px; }
    .rwc-icon { width: 48px; height: 48px; }
    .rwc-icon svg { width: 20px; height: 20px; }
    .rwc-title-text { font-size: 0.92rem; }
    .rwc-desc-text { font-size: 0.8rem; }
    .rwc-star { width: 15px; height: 15px; }
    .rwc-star-empty { width: 15px; height: 15px; }
    .rwc-panel-stars .rwc-star { width: 18px; height: 18px; }
    .rwc-panel-stat { font-size: 1rem; }
    .rwc-panel-label { font-size: 0.7rem; }
    .rwc-carousel-arrow { width: 36px; height: 36px; }
    .rwc-stat-badge { font-size: 0.64rem; padding: 5px 12px; }
    .rwc-title { font-size: 1.5rem; }
    .rwc-subtitle { font-size: 0.88rem; }
    .rwc-eyebrow { font-size: 0.6rem; padding: 5px 12px; gap: 4px; }
  }

  /* ── Touch ── */
  @media (hover: none) and (pointer: coarse) {
    .rwc-card-wrapper { cursor: default; }
    .rwc-card-wrapper:hover { transform: none; box-shadow: var(--shadow-card); }
    .rwc-card-wrapper:hover::before { opacity: 0; }
    .rwc-card-wrapper:hover .rwc-overlay { opacity: 0; }
    .rwc-card-wrapper:hover .rwc-panel { transform: translateY(100%); pointer-events: none; }
    .rwc-card-wrapper:hover .rwc-icon { border-radius: var(--radius-icon); background: #F1F3F5; }
    .rwc-card-wrapper:hover .rwc-icon svg { color: var(--navy-dark); }
    .rwc-card-wrapper.active .rwc-overlay { opacity: 1; }
    .rwc-card-wrapper.active .rwc-panel { transform: translateY(0); pointer-events: auto; }
    .rwc-card-wrapper.active .rwc-icon { border-radius: 50%; background: var(--white); box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); }
    .rwc-card-wrapper.active .rwc-icon svg { color: var(--gold-1); }
    .rwc-card-wrapper:active { transform: scale(0.97); transition: transform 0.1s ease; }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .rwc-card-wrapper:hover { transform: none !important; }
    .rwc-card-wrapper:hover .rwc-icon { border-radius: var(--radius-icon) !important; background: #F1F3F5 !important; }
    .rwc-card-wrapper:hover .rwc-overlay { opacity: 0 !important; }
    .rwc-card-wrapper:hover .rwc-panel { transform: translateY(100%) !important; }
    .rwc-section { transition: none !important; }
  }

  @media (forced-colors: active) {
    .rwc-card-wrapper { border: 2px solid CanvasText; }
    .rwc-card-wrapper:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .rwc-section { padding: 20px; background: white !important; }
    .rwc-carousel { display: none !important; }
    .rwc-grid-wrapper { display: block !important; }
    .rwc-grid { display: grid !important; }
    .rwc-card-wrapper { box-shadow: none !important; border: 1px solid #ccc !important; page-break-inside: avoid; }
    .rwc-panel, .rwc-overlay { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════════════════════

const StarRating = memo(({ count }) => (
  Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={i < count ? "rwc-star" : "rwc-star-empty"} fill={i < count ? "currentColor" : "none"} aria-hidden="true" />
  ))
));
StarRating.displayName = "StarRating";

// ══════════════════════════════════════════════════════════════════════════
// Card Component
// ══════════════════════════════════════════════════════════════════════════
const ReasonCard = memo(({ reason, index, isCarousel = false, isActive, onClick }) => {
  const Icon = reason.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
  }, [onClick]);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardContent = (
    <div className={`rwc-card-wrapper ${isActive ? 'active' : ''}`} onClick={onClick} onKeyDown={handleKeyDown} role="listitem" aria-label={reason.title} tabIndex={0}>
      <div className="rwc-icon-wrap">
        <motion.div className="rwc-icon"
          animate={{ rotate: isActive ? 360 : 0, scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <Icon size={28} strokeWidth={1.8} />
        </motion.div>
      </div>
      <h3 className="rwc-title-text">{reason.title}</h3>
      <p className="rwc-desc-text">{reason.desc}</p>
      <div className="rwc-stars"><StarRating count={reason.stars} /></div>
      <div className="rwc-stat-badge"><BadgeCheck size={14} aria-hidden="true" />{reason.stat}</div>
      <div className="rwc-overlay" />
      <div className="rwc-panel">
        <div className="rwc-panel-stars"><StarRating count={reason.stars} /></div>
        <p className="rwc-panel-stat">{reason.stat}</p>
        <p className="rwc-panel-label">{reason.metric}</p>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.04 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }} style={{ width: "100%" }}>
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div ref={cardRef} className="rwc-card-reveal">
      <motion.div variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -6 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }} style={{ width: "100%", height: "100%" }}>
        {cardContent}
      </motion.div>
    </div>
  );
});
ReasonCard.displayName = "ReasonCard";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(({ items, activeIndex, onCardClick, onSlideChange }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent((prev) => { const n = (prev + 1) % items.length; onSlideChange?.(n); return n; }), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, items.length, onSlideChange]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const prev = useCallback(() => setCurrent((p) => { const n = (p - 1 + items.length) % items.length; onSlideChange?.(n); return n; }), [items.length, onSlideChange]);
  const next = useCallback(() => setCurrent((p) => { const n = (p + 1) % items.length; onSlideChange?.(n); return n; }), [items.length, onSlideChange]);
  const goTo = useCallback((i) => { setCurrent(i); onSlideChange?.(i); startTimer(); }, [startTimer, onSlideChange]);

  const touchStartH = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const touchMoveH = useCallback((e) => { setTouchEnd(e.touches[0].clientX); }, []);
  const touchEndH = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > SWIPE_THRESHOLD) next();
    else if (touchEnd - touchStart > SWIPE_THRESHOLD) prev();
    setTouchStart(null); setTouchEnd(null); startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); } if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [next, prev, startTimer]);

  return (
    <div className="rwc-carousel" role="region" aria-label="Why choose us carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={touchStartH} onTouchMove={touchMoveH} onTouchEnd={touchEndH}>
      <div className="sr-only" role="status" aria-live="polite">Showing {current + 1} of {items.length}: {items[current].title}</div>
      <AnimatePresence mode="wait">
        <motion.div key={current} className="rwc-carousel-track"
          initial={{ x: 50, opacity: 0.3 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0.2 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.25, 1, 0.5, 1] }}>
          <div className="rwc-carousel-slide"><ReasonCard reason={items[current]} index={current} isCarousel={true} isActive={activeIndex === current} onClick={() => onCardClick(current)} /></div>
        </motion.div>
      </AnimatePresence>
      <button className="rwc-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous"><ChevronLeft size={20} /></button>
      <button className="rwc-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next"><ChevronRight size={20} /></button>
      <div className="rwc-carousel-dots" role="tablist">
        {items.map((item, i) => <button key={item.id} className={`rwc-carousel-dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} role="tab" aria-selected={i === current} aria-label={item.title} />)}
      </div>
      <div className="rwc-swipe-indicator" aria-hidden="true">← Swipe or tap arrows →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
});
MobileCarousel.displayName = "MobileCarousel";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
const WhyChooseRasoaf = memo(function WhyChooseRasoaf() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia('(hover: none)').matches) setActiveIndex(prev => prev === index ? null : index);
  }, []);

  const handleSlideChange = useCallback((index) => setCurrentSlide(index), []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }), []);

  return (
    <>
      <style>{STYLES}</style>
      <section className="rwc-section" style={{ backgroundColor: REASONS[currentSlide]?.bgColor || "#F7F8FA" }} aria-label="Why choose RASOAF travels">
        <div className="rwc-container">
          <motion.div ref={headerRef} className="rwc-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="rwc-eyebrow"><Sparkles size={12} /> Trusted Since 2004 <Sparkles size={12} /></div>
            <h2 className="rwc-title">Why Travel With <span className="rwc-title-accent">RASOAF</span></h2>
            <p className="rwc-subtitle">Premium travel solutions crafted with precision, backed by decades of expertise, and delivered with unwavering dedication to your journey.</p>
          </motion.div>

          <div className="rwc-grid-wrapper">
            <div className="rwc-grid" role="list">
              {REASONS.map((reason, idx) => (
                <ReasonCard key={reason.id} reason={reason} index={idx} isCarousel={false} isActive={activeIndex === idx} onClick={() => handleCardClick(idx)} />
              ))}
            </div>
          </div>

          <MobileCarousel items={REASONS} activeIndex={activeIndex} onCardClick={handleCardClick} onSlideChange={handleSlideChange} />
        </div>
      </section>
    </>
  );
});

WhyChooseRasoaf.displayName = "WhyChooseRasoaf";

export default WhyChooseRasoaf;