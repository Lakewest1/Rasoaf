// src/pages/travel/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page
// ─────────────────────────────────────────────────────────────────────────────

import {
  TravelHeroSection,
  CountryTicker,
  VisaServicesGrid,
  FeaturedDestinations,
  TravelServices,
  TravelExperience,
  WhyChooseRasoaf,
  VisaSupport,
  TravelProcess,
  TravelStatistics,
  TestimonialsSection,
  FAQSection,
  FinalCTA,
  VisaSlider,
  AboutRasoaf,
  Training,
} from "../../components/travel";

export default function TravelHome() {
  return (
    <div style={{ minHeight: "100vh", background: "#050A14" }}>
      {/* ═══════════════════════════════════════════════════════════
          1. HERO SECTION — "Capture attention"
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={() => document.getElementById("premium-travel-services")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* ═══════════════════════════════════════════════════════════
          2. COUNTRY TICKER — "Worldwide coverage"
      ═══════════════════════════════════════════════════════════ */}
      <CountryTicker />

      {/* ═══════════════════════════════════════════════════════════
          VISA CTA SLIDER — Wrapped in a container that forces it
          ABOVE the Three.js Canvas by creating a new stacking context
          with position: relative and a HIGH z-index
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ 
        position: "relative", 
        zIndex: 9999,
        background: "transparent",
      }}>
        <VisaSlider />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT RASOAF
      ═══════════════════════════════════════════════════════════ */}
      <AboutRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          3. VISA SERVICES GRID — "Core offerings"
      ═══════════════════════════════════════════════════════════ */}
      <VisaServicesGrid />

      {/* ═══════════════════════════════════════════════════════════
          4. FEATURED DESTINATIONS — "Sell the dream"
      ═══════════════════════════════════════════════════════════ */}
      <FeaturedDestinations />

      {/* ═══════════════════════════════════════════════════════════
          5. TRAINING SERVICES — "Educational offerings"
      ═══════════════════════════════════════════════════════════ */}
      <Training />

      {/* ═══════════════════════════════════════════════════════════
          6. TRAVEL SERVICES — "Additional offerings"
      ═══════════════════════════════════════════════════════════ */}
      <TravelServices />

      {/* ═══════════════════════════════════════════════════════════
          7. TRAVEL EXPERIENCES — "Why people travel"
      ═══════════════════════════════════════════════════════════ */}
      <TravelExperience />

      {/* ═══════════════════════════════════════════════════════════
          8. WHY CHOOSE US — "Build trust"
      ═══════════════════════════════════════════════════════════ */}
      <WhyChooseRasoaf />

      {/* ═══════════════════════════════════════════════════════════
          9. VISA SUPPORT — "Reduce anxiety"
      ═══════════════════════════════════════════════════════════ */}
      <VisaSupport />

      {/* ═══════════════════════════════════════════════════════════
          10. TRAVEL PROCESS — "Simple journey"
      ═══════════════════════════════════════════════════════════ */}
      <TravelProcess />

      {/* ═══════════════════════════════════════════════════════════
          11. STATISTICS — "Show authority"
      ═══════════════════════════════════════════════════════════ */}
      <TravelStatistics />

      {/* ═══════════════════════════════════════════════════════════
          12. TESTIMONIALS — "Social proof"
      ═══════════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══════════════════════════════════════════════════════════
          13. FAQ — "Address concerns"
      ═══════════════════════════════════════════════════════════ */}
      <FAQSection />

      {/* ═══════════════════════════════════════════════════════════
          14. FINAL CTA — "Strong closing"
      ═══════════════════════════════════════════════════════════ */}
      <FinalCTA />
    </div>
  );
}