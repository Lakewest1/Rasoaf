// src/components/travel/TravelStatistics.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED - Animated Statistics
// Premium Rasoaf Typography · Glassmorphism Cards · EarthScene Background
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Globe, CheckCircle, Headphones, Star, Sparkles, TrendingUp } from "lucide-react";

const stats = [
  { 
    icon: Briefcase, 
    value: 20, 
    suffix: "+", 
    label: "Years Experience",
    color: "#D4A017",
    accentBg: "rgba(212, 160, 23, 0.1)",
    description: "Industry Expertise"
  },
  { 
    icon: Users, 
    value: 5000, 
    suffix: "+", 
    label: "Satisfied Travelers",
    color: "#F7C948",
    accentBg: "rgba(247, 201, 72, 0.1)",
    description: "Happy Clients"
  },
  { 
    icon: Globe, 
    value: 60, 
    suffix: "+", 
    label: "Countries",
    color: "#1A73E8",
    accentBg: "rgba(26, 115, 232, 0.1)",
    description: "Global Reach"
  },
  { 
    icon: CheckCircle, 
    value: 98, 
    suffix: "%", 
    label: "Visa Success Rate",
    color: "#059669",
    accentBg: "rgba(5, 150, 105, 0.1)",
    description: "Proven Results"
  },
  { 
    icon: Headphones, 
    value: 24, 
    suffix: "/7", 
    label: "Support",
    color: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.1)",
    description: "Always Available"
  },
];

// Fixed AnimatedNumber component
function AnimatedNumber({ target, suffix, isInView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let animationFrameId;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * target);
      
      setCount(currentValue);
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, target]);

  return <span>{count}{suffix}</span>;
}

