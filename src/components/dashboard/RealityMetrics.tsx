// components/dashboard/RealityMetrics.tsx — Forensic live confidence bars for Manipulation & Risk

'use client';

import { motion } from 'framer-motion';
import { RealityScores } from '@/lib/types';

interface RealityMetricsProps {
  scores?: RealityScores;
}

export default function RealityMetrics({ scores }: RealityMetricsProps) {
  if (!scores) return null;

  const metrics = [
    {
      label: 'Manipulation Probability',
      value: scores.manipulationProbability,
      getColor: (v: number) => (v > 70 ? '#ff3b5c' : v > 40 ? '#ffaa00' : '#00ff88'),
      icon: 'blur_on'
    },
    {
      label: 'Narrative Risk',
      value: scores.narrativeRisk,
      getColor: (v: number) => (v > 70 ? '#ff3b5c' : v > 40 ? '#ffaa00' : '#00ff88'),
      icon: 'warning'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-5 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-primary">radar</span>
        Forensic Reality Metrics
      </h3>

      <div className="space-y-6">
        {metrics.map((metric, i) => {
          const color = metric.getColor(metric.value);
          return (
            <div key={metric.label} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] opacity-70">{metric.icon}</span>
                  {metric.label}
                </span>
                <span className="text-[14px] font-bold" style={{ color }}>
                  {metric.value}%
                </span>
              </div>
              
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/20 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.value}%` }}
                  transition={{ duration: 1, delay: 0.6 + i * 0.2, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}80`
                  }}
                />
                {/* Scanning effect */}
                <motion.div
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 bottom-0 w-8 bg-white/20 blur-sm skew-x-[-20deg]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
