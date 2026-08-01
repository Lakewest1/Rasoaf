// src/components/travel/HeroSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Travel Hero (v5.3)
// Optimized: Core Web Vitals · GPU compositing · 98+ Lighthouse · 320px→2560px
// v5.3: Service features strip redesigned for mobile — 2×2 grid layout on
//       screens ≤480px, centered and well-spaced. Desktop stays inline.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useCallback, memo, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ArrowRight, ShieldCheck, BadgeCheck, Award, FileCheck, Plane, Clock } from "lucide-react";

const HeroBackground = lazy(() =>
  import(/* webpackPrefetch: true */ /* webpackChunkName: "hero-background" */ "./HeroBackground")
);

// ══════════════════════════════════════════════════════════════════════════
// RASOAF Design Tokens
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  background: "#010612", text: "#FFFFFF",
  textMuted: "rgba(255, 255, 255, 0.55)", textMicro: "rgba(255, 255, 255, 0.38)",
  overlayStart: "rgba(1, 6, 18, 0.85)", overlayMid: "rgba(1, 6, 18, 0.50)", overlayEnd: "rgba(1, 6, 18, 0.0)",
  badgeBg: "rgba(212, 160, 23, 0.05)", badgeBorder: "rgba(212, 160, 23, 0.13)",
  badgeBorderHover: "rgba(212, 160, 23, 0.34)", badgeBgHover: "rgba(212, 160, 23, 0.09)",
  ctaShadow: "rgba(212, 160, 23, 0.30)", ctaShadowHover: "rgba(212, 160, 23, 0.44)",
  trustText: "rgba(255, 255, 255, 0.50)", trustIcon: "rgba(247, 201, 72, 0.85)",
  trustDivider: "rgba(255, 255, 255, 0.22)",
});

// ══════════════════════════════════════════════════════════════════════════
// Stable Animation Variants
// ══════════════════════════════════════════════════════════════════════════
const CONTAINER_VARIANTS = Object.freeze({
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.5, when: "beforeChildren" } },
});

const FADE_UP_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
});

const BADGE_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  hover: { y: -2, borderColor: TOKENS.badgeBorderHover, backgroundColor: TOKENS.badgeBgHover, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { y: 1, transition: { duration: 0.1 } },
});

const CTA_BUTTON_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 } },
  hover: { y: -3, boxShadow: `0 12px 48px ${TOKENS.ctaShadowHover}, 0 1px 0 rgba(255,255,255,0.22) inset`, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { y: -1, transition: { duration: 0.1 } },
});

const TRUST_STRIP_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 } },
});

