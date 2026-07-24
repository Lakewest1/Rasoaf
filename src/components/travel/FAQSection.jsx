// src/components/travel/FAQSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — FAQ Accordion (v2)
// Luxury Gold + White · Premium accordion · Scroll reveal
// RASOAF Typography System · Perfectly responsive 320px → 2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

const faqs = Object.freeze([
  { q: "How long does visa processing take?", a: "Visa processing times vary by country. Typically, tourist visas take 5-15 working days, while student and work visas may take 2-8 weeks depending on the embassy. Our team keeps you informed throughout the process." },
  { q: "Can you book flights to any destination?", a: "Yes, we partner with major airlines to offer competitive fares to destinations worldwide, including special rates for Hajj and Umrah flights. We cover Canada, USA, UK, UAE, Australia, and many more." },
  { q: "Do you provide hotel reservations?", a: "Absolutely. We offer hotel booking services ranging from budget-friendly options to 5-star luxury accommodations across the globe, tailored to your preferences and budget." },
  { q: "Can I pay in installments?", a: "Yes, we offer flexible installment payment plans for eligible bookings. Contact our team to discuss a payment schedule that works for you. We strive to make travel accessible." },
  { q: "Do you assist with travel insurance?", a: "Yes, we provide comprehensive travel insurance options covering medical emergencies, trip cancellations, lost baggage, and more. Your safety and peace of mind are our priority." },
  { q: "Are you a licensed travel agency?", a: "Yes, RASOAF Travels and Tours Limited is fully licensed and approved by NAHCON for Hajj and Umrah operations, and we are registered with relevant Nigerian authorities for all travel services." },
]);

