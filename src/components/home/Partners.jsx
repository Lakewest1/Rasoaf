// src/components/home/Partners.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Partners Section
//
// A premium trust reinforcement section featuring partner logos from airlines,
// hotels, accreditation bodies, and travel authorities.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Logo grid with optional auto-scrolling carousel
// Animation: Fade-up on scroll, hover scale, infinite scroll
// Responsive: 6 → 4 → 3 → 2 columns
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Award,
  Building2,
  Globe,
  Plane,
  Hotel,
  Shield,
  Users,
  CheckCircle,
  Star,
  Crown,
  MapPin,
  Briefcase,
} from "lucide-react";

// ── Partners Data ──────────────────────────────────────────────────────────────
const PARTNERS = [
  {
    id: 1,
    name: "Saudi Arabian Airlines",
    category: "Airline",
    color: "#0a5a8c",
    icon: Plane,
    description: "Official flag carrier of Saudi Arabia",
  },
  {
    id: 2,
    name: "Emirates Airlines",
    category: "Airline",
    color: "#d71921",
    icon: Plane,
    description: "Premier international airline",
  },
  {
    id: 3,
    name: "Etihad Airways",
    category: "Airline",
    color: "#8a1538",
    icon: Plane,
    description: "UAE's national airline",
  },
  {
    id: 4,
    name: "Qatar Airways",
    category: "Airline",
    color: "#8a1538",
    icon: Plane,
    description: "Award-winning international airline",
  },
  {
    id: 5,
    name: "Hilton Hotels",
    category: "Hotel",
    color: "#1e3d5e",
    icon: Hotel,
    description: "Premium hotel accommodations",
  },
  {
    id: 6,
    name: "Marriott International",
    category: "Hotel",
    color: "#004b87",
    icon: Hotel,
    description: "Leading hospitality brand",
  },
  {
    id: 7,
    name: "Ministry of Hajj & Umrah",
    category: "Government Authority",
    color: "#1a6e3a",
    icon: Shield,
    description: "Saudi Ministry of Hajj and Umrah",
  },
  {
    id: 8,
    name: "IATA",
    category: "Accreditation",
    color: "#004b8a",
    icon: Award,
    description: "International Air Transport Association",
  },
  {
    id: 9,
    name: "Saudi Tourism Authority",
    category: "Government Authority",
    color: "#1a6e3a",
    icon: Globe,
    description: "Official tourism body of Saudi Arabia",
  },
  {
    id: 10,
    name: "Accor Hotels",
    category: "Hotel",
    color: "#003366",
    icon: Hotel,
    description: "Global hospitality leader",
  },
  {
    id: 11,
    name: "Flydubai",
    category: "Airline",
    color: "#d71921",
    icon: Plane,
    description: "Dubai-based international airline",
  },
  {
    id: 12,
    name: "WTTC",
    category: "Accreditation",
    color: "#003366",
    icon: Award,
    description: "World Travel & Tourism Council",
  },
];

// ── Category Icons ────────────────────────────────────────────────────────────
const CATEGORY_ICONS = {
  Airline: Plane,
  Hotel: Hotel,
  "Government Authority": Shield,
  Accreditation: Award,
};

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ── Partner Logo Card ──────────────────────────────────────────────────────
function PartnerCard({ partner, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.04 * (index % 8);
  const Icon = partner.icon || Building2;

  return (
    <div
      className="partner-card-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `
          opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
      }}
    >
      <div
        className="partner-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(16px, 2vw, 28px)",
          background: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
          borderRadius: "16px",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.15)" : "rgba(0,0,0,0.04)"}`,
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.06), 0 4px 16px rgba(212,160,23,0.06)"
            : "0 2px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          cursor: "default",
          height: "100%",
          minHeight: "clamp(80px, 10vw, 120px)",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Icon Container - replaces image */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
            filter: hovered ? "grayscale(0%)" : "grayscale(30%)",
            opacity: hovered ? 1 : 0.7,
          }}
        >
          <div
            style={{
              width: "clamp(40px, 5vw, 56px)",
              height: "clamp(40px, 5vw, 56px)",
              borderRadius: "12px",
              background: hovered ? partner.color : "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <Icon
              size={clamp(20, 24, 28)}
              color={hovered ? "#ffffff" : "#666666"}
              strokeWidth={1.8}
            />
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(10px, 0.9vw, 13px)",
              fontWeight: 600,
              color: hovered ? "#111111" : "#4a5568",
              textAlign: "center",
              transition: "color 0.3s ease",
              lineHeight: 1.2,
            }}
          >
            {partner.name}
          </span>
        </div>

        {/* Hover Tooltip */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "clamp(8px, 1vw, 14px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(8px, 0.6vw, 10px)",
              fontWeight: 500,
              color: "#D4A017",
              background: "rgba(255,255,255,0.95)",
              padding: "4px 12px",
              borderRadius: "50px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              whiteSpace: "nowrap",
              animation: "tooltip-fade 0.3s ease",
              border: "1px solid rgba(212,160,23,0.1)",
            }}
          >
            {partner.description}
          </div>
        )}

        {/* Category indicator */}
        <div
          style={{
            position: "absolute",
            top: "clamp(6px, 0.8vw, 10px)",
            right: "clamp(6px, 0.8vw, 10px)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(6px, 0.5vw, 8px)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: hovered ? "#D4A017" : "rgba(0,0,0,0.2)",
            background: hovered ? "rgba(212,160,23,0.06)" : "rgba(0,0,0,0.03)",
            padding: "2px 8px",
            borderRadius: "50px",
            transition: "all 0.3s ease",
          }}
        >
          {partner.category}
        </div>
      </div>
    </div>
  );
}

