
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.tsx';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Mission', href: '#mission' },
    { name: 'Ecosystem', href: '#ecosystem' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-4">
            <Logo size={52} />
            <span className="font-display font-bold text-xl tracking-widest hidden sm:inline-block">
              WORLD <span className="shimmer-text">AI</span> FORCE
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-white px-3 py-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400"
                >
                  {item.name}
                </a>
              ))}
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20">
                Join Network
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
            <a
              key={item.name}
              href={item.href}
              className="block text-slate-300 hover:text-white px-3 py-3 text-lg font-bold uppercase tracking-widest border-b border-white/5"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/10">
            Join Network
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
