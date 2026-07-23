// src/components/layout/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Modern Footer Section
//
// Design System: Manrope (headings) · Inter (body) · Yellow/Black brand
// Layout: 4-column responsive grid + bottom bar
// Responsive: 4 → 2 → 1 columns (desktop → tablet/large phone → small phone)
//
// Refactor notes (see chat for full writeup):
//  - All inline styles moved to Footer.css; the only inline styles left are
//    per-item CSS custom properties for the social brand colors, which are
//    genuinely data-driven and can't live in static CSS.
//  - Hover states (5 separate useState calls) replaced entirely with CSS
//    :hover / :focus-visible — nothing re-renders on mouse move anymore.
//  - Quick Links / Our Services shared 90% identical JSX; extracted into
//    one FooterNavList component.
//  - Every column is React.memo'd with stable/no props, so once inView
//    flips true they never re-render again.
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone, Mail, MapPin, MessageCircle, ArrowRight,
  Shield, Plane, Hotel, Compass, Star, ChevronRight,
  GraduationCap, Briefcase, Heart, Building2,
} from "lucide-react";
import "./Footer.css";

// ── Custom Social Icons ──────────────────────────────────────────────────
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// ── Stable handler — defined once at module scope so every Link in every
//    map() reuses the exact same function reference instead of a fresh
//    closure per render. ──────────────────────────────────────────────────
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

// ── Scroll To Top Hook ───────────────────────────────────────────────────
function useScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}

// ── Data — Corrected routes ──────────────────────────────────────────────
const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Travel & Tours", href: "/travel" },
  { name: "Hajj & Umrah", href: "/hajj" },
  { name: "Flight Booking", href: "/travel/flights" },
  { name: "Hotel Reservation", href: "/hajj/hotel-reservation" },
  { name: "Visa Services", href: "/travel/services" },
  { name: "Contact Us", href: "/travel/contact" },
];

const SERVICES_LIST = [
  { name: "Student Visa", icon: GraduationCap, href: "/travel/student-visa" },
  { name: "Work Visa", icon: Briefcase, href: "/travel/work-visa" },
  { name: "Tourist Visa", icon: Plane, href: "/travel/tourist-visa" },
  { name: "Business Visa", icon: Building2, href: "/travel/business-visa" },
  { name: "Family Visa", icon: Heart, href: "/travel/family-visa" },
  { name: "Flight Booking", icon: Plane, href: "/travel/flights" },
  { name: "Hotel Reservation", icon: Hotel, href: "/travel/hotel-reservation" },
  { name: "Hajj Packages", icon: Compass, href: "/hajj/packages/hajj" },
  { name: "Umrah Packages", icon: Star, href: "/hajj/packages/umrah" },
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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Brand Column ─────────────────────────────────────────────────────────
const FooterBrand = memo(function FooterBrand() {
  return (
    <div className="footer-brand">
      <Link to="/" onClick={scrollToTop} className="footer-logo" aria-label="RASOAF Travels and Tours — Home">
        <span className="footer-logo-mark" aria-hidden="true">R</span>
        <span className="footer-logo-text">
          <span className="footer-logo-name">RASOAF</span>
          <span className="footer-logo-sub">Travels &amp; Tours Ltd</span>
        </span>
      </Link>

      <p className="footer-brand-desc">
        RASAOF Travels and Tours Limited provides trusted travel and tours services including visa processing, flight booking, hotel reservation, and holiday packages worldwide.
      </p>

      <ul className="footer-social-list" role="list" aria-label="Follow RASOAF on social media">
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          return (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="footer-social-link"
                style={{ "--social-color": social.color, "--social-shadow": `${social.color}40` }}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// ── Shared Quick Links / Our Services Column ─────────────────────────────
const FooterNavList = memo(function FooterNavList({ title, items, ariaLabel, showIcons = false }) {
  return (
    <nav aria-label={ariaLabel}>
      <h2 className="footer-col-title">{title}</h2>
      <ul className="footer-nav-list" role="list">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <Link
                to={item.href}
                onClick={scrollToTop}
                className={showIcons ? "footer-service-link" : "footer-link"}
              >
                {showIcons ? (
                  <Icon size={14} className="footer-service-icon" aria-hidden="true" />
                ) : (
                  <ChevronRight size={12} className="footer-link-chevron" aria-hidden="true" />
                )}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

// ── Contact Column ───────────────────────────────────────────────────────
const FooterContact = memo(function FooterContact() {
  return (
    <div className="footer-contact">
      <h2 className="footer-col-title">Get in Touch</h2>

      <address className="footer-contact-info">
        <a href="tel:+2348022352362" className="footer-contact-link">
          <Phone size={16} color="#D4A017" aria-hidden="true" />
          <span>+234 802 235 2362</span>
        </a>
        <a href="mailto:info@rasoaf.com" className="footer-contact-link">
          <Mail size={16} color="#D4A017" aria-hidden="true" />
          <span>info@rasoaf.com</span>
        </a>
        <div className="footer-contact-address">
          <MapPin size={16} color="#D4A017" aria-hidden="true" />
          <span>3 Bolaji Taylor Street, Off Alhaji Haruna Street, Ifako Ijaiye, Lagos, Nigeria</span>
        </div>
      </address>

      <div className="footer-cta-group">
        <a
          href="https://wa.me/2348022352362?text=Hello%20RASOAF%20Travels%2C%20I'd%20like%20to%20inquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-btn footer-btn-whatsapp"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span>Chat on WhatsApp</span>
        </a>

        <Link to="/travel/contact" onClick={scrollToTop} className="footer-btn footer-btn-consult">
          <span className="footer-btn-consult-label">Get Consultation</span>
          <ArrowRight size={16} className="footer-btn-consult-arrow" aria-hidden="true" />
          <span className="footer-btn-consult-shine" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
});

// ── Main Footer Component ────────────────────────────────────────────────
export default function Footer() {
  const [sectionRef, inView] = useInView(0.05);
  const currentYear = new Date().getFullYear();
  useScrollToTop();

  return (
    <footer className="footer-section" ref={sectionRef} role="contentinfo">
      <div className="footer-container">
        <div className={`footer-grid${inView ? " is-inview" : ""}`}>
          <div className="footer-col">
            <FooterBrand />
          </div>
          <div className="footer-col">
            <FooterNavList title="Quick Links" items={QUICK_LINKS} ariaLabel="Quick links" />
          </div>
          <div className="footer-col">
            <FooterNavList title="Our Services" items={SERVICES_LIST} ariaLabel="Our services" showIcons />
          </div>
          <div className="footer-col">
            <FooterContact />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} RASAOF Travels and Tours Limited. All rights reserved.</span>
          <span className="trust-badge">
            <Shield size={14} aria-hidden="true" />
            <span>Licensed &amp; Trusted Travel Operator</span>
          </span>
        </div>
      </div>
    </footer>
  );
}