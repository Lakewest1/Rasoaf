// src/components/home/ServicesGrid.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Services Grid
//
// A premium services showcase section that communicates the full range of
// travel solutions offered by the agency.
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: Section header + 8 service cards in responsive grid
// Animation: Fade-up on scroll, hover lift with gold glow
// Responsive: 4×2 → 2×4 → Carousel (desktop → tablet → mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── Services Data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 1,
    icon: Compass,
    title: "Hajj Packages",
    description:
      "Comprehensive pilgrimage packages with guided support, accommodation, transportation, and travel planning.",
    color: "#D4A017",
    route: "/hajj/packages/hajj",
  },
  {
    id: 2,
    icon: Star,
    title: "Umrah Packages",
    description:
      "Flexible Umrah experiences designed for individuals, couples, and groups seeking comfort and convenience.",
    color: "#D4A017",
    route: "/hajj/packages/umrah",
  },
  {
    id: 3,
    icon: Shield,
    title: "Visa Services",
    description:
      "Professional assistance with travel documentation and visa processing to simplify your journey.",
    color: "#D4A017",
    route: "/travel/student-visa",
  },
  {
    id: 4,
    icon: Plane,
    title: "Flights",
    description:
      "Competitive flight options and itinerary planning to ensure smooth and reliable travel.",
    color: "#D4A017",
    route: "/hajj/flight-booking",
  },
  {
    id: 5,
    icon: Hotel,
    title: "Hotels",
    description:
      "Carefully selected accommodations that balance comfort, location, and value.",
    color: "#D4A017",
    route: "/hajj/hotel-reservation",
  },
  {
    id: 6,
    icon: Users,
    title: "Group Travel",
    description:
      "Well-organized travel experiences for communities, organizations, and large groups.",
    color: "#D4A017",
    route: "/hajj/packages/hajj",
  },
  {
    id: 7,
    icon: Heart,
    title: "Family Travel",
    description:
      "Family-friendly travel solutions tailored to create comfortable and memorable experiences for all ages.",
    color: "#D4A017",
    route: "/travel/family-visa",
  },
  {
    id: 8,
    icon: Globe,
    title: "International Tours",
    description:
      "Curated tours and vacation packages to exciting destinations around the world.",
    color: "#D4A017",
    route: "/travel/tourist-visa",
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
function ServiceCard({ service, index, inView, isCarousel = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.06 * index;
  const Icon = service.icon;

  return (
    <div
      className="service-card-wrapper"
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
        className="service-card"
        onMouseEnter={() => !isCarousel && setHovered(true)}
        onMouseLeave={() => !isCarousel && setHovered(false)}
        onClick={onClick}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "clamp(24px, 2.8vw, 36px) clamp(18px, 2vw, 24px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hovered && !isCarousel ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: hovered && !isCarousel
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.10)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered && !isCarousel ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
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
            width: "clamp(52px, 6vw, 68px)",
            height: "clamp(52px, 6vw, 68px)",
            borderRadius: "16px",
            background: hovered && !isCarousel
              ? "linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.05))"
              : "rgba(212,160,23,0.06)",
            border: `1px solid ${hovered && !isCarousel ? "rgba(212,160,23,0.25)" : "rgba(212,160,23,0.08)"}`,
            color: "#D4A017",
            marginBottom: "clamp(14px, 1.8vw, 20px)",
            transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
            transform: hovered && !isCarousel ? "scale(1.06) rotate(-2deg)" : "scale(1) rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <Icon size={clamp(22, 26, 30)} strokeWidth={1.8} />
        </div>

        {/* Title: Manrope */}
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
            fontWeight: 700,
            color: "#111111",
            marginBottom: "clamp(6px, 0.8vw, 10px)",
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          {service.title}
        </h3>

        {/* Description: Inter */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.8rem, 0.9vw, 0.9rem)",
            fontWeight: 400,
            color: "#5F5F5F",
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
            fontSize: "clamp(0.7rem, 0.8vw, 0.8rem)",
            fontWeight: 600,
            color: hovered && !isCarousel ? "#D4A017" : "rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
        >
          <span>Learn More</span>
          <ArrowRight
            size={14}
            style={{
              transition: "transform 0.3s ease",
              transform: hovered && !isCarousel ? "translateX(4px)" : "translateX(0)",
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
            background: "#D4A017",
            opacity: hovered && !isCarousel ? 1 : 0.1,
            transform: hovered && !isCarousel ? "scale(1)" : "scale(0.5)",
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

// ── Carousel for Smaller Screens ────────────────────────────────────────────
function ServiceCarousel({ services, inView, onCardClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);
  const totalSlides = services.length;

  // Get visible slides count based on screen width
  const getSlidesPerView = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 480) return 1;
    if (window.innerWidth < 768) return 1;
    return 1;
  };

  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView());
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

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

  // Auto-play
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

  // Calculate translateX based on slidesPerView
  const translateX = -(currentIndex * (100 / totalSlides));

  return (
    <div
      ref={containerRef}
      className="services-carousel"
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
        {services.map((service, index) => (
          <div
            key={service.id}
            style={{
              width: `${100 / totalSlides}%`,
              padding: "0 8px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <ServiceCard
              service={service}
              index={index}
              inView={inView}
              isCarousel={true}
              onClick={() => onCardClick(service.route)}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="carousel-nav carousel-nav--prev"
        aria-label="Previous service"
        style={{
          position: "absolute",
          left: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
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
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      <button
        onClick={goToNext}
        className="carousel-nav carousel-nav--next"
        aria-label="Next service"
        style={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
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
        <ChevronRight size={20} strokeWidth={2.5} />
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
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "28px" : "8px",
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
// ServicesGrid — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const [sectionRef, inView] = useInView(0.1);
  const [headerInView, setHeaderInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

  const handleCardClick = (route) => {
    if (route) {
      navigate(route);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .services-section {
          padding: clamp(56px, 10vh, 96px) clamp(16px, 4vw, 48px);
          background: #ffffff;
          position: relative;
          overflow: hidden;
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
          background: #D4A017;
          border-radius: 999px;
        }

        .services-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
        }

        .services-header h2 {
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

        .services-header h2 .highlight {
          color: #D4A017;
          position: relative;
        }

        .services-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2));
          border-radius: 3px;
        }

        .services-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 560px;
          margin: 0 auto;
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

        /* ── Carousel Styles ────────────────────────────────────────────── */
        .services-carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .services-carousel .carousel-nav {
          transition: all 0.3s ease;
        }

        .services-carousel .carousel-nav:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        /* Mobile: Carousel */
        @media (max-width: 767px) {
          .services-section {
            padding: clamp(40px, 6vh, 56px) clamp(14px, 3vw, 20px);
          }
          .services-grid {
            display: none;
          }
          .services-header h2 {
            font-size: 1.4rem;
          }
          .services-header p {
            font-size: 13px;
          }
          .services-carousel {
            display: block !important;
          }
        }

        /* Desktop: Hide carousel */
        @media (min-width: 768px) {
          .services-carousel {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .services-section {
            padding: 32px 12px 44px;
          }
          .carousel-nav {
            width: 34px !important;
            height: 34px !important;
          }
          .carousel-nav svg {
            width: 16px !important;
            height: 16px !important;
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
          .services-carousel > div:first-child {
            transition: none !important;
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

          {/* ── Desktop Grid ── */}
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                inView={inView}
                isCarousel={false}
                onClick={() => handleCardClick(service.route)}
              />
            ))}
          </div>

          {/* ── Mobile Carousel ── */}
          <ServiceCarousel
            services={SERVICES}
            inView={inView}
            onCardClick={handleCardClick}
          />

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