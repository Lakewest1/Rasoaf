// src/components/travel/FeaturedDestinations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Featured Destinations (v4.1)
// White Background · Scroll Reveal · Premium Luxury · GPU Accelerated
// RASOAF Typography · Country Flags · Crystal Glass · 360° Rotate
// Auto-slider mobile FIXED · Perfectly Responsive 320px → 2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Star, Compass, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DESTINATIONS = Object.freeze([
  { city: "Dubai", country: "UAE", flag: "https://flagcdn.com/w160/ae.png", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop", desc: "Luxury shopping and ultramodern architecture.", size: "tall", route: "/travel/tourist-visa", rating: "4.9", tag: "Most Visited" },
  { city: "London", country: "United Kingdom", flag: "https://flagcdn.com/w160/gb.png", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop", desc: "World-class universities and rich history.", size: "wide", route: "/travel/student-visa", rating: "4.8", tag: "Education Hub" },
  { city: "New York", country: "United States", flag: "https://flagcdn.com/w160/us.png", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop", desc: "The city that never sleeps — iconic skyline and culture.", size: "normal", route: "/travel/tourist-visa", rating: "4.8", tag: "Iconic City" },
  { city: "Toronto", country: "Canada", flag: "https://flagcdn.com/w160/ca.png", image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784641643/waleedkhalid-canada-7515248_1920_wpwnhg.jpg", desc: "Diverse culture and stunning nature.", size: "normal", route: "/travel/work-visa", rating: "4.7", tag: "Career Gateway" },
  { city: "Sydney", country: "Australia", flag: "https://flagcdn.com/w160/au.png", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=600&fit=crop", desc: "Stunning beaches, iconic Opera House, and vibrant culture.", size: "normal", route: "/travel/tourist-visa", rating: "4.9", tag: "Top Destination" },
  { city: "Istanbul", country: "Turkey", flag: "https://flagcdn.com/w160/tr.png", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=600&fit=crop", desc: "Where East meets West.", size: "normal", route: "/travel/tourist-visa", rating: "4.8", tag: "Cultural Gem" },
  { city: "Paris", country: "France", flag: "https://flagcdn.com/w160/fr.png", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop", desc: "Art, fashion, gastronomy, and timeless romance.", size: "wide", route: "/travel/business-visa", rating: "4.9", tag: "Premium Choice" },
]);

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  goldLight: "#F7C948", goldMid: "#D4A017", goldDark: "#B8860B",
  white: "#FFFFFF", textDark: "#0A0F1A", textGrey: "#6B7280", textLight: "#9CA3AF",
  transition: "cubic-bezier(0.22, 1, 0.36, 1)",
  shadowCard: "0 4px 24px rgba(0,0,0,0.06)",
  shadowHover: "0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px rgba(212,160,23,0.2)",
  radiusLg: "24px",
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to .rfd-section
// ══════════════════════════════════════════════════════════════════════════
const OptimizedCSS = `
  .rfd-section,
  .rfd-section *,
  .rfd-section *::before,
  .rfd-section *::after { box-sizing: border-box; }

  .rfd-section {
    --rfd-gold-light: ${TOKENS.goldLight}; --rfd-gold-mid: ${TOKENS.goldMid};
    --rfd-gold-dark: ${TOKENS.goldDark}; --rfd-white: ${TOKENS.white};
    --rfd-text-dark: ${TOKENS.textDark}; --rfd-text-grey: ${TOKENS.textGrey};
    --rfd-text-light: ${TOKENS.textLight};
    --rfd-display: ${TOKENS.display}; --rfd-body: ${TOKENS.body};
    --rfd-transition-smooth: ${TOKENS.transition};
    --rfd-shadow-card: ${TOKENS.shadowCard}; --rfd-shadow-hover: ${TOKENS.shadowHover};
    --rfd-radius: ${TOKENS.radiusLg};
  }

  .rfd-section {
    width: 100%; max-width: 100vw;
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: var(--rfd-white); position: relative;
    overflow-x: clip; overflow-y: visible;
    contain: layout paint style; isolation: isolate;
  }

  .rfd-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(212,160,23,0.03) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(247,201,72,0.02) 0%, transparent 40%);
    pointer-events: none; z-index: 0;
  }

  .rfd-container { max-width: 1320px; margin: 0 auto; position: relative; z-index: 2; }

  /* Header */
  .rfd-header { text-align: center; margin-bottom: clamp(40px, 6vh, 60px); }

  .rfd-eyebrow {
    font-family: var(--rfd-body); font-size: clamp(0.7rem, 0.9vw, 0.8rem);
    font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--rfd-gold-mid); margin-bottom: 14px;
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 8px 20px; background: rgba(212,160,23,0.05);
    border: 1px solid rgba(212,160,23,0.1); border-radius: 9999px;
  }

  .rfd-eyebrow svg { color: var(--rfd-gold-mid); flex-shrink: 0; }

  .rfd-title {
    font-family: var(--rfd-display); font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.4rem); letter-spacing: -0.03em;
    line-height: 1.12; color: var(--rfd-text-dark); margin: 0 0 14px 0;
    overflow-wrap: break-word;
  }

  .rfd-title-accent {
    background: linear-gradient(135deg, var(--rfd-gold-mid) 0%, var(--rfd-gold-dark) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .rfd-subtitle {
    font-family: var(--rfd-body); font-size: clamp(0.9rem, 1.05vw, 1rem);
    font-weight: 400; line-height: 1.7; color: var(--rfd-text-grey);
    max-width: 560px; margin: 0 auto; letter-spacing: 0.005em; overflow-wrap: break-word;
  }

  /* Desktop Grid */
  .rfd-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px; gap: clamp(12px, 1.5vw, 18px);
  }

  /* Card */
  .rfd-card {
    position: relative; border-radius: var(--rfd-radius); overflow: visible;
    cursor: pointer; background: #F1F3F5; border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.6s var(--rfd-transition-smooth), box-shadow 0.6s var(--rfd-transition-smooth), border-color 0.6s var(--rfd-transition-smooth);
    will-change: transform; box-shadow: var(--rfd-shadow-card);
  }
  .rfd-card:hover { transform: translateY(-6px); border-color: rgba(212,160,23,0.3); box-shadow: var(--rfd-shadow-hover); z-index: 5; }
  .rfd-card.wide { grid-column: span 2; }
  .rfd-card.tall { grid-row: span 2; }
  .rfd-card-inner { position: relative; width: 100%; height: 100%; border-radius: var(--rfd-radius); overflow: hidden; }

  .rfd-image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s var(--rfd-transition-smooth), filter 0.5s ease;
    will-change: transform; filter: brightness(0.9) saturate(0.95);
  }
  .rfd-card:hover .rfd-image { transform: scale(1.06); filter: brightness(1.05) saturate(1.1); }

  /* Flag */
  .rfd-flag-wrap { position: absolute; top: -26px; left: 50%; transform: translateX(-50%); z-index: 10; transition: transform 0.7s var(--rfd-transition-smooth); will-change: transform; }
  .rfd-card:hover .rfd-flag-wrap { transform: translateX(-50%) rotate(360deg) scale(1.08); }
  .rfd-flag { width: 52px; height: 52px; border-radius: 50%; background: var(--rfd-white); border: 3px solid var(--rfd-white); box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(212,160,23,0.15); overflow: hidden; }
  .rfd-flag img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Glass */
  .rfd-glass { position: absolute; inset: 0; z-index: 2; pointer-events: none; transform: translateY(100%); transition: transform 0.7s var(--rfd-transition-smooth); border-radius: var(--rfd-radius); overflow: hidden; }
  .rfd-card:hover .rfd-glass { transform: translateY(0); }
  .rfd-glass-shine { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.15) 0%, transparent 50%); opacity: 0; transition: opacity 0.8s var(--rfd-transition-smooth); }
  .rfd-card:hover .rfd-glass-shine { opacity: 1; }
  .rfd-glass-gloss { position: absolute; top: -120%; left: -35%; width: 50%; height: 340%; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0.04) 56%, transparent 60%); transform: rotate(22deg); transition: top 0.9s var(--rfd-transition-smooth); }
  .rfd-card:hover .rfd-glass-gloss { top: 120%; }

  /* Content */
  .rfd-content { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(18px, 2.5vw, 24px); z-index: 3; transition: transform 0.6s var(--rfd-transition-smooth); }
  .rfd-card:hover .rfd-content { transform: translateY(-8px); }
  .rfd-location { font-family: var(--rfd-body); font-size: 0.7rem; font-weight: 700; color: var(--rfd-gold-light); letter-spacing: 0.12em; text-transform: uppercase; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; opacity: 0; transform: translateY(12px); transition: opacity 0.5s var(--rfd-transition-smooth) 0.04s, transform 0.5s var(--rfd-transition-smooth) 0.04s; }
  .rfd-card:hover .rfd-location { opacity: 1; transform: translateY(0); }
  .rfd-city { font-family: var(--rfd-display); font-weight: 800; font-size: clamp(1.2rem, 1.8vw, 1.5rem); letter-spacing: -0.02em; line-height: 1.15; color: #FFFFFF; margin: 0 0 6px 0; text-shadow: 0 2px 8px rgba(0,0,0,0.3); opacity: 0; transform: translateY(12px); transition: opacity 0.5s var(--rfd-transition-smooth) 0.08s, transform 0.5s var(--rfd-transition-smooth) 0.08s; }
  .rfd-card:hover .rfd-city { opacity: 1; transform: translateY(0); }
  .rfd-desc { font-family: var(--rfd-body); font-size: 0.78rem; font-weight: 400; line-height: 1.5; color: rgba(255,255,255,0.65); margin: 0; opacity: 0; transform: translateY(12px); transition: opacity 0.5s var(--rfd-transition-smooth) 0.12s, transform 0.5s var(--rfd-transition-smooth) 0.12s; }
  .rfd-card:hover .rfd-desc { opacity: 1; transform: translateY(0); color: rgba(255,255,255,0.85); }

  /* Rating */
  .rfd-rating { position: absolute; top: 14px; right: 14px; padding: 6px 12px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; font-family: var(--rfd-body); font-size: 0.7rem; font-weight: 700; color: #FFFFFF; z-index: 4; display: flex; align-items: center; gap: 4px; transition: all 0.4s ease; text-shadow: 0 1px 3px rgba(0,0,0,0.2); }
  .rfd-card:hover .rfd-rating { background: rgba(255,255,255,0.2); border-color: rgba(212,160,23,0.35); }
  .rfd-star { color: var(--rfd-gold-light); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }

  /* CTA */
  .rfd-cta { position: absolute; bottom: 18px; right: 18px; z-index: 5; display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 100px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: #FFFFFF; font-family: var(--rfd-body); font-size: 0.75rem; font-weight: 600; cursor: pointer; opacity: 0; transform: translateY(12px); transition: opacity 0.5s var(--rfd-transition-smooth) 0.16s, transform 0.5s var(--rfd-transition-smooth) 0.16s; }
  .rfd-card:hover .rfd-cta { opacity: 1; transform: translateY(0); }
  .rfd-cta:hover { background: rgba(212,160,23,0.25); border-color: rgba(212,160,23,0.5); box-shadow: 0 0 20px rgba(212,160,23,0.25); }
  .rfd-cta svg { transition: transform 0.3s ease; }
  .rfd-cta:hover svg { transform: translateX(3px); }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL · Displayed at ≤768px                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rfd-carousel { display: none; }

  @media (max-width: 768px) {
    .rfd-grid { display: none; }
    .rfd-carousel {
      display: block;
      position: relative; width: 100%; max-width: 480px; margin: 0 auto;
      overflow: hidden; touch-action: pan-y;
      user-select: none; -webkit-user-select: none; padding: 8px 0;
    }
    .rfd-carousel-track {
      display: flex; will-change: transform; backface-visibility: hidden;
      transform: translate3d(0,0,0);
    }
    .rfd-carousel-slide {
      flex: 0 0 100%; min-width: 0; padding: 30px 8px 8px;
    }
    .rfd-carousel-slide .rfd-card { height: 380px; cursor: pointer; overflow: hidden; }
    .rfd-carousel-slide .rfd-card:hover { transform: none !important; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 16px; left: 50%; transform: translateX(-50%); }
    .rfd-carousel-slide .rfd-flag { width: 48px; height: 48px; }
    .rfd-carousel-slide .rfd-glass { transform: translateY(0); }
    .rfd-carousel-slide .rfd-location,
    .rfd-carousel-slide .rfd-city,
    .rfd-carousel-slide .rfd-desc,
    .rfd-carousel-slide .rfd-cta { opacity: 1 !important; transform: translateY(0) !important; }
    .rfd-carousel-slide .rfd-image { transform: scale(1.04); filter: brightness(0.95) saturate(1.05); }
  }

  @media (max-width: 600px) {
    .rfd-section { padding: clamp(32px, 5vh, 48px) 16px; }
    .rfd-carousel { max-width: 420px; }
    .rfd-carousel-slide .rfd-card { height: 340px; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 14px; }
    .rfd-carousel-slide .rfd-flag { width: 40px; height: 40px; border-width: 2px; }
    .rfd-content { padding: 16px; }
    .rfd-city { font-size: 1.2rem; }
    .rfd-desc { font-size: 0.72rem; }
    .rfd-cta { padding: 7px 14px; font-size: 0.7rem; bottom: 14px; right: 14px; }
  }

  @media (max-width: 400px) {
    .rfd-section { padding: 28px 12px; }
    .rfd-carousel { max-width: 360px; }
    .rfd-carousel-slide .rfd-card { height: 300px; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 12px; }
    .rfd-carousel-slide .rfd-flag { width: 36px; height: 36px; }
    .rfd-title { font-size: 1.4rem; }
    .rfd-city { font-size: 1.1rem; }
    .rfd-content { padding: 14px; }
    .rfd-cta { padding: 6px 12px; font-size: 0.68rem; bottom: 12px; right: 12px; }
    .rfd-eyebrow { font-size: 0.65rem; padding: 6px 14px; }
  }

  @media (max-width: 360px) {
    .rfd-carousel { max-width: 320px; }
    .rfd-carousel-slide .rfd-card { height: 270px; }
    .rfd-carousel-slide .rfd-flag { width: 32px; height: 32px; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 10px; }
    .rfd-content { padding: 12px; }
    .rfd-city { font-size: 1rem; }
    .rfd-desc { font-size: 0.68rem; }
  }

  /* Carousel Navigation */
  .rfd-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px; }
  .rfd-carousel-btn { position: relative; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--rfd-white); border: 1px solid rgba(0,0,0,0.1); color: var(--rfd-text-dark); cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.06); outline: none; }
  .rfd-carousel-btn:hover { background: rgba(212,160,23,0.08); border-color: rgba(212,160,23,0.3); color: var(--rfd-gold-mid); box-shadow: 0 4px 16px rgba(212,160,23,0.15); }
  .rfd-carousel-btn:focus-visible { outline: 2px solid var(--rfd-gold-mid); outline-offset: 2px; }
  .rfd-carousel-dots { display: flex; align-items: center; gap: 10px; }
  .rfd-carousel-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: rgba(0,0,0,0.15); border: none; cursor: pointer; padding: 0; transition: all 0.35s ease; outline: none; }
  .rfd-carousel-dot::before { content: ''; position: absolute; inset: -8px; }
  .rfd-carousel-dot:hover { background: rgba(0,0,0,0.25); }
  .rfd-carousel-dot-active { width: 24px; border-radius: 4px; background: var(--rfd-gold-mid); }
  .rfd-carousel-dot:focus-visible { outline: 2px solid var(--rfd-gold-mid); outline-offset: 2px; }
  .rfd-swipe-indicator { text-align: center; color: var(--rfd-text-light); font-family: var(--rfd-body); font-size: 10px; font-weight: 500; letter-spacing: 0.08em; margin-top: 10px; }

  /* Indicator */
  .rfd-indicator { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: clamp(36px, 5vh, 52px); padding: 14px 28px; background: rgba(212,160,23,0.04); border: 1px solid rgba(212,160,23,0.12); border-radius: 100px; max-width: fit-content; margin-left: auto; margin-right: auto; }
  .rfd-indicator-text { font-family: var(--rfd-body); font-size: 0.8rem; font-weight: 500; color: var(--rfd-text-grey); letter-spacing: 0.02em; }
  .rfd-indicator-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--rfd-gold-mid); animation: rfd-pulse 2s ease-in-out infinite; }
  @keyframes rfd-pulse { 0%,100%{opacity:0.4;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.3)} }

  /* Desktop responsive */
  @media (max-width: 1200px) { .rfd-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 14px; } .rfd-card.wide { grid-column: span 2; } .rfd-card.tall { grid-row: span 2; } }
  @media (max-width: 1023px) { .rfd-section { padding: clamp(50px, 7vh, 70px) 24px; } .rfd-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; gap: 12px; } .rfd-card.wide { grid-column: span 2; } .rfd-card.tall { grid-row: span 1; } .rfd-flag { width: 44px; height: 44px; } .rfd-flag-wrap { top: -22px; } }
  @media (min-width: 1440px) { .rfd-container { max-width: 1400px; } .rfd-grid { grid-auto-rows: 240px; gap: 20px; } .rfd-flag { width: 56px; height: 56px; } .rfd-flag-wrap { top: -28px; } }
  @media (min-width: 1920px) { .rfd-container { max-width: 1600px; } .rfd-grid { grid-auto-rows: 260px; gap: 24px; } }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rfd-section, .rfd-section *, .rfd-section *::before, .rfd-section *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
    .rfd-card:hover { transform: none !important; }
    .rfd-card:hover .rfd-image { transform: none !important; }
    .rfd-glass { display: none !important; }
  }

  /* Touch */
  @media (hover: none) and (pointer: coarse) {
    .rfd-card .rfd-location, .rfd-card .rfd-city, .rfd-card .rfd-desc { opacity: 0.7; transform: translateY(0); }
    .rfd-card .rfd-cta { opacity: 0.8; transform: translateY(0); }
    .rfd-card .rfd-glass { transform: translateY(30%); }
  }

  @media print {
    .rfd-section { padding: 20px; background: white; }
    .rfd-card { box-shadow: none; break-inside: avoid; border: 1px solid #ddd; }
    .rfd-glass, .rfd-rating, .rfd-cta, .rfd-carousel-nav, .rfd-carousel { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ══════════════════════════════════════════════════════════════════════════
const scrollRevealVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (custom) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: custom * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function FeaturedDestinations() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const indicatorRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });
  const indicatorInView = useInView(indicatorRef, { once: true, margin: "-40px" });
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const total = DESTINATIONS.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) timerRef.current = setInterval(() => setCurrent(prev => (prev + 1) % total), AUTOPLAY_MS);
  }, [total, isPaused]);

  useEffect(() => { startAutoplay(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startAutoplay]);

  const goTo = useCallback((i) => { setCurrent(((i % total) + total) % total); startAutoplay(); }, [total, startAutoplay]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  const handleTouchStart = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > SWIPE_THRESHOLD) prev();
    else if (diff < -SWIPE_THRESHOLD) next();
    setTouchStart(null); setIsPaused(false); startAutoplay();
  }, [touchStart, prev, next, startAutoplay]);

  const handleNavigate = useCallback((route) => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => navigate(route), 300); }, [navigate]);
  const translateX = useMemo(() => `-${current * 100}%`, [current]);

  return (
    <>
      <style>{OptimizedCSS}</style>
      <section className="rfd-section" ref={sectionRef} aria-label="Featured travel destinations">
        <div className="rfd-container">
          <motion.div ref={headerRef} className="rfd-header" variants={fadeInUpVariants} initial="hidden" animate={headerInView ? "visible" : "hidden"}>
            <div className="rfd-eyebrow"><Compass size={14} />Curated Destinations</div>
            <h2 className="rfd-title">Where Dreams <span className="rfd-title-accent">Take Flight</span></h2>
            <p className="rfd-subtitle">Discover extraordinary destinations handpicked by our travel experts. Each location promises unique experiences tailored to your aspirations.</p>
          </motion.div>

          {/* Desktop Grid */}
          <motion.div ref={gridRef} className="rfd-grid" variants={staggerContainerVariants} initial="hidden" animate={gridInView ? "visible" : "hidden"} role="list">
            {DESTINATIONS.map((d, idx) => (
              <motion.div key={idx} className={`rfd-card ${d.size}`} variants={scrollRevealVariants} custom={idx} onClick={() => handleNavigate(d.route)} role="listitem" whileHover={{ y: -6 }}>
                <div className="rfd-card-inner">
                  <img src={d.image} alt={d.city} className="rfd-image" loading="lazy" decoding="async" />
                  <div className="rfd-glass"><div className="rfd-glass-shine" /><div className="rfd-glass-gloss" /></div>
                  <div className="rfd-rating"><Star size={11} className="rfd-star" fill="currentColor" />{d.rating}</div>
                  <div className="rfd-content"><div className="rfd-location"><MapPin size={12} />{d.country}</div><h3 className="rfd-city">{d.city}</h3><p className="rfd-desc">{d.desc}</p></div>
                  <button className="rfd-cta" onClick={(e) => { e.stopPropagation(); handleNavigate(d.route); }} aria-label={`Explore ${d.city}`}>Explore<ArrowRight size={14} /></button>
                </div>
                <div className="rfd-flag-wrap"><div className="rfd-flag"><img src={d.flag} alt={`${d.country} flag`} loading="lazy" decoding="async" /></div></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel */}
          <motion.div className="rfd-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} role="region" aria-roledescription="carousel" aria-label="Featured destinations carousel">
            <div className="sr-only" role="status" aria-live="polite">Destination {current + 1} of {total}: {DESTINATIONS[current].city}</div>
            <div className="rfd-carousel-track" style={{ transform: `translate3d(${translateX}, 0, 0)` }}>
              {DESTINATIONS.map((d, idx) => (
                <div key={idx} className="rfd-carousel-slide" role="group" aria-roledescription="slide" aria-label={`${idx + 1} of ${total}: ${d.city}`}>
                  <div className="rfd-card" onClick={() => handleNavigate(d.route)}>
                    <div className="rfd-card-inner">
                      <img src={d.image} alt={d.city} className="rfd-image" loading="lazy" decoding="async" />
                      <div className="rfd-glass"><div className="rfd-glass-shine" /><div className="rfd-glass-gloss" /></div>
                      <div className="rfd-rating"><Star size={11} className="rfd-star" fill="currentColor" />{d.rating}</div>
                      <div className="rfd-content"><div className="rfd-location"><MapPin size={12} />{d.country}</div><h3 className="rfd-city">{d.city}</h3><p className="rfd-desc">{d.desc}</p></div>
                      <button className="rfd-cta" onClick={(e) => { e.stopPropagation(); handleNavigate(d.route); }} aria-label={`Explore ${d.city}`}>Explore<ArrowRight size={14} /></button>
                    </div>
                    <div className="rfd-flag-wrap"><div className="rfd-flag"><img src={d.flag} alt={`${d.country} flag`} loading="lazy" decoding="async" /></div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rfd-carousel-nav">
              <button className="rfd-carousel-btn" onClick={prev} aria-label="Previous" type="button"><ChevronLeft size={18} /></button>
              <div className="rfd-carousel-dots" role="tablist">
                {DESTINATIONS.map((_, i) => (<button key={i} className={`rfd-carousel-dot${i === current ? " rfd-carousel-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} aria-selected={i === current} role="tab" type="button" />))}
              </div>
              <button className="rfd-carousel-btn" onClick={next} aria-label="Next" type="button"><ChevronRight size={18} /></button>
            </div>
            <div className="rfd-swipe-indicator" aria-hidden="true">← Swipe to navigate →</div>
          </motion.div>

          <motion.div ref={indicatorRef} className="rfd-indicator" variants={fadeInUpVariants} initial="hidden" animate={indicatorInView ? "visible" : "hidden"}>
            <Globe size={16} color="#D4A017" /><span className="rfd-indicator-text">Serving travelers across 50+ countries worldwide</span><div className="rfd-indicator-dot" />
          </motion.div>
        </div>
      </section>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </>
  );
}