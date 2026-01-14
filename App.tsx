
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Ecosystem from './components/Ecosystem.tsx';
import WafAssistant from './components/WafAssistant.tsx';
import Logo from './components/Logo.tsx';
import { FEATURES } from './constants.tsx';
import { ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Value Props Section */}
        <section id="ethics" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              {FEATURES.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/20 shadow-lg">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Ecosystem />

        {/* Global Impact Section */}
        <section id="podore" className="py-24 glass mx-4 md:mx-10 rounded-[4rem] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
                  Empowering <span className="shimmer-text">Underserved</span> Communities
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  World AI Force is not just a platform; it is a movement. We connect individuals, organizations, and governments to drive social progress through ethical AI. 
                  Our upcoming tool, <strong className="shimmer-text">PODORE</strong>, will serve as the gateway for seamless interaction with our global AI grid.
                </p>
                <div className="space-y-4">
                  {[
                    'Democratizing AI knowledge access',
                    'Ethical and inclusive AI frameworks',
                    'Bridging the global digital divide',
                    'Collaborative innovation ecosystems'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://picsum.photos/seed/waf1/400/400" className="rounded-3xl hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0 shadow-2xl border border-white/10" alt="AI Impact" />
                  <div className="p-8 glass rounded-3xl text-center border border-white/10">
                    <span className="block text-4xl font-bold shimmer-text mb-1">50+</span>
                    <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Global Nodes</span>
                  </div>
                </div>
                <div className="space-y-4 mt-12">
                  <div className="p-8 glass rounded-3xl text-center border border-white/10 shadow-lg shadow-blue-500/5">
                    <span className="block text-4xl font-bold shimmer-text mb-1">100k+</span>
                    <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Community Members</span>
                  </div>
                  <img src="https://picsum.photos/seed/waf2/400/500" className="rounded-3xl hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0 shadow-2xl border border-white/10" alt="Global Network" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-10">
              Be Part of the <br />
              <span className="shimmer-text">Future of Intelligence</span>
            </h2>
            <p className="text-slate-400 mb-12 text-lg">
              The digital revolution should belong to everyone. Join the World AI Force today and help us build a more inclusive, ethical, and intelligent world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-blue-500 min-w-[300px] text-white"
              />
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20">
                Join the waitlist <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo size={48} className="glow-blue" />
                <span className="font-display font-bold text-2xl tracking-tight">
                  WORLD <span className="shimmer-text">AI</span> FORCE
                </span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                A globally integrated, multi-division ecosystem designed to democratize AI and ensure digital equity for all communities.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-[0.2em]">Platform</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">PODORE Beta</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ecosystem Grid</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Developer Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-[0.2em]">Company</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Mission</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ethics Board</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Global Impact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs">
              &copy; 2024 - 2026 World AI Force. All rights reserved. Shaping an ethical future.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'Discord', 'LinkedIn', 'GitHub'].map(social => (
                <a key={social} href="#" className="text-slate-600 hover:text-white transition-colors text-sm">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <WafAssistant />
    </div>
  );
};

export default App;
