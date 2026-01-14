
import React, { useState } from 'react';
import { Menu, X, Shield, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center glow-blue">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              WORLD <span className="text-blue-400">AI</span> FORCE
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {['Mission', 'Ecosystem', 'PODORE', 'Ethics'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20">
                Join The Force
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

      {isOpen && (
        <div className="md:hidden glass border-t border-white/5 p-4 space-y-2">
          {['Mission', 'Ecosystem', 'PODORE', 'Ethics'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-slate-300 hover:text-white px-3 py-3 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
            Join The Force
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
