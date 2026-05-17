// app/layout.tsx — Root layout with fonts, dark theme, and providers

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TruthLens — AI Fact-Checking Dashboard',
  description:
    'TruthLens is an AI-powered forensic fact-checking dashboard that analyzes claims, cross-references sources, and delivers transparent verdicts with confidence scoring.',
  keywords: ['fact-checking', 'misinformation', 'AI', 'news verification', 'TruthLens'],
  openGraph: {
    title: 'TruthLens — AI Fact-Checking Dashboard',
    description: 'AI-powered forensic fact-checking dashboard that analyzes claims, cross-references sources, and delivers transparent verdicts.',
    type: 'website',
    locale: 'en_US',
    siteName: 'TruthLens',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TruthLens — AI Fact-Checking Dashboard',
    description: 'AI-powered forensic fact-checking dashboard that analyzes claims, cross-references sources, and delivers transparent verdicts.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-inter text-on-background min-h-screen`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
