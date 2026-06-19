// components/Hero/HeroBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroBackground — Subtle animated background with video and ambient lighting
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function HeroBackground({ isReady }) {
  const bgRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isReady || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle background animation
      gsap.to(bgRef.current, {
        scale: 1.02,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, bgRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div className="rh-background" ref={bgRef}>
      <style>{`
        .rh-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: linear-gradient(135deg, #0a1a2f, #0d1f3a, #0a1a2f);
        }

        .rh-background-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.2;
        }

        .rh-background-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.15;
        }

        .rh-background-glow-1 {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%);
        }

        .rh-background-glow-2 {
          width: 300px;
          height: 300px;
          bottom: -50px;
          left: -50px;
          background: radial-gradient(circle, rgba(255,215,0,0.2), transparent 70%);
        }

        .rh-background-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 50%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
        }
      `}</style>

      {/* Video */}
      <video
        ref={videoRef}
        className="rh-background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source
          src="https://res.cloudinary.com/dbqdgvvgq/video/upload/v1781351650/3473-170690984_medium_h9g9gt.mp4"
          type="video/mp4"
        />
      </video>

      {/* Glow orbs */}
      <div className="rh-background-glow rh-background-glow-1" aria-hidden="true" />
      <div className="rh-background-glow rh-background-glow-2" aria-hidden="true" />

      {/* Overlay */}
      <div className="rh-background-overlay" aria-hidden="true" />
    </div>
  );
}