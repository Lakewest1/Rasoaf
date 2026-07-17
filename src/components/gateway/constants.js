// src/components/gateway/constants.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Enterprise Design System Constants
// Single source of truth for every design token.
// CSS custom properties, Framer Motion values, responsive breakpoints.
// ─────────────────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════════
//  COLORS
// ══════════════════════════════════════════════════════════════════════════
export const COLORS = {
  GOLD:           "#C4972A",
  GOLD_LIGHT:     "#F7C948",
  GOLD_DARK:      "#8B6914",
  GOLD_GLOW:      "rgba(196,151,42,0.22)",
  GOLD_SHIMMER:   "rgba(247,201,72,0.10)",
  BG_DARK:        "#071018",
  WHITE:          "#FFFFFF",
  MUTED:          "rgba(255,255,255,0.72)",
  MUTED_LIGHT:    "rgba(255,255,255,0.45)",
  BLACK_40:       "rgba(0,0,0,0.40)",
  BLACK_50:       "rgba(0,0,0,0.50)",
  BLACK_60:       "rgba(0,0,0,0.60)",
  BLACK_72:       "rgba(0,0,0,0.72)",
  OVERLAY_HAJJ:   "rgba(0,0,0,0.52)",
  OVERLAY_TRAVEL: "rgba(5,20,40,0.60)",
  OVERLAY_TRAVEL_BOTTOM: "rgba(5,15,35,0.78)",
  FLASH_CORE:     "rgba(255,252,240,0.92)",
  FLASH_MID:      "rgba(255,248,220,0.45)",
  FLASH_EDGE:     "rgba(255,245,215,0.15)",
  BADGE_BG_IDLE:  "rgba(196,151,42,0.10)",
  BADGE_BG_HOVER: "rgba(196,151,42,0.16)",
  BADGE_BORDER_IDLE:  "rgba(196,151,42,0.28)",
  BADGE_BORDER_HOVER: "rgba(196,151,42,0.45)",
  BADGE_GLOW:     "rgba(196,151,42,0.06)",
  LIGHT_IDLE:     "rgba(196,151,42,0.05)",
  DUST_COLOR:     "#F7C948",
};

// ══════════════════════════════════════════════════════════════════════════
//  GRADIENTS — pre-computed, never recomputed
// ══════════════════════════════════════════════════════════════════════════
export const GRADIENTS = {
  OVERLAY_HAJJ:   `linear-gradient(180deg, ${COLORS.OVERLAY_HAJJ} 0%, ${COLORS.BLACK_72} 100%)`,
  OVERLAY_TRAVEL: `linear-gradient(180deg, ${COLORS.OVERLAY_TRAVEL} 0%, ${COLORS.OVERLAY_TRAVEL_BOTTOM} 100%)`,
  BUTTON:         `linear-gradient(135deg, ${COLORS.GOLD_LIGHT} 0%, ${COLORS.GOLD} 100%)`,
  BUTTON_HOVER:   `linear-gradient(135deg, #FFE082 0%, ${COLORS.GOLD_LIGHT} 100%)`,
  BUTTON_HIGHLIGHT: "linear-gradient(180deg, rgba(255,255,255,0.25), transparent 60%)",
  BTN_SWEEP:      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
  SEAM_LINE:      `linear-gradient(180deg, transparent 8%, ${COLORS.GOLD} 25%, ${COLORS.GOLD_LIGHT} 50%, ${COLORS.GOLD} 75%, transparent 92%)`,
  SHIMMER:        "linear-gradient(180deg, transparent, rgba(255,255,255,0.22), transparent)",
  EDGE_DARK_LEFT:  "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 25%)",
  EDGE_DARK_RIGHT: "linear-gradient(270deg, rgba(0,0,0,0.6) 0%, transparent 25%)",
  EDGE_LIGHT_LEFT: "linear-gradient(270deg, rgba(0,0,0,0.5) 0%, transparent 20%)",
  EDGE_LIGHT_RIGHT:"linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 20%)",
  VIGNETTE: `
    radial-gradient(ellipse 120% 35% at 50% 0%, rgba(0,0,0,0.45) 0%, transparent 60%),
    radial-gradient(ellipse 100% 55% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)
  `,
  LIGHTING_LEFT:  "radial-gradient(ellipse 80% 50% at 25% 45%, rgba(196,151,42,0.05) 0%, transparent 65%)",
  LIGHTING_RIGHT: "radial-gradient(ellipse 80% 50% at 75% 45%, rgba(196,151,42,0.05) 0%, transparent 65%)",
  FLASH_BG: `
    radial-gradient(
      ellipse 55% 35% at 50% 45%,
      ${COLORS.FLASH_CORE} 0%,
      ${COLORS.FLASH_MID} 25%,
      ${COLORS.FLASH_EDGE} 50%,
      transparent 75%
    )
  `,
  LENS_STREAK: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 80%, transparent)",
};

