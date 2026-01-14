
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
import { Target, Eye, ShieldCheck, Globe, Zap, ArrowRight, Download, Mail, Phone, MapPin, ArrowUpRight, Lock, FileText, Cpu, BarChart3, Users } from 'lucide-react';

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

  if (!appReady) {
    return <LoadingScreen onComplete={handleInit} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigate} />
            
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

            {/* Core Mission Spotlight */}
            <section className="py-32 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] -z-10"></div>
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                  <div className="lg:w-1/2 reveal-on-scroll">
                    <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.6em] mb-4 block">Unified Purpose</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight italic text-white/90">
                      Transforming AI into a force for <span className="text-blue-500">inclusion</span> and shared <span className="text-purple-500">prosperity</span>.
                    </h2>
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">
                      Our mission is to ensure equitable access to AI tools, education, and global participation for underserved communities. We are not just building tools; we are building a movement.
                    </p>
                    <button onClick={() => navigate('mission')} className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] group">
                      Read the Charter <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 reveal-on-scroll">
                    {FEATURES.map((feat, idx) => (
                      <div key={idx} className="p-8 rounded-[2rem] glass-card border-white/5">
                        <div className="mb-6">{feat.icon}</div>
                        <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                        <p className="text-slate-500 text-sm font-light leading-relaxed">{feat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* PODORE Highlight */}
            <section className="py-32 bg-slate-950">
              <div className="max-w-7xl mx-auto px-4">
                <div className="siren-border-outer rounded-[4rem] p-1 shadow-3xl">
                  <div className="siren-border-inner opacity-20"></div>
                  <div className="relative z-10 bg-slate-950 rounded-[3.9rem] p-12 md:p-24 overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                      <Logo size={400} />
                    </div>
                    <div className="max-w-2xl relative z-10">
                      <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Launching Jan 25, 2026</span>
                      <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">PODORE <span className="shimmer-text">Core Node</span></h2>
                      <p className="text-slate-400 text-xl font-light mb-12 leading-relaxed">
                        A secure, multilingual, cloud-based ecosystem hosting all WAF programs. Built for governments, enterprises, and individual developers alike.
                      </p>
                      <div className="grid grid-cols-2 gap-8 mb-12">
                        <div>
                           <div className="text-white font-bold mb-2">Multilingual</div>
                           <p className="text-slate-500 text-sm">Real-time localized interface for global accessibility.</p>
                        </div>
                        <div>
                           <div className="text-white font-bold mb-2">Cyber-Secure</div>
                           <p className="text-slate-500 text-sm">Advanced data protection and sovereignty protocols.</p>
                        </div>
                      </div>
                      <button onClick={() => navigate('ecosystem')} className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-slate-200 transition-all">
                        Explore Ecosystem
                      </button>
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
              <div className="glass p-12 md:p-20 rounded-[4rem] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed text-center mb-12 italic">
                  "To ensure equitable access to AI tools, education, economic opportunities, and global participation for underserved communities transforming AI into a force for inclusion, safety, and shared prosperity."
                </p>
                <div className="grid md:grid-cols-2 gap-12 mt-16">
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-blue-400">
                      <ShieldCheck className="w-6 h-6" /> Inclusion
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Breaking barriers to ensure every voice is part of the intelligence revolution.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-purple-400">
                      <Globe className="w-6 h-6" /> Shared Prosperity
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">Directing AI economic growth toward those who need it most.</p>
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
                 <p className="text-slate-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
                   A unified set of divisions designed to advance innovation, digital inclusion, workforce readiness, and responsible AI development worldwide.
                 </p>
               </div>
               
               <div className="siren-border-outer rounded-[3rem] p-1 mb-24 shadow-2xl">
                 <div className="siren-border-inner opacity-20"></div>
                 <div className="relative z-10 bg-slate-900 rounded-[2.9rem] p-12 md:p-20 flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-3/5">
                       <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                         Primary Infrastructure
                       </div>
                       <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">1. Global Digital Hub & Platform</h2>
                       <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed italic border-l-2 border-blue-600 pl-6">
                         "A secure, multilingual, cloud-based ecosystem hosting all WAF programs and communities."
                       </p>
                       <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                          {[
                            'Multi-language interface',
                            'Strong cybersecurity',
                            'Data protection protocol',
                            'Accessibility-first design',
                            'Built-in AI assistant',
                            'Government Scalability',
                            'Enterprise Grade Architecture',
                            'Developer Sandbox'
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-slate-300">
                              <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                              <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="lg:w-2/5 flex flex-col gap-6 w-full">
                      <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <BarChart3 className="text-blue-400 mb-6 w-10 h-10" />
                        <h4 className="text-xl font-bold mb-2 text-white">Universal Hub</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">The single source of truth for all WAF initiatives, bringing together resources from every continent.</p>
                      </div>
                      <div className="p-10 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20">
                        <Lock className="text-blue-500 mb-6 w-10 h-10" />
                        <h4 className="text-xl font-bold mb-2 text-white">Secure Grid</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">Encrypted data vaults ensure community knowledge remains proprietary and protected.</p>
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
      case 'privacy':
        return (
          <section className="pt-40 pb-32 bg-slate-950 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
              <div className="mb-12 flex items-center gap-4">
                <Lock className="text-blue-500 w-8 h-8" />
                <h1 className="text-4xl md:text-5xl font-display font-bold">World AI Force™ <span className="shimmer-text">Privacy Policy</span></h1>
              </div>
              <div className="glass p-10 md:p-16 rounded-[3rem] border-white/10 prose prose-invert max-w-none font-light leading-relaxed text-slate-300">
                <p className="text-sm font-bold text-slate-400 mb-8 uppercase tracking-widest">Effective Date: October 2024</p>
                
                <p className="mb-8">
                  World AI Force (“WAF,” “we,” “our,” or “us”) is committed to protecting your privacy and ensuring that your personal data is handled lawfully, transparently, and securely. This Privacy Policy explains how we collect, use, store, share, and protect your data when you sign up for or use our platform, including our digital boardrooms, developer tools, AI product marketplace, news syndication systems, and any related services.
                </p>
                <p className="mb-12 font-bold text-white">By using World AI Force, you agree to the practices described in this Privacy Policy.</p>

                <div className="space-y-12">
                  <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3"><FileText className="w-5 h-5" /> 1. Information We Collect</h2>
                    <h3 className="text-white font-bold mb-2">1.1 Personal Information Provided by You</h3>
                    <p className="mb-4">We may collect the following types of information when you sign up, create a profile, or use our services:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Full name, Email address, Phone number</li>
                      <li>Encrypted passwords</li>
                      <li>Profile information (skills, portfolio, organization)</li>
                      <li>Developer or product details</li>
                      <li>Payment information (via third-party processors)</li>
                    </ul>
                    <h3 className="text-white font-bold mb-2">1.2 Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 space-y-2 mb-6">
                      <li>Device information (browser, OS, device type)</li>
                      <li>IP address and location approximation</li>
                      <li>Usage patterns and session activity</li>
                      <li>Cookies and performance metrics</li>
                    </ul>
                    <h3 className="text-white font-bold mb-2">1.3 AI Product & Developer Data</h3>
                    <p>Submitted products, metadata, compliance documents, evaluation data, and market analytics.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">2. How We Use Your Information</h2>
                    <p className="mb-4">We use your information to provide and improve services, facilitate digital boardrooms, deliver AI tools (transcription, summaries, PR launch tools), and enable news syndication.</p>
                    <p className="font-bold text-white">We do not sell your personal data.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">3. How We Share Information</h2>
                    <p>We share information with trusted service providers (hosting, security, payments) and only as required by law to prevent fraud or criminal activity.</p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">8. How We Protect Your Information</h2>
                    <p>We use advanced security systems including strong encryption, multi-layered authentication, and secure server architecture. We commit to notifying users in the event of a significant security breach.</p>
                  </section>

                  <section className="pt-12 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">11. Contact Us</h2>
                    <p className="mb-2">For questions, concerns, or rights requests:</p>
                    <p className="text-white font-bold">📧 privacy@worldaiforce.org</p>
                    <p className="text-white font-bold">🌍 www.worldaiforce.org</p>
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
              <button onClick={() => navigate('privacy')} className="text-slate-600 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-colors">Privacy Policy</button>
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
