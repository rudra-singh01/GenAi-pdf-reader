// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI;
let isInitialized = false;

// Initialize Gemini AI with lazy loading
const initializeGemini = () => {
  if (!isInitialized) {
    console.log("Initializing Gemini with API key:", process.env.GEMINI_API_KEY ? "***LOADED***" : "NOT LOADED");
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    isInitialized = true;
  }
  return genAI;
};
const PRETEXT = `
You are an AI assistant that analyzes PDF documents from preview images.
The user will provide:
1. A PDF converted into one or more images.
2. A prompt describing the task.

Your responsibilities:
- Extract useful info from the document images.
- Summarize, extract key points, answer questions, or explain as requested.
- If info is missing, clearly state that.
`;

export const analyzeImageWithPrompt = async (imageUrl, prompt) => {
  try {
    // Initialize Gemini AI if not already done
    const geminiAI = initializeGemini();
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch the image from URL and convert to base64
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    const result = await model.generateContent([
      PRETEXT + "\n\nUser's prompt: " + prompt,
      {
        inlineData: {
          data: base64String,
          mimeType: "image/jpeg"
        }
      }
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
