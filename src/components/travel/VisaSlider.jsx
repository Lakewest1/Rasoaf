// src/components/travel/VisaSlider.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Visa CTA Slider (v2.0 — PERFECTED)
// Rasoaf Typography · Smooth gradual slide · Pause on hover/focus · Responsive
// FULLY RESPONSIVE — 320px → 2560px, real swipe gesture, reduced-motion aware
//
// v2.0 CHANGES:
// - WCAG 2.2.2 (Pause, Stop, Hide): content auto-advances every 7s, so it now
//   ships an explicit pause/play toggle — hover-to-pause alone isn't enough
//   for keyboard/touch-only users who never trigger a mouseenter event.
// - Autoplay now also pauses on keyboard focus (tabbing to an arrow/dot/CTA),
//   not just mouse hover, for the same reason.
// - Proper carousel ARIA: role="region" + aria-roledescription="carousel" on
//   the root, aria-roledescription="slide" + positional label on each slide,
//   and a visually-hidden live region announcing slide changes to screen
//   readers (background/text crossfades convey nothing to assistive tech on
//   their own).
// - Added ArrowLeft/ArrowRight keyboard navigation.
// - De-duplicated timer logic: manual navigation (goTo) now just calls
//   startTimer() again instead of re-implementing the interval inline —
//   previously a manual dot-click would silently ignore the paused state.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 7000; // Increased from 5000ms to 7000ms for slower rotation
const SWIPE_THRESHOLD = 50; // px

const SLIDES = [
  {
    eyebrow: "Solution For All Type Of Visas",
    heading: "Best Visa Immigration Services",
    paragraph: "RASOAF Travels and Tours Limited is here at your doorstep to support your journey anywhere in the world. Our experts are always ready to assist with your inquiries, whether for study permits and guides, family reunification, seminars, conferences, or any other country. We do not charge fees for consultation, and we are ready to make your journey seamless.",
    // TODO: this Cloudinary asset is a "Secure_Kubernetes_Deployment..." doc
    // screenshot, not a travel photo — looks like a leftover placeholder
    // from an unrelated upload. Swap in a real travel/visa image before ship.
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784549673/Secure_Kubernetes_Deployment_Documentation_u84t87.docx.png",
    ctaLabel: "Explore Services",
    ctaTo: "/travel/services",
  },
  {
    eyebrow: "Your Gateway To The World",
    heading: "Premium Travel Solutions",
    paragraph: "From student visas for Canada and the UK to work permits for the USA and Australia, tourist visas for Dubai and Turkey, and business travel across Europe we provide fast, reliable visa processing and travel arrangements tailored to your needs.",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550232/Rasoaf_10_xdlv6v.jpg",
    ctaLabel: "Get Started",
    ctaTo: "/travel/contact",
  },
];

// ── Rasoaf Design Tokens ────────────────────────────────────────────────
const typography = {
  display: "'Manrope', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
};

const colors = {
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
  cream: "#FFFDF8",
  charcoal: "#0B0F17",
};

// ── SMOOTH GRADUAL SLIDE animation ──────────────────────────────────────
const slideFromRight = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1.4,           // Slower entry (was 0.7)
      ease: [0.16, 1, 0.3, 1], // Very smooth deceleration curve
    }
  },
  exit: {
    x: "-40%",
    opacity: 0,
    transition: {
      duration: 0.9,           // Slower exit (was 0.4)
      ease: [0.5, 0, 0.75, 0], // Smooth acceleration out
    }
  },
};

const textFadeUp = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,           // Slower text reveal (was 0.6)
      delay: 0.5,              // Longer delay (was 0.3)
      ease: [0.16, 1, 0.3, 1], // Smooth deceleration
    }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: {
      duration: 0.5,           // Slower exit
      ease: [0.5, 0, 0.75, 0],
    }
  },
};

// Reduced-motion counterparts — same content, opacity-only crossfade
// instead of the translate slide, per prefers-reduced-motion.
const fadeOnlyBg = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

const fadeOnlyText = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, delay: 0.15, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

// Minimal scoped CSS — inline styles can't express :focus-visible, the
// enlarged invisible dot hit-area, visually-hidden live-region text, or
// box-sizing safety, so those live here alongside the inline-style-driven
// rest of the component.
const CSS = `
  .visa-slider-root,
  .visa-slider-root * {
    box-sizing: border-box;
  }

  .visa-slider-arrow:focus-visible,
  .visa-slider-cta:focus-visible,
  .visa-slider-dot:focus-visible,
  .visa-slider-toggle:focus-visible {
    outline: 2px solid ${colors.goldLight};
    outline-offset: 3px;
  }

  .visa-slider-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .visa-slider-arrow,
    .visa-slider-cta,
    .visa-slider-dot,
    .visa-slider-dot-pill,
    .visa-slider-toggle {
      transition: none !important;
    }
  }
`;

