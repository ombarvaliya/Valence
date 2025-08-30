import { NextRequest, NextResponse } from 'next/server';

async function getGeminiResponse(question: string, chatHistory: any[]): Promise<string> {
    // 1. Read the API key from your secure environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    
    // 2. Check if the API key is available
    if (!apiKey) {
        console.error("Gemini API key is not configured in .env.local");
        return "I'm sorry, but the AI assistant is not configured correctly. The API key is missing.";
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // This is the detailed "persona" and knowledge base for our AI assistant.
    const systemInstruction = {
        parts: [{
            text: `You are an expert AI assistant for "Valence", a web app for mapping green energy assets. Your name is the Valence Help Assistant. Be friendly, helpful, and concise.

            **Your Primary Role: Assist with the Valence App**
            Use this guide to answer user questions about the application:
            - **Core Purpose:** Valence is a private, personal mapping tool for users to manage their own green energy infrastructure assets.
            - **Main Pages:** The app includes a Map Page (/map), a Dashboard (/dashboard) for summaries, and an Add Asset Page (/add-asset).
            - **Asset Types:** Users can add 'Renewable' (green icon), 'Hydrogen' (blue icon), and 'Demand' (orange icon) assets.
            - **Key Features:** Users can filter assets on the map page sidebar and click on an asset in the list to fly to its location.
            - **Authentication:** Users must sign up and log in. All data is private.

            **Your Secondary Role: General Knowledge Assistant**
            - If a user's question is clearly NOT about the Valence application (e.g., "What is the capital of France?", "explain quantum computing"), you are permitted to answer it as a general AI assistant.
            - Do not mention that you are a "large language model". Simply answer the question.
            - If a question is ambiguous, assume it is about Valence.

            Begin your first response to the user with "Hello! I am the Valence AI Assistant. How can I help you today?"`
        }]
    };

    const payload = {
        contents: [...chatHistory, { role: "user", parts: [{ text: question }] }],
        systemInstruction: systemInstruction,
        generationConfig: {
            temperature: 0.7, // Controls randomness for more creative answers
            topK: 40,
        }
    };

    try {
        // 3. Make the actual API call
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Gemini API Error:", response.status, errorBody);
            return `I'm sorry, I'm having trouble connecting to the AI service (Error ${response.status}). Please try again later.`;
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        
        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.warn("Gemini API returned a successful response but no content.", result);
            return "I received a response, but I'm not sure what to say. Could you please rephrase your question?";
        }
    } catch (error) {
        console.error("Fetch to Gemini API failed:", error);
        return "My apologies, I was unable to process that request due to a network error.";
    }
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ success: false, message: 'No message provided.' }, { status: 400 });
    }
    
    const chatHistory = (history || []).map((msg: { text: string; isUser: boolean; }) => ({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }]
    }));

    const aiResponse = await getGeminiResponse(message, chatHistory);

    return NextResponse.json({ success: true, data: aiResponse }, { status: 200 });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ success: false, message: 'Error processing your request.' }, { status: 500 });
  }
}