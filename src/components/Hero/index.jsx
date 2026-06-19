// src/components/Hero/HeroCarousel.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroCarousel — Premium 3D Infinite Carousel for RASAOF
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
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const intervalRef = useRef(null);
  const animationRefs = useRef([]);
  const slideWidthRef = useRef(0);
  const totalSlides = OVERLAY_IMAGES.length;
  const slides = [...OVERLAY_IMAGES, OVERLAY_IMAGES[0]];
  const totalCloned = slides.length;

  const goToSlide = useCallback((index, animate = true) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);

    const track = trackRef.current;
    if (!track) return;

    const slideWidth = slideWidthRef.current || containerRef.current?.offsetWidth || 0;
    const targetX = -index * slideWidth;

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

      tl.to(track, { x: targetX, duration: 1.2, ease: "power3.inOut" });

      const slidesEl = track.querySelectorAll('.rh-carousel-slide');
      slidesEl.forEach((slide, i) => {
        const distance = i - index;
        const absDist = Math.abs(distance);
        const scale = 1 - absDist * 0.08;
        tl.to(slide, {
          scale: Math.max(scale, 0.6),
          rotationY: distance * 5,
          zIndex: 10 - absDist,
          duration: 1.2,
          ease: "power3.inOut",
        }, 0);
      });

      animationRefs.current.push(tl);
    } else {
      gsap.set(track, { x: targetX });
      const slidesEl = track.querySelectorAll('.rh-carousel-slide');
      slidesEl.forEach((slide, i) => {
        const distance = i - index;
        const scale = 1 - Math.abs(distance) * 0.08;
        gsap.set(slide, {
          scale: Math.max(scale, 0.6),
          rotationY: distance * 5,
          zIndex: 10 - Math.abs(distance),
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

  // Autoplay
  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;

    const startAutoplay = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        goToSlide((currentIndex + 1) % totalCloned);
      }, 3000);
    };

    const timeout = setTimeout(startAutoplay, 500);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isReady, currentIndex, goToSlide, prefersReducedMotion, totalCloned]);

  // Pause on hover
  const handlePause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleResume = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        goToSlide((currentIndex + 1) % totalCloned);
      }, 3000);
    }
  }, [currentIndex, goToSlide, totalCloned]);

  // Set slide width
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      slideWidthRef.current = containerRef.current.offsetWidth;
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Initial positioning
  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion) return;
    const slidesEl = trackRef.current.querySelectorAll('.rh-carousel-slide');
    slidesEl.forEach((slide, i) => {
      const distance = i - 0;
      const scale = 1 - Math.abs(distance) * 0.08;
      gsap.set(slide, {
        scale: Math.max(scale, 0.6),
        rotationY: distance * 5,
        zIndex: 10 - Math.abs(distance),
      });
    });
    gsap.set(trackRef.current, { x: 0 });
  }, [prefersReducedMotion]);

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
        <img src={OVERLAY_IMAGES[0].src} alt={OVERLAY_IMAGES[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    );
  }

  return (
    <div
      className="rh-carousel-3d"
      ref={containerRef}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(280px, 35vw, 450px)',
        perspective: '1000px',
        overflow: 'hidden',
        borderRadius: '16px',
        background: '#0a1a2f',
        marginBottom: '20px',
        cursor: 'grab',
      }}
    >
      <style>{`
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
          border-radius: 16px;
          overflow: hidden;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
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
          background: linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }
        .rh-carousel-slide .slide-content {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          color: #fff;
          z-index: 2;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .rh-carousel-slide .slide-content h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 700;
          color: #FFD700;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .rh-carousel-slide .slide-content p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.8rem, 1vw, 1rem);
          opacity: 0.9;
          margin: 0;
          line-height: 1.4;
        }
        .rh-carousel-slide .slide-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,215,0,0.2);
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          color: #FFD700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        @media (max-width: 520px) {
          .rh-carousel-3d { height: 200px; }
          .rh-carousel-slide .slide-content { bottom: 12px; left: 12px; right: 12px; }
          .rh-carousel-slide .slide-content h3 { font-size: 1rem; }
          .rh-carousel-slide .slide-content p { font-size: 0.7rem; }
          .rh-carousel-slide .slide-badge { font-size: 8px; padding: 4px 10px; top: 10px; right: 10px; }
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
              <img src={slide.src} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
              <div className="slide-overlay" />
              <div className="slide-badge">{Icon}{slide.label}</div>
              <div className="slide-content">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}