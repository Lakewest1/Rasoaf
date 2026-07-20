// src/components/travel/VisaServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Visa Services Grid
// Editorial luxury design with image-first cards, glassmorphism overlays
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../common";
import { ChevronRight, Eye, Sparkles } from "lucide-react";

// ── Visa Services Data ──────────────────────────────────────────────────────
const services = [
  {
    id: "student",
    title: "Student Visa",
    description: "Transform your future with world-class education. We handle admissions, LOA, CAS, DS-160, and study permits for premier institutions in Canada, USA, UK, Australia, and Europe.",
    processingTime: "4–8 weeks",
    successRate: "95% Success",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550199/Rasoaf5_caopg8.jpg",
    route: "/travel/student-visa",
    color: "#D4A017",
  },
  {
    id: "work",
    title: "Work Visa",
    description: "Accelerate your global career with premium work visa solutions. Expert handling of employment documentation, compliance, and fast-track processing for skilled professionals.",
    processingTime: "6–12 weeks",
    successRate: "92% Success",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&h=600&fit=crop&crop=center",
    route: "/travel/work-visa",
    color: "#D4A017",
  },
  {
    id: "tourist",
    title: "Tourist Visa",
    description: "Experience the extraordinary with seamless tourist visa processing. From exotic destinations to cultural wonders, we make your travel dreams a reality.",
    processingTime: "2–4 weeks",
    successRate: "98% Success",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
    route: "/travel/tourist-visa",
    color: "#D4A017",
  },
  {
    id: "business",
    title: "Business Visa",
    description: "Elevate your corporate presence globally with premium business visa services. Specialized handling for conferences, trade missions, and international expansion.",
    processingTime: "3–6 weeks",
    successRate: "94% Success",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center",
    route: "/travel/business-visa",
    color: "#D4A017",
  },
  {
    id: "family",
    title: "Family Visa",
    description: "Reunite with loved ones through our comprehensive family reunification services. We handle complex documentation for family residence and long-term stays with care.",
    processingTime: "8–16 weeks",
    successRate: "88% Success",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop&crop=center",
    route: "/travel/family-visa",
    color: "#D4A017",
  },
  {
    id: "flights",
    title: "Flight Booking",
    description: "Discover exceptional flight deals with premier global airlines. Luxury and economy options with flexible booking, real-time tracking, and 24/7 concierge support.",
    processingTime: "Instant",
    successRate: "100% Success",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&crop=center",
    route: "/travel/flights",
    color: "#D4A017",
  },
];

