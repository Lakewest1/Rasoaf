// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Context-Aware Navbar (v2)
// RASOAF Typography · Smooth slide animations · 3D Book Now button
// Context-aware routing · Mobile drawer · Perfectly responsive
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Rasaof from "./Rasaof-logo.jsx";
import {
  Menu, X, ChevronDown, Plane, Users, Building2, GraduationCap, 
  Star, Globe, Sparkles, Crown, Home,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════════
// RASOAF Design Tokens
// ══════════════════════════════════════════════════════════════════════════
const TOKENS = {
  display: "'Manrope', system-ui, -apple-system, sans-serif",
  body: "'Inter', system-ui, -apple-system, sans-serif",
  gold: "#D4A017", goldLight: "#F7C948", goldDark: "#B8860B",
};

// ══════════════════════════════════════════════════════════════════════════
// Navigation Data
// ══════════════════════════════════════════════════════════════════════════
const NAV_LINKS_HAJJ = Object.freeze(["Home", "Services", "Hajj & Umrah", "Contact"]);
const NAV_LINKS_TRAVEL = Object.freeze(["Home", "Services", "Visa Services", "Contact"]);

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
    { label: "Student Visa", icon: GraduationCap, route: "/travel/student-visa" },
    { label: "Work Visa", icon: Building2, route: "/travel/work-visa" },
    { label: "Tourist Visa", icon: Plane, route: "/travel/tourist-visa" },
    { label: "Business Visa", icon: Globe, route: "/travel/business-visa" },
    { label: "Family Visa", icon: Users, route: "/travel/family-visa" },
    { label: "Diplomatic Visa", icon: Crown, route: "/travel/diplomatic-visa" },
    { label: "Residence Visa", icon: Home, route: "/travel/residence-visa" },
  ],
});

// ══════════════════════════════════════════════════════════════════════════
// Animation Variants
// ══════════════════════════════════════════════════════════════════════════
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } }),
};

const subItemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25 } },
};

