// components/Hero/HeroStats.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroStats — Animated statistics with scroll-triggered counting
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "./index";

// Icon mapping
const STAT_ICONS = {
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  star: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  award: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.895 17 22l-5-3-5 3 1.523-9.105"/></svg>,
  globe: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

export default function HeroStats({ isReady, prefersReducedMotion }) {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isReady || prefersReducedMotion || !statsRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );

      // Counter animation on scroll
      const statItems = statsRef.current.querySelectorAll('.rh-stat-item');
      
      statItems.forEach((item, i) => {
        const numEl = item.querySelector('.rh-stat-num');
        if (!numEl) return;

        const targetText = numEl.textContent;
        const numMatch = targetText.match(/^(\d+)([K%+]*)$/);
        if (!numMatch) return;

        const targetNum = parseInt(numMatch[1]);
        const suffix = numMatch[2] || '';

        // Create ScrollTrigger for each stat
        ScrollTrigger.create({
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (hasAnimated) return;
            
            gsap.fromTo(
              numEl,
              { textContent: '0' },
              {
                duration: 1.2,
                ease: "power2.out",
                delay: i * 0.1,
                onUpdate: function() {
                  const progress = this.progress();
                  const value = Math.floor(progress * targetNum);
                  numEl.textContent = value + suffix;
                },
                onComplete: () => {
                  setHasAnimated(true);
                },
              }
            );

            // Animate icon
            const icon = item.querySelector('.rh-stat-icon');
            if (icon) {
              gsap.fromTo(
                icon,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, delay: i * 0.1, ease: "back.out(1.7)" }
              );
            }
          },
          once: true,
        });
      });
    }, statsRef);

    return () => ctx.revert();
  }, [isReady, prefersReducedMotion, hasAnimated]);

  if (prefersReducedMotion) {
    return (
      <div className="rh-stats" ref={statsRef}>
        <style>{`
          .rh-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-top: 1px solid rgba(255,255,255,0.06);
            background: rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 2;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 clamp(12px, 2vw, 30px);
          }
          .rh-stat-item {
            padding: clamp(14px, 2vw, 24px) clamp(12px, 1.5vw, 20px);
            border-right: 1px solid rgba(255,255,255,0.04);
            display: flex;
            flex-direction: column;
            gap: 2px;
            text-align: center;
            align-items: center;
          }
          .rh-stat-item:last-child { border-right: none; }
          .rh-stat-icon { color: #FFD700; opacity: 0.6; margin-bottom: 2px; }
          .rh-stat-num {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(1.2rem, 2vw, 1.8rem);
            font-weight: 800;
            color: #FFD700;
            letter-spacing: -0.04em;
            line-height: 1;
          }
          .rh-stat-num span { color: rgba(255,255,255,0.3); }
          .rh-stat-label {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(7px, 0.6vw, 9px);
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.35);
          }
          @media (max-width: 860px) {
            .rh-stats { grid-template-columns: repeat(2, 1fr); }
            .rh-stat-item:nth-child(2) { border-right: none; }
            .rh-stat-item:nth-child(1),
            .rh-stat-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.04); }
          }
        `}</style>
        {STATS.map((s, i) => {
          const match = s.num.match(/^(\d+)([K%+]*)$/);
          const digits = match ? match[1] : s.num;
          const suffix = match ? match[2] : "";
          const Icon = STAT_ICONS[s.icon] || null;
          return (
            <div key={i} className="rh-stat-item" title={s.description}>
              <span className="rh-stat-icon">{Icon}</span>
              <span className="rh-stat-num">{digits}<span>{suffix}</span></span>
              <span className="rh-stat-label">{s.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="rh-stats" ref={statsRef}>
      <style>{`
        .rh-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(12px, 2vw, 30px);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rh-stats.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .rh-stat-item {
          padding: clamp(14px, 2vw, 24px) clamp(12px, 1.5vw, 20px);
          border-right: 1px solid rgba(255,255,255,0.04);
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: center;
          align-items: center;
          transition: all 0.3s ease;
          cursor: help;
        }
        .rh-stat-item:last-child { border-right: none; }
        .rh-stat-item:hover {
          background: rgba(255,215,0,0.02);
        }
        .rh-stat-icon {
          color: #FFD700;
          opacity: 0.6;
          margin-bottom: 2px;
          transition: transform 0.3s ease;
        }
        .rh-stat-item:hover .rh-stat-icon {
          transform: scale(1.1) rotate(-5deg);
        }
        .rh-stat-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 800;
          color: #FFD700;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .rh-stat-num span { color: rgba(255,255,255,0.3); }
        .rh-stat-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(7px, 0.6vw, 9px);
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }
        @media (max-width: 860px) {
          .rh-stats { grid-template-columns: repeat(2, 1fr); }
          .rh-stat-item:nth-child(2) { border-right: none; }
          .rh-stat-item:nth-child(1),
          .rh-stat-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.04); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rh-stats { opacity: 1 !important; transform: none !important; }
          .rh-stat-item { transition: none !important; }
          .rh-stat-item:hover .rh-stat-icon { transform: none !important; }
        }
      `}</style>
      {STATS.map((s, i) => {
        const match = s.num.match(/^(\d+)([K%+]*)$/);
        const digits = match ? match[1] : s.num;
        const suffix = match ? match[2] : "";
        const Icon = STAT_ICONS[s.icon] || null;
        return (
          <div key={i} className="rh-stat-item" title={s.description}>
            <span className="rh-stat-icon">{Icon}</span>
            <span className="rh-stat-num">{digits}<span>{suffix}</span></span>
            <span className="rh-stat-label">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}