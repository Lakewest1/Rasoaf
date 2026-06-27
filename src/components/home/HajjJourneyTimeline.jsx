// src/components/home/HajjJourneyTimeline.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Hajj Journey Timeline
//
// A premium timeline section that visually explains the complete customer
// experience from consultation to returning home.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Section header + 7-step responsive timeline
// Animation: Fade-up on scroll, staggered reveal, connecting line animation
// Responsive: Horizontal (desktop) → 2-column (tablet) → Vertical (mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import {
  MessageCircle,
  FileText,
  Shield,
  Plane,
  MapPin,
  Compass,
  Home,
  CheckCircle,
} from "lucide-react";

// ── Timeline Data ──────────────────────────────────────────────────────────────
const TIMELINE_STEPS = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Consultation",
    description:
      "Meet with our travel specialists to discuss your goals, preferences, and package options.",
    color: "#D4A017",
  },
  {
    id: 2,
    icon: FileText,
    title: "Documentation",
    description:
      "Receive assistance in preparing passports, required paperwork, and travel documentation.",
    color: "#D4A017",
  },
  {
    id: 3,
    icon: Shield,
    title: "Visa Processing",
    description:
      "Our team manages your visa application and keeps you informed throughout the process.",
    color: "#D4A017",
  },
  {
    id: 4,
    icon: Plane,
    title: "Flight Booking",
    description:
      "We arrange convenient flights and travel logistics to ensure a smooth departure.",
    color: "#D4A017",
  },
  {
    id: 5,
    icon: MapPin,
    title: "Arrival",
    description:
      "Be welcomed at your destination with coordinated transfers and accommodation support.",
    color: "#D4A017",
  },
  {
    id: 6,
    icon: Compass,
    title: "Guided Pilgrimage",
    description:
      "Participate in your Hajj or Umrah with knowledgeable guidance and organized assistance.",
    color: "#D4A017",
  },
  {
    id: 7,
    icon: Home,
    title: "Return Home",
    description:
      "Travel home with confidence, knowing every detail has been professionally managed.",
    color: "#D4A017",
  },
];

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