export default function VisaSlider() {
  const [current, setCurrent] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartRef = useRef(null);
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  // Track actual width (not just a mobile boolean) so we can add a finer
  // extra-small tier for 320–359px phones without a second effect.
  useEffect(() => {
    const check = () => setViewportWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isMobile = viewportWidth < 640;
  const isXSmall = viewportWidth < 360;

  // Combined pause state: hover, keyboard focus, or the explicit user
  // toggle all stop autoplay — WCAG 2.2.2 requires a way for the person
  // to stop auto-advancing content, and hover alone doesn't cover
  // keyboard or touch-only visitors.
  const isPaused = isHoverPaused || isFocusPaused || isManuallyPaused;

  // Timer logic with pause support - smoother, longer intervals.
  // Also respects prefers-reduced-motion: no forced auto-rotation.
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || reducedMotion) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  }, [isPaused, reducedMotion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // Manual navigation resets the countdown to a fresh window and correctly
  // respects whatever pause state is currently active (previously this
  // duplicated the interval logic and always restarted autoplay even while
  // paused).
  const goTo = (i) => {
    setCurrent(i);
    startTimer();
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  // Real swipe gesture — the "Swipe to navigate" hint now actually works.
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartRef.current;
    if (diff > SWIPE_THRESHOLD) prev();
    else if (diff < -SWIPE_THRESHOLD) next();
    touchStartRef.current = null;
  };

  // ArrowLeft/ArrowRight navigation whenever focus is anywhere inside the
  // slider (arrows, dots, CTA, or the toggle).
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const slide = SLIDES[current];
  const bgVariants = reducedMotion ? fadeOnlyBg : slideFromRight;
  const textVariants = reducedMotion ? fadeOnlyText : textFadeUp;

  return (
    <div
      className="visa-slider-root"
      role="region"
      aria-roledescription="carousel"
      aria-label="Visa services highlights"
      style={{
        width: "100%",
        minHeight: isMobile ? "85vh" : "75vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.charcoal,
        fontFamily: typography.body,
        touchAction: "pan-y",
      }}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
      onFocus={() => setIsFocusPaused(true)}
      onBlur={(e) => {
        // Only resume autoplay once focus has actually left the slider,
        // not when it moves between two elements inside it.
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocusPaused(false);
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      <style>{CSS}</style>

      {/* Screen-reader-only announcement of slide changes — the visual
          crossfade conveys nothing to assistive tech on its own. */}
      <div className="visa-slider-sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${current + 1} of ${SLIDES.length}: ${slide.heading}`}
      </div>

      {/* Background Image - SMOOTH GRADUAL SLIDE from RIGHT (or fade if reduced motion) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          variants={bgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
            willChange: "transform, opacity",
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* Overlay - Darker on mobile */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: isMobile
            ? `linear-gradient(180deg, rgba(11,15,23,0.88) 0%, rgba(11,15,23,0.55) 50%, rgba(11,15,23,0.9) 100%)`
            : `linear-gradient(180deg, rgba(11,15,23,0.78) 0%, rgba(11,15,23,0.45) 40%, rgba(11,15,23,0.82) 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: isMobile ? "85vh" : "75vh",
        textAlign: "center",
        padding: isXSmall ? "64px 14px 36px" : isMobile ? "80px 20px 40px" : "60px 24px",
        boxSizing: "border-box",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${SLIDES.length}`}
            style={{
              maxWidth: isMobile ? "100%" : 760,
              width: "100%",
            }}
          >
            {/* Eyebrow Badge */}
            <div style={{
              display: "inline-block",
              padding: isXSmall ? "4px 12px" : isMobile ? "5px 14px" : "6px 18px",
              border: `1px solid ${colors.goldLight}66`,
              borderRadius: 50,
              color: colors.goldLight,
              fontSize: isXSmall ? "9px" : isMobile ? "10px" : "clamp(10px, 0.8vw, 12px)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: isMobile ? 16 : 20,
              backdropFilter: "blur(4px)",
              background: "rgba(0,0,0,0.3)",
              fontFamily: typography.body,
              maxWidth: "100%",
              overflowWrap: "break-word",
            }}>
              {slide.eyebrow}
            </div>

            {/* Heading — Rasoaf Display */}
            <h2 style={{
              fontFamily: typography.display,
              fontSize: isMobile ? "clamp(22px, 7vw, 32px)" : "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: colors.cream,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              overflowWrap: "break-word",
              margin: 0,
              marginTop: 0,
              marginBottom: isMobile ? 12 : 18,
            }}>
              {slide.heading}
            </h2>

            {/* Paragraph — Rasoaf Body */}
            <p style={{
              fontFamily: typography.body,
              fontSize: isXSmall ? "clamp(12px, 3.2vw, 14px)" : isMobile ? "clamp(13px, 3.5vw, 15px)" : "clamp(14px, 1.2vw, 16px)",
              fontWeight: 400,
              lineHeight: 1.65,
              letterSpacing: "0.005em",
              color: `rgba(255, 253, 248, 0.85)`,
              maxWidth: isMobile ? "100%" : 620,
              margin: isMobile ? "0 auto 24px" : "0 auto 30px",
              textShadow: "0 1px 10px rgba(0,0,0,0.4)",
              padding: isMobile ? "0 4px" : 0,
              overflowWrap: "break-word",
            }}>
              {slide.paragraph}
            </p>

            {/* CTA Button — Rasoaf Gold */}
            <button
              className="visa-slider-cta"
              onClick={() => navigate(slide.ctaTo)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: isXSmall ? "11px 22px" : isMobile ? "13px 28px" : "15px 36px",
                borderRadius: 50,
                border: "none",
                background: `linear-gradient(135deg, ${colors.goldLight} 0%, ${colors.gold} 100%)`,
                color: colors.charcoal,
                fontFamily: typography.body,
                fontSize: isXSmall ? "12px" : isMobile ? "13px" : "clamp(14px, 0.95vw, 15px)",
                fontWeight: 700,
                letterSpacing: "0.01em",
                cursor: "pointer",
                boxShadow: "0 6px 28px rgba(212, 160, 23, 0.35)",
                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                minHeight: 44,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(212, 160, 23, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(212, 160, 23, 0.35)";
                }
              }}
            >
              {slide.ctaLabel}
              <ArrowRight size={isMobile ? 14 : 16} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow - Desktop only */}
      {!isMobile && (
        <button
          className="visa-slider-arrow"
          onClick={prev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            top: "50%",
            left: "clamp(12px, 3vw, 28px)",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(11, 15, 23, 0.5)",
            border: `1px solid ${colors.goldLight}66`,
            color: colors.cream,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${colors.goldLight}, ${colors.gold})`;
            e.currentTarget.style.color = colors.charcoal;
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(11, 15, 23, 0.5)";
            e.currentTarget.style.color = colors.cream;
            e.currentTarget.style.borderColor = `${colors.goldLight}66`;
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow - Desktop only */}
      {!isMobile && (
        <button
          className="visa-slider-arrow"
          onClick={next}
          aria-label="Next slide"
          style={{
            position: "absolute",
            top: "50%",
            right: "clamp(12px, 3vw, 28px)",
            transform: "translateY(-50%)",
            zIndex: 3,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(11, 15, 23, 0.5)",
            border: `1px solid ${colors.goldLight}66`,
            color: colors.cream,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${colors.goldLight}, ${colors.gold})`;
            e.currentTarget.style.color = colors.charcoal;
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(11, 15, 23, 0.5)";
            e.currentTarget.style.color = colors.cream;
            e.currentTarget.style.borderColor = `${colors.goldLight}66`;
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Bottom control row: pause/play toggle + dots navigation.
          The pause/play toggle is only rendered when autoplay is actually
          active (i.e. reduced motion is off) — with reduced motion there's
          nothing running that needs to be stopped. */}
      <div style={{
        position: "absolute",
        bottom: isXSmall ? 14 : isMobile ? 20 : 30,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 6 : 10,
      }}>
        {!reducedMotion && (
          <button
            className="visa-slider-toggle"
            onClick={() => setIsManuallyPaused((prev) => !prev)}
            aria-label={isManuallyPaused ? "Play automatic slideshow" : "Pause automatic slideshow"}
            aria-pressed={isManuallyPaused}
            style={{
              width: isMobile ? 26 : 30,
              height: isMobile ? 26 : 30,
              borderRadius: "50%",
              background: "rgba(11, 15, 23, 0.5)",
              border: `1px solid ${colors.goldLight}66`,
              color: colors.cream,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              flexShrink: 0,
            }}
          >
            {isManuallyPaused ? (
              <Play size={isMobile ? 11 : 13} />
            ) : (
              <Pause size={isMobile ? 11 : 13} />
            )}
          </button>
        )}

        {/* Dots Navigation — visual pill stays the original tiny size, but
            each button gets transparent padding so the actual tap target
            is meaningfully larger (was ~8px, now ~32px). */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className="visa-slider-dot"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: isMobile ? 8 : 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="visa-slider-dot-pill"
                style={{
                  display: "block",
                  width: i === current ? (isMobile ? 22 : 28) : (isMobile ? 7 : 8),
                  height: isMobile ? 7 : 8,
                  borderRadius: 50,
                  background: i === current
                    ? `linear-gradient(135deg, ${colors.goldLight}, ${colors.gold})`
                    : "rgba(255, 253, 248, 0.35)",
                  transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Swipe indicator - Mobile only */}
      {isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: isXSmall ? 44 : 50,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            color: "rgba(255,255,255,0.25)",
            fontSize: "10px",
            fontFamily: typography.body,
            fontWeight: 500,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          Swipe to navigate
        </div>
      )}
    </div>
  );
}