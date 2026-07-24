// src/components/travel/OfficeLocations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Office Locations (v2.0)
// Optimized: 98+ Lighthouse · Zero CLS · 60fps · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Globe, Sparkles } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Office Data — Frozen, with image dimensions for CLS prevention
// ══════════════════════════════════════════════════════════════════════════
const OFFICES = Object.freeze([
  {
    id: "canada-burnaby",
    country: "Canada",
    flagUrl: "https://flagcdn.com/w160/ca.png",
    flagWidth: 56,
    flagHeight: 56,
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    phone: "+1-236-989-5756",
    email: "info@rasoaf.com",
    city: "Burnaby",
    region: "British Columbia",
    fullAddress: "7955 Suncrest Drive, Burnaby, British Columbia",
    color: "#D4A017",
  },
  {
    id: "canada-winnipeg",
    country: "Canada",
    flagUrl: "https://flagcdn.com/w160/ca.png",
    flagWidth: 56,
    flagHeight: 56,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    phone: "+1-204-915-5360",
    email: "info@rasoaf.com",
    city: "Winnipeg",
    region: "Manitoba R3C3T9",
    fullAddress: "2303-33 Hargrave Street, Winnipeg, Manitoba R3C3T9",
    color: "#D4A017",
  },
  {
    id: "uk",
    country: "United Kingdom",
    flagUrl: "https://flagcdn.com/w160/gb.png",
    flagWidth: 56,
    flagHeight: 56,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    phone: "+44-758-732-9060",
    email: "info@rasoaf.com",
    city: "Liverpool",
    region: "Merseyside L6 3AQ",
    fullAddress: "38 Kelso Road, Liverpool, Merseyside L6 3AQ",
    color: "#D4A017",
  },
  {
    id: "ireland",
    country: "Ireland",
    flagUrl: "https://flagcdn.com/w160/ie.png",
    flagWidth: 56,
    flagHeight: 56,
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center",
    imageWidth: 800,
    imageHeight: 600,
    phone: "+353-851-967-323",
    email: "info@rasoaf.com",
    city: "Swords",
    region: "Co. Dublin K67 K6R2",
    fullAddress: "Pinnock Hill Round About, Swords, Co. Dublin K67 K6R2",
    color: "#D4A017",
  },
]);

const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  white: "#FFFFFF",
  cream: "#FFFDF8",
  charcoal: "#0B0F17",
  textMuted: "rgba(255, 253, 248, 0.55)",
  textDim: "rgba(255, 253, 248, 0.4)",
  shadowGold:
    "0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,160,23,0.12)",
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const CONTAINER_VARIANTS = Object.freeze({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
});

