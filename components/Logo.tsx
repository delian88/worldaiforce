
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full overflow-hidden group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background glow that matches the logo's core energy */}
      <div className="absolute inset-0 bg-blue-500/10 animate-pulse group-hover:bg-blue-400/20 transition-colors duration-700"></div>
      
      {/* 
        Official Logo Integration.
        We use mix-blend-mode: screen to programmatically remove the white/light background
        of the provided image so it looks perfectly transparent on our dark theme.
      */}
      <img 
        src="https://a.jrn.me/waf-logo.png" 
        alt="World AI Force Official Logo" 
        className="w-[115%] h-[115%] object-contain relative z-10 transition-transform duration-700 group-hover:scale-110 [mix-blend-mode:screen] filter brightness-110 contrast-110"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // Fallback to a high-quality representation if the link is unreachable
          target.src = "https://placehold.co/400x400/020617/3b82f6?text=W";
        }}
      />
      
      {/* Interactive shimmer sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform pointer-events-none"></div>
    </div>
  );
};

export default Logo;
