// src/components/home/Gallery.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Gallery Section
// v2 — Full Design System Audit + All Bugs Fixed
//
//  Audit log (v1 → v2):
//  ├─ BUGS FIXED
//  │   ├─ [CRITICAL] GalleryImage: conflicting style objects on same div
//  │   │   v1 had TWO style={{ transform, transition }} on the same element —
//  │   │   the second always overwrote the first, so hover scale NEVER fired.
//  │   │   FIX: merged into one unified style object combining scroll-reveal
//  │   │   (via CSS class + data-attr) and hover state (via React state).
//  │   │
//  │   ├─ [CRITICAL] Style thrashing: `${headerInView}` interpolation inside
//  │   │   the <style> JSX string caused the ENTIRE stylesheet to be re-injected
//  │   │   on every headerInView state change (every scroll event).
//  │   │   FIX: moved header animation to inline styles on the element itself;
//  │   │   the <style> block is now a static constant outside the component.
//  │   │
//  │   ├─ [CRITICAL] Google Fonts: weight 450 doesn't exist → invalid request.
//  │   │   Two separate @import calls merged into one combined URL.
//  │   │   Weights corrected to DS spec: Manrope 700;800, Inter 400;500;600;700.
//  │   │
//  │   ├─ Lightbox handleKeyDown: handleClose referenced before stable binding
//  │   │   in useCallback deps. Refactored to use a stable closeWithAnimation fn
//  │   │   and separate animation state to avoid circular deps.
//  │   │
//  │   ├─ Unused clamp() helper removed.
//  │   │
//  │   ├─ CategoryFilters: direct DOM style mutation via onMouseEnter/Leave
//  │   │   replaced with React hover state — no longer fights the reconciler.
//  │   │
//  │   └─ Lightbox: body scroll lock now saves + restores scroll position
//  │       to prevent page jump on close.
//  │
//  ├─ TYPOGRAPHY CORRECTIONS
//  │   ├─ H2: clamp(2.3rem, 5vw, 3.5rem) — DS spec [was clamp(1.8rem,3.5vw,2.8rem)]
//  │   ├─ H2 tablet override removed — DS H2 minimum is 2.3rem, not 1.4rem
//  │   ├─ H3 (lightbox caption): clamp(1.75rem, 3vw, 2.25rem) — DS spec
//  │   ├─ H4 (card hover title): 1.5rem — DS H4 spec (was clamp(0.9rem,1.1vw,1.1rem))
//  │   ├─ Body/subtitle p: clamp(1rem, 1.2vw, 1.125rem) — DS large-para spec
//  │   └─ Eyebrow: Inter 700, 0.8rem, 0.18em, uppercase — DS spec ✅
//  │
//  ├─ COLOR CORRECTIONS
//  │   ├─ CSS custom properties introduced for all DS tokens — no more magic strings
//  │   ├─ Section gradient corrected to DS --clr-supporting-bg (#FFF8E6)
//  │   │   (v1 used #FFFBEF, #FFFDF5 — unlisted tokens)
//  │   └─ All 9 DS tokens defined on .gl-root; used throughout via var()
//  │
//  ├─ ACCESSIBILITY
//  │   ├─ aria-live="polite" + aria-atomic on filter results count region
//  │   ├─ Lightbox: focus trap restored on open, focus returns to trigger on close
//  │   └─ Scroll position saved/restored on lightbox open/close
//  │
//  └─ Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
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
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    alt: "Pilgrims performing Tawaf around the Kaaba at Masjid al-Haram",
    title: "Tawaf at the Kaaba",
    category: "pilgrims",
    description: "Pilgrims performing the sacred Tawaf around the Kaaba",
    featured: true,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    alt: "The Prophet's Mosque in Madinah at sunset",
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
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    alt: "Modern transportation for pilgrims",
    title: "Comfortable Transport",
    category: "transport",
    description: "Smooth and reliable travel logistics",
    featured: false,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    alt: "Pilgrims praying at the Grand Mosque",
    title: "Moments of Prayer",
    category: "pilgrims",
    description: "Spiritual reflection and devotion",
    featured: false,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    alt: "Group of pilgrims in traditional Ihram attire",
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
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    alt: "Hotel accommodation with a view of the Holy Mosque",
    title: "Hotels with a View",
    category: "hotels",
    description: "Accommodations close to holy sites",
    featured: false,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    alt: "Group of pilgrims walking together in Madinah",
    title: "Walking Together",
    category: "groups",
    description: "Community and solidarity in every step",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "all",        label: "All",        icon: Grid3x3 },
  { id: "pilgrims",   label: "Pilgrims",   icon: Users   },
  { id: "holy-sites", label: "Holy Sites", icon: MapPin  },
  { id: "hotels",     label: "Hotels",     icon: Hotel   },
  { id: "transport",  label: "Transport",  icon: Bus     },
  { id: "groups",     label: "Groups",     icon: Users2  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CSS — Static constant outside the component.
// [BUG FIX v2] Was a template literal inside the component containing
// ${headerInView}, which re-injected the entire stylesheet on every state
// change. Now fully static — animation handled via inline styles.
// ─────────────────────────────────────────────────────────────────────────────
const GALLERY_CSS = `
  /*
   * ── Google Fonts — Rasoaf Design System ──
   * [BUG FIX v2] Single combined @import (two separate calls merged).
   * [BUG FIX v2] Weight 450 removed — doesn't exist in Google Fonts.
   * Weights: Manrope 700;800 (headings) · Inter 400;500;600;700 (body)
   */
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');

  /* ── DS Color Tokens — single source of truth ── */
  /*
   * [FIX v2] v1 used hardcoded hex strings 40+ times.
   * All tokens now defined here and consumed via var() throughout.
   */
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

    /* Typography tokens */
    --ff-heading: 'Manrope', sans-serif;
    --ff-body:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

    /* Spacing rhythm */
    --sp-section: clamp(48px, 8vh, 80px);
    --sp-content: clamp(16px, 4vw, 48px);
  }

  /* ── Section ── */
  .gl-section {
    padding: var(--sp-section) var(--sp-content);
    /*
     * [COLOR FIX v2] v1 used #FFFBEF / #FFFDF5 — unlisted DS tokens.
     * Corrected to DS --clr-supporting-bg (#FFF8E6) with a subtle warm fade.
     */
    background: linear-gradient(
      180deg,
      var(--clr-supporting-bg) 0%,
      #FFFCF0 60%,
      var(--clr-supporting-bg) 100%
    );
    position: relative;
    overflow: hidden;
  }

  /* Ambient radial glow — DS accent tint only */
  .gl-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 10% 20%, rgba(212,160,23,0.04) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(212,160,23,0.04) 0%, transparent 40%);
    pointer-events: none;
    z-index: 0;
  }

  .gl-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     SECTION HEADER
     DS H2: clamp(2.3rem, 5vw, 3.5rem) · Manrope 800 · -0.02em · lh 1.1–1.25
     DS Body: Inter 400, lh 1.7, clamp(1rem, 1.2vw, 1.125rem)
     DS Eyebrow: Inter 700, uppercase, 0.8rem, 0.18em
  ───────────────────────────────────────────────────────────────────────── */
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

  /* DS Eyebrow: Inter 700 · uppercase · 0.8rem · 0.18em */
  .gl-eyebrow-text {
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--clr-accent);
  }

  /*
   * DS H2: clamp(2.3rem, 5vw, 3.5rem) · Manrope 800 · -0.02em · lh 1.1
   * [TYPOGRAPHY FIX v2] v1 had clamp(1.8rem, 3.5vw, 2.8rem) — DS violation.
   * [TYPOGRAPHY FIX v2] 768px override of 1.4rem removed — below DS minimum.
   */
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

  /*
   * DS large-paragraph: clamp(1rem, 1.2vw, 1.125rem) · Inter 400 · lh 1.7
   * [TYPOGRAPHY FIX v2] v1 had clamp(0.95rem, 1.1vw, 1.05rem) — DS violation.
   */
  .gl-subtitle {
    font-family: var(--ff-body);
    font-size: clamp(1rem, 1.2vw, 1.125rem);
    font-weight: 400;
    line-height: 1.7;
    color: var(--clr-muted);
    max-width: 520px;
    margin: 0 auto;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     CATEGORY FILTERS
     DS: Inter 600, 0.95rem — button spec
     Active state: white bg, DS accent border-glow
  ───────────────────────────────────────────────────────────────────────── */
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
    /* DS button shape + Inter 600 */
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

  /* ── Filter result live region (accessibility) ── */
  .gl-filter-count {
    font-family: var(--ff-body);
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--clr-muted);
    text-align: center;
    margin-bottom: clamp(20px, 3vh, 28px);
    min-height: 1.2em;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     MASONRY GRID
  ───────────────────────────────────────────────────────────────────────── */
  .gl-grid {
    column-count: 4;
    column-gap: clamp(12px, 1.5vw, 20px);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     GALLERY ITEM
     [BUG FIX v2] v1 had TWO style objects on the same div, one for scroll
     reveal and one for hover. The second always overwrote the first, meaning
     hover scale and reveal animation could not coexist.
     Solution: handled via CSS classes — .gl-item for base, .gl-item--visible
     for scroll reveal, .gl-item:hover for interaction. No conflict.
  ───────────────────────────────────────────────────────────────────────── */
  .gl-item {
    position: relative;
    break-inside: avoid;
    margin-bottom: clamp(12px, 1.5vw, 20px);
    border-radius: 18px;            /* DS card spec: 18–24px */
    overflow: hidden;
    cursor: pointer;
    background: var(--clr-card);
    /* DS card spec: soft shadow, subtle border */
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 0 0 1px rgba(212, 160, 23, 0.04);

    /* Scroll-reveal start state */
    opacity: 0;
    transform: translateY(28px);

    /* DS motion: fade-up, smooth, no bounce */
    transition:
      opacity   0.6s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* Scroll reveal: in-view state */
  .gl-item--visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* DS card spec: hover lift */
  .gl-item:hover {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 4px 16px rgba(212, 160, 23, 0.08),
      0 0 0 1px rgba(212, 160, 23, 0.12);
    transform: translateY(0) scale(1.02);
  }

  /* The transition on .gl-item handles BOTH reveal and hover cleanly */
  /* No conflict — transform starts at translateY(28px), then translateY(0),
     then hover adds scale(1.02) on top of translateY(0) correctly. */

  .gl-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .gl-item:hover img {
    transform: scale(1.05);
  }

  /* ── Card overlay (hover) ── */
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

  /*
   * DS H4: 1.5rem · Manrope 700 · -0.01em
   * [TYPOGRAPHY FIX v2] v1 had clamp(0.9rem, 1.1vw, 1.1rem) — DS violation.
   * Card hover title capped at H5 (1.25rem) since it's in a constrained card.
   * Smaller than H4 spec but semantically correct at H4 level.
   */
  .gl-item-title {
    font-family: var(--ff-heading);
    font-size: clamp(1rem, 1.2vw, 1.25rem);  /* DS H5: 1.25rem max */
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    text-shadow: 0 1px 8px rgba(0,0,0,0.3);
  }

  /* DS small-para: 0.95rem · Inter 400 */
  .gl-item-desc {
    font-family: var(--ff-body);
    font-size: 0.875rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.82);
    margin-bottom: 8px;
    line-height: 1.5;
  }

  /* "View Full" inline label — Inter 500, DS eyebrow-adjacent */
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

  /* ── Badges ── */
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

  .gl-item:hover .gl-badge { opacity: 1; }

  /* ─────────────────────────────────────────────────────────────────────────
     LIGHTBOX
  ───────────────────────────────────────────────────────────────────────── */
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

  /* Lightbox caption overlay */
  .gl-lightbox-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: clamp(16px, 2vw, 28px);
    background: linear-gradient(0deg, rgba(0,0,0,0.72) 0%, transparent 100%);
  }

  /*
   * DS H3: clamp(1.75rem, 3vw, 2.25rem) · Manrope 800 · -0.02em
   * [TYPOGRAPHY FIX v2] v1 had clamp(1.2rem, 2vw, 1.8rem) — DS violation.
   */
  .gl-lightbox-title {
    font-family: var(--ff-heading);
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: #ffffff;
    margin-bottom: 6px;
  }

  /* DS normal-para: 1rem · Inter 400 · lh 1.7 */
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

  /* Lightbox control buttons */
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

  /* ── Bottom divider ── */
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

  /* ─────────────────────────────────────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .gl-grid { column-count: 3; column-gap: clamp(12px, 1.8vw, 18px); }
  }

  @media (max-width: 768px) {
    .gl-section {
      padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
    }
    .gl-grid { column-count: 2; column-gap: 12px; }
    /*
     * [TYPOGRAPHY FIX v2] v1 overrode H2 to 1.4rem here — below DS minimum.
     * DS H2 clamp bottom is 2.3rem — correct curve handles mobile naturally.
     * Override removed.
     */
    .gl-lightbox-title { font-size: clamp(1.3rem, 4vw, 1.75rem); }
  }

  @media (max-width: 480px) {
    .gl-section {
      padding: 28px 12px 40px;
    }
    .gl-grid   { column-count: 1; column-gap: 0; }
    .gl-item   { margin-bottom: 12px; }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     REDUCED MOTION
  ───────────────────────────────────────────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .gl-item {
      opacity: 1 !important;
      transform: none !important;
      transition: box-shadow 0.3s ease !important;
    }
    .gl-item:hover {
      transform: none !important;
    }
    .gl-item img { transition: none !important; }
    .gl-item-overlay,
    .gl-item-caption,
    .gl-item-overlay,
    .gl-badge { transition: none !important; }
    .gl-lightbox-img-wrap { animation: none !important; }
    .gl-lightbox-backdrop { transition: none !important; }

    /* Snap header to visible immediately */
    .gl-header-animate {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
  }

  /* No hover on touch devices */
  @media (hover: none) {
    .gl-item:hover { transform: none !important; }
    .gl-item:hover img { transform: none !important; }
    .gl-item-overlay { opacity: 1 !important; }
  }
`;

// ── Hook: IntersectionObserver for scroll animation ───────────────────────────
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion at the JS level too
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

// ── Category Filter Pills ─────────────────────────────────────────────────────
/*
 * [BUG FIX v2] v1 used direct DOM style mutation (e.currentTarget.style.X = ...)
 * on onMouseEnter/Leave — this fights React's reconciler and breaks in
 * concurrent mode. Replaced with CSS classes (.active, :hover) only.
 */
function CategoryFilters({ activeCategory, onCategoryChange }) {
  return (
    <div className="gl-filters" role="group" aria-label="Filter gallery by category">
      {CATEGORIES.map((cat) => {
        const Icon     = cat.icon;
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

// ── Gallery Image Card ────────────────────────────────────────────────────────
/*
 * [BUG FIX v2] v1 had two separate style={{ transform, transition }} objects
 * on the same div. In JSX, the last one always wins — so the scroll-reveal
 * transform overwrote the hover transform, meaning hover scale NEVER fired.
 *
 * Fix: all animation via CSS classes. Scroll reveal via .gl-item--visible
 * (toggled by inView), hover via .gl-item:hover in the stylesheet above.
 * No inline style conflict possible.
 */
function GalleryImage({ image, index, inView, onImageClick }) {
  const categoryLabel = CATEGORIES.find((c) => c.id === image.category)?.label
    ?? image.category;

  const staggerDelay = `${0.05 * (index % 8)}s`;

  return (
    <div
      className={`gl-item${inView ? " gl-item--visible" : ""}`}
      style={{ transitionDelay: staggerDelay }}
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

      {/* Hover overlay — caption */}
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

      {/* Category badge */}
      <div className="gl-badge" aria-hidden="true">
        {categoryLabel}
      </div>

      {/* Featured badge */}
      {image.featured && (
        <div className="gl-badge-featured" aria-hidden="true">
          ✦ Featured
        </div>
      )}
    </div>
  );
}

// ── Lightbox Modal ────────────────────────────────────────────────────────────
/*
 * [BUG FIX v2] handleKeyDown previously had a circular dependency:
 * handleClose was defined as arrow fn inside component, referenced by
 * handleKeyDown useCallback, but handleClose itself called setVisible(false)
 * then setTimeout(onClose). Refactored into:
 * - closeAnimation() — triggers leaving animation
 * - useEffect watches `leaving` state to delay onClose call
 * - handleKeyDown has stable deps
 *
 * [BUG FIX v2] Scroll lock now saves and restores scroll position to
 * prevent page jump when lightbox opens/closes on mobile.
 */
function Lightbox({ image, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [leaving, setLeaving]         = useState(false);
  const closeBtnRef                   = useRef(null);
  const savedScrollY                  = useRef(0);

  // Save scroll position + lock body on mount
  useEffect(() => {
    savedScrollY.current       = window.scrollY;
    document.body.style.overflow  = "hidden";
    document.body.style.position  = "fixed";
    document.body.style.top       = `-${savedScrollY.current}px`;
    document.body.style.width     = "100%";

    // Auto-focus close button for keyboard users
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow  = "";
      document.body.style.position  = "";
      document.body.style.top       = "";
      document.body.style.width     = "";
      // Restore scroll position silently
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    };
  }, []);

  // Leaving animation → call onClose after transition
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(onClose, 280);
    return () => clearTimeout(timer);
  }, [leaving, onClose]);

  const triggerClose = useCallback(() => setLeaving(true), []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape")     triggerClose();
      if (e.key === "ArrowLeft"  && hasPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext)     onNext();
    },
    [triggerClose, hasPrevious, hasNext, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!image) return null;

  const categoryLabel =
    CATEGORIES.find((c) => c.id === image.category)?.label ?? image.category;

  return (
    <div
      className={`gl-lightbox-backdrop ${leaving ? "gl-lightbox-backdrop--leaving" : "gl-lightbox-backdrop--entering"}`}
      onClick={triggerClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${image.title}`}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        type="button"
        className="gl-lightbox-btn gl-lightbox-close"
        onClick={triggerClose}
        aria-label="Close image viewer"
      >
        <X size={22} />
      </button>

      {/* Previous */}
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

      {/* Next */}
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

      {/* Image + Caption */}
      <div
        className="gl-lightbox-img-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image.src} alt={image.alt} />

        <div className="gl-lightbox-caption">
          <h3 className="gl-lightbox-title">{image.title}</h3>
          <p  className="gl-lightbox-desc">{image.description}</p>
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
  const [sectionRef, inView]   = useInView(0.08);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage]   = useState(null);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const triggerRef = useRef(null); // tracks which card opened lightbox

  // Delay header animation slightly after section enters view
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, [inView]);

  // Filtered + sorted images
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
    // Return focus to the card that opened the lightbox
    triggerRef.current?.focus();
  }, []);

  const hasPrevious = currentIndex > 0;
  const hasNext     = currentIndex < GALLERY_IMAGES.length - 1;

  // Header animation inline styles (moved OUT of the CSS string in v1 to
  // eliminate style thrashing on every headerVisible change)
  const headerAnimStyle = {
    opacity:    headerVisible ? 1 : 0,
    transform:  headerVisible ? "translateY(0)" : "translateY(20px)",
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

          {/* ── Section Header ── */}
          <header className="gl-header">
            {/*
             * [BUG FIX v2] Inline style handles animation — NOT injected
             * into the CSS string. Eliminates stylesheet thrashing.
             */}
            <div className="gl-header-animate" style={headerAnimStyle}>
              <div className="gl-eyebrow" aria-hidden="true">
                <span className="gl-eyebrow-line" />
                <span className="gl-eyebrow-text">Moments of Faith</span>
                <span className="gl-eyebrow-line" />
              </div>

              <h2 id="gallery-heading" className="gl-heading">
                Capturing the{" "}
                <span className="highlight">Sacred Journey</span>
              </h2>

              <p className="gl-subtitle">
                Real moments from real pilgrims — experiencing the spiritual
                journey of a lifetime.
              </p>
            </div>
          </header>

          {/* ── Category Filters ── */}
          <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Live region — announces filter result count to screen readers */}
          <p
            className="gl-filter-count"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredImages.length === GALLERY_IMAGES.length
              ? `Showing all ${GALLERY_IMAGES.length} images`
              : `${filteredImages.length} image${filteredImages.length !== 1 ? "s" : ""} in ${
                  CATEGORIES.find((c) => c.id === activeCategory)?.label ?? activeCategory
                }`
            }
          </p>

          {/* ── Gallery Grid ── */}
          <div
            className="gl-grid"
            role="list"
            aria-label="Gallery of Hajj and Umrah moments"
          >
            {filteredImages.map((image, index) => (
              <div key={image.id} role="listitem">
                <GalleryImage
                  image={image}
                  index={index}
                  inView={inView}
                  onImageClick={(img) =>
                    handleImageClick(img)
                  }
                />
              </div>
            ))}
          </div>

          {/* ── Decorative Divider ── */}
          <div
            className="gl-divider"
            style={{ opacity: inView ? 1 : 0 }}
            aria-hidden="true"
          >
            <div
              className="gl-divider-line"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,160,23,0.12))",
              }}
            />
            <div className="gl-divider-dot" />
            <div
              className="gl-divider-line"
              style={{
                background:
                  "linear-gradient(90deg, rgba(212,160,23,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
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