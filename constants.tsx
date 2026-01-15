import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Users, 
  Globe, 
  Cpu, 
  BookOpen, 
  Code,
  TrendingUp,
  Calculator,
  Scale,
  Wand2,
  Network,
  BarChart3
} from 'lucide-react';
import { EcosystemTool } from './types.ts';

export const PODORE_LAUNCH_DATE = new Date('2026-01-25T00:00:00');

export const ECOSYSTEM_TOOLS: EcosystemTool[] = [
  {
    id: 'waf-forge',
    name: 'WAF Forge',
    description: 'Real-time neural synthesis engine for image, motion, and lexicon generation.',
    icon: 'Wand2',
    category: 'Development'
  },
  {
    id: 'waf-assembly',
    name: 'WAF Assembly',
    description: 'The governance, dialogue, and representation arm of the initiative.',
    icon: 'Users',
    category: 'Community',
    details: {
      fullTitle: "World AI Force Assembly",
      purpose: "To serve as a global forum for AI stakeholders to deliberate, collaborate, and shape the future of AI policy, ethics, and implementation.",
      functions: [
        "Global and regional AI summits and assemblies",
        "Policy dialogue and consensus-building",
        "Ethical oversight and advisory councils",
        "Stakeholder representation across sectors"
      ],
      participants: "The Assembly brings together technologists, governments, private sector leaders, civil society, educators, and youth voices to ensure inclusive AI decision-making."
    }
  },
  {
    id: 'waf-wax',
    name: 'World AI Exchange (WAX)',
    description: 'A secure, ethical, AI-powered stock market system for listing and trading PodOre AI assets.',
    icon: 'BarChart3',
    category: 'Research',
    details: {
      fullTitle: "World AI Exchange (WAX)",
      purpose: "To transform innovation into opportunity by allowing AI products developed on World AI Force PodOre to be digitally listed, governed, and traded within a secure, ethical, AI-powered stock market system.",
      functions: [
        "Digital listing of AI products developed on PodOre",
        "Governance and decentralized trading mechanisms",
        "AI-powered market analysis and valuation",
        "Secure, ethical digital finance infrastructure"
      ],
      participants: "Designed for global innovators, investors, and community members participating in the future of global digital finance."
    }
  },
  {
    id: 'waf-academy',
    name: 'WAF Academy',
    description: 'Democratized AI education and global certification platform. Coming soon.',
    icon: 'BookOpen',
    category: 'Education'
  },
  {
    id: 'waf-accounting',
    name: 'AI Accounting',
    description: 'Automated decentralized financial auditing and enterprise management. Coming soon.',
    icon: 'Calculator',
    category: 'Development'
  },
  {
    id: 'podore-core',
    name: 'PodOre',
    description: 'The master digital hub and unified platform. Launching Jan 25, 2026.',
    icon: 'Network',
    category: 'Community'
  }
];

export const FEATURES = [
  {
    title: 'Accessible AI',
    description: 'Ensuring advanced intelligence tools reach underserved communities.',
    icon: <Globe className="w-8 h-8 text-blue-400" />
  },
  {
    title: 'Ethical Framework',
    description: 'Rigid safeguards to ensure AI serves humanity responsibly and safely.',
    icon: <ShieldCheck className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Sovereign Data',
    description: 'Users maintain 100% ownership of their forged intelligence assets.',
    icon: <Zap className="w-8 h-8 text-yellow-400" />
  }
];