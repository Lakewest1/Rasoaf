// src/components/travel/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Travel Hero
// Earth in upper portion · Text below with breathing room · Luxury composition
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
    padding-bottom: clamp(80px, 10vh, 140px);
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

  /* Atmospheric glow behind text — subtle, not a dark circle */
  .th-text-atmosphere {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    height: 50%;
    background: linear-gradient(
      to top,
      rgba(1, 6, 18, 0.95) 0%,
      rgba(1, 6, 18, 0.6) 40%,
      rgba(1, 6, 18, 0.1) 100%
    );
    pointer-events: none;
    z-index: 8;
  }

  .th-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(212, 160, 23, 0.06);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 160, 23, 0.16);
    border-radius: 100px;
    margin-bottom: 24px;
    transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .th-badge:hover {
    border-color: rgba(212, 160, 23, 0.38);
    background: rgba(212, 160, 23, 0.10);
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
    margin-bottom: 16px;
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
    margin: 0 auto 40px;
    line-height: 1.7;
    font-weight: 400;
  }

  .th-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 15px 38px;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    font-family: 'Manrope', sans-serif;
    font-weight: 700;
    font-size: clamp(13px, 1vw, 16px);
    letter-spacing: 0.02em;
    color: #0A1628;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 50%, #B8860B 100%);
    box-shadow: 0 4px 28px rgba(212, 160, 23, 0.22), 0 1px 0 rgba(255,255,255,0.18) inset;
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

  .th-cta:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(212,160,23,0.38), 0 1px 0 rgba(255,255,255,0.22) inset; }
  .th-cta:active { transform: translateY(-1px); }

  .th-cta-label { position: relative; z-index: 1; }
  .th-cta-icon { position: relative; z-index: 1; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
  .th-cta:hover .th-cta-icon { transform: translateX(5px); }

  /* Bottom fade to cream for next section */
  .th-bottom-fade {
    position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
    background: linear-gradient(to top, #FFF8E6 0%, transparent 100%);
    z-index: 6; pointer-events: none;
  }

  @media (max-width: 768px) {
    .th-scene { min-height: 85vh; padding-bottom: clamp(60px, 8vh, 100px); }
    .th-heading { font-size: clamp(28px, 7vw, 40px); }
    .th-cta { padding: 13px 28px; }
    .th-text-atmosphere { height: 45%; }
  }

  @media (max-width: 480px) {
    .th-scene { min-height: 75vh; padding-bottom: clamp(50px, 7vh, 80px); }
    .th-heading { font-size: clamp(24px, 8vw, 30px); }
    .th-subtitle { font-size: 14px; margin-bottom: 28px; }
    .th-text-atmosphere { height: 50%; }
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

        {/* ── Atmospheric text backdrop ───────────────────────── */}
        <div className="th-text-atmosphere" />

        {/* ── Bottom fade ─────────────────────────────────────── */}
        <div className="th-bottom-fade" />

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
            <motion.div variants={fadeUp}>
              <button className="th-cta" onClick={onCtaClick}>
                <span className="th-cta-label">{ctaText}</span>
                <span className="th-cta-icon"><ArrowRight size={18} /></span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
}