// ══════════════════════════════════════════════════════════════════════════
//  SHADOWS
// ══════════════════════════════════════════════════════════════════════════
export const SHADOWS = {
  SEAM:         `0 0 28px ${COLORS.GOLD_GLOW}, 0 0 8px ${COLORS.GOLD_SHIMMER}`,
  BTN_IDLE:     "0 4px 24px rgba(196,151,42,0.25)",
  BTN_HOVER:    "0 8px 36px rgba(196,151,42,0.40)",
  PANEL_IDLE:   "inset 0 0 60px rgba(0,0,0,0.4)",
  PANEL_HOVER:  "inset 0 0 80px rgba(0,0,0,0.5), 4px 0 40px rgba(0,0,0,0.4)",
  LOGO_IDLE:    "0 0 40px rgba(196,151,42,0.25)",
  LOGO_PEAK:    "0 0 80px rgba(196,151,42,0.50), 0 0 120px rgba(196,151,42,0.15)",
};

// ══════════════════════════════════════════════════════════════════════════
//  Z-INDEX LAYERS — strict hierarchy prevents conflicts
// ══════════════════════════════════════════════════════════════════════════
export const Z_INDEX = {
  DUST:         50,
  SEAM:        100,
  PANEL_BASE:    1,
  PANEL_HOVER:   2,
  PANEL_CONTENT: 3,
  LOGO:        200,
  CROSSFADE: 99998,
  FLASH:     99999,
  ROOT:       9999,
};

// ══════════════════════════════════════════════════════════════════════════
//  TIMING — all values in seconds (Framer Motion native)
// ══════════════════════════════════════════════════════════════════════════
export const TIMING = {
  LOGO_FADE_IN:     0.5,
  LOGO_HOLD:        0.8,
  LOGO_FADE_OUT:    0.4,
  CURTAIN_CLOSE:    2.2,
  TEXT_STAGGER:     0.14,
  HOVER:            0.28,
  BUTTON_DEPRESS:   0.12,
  TENSION_BUILD:    0.3,
  CURTAIN_OPEN:     0.8,
  FLASH_IN:         0.18,
  FLASH_HOLD:       0.12,
  FLASH_OUT:        0.2,
  CROSSFADE:        0.4,
  NAVIGATE_DELAY:   0.1,
};

// ══════════════════════════════════════════════════════════════════════════
//  DURATIONS — pre-computed totals (seconds)
// ══════════════════════════════════════════════════════════════════════════
export const DURATIONS = {
  LOGO_TOTAL:       TIMING.LOGO_FADE_IN + TIMING.LOGO_HOLD,
  CLOSE_TOTAL:      TIMING.LOGO_FADE_IN + TIMING.LOGO_HOLD + TIMING.CURTAIN_CLOSE,
  OPEN_TO_FLASH:    TIMING.CURTAIN_OPEN,
  FLASH_TO_CROSSFADE: TIMING.FLASH_IN + TIMING.FLASH_HOLD,
  OPEN_TO_NAVIGATE: TIMING.CURTAIN_OPEN + TIMING.FLASH_IN + TIMING.FLASH_HOLD + TIMING.FLASH_OUT + TIMING.CROSSFADE,
};

