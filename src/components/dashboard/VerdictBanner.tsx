// components/dashboard/VerdictBanner.tsx — Hero verdict banner section

'use client';

import { motion } from 'framer-motion';
import { AnalysisResult, Verdict } from '@/lib/types';
import VerdictBadge from '@/components/ui/VerdictBadge';
import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from '@/components/ui/Skeleton';

interface VerdictBannerProps {
  analysis: AnalysisResult;
}

function getGlowClass(verdict: Verdict): string {
  switch (verdict) {
    case 'TRUE': return 'glow-border-verified';
    case 'MISLEADING': return 'glow-border-misleading';
    case 'FALSE': return 'glow-border-false';
    default: return '';
  }
}

function getTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}

export default function VerdictBanner({ analysis }: VerdictBannerProps) {
  const { translated: translatedClaim, isLoading: isLoadingClaim } = useTranslation(analysis.originalClaim);
  const { translated: translatedReason, isLoading: isLoadingReason } = useTranslation(analysis.verdictReason);

  const downloadManifest = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analysis, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `truthlens-manifest-${analysis.overallCredibilityScore}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass-panel rounded-xl p-6 md:p-8 ${getGlowClass(analysis.verdict)} relative overflow-hidden`}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanline-overlay" />

      <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] leading-[12px] tracking-[0.08em] font-bold uppercase text-on-surface-variant border border-outline-variant/30 px-2 py-1 rounded">
              Claim Under Review
            </span>
            <span className="text-[10px] leading-[12px] tracking-[0.08em] font-bold text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {getTimeAgo(analysis.analyzedAt)}
            </span>
          </div>

          <h1 className="text-[28px] leading-[36px] font-bold md:text-[32px] md:leading-[40px] md:tracking-[-0.01em] md:font-bold text-on-surface mb-6 min-h-[80px]">
            {isLoadingClaim ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-2/3" />
              </div>
            ) : (
              <>&ldquo;{translatedClaim}&rdquo;</>
            )}
          </h1>

          <div className="bg-surface-container-lowest/50 rounded-lg p-4 border border-outline-variant/20">
            <div className="text-[16px] leading-[24px] text-on-surface-variant mb-4 min-h-[48px]">
              <span className="font-bold text-on-surface">Verdict Summary: </span>
              {isLoadingReason ? (
                <div className="inline-flex flex-col gap-2 w-full mt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                translatedReason
              )}
            </div>
            <div className="flex gap-4">
              <button className="bg-surface-bright text-on-surface text-[12px] leading-[16px] tracking-[0.05em] font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-surface-variant transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px]">share</span>
                Share Report
              </button>
              <button 
                onClick={downloadManifest}
                className="text-primary-fixed text-[12px] leading-[16px] tracking-[0.05em] font-semibold px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-fixed/10 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download Manifest
              </button>
            </div>
          </div>
        </div>

        <VerdictBadge verdict={analysis.verdict} confidenceScore={analysis.confidenceScore} />
      </div>
    </motion.section>
  );
}
