// src/components/travel/TestimonialsSection.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Testimonials
// Dual Card Auto-Slider · Speaker Point Shape · Modernized · Rasoaf Typography
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles, MessageCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Trusted by Travelers",
    country: "Worldwide",
    flag: "🌍",
    text: "Over the years, RASOAF Travels and Tours Limited has earned the trust of travelers from different backgrounds through professionalism, transparency, and consistent results. The experiences shared by our clients reflect the confidence they have placed in our services.",
    rating: 5,
  },
  {
    name: "Successful Visa Applicant",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "In 2023, I was introduced to RASOAF Travels and Tours Limited through a personal referral. Having previously experienced disappointments with several travel agencies, I was understandably skeptical. However, RASOAF completely changed my perspective with honest advice, professional guidance, and continuous support.",
    rating: 5,
  },
  {
    name: "United Kingdom Traveler",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "After years of disappointment with unreliable agents, my search for a trustworthy travel consultant finally ended in December 2024 when I engaged RASOAF Travels and Tours Limited. Their professionalism enabled me to secure my UK visa and multiple renewals since then.",
    rating: 5,
  },
  {
    name: "Frequent International Traveler",
    country: "Nigeria",
    flag: "🇳🇬",
    text: "My experience with RASOAF Travels and Tours Limited has been completely different from other agencies. Their structured workflow, immigration expertise, and systematic approach gave me confidence throughout the entire visa process. Every stage was handled with professionalism.",
    rating: 5,
  },
];

const RasoafCSS = `
  :root {
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-white: #FFFFFF;
    --rasoaf-text-muted: rgba(255, 253, 248, 0.68);
    --rasoaf-text-dim: rgba(255, 253, 248, 0.42);
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;
    --transition-smooth: cubic-bezier(.22,1,.36,1);
  }

  .tm-section {
    padding: clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow: hidden;
  }

  .tm-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%);
    pointer-events: none;
  }

  .tm-container { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

  /* Header */
  .tm-header { text-align: center; margin-bottom: clamp(36px, 5vh, 52px); }

  .tm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: rgba(212,160,23,0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--rasoaf-gold-light);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .tm-eyebrow:hover { background: rgba(212,160,23,0.15); border-color: rgba(212,160,23,0.3); }

  .tm-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--rasoaf-white);
    margin: 0;
    text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  }

  .tm-title-accent {
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 50%, #B8860B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 4px rgba(212,160,23,0.3));
  }

  /* ── Dual Card Grid ── */
  .tm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(14px, 2vw, 24px);
    margin-bottom: 28px;
  }

  /* ── Card ── */
  .tm-card {
    background: rgba(255,255,255,0.025);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 22px;
    padding: clamp(24px, 3vw, 36px);
    position: relative;
    transition: all 0.5s var(--transition-smooth);
    overflow: visible;
    display: flex;
    flex-direction: column;
  }

  .tm-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--rasoaf-gold-mid), transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .tm-card:hover {
    border-color: rgba(212,160,23,0.2);
    background: rgba(255,255,255,0.04);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.12);
  }

  .tm-card:hover::before { opacity: 1; }

  /* ── Speaker Point Speech Bubble ── */
  .tm-speech-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .tm-speech-bubble {
    position: relative;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    padding: clamp(16px, 2.5vw, 24px);
    flex: 1;
    transition: all 0.3s ease;
  }

  .tm-card:hover .tm-speech-bubble {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.12);
  }

  /* Speaker Point Triangle */
  .tm-speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 28px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid rgba(255,255,255,0.04);
    transition: border-top-color 0.3s ease;
  }

  .tm-speech-bubble::before {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 27px;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top: 13px solid rgba(255,255,255,0.08);
    transition: border-top-color 0.3s ease;
  }

  .tm-card:hover .tm-speech-bubble::after {
    border-top-color: rgba(255,255,255,0.06);
  }

  .tm-card:hover .tm-speech-bubble::before {
    border-top-color: rgba(255,255,255,0.12);
  }

  /* Quote text */
  .tm-text {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.82rem, 0.95vw, 0.92rem);
    font-weight: 400;
    line-height: 1.65;
    color: var(--rasoaf-text-muted);
    margin: 0;
    letter-spacing: 0.005em;
    transition: color 0.3s ease;
  }

  .tm-card:hover .tm-text { color: rgba(255,255,255,0.8); }

  /* Footer */
  .tm-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .tm-author { display: flex; align-items: center; gap: 10px; min-width: 0; }

  .tm-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .tm-card:hover .tm-avatar { border-color: rgba(212,160,23,0.35); transform: scale(1.05); }

  .tm-author-text { display: flex; flex-direction: column; min-width: 0; }

  .tm-name {
    font-family: var(--rasoaf-display);
    font-weight: 700;
    font-size: clamp(0.9rem, 1.05vw, 1rem);
    line-height: 1.25;
    color: var(--rasoaf-white);
    margin: 0;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tm-country {
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--rasoaf-text-dim);
    margin: 1px 0 0 0;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* Stars */
  .tm-stars { display: flex; gap: 2px; flex-shrink: 0; }

  .tm-star {
    color: var(--rasoaf-gold-light);
    transition: transform 0.3s ease;
  }

  .tm-card:hover .tm-star { transform: scale(1.05); }

  /* ── Navigation ── */
  .tm-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }

  .tm-nav-btn {
    width: 40px; height: 40px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--rasoaf-text-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--transition-smooth);
  }

  .tm-nav-btn:hover {
    background: rgba(212,160,23,0.15);
    border-color: rgba(212,160,23,0.35);
    color: var(--rasoaf-gold-light);
  }

  .tm-nav-btn:focus-visible { outline: 2px solid var(--rasoaf-gold-light); outline-offset: 2px; }

  .tm-dots { display: flex; gap: 7px; }

  .tm-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    cursor: pointer;
    background: rgba(255,255,255,0.15);
    border: none;
    transition: all 0.3s var(--transition-smooth);
    padding: 0;
  }

  .tm-dot:hover { background: rgba(212,160,23,0.35); }
  .tm-dot.active { background: var(--rasoaf-gold-light); width: 20px; }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .tm-section { padding: clamp(40px, 6vh, 60px) 20px; }
    .tm-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .tm-card { padding: 20px; }
    .tm-speech-bubble { padding: 14px; }
  }

  @media (max-width: 600px) {
    .tm-section { padding: clamp(32px, 5vh, 48px) 16px; }
    .tm-grid { grid-template-columns: 1fr; gap: 12px; }
    .tm-card { padding: 20px; }
    .tm-footer { flex-direction: column; align-items: flex-start; gap: 10px; }
    .tm-speech-bubble { padding: 14px; }
  }

  @media (max-width: 400px) {
    .tm-card { padding: 16px; }
    .tm-nav-btn { width: 36px; height: 36px; }
  }
`;

