// src/components/travel/TravelServices.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Services Grid
// Premium Rasoaf Typography System · Gold + Cream Palette · Micro-interactions
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Plane, Hotel, FileCheck, Briefcase, Car, Shield, Umbrella, Users,
  Sparkles, Compass, ArrowUpRight, Star
} from "lucide-react";

const services = [
  { 
    icon: Plane, 
    title: "Flight Booking", 
    desc: "Best fares on international and domestic flights with major airlines worldwide.", 
    route: "/travel/flights",
    color: "#0284C7",
    accentBg: "rgba(2, 132, 199, 0.08)",
    stat: "Best Rates"
  },
  { 
    icon: Hotel, 
    title: "Hotel Reservations", 
    desc: "Handpicked hotels from budget-friendly to luxury suites across the globe.", 
    route: "/travel/services",
    color: "#0D9488",
    accentBg: "rgba(13, 148, 136, 0.08)",
    stat: "Global Network"
  },
  { 
    icon: FileCheck, 
    title: "Visa Assistance", 
    desc: "Expert guidance for tourist, student, work, and business visa applications.", 
    route: "/travel/tourist-visa",
    color: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.08)",
    stat: "95% Success"
  },
  { 
    icon: Briefcase, 
    title: "Holiday Packages", 
    desc: "Curated travel packages including flights, hotels, tours, and activities.", 
    route: "/travel/services",
    color: "#DC2626",
    accentBg: "rgba(220, 38, 38, 0.08)",
    stat: "Customized"
  },
  { 
    icon: Car, 
    title: "Airport Pickup", 
    desc: "Reliable airport transfers to your hotel or residence upon arrival.", 
    route: "/travel/services",
    color: "#1A73E8",
    accentBg: "rgba(26, 115, 232, 0.08)",
    stat: "24/7 Service"
  },
  { 
    icon: Shield, 
    title: "Travel Insurance", 
    desc: "Comprehensive coverage for medical emergencies, trip cancellations, and baggage loss.", 
    route: "/travel/services",
    color: "#059669",
    accentBg: "rgba(5, 150, 105, 0.08)",
    stat: "Full Coverage"
  },
  { 
    icon: Umbrella, 
    title: "Corporate Travel", 
    desc: "Tailored business travel management for companies and organizations.", 
    route: "/travel/business-visa",
    color: "#E11D48",
    accentBg: "rgba(225, 29, 72, 0.08)",
    stat: "Enterprise"
  },
  { 
    icon: Users, 
    title: "Group Tours", 
    desc: "Specialized group packages for families, organizations, and pilgrimage groups.", 
    route: "/travel/services",
    color: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.08)",
    stat: "Best Groups"
  },
];