// ── Premium CSS ────────────────────────────────────────────────────────────
const PremiumCSS = `
  /* ── Rasoaf Design Tokens ── */
  :root {
    --rasoaf-gold-primary: #D4A017;
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-surface-primary: #FFF8E6;
    --rasoaf-surface-white: #FFFFFF;
    --rasoaf-text-primary: #0B0F17;
    --rasoaf-text-secondary: #525252;
    --rasoaf-text-tertiary: #737373;
    --rasoaf-font-display: 'Manrope', system-ui, sans-serif;
    --rasoaf-font-body: 'Inter', system-ui, sans-serif;
    --rasoaf-transition-smooth: 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── Section ── */
  .visa-services-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: clamp(80px, 12vh, 120px) 32px;
    background: #FFFFFF;
    position: relative;
    overflow: hidden;
  }

  .visa-services-section::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(212, 160, 23, 0.03) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* ── Header ── */
  .visa-header-wrap {
    position: relative;
    z-index: 2;
    margin-bottom: clamp(48px, 6vw, 64px);
  }

  /* ── Grid ── */
  .visa-services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(20px, 2.5vw, 32px);
    position: relative;
    z-index: 2;
  }

  /* ── Card ── */
  .visa-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    height: 460px;
    background: #0B0F17;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    transition: all var(--rasoaf-transition-smooth);
  }

  .visa-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(212, 160, 23, 0.15);
  }

  /* ── Image ── */
  .visa-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
  }

  .visa-card:hover .visa-card-image {
    transform: scale(1.08);
  }

  /* ── Fade Hint Text ── */
  .visa-card-hint {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--rasoaf-font-body);
    font-size: 0.7rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.7;
    transition: all 0.4s ease;
    z-index: 3;
    pointer-events: none;
  }

  .visa-card:hover .visa-card-hint {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }

  .visa-card-hint svg {
    opacity: 0.7;
  }

  /* ── Overlay ── */
  .visa-card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32px 28px 28px;
    background: rgba(10, 60, 110, 0.78);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 22px;
    margin: 0 6px 6px;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(calc(100% - 50px));
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
    pointer-events: none;
  }

  .visa-card:hover .visa-card-overlay {
    transform: translateY(0);
    height: 60%;
    pointer-events: auto;
  }

  /* ── Overlay Shine ── */
  .visa-card-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.06),
      transparent
    );
    transform: skewX(-25deg);
    transition: left 0.8s ease;
    pointer-events: none;
  }

  .visa-card:hover .visa-card-overlay::before {
    left: 100%;
  }

  /* ── Title ── */
  .visa-card-title {
    font-family: var(--rasoaf-font-display);
    font-weight: 800;
    font-size: clamp(1.3rem, 1.8vw, 1.6rem);
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 6px;
    pointer-events: none;
  }

  /* ── Description ── */
  .visa-card-desc {
    font-family: var(--rasoaf-font-body);
    font-size: clamp(0.8rem, 0.9vw, 0.85rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: -webkit-line-clamp 0.5s ease;
    pointer-events: none;
  }

  .visa-card:hover .visa-card-desc {
    -webkit-line-clamp: 3;
  }

  /* ── Info Row ── */
  .visa-card-info {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
    pointer-events: none;
  }

  .visa-info-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .visa-info-label {
    font-family: var(--rasoaf-font-body);
    font-size: 0.6rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .visa-info-value {
    font-family: var(--rasoaf-font-display);
    font-size: clamp(0.85rem, 1vw, 0.95rem);
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.01em;
  }

  .visa-info-value.success {
    color: #4ADE80;
  }

  /* ── CTA Button ── */
  .visa-cta-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: #0B1A2E;
    border: none;
    border-radius: 8px;
    font-family: var(--rasoaf-font-body);
    font-size: 0.8rem;
    font-weight: 600;
    color: #FFFFFF;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    width: fit-content;
    position: relative;
    overflow: hidden;
    pointer-events: auto;
    z-index: 10;
  }

  .visa-cta-button::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #D4A017, #F7C948);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .visa-cta-button:hover::before {
    opacity: 1;
  }

  .visa-cta-button span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .visa-cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(212, 160, 23, 0.3);
  }

  .visa-cta-arrow {
    transition: transform 0.3s ease;
  }

  .visa-cta-button:hover .visa-cta-arrow {
    transform: translateX(4px);
  }

  /* ── Mobile Carousel ── */
  .visa-carousel-wrapper {
    display: none;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    padding: 4px 0 16px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .visa-carousel-wrapper::-webkit-scrollbar {
    display: none;
  }

  .visa-carousel-item {
    flex: 0 0 85%;
    max-width: 340px;
    scroll-snap-align: start;
    height: 460px;
  }

  .visa-carousel-item .visa-card {
    height: 100%;
  }

  .visa-carousel-item .visa-card-overlay {
    height: 55%;
    transform: translateY(calc(100% - 50px));
    pointer-events: none;
  }

  .visa-carousel-item .visa-card:hover .visa-card-overlay {
    transform: translateY(0);
    height: 60%;
    pointer-events: auto;
  }

  .visa-carousel-item .visa-card-hint {
    display: flex;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .visa-services-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .visa-services-section {
      padding: clamp(60px, 8vh, 80px) 20px;
    }

    .visa-services-grid {
      display: none;
    }

    .visa-carousel-wrapper {
      display: flex;
    }

    .visa-card {
      height: 420px;
    }
  }

  @media (max-width: 480px) {
    .visa-services-section {
      padding: clamp(40px, 6vh, 60px) 16px;
    }

    .visa-carousel-item {
      flex: 0 0 92%;
      max-width: 320px;
      height: 400px;
    }

    .visa-card-overlay {
      padding: 24px 20px 20px;
      height: 50%;
    }

    .visa-card:hover .visa-card-overlay {
      height: 58%;
    }

    .visa-card-title {
      font-size: 1.1rem;
    }

    .visa-card-desc {
      font-size: 0.75rem;
      -webkit-line-clamp: 2;
    }

    .visa-card:hover .visa-card-desc {
      -webkit-line-clamp: 3;
    }

    .visa-card-info {
      gap: 16px;
    }

    .visa-cta-button {
      padding: 10px 20px;
      font-size: 0.75rem;
    }

    .visa-card-hint {
      font-size: 0.6rem;
      padding: 6px 14px;
      bottom: 12px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .visa-card-overlay,
    .visa-card-image,
    .visa-card,
    .visa-card-hint {
      transition: none !important;
    }
    .visa-card:hover .visa-card-image {
      transform: none;
    }
    .visa-card:hover .visa-card-overlay {
      transform: translateY(calc(100% - 50px));
      height: 55%;
    }
    .visa-card:hover .visa-card-desc {
      -webkit-line-clamp: 2;
    }
    .visa-card:hover .visa-card-hint {
      opacity: 0.7;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function VisaServicesGrid() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleNavigate = useCallback(
    (route, e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => navigate(route), 300);
    },
    [navigate]
  );

  return (
    <>
      <style>{PremiumCSS}</style>

      <section className="visa-services-section">
        {/* Header */}
        <div className="visa-header-wrap">
          <SectionHeader
            badge="✦ Premium Visa Solutions ✦"
            title="Your Gateway to the World"
            subtitle="RASOAF Travels and Tours Limited orchestrates extraordinary travel experiences with white-glove service. Complimentary consultation, meticulous documentation, and unwavering support because your journey deserves nothing less than perfection."
          />
        </div>

        {/* Desktop Grid - 3 cards per row */}
        <div className="visa-services-grid">
          {services.map((service, index) => (
            <VisaCard
              key={service.id}
              service={service}
              index={index}
              isHovered={hoveredId === service.id}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="visa-carousel-wrapper">
          {services.map((service) => (
            <div key={service.id} className="visa-carousel-item">
              <VisaCard
                service={service}
                isMobile={true}
                onNavigate={handleNavigate}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  VISA CARD COMPONENT
// ══════════════════════════════════════════════════════════════════════════
function VisaCard({ service, index = 0, isHovered = false, onHoverStart, onHoverEnd, onNavigate, isMobile = false }) {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const handleCardClick = (e) => {
    onNavigate(service.route, e);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onNavigate(service.route, e);
  };

  return (
    <motion.div
      ref={cardRef}
      className="visa-card"
      variants={!isMobile ? cardVariants : {}}
      initial={!isMobile ? "hidden" : {}}
      animate={!isMobile && isInView ? "visible" : {}}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={handleCardClick}
      whileHover={isMobile ? { y: -8 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate(service.route, e);
        }
      }}
      aria-label={`Explore ${service.title}`}
    >
      {/* Image */}
      <img
        src={service.image}
        alt={service.title}
        className="visa-card-image"
        loading="lazy"
        decoding="async"
      />

      {/* Fade Hint - Shows "Hover to explore" text */}
      <div className="visa-card-hint">
        <Eye size={14} />
        <span>Hover to explore</span>
        <Sparkles size={12} />
      </div>

      {/* Glass Overlay */}
      <div className="visa-card-overlay">
        <h3 className="visa-card-title">{service.title}</h3>
        <p className="visa-card-desc">{service.description}</p>

        <div className="visa-card-info">
          <div className="visa-info-item">
            <span className="visa-info-label">Processing</span>
            <span className="visa-info-value">{service.processingTime}</span>
          </div>
          <div className="visa-info-item">
            <span className="visa-info-label">Success Rate</span>
            <span className="visa-info-value success">{service.successRate}</span>
          </div>
        </div>

        <button 
          className="visa-cta-button" 
          onClick={handleButtonClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate(service.route, e);
            }
          }}
          aria-label={`Explore ${service.title} visa services`}
        >
          <span>
            Explore Visa
            <ChevronRight size={16} className="visa-cta-arrow" />
          </span>
        </button>
      </div>
    </motion.div>
  );
}