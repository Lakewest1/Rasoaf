// src/components/common/Testimonials.jsx
import { Star } from "lucide-react";

export default function Testimonials({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: 40,
        color: "#5F5F5F",
        fontFamily: "'Inter', sans-serif",
      }}>
        No testimonials yet.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
      }}
    >
      {data.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: 28,
            border: "1px solid #E6D5A8",
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} size={14} fill="#F7C948" color="#F7C948" />
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "#5F5F5F",
              lineHeight: 1.7,
              marginBottom: 16,
              fontStyle: "italic",
            }}
          >
            "{item.quote}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(212,160,23,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                color: "#B8860B",
                fontSize: 18,
              }}
            >
              {item.name?.charAt(0) || "?"}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 600,
                  color: "#111",
                  fontSize: 15,
                  marginBottom: 2,
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  color: "#5F5F5F",
                }}
              >
                {item.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}