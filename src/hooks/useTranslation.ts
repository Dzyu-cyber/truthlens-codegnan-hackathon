// hooks/useTranslation.ts — Custom hook for managing translations with caching

'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

// Global cache to avoid re-translating same text across components
const translationCache: Record<string, Record<string, string>> = {
  hi: {},
  te: {},
};

export function useTranslation(text: string | undefined) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!text) {
      setTranslated('');
      return;
    }

    if (language === 'en') {
      setTranslated(text);
      setIsLoading(false);
      return;
    }

    // Check cache
    if (translationCache[language][text]) {
      setTranslated(translationCache[language][text]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    const translate = async () => {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang: language }),
        });

        if (!response.ok) throw new Error('Translation failed');
        
        const data = await response.json();
        const result = data.translatedText || text;

        if (isMounted) {
          // Save to cache
          translationCache[language][text] = result;
          setTranslated(result);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Translation error:', err);
        if (isMounted) {
          setTranslated(text); // fallback to English
          setIsLoading(false);
        }
      }
    };

    translate();

    return () => {
      isMounted = false;
    };
  }, [text, language]);

  return { translated, isLoading };
}
