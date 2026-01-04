export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function sendMessageToGemini(
  message: string,
  chatHistory: ChatMessage[] = []
) {
  const contents: ChatMessage[] = [
    ...chatHistory.slice(-6),
    {
      role: "user",
      parts: [{ text: message }],
    },
  ];

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "AI request failed");
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from AI");
  }

  return text;
}

export function getWelcomeMessage() {
  return "Hi! I'm your AI assistant. How can I help you learn about Swych's AI solutions today?";
}
