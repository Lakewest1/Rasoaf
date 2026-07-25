// src/components/travel/HeroBackground.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF TRAVELS — Cinematic Multi-Scene Hero Background
// Storyboard: airport → check-in → boarding → taxi/takeoff → clouds/sunrise →
// destinations → lifestyle → landing, crossfading in a seamless loop.
//
// ARCHITECTURE:
//   - Two <video> "layers" (A/B) crossfade via opacity only (GPU compositing).
//   - Whichever layer is NOT currently visible holds the *next* scene and is
//     preloaded (metadata-first) ahead of time.
//   - IntersectionObserver pauses all playback when hero scrolls out of view.
//   - prefers-reduced-motion renders a single static poster, no video elements.
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useRef, useState, useEffect, useCallback, useMemo } from "react";

// ══════════════════════════════════════════════════════════════════════════
// HERO MEDIA — Cloudinary URLs
// ══════════════════════════════════════════════════════════════════════════
const HERO_MEDIA = Object.freeze([
  // ══════════════════════════════════════════════════════════════════════
  // SCENE 1 — Aircraft taxiing and taking off (VIDEO)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "plane-taking-off",
    url: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784972493/plane1_okb0uz.mp4",
    poster: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550232/Rasoaf_10_xdlv6v.jpg",
    label: "Aircraft taxiing and taking off",
  },


   // ══════════════════════════════════════════════════════════════════════
  // SCENE 3 — Luxury travel moment (VIDEO)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "luxury-travel",
    url: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784973465/32945-395456395_medium_oir3i0.mp4",
    poster: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784973465/32945-395456395_medium_oir3i0.jpg",
    label: "Luxury travel experience",
  },

  // ══════════════════════════════════════════════════════════════════════
  // SCENE 2 — Beach / tropical destination (VIDEO)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "tropical-beach",
    url: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784973390/6414-191719619_medium_docv9f.mp4",
    poster: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784973382/hamsterfreund-beach-5696492_1920_qljrs7.jpg",
    label: "Tropical beach destination",
  },

 

  // ══════════════════════════════════════════════════════════════════════
  // SCENE 4 — Flying above clouds / sunrise (VIDEO)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "flying-above-clouds",
    url: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784973392/30871-382770845_medium_j9kyay.mp4",
    poster: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550201/Rasoaf_9_htuhwc.jpg",
    label: "Flying above golden-sunrise clouds",
  },

  // ══════════════════════════════════════════════════════════════════════
  // SCENE 5 — Global business / city skyline (VIDEO)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "business-travel",
     url: "https://res.cloudinary.com/dbqdgvvgq/video/upload/v1784973454/30869-382770839_medium_ecnh0i.mp4",
    poster: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784549673/Secure_Kubernetes_Deployment_Documentation_u84t87.docx.png",
    label: "Business travel & city skyline",
  },

  // ══════════════════════════════════════════════════════════════════════
  // SCENE 6 — Landing / journey complete (STATIC IMAGE)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "plane-landing",
    url: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784550232/Rasoaf_10_xdlv6v.jpg",
    poster: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1784549938/EVS-Healthcare-Domain-Security-Guide_1_ibiaid.docx.png",
    label: "Landing — journey complete",
  },
]);

// ══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════════════
const CROSSFADE_MS = 1100;
const FALLBACK_SCENE_MS = 6500;

// ══════════════════════════════════════════════════════════════════════════
// STYLES — opacity/transform only, GPU composited
// ══════════════════════════════════════════════════════════════════════════
const STYLES = `
  .hb-root {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #0A1220;
    isolation: isolate;
  }

  .hb-poster-base {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .hb-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    opacity: 0;
    transform: translateZ(0);
    backface-visibility: hidden;
    transition: opacity ${CROSSFADE_MS}ms ease;
  }

  .hb-layer.hb-front {
    opacity: 1;
    z-index: 2;
  }

  .hb-grade {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
    background:
      linear-gradient(to bottom, rgba(1,6,18,0.42) 0%, rgba(1,6,18,0.10) 28%, rgba(1,6,18,0.10) 55%, rgba(1,6,18,0.60) 100%),
      linear-gradient(135deg, rgba(212,160,23,0.06), transparent 60%);
  }

  @media (prefers-reduced-motion: reduce) {
    .hb-layer { display: none !important; }
  }
`;

