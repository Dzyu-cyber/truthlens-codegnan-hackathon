// components/ui/VerdictBadge.tsx — Verdict status badge with icon and glow

'use client';

import { motion } from 'framer-motion';
import { Verdict } from '@/lib/types';

interface VerdictBadgeProps {
  verdict: Verdict;
  confidenceScore: number;
}

const VERDICT_CONFIG: Record<
  Verdict,
  { icon: string; label: string; colorClass: string; bgClass: string; barColor: string }
> = {
  TRUE: {
    icon: 'verified',
    label: 'True',
    colorClass: 'status-verified',
    bgClass: 'bg-status-verified',
    barColor: '#00ff88',
  },
  MISLEADING: {
    icon: 'warning',
    label: 'Misleading',
    colorClass: 'status-misleading',
    bgClass: 'bg-status-misleading',
    barColor: '#ffaa00',
  },
  FALSE: {
    icon: 'dangerous',
    label: 'False',
    colorClass: 'status-false',
    bgClass: 'bg-status-false',
    barColor: '#ff3b5c',
  },
  UNVERIFIED: {
    icon: 'help',
    label: 'Unverified',
    colorClass: 'status-unverified',
    bgClass: 'bg-surface-bright',
    barColor: '#7b8fb0',
  },
};

export default function VerdictBadge({ verdict, confidenceScore }: VerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`w-full md:w-auto flex flex-col items-center justify-center p-6 ${config.bgClass} rounded-xl min-w-[280px]`}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className={`material-symbols-outlined text-[64px] ${config.colorClass} mb-2`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {config.icon}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-[48px] leading-[56px] tracking-tight font-extrabold ${config.colorClass} uppercase mb-6`}
      >
        {config.label}
      </motion.h2>

      <div className="w-full">
        <div className="flex justify-between text-[12px] leading-[16px] tracking-[0.05em] font-semibold mb-2 text-on-surface">
          <span>AI Confidence Score</span>
          <span style={{ color: config.barColor }}>{confidenceScore}%</span>
        </div>
        <div className="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidenceScore}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            className="h-full rounded-full"
            style={{
              backgroundColor: config.barColor,
              boxShadow: `0 0 10px ${config.barColor}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
