// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Context-Aware Navbar (v3.0)
// Optimized: CSS-driven · 60fps · Context-aware Home navigation · 320px→2560px
// ─────────────────────────────────────────────────────────────────────────────

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Rasaof from "./Rasaof-logo.jsx";
import {
  Menu,
  X,
  ChevronDown,
  Plane,
  Users,
  Building2,
  GraduationCap,
  Star,
  Globe,
  Sparkles,
  Crown,
  Home,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// RASOAF Design Tokens — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = Object.freeze({
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017",
  goldLight: "#F7C948",
  goldDark: "#B8860B",
});

// ══════════════════════════════════════════════════════════════════════════
// Navigation Data — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const NAV_LINKS_HAJJ = Object.freeze([
  "Home",
  "Services",
  "Hajj & Umrah",
  "Contact",
]);
const NAV_LINKS_TRAVEL = Object.freeze([
  "Home",
  "Services",
  "Visa Services",
  "Contact",
]);

const SUB_MENUS_HAJJ = Object.freeze({
  Services: [
    { label: "Hajj Packages", icon: Star },
    { label: "Umrah Packages", icon: Star },
    { label: "Flight Booking", icon: Plane },
    { label: "Hotel Reservation", icon: Building2 },
  ],
  "Hajj & Umrah": [
    { label: "Hajj Packages", icon: Globe },
    { label: "Umrah Packages", icon: Globe },
    { label: "Group Travel", icon: Users },
    { label: "VIP Packages", icon: Sparkles },
  ],
});

const SUB_MENUS_TRAVEL = Object.freeze({
  Services: [
    { label: "Flight Booking", icon: Plane },
    { label: "Hotel Reservation", icon: Building2 },
  ],
  "Visa Services": [
    {
      label: "Student Visa",
      icon: GraduationCap,
      route: "/travel/student-visa",
    },
    { label: "Work Visa", icon: Building2, route: "/travel/work-visa" },
    { label: "Tourist Visa", icon: Plane, route: "/travel/tourist-visa" },
    { label: "Business Visa", icon: Globe, route: "/travel/business-visa" },
    { label: "Family Visa", icon: Users, route: "/travel/family-visa" },
    { label: "Diplomatic Visa", icon: Crown, route: "/travel/diplomatic-visa" },
    { label: "Residence Visa", icon: Home, route: "/travel/residence-visa" },
  ],
});

// ══════════════════════════════════════════════════════════════════════════
// Module-Scoped Animation Variants — Stable references
// ══════════════════════════════════════════════════════════════════════════
const NAVBAR_VARIANTS = Object.freeze({
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
});

const DROPDOWN_VARIANTS = Object.freeze({
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
});

const DRAWER_VARIANTS = Object.freeze({
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
});

const OVERLAY_VARIANTS = Object.freeze({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
});

const MOBILE_ITEM_VARIANTS = Object.freeze({
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
});

