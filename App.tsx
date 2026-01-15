
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Ecosystem from './components/Ecosystem.tsx';
import WafForge from './components/WafForge.tsx';
import WafAssistant from './components/WafAssistant.tsx';
import LoadingScreen from './components/LoadingScreen.tsx';
import Logo from './components/Logo.tsx';
import { FEATURES, ECOSYSTEM_TOOLS } from './constants.tsx';
import { playWelcomeGreeting } from './services/voiceService.ts';
import { 
  Target, Eye, ShieldCheck, Globe, Zap, ArrowRight, Download, 
  Mail, Phone, MapPin, ArrowUpRight, Lock, FileText, Cpu, 
  BarChart3, Users, Network, Layers, Rocket, Award, CheckCircle2,
  TrendingUp, Calculator, HardDrive, ShieldAlert, Sparkles, Wand2,
  KeyRound, UserPlus, Fingerprint, Shield, Info, EyeOff, Gavel
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

  const openPodore = () => {
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
            
            {/* Neural Forge Terminal - Home Page Interactivity */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/5 -z-10 blur-[120px]"></div>
              <div className="max-w-7xl mx-auto px-4">
                 <div className="text-center mb-16 reveal-on-scroll">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                      <Sparkles className="w-3 h-3" /> System Status: Online
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Neural <span className="shimmer-text">Forge</span> Terminal</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                      Instant synaptic access to the WAF generation engine. Envision visuals, synthesize lexicon, and initiate motion sequences directly from the global hub.
                    </p>
                 </div>
                 
                 <div className="reveal-on-scroll">
                    <WafForge />
                 </div>
              </div>
            </section>

            {/* PODORE REGISTRATION SECTION */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]"></div>
               <div className="max-w-7xl mx-auto px-4 relative z-10">
                  <div className="siren-border-outer rounded-[4rem] p-1.5 shadow-2xl overflow-hidden group">
                     <div className="siren-border-inner opacity-25 group-hover:opacity-50 transition-opacity duration-[2000ms]"></div>
                     <div className="relative z-10 bg-slate-900/95 backdrop-blur-3xl rounded-[3.9rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
                        
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="absolute bg-blue-500/30 rounded-full blur-2xl animate-pulse"
                                    style={{
                                        width: Math.random() * 300 + 100 + 'px',
                                        height: Math.random() * 300 + 100 + 'px',
                                        top: Math.random() * 100 + '%',
                                        left: Math.random() * 100 + '%',
                                        animationDuration: (Math.random() * 5 + 5) + 's',
                                        animationDelay: (Math.random() * 5) + 's'
                                    }}
                                />
                            ))}
                        </div>

                        <div className="lg:w-3/5 text-left reveal-on-scroll">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                 <Fingerprint className="w-7 h-7" />
                              </div>
                              <span className="text-blue-500 text-[11px] font-black uppercase tracking-[0.7em]">Neural Identity Protocol</span>
                           </div>
                           
                           <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tighter">
                              Establish Your <br/><span className="shimmer-text">Podore Account</span>
                           </h2>
                           
                           <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed mb-12 border-l-4 border-blue-600 pl-8 max-w-xl italic">
                              "The key to the World AI Force ecosystem. Your sovereign digital presence starts here."
                           </p>

                           <div className="grid sm:grid-cols-2 gap-6 mb-16">
                              {[
                                 { icon: <Shield className="w-4 h-4" />, text: "Sovereign Data Vault" },
                                 { icon: <Globe className="w-4 h-4" />, text: "Global Node Verification" },
                                 { icon: <Cpu className="w-4 h-4" />, text: "Priority Neural Access" },
                                 { icon: <TrendingUp className="w-4 h-4" />, text: "Market Participation" }
                              ].map((item, idx) => (
                                 <div key={idx} className="flex items-center gap-4 text-slate-300 group/item">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all">
                                       {item.icon}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.text}</span>
                                 </div>
                              ))}
                           </div>

                           <div className="flex flex-col sm:flex-row gap-6">
                              <button 
                                 onClick={openPodore}
                                 className="px-16 py-8 bg-blue-600 text-white rounded-full font-black uppercase tracking-[0.4em] hover:bg-blue-500 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.4)] flex items-center justify-center gap-4 group text-xs transform hover:-translate-y-1"
                              >
                                 Create Podore Account <UserPlus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                              </button>
                              <button 
                                 onClick={() => navigate('about')}
                                 className="px-12 py-8 glass text-slate-300 rounded-full font-black uppercase tracking-[0.4em] hover:text-white hover:bg-white/5 transition-all text-xs"
                              >
                                 Learn More
                              </button>
                           </div>
                        </div>

                        <div className="lg:w-2/5 relative reveal-on-scroll">
                           <div className="relative z-10 p-6">
                              <div className="aspect-[4/5] w-full max-w-[340px] mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] border border-white/10 p-10 flex flex-col items-center justify-between shadow-3xl relative overflow-hidden group/card">
                                 <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                                 
                                 <div className="w-full flex justify-between items-center mb-12">
                                    <Logo size={50} />
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center animate-spin-slow">
                                       <Zap className="w-4 h-4 text-blue-500" />
                                    </div>
                                 </div>

                                 <div className="text-center w-full">
                                    <div className="w-32 h-32 bg-blue-600/10 rounded-full mx-auto mb-8 flex items-center justify-center relative">
                                       <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping"></div>
                                       <KeyRound className="w-12 h-12 text-blue-500" />
                                    </div>
                                    <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em] mb-3">Neural Core Link</div>
                                    <div className="text-2xl font-display font-bold text-white tracking-tighter">AUTHENTICATED</div>
                                 </div>

                                 <div className="w-full space-y-3 pt-12 border-t border-white/5">
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                       <div className="h-full bg-blue-600 w-3/4 animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                       <span>Syncing...</span>
                                       <span>PODORE-OS</span>
                                    </div>
                                 </div>
                              </div>

                              <div className="absolute top-[-20px] right-[-20px] w-24 h-24 glass rounded-3xl border-white/10 flex items-center justify-center animate-bounce duration-[4s] shadow-2xl">
                                 <ShieldCheck className="w-8 h-8 text-blue-400/50" />
                              </div>
                              <div className="absolute bottom-[-10px] left-[-30px] w-48 h-20 glass rounded-3xl border-white/10 flex flex-col justify-center px-6 shadow-2xl animate-pulse">
                                 <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.5em] mb-1">Global Verification</span>
                                 <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">SUCCESSFUL_CONNECT</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Statistics Section */}
            <section className="py-24 border-y border-white/5 bg-slate-900/20">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { label: 'Global Nodes', value: '1,240+', icon: <Globe className="w-5 h-5 text-blue-500" /> },
                    { label: 'AI Models Forged', value: '45k+', icon: <Cpu className="w-5 h-5 text-purple-500" /> },
                    { label: 'Community Members', value: '2.4M', icon: <Users className="w-5 h-5 text-green-500" /> },
                    { label: 'Platform Uptime', value: '99.9%', icon: <Zap className="w-5 h-5 text-yellow-500" /> }
                  ].map((stat, i) => (
                    <div key={i} className="text-center reveal-on-scroll">
                      <div className="flex justify-center mb-4 opacity-50">{stat.icon}</div>
                      <div className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-black">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sovereign Infrastructure Section */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
               <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-blue-600/5 blur-[160px] -z-10"></div>
               <div className="max-w-7xl mx-auto px-4">
                  <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="reveal-on-scroll">
                      <span className="text-purple-500 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Our Foundation</span>
                      <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Sovereign <span className="shimmer-text">Digital</span> Architecture</h2>
                      <div className="space-y-8">
                        <div className="flex gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-white/5 text-blue-400 shadow-2xl shadow-blue-500/10"><HardDrive /></div>
                           <div>
                              <h4 className="text-xl font-bold mb-2">Neural Vaults</h4>
                              <p className="text-slate-400 text-sm font-light leading-relaxed">WAF implements end-to-end encrypted storage for every community node. Your intelligence assets are mathematically yours alone.</p>
                           </div>
                        </div>
                        <div className="flex gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-purple-600/10 flex items-center justify-center shrink-0 border border-white/5 text-purple-400 shadow-2xl shadow-purple-500/10"><ShieldAlert /></div>
                           <div>
                              <h4 className="text-xl font-bold mb-2">Decentralized Trust</h4>
                              <p className="text-slate-400 text-sm font-light leading-relaxed">No central authority dictates WAF development. Our decentralized consensus model ensures that ethical boundaries are maintained by the people.</p>
                           </div>
                        </div>
                        <div className="flex gap-6">
                           <div className="w-16 h-16 rounded-2xl bg-green-600/10 flex items-center justify-center shrink-0 border border-white/5 text-green-400 shadow-2xl shadow-green-500/10"><Network /></div>
                           <div>
                              <h4 className="text-xl font-bold mb-2">The PODORE Protocol</h4>
                              <p className="text-slate-400 text-sm font-light leading-relaxed">A global API standard for community-first AI deployment. Secure, multilingual, and infinitely scalable across borders.</p>
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative reveal-on-scroll">
                       <div className="siren-border-outer rounded-[4rem] p-1.5 shadow-3xl">
                          <div className="siren-border-inner opacity-40"></div>
                          <div className="relative z-10 bg-slate-900 rounded-[3.9rem] p-16 aspect-square flex items-center justify-center">
                             <div className="text-center">
                                <Logo size={280} className="mb-10 opacity-30" />
                                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-4 italic tracking-tighter">PO-DO-RE</div>
                                <div className="text-[11px] uppercase tracking-[0.6em] text-blue-400 font-black animate-pulse">Launching Jan 25, 2026</div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </section>
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
              <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 relative overflow-hidden reveal-on-scroll active">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed text-center mb-12 italic">
                  "To ensure equitable access to AI tools, education, economic opportunities, and global participation for underserved communities transforming AI into a force for inclusion, safety, and shared prosperity."
                </p>
                <div className="grid md:grid-cols-2 gap-12 mt-16">
                  <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-blue-400">
                      <CheckCircle2 className="w-6 h-6" /> Inclusion
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Breaking technical and socio-economic barriers to ensure every voice is part of the digital age.</p>
                  </div>
                  <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-purple-400">
                      <ShieldCheck className="w-6 h-6" /> Global Safety
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Implementing rigid ethical safety standards that protect all participants from algorithmic harm.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case 'forge':
        return <div className="pt-40 pb-32"><WafForge /></div>;
      case 'ecosystem':
        return <Ecosystem />;
      case 'about':
        return (
          <section className="pt-40 pb-32 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4">
               <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div className="reveal-on-scroll active">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">About <span className="shimmer-text">WAF</span></h1>
                    <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                      <p>World AI Force (WAF) is a decentralized global intelligence ecosystem. We believe the power of AI should belong to the people, not just a handful of corporations.</p>
                      <p>WAF is not just a technology provider; we are a global watchdog and advocate for equitable tech distribution. Our PODORE platform represents the culmination of years of decentralized development.</p>
                    </div>
                  </div>
                  <div className="relative reveal-on-scroll active">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[120px] -z-10"></div>
                    <img src="https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=2000&auto=format&fit=crop" className="rounded-[4rem] border border-white/10 shadow-3xl" alt="WAF Tech" />
                  </div>
               </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section className="pt-40 pb-32 bg-slate-950">
            <div className="max-w-5xl mx-auto px-4">
               <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 flex flex-col md:flex-row gap-16 reveal-on-scroll active">
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
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                     <input type="text" placeholder="Identity" className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-blue-500 transition-all text-white" />
                     <textarea placeholder="Transmission" rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 outline-none focus:border-blue-500 transition-all text-white resize-none"></textarea>
                     <button className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">Transmit</button>
                  </div>
               </div>
            </div>
          </section>
        );
      case 'privacy':
        return (
          <section className="pt-40 pb-32 bg-slate-950 min-h-screen">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center mb-16">
                 <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/10 text-[11px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6 reveal-on-scroll active">
                    <Lock className="w-4 h-4" /> Legal Trust Framework
                 </div>
                 <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 reveal-on-scroll active">World AI Force™ <br/><span className="shimmer-text">Privacy Policy</span></h1>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-12">Effective Date: October 2024</p>
              </div>

              <div className="glass p-10 md:p-20 rounded-[4rem] border-white/10 font-light leading-relaxed text-slate-300 reveal-on-scroll active">
                <div className="max-w-4xl mx-auto space-y-16">
                  
                  <section>
                    <p className="text-lg leading-relaxed text-slate-200">
                      World AI Force (“WAF,” “we,” “our,” or “us”) is committed to protecting your privacy and ensuring that your personal data is handled lawfully, transparently, and securely. This Privacy Policy explains how we collect, use, store, share, and protect your data when you sign up for or use our platform, including our digital boardrooms, developer tools, AI product marketplace, news syndication systems, and any related services.
                    </p>
                    <p className="mt-8 font-bold text-white uppercase tracking-widest text-sm">By using World AI Force, you agree to the practices described in this Privacy Policy.</p>
                  </section>

                  <section className="space-y-8">
                    <h2 className="text-3xl font-display font-bold text-blue-400 border-b border-white/5 pb-4 flex items-center gap-4">
                       <Fingerprint className="w-6 h-6" /> 1. Information We Collect
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg">1.1 Personal Information Provided by You</h3>
                        <p className="text-sm text-slate-400">We may collect the following types of information when you sign up, create a profile, or use our services:</p>
                        <ul className="space-y-2 text-sm text-slate-300">
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Full name</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Email address</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Phone number (optional)</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Password (encrypted)</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Profile information</li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-white font-bold text-lg">1.2 Automatically Collected Information</h3>
                        <p className="text-sm text-slate-400">When you interact with WAF, we automatically collect:</p>
                        <ul className="space-y-2 text-sm text-slate-300">
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Device information (browser, OS)</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> IP address & location approx.</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Usage patterns & Cookies</li>
                           <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Activity within digital spaces</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/10 mt-8">
                       <h3 className="text-blue-400 font-bold mb-2">1.3 AI Product & Developer Data</h3>
                       <p className="text-sm">For creators and developers, we may collect: Submitted products, Product metadata, Compliance documents, Evaluation data, Ranking and market analytics.</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-purple-600/5 border border-purple-500/10">
                       <h3 className="text-purple-400 font-bold mb-2">1.4 Community Laissez-Passer Verification Data</h3>
                       <p className="text-sm">If you apply for or use the World AI Force Community Laissez-Passer, we may collect: Identity verification documents, Professional verification details, Community reputation signals.</p>
                    </div>
                  </section>

                  <section className="space-y-8">
                    <h2 className="text-3xl font-display font-bold text-blue-400 border-b border-white/5 pb-4 flex items-center gap-4">
                       <Zap className="w-6 h-6" /> 2. How We Use Your Information
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-8 text-sm">
                       <div>
                          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2.1 Services</h4>
                          <ul className="space-y-2 text-slate-400">
                             <li>Create and manage your account</li>
                             <li>Facilitate digital boardroom meetings</li>
                             <li>Provide AI-powered tools (Lexicon, Vision, Motion)</li>
                             <li>Enable news syndication and distribution</li>
                          </ul>
                       </div>
                       <div>
                          <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">2.2 Security & Compliance</h4>
                          <ul className="space-y-2 text-slate-400">
                             <li>Authenticate users & prevent fraud</li>
                             <li>Monitor for abuse or criminal activity</li>
                             <li>Enforce Terms & Conditions</li>
                             <li>Conduct Laissez-Passer verification</li>
                          </ul>
                       </div>
                    </div>
                    <p className="p-6 rounded-2xl glass border-blue-500/20 text-blue-400 font-bold text-center uppercase tracking-widest text-xs">
                       We do not sell your personal data.
                    </p>
                  </section>

                  <section className="space-y-8">
                    <h2 className="text-3xl font-display font-bold text-blue-400 border-b border-white/5 pb-4 flex items-center gap-4">
                       <Users className="w-6 h-6" /> 3. How We Share Information
                    </h2>
                    <p className="text-sm leading-relaxed">
                       We only share information with trusted service providers (payment processing, hosting, security), within community features (boardrooms/workspaces), or for legal requirements to prevent fraud and abuse. Any additional sharing occurs only with your explicit consent.
                    </p>
                  </section>

                  <section className="grid md:grid-cols-2 gap-12">
                     <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold text-blue-400 flex items-center gap-3"><EyeOff className="w-5 h-5" /> 4. Cookies</h2>
                        <p className="text-sm text-slate-400">WAF uses cookies to maintain login sessions, personalize the platform, and provide analytics. Manage preferences in your browser.</p>
                     </div>
                     <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold text-blue-400 flex items-center gap-3"><HardDrive className="w-5 h-5" /> 5. Data Retention</h2>
                        <p className="text-sm text-slate-400">We retain data as long as necessary for account functionality, legal compliance, and security obligations. You may request deletion at any time.</p>
                     </div>
                  </section>

                  <section className="space-y-8 p-12 rounded-[3rem] bg-slate-900 border border-white/10 shadow-inner">
                    <h2 className="text-3xl font-display font-bold text-white text-center mb-8">6. Your Rights</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                       {["Access", "Correct", "Delete", "Portability", "Restrict", "Object"].map(right => (
                          <div key={right} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400">
                             {right}
                          </div>
                       ))}
                    </div>
                    <p className="text-center text-sm text-slate-500 max-w-lg mx-auto">
                       Depending on your region (GDPR, CCPA), you have the above rights. To exercise them, contact privacy@worldaiforce.org.
                    </p>
                  </section>

                  <section className="space-y-8">
                    <h2 className="text-3xl font-display font-bold text-blue-400 border-b border-white/5 pb-4 flex items-center gap-4">
                       <ShieldCheck className="w-6 h-6" /> 8. Security Protocols
                    </h2>
                    <p className="text-sm leading-relaxed mb-6">
                       We use advanced security systems including strong encryption, multi-layered authentication, secure server architecture, and continuous monitoring. We commit to notifying users in the event of a significant security breach.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="p-4 rounded-xl glass text-center"><Shield className="w-6 h-6 mx-auto mb-2 text-blue-500" /><span className="text-[8px] font-black uppercase tracking-widest">Encryption</span></div>
                       <div className="p-4 rounded-xl glass text-center"><Lock className="w-6 h-6 mx-auto mb-2 text-blue-500" /><span className="text-[8px] font-black uppercase tracking-widest">Access Control</span></div>
                       <div className="p-4 rounded-xl glass text-center"><Cpu className="w-6 h-6 mx-auto mb-2 text-blue-500" /><span className="text-[8px] font-black uppercase tracking-widest">Secure Server</span></div>
                       <div className="p-4 rounded-xl glass text-center"><Target className="w-6 h-6 mx-auto mb-2 text-blue-500" /><span className="text-[8px] font-black uppercase tracking-widest">Monitoring</span></div>
                    </div>
                  </section>

                  <section className="pt-20 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-4">
                       <h2 className="text-4xl font-display font-bold text-white">Contact Us</h2>
                       <p className="text-slate-400 font-light">For questions, concerns, or rights requests establishing a secure link.</p>
                    </div>
                    <div className="space-y-4 text-right">
                       <div className="flex items-center gap-4 justify-end">
                          <span className="text-xl font-bold text-blue-400">privacy@worldaiforce.org</span>
                          <Mail className="text-blue-500" />
                       </div>
                       <div className="flex items-center gap-4 justify-end">
                          <span className="text-xl font-bold text-white">www.worldaiforce.org</span>
                          <Globe className="text-blue-500" />
                       </div>
                    </div>
                  </section>

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
                Democratizing intelligence through an ethical, decentralized framework. Ensuring global participation for all underserved communities.
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
              <button onClick={() => navigate('privacy')} className={`text-[10px] uppercase tracking-[0.3em] transition-colors ${currentPage === 'privacy' ? 'text-blue-400' : 'text-slate-600 hover:text-white'}`}>Privacy Policy</button>
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
