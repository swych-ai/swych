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

        // List of models to try. 1.5-flash is standard for prod, 2.5-flash works for your local key.
        const models = ["gemini-1.5-flash", "gemini-2.5-flash"];

        let response;
        let usedModel;

        for (const model of models) {
            console.log(`Trying model: ${model}`);
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            response = await fetch(url, {
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
            });

            if (response.ok) {
                usedModel = model;
                break;
            }

            // If we get here, the model failed. Log it and try the next one.
            const errorText = await response.text();
            console.warn(`Model ${model} failed:`, errorText);
        }

        if (!response || !response.ok) {
            // If all models failed, return the error from the last attempt (or generic)
            const errorDetails = response ? await response.text() : "All models failed";
            console.error("All Gemini models failed. Last error:", errorDetails);
            return NextResponse.json(
                { error: "Gemini API failed", details: errorDetails },
                { status: response ? response.status : 500 }
            );
        }

        const raw = await response.text();
        console.log(`Success using model: ${usedModel}`);

        return NextResponse.json(JSON.parse(raw));
    } catch (err) {
        console.error("Chat API crashed:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
