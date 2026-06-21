// src/components/layout/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Footer Section
//
// A premium, high-trust footer that reinforces credibility, improves
// navigation, and encourages final conversions.
//
// Design: Dark charcoal background, gold accents, light text
// Layout: 4-column responsive grid + bottom bar
// Animation: Hover glow, scale, slide-in effects
// Responsive: 4 → 2 → 1 columns (desktop → tablet → mobile)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ArrowRight,
  Shield,
  CheckCircle,
  Award,
  Globe,
  Plane,
  Hotel,
  Users,
  Compass,
  Star,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react";

// ── Custom Icons (for icons not exported in some Lucide versions) ──────────

const InstagramIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

// ── Quick Links Data ──────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Hajj Packages", href: "/packages/hajj" },
  { name: "Umrah Packages", href: "/packages/umrah" },
  { name: "Visa Services", href: "/visa" },
  { name: "Flights & Hotels", href: "/flights-hotels" },
  { name: "Destinations", href: "/destinations" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

// ── Services Data ─────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  { name: "Hajj Packages", icon: Compass },
  { name: "Umrah Packages", icon: Star },
  { name: "Visa Assistance", icon: Shield },
  { name: "Flight Booking", icon: Plane },
  { name: "Hotel Reservation", icon: Hotel },
  { name: "Group & Family Travel", icon: Users },
  { name: "International Tours", icon: Globe },
];

// ── Social Media Data ─────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/2341234567890",
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
];

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
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

