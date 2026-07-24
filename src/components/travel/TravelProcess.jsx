// src/components/travel/TravelProcess.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Travel Process (v7)
// Briefcase-shaped cards · Connecting journey line · Scroll reveal · Premium luxury
// Glass morphism · Gold accents · Magnetic hover · Perfectly responsive
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useMemo, useCallback, memo, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { 
  Search, Users, MapPin, Ticket, Plane, Star, 
  ChevronLeft, ChevronRight, Flag, Sparkles, Compass 
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const PROCESS_STEPS = Object.freeze([
  {
    icon: Search,
    title: "Discover",
    desc: "Explore destinations and find the perfect travel experience for your needs.",
    step: "01",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    glowColor: "rgba(102, 126, 234, 0.3)",
  },
  {
    icon: Users,
    title: "Consult",
    desc: "Speak with our travel experts who provide personalized recommendations.",
    step: "02",
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
    glowColor: "rgba(13, 148, 136, 0.3)",
  },
  {
    icon: MapPin,
    title: "Plan",
    desc: "We design a customized itinerary tailored to your preferences and budget.",
    step: "03",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    glowColor: "rgba(124, 58, 237, 0.3)",
  },
  {
    icon: Ticket,
    title: "Book",
    desc: "Secure your flights, hotels, and activities with our seamless booking system.",
    step: "04",
    color: "#DC2626",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    glowColor: "rgba(220, 38, 38, 0.3)",
  },
  {
    icon: Plane,
    title: "Travel",
    desc: "Embark on your journey with confidence, supported by our 24/7 assistance.",
    step: "05",
    color: "#0284C7",
    gradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    glowColor: "rgba(2, 132, 199, 0.3)",
  },
  {
    icon: Star,
    title: "Enjoy",
    desc: "Create unforgettable memories with a stress-free, expertly managed trip.",
    step: "06",
    color: "#E11D48",
    gradient: "linear-gradient(135deg, #E11D48 0%, #EC4899 100%)",
    glowColor: "rgba(225, 29, 72, 0.3)",
  },
]);

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

const TOKENS = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  cream: "#FFFDF8",
  textPrimary: "#0A0F1A",
  textSecondary: "#5F5F5F",
  leather: "#8B6914",
  leatherLight: "#C4A44A",
  bgLight: "#FAFAFA",
};

const TYPOGRAPHY = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
};

