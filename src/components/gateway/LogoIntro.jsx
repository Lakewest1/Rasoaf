// src/components/gateway/LogoIntro.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Logo Introduction
// Fades in with gold shimmer, holds, then exits before curtains close.
// Production-ready. No changes required.
// ─────────────────────────────────────────────────────────────────────────────

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoVariants } from "./animations";
import { COLORS, Z_INDEX } from "./constants";

const WRAPPER_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: Z_INDEX.LOGO,
  textAlign: "center",
  pointerEvents: "none",
};

const LOGO_TEXT_STYLE = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(44px, 8vw, 68px)",
  color: COLORS.WHITE,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  willChange: "text-shadow",
  animation: "gw-logo-shimmer 2.4s ease-in-out infinite",
};

const SUBTEXT_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(9px, 1.2vw, 11px)",
  fontWeight: 500,
  color: COLORS.MUTED_LIGHT,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  marginTop: 10,
};

const LogoIntro = memo(function LogoIntro({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={WRAPPER_STYLE}
        >
          <div style={LOGO_TEXT_STYLE}>RASOAF</div>
          <div style={SUBTEXT_STYLE}>Travels & Tours Limited</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default LogoIntro;