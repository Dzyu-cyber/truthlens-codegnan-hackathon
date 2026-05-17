// hooks/useLanguage.ts — Custom hook for accessing language state

'use client';

import { useLanguageContext } from '@/contexts/LanguageContext';

export function useLanguage() {
  return useLanguageContext();
}
