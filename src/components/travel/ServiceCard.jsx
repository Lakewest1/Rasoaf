// src/components/travel/ServiceCard.jsx
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function TravelServiceCard({ icon: Icon, title, description, color = "#1A73E8", onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={onClick ? { transform: "translateY(-6px)", boxShadow: "0 16px 48px rgba(0,0,0,0.1)" } : {}}
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "clamp(24px, 3vw, 32px)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid #E6D5A8",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {Icon && (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `${color}15`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={28} color={color} />
        </div>
      )}
      <h3
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: "#111",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: 14,
            color: "#5F5F5F",
            lineHeight: 1.6,
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
            color: "#1A73E8",
            fontWeight: 600,
            fontSize: 14,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Learn More <ArrowRight size={14} />
        </div>
      )}
    </motion.div>
  );
}