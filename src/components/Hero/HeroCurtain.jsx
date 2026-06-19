// components/Hero/HeroCurtain.jsx
// ─────────────────────────────────────────────────────────────────────────────
// HeroCurtain — Premium curtain reveal animation
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Briefcase, GraduationCap, Compass, Star, MapPin, Plane, Sparkles } from "lucide-react";

export default function HeroCurtain({ curtainOpen, curtainGone }) {
  if (curtainGone) return null;

  return (
    <div className={`rh-curtain-stage${curtainOpen ? "" : " active"}`} aria-hidden="true">
      <style>{`
        .rh-curtain-stage {
          position: fixed;
          inset: 0;
          z-index: 9000;
          pointer-events: none;
        }
        .rh-curtain-stage.active { pointer-events: auto; }

        .rh-curtain {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
          overflow: hidden;
          transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .rh-curtain-l { left: 0; transform: translateX(0); }
        .rh-curtain-r { right: 0; transform: translateX(0); }
        .rh-curtain-l.open { transform: translateX(-100%); }
        .rh-curtain-r.open { transform: translateX(100%); }

        .rh-curtain-inner {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 20px; padding: 2rem;
        }
        .rh-curtain-bg {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, #0a1a2f 0%, #0d1f3a 100%);
        }
        .rh-curtain-blur {
          position: absolute; inset: 0;
          backdrop-filter: blur(10px);
        }
        .rh-curtain-edge {
          position: absolute; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(255,215,0,0.7), #FFD700, rgba(255,215,0,0.7), transparent);
        }
        .rh-curtain-l .rh-curtain-edge { right: 0; }
        .rh-curtain-r .rh-curtain-edge { left: 0; }

        .rh-curtain-seam {
          position: absolute;
          top: 0; bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(255,215,0,0.7), #FFD700, rgba(255,215,0,0.7), transparent);
          box-shadow: 0 0 15px rgba(255,215,0,0.4);
          z-index: 9010;
          transition: opacity 0.3s ease;
        }

        .rh-curtain-icons {
          position: relative; z-index: 2;
          display: flex; gap: 14px; margin-bottom: 8px;
        }
        .rh-curtain-icon {
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(255,215,0,0.12);
          border: 1px solid rgba(255,215,0,0.3);
          display: flex; align-items: center; justify-content: center;
          animation: curtainFloat 3s ease-in-out infinite;
        }
        .rh-curtain-icon:nth-child(2) { animation-delay: 0.5s; }
        .rh-curtain-icon:nth-child(3) { animation-delay: 1s; }

        .rh-curtain-eyebrow {
          position: relative; z-index: 2;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 3px; text-transform: uppercase;
          color: #FFD700;
        }
        .rh-curtain-title {
          position: relative; z-index: 2;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-weight: 700; color: #fff;
          text-align: center; line-height: 1.25;
          letter-spacing: -0.02em;
        }

        .rh-curtain-loader {
          position: absolute; bottom: 32px; left: 50%;
          transform: translateX(-50%);
          z-index: 9020; display: flex; align-items: center;
          gap: 12px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(16px);
          padding: 10px 24px; border-radius: 100px;
          border: 1px solid rgba(255,215,0,0.4);
        }
        .rh-curtain-loader span {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 1.5px; color: #FFD700;
        }
        .rh-loader-bar {
          width: 50px; height: 2px;
          background: rgba(255,215,0,0.25);
          border-radius: 2px; overflow: hidden;
        }
        .rh-loader-fill {
          height: 100%; width: 100%;
          background: #FFD700;
          animation: curtainLoad 3s linear forwards;
        }

        @keyframes curtainFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes curtainLoad {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 520px) {
          .rh-curtain-icon { width: 38px; height: 38px; }
          .rh-curtain-icon svg { width: 18px; height: 18px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rh-curtain { transition: none !important; }
          .rh-curtain-icon { animation: none !important; }
          .rh-loader-fill { animation: none !important; }
        }
      `}</style>

      {/* Seam */}
      <div className="rh-curtain-seam" style={{ opacity: curtainOpen ? 0 : 1 }} />

      {/* Left curtain */}
      <div className={`rh-curtain rh-curtain-l${curtainOpen ? " open" : ""}`}>
        <div className="rh-curtain-bg" />
        <div className="rh-curtain-blur" />
        <div className="rh-curtain-inner">
          <div className="rh-curtain-icons">
            {[Briefcase, GraduationCap, Compass].map((Icon, i) => (
              <div key={i} className="rh-curtain-icon">
                <Icon size={22} color="#FFD700" strokeWidth={1.5} />
              </div>
            ))}
          </div>
          <p className="rh-curtain-eyebrow">Premium Processing</p>
          <p className="rh-curtain-title">Work Visa · Study · Tourism</p>
        </div>
        <div className="rh-curtain-edge" />
      </div>

      {/* Right curtain */}
      <div className={`rh-curtain rh-curtain-r${curtainOpen ? " open" : ""}`}>
        <div className="rh-curtain-bg" />
        <div className="rh-curtain-blur" />
        <div className="rh-curtain-inner">
          <div className="rh-curtain-icons">
            {[Star, MapPin, Plane].map((Icon, i) => (
              <div key={i} className="rh-curtain-icon">
                <Icon size={22} color="#FFD700" strokeWidth={1.5} />
              </div>
            ))}
          </div>
          <p className="rh-curtain-eyebrow">Sacred Pilgrimage</p>
          <p className="rh-curtain-title">HAJJ &amp; UMRAH</p>
        </div>
        <div className="rh-curtain-edge" />
      </div>

      {/* Loader */}
      {!curtainOpen && (
        <div className="rh-curtain-loader">
          <Sparkles size={14} color="#FFD700" />
          <span>PREMIUM EXPERIENCE</span>
          <div className="rh-loader-bar">
            <div className="rh-loader-fill" />
          </div>
        </div>
      )}
    </div>
  );
}