// components/Hero/HeroHeadline.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroHeadline — Premium staggered word reveal with blur-to-sharp transitions
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function HeroHeadline({ isReady, prefersReducedMotion }) {
  const headlineRef = useRef(null);

  useEffect(() => {
    if (!isReady || prefersReducedMotion || !headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll('.rh-word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { 
          opacity: 0, 
          y: 30, 
          filter: "blur(8px)",
          rotateX: -10,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, headlineRef);

    return () => ctx.revert();
  }, [isReady, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="rh-headline" ref={headlineRef}>
        <style>{`
          .rh-headline {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: clamp(2.2rem, 5vw, 4.5rem);
            line-height: 0.95;
            letter-spacing: -0.04em;
            color: #ffffff;
            text-shadow: 0 2px 40px rgba(0,0,0,0.3);
          }
          .rh-headline .rh-hl-2 {
            display: block;
            color: #FFD700;
            font-style: italic;
            font-weight: 800;
            text-shadow: 0 2px 40px rgba(255,215,0,0.2);
          }
          .rh-headline .rh-hl-3 {
            display: block;
            color: rgba(255,255,255,0.9);
            font-style: normal;
            font-size: 0.45em;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-top: 2px;
            text-shadow: 0 2px 20px rgba(0,0,0,0.3);
          }
          .rh-headline .rh-word {
            display: inline-block;
            opacity: 1;
          }
          @media (max-width: 520px) {
            .rh-headline { font-size: clamp(1.8rem, 7vw, 2.6rem); }
          }
        `}</style>
        <span className="rh-word">One</span>
        <span className="rh-word">Story</span>
        <span className="rh-word rh-hl-2">at</span>
        <span className="rh-word rh-hl-2">a</span>
        <span className="rh-word rh-hl-2">Time</span>
        <span className="rh-word rh-hl-3">RASOAF</span>
        <span className="rh-word rh-hl-3">Travels</span>
        <span className="rh-word rh-hl-3">&amp;</span>
        <span className="rh-word rh-hl-3">Tours</span>
      </div>
    );
  }

  return (
    <div className="rh-headline" ref={headlineRef}>
      <style>{`
        .rh-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 5vw, 4.5rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          color: #ffffff;
          text-shadow: 0 2px 40px rgba(0,0,0,0.3);
        }
        .rh-headline .rh-hl-2 {
          display: block;
          color: #FFD700;
          font-style: italic;
          font-weight: 800;
          text-shadow: 0 2px 40px rgba(255,215,0,0.2);
        }
        .rh-headline .rh-hl-3 {
          display: block;
          color: rgba(255,255,255,0.9);
          font-style: normal;
          font-size: 0.45em;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-top: 2px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .rh-headline .rh-word {
          display: inline-block;
          opacity: 0;
          filter: blur(8px);
          transform: translateY(30px);
        }
        @media (max-width: 520px) {
          .rh-headline { font-size: clamp(1.8rem, 7vw, 2.6rem); }
        }
      `}</style>
      <span className="rh-word">One</span>
      <span className="rh-word">Story</span>
      <span className="rh-word rh-hl-2">at</span>
      <span className="rh-word rh-hl-2">a</span>
      <span className="rh-word rh-hl-2">Time</span>
      <span className="rh-word rh-hl-3">RASOAF</span>
      <span className="rh-word rh-hl-3">Travels</span>
      <span className="rh-word rh-hl-3">&amp;</span>
      <span className="rh-word rh-hl-3">Tours</span>
    </div>
  );
}