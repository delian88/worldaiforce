import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-32 right-8 z-[90] w-12 h-12 glass border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:bg-blue-600/10 hover:text-white hover:scale-110 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 group"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
      <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-pulse -z-10"></div>
    </button>
  );
};

export default ScrollToTop;