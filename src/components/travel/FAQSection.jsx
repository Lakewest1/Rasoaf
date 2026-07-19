// src/components/travel/FAQSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — FAQ Accordion
// Luxury Gold + Charcoal Black · Minimal white background
// Strict Rasoaf Global Design System Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  { q: "How long does visa processing take?", a: "Visa processing times vary by country. Typically, tourist visas take 5-15 working days, while student and work visas may take 2-8 weeks depending on the embassy. Our team keeps you informed throughout the process." },
  { q: "Can you book flights to any destination?", a: "Yes, we partner with major airlines to offer competitive fares to destinations worldwide, including special rates for Hajj and Umrah flights. We cover Canada, USA, UK, UAE, Australia, and many more." },
  { q: "Do you provide hotel reservations?", a: "Absolutely. We offer hotel booking services ranging from budget-friendly options to 5-star luxury accommodations across the globe, tailored to your preferences and budget." },
  { q: "Can I pay in installments?", a: "Yes, we offer flexible installment payment plans for eligible bookings. Contact our team to discuss a payment schedule that works for you. We strive to make travel accessible." },
  { q: "Do you assist with travel insurance?", a: "Yes, we provide comprehensive travel insurance options covering medical emergencies, trip cancellations, lost baggage, and more. Your safety and peace of mind are our priority." },
  { q: "Are you a licensed travel agency?", a: "Yes, RASOAF Travels and Tours Limited is fully licensed and approved by NAHCON for Hajj and Umrah operations, and we are registered with relevant Nigerian authorities for all travel services." },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  :root {
    /* Rasoaf DS type families */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-h6-size: clamp(1rem, 1.3vw, 1.125rem);
    --rasoaf-body-normal: 1rem;
    --rasoaf-eyebrow-size: 0.8rem;

    /* Colors (per Rasoaf DS tokens) */
    --clr-primary-text: #111111;
    --clr-accent: #D4A017;
    --clr-accent-2: #B8860B;
    --clr-border: #E6D5A8;
    --clr-muted: #5F5F5F;
  }

  .faq-section {
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 60px);
    background: #FFF8E6;
    font-family: var(--rasoaf-body);
    position: relative; overflow: hidden;
  }
  .faq-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 80%, rgba(212,160,23,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  .faq-container { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
  .faq-header { margin-bottom: clamp(40px, 6vh, 56px); text-align: center; }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .faq-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 18px; background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.2); border-radius: 100px;
    font-family: var(--rasoaf-body);
    color: var(--clr-accent-2); font-size: var(--rasoaf-eyebrow-size); font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px;
    line-height: 1;
  }

  /* H2 — Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .faq-title {
    font-family: var(--rasoaf-display); font-weight: 800;
    font-size: var(--rasoaf-h2-size); color: var(--clr-primary-text);
    letter-spacing: -0.02em; line-height: 1.15; margin: 0;
  }
  .faq-title span {
    background: linear-gradient(135deg, #D4A017, #B8860B);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .faq-list { display: flex; flex-direction: column; gap: 10px; }
  .faq-item {
    background: #fff; border: 1px solid rgba(212,160,23,0.12);
    border-radius: 20px; overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(0,0,0,0.02);
  }
  .faq-item.open {
    border-color: rgba(212,160,23,0.3);
    box-shadow: 0 8px 32px rgba(0,0,0,0.04);
  }

  /* Question — Manrope 700, H6 scale, letter-spacing -0.01em (per DS heading rules) */
  .faq-question {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: clamp(18px, 2vw, 24px) clamp(20px, 2vw, 28px);
    background: none; border: none; cursor: pointer; color: var(--clr-primary-text);
    font-family: var(--rasoaf-display); font-size: var(--rasoaf-h6-size);
    font-weight: 700; letter-spacing: -0.01em; line-height: 1.3;
    text-align: left; gap: 12px;
  }
  .faq-question:focus-visible {
    outline: 2px solid var(--clr-accent);
    outline-offset: -2px;
    border-radius: 12px;
  }

  /* Answer — Inter 400, body-normal scale, line-height 1.7 (per DS body rules) */
  .faq-answer-inner {
    padding: 0 clamp(20px, 2vw, 28px) clamp(18px, 2vw, 24px);
    font-family: var(--rasoaf-body);
    font-size: var(--rasoaf-body-normal); font-weight: 400;
    color: var(--clr-muted); line-height: 1.7;
  }
  .faq-icon {
    transition: transform 0.3s ease; flex-shrink: 0;
    color: var(--clr-accent); width: 20px; height: 20px;
  }
  .faq-item.open .faq-icon { transform: rotate(180deg); }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .faq-item, .faq-icon, .faq-question { transition-duration: 0.01ms !important; }
  }

  @media (max-width: 600px) {
    .faq-list { gap: 8px; }
    .faq-item { border-radius: 16px; }
  }
`;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <style>{CSS}</style>
      <section className="faq-section" ref={ref} aria-label="Frequently asked questions">
        <div className="faq-container">
          <motion.div className="faq-header" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="faq-badge"><HelpCircle size={12} aria-hidden="true" /> FAQ</span>
            <h2 className="faq-title">Frequently Asked<br /><span>Questions</span></h2>
          </motion.div>
          <div className="faq-list">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <motion.div key={i} className={`faq-item ${isOpen ? "open" : ""}`} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.04 * i, duration: 0.4 }}>
                  <button
                    id={buttonId}
                    className="faq-question"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    type="button"
                  >
                    {faq.q}
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
                        transition={{ duration: 0.3 }}
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