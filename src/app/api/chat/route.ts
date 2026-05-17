// app/api/chat/route.ts — Server-side API route for Priya chat

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, systemPrompt } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // Convert messages to Gemini format
    const formattedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Helper for handling temporary 503 high demand errors
    async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
      for (let i = 0; i < maxRetries; i++) {
        const response = await fetch(url, options);
        if (response.status === 503) {
          console.warn(`Gemini API 503 High Demand (Attempt ${i + 1}/${maxRetries}). Retrying in ${1500 * (i + 1)}ms...`);
          await new Promise(res => setTimeout(res, 1500 * (i + 1)));
          continue;
        }
        return response;
      }
      return fetch(url, options);
    }

    const response = await fetchWithRetry(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: formattedMessages
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ response: content });
  } catch (error) {
    console.error('Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
