// src/components/travel/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Travel Hero (v3.1)
// RASOAF Typography · Earth Scene · Gold accents · Perfectly responsive
// GPU-accelerated · WCAG AA+ · Scroll-optimized · 320px → 2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useMemo, useCallback, memo, lazy, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

// Lazy load EarthScene for code splitting
const EarthScene = lazy(() => import("../common/EarthScene"));

// ══════════════════════════════════════════════════════════════════════════
// RASOAF Design Tokens
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  background: "#010612",
  text: "#FFFFFF",
  textMuted: "rgba(255, 255, 255, 0.55)",
  textMicro: "rgba(255, 255, 255, 0.38)",
  overlayStart: "rgba(1, 6, 18, 0.85)",
  overlayMid: "rgba(1, 6, 18, 0.50)",
  overlayEnd: "rgba(1, 6, 18, 0.0)",
  badgeBg: "rgba(212, 160, 23, 0.05)",
  badgeBorder: "rgba(212, 160, 23, 0.13)",
  badgeBorderHover: "rgba(212, 160, 23, 0.34)",
  badgeBgHover: "rgba(212, 160, 23, 0.09)",
  ctaShadow: "rgba(212, 160, 23, 0.30)",
  ctaShadowHover: "rgba(212, 160, 23, 0.44)",
};

