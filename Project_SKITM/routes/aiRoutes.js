import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {

    const { mode, input } = req.body;

    if (!input) {
      return res.json({ reply: "Input is required." });
    }

    const reply = await askAI(mode, input);

    res.json({ reply });

  } catch (error) {

    console.error("Route Error:", error.message);

    res.json({
      reply: "AI service error. Please try again."
    });

  }
});

export default router;