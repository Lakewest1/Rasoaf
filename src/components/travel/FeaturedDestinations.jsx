// src/components/travel/FeaturedDestinations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Featured Destinations
// Strict Rasoaf Typography · Dark Luxury Aesthetic · Refined Overlays
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Star, Compass, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DESTINATIONS = [
  { 
    city: "Dubai", 
    country: "UAE", 
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop", 
    desc: "Luxury shopping and ultramodern architecture.",
    size: "tall", 
    route: "/travel/tourist-visa",
    rating: "4.9",
    tag: "Most Visited"
  },
  { 
    city: "London", 
    country: "United Kingdom", 
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop", 
    desc: "World-class universities and rich history.",
    size: "wide", 
    route: "/travel/student-visa",
    rating: "4.8",
    tag: "Education Hub"
  },
  { 
    city: "Toronto", 
    country: "Canada", 
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2227?w=600&h=600&fit=crop", 
    desc: "Diverse culture and stunning nature.",
    size: "normal", 
    route: "/travel/work-visa",
    rating: "4.7",
    tag: "Career Gateway"
  },
  { 
    city: "Istanbul", 
    country: "Turkey", 
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=600&fit=crop", 
    desc: "Where East meets West.",
    size: "normal", 
    route: "/travel/tourist-visa",
    rating: "4.8",
    tag: "Cultural Gem"
  },
  { 
    city: "Paris", 
    country: "France", 
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop", 
    desc: "Art, fashion, gastronomy, and timeless romance.",
    size: "wide", 
    route: "/travel/business-visa",
    rating: "4.9",
    tag: "Premium Choice"
  },
];

