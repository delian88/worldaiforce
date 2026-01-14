
import React, { useState, useEffect } from 'react';
import Logo from './Logo.tsx';
import { Shield, Power, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = () => {
    setIsInitializing(true);
    // Give it a tiny bit of feel
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-center flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-blue-600/5 -z-10 blur-[150px] animate-pulse"></div>
      
      <div className="relative group mb-12">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="relative z-10 scale-125 md:scale-150">
          <Logo size={180} />
        </div>
      </div>

      <div className="w-full max-w-sm text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-4 h-4 text-blue-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">System Linkage</span>
        </div>
        
        <h2 className="font-display text-2xl font-bold mb-8 tracking-tighter shimmer-text">
          WORLD AI FORCE
        </h2>

        {loadingProgress < 100 ? (
          <div className="space-y-4">
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
              Synthesizing Neural Pathways... {loadingProgress}%
            </p>
          </div>
        ) : (
          <button 
            onClick={handleInitialize}
            className="group relative flex items-center justify-center gap-4 w-full py-5 glass rounded-2xl border-blue-500/30 hover:border-blue-500 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl group-hover:bg-blue-600/20 transition-all"></div>
            {isInitializing ? (
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            ) : (
              <Power className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            )}
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] text-blue-300 group-hover:text-white transition-colors">
              {isInitializing ? 'Decrypting...' : 'Initiate WAF Protocol'}
            </span>
          </button>
        )}
      </div>

      <div className="absolute bottom-12 left-0 right-0 text-center opacity-30">
        <p className="text-[8px] font-black uppercase tracking-[0.8em] text-slate-600">
          Universal Intelligence Node v2.5.0
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
