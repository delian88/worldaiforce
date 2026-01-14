
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full overflow-hidden glass border-white/20 group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background glow that pulses slightly */}
      <div className="absolute inset-0 bg-blue-500/20 animate-pulse group-hover:bg-blue-500/30 transition-colors duration-700"></div>
      
      {/* 
        The official logo. 
        Note: We use mix-blend-mode: lighten to help remove dark backgrounds, 
        or rounded-full overflow-hidden to clip corners of square images.
      */}
      <img 
        src="https://a.jrn.me/waf-logo.png" 
        alt="World AI Force Official Logo" 
        className="w-[110%] h-[110%] object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 [mix-blend-mode:lighten]"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // If the direct link isn't ready, use a colored placeholder with the logo's vibe
          target.src = "https://placehold.co/400x400/020617/3b82f6?text=W";
          target.className = "w-full h-full object-contain relative z-10";
        }}
      />
      
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform pointer-events-none"></div>
    </div>
  );
};

export default Logo;
