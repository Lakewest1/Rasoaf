// src/components/gateway/GatewaySplit.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Cinematic Gateway
// Phase 1: Earth scene added. Full sequence preserved.
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense, useCallback } from "react";
import { GLOBAL_KEYFRAMES } from "./animations";
import { COLORS, GRADIENTS, PANEL_IMAGES, PANEL_CONTENT, CURTAIN, Z_INDEX } from "./constants";
import { useGatewaySequence } from "./useGatewaySequence";
import LogoIntro from "./LogoIntro";
import CurtainPanel from "./CurtainPanel";
import GoldSeam from "./GoldSeam";
import DustParticles from "./DustParticles";
import FlashOverlay from "./FlashOverlay";
import CrossFade from "./CrossFade";

// Lazy-load the Earth scene — only downloaded when needed
const EarthScene = lazy(() => import("./three/EarthScene"));

const ROOT_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: Z_INDEX.ROOT,
  background: COLORS.BG_DARK,
  fontFamily: "'Inter', sans-serif",
  overflow: "hidden",
};

export default function GatewaySplit() {
  const {
    phase,
    openingSide,
    hovered,
    logoVisible,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useGatewaySequence();

  const getCurtainX = useCallback((side) => {
    const isLeft = side === "left";
    const isHajj = side === "left";
    if (phase === "opening") {
      if (openingSide === (isHajj ? "hajj" : "travel")) {
        return isLeft ? CURTAIN.OPEN_LEFT : CURTAIN.OPEN_RIGHT;
      }
      return isLeft ? CURTAIN.COMPRESS_LEFT : CURTAIN.COMPRESS_RIGHT;
    }
    if (phase === "logo" || phase === "earth") {
      return isLeft ? CURTAIN.INITIAL_LEFT : CURTAIN.INITIAL_RIGHT;
    }
    return CURTAIN.CLOSED;
  }, [phase, openingSide]);

  const isPanelOpening = useCallback((side) => {
    return phase === "opening" && openingSide === (side === "left" ? "hajj" : "travel");
  }, [phase, openingSide]);

  const isPanelCompressed = useCallback((side) => {
    return phase === "opening" && openingSide !== (side === "left" ? "hajj" : "travel");
  }, [phase, openingSide]);

  const seamVisible = phase === "closing" || phase === "idle" || phase === "opening";
  const curtainsVisible = phase === "logo" || phase === "earth" || phase === "closing" || phase === "idle" || phase === "opening";

  return (
    <>
      <style>{GLOBAL_KEYFRAMES}</style>
      <div style={ROOT_STYLE}>
        {/* ── Earth Scene — renders only during "earth" phase ── */}
        {phase === "earth" && (
          <Suspense fallback={null}>
            <EarthScene />
          </Suspense>
        )}

        <DustParticles />
        <LogoIntro visible={logoVisible} />
        <GoldSeam visible={seamVisible} />

        {curtainsVisible && (
          <>
            <CurtainPanel
              side="left"
              image={PANEL_IMAGES.hajj}
              overlayColor={GRADIENTS.OVERLAY_HAJJ}
              content={PANEL_CONTENT.hajj}
              phase={phase}
              curtainX={getCurtainX("left")}
              isHovered={hovered === "hajj"}
              isOpening={isPanelOpening("left")}
              isCompressed={isPanelCompressed("left")}
              onMouseEnter={() => handleMouseEnter("hajj")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("hajj")}
            />
            <CurtainPanel
              side="right"
              image={PANEL_IMAGES.travel}
              overlayColor={GRADIENTS.OVERLAY_TRAVEL}
              content={PANEL_CONTENT.travel}
              phase={phase}
              curtainX={getCurtainX("right")}
              isHovered={hovered === "travel"}
              isOpening={isPanelOpening("right")}
              isCompressed={isPanelCompressed("right")}
              onMouseEnter={() => handleMouseEnter("travel")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("travel")}
            />
          </>
        )}

        <FlashOverlay visible={phase === "flash"} />
        <CrossFade visible={phase === "crossfade"} />
      </div>
    </>
  );
}