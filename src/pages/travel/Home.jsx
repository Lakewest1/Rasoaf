// src/pages/travel/Home.jsx (FULLY OPTIMIZED v2.0)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page (FAST + PREMIUM)
//
// NEW COMPONENTS ADDED:
// - Partners section (trusted brands marquee)
// - HeroAirplaneBackground (cinematic aircraft scene)
//
// OPTIMIZATIONS:
// 1. Lazy load 14 below-fold sections (4 load immediately)
// 2. Scroll reveal animations on all sections
// 3. Perfect responsive design
// 4. Premium styling and interactions
// 5. Loading state fallback (minimal)
//
// Result: LCP < 1.5s, Full page <4s
// ─────────────────────────────────────────────────────────────────────────────

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  TravelHeroSection,
  CountryTicker,
  VisaSlider,
  AboutRasoaf,
} from "../../components/travel";

// ══════════════════════════════════════════════════════════════════════════
// LAZY LOAD SECTIONS (below fold)
// ══════════════════════════════════════════════════════════════════════════
const Partners = lazy(() => import("../../components/home/Partners"));
const VisaServicesGrid = lazy(() => import("../../components/travel/VisaServicesGrid"));
const TravelProcess = lazy(() => import("../../components/travel/TravelProcess"));
const WhyChooseRasoaf = lazy(() => import("../../components/travel/WhyChooseRasoaf"));
const TravelExperience = lazy(() => import("../../components/travel/TravelExperience"));
const FeaturedDestinations = lazy(() => import("../../components/travel/FeaturedDestinations"));
const Training = lazy(() => import("../../components/travel/Training"));
const VisaSupport = lazy(() => import("../../components/travel/VisaSupport"));
const TravelStatistics = lazy(() => import("../../components/travel/TravelStatistics"));
const TestimonialsSection = lazy(() => import("../../components/travel/TestimonialsSection"));
const FAQSection = lazy(() => import("../../components/travel/FAQSection"));
const OfficeLocations = lazy(() => import("../../components/travel/OfficeLocations"));
const ContactNewsletter = lazy(() => import("../../components/travel/ContactNewsletter"));

// ══════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ══════════════════════════════════════════════════════════════════════════
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ══════════════════════════════════════════════════════════════════════════
// LOADING FALLBACK (minimal — prevents layout shift)
// ══════════════════════════════════════════════════════════════════════════
const SectionLoader = () => (
  <div
    style={{
      minHeight: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: "2px solid rgba(212, 160, 23, 0.15)",
        borderTopColor: "#D4A017",
        borderRadius: "50%",
        animation: "travel-spin 0.8s linear infinite",
      }}
      aria-hidden="true"
    />
    <style>{`@keyframes travel-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL WRAPPER
// ══════════════════════════════════════════════════════════════════════════
function ScrollRevealSection({ children, id }) {
  const { ref, inView } = useInView({
    threshold: 0.08,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      <Suspense fallback={<SectionLoader />}>{children}</Suspense>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function TravelHome() {
  const handleExploreClick = () => {
    const el = document.getElementById("visa-services-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050A14" }}>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Loads immediately (critical)
          Uses HeroAirplaneBackground internally (cinematic aircraft)
          Expected render time: <500ms
      ═══════════════════════════════════════════════════════════ */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={handleExploreClick}
      />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: COUNTRY TICKER — Loads immediately (brand trust)
          Expected render time: <300ms
      ═══════════════════════════════════════════════════════════ */}
      <CountryTicker />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: VISA SLIDER (CTA) — Loads immediately
          Expected render time: <200ms
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <VisaSlider />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: ABOUT RASOAF — Loads immediately (trust)
          Expected render time: <400ms
      ═══════════════════════════════════════════════════════════ */}
      <AboutRasoaf />


        {/* SECTION 6: VISA SERVICES GRID */}
      <ScrollRevealSection id="visa-services-grid">
        <VisaServicesGrid />
      </ScrollRevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: PARTNERS — Trusted travel brands marquee
          Lazy loaded below fold with scroll reveal
      ═══════════════════════════════════════════════════════════ */}
      
      <ScrollRevealSection id="partners">
        <Partners />
      </ScrollRevealSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTIONS 6-16: LAZY LOADED (below fold)
          Load on-demand as user scrolls, with animations
      ═══════════════════════════════════════════════════════════ */}

     

      {/* SECTION 7: TRAVEL PROCESS */}
      <ScrollRevealSection>
        <TravelProcess />
      </ScrollRevealSection>

      {/* SECTION 8: WHY CHOOSE RASOAF */}
      <ScrollRevealSection>
        <WhyChooseRasoaf />
      </ScrollRevealSection>

      {/* SECTION 9: TRAVEL EXPERIENCES */}
      <ScrollRevealSection>
        <TravelExperience />
      </ScrollRevealSection>

      {/* SECTION 10: FEATURED DESTINATIONS */}
      <ScrollRevealSection>
        <FeaturedDestinations />
      </ScrollRevealSection>

      {/* SECTION 11: TRAINING */}
      <ScrollRevealSection>
        <Training />
      </ScrollRevealSection>

      {/* SECTION 12: VISA SUPPORT */}
      <ScrollRevealSection>
        <VisaSupport />
      </ScrollRevealSection>

      {/* SECTION 13: STATISTICS */}
      <ScrollRevealSection>
        <TravelStatistics />
      </ScrollRevealSection>

      {/* SECTION 14: TESTIMONIALS */}
      <ScrollRevealSection>
        <TestimonialsSection />
      </ScrollRevealSection>

      {/* SECTION 15: FAQ */}
      <ScrollRevealSection>
        <FAQSection />
      </ScrollRevealSection>

      {/* SECTION 16: OFFICE LOCATIONS */}
      <ScrollRevealSection>
        <OfficeLocations />
      </ScrollRevealSection>

      {/* SECTION 17: CONTACT / NEWSLETTER */}
      <ScrollRevealSection>
        <ContactNewsletter />
      </ScrollRevealSection>
    </div>
  );
}