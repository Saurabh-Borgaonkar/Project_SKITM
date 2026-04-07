import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAI(prompt) {

  try {

    let systemInstruction = "";

    if (prompt.startsWith("review:")) {
      systemInstruction =
        "You are a senior software engineer. Review the code and suggest improvements, best practices, optimizations, and possible bugs.";
    }

    else if (prompt.startsWith("bug:")) {
      systemInstruction =
        "You are an expert debugger. Explain the error clearly and provide step-by-step solutions with corrected code examples.";
    }

    else if (prompt.startsWith("crud:")) {
      systemInstruction =
        "You are a backend expert. Generate a Node.js Express CRUD API with MongoDB model, controller, and routes based on the schema provided.";
    }

    else {
      systemInstruction =
        "You are a helpful coding assistant.";
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error("Groq Error:", error.message);

    return "AI service error: " + error.message;

  }

}