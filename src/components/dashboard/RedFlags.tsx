// components/dashboard/RedFlags.tsx — Forensic flags display with integrated bias indicator

'use client';

import { motion } from 'framer-motion';
import { RedFlag, BiasAnalysis } from '@/lib/types';
import BiasIndicator from './BiasIndicator';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface RedFlagsProps {
  flags: RedFlag[];
  bias: BiasAnalysis;
}

function getFlagIcon(label: string): string {
  const l = label.toLowerCase();
  if (l.includes('language') || l.includes('absolute')) return 'warning';
  if (l.includes('timeline') || l.includes('missing')) return 'schedule';
  if (l.includes('unverified') || l.includes('statistic')) return 'query_stats';
  if (l.includes('sensational') || l.includes('framing')) return 'psychology';
  return 'flag';
}

export default function RedFlags({ flags, bias }: RedFlagsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-4 flex items-center gap-2">
        <span className="text-[14px]">🚩</span> Red Flags Detected
      </h3>
      <div className="flex flex-wrap gap-2">
        {flags.map((flag, i) => (
          <motion.div key={flag.flag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + 0.1 * i, type: 'spring', stiffness: 300 }} className="group relative">
            <span className="bg-status-misleading text-[#ffaa00] text-[10px] leading-[12px] tracking-[0.08em] font-bold px-3 py-1.5 rounded-full border border-[#ffaa00]/30 flex items-center gap-1 cursor-help">
              <span className="material-symbols-outlined text-[14px]">{getFlagIcon(flag.flag)}</span>
              <TranslatedText text={flag.flag} skeletonClass="h-3 w-16" />
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-64">
              <div className="bg-surface-container-highest text-on-surface text-[12px] leading-[16px] p-3 rounded-lg border border-outline-variant/30 shadow-xl min-h-[40px]">
                <TranslatedText text={flag.detail} skeletonClass="h-3 w-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <BiasIndicator bias={bias} />
    </motion.div>
  );
}
