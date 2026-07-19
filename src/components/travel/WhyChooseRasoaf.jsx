// src/components/travel/WhyChooseRasoaf.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Why Choose Us
// Strict Rasoaf Typography · Refined Bento Grid · Premium Accessibility
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Shield, Zap, PiggyBank, Globe, Headphones, Award, Lock, Heart,
  ArrowUpRight
} from "lucide-react";

const REASONS = [
  { 
    icon: Globe, 
    title: "Worldwide Destinations", 
    desc: "Access 60+ countries across all continents. Canada, USA, UK, Australia, UAE, and more.",
    stat: "60+ Countries",
    size: "wide",
    color: "#D4A017"
  },
  { 
    icon: Shield, 
    title: "Trusted Experts", 
    desc: "Over 20 years of experience in travel and visa services with proven track record.",
    stat: "20+ Years",
    size: "normal",
    color: "#D4A017"
  },
  { 
    icon: Zap, 
    title: "Fast Processing", 
    desc: "Expedited visa and booking processing for urgent travel needs with priority service.",
    stat: "Quick Turnaround",
    size: "normal",
    color: "#D4A017"
  },
  { 
    icon: PiggyBank, 
    title: "Affordable Pricing", 
    desc: "Competitive rates with flexible payment options and no hidden fees.",
    stat: "Best Value",
    size: "tall",
    color: "#D4A017"
  },
  { 
    icon: Headphones, 
    title: "24/7 Support", 
    desc: "Round-the-clock customer care via phone, email, and WhatsApp.",
    stat: "Always Available",
    size: "normal",
    color: "#D4A017"
  },
  { 
    icon: Award, 
    title: "Certified Agency", 
    desc: "NAHCON approved and fully licensed by relevant authorities.",
    stat: "Fully Licensed",
    size: "normal",
    color: "#D4A017"
  },
  { 
    icon: Lock, 
    title: "Secure Payments", 
    desc: "Enterprise-grade security protecting your transactions and personal data.",
    stat: "Encrypted",
    size: "normal",
    color: "#D4A017"
  },
  { 
    icon: Heart, 
    title: "Customer First", 
    desc: "Personalized service prioritizing your satisfaction with dedicated support.",
    stat: "Top Rated",
    size: "normal",
    color: "#D4A017"
  },
];

