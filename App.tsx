import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Ecosystem from './components/Ecosystem.tsx';
import WafForge from './components/WafForge.tsx';
import WafAssistant from './components/WafAssistant.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import Logo from './components/Logo.tsx';
import { playWelcomeGreeting } from './services/voiceService.ts';
import { 
  ShieldCheck, Globe, Zap, Mail, Phone, MapPin, Lock, Fingerprint, 
  KeyRound, UserPlus, Newspaper, Wallet, Users, Video, Dna, 
  Briefcase, ShoppingBag, MessageSquare, TrendingUp, BarChart3, 
  Layers, Rocket, GraduationCap
} from 'lucide-react';

type Page = 'home' | 'mission' | 'forge' | 'ecosystem' | 'about' | 'contact' | 'privacy';

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

  const openPodOre = () => {
    window.open('https://worldaiforce.org/', '_blank');
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
            
            {/* PodOre REGISTRATION SECTION */}
            <section className="py-32 bg-transparent relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>
               <div className="max-w-7xl mx-auto px-4 relative z-10">
                  <div className="siren-border-outer rounded-[4rem] p-1.5 shadow-2xl overflow-hidden group">
                     <div className="siren-border-inner opacity-25 group-hover:opacity-50 transition-opacity duration-[2000ms]"></div>
                     <div className="relative z-10 bg-slate-900/90 backdrop-blur-3xl rounded-[3.9rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
                        
                        <div className="lg:w-3/5 text-left reveal-on-scroll">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                 <KeyRound className="w-7 h-7" />
                              </div>
                              <span className="text-blue-500 text-[11px] font-black uppercase tracking-[0.7em]">PodOre GLOBAL NETWORK v2.0</span>
                           </div>
                           
                           <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[1] tracking-tighter">
                              Establish Your <br/><span className="shimmer-text">PodOre Account</span>
                           </h2>

                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                              {[
                                 { icon: <Newspaper />, name: "POD Feed", desc: "Share tech" },
                                 { icon: <Briefcase />, name: "Careers", desc: "Jobs/Hiring" },
                                 { icon: <Wallet />, name: "Wallet", desc: "$ Tokens" },
                                 { icon: <Video />, name: "Reels", desc: "AI for Good" },
                                 { icon: <Users />, name: "Boardroom", desc: "Video Calls" },
                                 { icon: <Dna />, name: "Digital LAB", desc: "Investment" },
                                 { icon: <ShoppingBag />, name: "Market", desc: "AI Products" },
                                 { icon: <MessageSquare />, name: "Forum", desc: "Global Topics" },
                                 { icon: <BarChart3 />, name: "Ad-Manager", desc: "Campaigns" },
                                 { icon: <Rocket />, name: "Boosting", desc: "Go Viral" },
                                 { icon: <Layers />, name: "Circles", desc: "Pro Groups" },
                                 { icon: <GraduationCap />, name: "Courses", desc: "Education" }
                              ].map((f, i) => (
                                 <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all hover:bg-white/[0.07]">
                                    <div className="text-blue-500 mb-1.5 w-4 h-4">{f.icon}</div>
                                    <div className="text-[9px] font-black uppercase text-white mb-0.5 tracking-wider">{f.name}</div>
                                    <div className="text-[8px] text-slate-500 font-light truncate">{f.desc}</div>
                                 </div>
                              ))}
                           </div>
                           
                           <div className="flex flex-col sm:flex-row gap-6">
                              <button onClick={openPodOre} className="px-16 py-7 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-3xl flex items-center justify-center gap-4 group text-[10px] transform hover:-translate-y-1">
                                 Create PodOre Account <UserPlus className="w-4 h-4 group-hover:scale-125 transition-transform" />
                              </button>
                           </div>
                        </div>

                        <div className="lg:w-2/5 relative reveal-on-scroll">
                           <div className="relative z-10 p-6">
                              <div className="aspect-[4/5] w-full max-w-[340px] mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] border border-white/10 p-10 flex flex-col items-center justify-between shadow-3xl relative overflow-hidden group/card">
                                 <div className="text-center w-full">
                                    <div className="w-32 h-32 bg-blue-600/10 rounded-full mx-auto mb-8 flex items-center justify-center relative">
                                       <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping"></div>
                                       <Fingerprint className="w-12 h-12 text-blue-500" />
                                    </div>
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em] mb-3">Neural Core Verified</div>
                                    <div className="text-3xl font-display font-bold text-white tracking-tighter uppercase">Global Node</div>
                                 </div>
                                 <div className="w-full space-y-3 pt-12 border-t border-white/5">
                                    <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                       <span>Node: PodOre-Mainnet</span>
                                       <span>v2.0.1</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Neural Forge Terminal */}
            <section className="py-24 bg-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 -z-10 blur-[120px]"></div>
              <div className="max-w-7xl mx-auto px-4">
                 <div className="text-center mb-16 reveal-on-scroll">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      <Zap className="w-3 h-3" /> System Status: Online
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight">Neural <span className="shimmer-text">Forge</span> Terminal</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                      Instant synaptic access to the WAF generation engine. Envision visuals, synthesize lexicon, and initiate motion sequences directly from the global hub.
                    </p>
                 </div>
                 
                 <div className="reveal-on-scroll">
                    <WafForge />
                 </div>
              </div>
            </section>
          </>
        );
      case 'mission':
        return (
          <section className="pt-40 pb-32 min-h-screen bg-transparent">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h1 className="text-6xl md:text-8xl font-display font-bold mb-12 tracking-tight">The <span className="shimmer-text">Mission</span></h1>
              <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10">
                <p className="text-3xl md:text-4xl text-white font-display font-light leading-relaxed">
                  "To ensure equitable access to AI tools, education, economic opportunities, and global participation for underserved communities transforming AI into a force for inclusion, safety, and shared prosperity."
                </p>
              </div>
            </div>
          </section>
        );
      case 'forge':
        return <div className="pt-40 pb-32 bg-transparent"><WafForge /></div>;
      case 'ecosystem':
        return <Ecosystem />;
      case 'about':
        return (
          <section className="pt-40 pb-32 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="reveal-on-scroll">
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">About <span className="shimmer-text">WAF</span></h1>
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-8">
                      World AI Force is a global digital ecosystem integrating innovation, education, economic inclusion, governance, and ethical AI into one platform designed to ensure that AI creates opportunity for everyone, everywhere.
                    </p>
                    <p className="text-slate-500 text-base font-light leading-relaxed">
                      Our PodOre platform represents the culmination of decentralized development, designed for the "AI for Good" global movement. Anything outside the scope of ethical, human-centric development is automatically filtered by our AI Global Ranking System.
                    </p>
                  </div>
                  <div className="relative reveal-on-scroll">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-[4rem] blur-[60px] animate-pulse -z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000" 
                      className="rounded-[4rem] border border-white/10 shadow-3xl" 
                      alt="WAF Neural Technology Visual" 
                    />
                  </div>
               </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="pt-40 pb-32 bg-transparent">
            <div className="max-w-5xl mx-auto px-4">
               <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 reveal-on-scroll active text-center">
                  <h2 className="text-5xl font-display font-bold mb-8 uppercase">Synaptic <span className="shimmer-text">Contact</span></h2>
                  <div className="space-y-4 mb-12">
                     <p className="text-white font-display font-bold text-4xl">contact@worldaiforce.com</p>
                     <p className="text-blue-500 font-black tracking-[0.5em] uppercase text-sm">+1-240-813-0308</p>
                  </div>
                  <div className="flex justify-center gap-4">
                     <button className="px-12 py-5 bg-blue-600 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all">Establish Link</button>
                  </div>
               </div>
            </div>
          </section>
        );
      case 'privacy':
        return (
          <section className="pt-40 pb-32 min-h-screen bg-transparent">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/10 text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">
                    <Lock className="w-4 h-4" /> Legal Trust Framework
                 </div>
                 <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight">World AI Force™ <br/><span className="shimmer-text">Privacy Policy</span></h1>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-12">Effective Date: October 2024</p>
              </div>

              <div className="glass p-10 md:p-20 rounded-[4rem] border-white/10 font-light leading-relaxed text-slate-300">
                <div className="max-w-4xl mx-auto space-y-12">
                  <section className="space-y-6">
                    <p className="text-lg leading-relaxed">World AI Force (“WAF,” “we,” “our,” or “us”) is committed to protecting your privacy and ensuring that your personal data is handled lawfully, transparently, and securely. This Privacy Policy explains how we collect, use, store, share, and protect your data when you sign up for or use our platform, including our digital boardrooms, developer tools, AI product marketplace, news syndication systems, and any related services.</p>
                    <p className="font-bold text-white">By using World AI Force, you agree to the practices described in this Privacy Policy.</p>
                  </section>

                  <section className="space-y-6">
                    <h2 className="text-3xl font-display font-bold text-blue-400">1. Information We Collect</h2>
                    <h3 className="font-bold text-white uppercase text-xs tracking-widest">1.1 Personal Information Provided by You</h3>
                    <p className="text-sm">We may collect: Full name, Email address, Phone number, Password (encrypted), Profile information, Developer details, Payment information.</p>
                    <h3 className="font-bold text-white uppercase text-xs tracking-widest">1.2 Automatically Collected Information</h3>
                    <p className="text-sm">Device info, IP address, Usage patterns, Cookies, Activity within spaces, Error logs.</p>
                  </section>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen relative animate-in fade-in duration-1000 bg-transparent">
      <Navbar onNavigate={navigate} currentPage={currentPage} />
      <main>{renderPage()}</main>

      <footer className="py-20 border-t border-white/10 glass mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-4 mb-8">
                <Logo size={64} />
                <span className="font-display font-bold text-3xl tracking-tighter uppercase">
                  World <span className="shimmer-text">AI</span> Force
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 font-light">
                Democratizing AI intelligence through an ethical, decentralized framework. Ensuring global participation for all underserved communities.
              </p>
              <div className="space-y-2 mb-6 text-sm text-slate-500">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1-240-813-0308</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Upper Marlboro, MD, 20772 USA</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.4em]">Nodes</h4>
                <ul className="space-y-3 text-slate-500 text-sm">
                  <li><button onClick={() => navigate('home')} className="hover:text-blue-400 transition-colors">Home</button></li>
                  <li><button onClick={() => navigate('mission')} className="hover:text-blue-400 transition-colors">Mission</button></li>
                  <li><button onClick={() => navigate('forge')} className="hover:text-blue-400 transition-colors">Forge</button></li>
                  <li><button onClick={() => navigate('privacy')} className={`transition-colors ${currentPage === 'privacy' ? 'text-blue-400' : 'hover:text-blue-400'}`}>Privacy Policy</button></li>
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
              &copy; 2026 World AI Force. All rights reserved.
            </p>
            <div className="flex gap-8">
              <button onClick={() => navigate('privacy')} className="text-slate-600 hover:text-white text-[10px] uppercase tracking-[0.3em]">Policy</button>
              <a href="#" className="text-slate-600 hover:text-white text-[10px] uppercase tracking-[0.3em]">Ethics</a>
            </div>
          </div>
        </div>
      </footer>
      <WafAssistant />
    </div>
  );
};

export default App;