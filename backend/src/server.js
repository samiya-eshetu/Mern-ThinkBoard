import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

const app = express();

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") {
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
}

app.use(express.json());

app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

app.get("/{*splat}", (req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});

}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
  });
});
