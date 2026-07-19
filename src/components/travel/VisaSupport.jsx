// src/components/travel/VisaSupport.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Visa Support Timeline
// Strict Rasoaf Typography · Refined Palette · Intentional Motion · Accessible
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MessageCircle, FileText, Send, CheckCircle, Plane, ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  { 
    icon: MessageCircle, 
    title: "Consultation", 
    desc: "Discuss your travel goals with our expert consultants. We assess your needs and recommend the best visa pathway.",
    duration: "Day 1",
    step: "01"
  },
  { 
    icon: FileText, 
    title: "Documentation", 
    desc: "We guide you through preparing all required documents, ensuring everything meets embassy standards.",
    duration: "2–3 Days",
    step: "02"
  },
  { 
    icon: Send, 
    title: "Application", 
    desc: "Submit with confidence. Our team reviews everything before submission to minimize errors and maximize approval.",
    duration: "1–2 Days",
    step: "03"
  },
  { 
    icon: CheckCircle, 
    title: "Processing", 
    desc: "We monitor your application status and keep you informed with regular updates throughout the entire process.",
    duration: "Varies",
    step: "04"
  },
  { 
    icon: Plane, 
    title: "Travel Ready", 
    desc: "Receive your visa and prepare for departure with our pre-departure guidance, travel tips, and ongoing support.",
    duration: "Final Step",
    step: "05"
  },
];

