// src/components/travel/Training.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Enterprise Training Services (v2.1)
// RASOAF Typography · Mobile carousel · Scroll reveal · Touch overlay
// GPU-accelerated · Perfectly responsive 320px → 2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useCallback, useMemo, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Globe, PenTool, Stethoscope, 
  ArrowUpRight, Sparkles, ChevronRight, ChevronLeft,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Constants
// ══════════════════════════════════════════════════════════════════════════
const trainingData = Object.freeze([
  {
    id: "ielts", title: "IELTS Coaching", icon: BookOpen,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop&crop=center",
    description: "International English Language Testing System preparation for study, work, and immigration.",
    route: "/travel/training/ielts", color: "#D4A017", bgColor: "#FFFDF5",
  },
  {
    id: "toefl", title: "TOEFL Coaching", icon: Globe,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center",
    description: "Test of English as a Foreign Language preparation for university admissions and scholarships.",
    route: "/travel/training/toefl", color: "#D4A017", bgColor: "#FFF8F0",
  },
  {
    id: "pte", title: "PTE Coaching", icon: PenTool,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&crop=center",
    description: "Pearson Test of English preparation for study, immigration, and professional registration.",
    route: "/travel/training/pte", color: "#D4A017", bgColor: "#FFFDF8",
  },
  {
    id: "oet", title: "OET Coaching", icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop&crop=center",
    description: "Occupational English Test preparation for healthcare professionals worldwide.",
    route: "/travel/training/oet", color: "#D4A017", bgColor: "#FFFAF2",
  },
]);

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
  white: "#FFFFFF", bgLight: "#F7F8FA",
  textDark: "#0A0F1A", textGrey: "#6B7280", textMuted: "#9CA3AF",
  shadowCard: "0 4px 20px rgba(0, 0, 0, 0.04)",
  shadowHover: "0 12px 48px rgba(0, 0, 0, 0.12)",
  transition: "cubic-bezier(0.22, 1, 0.36, 1)",
  radiusCard: "24px", radiusPill: "9999px",
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — Scoped to .training-section · RASOAF Typography
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .training-section,
  .training-section *,
  .training-section *::before,
  .training-section *::after { box-sizing: border-box; }

  .training-section {
    --trn-display: ${TOKENS.display}; --trn-body: ${TOKENS.body};
    --trn-gold: ${TOKENS.gold}; --trn-gold-light: ${TOKENS.goldLight}; --trn-gold-dark: ${TOKENS.goldDark};
    --trn-white: ${TOKENS.white}; --trn-bg-light: ${TOKENS.bgLight};
    --trn-text-dark: ${TOKENS.textDark}; --trn-text-grey: ${TOKENS.textGrey}; --trn-text-muted: ${TOKENS.textMuted};
    --trn-shadow-card: ${TOKENS.shadowCard}; --trn-shadow-hover: ${TOKENS.shadowHover};
    --trn-transition: ${TOKENS.transition};
    --trn-radius-card: ${TOKENS.radiusCard}; --trn-radius-pill: ${TOKENS.radiusPill};
  }

  .training-section {
    width: 100%; max-width: 100vw;
    padding: clamp(60px, 10vh, 120px) clamp(16px, 4vw, 80px);
    background: var(--trn-bg-light);
    position: relative; overflow-x: clip; overflow-y: visible;
    isolation: isolate; contain: layout paint style;
    font-family: var(--trn-body);
    transition: background-color 0.6s ease;
  }

  .training-container { max-width: 1400px; width: 100%; margin: 0 auto; position: relative; z-index: 2; }

  /* Header */
  .training-header { text-align: center; margin-bottom: clamp(48px, 7vh, 64px); }

  /* Eyebrow: Inter 700 */
  .training-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 8px 20px; background: rgba(212, 160, 23, 0.06);
    border: 1px solid rgba(212, 160, 23, 0.12); border-radius: var(--trn-radius-pill);
    font-family: var(--trn-body); font-size: clamp(0.65rem, 0.8vw, 0.75rem);
    font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--trn-gold); margin-bottom: 16px; white-space: nowrap;
  }

  .training-eyebrow svg { color: var(--trn-gold); flex-shrink: 0; }

  /* Title: Manrope 800 */
  .training-title {
    font-family: var(--trn-display); font-weight: 800;
    font-size: clamp(2rem, 5vw, 3.8rem); letter-spacing: -0.03em;
    line-height: 1.08; color: var(--trn-text-dark); margin: 0 0 16px 0;
    overflow-wrap: break-word;
  }

  .training-title-accent {
    background: linear-gradient(135deg, var(--trn-gold) 0%, var(--trn-gold-light) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Subtitle: Inter 400 */
  .training-subtitle {
    font-family: var(--trn-body); font-size: clamp(0.9rem, 1.15vw, 1.1rem);
    font-weight: 400; color: var(--trn-text-grey); max-width: 640px;
    margin: 0 auto; line-height: 1.7; letter-spacing: 0.005em;
    overflow-wrap: break-word;
  }

  /* Desktop Grid */
  .training-grid-wrapper { width: 100%; display: flex; justify-content: center; padding: 10px 0; }
  .training-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; width: 100%; max-width: 1280px; margin: 0 auto; }
  .training-card-reveal { width: 100%; min-width: 0; }

  /* Mobile Carousel */
  .training-carousel { display: none; }

  /* Card */
  .training-card {
    position: relative; border-radius: var(--trn-radius-card); overflow: hidden;
    background: var(--trn-white); box-shadow: var(--trn-shadow-card);
    transition: all 0.5s var(--trn-transition); cursor: pointer;
    height: 340px; will-change: transform, box-shadow; outline: none; width: 100%;
  }
  .training-card:focus-visible { outline: 2px solid var(--trn-gold); outline-offset: 3px; box-shadow: 0 0 0 4px rgba(212, 160, 23, 0.1), var(--trn-shadow-hover); }
  .training-card:hover { transform: translateY(-6px); box-shadow: var(--trn-shadow-hover); }

  .training-card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s var(--trn-transition); will-change: transform; }
  .training-card:hover .training-card-image { transform: scale(1.08); }
  .training-card.active .training-card-image { transform: scale(1.08); }

  /* Content overlay */
  .training-card-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 20px 20px; background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%); z-index: 2; pointer-events: none; }

  /* Card title: Manrope 800 */
  .training-card-title { font-family: var(--trn-display); font-weight: 800; font-size: 1.1rem; color: var(--trn-white); letter-spacing: -0.02em; line-height: 1.2; margin: 0 0 4px 0; }

  /* Card desc: Inter 400 */
  .training-card-desc { font-family: var(--trn-body); font-size: 0.8rem; font-weight: 400; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  /* Hover/Touch overlay */
  .training-card-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 20px 20px; background: rgba(10, 60, 110, 0.82); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--trn-radius-card); margin: 0 4px 4px; height: 55%; display: flex; flex-direction: column; justify-content: center; transform: translateY(100%); transition: transform 0.7s var(--trn-transition); z-index: 3; pointer-events: none; }
  .training-card:hover .training-card-overlay { transform: translateY(0); pointer-events: auto; }
  .training-card.active .training-card-overlay { transform: translateY(0); pointer-events: auto; }

  /* Overlay title: Manrope 800 */
  .training-overlay-title { font-family: var(--trn-display); font-weight: 800; font-size: 1.1rem; color: var(--trn-white); margin: 0 0 8px 0; letter-spacing: -0.02em; }

  /* Overlay desc: Inter 400 */
  .training-overlay-desc { font-family: var(--trn-body); font-size: 0.8rem; font-weight: 400; color: rgba(255, 255, 255, 0.85); line-height: 1.5; margin: 0 0 16px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

  /* Button: Inter 600 */
  .training-overlay-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: var(--trn-radius-pill); font-family: var(--trn-body); font-size: 0.75rem; font-weight: 600; color: var(--trn-white); cursor: pointer; transition: all 0.4s var(--trn-transition); width: fit-content; pointer-events: auto; position: relative; overflow: hidden; text-decoration: none; z-index: 5; }
  .training-overlay-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--trn-gold), var(--trn-gold-light)); opacity: 0; transition: opacity 0.4s ease; }
  .training-overlay-btn span { position: relative; z-index: 2; display: flex; align-items: center; gap: 4px; }
  .training-overlay-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3); border-color: rgba(212, 160, 23, 0.3); color: var(--trn-white); }
  .training-overlay-btn:hover::before { opacity: 1; }
  .training-overlay-btn:hover svg { transform: translateX(4px); }
  .training-overlay-btn svg { transition: transform 0.3s ease; }
  .training-overlay-btn:focus-visible { outline: 2px solid var(--trn-gold); outline-offset: 2px; }

  /* Tap hint */
  .training-tap-hint { display: none; position: absolute; top: 12px; right: 12px; z-index: 10; background: rgba(0, 0, 0, 0.5); color: white; font-family: var(--trn-body); font-size: 0.6rem; font-weight: 600; padding: 4px 10px; border-radius: var(--trn-radius-pill); letter-spacing: 0.05em; pointer-events: none; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE CAROUSEL STYLES                                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 768px) {
    .training-grid-wrapper { display: none; }
    .training-carousel {
      display: block; position: relative; width: 100%; max-width: 460px;
      margin: 0 auto; overflow: hidden; touch-action: pan-y;
      user-select: none; -webkit-user-select: none; padding: 10px 0;
    }
    .training-carousel-track { display: flex; will-change: transform; backface-visibility: hidden; transform: translate3d(0,0,0); align-items: stretch; }
    .training-carousel-slide { flex: 0 0 100%; min-width: 0; padding: 8px 20px; display: flex; }
    .training-carousel-slide > * { width: 100%; }

    .training-carousel-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 44px; height: 44px; border-radius: 50%; background: rgba(255,255,255,0.95); border: 1px solid rgba(212,160,23,0.25); color: var(--trn-gold); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 12px rgba(0,0,0,0.1); transition: all 0.3s ease; outline: none; }
    .training-carousel-arrow:hover { background: var(--trn-gold); color: white; border-color: var(--trn-gold); }
    .training-carousel-arrow:focus-visible { outline: 2px solid var(--trn-gold); outline-offset: 2px; }
    .training-carousel-arrow.prev { left: 2px; }
    .training-carousel-arrow.next { right: 2px; }

    .training-carousel-dots { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 22px; padding: 8px 0; }
    .training-carousel-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(0,0,0,0.12); cursor: pointer; padding: 0; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); outline: none; }
    .training-carousel-dot-active { width: 30px; border-radius: 5px; background: linear-gradient(135deg, var(--trn-gold-light), var(--trn-gold)); box-shadow: 0 2px 8px rgba(212,160,23,0.3); }
    .training-carousel-dot:focus-visible { outline: 2px solid var(--trn-gold); outline-offset: 3px; }
    .training-swipe-indicator { text-align: center; color: var(--trn-text-muted); font-family: var(--trn-body); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; margin-top: 10px; }
    .training-tap-hint { display: block; }
    .training-card { height: 340px; border-radius: 22px; }
    .training-card-overlay { border-radius: 22px; height: 58%; padding: 20px 18px; }
  }

  @media (max-width: 480px) {
    .training-section { padding: clamp(36px, 5vh, 52px) 12px; }
    .training-carousel { max-width: 400px; }
    .training-carousel-slide { padding: 6px 12px; }
    .training-card { height: 300px; }
    .training-card-overlay { height: 62%; padding: 16px 14px; }
    .training-card-content { padding: 18px 14px 14px; }
  }

  @media (max-width: 374px) {
    .training-section { padding: 28px 8px; }
    .training-carousel { max-width: 320px; }
    .training-carousel-slide { padding: 4px 8px; }
    .training-card { height: 270px; border-radius: 18px; }
    .training-card-overlay { border-radius: 18px; height: 65%; padding: 14px 12px; margin: 0 2px 2px; }
    .training-carousel-arrow { width: 36px; height: 36px; }
    .training-title { font-size: 1.3rem; }
  }

  /* Tablet: 2 columns */
  @media (max-width: 1024px) {
    .training-grid { grid-template-columns: repeat(2, 1fr); max-width: 720px; gap: 20px; }
    .training-card { height: 300px; }
  }

  @media (min-width: 1440px) {
    .training-container { max-width: 1400px; }
    .training-grid { max-width: 1300px; gap: 28px; }
    .training-card { height: 360px; }
  }

  @media (min-width: 1920px) {
    .training-container { max-width: 1600px; }
    .training-grid { max-width: 1500px; gap: 32px; }
    .training-card { height: 380px; }
  }

  /* Touch devices */
  @media (hover: none) and (pointer: coarse) {
    .training-card { cursor: pointer; }
    .training-card:hover { transform: none; box-shadow: var(--trn-shadow-card); }
    .training-card:hover .training-card-image { transform: none; }
    .training-card .training-card-overlay { transform: translateY(100%); pointer-events: none; }
    .training-card.active { box-shadow: var(--trn-shadow-hover); }
    .training-card.active .training-card-overlay { transform: translateY(0); pointer-events: auto; }
    .training-card.active .training-card-image { transform: scale(1.08); }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .training-section, .training-section *, .training-section *::before, .training-section *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .training-card:hover { transform: none !important; }
    .training-card:hover .training-card-image { transform: none !important; }
  }

  @media print {
    .training-section { padding: 20px; background: white !important; }
    .training-carousel { display: none !important; }
    .training-grid-wrapper { display: block !important; }
    .training-grid { display: grid !important; }
    .training-card { box-shadow: none !important; border: 1px solid #ccc !important; }
    .training-card-overlay { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Training Card Component
// ══════════════════════════════════════════════════════════════════════════
const TrainingCard = memo(({ item, index, isCarousel = false, isActive, onClick, onNavigate }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = useCallback((e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }, [onClick]);
  const handleButtonClick = useCallback((e) => { e.stopPropagation(); e.preventDefault(); onNavigate(item.route); }, [onNavigate, item.route]);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60, scale: 0.9, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] } },
  }), [index]);

  const cardContent = (
    <div className={`training-card${isActive ? " active" : ""}`} onClick={onClick} onKeyDown={handleKeyDown} role="listitem" aria-label={item.title} tabIndex={0}>
      <div className="training-tap-hint" aria-hidden="true">Tap for details</div>
      <img src={item.image} alt={item.title} className="training-card-image" loading="lazy" decoding="async" />
      <div className="training-card-content"><h3 className="training-card-title">{item.title}</h3><p className="training-card-desc">{item.description}</p></div>
      <div className="training-card-overlay">
        <h4 className="training-overlay-title">{item.title}</h4>
        <p className="training-overlay-desc">{item.description}</p>
        <button className="training-overlay-btn" onClick={handleButtonClick} aria-label={`Learn more about ${item.title}`} type="button"><span>More<ArrowUpRight size={14} /></span></button>
      </div>
    </div>
  );

  if (isCarousel) {
    return <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.04 }} style={{ width: "100%" }}>{cardContent}</motion.div>;
  }

  return (
    <div ref={cardRef} className="training-card-reveal">
      <motion.div variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -6 }} style={{ width: "100%", height: "100%" }}>{cardContent}</motion.div>
    </div>
  );
});
TrainingCard.displayName = "TrainingCard";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Carousel
// ══════════════════════════════════════════════════════════════════════════
const MobileCarousel = memo(({ items, activeIndex, onCardClick, onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => setCurrent((prev) => (prev + 1) % items.length), AUTOPLAY_MS);
  }, [isPaused, prefersReducedMotion, items.length]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const prev = useCallback(() => setCurrent((p) => (p - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrent((p) => (p + 1) % items.length), [items.length]);
  const goTo = useCallback((i) => { setCurrent(i); startTimer(); }, [startTimer]);

  const touchStartH = useCallback((e) => { setTouchStart(e.touches[0].clientX); setIsPaused(true); }, []);
  const touchMoveH = useCallback((e) => { setTouchEnd(e.touches[0].clientX); }, []);
  const touchEndH = useCallback(() => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    if (touchStart - touchEnd > SWIPE_THRESHOLD) next();
    else if (touchEnd - touchStart > SWIPE_THRESHOLD) prev();
    setTouchStart(null); setTouchEnd(null); startTimer();
  }, [touchStart, touchEnd, next, prev, startTimer]);

  useEffect(() => {
    const h = (e) => { if (e.key === "ArrowLeft") { e.preventDefault(); prev(); startTimer(); } if (e.key === "ArrowRight") { e.preventDefault(); next(); startTimer(); } };
    window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
  }, [next, prev, startTimer]);

  return (
    <div className="training-carousel" role="region" aria-label="Training services carousel" aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}
      onTouchStart={touchStartH} onTouchMove={touchMoveH} onTouchEnd={touchEndH}>
      <div className="sr-only" role="status" aria-live="polite">Showing {current + 1} of {items.length}: {items[current].title}</div>
      <AnimatePresence mode="wait">
        <motion.div key={current} className="training-carousel-track"
          initial={{ x: 50, opacity: 0.3 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0.2 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.25, 1, 0.5, 1] }}>
          <div className="training-carousel-slide">
            <TrainingCard item={items[current]} index={current} isCarousel={true} isActive={activeIndex === current} onClick={() => onCardClick(current)} onNavigate={onNavigate} />
          </div>
        </motion.div>
      </AnimatePresence>
      <button className="training-carousel-arrow prev" onClick={() => { prev(); startTimer(); }} aria-label="Previous" type="button"><ChevronLeft size={20} /></button>
      <button className="training-carousel-arrow next" onClick={() => { next(); startTimer(); }} aria-label="Next" type="button"><ChevronRight size={20} /></button>
      <div className="training-carousel-dots" role="tablist">
        {items.map((item, i) => <button key={item.id} className={`training-carousel-dot${i === current ? " training-carousel-dot-active" : ""}`} onClick={() => goTo(i)} role="tab" aria-selected={i === current} aria-label={item.title} type="button" />)}
      </div>
      <div className="training-swipe-indicator" aria-hidden="true">← Swipe or tap arrows →</div>
      <style>{`.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}`}</style>
    </div>
  );
});
MobileCarousel.displayName = "MobileCarousel";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
const Training = memo(function Training() {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const handleCardClick = useCallback((index) => {
    if (window.matchMedia('(hover: none)').matches) setActiveIndex(prev => prev === index ? null : index);
  }, []);

  const handleNavigate = useCallback((route) => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    setTimeout(() => navigate(route), 300);
  }, [navigate, prefersReducedMotion]);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }), []);

  return (
    <>
      <style>{STYLES}</style>
      <section className="training-section" aria-label="Training services">
        <div className="training-container">
          <motion.div ref={headerRef} className="training-header" variants={headerVariants} initial="hidden" animate={isHeaderInView ? "visible" : "hidden"}>
            <div className="training-eyebrow"><Sparkles size={12} /> Check Our Training <Sparkles size={12} /></div>
            <h2 className="training-title">Get the Best <span className="training-title-accent">Coaching Service</span> Training with Our RASOAF</h2>
            <p className="training-subtitle">We provide professional training, guidance, and support for a wide range of internationally recognized examinations, including IELTS, TOEFL, PTE, OET, Duolingo English Test, TEF Canada, GMAC, GMAT, and GRE.</p>
          </motion.div>

          <div className="training-grid-wrapper">
            <div className="training-grid" role="list">
              {trainingData.map((item, idx) => (
                <TrainingCard key={item.id} item={item} index={idx} isActive={activeIndex === idx} onClick={() => handleCardClick(idx)} onNavigate={handleNavigate} />
              ))}
            </div>
          </div>

          <MobileCarousel items={trainingData} activeIndex={activeIndex} onCardClick={handleCardClick} onNavigate={handleNavigate} />
        </div>
      </section>
    </>
  );
});

Training.displayName = "Training";
export default Training;