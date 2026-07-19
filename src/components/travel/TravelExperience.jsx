// src/components/travel/TravelExperience.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Featured Experiences
// Premium Rasoaf Typography System · White Cards · EarthScene Background
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  GraduationCap, Briefcase, Globe, Building2, Heart, Plane, 
  Star, Sparkles, Compass, ArrowUpRight, ChevronRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const experiences = [
  { 
    icon: GraduationCap, 
    title: "Study Abroad", 
    desc: "Pursue education in Canada, USA, UK, Australia, and Europe with expert guidance from application to enrollment.", 
    route: "/travel/student-visa", 
    color: "#1A73E8",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    accentBg: "rgba(102, 126, 234, 0.08)",
    stat: "95% Success"
  },
  { 
    icon: Briefcase, 
    title: "Work Opportunities", 
    desc: "Build your international career with professional work visa support and global employment connections.", 
    route: "/travel/work-visa", 
    color: "#0D9488",
    gradient: "linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)",
    accentBg: "rgba(13, 148, 136, 0.08)",
    stat: "92% Approval"
  },
  { 
    icon: Globe, 
    title: "Tourism & Leisure", 
    desc: "Explore the world's most beautiful destinations with curated travel packages and seamless arrangements.", 
    route: "/travel/tourist-visa", 
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    accentBg: "rgba(124, 58, 237, 0.08)",
    stat: "98% Rating"
  },
  { 
    icon: Building2, 
    title: "Business Travel", 
    desc: "Corporate travel solutions for meetings, conferences, and trade shows with premium concierge service.", 
    route: "/travel/business-visa", 
    color: "#DC2626",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    accentBg: "rgba(220, 38, 38, 0.08)",
    stat: "94% Success"
  },
  { 
    icon: Heart, 
    title: "Family Reunification", 
    desc: "Reunite with loved ones through our comprehensive family visa processing and residence services.", 
    route: "/travel/family-visa", 
    color: "#E11D48",
    gradient: "linear-gradient(135deg, #E11D48 0%, #EC4899 100%)",
    accentBg: "rgba(225, 29, 72, 0.08)",
    stat: "88% Approval"
  },
  { 
    icon: Plane, 
    title: "Flight Booking", 
    desc: "Best fares worldwide with major airlines for any travel purpose with 24/7 booking support.", 
    route: "/travel/flights", 
    color: "#0284C7",
    gradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    accentBg: "rgba(2, 132, 199, 0.08)",
    stat: "Instant Booking"
  },
];

const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-cream: #FFFDF8;
    --rasoaf-cream-dim: rgba(255, 253, 248, 0.8);
    --rasoaf-text-primary: #0B0F17;
    --rasoaf-text-secondary: #525252;
    --rasoaf-text-tertiary: #737373;
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
    --rasoaf-shadow-card-hover: 0 12px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(212, 160, 23, 0.15);
    --rasoaf-transition-smooth: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    --rasoaf-transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Section - Transparent for EarthScene ── */
  .rte-section {
    padding: clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px);
    background: transparent;
    font-family: var(--rasoaf-font-body);
    position: relative;
    overflow: visible;
    isolation: isolate;
    z-index: 10;
  }

  /* ── Container ── */
  .rte-container {
    max-width: 1240px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── Header - Centered ── */
  .rte-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .rte-header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .rte-header-line {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--rasoaf-gold-light), var(--rasoaf-gold));
    border-radius: 2px;
  }

  .rte-header-line:first-child {
    background: linear-gradient(90deg, var(--rasoaf-gold), var(--rasoaf-gold-light), transparent);
  }

  .rte-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 100px;
    color: #FFFDF8;
    font-family: var(--rasoaf-font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .rte-badge:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(212, 160, 23, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .rte-badge-icon {
    animation: rte-icon-pulse 2s ease-in-out infinite;
  }

  @keyframes rte-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }

  .rte-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(32px, 4.5vw, 52px);
    color: #FFFDF8;
    letter-spacing: -0.03em;
    line-height: 1.12;
    margin-bottom: 16px;
    text-align: center;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .rte-title-gradient {
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

  .rte-subtitle {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(14px, 1.2vw, 16px);
    color: rgba(255, 253, 248, 0.85);
    line-height: 1.7;
    max-width: 540px;
    margin: 0 auto;
    font-weight: 400;
    letter-spacing: 0.01em;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  /* ── Grid ── */
  .rte-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: clamp(18px, 2.2vw, 28px);
  }

  /* ── Cards - White Background ── */
  .rte-card {
    background: #FFFFFF;
    border: 1px solid rgba(212, 160, 23, 0.1);
    border-radius: 28px;
    padding: clamp(28px, 3.5vw, 40px);
    cursor: pointer;
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
    overflow: hidden;
    isolation: isolate;
    box-shadow: var(--rasoaf-shadow-card);
  }

  .rte-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
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

  .rte-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .rte-card:hover {
    border-color: rgba(212, 160, 23, 0.4);
    background: #FFFDF8;
    transform: translateY(-8px);
    box-shadow: var(--rasoaf-shadow-card-hover);
  }

  .rte-card:hover::before {
    opacity: 1;
  }

  .rte-card:hover::after {
    left: 100%;
  }

  /* ── Card Icon ── */
  .rte-card-icon-wrap {
    position: relative;
    display: inline-flex;
    margin-bottom: 20px;
  }

  .rte-card-icon-glow {
    position: absolute;
    inset: -6px;
    border-radius: 16px;
    opacity: 0;
    transition: all 0.5s ease;
    filter: blur(14px);
  }

  .rte-card:hover .rte-card-icon-glow {
    opacity: 0.3;
    transform: scale(1.3);
  }

  .rte-card-icon {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    transition: all var(--rasoaf-transition-smooth);
    border: 1px solid rgba(212, 160, 23, 0.12);
  }

  .rte-card:hover .rte-card-icon {
    transform: scale(1.08) rotate(-5deg);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.1);
  }

  /* ── Card Title ── */
  .rte-card-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .rte-card-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(1.15rem, 1.5vw, 1.35rem);
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
    transition: all 0.3s ease;
  }

  .rte-card:hover .rte-card-title {
    background: linear-gradient(
      135deg, 
      var(--rasoaf-text-primary) 0%, 
      var(--rasoaf-gold-dark) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rte-card-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all var(--rasoaf-transition-bounce);
    flex-shrink: 0;
  }

  .rte-card:hover .rte-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Card Description ── */
  .rte-card-desc {
    font-family: var(--rasoaf-font-body);
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--rasoaf-text-secondary);
    line-height: 1.7;
    margin-bottom: 20px;
    letter-spacing: 0.005em;
    transition: color 0.3s ease;
  }

  .rte-card:hover .rte-card-desc {
    color: var(--rasoaf-text-primary);
  }

  /* ── Card Stats & CTA ── */
  .rte-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid rgba(212, 160, 23, 0.1);
    transition: border-color 0.3s ease;
  }

  .rte-card:hover .rte-card-footer {
    border-top-color: rgba(212, 160, 23, 0.25);
  }

  .rte-card-stat {
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.3s ease;
  }

  .rte-card:hover .rte-card-stat {
    color: var(--rasoaf-gold-dark);
  }

  .rte-card-cta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    transition: all 0.3s ease;
    opacity: 0.8;
  }

  .rte-card:hover .rte-card-cta {
    opacity: 1;
    gap: 10px;
  }

  .rte-card-cta-arrow {
    transition: transform 0.3s ease;
  }

  .rte-card:hover .rte-card-cta-arrow {
    transform: translateX(3px);
  }

  /* ── Responsive Design ── */
  @media (max-width: 768px) {
    .rte-section {
      padding: clamp(60px, 8vh, 80px) 20px;
    }
    
    .rte-grid {
      grid-template-columns: 1fr;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .rte-card {
      padding: 28px;
    }
    
    .rte-title {
      font-size: clamp(28px, 5vw, 36px);
    }
  }

  @media (max-width: 480px) {
    .rte-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }
    
    .rte-header-line {
      width: 32px;
    }
    
    .rte-card {
      padding: 24px;
      border-radius: 24px;
    }
    
    .rte-card-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
    }
    
    .rte-subtitle {
      max-width: 100%;
      padding: 0 8px;
    }
  }
