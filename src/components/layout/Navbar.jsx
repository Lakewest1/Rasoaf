// src/components/layout/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS AND TOURS LIMITED — Premium Context-Aware Navbar
//
// Features:
//   • 3-D "Book Now" button with physical depth, shine sweep, hover lift
//   • Transparent background on home pages, solid on scroll/sub-pages
//   • Context-aware routing (Hajj vs Travel)
//   • Mobile drawer with full navigation
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Rasaof from "./Rasaof-logo.jsx";
import {
  Menu, X, ChevronDown, Plane, Users, Building2, GraduationCap, Star, Globe, Sparkles,
} from "lucide-react";

const NAV_LINKS_HAJJ = ["Home", "Services", "Hajj & Umrah", "Contact"];
const NAV_LINKS_TRAVEL = ["Home", "Services", "Visa Services", "Contact"];

const SUB_MENUS_HAJJ = {
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
};

const SUB_MENUS_TRAVEL = {
  Services: [
    { label: "Flight Booking", icon: Plane },
    { label: "Hotel Reservation", icon: Building2 },
  ],
  "Visa Services": [
    { label: "Student Visa", icon: GraduationCap },
    { label: "Work Visa", icon: Building2 },
    { label: "Tourist Visa", icon: Plane },
    { label: "Business Visa", icon: Globe },
    { label: "Family Visa", icon: Users },
  ],
};

