// components/ui/LanguageSwitcher.tsx — Language toggle button

'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSwitcher() {
  const { language, cycleLang } = useLanguage();

  const display: Record<string, string> = {
    en: 'EN',
    hi: 'हि',
    te: 'తె',
  };

  return (
    <button
      onClick={cycleLang}
      className="flex gap-1 border-b-2 border-primary-container pb-1 text-primary-container font-bold px-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      {(['en', 'hi', 'te'] as const).map((lang, i) => (
        <span
          key={lang}
          className={`text-[12px] leading-[16px] tracking-[0.05em] font-semibold transition-colors ${
            language === lang ? 'text-primary-container' : 'text-on-surface-variant'
          }`}
        >
          {display[lang]}
          {i < 2 && '/'}
        </span>
      ))}
    </button>
  );
}
