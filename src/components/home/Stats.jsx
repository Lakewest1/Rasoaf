// src/components/home/Stats.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Users,
  Star,
  Building2,
  Plane,
  Globe,
  Award,
  Calendar,
  Clock,
  CheckCircle,
  Heart,
  Shield,
  MapPin,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Stats Section
//
// Architecture: EVS Healthcare Stats component (all hooks + animation patterns
// preserved verbatim). Content replaced with RASOAF Hajj/travel data.
// Added below the stats grid:
//   • Trust Indicators strip — 6 premium trust badges with Lucide icons
//   • Kaaba decorative element for spiritual connection
//   • Paragraph — RASOAF brand mission statement
//   • CTAs       — "Book a Trip" + "See Packages"
//   • Social row — Website, Email, Facebook, Instagram, X, TikTok
//
// Colors: gold #C4972A / deep navy #0a0a2e / off-white #fafaf8
// Animation: alternating left ↔ right card slide-in (from EVS, unchanged)
// Mobile: opacity fade only, shorter intervals, no parallax
// ─────────────────────────────────────────────────────────────────────────────

// ── Kaaba SVG Icon ─────────────────────────────────────────────────────────
const KaabaIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="4" y="6" width="16" height="14" rx="1" />
    <path d="M4 6 12 2l8 4" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <rect x="9" y="13" width="6" height="7" />
  </svg>
);

const isMobile = () => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

const mobile = isMobile();

const SLIDE_DISTANCE = 80; // px — how far cards travel before snapping in

// ── Hook: IntersectionObserver, fires once ────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Hook: Sequential card reveal ─────────────────────────────────────────────
function useSequentialReveal(enabled, total, interval = 600) {
  const [revealed, setRevealed] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let current = 0;

    timeoutRef.current = setTimeout(() => {
      current = 1;
      setRevealed(1);

      intervalRef.current = setInterval(() => {
        current++;
        setRevealed(current);
        if (current >= total) clearInterval(intervalRef.current);
      }, interval);
    }, 300);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [enabled, total, interval]);

  return revealed;
}

// ── Hook: rAF-based counter with easeOutExpo ─────────────────────────────────
function useCounter(target, duration = 2200, enabled = false) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const started = useRef(false);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animDuration = mobile ? duration * 0.7 : duration;

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;

    if (prefersReduced || mobile) {
      setCount(target);
      setDone(true);
      return;
    }

    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / animDuration, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(e * target));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, target, animDuration, prefersReduced]);

  return { count, done };
}

// ── Hook: rAF-throttled scroll parallax (disabled on mobile) ─────────────────
function useScrollParallax(speed = 0.3) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (mobile) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrolled = window.innerHeight - rect.top;
          setOffset(scrolled * speed);
        }
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return [sectionRef, offset];
}

// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Data
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  {
    value: 10000,
    suffix: "+",
    label: "Happy Travellers",
    desc: "Pilgrims & explorers served worldwide",
    icon: "pilgrim",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    desc: "Verified post-journey survey",
    icon: "star",
  },
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
    desc: "Trusted in Hajj & Umrah services",
    icon: "kaaba",
  },
  {
    value: 50,
    suffix: "+",
    label: "Global Destinations",
    desc: "Flights, hotels & visa worldwide",
    icon: "plane",
  },
];

