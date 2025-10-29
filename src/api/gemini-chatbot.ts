// lib/api/gemini-chatbot.ts

/**
 * Swych AI Chatbot Configuration
 * This file handles all interactions with Google's Gemini API
 */

// Company-specific configuration
const COMPANY_CONTEXT = `
You are an AI assistant for Swych, a company specializing in AI-powered solutions.

IMPORTANT: Keep all responses under 200 words. Be concise and to the point.

Our products include:
1. **AI Chatbot** (Web & WhatsApp)
   - 24/7 interaction with website visitors and WhatsApp users
   - Answers FAQs, qualifies leads, and captures contact info
   - Integrates with your CRM for seamless lead management
   - Multi-language support and customizable tone

2. **AI Voice Receptionist** (Inbound Caller)
   - Professional phone answering service
   - Greets callers, schedules appointments, and routes calls
   - Works 24/7 with CRM integration to store caller details
   - Supports multiple languages

3. **AI Outbound Caller** (Lead Qualifier / Follow-up Agent)
   - Makes automated outbound calls to leads and customers
   - Qualifies leads by asking pre-defined questions
   - Updates CRM with lead responses and sends follow-up texts/emails

4. **AI Knowledge Base & Document Assistant**
   - Converts company documents into an interactive Q&A tool
   - Handles HR, employee, and customer queries with context-aware responses
   - Makes information instantly accessible for staff or customers

Your role:
- Answer questions about our AI solutions
- Help potential customers understand our products
- Provide information about pricing, features, and use cases
- Be professional, helpful, and concise
- If asked about technical details, provide clear explanations
- Always maintain a positive and solution-oriented tone

Company values:
- Innovation in AI technology
- Customer success and satisfaction
- Transparent and ethical AI practices
- Scalable and reliable solutions
`;

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ChatHistory {
  history: Message[];
}

/**
 * Send a message to Gemini API and get a response
 * @param message - User's message
 * @param apiKey - Your Gemini API key
 * @param chatHistory - Previous conversation history (optional)
 * @returns AI response text and updated chat history
 */
export async function sendMessageToGemini(
  message: string,
  apiKey: string,
  chatHistory: Message[] = []
): Promise<{ response: string; updatedHistory: Message[] }> {
  try {
    // Validate inputs
    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }

    // Prepare the conversation history
    const contents: Message[] = [
      {
        role: 'user',
        parts: [{ text: COMPANY_CONTEXT }]
      },
      {
        role: 'model',
        parts: [{ text: 'Understood. I will assist customers with information about Swych’s AI communication solutions.' }]
      },
      ...chatHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents.slice(-10), // Keep last 10 messages for context
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 150,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE'
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Gemini API error: ${response.status} - ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();

    // Extract the AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      throw new Error('No response received from Gemini API');
    }

    // Update chat history
    const updatedHistory = [
      ...chatHistory,
      {
        role: 'user' as const,
        parts: [{ text: message }]
      },
      {
        role: 'model' as const,
        parts: [{ text: aiResponse }]
      }
    ];

    return {
      response: aiResponse,
      updatedHistory: updatedHistory
    };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Return a friendly error message
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your Gemini API key.');
      }
      throw error;
    }
    
    throw new Error('Failed to get response from AI. Please try again.');
  }
}

/**
 * Validate Gemini API key format
 * @param apiKey - API key to validate
 * @returns true if format is valid
 */
export function validateApiKey(apiKey: string): boolean {
  // Gemini API keys typically start with "AIza" and are 39 characters long
  return apiKey.startsWith('AIza') && apiKey.length === 39;
}

/**
 * Get a default welcome message
 * @returns Welcome message string
 */
export function getWelcomeMessage(): string {
  return "Hi! I'm your AI assistant. How can I help you learn about Swych's AI solutions today?";
}

/**
 * Get suggested questions for users
 * @returns Array of suggested questions
 */
export function getSuggestedQuestions(): string[] {
  return [
    "What AI solutions does Swych offer?",
    "How does the AI chatbot work?",
    "Tell me about your AI voice receptionist features",
    "What are your pricing options?",
    "Can you integrate with my CRM?",
    "How can Swych's AI solutions help my business?",
    "What is the AI Outbound Caller, and how does it work?",
    "How does the AI Knowledge Base Assistant work?",
    "Can your chatbot support multiple languages?"
  ];
}