// ══════════════════════════════════════════════════════════════════════════
// Animation Variants
// ══════════════════════════════════════════════════════════════════════════
const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.6, when: "beforeChildren" } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], opacity: { duration: 0.7 } } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], scale: { type: "spring", stiffness: 300, damping: 25 } } },
  hover: { scale: 1.03, y: -2, borderColor: TOKENS.badgeBorderHover, backgroundColor: TOKENS.badgeBgHover, transition: { type: "spring", stiffness: 400, damping: 15 } },
  tap: { scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
  hover: { y: -4, boxShadow: `0 12px 48px ${TOKENS.ctaShadowHover}, 0 1px 0 rgba(255,255,255,0.22) inset`, transition: { type: "spring", stiffness: 400, damping: 12 } },
  tap: { y: -1, transition: { type: "spring", stiffness: 500, damping: 20 } },
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to .th-scene · RASOAF Typography
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .th-scene,
  .th-scene *,
  .th-scene *::before,
  .th-scene *::after { box-sizing: border-box; }

  .th-scene {
    --th-display: ${TOKENS.display}; --th-body: ${TOKENS.body};
    --th-gold: ${TOKENS.gold}; --th-gold-light: ${TOKENS.goldLight}; --th-gold-dark: ${TOKENS.goldDark};
    --th-bg: ${TOKENS.background}; --th-text: ${TOKENS.text};
    --th-text-muted: ${TOKENS.textMuted}; --th-text-micro: ${TOKENS.textMicro};
  }

  .th-scene {
    position: relative; isolation: isolate; overflow: hidden;
    min-height: 100vh; min-height: 100dvh;
    display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    padding: 0 clamp(16px, 4vw, 60px);
    padding-bottom: clamp(88px, 11vh, 150px);
    font-family: var(--th-body);
    background: var(--th-bg);
    contain: layout paint style;
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }

  .th-skip-link {
    position: absolute; top: -100%; left: 20px;
    background: var(--th-gold-light); color: #0A1628;
    padding: 12px 24px; border-radius: 8px; z-index: 100;
    font-weight: 700; font-family: var(--th-display);
    text-decoration: none; transition: top 0.3s ease; font-size: 14px;
  }
  .th-skip-link:focus { top: 20px; outline: 3px solid var(--th-gold); outline-offset: 2px; }

  .th-earth-container {
    position: absolute; inset: 0; z-index: 2;
    will-change: transform; backface-visibility: hidden;
    transform: translate3d(0, 0, 0); contain: layout paint;
  }

  .th-earth-skeleton {
    position: absolute; inset: 0;
    background: radial-gradient(circle at 50% 35%, rgba(212, 160, 23, 0.08) 0%, rgba(1, 6, 18, 0.6) 50%, rgba(1, 6, 18, 1) 100%);
    animation: th-earth-pulse 2s ease-in-out infinite;
  }
  @keyframes th-earth-pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }

  .th-content {
    position: relative; z-index: 10; max-width: 720px; width: 100%;
    margin: auto auto 0; text-align: center; contain: layout style;
  }

  .th-text-atmosphere {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 120%; height: 46%;
    background: linear-gradient(to top, ${TOKENS.overlayStart} 0%, ${TOKENS.overlayMid} 45%, ${TOKENS.overlayEnd} 100%);
    pointer-events: none; z-index: 8;
    will-change: opacity; backface-visibility: hidden;
  }

  /* Badge: Inter 600 · uppercase */
  .th-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 8px 22px;
    background: ${TOKENS.badgeBg};
    backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid ${TOKENS.badgeBorder}; border-radius: 9999px;
    margin-bottom: clamp(24px, 3vh, 32px);
    transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform; backface-visibility: hidden; cursor: default;
  }
  .th-badge:focus-visible { outline: 2px solid var(--th-gold-light); outline-offset: 4px; }

  .th-badge-star { display: flex; animation: th-star-pulse 3s ease-in-out infinite; }
  @keyframes th-star-pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }

  .th-badge-label {
    color: var(--th-gold-light); font-size: clamp(10px, 0.95vw, 13px);
    font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1.2;
    font-family: var(--th-body);
  }

  /* Heading: Manrope 800 */
  .th-heading {
    font-family: var(--th-display); font-weight: 800;
    font-size: clamp(36px, 6vw, 64px); color: var(--th-text);
    margin-bottom: clamp(16px, 2.5vh, 22px); line-height: 1.06;
    letter-spacing: -0.03em; text-shadow: 0 2px 40px rgba(0, 0, 0, 0.6);
    will-change: transform, opacity;
  }

  .th-heading-gold {
    background: linear-gradient(135deg, var(--th-gold-light) 0%, var(--th-gold) 45%, var(--th-gold-dark) 80%);
    background-size: 200% 200%;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: th-gold-shimmer 4s ease-in-out infinite;
  }
  @keyframes th-gold-shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  /* Subtitle: Inter 400 */
  .th-subtitle {
    font-family: var(--th-body); font-size: clamp(15px, 1.4vw, 18px);
    color: var(--th-text-muted); max-width: 500px;
    margin: 0 auto clamp(40px, 5.5vh, 52px); line-height: 1.75;
    font-weight: 400; letter-spacing: 0.005em;
  }

  .th-cta-group { display: inline-flex; flex-direction: column; align-items: center; gap: 16px; }

  /* CTA: Manrope 700 */
  .th-cta {
    display: inline-flex; align-items: center; gap: 14px;
    padding: 18px 44px; border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--th-display); font-weight: 700;
    font-size: clamp(15px, 1.1vw, 17px); letter-spacing: 0.03em;
    color: #0A1628;
    background: linear-gradient(135deg, var(--th-gold-light) 0%, var(--th-gold) 50%, var(--th-gold-dark) 100%);
    background-size: 200% 200%;
    box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255, 255, 255, 0.2) inset;
    position: relative; overflow: hidden;
    transition: all 0.45s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform, box-shadow; backface-visibility: hidden;
    min-height: 56px; min-width: 200px; outline: none;
  }

  .th-cta:focus-visible {
    outline: 3px solid var(--th-gold-light); outline-offset: 3px;
    box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 0 0 6px rgba(212, 160, 23, 0.15);
  }

  .th-cta::after {
    content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent);
    animation: th-shine 3.8s ease-in-out infinite; pointer-events: none; z-index: 2;
  }
  @keyframes th-shine { 0%,100%{left:-100%} 45%{left:130%} }

  .th-cta-label { position: relative; z-index: 3; white-space: nowrap; }
  .th-cta-icon { position: relative; z-index: 3; transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
  .th-cta:hover .th-cta-icon { transform: translateX(6px); }
  .th-cta:active .th-cta-icon { transform: translateX(3px); }

  /* Microcopy: Inter 500 */
  .th-cta-microcopy {
    font-family: var(--th-body); font-size: 13px; font-weight: 500;
    letter-spacing: 0.015em; color: var(--th-text-micro); transition: opacity 0.3s ease;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .th-scene { padding-bottom: clamp(80px, 10vh, 130px); }
    .th-heading { font-size: clamp(32px, 6.5vw, 52px); }
    .th-text-atmosphere { height: 44%; }
  }

  @media (max-width: 768px) {
    .th-scene { min-height: 90vh; min-height: 90dvh; padding-bottom: clamp(64px, 9vh, 110px); }
    .th-heading { font-size: clamp(28px, 7.5vw, 42px); }
    .th-cta { padding: 16px 36px; min-height: 52px; min-width: 180px; font-size: clamp(14px, 2vw, 16px); }
    .th-text-atmosphere { height: 42%; }
    .th-badge { padding: 7px 18px; }
  }

  @media (max-width: 480px) {
    .th-scene { min-height: 80vh; min-height: 80dvh; padding-bottom: clamp(52px, 7vh, 84px); }
    .th-heading { font-size: clamp(26px, 8.5vw, 34px); }
    .th-subtitle { font-size: 15px; margin-bottom: 34px; padding: 0 8px; }
    .th-cta { padding: 15px 32px; min-height: 50px; min-width: 160px; width: 100%; max-width: 300px; justify-content: center; gap: 10px; border-radius: 12px; }
    .th-text-atmosphere { height: 48%; }
    .th-badge { padding: 6px 16px; gap: 6px; margin-bottom: 20px; }
    .th-badge-label { font-size: 11px; letter-spacing: 0.08em; }
  }

  @media (max-width: 360px) {
    .th-heading { font-size: 24px; letter-spacing: -0.02em; }
    .th-cta { padding: 14px 28px; font-size: 14px; min-height: 48px; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .th-scene, .th-scene *, .th-scene *::before, .th-scene *::after {
      animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .th-badge:hover { transform: none !important; }
    .th-cta:hover { transform: none !important; box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255, 255, 255, 0.2) inset !important; }
    .th-cta:hover .th-cta-icon { transform: none !important; }
    .th-earth-skeleton { animation: none !important; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* PRINT                                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media print {
    .th-scene { background: white; min-height: auto; padding: 20px; }
    .th-earth-container, .th-text-atmosphere, .th-badge, .th-cta { display: none !important; }
    .th-heading, .th-subtitle { color: black !important; text-shadow: none !important; }
    .th-heading-gold { -webkit-text-fill-color: black !important; color: black !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════════════════════
const PremiumBadge = memo(({ label }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div variants={badgeVariants} initial="hidden" animate="visible" whileHover={prefersReducedMotion ? undefined : "hover"} whileTap={prefersReducedMotion ? undefined : "tap"}>
      <span className="th-badge" role="status" aria-label={label}>
        <span className="th-badge-star" aria-hidden="true"><Star size={11} color={TOKENS.goldLight} fill={TOKENS.goldLight} /></span>
        <span className="th-badge-label">{label}</span>
      </span>
    </motion.div>
  );
});
PremiumBadge.displayName = "PremiumBadge";

const CTAGroup = memo(({ ctaText, ctaMicrocopy, onCtaClick }) => {
  const prefersReducedMotion = useReducedMotion();
  const handleClick = useCallback((e) => { e.preventDefault(); onCtaClick?.(e); }, [onCtaClick]);
  const handleKeyDown = useCallback((e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCtaClick?.(e); } }, [onCtaClick]);

  return (
    <motion.div className="th-cta-group" variants={ctaVariants} role="group" aria-label="Call to action">
      <motion.button className="th-cta" onClick={handleClick} onKeyDown={handleKeyDown} whileHover={prefersReducedMotion ? undefined : "hover"} whileTap={prefersReducedMotion ? undefined : "tap"} variants={ctaVariants} aria-label={ctaText} type="button">
        <span className="th-cta-label">{ctaText}</span>
        <span className="th-cta-icon" aria-hidden="true"><ArrowRight size={18} /></span>
      </motion.button>
      {ctaMicrocopy && <motion.span className="th-cta-microcopy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>{ctaMicrocopy}</motion.span>}
    </motion.div>
  );
});
CTAGroup.displayName = "CTAGroup";

// ══════════════════════════════════════════════════════════════════════════
// Main Hero Section Component
// ══════════════════════════════════════════════════════════════════════════
const TravelHeroSection = memo(function TravelHeroSection({
  badge = "Luxury Travel Experiences",
  title = "Your Gateway to the World",
  subtitle = "Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence.",
  onCtaClick,
  ctaText = "Begin Your Journey",
  ctaMicrocopy = "No fees to start · Free consultation",
}) {
  const prefersReducedMotion = useReducedMotion();

  const headingContent = useMemo(() => {
    const gatewayMatch = title.match(/^(.*Gateway to)\s+(.+)$/i);
    if (gatewayMatch) return <>{gatewayMatch[1]}<br /><span className="th-heading-gold">{gatewayMatch[2]}</span></>;
    const words = title.split(" ");
    const last = words.pop();
    return <>{words.join(" ")} <span className="th-heading-gold">{last}</span></>;
  }, [title]);

  const animations = useMemo(() => ({
    container: prefersReducedMotion ? { hidden: {}, visible: {} } : containerVariants,
    fadeUp: prefersReducedMotion ? { hidden: {}, visible: {} } : fadeUpVariants,
  }), [prefersReducedMotion]);

  return (
    <>
      <style>{STYLES}</style>
      <section className="th-scene" role="banner" aria-label={`${title} - ${badge}`}>
        <a href="#main-content" className="th-skip-link">Skip to main content</a>
        <div className="th-earth-container">
          <Suspense fallback={<div className="th-earth-skeleton" aria-hidden="true" />}>
            <EarthScene mode="hero" />
          </Suspense>
        </div>
        <div className="th-text-atmosphere" aria-hidden="true" />
        <motion.div className="th-content" variants={animations.container} initial="hidden" animate="visible" id="main-content">
          <PremiumBadge label={badge} />
          <motion.h1 className="th-heading" variants={animations.fadeUp} aria-label={title}>{headingContent}</motion.h1>
          <motion.p className="th-subtitle" variants={animations.fadeUp}>{subtitle}</motion.p>
          {onCtaClick && <CTAGroup ctaText={ctaText} ctaMicrocopy={ctaMicrocopy} onCtaClick={onCtaClick} />}
        </motion.div>
      </section>
    </>
  );
});

TravelHeroSection.displayName = "TravelHeroSection";
export default TravelHeroSection;