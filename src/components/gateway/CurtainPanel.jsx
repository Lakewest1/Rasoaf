// src/components/gateway/CurtainPanel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Single Luxury Curtain Panel
// Velvet simulation, volumetric lighting, physical interactions.
// All styles via centralized constants. Zero layout thrashing.
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { COLORS, GRADIENTS, SHADOWS, TIMING, EASING, Z_INDEX } from "./constants";
import { contentVariants, transitions } from "./animations";

// ══════════════════════════════════════════════════════════════════════════
//  STYLE HELPERS — pure functions, called per render (lightweight)
// ══════════════════════════════════════════════════════════════════════════

const panelContainerStyle = (isLeft, isHovered) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "50%",
  [isLeft ? "left" : "right"]: 0,
  overflow: "hidden",
  cursor: "pointer",
  willChange: "transform",
  backfaceVisibility: "hidden",
  boxShadow: isHovered ? SHADOWS.PANEL_HOVER : SHADOWS.PANEL_IDLE,
});

const backgroundImageStyle = (image) => ({
  position: "absolute",
  inset: "-4%",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  animation: "gw-bg-zoom 40s ease-in-out infinite",
});

const overlayStyle = (overlayColor) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background: overlayColor,
});

const edgeDarkStyle = (isLeft) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background: isLeft ? GRADIENTS.EDGE_DARK_LEFT : GRADIENTS.EDGE_DARK_RIGHT,
});

const edgeLightStyle = (isLeft) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background: isLeft ? GRADIENTS.EDGE_LIGHT_LEFT : GRADIENTS.EDGE_LIGHT_RIGHT,
});

const VIGNETTE_STYLE = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  background: GRADIENTS.VIGNETTE,
};

const lightingStyle = (isLeft) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  pointerEvents: "none",
  willChange: "opacity",
  background: isLeft ? GRADIENTS.LIGHTING_LEFT : GRADIENTS.LIGHTING_RIGHT,
  animation: "gw-light-drift 16s ease-in-out infinite",
});

const CONTENT_WRAPPER_STYLE = {
  position: "absolute",
  inset: 0,
  zIndex: Z_INDEX.PANEL_CONTENT,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "clamp(24px, 6vw, 80px)",
};

const badgeStyle = (isHovered) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 20px",
  borderRadius: 50,
  marginBottom: 24,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  background: isHovered ? COLORS.BADGE_BG_HOVER : COLORS.BADGE_BG_IDLE,
  border: `1px solid ${isHovered ? COLORS.BADGE_BORDER_HOVER : COLORS.BADGE_BORDER_IDLE}`,
  boxShadow: isHovered ? `0 0 18px ${COLORS.BADGE_GLOW}` : "none",
});

const BADGE_TEXT_STYLE = {
  color: COLORS.GOLD_LIGHT,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  fontFamily: "'Inter', sans-serif",
};

const titleStyle = (isHovered) => ({
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(32px, 6vw, 60px)",
  color: COLORS.WHITE,
  marginBottom: 16,
  lineHeight: 1.1,
  letterSpacing: isHovered ? "0em" : "-0.02em",
  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
  transition: `letter-spacing ${TIMING.HOVER}s ease, transform ${TIMING.HOVER}s ease`,
});

const DESC_STYLE = {
  fontSize: "clamp(14px, 1.5vw, 17px)",
  color: COLORS.MUTED,
  lineHeight: 1.7,
  marginBottom: 32,
  maxWidth: 440,
  fontFamily: "'Inter', sans-serif",
};

const buttonStyle = (isHovered) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "14px 32px",
  borderRadius: 14,
  border: "none",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  color: "#111",
  position: "relative",
  overflow: "hidden",
  background: isHovered ? GRADIENTS.BUTTON_HOVER : GRADIENTS.BUTTON,
  fontFamily: "'Inter', sans-serif",
  letterSpacing: "0.01em",
  boxShadow: isHovered ? SHADOWS.BTN_HOVER : SHADOWS.BTN_IDLE,
  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
});