// ── Timeline Step Component ──────────────────────────────────────────────────
function TimelineStep({ step, index, inView, totalSteps }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.08 * index;
  const Icon = step.icon;
  const isLast = index === totalSteps - 1;

  return (
    <div
      className={`timeline-step ${isLast ? "last" : ""}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        flex: 1,
        minWidth: 0,
        position: "relative",
      }}
    >
      <div
        className="timeline-step-content"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "clamp(20px, 2.2vw, 28px) clamp(16px, 1.8vw, 22px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
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
            left: "20%",
            right: "20%",
            height: "3px",
            background: `linear-gradient(90deg, transparent, #D4A017, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
            opacity: hovered ? 1 : 0.3,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            borderRadius: "0 0 3px 3px",
          }}
          aria-hidden="true"
        />

        {/* Step Number */}
        <div
          style={{
            position: "absolute",
            top: "clamp(8px, 1vw, 12px)",
            right: "clamp(12px, 1.5vw, 18px)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(10px, 0.9vw, 12px)",
            fontWeight: 700,
            color: hovered ? "#D4A017" : "rgba(0,0,0,0.08)",
            transition: "color 0.3s ease",
            letterSpacing: "0.05em",
          }}
        >
          {String(step.id).padStart(2, "0")}
        </div>

        {/* Icon Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(52px, 6vw, 68px)",
            height: "clamp(52px, 6vw, 68px)",
            borderRadius: "50%",
            background: hovered
              ? "linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))"
              : "rgba(212,160,23,0.06)",
            border: `1px solid ${hovered ? "rgba(212,160,23,0.25)" : "rgba(212,160,23,0.08)"}`,
            color: "#D4A017",
            marginBottom: "clamp(12px, 1.5vw, 18px)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: hovered ? "scale(1.06) rotate(-2deg)" : "scale(1) rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <Icon size={clamp(20, 24, 28)} strokeWidth={1.8} />
        </div>

        {/* ── Title: Manrope ── */}
        <h4
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "clamp(6px, 0.8vw, 10px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {step.title}
        </h4>

        {/* ── Description: Inter ── */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.75rem, 0.85vw, 0.85rem)",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.7,
            marginBottom: 0,
            flex: 1,
          }}
        >
          {step.description}
        </p>

        {/* Bottom gold dot */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(12px, 1.5vw, 18px)",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#D4A017",
            opacity: hovered ? 1 : 0.12,
            transform: hovered ? "scale(1)" : "scale(0.5)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Connector Line - Desktop */}
      {!isLast && (
        <div
          className="timeline-connector"
          style={{
            position: "absolute",
            top: "50%",
            right: "-50%",
            width: "100%",
            height: "2px",
            background: `linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2))`,
            transform: inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.08}s`,
            zIndex: 0,
            display: "none",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HajjJourneyTimeline — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function HajjJourneyTimeline() {
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
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .timeline-section {
          padding: clamp(56px, 10vh, 96px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFDF5 100%);
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative elements */
        .timeline-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 40%, rgba(212,160,23,0.04) 0%, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(212,160,23,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .timeline-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .timeline-header {
          text-align: center;
          margin-bottom: clamp(40px, 7vh, 60px);
        }

        .timeline-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .timeline-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #D4A017;
          border-radius: 999px;
        }

        /* ── Eyebrow: Inter, uppercase, 0.18em ── */
        .timeline-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        /* ── Heading: Manrope, 700-800 weight, -0.02em ── */
        .timeline-header h2 {
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

        .timeline-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .timeline-header h2 .highlight::after {
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
        .timeline-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 560px;
          margin: 0 auto;
        }

        .timeline-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Timeline Grid ──────────────────────────────────────────────── */
        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: clamp(12px, 1.5vw, 20px);
          align-items: stretch;
          position: relative;
        }

        /* Desktop connector line (behind cards) */
        .timeline-grid::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 5%;
          right: 5%;
          height: 2px;
          background: linear-gradient(90deg, 
            #D4A017 0%, 
            #D4A017 14%, 
            rgba(212,160,23,0.3) 14%,
            rgba(212,160,23,0.3) 16%,
            #D4A017 16%,
            #D4A017 30%,
            rgba(212,160,23,0.3) 30%,
            rgba(212,160,23,0.3) 32%,
            #D4A017 32%,
            #D4A017 46%,
            rgba(212,160,23,0.3) 46%,
            rgba(212,160,23,0.3) 48%,
            #D4A017 48%,
            #D4A017 62%,
            rgba(212,160,23,0.3) 62%,
            rgba(212,160,23,0.3) 64%,
            #D4A017 64%,
            #D4A017 78%,
            rgba(212,160,23,0.3) 78%,
            rgba(212,160,23,0.3) 80%,
            #D4A017 80%,
            #D4A017 94%,
            rgba(212,160,23,0.3) 94%
          );
          transform: scaleX(${inView ? 1 : 0});
          transform-origin: left;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
          z-index: 0;
          pointer-events: none;
        }

        .timeline-step {
          display: flex;
          position: relative;
          z-index: 1;
        }

        .timeline-step-content {
          width: 100%;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2-column with connector line on left */
        @media (max-width: 1024px) {
          .timeline-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(16px, 2vw, 24px);
          }
          .timeline-grid::before {
            display: none;
          }
          /* Show connector dots on tablet */
          .timeline-step:not(:last-child)::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 12px;
            background: linear-gradient(180deg, #D4A017, rgba(212,160,23,0.2));
            opacity: ${inView ? 1 : 0};
            transition: opacity 0.6s ease 0.6s;
          }
        }

        /* Mobile: Single-column vertical timeline */
        @media (max-width: 768px) {
          .timeline-section {
            padding: clamp(40px, 6vh, 56px) clamp(14px, 3vw, 20px);
          }
          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .timeline-grid::before {
            display: none;
          }
          .timeline-header h2 {
            font-size: 1.4rem;
          }
          .timeline-header p {
            font-size: 13px;
          }
          .timeline-step:not(:last-child)::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 12px;
            background: linear-gradient(180deg, #D4A017, rgba(212,160,23,0.2));
            opacity: ${inView ? 1 : 0};
            transition: opacity 0.6s ease 0.6s;
          }
        }

        @media (max-width: 480px) {
          .timeline-section {
            padding: 32px 12px 44px;
          }
          .timeline-grid {
            gap: 14px;
          }
          .timeline-step:not(:last-child)::after {
            height: 10px;
            bottom: -10px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .timeline-step {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .timeline-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .timeline-grid::before {
            transform: scaleX(1) !important;
            transition: none !important;
          }
          .timeline-step::after {
            opacity: 1 !important;
            transition: none !important;
          }
          .timeline-step-content {
            transition: none !important;
          }
          .timeline-step-content:hover {
            transform: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .timeline-step-content {
            transform: none !important;
          }
          .timeline-step-content:hover {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="timeline-section"
        aria-labelledby="timeline-heading"
        id="journey-timeline"
      >
        <div className="timeline-container">
          {/* Section Header */}
          <div className="timeline-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">How It Works</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="timeline-heading">
                Your Hajj &amp; Umrah Journey in{" "}
                <span className="highlight">Simple Steps</span>
              </h2>

              <p>
                From your first consultation to your safe return home, our experienced
                team guides you through every stage of your pilgrimage with care,
                transparency, and dedicated support.
              </p>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="timeline-grid">
            {TIMELINE_STEPS.map((step, index) => (
              <TimelineStep
                key={step.id}
                step={step}
                index={index}
                inView={inView}
                totalSteps={TIMELINE_STEPS.length}
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
                background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.12))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#D4A017",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(212,160,23,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}