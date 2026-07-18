// src/components/gateway/three/FlightNetwork/DestinationLabels.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Destination Labels
// Only labels for active routes. Fade with route lifecycle.
// Safety guards prevent crashes when route data is incomplete.
// Uses country names instead of city names.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import FloatingLabel from "./FloatingLabel";

export default function DestinationLabels({ routes }) {
  // Collect unique countries from active routes
  const activeCountries = useMemo(() => {
    const map = new Map();

    // Guard: ensure routes is an array before iterating
    if (!routes || !Array.isArray(routes)) return [];

    routes.forEach((route) => {
      // Safety check — skip routes with missing origin or destination
      if (!route || !route.origin || !route.destination) return;

      const routeIsVisible = route.state !== "fadingOut" || route.opacity > 0.1;

      // Add origin country if visible and has complete data
      if (
        routeIsVisible &&
        route.origin.name &&
        route.origin.lat !== undefined &&
        route.origin.lng !== undefined
      ) {
        map.set(route.origin.name, {
          name: route.origin.name,
          lat: route.origin.lat,
          lng: route.origin.lng,
          isHub: false,
        });
      }

      // Add destination country if visible and has complete data
      if (
        routeIsVisible &&
        route.destination.name &&
        route.destination.lat !== undefined &&
        route.destination.lng !== undefined
      ) {
        map.set(route.destination.name, {
          name: route.destination.name,
          lat: route.destination.lat,
          lng: route.destination.lng,
          isHub: false,
        });
      }
    });

    return Array.from(map.values());
  }, [routes]);

  return (
    <group>
      {activeCountries.map((country) => (
        <FloatingLabel key={country.name} city={country} />
      ))}
    </group>
  );
}