// components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Ultra-Premium Navbar
// 3D Book Now button · GSAP entrance · mouse-tilt · dropdown menus
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Mobile Optimized: Heavy animations removed on smaller screens
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Rasaof from "../Rasaof-logo.jsx";
import {
  Menu, X, Phone, Mail, Globe, Sparkles,
  ChevronDown, Plane, Users, Building2, GraduationCap, Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// NAV LINKS & SUB-MENUS
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  "Home",
  "Services",
  "Hajj & Umrah",
  "Visa Services",
  "Contact",
];

const SUB_MENUS = {
  Services: [
    { label: "Hajj Packages",    icon: Star      },
    { label: "Umrah Packages",   icon: Star      },
    { label: "Flight Booking",   icon: Plane     },
    { label: "Hotel Reservation",icon: Building2 },
  ],
  "Hajj & Umrah": [
    { label: "Hajj Packages",  icon: Globe    },
    { label: "Umrah Packages", icon: Globe    },
    { label: "Group Travel",   icon: Users    },
    { label: "VIP Packages",   icon: Sparkles },
  ],
  "Visa Services": [
    { label: "Student Visa",  icon: GraduationCap },
    { label: "Work Visa",     icon: Building2     },
    { label: "Tourist Visa",  icon: Plane         },
    { label: "Business Visa", icon: Globe         },
    { label: "Family Visa",   icon: Users         },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// CSS — Updated with Rasoaf Design System + Mobile Optimizations
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  /* ── Rasoaf Design System Typography ── */
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&display=swap');

  /* ── WRAPPER ── */
  .rasoaf-navbar-wrapper {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1001;
    perspective: 1400px;
  }

  .rasoaf-navbar-inner {
    transform-style: preserve-3d;
    transition: background 0.4s ease, box-shadow 0.4s ease,
                border-radius 0.4s ease;
    will-change: transform;
  }

  /* bottom glow line on transparent state */
  .rasoaf-navbar-inner.glow-active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 6%; right: 6%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,215,0,0.25) 30%,
      rgba(255,215,0,0.5) 50%,
      rgba(255,215,0,0.25) 70%,
      transparent
    );
    pointer-events: none;
  }

  /* ── DESKTOP NAV LINK ── */
  .rasoaf-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 10px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    transform-style: preserve-3d;
    transition: color 0.3s ease, background 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .rasoaf-link .link-bar {
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, #D4A017, transparent);
    transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }
  .rasoaf-link:hover .link-bar,
  .rasoaf-link[data-active="true"] .link-bar {
    width: calc(100% - 16px);
  }

  /* transparent (hero) */
  .navbar-transparent .rasoaf-link         { color: rgba(255,255,255,0.85); }
  .navbar-transparent .rasoaf-link:hover,
  .navbar-transparent .rasoaf-link[data-active="true"] { color: #D4A017; font-weight: 600; }

  /* scrolled (glass) */
  .navbar-scrolled .rasoaf-link            { color: rgba(17,17,17,0.72); }
  .navbar-scrolled .rasoaf-link:hover,
  .navbar-scrolled .rasoaf-link[data-active="true"]   { color: #B8860B; font-weight: 600; }

  /* mobile navbar always dark */
  .navbar-mobile .rasoaf-link              { color: rgba(255,255,255,0.85); }

  @media (max-width: 1100px) { .rasoaf-link { font-size: 0.9rem; } }
  @media (max-width:  960px) { .rasoaf-link { font-size: 0.85rem; } }

  /* ── CHEVRON ── */
  .rasoaf-chev {
    display: flex; align-items: center;
    transition: transform 0.3s ease;
    color: rgba(212,160,23,0.6);
  }
  .rasoaf-link.open .rasoaf-chev { transform: rotate(180deg); }

  /* ── 3D DROPDOWN ── */
  .rasoaf-dropdown-3d {
    position: absolute;
    top: calc(100% + 14px);
    left: 50%;
    transform: translateX(-50%) rotateX(-12deg) translateY(-8px);
    transform-origin: top center;
    transform-style: preserve-3d;
    min-width: 220px;
    background: rgba(255,255,255,0.99);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 18px;
    padding: 8px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.18),
                0 0 0 1px rgba(212,160,23,0.12);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s cubic-bezier(0.22,1,0.36,1),
                transform 0.3s cubic-bezier(0.22,1,0.36,1),
                visibility 0.3s;
  }
  .rasoaf-dropdown-3d.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) rotateX(0deg) translateY(0);
  }
  .rasoaf-dropdown-3d::before {
    content: '';
    position: absolute;
    top: -6px; left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px; height: 12px;
    background: #fff;
    border-radius: 2px;
    box-shadow: -2px -2px 6px rgba(0,0,0,0.04);
  }

  .rasoaf-dropdown-item-3d {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 14px;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(17,17,17,0.72);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
  }
  .rasoaf-dropdown-item-3d:hover {
    background: rgba(215,169,23,0.09);
    color: #111;
    transform: translateX(4px);
  }
  .rasoaf-dropdown-item-3d .di-icon-wrap {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: rgba(215,169,23,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s ease;
  }
  .rasoaf-dropdown-item-3d:hover .di-icon-wrap {
    background: rgba(215,169,23,0.25);
  }
  .rasoaf-dropdown-item-3d .di-arrow {
    margin-left: auto;
    opacity: 0.25;
    font-size: 14px;
    transition: all 0.25s ease;
  }
  .rasoaf-dropdown-item-3d:hover .di-arrow {
    opacity: 1;
    color: #D4A017;
    transform: translateX(4px);
  }

  /* ── INQUIRY BUTTON (outline) ── */
  .rasoaf-inquiry {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    background: transparent;
    border-radius: 100px;
    padding: 9px 22px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }
  .navbar-transparent .rasoaf-inquiry {
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
  }
  .navbar-transparent .rasoaf-inquiry:hover {
    border-color: #D4A017;
    color: #D4A017;
    background: rgba(215,169,23,0.08);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(215,169,23,0.15);
  }
  .navbar-scrolled .rasoaf-inquiry {
    color: #111;
    border: 1px solid rgba(17,17,17,0.22);
  }
  .navbar-scrolled .rasoaf-inquiry:hover {
    border-color: #B8860B;
    color: #B8860B;
    background: rgba(215,169,23,0.08);
    transform: translateY(-2px);
  }
  .navbar-mobile .rasoaf-inquiry {
    color: #fff;
    border: 1px solid rgba(255,255,255,0.3);
  }

  /* ═══════════════════════════════════════════════
     3-D  BOOK NOW  BUTTON
     Physical depth via layered box-shadows
  ═══════════════════════════════════════════════ */
  .rasoaf-book-wrap {
    perspective: 600px;
    display: inline-flex;
  }

  .rasoaf-book {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #111;
    border: none;
    border-radius: 100px;
    padding: 10px 28px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transform-style: preserve-3d;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    /* Face gradient — Primary Accent */
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #B8860B 100%);

    /* 3-D depth stack */
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.65),
      0 4px 0   #A07000,
      0 7px 0   #6A4500,
      0 9px 0   rgba(0,0,0,0.40),
      0 9px 22px rgba(215,169,23,0.30);

    transition:
      transform  0.18s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.18s ease;

    /* Idle glow pulse */
    animation: bookGlow 3s ease-in-out infinite;
  }

  @keyframes bookGlow {
    0%, 100% {
      box-shadow:
        0 0 0 1px rgba(215,169,23,0.65),
        0 4px 0 #A07000,
        0 7px 0 #6A4500,
        0 9px 0 rgba(0,0,0,0.40),
        0 9px 22px rgba(215,169,23,0.30);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(215,169,23,0.9),
        0 4px 0 #A07000,
        0 7px 0 #6A4500,
        0 9px 0 rgba(0,0,0,0.40),
        0 9px 34px rgba(215,169,23,0.55),
        0 0  42px rgba(215,169,23,0.18);
    }
  }

  /* Top-face highlight bevel */
  .rasoaf-book::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 100px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }

  /* Shine sweep */
  .rasoaf-book .book-shine {
    position: absolute;
    top: 0; left: -115%;
    width: 75%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 100px;
    animation: bookShine 2.8s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes bookShine {
    0%   { left: -115%; }
    55%  { left: 120%;  }
    100% { left: 120%;  }
  }

  /* Hover — lift up, deepen shadow */
  .rasoaf-book:hover:not(:active) {
    animation: none;
    transform: translateY(-4px) rotateX(-5deg);
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.8),
      0 8px 0  #A07000,
      0 12px 0 #6A4500,
      0 14px 0 rgba(0,0,0,0.40),
      0 14px 36px rgba(215,169,23,0.50);
  }

  /* Press — snap down */
  .rasoaf-book:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.55),
      0 1px 0 #A07000,
      0 2px 0 #6A4500,
      0 3px 0 rgba(0,0,0,0.35),
      0 3px 14px rgba(215,169,23,0.20);
  }

  .rasoaf-book .book-text { position: relative; z-index: 1; }
  .rasoaf-book .book-icon {
    display: inline-block;
    margin-left: 6px;
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .rasoaf-book:hover .book-icon {
    transform: translateX(4px) rotate(-35deg);
  }

  /* ── MOBILE — hamburger ── */
  .rasoaf-mob {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    background: rgba(215,169,23,0.10);
    border: 1px solid rgba(215,169,23,0.30);
    border-radius: 12px;
    cursor: pointer;
    color: #D4A017;
    flex-shrink: 0;
    z-index: 1002;
    transition: background 0.3s ease;
  }
  .rasoaf-mob:hover { background: rgba(215,169,23,0.20); }

  /* ── OVERLAY ── */
  .rasoaf-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 999;
    pointer-events: auto;
  }

  /* ── MOBILE DRAWER ── */
  .rasoaf-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(88vw, 360px);
    z-index: 10000; /* Increased z-index to stay above navbar */
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background: linear-gradient(160deg, rgba(6,6,14,0.99), rgba(10,10,26,0.99));
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(215,169,23,0.18);
    box-shadow: -12px 0 60px rgba(0,0,0,0.5);
    pointer-events: auto;
    padding-top: 20px; /* Extra padding at top for close button visibility */
  }
  .rasoaf-drawer::-webkit-scrollbar { width: 3px; }
  .rasoaf-drawer::-webkit-scrollbar-thumb {
    background: #D4A017;
    border-radius: 999px;
  }

  /* mobile drawer link */
  .rasoaf-dlk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255,255,255,0.7);
    background: transparent;
    border: none;
    border-radius: 12px;
    padding: 14px 16px;
    cursor: pointer;
    text-align: left;
    min-height: 52px;
    transition: all 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .rasoaf-dlk:hover { color: #D4A017; background: rgba(215,169,23,0.08); transform: translateX(4px); }
  .rasoaf-dlk[data-active="true"] {
    color: #D4A017;
    background: rgba(215,169,23,0.12);
    font-weight: 600;
    border-left: 2px solid #D4A017;
    border-radius: 0 12px 12px 0;
  }
  .rasoaf-dlk-arrow {
    font-size: 18px;
    color: rgba(215,169,23,0.4);
    flex-shrink: 0;
    transition: all 0.25s ease;
  }
  .rasoaf-dlk:hover .rasoaf-dlk-arrow,
  .rasoaf-dlk[data-active="true"] .rasoaf-dlk-arrow {
    transform: translateX(6px);
    color: #D4A017;
  }

  /* mobile sub-menu */
  .rasoaf-dlk-sub {
    padding-left: 16px;
    border-left: 1px solid rgba(215,169,23,0.1);
    margin: 4px 0 8px 16px;
  }
  .rasoaf-dlk-sub-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 16px;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
  }
  .rasoaf-dlk-sub-item:hover {
    color: #D4A017;
    background: rgba(215,169,23,0.07);
    transform: translateX(4px);
  }

  /* mobile Book Now — 3-D version */
  .rasoaf-mobile-book {
    width: 100%;
    padding: 15px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    color: #111;
    background: linear-gradient(135deg, #F7C948, #D4A017 45%, #B8860B);
    position: relative;
    overflow: hidden;
    box-shadow:
      0 4px 0 #A07000,
      0 6px 0 #6A4500,
      0 8px 0 rgba(0,0,0,0.35),
      0 8px 18px rgba(215,169,23,0.30);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .rasoaf-mobile-book::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 100px;
    background: linear-gradient(180deg, rgba(255,255,255,0.40), transparent 55%);
  }
  .rasoaf-mobile-book:hover {
    transform: translateY(-2px);
    box-shadow:
      0 6px 0 #A07000,
      0 9px 0 #6A4500,
      0 11px 0 rgba(0,0,0,0.35),
      0 12px 26px rgba(215,169,23,0.42);
  }
  .rasoaf-mobile-book:active {
    transform: translateY(4px);
    box-shadow:
      0 1px 0 #A07000,
      0 2px 0 #6A4500,
      0 4px 12px rgba(215,169,23,0.20);
  }

  .rasoaf-mobile-inquiry {
    width: 100%;
    padding: 14px 24px;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    color: #D4A017;
    border: 1px solid rgba(215,169,23,0.30);
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.25s ease;
  }
  .rasoaf-mobile-inquiry:hover {
    background: rgba(215,169,23,0.12);
    border-color: #D4A017;
    transform: translateY(-2px);
  }

  /* ── RESPONSIVE BREAKPOINTS ── */
  @media (max-width: 767px) {
    .rasoaf-dsk { display: none !important; }
    .rasoaf-mob { display: flex !important; }
    /* Disable heavy animations on mobile */
    .rasoaf-book {
      animation: none !important;
    }
    .rasoaf-book .book-shine {
      animation: none !important;
    }
    .rasoaf-book:hover:not(:active) {
      transform: none !important;
      box-shadow: none !important;
    }
    .rasoaf-dropdown-3d {
      transform: none !important;
      transition: none !important;
    }
    .rasoaf-dropdown-3d.open {
      transform: none !important;
    }
    .rasoaf-navbar-inner {
      transform-style: flat !important;
      perspective: none !important;
    }
    .rasoaf-link {
      transform-style: flat !important;
    }
    /* Disable glow animation on mobile */
    .rasoaf-navbar-inner.glow-active::after {
      display: none !important;
    }
  }

  @media (min-width: 768px) {
    .rasoaf-mob { display: none !important; }
  }

  /* ── FOCUS VISIBLE ── */
  .rasoaf-link:focus-visible,
  .rasoaf-book:focus-visible,
  .rasoaf-inquiry:focus-visible,
  .rasoaf-mob:focus-visible {
    outline: 2px solid #D4A017;
    outline-offset: 3px;
    border-radius: 8px;
  }

  /* ── REDUCED MOTION ── */
  @media (prefers-reduced-motion: reduce) {
    .rasoaf-book,
    .rasoaf-book .book-shine { animation: none !important; }
    .rasoaf-link,
    .rasoaf-book,
    .rasoaf-inquiry,
    .rasoaf-dlk,
    .rasoaf-dropdown-3d { transition: none !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion variants
// ─────────────────────────────────────────────────────────────────────────────
const drawerV = {
  hidden:  { x: "100%", transition: { type: "spring", damping: 30, stiffness: 280 } },
  visible: {
    x: 0,
    transition: {
      type: "spring", damping: 24, stiffness: 210,
      staggerChildren: 0.045, delayChildren: 0.06,
    },
  },
  exit: { x: "100%", transition: { type: "spring", damping: 32, stiffness: 300 } },
};

const itemV = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.30, ease: [0.22,1,0.36,1] } },
};