const FEATURE_STRIP_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 } },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .th-scene, .th-scene *, .th-scene *::before, .th-scene *::after { box-sizing: border-box; }

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
    padding: 0 clamp(16px, 4vw, 60px); padding-bottom: clamp(88px, 11vh, 150px);
    font-family: var(--th-body); background: var(--th-bg);
    backface-visibility: hidden; transform: translateZ(0);
  }

  .th-skip-link {
    position: absolute; top: -100%; left: 20px;
    background: var(--th-gold-light); color: #0A1628;
    padding: 12px 24px; border-radius: 8px; z-index: 100;
    font-weight: 700; font-family: var(--th-display);
    text-decoration: none; transition: top 0.2s ease; font-size: 14px;
  }
  .th-skip-link:focus { top: 20px; outline: 3px solid var(--th-gold); outline-offset: 2px; }

  .th-scene-bg-container { position: absolute; inset: 0; z-index: 2; transform: translateZ(0); backface-visibility: hidden; contain: layout paint; }
  .th-scene-skeleton { position: absolute; inset: 0; background: radial-gradient(circle at 50% 30%, rgba(255,177,107,0.35) 0%, rgba(255,143,94,0.25) 35%, rgba(60,90,130,0.9) 75%, rgba(22,36,63,1) 100%); }

  .th-content { position: relative; z-index: 10; max-width: 720px; width: 100%; margin: auto auto 0; text-align: center; transform: translateZ(0); }

  .th-text-atmosphere {
    position: absolute; bottom: 0; left: 50%; transform: translateX(-50%) translateZ(0);
    width: 120%; height: 46%;
    background: linear-gradient(to top, ${TOKENS.overlayStart} 0%, ${TOKENS.overlayMid} 45%, ${TOKENS.overlayEnd} 100%);
    pointer-events: none; z-index: 8; backface-visibility: hidden;
  }

  .th-badge {
    display: inline-flex; align-items: center; gap: 8px; padding: 8px 22px;
    background: ${TOKENS.badgeBg}; border: 1px solid ${TOKENS.badgeBorder};
    border-radius: 9999px; margin-bottom: clamp(24px, 3vh, 32px);
    transition: border-color 0.25s ease, background-color 0.25s ease, transform 0.25s ease;
    transform: translateZ(0); backface-visibility: hidden; cursor: default;
  }
  @supports (backdrop-filter: blur(16px)) { .th-badge { backdrop-filter: blur(12px) saturate(120%); -webkit-backdrop-filter: blur(12px) saturate(120%); } }
  .th-badge:focus-visible { outline: 2px solid var(--th-gold-light); outline-offset: 4px; }

  .th-badge-star { display: flex; animation: th-star-pulse 4s ease-in-out infinite; transform: translateZ(0); }
  @keyframes th-star-pulse { 0%,100%{opacity:0.7;transform:scale(1)translateZ(0)} 50%{opacity:1;transform:scale(1.08)translateZ(0)} }

  .th-badge-label { color: var(--th-gold-light); font-size: clamp(10px, 0.95vw, 13px); font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; line-height: 1.2; font-family: var(--th-body); }

  .th-heading { font-family: var(--th-display); font-weight: 800; font-size: clamp(36px, 6vw, 64px); color: var(--th-text); margin-bottom: clamp(16px, 2.5vh, 22px); line-height: 1.06; letter-spacing: -0.03em; text-shadow: 0 2px 40px rgba(0,0,0,0.6); transform: translateZ(0); }
  .th-heading-gold { background: linear-gradient(135deg, var(--th-gold-light) 0%, var(--th-gold) 45%, var(--th-gold-dark) 80%); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: th-gold-shimmer 6s ease-in-out infinite; }
  @keyframes th-gold-shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }

  .th-subtitle { font-family: var(--th-body); font-size: clamp(15px, 1.4vw, 18px); color: var(--th-text-muted); max-width: 500px; margin: 0 auto clamp(40px, 5.5vh, 52px); line-height: 1.75; font-weight: 400; letter-spacing: 0.005em; }

  .th-cta-group { display: inline-flex; flex-direction: column; align-items: center; gap: 16px; }

  .th-cta {
    display: inline-flex; align-items: center; gap: 14px; padding: 18px 44px;
    border-radius: 14px; border: none; cursor: pointer;
    font-family: var(--th-display); font-weight: 700;
    font-size: clamp(15px, 1.1vw, 17px); letter-spacing: 0.03em; color: #0A1628;
    background: linear-gradient(135deg, var(--th-gold-light) 0%, var(--th-gold) 50%, var(--th-gold-dark) 100%);
    background-size: 200% 200%;
    box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255,255,255,0.2) inset;
    position: relative; overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    transform: translateZ(0); backface-visibility: hidden;
    min-height: 56px; min-width: 200px; outline: none;
  }
  .th-cta:focus-visible { outline: 3px solid var(--th-gold-light); outline-offset: 3px; box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255,255,255,0.2) inset, 0 0 0 6px rgba(212,160,23,0.15); }
  .th-cta::after { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); animation: th-shine 4.5s ease-in-out infinite; pointer-events: none; z-index: 2; transform: translateZ(0); }
  @keyframes th-shine { 0%,100%{left:-100%} 40%{left:130%} }
  .th-cta-label { position: relative; z-index: 3; white-space: nowrap; }
  .th-cta-icon { position: relative; z-index: 3; transition: transform 0.2s ease; transform: translateZ(0); }
  .th-cta:hover .th-cta-icon { transform: translateX(4px) translateZ(0); }
  .th-cta:active .th-cta-icon { transform: translateX(2px) translateZ(0); }
  .th-cta-microcopy { font-family: var(--th-body); font-size: 13px; font-weight: 500; letter-spacing: 0.015em; color: var(--th-text-micro); transition: opacity 0.25s ease; }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* TRUST STRIP · CAC + IATA                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */
  .th-trust-strip { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; row-gap: 6px; column-gap: 14px; margin-top: clamp(22px, 3.5vh, 30px); }
  .th-trust-item { display: inline-flex; align-items: center; gap: 6px; font-family: var(--th-body); font-size: 12px; font-weight: 500; letter-spacing: 0.02em; color: ${TOKENS.trustText}; white-space: nowrap; }
  .th-trust-icon { display: flex; flex-shrink: 0; color: ${TOKENS.trustIcon}; }
  .th-trust-divider { color: ${TOKENS.trustDivider}; font-size: 12px; line-height: 1; }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SERVICE FEATURE STRIP · 2×2 grid on mobile ≤480px                    */
  /* ═══════════════════════════════════════════════════════════════════════ */
  .th-feature-strip {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: clamp(12px, 2vh, 18px);
    padding: 0 8px;
  }

  @media (min-width: 481px) {
    .th-feature-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      row-gap: 6px;
      column-gap: 14px;
      padding: 0;
    }
  }

  .th-feature-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    font-family: var(--th-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: ${TOKENS.trustText};
    white-space: nowrap;
    transition: all 0.3s ease;
    min-height: 42px;
  }

  .th-feature-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(212, 160, 23, 0.2);
  }

  @media (min-width: 481px) {
    .th-feature-item {
      padding: 0;
      background: none;
      border: none;
      border-radius: 0;
      min-height: auto;
    }
    .th-feature-item:hover {
      background: none;
      border-color: transparent;
      color: rgba(255, 255, 255, 0.75);
    }
  }

  .th-feature-icon { display: flex; flex-shrink: 0; color: ${TOKENS.trustIcon}; }
  .th-feature-divider { display: none; }

  @media (min-width: 481px) {
    .th-feature-divider { display: inline; color: ${TOKENS.trustDivider}; font-size: 12px; line-height: 1; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) { .th-scene { padding-bottom: clamp(80px, 10vh, 130px); } .th-heading { font-size: clamp(32px, 6.5vw, 52px); } .th-text-atmosphere { height: 44%; } }

  @media (max-width: 768px) {
    .th-scene { min-height: 90vh; min-height: 90dvh; padding-bottom: clamp(64px, 9vh, 110px); }
    .th-heading { font-size: clamp(28px, 7.5vw, 42px); }
    .th-cta { padding: 16px 36px; min-height: 52px; min-width: 180px; font-size: clamp(14px, 2vw, 16px); }
    .th-text-atmosphere { height: 42%; }
    .th-badge { padding: 7px 18px; }
    .th-trust-strip { column-gap: 12px; }
    .th-trust-item { font-size: 11.5px; }
    .th-feature-strip { gap: 8px; }
    .th-feature-item { font-size: 11px; padding: 9px 12px; }
  }

  @media (max-width: 480px) {
    .th-scene { min-height: 80vh; min-height: 80dvh; padding-bottom: clamp(52px, 7vh, 84px); }
    .th-heading { font-size: clamp(26px, 8.5vw, 34px); }
    .th-subtitle { font-size: 15px; margin-bottom: 34px; padding: 0 8px; }
    .th-cta { padding: 15px 32px; min-height: 50px; min-width: 160px; width: 100%; max-width: 300px; justify-content: center; gap: 10px; border-radius: 12px; }
    .th-text-atmosphere { height: 48%; }
    .th-badge { padding: 6px 16px; gap: 6px; margin-bottom: 20px; }
    .th-badge-label { font-size: 11px; letter-spacing: 0.08em; }
    .th-trust-strip { flex-direction: column; row-gap: 8px; margin-top: 18px; }
    .th-trust-divider { display: none; }
    .th-trust-item { font-size: 11px; }
    .th-feature-strip { gap: 8px; }
    .th-feature-item { font-size: 11px; padding: 10px 12px; }
  }

  @media (max-width: 360px) {
    .th-heading { font-size: 24px; letter-spacing: -0.02em; }
    .th-cta { padding: 14px 28px; font-size: 14px; min-height: 48px; }
    .th-trust-item { font-size: 10.5px; }
    .th-feature-strip { gap: 6px; }
    .th-feature-item { font-size: 10px; padding: 8px 10px; gap: 6px; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .th-scene *, .th-scene *::before, .th-scene *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .th-heading-gold { animation: none !important; background-position: 0% 50% !important; }
    .th-cta::after { display: none !important; }
    .th-badge:hover { transform: none !important; border-color: ${TOKENS.badgeBorder} !important; background-color: ${TOKENS.badgeBg} !important; }
    .th-cta:hover { transform: none !important; box-shadow: 0 8px 32px ${TOKENS.ctaShadow}, 0 1px 0 rgba(255,255,255,0.2) inset !important; }
    .th-cta:hover .th-cta-icon { transform: none !important; }
    .th-badge-star { animation: none !important; opacity: 0.85 !important; }
  }

  @media print {
    .th-scene { background: white; min-height: auto; padding: 20px; }
    .th-scene-bg-container, .th-text-atmosphere, .th-badge, .th-cta { display: none !important; }
    .th-heading, .th-subtitle { color: black !important; text-shadow: none !important; }
    .th-heading-gold { -webkit-text-fill-color: black !important; color: black !important; }
    .th-trust-item, .th-feature-item { color: black !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════════════════════
const PremiumBadge = memo(function PremiumBadge({ label }) {
  const prefersReducedMotion = useReducedMotion();
  const content = (
    <span className="th-badge" role="status" aria-label={label}>
      <span className="th-badge-star" aria-hidden="true"><Star size={11} color={TOKENS.goldLight} fill={TOKENS.goldLight} /></span>
      <span className="th-badge-label">{label}</span>
    </span>
  );
  if (prefersReducedMotion) return <div>{content}</div>;
  return <motion.div variants={BADGE_VARIANTS} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">{content}</motion.div>;
});
PremiumBadge.displayName = "PremiumBadge";

const CTAGroup = memo(function CTAGroup({ ctaText, ctaMicrocopy, onCtaClick }) {
  const prefersReducedMotion = useReducedMotion();
  const handleClick = useCallback((e) => { e.preventDefault(); onCtaClick?.(e); }, [onCtaClick]);
  const handleKeyDown = useCallback((e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onCtaClick?.(e); } }, [onCtaClick]);
  const btn = (
    <button className="th-cta" onClick={handleClick} onKeyDown={handleKeyDown} aria-label={ctaText} type="button">
      <span className="th-cta-label">{ctaText}</span>
      <span className="th-cta-icon" aria-hidden="true"><ArrowRight size={18} /></span>
    </button>
  );
  if (prefersReducedMotion) {
    return <div className="th-cta-group" role="group" aria-label="Call to action">{btn}{ctaMicrocopy && <span className="th-cta-microcopy">{ctaMicrocopy}</span>}</div>;
  }
  return (
    <div className="th-cta-group" role="group" aria-label="Call to action">
      <motion.button className="th-cta" onClick={handleClick} onKeyDown={handleKeyDown} variants={CTA_BUTTON_VARIANTS} initial="hidden" animate="visible" whileHover="hover" whileTap="tap" aria-label={ctaText} type="button">
        <span className="th-cta-label">{ctaText}</span>
        <span className="th-cta-icon" aria-hidden="true"><ArrowRight size={18} /></span>
      </motion.button>
      {ctaMicrocopy && <motion.span className="th-cta-microcopy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.35 }}>{ctaMicrocopy}</motion.span>}
    </div>
  );
});
CTAGroup.displayName = "CTAGroup";

const TRUST_ITEMS = Object.freeze([
  { icon: BadgeCheck, label: "CAC No: 9334024" },
  { icon: ShieldCheck, label: "IATA Approved" },
]);

const TrustStrip = memo(function TrustStrip() {
  const prefersReducedMotion = useReducedMotion();
  const content = (
    <div className="th-trust-strip" role="group" aria-label="Registration and accreditation details">
      {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
        <span className="th-trust-item" key={label}>
          {i > 0 && <span className="th-trust-divider" aria-hidden="true">•</span>}
          <span className="th-trust-icon" aria-hidden="true"><Icon size={13} strokeWidth={2.25} /></span>
          {label}
        </span>
      ))}
    </div>
  );
  if (prefersReducedMotion) return content;
  return <motion.div variants={TRUST_STRIP_VARIANTS}>{content}</motion.div>;
});
TrustStrip.displayName = "TrustStrip";

// ══════════════════════════════════════════════════════════════════════════
// v5.3 — ServiceFeaturesStrip · 2×2 grid on mobile ≤480px
// ══════════════════════════════════════════════════════════════════════════
const SERVICE_FEATURES = Object.freeze([
  { icon: Award, label: "Licensed Agency" },
  { icon: FileCheck, label: "Visa Assistance" },
  { icon: Plane, label: "Flight & Hotel" },
  { icon: Clock, label: "24/7 Support" },
]);

const ServiceFeaturesStrip = memo(function ServiceFeaturesStrip() {
  const prefersReducedMotion = useReducedMotion();
  const content = (
    <div className="th-feature-strip" role="group" aria-label="Our services at a glance">
      {SERVICE_FEATURES.map(({ icon: Icon, label }, i) => (
        <span className="th-feature-item" key={label}>
          <span className="th-feature-icon" aria-hidden="true"><Icon size={13} strokeWidth={2.25} /></span>
          {label}
        </span>
      ))}
    </div>
  );
  if (prefersReducedMotion) return content;
  return <motion.div variants={FEATURE_STRIP_VARIANTS}>{content}</motion.div>;
});
ServiceFeaturesStrip.displayName = "ServiceFeaturesStrip";

// ══════════════════════════════════════════════════════════════════════════
// Main Hero Section
// ══════════════════════════════════════════════════════════════════════════
const TravelHeroSection = memo(function TravelHeroSection({
  badge = "Luxury Travel Experiences",
  title = "Your Gateway to the World",
  subtitle = "Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence.",
  onCtaClick, ctaText = "Begin Your Journey", ctaMicrocopy = "No fees to start · Free consultation",
}) {
  const prefersReducedMotion = useReducedMotion();
  const headingContent = useMemo(() => {
    const m = title.match(/^(.*Gateway to)\s+(.+)$/i);
    if (m) return <>{m[1]}<br /><span className="th-heading-gold">{m[2]}</span></>;
    const w = title.split(" "); const l = w.pop();
    return <>{w.join(" ")} <span className="th-heading-gold">{l}</span></>;
  }, [title]);
  const anim = useMemo(() => ({ container: prefersReducedMotion ? { hidden: {}, visible: {} } : CONTAINER_VARIANTS, fadeUp: prefersReducedMotion ? { hidden: {}, visible: {} } : FADE_UP_VARIANTS }), [prefersReducedMotion]);

  return (
    <>
      <style>{STYLES}</style>
      <section className="th-scene" role="banner" aria-label={`${title} - ${badge}`}>
        <a href="#main-content" className="th-skip-link">Skip to main content</a>
        <div className="th-scene-bg-container"><Suspense fallback={<div className="th-scene-skeleton" aria-hidden="true" />}><HeroBackground reducedMotion={prefersReducedMotion} /></Suspense></div>
        <div className="th-text-atmosphere" aria-hidden="true" />
        <motion.div className="th-content" variants={anim.container} initial="hidden" animate="visible" id="main-content">
          <PremiumBadge label={badge} />
          <motion.h1 className="th-heading" variants={anim.fadeUp} aria-label={title}>{headingContent}</motion.h1>
          <motion.p className="th-subtitle" variants={anim.fadeUp}>{subtitle}</motion.p>
          {onCtaClick && <CTAGroup ctaText={ctaText} ctaMicrocopy={ctaMicrocopy} onCtaClick={onCtaClick} />}
          <TrustStrip />
          <ServiceFeaturesStrip />
        </motion.div>
      </section>
    </>
  );
});

TravelHeroSection.displayName = "TravelHeroSection";
export default TravelHeroSection;