// ── Footer Brand Column ──────────────────────────────────────────────────────
function FooterBrand({ inView }) {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <div
      className="footer-brand"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #C4972A, #e8b840)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0a0a2e",
            fontWeight: 800,
            fontSize: "20px",
            fontFamily: "'Playfair Display', serif",
            flexShrink: 0,
          }}
        >
          R
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 1.3vw, 1.4rem)",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            RASAOF
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(8px, 0.6vw, 10px)",
              fontWeight: 500,
              color: "rgba(196,151,42,0.7)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Travels & Tours Ltd
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(12px, 0.9vw, 14px)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.65)",
          lineHeight: 1.7,
          marginBottom: "20px",
          maxWidth: "280px",
        }}
      >
        RASAOF Travels and Tours Limited provides trusted Hajj, Umrah, and
        international travel services with comfort, care, and professionalism.
      </p>

      {/* Social Icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {SOCIAL_LINKS.map((social) => {
          const Icon = social.icon;
          const isHovered = hoveredSocial === social.name;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social.name}`}
              onMouseEnter={() => setHoveredSocial(social.name)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: isHovered ? social.color : "rgba(255,255,255,0.06)",
                color: isHovered ? "#ffffff" : "rgba(255,255,255,0.5)",
                transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                transform: isHovered ? "scale(1.12) translateY(-2px)" : "scale(1) translateY(0)",
                boxShadow: isHovered ? `0 4px 20px ${social.color}40` : "none",
              }}
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ── Footer Links Column ──────────────────────────────────────────────────────
function FooterLinks({ inView }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <div
      className="footer-links"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px, 1vw, 15px)",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "16px",
          letterSpacing: "0.02em",
        }}
      >
        Quick Links
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {QUICK_LINKS.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(12px, 0.85vw, 14px)",
                fontWeight: 400,
                color: hoveredLink === link.name ? "#C4972A" : "rgba(255,255,255,0.6)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.3s ease",
                transform: hoveredLink === link.name ? "translateX(4px)" : "translateX(0)",
                position: "relative",
              }}
            >
              <ChevronRight
                size={12}
                style={{
                  opacity: hoveredLink === link.name ? 1 : 0,
                  transform: hoveredLink === link.name ? "translateX(0)" : "translateX(-6px)",
                  transition: "all 0.3s ease",
                  color: "#C4972A",
                }}
              />
              <span>{link.name}</span>
              {hoveredLink === link.name && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: "0",
                    width: "100%",
                    height: "1.5px",
                    background: "#C4972A",
                    borderRadius: "999px",
                  }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Footer Services Column ───────────────────────────────────────────────────
function FooterServices({ inView }) {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div
      className="footer-services"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px, 1vw, 15px)",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "16px",
          letterSpacing: "0.02em",
        }}
      >
        Our Services
      </h4>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {SERVICES_LIST.map((service) => {
          const Icon = service.icon;
          const isHovered = hoveredService === service.name;
          return (
            <li key={service.name}>
              <a
                href={`/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                onMouseEnter={() => setHoveredService(service.name)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(12px, 0.85vw, 14px)",
                  fontWeight: 400,
                  color: isHovered ? "#C4972A" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                  transform: isHovered ? "translateX(4px)" : "translateX(0)",
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: isHovered ? "#C4972A" : "rgba(255,255,255,0.2)",
                    transition: "color 0.3s ease",
                  }}
                />
                <span>{service.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Footer Contact Column ────────────────────────────────────────────────────
function FooterContact({ inView }) {
  const [hoveredCta, setHoveredCta] = useState(false);

  return (
    <div
      className="footer-contact"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease 0.3s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
      }}
    >
      <h4
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(13px, 1vw, 15px)",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: "16px",
          letterSpacing: "0.02em",
        }}
      >
        Get in Touch
      </h4>

      {/* Contact Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <a
          href="tel:+2341234567890"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(12px, 0.85vw, 14px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#C4972A"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
        >
          <Phone size={16} color="#C4972A" />
          <span>+234 123 456 7890</span>
        </a>

        <a
          href="mailto:rasoaf24@gmail.com"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(12px, 0.85vw, 14px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#C4972A"}
          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
        >
          <Mail size={16} color="#C4972A" />
          <span>rasoaf24@gmail.com</span>
        </a>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(12px, 0.85vw, 14px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <MapPin size={16} color="#C4972A" />
          <span>Lagos, Nigeria</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <a
          href="https://wa.me/2341234567890?text=Hello%20RASAOF%20Travels%2C%20I'd%20like%20to%20inquire%20about%20Hajj%20and%20Umrah%20packages"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredCta(true)}
          onMouseLeave={() => setHoveredCta(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 0.9vw, 15px)",
            fontWeight: 600,
            color: "#ffffff",
            background: "#25D366",
            padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
            boxShadow: hoveredCta
              ? "0 4px 24px rgba(37, 211, 102, 0.45)"
              : "0 4px 16px rgba(37, 211, 102, 0.25)",
            transform: hoveredCta ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
            width: "100%",
            animation: hoveredCta ? "cta-pulse 2s ease-in-out infinite" : "none",
          }}
        >
          <MessageCircle size={18} />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 0.9vw, 15px)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.8)",
            background: "rgba(255,255,255,0.06)",
            padding: "clamp(10px, 1vw, 12px) clamp(20px, 2vw, 28px)",
            borderRadius: "12px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(196,151,42,0.1)";
            e.currentTarget.style.borderColor = "rgba(196,151,42,0.2)";
            e.currentTarget.style.color = "#C4972A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.8)";
          }}
        >
          <span>Get Consultation</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [sectionRef, inView] = useInView(0.05);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

        @keyframes cta-pulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(37, 211, 102, 0.45); }
          50% { box-shadow: 0 4px 32px rgba(37, 211, 102, 0.65); }
        }

        .footer-section {
          background: #0a0a0e;
          position: relative;
          overflow: hidden;
        }

        /* Decorative top line */
        .footer-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(80px, 20vw, 200px);
          height: 2px;
          background: linear-gradient(90deg, transparent, #C4972A, transparent);
          border-radius: 999px;
        }

        /* Subtle background glow */
        .footer-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 30%;
          background: radial-gradient(ellipse at center, rgba(196,151,42,0.03) 0%, transparent 70%);
          pointer-events: none;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(48px, 8vh, 72px) clamp(16px, 4vw, 48px) clamp(32px, 4vh, 48px);
          position: relative;
          z-index: 1;
        }

        /* ── Grid ────────────────────────────────────────────────────────── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.2fr;
          gap: clamp(32px, 4vw, 48px);
          padding-bottom: clamp(32px, 4vh, 48px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ── Bottom Bar ──────────────────────────────────────────────────── */
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: clamp(20px, 2vh, 28px);
          font-family: 'Inter', sans-serif;
          font-size: clamp(11px, 0.8vw, 13px);
          font-weight: 400;
          color: rgba(255,255,255,0.35);
        }

        .footer-bottom .trust-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(196,151,42,0.6);
          font-weight: 500;
        }

        .footer-bottom .trust-badge svg {
          color: #C4972A;
        }

        .footer-bottom-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
        }

        .footer-bottom-links a {
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #C4972A;
        }

        .footer-bottom-links .divider {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: clamp(32px, 4vw, 40px);
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 768px) {
          .footer-container {
            padding: clamp(36px, 5vh, 48px) clamp(14px, 3vw, 20px) clamp(24px, 3vh, 32px);
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom-links {
            justify-content: center;
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            gap: 24px;
          }
          .footer-bottom-links {
            gap: 8px;
          }
          .footer-bottom-links .divider {
            display: none;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .footer-brand,
          .footer-links,
          .footer-services,
          .footer-contact {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .footer-section::before {
            animation: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .footer-brand a,
          .footer-links a,
          .footer-services a,
          .footer-contact a {
            transition: none !important;
          }
          .footer-brand a:hover,
          .footer-links a:hover,
          .footer-services a:hover,
          .footer-contact a:hover {
            transform: none !important;
          }
        }
      `}</style>

      <footer className="footer-section" ref={sectionRef} role="contentinfo">
        <div className="footer-container">
          {/* Main Footer Grid */}
          <div className="footer-grid">
            <FooterBrand inView={inView} />
            <FooterLinks inView={inView} />
            <FooterServices inView={inView} />
            <FooterContact inView={inView} />
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>
                © {currentYear} RASAOF Travels and Tours Limited. All rights reserved.
              </span>
            </div>

            <div className="footer-bottom-links">
              <span className="trust-badge">
                <Shield size={14} />
                <span>Licensed & Trusted Travel Operator</span>
              </span>
              <span className="divider" aria-hidden="true" />
              <a href="/privacy-policy">Privacy Policy</a>
              <span className="divider" aria-hidden="true" />
              <a href="/terms">Terms & Conditions</a>
              <span className="divider" aria-hidden="true" />
              <a href="/refund-policy">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}