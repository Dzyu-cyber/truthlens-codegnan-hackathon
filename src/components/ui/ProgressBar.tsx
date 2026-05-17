// components/ui/ProgressBar.tsx — Animated progress bar

'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: string;
  delay?: number;
}

export default function ProgressBar({
  value,
  color = '#00ff88',
  height = 'h-1',
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className={`${height} w-full bg-surface-container-lowest rounded-full overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay }}
        className={`${height} rounded-full`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
