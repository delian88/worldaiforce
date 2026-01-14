
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  // Using the high-resolution logo provided by the user
  const logoSrc = "https://worldaiforce.com/wp-content/uploads/2024/04/World-AI-Force-Logo.png";

  return (
    <div 
      className={`relative inline-block transition-all duration-700 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse scale-150"></div>
      
      <img 
        src={logoSrc} 
        alt="World AI Force Official Logo" 
        className="block w-full h-full object-contain select-none animate-brand transition-all duration-500 hover:brightness-125"
        style={{
          filter: 'drop-shadow(0 0 12px rgba(96, 165, 250, 0.4))'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://placehold.co/400x400/020617/3b82f6?text=WAF";
        }}
      />
      
      {/* Decorative Outer Ring for specific size context */}
      {size > 100 && (
        <div className="absolute inset-[-15%] border border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
      )}
    </div>
  );
};

export default Logo;
