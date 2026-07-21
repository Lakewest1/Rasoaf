// src/components/travel/OfficeLocations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Office Locations
// Premium Dark Luxury · Rasoaf Typography · Country Flag Center Top · 360° Rotate
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  MapPin, Phone, Mail, Globe, Sparkles, 
  ChevronRight, Building2, Navigation, Star
} from "lucide-react";

const officeData = [
  {
    id: "canada-burnaby",
    country: "Canada",
    flag: "🇨🇦",
    flagUrl: "https://flagcdn.com/w160/ca.png",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=600&fit=crop&crop=center",
    phone: "+1-236-989-5756",
    email: "info@rasoaf.com",
    address: "7955 Suncrest Drive",
    city: "Burnaby",
    region: "British Columbia",
    fullAddress: "7955 Suncrest Drive, Burnaby, British Columbia",
    color: "#D4A017"
  },
  {
    id: "canada-winnipeg",
    country: "Canada",
    flag: "🇨🇦",
    flagUrl: "https://flagcdn.com/w160/ca.png",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop&crop=center",
    phone: "+1-204-915-5360",
    email: "info@rasoaf.com",
    address: "2303-33 Hargrave Street",
    city: "Winnipeg",
    region: "Manitoba R3C3T9",
    fullAddress: "2303-33 Hargrave Street, Winnipeg, Manitoba R3C3T9",
    color: "#D4A017"
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    flagUrl: "https://flagcdn.com/w160/gb.png",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center",
    phone: "+44-758-732-9060",
    email: "info@rasoaf.com",
    address: "38 Kelso Road",
    city: "Liverpool",
    region: "Merseyside L6 3AQ",
    fullAddress: "38 Kelso Road, Liverpool, Merseyside L6 3AQ",
    color: "#D4A017"
  },
  {
    id: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    flagUrl: "https://flagcdn.com/w160/ie.png",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center",
    phone: "+353-851-967-323",
    email: "info@rasoaf.com",
    address: "Pinnock Hill Round About",
    city: "Swords",
    region: "Co. Dublin K67 K6R2",
    fullAddress: "Pinnock Hill Round About, Swords, Co. Dublin K67 K6R2",
    color: "#D4A017"
  }
];

// ══════════════════════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ══════════════════════════════════════════════════════════════════════════
const t = {
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
  transition: "0.5s cubic-bezier(0.22, 1, 0.36, 1)",
  shadowGold: "0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,160,23,0.12)",
};

