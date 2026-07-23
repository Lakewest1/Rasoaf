// src/components/travel/TravelProcess.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Travel Process (v6)
// Briefcase-shaped cards · Connecting journey line · Scroll reveal · Centered
//
// DESIGN UPDATE — v5 → v6 (Connected Journey Line)
// ─────────────────────────────────────────────────────────────────────────────
// 1. CONNECTING JOURNEY LINE:
//    - Curved path connecting all 6 briefcase cards
//    - Animated dots traveling along the line
//    - Start point (flag) and end point (star)
//    - Gold gradient line with glow effect
//    - Line reveals on scroll progressively
// 2. BRIEFCASE CARDS:
//    - White background with gold handles and rivets
//    - Leather texture and stitching on hover
// 3. SCROLL REVEAL:
//    - Cards slide up from bottom individually
//    - Staggered delay for cascading effect
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo, useCallback, memo, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Search, Users, MapPin, Ticket, Plane, Star, ChevronLeft, ChevronRight, Flag, Sparkles } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Discover",
    desc: "Explore destinations and find the perfect travel experience for your needs.",
    step: "01",
    color: "#667eea",
  },
  {
    icon: Users,
    title: "Consult",
    desc: "Speak with our travel experts who provide personalized recommendations.",
    step: "02",
    color: "#0D9488",
  },
  {
    icon: MapPin,
    title: "Plan",
    desc: "We design a customized itinerary tailored to your preferences and budget.",
    step: "03",
    color: "#7C3AED",
  },
  {
    icon: Ticket,
    title: "Book",
    desc: "Secure your flights, hotels, and activities with our seamless booking system.",
    step: "04",
    color: "#DC2626",
  },
  {
    icon: Plane,
    title: "Travel",
    desc: "Embark on your journey with confidence, supported by our 24/7 assistance.",
    step: "05",
    color: "#0284C7",
  },
  {
    icon: Star,
    title: "Enjoy",
    desc: "Create unforgettable memories with a stress-free, expertly managed trip.",
    step: "06",
    color: "#E11D48",
  },
];

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

const COLORS = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  textPrimary: "#111111",
  textSecondary: "#5F5F5F",
  leather: "#8B6914",
  leatherLight: "#C4A44A",
};

const TYPOGRAPHY = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
};