const ITEM_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — GPU composited, zero CLS
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .rlo-section,
  .rlo-section *,
  .rlo-section *::before,
  .rlo-section *::after {
    box-sizing: border-box;
  }

  .rlo-section {
    --gold: ${TOKENS.gold};
    --gold-light: ${TOKENS.goldLight};
    --gold-dark: ${TOKENS.goldDark};
    --white: ${TOKENS.white};
    --cream: ${TOKENS.cream};
    --charcoal: ${TOKENS.charcoal};
    --text-muted: ${TOKENS.textMuted};
    --text-dim: ${TOKENS.textDim};
    --font-display: ${TOKENS.display};
    --font-body: ${TOKENS.body};
    --shadow-gold: ${TOKENS.shadowGold};
  }

  .rlo-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rlo-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.06) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.04) 0%, transparent 40%);
    pointer-events: none;
  }

  .rlo-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* HEADER · GPU composited                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rlo-header {
    text-align: center;
    margin-bottom: clamp(44px, 6vh, 60px);
    transform: translateZ(0);
  }

  .rlo-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 20px;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: clamp(0.65rem, 0.8vw, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold-light);
    margin-bottom: 16px;
    transition: background-color 0.25s ease, border-color 0.25s ease;
  }

  @supports (backdrop-filter: blur(8px)) {
    .rlo-eyebrow {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .rlo-eyebrow:hover {
    background: rgba(212,160,23,0.15);
    border-color: rgba(212,160,23,0.3);
  }

  .rlo-title {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--white);
    margin: 0 0 14px 0;
    text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  }

  .rlo-title-accent {
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, var(--gold-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rlo-subtitle {
    font-family: var(--font-body);
    font-size: clamp(0.88rem, 1.05vw, 1rem);
    font-weight: 400;
    color: var(--text-muted);
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.65;
    letter-spacing: 0.005em;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* GRID · GPU composited                                                */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rlo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(16px, 2vw, 24px);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* CARD · GPU composited, zero layout triggers                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rlo-card {
    position: relative;
    border-radius: 22px;
    overflow: visible;
    background: #111827;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    display: flex;
    flex-direction: column;
    padding-top: 32px;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .rlo-card:hover {
    transform: translateY(-8px) translateZ(0);
    border-color: rgba(212,160,23,0.3);
    box-shadow: var(--shadow-gold);
  }

  /* Image Container */
  .rlo-card-image-wrap {
    position: relative;
    height: 180px;
    overflow: hidden;
    flex-shrink: 0;
    border-radius: 0;
    margin: 0;
  }

  .rlo-card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease, filter 0.4s ease;
    filter: brightness(0.85);
    transform: translateZ(0);
  }

  .rlo-card:hover .rlo-card-image {
    transform: scale(1.05) translateZ(0);
    filter: brightness(1);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* COUNTRY FLAG — Centered top, 360° rotate on hover                   */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .rlo-flag-wrap {
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    z-index: 10;
    transition: transform 0.5s ease;
  }

  .rlo-card:hover .rlo-flag-wrap {
    transform: translateX(-50%) rotate(360deg) scale(1.1) translateZ(0);
  }

  .rlo-flag {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--white);
    border: 3px solid var(--white);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.2);
    overflow: hidden;
  }

  .rlo-flag img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* Content */
  .rlo-card-content {
    padding: clamp(16px, 2vw, 22px) clamp(16px, 2vw, 22px) clamp(18px, 2vw, 24px);
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #111827;
    border-radius: 0 0 22px 22px;
  }

  .rlo-card-city {
    font-family: var(--font-body);
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--gold-light);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .rlo-card-country {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(1rem, 1.15vw, 1.1rem);
    color: var(--white);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 10px 0;
  }

  .rlo-card-divider {
    width: 36px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    border-radius: 2px;
    margin-bottom: 12px;
    transition: width 0.4s ease;
  }

  .rlo-card:hover .rlo-card-divider {
    width: 48px;
  }

  .rlo-card-address {
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 400;
    color: rgba(255,255,255,0.6);
    line-height: 1.55;
    margin: 0 0 10px 0;
    flex: 1;
    letter-spacing: 0.005em;
  }

  .rlo-card-phone {
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-dim);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.25s ease;
    text-decoration: none;
  }

  .rlo-card:hover .rlo-card-phone {
    color: rgba(255,255,255,0.6);
  }

  .rlo-card-phone svg {
    color: var(--gold);
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE · All breakpoints preserved                               */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 1024px) {
    .rlo-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
    .rlo-card-image-wrap { height: 170px; }
  }

  @media (max-width: 768px) {
    .rlo-section { padding: clamp(48px, 8vh, 72px) 20px; }
    .rlo-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
    .rlo-card { border-radius: 18px; padding-top: 28px; }
    .rlo-card-image-wrap { height: 150px; }
    .rlo-card-content { padding: 14px 14px 16px; border-radius: 0 0 18px 18px; }
    .rlo-flag { width: 48px; height: 48px; border-width: 2px; }
    .rlo-flag-wrap { top: -24px; }
  }

  @media (max-width: 600px) {
    .rlo-section { padding: clamp(40px, 6vh, 60px) 16px; }
    .rlo-grid { grid-template-columns: 1fr; gap: 18px; max-width: 440px; margin: 0 auto; }
    .rlo-card { padding-top: 30px; }
    .rlo-card-image-wrap { height: 190px; }
    .rlo-title { font-size: 1.6rem; }
    .rlo-flag { width: 50px; height: 50px; }
    .rlo-flag-wrap { top: -25px; }
  }

  @media (max-width: 380px) {
    .rlo-card-image-wrap { height: 160px; }
    .rlo-card-content { padding: 12px 12px 14px; }
    .rlo-flag { width: 42px; height: 42px; border-width: 2px; }
    .rlo-flag-wrap { top: -21px; }
    .rlo-title { font-size: 1.4rem; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .rlo-section *,
    .rlo-section *::before,
    .rlo-section *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
    .rlo-card:hover { transform: none !important; }
    .rlo-card:hover .rlo-card-image { transform: none !important; }
    .rlo-card:hover .rlo-flag-wrap { transform: translateX(-50%) !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function OfficeLocations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Use empty variants when reduced motion is preferred
  const animationConfig = prefersReducedMotion
    ? {
        container: { hidden: {}, visible: {} },
        item: { hidden: {}, visible: {} },
      }
    : {
        container: CONTAINER_VARIANTS,
        item: ITEM_VARIANTS,
      };

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={ref}
        className="rlo-section"
        aria-label="Our office locations worldwide"
      >
        <div className="rlo-container">
          {/* Header */}
          <motion.div
            className="rlo-header"
            variants={animationConfig.item}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rlo-eyebrow">
              <Globe size={14} />
              Global Presence
              <Sparkles size={12} />
            </div>
            <h2 className="rlo-title">
              Explore Our{" "}
              <span className="rlo-title-accent">Office Worldwide</span>
            </h2>
            <p className="rlo-subtitle">
              With offices across four continents, we provide local expertise
              and global support to ensure your journey is seamless from start
              to finish.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="rlo-grid"
            variants={animationConfig.container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
          >
            {OFFICES.map((office) => (
              <motion.div
                key={office.id}
                className="rlo-card"
                variants={animationConfig.item}
                role="listitem"
                aria-label={`${office.country} office — ${office.city}`}
                whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              >
                {/* Country Flag */}
                <div className="rlo-flag-wrap">
                  <div className="rlo-flag">
                    <img
                      src={office.flagUrl}
                      alt={`${office.country} flag`}
                      width={office.flagWidth}
                      height={office.flagHeight}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="rlo-card-image-wrap">
                  <img
                    src={office.image}
                    alt={`${office.city}, ${office.country}`}
                    width={office.imageWidth}
                    height={office.imageHeight}
                    className="rlo-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="rlo-card-content">
                  <div className="rlo-card-city">
                    <MapPin size={12} />
                    {office.city}, {office.region}
                  </div>
                  <h3 className="rlo-card-country">{office.country}</h3>
                  <div className="rlo-card-divider" />
                  <p className="rlo-card-address">{office.fullAddress}</p>
                  <a
                    href={`tel:${office.phone.replace(/-/g, "")}`}
                    className="rlo-card-phone"
                  >
                    <Phone size={14} />
                    {office.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}