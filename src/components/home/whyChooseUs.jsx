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
// Mobile: Carousel slider with auto-play and navigation
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Users,
  Shield,
  Headset,
  Compass,
  ChevronLeft,
  ChevronRight,
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
function FeatureCard({ feature, index, inView, isCarousel = false }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.08 * index;
  const Icon = feature.icon;

  return (
    <div
      className="feature-card-wrapper"
      style={{
        opacity: isCarousel ? 1 : (inView ? 1 : 0),
        transform: isCarousel ? "none" : (inView ? "translateY(0)" : "translateY(30px)"),
        transition: isCarousel ? "none" : `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        height: "100%",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <div
        className="feature-card"
        onMouseEnter={() => !isCarousel && setHovered(true)}
        onMouseLeave={() => !isCarousel && setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "clamp(28px, 3vw, 40px) clamp(20px, 2.2vw, 28px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: `1px solid ${hovered && !isCarousel ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: hovered && !isCarousel
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.10)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered && !isCarousel ? "translateY(-6px)" : "translateY(0)",
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
            transform: hovered && !isCarousel ? "scaleX(1)" : "scaleX(0.3)",
            opacity: hovered && !isCarousel ? 1 : 0.3,
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
            background: `radial-gradient(circle at 50% 40%, rgba(212,160,23,${hovered && !isCarousel ? 0.05 : 0.02}), transparent 70%)`,
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
            background: hovered && !isCarousel
              ? "linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))"
              : "rgba(212,160,23,0.06)",
            border: `1px solid ${hovered && !isCarousel ? "rgba(212,160,23,0.25)" : "rgba(212,160,23,0.10)"}`,
            color: "#D4A017",
            marginBottom: "clamp(16px, 2vw, 24px)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: hovered && !isCarousel ? "scale(1.08) rotate(-2deg)" : "scale(1) rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <Icon size={clamp(24, 28, 34)} strokeWidth={1.8} />
        </div>

        {/* Title: Manrope */}
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

        {/* Description: Inter */}
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
            opacity: hovered && !isCarousel ? 1 : 0.15,
            transform: hovered && !isCarousel ? "scale(1)" : "scale(0.6)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />

        {/* Gold shimmer - on hover */}
        {hovered && !isCarousel && (
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

// ── Carousel for Mobile ──────────────────────────────────────────────────────
function FeatureCarousel({ features, inView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalSlides = features.length;

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    let newIndex = index;
    
    if (index < 0) newIndex = totalSlides - 1;
    if (index >= totalSlides) newIndex = 0;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, totalSlides]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalSlides) {
      goToSlide(0);
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      goToSlide(totalSlides - 1);
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  // Auto-play - slides every 4 seconds
  useEffect(() => {
    if (isPaused || !inView) return;

    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, inView, goToNext]);

  // Pause on hover/touch
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  // Calculate translateX
  const translateX = -(currentIndex * (100 / totalSlides));

  return (
    <div
      className="feature-carousel"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        padding: "0 4px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        style={{
          display: "flex",
          transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          transform: `translateX(${translateX}%)`,
          width: `${totalSlides * 100}%`,
          willChange: "transform",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            style={{
              width: `${100 / totalSlides}%`,
              padding: "0 8px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <FeatureCard
              feature={feature}
              index={index}
              inView={inView}
              isCarousel={true}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="feature-carousel-nav feature-carousel-nav--prev"
        aria-label="Previous feature"
        style={{
          position: "absolute",
          left: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={goToNext}
        className="feature-carousel-nav feature-carousel-nav--next"
        aria-label="Next feature"
        style={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      {/* Dots Indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
          paddingBottom: "4px",
          flexWrap: "wrap",
        }}
      >
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: index === currentIndex ? "#D4A017" : "rgba(212,160,23,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        /* Subtle decorative elements - adjusted for white background */
        .why-choose-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 30%, rgba(212,160,23,0.03) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(212,160,23,0.03) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(212,160,23,0.015) 0%, transparent 30%);
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

        .why-choose-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

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

        /* ── Carousel ────────────────────────────────────────────────────── */
        .feature-carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
          display: none;
        }

        .feature-carousel-nav {
          transition: all 0.3s ease;
        }
        .feature-carousel-nav:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        /* Mobile: Carousel */
        @media (max-width: 768px) {
          .why-choose-section {
            padding: clamp(40px, 6vh, 56px) clamp(14px, 3vw, 20px);
          }
          .features-grid {
            display: none;
          }
          .feature-carousel {
            display: block !important;
          }
          .why-choose-header h2 {
            font-size: 1.4rem;
          }
          .why-choose-header p {
            font-size: 13px;
          }
        }

        @media (min-width: 769px) {
          .feature-carousel {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .why-choose-section {
            padding: 32px 12px 44px;
          }
          .feature-carousel-nav {
            width: 32px !important;
            height: 32px !important;
          }
          .feature-carousel-nav svg {
            width: 16px !important;
            height: 16px !important;
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
          .feature-carousel > div:first-child {
            transition: none !important;
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

          {/* ── Desktop/Tablet Grid ── */}
          <div className="features-grid">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                inView={inView}
                isCarousel={false}
              />
            ))}
          </div>

          {/* ── Mobile Carousel ── */}
          <FeatureCarousel features={FEATURES} inView={inView} />
        </div>
      </section>
    </>
  );
}