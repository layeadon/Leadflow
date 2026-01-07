import { GoogleGenAI } from "@google/genai";

export const aiAssistant = {
  optimizeMessage: async (currentMessage: string, businessType: string): Promise<string> => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a local business owner (${businessType}). My current auto-reply is: "${currentMessage}". 
        Please rewrite this to be more professional, friendly, and persuasive to get them to click our booking link. 
        Keep the placeholder {{link}} exactly as it is. Provide only the text for the message.`,
      });
      return response.text?.trim() || currentMessage;
    } catch (error) {
      console.error("AI Optimization failed", error);
      return currentMessage;
    }
  }
};
