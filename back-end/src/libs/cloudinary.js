import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const configureCloudinary = () => {
    if (!isConfigured) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });
        isConfigured = true;
    }
};

export const cloudinaryUpload = async (fileBuffer, fileName) => {
    try {
        configureCloudinary();

        // Convert buffer to base64 data URI
        const base64String = fileBuffer.toString("base64");
        const dataURI = `data:application/pdf;base64,${base64String}`;

        // Upload PDF as image to enable preview generation
        const result = await cloudinary.uploader.upload(dataURI, {
            public_id: fileName,
            overwrite: true,
            invalidate: true,
            resource_type: "image", // 👈 Upload as image to enable transformations
            format: "pdf", // 👈 Keep original PDF format
            pages: true, // 👈 Enable page extraction for PDFs
        });

        // Generate preview image URL (first page of PDF as JPG)
        const previewUrl = cloudinary.url(result.public_id, {
            format: "jpg",   // Convert to JPG for preview
            page: 1,         // Get first page
            width: 2000,     // Higher width for sharpness
            crop: "limit",   // Keep aspect ratio, don’t stretch
            dpr: "auto",     // Retina / high-DPI support
            quality: "auto:best", // Maximize quality
        });

        // Return both original PDF and preview
        return {
            ...result,
            preview_url: previewUrl,
            pdf_url: result.secure_url
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};

export default cloudinary;
