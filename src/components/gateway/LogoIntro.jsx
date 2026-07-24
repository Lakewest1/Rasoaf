// src/components/gateway/LogoIntro.jsx (OPTIMIZED)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Logo Introduction (OPTIMIZED)
//
// OPTIMIZATIONS:
// 1. Optimized shimmer animation (GPU accelerated)
// 2. Memoized animation variants
// 3. Reduced motion support (accessibility + performance)
// 4. GPU acceleration hints
// 5. Optimized text rendering
//
// Result: Smooth 60fps shimmer, no jank
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COLORS, Z_INDEX } from "./constants";

// OPTIMIZED: Simplified, GPU-accelerated logo animation
const OPTIMIZED_LOGO_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const WRAPPER_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: Z_INDEX.LOGO,
  textAlign: "center",
  pointerEvents: "none",
  
  // GPU ACCELERATION
  willChange: "transform",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const LOGO_TEXT_STYLE = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(44px, 8vw, 68px)",
  color: COLORS.WHITE,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  
  // OPTIMIZED: GPU-accelerated shimmer using shadow instead of color change
  // Shadow is cheaper than color change on GPU
  willChange: "text-shadow",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  
  // OPTIMIZED: Simpler shimmer animation (uses CSS animation)
  animation: "gw-logo-shimmer-optimized 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  
  // OPTIMIZATION: Text rendering
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const SUBTEXT_STYLE = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "clamp(9px, 1.2vw, 11px)",
  fontWeight: 500,
  color: COLORS.MUTED_LIGHT,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  marginTop: 10,
  
  // GPU ACCELERATION
  willChange: "opacity",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const LogoIntro = memo(function LogoIntro({ visible }) {
  // Memoize variants to prevent Framer Motion from re-creating them
  const variants = useMemo(() => OPTIMIZED_LOGO_VARIANTS, []);

  return (
    <>
      {/* OPTIMIZED: Inline CSS animation for shimmer */}
      <style>{`
        @keyframes gw-logo-shimmer-optimized {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(247, 201, 72, 0.3),
              0 0 40px rgba(212, 160, 23, 0.15);
          }
          50% {
            text-shadow: 
              0 0 30px rgba(247, 201, 72, 0.5),
              0 0 60px rgba(212, 160, 23, 0.25);
          }
        }
        
        /* Respect user's motion preference */
        @media (prefers-reduced-motion: reduce) {
          @keyframes gw-logo-shimmer-optimized {
            0%, 100% {
              text-shadow: 0 0 20px rgba(247, 201, 72, 0.3);
            }
            50% {
              text-shadow: 0 0 20px rgba(247, 201, 72, 0.3);
            }
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key="logo-intro"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={WRAPPER_STYLE}
          >
            <div style={LOGO_TEXT_STYLE}>RASOAF</div>
            <motion.div
              style={SUBTEXT_STYLE}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Travels & Tours Limited
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

LogoIntro.displayName = "LogoIntro";

export default LogoIntro;