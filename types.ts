
export interface EcosystemTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Research' | 'Education' | 'Community' | 'Development';
  details?: {
    fullTitle: string;
    purpose: string;
    functions: string[];
    participants: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}