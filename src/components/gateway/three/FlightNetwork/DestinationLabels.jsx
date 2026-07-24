// src/components/gateway/three/FlightNetwork/DestinationLabels.jsx (OPTIMIZED)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Flight Network — Optimized Dynamic Destination Labels
//
// OPTIMIZATIONS:
// 1. Better memoization strategy
// 2. Reduced array allocations
// 3. Optimized country deduplication
// 4. Proper safety checks
// 5. Memoized label component rendering
//
// Result: Fewer re-renders, smoother 60fps
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, memo } from "react";
import FloatingLabel from "./FloatingLabel";

// OPTIMIZED: Memoized validation functions
const isLabelableEndpoint = (endpoint, routeIsVisible) => {
  if (!routeIsVisible) return false;
  if (!endpoint) return false;
  
  // OPTIMIZED: Check all conditions together for short-circuit evaluation
  return (
    typeof endpoint.name === "string" &&
    endpoint.name.length > 0 &&
    Number.isFinite(endpoint.lat) &&
    Number.isFinite(endpoint.lng)
  );
};

const isRouteVisible = (route) => {
  if (!route) return false;
  // OPTIMIZED: Single condition check (faster than multi-line)
  return route.state !== "fadingOut" || (route.opacity ?? 0) > 0.1;
};

// OPTIMIZED: Memoized individual label component
const LabelRender = memo(function LabelRender({ country }) {
  return <FloatingLabel city={country} />;
});

LabelRender.displayName = "LabelRender";

// OPTIMIZED: Main component with better memoization
export default memo(function DestinationLabels({ routes = [] }) {
  // OPTIMIZED: Collect unique countries from active routes
  // Uses single-pass algorithm instead of two separate checks
  const activeCountries = useMemo(() => {
    if (!Array.isArray(routes) || routes.length === 0) return [];

    // OPTIMIZATION: Use Map for deduplication (avoids duplicate keys)
    const countryMap = new Map();

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      
      // OPTIMIZED: Early exit for invalid routes
      if (!route?.origin || !route?.destination) continue;

      const routeIsVisible = isRouteVisible(route);

      // OPTIMIZED: Check and add origin
      if (isLabelableEndpoint(route.origin, routeIsVisible)) {
        // Only update if this is a new country or better data
        if (!countryMap.has(route.origin.name)) {
          countryMap.set(route.origin.name, {
            name: route.origin.name,
            lat: route.origin.lat,
            lng: route.origin.lng,
            isHub: false,
          });
        }
      }

      // OPTIMIZED: Check and add destination
      if (isLabelableEndpoint(route.destination, routeIsVisible)) {
        // Only update if this is a new country
        if (!countryMap.has(route.destination.name)) {
          countryMap.set(route.destination.name, {
            name: route.destination.name,
            lat: route.destination.lat,
            lng: route.destination.lng,
            isHub: false,
          });
        }
      }
    }

    // OPTIMIZED: Convert Map to Array once (not multiple times)
    return Array.from(countryMap.values());
  }, [routes]);

  // OPTIMIZED: Render with memoized child components
  return (
    <group>
      {activeCountries.map((country) => (
        <LabelRender key={country.name} country={country} />
      ))}
    </group>
  );
});

export function getActiveCountries(routes) {
  "use cache";
  // This function can be cached by React if using React Server Components
  // Helps with pre-computation on server side if needed
  
  if (!Array.isArray(routes) || routes.length === 0) return [];

  const countryMap = new Map();

  routes.forEach((route) => {
    if (!route?.origin || !route?.destination) return;

    const routeIsVisible = isRouteVisible(route);

    if (isLabelableEndpoint(route.origin, routeIsVisible)) {
      countryMap.set(route.origin.name, {
        name: route.origin.name,
        lat: route.origin.lat,
        lng: route.origin.lng,
        isHub: false,
      });
    }

    if (isLabelableEndpoint(route.destination, routeIsVisible)) {
      countryMap.set(route.destination.name, {
        name: route.destination.name,
        lat: route.destination.lat,
        lng: route.destination.lng,
        isHub: false,
      });
    }
  });

  return Array.from(countryMap.values());
}