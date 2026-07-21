// src/components/travel/FeaturedDestinations.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Featured Destinations
// Real Country Flags · Compact heights · Crystal Glass Overlay · 360° Rotation
// Auto-slider on mobile · Rasoaf Typography · Premium Luxury Hover
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, ArrowRight, Star, Compass, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DESTINATIONS = [
  { 
    city: "Dubai", 
    country: "UAE", 
    flag: "https://flagcdn.com/w160/ae.png",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop", 
    desc: "Luxury shopping and ultramodern architecture.",
    size: "tall", 
    route: "/travel/tourist-visa",
    rating: "4.9",
    tag: "Most Visited"
  },
  { 
    city: "London", 
    country: "United Kingdom", 
    flag: "https://flagcdn.com/w160/gb.png",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=400&fit=crop", 
    desc: "World-class universities and rich history.",
    size: "wide", 
    route: "/travel/student-visa",
    rating: "4.8",
    tag: "Education Hub"
  },
  { 
    city: "New York", 
    country: "United States", 
    flag: "https://flagcdn.com/w160/us.png",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop", 
    desc: "The city that never sleeps — iconic skyline and culture.",
    size: "normal", 
    route: "/travel/tourist-visa",
    rating: "4.8",
    tag: "Iconic City"
  },
  { 
    city: "Toronto", 
    country: "Canada", 
    flag: "https://flagcdn.com/w160/ca.png",
    image: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784641643/waleedkhalid-canada-7515248_1920_wpwnhg.jpg", 
    desc: "Diverse culture and stunning nature.",
    size: "normal", 
    route: "/travel/work-visa",
    rating: "4.7",
    tag: "Career Gateway"
  },
  { 
    city: "Sydney", 
    country: "Australia", 
    flag: "https://flagcdn.com/w160/au.png",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=600&fit=crop", 
    desc: "Stunning beaches, iconic Opera House, and vibrant culture.",
    size: "normal", 
    route: "/travel/tourist-visa",
    rating: "4.9",
    tag: "Top Destination"
  },
  { 
    city: "Istanbul", 
    country: "Turkey", 
    flag: "https://flagcdn.com/w160/tr.png",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&h=600&fit=crop", 
    desc: "Where East meets West.",
    size: "normal", 
    route: "/travel/tourist-visa",
    rating: "4.8",
    tag: "Cultural Gem"
  },
  { 
    city: "Paris", 
    country: "France", 
    flag: "https://flagcdn.com/w160/fr.png",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=400&fit=crop", 
    desc: "Art, fashion, gastronomy, and timeless romance.",
    size: "wide", 
    route: "/travel/business-visa",
    rating: "4.9",
    tag: "Premium Choice"
  },
];

