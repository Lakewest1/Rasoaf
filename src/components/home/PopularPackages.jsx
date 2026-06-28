// src/components/home/PopularPackages.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Popular Packages Section
// v5 — Mobile Carousel with RTL sliding, white background, yellow cards
//   • Manrope for headings · Inter for body · Yellow/Black brand
//   • Desktop: 4-column grid
//   • Mobile: Carousel with RTL sliding (right to left)
//   • Card background: Yellow (#FFF8E6)
//   • Section background: White
//   • Auto-play delay: 5 seconds per slide
//   • Trust items in LTR marquee
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  gold:       "#D4A017",
  goldLight:  "#F7C948",
  goldDeep:   "#B8860B",
  goldPale:   "#FFF8E6",
  goldFaint:  "#FFFBEF",
  goldGlow:   "rgba(212,160,23,0.18)",
  ink:        "#111111",
  inkSoft:    "#2d3748",
  inkMuted:   "#5F5F5F",
  white:      "#FFFFFF",
  cream:      "#FFFBEF",
  borderGold: "rgba(212,160,23,0.22)",
  borderCard: "rgba(212,160,23,0.14)",
};

// ── Package data ──────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "economy-umrah",
    badge: "Best Value",
    badgeDark: true,
    title: "Economy Umrah",
    tagline: "A blessed journey within reach",
    description:
      "Everything you need for a meaningful Umrah pilgrimage, carefully arranged to deliver comfort and peace of mind at an accessible price.",
    duration: "10 Days",
    icon: "🕌",
    inclusions: [
      "Return Flights",
      "Hotel Accommodation",
      "Visa Processing",
      "Ground Transportation",
      "Guided Support",
    ],
    cta: "Inquire Now",
    ctaStyle: "outline",
  },
  {
    id: "premium-umrah",
    badge: "Most Popular",
    badgeDark: false,
    title: "Premium Umrah",
    tagline: "Elevated comfort, deeper devotion",
    description:
      "Stay in superior hotels steps from the Haram, with dedicated guides and premium services that let you focus entirely on worship.",
    duration: "12 Days",
    icon: "✨",
    inclusions: [
      "Return Flights",
      "5-Star Hotel Accommodation",
      "Visa Processing",
      "Private Ground Transportation",
      "24/7 Guided Support",
    ],
    cta: "Inquire Now",
    ctaStyle: "filled",
    featured: true,
  },
  {
    id: "vip-hajj",
    badge: "Recommended",
    badgeDark: true,
    title: "VIP Hajj",
    tagline: "The full Hajj experience, without compromise",
    description:
      "Our signature Hajj package offers luxury accommodation in Makkah and Madinah, private transport, and a dedicated scholar-guide throughout.",
    duration: "21 Days",
    icon: "🌙",
    inclusions: [
      "Return Flights",
      "Luxury Hotel Accommodation",
      "Visa & Documentation",
      "Private Transportation",
      "Scholar-Led Guided Support",
    ],
    cta: "Learn More",
    ctaStyle: "outline",
  },
  {
    id: "family-packages",
    badge: "Family Friendly",
    badgeDark: true,
    title: "Family Packages",
    tagline: "A sacred journey for the whole family",
    description:
      "Specially designed to accommodate families with children — spacious rooms, family-friendly itineraries, and personal support at every step.",
    duration: "14 Days",
    icon: "🤲",
    inclusions: [
      "Return Flights",
      "Family Room Accommodation",
      "Visa Processing",
      "Family Ground Transportation",
      "Dedicated Family Guide",
    ],
    cta: "Inquire Now",
    ctaStyle: "outline",
  },
];

const TRUST_ITEMS = [
  { icon: "✈️", text: "IATA Accredited Agency" },
  { icon: "🛡️", text: "Fully Bonded & Insured" },
  { icon: "📞", text: "24/7 Pilgrim Support Line" },
  { icon: "⭐", text: "10,000+ Satisfied Pilgrims" },
];

