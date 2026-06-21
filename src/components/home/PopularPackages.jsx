// src/components/home/PopularPackages.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Popular Packages Section
// v2 — Fixed: cards always visible; observer adds lift-in animation on scroll
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useCallback } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  gold:       "#C4972A",
  goldLight:  "#F5C842",
  goldDeep:   "#A07820",
  goldPale:   "#FDF6E3",
  goldFaint:  "#FEF9ED",
  goldGlow:   "rgba(196,151,42,0.18)",
  ink:        "#1A1A1A",
  inkSoft:    "#3D3120",
  inkMuted:   "#7A6A4A",
  white:      "#FFFFFF",
  cream:      "#FFFBEF",
  borderGold: "rgba(196,151,42,0.22)",
  borderCard: "rgba(196,151,42,0.14)",
};

// ── Package data ──────────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: "economy-umrah",
    badge: "Best Value",
    badgeDark: true,
    title: "Economy Umrah",
    tagline: "A blessed journey within reach",
    description:
      "Everything you need for a meaningful Umrah pilgrimage, carefully arranged to deliver comfort and peace of mind at an accessible price.",
    duration: "10 Days",
    icon: "🕌",
    inclusions: [
      "Return Flights",
      "Hotel Accommodation",
      "Visa Processing",
      "Ground Transportation",
      "Guided Support",
    ],
    cta: "Inquire Now",
    ctaStyle: "outline",
  },
  {
    id: "premium-umrah",
    badge: "Most Popular",
    badgeDark: false,
    title: "Premium Umrah",
    tagline: "Elevated comfort, deeper devotion",
    description:
      "Stay in superior hotels steps from the Haram, with dedicated guides and premium services that let you focus entirely on worship.",
    duration: "12 Days",
    icon: "✨",
    inclusions: [
      "Return Flights",
      "5-Star Hotel Accommodation",
      "Visa Processing",
      "Private Ground Transportation",
      "24/7 Guided Support",
    ],
    cta: "Inquire Now",
    ctaStyle: "filled",
    featured: true,
  },
  {
    id: "vip-hajj",
    badge: "Recommended",
    badgeDark: true,
    title: "VIP Hajj",
    tagline: "The full Hajj experience, without compromise",
    description:
      "Our signature Hajj package offers luxury accommodation in Makkah and Madinah, private transport, and a dedicated scholar-guide throughout.",
    duration: "21 Days",
    icon: "🌙",
    inclusions: [
      "Return Flights",
      "Luxury Hotel Accommodation",
      "Visa & Documentation",
      "Private Transportation",
      "Scholar-Led Guided Support",
    ],
    cta: "Learn More",
    ctaStyle: "outline",
  },
  {
    id: "family-packages",
    badge: "Family Friendly",
    badgeDark: true,
    title: "Family Packages",
    tagline: "A sacred journey for the whole family",
    description:
      "Specially designed to accommodate families with children — spacious rooms, family-friendly itineraries, and personal support at every step.",
    duration: "14 Days",
    icon: "🤲",
    inclusions: [
      "Return Flights",
      "Family Room Accommodation",
      "Visa Processing",
      "Family Ground Transportation",
      "Dedicated Family Guide",
    ],
    cta: "Inquire Now",
    ctaStyle: "outline",
  },
];