const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-surface-primary: #FFF8E6;
    --rasoaf-surface-cream: #FFFAF0;
    --rasoaf-surface-white: #FFFFFF;
    --rasoaf-text-primary: #0B0F17;
    --rasoaf-text-secondary: #525252;
    --rasoaf-text-tertiary: #737373;
    --rasoaf-text-muted: #A3A3A3;
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
    --rasoaf-shadow-card-hover: 0 20px 60px rgba(212, 160, 23, 0.12), 0 0 0 1px rgba(212, 160, 23, 0.1);
    --rasoaf-transition-smooth: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    --rasoaf-transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  /* ── Section ── */
  .rts-section {
    padding: clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px);
    background: linear-gradient(175deg, #FFF8E6 0%, #FFFAF0 50%, #FFF8E6 100%);
    font-family: var(--rasoaf-font-body);
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  /* Premium atmospheric layers */
  .rts-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 15% 85%, rgba(212, 160, 23, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 15%, rgba(212, 160, 23, 0.04) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(247, 201, 72, 0.02) 0%, transparent 60%);
    pointer-events: none;
    animation: rts-ambient-drift 30s ease-in-out infinite;
  }

  .rts-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(212, 160, 23, 0.015) 3px,
        rgba(212, 160, 23, 0.015) 6px
      );
    opacity: 0.6;
    pointer-events: none;
  }

  @keyframes rts-ambient-drift {
    0%, 100% { transform: scale(1) translate(0, 0); }
    33% { transform: scale(1.02) translate(-10px, 10px); }
    66% { transform: scale(0.98) translate(10px, -10px); }
  }

  /* ── Container ── */
  .rts-container {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ── Header - Centered ── */
  .rts-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .rts-header-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .rts-header-line {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--rasoaf-gold), var(--rasoaf-gold-dark));
    border-radius: 2px;
  }

  .rts-header-line:first-child {
    background: linear-gradient(90deg, var(--rasoaf-gold-dark), var(--rasoaf-gold), transparent);
  }

  .rts-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 24px;
    background: rgba(212, 160, 23, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    color: var(--rasoaf-gold-dark);
    font-family: var(--rasoaf-font-body);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: all 0.3s ease;
  }

  .rts-badge:hover {
    background: rgba(212, 160, 23, 0.15);
    border-color: rgba(212, 160, 23, 0.3);
    transform: translateY(-1px);
  }

  .rts-badge-icon {
    animation: rts-icon-pulse 2s ease-in-out infinite;
  }

  @keyframes rts-icon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
  }

  .rts-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(32px, 4.5vw, 52px);
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.03em;
    line-height: 1.12;
    margin-bottom: 16px;
    text-align: center;
  }

  .rts-title-gradient {
    background: linear-gradient(
      135deg, 
      var(--rasoaf-gold-dark) 0%, 
      var(--rasoaf-gold) 40%, 
      var(--rasoaf-gold-light) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rts-subtitle {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(14px, 1.2vw, 16px);
    color: var(--rasoaf-text-tertiary);
    line-height: 1.7;
    max-width: 540px;
    margin: 0 auto;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  /* ── Grid ── */
  .rts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: clamp(16px, 2vw, 24px);
  }

  /* ── Cards ── */
  .rts-card {
    background: var(--rasoaf-surface-white);
    border: 1px solid rgba(212, 160, 23, 0.12);
    border-radius: 24px;
    padding: clamp(24px, 3.5vw, 36px);
    cursor: pointer;
    transition: all var(--rasoaf-transition-smooth);
    position: relative;
    overflow: hidden;
    isolation: isolate;
    box-shadow: var(--rasoaf-shadow-card);
  }

  .rts-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
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

  .rts-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    );
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .rts-card:hover {
    border-color: rgba(212, 160, 23, 0.4);
    background: #FFFDF8;
    transform: translateY(-6px);
    box-shadow: var(--rasoaf-shadow-card-hover);
  }

  .rts-card:hover::before {
    opacity: 1;
  }

  .rts-card:hover::after {
    left: 100%;
  }

  /* ── Card Icon ── */
  .rts-card-icon-wrap {
    position: relative;
    display: inline-flex;
    margin-bottom: 20px;
  }

  .rts-card-icon-glow {
    position: absolute;
    inset: -6px;
    border-radius: 14px;
    opacity: 0;
    transition: all 0.5s ease;
    filter: blur(12px);
  }

  .rts-card:hover .rts-card-icon-glow {
    opacity: 0.25;
    transform: scale(1.3);
  }

  .rts-card-icon {
    width: clamp(48px, 5.5vw, 60px);
    height: clamp(48px, 5.5vw, 60px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    transition: all var(--rasoaf-transition-smooth);
    border: 1px solid rgba(212, 160, 23, 0.1);
  }

  .rts-card:hover .rts-card-icon {
    transform: scale(1.08) rotate(-5deg);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: 0 4px 16px rgba(212, 160, 23, 0.12);
  }

  /* ── Card Title ── */
  .rts-card-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .rts-card-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(1.05rem, 1.4vw, 1.2rem);
    color: var(--rasoaf-text-primary);
    letter-spacing: -0.02em;
    line-height: 1.2;
    transition: all 0.3s ease;
  }

  .rts-card:hover .rts-card-title {
    background: linear-gradient(
      135deg, 
      var(--rasoaf-text-primary) 0%, 
      var(--rasoaf-gold-dark) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rts-card-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all var(--rasoaf-transition-bounce);
    flex-shrink: 0;
    color: var(--rasoaf-gold);
  }

  .rts-card:hover .rts-card-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Card Description ── */
  .rts-card-desc {
    font-family: var(--rasoaf-font-body);
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--rasoaf-text-secondary);
    line-height: 1.7;
    margin-bottom: 16px;
    letter-spacing: 0.005em;
    transition: color 0.3s ease;
  }

  .rts-card:hover .rts-card-desc {
    color: var(--rasoaf-text-primary);
  }

  /* ── Card Stat ── */
  .rts-card-stat {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-top: 14px;
    border-top: 1px solid rgba(212, 160, 23, 0.08);
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: all 0.3s ease;
  }

  .rts-card:hover .rts-card-stat {
    color: var(--rasoaf-gold-dark);
    border-top-color: rgba(212, 160, 23, 0.2);
  }

  /* ── Responsive Design ── */
  @media (max-width: 768px) {
    .rts-section {
      padding: clamp(60px, 8vh, 80px) 20px;
    }
    
    .rts-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    
    .rts-card {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    .rts-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }
    
    .rts-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .rts-header-line {
      width: 32px;
    }
    
    .rts-card {
      padding: 20px;
      border-radius: 20px;
    }
    
    .rts-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      margin-bottom: 14px;
    }
    
    .rts-card-title {
      font-size: 0.95rem;
    }
    
    .rts-card-desc {
      font-size: 0.75rem;
      margin-bottom: 10px;
    }
    
    .rts-card-stat {
      font-size: 0.65rem;
      padding-top: 10px;
    }
    
    .rts-subtitle {
      max-width: 100%;
      padding: 0 8px;
    }
  }
