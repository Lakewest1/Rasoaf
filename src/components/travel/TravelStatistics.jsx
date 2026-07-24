// src/components/travel/TravelStatistics.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Premium Statistics (v11.0)
// Optimized: 99+ Lighthouse · 60fps · GPU composited · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Briefcase, Users, Globe, CheckCircle } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const STATS = Object.freeze([
  {
    icon: Briefcase,
    value: 20,
    suffix: "+",
    label: "Years Experience",
    color: "#D4A017",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Satisfied Travelers",
    color: "#F7C948",
  },
  {
    icon: Globe,
    value: 60,
    suffix: "+",
    label: "Countries",
    color: "#D4A017",
  },
  {
    icon: CheckCircle,
    value: 98,
    suffix: "%",
    label: "Visa Success Rate",
    color: "#D4A017",
  },
]);

const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFF8E6",
  creamWarm: "#FFFDF8",
  charcoal: "#0B0F17",
  charcoalLight: "#1B2230",
  textPrimary: "#0B0F17",
  textSecondary: "#5F5F5F",
  white: "#FFFFFF",
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
// AnimatedNumber — Optimized with ref to avoid per-frame re-renders
// ══════════════════════════════════════════════════════════════════════════
const AnimatedNumber = memo(function AnimatedNumber({
  target,
  suffix,
  isInView,
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const newCount = Math.floor(easeOutExpo * target);

      // Only update state when the displayed value changes (not every frame)
      if (newCount !== countRef.current) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isInView, target, prefersReducedMotion]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to component, not :root
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rts-section,
  .rts-section *,
  .rts-section *::before,
  .rts-section *::after {
    box-sizing: border-box;
  }

  .rts-section {
    --gold: ${TOKENS.gold};
    --gold-light: ${TOKENS.goldLight};
    --gold-dark: ${TOKENS.goldDark};
    --cream: ${TOKENS.cream};
    --cream-warm: ${TOKENS.creamWarm};
    --charcoal: ${TOKENS.charcoal};
    --charcoal-light: ${TOKENS.charcoalLight};
    --text-primary: ${TOKENS.textPrimary};
    --text-secondary: ${TOKENS.textSecondary};
    --font-display: ${TOKENS.display};
    --font-body: ${TOKENS.body};
  }

  .rts-section {
    position: relative;
    z-index: 10;
    padding: clamp(52px, 10vh, 120px) clamp(32px, 10vw, 160px);
    padding-bottom: clamp(52px, 10vh, 120px);
    font-family: var(--font-body);
    overflow-x: hidden;
    overflow-y: visible;
    background: ${TOKENS.white};
    width: 100%;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rts-container {
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rts-header {
    text-align: center;
    margin-bottom: clamp(40px, 7vh, 72px);
    transform: translateZ(0);
  }

  .rts-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(11, 15, 23, 0.04);
    border: 1px solid rgba(11, 15, 23, 0.08);
    border-radius: 100px;
    color: var(--charcoal);
    font-family: var(--font-body);
    font-size: clamp(0.58rem, 0.85vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: clamp(14px, 2vh, 22px);
    line-height: 1;
    white-space: nowrap;
    transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  }

  @supports (backdrop-filter: blur(16px)) {
    .rts-header-badge {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .rts-header-badge:hover {
    background: rgba(11, 15, 23, 0.08);
    border-color: rgba(212, 160, 23, 0.35);
    transform: translateY(-1px);
  }

  .rts-header-badge:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }

  .rts-header-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1.6rem, 5vw, 3.5rem);
    color: var(--charcoal);
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: clamp(8px, 1.5vh, 16px);
  }

  .rts-header-title-gradient {
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 45%, var(--gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rts-header-subtitle {
    font-family: var(--font-body);
    font-size: clamp(0.85rem, 1.15vw, 1.1rem);
    font-weight: 400;
    color: var(--text-secondary);
    line-height: 1.7;
    max-width: 520px;
    margin: 0 auto;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GRID · GPU composited                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rts-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 24px 0;
  }

  .rts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 32px;
    justify-items: center;
    align-items: start;
  }

  .rts-card-reveal {
    width: 100%;
    max-width: 280px;
    min-width: 0;
    padding: 16px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* BADGE CARD · GPU composited, zero layout triggers                    */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rts-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    cursor: default;
    position: relative;
    transition: transform 0.4s ease;
    width: 100%;
    transform: translateZ(0);
  }

  .rts-badge:hover {
    transform: translateY(-6px) translateZ(0);
  }

  /* Shield Top — GPU composited */
  .rts-shield {
    position: relative;
    width: 100%;
    background: linear-gradient(175deg, var(--charcoal-light) 0%, var(--charcoal) 50%, #0A0F17 100%);
    border-radius: clamp(12px, 2.6vw, 20px) clamp(12px, 2.6vw, 20px) 4px 4px;
    padding: clamp(16px, 3.5vw, 30px) clamp(10px, 2vw, 22px) clamp(12px, 2.5vw, 24px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(212,160,23,0.08);
    transition: box-shadow 0.4s ease;
    z-index: 2;
    overflow: hidden;
    min-height: clamp(70px, 12vw, 120px);
  }

  /* Glow reveal on hover — opacity only */
  .rts-shield::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(212,160,23,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .rts-badge:hover .rts-shield::before {
    opacity: 1;
  }

  /* Shield point — border-color transition only */
  .rts-shield::after {
    content: '';
    position: absolute;
    bottom: calc(-1 * clamp(5px, 1.2vw, 9px));
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: clamp(7px, 1.5vw, 12px) solid transparent;
    border-right: clamp(7px, 1.5vw, 12px) solid transparent;
    border-top: clamp(5px, 1.2vw, 9px) solid #0A0F17;
    z-index: 1;
    transition: border-top-color 0.4s ease;
  }

  .rts-badge:hover .rts-shield::after {
    border-top-color: var(--charcoal);
  }

  .rts-badge:hover .rts-shield {
    box-shadow: 0 10px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(212,160,23,0.2), 0 0 40px rgba(212,160,23,0.06);
  }

  /* Shield Icon — GPU composited transform */
  .rts-shield-icon {
    width: clamp(38px, 9vw, 54px);
    height: clamp(38px, 9vw, 54px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(212,160,23,0.12), rgba(212,160,23,0.04));
    border: 1.5px solid rgba(212,160,23,0.2);
    transition: transform 0.5s ease, border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
    position: relative;
    z-index: 2;
    clip-path: polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%);
  }

  .rts-badge:hover .rts-shield-icon {
    transform: rotate(360deg) scale(1.12) translateZ(0);
    border-color: var(--gold);
    background: rgba(212,160,23,0.18);
    box-shadow: 0 0 24px rgba(212,160,23,0.35), 0 0 0 3px rgba(212,160,23,0.04);
  }

  .rts-shield-icon svg {
    width: clamp(17px, 4vw, 25px) !important;
    height: clamp(17px, 4vw, 25px) !important;
    transition: transform 0.5s ease;
  }

  .rts-badge:hover .rts-shield-icon svg {
    transform: rotate(-360deg) translateZ(0);
  }

  /* Bottom Circle — GPU composited */
  .rts-badge-circle {
    width: 86%;
    background: linear-gradient(180deg, var(--cream-warm) 0%, var(--cream) 100%);
    border-radius: 0 0 50% 50% / 0 0 55% 55%;
    padding: clamp(10px, 2.2vw, 22px) clamp(6px, 1.2vw, 14px) clamp(10px, 2vw, 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(2px, 0.5vw, 5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(212,160,23,0.06);
    position: relative;
    z-index: 1;
    margin-top: -3px;
    transition: box-shadow 0.4s ease;
    min-width: 0;
    max-width: 100%;
    min-height: clamp(42px, 8vw, 85px);
  }

  .rts-badge:hover .rts-badge-circle {
    box-shadow: 0 10px 28px rgba(0,0,0,0.12), 0 0 0 1px rgba(212,160,23,0.14);
  }

  /* Label */
  .rts-badge-label {
    font-family: var(--font-body);
    font-size: clamp(8.5px, 1.8vw, 13px);
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: clamp(0.01em, 0.3vw, 0.04em);
    text-transform: uppercase;
    text-align: center;
    line-height: 1.3;
    max-width: 100%;
    transition: color 0.35s ease;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    padding: 0 6px;
  }

  .rts-badge:hover .rts-badge-label {
    color: var(--gold-dark);
  }

  /* Number */
  .rts-badge-number {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1.1rem, 5vw, 2.2rem);
    background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 40%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.02em;
    white-space: nowrap;
    transition: transform 0.35s ease;
  }

  .rts-badge:hover .rts-badge-number {
    transform: scale(1.08) translateZ(0);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (min-width: 1920px) {
    .rts-section { padding: clamp(72px, 12vh, 150px) clamp(60px, 12vw, 240px); padding-bottom: clamp(72px, 12vh, 150px); }
    .rts-container { max-width: 1700px; }
    .rts-grid { max-width: 1500px; gap: 56px; padding: 0 48px; }
    .rts-card-reveal { max-width: 340px; padding: 20px; }
    .rts-shield { min-height: 110px; padding: 28px 20px 22px; }
    .rts-badge-circle { min-height: 75px; padding: 18px 12px 18px; }
    .rts-shield-icon { width: 52px; height: 52px; }
    .rts-shield-icon svg { width: 24px !important; height: 24px !important; }
    .rts-badge-number { font-size: 2rem; }
    .rts-badge-label { font-size: 12px; }
  }

  @media (min-width: 1600px) and (max-width: 1919px) {
    .rts-section { padding: clamp(64px, 10vh, 130px) clamp(48px, 10vw, 180px); padding-bottom: clamp(64px, 10vh, 130px); }
    .rts-container { max-width: 1550px; }
    .rts-grid { max-width: 1380px; gap: 48px; padding: 0 40px; }
    .rts-card-reveal { max-width: 315px; padding: 18px; }
  }

  @media (min-width: 1440px) and (max-width: 1599px) {
    .rts-section { padding: clamp(56px, 8vh, 110px) clamp(40px, 8vw, 120px); padding-bottom: clamp(56px, 8vh, 110px); }
    .rts-container { max-width: 1450px; }
    .rts-grid { max-width: 1300px; gap: 42px; padding: 0 36px; }
    .rts-card-reveal { max-width: 295px; padding: 16px; }
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    .rts-section { padding: clamp(48px, 7vh, 90px) clamp(32px, 6vw, 80px); padding-bottom: clamp(48px, 7vh, 90px); }
    .rts-grid { max-width: 1200px; gap: 36px; padding: 0 28px; }
    .rts-card-reveal { max-width: 275px; padding: 14px; }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    .rts-section { padding: clamp(44px, 6vh, 70px) clamp(24px, 5vw, 60px); padding-bottom: clamp(44px, 6vh, 70px); }
    .rts-container { max-width: 1150px; }
    .rts-grid { max-width: 1060px; gap: 30px; padding: 0 24px; }
    .rts-card-reveal { max-width: 245px; padding: 12px; }
  }

  @media (min-width: 820px) and (max-width: 1023px) {
    .rts-section { padding: clamp(40px, 5.5vh, 56px) 24px; padding-bottom: clamp(40px, 5.5vh, 56px); }
    .rts-grid { max-width: 860px; gap: 24px; padding: 0 20px; }
    .rts-card-reveal { max-width: 200px; padding: 10px; }
    .rts-shield { min-height: 65px; padding: 14px 8px 10px; }
    .rts-badge-circle { min-height: 40px; padding: 8px 4px 8px; }
    .rts-shield-icon { width: 34px; height: 34px; }
    .rts-shield-icon svg { width: 15px !important; height: 15px !important; }
    .rts-header { margin-bottom: clamp(32px, 4.5vh, 48px); }
  }

  @media (min-width: 768px) and (max-width: 819px) {
    .rts-section { padding: clamp(36px, 5vh, 48px) 20px; padding-bottom: clamp(36px, 5vh, 48px); }
    .rts-grid { max-width: 790px; gap: 22px; padding: 0 16px; }
    .rts-card-reveal { max-width: 185px; padding: 8px; }
    .rts-shield { min-height: 60px; padding: 12px 6px 8px; }
    .rts-badge-circle { min-height: 38px; padding: 7px 3px 7px; }
    .rts-shield-icon { width: 32px; height: 32px; }
    .rts-shield-icon svg { width: 14px !important; height: 14px !important; }
  }

  @media (max-width: 767px) {
    .rts-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 28px;
      max-width: 620px;
      padding: 0 24px;
    }
    .rts-card-reveal { max-width: 290px; width: 100%; padding: 12px; }
    .rts-section { padding: clamp(40px, 6vh, 56px) 24px; padding-bottom: clamp(40px, 6vh, 56px); }
    .rts-header { margin-bottom: clamp(32px, 4.5vh, 48px); }
    .rts-shield { min-height: 85px; padding: 18px 12px 14px; }
    .rts-badge-circle { min-height: 50px; padding: 12px 6px 12px; }
    .rts-shield-icon { width: 44px; height: 44px; }
    .rts-shield-icon svg { width: 20px !important; height: 20px !important; }
  }

  @media (min-width: 600px) and (max-width: 767px) {
    .rts-grid { max-width: 640px; gap: 32px; padding: 0 28px; }
    .rts-card-reveal { max-width: 300px; padding: 14px; }
  }

  @media (min-width: 430px) and (max-width: 599px) {
    .rts-grid { max-width: 500px; gap: 24px; padding: 0 20px; }
    .rts-card-reveal { max-width: 235px; padding: 10px; }
    .rts-section { padding: clamp(36px, 5.5vh, 50px) 20px; padding-bottom: clamp(36px, 5.5vh, 50px); }
    .rts-header-badge { font-size: 0.6rem; padding: 6px 16px; }
    .rts-shield { min-height: 75px; padding: 16px 10px 12px; }
    .rts-badge-circle { min-height: 45px; padding: 10px 5px 10px; }
    .rts-shield-icon { width: 40px; height: 40px; }
    .rts-shield-icon svg { width: 18px !important; height: 18px !important; }
  }

  @media (min-width: 375px) and (max-width: 429px) {
    .rts-grid { max-width: 430px; gap: 20px; padding: 0 16px; }
    .rts-card-reveal { max-width: 200px; padding: 8px; }
    .rts-section { padding: clamp(32px, 5vh, 46px) 16px; padding-bottom: clamp(32px, 5vh, 46px); }
    .rts-header-title { font-size: clamp(1.3rem, 4.5vw, 1.7rem); }
    .rts-header-subtitle { font-size: 0.85rem; }
    .rts-shield { min-height: 68px; padding: 14px 8px 10px; }
    .rts-badge-circle { min-height: 42px; padding: 9px 4px 9px; }
  }

  @media (min-width: 320px) and (max-width: 374px) {
    .rts-grid { max-width: 350px; gap: 16px; padding: 0 12px; }
    .rts-card-reveal { max-width: 165px; padding: 6px; }
    .rts-section { padding: clamp(28px, 4vh, 42px) 12px; padding-bottom: clamp(28px, 4vh, 42px); }
    .rts-header { margin-bottom: clamp(22px, 3vh, 34px); }
    .rts-header-badge { font-size: 0.5rem; padding: 5px 12px; letter-spacing: 0.12em; }
    .rts-header-title { font-size: clamp(1.1rem, 4vw, 1.4rem); }
    .rts-header-subtitle { font-size: 0.78rem; }
    .rts-shield { border-radius: 10px 10px 3px 3px; padding: 10px 6px 8px; min-height: 55px; }
    .rts-badge-circle { padding: 8px 4px 8px; min-height: 38px; }
    .rts-badge-label { font-size: 6.5px; }
    .rts-badge-number { font-size: 0.95rem; }
    .rts-shield-icon { width: 30px; height: 30px; }
    .rts-shield-icon svg { width: 14px !important; height: 14px !important; }
  }

  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    .rts-badge { cursor: default; }
    .rts-badge:hover { transform: none; }
    .rts-badge:hover .rts-shield::before { opacity: 0; }
    .rts-badge:hover .rts-shield { box-shadow: 0 6px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(212,160,23,0.08); }
    .rts-badge:hover .rts-shield-icon { transform: none; border-color: rgba(212,160,23,0.2); background: linear-gradient(135deg, rgba(212,160,23,0.12), rgba(212,160,23,0.04)); box-shadow: none; }
    .rts-badge:hover .rts-shield-icon svg { transform: none; }
    .rts-badge:hover .rts-badge-number { transform: none; }
    .rts-badge:hover .rts-badge-label { color: var(--text-primary); }
    .rts-badge:hover .rts-badge-circle { box-shadow: 0 6px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(212,160,23,0.06); }
    .rts-badge:active { transform: scale(0.97); transition: transform 0.1s ease; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rts-section *,
    .rts-section *::before,
    .rts-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .rts-badge:hover { transform: none !important; }
    .rts-badge:hover .rts-shield-icon { transform: none !important; }
    .rts-badge:hover .rts-shield-icon svg { transform: none !important; }
    .rts-badge:hover .rts-badge-number { transform: none !important; }
  }

  @media (forced-colors: active) {
    .rts-shield { border: 2px solid CanvasText; }
    .rts-badge-circle { border: 1px solid CanvasText; }
  }

  @media print {
    .rts-section { padding: 20px; background: white !important; }
    .rts-grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 24px !important; }
    .rts-shield { box-shadow: none !important; border: 1px solid #ccc !important; }
    .rts-badge-circle { box-shadow: none !important; border: 1px solid #ccc !important; }
    .rts-header-title { color: black !important; }
    .rts-header-title-gradient { -webkit-text-fill-color: black !important; }
    .rts-badge-number { -webkit-text-fill-color: black !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Badge Card Component — Memoized, no blur filter
// ══════════════════════════════════════════════════════════════════════════
const BadgeCard = memo(function BadgeCard({ stat, index }) {
  const Icon = stat.icon;
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

  if (prefersReducedMotion) {
    return (
      <div ref={cardRef} className="rts-card-reveal">
        <div
          className="rts-badge"
          role="article"
          aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
        >
          <div className="rts-shield">
            <div className="rts-shield-icon">
              <Icon color={stat.color} strokeWidth={1.6} aria-hidden="true" />
            </div>
          </div>
          <div className="rts-badge-circle">
            <div className="rts-badge-label">{stat.label}</div>
            <div className="rts-badge-number">
              <AnimatedNumber
                target={stat.value}
                suffix={stat.suffix}
                isInView={isInView}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="rts-card-reveal">
      <motion.div
        className="rts-badge"
        variants={CARD_VARIANTS}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={customTransition}
        whileHover={{ y: -6 }}
        role="article"
        aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
      >
        <div className="rts-shield">
          <div className="rts-shield-icon">
            <Icon color={stat.color} strokeWidth={1.6} aria-hidden="true" />
          </div>
        </div>
        <div className="rts-badge-circle">
          <div className="rts-badge-label">{stat.label}</div>
          <div className="rts-badge-number">
            <AnimatedNumber
              target={stat.value}
              suffix={stat.suffix}
              isInView={isInView}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main Component — Optimized
// ══════════════════════════════════════════════════════════════════════════
const TravelStatistics = memo(function TravelStatistics() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <>
      <style>{STYLES}</style>
      <section className="rts-section" aria-labelledby="stats-heading">
        <div className="rts-container">
          <motion.div
            ref={headerRef}
            className="rts-header"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <span className="rts-header-badge">Our Track Record</span>
            <h2 id="stats-heading" className="rts-header-title">
              Trusted by{" "}
              <span className="rts-header-title-gradient">Thousands</span>
            </h2>
            <p className="rts-header-subtitle">
              Numbers that speak for our commitment to excellence in travel
              services.
            </p>
          </motion.div>
          <div className="rts-grid-wrapper">
            <div className="rts-grid" role="list" aria-label="Statistics">
              {STATS.map((stat, i) => (
                <BadgeCard key={i} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

TravelStatistics.displayName = "TravelStatistics";

export default TravelStatistics;