// ══════════════════════════════════════════════════════════════════════════
//  EASING — Framer Motion arrays + CSS strings
// ══════════════════════════════════════════════════════════════════════════
const _easingArrays = {
  PREMIUM:  [0.22, 1, 0.36, 1],
  LUXURY:   [0.16, 1, 0.3, 1],
  SPRING:   [0.34, 1.56, 0.64, 1],
  SMOOTH:   [0.4, 0, 0.2, 1],
  PHYSICAL: [0.05, 0.7, 0.1, 1],
  EASE_OUT: [0, 0, 0.2, 1],
  EASE_IN:  [0.4, 0, 0.6, 1],
};

// Framer Motion native (arrays)
export const EASING = _easingArrays;

// CSS string equivalents
export const EASING_CSS = Object.fromEntries(
  Object.entries(_easingArrays).map(([key, arr]) => [
    key,
    `cubic-bezier(${arr.join(",")})`,
  ])
);

// ══════════════════════════════════════════════════════════════════════════
//  RESPONSIVE BREAKPOINTS
// ══════════════════════════════════════════════════════════════════════════
export const BREAKPOINTS = {
  MOBILE_S:  320,
  MOBILE_M:  375,
  MOBILE_L:  414,
  TABLET:    768,
  TABLET_L:  1024,
  DESKTOP:   1280,
  DESKTOP_L: 1440,
  DESKTOP_XL:1920,
  UHD:       2560,
};

// ══════════════════════════════════════════════════════════════════════════
//  CURTAIN POSITIONS
// ══════════════════════════════════════════════════════════════════════════
export const CURTAIN = {
  INITIAL_LEFT:   "10%",
  INITIAL_RIGHT:  "-10%",
  CLOSED:         "0%",
  OPEN_LEFT:      "-70%",
  OPEN_RIGHT:     "70%",
  COMPRESS_LEFT:  "12%",
  COMPRESS_RIGHT: "-12%",
  COMPRESS_SCALE: 0.96,
};

// ══════════════════════════════════════════════════════════════════════════
//  PARTICLES CONFIGURATION
// ══════════════════════════════════════════════════════════════════════════
export const PARTICLES = {
  COUNT:        14,
  MIN_SIZE:     1.5,
  SIZE_RANGE:   2.5,
  MIN_OPACITY:  0.08,
  OPACITY_RANGE:0.14,
  MIN_DURATION: 7,
  DURATION_RANGE:11,
  MAX_DELAY:    8,
};

// ══════════════════════════════════════════════════════════════════════════
//  PANEL CONTENT
// ══════════════════════════════════════════════════════════════════════════
export const PANEL_IMAGES = {
  hajj:   "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&h=1600&fit=crop",
  travel: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1600&fit=crop",
};

export const PANEL_CONTENT = {
  hajj: {
    badge:      "Sacred Journeys",
    title:      "Hajj & Umrah",
    description:"Embark on a blessed pilgrimage with expert guidance. Premium packages crafted with care and spiritual devotion.",
    button:     "Explore Hajj & Umrah",
    route:      "/hajj",
  },
  travel: {
    badge:      "Global Adventures",
    title:      "Travel & Tours",
    description:"Visa services, flight bookings, hotel reservations, and curated tours for every traveller.",
    button:     "Explore Travel & Tours",
    route:      "/travel",
  },
};

