// src/components/gateway/three/FlightNetwork/geoUtils.js
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Utilities
// ─────────────────────────────────────────────────────────────────────────────

import { Vector3, CubicBezierCurve3 } from "three";
import { EARTH_RADIUS, FLIGHTS, ORIGINS, DESTINATIONS } from "./constants";

export function latLngToVec3(lat, lng, radius = EARTH_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function createFlightArc(start, end, segments = FLIGHTS.ARC_SEGMENTS) {
  const mid = new Vector3().addVectors(start, end).multiplyScalar(0.5);
  const direction = mid.clone().normalize();
  const arcHeight = EARTH_RADIUS * (1 + FLIGHTS.ARC_HEIGHT);
  const controlPoint = direction.multiplyScalar(arcHeight);
  return new CubicBezierCurve3(
    start.clone(), controlPoint.clone(), controlPoint.clone(), end.clone()
  );
}

export function getArcPoint(curve, t) {
  return curve.getPointAt(Math.min(Math.max(t, 0), 1));
}

/**
 * Generate a random route: picks a random origin and random destination.
 * Ensures origin ≠ destination.
 */
let routeCounter = 0;
export function generateRandomRoute() {
  const origin = ORIGINS[Math.floor(Math.random() * ORIGINS.length)];
  let destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
  // Don't fly to the same city
  while (destination.name === origin.name) {
    destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
  }
  routeCounter++;
  return {
    id: `route-${routeCounter}-${Date.now()}`,
    origin,
    destination,
    startVec: latLngToVec3(origin.lat, origin.lng),
    endVec: latLngToVec3(destination.lat, destination.lng),
    color: "#F7C948",
    createdAt: performance.now(),
  };
}