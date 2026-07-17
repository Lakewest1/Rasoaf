// src/components/gateway/three/cameraKeyframes.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Gateway — Camera Keyframes
// Defines cinematic camera positions and targets for each scene.
// All positions are [x, y, z]. All targets are lookAt points.
// Timing is in seconds from scene start.
// ─────────────────────────────────────────────────────────────────────────────

export const SCENES = [
  {
    id: "intro",
    label: "Introduction",
    duration: 6.0,
    camera: {
      start:    { position: [0, 0.5, 12], target: [0, 0, 0] },
      end:      { position: [-0.8, 0.3, 8], target: [0, 0, 0] },
      easing:   [0.16, 1, 0.3, 1],
    },
  },
  {
    id: "focus-me",
    label: "Focus Middle East",
    duration: 5.0,
    camera: {
      start:    { position: [-0.8, 0.3, 8], target: [0, 0, 0] },
      end:      { position: [-0.4, 0.8, 7.2], target: [0.3, 0.1, 0.2] },
      easing:   [0.22, 1, 0.36, 1],
    },
  },
  {
    id: "focus-europe",
    label: "Focus Europe",
    duration: 5.0,
    camera: {
      start:    { position: [-0.4, 0.8, 7.2], target: [0.3, 0.1, 0.2] },
      end:      { position: [-0.3, 0.5, 7.0], target: [-0.2, 0.3, 0.1] },
      easing:   [0.22, 1, 0.36, 1],
    },
  },
  {
    id: "pull-back",
    label: "Pull Back",
    duration: 4.5,
    camera: {
      start:    { position: [-0.3, 0.5, 7.0], target: [-0.2, 0.3, 0.1] },
      end:      { position: [-0.8, 0.1, 8.5], target: [0, 0, 0] },
      easing:   [0.16, 1, 0.3, 1],
    },
  },
  {
    id: "cta",
    label: "CTA Composition",
    duration: 0, // Holds indefinitely
    camera: {
      start:    { position: [-0.8, 0.1, 8.5], target: [0, 0, 0] },
      end:      { position: [-0.8, 0.1, 8.5], target: [0, 0, 0] },
      easing:   [0.16, 1, 0.3, 1],
    },
  },
];

// ── Micro-motion while paused ───────────────────────────────────────────────
export const MICRO_MOTION = {
  BREATH_AMPLITUDE: 0.08,
  BREATH_PERIOD: 8.0,
  DRIFT_AMPLITUDE_X: 0.04,
  DRIFT_AMPLITUDE_Y: 0.03,
  DRIFT_PERIOD_X: 12.0,
  DRIFT_PERIOD_Y: 10.0,
  ORBIT_SPEED: 0.006,
};

// ── Interpolation helper: lerp between two numbers ──────────────────────────
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ── Interpolate between two camera states ───────────────────────────────────
export function lerpCamera(start, end, t) {
  return {
    position: [
      lerp(start.position[0], end.position[0], t),
      lerp(start.position[1], end.position[1], t),
      lerp(start.position[2], end.position[2], t),
    ],
    target: [
      lerp(start.target[0], end.target[0], t),
      lerp(start.target[1], end.target[1], t),
      lerp(start.target[2], end.target[2], t),
    ],
  };
}

// ── Ease a linear t value using the provided easing curve ───────────────────
export function easeValue(t, easing = [0.16, 1, 0.3, 1]) {
  // Cubic bezier approximation for common easing curves
  // For simplicity, use the x1/y1/x2/y2 values directly with a bezier function
  return cubicBezier(t, easing[0], easing[1], easing[2], easing[3]);
}

// Simple cubic bezier solver
function cubicBezier(t, x1, y1, x2, y2) {
  // Newton-Raphson method to find t for given x
  function sampleCurveX(t) {
    return ((1 - t) * (1 - t) * (1 - t) * 0) +
           (3 * (1 - t) * (1 - t) * t * x1) +
           (3 * (1 - t) * t * t * x2) +
           (t * t * t * 1);
  }

  function sampleCurveDerivativeX(t) {
    return (3 * (1 - t) * (1 - t) * (x1 - 0)) +
           (6 * (1 - t) * t * (x2 - x1)) +
           (3 * t * t * (1 - x2));
  }

  // Find t for the given x value
  let t2 = t;
  for (let i = 0; i < 8; i++) {
    const x = sampleCurveX(t2) - t;
    if (Math.abs(x) < 0.001) break;
    t2 -= x / sampleCurveDerivativeX(t2);
  }

  // Return y value at that t
  return ((1 - t2) * (1 - t2) * (1 - t2) * 0) +
         (3 * (1 - t2) * (1 - t2) * t2 * y1) +
         (3 * (1 - t2) * t2 * t2 * y2) +
         (t2 * t2 * t2 * 1);
}