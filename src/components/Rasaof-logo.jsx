// Rasaof-logo.jsx (With golden border)
import rasaof from '../images/rasaof.png';
import { useState } from 'react';

export default function RasaofLogo({ size = 48, className = "" }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback SVG logo (your original design)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer golden ring */}
        <circle cx="60" cy="60" r="54" stroke="#C4972A" strokeWidth="2.5" fill="none" />
        <circle cx="60" cy="60" r="50" stroke="#8B6914" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        
        {/* Top text arc */}
        <path id="topText" d="M 15,60 A 45,45 0 0,1 105,60" fill="none" />
        <text fontFamily="'Nunito Sans', 'Open Sans', sans-serif" fontSize="6" fontWeight="900" fill="#C4972A" letterSpacing="2.5">
          <textPath href="#topText" startOffset="12%" textLength="175">
            RASAOF TRAVELS AND TOURS LIMITED
          </textPath>
        </text>
        
        {/* Airplane icon */}
        <g transform="translate(60, 58)">
          {/* Body */}
          <path d="M-20,0 L-8,0 L-4,-8 L0,-8 L-1.5,0 L12,0 L14,-5 L17,-5 L16,0 L18,0 L17,5 L14,5 L12,0 L-1.5,0 L0,8 L-4,8 L-8,0 Z" fill="#C4972A" />
          
          {/* Top wing */}
          <path d="M-10,-4 L-22,-9 L-24,-6 L-12,-2 Z" fill="#A07720" />
          
          {/* Bottom wing */}
          <path d="M-10,4 L-22,9 L-24,6 L-12,2 Z" fill="#A07720" />
          
          {/* Right wing top */}
          <path d="M10,-4 L22,-9 L24,-6 L12,-2 Z" fill="#A07720" />
          
          {/* Right wing bottom */}
          <path d="M10,4 L22,9 L24,6 L12,2 Z" fill="#A07720" />
          
          {/* Tail */}
          <path d="M-4,-8 L0,-8 L-2,-16 Z" fill="#8B6914" />
          
          {/* Cockpit */}
          <circle cx="-12" cy="0" r="2" fill="#8B6914" />
        </g>
        
        {/* Bottom text - decorative */}
        <path id="bottomText" d="M 15,60 A 45,45 0 0,0 105,60" fill="none" />
        <text fontFamily="'Nunito Sans', 'Open Sans', sans-serif" fontSize="4.5" fontWeight="700" fill="#8B6914" letterSpacing="2">
          <textPath href="#bottomText" startOffset="25%" textLength="130">
            ✈️ YOUR TRUSTED TRAVEL PARTNER ✈️
          </textPath>
        </text>
        
        {/* Star accents */}
        <polygon points="60,12 62,18 68,18 63,22 65,28 60,24 55,28 57,22 52,18 58,18" fill="#C4972A" opacity="0.8" />
        <polygon points="60,108 61,102 67,102 62,98 64,92 60,96 56,92 58,98 53,102 59,102" fill="#C4972A" opacity="0.8" />
        <polygon points="12,60 18,58 18,52 22,57 28,55 24,60 28,65 22,63 18,68 18,62" fill="#C4972A" opacity="0.8" />
        <polygon points="108,60 102,58 102,52 98,57 92,55 96,60 92,65 98,63 102,68 102,62" fill="#C4972A" opacity="0.8" />
      </svg>
    );
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#C4972A",
        boxShadow: "0 4px 12px rgba(196,151,42,0.3)",
        border: `2px solid #C4972A`,
      }}
    >
      <img
        src={rasaof}
        alt="RASAOF Travels and Tours Limited"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onError={() => setImageError(true)}
      />
    </div>
  );
}