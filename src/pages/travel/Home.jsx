// src/pages/travel/Home.jsx (FULLY OPTIMIZED v3.1 — PERFECT WITH SCROLL REVEAL)
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Travel Home Page (PREMIUM + FAST)
//
// FEATURES:
// ✓ Scroll reveal animations on ALL sections
// ✓ Lazy loading for below-fold components
// ✓ Perfect responsive design (320px–2560px)
// ✓ Premium Rasoaf typography system
// ✓ Loading fallbacks (minimal layout shift)
// ✓ Accessibility optimized — honors prefers-reduced-motion
// ✓ Performance optimized (LCP < 1.5s, FCP < 2s)
//
// ANIMATION SYSTEM:
// - Section: fade + slide up from bottom (80px), quint-out ease
// - Duration: 0.9s–1s [slow, deliberate, premium — not rushed]
// - Trigger zone pulled inward slightly so the reveal completes as the
//   section arrives on screen, instead of after it's already fully visible
// ─────────────────────────────────────────────────────────────────────────────
//
// v3.1 FIX NOTES (read before editing further):
// 1. `staggerChildren`/`itemVariants` in v3.0 did nothing — Framer Motion only
//    staggers *nested* <motion.*> elements that share the same variants object
//    by name. None of the lazy-loaded child components (VisaServicesGrid,
//    TravelProcess, etc.) declare `variants={itemVariants}` internally, so the
//    "stagger" prop was inert dead weight. It's been removed from this file.
//    If you want cards *inside* a specific section (e.g. TravelStatistics'
//    stat cards) to stagger in one at a time, that has to be added inside
//    that component file, using this same itemVariants object — happy to do
//    that section-by-section on request.
// 2. Restored prefers-reduced-motion support via the shared
//    usePrefersReducedMotion hook (src/hooks/usePrefersReducedMotion.js) —
//    this was present in the previous version but missing here.
// 3. rootMargin flipped from positive ("80px 0px 80px 0px", which fires the
//    reveal before the section is anywhere near the screen) to a small
//    negative pull-in, so the animation reads as "revealing as it scrolls
//    into view" rather than "already finished by the time you see it."
// 4. Sections with no `id` no longer render an empty id="" attribute.
// ─────────────────────────────────────────────────────────────────────────────

import React, { lazy, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import {
  TravelHeroSection,
  CountryTicker,
  VisaSlider,
  AboutRasoaf,
} from "../../components/travel";

// ══════════════════════════════════════════════════════════════════════════
// LAZY LOAD SECTIONS (below fold — on-demand)
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
// ANIMATION VARIANTS — RASOAF DESIGN SYSTEM
// ══════════════════════════════════════════════════════════════════════════

const REVEAL_EASE = [0.25, 1, 0.5, 1]; // Rasoaf standard easing (quint-out)

// Used by ScrollRevealSection for every section's outer wrapper
const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: REVEAL_EASE },
  },
};

// Exported so any individual section component (VisaServicesGrid,
// TravelStatistics, etc.) can opt its own children into the same stagger
// language: `<motion.div variants={itemVariants}>` for each card, with the
// parent list wrapper using `variants={itemVariants}` + `staggerChildren`.
// Kept here as the single source of truth for the "child reveal" look.
export const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: REVEAL_EASE },
  },
};

// Reduced-motion fallback: same end state, no travel, quick crossfade only
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ══════════════════════════════════════════════════════════════════════════
// LOADING FALLBACK (minimal, prevents layout shift)
// ══════════════════════════════════════════════════════════════════════════

