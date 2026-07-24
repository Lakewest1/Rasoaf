// src/components/travel/VisaServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Visa Services Grid (v2)
// Editorial luxury design · Image-first cards · Glass morphism overlays
// RASOAF Typography System · Full-width editorial heading · Scroll reveal
// GPU-accelerated · Perfectly responsive 320px → 2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Eye, Sparkles, Compass, ArrowUpRight } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Visa Services Data
// ══════════════════════════════════════════════════════════════════════════
const services = Object.freeze([
  {
    id: "student",
    title: "Student Visa",
    description: "Transform your future with world-class education. We handle admissions, LOA, CAS, DS-160, and study permits for premier institutions in Canada, USA, UK, Australia, and Europe.",
    processingTime: "4–8 weeks",
    successRate: "95% Success",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550199/Rasoaf5_caopg8.jpg",
    route: "/travel/student-visa",
    color: "#667eea",
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Accelerate your global career with premium work visa solutions. Expert handling of employment documentation, compliance, and fast-track processing for skilled professionals.",
    processingTime: "6–12 weeks",
    successRate: "92% Success",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop&crop=center",
    route: "/travel/work-visa",
    color: "#0D9488",
  },
  {
    id: "tourist",
    title: "Tourist Visa",
    description: "Experience the extraordinary with seamless tourist visa processing. From exotic destinations to cultural wonders, we make your travel dreams a reality.",
    processingTime: "2–4 weeks",
    successRate: "98% Success",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
    route: "/travel/tourist-visa",
    color: "#7C3AED",
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Elevate your corporate presence globally with premium business visa services. Specialized handling for conferences, trade missions, and international expansion.",
    processingTime: "3–6 weeks",
    successRate: "94% Success",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center",
    route: "/travel/business-visa",
    color: "#DC2626",
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Reunite with loved ones through our comprehensive family reunification services. We handle complex documentation for family residence and long-term stays with care.",
    processingTime: "8–16 weeks",
    successRate: "88% Success",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&crop=center",
    route: "/travel/family-visa",
    color: "#E11D48",
  },
  {
    id: "flights",
    title: "Flight Booking",
    description: "Discover exceptional flight deals with premier global airlines. Luxury and economy options with flexible booking, real-time tracking, and 24/7 concierge support.",
    processingTime: "Instant",
    successRate: "100% Success",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&crop=center",
    route: "/travel/flights",
    color: "#0284C7",
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

// ══════════════════════════════════════════════════════════════════════════
// RASOAF Design Tokens
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFFDF8",
  white: "#FFFFFF",
  charcoal: "#0A0F1A",
  textPrimary: "#0A0F1A",
  textSecondary: "#5F5F5F",
  textMuted: "#9CA3AF",
  transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  transitionBounce: "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  radiusLg: "24px",
  radiusMd: "16px",
  radiusSm: "10px",
  shadowCard: "0 4px 24px rgba(0, 0, 0, 0.06)",
  shadowHover: "0 20px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(212, 160, 23, 0.15)",
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS  RASOAF Typography System
// ══════════════════════════════════════════════════════════════════════════
const CSS = `
  .vsg-section,
  .vsg-section *,
  .vsg-section *::before,
  .vsg-section *::after {
    box-sizing: border-box;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SECTION · Premium White Background                                   */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .vsg-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
    background: ${TOKENS.white};
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    contain: layout paint style;
  }

  .vsg-section::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -15%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.04) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .vsg-section::after {
    content: '';
    position: absolute;
    bottom: -15%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  .vsg-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · RASOAF Typography                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .vsg-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  /* Eyebrow: Inter 700 · uppercase · 0.15em letter-spacing */
  .vsg-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 22px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 9999px;
    font-family: ${TOKENS.body};
    font-size: clamp(0.65rem, 0.85vw, 0.78rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${TOKENS.goldDark};
    margin-bottom: clamp(16px, 2.5vh, 24px);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .vsg-eyebrow:hover {
    background: rgba(212, 160, 23, 0.1);
    border-color: rgba(212, 160, 23, 0.25);
    transform: translateY(-1px);
  }

  .vsg-eyebrow svg {
    color: ${TOKENS.gold};
    flex-shrink: 0;
  }

  /* Title: Manrope 800 · -0.03em letter-spacing · editorial */
  .vsg-title {
    font-family: ${TOKENS.display};
    font-weight: 800;
    font-size: clamp(2.4rem, 5.5vw, 4rem);
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: ${TOKENS.textPrimary};
    text-align: center;
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    display: block;
    overflow-wrap: break-word;
  }

  .vsg-title-accent {
    background: linear-gradient(135deg, ${TOKENS.goldDark} 0%, ${TOKENS.gold} 40%, ${TOKENS.goldLight} 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: vsg-shimmer 4s ease-in-out infinite;
  }

  @keyframes vsg-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* Subtitle: Inter 400 · 0.005em letter-spacing */
  .vsg-subtitle {
    font-family: ${TOKENS.body};
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    font-weight: 400;
    line-height: 1.7;
    letter-spacing: 0.005em;
    color: ${TOKENS.textSecondary};
    max-width: 640px;
    margin: 14px auto 0;
    width: 100%;
    overflow-wrap: break-word;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP GRID · 3 Columns                                             */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .vsg-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(20px, 2.5vw, 32px);
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* CARD · Premium Image-First Design                                    */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .vsg-card {
    position: relative;
    border-radius: ${TOKENS.radiusLg};
    overflow: hidden;
    height: 460px;
    background: ${TOKENS.charcoal};
    cursor: pointer;
    box-shadow: ${TOKENS.shadowCard};
    transition: all ${TOKENS.transition};
    min-width: 0;
    isolation: isolate;
  }

  .vsg-card:hover,
  .vsg-card:focus-within {
    transform: translateY(-8px);
    box-shadow: ${TOKENS.shadowHover};
  }

  .vsg-card:focus-visible {
    outline: 3px solid ${TOKENS.gold};
    outline-offset: 4px;
  }

  /* Image */
  .vsg-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .vsg-card:hover .vsg-card-image,
  .vsg-card:focus-within .vsg-card-image {
    transform: scale(1.08);
  }

  /* Hint text: Inter 500 */
  .vsg-card-hint {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-family: ${TOKENS.body};
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    opacity: 0.8;
    transition: all 0.5s ease;
    z-index: 3;
    pointer-events: none;
    white-space: nowrap;
  }

  .vsg-card:hover .vsg-card-hint,
  .vsg-card:focus-within .vsg-card-hint {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }

  /* Overlay - Glass morphism */
  .vsg-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 28px 24px 24px;
    background: linear-gradient(180deg, 
      rgba(10, 30, 60, 0.65) 0%, 
      rgba(10, 30, 60, 0.88) 100%
    );
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 22px;
    margin: 0 6px 6px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(calc(100% - 52px));
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    min-width: 0;
  }

  .vsg-card:hover .vsg-card-overlay,
  .vsg-card:focus-within .vsg-card-overlay {
    transform: translateY(0);
    height: 62%;
    pointer-events: auto;
  }

  /* Overlay shine sweep */
  .vsg-card-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    transform: skewX(-25deg);
    transition: left 0.9s ease;
    pointer-events: none;
  }

  .vsg-card:hover .vsg-card-overlay::before,
  .vsg-card:focus-within .vsg-card-overlay::before {
    left: 100%;
  }

  /* Card Title: Manrope 800 */
  .vsg-card-title {
    font-family: ${TOKENS.display};
    font-weight: 800;
    font-size: clamp(1.2rem, 1.6vw, 1.4rem);
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 8px;
    pointer-events: none;
    overflow-wrap: break-word;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Card Description: Inter 400 */
  .vsg-card-desc {
    font-family: ${TOKENS.body};
    font-size: 0.84rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    letter-spacing: 0.005em;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    pointer-events: none;
    overflow-wrap: break-word;
  }

  .vsg-card:hover .vsg-card-desc,
  .vsg-card:focus-within .vsg-card-desc {
    -webkit-line-clamp: 4;
  }

  /* Info Row */
  .vsg-card-info {
    display: flex;
    gap: 28px;
    margin-bottom: 16px;
    pointer-events: none;
    flex-wrap: wrap;
  }

  /* Label: Inter 600 */
  .vsg-info-label {
    font-family: ${TOKENS.body};
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  /* Value: Manrope 700 */
  .vsg-info-value {
    font-family: ${TOKENS.display};
    font-size: 0.88rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .vsg-info-value.success {
    color: #4ADE80;
  }

  /* CTA Button: Inter 700 */
  .vsg-cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: ${TOKENS.radiusSm};
    font-family: ${TOKENS.body};
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    width: fit-content;
    position: relative;
    overflow: hidden;
    pointer-events: auto;
    z-index: 10;
    min-height: 46px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .vsg-cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${TOKENS.gold}, ${TOKENS.goldLight});
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  .vsg-cta-button:hover::before,
  .vsg-cta-button:focus-visible::before {
    opacity: 1;
  }

  .vsg-cta-button > * {
    position: relative;
    z-index: 2;
  }

  .vsg-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.35);
    border-color: ${TOKENS.gold};
  }

  .vsg-cta-button:focus-visible {
    outline: 2px solid ${TOKENS.gold};
    outline-offset: 3px;
  }

  .vsg-cta-arrow {
    transition: transform 0.3s ease;
  }

  .vsg-cta-button:hover .vsg-cta-arrow {
    transform: translateX(4px);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL                                                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .vsg-mobile-carousel {
    display: none;
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

  .vsg-mobile-track {
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    align-items: center;
  }

  .vsg-mobile-slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 4px 4px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vsg-mobile-slide .vsg-card {
    height: 480px;
    width: 100%;
    cursor: pointer;
  }

  .vsg-mobile-slide .vsg-card-hint {
    opacity: 0.85;
  }

  .vsg-mobile-slide .vsg-card-revealed .vsg-card-hint {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }

  .vsg-mobile-slide .vsg-card-revealed .vsg-card-overlay {
    transform: translateY(0);
    height: 64%;
    pointer-events: auto;
  }

  .vsg-mobile-slide .vsg-card-image {
    transform: none !important;
  }

  .vsg-mobile-slide .vsg-card-desc {
    -webkit-line-clamp: 4;
  }

  /* Mobile Navigation */
  .vsg-mobile-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    padding: 4px 0;
  }

  .vsg-mobile-btn {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${TOKENS.white};
    border: 1px solid rgba(212, 160, 23, 0.2);
    color: ${TOKENS.textPrimary};
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    outline: none;
  }

  .vsg-mobile-btn:hover {
    background: ${TOKENS.cream};
    border-color: ${TOKENS.gold};
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.15);
  }

  .vsg-mobile-btn:focus-visible {
    outline: 2px solid ${TOKENS.gold};
    outline-offset: 3px;
  }

  .vsg-mobile-dots {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .vsg-mobile-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.15);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    outline: none;
  }

  .vsg-mobile-dot::before {
    content: '';
    position: absolute;
    inset: -10px;
  }

  .vsg-mobile-dot:hover {
    background: rgba(0, 0, 0, 0.25);
  }

  .vsg-mobile-dot-active {
    width: 26px;
    border-radius: 4px;
    background: linear-gradient(135deg, ${TOKENS.goldLight}, ${TOKENS.gold});
    box-shadow: 0 0 12px rgba(212, 160, 23, 0.3);
  }

  .vsg-mobile-dot:focus-visible {
    outline: 2px solid ${TOKENS.gold};
    outline-offset: 4px;
  }

  .vsg-swipe-indicator {
    text-align: center;
    color: ${TOKENS.textMuted};
    font-family: ${TOKENS.body};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 10px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS · Perfect 320px → 2560px                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (min-width: 600px) {
    .vsg-grid { display: grid; }
    .vsg-mobile-carousel { display: none; }
  }

  @media (min-width: 1920px) {
    .vsg-container { max-width: 1600px; }
    .vsg-grid { gap: clamp(28px, 2vw, 40px); }
    .vsg-card { height: 500px; }
  }

  @media (min-width: 1440px) and (max-width: 1919px) {
    .vsg-container { max-width: 1480px; }
  }

  @media (max-width: 1024px) {
    .vsg-grid { grid-template-columns: repeat(2, 1fr); }
    .vsg-card { height: 440px; }
  }

  @media (max-width: 768px) {
    .vsg-section { padding: clamp(60px, 8vh, 80px) 20px; }
    .vsg-grid { display: none; }
    .vsg-mobile-carousel { display: block; }
    .vsg-title { font-size: clamp(1.8rem, 6vw, 2.6rem); }
  }

  @media (max-width: 480px) {
    .vsg-section { padding: clamp(40px, 6vh, 60px) 16px; }
    .vsg-mobile-slide .vsg-card { height: 450px; }
    .vsg-card-overlay { padding: 24px 20px 20px; }
    .vsg-card-title { font-size: 1.15rem; }
  }

  @media (max-width: 374px) {
    .vsg-section { padding: clamp(32px, 5vh, 48px) 12px; }
    .vsg-title { font-size: clamp(1.4rem, 7vw, 1.8rem); }
    .vsg-mobile-slide .vsg-card { height: 410px; }
    .vsg-card-overlay { padding: 18px 16px 16px; border-radius: 18px; }
    .vsg-card-title { font-size: 1.05rem; }
    .vsg-card-desc { font-size: 0.76rem; }
    .vsg-cta-button { padding: 10px 18px; font-size: 0.8rem; min-height: 42px; }
    .vsg-mobile-btn { width: 38px; height: 38px; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* TOUCH DEVICES                                                        */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (hover: none) and (pointer: coarse) {
    .vsg-card { cursor: default; }
    .vsg-card:hover { transform: none; box-shadow: ${TOKENS.shadowCard}; }
    .vsg-card:hover .vsg-card-image { transform: none; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .vsg-section,
    .vsg-section *,
    .vsg-section *::before,
    .vsg-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .vsg-card:hover .vsg-card-image { transform: none; }
    .vsg-card:hover .vsg-card-overlay { 
      transform: translateY(calc(100% - 52px)); 
      height: 55%; 
    }
    .vsg-card:hover .vsg-card-desc { -webkit-line-clamp: 2; }
    .vsg-card:hover .vsg-card-hint { opacity: 0.8; transform: translateX(-50%) translateY(0); }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HIGH CONTRAST & PRINT                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (forced-colors: active) {
    .vsg-card { border: 2px solid CanvasText; }
    .vsg-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .vsg-section { padding: 20px; background: white !important; }
    .vsg-mobile-carousel { display: none !important; }
    .vsg-grid { display: grid !important; }
    .vsg-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    .vsg-card-overlay { 
      transform: translateY(0) !important; 
      height: auto !important;
      position: relative !important;
      background: rgba(0,0,0,0.7) !important;
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// VISA CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════════
const VisaCard = ({ 
  service, 
  index = 0, 
  onHoverStart, 
  onHoverEnd, 
  onNavigate, 
  isMobile = false, 
  isActive = true 
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isMobile && !isActive) setRevealed(false);
  }, [isMobile, isActive]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.5 },
      },
    },
  }), [index]);

  const handleCardClick = useCallback((e) => {
    if (isMobile) {
      setRevealed(prev => !prev);
      return;
    }
    onNavigate(service.route, e);
  }, [isMobile, onNavigate, service.route]);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    onNavigate(service.route, e);
  }, [onNavigate, service.route]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isMobile) {
        setRevealed(prev => !prev);
      } else {
        onNavigate(service.route, e);
      }
    }
  }, [isMobile, onNavigate, service.route]);

  const mobileRevealed = isMobile && revealed;

  return (
    <motion.div
      ref={cardRef}
      className={`vsg-card${mobileRevealed ? " vsg-card-revealed" : ""}`}
      variants={!isMobile ? cardVariants : {}}
      initial={!isMobile ? "hidden" : {}}
      animate={!isMobile && isInView ? "visible" : {}}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={isMobile ? `${revealed ? "Hide" : "View"} details for ${service.title}` : `Explore ${service.title}`}
      aria-expanded={isMobile ? revealed : undefined}
    >
      <img
        src={service.image}
        alt={service.title}
        className="vsg-card-image"
        loading={isMobile && index < 2 ? "eager" : "lazy"}
        decoding="async"
      />

      <div className="vsg-card-hint" aria-hidden="true">
        <Eye size={14} />
        <span>{isMobile ? "Tap to explore" : "Hover to explore"}</span>
        <Sparkles size={12} />
      </div>

      <div className="vsg-card-overlay">
        <h3 className="vsg-card-title">{service.title}</h3>
        <p className="vsg-card-desc">{service.description}</p>

        <div className="vsg-card-info">
          <div>
            <span className="vsg-info-label">Processing</span>
            <span className="vsg-info-value">{service.processingTime}</span>
          </div>
          <div>
            <span className="vsg-info-label">Success Rate</span>
            <span className="vsg-info-value success">{service.successRate}</span>
          </div>
        </div>

        <button
          className="vsg-cta-button"
          onClick={handleButtonClick}
          type="button"
          aria-label={`Explore ${service.title} visa services`}
        >
          <span>Explore Visa</span>
          <ChevronRight size={16} className="vsg-cta-arrow" />
        </button>
      </div>
    </motion.div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// MOBILE CAROUSEL COMPONENT
// ══════════════════════════════════════════════════════════════════════════
const MobileVisaCarousel = ({ services, onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const total = services.length;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent(prev => (prev + 1) % total), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, total]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const prev = useCallback(() => setCurrent(p => (p - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(p => (p + 1) % total), [total]);
  const goTo = useCallback((i) => { setCurrent(i); startTimer(); }, [startTimer]);

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.touches[0].clientX);
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > SWIPE_THRESHOLD) next();
    else if (diff < -SWIPE_THRESHOLD) prev();
    setTouchStart(null);
    setTouchEnd(null);
    startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, startTimer]);

  return (
    <div 
      className="vsg-mobile-carousel"
      role="region"
      aria-label="Visa services carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sr-only" role="status" aria-live="polite">
        Showing service {current + 1} of {total}: {services[current].title}
      </div>

      <motion.div 
        className="vsg-mobile-track"
        animate={{ x: `${-current * 100}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { 
          type: "spring", 
          stiffness: 280, 
          damping: 35,
          mass: 1,
        }}
      >
        {services.map((service, i) => (
          <div key={service.id} className="vsg-mobile-slide">
            <VisaCard
              service={service}
              index={i}
              isMobile
              isActive={i === current}
              onNavigate={onNavigate}
            />
          </div>
        ))}
      </motion.div>

      <div className="vsg-mobile-nav">
        <button className="vsg-mobile-btn" onClick={() => { prev(); startTimer(); }} aria-label="Previous visa service" type="button">
          <ChevronLeft size={20} />
        </button>
        <div className="vsg-mobile-dots" role="tablist" aria-label="Visa service navigation">
          {services.map((service, i) => (
            <button
              key={service.id}
              className={`vsg-mobile-dot${i === current ? " vsg-mobile-dot-active" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to ${service.title}`}
              type="button"
            />
          ))}
        </div>
        <button className="vsg-mobile-btn" onClick={() => { next(); startTimer(); }} aria-label="Next visa service" type="button">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="vsg-swipe-indicator" aria-hidden="true">← Swipe to navigate →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function VisaServicesGrid() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);

  const handleNavigate = useCallback((route, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate, prefersReducedMotion]);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }), []);

  return (
    <>
      <style>{CSS}</style>

      <section className="vsg-section" aria-label="Premium visa services">
        <div className="vsg-container">
          {/* Header with RASOAF Typography */}
          <motion.div 
            ref={headerRef}
            className="vsg-header"
            variants={headerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <div className="vsg-eyebrow">
              <Compass size={14} />
              <span>Premium Visa Solutions</span>
              <Sparkles size={14} />
            </div>
            
            <h1 className="vsg-title">
              Your Gateway{" "}
              <span className="vsg-title-accent">to the World</span>
            </h1>
            
            <p className="vsg-subtitle">
              RASOAF Travels and Tours Limited orchestrates extraordinary travel experiences 
              with white-glove service. Complimentary consultation, meticulous documentation, 
              and unwavering support because your journey deserves nothing less than perfection.
            </p>
          </motion.div>

          {/* Desktop Grid */}
          <div className="vsg-grid" role="list" aria-label="Visa services">
            {services.map((service, index) => (
              <VisaCard
                key={service.id}
                service={service}
                index={index}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
                onNavigate={handleNavigate}
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <MobileVisaCarousel services={services} onNavigate={handleNavigate} />
        </div>
      </section>
    </>
  );
}