const BTN_TOP_HIGHLIGHT = {
  position: "absolute",
  inset: 0,
  borderRadius: 14,
  background: GRADIENTS.BUTTON_HIGHLIGHT,
  pointerEvents: "none",
};

const BTN_SWEEP = {
  position: "absolute",
  top: 0,
  left: "-120%",
  width: "60%",
  height: "100%",
  background: GRADIENTS.BTN_SWEEP,
  transform: "skewX(-20deg)",
  animation: "gw-btn-sweep 3.5s ease-in-out infinite",
  pointerEvents: "none",
  zIndex: 1,
};

const BTN_TEXT_STYLE = { position: "relative", zIndex: 2 };

const ARROW_STYLE = { position: "relative", zIndex: 2, display: "flex" };

// ══════════════════════════════════════════════════════════════════════════
//  COMPONENT
// ══════════════════════════════════════════════════════════════════════════
const CurtainPanel = memo(function CurtainPanel({
  side,
  image,
  overlayColor,
  content,
  phase,
  curtainX,
  isHovered,
  isOpening,
  isCompressed,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const isLeft = side === "left";

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  }, [onClick]);

  const panelTransition = isOpening || isCompressed
    ? transitions.curtainOpen
    : phase === "closing"
      ? transitions.curtainClose
      : transitions.premium;

  const showContent = phase !== "logo";

  return (
    <motion.div
      animate={{
        x: curtainX,
        scale: isCompressed ? 0.96 : 1,
        zIndex: isHovered ? Z_INDEX.PANEL_HOVER : Z_INDEX.PANEL_BASE,
      }}
      transition={panelTransition}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={content.button}
      onKeyDown={handleKeyDown}
      style={panelContainerStyle(isLeft, isHovered)}
    >
      {/* Background */}
      <div style={backgroundImageStyle(image)} />

      {/* Overlay */}
      <div style={overlayStyle(overlayColor)} />

      {/* Velvet edges */}
      <div style={edgeDarkStyle(isLeft)} />
      <div style={edgeLightStyle(isLeft)} />

      {/* Vignette */}
      <div style={VIGNETTE_STYLE} />

      {/* Volumetric lighting */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={transitions.panelHover}
        style={lightingStyle(isLeft)}
      />

      {/* Content */}
      {showContent && (
        <div style={CONTENT_WRAPPER_STYLE}>
          <motion.div custom={0} variants={contentVariants} initial="hidden" animate={phase === "idle" ? "visible" : "hidden"}>
            <motion.div animate={badgeStyle(isHovered)} transition={transitions.panelHover}>
              <Sparkles size={12} color={COLORS.GOLD_LIGHT} />
              <span style={BADGE_TEXT_STYLE}>{content.badge}</span>
            </motion.div>
          </motion.div>

          <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate={phase === "idle" ? "visible" : "hidden"} style={titleStyle(isHovered)}>
            {content.title}
          </motion.h1>

          <motion.p custom={2} variants={contentVariants} initial="hidden" animate={phase === "idle" ? "visible" : "hidden"} style={DESC_STYLE}>
            {content.description}
          </motion.p>

          <motion.div custom={3} variants={contentVariants} initial="hidden" animate={phase === "idle" ? "visible" : "hidden"}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={transitions.buttonPress}
              tabIndex={-1}
              style={buttonStyle(isHovered)}
            >
              <span style={BTN_TOP_HIGHLIGHT} aria-hidden="true" />
              <span style={BTN_SWEEP} aria-hidden="true" />
              <span style={BTN_TEXT_STYLE}>{content.button}</span>
              <motion.span
                animate={{ x: isHovered ? 6 : 0 }}
                transition={transitions.panelHover}
                style={ARROW_STYLE}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
});

export default CurtainPanel;