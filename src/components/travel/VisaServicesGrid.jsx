// src/components/travel/VisaServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Visa Services Grid
// Editorial luxury design with image-first cards, glassmorphism overlays
// Rasoaf Typography System · Full-width editorial heading
// FULLY RESPONSIVE — 320px → 2560px, zero overflow, zero content loss
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeader } from "../common";
import { ChevronRight, ChevronLeft, Eye, Sparkles } from "lucide-react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

// ── Visa Services Data ──────────────────────────────────────────────────
const services = [
  {
    id: "student",
    title: "Student Visa",
    description: "Transform your future with world-class education. We handle admissions, LOA, CAS, DS-160, and study permits for premier institutions in Canada, USA, UK, Australia, and Europe.",
    processingTime: "4–8 weeks",
    successRate: "95% Success",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550199/Rasoaf5_caopg8.jpg",
    route: "/travel/student-visa",
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Accelerate your global career with premium work visa solutions. Expert handling of employment documentation, compliance, and fast-track processing for skilled professionals.",
    processingTime: "6–12 weeks",
    successRate: "92% Success",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop&crop=center",
    route: "/travel/work-visa",
  },
  {
    id: "tourist",
    title: "Tourist Visa",
    description: "Experience the extraordinary with seamless tourist visa processing. From exotic destinations to cultural wonders, we make your travel dreams a reality.",
    processingTime: "2–4 weeks",
    successRate: "98% Success",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
    route: "/travel/tourist-visa",
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Elevate your corporate presence globally with premium business visa services. Specialized handling for conferences, trade missions, and international expansion.",
    processingTime: "3–6 weeks",
    successRate: "94% Success",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center",
    route: "/travel/business-visa",
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Reunite with loved ones through our comprehensive family reunification services. We handle complex documentation for family residence and long-term stays with care.",
    processingTime: "8–16 weeks",
    successRate: "88% Success",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&crop=center",
    route: "/travel/family-visa",
  },
  {
    id: "flights",
    title: "Flight Booking",
    description: "Discover exceptional flight deals with premier global airlines. Luxury and economy options with flexible booking, real-time tracking, and 24/7 concierge support.",
    processingTime: "Instant",
    successRate: "100% Success",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&crop=center",
    route: "/travel/flights",
  },
];

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
  textSecondary: "#525252",
  transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  transitionBounce: "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ── Premium CSS ─────────────────────────────────────────────────────────
