// src/components/layout/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Modern Footer Section
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: 4-column responsive grid + bottom bar
// Responsive: 4 → 2 → 1 columns (desktop → tablet → mobile)
// Updated: Correct routing for /hajj/* and /travel/* architecture
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone, Mail, MapPin, MessageCircle, ArrowRight,
  Shield, Globe, Plane, Hotel, Users, Compass, Star, ChevronRight,
} from "lucide-react";

// ── Custom Social Icons ──────────────────────────────────────────────────
const InstagramIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// ── Scroll To Top Hook ───────────────────────────────────────────────────
function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}

// ── Data — Updated routes for new architecture ───────────────────────────
const QUICK_LINKS = [
  { name: "Home", href: "/hajj" },
  { name: "Hajj Packages", href: "/hajj/packages/hajj" },
  { name: "Umrah Packages", href: "/hajj/packages/umrah" },
  { name: "Flight Booking", href: "/hajj/flight-booking" },
  { name: "Hotel Reservation", href: "/hajj/hotel-reservation" },
  { name: "Visa Services", href: "/travel/student-visa" },
  { name: "Travel & Tours", href: "/travel" },
  { name: "Contact", href: "/hajj/contact" },
];

const SERVICES_LIST = [
  { name: "Hajj Packages", icon: Compass, href: "/hajj/packages/hajj" },
  { name: "Umrah Packages", icon: Star, href: "/hajj/packages/umrah" },
  { name: "Visa Services", icon: Shield, href: "/travel/student-visa" },
  { name: "Flight Booking", icon: Plane, href: "/hajj/flight-booking" },
  { name: "Hotel Reservation", icon: Hotel, href: "/hajj/hotel-reservation" },
  { name: "Group & Family Travel", icon: Users, href: "/hajj/packages/hajj" },
  { name: "International Tours", icon: Globe, href: "/travel/tourist-visa" },
];

