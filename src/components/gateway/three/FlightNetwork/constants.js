// src/components/gateway/three/FlightNetwork/constants.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Global Route System
// Cinematic timing. Routes feel like real aircraft journeys.
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
  COUNT_PER_ROUTE: 1,              // Single particle per route — cleaner, more premium
  SIZE: 0.01,
  COLOR: "#FFE082",
  OPACITY: 0.7,
  GLOW_OPACITY: 0.15,
  GLOW_SIZE_MULTIPLIER: 3.5,
  MIN_DURATION: 3.5,              // Particle travel time: 3.5–5.5 seconds
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

  // Phase 1: Route fades in
  FADE_IN_DURATION: 0.7,

  // Phase 2: Particle travels origin → destination
  // (uses PARTICLES.MIN_DURATION / MAX_DURATION)

  // Phase 3: Destination pulse on arrival
  ARRIVAL_PULSE_DURATION: 0.8,

  // Phase 4: Completed route remains visible
  HOLD_DURATION_MIN: 2.0,
  HOLD_DURATION_MAX: 3.5,

  // Phase 5: Route fades out
  FADE_OUT_DURATION: 1.0,

  // Gap between route removal and next spawn
  SPAWN_GAP_MIN: 0.5,
  SPAWN_GAP_MAX: 1.2,

  // Initial stagger when page loads
  INITIAL_STAGGER: 1.0,
};

// ── Origin Cities ───────────────────────────────────────────────────────────
export const ORIGINS = [
  { name: "London",        lat: 51.5074, lng: -0.1278  },
  { name: "Manchester",    lat: 53.4808, lng: -2.2426  },
  { name: "Lagos",         lat: 6.5244,  lng: 3.3792   },
  { name: "Abuja",         lat: 9.0765,  lng: 7.3986   },
  { name: "Accra",         lat: 5.6037,  lng: -0.1870  },
  { name: "Nairobi",       lat: -1.2921, lng: 36.8219  },
  { name: "Johannesburg",  lat: -26.2041,lng: 28.0473  },
  { name: "Toronto",       lat: 43.6532, lng: -79.3832 },
  { name: "New York",      lat: 40.7128, lng: -74.0060 },
  { name: "Washington DC", lat: 38.9072, lng: -77.0369 },
  { name: "Dubai",         lat: 25.2048, lng: 55.2708  },
  { name: "Doha",          lat: 25.2854, lng: 51.5310  },
  { name: "Istanbul",      lat: 41.0082, lng: 28.9784  },
  { name: "Jeddah",        lat: 21.3891, lng: 39.8579  },
];

// ── Destination Cities ──────────────────────────────────────────────────────
export const DESTINATIONS = [
  { name: "Makkah",   lat: 21.3891, lng: 39.8579 },
  { name: "Madinah",  lat: 24.5247, lng: 39.5692 },
  { name: "Dubai",    lat: 25.2048, lng: 55.2708 },
  { name: "London",   lat: 51.5074, lng: -0.1278 },
  { name: "Toronto",  lat: 43.6532, lng: -79.3832 },
  { name: "New York", lat: 40.7128, lng: -74.0060 },
];

// ── Label Offsets ───────────────────────────────────────────────────────────
export const LABEL_OFFSETS = {
  "London":        { u: -0.5, v: 0.5  },
  "Manchester":    { u: -0.55,v: 0.6  },
  "Lagos":         { u: 0,    v: -0.6 },
  "Abuja":         { u: 0.1,  v: -0.5 },
  "Accra":         { u: 0.2,  v: -0.7 },
  "Nairobi":       { u: 0.4,  v: -0.6 },
  "Johannesburg":  { u: 0.3,  v: -0.8 },
  "Toronto":       { u: -0.6, v: -0.4 },
  "New York":      { u: -0.5, v: -0.55},
  "Washington DC": { u: -0.55,v: -0.45},
  "Dubai":         { u: 0.4,  v: -0.2 },
  "Doha":          { u: 0.45, v: -0.15},
  "Istanbul":      { u: 0.3,  v: 0.5  },
  "Jeddah":        { u: 0.5,  v: 0.2  },
  "Makkah":        { u: 0.5,  v: 0.35 },
  "Madinah":       { u: 0.55, v: 0.5  },
};