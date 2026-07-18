// src/components/gateway/three/FlightNetwork/constants.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Global Route System
// Cinematic timing. Routes feel like real aircraft journeys.
// Countries as labels for a premium worldwide travel feel.
// ─────────────────────────────────────────────────────────────────────────────

export const EARTH_RADIUS = 2.5;

// ── Visual Style ────────────────────────────────────────────────────────────
export const FLIGHTS = {
  ARC_HEIGHT: 0.52,
  ARC_SEGMENTS: 80,
  ARC_COLOR: "#F7C948",
  ARC_OPACITY: 0.5,
  ARC_GLOW_COLOR: "#FFE082",
  ARC_GLOW_OPACITY: 0.08,
  PULSE_DURATION: 6.0,
  PULSE_AMPLITUDE: 0.03,
  MAIN_TUBE_RADIUS: 0.0055,
  GLOW_TUBE_RADIUS: 0.018,
  TUBE_SEGMENTS: 80,
  TUBE_RADIAL_SEGMENTS: 8,
};

export const PARTICLES = {
  COUNT_PER_ROUTE: 1,
  SIZE: 0.01,
  COLOR: "#FFE082",
  OPACITY: 0.7,
  GLOW_OPACITY: 0.15,
  GLOW_SIZE_MULTIPLIER: 3.5,
  MIN_DURATION: 3.5,
  MAX_DURATION: 5.5,
};

export const LABELS = {
  OFFSET: EARTH_RADIUS * 1.18,
  MIN_OPACITY: 0.08,
  MAX_OPACITY: 0.75,
  MARKER_SIZE: 0.022,
  MARKER_COLOR: "#F7C948",
  MARKER_OPACITY: 0.4,
  MARKER_GLOW_SIZE: 0.035,
  MARKER_GLOW_OPACITY: 0.1,
};

// ── Cinematic Route Lifecycle Timing (seconds) ──────────────────────────────
export const ROUTE_TIMING = {
  ACTIVE_ROUTES_MIN: 3,
  ACTIVE_ROUTES_MAX: 5,
  FADE_IN_DURATION: 0.7,
  ARRIVAL_PULSE_DURATION: 0.8,
  HOLD_DURATION_MIN: 2.0,
  HOLD_DURATION_MAX: 3.5,
  FADE_OUT_DURATION: 1.0,
  SPAWN_GAP_MIN: 0.5,
  SPAWN_GAP_MAX: 1.2,
  INITIAL_STAGGER: 1.0,
};

// ── Origin Countries (where RASOAF travelers depart from) ──────────────────
export const ORIGINS = [
  { name: "United Kingdom",  lat: 51.5074, lng: -0.1278  },
  { name: "Nigeria",         lat: 6.5244,  lng: 3.3792   },
  { name: "Ghana",           lat: 5.6037,  lng: -0.1870  },
  { name: "Kenya",           lat: -1.2921, lng: 36.8219  },
  { name: "South Africa",    lat: -26.2041,lng: 28.0473  },
  { name: "Canada",          lat: 43.6532, lng: -79.3832 },
  { name: "United States",   lat: 40.7128, lng: -74.0060 },
  { name: "UAE",             lat: 25.2048, lng: 55.2708  },
  { name: "Qatar",           lat: 25.2854, lng: 51.5310  },
  { name: "Turkey",          lat: 41.0082, lng: 28.9784  },
  { name: "Saudi Arabia",    lat: 21.3891, lng: 39.8579  },
];

// ── Destination Countries (RASOAF services) ────────────────────────────────
export const DESTINATIONS = [
  { name: "Saudi Arabia",    lat: 21.3891, lng: 39.8579 },
  { name: "UAE",             lat: 25.2048, lng: 55.2708 },
  { name: "United Kingdom",  lat: 51.5074, lng: -0.1278 },
  { name: "Canada",          lat: 43.6532, lng: -79.3832 },
  { name: "United States",   lat: 40.7128, lng: -74.0060 },
];

// ── Label Offsets (countries) ──────────────────────────────────────────────
export const LABEL_OFFSETS = {
  "United Kingdom":  { u: -0.65, v: 0.55 },
  "Nigeria":         { u: 0,     v: -0.7 },
  "Ghana":           { u: 0.2,   v: -0.7 },
  "Kenya":           { u: 0.4,   v: -0.65 },
  "South Africa":    { u: 0.35,  v: -0.8 },
  "Canada":          { u: -0.7,  v: -0.45 },
  "United States":   { u: -0.55, v: -0.65 },
  "UAE":             { u: 0.45,  v: -0.25 },
  "Qatar":           { u: 0.5,   v: -0.15 },
  "Turkey":          { u: 0.35,  v: 0.55 },
  "Saudi Arabia":    { u: 0.55,  v: 0.4 },
};