const RasoafCSS = `
  :root {
    --rasoaf-gold-light: #F7C948;
    --rasoaf-gold-mid: #D4A017;
    --rasoaf-gold-dark: #B8860B;
    --rasoaf-white: #FFFFFF;
    --rasoaf-cream: #FFFDF8;
    --rasoaf-text-muted: rgba(255, 253, 248, 0.6);
    --rasoaf-text-dim: rgba(255, 253, 248, 0.4);
    --rasoaf-display: 'Manrope', system-ui, -apple-system, sans-serif;
    --rasoaf-body: 'Inter', system-ui, -apple-system, sans-serif;
    --transition-smooth: cubic-bezier(.22,1,.36,1);
    --shadow-gold: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,160,23,0.15);
  }

  .rfd-section {
    padding: clamp(50px, 8vh, 80px) clamp(16px, 5vw, 80px);
    background: linear-gradient(175deg, #060D1A 0%, #0A1628 25%, #0D1F3C 50%, #0A1628 75%, #060D1A 100%);
    position: relative;
    overflow: hidden;
  }

  .rfd-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 75% 20%, rgba(212,160,23,0.08) 0%, transparent 45%),
      radial-gradient(ellipse at 25% 70%, rgba(247,201,72,0.06) 0%, transparent 40%);
    pointer-events: none;
  }

  .rfd-container { max-width: 1320px; margin: 0 auto; position: relative; z-index: 2; }

  .rfd-header { text-align: center; margin-bottom: clamp(36px, 5vh, 52px); }

  .rfd-eyebrow {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.65rem, 0.85vw, 0.8rem);
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rasoaf-gold-light);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .rfd-title {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--rasoaf-cream);
    margin: 0 0 12px 0;
  }

  .rfd-title-accent {
    background: linear-gradient(135deg, var(--rasoaf-gold-light) 0%, var(--rasoaf-gold-mid) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .rfd-subtitle {
    font-family: var(--rasoaf-body);
    font-size: clamp(0.85rem, 1vw, 0.95rem);
    font-weight: 400;
    line-height: 1.6;
    color: var(--rasoaf-text-muted);
    max-width: 560px;
    margin: 0 auto;
    letter-spacing: 0.005em;
  }

  /* Grid — reduced row height */
  .rfd-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
    gap: clamp(10px, 1.5vw, 16px);
  }

  .rfd-card {
    position: relative;
    border-radius: 22px;
    overflow: visible;
    cursor: pointer;
    background: #111827;
    border: 1px solid rgba(255,255,255,0.08);
    transition: transform 0.6s var(--transition-smooth), box-shadow 0.6s var(--transition-smooth), border-color 0.6s var(--transition-smooth);
    will-change: transform;
  }

  .rfd-card:hover {
    transform: translateY(-6px);
    border-color: rgba(212,160,23,0.35);
    box-shadow: var(--shadow-gold);
  }

  .rfd-card.wide { grid-column: span 2; }
  .rfd-card.tall { grid-row: span 2; }

  .rfd-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 22px;
    overflow: hidden;
  }

  .rfd-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--transition-smooth), filter 0.4s ease;
    will-change: transform;
    filter: brightness(0.88) saturate(1);
  }

  .rfd-card:hover .rfd-image {
    transform: scale(1.05);
    filter: brightness(1.06) saturate(1.08);
  }

  /* Flag — Desktop: half outside */
  .rfd-flag-wrap {
    position: absolute;
    top: -24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    transition: transform 0.6s var(--transition-smooth);
    will-change: transform;
  }

  .rfd-card:hover .rfd-flag-wrap { transform: translateX(-50%) rotate(360deg) scale(1.08); }

  .rfd-flag {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--rasoaf-white);
    border: 3px solid var(--rasoaf-white);
    box-shadow: 0 3px 18px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,160,23,0.2);
    overflow: hidden;
  }

  .rfd-flag img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Glass overlay */
  .rfd-glass {
    position: absolute; inset: 0; z-index: 2;
    pointer-events: none;
    transform: translateY(100%);
    transition: transform 0.6s var(--transition-smooth);
    border-radius: 22px;
    overflow: hidden;
  }
  .rfd-card:hover .rfd-glass { transform: translateY(0); }

  .rfd-glass-shine {
    position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(ellipse at 30% 15%, rgba(255,255,255,0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.7s var(--transition-smooth);
  }
  .rfd-card:hover .rfd-glass-shine { opacity: 1; }

  .rfd-glass-gloss {
    position: absolute; top: -120%; left: -35%; width: 50%; height: 340%;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.03) 56%, transparent 60%);
    transform: rotate(22deg);
    transition: top 0.8s var(--transition-smooth);
  }
  .rfd-card:hover .rfd-glass-gloss { top: 120%; }

  /* Content */
  .rfd-content {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: clamp(16px, 2vw, 22px);
    z-index: 3;
    transition: transform 0.6s var(--transition-smooth);
  }
  .rfd-card:hover .rfd-content { transform: translateY(-6px); }

  .rfd-location {
    font-family: var(--rasoaf-body);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rasoaf-gold-light);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 6px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--transition-smooth) 0.03s, transform 0.4s var(--transition-smooth) 0.03s;
  }
  .rfd-card:hover .rfd-location { opacity: 1; transform: translateY(0); }

  .rfd-city {
    font-family: var(--rasoaf-display);
    font-weight: 800;
    font-size: clamp(1.15rem, 1.8vw, 22px);
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--rasoaf-cream);
    margin: 0 0 5px 0;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--transition-smooth) 0.06s, transform 0.4s var(--transition-smooth) 0.06s;
  }
  .rfd-card:hover .rfd-city { opacity: 1; transform: translateY(0); }

  .rfd-desc {
    font-family: var(--rasoaf-body);
    font-size: 0.72rem;
    font-weight: 400;
    line-height: 1.4;
    color: var(--rasoaf-text-dim);
    margin: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--transition-smooth) 0.09s, transform 0.4s var(--transition-smooth) 0.09s;
  }
  .rfd-card:hover .rfd-desc { opacity: 1; transform: translateY(0); color: rgba(255,255,255,0.7); }

  .rfd-rating {
    position: absolute; top: 12px; right: 12px;
    padding: 5px 10px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    font-family: var(--rasoaf-body);
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--rasoaf-cream);
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 3px;
    transition: all 0.3s ease;
  }
  .rfd-card:hover .rfd-rating { background: rgba(255,255,255,0.12); border-color: rgba(212,160,23,0.25); }
  .rfd-star { color: var(--rasoaf-gold-light); }

  .rfd-cta {
    position: absolute; bottom: 16px; right: 16px; z-index: 5;
    display: flex; align-items: center; gap: 5px;
    padding: 7px 15px;
    border-radius: 100px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.12);
    color: var(--rasoaf-cream);
    font-family: var(--rasoaf-body);
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s var(--transition-smooth) 0.14s, transform 0.4s var(--transition-smooth) 0.14s;
  }
  .rfd-card:hover .rfd-cta { opacity: 1; transform: translateY(0); }
  .rfd-cta:hover { background: rgba(212,160,23,0.2); border-color: rgba(212,160,23,0.4); box-shadow: 0 0 18px rgba(212,160,23,0.2); }
  .rfd-cta svg { transition: transform 0.3s ease; }
  .rfd-cta:hover svg { transform: translateX(2px); }

  /* Mobile Carousel */
  .rfd-carousel { display: none; position: relative; overflow: hidden; }
  .rfd-carousel-track { display: flex; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
  .rfd-carousel-slide { flex: 0 0 100%; min-width: 0; padding: 30px 6px 6px; box-sizing: border-box; }

  .rfd-carousel-slide .rfd-card {
    height: 340px;
    cursor: pointer;
    overflow: hidden;
  }
  .rfd-carousel-slide .rfd-card:hover { transform: none !important; }

  .rfd-carousel-slide .rfd-flag-wrap { top: 14px; left: 50%; transform: translateX(-50%); }
  .rfd-carousel-slide .rfd-card:hover .rfd-flag-wrap { transform: translateX(-50%) rotate(360deg) scale(1.08); }
  .rfd-carousel-slide .rfd-flag { width: 44px; height: 44px; }

  .rfd-carousel-slide .rfd-glass { transform: translateY(0); }
  .rfd-carousel-slide .rfd-location,
  .rfd-carousel-slide .rfd-city,
  .rfd-carousel-slide .rfd-desc,
  .rfd-carousel-slide .rfd-cta { opacity: 1; transform: translateY(0); }
  .rfd-carousel-slide .rfd-image { transform: scale(1.03); filter: brightness(1.04) saturate(1.06); }

  .rfd-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 16px; }
  .rfd-carousel-btn {
    width: 38px; height: 38px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--rasoaf-cream);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .rfd-carousel-btn:hover { background: rgba(212,160,23,0.2); border-color: rgba(212,160,23,0.4); color: var(--rasoaf-gold-light); }
  .rfd-carousel-dots { display: flex; align-items: center; gap: 7px; }
  .rfd-carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.25); border: none; cursor: pointer; padding: 0; transition: all 0.35s ease; }
  .rfd-carousel-dot-active { width: 20px; background: var(--rasoaf-gold-mid); }

  /* Indicator */
  .rfd-indicator {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-top: clamp(30px, 4vh, 44px);
    padding: 12px 24px;
    background: rgba(212,160,23,0.06);
    border: 1px solid rgba(212,160,23,0.12);
    border-radius: 100px;
    max-width: fit-content;
    margin-left: auto; margin-right: auto;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .rfd-indicator-text {
    font-family: var(--rasoaf-body);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--rasoaf-text-muted);
    letter-spacing: 0.02em;
  }
  .rfd-indicator-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--rasoaf-gold-light);
    animation: rfd-pulse 2s ease-in-out infinite;
  }

  @keyframes rfd-pulse {
    0%, 100% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
  }

  @media (max-width: 1024px) {
    .rfd-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; }
    .rfd-card.wide { grid-column: span 2; }
    .rfd-card.tall { grid-row: span 1; }
  }

  @media (max-width: 768px) {
    .rfd-section { padding: clamp(40px, 6vh, 60px) 20px; }
    .rfd-grid { display: none; }
    .rfd-carousel { display: block; }
    .rfd-title { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
  }

  @media (max-width: 600px) {
    .rfd-section { padding: clamp(32px, 5vh, 48px) 16px; }
    .rfd-carousel-slide .rfd-card { height: 300px; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 12px; }
    .rfd-carousel-slide .rfd-flag { width: 38px; height: 38px; border-width: 2px; }
    .rfd-content { padding: 14px; }
    .rfd-city { font-size: 1.1rem; }
    .rfd-desc { font-size: 0.7rem; }
    .rfd-cta { padding: 6px 12px; font-size: 0.68rem; bottom: 14px; right: 14px; }
  }

  @media (max-width: 400px) {
    .rfd-carousel-slide .rfd-card { height: 270px; }
    .rfd-carousel-slide .rfd-flag-wrap { top: 10px; }
    .rfd-carousel-slide .rfd-flag { width: 34px; height: 34px; }
    .rfd-title { font-size: 1.3rem; }
    .rfd-city { font-size: 1rem; }
    .rfd-content { padding: 12px; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function FeaturedDestinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const timerRef = useRef(null);
  const total = DESTINATIONS.length;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(prev => (prev + 1) % total), 4000);
  }, [total]);

  useEffect(() => { startAutoplay(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startAutoplay]);

  const goTo = useCallback((i) => { setCurrent(((i % total) + total) % total); startAutoplay(); }, [total, startAutoplay]);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff > 50) prev(); else if (diff < -50) next();
    setTouchStart(null);
  };

  const handleNavigate = (route) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(route), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <>
      <style>{RasoafCSS}</style>

      <section className="rfd-section" ref={ref} aria-label="Featured travel destinations">
        <div className="rfd-container">
          <motion.div className="rfd-header" variants={itemVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div className="rfd-eyebrow"><Compass size={12} />Curated Destinations</div>
            <h2 className="rfd-title">Where Dreams <span className="rfd-title-accent">Take Flight</span></h2>
            <p className="rfd-subtitle">Discover extraordinary destinations handpicked by our travel experts. Each location promises unique experiences tailored to your aspirations.</p>
          </motion.div>

          <motion.div className="rfd-grid" variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} role="list">
            {DESTINATIONS.map((destination, idx) => (
              <motion.div key={idx} className={`rfd-card ${destination.size}`} variants={itemVariants} onClick={() => handleNavigate(destination.route)} role="listitem">
                <div className="rfd-card-inner">
                  <img src={destination.image} alt={destination.city} className="rfd-image" loading="lazy" />
                  <div className="rfd-glass"><div className="rfd-glass-shine" /><div className="rfd-glass-gloss" /></div>
                  <div className="rfd-rating"><Star size={10} className="rfd-star" fill="currentColor" />{destination.rating}</div>
                  <div className="rfd-content">
                    <div className="rfd-location"><MapPin size={11} />{destination.country}</div>
                    <h3 className="rfd-city">{destination.city}</h3>
                    <p className="rfd-desc">{destination.desc}</p>
                  </div>
                  <button className="rfd-cta" onClick={(e) => { e.stopPropagation(); handleNavigate(destination.route); }}>Explore<ArrowRight size={13} /></button>
                </div>
                <div className="rfd-flag-wrap"><div className="rfd-flag"><img src={destination.flag} alt={`${destination.country} flag`} loading="lazy" /></div></div>
              </motion.div>
            ))}
          </motion.div>

          <div className="rfd-carousel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="rfd-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {DESTINATIONS.map((destination, idx) => (
                <div key={idx} className="rfd-carousel-slide">
                  <div className="rfd-card" onClick={() => handleNavigate(destination.route)}>
                    <div className="rfd-card-inner">
                      <img src={destination.image} alt={destination.city} className="rfd-image" loading="lazy" />
                      <div className="rfd-glass"><div className="rfd-glass-shine" /><div className="rfd-glass-gloss" /></div>
                      <div className="rfd-rating"><Star size={10} className="rfd-star" fill="currentColor" />{destination.rating}</div>
                      <div className="rfd-content">
                        <div className="rfd-location"><MapPin size={11} />{destination.country}</div>
                        <h3 className="rfd-city">{destination.city}</h3>
                        <p className="rfd-desc">{destination.desc}</p>
                      </div>
                      <button className="rfd-cta" onClick={(e) => { e.stopPropagation(); handleNavigate(destination.route); }}>Explore<ArrowRight size={13} /></button>
                    </div>
                    <div className="rfd-flag-wrap"><div className="rfd-flag"><img src={destination.flag} alt={`${destination.country} flag`} loading="lazy" /></div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rfd-carousel-nav">
              <button className="rfd-carousel-btn" onClick={prev} aria-label="Previous"><ChevronLeft size={16} /></button>
              <div className="rfd-carousel-dots">{DESTINATIONS.map((_, i) => (<button key={i} className={`rfd-carousel-dot${i === current ? " rfd-carousel-dot-active" : ""}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />))}</div>
              <button className="rfd-carousel-btn" onClick={next} aria-label="Next"><ChevronRight size={16} /></button>
            </div>
          </div>

          <motion.div className="rfd-indicator" variants={itemVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <Globe size={14} color="#D4A017" />
            <span className="rfd-indicator-text">Serving travelers across 50+ countries worldwide</span>
            <div className="rfd-indicator-dot" />
          </motion.div>
        </div>
      </section>
    </>
  );
}