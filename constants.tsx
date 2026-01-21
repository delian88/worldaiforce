import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Zap, 
  Wand2,
  Network,
  Landmark
} from 'lucide-react';
import { EcosystemTool } from './types.ts';

export const PODORE_LAUNCH_DATE = new Date('2026-01-25T00:00:00');

export const ECOSYSTEM_TOOLS: EcosystemTool[] = [
  {
    id: 'podore-core',
    name: 'Global Digital Hub & Platform',
    description: 'A secure, multilingual, cloud-based ecosystem hosting all WAF programs and communities.',
    icon: 'Network',
    category: 'Community',
    details: {
      fullTitle: "Global Digital Hub & Platform",
      purpose: "A secure, multilingual, cloud-based ecosystem hosting all WAF programs and communities.",
      functions: [
        "Multi-language interface",
        "Strong cybersecurity and data protection",
        "Accessibility-first design",
        "Built-in AI assistant",
        "Scalable for governments, enterprises & developers"
      ],
      participants: "Designed to host all WAF programs and global communities with maximum accessibility and security."
    }
  },
  {
    id: 'waf-assembly',
    name: 'WAF Assembly',
    description: 'The governance, dialogue, and representation arm of the initiative. Shaping global AI policy through inclusive stakeholder deliberation.',
    icon: 'Landmark',
    category: 'Community',
    details: {
      fullTitle: "World AI Force Assembly",
      purpose: "To serve as a global forum for AI stakeholders to deliberate, collaborate, and shape the future of AI policy, ethics, and implementation.",
      functions: [
        "Global and regional AI summits and assemblies",
        "Policy dialogue and consensus-building",
        "Ethical oversight and advisory councils",
        "Stakeholder representation across technologists, governments, and civil society"
      ],
      participants: "The Assembly brings together technologists, governments, private sector leaders, civil society, educators, and youth voices to ensure inclusive AI decision-making."
    }
  },
  {
    id: 'waf-forge',
    name: 'Forge',
    description: 'Real-time World AI Force synthesis engine for image, video, content, and audio generation. Synaptic access to WAF intelligence.',
    icon: 'Wand2',
    category: 'Development'
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