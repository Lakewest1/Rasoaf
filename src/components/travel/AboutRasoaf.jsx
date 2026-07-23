// src/components/travel/AboutRasoaf.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium About Section
// Luxury · Cinematic · Glassmorphism · Floating travel objects · White bg
// Slow slide animations from left and right
// FULLY RESPONSIVE — 320px → 2560px, zero overflow, zero content loss
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone, Star, Sparkles, Shield, Globe,
  GraduationCap, FileCheck, Award,
  Compass, ArrowRight,
  MessageCircle, Ticket, BookOpen, Stamp, Luggage,
  Umbrella,
} from "lucide-react";

// ── Rasoaf Design Tokens ────────────────────────────────────────────────
const t = {
  display: "'Manrope', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFF8E6",
  white: "#FFFFFF",
  charcoal: "#0B0F17",
  textPrimary: "#0B0F17",
  // Aligned to the DS muted token — used for primary secondary-text.
  textSecondary: "#5F5F5F",
  // A step lighter than DS muted, reserved for tertiary/micro text
  // (feature descriptions, tiny labels) to keep a two-tier hierarchy.
  textMuted: "#7A7A7A",
  cardBg: "#FFFFFF",
  cardBgAlt: "#FFFDF8",
  cardBorder: "rgba(212, 160, 23, 0.12)",
  cardBorderHover: "rgba(212, 160, 23, 0.35)",
  goldBg: "rgba(212, 160, 23, 0.06)",
  goldBgHover: "rgba(212, 160, 23, 0.12)",
  shadowCard: "0 2px 8px rgba(0, 0, 0, 0.04)",
  shadowHover: "0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(212, 160, 23, 0.12)",
  shadowLg: "0 20px 60px rgba(0, 0, 0, 0.1)",
  transition: "0.45s cubic-bezier(0.22, 1, 0.36, 1)",
  transitionBounce: "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ── Slow Slide Animation Variants ───────────────────────────────────────
const slideFromLeft = {
  hidden: {
    opacity: 0,
    x: -120,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

const slideFromRight = {
  hidden: {
    opacity: 0,
    x: 120,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    }
  },
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: custom * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ── Reduced-motion aware helper (mobile-first perf + a11y) ──────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ── Animated Counter ────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "+", isInView }) {
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setCount(target);
      return;
    }
    let raf;
    const duration = 2400;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [isInView, target, reducedMotion]);

  return <span>{count}{suffix}</span>;
}

// ── Data (preserved) ────────────────────────────────────────────────────
const features = [
  { icon: GraduationCap, title: "Admissions Support", desc: "Expert guidance for university and college applications worldwide" },
  { icon: FileCheck, title: "Visa & Immigration", desc: "Professional visa processing for study, work, and travel" },
  { icon: Star, title: "Scholarships", desc: "Access to scholarship opportunities and financial aid programs" },
  { icon: Globe, title: "Travel Guidance", desc: "Complete travel arrangements and pre-departure support" },
];

const benefits = [
  { text: "Admissions Assistance", icon: BookOpen },
  { text: "Visa Application Support", icon: FileCheck },
  { text: "Border & Immigration Guidance", icon: Shield },
  { text: "Scholarship Opportunities", icon: Award },
  { text: "Professional Travel Consultation", icon: Compass },
  { text: "International Partnerships", icon: Globe },
];

const floatingObjects = [
  { icon: FileCheck, label: "Visa Approved", x: "8%", y: "8%", rotate: -6, delay: 0 },
  { icon: BookOpen, label: "Admission", x: "72%", y: "6%", rotate: 5, delay: 0.3 },
  { icon: Ticket, label: "Flight Booked", x: "82%", y: "52%", rotate: -4, delay: 0.6 },
  { icon: Stamp, label: "Travel Stamp", x: "12%", y: "62%", rotate: 7, delay: 0.9 },
  { icon: Luggage, label: "Airport Transfer", x: "68%", y: "78%", rotate: -5, delay: 1.2 },
  { icon: Umbrella, label: "Travel Insurance", x: "22%", y: "85%", rotate: 3, delay: 1.5 },
];

