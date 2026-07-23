// src/pages/travel/Home.jsx (OPTIMIZED)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page
// Premium Layout · Optimized Component Order · LCP Optimized
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense } from "react";
import {
  CountryTicker,
  VisaServicesGrid,
  FeaturedDestinations,
  TravelExperience,
  WhyChooseRasoaf,
  VisaSupport,
  TravelProcess,
  TravelStatistics,
  TestimonialsSection,
  FAQSection,
  VisaSlider,
  AboutRasoaf,
  Training,
  OfficeLocations,
  ContactNewsletter,
} from "../../components/travel";

// LAZY LOAD HERO — Prevents it from blocking heading render
const TravelHeroSection = lazy(() => import("../../components/travel/HeroSection"));

// Fast fallback while hero loads
const TravelHeroFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}
  >
    <div style={{ textAlign: "center", color: "white" }}>
      <h1
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "clamp(2rem, 5vw, 4.75rem)",
          fontWeight: 700,
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
        }}
      >
        Your Gateway to the World
      </h1>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.25rem)",
          fontWeight: 400,
          margin: 0,
          opacity: 0.9,
        }}
      >
        Premium visa services, flight bookings, and curated experiences
      </p>
    </div>
  </div>
);

export default function TravelHome() {
  return (
    <div style={{ minHeight: "100vh", background: "#050A14" }}>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — Lazy loaded with Suspense
          Shows fallback immediately to fix LCP
      ═══════════════════════════════════════════════════════════ */}
      <Suspense fallback={<TravelHeroFallback />}>
        <TravelHeroSection
          badge="RASOAF Travel & Tours"
          title="Your Gateway to the World"
          subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
          ctaText="Explore Services"
          onCtaClick={() => document.getElementById("premium-travel-services")?.scrollIntoView({ behavior: "smooth" })}
        />
      </Suspense>

      {/* ═══════════════════════════════════════════════════════════
          2. COUNTRY TICKER — "Worldwide coverage"
      ═══════════════════════════════════════════════════════════ */}
      <CountryTicker />

      {/* ═══════════════════════════════════════════════════════════
          3. VISA CTA SLIDER — "Core CTA"
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <VisaSlider />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          4. ABOUT RASOAF — "Build trust"
      ═══════════════════════════════════════════════════════════ */}
      <AboutRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          5. VISA SERVICES GRID — "Core offerings"
      ═══════════════════════════════════════════════════════════ */}
      <VisaServicesGrid />

      {/* ═══════════════════════════════════════════════════════════
          6. TRAVEL PROCESS — "How it works"
      ═══════════════════════════════════════════════════════════ */}
      <TravelProcess />

      {/* ═══════════════════════════════════════════════════════════
          7. WHY CHOOSE US — "Differentiators"
      ═══════════════════════════════════════════════════════════ */}
      <WhyChooseRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          8. TRAVEL EXPERIENCES — "Emotional connection"
      ═══════════════════════════════════════════════════════════ */}
      <TravelExperience />

      {/* ═══════════════════════════════════════════════════════════
          9. FEATURED DESTINATIONS — "Sell the dream"
      ═══════════════════════════════════════════════════════════ */}
      <FeaturedDestinations />

      {/* ═══════════════════════════════════════════════════════════
          10. TRAINING — "Education services"
      ═══════════════════════════════════════════════════════════ */}
      <Training />

      {/* ═══════════════════════════════════════════════════════════
          11. VISA SUPPORT — "Reduce anxiety"
      ═══════════════════════════════════════════════════════════ */}
      <VisaSupport />

      {/* ═══════════════════════════════════════════════════════════
          12. STATISTICS — "Show authority"
      ═══════════════════════════════════════════════════════════ */}
      <TravelStatistics />

      {/* ═══════════════════════════════════════════════════════════
          13. TESTIMONIALS — "Social proof"
      ═══════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════════
          14. FAQ — "Address concerns"
      ═══════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════
          15. OFFICE LOCATIONS — "Global presence"
      ═══════════════════════════════════════════════════════════ */}
      <OfficeLocations />

      {/* ═══════════════════════════════════════════════════════════
          16. CONTACT / NEWSLETTER — "Stay connected"
      ═══════════════════════════════════════════════════════════ */}
      <ContactNewsletter />
    </div>
  );
}