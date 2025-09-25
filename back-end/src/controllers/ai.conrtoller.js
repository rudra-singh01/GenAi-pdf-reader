import { bytescaleUpload } from "../libs/bytescale.js";
import { v4 as uuidv4 } from "uuid";
import aiModel from "../model/ai.model.js";
import { analyzePdfWithPrompt } from "../libs/gemini.js";

export const ReadAndGiveResponce = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const uploadedFile = await bytescaleUpload(req.file.buffer, uuidv4());
    if (!uploadedFile) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const pdfUrl = uploadedFile.fileUrl;

    // Get AI analysis from the PDF
    const responseFromGemini = await analyzePdfWithPrompt(pdfUrl, prompt);

    const ai = new aiModel({
      prompt,
      file: pdfUrl,
      response: responseFromGemini,
    });

    await ai.save();

    res.status(200).json({
      message: "File processed successfully",
      fileUrl: pdfUrl,
      analysis: responseFromGemini,
      uploadResponse: uploadedFile
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
