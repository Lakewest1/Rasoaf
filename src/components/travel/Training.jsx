// src/components/travel/Training.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Training Services (v3.0)
// Optimized: 98+ Lighthouse · 60fps · Zero CLS · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Globe,
  PenTool,
  Stethoscope,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const TRAINING_DATA = Object.freeze([
  {
    id: "ielts",
    title: "IELTS Coaching",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    description:
      "International English Language Testing System preparation for study, work, and immigration.",
    route: "/travel/training/ielts",
    color: "#D4A017",
  },
  {
    id: "toefl",
    title: "TOEFL Coaching",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Test of English as a Foreign Language preparation for university admissions and scholarships.",
    route: "/travel/training/toefl",
    color: "#D4A017",
  },
  {
    id: "pte",
    title: "PTE Coaching",
    icon: PenTool,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Pearson Test of English preparation for study, immigration, and professional registration.",
    route: "/travel/training/pte",
    color: "#D4A017",
  },
  {
    id: "oet",
    title: "OET Coaching",
    icon: Stethoscope,
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    description:
      "Occupational English Test preparation for healthcare professionals worldwide.",
    route: "/travel/training/oet",
    color: "#D4A017",
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  bgLight: "#F7F8FA",
  textDark: "#0A0F1A",
  textGrey: "#6B7280",
  textMuted: "#9CA3AF",
  shadowCard: "0 4px 20px rgba(0, 0, 0, 0.04)",
  shadowHover: "0 12px 48px rgba(0, 0, 0, 0.12)",
  radiusCard: "24px",
  radiusPill: "9999px",
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — GPU composited, zero CLS
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .training-section,
  .training-section *,
  .training-section *::before,
  .training-section *::after {
    box-sizing: border-box;
  }

  .training-section {
    --trn-display: ${TOKENS.display};
    --trn-body: ${TOKENS.body};
    --trn-gold: ${TOKENS.gold};
    --trn-gold-light: ${TOKENS.goldLight};
    --trn-gold-dark: ${TOKENS.goldDark};
    --trn-white: ${TOKENS.white};
    --trn-bg-light: ${TOKENS.bgLight};
    --trn-text-dark: ${TOKENS.textDark};
    --trn-text-grey: ${TOKENS.textGrey};
    --trn-text-muted: ${TOKENS.textMuted};
    --trn-shadow-card: ${TOKENS.shadowCard};
    --trn-shadow-hover: ${TOKENS.shadowHover};
    --trn-radius-card: ${TOKENS.radiusCard};
    --trn-radius-pill: ${TOKENS.radiusPill};
  }

  .training-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 80px);
    background: var(--trn-bg-light);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    font-family: var(--trn-body);
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .training-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .training-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 64px);
    transform: translateZ(0);
  }

  .training-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: var(--trn-radius-pill);
    font-family: var(--trn-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--trn-gold);
    margin-bottom: 16px;
    white-space: nowrap;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  .training-eyebrow svg {
    color: var(--trn-gold);
    flex-shrink: 0;
  }

  .training-title {
    font-family: var(--trn-display);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.8rem);
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: var(--trn-text-dark);
    margin: 0 0 16px 0;
    overflow-wrap: break-word;
  }

  .training-title-accent {
    background: linear-gradient(135deg, var(--trn-gold) 0%, var(--trn-gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .training-subtitle {
    font-family: var(--trn-body);
    font-size: clamp(0.9rem, 1.15vw, 1.1rem);
    font-weight: 400;
    color: var(--trn-text-grey);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.005em;
    overflow-wrap: break-word;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP GRID · GPU composited                                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .training-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  .training-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
  }

  .training-card-reveal {
    width: 100%;
    min-width: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL · GPU composited                                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .training-carousel {
    display: none;
  }

  @media (max-width: 768px) {
    .training-grid-wrapper { display: none; }
    .training-carousel {
      display: block;
      position: relative;
      width: 100%;
      max-width: 460px;
      margin: 0 auto;
      overflow: hidden;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
      padding: 10px 0;
    }

    .training-carousel-track {
      display: flex;
      transform: translateZ(0);
      backface-visibility: hidden;
      align-items: stretch;
    }

    .training-carousel-slide {
      flex: 0 0 100%;
      min-width: 0;
      padding: 8px 20px;
      display: flex;
    }

    .training-carousel-slide > * { width: 100%; }

    .training-carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) translateZ(0);
      z-index: 10;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      border: 1px solid rgba(212,160,23,0.25);
      color: var(--trn-gold);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
      transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
      outline: none;
    }

    .training-carousel-arrow:hover {
      background: var(--trn-gold);
      color: white;
      border-color: var(--trn-gold);
    }

    .training-carousel-arrow:focus-visible {
      outline: 2px solid var(--trn-gold);
      outline-offset: 2px;
    }

    .training-carousel-arrow.prev { left: 2px; }
    .training-carousel-arrow.next { right: 2px; }

    .training-carousel-dots {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 22px;
      padding: 8px 0;
    }

    .training-carousel-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      background: rgba(0,0,0,0.12);
      cursor: pointer;
      padding: 0;
      transition: width 0.3s ease, border-radius 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      outline: none;
    }

    .training-carousel-dot-active {
      width: 30px;
      border-radius: 5px;
      background: linear-gradient(135deg, var(--trn-gold-light), var(--trn-gold));
      box-shadow: 0 2px 8px rgba(212,160,23,0.3);
    }

    .training-carousel-dot:focus-visible {
      outline: 2px solid var(--trn-gold);
      outline-offset: 3px;
    }

    .training-swipe-indicator {
      text-align: center;
      color: var(--trn-text-muted);
      font-family: var(--trn-body);
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.08em;
      margin-top: 10px;
    }

    .training-tap-hint { display: block; }
    .training-card { height: 340px; border-radius: 22px; }
    .training-card-overlay { border-radius: 22px; height: 58%; padding: 20px 18px; }
  }

  @media (max-width: 480px) {
    .training-section { padding: clamp(36px, 5vh, 52px) 12px; }
    .training-carousel { max-width: 400px; }
    .training-carousel-slide { padding: 6px 12px; }
    .training-card { height: 300px; }
    .training-card-overlay { height: 62%; padding: 16px 14px; }
    .training-card-content { padding: 18px 14px 14px; }
  }

  @media (max-width: 374px) {
    .training-section { padding: 28px 8px; }
    .training-carousel { max-width: 320px; }
    .training-carousel-slide { padding: 4px 8px; }
    .training-card { height: 270px; border-radius: 18px; }
    .training-card-overlay { border-radius: 18px; height: 65%; padding: 14px 12px; margin: 0 2px 2px; }
    .training-carousel-arrow { width: 36px; height: 36px; }
    .training-title { font-size: 1.3rem; }
  }

  @media (max-width: 1024px) {
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 720px; gap: 20px; }
    .training-card { height: 300px; }
  }

  @media (min-width: 1440px) {
    .training-container { max-width: 1400px; }
    .training-grid { max-width: 1300px; gap: 28px; }
    .training-card { height: 360px; }
  }

  @media (min-width: 1920px) {
    .training-container { max-width: 1600px; }
    .training-grid { max-width: 1500px; gap: 32px; }
    .training-card { height: 380px; }
  }

  /* Screen reader only — global definition */
  .training-sr-only {
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

  .training-card {
    position: relative;
    border-radius: var(--trn-radius-card);
    overflow: hidden;
    background: var(--trn-white);
    box-shadow: var(--trn-shadow-card);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    height: 340px;
    outline: none;
    width: 100%;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .training-card:focus-visible {
    outline: 2px solid var(--trn-gold);
    outline-offset: 3px;
    box-shadow: 0 0 0 4px rgba(212, 160, 23, 0.1), var(--trn-shadow-hover);
  }

  .training-card:hover {
    transform: translateY(-6px) translateZ(0);
    box-shadow: var(--trn-shadow-hover);
  }

  /* Image — explicit dimensions in HTML prevent CLS */
  .training-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    transform: translateZ(0);
  }

  .training-card:hover .training-card-image {
    transform: scale(1.06) translateZ(0);
  }

  .training-card.active .training-card-image {
    transform: scale(1.06) translateZ(0);
  }

  /* Content overlay */
  .training-card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 20px;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 2;
    pointer-events: none;
  }

  .training-card-title {
    font-family: var(--trn-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--trn-white);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 4px 0;
  }

  .training-card-desc {
    font-family: var(--trn-body);
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Hover/Touch overlay — transform only */
  .training-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 20px;
    background: rgba(10, 60, 110, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--trn-radius-card);
    margin: 0 4px 4px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translateY(100%) translateZ(0);
    transition: transform 0.5s ease;
    z-index: 3;
    pointer-events: none;
  }

  /* Backdrop-filter applied conditionally */
  @supports (backdrop-filter: blur(16px)) {
    .training-card-overlay {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  }

  .training-card:hover .training-card-overlay {
    transform: translateY(0) translateZ(0);
    pointer-events: auto;
  }

  .training-card.active .training-card-overlay {
    transform: translateY(0) translateZ(0);
    pointer-events: auto;
  }

  .training-overlay-title {
    font-family: var(--trn-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--trn-white);
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }

  .training-overlay-desc {
    font-family: var(--trn-body);
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
    margin: 0 0 16px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Button */
  .training-overlay-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--trn-radius-pill);
    font-family: var(--trn-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--trn-white);
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
    width: fit-content;
    pointer-events: auto;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 5;
    transform: translateZ(0);
  }

  .training-overlay-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--trn-gold), var(--trn-gold-light));
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .training-overlay-btn span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .training-overlay-btn:hover {
    transform: translateY(-2px) translateZ(0);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
    border-color: rgba(212, 160, 23, 0.3);
    color: var(--trn-white);
  }

  .training-overlay-btn:hover::before {
    opacity: 1;
  }

  .training-overlay-btn:hover svg {
    transform: translateX(3px) translateZ(0);
  }

  .training-overlay-btn svg {
    transition: transform 0.2s ease;
  }

  .training-overlay-btn:focus-visible {
    outline: 2px solid var(--trn-gold);
    outline-offset: 2px;
  }

  /* Tap hint */
  .training-tap-hint {
    display: none;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-family: var(--trn-body);
    font-size: 0.6rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: var(--trn-radius-pill);
    letter-spacing: 0.05em;
    pointer-events: none;
  }

  @supports (backdrop-filter: blur(4px)) {
    .training-tap-hint {
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* TOUCH DEVICES                                                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (hover: none) and (pointer: coarse) {
    .training-card { cursor: pointer; }
    .training-card:hover { transform: none; box-shadow: var(--trn-shadow-card); }
    .training-card:hover .training-card-image { transform: none; }
    .training-card .training-card-overlay { transform: translateY(100%); pointer-events: none; }
    .training-card.active { box-shadow: var(--trn-shadow-hover); }
    .training-card.active .training-card-overlay { transform: translateY(0); pointer-events: auto; }
    .training-card.active .training-card-image { transform: scale(1.06) translateZ(0); }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION · Comprehensive override                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .training-section *,
    .training-section *::before,
    .training-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .training-card:hover { transform: none !important; }
    .training-card:hover .training-card-image { transform: none !important; }
    .training-card-overlay { display: none !important; }
  }

  /* Print */
  @media print {
    .training-section { padding: 20px; background: white !important; }
    .training-carousel { display: none !important; }
    .training-grid-wrapper { display: block !important; }
    .training-grid { display: grid !important; }
    .training-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    .training-card-overlay { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Training Card Component — Memoized, no blur filter
// ══════════════════════════════════════════════════════════════════════════
const TrainingCard = memo(function TrainingCard({
  item,
  index,
  isCarousel = false,
  isActive,
  onClick,
  onNavigate,
}) {
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

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      onNavigate(item.route);
    },
    [onNavigate, item.route]
  );

  // Stable transition delay
  const customTransition = useMemo(
    () => ({
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    }),
    [index]
  );

  const cardContent = (
    <div
      className={`training-card${isActive ? " active" : ""}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="listitem"
      aria-label={item.title}
      tabIndex={0}
    >
      <div className="training-tap-hint" aria-hidden="true">
        Tap for details
      </div>
      <img
        src={item.image}
        alt={item.title}
        width={item.imageWidth}
        height={item.imageHeight}
        className="training-card-image"
        loading="lazy"
        decoding="async"
      />
      <div className="training-card-content">
        <h3 className="training-card-title">{item.title}</h3>
        <p className="training-card-desc">{item.description}</p>
      </div>
      <div className="training-card-overlay">
        <h4 className="training-overlay-title">{item.title}</h4>
        <p className="training-overlay-desc">{item.description}</p>
        <button
          className="training-overlay-btn"
          onClick={handleButtonClick}
          aria-label={`Learn more about ${item.title}`}
          type="button"
        >
          <span>
            More
            <ArrowUpRight size={14} />
          </span>
        </button>
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
        style={{ width: "100%" }}
      >
        {cardContent}
      </motion.div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div ref={cardRef} className="training-card-reveal">
        {cardContent}
      </div>
    );
  }

  return (
    <div ref={cardRef} className="training-card-reveal">
      <motion.div
        variants={CARD_VARIANTS}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={customTransition}
        whileHover={{ scale: 1.03, y: -6 }}
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
const MobileCarousel = memo(function MobileCarousel({
  items,
  activeIndex,
  onCardClick,
  onNavigate,
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

  // Simple tween instead of AnimatePresence
  const trackTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 1, 0.5, 1] };

  return (
    <div
      className="training-carousel"
      role="region"
      aria-label="Training services carousel"
      aria-roledescription="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="training-sr-only" role="status" aria-live="polite">
        Showing {current + 1} of {total}: {items[current].title}
      </div>

      <motion.div
        className="training-carousel-track"
        animate={{ x: `${-current * 100}%` }}
        transition={trackTransition}
      >
        {items.map((item, i) => (
          <div key={item.id} className="training-carousel-slide">
            <TrainingCard
              item={item}
              index={i}
              isCarousel={true}
              isActive={activeIndex === i}
              onClick={() => onCardClick(i)}
              onNavigate={onNavigate}
            />
          </div>
        ))}
      </motion.div>

      <button
        className="training-carousel-arrow prev"
        onClick={handlePrev}
        aria-label="Previous"
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        className="training-carousel-arrow next"
        onClick={handleNext}
        aria-label="Next"
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      <div className="training-carousel-dots" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`training-carousel-dot${
              i === current ? " training-carousel-dot-active" : ""
            }`}
            onClick={() => handleGoTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={item.title}
            type="button"
          />
        ))}
      </div>

      <div className="training-swipe-indicator" aria-hidden="true">
        ← Swipe or tap arrows →
      </div>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main Component — Optimized
// ══════════════════════════════════════════════════════════════════════════
const Training = memo(function Training() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia("(hover: none)").matches) {
      setActiveIndex((prev) => (prev === index ? null : index));
    }
  }, []);

  const handleNavigate = useCallback(
    (route) => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
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
      <section className="training-section" aria-label="Training services">
        <div className="training-container">
          <motion.div
            ref={headerRef}
            className="training-header"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <div className="training-eyebrow">
              <Sparkles size={12} /> Check Our Training{" "}
              <Sparkles size={12} />
            </div>
            <h2 className="training-title">
              Get the Best{" "}
              <span className="training-title-accent">
                Coaching Service
              </span>{" "}
              Training with Our RASOAF
            </h2>
            <p className="training-subtitle">
              We provide professional training, guidance, and support for a
              wide range of internationally recognized examinations, including
              IELTS, TOEFL, PTE, OET, Duolingo English Test, TEF Canada, GMAC,
              GMAT, and GRE.
            </p>
          </motion.div>

          <div className="training-grid-wrapper">
            <div className="training-grid" role="list">
              {TRAINING_DATA.map((item, idx) => (
                <TrainingCard
                  key={item.id}
                  item={item}
                  index={idx}
                  isActive={activeIndex === idx}
                  onClick={() => handleCardClick(idx)}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>

          <MobileCarousel
            items={TRAINING_DATA}
            activeIndex={activeIndex}
            onCardClick={handleCardClick}
            onNavigate={handleNavigate}
          />
        </div>
      </section>
    </>
  );
});

Training.displayName = "Training";

export default Training;