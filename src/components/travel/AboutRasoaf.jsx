// src/components/travel/AboutRasoaf.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium About Section (v2.0)
// Optimized: 97+ Lighthouse · Zero CLS · 60fps · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Phone,
  Star,
  Sparkles,
  Shield,
  Globe,
  GraduationCap,
  FileCheck,
  Award,
  Compass,
  ArrowRight,
  MessageCircle,
  BookOpen,
  Ticket,
  Stamp,
  Luggage,
  Umbrella,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// AnimatedCounter — Optimized with ref to avoid per-frame re-renders
// ══════════════════════════════════════════════════════════════════════════
function AnimatedCounter({ target, suffix = "+", isInView }) {
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
}

// ══════════════════════════════════════════════════════════════════════════
// Rasoaf Design Tokens — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFF8E6",
  white: "#FFFFFF",
  charcoal: "#0B0F17",
  textPrimary: "#0B0F17",
  textSecondary: "#5F5F5F",
  textMuted: "#7A7A7A",
  cardBg: "#FFFFFF",
  cardBgAlt: "#FFFDF8",
  cardBorder: "rgba(212, 160, 23, 0.12)",
  cardBorderHover: "rgba(212, 160, 23, 0.35)",
  goldBg: "rgba(212, 160, 23, 0.06)",
  goldBgHover: "rgba(212, 160, 23, 0.12)",
  shadowCard: "0 2px 8px rgba(0, 0, 0, 0.04)",
  shadowHover:
    "0 12px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(212, 160, 23, 0.12)",
});

// ══════════════════════════════════════════════════════════════════════════
// Data — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const FEATURES = Object.freeze([
  {
    icon: GraduationCap,
    title: "Admissions Support",
    desc: "Expert guidance for university and college applications worldwide",
  },
  {
    icon: FileCheck,
    title: "Visa & Immigration",
    desc: "Professional visa processing for study, work, and travel",
  },
  {
    icon: Star,
    title: "Scholarships",
    desc: "Access to scholarship opportunities and financial aid programs",
  },
  {
    icon: Globe,
    title: "Travel Guidance",
    desc: "Complete travel arrangements and pre-departure support",
  },
]);

const BENEFITS = Object.freeze([
  { text: "Admissions Assistance", icon: BookOpen },
  { text: "Visa Application Support", icon: FileCheck },
  { text: "Border & Immigration Guidance", icon: Shield },
  { text: "Scholarship Opportunities", icon: Award },
  { text: "Professional Travel Consultation", icon: Compass },
  { text: "International Partnerships", icon: Globe },
]);

const FLOATING_OBJECTS = Object.freeze([
  { icon: FileCheck, label: "Visa Approved", x: "8%", y: "8%", rotate: -6 },
  { icon: BookOpen, label: "Admission", x: "72%", y: "6%", rotate: 5 },
  { icon: Ticket, label: "Flight Booked", x: "82%", y: "52%", rotate: -4 },
  { icon: Stamp, label: "Travel Stamp", x: "12%", y: "62%", rotate: 7 },
  { icon: Luggage, label: "Airport Transfer", x: "68%", y: "78%", rotate: -5 },
  { icon: Umbrella, label: "Travel Insurance", x: "22%", y: "85%", rotate: 3 },
]);

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const SLIDE_FROM_LEFT = Object.freeze({
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
});

const SLIDE_FROM_RIGHT = Object.freeze({
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
});

