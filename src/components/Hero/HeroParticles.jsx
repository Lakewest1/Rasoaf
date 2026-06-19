// components/Hero/HeroParticles.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroParticles — Sparse, elegant particle system
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function HeroParticles({ count = 20 }) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing particles
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];

    // Create particles
    const actualCount = window.innerWidth < 768 ? Math.floor(count * 0.6) : count;
    
    for (let i = 0; i < actualCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'rh-particle';
      const size = 1.5 + Math.random() * 3;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.opacity = 0.03 + Math.random() * 0.06;
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animate particles
    const ctx = gsap.context(() => {
      particlesRef.current.forEach((p) => {
        gsap.to(p, {
          y: (Math.random() - 0.5) * 80,
          x: (Math.random() - 0.5) * 80,
          duration: 20 + Math.random() * 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 8,
        });
        gsap.to(p, {
          opacity: 0.05 + Math.random() * 0.08,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 4,
        });
      });
    }, container);

    return () => {
      ctx.revert();
      particlesRef.current.forEach(p => p.remove());
      particlesRef.current = [];
    };
  }, [count]);

  return (
    <div ref={containerRef} className="rh-particles" aria-hidden="true">
      <style>{`
        .rh-particles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }
        .rh-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,215,0,0.15);
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .rh-particle { display: none; }
        }
      `}</style>
    </div>
  );
}