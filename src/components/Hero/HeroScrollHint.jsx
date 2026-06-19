// components/Hero/HeroScrollHint.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroScrollHint — Elegant scroll indicator with progress
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroScrollHint({ isReady, prefersReducedMotion }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setProgress(Math.min(p, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="rh-scroll-hint">
        <style>{`
          .rh-scroll-hint {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 20px;
            border-top: 1px solid rgba(255,255,255,0.04);
            background: rgba(0,0,0,0.1);
            backdrop-filter: blur(8px);
            position: relative;
            z-index: 2;
            opacity: 0.3;
          }
          .rh-scroll-hint span {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.3);
          }
        `}</style>
        <span>Scroll to explore</span>
      </div>
    );
  }

  return (
    <div className={`rh-scroll-hint ${isScrolled ? 'faded' : ''}`}>
      <style>{`
        .rh-scroll-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-top: 1px solid rgba(255,255,255,0.04);
          background: rgba(0,0,0,0.1);
          backdrop-filter: blur(8px);
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.6s ease 0.2s;
        }
        .rh-scroll-hint.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .rh-scroll-hint.faded {
          opacity: 0.15;
          transition: opacity 0.8s ease;
        }
        .rh-scroll-hint span {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }
        .rh-scroll-hint .chevron {
          color: rgba(255,255,255,0.25);
          animation: scrollBounce 1.8s ease-in-out infinite;
        }
        .rh-scroll-hint .chevron-2 {
          animation-delay: 0.14s;
        }
        .rh-scroll-hint.faded .chevron {
          animation: none;
        }
        .rh-scroll-progress {
          width: 40px;
          height: 1.5px;
          background: rgba(255,255,255,0.08);
          border-radius: 1px;
          overflow: hidden;
        }
        .rh-scroll-progress-fill {
          height: 100%;
          width: 0%;
          background: #FFD700;
          border-radius: 1px;
          transition: width 0.1s ease;
        }

        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(4px); opacity: 0.8; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rh-scroll-hint { opacity: 0.3 !important; transform: none !important; }
          .rh-scroll-hint .chevron { animation: none !important; }
        }
      `}</style>

      <ChevronDown size={12} strokeWidth={2} className="chevron" aria-hidden="true" />
      <span>Scroll to explore</span>
      <ChevronDown size={12} strokeWidth={2} className="chevron chevron-2" aria-hidden="true" />
      <div className="rh-scroll-progress" aria-hidden="true">
        <div className="rh-scroll-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}