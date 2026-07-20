// src/components/travel/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Travel Hero (v2)
// Earth in upper portion · Text below with breathing room · Luxury composition
//
// AUDIT LOG — v1 → v2 (per Master Redesign Prompt: Hero Section directive)
// ─────────────────────────────────────────────────────────────────────────────
// 1. Visual noise reduced ~30% around text zone:
//    - th-text-atmosphere gradient softened (fewer stops, lower peak opacity
//      0.95 → 0.82) so the Earth reads through instead of being blocked by a
//      near-solid scrim.
//    - Removed the redundant th-bottom-fade + atmosphere overlap (they were
//      stacking two competing gradients at the same edge) — merged into one
//      controlled fade.
//    - Badge glow/border opacity trimmed slightly so it stops competing with
//      the headline for first-glance attention.
// 2. CTA promoted to second-strongest visual element after the headline:
//    - Size increased (padding, font-size floor raised).
//    - Shadow given two-stage elevation (rest vs hover) for more presence at
//      rest, not just on interaction.
//    - Added a small trust microcopy line beneath the button (quiet, not a
//      new competing headline) to reinforce action without adding noise.
// 3. Spacing rhythm improved:
//    - Badge → headline → subtitle → CTA gaps widened and made proportional
//      via clamp() rather than fixed px, so hierarchy holds at every
//      viewport instead of collapsing on tablet.
// 4. Everything else preserved: Earth, routes, particles, gold identity,
//    fonts, shine animation, reduced-motion handling, props/API surface.
//    No content, features, or structure removed.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import EarthScene from "../common/EarthScene";

const P = { gold: "#D4A017", goldLight: "#F7C948" };

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.8 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const badgeVar = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const CSS = `
  .th-scene {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: clamp(88px, 11vh, 150px);
    padding-left: clamp(16px, 4vw, 60px);
    padding-right: clamp(16px, 4vw, 60px);
    font-family: 'Manrope', 'Inter', system-ui, sans-serif;
    background: #010612;
  }

  /* Content sits in the BOTTOM portion — Earth above */
  .th-content {
    position: relative;
    z-index: 10;
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
    margin-top: auto;
  }

  /* Atmospheric text backdrop — softened, single controlled fade
     (replaces the old two-layer atmosphere + bottom-fade stack) */
  .th-text-atmosphere {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 46%;
    background: linear-gradient(
      to top,
      rgba(1, 6, 18, 0.82) 0%,
      rgba(1, 6, 18, 0.46) 45%,
      rgba(1, 6, 18, 0.0) 100%
    );
    pointer-events: none;
    z-index: 8;
  }

  .th-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(212, 160, 23, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 160, 23, 0.13);
    border-radius: 100px;
    margin-bottom: 28px;
    transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .th-badge:hover {
    border-color: rgba(212, 160, 23, 0.34);
    background: rgba(212, 160, 23, 0.09);
    transform: translateY(-1px);
  }

  .th-badge-star { display: flex; animation: th-star-pulse 3s ease-in-out infinite; }
  @keyframes th-star-pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  .th-badge-label {
    color: #F7C948;
    font-size: clamp(10px, 0.9vw, 12px);
    font-weight: 600;
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }

  .th-heading {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: clamp(34px, 5.5vw, 60px);
    color: #FFFFFF;
    margin-bottom: 18px;
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-shadow: 0 0 60px rgba(0,0,0,0.5);
  }

  .th-heading-gold {
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #F7C948 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .th-subtitle {
    font-size: clamp(14px, 1.3vw, 17px);
    color: rgba(255, 255, 255, 0.5);
    max-width: 480px;
    margin: 0 auto clamp(36px, 5vh, 48px);
    line-height: 1.7;
    font-weight: 400;
  }

  .th-cta-group {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .th-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 17px 42px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: clamp(14px, 1.05vw, 16px);
    letter-spacing: 0.02em;
    color: #0A1628;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 50%, #B8860B 100%);
    box-shadow: 0 6px 32px rgba(212, 160, 23, 0.30), 0 1px 0 rgba(255,255,255,0.18) inset;
    position: relative;
    overflow: hidden;
    transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .th-cta::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    animation: th-shine 3.5s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes th-shine {
    0%, 100% { left: -100%; }
    50% { left: 120%; }
  }

  .th-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 44px rgba(212,160,23,0.44), 0 1px 0 rgba(255,255,255,0.22) inset; }
  .th-cta:active { transform: translateY(-1px); }

  .th-cta-label { position: relative; z-index: 1; }
  .th-cta-icon { position: relative; z-index: 1; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
  .th-cta:hover .th-cta-icon { transform: translateX(5px); }

  .th-cta-microcopy {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255, 255, 255, 0.38);
  }

  @media (max-width: 768px) {
    .th-scene { min-height: 85vh; padding-bottom: clamp(64px, 9vh, 110px); }
    .th-heading { font-size: clamp(28px, 7vw, 40px); }
    .th-cta { padding: 15px 32px; }
    .th-text-atmosphere { height: 42%; }
  }

  @media (max-width: 480px) {
    .th-scene { min-height: 75vh; padding-bottom: clamp(52px, 7vh, 84px); }
    .th-heading { font-size: clamp(24px, 8vw, 30px); }
    .th-subtitle { font-size: 14px; margin-bottom: 32px; }
    .th-text-atmosphere { height: 46%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .th-badge-star, .th-cta::after { animation: none !important; }
    .th-cta:hover { transform: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
export default function TravelHeroSection({
  badge = "Luxury Travel Experiences",
  title = "Your Gateway to the World",
  subtitle = "Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence.",
  backgroundImage,
  onCtaClick,
  ctaText = "Begin Your Journey",
  ctaMicrocopy = "No fees to start · Free consultation",
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const renderHeading = () => {
    const gatewayMatch = title.match(/^(.*Gateway to)\s+(.+)$/i);
    if (gatewayMatch) {
      return <>{gatewayMatch[1]}<br /><span className="th-heading-gold">{gatewayMatch[2]}</span></>;
    }
    const words = title.split(" "); const last = words.pop();
    return <>{words.join(" ")} <span className="th-heading-gold">{last}</span></>;
  };

  return (
    <>
      <style>{CSS}</style>
      <section className="th-scene">
        {/* ── Cinematic Earth — upper portion ────────────────── */}
        <EarthScene mode="hero" />

        {/* ── Atmospheric text backdrop (single controlled fade) ─ */}
        <div className="th-text-atmosphere" />

        {/* ── Content — bottom portion, breathing room from Earth */}
        <motion.div className="th-content" variants={container} initial="hidden" animate="visible">
          <motion.div variants={badgeVar}>
            <span className="th-badge">
              <span className="th-badge-star"><Star size={11} color={P.goldLight} fill={P.goldLight} /></span>
              <span className="th-badge-label">{badge}</span>
            </span>
          </motion.div>
          <motion.h1 className="th-heading" variants={fadeUp}>{renderHeading()}</motion.h1>
          <motion.p className="th-subtitle" variants={fadeUp}>{subtitle}</motion.p>
          {onCtaClick && (
            <motion.div className="th-cta-group" variants={fadeUp}>
              <button className="th-cta" onClick={onCtaClick}>
                <span className="th-cta-label">{ctaText}</span>
                <span className="th-cta-icon"><ArrowRight size={18} /></span>
              </button>
              {ctaMicrocopy && <span className="th-cta-microcopy">{ctaMicrocopy}</span>}
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
}