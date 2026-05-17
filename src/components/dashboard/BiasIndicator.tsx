// components/dashboard/BiasIndicator.tsx — Bias spectrum with emotional tone chip

'use client';

import { motion } from 'framer-motion';
import { BiasAnalysis } from '@/lib/types';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface BiasIndicatorProps {
  bias: BiasAnalysis;
}

const TONE_COLORS: Record<string, string> = {
  NEUTRAL: '#00ff88',
  SENSATIONAL: '#ffaa00',
  FEAR_BASED: '#ff3b5c',
  OPTIMISTIC: '#7b8fb0',
  ALARMIST: '#ff3b5c',
};

export default function BiasIndicator({ bias }: BiasIndicatorProps) {
  // Convert biasScore (-100 to 100) → position (0 to 100)
  const position = ((bias.biasScore + 100) / 200) * 100;
  const toneColor = TONE_COLORS[bias.emotionalTone] || '#ffaa00';

  return (
    <div className="mt-6 pt-6 border-t border-outline-variant/20">
      {/* Bias Spectrum */}
      <div className="flex justify-between text-[10px] leading-[12px] tracking-[0.08em] font-bold mb-2 text-on-surface-variant">
        <span>⚖️ Bias Spectrum</span>
        <span style={{ color: toneColor }}>
          <TranslatedText text={bias.biasLabel} skeletonClass="h-2 w-16" />
        </span>
      </div>
      <div className="relative mb-1">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff3b5c] via-primary-container to-[#3b82f6] rounded-full" />
        <div className="flex justify-between text-[8px] text-on-surface-variant/50 mt-0.5">
          <span>Negative</span>
          <span>Neutral</span>
          <span>Positive</span>
        </div>
        <motion.div
          initial={{ left: '50%' }}
          animate={{ left: `${position}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
          className="absolute top-0 -translate-y-1/4 w-3 h-3 bg-surface border-2 border-on-surface rounded-full"
          style={{ marginLeft: '-6px' }}
        />
      </div>

      {/* Emotional Tone */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] leading-[12px] tracking-[0.08em] font-bold text-on-surface-variant">Tone:</span>
        <span
          className="text-[10px] leading-[12px] tracking-[0.08em] font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: `${toneColor}33`, color: toneColor, border: `1px solid ${toneColor}55` }}
        >
          {bias.emotionalTone.replace('_', ' ')}
        </span>
      </div>

      {/* Explanation */}
      <p className="text-[12px] leading-[16px] text-on-surface-variant/80 mt-3 min-h-[32px]">
        <TranslatedText text={bias.biasExplanation} skeletonClass="h-3 w-full" />
      </p>
    </div>
  );
}
