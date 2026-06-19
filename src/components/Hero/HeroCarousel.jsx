// src/components/Hero/HeroCarousel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroCarousel — Premium 3D Concave Carousel Overlay
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { OVERLAY_IMAGES } from "./index";

const BADGE_ICONS = {
  star: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  globe: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  crown: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>,
};

export default function HeroCarousel({ isReady, prefersReducedMotion }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const dotRefs = useRef([]);
  const intervalRef = useRef(null);
  const animationRefs = useRef([]);
  const slideWidthRef = useRef(0);
  
  const totalSlides = OVERLAY_IMAGES.length;
  const slides = [...OVERLAY_IMAGES, OVERLAY_IMAGES[0]];
  const totalCloned = slides.length;

  // ─── Go to slide with concave transition ──────────────────────────────────
  const goToSlide = useCallback((index, animate = true) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);

    const track = trackRef.current;
    if (!track) return;

    const slideWidth = slideWidthRef.current || containerRef.current?.offsetWidth || 0;
    const targetX = -index * slideWidth;

    // Kill existing animations
    animationRefs.current.forEach(anim => anim.kill());
    animationRefs.current = [];

    if (animate && !prefersReducedMotion) {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          setIsTransitioning(false);
          if (index === totalSlides) {
            gsap.set(track, { x: 0 });
            setCurrentIndex(0);
          }
        }
      });

      // Move track
      tl.to(track, { 
        x: targetX, 
        duration: 1.4, 
        ease: "power3.inOut" 
      });

      // Concave shape effect - each slide gets curved positioning
      const slidesEl = track.querySelectorAll('.rh-carousel-slide');
      slidesEl.forEach((slide, i) => {
        const distance = i - index;
        const absDist = Math.abs(distance);
        
        // Concave curve: slides curve inward like a bowl
        // Closer to center = more forward (z-index), edges curve back
        const curveFactor = absDist * 0.08;
        const zPos = 100 - absDist * 25; // z-index effect
        const scale = 1 - absDist * 0.06;
        const rotY = distance * 6; // rotation for concave effect
        const yOffset = absDist * 15; // slides at edges drop slightly
        
        tl.to(slide, {
          scale: Math.max(scale, 0.7),
          rotationY: rotY,
          zIndex: Math.max(0, zPos),
          y: yOffset,
          duration: 1.4,
          ease: "power3.inOut",
        }, 0);
      });

      animationRefs.current.push(tl);
    } else {
      // Instant jump
      gsap.set(track, { x: targetX });
      const slidesEl = track.querySelectorAll('.rh-carousel-slide');
      slidesEl.forEach((slide, i) => {
        const distance = i - index;
        const absDist = Math.abs(distance);
        gsap.set(slide, {
          scale: Math.max(1 - absDist * 0.06, 0.7),
          rotationY: distance * 6,
          zIndex: Math.max(0, 100 - absDist * 25),
          y: absDist * 15,
        });
      });
      setIsTransitioning(false);
      if (index === totalSlides) {
        gsap.set(track, { x: 0 });
        setCurrentIndex(0);
      }
    }

    setCurrentIndex(index);
  }, [currentIndex, isTransitioning, prefersReducedMotion, totalSlides]);

  // ─── Autoplay ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;
    
    const shouldPause = isHovered || isFocused;
    
    if (!shouldPause && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        goToSlide((currentIndex + 1) % totalCloned);
      }, 4000);
    } else if (shouldPause && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      animationRefs.current.forEach(anim => anim.kill());
      animationRefs.current = [];
    };
  }, [isReady, currentIndex, goToSlide, isHovered, isFocused, prefersReducedMotion, totalCloned]);

  // ─── Set slide width ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      slideWidthRef.current = containerRef.current.offsetWidth;
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // ─── Initial positioning with concave effect ─────────────────────────────
  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion) return;
    
    const slidesEl = trackRef.current.querySelectorAll('.rh-carousel-slide');
    slidesEl.forEach((slide, i) => {
      const distance = i - 0;
      const absDist = Math.abs(distance);
      gsap.set(slide, {
        scale: Math.max(1 - absDist * 0.06, 0.7),
        rotationY: distance * 6,
        zIndex: Math.max(0, 100 - absDist * 25),
        y: absDist * 15,
      });
    });
    gsap.set(trackRef.current, { x: 0 });
  }, [prefersReducedMotion]);

  // ─── Keyboard navigation ──────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(Math.max(0, currentIndex - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(Math.min(totalCloned - 1, currentIndex + 1));
    }
  }, [currentIndex, goToSlide, totalCloned]);

  // ─── Mouse parallax for concave depth ────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle parallax on the track for depth
      gsap.to(trackRef.current, {
        rotationY: x * 3,
        rotationX: -y * 2,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(trackRef.current, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // ─── Render ──────────────────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <div className="rh-carousel-fallback" style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(200px, 30vw, 350px)',
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0a1a2f',
        marginBottom: '20px',
      }}>
        <img 
          src={OVERLAY_IMAGES[0].src} 
          alt={OVERLAY_IMAGES[0].alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
    );
  }

  return (
    <div
      className="rh-carousel-overlay"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Destination carousel"
      tabIndex="0"
    >
      <style>{`
        .rh-carousel-overlay {
          position: relative;
          width: 100%;
          height: clamp(280px, 38vw, 480px);
          perspective: 1200px;
          overflow: hidden;
          border-radius: 24px;
          background: transparent;
          margin: 0 auto;
          max-width: 1200px;
          cursor: grab;
        }
        .rh-carousel-overlay:active {
          cursor: grabbing;
        }

        /* Glass overlay effect */
        .rh-carousel-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(255,255,255,0.05) 0%,
            rgba(255,215,0,0.02) 40%,
            rgba(0,0,0,0.15) 100%
          );
          z-index: 5;
          pointer-events: none;
          border-radius: 24px;
        }

        /* Glow border */
        .rh-carousel-overlay::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 24px;
          padding: 1px;
          background: conic-gradient(
            from var(--angle, 0deg),
            transparent,
            rgba(255,215,0,0.1),
            rgba(255,215,0,0.2),
            rgba(255,215,0,0.1),
            transparent
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: borderGlow 8s linear infinite;
          z-index: 6;
          pointer-events: none;
          opacity: 0.4;
        }

        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .rh-carousel-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          will-change: transform;
        }

        .rh-carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          transition: box-shadow 0.5s ease;
        }

        .rh-carousel-slide:hover {
          box-shadow: 0 16px 60px rgba(0,0,0,0.25);
        }

        .rh-carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .rh-carousel-slide .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0,0,0,0.1) 0%,
            rgba(0,0,0,0.3) 30%,
            rgba(0,0,0,0.5) 70%,
            rgba(0,0,0,0.7) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .rh-carousel-slide .slide-content {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          color: #fff;
          z-index: 3;
          text-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        .rh-carousel-slide .slide-content h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 6px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        .rh-carousel-slide .slide-content p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.1vw, 1.1rem);
          opacity: 0.9;
          margin: 0;
          line-height: 1.5;
          text-shadow: 0 2px 15px rgba(0,0,0,0.3);
        }

        .rh-carousel-slide .slide-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid rgba(255,215,0,0.2);
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #FFD700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .rh-carousel-slide .slide-badge svg {
          width: 14px;
          height: 14px;
        }

        /* Dots */
        .rh-carousel-dots {
          position: absolute;
          bottom: 16px;
          right: 24px;
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .rh-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .rh-dot.active {
          background: #FFD700;
          width: 28px;
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(255,215,0,0.3);
        }

        .rh-dot:hover {
          background: rgba(255,215,0,0.6);
          transform: scale(1.2);
        }

        /* ─── Responsive ────────────────────────────────────────────────────── */
        @media (max-width: 968px) {
          .rh-carousel-overlay {
            height: clamp(220px, 35vw, 320px);
            border-radius: 16px;
          }
          .rh-carousel-slide { border-radius: 14px; }
          .rh-carousel-slide .slide-content { bottom: 20px; left: 20px; right: 20px; }
          .rh-carousel-slide .slide-content h3 { font-size: 1.2rem; }
          .rh-carousel-slide .slide-content p { font-size: 0.8rem; }
          .rh-carousel-slide .slide-badge { 
            font-size: 9px; 
            padding: 6px 12px; 
            top: 14px; 
            right: 14px; 
          }
          .rh-carousel-slide .slide-badge svg { width: 12px; height: 12px; }
        }

        @media (max-width: 520px) {
          .rh-carousel-overlay {
            height: 200px;
            border-radius: 12px;
          }
          .rh-carousel-slide { border-radius: 10px; }
          .rh-carousel-slide .slide-content { bottom: 12px; left: 12px; right: 12px; }
          .rh-carousel-slide .slide-content h3 { font-size: 1rem; }
          .rh-carousel-slide .slide-content p { font-size: 0.7rem; }
          .rh-carousel-slide .slide-badge { 
            font-size: 8px; 
            padding: 4px 10px; 
            top: 10px; 
            right: 10px; 
          }
          .rh-carousel-slide .slide-badge svg { width: 10px; height: 10px; }
          .rh-carousel-dots { bottom: 10px; right: 14px; gap: 6px; }
          .rh-dot { width: 6px; height: 6px; }
          .rh-dot.active { width: 18px; }
        }

        /* ─── Reduced Motion ────────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .rh-carousel-overlay::after { animation: none !important; opacity: 0.1; }
          .rh-carousel-slide { transition: none !important; }
          .rh-dot { transition: none !important; }
        }
      `}</style>

      <div className="rh-carousel-track" ref={trackRef}>
        {slides.map((slide, index) => {
          const Icon = BADGE_ICONS[slide.icon] || null;
          return (
            <div
              key={`${slide.id}-${index}`}
              className="rh-carousel-slide"
              ref={(el) => (slideRefs.current[index] = el)}
              style={{ transform: `translateX(${index * 100}%)` }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="slide-overlay" />
              <div className="slide-badge">
                {Icon}
                {slide.label}
              </div>
              <div className="slide-content">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="rh-carousel-dots" role="tablist" aria-label="Slide navigation">
        {OVERLAY_IMAGES.map((_, index) => (
          <button
            key={index}
            ref={(el) => (dotRefs.current[index] = el)}
            className={`rh-dot ${index === (currentIndex % totalSlides) ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="tab"
            aria-selected={index === (currentIndex % totalSlides)}
          />
        ))}
      </div>
    </div>
  );
}