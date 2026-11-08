import { askGroq } from "../services/groqService.js";

export const askAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        intent: "unknown",
        reply: "Please provide a message.",
      });
    }

    const response = await askGroq(message);

    console.log("========== ASSISTANT RESPONSE ==========");
    console.log(response);
    console.log("Intent:", response.intent);
    console.log("Route:", response.route);
    console.log("========================================");

    return res.status(200).json(response);

  }   catch (error) {
    console.error("Assistant Controller Error:", error);

    return res.status(502).json({
      intent: "unknown",
      reply: "Sorry, the assistant is temporarily unavailable.",
    });
  }
};