const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-cream: #FFFDF8;
    --rasoaf-cream-dim: rgba(255, 253, 248, 0.7);
    --rasoaf-cream-muted: rgba(255, 253, 248, 0.5);
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-shadow-card: 0 8px 32px rgba(0, 0, 0, 0.3);
    --rasoaf-shadow-card-hover: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 160, 23, 0.15);
    --rasoaf-transition-smooth: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    --rasoaf-transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Section - Transparent for EarthScene ── */
  .rst-section {
    position: relative;
    z-index: 10;
    padding: clamp(60px, 10vh, 100px) clamp(20px, 5vw, 80px);
    background: transparent;
    font-family: var(--rasoaf-font-body);
    overflow: visible;
  }

  /* ── Section Header ── */
  .rst-header {
    text-align: center;
    margin-bottom: clamp(40px, 5vh, 56px);
  }

  .rst-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    color: #FFFDF8;
    font-family: var(--rasoaf-font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }

  .rst-header-badge:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(212, 160, 23, 0.35);
    transform: translateY(-1px);
  }

  .rst-header-badge-icon {
    animation: rst-icon-pulse 2s ease-in-out infinite;
  }

  @keyframes rst-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }

  .rst-header-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(28px, 3.5vw, 42px);
    color: #FFFDF8;
    letter-spacing: -0.03em;
    line-height: 1.15;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    margin-bottom: 8px;
  }

  .rst-header-title-gradient {
    background: linear-gradient(
      135deg, 
      var(--rasoaf-gold-light) 0%, 
      var(--rasoaf-gold) 40%, 
      var(--rasoaf-gold-dark) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 4px rgba(212, 160, 23, 0.4));
  }

  .rst-header-subtitle {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--rasoaf-cream-muted);
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto;
    font-weight: 400;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  /* ── Grid ── */
  .rst-grid {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: clamp(16px, 2.2vw, 28px);
    text-align: center;
    position: relative;
    z-index: 1;
  }

  /* ── Stat Cards - Glassmorphism ── */
  .rst-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: clamp(28px, 3.5vw, 40px) clamp(20px, 2.5vw, 28px);
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 32px;
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  .rst-item::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 32px;
    padding: 1px;
    background: linear-gradient(
      135deg, 
      rgba(212, 160, 23, 0.3), 
      transparent 30%, 
      transparent 70%, 
      rgba(212, 160, 23, 0.15)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  .rst-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .rst-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(212, 160, 23, 0.3);
    transform: translateY(-6px);
    box-shadow: var(--rasoaf-shadow-card-hover);
  }

  .rst-item:hover::before {
    opacity: 1;
  }

  .rst-item:hover::after {
    left: 100%;
  }

  /* ── Icon ── */
  .rst-icon-wrap {
    position: relative;
    display: inline-flex;
  }

  .rst-icon-glow {
    position: absolute;
    inset: -8px;
    border-radius: 18px;
    opacity: 0;
    transition: all 0.5s ease;
    filter: blur(14px);
  }

  .rst-item:hover .rst-icon-glow {
    opacity: 0.3;
    transform: scale(1.3);
  }

  .rst-icon {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    transition: all var(--rasoaf-transition-smooth);
  }

  .rst-item:hover .rst-icon {
    transform: scale(1.1) rotate(-3deg);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 20px rgba(212, 160, 23, 0.1);
  }

  /* ── Value ── */
  .rst-value {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(38px, 5.5vw, 56px);
    background: linear-gradient(
      135deg, 
      var(--rasoaf-gold-light) 0%, 
      var(--rasoaf-gold) 40%, 
      var(--rasoaf-gold-dark) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    letter-spacing: -0.02em;
    filter: drop-shadow(0 2px 8px rgba(212, 160, 23, 0.3));
    transition: all 0.3s ease;
    min-height: clamp(38px, 5.5vw, 56px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rst-item:hover .rst-value {
    filter: drop-shadow(0 4px 12px rgba(212, 160, 23, 0.5));
    transform: scale(1.05);
  }

  /* ── Label ── */
  .rst-label {
    font-family: var(--rasoaf-font-body);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--rasoaf-cream-dim);
    letter-spacing: 0.02em;
    transition: color 0.3s ease;
  }

  .rst-item:hover .rst-label {
    color: #FFFDF8;
  }

  /* ── Description (appears on hover) ── */
  .rst-description {
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--rasoaf-gold-light);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s ease;
  }

  .rst-item:hover .rst-description {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Responsive Design ── */
  @media (max-width: 768px) {
    .rst-section {
      padding: clamp(40px, 8vh, 60px) 20px;
    }
    
    .rst-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 14px;
    }
    
    .rst-item {
      padding: 24px 16px;
      border-radius: 24px;
    }
    
    .rst-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
    }
    
    .rst-value {
      font-size: clamp(32px, 6vw, 44px);
      min-height: clamp(32px, 6vw, 44px);
    }
  }

  @media (max-width: 480px) {
    .rst-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .rst-item {
      padding: 20px 12px;
      border-radius: 20px;
      gap: 12px;
    }
    
    .rst-icon {
      width: 44px;
      height: 44px;
      border-radius: 14px;
    }
    
    .rst-value {
      font-size: clamp(28px, 7vw, 36px);
      min-height: clamp(28px, 7vw, 36px);
    }
    
    .rst-label {
      font-size: 0.75rem;
    }
    
    .rst-description {
      font-size: 0.65rem;
    }
  }
`;

export default function TravelStatistics() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <style>{PremiumCSS}</style>
      
      <section className="rst-section" ref={sectionRef}>
        {/* Section Header */}
        <motion.div 
          className="rst-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="rst-header-badge">
            <TrendingUp size={12} className="rst-header-badge-icon" />
            Our Track Record
            <Sparkles size={12} className="rst-header-badge-icon" />
          </span>
          <h2 className="rst-header-title">
            Trusted by{" "}
            <span className="rst-header-title-gradient">Thousands</span>
          </h2>
          <p className="rst-header-subtitle">
            Numbers that speak for our commitment to excellence in travel services.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="rst-grid">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={i} 
                className="rst-item"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: 0.1 * i, 
                  duration: 0.5, 
                  ease: [0.25, 1, 0.5, 1] 
                }}
                whileHover={{ y: -6 }}
              >
                {/* Icon with glow */}
                <div className="rst-icon-wrap">
                  <div 
                    className="rst-icon-glow"
                    style={{ background: s.color }}
                  />
                  <div 
                    className="rst-icon" 
                    style={{ background: s.accentBg }}
                  >
                    <Icon 
                      size={28} 
                      color={s.color}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Animated Value */}
                <div className="rst-value">
                  <AnimatedNumber 
                    target={s.value} 
                    suffix={s.suffix} 
                    isInView={isInView}
                  />
                </div>

                {/* Label */}
                <div className="rst-label">{s.label}</div>

                {/* Description (appears on hover) */}
                <div className="rst-description">
                  <Star size={8} style={{ display: 'inline', marginRight: 4 }} />
                  {s.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}