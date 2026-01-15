
import { GoogleGenAI } from "@google/genai";

// The getWafResponse function handles the interaction with Gemini API for the WAF Assistant.
export const getWafResponse = async (userPrompt: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    // Always initialize GoogleGenAI with the API key from process.env.API_KEY.
    // Assume this variable is pre-configured and accessible.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent with the gemini-3-flash-preview model and include history for conversation context.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: `You are the World AI Force (WAF) Assistant. 
        Your goal is to explain WAF's mission: Democratizing AI, ethical framework, and inclusive tech.
        Mention that WAF is launching "PodOre" on Jan 25, 2026. 
        Be professional, inspiring, and tech-forward. Keep responses concise (under 3 sentences).`,
        temperature: 0.7,
      },
    });

    // The .text property of GenerateContentResponse provides the generated string directly.
    return response.text || "I'm processing that. How else can I help with the AI revolution?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Apologies, my synaptic link is momentarily offline. WAF is scaling rapidly!";
  }
};
