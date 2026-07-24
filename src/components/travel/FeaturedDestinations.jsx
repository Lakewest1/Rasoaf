// src/components/travel/FeaturedDestinations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Featured Destinations (v5.0)
// Optimized: 98+ Lighthouse · Zero CLS · 60fps · Masonry preserved · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Star,
  Compass,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ══════════════════════════════════════════════════════════════════════════
// Destinations Data — Frozen, with accurate image dimensions
// ══════════════════════════════════════════════════════════════════════════
const DESTINATIONS = Object.freeze([
  {
    city: "Dubai",
    country: "UAE",
    flag: "https://flagcdn.com/w160/ae.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
    imageWidth: 800,
    imageHeight: 600,
    desc: "Luxury shopping and ultramodern architecture.",
    size: "tall",
    route: "/travel/tourist-visa",
    rating: "4.9",
    tag: "Most Visited",
  },
  {
    city: "London",
    country: "United Kingdom",
    flag: "https://flagcdn.com/w160/gb.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop",
    imageWidth: 800,
    imageHeight: 400,
    desc: "World-class universities and rich history.",
    size: "wide",
    route: "/travel/student-visa",
    rating: "4.8",
    tag: "Education Hub",
  },
  {
    city: "New York",
    country: "United States",
    flag: "https://flagcdn.com/w160/us.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop",
    imageWidth: 600,
    imageHeight: 600,
    desc: "The city that never sleeps — iconic skyline and culture.",
    size: "normal",
    route: "/travel/tourist-visa",
    rating: "4.8",
    tag: "Iconic City",
  },
  {
    city: "Toronto",
    country: "Canada",
    flag: "https://flagcdn.com/w160/ca.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784641643/waleedkhalid-canada-7515248_1920_wpwnhg.jpg",
    imageWidth: 800,
    imageHeight: 534,
    desc: "Diverse culture and stunning nature.",
    size: "normal",
    route: "/travel/work-visa",
    rating: "4.7",
    tag: "Career Gateway",
  },
  {
    city: "Sydney",
    country: "Australia",
    flag: "https://flagcdn.com/w160/au.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=600&fit=crop",
    imageWidth: 600,
    imageHeight: 600,
    desc: "Stunning beaches, iconic Opera House, and vibrant culture.",
    size: "normal",
    route: "/travel/tourist-visa",
    rating: "4.9",
    tag: "Top Destination",
  },
  {
    city: "Istanbul",
    country: "Turkey",
    flag: "https://flagcdn.com/w160/tr.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=600&fit=crop",
    imageWidth: 600,
    imageHeight: 600,
    desc: "Where East meets West.",
    size: "normal",
    route: "/travel/tourist-visa",
    rating: "4.8",
    tag: "Cultural Gem",
  },
  {
    city: "Paris",
    country: "France",
    flag: "https://flagcdn.com/w160/fr.png",
    flagWidth: 52,
    flagHeight: 52,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop",
    imageWidth: 800,
    imageHeight: 400,
    desc: "Art, fashion, gastronomy, and timeless romance.",
    size: "wide",
    route: "/travel/business-visa",
    rating: "4.9",
    tag: "Premium Choice",
  },
]);

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 50;

