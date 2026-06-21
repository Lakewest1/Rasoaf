// src/components/home/ServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Services Grid
//
// A premium services showcase section that communicates the full range of
// travel solutions offered by the agency.
//
// Design: Yellow/warm backgrounds, black text, cream/white cards, gold accents
// Layout: Section header + 8 service cards in responsive grid
// Animation: Fade-up on scroll, hover lift with gold glow
// Responsive: 4×2 → 2×4 → 1×8 (desktop → tablet → mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import {
  Compass,
  Star,
  Shield,
  Plane,
  Hotel,
  Users,
  Heart,
  Globe,
  ArrowRight,
} from "lucide-react";

// ── Services Data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: Compass,
    title: "Hajj Packages",
    description:
      "Comprehensive pilgrimage packages with guided support, accommodation, transportation, and travel planning.",
    color: "#C4972A",
  },
  {
    id: 2,
    icon: Star,
    title: "Umrah Packages",
    description:
      "Flexible Umrah experiences designed for individuals, couples, and groups seeking comfort and convenience.",
    color: "#C4972A",
  },
  {
    id: 3,
    icon: Shield,
    title: "Visa Services",
    description:
      "Professional assistance with travel documentation and visa processing to simplify your journey.",
    color: "#C4972A",
  },
  {
    id: 4,
    icon: Plane,
    title: "Flights",
    description:
      "Competitive flight options and itinerary planning to ensure smooth and reliable travel.",
    color: "#C4972A",
  },
  {
    id: 5,
    icon: Hotel,
    title: "Hotels",
    description:
      "Carefully selected accommodations that balance comfort, location, and value.",
    color: "#C4972A",
  },
  {
    id: 6,
    icon: Users,
    title: "Group Travel",
    description:
      "Well-organized travel experiences for communities, organizations, and large groups.",
    color: "#C4972A",
  },
  {
    id: 7,
    icon: Heart,
    title: "Family Travel",
    description:
      "Family-friendly travel solutions tailored to create comfortable and memorable experiences for all ages.",
    color: "#C4972A",
  },
  {
    id: 8,
    icon: Globe,
    title: "International Tours",
    description:
      "Curated tours and vacation packages to exciting destinations around the world.",
    color: "#C4972A",
  },
];

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.12) {
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

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ service, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.06 * index;
  const Icon = service.icon;

  return (
    <div
      className="service-card-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        height: "100%",
      }}
    >
      <div
        className="service-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "clamp(24px, 2.8vw, 36px) clamp(18px, 2vw, 24px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hovered ? "rgba(196,151,42,0.30)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(196,151,42,0.10)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* Gold accent line - top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "3px",
            background: `linear-gradient(90deg, transparent, #C4972A, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
            opacity: hovered ? 1 : 0.3,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            borderRadius: "0 0 3px 3px",
          }}
          aria-hidden="true"
        />

        {/* Glow orb - subtle background */}
        <div
          style={{
            position: "absolute",
            width: "150%",
            height: "150%",
            top: "-25%",
            left: "-25%",
            background: `radial-gradient(circle at 50% 40%, rgba(196,151,42,${hovered ? 0.05 : 0.02}), transparent 70%)`,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        {/* Icon Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(52px, 6vw, 68px)",
            height: "clamp(52px, 6vw, 68px)",
            borderRadius: "16px",
            background: hovered
              ? "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))"
              : "rgba(196,151,42,0.06)",
            border: `1px solid ${hovered ? "rgba(196,151,42,0.25)" : "rgba(196,151,42,0.08)"}`,
            color: "#C4972A",
            marginBottom: "clamp(14px, 1.8vw, 20px)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1) rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <Icon size={clamp(22, 26, 30)} strokeWidth={1.8} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
            fontWeight: 700,
            color: "#0a0a2e",
            marginBottom: "clamp(6px, 0.8vw, 10px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(12px, 0.95vw, 13.5px)",
            fontWeight: 400,
            color: "#4a5568",
            lineHeight: 1.65,
            marginBottom: "clamp(12px, 1.5vw, 16px)",
            flex: 1,
          }}
        >
          {service.description}
        </p>

        {/* Arrow affordance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(11px, 0.85vw, 12px)",
            fontWeight: 600,
            color: hovered ? "#C4972A" : "rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
        >
          <span>Learn More</span>
          <ArrowRight
            size={14}
            style={{
              transition: "transform 0.3s ease",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          />
        </div>

        {/* Bottom gold dot */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(14px, 1.8vw, 20px)",
            right: "clamp(16px, 2vw, 24px)",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#C4972A",
            opacity: hovered ? 1 : 0.1,
            transform: hovered ? "scale(1)" : "scale(0.5)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ServicesGrid — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const [sectionRef, inView] = useInView(0.1);
  const [headerInView, setHeaderInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

        .services-section {
          padding: clamp(56px, 10vh, 96px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF9E6 0%, #FFFDF7 50%, #FAF5E8 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative elements */
        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 30%, rgba(196,151,42,0.04) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(196,151,42,0.04) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(196,151,42,0.02) 0%, transparent 30%);
          pointer-events: none;
          z-index: 0;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .services-header {
          text-align: center;
          margin-bottom: clamp(40px, 7vh, 60px);
        }

        .services-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .services-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #C4972A;
          border-radius: 999px;
        }

        .services-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(9px, 0.9vw, 11px);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C4972A;
        }

        .services-header h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #0a0a2e;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 12px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .services-header h2 .highlight {
          color: #C4972A;
          position: relative;
        }

        .services-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #C4972A, rgba(196,151,42,0.2));
          border-radius: 3px;
        }

        .services-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          color: #5a5a6a;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .services-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Services Grid ──────────────────────────────────────────────── */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(18px, 2vw, 24px);
          align-items: stretch;
        }

        .service-card-wrapper {
          display: flex;
          height: 100%;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 768px) {
          .services-section {
            padding: clamp(40px, 6vh, 56px) clamp(14px, 3vw, 20px);
          }
          .services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .services-header h2 {
            font-size: 1.4rem;
          }
          .services-header p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .services-section {
            padding: 32px 12px 44px;
          }
          .services-grid {
            gap: 14px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .service-card-wrapper {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .services-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .service-card {
            transition: none !important;
          }
          .service-card:hover {
            transform: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .service-card {
            transform: none !important;
          }
          .service-card:hover {
            transform: none !important;
          }
          .service-card .learn-more-arrow {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="services-section"
        aria-labelledby="services-heading"
        id="services"
      >
        <div className="services-container">
          {/* Section Header */}
          <div className="services-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">What We Offer</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="services-heading">
                Complete Travel Services for{" "}
                <span className="highlight">Every Journey</span>
              </h2>

              <p>
                Whether you're planning Hajj, Umrah, a family vacation, or an
                international adventure, our experienced team provides end-to-end
                travel solutions tailored to your needs.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                inView={inView}
              />
            ))}
          </div>

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
                background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.12))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C4972A",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(196,151,42,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}