const RasoafCSS = `
  /* ════════════════════════════════════════════════════════════════ */
  /* RASOAF DESIGN TOKENS & STRICT TYPOGRAPHY */
  /* ════════════════════════════════════════════════════════════════ */

  :root {
    /* Color Palette */
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-cream-bg: #FFF8E6;
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
    --spacing-3xl: 64px;
    --spacing-4xl: 80px;

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

  .rvs-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: linear-gradient(
      180deg,
      #FFFAF5 0%,
      #FFFDF8 50%,
      #FFF9F0 100%
    );
    position: relative;
    overflow: hidden;
  }

  /* Subtle atmospheric texture */
  .rvs-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(
        ellipse 800px 400px at 30% 20%,
        rgba(247, 201, 72, 0.04) 0%,
        transparent 50%
      ),
      radial-gradient(
        ellipse 600px 500px at 70% 80%,
        rgba(212, 160, 23, 0.03) 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  .rvs-container {
    max-width: 840px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* HEADER — STRICT RASOAF TYPOGRAPHY */
  /* ════════════════════════════════════════════════════════════════ */

  .rvs-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
  }

  .rvs-eyebrow {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.7rem, 0.9vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rasoaf-gold-mid);
    margin-bottom: var(--spacing-sm);
    display: block;
  }

  .rvs-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2.3rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--rasoaf-text-primary);
    margin: 0 0 var(--spacing-md) 0;
  }

  .rvs-title-accent {
    background: linear-gradient(
      135deg,
      var(--rasoaf-gold-light) 0%,
      var(--rasoaf-gold-mid) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rvs-subtitle {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--rasoaf-text-secondary);
    max-width: 520px;
    margin: 0 auto;
    letter-spacing: 0.005em;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* TIMELINE — SEMANTIC STRUCTURE */
  /* ════════════════════════════════════════════════════════════════ */

  .rvs-timeline {
    position: relative;
    padding-left: 56px;
  }

  /* Vertical connector line */
  .rvs-timeline::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      var(--rasoaf-gold-mid),
      var(--rasoaf-gold-light),
      rgba(212, 160, 23, 0.2)
    );
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* STEP CARDS — WHITE REFINED DESIGN */
  /* ════════════════════════════════════════════════════════════════ */

  .rvs-step {
    position: relative;
    margin-bottom: clamp(20px, 2.5vw, 28px);
    padding: clamp(22px, 3vw, 28px);
    background: var(--rasoaf-white);
    border: 1px solid var(--rasoaf-border);
    border-radius: 20px;
    transition: all 0.5s var(--transition-smooth);
    box-shadow: var(--shadow-md);
  }

  .rvs-step:hover {
    border-color: var(--rasoaf-gold-mid);
    box-shadow: var(--shadow-gold);
    transform: translateY(-4px);
  }

  .rvs-step:last-child {
    margin-bottom: 0;
  }

  /* ── Step Number Node ── */
  .rvs-step-icon-wrap {
    position: absolute;
    left: -52px;
    top: 26px;
    z-index: 3;
  }

  .rvs-step-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--rasoaf-cream-bg);
    border: 2px solid var(--rasoaf-gold-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.4s var(--transition-smooth);
    color: var(--rasoaf-gold-mid);
  }

  .rvs-step:hover .rvs-step-icon {
    transform: scale(1.1);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.25);
    background: var(--rasoaf-gold-light);
    color: var(--rasoaf-text-primary);
  }

  .rvs-step-number {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--rasoaf-gold-mid);
    color: var(--rasoaf-white);
    font-family: var(--rasoaf-body);
    font-size: 0.65rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  /* ── Step Content ── */
  .rvs-step-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .rvs-step-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(1.05rem, 1.3vw, 1.15rem);
    letter-spacing: -0.01em;
    line-height: 1.3;
    color: var(--rasoaf-text-primary);
    margin: 0;
    flex: 1;
    transition: color 0.3s var(--transition-out);
  }

  .rvs-step:hover .rvs-step-title {
    color: var(--rasoaf-gold-mid);
  }

  .rvs-step-duration {
    font-family: var(--rasoaf-body);
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--rasoaf-text-muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    transition: color 0.3s var(--transition-out);
  }

  .rvs-step:hover .rvs-step-duration {
    color: var(--rasoaf-gold-mid);
  }

  .rvs-step-desc {
    font-family: var(--rasoaf-body);
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.65;
    color: var(--rasoaf-text-secondary);
    margin: 0;
    transition: color 0.3s var(--transition-out);
  }

  .rvs-step:hover .rvs-step-desc {
    color: var(--rasoaf-text-primary);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* CTA BUTTON — RASOAF PRIMARY STYLE */
  /* ════════════════════════════════════════════════════════════════ */

  .rvs-cta {
    text-align: center;
    margin-top: clamp(40px, 6vh, 56px);
  }

  .rvs-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: 16px 36px;
    border-radius: 16px;
    border: none;
    cursor: pointer;
    font-family: var(--rasoaf-body);
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    color: var(--rasoaf-text-primary);
    background: linear-gradient(135deg, var(--rasoaf-gold-light), var(--rasoaf-gold-mid));
    box-shadow: var(--shadow-gold);
    transition: all 0.4s var(--transition-smooth);
    position: relative;
    overflow: hidden;
  }

  .rvs-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(212, 160, 23, 0.3);
  }

  .rvs-btn:active {
    transform: translateY(-1px);
  }

  .rvs-btn:focus-visible {
    outline: 2px solid var(--rasoaf-gold-mid);
    outline-offset: 3px;
  }

  .rvs-btn-arrow {
    transition: transform 0.3s var(--transition-out);
  }

  .rvs-btn:hover .rvs-btn-arrow {
    transform: translateX(4px);
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

  @media (max-width: 768px) {
    .rvs-section {
      padding: clamp(48px, 8vh, 72px) 20px;
    }

    .rvs-timeline {
      padding-left: 48px;
    }

    .rvs-timeline::before {
      left: 23px;
    }

    .rvs-step {
      padding: 20px;
      border-radius: 18px;
      margin-bottom: 20px;
    }

    .rvs-step-icon-wrap {
      left: -44px;
      top: 22px;
    }

    .rvs-step-icon {
      width: 40px;
      height: 40px;
    }

    .rvs-step-icon svg {
      width: 16px;
      height: 16px;
    }

    .rvs-step-number {
      width: 18px;
      height: 18px;
      font-size: 0.6rem;
      top: -4px;
      right: -4px;
    }

    .rvs-step-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
      margin-bottom: 8px;
    }

    .rvs-step-title {
      font-size: 1.05rem;
    }

    .rvs-step-desc {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    .rvs-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .rvs-timeline {
      padding-left: 40px;
    }

    .rvs-timeline::before {
      left: 19px;
    }

    .rvs-step {
      padding: 16px;
      border-radius: 16px;
      margin-bottom: 16px;
    }

    .rvs-step-icon-wrap {
      left: -36px;
      top: 18px;
    }

    .rvs-step-icon {
      width: 36px;
      height: 36px;
      border-width: 1.5px;
    }

    .rvs-step-icon svg {
      width: 14px;
      height: 14px;
    }

    .rvs-step-number {
      width: 16px;
      height: 16px;
      font-size: 0.55rem;
      top: -4px;
      right: -4px;
    }

    .rvs-header {
      margin-bottom: 40px;
    }

    .rvs-title {
      font-size: 1.8rem;
    }

    .rvs-step-title {
      font-size: 1rem;
    }

    .rvs-step-desc {
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .rvs-btn {
      width: 100%;
      justify-content: center;
      padding: 14px 24px;
      font-size: 0.9rem;
      border-radius: 14px;
    }

    .rvs-cta {
      margin-top: 40px;
    }
  }

  @media (max-width: 400px) {
    .rvs-timeline {
      padding-left: 34px;
    }

    .rvs-timeline::before {
      left: 16px;
    }

    .rvs-step-icon-wrap {
      left: -28px;
      top: 16px;
    }

    .rvs-step-icon {
      width: 32px;
      height: 32px;
      border-width: 1.5px;
    }

    .rvs-step-icon svg {
      width: 12px;
      height: 12px;
    }

    .rvs-step-number {
      width: 14px;
      height: 14px;
      font-size: 0.5rem;
    }

    .rvs-step {
      padding: 14px;
    }

    .rvs-eyebrow {
      font-size: 0.65rem;
    }

    .rvs-title {
      font-size: 1.5rem;
    }

    .rvs-subtitle {
      font-size: 0.9rem;
    }

    .rvs-step-title {
      font-size: 0.95rem;
    }

    .rvs-step-desc {
      font-size: 0.8rem;
    }
  }
`;

