// components/dashboard/KeyClaims.tsx — Key claims breakdown

'use client';

import { motion } from 'framer-motion';
import { KeyClaim, ClaimStatus } from '@/lib/types';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface KeyClaimsProps {
  claims: KeyClaim[];
}

const STATUS_CONFIG: Record<ClaimStatus, { icon: string; color: string; pillClass: string }> = {
  VERIFIED: {
    icon: 'check_circle',
    color: '#00ff88',
    pillClass: 'bg-status-verified text-status-verified',
  },
  DISPUTED: {
    icon: 'cancel',
    color: '#ff3b5c',
    pillClass: 'bg-status-false text-status-false',
  },
  UNVERIFIED: {
    icon: 'search',
    color: '#7b8fb0',
    pillClass: 'bg-surface-bright text-status-unverified',
  },
};

export default function KeyClaims({ claims }: KeyClaimsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary-fixed">fact_check</span>
        Key Claims Analysis
      </h3>

      <div className="space-y-1">
        {claims.map((claim, index) => {
          const status = STATUS_CONFIG[claim.status];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + 0.1 * index }}
              className={`flex flex-col md:flex-row gap-3 p-3 rounded-lg hover:bg-surface-container-high/30 transition-colors ${
                index % 2 === 0 ? 'bg-surface-container-lowest/30' : ''
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span
                  className="material-symbols-outlined text-[20px] mt-0.5 shrink-0"
                  style={{ color: status.color, fontVariationSettings: "'FILL' 1" }}
                >
                  {status.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] leading-[20px] font-semibold text-on-surface mb-1 min-h-[20px]">
                    <TranslatedText text={claim.claim} skeletonClass="h-4 w-3/4" />
                  </p>
                  <p className="text-[14px] leading-[20px] text-on-surface-variant min-h-[20px]">
                    <TranslatedText text={claim.explanation} skeletonClass="h-4 w-full" />
                  </p>
                </div>
              </div>

              <span
                className={`${status.pillClass} text-[10px] leading-[12px] tracking-[0.08em] font-bold px-3 py-1 rounded uppercase self-start shrink-0`}
              >
                {claim.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
