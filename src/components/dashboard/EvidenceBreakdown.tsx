// components/dashboard/EvidenceBreakdown.tsx — Visualizes direct vs contextual evidence

'use client';

import { motion } from 'framer-motion';
import { EvidenceStructure } from '@/lib/types';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface EvidenceBreakdownProps {
  evidence: EvidenceStructure;
}

export default function EvidenceBreakdown({ evidence }: EvidenceBreakdownProps) {
  if (!evidence || (!evidence.directEvidence?.length && !evidence.contextualSignals?.length)) {
    return null; // Fallback for older analysis results or missing data
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary-fixed">plagiarism</span>
        Evidence Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direct Evidence */}
        <div className="bg-surface-container-lowest/50 rounded-lg p-5 border border-outline-variant/20">
          <h4 className="text-[14px] leading-[20px] font-bold text-on-surface mb-3 flex items-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-[18px] text-primary">target</span>
            Direct Evidence
          </h4>
          <ul className="space-y-3">
            {evidence.directEvidence.map((point, idx) => (
              <li key={idx} className="flex gap-2 text-[14px] leading-[20px] text-on-surface-variant">
                <span className="text-primary mt-0.5 shrink-0 material-symbols-outlined text-[16px]">chevron_right</span>
                <TranslatedText text={point} />
              </li>
            ))}
            {(!evidence.directEvidence || evidence.directEvidence.length === 0) && (
              <li className="text-[14px] italic text-on-surface-variant/70">No direct evidence found.</li>
            )}
          </ul>
        </div>

        {/* Contextual Signals */}
        <div className="bg-surface-container-lowest/50 rounded-lg p-5 border border-outline-variant/20">
          <h4 className="text-[14px] leading-[20px] font-bold text-on-surface mb-3 flex items-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-[18px] text-[#ffb4ab]">radar</span>
            Contextual Signals
          </h4>
          <ul className="space-y-3">
            {evidence.contextualSignals.map((point, idx) => (
              <li key={idx} className="flex gap-2 text-[14px] leading-[20px] text-on-surface-variant">
                <span className="text-[#ffb4ab] mt-0.5 shrink-0 material-symbols-outlined text-[16px]">chevron_right</span>
                <TranslatedText text={point} />
              </li>
            ))}
            {(!evidence.contextualSignals || evidence.contextualSignals.length === 0) && (
              <li className="text-[14px] italic text-on-surface-variant/70">No contextual signals found.</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
