// app/api/did/route.ts — Server-side endpoint for D-ID video generation

import { NextResponse } from 'next/server';
import { generateTalkingHead } from '@/lib/didApi';

export async function POST(request: Request) {
  try {
    const { audioBase64, imageUrl } = await request.json();

    if (!audioBase64 || !imageUrl) {
      return NextResponse.json({ error: 'Missing audio or image' }, { status: 400 });
    }

    // In a real app, you would upload the base64 audio to a public bucket (e.g. S3) first.
    // D-ID requires a public URL for the audio. For this demo, we'll construct a mock public URL
    // or simulate the flow if the user wants to integrate a real storage bucket later.
    // However, if DID_API_KEY is missing, it automatically falls back anyway.
    
    // For demo purposes, we will assume audioUrl is somehow available or we just return fallback.
    // Let's pass a dummy public URL to trigger the D-ID API if a key exists, just for the hackathon.
    const dummyPublicAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    const videoUrl = await generateTalkingHead(dummyPublicAudioUrl, imageUrl);

    if (videoUrl) {
      return NextResponse.json({ videoUrl });
    } else {
      return NextResponse.json({ fallback: true });
    }
  } catch (error) {
    console.error('D-ID API route error:', error);
    return NextResponse.json({ fallback: true }, { status: 500 });
  }
}