const CSS = `
  /* Universal box-sizing scoped to this section — guarantees zero
     horizontal overflow regardless of host-app global resets. */
  .visa-services-section,
  .visa-services-section *,
  .visa-services-section *::before,
  .visa-services-section *::after {
    box-sizing: border-box;
  }

  /* ── Section ── */
  .visa-services-section {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: clamp(80px, 12vh, 120px) 32px;
    background: linear-gradient(180deg, ${t.white} 0%, ${t.cream} 50%, ${t.white} 100%);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    font-family: ${t.body};
  }

  .visa-services-section::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.04) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .visa-services-section::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* ── Header ── */
  .visa-header-wrap {
    position: relative;
    z-index: 2;
    margin-bottom: clamp(48px, 6vw, 64px);
    width: 100%;
  }

  /* ── Rasoaf Typography: Full-width editorial h1 ── */
  .visa-header-wrap h1,
  .visa-header-wrap [class*="section-title"],
  .visa-header-wrap [class*="SectionHeader"] h1 {
    font-family: ${t.display} !important;
    font-weight: 800 !important;
    font-size: clamp(36px, 5vw, 64px) !important;
    line-height: 1.08 !important;
    letter-spacing: -0.03em !important;
    color: ${t.textPrimary} !important;
    text-align: center !important;
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important;
    display: block !important;
    overflow-wrap: break-word !important;
  }

  /* Gold gradient for "to the World" */
  .visa-header-wrap h1 span,
  .visa-header-wrap [class*="section-title"] span,
  .visa-header-wrap [class*="SectionHeader"] h1 span {
    background: linear-gradient(135deg, ${t.goldDark} 0%, ${t.gold} 40%, ${t.goldLight} 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
  }

  /* Badge styling */
  .visa-header-wrap [class*="badge"],
  .visa-header-wrap [class*="SectionHeader"] [class*="badge"] {
    font-family: ${t.body} !important;
    font-weight: 700 !important;
    font-size: clamp(10px, 0.8vw, 11.5px) !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
  }

  /* Subtitle styling */
  .visa-header-wrap [class*="subtitle"],
  .visa-header-wrap [class*="SectionHeader"] p {
    font-family: ${t.body} !important;
    font-weight: 400 !important;
    font-size: clamp(13px, 1.1vw, 15.5px) !important;
    line-height: 1.7 !important;
    letter-spacing: 0.005em !important;
    color: ${t.textSecondary} !important;
    max-width: 680px !important;
    margin: 16px auto 0 !important;
    width: 100% !important;
    overflow-wrap: break-word !important;
  }

  /* ── Grid ── */
  .visa-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(20px, 2.5vw, 32px);
    position: relative;
    z-index: 2;
  }

  /* ── Card ── */
  .visa-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    height: 460px;
    background: ${t.charcoal};
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all ${t.transition};
    min-width: 0;
  }

  .visa-card:hover,
  .visa-card:focus-within {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(212, 160, 23, 0.18);
  }

  .visa-card:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 3px;
  }

  /* ── Image ── */
  .visa-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .visa-card:hover .visa-card-image,
  .visa-card:focus-within .visa-card-image {
    transform: scale(1.08);
  }

  /* ── Fade Hint Text ── */
  .visa-card-hint {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-family: ${t.body};
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    opacity: 0.7;
    transition: all 0.4s ease;
    z-index: 3;
    pointer-events: none;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .visa-card:hover .visa-card-hint,
  .visa-card:focus-within .visa-card-hint {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }

  /* ── Overlay ── */
  .visa-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 28px 28px;
    background: rgba(10, 60, 110, 0.8);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    margin: 0 6px 6px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(calc(100% - 50px));
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.25);
    pointer-events: none;
    min-width: 0;
  }

  .visa-card:hover .visa-card-overlay,
  .visa-card:focus-within .visa-card-overlay {
    transform: translateY(0);
    height: 60%;
    pointer-events: auto;
  }

  /* ── Overlay Shine ── */
  .visa-card-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
    transform: skewX(-25deg);
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .visa-card:hover .visa-card-overlay::before,
  .visa-card:focus-within .visa-card-overlay::before {
    left: 100%;
  }

  /* ── Card Title — Rasoaf Display (Manrope 800) ── */
  .visa-card-title {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(1.2rem, 1.6vw, 1.4rem);
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 6px;
    pointer-events: none;
    overflow-wrap: break-word;
  }

  /* ── Card Description — Rasoaf Body (Inter 400) ── */
  .visa-card-desc {
    font-family: ${t.body};
    font-size: 0.85rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.6;
    letter-spacing: 0.005em;
    margin-bottom: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    pointer-events: none;
    overflow-wrap: break-word;
  }

  .visa-card:hover .visa-card-desc,
  .visa-card:focus-within .visa-card-desc {
    -webkit-line-clamp: 3;
  }

  /* ── Info Row ── */
  .visa-card-info {
    display: flex;
    gap: 24px;
    margin-bottom: 14px;
    pointer-events: none;
    flex-wrap: wrap;
  }

  .visa-info-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .visa-info-label {
    font-family: ${t.body};
    font-size: 0.68rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  .visa-info-value {
    font-family: ${t.display};
    font-size: 0.85rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .visa-info-value.success {
    color: #4ADE80;
  }

  /* ── CTA Button — Rasoaf Body (Inter 700) ── */
  .visa-cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 22px;
    background: #0B1A2E;
    border: none;
    border-radius: 10px;
    font-family: ${t.body};
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
    min-height: 44px;
  }

  .visa-cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, ${t.gold}, ${t.goldLight});
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .visa-cta-button:hover::before,
  .visa-cta-button:focus-visible::before {
    opacity: 1;
  }

  .visa-cta-button:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 3px;
  }

  .visa-cta-button span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .visa-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.35);
  }

  .visa-cta-arrow {
    transition: transform 0.3s ease;
  }

  .visa-cta-button:hover .visa-cta-arrow {
    transform: translateX(4px);
  }

  /* ── Mobile Carousel ── */
  .visa-mobile-carousel {
    display: none;
    position: relative;
    width: 100%;
  }

  .visa-mobile-track {
    display: flex;
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .visa-mobile-slide {
    flex: 0 0 100%;
    min-width: 0;
    padding: 4px 2px 8px;
    box-sizing: border-box;
  }

  .visa-mobile-slide .visa-card {
    height: 480px;
    cursor: pointer;
  }

  /* Mobile hint stays visible (touch devices have no :hover) — it's the
     "more" affordance. Tapping the image or this hint toggles the
     .visa-card-revealed state set in JS, which slides the overlay up
     exactly like the desktop hover state does. Until then the overlay
     stays fully hidden below so the image is never covered. */
  .visa-mobile-slide .visa-card-hint {
    opacity: 0.85;
  }

  .visa-mobile-slide .visa-card-revealed .visa-card-hint {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }

  .visa-mobile-slide .visa-card-revealed .visa-card-overlay {
    transform: translateY(0);
    height: 62%;
    pointer-events: auto;
  }

  .visa-mobile-slide .visa-card-image {
    transform: none !important;
  }

  .visa-mobile-slide .visa-card-desc {
    -webkit-line-clamp: 4;
  }

  .visa-mobile-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 18px;
  }

  /* Visual button stays a refined 40px circle; the real hit target is
     widened to 44px via a transparent expanded pseudo-element so the
     control still meets minimum touch-target guidance without changing
     how it looks on screen. */
  .visa-mobile-btn {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t.white};
    border: 1px solid rgba(212, 160, 23, 0.25);
    color: ${t.textPrimary};
    cursor: pointer;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .visa-mobile-btn::before {
    content: '';
    position: absolute;
    inset: -2px;
  }

  .visa-mobile-btn:hover {
    background: ${t.cream};
    border-color: ${t.gold};
  }

  .visa-mobile-btn:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 3px;
  }

  .visa-mobile-dots {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .visa-mobile-dot {
    position: relative;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(11, 15, 23, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.35s ease;
  }

  /* Expanded invisible hit area — keeps the dot visually tiny while the
     tappable region reaches ~40px, matching mobile a11y expectations. */
  .visa-mobile-dot::before {
    content: '';
    position: absolute;
    inset: -17px;
  }

  .visa-mobile-dot:focus-visible {
    outline: 2px solid ${t.gold};
    outline-offset: 4px;
  }

  .visa-mobile-dot-active {
    width: 20px;
    background: ${t.gold};
  }

  /* ═══════════════════════════════════════════════════════════════════════
     RESPONSIVE — DESIGN FULLY PRESERVED, INTELLIGENTLY SCALED
     Verified clean at: 320 · 360 · 375 · 390 · 414 · 430 · 480 · 640 · 768 ·
     820 · 1024 · 1280 · 1440 · 1600 · 1920 · 2560
     ═══════════════════════════════════════════════════════════════════════ */

  /* ── Ultra-wide desktop (1920px–2560px+) ── */
  @media (min-width: 1920px) {
    .visa-services-section {
      max-width: 1600px;
    }

    .visa-services-grid {
      gap: clamp(28px, 2vw, 40px);
    }

    .visa-card {
      height: 500px;
    }
  }

  /* ── Large desktop (1440px–1919px) ── */
  @media (min-width: 1440px) and (max-width: 1919px) {
    .visa-services-section {
      max-width: 1480px;
    }
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .visa-services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .visa-services-section {
      padding: clamp(60px, 8vh, 80px) 20px;
    }

    .visa-header-wrap h1,
    .visa-header-wrap [class*="section-title"] {
      font-size: clamp(28px, 6vw, 40px) !important;
    }

    .visa-services-grid {
      display: none;
    }

    .visa-mobile-carousel {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .visa-services-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .visa-header-wrap h1,
    .visa-header-wrap [class*="section-title"] {
      font-size: clamp(24px, 7vw, 32px) !important;
    }

    .visa-mobile-slide .visa-card {
      height: 440px;
    }

    .visa-card-overlay {
      padding: 24px 20px 20px;
    }

    .visa-card-title {
      font-size: 1.1rem;
    }

    .visa-card-info {
      gap: 16px;
    }

    .visa-cta-button {
      padding: 10px 18px;
      font-size: 0.82rem;
    }
  }

  /* ── Mobile Extra-Small (320px–359px) — trims card height and
     overlay padding so tall content never gets squeezed or clipped
     on the smallest handsets ── */
  @media (max-width: 359px) {
    .visa-services-section {
      padding: clamp(32px, 6vh, 48px) 12px;
    }

    .visa-header-wrap h1,
    .visa-header-wrap [class*="section-title"] {
      font-size: clamp(22px, 7.5vw, 28px) !important;
    }

    .visa-header-wrap [class*="subtitle"],
    .visa-header-wrap [class*="SectionHeader"] p {
      font-size: 12.5px !important;
    }

    .visa-mobile-slide .visa-card {
      height: 400px;
    }

    .visa-card-overlay {
      padding: 18px 16px 16px;
      border-radius: 18px;
    }

    .visa-card-title {
      font-size: 1rem;
    }

    .visa-card-desc {
      font-size: 0.78rem;
      margin-bottom: 10px;
    }

    .visa-card-info {
      gap: 12px;
      margin-bottom: 10px;
    }

    .visa-cta-button {
      padding: 9px 16px;
      font-size: 0.78rem;
      min-height: 40px;
    }

    .visa-mobile-btn {
      width: 36px;
      height: 36px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .visa-card-overlay,
    .visa-card-image,
    .visa-card,
    .visa-card-hint,
    .visa-mobile-track,
    .visa-mobile-btn,
    .visa-mobile-dot,
    .visa-cta-button,
    .visa-cta-arrow {
      transition: none !important;
    }
    .visa-card:hover .visa-card-image,
    .visa-card:focus-within .visa-card-image {
      transform: none;
    }
    .visa-card:hover .visa-card-overlay,
    .visa-card:focus-within .visa-card-overlay {
      transform: translateY(calc(100% - 50px));
      height: 55%;
    }
    .visa-card:hover .visa-card-desc,
    .visa-card:focus-within .visa-card-desc {
      -webkit-line-clamp: 2;
    }
    .visa-card:hover .visa-card-hint,
    .visa-card:focus-within .visa-card-hint {
      opacity: 0.7;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function VisaServicesGrid() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleNavigate = useCallback((route, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate]);

  return (
    <>
      <style>{CSS}</style>

      <section className="visa-services-section">
        <div className="visa-header-wrap">
          <SectionHeader
            badge="✦ Premium Visa Solutions ✦"
            title={
              <>
                Your Gateway{" "}
                <span style={{
                  background: "linear-gradient(135deg, #B8860B 0%, #D4A017 40%, #F7C948 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  to the World
                </span>
              </>
            }
            subtitle="RASOAF Travels and Tours Limited orchestrates extraordinary travel experiences with white-glove service. Complimentary consultation, meticulous documentation, and unwavering support because your journey deserves nothing less than perfection."
          />
        </div>

        {/* Desktop Grid */}
        <div className="visa-services-grid">
          {services.map((service, index) => (
            <VisaCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredId === service.id}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileVisaCarousel services={services} onNavigate={handleNavigate} />
      </section>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MOBILE VISA CAROUSEL
// ══════════════════════════════════════════════════════════════════════════
function MobileVisaCarousel({ services, onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const total = services.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (reducedMotion) return;
    timerRef.current = setInterval(() => setCurrent(prev => (prev + 1) % total), 5000);
  }, [reducedMotion, total]);

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAutoplay]);

  const goTo = useCallback((i) => {
    setCurrent(((i % total) + total) % total);
    startAutoplay();
  }, [total, startAutoplay]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev();
    else if (diff < -50) next();
    setTouchStart(null);
  };

  return (
    <div className="visa-mobile-carousel">
      <div
        className="visa-mobile-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, i) => (
          <div key={service.id} className="visa-mobile-slide">
            <VisaCard
              service={service}
              index={i}
              isMobile
              isActive={i === current}
              onNavigate={onNavigate}
            />
          </div>
        ))}
      </div>

      <div className="visa-mobile-nav">
        <button className="visa-mobile-btn" onClick={prev} aria-label="Previous visa service" type="button">
          <ChevronLeft size={18} />
        </button>
        <div className="visa-mobile-dots">
          {services.map((service, i) => (
            <button
              key={service.id}
              className={`visa-mobile-dot${i === current ? " visa-mobile-dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${service.title}`}
              aria-current={i === current ? "true" : "false"}
              type="button"
            />
          ))}
        </div>
        <button className="visa-mobile-btn" onClick={next} aria-label="Next visa service" type="button">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  VISA CARD
