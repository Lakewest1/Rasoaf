// src/components/home/WhyChooseUs.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Why Choose Us Section
//
// A premium trust-building section that communicates the agency's credibility,
// professionalism, and commitment to customer satisfaction.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Section header + 4 feature cards in responsive grid
// Animation: Fade-up on scroll, hover lift with gold glow
// Responsive: 4 → 2 → 1 columns (desktop → tablet → mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import {
  Users,
  Shield,
  Headset,
  Compass,
} from "lucide-react";

// ── Feature Data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    id: 1,
    icon: Users,
    title: "Experienced Team",
    description:
      "Our knowledgeable travel specialists have years of experience organizing seamless Hajj, Umrah, and international travel experiences.",
    color: "#D4A017",
  },
  {
    id: 2,
    icon: Shield,
    title: "Transparent Pricing",
    description:
      "Clear, honest pricing with no hidden costs, giving you confidence and peace of mind when planning your journey.",
    color: "#D4A017",
  },
  {
    id: 3,
    icon: Headset,
    title: "End-to-End Support",
    description:
      "From consultation and visa processing to accommodation and return travel, we're with you every step of the way.",
    color: "#D4A017",
  },
  {
    id: 4,
    icon: Compass,
    title: "Personalized Guidance",
    description:
      "Receive tailored recommendations and dedicated assistance to match your unique travel needs and preferences.",
    color: "#D4A017",
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

// ── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ feature, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.08 * index;
  const Icon = feature.icon;

  return (
    <div
      className="feature-card-wrapper"
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
        className="feature-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "clamp(28px, 3vw, 40px) clamp(20px, 2.2vw, 28px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.10)"
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
            background: `linear-gradient(90deg, transparent, #D4A017, transparent)`,
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
            background: `radial-gradient(circle at 50% 40%, rgba(212,160,23,${hovered ? 0.05 : 0.02}), transparent 70%)`,
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
            width: "clamp(60px, 7vw, 80px)",
            height: "clamp(60px, 7vw, 80px)",
            borderRadius: "50%",
            background: hovered
              ? "linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))"
              : "rgba(212,160,23,0.06)",
            border: `1px solid ${hovered ? "rgba(212,160,23,0.25)" : "rgba(212,160,23,0.08)"}`,
            color: "#D4A017",
            marginBottom: "clamp(16px, 2vw, 24px)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: hovered ? "scale(1.08) rotate(-2deg)" : "scale(1) rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <Icon size={clamp(24, 28, 34)} strokeWidth={1.8} />
        </div>

        {/* ── Title: Manrope ── */}
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "clamp(8px, 1vw, 12px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {feature.title}
        </h3>

        {/* ── Description: Inter ── */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.85rem, 1vw, 0.95rem)",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.7,
            marginBottom: 0,
            flex: 1,
          }}
        >
          {feature.description}
        </p>

        {/* Bottom gold dot */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(16px, 2vw, 24px)",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#D4A017",
            opacity: hovered ? 1 : 0.15,
            transform: hovered ? "scale(1)" : "scale(0.6)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />

        {/* Gold shimmer - on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: `radial-gradient(circle at 50% 50%, rgba(212,160,23,0.03), transparent 70%)`,
              pointerEvents: "none",
              animation: "goldPulse 2s ease-in-out infinite",
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// WhyChooseUs — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const [sectionRef, inView] = useInView(0.12);
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
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        @keyframes goldPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .why-choose-section {
          padding: clamp(56px, 10vh, 96px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFDF5 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative elements */
        .why-choose-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 30%, rgba(212,160,23,0.04) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(212,160,23,0.04) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(212,160,23,0.02) 0%, transparent 30%);
          pointer-events: none;
          z-index: 0;
        }

        .why-choose-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .why-choose-header {
          text-align: center;
          margin-bottom: clamp(40px, 7vh, 64px);
        }

        .why-choose-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .why-choose-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #D4A017;
          border-radius: 999px;
        }

        /* ── Eyebrow: Inter, uppercase, 0.18em ── */
        .why-choose-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        /* ── Heading: Manrope, 700-800 weight, -0.02em ── */
        .why-choose-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #111111;
          margin-bottom: 12px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .why-choose-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .why-choose-header h2 .highlight::after {
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
        .why-choose-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
        }

        .why-choose-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Features Grid ─────────────────────────────────────────────── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(18px, 2vw, 28px);
          align-items: stretch;
        }

        .feature-card-wrapper {
          display: flex;
          height: 100%;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        @media (max-width: 768px) {
          .why-choose-section {
            padding: clamp(40px, 6vh, 56px) clamp(14px, 3vw, 20px);
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .why-choose-header h2 {
            font-size: 1.4rem;
          }
          .why-choose-header p {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .why-choose-section {
            padding: 32px 12px 44px;
          }
          .features-grid {
            gap: 14px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .feature-card-wrapper {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .why-choose-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .feature-card {
            transition: none !important;
          }
          .feature-card:hover {
            transform: none !important;
          }
          .goldPulse {
            animation: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .feature-card {
            transform: none !important;
          }
          .feature-card:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="why-choose-section"
        aria-labelledby="why-choose-heading"
        id="why-choose"
      >
        <div className="why-choose-container">
          {/* Section Header */}
          <div className="why-choose-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">Why Travelers Trust Us</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="why-choose-heading">
                Your Journey Deserves an{" "}
                <span className="highlight">Experienced and Caring</span>{" "}
                Travel Partner
              </h2>

              <p>
                We combine industry expertise, transparent service, and personalized
                support to ensure every pilgrimage and travel experience is smooth,
                comfortable, and memorable.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}