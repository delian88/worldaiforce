
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full overflow-hidden glass border-white/10 group ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-500"></div>
      
      {/* 
        The logo image. 
        Note: We use mix-blend-mode to help integrate the image if it has a non-transparent background.
        We assume the logo file is named 'logo.png' in the root.
      */}
      <img 
        src="logo.png" 
        alt="WAF Logo" 
        className="w-full h-full object-contain relative z-10 scale-90 group-hover:scale-100 transition-transform duration-500"
        onError={(e) => {
          // Fallback if image doesn't exist yet
          const target = e.target as HTMLImageElement;
          target.src = "https://placehold.co/400x400/020617/60a5fa?text=WAF";
        }}
      />
      
      {/* Shimmer overlay for the logo box itself */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};

export default Logo;
