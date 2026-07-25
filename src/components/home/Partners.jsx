// src/components/home/Partners.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Partners Section
//
// "Leading Travel Brands We Work With"
// All partners display real images with circular 50% border-radius.
//
// Marquee: Airlines → Left | Hotels → Right | Organizations → Left (slow)
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// Partner Logo Images — Cloudinary + Reliable Unsplash URLs
// ══════════════════════════════════════════════════════════════════════════
const LOGOS = Object.freeze({
  // Airlines — aviation-themed imagery that will always load
  EMIRATES: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&h=400&fit=crop&crop=center",
  QATAR: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop&crop=center",
  ETIHAD: "https://images.unsplash.com/photo-1542296332-2e4473faf563?w=400&h=400&fit=crop&crop=center",
  SAUDIA: "https://images.unsplash.com/photo-1559066653-0b37a6f3e49b?w=400&h=400&fit=crop&crop=center",
  FLYDUBAI: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=400&fit=crop&crop=center",

  // Hotels — Cloudinary official logos
  HILTON: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784975688/HILTON_HOTEL_sycyce.jpg",
  MARRIOTT: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784975687/MARRIOT_HOTEL_fv3ec3.jpg",
  ACCOR: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784976423/ACCOR_HOTEL_v4noov.jpg",

  // Organizations — Cloudinary logos + reliable Unsplash
  MINISTRY_HAJJ: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784975686/MINISTRY_OF_UMRAH_AND_HAJJ_mfuflh.jpg",
  SAUDI_TOURISM: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=400&h=400&fit=crop&crop=center",
  IATA: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784975687/IATA_LOGO_ghedhd.jpg",
  WTTC: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop&crop=center",
});

// ══════════════════════════════════════════════════════════════════════════
// Partners Data — All with logo images
// ══════════════════════════════════════════════════════════════════════════
const AIRLINES = Object.freeze([
  { id: 1, name: "Emirates", logo: LOGOS.EMIRATES, description: "Award-winning international airline" },
  { id: 2, name: "Qatar Airways", logo: LOGOS.QATAR, description: "World's best airline" },
  { id: 3, name: "Etihad Airways", logo: LOGOS.ETIHAD, description: "UAE's national carrier" },
  { id: 4, name: "Saudi Arabian Airlines", logo: LOGOS.SAUDIA, description: "Official carrier of Saudi Arabia" },
  { id: 5, name: "Flydubai", logo: LOGOS.FLYDUBAI, description: "Dubai-based international airline" },
]);

const HOTELS = Object.freeze([
  { id: 6, name: "Hilton Hotels", logo: LOGOS.HILTON, description: "Premium global accommodations" },
  { id: 7, name: "Marriott International", logo: LOGOS.MARRIOTT, description: "Leading hospitality brand" },
  { id: 8, name: "Accor", logo: LOGOS.ACCOR, description: "Global hospitality leader" },
]);

const ORGANIZATIONS = Object.freeze([
  { id: 9, name: "Ministry of Hajj & Umrah", logo: LOGOS.MINISTRY_HAJJ, description: "Saudi Ministry of Hajj and Umrah" },
  { id: 10, name: "Saudi Tourism Authority", logo: LOGOS.SAUDI_TOURISM, description: "Official tourism body of Saudi Arabia" },
  { id: 11, name: "IATA", logo: LOGOS.IATA, description: "International Air Transport Association" },
  { id: 12, name: "WTTC", logo: LOGOS.WTTC, description: "World Travel & Tourism Council" },
]);

// ══════════════════════════════════════════════════════════════════════════
// Hook: IntersectionObserver
// ══════════════════════════════════════════════════════════════════════════
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