`;

export default function TravelExperience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleClick = (route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  };

  return (
    <>
      <style>{PremiumCSS}</style>
      
      <section className="rte-section" ref={ref}>
        <div className="rte-container">
          {/* Premium Centered Header with Rasoaf Typography */}
          <motion.div 
            className="rte-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Decorative Line + Badge + Line */}
            <div className="rte-header-decoration">
              <div className="rte-header-line" />
              <span className="rte-badge">
                <Compass size={12} className="rte-badge-icon" />
                Curated Experiences
                <Sparkles size={12} className="rte-badge-icon" />
              </span>
              <div className="rte-header-line" />
            </div>
            
            {/* Centered Title */}
            <h2 className="rte-title">
              Featured{" "}
              <span className="rte-title-gradient">Experiences</span>
            </h2>
            
            {/* Centered Subtitle */}
            <p className="rte-subtitle">
              Tailored travel solutions for every purpose and destination, 
              crafted with precision and delivered with excellence.
            </p>
          </motion.div>

          {/* Experience Cards Grid */}
          <div className="rte-grid">
            {experiences.map((e, i) => {
              const Icon = e.icon;
              return (
                <motion.div 
                  key={i} 
                  className="rte-card" 
                  onClick={() => handleClick(e.route)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    delay: 0.08 * i, 
                    duration: 0.5, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  whileHover={{ y: -8 }}
                >
                  {/* Icon with glow effect */}
                  <div className="rte-card-icon-wrap">
                    <div 
                      className="rte-card-icon-glow"
                      style={{ background: e.color }}
                    />
                    <div 
                      className="rte-card-icon" 
                      style={{ background: e.accentBg }}
                    >
                      <Icon 
                        size={26} 
                        color={e.color}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* Title with hover arrow */}
                  <div className="rte-card-title-row">
                    <h3 className="rte-card-title">{e.title}</h3>
                    <ArrowUpRight 
                      size={18} 
                      className="rte-card-arrow"
                      color={e.color}
                    />
                  </div>

                  {/* Description */}
                  <p className="rte-card-desc">{e.desc}</p>

                  {/* Footer with stats and CTA */}
                  <div className="rte-card-footer">
                    <span className="rte-card-stat">
                      <Star size={10} style={{ display: 'inline', marginRight: 4 }} />
                      {e.stat}
                    </span>
                    <span 
                      className="rte-card-cta"
                      style={{ color: e.color }}
                    >
                      Learn More
                      <ChevronRight size={14} className="rte-card-cta-arrow" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}