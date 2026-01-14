
import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Users, 
  Globe, 
  Cpu, 
  BookOpen, 
  Code, 
  Layers 
} from 'lucide-react';
import { EcosystemTool } from './types';

export const PODORE_LAUNCH_DATE = new Date('2026-01-25T00:00:00');

export const ECOSYSTEM_TOOLS: EcosystemTool[] = [
  {
    id: 'waf-research',
    name: 'WAF Research Lab',
    description: 'Pioneering ethical AI frameworks and inclusive algorithms for global challenges.',
    icon: 'Cpu',
    category: 'Research'
  },
  {
    id: 'waf-academy',
    name: 'Empower Academy',
    description: 'Democratizing knowledge through free, accessible AI training and certification.',
    icon: 'BookOpen',
    category: 'Education'
  },
  {
    id: 'waf-community',
    name: 'Global Node Network',
    description: 'Connecting local innovators to a global grid of AI resources and mentorship.',
    icon: 'Users',
    category: 'Community'
  },
  {
    id: 'waf-dev',
    name: 'PODORE Core',
    description: 'The upcoming centralized platform for seamless AI tool integration.',
    icon: 'Code',
    category: 'Development'
  }
];

export const FEATURES = [
  {
    title: 'Accessible AI',
    description: 'Breaking barriers to ensure technology reaches the underserved.',
    icon: <Globe className="w-8 h-8 text-blue-400" />
  },
  {
    title: 'Ethical Framework',
    description: 'Built-in safeguards to ensure AI serves humanity responsibly.',
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Inclusive Growth',
    description: 'Diverse perspectives shaping the future of global digital ecosystems.',
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  }
];
