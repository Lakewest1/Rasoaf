// src/pages/HajjUmrah.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Hajj & Umrah Page
// Comprehensive pilgrimage services with detailed package information
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import {
  Globe,
  Star,
  Users,
  Sparkles,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Compass,
  Heart,
  Plane,
  Hotel,
  Award,
  BadgeCheck,
} from "lucide-react";

// ── Package Data ──────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "economy-umrah",
    title: "Economy Umrah",
    badge: "Best Value",
    icon: "🕌",
    duration: "10 Days",
    price: "From $2,499",
    description: "A blessed journey within reach — everything you need for a meaningful Umrah pilgrimage at an accessible price.",
    features: [
      "Return Flights",
      "3-Star Hotel Accommodation",
      "Visa Processing",
      "Ground Transportation",
      "Guided Support",
      "Daily Breakfast",
    ],
    rating: 4.8,
    reviews: 156,
    color: "#B8860B",
  },
  {
    id: "premium-umrah",
    title: "Premium Umrah",
    badge: "Most Popular",
    icon: "✨",
    duration: "12 Days",
    price: "From $4,999",
    description: "Elevated comfort, deeper devotion — stay in superior hotels steps from the Haram with dedicated guides and premium services.",
    features: [
      "Return Flights",
      "5-Star Hotel Accommodation",
      "Visa Processing",
      "Private Ground Transportation",
      "24/7 Guided Support",
      "Daily Breakfast & Dinner",
      "Ziyarat Tours",
    ],
    rating: 4.9,
    reviews: 203,
    color: "#D4A017",
    featured: true,
  },
  {
    id: "vip-hajj",
    title: "VIP Hajj",
    badge: "Recommended",
    icon: "🌙",
    duration: "21 Days",
    price: "From $8,999",
    description: "The full Hajj experience, without compromise — luxury accommodation, private transport, and a dedicated scholar-guide throughout.",
    features: [
      "Return Flights",
      "Luxury Hotel Accommodation",
      "Visa & Documentation",
      "Private Transportation",
      "Scholar-Led Guided Support",
      "All Meals Included",
      "Private Ziyarat Tours",
    ],
    rating: 4.9,
    reviews: 87,
    color: "#F7C948",
  },
  {
    id: "family-package",
    title: "Family Package",
    badge: "Family Friendly",
    icon: "👨‍👩‍👧‍👦",
    duration: "14 Days",
    price: "From $6,499",
    description: "Specially designed to accommodate families with children — spacious rooms, family-friendly itineraries, and personal support at every step.",
    features: [
      "Return Flights",
      "Family Room Accommodation",
      "Visa Processing",
      "Family Ground Transportation",
      "Dedicated Family Guide",
      "Children's Activities",
      "Daily Meals",
    ],
    rating: 4.7,
    reviews: 112,
    color: "#B8860B",
  },
];

// ── Trust Items ──────────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: "🛡️", text: "Fully Bonded & Insured" },
  { icon: "⭐", text: "10,000+ Satisfied Pilgrims" },
  { icon: "📞", text: "24/7 Pilgrim Support" },
  { icon: "✈️", text: "IATA Accredited Agency" },
];

// ── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, index }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.08 * (index + 1);

  return (
    <div
      style={{
        opacity: 1,
        transform: "translateY(0)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        height: "100%",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "28px 24px 24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.30)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: hovered
            ? "0 12px 40px rgba(0,0,0,0.08), 0 4px 16px rgba(212,160,23,0.08)"
            : "0 1px 3px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.04)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${pkg.color}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
            opacity: hovered ? 1 : 0.3,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            borderRadius: "0 0 3px 3px",
          }}
          aria-hidden="true"
        />

        {/* Badge */}
        {pkg.badge && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: pkg.featured
                ? "linear-gradient(135deg, #F7C948, #D4A017)"
                : "#2d3748",
              color: pkg.featured ? "#111111" : "#F7C948",
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "4px 14px",
              borderRadius: "50px",
              boxShadow: pkg.featured ? "0 2px 12px rgba(212,160,23,0.3)" : "none",
            }}
          >
            {pkg.badge}
          </div>
        )}

        {/* Icon */}
        <div
          style={{
            fontSize: "36px",
            marginBottom: "12px",
          }}
        >
          {pkg.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#111111",
            marginBottom: "4px",
            letterSpacing: "-0.01em",
          }}
        >
          {pkg.title}
        </h3>

        {/* Price & Duration */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: pkg.color,
            }}
          >
            {pkg.price}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#5F5F5F",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Clock size={14} />
            {pkg.duration}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "#5F5F5F",
            lineHeight: 1.6,
            marginBottom: "16px",
            flex: 1,
          }}
        >
          {pkg.description}
        </p>

        {/* Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          {pkg.features.slice(0, 6).map((feature, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 450,
                color: "#2d3748",
              }}
            >
              <CheckCircle size={12} color="#D4A017" />
              {feature}
            </div>
          ))}
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(0,0,0,0.04)",
            marginBottom: "14px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#111111",
            }}
          >
            <Star size={16} fill="#D4A017" color="#D4A017" />
            {pkg.rating}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "#5F5F5F",
            }}
          >
            ({pkg.reviews} reviews)
          </span>
          <BadgeCheck size={14} color="#D4A017" />
        </div>

        {/* CTA Button */}
        <button
          onClick={() => {
            const el = document.getElementById("booking");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          style={{
            width: "100%",
            padding: "12px 0",
            background: pkg.featured
              ? "linear-gradient(135deg, #F7C948 0%, #D4A017 100%)"
              : "transparent",
            border: pkg.featured ? "none" : "1.5px solid rgba(212,160,23,0.25)",
            borderRadius: "12px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: pkg.featured ? "#111111" : "#2d3748",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: pkg.featured ? "0 2px 12px rgba(212,160,23,0.25)" : "none",
          }}
          onMouseEnter={(e) => {
            if (!pkg.featured) {
              e.currentTarget.style.borderColor = "#D4A017";
              e.currentTarget.style.background = "rgba(212,160,23,0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (!pkg.featured) {
              e.currentTarget.style.borderColor = "rgba(212,160,23,0.25)";
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}

// ── Trust Marquee ────────────────────────────────────────────────────────────
function TrustMarquee() {
  const doubledItems = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <div
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
        .trust-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function HajjUmrah() {
  const sectionRef = useRef(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .hajj-page {
          padding-top: 80px;
          background: #ffffff;
          min-height: 100vh;
        }

        .hajj-hero {
          position: relative;
          padding: clamp(60px, 10vh, 100px) clamp(20px, 5vw, 48px);
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%);
          text-align: center;
          overflow: hidden;
        }

        .hajj-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(212,160,23,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(212,160,23,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        .hajj-hero h1 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          letter-spacing: -0.02em;
          color: #FFFFFF;
          margin-bottom: 16px;
          position: relative;
        }

        .hajj-hero h1 .highlight {
          color: #F7C948;
        }

        .hajj-hero p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          font-weight: 400;
          color: rgba(255,255,255,0.75);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.8;
          position: relative;
        }

        .hajj-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(40px, 6vh, 64px) clamp(20px, 5vw, 48px);
        }

        .hajj-content-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .hajj-content-header .eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem);
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A017;
          display: block;
          margin-bottom: 12px;
        }

        .hajj-content-header h2 {
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          color: #111111;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .hajj-content-header h2 em {
          font-style: italic;
          color: #D4A017;
        }

        .hajj-content-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.9rem, 1vw, 1rem);
          color: #5F5F5F;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .hajj-cta-section {
          padding: 40px;
          background: linear-gradient(135deg, #FFF8E6, #FFFBEF);
          border-radius: 20px;
          border: 1px solid rgba(212,160,23,0.1);
          text-align: center;
        }

        .hajj-cta-section h3 {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          color: #111111;
          margin-bottom: 8px;
        }

        .hajj-cta-section p {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #5F5F5F;
          margin-bottom: 20px;
        }

        .hajj-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          background: linear-gradient(135deg, #F7C948 0%, #D4A017 100%);
          border: none;
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #111111;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(212,160,23,0.25);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .hajj-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(212,160,23,0.35);
        }

        @media (max-width: 600px) {
          .packages-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="hajj-page" id="hajj-umrah">
        {/* Hero Section */}
        <div className="hajj-hero">
          <h1>
            Hajj &amp; <span className="highlight">Umrah</span>
          </h1>
          <p>
            Embark on a sacred journey with our comprehensive pilgrimage packages
            — guided, supported, and designed for spiritual fulfillment.
          </p>
        </div>

        <TrustMarquee />

        {/* Packages */}
        <div className="hajj-content">
          <div className="hajj-content-header">
            <span className="eyebrow">Sacred Journeys</span>
            <h2>
              Choose Your <em>Pilgrimage Package</em>
            </h2>
            <p>
              Each package is crafted with care — combining reliable logistics,
              spiritual guidance, and the comfort you deserve on every step of
              your journey.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="hajj-cta-section">
            <h3>Ready to Begin Your Pilgrimage?</h3>
            <p>Contact us today to start planning your Hajj or Umrah journey.</p>
            <button
              className="hajj-cta-btn"
              onClick={() => {
                const el = document.getElementById("booking");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Book Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}