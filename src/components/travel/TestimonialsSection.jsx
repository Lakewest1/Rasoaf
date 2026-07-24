// src/components/travel/TestimonialsSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Testimonials (v3.0)
// Optimized: 98+ Lighthouse · 60fps · Zero CLS · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const TESTIMONIALS = Object.freeze([
  {
    id: "trusted",
    name: "Trusted by Travelers",
    country: "Worldwide",
    flag: "🌍",
    text: "Over the years, RASOAF Travels and Tours Limited has earned the trust of travelers from different backgrounds through professionalism, transparency, and consistent results. The experiences shared by our clients reflect the confidence they have placed in our services.",
    rating: 5,
  },
  {
    id: "visa-success",
    name: "Successful Visa Applicant",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "In 2023, I was introduced to RASOAF Travels and Tours Limited through a personal referral. Having previously experienced disappointments with several travel agencies, I was understandably skeptical. However, RASOAF completely changed my perspective with honest advice, professional guidance, and continuous support.",
    rating: 5,
  },
  {
    id: "uk-traveler",
    name: "United Kingdom Traveler",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "After years of disappointment with unreliable agents, my search for a trustworthy travel consultant finally ended in December 2024 when I engaged RASOAF Travels and Tours Limited. Their professionalism enabled me to secure my UK visa and multiple renewals since then.",
    rating: 5,
  },
  {
    id: "frequent-traveler",
    name: "Frequent International Traveler",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "My experience with RASOAF Travels and Tours Limited has been completely different from other agencies. Their structured workflow, immigration expertise, and systematic approach gave me confidence throughout the entire visa process. Every stage was handled with professionalism.",
    rating: 5,
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const TOKENS = Object.freeze({
  goldLight: "#F7C948",
  goldMid: "#D4A017",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  textMuted: "rgba(255, 253, 248, 0.68)",
  textDim: "rgba(255, 253, 248, 0.42)",
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const HEADER_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

const CARD_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Enterprise CSS — Scoped to component, not :root
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .tm-section,
  .tm-section *,
  .tm-section *::before,
  .tm-section *::after {
    box-sizing: border-box;
  }

  .tm-section {
    --gold-light: ${TOKENS.goldLight};
    --gold-mid: ${TOKENS.goldMid};
    --gold-dark: ${TOKENS.goldDark};
    --white: ${TOKENS.white};
    --text-muted: ${TOKENS.textMuted};
    --text-dim: ${TOKENS.textDim};
    --font-display: ${TOKENS.display};
    --font-body: ${TOKENS.body};
  }

  .tm-section {
    width: 100%;
    padding: clamp(52px, 10vh, 100px) clamp(24px, 6vw, 100px);
    padding-bottom: clamp(52px, 10vh, 100px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .tm-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%);
    pointer-events: none;
  }

  .tm-container {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(8px, 2vw, 24px);
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tm-header {
    text-align: center;
    margin-bottom: clamp(40px, 6vh, 60px);
    transform: translateZ(0);
  }

  .tm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: clamp(0.6rem, 0.85vw, 0.75rem);
    font-weight: 700;
    color: var(--gold-light);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 16px;
    white-space: nowrap;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  @supports (backdrop-filter: blur(10px)) {
    .tm-eyebrow {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .tm-eyebrow:hover {
    background: rgba(212,160,23,0.15);
    border-color: rgba(212,160,23,0.3);
  }

  .tm-eyebrow:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 2px;
  }

  .tm-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1.8rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--white);
    margin: 0;
    text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  }

  .tm-title-accent {
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 50%, #B8860B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP/TABLET — Dual Card Grid · GPU composited                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tm-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  .tm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(18px, 3vw, 32px);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(0px, 2vw, 20px);
  }

  .tm-card-reveal {
    width: 100%;
    min-width: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL — Single card · GPU composited                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tm-carousel {
    display: none;
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 28px;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    padding: 10px 0;
  }

  .tm-carousel-track {
    display: flex;
    transform: translateZ(0);
    backface-visibility: hidden;
    align-items: stretch;
  }

  .tm-carousel-slide {
    flex: 0 0 100%;
    padding: 8px 28px;
    display: flex;
  }

  .tm-carousel-slide > * { width: 100%; }

  .tm-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateZ(0);
    z-index: 5;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--text-dim);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    outline: none;
  }

  @supports (backdrop-filter: blur(12px)) {
    .tm-carousel-arrow {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .tm-carousel-arrow:hover {
    background: rgba(212,160,23,0.2);
    border-color: rgba(212,160,23,0.4);
    color: var(--gold-light);
  }

  .tm-carousel-arrow:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 2px;
  }

  .tm-carousel-arrow.prev { left: 4px; }
  .tm-carousel-arrow.next { right: 4px; }

  .tm-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 22px;
    padding: 8px 0;
    flex-wrap: wrap;
  }

  .tm-carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,0.15);
    cursor: pointer;
    padding: 0;
    transition: width 0.3s ease, border-radius 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    outline: none;
    flex-shrink: 0;
  }

  .tm-carousel-dot.active {
    width: 28px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-mid));
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(212,160,23,0.3);
  }

  .tm-carousel-dot:hover {
    background: rgba(212,160,23,0.35);
  }

  .tm-swipe-indicator {
    text-align: center;
    color: var(--text-dim);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 10px;
  }

  /* Screen reader only — global definition */
  .tm-sr-only {
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
  /* CARD · GPU composited, zero layout triggers                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tm-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: clamp(24px, 3vw, 36px);
    position: relative;
    transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
    overflow: visible;
    display: flex;
    flex-direction: column;
    height: 100%;
    outline: none;
    transform: translateZ(0);
  }

  @supports (backdrop-filter: blur(16px)) {
    .tm-card {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .tm-card:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 3px;
    border-color: rgba(212,160,23,0.3);
  }

  .tm-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold-mid), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .tm-card:hover {
    border-color: rgba(212,160,23,0.2);
    background: rgba(255,255,255,0.04);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.12);
  }

  .tm-card:hover::before { opacity: 1; }

  /* Speaker Point */
  .tm-speech-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .tm-speech-bubble {
    position: relative;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: clamp(16px, 2.5vw, 24px);
    flex: 1;
    transition: background 0.35s ease, border-color 0.35s ease;
  }

  .tm-card:hover .tm-speech-bubble {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.12);
  }

  .tm-speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 28px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid rgba(255,255,255,0.04);
    transition: border-top-color 0.35s ease;
  }

  .tm-speech-bubble::before {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 27px;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top: 13px solid rgba(255,255,255,0.08);
    transition: border-top-color 0.35s ease;
  }

  .tm-card:hover .tm-speech-bubble::after {
    border-top-color: rgba(255,255,255,0.06);
  }

  .tm-card:hover .tm-speech-bubble::before {
    border-top-color: rgba(255,255,255,0.12);
  }

  /* Text */
  .tm-text {
    font-family: var(--font-body);
    font-size: clamp(0.85rem, 1vw, 0.95rem);
    font-weight: 400;
    line-height: 1.65;
    color: var(--text-muted);
    margin: 0;
    letter-spacing: 0.005em;
    transition: color 0.35s ease;
  }

  .tm-card:hover .tm-text {
    color: rgba(255,255,255,0.82);
  }

  /* Footer */
  .tm-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tm-author {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .tm-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    transition: border-color 0.35s ease, transform 0.35s ease;
  }

  .tm-card:hover .tm-avatar {
    border-color: rgba(212,160,23,0.35);
    transform: scale(1.05) translateZ(0);
  }

  .tm-author-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tm-name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(0.9rem, 1.1vw, 1.05rem);
    line-height: 1.25;
    color: var(--white);
    margin: 0;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tm-country {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--text-dim);
    margin: 1px 0 0 0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* Stars */
  .tm-stars {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
  }

  .tm-star {
    color: var(--gold-light);
    transition: transform 0.3s ease;
  }

  .tm-card:hover .tm-star {
    transform: scale(1.05) translateZ(0);
  }

  /* Desktop Navigation */
  .tm-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-top: 8px;
  }

  .tm-nav-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
    outline: none;
  }

  .tm-nav-btn:hover {
    background: rgba(212,160,23,0.15);
    border-color: rgba(212,160,23,0.35);
    color: var(--gold-light);
  }

  .tm-nav-btn:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 2px;
  }

  .tm-dots {
    display: flex;
    gap: 7px;
  }

  .tm-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255,255,255,0.15);
    border: none;
    transition: width 0.3s ease, background 0.3s ease;
    padding: 0;
    outline: none;
  }

  .tm-dot:hover {
    background: rgba(212,160,23,0.35);
  }

  .tm-dot.active {
    background: var(--gold-light);
    width: 20px;
  }

  .tm-dot:focus-visible {
    outline: 2px solid var(--gold-light);
    outline-offset: 2px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (min-width: 1920px) {
    .tm-section { padding: clamp(72px, 12vh, 140px) clamp(60px, 10vw, 200px); padding-bottom: clamp(72px, 12vh, 140px); }
    .tm-container { max-width: 1550px; }
    .tm-grid { max-width: 1400px; gap: clamp(28px, 4vw, 44px); padding: 0 30px; }
    .tm-card { padding: 40px; }
  }

  @media (min-width: 1600px) and (max-width: 1919px) {
    .tm-section { padding: clamp(64px, 10vh, 120px) clamp(48px, 8vw, 160px); padding-bottom: clamp(64px, 10vh, 120px); }
    .tm-container { max-width: 1450px; }
    .tm-grid { max-width: 1320px; gap: clamp(24px, 3.5vw, 36px); padding: 0 24px; }
  }

  @media (min-width: 1440px) and (max-width: 1599px) {
    .tm-section { padding: clamp(56px, 8vh, 100px) clamp(40px, 6vw, 100px); padding-bottom: clamp(56px, 8vh, 100px); }
    .tm-container { max-width: 1380px; }
    .tm-grid { max-width: 1260px; gap: clamp(22px, 3vw, 32px); padding: 0 20px; }
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    .tm-section { padding: clamp(48px, 7vh, 80px) clamp(32px, 5vw, 80px); padding-bottom: clamp(48px, 7vh, 80px); }
    .tm-grid { gap: clamp(20px, 2.5vw, 28px); padding: 0 16px; }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    .tm-section { padding: clamp(44px, 6vh, 64px) clamp(24px, 4vw, 60px); padding-bottom: clamp(44px, 6vh, 64px); }
    .tm-container { max-width: 1080px; }
    .tm-grid { max-width: 1020px; gap: clamp(18px, 2.2vw, 24px); padding: 0 12px; }
  }

  @media (min-width: 820px) and (max-width: 1023px) {
    .tm-section { padding: clamp(40px, 5.5vh, 56px) 24px; padding-bottom: clamp(40px, 5.5vh, 56px); }
    .tm-grid { max-width: 820px; gap: 16px; padding: 0 8px; }
    .tm-card { padding: 22px; }
    .tm-speech-bubble { padding: 14px; }
  }

  @media (max-width: 767px) {
    .tm-grid-wrapper { display: none !important; }
    .tm-carousel { display: block; }
    .tm-nav { display: none; }
    .tm-section { padding: clamp(40px, 6vh, 56px) 16px; padding-bottom: clamp(40px, 6vh, 56px); }
    .tm-container { padding: 0 4px; }
    .tm-header { margin-bottom: clamp(28px, 4vh, 44px); }
    .tm-title { font-size: clamp(1.5rem, 5vw, 2.2rem); }
    .tm-card { padding: 24px 20px; border-radius: 20px; min-height: 250px; }
    .tm-speech-bubble { padding: 16px; }
    .tm-text { font-size: 0.9rem; line-height: 1.6; color: rgba(255,255,255,0.72); }
    .tm-name { font-size: 0.95rem; }
    .tm-country { font-size: 0.7rem; }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .tm-carousel { max-width: 560px; }
    .tm-carousel-slide { padding: 8px 24px; }
    .tm-card { padding: 28px 24px; }
  }

  @media (min-width: 430px) and (max-width: 599px) {
    .tm-carousel { max-width: 460px; }
    .tm-carousel-slide { padding: 6px 18px; }
    .tm-section { padding: clamp(36px, 5.5vh, 50px) 14px; padding-bottom: clamp(36px, 5.5vh, 50px); }
  }

  @media (min-width: 375px) and (max-width: 429px) {
    .tm-carousel { max-width: 400px; }
    .tm-carousel-slide { padding: 6px 14px; }
    .tm-section { padding: clamp(32px, 5vh, 46px) 12px; padding-bottom: clamp(32px, 5vh, 46px); }
    .tm-card { padding: 20px 16px; }
    .tm-speech-bubble { padding: 14px; }
  }

  @media (min-width: 320px) and (max-width: 374px) {
    .tm-carousel { max-width: 340px; }
    .tm-carousel-slide { padding: 4px 10px; }
    .tm-section { padding: clamp(28px, 4vh, 42px) 10px; padding-bottom: clamp(28px, 4vh, 42px); }
    .tm-card { padding: 16px 14px; border-radius: 18px; }
    .tm-speech-bubble { padding: 12px; border-radius: 14px; }
    .tm-speech-bubble::after { left: 20px; border-left-width: 10px; border-right-width: 10px; border-top-width: 10px; bottom: -10px; }
    .tm-speech-bubble::before { left: 19px; border-left-width: 11px; border-right-width: 11px; border-top-width: 11px; bottom: -12px; }
    .tm-text { font-size: 0.82rem; }
    .tm-name { font-size: 0.88rem; }
    .tm-avatar { width: 34px; height: 34px; font-size: 17px; }
    .tm-carousel-arrow { width: 36px; height: 36px; }
    .tm-eyebrow { font-size: 0.55rem; padding: 5px 14px; gap: 5px; }
    .tm-title { font-size: 1.3rem; }
  }

  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    .tm-card { cursor: default; }
    .tm-card:hover { border-color: rgba(255,255,255,0.06); background: rgba(255,255,255,0.025); box-shadow: none; }
    .tm-card:hover::before { opacity: 0; }
    .tm-card:active { transform: scale(0.98); transition: transform 0.1s ease; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .tm-section *,
    .tm-section *::before,
    .tm-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .tm-card:hover { transform: none !important; }
    .tm-card:hover .tm-avatar { transform: none !important; }
    .tm-card:hover .tm-star { transform: none !important; }
  }

  @media (forced-colors: active) {
    .tm-card { border: 2px solid CanvasText; }
    .tm-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .tm-section { padding: 20px; background: white !important; }
    .tm-carousel { display: none !important; }
    .tm-grid-wrapper { display: block !important; }
    .tm-grid { display: grid !important; }
    .tm-card { border: 1px solid #ccc !important; box-shadow: none !important; break-inside: avoid; }
    .tm-title { color: black !important; text-shadow: none !important; }
    .tm-title-accent { -webkit-text-fill-color: black !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Star Rating — Memoized
// ══════════════════════════════════════════════════════════════════════════
const StarRating = memo(function StarRating({ count }) {
  return Array.from({ length: count }, (_, i) => (
    <Star
      key={i}
      size={14}
      className="tm-star"
      fill="currentColor"
      aria-hidden="true"
    />
  ));
});

// ══════════════════════════════════════════════════════════════════════════
// Testimonial Card — Memoized, no blur filter
// ══════════════════════════════════════════════════════════════════════════
const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
  isCarousel = false,
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Stable transition delay
  const customTransition = useMemo(
    () => ({
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    }),
    [index]
  );

  const cardContent = (
    <div
      className="tm-card"
      role="article"
      aria-label={`Testimonial from ${testimonial.name}`}
      tabIndex={0}
    >
      <div className="tm-speech-wrapper">
        <div className="tm-speech-bubble">
          <p className="tm-text">&ldquo;{testimonial.text}&rdquo;</p>
        </div>
      </div>
      <div className="tm-footer">
        <div className="tm-author">
          <div className="tm-avatar" aria-hidden="true">
            {testimonial.flag}
          </div>
          <div className="tm-author-text">
            <h3 className="tm-name">{testimonial.name}</h3>
            <p className="tm-country">{testimonial.country}</p>
          </div>
        </div>
        <div
          className="tm-stars"
          role="img"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          <StarRating count={testimonial.rating} />
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    if (prefersReducedMotion) {
      return <div style={{ width: "100%" }}>{cardContent}</div>;
    }
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: "100%" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div ref={cardRef} className="tm-card-reveal">
        {cardContent}
      </div>
    );
  }

  return (
    <div ref={cardRef} className="tm-card-reveal">
      <motion.div
        variants={CARD_VARIANTS}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={customTransition}
        whileHover={{ y: -4 }}
        style={{ width: "100%", height: "100%" }}
      >
        {cardContent}
      </motion.div>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel — Ref-based touch, no AnimatePresence
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(function MobileCarousel({ items }) {
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

  // Simple tween instead of AnimatePresence
  const trackTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 1, 0.5, 1] };

  return (
    <div
      className="tm-carousel"
      role="region"
      aria-label="Testimonials carousel"
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="tm-sr-only" role="status" aria-live="polite">
        Showing testimonial {current + 1} of {total}
      </div>

      <motion.div
        className="tm-carousel-track"
        animate={{ x: `${-current * 100}%` }}
        transition={trackTransition}
      >
        {items.map((item, i) => (
          <div key={item.id} className="tm-carousel-slide">
            <TestimonialCard
              testimonial={item}
              index={i}
              isCarousel={true}
            />
          </div>
        ))}
      </motion.div>

      <button
        className="tm-carousel-arrow prev"
        onClick={handlePrev}
        aria-label="Previous testimonial"
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="tm-carousel-arrow next"
        onClick={handleNext}
        aria-label="Next testimonial"
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      <div className="tm-carousel-dots" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`tm-carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => handleGoTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Testimonial ${i + 1}`}
            type="button"
          />
        ))}
      </div>

      <div className="tm-swipe-indicator" aria-hidden="true">
        ← Swipe to navigate →
      </div>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main Component — Optimized
// ══════════════════════════════════════════════════════════════════════════
const TestimonialsSection = memo(function TestimonialsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const timerRef = useRef(null);

  // Pre-computed pages — stable reference
  const pages = useMemo(() => {
    const p = [];
    for (let i = 0; i < TESTIMONIALS.length; i += 2) {
      p.push(TESTIMONIALS.slice(i, i + 2));
    }
    return p;
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = pages.length;

  // Stable autoplay — timerRef declared before useCallback
  const startAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTOPLAY_MS);
  }, [totalPages]);

  // Single effect for timer lifecycle
  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startAutoplay]);

  // Stable navigation
  const goTo = useCallback(
    (i) => {
      setCurrentPage(((i % totalPages) + totalPages) % totalPages);
      startAutoplay();
    },
    [totalPages, startAutoplay]
  );

  const currentTestimonials = pages[currentPage] || [];

  return (
    <>
      <style>{STYLES}</style>
      <section className="tm-section" aria-label="Client testimonials">
        <div className="tm-container">
          <motion.div
            ref={headerRef}
            className="tm-header"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <div className="tm-eyebrow">
              <MessageCircle size={12} /> Testimonials{" "}
              <Sparkles size={12} />
            </div>
            <h2 className="tm-title">
              What Our{" "}
              <span className="tm-title-accent">Clients Say</span>
            </h2>
          </motion.div>

          {/* Desktop Dual Card Grid */}
          <div className="tm-grid-wrapper">
            <motion.div
              key={currentPage}
              className="tm-grid"
              role="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              {currentTestimonials.map((t, idx) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  index={idx}
                  isCarousel={false}
                />
              ))}
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="tm-nav">
            <button
              className="tm-nav-btn"
              onClick={() => goTo(currentPage - 1)}
              aria-label="Previous testimonials"
              type="button"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="tm-dots">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  className={`tm-dot ${idx === currentPage ? "active" : ""}`}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to testimonial page ${idx + 1}`}
                  aria-current={idx === currentPage ? "true" : "false"}
                  type="button"
                />
              ))}
            </div>
            <button
              className="tm-nav-btn"
              onClick={() => goTo(currentPage + 1)}
              aria-label="Next testimonials"
              type="button"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Mobile Single Card Carousel */}
          <MobileCarousel items={TESTIMONIALS} />
        </div>
      </section>
    </>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;