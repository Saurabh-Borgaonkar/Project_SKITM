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
const PORT = precess.env.PORT ||  3000;


// Start server
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});