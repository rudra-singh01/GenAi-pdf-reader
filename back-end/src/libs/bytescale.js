import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const configureBytescale = () => {
  if (!process.env.BYTESCALE_SECRET_API_KEY) {
    throw new Error("Missing BYTESCALE_SECRET_API_KEY environment variable");
  }
  if (!process.env.BYTESCALE_ACCOUNT_ID) {
    throw new Error("Missing BYTESCALE_ACCOUNT_ID environment variable");
  }
  console.log("Bytescale configured successfully");
};

export const bytescaleUpload = async (fileBuffer, fileName) => {
  try {
    configureBytescale();

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("Invalid or empty file buffer");
    }

    // Ensure .pdf extension
    const uniqueFileName = fileName
      ? fileName.replace(/\.pdf$/i, "") + ".pdf"
      : `${uuidv4()}.pdf`;

    console.log("Uploading file to Bytescale:", uniqueFileName);

    console.log("Preparing binary upload to Bytescale...");

    const uploadUrl = `https://api.bytescale.com/v2/accounts/${process.env.BYTESCALE_ACCOUNT_ID}/uploads/binary`;

    const response = await axios.post(uploadUrl, fileBuffer, {
      headers: {
        Authorization: `Bearer ${process.env.BYTESCALE_SECRET_API_KEY}`,
        "Content-Type": "application/pdf",
        "X-Upload-File-Name": uniqueFileName,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("Bytescale response:", response.data);

    if (response.data && (response.data.fileUrl || response.data.url)) {
      const fileUrl = response.data.fileUrl || response.data.url;
      console.log("Upload successful:", fileUrl);

      return response.data;
    } else {
      console.error("Unexpected Bytescale response format:", response.data);
      throw new Error("Invalid response from Bytescale");
    }
  } catch (error) {
    console.error("Bytescale upload error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 401) {
      throw new Error(
        "Bytescale: Unauthorized. Check your API key or account ID."
      );
    } else if (error.response?.status === 413) {
      throw new Error("Bytescale: File too large.");
    } else if (error.response?.status === 400) {
      throw new Error("Bytescale: Bad request. Check file format.");
    } else {
      throw new Error(`Failed to upload PDF: ${error.message}`);
    }
  }
};

export default bytescaleUpload;
