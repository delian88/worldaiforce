
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
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10 group-hover:bg-blue-400/30 transition-all duration-700 animate-pulse"></div>
      
      <svg 
        viewBox="0 0 500 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-brand drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"
      >
        <defs>
          <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <clipPath id="circleClip">
            <circle cx="250" cy="250" r="230" />
          </clipPath>
        </defs>

        {/* Outer Ring */}
        <circle cx="250" cy="250" r="245" stroke="url(#outerGradient)" strokeWidth="10" />
        
        {/* Quadrants Container */}
        <g clipPath="url(#circleClip)">
          {/* Top Left - Darkest */}
          <rect x="0" y="0" width="250" height="250" fill="#00008B" />
          {/* Top Right - Medium Blue */}
          <rect x="250" y="0" width="250" height="250" fill="#1E40AF" />
          {/* Bottom Left - Lighter Blue */}
          <rect x="0" y="250" width="250" height="250" fill="#2563EB" />
          {/* Bottom Right - Dark Blue */}
          <rect x="250" y="250" width="250" height="250" fill="#1E3A8A" />
        </g>

        {/* Crosshair Dividers */}
        <rect x="242" y="20" width="16" height="460" fill="#93C5FD" fillOpacity="0.6" />
        <rect x="20" y="242" width="460" height="16" fill="#93C5FD" fillOpacity="0.6" />

        {/* Center Glow Circle */}
        <circle cx="250" cy="250" r="110" fill="#60A5FA" fillOpacity="0.5" />
        <circle cx="250" cy="250" r="95" fill="url(#centerGradient)" />

        {/* The 'W' */}
        <path 
          d="M170 160H210L250 310L290 160H330L380 340H340L310 220L270 340H230L190 220L160 340H120L170 160Z" 
          fill="white" 
          className="animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <path 
          d="M170 160H210L250 310L290 160H330L380 340H340L310 220L270 340H230L190 220L160 340H120L170 160Z" 
          stroke="#93C5FD" 
          strokeWidth="4"
        />

        {/* Center Star Sparkle */}
        <path 
          d="M250 200L265 235L300 250L265 265L250 300L235 265L200 250L235 235L250 200Z" 
          fill="white"
          className="drop-shadow-lg"
        >
          <animateTransform 
            attributeName="transform" 
            type="scale" 
            values="1;1.2;1" 
            dur="2s" 
            repeatCount="indefinite" 
          />
        </path>

        {/* Sweep Glare Effect */}
        <rect x="-500" y="0" width="200" height="500" fill="white" fillOpacity="0.1" transform="rotate(25)">
          <animate 
            attributeName="x" 
            from="-500" 
            to="1000" 
            dur="4s" 
            repeatCount="indefinite" 
          />
        </rect>
      </svg>
    </div>
  );
};

export default Logo;
