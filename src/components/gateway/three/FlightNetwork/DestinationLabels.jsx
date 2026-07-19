// src/components/gateway/three/FlightNetwork/DestinationLabels.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Dynamic Destination Labels
// Only labels for active routes. Fade with route lifecycle.
// Safety guards prevent crashes when route data is incomplete.
// Uses country names instead of city names.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from "react";
import FloatingLabel from "./FloatingLabel";

// A route endpoint is only worth labeling if it's still visible (not mid
// fade-out) and its coordinates are real, finite numbers rather than
// missing/NaN/null — using Number.isFinite instead of `!== undefined`
// also protects against upstream data bugs like `null` or `NaN` slipping
// through, which `!== undefined` would silently accept.
function isLabelableEndpoint(endpoint, routeIsVisible) {
  return (
    routeIsVisible &&
    !!endpoint?.name &&
    Number.isFinite(endpoint?.lat) &&
    Number.isFinite(endpoint?.lng)
  );
}

function isRouteVisible(route) {
  return route.state !== "fadingOut" || route.opacity > 0.1;
}

export default function DestinationLabels({ routes = [] }) {
  // Collect unique countries from active routes
  const activeCountries = useMemo(() => {
    if (!Array.isArray(routes) || routes.length === 0) return [];

    const map = new Map();

    routes.forEach((route) => {
      // Safety check — skip routes with missing origin or destination
      if (!route || !route.origin || !route.destination) return;

      const routeIsVisible = isRouteVisible(route);

      if (isLabelableEndpoint(route.origin, routeIsVisible)) {
        map.set(route.origin.name, {
          name: route.origin.name,
          lat: route.origin.lat,
          lng: route.origin.lng,
          isHub: false,
        });
      }

      if (isLabelableEndpoint(route.destination, routeIsVisible)) {
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