const RasoafCSS = `
  .rlo-section {
    padding: clamp(60px, 10vh, 100px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow: hidden;
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

  .rlo-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }

  /* ── Header ── */
  .rlo-header { text-align: center; margin-bottom: clamp(44px, 6vh, 60px); }

  .rlo-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 7px 20px;
    background: rgba(212,160,23,0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(212,160,23,0.2);
    border-radius: 100px;
    font-family: ${t.body};
    font-size: clamp(0.65rem, 0.8vw, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: ${t.goldLight};
    margin-bottom: 16px;
    transition: all 0.3s ease;
  }

  .rlo-eyebrow:hover { background: rgba(212,160,23,0.15); border-color: rgba(212,160,23,0.3); }

  .rlo-title {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: ${t.white};
    margin: 0 0 14px 0;
    text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  }

  .rlo-title-accent {
    background: linear-gradient(135deg, ${t.goldLight} 0%, ${t.gold} 50%, ${t.goldDark} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 4px rgba(212,160,23,0.3));
  }

  .rlo-subtitle {
    font-family: ${t.body};
    font-size: clamp(0.88rem, 1.05vw, 1rem);
    font-weight: 400;
    color: ${t.textMuted};
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.65;
    letter-spacing: 0.005em;
  }

  /* ── Grid ── */
  .rlo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(16px, 2vw, 24px);
  }

  /* ── Card ── */
  .rlo-card {
    position: relative;
    border-radius: 22px;
    overflow: visible;
    background: #111827;
    border: 1px solid rgba(255,255,255,0.06);
    transition: all ${t.transition};
    display: flex;
    flex-direction: column;
    will-change: transform;
    padding-top: 32px;
  }

  .rlo-card:hover {
    transform: translateY(-8px);
    border-color: rgba(212,160,23,0.3);
    box-shadow: ${t.shadowGold};
  }

  /* ── Image Container ── */
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
    transition: transform 0.8s ${t.transition};
    will-change: transform;
    filter: brightness(0.85);
  }

  .rlo-card:hover .rlo-card-image {
    transform: scale(1.06);
    filter: brightness(1);
  }

  /* ══════════════════════════════════════════════════════════════════════ */
  /* COUNTRY FLAG — Centered at top, half outside card, 360° rotate */
  /* ══════════════════════════════════════════════════════════════════════ */

  .rlo-flag-wrap {
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    transition: transform 0.7s ${t.transition};
    will-change: transform;
  }

  .rlo-card:hover .rlo-flag-wrap {
    transform: translateX(-50%) rotate(360deg) scale(1.1);
  }

  .rlo-flag {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: ${t.white};
    border: 3px solid ${t.white};
    box-shadow: 0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.2);
    overflow: hidden;
  }

  .rlo-flag img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* ── Content ── */
  .rlo-card-content {
    padding: clamp(16px, 2vw, 22px) clamp(16px, 2vw, 22px) clamp(18px, 2vw, 24px);
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #111827;
    border-radius: 0 0 22px 22px;
  }

  .rlo-card-city {
    font-family: ${t.body};
    font-size: 0.68rem;
    font-weight: 600;
    color: ${t.goldLight};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .rlo-card-country {
    font-family: ${t.display};
    font-weight: 800;
    font-size: clamp(1rem, 1.15vw, 1.1rem);
    color: ${t.white};
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 10px 0;
  }

  .rlo-card-divider {
    width: 36px;
    height: 2px;
    background: linear-gradient(90deg, ${t.gold}, ${t.goldLight});
    border-radius: 2px;
    margin-bottom: 12px;
    transition: width ${t.transition};
  }

  .rlo-card:hover .rlo-card-divider { width: 48px; }

  .rlo-card-address {
    font-family: ${t.body};
    font-size: 0.82rem;
    font-weight: 400;
    color: rgba(255,255,255,0.6);
    line-height: 1.55;
    margin: 0 0 10px 0;
    flex: 1;
    letter-spacing: 0.005em;
  }

  .rlo-card-phone {
    font-family: ${t.body};
    font-size: 0.8rem;
    font-weight: 500;
    color: ${t.textDim};
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color ${t.transition};
    text-decoration: none;
  }

  .rlo-card:hover .rlo-card-phone { color: rgba(255,255,255,0.6); }

  .rlo-card-phone svg { color: ${t.gold}; flex-shrink: 0; }

  /* ── Responsive ── */
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

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function OfficeLocations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section ref={ref} className="rlo-section" aria-label="Our office locations worldwide">
        <div className="rlo-container">
          {/* Header */}
          <motion.div
            className="rlo-header"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="rlo-eyebrow">
              <Globe size={14} />Global Presence<Sparkles size={12} />
            </div>
            <h2 className="rlo-title">
              Explore Our{" "}
              <span className="rlo-title-accent">Office Worldwide</span>
            </h2>
            <p className="rlo-subtitle">
              With offices across four continents, we provide local expertise 
              and global support to ensure your journey is seamless from start to finish.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="rlo-grid"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            role="list"
          >
            {officeData.map((office) => (
              <motion.div
                key={office.id}
                className="rlo-card"
                variants={itemVariants}
                role="listitem"
                aria-label={`${office.country} office — ${office.city}`}
                whileHover={{ y: -8 }}
              >
                {/* ═══ COUNTRY FLAG — Centered top, half outside, 360° rotate ═══ */}
                <div className="rlo-flag-wrap">
                  <div className="rlo-flag">
                    <img 
                      src={office.flagUrl} 
                      alt={`${office.country} flag`}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Image */}
                <div className="rlo-card-image-wrap">
                  <img
                    src={office.image}
                    alt={`${office.city}, ${office.country}`}
                    className="rlo-card-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content */}
                <div className="rlo-card-content">
                  <div className="rlo-card-city">
                    <MapPin size={12} />{office.city}, {office.region}
                  </div>
                  <h3 className="rlo-card-country">{office.country}</h3>
                  <div className="rlo-card-divider" />
                  <p className="rlo-card-address">{office.fullAddress}</p>
                  <a href={`tel:${office.phone.replace(/-/g, '')}`} className="rlo-card-phone">
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