import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BLOG_SYSTEM_PROMPT = `
You are the content engine for "Ravfia", a high-end trash bin cleaning service. 
Your tone is professional, eco-conscious, and slightly humorous about the dirty nature of trash bins.
Generate blog post content suitable for a WordPress-style CMS.
`;

export const generateBlogPost = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a blog post about: ${topic}. 
      The response should be a JSON object with 'title', 'excerpt', 'content', and 'category' fields.
      Choose a category from: 'Tips', 'News', 'Eco-Friendly', 'Company Updates'.
      Make the content about 300 words. Use HTML tags (p, h3, ul, li) in the 'content' field for formatting.`,
      config: {
        systemInstruction: BLOG_SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["title", "excerpt", "content", "category"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating blog post:", error);
    throw error;
  }
};

export const askAssistant = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: "You are Ravfia's virtual assistant. Answer questions about trash bin cleaning, pricing (starts at $15/mo), our eco-friendly process, and our location (8035 Torremolinos Ave, Las Vegas). Keep answers short and helpful.",
        tools: [{ googleMaps: {} }]
      }
    });
    
    let text = response.text || "";

    // Process grounding chunks to extract map/web links
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      const links: string[] = [];
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri) {
          links.push(`[${chunk.web.title || 'Web Source'}](${chunk.web.uri})`);
        }
        if (chunk.maps?.uri) {
          links.push(`[${chunk.maps.title || 'Map Location'}](${chunk.maps.uri})`);
        }
      });
      
      if (links.length > 0) {
        text += "\n\nSources:\n" + links.join("\n");
      }
    }

    return text;
  } catch (error) {
    console.error("Error asking assistant:", error);
    return "I'm having trouble connecting to the main server right now. Please try again later.";
  }
};