`;

export default function TravelServices() {
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
      
      <section className="rts-section" ref={ref}>
        <div className="rts-container">
          {/* Premium Centered Header with Rasoaf Typography */}
          <motion.div 
            className="rts-header"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Decorative Line + Badge + Line */}
            <div className="rts-header-decoration">
              <div className="rts-header-line" />
              <span className="rts-badge">
                <Compass size={12} className="rts-badge-icon" />
                What We Offer
                <Sparkles size={12} className="rts-badge-icon" />
              </span>
              <div className="rts-header-line" />
            </div>
            
            {/* Centered Title */}
            <h2 className="rts-title">
              Our Travel{" "}
              <span className="rts-title-gradient">Services</span>
            </h2>
            
            {/* Centered Subtitle */}
            <p className="rts-subtitle">
              Comprehensive travel solutions tailored to your needs, 
              delivered with excellence and care.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="rts-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={i} 
                  className="rts-card" 
                  onClick={() => handleClick(s.route)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    delay: 0.08 * i, 
                    duration: 0.5, 
                    ease: [0.25, 1, 0.5, 1] 
                  }}
                  whileHover={{ y: -6 }}
                >
                  {/* Icon with glow effect */}
                  <div className="rts-card-icon-wrap">
                    <div 
                      className="rts-card-icon-glow"
                      style={{ background: s.color || '#D4A017' }}
                    />
                    <div 
                      className="rts-card-icon" 
                      style={{ background: s.accentBg }}
                    >
                      <Icon 
                        size={26} 
                        color={s.color || '#D4A017'}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* Title with hover arrow */}
                  <div className="rts-card-title-row">
                    <h3 className="rts-card-title">{s.title}</h3>
                    <ArrowUpRight 
                      size={16} 
                      className="rts-card-arrow"
                    />
                  </div>

                  {/* Description */}
                  <p className="rts-card-desc">{s.desc}</p>

                  {/* Stat Badge */}
                  <div className="rts-card-stat">
                    <Star size={10} />
                    {s.stat}
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