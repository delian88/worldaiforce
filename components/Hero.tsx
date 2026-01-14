
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import Logo from './Logo.tsx';

interface HeroProps {
  onNavigate: (page: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [displayText, setDisplayText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const fullText = "Global AI Integration For Every Community";
  
  const typeText = useCallback(() => {
    let currentIdx = 0;
    let isCancelled = false;

    const type = () => {
      if (isCancelled) return;
      
      if (currentIdx <= fullText.length) {
        setDisplayText(fullText.substring(0, currentIdx));
        currentIdx++;
        const delay = 45 + Math.random() * 75;
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
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-3/5 text-left z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/10 text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Universal Access Protocol</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] min-h-[3.3em] md:min-h-[2.2em]">
              <span className="shimmer-text block lg:inline">
                {displayText}
              </span>
              <span className={`inline-block w-[6px] h-[0.85em] bg-blue-500 ml-3 align-middle shadow-[0_0_20px_rgba(59,130,246,0.8)] ${!isFinished ? 'animate-[blink_0.8s_infinite]' : 'opacity-0'}`}></span>
            </h1>

            <div className={`transition-all duration-1000 delay-500 ${isFinished ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-slate-400 text-lg md:text-2xl leading-relaxed mb-12 max-w-2xl font-light">
                World AI Force is building the infrastructure for a more equitable digital future. 
                Universal intelligence is a basic right.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button onClick={() => onNavigate('forge')} className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-blue-500/40 transform hover:-translate-y-1">
                  Access Forge
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => onNavigate('mission')} className="px-12 py-5 glass text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-2xl">
                  Our Mission
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center items-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-1000 animate-pulse"></div>
              <div className="absolute inset-[-80px] rounded-full border border-dashed border-white/5 animate-[spin_60s_linear_infinite] opacity-30"></div>
              <div className="relative z-10">
                <Logo size={420} className="drop-shadow-[0_0_60px_rgba(59,130,246,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
