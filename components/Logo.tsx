
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center rounded-full group ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      {/* Outer glow aura */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* 
        The exact logo provided. 
        We use clip-path: circle() to remove the white corners of the square image.
        We also use brightness and contrast to make it pop against the dark theme.
      */}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden border border-white/10 shadow-inner">
        <img 
          src="https://worldaiforce.com/wp-content/uploads/2024/04/World-AI-Force-Logo.png" 
          alt="World AI Force Logo" 
          className="w-full h-full object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-110"
          style={{
            clipPath: 'circle(50% at 50% 50%)',
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/400x400/020617/3b82f6?text=WAF";
          }}
        />
      </div>

      {/* Shimmer sweep effect overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] translate-y-[100%] group-hover:translate-x-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>
    </div>
  );
};

export default Logo;
