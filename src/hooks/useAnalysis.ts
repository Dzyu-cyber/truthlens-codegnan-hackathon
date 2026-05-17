// hooks/useAnalysis.ts — Custom hook for managing multimodal analysis state and API calls

'use client';

import { useState, useCallback } from 'react';
import { AnalysisResult } from '@/lib/types';
import { analyzeContent, analyzeMediaContent } from '@/lib/geminiApi';
import { dummyAnalysis, DEV_MODE } from '@/lib/dummyData';
import { UniversalInput } from '@/components/dashboard/UniversalInputBox';

interface UseAnalysisReturn {
  analysis: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  // Legacy text signature kept for backward compat
  analyze: (claimOrInput: string | UniversalInput, blob?: string) => Promise<void>;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (claimOrInput: string | UniversalInput, blob?: string) => {
    if (DEV_MODE) {
      setAnalysis(dummyAnalysis);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result: AnalysisResult;

      // ── Detect call signature ────────────────────────────────────────────
      if (typeof claimOrInput === 'string') {
        // Legacy: analyze(claim, blob)
        result = await analyzeContent(blob || '', claimOrInput);
      } else {
        const input = claimOrInput;

        if (input.mode === 'text') {
          // Text/question mode
          result = await analyzeContent('', input.text || '');

        } else if (input.mode === 'upload') {
          // Image/video upload mode
          if (!input.fileBase64 || !input.fileMimeType) {
            throw new Error('File data is missing');
          }
          result = await analyzeMediaContent(input.fileBase64, input.fileMimeType);

        } else if (input.mode === 'link') {
          // Link mode — first extract content, then analyze as text
          const extractRes = await fetch('/api/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: input.link,
              platform: input.linkPlatform || 'unknown',
            }),
          });

          if (!extractRes.ok) {
            const errData = await extractRes.json().catch(() => ({ error: 'Extraction failed' }));
            throw new Error(errData.error || 'Could not extract content from this link');
          }

          const extracted = await extractRes.json() as { text: string; title: string };
          // Use extracted text as both "claim" and "blob" so Gemini has full context
          result = await analyzeContent(extracted.text, extracted.title);

        } else {
          throw new Error('Unknown input mode');
        }
      }

      setAnalysis(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { analysis, isLoading, error, analyze, reset };
}
