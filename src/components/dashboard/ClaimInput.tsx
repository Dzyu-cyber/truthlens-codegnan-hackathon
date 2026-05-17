// components/dashboard/ClaimInput.tsx — Initial input form for fact-checking

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DEV_MODE, dummyClaim, dummyRawBlob } from '@/lib/dummyData';

interface ClaimInputProps {
  onAnalyze: (claim: string, blob: string) => void;
  isLoading: boolean;
}

export default function ClaimInput({ onAnalyze, isLoading }: ClaimInputProps) {
  const [claim, setClaim] = useState('');
  const [blob, setBlob] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim || !blob) return;
    onAnalyze(claim, blob);
  };

  const fillDemoData = () => {
    setClaim(dummyClaim);
    setBlob(dummyRawBlob);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto w-full mt-12 md:mt-24 px-4"
    >
      <div className="text-center mb-10">
        <h1 className="text-[40px] leading-[48px] font-bold text-on-surface mb-4">
          Uncover the <span className="text-primary-container">Truth</span>
        </h1>
        <p className="text-[16px] leading-[24px] text-on-surface-variant">
          Paste a claim and the supporting articles to get a comprehensive forensic analysis powered by AI.
        </p>
      </div>

      <div className="glass-panel p-6 md:p-8 rounded-2xl border border-outline-variant/30 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary-container/10 blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
          <div>
            <label htmlFor="claim" className="block text-[14px] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2">
              Original Claim
            </label>
            <input
              id="claim"
              type="text"
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="E.g. The government has banned all rice exports..."
              className="w-full bg-surface-container-lowest/50 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/50 transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="blob" className="block text-[14px] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2">
              Raw Data (Articles / Text)
            </label>
            <textarea
              id="blob"
              value={blob}
              onChange={(e) => setBlob(e.target.value)}
              placeholder="Paste the text from articles, posts, or news reports here..."
              rows={6}
              className="w-full bg-surface-container-lowest/50 border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/50 transition-all resize-y"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
            <button
              type="button"
              onClick={fillDemoData}
              className="text-on-surface-variant text-[14px] font-semibold hover:text-on-surface transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              <span className="material-symbols-outlined text-[18px]">magic_button</span>
              Fill Demo Data
            </button>

            <button
              type="submit"
              disabled={isLoading || !claim || !blob}
              className="w-full sm:w-auto bg-primary-container text-on-primary-container text-[14px] font-bold px-8 py-3 rounded-xl hover:bg-[#00e67a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-on-primary-container/30 border-t-on-primary-container rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  Run Forensic Analysis
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {DEV_MODE && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 bg-surface-bright/50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-on-surface-variant font-bold border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse" />
            DEV MODE ACTIVE (No API Keys Required)
          </span>
        </div>
      )}
    </motion.div>
  );
}