// ══════════════════════════════════════════════════════════════════════════
// Enterprise CSS with Connecting Journey Line
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  :root {
    --rasoaf-gold: ${COLORS.gold};
    --rasoaf-gold-light: ${COLORS.goldLight};
    --rasoaf-gold-dark: ${COLORS.goldDark};
    --rasoaf-white: ${COLORS.white};
    --rasoaf-text-primary: ${COLORS.textPrimary};
    --rasoaf-text-secondary: ${COLORS.textSecondary};
    --rasoaf-leather: ${COLORS.leather};
    --rasoaf-leather-light: ${COLORS.leatherLight};
    --rasoaf-font-display: ${TYPOGRAPHY.display};
    --rasoaf-font-body: ${TYPOGRAPHY.body};
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
    --shadow-card-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  /* ── Section ── */
  .tp-section {
    width: 100%;
    padding: clamp(60px, 10vh, 100px) clamp(16px, 4vw, 60px);
    padding-bottom: clamp(60px, 10vh, 120px);
    background: transparent;
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    box-sizing: border-box;
  }

  .tp-container {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(16px, 3vw, 40px);
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .tp-header {
    text-align: center;
    margin-bottom: clamp(40px, 7vh, 72px);
    width: 100%;
  }

  .tp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: rgba(212, 160, 23, 0.1);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    font-family: var(--rasoaf-font-body);
    font-size: clamp(0.6rem, 0.85vw, 0.75rem);
    font-weight: 700;
    color: var(--rasoaf-gold-dark);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: clamp(16px, 2.5vh, 24px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .tp-eyebrow:hover {
    background: rgba(212, 160, 23, 0.15);
    border-color: rgba(212, 160, 23, 0.35);
    transform: translateY(-1px);
  }

  .tp-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.5rem);
    letter-spacing: -0.025em;
    line-height: 1.15;
    color: #FFFFFF;
    margin: 0;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }

  .tp-title-accent {
    background: linear-gradient(135deg, ${COLORS.goldLight} 0%, ${COLORS.gold} 50%, ${COLORS.goldDark} 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: tp-shimmer 4s ease-in-out infinite;
  }

  @keyframes tp-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* GRID WITH CONNECTING LINE */
  /* ════════════════════════════════════════════════════════════════ */
  .tp-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;
    position: relative;
  }

  .tp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(32px, 5vw, 56px) clamp(24px, 3vw, 40px);
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    justify-items: center;
    align-items: start;
    box-sizing: border-box;
    position: relative;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* SVG CONNECTING LINE OVERLAY */
  /* ════════════════════════════════════════════════════════════════ */
  .tp-journey-line-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
    overflow: visible;
  }

  .tp-journey-line-svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Animated dot traveling along the path */
  .tp-journey-dot {
    filter: drop-shadow(0 0 6px rgba(247, 201, 72, 0.8));
  }

  /* Start flag icon */
  .tp-journey-start {
    position: absolute;
    filter: drop-shadow(0 0 8px rgba(212, 160, 23, 0.6));
  }

  /* End star icon */
  .tp-journey-end {
    position: absolute;
    filter: drop-shadow(0 0 12px rgba(247, 201, 72, 0.8));
  }

  /* Scroll reveal container */
  .tp-scroll-reveal {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL */
  /* ════════════════════════════════════════════════════════════════ */
  .tp-carousel {
    display: none;
    position: relative;
    width: 100%;
    max-width: 440px;
    margin: 0 auto;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    padding: 10px 0;
    box-sizing: border-box;
  }

  .tp-carousel-track {
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    align-items: center;
  }

  .tp-carousel-slide {
    flex: 0 0 100%;
    padding: 12px 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tp-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(212, 160, 23, 0.3);
    color: var(--rasoaf-gold-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    outline: none;
  }

  .tp-carousel-arrow:hover {
    background: var(--rasoaf-gold-light);
    color: white;
  }

  .tp-carousel-arrow:focus-visible {
    outline: 2px solid var(--rasoaf-gold);
    outline-offset: 2px;
  }

  .tp-carousel-arrow.prev { left: 0; }
  .tp-carousel-arrow.next { right: 0; }

  .tp-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    padding: 8px 0;
  }

  .tp-carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.3);
    cursor: pointer;
    padding: 0;
    transition: all 0.4s ease;
    outline: none;
  }

  .tp-carousel-dot.active {
    width: 28px;
    background: linear-gradient(135deg, ${COLORS.goldLight}, ${COLORS.gold});
    border-radius: 4px;
  }

  .tp-swipe-indicator {
    text-align: center;
    color: rgba(255, 255, 255, 0.3);
    font-family: var(--rasoaf-font-body);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 8px;
  }

  /* Mobile progress line */
  .tp-mobile-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-top: 16px;
    padding: 0 20px;
  }

  .tp-mobile-progress-line {
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.15);
    position: relative;
    border-radius: 1px;
  }

  .tp-mobile-progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, ${COLORS.goldLight}, ${COLORS.gold});
    border-radius: 1px;
    transition: width 0.5s ease;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* BRIEFCASE-SHAPED CARD */
  /* ════════════════════════════════════════════════════════════════ */
  .tp-briefcase-wrapper {
    position: relative;
    width: 100%;
    max-width: 340px;
    padding-top: 28px;
    box-sizing: border-box;
  }

  /* Handle */
  .tp-briefcase-handle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    max-width: 160px;
    height: 28px;
    z-index: 10;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .tp-briefcase-handle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 20px;
    border: 3px solid var(--rasoaf-leather-light);
    border-radius: 12px 12px 6px 6px;
    border-bottom: none;
    background: transparent;
    transition: all 0.4s ease;
  }

  .tp-briefcase-handle::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--rasoaf-leather) 20%, 
      var(--rasoaf-leather-light) 50%, 
      var(--rasoaf-leather) 80%, 
      transparent 100%
    );
    border-radius: 2px;
    opacity: 0.6;
    transition: all 0.4s ease;
  }

  .tp-briefcase-wrapper:hover .tp-briefcase-handle::before {
    border-color: var(--rasoaf-gold-light);
    border-width: 4px;
    width: 75%;
  }

  /* Rivets */
  .tp-briefcase-rivets {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 55%;
    max-width: 140px;
    display: flex;
    justify-content: space-between;
    z-index: 9;
    pointer-events: none;
  }

  .tp-briefcase-rivets::before,
  .tp-briefcase-rivets::after {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--rasoaf-gold);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;
  }

  .tp-briefcase-wrapper:hover .tp-briefcase-rivets::before,
  .tp-briefcase-wrapper:hover .tp-briefcase-rivets::after {
    background: var(--rasoaf-gold-light);
    box-shadow: 0 0 8px rgba(212, 160, 23, 0.5);
    transform: scale(1.3);
  }

  /* Main briefcase body */
  .tp-briefcase-card {
    position: relative;
    background: ${COLORS.white};
    border-radius: 8px 8px 16px 16px;
    padding: clamp(22px, 3vw, 30px) clamp(18px, 2.5vw, 24px);
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: var(--shadow-card);
    outline: none;
    overflow: hidden;
    isolation: isolate;
    min-height: 210px;
    display: flex;
    flex-direction: column;
    border: 1.5px solid rgba(139, 105, 20, 0.15);
  }

  /* Connection dot on top of each briefcase */
  .tp-connection-point {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: var(--rasoaf-gold);
    border-radius: 50%;
    z-index: 15;
    border: 2px solid var(--rasoaf-white);
    box-shadow: 0 0 8px rgba(212, 160, 23, 0.4);
    transition: all 0.4s ease;
  }

  .tp-briefcase-card:hover .tp-connection-point {
    background: var(--rasoaf-gold-light);
    box-shadow: 0 0 16px rgba(247, 201, 72, 0.6);
    transform: translateX(-50%) scale(1.3);
  }

  /* Leather texture */
  .tp-briefcase-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(139, 105, 20, 0.015) 2px, rgba(139, 105, 20, 0.015) 3px
    );
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .tp-briefcase-card:hover::before { opacity: 1; }

  /* Lock/clasp */
  .tp-briefcase-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 8px;
    background: linear-gradient(180deg, var(--rasoaf-gold-light), var(--rasoaf-gold-dark));
    border-radius: 0 0 6px 6px;
    z-index: 3;
    transition: all 0.4s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .tp-briefcase-card:hover::after {
    background: linear-gradient(180deg, var(--rasoaf-gold-light), var(--rasoaf-gold));
    height: 10px;
    box-shadow: 0 3px 10px rgba(212, 160, 23, 0.3);
  }

  /* Stitching */
  .tp-stitching {
    position: absolute;
    inset: 8px;
    border: 1px dashed rgba(139, 105, 20, 0.12);
    border-radius: 4px 4px 12px 12px;
    pointer-events: none;
    z-index: 1;
    transition: all 0.4s ease;
    opacity: 0;
  }

  .tp-briefcase-card:hover .tp-stitching {
    opacity: 1;
    border-color: rgba(212, 160, 23, 0.3);
  }

  .tp-briefcase-card:focus-visible {
    outline: 3px solid var(--rasoaf-gold);
    outline-offset: 4px;
  }

  .tp-briefcase-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(212, 160, 23, 0.35);
  }

  .tp-briefcase-card:active { transform: translateY(-3px); }

  /* Card inner content */
  .tp-briefcase-inner {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 4px;
  }

  /* Step number */
  .tp-step-number {
    position: absolute;
    top: 8px;
    right: 10px;
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    letter-spacing: -0.03em;
    color: rgba(139, 105, 20, 0.05);
    line-height: 1;
    pointer-events: none;
    z-index: 0;
    transition: all 0.4s ease;
    user-select: none;
  }

  .tp-briefcase-card:hover .tp-step-number {
    color: rgba(212, 160, 23, 0.1);
    transform: scale(1.05);
  }

  /* Icon */
  .tp-icon-wrap {
    width: clamp(42px, 5vw, 52px);
    height: clamp(42px, 5vw, 52px);
    min-width: clamp(42px, 5vw, 52px);
    min-height: clamp(42px, 5vw, 52px);
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.06), rgba(247, 201, 72, 0.03));
    border: 1.5px solid rgba(212, 160, 23, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: clamp(14px, 2vh, 20px);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    color: var(--rasoaf-gold);
    flex-shrink: 0;
  }

  .tp-briefcase-card:hover .tp-icon-wrap {
    transform: scale(1.08);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.1), rgba(247, 201, 72, 0.06));
  }

  .tp-icon-wrap svg {
    width: clamp(18px, 2vw, 22px);
    height: clamp(18px, 2vw, 22px);
    flex-shrink: 0;
  }

  /* Title */
  .tp-card-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    letter-spacing: -0.015em;
    line-height: 1.3;
    color: var(--rasoaf-text-primary);
    margin: 0 0 clamp(6px, 1vh, 10px) 0;
    transition: color 0.3s ease;
  }

  .tp-briefcase-card:hover .tp-card-title { color: var(--rasoaf-gold-dark); }

  /* Description */
  .tp-card-desc {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(0.78rem, 1vw, 0.9rem);
    font-weight: 400;
    line-height: 1.6;
    color: var(--rasoaf-text-secondary);
    margin: 0;
    transition: color 0.3s ease;
    flex: 1;
  }

  .tp-briefcase-card:hover .tp-card-desc { color: var(--rasoaf-text-primary); }

  /* ════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS */
  /* ════════════════════════════════════════════════════════════════ */

  @media (min-width: 1920px) {
    .tp-container { max-width: 1500px; }
    .tp-grid { max-width: 1250px; gap: clamp(40px, 5vw, 60px) clamp(28px, 3.5vw, 44px); }
    .tp-briefcase-wrapper { max-width: 370px; }
  }

  @media (min-width: 1600px) and (max-width: 1919px) {
    .tp-container { max-width: 1400px; }
    .tp-grid { max-width: 1180px; gap: clamp(36px, 4.5vw, 52px) clamp(24px, 3vw, 38px); }
    .tp-briefcase-wrapper { max-width: 350px; }
  }

  @media (min-width: 1280px) and (max-width: 1599px) {
    .tp-grid { gap: clamp(30px, 4vw, 46px) clamp(20px, 2.5vw, 34px); }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    .tp-container { max-width: 1050px; }
    .tp-grid { max-width: 950px; gap: clamp(24px, 3vw, 36px) clamp(16px, 2vw, 26px); }
    .tp-briefcase-wrapper { max-width: 300px; padding-top: 24px; }
    .tp-briefcase-card { min-height: 190px; }
    .tp-briefcase-handle { max-width: 140px; height: 24px; }
    .tp-briefcase-handle::before { height: 16px; border-width: 2.5px; }
  }

  @media (min-width: 820px) and (max-width: 1023px) {
    .tp-grid { max-width: 800px; gap: clamp(20px, 2.5vw, 30px) clamp(14px, 1.8vw, 22px); }
    .tp-briefcase-wrapper { max-width: 250px; padding-top: 22px; }
    .tp-briefcase-card { min-height: 180px; padding: 18px; }
    .tp-briefcase-handle { max-width: 120px; height: 22px; }
    .tp-briefcase-card::after { width: 32px; height: 6px; }
    .tp-step-number { font-size: clamp(1.8rem, 2.5vw, 2.5rem); }
  }

  @media (min-width: 768px) and (max-width: 819px) {
    .tp-grid { grid-template-columns: repeat(2, 1fr); max-width: 620px; gap: clamp(30px, 4vw, 44px) clamp(20px, 3vw, 30px); }
    .tp-briefcase-wrapper { max-width: 290px; }
    .tp-journey-line-container { display: none; }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .tp-grid { grid-template-columns: repeat(2, 1fr); max-width: 540px; gap: clamp(22px, 3vw, 32px) clamp(14px, 2vw, 20px); }
    .tp-briefcase-wrapper { max-width: 250px; padding-top: 20px; }
    .tp-briefcase-card { min-height: 170px; padding: 16px; }
    .tp-briefcase-handle { max-width: 110px; height: 20px; }
    .tp-journey-line-container { display: none; }
  }

  @media (max-width: 599px) {
    .tp-grid-wrapper { display: none !important; }
    .tp-carousel { display: block; }
    .tp-section { padding: clamp(36px, 5vh, 56px) 12px; }
    .tp-container { padding: 0 8px; }
    .tp-header { margin-bottom: clamp(24px, 4vh, 40px); }
    .tp-title { font-size: clamp(1.5rem, 5vw, 2rem); }
    .tp-briefcase-wrapper { max-width: 360px; margin: 0 auto; padding-top: 26px; }
    .tp-briefcase-card { min-height: 200px; }
    .tp-briefcase-handle { max-width: 150px; }
  }

  @media (min-width: 375px) and (max-width: 429px) {
    .tp-briefcase-wrapper { max-width: 320px; padding-top: 24px; }
    .tp-carousel { max-width: 380px; }
    .tp-carousel-slide { padding: 10px 16px; }
    .tp-briefcase-card { padding: 18px; }
  }

  @media (min-width: 320px) and (max-width: 374px) {
    .tp-briefcase-wrapper { max-width: 280px; padding-top: 20px; }
    .tp-carousel { max-width: 340px; }
    .tp-carousel-slide { padding: 8px 12px; }
    .tp-briefcase-card { padding: 14px; min-height: 180px; }
    .tp-briefcase-handle { max-width: 100px; height: 18px; }
    .tp-carousel-arrow { width: 32px; height: 32px; }
    .tp-step-number { display: none; }
  }

  @media (hover: none) and (pointer: coarse) {
    .tp-briefcase-card { cursor: default; }
    .tp-briefcase-card:hover { transform: none; box-shadow: var(--shadow-card); }
    .tp-briefcase-card:hover::before { opacity: 0; }
    .tp-briefcase-card:hover .tp-stitching { opacity: 0; }
    .tp-briefcase-card:hover .tp-icon-wrap { transform: none; }
    .tp-briefcase-card:hover .tp-connection-point { transform: translateX(-50%); }
    .tp-briefcase-card:active { transform: scale(0.98); transition: transform 0.1s ease; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .tp-briefcase-card:hover { transform: none !important; }
    .tp-briefcase-card:hover .tp-icon-wrap { transform: none !important; }
  }

  @media (forced-colors: active) {
    .tp-briefcase-card { border: 2px solid CanvasText; }
    .tp-briefcase-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .tp-section { padding: 20px; background: white !important; }
    .tp-carousel { display: none !important; }
    .tp-grid-wrapper { display: block !important; }
    .tp-grid { display: grid !important; }
    .tp-briefcase-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    .tp-title { color: black !important; text-shadow: none !important; }
    .tp-title-accent { -webkit-text-fill-color: black !important; }
    .tp-journey-line-container { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// SVG Journey Line Component
// ══════════════════════════════════════════════════════════════════════════
const JourneyLine = memo(({ isVisible }) => {
  const prefersReducedMotion = useReducedMotion();

  // Path that connects all 6 briefcases in a snake pattern (2 rows of 3)
  const journeyPath = `
    M 5%,85% 
    C 10%,50% 20%,20% 50%,15%
    C 70%,12% 80%,20% 85%,15%
    L 85%,85%
    C 80%,70% 70%,80% 50%,85%
    C 30%,88% 20%,80% 15%,85%
    L 5%,85%
  `;

  return (
    <div className="tp-journey-line-container" aria-hidden="true">
      <svg
        className="tp-journey-line-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main path with gradient */}
        <defs>
          <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.goldLight} stopOpacity="0.3" />
            <stop offset="30%" stopColor={COLORS.gold} stopOpacity="0.5" />
            <stop offset="50%" stopColor={COLORS.goldLight} stopOpacity="0.7" />
            <stop offset="70%" stopColor={COLORS.gold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={COLORS.goldLight} stopOpacity="0.3" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting path */}
        <motion.path
          d={journeyPath}
          stroke="url(#journeyGradient)"
          strokeWidth="0.3"
          strokeDasharray="2 4"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { 
            duration: 2, 
            delay: 0.5, 
            ease: "easeInOut" 
          }}
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        />

        {/* Animated traveling dot */}
        {isVisible && !prefersReducedMotion && (
          <motion.circle
            r="1.5"
            fill={COLORS.goldLight}
            className="tp-journey-dot"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
            style={{ offsetPath: `path("${journeyPath}")` }}
          />
        )}
      </svg>
    </div>
  );
});

JourneyLine.displayName = "JourneyLine";

// ══════════════════════════════════════════════════════════════════════════
// Memoized Briefcase Card Component
// ══════════════════════════════════════════════════════════════════════════
const ProcessCard = memo(({ step, index, isCarousel = false }) => {
  const Icon = step.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [iconSize, setIconSize] = useState(22);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 375) setIconSize(18);
      else if (width < 600) setIconSize(20);
      else setIconSize(22);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.click();
    }
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.88, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: {
        duration: 0.8, delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.6 },
        filter: { duration: 0.7 },
      },
    },
  };

  const cardContent = (
    <div className="tp-briefcase-wrapper">
      <div className="tp-briefcase-handle" aria-hidden="true" />
      <div className="tp-briefcase-rivets" aria-hidden="true" />
      <div className="tp-briefcase-card">
        {/* Connection point for the journey line */}
        <div className="tp-connection-point" aria-hidden="true" />
        <div className="tp-stitching" aria-hidden="true" />
        <div className="tp-step-number" aria-hidden="true">{step.step}</div>
        <div className="tp-briefcase-inner">
          <div className="tp-icon-wrap" aria-hidden="true">
            <Icon size={iconSize} strokeWidth={1.5} />
          </div>
          <h3 className="tp-card-title">{step.title}</h3>
          <p className="tp-card-desc">{step.desc}</p>
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <motion.div
        role="listitem"
        aria-label={`Step ${index + 1}: ${step.title} - ${step.desc}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className="tp-scroll-reveal" ref={cardRef}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        role="listitem"
        aria-label={`Step ${index + 1}: ${step.title} - ${step.desc}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        {cardContent}
      </motion.div>
    </div>
  );
});