// ── Package Card ──────────────────────────────────────────────────────────────
function PackageCard({ pkg, isCarousel = false }) {
  const [hovered, setHovered] = useState(false);
  const ctaClass =
    pkg.ctaStyle === "filled" ? "pp-card__cta--filled" : "pp-card__cta--outline";

  const handleCta = () => {
    const el =
      document.getElementById("booking") ||
      document.getElementById("contact") ||
      document.getElementById("contactSection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article
      className={`pp-card${pkg.featured ? " pp-card--featured" : ""}`}
      aria-label={`${pkg.title} — ${pkg.duration} package`}
      onMouseEnter={() => !isCarousel && setHovered(true)}
      onMouseLeave={() => !isCarousel && setHovered(false)}
      style={{
        background: "#FFF8E6",
        borderRadius: "20px",
        border: `1px solid ${hovered && !isCarousel ? "rgba(212,160,23,0.30)" : "rgba(212,160,23,0.14)"}`,
        boxShadow: hovered && !isCarousel
          ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.10)"
          : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        transform: hovered && !isCarousel ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Slanted ribbon badge */}
      <div className={`pp-card__badge${pkg.badgeDark ? " pp-card__badge--dark" : ""}`}>
        {pkg.badge}
      </div>

      <div className="pp-card__icon-wrap" aria-hidden="true">
        {pkg.icon}
      </div>

      <div className="pp-card__body">
        <span className="pp-card__duration">
          <ClockIcon />
          {pkg.duration}
        </span>

        <h3 className="pp-card__title">{pkg.title}</h3>
        <p className="pp-card__tagline">{pkg.tagline}</p>
        <p className="pp-card__desc">{pkg.description}</p>

        <div className="pp-card__divider" aria-hidden="true" />

        <ul className="pp-card__inclusions" aria-label={`What's included in ${pkg.title}`}>
          {pkg.inclusions.map((item) => (
            <li key={item} className="pp-card__inclusion">
              <span className="pp-card__check" aria-hidden="true">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="pp-card__footer">
          <button
            type="button"
            className={ctaClass}
            aria-label={`${pkg.cta} — ${pkg.title}`}
            onClick={handleCta}
          >
            {pkg.cta}
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Carousel for Mobile ──────────────────────────────────────────────────────
function PackageCarousel({ packages, inView }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalSlides = packages.length;

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

  // Auto-play - slides right to left every 5 seconds
  useEffect(() => {
    if (isPaused || !inView) return;

    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 5000);

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

  // Calculate translateX for RTL sliding (right to left)
  const translateX = -(currentIndex * (100 / totalSlides));

  return (
    <div
      className="pp-carousel"
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
      {/* Slides Container - RTL sliding */}
      <div
        style={{
          display: "flex",
          transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          transform: `translateX(${translateX}%)`,
          width: `${totalSlides * 100}%`,
          willChange: "transform",
          direction: "ltr",
        }}
      >
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            style={{
              width: `${100 / totalSlides}%`,
              padding: "0 8px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <PackageCard pkg={pkg} isCarousel={true} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        className="pp-carousel-nav pp-carousel-nav--prev"
        aria-label="Previous package"
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
        className="pp-carousel-nav pp-carousel-nav--next"
        aria-label="Next package"
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
        {packages.map((_, index) => (
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

// ── Trust Marquee ────────────────────────────────────────────────────────────
function TrustMarquee() {
  // Duplicate items for seamless loop
  const doubledItems = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <div
      className="pp-trust-marquee"
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        padding: "16px 0",
        background: "linear-gradient(135deg, #FFF8E6, #FFFBEF)",
        borderTop: "1px solid rgba(212,160,23,0.1)",
        borderBottom: "1px solid rgba(212,160,23,0.1)",
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className="pp-trust-track"
        style={{
          display: "flex",
          gap: "clamp(32px, 5vw, 60px)",
          width: "max-content",
          animation: "trustMarquee 25s linear infinite",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {doubledItems.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="pp-trust-marquee-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.85rem, 1vw, 1rem)",
              fontWeight: 500,
              color: "#2d3748",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #FFF8E6, #FFFBEF)",
                borderRadius: "50%",
                border: "1px solid rgba(212,160,23,0.2)",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes trustMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .pp-trust-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .pp-trust-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Helper Icons ──────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <polyline points="2,6.5 4.8,9 10,3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PopularPackages — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function PopularPackages() {
  const sectionRef       = useRef(null);
  const bannerContentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = bannerContentRef.current;
    if (!section || !content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    section.classList.add("pp-anim-ready");

    const els = content.querySelectorAll(
      ".pp-banner__eyebrow, .pp-banner__heading, .pp-banner__subtext, .pp-banner__actions"
    );

    const timer = setTimeout(() => {
      els.forEach((el) => el.classList.add("pp-visible"));
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  const scrollToPackages = () => {
    document
      .querySelector(".pp-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    const el =
      document.getElementById("booking") ||
      document.getElementById("contact") ||
      document.getElementById("contactSection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        /* ── Rasoaf Design System Typography ── */
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        /* ── Section ── */
        .pp-section {
          width: 100%;
          background: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #111111;
        }

        /* ── Remove background on smaller screens ── */
        @media (max-width: 768px) {
          .pp-section {
            background: transparent;
          }
        }
        @media (max-width: 480px) {
          .pp-section {
            background: transparent;
          }
        }

        /* ── Banner ── */
        .pp-banner {
          position: relative;
          width: 100%;
          height: clamp(300px, 42vw, 440px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Moderate banner height on mobile ── */
        @media (max-width: 768px) {
          .pp-banner {
            height: clamp(400px, 55vh, 480px);
          }
        }
        @media (max-width: 480px) {
          .pp-banner {
            height: clamp(420px, 60vh, 500px);
          }
        }
        @media (max-width: 380px) {
          .pp-banner {
            height: clamp(440px, 65vh, 520px);
          }
        }

        .pp-banner__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }

        /* ── Adjust image position on smaller screens ── */
        @media (max-width: 768px) {
          .pp-banner__img {
            object-position: center 20%;
            transform: scale(1.05);
            transform-origin: center top;
          }
        }
        @media (max-width: 480px) {
          .pp-banner__img {
            object-position: center 15%;
            transform: scale(1.08);
            transform-origin: center top;
          }
        }

        .pp-banner__overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(17,11,4,0.55) 0%, rgba(17,11,4,0.28) 40%, rgba(17,11,4,0.72) 100%),
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,160,23,0.22) 0%, transparent 65%);
          z-index: 1;
        }
        .pp-banner__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: clamp(24px, 5vw, 48px) clamp(20px, 6vw, 80px);
          max-width: 760px;
          width: 100%;
        }

        .pp-banner__eyebrow,
        .pp-banner__heading,
        .pp-banner__subtext,
        .pp-banner__actions {
          opacity: 1;
          transform: none;
        }
        .pp-section.pp-anim-ready .pp-banner__eyebrow,
        .pp-section.pp-anim-ready .pp-banner__heading,
        .pp-section.pp-anim-ready .pp-banner__subtext,
        .pp-section.pp-anim-ready .pp-banner__actions {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .pp-section.pp-anim-ready .pp-banner__eyebrow.pp-visible  { opacity: 1; transform: none; transition-delay: 0.05s; }
        .pp-section.pp-anim-ready .pp-banner__heading.pp-visible  { opacity: 1; transform: none; transition-delay: 0.18s; }
        .pp-section.pp-anim-ready .pp-banner__subtext.pp-visible  { opacity: 1; transform: none; transition-delay: 0.32s; }
        .pp-section.pp-anim-ready .pp-banner__actions.pp-visible  { opacity: 1; transform: none; transition-delay: 0.46s; }

        .pp-banner__eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F7C948;
          margin-bottom: clamp(8px, 1.2vw, 14px);
          display: block;
        }

        /* ── Add margin-top to "Travel With Confidence" on smaller screens ── */
        @media (max-width: 768px) {
          .pp-banner__eyebrow {
            margin-top: clamp(16px, 3vh, 24px);
          }
        }
        @media (max-width: 480px) {
          .pp-banner__eyebrow {
            margin-top: clamp(12px, 2vh, 20px);
          }
        }

        .pp-banner__heading {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.9rem, 5vw, 3.4rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin: 0 0 clamp(12px, 2vw, 20px);
        }
        .pp-banner__heading em {
          font-style: italic;
          font-weight: 700;
          color: #F7C948;
        }

        .pp-banner__subtext {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.88rem, 1.2vw, 1.05rem);
          font-weight: 400;
          line-height: 1.7;
          color: rgba(255,255,255,0.80);
          max-width: 560px;
          margin: 0 auto clamp(20px, 3.5vw, 32px);
        }

        .pp-banner__actions {
          display: flex;
          gap: clamp(10px, 2vw, 16px);
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ── Make buttons stack on mobile ── */
        @media (max-width: 480px) {
          .pp-banner__actions {
            flex-direction: column;
            gap: 10px;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }

        .pp-btn--primary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
          color: #111111;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1vw, 0.95rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
          border-radius: 100px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.22s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 12px rgba(212,160,23,0.35);
          white-space: nowrap;
        }
        .pp-btn--primary:hover { background: #F7C948; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,160,23,0.45); }
        .pp-btn--primary:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }

        /* ── Make buttons full width on mobile ── */
        @media (max-width: 480px) {
          .pp-btn--primary,
          .pp-btn--ghost {
            width: 100%;
            justify-content: center;
            padding: 12px 20px;
            font-size: 0.85rem;
            white-space: normal;
          }
        }

        .pp-btn--ghost {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          color: #FFFFFF;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1vw, 0.95rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
          border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.55);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
          white-space: nowrap;
        }
        .pp-btn--ghost:hover { border-color: #F7C948; background: rgba(247,201,72,0.10); color: #F7C948; }
        .pp-btn--ghost:focus-visible { outline: 2px solid #F7C948; outline-offset: 3px; }

        /* ── Make ghost button more visible on mobile ── */
        @media (max-width: 480px) {
          .pp-btn--ghost {
            border-color: rgba(255,255,255,0.7);
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
          }
          .pp-btn--ghost:hover {
            background: rgba(247,201,72,0.15);
          }
        }

        /* ── Grid section ── */
        .pp-grid-section {
          padding: clamp(52px, 9vw, 96px) clamp(20px, 5vw, 48px);
          max-width: 1280px;
          margin: 0 auto;
        }
        .pp-grid-header {
          text-align: center;
          margin-bottom: clamp(36px, 6vw, 60px);
        }

        .pp-section-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
          display: block;
          margin-bottom: 12px;
        }

        .pp-section-heading {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.7rem, 3.5vw, 2.6rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #111111;
          margin: 0 0 14px;
        }
        .pp-section-heading em { font-style: italic; font-weight: 700; color: #D4A017; }

        .pp-section-desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.88rem, 1.1vw, 1rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ── Grid ── */
        .pp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(14px, 2.2vw, 24px);
          align-items: stretch;
        }

        /* ── Card ── */
        .pp-card {
          background: #FFF8E6;
          border-radius: 20px;
          border: 1px solid rgba(212,160,23,0.14);
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .pp-card__badge {
          position: absolute;
          top: 20px;
          right: -30px;
          width: 128px;
          background: #D4A017;
          color: #111111;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-align: center;
          padding: 5px 0;
          transform: rotate(38deg);
          box-shadow: 0 2px 8px rgba(0,0,0,0.14);
          pointer-events: none;
          z-index: 2;
        }
        .pp-card__badge--dark { background: #2d3748; color: #F7C948; }

        .pp-card--featured { border-color: rgba(212,160,23,0.35); }
        .pp-card--featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4A017, transparent);
          z-index: 1;
        }

        .pp-card__icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #FFFBEF, #FFF8E6);
          border-radius: 16px;
          border: 1px solid rgba(212,160,23,0.22);
          font-size: 28px;
          margin: clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px) 0;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .pp-card:hover .pp-card__icon-wrap { transform: scale(1.07) rotate(-3deg); }

        .pp-card__body {
          padding: clamp(14px, 2.2vw, 20px) clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pp-card__duration {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4A017;
          background: rgba(212,160,23,0.10);
          border: 1px solid rgba(212,160,23,0.20);
          border-radius: 100px;
          padding: 3px 10px;
          margin-bottom: 10px;
          width: fit-content;
        }

        .pp-card__title {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: clamp(1.1rem, 1.6vw, 1.3rem);
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #111111;
          margin: 0 0 4px;
        }

        .pp-card__tagline {
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 0.9vw, 12.5px);
          font-weight: 400;
          font-style: italic;
          color: #D4A017;
          margin: 0 0 10px;
          line-height: 1.4;
        }

        .pp-card__desc {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.82rem, 0.95vw, 0.88rem);
          font-weight: 400;
          line-height: 1.7;
          color: #5F5F5F;
          margin: 0 0 clamp(14px, 2vw, 18px);
        }
        .pp-card__divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,160,23,0.22), transparent);
          margin-bottom: clamp(12px, 1.8vw, 16px);
          flex-shrink: 0;
        }

        .pp-card__inclusions {
          list-style: none;
          padding: 0;
          margin: 0 0 clamp(18px, 3vw, 22px);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .pp-card__inclusion {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 0.85vw, 12.5px);
          font-weight: 450;
          color: #2d3748;
          line-height: 1.4;
        }
        .pp-card__check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          background: linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.08));
          border-radius: 50%;
          border: 1px solid rgba(212,160,23,0.28);
          flex-shrink: 0;
        }
        .pp-card__check svg {
          width: 9px;
          height: 9px;
          stroke: #D4A017;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .pp-card__footer { margin-top: auto; }

        .pp-card__cta--filled {
          display: block;
          width: 100%;
          padding: clamp(10px, 1.5vw, 12px) 0;
          background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
          color: #111111;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 0.95vw, 0.95rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          text-align: center;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.22s ease, box-shadow 0.25s ease;
          box-shadow: 0 2px 10px rgba(212,160,23,0.28);
        }
        .pp-card__cta--filled:hover { background: #F7C948; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212,160,23,0.38); }
        .pp-card__cta--filled:focus-visible { outline: 2px solid #D4A017; outline-offset: 3px; }

        .pp-card__cta--outline {
          display: block;
          width: 100%;
          padding: clamp(10px, 1.5vw, 12px) 0;
          background: transparent;
          color: #2d3748;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 0.95vw, 0.95rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          text-align: center;
          border: 1.5px solid rgba(212,160,23,0.22);
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .pp-card__cta--outline:hover { border-color: #D4A017; background: rgba(212,160,23,0.07); }
        .pp-card__cta--outline:focus-visible { outline: 2px solid #D4A017; outline-offset: 3px; }

        /* ── Trust Marquee ── */
        .pp-trust-marquee {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 16px 0;
          background: linear-gradient(135deg, #FFF8E6, #FFFBEF);
          border-top: 1px solid rgba(212,160,23,0.1);
          border-bottom: 1px solid rgba(212,160,23,0.1);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .pp-trust-track {
          display: flex;
          gap: clamp(32px, 5vw, 60px);
          width: max-content;
          animation: trustMarquee 25s linear infinite;
          align-items: center;
          padding: 0 20px;
        }

        .pp-trust-track:hover {
          animation-play-state: paused;
        }

        .pp-trust-marquee-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1vw, 1rem);
          font-weight: 500;
          color: #2d3748;
          white-space: nowrap;
        }

        .pp-trust-marquee-item .trust-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #FFF8E6, #FFFBEF);
          border-radius: 50%;
          border: 1px solid rgba(212,160,23,0.2);
          font-size: 18px;
          flex-shrink: 0;
        }

        @keyframes trustMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── Banner image position adjustments ── */
        @media (max-width: 1024px) and (min-width: 769px) {
          .pp-banner__img { object-position: center 30%; }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) { .pp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pp-grid { display: none; } }
        @media (max-width: 600px) { .pp-grid-section { padding-left: 16px; padding-right: 16px; } }

        /* ── Carousel ── */
        .pp-carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
          display: none;
        }

        .pp-carousel-nav {
          transition: all 0.3s ease;
        }
        .pp-carousel-nav:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        @media (max-width: 600px) {
          .pp-carousel {
            display: block !important;
          }
        }
        @media (min-width: 601px) {
          .pp-carousel {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .pp-carousel-nav {
            width: 34px !important;
            height: 34px !important;
          }
          .pp-carousel-nav svg {
            width: 16px !important;
            height: 16px !important;
          }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pp-section.pp-anim-ready .pp-banner__eyebrow,
          .pp-section.pp-anim-ready .pp-banner__heading,
          .pp-section.pp-anim-ready .pp-banner__subtext,
          .pp-section.pp-anim-ready .pp-banner__actions {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .pp-card { transition: none !important; }
          .pp-card:hover { transform: none !important; }
          .pp-card:hover .pp-card__icon-wrap { transform: none !important; }
          .pp-btn--primary:hover,
          .pp-btn--ghost:hover,
          .pp-card__cta--filled:hover { transform: none !important; }
          .pp-banner__img { transform: none !important; }
          .pp-carousel > div:first-child { transition: none !important; }
          .pp-trust-track { animation: none !important; }
        }
      `}</style>

      <section
        className="pp-section"
        ref={sectionRef}
        id="packages"
        aria-labelledby="pp-main-heading"
      >
        <div className="pp-banner" aria-label="Popular packages hero banner">
          <img
            className="pp-banner__img"
            src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg"
            alt="Pilgrims gathering near the Kaaba in Makkah during Hajj season"
            loading="lazy"
            decoding="async"
          />
          <div className="pp-banner__overlay" aria-hidden="true" />

          <div className="pp-banner__content" ref={bannerContentRef}>
            <span className="pp-banner__eyebrow">Travel With Confidence</span>

            <h2 className="pp-banner__heading" id="pp-main-heading">
              Our Most Popular{" "}
              <em>Hajj &amp; Umrah</em>
              {" "}Packages
            </h2>

            <p className="pp-banner__subtext">
              Choose from carefully curated pilgrimage experiences designed to
              provide comfort, guidance, and peace of mind throughout your
              sacred journey.
            </p>

            <div className="pp-banner__actions">
              <button
                type="button"
                className="pp-btn--primary"
                onClick={scrollToPackages}
                aria-label="Explore our packages below"
              >
                Explore Packages <ArrowIcon />
              </button>

              <button
                type="button"
                className="pp-btn--ghost"
                onClick={scrollToContact}
                aria-label="Speak with a travel advisor"
              >
                Speak With an Advisor
              </button>
            </div>
          </div>
        </div>

        <div className="pp-grid-section">
          <header className="pp-grid-header">
            <span className="pp-section-eyebrow">Curated for You</span>
            <h2 className="pp-section-heading">
              Packages Tailored to Your <em>Sacred Journey</em>
            </h2>
            <p className="pp-section-desc">
              Every package is crafted with care — combining reliable logistics,
              spiritual guidance, and the comfort you deserve on every step of
              your pilgrimage.
            </p>
          </header>

          {/* ── Desktop/Tablet Grid ── */}
          <div className="pp-grid" role="list" aria-label="Available travel packages">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} role="listitem">
                <PackageCard pkg={pkg} isCarousel={false} />
              </div>
            ))}
          </div>

          {/* ── Mobile Carousel ── */}
          <PackageCarousel packages={PACKAGES} inView={true} />
        </div>

        {/* ── Trust Marquee ── */}
        <TrustMarquee />
      </section>
    </>
  );
}