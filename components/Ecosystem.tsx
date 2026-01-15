import React from 'react';
import { ECOSYSTEM_TOOLS } from '../constants.tsx';
import * as Icons from 'lucide-react';

const Ecosystem: React.FC = () => {
  return (
    <section id="ecosystem" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Unified Framework</span>
          <h2 className="font-display text-4xl md:text-7xl font-bold mb-6">Global <span className="shimmer-text">Ecosystem</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our multi-division architecture is designed to host the next generation of decentralized intelligence tools, empowering every community node.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ECOSYSTEM_TOOLS.map((tool, index) => {
            const IconComponent = (Icons as any)[tool.icon] || Icons.Cpu;
            const isSpecial = tool.id === 'podore-core';
            
            return (
              <div 
                key={tool.id} 
                className={`group p-10 rounded-[3rem] glass border-white/10 hover:border-blue-500/30 transition-all hover:translate-y-[-10px] shadow-lg flex flex-col h-full
                  ${isSpecial ? 'md:col-span-2 lg:col-span-1 bg-blue-600/5 border-blue-500/20' : ''}`}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
                    ${isSpecial ? 'bg-blue-600 text-white shadow-3xl shadow-blue-500/40' : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <span className="text-[40px] font-display font-bold text-white/5 group-hover:text-blue-500/10 transition-colors">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-light flex-grow">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {tool.category}
                  </div>
                  {tool.id === 'waf-forge' && (
                    <span className="text-[10px] font-black text-green-400 uppercase tracking-widest animate-pulse">● Active</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;