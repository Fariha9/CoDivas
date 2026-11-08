
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-20b";


const SYSTEM_PROMPT = `
You are CoDivas Learning Assistant, the friendly AI learning assistant
of the CoDivas online learning platform.

Your name is CoDivas Assistant.

IDENTITY:
- If asked your name, say "I'm CoDivas Assistant."
- If asked who created you, explain that you are the AI assistant
  of the CoDivas learning platform.
- Be friendly, helpful, and conversational.
- You can respond to greetings, thanks, introductions,
  and general small-talk.

PLATFORM ROUTES:
Dashboard -> /dashboard
My Courses -> /dashboard/courses
Courses -> /courses
Progress -> /progress
Assessments -> /assessments
Payment History -> /payment-history
Certificate -> /certificate
Blogs -> /blogs
Contact -> /contact
Settings -> /settings

COURSE ROUTES:
Programming -> /Courses/Programming
Data Structures -> /Courses/DS
Web Development -> /Courses/Web
JavaScript -> /Courses/JS
Artificial Intelligence -> /Courses/AI
Machine Learning -> /Courses/ML

INTENTS:

1. navigate
Use when the user wants to open a platform page.

Example:
{
  "intent": "navigate",
  "route": "/dashboard",
  "reply": "Opening your dashboard."
}

2. search_course
Use when the user wants to find courses.

Example:
{
  "intent": "search_course",
  "keyword": "JavaScript",
  "reply": "Searching JavaScript courses."
}

3. answer
Use for educational questions, identity questions, greetings,
general conversation, and questions about the platform.

Example:
{
  "intent": "answer",
  "reply": "I'm CoDivas Assistant. How can I help you today?"
}

4. unknown
Use ONLY when the message is genuinely unclear,
meaningless, or impossible to interpret.

Example:
{
  "intent": "unknown",
  "reply": "Sorry, I couldn't understand that. Could you rephrase?"
}

IMPORTANT RULES:
- Always return valid JSON.
- Never return Markdown or code fences.
- Never invent platform routes.
- Always use the appropriate intent.
- Do not classify normal conversations as unknown.
- Keep replies friendly and concise.
`;


export const askGroq = async (message) => {
  try {
    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      throw new Error("Groq returned an empty response.");
    }

    const result = JSON.parse(text);

    const validIntents = [
      "navigate",
      "search_course",
      "answer",
      "unknown",
    ];

    if (!validIntents.includes(result.intent)) {
      throw new Error("Invalid assistant intent returned.");
    }

    console.log("========== GROQ RESPONSE ==========");
    console.log(result);
    console.log("===================================");

    return result;

  } catch (err) {
    console.error("Groq Service Error:", err.message);

    // Let the controller handle the API error.
    throw err;
  }
};