// ── 3D Button CSS ───────────────────────────────────────────────────────────
const BOOK_BUTTON_CSS = `
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
        0 0 42px rgba(215,169,23,0.18);
    }
  }

  @keyframes bookShine {
    0%   { left: -115%; }
    55%  { left: 120%; }
    100% { left: 120%; }
  }

  .nav-3d-book-wrap {
    perspective: 600px;
    display: inline-flex;
  }

  .nav-3d-book {
    position: relative;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #111;
    border: none;
    border-radius: 100px;
    padding: 10px 24px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transform-style: preserve-3d;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    background: linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #B8860B 100%);
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.65),
      0 4px 0 #A07000,
      0 7px 0 #6A4500,
      0 9px 0 rgba(0,0,0,0.40),
      0 9px 22px rgba(215,169,23,0.30);
    transition:
      transform 0.18s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.18s ease;
    animation: bookGlow 3s ease-in-out infinite;
  }

  .nav-3d-book::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 100px;
    background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%);
    pointer-events: none;
  }

  .nav-3d-book .book-shine {
    position: absolute;
    top: 0; left: -115%;
    width: 75%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
    border-radius: 100px;
    animation: bookShine 2.8s ease-in-out infinite;
    pointer-events: none;
  }

  .nav-3d-book:hover:not(:active) {
    animation: none;
    transform: translateY(-4px) rotateX(-5deg);
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.8),
      0 8px 0 #A07000,
      0 12px 0 #6A4500,
      0 14px 0 rgba(0,0,0,0.40),
      0 14px 36px rgba(215,169,23,0.50);
  }

  .nav-3d-book:active {
    animation: none;
    transform: translateY(5px) rotateX(7deg);
    box-shadow:
      0 0 0 1px rgba(215,169,23,0.55),
      0 1px 0 #A07000,
      0 2px 0 #6A4500,
      0 3px 0 rgba(0,0,0,0.35),
      0 3px 14px rgba(215,169,23,0.20);
  }

  .nav-3d-book .book-text { position: relative; z-index: 1; }
  .nav-3d-book .book-icon {
    display: inline-block;
    margin-left: 6px;
    position: relative;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .nav-3d-book:hover .book-icon {
    transform: translateX(4px) rotate(-35deg);
  }

  @media (max-width: 767px) {
    .nav-3d-book { animation: none !important; }
    .nav-3d-book .book-shine { animation: none !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .nav-3d-book,
    .nav-3d-book .book-shine { animation: none !important; }
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const isGateway = location.pathname === "/";
  const isHajjContext = location.pathname.startsWith("/hajj");
  const isTravelContext = location.pathname.startsWith("/travel");

  // Check if current page is a "home" page (transparent background)
  const isHomePage = location.pathname === "/hajj" || 
                     location.pathname === "/hajj/" || 
                     location.pathname === "/travel" || 
                     location.pathname === "/travel/";

  const NAV_LINKS = isHajjContext ? NAV_LINKS_HAJJ : isTravelContext ? NAV_LINKS_TRAVEL : [];
  const SUB_MENUS = isHajjContext ? SUB_MENUS_HAJJ : isTravelContext ? SUB_MENUS_TRAVEL : {};
  const basePath = isHajjContext ? "/hajj" : isTravelContext ? "/travel" : "";

  // ── Active link ───────────────────────────────────────────────────────
  useEffect(() => {
    const path = location.pathname;
    if (path === basePath || path === `${basePath}/`) setActiveLink("Home");
    else if (path.startsWith(`${basePath}/services`)) setActiveLink("Services");
    else if (path.startsWith(`${basePath}/umrah`)) setActiveLink(isHajjContext ? "Hajj & Umrah" : "Visa Services");
    else if (path.startsWith(`${basePath}/contact`)) setActiveLink("Contact");
    else if (isTravelContext && path.includes("visa")) setActiveLink("Visa Services");
  }, [location, basePath, isHajjContext, isTravelContext]);

  // ── Mobile detection ──────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Scroll detection ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Navigation ────────────────────────────────────────────────────────
  const goTo = (section) => {
    setActiveLink(section);
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    const map = {
      "Home": basePath,
      "Services": `${basePath}/services`,
      "Hajj & Umrah": `${basePath}/umrah`,
      "Visa Services": `${basePath}/services`,
      "Contact": `${basePath}/contact`,
    };
    navigate(map[section] || basePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSubPage = (label) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setExpandedMobile(null);
    const map = {
      "Hajj Packages": `${basePath}/packages/hajj`,
      "Umrah Packages": `${basePath}/packages/umrah`,
      "Flight Booking": isHajjContext ? `${basePath}/flight-booking` : "/travel/flights",
      "Hotel Reservation": isHajjContext ? `${basePath}/hotel-reservation` : "/hajj/hotel-reservation",
      "Group Travel": `${basePath}/packages/hajj`,
      "VIP Packages": `${basePath}/packages/hajj`,
      "Student Visa": "/travel/student-visa",
      "Work Visa": "/travel/work-visa",
      "Tourist Visa": "/travel/tourist-visa",
      "Business Visa": "/travel/business-visa",
      "Family Visa": "/travel/family-visa",
    };
    navigate(map[label] || basePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setActiveLink("Home");
    setMenuOpen(false);
    navigate(basePath || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToBooking = () => {
    setMenuOpen(false);
    navigate(isHajjContext ? "/hajj/packages/hajj" : "/travel/flights");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToInquiry = () => {
    setMenuOpen(false);
    navigate(`${basePath}/contact`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Don't render on gateway ───────────────────────────────────────────
  if (isGateway || NAV_LINKS.length === 0) return null;

  // ── Helpers ───────────────────────────────────────────────────────────
  const hasSub = (link) => Boolean(SUB_MENUS[link]);

  // ── Background logic: transparent on home pages (until scroll), solid on sub-pages ──
  const shouldBeTransparent = isHomePage && !scrolled && !isMobile;
  
  const bg = isMobile 
    ? "rgba(6,6,14,0.97)" 
    : shouldBeTransparent 
      ? "transparent" 
      : "rgba(255,255,255,0.95)";
      
  const textColor = shouldBeTransparent || isMobile ? "#fff" : "#111";
  const logoColor = shouldBeTransparent || isMobile ? "#fff" : "#111";
  const borderColor = isMobile 
    ? "1px solid rgba(212,160,23,0.15)" 
    : shouldBeTransparent 
      ? "none" 
      : "1px solid rgba(0,0,0,0.06)";
  const boxShadow = shouldBeTransparent ? "none" : "0 4px 32px rgba(0,0,0,0.08)";

  return (
    <>
      <style>{BOOK_BUTTON_CSS}</style>

      {/* ── Navbar ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: bg,
        backdropFilter: shouldBeTransparent ? "none" : "blur(18px)",
        WebkitBackdropFilter: shouldBeTransparent ? "none" : "blur(18px)",
        borderBottom: borderColor,
        boxShadow,
        transition: "all 0.4s ease",
        minHeight: 64,
      }}>
        <div style={{
          maxWidth: 1340, margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <button onClick={goHome} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "none", border: "none", cursor: "pointer",
            padding: 0,
          }}>
            <Rasaof size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontWeight: 800,
                fontSize: 15, color: logoColor, letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}>RASOAF</span>
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                fontSize: 10, color: logoColor, letterSpacing: "-0.01em",
                lineHeight: 1.1, opacity: 0.85,
              }}>TRAVELS & TOURS</span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontSize: 7,
                fontWeight: 500, color: "#D4A017",
                letterSpacing: "0.15em", textTransform: "uppercase",
                marginTop: 1,
              }}>Limited</span>
            </div>
          </button>

          {/* Desktop Links */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map((link) => (
                <div key={link} style={{ position: "relative" }}>
                  <button
                    onClick={() => hasSub(link) ? setOpenDropdown(openDropdown === link ? null : link) : goTo(link)}
                    style={{
                      fontFamily: "'Inter', sans-serif", fontSize: "0.9rem",
                      fontWeight: activeLink === link ? 700 : 500,
                      letterSpacing: "0.01em",
                      background: "none", border: "none", cursor: "pointer",
                      padding: "10px 16px", borderRadius: 10,
                      color: activeLink === link ? "#D4A017" : textColor,
                      display: "flex", alignItems: "center", gap: 4,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {link}
                    {hasSub(link) && (
                      <ChevronDown size={12} style={{
                        transition: "transform 0.3s",
                        transform: openDropdown === link ? "rotate(180deg)" : "rotate(0)",
                      }} />
                    )}
                  </button>

                  {/* Dropdown */}
                  {hasSub(link) && openDropdown === link && (
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      style={{
                        position: "absolute", top: "100%", left: "50%",
                        transform: "translateX(-50%)",
                        background: "#fff", borderRadius: 16, padding: 8,
                        minWidth: 220,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        border: "1px solid rgba(0,0,0,0.06)", zIndex: 100,
                      }}
                    >
                      {SUB_MENUS[link].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => goToSubPage(item.label)}
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              width: "100%", padding: "10px 14px",
                              borderRadius: 12, border: "none",
                              background: "transparent", cursor: "pointer",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.9rem", fontWeight: 500,
                              color: "#111", textAlign: "left",
                              transition: "background 0.2s ease",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(212,160,23,0.08)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <span style={{
                              width: 30, height: 30, borderRadius: 8,
                              background: "rgba(212,160,23,0.1)",
                              display: "flex", alignItems: "center",
                              justifyContent: "center", flexShrink: 0,
                            }}>
                              <Icon size={14} color="#B8860B" />
                            </span>
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
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
                  fontFamily: "'Inter', sans-serif", fontSize: "0.85rem",
                  fontWeight: 600, padding: "9px 20px", borderRadius: 100,
                  background: "transparent",
                  border: `1.5px solid ${shouldBeTransparent ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"}`,
                  color: textColor, cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D4A017"; e.currentTarget.style.color = "#D4A017"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = shouldBeTransparent ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)"; e.currentTarget.style.color = textColor; }}
              >
                {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
              </button>

              {/* ═══ 3-D BOOK NOW BUTTON ═══ */}
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
              style={{
                width: 44, height: 44,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(212,160,23,0.1)",
                border: "1px solid rgba(212,160,23,0.3)",
                borderRadius: 12, cursor: "pointer", color: "#D4A017",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && isMobile && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)", zIndex: 999,
          }} />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: "min(85vw, 340px)", background: "#0a0a14",
            zIndex: 1000, padding: "24px 16px",
            display: "flex", flexDirection: "column", gap: 4,
            overflowY: "auto",
            borderLeft: "1px solid rgba(212,160,23,0.15)",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
              <button onClick={() => setMenuOpen(false)} style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(212,160,23,0.1)",
                border: "1px solid rgba(212,160,23,0.3)",
                cursor: "pointer", color: "#D4A017",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={20} /></button>
            </div>

            {NAV_LINKS.map((link) => (
              <div key={link}>
                <button
                  onClick={() => hasSub(link) ? setExpandedMobile(expandedMobile === link ? null : link) : goTo(link)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    padding: "16px", fontFamily: "'Inter', sans-serif",
                    fontSize: "1rem", fontWeight: 500,
                    color: activeLink === link ? "#D4A017" : "rgba(255,255,255,0.85)",
                    background: "none", border: "none", cursor: "pointer",
                    borderRadius: 12, transition: "all 0.2s ease",
                  }}
                >
                  {link}
                  {hasSub(link) && <span>{expandedMobile === link ? "−" : "+"}</span>}
                </button>

                {hasSub(link) && expandedMobile === link && (
                  <div style={{ paddingLeft: 20, marginTop: 4 }}>
                    {SUB_MENUS[link].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSubPage(item.label)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          width: "100%", padding: "12px 14px",
                          borderRadius: 10, border: "none",
                          background: "transparent", cursor: "pointer",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.9rem",
                          color: "rgba(255,255,255,0.6)",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ color: "#D4A017" }}>•</span> {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={goToInquiry}
                style={{
                  width: "100%", padding: "14px", borderRadius: 100,
                  background: "transparent",
                  border: "1px solid rgba(212,160,23,0.3)",
                  color: "#D4A017", fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
                }}
              >
                {isHajjContext ? "Hajj Inquiry" : "Travel Inquiry"}
              </button>
              <button
                onClick={goToBooking}
                style={{
                  width: "100%", padding: "14px", borderRadius: 100,
                  background: "linear-gradient(135deg, #F7C948, #D4A017)",
                  color: "#111", fontFamily: "'Inter', sans-serif",
                  fontWeight: 600, fontSize: "0.95rem",
                  border: "none", cursor: "pointer",
                }}
              >
                Book Now ✈
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}