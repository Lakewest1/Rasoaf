// src/components/travel/HeroVideoBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS — Video Hero Background
// TEMP: using Mixkit placeholder footage (free, Mixkit License, no attribution
// required) for wiring/testing. Swap VIDEO_SOURCES for licensed/HD footage
// before shipping — see comments below.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════════════
// CONFIG
// PLACEHOLDER: Mixkit "Plane Flying Through Clouds" (free stock, no attribution
// required under https://mixkit.co/license/#videoFree). This is their -360
// preview encode — soft at full-bleed hero size. Before shipping:
//   1. Go to https://mixkit.co/free-stock-video/plane-flying-through-clouds-17999/
//   2. Download the full HD/4K version
//   3. Compress with ffmpeg/Cloudinary into your own mp4 + webm pair
//   4. Replace the URLs below (or move to /public/videos/ or Cloudinary)
// ══════════════════════════════════════════════════════════════════════════
const VIDEO_SOURCES = {
  desktop: {
    mp4: "https://assets.mixkit.co/videos/17999/17999-360.mp4",
  },
  mobile: {
    // Same placeholder for now — swap for a lower-res mobile encode later
    mp4: "https://assets.mixkit.co/videos/17999/17999-360.mp4",
  },
};

// Poster: Mixkit's own thumbnail for the same clip, used as fallback/LCP image
const POSTER_IMAGE = "https://assets.mixkit.co/videos/17999/17999-thumb-360-4.jpg";

// ══════════════════════════════════════════════════════════════════════════
// Overlay tuned for readability over moving footage (stronger than the
// static-scene version, since footage carries more visual noise).
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .hv-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #16243F;
  }

  .hv-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    transform: translateZ(0);
    backface-visibility: hidden;
    opacity: 0;
    transition: opacity 0.9s ease;
  }

  .hv-video.hv-loaded {
    opacity: 1;
  }

  .hv-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    transform: translateZ(0);
  }

  /* Darkening + color-grade wash so gold/white text stays readable
     over bright sky/cloud footage */
  .hv-grade {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(to bottom, rgba(1,6,18,0.35) 0%, rgba(1,6,18,0.08) 30%, rgba(1,6,18,0.08) 55%, rgba(1,6,18,0.55) 100%),
      linear-gradient(135deg, rgba(212,160,23,0.06), transparent 60%);
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .hv-video { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function HeroVideoBackground({
  reducedMotion: reducedMotionProp = false,
  className = "",
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoadedData = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const reducedMotion = reducedMotionProp || prefersReduced;
  const sources = isMobile ? VIDEO_SOURCES.mobile : VIDEO_SOURCES.desktop;

  return (
    <div ref={containerRef} className={className}>
      <style>{STYLES}</style>
      <div className="hv-bg">
        <img
          src={POSTER_IMAGE}
          alt=""
          className="hv-poster"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />

        {!reducedMotion && inView && (
          <video
            ref={videoRef}
            className={`hv-video ${videoLoaded ? "hv-loaded" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER_IMAGE}
            onLoadedData={handleLoadedData}
            aria-hidden="true"
          >
            <source src={sources.mp4} type="video/mp4" />
          </video>
        )}

        <div className="hv-grade" aria-hidden="true" />
      </div>
    </div>
  );
}