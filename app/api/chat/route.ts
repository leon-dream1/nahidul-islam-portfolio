// app/api/chat/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const contextPath = path.join(process.cwd(), "data", "nahidul-context.md");
// console.log(contextPath);
// const NAHIDUL_CONTEXT = fs.readFileSync(contextPath, "utf-8");

// const SYSTEM_PROMPT = `You are a friendly and professional AI assistant on Nahidul Islam's portfolio website. Your job is to help visitors learn about Nahidul — his skills, projects, experience, education, and background.

// Here is everything you know about Nahidul:

// ---
// ${NAHIDUL_CONTEXT}
// ---

// Guidelines:
// - Answer only based on the information above. Do not make up anything.
// - Be conversational, warm, and professional — like a knowledgeable colleague.
// - Keep responses concise (2–4 sentences unless more detail is asked).
// - If a visitor asks something you don't have info on, say: "I'm not sure about that, but you can reach Nahidul directly at nahidulislam019045@gmail.com"
// - Encourage visitors to check out his projects or contact him if they seem interested in hiring or collaborating.
// - You can speak in English or Bengali depending on the visitor's language.
// - Never pretend to BE Nahidul — you are his portfolio assistant.`;

// export async function POST(req: NextRequest) {
//   try {
//     const { messages } = await req.json();

//     if (!messages || !Array.isArray(messages)) {
//       return NextResponse.json(
//         { error: "Invalid messages format" },
//         { status: 400 },
//       );
//     }

//     // Separate history from the latest user message
//     const history = messages
//       .slice(0, -1)
//       .map((m: { role: string; content: string }) => ({
//         role: m.role === "assistant" ? "model" : "user",
//         parts: [{ text: m.content }],
//       }));

//     const lastMessage = messages[messages.length - 1];

//     const requestBody = {
//       system_instruction: {
//         parts: [{ text: SYSTEM_PROMPT }],
//       },
//       contents: [
//         ...history,
//         {
//           role: "user",
//           parts: [{ text: lastMessage.content }],
//         },
//       ],
//       generationConfig: {
//         maxOutputTokens: 1024,
//         temperature: 0.7,
//       },
//     };

//     const apiKey = process.env.GEMINI_API_KEY;
//     const model = "gemini-2.0-flash";
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error("Gemini API error:", error);
//       return NextResponse.json(
//         { error: error?.error?.message || "Gemini API error" },
//         { status: response.status },
//       );
//     }

//     const data = await response.json();
//     const reply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "Sorry, I couldn't generate a response.";

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const contextPath = path.join(process.cwd(), "data", "nahidul-context.md");
const NAHIDUL_CONTEXT = fs.readFileSync(contextPath, "utf-8");

const SYSTEM_PROMPT = `You are a friendly and professional AI assistant on Nahidul Islam's portfolio website. Your job is to help visitors learn about Nahidul — his skills, projects, experience, education, and background.

Here is everything you know about Nahidul:

---
${NAHIDUL_CONTEXT}
---

Guidelines:
- Answer only based on the information above. Do not make up anything.
- Be conversational, warm, and professional — like a knowledgeable colleague.
- Keep responses concise (2–4 sentences unless more detail is asked).
- If a visitor asks something you don't have info on, say: "I'm not sure about that, but you can reach Nahidul directly at nahidulislam019045@gmail.com"
- Encourage visitors to check out his projects or contact him if they seem interested in hiring or collaborating.
- You can speak in English or Bengali depending on the visitor's language.
- Never pretend to BE Nahidul — you are his portfolio assistant.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }
    console.log(process.env.GROQ_API_KEY);
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 1024,
          temperature: 0.7,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role,
              content: m.content,
            })),
          ],
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Groq API error:", error);
      return NextResponse.json(
        { error: error?.error?.message || "Groq API error" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
