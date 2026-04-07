import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", aiRoutes);

app.get("/", (req, res) => {
  res.send("DevPilot AI server running...");
});

const PORT = 3000;
const host='127.0.0.1';
app.listen(PORT, () => {
  console.log(`Server running on port http://${host}:${PORT}`);
});