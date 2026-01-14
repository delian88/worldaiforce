
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div 
      className={`relative inline-block select-none group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Glow Depth */}
      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[40px] -z-10 group-hover:bg-blue-400/20 transition-all duration-1000 animate-pulse"></div>
      
      <svg 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-brand drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="centerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A5F3FC" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <clipPath id="circleMask">
            <circle cx="250" cy="250" r="235" />
          </clipPath>
        </defs>

        {/* Outer Stylized Ring */}
        <circle cx="250" cy="250" r="242" stroke="url(#ringGradient)" strokeWidth="8" strokeOpacity="0.8" />
        
        {/* The Four Quadrants - Precise Colors from Reference */}
        <g clipPath="url(#circleMask)">
          {/* Top Left - Navy */}
          <rect x="0" y="0" width="250" height="250" fill="#0000A0" />
          {/* Top Right - Royalish Blue */}
          <rect x="250" y="0" width="250" height="250" fill="#1B80B8" />
          {/* Bottom Left - Steel Blue */}
          <rect x="0" y="250" width="250" height="250" fill="#3B7BC6" />
          {/* Bottom Right - Deep Blue */}
          <rect x="250" y="250" width="250" height="250" fill="#000095" />
        </g>

        {/* High-Tech Divider Lines */}
        <rect x="246" y="10" width="8" height="480" fill="#A5F3FC" fillOpacity="0.5" />
        <rect x="10" y="246" width="480" height="8" fill="#A5F3FC" fillOpacity="0.5" />

        {/* Central Intelligence Core */}
        <circle cx="250" cy="250" r="115" fill="#2563EB" fillOpacity="0.3" className="animate-pulse" />
        <circle cx="250" cy="250" r="95" fill="url(#centerGlow)" fillOpacity="0.9" />

        {/* The W Mark */}
        <path 
          d="M165 170H205L250 315L295 170H335L385 340H345L315 225L275 340H225L185 225L155 340H115L165 170Z" 
          fill="white"
          fillOpacity="0.95"
          stroke="#A5F3FC"
          strokeWidth="2"
        />

        {/* The Sparkle Star (Center) */}
        <path 
          d="M250 215 L262 240 L287 250 L262 260 L250 285 L238 260 L213 250 L238 240 Z" 
          fill="white"
        >
          <animate 
            attributeName="opacity" 
            values="0.5;1;0.5" 
            dur="2s" 
            repeatCount="indefinite" 
          />
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            from="1" 
            to="1.3" 
            dur="1s" 
            additive="sum"
            pivot="250 250"
            repeatCount="indefinite" 
          />
        </path>

        {/* Lens Flare Sweep */}
        <g style={{ mixBlendMode: 'screen' }}>
          <rect x="-600" y="0" width="150" height="600" fill="white" fillOpacity="0.1" transform="rotate(30)">
            <animate 
              attributeName="x" 
              from="-600" 
              to="1200" 
              dur="6s" 
              repeatCount="indefinite" 
            />
          </rect>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