const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  cream: "#FFFDF8",
  textPrimary: "#0A0F1A",
  textSecondary: "#5F5F5F",
  textMuted: "#9CA3AF",
  borderLight: "rgba(212, 160, 23, 0.12)",
  borderMedium: "rgba(212, 160, 23, 0.25)",
  shadowCard: "0 2px 12px rgba(0, 0, 0, 0.02)",
  shadowHover: "0 8px 32px rgba(0, 0, 0, 0.06)",
  transition: "0.3s cubic-bezier(0.22, 1, 0.36, 1)",
  radiusLg: "20px",
  radiusMd: "16px",
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to .faq-section · RASOAF Typography
// ══════════════════════════════════════════════════════════════════════════
const CSS = `
  .faq-section,
  .faq-section *,
  .faq-section *::before,
  .faq-section *::after {
    box-sizing: border-box;
  }

  .faq-section {
    --faq-display: ${TOKENS.display};
    --faq-body: ${TOKENS.body};
    --faq-gold: ${TOKENS.gold};
    --faq-gold-light: ${TOKENS.goldLight};
    --faq-gold-dark: ${TOKENS.goldDark};
    --faq-white: ${TOKENS.white};
    --faq-cream: ${TOKENS.cream};
    --faq-text-primary: ${TOKENS.textPrimary};
    --faq-text-secondary: ${TOKENS.textSecondary};
    --faq-text-muted: ${TOKENS.textMuted};
    --faq-border-light: ${TOKENS.borderLight};
    --faq-border-medium: ${TOKENS.borderMedium};
    --faq-shadow-card: ${TOKENS.shadowCard};
    --faq-shadow-hover: ${TOKENS.shadowHover};
    --faq-transition: ${TOKENS.transition};
    --faq-radius-lg: ${TOKENS.radiusLg};
    --faq-radius-md: ${TOKENS.radiusMd};
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* SECTION · Premium Cream Background                                   */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .faq-section {
    width: 100%;
    max-width: 100vw;
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 60px);
    background: var(--faq-cream);
    font-family: var(--faq-body);
    position: relative;
    overflow-x: clip;
    overflow-y: visible;
    isolation: isolate;
    contain: layout paint style;
  }

  .faq-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 50% 80%, rgba(212, 160, 23, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 20%, rgba(247, 201, 72, 0.02) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  .faq-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · RASOAF Typography                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .faq-header {
    margin-bottom: clamp(40px, 6vh, 56px);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Badge: Inter 700 · uppercase · 0.15em letter-spacing */
  .faq-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
    background: rgba(212, 160, 23, 0.08);
    border: 1px solid rgba(212, 160, 23, 0.15);
    border-radius: 9999px;
    font-family: var(--faq-body);
    font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--faq-gold-dark);
    margin-bottom: 18px;
    transition: all 0.3s ease;
  }

  .faq-badge:hover {
    background: rgba(212, 160, 23, 0.12);
    border-color: rgba(212, 160, 23, 0.25);
    transform: translateY(-1px);
  }

  .faq-badge svg {
    color: var(--faq-gold);
    flex-shrink: 0;
  }

  /* Title: Manrope 800 · -0.02em letter-spacing */
  .faq-title {
    font-family: var(--faq-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--faq-text-primary);
    margin: 0;
    overflow-wrap: break-word;
  }

  .faq-title span {
    background: linear-gradient(135deg, var(--faq-gold) 0%, var(--faq-gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* FAQ LIST                                                             */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .faq-item {
    background: var(--faq-white);
    border: 1px solid var(--faq-border-light);
    border-radius: var(--faq-radius-lg);
    overflow: hidden;
    transition: all var(--faq-transition);
    box-shadow: var(--faq-shadow-card);
  }

  .faq-item.open {
    border-color: var(--faq-border-medium);
    box-shadow: var(--faq-shadow-hover);
  }

  /* Question button: Manrope 700 */
  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: clamp(18px, 2.5vw, 26px) clamp(20px, 3vw, 30px);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--faq-text-primary);
    font-family: var(--faq-display);
    font-size: clamp(1rem, 1.2vw, 1.1rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 1.35;
    text-align: left;
    gap: 14px;
    transition: color 0.3s ease;
    min-height: 60px;
  }

  .faq-question:hover {
    color: var(--faq-gold-dark);
  }

  .faq-question:focus-visible {
    outline: 2px solid var(--faq-gold);
    outline-offset: -2px;
    border-radius: 12px;
  }

  .faq-icon {
    transition: transform var(--faq-transition);
    flex-shrink: 0;
    color: var(--faq-gold);
    width: 22px;
    height: 22px;
  }

  .faq-item.open .faq-icon {
    transform: rotate(180deg);
    color: var(--faq-gold-dark);
  }

  /* Answer: Inter 400 */
  .faq-answer-inner {
    padding: 0 clamp(20px, 3vw, 30px) clamp(20px, 2.5vw, 26px);
    font-family: var(--faq-body);
    font-size: clamp(0.9rem, 1vw, 1rem);
    font-weight: 400;
    color: var(--faq-text-secondary);
    line-height: 1.7;
    letter-spacing: 0.005em;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                           */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 768px) {
    .faq-section { padding: clamp(48px, 7vh, 72px) 20px; }
    .faq-list { gap: 10px; }
  }

  @media (max-width: 600px) {
    .faq-section { padding: clamp(36px, 5vh, 52px) 16px; }
    .faq-list { gap: 8px; }
    .faq-item { border-radius: var(--faq-radius-md); }
    .faq-question { padding: 16px 18px; font-size: 0.95rem; }
    .faq-answer-inner { padding: 0 18px 16px; font-size: 0.88rem; }
  }

  @media (max-width: 400px) {
    .faq-section { padding: 28px 12px; }
    .faq-question { padding: 14px 16px; font-size: 0.9rem; gap: 10px; }
    .faq-answer-inner { padding: 0 16px 14px; font-size: 0.84rem; }
    .faq-badge { padding: 6px 14px; font-size: 0.62rem; }
    .faq-title { font-size: 1.5rem; }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* REDUCED MOTION                                                       */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (prefers-reduced-motion: reduce) {
    .faq-section,
    .faq-section *,
    .faq-section *::before,
    .faq-section *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* PRINT                                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media print {
    .faq-section { padding: 20px; background: white !important; }
    .faq-item { box-shadow: none !important; border: 1px solid #ddd !important; page-break-inside: avoid; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const toggleFaq = useCallback((index) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
  }), []);

  return (
    <>
      <style>{CSS}</style>
      <section className="faq-section" ref={sectionRef} aria-label="Frequently asked questions">
        <div className="faq-container">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="faq-header"
            variants={headerVariants}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <span className="faq-badge">
              <HelpCircle size={14} aria-hidden="true" />
              FAQ
              <Sparkles size={14} aria-hidden="true" />
            </span>
            <h2 className="faq-title">
              Frequently Asked<br /><span>Questions</span>
            </h2>
          </motion.div>

          {/* FAQ List */}
          <div className="faq-list" role="list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <motion.div
                  key={i}
                  className={`faq-item${isOpen ? " open" : ""}`}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate={sectionInView ? "visible" : "hidden"}
                  role="listitem"
                >
                  <button
                    id={buttonId}
                    className="faq-question"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className="faq-icon" aria-hidden="true" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        style={{ overflow: "hidden" }}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="faq-answer-inner">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}