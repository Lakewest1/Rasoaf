// src/components/home/Gallery.jsx
// ─────────────────────────────────────────────────────────────────────────────
// RASOAF Travels and Tours — Gallery Section
//
// A premium visually immersive gallery showcasing Hajj, Umrah, and travel
// experiences with a responsive masonry grid layout.
//
// Design: Soft yellow background, deep black text, clean white/glass cards
// Layout: Masonry grid with category filters and lightbox modal
// Animation: Fade-up on scroll, hover zoom, staggered reveal
// Responsive: 1 → 2 → 3-5 columns (mobile → tablet → desktop)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useEffect, useState, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Hotel,
  Bus,
  Users2,
  Image as ImageIcon,
  Grid3x3,
  ZoomIn,
} from "lucide-react";

// ── Gallery Data ──────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    alt: "Pilgrims performing Tawaf around the Kaaba at Masjid al-Haram",
    title: "Tawaf at the Kaaba",
    category: "pilgrims",
    description: "Pilgrims performing the sacred Tawaf around the Kaaba",
    height: 420,
    featured: true,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&q=80",
    alt: "The Prophet's Mosque in Madinah at sunset",
    title: "Masjid an-Nabawi at Sunset",
    category: "holy-sites",
    description: "The radiant Prophet's Mosque in Madinah",
    height: 320,
    featured: false,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    alt: "Luxury hotel accommodation in Makkah",
    title: "Premium Hotel Accommodation",
    category: "hotels",
    description: "Comfortable and convenient hotel stays",
    height: 280,
    featured: false,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80",
    alt: "Group of pilgrims walking together in Makkah",
    title: "Group Pilgrimage",
    category: "groups",
    description: "Travelers united in faith and community",
    height: 350,
    featured: false,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80",
    alt: "The Great Pyramids of Giza with camel riders",
    title: "Historic Cairo Landmarks",
    category: "holy-sites",
    description: "Exploring ancient wonders and sacred sites",
    height: 300,
    featured: false,
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dbqdgvvgq/image/upload/v1781877282/jakman1-al-abrar-mecca-15082_1920_x58kgd.jpg",
    alt: "Beautiful view of the Grand Mosque in Makkah",
    title: "Masjid al-Haram",
    category: "holy-sites",
    description: "The sacred heart of the Islamic world",
    height: 380,
    featured: true,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    alt: "Modern transportation for pilgrims",
    title: "Comfortable Transport",
    category: "transport",
    description: "Smooth and reliable travel logistics",
    height: 260,
    featured: false,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    alt: "Pilgrims praying at the Grand Mosque",
    title: "Moments of Prayer",
    category: "pilgrims",
    description: "Spiritual reflection and devotion",
    height: 340,
    featured: false,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1572252009286-268acec5e0d2?w=800&q=80",
    alt: "Group of pilgrims in traditional attire",
    title: "United in Faith",
    category: "groups",
    description: "Diverse pilgrims united in their journey",
    height: 310,
    featured: false,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    alt: "Luxury bus transportation for pilgrims",
    title: "Premium Transport Services",
    category: "transport",
    description: "Comfortable and safe group travel",
    height: 270,
    featured: false,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    alt: "Hotel accommodation with a view of the Holy Mosque",
    title: "Hotels with a View",
    category: "hotels",
    description: "Accommodations close to holy sites",
    height: 290,
    featured: false,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    alt: "Group of pilgrims walking together in Madinah",
    title: "Walking Together",
    category: "groups",
    description: "Community and solidarity in every step",
    height: 320,
    featured: false,
  },
];

// ── Category Data ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All", icon: Grid3x3 },
  { id: "pilgrims", label: "Pilgrims", icon: Users },
  { id: "holy-sites", label: "Holy Sites", icon: MapPin },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "transport", label: "Transport", icon: Bus },
  { id: "groups", label: "Groups", icon: Users2 },
];

// ── Hook: IntersectionObserver for scroll animation ──────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Helper: clamp for inline styles ─────────────────────────────────────────
function clamp(min, pref, max) {
  return `clamp(${min}px, ${pref}, ${max}px)`;
}

