import express from "express";
import { askAI } from "../services/openaiService.js";

const router = express.Router();

router.post("/ask", async (req, res) => {

  try {

    const { prompt } = req.body;

    const reply = await askAI(prompt);

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.json({
      reply: "Error connecting to AI"
    });

  }

});

export default router;