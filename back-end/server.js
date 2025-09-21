import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/DB/db.config.js";
connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});