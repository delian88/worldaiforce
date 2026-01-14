
import React from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Ecosystem from './components/Ecosystem.tsx';
import WafAssistant from './components/WafAssistant.tsx';
import Logo from './components/Logo.tsx';
import { FEATURES } from './constants.tsx';
import { ExternalLink, ArrowUpRight, Mail, MapPin, Globe, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Core Pillars Section */}
        <section id="ethics" className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Ethical <span className="shimmer-text">Pillars</span></h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The World AI Force is built on a foundation of responsibility, ensuring that as AI grows, it grows for everyone.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {FEATURES.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group p-8 rounded-[3rem] glass border-white/5 hover:border-blue-500/20 transition-all duration-500">
                  <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all border border-white/10 shadow-2xl">
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

        <Ecosystem />

        {/* Detailed About Section */}
        <section id="about" className="py-32 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2 relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=2000&auto=format&fit=crop" 
                  className="rounded-[3rem] shadow-2xl border border-white/10 relative z-10 hover:grayscale-0 grayscale transition-all duration-1000"
                  alt="WAF Innovation"
                />
                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl border-white/10 z-20 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 rounded-2xl">
                      <Globe className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">120+</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500">Global Partners</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2">
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
                  About <span className="shimmer-text">World AI Force</span>
                </h2>
                <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                  Founded on the belief that intelligence is a universal right, WAF operates as a multi-division framework. We don't just build tools; we build the infrastructure for a more equitable digital future.
                </p>
                <p className="text-slate-500 mb-10">
                  Our team consists of researchers, ethicists, and engineers from around the globe, all working toward a singular goal: making powerful AI accessible to every community, regardless of geography or economic status.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Community Focused Research',
                    'Ethical AI Deployment',
                    'Digital Sovereignty Advocacy',
                    'Universal Education Access'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 glass rounded-2xl border-white/5">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-[4rem] border-white/10 p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -z-0"></div>
              
              <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                <div className="lg:w-1/2">
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Let's <span className="shimmer-text">Connect</span></h2>
                  <p className="text-slate-400 mb-12">
                    Have questions about our ecosystem or want to join the force? Our team is ready to collaborate.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Mail />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Email Us</div>
                        <div className="text-lg font-medium">contact@worldaiforce.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                        <MapPin />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Headquarters</div>
                        <div className="text-lg font-medium">Global Digital Node Network</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                    <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all" />
                  <textarea placeholder="Your Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
                  <button className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-10">
              Shape the <span className="shimmer-text">Future</span>
            </h2>
            <p className="text-slate-400 mb-12 text-lg">
              The digital revolution should belong to everyone. Join the World AI Force today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-blue-500 min-w-[300px] text-white"
              />
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 group">
                Join Waitlist <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/10 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <Logo size={72} />
                <span className="font-display font-bold text-2xl tracking-tight uppercase">
                  World <span className="shimmer-text">AI</span> Force
                </span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                A globally integrated, multi-division ecosystem designed to democratize AI and ensure digital equity for all communities.
              </p>
              
              <div className="flex flex-col gap-1">
                <a 
                  href="https://azariahmg.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="font-display text-sm">Powered by <span className="font-bold text-blue-400">Azariah Management Group</span></span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.3em]">Navigation</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#mission" className="hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.3em]">Connect</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px]">
            <p className="text-slate-600 uppercase tracking-widest">
              &copy; 2024 - 2026 World AI Force. Shaping an ethical future.
            </p>
            <div className="flex gap-8 text-slate-600">
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors uppercase tracking-widest">Ethics Charter</a>
            </div>
          </div>
        </div>
      </footer>

      <WafAssistant />
    </div>
  );
};

export default App;
