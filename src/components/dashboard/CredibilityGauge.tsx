// components/dashboard/CredibilityGauge.tsx — SVG semicircle gauge for overall credibility score

'use client';

import { motion } from 'framer-motion';

interface CredibilityGaugeProps {
  score: number; // 0-100
}

export default function CredibilityGauge({ score }: CredibilityGaugeProps) {
  // SVG arc calculations for a semicircle gauge
  const arcLength = Math.PI * 40;
  const filledLength = (score / 100) * arcLength;

  // Determine color based on score
  const getColor = (s: number) => {
    if (s >= 70) return '#00ff88';
    if (s >= 40) return '#ffaa00';
    return '#ff3b5c';
  };

  const color = getColor(score);

  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col items-center">
      <h3 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-4 w-full text-left">
        Overall Credibility Score
      </h3>

      <div className="relative w-48 h-24 overflow-hidden mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Background track */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#2d372e"
            strokeLinecap="round"
            strokeWidth="10"
          />
          {/* Filled arc */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="10"
            strokeDasharray={arcLength}
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: arcLength - filledLength }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-on-surface">
            {score}
            <span className="text-[16px] text-on-surface-variant">/100</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