ProcessCard.displayName = "ProcessCard";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel Component
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(({ steps }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % steps.length), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, steps.length]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const prev = useCallback(() => setCurrent((p) => (p - 1 + steps.length) % steps.length), [steps.length]);
  const next = useCallback(() => setCurrent((p) => (p + 1) % steps.length), [steps.length]);
  const handleManualNav = useCallback((i) => { setCurrent(i); startTimer(); }, [startTimer]);

  const handleTouchStart = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const handleTouchMove = useCallback((e) => { setTouchEnd(e.touches[0].clientX); }, []);
  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > SWIPE_THRESHOLD) next();
    else if (d < -SWIPE_THRESHOLD) prev();
    setTouchStart(null); setTouchEnd(null);
    startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev, startTimer]);

  const progressPercent = ((current + 1) / steps.length) * 100;

  return (
    <div className="tp-carousel" role="region" aria-label="Travel process carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="sr-only" role="status" aria-live="polite">Step {current + 1} of {steps.length}: {steps[current].title}</div>
      <motion.div className="tp-carousel-track" animate={{ x: `${-current * 100}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 35 }}>
        {steps.map((s, i) => <div key={s.step} className="tp-carousel-slide"><ProcessCard step={s} index={i} isCarousel={true} /></div>)}
      </motion.div>
      <button className="tp-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous step"><ChevronLeft size={18} /></button>
      <button className="tp-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next step"><ChevronRight size={18} /></button>
      <div className="tp-carousel-dots" role="tablist">
        {steps.map((_, i) => <button key={i} className={`tp-carousel-dot ${i === current ? "active" : ""}`}
          onClick={() => handleManualNav(i)} role="tab" aria-selected={i === current} aria-label={`Step ${i + 1}`} />)}
      </div>
      
      {/* Mobile Progress Line */}
      <div className="tp-mobile-progress">
        <Flag size={10} color={COLORS.goldLight} />
        <div className="tp-mobile-progress-line">
          <div className="tp-mobile-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <Star size={10} color={COLORS.goldLight} />
      </div>
      
      <div className="tp-swipe-indicator" aria-hidden="true">← Swipe to navigate →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
});

MobileCarousel.displayName = "MobileCarousel";

// ══════════════════════════════════════════════════════════════════════════
// Main TravelProcess Component
// ══════════════════════════════════════════════════════════════════════════
const TravelProcess = memo(function TravelProcess() {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }), []);

  return (
    <>
      <style>{STYLES}</style>
      <section className="tp-section" ref={sectionRef} aria-label="Our travel process - 6 simple steps">
        <div className="tp-container">
          <motion.div ref={headerRef} className="tp-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="tp-eyebrow" aria-hidden="true"><Plane size={12} /> How It Works</div>
            <h2 className="tp-title" id="tp-heading">Your Travel <span className="tp-title-accent">Journey</span></h2>
          </motion.div>
          
          <div className="tp-grid-wrapper">
            <div className="tp-grid" role="list" aria-label="Travel process steps">
              {/* SVG Journey Line - connects all briefcases */}
              <JourneyLine isVisible={isSectionInView} />
              
              {PROCESS_STEPS.map((step, idx) => (
                <ProcessCard key={step.step} step={step} index={idx} isCarousel={false} />
              ))}
            </div>
          </div>
          
          <MobileCarousel steps={PROCESS_STEPS} />
        </div>
      </section>
    </>
  );
});

TravelProcess.displayName = "TravelProcess";

export default TravelProcess;