// ── Auto-Scrolling Carousel ──────────────────────────────────────────────────
function PartnerCarousel({ partners, inView }) {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !inView) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 0.5;

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += speed;
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [inView, isPaused]);

  // Duplicate partners for seamless loop
  const carouselPartners = [...partners, ...partners];

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        overflow: "hidden",
        gap: "clamp(16px, 2vw, 28px)",
        padding: "clamp(12px, 1.5vw, 20px) 0",
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        position: "relative",
        cursor: "grab",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {carouselPartners.map((partner, index) => (
        <div
          key={`${partner.id}-${index}`}
          style={{
            flex: "0 0 auto",
            width: "clamp(140px, 16vw, 200px)",
          }}
        >
          <PartnerCard
            partner={partner}
            index={index}
            inView={true}
          />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Partners — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerInView, setHeaderInView] = useState(false);
  const [useCarousel, setUseCarousel] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Check screen width for carousel mode
  useEffect(() => {
    const checkWidth = () => {
      setUseCarousel(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Get unique categories for display
  const categories = [...new Set(PARTNERS.map(p => p.category))];

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        @keyframes tooltip-fade {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .partners-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFFFF 100%);
          position: relative;
          overflow: hidden;
        }

        .partners-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,160,23,0.08), transparent);
        }

        .partners-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .partners-header {
          text-align: center;
          margin-bottom: clamp(32px, 5vh, 48px);
        }

        .partners-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .partners-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #D4A017;
          border-radius: 999px;
        }

        /* ── Eyebrow: Inter, uppercase, 0.18em ── */
        .partners-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        /* ── Heading: Manrope, 700-800 weight, -0.02em ── */
        .partners-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #111111;
          margin-bottom: 12px;
        }

        .partners-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .partners-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2));
          border-radius: 3px;
        }

        /* ── Supporting Text: Inter, 400 weight, 1.7 line-height ── */
        .partners-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
        }

        .partners-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Category Tags: Inter ── */
        .category-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: clamp(28px, 4vh, 40px);
        }

        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(10px, 0.8vw, 12px);
          font-weight: 500;
          color: #4a5568;
          background: rgba(255,255,255,0.7);
          padding: 4px 14px;
          border-radius: 50px;
          border: 1px solid rgba(0,0,0,0.04);
          backdrop-filter: blur(4px);
        }

        .category-tag svg {
          color: #D4A017;
          width: 14px;
          height: 14px;
        }

        /* ── Partners Grid ──────────────────────────────────────────────── */
        .partners-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(12px, 1.5vw, 20px);
          align-items: stretch;
        }

        .partner-card-wrapper {
          display: flex;
          height: 100%;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 4 columns */
        @media (max-width: 1024px) {
          .partners-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: clamp(12px, 1.8vw, 18px);
          }
        }

        /* Small Tablet: 3 columns */
        @media (max-width: 768px) {
          .partners-section {
            padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
          }
          .partners-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .partners-header h2 {
            font-size: 1.4rem;
          }
          .partners-header p {
            font-size: 13px;
          }
          .category-tags {
            gap: 6px;
          }
          .category-tag {
            font-size: 9px;
            padding: 3px 10px;
          }
        }

        /* Mobile: 2 columns */
        @media (max-width: 480px) {
          .partners-section {
            padding: 28px 12px 40px;
          }
          .partners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        /* ── Carousel Mode ───────────────────────────────────────────────── */
        .partners-carousel {
          position: relative;
          overflow: hidden;
        }

        .partners-carousel::before,
        .partners-carousel::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }

        .partners-carousel::before {
          left: 0;
          background: linear-gradient(90deg, rgba(255,248,230,0.9) 0%, transparent 100%);
        }

        .partners-carousel::after {
          right: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,248,230,0.9) 100%);
        }

        @media (max-width: 768px) {
          .partners-carousel::before,
          .partners-carousel::after {
            width: 30px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .partner-card-wrapper {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .partners-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .partner-card {
            transition: none !important;
          }
          .partner-card:hover {
            transform: none !important;
          }
          .partners-carousel .partner-card-wrapper {
            animation: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .partner-card {
            transform: none !important;
          }
          .partner-card:hover {
            transform: none !important;
          }
          .partner-card .partner-tooltip {
            display: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="partners-section"
        aria-labelledby="partners-heading"
        id="partners"
      >
        <div className="partners-container">
          {/* Section Header */}
          <div className="partners-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">Trusted By Global Partners</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="partners-heading">
                Our <span className="highlight">Trusted Partners</span>
              </h2>

              <p>
                We collaborate with leading airlines, hotels, and accreditation
                bodies to ensure you receive the highest quality service.
              </p>
            </div>
          </div>

          {/* Category Tags */}
          <div className="category-tags">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category] || Building2;
              return (
                <span key={category} className="category-tag">
                  <Icon size={14} />
                  {category}
                </span>
              );
            })}
          </div>

          {/* Partners Grid or Carousel */}
          {useCarousel ? (
            <div className="partners-carousel">
              <PartnerCarousel partners={PARTNERS} inView={inView} />
            </div>
          ) : (
            <div className="partners-grid">
              {PARTNERS.map((partner, index) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  index={index}
                  inView={inView}
                />
              ))}
            </div>
          )}

          {/* Bottom Divider */}
          <div
            style={{
              marginTop: "clamp(40px, 6vh, 56px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.08))",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(10px, 0.8vw, 12px)",
                fontWeight: 500,
                color: "rgba(0,0,0,0.2)",
              }}
            >
              <CheckCircle size={12} color="#D4A017" />
              <span>200+ Partners Worldwide</span>
            </div>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(212,160,23,0.08), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}