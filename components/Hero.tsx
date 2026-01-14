
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Logo from './Logo.tsx';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const fullText = "Global AI Integration For Every Community";
  
  // Advanced typing rhythm logic
  const typeText = useCallback(() => {
    let currentIdx = 0;
    let isCancelled = false;

    const type = () => {
      if (isCancelled) return;
      
      if (currentIdx <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIdx));
        currentIdx++;
        
        const char = fullText[currentIdx - 1];
        const isPausePoint = char === ' ' && (currentIdx === 7 || currentIdx === 22);
        const delay = isPausePoint ? 350 : 45 + Math.random() * 75;
        
        setTimeout(type, delay);
      } else {
        setIsFinished(true);
      }
    };

    const startDelay = setTimeout(type, 1000);
    return () => {
      isCancelled = true;
      clearTimeout(startDelay);
    };
  }, [fullText]);

  useEffect(() => {
    const cleanup = typeText();
    return cleanup;
  }, [typeText]);

  return (
    <section id="mission" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-slate-950">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Content */}
          <div className="lg:w-3/5 text-left z-10 order-2 lg:order-1">
            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/10 text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 transition-all duration-1000 ${displayText.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Protocol Status: Active</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] min-h-[3.3em] md:min-h-[2.2em]">
              <span className="shimmer-text block lg:inline">
                {displayText}
              </span>
              <span 
                className={`inline-block w-[6px] h-[0.85em] bg-blue-500 ml-3 align-middle shadow-[0_0_20px_rgba(59,130,246,0.8)] 
                ${!isFinished ? 'animate-[blink_0.8s_infinite]' : 'opacity-0'}`}
              ></span>
            </h1>

            <div className={`transition-all duration-1000 delay-500 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-slate-400 text-lg md:text-2xl leading-relaxed mb-12 max-w-2xl font-light">
                World AI Force is building the infrastructure for a more equitable digital future. 
                Universal intelligence is a basic right.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-500/40 transform hover:-translate-y-1 active:scale-95">
                  Enter Ecosystem
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-12 py-5 glass text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-2xl">
                  Mission Charter
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Identity */}
          <div className="lg:w-2/5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-1000 animate-pulse"></div>
              
              {/* Modern Orbital Elements */}
              <div className="absolute inset-[-80px] rounded-full border border-dashed border-white/5 animate-[spin_60s_linear_infinite] opacity-30"></div>
              <div className="absolute inset-[-40px] rounded-full border border-blue-500/20 animate-[spin_40s_linear_infinite_reverse]"></div>
              
              {/* THE ICON */}
              <div className="relative z-10 transition-transform duration-1000 group-hover:scale-110">
                <Logo size={420} className="drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]" />
              </div>
            </div>
          </div>
          
        </div>

        {/* PODORE Launch Preview - Global Central Hub Section with Siren Border */}
        <div className={`mt-24 w-full max-w-5xl mx-auto transition-all duration-1000 delay-1000 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="siren-border-outer rounded-[4rem] p-1 shadow-3xl">
            {/* Animated Siren Border Component */}
            <div className="siren-border-inner"></div>
            
            <div className="relative z-10 bg-slate-950/80 backdrop-blur-3xl rounded-[3.9rem] p-10 md:p-14 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="px-4 py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-xl text-blue-400 text-[10px] font-black tracking-widest uppercase">Global Central Hub</div>
                  <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                  <span className="shimmer-text">PODORE</span> Intelligence
                </h3>
                <p className="text-slate-400 text-base md:text-lg max-w-xl font-medium">
                  The flagship platform for World AI Force toolsets. Launching globally 
                  to unify community intelligence on <span className="text-white font-bold">Jan 25, 2026.</span>
                </p>
              </div>
              
              <div className="flex items-center gap-12 lg:gap-16">
                <div className="text-center group">
                  <div className="text-5xl font-display font-bold text-white mb-2">2026</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-black">Launch Year</div>
                </div>
                <div className="w-px h-16 bg-white/10"></div>
                <div className="text-center group">
                  <div className="text-5xl font-display font-bold text-blue-500 mb-2">JAN</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-slate-600 font-black">Release</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
