// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Ultra-Premium Navbar
// 3D Book Now button · GSAP entrance · mouse-tilt · dropdown menus
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Mobile Optimized: Heavy animations removed on smaller screens
//
// v6: Book Now navigates to /services · Correct contact details
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
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

// ── SUB_MENU_ANCHORS MAP ──────────────────────────────────────────────────

const SUB_MENU_ANCHORS = {
  "Hajj Packages":      { route: "/services/hajj",              anchor: null },
  "Umrah Packages":     { route: "/services/umrah",             anchor: null },
  "Flight Booking":     { route: "/services/flight-booking",    anchor: null },
  "Hotel Reservation":  { route: "/services/hotel-reservation", anchor: null },
  "Group Travel":       { route: "/services/hajj",  anchor: null },
  "VIP Packages":       { route: "/services/hajj",  anchor: null },
  "Student Visa":       { route: "/visa-services/student",  anchor: null },
  "Work Visa":          { route: "/visa-services/work",     anchor: null },
  "Tourist Visa":       { route: "/visa-services/tourist",  anchor: null },
  "Business Visa":      { route: "/visa-services/business", anchor: null },
  "Family Visa":        { route: "/visa-services/family",   anchor: null },
};

// ─────────────────────────────────────────────────────────────────────────────
// CSS — Fully Responsive with Safe Areas & Touch Optimization
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&display=swap');

  :root {
    --safe-area-top: env(safe-area-inset-top, 0px);
    --safe-area-bottom: env(safe-area-inset-bottom, 0px);
  }

  .rasoaf-navbar-wrapper {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1001;
    perspective: 1400px;
  }

  .rasoaf-navbar-inner {
    transform-style: preserve-3d;
    transition: background 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease;
    will-change: transform;
    padding-top: var(--safe-area-top);
  }

  .rasoaf-navbar-inner.glow-active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 6%; right: 6%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,215,0,0.25) 30%, rgba(255,215,0,0.5) 50%, rgba(255,215,0,0.25) 70%, transparent);
    pointer-events: none;
  }

  .rasoaf-link {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.75rem, 1vw, 0.95rem);
    font-weight: 600;
    letter-spacing: 0.01em;
    background: none;
    border: none;
    cursor: pointer;
    padding: clamp(6px, 0.8vw, 8px) clamp(8px, 1vw, 12px);
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
  .rasoaf-link[data-active="true"] .link-bar { width: calc(100% - 16px); }

  .navbar-transparent .rasoaf-link { color: rgba(255,255,255,0.85); }
  .navbar-transparent .rasoaf-link:hover,
  .navbar-transparent .rasoaf-link[data-active="true"] { color: #D4A017; font-weight: 600; }

  .navbar-scrolled .rasoaf-link { color: rgba(17,17,17,0.72); }
  .navbar-scrolled .rasoaf-link:hover,
  .navbar-scrolled .rasoaf-link[data-active="true"] { color: #B8860B; font-weight: 600; }

  .navbar-mobile .rasoaf-link { color: rgba(255,255,255,0.85); }

  .rasoaf-chev {
    display: flex; align-items: center;
    transition: transform 0.3s ease;
    color: rgba(212,160,23,0.6);
  }
  .rasoaf-link.open .rasoaf-chev { transform: rotate(180deg); }

  .rasoaf-dropdown-3d {
    position: absolute;
    top: calc(100% + clamp(8px, 1vw, 14px));
    left: 50%;
    transform: translateX(-50%) rotateX(-12deg) translateY(-8px);
    transform-origin: top center;
    transform-style: preserve-3d;
    min-width: clamp(180px, 18vw, 220px);
    background: rgba(255,255,255,0.99);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: clamp(14px, 1.5vw, 18px);
    padding: clamp(6px, 0.6vw, 8px);
    box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 0 1px rgba(212,160,23,0.12);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1), visibility 0.3s;
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
    gap: clamp(8px, 1vw, 12px);
    width: 100%;
    padding: clamp(8px, 0.8vw, 10px) clamp(10px, 1.2vw, 14px);
    border-radius: clamp(10px, 1vw, 12px);
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.8rem, 0.9vw, 0.95rem);
    font-weight: 500;
    color: rgba(17,17,17,0.72);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
    min-height: 44px;
  }
  .rasoaf-dropdown-item-3d:hover {
    background: rgba(215,169,23,0.09);
    color: #111;
    transform: translateX(4px);
  }
  .rasoaf-dropdown-item-3d .di-icon-wrap {
    width: clamp(26px, 2.5vw, 30px); 
    height: clamp(26px, 2.5vw, 30px);
    border-radius: clamp(6px, 0.7vw, 8px);
    background: rgba(215,169,23,0.12);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.25s ease;
  }
  .rasoaf-dropdown-item-3d:hover .di-icon-wrap { background: rgba(215,169,23,0.25); }
  .rasoaf-dropdown-item-3d .di-arrow {
    margin-left: auto;
    opacity: 0.25;
    font-size: clamp(12px, 1.1vw, 14px);
    transition: all 0.25s ease;
  }
  .rasoaf-dropdown-item-3d:hover .di-arrow {
    opacity: 1;
    color: #D4A017;
    transform: translateX(4px);
  }

  .rasoaf-inquiry {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.75rem, 0.9vw, 0.95rem);
    font-weight: 600;
    letter-spacing: 0.01em;
    background: transparent;
    border-radius: 100px;
    padding: clamp(7px, 0.8vw, 9px) clamp(16px, 2vw, 22px);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
    min-height: 38px;
  }
  .navbar-transparent .rasoaf-inquiry { color: #fff; border: 1px solid rgba(255,255,255,0.3); }
  .navbar-transparent .rasoaf-inquiry:hover { border-color: #D4A017; color: #D4A017; background: rgba(215,169,23,0.08); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(215,169,23,0.15); }
  .navbar-scrolled .rasoaf-inquiry { color: #111; border: 1px solid rgba(17,17,17,0.22); }
  .navbar-scrolled .rasoaf-inquiry:hover { border-color: #B8860B; color: #B8860B; background: rgba(215,169,23,0.08); transform: translateY(-2px); }
  .navbar-mobile .rasoaf-inquiry { color: #fff; border: 1px solid rgba(255,255,255,0.3); }

  .rasoaf-book-wrap { perspective: 600px; display: inline-flex; }
  .rasoaf-book {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.75rem, 0.9vw, 0.95rem);
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #111;
    border: none;
    border-radius: 100px;
    padding: clamp(8px, 0.9vw, 10px) clamp(20px, 2.5vw, 28px);
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transform-style: preserve-3d;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #B8860B 100%);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.65), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30);
    transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease;
    animation: bookGlow 3s ease-in-out infinite;
    min-height: 40px;
  }
  @keyframes bookGlow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(215,169,23,0.65), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30); }
    50% { box-shadow: 0 0 0 1px rgba(215,169,23,0.9), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 34px rgba(215,169,23,0.55), 0 0 42px rgba(215,169,23,0.18); }
  }
  .rasoaf-book::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 100px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }
  .rasoaf-book .book-shine {
    position: absolute;
    top: 0; left: -115%;
    width: 75%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 100px;
    animation: bookShine 2.8s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes bookShine { 0% { left: -115%; } 55% { left: 120%; } 100% { left: 120%; } }
  .rasoaf-book:hover:not(:active) {
    animation: none;
    transform: translateY(-4px) rotateX(-5deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.8), 0 8px 0 #A07000, 0 12px 0 #6A4500, 0 14px 0 rgba(0,0,0,0.40), 0 14px 36px rgba(215,169,23,0.50);
  }
  .rasoaf-book:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.55), 0 1px 0 #A07000, 0 2px 0 #6A4500, 0 3px 0 rgba(0,0,0,0.35), 0 3px 14px rgba(215,169,23,0.20);
  }
  .rasoaf-book .book-text { position: relative; z-index: 1; }
  .rasoaf-book .book-icon {
    display: inline-block;
    margin-left: 6px;
    position: relative; z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .rasoaf-book:hover .book-icon { transform: translateX(4px) rotate(-35deg); }

  .rasoaf-mob {
    display: none;
    align-items: center; justify-content: center;
    width: clamp(40px, 5vw, 44px); 
    height: clamp(40px, 5vw, 44px);
    background: rgba(215,169,23,0.10);
    border: 1px solid rgba(215,169,23,0.30);
    border-radius: 12px;
    cursor: pointer;
    color: #D4A017;
    flex-shrink: 0;
    z-index: 1002;
    transition: background 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }
  .rasoaf-mob:hover { background: rgba(215,169,23,0.20); }
  .rasoaf-mob:active { background: rgba(215,169,23,0.30); transform: scale(0.95); }

  .rasoaf-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.72);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 999;
    pointer-events: auto;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .rasoaf-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(88vw, 360px);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    background: linear-gradient(160deg, rgba(6,6,14,0.99), rgba(10,10,26,0.99));
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-left: 1px solid rgba(215,169,23,0.18);
    box-shadow: -12px 0 60px rgba(0,0,0,0.5);
    pointer-events: auto;
    padding-top: clamp(16px, 2vh, 20px);
    padding-bottom: var(--safe-area-bottom);
    -webkit-overflow-scrolling: touch;
  }
  .rasoaf-drawer::-webkit-scrollbar { width: 3px; }
  .rasoaf-drawer::-webkit-scrollbar-thumb { background: #D4A017; border-radius: 999px; }

  .rasoaf-dlk {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    font-weight: 500;
    letter-spacing: 0.01em;
    color: rgba(255,255,255,0.7);
    background: transparent;
    border: none;
    border-radius: 12px;
    padding: clamp(12px, 2vh, 14px) clamp(12px, 2vw, 16px);
    cursor: pointer;
    text-align: left;
    min-height: 48px;
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
  .rasoaf-dlk:active { background: rgba(215,169,23,0.18); }
  .rasoaf-dlk-arrow {
    font-size: clamp(16px, 2vw, 18px);
    color: rgba(215,169,23,0.4);
    flex-shrink: 0;
    transition: all 0.25s ease;
  }
  .rasoaf-dlk:hover .rasoaf-dlk-arrow,
  .rasoaf-dlk[data-active="true"] .rasoaf-dlk-arrow { transform: translateX(6px); color: #D4A017; }

  .rasoaf-dlk-sub {
    padding-left: clamp(12px, 2vw, 16px);
    border-left: 1px solid rgba(215,169,23,0.1);
    margin: 4px 0 8px clamp(12px, 2vw, 16px);
  }
  .rasoaf-dlk-sub-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: clamp(8px, 1.5vh, 10px) clamp(12px, 2vw, 16px);
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.85rem, 1.6vw, 0.95rem);
    font-weight: 400;
    color: rgba(255,255,255,0.5);
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: all 0.25s ease;
    min-height: 44px;
    -webkit-tap-highlight-color: transparent;
  }
  .rasoaf-dlk-sub-item:hover { color: #D4A017; background: rgba(215,169,23,0.07); transform: translateX(4px); }
  .rasoaf-dlk-sub-item:active { background: rgba(215,169,23,0.15); }

  .rasoaf-mobile-book {
    width: 100%;
    padding: clamp(12px, 2vh, 15px) clamp(18px, 3vw, 24px);
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.85rem, 1.6vw, 0.95rem);
    font-weight: 600;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    color: #111;
    background: linear-gradient(135deg, #F7C948, #D4A017 45%, #B8860B);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 0 #A07000, 0 6px 0 #6A4500, 0 8px 0 rgba(0,0,0,0.35), 0 8px 18px rgba(215,169,23,0.30);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
  }
  .rasoaf-mobile-book::before {
    content: '';
    position: absolute; inset: 0;
    border-radius: 100px;
    background: linear-gradient(180deg, rgba(255,255,255,0.40), transparent 55%);
  }
  .rasoaf-mobile-book:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #A07000, 0 9px 0 #6A4500, 0 11px 0 rgba(0,0,0,0.35), 0 12px 26px rgba(215,169,23,0.42); }
  .rasoaf-mobile-book:active { transform: translateY(4px); box-shadow: 0 1px 0 #A07000, 0 2px 0 #6A4500, 0 4px 12px rgba(215,169,23,0.20); }

  .rasoaf-mobile-inquiry {
    width: 100%;
    padding: clamp(12px, 2vh, 14px) clamp(18px, 3vw, 24px);
    font-size: clamp(0.85rem, 1.6vw, 0.95rem);
    font-weight: 600;
    border-radius: 100px;
    background: rgba(255,255,255,0.04);
    color: #D4A017;
    border: 1px solid rgba(215,169,23,0.30);
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: all 0.25s ease;
    min-height: 48px;
    -webkit-tap-highlight-color: transparent;
  }
  .rasoaf-mobile-inquiry:hover { background: rgba(215,169,23,0.12); border-color: #D4A017; transform: translateY(-2px); }
  .rasoaf-mobile-inquiry:active { background: rgba(215,169,23,0.20); }

  .rasoaf-mobile-contact {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .rasoaf-mobile-contact a {
    font-family: 'Inter', sans-serif;
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 500;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    min-height: 44px;
  }
  .rasoaf-mobile-contact a:hover { color: #D4A017; background: rgba(215,169,23,0.08); }
  .rasoaf-mobile-contact a:first-child { font-size: clamp(13px, 2.2vw, 14px); font-weight: 600; color: #D4A017; }

  @media (max-width: 1100px) {
    .rasoaf-link { font-size: clamp(0.7rem, 1.3vw, 0.85rem); padding: 6px 8px; }
    .rasoaf-inquiry { padding: 6px 14px; font-size: 0.8rem; }
    .rasoaf-book { padding: 7px 18px; font-size: 0.8rem; }
  }

  @media (max-width: 960px) and (min-width: 768px) {
    .rasoaf-link { font-size: clamp(0.65rem, 1.2vw, 0.8rem); padding: 5px 6px; gap: 3px; }
    .rasoaf-inquiry { font-size: 0.75rem; padding: 6px 12px; }
    .rasoaf-book { font-size: 0.75rem; padding: 6px 16px; }
  }

  @media (max-width: 767px) {
    .rasoaf-dsk { display: none !important; }
    .rasoaf-mob { display: flex !important; }
    .rasoaf-book { animation: none !important; }
    .rasoaf-book .book-shine { animation: none !important; }
    .rasoaf-book:hover:not(:active) { transform: none !important; box-shadow: none !important; }
    .rasoaf-dropdown-3d { transform: none !important; transition: none !important; }
    .rasoaf-dropdown-3d.open { transform: none !important; }
    .rasoaf-navbar-inner { transform-style: flat !important; perspective: none !important; }
    .rasoaf-link { transform-style: flat !important; }
    .rasoaf-navbar-inner.glow-active::after { display: none !important; }
    .rasoaf-drawer { width: min(92vw, 340px); }
    .rasoaf-dlk { font-size: 0.9rem; padding: 11px 14px; min-height: 44px; }
    .rasoaf-dlk-sub-item { font-size: 0.85rem; padding: 9px 12px; min-height: 42px; }
  }

  @media (max-width: 380px) {
    .rasoaf-drawer { width: 100vw; }
    .rasoaf-dlk { font-size: 0.85rem; padding: 10px 12px; min-height: 42px; }
    .rasoaf-dlk-sub-item { font-size: 0.8rem; padding: 8px 10px; min-height: 40px; }
    .rasoaf-mobile-book, .rasoaf-mobile-inquiry { font-size: 0.8rem; padding: 10px 16px; }
  }

  @media (min-width: 768px) { .rasoaf-mob { display: none !important; } }

  @media (min-width: 1440px) {
    .rasoaf-link { font-size: 0.95rem; padding: 8px 12px; }
    .rasoaf-dropdown-item-3d { font-size: 0.95rem; padding: 10px 14px; }
    .rasoaf-inquiry { font-size: 0.95rem; padding: 9px 22px; }
    .rasoaf-book { font-size: 0.95rem; padding: 10px 28px; }
  }

  @supports (padding-top: env(safe-area-inset-top)) {
    .rasoaf-navbar-inner { padding-top: var(--safe-area-top); }
    .rasoaf-drawer { padding-bottom: var(--safe-area-bottom); }
  }

  .rasoaf-link:focus-visible,
  .rasoaf-book:focus-visible,
  .rasoaf-inquiry:focus-visible,
  .rasoaf-mob:focus-visible,
  .rasoaf-dlk:focus-visible,
  .rasoaf-dlk-sub-item:focus-visible,
  .rasoaf-mobile-book:focus-visible,
  .rasoaf-mobile-inquiry:focus-visible { 
    outline: 2px solid #D4A017; 
    outline-offset: 3px; 
    border-radius: 8px; 
  }

  @media (prefers-reduced-motion: reduce) {
    .rasoaf-book, .rasoaf-book .book-shine { animation: none !important; }
    .rasoaf-link, .rasoaf-book, .rasoaf-inquiry, .rasoaf-dlk, .rasoaf-dropdown-3d,
    .rasoaf-dlk-sub-item, .rasoaf-mobile-book, .rasoaf-mobile-inquiry { transition: none !important; }
    .rasoaf-overlay { animation: none !important; }
  }

  @media (prefers-contrast: high) {
    .rasoaf-link:focus-visible,
    .rasoaf-book:focus-visible,
    .rasoaf-mob:focus-visible { outline-width: 3px; }
  }
`;

const drawerV = {
  hidden:  { x: "100%", transition: { type: "spring", damping: 30, stiffness: 280 } },
  visible: { x: 0, transition: { type: "spring", damping: 24, stiffness: 210, staggerChildren: 0.045, delayChildren: 0.06 } },
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

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const closeRef = useRef(null);
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const logoDotRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveLink("Home");
    else if (path.startsWith("/services")) setActiveLink("Services");
    else if (path.startsWith("/hajj-umrah")) setActiveLink("Hajj & Umrah");
    else if (path.startsWith("/visa-services")) setActiveLink("Visa Services");
    else if (path.startsWith("/contact")) setActiveLink("Contact");
    else setActiveLink("Home");
  }, [location]);

  useEffect(() => {
    if (isMobile) return;
    if (!navbarRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(navbarRef.current, { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, clearProps: "all" });
    const links = navbarRef.current.querySelectorAll(".rasoaf-link");
    if (links.length) tl.fromTo(links, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, clearProps: "all" }, "-=0.45");
    const ctaBtns = navbarRef.current.querySelectorAll(".rasoaf-inquiry, .rasoaf-book-wrap");
    if (ctaBtns.length) tl.fromTo(ctaBtns, { y: -14, opacity: 0, scale: 0.88 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.09, ease: "back.out(1.9)", clearProps: "all" }, "-=0.35");
    if (logoRef.current) gsap.to(logoRef.current, { y: -4, repeat: -1, yoyo: true, duration: 2.2, ease: "sine.inOut" });
    if (logoDotRef.current) gsap.to(logoDotRef.current, { scale: 1.9, repeat: -1, yoyo: true, duration: 1.1, ease: "power2.inOut" });
    return () => { tl.kill(); };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const nb = navbarRef.current;
    if (!nb) return;
    const onMove = (e) => { const r = nb.getBoundingClientRect(); gsap.to(nb, { rotationY: ((e.clientX - r.left) / r.width - 0.5) * 2.5, rotationX: -((e.clientY - r.top) / r.height - 0.5) * 1.5, duration: 0.7, ease: "power2.out", transformPerspective: 1400 }); };
    const onLeave = () => { gsap.to(nb, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" }); };
    nb.addEventListener("mousemove", onMove);
    nb.addEventListener("mouseleave", onLeave);
    return () => { nb.removeEventListener("mousemove", onMove); nb.removeEventListener("mouseleave", onLeave); };
  }, [isMobile]);

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

  useEffect(() => {
    if (menuOpen) { document.body.style.overflow = "hidden"; document.body.style.position = "fixed"; document.body.style.width = "100%"; }
    else { document.body.style.overflow = ""; document.body.style.position = ""; document.body.style.width = ""; }
    return () => { document.body.style.overflow = ""; document.body.style.position = ""; document.body.style.width = ""; };
  }, [menuOpen]);

  useEffect(() => { if (menuOpen) setTimeout(() => closeRef.current?.focus(), 80); }, [menuOpen]);
  useEffect(() => { const h = (e) => { if (e.key === "Escape" && menuOpen) setMenuOpen(false); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [menuOpen]);

  const goTo = (section) => {
    setActiveLink(section); setMenuOpen(false); setOpenDropdown(null); setExpandedMobile(null);
    if (section === "Home") { navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else if (section === "Contact") { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { const m = { "Services": "/services", "Hajj & Umrah": "/hajj-umrah", "Visa Services": "/visa-services" }; navigate(m[section] || "/"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  const goToSubPage = (itemLabel) => {
    setMenuOpen(false); setOpenDropdown(null); setExpandedMobile(null);
    const target = SUB_MENU_ANCHORS[itemLabel];
    if (!target) return;
    navigate(target.route);
    if (target.anchor) { setTimeout(() => { const el = document.getElementById(target.anchor); if (el) { const t = el.getBoundingClientRect().top + window.scrollY - 120; window.scrollTo({ top: t, behavior: "smooth" }); } }, 120); }
    else { window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  // ── UPDATED: Book Now navigates to /services and scrolls to top ────────
  const goToBooking = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    navigate("/services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToVisaInquiry = () => { setMenuOpen(false); setOpenDropdown(null); setExpandedMobile(null); navigate("/visa-services"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goHome = () => { setActiveLink("Home"); setMenuOpen(false); setOpenDropdown(null); setExpandedMobile(null); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const hasSubMenu = (link) => Boolean(SUB_MENUS[link]);
  const toggleDrop = (link) => setOpenDropdown(openDropdown === link ? null : link);
  const toggleMobSub = (link) => setExpandedMobile(expandedMobile === link ? null : link);

  const navbarClass = isMobile ? "navbar-mobile" : scrolled ? "navbar-scrolled" : "navbar-transparent";
  const navBg = isMobile ? "rgba(6,6,14,0.95)" : scrolled ? "rgba(255,255,255,0.94)" : "transparent";
  const navBorder = isMobile ? "1px solid rgba(215,169,23,0.18)" : scrolled ? "1px solid rgba(17,17,17,0.06)" : "none";
  const navBlur = isMobile ? "blur(20px)" : scrolled ? "blur(18px)" : "none";
  const logoTextColor = isMobile ? "#fff" : scrolled ? "#111" : "#fff";
  const logoLtdColor = isMobile ? "rgba(255,255,255,0.4)" : scrolled ? "rgba(17,17,17,0.45)" : "rgba(255,255,255,0.45)";

  return (
    <>
      <style>{CSS}</style>
      <div className="rasoaf-navbar-wrapper">
        <nav ref={navbarRef} className={`rasoaf-navbar-inner ${navbarClass} ${!scrolled && !isMobile ? "glow-active" : ""}`} role="navigation" aria-label="Main navigation"
          style={{ position: "relative", width: "100%", background: navBg, backdropFilter: navBlur, WebkitBackdropFilter: navBlur, borderBottom: navBorder, boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.10)" : "none", borderRadius: scrolled ? "0" : "0 0 20px 20px", transition: "all 0.4s ease" }}>
          <div style={{ maxWidth: 1340, margin: "0 auto", padding: isMobile ? "clamp(10px, 1.5vh, 12px) clamp(12px, 2vw, 20px)" : scrolled ? "12px clamp(20px, 2.5vw, 28px)" : "clamp(14px, 1.8vh, 16px) clamp(20px, 2.5vw, 28px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(12px, 2vw, 32px)", transition: "padding 0.3s ease", position: "relative", zIndex: 2 }}>
            <button onClick={goHome} aria-label="RASOAF Travels and Tours — return to home" style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 1.2vw, 16px)", background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
              <div ref={logoRef} style={{ transformStyle: "preserve-3d" }}><Rasaof size={isMobile ? 34 : scrolled ? 40 : 48} /></div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(3px, 0.5vw, 6px)", lineHeight: 1.1, flexWrap: "wrap" }}>
                  <motion.span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(12px, 2.5vw, 14px)" : "clamp(14px, 1.6vw, 18px)", color: logoTextColor, letterSpacing: "-0.02em", whiteSpace: "nowrap", transition: "color 0.3s ease" }} whileHover={{ scale: 1.02 }}>RASOAF</motion.span>
                  <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(8px, 1.8vw, 10px)" : "clamp(11px, 1.1vw, 13px)", color: logoTextColor, letterSpacing: "-0.01em", whiteSpace: "nowrap", transition: "color 0.3s ease" }}>TRAVELS &amp; TOURS</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? "clamp(6px, 1.2vw, 7px)" : "clamp(7px, 0.75vw, 9px)", fontWeight: 500, color: logoLtdColor, letterSpacing: "0.18em", textTransform: "uppercase", transition: "color 0.3s ease", whiteSpace: "nowrap" }}>LIMITED</span>
                  <motion.span ref={logoDotRef} style={{ width: 3, height: 3, borderRadius: "50%", background: "#D4A017", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontStyle: "italic", fontSize: isMobile ? "clamp(6px, 1.2vw, 7px)" : "clamp(7px, 0.7vw, 9px)", color: "#D4A017", fontWeight: 400, letterSpacing: "0.01em", whiteSpace: "nowrap" }}>Your Trusted Travel Partner</span>
                </div>
              </div>
            </button>
            <div className="rasoaf-dsk" style={{ display: "flex", alignItems: "center", gap: "clamp(2px, 1.2vw, 8px)", flex: 1, justifyContent: "center" }}>
              {NAV_LINKS.map((link) => (
                <div key={link} style={{ position: "relative" }}>
                  <button className={`rasoaf-link${openDropdown === link ? " open" : ""}`} data-active={activeLink === link} onClick={() => hasSubMenu(link) ? toggleDrop(link) : goTo(link)} aria-haspopup={hasSubMenu(link) ? "true" : undefined} aria-expanded={hasSubMenu(link) ? openDropdown === link : undefined}>
                    <span style={{ position: "relative", zIndex: 1 }}>{link}</span>
                    {hasSubMenu(link) && (<ChevronDown className="rasoaf-chev" size={13} strokeWidth={2.5} />)}
                    <span className="link-bar" />
                  </button>
                  {hasSubMenu(link) && (
                    <div className={`rasoaf-dropdown-3d${openDropdown === link ? " open" : ""}`} role="menu">
                      {SUB_MENUS[link].map((item, idx) => { const Icon = item.icon; return (<button key={idx} className="rasoaf-dropdown-item-3d" role="menuitem" onClick={() => goToSubPage(item.label)}><span className="di-icon-wrap"><Icon size={14} color="#B8860B" /></span><span>{item.label}</span><span className="di-arrow">→</span></button>); })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="rasoaf-dsk" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="rasoaf-inquiry" onClick={goToVisaInquiry}>Visa Inquiry</button>
              <div className="rasoaf-book-wrap">
                <button className="rasoaf-book" onClick={goToBooking}>
                  <span className="book-shine" aria-hidden="true" />
                  <span className="book-text">Book Now</span>
                  <span className="book-icon" aria-hidden="true">✈</span>
                </button>
              </div>
            </div>
            <button className="rasoaf-mob" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="rasoaf-drawer">
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>{menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}</motion.div>
            </button>
          </div>
        </nav>
      </div>
      <AnimatePresence mode="wait">
        {menuOpen && (
          <>
            <motion.div className="rasoaf-overlay" variants={overlayV} initial="hidden" animate="visible" exit="exit" onClick={() => setMenuOpen(false)} aria-hidden="true" />
            <motion.aside id="rasoaf-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu" variants={drawerV} initial="hidden" animate="visible" exit="exit" className="rasoaf-drawer">
              <motion.div variants={itemV} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "clamp(20px, 3vh, 28px) 20px clamp(16px, 2vh, 20px)", borderBottom: "1px solid rgba(215,169,23,0.1)", position: "sticky", top: 0, background: "rgba(6,6,14,0.98)", zIndex: 5, backdropFilter: "blur(12px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Rasaof size={36} /><div><div style={{ display: "flex", alignItems: "baseline", gap: 5, flexWrap: "wrap" }}><span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, fontSize: 14, color: "#fff", letterSpacing: "-0.02em" }}>RASOAF</span><span style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 700, fontSize: 10, color: "#fff", letterSpacing: "-0.01em" }}>TRAVELS &amp; TOURS</span></div><div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}><span style={{ fontFamily: "'Inter',sans-serif", fontSize: 8, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Limited</span><span style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#D4A017", display: "inline-block" }} /><span style={{ fontFamily: "'Inter',sans-serif", fontStyle: "italic", fontSize: 8, color: "#D4A017", fontWeight: 400 }}>Your Trusted Partner</span></div></div></div>
                <button ref={closeRef} onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(215,169,23,0.12)", border: "1px solid rgba(215,169,23,0.3)", cursor: "pointer", color: "#D4A017", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s ease", flexShrink: 0, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(215,169,23,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(215,169,23,0.12)"; }}><X size={20} strokeWidth={2} /></button>
              </motion.div>
              <nav style={{ flex: 1, padding: "clamp(12px, 2vh, 16px) 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                {NAV_LINKS.map((link) => (
                  <motion.div key={link} variants={itemV}>
                    <button className="rasoaf-dlk" data-active={activeLink === link} onClick={() => hasSubMenu(link) ? toggleMobSub(link) : goTo(link)}>{link}<span className="rasoaf-dlk-arrow">{hasSubMenu(link) ? (<motion.span animate={{ rotate: expandedMobile === link ? 90 : 0 }} transition={{ duration: 0.3 }} style={{ display: "inline-block" }}>›</motion.span>) : "›"}</span></button>
                    {hasSubMenu(link) && expandedMobile === link && (<div className="rasoaf-dlk-sub">{SUB_MENUS[link].map((item, idx) => { const Icon = item.icon; return (<button key={idx} className="rasoaf-dlk-sub-item" onClick={() => goToSubPage(item.label)}><Icon size={14} style={{ color: "rgba(215,169,23,0.55)", flexShrink: 0 }} />{item.label}</button>); })}</div>)}
                  </motion.div>
                ))}
              </nav>
              <motion.div variants={itemV} style={{ padding: "clamp(12px, 2vh, 16px) 20px clamp(20px, 3vh, 28px)", borderTop: "1px solid rgba(215,169,23,0.1)", display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="rasoaf-mobile-inquiry" onClick={goToVisaInquiry}>Visa Inquiry</button>
                <button className="rasoaf-mobile-book" onClick={goToBooking}><span style={{ position: "relative", zIndex: 1, fontWeight: 600 }}>Book Now ✈</span></button>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(8px, 1.5vw, 9px)", fontWeight: 500, color: "rgba(255,255,255,0.32)", marginBottom: 8, letterSpacing: "0.18em", textTransform: "uppercase" }}>24 / 7 Support</p>
                  <div className="rasoaf-mobile-contact">
                    <a href="tel:+2348022352362"><Phone size={12} /> +234 802 235 2362</a>
                    <a href="mailto:info@rasoaf.com"><Mail size={11} /> info@rasoaf.com</a>
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