
import React, { useEffect, useState } from 'react';
import { PODORE_LAUNCH_DATE } from '../constants';
import { CountdownTime } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = PODORE_LAUNCH_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="mission" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-blue-400 text-sm font-semibold mb-8 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>PODORE LAUNCHING JAN 25, 2026</span>
        </div>

        <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-6">
          <span className="block">Empowering Global</span>
          <span className="gradient-text">Communities with AI</span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
          World AI Force is democratizing artificial intelligence to ensure every community 
          has equal access to the tools shaping our digital future.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-all flex items-center gap-2 group">
            Explore Ecosystem
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
            Read Whitepaper
          </button>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item) => (
            <div key={item.label} className="glass p-6 rounded-2xl border-white/5 flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-display font-bold text-blue-400">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-slate-500 text-sm uppercase tracking-widest mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