// ══════════════════════════════════════════════════════════════════════════
// Enterprise CSS — Briefcase Cards with Luxury Design
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .tpx-section {
    --tpx-gold: ${TOKENS.gold};
    --tpx-gold-light: ${TOKENS.goldLight};
    --tpx-gold-dark: ${TOKENS.goldDark};
    --tpx-white: ${TOKENS.white};
    --tpx-cream: ${TOKENS.cream};
    --tpx-text-primary: ${TOKENS.textPrimary};
    --tpx-text-secondary: ${TOKENS.textSecondary};
    --tpx-leather: ${TOKENS.leather};
    --tpx-leather-light: ${TOKENS.leatherLight};
    --tpx-bg-light: ${TOKENS.bgLight};
    --tpx-font-display: ${TYPOGRAPHY.display};
    --tpx-font-body: ${TYPOGRAPHY.body};
    --tpx-shadow-card: 0 2px 16px rgba(0, 0, 0, 0.06);
    --tpx-shadow-hover: 0 16px 48px rgba(0, 0, 0, 0.12);
    --tpx-transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    --tpx-transition-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tpx-section,
  .tpx-section *,
  .tpx-section *::before,
  .tpx-section *::after {
    box-sizing: border-box;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SECTION · Premium White Background                                   */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
    background: var(--tpx-white);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    contain: layout paint style;
  }

  /* Subtle texture overlay */
  .tpx-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 15% 30%, rgba(212,160,23,0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 70%, rgba(247,201,72,0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.01) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .tpx-container {
    max-width: 1300px;
    width: 100%;
    margin: 0 auto;
    padding: 0 clamp(16px, 3vw, 40px);
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · Premium Typography                                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-header {
    text-align: center;
    margin-bottom: clamp(48px, 8vh, 72px);
    width: 100%;
    position: relative;
  }

  .tpx-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 22px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 100px;
    font-family: var(--tpx-font-body);
    font-size: clamp(0.65rem, 0.85vw, 0.75rem);
    font-weight: 700;
    color: var(--tpx-gold-dark);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: clamp(16px, 2.5vh, 24px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .tpx-eyebrow:hover {
    background: rgba(212, 160, 23, 0.1);
    border-color: rgba(212, 160, 23, 0.25);
    transform: translateY(-1px);
  }

  .tpx-eyebrow svg {
    color: var(--tpx-gold);
    flex-shrink: 0;
  }

  .tpx-title {
    font-family: var(--tpx-font-display);
    font-weight: 800;
    font-size: clamp(2.2rem, 5vw, 3.6rem);
    letter-spacing: -0.03em;
    line-height: 1.12;
    color: var(--tpx-text-primary);
    margin: 0;
    overflow-wrap: break-word;
    max-width: 100%;
  }

  .tpx-title-accent {
    background: linear-gradient(135deg, var(--tpx-gold-light) 0%, var(--tpx-gold) 50%, var(--tpx-gold-dark) 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: tpx-shimmer 4s ease-in-out infinite;
  }

  @keyframes tpx-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GRID WITH CONNECTING LINE                                            */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    position: relative;
  }

  .tpx-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(36px, 5vw, 60px) clamp(24px, 3vw, 40px);
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    justify-items: center;
    align-items: start;
    position: relative;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SVG CONNECTING JOURNEY LINE                                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-journey-line-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
    overflow: visible;
  }

  .tpx-journey-line-svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .tpx-journey-dot {
    filter: drop-shadow(0 0 8px rgba(247, 201, 72, 0.8));
  }

  .tpx-journey-start,
  .tpx-journey-end {
    position: absolute;
    filter: drop-shadow(0 0 10px rgba(212, 160, 23, 0.6));
  }

  .tpx-scroll-reveal {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL                                                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-carousel {
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
  }

  .tpx-carousel-track {
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    align-items: center;
  }

  .tpx-carousel-slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 12px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tpx-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--tpx-white);
    border: 1px solid rgba(212, 160, 23, 0.25);
    color: var(--tpx-gold-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    outline: none;
  }

  .tpx-carousel-arrow::before {
    content: '';
    position: absolute;
    inset: -8px;
  }

  .tpx-carousel-arrow:hover {
    background: var(--tpx-gold-light);
    color: var(--tpx-white);
    border-color: var(--tpx-gold);
    box-shadow: 0 6px 20px rgba(212, 160, 23, 0.2);
  }

  .tpx-carousel-arrow:focus-visible {
    outline: 2px solid var(--tpx-gold);
    outline-offset: 2px;
  }

  .tpx-carousel-arrow.prev { left: 0; }
  .tpx-carousel-arrow.next { right: 0; }

  .tpx-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 8px 0;
  }

  .tpx-carousel-dot {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    padding: 0;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    outline: none;
  }

  .tpx-carousel-dot::before {
    content: '';
    position: absolute;
    inset: -8px;
  }

  .tpx-carousel-dot:hover {
    background: rgba(0, 0, 0, 0.25);
  }

  .tpx-carousel-dot.active {
    width: 32px;
    background: linear-gradient(135deg, var(--tpx-gold-light), var(--tpx-gold));
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(212, 160, 23, 0.35);
  }

  .tpx-carousel-dot:focus-visible {
    outline: 2px solid var(--tpx-gold);
    outline-offset: 3px;
  }

  .tpx-swipe-indicator {
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
    font-family: var(--tpx-font-body);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 8px;
  }

  /* Mobile progress line */
  .tpx-mobile-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
    padding: 0 20px;
  }

  .tpx-mobile-progress-line {
    flex: 1;
    height: 3px;
    background: rgba(0, 0, 0, 0.08);
    position: relative;
    border-radius: 2px;
    overflow: hidden;
  }

  .tpx-mobile-progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, var(--tpx-gold-light), var(--tpx-gold));
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* BRIEFCASE-SHAPED CARD · Premium Luxury Design                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .tpx-briefcase-wrapper {
    position: relative;
    width: 100%;
    max-width: 340px;
    padding-top: 28px;
  }

  /* Handle */
  .tpx-briefcase-handle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    max-width: 160px;
    height: 28px;
    z-index: 10;
    transition: all 0.5s var(--tpx-transition-bounce);
  }

  .tpx-briefcase-handle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 20px;
    border: 3px solid var(--tpx-leather-light);
    border-radius: 12px 12px 6px 6px;
    border-bottom: none;
    background: transparent;
    transition: all 0.5s ease;
  }

  .tpx-briefcase-handle::after {
    content: '';
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 4px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      var(--tpx-leather) 20%, 
      var(--tpx-leather-light) 50%, 
      var(--tpx-leather) 80%, 
      transparent 100%
    );
    border-radius: 2px;
    opacity: 0.6;
    transition: all 0.5s ease;
  }

  .tpx-briefcase-wrapper:hover .tpx-briefcase-handle::before {
    border-color: var(--tpx-gold-light);
    border-width: 4px;
    width: 75%;
  }

  .tpx-briefcase-wrapper:hover .tpx-briefcase-handle::after {
    opacity: 1;
    width: 50%;
  }

  /* Rivets */
  .tpx-briefcase-rivets {
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

  .tpx-briefcase-rivets::before,
  .tpx-briefcase-rivets::after {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--tpx-gold);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.5s var(--tpx-transition-bounce);
  }

  .tpx-briefcase-wrapper:hover .tpx-briefcase-rivets::before,
  .tpx-briefcase-wrapper:hover .tpx-briefcase-rivets::after {
    background: var(--tpx-gold-light);
    box-shadow: 0 0 12px rgba(212, 160, 23, 0.5);
    transform: scale(1.35);
  }

  /* Main briefcase body */
  .tpx-briefcase-card {
    position: relative;
    background: var(--tpx-white);
    border-radius: 8px 8px 18px 18px;
    padding: clamp(24px, 3.5vw, 32px) clamp(18px, 2.5vw, 26px);
    cursor: pointer;
    transition: all 0.6s var(--tpx-transition-smooth);
    box-shadow: var(--tpx-shadow-card);
    outline: none;
    overflow: hidden;
    isolation: isolate;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    border: 1.5px solid rgba(139, 105, 20, 0.12);
  }

  /* Connection dot on top */
  .tpx-connection-point {
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 14px;
    height: 14px;
    background: var(--tpx-gold);
    border-radius: 50%;
    z-index: 15;
    border: 2.5px solid var(--tpx-white);
    box-shadow: 0 0 12px rgba(212, 160, 23, 0.4), 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.5s var(--tpx-transition-bounce);
  }

  .tpx-connection-point::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 1px solid rgba(212, 160, 23, 0.25);
    animation: tpx-pulse-ring 2.5s ease-out infinite;
  }

  @keyframes tpx-pulse-ring {
    0% { transform: scale(1); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  .tpx-briefcase-card:hover .tpx-connection-point {
    background: var(--tpx-gold-light);
    box-shadow: 0 0 20px rgba(247, 201, 72, 0.7), 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateX(-50%) scale(1.3);
  }

  /* Leather texture on hover */
  .tpx-briefcase-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(139, 105, 20, 0.02) 2px, rgba(139, 105, 20, 0.02) 3px
    );
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .tpx-briefcase-card:hover::before { opacity: 1; }

  /* Lock/clasp */
  .tpx-briefcase-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 44px;
    height: 9px;
    background: linear-gradient(180deg, var(--tpx-gold-light), var(--tpx-gold-dark));
    border-radius: 0 0 7px 7px;
    z-index: 3;
    transition: all 0.5s var(--tpx-transition-bounce);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .tpx-briefcase-card:hover::after {
    background: linear-gradient(180deg, var(--tpx-gold-light), var(--tpx-gold));
    height: 11px;
    width: 50px;
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.35);
  }

  /* Stitching */
  .tpx-stitching {
    position: absolute;
    inset: 8px;
    border: 1px dashed rgba(139, 105, 20, 0.1);
    border-radius: 4px 4px 14px 14px;
    pointer-events: none;
    z-index: 1;
    transition: all 0.5s ease;
    opacity: 0;
  }

  .tpx-briefcase-card:hover .tpx-stitching {
    opacity: 1;
    border-color: rgba(212, 160, 23, 0.3);
  }

  .tpx-briefcase-card:focus-visible {
    outline: 3px solid var(--tpx-gold);
    outline-offset: 4px;
  }

  .tpx-briefcase-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--tpx-shadow-hover), 0 0 0 1px rgba(212, 160, 23, 0.08);
    border-color: rgba(212, 160, 23, 0.3);
  }

  .tpx-briefcase-card:active { transform: translateY(-3px) scale(0.99); }

  /* Card inner content */
  .tpx-briefcase-inner {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 4px;
  }

  /* Step number watermark */
  .tpx-step-number {
    position: absolute;
    top: 10px;
    right: 14px;
    font-family: var(--tpx-font-display);
    font-weight: 800;
    font-size: clamp(2.4rem, 3.8vw, 3.2rem);
    letter-spacing: -0.04em;
    color: rgba(139, 105, 20, 0.04);
    line-height: 1;
    pointer-events: none;
    z-index: 0;
    transition: all 0.5s ease;
    user-select: none;
  }

  .tpx-briefcase-card:hover .tpx-step-number {
    color: rgba(212, 160, 23, 0.1);
    transform: translateY(-3px) scale(1.05);
  }

  /* Icon */
  .tpx-icon-wrap {
    width: clamp(44px, 5.5vw, 56px);
    height: clamp(44px, 5.5vw, 56px);
    min-width: clamp(44px, 5.5vw, 56px);
    min-height: clamp(44px, 5.5vw, 56px);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.05), rgba(247, 201, 72, 0.02));
    border: 1.5px solid rgba(212, 160, 23, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: clamp(16px, 2.5vh, 22px);
    transition: all 0.5s var(--tpx-transition-bounce);
    color: var(--tpx-gold);
    flex-shrink: 0;
  }

  .tpx-briefcase-card:hover .tpx-icon-wrap {
    transform: scale(1.1) rotate(-3deg);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 6px 20px rgba(212, 160, 23, 0.12);
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.1), rgba(247, 201, 72, 0.05));
  }

  .tpx-icon-wrap svg {
    width: clamp(19px, 2.2vw, 24px);
    height: clamp(19px, 2.2vw, 24px);
    flex-shrink: 0;
  }

  /* Title */
  .tpx-card-title {
    font-family: var(--tpx-font-display);
    font-weight: 800;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    letter-spacing: -0.02em;
    line-height: 1.3;
    color: var(--tpx-text-primary);
    margin: 0 0 clamp(8px, 1.2vh, 12px) 0;
    transition: color 0.4s ease;
  }

  .tpx-briefcase-card:hover .tpx-card-title { 
    color: var(--tpx-gold-dark); 
  }

  /* Description */
  .tpx-card-desc {
    font-family: var(--tpx-font-body);
    font-size: clamp(0.78rem, 1vw, 0.9rem);
    font-weight: 400;
    line-height: 1.65;
    color: var(--tpx-text-secondary);
    margin: 0;
    transition: color 0.4s ease;
    flex: 1;
  }

  .tpx-briefcase-card:hover .tpx-card-desc { 
    color: var(--tpx-text-primary); 
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS                                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  /* Desktop & Tablet: Show Grid, Hide Carousel */
  @media (min-width: 600px) {
    .tpx-grid-wrapper { display: flex; }
    .tpx-carousel { display: none; }
  }

  @media (min-width: 1920px) {
    .tpx-container { max-width: 1500px; }
    .tpx-grid { max-width: 1250px; gap: clamp(44px, 5.5vw, 64px) clamp(30px, 4vw, 48px); }
    .tpx-briefcase-wrapper { max-width: 370px; }
  }

  @media (min-width: 1600px) and (max-width: 1919px) {
    .tpx-container { max-width: 1400px; }
    .tpx-grid { max-width: 1180px; gap: clamp(40px, 5vw, 56px) clamp(26px, 3.5vw, 42px); }
    .tpx-briefcase-wrapper { max-width: 350px; }
  }

  @media (min-width: 1280px) and (max-width: 1599px) {
    .tpx-grid { gap: clamp(34px, 4.2vw, 50px) clamp(22px, 2.8vw, 36px); }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    .tpx-container { max-width: 1050px; }
    .tpx-grid { max-width: 950px; gap: clamp(26px, 3.2vw, 40px) clamp(16px, 2vw, 28px); }
    .tpx-briefcase-wrapper { max-width: 300px; padding-top: 24px; }
    .tpx-briefcase-card { min-height: 200px; }
    .tpx-briefcase-handle { max-width: 140px; height: 24px; }
    .tpx-briefcase-handle::before { height: 16px; border-width: 2.5px; }
  }

  @media (min-width: 820px) and (max-width: 1023px) {
    .tpx-grid { max-width: 800px; gap: clamp(22px, 2.8vw, 32px) clamp(14px, 1.8vw, 22px); }
    .tpx-briefcase-wrapper { max-width: 250px; padding-top: 22px; }
    .tpx-briefcase-card { min-height: 190px; padding: 20px 16px; }
    .tpx-briefcase-handle { max-width: 120px; height: 22px; }
    .tpx-briefcase-card::after { width: 34px; height: 7px; }
    .tpx-step-number { font-size: clamp(1.8rem, 2.5vw, 2.5rem); }
  }

  @media (min-width: 768px) and (max-width: 819px) {
    .tpx-grid { grid-template-columns: repeat(2, 1fr); max-width: 620px; gap: clamp(32px, 4vw, 48px) clamp(22px, 3vw, 34px); }
    .tpx-briefcase-wrapper { max-width: 290px; }
    .tpx-journey-line-container { display: none; }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .tpx-grid { grid-template-columns: repeat(2, 1fr); max-width: 540px; gap: clamp(22px, 3vw, 34px) clamp(14px, 2vw, 22px); }
    .tpx-briefcase-wrapper { max-width: 250px; padding-top: 20px; }
    .tpx-briefcase-card { min-height: 180px; padding: 18px 14px; }
    .tpx-briefcase-handle { max-width: 110px; height: 20px; }
    .tpx-journey-line-container { display: none; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE · 599px and below — Show Carousel                             */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 599px) {
    .tpx-grid-wrapper { display: none !important; }
    .tpx-carousel { display: block; }
    .tpx-section { padding: clamp(40px, 6vh, 64px) 12px; }
    .tpx-container { padding: 0 8px; }
    .tpx-header { margin-bottom: clamp(28px, 4vh, 44px); }
    .tpx-title { font-size: clamp(1.6rem, 5.5vw, 2.2rem); }
    .tpx-briefcase-wrapper { max-width: 380px; margin: 0 auto; padding-top: 26px; }
    .tpx-briefcase-card { min-height: 210px; }
    .tpx-briefcase-handle { max-width: 150px; }
  }

  @media (min-width: 430px) and (max-width: 599px) {
    .tpx-briefcase-wrapper { max-width: 360px; }
    .tpx-carousel { max-width: 400px; }
  }

  @media (min-width: 375px) and (max-width: 429px) {
    .tpx-briefcase-wrapper { max-width: 320px; padding-top: 24px; }
    .tpx-carousel { max-width: 360px; }
    .tpx-carousel-slide { padding: 10px 16px; }
    .tpx-briefcase-card { padding: 20px 16px; }
  }

  @media (min-width: 320px) and (max-width: 374px) {
    .tpx-briefcase-wrapper { max-width: 280px; padding-top: 20px; }
    .tpx-carousel { max-width: 320px; }
    .tpx-carousel-slide { padding: 8px 12px; }
    .tpx-briefcase-card { padding: 16px 12px; min-height: 190px; }
    .tpx-briefcase-handle { max-width: 100px; height: 18px; }
    .tpx-carousel-arrow { width: 36px; height: 36px; }
    .tpx-step-number { display: none; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* TOUCH DEVICES                                                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (hover: none) and (pointer: coarse) {
    .tpx-briefcase-card { cursor: default; }
    .tpx-briefcase-card:hover { 
      transform: none; 
      box-shadow: var(--tpx-shadow-card);
      border-color: rgba(139, 105, 20, 0.12);
    }
    .tpx-briefcase-card:hover::before { opacity: 0; }
    .tpx-briefcase-card:hover .tpx-stitching { opacity: 0; }
    .tpx-briefcase-card:hover .tpx-icon-wrap { transform: none; }
    .tpx-briefcase-card:hover .tpx-connection-point { transform: translateX(-50%); }
    .tpx-briefcase-card:active { 
      transform: scale(0.97); 
      transition: transform 0.1s ease; 
      border-color: rgba(212, 160, 23, 0.3);
      box-shadow: var(--tpx-shadow-hover);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .tpx-section,
    .tpx-section *,
    .tpx-section *::before,
    .tpx-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .tpx-briefcase-card:hover { transform: none !important; }
    .tpx-briefcase-card:hover .tpx-icon-wrap { transform: none !important; }
    .tpx-connection-point::after { display: none !important; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HIGH CONTRAST & PRINT                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (forced-colors: active) {
    .tpx-briefcase-card { border: 2px solid CanvasText; }
    .tpx-briefcase-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .tpx-section { padding: 20px; background: white !important; }
    .tpx-carousel { display: none !important; }
    .tpx-grid-wrapper { display: block !important; }
    .tpx-grid { display: grid !important; }
    .tpx-briefcase-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    .tpx-journey-line-container { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// SVG Journey Line Component
// ══════════════════════════════════════════════════════════════════════════
const JourneyLine = memo(({ isVisible }) => {
  const prefersReducedMotion = useReducedMotion();

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
    <div className="tpx-journey-line-container" aria-hidden="true">
      <svg
        className="tpx-journey-line-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="tpx-journey-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={TOKENS.goldLight} stopOpacity="0.25" />
            <stop offset="25%" stopColor={TOKENS.gold} stopOpacity="0.5" />
            <stop offset="50%" stopColor={TOKENS.goldLight} stopOpacity="0.7" />
            <stop offset="75%" stopColor={TOKENS.gold} stopOpacity="0.5" />
            <stop offset="100%" stopColor={TOKENS.goldLight} stopOpacity="0.25" />
          </linearGradient>
          <filter id="tpx-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={journeyPath}
          stroke="url(#tpx-journey-grad)"
          strokeWidth="0.35"
          strokeDasharray="3 5"
          filter="url(#tpx-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isVisible ? { pathLength: 1, opacity: 1 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { 
            duration: 2.2, 
            delay: 0.6, 
            ease: "easeInOut" 
          }}
          style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
        />

        {isVisible && !prefersReducedMotion && (
          <motion.circle
            r="1.8"
            fill={TOKENS.goldLight}
            className="tpx-journey-dot"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.8,
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
      const w = window.innerWidth;
      if (w < 375) setIconSize(18);
      else if (w < 600) setIconSize(20);
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
    hidden: { opacity: 0, y: 80, scale: 0.9, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: {
        duration: 0.75, delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
        filter: { duration: 0.6 },
      },
    },
  };

  const cardContent = (
    <div className="tpx-briefcase-wrapper">
      <div className="tpx-briefcase-handle" aria-hidden="true" />
      <div className="tpx-briefcase-rivets" aria-hidden="true" />
      <div className="tpx-briefcase-card">
        <div className="tpx-connection-point" aria-hidden="true" />
        <div className="tpx-stitching" aria-hidden="true" />
        <div className="tpx-step-number" aria-hidden="true">{step.step}</div>
        <div className="tpx-briefcase-inner">
          <div className="tpx-icon-wrap" aria-hidden="true">
            <Icon size={iconSize} strokeWidth={1.5} />
          </div>
          <h3 className="tpx-card-title">{step.title}</h3>
          <p className="tpx-card-desc">{step.desc}</p>
        </div>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <motion.div
        role="listitem"
        aria-label={`Step ${index + 1}: ${step.title} — ${step.desc}`}
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
    <div className="tpx-scroll-reveal" ref={cardRef}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        role="listitem"
        aria-label={`Step ${index + 1}: ${step.title} — ${step.desc}`}
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
    <div className="tpx-carousel" role="region" aria-label="Travel process carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="sr-only" role="status" aria-live="polite">Step {current + 1} of {steps.length}: {steps[current].title}</div>
      <motion.div className="tpx-carousel-track" animate={{ x: `${-current * 100}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 35 }}>
        {steps.map((s, i) => <div key={s.step} className="tpx-carousel-slide"><ProcessCard step={s} index={i} isCarousel={true} /></div>)}
      </motion.div>
      <button className="tpx-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous step" type="button"><ChevronLeft size={18} /></button>
      <button className="tpx-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next step" type="button"><ChevronRight size={18} /></button>
      <div className="tpx-carousel-dots" role="tablist" aria-label="Step navigation">
        {steps.map((_, i) => <button key={i} className={`tpx-carousel-dot ${i === current ? "active" : ""}`}
          onClick={() => handleManualNav(i)} role="tab" aria-selected={i === current} aria-label={`Go to step ${i + 1}`} type="button" />)}
      </div>
      <div className="tpx-mobile-progress" aria-hidden="true">
        <Flag size={12} color={TOKENS.goldLight} />
        <div className="tpx-mobile-progress-line">
          <div className="tpx-mobile-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <Star size={12} color={TOKENS.goldLight} />
      </div>
      <div className="tpx-swipe-indicator" aria-hidden="true">← Swipe to navigate →</div>
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
      <section className="tpx-section" ref={sectionRef} aria-label="Our travel process — 6 simple steps">
        <div className="tpx-container">
          <motion.div ref={headerRef} className="tpx-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="tpx-eyebrow">
              <Compass size={14} />
              <span>How It Works</span>
              <Sparkles size={14} />
            </div>
            <h2 className="tpx-title">Your Travel <span className="tpx-title-accent">Journey</span></h2>
          </motion.div>
          
          <div className="tpx-grid-wrapper">
            <div className="tpx-grid" role="list" aria-label="Travel process steps">
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