export default function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const pages = [];
  for (let i = 0; i < TESTIMONIALS.length; i += 2) {
    pages.push(TESTIMONIALS.slice(i, i + 2));
  }
  const totalPages = pages.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrentPage(prev => (prev + 1) % totalPages), 5000);
  }, [totalPages]);

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAutoplay]);

  const goTo = useCallback((i) => {
    setCurrentPage(((i % totalPages) + totalPages) % totalPages);
    startAutoplay();
  }, [totalPages, startAutoplay]);

  const handlePrev = () => goTo(currentPage - 1);
  const handleNext = () => goTo(currentPage + 1);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) handlePrev(); else if (diff < -50) handleNext();
    setTouchStart(null);
  };

  const currentTestimonials = pages[currentPage] || [];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [.22,1,.36,1] } }
  };

  const cardLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [.22,1,.36,1] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } }
  };

  const cardRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, delay: 0.08, ease: [.22,1,.36,1] } },
    exit: { opacity: 0, x: 30, transition: { duration: 0.3 } }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="tm-section" ref={ref} aria-label="Client testimonials">
        <div className="tm-container">
          <motion.div className="tm-header" variants={headerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div className="tm-eyebrow">
              <MessageCircle size={12} />
              Testimonials
              <Sparkles size={12} />
            </div>
            <h2 className="tm-title">
              What Our <span className="tm-title-accent">Clients Say</span>
            </h2>
          </motion.div>

          <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                className="tm-grid"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {currentTestimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    className="tm-card"
                    variants={idx === 0 ? cardLeft : cardRight}
                  >
                    {/* Speaker Point Speech Bubble */}
                    <div className="tm-speech-wrapper">
                      <div className="tm-speech-bubble">
                        <p className="tm-text">&ldquo;{testimonial.text}&rdquo;</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="tm-footer">
                      <div className="tm-author">
                        <div className="tm-avatar" aria-hidden="true">{testimonial.flag}</div>
                        <div className="tm-author-text">
                          <h3 className="tm-name">{testimonial.name}</h3>
                          <p className="tm-country">{testimonial.country}</p>
                        </div>
                      </div>

                      <div className="tm-stars" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={14} className="tm-star" fill="currentColor" aria-hidden="true" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tm-nav">
            <button className="tm-nav-btn" onClick={handlePrev} aria-label="Previous testimonials" type="button">
              <ChevronLeft size={18} />
            </button>
            <div className="tm-dots">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  className={`tm-dot ${idx === currentPage ? "active" : ""}`}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to testimonial page ${idx + 1}`}
                  aria-current={idx === currentPage ? "true" : "false"}
                  type="button"
                />
              ))}
            </div>
            <button className="tm-nav-btn" onClick={handleNext} aria-label="Next testimonials" type="button">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}