// ── Category Filter ──────────────────────────────────────────────────────────
function CategoryFilters({ activeCategory, onCategoryChange }) {
  return (
    <div
      className="gallery-filters"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(6px, 1vw, 12px)",
        marginBottom: "clamp(28px, 4vh, 40px)",
      }}
    >
      {CATEGORIES.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`gallery-filter-btn ${isActive ? "active" : ""}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(11px, 0.9vw, 13px)",
              fontWeight: isActive ? 600 : 450,
              color: isActive ? "#0a0a2e" : "#5a5a6a",
              background: isActive ? "#ffffff" : "transparent",
              border: `1px solid ${isActive ? "rgba(196,151,42,0.3)" : "rgba(0,0,0,0.06)"}`,
              borderRadius: "50px",
              padding: "clamp(6px, 0.8vw, 10px) clamp(14px, 1.5vw, 20px)",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              boxShadow: isActive ? "0 2px 12px rgba(196,151,42,0.12)" : "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "rgba(196,151,42,0.06)";
                e.currentTarget.style.borderColor = "rgba(196,151,42,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)";
              }
            }}
            aria-pressed={isActive}
          >
            <Icon size={14} />
            <span>{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Gallery Image Card ──────────────────────────────────────────────────────
function GalleryImage({ image, index, inView, onImageClick }) {
  const [hovered, setHovered] = useState(false);
  const delay = 0.06 * (index % 8);

  return (
    <div
      className="gallery-item"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `
          opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
          transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s
        `,
        breakInside: "avoid",
        marginBottom: "clamp(12px, 1.5vw, 20px)",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#ffffff",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(196,151,42,0.08)"
          : "0 2px 12px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onImageClick(image)}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onImageClick(image);
        }
      }}
    >
      {/* Image */}
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Overlay with caption - appears on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)
          `,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(16px, 2vw, 24px)",
        }}
      >
        <div
          style={{
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <h4
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "4px",
              lineHeight: 1.2,
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            {image.title}
          </h4>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(11px, 0.85vw, 13px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "8px",
              lineHeight: 1.4,
            }}
          >
            {image.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(9px, 0.7vw, 11px)",
              fontWeight: 500,
              color: "rgba(196,151,42,0.9)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            <ZoomIn size={14} />
            <span>View Full</span>
          </div>
        </div>
      </div>

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "clamp(10px, 1.2vw, 16px)",
          right: "clamp(10px, 1.2vw, 16px)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(8px, 0.6vw, 10px)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#ffffff",
          background: "rgba(196,151,42,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "3px 12px",
          borderRadius: "50px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
          opacity: hovered ? 1 : 0.8,
          transition: "opacity 0.3s ease",
        }}
      >
        {CATEGORIES.find((c) => c.id === image.category)?.label || image.category}
      </div>

      {/* Featured badge */}
      {image.featured && (
        <div
          style={{
            position: "absolute",
            top: "clamp(10px, 1.2vw, 16px)",
            left: "clamp(10px, 1.2vw, 16px)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(8px, 0.6vw, 10px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#C4972A",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "3px 12px",
            borderRadius: "50px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          ✦ Featured
        </div>
      )}
    </div>
  );
}

