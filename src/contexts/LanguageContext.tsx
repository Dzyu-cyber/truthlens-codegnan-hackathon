// contexts/LanguageContext.tsx — Global language state via React Context

'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Language } from '@/lib/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cycleLang: () => void;
  label: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_LABELS: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
};

const LANG_ORDER: Language[] = ['en', 'hi', 'te'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const cycleLang = useCallback(() => {
    setLanguage((prev) => {
      const idx = LANG_ORDER.indexOf(prev);
      return LANG_ORDER[(idx + 1) % LANG_ORDER.length];
    });
  }, []);

  const label = LANG_LABELS[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, cycleLang, label }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}
