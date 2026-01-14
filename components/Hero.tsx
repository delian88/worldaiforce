
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Logo from './Logo.tsx';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Global AI Integration For Every Community";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 70); // Smooth typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mission" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-slate-950">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Left Side: Content */}
          <div className="lg:w-3/5 text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-[10px] font-bold mb-8 uppercase tracking-[0.2em] text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Empowering Global Intelligence</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.2] min-h-[3.6em] md:min-h-[2.4em]">
              <span className="cursor-blink">{displayText}</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              World AI Force is bridging the technological divide. We provide the infrastructure, 
              education, and ethical frameworks required to bring cutting-edge AI to every corner of the globe.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-500/20 transform hover:-translate-y-1">
                Explore Our Ecosystem
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20 backdrop-blur-xl">
                Read Vision Paper
              </button>
            </div>
          </div>

          {/* Right Side: Featured Logo */}
          <div className="lg:w-2/5 flex justify-center items-center">
            <div className="relative p-4 md:p-8">
              {/* Subtly animated decorative backdrops that don't affect the logo itself */}
              <div className="absolute inset-0 rounded-full border border-blue-500/5 scale-125 animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full border border-purple-500/5 scale-110 animate-[spin_40s_linear_infinite_reverse]"></div>
              
              {/* THE LOGO - Static and clear as provided */}
              <div className="relative z-10">
                <Logo size={480} className="drop-shadow-[0_0_40px_rgba(59,130,246,0.15)]" />
              </div>
            </div>
          </div>
          
        </div>

        {/* PODORE Countdown Notice */}
        <div className="mt-24 w-full max-w-4xl mx-auto p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500/10 via-white/5 to-purple-500/10">
          <div className="bg-slate-950/90 backdrop-blur-3xl rounded-[2.4rem] p-8 md:p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-display font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                Next Milestone: <span className="shimmer-text">PODORE</span>
              </h3>
              <p className="text-slate-500 text-sm tracking-wide">
                Our centralized global intelligence hub. Launching January 25, 2026.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2026</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Year</div>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">JAN</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
