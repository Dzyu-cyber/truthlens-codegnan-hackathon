// app/api/analyze/route.ts — Server-side API route for claim analysis (multimodal)

import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithGemini, analyzeMediaWithGemini } from '@/lib/geminiApi';
import { buildContextBlob } from '@/lib/searchAndScrape';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claim, rawBlob, mediaBase64, mediaMimeType } = body;

    // ── Multimodal (image / video) path ──
    if (mediaBase64 && mediaMimeType) {
      if (typeof mediaBase64 !== 'string' || typeof mediaMimeType !== 'string') {
        return NextResponse.json({ error: 'Invalid media fields' }, { status: 400 });
      }
      const result = await analyzeMediaWithGemini(mediaBase64, mediaMimeType);
      return NextResponse.json(result);
    }

    // ── Text path (existing) ──
    if (!claim || typeof claim !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "claim" field' },
        { status: 400 }
      );
    }

    console.log('Initiating Search & Scrape RAG pipeline for claim...');
    const { rawBlob: searchBlob } = await buildContextBlob(claim);
    
    let finalBlob = searchBlob;
    if (rawBlob) {
      finalBlob = `=== USER PROVIDED SOURCE ===\n${rawBlob}\n\n=== INDEPENDENT WEB SEARCH RESULTS ===\n${searchBlob}`;
    }

    const result = await analyzeWithGemini(finalBlob, claim);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis API error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