const overlayV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeLink,     setActiveLink]     = useState("Home");
  const [isMobile,       setIsMobile]       = useState(false);
  const [openDropdown,   setOpenDropdown]   = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const closeRef  = useRef(null);
  const navbarRef = useRef(null);
  const logoRef   = useRef(null);
  const logoDotRef = useRef(null);

  // ── GSAP entrance + logo animations ──────────────────────────────────────
  useEffect(() => {
    // Skip GSAP animations on mobile for performance
    if (isMobile) return;
    if (!navbarRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      navbarRef.current,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, clearProps: "all" }
    );

    const links = navbarRef.current.querySelectorAll(".rasoaf-link");
    if (links.length) {
      tl.fromTo(
        links,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, clearProps: "all" },
        "-=0.45"
      );
    }

    const ctaBtns = navbarRef.current.querySelectorAll(
      ".rasoaf-inquiry, .rasoaf-book-wrap"
    );
    if (ctaBtns.length) {
      tl.fromTo(
        ctaBtns,
        { y: -14, opacity: 0, scale: 0.88 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.09,
          ease: "back.out(1.9)", clearProps: "all" },
        "-=0.35"
      );
    }

    // Logo icon gentle float
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -4, repeat: -1, yoyo: true,
        duration: 2.2, ease: "sine.inOut",
      });
    }

    // Logo dot pulse
    if (logoDotRef.current) {
      gsap.to(logoDotRef.current, {
        scale: 1.9, repeat: -1, yoyo: true,
        duration: 1.1, ease: "power2.inOut",
      });
    }

    return () => { tl.kill(); };
  }, [isMobile]);

  // ── GSAP 3D mouse-tilt (desktop only) ────────────────────────────────────
  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;
    const nb = navbarRef.current;
    if (!nb) return;

    const onMove = (e) => {
      const r = nb.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(nb, {
        rotationY: x * 2.5,
        rotationX: -y * 1.5,
        duration: 0.7,
        ease: "power2.out",
        transformPerspective: 1400,
      });
    };

    const onLeave = () => {
      gsap.to(nb, {
        rotationY: 0, rotationX: 0,
        duration: 0.6, ease: "power2.out",
      });
    };

    nb.addEventListener("mousemove", onMove);
    nb.addEventListener("mouseleave", onLeave);
    return () => {
      nb.removeEventListener("mousemove", onMove);
      nb.removeEventListener("mouseleave", onLeave);
    };
  }, [isMobile]);

  // ── Scroll / resize ───────────────────────────────────────────────────────
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Body scroll-lock when drawer open ────────────────────────────────────
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow  = "hidden";
      document.body.style.position  = "fixed";
      document.body.style.width     = "100%";
    } else {
      document.body.style.overflow  = "";
      document.body.style.position  = "";
      document.body.style.width     = "";
    }
    return () => {
      document.body.style.overflow  = "";
      document.body.style.position  = "";
      document.body.style.width     = "";
    };
  }, [menuOpen]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80);
  }, [menuOpen]);

  // Escape key closes drawer
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && menuOpen) setMenuOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);

    const sectionMap = {
      "Home":         "home",
      "Services":     "services",
      "Hajj & Umrah": "hajj-umrah",
      "Visa Services":"visa-services",
      "Contact":      "contact",
    };
    const id = sectionMap[section] ?? section.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
    } else if (section === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToBooking = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    const el = document.getElementById("booking");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
  };

  const goToVisaInquiry = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    const el = document.getElementById("visa-services");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
  };

  const goHome = () => {
    setActiveLink("Home");
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasSubMenu   = (link) => Boolean(SUB_MENUS[link]);
  const toggleDrop   = (link) => setOpenDropdown(openDropdown === link ? null : link);
  const toggleMobSub = (link) => setExpandedMobile(expandedMobile === link ? null : link);

  // ── Computed styles ───────────────────────────────────────────────────────
  const navbarClass = isMobile
    ? "navbar-mobile"
    : scrolled ? "navbar-scrolled" : "navbar-transparent";

  const navBg = isMobile
    ? "rgba(6,6,14,0.95)"
    : scrolled ? "rgba(255,255,255,0.94)" : "transparent";

  const navBorder = isMobile
    ? "1px solid rgba(215,169,23,0.18)"
    : scrolled ? "1px solid rgba(17,17,17,0.06)" : "none";

  const navBlur = isMobile ? "blur(20px)" : scrolled ? "blur(18px)" : "none";

  const logoTextColor = isMobile ? "#fff" : scrolled ? "#111" : "#fff";
  const logoLtdColor  = isMobile
    ? "rgba(255,255,255,0.4)"
    : scrolled ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.45)";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>

      <div className="rasoaf-navbar-wrapper">
        <nav
          ref={navbarRef}
          className={`rasoaf-navbar-inner ${navbarClass} ${!scrolled && !isMobile ? "glow-active" : ""}`}
          role="navigation"
          aria-label="Main navigation"
          style={{
            position: "relative",
            width: "100%",
            background: navBg,
            backdropFilter: navBlur,
            WebkitBackdropFilter: navBlur,
            borderBottom: navBorder,
            boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.10)" : "none",
            borderRadius: scrolled ? "0" : "0 0 20px 20px",
            transition: "all 0.4s ease",
          }}
        >
          <div
            style={{
              maxWidth: 1340,
              margin: "0 auto",
              padding: isMobile ? "12px 20px" : scrolled ? "12px 28px" : "16px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 32px)",
              transition: "padding 0.3s ease",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* ── LOGO ── */}
            <button
              onClick={goHome}
              aria-label="RASOAF Travels and Tours — return to home"
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(10px, 1.4vw, 16px)",
                background: "none", border: "none",
                cursor: "pointer", padding: 0, flexShrink: 0,
              }}
            >
              <div ref={logoRef} style={{ transformStyle: "preserve-3d" }}>
                <Rasaof size={isMobile ? 38 : scrolled ? 42 : 48} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(4px,0.6vw,6px)", lineHeight: 1.1, flexWrap: "wrap" }}>
                  <motion.span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: 800,
                      fontSize: isMobile ? "14px" : "clamp(14px,1.6vw,18px)",
                      color: logoTextColor,
                      letterSpacing: "-0.02em",
                      whiteSpace: "nowrap",
                      transition: "color 0.3s ease",
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    RASOAF
                  </motion.span>
                  <span style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: isMobile ? "10px" : "clamp(11px,1.1vw,13px)",
                    color: logoTextColor,
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    transition: "color 0.3s ease",
                  }}>
                    TRAVELS &amp; TOURS
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "7px" : "clamp(7px,0.75vw,9px)",
                    fontWeight: 500,
                    color: logoLtdColor,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap",
                  }}>
                    LIMITED
                  </span>
                  <motion.span
                    ref={logoDotRef}
                    style={{
                      width: 3, height: 3,
                      borderRadius: "50%",
                      background: "#D4A017",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontStyle: "italic",
                    fontSize: isMobile ? "7px" : "clamp(7px,0.7vw,9px)",
                    color: "#D4A017",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}>
                    Your Trusted Travel Partner
                  </span>
                </div>
              </div>
            </button>

            {/* ── DESKTOP NAV LINKS ── */}
            <div
              className="rasoaf-dsk"
              style={{
                display: "flex", alignItems: "center",
                gap: "clamp(2px, 1.2vw, 8px)",
                flex: 1, justifyContent: "center",
              }}
            >
              {NAV_LINKS.map((link) => (
                <div key={link} style={{ position: "relative" }}>
                  <button
                    className={`rasoaf-link${openDropdown === link ? " open" : ""}`}
                    data-active={activeLink === link}
                    onClick={() => hasSubMenu(link) ? toggleDrop(link) : goTo(link)}
                    aria-haspopup={hasSubMenu(link) ? "true" : undefined}
                    aria-expanded={hasSubMenu(link) ? openDropdown === link : undefined}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>{link}</span>
                    {hasSubMenu(link) && (
                      <ChevronDown className="rasoaf-chev" size={13} strokeWidth={2.5} />
                    )}
                    <span className="link-bar" />
                  </button>

                  {/* 3D Dropdown */}
                  {hasSubMenu(link) && (
                    <div
                      className={`rasoaf-dropdown-3d${openDropdown === link ? " open" : ""}`}
                      role="menu"
                    >
                      {SUB_MENUS[link].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            className="rasoaf-dropdown-item-3d"
                            role="menuitem"
                            onClick={() => goTo(link)}
                          >
                            <span className="di-icon-wrap">
                              <Icon size={14} color="#B8860B" />
                            </span>
                            <span>{item.label}</span>
                            <span className="di-arrow">→</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── DESKTOP CTAs ── */}
            <div className="rasoaf-dsk" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="rasoaf-inquiry" onClick={goToVisaInquiry}>
                Visa Inquiry
              </button>

              {/* ══ 3-D BOOK NOW BUTTON ══ */}
              <div className="rasoaf-book-wrap">
                <button className="rasoaf-book" onClick={goToBooking}>
                  <span className="book-shine" aria-hidden="true" />
                  <span className="book-text">Book Now</span>
                  <span className="book-icon" aria-hidden="true">✈</span>
                </button>
              </div>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              className="rasoaf-mob"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="rasoaf-drawer"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
              </motion.div>
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div
              className="rasoaf-overlay"
              variants={overlayV}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              id="rasoaf-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              variants={drawerV}
              initial="hidden" animate="visible" exit="exit"
              className="rasoaf-drawer"
            >
              {/* Drawer header - Increased padding-top for better close button visibility */}
              <motion.div
                variants={itemV}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "28px 20px 20px",
                  borderBottom: "1px solid rgba(215,169,23,0.1)",
                  position: "sticky",
                  top: 0,
                  background: "rgba(6,6,14,0.98)",
                  zIndex: 5,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Rasaof size={40} />
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "-0.02em" }}>RASOAF</span>
                      <span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: "-0.01em" }}>TRAVELS &amp; TOURS</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Limited</span>
                      <span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#D4A017", display: "inline-block" }} />
                      <span style={{ fontFamily: "'Inter',sans-serif", fontStyle: "italic", fontSize: 8, color: "#D4A017", fontWeight: 400 }}>Your Trusted Partner</span>
                    </div>
                  </div>
                </div>

                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(215,169,23,0.12)",
                    border: "1px solid rgba(215,169,23,0.3)",
                    cursor: "pointer",
                    color: "#D4A017",
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s ease",
                    flexShrink: 0,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(215,169,23,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(215,169,23,0.12)";
                  }}
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </motion.div>

              {/* Drawer nav */}
              <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_LINKS.map((link) => (
                  <motion.div key={link} variants={itemV}>
                    <button
                      className="rasoaf-dlk"
                      data-active={activeLink === link}
                      onClick={() => hasSubMenu(link) ? toggleMobSub(link) : goTo(link)}
                    >
                      {link}
                      <span className="rasoaf-dlk-arrow">
                        {hasSubMenu(link) ? (
                          <motion.span
                            animate={{ rotate: expandedMobile === link ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ display: "inline-block" }}
                          >
                            ›
                          </motion.span>
                        ) : "›"}
                      </span>
                    </button>

                    {hasSubMenu(link) && expandedMobile === link && (
                      <div className="rasoaf-dlk-sub">
                        {SUB_MENUS[link].map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={idx}
                              className="rasoaf-dlk-sub-item"
                              onClick={() => goTo(link)}
                            >
                              <Icon size={14} style={{ color: "rgba(215,169,23,0.55)", flexShrink: 0 }} />
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTAs */}
              <motion.div
                variants={itemV}
                style={{
                  padding: "16px 20px 28px",
                  borderTop: "1px solid rgba(215,169,23,0.1)",
                  display: "flex", flexDirection: "column", gap: 10,
                }}
              >
                <button className="rasoaf-mobile-inquiry" onClick={goToVisaInquiry}>
                  Visa Inquiry
                </button>

                {/* 3-D Book Now — mobile */}
                <button className="rasoaf-mobile-book" onClick={goToBooking}>
                  <span style={{ position: "relative", zIndex: 1, fontWeight: 600 }}>
                    Book Now ✈
                  </span>
                </button>

                {/* Contact info */}
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <p style={{
                    fontFamily: "'Inter',sans-serif",
                    fontSize: 9, fontWeight: 500,
                    color: "rgba(255,255,255,0.32)",
                    marginBottom: 8,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}>
                    24 / 7 Support
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <a
                      href="tel:+234XXXXXXXXX"
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 14, fontWeight: 600,
                        color: "#D4A017", textDecoration: "none",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                      }}
                    >
                      <Phone size={12} /> +234 XXX XXX XXX
                    </a>
                    <a
                      href="mailto:rasoaf24@gmail.com"
                      style={{
                        fontFamily: "'Inter',sans-serif",
                        fontSize: 12, fontWeight: 500,
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                      }}
                    >
                      <Mail size={11} /> rasoaf24@gmail.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}