const SUB_ITEM_VARIANTS = Object.freeze({
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
});

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — All styles extracted from inline JSX
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  /* ═══════════════════════════════════════════════════════════════════════ */
  /* 3D BOOK NOW BUTTON                                                    */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @keyframes bookGlow {
    0%, 100% {
      box-shadow: 0 0 0 1px rgba(215,169,23,0.65), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30);
    }
    50% {
      box-shadow: 0 0 0 1px rgba(215,169,23,0.9), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 34px rgba(215,169,23,0.55), 0 0 42px rgba(215,169,23,0.18);
    }
  }

  @keyframes bookShine {
    0% { left: -115%; }
    55% { left: 120%; }
    100% { left: 120%; }
  }

  .nav-3d-book-wrap {
    perspective: 600px;
    display: inline-flex;
  }

  .nav-3d-book {
    position: relative;
    font-family: ${TOKENS.body};
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #0A0F1A;
    border: none;
    border-radius: 9999px;
    padding: 10px 24px;
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
    min-height: 44px;
    transform: translateZ(0);
  }

  .nav-3d-book::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }

  .book-shine {
    position: absolute;
    top: 0;
    left: -115%;
    width: 75%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 9999px;
    animation: bookShine 2.8s ease-in-out infinite;
    pointer-events: none;
  }

  .nav-3d-book:hover:not(:active) {
    animation: none;
    transform: translateY(-4px) rotateX(-5deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.8), 0 8px 0 #A07000, 0 12px 0 #6A4500, 0 14px 0 rgba(0,0,0,0.40), 0 14px 36px rgba(215,169,23,0.50);
  }

  .nav-3d-book:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.55), 0 1px 0 #A07000, 0 2px 0 #6A4500, 0 3px 0 rgba(0,0,0,0.35), 0 3px 14px rgba(215,169,23,0.20);
  }

  .nav-3d-book:focus-visible {
    outline: 3px solid ${TOKENS.gold};
    outline-offset: 3px;
  }

  .book-text { position: relative; z-index: 1; }
  .book-icon { display: inline-block; margin-left: 6px; position: relative; z-index: 1; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  .nav-3d-book:hover .book-icon { transform: translateX(4px) rotate(-35deg); }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* NAVBAR CONTAINER                                                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    min-height: 64px;
    transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .nav-bar--transparent {
    background: transparent;
    border-bottom: none;
    box-shadow: none;
  }

  .nav-bar--solid {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 4px 32px rgba(0,0,0,0.08);
  }

  .nav-bar--mobile {
    background: rgba(6,6,14,0.97);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(212,160,23,0.15);
    box-shadow: none;
  }

  .nav-inner {
    max-width: 1340px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* LOGO                                                                  */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-logo-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .nav-logo-title {
    font-family: ${TOKENS.display};
    font-weight: 800;
    font-size: 15px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    transition: color 0.3s ease;
  }

  .nav-logo-subtitle {
    font-family: ${TOKENS.display};
    font-weight: 700;
    font-size: 10px;
    letter-spacing: -0.01em;
    line-height: 1.1;
    opacity: 0.85;
    transition: color 0.3s ease;
  }

  .nav-logo-limited {
    font-family: ${TOKENS.body};
    font-size: 7px;
    font-weight: 500;
    color: ${TOKENS.gold};
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 1px;
  }

  .nav-logo-text--light { color: #fff; }
  .nav-logo-text--dark { color: #0A0F1A; }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP NAV LINKS                                                     */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-desktop-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .nav-link-btn {
    font-family: ${TOKENS.body};
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px 16px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s ease;
    outline: none;
    transform: translateZ(0);
  }

  .nav-link-btn--light { color: #fff; }
  .nav-link-btn--dark { color: #0A0F1A; }
  .nav-link-btn--active { color: ${TOKENS.gold} !important; font-weight: 700 !important; }

  .nav-link-btn:hover { color: ${TOKENS.gold}; }

  .nav-link-btn:focus-visible {
    outline: 2px solid ${TOKENS.gold};
    outline-offset: 2px;
  }

  .nav-link-chevron {
    transition: transform 0.25s ease;
  }
  .nav-link-chevron--open { transform: rotate(180deg); }

  .nav-link-wrap {
    position: relative;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DROPDOWN                                                              */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    background: #fff;
    border-radius: 16px;
    padding: 8px;
    min-width: 220px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    border: 1px solid rgba(0,0,0,0.06);
    z-index: 100;
  }

  .nav-dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 14px;
    border-radius: 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: ${TOKENS.body};
    font-size: 0.9rem;
    font-weight: 500;
    color: #0A0F1A;
    text-align: left;
    transition: background 0.15s ease;
  }

  .nav-dropdown-item:hover {
    background: rgba(212,160,23,0.08);
  }

  .nav-dropdown-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: rgba(212,160,23,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* DESKTOP CTAS                                                          */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-ctas {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-inquiry-btn {
    font-family: ${TOKENS.body};
    font-size: 0.85rem;
    font-weight: 600;
    padding: 9px 20px;
    border-radius: 9999px;
    background: transparent;
    cursor: pointer;
    transition: border-color 0.25s ease, color 0.25s ease;
    min-height: 44px;
  }

  .nav-inquiry-btn--light {
    border: 1.5px solid rgba(255,255,255,0.25);
    color: #fff;
  }

  .nav-inquiry-btn--dark {
    border: 1.5px solid rgba(0,0,0,0.2);
    color: #0A0F1A;
  }

  .nav-inquiry-btn:hover {
    border-color: ${TOKENS.gold};
    color: ${TOKENS.gold};
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE HAMBURGER                                                      */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-hamburger {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.3);
    border-radius: 12px;
    cursor: pointer;
    color: ${TOKENS.gold};
    transition: background 0.2s ease;
  }

  .nav-hamburger:hover {
    background: rgba(212,160,23,0.2);
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* MOBILE DRAWER                                                         */
  /* ═══════════════════════════════════════════════════════════════════════ */

  .nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 999;
  }

  .nav-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(85vw, 340px);
    background: #0a0a14;
    z-index: 1000;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    border-left: 1px solid rgba(212,160,23,0.15);
  }

  .nav-drawer-close {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }

  .nav-drawer-close-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(212,160,23,0.1);
    border: 1px solid rgba(212,160,23,0.3);
    cursor: pointer;
    color: ${TOKENS.gold};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-drawer-link {
    font-family: ${TOKENS.body};
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 12px;
    transition: background 0.2s ease;
  }

  .nav-drawer-link--default { color: rgba(255,255,255,0.85); }
  .nav-drawer-link--active { color: ${TOKENS.gold}; }

  .nav-drawer-link:hover {
    background: rgba(212,160,23,0.05);
  }

  .nav-drawer-sub {
    padding-left: 20px;
    margin-top: 4px;
    overflow: hidden;
  }

  .nav-drawer-sub-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 12px 14px;
    border-radius: 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: rgba(255,255,255,0.6);
    text-align: left;
    font-family: ${TOKENS.body};
    font-size: 0.9rem;
  }

  .nav-drawer-sub-item:hover {
    background: rgba(212,160,23,0.05);
  }

  .nav-drawer-sub-dot { color: ${TOKENS.gold}; }

  .nav-drawer-ctas {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .nav-drawer-btn {
    font-family: ${TOKENS.body};
    font-weight: 600;
    font-size: 0.95rem;
    width: 100%;
    padding: 14px;
    border-radius: 9999px;
    cursor: pointer;
    min-height: 48px;
    transition: background 0.2s ease;
  }

  .nav-drawer-btn--outline {
    background: transparent;
    border: 1px solid rgba(212,160,23,0.3);
    color: ${TOKENS.gold};
  }

  .nav-drawer-btn--outline:hover {
    background: rgba(212,160,23,0.1);
  }

  .nav-drawer-btn--gold {
    background: linear-gradient(135deg, #F7C948, #D4A017);
    color: #0A0F1A;
    border: none;
  }

  /* ═══════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE                                                            */
  /* ═══════════════════════════════════════════════════════════════════════ */

  @media (max-width: 767px) {
    .nav-3d-book { animation: none !important; }
    .book-shine { animation: none !important; }
    .nav-desktop-links { display: none; }
    .nav-ctas { display: none; }
  }

  @media (min-width: 768px) {
    .nav-hamburger { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-3d-book,
    .book-shine {
      animation: none !important;
    }
    .nav-3d-book:hover:not(:active) {
      transform: none !important;
    }
    .nav-3d-book:active {
      transform: none !important;
    }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// Dropdown Submenu — Memoized
// ══════════════════════════════════════════════════════════════════════════
const DropdownMenu = memo(function DropdownMenu({
  items,
  onSelect,
  onClose,
}) {
  return (
    <motion.div
      className="nav-dropdown"
      variants={DROPDOWN_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseLeave={onClose}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            className="nav-dropdown-item"
            onClick={() => onSelect(item.label, item.route)}
          >
            <span className="nav-dropdown-icon">
              <Icon size={14} color={TOKENS.goldDark} />
            </span>
            {item.label}
          </button>
        );
      })}
    </motion.div>
  );
});
DropdownMenu.displayName = "DropdownMenu";

// ══════════════════════════════════════════════════════════════════════════
// Mobile Drawer Submenu — Memoized
// ══════════════════════════════════════════════════════════════════════════
const MobileSubmenu = memo(function MobileSubmenu({
  items,
  onSelect,
}) {
  return (
    <motion.div
      className="nav-drawer-sub"
      variants={SUB_ITEM_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {items.map((item) => (
        <button
          key={item.label}
          className="nav-drawer-sub-item"
          onClick={() => onSelect(item.label, item.route)}
        >
          <span className="nav-drawer-sub-dot">•</span> {item.label}
        </button>
      ))}
    </motion.div>
  );
});
MobileSubmenu.displayName = "MobileSubmenu";

// ══════════════════════════════════════════════════════════════════════════
// Main Component
// ══════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const prevScrollY = useRef(0);

  const isGateway = location.pathname === "/";
  const isHajjContext = location.pathname.startsWith("/hajj");
  const isTravelContext = location.pathname.startsWith("/travel");
  const isHomePage =
    location.pathname === "/hajj" ||
    location.pathname === "/hajj/" ||
    location.pathname === "/travel" ||
    location.pathname === "/travel/";

  const NAV_LINKS = useMemo(
    () =>
      isHajjContext
        ? NAV_LINKS_HAJJ
        : isTravelContext
        ? NAV_LINKS_TRAVEL
        : [],
    [isHajjContext, isTravelContext]
  );

  const SUB_MENUS = useMemo(
    () =>
      isHajjContext
        ? SUB_MENUS_HAJJ
        : isTravelContext
        ? SUB_MENUS_TRAVEL
        : {},
    [isHajjContext, isTravelContext]
  );

  const basePath = isHajjContext ? "/hajj" : isTravelContext ? "/travel" : "";

  // Active link detection
  useEffect(() => {
    const path = location.pathname;
    if (path === basePath || path === `${basePath}/`) setActiveLink("Home");
    else if (path.startsWith(`${basePath}/services`))
      setActiveLink("Services");
    else if (path.startsWith(`${basePath}/umrah`))
      setActiveLink(isHajjContext ? "Hajj & Umrah" : "Visa Services");
    else if (path.startsWith(`${basePath}/contact`))
      setActiveLink("Contact");
    else if (
      isTravelContext &&
      (path.includes("visa") || path.includes("residence"))
    )
      setActiveLink("Visa Services");
  }, [location, basePath, isHajjContext, isTravelContext]);

  // Mobile detection — debounced
  useEffect(() => {
    let ticking = false;
    const check = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsMobile(window.innerWidth < 768);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll detection — throttled
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 60);
          prevScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Navigation helpers
  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const hasSub = useCallback(
    (link) => Boolean(SUB_MENUS[link]),
    [SUB_MENUS]
  );

  const goTo = useCallback(
    (section) => {
      setActiveLink(section);
      closeAll();
      const map = {
        Home: basePath,
        Services: `${basePath}/services`,
        "Hajj & Umrah": `${basePath}/umrah`,
        "Visa Services": `${basePath}/services`,
        Contact: `${basePath}/contact`,
      };
      const target = map[section] || basePath;

      // Only navigate if not already on that page
      if (location.pathname !== target) {
        navigate(target);
      }
      scrollToTop();
    },
    [basePath, navigate, closeAll, scrollToTop, location.pathname]
  );

  const goToSubPage = useCallback(
    (label, route) => {
      closeAll();
      const map = {
        "Hajj Packages": `${basePath}/packages/hajj`,
        "Umrah Packages": `${basePath}/packages/umrah`,
        "Flight Booking": isHajjContext
          ? `${basePath}/flight-booking`
          : "/travel/flights",
        "Hotel Reservation": isHajjContext
          ? `${basePath}/hotel-reservation`
          : "/hajj/hotel-reservation",
        "Group Travel": `${basePath}/packages/hajj`,
        "VIP Packages": `${basePath}/packages/hajj`,
        "Student Visa": "/travel/student-visa",
        "Work Visa": "/travel/work-visa",
        "Tourist Visa": "/travel/tourist-visa",
        "Business Visa": "/travel/business-visa",
        "Family Visa": "/travel/family-visa",
        "Diplomatic Visa": "/travel/diplomatic-visa",
        "Residence Visa": "/travel/residence-visa",
      };
      const target = route || map[label] || basePath;

      if (location.pathname !== target) {
        navigate(target);
      }
      scrollToTop();
    },
    [basePath, isHajjContext, navigate, closeAll, scrollToTop, location.pathname]
  );

  // ✅ Context-aware Home navigation — stays within current app context
  const goHome = useCallback(() => {
    setActiveLink("Home");
    closeAll();

    // Determine the home path based on current context
    const homePath = isHajjContext
      ? "/hajj"
      : isTravelContext
      ? "/travel"
      : "/";

    // Only navigate if not already on the home page
    if (location.pathname !== homePath && location.pathname !== `${homePath}/`) {
      navigate(homePath);
    }
    scrollToTop();
  }, [
    isHajjContext,
    isTravelContext,
    navigate,
    closeAll,
    scrollToTop,
    location.pathname,
  ]);

  const goToBooking = useCallback(() => {
    closeAll();
    const target = isHajjContext ? "/hajj/packages/hajj" : "/travel/flights";
    if (location.pathname !== target) {
      navigate(target);
    }
    scrollToTop();
  }, [isHajjContext, navigate, closeAll, scrollToTop, location.pathname]);

  const goToInquiry = useCallback(() => {
    closeAll();
    const target = `${basePath}/contact`;
    if (location.pathname !== target) {
      navigate(target);
    }
    scrollToTop();
  }, [basePath, navigate, closeAll, scrollToTop, location.pathname]);

  // Don't render on gateway or if no context
  if (isGateway || NAV_LINKS.length === 0) return null;

  // CSS class-based styling (no inline styles)
  const barClass = isMobile
    ? "nav-bar nav-bar--mobile"
    : isHomePage && !scrolled
    ? "nav-bar nav-bar--transparent"
    : "nav-bar nav-bar--solid";

  const isLight = isMobile || (isHomePage && !scrolled);
  const logoTextClass = isLight ? "nav-logo-text--light" : "nav-logo-text--dark";
  const linkTextClass = isLight ? "nav-link-btn--light" : "nav-link-btn--dark";
  const inquiryBtnClass = isLight
    ? "nav-inquiry-btn--light"
    : "nav-inquiry-btn--dark";

  return (
    <>
      <style>{STYLES}</style>

      {/* Navbar */}
      <motion.div
        className={barClass}
        variants={NAVBAR_VARIANTS}
        initial="hidden"
        animate="visible"
      >
        <div className="nav-inner">
          {/* Logo — ✅ Context-aware Home navigation */}
          <button className="nav-logo-btn" onClick={goHome}>
            <Rasaof size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={`nav-logo-title ${logoTextClass}`}>
                RASOAF
              </span>
              <span className={`nav-logo-subtitle ${logoTextClass}`}>
                TRAVELS & TOURS
              </span>
              <span className="nav-logo-limited">Limited</span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="nav-desktop-links">
            {NAV_LINKS.map((link) => (
              <div key={link} className="nav-link-wrap">
                <button
                  className={`nav-link-btn ${linkTextClass} ${
                    activeLink === link ? "nav-link-btn--active" : ""
                  }`}
                  onClick={() =>
                    hasSub(link)
                      ? setOpenDropdown(
                          openDropdown === link ? null : link
                        )
                      : goTo(link)
                  }
                >
                  {link}
                  {hasSub(link) && (
                    <ChevronDown
                      size={12}
                      className={`nav-link-chevron ${
                        openDropdown === link
                          ? "nav-link-chevron--open"
                          : ""
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {hasSub(link) && openDropdown === link && (
                    <DropdownMenu
                      items={SUB_MENUS[link]}
                      onSelect={goToSubPage}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="nav-ctas">
            <button
              className={`nav-inquiry-btn ${inquiryBtnClass}`}
              onClick={goToInquiry}
            >
              {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
            </button>

            <div className="nav-3d-book-wrap">
              <button className="nav-3d-book" onClick={goToBooking}>
                <span className="book-shine" aria-hidden="true" />
                <span className="book-text">Book Now</span>
                <span className="book-icon" aria-hidden="true">
                  ✈
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div
              className="nav-overlay"
              variants={OVERLAY_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="nav-drawer"
              variants={DRAWER_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="nav-drawer-close">
                <button
                  className="nav-drawer-close-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link}
                  custom={i}
                  variants={MOBILE_ITEM_VARIANTS}
                  initial="hidden"
                  animate="visible"
                >
                  <button
                    className={`nav-drawer-link ${
                      activeLink === link
                        ? "nav-drawer-link--active"
                        : "nav-drawer-link--default"
                    }`}
                    onClick={() =>
                      hasSub(link)
                        ? setExpandedMobile(
                            expandedMobile === link ? null : link
                          )
                        : goTo(link)
                    }
                  >
                    {link}
                    {hasSub(link) && (
                      <span>{expandedMobile === link ? "−" : "+"}</span>
                    )}
                  </button>

                  <AnimatePresence>
                    {hasSub(link) && expandedMobile === link && (
                      <MobileSubmenu
                        items={SUB_MENUS[link]}
                        onSelect={goToSubPage}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div
                className="nav-drawer-ctas"
                custom={NAV_LINKS.length}
                variants={MOBILE_ITEM_VARIANTS}
                initial="hidden"
                animate="visible"
              >
                <button
                  className="nav-drawer-btn nav-drawer-btn--outline"
                  onClick={goToInquiry}
                >
                  {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
                </button>
                <button
                  className="nav-drawer-btn nav-drawer-btn--gold"
                  onClick={goToBooking}
                >
                  Book Now ✈
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}