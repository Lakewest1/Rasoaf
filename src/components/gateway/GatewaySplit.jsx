// src/components/gateway/GatewaySplit.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Gateway
//
// 1. RASOAF brand with logo image at top
// 2. Ultra-transparent glass cards (stars + Earth visible through them)
// 3. Cards stay side-by-side on all screens, minimal words on smaller screens
// 4. All original content preserved — nothing reduced or changed
// 5. Premium cinematic transition — Earth visible during navigation
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Plane, 
  Compass, 
  Star, 
  MapPin, 
  Users, 
  Shield, 
  Clock,
  Award,
  Briefcase
} from "lucide-react";
import EarthBackground from "./EarthBackground";
import GatewayOverlay from "./GatewayOverlay";
import { useTransitionController } from "./TransitionController";
import { COLORS, PANEL_CONTENT } from "./constants";
import rasaofLogo from "../../images/rasoaf.png"; // Import the logo image

// ══════════════════════════════════════════════════════════════════════════
//  ICON MAP
// ══════════════════════════════════════════════════════════════════════════
const ICON_MAP = {
  Users, Shield, Clock, Star, Compass, Plane, MapPin, Globe, Award, Briefcase,
};

const renderFeatureTags = (features) => {
  if (!features) return null;
  return features.map((feature, idx) => {
    const IconComponent = ICON_MAP[feature.icon];
    return (
      <span key={idx} className="gw-feature-tag">
        {IconComponent && <IconComponent size={10} />}
        {feature.label}
      </span>
    );
  });
};