// ══════════════════════════════════════════════════════════════════════════
// Premium CSS — 3D Button · RASOAF Typography
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  @keyframes bookGlow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(215,169,23,0.65), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30); }
    50% { box-shadow: 0 0 0 1px rgba(215,169,23,0.9), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 34px rgba(215,169,23,0.55), 0 0 42px rgba(215,169,23,0.18); }
  }
  @keyframes bookShine {
    0% { left: -115%; } 55% { left: 120%; } 100% { left: 120%; }
  }

  .nav-3d-book-wrap { perspective: 600px; display: inline-flex; }

  .nav-3d-book {
    position: relative;
    font-family: ${TOKENS.body}; font-size: 0.85rem; font-weight: 600;
    letter-spacing: 0.01em; color: #0A0F1A; border: none;
    border-radius: 9999px; padding: 10px 24px; cursor: pointer;
    white-space: nowrap; flex-shrink: 0;
    transform-style: preserve-3d; user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #B8860B 100%);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.65), 0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30);
    transition: transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease;
    animation: bookGlow 3s ease-in-out infinite;
    min-height: 44px;
  }

  .nav-3d-book::before {
    content: ''; position: absolute; inset: 0; border-radius: 9999px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%); pointer-events: none;
  }

  .nav-3d-book .book-shine {
    position: absolute; top: 0; left: -115%; width: 75%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 9999px; animation: bookShine 2.8s ease-in-out infinite; pointer-events: none;
  }

  .nav-3d-book:hover:not(:active) {
    animation: none; transform: translateY(-4px) rotateX(-5deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.8), 0 8px 0 #A07000, 0 12px 0 #6A4500, 0 14px 0 rgba(0,0,0,0.40), 0 14px 36px rgba(215,169,23,0.50);
  }

  .nav-3d-book:active {
    animation: none; transform: translateY(5px) rotateX(7deg);
    box-shadow: 0 0 0 1px rgba(215,169,23,0.55), 0 1px 0 #A07000, 0 2px 0 #6A4500, 0 3px 0 rgba(0,0,0,0.35), 0 3px 14px rgba(215,169,23,0.20);
  }

  .nav-3d-book:focus-visible { outline: 3px solid ${TOKENS.gold}; outline-offset: 3px; }

  .nav-3d-book .book-text { position: relative; z-index: 1; }
  .nav-3d-book .book-icon { display: inline-block; margin-left: 6px; position: relative; z-index: 1; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
  .nav-3d-book:hover .book-icon { transform: translateX(4px) rotate(-35deg); }

  /* Nav link hover transition */
  .nav-link-btn {
    font-family: ${TOKENS.body}; font-size: 0.9rem; font-weight: 500;
    letter-spacing: 0.01em; background: none; border: none; cursor: pointer;
    padding: 10px 16px; border-radius: 10px;
    display: flex; align-items: center; gap: 4px;
    transition: all 0.25s ease; outline: none;
  }
  .nav-link-btn:focus-visible { outline: 2px solid ${TOKENS.gold}; outline-offset: 2px; }

  /* Logo text */
  .nav-logo-title { font-family: ${TOKENS.display}; font-weight: 800; font-size: 15px; letter-spacing: -0.02em; line-height: 1.1; }
  .nav-logo-subtitle { font-family: ${TOKENS.display}; font-weight: 700; font-size: 10px; letter-spacing: -0.01em; line-height: 1.1; opacity: 0.85; }
  .nav-logo-limited { font-family: ${TOKENS.body}; font-size: 7px; font-weight: 500; color: ${TOKENS.gold}; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 1px; }

  /* Mobile drawer */
  .nav-drawer-link { font-family: ${TOKENS.body}; font-size: 1rem; font-weight: 500; }
  .nav-drawer-sub { font-family: ${TOKENS.body}; font-size: 0.9rem; }
  .nav-drawer-btn { font-family: ${TOKENS.body}; font-weight: 600; font-size: 0.95rem; }

  @media (max-width: 767px) {
    .nav-3d-book { animation: none !important; }
    .nav-3d-book .book-shine { animation: none !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-3d-book, .nav-3d-book .book-shine { animation: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const isGateway = location.pathname === "/";
  const isHajjContext = location.pathname.startsWith("/hajj");
  const isTravelContext = location.pathname.startsWith("/travel");
  const isHomePage = location.pathname === "/hajj" || location.pathname === "/hajj/" || location.pathname === "/travel" || location.pathname === "/travel/";

  const NAV_LINKS = useMemo(() => isHajjContext ? NAV_LINKS_HAJJ : isTravelContext ? NAV_LINKS_TRAVEL : [], [isHajjContext, isTravelContext]);
  const SUB_MENUS = useMemo(() => isHajjContext ? SUB_MENUS_HAJJ : isTravelContext ? SUB_MENUS_TRAVEL : {}, [isHajjContext, isTravelContext]);
  const basePath = isHajjContext ? "/hajj" : isTravelContext ? "/travel" : "";

  // Active link
  useEffect(() => {
    const path = location.pathname;
    if (path === basePath || path === `${basePath}/`) setActiveLink("Home");
    else if (path.startsWith(`${basePath}/services`)) setActiveLink("Services");
    else if (path.startsWith(`${basePath}/umrah`)) setActiveLink(isHajjContext ? "Hajj & Umrah" : "Visa Services");
    else if (path.startsWith(`${basePath}/contact`)) setActiveLink("Contact");
    else if (isTravelContext && (path.includes("visa") || path.includes("residence"))) setActiveLink("Visa Services");
  }, [location, basePath, isHajjContext, isTravelContext]);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
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

  const goTo = useCallback((section) => {
    setActiveLink(section);
    closeAll();
    const map = { "Home": basePath, "Services": `${basePath}/services`, "Hajj & Umrah": `${basePath}/umrah`, "Visa Services": `${basePath}/services`, "Contact": `${basePath}/contact` };
    navigate(map[section] || basePath);
    scrollToTop();
  }, [basePath, navigate, closeAll, scrollToTop]);

  const goToSubPage = useCallback((label, route) => {
    closeAll();
    if (route) { navigate(route); scrollToTop(); return; }
    const map = {
      "Hajj Packages": `${basePath}/packages/hajj`, "Umrah Packages": `${basePath}/packages/umrah`,
      "Flight Booking": isHajjContext ? `${basePath}/flight-booking` : "/travel/flights",
      "Hotel Reservation": isHajjContext ? `${basePath}/hotel-reservation` : "/hajj/hotel-reservation",
      "Group Travel": `${basePath}/packages/hajj`, "VIP Packages": `${basePath}/packages/hajj`,
      "Student Visa": "/travel/student-visa", "Work Visa": "/travel/work-visa",
      "Tourist Visa": "/travel/tourist-visa", "Business Visa": "/travel/business-visa",
      "Family Visa": "/travel/family-visa", "Diplomatic Visa": "/travel/diplomatic-visa",
      "Residence Visa": "/travel/residence-visa",
    };
    navigate(map[label] || basePath);
    scrollToTop();
  }, [basePath, isHajjContext, navigate, closeAll, scrollToTop]);

  const goHome = useCallback(() => {
    setActiveLink("Home");
    closeAll();
    navigate(basePath || "/");
    scrollToTop();
  }, [basePath, navigate, closeAll, scrollToTop]);

  const goToBooking = useCallback(() => {
    closeAll();
    navigate(isHajjContext ? "/hajj/packages/hajj" : "/travel/flights");
    scrollToTop();
  }, [isHajjContext, navigate, closeAll, scrollToTop]);

  const goToInquiry = useCallback(() => {
    closeAll();
    navigate(`${basePath}/contact`);
    scrollToTop();
  }, [basePath, navigate, closeAll, scrollToTop]);

  const hasSub = useCallback((link) => Boolean(SUB_MENUS[link]), [SUB_MENUS]);

  // Don't render on gateway or if no context
  if (isGateway || NAV_LINKS.length === 0) return null;

  // Background logic
  const shouldBeTransparent = isHomePage && !scrolled && !isMobile;
  const bg = isMobile ? "rgba(6,6,14,0.97)" : shouldBeTransparent ? "transparent" : "rgba(255,255,255,0.95)";
  const textColor = shouldBeTransparent || isMobile ? "#fff" : "#0A0F1A";
  const logoColor = shouldBeTransparent || isMobile ? "#fff" : "#0A0F1A";
  const borderColor = isMobile ? "1px solid rgba(212,160,23,0.15)" : shouldBeTransparent ? "none" : "1px solid rgba(0,0,0,0.06)";
  const boxShadow = shouldBeTransparent ? "none" : "0 4px 32px rgba(0,0,0,0.08)";

  return (
    <>
      <style>{STYLES}</style>

      {/* Navbar with slide animation */}
      <motion.div
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: bg,
          backdropFilter: shouldBeTransparent ? "none" : "blur(18px)",
          WebkitBackdropFilter: shouldBeTransparent ? "none" : "blur(18px)",
          borderBottom: borderColor, boxShadow,
          transition: "all 0.4s ease", minHeight: 64,
        }}
      >
        <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <Rasaof size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="nav-logo-title" style={{ color: logoColor }}>RASOAF</span>
              <span className="nav-logo-subtitle" style={{ color: logoColor }}>TRAVELS & TOURS</span>
              <span className="nav-logo-limited">Limited</span>
            </div>
          </button>

          {/* Desktop Links */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map((link) => (
                <div key={link} style={{ position: "relative" }}>
                  <button
                    className="nav-link-btn"
                    onClick={() => hasSub(link) ? setOpenDropdown(openDropdown === link ? null : link) : goTo(link)}
                    style={{ color: activeLink === link ? TOKENS.gold : textColor, fontWeight: activeLink === link ? 700 : 500 }}
                    onMouseEnter={(e) => { if (!activeLink || activeLink !== link) e.currentTarget.style.color = TOKENS.gold; }}
                    onMouseLeave={(e) => { if (activeLink !== link) e.currentTarget.style.color = textColor; }}
                  >
                    {link}
                    {hasSub(link) && (
                      <ChevronDown size={12} style={{ transition: "transform 0.3s", transform: openDropdown === link ? "rotate(180deg)" : "rotate(0)" }} />
                    )}
                  </button>

                  {/* Dropdown with animation */}
                  <AnimatePresence>
                    {hasSub(link) && openDropdown === link && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseLeave={() => setOpenDropdown(null)}
                        style={{
                          position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                          background: "#fff", borderRadius: "16px", padding: 8, minWidth: 220,
                          boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.06)", zIndex: 100,
                        }}
                      >
                        {SUB_MENUS[link].map((item, idx) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => goToSubPage(item.label, item.route)}
                              style={{
                                display: "flex", alignItems: "center", gap: 12, width: "100%",
                                padding: "10px 14px", borderRadius: "12px", border: "none",
                                background: "transparent", cursor: "pointer",
                                fontFamily: TOKENS.body, fontSize: "0.9rem", fontWeight: 500,
                                color: "#0A0F1A", textAlign: "left", transition: "background 0.2s ease",
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(212,160,23,0.08)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                              <span style={{ width: 30, height: 30, borderRadius: "8px", background: "rgba(212,160,23,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Icon size={14} color={TOKENS.goldDark} />
                              </span>
                              {item.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          )}

          {/* Desktop CTAs */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button
                onClick={goToInquiry}
                style={{
                  fontFamily: TOKENS.body, fontSize: "0.85rem", fontWeight: 600,
                  padding: "9px 20px", borderRadius: "9999px", background: "transparent",
                  border: `1.5px solid ${shouldBeTransparent ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
                  color: textColor, cursor: "pointer", transition: "all 0.3s ease", minHeight: 44,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = TOKENS.gold; e.currentTarget.style.color = TOKENS.gold; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = shouldBeTransparent ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.color = textColor; }}
              >
                {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
              </button>

              <div className="nav-3d-book-wrap">
                <button className="nav-3d-book" onClick={goToBooking}>
                  <span className="book-shine" aria-hidden="true" />
                  <span className="book-text">Book Now</span>
                  <span className="book-icon" aria-hidden="true">✈</span>
                </button>
              </div>
            </div>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)",
                borderRadius: "12px", cursor: "pointer", color: TOKENS.gold, transition: "all 0.2s ease",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </motion.div>

      {/* Mobile Drawer with slide animation */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 999 }}
            />
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(85vw, 340px)", background: "#0a0a14",
                zIndex: 1000, padding: "24px 16px",
                display: "flex", flexDirection: "column", gap: 4,
                overflowY: "auto", borderLeft: "1px solid rgba(212,160,23,0.15)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <button onClick={() => setMenuOpen(false)} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)", cursor: "pointer", color: TOKENS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={20} />
                </button>
              </div>

              {NAV_LINKS.map((link, i) => (
                <motion.div key={link} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                  <button
                    onClick={() => hasSub(link) ? setExpandedMobile(expandedMobile === link ? null : link) : goTo(link)}
                    className="nav-drawer-link"
                    style={{
                      width: "100%", display: "flex", justifyContent: "space-between",
                      padding: "16px", color: activeLink === link ? TOKENS.gold : "rgba(255,255,255,0.85)",
                      background: "none", border: "none", cursor: "pointer",
                      borderRadius: "12px", transition: "all 0.2s ease",
                    }}
                  >
                    {link}
                    {hasSub(link) && <span>{expandedMobile === link ? "−" : "+"}</span>}
                  </button>

                  <AnimatePresence>
                    {hasSub(link) && expandedMobile === link && (
                      <motion.div variants={subItemVariants} initial="hidden" animate="visible" exit="exit" style={{ paddingLeft: 20, marginTop: 4, overflow: "hidden" }}>
                        {SUB_MENUS[link].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToSubPage(item.label, item.route)}
                            className="nav-drawer-sub"
                            style={{
                              display: "flex", alignItems: "center", gap: 10, width: "100%",
                              padding: "12px 14px", borderRadius: "10px", border: "none",
                              background: "transparent", cursor: "pointer",
                              color: "rgba(255,255,255,0.6)", textAlign: "left",
                            }}
                          >
                            <span style={{ color: TOKENS.gold }}>•</span> {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div custom={NAV_LINKS.length} variants={mobileItemVariants} initial="hidden" animate="visible"
                style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                <button onClick={goToInquiry} className="nav-drawer-btn"
                  style={{ width: "100%", padding: "14px", borderRadius: "9999px", background: "transparent", border: "1px solid rgba(212,160,23,0.3)", color: TOKENS.gold, cursor: "pointer", minHeight: 48 }}>
                  {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
                </button>
                <button onClick={goToBooking} className="nav-drawer-btn"
                  style={{ width: "100%", padding: "14px", borderRadius: "9999px", background: "linear-gradient(135deg, #F7C948, #D4A017)", color: "#0A0F1A", border: "none", cursor: "pointer", minHeight: 48 }}>
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