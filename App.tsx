
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Ecosystem from './components/Ecosystem.tsx';
import WafForge from './components/WafForge.tsx';
import WafAssistant from './components/WafAssistant.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import Logo from './components/Logo.tsx';
import { FEATURES } from './constants.tsx';
import { playWelcomeGreeting } from './services/voiceService.ts';
import { ExternalLink, ArrowUpRight, Mail, MapPin, Globe, CheckCircle2, Phone, Target, Eye } from 'lucide-react';

const App: React.FC = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!appReady) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [appReady]);

  const handleInit = () => {
    setAppReady(true);
    playWelcomeGreeting();
  };

  if (!appReady) {
    return <LoadingScreen onComplete={handleInit} />;
  }

  return (
    <div className="min-h-screen relative animate-in fade-in duration-1000">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Core Pillars Section */}
        <section id="ethics" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 reveal-on-scroll">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Ethical <span className="shimmer-text">Pillars</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Built on a foundation of radical inclusivity and digital sovereignty.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {FEATURES.map((feat, idx) => (
                <div key={idx} className="reveal-on-scroll flex flex-col items-center text-center group p-10 rounded-[2.5rem] glass-card" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New About Us Section */}
        <section id="about-us" className="py-32 relative bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="reveal-on-scroll">
                   <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      <Target className="w-3 h-3" />
                      Our Purpose
                   </div>
                   <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                     Democratizing the <span className="shimmer-text">Future</span>
                   </h2>
                   <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                      <p>
                        At World AI Force, we believe that artificial intelligence is the most transformative tool in human history. Yet, its power is often concentrated in the hands of a few. Our mission is to break those barriers.
                      </p>
                      <p>
                        We are a decentralized collective of engineers, ethicists, and visionaries dedicated to building a global infrastructure where every community—regardless of geography or economic status—has the sovereign right to access and build with AI.
                      </p>
                   </div>
                </div>

                <div className="grid gap-8 reveal-on-scroll">
                   <div className="p-10 rounded-[2.5rem] glass-card border-blue-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                          <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-2xl font-display font-bold">The Mission</h4>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        To provide the tools, education, and infrastructure necessary for global AI equity. We aim to decentralize intelligence and return control to the people.
                      </p>
                   </div>

                   <div className="p-10 rounded-[2.5rem] glass-card border-purple-500/20">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-purple-600/20 rounded-xl text-purple-400">
                          <Eye className="w-6 h-6" />
                        </div>
                        <h4 className="text-2xl font-display font-bold">The Vision</h4>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        A world where AI is as fundamental as electricity—invisible, pervasive, and empowering for every individual on the planet.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </section>

        <Ecosystem />

        <WafForge />

        {/* Detailed About Section */}
        <section id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 relative reveal-on-scroll">
                <div className="absolute inset-0 bg-blue-600/20 rounded-[3rem] blur-3xl -z-10 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=2000&auto=format&fit=crop" 
                  className="rounded-[3rem] shadow-2xl border border-white/10 relative z-10 transition-all duration-1000"
                  alt="WAF Innovation"
                />
                <div className="absolute -bottom-6 -right-6 glass p-8 rounded-3xl border-white/20 z-20 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl animate-bounce">
                      <Globe className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">120+</div>
                      <div className="text-[10px] uppercase tracking-widest text-blue-400 font-black">Global Partners</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 reveal-on-scroll">
                <div className="mb-6 flex items-center gap-2 text-blue-500 font-bold tracking-[0.3em] text-xs uppercase">
                  <span>About the Protocol</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
                  World <span className="shimmer-text">AI</span> Force
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
                  Founded on the belief that intelligence is a universal right, WAF operates as a multi-division framework. We don't just build tools; we build the infrastructure for a more equitable digital future.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Community Research Labs',
                    'Ethical Deployment Gateways',
                    'Digital Sovereignty Advocate',
                    'Universal Access Protocols'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 glass rounded-2xl border-white/5 group hover:bg-white/5 transition-colors">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-[3rem] border-white/10 p-10 md:p-16 relative overflow-hidden reveal-on-scroll">
              <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-600/5 -z-0 blur-[100px]"></div>
              
              <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                <div className="lg:w-1/2">
                  <h2 className="font-display text-4xl font-bold mb-6">Initiate <span className="shimmer-text">Contact</span></h2>
                  <p className="text-slate-400 mb-12 text-lg">
                    Join our decentralized network of researchers and developers.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Direct Channel</div>
                        <div className="text-lg font-medium">contact@worldaiforce.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Synaptic Line</div>
                        <div className="text-lg font-medium">+1-240-813-0308</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Global HQ</div>
                        <div className="text-lg font-medium leading-tight">Upper Marlboro, MD, 20772 USA</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-4">
                  <input type="text" placeholder="Identity / Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" />
                  <input type="email" placeholder="Communication / Email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600" />
                  <textarea placeholder="Your Transmission" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-600"></textarea>
                  <button className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 active:scale-[0.98]">
                    Transmit Securely
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/10 glass mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-4 mb-8">
                <Logo size={64} />
                <span className="font-display font-bold text-2xl tracking-tighter uppercase">
                  World <span className="shimmer-text">AI</span> Force
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 font-light">
                Democratizing intelligence through an ethical, decentralized framework.
              </p>
              <div className="space-y-2 mb-6 text-sm text-slate-500">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1-240-813-0308</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Upper Marlboro, MD, 20772 USA</p>
              </div>
              <a 
                href="https://azariahmg.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all group"
              >
                <span className="text-[10px] font-bold tracking-widest uppercase">Powered by <span className="text-blue-400">Azariah MG</span></span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.4em]">Nodes</h4>
                <ul className="space-y-3 text-slate-500 text-sm">
                  <li><a href="#mission" className="hover:text-blue-400 transition-colors">Mission</a></li>
                  <li><a href="#ecosystem" className="hover:text-blue-400 transition-colors">Ecosystem</a></li>
                  <li><a href="#about" className="hover:text-blue-400 transition-colors">Protocol</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.4em]">Grid</h4>
                <ul className="space-y-3 text-slate-500 text-sm">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter X</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em]">
              &copy; 2024 - 2026 World AI Force. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-600 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-colors">Legal</a>
              <a href="#" className="text-slate-600 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-colors">Ethics</a>
            </div>
          </div>
        </div>
      </footer>

      <WafAssistant />
    </div>
  );
};

export default App;