// ══════════════════════════════════════════════════════════════════════════
// VideoLayer — Memoized, isolated per layer
// ══════════════════════════════════════════════════════════════════════════
const VideoLayer = memo(function VideoLayer({
  scene,
  isFront,
  shouldPlay,
  preloadFull,
  onEnded,
  videoRef,
}) {
  return (
    <video
      key={scene.id}
      ref={videoRef}
      className={`hb-layer ${isFront ? "hb-front" : ""}`}
      src={scene.url}
      poster={scene.poster}
      muted
      loop={false}
      playsInline
      autoPlay={isFront && shouldPlay}
      preload={preloadFull ? "auto" : "metadata"}
      onEnded={isFront ? onEnded : undefined}
      aria-hidden="true"
    />
  );
});
VideoLayer.displayName = "VideoLayer";

// ══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════
function HeroBackground({ reducedMotion: reducedMotionProp = false, className = "" }) {
  const containerRef = useRef(null);
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const swapTimeoutRef = useRef(null);

  const [prefersReduced, setPrefersReduced] = useState(false);
  const [inView, setInView] = useState(false);

  const [frontLayer, setFrontLayer] = useState("A");
  const [layerScene, setLayerScene] = useState({
    A: 0,
    B: 1 % HERO_MEDIA.length,
  });

  const reducedMotion = reducedMotionProp || prefersReduced;

  // ── prefers-reduced-motion listener ──────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── IntersectionObserver — pause when off-screen ─────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Play/pause front layer based on visibility ───────────────────────
  useEffect(() => {
    const frontRef = frontLayer === "A" ? layerARef : layerBRef;
    const el = frontRef.current;
    if (!el) return;
    if (reducedMotion || !inView) {
      el.pause();
    } else {
      el.play().catch(() => {});
    }
  }, [frontLayer, inView, reducedMotion, layerScene]);

  // ── Hidden layer always paused ───────────────────────────────────────
  useEffect(() => {
    const backRef = frontLayer === "A" ? layerBRef : layerARef;
    backRef.current?.pause();
  }, [frontLayer]);

  // ── Advance to next scene ────────────────────────────────────────────
  const advance = useCallback(() => {
    clearTimeout(fallbackTimerRef.current);
    clearTimeout(swapTimeoutRef.current);

    setFrontLayer((prevFront) => {
      const nextFront = prevFront === "A" ? "B" : "A";

      swapTimeoutRef.current = setTimeout(() => {
        setLayerScene((prev) => {
          const newFrontIdx = prev[nextFront];
          const upcomingIdx = (newFrontIdx + 1) % HERO_MEDIA.length;
          return { ...prev, [prevFront]: upcomingIdx };
        });
      }, CROSSFADE_MS);

      return nextFront;
    });
  }, []);

  // ── Fallback timer ───────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || !inView) return;
    fallbackTimerRef.current = setTimeout(advance, FALLBACK_SCENE_MS);
    return () => clearTimeout(fallbackTimerRef.current);
  }, [frontLayer, layerScene, reducedMotion, inView, advance]);

  // ── Cleanup ──────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimeout(fallbackTimerRef.current);
      clearTimeout(swapTimeoutRef.current);
    };
  }, []);

  const sceneA = useMemo(() => HERO_MEDIA[layerScene.A], [layerScene.A]);
  const sceneB = useMemo(() => HERO_MEDIA[layerScene.B], [layerScene.B]);

  const basePoster = HERO_MEDIA[0].poster;

  return (
    <div ref={containerRef} className={className}>
      <style>{STYLES}</style>
      <div className="hb-root">
        {/* Base poster — always visible, also serves as reduced-motion fallback */}
        <img
          src={basePoster}
          alt=""
          className="hb-poster-base"
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />

        {!reducedMotion && inView && (
          <>
            <VideoLayer
              scene={sceneA}
              isFront={frontLayer === "A"}
              shouldPlay={frontLayer === "A"}
              preloadFull={layerScene.A === 0}
              onEnded={advance}
              videoRef={layerARef}
            />
            <VideoLayer
              scene={sceneB}
              isFront={frontLayer === "B"}
              shouldPlay={frontLayer === "B"}
              preloadFull={false}
              onEnded={advance}
              videoRef={layerBRef}
            />
          </>
        )}

        <div className="hb-grade" aria-hidden="true" />
      </div>
    </div>
  );
}

export default memo(HeroBackground);