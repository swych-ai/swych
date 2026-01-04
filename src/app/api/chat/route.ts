import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Swych, a company specializing in AI-powered solutions.

Rules:
- Respond only in bullet points or numbered lists
- Keep answers under 200 words
- Be professional and concise

Products:
- AI Chatbot
- AI Voice Receptionist
- AI Outbound Caller
- AI Knowledge Base Assistant
`;

export async function POST(req: NextRequest) {
    console.log("Chat API route hit");
    try {
        const apiKey = process.env.GEMINI_API_KEY?.trim();

        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing");
            return NextResponse.json(
                { error: "API not configured" },
                { status: 500 }
            );
        }

        const { contents } = await req.json();

        if (!Array.isArray(contents)) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        const sanitizedContents = contents.map((m) => ({
            role: m.role,
            parts: m.parts,
        }));

        // Using gemini-2.5-flash as returned by ListModels
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                systemInstruction: {
                    role: "system",
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
                contents: sanitizedContents,
                generationConfig: {
                    temperature: 0.6,
                    maxOutputTokens: 200,
                },
            }),
            cache: "no-store",
        }
        );

        const raw = await response.text();

        if (!response.ok) {
            console.error("Gemini error:", raw);
            return NextResponse.json(
                { error: "Gemini API failed", details: raw },
                { status: response.status }
            );
        }

        return NextResponse.json(JSON.parse(raw));
    } catch (err) {
        console.error("Chat API crashed:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
