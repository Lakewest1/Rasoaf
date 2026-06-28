// src/components/home/Gallery.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Gallery Section
// v4 — Uniform image heights across all screen sizes
//
//  Changes in v4:
//  ├─ ALL IMAGES NOW HAVE SAME HEIGHT ON ALL SCREENS
//  │   ├─ Desktop: 280px uniform height (was variable)
//  │   ├─ Tablet: 240px uniform height
//  │   └─ Mobile: 220px uniform height
//  ├─ IMAGES USE object-fit: cover TO MAINTAIN ASPECT RATIO
//  │   └─ Crops from center to fill container
//  └─ All other settings, animations, and features preserved
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Hotel,
  Bus,
  Users2,
  Grid3x3,
  ZoomIn,
} from "lucide-react";

// ── Gallery Data ──────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876161/meca-people_oe25kj.png",
    alt: "Pilgrims performing Tawaf around the Kaaba at Masjid al-Haram",
    title: "Tawaf at the Kaaba",
    category: "pilgrims",
    description: "Pilgrims performing the sacred Tawaf around the Kaaba",
    featured: true,
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782651800/SOAR-FreeTrial-BuildAndSell-Guide_2_oefktk.docx.jpg",
    alt: "The Prophet's Mosque in Madinah at sunrise",
    title: "Masjid an-Nabawi at Sunset",
    category: "holy-sites",
    description: "The radiant Prophet's Mosque in Madinah",
    featured: false,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    alt: "Luxury hotel accommodation in Makkah",
    title: "Premium Hotel Accommodation",
    category: "hotels",
    description: "Comfortable and convenient hotel stays",
    featured: false,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    alt: "Group of pilgrims walking together in Makkah",
    title: "Group Pilgrimage",
    category: "groups",
    description: "Travelers united in faith and community",
    featured: false,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80",
    alt: "The Great Pyramids of Giza with camel riders",
    title: "Historic Cairo Landmarks",
    category: "holy-sites",
    description: "Exploring ancient wonders and sacred sites",
    featured: false,
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877282/jakman1-al-abrar-mecca-15082_1920_x58kgd.jpg",
    alt: "Beautiful view of the Grand Mosque in Makkah",
    title: "Masjid al-Haram",
    category: "holy-sites",
    description: "The sacred heart of the Islamic world",
    featured: true,
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782653783/SOAR-FreeTrial-BuildAndSell-Guide_2_nmnzar.docx.jpg",
    alt: "Modern transportation for pilgrims",
    title: "Comfortable Transport",
    category: "transport",
    description: "Smooth and reliable travel logistics",
    featured: false,
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877246/meca-people_fizgef.jpg",
    alt: "Pilgrims praying at the Grand Mosque",
    title: "Moments of Prayer",
    category: "pilgrims",
    description: "Spiritual reflection and devotion",
    featured: false,
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782597320/worktrhough-for-Engineers_q46mrq.jpg",
    alt: "Family in traditional Ihram attire in Mecca",
    title: "United in Faith",
    category: "groups",
    description: "Diverse pilgrims united in their sacred journey",
    featured: false,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    alt: "Modern Saudi bus transporting pilgrims to Makkah and Madinah",
    title: "Premium Transport Services",
    category: "transport",
    description: "Comfortable and safe group travel across Saudi Arabia",
    featured: false,
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782652550/SOAR-FreeTrial-BuildAndSell-Guide_1_hz5z69.docx.jpg",
    alt: "Hotel accommodation with a view of the Holy Mosque",
    title: "Hotels with a View",
    category: "hotels",
    description: "Accommodations close to holy sites",
    featured: false,
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782597422/Musa_Olalekan_SOC_Detection_CV_v3_1_zgduc1.jpg",
    alt: "Group of pilgrims walking together in Madinah",
    title: "Cooperate Together",
    category: "groups",
    description: "Community and solidarity in every step",
    featured: false,
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781876182/mecapeople2_btukrr.png",
    alt: "Group of pilgrims prayying together in Mekkah",
    title: "Arafat day",
    category: "groups",
    description: "Community and solidarity in every step",
    featured: false,
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1782597276/worktrhough-for-Engineers_aevuhp.jpg",
    alt: " Individual pilgrim in Mekkah",
    title: "Tawaf at the Kaaba",
    category: "pilgrims",
    description: "Community and solidarity in every step",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "All", icon: Grid3x3 },
  { id: "pilgrims", label: "Pilgrims", icon: Users },
  { id: "holy-sites", label: "Holy Sites", icon: MapPin },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "transport", label: "Transport", icon: Bus },
  { id: "groups", label: "Groups", icon: Users2 },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS — Static constant
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

  .gl-root {
    --clr-primary-bg:    #F7C948;
    --clr-primary-text:  #111111;
    --clr-supporting-bg: #FFF8E6;
    --clr-card:          #FFFFFF;
    --clr-accent:        #D4A017;
    --clr-accent-2:      #B8860B;
    --clr-border:        #E6D5A8;
    --clr-muted:         #5F5F5F;
    --clr-hover-bg:      #FFE082;
    --ff-heading: 'Manrope', sans-serif;
    --ff-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --sp-section: clamp(48px, 8vh, 80px);
    --sp-content: clamp(16px, 4vw, 48px);
    --gl-img-height: 280px;
    --gl-img-height-tablet: 240px;
    --gl-img-height-mobile: 220px;
  }

  .gl-section {
    padding: var(--sp-section) var(--sp-content);
    background: #ffffff;
    position: relative;
    overflow: hidden;
  }

  .gl-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── Section Header ── */
  .gl-header {
    text-align: center;
    margin-bottom: clamp(32px, 5vh, 48px);
  }

  .gl-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
  }

  .gl-eyebrow-line {
    width: clamp(24px, 3vw, 40px);
    height: 1.5px;
    background: var(--clr-accent);
    border-radius: 999px;
    display: block;
  }

  .gl-eyebrow-text {
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--clr-accent);
  }

  .gl-heading {
    font-family: var(--ff-heading);
    font-weight: 800;
    font-size: clamp(2.3rem, 5vw, 3.5rem);
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: var(--clr-primary-text);
    margin-bottom: 14px;
  }

  .gl-heading .highlight {
    color: var(--clr-accent);
    position: relative;
    display: inline-block;
  }

  .gl-heading .highlight::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 2.5px;
    background: linear-gradient(90deg, var(--clr-accent), rgba(212,160,23,0.2));
    border-radius: 3px;
  }

  .gl-subtitle {
    font-family: var(--ff-body);
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--clr-muted);
    max-width: 520px;
    margin: 0 auto;
  }

  /* ── Category Filters ── */
  .gl-filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(6px, 1vw, 12px);
    margin-bottom: clamp(28px, 4vh, 40px);
  }

  .gl-filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--ff-body);
    font-size: clamp(0.75rem, 0.85vw, 0.875rem);
    font-weight: 500;
    color: var(--clr-muted);
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 50px;
    padding: clamp(7px, 0.8vw, 11px) clamp(14px, 1.5vw, 20px);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    white-space: nowrap;
    letter-spacing: 0.005em;
  }

  .gl-filter-btn:hover {
    background: rgba(212, 160, 23, 0.06);
    border-color: rgba(212, 160, 23, 0.18);
    color: var(--clr-primary-text);
  }

  .gl-filter-btn.active {
    font-weight: 600;
    color: var(--clr-primary-text);
    background: var(--clr-card);
    border-color: rgba(212, 160, 23, 0.30);
    box-shadow: 0 2px 14px rgba(212, 160, 23, 0.12);
  }

  .gl-filter-btn:focus-visible {
    outline: 2.5px solid var(--clr-accent);
    outline-offset: 3px;
  }

  .gl-filter-count {
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--clr-muted);
    text-align: center;
    margin-bottom: clamp(20px, 3vh, 28px);
    min-height: 1.2em;
  }

  /* ── Masonry Grid ── */
  .gl-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(12px, 1.5vw, 20px);
  }

  /* ── Gallery Item ── */
  .gl-item {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: var(--clr-card);
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 0 0 1px rgba(212, 160, 23, 0.04);
    opacity: 0;
    transform: translateY(28px);
    transition:
      opacity   0.6s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    height: var(--gl-img-height);
  }

  .gl-item--visible {
    opacity: 1;
    transform: translateY(0);
  }

  .gl-item:hover {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 4px 16px rgba(212, 160, 23, 0.08),
      0 0 0 1px rgba(212, 160, 23, 0.12);
    transform: translateY(0) scale(1.02);
  }

  .gl-item img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .gl-item:hover img {
    transform: scale(1.05);
  }

  .gl-item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.60) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(14px, 1.8vw, 22px);
  }

  .gl-item:hover .gl-item-overlay { opacity: 1; }

  .gl-item-caption {
    transform: translateY(10px);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .gl-item:hover .gl-item-caption { transform: translateY(0); }

  .gl-item-title {
    font-family: var(--ff-heading);
    font-size: clamp(1rem, 1.2vw, 1.25rem);
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    text-shadow: 0 1px 8px rgba(0,0,0,0.3);
  }

  .gl-item-desc {
    font-family: var(--ff-body);
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .gl-item-cta {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--ff-body);
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(212, 160, 23, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .gl-badge {
    position: absolute;
    top: clamp(10px, 1.2vw, 16px);
    right: clamp(10px, 1.2vw, 16px);
    font-family: var(--ff-body);
    font-size: clamp(8px, 0.6vw, 10px);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #ffffff;
    background: rgba(212, 160, 23, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 3px 12px;
    border-radius: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    transition: opacity 0.3s ease;
  }

  .gl-badge-featured {
    position: absolute;
    top: clamp(10px, 1.2vw, 16px);
    left: clamp(10px, 1.2vw, 16px);
    font-family: var(--ff-body);
    font-size: clamp(8px, 0.6vw, 10px);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--clr-accent);
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 3px 12px;
    border-radius: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  /* ── Carousel ── */
  .gl-carousel {
    position: relative;
    overflow: hidden;
    width: 100%;
    display: none;
  }

  .gl-carousel-nav {
    transition: all 0.3s ease;
  }
  .gl-carousel-nav:active {
    transform: translateY(-50%) scale(0.95) !important;
  }

  /* ── Lightbox ── */
  .gl-lightbox-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(20px, 4vw, 60px);
    transition: opacity 0.3s ease;
  }

  .gl-lightbox-backdrop--entering { opacity: 1; }
  .gl-lightbox-backdrop--leaving  { opacity: 0; }

  .gl-lightbox-img-wrap {
    max-width: 90vw;
    max-height: 82vh;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    position: relative;
    animation: glLightboxScale 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  }

  @keyframes glLightboxScale {
    from { transform: scale(0.94); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }

  .gl-lightbox-img-wrap img {
    max-width: 100%;
    max-height: 82vh;
    object-fit: contain;
    display: block;
  }

  .gl-lightbox-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: clamp(16px, 2vw, 28px);
    background: linear-gradient(0deg, rgba(0,0,0,0.72) 0%, transparent 100%);
  }

  .gl-lightbox-title {
    font-family: var(--ff-heading);
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #ffffff;
    margin-bottom: 6px;
  }

  .gl-lightbox-desc {
    font-family: var(--ff-body);
    font-size: clamp(0.9rem, 1vw, 1rem);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.80);
    line-height: 1.7;
  }

  .gl-lightbox-cat {
    display: inline-flex;
    align-items: center;
    margin-top: 10px;
    font-family: var(--ff-body);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--clr-accent);
    background: rgba(212, 160, 23, 0.15);
    padding: 4px 14px;
    border-radius: 50px;
  }

  .gl-lightbox-btn {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 10;
    padding: 0;
  }

  .gl-lightbox-btn:hover {
    background: rgba(212, 160, 23, 0.20);
    border-color: rgba(212, 160, 23, 0.40);
    transform: scale(1.06);
  }

  .gl-lightbox-btn:focus-visible {
    outline: 2.5px solid var(--clr-accent);
    outline-offset: 3px;
  }

  .gl-lightbox-close {
    top: clamp(16px, 2vw, 32px);
    right: clamp(16px, 2vw, 32px);
  }

  .gl-lightbox-prev {
    left: clamp(12px, 2vw, 28px);
    top: 50%;
    transform: translateY(-50%);
  }

  .gl-lightbox-prev:hover { transform: translateY(-50%) scale(1.06); }

  .gl-lightbox-next {
    right: clamp(12px, 2vw, 28px);
    top: 50%;
    transform: translateY(-50%);
  }

  .gl-lightbox-next:hover { transform: translateY(-50%) scale(1.06); }

  .gl-divider {
    margin-top: clamp(40px, 6vh, 56px);
    display: flex;
    align-items: center;
    gap: clamp(12px, 2vw, 20px);
    transition: opacity 0.8s ease 0.8s;
  }

  .gl-divider-line {
    flex: 1;
    height: 1px;
  }

  .gl-divider-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--clr-accent);
    opacity: 0.4;
    flex-shrink: 0;
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .gl-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(12px, 1.8vw, 18px);
    }
    .gl-item {
      height: var(--gl-img-height-tablet);
    }
  }

  @media (max-width: 768px) {
    .gl-section {
      padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
    }
    .gl-grid { display: none; }
    .gl-carousel { display: block !important; }
    .gl-item {
      height: var(--gl-img-height-mobile);
    }
    .gl-lightbox-title { font-size: clamp(1.3rem, 4vw, 1.75rem); }
  }

  @media (min-width: 769px) {
    .gl-carousel { display: none !important; }
  }

  @media (max-width: 480px) {
    .gl-section {
      padding: 28px 12px 40px;
    }
    .gl-carousel-nav {
      width: 32px !important;
      height: 32px !important;
    }
    .gl-carousel-nav svg {
      width: 16px !important;
      height: 16px !important;
    }
  }

  /* ── Reduced Motion ── */
  @media (prefers-reduced-motion: reduce) {
    .gl-item {
      opacity: 1 !important;
      transform: none !important;
      transition: box-shadow 0.3s ease !important;
    }
    .gl-item:hover { transform: none !important; }
    .gl-item img { transition: none !important; }
    .gl-item-overlay,
    .gl-item-caption,
    .gl-item-overlay,
    .gl-badge { transition: none !important; }
    .gl-lightbox-img-wrap { animation: none !important; }
    .gl-lightbox-backdrop { transition: none !important; }
    .gl-carousel > div:first-child { transition: none !important; }

    .gl-header-animate {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }

  @media (hover: none) {
    .gl-item:hover { transform: none !important; }
    .gl-item:hover img { transform: none !important; }
    .gl-item-overlay { opacity: 1 !important; }
  }
`;

// ── Hook: IntersectionObserver ───────────────────────────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Category Filter ──────────────────────────────────────────────────────────
function CategoryFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="gl-filters" role="group" aria-label="Filter gallery by category">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`gl-filter-btn${isActive ? " active" : ""}`}
            onClick={() => onCategoryChange(cat.id)}
            aria-pressed={isActive}
          >
            <Icon size={14} aria-hidden="true" />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Gallery Image Card ──────────────────────────────────────────────────────
function GalleryImage({ image, index, inView, onImageClick, isCarousel = false }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === image.category)?.label ?? image.category;
  const staggerDelay = `${0.05 * (index % 8)}s`;

  return (
    <div
      className={`gl-item${inView ? " gl-item--visible" : ""}`}
      style={{
        transitionDelay: isCarousel ? "0s" : staggerDelay,
        opacity: isCarousel ? 1 : undefined,
        transform: isCarousel ? "none" : undefined,
      }}
      role="button"
      tabIndex={0}
      aria-label={`View full image: ${image.title}`}
      onClick={() => onImageClick(image)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onImageClick(image);
        }
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />

      <div className="gl-item-overlay" aria-hidden="true">
        <div className="gl-item-caption">
          <h4 className="gl-item-title">{image.title}</h4>
          <p className="gl-item-desc">{image.description}</p>
          <div className="gl-item-cta">
            <ZoomIn size={13} aria-hidden="true" />
            <span>View Full</span>
          </div>
        </div>
      </div>

      <div className="gl-badge" aria-hidden="true">
        {categoryLabel}
      </div>

      {image.featured && (
        <div className="gl-badge-featured" aria-hidden="true">
          ✦ Featured
        </div>
      )}
    </div>
  );
}

// ── Carousel for Mobile ──────────────────────────────────────────────────────
function GalleryCarousel({ images, inView, onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const totalSlides = images.length;

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    let newIndex = index;
    
    if (index < 0) newIndex = totalSlides - 1;
    if (index >= totalSlides) newIndex = 0;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, totalSlides]);

  const goToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalSlides) {
      goToSlide(0);
    } else {
      goToSlide(nextIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      goToSlide(totalSlides - 1);
    } else {
      goToSlide(prevIndex);
    }
  }, [currentIndex, goToSlide, totalSlides]);

  // Auto-play - RTL (right to left)
  useEffect(() => {
    if (isPaused || !inView) return;

    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPaused, inView, goToNext]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const translateX = -(currentIndex * (100 / totalSlides));

  return (
    <div
      className="gl-carousel"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        padding: "0 4px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          display: "flex",
          transition: isTransitioning ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          transform: `translateX(${translateX}%)`,
          width: `${totalSlides * 100}%`,
          willChange: "transform",
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            style={{
              width: `${100 / totalSlides}%`,
              padding: "0 8px",
              flexShrink: 0,
              boxSizing: "border-box",
            }}
          >
            <GalleryImage
              image={image}
              index={index}
              inView={inView}
              onImageClick={onImageClick}
              isCarousel={true}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="gl-carousel-nav gl-carousel-nav--prev"
        aria-label="Previous image"
        style={{
          position: "absolute",
          left: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={goToNext}
        className="gl-carousel-nav gl-carousel-nav--next"
        aria-label="Next image"
        style={{
          position: "absolute",
          right: "4px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#ffffff",
          border: "1px solid rgba(212,160,23,0.15)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#D4A017",
          transition: "all 0.3s ease",
          zIndex: 5,
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#D4A017";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#ffffff";
          e.currentTarget.style.color = "#D4A017";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "16px",
          paddingBottom: "4px",
          flexWrap: "wrap",
        }}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: index === currentIndex ? "#D4A017" : "rgba(212,160,23,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Lightbox Modal ──────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [leaving, setLeaving] = useState(false);
  const closeBtnRef = useRef(null);
  const savedScrollY = useRef(0);

  useEffect(() => {
    savedScrollY.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.width = "100%";

    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(onClose, 280);
    return () => clearTimeout(timer);
  }, [leaving, onClose]);

  const triggerClose = useCallback(() => setLeaving(true), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") triggerClose();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [triggerClose, hasPrevious, hasNext, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!image) return null;

  const categoryLabel = CATEGORIES.find((c) => c.id === image.category)?.label ?? image.category;

  return (
    <div
      className={`gl-lightbox-backdrop ${leaving ? "gl-lightbox-backdrop--leaving" : "gl-lightbox-backdrop--entering"}`}
      onClick={triggerClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${image.title}`}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="gl-lightbox-btn gl-lightbox-close"
        onClick={triggerClose}
        aria-label="Close image viewer"
      >
        <X size={22} />
      </button>

      {hasPrevious && (
        <button
          type="button"
          className="gl-lightbox-btn gl-lightbox-prev"
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          className="gl-lightbox-btn gl-lightbox-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div className="gl-lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} />

        <div className="gl-lightbox-caption">
          <h3 className="gl-lightbox-title">{image.title}</h3>
          <p className="gl-lightbox-desc">{image.description}</p>
          <span className="gl-lightbox-cat">{categoryLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, [inView]);

  const filteredImages = useMemo(() => {
    const base = activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

    return [...base].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeCategory]);

  const handleImageClick = useCallback((image, e) => {
    triggerRef.current = e?.currentTarget ?? null;
    const index = GALLERY_IMAGES.findIndex((img) => img.id === image.id);
    setCurrentIndex(index);
    setSelectedImage(image);
  }, []);

  const handlePrevious = useCallback(() => {
    const next = currentIndex > 0 ? currentIndex - 1 : GALLERY_IMAGES.length - 1;
    setCurrentIndex(next);
    setSelectedImage(GALLERY_IMAGES[next]);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    const next = currentIndex < GALLERY_IMAGES.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(next);
    setSelectedImage(GALLERY_IMAGES[next]);
  }, [currentIndex]);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
    triggerRef.current?.focus();
  }, []);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < GALLERY_IMAGES.length - 1;

  const headerAnimStyle = {
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  return (
    <>
      <style>{GALLERY_CSS}</style>

      <section
        ref={sectionRef}
        className="gl-root gl-section"
        aria-labelledby="gallery-heading"
        id="gallery"
      >
        <div className="gl-container">
          {/* Section Header */}
          <header className="gl-header">
            <div className="gl-header-animate" style={headerAnimStyle}>
              <div className="gl-eyebrow" aria-hidden="true">
                <span className="gl-eyebrow-line" />
                <span className="gl-eyebrow-text">Moments of Faith</span>
                <span className="gl-eyebrow-line" />
              </div>

              <h2 id="gallery-heading" className="gl-heading">
                Capturing the <span className="highlight">Sacred Journey</span>
              </h2>

              <p className="gl-subtitle">
                Real moments from real pilgrims — experiencing the spiritual
                journey of a lifetime.
              </p>
            </div>
          </header>

          {/* Category Filters */}
          <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <p className="gl-filter-count" aria-live="polite" aria-atomic="true">
            {filteredImages.length === GALLERY_IMAGES.length
              ? `Showing all ${GALLERY_IMAGES.length} images`
              : `${filteredImages.length} image${filteredImages.length !== 1 ? "s" : ""} in ${
                  CATEGORIES.find((c) => c.id === activeCategory)?.label ?? activeCategory
                }`
            }
          </p>

          {/* Desktop Grid - Uniform Height */}
          <div className="gl-grid" role="list" aria-label="Gallery of Hajj and Umrah moments">
            {filteredImages.map((image, index) => (
              <div key={image.id} role="listitem">
                <GalleryImage
                  image={image}
                  index={index}
                  inView={inView}
                  onImageClick={(img) => handleImageClick(img)}
                  isCarousel={false}
                />
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <GalleryCarousel
            images={filteredImages}
            inView={inView}
            onImageClick={(img) => handleImageClick(img)}
          />

          {/* Decorative Divider */}
          <div className="gl-divider" style={{ opacity: inView ? 1 : 0 }} aria-hidden="true">
            <div
              className="gl-divider-line"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.12))" }}
            />
            <div className="gl-divider-dot" />
            <div
              className="gl-divider-line"
              style={{ background: "linear-gradient(90deg, rgba(212,160,23,0.12), transparent)" }}
            />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleCloseLightbox}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
    </>
  );
}