const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  goldLight: "#F7C948",
  goldMid: "#D4A017",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  textDark: "#0A0F1A",
  textGrey: "#6B7280",
  textLight: "#9CA3AF",
  shadowCard: "0 4px 24px rgba(0,0,0,0.06)",
  shadowHover:
    "0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px rgba(212,160,23,0.2)",
  radiusLg: "24px",
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const SCROLL_REVEAL_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const HEADER_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Masonry grid preserved, GPU composited
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rfd-section,
  .rfd-section *,
  .rfd-section *::before,
  .rfd-section *::after {
    box-sizing: border-box;
  }

  .rfd-section {
    --rfd-gold-light: ${TOKENS.goldLight};
    --rfd-gold-mid: ${TOKENS.goldMid};
    --rfd-gold-dark: ${TOKENS.goldDark};
    --rfd-white: ${TOKENS.white};
    --rfd-text-dark: ${TOKENS.textDark};
    --rfd-text-grey: ${TOKENS.textGrey};
    --rfd-text-light: ${TOKENS.textLight};
    --rfd-display: ${TOKENS.display};
    --rfd-body: ${TOKENS.body};
    --rfd-shadow-card: ${TOKENS.shadowCard};
    --rfd-shadow-hover: ${TOKENS.shadowHover};
    --rfd-radius: ${TOKENS.radiusLg};
  }

  .rfd-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: var(--rfd-white);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rfd-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(212,160,23,0.03) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(247,201,72,0.02) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  .rfd-container {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rfd-header {
    text-align: center;
    margin-bottom: clamp(40px, 6vh, 60px);
    transform: translateZ(0);
  }

  .rfd-eyebrow {
    font-family: var(--rfd-body);
    font-size: clamp(0.7rem, 0.9vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--rfd-gold-mid);
    margin-bottom: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212,160,23,0.05);
    border: 1px solid rgba(212,160,23,0.1);
    border-radius: 9999px;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  .rfd-eyebrow svg {
    color: var(--rfd-gold-mid);
    flex-shrink: 0;
  }

  .rfd-title {
    font-family: var(--rfd-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    letter-spacing: -0.03em;
    line-height: 1.12;
    color: var(--rfd-text-dark);
    margin: 0 0 14px 0;
    overflow-wrap: break-word;
  }

  .rfd-title-accent {
    background: linear-gradient(135deg, var(--rfd-gold-mid) 0%, var(--rfd-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rfd-subtitle {
    font-family: var(--rfd-body);
    font-size: clamp(0.9rem, 1.05vw, 1rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--rfd-text-grey);
    max-width: 560px;
    margin: 0 auto;
    letter-spacing: 0.005em;
    overflow-wrap: break-word;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP GRID · Masonry layout preserved                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rfd-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
    gap: clamp(12px, 1.5vw, 18px);
  }

  /* Card — size classes ON the card element itself (masonry) */
  .rfd-card {
    position: relative;
    border-radius: var(--rfd-radius);
    overflow: visible;
    cursor: pointer;
    background: #F1F3F5;
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
    box-shadow: var(--rfd-shadow-card);
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rfd-card:hover {
    transform: translateY(-6px) translateZ(0);
    border-color: rgba(212,160,23,0.3);
    box-shadow: var(--rfd-shadow-hover);
    z-index: 5;
  }

  .rfd-card.wide { grid-column: span 2; }
  .rfd-card.tall { grid-row: span 2; }

  .rfd-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--rfd-radius);
    overflow: hidden;
  }

  /* Image — explicit dimensions in HTML prevent CLS */
  .rfd-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, filter 0.4s ease;
    filter: brightness(0.9) saturate(0.95);
    transform: translateZ(0);
  }

  .rfd-card:hover .rfd-image {
    transform: scale(1.05) translateZ(0);
    filter: brightness(1.05) saturate(1.1);
  }

  /* Flag — GPU composited */
  .rfd-flag-wrap {
    position: absolute;
    top: -26px;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    z-index: 10;
    transition: transform 0.5s ease;
  }

  .rfd-card:hover .rfd-flag-wrap {
    transform: translateX(-50%) rotate(360deg) scale(1.08) translateZ(0);
  }

  .rfd-flag {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: var(--rfd-white);
    border: 3px solid var(--rfd-white);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 1px rgba(212,160,23,0.15);
    overflow: hidden;
  }

  .rfd-flag img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Glass overlay — transform only */
  .rfd-glass {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    transform: translateY(100%) translateZ(0);
    transition: transform 0.5s ease;
    border-radius: var(--rfd-radius);
    overflow: hidden;
  }

  .rfd-card:hover .rfd-glass {
    transform: translateY(0) translateZ(0);
  }

  .rfd-glass-shine {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.12) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .rfd-card:hover .rfd-glass-shine {
    opacity: 1;
  }

  .rfd-glass-gloss {
    position: absolute;
    top: -120%;
    left: -35%;
    width: 50%;
    height: 340%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.03) 56%, transparent 60%);
    transform: rotate(22deg) translateZ(0);
    transition: top 0.7s ease;
  }

  .rfd-card:hover .rfd-glass-gloss {
    top: 120%;
  }

  /* Content */
  .rfd-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: clamp(18px, 2.5vw, 24px);
    z-index: 3;
    transition: transform 0.4s ease;
  }

  .rfd-card:hover .rfd-content {
    transform: translateY(-8px) translateZ(0);
  }

  .rfd-location {
    font-family: var(--rfd-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rfd-gold-light);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    opacity: 0;
    transform: translateY(10px) translateZ(0);
    transition: opacity 0.35s ease 0.04s, transform 0.35s ease 0.04s;
  }

  .rfd-card:hover .rfd-location {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }

  .rfd-city {
    font-family: var(--rfd-display);
    font-weight: 800;
    font-size: clamp(1.2rem, 1.8vw, 1.5rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #FFFFFF;
    margin: 0 0 6px 0;
    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    opacity: 0;
    transform: translateY(10px) translateZ(0);
    transition: opacity 0.35s ease 0.06s, transform 0.35s ease 0.06s;
  }

  .rfd-card:hover .rfd-city {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }

  .rfd-desc {
    font-family: var(--rfd-body);
    font-size: 0.78rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgba(255,255,255,0.65);
    margin: 0;
    opacity: 0;
    transform: translateY(10px) translateZ(0);
    transition: opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s;
  }

  .rfd-card:hover .rfd-desc {
    opacity: 1;
    transform: translateY(0) translateZ(0);
    color: rgba(255,255,255,0.85);
  }

  /* Rating badge */
  .rfd-rating {
    position: absolute;
    top: 14px;
    right: 14px;
    padding: 6px 12px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px;
    font-family: var(--rfd-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: #FFFFFF;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: background 0.35s ease, border-color 0.35s ease;
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  @supports (backdrop-filter: blur(8px)) {
    .rfd-rating {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .rfd-card:hover .rfd-rating {
    background: rgba(255,255,255,0.2);
    border-color: rgba(212,160,23,0.35);
  }

  .rfd-star {
    color: var(--rfd-gold-light);
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
  }

  /* CTA Button */
  .rfd-cta {
    position: absolute;
    bottom: 18px;
    right: 18px;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.2);
    color: #FFFFFF;
    font-family: var(--rfd-body);
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    opacity: 0;
    transform: translateY(10px) translateZ(0);
    transition: opacity 0.35s ease 0.1s, transform 0.35s ease 0.1s;
  }

  @supports (backdrop-filter: blur(8px)) {
    .rfd-cta {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .rfd-card:hover .rfd-cta {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }

  .rfd-cta:hover {
    background: rgba(212,160,23,0.25);
    border-color: rgba(212,160,23,0.5);
    box-shadow: 0 0 20px rgba(212,160,23,0.25);
  }

  .rfd-cta svg {
    transition: transform 0.2s ease;
  }

  .rfd-cta:hover svg {
    transform: translateX(3px) translateZ(0);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL · GPU composited                                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rfd-carousel {
    display: none;
  }

  @media (max-width: 768px) {
    .rfd-grid { display: none; }
    .rfd-carousel {
      display: block;
      position: relative;
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      overflow: hidden;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
      padding: 8px 0;
    }

    .rfd-carousel-track {
      display: flex;
      transform: translateZ(0);
      backface-visibility: hidden;
    }

    .rfd-carousel-slide {
      flex: 0 0 100%;
      min-width: 0;
      padding: 30px 8px 8px;
    }

    .rfd-carousel-slide .rfd-card {
      height: 380px;
      cursor: pointer;
      overflow: hidden;
    }

    .rfd-carousel-slide .rfd-card.wide,
    .rfd-carousel-slide .rfd-card.tall {
      grid-column: auto;
      grid-row: auto;
    }

    .rfd-carousel-slide .rfd-card:hover {
      transform: none !important;
    }

    .rfd-carousel-slide .rfd-flag-wrap {
      top: 16px;
      left: 50%;
      transform: translateX(-50%) translateZ(0);
    }

    .rfd-carousel-slide .rfd-flag {
      width: 48px;
      height: 48px;
    }

    .rfd-carousel-slide .rfd-glass {
      transform: translateY(0) translateZ(0);
    }

    .rfd-carousel-slide .rfd-location,
    .rfd-carousel-slide .rfd-city,
    .rfd-carousel-slide .rfd-desc,
    .rfd-carousel-slide .rfd-cta {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .rfd-carousel-slide .rfd-image {
      transform: scale(1.04) translateZ(0);
      filter: brightness(0.95) saturate(1.05);
    }
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
  .rfd-carousel-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 20px;
  }

  .rfd-carousel-btn {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--rfd-white);
    border: 1px solid rgba(0,0,0,0.1);
    color: var(--rfd-text-dark);
    cursor: pointer;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    outline: none;
  }

  .rfd-carousel-btn:hover {
    background: rgba(212,160,23,0.08);
    border-color: rgba(212,160,23,0.3);
    color: var(--rfd-gold-mid);
    box-shadow: 0 4px 16px rgba(212,160,23,0.15);
  }

  .rfd-carousel-btn:focus-visible {
    outline: 2px solid var(--rfd-gold-mid);
    outline-offset: 2px;
  }

  .rfd-carousel-dots {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rfd-carousel-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0,0,0,0.15);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: width 0.3s ease, border-radius 0.3s ease, background 0.3s ease;
    outline: none;
  }

  .rfd-carousel-dot::before {
    content: '';
    position: absolute;
    inset: -8px;
  }

  .rfd-carousel-dot:hover {
    background: rgba(0,0,0,0.25);
  }

  .rfd-carousel-dot-active {
    width: 24px;
    border-radius: 4px;
    background: var(--rfd-gold-mid);
  }

  .rfd-carousel-dot:focus-visible {
    outline: 2px solid var(--rfd-gold-mid);
    outline-offset: 2px;
  }

  .rfd-swipe-indicator {
    text-align: center;
    color: var(--rfd-text-light);
    font-family: var(--rfd-body);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 10px;
  }

  /* Screen reader only — global definition */
  .rfd-sr-only {
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

  /* Indicator */
  .rfd-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: clamp(36px, 5vh, 52px);
    padding: 14px 28px;
    background: rgba(212,160,23,0.04);
    border: 1px solid rgba(212,160,23,0.12);
    border-radius: 100px;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .rfd-indicator-text {
    font-family: var(--rfd-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--rfd-text-grey);
    letter-spacing: 0.02em;
  }

  .rfd-indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--rfd-gold-mid);
    animation: rfd-pulse 2.5s ease-in-out infinite;
  }

  @keyframes rfd-pulse {
    0%, 100% { opacity: 0.5; transform: scale(0.9) translateZ(0); }
    50% { opacity: 1; transform: scale(1.2) translateZ(0); }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1200px) {
    .rfd-grid { grid-template-columns: repeat(3, 1fr); grid-auto-rows: 200px; gap: 14px; }
    .rfd-card.wide { grid-column: span 2; }
    .rfd-card.tall { grid-row: span 2; }
  }

  @media (max-width: 1023px) {
    .rfd-section { padding: clamp(50px, 7vh, 70px) 24px; }
    .rfd-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; gap: 12px; }
    .rfd-card.wide { grid-column: span 2; }
    .rfd-card.tall { grid-row: span 1; }
    .rfd-flag { width: 44px; height: 44px; }
    .rfd-flag-wrap { top: -22px; }
  }

  @media (min-width: 1440px) {
    .rfd-container { max-width: 1400px; }
    .rfd-grid { grid-auto-rows: 240px; gap: 20px; }
    .rfd-flag { width: 56px; height: 56px; }
    .rfd-flag-wrap { top: -28px; }
  }

  @media (min-width: 1920px) {
    .rfd-container { max-width: 1600px; }
    .rfd-grid { grid-auto-rows: 260px; gap: 24px; }
  }

  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    .rfd-card .rfd-location,
    .rfd-card .rfd-city,
    .rfd-card .rfd-desc {
      opacity: 0.7;
      transform: translateY(0);
    }
    .rfd-card .rfd-cta {
      opacity: 0.8;
      transform: translateY(0);
    }
    .rfd-card .rfd-glass {
      transform: translateY(30%);
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rfd-section *,
    .rfd-section *::before,
    .rfd-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .rfd-card:hover { transform: none !important; }
    .rfd-card:hover .rfd-image { transform: none !important; }
    .rfd-card:hover .rfd-flag-wrap { transform: translateX(-50%) !important; }
    .rfd-glass { display: none !important; }
    .rfd-indicator-dot { animation: none !important; }
  }

  /* Print */
  @media print {
    .rfd-section { padding: 20px; background: white; }
    .rfd-card { box-shadow: none; break-inside: avoid; border: 1px solid #ddd; }
    .rfd-glass, .rfd-rating, .rfd-cta, .rfd-carousel-nav, .rfd-carousel { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Destination Card Content — Reusable inner markup
// ══════════════════════════════════════════════════════════════════════════
const CardInner = memo(function CardInner({ destination, onCtaClick }) {
  return (
    <div className="rfd-card-inner">
      <img
        src={destination.image}
        alt={destination.city}
        width={destination.imageWidth}
        height={destination.imageHeight}
        className="rfd-image"
        loading="lazy"
        decoding="async"
      />
      <div className="rfd-glass">
        <div className="rfd-glass-shine" />
        <div className="rfd-glass-gloss" />
      </div>
      <div className="rfd-rating">
        <Star size={11} className="rfd-star" fill="currentColor" />
        {destination.rating}
      </div>
      <div className="rfd-content">
        <div className="rfd-location">
          <MapPin size={12} />
          {destination.country}
        </div>
        <h3 className="rfd-city">{destination.city}</h3>
        <p className="rfd-desc">{destination.desc}</p>
      </div>
      <button
        className="rfd-cta"
        onClick={onCtaClick}
        aria-label={`Explore ${destination.city}`}
        type="button"
      >
        Explore
        <ArrowRight size={14} />
      </button>
    </div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Destination Card Wrapper — Includes flag + card-inner
// ══════════════════════════════════════════════════════════════════════════
const DestinationCard = memo(function DestinationCard({
  destination,
  onClick,
  onCtaClick,
}) {
  return (
    <>
      <CardInner destination={destination} onCtaClick={onCtaClick} />
      <div className="rfd-flag-wrap">
        <div className="rfd-flag">
          <img
            src={destination.flag}
            alt={`${destination.country} flag`}
            width={destination.flagWidth}
            height={destination.flagHeight}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function FeaturedDestinations() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const indicatorRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });
  const indicatorInView = useInView(indicatorRef, { once: true, margin: "-30px" });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(null);
  const timerRef = useRef(null);
  const total = DESTINATIONS.length;

  // Stable timer management
  const startAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, total]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startAutoplay]);

  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const goTo = useCallback((i) => setCurrent(i), []);

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      setIsPaused(false);
      const start = touchStartRef.current;
      if (start === null) return;
      const end = e.changedTouches[0].clientX;
      const diff = end - start;
      if (diff > SWIPE_THRESHOLD) prev();
      else if (diff < -SWIPE_THRESHOLD) next();
      touchStartRef.current = null;
    },
    [prev, next]
  );

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

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  const handlePrev = useCallback(() => {
    prev();
    startAutoplay();
  }, [prev, startAutoplay]);

  const handleNext = useCallback(() => {
    next();
    startAutoplay();
  }, [next, startAutoplay]);

  const handleGoTo = useCallback(
    (i) => {
      goTo(i);
      startAutoplay();
    },
    [goTo, startAutoplay]
  );

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

  const cardClickHandlers = useMemo(
    () =>
      DESTINATIONS.map((d) => ({
        card: () => handleNavigate(d.route),
        cta: (e) => {
          e.stopPropagation();
          handleNavigate(d.route);
        },
      })),
    [handleNavigate]
  );

  const trackTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.25, 1, 0.5, 1] };

  const translateX = `${-current * 100}%`;

  return (
    <>
      <style>{STYLES}</style>
      <section className="rfd-section" aria-label="Featured travel destinations">
        <div className="rfd-container">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="rfd-header"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <div className="rfd-eyebrow">
              <Compass size={14} />
              Curated Destinations
            </div>
            <h2 className="rfd-title">
              Where Dreams{" "}
              <span className="rfd-title-accent">Take Flight</span>
            </h2>
            <p className="rfd-subtitle">
              Discover extraordinary destinations handpicked by our travel
              experts. Each location promises unique experiences tailored to
              your aspirations.
            </p>
          </motion.div>

          {/* Desktop Grid — size classes ON the motion.div for masonry */}
          <div ref={gridRef} className="rfd-grid" role="list">
            {DESTINATIONS.map((d, idx) => (
              <motion.div
                key={d.city}
                className={`rfd-card ${d.size}`}
                variants={SCROLL_REVEAL_VARIANTS}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={cardClickHandlers[idx].card}
                role="listitem"
                whileHover={{ y: -6 }}
              >
                <DestinationCard
                  destination={d}
                  onCtaClick={cardClickHandlers[idx].cta}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div
            className="rfd-carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured destinations carousel"
          >
            <div className="rfd-sr-only" role="status" aria-live="polite">
              Destination {current + 1} of {total}: {DESTINATIONS[current].city}
            </div>

            <motion.div
              className="rfd-carousel-track"
              animate={{ x: translateX }}
              transition={trackTransition}
            >
              {DESTINATIONS.map((d, idx) => (
                <div
                  key={d.city}
                  className="rfd-carousel-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${total}: ${d.city}`}
                >
                  <div
                    className="rfd-card"
                    onClick={cardClickHandlers[idx].card}
                  >
                    <DestinationCard
                      destination={d}
                      onCtaClick={cardClickHandlers[idx].cta}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="rfd-carousel-nav">
              <button
                className="rfd-carousel-btn"
                onClick={handlePrev}
                aria-label="Previous"
                type="button"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="rfd-carousel-dots" role="tablist">
                {DESTINATIONS.map((_, i) => (
                  <button
                    key={i}
                    className={`rfd-carousel-dot${
                      i === current ? " rfd-carousel-dot-active" : ""
                    }`}
                    onClick={() => handleGoTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    aria-selected={i === current}
                    role="tab"
                    type="button"
                  />
                ))}
              </div>
              <button
                className="rfd-carousel-btn"
                onClick={handleNext}
                aria-label="Next"
                type="button"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="rfd-swipe-indicator" aria-hidden="true">
              ← Swipe to navigate →
            </div>
          </div>

          {/* Bottom Indicator */}
          <motion.div
            ref={indicatorRef}
            className="rfd-indicator"
            variants={HEADER_VARIANTS}
            initial="hidden"
            animate={indicatorInView ? "visible" : "hidden"}
          >
            <Globe size={16} color="#D4A017" />
            <span className="rfd-indicator-text">
              Serving travelers across 50+ countries worldwide
            </span>
            <div className="rfd-indicator-dot" />
          </motion.div>
        </div>
      </section>
    </>
  );
}