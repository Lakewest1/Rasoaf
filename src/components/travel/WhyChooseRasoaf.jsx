// src/components/travel/WhyChooseRasoaf.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Why Choose Us
// Square to circle icon transition · Transparent overlay · Stars rating
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Shield, Zap, PiggyBank, Globe, Headphones, Award, Lock, Heart,
  ArrowUpRight, Sparkles, BadgeCheck, Star
} from "lucide-react";

const REASONS = [
  { 
    icon: Globe, 
    title: "Worldwide Destinations", 
    desc: "Access 60+ countries across all continents. Canada, USA, UK, Australia, UAE, and more.",
    stat: "60+ Countries",
    metric: "4.9/5 Rating",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Shield, 
    title: "Trusted Experts", 
    desc: "Over 20 years of experience in travel and visa services with proven track record.",
    stat: "20+ Years",
    metric: "15K+ Visas",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Zap, 
    title: "Fast Processing", 
    desc: "Expedited visa and booking processing for urgent travel needs with priority service.",
    stat: "Quick Turnaround",
    metric: "98% Approval",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: PiggyBank, 
    title: "Affordable Pricing", 
    desc: "Competitive rates with flexible payment options and no hidden fees.",
    stat: "Best Value",
    metric: "Price Match",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Headphones, 
    title: "24/7 Support", 
    desc: "Round-the-clock customer care via phone, email, and WhatsApp.",
    stat: "Always Available",
    metric: "Instant Response",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Award, 
    title: "Certified Agency", 
    desc: "NAHCON approved and fully licensed by relevant authorities.",
    stat: "Fully Licensed",
    metric: "Government Approved",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Lock, 
    title: "Secure Payments", 
    desc: "Enterprise-grade security protecting your transactions and personal data.",
    stat: "Encrypted",
    metric: "256-bit SSL",
    stars: 5,
    color: "#D4A017"
  },
  { 
    icon: Heart, 
    title: "Customer First", 
    desc: "Personalized service prioritizing your satisfaction with dedicated support.",
    stat: "Top Rated",
    metric: "98% Satisfaction",
    stars: 5,
    color: "#D4A017"
  },
];

