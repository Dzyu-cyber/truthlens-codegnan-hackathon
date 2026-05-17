// components/dashboard/ManipulationRadar.tsx — Highlights psychological tactics

'use client';

import { motion } from 'framer-motion';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface ManipulationRadarProps {
  tactics?: string[];
}

export default function ManipulationRadar({ tactics }: ManipulationRadarProps) {
  if (!tactics || tactics.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-panel rounded-xl p-6 mt-6 border-t border-outline-variant/10"
    >
      <h3 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-error">psychology_alt</span>
        Narrative Manipulation Tactics
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {tactics.map((tactic, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + 0.1 * i, type: 'spring', stiffness: 300 }}
            className="group relative"
          >
            <span className="bg-error/10 text-error text-[11px] leading-[14px] tracking-[0.05em] font-bold px-3 py-1.5 rounded-md border border-error/20 flex items-center gap-1.5 cursor-default hover:bg-error/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
              <TranslatedText text={tactic} skeletonClass="h-3 w-16" />
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