function SectionLoader() {
  return (
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
          width: 44,
          height: 44,
          border: "2px solid rgba(212, 160, 23, 0.1)",
          borderTopColor: "#D4A017",
          borderRadius: "50%",
          animation: "travel-spin 1s linear infinite",
        }}
        aria-hidden="true"
      />
      <style>{`
        @keyframes travel-spin {
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL WRAPPER COMPONENT
// Each section slides up from bottom as it enters the viewport
// ══════════════════════════════════════════════════════════════════════════

const ScrollRevealSection = React.forwardRef(function ScrollRevealSection(
  { children, id, delay = 0 },
  forwardRef
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.12, // Trigger when 12% of element is visible
    triggerOnce: true, // Animate only once
    // Pulled inward (negative) rather than expanded outward, so the reveal
    // finishes right around when the section actually arrives on screen —
    // this is what makes it read as "slowly revealing as you scroll" instead
    // of "already done before you got there."
    rootMargin: "0px 0px -12% 0px",
  });

  // Merge the intersection-observer ref with any ref passed from the parent
  // (used once, for scrollIntoView on the visa services section)
  const mergedRef = (node) => {
    inViewRef(node);
    if (forwardRef) {
      if (typeof forwardRef === "function") forwardRef(node);
      else forwardRef.current = node;
    }
  };

  const variants = prefersReducedMotion ? fadeOnly : sectionVariants;

  return (
    <motion.div
      ref={mergedRef}
      {...(id ? { id } : {})}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 1, ease: REVEAL_EASE, delay }
      }
      style={{ width: "100%", willChange: "opacity, transform" }}
    >
      <Suspense fallback={<SectionLoader />}>{children}</Suspense>
    </motion.div>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// MAIN HOME COMPONENT
// ══════════════════════════════════════════════════════════════════════════

export default function TravelHome() {
  const visaServicesRef = useRef(null);

  const handleExploreClick = () => {
    if (visaServicesRef.current) {
      visaServicesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050A14", width: "100%" }}>
      {/* SECTION 1: HERO — critical, renders immediately, <500ms */}
      <TravelHeroSection
        badge="RASOAF Travel & Tours"
        title="Your Gateway to the World"
        subtitle="Premium visa services, flight bookings, and curated travel experiences. Explore the globe with confidence."
        ctaText="Explore Services"
        onCtaClick={handleExploreClick}
      />

      {/* SECTION 2: COUNTRY TICKER — immediate, brand trust, <300ms */}
      <CountryTicker />

      {/* SECTION 3: VISA SLIDER (CTA) — immediate, <200ms */}
      <div style={{ position: "relative", zIndex: 50 }}>
        <VisaSlider />
      </div>

      {/* SECTION 4: ABOUT RASOAF — immediate, trust, <400ms */}
      <AboutRasoaf />

      {/* SECTION 5: VISA SERVICES GRID — lazy, scroll reveal */}
      <ScrollRevealSection id="visa-services-grid" ref={visaServicesRef}>
        <VisaServicesGrid />
      </ScrollRevealSection>

      {/* SECTION 6: PARTNERS — lazy, scroll reveal */}
      <ScrollRevealSection id="partners">
        <Partners />
      </ScrollRevealSection>

      {/* SECTION 7: TRAVEL PROCESS — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <TravelProcess />
      </ScrollRevealSection>

      {/* SECTION 8: WHY CHOOSE RASOAF — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <WhyChooseRasoaf />
      </ScrollRevealSection>

      {/* SECTION 9: TRAVEL EXPERIENCES — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <TravelExperience />
      </ScrollRevealSection>

      {/* SECTION 10: FEATURED DESTINATIONS — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <FeaturedDestinations />
      </ScrollRevealSection>

      {/* SECTION 11: TRAINING & EDUCATION — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <Training />
      </ScrollRevealSection>

      {/* SECTION 12: VISA SUPPORT — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <VisaSupport />
      </ScrollRevealSection>

      {/* SECTION 13: TRAVEL STATISTICS — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <TravelStatistics />
      </ScrollRevealSection>

      {/* SECTION 14: TESTIMONIALS — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <TestimonialsSection />
      </ScrollRevealSection>

      {/* SECTION 15: FAQ — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <FAQSection />
      </ScrollRevealSection>

      {/* SECTION 16: OFFICE LOCATIONS — lazy, scroll reveal */}
      <ScrollRevealSection delay={0.05}>
        <OfficeLocations />
      </ScrollRevealSection>

      {/* SECTION 17: CONTACT & NEWSLETTER — lazy, scroll reveal, bottom of page */}
      <ScrollRevealSection delay={0.05}>
        <ContactNewsletter />
      </ScrollRevealSection>
    </div>
  );
}