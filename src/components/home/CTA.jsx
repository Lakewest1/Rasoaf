// src/components/home/CTA.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — CTA Section
//
// A premium full-width conversion section designed to convert users at the
// decision stage into leads or consultations.
//
// Design: Soft gradient background (gold/yellow to white), center-aligned
// Layout: Full-width hero-style with decorative blur elements
// Animation: Fade-up on scroll with subtle scale
// Responsive: Stacked buttons on mobile
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Calendar,
  ArrowRight,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react";

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.15) {
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

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CTA() {
  const [sectionRef, inView] = useInView(0.12);
  const [contentInView, setContentInView] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setContentInView(true), 150);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const handleButtonClick = (buttonName) => {
    // Analytics tracking hook placeholder
    console.log(`CTA Button Clicked: ${buttonName}`);
    // You can integrate with Google Analytics, Facebook Pixel, etc.
    // Example: gtag('event', 'conversion', { 'send_to': 'AW-XXXXX/XXXXX' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

        .cta-section {
          position: relative;
          width: 100%;
          padding: clamp(60px, 12vh, 120px) clamp(20px, 5vw, 60px);
          background: linear-gradient(165deg, #FFF9E6 0%, #FFFDF7 30%, #FAF5E8 70%, #F5EDD6 100%);
          overflow: hidden;
          isolation: isolate;
        }

        /* Decorative blur circles */
        .cta-section .decorative-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(80px);
        }

        .cta-section .circle-1 {
          top: -15%;
          right: -10%;
          width: 50%;
          height: 80%;
          background: radial-gradient(circle, rgba(196,151,42,0.15), transparent 70%);
        }

        .cta-section .circle-2 {
          bottom: -20%;
          left: -10%;
          width: 40%;
          height: 60%;
          background: radial-gradient(circle, rgba(196,151,42,0.08), transparent 70%);
        }

        .cta-section .circle-3 {
          top: 30%;
          left: 20%;
          width: 30%;
          height: 40%;
          background: radial-gradient(circle, rgba(196,151,42,0.04), transparent 70%);
        }

        /* Subtle pattern overlay */
        .cta-section .pattern-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0.03;
          background-image: 
            radial-gradient(circle at 20% 50%, #C4972A 1px, transparent 1px),
            radial-gradient(circle at 80% 50%, #C4972A 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .cta-container {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }

        /* ── Content Animation ────────────────────────────────────────────── */
        .cta-content {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-content.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Badge ────────────────────────────────────────────────────────── */
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(10px, 0.8vw, 12px);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C4972A;
          background: rgba(196,151,42,0.08);
          padding: 6px 18px;
          border-radius: 50px;
          margin-bottom: 16px;
          border: 1px solid rgba(196,151,42,0.08);
        }

        .cta-badge .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4972A;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── Typography ───────────────────────────────────────────────────── */
        .cta-headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 5.5vw, 4.2rem);
          font-weight: 700;
          color: #0a0a2e;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: clamp(12px, 1.8vw, 20px);
        }

        .cta-headline .highlight {
          color: #C4972A;
          position: relative;
        }

        .cta-headline .highlight::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C4972A, rgba(196,151,42,0.2));
          border-radius: 3px;
        }

        .cta-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.3vw, 18px);
          font-weight: 400;
          color: #4a5568;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto clamp(28px, 4vh, 40px);
        }

        /* ── Buttons ──────────────────────────────────────────────────────── */
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 1.5vw, 18px);
          margin-bottom: clamp(20px, 3vh, 28px);
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.1vw, 16px);
          font-weight: 700;
          color: #ffffff;
          background: #0a0a2e;
          padding: clamp(14px, 1.4vw, 18px) clamp(32px, 3.5vw, 48px);
          border: none;
          border-radius: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 4px 20px rgba(10,10,46,0.25);
          position: relative;
          overflow: hidden;
        }

        .cta-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #C4972A, #e8b840);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 35px rgba(10,10,46,0.35);
        }

        .cta-btn-primary:hover::before {
          opacity: 1;
        }

        .cta-btn-primary:active {
          transform: translateY(0) scale(0.98);
          transition-duration: 0.1s;
        }

        .cta-btn-primary span {
          position: relative;
          z-index: 1;
        }

        .cta-btn-primary svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .cta-btn-primary:hover svg {
          transform: translateX(4px);
        }

        /* ── WhatsApp Button ──────────────────────────────────────────────── */
        .cta-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.1vw, 16px);
          font-weight: 600;
          color: #ffffff;
          background: #25D366;
          padding: clamp(14px, 1.4vw, 18px) clamp(28px, 3vw, 40px);
          border: none;
          border-radius: 14px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.35);
        }

        .cta-btn-whatsapp:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 35px rgba(37, 211, 102, 0.45);
        }

        .cta-btn-whatsapp:active {
          transform: translateY(0) scale(0.98);
          transition-duration: 0.1s;
        }

        .cta-btn-whatsapp svg {
          transition: transform 0.3s ease;
        }

        .cta-btn-whatsapp:hover svg {
          transform: scale(1.1);
        }

        /* ── Tertiary Link ────────────────────────────────────────────────── */
        .cta-btn-tertiary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 500;
          color: #0a0a2e;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .cta-btn-tertiary::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: #C4972A;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .cta-btn-tertiary:hover {
          color: #C4972A;
        }

        .cta-btn-tertiary:hover::after {
          transform: scaleX(1);
        }

        .cta-btn-tertiary svg {
          transition: transform 0.3s ease;
        }

        .cta-btn-tertiary:hover svg {
          transform: translateX(4px);
        }

        /* ── Trust Microcopy ──────────────────────────────────────────────── */
        .cta-trust {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 2vw, 28px);
          margin-top: clamp(16px, 2vh, 24px);
        }

        .cta-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(12px, 0.9vw, 14px);
          font-weight: 450;
          color: #4a5568;
        }

        .cta-trust-item svg {
          color: #C4972A;
          flex-shrink: 0;
        }

        .cta-trust-divider {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #C4972A;
          opacity: 0.3;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet */
        @media (max-width: 1024px) {
          .cta-section {
            padding: clamp(50px, 8vh, 80px) clamp(20px, 4vw, 40px);
          }
          .cta-headline {
            font-size: clamp(2rem, 5vw, 3.2rem);
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .cta-section {
            padding: clamp(40px, 6vh, 60px) clamp(16px, 3vw, 24px);
          }
          .cta-headline {
            font-size: clamp(1.8rem, 6vw, 2.6rem);
          }
          .cta-subtitle {
            font-size: 14px;
          }
          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          .cta-btn-primary,
          .cta-btn-whatsapp {
            width: 100%;
            justify-content: center;
          }
          .cta-trust {
            gap: 10px 20px;
          }
          .cta-trust-item {
            font-size: 12px;
          }
          .cta-trust-divider {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 32px 12px 48px;
          }
          .cta-headline {
            font-size: 1.6rem;
          }
          .cta-subtitle {
            font-size: 13px;
          }
          .cta-btn-primary,
          .cta-btn-whatsapp {
            font-size: 14px;
            padding: 14px 24px;
          }
          .cta-trust {
            flex-direction: column;
            gap: 6px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .cta-content {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .cta-btn-primary,
          .cta-btn-whatsapp,
          .cta-btn-tertiary {
            transition: none !important;
          }
          .cta-btn-primary:hover,
          .cta-btn-whatsapp:hover,
          .cta-btn-tertiary:hover {
            transform: none !important;
          }
          .cta-badge .dot {
            animation: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .cta-btn-primary:hover {
            transform: none !important;
          }
          .cta-btn-primary:hover::before {
            opacity: 0 !important;
          }
          .cta-btn-whatsapp:hover {
            transform: none !important;
          }
          .cta-btn-tertiary:hover::after {
            transform: scaleX(0) !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="cta-section"
        aria-labelledby="cta-heading"
        id="cta"
      >
        {/* Decorative Elements */}
        <div className="decorative-circle circle-1" aria-hidden="true" />
        <div className="decorative-circle circle-2" aria-hidden="true" />
        <div className="decorative-circle circle-3" aria-hidden="true" />
        <div className="pattern-overlay" aria-hidden="true" />

        <div className="cta-container">
          <div className={`cta-content ${contentInView ? "visible" : ""}`}>
            {/* Badge */}
            <div className="cta-badge">
              <span className="dot" aria-hidden="true" />
              <span>Start Your Journey Today</span>
            </div>

            {/* Headline */}
            <h2 id="cta-heading" className="cta-headline">
              Begin Your <span className="highlight">Sacred Journey</span> Today
            </h2>

            {/* Subtitle */}
            <p className="cta-subtitle">
              Let us guide you through a seamless, spiritually fulfilling Hajj
              and Umrah experience with complete care and professionalism.
            </p>

            {/* Buttons */}
            <div className="cta-buttons">
              <button
                className="cta-btn-primary"
                onClick={() => {
                  handleButtonClick("Free Consultation");
                  scrollToSection("contact");
                }}
                aria-label="Get a free consultation"
              >
                <span>Get a Free Consultation</span>
                <Calendar size={18} />
              </button>

              <a
                className="cta-btn-whatsapp"
                href="https://wa.me/2341234567890?text=Hello%20RASAOF%20Travels%2C%20I%27d%20like%20to%20inquire%20about%20Hajj%20and%20Umrah%20packages"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleButtonClick("WhatsApp")}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                className="cta-btn-tertiary"
                onClick={() => {
                  handleButtonClick("View Packages");
                  scrollToSection("packages");
                }}
                aria-label="View packages"
              >
                <span>View Packages</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust Microcopy */}
            <div className="cta-trust">
              <span className="cta-trust-item">
                <CheckCircle size={16} />
                <span>No obligation consultation</span>
              </span>
              <span className="cta-trust-divider" aria-hidden="true" />
              <span className="cta-trust-item">
                <Shield size={16} />
                <span>100% guided support from experts</span>
              </span>
              <span className="cta-trust-divider" aria-hidden="true" />
              <span className="cta-trust-item">
                <Sparkles size={16} />
                <span>Flexible payment plans</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}