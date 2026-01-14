
import React from 'react';
import { ECOSYSTEM_TOOLS } from '../constants';
import * as Icons from 'lucide-react';

const Ecosystem: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">Our <span className="text-blue-500">Ecosystem</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A multi-division framework designed to bridge the gap between AI innovation and community empowerment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ECOSYSTEM_TOOLS.map((tool) => {
            const IconComponent = (Icons as any)[tool.icon];
            return (
              <div 
                key={tool.id} 
                className="group p-8 rounded-3xl glass border-white/5 hover:border-blue-500/30 transition-all hover:translate-y-[-10px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{tool.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tool.description}
                </p>
                <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-500 uppercase">
                  {tool.category}
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
