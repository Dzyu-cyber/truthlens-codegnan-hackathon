// lib/sarvamApi.ts — Sarvam AI translation and TTS integration

import { Language } from './types';

const SARVAM_BASE_URL = 'https://api.sarvam.ai';

export async function translateText(
  text: string,
  targetLang: 'hi' | 'te'
): Promise<string> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    console.warn('SARVAM_API_KEY not configured, returning original text');
    return text;
  }

  const langMap: Record<string, string> = {
    hi: 'hi-IN',
    te: 'te-IN',
  };

  try {
    const response = await fetch(`${SARVAM_BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey,
      },
      body: JSON.stringify({
        input: text,
        source_language_code: 'en-IN',
        target_language_code: langMap[targetLang],
        speaker_gender: 'Female',
        mode: 'formal',
        model: 'mayura:v1',
        enable_preprocessing: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam translate error: ${response.status}`);
    }

    const data = await response.json();
    return data.translated_text || text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; // Fallback to original text
  }
}

export async function textToSpeech(
  text: string,
  lang: 'hi' | 'te'
): Promise<string> {
  const apiKey = process.env.SARVAM_API_KEY;
  if (!apiKey) {
    console.warn('SARVAM_API_KEY not configured');
    return '';
  }

  const langMap: Record<string, string> = {
    hi: 'hi-IN',
    te: 'te-IN',
  };

  try {
    const response = await fetch(`${SARVAM_BASE_URL}/text-to-speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey,
      },
      body: JSON.stringify({
        inputs: [text],
        target_language_code: langMap[lang],
        speaker: 'meera',
        model: 'bulbul:v1',
        pitch: 0,
        pace: 1.0,
        loudness: 1.0,
        enable_preprocessing: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Sarvam TTS error: ${response.status}`);
    }

    const data = await response.json();
    return data.audios?.[0] || '';
  } catch (error) {
    console.error('TTS failed:', error);
    return '';
  }
}
