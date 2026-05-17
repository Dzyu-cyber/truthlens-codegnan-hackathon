// components/dashboard/SourceCards.tsx — Source breakdown cards

'use client';

import { motion } from 'framer-motion';
import { Source, Stance } from '@/lib/types';
import StanceChip from '@/components/ui/StanceChip';
import ProgressBar from '@/components/ui/ProgressBar';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface SourceCardsProps {
  sources: Source[];
}

function getBorderColor(stance: Stance): string {
  switch ((stance || '').toUpperCase()) {
    case 'SUPPORTS': return 'border-l-[#00ff88]';
    case 'CONTRADICTS': return 'border-l-[#ff3b5c]';
    case 'NEUTRAL': return 'border-l-[#7b8fb0]';
    default: return 'border-l-[#7b8fb0]';
  }
}

function getCredibilityColor(score: number): string {
  if (score >= 70) return '#00ff88';
  if (score >= 40) return '#ffaa00';
  return '#ff3b5c';
}

export default function SourceCards({ sources }: SourceCardsProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h3 className="text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2">
        <span className="material-symbols-outlined text-primary-fixed">troubleshoot</span>
        Source Breakdown
      </h3>

      <div className="grid gap-4">
        {sources.map((source, index) => (
          <motion.div
            key={source.sourceName}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className={`glass-panel p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-l-4 ${getBorderColor(source.stance)} hover:bg-surface-container-high/20 transition-colors`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[14px] leading-[20px] tracking-[0.02em] font-semibold text-on-surface">
                  {source.sourceName}
                </span>
                {source.sourceUrl && (
                  <a
                    href={source.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant hover:text-primary-fixed transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                )}
              </div>
              <p className="text-[14px] leading-[20px] text-on-surface-variant line-clamp-1 italic min-h-[20px]">
                &ldquo;<TranslatedText text={source.keyTakeaway} skeletonClass="h-4 w-64" />&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="w-24">
                <ProgressBar
                  value={source.credibilityScore}
                  color={getCredibilityColor(source.credibilityScore)}
                  delay={0.3 + 0.1 * index}
                />
                <span className="text-[10px] leading-[12px] tracking-[0.08em] font-bold text-on-surface-variant mt-1 block">
                  Credibility: {source.credibilityScore}%
                </span>
              </div>
              <StanceChip stance={source.stance} />
            </div>

            {/* Published date */}
            <span className="text-[10px] leading-[12px] tracking-[0.08em] font-bold text-on-surface-variant/60 hidden md:block">
              {source.publishedDate}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