// ══════════════════════════════════════════════════════════════════════════
// Partner Card — Circular 50% border-radius on all images
// ══════════════════════════════════════════════════════════════════════════
function PartnerCard({ partner, inView, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const delay = 0.04 * (index % 8);

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        flex: "0 0 auto",
        width: "clamp(150px, 17vw, 210px)",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(18px, 2.5vw, 32px) clamp(14px, 2vw, 24px)",
          background: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
          borderRadius: "16px",
          border: `1px solid ${hovered ? "rgba(212,160,23,0.18)" : "rgba(0,0,0,0.04)"}`,
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.06), 0 4px 16px rgba(212,160,23,0.06)"
            : "0 2px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)",
          transform: hovered ? "translateY(-4px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "all 0.35s cubic-bezier(0.25,1,0.5,1)",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle top accent line on hover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #D4A017, transparent)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            transition: "all 0.4s ease",
            filter: hovered ? "grayscale(0%)" : "grayscale(25%)",
            opacity: hovered ? 1 : 0.78,
          }}
        >
          {/* ── Circular Logo Image (50% border-radius) ── */}
          <div
            style={{
              width: "clamp(58px, 7vw, 80px)",
              height: "clamp(58px, 7vw, 80px)",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.4s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              overflow: "hidden",
              padding: "8px",
              border: `2px solid ${hovered ? "rgba(212,160,23,0.35)" : "rgba(0,0,0,0.06)"}`,
              boxShadow: hovered
                ? "0 4px 16px rgba(212,160,23,0.12)"
                : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {imgError ? (
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "clamp(10px, 1.1vw, 13px)",
                  fontWeight: 700,
                  color: "#D4A017",
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "4px",
                }}
              >
                {partner.name.charAt(0)}
              </span>
            ) : (
              <img
                src={partner.logo}
                alt={`${partner.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Partner name */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(10px, 0.9vw, 13px)",
              fontWeight: 600,
              color: hovered ? "#111111" : "#4a5568",
              textAlign: "center",
              transition: "color 0.3s ease",
              lineHeight: 1.3,
            }}
          >
            {partner.name}
          </span>
        </div>

        {/* Description tooltip on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "clamp(8px,1vw,14px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(8px,0.6vw,10px)",
              fontWeight: 500,
              color: "#D4A017",
              background: "rgba(255,255,255,0.95)",
              padding: "4px 12px",
              borderRadius: "50px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              whiteSpace: "nowrap",
              border: "1px solid rgba(212,160,23,0.1)",
            }}
          >
            {partner.description}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Directional Marquee Row
// ══════════════════════════════════════════════════════════════════════════
function MarqueeRow({ partners, inView, direction = "left", speed = 30, badgeColor = "#D4A017", title, isMobile }) {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const items = [...partners, ...partners, ...partners];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !inView) return;

    let animationId;
    let position = 0;
    const pixelsPerFrame = speed / 60;

    const animate = () => {
      if (!isPaused) {
        if (direction === "left") {
          position -= pixelsPerFrame;
          if (position <= -(track.scrollWidth / 3)) {
            position = 0;
          }
        } else {
          position += pixelsPerFrame;
          if (position >= 0) {
            position = -(track.scrollWidth / 3);
          }
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [inView, isPaused, direction, speed]);

  return (
    <div style={{ marginBottom: "clamp(28px, 4vh, 40px)" }}>
      {/* Category Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "clamp(16px, 2vh, 24px)",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "24px",
            borderRadius: "2px",
            background: badgeColor,
            flexShrink: 0,
          }}
        />
        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
            fontWeight: 700,
            color: "#111111",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {title}
        </h3>
        {isMobile && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(9px, 0.7vw, 11px)",
              fontWeight: 500,
              color: "#5F5F5F",
              marginLeft: "auto",
            }}
          >
            <span
              style={{
                display: "inline-block",
                animation:
                  direction === "left"
                    ? "arrowLeft 1.5s ease-in-out infinite"
                    : "arrowRight 1.5s ease-in-out infinite",
              }}
            >
              {direction === "left" ? "←" : "→"}
            </span>
            {partners.length} brands
          </span>
        )}
        {!isMobile && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(10px, 0.8vw, 12px)",
              fontWeight: 500,
              color: "#5F5F5F",
              marginLeft: "auto",
            }}
          >
            {partners.length} brands
          </span>
        )}
      </div>

      {/* Marquee Track */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(8px, 1vw, 16px) 0",
          cursor: "grab",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Gradient masks */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "60px",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, rgba(255,248,230,0.95) 0%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "60px",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,248,230,0.95) 100%)",
          }}
        />

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "clamp(12px, 1.5vw, 20px)",
            width: "max-content",
            willChange: "transform",
          }}
        >
          {items.map((partner, index) => (
            <PartnerCard
              key={`${partner.id}-${index}`}
              partner={partner}
              inView={inView}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// Partners — Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function Partners() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerInView, setHeaderInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        @keyframes arrowLeft {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        @keyframes arrowRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        .partners-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF8E6 0%, #FFFBEF 50%, #FFFFFF 100%);
          position: relative; overflow: hidden;
        }
        .partners-section::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,160,23,0.08), transparent);
        }
        .partners-container { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }

        .partners-header { text-align: center; margin-bottom: clamp(32px, 5vh, 48px); }
        .partners-header .eyebrow {
          display: inline-flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .partners-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px); height: 1.5px;
          background: #D4A017; border-radius: 999px;
        }
        .partners-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.7rem, 0.8vw, 0.8rem); font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #D4A017;
        }
        .partners-header h2 {
          font-family: 'Manrope', sans-serif; font-weight: 800;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em; line-height: 1.1;
          color: #111111; margin-bottom: 12px;
        }
        .partners-header h2 .highlight {
          color: #D4A017; position: relative;
        }
        .partners-header h2 .highlight::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #D4A017, rgba(212,160,23,0.2));
          border-radius: 3px;
        }
        .partners-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.95rem, 1.1vw, 1.05rem); font-weight: 400;
          line-height: 1.7; color: "#5F5F5F";
          max-width: 560px; margin: 0 auto;
        }
        .partners-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1),
                      transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }

        @media (max-width: 768px) {
          .partners-section { padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px); }
          .partners-header h2 { font-size: 1.4rem; }
          .partners-header p { font-size: 13px; }
        }
        @media (max-width: 480px) {
          .partners-section { padding: 28px 12px 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-header .header-animate {
            opacity: 1 !important; transform: none !important; transition: none !important;
          }
          [style*="transform: translateX"] { animation: none !important; transform: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="partners-section"
        aria-labelledby="partners-heading"
        id="partners"
      >
        <div className="partners-container">
          {/* ── Header ── */}
          <div className="partners-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">Global Travel Network</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>
              <h2 id="partners-heading">
                Leading Travel Brands{" "}
                <span className="highlight">We Work With</span>
              </h2>
              <p>
                We arrange travel through internationally recognized airlines,
                hotel brands, and travel organizations to provide reliable,
                comfortable, and seamless travel experiences for our clients
                worldwide.
              </p>
            </div>
          </div>

          {/* ── Airlines Marquee — Scrolls LEFT ── */}
          <MarqueeRow
            partners={AIRLINES}
            inView={inView}
            direction="left"
            speed={35}
            badgeColor="#1A73E8"
            title="Airlines"
            isMobile={isMobile}
          />

          {/* ── Hotels Marquee — Scrolls RIGHT ── */}
          <MarqueeRow
            partners={HOTELS}
            inView={inView}
            direction="right"
            speed={30}
            badgeColor="#0D9488"
            title="Hotels"
            isMobile={isMobile}
          />

          {/* ── Organizations Marquee — Scrolls LEFT (slow) ── */}
          <MarqueeRow
            partners={ORGANIZATIONS}
            inView={inView}
            direction="left"
            speed={20}
            badgeColor="#D4A017"
            title="Travel & Tourism Organizations"
            isMobile={isMobile}
          />

          {/* ── Footer Badge ── */}
          <div
            style={{
              marginTop: "clamp(40px, 6vh, 56px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(12px, 0.9vw, 14px)",
                fontWeight: 500,
                color: "#111111",
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(212,160,23,0.15)",
                borderRadius: "50px",
                padding: "10px 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <CheckCircle size={18} color="#D4A017" />
              <span>Access to Leading Global Travel Providers</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}