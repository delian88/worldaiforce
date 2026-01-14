
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getWafResponse = async (userPrompt: string, history: { role: string, parts: { text: string }[] }[]) => {
  if (!API_KEY) {
    return "The AI assistant is currently in maintenance mode. Please try again later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: `You are the World AI Force (WAF) Assistant. 
        Your goal is to explain WAF's mission: Democratizing AI, ethical framework, inclusive tech.
        Mention that WAF is launching "PODORE" on Jan 25, 2026. 
        Be professional, inspiring, and tech-forward. Keep responses concise (under 3 sentences).`,
        temperature: 0.7,
      },
    });

    return response.text || "I'm processing that. How else can I help with the AI revolution?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Apologies, my synaptic link is momentarily offline. WAF is scaling rapidly!";
  }
};
