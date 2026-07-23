// src/components/travel/Training.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Training Services (v2)
// Mobile carousel · Scroll reveal · Touch overlay · Proper gaps · All breakpoints
//
// OPTIMIZATION LOG — v1 → v2 (per RASOAF Enterprise Performance Prompt)
// ─────────────────────────────────────────────────────────────────────────────
// 1. MOBILE CAROUSEL:
//    - Auto-sliding carousel on devices < 600px
//    - Touch swipe support with drag
//    - Pause on hover/touch
//    - Pagination dots
// 2. TOUCH OVERLAY:
//    - Tap to show overlay on touch devices
//    - Active state management
//    - Tap again to hide
// 3. SCROLL REVEAL:
//    - Each card slides up individually on scroll
//    - Staggered delay for cascading effect
// 4. PROPER GAPS:
//    - Generous spacing between cards on all screens
//    - No overlapping
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Globe, Briefcase, Stethoscope, 
  ArrowUpRight, Sparkles, ChevronRight, ChevronLeft,
  Clock, Users, Award, GraduationCap, Languages, PenTool, FileText
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const trainingData = [
  {
    id: "ielts",
    title: "IELTS Coaching",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
    description: "International English Language Testing System preparation for study, work, and immigration.",
    route: "/travel/training/ielts",
    color: "#D4A017",
    bgColor: "#FFFDF5",
    details: {
      keyPoints: [
        "Accepted for study, work, and immigration",
        "Required for Canada Express Entry",
        "CLB 7 minimum for Federal Skilled Worker",
        "CLB 9+ recommended for competitive CRS score",
        "Professional training and guidance available"
      ],
      duration: "8-12 weeks",
      format: "In-person & Online",
      rating: "4.9/5"
    }
  },
  {
    id: "toefl",
    title: "TOEFL Coaching",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center",
    description: "Test of English as a Foreign Language preparation for university admissions and scholarships.",
    route: "/travel/training/toefl",
    color: "#D4A017",
    bgColor: "#FFF8F0",
    details: {
      keyPoints: [
        "Accepted by 11,500+ universities worldwide",
        "Required for many scholarship programs",
        "Recognized by professional bodies",
        "Valued by multinational employers",
        "Available in 165+ countries"
      ],
      duration: "6-10 weeks",
      format: "In-person & Online",
      rating: "4.8/5"
    }
  },
  {
    id: "pte",
    title: "PTE Coaching",
    icon: PenTool,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&crop=center",
    description: "Pearson Test of English preparation for study, immigration, and professional registration.",
    route: "/travel/training/pte",
    color: "#D4A017",
    bgColor: "#FFFDF8",
    details: {
      keyPoints: [
        "Fast results in 2-5 days",
        "AI-based scoring for accuracy",
        "Accepted for Canada Express Entry",
        "Recognized in Australia and New Zealand",
        "Fully computer-based test"
      ],
      duration: "6-8 weeks",
      format: "In-person & Online",
      rating: "4.7/5"
    }
  },
  {
    id: "oet",
    title: "OET Coaching",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center",
    description: "Occupational English Test preparation for healthcare professionals worldwide.",
    route: "/travel/training/oet",
    color: "#D4A017",
    bgColor: "#FFFAF2",
    details: {
      keyPoints: [
        "Healthcare-focused content",
        "Recognized by UK, Australia, New Zealand, Canada",
        "For nurses, doctors, pharmacists, and more",
        "Tests real medical communication",
        "Preferred by many healthcare employers"
      ],
      duration: "6-10 weeks",
      format: "In-person & Online",
      rating: "4.8/5"
    }
  }
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const COLORS = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  bgLight: "#F7F8FA",
  textDark: "#0A0F1A",
  textGrey: "#6B7280",
};

const TYPOGRAPHY = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
};

