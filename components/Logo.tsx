
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <img 
      src="https://worldaiforce.com/wp-content/uploads/2024/04/World-AI-Force-Logo.png" 
      alt="World AI Force Official Logo" 
      className={`block object-contain ${className}`}
      style={{ 
        width: size, 
        maxWidth: '100%',
        height: 'auto'
      }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "https://placehold.co/400x400/020617/3b82f6?text=WAF";
      }}
    />
  );
};

export default Logo;
