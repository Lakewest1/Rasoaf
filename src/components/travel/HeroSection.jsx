// src/components/travel/HeroSection.jsx
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function TravelHeroSection({
  badge = "Global Adventures",
  title = "Your Gateway to the World",
  subtitle = "Premium visa services, flight bookings, and curated travel experiences.",
  backgroundImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=800&fit=crop",
  onCtaClick,
  ctaText = "Explore Services",
}) {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(100px, 14vw, 180px) 20px clamp(60px, 8vw, 100px)",
        background: "linear-gradient(135deg, #0A1929 0%, #0D2137 50%, #0A1929 100%)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={backgroundImage}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }}
          loading="eager"
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          background: "linear-gradient(to top, #FFF8E6, transparent)",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 10, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "rgba(212,160,23,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(212,160,23,0.25)",
              borderRadius: 50,
              marginBottom: 24,
            }}
          >
            <Sparkles size={14} color="#F7C948" />
            <span
              style={{
                color: "#F7C948",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {badge}
            </span>
          </span>

          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(32px, 6vw, 56px)",
              color: "#ffffff",
              marginBottom: 16,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 650,
              margin: "0 auto 40px",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {subtitle}
          </p>

          {onCtaClick && (
            <button
              onClick={onCtaClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 32px",
                borderRadius: 12,
                background: "#F7C948",
                color: "#111",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.01em",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(247,201,72,0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(247,201,72,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(247,201,72,0.35)";
              }}
            >
              {ctaText}
              <ArrowRight size={18} />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}