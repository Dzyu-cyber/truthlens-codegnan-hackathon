// app/api/translate/route.ts — Server-side endpoint for translation

import { NextResponse } from 'next/server';
import { translateText as sarvamTranslate } from '@/lib/sarvamApi';
import { bhashiniTranslate } from '@/lib/bhashiniApi';

export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json();

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing text or targetLang' }, { status: 400 });
    }

    if (targetLang === 'en') {
      return NextResponse.json({ translatedText: text, targetLanguage: 'en' });
    }

    // Try Sarvam first (primary)
    try {
      const translated = await sarvamTranslate(text, targetLang as 'hi' | 'te');
      return NextResponse.json({ translatedText: translated, targetLanguage: targetLang });
    } catch (err) {
      console.warn('Sarvam translation failed, falling back to Bhashini:', err);
      // Fallback to Bhashini
      const bhashiniTranslated = await bhashiniTranslate(text, targetLang as 'hi' | 'te');
      return NextResponse.json({ translatedText: bhashiniTranslated, targetLanguage: targetLang });
    }
  } catch (error) {
    console.error('Translation API route error:', error);
    // If all fail, return original text gracefully
    return NextResponse.json(
      { error: 'Translation failed', translatedText: null },
      { status: 500 }
    );
  }
}