const RasoafCSS = `
  /* ════════════════════════════════════════════════════════════════ */
  /* RASOAF DESIGN TOKENS */
  /* ════════════════════════════════════════════════════════════════ */

  :root {
    /* Color Palette */
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-charcoal-dark: #0B0F17;
    --rasoaf-charcoal-light: #1B2230;
    --rasoaf-white: #FFFFFF;
    --rasoaf-cream: #FFFDF8;
    --rasoaf-text-muted: rgba(255, 253, 248, 0.6);
    --rasoaf-text-dim: rgba(255, 253, 248, 0.4);

    /* Typography */
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;

    /* Spacing */
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;

    /* Transitions */
    --transition-smooth: cubic-bezier(0.25, 1, 0.5, 1);
    --transition-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);

    /* Shadows */
    --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.5);
    --shadow-gold: 0 24px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 160, 23, 0.15);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* SECTION STRUCTURE */
  /* ════════════════════════════════════════════════════════════════ */

  .rfd-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #050A14 0%, #08111E 30%, #0B1525 100%);
    position: relative;
    overflow: hidden;
  }

  /* Subtle atmospheric texture */
  .rfd-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 25%, rgba(212, 160, 23, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 25% 75%, rgba(247, 201, 72, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .rfd-container {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* HEADER — STRICT RASOAF TYPOGRAPHY */
  /* ════════════════════════════════════════════════════════════════ */

  .rfd-header {
    text-align: center;
    margin-bottom: clamp(48px, 7vh, 72px);
  }

  .rfd-eyebrow {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.7rem, 0.9vw, 0.85rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rasoaf-gold-light);
    margin-bottom: var(--spacing-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .rfd-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2.3rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: var(--rasoaf-cream);
    margin: 0 0 var(--spacing-md) 0;
  }

  .rfd-title-accent {
    background: linear-gradient(
      135deg,
      var(--rasoaf-gold-light) 0%,
      var(--rasoaf-gold-mid) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rfd-subtitle {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--rasoaf-text-muted);
    max-width: 600px;
    margin: 0 auto;
    letter-spacing: 0.005em;
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* GRID SYSTEM */
  /* ════════════════════════════════════════════════════════════════ */

  .rfd-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 280px;
    gap: clamp(12px, 1.8vw, 20px);
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* DESTINATION CARDS */
  /* ════════════════════════════════════════════════════════════════ */

  .rfd-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    background: var(--rasoaf-charcoal-light);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.5s var(--transition-smooth);
    display: flex;
    flex-direction: column;
  }

  .rfd-card:hover {
    transform: translateY(-8px);
    border-color: rgba(212, 160, 23, 0.3);
    box-shadow: var(--shadow-gold);
  }

  .rfd-card.wide {
    grid-column: span 2;
  }

  .rfd-card.tall {
    grid-row: span 2;
  }

  /* ── Image ── */
  .rfd-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--transition-smooth), filter 0.4s var(--transition-out);
    filter: brightness(0.88);
  }

  .rfd-card:hover .rfd-image {
    transform: scale(1.06);
    filter: brightness(1);
  }

  /* ── Overlay ── */
  .rfd-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(8, 17, 30, 0.95) 0%,
      rgba(8, 17, 30, 0.6) 35%,
      rgba(8, 17, 30, 0.15) 70%,
      transparent 100%
    );
    transition: background 0.4s var(--transition-out);
    z-index: 2;
  }

  .rfd-card:hover .rfd-overlay {
    background: linear-gradient(
      to top,
      rgba(8, 17, 30, 0.97) 0%,
      rgba(8, 17, 30, 0.5) 40%,
      rgba(8, 17, 30, 0.1) 75%,
      transparent 100%
    );
  }

  /* ── Badge (Tag) ── */
  .rfd-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 6px 14px;
    background: rgba(212, 160, 23, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 160, 23, 0.2);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rasoaf-gold-light);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    z-index: 4;
    transition: all 0.3s var(--transition-out);
  }

  .rfd-card:hover .rfd-badge {
    background: rgba(212, 160, 23, 0.15);
    border-color: rgba(212, 160, 23, 0.3);
  }

  /* ── Rating Badge ── */
  .rfd-rating {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-cream);
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: all 0.3s var(--transition-out);
  }

  .rfd-card:hover .rfd-rating {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(212, 160, 23, 0.2);
  }

  .rfd-star {
    color: var(--rasoaf-gold-light);
  }

  /* ── Content ── */
  .rfd-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: clamp(20px, 2.5vw, 28px);
    z-index: 3;
    transform: translateY(0);
    transition: transform 0.5s var(--transition-smooth);
  }

  .rfd-card:hover .rfd-content {
    transform: translateY(-6px);
  }

  .rfd-location {
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--rasoaf-gold-light);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
  }

  .rfd-city {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(1.4rem, 2.2vw, 28px);
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--rasoaf-cream);
    margin: 0 0 8px 0;
    transition: background 0.3s var(--transition-out);
  }

  .rfd-card:hover .rfd-city {
    background: linear-gradient(135deg, var(--rasoaf-cream), var(--rasoaf-gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rfd-desc {
    font-family: var(--rasoaf-body);
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--rasoaf-text-dim);
    margin: 0;
    transition: color 0.3s var(--transition-out);
  }

  .rfd-card:hover .rfd-desc {
    color: var(--rasoaf-text-muted);
  }

  /* ── Action Button ── */
  .rfd-action {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(212, 160, 23, 0.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 160, 23, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(8px) scale(0.85);
    transition: all 0.4s var(--transition-smooth);
    z-index: 4;
    color: var(--rasoaf-gold-light);
  }

  .rfd-card:hover .rfd-action {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .rfd-action:hover {
    background: rgba(212, 160, 23, 0.2);
    border-color: rgba(212, 160, 23, 0.35);
  }

  .rfd-action svg {
    transition: transform 0.3s var(--transition-out);
  }

  .rfd-action:hover svg {
    transform: translateX(2px);
  }

  /* ── Global Indicator ── */
  .rfd-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: clamp(40px, 5vh, 56px);
    padding: 14px 28px;
    background: rgba(212, 160, 23, 0.04);
    border: 1px solid rgba(212, 160, 23, 0.08);
    border-radius: 100px;
    max-width: fit-content;
    margin-left: auto;
    margin-right: auto;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .rfd-indicator-text {
    font-family: var(--rasoaf-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--rasoaf-text-muted);
    letter-spacing: 0.02em;
  }

  .rfd-indicator-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--rasoaf-gold-light);
    animation: rfd-pulse 2s ease-in-out infinite;
  }

  @keyframes rfd-pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE DESIGN */
  /* ════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .rfd-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 240px;
    }

    .rfd-card.wide {
      grid-column: span 2;
    }

    .rfd-card.tall {
      grid-row: span 1;
    }
  }

  @media (max-width: 768px) {
    .rfd-section {
      padding: clamp(48px, 8vh, 72px) 16px;
    }

    .rfd-grid {
      grid-template-columns: 1fr;
      grid-auto-rows: 220px;
      gap: 12px;
    }

    .rfd-card.wide {
      grid-column: span 1;
    }

    .rfd-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
    }

    .rfd-city {
      font-size: 1.3rem;
    }

    .rfd-desc {
      font-size: 0.75rem;
    }

    .rfd-content {
      padding: 18px;
    }
  }

  @media (max-width: 600px) {
    .rfd-section {
      padding: clamp(40px, 6vh, 60px) 12px;
    }

    .rfd-grid {
      grid-auto-rows: 200px;
    }

    .rfd-badge {
      top: 12px;
      left: 12px;
      font-size: 0.6rem;
      padding: 5px 12px;
    }

    .rfd-rating {
      top: 12px;
      right: 12px;
      font-size: 0.65rem;
      padding: 5px 10px;
    }

    .rfd-content {
      padding: 16px;
    }

    .rfd-city {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }

    .rfd-desc {
      font-size: 0.7rem;
    }

    .rfd-location {
      font-size: 0.65rem;
      gap: 4px;
    }

    .rfd-action {
      width: 36px;
      height: 36px;
      bottom: 16px;
      right: 16px;
    }

    .rfd-action svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 400px) {
    .rfd-grid {
      grid-auto-rows: 180px;
      gap: 8px;
    }

    .rfd-title {
      font-size: 1.4rem;
    }

    .rfd-subtitle {
      font-size: 0.85rem;
    }

    .rfd-city {
      font-size: 1rem;
    }

    .rfd-content {
      padding: 14px;
    }
  }
`;