// ══════════════════════════════════════════════════════════════════════════
//  CSS CUSTOM PROPERTIES — for runtime theming in style tags
// ══════════════════════════════════════════════════════════════════════════
export const CSS_VARS = `
  :root {
    --gw-gold: ${COLORS.GOLD};
    --gw-gold-light: ${COLORS.GOLD_LIGHT};
    --gw-bg-dark: ${COLORS.BG_DARK};
    --gw-white: ${COLORS.WHITE};
    --gw-muted: ${COLORS.MUTED};
    --gw-easing-premium: ${EASING_CSS.PREMIUM};
    --gw-easing-physical: ${EASING_CSS.PHYSICAL};
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  3D SCENE CONSTANTS — LOCAL TEXTURES WITH PROCEDURAL FALLBACKS
// ══════════════════════════════════════════════════════════════════════════

// ── Texture paths — all served from /public/textures/ ─────────────────────
// If a texture is missing, the loader automatically falls back to
// procedural colors/materials. No crash. No blank screen.
export const TEXTURES = {
  EARTH: {
    DAY:      "/textures/earth-day.jpg",
    BUMP:     "/textures/earth-bump.jpg",
    SPECULAR: "/textures/earth-specular.jpg",
    CLOUDS:   "/textures/earth-clouds.png",
  },
  // Fallback colors used when textures are unavailable
  FALLBACK: {
    EARTH_DAY:      "#224488",
    EARTH_BUMP:     0.03,       // bumpScale when no bump map
    EARTH_SPECULAR: "#334455",
    CLOUD_COLOR:    "#ffffff",
  },
};

// ── Earth Geometry ──────────────────────────────────────────────────────────
export const EARTH = {
  RADIUS: 2.5,
  SEGMENTS: 128,
  ROTATION_SPEED: 0.08,
};

// ── Cloud Layer ─────────────────────────────────────────────────────────────
export const CLOUDS = {
  RADIUS_MULTIPLIER: 1.02,
  ROTATION_SPEED: 0.12,
  OPACITY: 0.28,
  SEGMENTS: 64,
};

// ── Atmosphere — 3-layer glow ──────────────────────────────────────────────
export const ATMOSPHERE = {
  INNER_COLOR: "#aaccff",
  INNER_OPACITY: 0.06,
  INNER_RADIUS: 1.06,

  SUNRISE_COLOR: "#ffcc88",
  SUNRISE_OPACITY: 0.03,
  SUNRISE_RADIUS: 1.10,

  OUTER_COLOR: "#6688cc",
  OUTER_OPACITY: 0.04,
  OUTER_RADIUS: 1.14,
};

// ── Stars ───────────────────────────────────────────────────────────────────
export const STARS = {
  COUNT: 4000,
  SPREAD: 80,
  MIN_SIZE: 0.02,
  MAX_SIZE: 0.10,
};

// ── Space Dust ──────────────────────────────────────────────────────────────
export const SPACE_DUST = {
  COUNT: 2000,
  SPREAD: 40,
  MIN_SIZE: 0.008,
  MAX_SIZE: 0.025,
  OPACITY: 0.10,
};

// ── Gold Particles ──────────────────────────────────────────────────────────
export const GOLD_PARTICLES = {
  COUNT: 40,
  SPREAD: 10,
  MIN_SIZE: 0.015,
  MAX_SIZE: 0.04,
  OPACITY: 0.22,
  COLOR: "#F7C948",
};

// ── Camera ──────────────────────────────────────────────────────────────────
export const CAMERA = {
  INITIAL_POSITION: [0, 0, 8],
  FOV: 45,
  NEAR: 0.1,
  FAR: 200,
  BREATH_AMPLITUDE: 0.4,
  BREATH_PERIOD: 14,
  ORBIT_SPEED: 0.025,
  DRIFT_AMPLITUDE_X: 0.15,
  DRIFT_AMPLITUDE_Y: 0.10,
  DRIFT_PERIOD_X: 22,
  DRIFT_PERIOD_Y: 17,
};

// ── Cinematic Lighting ─────────────────────────────────────────────────────
export const LIGHTING = {
  SUN: {
    position: [8, 3, 5],
    intensity: 2.2,
    color: "#fff8e7",
  },
  FILL: {
    position: [-6, -1, -4],
    intensity: 0.5,
    color: "#334477",
  },
  RIM: {
    position: [-3, 2, -6],
    intensity: 0.7,
    color: "#ccaa44",
  },
  AMBIENT: {
    skyColor: "#1a2a4a",
    groundColor: "#0a0a14",
    intensity: 0.25,
  },
};