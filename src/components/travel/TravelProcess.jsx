// src/components/travel/TravelProcess.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Process
// Strict Rasoaf Typography · Refined Card Grid · Intentional Motion
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Users, MapPin, Ticket, Plane, Star } from "lucide-react";

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Discover",
    desc: "Explore destinations and find the perfect travel experience for your needs.",
    step: "01"
  },
  {
    icon: Users,
    title: "Consult",
    desc: "Speak with our travel experts who provide personalized recommendations.",
    step: "02"
  },
  {
    icon: MapPin,
    title: "Plan",
    desc: "We design a customized itinerary tailored to your preferences and budget.",
    step: "03"
  },
  {
    icon: Ticket,
    title: "Book",
    desc: "Secure your flights, hotels, and activities with our seamless booking system.",
    step: "04"
  },
  {
    icon: Plane,
    title: "Travel",
    desc: "Embark on your journey with confidence, supported by our 24/7 assistance.",
    step: "05"
  },
  {
    icon: Star,
    title: "Enjoy",
    desc: "Create unforgettable memories with a stress-free, expertly managed trip.",
    step: "06"
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
    --rasoaf-cream-bg: #FFF8E6;
    --rasoaf-cream-light: #FFFDF5;
    --rasoaf-white: #FFFFFF;
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

  .tp-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  .tp-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* HEADER — STRICT RASOAF TYPOGRAPHY */
  /* ════════════════════════════════════════════════════════════════ */

  .tp-header {
    margin-bottom: clamp(48px, 7vh, 72px);
    text-align: center;
  }

  .tp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(212, 160, 23, 0.1);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-gold-dark);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 auto var(--spacing-lg) auto;
    transition: all 0.3s var(--transition-out);
  }

  .tp-eyebrow:hover {
    background: rgba(212, 160, 23, 0.15);
    border-color: rgba(212, 160, 23, 0.3);
  }

  .tp-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2.2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: #FFFFFF;
    margin: 0;
  }

  .tp-title-accent {
    background: linear-gradient(135deg, #D4A017 0%, #B8860B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* GRID */
  /* ════════════════════════════════════════════════════════════════ */

  .tp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: clamp(16px, 2.5vw, 24px);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* CARDS */
  /* ════════════════════════════════════════════════════════════════ */

  .tp-card {
    background: var(--rasoaf-white);
    border: 1px solid var(--rasoaf-border);
    border-radius: 22px;
    padding: clamp(24px, 3vw, 32px);
    position: relative;
    overflow: hidden;
    transition: all 0.5s var(--transition-smooth);
    box-shadow: var(--shadow-md);
  }

  /* Border gradient on hover */
  .tp-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 22px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(212, 160, 23, 0.3),
      transparent 40%,
      transparent 60%,
      rgba(212, 160, 23, 0.15)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s var(--transition-smooth);
    pointer-events: none;
  }

  .tp-card:hover {
    border-color: var(--rasoaf-gold-mid);
    transform: translateY(-6px);
    box-shadow: var(--shadow-gold);
  }

  .tp-card:hover::before {
    opacity: 1;
  }

  /* ── Step Number ── */
  .tp-step-number {
    position: absolute;
    top: 16px;
    right: 16px;
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2.5rem, 3vw, 3.5rem);
    letter-spacing: -0.02em;
    color: rgba(212, 160, 23, 0.08);
    line-height: 1;
    pointer-events: none;
  }

  /* ── Icon ── */
  .tp-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.08), rgba(247, 201, 72, 0.04));
    border: 1.5px solid rgba(212, 160, 23, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    transition: all 0.4s var(--transition-smooth);
    color: var(--rasoaf-gold-mid);
  }

  .tp-card:hover .tp-icon-wrap {
    transform: scale(1.1) rotate(-3deg);
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.12), rgba(247, 201, 72, 0.06));
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.12);
  }

  /* ── Title ── */
  .tp-card-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(1.05rem, 1.2vw, 1.15rem);
    letter-spacing: -0.01em;
    line-height: 1.3;
    color: var(--rasoaf-text-primary);
    margin: 0 0 var(--spacing-sm) 0;
    transition: color 0.3s var(--transition-out);
  }

  .tp-card:hover .tp-card-title {
    color: var(--rasoaf-gold-mid);
  }

  /* ── Description ── */
  .tp-card-desc {
    font-family: var(--rasoaf-body);
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.6;
    color: var(--rasoaf-text-secondary);
    margin: 0;
    transition: color 0.3s var(--transition-out);
  }

  .tp-card:hover .tp-card-desc {
    color: var(--rasoaf-text-primary);
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
    .tp-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .tp-section {
      padding: clamp(48px, 8vh, 72px) 20px;
    }

    .tp-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .tp-card {
      padding: 20px;
      border-radius: 20px;
    }

    .tp-title {
      font-size: clamp(1.6rem, 3.5vw, 2.4rem);
    }

    .tp-icon-wrap {
      width: 48px;
      height: 48px;
    }

    .tp-step-number {
      font-size: clamp(2rem, 2.5vw, 3rem);
    }
  }

  @media (max-width: 600px) {
    .tp-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .tp-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .tp-card {
      padding: 18px;
      border-radius: 18px;
    }

    .tp-card-title {
      font-size: 1rem;
    }

    .tp-card-desc {
      font-size: 0.8rem;
      line-height: 1.55;
    }

    .tp-icon-wrap {
      width: 44px;
      height: 44px;
      margin-bottom: var(--spacing-md);
    }

    .tp-icon-wrap svg {
      width: 18px;
      height: 18px;
    }

    .tp-step-number {
      font-size: clamp(1.6rem, 2vw, 2.2rem);
      top: 12px;
      right: 12px;
    }

    .tp-eyebrow {
      font-size: 0.65rem;
      padding: 5px 14px;
    }
  }

  @media (max-width: 400px) {
    .tp-section {
      padding: clamp(32px, 5vh, 48px) 12px;
    }

    .tp-card {
      padding: 16px;
    }

    .tp-title {
      font-size: 1.4rem;
    }

    .tp-card-title {
      font-size: 0.95rem;
    }

    .tp-card-desc {
      font-size: 0.75rem;
    }

    .tp-step-number {
      font-size: 1.4rem;
    }
  }
`;

export default function TravelProcess() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="tp-section" ref={ref} aria-label="Travel process steps">
        <div className="tp-container">
          {/* Header */}
          <motion.div
            className="tp-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="tp-eyebrow">
              <Plane size={12} />
              How It Works
            </div>
            <h2 className="tp-title">
              Your Travel <span className="tp-title-accent">Journey</span>
            </h2>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="tp-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
            aria-label="Travel process steps"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={idx}
                  className="tp-card"
                  variants={itemVariants}
                  role="listitem"
                  aria-label={`Step ${idx + 1}: ${step.title}`}
                >
                  {/* Step Number */}
                  <div className="tp-step-number">{step.step}</div>

                  {/* Icon */}
                  <div className="tp-icon-wrap">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="tp-card-title">{step.title}</h3>

                  {/* Description */}
                  <p className="tp-card-desc">{step.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}