export default function FeaturedDestinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="rfd-section" ref={ref} aria-label="Featured travel destinations">
        <div className="rfd-container">
          {/* Header */}
          <motion.div
            className="rfd-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rfd-eyebrow">
              <Compass size={13} />
              Curated Destinations
            </div>
            <h2 className="rfd-title">
              Where Dreams <span className="rfd-title-accent">Take Flight</span>
            </h2>
            <p className="rfd-subtitle">
              Discover extraordinary destinations handpicked by our travel experts. 
              Each location promises unique experiences tailored to your aspirations.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="rfd-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
            aria-label="Destination cards"
          >
            {DESTINATIONS.map((destination, idx) => (
              <motion.div
                key={idx}
                className={`rfd-card ${destination.size}`}
                variants={itemVariants}
                onClick={() => handleNavigate(destination.route)}
                role="listitem"
                aria-label={`${destination.city}, ${destination.country}`}
              >
                {/* Image */}
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="rfd-image"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="rfd-overlay" />

                {/* Badge */}
                <div className="rfd-badge">{destination.tag}</div>

                {/* Rating */}
                <div className="rfd-rating">
                  <Star size={11} className="rfd-star" fill="currentColor" />
                  {destination.rating}
                </div>

                {/* Action Button */}
                <button
                  className="rfd-action"
                  aria-label={`Explore ${destination.city}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(destination.route);
                  }}
                >
                  <ArrowRight size={18} />
                </button>

                {/* Content */}
                <div className="rfd-content">
                  <div className="rfd-location">
                    <MapPin size={12} />
                    {destination.country}
                  </div>
                  <h3 className="rfd-city">{destination.city}</h3>
                  <p className="rfd-desc">{destination.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Global Indicator */}
          <motion.div
            className="rfd-indicator"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Globe size={16} color="#D4A017" />
            <span className="rfd-indicator-text">
              Serving travelers across 50+ countries worldwide
            </span>
            <div className="rfd-indicator-dot" />
          </motion.div>
        </div>
      </section>
    </>
  );
}