// ══════════════════════════════════════════════════════════════════════════
function VisaCard({ service, index = 0, onHoverStart, onHoverEnd, onNavigate, isMobile = false, isActive = true }) {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  // Mobile-only: the overlay starts hidden so the image stays fully
  // visible; tapping the image or the hint chip reveals it (mirrors the
  // desktop :hover state). The "Explore Visa" button always navigates.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Collapse the overlay back down when this slide scrolls out of view
  // (swiped away or carousel auto-advances) so it doesn't stay open and
  // cover the image next time the user returns to it.
  useEffect(() => {
    if (isMobile && !isActive) setRevealed(false);
  }, [isMobile, isActive]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleCardClick = (e) => {
    if (isMobile) {
      setRevealed((prev) => !prev);
      return;
    }
    onNavigate(service.route, e);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onNavigate(service.route, e);
  };

  const mobileRevealed = isMobile && revealed;

  return (
    <motion.div
      ref={cardRef}
      className={`visa-card${mobileRevealed ? " visa-card-revealed" : ""}`}
      variants={!isMobile ? cardVariants : {}}
      initial={!isMobile ? "hidden" : {}}
      animate={!isMobile && isInView ? "visible" : {}}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isMobile) {
            setRevealed((prev) => !prev);
          } else {
            onNavigate(service.route, e);
          }
        }
      }}
      aria-label={
        isMobile
          ? `${revealed ? "Hide" : "View"} details for ${service.title}`
          : `Explore ${service.title}`
      }
      aria-expanded={isMobile ? revealed : undefined}
    >
      <img
        src={service.image}
        alt={service.title}
        className="visa-card-image"
        loading={isMobile && index === 0 ? "eager" : "lazy"}
        decoding="async"
      />

      <div className="visa-card-hint">
        <Eye size={14} />
        <span>{isMobile ? "Tap to view details" : "Hover to explore"}</span>
        <Sparkles size={12} />
      </div>

      <div className="visa-card-overlay">
        <h3 className="visa-card-title">{service.title}</h3>
        <p className="visa-card-desc">{service.description}</p>

        <div className="visa-card-info">
          <div className="visa-info-item">
            <span className="visa-info-label">Processing</span>
            <span className="visa-info-value">{service.processingTime}</span>
          </div>
          <div className="visa-info-item">
            <span className="visa-info-label">Success Rate</span>
            <span className="visa-info-value success">{service.successRate}</span>
          </div>
        </div>

        <button
          className="visa-cta-button"
          onClick={handleButtonClick}
          type="button"
          aria-label={`Explore ${service.title} visa services`}
        >
          <span>
            Explore Visa
            <ChevronRight size={16} className="visa-cta-arrow" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}