// src/components/travel/TestimonialsSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Testimonials
// Strict Rasoaf Global Design System Typography · Centered Header · Dark Luxury Aesthetic
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Satisfied Client",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "In 2023, I was introduced to RASOAF Travels and Tours Limited through a personal referral. Prior to meeting them, I had dealt with several travel agencies and unfortunately experienced disappointments. However, my experience with RASOAF was remarkably different. From the moment I engaged with their team, I received professional guidance, honest advice, and consistent support throughout my visa application process. Their dedication, transparency, and commitment restored my confidence and ultimately contributed to the success of my visa application.",
    rating: 5,
  },
  {
    name: "UK Visa Recipient",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "After experiencing disappointments with fraudulent agents over the years, I am grateful that my search for a reliable travel consultant ended in December 2024 when I engaged RASOAF Travels and Tours Limited. Their professionalism and expert guidance enabled me to secure my UK visa successfully. Since then, they have assisted me with multiple visa renewals, allowing me to travel freely to and from the United Kingdom. I highly commend their dedication, efficiency, and exceptional service.",
    rating: 5,
  },
  {
    name: "Frequent Traveler",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "With my experience in securing visas, I can confidently say that finding the right visa processing channel is not solely about publicity. Trust is a key factor that clients should carefully consider. I have seen trust, commitment, dedication, professionalism, and thorough scrutiny demonstrated by RASOAF Travels and Tours Limited throughout the visa processing journey. Their attention to detail gave me confidence in the process.",
    rating: 5,
  },
  {
    name: "Professional Client",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "Obtaining a visa through unprofessional individuals can be frustrating and may jeopardize an application. Having processed visas through RASOAF Travels and Tours Limited, I have come to appreciate their professionalism, expertise, structured workflow, sound immigration guidance, and systematic approach. Their commitment to providing accurate advice and ensuring compliance with immigration requirements has given me confidence and peace of mind throughout the process.",
    rating: 5,
  },
];

const RasoafCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');

  /* ════════════════════════════════════════════════════════════════ */
  /* RASOAF DESIGN TOKENS (Global Design System) */
  /* ════════════════════════════════════════════════════════════════ */

  :root {
    /* Color Palette */
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-white: #FFFFFF;
    --rasoaf-cream: #FFFDF8;
    --rasoaf-text-muted: rgba(255, 253, 248, 0.6);
    --rasoaf-text-dim: rgba(255, 253, 248, 0.4);

    /* Typography — strict Rasoaf DS type families */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Type scale (per Rasoaf Global Design System) */
    --rasoaf-h2-size: clamp(2.3rem, 5vw, 3.5rem);
    --rasoaf-h5-size: clamp(1.05rem, 1.4vw, 1.25rem);
    --rasoaf-body-large: clamp(1rem, 1.1vw, 1.125rem);
    --rasoaf-body-normal: 1rem;
    --rasoaf-caption-size: 0.875rem;
    --rasoaf-eyebrow-size: 0.8rem;

    /* Spacing */
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;

    /* Transitions */
    --transition-smooth: cubic-bezier(0.25, 1, 0.5, 1);
    --transition-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* SECTION STRUCTURE */
  /* ════════════════════════════════════════════════════════════════ */

  .tm-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: transparent;
    position: relative;
    overflow: hidden;
  }

  .tm-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* HEADER — STRICT RASOAF TYPOGRAPHY & CENTERED */
  /* ════════════════════════════════════════════════════════════════ */

  .tm-header {
    margin-bottom: clamp(48px, 7vh, 72px);
    text-align: center;
  }

  /* Eyebrow — Inter 700, uppercase, 0.8rem, letter-spacing 0.18em (per DS) */
  .tm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(212, 160, 23, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 160, 23, 0.25);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: var(--rasoaf-eyebrow-size);
    font-weight: 700;
    color: var(--rasoaf-gold-light);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0 auto var(--spacing-lg) auto;
    line-height: 1;
    transition: all 0.3s var(--transition-out);
  }

  .tm-eyebrow:hover {
    background: rgba(212, 160, 23, 0.15);
    border-color: rgba(212, 160, 23, 0.3);
  }

  /* H2 — Manrope 800, clamp(2.3rem,5vw,3.5rem), letter-spacing -0.02em, line-height 1.15 (per DS) */
  .tm-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: var(--rasoaf-h2-size);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--rasoaf-white);
    margin: 0;
  }

  .tm-title-accent {
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 50%, #B8860B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* TESTIMONIAL CARD */
  /* ════════════════════════════════════════════════════════════════ */

  .tm-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 28px;
    padding: clamp(28px, 4vw, 48px);
    position: relative;
    min-height: 280px;
    transition: all 0.5s var(--transition-smooth);
  }

  .tm-card:hover {
    border-color: rgba(212, 160, 23, 0.2);
    background: rgba(255, 255, 255, 0.05);
  }

  /* ── Quote Icon ── */
  .tm-quote-icon {
    color: var(--rasoaf-gold-light);
    opacity: 0.15;
    margin-bottom: var(--spacing-lg);
    transition: opacity 0.3s var(--transition-out);
    line-height: 0;
  }

  .tm-quote-icon svg {
    width: clamp(32px, 4vw, 48px);
    height: clamp(32px, 4vw, 48px);
  }

  .tm-card:hover .tm-quote-icon {
    opacity: 0.2;
  }

  /* ── Testimonial Text — Inter 400/500, body-large scale, line-height 1.7 (per DS) ── */
  .tm-text {
    font-family: var(--rasoaf-body);
    font-size: var(--rasoaf-body-large);
    font-weight: 400;
    line-height: 1.7;
    color: var(--rasoaf-text-muted);
    margin: 0 0 var(--spacing-2xl) 0;
    font-style: italic;
    transition: color 0.3s var(--transition-out);
  }

  .tm-card:hover .tm-text {
    color: var(--rasoaf-cream);
  }

  /* ── Footer (Author + Stars) ── */
  .tm-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-lg);
  }

  /* ── Author Info ── */
  .tm-author {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    min-width: 0;
  }

  .tm-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(212, 160, 23, 0.12);
    border: 1px solid rgba(212, 160, 23, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
  }

  .tm-author-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  /* Name — Manrope 700, small-heading scale, letter-spacing -0.01em (per DS heading rules) */
  .tm-name {
    font-family: var(--rasoaf-display);
    font-weight: 700;
    font-size: var(--rasoaf-h5-size);
    line-height: 1.25;
    color: var(--rasoaf-white);
    margin: 0;
    letter-spacing: -0.01em;
  }

  /* Country — Inter 500 caption scale, uppercase, letter-spacing 0.05em (per DS captions) */
  .tm-country {
    font-family: var(--rasoaf-body);
    font-size: var(--rasoaf-caption-size);
    font-weight: 500;
    color: var(--rasoaf-text-dim);
    margin: 3px 0 0 0;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1.4;
  }

  /* ── Star Rating ── */
  .tm-stars {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
  }

  .tm-star {
    color: var(--rasoaf-gold-light);
    transition: transform 0.3s var(--transition-out);
  }

  .tm-card:hover .tm-star {
    transform: scale(1.05);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* NAVIGATION */
  /* ════════════════════════════════════════════════════════════════ */

  .tm-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-2xl);
  }

  .tm-nav-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--rasoaf-text-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--transition-smooth);
  }

  .tm-nav-btn:hover {
    background: rgba(212, 160, 23, 0.12);
    border-color: rgba(212, 160, 23, 0.3);
    color: var(--rasoaf-gold-light);
  }

  .tm-nav-btn:focus-visible {
    outline: 2px solid var(--rasoaf-gold-light);
    outline-offset: 2px;
  }

  /* ── Dots ── */
  .tm-dots {
    display: flex;
    gap: 8px;
  }

  .tm-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.12);
    border: none;
    transition: all 0.3s var(--transition-smooth);
    padding: 0;
  }

  .tm-dot:hover {
    background: rgba(212, 160, 23, 0.3);
  }

  .tm-dot:focus-visible {
    outline: 2px solid var(--rasoaf-gold-light);
    outline-offset: 2px;
  }

  .tm-dot.active {
    background: var(--rasoaf-gold-light);
    transform: scale(1.3);
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
  /* Type sizes are fluid via clamp() in the variables above, so no    */
  /* breakpoint overrides are needed for font-size — only spacing and  */
  /* layout adjust here, avoiding specificity fights with the tokens.  */
  /* ════════════════════════════════════════════════════════════════ */

  @media (max-width: 768px) {
    .tm-section {
      padding: clamp(48px, 8vh, 72px) 20px;
    }

    .tm-card {
      padding: 24px;
      min-height: 240px;
    }

    .tm-footer {
      gap: var(--spacing-md);
    }
  }

  @media (max-width: 600px) {
    .tm-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .tm-card {
      padding: 20px;
      min-height: 200px;
    }

    .tm-text {
      margin-bottom: var(--spacing-lg);
    }

    .tm-footer {
      flex-direction: column;
      align-items: flex-start;
    }

    .tm-avatar {
      width: 44px;
      height: 44px;
      font-size: 20px;
    }

    .tm-nav {
      gap: var(--spacing-md);
    }

    .tm-dots {
      gap: 6px;
    }

    .tm-dot {
      width: 6px;
      height: 6px;
    }
  }

  @media (max-width: 400px) {
    .tm-section {
      padding: clamp(32px, 5vh, 48px) 12px;
    }

    .tm-card {
      padding: 16px;
    }

    .tm-nav-btn {
      width: 40px;
      height: 40px;
    }

    .tm-nav-btn svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handlePrev = () =>
    setCurrent((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));

  const handleNext = () =>
    setCurrent((p) => (p === TESTIMONIALS.length - 1 ? 0 : p + 1));

  const testimonial = TESTIMONIALS[current];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="tm-section" ref={ref} aria-label="Client testimonials">
        <div className="tm-container">
          {/* Header */}
          <motion.div
            className="tm-header"
            variants={headerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="tm-eyebrow">
              <Star size={12} />
              Testimonials
            </div>
            <h2 className="tm-title">
              What Our <span className="tm-title-accent">Clients Say</span>
            </h2>
          </motion.div>

          {/* Testimonial Card Carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="tm-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Quote Icon */}
              <div className="tm-quote-icon" aria-hidden="true">
                <Quote size={48} />
              </div>

              {/* Testimonial Text */}
              <p className="tm-text">&ldquo;{testimonial.text}&rdquo;</p>

              {/* Footer: Author + Rating */}
              <div className="tm-footer">
                <div className="tm-author">
                  <div className="tm-avatar" aria-hidden="true">{testimonial.flag}</div>
                  <div className="tm-author-text">
                    <h3 className="tm-name">{testimonial.name}</h3>
                    <p className="tm-country">{testimonial.country}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="tm-stars" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="tm-star"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="tm-nav">
            <button
              className="tm-nav-btn"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="tm-dots">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  className={`tm-dot ${idx === current ? "active" : ""}`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-current={idx === current ? "true" : "false"}
                  type="button"
                />
              ))}
            </div>

            <button
              className="tm-nav-btn"
              onClick={handleNext}
              aria-label="Next testimonial"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}