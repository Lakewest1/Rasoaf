// src/components/home/Destinations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Destinations Section
//
// A premium destination showcase section that inspires visitors by showcasing
// key pilgrimage and travel destinations.
//
// Design: Yellow/warm backgrounds, black text, cream cards, gold accents
// Layout: Full-width hero banner + 6 destination cards in responsive grid
// Animation: Fade-up on scroll, hover lift with image zoom
// Responsive: 3 → 2 → 1 columns (desktop → tablet → mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import { MapPin, ArrowRight, Star } from "lucide-react";

// ── Destination Data ──────────────────────────────────────────────────────────
const DESTINATIONS = [
  {
    id: 1,
    name: "Makkah",
    description: "The holiest city in Islam, home to the Grand Mosque and the Kaaba.",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877282/jakman1-al-abrar-mecca-15082_1920_x58kgd.jpg",
    location: "Saudi Arabia",
    badge: "Sacred City",
    slug: "makkah",
  },
  {
    id: 2,
    name: "Madinah",
    description: "The radiant city of the Prophet, home to Al-Masjid an-Nabawi.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    location: "Saudi Arabia",
    badge: "Sacred City",
    slug: "madinah",
  },
  {
    id: 3,
    name: "Dubai",
    description: "A global city blending modern luxury with rich cultural heritage.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    location: "UAE",
    badge: "International",
    slug: "dubai",
  },
  {
    id: 4,
    name: "Istanbul",
    description: "Where East meets West — a city of stunning mosques and rich history.",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    location: "Turkey",
    badge: "International",
    slug: "istanbul",
  },
  {
    id: 5,
    name: "Cairo",
    description: "The gateway to ancient Egypt, home to the Pyramids and vibrant culture.",
    image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80",
    location: "Egypt",
    badge: "International",
    slug: "cairo",
  },
  {
    id: 6,
    name: "Doha",
    description: "A futuristic city on the Arabian Gulf with world-class hospitality.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    location: "Qatar",
    badge: "International",
    slug: "doha",
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

// ── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner({ inView }) {
  return (
    <div
      className="destinations-hero"
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(280px, 45vh, 380px)",
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: "clamp(40px, 6vh, 56px)",
        background: "linear-gradient(135deg, #1a1a0a 0%, #2d2d1a 100%)",
        isolation: "isolate",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877282/jakman1-al-abrar-mecca-15082_1920_x58kgd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          transform: inView ? "scale(1)" : "scale(1.06)",
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(135deg, rgba(196,151,42,0.12) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.5) 100%),
            linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)
          `,
          zIndex: 1,
        }}
      />

      {/* Gold accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "3px",
          background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
          zIndex: 2,
          opacity: inView ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(20px, 5vw, 60px)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "clamp(24px, 3vw, 40px)",
              height: "1.5px",
              background: "rgba(196,151,42,0.6)",
              borderRadius: "999px",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(9px, 0.85vw, 11px)",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(196,151,42,0.9)",
            }}
          >
            Explore With Confidence
          </span>
          <div
            style={{
              width: "clamp(24px, 3vw, 40px)",
              height: "1.5px",
              background: "rgba(196,151,42,0.6)",
              borderRadius: "999px",
            }}
          />
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(8px, 1.5vw, 16px)",
            maxWidth: "700px",
            textShadow: "0 2px 20px rgba(0,0,0,0.3)",
          }}
        >
          Discover Sacred &{" "}
          <span style={{ color: "#C4972A" }}>Iconic Destinations</span>
        </h2>

        {/* Supporting Text */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 1.2vw, 16px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.85)",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: 0,
          }}
        >
          From the holy cities of Makkah and Madinah to world-renowned international
          destinations, we create memorable journeys with comfort, guidance, and
          exceptional service.
        </p>
      </div>
    </div>
  );
}

// ── Destination Card ──────────────────────────────────────────────────────────
function DestinationCard({ destination, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.08 * index;

  return (
    <div
      className="destination-card-wrapper"
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
        className="destination-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hovered ? "rgba(196,151,42,0.30)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.10), 0 4px 16px rgba(196,151,42,0.08)"
            : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          cursor: "pointer",
        }}
      >
        {/* Image Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "65%",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={destination.image}
            alt={`${destination.name} — ${destination.location}`}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          />

          {/* Image Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(0deg, rgba(0,0,0,0.4) 0%, transparent 40%),
                linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%)
              `,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: "clamp(12px, 1.5vw, 16px)",
              left: "clamp(12px, 1.5vw, 16px)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(8px, 0.7vw, 10px)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ffffff",
              background: "rgba(196,151,42,0.85)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "4px 14px",
              borderRadius: "50px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              zIndex: 2,
            }}
          >
            {destination.badge}
          </div>

          {/* Location */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(12px, 1.5vw, 16px)",
              left: "clamp(12px, 1.5vw, 16px)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(10px, 0.8vw, 12px)",
              fontWeight: 500,
              color: "rgba(255,255,255,0.9)",
              zIndex: 2,
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            <MapPin size={14} color="#C4972A" />
            <span>{destination.location}</span>
          </div>

          {/* Star rating indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(12px, 1.5vw, 16px)",
              right: "clamp(12px, 1.5vw, 16px)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              zIndex: 2,
            }}
          >
            <Star size={12} fill="#C4972A" color="#C4972A" />
            <Star size={12} fill="#C4972A" color="#C4972A" />
            <Star size={12} fill="#C4972A" color="#C4972A" />
            <Star size={12} fill="#C4972A" color="#C4972A" />
            <Star size={12} fill="#C4972A" color="#C4972A" />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "clamp(16px, 2vw, 22px) clamp(16px, 2vw, 22px) clamp(18px, 2.2vw, 24px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
              fontWeight: 700,
              color: "#0a0a2e",
              marginBottom: "clamp(4px, 0.5vw, 8px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              transition: "color 0.3s ease",
            }}
          >
            {destination.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(12px, 0.95vw, 13.5px)",
              fontWeight: 400,
              color: "#4a5568",
              lineHeight: 1.6,
              marginBottom: "clamp(14px, 1.8vw, 20px)",
              flex: 1,
            }}
          >
            {destination.description}
          </p>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(12px, 0.9vw, 13px)",
              fontWeight: 600,
              color: hovered ? "#C4972A" : "#0a0a2e",
              transition: "all 0.3s ease",
              paddingTop: "clamp(8px, 1vw, 12px)",
              borderTop: "1px solid rgba(0,0,0,0.04)",
              marginTop: "auto",
            }}
          >
            <span>View Packages</span>
            <ArrowRight
              size={14}
              style={{
                transition: "transform 0.3s ease",
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            />
          </div>

          {/* Gold accent dot */}
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
    </div>
  );
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Destinations — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Destinations() {
  const [sectionRef, inView] = useInView(0.1);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeroInView(true), 150);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

        .destinations-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF9E6 0%, #FFFDF7 50%, #FAF5E8 100%);
          position: relative;
          overflow: hidden;
        }

        .destinations-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 15% 30%, rgba(196,151,42,0.04) 0%, transparent 40%),
            radial-gradient(circle at 85% 70%, rgba(196,151,42,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .destinations-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Destinations Grid ───────────────────────────────────────────── */
        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2vw, 28px);
          align-items: stretch;
        }

        .destination-card-wrapper {
          display: flex;
          height: 100%;
        }

        .destination-card {
          cursor: pointer;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .destinations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(18px, 2.2vw, 24px);
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 768px) {
          .destinations-section {
            padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
          }
          .destinations-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .destinations-section {
            padding: 28px 12px 40px;
          }
          .destinations-grid {
            gap: 14px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .destination-card-wrapper {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .destinations-hero > div:last-child {
            opacity: 1 !important;
            transform: none !important;
          }
          .destinations-hero > div:first-child {
            transform: none !important;
          }
          .destination-card {
            transition: none !important;
          }
          .destination-card:hover {
            transform: none !important;
          }
          .destination-card img {
            transition: none !important;
          }
          .destination-card:hover img {
            transform: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .destination-card {
            transform: none !important;
          }
          .destination-card:hover {
            transform: none !important;
          }
          .destination-card img {
            transform: none !important;
          }
          .destination-card:hover img {
            transform: none !important;
          }
          .destination-card .view-packages-arrow {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="destinations-section"
        aria-labelledby="destinations-heading"
        id="destinations"
      >
        <div className="destinations-container">
          {/* Hero Banner */}
          <HeroBanner inView={heroInView} />

          {/* Destinations Grid */}
          <div className="destinations-grid">
            {DESTINATIONS.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
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