// ══════════════════════════════════════════════════════════════════════════
// Enterprise CSS
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  :root {
    --gold-primary: ${COLORS.gold};
    --gold-light: ${COLORS.goldLight};
    --gold-dark: ${COLORS.goldDark};
    --white: ${COLORS.white};
    --bg-light: ${COLORS.bgLight};
    --text-dark: ${COLORS.textDark};
    --text-grey: ${COLORS.textGrey};
    --text-muted: #9CA3AF;
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.04);
    --shadow-hover: 0 12px 48px rgba(0, 0, 0, 0.12);
    --font-display: ${TYPOGRAPHY.display};
    --font-body: ${TYPOGRAPHY.body};
    --radius-card: 24px;
    --radius-pill: 9999px;
    --transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ── */
  .training-section {
    width: 100%;
    padding: clamp(60px, 10vh, 120px) clamp(24px, 6vw, 100px);
    padding-bottom: clamp(60px, 10vh, 120px);
    background: var(--bg-light);
    position: relative;
    overflow-x: hidden;
    overflow-y: visible;
    z-index: 10;
    box-sizing: border-box;
    transition: background-color 1s ease;
  }

  .training-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .training-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 64px);
  }

  .training-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-primary);
    margin-bottom: 16px;
    white-space: nowrap;
  }

  .training-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.8rem);
    letter-spacing: -0.03em;
    line-height: 1.08;
    color: var(--text-dark);
    margin: 0 0 16px 0;
  }

  .training-title-accent {
    background: linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .training-subtitle {
    font-family: var(--font-body);
    font-size: clamp(0.95rem, 1.15vw, 1.1rem);
    font-weight: 400;
    color: var(--text-grey);
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* DESKTOP/TABLET GRID — Proper gaps */
  /* ════════════════════════════════════════════════════════════════ */
  .training-grid-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    box-sizing: border-box;
  }

  .training-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .training-card-reveal {
    width: 100%;
    min-width: 0;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL */
  /* ════════════════════════════════════════════════════════════════ */
  .training-carousel {
    display: none;
    position: relative;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    overflow: hidden;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    padding: 10px 0;
    box-sizing: border-box;
  }

  .training-carousel-track {
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    align-items: stretch;
  }

  .training-carousel-slide {
    flex: 0 0 100%;
    padding: 8px 24px;
    box-sizing: border-box;
    display: flex;
  }

  .training-carousel-slide > * { width: 100%; }

  .training-carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(212, 160, 23, 0.25);
    color: var(--gold-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    outline: none;
  }

  .training-carousel-arrow:hover { background: var(--gold-primary); color: white; border-color: var(--gold-primary); }
  .training-carousel-arrow:focus-visible { outline: 2px solid var(--gold-primary); outline-offset: 2px; }
  .training-carousel-arrow.prev { left: 2px; }
  .training-carousel-arrow.next { right: 2px; }

  .training-carousel-dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 22px;
    padding: 8px 0;
    flex-wrap: wrap;
  }

  .training-carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.12);
    cursor: pointer;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    outline: none;
    flex-shrink: 0;
  }

  .training-carousel-dot.active {
    width: 30px;
    background: linear-gradient(135deg, var(--gold-light), var(--gold-primary));
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(212, 160, 23, 0.3);
  }

  .training-swipe-indicator {
    text-align: center;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    margin-top: 10px;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* CARD */
  /* ════════════════════════════════════════════════════════════════ */
  .training-card {
    position: relative;
    border-radius: var(--radius-card);
    overflow: hidden;
    background: var(--white);
    box-shadow: var(--shadow-card);
    transition: all 0.5s var(--transition-smooth);
    cursor: pointer;
    height: 340px;
    will-change: transform, box-shadow;
    outline: none;
    width: 100%;
  }

  .training-card:focus-visible {
    outline: 2px solid var(--gold-primary);
    outline-offset: 3px;
    box-shadow: 0 0 0 4px rgba(212, 160, 23, 0.1), var(--shadow-hover);
  }

  .training-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover);
  }

  /* ── Image ── */
  .training-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s var(--transition-smooth);
    will-change: transform;
  }

  .training-card:hover .training-card-image { transform: scale(1.08); }
  .training-card.active .training-card-image { transform: scale(1.08); }

  /* ── Content Overlay ── */
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
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--white);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 4px 0;
  }

  .training-card-desc {
    font-family: var(--font-body);
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

  /* ── Hover/Touch Overlay ── */
  .training-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px 20px 20px;
    background: rgba(10, 60, 110, 0.82);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-card);
    margin: 0 4px 4px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.7s var(--transition-smooth);
    z-index: 3;
    pointer-events: none;
  }

  .training-card:hover .training-card-overlay { transform: translateY(0); pointer-events: auto; }
  .training-card.active .training-card-overlay { transform: translateY(0); pointer-events: auto; }

  .training-overlay-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.1rem;
    color: var(--white);
    margin: 0 0 8px 0;
    letter-spacing: -0.02em;
  }

  .training-overlay-desc {
    font-family: var(--font-body);
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

  /* ── Button ── */
  .training-overlay-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--white);
    cursor: pointer;
    transition: all 0.4s var(--transition-smooth);
    width: fit-content;
    pointer-events: auto;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 5;
  }

  .training-overlay-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .training-overlay-btn span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .training-overlay-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
    border-color: rgba(212, 160, 23, 0.3);
    color: var(--white);
  }

  .training-overlay-btn:hover::before { opacity: 1; }
  .training-overlay-btn:hover svg { transform: translateX(4px); }
  .training-overlay-btn svg { transition: transform 0.3s ease; }

  /* ── Tap hint for mobile ── */
  .training-tap-hint {
    display: none;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-family: var(--font-body);
    font-size: 0.6rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    letter-spacing: 0.05em;
    pointer-events: none;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE */
  /* ════════════════════════════════════════════════════════════════ */

  /* 1920px+ */
  @media (min-width: 1920px) {
    .training-section { padding: clamp(80px, 12vh, 160px) clamp(60px, 8vw, 200px); }
    .training-container { max-width: 1600px; }
    .training-grid { max-width: 1500px; gap: 32px; padding: 0 40px; }
    .training-card { height: 380px; }
  }

  /* 1600-1919px */
  @media (min-width: 1600px) and (max-width: 1919px) {
    .training-section { padding: clamp(72px, 10vh, 140px) clamp(40px, 6vw, 120px); }
    .training-container { max-width: 1500px; }
    .training-grid { max-width: 1400px; gap: 28px; padding: 0 30px; }
    .training-card { height: 360px; }
  }

  /* 1440-1599px */
  @media (min-width: 1440px) and (max-width: 1599px) {
    .training-section { padding: clamp(64px, 9vh, 120px) clamp(32px, 5vw, 80px); }
    .training-container { max-width: 1400px; }
    .training-grid { max-width: 1300px; gap: 24px; padding: 0 24px; }
  }

  /* 1280-1439px */
  @media (min-width: 1280px) and (max-width: 1439px) {
    .training-section { padding: clamp(56px, 8vh, 100px) clamp(24px, 4vw, 60px); }
    .training-container { max-width: 1300px; }
    .training-grid { max-width: 1220px; gap: 22px; padding: 0 20px; }
    .training-card { height: 320px; }
  }

  /* 1024-1279px */
  @media (min-width: 1024px) and (max-width: 1279px) {
    .training-section { padding: clamp(48px, 7vh, 80px) clamp(20px, 3vw, 40px); }
    .training-container { max-width: 1100px; }
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 1020px; gap: 24px; padding: 0 20px; }
    .training-card { height: 340px; }
  }

  /* 820-1023px */
  @media (min-width: 820px) and (max-width: 1023px) {
    .training-section { padding: clamp(44px, 6vh, 64px) 20px; }
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 800px; gap: 20px; padding: 0 16px; }
    .training-card { height: 310px; border-radius: 22px; }
    .training-card-overlay { border-radius: 22px; }
  }

  /* 768-819px */
  @media (min-width: 768px) and (max-width: 819px) {
    .training-section { padding: clamp(48px, 7vh, 60px) 20px; }
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 720px; gap: 20px; padding: 0 16px; }
    .training-card { height: 300px; border-radius: 22px; }
    .training-card-overlay { border-radius: 22px; height: 58%; }
    .training-title { font-size: clamp(1.8rem, 4vw, 2.4rem); }
  }

  /* 600-767px */
  @media (min-width: 600px) and (max-width: 767px) {
    .training-section { padding: clamp(44px, 6vh, 56px) 18px; }
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 580px; gap: 18px; padding: 0 12px; }
    .training-card { height: 280px; border-radius: 20px; }
    .training-card-overlay { border-radius: 20px; height: 60%; padding: 18px 16px; }
    .training-card-content { padding: 20px 16px 16px; }
    .training-card-title { font-size: 1rem; }
    .training-card-desc { font-size: 0.75rem; }
    .training-overlay-title { font-size: 1rem; }
    .training-overlay-desc { font-size: 0.75rem; }
    .training-overlay-btn { padding: 7px 14px; font-size: 0.7rem; }
    .training-title { font-size: clamp(1.6rem, 3.5vw, 2rem); }
    .training-subtitle { font-size: 0.9rem; }
  }

  /* Mobile — Carousel */
  @media (max-width: 599px) {
    .training-grid-wrapper { display: none !important; }
    .training-carousel { display: block; }
    .training-section { padding: clamp(44px, 7vh, 60px) 12px; padding-bottom: clamp(44px, 7vh, 60px); }
    .training-container { padding: 0 4px; }
    .training-header { margin-bottom: clamp(32px, 4vh, 44px); }
    .training-title { font-size: clamp(1.5rem, 5vw, 2rem); }
    .training-subtitle { font-size: 0.9rem; max-width: 100%; padding: 0 8px; }
    .training-card { height: 320px; border-radius: 22px; }
    .training-card-overlay { border-radius: 22px; height: 58%; padding: 20px 18px; }
    .training-card-content { padding: 22px 18px 18px; }
    .training-card-title { font-size: 1.05rem; }
    .training-card-desc { font-size: 0.82rem; }
    .training-overlay-title { font-size: 1.05rem; }
    .training-overlay-desc { font-size: 0.82rem; }
    .training-overlay-btn { padding: 8px 18px; font-size: 0.75rem; min-height: 44px; min-width: 80px; }
    .training-tap-hint { display: block; }
    .training-carousel-arrow { width: 44px; height: 44px; }
  }

  /* 430-599px */
  @media (min-width: 430px) and (max-width: 599px) {
    .training-carousel { max-width: 440px; }
    .training-carousel-slide { padding: 8px 18px; }
  }

  /* 375-429px */
  @media (min-width: 375px) and (max-width: 429px) {
    .training-carousel { max-width: 400px; }
    .training-carousel-slide { padding: 6px 14px; }
    .training-card { height: 300px; }
    .training-card-overlay { height: 62%; padding: 16px 14px; }
    .training-card-content { padding: 18px 14px 14px; }
    .training-card-title { font-size: 1rem; }
    .training-card-desc { font-size: 0.78rem; }
  }

  /* 320-374px */
  @media (min-width: 320px) and (max-width: 374px) {
    .training-section { padding: clamp(32px, 5vh, 44px) 8px; padding-bottom: clamp(32px, 5vh, 44px); }
    .training-carousel { max-width: 350px; }
    .training-carousel-slide { padding: 4px 10px; }
    .training-card { height: 270px; border-radius: 18px; }
    .training-card-overlay { border-radius: 18px; height: 65%; padding: 14px 12px; margin: 0 2px 2px; }
    .training-card-content { padding: 16px 12px 12px; }
    .training-card-title { font-size: 0.9rem; }
    .training-card-desc { font-size: 0.72rem; }
    .training-overlay-title { font-size: 0.9rem; }
    .training-overlay-desc { font-size: 0.72rem; }
    .training-overlay-btn { padding: 6px 14px; font-size: 0.68rem; min-height: 40px; }
    .training-carousel-arrow { width: 36px; height: 36px; }
    .training-title { font-size: 1.3rem; }
    .training-subtitle { font-size: 0.82rem; }
    .training-eyebrow { font-size: 0.6rem; padding: 5px 12px; gap: 4px; }
    .training-tap-hint { font-size: 0.55rem; padding: 3px 8px; }
  }

  /* ── Touch Devices — Tap to show overlay ── */
  @media (hover: none) and (pointer: coarse) {
    .training-card { cursor: pointer; }
    .training-card:hover { transform: none; box-shadow: var(--shadow-card); }
    .training-card:hover .training-card-image { transform: none; }
    .training-card .training-card-overlay { transform: translateY(100%); pointer-events: none; }
    .training-card.active { box-shadow: var(--shadow-hover); }
    .training-card.active .training-card-overlay { transform: translateY(0); pointer-events: auto; }
    .training-card.active .training-card-image { transform: scale(1.08); }
    .training-card:active { transform: scale(0.98); transition: transform 0.1s ease; }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .training-card:hover { transform: none !important; }
    .training-card:hover .training-card-image { transform: none !important; }
    .training-card-overlay { transition: none !important; }
    .training-card:hover .training-card-overlay { transform: translateY(100%) !important; }
    .training-card.active .training-card-overlay { transform: translateY(0) !important; }
  }

  @media (forced-colors: active) {
    .training-card { border: 2px solid CanvasText; }
    .training-card:focus-visible { outline: 3px solid Highlight; }
  }

  @media print {
    .training-section { padding: 20px; background: white !important; }
    .training-carousel { display: none !important; }
    .training-grid-wrapper { display: block !important; }
    .training-grid { display: grid !important; }
    .training-card { box-shadow: none !important; border: 1px solid #ccc !important; page-break-inside: avoid; }
    .training-card-overlay { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Training Card Component with Scroll Reveal
// ══════════════════════════════════════════════════════════════════════════
const TrainingCard = memo(({ item, index, isCarousel = false, isActive, onClick, onNavigate }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
  }, [onClick]);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    onNavigate(item.route);
  }, [onNavigate, item.route]);

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9, filter: "blur(6px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardContent = (
    <div className={`training-card ${isActive ? 'active' : ''}`} onClick={onClick} onKeyDown={handleKeyDown} role="listitem" aria-label={item.title} tabIndex={0}>
      {/* Tap hint for mobile */}
      <div className="training-tap-hint" aria-hidden="true">Tap for details</div>
      
      {/* Image */}
      <img src={item.image} alt={item.title} className="training-card-image" loading="lazy" decoding="async" />

      {/* Content Overlay */}
      <div className="training-card-content">
        <h3 className="training-card-title">{item.title}</h3>
        <p className="training-card-desc">{item.description}</p>
      </div>

      {/* Hover/Touch Overlay */}
      <div className="training-card-overlay">
        <h4 className="training-overlay-title">{item.title}</h4>
        <p className="training-overlay-desc">{item.description}</p>
        <button className="training-overlay-btn" onClick={handleButtonClick} aria-label={`Learn more about ${item.title}`} type="button">
          <span>More<ArrowUpRight size={14} /></span>
        </button>
      </div>
    </div>
  );

  if (isCarousel) {
    return (
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.04 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }} style={{ width: "100%" }}>
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div ref={cardRef} className="training-card-reveal">
      <motion.div variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
        whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -6 }} whileTap={prefersReducedMotion ? {} : { scale: 0.97 }} style={{ width: "100%", height: "100%" }}>
        {cardContent}
      </motion.div>
    </div>
  );
});
TrainingCard.displayName = "TrainingCard";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(({ items, activeIndex, onCardClick, onNavigate, onSlideChange }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent((prev) => { const n = (prev + 1) % items.length; onSlideChange?.(n); return n; }), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, items.length, onSlideChange]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const prev = useCallback(() => setCurrent((p) => { const n = (p - 1 + items.length) % items.length; onSlideChange?.(n); return n; }), [items.length, onSlideChange]);
  const next = useCallback(() => setCurrent((p) => { const n = (p + 1) % items.length; onSlideChange?.(n); return n; }), [items.length, onSlideChange]);
  const goTo = useCallback((i) => { setCurrent(i); onSlideChange?.(i); startTimer(); }, [startTimer, onSlideChange]);

  const touchStartH = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const touchMoveH = useCallback((e) => { setTouchEnd(e.touches[0].clientX); }, []);
  const touchEndH = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > SWIPE_THRESHOLD) next();
    else if (touchEnd - touchStart > SWIPE_THRESHOLD) prev();
    setTouchStart(null); setTouchEnd(null); startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); } if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [next, prev, startTimer]);

  return (
    <div className="training-carousel" role="region" aria-label="Training services carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={touchStartH} onTouchMove={touchMoveH} onTouchEnd={touchEndH}>
      <div className="sr-only" role="status" aria-live="polite">Showing {current + 1} of {items.length}: {items[current].title}</div>
      <AnimatePresence mode="wait">
        <motion.div key={current} className="training-carousel-track"
          initial={{ x: 50, opacity: 0.3 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0.2 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.25, 1, 0.5, 1] }}>
          <div className="training-carousel-slide">
            <TrainingCard item={items[current]} index={current} isCarousel={true} isActive={activeIndex === current} onClick={() => onCardClick(current)} onNavigate={onNavigate} />
          </div>
        </motion.div>
      </AnimatePresence>
      <button className="training-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous"><ChevronLeft size={20} /></button>
      <button className="training-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next"><ChevronRight size={20} /></button>
      <div className="training-carousel-dots" role="tablist">
        {items.map((item, i) => <button key={item.id} className={`training-carousel-dot ${i === current ? "active" : ""}`} onClick={() => goTo(i)} role="tab" aria-selected={i === current} aria-label={item.title} />)}
      </div>
      <div className="training-swipe-indicator" aria-hidden="true">← Swipe or tap arrows →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
});
MobileCarousel.displayName = "MobileCarousel";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
const Training = memo(function Training() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia('(hover: none)').matches) {
      setActiveIndex(prev => prev === index ? null : index);
    }
  }, []);

  const handleNavigate = useCallback((route) => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate, prefersReducedMotion]);

  const handleSlideChange = useCallback((index) => setCurrentSlide(index), []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }), []);

  return (
    <>
      <style>{STYLES}</style>
      <section className="training-section" style={{ backgroundColor: trainingData[currentSlide]?.bgColor || "#F7F8FA" }} aria-label="Training services">
        <div className="training-container">
          <motion.div ref={headerRef} className="training-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="training-eyebrow"><Sparkles size={12} /> Check Our Training <Sparkles size={12} /></div>
            <h2 className="training-title">Get the Best <span className="training-title-accent">Coaching Service</span> Training with Our RASOAF</h2>
            <p className="training-subtitle">We provide professional training, guidance, and support for a wide range of internationally recognized examinations, including IELTS, TOEFL, PTE, OET, Duolingo English Test, TEF Canada, GMAC, GMAT, and GRE.</p>
          </motion.div>

          {/* Desktop Grid with proper gaps + scroll reveal */}
          <div className="training-grid-wrapper">
            <div className="training-grid" role="list">
              {trainingData.map((item, idx) => (
                <TrainingCard key={item.id} item={item} index={idx} isCarousel={false} isActive={activeIndex === idx} onClick={() => handleCardClick(idx)} onNavigate={handleNavigate} />
              ))}
            </div>
          </div>

          {/* Mobile Carousel with touch overlay */}
          <MobileCarousel items={trainingData} activeIndex={activeIndex} onCardClick={handleCardClick} onNavigate={handleNavigate} onSlideChange={handleSlideChange} />
        </div>
      </section>
    </>
  );
});

Training.displayName = "Training";

export default Training;