// src/components/travel/ServiceCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Service Card
// Luxury Gold + Charcoal Black palette
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TravelServiceCard({ icon: Icon, title, description, color = "#D4A017", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={onClick ? { y: -8, transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] } } : {}}
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 28,
        padding: "clamp(24px, 3vw, 36px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
        border: "1px solid rgba(212,160,23,0.12)",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.4s cubic-bezier(0.25,1,0.5,1)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!onClick) return;
        e.currentTarget.style.borderColor = "rgba(212,160,23,0.3)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(212,160,23,0.06)";
      }}
      onMouseLeave={(e) => {
        if (!onClick) return;
        e.currentTarget.style.borderColor = "rgba(212,160,23,0.12)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.03)";
      }}
    >
      {/* Subtle gold accent at top */}
      {onClick && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: 2,
            background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.3), transparent)",
            borderRadius: "0 0 2px 2px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
          className="sc-accent"
        />
      )}

      {Icon && (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "rgba(212,160,23,0.06)",
            border: "1px solid rgba(212,160,23,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          className="sc-icon"
        >
          <Icon size={26} color={color} />
        </div>
      )}

      <h3
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(17px, 1.4vw, 20px)",
          color: "#0B0F17",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontSize: 14,
            color: "#525252",
            lineHeight: 1.7,
            fontFamily: "'Inter', sans-serif",
            flex: 1,
          }}
        >
          {description}
        </p>
      )}

      {onClick && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#D4A017",
            fontWeight: 600,
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.01em",
            transition: "all 0.3s ease",
          }}
          className="sc-link"
        >
          Learn More <ArrowRight size={14} />
        </div>
      )}

      {/* Hover styles via style tag */}
      <style>{`
        .sc-accent { opacity: 0; }
        .sc-icon { transition: all 0.3s ease; }
        .sc-link { transition: all 0.3s ease; }
        .sc-card:hover .sc-accent { opacity: 1; }
        .sc-card:hover .sc-icon { background: rgba(212,160,23,0.12); border-color: rgba(212,160,23,0.2); transform: scale(1.05); }
        .sc-card:hover .sc-link { color: #B8860B; }
      `}</style>
    </motion.div>
  );
}