const RasoafCSS = `
  /* ════════════════════════════════════════════════════════════════ */
  /* RASOAF DESIGN TOKENS */
  /* ════════════════════════════════════════════════════════════════ */

  :root {
    /* Color Palette */
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-white: #FFFFFF;
    --rasoaf-cream: #FFF8E6;
    --rasoaf-border: #E6D5A8;
    --rasoaf-text-primary: #111111;
    --rasoaf-text-secondary: #5F5F5F;
    --rasoaf-text-muted: #8B8B8B;

    /* Typography */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Spacing */
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;
    --spacing-3xl: 64px;

    /* Transitions */
    --transition-smooth: cubic-bezier(0.25, 1, 0.5, 1);
    --transition-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
    --shadow-gold: 0 4px 20px rgba(212, 160, 23, 0.15);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* SECTION STRUCTURE */
  /* ════════════════════════════════════════════════════════════════ */

  .rwc-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: transparent;
    position: relative;
    overflow: visible;
    z-index: 10;
  }

  /* Subtle overlay for text contrast */
  .rwc-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(0, 0, 0, 0.08) 50%,
      transparent 100%
    );
    pointer-events: none;
  }

  .rwc-container {
    max-width: 1120px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* HEADER — STRICT RASOAF TYPOGRAPHY */
  /* ════════════════════════════════════════════════════════════════ */

  .rwc-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
  }

  .rwc-eyebrow {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.7rem, 0.9vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rasoaf-gold-light);
    margin-bottom: var(--spacing-sm);
    display: block;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .rwc-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2.3rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--rasoaf-white);
    margin: 0;
    text-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .rwc-title-accent {
    background: linear-gradient(
      135deg,
      var(--rasoaf-gold-light) 0%,
      var(--rasoaf-gold-mid) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.3));
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* BENTO GRID */
  /* ════════════════════════════════════════════════════════════════ */

  .rwc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 240px;
    gap: clamp(12px, 1.8vw, 18px);
  }

  .rwc-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    padding: clamp(22px, 3vw, 28px);
    position: relative;
    overflow: hidden;
    transition: all 0.5s var(--transition-smooth);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    isolation: isolate;
  }

  /* Border gradient on hover */
  .rwc-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(212, 160, 23, 0.4),
      transparent 40%,
      transparent 60%,
      rgba(212, 160, 23, 0.2)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s var(--transition-smooth);
    pointer-events: none;
  }

  .rwc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
    border-color: rgba(212, 160, 23, 0.6);
  }

  .rwc-card:hover::before {
    opacity: 1;
  }

  .rwc-card.wide {
    grid-column: span 2;
  }

  .rwc-card.tall {
    grid-row: span 2;
  }

  /* ── Card Content ── */
  .rwc-card-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* ── Card Icon ── */
  .rwc-card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.1), rgba(247, 201, 72, 0.05));
    border: 1.5px solid rgba(212, 160, 23, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    transition: all 0.4s var(--transition-smooth);
    color: var(--rasoaf-gold-mid);
  }

  .rwc-card:hover .rwc-card-icon {
    transform: scale(1.12) rotate(-3deg);
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.15), rgba(247, 201, 72, 0.1));
    border-color: rgba(212, 160, 23, 0.4);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.15);
  }

  /* ── Card Title ── */
  .rwc-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .rwc-card-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(1.05rem, 1.2vw, 1.15rem);
    letter-spacing: -0.01em;
    line-height: 1.3;
    color: var(--rasoaf-text-primary);
    margin: 0;
    flex: 1;
    transition: color 0.3s var(--transition-out);
  }

  .rwc-card:hover .rwc-card-title {
    color: var(--rasoaf-gold-mid);
  }

  .rwc-card-arrow {
    opacity: 0;
    transform: translateX(-6px) translateY(-2px);
    transition: all 0.4s var(--transition-smooth);
    flex-shrink: 0;
    color: var(--rasoaf-gold-mid);
  }

  .rwc-card:hover .rwc-card-arrow {
    opacity: 1;
    transform: translateX(2px) translateY(-2px);
  }

  /* ── Card Description ── */
  .rwc-card-desc {
    font-family: var(--rasoaf-body);
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
    color: var(--rasoaf-text-secondary);
    margin: 0;
    flex: 1;
    transition: color 0.3s var(--transition-out);
  }

  .rwc-card:hover .rwc-card-desc {
    color: var(--rasoaf-text-primary);
  }

  /* ── Card Stat Badge ── */
  .rwc-card-stat {
    margin-top: auto;
    padding-top: var(--spacing-sm);
    border-top: 1px solid rgba(212, 160, 23, 0.15);
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-gold-dark);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.3s var(--transition-out);
  }

  .rwc-card:hover .rwc-card-stat {
    border-top-color: rgba(212, 160, 23, 0.3);
    color: var(--rasoaf-gold-mid);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE DESIGN */
  /* ════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .rwc-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 220px;
    }

    .rwc-card.wide {
      grid-column: span 2;
    }

    .rwc-card.tall {
      grid-row: span 1;
    }
  }

  @media (max-width: 768px) {
    .rwc-section {
      padding: clamp(48px, 8vh, 72px) 20px;
    }

    .rwc-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 200px;
      gap: 12px;
    }

    .rwc-card {
      padding: 20px;
      border-radius: 18px;
    }

    .rwc-card-icon {
      width: 40px;
      height: 40px;
      margin-bottom: var(--spacing-md);
    }

    .rwc-card-icon svg {
      width: 18px;
      height: 18px;
    }

    .rwc-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
    }

    .rwc-card-title {
      font-size: 1.05rem;
    }

    .rwc-card-desc {
      font-size: 0.85rem;
      line-height: 1.55;
    }
  }

  @media (max-width: 600px) {
    .rwc-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .rwc-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      gap: 12px;
    }

    .rwc-card {
      padding: 18px;
      border-radius: 16px;
      min-height: 160px;
    }

    .rwc-card.wide {
      grid-column: span 1;
    }

    .rwc-card.tall {
      grid-row: span 1;
    }

    .rwc-title {
      font-size: 1.6rem;
    }

    .rwc-eyebrow {
      font-size: 0.7rem;
    }

    .rwc-card-icon {
      width: 40px;
      height: 40px;
    }

    .rwc-card-title {
      font-size: 1rem;
    }

    .rwc-card-desc {
      font-size: 0.8rem;
    }

    .rwc-card-stat {
      font-size: 0.65rem;
      padding-top: 10px;
      margin-top: 10px;
    }
  }

  @media (max-width: 400px) {
    .rwc-section {
      padding: clamp(32px, 5vh, 48px) 12px;
    }

    .rwc-card {
      padding: 16px;
      border-radius: 14px;
    }

    .rwc-card-icon {
      width: 36px;
      height: 36px;
      margin-bottom: 12px;
    }

    .rwc-card-icon svg {
      width: 16px;
      height: 16px;
    }

    .rwc-title {
      font-size: 1.4rem;
    }

    .rwc-card-title {
      font-size: 0.95rem;
    }

    .rwc-card-desc {
      font-size: 0.75rem;
      line-height: 1.5;
    }
  }
`;

export default function WhyChooseRasoaf() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="rwc-section" ref={ref} aria-label="Why choose RASOAF travels">
        <div className="rwc-container">
          {/* Header */}
          <motion.div
            className="rwc-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="rwc-eyebrow">Our Advantages</span>
            <h2 className="rwc-title">
              Why Travel With <span className="rwc-title-accent">RASOAF</span>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            className="rwc-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
            aria-label="RASOAF benefits"
          >
            {REASONS.map((reason, idx) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={idx}
                  className={`rwc-card ${reason.size}`}
                  variants={itemVariants}
                  role="listitem"
                  aria-label={reason.title}
                  whileHover={{ y: -6 }}
                >
                  {/* Card Content */}
                  <div className="rwc-card-content">
                    {/* Icon */}
                    <div className="rwc-card-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>

                    {/* Title + Arrow */}
                    <div className="rwc-card-header">
                      <h3 className="rwc-card-title">{reason.title}</h3>
                      <ArrowUpRight size={14} className="rwc-card-arrow" />
                    </div>

                    {/* Description */}
                    <p className="rwc-card-desc">{reason.desc}</p>

                    {/* Stat Badge */}
                    <div className="rwc-card-stat">{reason.stat}</div>
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