const TRUST_ITEMS = [
  { icon: "✈️", text: "IATA Accredited Agency" },
  { icon: "🛡️", text: "Fully Bonded & Insured" },
  { icon: "📞", text: "24/7 Pilgrim Support Line" },
  { icon: "⭐", text: "10,000+ Satisfied Pilgrims" },
];

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,500;1,600;1,700&display=swap');

  .pp-section {
    width: 100%;
    background: #FEF9ED;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1A1A1A;
  }

  /* ── Banner ── */
  .pp-banner {
    position: relative;
    width: 100%;
    height: clamp(300px, 42vw, 440px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pp-banner__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
  }
  .pp-banner__overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(26,20,8,0.55) 0%, rgba(26,20,8,0.28) 40%, rgba(26,20,8,0.72) 100%),
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,151,42,0.22) 0%, transparent 65%);
    z-index: 1;
  }
  .pp-banner__content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: clamp(24px, 5vw, 48px) clamp(20px, 6vw, 80px);
    max-width: 760px;
    width: 100%;
  }

  /* Banner text — starts visible, gains entrance animation after JS runs */
  .pp-banner__eyebrow,
  .pp-banner__heading,
  .pp-banner__subtext,
  .pp-banner__actions {
    opacity: 1;
    transform: none;
  }
  /* JS adds .pp-anim-ready to the section, then .pp-visible to each child */
  .pp-section.pp-anim-ready .pp-banner__eyebrow,
  .pp-section.pp-anim-ready .pp-banner__heading,
  .pp-section.pp-anim-ready .pp-banner__subtext,
  .pp-section.pp-anim-ready .pp-banner__actions {
    opacity: 0;
    transform: translateY(18px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .pp-section.pp-anim-ready .pp-banner__eyebrow.pp-visible  { opacity: 1; transform: none; transition-delay: 0.05s; }
  .pp-section.pp-anim-ready .pp-banner__heading.pp-visible  { opacity: 1; transform: none; transition-delay: 0.18s; }
  .pp-section.pp-anim-ready .pp-banner__subtext.pp-visible  { opacity: 1; transform: none; transition-delay: 0.32s; }
  .pp-section.pp-anim-ready .pp-banner__actions.pp-visible  { opacity: 1; transform: none; transition-delay: 0.46s; }

  .pp-banner__eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: clamp(9px, 1vw, 11px);
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #F5C842;
    margin-bottom: clamp(8px, 1.2vw, 14px);
    display: block;
  }
  .pp-banner__heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.9rem, 5vw, 3.4rem);
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: #FFFFFF;
    margin: 0 0 clamp(12px, 2vw, 20px);
  }
  .pp-banner__heading em {
    font-style: italic;
    font-weight: 600;
    color: #F5C842;
  }
  .pp-banner__subtext {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.88rem, 1.3vw, 1.05rem);
    font-weight: 350;
    line-height: 1.68;
    color: rgba(255,255,255,0.80);
    max-width: 560px;
    margin: 0 auto clamp(20px, 3.5vw, 32px);
  }
  .pp-banner__actions {
    display: flex;
    gap: clamp(10px, 2vw, 16px);
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Buttons */
  .pp-btn--primary {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #C4972A;
    color: #1A1A1A;
    font-family: 'Inter', sans-serif;
    font-size: clamp(13px, 1.2vw, 14px);
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
    border-radius: 100px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.25s ease, transform 0.22s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 12px rgba(196,151,42,0.35);
    white-space: nowrap;
  }
  .pp-btn--primary:hover { background: #A07820; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(196,151,42,0.45); }
  .pp-btn--primary:focus-visible { outline: 2px solid #F5C842; outline-offset: 3px; }

  .pp-btn--ghost {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: transparent;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-size: clamp(13px, 1.2vw, 14px);
    font-weight: 500;
    padding: clamp(10px, 1.5vw, 13px) clamp(22px, 3vw, 32px);
    border-radius: 100px;
    border: 1.5px solid rgba(255,255,255,0.55);
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;
    white-space: nowrap;
  }
  .pp-btn--ghost:hover { border-color: #F5C842; background: rgba(245,200,66,0.10); color: #F5C842; }
  .pp-btn--ghost:focus-visible { outline: 2px solid #F5C842; outline-offset: 3px; }

  /* ── Grid section ── */
  .pp-grid-section {
    padding: clamp(52px, 9vw, 96px) clamp(20px, 5vw, 48px);
    max-width: 1280px;
    margin: 0 auto;
  }
  .pp-grid-header {
    text-align: center;
    margin-bottom: clamp(36px, 6vw, 60px);
  }
  .pp-section-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: clamp(9px, 0.9vw, 11px);
    font-weight: 500;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: #C4972A;
    display: block;
    margin-bottom: 12px;
  }
  .pp-section-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.7rem, 3.5vw, 2.6rem);
    line-height: 1.14;
    letter-spacing: -0.02em;
    color: #1A1A1A;
    margin: 0 0 14px;
  }
  .pp-section-heading em { font-style: italic; font-weight: 600; color: #C4972A; }
  .pp-section-desc {
    font-size: clamp(0.88rem, 1.2vw, 1rem);
    font-weight: 380;
    line-height: 1.7;
    color: #7A6A4A;
    max-width: 520px;
    margin: 0 auto;
  }

  /* Grid — 4 → 2 → 1 col */
  .pp-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(14px, 2.2vw, 24px);
    align-items: stretch;
  }
  @media (max-width: 1100px) { .pp-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 600px)  { .pp-grid { grid-template-columns: 1fr; } }
  @media (max-width: 600px)  { .pp-grid-section { padding-left: 16px; padding-right: 16px; } }

  /* ── Card ── */
  .pp-card {
    position: relative;
    background: #FFFBEF;
    border-radius: 20px;
    border: 1px solid rgba(196,151,42,0.14);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.05);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    /* KEY FIX: cards start VISIBLE — animation is additive, not conditional */
    opacity: 1;
    transform: none;
    transition:
      transform 0.38s cubic-bezier(0.25, 1, 0.5, 1),
      box-shadow 0.38s ease,
      border-color 0.38s ease;
  }
  /* Observer adds this class — triggers the lift-in only when in viewport */
  .pp-card.pp-lift-in {
    animation: ppCardIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) both;
  }
  @keyframes ppCardIn {
    from { opacity: 0.4; transform: translateY(20px); }
    to   { opacity: 1;   transform: translateY(0); }
  }
  .pp-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 4px 12px rgba(0,0,0,0.06),
      0 20px 48px rgba(0,0,0,0.08),
      0 0 0 1.5px #C4972A;
    border-color: #C4972A;
  }

  /* Slanted ribbon badge — signature element */
  .pp-card__badge {
    position: absolute;
    top: 20px;
    right: -30px;
    width: 128px;
    background: #C4972A;
    color: #1A1A1A;
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-align: center;
    padding: 5px 0;
    transform: rotate(38deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.14);
    pointer-events: none;
    z-index: 2;
  }
  .pp-card__badge--dark { background: #3D3120; color: #F5C842; }

  /* Featured top strip */
  .pp-card--featured { border-color: rgba(196,151,42,0.35); }
  .pp-card--featured::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #C4972A, transparent);
    z-index: 1;
  }

  /* Icon tile */
  .pp-card__icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #FEF9ED, #FDF6E3);
    border-radius: 16px;
    border: 1px solid rgba(196,151,42,0.22);
    font-size: 28px;
    margin: clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px) 0;
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }
  .pp-card:hover .pp-card__icon-wrap { transform: scale(1.07) rotate(-3deg); }

  .pp-card__body {
    padding: clamp(14px, 2.2vw, 20px) clamp(20px, 3vw, 28px) clamp(20px, 3vw, 28px);
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* Duration pill */
  .pp-card__duration {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #C4972A;
    background: rgba(196,151,42,0.10);
    border: 1px solid rgba(196,151,42,0.20);
    border-radius: 100px;
    padding: 3px 10px;
    margin-bottom: 10px;
    width: fit-content;
  }

  .pp-card__title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(1.1rem, 1.8vw, 1.3rem);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #1A1A1A;
    margin: 0 0 4px;
  }
  .pp-card__tagline {
    font-family: 'Inter', sans-serif;
    font-size: clamp(11px, 0.95vw, 12.5px);
    font-weight: 400;
    font-style: italic;
    color: #C4972A;
    margin: 0 0 10px;
    line-height: 1.4;
  }
  .pp-card__desc {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.82rem, 1vw, 0.88rem);
    font-weight: 380;
    line-height: 1.68;
    color: #7A6A4A;
    margin: 0 0 clamp(14px, 2vw, 18px);
  }
  .pp-card__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(196,151,42,0.22), transparent);
    margin-bottom: clamp(12px, 1.8vw, 16px);
    flex-shrink: 0;
  }

  /* Inclusions list */
  .pp-card__inclusions {
    list-style: none;
    padding: 0;
    margin: 0 0 clamp(18px, 3vw, 22px);
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .pp-card__inclusion {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(11px, 0.9vw, 12.5px);
    font-weight: 420;
    color: #3D3120;
    line-height: 1.4;
  }
  .pp-card__check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, rgba(196,151,42,0.15), rgba(196,151,42,0.08));
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.28);
    flex-shrink: 0;
  }
  .pp-card__check svg {
    width: 9px;
    height: 9px;
    stroke: #C4972A;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .pp-card__footer { margin-top: auto; }

  .pp-card__cta--filled {
    display: block;
    width: 100%;
    padding: clamp(10px, 1.5vw, 12px) 0;
    background: #C4972A;
    color: #1A1A1A;
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 1vw, 13.5px);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-align: center;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.25s ease, transform 0.22s ease, box-shadow 0.25s ease;
    box-shadow: 0 2px 10px rgba(196,151,42,0.28);
  }
  .pp-card__cta--filled:hover { background: #A07820; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(196,151,42,0.38); }
  .pp-card__cta--filled:focus-visible { outline: 2px solid #C4972A; outline-offset: 3px; }

  .pp-card__cta--outline {
    display: block;
    width: 100%;
    padding: clamp(10px, 1.5vw, 12px) 0;
    background: transparent;
    color: #3D3120;
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 1vw, 13.5px);
    font-weight: 550;
    letter-spacing: 0.03em;
    text-align: center;
    border: 1.5px solid rgba(196,151,42,0.22);
    border-radius: 12px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color 0.25s ease, background 0.25s ease;
  }
  .pp-card__cta--outline:hover { border-color: #C4972A; background: rgba(196,151,42,0.07); }
  .pp-card__cta--outline:focus-visible { outline: 2px solid #C4972A; outline-offset: 3px; }

  /* ── Trust strip ── */
  .pp-trust-strip {
    border-top: 1px solid rgba(196,151,42,0.22);
    padding: clamp(28px, 4vw, 44px) clamp(20px, 5vw, 48px);
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(20px, 4vw, 56px);
    flex-wrap: wrap;
  }
  .pp-trust-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 1.1vw, 13.5px);
    font-weight: 480;
    color: #3D3120;
    white-space: nowrap;
  }
  .pp-trust-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #FDF6E3, #FEF9ED);
    border-radius: 50%;
    border: 1px solid rgba(196,151,42,0.22);
    font-size: 16px;
    flex-shrink: 0;
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    .pp-section.pp-anim-ready .pp-banner__eyebrow,
    .pp-section.pp-anim-ready .pp-banner__heading,
    .pp-section.pp-anim-ready .pp-banner__subtext,
    .pp-section.pp-anim-ready .pp-banner__actions {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .pp-card.pp-lift-in { animation: none !important; }
    .pp-card:hover { transform: none !important; }
    .pp-card:hover .pp-card__icon-wrap { transform: none !important; }
    .pp-btn--primary:hover,
    .pp-btn--ghost:hover,
    .pp-card__cta--filled:hover { transform: none !important; }
  }
`;

// ── CheckIcon ─────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <polyline points="2,6.5 4.8,9 10,3" />
    </svg>
  );
}

// ── ClockIcon (inline, tiny) ──────────────────────────────────────────────────
function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

// ── ArrowIcon ─────────────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ── PackageCard ───────────────────────────────────────────────────────────────
function PackageCard({ pkg }) {
  const ctaClass =
    pkg.ctaStyle === "filled" ? "pp-card__cta--filled" : "pp-card__cta--outline";

  const handleCta = () => {
    const el =
      document.getElementById("booking") ||
      document.getElementById("contact") ||
      document.getElementById("contactSection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article
      className={`pp-card${pkg.featured ? " pp-card--featured" : ""}`}
      aria-label={`${pkg.title} — ${pkg.duration} package`}
    >
      {/* Signature: slanted ribbon badge */}
      <div className={`pp-card__badge${pkg.badgeDark ? " pp-card__badge--dark" : ""}`}>
        {pkg.badge}
      </div>

      {/* Icon tile */}
      <div className="pp-card__icon-wrap" aria-hidden="true">
        {pkg.icon}
      </div>

      <div className="pp-card__body">
        {/* Duration pill */}
        <span className="pp-card__duration">
          <ClockIcon />
          {pkg.duration}
        </span>

        <h3 className="pp-card__title">{pkg.title}</h3>
        <p className="pp-card__tagline">{pkg.tagline}</p>
        <p className="pp-card__desc">{pkg.description}</p>

        <div className="pp-card__divider" aria-hidden="true" />

        {/* Inclusions */}
        <ul className="pp-card__inclusions" aria-label={`What's included in ${pkg.title}`}>
          {pkg.inclusions.map((item) => (
            <li key={item} className="pp-card__inclusion">
              <span className="pp-card__check" aria-hidden="true">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="pp-card__footer">
          <button
            type="button"
            className={ctaClass}
            aria-label={`${pkg.cta} — ${pkg.title}`}
            onClick={handleCta}
          >
            {pkg.cta}
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PopularPackages() {
  const sectionRef       = useRef(null);
  const bannerContentRef = useRef(null);
  const cardWrapRefs     = useRef([]);
  const observedSet      = useRef(new Set());

  // ── Banner entrance — opt-in animation ──────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const content = bannerContentRef.current;
    if (!section || !content) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // CSS default (opacity:1) handles static render

    // Mark section so CSS arms the opacity:0 start states
    section.classList.add("pp-anim-ready");

    const els = content.querySelectorAll(
      ".pp-banner__eyebrow, .pp-banner__heading, .pp-banner__subtext, .pp-banner__actions"
    );

    // Tiny delay ensures the hidden state is painted before transition fires
    const timer = setTimeout(() => {
      els.forEach((el) => el.classList.add("pp-visible"));
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  // ── Card lift-in — IntersectionObserver ──────────────────────────────────
  // Cards are VISIBLE by default. The observer adds a CSS animation
  // class when they enter the viewport — purely additive, never hides them.
  const setCardRef = useCallback((node, i) => {
    if (!node || observedSet.current.has(i)) return;
    cardWrapRefs.current[i] = node;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // no animation needed — card already visible

    const card = node.querySelector(".pp-card");
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observedSet.current.add(i);
            // Stagger via animation-delay on the class
            card.style.animationDelay = `${i * 80}ms`;
            card.classList.add("pp-lift-in");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(node);
  }, []);

  const scrollToPackages = () => {
    document
      .querySelector(".pp-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToContact = () => {
    const el =
      document.getElementById("booking") ||
      document.getElementById("contact") ||
      document.getElementById("contactSection");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{CSS}</style>

      <section
        className="pp-section"
        ref={sectionRef}
        id="packages"
        aria-labelledby="pp-main-heading"
      >
        {/* ── Hero banner ── */}
        <div className="pp-banner" aria-label="Popular packages hero banner">
          <img
            className="pp-banner__img"
            src="https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877261/konevi-islam-4399868_1920_jlixwp.jpg"
            alt="Pilgrims gathering near the Kaaba in Makkah during Hajj season"
            loading="lazy"
            decoding="async"
          />
          <div className="pp-banner__overlay" aria-hidden="true" />

          <div className="pp-banner__content" ref={bannerContentRef}>
            <span className="pp-banner__eyebrow">Travel With Confidence</span>

            <h2 className="pp-banner__heading" id="pp-main-heading">
              Our Most Popular{" "}
              <em>Hajj &amp; Umrah</em>
              {" "}Packages
            </h2>

            <p className="pp-banner__subtext">
              Choose from carefully curated pilgrimage experiences designed to
              provide comfort, guidance, and peace of mind throughout your
              sacred journey.
            </p>

            <div className="pp-banner__actions">
              <button
                type="button"
                className="pp-btn--primary"
                onClick={scrollToPackages}
                aria-label="Explore our packages below"
              >
                Explore Packages <ArrowIcon />
              </button>

              <button
                type="button"
                className="pp-btn--ghost"
                onClick={scrollToContact}
                aria-label="Speak with a travel advisor"
              >
                Speak With an Advisor
              </button>
            </div>
          </div>
        </div>

        {/* ── Packages grid ── */}
        <div className="pp-grid-section">
          <header className="pp-grid-header">
            <span className="pp-section-eyebrow">Curated for You</span>
            <h2 className="pp-section-heading">
              Packages Tailored to Your <em>Sacred Journey</em>
            </h2>
            <p className="pp-section-desc">
              Every package is crafted with care — combining reliable logistics,
              spiritual guidance, and the comfort you deserve on every step of
              your pilgrimage.
            </p>
          </header>

          <div
            className="pp-grid"
            role="list"
            aria-label="Available travel packages"
          >
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.id}
                role="listitem"
                ref={(node) => setCardRef(node, i)}
              >
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Trust strip ── */}
        <div
          className="pp-trust-strip"
          role="list"
          aria-label="Agency trust indicators"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item.text} className="pp-trust-item" role="listitem">
              <span className="pp-trust-icon" aria-hidden="true">
                {item.icon}
              </span>
              {item.text}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}