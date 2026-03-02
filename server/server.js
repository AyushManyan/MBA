
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
  }
));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);


// Health check endpoint for Render
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

app.get("/", (_, res) => {
  res.send("SmartBreak API running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Self-ping every 13 minutes to keep server awake (only works if server is already running)
  const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;
  setInterval(() => {
    fetch(`${SELF_URL}/api/health`)
      .then(res => res.json())
      .then(data => console.log("Self-ping: ", data))
      .catch(err => console.log("Self-ping error:", err.message));
  }, 13 * 60 * 1000); // 13 minutes
});