// ── Trust Indicators Data with Lucide Icons ──────────────────────────────
const TRUST_INDICATORS = [
  {
    id: 1,
    label: "10,000+ Pilgrims Served",
    icon: Users,
    iconColor: "#C4972A",
  },
  {
    id: 2,
    label: "15+ Years Experience",
    icon: Calendar,
    iconColor: "#C4972A",
  },
  {
    id: 3,
    label: "Saudi Visa Assistance",
    icon: Shield,
    iconColor: "#C4972A",
  },
  {
    id: 4,
    label: "24/7 Customer Support",
    icon: Clock,
    iconColor: "#C4972A",
  },
  {
    id: 5,
    label: "IATA / Government Registered",
    icon: Award,
    iconColor: "#C4972A",
  },
  {
    id: 6,
    label: "98% Client Satisfaction",
    icon: Heart,
    iconColor: "#C4972A",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Website",
    href: "https://www.rasoaf.com",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:rasoaf24@gmail.com",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61590695552485",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rasoaftravelsandtours/",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/Rasoaftravels",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@rasoaftravelsandtours",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

// ── Inline SVG stat icons ─────────────────────────────────────────────────────
function StatIcon({ type, size = 28 }) {
  const s = size;
  if (type === "pilgrim") return <Users size={s} strokeWidth={1.5} />;
  if (type === "star") return <Star size={s} strokeWidth={1.5} />;
  if (type === "kaaba") return <KaabaIcon size={s} />;
  if (type === "plane") return <Plane size={s} strokeWidth={1.5} />;
  return <Globe size={s} strokeWidth={1.5} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// StatCard — EVS architecture preserved verbatim, RASOAF colors applied
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ stat, isVisible, index, fromLeft }) {
  const { count, done } = useCounter(stat.value, 2200, isVisible);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const iconSize = mobile ? 22 : 28;
  const iconBoxSize = mobile ? "clamp(44px, 8vw, 54px)" : "clamp(50px, 7vw, 64px)";
  const fontSize = mobile ? "clamp(1.5rem, 4vw, 2.2rem)" : "clamp(1.9rem, 3.5vw, 3.4rem)";
  const padding = mobile
    ? "clamp(20px, 4vw, 32px) clamp(14px, 3vw, 24px) clamp(18px, 3vw, 28px)"
    : "clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px) clamp(24px, 3vw, 38px)";

  const handleMouseEnter = () => !mobile && setHovered(true);
  const handleMouseLeave = () => !mobile && setHovered(false);
  const handleMouseMove = useCallback(
    (e) => {
      if (mobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
      const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
      cardRef.current.style.setProperty("--tilt-x", `${x}%`);
      cardRef.current.style.setProperty("--tilt-y", `${y}%`);
    },
    []
  );

  const iconTransform = !isVisible
    ? "scale(0.5) rotate(-10deg)"
    : hovered && !mobile
      ? "scale(1.08) rotate(2deg)"
      : "scale(1) rotate(0deg)";

  const hiddenTranslate = mobile
    ? "translateX(0)"
    : fromLeft
      ? `translateX(-${SLIDE_DISTANCE}px)`
      : `translateX(${SLIDE_DISTANCE}px)`;

  const visibleTranslate =
    hovered && !mobile ? "translateY(-4px) scale(1.01)" : "translateX(0) scale(1)";

  const cardTransform = isVisible ? visibleTranslate : hiddenTranslate;

  const cardTransition = mobile
    ? "opacity 0.55s ease, transform 0.55s ease"
    : isVisible && hovered
      ? "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
      : `opacity 1.1s cubic-bezier(0.16,1,0.3,1),
         transform 1.1s cubic-bezier(0.16,1,0.3,1),
         border-color 0.3s ease,
         box-shadow 0.3s ease`;

  // Format count — show "K" suffix for 10000+
  const displayCount = stat.value >= 1000
    ? `${Math.round(count / 1000)}K`
    : count;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        "--tilt-x": "50%",
        "--tilt-y": "50%",
        position: "relative",
        background: "#ffffff",
        border: `1px solid ${hovered && !mobile ? "rgba(196,151,42,0.45)" : "rgba(0,0,0,0.06)"}`,
        borderRadius: mobile ? 16 : 20,
        padding,
        boxShadow: hovered && !mobile
          ? "0 20px 50px rgba(0,0,0,0.08), 0 4px 15px rgba(196,151,42,0.10)"
          : "0 2px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
        textAlign: "center",
        cursor: "default",
        opacity: isVisible ? 1 : 0,
        transform: cardTransform,
        transition: cardTransition,
        willChange: "opacity, transform",
        overflow: "hidden",
      }}
      aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
    >
      {/* Gold accent bar — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #C4972A, #f0c060, #C4972A)",
            borderRadius: "20px 20px 0 0",
            transformOrigin: "left center",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            opacity: hovered ? 1 : 0.6,
            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
          }}
        />
      )}

      {/* Mouse tilt glow — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at var(--tilt-x) var(--tilt-y), rgba(196,151,42,0.06), transparent 60%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            borderRadius: 20,
          }}
        />
      )}

      {/* Glass shine — desktop only */}
      {!mobile && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "-20%",
            width: "60%",
            height: "120%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            transform: "skewX(-15deg) translateY(-50%)",
            animation: `rasoafGlassShine 12s ease-in-out ${index * 3}s infinite`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          marginBottom: mobile ? "clamp(10px, 2vw, 14px)" : "clamp(14px, 2vw, 18px)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: iconBoxSize,
          height: iconBoxSize,
          borderRadius: "50%",
          background: hovered && !mobile
            ? "linear-gradient(135deg, rgba(196,151,42,0.14), rgba(196,151,42,0.06))"
            : "rgba(196,151,42,0.05)",
          border: `1px solid ${hovered && !mobile ? "rgba(196,151,42,0.25)" : "rgba(196,151,42,0.12)"}`,
          color: "#C4972A",
          transform: iconTransform,
          transition: mobile
            ? "opacity 0.4s ease"
            : "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
          opacity: isVisible ? 1 : 0,
          position: "relative",
          zIndex: 2,
        }}
      >
        <StatIcon type={stat.icon} size={iconSize} />
      </div>

      {/* Counter */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={done && !mobile ? "rasoaf-counter-glow" : ""}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize,
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: mobile ? "clamp(6px, 1.5vw, 8px)" : "clamp(8px, 1.2vw, 10px)",
          color: "#0a0a2e",
          letterSpacing: "-0.03em",
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(10px)",
          transition: isVisible
            ? "opacity 0.6s ease 0.6s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.6s"
            : "opacity 0.3s ease, transform 0.3s ease",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>{displayCount}</span>
        <span style={{ color: "#C4972A" }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: mobile ? "clamp(12px, 2.5vw, 13px)" : "clamp(13px, 1.8vw, 15px)",
          fontWeight: 600,
          color: "#0a0a2e",
          letterSpacing: "0.01em",
          marginBottom: mobile ? "clamp(4px, 1vw, 5px)" : "clamp(5px, 0.8vw, 7px)",
          lineHeight: 1.3,
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(8px)",
          transition: isVisible
            ? "opacity 0.6s ease 0.8s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {stat.label}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: mobile ? "clamp(10px, 2vw, 11px)" : "clamp(11px, 1.4vw, 12.5px)",
          color: "#8a8a9a",
          letterSpacing: "0.01em",
          lineHeight: 1.5,
          fontStyle: "italic",
          position: "relative",
          zIndex: 2,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(6px)",
          transition: isVisible
            ? "opacity 0.6s ease 1.0s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 1.0s"
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {stat.desc}
      </div>

      {/* Bottom separator — gold gradient line */}
      <div
        style={{
          height: mobile ? 1 : 1.5,
          background: "linear-gradient(90deg, transparent, #C4972A, transparent)",
          borderRadius: 999,
          margin: mobile
            ? "clamp(12px, 3vw, 16px) auto 0"
            : "clamp(16px, 2.5vw, 22px) auto 0",
          position: "relative",
          zIndex: 2,
          width: hovered && !mobile ? "55%" : mobile ? "40%" : "28%",
          opacity: isVisible ? (mobile ? 0.45 : 0.6) : 0,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: isVisible
            ? `width 0.4s cubic-bezier(0.16,1,0.3,1),
             opacity 0.5s ease 1.1s,
             transform 0.5s cubic-bezier(0.16,1,0.3,1) 1.1s`
            : "opacity 0.3s ease, transform 0.3s ease",
        }}
      />
    </div>
  );
}

