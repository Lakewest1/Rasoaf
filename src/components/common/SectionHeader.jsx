// src/components/common/SectionHeader.jsx
export default function SectionHeader({ badge, badgeIcon, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      {badge && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 16px",
            background: "rgba(212,160,23,0.08)",
            color: "#B8860B",
            borderRadius: 50,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
            letterSpacing: "0.02em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {badgeIcon && badgeIcon}
          {badge}
        </span>
      )}
      <h2
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 40px)",
          color: "#111111",
          marginBottom: 12,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: 16,
            color: "#5F5F5F",
            maxWidth: 550,
            margin: "0 auto",
            lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}