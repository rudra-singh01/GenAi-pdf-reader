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
You are an AI assistant that analyzes PDF documents.
The user will provide:
1. A PDF document.
2. A prompt describing the task.

Your responsibilities:
- Extract useful information from the PDF document.
- Summarize, extract key points, answer questions, or explain as requested.
- If information is missing, clearly state that.
- Provide detailed and accurate responses based on the document content.
`;

export const analyzePdfWithPrompt = async (pdfUrl, prompt) => {
  try {
    const geminiAI = initializeGemini();
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch the PDF from URL
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    const result = await model.generateContent([
      PRETEXT + "\n\nUser's prompt: " + prompt,
      {
        inlineData: {
          data: base64String,
          mimeType: "application/pdf"
        }
      }
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
