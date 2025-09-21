import { cloudinaryUpload } from "../libs/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import aiModel from "../model/ai.model.js";
import { analyzeImageWithPrompt } from "../libs/gemini.js";

export const ReadAndGiveResponce = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadedFile = await cloudinaryUpload(req.file.buffer, uuidv4());
    if (!uploadedFile) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const pdfUrl = uploadedFile.pdf_url || uploadedFile.secure_url;
    const previewImage = uploadedFile.preview_url;

    const responseFromGemini = await analyzeImageWithPrompt(previewImage, prompt);

    const ai = new aiModel({
      prompt,
      file: pdfUrl,
      response: responseFromGemini,
      preview_url: previewImage,
    });

    await ai.save();

    res.status(200).json({
      message: "File processed successfully",
      response: responseFromGemini,
      pdf_url: pdfUrl,
      preview_image: previewImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
