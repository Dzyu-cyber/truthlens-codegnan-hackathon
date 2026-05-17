// components/ui/StanceChip.tsx — Chip displaying source stance

'use client';

import { Stance } from '@/lib/types';

interface StanceChipProps {
  stance: Stance;
}

const STANCE_CONFIG: Record<Stance, { label: string; className: string }> = {
  SUPPORTS: {
    label: 'Supports',
    className: 'bg-status-verified text-status-verified',
  },
  CONTRADICTS: {
    label: 'Contradicts',
    className: 'bg-status-false text-status-false',
  },
  NEUTRAL: {
    label: 'Neutral',
    className: 'bg-surface-bright text-on-surface-variant',
  },
};

export default function StanceChip({ stance }: StanceChipProps) {
  const normalizedStance = (stance || 'NEUTRAL').toUpperCase() as Stance;
  const config = STANCE_CONFIG[normalizedStance] || {
    label: stance || 'Unknown',
    className: 'bg-surface-bright text-on-surface-variant',
  };

  return (
    <span
      className={`px-3 py-1 rounded text-[10px] leading-[12px] tracking-[0.08em] font-bold uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
