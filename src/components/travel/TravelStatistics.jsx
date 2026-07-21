// src/components/travel/TravelStatistics.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Statistics Badges
// Luxury shield design · Gold-dominant · Icon rotate 360° · Slide-up reveal
// Always a single row of 4 — scales fluidly instead of stacking/carouseling.
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Globe, CheckCircle } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────
const stats = [
  {
    icon: Briefcase,
    value: 20,
    suffix: "+",
    label: "Years Experience",
    color: "#D4A017",
    description: "Industry Expertise",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Satisfied Travelers",
    color: "#F7C948",
    description: "Happy Clients",
  },
  {
    icon: Globe,
    value: 60,
    suffix: "+",
    label: "Countries",
    color: "#D4A017",
    description: "Global Reach",
  },
  {
    icon: CheckCircle,
    value: 98,
    suffix: "%",
    label: "Visa Success Rate",
    color: "#D4A017",
    description: "Proven Results",
  },
];

// ── AnimatedNumber (preserved) ──────────────────────────────────────────
function AnimatedNumber({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf;
    const duration = 2400;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOutExpo * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
}

// ── Design Tokens ───────────────────────────────────────────────────────
const tokens = {
  display: "'Manrope', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFF8E6",
  creamWarm: "#FFFDF8",
  charcoal: "#0B0F17",
  charcoalLight: "#1B2230",
  textPrimary: "#0B0F17",
  textSecondary: "#5F5F5F",
  transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
};

// ── Premium CSS ─────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  :root {
    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-body-large: clamp(1rem, 1.1vw, 1.125rem);
    --rasoaf-eyebrow-size: 0.8rem;
  }

  .rts-section {
    position: relative;
    z-index: 10;
    padding: clamp(60px, 12vh, 130px) clamp(12px, 4vw, 80px);
    font-family: ${tokens.body};
    overflow: visible;
    background: #FFFFFF;
  }

  .rts-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── Section Header ── */
  .rts-header {
    text-align: center;
    margin-bottom: clamp(40px, 7vh, 72px);
  }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .rts-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 22px;
    background: rgba(11, 15, 23, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(11, 15, 23, 0.08);
    border-radius: 100px;
    color: ${tokens.charcoal};
    font-family: ${tokens.body};
    font-size: var(--rasoaf-eyebrow-size);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 22px;
    line-height: 1;
    transition: all 0.35s ease;
  }

  .rts-header-badge:hover {
    background: rgba(11, 15, 23, 0.08);
    border-color: rgba(212, 160, 23, 0.35);
    transform: translateY(-1px);
  }

  /* H2 — Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .rts-header-title {
    font-family: ${tokens.display};
    font-weight: 800;
    font-size: var(--rasoaf-h2-size);
    color: ${tokens.charcoal};
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 12px;
  }

  .rts-header-title-gradient {
    background: linear-gradient(135deg, ${tokens.goldLight} 0%, ${tokens.gold} 45%, ${tokens.goldDark} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 6px rgba(212, 160, 23, 0.25));
  }

  /* Subtitle — Inter 400, body-large scale, line-height 1.7 (per DS) */
  .rts-header-subtitle {
    font-family: ${tokens.body};
    font-size: var(--rasoaf-body-large);
    font-weight: 400;
    color: ${tokens.textSecondary};
    line-height: 1.7;
    max-width: 520px;
    margin: 0 auto;
  }

  /* ══════════════════════════════════════════════════════════════════
     GRID — always a single row of 4. Every size below is a fluid
     clamp() tied to viewport width rather than a fixed px value, so the
     row shrinks continuously from desktop down to small phones instead
     of wrapping to 2 columns or swapping to a carousel.
  ══════════════════════════════════════════════════════════════════ */
  .rts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(6px, 1.6vw, 20px);
    max-width: 900px;
    margin: 0 auto;
  }

  /* ── Badge Card ── */
  .rts-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    cursor: default;
    position: relative;
    transition: transform ${tokens.transition};
  }

  .rts-badge:hover {
    transform: translateY(-6px);
  }

  /* ── Shield Top (Charcoal/Gold) ── */
  .rts-shield {
    position: relative;
    width: 100%;
    background: linear-gradient(175deg, ${tokens.charcoalLight} 0%, ${tokens.charcoal} 50%, #0A0F17 100%);
    border-radius: clamp(10px, 2.6vw, 22px) clamp(10px, 2.6vw, 22px) 4px 4px;
    padding: clamp(10px, 2.6vw, 40px) clamp(6px, 1.4vw, 22px) clamp(10px, 2.2vw, 34px);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 6px 24px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 0 0 1px rgba(212, 160, 23, 0.08);
    transition: all ${tokens.transition};
    z-index: 2;
    overflow: hidden;
  }

  /* Gold light sweep on hover */
  .rts-shield::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(212, 160, 23, 0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity ${tokens.transition};
    pointer-events: none;
  }

  .rts-badge:hover .rts-shield::before {
    opacity: 1;
  }

  /* Shield bottom notch — scales with the same fluid unit as the shield
     itself so it stays proportional instead of looking oversized on the
     smallest cards. */
  .rts-shield::after {
    content: '';
    position: absolute;
    bottom: calc(-1 * clamp(5px, 1.3vw, 12px));
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: clamp(6px, 1.5vw, 14px) solid transparent;
    border-right: clamp(6px, 1.5vw, 14px) solid transparent;
    border-top: clamp(5px, 1.3vw, 12px) solid #0A0F17;
    z-index: 1;
    transition: border-top-color ${tokens.transition};
  }

  .rts-badge:hover .rts-shield::after {
    border-top-color: ${tokens.charcoal};
  }

  .rts-badge:hover .rts-shield {
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(212, 160, 23, 0.2),
      0 0 40px rgba(212, 160, 23, 0.06);
  }

  /* ── Shield Icon — Pentagon Shape ── */
  .rts-shield-icon {
    width: clamp(34px, 9vw, 64px);
    height: clamp(34px, 9vw, 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.12), rgba(212, 160, 23, 0.04));
    border: 1.5px solid rgba(212, 160, 23, 0.2);
    transition: all ${tokens.transition};
    position: relative;
    z-index: 2;
    clip-path: polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%);
  }

  .rts-badge:hover .rts-shield-icon {
    transform: rotate(360deg) scale(1.1);
    border-color: ${tokens.gold};
    background: rgba(212, 160, 23, 0.18);
    box-shadow: 0 0 20px rgba(212, 160, 23, 0.35), 0 0 0 3px rgba(212, 160, 23, 0.04);
  }

  .rts-shield-icon svg {
    width: clamp(15px, 4vw, 30px) !important;
    height: clamp(15px, 4vw, 30px) !important;
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.2));
  }

  /* ── Bottom Cream Circle ── */
  .rts-badge-circle {
    width: 92%;
    background: linear-gradient(180deg, ${tokens.creamWarm} 0%, ${tokens.cream} 100%);
    border-radius: 0 0 50% 50% / 0 0 55% 55%;
    padding: clamp(8px, 2.2vw, 32px) clamp(4px, 1vw, 16px) clamp(8px, 1.8vw, 26px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(2px, 0.6vw, 5px);
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.07),
      0 0 0 1px rgba(212, 160, 23, 0.06);
    position: relative;
    z-index: 1;
    margin-top: -3px;
    transition: all ${tokens.transition};
    min-width: 0;
    max-width: 100%;
  }

  .rts-badge:hover .rts-badge-circle {
    box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(212, 160, 23, 0.14);
  }

  /* Label — sits above the number, matching the reference layout. Below
     the DS's 0.875rem caption floor by design at the smallest sizes —
     the DS doesn't define a scale for a single row of 4 shrunk this far,
     so this is a deliberate exception, not a miss. */
  .rts-badge-label {
    font-family: ${tokens.body};
    font-size: clamp(7.5px, 1.7vw, 13px);
    font-weight: 700;
    color: ${tokens.textPrimary};
    letter-spacing: clamp(0.01em, 0.3vw, 0.04em);
    text-transform: uppercase;
    text-align: center;
    line-height: 1.3;
    max-width: 100%;
    transition: color ${tokens.transition};
  }

  .rts-badge:hover .rts-badge-label {
    color: ${tokens.goldDark};
  }

  /* Number — the "hero" figure of each badge. */
  .rts-badge-number {
    font-family: ${tokens.display};
    font-weight: 800;
    font-size: clamp(1rem, 4.6vw, 2.5rem);
    background: linear-gradient(135deg, ${tokens.goldDark} 0%, ${tokens.gold} 40%, ${tokens.goldLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.02em;
    white-space: nowrap;
    transition: all ${tokens.transition};
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.2));
  }

  .rts-badge:hover .rts-badge-number {
    transform: scale(1.05);
    filter: drop-shadow(0 4px 12px rgba(212, 160, 23, 0.45));
  }

  .rts-header-badge:focus-visible {
    outline: 2px solid ${tokens.gold};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .rts-badge,
    .rts-badge * {
      transition: none !important;
    }
    .rts-shield-icon {
      transition: none !important;
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  Badge Card — Slides up on scroll, icon rotates 360° on hover
// ══════════════════════════════════════════════════════════════════════════
function BadgeCard({ stat, isInView, index }) {
  const Icon = stat.icon;
  return (
    <motion.div
      className="rts-badge"
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.12 * index,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Shield Top — Charcoal with gold accents. Icon only. */}
      <div className="rts-shield">
        <div className="rts-shield-icon">
          <Icon color={stat.color} strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>

      {/* Bottom Circle — Warm Cream. Label above the number. */}
      <div className="rts-badge-circle">
        <div className="rts-badge-label">{stat.label}</div>
        <div className="rts-badge-number">
          <AnimatedNumber target={stat.value} suffix={stat.suffix} isInView={isInView} />
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function TravelStatistics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{CSS}</style>

      <section className="rts-section" ref={sectionRef} aria-labelledby="stats-heading">
        <div className="rts-container">
          {/* Header */}
          <motion.div
            className="rts-header"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="rts-header-badge">Our Track Record</span>
            <h2 id="stats-heading" className="rts-header-title">
              Trusted by{" "}
              <span className="rts-header-title-gradient">Thousands</span>
            </h2>
            <p className="rts-header-subtitle">
              Numbers that speak for our commitment to excellence in travel services.
            </p>
          </motion.div>

          {/* Always a single row of 4 — fluidly scaled, never stacked */}
          <div className="rts-grid">
            {stats.map((stat, i) => (
              <BadgeCard key={i} stat={stat} isInView={isInView} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}