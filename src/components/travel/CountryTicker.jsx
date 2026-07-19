// src/components/travel/CountryTicker.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Country Ticker
// Airport departures board style · 48px height
// ─────────────────────────────────────────────────────────────────────────────

const countries = [
  "Canada", "United States", "United Kingdom", "UAE", "Australia",
  "Spain", "France", "Luxembourg", "New Zealand", "Greece",
  "Turkey", "China", "Japan", "Poland", "Netherlands",
  "South Africa", "Kenya", "Nigeria", "Saudi Arabia",
];

const duplicated = [...countries, ...countries];

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
  }
  .ct-ticker-track {
    display: flex;
    gap: 32px;
    width: max-content;
    animation: ct-scroll 28s linear infinite;
    padding: 0 16px;
  }
  .ct-ticker:hover .ct-ticker-track { animation-play-state: paused; }
  @keyframes ct-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
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
    transition: color 0.3s ease;
  }
  .ct-item:hover { color: #F7C948; }
  .ct-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #F7C948; opacity: 0.4;
    flex-shrink: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .ct-ticker-track { animation: none; }
  }
`;

export default function CountryTicker() {
  return (
    <>
      <style>{CSS}</style>
      <div className="ct-ticker" aria-label="Countries we serve">
        <div className="ct-ticker-track">
          {duplicated.map((country, i) => (
            <div key={i} className="ct-item">
              <span className="ct-dot" />
              {country}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}