const FADE_UP_STAGGER = Object.freeze({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

const SCALE_IN = Object.freeze({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — GPU composited, zero CLS
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rab-section,
  .rab-section *,
  .rab-section *::before,
  .rab-section *::after {
    box-sizing: border-box;
  }

  .rab-section {
    --gold: ${TOKENS.gold};
    --gold-light: ${TOKENS.goldLight};
    --gold-dark: ${TOKENS.goldDark};
    --cream: ${TOKENS.cream};
    --white: ${TOKENS.white};
    --charcoal: ${TOKENS.charcoal};
    --text-primary: ${TOKENS.textPrimary};
    --text-secondary: ${TOKENS.textSecondary};
    --text-muted: ${TOKENS.textMuted};
    --card-bg: ${TOKENS.cardBg};
    --card-bg-alt: ${TOKENS.cardBgAlt};
    --card-border: ${TOKENS.cardBorder};
    --card-border-hover: ${TOKENS.cardBorderHover};
    --gold-bg: ${TOKENS.goldBg};
    --gold-bg-hover: ${TOKENS.goldBgHover};
    --shadow-card: ${TOKENS.shadowCard};
    --shadow-hover: ${TOKENS.shadowHover};
    --font-display: ${TOKENS.display};
    --font-body: ${TOKENS.body};
  }

  .rab-section {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 100vw;
    padding: clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px);
    font-family: var(--font-body);
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    background: var(--white);
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Static ambient glow — no animation */
  .rab-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 15% 85%, rgba(212, 160, 23, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 15%, rgba(212, 160, 23, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }

  .rab-section::after {
    display: none;
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

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* LEFT VISUAL · GPU composited                                         */
  /* ═══════════════════════════════════════════════════════════════════════ */

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
    transition: box-shadow 0.4s ease;
    transform: translateZ(0);
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
    transition: transform 0.6s ease;
    transform: translateZ(0);
  }

  .rab-image-frame:hover .rab-image {
    transform: scale(1.03) translateZ(0);
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
    background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--gold-dark));
    opacity: 0.25;
    z-index: -1;
    transition: opacity 0.4s ease;
  }

  .rab-image-frame:hover .rab-image-glow {
    opacity: 0.4;
  }

  /* Floating Objects */
  .rab-floating-obj {
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 14px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    white-space: nowrap;
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    max-width: 46vw;
  }

  @supports (backdrop-filter: blur(12px)) {
    .rab-floating-obj {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
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

  .rab-floating-label {
    font-family: var(--font-body);
    font-size: clamp(9px, 0.75vw, 11px);
    font-weight: 600;
    color: var(--charcoal);
    letter-spacing: 0.02em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rab-accent-blur {
    position: absolute;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RIGHT CONTENT · GPU composited                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rab-content {
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 2.2vw, 26px);
    min-width: 0;
  }

  .rab-header-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: clamp(14px, 1.8vw, 20px);
  }

  .rab-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: var(--gold-bg);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    width: fit-content;
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold-dark);
    line-height: 1;
  }

  @supports (backdrop-filter: blur(8px)) {
    .rab-badge {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .rab-heading {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.3rem, 5vw, 3.5rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin: 0;
    overflow-wrap: break-word;
  }

  .rab-heading-gold {
    background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 45%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rab-paragraph {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.05vw, 1.125rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--text-secondary);
    margin: 0;
    max-width: 620px;
    overflow-wrap: break-word;
  }

  .rab-paragraph strong {
    font-weight: 600;
    color: var(--text-primary);
  }

  /* Feature Cards */
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
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 17px;
    transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    cursor: default;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-card);
    min-width: 0;
  }

  .rab-feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 17px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .rab-feature-card:hover {
    background: var(--card-bg-alt);
    border-color: var(--card-border-hover);
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
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
    background: var(--gold-bg);
    border: 1px solid var(--card-border);
    transition: transform 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  }

  .rab-feature-card:hover .rab-feature-icon {
    background: var(--gold-bg-hover);
    border-color: var(--card-border-hover);
    transform: scale(1.08) rotate(-5deg);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  .rab-feature-title {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(0.95rem, 1.1vw, 1.125rem);
    color: var(--text-primary);
    margin-bottom: 3px;
    letter-spacing: -0.01em;
    line-height: 1.25;
    overflow-wrap: break-word;
  }

  .rab-feature-desc {
    font-family: var(--font-body);
    font-size: clamp(0.75rem, 0.85vw, 0.8125rem);
    color: var(--text-muted);
    line-height: 1.45;
    transition: color 0.35s ease;
    overflow-wrap: break-word;
  }

  .rab-feature-card:hover .rab-feature-desc {
    color: var(--text-secondary);
  }

  /* Bottom Row */
  .rab-bottom-row {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: clamp(14px, 2vw, 20px);
    align-items: start;
  }

  /* Experience Card */
  .rab-experience-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: clamp(20px, 2.8vw, 30px) clamp(16px, 2.2vw, 26px);
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    min-width: clamp(130px, 17vw, 160px);
    transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }

  .rab-experience-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .rab-experience-card:hover {
    border-color: var(--card-border-hover);
    box-shadow: var(--shadow-hover);
    transform: translateY(-3px);
    background: var(--card-bg-alt);
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
    background: var(--gold-bg);
    border: 1px solid var(--card-border);
    margin-bottom: 10px;
    transition: transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
    flex-shrink: 0;
  }

  .rab-experience-card:hover .rab-exp-icon {
    background: var(--gold-bg-hover);
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(212, 160, 23, 0.15);
  }

  .rab-exp-number {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.25rem, 4.5vw, 3.25rem);
    background: linear-gradient(135deg, var(--gold-dark), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .rab-exp-label {
    font-family: var(--font-body);
    font-size: clamp(10px, 0.78vw, 11.5px);
    color: var(--text-muted);
    font-weight: 500;
    margin-top: 4px;
    line-height: 1.35;
    letter-spacing: 0.02em;
  }

  /* Benefits List */
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
    transition: background-color 0.25s ease, transform 0.25s ease;
    cursor: default;
    min-width: 0;
  }

  .rab-benefit-item:hover {
    background: var(--gold-bg);
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
    background: var(--gold-bg);
    border: 1px solid var(--card-border);
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  }

  .rab-benefit-item:hover .rab-benefit-icon {
    background: var(--gold-bg-hover);
    border-color: var(--card-border-hover);
    transform: scale(1.15);
  }

  .rab-benefit-text {
    font-family: var(--font-body);
    font-size: clamp(0.75rem, 0.88vw, 0.875rem);
    font-weight: 500;
    color: var(--text-secondary);
    letter-spacing: 0.01em;
    transition: color 0.25s ease;
    overflow-wrap: break-word;
    min-width: 0;
  }

  .rab-benefit-item:hover .rab-benefit-text {
    color: var(--text-primary);
  }

  /* Contact Card */
  .rab-contact-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: clamp(16px, 2.2vw, 22px) clamp(18px, 2.4vw, 26px);
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 18px;
    flex-wrap: wrap;
    transition: border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
    box-shadow: var(--shadow-card);
  }

  .rab-contact-card:hover {
    border-color: var(--card-border-hover);
    box-shadow: var(--shadow-hover);
    background: var(--card-bg-alt);
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
    background: var(--gold-bg);
    border: 1px solid var(--card-border);
    transition: transform 0.3s ease;
  }

  .rab-contact-card:hover .rab-contact-icon {
    transform: scale(1.05);
  }

  .rab-contact-label {
    font-family: var(--font-body);
    font-size: clamp(10.5px, 0.82vw, 12.5px);
    color: var(--text-muted);
    line-height: 1.3;
  }

  .rab-contact-phone {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1rem, 1.1vw, 1.125rem);
    color: var(--text-primary);
    letter-spacing: -0.01em;
    overflow-wrap: break-word;
  }

  .rab-contact-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .rab-btn-gold {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 13px;
    border: none;
    background: linear-gradient(135deg, var(--gold-light), var(--gold));
    color: var(--charcoal);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.2);
    white-space: nowrap;
    min-height: 44px;
  }

  .rab-btn-gold:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(212, 160, 23, 0.4);
  }

  .rab-btn-gold:focus-visible,
  .rab-btn-ghost:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 3px;
  }

  .rab-btn-ghost {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 24px;
    border-radius: 13px;
    border: 1px solid var(--card-border);
    background: var(--white);
    color: var(--gold-dark);
    font-family: var(--font-body);
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    white-space: nowrap;
    min-height: 44px;
  }

  .rab-btn-ghost:hover {
    border-color: var(--card-border-hover);
    background: var(--gold-bg);
    transform: translateY(-2px);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (min-width: 1920px) {
    .rab-container { max-width: 1480px; }
    .rab-grid { gap: clamp(76px, 5vw, 110px); }
    .rab-image-frame { max-width: 460px; }
  }

  @media (min-width: 1440px) and (max-width: 1919px) {
    .rab-container { max-width: 1360px; }
  }

  @media (min-width: 1280px) and (max-width: 1439px) {
    .rab-container { max-width: 1240px; }
  }

  @media (max-width: 1024px) {
    .rab-grid { grid-template-columns: 1fr; gap: clamp(40px, 5vw, 56px); }
    .rab-visual { min-height: clamp(380px, 48vw, 500px); position: relative; top: auto; order: -1; }
    .rab-image-frame { max-width: 400px; }
    .rab-floating-obj { padding: 7px 11px; gap: 6px; border-radius: 10px; }
    .rab-floating-icon { width: 26px; height: 26px; border-radius: 7px; }
    .rab-floating-icon svg { width: 13px; height: 13px; }
    .rab-floating-label { font-size: 8.5px; }
  }

  @media (max-width: 820px) {
    .rab-section { padding: clamp(56px, 8vh, 76px) clamp(20px, 4vw, 32px); }
    .rab-grid { gap: 32px; }
    .rab-visual { min-height: clamp(320px, 45vw, 420px); }
    .rab-image-frame { max-width: 340px; border-radius: 28px; }
    .rab-heading { font-size: clamp(1.7rem, 4.5vw, 2.2rem); }
    .rab-paragraph { font-size: 0.95rem; max-width: 100%; }
    .rab-features-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .rab-bottom-row { grid-template-columns: 1fr; gap: 16px; }
    .rab-experience-card { flex-direction: row; gap: 20px; text-align: left; min-width: auto; padding: 18px 22px; align-items: center; justify-content: flex-start; }
    .rab-exp-icon { margin-bottom: 0; }
    .rab-exp-number { font-size: clamp(2.1rem, 5vw, 2.6rem); }
    .rab-exp-label { font-size: 10.5px; text-align: left; }
    .rab-benefits-list { grid-template-columns: 1fr 1fr; gap: 8px; }
    .rab-contact-card { flex-wrap: wrap; padding: 18px 22px; gap: 14px; }
    .rab-contact-info { flex: 1; min-width: 180px; }
    .rab-contact-buttons { flex: 1; min-width: 180px; justify-content: flex-start; }
    .rab-floating-obj { padding: 6px 10px; gap: 5px; border-radius: 9px; }
    .rab-floating-icon { width: 22px; height: 22px; border-radius: 6px; }
    .rab-floating-icon svg { width: 11px; height: 11px; }
    .rab-floating-label { font-size: 7.5px; }
  }

  @media (max-width: 640px) {
    .rab-section { padding: clamp(40px, 6vh, 52px) 18px; }
    .rab-grid { gap: 28px; }
    .rab-visual { min-height: clamp(280px, 55vw, 360px); }
    .rab-image-frame { max-width: 280px; border-radius: 24px; }
    .rab-heading { font-size: clamp(1.5rem, 6vw, 1.9rem); }
    .rab-paragraph { font-size: 0.9rem; line-height: 1.65; }
    .rab-features-grid { grid-template-columns: 1fr; gap: 10px; }
    .rab-feature-card { padding: 14px 16px; gap: 12px; border-radius: 15px; }
    .rab-feature-icon { width: 38px; height: 38px; border-radius: 10px; }
    .rab-feature-title { font-size: 1rem; }
    .rab-feature-desc { font-size: 0.8rem; }
    .rab-bottom-row { gap: 14px; }
    .rab-experience-card { padding: 16px 18px; gap: 14px; border-radius: 16px; flex-wrap: wrap; justify-content: center; text-align: center; }
    .rab-exp-icon { width: 40px; height: 40px; border-radius: 12px; }
    .rab-exp-number { font-size: clamp(1.9rem, 7vw, 2.4rem); }
    .rab-exp-label { font-size: 10px; text-align: center; }
    .rab-benefits-list { grid-template-columns: 1fr 1fr; gap: 6px; }
    .rab-benefit-text { font-size: 0.8rem; }
    .rab-contact-card { flex-direction: column; align-items: stretch; padding: 16px 18px; border-radius: 16px; gap: 14px; }
    .rab-contact-info { justify-content: center; flex: none; min-width: auto; gap: 11px; }
    .rab-contact-icon { width: 40px; height: 40px; border-radius: 11px; }
    .rab-contact-label { font-size: 11px; }
    .rab-contact-phone { font-size: 1rem; }
    .rab-contact-buttons { flex-direction: column; gap: 8px; flex: none; min-width: auto; }
    .rab-btn-gold, .rab-btn-ghost { justify-content: center; padding: 12px 20px; font-size: 0.875rem; border-radius: 12px; width: 100%; white-space: normal; }
    .rab-badge { font-size: 0.7rem; padding: 5px 14px; gap: 6px; }
    .rab-floating-obj { padding: 5px 8px; gap: 4px; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06); }
    .rab-floating-icon { width: 18px; height: 18px; border-radius: 5px; }
    .rab-floating-icon svg { width: 9px; height: 9px; }
    .rab-floating-label { font-size: 6.5px; }
  }

  @media (max-width: 400px) {
    .rab-section { padding: 32px 14px; }
    .rab-grid { gap: 22px; }
    .rab-visual { min-height: clamp(200px, 60vw, 260px); }
    .rab-image-frame { max-width: 200px; border-radius: 20px; }
    .rab-heading { font-size: 1.4rem; }
    .rab-paragraph { font-size: 0.85rem; }
    .rab-features-grid { gap: 8px; }
    .rab-feature-card { padding: 12px 14px; gap: 10px; border-radius: 13px; }
    .rab-feature-icon { width: 34px; height: 34px; border-radius: 9px; }
    .rab-feature-title { font-size: 0.9rem; }
    .rab-feature-desc { font-size: 0.75rem; }
    .rab-experience-card { padding: 14px 16px; border-radius: 14px; gap: 12px; }
    .rab-exp-icon { width: 36px; height: 36px; border-radius: 10px; }
    .rab-exp-number { font-size: clamp(1.6rem, 8vw, 2rem); }
    .rab-exp-label { font-size: 9px; }
    .rab-benefits-list { gap: 4px; }
    .rab-benefit-item { padding: 6px 8px; gap: 6px; }
    .rab-benefit-icon { width: 20px; height: 20px; border-radius: 5px; }
    .rab-benefit-text { font-size: 0.75rem; }
    .rab-contact-card { padding: 14px 14px; border-radius: 14px; gap: 12px; }
    .rab-contact-icon { width: 36px; height: 36px; }
    .rab-contact-phone { font-size: 0.9rem; }
    .rab-contact-label { font-size: 10px; }
    .rab-btn-gold, .rab-btn-ghost { padding: 10px 16px; font-size: 0.8rem; border-radius: 10px; gap: 6px; }
    .rab-badge { font-size: 0.65rem; padding: 4px 12px; gap: 5px; }
    .rab-floating-obj { padding: 4px 6px; gap: 3px; border-radius: 6px; }
    .rab-floating-icon { width: 14px; height: 14px; border-radius: 4px; }
    .rab-floating-icon svg { width: 7px; height: 7px; }
    .rab-floating-label { font-size: 5.5px; }
  }

  @media (max-width: 359px) {
    .rab-section { padding: 28px 12px; }
    .rab-benefits-list { grid-template-columns: 1fr; }
    .rab-image-frame { max-width: 172px; }
    .rab-heading { font-size: 1.3rem; }
    .rab-btn-gold, .rab-btn-ghost { padding: 10px 14px; font-size: 0.78rem; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rab-section *,
    .rab-section *::before,
    .rab-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .rab-image-frame:hover .rab-image { transform: none !important; }
    .rab-feature-card:hover { transform: none !important; }
    .rab-feature-card:hover .rab-feature-icon { transform: none !important; }
    .rab-experience-card:hover { transform: none !important; }
    .rab-experience-card:hover .rab-exp-icon { transform: none !important; }
    .rab-benefit-item:hover { transform: none !important; }
    .rab-benefit-item:hover .rab-benefit-icon { transform: none !important; }
    .rab-btn-gold:hover, .rab-btn-ghost:hover { transform: none !important; }
    .rab-floating-obj:hover { transform: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Floating Object — Memoized
// ══════════════════════════════════════════════════════════════════════════
const FloatingObj = memo(function FloatingObj({ item, isInView, index }) {
  const Icon = item.icon;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="rab-floating-obj"
        style={{ left: item.x, top: item.y, transform: `rotate(${item.rotate}deg)` }}
      >
        <div className="rab-floating-icon">
          <Icon size={15} color={TOKENS.goldDark} aria-hidden="true" />
        </div>
        <span className="rab-floating-label">{item.label}</span>
      </div>
    );
  }

  return (
    <motion.div
      className="rab-floating-obj"
      style={{ left: item.x, top: item.y, transform: `rotate(${item.rotate}deg)` }}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={
        isInView
          ? { opacity: 1, y: [0, -6, 0], scale: 1 }
          : {}
      }
      transition={{
        opacity: { duration: 0.6, delay: 0.8 + index * 0.15, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.6, delay: 0.8 + index * 0.15, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
      }}
    >
      <div className="rab-floating-icon">
        <Icon size={15} color={TOKENS.goldDark} aria-hidden="true" />
      </div>
      <span className="rab-floating-label">{item.label}</span>
    </motion.div>
  );
});
FloatingObj.displayName = "FloatingObj";

// ══════════════════════════════════════════════════════════════════════════
// Feature Card — Memoized
// ══════════════════════════════════════════════════════════════════════════
const FeatureCard = memo(function FeatureCard({ feature, isInView, index }) {
  const Icon = feature.icon;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="rab-feature-card">
        <div className="rab-feature-icon">
          <Icon size={19} color={TOKENS.gold} strokeWidth={1.8} aria-hidden="true" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div className="rab-feature-title">{feature.title}</div>
          <div className="rab-feature-desc">{feature.desc}</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="rab-feature-card"
      variants={FADE_UP_STAGGER}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rab-feature-icon">
        <Icon size={19} color={TOKENS.gold} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="rab-feature-title">{feature.title}</div>
        <div className="rab-feature-desc">{feature.desc}</div>
      </div>
    </motion.div>
  );
});
FeatureCard.displayName = "FeatureCard";

// ══════════════════════════════════════════════════════════════════════════
// Benefit Item — Memoized
// ══════════════════════════════════════════════════════════════════════════
const BenefitItem = memo(function BenefitItem({ benefit, isInView, index }) {
  const Icon = benefit.icon;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="rab-benefit-item">
        <div className="rab-benefit-icon">
          <Icon size={13} color={TOKENS.goldDark} strokeWidth={2} aria-hidden="true" />
        </div>
        <span className="rab-benefit-text">{benefit.text}</span>
      </div>
    );
  }

  return (
    <motion.div
      className="rab-benefit-item"
      initial={{ opacity: 0, x: 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rab-benefit-icon">
        <Icon size={13} color={TOKENS.goldDark} strokeWidth={2} aria-hidden="true" />
      </div>
      <span className="rab-benefit-text">{benefit.text}</span>
    </motion.div>
  );
});
BenefitItem.displayName = "BenefitItem";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function AboutRasoaf() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const animConfig = prefersReducedMotion
    ? {
        slideLeft: { hidden: {}, visible: {} },
        slideRight: { hidden: {}, visible: {} },
        scaleIn: { hidden: {}, visible: {} },
      }
    : {
        slideLeft: SLIDE_FROM_LEFT,
        slideRight: SLIDE_FROM_RIGHT,
        scaleIn: SCALE_IN,
      };

  return (
    <>
      <style>{STYLES}</style>

      <section
        className="rab-section"
        ref={sectionRef}
        aria-labelledby="about-heading"
      >
        <div className="rab-container">
          <div className="rab-grid">
            {/* LEFT — Slides from left */}
            <motion.div
              className="rab-visual"
              variants={animConfig.slideLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div
                className="rab-accent-blur"
                style={{
                  width: "clamp(140px, 22vw, 220px)",
                  height: "clamp(140px, 22vw, 220px)",
                  top: "-8%",
                  right: "8%",
                }}
              />
              <div
                className="rab-accent-blur"
                style={{
                  width: "clamp(90px, 14vw, 150px)",
                  height: "clamp(90px, 14vw, 150px)",
                  bottom: "12%",
                  left: "4%",
                }}
              />

              <motion.div
                className="rab-image-frame"
                variants={animConfig.scaleIn}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="rab-image-glow" />
                <img
                  src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550004/Cv_Care_piu0nm.docx.png"
                  alt="RASOAF international travel experiences"
                  width={420}
                  height={560}
                  className="rab-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="rab-image-gradient" />
              </motion.div>

              {FLOATING_OBJECTS.map((obj, i) => (
                <FloatingObj
                  key={i}
                  item={obj}
                  isInView={isInView}
                  index={i}
                />
              ))}
            </motion.div>

            {/* RIGHT — Slides from right */}
            <motion.div
              className="rab-content"
              variants={animConfig.slideRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="rab-header-block">
                <motion.div
                  className="rab-badge"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Sparkles size={12} color={TOKENS.gold} aria-hidden="true" />
                  About RASOAF
                  <Sparkles size={12} color={TOKENS.gold} aria-hidden="true" />
                </motion.div>

                <motion.h2
                  id="about-heading"
                  className="rab-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  About{" "}
                  <span className="rab-heading-gold">RASOAF</span>
                  <br />
                  Travels & Tours
                  <br />
                  Limited
                </motion.h2>
              </div>

              <motion.p
                className="rab-paragraph"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <strong>RASOAF Travels and Tours Limited</strong> has
                established strong partnerships with international institutions
                to provide support in admissions, visa applications, border
                assistance, scholarship opportunities, and many other
                educational and travel-related services.
              </motion.p>
              <motion.p
                className="rab-paragraph"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                We encourage individuals, organizations, and prospective
                students to contact us with their interests, inquiries,
                concerns, or complaints. Our experienced team is committed to
                providing professional guidance and reliable solutions tailored
                to your needs.
              </motion.p>

              <div className="rab-features-grid">
                {FEATURES.map((feature, i) => (
                  <FeatureCard
                    key={i}
                    feature={feature}
                    isInView={isInView}
                    index={i}
                  />
                ))}
              </div>

              <div className="rab-bottom-row">
                <motion.div
                  className="rab-experience-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.8,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="rab-exp-icon">
                    <Award
                      size={24}
                      color={TOKENS.gold}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="rab-exp-number">
                    <AnimatedCounter
                      target={20}
                      suffix="+"
                      isInView={isInView}
                    />
                  </div>
                  <div className="rab-exp-label">
                    Years
                    <br />
                    Delivering Trusted
                    <br />
                    International Travel
                    <br />
                    Solutions
                  </div>
                </motion.div>

                <div className="rab-benefits-list">
                  {BENEFITS.map((benefit, i) => (
                    <BenefitItem
                      key={i}
                      benefit={benefit}
                      isInView={isInView}
                      index={i}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className="rab-contact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.9,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="rab-contact-info">
                  <div className="rab-contact-icon">
                    <Phone
                      size={22}
                      color={TOKENS.gold}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <div className="rab-contact-label">
                      Need Travel Advice? Free Consultation
                    </div>
                    <div
                      className="rab-contact-label"
                      style={{
                        fontSize: "clamp(9px, 0.7vw, 10.5px)",
                        marginTop: 2,
                      }}
                    >
                      Available Monday–Saturday
                    </div>
                    <div className="rab-contact-phone">
                      +234-703-189-9529
                    </div>
                  </div>
                </div>
                <div className="rab-contact-buttons">
                  <a
                    href="tel:+2347031899529"
                    className="rab-btn-gold"
                    aria-label="Call RASOAF"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Call Now
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    href="https://wa.me/2347031899529"
                    className="rab-btn-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                  >
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