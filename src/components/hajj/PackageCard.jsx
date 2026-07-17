// src/components/hajj/PackageCard.jsx
import { motion } from "framer-motion";
import { Star, Calendar, MapPin } from "lucide-react";

export default function PackageCard({
  name = "Package Name",
  duration = "7 Days",
  price = "₦850,000",
  location = "Makkah",
  rating = 5,
  description = "A blessed journey awaits.",
  popular = false,
  image,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={onClick ? { transform: "translateY(-6px)", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" } : {}}
      onClick={onClick}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: popular ? "2px solid #F7C948" : "1px solid #E6D5A8",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {popular && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 2,
            background: "#D4A017",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 50,
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Popular
        </div>
      )}

      {image && (
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            src={image}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}

      <div
        style={{
          padding: "clamp(16px, 2vw, 24px)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={14} fill="#F7C948" color="#F7C948" />
          ))}
        </div>

        <h3
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: "#111",
          }}
        >
          {name}
        </h3>

        {description && (
          <p
            style={{
              fontSize: 14,
              color: "#5F5F5F",
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            color: "#5F5F5F",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={13} color="#B8860B" /> {duration}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} color="#B8860B" /> {location}
          </span>
        </div>

        {price && (
          <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #E6D5A8" }}>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "#B8860B",
              }}
            >
              {price}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "#5F5F5F",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {" "}
              / person
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}