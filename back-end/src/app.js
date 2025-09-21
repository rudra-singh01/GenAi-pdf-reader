import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from 'cors'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/ai", aiRoutes);
export default app;