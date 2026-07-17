// src/components/gateway/animations.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Centralized Animation System
// All variants, transitions, and keyframes. Zero runtime allocation.
// ─────────────────────────────────────────────────────────────────────────────

import { EASING, TIMING, COLORS, SHADOWS } from "./constants";

// ══════════════════════════════════════════════════════════════════════════
//  CSS KEYFRAMES — injected once
// ══════════════════════════════════════════════════════════════════════════
export const GLOBAL_KEYFRAMES = `
  @keyframes gw-bg-zoom {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50%      { transform: translate3d(0, 0, 0) scale(1.06); }
  }

  @keyframes gw-seam-glow {
    0%, 100% { opacity: 0.35; }
    50%      { opacity: 0.65; }
  }

  @keyframes gw-seam-shimmer {
    0%   { top: -10%; }
    100% { top: 110%; }
  }

  @keyframes gw-btn-sweep {
    0%, 88%  { left: -120%; }
    100%     { left: 140%; }
  }

  @keyframes gw-dust-float {
    0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.10; }
    25%      { transform: translate3d(3px, -12px, 0); opacity: 0.22; }
    50%      { transform: translate3d(-2px, -20px, 0); opacity: 0.15; }
    75%      { transform: translate3d(-4px, -8px, 0); opacity: 0.20; }
  }

  @keyframes gw-logo-shimmer {
    0%, 100% { text-shadow: ${SHADOWS.LOGO_IDLE}; }
    50%      { text-shadow: ${SHADOWS.LOGO_PEAK}; }
  }

  @keyframes gw-light-drift {
    0%, 100% { opacity: 0.35; transform: translate3d(0, 0, 0); }
    33%      { opacity: 0.50; transform: translate3d(2%, -1%, 0); }
    66%      { opacity: 0.30; transform: translate3d(-1%, 1%, 0); }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  TRANSITION PRESETS — plain objects, no factories
// ══════════════════════════════════════════════════════════════════════════
export const transitions = {
  /** UI elements — badges, text, subtle hover */
  premium: {
    duration: TIMING.HOVER,
    ease: EASING.PREMIUM,
  },

  /** Curtains, heavy objects */
  physical: {
    duration: TIMING.CURTAIN_CLOSE,
    ease: EASING.PHYSICAL,
  },

  /** Buttons, interactive elements */
  spring: {
    duration: TIMING.HOVER,
    ease: EASING.SPRING,
  },

  /** Flash overlay entrance */
  flashIn: {
    duration: TIMING.FLASH_IN,
    ease: EASING.EASE_OUT,
  },

  /** Flash overlay exit */
  flashOut: {
    duration: TIMING.FLASH_OUT,
    ease: EASING.EASE_IN,
  },

  /** Crossfade to black */
  crossfade: {
    duration: TIMING.CROSSFADE,
    ease: EASING.SMOOTH,
  },

  /** Panel hover depth */
  panelHover: {
    duration: TIMING.HOVER,
    ease: EASING.PREMIUM,
  },

  /** Curtain opening (physical acceleration) */
  curtainOpen: {
    duration: TIMING.CURTAIN_OPEN,
    ease: EASING.PHYSICAL,
  },

  /** Curtain closing (gravity feel) */
  curtainClose: {
    duration: TIMING.CURTAIN_CLOSE,
    ease: EASING.PHYSICAL,
  },

  /** Seam visibility */
  seam: {
    duration: 0.8,
    ease: EASING.PREMIUM,
  },

  /** Button press */
  buttonPress: {
    duration: TIMING.HOVER,
    ease: EASING.SPRING,
  },
};

// ══════════════════════════════════════════════════════════════════════════
//  FRAMER MOTION VARIANTS
// ══════════════════════════════════════════════════════════════════════════

export const logoVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.LOGO_FADE_IN,
      ease: EASING.LUXURY,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: {
      duration: TIMING.LOGO_FADE_OUT,
      ease: EASING.SMOOTH,
    },
  },
};

export const contentVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(3px)",
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * TIMING.TEXT_STAGGER,
      duration: 0.55,
      ease: EASING.PREMIUM,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: EASING.SMOOTH },
  },
};

export const flashVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.flashIn,
  },
  exit: {
    opacity: 0,
    transition: transitions.flashOut,
  },
};

export const crossfadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.crossfade,
  },
};