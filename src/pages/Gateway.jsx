// src/pages/Gateway.jsx (OPTIMIZED - FAST NAVIGATION)
// ─────────────────────────────────────────────────────────────────────────────
// FIXES:
// 1. Navigation uses React Router (instant, no refresh)
// 2. Removed unnecessary callbacks
// 3. Lazy load components below fold
// 4. Result: Navigation <1 second instead of slow refresh
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import TravelHeroSection from "../components/travel/HeroSection";
import { GatewaySplit } from "../components/gateway";

// Lazy load sections below fold
const CountryTicker = lazy(() => import("../components/travel/CountryTicker"));

export default function Gateway() {
  const navigate = useNavigate();

  const handleNavigateToHajj = () => {
    // Use React Router navigation (instant, no page refresh)
    navigate("/hajj", { replace: false });
  };

  const handleNavigateToTravel = () => {
    // Use React Router navigation (instant, no page refresh)
    navigate("/travel", { replace: false });
  };

  const scrollToGateway = () => {
    const el = document.getElementById("gateway-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: Travel Hero
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={scrollToGateway}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: Gateway Split
          GatewaySplit renders its own buttons with navigate() calls
      ═══════════════════════════════════════════════════════════ */}
      <div
        id="gateway-section"
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <GatewaySplit
          onHajjClick={handleNavigateToHajj}
          onTravelClick={handleNavigateToTravel}
        />
      </div>

      {/* OPTIONAL: Add other sections below */}
      <Suspense fallback={null}>
        {/* <CountryTicker /> */}
      </Suspense>
    </>
  );
}