
import React from 'react';
import { ArrowRight, Globe2, ShieldCheck, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="mission" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-white/10 text-xs font-bold mb-8 transition-all hover:scale-105 hover:border-blue-500/30">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="shimmer-text tracking-[0.2em] uppercase">The Future of Global Intelligence</span>
          </div>

          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            Global <span className="gradient-text">AI Integration</span> <br />
            For Every Community
          </h1>

          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12">
            World AI Force is a globally integrated ecosystem designed to democratize access 
            to intelligence. We bridge the gap between cutting-edge technology and underserved communities through ethical, inclusive innovation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <button className="px-10 py-5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all flex items-center gap-3 group shadow-2xl shadow-blue-500/20 transform hover:-translate-y-1">
              Explore the Ecosystem
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20 backdrop-blur-xl">
              Our Vision Paper
            </button>
          </div>

          {/* Featured Project Notice */}
          <div className="w-full max-w-4xl p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20">
            <div className="bg-slate-950/80 backdrop-blur-2xl rounded-[2.4rem] p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-display font-bold mb-2 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  Upcoming: <span className="shimmer-text">PODORE</span>
                </h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Our flagship centralized platform for seamless AI tool integration. Launching Jan 25, 2026.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold shimmer-text">2026</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Launch Year</div>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">JAN</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Target Month</div>
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
