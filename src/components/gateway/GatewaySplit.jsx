// src/components/gateway/GatewaySplit.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Gateway
//
// Three-column luxury layout: Hajj Card | Earth Window | Visa Card
// Earth is the visible centerpiece — 70-80% of globe remains unobstructed.
// Cards are glassmorphism panels that frame the Earth instead of hiding it.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import EarthBackground from "./EarthBackground";
import GatewayOverlay from "./GatewayOverlay";
import { useTransitionController } from "./TransitionController";
import { COLORS, PANEL_CONTENT } from "./constants";

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

  /* ── Three-column layout ──────────────────────────────────────────── */
  .gw-stage {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    padding: clamp(20px, 3vw, 48px);
  }

  /* Left column — Hajj card */
  .gw-col-left {
    flex: 0 0 clamp(300px, 28vw, 360px);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  /* Center column — Earth viewing window (empty, transparent) */
  .gw-col-center {
    flex: 0 0 clamp(200px, 38vw, 520px);
    pointer-events: none;
  }

  /* Right column — Travel card */
  .gw-col-right {
    flex: 0 0 clamp(300px, 28vw, 360px);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  /* ── Glass card ───────────────────────────────────────────────────── */
  .gw-card {
    width: 100%;
    background: rgba(10,14,22,0.22);
    backdrop-filter: blur(20px) saturate(130%);
    -webkit-backdrop-filter: blur(20px) saturate(130%);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 28px;
    padding: clamp(26px, 3vw, 40px) clamp(22px, 2.5vw, 34px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.22,1,0.36,1);
    box-shadow: 0 8px 40px rgba(0,0,0,0.28);
    animation: gw-float 7s ease-in-out infinite;
  }
  .gw-card:nth-child(2) { animation-delay: -3.5s; }

  .gw-card:hover {
    background: rgba(12,18,28,0.32);
    border-color: rgba(212,175,55,0.25);
    box-shadow: 0 20px 64px rgba(0,0,0,0.38), 0 0 0 1px rgba(212,175,55,0.06), 0 0 36px rgba(212,175,55,0.05);
    transform: translateY(-5px) scale(1.012);
  }

  @keyframes gw-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-4px); }
  }

  /* ── Badge ────────────────────────────────────────────────────────── */
  .gw-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 15px;
    background: rgba(196,151,42,0.09);
    border: 1px solid rgba(196,151,42,0.20);
    border-radius: 50px;
    margin-bottom: 20px;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .gw-badge__text {
    color: #F7C948;
    fontSize: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
  }

  /* ── Title ─────────────────────────────────────────────────────────── */
  .gw-title {
    font-family: 'Manrope', sans-serif;
    font-weight: 800;
    font-size: clamp(22px, 3.5vw, 34px);
    color: #ffffff;
    margin-bottom: 8px;
    line-height: 1.12;
    letter-spacing: -0.02em;
  }

  /* ── Description ───────────────────────────────────────────────────── */
  .gw-desc {
    font-size: clamp(12px, 1.1vw, 14px);
    color: rgba(255,255,255,0.72);
    line-height: 1.55;
    margin-bottom: 24px;
    max-width: 300px;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  /* ── Button ────────────────────────────────────────────────────────── */
  .gw-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    border-radius: 14px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #111;
    background: linear-gradient(135deg, #F7C948 0%, #C4972A 100%);
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.01em;
    transition: all 0.35s cubic-bezier(0.25,1,0.5,1);
    box-shadow: 0 4px 18px rgba(196,151,42,0.20);
    position: relative;
    overflow: hidden;
  }
  .gw-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(196,151,42,0.30);
  }

  /* ── Transition overlay ────────────────────────────────────────────── */
  .gw-transition {
    position: fixed;
    inset: 0;
    background: #071018;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
  }

  /* ── Responsive ────────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .gw-stage {
      flex-direction: column;
      gap: clamp(28px, 4vh, 48px);
      padding: clamp(16px, 3vw, 32px);
    }
    .gw-col-left, .gw-col-right {
      flex: 0 0 auto;
      width: 100%;
      max-width: 400px;
    }
    .gw-col-center {
      flex: 0 0 0;
      display: none;
    }
  }
  @media (max-width: 768px) {
    .gw-stage { gap: 20px; }
    .gw-card { padding: 22px 18px; border-radius: 22px; }
    .gw-title { font-size: clamp(20px, 5vw, 28px); }
  }
  @media (max-width: 480px) {
    .gw-col-left, .gw-col-right { max-width: 100%; }
  }
  @media (prefers-reduced-motion: reduce) {
    .gw-card { animation: none !important; transition: none !important; }
    .gw-card:hover { transform: none !important; }
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

  return (
    <>
      <style>{CSS}</style>

      <div className="gw-root">
        {/* ── Layer 1-4: Earth + all cinematic effects ─────────────────── */}
        <EarthBackground />
        <GatewayOverlay />

        {/* ── Layer 5-6: Gateway Cards ─────────────────────────────────── */}
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
                    aria-label="Enter Hajj & Umrah — Sacred pilgrimages"
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleHajjClick()}
                  >
                    <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                      <div className="gw-badge">
                        <Sparkles size={11} color="#F7C948" />
                        <span className="gw-badge__text">{PANEL_CONTENT.hajj.badge}</span>
                      </div>
                    </motion.div>

                    <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate="visible" className="gw-title">
                      {PANEL_CONTENT.hajj.title}
                    </motion.h1>

                    <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible" className="gw-desc">
                      {PANEL_CONTENT.hajj.description}
                    </motion.p>

                    <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible">
                      <button className="gw-btn" tabIndex={-1}>
                        {PANEL_CONTENT.hajj.button}
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>

                {/* ── Center: Empty Earth viewing window ────────────────── */}
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
                    aria-label="Enter Travel & Tours — Visa, flights, hotels"
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTravelClick()}
                  >
                    <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                      <div className="gw-badge">
                        <Sparkles size={11} color="#F7C948" />
                        <span className="gw-badge__text">{PANEL_CONTENT.travel.badge}</span>
                      </div>
                    </motion.div>

                    <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate="visible" className="gw-title">
                      {PANEL_CONTENT.travel.title}
                    </motion.h1>

                    <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible" className="gw-desc">
                      {PANEL_CONTENT.travel.description}
                    </motion.p>

                    <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible">
                      <button className="gw-btn" tabIndex={-1}>
                        {PANEL_CONTENT.travel.button}
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Transition overlay ──────────────────────────────────────── */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="gw-transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ textAlign: "center", color: COLORS.GOLD_LIGHT, fontFamily: "'Manrope', sans-serif" }}>
                  <div style={{
                    width: 44, height: 44,
                    border: `2px solid ${COLORS.GOLD_DARK}`,
                    borderTopColor: COLORS.GOLD_LIGHT,
                    borderRadius: "50%",
                    animation: "gw-spin 0.8s linear infinite",
                    margin: "0 auto 18px",
                  }} />
                  <span style={{ fontSize: "clamp(15px, 2vw, 22px)", fontWeight: 600, letterSpacing: "0.04em" }}>
                    Preparing Your Journey
                  </span>
                </div>
                <style>{`@keyframes gw-spin { to { transform: rotate(360deg); } }`}</style>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}