// ── Lightbox Modal ──────────────────────────────────────────────────────────
function Lightbox({ image, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && hasPrevious) onPrevious();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [handleClose, hasPrevious, hasNext, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!image) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 4vw, 60px)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        animation: "lightboxFade 0.3s ease",
      }}
      onClick={handleClose}
    >
      <style>
        {`
          @keyframes lightboxFade {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes lightboxScale {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "clamp(16px, 2vw, 32px)",
          right: "clamp(16px, 2vw, 32px)",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(196,151,42,0.2)";
          e.currentTarget.style.borderColor = "rgba(196,151,42,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        }}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation buttons */}
      {hasPrevious && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrevious(); }}
          style={{
            position: "absolute",
            left: "clamp(12px, 2vw, 32px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(196,151,42,0.2)";
            e.currentTarget.style.borderColor = "rgba(196,151,42,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "absolute",
            right: "clamp(12px, 2vw, 32px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(196,151,42,0.2)";
            e.currentTarget.style.borderColor = "rgba(196,151,42,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image Container */}
      <div
        style={{
          maxWidth: "90vw",
          maxHeight: "80vh",
          borderRadius: "16px",
          overflow: "hidden",
          animation: "lightboxScale 0.3s ease",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Caption */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(16px, 2vw, 28px)",
            background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(18px, 2vw, 28px)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            {image.title}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(13px, 1vw, 16px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {image.description}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(9px, 0.7vw, 11px)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#C4972A",
                background: "rgba(196,151,42,0.15)",
                padding: "3px 12px",
                borderRadius: "50px",
              }}
            >
              {CATEGORIES.find((c) => c.id === image.category)?.label || image.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gallery — Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Gallery() {
  const [sectionRef, inView] = useInView(0.08);
  const [headerInView, setHeaderInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setHeaderInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Filter images based on category
  const filteredImages = activeCategory === "all"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // Get current image index for lightbox navigation
  const getImageIndex = useCallback(
    (image) => GALLERY_IMAGES.findIndex((img) => img.id === image.id),
    []
  );

  const handleImageClick = (image) => {
    const index = getImageIndex(image);
    setCurrentIndex(index);
    setSelectedImage(image);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : GALLERY_IMAGES.length - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(GALLERY_IMAGES[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < GALLERY_IMAGES.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedImage(GALLERY_IMAGES[newIndex]);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < GALLERY_IMAGES.length - 1;

  // Show featured image first
  const sortedImages = [...filteredImages].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,450;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');

        .gallery-section {
          padding: clamp(48px, 8vh, 80px) clamp(16px, 4vw, 48px);
          background: linear-gradient(180deg, #FFF9E6 0%, #FFFDF7 50%, #FAF5E8 100%);
          position: relative;
          overflow: hidden;
        }

        .gallery-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(196,151,42,0.04) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(196,151,42,0.04) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ── Section Header ────────────────────────────────────────────── */
        .gallery-header {
          text-align: center;
          margin-bottom: clamp(32px, 5vh, 48px);
        }

        .gallery-header .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .gallery-header .eyebrow-line {
          width: clamp(24px, 3vw, 40px);
          height: 1.5px;
          background: #C4972A;
          border-radius: 999px;
        }

        .gallery-header .eyebrow-text {
          font-family: 'Inter', sans-serif;
          font-size: clamp(9px, 0.9vw, 11px);
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #C4972A;
        }

        .gallery-header h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #0a0a2e;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 12px;
        }

        .gallery-header h2 .highlight {
          color: #C4972A;
          position: relative;
        }

        .gallery-header h2 .highlight::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, #C4972A, rgba(196,151,42,0.2));
          border-radius: 3px;
        }

        .gallery-header p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          color: #5a5a6a;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .gallery-header .header-animate {
          opacity: ${headerInView ? 1 : 0};
          transform: translateY(${headerInView ? 0 : 20}px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Masonry Grid ───────────────────────────────────────────────── */
        .gallery-grid {
          column-count: 4;
          column-gap: clamp(12px, 1.5vw, 20px);
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */

        /* Tablet: 3 columns */
        @media (max-width: 1024px) {
          .gallery-grid {
            column-count: 3;
            column-gap: clamp(12px, 1.8vw, 18px);
          }
        }

        /* Small Tablet: 2 columns */
        @media (max-width: 768px) {
          .gallery-section {
            padding: clamp(36px, 5vh, 52px) clamp(14px, 3vw, 20px);
          }
          .gallery-grid {
            column-count: 2;
            column-gap: 12px;
          }
          .gallery-header h2 {
            font-size: 1.4rem;
          }
          .gallery-header p {
            font-size: 13px;
          }
        }

        /* Mobile: 1 column */
        @media (max-width: 480px) {
          .gallery-section {
            padding: 28px 12px 40px;
          }
          .gallery-grid {
            column-count: 1;
            column-gap: 0;
          }
          .gallery-item {
            margin-bottom: 12px;
          }
        }

        /* ── Reduced Motion ──────────────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .gallery-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .gallery-header .header-animate {
            opacity: 1 !important;
            transform: none !important;
          }
          .gallery-item {
            transition: none !important;
          }
          .gallery-item:hover {
            transform: none !important;
          }
        }

        /* ── Hover: no touch devices ────────────────────────────────────── */
        @media (hover: none) {
          .gallery-item {
            transform: none !important;
          }
          .gallery-item:hover {
            transform: none !important;
          }
          .gallery-item img {
            transform: none !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="gallery-section"
        aria-labelledby="gallery-heading"
        id="gallery"
      >
        <div className="gallery-container">
          {/* Section Header */}
          <div className="gallery-header">
            <div className="header-animate">
              <div className="eyebrow">
                <span className="eyebrow-line" aria-hidden="true" />
                <span className="eyebrow-text">Moments of Faith</span>
                <span className="eyebrow-line" aria-hidden="true" />
              </div>

              <h2 id="gallery-heading">
                Capturing the <span className="highlight">Sacred Journey</span>
              </h2>

              <p>
                Real moments from real pilgrims — experiencing the spiritual
                journey of a lifetime.
              </p>
            </div>
          </div>

          {/* Category Filters */}
          <CategoryFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {sortedImages.map((image, index) => (
              <GalleryImage
                key={image.id}
                image={image}
                index={index}
                inView={inView}
                onImageClick={handleImageClick}
              />
            ))}
          </div>

          {/* Bottom Divider */}
          <div
            style={{
              marginTop: "clamp(40px, 6vh, 56px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
              opacity: inView ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(196,151,42,0.12))",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#C4972A",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                flex: 1,
                height: 1,
                background: "linear-gradient(90deg, rgba(196,151,42,0.12), transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={handleCloseLightbox}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
    </>
  );
}