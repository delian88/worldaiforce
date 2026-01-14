
export interface EcosystemTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Research' | 'Education' | 'Community' | 'Development';
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