export default function VisaSupport() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleCTA = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/travel/contact"), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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

      <section className="rvs-section" ref={ref} aria-label="Visa application process">
        <div className="rvs-container">
          {/* Header */}
          <motion.div
            className="rvs-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="rvs-eyebrow">Step-by-step guidance</span>
            <h2 className="rvs-title">
              Your Visa <span className="rvs-title-accent">Journey</span>
            </h2>
            <p className="rvs-subtitle">
              A seamless process designed to make your visa application 
              stress-free and successful.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="rvs-timeline"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
            aria-label="Visa process steps"
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  className="rvs-step"
                  variants={itemVariants}
                  role="listitem"
                  aria-label={`Step ${idx + 1}: ${step.title}`}
                >
                  {/* Icon Node */}
                  <div className="rvs-step-icon-wrap" aria-hidden="true">
                    <div className="rvs-step-icon">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="rvs-step-number">{step.step}</div>
                  </div>

                  {/* Content */}
                  <div className="rvs-step-header">
                    <h3 className="rvs-step-title">{step.title}</h3>
                    <span className="rvs-step-duration">{step.duration}</span>
                  </div>
                  <p className="rvs-step-desc">{step.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="rvs-cta"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <button
              className="rvs-btn"
              onClick={handleCTA}
              aria-label="Start your visa journey by going to contact page"
            >
              <span>
                Start Your Journey
                <ArrowRight size={18} className="rvs-btn-arrow" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}