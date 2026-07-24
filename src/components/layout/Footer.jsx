// src/components/layout/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Modern Footer Section (v3.0)
// Optimized: Font preloading · Respects reduced motion · CSS-driven hover
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useRef, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Shield,
  Plane,
  Hotel,
  Compass,
  Star,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Heart,
  Building2,
} from "lucide-react";
import "./Footer.css";

// ══════════════════════════════════════════════════════════════════════════
// Custom Social Icons — Module scope
// ══════════════════════════════════════════════════════════════════════════
const InstagramIcon = memo(function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
});

const FacebookIcon = memo(function FacebookIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
});

const TwitterIcon = memo(function TwitterIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
});

// ══════════════════════════════════════════════════════════════════════════
// Scroll-to-top — respects reduced motion
// ══════════════════════════════════════════════════════════════════════════
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

const scrollToTop = (() => {
  let _reduced = false;
  // Update reduced motion preference (called once on mount)
  const update = (reduced) => {
    _reduced = reduced;
  };
  const fn = () => {
    window.scrollTo({
      top: 0,
      behavior: _reduced ? "instant" : "smooth",
    });
  };
  fn.update = update;
  return fn;
})();

// ══════════════════════════════════════════════════════════════════════════
// Data — Module scope, frozen
// ══════════════════════════════════════════════════════════════════════════
const QUICK_LINKS = Object.freeze([
  { name: "Home", href: "/" },
  { name: "Travel & Tours", href: "/travel" },
  { name: "Hajj & Umrah", href: "/hajj" },
  { name: "Flight Booking", href: "/travel/flights" },
  { name: "Hotel Reservation", href: "/hajj/hotel-reservation" },
  { name: "Visa Services", href: "/travel/services" },
  { name: "Contact Us", href: "/travel/contact" },
]);

const SERVICES_LIST = Object.freeze([
  { name: "Student Visa", icon: GraduationCap, href: "/travel/student-visa" },
  { name: "Work Visa", icon: Briefcase, href: "/travel/work-visa" },
  { name: "Tourist Visa", icon: Plane, href: "/travel/tourist-visa" },
  { name: "Business Visa", icon: Building2, href: "/travel/business-visa" },
  { name: "Family Visa", icon: Heart, href: "/travel/family-visa" },
  { name: "Flight Booking", icon: Plane, href: "/travel/flights" },
  { name: "Hotel Reservation", icon: Hotel, href: "/travel/hotel-reservation" },
  { name: "Hajj Packages", icon: Compass, href: "/hajj/packages/hajj" },
  { name: "Umrah Packages", icon: Star, href: "/hajj/packages/umrah" },
]);

const SOCIAL_LINKS = Object.freeze([
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/2348022352362",
    color: "#25D366",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    href: "https://www.instagram.com/rasoaftravelsandtours/",
    color: "#E4405F",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    href: "https://www.facebook.com/profile.php?id=61590695552485",
    color: "#1877F2",
  },
  {
    name: "X (Twitter)",
    icon: TwitterIcon,
    href: "https://x.com/Rasoaftravels",
    color: "#000000",
  },
]);

// ══════════════════════════════════════════════════════════════════════════
// Current Year — computed once at module scope
// ══════════════════════════════════════════════════════════════════════════
const CURRENT_YEAR = new Date().getFullYear();

// ══════════════════════════════════════════════════════════════════════════
// Hook: IntersectionObserver
// ══════════════════════════════════════════════════════════════════════════
function useInView(threshold = 0.05) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

// ══════════════════════════════════════════════════════════════════════════
// Brand Column — Memoized
// ══════════════════════════════════════════════════════════════════════════
const FooterBrand = memo(function FooterBrand() {
  return (
    <div className="footer-brand">
      <Link
        to="/"
        onClick={scrollToTop}
        className="footer-logo"
        aria-label="RASOAF Travels and Tours — Home"
      >
        <span className="footer-logo-mark" aria-hidden="true">
          R
        </span>
        <span className="footer-logo-text">
          <span className="footer-logo-name">RASOAF</span>
          <span className="footer-logo-sub">Travels &amp; Tours Ltd</span>
        </span>
      </Link>

      <p className="footer-brand-desc">
        RASAOF Travels and Tours Limited provides trusted travel and tours
        services including visa processing, flight booking, hotel reservation,
        and holiday packages worldwide.
      </p>

      <ul
        className="footer-social-list"
        role="list"
        aria-label="Follow RASOAF on social media"
      >
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
                style={{
                  "--social-color": social.color,
                  "--social-shadow": `${social.color}40`,
                }}
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
FooterBrand.displayName = "FooterBrand";

// ══════════════════════════════════════════════════════════════════════════
// Shared Nav List — Memoized
// ══════════════════════════════════════════════════════════════════════════
const FooterNavList = memo(function FooterNavList({
  title,
  items,
  ariaLabel,
  showIcons = false,
}) {
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
                  <Icon
                    size={14}
                    className="footer-service-icon"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronRight
                    size={12}
                    className="footer-link-chevron"
                    aria-hidden="true"
                  />
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
FooterNavList.displayName = "FooterNavList";

// ══════════════════════════════════════════════════════════════════════════
// Contact Column — Memoized
// ══════════════════════════════════════════════════════════════════════════
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
          <span>
            3 Bolaji Taylor Street, Off Alhaji Haruna Street, Ifako Ijaiye,
            Lagos, Nigeria
          </span>
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

        <Link
          to="/travel/contact"
          onClick={scrollToTop}
          className="footer-btn footer-btn-consult"
        >
          <span className="footer-btn-consult-label">Get Consultation</span>
          <ArrowRight
            size={16}
            className="footer-btn-consult-arrow"
            aria-hidden="true"
          />
          <span className="footer-btn-consult-shine" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
});
FooterContact.displayName = "FooterContact";

// ══════════════════════════════════════════════════════════════════════════
// Main Footer Component
// ══════════════════════════════════════════════════════════════════════════
export default function Footer() {
  const [sectionRef, inView] = useInView(0.05);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Update scrollToTop behavior based on reduced motion preference
  useEffect(() => {
    scrollToTop.update(prefersReducedMotion);
  }, [prefersReducedMotion]);

  // Scroll to top on route change (only when pathname changes)
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <footer
      className="footer-section"
      ref={sectionRef}
      role="contentinfo"
    >
      <div className="footer-container">
        <div className={`footer-grid${inView ? " is-inview" : ""}`}>
          <div className="footer-col">
            <FooterBrand />
          </div>
          <div className="footer-col">
            <FooterNavList
              title="Quick Links"
              items={QUICK_LINKS}
              ariaLabel="Quick links"
            />
          </div>
          <div className="footer-col">
            <FooterNavList
              title="Our Services"
              items={SERVICES_LIST}
              ariaLabel="Our services"
              showIcons
            />
          </div>
          <div className="footer-col">
            <FooterContact />
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {CURRENT_YEAR} RASAOF Travels and Tours Limited. All rights
            reserved.
          </span>
          <span className="trust-badge">
            <Shield size={14} aria-hidden="true" />
            <span>Licensed &amp; Trusted Travel Operator</span>
          </span>
        </div>
      </div>
    </footer>
  );
}