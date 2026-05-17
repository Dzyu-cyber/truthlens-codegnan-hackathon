// app/api/tts/route.ts — Server-side endpoint for Text-to-Speech

import { NextResponse } from 'next/server';
import { textToSpeech as sarvamTTS } from '@/lib/sarvamApi';
import { bhashiniTTS } from '@/lib/bhashiniApi';

export async function POST(request: Request) {
  try {
    const { text, lang } = await request.json();

    if (!text || !lang) {
      return NextResponse.json({ error: 'Missing text or lang' }, { status: 400 });
    }

    // English TTS can be skipped or handled by browser TTS if needed, but we only support HI/TE here.
    if (lang === 'en') {
      return NextResponse.json({ audioBase64: null, language: 'en' });
    }

    // Try Bhashini first (since it's 100% free with no limits)
    try {
      const audio = await bhashiniTTS(text, lang as 'hi' | 'te');
      return NextResponse.json({ audioBase64: audio, language: lang });
    } catch (err) {
      console.warn('Bhashini TTS failed, falling back to Sarvam:', err);
      // Fallback to Sarvam
      const sarvamAudio = await sarvamTTS(text, lang as 'hi' | 'te');
      return NextResponse.json({ audioBase64: sarvamAudio, language: lang });
    }
  } catch (error) {
    console.error('TTS API route error:', error);
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}