const RasoafCSS = `
  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RASOAF LUXURY DESIGN SYSTEM                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  :root {
    --gold-1: #D4A017;
    --gold-2: #F7C948;
    --white: #FFFFFF;
    --bg-light: #F7F8FA;
    --navy-dark: #0D3C6E;
    --text-dark: #0A0F1A;
    --text-grey: #6B7280;
    --text-light: #9CA3AF;
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.04);
    --shadow-hover: 0 12px 48px rgba(0, 0, 0, 0.08);
    
    --font-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    
    --radius-card: 24px;
    --radius-icon: 16px;
    
    --transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
    --transition-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SECTION                                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-section {
    padding: clamp(80px, 12vh, 120px) clamp(16px, 5vw, 80px);
    background: var(--bg-light);
    position: relative;
    overflow: hidden;
    z-index: 10;
  }

  .rwc-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER                                                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 64px);
  }

  .rwc-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-1);
    margin-bottom: 16px;
  }

  .rwc-eyebrow svg {
    width: 14px;
    height: 14px;
    color: var(--gold-1);
  }

  .rwc-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--text-dark);
    margin: 0 0 16px 0;
  }

  .rwc-title-accent {
    background: linear-gradient(135deg, var(--gold-1) 0%, var(--gold-2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rwc-subtitle {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.1vw, 1.1rem);
    font-weight: 400;
    color: var(--text-grey);
    max-width: 540px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.01em;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GRID                                                                 */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* CARD                                                                 */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-card-wrapper {
    position: relative;
    background: var(--white);
    border-radius: var(--radius-card);
    padding: 32px 24px 28px;
    box-shadow: var(--shadow-card);
    transition: all 0.5s var(--transition-smooth);
    cursor: pointer;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    will-change: transform, box-shadow;
    overflow: hidden;
    isolation: isolate;
  }

  .rwc-card-wrapper::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-card);
    padding: 1px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.15), transparent 40%, transparent 60%, rgba(212, 160, 23, 0.08));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s var(--transition-smooth);
    z-index: 10;
  }

  .rwc-card-wrapper:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover), 0 0 0 1px rgba(212, 160, 23, 0.06);
  }

  .rwc-card-wrapper:hover::before {
    opacity: 1;
  }

  /* ── Icon Container ── */
  .rwc-icon-wrap {
    margin-bottom: 20px;
    flex-shrink: 0;
    position: relative;
  }

  .rwc-icon {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-icon);
    background: #F1F3F5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--navy-dark);
    transition: all 0.6s var(--transition-smooth);
    will-change: transform, border-radius, background;
    backface-visibility: hidden;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  .rwc-icon svg {
    width: 28px;
    height: 28px;
    stroke-width: 1.8;
    transition: color 0.4s var(--transition-smooth);
  }

  /* Hover: Square → Circle, Grey → White */
  .rwc-card-wrapper:hover .rwc-icon {
    border-radius: 50%;
    background: var(--white);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }

  .rwc-card-wrapper:hover .rwc-icon svg {
    color: var(--gold-1);
  }

  /* ── Title ── */
  .rwc-title-text {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 1.15rem;
    letter-spacing: -0.02em;
    line-height: 1.3;
    color: var(--text-dark);
    margin: 0 0 8px 0;
    position: relative;
    z-index: 5;
  }

  /* ── Description ── */
  .rwc-desc-text {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
    color: var(--text-grey);
    margin: 0 0 16px 0;
    flex: 1;
    position: relative;
    z-index: 5;
  }

  /* ── Stars Rating ── */
  .rwc-stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 12px;
    position: relative;
    z-index: 5;
  }

  .rwc-star {
    color: var(--gold-1);
    fill: var(--gold-1);
    width: 18px;
    height: 18px;
  }

  .rwc-star-empty {
    color: #E5E7EB;
    width: 18px;
    height: 18px;
  }

  /* ── Stat Badge ── */
  .rwc-stat-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    padding: 6px 14px;
    background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.08);
    border-radius: 9999px;
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--gold-1);
    position: relative;
    z-index: 5;
  }

  .rwc-stat-badge svg {
    width: 14px;
    height: 14px;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* OVERLAY - No Background, Pure Blur Only                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-overlay {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-radius: var(--radius-card);
    opacity: 0;
    transition: opacity 0.6s var(--transition-smooth);
    pointer-events: none;
    z-index: 4;
    will-change: opacity;
    /* No background - pure blur effect */
  }

  /* Subtle glass reflection on overlay */
  .rwc-overlay::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at 30% 20%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  .rwc-card-wrapper:hover .rwc-overlay {
    opacity: 1;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SLIDE-UP PANEL                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rwc-panel {
    position: absolute;
    bottom: 0;
    left: 4px;
    right: 4px;
    padding: 20px 20px 20px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-card);
    height: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    transition: transform 0.7s var(--transition-smooth);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.04);
    z-index: 6;
    pointer-events: none;
    will-change: transform;
    backface-visibility: hidden;
  }

  .rwc-card-wrapper:hover .rwc-panel {
    transform: translateY(0);
    pointer-events: auto;
  }

  /* ── Panel shine ── */
  .rwc-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: skewX(-25deg);
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .rwc-card-wrapper:hover .rwc-panel::before {
    left: 100%;
  }

  /* ── Panel highlight line ── */
  .rwc-panel::after {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.25),
      transparent
    );
    pointer-events: none;
  }

  /* ── Panel Stars ── */
  .rwc-panel-stars {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 12px;
  }

  .rwc-panel-stars .rwc-star {
    width: 22px;
    height: 22px;
  }

  .rwc-panel-stat {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--gold-1);
    margin: 0;
    line-height: 1.2;
  }

  .rwc-panel-label {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-grey);
    margin: 4px 0 0 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .rwc-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .rwc-card-wrapper {
      min-height: 260px;
      padding: 28px 20px 24px;
    }

    .rwc-panel {
      height: 58%;
      padding: 18px 16px 16px;
    }
  }

  @media (max-width: 768px) {
    .rwc-section {
      padding: clamp(56px, 8vh, 80px) 20px;
    }

    .rwc-grid {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .rwc-card-wrapper {
      min-height: 240px;
      padding: 24px 16px 20px;
      border-radius: 20px;
    }

    .rwc-icon {
      width: 56px;
      height: 56px;
    }

    .rwc-icon svg {
      width: 24px;
      height: 24px;
    }

    .rwc-title-text {
      font-size: 1rem;
    }

    .rwc-desc-text {
      font-size: 0.8rem;
    }

    .rwc-star {
      width: 16px;
      height: 16px;
    }

    .rwc-panel {
      height: 62%;
      padding: 16px 14px 14px;
      border-radius: 20px;
    }

    .rwc-panel-stars .rwc-star {
      width: 18px;
      height: 18px;
    }

    .rwc-panel-stat {
      font-size: 1rem;
    }

    .rwc-panel-label {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 600px) {
    .rwc-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .rwc-grid {
      grid-template-columns: 1fr;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }

    .rwc-card-wrapper {
      min-height: 220px;
      padding: 24px 20px 20px;
    }

    .rwc-title {
      font-size: 1.8rem;
    }

    .rwc-subtitle {
      font-size: 0.9rem;
    }

    .rwc-icon {
      width: 56px;
      height: 56px;
    }

    .rwc-icon svg {
      width: 24px;
      height: 24px;
    }

    .rwc-panel {
      height: 65%;
      padding: 16px;
    }

    .rwc-panel-stars .rwc-star {
      width: 18px;
      height: 18px;
    }

    .rwc-panel-stat {
      font-size: 1rem;
    }
  }

  @media (max-width: 380px) {
    .rwc-section {
      padding: 32px 12px;
    }

    .rwc-card-wrapper {
      padding: 20px 16px 16px;
      min-height: 200px;
    }

    .rwc-icon {
      width: 48px;
      height: 48px;
    }

    .rwc-icon svg {
      width: 20px;
      height: 20px;
    }

    .rwc-title-text {
      font-size: 0.9rem;
    }

    .rwc-desc-text {
      font-size: 0.75rem;
    }

    .rwc-star {
      width: 14px;
      height: 14px;
    }

    .rwc-panel {
      padding: 14px 12px 12px;
      height: 70%;
    }

    .rwc-panel-stars .rwc-star {
      width: 16px;
      height: 16px;
    }

    .rwc-panel-stat {
      font-size: 0.9rem;
    }

    .rwc-panel-label {
      font-size: 0.65rem;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .rwc-card-wrapper {
      transition: none !important;
    }

    .rwc-card-wrapper:hover {
      transform: none !important;
    }

    .rwc-icon {
      transition: none !important;
    }

    .rwc-card-wrapper:hover .rwc-icon {
      border-radius: var(--radius-icon) !important;
      background: #F1F3F5 !important;
      transform: none !important;
    }

    .rwc-overlay {
      transition: none !important;
    }

    .rwc-card-wrapper:hover .rwc-overlay {
      opacity: 0 !important;
    }

    .rwc-panel {
      transition: none !important;
    }

    .rwc-card-wrapper:hover .rwc-panel {
      transform: translateY(100%) !important;
    }

    .rwc-panel::before {
      display: none !important;
    }
  }

  /* ── Touch Device Support ── */
  @media (hover: none) {
    .rwc-card-wrapper .rwc-overlay {
      opacity: 0;
    }

    .rwc-card-wrapper .rwc-panel {
      transform: translateY(100%);
      pointer-events: none;
    }

    .rwc-card-wrapper.active .rwc-overlay {
      opacity: 1;
    }

    .rwc-card-wrapper.active .rwc-panel {
      transform: translateY(0);
      pointer-events: auto;
    }

    .rwc-card-wrapper.active .rwc-icon {
      border-radius: 50%;
      background: var(--white);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      transform: rotate(360deg) scale(1.08);
    }

    .rwc-card-wrapper.active .rwc-icon svg {
      color: var(--gold-1);
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════

export default function WhyChooseRasoaf() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia('(hover: none)').matches) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  }, [activeIndex]);

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={i < count ? "rwc-star" : "rwc-star-empty"}
        fill={i < count ? "currentColor" : "none"}
      />
    ));
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section
        ref={ref}
        className="rwc-section"
        aria-label="Why choose RASOAF travels"
      >
        <div className="rwc-container">
          {/* ── Header ── */}
          <motion.div
            className="rwc-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rwc-eyebrow">
              <Sparkles size={12} />
              Trusted Since 2004
              <Sparkles size={12} />
            </div>
            <h2 className="rwc-title">
              Why Travel With{" "}
              <span className="rwc-title-accent">RASOAF</span>
            </h2>
            <p className="rwc-subtitle">
              Premium travel solutions crafted with precision, backed by decades
              of expertise, and delivered with unwavering dedication to your
              journey.
            </p>
          </motion.div>

          {/* ── Grid ── */}
          <motion.div
            className="rwc-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
          >
            {REASONS.map((reason, index) => {
              const Icon = reason.icon;
              const isHovered = hoveredIndex === index;
              const isActive = activeIndex === index;
              const isTouchDevice = window.matchMedia('(hover: none)').matches;

              return (
                <motion.div
                  key={index}
                  className={`rwc-card-wrapper ${isActive ? 'active' : ''}`}
                  variants={itemVariants}
                  role="listitem"
                  aria-label={reason.title}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleCardClick(index)}
                  whileHover={!isTouchDevice ? {
                    y: -6,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                  } : {}}
                >
                  {/* ── Base Card ── */}
                  <div className="rwc-icon-wrap">
                    <motion.div
                      className="rwc-icon"
                      animate={{
                        rotate: (isHovered || isActive) ? 360 : 0,
                        scale: (isHovered || isActive) ? 1.08 : 1,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Icon size={28} strokeWidth={1.8} />
                    </motion.div>
                  </div>

                  <h3 className="rwc-title-text">{reason.title}</h3>
                  <p className="rwc-desc-text">{reason.desc}</p>

                  {/* Stars */}
                  <div className="rwc-stars">
                    {renderStars(reason.stars)}
                  </div>

                  <div className="rwc-stat-badge">
                    <BadgeCheck size={14} />
                    {reason.stat}
                  </div>

                  {/* ── Pure Blur Overlay (No Background) ── */}
                  <div className="rwc-overlay" />

                  {/* ── Slide-Up Panel ── */}
                  <div className="rwc-panel">
                    <div className="rwc-panel-stars">
                      {renderStars(reason.stars)}
                    </div>
                    <p className="rwc-panel-stat">{reason.stat}</p>
                    <p className="rwc-panel-label">{reason.metric}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}