// ── Trust Indicator Chip with Lucide Icons ──────────────────────────────────
function TrustChip({ indicator, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.06 * index;
  const IconComponent = indicator.icon;

  return (
    <div
      className="trust-chip-wrapper"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `
          opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s,
          transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s
        `,
      }}
      onMouseEnter={() => !mobile && setHovered(true)}
      onMouseLeave={() => !mobile && setHovered(false)}
    >
      <div
        className="trust-chip"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: hovered ? "#ffffff" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: `1px solid ${hovered ? "rgba(196,151,42,0.3)" : "rgba(0,0,0,0.06)"}`,
          borderRadius: "50px",
          padding: "6px 16px 6px 10px",
          boxShadow: hovered
            ? "0 4px 16px rgba(0,0,0,0.06), 0 2px 8px rgba(196,151,42,0.08)"
            : "0 2px 8px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)",
          transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          whiteSpace: "nowrap",
          cursor: "default",
          fontFamily: "'Inter', sans-serif",
          fontSize: mobile ? "clamp(10px, 2vw, 11px)" : "clamp(11px, 1vw, 12.5px)",
          fontWeight: 450,
          color: "#2d3748",
          letterSpacing: "0.02em",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: hovered
              ? "linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.05))"
              : "rgba(196,151,42,0.08)",
            color: "#C4972A",
            flexShrink: 0,
            transition: "background 0.3s ease",
          }}
        >
          <IconComponent size={12} strokeWidth={2.5} />
        </span>
        <span style={{ lineHeight: 1.4 }}>{indicator.label}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RasoafStats — main export
