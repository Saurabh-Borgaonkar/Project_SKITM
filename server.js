import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api", aiRoutes);

app.get("/", (req, res) => {
  res.send("DevPilot AI server running...");
});

// Server config
const PORT = 3000;
const HOST = "127.0.0.1";

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});