// lib/geminiApi.ts — Gemini API integration for fact-checking analysis (multimodal)

import { AnalysisResult } from './types';
import { ANALYSIS_SYSTEM_PROMPT, MEDIA_ANALYSIS_SYSTEM_PROMPT } from './analysisPrompt';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE = `https://generativelanguage.googleapis.com/v1beta/models`;

// ─── Retry helper ─────────────────────────────────────────────────────────────
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

// ─── Parse & validate Gemini response ────────────────────────────────────────
function parseGeminiResponse(data: unknown): AnalysisResult {
  const d = data as Record<string, unknown>;
  const content = (d.candidates as Array<{content: {parts: Array<{text: string}>}}>)?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error('Empty response from Gemini API');

  let parsed: AnalysisResult;
  try {
    parsed = JSON.parse(content) as AnalysisResult;
  } catch {
    // Sometimes Gemini wraps in markdown fences despite responseMimeType
    const cleaned = content.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    parsed = JSON.parse(cleaned) as AnalysisResult;
  }

  if (!parsed.verdict || !parsed.originalClaim || typeof parsed.confidenceScore !== 'number') {
    throw new Error('Invalid analysis response structure');
  }
  return parsed;
}

// ─── Client-side: text analysis (routes through Next.js API) ─────────────────
export async function analyzeContent(blob: string, claim: string): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim, rawBlob: blob }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }
  return response.json() as Promise<AnalysisResult>;
}

// ─── Client-side: multimodal (image/video) analysis ──────────────────────────
export async function analyzeMediaContent(
  base64: string,
  mimeType: string
): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mediaBase64: base64, mediaMimeType: mimeType }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }
  return response.json() as Promise<AnalysisResult>;
}

// ─── Server-side: TEXT analysis ──────────────────────────────────────────────
export async function analyzeWithGemini(blob: string, claim: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: ANALYSIS_SYSTEM_PROMPT }] },
      contents: [{
        role: 'user',
        parts: [{ text: `ORIGINAL CLAIM: ${claim}\n\nRAW DATA: ${blob}` }],
      }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return parseGeminiResponse(await response.json());
}

// ─── Server-side: MULTIMODAL analysis (image / video) ────────────────────────
export async function analyzeMediaWithGemini(
  mediaBase64: string,
  mimeType: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

  const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const isVideo = mimeType.startsWith('video/');
  const isAudio = mimeType.startsWith('audio/');
  const isPdf = mimeType === 'application/pdf';
  
  const mediaLabel = isVideo ? 'video' : isAudio ? 'audio file' : isPdf ? 'document' : 'image';

  const response = await fetchWithRetry(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: MEDIA_ANALYSIS_SYSTEM_PROMPT }] },
      contents: [{
        role: 'user',
        parts: [
          {
            inline_data: {
              mime_type: mimeType,
              data: mediaBase64,
            },
          },
          {
            text: `Please perform a full forensic fact-check analysis on this ${mediaLabel}. Identify the core claim or narrative it presents, check for signs of manipulation, deepfakes, misleading editing, or false information, and return your structured JSON analysis.`,
          },
        ],
      }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return parseGeminiResponse(await response.json());
}

// ─── Client-side: Chat with Priya ────────────────────────────────────────────
export async function chatWithPriya(
  messages: { role: 'user' | 'assistant'; content: string }[],
  systemPrompt: string
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt }),
  });
  if (!response.ok) throw new Error(`Chat API error: ${response.status}`);
  const data = await response.json() as { response: string };
  return data.response;
}
