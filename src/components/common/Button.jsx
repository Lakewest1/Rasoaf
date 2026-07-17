// src/components/common/Button.jsx
export default function Button({ children, variant = "primary", onClick, style, ...props }) {
  const base = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "0.95rem",
    letterSpacing: "0.01em",
    padding: "12px 28px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #F7C948, #D4A017)",
      color: "#111111",
    },
    secondary: {
      background: "transparent",
      color: "#111111",
      border: "1px solid #E6D5A8",
    },
    outline: {
      background: "transparent",
      color: "#D4A017",
      border: "1px solid #D4A017",
    },
  };

  return (
    <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick} {...props}>
      {children}
    </button>
  );
}