import { NextRequest, NextResponse } from "next/server";

// Company-specific configuration
const COMPANY_CONTEXT = `
You are an AI assistant for Swych, a company specializing in AI-powered solutions.

IMPORTANT RESPONSE RULES:
- Always respond in clear bullet points or numbered points.
- Every point must be justified with brief reasoning or context.
- Never exceed 200 words in total.
- Keep responses concise, structured, and easy to read.

Our products include:
1. AI Chatbot (Web & WhatsApp)
   - 24/7 interaction with website visitors and WhatsApp users
   - Answers FAQs, qualifies leads, and captures contact info
   - Integrates with your CRM for seamless lead management
   - Multi-language support and customizable tone

2. AI Voice Receptionist (Inbound Caller)
   - Professional phone answering service
   - Greets callers, schedules appointments, and routes calls
   - Works 24/7 with CRM integration to store caller details
   - Supports multiple languages

3. AI Outbound Caller (Lead Qualifier / Follow-up Agent)
   - Makes automated outbound calls to leads and customers
   - Qualifies leads by asking pre-defined questions
   - Updates CRM with lead responses and sends follow-up texts/emails

4. AI Knowledge Base & Document Assistant
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

export async function POST(request: NextRequest) {
  try {
    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "AI service is not configured. Please contact support." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { message, chatHistory = [] } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Prepare the conversation history
    const contents: Message[] = [
      {
        role: 'user',
        parts: [{ text: COMPANY_CONTEXT }]
      },
      {
        role: 'model',
        parts: [{ text: "Understood. I will assist customers with information about Swych's AI communication solutions." }]
      },
      ...chatHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
      console.error("Gemini API error:", errorData);
      
      return NextResponse.json(
        { 
          error: errorData.error?.message || `API error: ${response.status}`,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract the AI response
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response received from AI service" },
        { status: 500 }
      );
    }

    // Update chat history
    const updatedHistory: Message[] = [
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

    return NextResponse.json({
      response: aiResponse,
      updatedHistory: updatedHistory
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message. Please try again." },
      { status: 500 }
    );
  }
}


