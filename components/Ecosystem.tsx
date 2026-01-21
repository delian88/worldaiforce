import React, { useState } from 'react';
import { ECOSYSTEM_TOOLS } from '../constants.tsx';
import { EcosystemTool } from '../types.ts';
import * as Icons from 'lucide-react';
import { X, CheckCircle2, Globe2 } from 'lucide-react';

interface EcosystemProps {
  onNavigate?: (page: any) => void;
}

const Ecosystem: React.FC<EcosystemProps> = ({ onNavigate }) => {
  const [selectedTool, setSelectedTool] = useState<EcosystemTool | null>(null);

  const closeModal = () => setSelectedTool(null);

  const handleToolClick = (tool: EcosystemTool) => {
    if (tool.id === 'waf-forge' && onNavigate) {
      onNavigate('forge');
      return;
    }
    if (tool.details) {
      setSelectedTool(tool);
    }
  };

  return (
    <section id="ecosystem" className="py-32 bg-transparent relative">
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
            const isSpecial = tool.id === 'podore-core' || tool.id === 'waf-forge';
            
            return (
              <div 
                key={tool.id} 
                onClick={() => handleToolClick(tool)}
                className={`group p-10 rounded-[3rem] glass border-white/10 hover:border-blue-500/30 transition-all hover:translate-y-[-10px] shadow-lg flex flex-col h-full cursor-pointer
                  ${tool.id === 'podore-core' ? 'md:col-span-2 lg:col-span-1 bg-blue-600/5 border-blue-500/20' : ''}
                  ${tool.id === 'waf-forge' ? 'bg-blue-600/5 border-blue-500/20' : ''}`}
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
                
                <h3 className={`font-display text-2xl font-bold mb-4 transition-colors group-hover:text-blue-400`}>
                  {tool.name}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-light flex-grow">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-white/5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {tool.category}
                  </div>
                  {(tool.details || tool.id === 'waf-forge') && (
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-blue-400`}>
                       View Details <Icons.ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      {selectedTool && selectedTool.details && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-4xl glass rounded-[4rem] border-white/10 overflow-hidden shadow-3xl animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                  {React.createElement((Icons as any)[selectedTool.icon] || Icons.Cpu, { size: 36 })}
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">{selectedTool.details.fullTitle}</h3>
                  <p className="text-blue-400 text-xs font-black uppercase tracking-[0.4em] mt-2">World AI Force Node: {selectedTool.id.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors group"
              >
                <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
              <section className="space-y-4">
                <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.6em]">Core Purpose</h4>
                <p className="text-2xl md:text-3xl font-display italic text-slate-200 leading-relaxed">
                  "{selectedTool.details.purpose}"
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-12">
                <section className="space-y-6">
                  <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.6em]">Primary Functions</h4>
                  <ul className="space-y-4">
                    {selectedTool.details.functions.map((func, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-300 text-lg font-light leading-snug">{func}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-6">
                  <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.6em]">Representation</h4>
                  <div className="p-8 bg-blue-600/5 rounded-[2.5rem] border border-blue-500/10">
                    <Globe2 className="w-10 h-10 text-blue-500 mb-6" />
                    <p className="text-slate-400 text-lg font-light leading-relaxed">
                      {selectedTool.details.participants}
                    </p>
                  </div>
                </section>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-white/5 bg-slate-900/40 text-center">
              <button 
                onClick={closeModal}
                className="px-12 py-5 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-blue-500 transition-all text-xs"
              >
                Return to Grid
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Ecosystem;