import express from "express";
import { ReadAndGiveResponce } from "../controllers/ai.conrtoller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage() 
})

router.post("/upload" ,upload.single("file") ,ReadAndGiveResponce)


export default router;