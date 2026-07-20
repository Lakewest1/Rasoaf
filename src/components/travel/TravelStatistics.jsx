// src/components/travel/TravelStatistics.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Statistics Badges
// Luxury shield design · Gold-dominant · Icon rotate 360° · Slide-up reveal
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Briefcase, Users, Globe, CheckCircle, Headphones,
  Star, Sparkles, TrendingUp, ChevronLeft, ChevronRight,
} from "lucide-react";

// ── Data — removed "Always Available" from description ──────────────────
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
  // Removed: Round The Clock support card
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
  white: "#FFFFFF",
  textPrimary: "#0B0F17",
  textSecondary: "#525252",
  textMuted: "#8B8B8B",
  transition: "0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  transitionBounce: "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
};

// ── Premium CSS ─────────────────────────────────────────────────────────
const CSS = `
  .rts-section {
    position: relative;
    z-index: 10;
    padding: clamp(80px, 12vh, 130px) clamp(20px, 5vw, 80px);
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
    margin-bottom: clamp(52px, 7vh, 72px);
  }

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
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    margin-bottom: 22px;
    text-shadow: none;
    transition: all 0.35s ease;
  }

  .rts-header-badge:hover {
    background: rgba(11, 15, 23, 0.08);
    border-color: rgba(212, 160, 23, 0.35);
    transform: translateY(-1px);
  }

  .rts-header-badge-icon {
    animation: rts-pulse 2.5s ease-in-out infinite;
  }

  @keyframes rts-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.9); }
  }

  .rts-header-title {
    font-family: ${tokens.display};
    font-weight: 800;
    font-size: clamp(30px, 4vw, 46px);
    color: ${tokens.charcoal};
    letter-spacing: -0.03em;
    line-height: 1.12;
    text-shadow: none;
    margin-bottom: 12px;
  }

  .rts-header-title-gradient {
    background: linear-gradient(135deg, ${tokens.goldLight} 0%, ${tokens.gold} 45%, ${tokens.goldDark} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 6px rgba(212, 160, 23, 0.25));
  }

  .rts-header-subtitle {
    font-family: ${tokens.body};
    font-size: clamp(13px, 1.1vw, 15.5px);
    color: ${tokens.textSecondary};
    line-height: 1.6;
    max-width: 520px;
    margin: 0 auto;
    font-weight: 400;
    letter-spacing: 0.01em;
    text-shadow: none;
  }

  /* ── Desktop Grid ── */
  .rts-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(18px, 2.2vw, 28px);
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ── Badge Card ── */
  .rts-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
    position: relative;
    transition: transform ${tokens.transition};
  }

  .rts-badge:hover {
    transform: translateY(-8px);
  }

  /* ── Shield Top (Charcoal/Gold) ── */
  .rts-shield {
    position: relative;
    width: 100%;
    background: linear-gradient(175deg, ${tokens.charcoalLight} 0%, ${tokens.charcoal} 50%, #0A0F17 100%);
    border-radius: 22px 22px 6px 6px;
    padding: clamp(28px, 3.2vw, 40px) clamp(14px, 2vw, 22px) clamp(24px, 2.8vw, 34px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-shadow:
      0 10px 36px rgba(0, 0, 0, 0.35),
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

  /* Shield bottom notch */
  .rts-shield::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 12px solid #0A0F17;
    z-index: 1;
    transition: border-top-color ${tokens.transition};
  }

  .rts-badge:hover .rts-shield::after {
    border-top-color: ${tokens.charcoal};
  }

  .rts-badge:hover .rts-shield {
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(212, 160, 23, 0.2),
      0 0 60px rgba(212, 160, 23, 0.06);
  }

  /* ── Shield Icon — Pentagon Shape ── */
  .rts-shield-icon {
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(212, 160, 23, 0.08);
    border: 1.5px solid rgba(212, 160, 23, 0.2);
    transition: all ${tokens.transition};
    position: relative;
    z-index: 2;
    clip-path: polygon(50% 0%, 100% 38%, 81% 100%, 19% 100%, 0% 38%);
    background: linear-gradient(135deg, rgba(212, 160, 23, 0.12), rgba(212, 160, 23, 0.04));
  }

  .rts-badge:hover .rts-shield-icon {
    transform: rotate(360deg) scale(1.12);
    border-color: ${tokens.gold};
    background: rgba(212, 160, 23, 0.18);
    box-shadow: 0 0 28px rgba(212, 160, 23, 0.35), 0 0 0 4px rgba(212, 160, 23, 0.04);
  }

  .rts-shield-icon svg {
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.2));
  }

  .rts-shield-subtitle {
    font-family: ${tokens.body};
    font-size: clamp(9.5px, 0.7vw, 10.5px);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    position: relative;
    z-index: 2;
    transition: color ${tokens.transition};
  }

  .rts-badge:hover .rts-shield-subtitle {
    color: rgba(255, 255, 255, 0.65);
  }

  /* ── Bottom Cream Circle ── */
  .rts-badge-circle {
    width: 88%;
    background: linear-gradient(180deg, ${tokens.creamWarm} 0%, ${tokens.cream} 100%);
    border-radius: 0 0 50% 50% / 0 0 55% 55%;
    padding: clamp(22px, 2.8vw, 32px) clamp(10px, 1.4vw, 16px) clamp(18px, 2.2vw, 26px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.08),
      0 0 0 1px rgba(212, 160, 23, 0.06);
    position: relative;
    z-index: 1;
    margin-top: -3px;
    transition: all ${tokens.transition};
  }

  .rts-badge:hover .rts-badge-circle {
    box-shadow:
      0 14px 40px rgba(0, 0, 0, 0.14),
      0 0 0 1px rgba(212, 160, 23, 0.14);
  }

  /* ── Number (Gold) ── */
  .rts-badge-number {
    font-family: ${tokens.display};
    font-weight: 800;
    font-size: clamp(36px, 5vw, 52px);
    background: linear-gradient(135deg, ${tokens.goldDark} 0%, ${tokens.gold} 40%, ${tokens.goldLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.03em;
    transition: all ${tokens.transition};
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.2));
  }

  .rts-badge:hover .rts-badge-number {
    transform: scale(1.06);
    filter: drop-shadow(0 4px 12px rgba(212, 160, 23, 0.45));
  }

  /* ── Label ── */
  .rts-badge-label {
    font-family: ${tokens.body};
    font-size: clamp(11px, 0.85vw, 13px);
    font-weight: 600;
    color: ${tokens.textSecondary};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color ${tokens.transition};
  }

  .rts-badge:hover .rts-badge-label {
    color: ${tokens.textPrimary};
  }

  .rts-badge-desc {
    font-family: ${tokens.body};
    font-size: clamp(9px, 0.68vw, 10px);
    font-weight: 500;
    color: ${tokens.textMuted};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(8px);
    transition: all ${tokens.transition};
  }

  .rts-badge:hover .rts-badge-desc {
    opacity: 1;
    transform: translateY(0);
    color: ${tokens.goldDark};
  }

  /* ── Mobile Carousel ── */
  .rts-carousel-wrapper {
    display: none;
    position: relative;
    overflow: hidden;
    max-width: 400px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .rts-carousel-track {
    display: flex;
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
    gap: 12px;
  }

  .rts-carousel-slide {
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 4px;
    box-sizing: border-box;
  }

  /* Smaller cards on mobile */
  .rts-carousel-slide .rts-badge {
    transform: scale(0.85);
    transform-origin: center;
  }

  .rts-carousel-slide .rts-shield {
    padding: clamp(16px, 2.5vw, 22px) clamp(10px, 1.5vw, 14px) clamp(14px, 2vw, 18px);
    border-radius: 16px 16px 4px 4px;
  }

  .rts-carousel-slide .rts-shield-icon {
    width: 42px;
    height: 42px;
  }

  .rts-carousel-slide .rts-shield-icon svg {
    width: 18px;
    height: 18px;
  }

  .rts-carousel-slide .rts-shield-subtitle {
    font-size: clamp(7px, 1.2vw, 8.5px);
  }

  .rts-carousel-slide .rts-badge-circle {
    padding: clamp(14px, 2vw, 18px) clamp(8px, 1vw, 12px) clamp(12px, 1.5vw, 16px);
    border-radius: 0 0 40% 40% / 0 0 45% 45%;
  }

  .rts-carousel-slide .rts-badge-number {
    font-size: clamp(24px, 4vw, 32px);
  }

  .rts-carousel-slide .rts-badge-label {
    font-size: clamp(8px, 1.2vw, 10px);
  }

  .rts-carousel-slide .rts-badge-desc {
    font-size: clamp(6.5px, 1vw, 8px);
  }

  .rts-carousel-btn {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    z-index: 5;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(212, 160, 23, 0.2);
    color: ${tokens.charcoal};
    cursor: pointer;
    box-shadow: 0 2px 14px rgba(0, 0, 0, 0.12);
    transition: all 0.35s ease;
  }

  .rts-carousel-btn:hover {
    background: ${tokens.white};
    border-color: ${tokens.gold};
    box-shadow: 0 4px 22px rgba(0, 0, 0, 0.18);
  }

  .rts-carousel-btn-left { left: -4px; }
  .rts-carousel-btn-right { right: -4px; }

  .rts-carousel-btn svg {
    width: 16px;
    height: 16px;
  }

  .rts-carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 16px;
  }

  .rts-carousel-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(11, 15, 23, 0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.35s ease;
  }

  .rts-carousel-dot-active {
    width: 20px;
    background: ${tokens.gold};
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .rts-grid {
      grid-template-columns: repeat(2, 1fr);
      max-width: 600px;
      gap: clamp(16px, 2.5vw, 24px);
    }
  }

  @media (max-width: 768px) {
    .rts-section {
      padding: clamp(48px, 7vh, 64px) 16px;
    }

    /* Hide main grid on small screens */
    .rts-grid {
      display: none !important;
    }

    /* Show only carousel */
    .rts-carousel-wrapper {
      display: block !important;
    }
  }

  @media (max-width: 480px) {
    .rts-carousel-wrapper {
      max-width: 340px;
    }
    
    .rts-carousel-slide .rts-badge {
      transform: scale(0.75);
    }
    
    .rts-carousel-btn {
      width: 28px;
      height: 28px;
    }
    
    .rts-carousel-btn svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 380px) {
    .rts-carousel-wrapper {
      max-width: 290px;
    }
    
    .rts-carousel-slide .rts-badge {
      transform: scale(0.7);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rts-badge,
    .rts-badge * {
      transition: none !important;
    }
    .rts-carousel-track {
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
      // Slide up animation on scroll
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        delay: 0.16 * index,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
    >
      {/* Shield Top — Charcoal with gold accents */}
      <div className="rts-shield">
        <div className="rts-shield-subtitle">{stat.description}</div>
        {/* Icon rotates 360° on hover - Pentagon shape */}
        <div className="rts-shield-icon">
          <Icon size={26} color={stat.color} strokeWidth={1.6} />
        </div>
      </div>

      {/* Bottom Circle — Warm Cream */}
      <div className="rts-badge-circle">
        <div className="rts-badge-number">
          <AnimatedNumber target={stat.value} suffix={stat.suffix} isInView={isInView} />
        </div>
        <div className="rts-badge-label">{stat.label}</div>
        <div className="rts-badge-desc">
          <Star size={8} style={{ display: 'inline', marginRight: 4 }} />
          {stat.description}
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  Mobile Carousel — 2 cards per slide, reduced size
// ══════════════════════════════════════════════════════════════════════════
function MobileCarousel({ stats, isInView }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const total = Math.ceil(stats.length / 2);

  // Group stats into pairs for 2-per-slide display
  const groupedStats = [];
  for (let i = 0; i < stats.length; i += 2) {
    groupedStats.push(stats.slice(i, i + 2));
  }

  const goTo = useCallback((i) => setCurrent(((i % total) + total) % total), [total]);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    if (!isInView) return;
    timerRef.current = setInterval(() => setCurrent(prev => (prev + 1) % total), 4000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isInView, total]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev();
    else if (diff < -50) next();
    setTouchStart(null);
  };

  return (
    <div className="rts-carousel-wrapper" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="rts-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {groupedStats.map((group, groupIndex) => (
          <div key={groupIndex} className="rts-carousel-slide">
            {group.map((stat, i) => (
              <BadgeCard key={i} stat={stat} isInView={isInView} index={i} />
            ))}
          </div>
        ))}
      </div>

      <button className="rts-carousel-btn rts-carousel-btn-left" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={18} />
      </button>
      <button className="rts-carousel-btn rts-carousel-btn-right" onClick={next} aria-label="Next slide">
        <ChevronRight size={18} />
      </button>

      <div className="rts-carousel-dots">
        {groupedStats.map((_, i) => (
          <button
            key={i}
            className={`rts-carousel-dot${i === current ? " rts-carousel-dot-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
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
            <span className="rts-header-badge">
              <TrendingUp size={12} className="rts-header-badge-icon" />
              Our Track Record
              <Sparkles size={12} className="rts-header-badge-icon" />
            </span>
            <h2 id="stats-heading" className="rts-header-title">
              Trusted by{" "}
              <span className="rts-header-title-gradient">Thousands</span>
            </h2>
            <p className="rts-header-subtitle">
              Numbers that speak for our commitment to excellence in travel services.
            </p>
          </motion.div>

          {/* Desktop Grid - 4 cards in a horizontal line */}
          <div className="rts-grid">
            {stats.map((stat, i) => (
              <BadgeCard key={i} stat={stat} isInView={isInView} index={i} />
            ))}
          </div>

          {/* Mobile Carousel - 2 cards per slide, reduced size */}
          <MobileCarousel stats={stats} isInView={isInView} />
        </div>
      </section>
    </>
  );
}