const SOCIAL_LINKS = [
  { name: "WhatsApp", icon: MessageCircle, href: "https://wa.me/2348022352362", color: "#25D366" },
  { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/rasoaftravelsandtours/", color: "#E4405F" },
  { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61590695552485", color: "#1877F2" },
  { name: "X (Twitter)", icon: TwitterIcon, href: "https://x.com/Rasoaftravels", color: "#000000" },
];

// ── Hook: IntersectionObserver ───────────────────────────────────────────
function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Brand Column ─────────────────────────────────────────────────────────
function FooterBrand({ inView }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #D4A017, #F7C948)", display: "flex", alignItems: "center", justifyContent: "center", color: "#111", fontWeight: 800, fontSize: "20px", fontFamily: "'Manrope', serif", flexShrink: 0 }}>R</div>
        <div>
          <div style={{ fontFamily: "'Manrope', sans-serif", fontSize: "clamp(1.1rem, 1.3vw, 1.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>RASAOF</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(8px, 0.6vw, 10px)", fontWeight: 500, color: "rgba(212,160,23,0.7)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Travels & Tours Ltd</div>
        </div>
      </div>
      {/* Description */}
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.9vw, 14px)", fontWeight: 400, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "280px" }}>
        RASAOF Travels and Tours Limited provides trusted Hajj, Umrah, and international travel services with comfort, care, and professionalism.
      </p>
      {/* Social Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          const isHovered = hoveredSocial === social.name;
          return (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${social.name}`}
              onMouseEnter={() => setHoveredSocial(social.name)} onMouseLeave={() => setHoveredSocial(null)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "clamp(36px, 4vw, 40px)", height: "clamp(36px, 4vw, 40px)", borderRadius: "50%", background: isHovered ? social.color : "rgba(255,255,255,0.06)", color: isHovered ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", transform: isHovered ? "scale(1.12) translateY(-2px)" : "scale(1)", boxShadow: isHovered ? `0 4px 20px ${social.color}40` : "none", minHeight: "44px" }}>
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ── Quick Links Column ───────────────────────────────────────────────────
function FooterLinks({ inView }) {
  const [hoveredLink, setHoveredLink] = useState(null);
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
      <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "0.02em" }}>Quick Links</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "clamp(6px, 0.8vw, 8px)" }}>
        {QUICK_LINKS.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.href} 
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              onMouseEnter={() => setHoveredLink(link.name)} 
              onMouseLeave={() => setHoveredLink(null)}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.85vw, 14px)", fontWeight: 400, color: hoveredLink === link.name ? "#D4A017" : "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.3s ease", transform: hoveredLink === link.name ? "translateX(4px)" : "translateX(0)", minHeight: "44px", padding: "4px 0" }}>
              <ChevronRight size={12} style={{ opacity: hoveredLink === link.name ? 1 : 0, transition: "all 0.3s ease", color: "#D4A017" }} />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Services Column ──────────────────────────────────────────────────────
function FooterServices({ inView }) {
  const [hoveredService, setHoveredService] = useState(null);
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s" }}>
      <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "0.02em" }}>Our Services</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "clamp(6px, 0.8vw, 8px)" }}>
        {SERVICES_LIST.map((service) => {
          const Icon = service.icon;
          const isHovered = hoveredService === service.name;
          return (
            <li key={service.name}>
              <Link 
                to={service.href} 
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                onMouseEnter={() => setHoveredService(service.name)} 
                onMouseLeave={() => setHoveredService(null)}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.85vw, 14px)", fontWeight: 400, color: isHovered ? "#D4A017" : "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.3s ease", transform: isHovered ? "translateX(4px)" : "translateX(0)", minHeight: "44px", padding: "4px 0" }}>
                <Icon size={14} style={{ color: isHovered ? "#D4A017" : "rgba(255,255,255,0.2)", transition: "color 0.3s ease" }} />
                <span>{service.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Contact Column ───────────────────────────────────────────────────────
function FooterContact({ inView }) {
  const [hoveredCta, setHoveredCta] = useState(false);
  const [hoveredConsult, setHoveredConsult] = useState(false);
  return (
    <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
      <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 700, color: "#fff", marginBottom: "16px", letterSpacing: "0.02em" }}>Get in Touch</h4>
      {/* Contact Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        <a href="tel:+2348022352362" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.85vw, 14px)", fontWeight: 400, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s ease", minHeight: "44px" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#D4A017"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
          <Phone size={16} color="#D4A017" /><span>+234 802 235 2362</span>
        </a>
        <a href="mailto:info@rasoaf.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.85vw, 14px)", fontWeight: 400, color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s ease", minHeight: "44px" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#D4A017"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
          <Mail size={16} color="#D4A017" /><span>info@rasoaf.com</span>
        </a>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 0.85vw, 14px)", fontWeight: 400, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
          <MapPin size={16} color="#D4A017" style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>3 Bolaji Taylor Street, Off Alhaji Haruna Street, Ifako Ijaiye, Lagos, Nigeria</span>
        </div>
      </div>
      {/* CTA Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* WhatsApp Button */}
        <a href="https://wa.me/2348022352362?text=Hello%20RASAOF%20Travels%2C%20I'd%20like%20to%20inquire%20about%20your%20services" target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setHoveredCta(true)} onMouseLeave={() => setHoveredCta(false)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 0.9vw, 15px)", fontWeight: 600, color: "#fff", background: "#25D366", padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)", borderRadius: "12px", textDecoration: "none", transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", boxShadow: hoveredCta ? "0 4px 24px rgba(37,211,102,0.45)" : "0 4px 16px rgba(37,211,102,0.25)", transform: hoveredCta ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)", width: "100%", minHeight: "44px" }}>
          <MessageCircle size={18} /><span>Chat on WhatsApp</span>
        </a>
        {/* ── 3-D Get Consultation Button ── */}
        <Link 
          to="/hajj/contact" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
          onMouseEnter={() => setHoveredConsult(true)} onMouseLeave={() => setHoveredConsult(false)}
          style={{ 
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", 
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(13px, 0.9vw, 15px)", fontWeight: 600, 
            color: "#111", 
            background: "linear-gradient(135deg, #F7C948 0%, #D4A017 45%, #B8860B 100%)",
            padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)", 
            borderRadius: "12px", textDecoration: "none", 
            transition: "all 0.3s cubic-bezier(0.25,1,0.5,1)", 
            width: "100%", minHeight: "44px",
            position: "relative",
            overflow: "hidden",
            boxShadow: hoveredConsult 
              ? "0 6px 0 #A07000, 0 10px 0 #6A4500, 0 14px 0 rgba(0,0,0,0.35), 0 20px 40px rgba(212,160,23,0.45)"
              : "0 4px 0 #A07000, 0 7px 0 #6A4500, 0 9px 0 rgba(0,0,0,0.40), 0 9px 22px rgba(215,169,23,0.30)",
            transform: hoveredConsult ? "translateY(-3px)" : "translateY(0)",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Get Consultation</span>
          <ArrowRight size={16} style={{ position: "relative", zIndex: 1, transition: "transform 0.3s ease", transform: hoveredConsult ? "translateX(4px)" : "translateX(0)" }} />
          {/* Top highlight bevel */}
          <span style={{ position: "absolute", inset: 0, borderRadius: "12px", background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 55%)", pointerEvents: "none" }} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

// ── Main Footer Component ────────────────────────────────────────────────
export default function Footer() {
  const [sectionRef, inView] = useInView(0.05);
  const [currentYear] = useState(new Date().getFullYear());
  useScrollToTop();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700;800&display=swap');

        .footer-section { background: #0a0a0e; position: relative; overflow: hidden; }
        .footer-section::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: clamp(80px, 20vw, 200px); height: 2px; background: linear-gradient(90deg, transparent, #D4A017, transparent); border-radius: 999px; }
        .footer-section::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 60%; height: 30%; background: radial-gradient(ellipse at center, rgba(212,160,23,0.03) 0%, transparent 70%); pointer-events: none; }
        .footer-container { max-width: 1200px; margin: 0 auto; padding: clamp(48px, 8vh, 72px) clamp(16px, 4vw, 48px) clamp(32px, 4vh, 48px); position: relative; z-index: 1; }
        .footer-grid { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1.2fr; gap: clamp(32px, 4vw, 48px); padding-bottom: clamp(32px, 4vh, 48px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .footer-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; padding-top: clamp(20px, 2vh, 28px); font-family: 'Inter', sans-serif; font-size: clamp(11px, 0.8vw, 13px); font-weight: 400; color: rgba(255,255,255,0.35); }
        .footer-bottom .trust-badge { display: inline-flex; align-items: center; gap: 6px; color: rgba(212,160,23,0.6); font-weight: 500; }
        .footer-bottom .trust-badge svg { color: #D4A017; }

        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) { .footer-container { padding: clamp(36px, 5vh, 48px) clamp(14px, 3vw, 20px) clamp(24px, 3vh, 32px); } .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-bottom { flex-direction: column; text-align: center; } }
        @media (max-width: 480px) { .footer-grid { gap: 24px; } }
        @media (prefers-reduced-motion: reduce) { .footer-brand, .footer-links, .footer-services, .footer-contact { opacity: 1 !important; transform: none !important; transition: none !important; } }
        @media (hover: none) { .footer-brand a, .footer-links a, .footer-services a, .footer-contact a { transition: none !important; } }
      `}</style>

      <footer className="footer-section" ref={sectionRef} role="contentinfo">
        <div className="footer-container">
          <div className="footer-grid">
            <FooterBrand inView={inView} />
            <FooterLinks inView={inView} />
            <FooterServices inView={inView} />
            <FooterContact inView={inView} />
          </div>
          <div className="footer-bottom">
            <span>© {currentYear} RASAOF Travels and Tours Limited. All rights reserved.</span>
            <span className="trust-badge"><Shield size={14} /><span>Licensed & Trusted Travel Operator</span></span>
          </div>
        </div>
      </footer>
    </>
  );
}