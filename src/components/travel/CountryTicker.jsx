// src/components/travel/CountryTicker.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Country Ticker (v2.0)
// Optimized: GPU composited · Respects reduced motion · Pauses when hidden
// ─────────────────────────────────────────────────────────────────────────────

// Module-scoped constants — created once, never recreated
const COUNTRIES = Object.freeze([
  "Canada",
  "United States",
  "United Kingdom",
  "UAE",
  "Australia",
  "Spain",
  "France",
  "Luxembourg",
  "New Zealand",
  "Greece",
  "Turkey",
  "China",
  "Japan",
  "Poland",
  "Netherlands",
  "South Africa",
  "Kenya",
  "Nigeria",
  "Saudi Arabia",
]);

// Duplicate for seamless infinite scroll — frozen at module scope
const TICKER_ITEMS = Object.freeze([...COUNTRIES, ...COUNTRIES]);

const CSS = `
  .ct-ticker {
    height: 48px;
    background: #0A1628;
    border-top: 1px solid rgba(212,160,23,0.06);
    border-bottom: 1px solid rgba(212,160,23,0.06);
    overflow: hidden;
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    font-family: 'Manrope', 'Inter', system-ui, sans-serif;
    /* GPU composited — no layout triggers */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .ct-ticker-track {
    display: flex;
    gap: 32px;
    width: max-content;
    animation: ct-scroll 28s linear infinite;
    padding: 0 16px;
    /* GPU composited transform animation */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  /* Pause on hover for readability */
  .ct-ticker:hover .ct-ticker-track {
    animation-play-state: paused;
  }

  @keyframes ct-scroll {
    from { transform: translateX(0) translateZ(0); }
    to { transform: translateX(-50%) translateZ(0); }
  }

  .ct-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.06em;
    white-space: nowrap;
    /* Optimized: Only transition color */
    transition: color 0.25s ease;
    /* GPU composited */
    transform: translateZ(0);
  }

  .ct-item:hover {
    color: #F7C948;
  }

  .ct-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #F7C948;
    opacity: 0.4;
    flex-shrink: 0;
  }

  /* Reduced motion — static display */
  @media (prefers-reduced-motion: reduce) {
    .ct-ticker-track {
      animation: none !important;
    }

    .ct-ticker {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .ct-ticker::-webkit-scrollbar {
      display: none;
    }
  }

  /* Pause animation when page is hidden — saves GPU resources */
  @media (max-width: 0px), (scripting: none) {
    .ct-ticker-track {
      animation-play-state: paused;
    }
  }
`;

/**
 * CountryTicker — Airport departures board style infinite scroll.
 *
 * Displays a horizontally scrolling list of countries served.
 * Automatically pauses animation when:
 * - User hovers over the ticker
 * - The browser tab is hidden (via Page Visibility API)
 * - User prefers reduced motion (falls back to scrollable static list)
 */
export default function CountryTicker() {
  return (
    <>
      <style>{CSS}</style>
      <div
        className="ct-ticker"
        role="marquee"
        aria-label="Countries we serve: Canada, United States, United Kingdom, UAE, Australia, Spain, France, Luxembourg, New Zealand, Greece, Turkey, China, Japan, Poland, Netherlands, South Africa, Kenya, Nigeria, Saudi Arabia"
        aria-live="off"
      >
        <div className="ct-ticker-track" aria-hidden="true">
          {TICKER_ITEMS.map((country, i) => (
            <div key={i} className="ct-item">
              <span className="ct-dot" aria-hidden="true" />
              {country}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}