// ── Premium CSS ─────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  :root {
    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-body-large: clamp(1rem, 1.05vw, 1.125rem);
    --rasoaf-caption-size: 0.875rem;
    --rasoaf-eyebrow-size: 0.8rem;
    --rasoaf-button-size: 0.95rem;
  }

  /* Universal box-sizing scoped to this section — guarantees zero
     horizontal overflow regardless of host-app global resets. */
  .rab-section,
  .rab-section *,
  .rab-section *::before,
  .rab-section *::after {
    box-sizing: border-box;
  }

  .rab-section {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 100vw;
    padding: clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px);
    font-family: ${t.body};
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    background: linear-gradient(180deg, ${t.white} 0%, ${t.cream} 50%, ${t.white} 100%);
  }

  .rab-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 15% 85%, rgba(212, 160, 23, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 15%, rgba(212, 160, 23, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(247, 201, 72, 0.02) 0%, transparent 60%);
    pointer-events: none;
    animation: rab-ambient-drift 30s ease-in-out infinite;
    will-change: transform;
  }

  .rab-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(212, 160, 23, 0.012) 3px,
        rgba(212, 160, 23, 0.012) 6px
      );
    opacity: 0.5;
    pointer-events: none;
  }

  @keyframes rab-ambient-drift {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    33% { transform: translate3d(-10px, 10px, 0) scale(1.02); }
    66% { transform: translate3d(10px, -10px, 0) scale(0.98); }
  }

  .rab-container {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .rab-grid {
    display: grid;
    grid-template-columns: 0.85fr 1fr;
    gap: clamp(44px, 6vw, 76px);
    align-items: start;
  }

  /* ── LEFT VISUAL ── */
  .rab-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: clamp(420px, 52vw, 580px);
    position: sticky;
    top: 100px;
    width: 100%;
  }

  .rab-image-frame {
    position: relative;
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3/4;
    border-radius: clamp(28px, 3.2vw, 38px);
    overflow: hidden;
    z-index: 2;
    box-shadow: 
      0 0 0 1px rgba(212, 160, 23, 0.2),
      0 0 0 5px rgba(212, 160, 23, 0.04),
      0 24px 60px rgba(0, 0, 0, 0.1);
    transition: box-shadow ${t.transition};
  }

  .rab-image-frame:hover {
    box-shadow: 
      0 0 0 1px rgba(212, 160, 23, 0.35),
      0 0 0 5px rgba(212, 160, 23, 0.08),
      0 32px 72px rgba(0, 0, 0, 0.15);
  }

  .rab-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .rab-image-frame:hover .rab-image {
    transform: scale(1.03);
  }

  .rab-image-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(11, 15, 23, 0.15) 85%, rgba(11, 15, 23, 0.3) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .rab-image-glow {
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: linear-gradient(135deg, ${t.goldLight}, ${t.gold}, ${t.goldDark});
    opacity: 0.25;
    z-index: -1;
    filter: blur(8px);
    transition: opacity 0.6s ease;
  }

  .rab-image-frame:hover .rab-image-glow {
    opacity: 0.45;
  }

  /* ── Floating Objects ── */
  .rab-floating-obj {
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    white-space: nowrap;
    transition: all ${t.transition};
    transform-origin: center;
    max-width: 46vw;
  }

  .rab-floating-obj:hover {
    background: rgba(255, 255, 255, 0.98);
    border-color: rgba(212, 160, 23, 0.35);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px) !important;
  }

  .rab-floating-icon {
    width: 32px;
    height: 32px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.15);
  }

  /* Micro-label — intentionally below the DS caption floor since it's a
     decorative floating chip; deliberate exception, kept in Inter 600. */
  .rab-floating-label {
    font-family: ${t.body};
    font-size: clamp(9px, 0.75vw, 11px);
    font-weight: 600;
    color: ${t.charcoal};
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rab-accent-blur {
    position: absolute;
    border-radius: 50%;
    background: ${t.gold};
    opacity: 0.06;
    filter: blur(40px);
    pointer-events: none;
    z-index: 0;
  }

  /* ── RIGHT CONTENT ── */
  .rab-content {
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 2.2vw, 26px);
    min-width: 0;
  }

  /* Wraps the badge + heading so they can be centered independently of
     the rest of the (left-aligned) content column below them. */
  .rab-header-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: clamp(14px, 1.8vw, 20px);
  }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .rab-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: ${t.goldBg};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    width: fit-content;
    font-family: ${t.body};
    font-size: var(--rasoaf-eyebrow-size);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${t.goldDark};
    line-height: 1;
  }

  /* H2 — Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .rab-heading {
    font-family: ${t.display};
    font-weight: 800;
    font-size: var(--rasoaf-h2-size);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${t.textPrimary};
    margin: 0;
    overflow-wrap: break-word;
  }

  .rab-heading-gold {
    background: linear-gradient(135deg, ${t.goldDark} 0%, ${t.gold} 45%, ${t.goldLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Paragraph — DS body-large scale, line-height 1.7 */
  .rab-paragraph {
    font-family: ${t.body};
    font-size: var(--rasoaf-body-large);
    font-weight: 400;
    line-height: 1.7;
    color: ${t.textSecondary};
    margin: 0;
    max-width: 620px;
    overflow-wrap: break-word;
  }

  .rab-paragraph strong {
    font-weight: 600;
    color: ${t.textPrimary};
  }

  /* ── Feature Cards ── */
  .rab-features-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(10px, 1.4vw, 15px);
  }

  .rab-feature-card {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    padding: clamp(15px, 2vw, 20px);
    background: ${t.cardBg};
    border: 1px solid ${t.cardBorder};
    border-radius: 17px;
    transition: all ${t.transition};
    cursor: default;
    position: relative;
    overflow: hidden;
    box-shadow: ${t.shadowCard};
    min-width: 0;
  }

  .rab-feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 17px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.05), transparent);
    opacity: 0;
    transition: opacity ${t.transition};
  }

  .rab-feature-card:hover {
    background: ${t.cardBgAlt};
    border-color: ${t.cardBorderHover};
    transform: translateY(-3px);
    box-shadow: ${t.shadowHover};
  }

  .rab-feature-card:hover::before {
    opacity: 1;
  }

  .rab-feature-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${t.goldBg};
    border: 1px solid ${t.cardBorder};
    transition: all ${t.transitionBounce};
  }

  .rab-feature-card:hover .rab-feature-icon {
    background: ${t.goldBgHover};
    border-color: ${t.cardBorderHover};
    transform: scale(1.08) rotate(-5deg);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  /* Card title — a compact heading tier reaching DS H6 (1.125rem) at its
     max; floors slightly under for the tight 2-up desktop grid. */
  .rab-feature-title {
    font-family: ${t.display};
    font-weight: 700;
    font-size: clamp(0.95rem, 1.1vw, 1.125rem);
    color: ${t.textPrimary};
    margin-bottom: 3px;
    letter-spacing: -0.01em;
    line-height: 1.25;
    overflow-wrap: break-word;
  }

  /* Card description — micro-exception below DS caption floor, same
     rationale as the floating labels: dense 2-up card grid. */
  .rab-feature-desc {
    font-family: ${t.body};
    font-size: clamp(0.75rem, 0.85vw, 0.8125rem);
    color: ${t.textMuted};
    line-height: 1.45;
    transition: color ${t.transition};
    overflow-wrap: break-word;
  }

  .rab-feature-card:hover .rab-feature-desc {
    color: ${t.textSecondary};
  }

  /* ── Bottom Row ── */
  .rab-bottom-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: clamp(14px, 2vw, 20px);
    align-items: start;
  }

  /* ── Experience Card ── */
  .rab-experience-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: clamp(20px, 2.8vw, 30px) clamp(16px, 2.2vw, 26px);
    background: ${t.cardBg};
    border: 1px solid ${t.cardBorder};
    border-radius: 20px;
    min-width: clamp(130px, 17vw, 160px);
    transition: all ${t.transition};
    position: relative;
    overflow: hidden;
    box-shadow: ${t.shadowCard};
  }

  .rab-experience-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${t.gold}, transparent);
    opacity: 0;
    transition: opacity ${t.transition};
  }

  .rab-experience-card:hover {
    border-color: ${t.cardBorderHover};
    box-shadow: ${t.shadowHover};
    transform: translateY(-3px);
    background: ${t.cardBgAlt};
  }

  .rab-experience-card:hover::before {
    opacity: 1;
  }

  .rab-exp-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t.goldBg};
    border: 1px solid ${t.cardBorder};
    margin-bottom: 10px;
    transition: all ${t.transitionBounce};
    flex-shrink: 0;
  }

  .rab-experience-card:hover .rab-exp-icon {
    background: ${t.goldBgHover};
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(212, 160, 23, 0.15);
  }

  /* Hero stat number — snapped to a DS-aligned scale, matching the same
     treatment used for stat numbers across the site. */
  .rab-exp-number {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(2.25rem, 4.5vw, 3.25rem);
    background: linear-gradient(135deg, ${t.goldDark}, ${t.gold});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .rab-exp-label {
    font-family: ${t.body};
    font-size: clamp(10px, 0.78vw, 11.5px);
    color: ${t.textMuted};
    font-weight: 500;
    margin-top: 4px;
    line-height: 1.35;
    letter-spacing: 0.02em;
  }

  /* ── Benefits ── */
  .rab-benefits-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(6px, 0.8vw, 10px);
    min-width: 0;
  }

  .rab-benefit-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 9px 11px;
    border-radius: 10px;
    transition: all ${t.transition};
    cursor: default;
    min-width: 0;
  }

  .rab-benefit-item:hover {
    background: ${t.goldBg};
    transform: translateX(3px);
  }

  .rab-benefit-icon {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${t.goldBg};
    border: 1px solid ${t.cardBorder};
    transition: all ${t.transitionBounce};
  }

  .rab-benefit-item:hover .rab-benefit-icon {
    background: ${t.goldBgHover};
    border-color: ${t.cardBorderHover};
    transform: scale(1.15);
  }

  /* Benefit text — reaches DS caption (0.875rem) at its max */
  .rab-benefit-text {
    font-family: ${t.body};
    font-size: clamp(0.75rem, 0.88vw, 0.875rem);
    font-weight: 500;
    color: ${t.textSecondary};
    letter-spacing: 0.01em;
    transition: color ${t.transition};
    overflow-wrap: break-word;
    min-width: 0;
  }

  .rab-benefit-item:hover .rab-benefit-text {
    color: ${t.textPrimary};
  }

  /* ── Contact Card ── */
  .rab-contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: clamp(16px, 2.2vw, 22px) clamp(18px, 2.4vw, 26px);
    background: ${t.cardBg};
    border: 1px solid ${t.cardBorder};
    border-radius: 18px;
    flex-wrap: wrap;
    transition: all ${t.transition};
    box-shadow: ${t.shadowCard};
  }

  .rab-contact-card:hover {
    border-color: ${t.cardBorderHover};
    box-shadow: ${t.shadowHover};
    background: ${t.cardBgAlt};
  }

  .rab-contact-info {
    display: flex;
    align-items: center;
    gap: 13px;
    min-width: 0;
  }

  .rab-contact-icon {
    width: 46px;
    height: 46px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${t.goldBg};
    border: 1px solid ${t.cardBorder};
    transition: all ${t.transitionBounce};
  }

  .rab-contact-card:hover .rab-contact-icon {
    transform: scale(1.05);
  }

  .rab-contact-label {
    font-family: ${t.body};
    font-size: clamp(10.5px, 0.82vw, 12.5px);
    color: ${t.textMuted};
    line-height: 1.3;
  }

  /* Phone number — small heading tier, close to DS body-large */
  .rab-contact-phone {
    font-family: ${t.display};
    font-weight: 700;
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    color: ${t.textPrimary};
    letter-spacing: -0.01em;
    overflow-wrap: break-word;
  }

  .rab-contact-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  /* Buttons — Inter 600, 0.95rem, letter-spacing 0.01em (per DS) */
  .rab-btn-gold {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 13px;
    border: none;
    background: linear-gradient(135deg, ${t.goldLight}, ${t.gold});
    color: ${t.charcoal};
    font-family: ${t.body};
    font-size: var(--rasoaf-button-size);
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer;
    text-decoration: none;
    transition: all ${t.transition};
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.2);
    white-space: nowrap;
    min-height: 44px;
  }

  .rab-btn-gold:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(212, 160, 23, 0.4);
    background: linear-gradient(135deg, #FFE082, ${t.gold});
  }

  .rab-btn-gold:focus-visible,
  .rab-btn-ghost:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 3px;
  }

  .rab-btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 13px;
    border: 1px solid ${t.cardBorder};
    background: ${t.white};
    color: ${t.goldDark};
    font-family: ${t.body};
    font-size: var(--rasoaf-button-size);
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer;
    text-decoration: none;
    transition: all ${t.transition};
    white-space: nowrap;
    min-height: 44px;
  }

  .rab-btn-ghost:hover {
    border-color: ${t.cardBorderHover};
    background: ${t.goldBg};
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — DESIGN FULLY PRESERVED, INTELLIGENTLY SCALED
     Verified clean at: 320 · 360 · 375 · 390 · 414 · 430 · 640 · 768 · 820 ·
     1024 · 1280 · 1440 · 1600 · 1920 · 2560
     ═══════════════════════════════════════════════════════════════════════ */

  /* ── Ultra-wide desktop (1920px–2560px+) ── */
  @media (min-width: 1920px) {
    .rab-container {
      max-width: 1480px;
    }

    .rab-grid {
      gap: clamp(76px, 5vw, 110px);
    }

    .rab-image-frame {
      max-width: 460px;
    }
  }

  /* ── Large desktop (1440px–1919px) ── */
  @media (min-width: 1440px) and (max-width: 1919px) {
    .rab-container {
      max-width: 1360px;
    }
  }

  /* ── Standard desktop / small laptop (1280px–1439px) ── */
  @media (min-width: 1280px) and (max-width: 1439px) {
    .rab-container {
      max-width: 1240px;
    }
  }

  /* ── Tablet & Smaller Laptops ── */
  @media (max-width: 1024px) {
    .rab-grid {
      grid-template-columns: 1fr;
      gap: clamp(40px, 5vw, 56px);
    }

    .rab-visual {
      min-height: clamp(380px, 48vw, 500px);
      position: relative;
      top: auto;
      order: -1;
    }

    .rab-image-frame {
      max-width: 400px;
    }

    /* Floating objects — scaled down but KEPT */
    .rab-floating-obj {
      padding: 7px 11px;
      gap: 6px;
      border-radius: 10px;
    }

    .rab-floating-icon {
      width: 26px;
      height: 26px;
      border-radius: 7px;
    }

    .rab-floating-icon svg {
      width: 13px;
      height: 13px;
    }

    .rab-floating-label {
      font-size: 8.5px;
    }
  }

  /* ── Tablet Portrait ── */
  @media (max-width: 820px) {
    .rab-section {
      padding: clamp(56px, 8vh, 76px) clamp(20px, 4vw, 32px);
    }

    .rab-grid {
      gap: 32px;
    }

    .rab-visual {
      min-height: clamp(320px, 45vw, 420px);
    }

    .rab-image-frame {
      max-width: 340px;
      border-radius: 28px;
    }

    .rab-heading {
      font-size: clamp(1.7rem, 4.5vw, 2.2rem);
    }

    .rab-paragraph {
      font-size: 0.95rem;
      max-width: 100%;
    }

    .rab-features-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .rab-bottom-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .rab-experience-card {
      flex-direction: row;
      gap: 20px;
      text-align: left;
      min-width: auto;
      padding: 18px 22px;
      align-items: center;
      justify-content: flex-start;
    }

    .rab-exp-icon {
      margin-bottom: 0;
    }

    .rab-exp-number {
      font-size: clamp(2.1rem, 5vw, 2.6rem);
    }

    .rab-exp-label {
      font-size: 10.5px;
      text-align: left;
    }

    .rab-benefits-list {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .rab-contact-card {
      flex-wrap: wrap;
      padding: 18px 22px;
      gap: 14px;
    }

    .rab-contact-info {
      flex: 1;
      min-width: 180px;
    }

    .rab-contact-buttons {
      flex: 1;
      min-width: 180px;
      justify-content: flex-start;
    }

    /* Floating objects — scaled down further but KEPT */
    .rab-floating-obj {
      padding: 6px 10px;
      gap: 5px;
      border-radius: 9px;
    }

    .rab-floating-icon {
      width: 22px;
      height: 22px;
      border-radius: 6px;
    }

    .rab-floating-icon svg {
      width: 11px;
      height: 11px;
    }

    .rab-floating-label {
      font-size: 7.5px;
    }
  }

  /* ── Mobile Large (iPhone Pro Max / 430px and down) ── */
  @media (max-width: 640px) {
    .rab-section {
      padding: clamp(40px, 6vh, 52px) 18px;
    }

    .rab-grid {
      gap: 28px;
    }

    .rab-visual {
      min-height: clamp(280px, 55vw, 360px);
    }

    .rab-image-frame {
      max-width: 280px;
      border-radius: 24px;
    }

    .rab-heading {
      font-size: clamp(1.5rem, 6vw, 1.9rem);
    }

    .rab-paragraph {
      font-size: 0.9rem;
      line-height: 1.65;
    }

    .rab-features-grid {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .rab-feature-card {
      padding: 14px 16px;
      gap: 12px;
      border-radius: 15px;
    }

    .rab-feature-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
    }

    .rab-feature-title {
      font-size: 1rem;
    }

    .rab-feature-desc {
      font-size: 0.8rem;
    }

    .rab-bottom-row {
      gap: 14px;
    }

    .rab-experience-card {
      padding: 16px 18px;
      gap: 14px;
      border-radius: 16px;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
    }

    .rab-exp-icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
    }

    .rab-exp-number {
      font-size: clamp(1.9rem, 7vw, 2.4rem);
    }

    .rab-exp-label {
      font-size: 10px;
      text-align: center;
    }

    .rab-benefits-list {
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .rab-benefit-item {
      padding: 7px 10px;
      gap: 8px;
      border-radius: 8px;
    }

    .rab-benefit-text {
      font-size: 0.8rem;
    }

    .rab-contact-card {
      flex-direction: column;
      align-items: stretch;
      padding: 16px 18px;
      border-radius: 16px;
      gap: 14px;
    }

    .rab-contact-info {
      justify-content: center;
      flex: none;
      min-width: auto;
      gap: 11px;
    }

    .rab-contact-icon {
      width: 40px;
      height: 40px;
      border-radius: 11px;
    }

    .rab-contact-label {
      font-size: 11px;
    }

    .rab-contact-phone {
      font-size: 1rem;
    }

    .rab-contact-buttons {
      flex-direction: column;
      gap: 8px;
      flex: none;
      min-width: auto;
    }

    .rab-btn-gold,
    .rab-btn-ghost {
      justify-content: center;
      padding: 12px 20px;
      font-size: 0.875rem;
      border-radius: 12px;
      width: 100%;
      white-space: normal;
    }

    .rab-badge {
      font-size: 0.7rem;
      padding: 5px 14px;
      gap: 6px;
    }

    /* Floating objects — scaled for mobile but KEPT */
    .rab-floating-obj {
      padding: 5px 8px;
      gap: 4px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    }

    .rab-floating-icon {
      width: 18px;
      height: 18px;
      border-radius: 5px;
    }

    .rab-floating-icon svg {
      width: 9px;
      height: 9px;
    }

    .rab-floating-label {
      font-size: 6.5px;
    }
  }

  /* ── Mobile Small (390 / 375 / 360 / 320) ── */
  @media (max-width: 400px) {
    .rab-section {
      padding: 32px 14px;
    }

    .rab-grid {
      gap: 22px;
    }

    .rab-visual {
      min-height: clamp(200px, 60vw, 260px);
    }

    .rab-image-frame {
      max-width: 200px;
      border-radius: 20px;
    }

    .rab-heading {
      font-size: 1.4rem;
    }

    .rab-paragraph {
      font-size: 0.85rem;
    }

    .rab-features-grid {
      gap: 8px;
    }

    .rab-feature-card {
      padding: 12px 14px;
      gap: 10px;
      border-radius: 13px;
    }

    .rab-feature-icon {
      width: 34px;
      height: 34px;
      border-radius: 9px;
    }

    .rab-feature-icon svg {
      width: 16px;
      height: 16px;
    }

    .rab-feature-title {
      font-size: 0.9rem;
    }

    .rab-feature-desc {
      font-size: 0.75rem;
    }

    .rab-experience-card {
      padding: 14px 16px;
      border-radius: 14px;
      gap: 12px;
    }

    .rab-exp-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
    }

    .rab-exp-icon svg {
      width: 18px;
      height: 18px;
    }

    .rab-exp-number {
      font-size: clamp(1.6rem, 8vw, 2rem);
    }

    .rab-exp-label {
      font-size: 9px;
    }

    .rab-benefits-list {
      gap: 4px;
    }

    .rab-benefit-item {
      padding: 6px 8px;
      gap: 6px;
    }

    .rab-benefit-icon {
      width: 20px;
      height: 20px;
      border-radius: 5px;
    }

    .rab-benefit-icon svg {
      width: 11px;
      height: 11px;
    }

    .rab-benefit-text {
      font-size: 0.75rem;
    }

    .rab-contact-card {
      padding: 14px 14px;
      border-radius: 14px;
      gap: 12px;
    }

    .rab-contact-icon {
      width: 36px;
      height: 36px;
    }

    .rab-contact-icon svg {
      width: 18px;
      height: 18px;
    }

    .rab-contact-phone {
      font-size: 0.9rem;
    }

    .rab-contact-label {
      font-size: 10px;
    }

    .rab-btn-gold,
    .rab-btn-ghost {
      padding: 10px 16px;
      font-size: 0.8rem;
      border-radius: 10px;
      gap: 6px;
    }

    .rab-btn-gold svg,
    .rab-btn-ghost svg {
      width: 14px;
      height: 14px;
    }

    .rab-badge {
      font-size: 0.65rem;
      padding: 4px 12px;
      gap: 5px;
    }

    .rab-badge svg {
      width: 10px;
      height: 10px;
    }

    /* Floating objects — smallest but KEPT */
    .rab-floating-obj {
      padding: 4px 6px;
      gap: 3px;
      border-radius: 6px;
    }

    .rab-floating-icon {
      width: 14px;
      height: 14px;
      border-radius: 4px;
    }

    .rab-floating-icon svg {
      width: 7px;
      height: 7px;
    }

    .rab-floating-label {
      font-size: 5.5px;
    }
  }

  /* ── Mobile Extra-Small (320px–359px) — benefits go single-column so
     text never gets crushed into a two-word-per-line squeeze ── */
  @media (max-width: 359px) {
    .rab-section {
      padding: 28px 12px;
    }

    .rab-benefits-list {
      grid-template-columns: 1fr;
    }

    .rab-image-frame {
      max-width: 172px;
    }

    .rab-heading {
      font-size: 1.3rem;
    }

    .rab-btn-gold,
    .rab-btn-ghost {
      padding: 10px 14px;
      font-size: 0.78rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rab-section::before,
    .rab-floating-obj {
      animation: none !important;
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  Memoized sub-components
// ══════════════════════════════════════════════════════════════════════════
const MemoizedFloatingObj = ({ item, isInView, index }) => {
  const Icon = item.icon;
  return (
    <motion.div
      className="rab-floating-obj"
      style={{
        left: item.x,
        top: item.y,
        transform: `rotate(${item.rotate}deg)`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: [0, -8, 0],
              rotate: [item.rotate, item.rotate - 2, item.rotate],
              scale: 1,
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.8, delay: 1.2 + index * 0.2, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, delay: 1.2 + index * 0.2, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
      }}
    >
      <div className="rab-floating-icon">
        <Icon size={15} color={t.goldDark} aria-hidden="true" />
      </div>
      <span className="rab-floating-label">{item.label}</span>
    </motion.div>
  );
};

const MemoizedFeatureCard = ({ feature, isInView, index }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      className="rab-feature-card"
      custom={index}
      variants={fadeUpStagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -3 }}
    >
      <div className="rab-feature-icon">
        <Icon size={19} color={t.gold} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="rab-feature-title">{feature.title}</div>
        <div className="rab-feature-desc">{feature.desc}</div>
      </div>
    </motion.div>
  );
};

const MemoizedBenefitItem = ({ benefit, isInView, index }) => {
  const Icon = benefit.icon;
  return (
    <motion.div
      className="rab-benefit-item"
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.9 + index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 5 }}
    >
      <div className="rab-benefit-icon">
        <Icon size={13} color={t.goldDark} strokeWidth={2} aria-hidden="true" />
      </div>
      <span className="rab-benefit-text">{benefit.text}</span>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function AboutRasoaf() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{CSS}</style>

      <section className="rab-section" ref={sectionRef} aria-labelledby="about-heading">
        <div className="rab-container">
          <div className="rab-grid">
            {/* ═════ LEFT — Slides in from LEFT ═════ */}
            <motion.div
              className="rab-visual"
              variants={slideFromLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Ambient gold blurs — fade in slowly */}
              <motion.div
                className="rab-accent-blur"
                style={{ width: "clamp(140px, 22vw, 220px)", height: "clamp(140px, 22vw, 220px)", top: "-8%", right: "8%" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.06 } : {}}
                transition={{ duration: 1.6, delay: 0.6 }}
              />
              <motion.div
                className="rab-accent-blur"
                style={{ width: "clamp(90px, 14vw, 150px)", height: "clamp(90px, 14vw, 150px)", bottom: "12%", left: "4%" }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.06 } : {}}
                transition={{ duration: 1.6, delay: 0.8 }}
              />

              {/* Main Image — scales in */}
              <motion.div
                className="rab-image-frame"
                variants={scaleIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="rab-image-glow" />
                <img
                  src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550004/Cv_Care_piu0nm.docx.png"
                  alt="RASOAF international travel experiences"
                  className="rab-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="rab-image-gradient" />
              </motion.div>

              {/* Floating Objects — appear after slide — KEPT ON ALL SCREENS */}
              {floatingObjects.map((obj, i) => (
                <MemoizedFloatingObj key={i} item={obj} isInView={isInView} index={i} />
              ))}
            </motion.div>

            {/* ═════ RIGHT — Slides in from RIGHT ═════ */}
            <motion.div
              className="rab-content"
              variants={slideFromRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Badge + Heading — centered as a block */}
              <div className="rab-header-block">
                <motion.div
                  className="rab-badge"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Sparkles size={12} color={t.gold} aria-hidden="true" />
                  About RASOAF
                  <Sparkles size={12} color={t.gold} aria-hidden="true" />
                </motion.div>

                <motion.h2
                  id="about-heading"
                  className="rab-heading"
                  initial={{ opacity: 0, y: 25 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  About{" "}
                  <span className="rab-heading-gold">RASOAF</span>
                  <br />
                  Travels & Tours
                  <br />
                  Limited
                </motion.h2>
              </div>

              {/* Paragraphs — staggered fade up */}
              <motion.p
                className="rab-paragraph"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong>RASOAF Travels and Tours Limited</strong> has established strong partnerships with international institutions to provide support in admissions, visa applications, border assistance, scholarship opportunities, and many other educational and travel-related services.
              </motion.p>
              <motion.p
                className="rab-paragraph"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              >
                We encourage individuals, organizations, and prospective students to contact us with their interests, inquiries, concerns, or complaints. Our experienced team is committed to providing professional guidance and reliable solutions tailored to your needs.
              </motion.p>

              {/* Feature Cards — staggered fade up */}
              <div className="rab-features-grid">
                {features.map((feature, i) => (
                  <MemoizedFeatureCard key={i} feature={feature} isInView={isInView} index={i} />
                ))}
              </div>

              {/* Bottom Row */}
              <div className="rab-bottom-row">
                {/* Experience Card — fades in */}
                <motion.div
                  className="rab-experience-card"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                >
                  <div className="rab-exp-icon">
                    <Award size={24} color={t.gold} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="rab-exp-number">
                    <AnimatedCounter target={20} suffix="+" isInView={isInView} />
                  </div>
                  <div className="rab-exp-label">
                    Years<br />Delivering Trusted<br />International Travel<br />Solutions
                  </div>
                </motion.div>

                {/* Benefits List — staggered slide from right */}
                <div className="rab-benefits-list">
                  {benefits.map((benefit, i) => (
                    <MemoizedBenefitItem key={i} benefit={benefit} isInView={isInView} index={i} />
                  ))}
                </div>
              </div>

              {/* Contact Card — fades up */}
              <motion.div
                className="rab-contact-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3 }}
              >
                <div className="rab-contact-info">
                  <div className="rab-contact-icon">
                    <Phone size={22} color={t.gold} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="rab-contact-label">Need Travel Advice? Free Consultation</div>
                    <div className="rab-contact-label" style={{ fontSize: "clamp(9px, 0.7vw, 10.5px)", marginTop: 2 }}>Available Monday–Saturday</div>
                    <div className="rab-contact-phone">+234-703-189-9529</div>
                  </div>
                </div>
                <div className="rab-contact-buttons">
                  <a href="tel:+2347031899529" className="rab-btn-gold" aria-label="Call RASOAF">
                    <Phone size={16} aria-hidden="true" />
                    Call Now
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a href="https://wa.me/2347031899529" className="rab-btn-ghost" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                    <MessageCircle size={16} aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}