import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.tsx';

interface NavbarProps {
  onNavigate: (page: any) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Mission', id: 'mission' },
    { name: 'Forge', id: 'forge' },
    { name: 'Ecosystem', id: 'ecosystem' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleJoinNetwork = () => {
    window.open('https://worldaiforce.org/', '_blank');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <Logo size={52} />
            <span className="font-display font-bold text-xl tracking-widest hidden sm:inline-block transition-colors group-hover:text-blue-400 uppercase">
              WORLD <span className="shimmer-text">AI</span> FORCE
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400
                    ${currentPage === item.id ? 'text-blue-400 border-b-2 border-blue-600' : 'text-slate-400'}`}
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={handleJoinNetwork}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center gap-2"
              >
                Join PodOre <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`block w-full text-left px-3 py-3 text-lg font-bold uppercase tracking-widest border-b border-white/5
                ${currentPage === item.id ? 'text-blue-400' : 'text-slate-300'}`}
              onClick={() => { onNavigate(item.id); setIsOpen(false); }}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={handleJoinNetwork}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/10 flex justify-center items-center gap-2"
          >
            Join PodOre <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;