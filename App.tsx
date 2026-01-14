
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
import { Target, Eye, ShieldCheck, Globe, Zap, ArrowRight, Download, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

type Page = 'home' | 'mission' | 'forge' | 'ecosystem' | 'about' | 'contact';

const App: React.FC = () => {
  const [appReady, setAppReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    if (!appReady) return;
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [appReady, currentPage]);

  const handleInit = () => {
    setAppReady(true);
    playWelcomeGreeting();
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!appReady) {
    return <LoadingScreen onComplete={handleInit} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigate} />
            <section className="py-24 bg-slate-950/50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  {FEATURES.map((feat, idx) => (
                    <div key={idx} className="reveal-on-scroll p-10 rounded-[2.5rem] glass-card flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 border border-white/5">
                        {feat.icon}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-3">{feat.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <div className="py-20 flex justify-center">
               <button onClick={() => navigate('forge')} className="px-12 py-5 bg-blue-600 rounded-full font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-3xl shadow-blue-500/20">
                 Open WAF Forge Platform
               </button>
            </div>
          </>
        );
      case 'mission':
        return (
          <section className="pt-40 pb-32 min-h-screen bg-slate-950">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center mb-20">
                <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Charter 001</span>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">The <span className="shimmer-text">Mission</span></h1>
                <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
                <p className="text-2xl md:text-4xl text-white font-light leading-relaxed text-center mb-12">
                  "To ensure equitable access to AI tools, education, economic opportunities, and global participation for underserved communities transforming AI into a force for inclusion, safety, and shared prosperity."
                </p>
                <div className="grid md:grid-cols-2 gap-12 mt-16">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-blue-400">
                      <ShieldCheck className="w-6 h-6" /> Safety First
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Implementing radical safety protocols to ensure AI remains a beneficial force for humanity.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-purple-400">
                      <Globe className="w-6 h-6" /> Global Equity
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Breaking geographical barriers through decentralized node infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'forge':
        return <WafForge />;
      case 'ecosystem':
        return (
          <div className="pt-40 bg-slate-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 mb-20">
               <div className="text-center mb-16">
                 <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Global <span className="shimmer-text">Ecosystem</span></h1>
                 <p className="text-slate-400 text-xl max-w-3xl mx-auto font-light">
                   A unified set of divisions designed to advance innovation, digital inclusion, workforce readiness, and responsible AI development worldwide.
                 </p>
               </div>
               
               <div className="siren-border-outer rounded-[3rem] p-1 mb-24">
                 <div className="siren-border-inner opacity-20"></div>
                 <div className="relative z-10 bg-slate-900 rounded-[2.9rem] p-12 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                       <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                         Global Central Hub
                       </div>
                       <h2 className="text-4xl font-display font-bold mb-6">PODORE Digital Platform</h2>
                       <ul className="space-y-4 text-slate-400">
                         <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-blue-500" /> Multi-language interface</li>
                         <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-blue-500" /> Strong cybersecurity and data protection</li>
                         <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-blue-500" /> Accessibility-first design</li>
                         <li className="flex items-center gap-3"><Zap className="w-4 h-4 text-blue-500" /> Built-in AI assistant</li>
                       </ul>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                        <div className="text-3xl font-bold text-white mb-1">100%</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sovereign</div>
                      </div>
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                        <div className="text-3xl font-bold text-blue-500 mb-1">∞</div>
                        <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Scalable</div>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
            <Ecosystem />
          </div>
        );
      case 'about':
        return (
          <section className="pt-40 pb-32 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">About <span className="shimmer-text">WAF</span></h1>
                    <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                      <p>World AI Force (WAF) is a decentralized global intelligence ecosystem. We believe the power of AI should belong to the people, not just a handful of corporations.</p>
                      <p>Since our inception, we have focused on building "The Forge"—a platform where anyone, regardless of their hardware, can generate high-quality visual and textual content using the latest neural architectures.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-12">
                      <div className="p-6 glass rounded-2xl border-white/5">
                        <h4 className="text-3xl font-bold text-white mb-2">2026</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">PODORE Launch</p>
                      </div>
                      <div className="p-6 glass rounded-2xl border-white/5">
                        <h4 className="text-3xl font-bold text-blue-500">120+</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Nodes Active</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[120px] -z-10"></div>
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=2000&auto=format&fit=crop" className="rounded-[3rem] border border-white/10 shadow-3xl" alt="WAF Tech" />
                  </div>
               </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="pt-40 pb-32 bg-slate-950">
            <div className="max-w-5xl mx-auto px-4">
               <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 flex flex-col md:flex-row gap-16">
                  <div className="md:w-1/2">
                    <h2 className="text-4xl font-display font-bold mb-6">Synaptic <span className="shimmer-text">Contact</span></h2>
                    <p className="text-slate-400 mb-12">Establish a secure link with the World AI Force command center.</p>
                    <div className="space-y-8">
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400"><Mail /></div>
                          <div>
                             <div className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Email</div>
                             <div className="text-white font-bold">contact@worldaiforce.com</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400"><Phone /></div>
                          <div>
                             <div className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Synaptic Line</div>
                             <div className="text-white font-bold">+1-240-813-0308</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400"><MapPin /></div>
                          <div>
                             <div className="text-[9px] uppercase tracking-widest text-slate-500 font-black">Global HQ</div>
                             <div className="text-white font-bold">Upper Marlboro, MD, USA</div>
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                     <input type="text" placeholder="Identity" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-blue-500 transition-all text-white" />
                     <input type="email" placeholder="Communication Channel" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-blue-500 transition-all text-white" />
                     <textarea placeholder="Transmission" rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-blue-500 transition-all text-white resize-none"></textarea>
                     <button className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">Transmit</button>
                  </div>
               </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen relative animate-in fade-in duration-1000">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      
      <main>
        {renderPage()}
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
                  <li><button onClick={() => navigate('home')} className="hover:text-blue-400 transition-colors">Home</button></li>
                  <li><button onClick={() => navigate('mission')} className="hover:text-blue-400 transition-colors">Mission</button></li>
                  <li><button onClick={() => navigate('forge')} className="hover:text-blue-400 transition-colors">Forge</button></li>
                  <li><button onClick={() => navigate('ecosystem')} className="hover:text-blue-400 transition-colors">Ecosystem</button></li>
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