// ══════════════════════════════════════════════════════════════════════════
//  ANIMATION VARIANTS
// ══════════════════════════════════════════════════════════════════════════
const contentVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.25 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -12, filter: "blur(2px)", transition: { duration: 0.3 } },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// ══════════════════════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════════════════════
const CSS = `
  .gw-root {
    position: fixed;
    inset: 0;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* ── RASOAF Brand Bar with Logo Image ──────────────────────────────── */
  .gw-brand-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(12px, 2vh, 22px) clamp(16px, 3vw, 40px);
    pointer-events: none;
  }

  .gw-brand-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .gw-brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 2px;
  }

  .gw-logo-image {
    width: clamp(32px, 3.5vw, 44px);
    height: clamp(32px, 3.5vw, 44px);
    border-radius: 10px;
    object-fit: contain;
    filter: drop-shadow(0 0 12px rgba(196,151,42,0.4));
    animation: gw-logo-pulse 2s ease-in-out infinite;
  }

  @keyframes gw-logo-pulse {
    0%, 100% { filter: drop-shadow(0 0 12px rgba(196,151,42,0.4)); }
    50% { filter: drop-shadow(0 0 20px rgba(247,201,72,0.7)); }
  }

  .gw-brand-name {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 2.5vw, 26px);
    color: #ffffff;
    letter-spacing: -0.02em;
    line-height: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    text-shadow: 0 0 30px rgba(196,151,42,0.3);
  }

  .gw-brand-sub {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: clamp(8px, 1vw, 11px);
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .gw-brand-tagline {
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: clamp(7px, 0.8vw, 10px);
    color: #F7C948;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin-top: 1px;
  }

  /* ── Stage — wider Earth window, narrower cards ────────────────────── */
  .gw-stage {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    gap: clamp(24px, 4vw, 56px);
    padding: clamp(24px, 4vw, 56px);
    padding-top: clamp(85px, 13vh, 130px);
  }

  .gw-col-left {
    flex: 0 0 clamp(260px, 22vw, 320px);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: auto;
  }

  .gw-col-center {
    flex: 2 1 0;
    pointer-events: none;
  }

  .gw-col-right {
    flex: 0 0 clamp(260px, 22vw, 320px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    pointer-events: auto;
  }

  /* ═════════════════════════════════════════════════════════════════════
     ULTRA-TRANSPARENT GLASS CARD
     Stars + Earth visible through the card
  ═════════════════════════════════════════════════════════════════════ */
  .gw-card {
    width: 100%;
    background: rgba(8,12,20,0.12);
    backdrop-filter: blur(16px) saturate(110%);
    -webkit-backdrop-filter: blur(16px) saturate(110%);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 28px;
    padding: clamp(24px, 2.8vw, 38px) clamp(18px, 2vw, 28px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    animation: gw-float 7s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  .gw-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, rgba(212,175,55,0.03), transparent 70%);
    pointer-events: none;
  }

  .gw-card:hover {
    background: rgba(10,14,22,0.22);
    border-color: rgba(212,175,55,0.18);
    box-shadow: 0 12px 44px rgba(0,0,0,0.28), 0 0 0 1px rgba(212,175,55,0.05);
    transform: translateY(-5px) scale(1.012);
  }

  @keyframes gw-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-4px); }
  }

  .gw-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 15px;
    background: rgba(196,151,42,0.08);
    border: 1px solid rgba(196,151,42,0.18);
    border-radius: 50px;
    margin-bottom: 18px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .gw-badge__text {
    color: #F7C948;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }

  .gw-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: clamp(20px, 3vw, 30px);
    color: #ffffff;
    margin-bottom: 6px;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }
  .gw-title span {
    background: linear-gradient(135deg, #F7C948, #C4972A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gw-subtitle {
    font-size: clamp(11px, 0.9vw, 13px);
    color: rgba(255,255,255,0.5);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 12px;
    font-family: 'Inter', sans-serif;
  }

  .gw-desc {
    font-size: clamp(11px, 0.95vw, 13px);
    color: rgba(255,255,255,0.7);
    line-height: 1.55;
    margin-bottom: 20px;
    max-width: 280px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  .gw-features {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .gw-feature-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 50px;
    font-size: 9px;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }
  .gw-feature-tag:hover {
    background: rgba(247,201,72,0.06);
    border-color: rgba(247,201,72,0.12);
    color: rgba(255,255,255,0.8);
    transform: translateY(-1px);
  }
  .gw-feature-tag svg {
    width: 10px;
    height: 10px;
    color: #F7C948;
    flex-shrink: 0;
  }

  .gw-stats {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 20px;
    padding: 8px 0;
  }
  .gw-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .gw-stat-number {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: clamp(16px, 1.4vw, 20px);
    color: #F7C948;
    line-height: 1.2;
  }
  .gw-stat-label {
    font-size: 8px;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }
  .gw-stat-divider {
    width: 1px;
    background: rgba(255,255,255,0.04);
  }

  .gw-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 11px 26px;
    border-radius: 14px;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    color: #111;
    background: linear-gradient(135deg, #F7C948 0%, #C4972A 100%);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.01em;
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
    box-shadow: 0 4px 18px rgba(196,151,42,0.18);
    position: relative;
    overflow: hidden;
  }
  .gw-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .gw-btn:hover::after { opacity: 1; }
  .gw-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(196,151,42,0.28);
  }
  .gw-btn svg { transition: transform 0.3s ease; }
  .gw-btn:hover svg { transform: translateX(3px); }

  .gw-transition {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  .gw-transition-overlay {
    position: absolute;
    inset: 0;
    background: rgba(7,16,24,0.55);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 1;
  }

  .gw-transition-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #F7C948;
    font-family: 'Manrope', sans-serif;
  }

  @keyframes gw-spin {
    to { transform: rotate(360deg); }
  }

    /* ═════════════════════════════════════════════════════════════════════
     RESPONSIVE — Cards stay side-by-side, text shrinks on small screens
     All content preserved — never hidden, only smaller
     Minimum readable sizes maintained for accessibility
  ═════════════════════════════════════════════════════════════════════ */
  @media (max-width: 900px) {
    .gw-stage { gap: 16px; padding: clamp(12px, 2vw, 20px); padding-top: clamp(75px, 11vh, 110px); }
    .gw-col-center { flex: 1.2 1 0; }
    .gw-col-left { flex: 0 0 clamp(220px, 30vw, 280px); }
    .gw-col-right { flex: 0 0 clamp(220px, 30vw, 280px); }
    .gw-card { padding: 16px 12px; border-radius: 20px; }
    .gw-title { font-size: clamp(18px, 3.5vw, 22px); }
    .gw-desc { font-size: clamp(11px, 1.5vw, 13px); max-width: 100%; }
    .gw-subtitle { font-size: clamp(10px, 1.2vw, 12px); }
    .gw-badge { padding: 3px 10px; margin-bottom: 12px; }
    .gw-badge__text { font-size: 9px; }
    .gw-btn { padding: 9px 20px; font-size: 11px; }
    .gw-stats { gap: 10px; }
    .gw-stat-number { font-size: clamp(14px, 2vw, 16px); }
    .gw-stat-label { font-size: 7px; }
    .gw-features { gap: 4px; }
    .gw-feature-tag { font-size: 8px; padding: 2px 7px; }
    .gw-logo-image { width: clamp(28px, 4vw, 36px); height: clamp(28px, 4vw, 36px); }
  }

  @media (max-width: 600px) {
    .gw-stage { gap: 8px; padding: 6px; padding-top: clamp(65px, 10vh, 90px); }
    .gw-col-center { flex: 0.6 1 0; }
    .gw-col-left { flex: 0 0 clamp(140px, 32vw, 200px); }
    .gw-col-right { flex: 0 0 clamp(140px, 32vw, 200px); }
    .gw-card { padding: 12px 8px; border-radius: 16px; }
    .gw-title { font-size: clamp(14px, 4vw, 16px); margin-bottom: 3px; }
    .gw-desc { font-size: clamp(10px, 2.2vw, 12px); line-height: 1.35; margin-bottom: 10px; }
    .gw-subtitle { font-size: clamp(9px, 2vw, 10px); margin-bottom: 6px; }
    .gw-badge { padding: 3px 8px; margin-bottom: 8px; gap: 4px; }
    .gw-badge__text { font-size: 8px; letter-spacing: 0.04em; }
    .gw-btn { padding: 8px 14px; font-size: 10px; border-radius: 10px; gap: 5px; }
    .gw-stats { gap: 8px; margin-bottom: 10px; }
    .gw-stat-number { font-size: clamp(12px, 3vw, 14px); }
    .gw-stat-label { font-size: 7px; }
    .gw-features { gap: 3px; margin-bottom: 10px; }
    .gw-feature-tag { font-size: 7px; padding: 2px 6px; }
    .gw-brand-name { font-size: clamp(14px, 3vw, 16px); }
    .gw-brand-sub { font-size: 8px; }
    .gw-brand-tagline { font-size: 7px; }
    .gw-logo-image { width: clamp(24px, 5vw, 28px); height: clamp(24px, 5vw, 28px); }
  }

  @media (max-width: 380px) {
    .gw-stage { gap: 4px; padding: 3px; padding-top: clamp(55px, 8vh, 70px); }
    .gw-col-center { flex: 0.3 1 0; }
    .gw-col-left { flex: 0 0 clamp(130px, 38vw, 160px); }
    .gw-col-right { flex: 0 0 clamp(130px, 38vw, 160px); }
    .gw-card { padding: 10px 5px; border-radius: 12px; }
    .gw-title { font-size: 13px; }
    .gw-desc { font-size: 9px; }
    .gw-subtitle { font-size: 8px; }
    .gw-badge__text { font-size: 7px; }
    .gw-btn { padding: 7px 10px; font-size: 9px; border-radius: 8px; }
    .gw-stat-number { font-size: 12px; }
    .gw-stat-label { font-size: 6px; }
    .gw-feature-tag { font-size: 6px; }
    .gw-brand-name { font-size: 13px; }
    .gw-logo-image { width: clamp(20px, 6vw, 24px); height: clamp(20px, 6vw, 24px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .gw-card { animation: none !important; transition: none !important; }
    .gw-card:hover { transform: none !important; }
    .gw-logo-image { animation: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
export default function GatewaySplit() {
  const { isTransitioning, startTransition } = useTransitionController();

  const handleHajjClick = useCallback(() => {
    if (isTransitioning) return;
    startTransition("hajj");
  }, [isTransitioning, startTransition]);

  const handleTravelClick = useCallback(() => {
    if (isTransitioning) return;
    startTransition("travel");
  }, [isTransitioning, startTransition]);

  const hajjContent = PANEL_CONTENT.hajj;
  const travelContent = PANEL_CONTENT.travel;

  return (
    <>
      <style>{CSS}</style>

      <div className="gw-root">
        <EarthBackground />
        <GatewayOverlay />

        {/* ── RASOAF Brand with Logo Image ─────────────────────── */}
        <motion.div
          className="gw-brand-bar"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="gw-brand-content">
            <div className="gw-brand-logo ">
              <img 
                src={rasaofLogo} 
                alt="RASOAF Logo" 
                className="gw-logo-image"
              />
              <div className="gw-brand-name">RASOAF</div>
            </div>
            <div className="gw-brand-tagline">Your Trusted Travel Partner</div>
          </div>
        </motion.div>

        {/* ── Three-Column Stage ────────────────────────────────────────── */}
        <div className="gw-stage">
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <>
                {/* ── Left: Hajj & Umrah ───────────────────────────────── */}
                <motion.div
                  key="hajj-card"
                  className="gw-col-left"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="gw-card"
                    onClick={handleHajjClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Enter Hajj & Umrah"
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleHajjClick()}
                  >
                    <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                      <div className="gw-badge">
                        <Sparkles size={10} color="#F7C948" />
                        <span className="gw-badge__text">{hajjContent.badge}</span>
                      </div>
                    </motion.div>

                    <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate="visible" className="gw-title">
                      {hajjContent.title}
                    </motion.h1>

                    {hajjContent.subtitle && (
                      <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible" className="gw-subtitle">
                        {hajjContent.subtitle}
                      </motion.p>
                    )}

                    <motion.p custom={3} variants={contentVariants} initial="hidden" animate="visible" className="gw-desc">
                      {hajjContent.description}
                    </motion.p>

                    {hajjContent.stats && (
                      <motion.div custom={3.5} variants={contentVariants} initial="hidden" animate="visible" className="gw-stats">
                        {Object.entries(hajjContent.stats).map(([key, value]) => (
                          <div key={key} className="gw-stat-item">
                            <span className="gw-stat-number">{value}</span>
                            <span className="gw-stat-label">{key}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {hajjContent.features?.primary && (
                      <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="gw-features">
                        {renderFeatureTags(hajjContent.features.primary)}
                      </motion.div>
                    )}

                    <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
                      <button className="gw-btn" tabIndex={-1}>
                        {hajjContent.button}
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* ── Center: Earth window ─────────────────────────────── */}
                <div className="gw-col-center" />

                {/* ── Right: Travel & Tours ────────────────────────────── */}
                <motion.div
                  key="travel-card"
                  className="gw-col-right"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  <div
                    className="gw-card"
                    onClick={handleTravelClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Enter Travel & Tours"
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTravelClick()}
                  >
                    <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                      <div className="gw-badge">
                        <Sparkles size={10} color="#F7C948" />
                        <span className="gw-badge__text">{travelContent.badge}</span>
                      </div>
                    </motion.div>

                    <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate="visible" className="gw-title">
                      {travelContent.title}
                    </motion.h1>

                    {travelContent.subtitle && (
                      <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible" className="gw-subtitle">
                        {travelContent.subtitle}
                      </motion.p>
                    )}

                    <motion.p custom={3} variants={contentVariants} initial="hidden" animate="visible" className="gw-desc">
                      {travelContent.description}
                    </motion.p>

                    {travelContent.stats && (
                      <motion.div custom={3.5} variants={contentVariants} initial="hidden" animate="visible" className="gw-stats">
                        {Object.entries(travelContent.stats).map(([key, value]) => (
                          <div key={key} className="gw-stat-item">
                            <span className="gw-stat-number">{value}</span>
                            <span className="gw-stat-label">{key}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {travelContent.features?.primary && (
                      <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" className="gw-features">
                        {renderFeatureTags(travelContent.features.primary)}
                      </motion.div>
                    )}

                    <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
                      <button className="gw-btn" tabIndex={-1}>
                        {travelContent.button}
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Premium Cinematic Transition — Earth visible through overlay ── */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="gw-transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Semi-transparent overlay — Earth visible through it */}
                <div className="gw-transition-overlay" />

                {/* Centered content */}
                <div className="gw-transition-content">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 48,
                      height: 48,
                      border: "2px solid rgba(196,151,42,0.4)",
                      borderTopColor: "#F7C948",
                      borderRadius: "50%",
                      animation: "gw-spin 1s linear infinite",
                      margin: "0 auto 20px",
                    }}
                  />
                  <span style={{
                    fontSize: "clamp(16px, 2.5vw, 24px)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    display: "block",
                  }}>
                    Beginning Your Journey
                  </span>
                  <p style={{
                    fontSize: "clamp(11px, 1.2vw, 14px)",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 8,
                  }}>
                    The world awaits
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}