// ─────────────────────────────────────────────────────────────────────────────
export default function RasoafStats() {
  const [sectionRef, inView] = useInView(0.15);
  const [parallaxRef, dotOffset] = useScrollParallax(0.18);
  const [parallaxRef2, orbOffset] = useScrollParallax(0.09);
  const [lineRevealed, setLineRevealed] = useState(false);
  const [ctasVisible, setCtasVisible] = useState(false);
  const [trustVisible, setTrustVisible] = useState(false);

  const setRefs = useCallback((el) => {
    sectionRef.current = el;
    parallaxRef.current = el;
    parallaxRef2.current = el;
  }, []);

  const revealedCount = useSequentialReveal(
    inView,
    STATS.length,
    mobile ? 300 : 600
  );

  useEffect(() => {
    if (inView) {
      const t1 = setTimeout(() => setLineRevealed(true), mobile ? 200 : 400);
      const t2 = setTimeout(() => setTrustVisible(true), mobile ? 500 : 800);
      const t3 = setTimeout(() => setCtasVisible(true), mobile ? 800 : 1400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [inView]);

  const gridGap = mobile ? "clamp(10px, 2.5vw, 16px)" : "clamp(14px, 2.5vw, 28px)";

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,450;14..32,500;14..32,600;14..32,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&display=swap');

        @keyframes rasoafCounterGlow {
          0%   { text-shadow: none; }
          35%  { text-shadow: 0 0 22px rgba(196,151,42,0.55), 0 0 44px rgba(196,151,42,0.25); }
          100% { text-shadow: none; }
        }
        .rasoaf-counter-glow {
          animation: rasoafCounterGlow 1s cubic-bezier(0.22,1,0.36,1) 0.05s 1 forwards;
        }

        @keyframes rasoafGlassShine {
          0%, 88%  { left: -20%; opacity: 0; }
          89%      { opacity: 0.5; }
          94%      { left: 130%; opacity: 0; }
          100%     { left: 130%; opacity: 0; }
        }

        @keyframes rasoafStatShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes rasoafSlowPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(196,151,42,0.3); }
          50%       { box-shadow: 0 0 16px rgba(196,151,42,0.55); }
        }

        .rasoaf-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: ${gridGap};
        }
        @media (max-width: 1024px) {
          .rasoaf-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .rasoaf-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }

        .rasoaf-stats-section {
          padding: ${
            mobile
              ? "56px 16px 52px"
              : "clamp(72px, 10vh, 112px) clamp(20px, 6vw, 96px) clamp(72px, 9vh, 104px)"
          };
        }

        /* ── Trust Indicators Strip ────────────────────────────────────── */
        .trust-strip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 16px);
          margin: clamp(20px, 3vh, 32px) auto clamp(28px, 4vh, 44px);
          max-width: 820px;
          padding: 0 clamp(4px, 1vw, 12px);
        }

        .trust-chip-wrapper {
          display: inline-flex;
        }

        @media (max-width: 640px) {
          .trust-strip {
            gap: 8px;
            max-width: 100%;
          }
          .trust-chip-wrapper .trust-chip {
            padding: 5px 12px 5px 8px;
            font-size: 10px;
            white-space: normal;
          }
          .trust-chip-wrapper .trust-chip span:first-child {
            width: 16px;
            height: 16px;
          }
          .trust-chip-wrapper .trust-chip span:first-child svg {
            width: 10px !important;
            height: 10px !important;
          }
        }

        @media (max-width: 420px) {
          .trust-strip {
            gap: 6px;
          }
          .trust-chip-wrapper .trust-chip {
            padding: 4px 10px 4px 7px;
            font-size: 9px;
          }
          .trust-chip-wrapper .trust-chip span:first-child {
            width: 14px;
            height: 14px;
          }
          .trust-chip-wrapper .trust-chip span:first-child svg {
            width: 9px !important;
            height: 9px !important;
          }
        }

        /* CTA buttons */
        .rasoaf-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1.3vw, 15px);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #ffffff;
          background: #C4972A;
          border: none;
          border-radius: 100px;
          padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
          cursor: pointer;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          box-shadow: 0 4px 18px rgba(196,151,42,0.28);
          position: relative;
          overflow: hidden;
        }
        .rasoaf-cta-primary:hover {
          background: #b8842a;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 28px rgba(196,151,42,0.35);
        }
        .rasoaf-cta-primary:active { transform: scale(0.98); transition-duration: 0.1s; }

        .rasoaf-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1.3vw, 15px);
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #C4972A;
          background: transparent;
          border: 1.5px solid rgba(196,151,42,0.55);
          border-radius: 100px;
          padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .rasoaf-cta-secondary:hover {
          border-color: #C4972A;
          background: rgba(196,151,42,0.06);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 16px rgba(196,151,42,0.12);
        }
        .rasoaf-cta-secondary:active { transform: scale(0.98); transition-duration: 0.1s; }

        /* Social chips */
        .rasoaf-social-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', 'Space Grotesk', sans-serif;
          font-size: clamp(10px, 1vw, 11px);
          font-weight: 450;
          color: rgba(10,10,46,0.50);
          text-decoration: none;
          background: rgba(255,255,255,0.70);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 100px;
          padding: 6px 13px;
          transition: all 0.28s cubic-bezier(0.25,1,0.5,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .rasoaf-social-chip::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(105deg, transparent 30%, rgba(196,151,42,0.14) 50%, transparent 70%);
          transform: skewX(-15deg);
          transition: left 0.5s ease;
          pointer-events: none;
        }
        .rasoaf-social-chip svg { color: currentColor; flex-shrink: 0; transition: transform 0.28s ease; }
        .rasoaf-social-chip:hover {
          border-color: rgba(196,151,42,0.35);
          color: #b8842a;
          background: rgba(196,151,42,0.04);
          transform: translateY(-2px);
          box-shadow: 0 3px 12px rgba(196,151,42,0.10);
        }
        .rasoaf-social-chip:hover::before { left: 120%; }
        .rasoaf-social-chip:hover svg { transform: scale(1.12); }
        .rasoaf-social-chip:focus-visible {
          outline: 2px solid #C4972A;
          outline-offset: 2px;
        }

        @media (hover: none) {
          .rasoaf-counter-glow { animation: none !important; }
          .rasoaf-social-chip::before { display: none; }
          .rasoaf-social-chip:hover { transform: none; }
          .trust-chip-wrapper .trust-chip { transform: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
          .trust-chip-wrapper {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* ── Kaaba decorative element ────────────────────────────────── */
        .kaaba-decoration {
          position: absolute;
          bottom: -40px;
          right: -40px;
          opacity: 0.03;
          pointer-events: none;
          z-index: 0;
        }
        .kaaba-decoration svg {
          width: 200px;
          height: 200px;
        }
        @media (max-width: 768px) {
          .kaaba-decoration {
            bottom: -20px;
            right: -20px;
          }
          .kaaba-decoration svg {
            width: 120px;
            height: 120px;
          }
        }
        @media (max-width: 480px) {
          .kaaba-decoration {
            bottom: -10px;
            right: -10px;
          }
          .kaaba-decoration svg {
            width: 80px;
            height: 80px;
          }
        }

        .kaaba-decoration-top {
          position: absolute;
          top: -30px;
          left: -30px;
          opacity: 0.02;
          pointer-events: none;
          z-index: 0;
        }
        .kaaba-decoration-top svg {
          width: 160px;
          height: 160px;
          transform: rotate(45deg);
        }
        @media (max-width: 768px) {
          .kaaba-decoration-top {
            top: -15px;
            left: -15px;
          }
          .kaaba-decoration-top svg {
            width: 100px;
            height: 100px;
          }
        }
        @media (max-width: 480px) {
          .kaaba-decoration-top {
            top: -10px;
            left: -10px;
          }
          .kaaba-decoration-top svg {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>

      <section
        ref={setRefs}
        className="rasoaf-stats-section"
        aria-label="RASOAF Travels key statistics"
        style={{
          position: "relative",
          background: "#fafaf8",
          overflow: "hidden",
          minHeight: "400px",
        }}
      >
        {/* ── Kaaba Decorative Elements ──────────────────────────────── */}
        <div className="kaaba-decoration" aria-hidden="true">
          <KaabaIcon size={200} />
        </div>
        <div className="kaaba-decoration-top" aria-hidden="true">
          <KaabaIcon size={160} />
        </div>

        {/* Parallax dot grid — desktop only */}
        {!mobile && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: "radial-gradient(circle, rgba(196,151,42,0.08) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              transform: `translateY(${dotOffset * 0.18}px)`,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        )}

        {/* Decorative orbs — desktop only */}
        {!mobile && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-12%",
                left: "-5%",
                width: "clamp(260px, 45vw, 480px)",
                height: "clamp(260px, 45vw, 480px)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,151,42,0.07) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none",
                transform: `translateY(${orbOffset * 0.09}px)`,
                willChange: "transform",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-10%",
                right: "-6%",
                width: "clamp(200px, 35vw, 360px)",
                height: "clamp(200px, 35vw, 360px)",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(10,10,46,0.04) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none",
                transform: `translateY(${-orbOffset * 0.06}px)`,
                willChange: "transform",
              }}
            />
          </>
        )}

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: mobile ? "clamp(20px, 3vh, 28px)" : "clamp(28px, 4vh, 40px)",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(15px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: mobile ? 12 : 16,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: mobile ? 24 : 36,
                  height: 1.5,
                  background: "#C4972A",
                  borderRadius: 999,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "right",
                  transition: "opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: mobile ? "clamp(9px, 2vw, 10px)" : "clamp(10px, 1.3vw, 11px)",
                  fontWeight: 700,
                  letterSpacing: mobile ? "3px" : "4px",
                  textTransform: "uppercase",
                  color: "#C4972A",
                  whiteSpace: "nowrap",
                }}
              >
                Our Impact
              </span>
              <div
                style={{
                  width: mobile ? 24 : 36,
                  height: 1.5,
                  background: "#C4972A",
                  borderRadius: 999,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "opacity 0.5s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: mobile ? "clamp(1.3rem, 4vw, 1.8rem)" : "clamp(1.5rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: "#0a0a2e",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: "0 0 12px",
                padding: "0 clamp(8px, 2vw, 24px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(8px, 1.5vw, 16px)",
                flexWrap: "wrap",
              }}
            >
              Sacred Journeys,{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #9a6e1a 0%, #C4972A 40%, #e8b840 60%, #C4972A 80%, #9a6e1a 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: mobile ? "none" : "rasoafStatShimmer 4s linear infinite",
                }}
              >
                Trusted Numbers
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: mobile ? "clamp(12px, 3vw, 13px)" : "clamp(13px, 1.6vw, 15px)",
                color: "#6b6b7a",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.68,
                fontWeight: 400,
                padding: "0 clamp(8px, 2vw, 24px)",
              }}
            >
              We bring reality to your journey — from sacred Hajj &amp; Umrah
              pilgrimages to seamless global visa services and premium travel
              experiences. No templates, no repeated routes, no shortcuts.
            </p>
          </div>

          {/* ── TRUST INDICATORS STRIP ────────────────────────────────── */}
          <div className="trust-strip" role="list" aria-label="Trust indicators">
            {TRUST_INDICATORS.map((indicator, index) => (
              <TrustChip
                key={indicator.id}
                indicator={indicator}
                index={index}
                inView={trustVisible}
              />
            ))}
          </div>

          {/* Section divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: mobile ? 12 : 18,
              marginBottom: mobile ? "clamp(24px, 4vh, 32px)" : "clamp(32px, 5vh, 48px)",
              maxWidth: mobile ? 280 : 400,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              style={{
                flex: 1,
                height: mobile ? 1 : 1.5,
                background: "linear-gradient(90deg, transparent, #C4972A)",
                transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
            <div
              style={{
                width: mobile ? 5 : 6,
                height: mobile ? 5 : 6,
                borderRadius: "50%",
                background: "#C4972A",
                boxShadow: lineRevealed ? "0 0 8px rgba(196,151,42,0.35)" : "none",
                animation: lineRevealed && !mobile ? "rasoafSlowPulse 3s ease-in-out infinite" : "none",
                opacity: lineRevealed ? 1 : 0,
                transform: lineRevealed ? "scale(1)" : "scale(0)",
                transition: "opacity 0.4s ease 0.4s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.4s",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                height: mobile ? 1 : 1.5,
                background: "linear-gradient(90deg, #C4972A, transparent)",
                transform: lineRevealed ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          {/* ── Stats cards grid ─────────────────────────────────────────── */}
          <div className="rasoaf-stats-grid">
            {STATS.map((s, i) => (
              <StatCard
                key={s.label}
                stat={s}
                isVisible={i < revealedCount}
                index={i}
                fromLeft={i % 2 === 0}
              />
            ))}
          </div>

          {/* ── CTA row ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(16px, 2.5vw, 24px)",
              marginTop: mobile ? "clamp(32px, 5vh, 40px)" : "clamp(44px, 6vh, 64px)",
              flexWrap: "wrap",
              opacity: ctasVisible ? 1 : 0,
              transform: ctasVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <button
              type="button"
              className="rasoaf-cta-primary"
              onClick={() => scrollTo("booking")}
              aria-label="Book a trip"
            >
              ✈ Book a Trip
            </button>
            <button
              type="button"
              className="rasoaf-cta-secondary"
              onClick={() => scrollTo("services")}
              aria-label="See Packages"
            >
              See Packages
            </button>
          </div>

          {/* ── Social row ───────────────────────────────────────────────── */}
          <div
            style={{
              marginTop: mobile ? "clamp(28px, 4vh, 36px)" : "clamp(40px, 5vh, 56px)",
              paddingTop: mobile ? "clamp(20px, 3vh, 28px)" : "clamp(28px, 4vh, 40px)",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              position: "relative",
              opacity: ctasVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.2s",
            }}
          >
            {/* gold accent line */}
            <div
              style={{
                position: "absolute",
                top: -1,
                left: "10%",
                right: "10%",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.18) 20%, rgba(196,151,42,0.10) 50%, rgba(196,151,42,0.18) 80%, transparent)",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: mobile ? "clamp(6px, 2vw, 10px)" : "clamp(8px, 1.2vw, 12px)",
                flexWrap: "wrap",
              }}
              role="list"
              aria-label="RASOAF social media"
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rasoaf-social-chip"
                  aria-label={`RASOAF on ${link.label}`}
                  role="listitem"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom divider */}
          <div
            style={{
              marginTop: mobile ? "clamp(32px, 5vh, 40px)" : "clamp(48px, 6vh, 72px)",
              display: "flex",
              alignItems: "center",
              gap: mobile ? 12 : 18,
              opacity: inView ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
          >
            <div style={{ flex: 1, height: mobile ? 0.5 : 1, background: "rgba(0,0,0,0.06)" }} />
            <div
              style={{
                width: mobile ? 5 : 6,
                height: mobile ? 5 : 6,
                borderRadius: "50%",
                background: "#C4972A",
                boxShadow: "0 0 6px rgba(196,151,42,0.4)",
              }}
            />
            <div style={{ flex: 1, height: mobile ? 0.5 : 1, background: "rgba(0,0,0,0.06)" }} />
          </div>
        </div>
      </section>
    </>
  );
}