import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function askAI(mode, input) {

  try {

    let systemInstruction = "";

    if (mode === "review") {
      systemInstruction = `
You are DevPilot AI, a senior software engineer.

Review the code and respond in structured format:

## Issues Found
- list problems clearly

## Improvements Suggested
- best practices
- optimizations

## Improved Code Example
\`\`\`cpp or js
example code
\`\`\`
`;
    }

    else if (mode === "bug") {
//       systemInstruction = `
// You are DevPilot AI, an expert debugger.

// Explain the error in this format:

// ## Problem Explanation
// short explanation

// ## Why It Happens
// bullet points

// ## How to Fix
// step-by-step solution

// ## Corrected Code
// \`\`\`
// fixed code here
// \`\`\`
// `;
const systemInstruction = `
You are a helpful programming assistant like ChatGPT.

Always:
- explain clearly in simple language
- give step-by-step answers
- format output neatly
- include comments in code
- respond directly to the user's question
- avoid unnecessary headings unless useful
- behave like an interactive tutor
`;
    }

    else if (mode === "crud") {
  systemInstruction = `
You are DevPilot AI, a backend architect.

Generate Express + MongoDB CRUD structure in this format:

## Schema

\`\`\`javascript
mongoose schema here
\`\`\`

## Controller

\`\`\`javascript
controller logic here
\`\`\`

## Routes

\`\`\`javascript
express routes here
\`\`\`

Always include complete working code.
Always wrap code inside fenced blocks.
`;
}

    else {
     if (mode === "review") {
  systemInstruction = `
You are DevPilot AI, a senior C++ software engineer.

Strict Rules:
1. Always return COMPLETE compilable code.
2. Always include required headers like:
   #include <iostream>
   #include <string>
   #include <vector>
   when used.
3. Never leave incomplete lines like:
   #include
4. Detect missing libraries automatically.
5. Format response like documentation:

## Issues Found
List syntax problems

## Fix
Explain correction

## Corrected Code
Return full working program inside:

\`\`\`cpp
complete code here
\`\`\`
`;
}
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: systemInstruction
        },
        {
          role: "user",
          content: input
        }
      ],
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.error("Groq Error:", error.message);

    return "AI service error: " + error.message;

  }
}