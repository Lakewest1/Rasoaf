// components/Hero/HeroGlassPanel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroGlassPanel — Premium glass container with cursor-responsive lighting
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowRight, CheckCircle, Star, Shield, Globe } from "lucide-react";
import { SOCIAL_LINKS } from "./index";

export default function HeroGlassPanel({ isReady, prefersReducedMotion }) {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const lightRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady || prefersReducedMotion || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [isReady, prefersReducedMotion]);

  // ── Cursor tracking for lighting ─────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (!panelRef.current || !lightRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lightRef.current.style.left = x + 'px';
    lightRef.current.style.top = y + 'px';
    
    // Subtle shadow shift
    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;
    gsap.to(panelRef.current, {
      boxShadow: `
        ${xPercent * 3}px ${yPercent * 3}px 30px rgba(0,0,0,0.25),
        inset 0 1px 0 rgba(255,255,255,0.05),
        inset 0 -1px 0 rgba(0,0,0,0.1)
      `,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    gsap.to(panelRef.current, {
      boxShadow: `
        0 20px 60px rgba(0,0,0,0.25),
        inset 0 1px 0 rgba(255,255,255,0.05),
        inset 0 -1px 0 rgba(0,0,0,0.1)
      `,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const scrollDown = (e) => {
    e?.preventDefault();
    const next = document.getElementById("services") ?? document.getElementById("packages");
    next
      ? next.scrollIntoView({ behavior: "smooth" })
      : window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <div 
      className="rh-glass-panel" 
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <style>{`
        .rh-glass-panel {
          position: relative;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: clamp(20px, 2.5vw, 32px) clamp(20px, 2.5vw, 32px);
          border: 1px solid rgba(255,215,0,0.08);
          box-shadow: 
            0 20px 60px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -1px 0 rgba(0,0,0,0.1);
          overflow: hidden;
          transform-style: preserve-3d;
          transition: opacity 0.6s ease;
        }

        .rh-glass-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .rh-glass-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.3;
          pointer-events: none;
          z-index: 1;
        }

        .rh-glass-light {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.06), transparent 70%);
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          will-change: transform;
        }

        .rh-glass-panel:hover .rh-glass-light {
          opacity: 1;
        }

        .rh-glass-border {
          position: absolute;
          inset: -1px;
          border-radius: 20px;
          padding: 1px;
          background: conic-gradient(from var(--angle, 0deg), transparent, rgba(255,215,0,0.08), rgba(255,215,0,0.15), rgba(255,215,0,0.08), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderGlow 10s linear infinite;
          z-index: 0;
          pointer-events: none;
          opacity: 0.4;
        }

        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .rh-glass-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.5vw, 20px);
        }

        .rh-glass-eyebrow {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(8px, 0.8vw, 10px);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFD700;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(-15px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rh-glass-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: #FFD700;
          flex-shrink: 0;
        }
        .rh-glass-eyebrow.revealed {
          opacity: 1;
          transform: translateX(0);
        }

        .rh-glass-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.75rem, 1vw, 0.95rem);
          font-weight: 400;
          line-height: 1.5;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.01em;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
        }
        .rh-glass-tagline strong {
          font-weight: 600;
          color: #FFD700;
        }
        .rh-glass-tagline.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .rh-glass-trust {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }
        .rh-glass-trust.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .rh-glass-trust-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(7px, 0.7vw, 9px);
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.02em;
        }
        .rh-glass-trust-item svg {
          color: #FFD700;
        }
        .rh-glass-trust-sep {
          width: 1px;
          height: 10px;
          background: rgba(255,255,255,0.08);
        }

        .rh-glass-cta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s;
        }
        .rh-glass-cta.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .rh-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(10px, 0.9vw, 12px);
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05));
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(255,215,0,0.25);
          border-radius: 100px;
          padding: clamp(8px, 1vw, 12px) clamp(16px, 2vw, 24px);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .rh-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .rh-cta-btn:hover::before {
          transform: translateX(100%);
        }
        .rh-cta-btn:hover {
          background: rgba(255,215,0,0.2);
          border-color: #FFD700;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,215,0,0.15);
        }
        .rh-cta-btn:active {
          transform: scale(0.97);
        }
        .rh-cta-btn .cta-arrow {
          transition: transform 0.3s ease;
        }
        .rh-cta-btn:hover .cta-arrow {
          transform: translateX(4px) scale(1.05);
        }

        .rh-cta-supporting {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.6rem, 0.65vw, 0.7rem);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .rh-cta-supporting svg {
          color: #FFD700;
        }

        .rh-glass-socials {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
        }
        .rh-glass-socials.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .rh-glass-social {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 7px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 100px;
          padding: 3px 8px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rh-glass-social:hover {
          border-color: rgba(255,215,0,0.3);
          background: rgba(255,215,0,0.08);
          color: #FFD700;
          transform: translateY(-1px);
        }
        .rh-glass-social svg {
          width: 9px;
          height: 9px;
        }

        @media (max-width: 520px) {
          .rh-glass-social span { display: none; }
          .rh-glass-social:hover span { display: inline; }
          .rh-cta-supporting { font-size: 0.55rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rh-glass-panel::before,
          .rh-glass-panel::after { display: none; }
          .rh-glass-border { animation: none !important; opacity: 0.1; }
          .rh-glass-light { display: none; }
          .rh-glass-eyebrow,
          .rh-glass-tagline,
          .rh-glass-trust,
          .rh-glass-cta,
          .rh-glass-socials {
            opacity: 1 !important;
            transform: none !important;
          }
          .rh-cta-btn::before { display: none; }
        }
      `}</style>

      {/* Cursor light */}
      <div className="rh-glass-light" ref={lightRef} aria-hidden="true" />

      {/* Border glow */}
      <div className="rh-glass-border" aria-hidden="true" />

      <div className="rh-glass-content" ref={contentRef}>
        {/* Eyebrow */}
        <div className="rh-glass-eyebrow revealed">
          Your Gateway to The World
        </div>

        {/* Tagline */}
        <div className="rh-glass-tagline revealed">
          <strong>We Bring Reality to Your Journey.</strong> From sacred Hajj &amp;
          Umrah pilgrimages to seamless global visa services and premium travel
          experiences — trusted by thousands worldwide.
        </div>

        {/* Trust indicators */}
        <div className="rh-glass-trust revealed">
          <span className="rh-glass-trust-item">
            <Star size={10} strokeWidth={1.8} />
            Trusted
          </span>
          <span className="rh-glass-trust-sep" />
          <span className="rh-glass-trust-item">
            <Shield size={10} strokeWidth={1.8} />
            Secure
          </span>
          <span className="rh-glass-trust-sep" />
          <span className="rh-glass-trust-item">
            <Globe size={10} strokeWidth={1.8} />
            50+ Destinations
          </span>
        </div>

        {/* CTA */}
        <div className="rh-glass-cta revealed">
          <a href="#services" className="rh-cta-btn" onClick={scrollDown}>
            <span>Explore Packages</span>
            <ArrowRight size={14} className="cta-arrow" strokeWidth={2} />
          </a>
          <span className="rh-cta-supporting">
            <CheckCircle size={11} />
            Trusted by thousands worldwide
          </span>
        </div>

        {/* Social links */}
        <div className="rh-glass-socials revealed">
          {SOCIAL_LINKS.map((link, i) => {
            // Simple icon mapping
            const Icon = ({ size, strokeWidth }) => {
              const icons = {
                globe: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                mail: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                facebook: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                instagram: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                twitter: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
                tiktok: <svg width={size || 9} height={size || 9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
              };
              return icons[link.icon] || null;
            };
            return (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rh-glass-social"
                aria-label={`RASOAF on ${link.label}`}
              >
                <Icon />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}